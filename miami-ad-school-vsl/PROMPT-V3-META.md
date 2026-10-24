# Landing Carrera Creativa V3 · Prompt final antes de Meta Ads

Versión final (24 oct 2026). Junta mi auditoría de conversión, la revisión de la página en vivo y lo que sirve de la auditoría de Grok (sección 3). Es para quien haga los cambios (Claude o Codex): léelo completo y ejecuta en el orden de la sección 11.

- **Página en vivo:** `https://tufuturocreativo.com/carrera-creativa` (kit `51e508f4`, con cambios hechos directo en GHL: ver P0-5).
- **Código:** rama `claude/landing-v2` de `miamiadschoolmx/miamiadschoolmx`, carpeta `miami-ad-school-vsl/`. Nunca se edita GHL a mano: se cambia el repo y se regenera el kit (`python3 tools/ghl-kit.py`).

---

## 1. Decisiones ya tomadas

1. **Anuncios y landing hablan del rol, no de la escuela:** «Conviértete en Copywriter o Director de Arte».
2. **Nombres en español:** «Copywriter» y «Director de Arte» en titulares, botones, eyebrow y footer. «Art Direction» ya no aparece.
3. **El video actual se queda** hasta que Ricardo grabe uno nuevo con el guion de la sección 9. Mientras tanto, ni el video ni sus frases se usan en anuncios.
4. **Para el tráfico frío, el paso principal sigue siendo «Recibe el folleto»** (poco compromiso). La oferta Buen Fin, si se confirma, entra como urgencia real y como segunda opción para quien ya está decidido (sección 7).

### Por qué estas palabras (búsquedas al mes en México)

| Término | Búsquedas | Uso |
|---|---|---|
| copywriter / copywriting | 2,900 | Palabra principal. Aclarar que es copywriter **publicitario**: mucha gente busca «copywriting» para copy de ventas. |
| creatividad publicitaria | 880 | Apoyo: descripción, FAQ y anuncios. |
| director de arte | 320 | En español. Aclarar que es **publicitario** (también existe en cine y TV). |
| carrera en publicidad | 210 | Apoyo. Obliga a contestar «¿es licenciatura?». |

---

## 2. Diagnóstico final

### Lo que ya funciona (no tocar)
- Carga rápida (TTFB de 0.07 a 0.11 s según Grok; 2 a 3 s de carga completa en celular), sin errores, sin scroll horizontal, accesible.
- Un solo objetivo con 4 botones; formulario de GHL integrado; folleto solo después de enviar; calendario activo.
- Propuesta honesta: 18 meses, online y en vivo, lunes a jueves de 7 a 10 pm, dos prácticas de 10 semanas, sin promesa de empleo.
- «La industria creativa contrata evidencia.» y «¿Cómo funciona…?» con «Terminas con».

### P0 · Bloqueadores: resolver antes de prender campañas

| # | Qué pasa | Por qué importa | Qué hacer |
|---|---|---|---|
| P0-1 | **El video contradice la página.** Dice «12 meses» y una práctica, contra 18 meses y dos prácticas. Trae claims prohibidos («la escuela más premiada del mundo», «las mejores agencias del mundo», «te va a conseguir trabajo») y datos sin verificar (maestros con Netflix o Nike, «12 sedes»). Pide «agenda una llamada de 10 minutos». | Es lo primero que ve el tráfico frío. | Decidido: se queda hasta el video nuevo (sección 9). Ya: corregir en Tella el título («MIAMI Venta_Mad_02») y la descripción («12 meses»). |
| P0-2 | **El evento Lead no se envía.** El píxel `1349923403740237` está instalado (solo PageView); la medición de la landing está apagada (`TRACKING_ENABLED = false`). | Sin Lead, Meta no optimiza por folletos ni sabe qué anuncio funciona. | Sección 8.1. |
| P0-3 | **Los UTM y el `fbclid` no llegan a GHL**: el formulario es un iframe con URL fija. | No sabrás qué campaña o creativo trae cada lead. | Sección 8.2. |
| P0-4 | **El hero no repite el anuncio.** | Si en 2 segundos no reconoce la promesa, se va y el clic sale más caro. | Sección 6.1. |
| P0-5 | **GHL y el repo ya no son iguales.** En vivo hay cosas que el repo no tiene: `calendarUrl` es `…/widget/booking/5vsO5cFmjBZvURwoHY2s` (no el que se había dado a Codex); las URLs de la portada del video ya son de GHL; el formulario está en `loading="eager"` (el repo dice `lazy`); y en el paso «Tu folleto ya está listo» hay **un calendario incrustado de 600 px**, con un comentario que dice «Google Calendar». | El próximo pegado del kit borra el calendario y la portada. Además, ese calendario se carga en cada visita aunque esté oculto: pesa en la velocidad. | Sección 8.3. |

