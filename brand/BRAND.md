# Miami Ad School México: manual operativo de marca

Fuente de verdad para producir piezas de MAS México (Canva, carruseles, PDFs, motion). Resume y aterriza:

- **Brand Guidelines M.AD School of Ideas v1.0** (Collins, feb 2020, 85 pp.): manual global.
- **Miami Ad School styleguide 4**: reglas web (grid, jerarquías, color por página, fotografía).
- **PALETA DE COLORES.ai / M.AD Color Palette.ase**: valores de color.
- **M.ad-cierres.ai**: cierres oficiales de MAS México.
- **Templates Collins 1080×1350** (12 masters) y los carruseles hechos con ellos en Canva.
- **MIAMI AD SCHOOL – BRAND CANVAS** (Google Doc): voz, tono y mensajes.

Cuando algo no esté aquí, manda el manual global. Cuando MAS México tenga una práctica local distinta, se marca como **Variante MX**.

> **Indicaciones de Ricardo (oct 2026). Mandan sobre el manual y sobre todo lo que sigue:**
> 1. **Headlines grandes y bold**: Obviously Narrow Black por defecto, Super para golpes cortos, Obviously ancha para golpes de 1–2 palabras, o cualquier fuente con licencia en `brand/fonts/` que se vea más cool.
> 2. **Nunca letras negras** (ni blancas). Todo el texto va en un rosa de la paleta. El negro solo queda en el M del logo.
> 3. **Sin M-dots dentro de los slides** (ni en posts, escenas de reel o páginas). El logo va **solo al final**, en el cierre.
> 4. **Texto de apoyo sin regla fija**: peso y tamaño los decide la dirección de arte según lo que se vea mejor, siempre legible en el teléfono. Ya funcionaron Narrow Bold de 52–64 px (`.support`) en carruseles tipográficos y Narrow Regular de 46–48 px con la frase clave en Black en el carrusel con imágenes.
> 5. **Fotos tal como son**: con sus colores originales, sin filtros rosas ni de ningún otro color, sin duotonos ni color grade.
> 6. **Sin flechas** (→) en ninguna parte: remates, listas, enlaces ni "Desliza".
> 7. **Rompe las reglas sin miedo, como director de arte** (Ricardo dice si le gusta), con una idea que salga del contenido (p. ej. el nombre vertical de "Design Matters"). No se rompen las reglas 2, 3, 5 y 6, el logo ni la paleta. Los números monumentales van en Obviously Narrow Bold: en Black/Super o en la ancha se vuelven un bloque.

---

## 1. Esencia y voz

**Qué es MAS**: la escuela de creatividad que convierte talento en carreras. No enseña teoría: entrena como si ya trabajaras en una agencia.

**Personalidad**: visionaria, inspiradora, retadora, global; ambiciosa pero humana. "La pasión de una escuela de arte con la precisión de una agencia de clase mundial."

**Voz**: confiada, directa e inspiradora. Habla como **mentor que ya recorrió el camino**, no como profesor ni como vendedor. Tres dimensiones:
1. **Mentor que impulsa**: habla desde la experiencia y mueve a la acción.
2. **Aliado que inspira**: entiende la frustración del creativo joven y la convierte en logro.
3. **Líder que reta**: provoca, rompe moldes, sube el estándar.

**Cómo se escribe**
- Frases cortas, contundentes, con ritmo. Honestidad brutal con calidez.
- De tú a tú. Nada académico.
- Verbos de acción: crear, transformar, romper, construir, liderar.
- Cada frase provoca acción o emoción. Termina con sensación de poder y posibilidad.
- La tensión central de la marca: **"La industria no contrata diplomas. Contrata portafolios."**

