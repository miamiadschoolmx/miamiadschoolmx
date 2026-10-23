# Codex: montar la Landing Carrera Creativa V2 en GoHighLevel

Instrucciones para Codex (o para quien lo haga a mano). Página: **`https://preview.tufuturocreativo.com/pruebaoct`**, cuenta de GHL de Miami Ad School México. Versión del kit: **`51e508f4`**.

## Reglas (no se negocian)

1. **No publiques en el dominio final.** Todo se queda en `/pruebaoct` hasta que Ricardo lo apruebe.
2. **No instales píxeles, GA4, Google Tag Manager ni scripts de terceros.** Si ya hay un píxel o script de medición en Tracking Code, **no lo borres**.
3. **No edites el código de los 3 bloques**, salvo los dos cambios que se indican abajo (rutas de la portada del video y, si Ricardo lo confirma, la URL del calendario).
4. **No inventes textos, cifras ni datos.** Si algo no está aquí, pregunta a Ricardo.
5. **Respaldo antes de borrar**: copia lo que hay hoy en cada lugar a un documento.
6. Al terminar, entrega el reporte del paso 12.

## Archivos (rama `claude/landing-v2`, repo público)

| Qué | URL para descargar o copiar |
|---|---|
| Bloque 1 · HTML | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/1-custom-code.html |
| Bloque 2 · CSS | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/2-custom-css.css |
| Bloque 3 · JavaScript | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/ghl/3-footer.html |
| Portada del video (chica) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/img/vsl-poster-640.webp |
| Portada del video (grande) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/img/vsl-poster-1280.webp |
| Imagen para compartir (OG) | https://raw.githubusercontent.com/miamiadschoolmx/miamiadschoolmx/claude/landing-v2/miami-ad-school-vsl/img/og-carrera-creativa.jpg |

Las demás imágenes y las fuentes **ya están en GHL**: el bloque 1 y el bloque 2 ya traen sus URLs.

## Paso 0 · Respaldo

En el editor de `/pruebaoct`, copia a un documento lo que hay hoy en:
- El elemento **Custom JS/HTML** de la landing.
- **Settings → Custom CSS**.
- **Settings → Tracking Code → Header** y **Footer**.

Toma una captura de la página como está.

## Paso 1 · Subir 3 imágenes a la biblioteca de medios

Sube a **Media Storage** (carpeta `landing-carrera-creativa`):
- `vsl-poster-640.webp`
- `vsl-poster-1280.webp`
- `og-carrera-creativa.jpg`

Copia la URL pública de cada una.

## Paso 2 · Conectar la portada del video en el bloque 1

En el texto del **bloque 1**, cambia (aparecen en `src` y en `srcset`; cambia todas):
- `img/vsl-poster-640.webp` → la URL de GHL de `vsl-poster-640.webp`
- `img/vsl-poster-1280.webp` → la URL de GHL de `vsl-poster-1280.webp`

No cambies nada más del bloque.

## Paso 3 · Pegar el HTML

En el elemento **Custom JS/HTML** de la sección: selecciona todo, bórralo y pega el **bloque 1** (con el cambio del paso 2). Guarda.

- La sección que lo contiene: ancho completo, sin padding, fondo `#0A0A0A`, sin animaciones de GHL, sin `overflow` ni `transform`.

## Paso 4 · Pegar el CSS

En **Settings → Custom CSS** de la página: borra **todo** (incluidos parches viejos como «Reparación de hero responsive» o `.mas-apply-module { display: none }`) y pega el **bloque 2**. Guarda.

## Paso 5 · Pegar el JavaScript

En **Settings → Tracking Code → Footer** de **esta página** (no del funnel completo):
- Borra el script viejo que empieza con `var formUrl=` y cualquier otra versión anterior de la landing.
- **Si hay un píxel de Meta, GA4, GTM u otro script de medición, déjalo.**
- Pega el **bloque 3** completo. Guarda.

No toques el Header, salvo para confirmar que no tiene versiones viejas de la landing.

Si la cuenta tiene **Optimize JavaScript**, prueba la página con la opción encendida y apagada (paso 10).

## Paso 6 · SEO de la página

En **Settings → SEO**:
- **Título:** `Carrera Creativa | Miami Ad School México`
- **Descripción:** `18 meses online y en vivo para construir un book de Art Direction o Copywriting. Dos prácticas de 10 semanas en agencias de la red Miami Ad School.`
- **Imagen para compartir:** la URL de `og-carrera-creativa.jpg` del paso 1.