### P1 · Alto impacto en conversión

| # | Qué pasa | Qué hacer |
|---|---|---|
| P1-1 | No se explica qué hace un Copywriter ni un Director de Arte. | Bloque «Dos rutas» (6.3). |
| P1-2 | «Nuestra misión» ocupa el segundo lugar con voz de escuela y no vende. | **Quitarla** (Grok y yo coincidimos). |
| P1-3 | Ninguna prueba externa: «Future Lions» no aparece en ninguna parte. | Sello C-002 en el hero y respuesta en FAQ (6.1, 6.9). Testimonios solo con permiso (6.7). |
| P1-4 | Jerga: «book», «brief», «insight», «feedback». | «Portafolio» y definiciones la primera vez (6.5). |
| P1-5 | En celular, la primera pantalla no tiene el botón del folleto. | Barra fija en celular (8.4). |
| P1-6 | «Recibe el folleto» no dice qué trae. | Microcopy bajo el botón y bloque de aplicar más concreto (6.1, 6.10). |
| P1-7 | «Carrera» y «Tu título…» hacen preguntar «¿da título?». | FAQ «¿Es una licenciatura?» (6.9). |
| P1-8 | «Problema» solo habla a quien estudió algo creativo. | Línea para quien viene de otra carrera (6.4). |
| P1-9 | «Desde cualquier parte» sin zona horaria. | **[VERIFICAR]** |
| P1-10 | Fechas vagas («enero, abril, julio y octubre»; «Próximo ingreso: enero.»). | **[VERIFICAR]** «10 de enero de 2027» (Grok lo da como fecha; antes Ricardo había confirmado los días 10). |
| P1-11 | Precio oculto, sin ninguna referencia. | **[DECIDIR]** Precio y oferta (sección 7). |

### P2 · Pulido
- «¿Cómo funciona…?» mide 2,557 px en celular: recortar textos, no etapas.
- SEO: title, descripción, canonical y JSON-LD `Course` (8.6).
- Imagen para compartir (OG) nueva con el hero V3.
- Logo oficial (P-01), redes del footer (P-18), «Meses 13 a 18» (confirmar).
- **Para los anuncios:** la guía de copy de MAS trae datos no verificados («8x School of the Year», «98 % de colocación», «20,000 egresados», «5,000 mentores», «100+ agencias», Quarter Away, casos con puestos, precios). Lo único verificado es la frase C-002.

---

## 3. Qué tomé de la auditoría de Grok y qué no

