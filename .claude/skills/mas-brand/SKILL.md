---
name: mas-brand
description: Sistema visual de Miami Ad School México (M.AD). Úsala SIEMPRE que se pida cualquier pieza visual de MAS — imagen, post, carrusel, story, reel, video con motion, PDF, brochure, presentación, portada, cierre o diseño en Canva — o cuando se pregunte por colores, combinaciones, tipografía, logo, M-dot o reglas de marca. Trae la paleta oficial con pares de color aprobados y su contraste, las 30 variantes del M-dot, el wordmark vectorial, plantillas HTML que se renderizan a PNG/PDF/MP4 con las fuentes reales, y el flujo para trabajar en Canva con el brand kit y los Master Templates Collins.
---

# MAS Brand: producir piezas en marca

Todo vive en `brand/` (raíz del repo). Lee **`brand/BRAND.md`** completo antes de la primera pieza de la sesión: ahí están las reglas (voz, logo, color, tipo, layout, motion, templates y checklist). Esta skill es el **procedimiento**.

## Indicaciones de Ricardo (mandan sobre el manual)

1. **Headlines grandes y bold.** Usa las tipografías y pesos que se vean más cool aunque no estén en el manual. Por defecto: Obviously Narrow **Black**, y **Super** para golpes cortos (≤ 3 palabras por línea). Para un golpe de 1–2 palabras por línea, una vez por pieza, está **Obviously Black/Super ancha** (`.h.wide`). También se vale cualquier otra fuente con licencia que esté en `brand/fonts/`. Pocas palabras por línea y `data-fit` para que el tipo llene el ancho.
2. **Nunca letras negras** (ni blancas). Todo el texto va en un rosa de la paleta, en un par de `text_pairs`. El negro solo existe en el M del logo.
3. **Sin M-dots dentro de los slides** (ni en posts, escenas de reel o páginas). El **logo va solo al final**, en el cierre (lockup). Nada de wordmark en la portada.
4. **Texto de apoyo grande y grueso**: todo lo que va abajo (cuerpo, bullets, CTA, "Desliza →") en **Obviously Narrow Bold** con la clase `.support` (64 px en 1080; `.support.sm` = 52 px para dos columnas o bloques largos). Nunca Obviously Regular delgada en slides: no se lee. Máximo 2–3 frases por slide.
5. **Fotos tal como son**: con sus colores originales. Nunca filtros rosas ni de otro color, duotonos, tintes ni color grade.

El logo, la paleta y la alineación a la izquierda no cambian.

## Cómo trabaja Ricardo (aprendido en producción)

**Su copy**
- Ricardo manda la copy slide por slide: úsala tal cual.
- Solo cambia títulos en MAYÚSCULAS a sentence case y quita la numeración de los títulos ("1.", "2.").
- Nunca agregues números de slide, folios ni contadores ("01/10").
- Si cambias algo más, dilo en la entrega.

**Diseño que le funcionó**
- Referencias aprobadas: `templates/carousel.html` ("8 ajustes", le dijo "wow, me gusta") y `templates/carousel-recursos.html` ("7 herramientas").
- Lo que le gusta:
  - tipo rosa enorme;
  - un color y un layout distinto en cada slide;
  - portada solo tipográfica;
  - cierre con frase y lockup tonal.
- Lo que rechazó:
  - texto negro;
  - M-dots dentro de los slides;
  - letra de apoyo delgada o chica;
  - descendentes que chocan con la línea de abajo;
  - fotos con filtro rosa.

**Entrega**
- Manda una vista previa (`montage` de los 10 slides) y **un ZIP** con los PNG numerados (`<pieza>-01.png`…). Los PNG sueltos no: descargarlos uno por uno es incómodo.
- Al final ofrece en una línea: caption (skill `carruseles-mas-instagram`, sin hashtags salvo que los pida), PDF para LinkedIn o un reel.
- Si pregunta cómo subirlo:
  - selecciona en orden del 01 al 10;
  - recorte 4:5 (vertical completo), no cuadrado;
  - sin filtros de Instagram.

**QA que no se salta**
1. Revisa los slides a tamaño real, no solo la hoja: busca descendentes que tocan la línea, el filete o el link de abajo, desbordes y textos pegados.
2. Revisa que no haya texto negro con:
   `for f in <dir>/*.png; do convert "$f" -fuzz 12% -fill white +opaque black -fill black -opaque black -format '%[fx:(1-mean)*100]\n' info:; done`
   Todo tiene que dar 0 (si el cierre usa el lockup con M negro, solo ese slide puede dar más que 0).
