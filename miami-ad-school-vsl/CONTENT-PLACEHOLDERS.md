# Pendientes antes de publicar

Todo lo que la landing necesita para salir. Cada código `P-xx` aparece en `landing.html` como `data-placeholder="P-xx"` o en un comentario `REEMPLAZAR`, para encontrarlo rápido con buscar.

**Regla:** nada de esta lista se rellena con datos supuestos. Si un dato no está validado, se queda con su texto de respaldo o el bloque no se muestra. Nunca se publica «[VERIFICAR]», «[DECIDIR]» ni corchetes visibles.

## 1. V2: datos pendientes y respaldo en uso

Viene de la sección 5 de la spec «Landing Carrera Creativa v2». Cuando Ricardo confirme un dato, se cambia el respaldo por el dato confirmado.

| Dato | Dónde se usa | Estado en la V2 | Cómo cambiarlo |
|---|---|---|---|
| Horario de clases | Hero, FAQ 5 | **Confirmado:** «Lunes a jueves, 7 a 10 pm» (Ricardo, 2026-10-21) | — |
| Zona horaria del horario | Hero, FAQ 5, FAQ «otra ciudad o país» | Respaldo: «7 pm a 10 pm» sin zona horaria. **Importa más ahora** que la página dice «Estudia desde cualquier parte» | Agregar la zona (por ejemplo, hora del centro de México) en el hero y en las dos preguntas |
| [DECIDIR] ¿Se queda el video en «Prueba»? | Sección 2 | **Decidido por Ricardo (2026-10-23):** el video pasa al hero, en lugar de la foto, con el botón «Ver el video · 3:30» | — |
| Frase incompleta de la tarjeta Art Direction («… a probar rápido.») | Carreras creativas | Respaldo: la frase no está; el texto termina en «El criterio lo pones tú.» | Pedir la frase completa a Ricardo |
| ¿El PDF trae costos y opciones de pago? | FAQ 7 | Respaldo: «El folleto trae el plan de estudios. La inversión y las opciones de pago las revisamos contigo en una llamada de 30 minutos.» | Si el PDF sí trae costos, cambiar la FAQ 7 |
| Precio a publicar | FAQ 7 | Respaldo: no se publica precio (la referencia interna de $12,760 MXN/mes no está reconfirmada) | — |
| Maestros: nombre, rol, agencia, foto, permiso | Sección 6 «Quién te da feedback» | Respaldo: la sección no se creó | Con datos y permisos, se arma la sección |
| Books: relación con MAS, sede, año, agencia actual, permiso | Sección 7 «Books» | Respaldo: sección oculta (ninguna tarjeta tiene relación y permiso confirmados). El HTML anterior está guardado en `reserva/books.html` | Ver la tabla del punto 2 |
| Fecha exacta del ingreso de enero 2027 | Aplicar | Respaldo: «Próximo ingreso: enero.» y sin contador | Cambiar el texto de `.mas-apply__date` |
| Cupo por grupo | Aplicar | Respaldo: no se menciona cupo | — |
| URL del calendario de Ricardo | Aplicar | Respaldo: el link «¿Ya tienes el folleto? Agenda tu llamada →» no se muestra | Poner la URL en `CONFIG.calendarUrl` de `landing.js`. En GHL estaba `…/widget/booking/FR0Ug1vwpcicPsQ6erYP`: confirmar que es esa |
| Validez oficial | FAQ opcional | Respaldo: la pregunta no se agregó | — |
| Estudiar desde otro país | FAQ opcional | **Confirmado por Ricardo (2026-10-23):** «Estudia desde cualquier parte». Está en el hero y en la pregunta «¿Puedo estudiar desde otra ciudad o país?» | — |

## 2. Books (sección oculta)

Solo se muestran las tarjetas con relación con MAS y permiso confirmados (claim C-009). Hoy no hay ninguna.

| Nombre | Track | Relación con MAS | Hoy en | ¿Permiso? |
|---|---|---|---|---|
| Emmanuel Rocha | Copywriting | Maestro en MAS México | | |
| Antonio Fragoso | Copywriting | Maestro en MAS México | | |
| Fernando Carrión | Copywriting | | | |
| Jacky Salomé | Copywriting | | | |
| Sarah Cardona | Art Direction | | | |
| Xavi Ocaña | Art Direction | | | |
| Catarina Barcala | Art Direction | | | |
| Hanna Choi | Art Direction | | | |

Para mostrar la sección: copiar de `reserva/books.html` las tarjetas confirmadas y pegarlas en `landing.html` entre «Prácticas» y «Carreras creativas». También hacen falta la portada de cada book (P-06, 4:5 · 1000 × 1250 px) y su puesto actual (P-17).

