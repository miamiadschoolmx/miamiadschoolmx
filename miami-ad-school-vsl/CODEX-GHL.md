# Codex: montar la Landing Carrera Creativa V3 en GoHighLevel

Instrucciones para Codex (o para quien lo haga a mano). Página de prueba: **`https://preview.tufuturocreativo.com/pruebaoct`**, cuenta de GHL de Miami Ad School México. Versión del kit: la que dice la primera línea de cada bloque (los 4 deben decir la misma).

Qué cambia en la V3 (`PROMPT-V3-META.md`): hero nuevo con sello de Future Lions, «Dos rutas» en lugar de «Nuestra misión», «Tenemos 4 inicios al año» antes del formulario, barra fija en celular, textos sin jerga, preguntas nuevas, SEO nuevo, calendario dentro de la página y **medición encendida** con el píxel que ya está.

## Reglas (no se negocian)

1. **No publiques en `/carrera-creativa`.** Todo va primero en `/pruebaoct` hasta que Ricardo lo apruebe.
2. **No instales otro píxel, GA4, Google Tag Manager ni scripts de terceros.** El píxel de Meta `1349923403740237` ya está: **no lo borres**. La landing lo usa.
3. **No edites el código de los bloques.** Si algo no funciona, repórtalo; el cambio se hace en el repo y se regenera el kit.
4. **No pegues un calendario a mano.** El JS lo crea solo en el paso del folleto.
5. **No inventes textos, cifras ni datos.** Si algo no está aquí, pregunta a Ricardo.
6. **Respaldo antes de borrar**: copia lo que hay hoy en cada lugar a un documento.
7. Al terminar, entrega el reporte del paso 12.

## Archivos (rama `claude/landing-v2`, repo público)

| Qué | URL para descargar o copiar |
|---|---|
| Bloque 1 · HTML | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/1-custom-code.html |
| Bloque 2 · CSS | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/2-custom-css.css |
| Bloque 3 · JavaScript (Footer) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/3-footer.html |
| Bloque 4 · SEO (Header) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/4-header-seo.html |
| Imagen para compartir (OG) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/img/og-carrera-creativa-v3.jpg |

Las demás imágenes (incluida la portada del video) y las fuentes **ya están en GHL**: los bloques ya traen sus URLs.

## Paso 0 · Respaldo

En el editor de `/pruebaoct`, copia a un documento lo que hay hoy en:
- El elemento **Custom JS/HTML** de la landing.
- **Settings → Custom CSS**.
- **Settings → Tracking Code → Header** y **Footer**.
- **Settings → SEO**.

Toma una captura de la página como está.

## Paso 1 · Subir la imagen para compartir

Sube `og-carrera-creativa-v3.jpg` a **Media Storage** (carpeta `landing-carrera-creativa`) y copia su URL pública.

## Paso 2 · Pegar el HTML

En el elemento **Custom JS/HTML** de la sección: selecciona todo, bórralo y pega el **bloque 1** completo. Guarda.

- Si ahí había un iframe de calendario pegado a mano (con un comentario «Google Calendar» o `widget/booking`), se va con todo lo demás. Es correcto.
- La sección que lo contiene: ancho completo, sin padding, fondo `#0A0A0A`, sin animaciones de GHL, **sin `overflow` ni `transform`** (rompen la barra fija del celular y las tarjetas que se apilan).

## Paso 3 · Pegar el CSS

En **Settings → Custom CSS** de la página: borra **todo** y pega el **bloque 2**. Guarda.

## Paso 4 · Pegar el JavaScript

En **Settings → Tracking Code → Footer** de **esta página** (no del funnel completo):
- Borra la versión anterior de la landing (empieza con `<!-- Generado por tools/ghl-kit.py`) y cualquier script viejo como `var formUrl=`.
- **El píxel de Meta y cualquier script de medición se quedan.**
- Pega el **bloque 3** completo. Guarda.

Si la cuenta tiene **Optimize JavaScript**, prueba la página con la opción encendida y apagada (paso 10).

## Paso 5 · Pegar el SEO en el Header

En **Settings → Tracking Code → Header** de esta página:
- **Deja el píxel de Meta** donde está.
- Pega debajo el **bloque 4** (canonical y datos estructurados `Course`). Guarda.

## Paso 6 · SEO de la página

En **Settings → SEO**:
- **Título:** `Carrera de Copywriter y Director de Arte | Miami Ad School México`
- **Descripción:** `Conviértete en copywriter o director de arte publicitario: 18 meses online y en vivo, con dos prácticas de 10 semanas en agencias de la red Miami Ad School.`
- **Imagen para compartir:** la URL del paso 1.

## Paso 7 · Formulario de GHL (`DWvr3OTjwswSDGd9wnM6`)

Es el formulario que la página muestra en «Recibe el folleto».
- **Campo «Me interesa»:** *query key* `interes_programa`. Cambia sus opciones a exactamente **`Copywriter`**, **`Director de Arte`** y **`Aún no sé`** (hoy dicen «Art Direction» y «Copywriting»). Hazlo en la misma sesión que pegas el kit: los botones de «Dos rutas» prellenan con los nombres nuevos.
- **Campos ocultos nuevos** (*Hidden field*), con estas *query keys* exactas: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`. Sirven para saber de qué anuncio viene cada contacto.
- **Botón:** `Enviarme el folleto`.
- **Al enviar:** redirigir a `https://preview.tufuturocreativo.com/pruebaoct?paso=agenda#aplicar`.
- **No actives un evento `Lead` de GHL** (ni en el formulario ni en una página de gracias): la landing lo manda una vez. Si GHL ya tiene uno activo, anótalo en el reporte y no lo borres sin preguntar.
- No agregues ni quites otros campos sin preguntar a Ricardo. Los campos ocultos no cambian el alto del formulario; si cambias campos visibles, avisa: el alto está medido en el CSS.