| Recomendación de Grok | Decisión | Por qué |
|---|---|---|
| Nombres en español (copywriter, director de arte) en eyebrow, textos y footer | **Sí** | Coincide con las búsquedas y con la decisión 1.2. |
| Title «Carrera de Copywriter y Director de Arte \| Miami Ad School México» | **Sí** | Mejor que el actual para buscadores y para la pestaña. |
| Meta description con palabras clave | **Sí, ajustada** | Ver 8.6. La fecha solo si se confirma. |
| Canonical a `/carrera-creativa` | **Sí** | Barato y correcto. |
| Volver a poner la prueba de Cannes arriba del pliegue | **Sí, con la redacción aprobada** | El texto de Grok («Escuela del Año en Cannes Lions. Hemos ganado 7 veces.») no es la frase aprobada C-002, usa la voz de escuela y exagera (el reconocimiento es **Future Lions** School of the Year). Va la frase C-002 o su forma corta «7 veces Future Lions School of the Year». Decir «de Cannes Lions» es **[VERIFICAR]**. |
| Fecha exacta «10 de enero de 2027» | **Sí, si Ricardo la confirma** | Respaldo: la frase actual. |
| Publicar precio ($10,000 de inscripción, $12,760 de mensualidad) | **Sí, si Ricardo lo confirma** | Para tráfico frío, el precio filtra y da confianza. Falta confirmar si incluye IVA, cuántas mensualidades y si hay becas. |
| Oferta Buen Fin con MacBook Neo, 20 lugares, cierre el martes 17 a las 11:59 pm | **Sí, si todo es real y hay condiciones escritas** | Es urgencia real, la mejor razón para actuar ya. Pero los 20 lugares deben ser reales (si no, es cupo falso), hace falta una página o PDF de condiciones (PROFECO) y la barra debe desaparecer sola al cerrar. Ver sección 7. |
| CTA principal «Aparta tu lugar con MacBook Neo» | **Parcial** | Al tráfico frío casi nadie le paga $10,000 en su primera visita. Principal: «Recibe el folleto». Secundario, solo durante la oferta: «Aparta tu lugar». Falta definir a dónde lleva (7.4). |
| Quitar «Nuestra misión» | **Sí** | No vende y es voz de escuela. |
| Sección «Dos rutas: copywriter o director de arte» | **Sí** | Es mi P1-1. |
| Testimonios de alumnos con nombre | **Sí, solo con permiso por escrito (C-009)** | Nunca se publican los marcadores «[TESTIMONIO]». Sin permisos, la sección no se crea. |
| FAQ: duración, inicio, precio, oferta, licenciatura, respuestas autocontenidas | **Sí** | Resuelven objeciones reales. Las respuestas de oferta y licenciatura son **[VERIFICAR]**. |
| Calendario (booking) que carga siempre | **Sí** | Confirmado en vivo: el iframe de booking oculto se carga en cada visita. Se crea solo al llegar al paso del folleto (8.3). |
| Formulario en `loading="eager"` | **Sí, volver a `lazy`** | Lo cambiaron en GHL. Se regresa a `lazy` y se prueba; si algo falla, se documenta por qué. |
| «Comentario HTML roto visible en la sección de agencias» | **No** | Falso positivo. En un navegador real el texto no se ve: Grok sacó el texto del HTML con curl y el comentario contiene etiquetas. Aun así, el kit va a quitar los comentarios del bloque 1 (8.5). |
| H1 «…con un book que **consigue trabajo**» | **No** | Es promesa de empleo: contradice la FAQ «¿Me garantizan empleo? No» y los claims C-003 y C-008. |
| «Aquí aprendes con el mismo método que llevó a la escuela a ese reconocimiento» | **No** | Relación causal no verificada. |
| H2 «Por qué tu book no te consigue trabajo» y frases con keywords («Las agencias contratan creatividad publicitaria con evidencia») | **No** | Ricardo quitó a propósito el título de «Problema». Meter keywords así se lee forzado y el tráfico de Meta no viene de Google. |
| Cambiar «¿Cómo funciona nuestra Carrera Creativa de 18 meses?» por «…la carrera en publicidad…» | **No** | Es título de Ricardo y ya es claro. |
| «H1 partido en spans» | **No** | Un `<h1>` con `<span>` adentro es un solo H1: no afecta SEO. |
| Cambiar `alt=""` y alargar los `alt` de los logos | **No** | La portada del video está dentro de un botón con etiqueta propia y la foto del footer es decorativa: `alt=""` es lo correcto. Los logos ya dicen el nombre de la agencia; agregar «agencia de prácticas de…» en cada uno es relleno. |
| JSON-LD `FAQPage` para resultados enriquecidos | **No por ahora** | Google ya casi no muestra resultados enriquecidos de FAQ para sitios así. Sí `Course` con datos confirmados (8.6). |
| «Claves de Stripe y reCAPTCHA embebidas» | **No es problema** | Son claves públicas por diseño. |
| Enlaces internos desde la home y el blog | **Después** | Fuera de esta landing. Buena idea para SEO. |

