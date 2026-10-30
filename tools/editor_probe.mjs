// Editor probe: attach to open lovable.dev project page, extract structure + perf resources + screenshot.
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const name = process.argv[2] || 'editor_struct';

const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const target = targets.find(t => t.type === 'page' && /lovable\.dev\/projects\//.test(t.url))
  || targets.find(t => t.type === 'page' && /lovable\.dev/.test(t.url));
if (!target) { console.error('no lovable page target'); process.exit(1); }
const page = await chrome.attachToTarget(target.targetId, { width: 1440, height: 900 });
await page.chrome.send('Runtime.enable', {}, page.sessionId);
await new Promise(r => setTimeout(r, 1500));

const info = await page.evaluate(`(() => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const rect = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 120);
  const testids = [...new Set(q('[data-testid]').map(e => e.dataset.testid))];
  const pick = (sel, n = 40) => q(sel).slice(0, n).map(e => ({ text: txt(e), tid: e.dataset.testid || null, aria: e.getAttribute('aria-label'), rect: rect(e) }));
  const iframes = q('iframe').map(f => ({ src: (f.src || '').slice(0, 220), rect: rect(f), title: f.title || null }));
  const perf = performance.getEntriesByType('resource')
    .filter(r => /api\\.lovable\\.dev|lovableproject|\\/app\\/ws|event-stream|supabase|lovable\\.dev\\/api/.test(r.name))
    .map(r => ({ name: r.name.slice(0, 260), type: r.initiatorType, dur: Math.round(r.duration), size: r.transferSize }));
  const panels = q('[class*="panel"],[role="separator"],[data-panel],[data-panel-group]').slice(0, 30).map(e => ({ cls: (e.className || '').toString().slice(0, 120), rect: rect(e), role: e.getAttribute('role'), tid: e.dataset.testid || null }));
  const editorish = {
    monaco: !!window.monaco,
    cm6: !!document.querySelector('.cm-editor'),
    xterm: !!document.querySelector('.xterm'),
    codeMirror: !!document.querySelector('.CodeMirror'),
    fileTreeItems: q('[role="treeitem"]').length,
    tablist: q('[role="tablist"]').length,
    tabs: q('[role="tab"]').map(e => ({ label: txt(e), sel: e.getAttribute('aria-selected'), tid: e.dataset.testid || null }))
  };
  return {
    url: location.href, title: document.title,
    scroll: { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight },
    testids, editorish, iframes, panels,
    buttons: pick('button', 60), links: pick('a[href]', 40),
    text: (document.body.innerText || '').replace(/\\s+/g, ' ').slice(0, 4000),
    perf
  };
})()`);

fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({ target: { url: target.url, title: target.title }, info }, null, 1));
const dom = await page.html();
fs.writeFileSync(`${OUT}/${name}-dom.html`, dom);
try {
  const b64 = await page.screenshot(`${OUT}/${name}-viewport.png`);
} catch (e) { console.error('screenshot fail', e.message); }

console.log('URL:', info.url, '| title:', info.title);
console.log('TESTIDS:', info.testids.join(', '));
console.log('EDITOR:', JSON.stringify(info.editorish));
console.log('IFRAMES:', JSON.stringify(info.iframes));
console.log('PANELS:', JSON.stringify(info.panels.slice(0, 12)));
console.log('TABS:', JSON.stringify(info.tabs));
console.log('PERF:', JSON.stringify(info.perf.slice(0, 20), null, 0));
console.log('TEXT:', info.text.slice(0, 1200));
process.exit(0);
