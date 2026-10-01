# Assets pendientes

Fotografía **real** de Miami Ad School México y trabajo de alumnos **autorizado**. No sustituir con fotos de stock, imágenes generadas con IA, logos de terceros ni material de otros sitios.

Mientras un slot esté vacío:

- En desarrollo se ve un bloque con su etiqueta (`[FOTO_MAS_HERO]`…), ratio y brief.
- En producción se ve un bloque plano del mismo ratio, sin texto.

**Para activar un asset:** copia el archivo a `public/assets/`, escribe su ruta en `src` (y `srcMobile` en el hero) y su texto alternativo en `alt`, ambos en `src/config/assets.ts`. Exporta en JPG o WebP de alta calidad, con el lado mayor de 2400 px como mínimo (hero desktop: 3200 px). El sitio genera las versiones optimizadas.

## Fotografía

| Slot | Ratio | Dónde se usa | Alt text (pendiente de redactar) | Crop recomendado | Permisos requeridos |
| --- | --- | --- | --- | --- | --- |
| `[FOTO_MAS_HERO]` desktop | **16:9** (3200×1800) | Hero de `/carreras-creativas`, fondo completo | `[ALT PENDIENTE: describir la crítica, presentación o clase y quiénes aparecen haciendo qué]` | Sujeto en el **40 % derecho** del encuadre. El 60 % izquierdo queda cubierto por el bloque de copy (puede ser fondo o pared). Se recorta ligeramente arriba y abajo en pantallas bajas: deja aire. | Autorización de imagen de cada persona identificable; licencia de uso del fotógrafo (web y anuncios pagados) |
| `[FOTO_MAS_HERO]` móvil | **9:16** (1440×2560) | Hero en móvil | Mismo alt que la versión desktop si es la misma escena | Caras y acción en el **25 % superior**: es la franja visible sobre el copy al cargar en móvil. El 75 % inferior queda detrás del bloque de texto. | Igual que desktop |
| `[FOTO_MAS_PROCESO]` | **4:3** | Bloque "Cómo funciona" | `[ALT PENDIENTE: brief, sketches, pared de trabajo o pantalla; qué se ve]` | Detalle cercano del proceso: manos, papeles, post-its o pantalla. Evitar textos legibles de marcas de clientes. | Autorización de imagen si aparecen personas; autorización del autor si se ve trabajo identificable |
| `[FOTO_MAS_FEEDBACK]` | **3:2** | Bloque "Cómo funciona" | `[ALT PENDIENTE: revisión uno a uno o en equipo; quién revisa qué]` | Plano medio con dos o más personas revisando trabajo. Composición horizontal con aire. | Autorización de imagen de cada persona identificable |
| `[GALERIA_WORK_01]` | **4:5** | Mosaico "Un portafolio se entiende a primera vista" | `[ALT PENDIENTE: describir la pieza (formato, idea visible), sin atribuir autoría]` | Pieza completa o detalle que se entienda sin explicación, con margen de seguridad de 5 % por lado | Autorización escrita del alumno para publicar la pieza en web y anuncios; ver nota de marcas |
| `[GALERIA_WORK_02]` | **1:1** | Mosaico | `[ALT PENDIENTE]` | Igual que 01 | Igual que 01 |
| `[GALERIA_WORK_03]` | **4:5** | Mosaico | `[ALT PENDIENTE]` | Igual que 01 | Igual que 01 |
| `[GALERIA_WORK_04]` | **1:1** | Mosaico | `[ALT PENDIENTE]` | Igual que 01 | Igual que 01 |
| `[GALERIA_WORK_05]` | **4:5** | Mosaico | `[ALT PENDIENTE]` | Igual que 01 | Igual que 01 |
| `[GALERIA_WORK_06]` | **1:1** | Mosaico | `[ALT PENDIENTE]` | Igual que 01 | Igual que 01 |
| `[FOTO_MAS_COMUNIDAD]` | **16:10** | `/agenda`, junto a la agenda | `[ALT PENDIENTE: actividad real de trabajo; qué están haciendo]` | Grupo trabajando, no posando. Horizontal, con varias personas activas. | Autorización de imagen de cada persona identificable |
| `[FOTO_MAS_CIERRE]` | **3:2** | Bloque de cierre de la landing | `[ALT PENDIENTE: escena de trabajo; qué ocurre]` | Escena de trabajo con **zona libre abajo a la izquierda** (≈ 45 % del ancho y 40 % del alto): ahí va el bloque de CTA. En móvil el bloque va debajo de la foto. | Autorización de imagen; licencia del fotógrafo |

Notas sobre la galería:

- Las piezas no llevan nombres, testimonios ni atribuciones en la página. Si se quieren créditos, se necesita autorización explícita del alumno para ser nombrado.
- Si una pieza usa marcas reales (trabajo spec), confirma con legal que puede mostrarse en un sitio comercial y en anuncios.
- Si el ratio del archivo no coincide, el sitio recorta al centro. Entrega el ratio exacto para controlar el encuadre.

## Identidad y SEO

| Asset | Formato | Dónde se usa | Alt text | Notas | Permisos |
| --- | --- | --- | --- | --- | --- |
| `[LOGO_MAS]` | SVG (versión clara y oscura) | Header y footer (hoy hay un logotipo tipográfico provisional en `src/components/layout/Logo.tsx`) | "Miami Ad School México" | Necesita funcionar sobre ciruela `#2D133C` y tinta `#161216` | Manual de marca vigente |
| `[OG_IMAGE]` | 1200×630 JPG/PNG | Vista previa al compartir la landing | `[ALT PENDIENTE]` | Puede ser tipográfica con la Big Idea o una foto aprobada. Ruta en `seo.ogImage` (`src/config/site.ts`) | Las mismas de la foto que use |
| `[FAVICON]` | SVG o PNG 512×512 + `favicon.ico` | Pestaña del navegador | — | Colócalo como `src/app/icon.svg` (o `icon.png`) y `src/app/favicon.ico` | Manual de marca |

## Checklist de permisos

- [ ] Autorización de uso de imagen firmada por cada persona identificable (alumnos, staff, invitados).
- [ ] Licencia del fotógrafo que cubra web, redes y anuncios pagados, sin fecha de vencimiento o con fecha conocida.
- [ ] Autorización escrita de cada alumno cuyo trabajo aparece en la galería.
- [ ] Revisión legal de piezas con marcas de terceros.
- [ ] Alt text escrito para cada imagen activa (describe lo que se ve y su propósito; no repitas el titular).