---

## 4. Reglas

1. Conserva el diseño: tipografías, colores, componentes, cinta, slider de logos, imágenes y el video actual. Cambias estructura y textos.
2. Los textos de la sección 6 se usan **tal cual** cuando Ricardo los apruebe. No inventes cifras, nombres, fechas ni testimonios.
3. **[VERIFICAR]** y **[DECIDIR]** se resuelven con la tabla de la sección 10; si no hay dato, se usa el respaldo o se oculta el bloque. Nunca se publican corchetes ni marcadores.
4. Sin raya larga en ningún texto.
5. Habla del rol, no de la escuela. Ningún titular empieza con «Somos», «Nuestro» ni «Miami Ad School».
6. Prohibido: «la escuela más premiada», «las mejores agencias del mundo», promesas o cifras de empleo, salarios, cupos o contadores falsos, testimonios sin permiso.
7. Urgencia **solo si es real**: fecha de cierre y número de lugares confirmados por Ricardo, con condiciones publicadas.
8. No toques píxeles ni scripts de medición existentes; la medición se activa como dice 8.1.
9. Nada se publica en `/carrera-creativa` sin el OK de Ricardo: primero en `/pruebaoct`.

---

## 5. Estructura V3

| # | Sección | Trabajo | Estado |
|---|---|---|---|
| 0 | Barra de oferta | Urgencia real (solo durante el Buen Fin) | **Nueva, condicional** |
| 1 | Hero | Repite el anuncio, dice qué es, da prueba y siguiente paso | **Cambia** |
| 2 | Cinta | Palabras clave en movimiento | Textos nuevos |
| 3 | Dos rutas | Qué hace un Copywriter y un Director de Arte | **Nueva** |
| 4 | Problema + veredicto | Identificación y tensión | Una línea nueva |
| 5 | ¿Cómo funciona…? | Camino de 18 meses y qué te llevas | Sin jerga |
| 6 | Prácticas | Diferenciador | Igual |
| 7 | Alumnos | Prueba social | **Condicional** (permisos) |
| 8 | Precio y oferta | Precio claro y condiciones | **Condicional** |
| 9 | Preguntas | Objeciones | Reordenar y agregar |
| 10 | Recibe el folleto | Formulario | Textos concretos |
| 11 | Footer | Cierre y legales | En español |
| + | Barra fija en celular | Botón siempre a mano | **Nueva** |
| x | Nuestra misión | | **Se quita** |

---

## 6. Textos finales (propuesta para aprobar)

### 6.1 Hero
- **Eyebrow:** `Carrera Creativa · Copywriting y Dirección de Arte`
- **H1:** `Conviértete en Copywriter o Director de Arte.`
- **Línea de marca** (con la pluma alrededor de «portafolio»): `Tu título no te consigue el mejor trabajo. Tu portafolio sí.`
- **Subtítulo:** `18 meses online y en vivo, con dos prácticas de 10 semanas en agencias de la red de Miami Ad School.`
- **Datos:**
  - `7 veces Future Lions School of the Year` (forma corta de C-002)
  - `Lunes a jueves, de 7 pm a 10 pm [zona horaria]` **[VERIFICAR]**
  - `Online y en vivo, desde cualquier parte`
  - `Inicia el 10 de enero de 2027` **[VERIFICAR]** (respaldo: `Inicios en enero, abril, julio y octubre`)
- **Botón principal:** `Recibe el folleto`
- **Microcopy bajo el botón:** `PDF gratis con el plan de estudios. Te llega a tu correo.` (ajustar a lo que de verdad trae el PDF: **[VERIFICAR]**)
- **Secundario, solo durante la oferta:** enlace `Aparta tu lugar con la oferta Buen Fin →`
- **Video:** el actual.

### 6.2 Cinta
`Copywriter • Director de Arte • 18 meses • Online y en vivo • Dos prácticas en agencias • Tu portafolio •`