3. Si Ricardo encuentra un error, revisa si el mismo error está en los demás slides y en las plantillas, y arréglalo en el sistema, no solo en la pieza.

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

## 2. Dirección de arte: elige los layouts Collins

Antes de diseñar, haz el plan slide por slide: qué layout Collins (`BRAND.md §9`) le toca a cada slide según su contenido, y qué par de color. Reglas:
- 3 a 5 layouts por carrusel: portada, 1–2 de contenido, un respiro (Dato curioso, Frase célebre o foto a sangre) y cierre.
- Los elementos paralelos van en el mismo layout. Rompe la serie a la mitad con un respiro.
- Alterna lectura y golpe visual. Nunca más de dos slides de texto seguidos.
- Si la pieza tiene personas, premios, eventos o datos, usa su template de la tabla de `BRAND.md §9` (Egresados contratados, Premio ganado o Premio de alumno, Anunciar charla invitado, Dato curioso, Resultados de encuesta). No lo resuelvas todo con Tips educativos.
- Sin foto disponible, no uses layouts de foto con huecos vacíos: pide las fotos o elige otro layout.
- Fotos siempre con sus colores originales: nunca filtros, duotonos ni tintes.

## 2b. Decide el color ANTES de diseñar

1. Elige el **ritmo** (BRAND.md §3.6): A Alternancia Plum↔Blush (educativo, mucho texto) · B Escalera tonal (narrativa de progreso) · C Golpe + M-dot (impacto, poco texto).
2. Toma los pares de `tokens/colors.json`:
   - headline grande → `display_pairs` (≥ 2:1)
   - texto de apoyo (cuerpo, bullets, CTA) → `text_pairs`: rosa sobre rosa, ≥ 3:1 con `.support` (Narrow Bold ≥ 52 px). Nunca negro.
   - logo (solo en el cierre) → Variante MX tonal (M y wordmark en un rosa sobre otro) o `lockup_combos`
3. Elige **un** secundario para el dot del lockup del cierre (`dot_rules`). Es el único lugar donde aparece. Nunca como fondo ni texto.
4. Si combinas algo fuera de las listas, mide el contraste (fórmula en `scripts/build-data.mjs`; la matriz completa está en la hoja 06 de `templates/brand-sheet.html`). Mismo tono (dos *mid*) = casi siempre < 2:1 = NO.
5. Prohibido: fondo blanco, crema, gris o negro con color; **tipo negro o blanco**; degradados; M-dots dentro de los slides; colores fuera de paleta.
6. Con texto rosa sobre rosa, los fondos que dan para mucho texto son: Blush, Lilac Pink, Light Orchid, Orchid, Salmon (con Plum o Rubine) y Plum o Rubine (con Blush, Lilac Pink, Light Orchid o Salmon). Para variar color entre slides, alterna fondos claros y oscuros con esos pares.

## A. Render HTML → PNG / PDF

1. Copia la plantilla más cercana a una carpeta de trabajo fuera de git, p. ej. `brand/work/<slug>.html` (crea la carpeta; `**/out/` ya está ignorado; agrega `brand/work/` a `.gitignore` si no está). Ajusta las rutas relativas (`../web/…`) a la ubicación nueva.
   - **`templates/collins.html` + `web/collins.css`: los 12 Master Templates de Collins como 20 layouts** (clases `c-…`). Es la base para cualquier carrusel o post: elige el layout de cada slide con la tabla de `BRAND.md §9`, que lista los 12 templates con su nombre nuevo (`MAS · Formato · Para qué sirve · Detalle (Collins)`) más el cierre. El índice oficial vive en Drive: `MAS · README · Índice de templates (Collins).md`, dentro de BRAND/templates Collins 1080x1350.
   - `templates/carousel-recursos.html`: carrusel de recursos (7 herramientas): un layout distinto por recurso, con nombre, frases de apoyo y enlace.
   - `templates/carousel.html`: carrusel tipográfico de ejemplo con 10 layouts propios, sin M-dots: portada tipográfica (golpe ancho + Narrow Black), headline + ejemplo como cita, headline + frases + remate con flecha, statement en Super, lista con flechas, headline que crece línea a línea, pregunta protagonista, comparación a dos columnas, golpe ancho, cierre con frase + lockup.
   - `templates/document.html`: PDF carta (portada tipográfica, interior legible, contraportada con lockup).
   - `templates/brand-sheet.html`: referencia del sistema (deck 1920×1080).
   - Formatos disponibles como clase de `.page`: `ig-post`, `ig-square`, `story`, `deck`, `yt-thumb`, `letter`, `a4`.
