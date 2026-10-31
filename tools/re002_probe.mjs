import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
fs.mkdirSync(OUT, { recursive: true });
const PROJECT = '053a133e-76d8-4c7c-b418-2ab5f486a673';
const log = (k, v) => { fs.writeFileSync(path.join(OUT, 'probe-' + k + '.json'), JSON.stringify(v, null, 2)); };

const chrome = await Chrome.attach({ port: 9333 }).catch(() => Chrome.launch({ port: 9333, headless: false }));
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(`https://lovable.dev/projects/${PROJECT}`, { settle: 3000, timeout: 40000 }).catch(() => {});

// wait for preview iframe target
let iframeT = null;
for (let i = 0; i < 40; i++) {
  await sleep(1500);
  const ts = await chrome.listTargets().catch(() => []);
  iframeT = ts.find(t => t.type === 'iframe' && /id-preview--/.test(t.url || ''));
  if (iframeT) break;
}
await sleep(3000);
log('00-targets', { editorUrl: page.url, iframe: iframeT ? { id: iframeT.targetId, url: iframeT.url } : null });
if (!iframeT) { console.log('NO IFRAME'); process.exit(0); }

const ip = await chrome.attachToTarget(iframeT.targetId, { noViewport: true });

// 1) DOM markers inside preview
const dom = await ip.evaluate(`(() => {
  const all = [...document.querySelectorAll('*')];
  const dataMap = new Map();
  for (const el of all) for (const a of el.attributes) if (a.name.startsWith('data-')) dataMap.set(a.name, (dataMap.get(a.name) || 0) + 1);
  const tsd = [...document.querySelectorAll('[data-tsd-source]')].map(el => ({
    tag: el.tagName.toLowerCase(), src: el.getAttribute('data-tsd-source'),
    cls: (el.getAttribute('class') || '').slice(0, 120),
    text: (el.textContent || '').trim().slice(0, 40),
    rect: (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(el.getBoundingClientRect()),
  }));
  const h1 = document.querySelector('h1');
  return {
    url: location.href, title: document.title, elements: all.length,
    dataAttrs: [...dataMap.entries()],
    tsd, tsdCount: tsd.length,
    h1: h1 ? { text: h1.textContent.trim().slice(0, 60), rect: (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(h1.getBoundingClientRect()), attrs: [...h1.attributes].map(a => a.name + '=' + a.value.slice(0, 80)) } : null,
    scripts: [...document.scripts].map(s => s.src || 'inline:' + (s.textContent || '').length).slice(0, 8),
  };
})()`);
log('01-dom', dom);
console.log('DOM tsdCount=' + dom.tsdCount + ' elements=' + dom.elements + ' dataAttrs=' + JSON.stringify(dom.dataAttrs));

// 2) enter select mode in parent
const parentState = await page.evaluate(`(() => {
  const btn = document.querySelector('[data-testid="preview-toolbar-mode-selection"]');
  if (btn) btn.click();
  return {
    found: !!btn,
    toolbarHTML: (document.querySelector('[data-testid="preview-toolbar-options"]') || {}).outerHTML?.slice(0, 1200) || null,
    selectionBtnLabel: btn ? (btn.getAttribute('aria-label') || btn.textContent) : null,
  };
})()`);
log('02-enter-select', parentState);
await sleep(1200);

// 3) hover inside iframe
const hover = await ip.evaluate('1').then(() => 'ok').catch(e => String(e).slice(0, 100));
await ip.chrome.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 500, y: 260, button: 'none' }, ip.sessionId).catch(() => {});
await sleep(900);
const hoverState = await ip.evaluate(`(() => {
  const el = document.elementFromPoint(500, 260);
  const overlay = [...document.querySelectorAll('*')].filter(n => {
    const s = getComputedStyle(n);
    return (s.position === 'fixed' || s.position === 'absolute') && (parseFloat(s.zIndex) || 0) > 1000;
  }).map(n => ({ tag: n.tagName.toLowerCase(), id: n.id, cls: (n.getAttribute('class')||'').slice(0,120), rect: (r=>[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)])(n.getBoundingClientRect()) }));
  return {
    at: el ? { tag: el.tagName.toLowerCase(), cls: (el.getAttribute('class')||'').slice(0,100), text: (el.textContent||'').trim().slice(0,40) } : null,
    overlays: overlay.slice(0, 10),
    overlayCount: overlay.length,
    cursor: document.body.style.cursor || null,
  };
})()`);
log('03-hover', hoverState);
console.log('HOVER overlays=' + hoverState.overlayCount + ' at=' + JSON.stringify(hoverState.at));

// 4) click to select
await ip.chrome.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 500, y: 260, button: 'left', clickCount: 1 }, ip.sessionId).catch(() => {});
await ip.chrome.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 500, y: 260, button: 'left', clickCount: 1 }, ip.sessionId).catch(() => {});
await sleep(1500);
const selState = await page.evaluate(`(() => {
  const tids = [...document.querySelectorAll('[data-testid]')].map(n => n.getAttribute('data-testid'));
  const popover = document.querySelector('[data-radix-popper-content-wrapper], [role="dialog"], [role="menu"], [role="toolbar"]');
  const btns = [...document.querySelectorAll('button,[role="button"]')].map(b => (b.getAttribute('aria-label') || b.textContent || '').trim()).filter(Boolean);
  return {
    testids: [...new Set(tids)].slice(0, 60),
    popover: popover ? { role: popover.getAttribute('role'), text: popover.innerText.slice(0, 400) } : null,
    buttons: [...new Set(btns)].slice(0, 40),
  };
})()`);
log('04-selected', selState);
const shot = await page.screenshot(path.join(OUT, 'select-mode.png'), { fullPage: false }).catch(e => String(e).slice(0, 80));
console.log('SELECTED popover=' + JSON.stringify(selState.popover) + ' shot=' + shot);

// 5) iframe-side selection artifacts
const iframeSel = await ip.evaluate(`(() => {
  const marks = [...document.querySelectorAll('[class*="lovable"],[id*="lovable"],[data-lovable]')].map(n => ({ tag: n.tagName.toLowerCase(), cls: (n.getAttribute('class')||'').slice(0,120), id: n.id, data: [...n.attributes].filter(a=>a.name.startsWith('data-')).map(a=>a.name+'='+a.value.slice(0,50)) }));
  return { marks: marks.slice(0, 12), count: marks.length };
})()`);
log('05-iframe-selection', iframeSel);
console.log('IFRAME marks=' + iframeSel.count);

await page.close().catch(() => {});
