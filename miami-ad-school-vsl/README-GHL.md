# Landing VSL · Miami Ad School México en GoHighLevel

Guía paso a paso para montar `landing.html`, `landing.css` y `landing.js` en GoHighLevel (GHL/Kourse) bajo `tufuturocreativo.com`.

> **Antes de empezar:** nada de esto publica la página. Trabaja en modo borrador o vista previa hasta completar el paso 11.
>
> Los nombres de menús de GHL cambian con las actualizaciones. Si algo no aparece exactamente con el nombre que se usa aquí, busca la opción equivalente.

## V2 (octubre 2026): cómo reemplazar lo que está en `/pruebaoct`

La V2 sigue la especificación «Landing Carrera Creativa v2» (21 de octubre de 2026). Ya trae adentro lo que antes se había agregado a mano en GHL: el formulario, el folleto en PDF, los videos de Tella y los textos legales. Por eso **se reemplaza todo, no se mezcla**:

1. **Custom JS/HTML de la sección:** borra todo lo que tenga y pega `ghl/1-custom-code.html` completo. También desaparecen el bloque `<style>` con `.mas-ghl-embed` y los textos legales viejos: ya vienen en el bloque nuevo.
2. **Settings → Custom CSS:** borra todo, incluidos los parches «GHL integration fix», «Reparación de hero responsive» y `.mas-apply-module { display: none }`, y pega `ghl/2-custom-css.css`.
3. **Settings → Tracking Code → Footer** de la página: borra el script que empieza con `var formUrl=` y cualquier versión anterior de la landing, y pega `ghl/3-footer.html`. **Si ahí o en el Header hay un píxel de Meta, GA4, Google Tag Manager u otro script de medición, no lo borres** (spec v2, sección 1, regla 7).
4. **Settings → SEO:** título, descripción e imagen del paso 1.
5. Abre la vista previa con `?revisar=1`. La primera línea dice si los 3 bloques son de la misma versión. En `/pruebaoct` el CSS era de una versión y el HTML de otra: por eso el hero se veía mal.

Las imágenes y las fuentes **no se vuelven a subir**: `ghl/medios.json` ya tiene sus URLs de GHL. Solo hay que subir la nueva imagen para compartir (`img/og-carrera-creativa.jpg`, paso 1).

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `landing.html` | La página completa para vista previa local. Para GHL solo se copia el bloque entre `GHL · COPIAR DESDE AQUÍ` y `GHL · HASTA AQUÍ`. |
| `landing.css` | Estilos. Todo está bajo `.mas-vsl`, así que no toca la plantilla de GHL. |
| `landing.js` | Comportamiento: VSL, acordeón, galería, selección de programa, etapas del formulario y eventos de medición (desactivados). |
| `fonts/` | Archivo (licencia SIL OFL, se puede usar y redistribuir). Obviously Narrow **no** está incluida porque es una fuente con licencia comercial. |
| `img/` | Fotos de marca ya optimizadas (WebP), el logo provisional y la imagen para compartir. Son las que se suben a la biblioteca de medios de GHL (paso 6). |
| `CONTENT-PLACEHOLDERS.md` | Todo lo que hay que reemplazar antes de publicar. |
| `ghl/` | **El kit para pegar:** los 3 bloques ya cortados (`1-custom-code.html`, `2-custom-css.css`, `3-footer.html`) y `medios.json`, la lista de archivos con su URL de GHL. |
| `tools/ghl-kit.py` | Arma el kit. Cambia todas las rutas `img/...` y `fonts/...` por las URLs de GHL de una sola vez. |

Para ver la vista previa local, abre una terminal en esta carpeta y corre `python3 -m http.server 8000`; después entra a `http://localhost:8000/landing.html`. Para ver los otros estados del formulario usa `?paso=agenda` y `?paso=confirmado`.

### Atajo: el kit para pegar

En lugar de cortar el HTML entre marcas y cambiar más de 40 rutas a mano:

