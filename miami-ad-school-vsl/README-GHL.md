# Landing VSL · Miami Ad School México en GoHighLevel

Guía paso a paso para montar `landing.html`, `landing.css` y `landing.js` en GoHighLevel (GHL/Kourse) bajo `tufuturocreativo.com`.

> **Antes de empezar:** nada de esto publica la página. Trabaja en modo borrador o vista previa hasta completar el paso 11.
>
> Los nombres de menús de GHL cambian con las actualizaciones. Si algo no aparece exactamente con el nombre que se usa aquí, busca la opción equivalente.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `landing.html` | La página completa para vista previa local. Para GHL solo se copia el bloque entre `GHL · COPIAR DESDE AQUÍ` y `GHL · HASTA AQUÍ`. |
| `landing.css` | Estilos. Todo está bajo `.mas-vsl`, así que no toca la plantilla de GHL. |
| `landing.js` | Comportamiento: VSL, acordeón, galería, selección de programa, etapas del formulario y eventos de medición (desactivados). |
| `fonts/` | Archivo (licencia SIL OFL, se puede usar y redistribuir). Obviously Narrow **no** está incluida porque es una fuente con licencia comercial. |
| `CONTENT-PLACEHOLDERS.md` | Todo lo que hay que reemplazar antes de publicar. |

Para ver la vista previa local, abre una terminal en esta carpeta y corre `python3 -m http.server 8000`; después entra a `http://localhost:8000/landing.html`. Para ver los otros estados del formulario usa `?paso=agenda` y `?paso=confirmado`.

---

## 1. Crear la página en GHL

1. Entra a **Sites → Funnels** (o **Websites**, según cómo esté organizado `tufuturocreativo.com`).
2. Crea un funnel nuevo, o abre el existente, y agrega un paso o página nueva. Ejemplo de ruta: `/entrevista`.
3. Elige **plantilla en blanco**. No uses una plantilla con header, menú o footer: la landing no debe tener enlaces que saquen a la persona del recorrido.
4. En la configuración de la página (**Settings**) define:
   - **Título SEO:** `Construye tu portafolio creativo · Miami Ad School México`
   - **Descripción:** `Art Direction y Copywriting, online y en vivo, en la escuela siete veces Escuela del Año en Cannes Lions. Construye el book que abre conversaciones con la industria. Agenda tu entrevista sin costo.`
   - **Idioma:** español (`es-MX`), si tu cuenta lo permite.
   - **Imagen para compartir (OG):** una imagen oficial de 1200 × 630 px (ver `CONTENT-PLACEHOLDERS.md`).
5. **No publiques todavía.**

## 2. Preparar la sección que va a contener la landing

1. Agrega **una sola sección**, con una fila y una columna.
2. En la sección: ancho **completo** (full width), padding **0** arriba, abajo y a los lados, y sin color de fondo.
3. Haz lo mismo en la fila y en la columna: padding 0 y ancho completo.

Si la sección queda angosta o con márgenes, el fondo negro de algunas secciones no llegará a los bordes. Revísalo en la vista previa.

## 3. Insertar el HTML

1. Dentro de la columna agrega el elemento **Custom JS/HTML** (en algunas cuentas aparece como «Código» o «Custom Code»).
2. Abre `landing.html` y copia **solo** lo que está entre estas dos líneas:
   ```html
   <!-- ================= GHL · COPIAR DESDE AQUÍ ================= -->
   ...
   <!-- ================= GHL · HASTA AQUÍ ================= -->
   ```
   Empieza en `<div class="mas-vsl" ...>` y termina en el `</div>` que lo cierra. No copies `<html>`, `<head>` ni `<body>`.
3. Pégalo en el elemento y guarda.

## 4. Pegar el CSS

**Opción recomendada:** en la página ve a **Settings → Custom CSS** y pega todo el contenido de `landing.css`.

**Alternativa:** si tu cuenta no tiene ese campo, pégalo al inicio del mismo elemento Custom JS/HTML, envuelto así:
```html
<style>
  /* contenido completo de landing.css */
</style>
```

### Fuentes (obligatorio para que se vea como en la vista previa)

Las rutas `fonts/...` del CSS solo funcionan en la vista previa local. En GHL necesitas URLs completas:

