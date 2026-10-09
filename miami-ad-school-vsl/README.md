# Landing VSL · Carrera Creativa · Miami Ad School México

Landing para tráfico de Meta Ads. Lleva a la persona del video (VSL) al formulario y la agenda de una entrevista. Se publica dentro de GoHighLevel (GHL) en `tufuturocreativo.com`.

## Stack

- HTML semántico, CSS y JavaScript **vanilla**: sin frameworks, sin build y sin dependencias.
- Todo vive dentro de `<div class="mas-vsl">`, así que no choca con los estilos de GHL.
- Fuente de vista previa: Archivo (licencia OFL, incluida en `fonts/`). La fuente de marca, Obviously Narrow, tiene licencia comercial: se conecta en GHL y no está en el repositorio.
- Sin píxeles ni scripts de terceros. La medición está preparada pero **apagada** (`TRACKING_ENABLED = false` en `landing.js`).

| Archivo | Para qué sirve |
|---|---|
| `landing.html` | La página. Para GHL se copia solo el bloque entre `GHL · COPIAR DESDE AQUÍ` y `GHL · HASTA AQUÍ`. |
| `landing.css` | Estilos. Va en *Settings → Custom CSS* de la página en GHL. |
| `landing.js` | Comportamiento y eventos de medición. Va en *Tracking Code → Footer*. |
| `fonts/` | Archivo (OFL). |
| `img/` | Fotos de marca, logo provisional e imagen para compartir. **No está en el repositorio** (es público): se entrega en un zip aparte. |
| `README-GHL.md` | Guía paso a paso para montarla en GHL. |
| `CONTENT-PLACEHOLDERS.md` | Lo que falta antes de publicar. |

## Correr localmente

No hay nada que instalar. Solo se necesita Python 3, que ya viene en macOS y en casi todo Linux.

```bash
git clone https://github.com/miamiadschoolmx/miamiadschoolmx.git
cd miamiadschoolmx
git checkout claude/jolly-keller-7d0dw6
cd miami-ad-school-vsl
# Descomprime aquí el zip de imágenes para que exista la carpeta img/
python3 -m http.server 8000
```

Abre <http://localhost:8000/landing.html>.

- **Etapas del formulario:** `landing.html?paso=agenda` y `landing.html?paso=confirmado`.
- **Usa el servidor.** Si abres el archivo con doble clic (`file://`), el navegador bloquea la fuente por CORS.
- **Sin la carpeta `img/`,** la página funciona pero se ve sin fotos.

## Variables de entorno

**Ninguna.** Es una página estática: no hay servidor, base de datos ni secretos en este código.

Lo que se configura al conectar no son variables de entorno: son valores que se pegan en GHL o en el código. Ninguno es secreto.

| Qué | Dónde |
|---|---|
| URL de la VSL | `data-vsl-src` en `landing.html` |
| Formulario y calendario de GHL | `#ghl-form-slot` y `#ghl-calendar-slot` en `landing.html` |
| Campo «Me interesa», fechas y días de cierre | `CONFIG` en `landing.js` |
| ID del píxel nuevo de Meta y de GA4 | *Tracking Code → Header* en GHL. Después, `TRACKING_ENABLED = true` |

El token de la API de Conversiones de Meta (CAPI) **sí** es secreto. Va solo en el workflow de GHL, del lado del servidor. Nunca va en este repositorio ni en el JS.

## Ruta principal

- **Local:** `miami-ad-school-vsl/landing.html` → <http://localhost:8000/landing.html>
- **Producción:** una página de GHL en `tufuturocreativo.com`. La ruta todavía no se define; la guía sugiere `/entrevista`.

## Desplegar

Sigue `README-GHL.md`. En resumen:

1. Crea la página en blanco en GHL.
2. Pega el HTML, el CSS y el JS.
3. Sube fuentes e imágenes y cambia las rutas `fonts/...` e `img/...` por las URLs de GHL.
4. Conecta la VSL, el formulario y el calendario.
5. Prueba con la lista del paso 11.

No se publica nada hasta completar `CONTENT-PLACEHOLDERS.md`.