1. Sube a la biblioteca de medios de GHL los archivos de `img/` y `fonts/` (pasos 4 y 6).
2. En `ghl/medios.json`, pon junto a cada archivo la URL que te dio GHL. Si prefieres, pásale la lista de URLs a Claude y lo hace por ti.
3. En una terminal, dentro de esta carpeta, corre `python3 tools/ghl-kit.py`. El script reescribe los 3 bloques de `ghl/` y te dice qué falta.
4. Pega cada bloque en su lugar:
   - `ghl/1-custom-code.html` en el elemento Custom JS/HTML (paso 3).
   - `ghl/2-custom-css.css` en Custom CSS (paso 4).
   - `ghl/3-footer.html` en Tracking Code → Footer (paso 5).

Si cambias `landing.html`, `landing.css` o `landing.js`, vuelve a correr el script antes de pegar. Los bloques de `ghl/` nunca se editan a mano.

### Revisión en la página real: `?revisar=1`

Cuando ya esté pegada, abre la página publicada con `?revisar=1` al final (por ejemplo, `preview.tufuturocreativo.com/pruebaoct?revisar=1`). Aparece un panel que solo ves tú. Te dice:

- Si los 3 bloques son de la misma versión del kit.
- Si ya están el video, el formulario, el folleto y el calendario.
- Qué imágenes no cargan y cuáles siguen con ruta local.
- Si cargan las fuentes.
- Qué contenido pendiente se vería todavía.
- Si la sección ocupa todo el ancho.
- Si algún contenedor de GHL puede estorbar al scroll.
- Si quedó algún «[VERIFICAR]» o raya larga (—) a la vista, y si el título SEO es el correcto.

Sin `?revisar=1` nadie lo ve, y no envía nada.

---

## 1. Crear la página en GHL

1. Entra a **Sites → Funnels** (o **Websites**, según cómo esté organizado `tufuturocreativo.com`).
2. Crea un funnel nuevo, o abre el existente, y agrega un paso o página nueva. Ejemplo de ruta: `/carrera-creativa`.
3. Elige **plantilla en blanco**. No uses una plantilla con header, menú o footer: la landing no debe tener enlaces que saquen a la persona del recorrido.
4. En la configuración de la página (**Settings**) define:
   - **Título SEO:** `Carrera Creativa | Miami Ad School México`
   - **Descripción:** `18 meses online y en vivo para construir un book de Art Direction o Copywriting. Dos prácticas de 10 semanas en agencias de la red Miami Ad School.`
   - **Idioma:** español (`es-MX`), si tu cuenta lo permite.
   - **Imagen para compartir (OG):** sube `img/og-carrera-creativa.jpg` (1200 × 630, está en `img/`) y úsala aquí. Es el hero de la V2: «Tu título no te consigue el mejor trabajo. Tu portafolio sí.»
   - **Título y descripción para redes** (si GHL los pide aparte): los mismos de arriba.
   - **Velocidad:** cuando ya tengas las fuentes en GHL (paso 4), en **Tracking Code → Header** precarga la de titulares para que aparezcan sin parpadeo: `<link rel="preload" href="URL_DE_OBVIOUSLY_NARROW_BOLD.woff" as="font" type="font/woff" crossorigin>`.
5. **No publiques todavía.**

## 2. Preparar la sección que va a contener la landing

1. Agrega **una sola sección**, con una fila y una columna.
2. En la sección: ancho **completo** (full width), padding **0** arriba, abajo y a los lados, y sin color de fondo.
3. Haz lo mismo en la fila y en la columna: padding 0 y ancho completo.

Si la sección queda angosta o con márgenes, el fondo negro de algunas secciones no llegará a los bordes. Revísalo en la página publicada con `?revisar=1`: el panel te dice cuánto mide la landing y cuánto la pantalla.

Si el builder está en ancho completo pero la página publicada sigue con márgenes:

1. Dale a la sección la clase personalizada `mas-seccion`. Está en la configuración avanzada de la sección.
2. Agrega esto **al final** del Custom CSS:
   ```css
   .mas-seccion, .mas-seccion .inner, .mas-seccion .c-row, .mas-seccion .c-column {
     max-width: none !important; width: 100% !important; padding: 0 !important; margin: 0 !important;
   }
   ```

