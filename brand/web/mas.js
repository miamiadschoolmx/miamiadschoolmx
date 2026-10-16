/* Miami Ad School México — componentes HTML del sistema visual.
   Requiere mas-data.js antes de este archivo. Componentes:

   <mas-mdot v="12" m="black" dot="yellow-7548" dot-dx="0" dot-dy="0" dot-scale="1" rotate="0" align="xMidYMid">
       Una de las 30 variantes oficiales del M-dot. Colores: token (pink-238, yellow-7548…) o hex.
       dot-dx / dot-dy mueven el punto (fracción del ancho del M-dot) para separarlo del "M".
   <mas-wordmark color="black">      Wordmark "MIAMI AD / SCHOOL" vectorial (altura = alto del elemento).
   <mas-lockup m="pink-2040" dot="orange-1495" text="pink-2040">  Lockup M-dot + wordmark (cierre de post).
   <mas-pattern layers='[{"v":3,"x":0,"y":0,"s":1,"r":0,"fill":"black"}, …]' overlap="green-568" dot="yellow-7548">
       Patrón de M-dots con intersecciones coloreadas (técnica "Pathfinder → Divide" del manual).

   data-fit en un headline: escala el font-size para llenar el ancho de su caja (líneas con <br>).
   data-fit="both": además limita por alto. data-fit-max="320" pone tope en px.

   Al terminar marca <html data-mas-ready="1"> (el renderer espera esto). */