### 6.3 Dos rutas (nueva, después de la cinta)
- **Título:** `Dos rutas: Copywriter o Director de Arte`
- **Copywriter:** `Piensa la idea de una campaña y la escribe: conceptos, titulares, guiones y la voz de una marca.`
- **Director de Arte:** `Piensa la idea de una campaña y la hace visible: imagen, tipografía, color y composición.`
- **Cierre:** `Trabajan en dupla, como en una agencia. En la Carrera eliges una ruta. ¿No sabes cuál? Elige «Aún no sé» en el formulario.`
- **[DECIDIR]** Aclaración para quien llega por «copywriting»: `Es copywriting publicitario: escribes las ideas de las campañas, no solo textos para vender.`

### 6.4 Problema
- La primera línea pasa a: `Estudiaste diseño, comunicación, publicidad, marketing o cine. O vienes de otra carrera y sabes que lo tuyo es crear.`
- Lo demás queda igual, **sin título** (decisión de Ricardo).

### 6.5 ¿Cómo funciona nuestra Carrera Creativa de 18 meses?
- **Intro:** `Tu trabajo todavía no demuestra cómo piensas. Aquí lo cambias en tres etapas de seis meses: aprendes a crear ideas, las pones a prueba y las llevas a una agencia.`
- **Etapa 1:** `Lees el encargo de la marca (el brief), encuentras qué le importa a la gente y lo conviertes en una idea de campaña, como Copywriter o como Director de Arte.` · Terminas con: igual.
- **Etapa 2:** `Presentas tus ideas en clase, en vivo, recibes correcciones directas y las rehaces hasta que funcionan.` · Terminas con: `un portafolio en proceso, listo para ponerse a prueba en una agencia.`
- **Etapa 3:** igual (C-012). Etiqueta `Meses 13 a 18` **[VERIFICAR]** (respaldo: `Después del primer año`).
- **Final:** `Un portafolio corto y filoso.` · `Tus mejores campañas, no todo lo que hiciste.` · Lista: `Un portafolio profesional como Copywriter o como Director de Arte.` / `Dos prácticas de 10 semanas en agencias de la red de Miami Ad School.` / `Criterio para presentar y defender tus ideas frente a una agencia.`
- Recortar cada texto a dos líneas en celular.

### 6.6 Prácticas
Igual. «book» pasa a «portafolio».

### 6.7 Alumnos (condicional)
- **Título:** `Lo que dicen quienes ya lo hicieron`
- 1 a 3 tarjetas: nombre, foto, ruta (Copywriter o Director de Arte), una cita corta y, si hay permiso, la agencia de prácticas o el puesto actual. **Con permiso por escrito (C-009).** Candidatos: los exalumnos del video actual.
- Respaldo: la sección no se crea.

### 6.8 Precio y oferta (condicional, sección 7)

### 6.9 Preguntas frecuentes (orden nuevo)
Respuestas de 1 a 3 frases que empiezan por la respuesta.
1. `¿Cuánto dura?` · `18 meses, online y en vivo, de lunes a jueves de 7 pm a 10 pm. El primer año son clases; después haces dos prácticas de 10 semanas en agencias.` (la segunda frase, **[VERIFICAR]** con la etapa 3)
2. `¿Cuándo empieza?` · `El próximo inicio es el 10 de enero de 2027.` **[VERIFICAR]** (respaldo: `Hay inicios en enero, abril, julio y octubre.`)
3. `¿Cuánto cuesta?` · según la sección 7 (respaldo: la respuesta actual).
4. `¿Cómo funciona la oferta Buen Fin?` · solo si la oferta está activa (7.3).
5. `¿Es una licenciatura?` · `No. Es una carrera práctica de 18 meses para salir con un portafolio profesional como Copywriter o Director de Arte. Al terminar recibes [documento].` **[VERIFICAR]** (respaldo: no agregarla).
6. `¿Necesito tener portafolio?` (igual)
7. `¿Necesito haber estudiado algo o tener experiencia?` (igual)
8. `¿Puedo trabajar y estudiar al mismo tiempo?` (igual + zona horaria)
9. `¿Puedo estudiar desde otra ciudad o país?` (igual + zona horaria)
10. `¿Me garantizan empleo?` (igual)
11. `¿Por qué Miami Ad School?` · `Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year, incluyendo 2025.` (C-002 exacta)
12. `¿Qué pasa después de dejar mis datos?` (igual)