1. Sube a la **biblioteca de medios** de GHL:
   - `fonts/archivo-latin-wdth-normal.woff2` (texto y respaldo de titulares).
   - `Obviously-Narrow_Bold.woff` y `Obviously-Narrow_Medium.woff`, de la carpeta de Drive *01 Brand Kit › 07 Tipografia › Web*. Los titulares usan la **Bold**.
2. Copia la URL pública de cada archivo.
3. En el CSS:
   - Reemplaza las dos apariciones de `fonts/archivo-latin-wdth-normal.woff2` por la URL de Archivo.
   - Descomenta los dos bloques `@font-face` de **Obviously Narrow** (quita `/*` y `*/`) y pon sus URLs en lugar de `REEMPLAZAR_URL_OBVIOUSLY_NARROW_BOLD.woff` y `REEMPLAZAR_URL_OBVIOUSLY_NARROW_MEDIUM.woff`.
4. En `.mas-vsl` del CSS, cambia `--display-weight: 800;` por `700` (el 800 solo engorda a Archivo para imitar a Obviously Bold). Deja `--display-stretch` igual: sirve para que el respaldo en Archivo se vea angosto si Obviously no carga. Los titulares gigantes se ajustan solos al ancho con el JS, así que no se desbordan aunque Obviously mida distinto.
5. Confirma con quien administre la licencia de Obviously que cubre uso web en `tufuturocreativo.com`.

Si la biblioteca de medios no acepta archivos de fuente, súbelos a otro almacenamiento propio con HTTPS, o pídele al equipo técnico que los sirva desde el dominio. Evita cargar fuentes desde servicios de terceros sin decidirlo antes.

## 5. Pegar el JavaScript

**Opción recomendada:** en **Settings → Tracking Code → Footer code** (o *Body*) pega:
```html
<script>
  /* contenido completo de landing.js */
</script>
```

**Alternativa:** al final del mismo elemento Custom JS/HTML, también dentro de `<script>...</script>`.

El script se protege solo contra ejecuciones dobles. Si un día lo pegas en los dos lugares, no se duplican los eventos. Aun así, pégalo **en un solo lugar**.

## 6. Sustituir imágenes

Cada espacio pendiente tiene un atributo `data-placeholder="P-xx"` que coincide con `CONTENT-PLACEHOLDERS.md`.

1. Sube la imagen a la biblioteca de medios de GHL (WebP o JPG optimizado; lo ideal es menos de 250 KB por imagen).
2. Dentro del elemento con ese `data-placeholder`, reemplaza las etiquetas de texto (`mas-plate__label`, `mas-book__pending`, etc.) por una imagen con su tamaño real:
   ```html
   <img src="URL_DE_GHL" alt="Descripción útil de la pieza" width="1600" height="2000" loading="lazy" decoding="async">
   ```
3. Reglas:
   - **Siempre** pon `width` y `height` reales para evitar saltos de layout.
   - La imagen del hero (P-02) **no** lleva `loading="lazy"`; lleva `fetchpriority="high"`.
   - Si la imagen es decorativa, usa `alt=""`. Si muestra trabajo, describe la pieza y su autor.
   - Las portadas de los books (P-06) deben ser capturas o piezas **autorizadas** por cada graduado.

## 7. Insertar la URL de la VSL

1. En el HTML busca `data-vsl-src="REEMPLAZAR_URL_VSL"` y cambia el valor por la URL del video. Acepta:
   - YouTube: `https://www.youtube.com/watch?v=ID` o `https://youtu.be/ID` (se convierte solo a `youtube-nocookie.com/embed`).
   - Vimeo: `https://vimeo.com/ID`.
   - Un archivo propio `.mp4` (por ejemplo, alojado en la biblioteca de medios de GHL).
2. Cambia `Duración: pendiente` por la duración real, por ejemplo `Duración: 12 min`.
3. Opcional: agrega como póster un frame del video (ver el comentario P-04 en el HTML).

El video **nunca** se reproduce solo: se carga y reproduce cuando la persona da clic en play, así que el sonido es intencional.

## 8. Insertar el formulario nativo de GHL

### Crear el formulario

Para tener dos pasos reales, usa una **Encuesta (Survey)** con dos diapositivas. Un **Formulario** normal también funciona, pero en una sola página.

**Paso 1 · Tus datos**
- Nombre (obligatorio)
- Email (obligatorio)
- Celular (obligatorio)
- Me interesa: `Art Direction` / `Copywriting` / `Aún no sé` (opción única)

