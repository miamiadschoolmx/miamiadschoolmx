/* ==========================================================================
   Miami Ad School México · Landing VSL
   JavaScript vanilla, sin dependencias. Se carga con defer y no bloquea el render.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('.mas-vsl');
  if (!root || root.getAttribute('data-ready') === '1') return;
  root.setAttribute('data-ready', '1');
  root.classList.add('has-js');

  /* --- Configuración ------------------------------------------------------
     Ajusta estos valores al conectar GoHighLevel (ver README-GHL.md). */
  var CONFIG = {
    // VSL: la ÚNICA variable que hay que llenar para el video. Acepta un enlace de YouTube,
    // de Vimeo o la URL directa de un .mp4. Vacía = se queda el póster con «Ver video».
    vslUrl: '',
    // Opcional: duración que se muestra sobre el póster, por ejemplo '12 min'.
    vslDuration: '',
    // Query key del campo "Me interesa" en el formulario de GHL, para prellenarlo.
    prefillParam: 'me_interesa',
    programLabels: {
      'art-direction': 'Art Direction',
      'copywriting': 'Copywriting',
      'no-se': 'Aún no sé'
    },
    // Valores del parámetro ?paso= que GHL agrega al redirigir (ver README-GHL.md · paso 8).
    stageParam: 'paso',
    // Fechas reales de inicio (mes 0 = enero). La cuenta regresiva apunta a la siguiente.
    intakes: [{ month: 0, day: 10 }, { month: 3, day: 10 }, { month: 6, day: 10 }, { month: 9, day: 10 }],
    // Días antes del inicio en que el contador ya muestra el siguiente (cierre de admisión).
    intakeCutoffDays: 7,
    // Hora de inicio en Ciudad de México (UTC-6, sin horario de verano).
    intakeUtcOffsetHours: -6
  };

  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var canObserve = 'IntersectionObserver' in window;

  // Rendimiento: nada se mide al cargar. Cada parte mide su sección
  // solo cuando está cerca de la pantalla (evita bloquear el celular).
  function whenNear(el, cb) {
    if (!el) return;
    if (!canObserve) { requestAnimationFrame(cb); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); cb(); }
    }, { rootMargin: '100% 0px 100% 0px' });
    io.observe(el);
  }
  function watchVisible(el, onChange) {
    if (!el || !canObserve) { if (el) onChange(true); return; }
    new IntersectionObserver(function (entries) {
      onChange(entries[0].isIntersecting);
    }).observe(el);
  }

  /* --- Medición: preparada, desactivada ------------------------------------
     Hoy NO se envía nada a ningún servicio. track() solo guarda el evento en
     window.masVsl.events y emite un CustomEvent local "mas:track".
     Cuando instales el píxel nuevo y GA4, cambia TRACKING_ENABLED a true y
     descomenta las líneas que correspondan. */
  var TRACKING_ENABLED = false;
  var events = [];
  var fired = {};

  function track(name, detail) {
    var payload = { event: name, detail: detail || {}, ts: Date.now() };
    events.push(payload);
    try {
      root.dispatchEvent(new CustomEvent('mas:track', { detail: payload, bubbles: true }));
    } catch (e) { /* navegadores sin CustomEvent: se ignora */ }
    if (!TRACKING_ENABLED) return;

    // Meta Pixel (navegador): los eventos con equivalente estándar van como estándar, el resto como
    // personalizados. eventID sirve para deduplicar con la API de Conversiones (CAPI).
    // var META_STANDARD = { lead_submit: 'Lead', appointment_booked: 'Schedule', view_books: 'ViewContent' };
    // if (window.fbq) {
    //   var metaOpts = { eventID: name + '-' + payload.ts };
    //   if (META_STANDARD[name]) window.fbq('track', META_STANDARD[name], payload.detail, metaOpts);
    //   else window.fbq('trackCustom', name, payload.detail, metaOpts);
    // }

    // GA4 (gtag.js). lead_submit también sale como el evento recomendado generate_lead:
    // if (window.gtag) {
    //   window.gtag('event', name, payload.detail);
    //   if (name === 'lead_submit') window.gtag('event', 'generate_lead', payload.detail);
    // }

    // Google Tag Manager:
    // (window.dataLayer = window.dataLayer || []).push({ event: name, mas: payload.detail });

    // CAPI: se envía desde el servidor (workflow o webhook de GHL), nunca desde este archivo.
  }

  function trackOnce(name, detail) {
    if (fired[name]) return;
    fired[name] = true;
    track(name, detail);
  }

  window.masVsl = { events: events, track: track, config: CONFIG };

  /* --- Navegación interna suave -------------------------------------------- */
  root.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || !root.contains(a)) return;
    var id = a.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: mqReduce.matches ? 'auto' : 'smooth', block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    try { if (window.history && history.replaceState) history.replaceState(null, '', '#' + id); } catch (err) { /* marco aislado: se ignora */ }
  });

  /* --- Eventos por clic (data-event) --------------------------------------- */
  root.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-event]') : null;
    if (!el || !root.contains(el)) return;
    var name = el.getAttribute('data-event');
    if (name === 'vsl_play') return; // lo registra el reproductor al iniciar de verdad
    if (name === 'program_select') {
      setProgram(el.getAttribute('data-program'), el);
      return;
    }
    if (name === 'external_book_click') {
      track(name, { book: el.getAttribute('data-book'), url: el.href });
    }
  });

  /* --- Programa elegido ---------------------------------------------------- */
  var chips = root.querySelectorAll('.mas-chip[data-program]');

  function setProgram(program, source) {
    if (!CONFIG.programLabels[program]) return;
    root.setAttribute('data-program', program);
    var section = document.getElementById('aplicar');
    if (section) section.setAttribute('data-program', program);
    for (var i = 0; i < chips.length; i++) {
      chips[i].setAttribute('aria-pressed', chips[i].getAttribute('data-program') === program ? 'true' : 'false');
    }
    try { sessionStorage.setItem('mas-program', program); } catch (e) { /* sin almacenamiento */ }
    prefillForm(program);
    if (source) track('program_select', { program: program, from: source.classList.contains('mas-chip') ? 'chip' : 'panel' });
  }

  // Prellena "Me interesa" en el iframe del formulario de GHL, si ya está insertado
  // y la persona todavía no empezó a escribir (cambiar el src recarga el formulario).
  function prefillForm(program) {
    var frame = document.querySelector('#ghl-form-slot iframe');
    if (!frame || !frame.src || fired.form_start) return;
    try {
      var url = new URL(frame.src, location.href);
      url.searchParams.set(CONFIG.prefillParam, CONFIG.programLabels[program]);
      if (url.toString() !== frame.src) frame.src = url.toString();
    } catch (e) { /* src no válido: se deja intacto */ }
  }

  try {
    var saved = sessionStorage.getItem('mas-program');
    if (saved) setProgram(saved, null);
  } catch (e) { /* sin almacenamiento */ }

  /* --- Reproductor VSL ------------------------------------------------------ */
  var player = root.querySelector('.mas-player');
  if (player) {
    var poster = player.querySelector('.mas-player__poster');
    var notice = player.querySelector('.mas-player__notice');
    var duration = player.querySelector('[data-vsl-duration]');
    var vslSrc = String(CONFIG.vslUrl || '').trim();
    if (duration && CONFIG.vslDuration) {
      duration.textContent = 'Duración: ' + CONFIG.vslDuration;
      duration.hidden = false;
    }

    // Carga diferida: el iframe o el <video> se crean solo al hacer clic, así que antes
    // no se descarga nada de YouTube, Vimeo ni del .mp4.
    poster.addEventListener('click', function () {
      var src = vslSrc;
      if (!src) {
        // Sin URL configurada: el póster se queda; solo un aviso amable, nunca un error.
        notice.textContent = 'El video estará disponible muy pronto.';
        notice.hidden = false;
        return;
      }
      var title = player.getAttribute('data-vsl-title') || 'Video';
      var media;

      if (/\.(mp4|webm|m4v)(\?|#|$)/i.test(src)) {
        media = document.createElement('video');
        media.src = src;
        media.controls = true;
        media.playsInline = true;
        media.setAttribute('playsinline', '');
        media.preload = 'auto';
        media.setAttribute('aria-label', title);
        media.addEventListener('timeupdate', function () {
          if (media.duration && media.currentTime / media.duration >= 0.5) trackOnce('vsl_50_percent');
        });
        media.addEventListener('ended', function () { trackOnce('vsl_complete'); });
      } else {
        media = document.createElement('iframe');
        media.src = toEmbed(src);
        media.title = title;
        media.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
        media.setAttribute('allowfullscreen', '');
        media.referrerPolicy = 'strict-origin-when-cross-origin';
        // vsl_50_percent y vsl_complete en YouTube/Vimeo requieren su API de reproductor
        // (YouTube IFrame API / Vimeo Player SDK). Ver README-GHL.md · paso 9.
      }

      player.appendChild(media);
      poster.hidden = true;
      notice.hidden = true;
      trackOnce('vsl_play', { src: src });
      if (media.tagName === 'VIDEO') {
        var p = media.play();
        if (p && p.catch) p.catch(function () { /* el navegador pidió interacción: quedan los controles */ });
      }
      media.focus();
    });
  }

  // Convierte enlaces comunes de YouTube y Vimeo a su URL de inserción con autoplay.
  // El autoplay solo ocurre después del clic de la persona, así que el sonido es intencional.
  function toEmbed(src) {
    var m;
    if ((m = src.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/))) {
      return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&playsinline=1';
    }
    if ((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/))) {
      // Videos privados u ocultos de Vimeo traen un hash (vimeo.com/123/abc o ?h=abc).
      var hash = m[2] || (src.match(/[?&]h=([\da-f]+)/) || [])[1];
      return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&title=0&byline=0&portrait=0' + (hash ? '&h=' + hash : '');
    }
    return src + (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
  }

  /* --- Acordeón accesible --------------------------------------------------- */
  var qaButtons = root.querySelectorAll('.mas-qa__btn');
  for (var q = 0; q < qaButtons.length; q++) {
    (function (btn, index) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      // Sin JS todas las respuestas quedan visibles; con JS se abre solo la primera.
      setOpen(btn, panel, index === 0);
      btn.addEventListener('click', function () {
        setOpen(btn, panel, btn.getAttribute('aria-expanded') !== 'true');
      });
    })(qaButtons[q], q);
  }
  function setOpen(btn, panel, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-closed', !open);
  }

  /* --- Galería de books ----------------------------------------------------- */
  var track_ = root.querySelector('.mas-books');
  var prev = root.querySelector('[data-books-prev]');
  var next = root.querySelector('[data-books-next]');
  if (track_ && prev && next) {
    var step = function () {
      var item = track_.querySelector('.mas-book');
      return item ? item.getBoundingClientRect().width + 24 : 320;
    };
    var sync = function () {
      var max = track_.scrollWidth - track_.clientWidth - 2;
      prev.disabled = track_.scrollLeft <= 2;
      next.disabled = track_.scrollLeft >= max;
    };
    prev.addEventListener('click', function () {
      track_.scrollBy({ left: -step(), behavior: mqReduce.matches ? 'auto' : 'smooth' });
    });
    next.addEventListener('click', function () {
      track_.scrollBy({ left: step(), behavior: mqReduce.matches ? 'auto' : 'smooth' });
    });
    prev.disabled = true;
    track_.addEventListener('scroll', throttle(sync), { passive: true });
    window.addEventListener('resize', throttle(sync), { passive: true });
    whenNear(track_, sync);
  }

  /* --- Etapas: formulario → agenda → confirmación ---------------------------
     No hay envíos simulados. La etapa la decide GHL al redirigir con ?paso=agenda
     (después de enviar el formulario) o ?paso=confirmado (después de agendar). */
  var params;
  try { params = new URLSearchParams(location.search); } catch (e) { params = null; }
  var stage = params ? params.get(CONFIG.stageParam) : null;
  if (stage !== 'agenda' && stage !== 'confirmado') stage = 'form';
  setStage(stage);

  function setStage(value) {
    root.setAttribute('data-stage', value);
    var panels = root.querySelectorAll('[data-stage-panel]');
    for (var i = 0; i < panels.length; i++) {
      panels[i].hidden = panels[i].getAttribute('data-stage-panel') !== value;
    }
    var steps = root.querySelectorAll('.mas-step');
    for (var s = 0; s < steps.length; s++) {
      if (steps[s].getAttribute('data-step') === value) steps[s].setAttribute('aria-current', 'step');
      else steps[s].removeAttribute('aria-current');
    }
    if (value === 'agenda') {
      onceStorage('lead_submit');
    }
    if (value === 'confirmado') {
      onceStorage('appointment_booked');
      var done = root.querySelector('[data-stage-panel="confirmado"]');
      if (done) setTimeout(function () { done.focus({ preventScroll: true }); }, 0);
    }
  }

  // Evita contar dos veces el mismo lead si la persona recarga la página.
  function onceStorage(name) {
    var key = 'mas-fired-' + name;
    try {
      if (sessionStorage.getItem(key)) { fired[name] = true; return; }
      sessionStorage.setItem(key, '1');
    } catch (e) { /* sin almacenamiento */ }
    trackOnce(name, { stage: stage });
  }

  // form_start: el foco entra al iframe del formulario de GHL.
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var active = document.activeElement;
      var slot = document.getElementById('ghl-form-slot');
      if (active && active.tagName === 'IFRAME' && slot && slot.contains(active)) trackOnce('form_start');
    }, 0);
  });

  /* --- Enlaces legales pendientes ------------------------------------------- */
  var pending = root.querySelectorAll('a[href^="REEMPLAZAR"]');
  for (var k = 0; k < pending.length; k++) {
    pending[k].setAttribute('aria-disabled', 'true');
    pending[k].addEventListener('click', function (e) { e.preventDefault(); });
  }

  /* --- Vistas de sección (view_vsl, view_books, calendar_view) -------------- */
  var viewTargets = root.querySelectorAll('[data-event-view]');
  if (canObserve) {
    var viewObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        trackOnce(entry.target.getAttribute('data-event-view'));
        viewObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    for (var v = 0; v < viewTargets.length; v++) viewObserver.observe(viewTargets[v]);
  }

  /* --- Movimiento ------------------------------------------------------------ */
  if (!mqReduce.matches && canObserve) {
    root.classList.add('has-motion');
    var reveals = root.querySelectorAll('[data-reveal]');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    for (var r = 0; r < reveals.length; r++) revealObserver.observe(reveals[r]);
  } else {
    var all = root.querySelectorAll('[data-reveal]');
    for (var a2 = 0; a2 < all.length; a2++) all[a2].classList.add('is-in');
  }

  /* --- Titulares gigantes: se ajustan al ancho disponible -------------------
     Cada fuente mide distinto (Archivo en la vista previa, Obviously en GHL):
     si la línea no cabe, se reduce lo justo para que nunca desborde. */
  var fits = root.querySelectorAll('[data-fit]');
  var fitted = [];
  function fitOne(el) {
    el.style.fontSize = '';
    var avail = el.clientWidth;
    var need = el.scrollWidth;
    // data-fit="fill" además crece hasta ocupar todo el ancho.
    if (avail > 0 && (need > avail || el.getAttribute('data-fit') === 'fill')) {
      var size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = Math.floor(size * (avail / need) * 0.98) + 'px';
    }
  }
  function refit() { for (var f = 0; f < fitted.length; f++) fitOne(fitted[f]); }
  for (var fi = 0; fi < fits.length; fi++) {
    (function (el) { whenNear(el, function () { fitted.push(el); fitOne(el); }); })(fits[fi]);
  }
  if (fits.length) {
    window.addEventListener('resize', throttle(refit), { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  }

  /* --- Logos de agencias: la fila se duplica y avanza con el scroll ---------
     Igual que la cinta: no se mueve sola, así que no necesita botón de pausa.
     Sin JS o con movimiento reducido, los logos se quedan quietos en una cuadrícula. */
  var logos = root.querySelector('[data-logos]');
  var logoTrack = logos && logos.querySelector('.mas-logos__track');
  var logoHalf = 0, logosOn = false;
  function measureLogos() { logoHalf = logoTrack.offsetWidth / 2; }
  if (logoTrack && root.classList.contains('has-motion') && logoTrack.children.length > 1) {
    whenNear(logos, function () {
      var originals = Array.prototype.slice.call(logoTrack.children);
      var appendCopies = function (items) {
        items.forEach(function (li) {
          var copy = li.cloneNode(true);
          copy.setAttribute('aria-hidden', 'true');
          copy.removeAttribute('data-placeholder');
          logoTrack.appendChild(copy);
        });
      };
      var setWidth = 0;
      originals.forEach(function (li) { setWidth += li.offsetWidth; });
      if (!setWidth) return;
      // Primera mitad: copias suficientes para cubrir la pantalla más ancha. Luego se duplica entera,
      // así el salto del final al inicio no se nota.
      var span = Math.max(logos.clientWidth, (window.screen && window.screen.width) || 0);
      var copies = Math.max(1, Math.ceil(span / setWidth));
      for (var lc = 1; lc < copies; lc++) appendCopies(originals);
      appendCopies(Array.prototype.slice.call(logoTrack.children));
      logos.classList.add('is-looping');
      measureLogos();
      window.addEventListener('resize', throttle(measureLogos), { passive: true });
      watchVisible(logos, function (v) { logosOn = v; if (v) requestAnimationFrame(onScroll); });
    });
  }

  /* --- Motor de scroll: progreso, cinta y líneas que se encienden ----------- */
  var progress = root.querySelector('.mas-progress');
  var tickerRow = root.querySelector('[data-ticker]');
  var glowBox = root.querySelector('[data-glow]');
  var glowItems = root.querySelectorAll('[data-glow] > *');
  var motionOK = !mqReduce.matches;
  var ticking = false;
  var tickerOn = false, glowOn = false;
  watchVisible(tickerRow, function (v) { tickerOn = v; });
  watchVisible(glowBox, function (v) { glowOn = v; if (v) requestAnimationFrame(onScroll); });

  function onScroll() {
    ticking = false;
    var vh = window.innerHeight;
    if (progress) {
      var rect = root.getBoundingClientRect();
      var total = rect.height - vh;
      var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progress.style.setProperty('--p', p.toFixed(4));
    }
    if (tickerRow && tickerOn && motionOK) {
      // La cinta avanza con el scroll (no se mueve sola), así que no necesita botón de pausa.
      var copy = tickerRow.scrollWidth / 3;
      var x = copy ? (window.pageYOffset * 0.45) % copy : 0;
      tickerRow.style.setProperty('--x', x.toFixed(1));
    }
    if (logosOn && logoHalf) {
      logoTrack.style.setProperty('--lx', ((window.pageYOffset * 0.35) % logoHalf).toFixed(1));
    }
    if (glowOn && glowItems.length && root.classList.contains('has-motion')) {
      for (var g = 0; g < glowItems.length; g++) {
        var top = glowItems[g].getBoundingClientRect().top;
        glowItems[g].classList.toggle('is-lit', top < vh * 0.62);
      }
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', throttle(onScroll), { passive: true });

  /* --- Cursor-punto (solo mouse, solo si se permite movimiento) -------------
     Es un acompañante del cursor nativo, nunca lo reemplaza. */
  var cursor = root.querySelector('.mas-cursor');
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && fine && motionOK) {
    root.classList.add('has-cursor');
    var label = cursor.querySelector('.mas-cursor__label');
    var tx = -100, ty = -100, cx = -100, cy = -100, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) requestAnimationFrame(loop);
      else running = false;
    };
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.remove('is-hidden');
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { cursor.classList.add('is-hidden'); });
    root.addEventListener('mouseover', function (e) {
      var t = e.target.closest ? e.target.closest('[data-cursor]') : null;
      var player = e.target.closest ? e.target.closest('.mas-player') : null;
      var playing = player && player.querySelector('iframe, video');
      if (t && !playing) {
        label.textContent = t.getAttribute('data-cursor');
        cursor.classList.add('is-big');
      } else {
        cursor.classList.remove('is-big');
      }
      cursor.classList.toggle('is-hidden', !!playing);
    });
  }

  /* --- Galería de books: arrastrar con el mouse ----------------------------- */
  var dragEl = root.querySelector('[data-drag]');
  if (dragEl) {
    var down = false, moved = false, startX = 0, startLeft = 0;
    dragEl.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = dragEl.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; dragEl.classList.add('is-dragging'); }
      if (moved) dragEl.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (moved) setTimeout(function () { dragEl.classList.remove('is-dragging'); }, 0);
    });
    // Si hubo arrastre, el clic no abre el book.
    dragEl.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  }

  /* --- Próximo inicio y cuenta regresiva -----------------------------------
     Real: cuenta hacia la siguiente fecha de CONFIG.intakes. No se reinicia por
     visitante y salta sola al siguiente inicio cuando cierra el actual. */
  var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DAY = 86400000;
  function nextIntake(now) {
    var y = new Date(now).getUTCFullYear();
    for (var yy = y; yy <= y + 1; yy++) {
      for (var n = 0; n < CONFIG.intakes.length; n++) {
        var it = CONFIG.intakes[n];
        var t = Date.UTC(yy, it.month, it.day, -CONFIG.intakeUtcOffsetHours, 0, 0);
        if (t - CONFIG.intakeCutoffDays * DAY > now) return { t: t, year: yy, index: n, month: it.month, day: it.day };
      }
    }
    return null;
  }
  function pad(v) { return v < 10 ? '0' + v : String(v); }
  function setText(sel, txt) {
    var els = root.querySelectorAll(sel);
    for (var e = 0; e < els.length; e++) els[e].textContent = txt;
  }
  var cdBox = root.querySelector('[data-countdown]');
  var pill = root.querySelector('[data-intake-pill]');
  var titleEl = root.querySelector('[data-intake-title]');
  var current = null;
  function renderIntake() {
    var now = Date.now();
    var nx = nextIntake(now);
    if (!nx) return;
    var thisYear = new Date(now).getUTCFullYear();
    var short = nx.day + '\u00a0de ' + MONTHS[nx.month];
    var label = short + (nx.year !== thisYear ? ' de ' + nx.year : '');
    var left = Math.max(0, nx.t - now);
    var d = Math.floor(left / DAY);
    var h = Math.floor(left % DAY / 3600000);
    var m = Math.floor(left % 3600000 / 60000);
    var sec = Math.floor(left % 60000 / 1000);
    if (!current || current.t !== nx.t) {
      current = nx;
      setText('[data-intake-date]', label);
      setText('[data-intake-date-short]', short);
      if (titleEl) titleEl.textContent = 'Próximo inicio: ' + label + '.';
      var items = root.querySelectorAll('[data-intake]');
      for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle('is-next', Number(items[i].getAttribute('data-intake')) === nx.index);
      }
    }
    setText('[data-intake-days]', String(d));
    setText('[data-intake-days-label]', d === 1 ? 'día' : 'días');
    setText('[data-cd-d]', pad(d));
    setText('[data-cd-h]', pad(h));
    setText('[data-cd-m]', pad(m));
    setText('[data-cd-s]', pad(sec));
    var sr = root.querySelector('[data-countdown-sr]');
    if (sr) sr.textContent = 'Faltan ' + d + (d === 1 ? ' día' : ' días') + ' para el inicio del ' + label + '.';
  }
  renderIntake();
  if (pill) pill.hidden = false;
  if (cdBox) cdBox.hidden = false;
  // Los segundos solo corren mientras la cuenta regresiva está en pantalla.
  var tickTimer = null;
  watchVisible(cdBox, function (v) {
    if (v && !tickTimer) tickTimer = setInterval(renderIntake, 1000);
    if (!v && tickTimer) { clearInterval(tickTimer); tickTimer = null; }
  });
  setInterval(function () { if (!tickTimer) renderIntake(); }, 60000);

  /* --- Utilidades ------------------------------------------------------------ */
  function throttle(fn) {
    var waiting = false;
    return function () {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(function () { waiting = false; fn(); });
    };
  }
})();