2. Componentes (`web/mas.js`):
   - `<mas-lockup m dot text>`: el logo, **solo en el cierre**.
   - `<mas-photo src shape="circle" pos="50% 30%">`: foto recortada (rectángulo o círculo) con sus colores originales, sin filtros. Las fotos van en `brand/work/fotos/` (fuera de git).
   - `<mas-mdot>`, `<mas-wordmark>` y `<mas-pattern>` existen para la hoja de marca; no los pongas dentro de los slides.
   - En headlines, `data-fit` / `data-fit="both"` ajusta el tamaño a la caja. `.h` = Black por defecto; `.h.w9` = Super, `.h.w7` = Bold; `.h.wide` = Obviously ancha (Black; con `.w9`, Super). Texto de apoyo: `.support` (Narrow Bold 64 px) y `.support.sm` (52 px). `.body` (Obviously Regular) solo para párrafos largos de PDF. Colores = keys de tokens (`pink-2425`) o hex. Variables CSS: `var(--pink-2425)`.
3. Render: `node brand/scripts/render.mjs <archivo.html> --png` (y/o `--pdf`) `--out <dir>`. Si aparece "⚠ Faltan pesos de Obviously", detente y arregla las fuentes.
4. **QA visual obligatorio**: arma una hoja con `montage <dir>/*.png -tile 4x -geometry 432x540+8+8 -background '#333' sheet.png` y mírala con Read. Revisa la checklist de `BRAND.md §10`: descendentes (g, j, p, y) que toquen la línea de abajo o un filete, nada de texto negro, ningún M-dot fuera del cierre, texto de apoyo legible a tamaño de teléfono (Narrow Bold ≥ 52 px), overflow, contraste, alineación. Itera hasta que pase.
5. Entrega con SendUserFile: vista previa + ZIP con los PNG numerados (ver "Cómo trabaja Ricardo"). Para LinkedIn: `--pdf` de un HTML con páginas 1080×1350.

## Biblioteca de MAS en Drive (privada)

Carpeta **BIBLIOTECA** dentro de BRAND: `18n0WHBOuaIIMH24L9b5nQ4IX0XQ8h4AR`. Reglas de uso para el equipo en el doc "00 LÉEME" (`1LPo4XmvBCW9nwU73E4WHQXnNjaOIxWbiGp44i6rfcxo`) y, para fotos y videos, en "00 Instructivo · Cómo guardar fotos y videos" (`1iLfS1_Q35ro6aiYPHsuMQ6e2NuO86CC-zawditB138U`).