Se quita `¿Cómo funcionan las prácticas?` (ya está en la página) y `¿Y si ya sé usar Adobe, Canva o IA?` pasa al final o sale. **[DECIDIR]**

### 6.10 Recibe el folleto
- **Título:** `Tu título dice qué estudiaste. Tu portafolio muestra qué puedes hacer.`
- **Texto:** `Recibe el folleto con el plan de estudios y las fechas. Si quieres, después agenda 30 minutos con Ricardo.` (ajustar al contenido real del PDF)
- **Fecha:** `Próximo inicio: 10 de enero de 2027` **[VERIFICAR]** (respaldo: `Próximo ingreso: enero.`)
- Pasos: igual.

### 6.11 Footer
`Miami Ad School México · Carrera Creativa · Copywriting y Dirección de Arte · Online en vivo · 18 meses`

---

## 7. Precio y oferta Buen Fin (módulo condicional)

Solo se publica si Ricardo confirma **todo** lo de la tabla 10 (filas 10.6 a 10.10).

### 7.1 Barra de oferta (arriba del hero)
`Buen Fin, del 13 al 17 de noviembre: aparta tu lugar con la inscripción, paga tu primera mensualidad en enero y llévate una MacBook Neo. Hasta 20 lugares. Cierra el martes 17 a las 11:59 pm, hora del centro de México.` + enlace `Ver condiciones`.

### 7.2 Bloque de precio (antes de las preguntas)
- **Título:** `Precio y oferta Buen Fin`
- `Inscripción: $10,000 MXN. Mensualidad: $12,760 MXN.` (+ IVA o IVA incluido, número de mensualidades y becas, según 10.7)
- Texto de la oferta como en 7.1, más: `La MacBook Neo se entrega el 15 de enero de 2027, ya pagada la primera mensualidad.`
- Botón: `Aparta tu lugar` · enlace `Ver condiciones`.

### 7.3 FAQ de la oferta
`Aplica para hasta 20 lugares apartados del 13 al martes 17 de noviembre a las 11:59 pm, hora del centro de México. La MacBook Neo se entrega el 15 de enero de 2027, ya pagada la primera mensualidad. Consulta las condiciones.`

### 7.4 Comportamiento
- Fechas en `CONFIG.promo`: inicio `2026-11-13T00:00` y fin `2026-11-17T23:59`, hora de la Ciudad de México. Antes del inicio no se ve nada; después del fin la barra, el botón «Aparta tu lugar» y la FAQ de la oferta se ocultan solos. El precio regular puede quedarse si Ricardo lo decide.
- **[DECIDIR]** A dónde lleva «Aparta tu lugar»:
  - **A:** link de pago de GHL por la inscripción. Medir `InitiateCheckout` y `Purchase`.
  - **B:** el calendario con Ricardo («aparta en la llamada»).
  - **C:** WhatsApp.
  - Recomendado: A si existe el link de pago con condiciones; si no, B.
- **[DECIDIR]** Contador hasta el cierre del 17 de noviembre: permitido porque la fecha es real; opcional.
- **Legales:** página o PDF de condiciones (vigencia, lugares, entrega, cancelación y reembolso) y actualizar el aviso de privacidad si se cobran pagos.
- Sin respuesta de Ricardo: no hay barra, no hay bloque de oferta y el precio queda como hoy.

---

## 8. Técnico y medición

### 8.1 Activar la medición (P0-2)
- El píxel ya está (`1349923403740237`): no instalar otro.
- `TRACKING_ENABLED = true` en `landing.js`. Eventos estándar con `eventID`:
  - `Lead` en `?paso=agenda` (una vez por sesión).
  - `Schedule` en `?paso=confirmado`.
  - `InitiateCheckout` en «Aparta tu lugar» (si es link de pago).
