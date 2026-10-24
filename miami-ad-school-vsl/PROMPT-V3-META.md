# Landing Carrera Creativa V3 · Prompt para dejarla lista antes de Meta Ads

Documento de trabajo para quien haga los cambios (Claude o Codex). Primero lee completo; luego ejecuta en el orden de la sección 9. Página en vivo: `https://tufuturocreativo.com/carrera-creativa` (kit `51e508f4`). Código: rama `claude/landing-v2` de `miamiadschoolmx/miamiadschoolmx`, carpeta `miami-ad-school-vsl/`.

---

## 1. Contexto y decisión

- **Tráfico:** frío, de Meta Ads (Instagram y Facebook). Casi todo en celular, con el pulgar, en segundos. No conoce el programa y casi no conoce la marca. Nivel de consciencia 2 o 3: sabe que quiere trabajar en algo creativo, no sabe cómo ni con quién.
- **Decisión de Ricardo:** anuncios y landing hablan del **rol** («Conviértete en Copywriter o Director de Arte»), **no de «escuela»**.
- **Avatar** (encuesta a 61 alumnos activos): 22 a 31 años en su mayoría. Diseño, comunicación, marketing y publicidad, pero también muchos que vienen de otras carreras (biología, ingeniería, administración). La mayoría trabaja mientras estudia, por eso el horario nocturno pesa. Su mayor inseguridad y su mayor deseo son lo mismo: el portafolio.

### Datos de búsqueda (México, búsquedas al mes, compartidos por Ricardo)

| Término | Búsquedas | Qué significa para la landing |
|---|---|---|
| copywriter / copywriting | 2,900 | El rol con más demanda. **Ojo:** mucha gente busca «copywriting» para escribir textos de venta en redes y marketing digital. Hay que decir qué es un copywriter **publicitario** para atraer al público correcto. |
| creatividad publicitaria | 880 | Vocabulario de apoyo: subtítulo, SEO y anuncios. |
| director de arte | 320 | Se busca **en español**. La página dice «Art Direction»: cámbialo por «Director de Arte». **Ojo:** «director de arte» también es un puesto de cine y TV. Aclara que es **publicitario**. |
| carrera en publicidad | 210 | Valida usar «Carrera Creativa» como nombre, pero obliga a contestar si da título (FAQ nueva). |

**Regla de lenguaje:** en titulares, botones y anuncios: «Copywriter» y «Director de Arte». «Art Direction» y «Copywriting» solo si hace falta nombrar la especialidad.

---

## 2. Diagnóstico de la página en vivo (24 oct 2026)

Lo revisé en celular (390 px) y escritorio (1440 px), con el panel `?revisar=1`, el código y la transcripción del video.

### Lo que ya funciona (no tocar)
- Carga rápida (~2 a 3 s), sin errores, sin scroll horizontal, accesible.
- Un solo objetivo, «Recibe el folleto», con 4 botones; formulario de GHL integrado; folleto solo después de enviar; calendario activo.
- Propuesta fuerte y honesta: 18 meses, online y en vivo, lunes a jueves de 7 a 10 pm, dos prácticas de 10 semanas, sin promesa de empleo.
- «La industria creativa contrata evidencia.» y «¿Cómo funciona…?» con «Terminas con» explican bien el camino.

### P0 · Bloqueadores: resolver antes de prender campañas