**Líneas aprobadas (Brand Canvas)**
- No necesitas suerte. Necesitas un portafolio que hable por ti.
- La industria no contrata diplomas. Contrata portafolios.
- Deja de esperar tu oportunidad. Empieza a construirla.
- Aprende con los que hacen, no con los que enseñan.
- Tu portafolio será tu pasaporte.
- Donde otros enseñan teoría, nosotros construimos carreras.
- El talento latino está listo para conquistar el mundo. Solo necesita el trampolín correcto.
- Menos diplomas. Más ideas que ganan.
- CTAs: "Agenda tu entrevista y da el primer paso hacia tu carrera global." · "Aplica hoy. Las mejores ideas no esperan."

**Claims a verificar antes de publicar** (aparecen con cifras distintas en distintos documentos): número de veces "School of the Year" (7 u 8; el carrusel oficial dice "7 veces Future Lions School of the Year, incluyendo 2025"), % de colocación laboral, número de egresados (8,000 vs 20,000+), número de agencias de prácticas. Si no hay fuente reciente, no usar el número.

**Pronunciación**: M.AD se dice "em-ad". Nunca "mad" ni "em-ay-dee".

---

## 2. Logo

### Elementos
- **M-dot**: el símbolo. Un "M" orgánico + un **dot** (punto) que siempre es el mismo círculo. Hay **30 variantes oficiales** (`assets/mdots/mdot-01.svg` … `mdot-30.svg`; la 25 duplica a la 24).
- **Wordmark MX**: "MIAMI AD / SCHOOL" en Obviously Narrow, dos líneas, alineado a la izquierda (`assets/logo/wordmark.svg`). El global usa "M.AD / SCHOOL / OF IDEAS" o "M.AD / MEXICO / CITY".
- **Lockup**: M-dot + wordmark a la derecha (`assets/logo/lockup.svg`).

### Reglas
- **El M-dot siempre cambia**: usa una variante distinta en cada comunicación y elige la que mejor llene el espacio. Ninguna sede usa una sola.
- El wordmark tiene **máximo 3 líneas**; la 4ª siempre queda vacía. Alineado a la izquierda.
- **Clearspace** = ½ de la altura x del "M.AD" del wordmark, en todas direcciones (es el mínimo, no una medida fija).
- El espacio entre M-dot y wordmark se ajusta ópticamente a la forma del M-dot.
- El lockup horizontal es excepción (señalética lejana).
- En aplicaciones básicas (tarjetas, firmas, señalética) usa solo el wordmark.
- En aplicaciones expresivas, el manual pide que el M-dot ocupe el espacio. **MAS México no lo hace (indicación de Ricardo): no hay M-dots dentro de los slides y el logo va solo en el cierre.**

### No
No cambies la composición del lockup · no pases de 3 líneas · no cambies la proporción M-dot/wordmark · no uses "M.AD" sin M-dot · no hagas lockup con solo "AD" · no cambies la fuente · no metas imágenes dentro del logo · no lo deformes · no lo contornees · **no inventes variantes del M-dot** · **sin efectos** (sombras, texturas, degradados) · **no lo rotes**.

---

## 3. Color

### 3.1 Paleta (valores digitales RGB; `tokens/colors.json`)

**Primary Pink**: M.AD Pink `#FF5CCD` (PMS 238 C).

**Rosas** (orden del artboard oficial, con su tono para combinar):

| | | | |
|---|---|---|---|
| Plum `#AD007A` 2425 · deep | Fuchsia `#F233AF` 225 · strong | Bubblegum `#FF63BE` 212 · mid | Orchid `#FF81F8` 231 · mid |
| Rubine `#D30760` 220 · deep | Coral Pink `#FF6B89` 1777 · mid | Salmon `#FF99A0` 176 · light | Rose `#FB73A3` 204 · mid |
| Raspberry `#F60072` 2040 · strong | Watermelon `#FF4684` 7424 · strong | Rhodamine `#FF009B` · strong | Hot Pink `#FF5EA7` 218 · mid |
| Magenta `#EC009F` 226 · strong | Light Orchid `#FFA9E7` 245 · light | Blush `#FFCEDD` 182 · pale | Lilac Pink `#FFB9FF` 230 · light |

**Secundarios** (solo dot y patrones):