- Personalizados: `cta_click` (con el nombre del botón), `vsl_play`, `brochure_download`, `calendar_click`.
- Comprobar que GHL no mande otro `Lead` por su cuenta. Meta: dominio verificado y `Lead` como evento prioritario. Probar en **Probar eventos**.
- CAPI (fase 2): workflow de GHL con el mismo `eventID`.

### 8.2 UTM y `fbclid` hasta GHL (P0-3)
- Copiar de la URL de la página al `src` del iframe del formulario: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` y `fbclid`, igual que hoy con `interes_programa`.
- En el formulario de GHL: campos ocultos con esas claves.
- Prueba: abrir con `?utm_campaign=prueba`, enviar y ver el dato en el contacto.

### 8.3 Sincronizar el repo con GHL (P0-5)
1. `calendarUrl: 'https://api.leadconnectorhq.com/widget/booking/5vsO5cFmjBZvURwoHY2s'` en `landing.js` (confirmar con Ricardo que es su calendario).
2. URLs de GHL de `vsl-poster-640.webp`, `vsl-poster-1280.webp` y `og-carrera-creativa.jpg` a `ghl/medios.json`. Se sacan de la página en vivo.
3. **Calendario incrustado:** el JS lo crea solo al llegar al paso del folleto (`?paso=agenda`) con `CONFIG.calendarUrl`, igual que el botón del folleto. Así no se carga en cada visita. Quitar el iframe y el comentario «Google Calendar» que pegaron a mano.
4. Formulario: volver a `loading="lazy"` y probar en GHL (abrir desde un botón, en celular y escritorio). Si no carga, documentar por qué y dejar `eager`.
5. Regenerar el kit, pegar los 3 bloques en `/pruebaoct` y verificar con `?revisar=1`.

### 8.4 Barra fija en celular (P1-5)
- Menos de 48em: barra abajo con `Recibe el folleto` (`data-cta="sticky-folleto"`).
- Aparece al pasar el hero y se oculta cuando `#aplicar` está en pantalla. Respeta el área segura del iPhone.

### 8.5 Kit sin comentarios
`tools/ghl-kit.py` quita los comentarios HTML del bloque 1 (pesa menos y no confunde a herramientas que leen el HTML). En `landing.html` se quedan.

### 8.6 SEO (en Settings → SEO de GHL o en el `<head>`)
- **Title:** `Carrera de Copywriter y Director de Arte | Miami Ad School México`
- **Description:** `Conviértete en copywriter o director de arte publicitario: 18 meses online y en vivo, con dos prácticas de 10 semanas en agencias de la red Miami Ad School.` (+ `Inicia el 10 de enero de 2027.` si se confirma y cabe)
- **Canonical:** `https://tufuturocreativo.com/carrera-creativa`
- **JSON-LD `Course`:** nombre, descripción, `provider` Miami Ad School México, `inLanguage` es-MX, `courseMode` online. `startDate`, horario y `offers` solo con datos confirmados.
- OG nuevo con el hero V3.

### 8.7 Calidad
Sin raya larga, sin corchetes, 375 px sin scroll horizontal, Lighthouse móvil ≥ 90 (correr PageSpeed Insights en la URL real), cero errores de accesibilidad, `?revisar=1` con 0 por resolver.

---

## 9. Video nuevo (brief para cuando Ricardo grabe)

- **Duración:** 60 a 90 s. 16:9 para la landing; 4:5 y 9:16 para anuncios. Subtítulos quemados.
- **Guion base** (solo datos confirmados):
  1. `¿Quieres ser Copywriter o Director de Arte? Tu título no te va a abrir la puerta. Tu portafolio sí.`
  2. `Soy Ricardo Ampudia, de Miami Ad School México.`
  3. `La Carrera Creativa dura 18 meses, online y en vivo, de lunes a jueves de 7 a 10 de la noche. Aprendes a crear ideas de campaña, presentas, te corrigen y rehaces, hasta tener un portafolio profesional.`
  4. `Al terminar el primer año haces dos prácticas de 10 semanas, en dos agencias distintas de nuestra red.`
  5. `Nadie te promete un trabajo. Lo que te llevas es un portafolio que demuestra cómo piensas.`
  6. `Deja tus datos y te mando el plan de estudios a tu correo.` (durante el Buen Fin, se puede sumar la oferta con sus condiciones)
