# Fuentes

| Uso | Fuente | Archivo | En git |
|---|---|---|---|
| Headline por defecto | **Obviously Narrow Black** (800) | `Obviously-Narrow_Black.woff` (o `Obviously-NarrowBlack.otf`) | No |
| Golpes cortos / portadas | **Obviously Narrow Super** (900) | `Obviously-Narrow_Super.woff` (o `Obviously-NarrowSuper.otf`) | No |
| Headlines largos, subtítulos | **Obviously Narrow Bold** (700) | `Obviously-Narrow_Bold.woff` | No |
| Info, etiquetas | Obviously Narrow Regular / Medium / Semibold | `Obviously-Narrow.woff`, `_Medium.woff`, `_Semibold.woff` | No |
| Golpe ancho (`.h.wide`) | **Obviously Black / Super** (800/900, ancho normal) | `Obviously-Black.woff`, `Obviously-Super.woff` | No |
| Cuerpo de texto | **Obviously Regular** (ancho normal; Medium / Semibold / Bold para énfasis) | `Obviously-Regular.woff`, `-Medium.woff`, `-Semibold.woff`, `-Bold.woff` | No |
| Respaldo de cuerpo | **Archivo** 400/500/600 (SIL OFL) | `archivo/*.woff2` | Sí |

Obviously es de **OH no Type Co.** No se sube a git porque este repo es público y la licencia prohíbe compartir copias.

## Lo que dicen las licencias (resumen, no es asesoría legal)

MAS tiene dos licencias de OH no Type, las dos en Drive → BRAND → Typeface(s):
- **Desktop, 13–18 usuarios** (`Desktop/License for Desktop, 13–18 users.pdf`): instalar y usar la fuente en las computadoras del equipo.
- **Web, 500 mil visitas/mes** (`Web/License for Web, 500k page views.pdf`): servirla como webfont en **un** sitio web de hasta 500 mil visitantes al mes.

Qué implica:
- Hasta 18 usuarios de MAS. No cubre a freelancers ni contratistas que excedan ese número.
- **Prohibido sin licencia especial** (cláusula 6 de ambas): embeberla en software, apps o dispositivos y vender productos tipográficos. La Desktop además prohíbe servirla por internet; la Web lo permite solo en un sitio, el de MAS. Por eso **nunca** se publica un Artifact ni otra página que cargue estos archivos, y nunca se suben al repo.
- **Permitido**: hacer imágenes PNG/JPG/GIF/SVG para internet "siempre que la creación no sea automatizada y la haga personalmente un usuario con licencia" (cláusula 7, igual en las dos licencias), e incluir la fuente en un documento para imprimirlo o verlo (cláusula 4).
- **Duda abierta**: este kit renderiza las piezas con un script, en una sesión de Claude en la nube, a pedido de Ricardo. Conviene confirmar con OH no Type (j@ohnotype.co) que ese uso cabe en la licencia actual, o pedir la extensión que corresponda. Lo mismo aplica a subir las fuentes al brand kit de Canva.

## Instalar en una sesión nueva

Fuente oficial: Drive de ricardo@tufuturocreativo.com → **BRAND** (`176DZ0g0KZmKeiqxdg7z31zccdx419p9k`) → **Typeface(s)** (`1E8RXmt4XLlNV03uO_YEswaOBpYQqxpw0`). Las dos carpetas son **privadas** (solo el dueño). No uses "BRANDING – MIAMI AD SCHOOL", que está abierta con enlace público.

| Archivo | Carpeta (Typeface(s) →) | Drive file ID |
|---|---|---|
| Obviously-Narrow.woff | Obviously Narrow → Web | `19JyLqkjBiE1J64l_HUWquk2CjWEWZfku` |
| Obviously-Narrow_Medium.woff | Obviously Narrow → Web | `1w6hYwKt0AXOl7cESDdnWAyrxsZzfwtXT` |
| Obviously-Narrow_Semibold.woff | Obviously Narrow → Web | `1zx1uTKnTb26drNnnKo8fIbVkB7hwwrwI` |
| Obviously-Narrow_Bold.woff | Obviously Narrow → Web | `1jFsFBQ4nxaYrPDLAjpKi-JO1ki-bPinS` |
| Obviously-Narrow_Black.woff | Obviously Narrow → Web | `1WuSaL_cCGC5lU9YW1pLKLmLzvbRk13B5` |
| Obviously-Narrow_Super.woff | Obviously Narrow → Web | `1s4w8njuKNhiDTexXjDRcG96ChBAOxGU7` |
| Obviously-Regular.woff | Obviously Normal → Web | `104ddZByWZMVUPdRz6Ooctev7TEJTJyll` |
| Obviously-Medium.woff | Obviously Normal → Web | `1bWXAAUGBCDcYMcaClrl0WcnaQbL0oJMM` |
| Obviously-Semibold.woff | Obviously Normal → Web | `1jy1MtR1f9kbhV82q9zi3blMpmZbTGE-X` |
| Obviously-Bold.woff | Obviously Normal → Web | `1xhSIBcwgR6pVHNIF1mF-6_8rzGXD8qTZ` |
| Obviously-Black.woff | Obviously Normal → Web | `1Cz2JK0mpUn6foBUHy9n5TZZ3-ULCN77f` |
| Obviously-Super.woff | Obviously Normal → Web | `1zhO9OyYH7VaDwgk1otxfnKOXR33RCM0u` |

Subcarpetas: Obviously Narrow → Desktop `1vpToVAgfK5UuAP_-Brnih8r14i6q_0n3` (OTF) · Web `1ZxXsWp3TXad9HZXJRGYFhWQLMggnVzFg` (WOFF/WOFF2) · Obviously Normal → Desktop `1EQhjTBeuR8IC5zO3jvuv5oCMQlmIR5Zt` · Web `1eRuJVVcfLhvpeDOGgOcsruBBCghqwvZ1`. Ahí también están Thin, Light, Medium, Semibold y todas las itálicas, más los specimens en PDF.

1. Descarga cada archivo de la tabla con `download_file_content` (los 12 en paralelo). Como el resultado es grande, Claude Code lo guarda en `~/.claude/projects/.../tool-results/`.
2. `python3 -I brand/scripts/drive-save.py brand/fonts ~/.claude/projects --only Obviously-`
3. Comprueba: `ls brand/fonts/`. El renderer avisa "⚠ Faltan pesos de Obviously" si falta alguno.

`mas.css` acepta el `.woff` de la carpeta Web o el `.otf` de Desktop para Narrow Black/Super; el resto usa `.woff`.
Para agregar otra fuente de headline: copia el archivo aquí, declara su `@font-face` en `web/mas.css`, anótala en esta tabla con su licencia y, si es OFL o libre, quítala de `.gitignore`.
