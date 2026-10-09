# Pendientes antes de publicar

Todo lo que la landing necesita para salir. Cada código `P-xx` aparece en `landing.html` como `data-placeholder="P-xx"` o en un comentario `REEMPLAZAR`, para encontrarlo rápido con buscar.

**Regla:** nada de esta lista se rellena con datos supuestos. Si un dato no está validado, se queda como pendiente.

## 1. VSL

| Código | Qué falta | Dónde | Formato |
|---|---|---|---|
| P-03 | **URL final de la VSL** | `data-vsl-src="REEMPLAZAR_URL_VSL"` | YouTube, Vimeo o `.mp4` propio |
| P-03 | Duración real | `Duración: pendiente` | Ej. `Duración: 12 min` |
| P-04 | Póster del video (opcional) | Comentario dentro de `.mas-player__poster` | Frame de 1920 × 1080, WebP o JPG |

## 2. Visuales oficiales

| Código | Qué falta | Dónde | Formato |
|---|---|---|---|
| P-01 | Logo oficial Miami Ad School México, versión para fondo negro. **Hoy hay uno provisional** (`img/logo-mas.png`), recortado de la imagen que mandó Ricardo: sirve para la prueba, pero en pantallas grandes se puede ver suave. | `.mas-brand__logo` | SVG |
| P-02 | ~~Imagen del hero~~ **Resuelto** con foto de marca (grafitero). Opcional más adelante: una pieza real del book de un graduado, con autorización. | `.mas-plate--image` | Cuadrada · 1080 × 1080 px |
| P-05 | ~~Key visual de Art Direction~~ **Resuelto** con foto de marca (sillón). | `.mas-board__tile--key` | Cuadrado, mínimo 640 px |
| P-06 | Preview de cada uno de los 8 books, autorizado por su autor | `.mas-book__cover` | 4:5 · 1000 × 1250 px |
| P-08 | Foto de Ricardo | `.mas-host__photo` | Cuadrada, mínimo 320 × 320 px |
| — | Imagen para compartir en redes (OG) | Settings de la página en GHL | 1200 × 630 px |

No usar fotografía de stock de estudiantes sonriendo frente a una laptop.

**Fotos de marca en uso** (las mandó Ricardo; están en `img/`, fuera del repositorio): grafitero (hero), salto (bienvenida), Grad Show (último capítulo de los 18 meses), sillón (Art Direction) y gorra con la M («La diferencia»). **Confirmar** que Miami Ad School México tiene derechos para usarlas en una página de anuncios pagados, incluida la autorización de las personas que aparecen.

## 2 bis. Prácticas profesionales

| Código | Qué falta | Dónde | Formato |
|---|---|---|---|
| P-16 | **Logos de agencias** donde alumnos de Miami Ad School hicieron prácticas (hay 10 espacios; se borran los que sobren) | Sección «10 semanas dentro de una agencia» · `.mas-logo` | SVG o PNG con fondo transparente, versión horizontal (README · paso 6 bis) |
| P-16 | Confirmar que cada agencia es un caso real y que la red MAS está de acuerdo en mostrar su logo | Misma sección | — |
| P-16 | Validar los textos: «después del primer año de clases», «10 semanas», «algunas de las mejores agencias del mundo» y «Algunas agencias donde alumnos de Miami Ad School han hecho sus prácticas» | Hero, cinta, capítulo 3 de los 18 meses, sección violeta y preguntas frecuentes | — |
| P-16 | Cómo se asignan las prácticas, en qué ciudad o modalidad, si tienen costo extra y si aplican a todas las personas. Hoy la página **no** promete nada de esto: dice que se explica en la entrevista | Nota de la sección violeta y pregunta frecuente | — |

## 3. Tipografías

| Código | Qué falta | Notas |
|---|---|---|
| P-13 | URL de **Obviously Narrow Bold** (titulares) y **Medium** en GHL | Los `.woff` están en Drive (*01 Brand Kit › 07 Tipografia › Web*). Hay que confirmar que la licencia cubre uso web en `tufuturocreativo.com`. |
| P-13 | **Obviously Regular** (texto corrido, según el manual de marca) | No está en Drive. Mientras no llegue, el texto usa Archivo. |
| P-13 | URL de Archivo en GHL | Subir `fonts/archivo-latin-wdth-normal.woff2` (licencia OFL). |

## 4. Testimonios autorizados

| Código | Qué falta | Notas |
|---|---|---|
| P-07 | Un testimonio real y específico, con nombre, rol actual y autorización por escrito | Va en la tarjeta fucsia de «Pruebas», justo después del hero. Hoy dice que está pendiente. Nunca inventarlo ni parafrasearlo. |
| P-15 | Video corto (30–60 s) de un maestro criticando un proyecto real | Tarjeta negra de «Pruebas». Con permiso del alumno cuyo proyecto se critica. |

## 5. Datos académicos y fechas