| # | Qué pasa | Por qué importa en Meta | Qué hacer |
|---|---|---|---|
| P0-1 | **El video contradice la página.** Dice «12 meses» y «en un año», contra los 18 meses de la página. Dice «10 semanas de prácticas» (una), contra las dos de la página. Dice «Somos la escuela de publicidad y creatividad más premiada del mundo», «las mejores agencias del mundo» y «el portafolio que te va a conseguir trabajo» (claims prohibidos C-006, C-003 y C-008). También dice «Cada maestro es un director creativo activo… Netflix, Nike, Coca Cola, Apple» y «12 sedes» (sin verificar). Su cierre pide «agenda una llamada de 10 minutos», contra el «Recibe el folleto» y la llamada de 30 minutos de la página. Además habla de «escuela». | Es lo primero que ve el tráfico frío. Dos cifras distintas de duración destruyen la confianza y bajan la calidad de los leads. Las promesas de empleo arriesgan el rechazo de anuncios y problemas con PROFECO. | **[DECIDIR]** Regrabar un video corto con el guion de la sección 7 (recomendado). Respaldo: quitar el video del hero y dejar el botón «Recibe el folleto» hasta tener el nuevo. Corregir también el título («MIAMI Venta_Mad_02») y la descripción («12 meses») en Tella. |
| P0-2 | **El evento Lead no se envía.** El píxel `1349923403740237` está instalado (solo manda PageView), pero la medición de la landing sigue apagada (`TRACKING_ENABLED = false`). | Sin Lead, Meta no puede optimizar campañas de clientes potenciales ni saber qué anuncio trae folletos. | Activar la medición (sección 6.1) y probarla en Events Manager → Probar eventos antes del primer peso. |
| P0-3 | **Los UTM no llegan a GHL.** El formulario es un iframe con URL fija: el `utm_source`, `utm_campaign`, `utm_content` y `fbclid` del anuncio se quedan en la página y no llegan al contacto. | No podrás saber qué campaña o creativo trae cada lead, ni pasarlo a CAPI. | Reenviar esos parámetros al `src` del iframe y crear campos ocultos en el formulario de GHL (sección 6.2). |
| P0-4 | **El hero no dice lo que dice el anuncio.** El anuncio dirá «Conviértete en Copywriter o Director de Arte»; el H1 dice «Tu título no te consigue el mejor trabajo». | Coincidencia de mensaje: si en 2 segundos no reconoce la promesa del anuncio, se va, y Meta encarece el clic. | Nuevo hero (sección 5.1). |
| P0-5 | **El repo y GHL ya no son iguales.** En GHL, Codex conectó el calendario y las URLs de la portada y la imagen OG; en el repo siguen vacías. | El próximo pegado del kit borraría el calendario y la portada. | Pasar a `landing.js` (`calendarUrl`) y a `ghl/medios.json` las URLs que hoy están en GHL, regenerar el kit y verificar con `?revisar=1` (sección 6.3). |

### P1 · Alto impacto en conversión

| # | Qué pasa | Qué hacer |
|---|---|---|
| P1-1 | No se explica **qué hace** un Copywriter ni un Director de Arte. El tráfico frío que llega por «copywriter» puede creer que es copy de ventas. | Bloque corto «¿Copywriter o Director de Arte?» justo después del hero (5.2). |
| P1-2 | «Nuestra misión» está en el segundo lugar. Es abstracta y es la voz de «escuela» que se decidió no usar. | Quitarla o bajarla al footer. **[DECIDIR]** |
| P1-3 | **No queda ninguna prueba externa.** Salieron Future Lions, books, maestros y testimonios. El tráfico frío necesita al menos una razón para creer. | Volver a usar una línea de prueba con la redacción aprobada C-002, junto al botón del hero, como sello y no como discurso de «escuela». Sumar 1 a 3 testimonios reales con permiso (los exalumnos del video actual son candidatos). **[DECIDIR]** y **[VERIFICAR]** |
| P1-4 | Jerga que el tráfico frío no entiende: «book», «brief», «insight», «feedback». | Usar «portafolio». La primera vez: «portafolio (en la industria le dicen book)», «brief (el encargo de la marca)», «feedback (correcciones directas)». |
| P1-5 | En celular, la primera pantalla solo tiene «Ver el video»; el botón del folleto queda abajo. | Barra fija abajo en celular con «Recibe el folleto»: aparece al pasar el hero y se oculta cuando el formulario está en pantalla (6.4). |
| P1-6 | El incentivo es vago: «Recibe el folleto». | Decir qué trae: «Recibe el plan de estudios (PDF)». Probar en A/B (5.1). El contenido real del PDF es **[VERIFICAR]**. |
| P1-7 | «Carrera» y «Tu título…» hacen preguntar «¿esto da título?». No se contesta. | FAQ «¿Es una licenciatura? ¿Qué documento recibo?» **[VERIFICAR]** (5.8). |
| P1-8 | «Problema» solo le habla a quien estudió algo creativo; el avatar real incluye a quien viene de otra carrera. | Agregar una línea para ellos (5.3). |
| P1-9 | «Desde cualquier parte» sin zona horaria. | **[VERIFICAR]** zona horaria (por ejemplo, hora del centro de México). |
| P1-10 | Precio: no hay ninguna referencia. | **[DECIDIR]** Precio, «desde», becas o plan de pagos. La referencia interna de $12,760 MXN/mes y las becas del 30 al 50 % no están reconfirmadas: no se publican sin confirmar. Respaldo: la FAQ actual. |