## Paso 8 · Correo automático con el folleto (workflow)

Si ya existe el workflow del folleto, revísalo; si no, créalo **en borrador** (Ricardo lo revisa y lo publica):
- **Disparador:** Form Submitted → formulario `DWvr3OTjwswSDGd9wnM6`.
- **Acción 1:** Add Tag → `carrera-creativa-folleto`.
- **Acción 2:** Send Email, con este borrador:

> **Asunto:** Tu folleto de la Carrera Creativa
>
> Hola {{contact.first_name}}:
>
> Aquí está el folleto de la Carrera Creativa de Miami Ad School México, con el plan de estudios y las fechas:
> **Descargar el folleto** → `https://assets.cdn.filesafe.space/XpyeC21v7pmmK0tDJtpr/media/6aca981fc478ac553591bdd7.pdf`
>
> Si quieres resolver tus dudas, agenda 30 minutos con Ricardo: **Agenda tu llamada** → `https://api.leadconnectorhq.com/widget/booking/5vsO5cFmjBZvURwoHY2s`
>
> Miami Ad School México

El remitente lo define Ricardo.

## Paso 9 · Calendario

El calendario de Ricardo es `https://api.leadconnectorhq.com/widget/booking/5vsO5cFmjBZvURwoHY2s` («Carrera Creativa · 30 minutos con Ricardo»). Ya está en el bloque 3; no se pega nada.
1. En la configuración del calendario, la confirmación debe **redirigir** a `https://preview.tufuturocreativo.com/pruebaoct?paso=confirmado#aplicar`.
2. Que el correo de confirmación incluya fecha, hora y el enlace de la videollamada.

## Paso 10 · Revisión con el panel

Guarda la página y abre **`https://preview.tufuturocreativo.com/pruebaoct?revisar=1`** en escritorio y en celular. Aparece un panel que solo ve quien tenga esa URL. Debe decir:
- **«Versión del kit: HTML, CSS y JS son de la misma versión»**.
- **0 por resolver.**
- **Medición: «Encendida con el píxel de Meta».** Si dice que no encuentra el píxel, revisa que siga en el Header.
- **Título SEO** correcto y **SEO del Header** con canonical y JSON-LD. Si dice «Canonical repetido», GHL ya pone uno: borra la línea `<link rel="canonical" …>` del Header (el panel lo llama «paso 1» porque sigue la numeración de README-GHL.md).
- Es normal que marque «por revisar»: redes del footer sin URL.

## Paso 11 · Prueba real

1. Toca el **video** del hero: debe reproducirse dentro de la página.
2. Toca cada **«Recibe el folleto»** (hero, final de «¿Cómo funciona…?», final de prácticas, footer): todos bajan al formulario.
3. En «Dos rutas», toca **«Quiero ser Copywriter»**: baja al formulario con «Copywriter» marcado. Igual con «Quiero ser Director de Arte».
4. En «Tenemos 4 inicios al año» está marcado en fucsia el 10 de enero y **«Agenda tu entrevista»** abre el calendario de Ricardo en otra pestaña.
5. En el celular: al pasar el hero aparece abajo la barra **«Recibe el folleto»**; se esconde al llegar al formulario y al footer.
6. Abre Meta **Events Manager → Probar eventos** con la URL `https://preview.tufuturocreativo.com/pruebaoct?utm_source=prueba&utm_campaign=prueba-codex`.
7. Envía el formulario con un correo de prueba: debe redirigir y mostrar **«Tu folleto ya está listo.»**, el botón **«Descargar folleto»** y el **calendario** dentro de la página.
8. En Probar eventos: llegan `PageView` y **un solo** `Lead`. Toma captura.
9. En GHL, abre el contacto de prueba: debe tener `prueba` en `utm_source` y `prueba-codex` en `utm_campaign`. Toma captura.
10. Si el workflow ya está publicado: llega el correo con el folleto.
11. «Aviso de privacidad» y «Términos y condiciones» del footer despliegan sus textos.
12. Ninguna sección se sale de la pantalla en el celular, ni hay scroll horizontal.
13. Borra el contacto de prueba en GHL.

**Formulario en `loading="lazy"`:** en vivo lo habían cambiado a `eager`. Prueba que cargue al tocar un botón, en celular y escritorio. Si alguna vez no carga, no lo cambies en GHL: anótalo en el reporte.

## Paso 12 · Reporte para Ricardo

Entrega:
- Qué se hizo en cada paso, y lo que no se pudo hacer y por qué.
- La URL de GHL de `og-carrera-creativa-v3.jpg` (para `ghl/medios.json` del repo).
- El texto del panel `?revisar=1` (escritorio y celular).
- Capturas de la página en escritorio y en celular (primera pantalla y completa).
- Captura de **Probar eventos** con `PageView` y `Lead`, y del contacto de prueba con sus UTM.
- Si GHL ya tenía un evento `Lead` propio o un canonical propio.
- Si el formulario en `lazy` cargó bien.
- Cualquier diferencia que hayas visto contra estas instrucciones.

**No publiques en `/carrera-creativa`.** Eso lo decide Ricardo después de revisar.