| Naranjas / amarillos | Verdes | Azules | Morados |
|---|---|---|---|
| Orange `#FF9812` 1495 | Deep Green `#006B57` 568 | Mint `#82CFC2` 337 | Purple `#8B00BA` 2084 |
| Yellow `#FFCF00` 7548 | Leaf `#7DD682` 2268 | Blue `#3391F4` 2727 | Lavender `#A572FF` 2087 |
| Lemon `#FFFF3E` 101 | Bright Green `#00D357` 2420 | Sky `#A7D0FF` 2717 | Lilac `#D8B8FF` 2635 |

**Neutros**: negro `#000000` solo para el M del logo, nunca para texto (indicación de Ricardo). Blanco solo en knockout del lockup.
**Solo web/documentos**: Lightest Pink `#FFF3F7` (fondo de blog y documentos largos) · Deep Purple `#700450` (solo el headline del home web).

### 3.2 Gramática: cinco reglas
1. **Un fondo rosa + un rosa para el tipo**, uno oscuro y uno claro (manual p.32 + web: "one dark and one bright shade of pink").
2. **El M siempre negro** sobre fondo rosa. Excepciones: tratamiento fotográfico (M rosa sobre foto) y la Variante MX de cierres.
3. **Los secundarios solo van en el dot** (o en patrones de M-dot). Nunca son fondo ni texto. Un solo secundario por pieza.
4. **Tipo en uno o dos rosas, nunca negro ni blanco**: headline en un rosa; el texto de apoyo en el mismo rosa o en otro que dé contraste (social, manual p.34). En web y documentos, un solo color de tipo por página.
5. **Contraste suficiente**: display tonal ≥ 2:1 y solo en tipo grande (≥ 90 px en lienzo de 1080). Texto de apoyo ≥ 3:1 en Narrow Bold ≥ 52 px; si algo queda por debajo de 40 px, ≥ 4.5:1 (Plum/Blush).

**Regla rápida por tono**: *deep* va con *light/pale* · *strong* con *pale* · *mid* con *deep* · *light/pale* con *deep*. Dos *mid* juntos casi nunca pasan (contraste < 2:1). Para slides con texto de apoyo, usa un fondo *deep* (Plum, Rubine) con texto *light/pale*, o al revés.

### 3.3 Duotonos aprobados

**Display** (headline grande; contraste medido):

| Fondo | Headline | Contraste | Origen |
|---|---|---|---|
| Plum | Blush | 4.95 | carruseles MAS Collins |
| Blush | Plum | 4.95 | carruseles MAS Collins |
| Lilac Pink | Plum | 4.46 | derivado |
| Plum | Light Orchid | 3.95 | "7 archivos visuales" |
| Light Orchid | Plum | 3.95 | derivado |
| Plum | Orchid | 3.19 | "7 archivos visuales" |
| Rubine | Light Orchid | 3.04 | derivado |
| Magenta | Blush | 2.98 | derivado |
| Rose | Plum | 2.64 | manual p.34 |
| Plum | Bubblegum | 2.54 | manual p.34 |
| Bubblegum | Plum | 2.54 | cierre MX |
| M.AD Pink | Plum | 2.51 | manual p.34 |
| Plum | M.AD Pink | 2.51 | cierre MX |
| Magenta | Light Orchid | 2.38 | manual p.34 |
| Watermelon | Plum | 2.11 | manual p.32 |
| Rubine | Rose | 2.04 | manual p.34 |
| Raspberry | Salmon | 2.00 | manual p.34 |
| Salmon | Raspberry | 2.00 | cierre MX |

**Lectura** (texto de apoyo en `.support`; rosa sobre rosa, en cualquier dirección): Blush/Plum 4.95 · Lilac Pink/Plum 4.46 · Light Orchid/Plum 3.95 · Blush/Rubine 3.81 · Lilac Pink/Rubine 3.44 · Salmon/Plum 3.37 · Orchid/Plum 3.19 · Light Orchid/Rubine 3.04. Documentos largos: Lightest Pink con Plum o Rubine. **Negro y blanco nunca.**

