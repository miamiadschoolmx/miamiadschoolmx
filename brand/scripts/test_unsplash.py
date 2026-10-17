"""Pruebas sin red de brand/scripts/unsplash.py.

Correr desde la raíz del repo:
  python3 -I -m unittest discover -s brand/scripts -p "test_*.py"
"""
import contextlib
import io
import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import unsplash

FIXTURE = Path(__file__).resolve().parent / 'fixtures' / 'unsplash-search.json'
KEY = 'llave-de-prueba-123'


def load_fixture():
    return json.loads(FIXTURE.read_text(encoding='utf-8'))


class FakeApi:
    """Sustituye a http_get: responde con el fixture y registra cada URL pedida."""

    def __init__(self, image_bytes=b'jpg'):
        self.data = load_fixture()
        self.photos = {p['id']: p for p in self.data['results']}
        self.calls = []
        self.image_bytes = image_bytes

    def __call__(self, url, key):
        self.calls.append(url)
        host = unsplash.urllib.parse.urlsplit(url).hostname
        path = unsplash.urllib.parse.urlsplit(url).path
        if host == 'images.unsplash.com':
            return self.image_bytes
        if path == '/search/photos':
            return json.dumps(self.data).encode()
        if path.endswith('/download'):
            return json.dumps({'url': 'https://images.unsplash.com/ejemplo'}).encode()
        if path.startswith('/photos/'):
            return json.dumps(self.photos[path.split('/')[2]]).encode()
        raise AssertionError(f'URL inesperada: {url}')


class UtilidadesTest(unittest.TestCase):
    def test_slugify(self):
        self.assertEqual(unsplash.slugify('Creative studio México!'), 'creative-studio-mexico')
        self.assertEqual(unsplash.slugify('   '), 'busqueda')

    def test_parse_search(self):
        rows = unsplash.parse_search(load_fixture())
        self.assertEqual([r['n'] for r in rows], [1, 2])
        self.assertEqual(rows[0]['id'], 'Ej3mpl0aaa1')
        self.assertEqual(rows[0]['autor'], 'Ana Ejemplo')
        self.assertEqual(rows[0]['descripcion'], 'Equipo creativo revisando bocetos en la pared')
        # Sin description usa alt_description.
        self.assertEqual(rows[1]['descripcion'], 'escritorio con laptop, libretas y post-its')
        self.assertTrue(rows[1]['miniatura'].endswith('w=400'))

    def test_table(self):
        table = unsplash.format_table(unsplash.parse_search(load_fixture()))
        self.assertIn('4000×5000', table)
        self.assertIn('Beto Muestra', table)

    def test_raw_url_respeta_parametros(self):
        url = unsplash.raw_url('https://images.unsplash.com/photo-1?ixid=ABC&w=100', 2160)
        q = dict(unsplash.urllib.parse.parse_qsl(unsplash.urllib.parse.urlsplit(url).query))
        self.assertEqual(q, {'ixid': 'ABC', 'w': '2160', 'fm': 'jpg', 'q': '85'})

    def test_utm(self):
        self.assertEqual(unsplash.with_utm('https://unsplash.com/@ana'),
                         'https://unsplash.com/@ana?utm_source=mas_mexico_brand&utm_medium=referral')

    def test_credito(self):
        c = unsplash.credit(load_fixture()['results'][0], 'Ej3mpl0aaa1.jpg')
        self.assertEqual(c['texto'], 'Foto: Ana Ejemplo en Unsplash')
        self.assertEqual(c['etiqueta'], 'Foto: Ana Ejemplo / Unsplash')
        self.assertIn('utm_source=mas_mexico_brand', c['autor_url'])
        self.assertIn('utm_medium=referral', c['foto_url'])
        md = unsplash.credits_markdown({c['id']: c})
        self.assertIn('[Ana Ejemplo](https://unsplash.com/@ana_ejemplo?utm_source=mas_mexico_brand&utm_medium=referral)', md)

    def test_llave_solo_va_a_la_api(self):
        self.assertEqual(unsplash.headers_for('https://api.unsplash.com/photos/x', KEY)['Authorization'], f'Client-ID {KEY}')
        self.assertEqual(unsplash.headers_for('https://api.unsplash.com/photos/x', KEY)['Accept-Version'], 'v1')
        self.assertNotIn('Authorization', unsplash.headers_for('https://images.unsplash.com/photo-1', KEY))

    def test_falta_llave(self):
        with self.assertRaises(unsplash.UnsplashError) as ctx:
            unsplash.access_key({})
        self.assertIn('UNSPLASH_ACCESS_KEY', str(ctx.exception))
        self.assertEqual(unsplash.access_key({'UNSPLASH_ACCESS_KEY': f' {KEY} '}), KEY)

    def test_errores_en_espanol(self):
        self.assertIn('Access Key', unsplash.explain_http(401))
        self.assertIn('límite por hora', unsplash.explain_http(403, b'Rate Limit Exceeded'))
        self.assertIn('Rate Limit Exceeded', unsplash.explain_http(403, b'Rate Limit Exceeded'))
        self.assertIn('Espera unos minutos', unsplash.explain_http(429))
        self.assertIn('OAuth error', unsplash.explain_http(401, b'{"errors": ["OAuth error"]}'))

    def test_main_sin_llave_sale_con_error(self):
        err = io.StringIO()
        with mock.patch.dict(unsplash.os.environ, {}, clear=True), contextlib.redirect_stderr(err):
            self.assertEqual(unsplash.main(['buscar', 'estudio']), 1)
        self.assertIn('Falta la variable UNSPLASH_ACCESS_KEY', err.getvalue())