| Carpeta | ID | Para qué |
|---|---|---|
| 01 FOTOS MAS | `1U5ARvJvLUSlUw6ygyeAodMZtVQhI-2UI` | fotos reales. Subcarpetas: Alumnos en clase `1lgN0oA5txL-lxcyT_jKP3DXlc3BcP2hM` · Presentaciones y críticas `1Zp1UGFRcMSpJ6TwNPk12XplobQtSMqfX` · Eventos y speakers `1_WHrdhtXPy26HvY9t0g6cwE4my_XTDra` · Egresados contratados `1V75obl96Z642qxrTdURtmXU6kEn1MSTY` · Premios `1y08KTG1jm2-uaX2qHVqCmQQY5Zxa6N74` · Campus y comunidad `1ywOsbMHTdK8iVxU_NwBKkJSFH5hcB9_j` · Equipo MAS `1KySQ0YI70uo4_tVAbPKhiotBgrGZ246P` · Detrás de cámaras `14qmm_LH4Fb3i0Y8P-o5uox8KDZBXzsKI` |
| 02 TRABAJOS DE ALUMNOS | `1z1yNA9O99c5B76SUt3anyakFJqwCxEWN` | piezas de alumnos con créditos |
| 03 LOGOS | `1488TFdIESBMkVaobxPW9QnCeJkMZDvCy` | Premios `1WCbLHGBZ2N3zd0q224Qazqw2FADK5HUR` · Agencias `1ZWOhUzm4XJrYs8Ivf5tI0h_zeh1PRUpi` · Aliados y empresas `1ApChN19970XL9i4yEa5xs4pRIHnUPnDz` |
| 04 DATOS OFICIALES | `1-2IRTRgVXL3gWeL3z4B97yxySYLLQoyH` | doc "Datos oficiales MAS" `1imI8T9oq4ODko1UEyrRfsf4MlHxG3uyfAoTf-beqRL8` |
| 05 TESTIMONIOS | `1PGsXLU6dw2_WPLkZYONXAcT6MrtNdw5e` | frases, audios y videos con permiso |
| 06 PROFESORES Y MENTORES | `1Jojb9ondBCiiVx45ifAMr5cx7yAEsIlK` | foto, puesto, agencia y bio |
| 07 PROGRAMAS Y BOOTCAMPS | `1coStAMcvmuW4lSzP9YM9F5W5yw671rP0` | temarios, fechas y material de venta |
| 08 VIDEO | `1H92TSZkp2pAK0-dPoWo1xu9YfDaaMcSq` | Clases `1i-IJGDELsfVHy3Xq2f8ztncdo2iUQt19` · Eventos `1UEItD-WqiWnEm1AjiI08hiki03bOs9aL` · Testimonios `1LuCToNQGSnYV_BRjI92pQHChZ84kBW3a` · B-roll `1SJtGw6OMrJYR9yWicMGrHhBNTpsgWLZe` |
| 09 CAPTURAS | `1SKYWcQYtr68_Ceq8Q3aHo7wtluJynApx` | pantallas de herramientas para carruseles de recursos |
| 10 REFERENCIAS | `1m3OWTYqhm4UFQk3wynmsWADwZWlMj1MO` | piezas que le gustan a Ricardo (el porqué va en el nombre) |
| 11 IDEAS Y TEMAS | `1GsujKx5DM3Oj3GjECDEYKfEpA5ibu54u` | hoja "Banco de temas" `1gUeofibBMooUA7fENEr0A4CpiI4LVXNStF2259V0U_A` |
| 12 PIEZAS PUBLICADAS | `1ot8KE1whDRZrKT-mOLfu2ULNRG-Ge2V8` | ZIP o PDF final de lo publicado |
| 13 MÉTRICAS | `1L-P6Crn4hgfB4FaeaBSPco_TEhkfbMEo` | exports de Instagram |
| 14 PRENSA Y MENCIONES | `1KxgxqhVL1tzlYYo4zRUzugNdZuLW0iX5` | notas y entrevistas |
| 15 ALIANZAS Y EMPRESAS | `1055uaW4wPj5NpnxCtAOusp4Zhla6doDb` | empresas que contratan, convenios |
| 16 CALENDARIO | `1XKpiHYIobtp9u42ACRYaavVgRzKzrPjO` | hoja "Fechas clave" `1g9BhF5civaNrKtIDbl1nkRGg4hChZFWAALrUcaXSntI` |
| 17 MÚSICA CON LICENCIA | `10GZeD9mTNwUYHYpZenjc01oDLNuM6W3C` | pistas para reels con su licencia |
| 18 PLANTILLAS EDITABLES | `1L4OniZR1igeOOhvgxH97_RLIg6xJjwSI` | editables del equipo (Canva y otros) |

Cómo usarla en cada pieza:
1. Antes de proponer o producir, lee el "Banco de temas" y lista "12 PIEZAS PUBLICADAS" para no repetir temas.
2. Cifras, precios, fechas y premios: solo del doc "Datos oficiales MAS". Si dice "Pendiente" o no está, no lo pongas en la pieza.
3. Fotos: busca primero en "01 FOTOS MAS" (`search_files` con `parentId`), bájalas con `download_file_content` y guárdalas con `python3 -I brand/scripts/drive-save.py brand/work/fotos/drive ~/.claude/projects`. Si no hay foto que sirva, usa Unsplash. Cómo las guarda el equipo (según el instructivo):
   - Cada evento es una subcarpeta `año-mes_evento_que-pasa` dentro de la subcarpeta temática; adentro las fotos pueden tener el nombre del celular (`IMG_4521.jpg`).
   - `_top` en el nombre marca las 3–5 mejores del evento: pruébalas primero.
   - `_interno` en el nombre: nunca la uses en una pieza.
   - Retratos `nombre-apellido_puesto_agencia.jpg`: de ahí salen nombre, puesto y agencia para c-hired, c-speaker y c-photos-2. Escríbelos con mayúsculas y acentos correctos (el archivo va sin acentos); si dudas de uno, pregúntale a Ricardo.
   - HEIC del iPhone: Chromium no lo muestra; conviértelo antes con `convert foto.heic -quality 92 foto.jpg`.
   - Revisa el tamaño con `identify`: a pantalla completa (c-photo-full) pide al menos 1080 px de ancho; una foto más chica o comprimida por WhatsApp úsala solo en huecos chicos (círculos, c-news).
