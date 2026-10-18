# Sistema de marca · Miami Ad School México

Kit para producir piezas en marca con Claude: carruseles, posts, stories, PDFs y video, con las fuentes, colores y M-dots oficiales.

Reglas de Ricardo que mandan sobre el manual: headlines grandes y bold, **nunca texto negro** (todo en rosas), **sin M-dots dentro de los slides** (el logo solo en el cierre) sin flechas, fotos con sus colores originales, y libertad de dirección de arte para romper el resto. Detalle en `BRAND.md`.

```
brand/
  BRAND.md              Reglas de marca (voz, logo, color, tipo, layout, motion, templates, checklist)
  tokens/colors.json    Paleta oficial + pares aprobados (display, lectura, lockups, dots) ← fuente de verdad
  tokens/tokens.css     Variables CSS (generado)
  assets/mdots/         30 M-dots oficiales en SVG + mdots.json (M y dot separados)
  assets/logo/          wordmark.svg y lockup.svg (vectoriales, de los cierres oficiales)
  fonts/                Obviously Narrow y Obviously (no versionadas; ver README) + Archivo
  web/                  mas.css, collins.css (layouts Collins), mas.js (componentes) y mas-data.js (generado)
  templates/            collins (12 masters Collins como layouts) · carousel · carousel-recursos · carousel-podcasts · carousel-imagenes · document (PDF) · motion-reel (MP4) · brand-sheet
  scripts/              build-data.mjs · render.mjs · drive-save.py · unsplash.py (fotos de Unsplash)
```

## Uso rápido

```bash
node brand/scripts/build-data.mjs                                   # tras editar tokens o assets
node brand/scripts/render.mjs brand/templates/carousel.html --png   # un PNG por slide
node brand/scripts/render.mjs brand/templates/document.html --pdf   # PDF tamaño carta
node brand/scripts/render.mjs brand/templates/motion-reel.html --mp4  # video 1080×1920
```

Requiere Node 18+, Playwright (Chromium) y ffmpeg para MP4. Las salidas van a `out/` junto al HTML (ignorado por git).