### P2 · Pulido
- «¿Cómo funciona…?» mide 2,557 px en celular (la sección más larga): recortar textos, no etapas.
- Imagen para compartir (OG): todavía muestra el hero viejo con el grafitero. Hacer una nueva con el hero V3.
- Logo oficial «MIAMI AD SCHOOL MÉXICO» (P-01), redes del footer (P-18) y «Etapa 3 · Meses 13 a 18» (confirmar).
- **Cuidado con los anuncios:** la guía de copy de MAS trae datos no verificados («8x School of the Year», «98 % de colocación», «20,000 egresados», «5,000 mentores», «100+ agencias», Quarter Away, casos con puestos, precios). No usarlos en anuncios ni en la landing sin confirmar. Lo verificado es «7 veces Future Lions School of the Year, incluyendo 2025».

---

## 3. Reglas (las mismas de la V2, más las de la V3)

1. Conserva el diseño visual: tipografías, colores, componentes, cinta, slider de logos e imágenes. Cambias estructura y textos.
2. Usa los textos de la sección 5 **tal cual** cuando Ricardo los apruebe. No reescribas, no agregues adjetivos, no inventes cifras, nombres, fechas ni testimonios.
3. Todo lo marcado **[VERIFICAR]** o **[DECIDIR]** se resuelve con la tabla de la sección 8. Si no hay dato, aplica el respaldo u oculta el bloque. Nunca publiques corchetes.
4. Sin raya larga (—) en ningún texto.
5. Habla del rol, no de la escuela. Ningún titular empieza con «Somos», «Nuestro» ni «Miami Ad School».
6. Prohibido: «la escuela más premiada», «las mejores agencias del mundo», promesas o cifras de empleo, salarios, urgencia o cupos falsos, testimonios sin permiso.
7. No toques píxeles ni scripts de medición existentes; la medición nueva se activa solo como dice la sección 6.1.
8. No publiques a producción sin el OK de Ricardo. Entrega lo de la sección 10.

---

## 4. Estructura V3

| # | Sección | Trabajo que hace | Estado |
|---|---|---|---|
| 0 | Header | Logo. | Igual (logo oficial cuando llegue) |
| 1 | **Hero** | Repite la promesa del anuncio, dice qué es y da el siguiente paso. | **Cambia** |
| 2 | Cinta | Movimiento y palabras clave. | Textos nuevos |
| 3 | **¿Copywriter o Director de Arte?** | Explica los dos roles en 10 segundos. | **Nueva** |
| 4 | Problema + veredicto | Identificación y tensión. | Una línea nueva |
| 5 | ¿Cómo funciona…? | El camino de 18 meses y qué te llevas. | Textos sin jerga |
| 6 | Prácticas | El diferenciador. | Igual |
| 7 | **Prueba** | Una razón para creer. | **[DECIDIR]** |
| 8 | Preguntas | Objeciones en orden de importancia. | Reordenar + 1 nueva |
| 9 | Recibe el folleto | Formulario. | Textos más concretos |
| 10 | Footer | Cierre, legales. | Igual (± misión) |
| — | Barra fija en celular | Botón siempre a mano. | **Nueva** |
| — | Nuestra misión | Voz de escuela. | **[DECIDIR]**: quitar o al footer |

