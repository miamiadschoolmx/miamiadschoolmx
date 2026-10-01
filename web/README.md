# Miami Ad School México · Micrositio de Carreras Creativas

Micrositio de conversión para llevar leads calificados del anuncio al **video privado (VSL)** y de ahí a una **Llamada de Dirección de Carrera**.

> **Estado:** preview local. **No está publicado** y no envía correos. Todas las integraciones están vacías a propósito: en desarrollo verás etiquetas amarillas y un registro simulado; en producción, cada integración que falte muestra **"Configuración pendiente"** en lugar de fingir que funciona.

---

## Rutas

| Ruta | Para qué sirve | Indexable |
| --- | --- | --- |
| `/carreras-creativas` | Landing pública de captación. CTA principal: **Ver el video privado** (abre el registro). | Sí |
| `/vsl` | Página posterior al registro con el contenedor 16:9 del VSL. CTA principal: **Agendar una Llamada de Dirección de Carrera**. | No (`noindex`) |
| `/agenda` | Agenda externa (`BOOKING_URL`). | No (`noindex`) |
| `/gracias-agenda` | Confirmación y preparación para la llamada. | No (`noindex`) |
| `/` | Redirección temporal (307) a `/carreras-creativas` hasta que exista la web corporativa. | — |
| `/api/lead` | Endpoint de servidor que envía el registro a Systeme.io (modo API). | No |