- **No decir:** «la escuela más premiada», «12 meses», «en un año», «las mejores agencias del mundo», «te va a conseguir trabajo», marcas o premios de maestros sin verificar, «12 sedes», «agenda una llamada de 10 minutos».
- Testimonios: solo con permiso y sin promesas de empleo.

---

## 10. Datos que necesito de Ricardo

| # | Dato | Para qué | Respaldo si no llega |
|---|---|---|---|
| 10.1 | Zona horaria del horario | Hero y FAQ | «de 7 pm a 10 pm» sin zona |
| 10.2 | ¿Inicio el 10 de enero de 2027? | Hero, FAQ, aplicar | «Inicios en enero, abril, julio y octubre» |
| 10.3 | ¿Es licenciatura? ¿Qué documento recibe? | FAQ 5 | No agregarla |
| 10.4 | ¿Qué trae el PDF? | Microcopy y aplicar | «Recibe el folleto» sin detalle |
| 10.5 | ¿Prácticas en los meses 13 a 18? | Etapa 3 y FAQ 1 | «Después del primer año» |
| 10.6 | ¿La oferta Buen Fin es real y aprobada? | Sección 7 | Sin oferta |
| 10.7 | Precio: ¿$10,000 + $12,760? ¿IVA incluido? ¿Cuántas mensualidades? ¿Becas? | Sección 7 y FAQ 3 | Respuesta actual |
| 10.8 | ¿«MacBook Neo» es el nombre exacto del modelo? ¿Entrega el 15 de enero? | Oferta | Sin oferta |
| 10.9 | ¿20 lugares reales para la oferta? | Oferta | Sin número de lugares |
| 10.10 | Condiciones escritas (link o PDF) y a dónde lleva «Aparta tu lugar» (A, B o C) | Oferta | Sin oferta |
| 10.11 | ¿Se puede decir «Future Lions de Cannes Lions»? | Sello | Frase C-002 sin «Cannes» |
| 10.12 | Testimonios con permiso | Sección Alumnos | No crear la sección |
| 10.13 | ¿Aclaración «no es copy de ventas»? | Dos rutas | No ponerla |
| 10.14 | ¿El calendario `5vsO5cFmjBZvURwoHY2s` es el tuyo? | Sincronizar | Dejar el link oculto |
| 10.15 | Logo oficial y redes | Header y footer | Como hoy |

---

## 11. Orden de trabajo

1. **P0-5 y 8.5:** sincronizar el repo con GHL; kit sin comentarios.
2. **P0-2 y P0-3:** medición y UTM. Se prueban antes de cambiar textos.
3. **P0-4 y P1:** hero, dos rutas, quitar misión, problema, jerga, barra fija, FAQ y aplicar.
4. **Sección 7:** oferta y precio, solo con lo confirmado.
5. **P2 y SEO.**
6. **QA:** `?revisar=1`, prueba real con UTM, Probar eventos de Meta, PageSpeed.
7. **Publicación:** kit nuevo en `/pruebaoct`, revisión de Ricardo y, con su OK, `/carrera-creativa`.

## 12. Entregables

- Lista de cambios y alturas antes y después.
- Capturas en celular (375 px) y escritorio: primera pantalla y página completa, con y sin la oferta.
- Captura de Meta **Probar eventos** con `PageView` y `Lead`.
- Contacto de prueba en GHL con sus UTM.
- Qué quedó con su respaldo.

### Prueba A/B para las campañas
Mismo anuncio, dos versiones del hero: con el microcopy `PDF gratis con el plan de estudios…` contra sin microcopy, o «Recibe el folleto» contra «Recibe el plan de estudios». Métrica: costo por Lead y % de leads que agendan. Al menos 50 leads por versión antes de decidir.
