#!/usr/bin/env python3
"""Busca y descarga fotos de Unsplash para piezas de MAS México.

Uso:
  python3 -I brand/scripts/unsplash.py buscar "consulta" [--orientacion portrait|landscape|squarish] [--n 12]
  python3 -I brand/scripts/unsplash.py bajar <id> [<id> ...] [--ancho 2160]

Requisitos del entorno:
  - Variable UNSPLASH_ACCESS_KEY con la Access Key de la app de Unsplash (no la Secret Key).
  - Dominios api.unsplash.com e images.unsplash.com permitidos en el acceso a red.
Solo usa la librería estándar: urllib respeta HTTPS_PROXY y SSL_CERT_FILE del entorno.

Todo se guarda en brand/work/fotos/unsplash/ (fuera de git):
  busqueda-<slug>.json / .jpg   resultados y hoja de contacto numerada
  <id>.jpg                      fotos descargadas, con sus colores originales
  creditos.json / creditos.md   crédito de cada foto ("Foto: Nombre en Unsplash")
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

API = 'https://api.unsplash.com'
API_HOST = 'api.unsplash.com'
UTM = {'utm_source': 'mas_mexico_brand', 'utm_medium': 'referral'}
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'brand' / 'work' / 'fotos' / 'unsplash'
ORIENTACIONES = ('portrait', 'landscape', 'squarish')


class UnsplashError(Exception):
    """Error con un mensaje en español listo para mostrar."""


# ---------- Utilidades puras (se prueban sin red) ----------

def access_key(env=None):
    env = os.environ if env is None else env
    key = (env.get('UNSPLASH_ACCESS_KEY') or '').strip()
    if not key:
        raise UnsplashError(
            'Falta la variable UNSPLASH_ACCESS_KEY. Agrégala en la configuración del entorno '
            '(secrets o variables de entorno) con la Access Key de tu app de Unsplash y abre una sesión nueva.')
    return key


def headers_for(url, key):
    """La llave solo viaja a api.unsplash.com; las imágenes se bajan sin autorización."""
    headers = {'Accept-Version': 'v1', 'User-Agent': 'mas-mexico-brand/1.0'}
    if urllib.parse.urlsplit(url).hostname == API_HOST:
        headers['Authorization'] = f'Client-ID {key}'
    return headers


def slugify(text, max_len=48):
    norm = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    out, dash = [], False
    for ch in norm.lower():
        if ch.isalnum():
            out.append(ch); dash = False
        elif not dash and out:
            out.append('-'); dash = True
    return ''.join(out).strip('-')[:max_len].strip('-') or 'busqueda'


def with_params(url, params):
    parts = urllib.parse.urlsplit(url)
    query = urllib.parse.parse_qsl(parts.query, keep_blank_values=True)
    keys = set(params)
    query = [(k, v) for k, v in query if k not in keys] + list(params.items())
    return urllib.parse.urlunsplit(parts._replace(query=urllib.parse.urlencode(query)))


def with_utm(url):
    return with_params(url, UTM)


def raw_url(raw, ancho):
    return with_params(raw, {'w': str(ancho), 'fm': 'jpg', 'q': '85'})


def describe(photo):
    text = photo.get('description') or photo.get('alt_description') or ''
    return ' '.join(text.split())


def parse_search(data):
    """Convierte la respuesta de /search/photos en filas numeradas."""
    rows = []
    for i, p in enumerate(data.get('results') or [], 1):
        user = p.get('user') or {}
        rows.append({
            'n': i,
            'id': p['id'],
            'ancho': p.get('width'),
            'alto': p.get('height'),
            'autor': user.get('name') or user.get('username') or 'Autor desconocido',
            'descripcion': describe(p),
            'miniatura': (p.get('urls') or {}).get('small'),
            'foto_url': (p.get('links') or {}).get('html'),
        })
    return rows


def format_table(rows, width=60):
    lines = [f"{'#':>3}  {'id':<12} {'tamaño':>11}  {'autor':<22} descripción"]
    for r in rows:
        size = f"{r['ancho']}×{r['alto']}" if r['ancho'] else '?'
        desc = r['descripcion'] if len(r['descripcion']) <= width else r['descripcion'][:width - 1] + '…'
        lines.append(f"{r['n']:>3}  {r['id']:<12} {size:>11}  {r['autor'][:22]:<22} {desc}")
    return '\n'.join(lines)


def credit(photo, archivo):
    user = photo.get('user') or {}
    name = user.get('name') or user.get('username') or 'Autor desconocido'
    return {
        'id': photo['id'],
        'texto': f'Foto: {name} en Unsplash',
        'etiqueta': f'Foto: {name} / Unsplash',
        'autor': name,
        'autor_url': with_utm((user.get('links') or {}).get('html') or f"https://unsplash.com/@{user.get('username', '')}"),
        'foto_url': with_utm((photo.get('links') or {}).get('html') or f"https://unsplash.com/photos/{photo['id']}"),
        'archivo': archivo,
        'descripcion': describe(photo),
    }


def credits_markdown(credits):
    lines = ['# Créditos de fotos de Unsplash', '',
             'Usa la etiqueta en el `.c-label` del slide o en el caption. Licencia Unsplash; sin permisos de modelo.', '']
    for c in sorted(credits.values(), key=lambda c: c['archivo']):
        lines.append(f"- `{c['archivo']}`: Foto: [{c['autor']}]({c['autor_url']}) en [Unsplash]({c['foto_url']})")
    return '\n'.join(lines) + '\n'


def explain_http(code, body=b''):
    detail = ''
    try:
        errors = json.loads(body.decode('utf-8', 'ignore')).get('errors')
        if errors:
            detail = f" Unsplash dice: {'; '.join(map(str, errors))}."
    except (ValueError, AttributeError):
        text = body.decode('utf-8', 'ignore').strip()
        if text:
            detail = f' Unsplash dice: {text[:200]}.'
    if code == 401:
        return 'La llave no es válida (401). Revisa UNSPLASH_ACCESS_KEY: debe ser la Access Key de la app, no la Secret Key.' + detail
    if code == 403:
        return ('Unsplash rechazó la llamada (403). Lo más común es que se acabó el límite por hora '
                '(en modo demo son 50 llamadas por hora) o que la app no tiene permiso. Espera a la siguiente hora '
                'o pide el modo producción en unsplash.com/developers.' + detail)
    if code == 429:
        return 'Demasiadas solicitudes seguidas (429). Espera unos minutos y vuelve a intentar.' + detail
    if code == 404:
        return 'No existe esa foto en Unsplash (404). Revisa el id.' + detail
    return f'Unsplash respondió con error {code}.' + detail


# ---------- Red ----------

def http_get(url, key):
    req = urllib.request.Request(url, headers=headers_for(url, key))
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            body, headers = r.read(), r.headers
    except urllib.error.HTTPError as e:
        raise UnsplashError(explain_http(e.code, e.read() or b'')) from None
    except urllib.error.URLError as e:
        host = urllib.parse.urlsplit(url).hostname
        reason = str(e.reason)
        if 'Tunnel' in reason or '403' in reason:
            raise UnsplashError(f'El acceso a red del entorno no permite {host}. Agrégalo en Dominios permitidos y abre una sesión nueva.') from None
        raise UnsplashError(f'No hay conexión con {host}: {reason}.') from None
    if urllib.parse.urlsplit(url).hostname == API_HOST:
        left, limit = headers.get('X-Ratelimit-Remaining'), headers.get('X-Ratelimit-Limit')
        if left is not None:
            print(f'  Unsplash: quedan {left}' + (f' de {limit}' if limit else '') + ' llamadas esta hora.', file=sys.stderr)
    return body


def api_json(path_or_url, key, params=None):
    url = path_or_url if path_or_url.startswith('http') else API + path_or_url
    if params:
        url = with_params(url, {k: str(v) for k, v in params.items() if v is not None})
    return json.loads(http_get(url, key).decode('utf-8'))


# ---------- Comandos ----------

def contact_sheet(thumbs, out_file):
    if not thumbs:
        return None
    if not shutil.which('montage'):
        print('  (ImageMagick no está instalado: no armé la hoja de contacto.)', file=sys.stderr)
        return None
    cmd = ['montage', '-label', '%t', *map(str, thumbs), '-tile', '4x', '-geometry', '360x360>+10+10',
           '-background', '#222222', '-fill', '#eeeeee', '-pointsize', '30', str(out_file)]
    subprocess.run(cmd, check=True)
    return out_file


def cmd_buscar(query, orientacion=None, n=12, key=None, out=OUT, get=http_get):
    key = key or access_key()
    n = max(1, min(int(n), 30))
    out.mkdir(parents=True, exist_ok=True)
    slug = slugify(query)
    params = {'query': query, 'per_page': n, 'orientation': orientacion, 'content_filter': 'high'}
    url = with_params(API + '/search/photos', {k: str(v) for k, v in params.items() if v is not None})
    data = json.loads(get(url, key).decode('utf-8'))
    rows = parse_search(data)
    (out / f'busqueda-{slug}.json').write_text(json.dumps(
        {'consulta': query, 'orientacion': orientacion, 'total': data.get('total'), 'resultados': rows, 'respuesta': data},
        ensure_ascii=False, indent=2), encoding='utf-8')
    thumbs_dir = out / f'busqueda-{slug}'
    thumbs_dir.mkdir(exist_ok=True)
    thumbs = []
    for r in rows:
        if r['miniatura']:
            f = thumbs_dir / f"{r['n']:02d}.jpg"
            f.write_bytes(get(r['miniatura'], key))
            thumbs.append(f)
    sheet = contact_sheet(thumbs, out / f'busqueda-{slug}.jpg')
    print(format_table(rows) if rows else f'Sin resultados para "{query}".')
    print(f'\nResultados: {out / f"busqueda-{slug}.json"}')
    if sheet:
        print(f'Hoja de contacto: {sheet}')
    return rows


def load_credits(out):
    f = out / 'creditos.json'
    return json.loads(f.read_text(encoding='utf-8')) if f.exists() else {}


def save_credits(out, credits):
    (out / 'creditos.json').write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding='utf-8')
    (out / 'creditos.md').write_text(credits_markdown(credits), encoding='utf-8')


def cmd_bajar(ids, ancho=2160, key=None, out=OUT, get=http_get):
    key = key or access_key()
    out.mkdir(parents=True, exist_ok=True)
    credits = load_credits(out)
    saved = []
    for pid in ids:
        photo = json.loads(get(f'{API}/photos/{urllib.parse.quote(pid)}', key).decode('utf-8'))
        # La guía de la API exige avisar cada descarga a links.download_location.
        get(photo['links']['download_location'], key)
        f = out / f"{photo['id']}.jpg"
        f.write_bytes(get(raw_url(photo['urls']['raw'], ancho), key))
        c = credit(photo, f.name)
        credits[photo['id']] = c
        saved.append(f)
        print(f'{f}  ·  {c["etiqueta"]}')
    save_credits(out, credits)
    print(f'\nCréditos: {out / "creditos.md"}')
    return saved


def main(argv=None):
    ap = argparse.ArgumentParser(description='Busca y descarga fotos de Unsplash para piezas de MAS México.')
    sub = ap.add_subparsers(dest='cmd', required=True)
    b = sub.add_parser('buscar', help='busca fotos y arma una hoja de contacto numerada')
    b.add_argument('consulta')
    b.add_argument('--orientacion', choices=ORIENTACIONES)
    b.add_argument('--n', type=int, default=12, help='resultados (1 a 30, por omisión 12)')
    d = sub.add_parser('bajar', help='descarga fotos por id y registra su crédito')
    d.add_argument('ids', nargs='+')
    d.add_argument('--ancho', type=int, default=2160, help='ancho en px (por omisión 2160)')
    args = ap.parse_args(argv)
    try:
        if args.cmd == 'buscar':
            cmd_buscar(args.consulta, args.orientacion, args.n)
        else:
            cmd_bajar(args.ids, args.ancho)
    except UnsplashError as e:
        print(f'Error: {e}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