### 3.4 Lockup: combinaciones aprobadas (manual p.32)
M negro siempre; wordmark negro o rosa; dot en otro rosa o secundario. En MAS México el cierre usa de preferencia la Variante MX tonal (M y wordmark en un rosa), así no queda ninguna letra negra.
- Lilac Pink + dot Rubine + wordmark negro
- Orchid + dot Rhodamine + wordmark negro
- Blush + dot Magenta + wordmark negro
- M.AD Pink + dot Yellow + wordmark Lilac Pink
- Plum + dot Bubblegum + wordmark Light Orchid
- Watermelon + dot Mint + wordmark Plum
- **Knockout**: todo blanco sobre negro, o todo negro sobre blanco/gris. Solo si se requiere (logos de terceros, firmas).

**Variante MX (cierres oficiales, `M.ad-cierres.ai`)**: lockup centrado; M y wordmark en un rosa y el fondo en otro; dot secundario. Combinaciones: Salmon/Raspberry + dot naranja · Bubblegum/Plum + dot mint · Plum/Bubblegum + dot sky · Salmon/Plum + dot Rhodamine · Raspberry/Salmon + dot sky. En Canva el equipo usa también fondo `#7B1561` + M rosa + dot sky. **Solo para cierres** de carrusel, post o video.

### 3.5 Dots
Ejemplos del manual (fondo → dot): Rubine → Leaf · M.AD Pink → Sky · Orchid → Bright Green · Plum → Orange · M.AD Pink → Yellow · Plum → Blue · Rose → Purple · Blush → Magenta · Lilac Pink → Rubine · Watermelon → Mint.
El dot nunca es negro, nunca se encima con el M y nunca se recorta.

### 3.6 Ritmos de carrusel
- **A · Alternancia** (estándar MAS Collins): Plum/Blush ↔ Blush/Plum, slide a slide. Máxima legibilidad; ideal para carruseles educativos con texto.
- **B · Escalera tonal**: de claro a profundo (Blush → Light Orchid → Rose → Magenta → Rubine → Plum). Narrativa de progreso; el CTA o cierre cae en el más oscuro.
- **C · Golpe tipográfico**: portada tipográfica fuerte; statements en Super o en Obviously ancha alternados con slides de texto; fondos que saltan entre claro y profundo.
- Siempre: portada solo tipográfica (sin logo), ningún M-dot en los slides y cierre con lockup (Variante MX). Ejemplo completo: `templates/carousel.html`.

### 3.7 No (manual p.33)
1. Colores fuera de marca. 2. Bajo contraste. 3. **Blanco sobre color**. 4. Degradados. 5. M de color (que no sea negro). 6. Negro como fondo con color. 7. Fondo que no sea rosa. 8. Color sobre gris. 9. **Color sobre fondo blanco**.

**Prácticas recientes en Canva que rompen esto (no repetir)**: "MAS · Art Direction · Tu portafolio en 18 meses" usa fondo blanco con tipo morado (`#831E67`). "7 archivos visuales · Más allá del algoritmo" usa fondo crema, tipo blanco y otras fuentes. "7 preguntas…" pone headlines en MAYÚSCULAS. Las excepciones web válidas son: fondo negro **solo** para la galería de trabajos de alumnos y Lightest Pink para blog/documentos.

---

## 4. Tipografía

> **Decisión de Ricardo (oct 2026): los headlines van más grandes y más pesados, aunque no esté en el manual.** Usa los pesos y tipografías que se vean más cool e impactantes: Obviously Narrow **Black** y **Super** por defecto. Si Ricardo agrega otras fuentes a `brand/fonts/` (con licencia), también se pueden usar para headlines cuando le den más fuerza a la pieza. Lo que no cambia: el wordmark/logo (siempre el vectorial oficial), la paleta, la alineación a la izquierda y la legibilidad.