**Paso 2 · Tu punto de partida**
- ¿Tienes un portafolio creativo?: `Sí` / `No` / `Estoy empezando`
- Link de portafolio (opcional, tipo URL)
- Situación actual: `Estudio` / `Trabajo creativo` / `Trabajo en otra área` / `Busco cambiar de carrera`
- ¿Cuándo te gustaría empezar?: `Enero` / `Abril` / `Julio` / `Octubre` / `Aún lo estoy evaluando`. **Valida estas fechas** antes de publicar (P-11).

Agrega el texto de consentimiento con el enlace a tu aviso de privacidad (P-12).

### Prellenar el programa

Cuando alguien da clic en «Quiero explorar Art Direction» o «Quiero explorar Copywriting», la página intenta prellenar el campo «Me interesa».

1. En el campo personalizado «Me interesa», revisa su **query key** (clave de parámetro).
2. En `landing.js`, cambia `prefillParam: 'me_interesa'` por esa clave.
3. Verifica que los valores coincidan **exactamente**: `Art Direction`, `Copywriting`, `Aún no sé`.
4. Prueba: elige un programa y confirma que el formulario aparece con esa opción marcada. Si tu cuenta no prellena opciones por URL, el resto de la página funciona igual; solo esa preselección no ocurre.

### Al enviar

En la configuración del formulario o encuesta, en la acción al enviar, elige **redirigir a una URL** y pon:
```
https://tufuturocreativo.com/TU-RUTA?paso=agenda#aplicar
```
Así la página muestra la agenda en lugar del formulario y registra `lead_submit`. **Comprueba en la vista previa** que la redirección ocurra en la página completa y no dentro del cuadro del formulario.

### Pegar el código

1. En el formulario o encuesta ve a **Integrate / Integrar** y copia el código de inserción (iframe + script).
2. En el HTML, dentro de `<div id="ghl-form-slot" ...>`, borra el contenido de ejemplo (`mas-slot__flag` y `mas-slot__spec`) y pega el código.
3. No cambies el `id="ghl-form-slot"`: el JS lo usa para detectar `form_start` y para prellenar.

## 9. Insertar el calendario

1. En **Calendars**, crea o elige el calendario de entrevistas con Ricardo. Ubicación: videollamada (Zoom o Google Meet).
2. Confirma que el correo de confirmación incluya fecha, hora y el enlace de la videollamada, porque la página le dice a la persona que lo encontrará ahí.
3. En la confirmación de la cita, elige **redirigir a una URL**:
   ```
   https://tufuturocreativo.com/TU-RUTA?paso=confirmado#aplicar
   ```
4. Copia el código de inserción del calendario y pégalo dentro de `<div id="ghl-calendar-slot" ...>`, borrando el `mas-slot__flag`.

El recorrido queda así: **formulario enviado → `?paso=agenda` muestra la agenda → cita agendada → `?paso=confirmado` muestra la confirmación**.

## 10. Conectar el píxel nuevo de Meta y GA4 (después)

Hoy **no se envía nada**. Todos los eventos solo se guardan en `window.masVsl.events` dentro del navegador.

1. Instala los códigos base del **píxel nuevo de Meta** y de **GA4** en **Settings → Tracking Code → Header code**, o con la integración nativa de GHL si la usas.
2. En `landing.js` cambia `var TRACKING_ENABLED = false;` a `true` y descomenta las líneas de `fbq`, `gtag` o `dataLayer` que vayas a usar.
3. Eventos disponibles:

| Evento | Cuándo ocurre | Sugerencia en Meta |
|---|---|---|
| `view_vsl` | La sección de la VSL entra en pantalla | personalizado |
| `vsl_play` | Clic en play con una URL válida | personalizado |
| `vsl_50_percent` | Mitad del video (solo `.mp4` propio) | personalizado |
| `vsl_complete` | Fin del video (solo `.mp4` propio) | personalizado |
| `program_select` | Elige Art Direction, Copywriting o «Aún no sé» | personalizado |
| `view_books` | La sección de books entra en pantalla | `ViewContent` |
| `external_book_click` | Clic en el book de un graduado | personalizado |
| `form_start` | La persona entra al formulario | personalizado |
| `lead_submit` | Regresa con `?paso=agenda` (una vez por sesión) | `Lead` |
| `calendar_view` | La agenda entra en pantalla | personalizado |
| `appointment_booked` | Regresa con `?paso=confirmado` (una vez por sesión) | `Schedule` |

