---
name: mas-brand
description: Sistema visual de Miami Ad School México (M.AD). Úsala SIEMPRE que se pida cualquier pieza visual de MAS — imagen, post, carrusel, story, reel, video con motion, PDF, brochure, presentación, portada, cierre o diseño en Canva — o cuando se pregunte por colores, combinaciones, tipografía, logo, M-dot o reglas de marca. Trae la paleta oficial con pares de color aprobados y su contraste, las 30 variantes del M-dot, el wordmark vectorial, plantillas HTML que se renderizan a PNG/PDF/MP4 con las fuentes reales, y el flujo para trabajar en Canva con el brand kit y los Master Templates Collins.
---

# MAS Brand: producir piezas en marca

Todo vive en `brand/` (raíz del repo). Lee **`brand/BRAND.md`** completo antes de la primera pieza de la sesión: ahí están las reglas (voz, logo, color, tipo, layout, motion, templates y checklist). Esta skill es el **procedimiento**.

**Indicación de Ricardo, tipografía**: headlines **grandes y bold**. Usa las tipografías y pesos que se vean más cool aunque no estén en el manual. Por defecto: Obviously Narrow **Black** para headlines y **Super** para golpes cortos (≤ 3 palabras por línea). Para un golpe de 1–2 palabras por línea, una vez por pieza, está **Obviously Black/Super ancha** (`.h.wide`). También se vale cualquier otra fuente con licencia que esté en `brand/fonts/`, si le da más fuerza a la pieza. Pocas palabras por línea y `data-fit` para que el tipo llene el ancho. El logo, la paleta y la alineación a la izquierda no cambian.

## 0. Preparación (una vez por sesión)

1. Fuentes: `ls brand/fonts/` debe listar los 12 `.woff` de `brand/fonts/README.md`: Obviously Narrow y Obviously (ancho normal), cada una en Regular/Medium/Semibold/Bold/Black/Super. Si faltan, descárgalos en paralelo con Drive `download_file_content` (IDs en esa tabla) y luego corre `python3 -I brand/scripts/drive-save.py brand/fonts ~/.claude/projects --only Obviously-`. El renderer avisa "Faltan pesos" si algún peso usado no cargó: no entregues así.
2. Si cambiaste `brand/tokens/colors.json` o assets: `node brand/scripts/build-data.mjs` (regenera `tokens/tokens.css` y `web/mas-data.js`, e imprime el contraste de cada par).
3. La copy la escriben las skills de contenido de MAS (headline-master, carruseles-mas-instagram, content-viral-master, escritor, kallaway…). Esta skill se encarga de lo visual. Usa la voz de `BRAND.md §1` si no hay otra skill de por medio.

## 1. Elige la ruta

| Pide… | Ruta |
|---|---|
| Algo que el equipo va a editar en Canva, o "hazlo en Canva" | **B · Canva** |
| PNG/PDF final con control fino, carrusel listo para subir, PDF de programa, LinkedIn carrusel | **A · Render HTML** |
| Video, reel animado, cortinilla, intro/outro | **C · Motion** (render HTML a MP4) |

Si no está claro, pregunta una vez: "¿lo quieres editable en Canva o listo para publicar?"

## 2. Decide el color ANTES de diseñar

1. Elige el **ritmo** (BRAND.md §3.6): A Alternancia Plum↔Blush (educativo, mucho texto) · B Escalera tonal (narrativa de progreso) · C Golpe + M-dot (impacto, poco texto).
2. Toma los pares de `tokens/colors.json`:
   - headline grande → `display_pairs` (≥ 2:1)
   - cualquier texto chico (cuerpo, bullets, CTA, pies) → `text_pairs` (≥ 4.5:1)
   - logo → `lockup_combos`; cierre → `mx_tonal_variant`
3. Elige **un** secundario para el dot por pieza (`dot_rules`). Nunca como fondo ni texto.
4. Si combinas algo fuera de las listas, mide el contraste (fórmula en `scripts/build-data.mjs`; la matriz completa está en la hoja 06 de `templates/brand-sheet.html`). Mismo tono (dos *mid*) = casi siempre < 2:1 = NO.
5. Prohibido: fondo blanco, crema, gris o negro con color; tipo blanco; degradados; M de color sobre rosa; colores fuera de paleta.

