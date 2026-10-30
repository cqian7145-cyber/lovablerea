// Generic page probe: navigate, wait out Cloudflare interstitials, screenshot, extract structure + network.
import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep } from './cdp.mjs';

const url = process.argv[2] || 'https://lovable.dev/';
const name = process.argv[3] || 'page';
const outDir = path.resolve('D:/lovable-research/evidence/raw');
fs.mkdirSync(outDir, { recursive: true });

let chrome;
try {
  chrome = await Chrome.attach({ port: 9333 });
  console.log('attached to running chrome');
} catch {
  chrome = await Chrome.launch({ port: 9333, profile: path.resolve('.cdp-profile'), headless: false });
  console.log('launched chrome');
}

async function isChallenge(page) {
  return page.evaluate(`(() => {
    const t = (document.title || '').toLowerCase();
    const b = (document.body?.innerText || '').slice(0, 400).toLowerCase();
    return t.includes('just a moment') || b.includes('verify you are human') || b.includes('checking your browser');
  })()`).catch(() => false);
}

async function probe(label, viewport) {
  const page = await chrome.newPage(viewport);
  const rec = { url, label, viewport, startedAt: new Date().toISOString() };
  try {
    await page.goto(url, { settle: 1500 });
    let waited = 0;
    while (await isChallenge(page)) {
      if (waited > 90000) break;
      await sleep(3000); waited += 3000;
      if (waited % 15000 === 0) console.log('challenge still present, waited', waited, 'ms');
    }
    rec.challengeAfterMs = waited;
    await sleep(2500);
    rec.finalUrl = await page.evaluate('location.href');
    rec.title = await page.evaluate('document.title');
    rec.stillChallenge = await isChallenge(page);
    rec.textLength = await page.evaluate('document.body ? document.body.innerText.length : 0');
    rec.summary = await page.evaluate(`(() => {
      const meta = {};
      document.querySelectorAll('meta[name],meta[property]').forEach(m => {
        const k = m.getAttribute('name') || m.getAttribute('property');
        const v = (m.getAttribute('content') || '').slice(0, 300);
        if (k) meta[k] = v;
      });
      const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
      const styles = [...document.querySelectorAll('link[rel=stylesheet]')].map(s => s.href);
      const preloads = [...document.querySelectorAll('link[rel=preload],link[rel=modulepreload]')].map(s => s.href);
      const headings = [...document.querySelectorAll('h1,h2,h3')].slice(0, 60).map(h => (h.tagName + ': ' + h.innerText.trim().replace(/\\s+/g,' ')).slice(0, 160));
      const nav = [...document.querySelectorAll('header a, nav a')].slice(0, 80).map(a => ({ t: a.innerText.trim().slice(0,60), h: a.href }));
      const buttons = [...document.querySelectorAll('button, a[role=button]')].slice(0, 80).map(b => (b.innerText || b.getAttribute('aria-label') || '').trim().slice(0, 60)).filter(Boolean);
      const imgs = [...document.querySelectorAll('img')].slice(0, 40).map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }));
      const framework = {
        next: !!document.getElementById('__NEXT_DATA__') || !!window.__NEXT_DATA__,
        nextApp: !!document.getElementById('__next'),
        react: !!(window.React || document.querySelector('[data-reactroot]')) || (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ? 'hook' : false),
        vite: !!window.__vite_plugin_react_preamble_installed__ || [...document.scripts].some(s => (s.src||'').includes('/@vite/')),
        nuxt: !!window.__NUXT__,
        astro: !!document.querySelector('[astro-island]'),
        remix: !!window.__remixContext,
        svelte: !!document.querySelector('[data-sveltekit-preload-data]'),
        tailwind: [...document.styleSheets].some(ss => { try { return [...ss.cssRules].some(r => r.cssText && r.cssText.includes('--tw-')); } catch { return false; } }),
        cloudflare: !!window.__cfRLUnblockHandlers,
      };
      const cssVars = {};
      const cs = getComputedStyle(document.documentElement);
      for (const n of ['--background','--foreground','--primary','--primary-foreground','--muted','--muted-foreground','--border','--radius','--font-sans','--font-mono','--accent','--card']) {
        const v = cs.getPropertyValue(n); if (v) cssVars[n] = v.trim();
      }
      const bodyStyle = getComputedStyle(document.body);
      const htmlStyle = getComputedStyle(document.documentElement);
      const fonts = [];
      document.fonts && document.fonts.forEach(f => { if (fonts.length < 30) fonts.push(f.family + ' ' + f.weight + ' ' + f.status); });
      return { meta, scripts, styles, preloads, headings, nav, buttons, imgs, framework, cssVars, bodyFont: bodyStyle.fontFamily, bodyBg: bodyStyle.backgroundColor, bodyColor: bodyStyle.color, htmlFontSize: htmlStyle.fontSize, fonts, lang: document.documentElement.lang, storageKeys: { local: Object.keys(localStorage), session: Object.keys(sessionStorage) }, cookieNames: document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(Boolean) };
    })()`);
    const h = await page.evaluate('document.documentElement.scrollHeight');
    await page.screenshot(path.join(outDir, `${name}-${label}.png`), h > 7600 ? {} : { fullPage: true });
    fs.writeFileSync(path.join(outDir, `${name}-${label}.html`), await page.html());
    rec.network = page.requests
      .filter((r) => !/\.(png|jpg|jpeg|svg|webp|woff2?|gif|ico)(\?|$)/i.test(r.url))
      .map((r) => ({ url: r.url.slice(0, 400), status: r.status, type: r.type, mime: r.mime, size: r.size, protocol: r.protocol, ip: r.remoteIP }));
    rec.console = page.console.slice(0, 60);
    rec.errors = page.errors.slice(0, 20);
    rec.perf = await page.evaluate(`(() => {
      const n = performance.getEntriesByType('navigation')[0] || {};
      const res = performance.getEntriesByType('resource');
      return { domContentLoaded: Math.round(n.domContentLoadedEventEnd||0), load: Math.round(n.loadEventEnd||0), transferSize: n.transferSize, resources: res.length, js: res.filter(r=>r.initiatorType==='script').length, css: res.filter(r=>/css/.test(r.name)).length };
    })()`);
  } catch (e) {
    rec.error = String(e && e.stack || e);
  }
  await page.close();
  return rec;
}

const results = [];
results.push(await probe('desktop', { width: 1440, height: 900 }));
console.log('desktop done; challenge?', results[0].stillChallenge, 'title:', results[0].title);
results.push(await probe('mobile', { width: 390, height: 844, mobile: true }));
console.log('mobile done; challenge?', results[1].stillChallenge, 'title:', results[1].title);

fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(results, null, 2));
console.log('wrote', path.join(outDir, `${name}.json`));
chrome.close();