- **Obviously Narrow Black** (800): **headline por defecto**.
- **Obviously Narrow Super** (900): golpes de ≤ 3 palabras por línea a ≥ 160 px (portadas, números, reels). En tamaños chicos se cierran las contraformas: no usarla debajo de ~100 px.
- **Obviously Narrow Bold** (700): headlines largos (4+ líneas), subtítulos, títulos de lista.
- **Obviously Narrow** Regular / Medium: info corta (fecha, lugar, nombre), etiquetas. (Semibold queda como opción intermedia.)
- **Obviously** (ancho normal) **Black / Super** (800/900, clase `.h.wide`): alternativa de golpe para 1–2 palabras por línea (un número, una palabra, un nombre). Es muy ancha: úsala en una sola slide por pieza para que contraste con la Narrow, nunca para headlines largos.
- **Obviously** (ancho normal) Regular / Bold: texto largo y énfasis dentro del texto. **Archivo** (OFL) queda solo como respaldo si falta el archivo.
- Archivos: `brand/fonts/` (ver `brand/fonts/README.md`; Obviously es licenciada y no se sube a git). La familia completa (Thin a Super, con itálicas, Narrow y ancho normal) está en Drive → BRAND → Typeface(s).

**Jerarquía en lienzo 1080 × 1350**

| Nivel | Fuente | Tamaño | Interlineado |
|---|---|---|---|
| Golpe / portada | Narrow Super | 160–360 px, ≤ 3 palabras por línea | 0.96 |
| Golpe ancho (opcional) | Obviously Black / Super (`.h.wide`) | 140–300 px, 1–2 palabras por línea | 0.98 |
| Headline | Narrow Black (Bold si son 4+ líneas) | 120–320 px, auto-fit al ancho | 0.96 |
| Subhead / lista | Narrow Medium | 60–80 px | 0.95 |
| Info (fecha, lugar, nombre) | Narrow Medium | 50–60 px | 0.9 |
| Texto de apoyo (slides) | Narrow Bold (`.support`) o Regular con frase clave en Black: lo decide la dirección de arte | 46–64 px | 0.98–1.06 |
| Cuerpo largo (PDF, web) | Obviously Regular (Bold para énfasis) | 30–36 px | 1.22 |
| Etiquetas, folio | Narrow Medium | 24–30 px | 1 |

Web (styleguide 4): H1 Narrow Medium 70/61 pt · H2 48/44 · H3 30/21 · body Obviously Regular 18/21 · secundario 14/17 · botones Regular 18 en versalitas · links 18 subrayado (offset 4).

**Interlineado mínimo 0.96 en headlines**: a 0.86 los descendentes (g, j, p, q, y) chocan con los acentos y ascendentes de la línea siguiente.

**Reglas**: alineado a la izquierda (nunca centrado ni a la derecha) · sentence case (nunca headlines en MAYÚSCULAS) · tracking normal (nunca abrirlo) · headlines grandes: pocas palabras por línea para que el tipo llene el ancho · contraste de tamaño (headline gigante, apoyo en Narrow Bold de 52–64 px) · párrafos largos de PDF o web en Obviously Regular; en slides, máximo 2–3 frases de apoyo · ordinales en superíndice (16<sup>th</sup>, 4<sup>o</sup>) · sin flechas (indicación de Ricardo): el remate va en Black y las listas se separan con aire o filetes.

---

## 5. Layout

- **Headline arriba a la izquierda**, pegado al margen; **info abajo a la izquierda**, a menudo en **dos columnas** (p. ej. nombre | fecha + lugar).
- Margen exterior ≈ 4% del ancho (44 px en 1080). El tipo vive cerca del borde, sin aire decorativo.
- Templates Collins: grid de 6 columnas × 6 filas; imagen abajo a la derecha (½ del ancho), copy abajo a la izquierda. Sin folio ni números por slide.
- Web: grid de 24 columnas, columna 36 px, gutter 12 px, márgenes 72 px.
- Una pieza = un fondo sólido. Nada de cajas, sombras ni marcos decorativos.