No le pongas a esta sección animaciones de entrada de GHL, ni `overflow` o `transform` en sus ajustes. Rompen las tarjetas que se apilan al hacer scroll.

## 3. Insertar el HTML

1. Dentro de la columna agrega el elemento **Custom JS/HTML** (en algunas cuentas aparece como «Código» o «Custom Code»).
2. Abre `landing.html` y copia **solo** lo que está entre estas dos líneas:
   ```html
   <!-- ================= GHL · COPIAR DESDE AQUÍ ================= -->
   ...
   <!-- ================= GHL · HASTA AQUÍ ================= -->
   ```
   Empieza en `<div class="mas-vsl" ...>` y termina en el `</div>` que lo cierra. No copies `<html>`, `<head>` ni `<body>`.
   Con el kit es más fácil: copia completo `ghl/1-custom-code.html`.
3. Pégalo en el elemento y guarda.

## 4. Pegar el CSS

**Opción recomendada:** en la página ve a **Settings → Custom CSS**, borra lo que tenga y pega completo `ghl/2-custom-css.css`.

**Alternativa:** si tu cuenta no tiene ese campo, pégalo al inicio del mismo elemento Custom JS/HTML, envuelto así:
```html
<style>
  /* contenido completo de landing.css */
</style>
```

### Fuentes (obligatorio para que se vea como en la vista previa)

**Con el kit ya está hecho:** `ghl/medios.json` tiene las URLs de Archivo y de Obviously Narrow en GHL, y `ghl/2-custom-css.css` ya las trae conectadas con el peso 700. Los pasos de abajo son solo si pegas `landing.css` a mano.

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

**Opción recomendada:** en **Settings → Tracking Code → Footer code** **de esta página** (no en el del funnel completo) pega `ghl/3-footer.html` completo, o:
```html
<script>
  /* contenido completo de landing.js */
</script>
```

**Alternativa:** al final del mismo elemento Custom JS/HTML, también dentro de `<script>...</script>`.

El script se protege solo contra ejecuciones dobles. Si un día lo pegas en los dos lugares, no se duplican los eventos. Aun así, pégalo **en un solo lugar**.

- **Nunca dentro del `<div class="mas-vsl">`:** en GHL, un `<script>` que queda dentro de un `div` del elemento de código no corre.
- **Tiempos de GHL:** GHL arma la página en dos tiempos (la «hidratación»), y si «Optimize JavaScript» está encendido puede esperar a que la persona toque la pantalla. El script ya lo resuelve: espera a que exista el bloque `.mas-vsl`, arranca una sola vez y, si GHL vuelve a dibujar el bloque, arranca de nuevo. Aun así, si tu cuenta tiene **Optimize JavaScript**, prueba la página publicada con la opción apagada y encendida.
- **Al duplicar la página:** GHL **no copia** el Tracking Code de la página. Vuelve a pegar `ghl/3-footer.html` en la copia.

## 6. Subir las imágenes

### Las fotos que ya están en la página

**En la V2 ya están subidas:** `ghl/medios.json` tiene la URL de GHL de cada una y `tools/ghl-kit.py` las cambia solo. Este paso aplica solo si agregas una foto nueva: súbela, pon su URL en `ghl/medios.json` y vuelve a correr el script.

| Archivo | Dónde va | Código |
|---|---|---|
| `logo-mas-300.png` | Logo del hero (provisional, ver P-01) | P-01 |
| `hero-craft-640.webp`, `hero-craft-1080.webp` | Foto cuadrada del hero (grafitero) | P-02 |
| Los 29 archivos de `logos/` | Slider de agencias de la sección de prácticas | P-16 |
| `og-carrera-creativa.jpg` | Imagen para compartir en redes (no va en el HTML: va en la configuración de la página, paso 1) | — |
| `grad-show-640.webp`, `grad-show-1080.webp` | Última tarjeta de «El Programa», «Al graduarte» (Grad Show) | — |
| `ad-keyvisual-640.webp` | Moodboard de Art Direction (sillón) | P-05 |

