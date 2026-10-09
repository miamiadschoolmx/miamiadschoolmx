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
    // Query key del campo "Me interesa" en el formulario de GHL, para prellenarlo.
    prefillParam: 'me_interesa',
    programLabels: {
      'art-direction': 'Art Direction',
      'copywriting': 'Copywriting',
      'no-se': 'Aún no sé'
    },
    // Valores del parámetro ?paso= que GHL agrega al redirigir (ver README-GHL.md · paso 8).
    stageParam: 'paso'
  };

  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var canObserve = 'IntersectionObserver' in window;

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

    // Meta Pixel (navegador). Usa eventId para deduplicar con la API de Conversiones (CAPI):
    // if (window.fbq) window.fbq('trackCustom', name, payload.detail, { eventID: name + '-' + payload.ts });
    // Eventos estándar sugeridos: lead_submit -> 'Lead'; appointment_booked -> 'Schedule'.

    // GA4 (gtag.js):
    // if (window.gtag) window.gtag('event', name, payload.detail);

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
    if (window.history && history.replaceState) history.replaceState(null, '', '#' + id);
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

    poster.addEventListener('click', function () {
      var src = (player.getAttribute('data-vsl-src') || '').trim();
      if (!src || src.indexOf('REEMPLAZAR') === 0) {
        notice.textContent = 'Aquí se reproducirá la VSL cuando se configure su URL.';
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
    if ((m = src.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/))) {
      return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&playsinline=1';
    }
    if ((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/))) {
      return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&title=0&byline=0&portrait=0';
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
    track_.addEventListener('scroll', throttle(sync), { passive: true });
    window.addEventListener('resize', throttle(sync), { passive: true });
    requestAnimationFrame(sync);
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
  var processEl = root.querySelector('.mas-process');
  function measureProcess() {
    if (!processEl) return;
    var items = processEl.querySelectorAll('.mas-process__steps li');
    var dot = processEl.querySelector('.mas-process__dot');
    if (!items.length || !dot) return;
    // En móvil el proceso es vertical y el punto no viaja (ver CSS).
    var distance = items[items.length - 1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
    processEl.style.setProperty('--track', Math.max(0, Math.round(distance)) + 'px');
  }
  requestAnimationFrame(measureProcess);
  window.addEventListener('resize', throttle(measureProcess), { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureProcess);

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
  function fitAll() {
    for (var f = 0; f < fits.length; f++) {
      var el = fits[f];
      el.style.fontSize = '';
      var avail = el.clientWidth;
      var need = el.scrollWidth;
      // data-fit="fill" además crece hasta ocupar todo el ancho.
      if (avail > 0 && (need > avail || el.getAttribute('data-fit') === 'fill')) {
        var size = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = Math.floor(size * (avail / need) * 0.98) + 'px';
      }
    }
  }
  if (fits.length) {
    requestAnimationFrame(fitAll);
    window.addEventListener('resize', throttle(fitAll), { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  }

  /* --- Motor de scroll: progreso, cinta y líneas que se encienden ----------- */
  var progress = root.querySelector('.mas-progress');
  var tickerRow = root.querySelector('[data-ticker]');
  var glowItems = root.querySelectorAll('[data-glow] > *');
  var motionOK = !mqReduce.matches;
  var ticking = false;

  function onScroll() {
    ticking = false;
    var vh = window.innerHeight;
    if (progress) {
      var rect = root.getBoundingClientRect();
      var total = rect.height - vh;
      var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progress.style.setProperty('--p', p.toFixed(4));
    }
    if (tickerRow && motionOK) {
      // La cinta avanza con el scroll (no se mueve sola), así que no necesita botón de pausa.
      var copy = tickerRow.scrollWidth / 3;
      var x = copy ? (window.pageYOffset * 0.45) % copy : 0;
      tickerRow.style.setProperty('--x', x.toFixed(1));
    }
    if (glowItems.length && root.classList.contains('has-motion')) {
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
  requestAnimationFrame(onScroll);

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