4. Logos de premios y agencias: "03 LOGOS". Capturas para carruseles de recursos: "09 CAPTURAS".
5. Si la carpeta que necesitas está vacía, dile a Ricardo qué subir y dónde, en una línea.
6. En esta sesión solo hay conector de Drive: puedes crear y leer archivos, pero no editar un Sheet o Doc existente. Para agregar una fila al Banco de temas, pídeselo a Ricardo o pide que active los conectores de Google Sheets y Docs.

## Fotos de Unsplash

Hay dos rutas. Usa la que esté disponible en la sesión; las dos guardan todo en `brand/work/fotos/unsplash/` (fuera de git).

**Ruta 1 · Conector de Unsplash (preferida; no necesita llave).** Si existen las herramientas `mcp__Unsplash__*`:
1. `search_photos` con `query` corta en inglés (un concepto por búsqueda), `orientation` según el hueco del layout, `per_page` 6–12 y `content_filter: high`.
2. Baja las miniaturas (`urls.small`) con `curl` a `busqueda-<slug>/NN.jpg` y arma la hoja con `montage -label '%t' … -tile 4x -geometry '360x360>+10+10'`. Mírala con Read para elegir.
3. Para cada foto elegida llama `download_asset` con su `id` (registra la descarga, como pide Unsplash) y baja la URL que devuelve con `curl` agregando `&w=2160` a `<id>.jpg`.
4. Anota el crédito en `creditos.md`: `Foto: <user.name> / Unsplash` con los enlaces `user.links.html` y `links.html` más `?utm_source=mas_mexico_brand&utm_medium=referral`.
Necesita `images.unsplash.com` permitido en el acceso a red.

**Ruta 2 · Script con llave propia.** Requiere la variable `UNSPLASH_ACCESS_KEY` y los dominios `api.unsplash.com` e `images.unsplash.com` permitidos. Si falta algo, el script lo dice; pásale a Ricardo el paso que falta y no inventes fotos.

Comandos:
- `python3 -I brand/scripts/unsplash.py buscar "consulta" [--orientacion portrait|landscape|squarish] [--n 12]`: guarda `busqueda-<slug>.json`, arma la hoja de contacto numerada `busqueda-<slug>.jpg` e imprime número, id, tamaño, autor y descripción.
- `python3 -I brand/scripts/unsplash.py bajar <id> [<id> ...] [--ancho 2160]`: descarga `<id>.jpg`, avisa la descarga a Unsplash (lo pide su guía) y suma el crédito a `creditos.json` y `creditos.md`.
- Pruebas sin red: `python3 -I -m unittest discover -s brand/scripts -p "test_*.py"`.

Flujo (Ricardo quiere que Claude elija las fotos y las ponga directo en la pieza):
1. Planea qué slides llevan foto y qué layout Collins le toca a cada uno. Si es de MAS (alumnos, eventos, premios, egresados), la foto sale de la BIBLIOTECA, no de Unsplash.
2. Busca con consultas en inglés y concretas ("art director reviewing layouts", "creative team workshop"). Usa `--orientacion` según el hueco del layout: `portrait` para Lista de recomendaciones · Con foto, `squarish` para círculos, `landscape` para fotos horizontales. Si los resultados no sirven, reformula la búsqueda (máximo 3 intentos por slide).
3. Mira la hoja de contacto con Read y elige tú con estos criterios, en orden:
   - Dice lo mismo que el slide, literal o como metáfora clara. Nada de clichés de banco (apretón de manos, foco, gente sonriendo a cámara).
   - Funciona en el recorte del layout: sujeto centrado para círculos; aire donde corta el rectángulo.
   - Sus colores conviven con el rosa del slide sin filtros: tonos cálidos, neutros, rojos o rosas antes que verdes o azules saturados.
   - Auténtica (gente creando o presentando, sin pose), sin logos ni texto que distraiga y con resolución suficiente para el hueco.
   - Variedad en la pieza: no repitas el mismo tipo de toma o color dominante en slides seguidos.
