/* ==========================================================================
   Miami Ad School México · Landing VSL
   JavaScript vanilla, sin dependencias. Se carga con defer y no bloquea el render.
   ========================================================================== */
(function () {
  'use strict';

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

  /* --- Arranque ------------------------------------------------------------
     En GHL, el HTML del elemento Custom Code y este script llegan en momentos
     distintos (la página se «hidrata» y «Optimize JavaScript» puede retrasarla).
     Por eso el script espera a que exista el bloque .mas-vsl y arranca una sola
     vez por bloque. Si GHL vuelve a dibujar el bloque, el nuevo también arranca. */
  function start() {
    var el = document.querySelector('.mas-vsl');
    if (el && el.getAttribute('data-ready') !== '1') init(el);
  }
  var queued = false;
  function queueStart() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; start(); });
  }
  start();
  document.addEventListener('hydrationDone', start);
  document.addEventListener('DOMContentLoaded', start);
  window.addEventListener('load', start);
  if ('MutationObserver' in window) {
    var watcher = new MutationObserver(queueStart);
    watcher.observe(document.documentElement, { childList: true, subtree: true });
    // Solo vigila mientras la página termina de armarse.
    setTimeout(function () { watcher.disconnect(); }, 30000);
  }

  var stopPrevious = null;

  function init(root) {
    root.setAttribute('data-ready', '1');
    root.classList.add('has-js');

    // Si GHL vuelve a dibujar el bloque, la instancia anterior se apaga:
    // sin listeners ni relojes duplicados (y sin eventos contados dos veces).
    if (stopPrevious) stopPrevious();
    var life = typeof AbortController === 'function' ? new AbortController() : null;
    var timers = [];
    stopPrevious = function () {
      if (life) life.abort();
      timers.forEach(clearInterval);
      if (tickTimer) clearInterval(tickTimer);
    };
    function on(target, type, fn, opts) {
      var o = opts && typeof opts === 'object' ? opts : { capture: !!opts };
      if (life) o.signal = life.signal;
      target.addEventListener(type, fn, o);
    }

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
      if (name === 'social_click' && el.getAttribute('aria-disabled') !== 'true') {
        track(name, { network: el.getAttribute('data-social') });
      }
    });

    /* --- Programa elegido ---------------------------------------------------- */
    var chips = root.querySelectorAll('.mas-chip[data-program]');

    function setProgram(program, source) {
      if (!Object.prototype.hasOwnProperty.call(CONFIG.programLabels, program)) return;
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
    var poster = player && player.querySelector('.mas-player__poster');
    if (player && poster) {
      var notice = player.querySelector('.mas-player__notice');
      var duration = player.querySelector('[data-vsl-duration]');
      var vslSrc = String(CONFIG.vslUrl || '').trim();
      if (duration && CONFIG.vslDuration) {
        duration.textContent = 'Duración: ' + CONFIG.vslDuration;
        duration.hidden = false;
      }

      // Carga diferida: el iframe o el <video> se crean solo al hacer clic, así que antes
      // no se descarga nada de YouTube, Vimeo ni del .mp4.
      // Sin URL o con una que no se reconoce: el póster se queda y aparece un aviso amable, nunca un error.
      var say = function (msg) {
        if (!notice) return;
        notice.hidden = false;
        // Se llena un instante después de mostrarse para que el lector de pantalla lo anuncie.
        setTimeout(function () { notice.textContent = msg; }, 60);
      };
      poster.addEventListener('click', function () {
        var src = vslSrc;
        var isFile = /\.(mp4|webm|m4v|mov)(\?|#|$)/i.test(src);
        var embed = src && !isFile ? toEmbed(src) : null;
        if (!src || (!isFile && !embed)) {
          if (src && window.console) console.warn('[landing] CONFIG.vslUrl no es un enlace de YouTube, Vimeo ni un video .mp4:', src);
          say('El video estará disponible muy pronto.');
          return;
        }
        var title = player.getAttribute('data-vsl-title') || 'Video';
        var media;

        if (isFile) {
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
          media.src = embed;
          media.title = title;
          media.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
          media.setAttribute('allowfullscreen', '');
          media.referrerPolicy = 'strict-origin-when-cross-origin';
          // vsl_50_percent y vsl_complete en YouTube/Vimeo requieren su API de reproductor
          // (YouTube IFrame API / Vimeo Player SDK). Ver README-GHL.md · paso 10.
        }

        player.appendChild(media);
        poster.hidden = true;
        if (notice) notice.hidden = true;
        trackOnce('vsl_play', { src: src });
        if (media.tagName === 'VIDEO') {
          var p = media.play();
          if (p && p.catch) p.catch(function () { /* el navegador pidió interacción: quedan los controles */ });
        }
        media.focus();
      });
    }

    // Convierte enlaces de YouTube y Vimeo a su URL de inserción con autoplay; si no reconoce
    // el enlace, devuelve null. El autoplay solo ocurre después del clic de la persona.
    function toEmbed(src) {
      var m, start = startSeconds(src);
      var list = (src.match(/[?&]list=([\w-]+)/) || [])[1];
      if (/youtube\.com\/embed\/videoseries/.test(src) && list) {
        return 'https://www.youtube-nocookie.com/embed/videoseries?list=' + list + '&autoplay=1&rel=0&playsinline=1';
      }
      if ((m = src.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})(?![\w-])/))) {
        return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&playsinline=1' + (start ? '&start=' + start : '');
      }
      if ((m = src.match(/vimeo\.com\/(?:.*\/)?(\d{6,})(?:\/([\da-f]{6,}))?/))) {
        // Videos privados u ocultos de Vimeo traen un hash (vimeo.com/123/abc o ?h=abc).
        var hash = m[2] || (src.match(/[?&]h=([\da-f]+)/) || [])[1];
        return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&title=0&byline=0&portrait=0' + (hash ? '&h=' + hash : '') + (start ? '#t=' + start + 's' : '');
      }
      return null;
    }
    // Segundo de inicio de ?t=90, ?t=1m30s, &start=90 o #t=90s.
    function startSeconds(src) {
      var t = (src.match(/[?&#](?:t|start)=([\dhms]+)/) || [])[1];
      if (!t) return 0;
      if (/^\d+$/.test(t)) return Number(t);
      var h = /(\d+)h/.exec(t), mi = /(\d+)m/.exec(t), s = /(\d+)s/.exec(t);
      return (h ? h[1] * 3600 : 0) + (mi ? mi[1] * 60 : 0) + (s ? Number(s[1]) : 0);
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
      on(window, 'resize', throttle(sync), { passive: true });
      whenNear(track_, sync);
    }

    /* --- Etapas: formulario → agenda → confirmación ---------------------------
       No hay envíos simulados. La etapa la decide GHL al redirigir con ?paso=agenda
       (después de enviar el formulario) o ?paso=confirmado (después de agendar). */
    var params;
    try { params = new URLSearchParams(location.search); } catch (e) { params = null; }
    var stage = params ? params.get(CONFIG.stageParam) : null;
    var reviewing = !!(params && params.has('revisar'));
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
      // En modo revisión (?revisar=1) no se registra nada: no es un lead real.
      if (value === 'agenda' && !reviewing) {
        onceStorage('lead_submit');
      }
      if (value === 'confirmado') {
        if (!reviewing) onceStorage('appointment_booked');
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
    on(window, 'blur', function () {
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
          // 40 % del bloque o, si el bloque es más alto que la pantalla, 40 % de la pantalla.
          if (entry.intersectionRatio < 0.4 && entry.intersectionRect.height < window.innerHeight * 0.4) return;
          trackOnce(entry.target.getAttribute('data-event-view'));
          viewObserver.unobserve(entry.target);
        });
      }, { threshold: [0, 0.1, 0.2, 0.3, 0.4] });
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
      on(window, 'resize', throttle(refit), { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
    }

    /* --- Logos de agencias: dos filas que avanzan con el scroll -----------------
       Cada fila se duplica para dar la vuelta sin saltos; la segunda va en sentido
       contrario. No se mueven solas (por eso no necesitan botón de pausa) y las
       flechas las adelantan o regresan. Sin JS o con movimiento reducido, los
       logos se quedan quietos en una cuadrícula y las flechas no aparecen. */
    var logos = root.querySelector('[data-logos]');
    var logoTracks = logos ? Array.prototype.slice.call(logos.querySelectorAll('.mas-logos__track')) : [];
    var logoRows = [], logosOn = false, logoNudge = 0, logoTarget = 0, logoAnim = 0;
    function measureLogos() {
      logoRows.forEach(function (row) { fillRow(row); row.half = row.el.offsetWidth / 2; });
    }
    // Primera mitad: copias suficientes para cubrir la pantalla más ancha. Luego se duplica entera,
    // así el salto del final al inicio no se nota. Se rehace si la ventana crece o se aleja el zoom.
    function fillRow(row) {
      var span = Math.max(logos.clientWidth, window.innerWidth, (window.screen && window.screen.width) || 0);
      var setWidth = 0;
      row.originals.forEach(function (li) { setWidth += li.offsetWidth; });
      if (!setWidth) return false;
      var copies = Math.max(1, Math.ceil(span / setWidth));
      if (copies <= row.copies) return true;
      row.copies = copies;
      while (row.el.children.length > row.originals.length) row.el.removeChild(row.el.lastChild);
      var append = function (items) {
        items.forEach(function (li) {
          var copy = li.cloneNode(true);
          copy.setAttribute('aria-hidden', 'true');
          copy.removeAttribute('data-placeholder');
          // Las copias quedan fuera de la vista hasta que la fila avanza: que carguen ya, no al entrar.
          var img = copy.querySelector('img');
          if (img) img.loading = 'eager';
          row.el.appendChild(copy);
        });
      };
      for (var lc = 1; lc < copies; lc++) append(row.originals);
      append(Array.prototype.slice.call(row.el.children));
      return true;
    }
    function placeLogos() {
      var base = window.pageYOffset * 0.35 + logoNudge;
      logoRows.forEach(function (row) {
        if (!row.half) return;
        var x = ((base % row.half) + row.half) % row.half;
        if (row.dir < 0) x = row.half - x;
        row.el.style.setProperty('--lx', x.toFixed(1));
      });
    }
    function nudgeLogos(dir) {
      var view = logos.querySelector('.mas-logos__viewport');
      logoTarget += dir * Math.max(240, (view ? view.clientWidth : 600) * 0.6);
      if (logoAnim) return;
      var step = function () {
        var diff = logoTarget - logoNudge;
        if (Math.abs(diff) < 0.5) { logoNudge = logoTarget; logoAnim = 0; placeLogos(); return; }
        logoNudge += diff * 0.14;
        placeLogos();
        logoAnim = requestAnimationFrame(step);
      };
      logoAnim = requestAnimationFrame(step);
    }
    if (logoTracks.length && root.classList.contains('has-motion')) {
      whenNear(logos, function () {
        logoTracks.forEach(function (track) {
          var originals = Array.prototype.slice.call(track.children);
          if (originals.length < 2) return;
          var row = { el: track, originals: originals, copies: 0, half: 0, dir: track.getAttribute('data-dir') === '-1' ? -1 : 1 };
          if (fillRow(row)) logoRows.push(row);
        });
        if (!logoRows.length) return;
        Array.prototype.forEach.call(logos.querySelectorAll('.mas-logos__track img'), function (img) { img.loading = 'eager'; });
        logos.classList.add('is-looping');
        measureLogos();
        placeLogos();
        on(window, 'resize', throttle(function () { measureLogos(); placeLogos(); }), { passive: true });
        var nav = logos.querySelector('[data-logos-nav]');
        var prevBtn = logos.querySelector('[data-logos-prev]');
        var nextBtn = logos.querySelector('[data-logos-next]');
        if (nav && prevBtn && nextBtn) {
          nav.hidden = false;
          prevBtn.addEventListener('click', function () { nudgeLogos(-1); });
          nextBtn.addEventListener('click', function () { nudgeLogos(1); });
        }
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
    var tickerOn = false, glowOn = false, tickerLen = 0;
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
        if (!tickerLen) {
          var kids = tickerRow.children, third = kids[kids.length / 3];
          tickerLen = third && kids.length % 3 === 0 ? third.offsetLeft - kids[0].offsetLeft : tickerRow.scrollWidth / 3;
        }
        var copy = tickerLen;
        var x = copy ? (window.pageYOffset * 0.45) % copy : 0;
        tickerRow.style.setProperty('--x', x.toFixed(1));
      }
      if (logosOn && logoRows.length) placeLogos();
      if (glowOn && glowItems.length && root.classList.contains('has-motion')) {
        for (var g = 0; g < glowItems.length; g++) {
          var top = glowItems[g].getBoundingClientRect().top;
          glowItems[g].classList.toggle('is-lit', top < vh * 0.62);
        }
      }
    }
    on(window, 'scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    on(window, 'resize', throttle(function () { tickerLen = 0; onScroll(); }), { passive: true });

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
      on(document, 'mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        cursor.classList.remove('is-hidden');
        if (!running) { running = true; requestAnimationFrame(loop); }
      }, { passive: true });
      on(document.documentElement, 'mouseleave', function () { cursor.classList.add('is-hidden'); });
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
      var endDrag = function () {
        if (!down) return;
        down = false;
        setTimeout(function () { dragEl.classList.remove('is-dragging'); }, 0);
      };
      // Sin esto, el navegador arrastra el enlace como archivo y cancela el gesto.
      dragEl.addEventListener('dragstart', function (e) { e.preventDefault(); });
      dragEl.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = dragEl.scrollLeft;
      });
      on(window, 'pointermove', function (e) {
        if (!down) return;
        if (!(e.buttons & 1)) { endDrag(); return; }
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; dragEl.classList.add('is-dragging'); }
        if (moved) dragEl.scrollLeft = startLeft - dx;
      });
      on(window, 'pointerup', endDrag);
      on(window, 'pointercancel', endDrag);
      // Si hubo arrastre, el clic no abre el book.
      dragEl.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    }

    /* --- Próximo inicio y cuenta regresiva -----------------------------------
       Real: cuenta hacia la siguiente fecha de CONFIG.intakes. No se reinicia por
       visitante y salta sola al siguiente inicio cuando cierra el actual. */
    var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var DAY = 86400000;
    var intakeList = CONFIG.intakes.slice().sort(function (p, q) { return p.month - q.month || p.day - q.day; });
    function nextIntake(now) {
      var y = new Date(now).getUTCFullYear();
      for (var yy = y; yy <= y + 1; yy++) {
        for (var n = 0; n < intakeList.length; n++) {
          var it = intakeList[n];
          var t = Date.UTC(yy, it.month, it.day, -CONFIG.intakeUtcOffsetHours, 0, 0);
          if (t - CONFIG.intakeCutoffDays * DAY > now) return { t: t, year: yy, index: CONFIG.intakes.indexOf(it), month: it.month, day: it.day };
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
    timers.push(setInterval(function () { if (!tickTimer) renderIntake(); }, 60000));

    /* --- Revisión antes de publicar (?revisar=1) -------------------------------
       Solo aparece si la URL lleva ?revisar=1 (por ejemplo, tufuturocreativo.com/entrevista?revisar=1).
       Revisa en la página real de GHL lo que suele fallar al montarla. No envía nada a ningún lado. */
    if (params && params.has('revisar')) {
      if (document.readyState === 'complete') setTimeout(runReview, 400);
      else on(window, 'load', function () { setTimeout(runReview, 400); });
    }

    function runReview() {
      if (root.querySelector('.mas-review')) return;
      var rows = [];
      var add = function (level, title, detail) { rows.push({ level: level, title: title, detail: detail }); };
      var isLocal = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname);
      var imgs = Array.prototype.slice.call(root.querySelectorAll('img'));
      // Carga todas las imágenes para poder revisarlas (solo en este modo).
      var waits = imgs.map(function (img) {
        img.loading = 'eager';
        return img.complete ? null : new Promise(function (ok) {
          img.addEventListener('load', ok); img.addEventListener('error', ok); setTimeout(ok, 6000);
        });
      }).filter(Boolean);
      var fontsReady = document.fonts && document.fonts.load
        ? Promise.all([
            document.fonts.load('700 1em "Obviously Narrow"').catch(function () {}),
            document.fonts.load('400 1em "Archivo Variable"').catch(function () {})
          ])
        : Promise.resolve();
      Promise.all(waits.concat([fontsReady])).then(function () {

        // 1. Video
        var v = String(CONFIG.vslUrl || '').trim();
        if (!v) add('falta', 'Video (VSL)', 'Falta la URL. Pégala en CONFIG.vslUrl, al inicio del JS (paso 7).');
        else if (/\.(mp4|webm|m4v|mov)(\?|#|$)/i.test(v)) add('ok', 'Video (VSL)', 'Archivo de video propio.');
        else if (/youtube-nocookie/.test(toEmbed(v) || '')) add('ok', 'Video (VSL)', 'YouTube.');
        else if (/player\.vimeo/.test(toEmbed(v) || '')) add('ok', 'Video (VSL)', 'Vimeo.');
        else add('falta', 'Video (VSL)', 'No reconozco la URL. Usa un enlace de YouTube, de Vimeo o un .mp4 (paso 7).');

        // 2. Formulario y calendario de GHL
        var slotState = function (id, name, step) {
          var slot = document.getElementById(id);
          if (!slot) { add('falta', name, 'No encuentro el espacio #' + id + '. No cambies ese id.'); return false; }
          if (slot.querySelector('iframe, form')) { add('ok', name, 'Insertado.'); return true; }
          add('falta', name, 'El espacio sigue con el aviso «REEMPLAZAR». Pega el código de inserción (' + step + ').');
          return false;
        };
        var hasForm = slotState('ghl-form-slot', 'Formulario', 'paso 8');
        var hasCal = slotState('ghl-calendar-slot', 'Calendario', 'paso 9');
        if (hasForm || hasCal) {
          if (document.querySelector('script[src*="form_embed"]')) add('ok', 'Script de formularios de GHL', 'form_embed.js está en la página.');
          else add('aviso', 'Script de formularios de GHL', 'No encuentro form_embed.js. Pégalo una vez en Tracking Code → Footer, antes del script de la landing, nunca dentro del bloque .mas-vsl (paso 8).');
        }

        // 3. Imágenes
        var broken = [], localPaths = 0;
        imgs.forEach(function (img) {
          var src = img.getAttribute('src') || '';
          if (/^(\.\/)?img\//.test(src) || /(^|,\s*)(\.\/)?img\//.test(img.getAttribute('srcset') || '')) localPaths++;
          if (!img.naturalWidth) broken.push(decodeURIComponent(src.split('/').pop() || '(sin src)'));
        });
        var uniq = broken.filter(function (b, i) { return broken.indexOf(b) === i; });
        if (uniq.length) add('falta', 'Imágenes', uniq.length + ' no cargan: ' + uniq.slice(0, 8).join(', ') + (uniq.length > 8 ? '…' : '') + '. Revisa sus URLs de GHL (paso 6).');
        else if (localPaths && !isLocal) add('falta', 'Imágenes', localPaths + ' imágenes siguen con la ruta img/… Cámbialas por las URLs de la biblioteca de medios (paso 6).');
        else add('ok', 'Imágenes', 'Las ' + imgs.length + ' imágenes cargan.');

        // 4. Fuentes
        var faces = {};
        if (document.fonts && document.fonts.forEach) {
          document.fonts.forEach(function (f) {
            var fam = String(f.family).replace(/["']/g, '');
            if (!faces[fam] || f.status === 'loaded') faces[fam] = f.status;
          });
        }
        var obv = faces['Obviously Narrow'];
        if (!obv) add('aviso', 'Fuente de marca (Obviously Narrow)', 'No está conectada: los titulares usan Archivo de respaldo (paso 4).');
        else if (obv !== 'loaded') add('falta', 'Fuente de marca (Obviously Narrow)', 'Está en el CSS pero no carga. Revisa la URL del .woff en GHL (paso 4).');
        else {
          var weight = getComputedStyle(root).getPropertyValue('--display-weight').trim();
          if (weight === '800') add('aviso', 'Fuente de marca (Obviously Narrow)', 'Carga bien. Cambia --display-weight de 800 a 700 en el CSS (paso 4).');
          else add('ok', 'Fuente de marca (Obviously Narrow)', 'Carga bien.');
        }
        var arc = faces['Archivo Variable'];
        if (arc === 'loaded') add('ok', 'Fuente de texto (Archivo)', 'Carga bien.');
        else add('falta', 'Fuente de texto (Archivo)', 'No carga: el texto usa la fuente del sistema. Revisa su URL en el CSS (paso 4).');

        // 5. Contenido pendiente que se vería en la página
        var labels = {
          'P-01': 'Logo oficial (hoy hay uno provisional)', 'P-06': 'Portada de los books', 'P-07': 'Testimonio',
          'P-08': 'Foto de Ricardo', 'P-17': 'Puesto actual de los graduados'
        };
        var counts = {};
        Array.prototype.forEach.call(root.querySelectorAll('[data-placeholder]'), function (el) {
          var code = el.getAttribute('data-placeholder');
          if (!labels[code]) return;
          var waiting = code === 'P-01'
            ? /logo-mas-300/.test((el.querySelector('img') || {}).src || '')
            : !el.querySelector('img, iframe, video') && /pendiente|REEMPLAZAR|Aquí va|^\s*Foto\s*$/i.test(el.textContent);
          if (waiting) counts[code] = (counts[code] || 0) + 1;
        });
        Object.keys(labels).forEach(function (code) {
          if (counts[code]) add(code === 'P-01' ? 'aviso' : 'falta', labels[code], (counts[code] > 1 ? counts[code] + ' espacios' : 'Pendiente') + ' · ' + code + ' en CONTENT-PLACEHOLDERS.md.');
        });
        if (!Object.keys(counts).length) add('ok', 'Contenido pendiente', 'No queda ningún espacio pendiente visible.');
        var legal = root.querySelectorAll('.mas-footer__legal a[href^="REEMPLAZAR"]').length;
        if (legal) add('falta', 'Aviso de privacidad y términos', legal + ' enlaces siguen con REEMPLAZAR (P-12).');
        else add('ok', 'Aviso de privacidad y términos', 'Con URL real.');
        var social = root.querySelectorAll('.mas-footer__social a[href^="REEMPLAZAR"]').length;
        if (social) add('falta', 'Redes sociales del footer', social + ' enlaces siguen con REEMPLAZAR (P-18).');
        else add('ok', 'Redes sociales del footer', 'Con URL real.');

        // 6. Cómo quedó montada la sección en GHL
        var vw = document.documentElement.clientWidth, rw = root.getBoundingClientRect().width;
        if (rw < vw - 2) add('falta', 'Ancho de la sección', 'La landing mide ' + Math.round(rw) + ' px y la pantalla ' + vw + ' px. Pon la sección, la fila y la columna a ancho completo y padding 0 (paso 2).');
        else add('ok', 'Ancho de la sección', 'Ocupa todo el ancho.');
        var traps = [];
        for (var n = root.parentElement; n && n !== document.documentElement; n = n.parentElement) {
          var cs = getComputedStyle(n);
          var bad = (/(hidden|auto|scroll)/.test(cs.overflowX + cs.overflowY) ? 'overflow ' : '') +
            (cs.transform !== 'none' || cs.filter !== 'none' || cs.perspective !== 'none' ? 'transform/filter ' : '');
          if (bad) traps.push((n.id ? '#' + n.id : n.tagName.toLowerCase() + (n.classList[0] ? '.' + n.classList[0] : '')) + ' (' + bad.trim() + ')');
        }
        if (traps.length) add('aviso', 'Contenedores de GHL', 'Pueden romper las tarjetas fijas al hacer scroll y el punto del cursor: ' + traps.slice(0, 4).join(', ') + '. Si ves algo raro, quita esos ajustes de la sección (paso 2).');
        else add('ok', 'Contenedores de GHL', 'Sin overflow ni transform que estorben.');
        var se = document.scrollingElement || document.documentElement;
        if (se.scrollHeight <= window.innerHeight + 4 && root.offsetHeight > window.innerHeight * 1.5) add('falta', 'Scroll de la página', 'La página se desplaza dentro de un contenedor y no en la ventana: el slider de logos y las animaciones no se moverán.');

        // 7. Datos para confirmar
        add(TRACKING_ENABLED ? 'aviso' : 'ok', 'Medición', TRACKING_ENABLED ? 'Encendida: confirma en Meta y GA4 que los eventos no se dupliquen (paso 10).' : 'Apagada, como debe estar hasta conectar el píxel nuevo (paso 10).');
        var next = nextIntake(Date.now());
        if (next) add('info', 'Próximo inicio que muestra la página', next.day + ' de ' + MONTHS[next.month] + ' de ' + next.year + '. El contador cambia al siguiente ' + CONFIG.intakeCutoffDays + ' días antes (cierre de admisión).');
        if (!document.title) add('aviso', 'Título SEO', 'La página no tiene título (paso 1).');
        if (!document.querySelector('meta[property="og:image"]')) add('aviso', 'Imagen para compartir', 'No encuentro og:image. Súbela en Settings de la página (paso 1).');

        showReview(rows);
      });
    }

    function showReview(rows) {
      var tags = { falta: 'Falta', aviso: 'Revisar', ok: 'Bien', info: 'Dato' };
      var order = { falta: 0, aviso: 1, info: 2, ok: 3 };
      rows.sort(function (a, b) { return order[a.level] - order[b.level]; });
      var tally = { falta: 0, aviso: 0, ok: 0 };
      rows.forEach(function (r) { if (tally[r.level] !== undefined) tally[r.level]++; });
      var make = function (tag, cls, text) {
        var el = document.createElement(tag);
        if (cls) el.className = cls;
        if (text) el.textContent = text;
        return el;
      };
      var box = make('aside', 'mas-review');
      box.setAttribute('aria-label', 'Revisión antes de publicar');
      var head = make('div', 'mas-review__head');
      head.appendChild(make('h2', 'mas-review__title', 'Revisión antes de publicar'));
      var close = make('button', 'mas-review__close', 'Cerrar');
      close.type = 'button';
      close.addEventListener('click', function () { box.remove(); });
      head.appendChild(close);
      box.appendChild(head);
      box.appendChild(make('p', 'mas-review__sum', tally.falta + ' por resolver · ' + tally.aviso + ' por revisar · ' + tally.ok + ' bien'));
      var list = make('ul', 'mas-review__list');
      list.setAttribute('role', 'list');
      rows.forEach(function (r) {
        var li = make('li', 'mas-review__row is-' + r.level);
        li.appendChild(make('span', 'mas-review__tag', tags[r.level]));
        var txt = make('span', 'mas-review__txt');
        txt.appendChild(make('strong', null, r.title));
        txt.appendChild(make('span', null, r.detail));
        li.appendChild(txt);
        list.appendChild(li);
      });
      box.appendChild(list);
      var links = make('p', 'mas-review__links');
      [['Ver etapa agenda', 'agenda'], ['Ver etapa confirmado', 'confirmado']].forEach(function (l) {
        var a = make('a', null, l[0]);
        a.href = location.pathname + '?' + CONFIG.stageParam + '=' + l[1] + '&revisar=1#aplicar';
        links.appendChild(a);
      });
      box.appendChild(links);
      box.appendChild(make('p', 'mas-review__foot', 'Solo tú ves esto: aparece con ?revisar=1 en la URL. No envía nada.'));
      root.appendChild(box);
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
  }
})();