**Formatos**: IG feed / carrusel 1080×1350 · cuadrado 1080×1080 · Story / Reel / TikTok 1080×1920 (deja 250 px arriba y 340 px abajo libres de UI) · Deck 1920×1080 · YouTube 1280×720 · PDF carta 8.5×11 in · LinkedIn carrusel = PDF 1080×1350.

---

## 6. M-dot en composición

> **MAS México (indicación de Ricardo): no se usan M-dots dentro de los slides, posts, escenas ni páginas.** El logo (lockup) aparece solo en el cierre. Lo que sigue es la regla del manual global y aplica solo si Ricardo pide explícitamente el M-dot como gráfico (merch, señalética, ambientación).

- **Escala**: el M-dot llena el espacio disponible (≥ 60% del lienzo en piezas expresivas). Se puede recortar contra el borde **solo en patrones**; en piezas sueltas, completo.
- **Dot**: en el espacio negativo. Se puede separar y mover; nunca encima del M ni recortado.
- **Elección**: horizontales (3, 4, 6, 8, 10, 13, 14, 20, 21, 23, 24, 29) para bandas y lienzos anchos; cuadradas para posts y portadas.
- **Patrones**: combina 2–3 M-dots (mismo M duplicado y rotado o escalado, o distintos). Fondo rosa; al menos un M negro; intersecciones en colores de paleta; dots siempre de color y sin encimar. El patrón siempre va acompañado del logo o wordmark. Componente: `<mas-pattern>`.

## 7. Fotografía

- Tratamiento M.AD: el **M en un rosa** sobre la foto; dot rosa o secundario; el M-dot sobre zona libre de la imagen, nunca detrás del sujeto ni tapando lo importante; no se recorta el M; sin efectos.
- Fotos auténticas, sin poses ni sonrisas forzadas, sin composiciones saturadas. Gente creando, presentando, fallando, ganando.
- Web (manual global): fotos dentro de márgenes con un color grade (Vibrance −20, Color Lookup "Sienna-Blue"). **MAS México no lo aplica: las fotos van con sus colores originales, sin filtros** (indicación de Ricardo).
- En templates Collins: foto abajo a la derecha, con crédito o pie en Narrow chico debajo.

## 8. Motion

- Sin M-dots en las escenas. El logo entra solo en la escena final; ahí el dot cae y rebota por separado **sin deformarse**.
- Nada de rotar, distorsionar, contornear ni poner efectos al logo.
- El tipo entra por líneas (máscara de abajo hacia arriba), alineado a la izquierda.
- Cortes secos o wipes verticales entre escenas, a ritmo de beat. Fondos sólidos que cambian de rosa por escena siguiendo la gramática de color.
- Cierre: lockup (Variante MX) con el dot entrando al final. Duración típica de 6 a 8 s para reels/intros y 2 a 3 s para cortinillas.

## 9. Master Templates (Collins 1080×1350) y dirección de arte

Los 12 masters existen como `.ai` (wireframes, Drive "Templates Collins 1080 x 1350", `1L-x3QP79ntpc7aYAxCs7H8inV0riUZnS`) y como **Brand Templates en Canva** ("MAS · Collins 1080×1350 · …"; ninguno tiene campos de autofill). En HTML están todos como layouts en `web/collins.css`, con un ejemplo de cada uno en `templates/collins.html`.

**Gramática Collins**: grid de 6 columnas × 6 filas dentro del margen · headline arriba a la izquierda, información abajo a la izquierda (a veces en 2 columnas) · imágenes abajo a la derecha (½ del ancho) o en círculos cuando son personas · info (nombres, fechas, lugares) grande, casi del tamaño de un subtítulo · nunca texto sobre foto.

**Adaptación MAS México** (indicaciones de Ricardo): fondos rosas y texto en rosas (los masters vienen en blanco y negro) · donde Collins ponía un M-dot (Quotes, Poll, Insighters, Hired, 2BeHired) va una foto o nada · sin wordmark en la portada, el logo solo en el cierre · headlines en Black o Super, más pesados que los de Collins.

