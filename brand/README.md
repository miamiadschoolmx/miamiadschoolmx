# Sistema de marca · Miami Ad School México

Kit para producir piezas en marca con Claude: carruseles, posts, stories, PDFs y video, con las fuentes, colores y M-dots oficiales.

Reglas de Ricardo que mandan sobre el manual: headlines grandes y bold, **nunca texto negro** (todo en rosas), **sin M-dots dentro de los slides** (el logo solo en el cierre) y texto de apoyo grande y grueso (Obviously Narrow Bold, `.support`). Detalle en `BRAND.md`.

```
brand/
  BRAND.md              Reglas de marca (voz, logo, color, tipo, layout, motion, templates, checklist)
  tokens/colors.json    Paleta oficial + pares aprobados (display, lectura, lockups, dots) ← fuente de verdad
  tokens/tokens.css     Variables CSS (generado)
  assets/mdots/         30 M-dots oficiales en SVG + mdots.json (M y dot separados)
  assets/logo/          wordmark.svg y lockup.svg (vectoriales, de los cierres oficiales)
  fonts/                Obviously Narrow y Obviously (no versionadas; ver README) + Archivo
  web/                  mas.css, collins.css (layouts Collins), mas.js (componentes) y mas-data.js (generado)
  templates/            collins (12 masters Collins como layouts) · carousel · carousel-recursos · document (PDF) · motion-reel (MP4 de respaldo) · brand-sheet
  motion/reel/          Proyecto de HyperFrames del reel animado (MP4 con audio); mas/ enlaza web, tokens y fonts
  scripts/              build-data.mjs · render.mjs · hf.sh (HyperFrames) · drive-save.py · unsplash.py (fotos de Unsplash)
```

## Uso rápido

```bash
node brand/scripts/build-data.mjs                                   # tras editar tokens o assets
node brand/scripts/render.mjs brand/templates/carousel.html --png   # un PNG por slide
node brand/scripts/render.mjs brand/templates/document.html --pdf   # PDF tamaño carta
cp -a brand/motion/reel brand/work/mi-reel                          # video 1080×1920 con HyperFrames
brand/scripts/hf.sh check brand/work/mi-reel
brand/scripts/hf.sh render brand/work/mi-reel -o brand/work/mi-reel/out/mi-reel.mp4
```

Requiere Node 18+, Playwright (Chromium) y ffmpeg; HyperFrames pide Node 22+. Las salidas van a `out/` junto al HTML (ignorado por git). `hf.sh` bloquea `publish` y los renders en la nube de HeyGen, porque subirían las fuentes Obviously.