(() => {
  const D = window.MAS_DATA;
  if (!D) throw new Error('Carga brand/web/mas-data.js antes de mas.js');
  const NS = 'http://www.w3.org/2000/svg';
  const color = (v, fallback) => (!v ? fallback : v.startsWith('#') || v.startsWith('rgb') || v === 'none' || v === 'currentColor' ? v : D.colors[v] || v);
  const mdot = (v) => D.mdots.find((m) => m.id === Number(v)) || D.mdots[0];
  const el = (name, attrs = {}) => {
    const n = document.createElementNS(NS, name);
    for (const [k, val] of Object.entries(attrs)) if (val != null) n.setAttribute(k, val);
    return n;
  };

  class MasMdot extends HTMLElement {
    static get observedAttributes() { return ['v', 'm', 'dot', 'dot-dx', 'dot-dy', 'dot-scale', 'rotate', 'align']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const a = (k, d) => this.getAttribute(k) ?? d;
      const md = mdot(a('v', 1));
      const svg = el('svg', { viewBox: `0 0 ${md.w} ${md.h}`, preserveAspectRatio: `${a('align', 'xMidYMid')} meet` });
      const g = el('g', { transform: `rotate(${a('rotate', 0)} ${md.w / 2} ${md.h / 2})` });
      g.append(el('path', { d: md.d, fill: color(a('m'), '#000'), class: 'm' }));
      const dx = Number(a('dot-dx', 0)) * md.w, dy = Number(a('dot-dy', 0)) * md.w;
      g.append(el('circle', { class: 'dot', cx: md.dot.cx + dx, cy: md.dot.cy + dy, r: md.dot.r * Number(a('dot-scale', 1)), fill: color(a('dot'), D.colors['pink-238']) }));
      svg.append(g);
      this.replaceChildren(svg);
    }
  }

  const pathsSvg = (vb, paths, fill) => {
    const svg = el('svg', { viewBox: vb });
    const g = el('g', { fill });
    for (const d of paths) g.append(el('path', { d }));
    svg.append(g);
    return svg;
  };

  class MasWordmark extends HTMLElement {
    connectedCallback() {
      this.replaceChildren(pathsSvg(D.wordmark.viewBox, D.wordmark.wordmark, color(this.getAttribute('color'), '#000')));
      this.setAttribute('role', 'img'); this.setAttribute('aria-label', 'Miami Ad School');
    }
  }

  class MasLockup extends HTMLElement {
    connectedCallback() {
      const L = D.lockup;
      const svg = el('svg', { viewBox: L.viewBox });
      svg.append(el('path', { d: L.m, class: 'm', fill: color(this.getAttribute('m'), '#000') }));
      svg.append(el('path', { d: L.dot, class: 'dot', fill: color(this.getAttribute('dot'), D.colors['orange-1495']) }));
      const g = el('g', { class: 'wordmark', fill: color(this.getAttribute('text') || this.getAttribute('m'), '#000') });
      for (const d of L.wordmark) g.append(el('path', { d }));
      svg.append(g);
      this.replaceChildren(svg);
      this.setAttribute('role', 'img'); this.setAttribute('aria-label', 'Miami Ad School');
    }
  }

  // Patrón: cada capa es un M-dot transformado; las intersecciones entre capas se pintan con `overlap`
  // (o un color por par vía overlaps:[...]). Los dots se dibujan encima y nunca se recortan.
  class MasPattern extends HTMLElement {
    connectedCallback() {
      const layers = JSON.parse(this.getAttribute('layers') || '[]');
      const overlaps = JSON.parse(this.getAttribute('overlaps') || 'null');
      const vb = this.getAttribute('viewbox') || '0 0 1000 1000';
      const svg = el('svg', { viewBox: vb, preserveAspectRatio: 'xMidYMid slice' });
      const defs = el('defs'); svg.append(defs);
      const uid = Math.random().toString(36).slice(2, 8);
      const tf = (L, md) => `translate(${L.x || 0} ${L.y || 0}) rotate(${L.r || 0} ${(md.w * (L.s || 1)) / 2} ${(md.h * (L.s || 1)) / 2}) scale(${L.s || 1})`;
      layers.forEach((L, i) => {
        const md = mdot(L.v);
        const cp = el('clipPath', { id: `c${uid}${i}` });
        cp.append(el('path', { d: md.d, transform: tf(L, md) }));
        defs.append(cp);
        svg.append(el('path', { d: md.d, transform: tf(L, md), fill: color(L.fill, '#000') }));
      });
      let k = 0;
      for (let i = 0; i < layers.length; i++) for (let j = i + 1; j < layers.length; j++) {
        const Lj = layers[j], mdj = mdot(Lj.v);
        const fill = color(overlaps ? overlaps[k % overlaps.length] : this.getAttribute('overlap'), D.colors['green-568']);
        k++;
        svg.append(el('path', { d: mdj.d, transform: tf(Lj, mdj), fill, 'clip-path': `url(#c${uid}${i})` }));
      }
      layers.forEach((L) => {
        if (L.dot === false) return;
        const md = mdot(L.v);
        const s = L.s || 1;
        const g = el('g', { transform: tf(L, md) });
        g.append(el('circle', { cx: md.dot.cx + (L.ddx || 0) * md.w, cy: md.dot.cy + (L.ddy || 0) * md.w, r: md.dot.r * (L.ds || 1), fill: color(L.dotFill || this.getAttribute('dot'), D.colors['yellow-7548']) }));
        svg.append(g);
      });
      this.replaceChildren(svg);
    }
  }

  customElements.define('mas-mdot', MasMdot);
  customElements.define('mas-wordmark', MasWordmark);
  customElements.define('mas-lockup', MasLockup);
  customElements.define('mas-pattern', MasPattern);

  // Ajusta headlines a su caja. Búsqueda binaria sobre font-size.
  function fit(root = document) {
    for (const n of root.querySelectorAll('[data-fit]')) {
      const both = n.dataset.fit === 'both';
      const max = Number(n.dataset.fitMax || 1200), min = Number(n.dataset.fitMin || 12);
      const fits = () => n.scrollWidth <= n.clientWidth + 0.5 && (!both || n.scrollHeight <= n.clientHeight + 0.5);
      let lo = min, hi = max;
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        n.style.fontSize = mid + 'px';
        if (fits()) lo = mid; else hi = mid;
      }
      n.style.fontSize = Math.floor(lo * 10) / 10 + 'px';
    }
  }

  window.MAS = { data: D, color, mdot, fit };

  const ready = async () => {
    await document.fonts.ready;
    // Comprueba que cada peso usado exista de verdad (si falta, el navegador lo simula y se ve mal).
    const hasText = (n) => [...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
    const family = (n) => getComputedStyle(n).fontFamily.split(',')[0].trim().replace(/["']/g, '');
    const used = new Set([...document.querySelectorAll('.page, .page *')].filter((n) => hasText(n) && family(n).startsWith('Obviously'))
      .map((n) => `${family(n)} ${getComputedStyle(n).fontWeight}`));
    const missing = [...used].filter((k) => ![...document.fonts].some((f) => `${f.family.replace(/["']/g, '')} ${f.weight}` === k && f.status === 'loaded'));
    if (missing.length) {
      document.documentElement.dataset.masFontMissing = missing.join(', ');
      console.warn(`[MAS] Faltan pesos de Obviously: ${missing.join(', ')}. Ver brand/fonts/README.md.`);
    }
    fit();
    if (typeof window.MAS_AFTER_FIT === 'function') await window.MAS_AFTER_FIT();
    document.documentElement.dataset.masReady = '1';
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
