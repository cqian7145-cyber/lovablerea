import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
const T = (p, ms, label) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout:' + label)), ms))]);
const log = (...a) => console.log(...a);

const chrome = await Chrome.attach({ port: 9333 });
const out = { at: new Date().toISOString(), steps: [], data: {} };

// 1) 找到项目 page target，关闭多余 page
let targets = await T(chrome.listTargets(), 15000, 'listTargets');
const pages = targets.filter(t => t.type === 'page' && /lovable\.dev\/projects\//.test(t.url || ''));
log('pages', pages.length, 'iframes', targets.filter(t => t.type === 'iframe').length);
if (!pages.length) { fs.writeFileSync(path.join(OUT, 'select-probe.json'), JSON.stringify(out, null, 2)); console.log('NO PROJECT PAGE'); process.exit(0); }
const main = pages[0];
for (const extra of pages.slice(1)) { try { await T(chrome.send('Target.closeTarget', { targetId: extra.targetId }), 5000, 'close'); } catch {} }

const page = await T(chrome.attachToTarget(main.targetId, {}), 20000, 'attach-main');
out.steps.push('attached main');

// 2) 找预览 iframe（等最多 40s，宿主可能是 lovableproject.com 或 id-preview--*.lovable.app）
let ifr = null;
for (let i = 0; i < 20; i++) {
  targets = await T(chrome.listTargets(), 15000, 'listTargets2');
  ifr = targets.find(t => t.type === 'iframe' && /(lovableproject\.com|id-preview--)/.test(t.url || ''));
  if (ifr) break;
  await new Promise(r => setTimeout(r, 2000));
}
out.data.previewUrl = ifr ? ifr.url : null;
log('iframe', ifr && ifr.url);
if (!ifr) { fs.writeFileSync(path.join(OUT, 'select-probe.json'), JSON.stringify(out, null, 2)); console.log('NO IFRAME'); process.exit(0); }

// 3) 取 data-tsd-source 真实值
let ifp = null;
for (let k = 0; k < 3; k++) {
  try { ifp = await T(chrome.attachToTarget(ifr.targetId, { noViewport: true }), 15000, 'attach-iframe'); break; }
  catch (e) { log('attach iframe retry', k, String(e.message).slice(0, 80)); await new Promise(r => setTimeout(r, 1500)); }
}
if (ifp) {
  const r = await T(ifp.evaluate(`(() => {
    const els = [...document.querySelectorAll('[data-tsd-source]')];
    const vals = els.map(el => ({ tag: el.tagName.toLowerCase(), v: el.getAttribute('data-tsd-source'), text: (el.textContent||'').trim().slice(0,24) }));
    const reactKeys = new Set();
    for (const el of [...document.querySelectorAll('*')].slice(0, 200)) for (const k of Object.keys(el)) if (k.startsWith('__react')) reactKeys.add(k.split('$')[0]);
    return { count: els.length, vals: vals.slice(0, 25), reactKeys: [...reactKeys], bodyHtmlHead: document.body.innerHTML.slice(0, 400) };
  })()`), 20000, 'eval-tsd');
  out.data.tsd = r;
  log('tsd count', r.count);
}
fs.writeFileSync(path.join(OUT, 'tsd-source-map.json'), JSON.stringify(out, null, 2));

// 4) 进入 Select 模式（点顶栏 toolbar 按钮）
const modeInfo = await T(page.evaluate(`(() => {
  const btns = [...document.querySelectorAll('[data-testid^="preview-toolbar-mode-"]')].map(b => ({ tid: b.getAttribute('data-testid'), label: b.getAttribute('aria-label'), pressed: b.getAttribute('aria-pressed') }));
  const sel = document.querySelector('[data-testid="preview-toolbar-mode-selection"]');
  if (sel) sel.click();
  return { btns, clicked: !!sel };
})()`), 15000, 'click-mode');
out.data.modeInfo = modeInfo;
log('mode', JSON.stringify(modeInfo));
await new Promise(r => setTimeout(r, 1200));

// 5) 在预览区域 dispatch 鼠标移动 + 点击，抓高亮元素
const mouse = async (type, x, y) => T(chrome.send('Input.dispatchMouseEvent', { type, x, y, button: 'none', clickCount: type === 'mousePressed' ? 1 : 0 }, page.sessionId), 8000, 'mouse');
const hits = [];
for (const [x, y] of [[700, 300], [700, 420], [900, 300]]) {
  try {
    await mouse('mouseMoved', x, y);
    await new Promise(r => setTimeout(r, 500));
    if (ifp) {
      const h = await T(ifp.evaluate(`(() => {
        const cand = [...document.querySelectorAll('body *')].filter(el => {
          const cs = getComputedStyle(el);
          return (cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px') || (cs.boxShadow && cs.boxShadow !== 'none' && /rgb/.test(cs.boxShadow));
        }).slice(0, 6).map(el => ({ tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0, 60), outline: getComputedStyle(el).outline, shadow: getComputedStyle(el).boxShadow.slice(0, 60), tsd: el.getAttribute('data-tsd-source') }));
        return { cand, overlays: [...document.querySelectorAll('[class*=lovable],[id*=lovable],[data-lovable]')].slice(0,8).map(e => e.tagName + '.' + (e.className||'').toString().slice(0,40)) };
      })()`), 12000, 'eval-hover');
      hits.push({ x, y, h });
    }
  } catch (e) { hits.push({ x, y, err: String(e.message).slice(0, 80) }); }
}
out.data.hover = hits;
fs.writeFileSync(path.join(OUT, 'select-probe.json'), JSON.stringify(out, null, 2));

// 6) 截图
try {
  const d = await T(page.screenshot(path.join(OUT, 'select-mode.png'), { format: 'jpeg', quality: 60, fullPage: false }), 20000, 'shot');
  out.data.shot = d;
} catch (e) { out.data.shotErr = String(e.message).slice(0, 120); }
fs.writeFileSync(path.join(OUT, 'select-probe.json'), JSON.stringify(out, null, 2));
console.log('DONE');