4. Baja solo las elegidas y úsalas con `<mas-photo src="../work/fotos/unsplash/<id>.jpg">`. Pon el crédito con `<div class="c-credit">Foto: Nombre / Unsplash</div>` (chico, fuera de la foto; en `c-tips-img` ya va justo arriba de la imagen) o en el caption.
5. Renderiza, haz el QA y entrega. En el mensaje di qué foto va en cada slide y por qué en una línea, y ofrece cambiar cualquiera (la hoja de contacto queda guardada para eso).
6. Cupo: el modo demo da 50 llamadas por hora (cada búsqueda cuenta 1 y cada foto bajada 2). Un carrusel típico usa de 10 a 20.

Reglas:
- Fotos con sus colores originales, sin filtros.
- Crédito `Foto: Nombre / Unsplash` (campo `etiqueta` de `creditos.json`) en el `.c-label` del slide o en el caption.
- Evita personas identificables en anuncios pagados: Unsplash no da permisos de modelo.
- Nunca subas fotos al repo (`brand/work/` está en `.gitignore`).

## B. Canva

IDs (cuenta del usuario):
- **Brand kit**: `kAG8MAKnMso` ("Miami Ad School · Collins").
- **Brand Templates Collins 1080×1350** (sin autofill). Los nombres son los del índice de Drive; el título dentro de Canva puede seguir con el nombre viejo (`MAS · Collins 1080×1350 · …`), así que busca por ID:

  | Template (nombre nuevo, sin `.ai`) | ID Canva |
  |---|---|
  | MAS · Carrusel 4:5 · Tips educativos · Tipográfico (Collins) | `EAHYALEcmI0` |
  | MAS · Carrusel 4:5 · Lista de recomendaciones · Con foto (Collins) | `EAHYAKNzwNk` |
  | MAS · Carrusel 4:5 · Dato curioso · 2 slides (Collins) | `EAHYAKoW7FE` |
  | MAS · Post 4:5 · Frase célebre · Tipográfico (Collins) | `EAHX_-GHkI0` |
  | MAS · Post 4:5 · Resultados de encuesta · Tipográfico (Collins) | `EAHYAB5q12M` |
  | MAS · Post 4:5 · Noticia de egresado · 2 versiones (Collins) | `EAHYAFICEro` |
  | MAS · Carrusel 4:5 · Anunciar charla invitado · 3 slides (Collins) | `EAHYADk_ltg` |
  | MAS · Carrusel 4:5 · Egresados contratados · 3 slides (Collins) | `EAHX_-jlYyM` |
  | MAS · Carrusel 4:5 · Talento por contratar · 2 slides (Collins) | `EAHX_yF0EDM` |
  | MAS · Post 4:5 · Premio ganado · 3 versiones con foto (Collins) | `EAHX_3YMIX0` |
  | MAS · Carrusel 4:5 · Premio de alumno · 2 slides (Collins) | `EAHX_xE1--c` |
  | MAS · Post 4:5 · Evento con ponentes · 3 versiones con fotos (Collins) | `EAHYAO-xSMQ` |

- **Diseños de referencia en marca**:
  - `DAHYGkPCaUk` ("7 preguntas…", alternancia Plum/Blush + cierre). Ojo: sus headlines van en MAYÚSCULAS; en piezas nuevas usa sentence case.
  - `DAHYGQWC7L0` ("7 archivos visuales", Lista de recomendaciones · Con foto, en color).
- **No usar como referencia**: `DAHYFk508X8` (fondo blanco) y `DAHYGSQxc60` (fondo crema, tipo blanco, otras fuentes).

