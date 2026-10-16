#!/usr/bin/env node
// Genera tokens/tokens.css y web/mas-data.js a partir de las fuentes de verdad:
// tokens/colors.json, assets/mdots/mdots.json y assets/logo/*.svg.
// Uso: node brand/scripts/build-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const colors = JSON.parse(read('tokens/colors.json'));
const mdots = JSON.parse(read('assets/mdots/mdots.json'));

const all = [...colors.pinks, ...colors.secondary, ...colors.neutrals, ...colors.web_only];
const byKey = Object.fromEntries(all.map((c) => [c.key, c.hex]));

// Contraste WCAG para documentar qué pares sirven para texto chico vs. solo display.
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
};
const pairs = colors.display_pairs.pairs.map((p) => ({
  ...p,
  bgHex: byKey[p.bg], fgHex: byKey[p.fg],
  contrast: contrast(byKey[p.bg], byKey[p.fg]),
}));

// tokens.css
let css = '/* GENERADO por scripts/build-data.mjs — no editar a mano. Fuente: tokens/colors.json */\n:root {\n';
for (const c of all) css += `  --${c.key}: ${c.hex};\n`;
css += `  --mad-pink: var(--${colors.primary});\n`;
css += '}\n';
fs.writeFileSync(path.join(root, 'tokens/tokens.css'), css);

// mas-data.js (se carga con <script>, funciona desde file://)
const svgInner = (file) => {
  const s = read(file);
  return {
    viewBox: s.match(/viewBox="([^"]+)"/)[1],
    m: (s.match(/<path class="m"[^>]*d="([^"]+)"/) || [])[1] || null,
    dot: (s.match(/<path class="dot"[^>]*d="([^"]+)"/) || [])[1] || null,
    wordmark: [...s.matchAll(/<path d="([^"]+)"\/>/g)].map((m) => m[1]),
  };
};
const textPairs = colors.text_pairs.pairs.map((p) => ({ ...p, bgHex: byKey[p.bg], fgHex: byKey[p.fg] }));
const data = {
  colors: Object.fromEntries(all.map((c) => [c.key, c.hex])),
  palette: { pinks: colors.pinks, secondary: colors.secondary, grid: colors.grid_order },
  pairs, textPairs,
  lockups: colors.lockup_combos.combos,
  dots: colors.dot_rules.manual_examples,
  mdots,
  wordmark: svgInner('assets/logo/wordmark.svg'),
  lockup: svgInner('assets/logo/lockup.svg'),
};
fs.mkdirSync(path.join(root, 'web'), { recursive: true });
fs.writeFileSync(path.join(root, 'web/mas-data.js'),
  '/* GENERADO por scripts/build-data.mjs — no editar a mano. */\nwindow.MAS_DATA = ' + JSON.stringify(data) + ';\n');

console.log('tokens.css + mas-data.js generados');
console.log('\nDuotonos display (contraste fondo/headline):');
for (const p of pairs) {
  const use = p.contrast >= 4.5 ? 'texto + display' : p.contrast >= 3 ? 'display / texto grande' : p.contrast >= 2 ? 'solo display gigante' : '⚠ BAJO CONTRASTE: revisar';
  console.log(`  ${p.bg.padEnd(15)} ${p.fg.padEnd(15)} ${String(p.contrast).padStart(5)}:1  ${use}`);
}