Las fotos del salto (bienvenida) y de la gorra («La diferencia») salieron con sus secciones en la V2. Siguen en `img/` por si se usan después. Para encontrar las que sí se usan, busca `img/` en el HTML. Si al publicar alguna foto no aparece, casi siempre es una ruta `img/...` que se quedó sin cambiar.

### Las que todavía faltan

Cada espacio pendiente tiene un atributo `data-placeholder="P-xx"` que coincide con `CONTENT-PLACEHOLDERS.md`. En la V2 los books de graduados (P-06) y la foto de Ricardo (P-08) no están en la página: los books esperan permisos (`reserva/books.html`) y el bloque de agendar ya no lleva foto.

1. Sube la imagen a la biblioteca de medios de GHL (WebP o JPG optimizado; lo ideal es menos de 250 KB por imagen).
2. Dentro del elemento con ese `data-placeholder`, reemplaza las etiquetas de texto (`mas-book__pending`, etc.) por una imagen con su tamaño real.
   - La imagen se escribe así:
   ```html
   <img src="URL_DE_GHL" alt="Descripción útil de la pieza" width="1600" height="2000" loading="lazy" decoding="async">
   ```
3. Reglas:
   - **Siempre** pon `width` y `height` reales para evitar saltos de layout.
   - La imagen del hero (P-02) **no** lleva `loading="lazy"`; lleva `fetchpriority="high"`.
   - Si la imagen es decorativa, usa `alt=""`. Si muestra trabajo, describe la pieza y su autor.
   - Las portadas de los books (P-06) deben ser capturas o piezas **autorizadas** por cada graduado.

## 6 bis. Logos de agencias (slider de prácticas)

La sección «Dos agencias. 10 semanas en cada una.» trae 29 logos en dos filas. Arriba (15): Wieden+Kennedy, FCB México, GUT, Leo Burnett, Good Rebels, Jung von Matt, Anita y Vega, TBWA\Chiat\Day NY, Founders, niji, Samy, Impact BBDO, CW, Motor y Mass Appeal. Abajo (14): Ogilvy, Famous, Antoni, Astillero, Superheroes, Monks, Nu Creative Hub, M&C Saatchi, talented, Innocean, UTAG, Serviceplan, Mediaplus y Miller O’Connor. Están en `img/logos/`, ya limpios, a una tinta y listos para pantallas retina.

### 1. Súbelos a GHL

1. En tu subcuenta de GHL abre la **biblioteca de medios** (*Media Storage*). También se abre desde el builder, al elegir una imagen.
2. Crea una carpeta, por ejemplo `landing-logos`, y sube ahí los 29 archivos de `img/logos/`.
3. En cada archivo, usa **Copiar enlace** (*Copy link*) y, en el HTML, cambia su ruta `img/logos/...` por esa URL.

### 2. Para sumar más agencias

- **Formato:** SVG (lo ideal) o PNG con **fondo transparente**, versión horizontal y recortada al borde. Un logo con fondo blanco se vería como un rectángulo negro.
- **El color no importa:** la página pinta todos los logos de negro para que el muro se vea parejo sobre el fondo claro. Si un logo tiene letras o figuras claras sobre una forma oscura (como Astillero o el cuadro de Serviceplan), hay que pasarlo a una tinta con esas partes caladas, o se vuelve una mancha negra.
- **Solo agencias reales:** el pie dice «Agencias de la red de prácticas de Miami Ad School.» (claim C-012), así que cada logo debe ser de una agencia de esa red (ver P-16 en `CONTENT-PLACEHOLDERS.md`).
- **En el HTML,** copia un `<li class="mas-logo">…</li>` completo en cualquiera de las dos filas (`<ul class="mas-logos__track">`) y cambia `src`, `alt`, `width` y `height`:

```html
<li class="mas-logo" style="--logo-h: 1"><img src="URL_DE_GHL" alt="Nombre de la agencia" width="200" height="60" loading="lazy" decoding="async"></li>
```