Flujos:
1. **Partir de una pieza buena** (preferido para carruseles): `copy-design` del diseño de referencia → `read-design` con `open_transaction: true` (obtén los locator IDs) → `edit-design` con `replace_text` / `find_and_replace_text`, `format_text` (color hex de tokens), `recolor_element`, `add_page` (`background_color` = hex de fondo) → muestra la vista previa → **pide aprobación** → `commit`.
2. **Desde Brand Template**: elige el master por contenido con la tabla de `BRAND.md §9` (puedes combinar varios masters en un carrusel: crea uno por tipo de slide y júntalos con `merge-designs`) → `create-design-from-brand-template` con el ID → editar igual que arriba → pintar los fondos y el tipo con un par aprobado (los masters vienen en blanco y negro) y borrar los M-dots de los slides interiores.
3. **Logo en Canva (solo en el cierre)**: los Collins traen M-dots en slides interiores (Frase célebre, Resultados de encuesta, Anunciar charla invitado, Egresados contratados): bórralos. Si el cierre necesita el logo, usa el lockup del brand kit o `insert_shape` con el `d` del M (`brand/assets/mdots/mdots.json` o `assets/logo/lockup.svg`) en un rosa tonal, más el dot como círculo `M cx-r,cy A r,r 0 1 0 cx+r,cy A r,r 0 1 0 cx-r,cy Z` en el secundario. Todo el texto en rosas: cambia a rosa cualquier texto negro de los masters.
4. **Generación rápida** (ideas, no final): `generate-design` con `brand_kit_id: kAG8MAKnMso` y un query que incluya las reglas (fondo rosa sólido, par de color exacto en hex, tipo alineado a la izquierda, sentence case, sin blanco ni degradados). Siempre haz QA contra la checklist antes de proponerlo.
5. **Llevar un PNG/PDF renderizado a Canva**: las herramientas de import solo aceptan URLs públicas existentes. Nunca subas archivos a un hosting público para conseguir una URL. Entrega el archivo y pide que lo arrastren a Canva.

## C. Motion → MP4

1. Parte de `templates/motion-reel.html` (1080×1920, 7.5 s: tipo por líneas, wipe entre escenas, cierre con lockup y dot que cae y rebota). Sin M-dots en las escenas.
2. Animaciones **solo CSS @keyframes o Web Animations** con `animation-delay` absoluto y `fill-mode: both`; JS propio vía `window.MAS_SEEK(ms)`. `data-duration="segundos"` en `.page`.
3. Reglas: el logo solo entra en la escena final; sin rotar, deformar ni aplicar efectos al lockup ni al dot; fondo sólido por escena con par aprobado; texto en rosas (nunca negro) y dentro de safe zones (250 px arriba / 340 px abajo).
4. Render: `node brand/scripts/render.mjs <archivo.html> --mp4 --fps 30 --out <dir>`. QA: extrae cuadros con `ffmpeg -ss <t> -i out.mp4 -frames:v 1 f.png`, haz `montage` y revisa: descendentes recortados, elementos que aparecen antes de tiempo, overflow.
5. Entrega el MP4 (H.264, yuv420p, listo para IG/TikTok). Si el usuario usa Claude Motion, Canva puede importar ese video con `import-claude-motion-from-url`.

## Fuentes originales (Google Drive)

- **Carpeta BRAND (privada, preferida)**: `176DZ0g0KZmKeiqxdg7z31zccdx419p9k` (Typeface(s) = familia Obviously completa + licencias Desktop y Web, LOGOS, 04 Paleta de color, templates Collins, Artes 2 = fotos con tratamiento M-dot)
- **Typeface(s)**: `1E8RXmt4XLlNV03uO_YEswaOBpYQqxpw0` (IDs de cada archivo en `brand/fonts/README.md`)
- Carpeta BRANDING – MIAMI AD SCHOOL (pública por enlace; no subir ahí fuentes): `1mqQB7tKVkhZ1IGAfGBoLDFnu9sD66-X9`
- Manual de identidad: `1L4-Bp2DnjfQk9EvcXYPqgXhAWI8Jvp-Z` (72 pp.). El brand book completo de 85 pp. lo compartió el usuario por chat: "brand book.pdf" (Drive `1QGMB-xU7OG5Qfj2SwfYYmr5f1kA1J-KA`).
- Paleta `.ai`: `1HDKsckaI23GDOC75FTm8KermxIDHe0xP` · `.ase`: `1fxApl6reymGskW8IUYW0DhP4HE0Fa438`
- M-dots SVG (carpeta): `19kvGKrZJsVVbGcydKlyZDNgQ3FqsKI70` · Cierres `.ai`: `1tFJY5FrkQ7zMyZNElh7UCu6vTLVUjPB9`
- Templates Collins `.ai` con nombres nuevos + índice (carpeta, privada): `1UA6OykaKv-clBWVUmbQzNvbyWMydQEG7` (BRAND/templates Collins 1080x1350; índice `1xpEJ51ezQKpNrOKwDSDz291TvNddK8jv`)
- Brand Canvas (voz): `1clqvmrSjekcGoTJJp1iqvunmtYY7pNXc2lRJ4w_6x6g`