## Paso 7 · Formulario de GHL (`DWvr3OTjwswSDGd9wnM6`)

Es el formulario que la página ya muestra en «Recibe el folleto».
- **Botón:** cambia el texto a `Enviarme el folleto`.
- **Campo «Me interesa»** (hoy dice «¿Qué te interesa explorar?»): su *query key* debe ser `interes_programa` y sus opciones, exactamente `Art Direction`, `Copywriting` y `Aún no sé`.
- **Al enviar:** redirigir a la URL `https://preview.tufuturocreativo.com/pruebaoct?paso=agenda#aplicar`.
- No agregues ni quites campos sin preguntar a Ricardo. Si cambias el número de campos, avisa: el alto del formulario está medido en el CSS.

## Paso 8 · Correo automático con el folleto (workflow)

Crea un workflow **en borrador** (Ricardo lo revisa y lo publica):
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
> Si quieres resolver tus dudas, agenda 30 minutos con Ricardo: **Agenda tu llamada** → *(URL del calendario; esta línea va solo si Ricardo confirmó el calendario en el paso 9)*
>
> Miami Ad School México

El remitente lo define Ricardo. La secuencia completa de correos se escribe después: depende del contenido del PDF, el calendario, la fecha de enero y el remitente.

## Paso 9 · Calendario (solo si Ricardo lo confirma)

En la integración anterior estaba el calendario `https://api.leadconnectorhq.com/widget/booking/FR0Ug1vwpcicPsQ6erYP`. **Pregúntale a Ricardo si es su calendario.**

- **Si dice que sí:**
  1. En el **bloque 3 ya pegado**, cambia solo la línea `calendarUrl: '',` por `calendarUrl: 'https://api.leadconnectorhq.com/widget/booking/FR0Ug1vwpcicPsQ6erYP',`.
  2. En la configuración del calendario, la confirmación debe redirigir a `https://preview.tufuturocreativo.com/pruebaoct?paso=confirmado#aplicar`.
  3. Que el correo de confirmación incluya fecha, hora y el enlace de la videollamada.
- **Si dice que no, o no sabe:** no lo toques. El link «Agenda tu llamada» se queda oculto.

## Paso 10 · Revisión con el panel

Guarda la página y abre **`https://preview.tufuturocreativo.com/pruebaoct?revisar=1`** en escritorio y en celular. Aparece un panel que solo ve quien tenga esa URL. Debe decir:
- **«Versión del kit: HTML, CSS y JS son de la misma versión (51e508f4)».**
- **0 por resolver.** Si marca imágenes que no cargan, revisa el paso 2.
- Es normal que marque «por revisar»: calendario (si no se confirmó), redes del footer sin URL y, a veces, la imagen para compartir.

## Paso 11 · Prueba real

1. Toca el **video** del hero: debe reproducirse dentro de la página.
2. Toca cada **«Recibe el folleto»** (hero, final de «¿Cómo funciona…?», final de prácticas, footer): todos bajan al formulario.
3. Abre `https://preview.tufuturocreativo.com/pruebaoct?interes_programa=Copywriting`: el formulario debe llegar con «Copywriting» marcado.
4. Envía el formulario con un correo de prueba: debe redirigir y mostrar **«Tu folleto ya está listo.»** con el botón **«Descargar folleto»**.
5. Si el workflow ya está publicado: llega el correo con el folleto.
6. «Aviso de privacidad» y «Términos y condiciones» del footer despliegan sus textos.
7. Borra el contacto de prueba en GHL.
8. Ninguna sección se sale de la pantalla en el celular, ni hay scroll horizontal.

## Paso 12 · Reporte para Ricardo

Entrega:
- Qué se hizo en cada paso, y lo que no se pudo hacer y por qué.
- Las URLs de GHL de las 3 imágenes del paso 1 (para guardarlas en `ghl/medios.json` del repo).
- El texto del panel `?revisar=1` (escritorio y celular).
- Capturas de la página en escritorio y en celular.
- Si se cambió `calendarUrl` en el bloque 3 (para pasarlo también al repo).
- Cualquier diferencia que hayas visto contra estas instrucciones.

**No publiques en el dominio final.** Eso lo decide Ricardo después de revisar.