- `alt` lleva el nombre de la agencia, tal cual. Es lo que escucha alguien que usa lector de pantalla.
- `width` y `height` son las proporciones del archivo. Si el logo mide 400 × 100, pon `width="400" height="100"`. La página ajusta la altura sola.
- **Tamaño visual:** `--logo-h` en el `<li>` equilibra el peso. Súbelo (1.3, 1.9) para insignias o logos delgados y bájalo (0.85) para logos muy anchos. `--logo-w` cambia el ancho máximo (11rem por defecto).
- El slider se arma solo con los logos que haya y repite la fila para que nunca quede un hueco.

### Cómo se comporta

- Las dos filas se mueven con el scroll, en sentidos opuestos, igual que la cinta fucsia: cuando la persona deja de bajar, se detienen. Por eso no necesitan botón de pausa y siguen cumpliendo con accesibilidad.
- Las flechas ‹ › junto al título adelantan o regresan las dos filas, para ver todos los logos sin tener que bajar.
- Con «reducir movimiento» activado en el sistema, los logos se quedan quietos en una cuadrícula y las flechas no aparecen (no hacen falta: se ven todos).

## 7. El video

El video va en el hero, en lugar de la foto (decisión de Ricardo, 2026-10-23). Muestra una portada con el botón fucsia «Ver el video · 3:30» y se carga solo cuando la persona lo toca; entonces arranca solo y se registra `vsl_play`.

1. En el JS (`landing.js`), dentro de `CONFIG`, la variable es una sola:
   ```js
   vslUrl: 'https://www.tella.tv/video/vid_cmm716re6001a04ld880m76nh',
   ```
   Acepta Tella, YouTube (`watch?v=`, `youtu.be`, `shorts`, `live`), Vimeo (también ocultos, con su hash) o la URL directa de un `.mp4`.
2. **La portada** es un cuadro del video: `img/vsl-poster-640.webp` y `img/vsl-poster-1280.webp`. **Súbelas a la biblioteca de medios de GHL** y pon sus URLs en `ghl/medios.json` (o pásaselas a Claude). Mientras no estén, la portada se ve oscura con el botón, sin la cara.
3. **«3:30»** es lo que muestra Tella con su velocidad de 1.2×. Si cambias el video, cambia ese texto y el `aria-label` del botón en el HTML (busca `mas-player__len`).
4. `CONFIG.thanksVideoUrl` es el video que aparece después de agendar (`?paso=confirmado`). Vacío = no aparece.

## 8. El formulario de GHL

El formulario ya está en el HTML: es el de GoHighLevel `DWvr3OTjwswSDGd9wnM6`, el mismo que estaba conectado en `/pruebaoct`. Va dentro de `<div id="ghl-form-slot">`.

### En el constructor de formularios de GHL (spec v2, sección 11)

- **Campos:** Nombre · Email · WhatsApp con código de país · Me interesa (`Art Direction` / `Copywriting` / `Aún no sé`).
- **Botón:** `Enviarme el folleto`. Hoy dice «Recibir el folleto»: cámbialo en GHL.
- **Las preguntas de calificación** (portafolio, situación actual, cuándo empezar) **no** van aquí. Van en el paso de agendar.
- **Al enviar:** redirigir a `https://tufuturocreativo.com/TU-RUTA?paso=agenda#aplicar`. Ahí la página dice «Tu folleto ya está listo.», muestra el botón «Descargar folleto» y registra `lead_submit`.
- **Correo:** el folleto también debe llegar por correo (workflow de GHL), porque la página dice «Recibe el folleto en tu correo».
- **Sticky Contact:** actívalo en el formulario y en el calendario.

### Prellenar «Me interesa»

Los botones «Recibe el folleto de Art Direction» y «Recibe el folleto de Copywriting» agregan `?interes_programa=Art Direction` (o `Copywriting`) al formulario y bajan a `#aplicar`. También funciona si la URL de la página trae `?interes_programa=Copywriting`, por ejemplo desde un anuncio.

- La clave está en `CONFIG.prefillParam` (`interes_programa`) y los valores en `CONFIG.programLabels`. Deben coincidir **exactamente** con el campo de GHL.

