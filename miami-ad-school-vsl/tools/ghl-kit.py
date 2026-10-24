#!/usr/bin/env python3
"""Arma los 3 bloques que se pegan en GoHighLevel, listos y sin cortar a mano.

Uso (desde la carpeta miami-ad-school-vsl):

    python3 tools/ghl-kit.py

Lee landing.html, landing.css y landing.js y escribe en ghl/:

    1-custom-code.html   → elemento Custom JS/HTML de la sección (paso 3)
    2-custom-css.css     → Settings → Custom CSS de la página (paso 4)
    3-footer.html        → Settings → Tracking Code → Footer de la página (paso 5)
    4-header-seo.html    → Settings → Tracking Code → Header de la página (paso 6):
                           canonical y JSON-LD Course, copiados del <head> de landing.html

Las rutas locales (img/..., fonts/...) se cambian por las URLs de GHL que pongas en
ghl/medios.json. La primera vez el script crea ese archivo con todas las rutas
vacías; llénalo con la URL de cada archivo subido a la biblioteca de medios y vuelve
a correr el script. Lo que siga vacío se queda con su ruta local y se reporta.

Solo usa Python 3, sin dependencias. No toca landing.html, landing.css ni landing.js.
"""
import hashlib
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'ghl'
MEDIA = OUT / 'medios.json'
START = '<!-- ================= GHL · COPIAR DESDE AQUÍ ================= -->'
END = '<!-- ================= GHL · HASTA AQUÍ ================= -->'
SEO_START = '<!-- SEO-HEADER ·'
SEO_END = '<!-- SEO-HEADER-FIN -->'
BOLD = 'Obviously Narrow Bold (.woff)'
MEDIUM = 'Obviously Narrow Medium (.woff)'
ASSET = re.compile(r'(?<![\w/.-])((?:img|fonts)/[\w./-]+\.(?:webp|png|jpe?g|svg|gif|mp4|woff2?))(?![\w.-])')
NOTE = 'Generado por tools/ghl-kit.py desde landing.*. No lo edites a mano: cambia el original y vuelve a correr el script.'


def read(name):
    return (ROOT / name).read_text(encoding='utf-8')