| Código | Qué falta | Dónde |
|---|---|---|
| P-11 | Confirmar los nombres de las tres etapas y dónde caen las prácticas (hoy: capítulo 3, después del primer año y antes de editar el book) | Sección «Lo que construyes durante 18 meses» |
| P-11 | Confirmar la duración: tres etapas de seis meses (meses 1–6, 7–12, 13–18) | Misma sección |
| P-11 | ~~Fechas de inicio reales~~ **Confirmadas:** 10 de enero, 10 de abril, 10 de julio y 10 de octubre | Cuenta regresiva y opciones del formulario. |
| P-11 | **Cierre de admisión antes de cada inicio** | Hoy el contador salta al siguiente inicio 7 días antes (`intakeCutoffDays` en `landing.js`). Confirmar el número real de días. |
| P-11 | Horario de clases y carga semanal | Se mencionan en las preguntas frecuentes como algo que se confirma en la entrevista |

## 6. Claims y textos por validar

| Código | Texto | Qué validar |
|---|---|---|
| P-14 | «Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year, incluyendo 2025.» (también en el sello del hero y en la descripción SEO) | Verificado en prensa: The Drum, «Miami Ad School claims record seventh Future Lions School of the Year title» (10 jul 2025), y en miamiadschool.com. Confirmar con la red MAS que México puede usarlo así. |
| P-14 | «Somos Miami Ad School. La escuela de publicidad y creatividad más premiada del mundo.» (bienvenida) | Es el posicionamiento oficial de la red Miami Ad School (lo usa miamiadschool.com y sus sedes). No existe un ranking independiente que lo compare: por eso va siempre junto a la prueba de los siete Future Lions School of the Year. |
| — | Capítulos de «Así se ven esos 18 meses» (llegas con ideas sueltas, primera campaña, editas tu book, entras a la sala) | Narrativa ilustrativa escrita para la landing: confirmar que describe bien la experiencia real de cada etapa. |
| — | «Miami Ad School es una red internacional de escuelas creativas… con la misma exigencia y el mismo objetivo» (bienvenida) | Que el equipo esté de acuerdo con la formulación. |
| — | «Carrera Creativa», «18 meses» | Nombre del programa y duración vigentes. |
| — | «Muchas personas llegan mientras trabajan.» (preguntas frecuentes) | Que sea cierto en la generación actual. |
| — | «Emmanuel Rocha y Antonio Fragoso son maestros activos en Miami Ad School México.» | Que sigan activos al publicar y que estén de acuerdo con aparecer. |
| — | Los 8 graduados y sus URLs | Que cada persona autorice aparecer y que su sitio siga en línea. No se pudieron abrir desde el entorno donde se construyó la página. |
| — | «Online y en vivo», «Entrevista sin costo» | Que sigan siendo ciertos. |
| — | Preguntas frecuentes: «clases con horario fijo», «recibes la confirmación por correo», «solicitar la entrevista no te compromete a inscribirte» | Que coincidan con la operación real. |
| — | «Tu entrevista es con Ricardo» | Que Ricardo sea quien hace las entrevistas, o cambiar el nombre. |

## 7. Políticas legales

| Código | Qué falta | Dónde |
|---|---|---|
| P-12 | URL del **aviso de privacidad** | `href="REEMPLAZAR_URL_PRIVACIDAD"` en el footer, y en el texto de consentimiento del formulario |
| P-12 | URL de **términos y condiciones** | `href="REEMPLAZAR_URL_TERMINOS"` en el footer |

Mientras un enlace diga `REEMPLAZAR`, el JS lo desactiva y lo marca como «pendiente».

## 8. Formulario de GHL

| Código | Qué falta |
|---|---|
| P-09 | Crear la encuesta o formulario con los campos de `README-GHL.md` · paso 8 |
| P-09 | Query key del campo «Me interesa» y actualizar `prefillParam` en `landing.js` |
| P-09 | Redirección al enviar: `?paso=agenda#aplicar` |
| P-09 | Código de inserción dentro de `#ghl-form-slot` |
| P-09 | Texto de consentimiento con enlace al aviso de privacidad |

## 9. Calendario de GHL

| Código | Qué falta |
|---|---|
| P-10 | Calendario de entrevistas con Ricardo, con ubicación de videollamada |
| P-10 | Correo de confirmación con fecha, hora y enlace |
| P-10 | Redirección al agendar: `?paso=confirmado#aplicar` |
| P-10 | Código de inserción dentro de `#ghl-calendar-slot` |

## 10. Medición: píxel nuevo de Meta y GA4

| Qué falta | Notas |
|---|---|
| ID del **píxel nuevo** de Meta | Instalar en el head de la página (README · paso 10) |
| ID de medición de **GA4** | Igual |
| Activar `TRACKING_ENABLED` en `landing.js` | Solo después de instalar los códigos base |
| CAPI para `Lead` y `Schedule` | Desde un workflow de GHL, con deduplicación por `eventID` |
| Prueba en Meta *Probar eventos* y GA4 *DebugView* | Antes de publicar |