---

## 5. Textos propuestos (aprobar, cambiar o elegir)

Todo lo de esta sección es **propuesta** con datos confirmados. Ricardo elige; luego se usa tal cual.

### 5.1 Hero
- **Eyebrow:** `Carrera Creativa · 18 meses · Online y en vivo`
- **H1:**
  - **A (recomendada, coincide con el anuncio):** `Conviértete en Copywriter o Director de Arte.`
  - **B:** `Conviértete en Copywriter o Director de Arte publicitario.` (más claro, menos elegante)
- **Línea gigante** (la que lleva el círculo amarillo): `Tu portafolio lo demuestra.`, con «portafolio» encerrado. **[DECIDIR]** Alternativa: conservar `Tu título no te consigue el mejor trabajo. Tu portafolio sí.` como subtítulo.
- **Subtítulo:** `En 18 meses construyes un portafolio de campañas, con clases en vivo y dos prácticas de 10 semanas en agencias de la red de Miami Ad School.`
- **Datos (3, no 4):**
  - `Lunes a jueves, de 7 pm a 10 pm [zona horaria]`
  - `Desde cualquier parte, online y en vivo`
  - `Inicios en enero, abril, julio y octubre`
- **Botón:**
  - A: `Recibe el plan de estudios`
  - B: `Recibe el folleto` (control)
- **Microcopy bajo el botón:** `PDF gratis en tu correo. Sin compromiso.`
- **Sello de prueba (C-002, exacto) [DECIDIR]:** `Miami Ad School ha sido reconocida siete veces como Future Lions School of the Year, incluyendo 2025.`
- **Video:** el nuevo de la sección 7, o ninguno (respaldo P0-1).

### 5.2 ¿Copywriter o Director de Arte? (nueva)
- **Título:** `¿Copywriter o Director de Arte?`
- **Copywriter:** `Piensa la idea de una campaña y la escribe: conceptos, titulares y guiones que la gente quiere leer y recordar.`
- **Director de Arte:** `Piensa la idea de una campaña y decide cómo se ve: imagen, tipografía, color y composición.`
- **Línea final:** `En agencia trabajan en pareja: uno piensa en palabras y el otro en imágenes. ¿No sabes cuál? Elige «Aún no sé» en el formulario.`
- **Aclaración para el tráfico de «copywriting» [DECIDIR]:** `Copywriter publicitario: escribes las ideas de las campañas, no solo textos para vender.`

### 5.3 Problema (una línea nueva, al inicio)
- Agregar como primera línea: `Estudiaste diseño, comunicación, publicidad, marketing o cine. O vienes de otra carrera y sabes que lo tuyo es crear.` (sustituye la primera línea actual). El resto queda igual.

### 5.4 Cinta
`Copywriter • Director de Arte • 18 meses • Online y en vivo • Dos prácticas en agencias • Tu portafolio •`

### 5.5 ¿Cómo funciona…? (mismas etapas, sin jerga)
- **Etapa 1:** `Lees el encargo de la marca (el brief), encuentras qué le importa a la gente y lo conviertes en una idea de campaña.`
- **Etapa 2:** `Presentas tus ideas en clase, en vivo, recibes correcciones directas y las rehaces hasta que funcionan.`
- **Etapa 3:** igual (C-012).
- **Final:** cambiar «book» por «portafolio».
- Recortar cada texto a una o dos líneas en celular.

### 5.6 Prueba [DECIDIR]
- **Opción 1:** solo el sello C-002 del hero.
- **Opción 2:** 1 a 3 testimonios reales con nombre, foto y puesto actual, **con permiso por escrito (C-009)**. Candidatos: los exalumnos del video actual. Respaldo: no crear la sección.