class ComandosTest(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, self.tmp)

    def run_quiet(self, fn, *args, **kw):
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            result = fn(*args, **kw)
        self.assertNotIn(KEY, out.getvalue() + err.getvalue())   # la llave nunca se imprime
        return result, out.getvalue()

    def test_buscar(self):
        api = FakeApi()
        with mock.patch('unsplash.shutil.which', return_value=None):
            rows, out = self.run_quiet(unsplash.cmd_buscar, 'Creative studio', 'portrait', 50, key=KEY, out=self.tmp, get=api)
        self.assertEqual(len(rows), 2)
        q = dict(unsplash.urllib.parse.parse_qsl(unsplash.urllib.parse.urlsplit(api.calls[0]).query))
        self.assertEqual(q, {'query': 'Creative studio', 'per_page': '30', 'orientation': 'portrait', 'content_filter': 'high'})
        saved = json.loads((self.tmp / 'busqueda-creative-studio.json').read_text(encoding='utf-8'))
        self.assertEqual(saved['resultados'][0]['id'], 'Ej3mpl0aaa1')
        self.assertTrue((self.tmp / 'busqueda-creative-studio' / '01.jpg').exists())
        self.assertIn('Ej3mpl0bbb2', out)

    def test_bajar_avisa_descarga_y_guarda_credito(self):
        api = FakeApi()
        saved, out = self.run_quiet(unsplash.cmd_bajar, ['Ej3mpl0aaa1'], 1600, key=KEY, out=self.tmp, get=api)
        self.assertEqual(saved, [self.tmp / 'Ej3mpl0aaa1.jpg'])
        self.assertEqual(api.calls[0], 'https://api.unsplash.com/photos/Ej3mpl0aaa1')
        self.assertEqual(api.calls[1], 'https://api.unsplash.com/photos/Ej3mpl0aaa1/download?ixid=EJEMPLO1')
        self.assertIn('w=1600', api.calls[2])
        credits = json.loads((self.tmp / 'creditos.json').read_text(encoding='utf-8'))
        self.assertEqual(credits['Ej3mpl0aaa1']['texto'], 'Foto: Ana Ejemplo en Unsplash')
        self.assertIn('Foto: [Ana Ejemplo]', (self.tmp / 'creditos.md').read_text(encoding='utf-8'))
        # Una segunda descarga se suma a los créditos existentes.
        self.run_quiet(unsplash.cmd_bajar, ['Ej3mpl0bbb2'], key=KEY, out=self.tmp, get=api)
        self.assertEqual(set(json.loads((self.tmp / 'creditos.json').read_text(encoding='utf-8'))), {'Ej3mpl0aaa1', 'Ej3mpl0bbb2'})

    @unittest.skipUnless(shutil.which('montage') and shutil.which('convert'), 'ImageMagick no está instalado')
    def test_hoja_de_contacto(self):
        jpg = self.tmp / 'muestra.jpg'
        subprocess.run(['convert', '-size', '40x50', 'xc:#FF5CCD', str(jpg)], check=True)
        api = FakeApi(image_bytes=jpg.read_bytes())
        self.run_quiet(unsplash.cmd_buscar, 'estudio', key=KEY, out=self.tmp, get=api)
        self.assertTrue((self.tmp / 'busqueda-estudio.jpg').stat().st_size > 0)


if __name__ == '__main__':
    unittest.main()
