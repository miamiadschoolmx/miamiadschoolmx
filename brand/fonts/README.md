# Fuentes

| Uso | Fuente | Archivo | En git |
|---|---|---|---|
| Headline por defecto | **Obviously Narrow Black** (800) | `Obviously-NarrowBlack.otf` | No |
| Golpes cortos / portadas | **Obviously Narrow Super** (900) | `Obviously-NarrowSuper.otf` | No |
| Headlines largos, subtítulos | **Obviously Narrow Bold** (700) | `Obviously-Narrow_Bold.woff` (también `Obviously-NarrowBold.otf`) | No |
| Info, etiquetas | Obviously Narrow Regular / Medium / Semibold | `Obviously-Narrow.woff`, `_Medium.woff`, `_Semibold.woff` | No |
| Cuerpo de texto | **Obviously** Regular (ancho normal) | `Obviously-Regular.woff` | No (aún no la tenemos) |
| Sustituto de cuerpo | **Archivo** 400/500/600 (SIL OFL) | `archivo/*.woff2` | Sí |

Obviously es de **OH no Type Co.** y tiene licencia **Desktop (13–18 usuarios)**. No se sube a git porque este repo es público y la licencia prohíbe compartir copias.

## Lo que dice la licencia (resumen, no es asesoría legal)

- Hasta 18 usuarios concurrentes de MAS. No cubre a freelancers ni contratistas que excedan ese número.
- **Prohibido sin licencia especial**: usarla como webfont o servir la fuente por internet (cláusula 6d), embeberla en software o apps (6c) y vender productos tipográficos (6a/6e). Por eso **nunca** se publica una página web ni un Artifact que cargue estos archivos.
- **Permitido**: hacer imágenes PNG/JPG/GIF/SVG para internet "siempre que la creación no sea automatizada y la haga personalmente un usuario con licencia" (cláusula 7), e incluir la fuente en un documento para imprimirlo o verlo (cláusula 4).
- **Duda abierta**: este kit renderiza las piezas con un script, en una sesión de Claude en la nube, a pedido de Ricardo. Conviene confirmar con OH no Type (j@ohnotype.co) que ese uso cabe en la licencia actual, o pedir la extensión que corresponda. Lo mismo aplica a subir las fuentes al brand kit de Canva.

## Instalar en una sesión nueva

Fuente oficial: carpeta **BRAND** en el Drive de ricardo@tufuturocreativo.com (`176DZ0g0KZmKeiqxdg7z31zccdx419p9k`), **privada** (solo el dueño). Úsala en lugar de "BRANDING – MIAMI AD SCHOOL", que está abierta con enlace público.

| Archivo | Carpeta | Drive file ID |
|---|---|---|
| Obviously-Narrow.woff | BRAND → Web 2 | `1DCacOVa9BkAos1Py7v2cRCnyZfSaNDU1` |
| Obviously-Narrow_Medium.woff | BRAND → Web 2 | `1_aUfi1IKfEh2bn-5KQGgtUOajrfPTsYM` |
| Obviously-Narrow_Semibold.woff | BRAND → Web 2 | `1PUg8FZV-OjZvoQPw8AfINHSYK-HUELqf` |
| Obviously-Narrow_Bold.woff | BRAND → Web 2 | `1fjZ9pmwMjtp4cdt9q8ebx3dmYZ8gt8xs` |
| Obviously-NarrowBlack.otf | BRAND → Desktop (`1dLW0fr9IWu_eYh7G8TvkVfAyV2vQZhMI`) | pendiente: aún no está en la carpeta; búscala por nombre |
| Obviously-NarrowSuper.otf | BRAND → Desktop | pendiente: aún no está en la carpeta; búscala por nombre |

1. Busca cada archivo con `search_files` (`title contains 'Obviously-Narrow'`) y descárgalo con `download_file_content`. Como el resultado es grande, Claude Code lo guarda en `~/.claude/projects/.../tool-results/`.
2. `python3 -I brand/scripts/drive-save.py brand/fonts ~/.claude/projects --only Obviously-Narrow`
3. Comprueba: `ls brand/fonts/`. El renderer avisa "⚠ Faltan pesos de Obviously Narrow" si falta alguno.

Para activar **Obviously Regular** cuando la tengas: copia `Obviously-Regular.woff` aquí y descomenta su `@font-face` en `brand/web/mas.css`.
Para agregar otra fuente de headline: copia el archivo aquí, declara su `@font-face` en `web/mas.css`, anótala en esta tabla con su licencia y, si es OFL o libre, quítala de `.gitignore`.