### Alto del formulario

El formulario no usa `form_embed.js`, así que su alto es fijo y está medido para cada ancho de pantalla (`--form-h` en el CSS). Si en GHL agregas o quitas campos, revisa en celular que se vea el botón completo y, si no, sube esos valores.

### El folleto en PDF

`CONFIG.brochureUrl` tiene la URL del PDF. El botón «Descargar folleto» se crea **solo después de enviar el formulario**: antes no existe en la página. Si prefieres que el PDF llegue **solo** por correo, deja `brochureUrl: ''`.

## 9. El calendario de Ricardo

En la V2 el calendario es **opcional y va después del folleto**. Debajo del formulario está el link «¿Ya tienes el folleto? Agenda tu llamada →», para tráfico de retargeting.

1. **[VERIFICAR]** Pon la URL del calendario de Ricardo en `CONFIG.calendarUrl`. Mientras esté vacía, el link no se muestra (spec v2, sección 5).
   - En la integración que había en GHL estaba `https://api.leadconnectorhq.com/widget/booking/FR0Ug1vwpcicPsQ6erYP`. Úsala solo si confirmas que es la correcta.
2. En la confirmación de la cita, elige **redirigir a una URL**: `https://tufuturocreativo.com/TU-RUTA?paso=confirmado#aplicar`. Ahí la página muestra la confirmación y el video de bienvenida, y registra `appointment_booked`.
3. Confirma que el correo de confirmación incluya fecha, hora y el enlace de la videollamada.

El recorrido: **formulario → `?paso=agenda` (folleto) → si quiere, agenda → `?paso=confirmado`**.

## 10. Conectar el píxel nuevo de Meta y GA4 (después)

Hoy **no se envía nada**. Todos los eventos solo se guardan en `window.masVsl.events` dentro del navegador.

1. Instala los códigos base del **píxel nuevo de Meta** y de **GA4** en **Settings → Tracking Code → Header code**, o con la integración nativa de GHL si la usas.
2. En `landing.js` cambia `var TRACKING_ENABLED = false;` a `true` y descomenta las líneas de `fbq`, `gtag` o `dataLayer` que vayas a usar.
3. Eventos disponibles:

| Evento | Cuándo ocurre | Sugerencia en Meta |
|---|---|---|
| `cta_click` | Clic en cualquier botón «Recibe el folleto» (trae cuál, en `cta`) | personalizado |
| `view_vsl` | El video entra en pantalla | personalizado |
| `vsl_play` | La persona da play (Tella: cuando entra al video) | personalizado |
| `vsl_50_percent` | Mitad del video (solo `.mp4` propio) | personalizado |
| `vsl_complete` | Fin del video (solo `.mp4` propio) | personalizado |
| `program_select` | Elige Art Direction, Copywriting o «Aún no sé» | personalizado |
| `view_books` | La sección de books entra en pantalla (hoy oculta, ver reserva/books.html) | `ViewContent` |
| `external_book_click` | Clic en el book de un graduado (hoy oculta) | personalizado |
| `social_click` | Clic en una red del footer (Instagram, TikTok, YouTube o LinkedIn) | personalizado |
| `form_start` | La persona entra al formulario | personalizado |
| `lead_submit` | Regresa con `?paso=agenda`, después de enviar el formulario (una vez por sesión) | `Lead` |
| `brochure_download` | Clic en «Descargar folleto» | personalizado |
| `calendar_click` | Clic en «Agenda tu llamada» | personalizado |
| `appointment_booked` | Regresa con `?paso=confirmado` (una vez por sesión) | `Schedule` |

4. **YouTube o Vimeo:** `vsl_50_percent` y `vsl_complete` requieren la API de su reproductor (YouTube IFrame API o Vimeo Player SDK). Si los necesitas, súmalos en ese momento o aloja la VSL como `.mp4`.
5. **API de Conversiones (CAPI):** envía `Lead` y `Schedule` desde el servidor con un workflow de GHL (acción de Meta Conversions API, si tu cuenta la tiene) y usa el mismo `eventID` que el navegador para deduplicar. Nunca pongas tokens de CAPI en este JS.