### 5.7 Recibe el folleto
- **Título:** `Recibe el plan de estudios de la Carrera Creativa`
- **Qué trae el PDF [VERIFICAR]:** solo lo que de verdad trae (plan de estudios, fechas, ¿inversión?).
- **Pasos:** se quedan.

### 5.8 Preguntas (nuevo orden)
1. `¿Cuánto cuesta?` (respuesta según 8.7)
2. `¿Es una licenciatura? ¿Qué documento recibo?` **[VERIFICAR]**; respaldo: no agregarla.
3. `¿Necesito tener portafolio?` (igual)
4. `¿Necesito haber estudiado algo o tener experiencia?` (igual)
5. `¿Puedo trabajar y estudiar al mismo tiempo?` (igual + zona horaria)
6. `¿Cómo funcionan las prácticas?` (igual)
7. `¿Me garantizan empleo?` (igual)
8. `¿Puedo estudiar desde otra ciudad o país?` (igual + zona horaria)
9. `¿Qué pasa después de dejar mis datos?` (igual)

Quitar `¿Y si ya sé usar Adobe, Canva o IA?` o dejarla al final. **[DECIDIR]**

---

## 6. Técnico y medición para Meta

### 6.1 Activar la medición (P0-2)
- El píxel ya está en la página (`1349923403740237`). No instalar otro.
- En `landing.js`: `TRACKING_ENABLED = true`. Eventos estándar:
  - `Lead`: al llegar a `?paso=agenda`, una vez por sesión, con `eventID`.
  - `Schedule`: al llegar a `?paso=confirmado`.
- Eventos personalizados: `cta_click` (con el nombre del botón), `vsl_play`, `brochure_download`, `calendar_click`.
- Comprobar que GHL no mande otro `Lead` por su cuenta (duplicado).
- Meta Business: dominio verificado y `Lead` como evento prioritario. Probar en **Probar eventos**.
- CAPI (fase 2): workflow de GHL con el mismo `eventID`.

### 6.2 UTM y fbclid hasta GHL (P0-3)
- Al cargar, copiar de la URL de la página al `src` del iframe: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` y `fbclid`. Hacerlo igual que hoy con `interes_programa`, sin recargar el formulario si la persona ya empezó a escribir.
- En el formulario de GHL: campos ocultos con esas mismas claves.
- Prueba: abrir la página con `?utm_campaign=prueba`, enviar y verificar el dato en el contacto.

### 6.3 Sincronizar repo y GHL (P0-5)
- Copiar de GHL al repo: `calendarUrl` (bloque 3) y las URLs de `vsl-poster-640/1280.webp` y `og-carrera-creativa.jpg` a `ghl/medios.json`. Regenerar con `python3 tools/ghl-kit.py`.
- Desde ahora, cualquier cambio en GHL se hace en el repo y se regenera el kit.

### 6.4 Barra fija en celular (P1-5)
- Menos de 48em: barra abajo con `Recibe el folleto` (`data-cta="sticky-folleto"`).
- Aparece al pasar el hero y se oculta cuando `#aplicar` está en pantalla.
- Respeta el área segura del iPhone. No tapa el contenido final ni el footer.

### 6.5 Otros
- OG nuevo con el hero V3.
- Mantener: sin raya larga, sin corchetes, 375 px sin scroll horizontal, Lighthouse móvil ≥ 90, cero errores de accesibilidad, `?revisar=1` con 0 por resolver.

---

## 7. Video nuevo (brief para regrabar)

