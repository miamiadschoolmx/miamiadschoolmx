#!/usr/bin/env node
// Renderiza piezas HTML del sistema MAS a PNG, PDF o MP4 con Chromium (Playwright).
//
//   node brand/scripts/render.mjs <pieza.html> [--png] [--pdf] [--mp4] [--out <dir>] [--scale 1] [--fps 30]
//
// Cada elemento .page es una pieza/slide:
//   --png  → un PNG por .page  (<nombre>-01.png, -02.png…)
//   --pdf  → un PDF con una .page por hoja, al tamaño exacto de la .page (sirve para LinkedIn carousel)
//   --mp4  → un MP4 por .page usando data-duration="8" (segundos). Las animaciones deben ser CSS
//            @keyframes o Web Animations: el renderer las congela y avanza cuadro por cuadro.
//            Para JS propio, define window.MAS_SEEK = (ms) => {...}.
// Sin flags: PNG.
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

function loadPlaywright() {
  const req = createRequire(import.meta.url);
  try { return req('playwright'); } catch {}
  const globalRoot = execSync('npm root -g').toString().trim();
  return req(path.join(globalRoot, 'playwright'));
}

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const input = args.find((a) => a.endsWith('.html'));
if (!input) { console.error('Uso: node brand/scripts/render.mjs <pieza.html> [--png] [--pdf] [--mp4] [--out dir]'); process.exit(1); }
const modes = ['png', 'pdf', 'mp4'].filter((m) => flag('--' + m));
if (!modes.length) modes.push('png');
const outDir = path.resolve(opt('--out', path.join(path.dirname(input), 'out')));
const scale = Number(opt('--scale', 1));
const fps = Number(opt('--fps', 30));
const base = path.basename(input, '.html');
fs.mkdirSync(outDir, { recursive: true });

const { chromium } = loadPlaywright();
const launch = { args: ['--font-render-hinting=none', '--disable-lcd-text'] };
if (fs.existsSync('/opt/pw-browsers/chromium') && !process.env.PLAYWRIGHT_BROWSERS_PATH) launch.executablePath = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 2000, height: 2000 }, deviceScaleFactor: scale });
page.on('console', (m) => { if (['warning', 'error'].includes(m.type())) console.log(`[navegador] ${m.text()}`); });
page.on('pageerror', (e) => console.log(`[navegador] ${e.message}`));
await page.goto(pathToFileURL(path.resolve(input)).href);
await page.waitForSelector('html[data-mas-ready="1"]', { timeout: 30000 });
const missingFonts = await page.evaluate(() => document.documentElement.dataset.masFontMissing);
if (missingFonts) {
  console.warn(`⚠ Faltan pesos de Obviously Narrow (${missingFonts}): el render usa una fuente simulada o de respaldo. Ver brand/fonts/README.md`);
}

const pages = await page.$$('.page');
if (!pages.length) throw new Error('No hay elementos .page en ' + input);
const pad = (n) => String(n).padStart(2, '0');
const outputs = [];

if (modes.includes('png')) {
  // Congela animaciones en su estado final (o en data-still="ms") para el PNG.
  await page.evaluate(() => document.getAnimations().forEach((a) => {
    a.pause();
    const still = a.effect?.target?.closest?.('.page')?.dataset.still;
    a.currentTime = still != null ? Number(still) : (a.effect.getComputedTiming().endTime || 0);
  }));
  for (let i = 0; i < pages.length; i++) {
    const file = path.join(outDir, pages.length > 1 ? `${base}-${pad(i + 1)}.png` : `${base}.png`);
    await pages[i].screenshot({ path: file });
    outputs.push(file);
  }
}

if (modes.includes('pdf')) {
  const { w, h } = await pages[0].evaluate((n) => ({ w: n.offsetWidth, h: n.offsetHeight }));
  await page.addStyleTag({ content: `@page { size: ${w}px ${h}px; margin: 0; }` });
  await page.emulateMedia({ media: 'print' });
  const file = path.join(outDir, `${base}.pdf`);
  await page.pdf({ path: file, width: `${w}px`, height: `${h}px`, printBackground: true, preferCSSPageSize: true });
  await page.emulateMedia({ media: 'screen' });
  outputs.push(file);
}

if (modes.includes('mp4')) {
  for (let i = 0; i < pages.length; i++) {
    const dur = Number(await pages[i].evaluate((n) => n.dataset.duration || 0));
    if (!dur) { console.warn(`.page #${i + 1} sin data-duration: se omite en MP4`); continue; }
    const file = path.join(outDir, pages.length > 1 ? `${base}-${pad(i + 1)}.mp4` : `${base}.mp4`);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg salió con ' + c)))));
    const frames = Math.round(dur * fps);
    for (let f = 0; f < frames; f++) {
      const t = (f * 1000) / fps;
      await page.evaluate(async (ms) => {
        document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; });
        if (typeof window.MAS_SEEK === 'function') await window.MAS_SEEK(ms);
      }, t);
      const buf = await pages[i].screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    }
    ff.stdin.end();
    await done;
    outputs.push(file);
  }
}

await browser.close();
for (const o of outputs) console.log(o);