def main():
    html, css, js = read('landing.html'), read('landing.css'), read('landing.js')
    if html.count(START) != 1 or html.count(END) != 1:
        sys.exit('No encuentro una sola vez las marcas «GHL · COPIAR DESDE AQUÍ» y «GHL · HASTA AQUÍ» en landing.html.')
    block = html[html.index(START):html.index(END) + len(END)]

    # 0. Versión del kit: la misma marca en los 3 bloques. Si en GHL se mezclan bloques de
    #    versiones distintas (pasó con el CSS de una y el HTML de otra), ?revisar=1 lo avisa.
    kit = hashlib.sha1((block + css + js).encode('utf-8')).hexdigest()[:8]
    for text, mark, label in ((block, 'data-kit="dev"', 'landing.html'), (css, '--kit: "dev";', 'landing.css'), (js, "var KIT = 'dev';", 'landing.js')):
        if text.count(mark) != 1:
            sys.exit('No encuentro la marca de versión ' + mark + ' en ' + label + '.')
    block = block.replace('data-kit="dev"', 'data-kit="' + kit + '"')
    css = css.replace('--kit: "dev";', '--kit: "' + kit + '";')
    js = js.replace("var KIT = 'dev';", "var KIT = '" + kit + "';")

    # 1. Mapa de medios: conserva lo que ya se llenó, agrega rutas nuevas y quita las que ya no se usan.
    used = sorted(set(ASSET.findall(block)) | set(ASSET.findall(css)))
    old = json.loads(MEDIA.read_text(encoding='utf-8')) if MEDIA.exists() else {}
    media = {BOLD: old.get(BOLD, ''), MEDIUM: old.get(MEDIUM, '')}
    for path in used:
        media[path] = old.get(path, '')
    dropped = [k for k in old if k not in media]
    OUT.mkdir(exist_ok=True)
    MEDIA.write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    bad = [k for k, v in media.items() if v and not v.startswith('https://')]
    urls = {k: v for k, v in media.items() if v.startswith('https://')}

    def swap(text):
        for path, url in urls.items():
            if path in (BOLD, MEDIUM):
                continue
            text = re.sub(r'(?<![\w/.-])' + re.escape(path) + r'(?![\w.-])', url, text)
        return text

    # 2. HTML del elemento Custom Code, sin los comentarios del original (pesa menos y no confunde a
    #    herramientas que sacan el texto del HTML). En landing.html los comentarios se quedan.
    body = re.sub(r'<!--.*?-->', '', swap(block), flags=re.S)
    body = re.sub(r'[ \t]+\n', '\n', body)
    body = re.sub(r'\n{3,}', '\n\n', body).strip()
    html_out = '<!-- ' + NOTE + ' Versión ' + kit + '. -->\n' + body + '\n'

    # 3. CSS: fuentes de marca, URLs y sin comentarios (pesa menos y no cambia nada)
    if urls.get(BOLD):
        i = css.index('@font-face {\n  font-family: "Obviously Narrow";')
        j = css.index('*/', i)
        fonts = css[i:j]
        fonts = fonts.replace('REEMPLAZAR_URL_OBVIOUSLY_NARROW_BOLD.woff', urls[BOLD])
        if urls.get(MEDIUM):
            fonts = fonts.replace('REEMPLAZAR_URL_OBVIOUSLY_NARROW_MEDIUM.woff', urls[MEDIUM])
        else:
            k = fonts.index('@font-face', 1)
            fonts = fonts[:k]
        css = css[:i] + '*/\n' + fonts + css[j + 2:]
        css = css.replace('--display-weight: 800;', '--display-weight: 700;', 1)
    css = swap(css)
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'[ \t]+\n', '\n', css)
    css = re.sub(r'\n{2,}', '\n', css).strip()
    css_out = '/* ' + NOTE + ' Versión ' + kit + '. */\n' + css + '\n'

    # 4. JS para el Footer, ya envuelto en <script>
    js_out = ('<!-- ' + NOTE + ' Versión ' + kit + '.\n'
              '     Reemplaza con este bloque los scripts anteriores de la landing: ya trae el formulario, el folleto,\n'
              '     el video y los textos legales. Si hay un píxel o script de medición, ese se queda. -->\n'
              '<script>\n' + js.strip() + '\n</script>\n')

    (OUT / '1-custom-code.html').write_text(html_out, encoding='utf-8')
    (OUT / '2-custom-css.css').write_text(css_out, encoding='utf-8')
    (OUT / '3-footer.html').write_text(js_out, encoding='utf-8')

    # 4 bis. SEO para el Header: canonical y JSON-LD, tal cual están en el <head> de landing.html
    if html.count(SEO_START) != 1 or html.count(SEO_END) != 1:
        sys.exit('No encuentro una sola vez las marcas «SEO-HEADER» y «SEO-HEADER-FIN» en el <head> de landing.html.')
    seo = html[html.index(SEO_START):html.index(SEO_END)]
    seo = re.sub(r'<!--.*?-->', '', seo, flags=re.S).strip()
    seo = '\n'.join(line[2:] if line.startswith('  ') else line for line in seo.splitlines())
    seo_out = ('<!-- ' + NOTE + ' Versión ' + kit + '.\n'
               '     Va en Settings → Tracking Code → Header de esta página, junto al píxel (que se queda). -->\n' + seo + '\n')
    (OUT / '4-header-seo.html').write_text(seo_out, encoding='utf-8')

    # 5. Reporte
    kb = lambda s: '%.0f KB' % (len(s.encode('utf-8')) / 1024)
    print('Listo en ghl/ · versión ' + kit + ':')
    print('  1-custom-code.html  ' + kb(html_out))
    print('  2-custom-css.css    ' + kb(css_out))
    print('  3-footer.html       ' + kb(js_out))
    print('  4-header-seo.html   ' + kb(seo_out))
    files = [k for k in media if k not in (BOLD, MEDIUM)]
    filled = [k for k in files if k in urls]
    print('\nMedios con URL de GHL: %d de %d (ghl/medios.json)' % (len(filled), len(files)))
    pend = []
    if len(filled) < len(files):
        pend.append('%d archivos siguen con ruta local (llena su URL en ghl/medios.json)' % (len(files) - len(filled)))
    if not urls.get(BOLD):
        pend.append('Obviously Narrow sin conectar: los titulares usan Archivo de respaldo')
    if re.search(r"vslUrl:\s*''", js):
        pend.append('Falta CONFIG.vslUrl en landing.js (paso 7)')
    if 'leadconnectorhq.com/widget/form/' not in block:
        pend.append('Falta el formulario de GoHighLevel dentro de #ghl-form-slot (paso 8)')
    if re.search(r"calendarUrl:\s*''", js):
        pend.append('[VERIFICAR] CONFIG.calendarUrl vacío: el link «Agenda tu llamada» no se muestra')
    if 'REEMPLAZAR_URL_PRIVACIDAD' in block or 'REEMPLAZAR_URL_TERMINOS' in block:
        pend.append('Faltan las URLs del aviso de privacidad y términos (P-12)')
    redes = [n for n in ('INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'LINKEDIN') if 'REEMPLAZAR_URL_' + n in block]
    if redes:
        pend.append('Redes del footer sin URL (no se muestran): ' + ', '.join(r.capitalize() for r in redes) + ' (P-18)')
    for k in bad:
        pend.append('URL inválida en medios.json (debe empezar con https://): ' + k)
    for k in dropped:
        pend.append('Se quitó de medios.json porque la página ya no la usa: ' + k)
    if pend:
        print('\nPendiente:')
        for p in pend:
            print('  - ' + p)
    print('\nDespués de pegarlo, abre la página publicada con ?revisar=1 para revisarla en GHL.')


if __name__ == '__main__':
    main()
