#!/usr/bin/env python3
"""Guarda en disco archivos descargados con la herramienta de Google Drive (download_file_content).

La herramienta devuelve {"content": <base64>, "title": ..., "mimeType": ...}. Si el resultado es grande,
Claude Code lo persiste en un .txt dentro de ~/.claude/projects/<proyecto>/<sesión>/tool-results/;
si es chico, queda en el transcript (.jsonl) de la sesión. Este script busca en las rutas dadas
(archivos .txt/.json/.jsonl o carpetas) y escribe cada archivo con su título en <destino>.

Uso:
  python3 -I brand/scripts/drive-save.py <destino> <ruta> [<ruta> ...] [--only "Obviously-Narrow"]
Ejemplo (fuentes):
  python3 -I brand/scripts/drive-save.py brand/fonts ~/.claude/projects --only Obviously-Narrow
"""
import base64, glob, json, os, sys

def walk(x, found):
    if isinstance(x, dict):
        if isinstance(x.get('content'), str) and 'title' in x and 'mimeType' in x:
            try:
                found[x.get('id', x['title'])] = (x['title'], base64.b64decode(x['content'], validate=True))
            except Exception:
                pass
        for v in x.values():
            walk(v, found)
    elif isinstance(x, list):
        for v in x:
            walk(v, found)
    elif isinstance(x, str) and x.startswith('{"content":'):
        try:
            walk(json.loads(x), found)
        except Exception:
            pass

def scan(path, found):
    files = [path] if os.path.isfile(path) else glob.glob(os.path.join(path, '**', '*'), recursive=True)
    for f in files:
        if not os.path.isfile(f) or not f.endswith(('.txt', '.json', '.jsonl')):
            continue
        with open(f, encoding='utf-8', errors='ignore') as fh:
            if f.endswith('.jsonl'):
                for line in fh:
                    try:
                        walk(json.loads(line), found)
                    except Exception:
                        pass
            else:
                try:
                    walk(json.load(fh), found)
                except Exception:
                    pass

def main():
    args = sys.argv[1:]
    only = None
    if '--only' in args:
        i = args.index('--only'); only = args[i + 1]; del args[i:i + 2]
    if len(args) < 2:
        print(__doc__); sys.exit(1)
    dest, sources = args[0], args[1:]
    os.makedirs(dest, exist_ok=True)
    found = {}
    for s in sources:
        scan(os.path.expanduser(s), found)
    n = 0
    for title, data in found.values():
        if only and only not in title:
            continue
        with open(os.path.join(dest, title), 'wb') as fh:
            fh.write(data)
        print(f'{len(data):>9}  {os.path.join(dest, title)}'); n += 1
    if not n:
        print('No se encontraron descargas de Drive en esas rutas.')

if __name__ == '__main__':
    main()
