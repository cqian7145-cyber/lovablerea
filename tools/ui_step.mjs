// Click a UI element (by data-testid or text), wait, then capture structure + screenshot.
// usage: node tools/ui_step.mjs <name> --tid=view-switcher-files [--text=Share] [--wait=2500]
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const name = process.argv[2];
const arg = (k, d = null) => {
  const hit = process.argv.find(a => a.startsWith(`--${k}=`));
  return hit ? hit.slice(k.length + 3) : d;
};
const tid = arg('tid');
const text = arg('text');
const wait = parseInt(arg('wait', '2500'), 10);
const clickJs = arg('clickjs');

const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const target = targets.find(t => t.type === 'page' && /lovable\.dev\/projects\//.test(t.url))
  || targets.find(t => t.type === 'page' && /lovable\.dev/.test(t.url));
if (!target) { console.error('no lovable page'); process.exit(1); }
const page = await chrome.attachToTarget(target.targetId, { width: 1440, height: 900 });

if (clickJs) {
  await page.evaluate(clickJs);
} else if (tid) {
  await page.evaluate(`(() => { const el = document.querySelector('[data-testid="${tid}"]'); if (!el) return 'NOT_FOUND'; el.scrollIntoView({block:'center'}); el.click(); return 'clicked'; })()`);
} else if (text) {
  await page.evaluate(`(() => { const els=[...document.querySelectorAll('button,a,[role=tab],[role=menuitem]')]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'clicked'; })()`);
}
await new Promise(r => setTimeout(r, wait));

const info = await page.evaluate(`(() => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const rect = (el) => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}; };
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 160);
  const testids = [...new Set(q('[data-testid]').map(e => e.dataset.testid))];
  const dialogs = q('[role="dialog"],[role="alertdialog"],[data-radix-popper-content-wrapper]').map(d => ({ role: d.getAttribute('role'), tid: d.dataset.testid || null, text: (d.innerText||'').replace(/\\s+/g,' ').slice(0,900), rect: rect(d) }));
  const tree = q('[role="treeitem"],[data-testid*="file"],li[class*="file"]').slice(0,80).map(e=>({t:txt(e), tid:e.dataset.testid||null, aria:e.getAttribute('aria-label')}));
  const tabs = q('[role="tab"]').map(e=>({l:txt(e), sel:e.getAttribute('aria-selected')}));
  return { url: location.href, testids, dialogs, tree, tabs,
    title: document.title,
    monaco: !!window.monaco, cm: q('.cm-editor').length, xterm: q('.xterm').length,
    text: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,5000) };
})()`);
fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify(info, null, 1));
try {
  const r = await page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 55, fromSurface: true, captureBeyondViewport: false }, page.sessionId);
  fs.writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(r.data, 'base64'));
} catch (e) { console.error('shot fail', e.message); }
console.log('URL:', info.url);
console.log('DIALOGS:', JSON.stringify(info.dialogs).slice(0, 1500));
console.log('TREE:', JSON.stringify(info.tree).slice(0, 1500));
console.log('EDITORS:', JSON.stringify({ monaco: info.monaco, cm: info.cm, xterm: info.xterm }));
console.log('TEXT:', info.text.slice(0, 1500));
process.exit(0);