## 3. Visuales oficiales

| Código | Qué falta | Dónde | Formato |
|---|---|---|---|
| P-01 | Logo oficial Miami Ad School México, versión para fondo negro. **Hoy hay uno provisional** (`img/logo-mas-300.png`): sirve para la prueba, pero en pantallas grandes se puede ver suave. | `.mas-brand__logo` | SVG |
| P-02 | ~~Imagen del hero~~ Ya no aplica: en el hero va el video. La foto del grafitero sigue en `img/` por si se usa después. | — | — |
| P-05 | ~~Key visual de Art Direction~~ **Resuelto** con foto de marca (sillón). | `.mas-board__tile--key` | Cuadrado, mínimo 640 px |
| — | ~~Imagen para compartir (OG)~~ **Lista:** `img/og-carrera-creativa.jpg`, con el hero de la V2. Falta subirla a GHL | Settings de la página en GHL | 1200 × 630 px |

No usar fotografía de stock de estudiantes sonriendo frente a una laptop.

**Fotos de marca en uso** (las mandó Ricardo; están en `img/`): Grad Show («Al graduarte», en «El Programa»), sillón (Art Direction) y gorra con la M (footer). Las del grafitero y el salto ya no se usan. **Confirmar** que Miami Ad School México tiene derechos para usarlas en una página de anuncios pagados, incluida la autorización de las personas que aparecen.

## 4. Prácticas profesionales

| Código | Qué falta | Dónde |
|---|---|---|
| P-16 | **Logos de agencias**: están los 29 que mandó Ricardo (`img/logos/`). Pendientes: el nombre completo de la agencia «CW» (hoy su `alt` dice solo «CW»); el SVG de Nu Creative Hub dice «nubank»: confirmar que es el logo que se quiere mostrar. | Sección «Dos agencias. 10 semanas en cada una.» · `.mas-logo` |
| P-16 | Confirmar que cada agencia del slider es de la red de prácticas de Miami Ad School (el pie dice «Agencias de la red de prácticas de Miami Ad School.», C-012) y que la red está de acuerdo en mostrar su logo | Misma sección |

## 5. Tipografías

| Código | Estado |
|---|---|
| P-13 | **Conectadas en GHL:** Obviously Narrow Bold y Medium, y Archivo (URLs en `ghl/medios.json`). Falta confirmar que la licencia de Obviously cubre uso web en `tufuturocreativo.com`. |
| P-13 | **Obviously Regular** (texto corrido, según el manual de marca) no está en Drive. Mientras no llegue, el texto usa Archivo. |

## 6. Claims (spec v2, sección 6)

Se usan solo estos, tal cual:

- «Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year, incluyendo 2025.» (C-002, exacta). Fuente: The Drum, 10 jul 2025, y miamiadschool.com.
- «Dos prácticas de 10 semanas, en dos agencias distintas de la red de Miami Ad School. Pueden ser presenciales u online.» (C-012)
- «Todo alumno que termina el primer año hace sus dos prácticas.» (C-012)
- «Agencias de la red de prácticas de Miami Ad School.» (C-012)
- Nombres en books y maestros solo con permiso confirmado (C-009).

No se usan: «La escuela más premiada del mundo» (C-006), «Ninguna otra escuela lo ha ganado tantas veces», «Las mejores agencias del mundo», cifras de colocación, salarios o empleo garantizado (C-003, C-008), ni cualquier dato que no esté en la spec.

**Agregados por Ricardo (2026-10-23), fuera de la spec:**

