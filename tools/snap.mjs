// Snapshot the current (logged-in) tab: screenshot, DOM structure, network, optional navigation.
// usage: node snap.mjs <name> [url] [--full]
import fs from 'node:fs';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/evidence/raw';
const name = process.argv[2] || 'snap';
const url = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : null;
const wantFull = process.argv.includes('--full');

const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const t = targets.find((x) => x.type === 'page' && /lovable\.dev/.test(x.url))
  || targets.find((x) => x.type === 'page' && !x.url.startsWith('chrome')) || targets.find((x) => x.type === 'page');
if (!t) throw new Error('no page target');
console.log('target:', t.url.slice(0, 120));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });
if (url) await page.goto(url, { settle: 4000 });
else await sleep(1200);

const info = await page.evaluate(`(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2; };
  const testids = [...new Set([...document.querySelectorAll('[data-testid]')].map(e => e.getAttribute('data-testid')))].slice(0, 200);
  const ariaLabels = [...new Set([...document.querySelectorAll('[aria-label]')].map(e => e.getAttribute('aria-label')))].slice(0, 80);
  const buttons = [...document.querySelectorAll('button,a[role=button]')].filter(vis)
    .map(b => ({ text: (b.innerText || '').trim().replace(/\\s+/g,' ').slice(0, 50), aria: b.getAttribute('aria-label'),
      testid: b.getAttribute('data-testid'), disabled: b.disabled,
      rect: (r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }))(b.getBoundingClientRect()) }))
    .filter(b => b.text || b.aria).slice(0, 60);
  const inputs = [...document.querySelectorAll('input,textarea,[contenteditable="true"]')].filter(vis)
    .map(e => ({ tag: e.tagName, placeholder: e.getAttribute('placeholder'), aria: e.getAttribute('aria-label'),
      type: e.getAttribute('type'), testid: e.getAttribute('data-testid') }));
  const regions = [...document.querySelectorAll('main,header,aside,nav,section[aria-label],div[data-panel]')].filter(vis).slice(0, 25)
    .map(e => ({ tag: e.tagName, role: e.getAttribute('role'), aria: e.getAttribute('aria-label'), testid: e.getAttribute('data-testid'),
      text: (e.innerText || '').trim().replace(/\\s+/g,' ').slice(0, 80),
      rect: (r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }))(e.getBoundingClientRect()) }));
  return {
    url: location.href, title: document.title,
    text: (document.body.innerText || '').slice(0, 6000),
    testids, ariaLabels, buttons, inputs, regions,
    scrollHeight: document.documentElement.scrollHeight,
    storage: (() => { try { return { local: Object.keys(localStorage), session: Object.keys(sessionStorage) }; } catch { return { local: [], session: [], denied: true }; } })(),
    cookieNames: document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(Boolean),
  };
})()`);

await page.screenshot(`${OUT}/${name}-viewport.png`);
if (wantFull && info.scrollHeight < 15000) await page.screenshot(`${OUT}/${name}-full.png`, { fullPage: true });
fs.writeFileSync(`${OUT}/${name}-dom.html`, await page.html());
fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({
  info,
  network: page.requests.map((r) => ({ m: r.method, u: r.url.slice(0, 300), s: r.status, mime: r.mime, type: r.type, ip: r.remoteIP, proto: r.protocol })),
  sse: page.sse.slice(0, 200),
  ws: page.wsFrames.slice(0, 200),
  console: page.console.slice(0, 80),
  errors: page.errors.slice(0, 20),
}, null, 1));

console.log('URL:', info.url, '| title:', info.title, '| testids:', info.testids.length, '| reqs:', page.requests.length, '| sse:', page.sse.length);
console.log('TEXT:', info.text.slice(0, 900).replace(/\n+/g, ' | '));
console.log('TESTIDS:', info.testids.slice(0, 60).join(', '));