## 10 bis. Fechas de inicio

La V2 no tiene cuenta regresiva ni la cápsula «Próximo inicio · faltan X días»: la fecha exacta del ingreso de enero 2027 no está confirmada (spec v2, sección 5). En su lugar:

- El hero dice «Inicios en enero, abril, julio y octubre».
- El bloque de aplicar dice «Próximo ingreso: enero.».

Cuando la fecha esté confirmada, cambia esa línea en el HTML (busca `mas-apply__date`). Si se decide volver a poner un contador, que tome esa fecha confirmada y nunca sea *evergreen*.

## 11. Probar antes de publicar

Prueba en la **página publicada** en `tufuturocreativo.com`, no solo en el builder: el elemento de código no se ve dentro del builder y el Tracking Code no corre ahí.

**Primero**
- [ ] Abre la página con `?revisar=1` y resuelve todo lo que diga «Falta».

**Recorrido**
- [ ] Todos los botones «Recibe el folleto» llevan a `#aplicar`, sin salir de la página.
- [ ] «Recibe el folleto de Art Direction» y «… de Copywriting» marcan el programa en «Me interesa».
- [ ] El video de Tella se reproduce dentro de la página.
- [ ] El formulario se envía y redirige a `?paso=agenda`; aparece «Tu folleto ya está listo.» con «Descargar folleto», y el folleto llega al correo.
- [ ] Si `CONFIG.calendarUrl` está lleno: agendar redirige a `?paso=confirmado` y llega el correo con el enlace.
- [ ] El slider de logos se mueve al hacer scroll, las flechas lo adelantan y cargan los 29 logos.
- [ ] «Aviso de privacidad» y «Términos y condiciones» despliegan sus textos en el footer.

**Calidad**
- [ ] Revisa en un teléfono real (iPhone y Android), no solo en el modo móvil de la computadora.
- [ ] Recorre la página solo con teclado (Tab, Enter, Espacio): todo se alcanza y el foco se ve.
- [ ] Con «reducir movimiento» activado en el sistema, no hay animaciones: ni al hacer scroll ni al pasar el mouse.
- [ ] Corre Lighthouse en la URL de vista previa de GHL. Ojo: GHL agrega sus propios scripts, así que el puntaje será menor que en la vista previa local (en la última revisión: rendimiento 94–96 en celular y 100 en escritorio; accesibilidad, buenas prácticas y SEO en 100).
- [ ] Revisa que los estilos globales de GHL no cambien titulares, botones ni listas dentro de la landing.
- [ ] Con mouse: el punto amarillo sigue al cursor. En celular no aparece (es correcto).
- [ ] Si el builder de GHL aplica `transform` a la sección contenedora, el cursor-punto y el indicador de progreso podrían desfasarse; en ese caso quita el `transform` de esa sección.

**Medición** (solo cuando se active el paso 10)
- [ ] Meta Events Manager → **Probar eventos**: llegan `Lead` y `Schedule` sin duplicarse.
- [ ] GA4 → **DebugView**: llegan los eventos con sus parámetros.
- [ ] Haz una prueba con un correo tuyo y borra ese contacto de GHL después.

Solo después de esta lista: **publicar**.

## Qué no hacer

- No agregar menú ni WhatsApp: cada salida le resta al folleto. Las únicas redes van en el footer («Síguenos», decisión de Ricardo) y se abren en una pestaña nueva.
- No inventar urgencia, cupos, contadores, testimonios, salarios ni promesas de empleo.
- No dejar «[VERIFICAR]», «[DECIDIR]» ni corchetes a la vista, y no usar la raya larga (—) en ningún texto (spec v2, sección 1).
- No hablar de «entrevista» ni de «conversación» antes del formulario: todos los botones dicen «Recibe el folleto».
- No quitar la clase `mas-vsl` ni los `id` (`vsl`, `aplicar`, `ghl-form-slot`, `ghl-career-form`): el CSS y el JS dependen de ellos.
