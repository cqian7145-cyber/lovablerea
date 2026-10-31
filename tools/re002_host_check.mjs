import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const ifr = targets.filter(t => t.type === 'iframe' && /lovableproject\.com/.test(t.url || ''));
const out = { at: new Date().toISOString(), count: ifr.length, hosts: {}, error: null };

for (const t of ifr.slice(0, 1)) {
  try {
    const p = await chrome.attachToTarget(t.targetId, { noViewport: true });
    const r = await Promise.race([
      p.evaluate(`(() => {
        const all = [...document.querySelectorAll('*')];
        const dataMap = new Map();
        for (const el of all) for (const a of el.attributes) if (a.name.startsWith('data-')) dataMap.set(a.name, (dataMap.get(a.name) || 0) + 1);
        const tsd = [...document.querySelectorAll('[data-tsd-source]')].map(el => ({ tag: el.tagName.toLowerCase(), src: el.getAttribute('data-tsd-source'), text: (el.textContent||'').trim().slice(0,30) }));
        return {
          url: location.href, title: document.title, elements: all.length,
          dataAttrs: [...dataMap.entries()],
          tsdCount: tsd.length, tsd: tsd.slice(0, 15),
          scripts: [...document.scripts].map(s => s.src || 'inline:' + (s.textContent||'').length).slice(0, 10),
          hasViteClient: !!document.querySelector('script[src*="@vite/client"]'),
          vitePreamble: [...document.scripts].some(s => /vitePreamble|RefreshRuntime/.test(s.textContent || '')),
          styles: [...document.styleSheets].map(s => s.href || 'inline').slice(0, 8),
          perfNav: performance.getEntriesByType('navigation')[0] ? { type: performance.getEntriesByType('navigation')[0].type, dcl: Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd), load: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd) } : null,
        };
      })()`),
      new Promise((_, rej) => setTimeout(() => rej(new Error('eval-timeout')), 20000)),
    ]);
    out.hosts[t.url] = r;
  } catch (e) { out.error = String(e && e.message || e).slice(0, 200); }
}

fs.writeFileSync(path.join(OUT, 'preview-host-check.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 5000));
