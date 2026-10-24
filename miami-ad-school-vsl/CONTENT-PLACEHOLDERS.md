# Pendientes antes de publicar

Todo lo que la landing necesita para salir. Cada código `P-xx` aparece en `landing.html` como `data-placeholder="P-xx"` o en un comentario `REEMPLAZAR`, para encontrarlo rápido con buscar.

**Regla:** nada de esta lista se rellena con datos supuestos. Si un dato no está validado, se queda con su texto de respaldo o el bloque no se muestra. Nunca se publica «[VERIFICAR]», «[DECIDIR]» ni corchetes visibles.

## 1. V3: datos pendientes y respaldo en uso

Viene de la sección 10 de `PROMPT-V3-META.md` (24 oct 2026). Mientras Ricardo no confirme un dato, la página usa el respaldo. Cuando lo confirme, se cambia en `landing.html` y se regenera el kit.

| # | Dato | Dónde se usa | Respaldo en uso | Cómo cambiarlo |
|---|---|---|---|---|
| 10.1 | Zona horaria del horario | Hero, «¿Cuánto dura?», «¿Puedo trabajar…?», «¿Otra ciudad o país?» | «de 7 pm a 10 pm», sin zona | Agregar la zona en el hero y en esas tres respuestas |
| 10.2 | ¿Inicio el 10 de enero de 2027? | Hero, «¿Cuándo empieza?», aplicar | «Inicios en enero, abril, julio y octubre» y «Próximo ingreso: enero.» | Hero: «Inicia el 10 de enero de 2027». FAQ: «El próximo inicio es el 10 de enero de 2027.». Aplicar: «Próximo inicio: 10 de enero de 2027». Si cabe, también al final de la descripción SEO |
| 10.3 | ¿Es licenciatura? ¿Qué documento se recibe? | FAQ «¿Es una licenciatura?» | La pregunta no está | Agregarla después de «¿Cuánto cuesta?» (texto en 6.11) |
| 10.4 | ¿Qué trae el PDF? | Microcopy del hero y texto de aplicar | «PDF gratis con el plan de estudios. Te llega a tu correo.» y «Recibe el folleto con el plan de estudios y las fechas.» | Ajustar si el PDF no trae fechas o trae más |
| 10.5 | ¿Prácticas en los meses 13 a 18? | Etapa 3 y «¿Cuánto dura?» | «Etapa 3 · Meses 13 a 18» (tres etapas de seis meses) | Si no, «Después del primer año» |
| 10.6 a 10.10 | Oferta Buen Fin: ¿real?, precio, IVA, mensualidades, becas, MacBook Neo, 20 lugares, condiciones escritas y a dónde lleva «Aparta tu lugar» | Barra de oferta, bloque de precio, FAQ | **Sin oferta y sin precio.** «¿Cuánto cuesta?» dice que la inversión se revisa en la llamada | Sección 7 del prompt, solo con todo confirmado por escrito |
| 10.11 | ¿Se puede decir «Future Lions de Cannes Lions»? | Sello del hero | Sin «Cannes» | Cambiar el texto de `.mas-seal__text` |
| 10.11b | ¿7 veces (hasta 2025) u 8 (con 2026)? | Sello y «¿Por qué Miami Ad School?» | 7 veces, incluyendo 2025 (C-002) | Cambiar el número del sello y la respuesta |
| 10.12 | Testimonios en video con permiso | Sección «Lo que dicen quienes ya lo hicieron» (6.9) | La sección no existe | Cortar los clips en Tella y armar la sección |
| 10.12b | 3 a 6 piezas de portafolio con permiso | «Así se ve un portafolio» (6.8) | La sección no existe | Reusar `reserva/books.html` |
| 10.12c | Maestros: nombre, puesto, agencia, foto y permiso | «Quién te corrige» (6.7) | La sección no existe | Ver el punto 2 |
| 10.12d | Fotos de clase con permiso | «¿Cómo funciona…?» | Sin fotos nuevas | |
| 10.13 | ¿Aclaración «no es copy de ventas»? | «Dos rutas» | No está | Agregar la línea de 6.3 |
| 10.14 | Calendario `5vsO5cFmjBZvURwoHY2s` | Aplicar | **En uso:** es el que está activo en GHL («Carrera Creativa · 30 minutos con Ricardo») | Si cambia, `CONFIG.calendarUrl` |
| 10.15 | Logo oficial y redes | Header y footer | Logo provisional; redes ocultas | P-01 y P-18 |

**«Me interesa» en GHL:** las opciones deben cambiar a `Copywriter`, `Director de Arte` y `Aún no sé` (README-GHL · paso 8). Mientras digan «Art Direction» y «Copywriting», los botones de «Dos rutas» bajan al formulario pero no lo dejan marcado.

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
| P-02 | ~~Imagen del hero~~ Ya no aplica: en el hero va el video. | | |
| OG | **Lista:** `img/og-carrera-creativa-v3.jpg`, con el hero de la V3. **Falta subirla a GHL** y ponerla en Settings → SEO | Settings de la página en GHL | 1200 × 630 px |