**Importante:** `noindex` evita que Google indexe `/vsl`, pero **no protege la URL**. Cualquiera con el enlace puede abrirla. Si necesitas proteger el acceso al video, configúralo en Systeme.io o en tu proveedor de video (ver [Video](#3-video-vsl_embed)).

---

## Ver el preview en tu equipo

Requisitos: Node.js 20.9 o superior y npm.

```bash
cd web
npm install
npm run dev
```

Abre <http://localhost:3000/carreras-creativas>.

En **modo desarrollo** (`npm run dev`):

- Un banner amarillo arriba indica qué integraciones faltan.
- Los espacios de foto muestran su etiqueta (`[FOTO_MAS_HERO]`, etc.), ratio y brief.
- El registro funciona en **modo simulado**: valida, muestra carga y éxito, y te lleva a `/vsl`. **No guarda datos ni envía correos.** Un email que empiece con `error` (p. ej. `error@prueba.com`) simula el estado de error.
- Los eventos de analítica se imprimen en la consola del navegador como `[analytics] …`.

Para ver cómo se comporta en **producción** sin integraciones:

```bash
npm run build && npm run start
```

Ahí los CTAs dicen "Configuración pendiente", no hay etiquetas de desarrollo y los datos sin confirmar (duración, modalidad, admisión) no se publican.

Otros comandos: `npm run lint`, `npx tsc --noEmit`.

---

## Dónde está todo

```
web/
├── .env.example                  ← todas las variables, vacías
├── ASSETS_NEEDED.md              ← fotos y permisos pendientes
└── src/
    ├── config/
    │   ├── integrations.ts       ← CONFIGURACIÓN CENTRALIZADA de integraciones
    │   ├── program.ts            ← PROGRAM_DURATION, modalidad, paso de admisión
    │   ├── assets.ts             ← slots de fotografía (rutas y alt text)
    │   └── site.ts               ← marca, rutas y SEO (incl. [OG_IMAGE])
    ├── content/                  ← todo el copy (landing, funnel, CTAs, modal)
    ├── app/                      ← páginas, /api/lead, robots, sitemap
    ├── components/
    │   ├── ui/                   ← Section, Container, Heading, Button, Reveal…
    │   ├── media/                ← AssetSlot, VideoFrame, EmbedHtml
    │   ├── conversion/           ← modal, formulario, CTAs, WhatsApp, sticky, agenda
    │   ├── editorial/            ← ProcessChain, Faq
    │   ├── layout/               ← header, footer, logo, banner de desarrollo
    │   ├── analytics/            ← scripts de GA4/Pixel y eventos
    │   └── sections/carreras/    ← los 10 bloques de la landing
    └── lib/                      ← analítica, UTM, Systeme.io, validación
```

Para cambiar textos, edita `src/content/`. Para conectar servicios, usa variables de entorno (lista completa en `.env.example`) o, si lo prefieres, los valores por defecto de `src/config/integrations.ts`. **Nunca pegues llaves en archivos del repositorio.**

---

## Conectar integraciones

Crea `web/.env.local` copiando `.env.example` y llena los valores (en tu hosting, captúralos en su panel de variables). **Después de cambiar cualquier variable, vuelve a construir o desplegar:** las páginas se generan en build.

| Variable | Qué es | Si falta (desarrollo) | Si falta (producción) |
| --- | --- | --- | --- |
| `SYSTEME_API_KEY` + `SYSTEME_LEAD_TAG_IDS` | Registro vía API de Systeme.io (recomendado) | Registro simulado | CTA "Configuración pendiente" |
| `SYSTEME_FORM_EMBED_OR_URL` | Embed o URL de formulario de Systeme.io | Registro simulado | CTA "Configuración pendiente" |
| `SYSTEME_VSL_SUCCESS_URL` | Retorno tras registro | `/vsl` | `/vsl` |
| `VSL_EMBED` | `[PEGAR AQUÍ EL EMBED DEL VSL]` | Etiqueta en el contenedor 16:9 | "Video: configuración pendiente" |
| `BOOKING_URL` | Agenda (Google Calendar u otra) | Etiqueta en `/agenda` | CTA de agenda y `/agenda` dicen "Configuración pendiente" |
| `WHATSAPP_URL` | Enlace `wa.me` | Etiqueta | Botón flotante oculto; en `/vsl` y `/gracias-agenda`: "WhatsApp: configuración pendiente" |
| `PRIVACY_URL` | Aviso de privacidad | Etiqueta | "Aviso de privacidad: configuración pendiente" |
| `GA4_MEASUREMENT_ID`, `META_PIXEL_ID` | Analítica | No se carga nada | No se carga nada |
| `SITE_URL` | Dominio final | canonical a `localhost` | canonical a `localhost`, sitemap vacío |

### 1. Registro con Systeme.io

El modal de la landing pide sólo **nombre, email, ruta de interés (opcional)** y **consentimiento** (casilla vacía por defecto), con validación accesible y estados de carga, éxito y error. Los UTM de la visita (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) se guardan durante la sesión y viajan como campos ocultos.

Hay tres formas de conectarlo. Si configuras varias, gana la **A**, luego la **B**, luego la **C**.

#### Opción A · API pública (recomendada)

Conserva el formulario propio (diseño, validación, estados y UTM) y la llave nunca llega al navegador: la usa `src/app/api/lead/route.ts` en el servidor.

1. **Llave:** en Systeme.io, en la configuración de tu cuenta, busca la sección de **Public API keys** y crea una llave. Guárdala como `SYSTEME_API_KEY` en tu hosting (nunca con prefijo `NEXT_PUBLIC_`).
2. **Etiqueta:** crea una etiqueta, por ejemplo `carreras-vsl-lead`, y anota su **ID numérico**. Escríbelo en `SYSTEME_LEAD_TAG_IDS`. Si quieres aplicar más de una (p. ej. una para el newsletter de viernes), sepáralas con coma: `123,456`.
3. **Campos personalizados:** crea en Systeme.io los campos con **exactamente** estos slugs (están en `src/lib/lead/systeme-api.ts`):
   `ruta_interes`, `consentimiento_seguimiento`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
   Si alguno no existe, el contacto y la etiqueta se guardan igual y el servidor registra un aviso.
4. **Automatización:** crea una regla con disparador **"etiqueta agregada: carreras-vsl-lead"** y acción **"suscribir a campaña: Acceso VSL"** (la secuencia que envía el enlace a `/vsl`).
5. Despliega en un hosting con servidor Node (p. ej. Vercel). Esta opción no funciona como sitio estático exportado.

Qué hace el servidor, en orden: crea el contacto (o lo encuentra si el email ya existe), guarda `first_name` y los campos personalizados, aplica la(s) etiqueta(s) y responde con la URL de retorno. Incluye honeypot anti-spam, validación en servidor, verificación de origen cuando `SITE_URL` está definido y tiempo de espera de 8 s. Los logs sólo registran el paso y el código HTTP, nunca datos personales.

> Verifica en tu cuenta que agregar una etiqueta por API dispare la regla de automatización (haz una prueba con tu propio email antes de lanzar).

#### Opción B · Formulario embebido (Inline form)

1. En un embudo de Systeme.io agrega un paso de tipo **Inline form** (formularios de opt-in) y configura nombre, email y la casilla de consentimiento con este texto: *"Acepto recibir el acceso al video y comunicaciones de seguimiento. Consulta el aviso de privacidad."*
2. Configura su acción posterior para **redirigir a `https://TU-DOMINIO/vsl`** y su automatización (etiqueta + campaña de Acceso VSL).
3. Copia el **script** que genera Systeme.io y pégalo completo en `SYSTEME_FORM_EMBED_OR_URL` (empieza con `<script`).
4. El modal mostrará el formulario de Systeme.io en lugar del propio.

Limitaciones: validación, estados y consentimiento los controla Systeme.io; el evento `lead_form_submitted` no puede dispararse desde la página (usa `vsl_page_viewed` como conversión). Verifica si tu formulario de Systeme.io guarda los UTM de la URL.

#### Opción C · Página de registro alojada

Escribe en `SYSTEME_FORM_EMBED_OR_URL` la URL `https://…` de una página de registro de Systeme.io. Los CTAs llevarán ahí y agregarán los UTM de la sesión a la URL. Configura en esa página la redirección a `/vsl`.

### 2. Retorno tras registro (`SYSTEME_VSL_SUCCESS_URL`)

Por defecto `/vsl`. Acepta una ruta interna (`/vsl`) o una URL `https://`. En las opciones B y C, la redirección real se configura dentro de Systeme.io.

### 3. Video (`VSL_EMBED`)

Pega en `VSL_EMBED` **la URL del reproductor** (se carga en un `<iframe>` 16:9) **o el código embed completo** de tu proveedor (los `<script>` se ejecutan). El contenedor está en `src/components/media/VideoFrame.tsx`.

`/vsl` no es una página protegida. Si el acceso debe estar restringido, usa la protección de tu proveedor de video (por ejemplo, restringir la reproducción a tu dominio) o aloja el video en un área de miembros de Systeme.io. No comuniques que el enlace es seguro si no lo configuraste así.

### 4. Agenda (`BOOKING_URL`)

1. En Google Calendar crea un **horario de citas** (appointment schedule) para la Llamada de Dirección de Carrera. Duración y disponibilidad se definen ahí, no en el sitio.
2. Copia la URL de su opción para **insertar en sitio web** (la `src` del iframe) y guárdala en `BOOKING_URL`. Funciona igual con Calendly, Cal.com u otra herramienta que permita iframe.
3. Si la herramienta no permite iframe, el visitante siempre tiene el enlace "Abrir la agenda en una pestaña nueva".

**Preguntas del formulario de reserva** (en la herramienta de agenda, no en el sitio). Para no aumentar fricción, pide como obligatorio sólo lo necesario y deja el resto opcional:

| Pregunta | Sugerencia |
| --- | --- |
| WhatsApp | Obligatoria (confirmaciones y logística) |
| Ruta de interés: Art Direction / Copywriting / Aún lo estoy explorando | Obligatoria, opción única |
| País y ciudad | Obligatoria, texto corto |
| Situación actual (estudio, agencia, marca, diseño, contenido, freelance, transición) | Opcional |
| Objetivo profesional | Opcional |
| Estado de tu book (no tengo / piezas sueltas / tengo uno y quiero elevarlo) | Opcional |
| Disponibilidad | La cubre la propia agenda; no la dupliques |
| URL de portafolio | Opcional |

**Después de reservar → `/gracias-agenda`:** si tu herramienta permite redirigir tras la reserva (Calendly y Cal.com lo permiten; verifica en Google Calendar), apunta a `https://TU-DOMINIO/gracias-agenda`. Si no, incluye ese enlace en el correo de confirmación.

**Detener la secuencia de VSL al reservar:** Google Calendar no avisa a Systeme.io por sí solo. Conecta ambos con Zapier, Make o n8n:

1. Disparador: nueva cita en el calendario de llamadas.
2. Acción: buscar el contacto por email en Systeme.io y agregar la etiqueta `carreras-llamada-agendada`.
3. En Systeme.io, regla: etiqueta `carreras-llamada-agendada` agregada → **cancelar suscripción** a la campaña "Acceso VSL" y **suscribir** a "Confirmación de llamada".

### 5. WhatsApp (`WHATSAPP_URL`)

Formato `https://wa.me/52XXXXXXXXXX` (código de país + número, sin `+`, espacios ni guiones). Puedes agregar un mensaje inicial: `https://wa.me/52XXXXXXXXXX?text=Hola%2C%20tengo%20una%20duda`. Sólo se aceptan enlaces `wa.me` o `api.whatsapp.com`. WhatsApp es apoyo: aparece como botón flotante discreto y enlaces secundarios, nunca como CTA principal.

### 6. Aviso de privacidad (`PRIVACY_URL`)

URL completa (`https://…`) o ruta interna (`/aviso-de-privacidad`). Se enlaza desde el consentimiento del formulario y el footer. Revisa con tu área legal que el texto de consentimiento cubra el uso que harás de los datos (incluido el newsletter de viernes, si lo aplicas a estos contactos). Si cambias el texto, actualiza `CONSENT_VERSION` en `src/lib/lead/systeme-api.ts`.

### 7. Analítica

- **GA4:** `GA4_MEASUREMENT_ID` (formato `G-XXXXXXXXXX`). Activa en GA4 la medición mejorada de cambios de historial para contar el paso de `/carreras-creativas` a `/vsl`. Marca `lead_form_submitted` y `booking_cta_clicked` como eventos clave.
- **Meta Pixel:** `META_PIXEL_ID` (sólo dígitos). Registra `PageView` en cada navegación, cada evento del funnel como `trackCustom` y `lead_form_submitted` también como el evento estándar `Lead`.
- Los scripts sólo se cargan si hay ID. La zona está marcada en `src/components/analytics/AnalyticsScripts.tsx`. Si tu aviso de privacidad o tu mercado exigen consentimiento previo para cookies de analítica, agrega ahí tu banner o CMP.

Eventos (se envían a `dataLayer`, `gtag` y `fbq`, **sin datos personales**: sólo `location`, `lead_mode` y `route_interest`):

| Evento | Cuándo |
| --- | --- |
| `vsl_cta_clicked` | Clic en cualquier "Ver el video privado" (`location`: header, hero, diagnostico, evidencia, cierre, sticky) |
| `lead_form_opened` | Se abre el modal de registro |
| `lead_form_submitted` | Registro confirmado por la integración (no en errores) |
| `vsl_page_viewed` | Carga de `/vsl` |
| `booking_cta_clicked` | Clic en "Agendar una Llamada de Dirección de Carrera" o en "Abrir la agenda en una pestaña nueva" |
| `whatsapp_clicked` | Clic en cualquier enlace de WhatsApp |

**UTM:** se capturan en cualquier página de entrada, se guardan en `sessionStorage` durante la sesión (gana el último toque con UTM) y se envían con el registro (opción A) o se agregan a la URL de Systeme.io (opción C).

### 8. Dominio y SEO

- `SITE_URL` (p. ej. `https://www.tudominio.mx`): define canonical, `og:url`, `sitemap.xml` y `robots.txt`. También es el único origen aceptado por `/api/lead` en producción: debe coincidir exactamente con el dominio donde vive el formulario (con o sin `www`). En previews con otro dominio, el registro por API responderá 403.
- Landing: title, meta description, canonical, Open Graph y Twitter en `src/app/carreras-creativas/page.tsx`; textos en `src/config/site.ts`.
- `[OG_IMAGE]` (1200×630): copia la imagen aprobada a `public/og/` y escribe su ruta en `seo.ogImage` (y `seo.ogImageAlt`) en `src/config/site.ts`.
- `/vsl`, `/agenda` y `/gracias-agenda` llevan `meta robots noindex` y la cabecera `X-Robots-Tag`. No se bloquean en `robots.txt` a propósito: si se bloquearan, Google no podría leer el `noindex`.

### 9. Datos del programa

En `src/config/program.ts`:

- `PROGRAM_DURATION = "[CONFIRMAR: 1 año]"`
- `PROGRAM_MODALITY = "[CONFIRMAR: modalidad]"`
- `ADMISSION_STEP = "[CONFIRMAR: pasos de admisión]"`

Mientras un valor tenga el formato `[CONFIRMAR: …]`, en desarrollo se ve resaltado y en producción **no se publica**: la frase usa un texto alternativo que no afirma nada y el paso de admisión no aparece. Cuando esté confirmado, escribe sólo el valor (p. ej. `"1 año"`). No uses como fuente la duración del PDF histórico.

### 10. Fotografía

Ver [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md). Copia cada archivo aprobado a `public/assets/` y escribe su ruta y su texto alternativo en `src/config/assets.ts`. Nunca sustituyas un slot con stock ni con imágenes generadas.

---

## Flujo completo

```
Anuncio (UTM) → /carreras-creativas
   └─ "Ver el video privado" → modal (nombre, email, ruta, consentimiento + UTM)
        └─ Systeme.io: contacto + etiqueta → campaña "Acceso VSL" (correo con el enlace)
        └─ redirección → /vsl  (video + "Agendar una Llamada de Dirección de Carrera")
             └─ /agenda (Google Calendar) → reserva
                  └─ Zapier/Make/n8n → etiqueta "llamada agendada" en Systeme.io
                       → detiene "Acceso VSL" y activa "Confirmación de llamada"
                  └─ /gracias-agenda (preparación + volver al video + WhatsApp)
Contactos con consentimiento comercial → newsletter de viernes (regla en Systeme.io)
```

La página no reemplaza a Systeme.io: no envía correos ni implementa campañas.

---

## Dirección de arte y tipografía

- Paleta: ciruela `#2D133C`, magenta `#E4006D`, rosa pálido `#F7D5DE`, blanco roto `#F7F3ED`, tinta `#161216` (tokens en `src/app/globals.css`). Se agregó un tono de estado `#C2005D` sólo para hover del magenta y para textos de error pequeños, porque el magenta sobre blanco roto no alcanza 4.5:1 en texto pequeño.
- **Cambio de tipografía declarado:** no hay licencias de las fuentes de marca en este repositorio, así que se usan fuentes abiertas (licencia OFL), servidas desde el propio dominio con `next/font`:
  - **Archivo** (eje de anchura al 62 %, peso 850, mayúsculas) para titulares condensados.
  - **Inter** para texto corrido.
  Para usar las fuentes con licencia, reemplázalas en `src/app/layout.tsx` (con `next/font/local`) y conserva las variables `--font-archivo` y `--font-inter`, o renómbralas en `globals.css`.
- El logotipo es **tipográfico y provisional** (`src/components/layout/Logo.tsx`). Sustitúyelo por el SVG oficial (`[LOGO_MAS]` en `ASSETS_NEEDED.md`).

## Accesibilidad y calidad verificadas

- Contraste AA: texto blanco sobre magenta 4.65:1; texto sobre ciruela y tinta > 12:1; magenta sobre fondos claros sólo en titulares grandes (≥ 3:1).
- Revisión automática con axe-core (WCAG 2.2 AA + buenas prácticas) en las 4 páginas, en desktop y móvil, y en el modal con errores: sin violaciones.
- Teclado: enlace "Saltar al contenido", foco visible con contraste en cada fondo, modal nativo (`<dialog>`) que mantiene el foco dentro, cierra con Esc y devuelve el foco al CTA.
- Formularios: etiquetas visibles, errores asociados con `aria-describedby`, resumen de errores con `role="alert"` y región de estado `aria-live`.
- `prefers-reduced-motion`: sin animaciones de entrada ni desplazamiento suave.
- Sin desbordamiento horizontal de 320 a 1920 px.
- Producción sin integraciones: CTAs con "Configuración pendiente", sin etiquetas de desarrollo y sin datos `[CONFIRMAR]` publicados.

## Componentes para las siguientes páginas

`/programas`, `/workshops`, `/blog` y `/about` no se construyeron. Para crearlas, reutiliza: `Section` (tonos de color planos), `Container`, `Heading`, `Eyebrow`, `Lead`, `buttonClasses`, `Reveal`, `AssetSlot`, `VideoFrame`, `ProcessChain`, `Faq`, `SiteHeader`, `SiteFooter`, `VideoCta`, `BookingCta`, `WhatsAppLink` y `WhatsAppFloat`. El modal de registro ya está disponible en todo el sitio (`LeadCaptureProvider` en el layout raíz).

## Despliegue (cuando se apruebe)

El sitio no se ha publicado. Para hacerlo, por ejemplo en Vercel: importa el repositorio, define **Root Directory = `web`**, captura las variables de entorno y despliega. Antes de publicar, revisa la lista de abajo.

### Lista de verificación antes de publicar

- [ ] Registro conectado (opción A, B o C) y probado con un email real propio, incluida la automatización.
- [ ] `VSL_EMBED` pegado y reproduciendo en móvil.
- [ ] `BOOKING_URL` conectado; reserva de prueba hecha; flujo de etiqueta "llamada agendada" probado.
- [ ] `WHATSAPP_URL` y `PRIVACY_URL` definidos.
- [ ] `SITE_URL` definido; `[OG_IMAGE]` cargada.
- [ ] Datos de `src/config/program.ts` confirmados.
- [ ] Todas las fotos de `ASSETS_NEEDED.md` con permisos firmados y alt text escrito.
- [ ] Logotipo oficial en lugar del provisional.
- [ ] `DEV_PLACEHOLDERS` vacío en producción.