| Contenido | Master | Clase HTML |
|---|---|---|
| Portada de carrusel educativo | Tips (portada) | `c-tips-cover` |
| Consejo o paso con 1–3 frases | Tips (interior) | `c-tips` |
| Recurso, libro, película, podcast o herramienta con imagen | Tips with Images | `c-tips-img` (carrusel completo: `templates/carousel-imagenes.html`; la foto mide lo mismo en todos los slides) |
| Dato o insight en una frase | Facts | `c-fact` |
| Hallazgo de un estudio con fuente | Facts (estudio) | `c-fact-study` |
| Cita de una persona | Quotes | `c-quote` |
| Encuesta, ranking, porcentajes | Poll Results | `c-poll` |
| Noticia de un egresado o del campus | Single Photo | `c-news` (foto circular) · `c-news-2` (foto horizontal) |
| Speaker, masterclass, evento | Insighters | `c-speaker` (nombre, fecha, foto) + `c-talk` (título y hora) |
| Colocación laboral | Hired | `c-hired` |
| Alumno buscando trabajo | 2BeHired | `c-2behired` |
| Premio | Award Winner · Award Winner Carousel | `c-award` (imagen del trabajo) · `c-award-cover` + `c-photo-full` |
| Generación, bootcamp, grupo | Multiple Photo | `c-photos-12` · `c-photos-4` · `c-photos-2` |
| Cierre (único con logo) | — | `c-cierre` |

**Cómo combinarlos en un carrusel** (dirección de arte):
1. Un carrusel usa de 3 a 5 layouts: una portada, uno o dos layouts de contenido, un "respiro" y el cierre.
2. Los elementos paralelos (las 7 herramientas, los 5 libros) van todos en el mismo layout para que se lean como serie. Rompe la serie a la mitad con un respiro: un Facts, un Quote o una foto a sangre.
3. Alterna slides de lectura con slides visuales (foto, dato gigante, palabra gigante). Nunca más de dos slides de texto seguidos.
4. Cada slide en un par de color distinto, saltando entre fondos claros y profundos.
5. Elige el layout por lo que tienes, no al revés: sin foto, no uses un layout de foto con el hueco vacío.

**Fotos**: `<mas-photo src shape pos>` (`web/mas.js`). **Siempre con sus colores originales: sin filtros, duotonos, tintes ni color grade** (indicación de Ricardo). Imágenes de terceros, siempre con crédito (estudio o agencia) en `.c-label`. Las fotos se guardan en `brand/work/fotos/` (fuera de git): nunca subas fotos de alumnos al repo.

## 10. Checklist antes de entregar

- [ ] Fondo = un rosa de la paleta (no blanco, crema, gris ni negro).
- [ ] **Nada de texto negro ni blanco**: todo el tipo en rosas de la paleta, en un par aprobado.
- [ ] Headline ≥ 2:1; texto de apoyo ≥ 3:1 (pares más altos si es delgado).
- [ ] Texto de apoyo legible en el teléfono (peso y tamaño a criterio de la dirección de arte).
- [ ] **Ningún M-dot dentro de los slides**; el logo solo en el cierre (lockup tonal o con M negro), sin rotar, deformar ni efectos.
- [ ] Un solo secundario por pieza, y solo en el dot del lockup.
- [ ] Todo alineado a la izquierda, sentence case, sin tracking abierto.
- [ ] Headline en Black/Super, grande, llenando el ancho (pocas palabras por línea).
- [ ] Ningún descendente (g, j, p, q, y) toca la línea siguiente, un filete o el texto de abajo (interlineado ≥ 0.96).
- [ ] Todos los pesos de Obviously (Narrow y ancho normal) cargados (si el render avisa "Faltan pesos", no entregar).
- [ ] Claims verificados (premios, %, cifras).
- [ ] Safe zones respetadas en story/reel.