## A. Render HTML → PNG / PDF

1. Copia la plantilla más cercana a una carpeta de trabajo fuera de git, p. ej. `brand/work/<slug>.html` (crea la carpeta; `**/out/` ya está ignorado; agrega `brand/work/` a `.gitignore` si no está). Ajusta las rutas relativas (`../web/…`) a la ubicación nueva.
   - `templates/carousel.html`: carrusel IG 1080×1350 (portada tipográfica, M-dot hero, lista, cita, statement, CTA, cierre).
   - `templates/document.html`: PDF carta (portada M-dot, interior legible, contraportada).
   - `templates/brand-sheet.html`: referencia del sistema (deck 1920×1080).
   - Formatos disponibles como clase de `.page`: `ig-post`, `ig-square`, `story`, `deck`, `yt-thumb`, `letter`, `a4`.
2. Componentes (`web/mas.js`):
   - `<mas-mdot v="1-30" m="black" dot="yellow-7548" dot-dx dot-dy dot-scale align>`
   - `<mas-wordmark color>`, `<mas-lockup m dot text>`
   - `<mas-pattern layers='[…]' overlaps='[…]'>`
   - En headlines, `data-fit` / `data-fit="both"` ajusta el tamaño a la caja. `.h` = Black por defecto; `.h.w9` = Super, `.h.w7` = Bold; `.h.wide` = Obviously ancha (Black; con `.w9`, Super). El cuerpo (`.body`) usa Obviously Regular. Colores = keys de tokens (`pink-2425`) o hex. Variables CSS: `var(--pink-2425)`.
3. Render: `node brand/scripts/render.mjs <archivo.html> --png` (y/o `--pdf`) `--out <dir>`. Si aparece "⚠ Faltan pesos de Obviously", detente y arregla las fuentes.
4. **QA visual obligatorio**: arma una hoja con `montage <dir>/*.png -tile 4x -geometry 432x540+8+8 -background '#333' sheet.png` y mírala con Read. Revisa la checklist de `BRAND.md §10`: dot encimado o recortado, overflow de texto, contraste, M-dot repetido, alineación. Itera hasta que pase.
5. Entrega con SendUserFile (PNGs del carrusel y/o PDF). Para LinkedIn: `--pdf` de un HTML con páginas 1080×1350.

## B. Canva

IDs (cuenta del usuario):
- **Brand kit**: `kAG8MAKnMso` ("Miami Ad School · Collins").
- **Brand Templates Collins 1080×1350** (sin autofill):

  | Template | ID | Template | ID |
  |---|---|---|---|
  | Tips | `EAHYALEcmI0` | Insighters | `EAHYADk_ltg` |
  | Tips with Images | `EAHYAKNzwNk` | Hired | `EAHX_-jlYyM` |
  | Facts | `EAHYAKoW7FE` | 2BeHired | `EAHX_yF0EDM` |
  | Quotes | `EAHX_-GHkI0` | Award Winner | `EAHX_3YMIX0` |
  | Poll Results | `EAHYAB5q12M` | Award Winner Carousel | `EAHX_xE1--c` |
  | Single Photo | `EAHYAFICEro` | Multiple Photo | `EAHYAO-xSMQ` |

- **Diseños de referencia en marca**:
  - `DAHYGkPCaUk` ("7 preguntas…", alternancia Plum/Blush + cierre). Ojo: sus headlines van en MAYÚSCULAS; en piezas nuevas usa sentence case.
  - `DAHYGQWC7L0` ("7 archivos visuales", Tips with Images en color).
- **No usar como referencia**: `DAHYFk508X8` (fondo blanco) y `DAHYGSQxc60` (fondo crema, tipo blanco, otras fuentes).