4. **YouTube o Vimeo:** `vsl_50_percent` y `vsl_complete` requieren la API de su reproductor (YouTube IFrame API o Vimeo Player SDK). Si los necesitas, súmalos en ese momento o aloja la VSL como `.mp4`.
5. **API de Conversiones (CAPI):** envía `Lead` y `Schedule` desde el servidor con un workflow de GHL (acción de Meta Conversions API, si tu cuenta la tiene) y usa el mismo `eventID` que el navegador para deduplicar. Nunca pongas tokens de CAPI en este JS.

## 10 bis. Cuenta regresiva de inicios

La landing trae su propia cuenta regresiva (sección «Próximo inicio» y aviso en el hero). Es **real**: cuenta hacia la siguiente fecha de inicio, no se reinicia por visitante y salta sola al siguiente inicio. No necesitas el elemento Countdown de GHL; si lo usas, **nunca** en modo *evergreen* (reinicia el contador a cada persona: es urgencia falsa).

Se configura en `landing.js`, dentro de `CONFIG`:

| Ajuste | Valor actual | Qué hace |
|---|---|---|
| `intakes` | 10 de enero, abril, julio y octubre | Fechas de inicio (mes 0 = enero). |
| `intakeCutoffDays` | `7` | Días antes del inicio en que el contador ya muestra el siguiente (cierre de admisión). Con `0` cuenta hasta el mismo día del inicio. |
| `intakeUtcOffsetHours` | `-6` | Hora de Ciudad de México. El contador llega a cero a las 00:00 del día de inicio. |

Si un trimestre cambia la fecha, edita solo `intakes`. Los segundos solo corren mientras la sección está en pantalla.

## 11. Probar antes de publicar

**Recorrido**
- [ ] Todos los botones llevan a `#vsl` o `#aplicar`, sin salir de la página.
- [ ] La VSL se reproduce con sonido solo después del clic.
- [ ] «Quiero explorar Art Direction / Copywriting» marca el programa en «Me interesa».
- [ ] El formulario se envía y redirige a `?paso=agenda`; aparece la agenda.
- [ ] Agendar redirige a `?paso=confirmado`; aparece la confirmación y llega el correo con el enlace.
- [ ] Los 8 links de books abren en pestaña nueva y cargan bien.
- [ ] Aviso de privacidad y términos abren sus páginas reales.

**Calidad**
- [ ] Revisa en un teléfono real (iPhone y Android), no solo en el modo móvil de la computadora.
- [ ] Recorre la página solo con teclado (Tab, Enter, Espacio): todo se alcanza y el foco se ve.
- [ ] Con «reducir movimiento» activado en el sistema, no hay animaciones.
- [ ] Corre Lighthouse en la URL de vista previa de GHL. Ojo: GHL agrega sus propios scripts, así que el puntaje será menor que en la vista previa local (que dio 99–100).
- [ ] Revisa que los estilos globales de GHL no cambien titulares, botones ni listas dentro de la landing.
- [ ] Con mouse: el punto amarillo sigue al cursor y dice «Ver» sobre los books y «Play» sobre el video. En celular no aparece (es correcto).
- [ ] Si el builder de GHL aplica `transform` a la sección contenedora, el cursor-punto y el indicador de progreso podrían desfasarse; en ese caso quita el `transform` de esa sección.

**Medición** (solo cuando se active el paso 10)
- [ ] Meta Events Manager → **Probar eventos**: llegan `Lead` y `Schedule` sin duplicarse.
- [ ] GA4 → **DebugView**: llegan los eventos con sus parámetros.
- [ ] Haz una prueba con un correo tuyo y borra ese contacto de GHL después.

Solo después de esta lista: **publicar**.

## Qué no hacer

- No agregar menú, enlaces a redes ni WhatsApp: cada salida le resta a la entrevista.
- No inventar urgencia, cupos, contadores, testimonios, salarios ni promesas de empleo.
- No quitar la clase `mas-vsl` ni los `id` (`vsl`, `aplicar`, `ghl-form-slot`, `ghl-calendar-slot`): el CSS y el JS dependen de ellos.