No usar fotografía de stock de estudiantes sonriendo frente a una laptop.

**Fotos de marca en uso** (las mandó Ricardo; están en `img/`): Grad Show (última tarjeta de «¿Cómo funciona…?») y gorra con la M (footer). Las del grafitero, el sillón y el salto ya no se usan. **Confirmar** que Miami Ad School México tiene derechos para usarlas en una página de anuncios pagados, incluida la autorización de las personas que aparecen.

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
- Nombres en books, testimonios y maestros solo con permiso confirmado (C-009).

En la V3, C-002 vuelve a la página en dos lugares: el **sello del hero** («7 · veces Future Lions School of the Year, incluyendo 2025») y la respuesta de **«¿Por qué Miami Ad School?»** (frase exacta).

No se usan: «La escuela más premiada del mundo» (C-006), «Ninguna otra escuela lo ha ganado tantas veces», «Las mejores agencias del mundo», cifras de colocación, salarios o empleo garantizado (C-003, C-008), ni cualquier dato que no esté en la spec.

**V3 (24 oct 2026, `PROMPT-V3-META.md`):**

- Hero: sello C-002, «Carrera Creativa · 18 meses», titular «Conviértete en Copywriter o Director de Arte.», línea de marca «Tu título no te consigue el mejor trabajo. Tu portafolio sí.», subtítulo de prácticas, tres datos y «PDF gratis con el plan de estudios. Te llega a tu correo.» bajo el botón.
- Se quitó «Nuestra misión». En su lugar va «Dos rutas: Copywriter o Director de Arte», con un botón por ruta que prellena «Me interesa».
- Sin jerga: «book» pasa a «portafolio»; «brief» se explica la primera vez («el encargo de la marca»); «insight» y «feedback» salen. En inglés solo quedan «Copywriter» (es el nombre del puesto y se busca 2,900 veces al mes) y «Future Lions School of the Year» (nombre del reconocimiento).
- «Problema» suma «O vienes de otra carrera y sabes que lo tuyo es crear.».
- Preguntas nuevas: «¿Cuánto dura?», «¿Cuándo empieza?», «¿Por qué Miami Ad School?». Salió «¿Cómo funcionan las prácticas profesionales?» (ya está en la página). Son 11.
- Barra fija «Recibe el folleto» en celular (`sticky-folleto`).
- Footer: «Copywriting y Dirección de Arte».

**Agregados por Ricardo (2026-10-23), fuera de la spec** (historia de la V2; lo que cambió en la V3 está arriba):

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
- **Para simplificar la landing (2026-10-23), Ricardo quitó:** la sección del premio («Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year…» y «En México formamos…»), el párrafo «Los alumnos aprenden…» de la misión, y toda la sección «Carreras creativas» (las tarjetas de Art Direction y Copywriting, sus botones y la nota «¿No sabes cuál?»). La info de cada carrera llega en el folleto, los correos automáticos y la llamada. También quitó «¿Es para ti?» (las dos listas y el cierre «Aquí nadie te promete una carrera. La construyes.»): el filtro se hace en la llamada y con el folleto.
- Botones «Recibe el folleto» (todos a `#aplicar`, con `data-cta` para medir cuál funciona): `hero-folleto`, `como-funciona-folleto`, `practicas-folleto` y `footer-folleto`. La spec pedía el hero sin botón; Ricardo pidió agregarlos. Con esto, **la página ya no menciona Future Lions** y la frase incompleta de Art Direction ya no aplica.
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
| P-09 | Opciones de «Me interesa» (`interes_programa`): `Copywriter`, `Director de Arte` y `Aún no sé` (README-GHL · paso 8) |
| P-09 | 6 campos ocultos: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid` |
| P-09 | Botón «Enviarme el folleto» y redirección al enviar: `?paso=agenda#aplicar` |
| P-09 | Workflow que manda el folleto por correo |
| P-09 | Probar en GHL el formulario en `loading="lazy"` (en vivo estaba en `eager`) |

## 10. Calendario de GHL

| Código | Estado |
|---|---|
| P-10 | **En uso:** `CONFIG.calendarUrl` = `…/widget/booking/5vsO5cFmjBZvURwoHY2s`. Aparece dentro de la página en `?paso=agenda` |
| P-10 | Falta: correo de confirmación con fecha, hora y enlace; redirección al agendar a `?paso=confirmado#aplicar` |

## 11. Medición con Meta

| Estado | Notas |
|---|---|
| **Encendida** (`TRACKING_ENABLED = true`) | Usa el píxel que ya está en la página (`1349923403740237`); la landing no instala ninguno |
| `Lead` y `Schedule` | Eventos estándar con `eventID`, una vez por sesión (README-GHL · paso 10) |
| Falta | Probar en Meta *Probar eventos*; confirmar que GHL no mande otro `Lead`; dominio verificado y `Lead` como evento prioritario |
| Fase 2 | CAPI desde un workflow de GHL; GA4 si se decide instalarlo |
