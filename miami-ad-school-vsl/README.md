# Landing VSL · Carrera Creativa · Miami Ad School México

Landing para tráfico de Meta Ads. Lleva a la persona a pedir el folleto de Carrera Creativa con el formulario de GHL y, después, si quiere, a agendar una llamada. Se publica dentro de GoHighLevel (GHL) en `tufuturocreativo.com`.

**V2 (octubre 2026):** sigue la spec «Landing Carrera Creativa v2». La página mide cerca de 45 % menos que la versión anterior. Los pendientes y sus textos de respaldo están en `CONTENT-PLACEHOLDERS.md` · punto 1.

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
| `reserva/books.html` | La sección de books, guardada mientras no haya permisos (C-009). |
| `img/` | Fotos de marca optimizadas (WebP), logo provisional e imagen para compartir (1200 × 630). |
| `ghl/` | Kit para pegar en GHL: los 3 bloques ya cortados y `medios.json` con las URLs de GHL de cada archivo. |
| `tools/ghl-kit.py` | Arma el kit (`python3 tools/ghl-kit.py`). Solo Python 3, sin dependencias. |
| `README-GHL.md` | Guía paso a paso para montarla en GHL. |
| `CONTENT-PLACEHOLDERS.md` | Lo que falta antes de publicar. |

## Correr localmente

No hay nada que instalar. Solo se necesita Python 3, que ya viene en macOS y en casi todo Linux.

```bash
git clone https://github.com/miamiadschoolmx/miamiadschoolmx.git
cd miamiadschoolmx
git checkout claude/landing-v2
cd miami-ad-school-vsl
python3 -m http.server 8000
```

Abre <http://localhost:8000/landing.html>.

- **Etapas del formulario:** `landing.html?paso=agenda` y `landing.html?paso=confirmado`.
- **Revisión antes de publicar:** `landing.html?revisar=1` muestra un panel con lo que falta. En GHL, úsalo en la página publicada.
- **Usa el servidor.** Si abres el archivo con doble clic (`file://`), el navegador bloquea la fuente por CORS.

## Variables de entorno

**Ninguna.** Es una página estática: no hay servidor, base de datos ni secretos en este código.

Lo que se configura al conectar no son variables de entorno: son valores que se pegan en GHL o en el código. Ninguno es secreto.

| Qué | Dónde |
|---|---|
| Video (Tella, YouTube, Vimeo o `.mp4`) y video de gracias | `CONFIG.vslUrl` y `CONFIG.thanksVideoUrl` en `landing.js` |
| Formulario de GHL | El `<iframe>` dentro de `#ghl-form-slot` en `landing.html` |
| Calendario, folleto en PDF y campo «Me interesa» | `CONFIG.calendarUrl`, `CONFIG.brochureUrl` y `CONFIG.prefillParam` en `landing.js` |
| ID del píxel nuevo de Meta y de GA4 | *Tracking Code → Header* en GHL. Después, `TRACKING_ENABLED = true` |

El token de la API de Conversiones de Meta (CAPI) **sí** es secreto. Va solo en el workflow de GHL, del lado del servidor. Nunca va en este repositorio ni en el JS.

## Ruta principal

- **Local:** `miami-ad-school-vsl/landing.html` → <http://localhost:8000/landing.html>
- **Producción:** una página de GHL en `tufuturocreativo.com`. Hoy está en prueba en `preview.tufuturocreativo.com/pruebaoct`. La ruta final todavía no se define.

## Desplegar

Sigue `README-GHL.md`. En resumen:

1. Crea la página en blanco en GHL.
2. Las fuentes e imágenes ya están en GHL (`ghl/medios.json`).
3. Corre `python3 tools/ghl-kit.py` y pega los 3 bloques de `ghl/`, **reemplazando** todo lo que había.
4. Ajusta en GHL el formulario, las redirecciones y el SEO.
5. Prueba con la lista del paso 11 y con `?revisar=1`.

No se publica nada hasta completar `CONTENT-PLACEHOLDERS.md`.