Flujos:
1. **Partir de una pieza buena** (preferido para carruseles): `copy-design` del diseño de referencia → `read-design` con `open_transaction: true` (obtén los locator IDs) → `edit-design` con `replace_text` / `find_and_replace_text`, `format_text` (color hex de tokens), `recolor_element`, `add_page` (`background_color` = hex de fondo) → muestra la vista previa → **pide aprobación** → `commit`.
2. **Desde Brand Template**: `create-design-from-brand-template` con el ID → editar igual que arriba → pintar los fondos y el tipo con un par aprobado (los masters vienen en blanco y negro).
3. **M-dot dentro de Canva**: `edit-design` → `insert_shape` con `path` = `d` de `brand/assets/mdots/mdots.json`, `view_box_width/height` = `w/h`, `color` `#000000`. El dot va como segundo `insert_shape`: círculo con path `M cx-r,cy A r,r 0 1 0 cx+r,cy A r,r 0 1 0 cx-r,cy Z`, mismo viewBox y misma caja, color secundario. (Valida la alineación en la primera vista previa.)
4. **Generación rápida** (ideas, no final): `generate-design` con `brand_kit_id: kAG8MAKnMso` y un query que incluya las reglas (fondo rosa sólido, par de color exacto en hex, tipo alineado a la izquierda, sentence case, sin blanco ni degradados). Siempre haz QA contra la checklist antes de proponerlo.
5. **Llevar un PNG/PDF renderizado a Canva**: las herramientas de import solo aceptan URLs públicas existentes. Nunca subas archivos a un hosting público para conseguir una URL. Entrega el archivo y pide que lo arrastren a Canva.

## C. Motion → MP4

1. Parte de `templates/motion-reel.html` (1080×1920, 7.5 s: M-dot pop, dot que cae y rebota, tipo por líneas, wipe, cierre con lockup).
2. Animaciones **solo CSS @keyframes o Web Animations** con `animation-delay` absoluto y `fill-mode: both`; JS propio vía `window.MAS_SEEK(ms)`. `data-duration="segundos"` en `.page`.
3. Reglas: sin rotar, deformar ni aplicar efectos al M-dot, al dot ni al lockup; cambio de variante por corte; fondo sólido por escena con par aprobado; texto dentro de safe zones (250 px arriba / 340 px abajo).
4. Render: `node brand/scripts/render.mjs <archivo.html> --mp4 --fps 30 --out <dir>`. QA: extrae cuadros con `ffmpeg -ss <t> -i out.mp4 -frames:v 1 f.png`, haz `montage` y revisa: descendentes recortados, elementos que aparecen antes de tiempo, overflow.
5. Entrega el MP4 (H.264, yuv420p, listo para IG/TikTok). Si el usuario usa Claude Motion, Canva puede importar ese video con `import-claude-motion-from-url`.

## Fuentes originales (Google Drive)

- **Carpeta BRAND (privada, preferida)**: `176DZ0g0KZmKeiqxdg7z31zccdx419p9k` (Typeface(s) = familia Obviously completa + licencias Desktop y Web, LOGOS, 04 Paleta de color, templates Collins, Artes 2 = fotos con tratamiento M-dot)
- **Typeface(s)**: `1E8RXmt4XLlNV03uO_YEswaOBpYQqxpw0` (IDs de cada archivo en `brand/fonts/README.md`)
- Carpeta BRANDING – MIAMI AD SCHOOL (pública por enlace; no subir ahí fuentes): `1mqQB7tKVkhZ1IGAfGBoLDFnu9sD66-X9`
- Manual de identidad: `1L4-Bp2DnjfQk9EvcXYPqgXhAWI8Jvp-Z` (72 pp.). El brand book completo de 85 pp. lo compartió el usuario por chat: "brand book.pdf" (Drive `1QGMB-xU7OG5Qfj2SwfYYmr5f1kA1J-KA`).
- Paleta `.ai`: `1HDKsckaI23GDOC75FTm8KermxIDHe0xP` · `.ase`: `1fxApl6reymGskW8IUYW0DhP4HE0Fa438`
- M-dots SVG (carpeta): `19kvGKrZJsVVbGcydKlyZDNgQ3FqsKI70` · Cierres `.ai`: `1tFJY5FrkQ7zMyZNElh7UCu6vTLVUjPB9`
- Templates Collins `.ai` (carpeta): `1L-x3QP79ntpc7aYAxCs7H8inV0riUZnS`
- Brand Canvas (voz): `1clqvmrSjekcGoTJJp1iqvunmtYY7pNXc2lRJ4w_6x6g`
