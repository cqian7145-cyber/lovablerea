import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const t = targets.find(x => x.type === 'iframe' && /id-preview--/.test(x.url || ''));
if (!t) { console.log('NO IFRAME TARGET'); process.exit(0); }

const p = await chrome.attachToTarget(t.targetId, { noViewport: true });
const res = await p.evaluate(`(() => {
  const items = [...document.querySelectorAll('[data-tsd-source]')].map(el => ({
    tag: el.tagName.toLowerCase(),
    src: el.getAttribute('data-tsd-source'),
    id: el.id || null,
    cls: (el.getAttribute('class') || '').slice(0, 140),
    text: (el.textContent || '').trim().slice(0, 50),
    rect: (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(el.getBoundingClientRect()),
  }));
  const all = [...document.querySelectorAll('*')];
  const anyData = new Map();
  for (const el of all) for (const a of el.attributes) if (a.name.startsWith('data-')) anyData.set(a.name, (anyData.get(a.name) || 0) + 1);
  return {
    url: location.href,
    title: document.title,
    elements: all.length,
    dataAttrs: [...anyData.entries()],
    tsd: items,
    bodyTailwind: [...new Set([...document.querySelectorAll('[class]')].slice(0, 5).map(e => e.getAttribute('class')))],
    styleSheets: [...document.styleSheets].map(s => s.href || 'inline').slice(0, 6),
    scripts: [...document.scripts].map(s => s.src || 'inline:' + (s.textContent || '').length),
  };
})()`);
fs.writeFileSync(path.join(OUT, 'tsd-source-map.json'), JSON.stringify({ at: new Date().toISOString(), res }, null, 2));
console.log(JSON.stringify(res, null, 2).slice(0, 6000));