- **Duración:** 60 a 90 s. **Formato:** 16:9 para la landing; versión 4:5 o 9:16 para anuncios.
- **Quién:** Ricardo, a cámara. Subtítulos quemados (la mayoría lo ve sin sonido).
- **Guion base** (solo datos confirmados):
  1. **0 a 5 s, gancho:** `¿Quieres ser Copywriter o Director de Arte? Tu título no te va a abrir la puerta. Tu portafolio sí.`
  2. **5 a 15 s:** `Soy Ricardo Ampudia, de Miami Ad School México.`
  3. **15 a 45 s:** `La Carrera Creativa dura 18 meses, online y en vivo, de lunes a jueves de 7 a 10 de la noche. Aprendes a crear ideas de campaña, presentas, te corrigen y rehaces, hasta tener un portafolio profesional.`
  4. **45 a 65 s:** `Al terminar el primer año haces dos prácticas de 10 semanas, en dos agencias distintas de nuestra red.`
  5. **65 a 80 s:** `Nadie te promete un trabajo. Lo que te llevas es un portafolio que demuestra cómo piensas.`
  6. **80 a 90 s, cierre:** `Deja tus datos y te mando el plan de estudios a tu correo.`
- **No decir:** «la escuela más premiada», «12 meses», «en un año», «las mejores agencias del mundo», «te va a conseguir trabajo», marcas o premios de maestros sin verificar, «12 sedes» o intercambios sin verificar, «agenda una llamada de 10 minutos».
- Testimonios de exalumnos: solo con permiso y sin promesas de empleo.

---

## 8. Datos que necesito de Ricardo

| # | Dato | Para qué | Respaldo si no llega |
|---|---|---|---|
| 8.1 | ¿Se regraba el video? ¿Para cuándo? | P0-1 | Quitar el video del hero hasta tenerlo |
| 8.2 | Zona horaria del horario | Hero y FAQ | «7 a 10 pm» sin zona |
| 8.3 | ¿Qué documento recibe el alumno? ¿Es licenciatura? | FAQ 2 | No agregar la pregunta |
| 8.4 | Contenido real del PDF | Botón y bloque de aplicar | «Recibe el folleto» |
| 8.5 | H1 A o B; línea gigante; botón A o B | Hero | H1 A, «Tu portafolio lo demuestra.», botón B |
| 8.6 | ¿Sello Future Lions sí o no? | Prueba | Sí, con la redacción C-002 exacta |
| 8.7 | Precio / «desde» / becas / plan de pagos | FAQ 1 | Respuesta actual (se revisa en la llamada) |
| 8.8 | Testimonios con permiso | Sección 7 | No crear la sección |
| 8.9 | ¿Misión: quitar o al footer? | Estructura | Quitar |
| 8.10 | ¿Aclaración «no es copy de ventas»? | 5.2 | No ponerla |
| 8.11 | Logo oficial y redes | Header y footer | Como hoy |
| 8.12 | ¿Prácticas en los meses 13 a 18? | Etapa 3 | «Después del primer año» |

---

## 9. Orden de trabajo

1. P0-5: sincronizar repo y GHL.
2. P0-2 y P0-3: medición y UTM (se pueden probar antes de cambiar textos).
3. P0-1: video (decisión 8.1).
4. P0-4 y P1: hero, roles, problema, jerga, barra fija, FAQ, aplicar.
5. P2.
6. QA completo, `?revisar=1`, prueba real con UTM, Probar eventos de Meta.
7. Kit nuevo, pegado en `/pruebaoct`, revisión de Ricardo y, con su OK, `/carrera-creativa`.

## 10. Entregables

- Lista de cambios.
- Capturas en celular (375 px) y escritorio, primera pantalla y página completa.
- Alturas antes y después.
- Captura de Meta **Probar eventos** con `PageView` y `Lead`.
- Contacto de prueba en GHL con sus UTM.
- Qué [VERIFICAR] o [DECIDIR] quedó con su respaldo.

### Prueba A/B sugerida para las campañas
Mismo anuncio, dos versiones del hero: H1 A con botón A contra H1 A con botón B. Métrica: costo por Lead y % de leads que agendan. Al menos 50 leads por versión antes de decidir.