- «Nuestra misión», debajo del hero: es la misión oficial de Miami Ad School («To train the creative thinkers of the future before the future has happened…»), traducida por nosotros. Si la red tiene una versión oficial en español, se cambia por esa. Términos a confirmar: «insight creativo» (*creative insight*) y «oficio» (*craft*).
- El veredicto ahora dice «La industria creativa contrata evidencia.».
- Hero sin el sello «7 veces Future Lions School of the Year» (la frase del premio sigue en «Prueba») y sin el «México» junto al logo.
- El título de las carreras ahora es «Carreras creativas · 18 meses» / «Art Direction y Copywriting».
- El video va en el hero, en lugar de la foto del grafitero, con el botón «Ver el video · 3:30». «Prueba» queda solo con la frase del premio. **Falta subir a GHL** la portada (`img/vsl-poster-640.webp` y `img/vsl-poster-1280.webp`).
- La foto de la gorra va hasta abajo, en el footer, junto a «Miami Ad School México».
- «Problema» ya no lleva el título «La brecha no es tu talento.»: empieza directo con las líneas.
- Volvió la cinta fucsia que avanza con el scroll, justo debajo del hero (la spec la quitaba).
- «Nuestra misión» ahora es un título grande en fucsia.
- «El Programa» ahora dice «¿Cómo funciona nuestra Carrera Creativa de 18 meses?» («de 18 meses?» en fucsia).
- Las tarjetas de esa sección se reescribieron (2026-10-23): tres etapas de seis meses, cada una con «Terminas con:», y una tarjeta final con lo que te llevas. Solo usan datos ya confirmados. **Confirmar:** que las dos prácticas caen en los meses 13 a 18 (la tarjeta 3 dice «Etapa 3 · Meses 13 a 18»).
- **Para simplificar la landing (2026-10-23), Ricardo quitó:** la sección del premio («Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year…» y «En México formamos…»), el párrafo «Los alumnos aprenden…» de la misión, y toda la sección «Carreras creativas» (las tarjetas de Art Direction y Copywriting, sus botones y la nota «¿No sabes cuál?»). La info de cada carrera llega en el folleto, los correos automáticos y la llamada. También quitó «¿Es para ti?» (las dos listas y el cierre «Aquí nadie te promete una carrera. La construyes.»): el filtro se hace en la llamada y con el folleto. Con esto, **la página ya no menciona Future Lions** y la frase incompleta de Art Direction ya no aplica.
- Hero: «Online y en vivo · lunes a jueves, de 7 pm a 10 pm» y «Estudia desde cualquier parte». Nueva pregunta «¿Puedo estudiar desde otra ciudad o país?» (ahora son 9).
- **Logo pendiente (P-01):** Ricardo quiere arriba el M-dot junto al logotipo «MIAMI AD SCHOOL MÉXICO». Falta el archivo oficial (SVG o PNG con fondo transparente). Mientras tanto sigue el logo provisional.

**Para revisar con legal:** el texto del aviso de privacidad dice que solicitar información no confirma la práctica profesional, y la FAQ 4 dice «Las prácticas sí están aseguradas». Las dos cosas pueden ser ciertas (una habla de pedir información, la otra de terminar el primer año), pero conviene que el aviso no se lea como contradicción.

## 7. Políticas legales

Los textos del aviso de privacidad y de los términos están en el footer (`#aviso-privacidad`, `#terminos`), copiados tal cual de la página de GHL. Los links «Aviso de privacidad» y «Términos y condiciones» los despliegan. Si un día existen páginas propias, cambia el `href` por su URL.

## 8. Redes sociales del footer

| Código | Qué falta | Dónde |
|---|---|---|
| P-18 | URL del perfil de **Instagram** de Miami Ad School México | `href="REEMPLAZAR_URL_INSTAGRAM"` en el footer («Síguenos») |
| P-18 | URL de **TikTok** | `href="REEMPLAZAR_URL_TIKTOK"` |
| P-18 | URL de **YouTube** | `href="REEMPLAZAR_URL_YOUTUBE"` |
| P-18 | URL de **LinkedIn** | `href="REEMPLAZAR_URL_LINKEDIN"` |

Mientras una red diga `REEMPLAZAR`, el JS la esconde. Si ninguna tiene URL, no se ve «Síguenos». Se abren en una pestaña nueva.

## 9. Formulario de GHL

| Código | Qué falta |
|---|---|
| P-09 | En GHL: campos Nombre · Email · WhatsApp con código de país · Me interesa, y el botón «Enviarme el folleto» (README-GHL · paso 8) |
| P-09 | Que el campo «Me interesa» acepte `interes_programa` con los valores `Art Direction`, `Copywriting` y `Aún no sé` |
| P-09 | Redirección al enviar: `?paso=agenda#aplicar` |
| P-09 | Workflow que manda el folleto por correo |

## 10. Calendario de GHL

| Código | Qué falta |
|---|---|
| P-10 | **[VERIFICAR]** URL del calendario de Ricardo en `CONFIG.calendarUrl` |
| P-10 | Correo de confirmación con fecha, hora y enlace |
| P-10 | Redirección al agendar: `?paso=confirmado#aplicar` |

## 11. Medición: píxel nuevo de Meta y GA4

| Qué falta | Notas |
|---|---|
| ID del **píxel nuevo** de Meta | Instalar en el head de la página (README-GHL · paso 10) |
| ID de medición de **GA4** | Igual |
| Activar `TRACKING_ENABLED` en `landing.js` | Solo después de instalar los códigos base |
| CAPI para `Lead` y `Schedule` | Desde un workflow de GHL, con deduplicación por `eventID` |
| Prueba en Meta *Probar eventos* y GA4 *DebugView* | Antes de publicar |
