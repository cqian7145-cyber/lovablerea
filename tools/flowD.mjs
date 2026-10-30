// Flow D: inside turn details (Timeline / Changes / activity card), then connectors + credit gate.
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

const txt = `(el) => (el.innerText || '').replace(/\\s+/g,' ').trim()`;
const cap = async (name) => {
  const snap = await page.evaluate(`(() => {
    const R = (el) => { const b = el.getBoundingClientRect(); return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}; };
    const dialogs = [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper],[role="tabpanel"]')].filter(d=>d.getBoundingClientRect().width>0).map(d=>({role:d.getAttribute('role'),tid:d.dataset.testid||null,text:(d.innerText||'').replace(/\\s+/g,' ').slice(0,2500),rect:R(d)}));
    return { url: location.href, dialogs,
      tids: [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))],
      buttons: [...document.querySelectorAll('button,[role="button"],[role="tab"]')].filter(b=>b.getBoundingClientRect().width>0).map(b=>({t:(b.innerText||'').trim().slice(0,60), tid:b.dataset.testid||null, aria:b.getAttribute('aria-label')})),
      body: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,9000) };
  })()`);
  fs.writeFileSync(`${OUT}/d_${name}.json`, JSON.stringify(snap, null, 1));
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 12000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/d_${name}.jpg`, Buffer.from(r.data, 'base64'));
  return snap;
};
const clickText = (text) => page.evaluate(`(() => { const els=[...document.querySelectorAll('button,[role="button"],[role="tab"],a')]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
const clickContains = (text) => page.evaluate(`(() => { const els=[...document.querySelectorAll('button,[role="button"]')]; const el=els.find(e=>(e.innerText||'').includes(${JSON.stringify(text)})); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);

await page.goto(BASE + '?view=history', { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 12000));

// if history not open, click toggle
let s = await cap('d0_open');
if (!(s.body || '').includes('Timeline')) {
  console.log('open history:', await page.evaluate(`(() => { const el=document.querySelector('[data-testid="editor-nav-history-toggle"]'); if(!el) return 'NO_TID'; el.click(); return 'ok'; })()`));
  await new Promise(r => setTimeout(r, 6000));
  s = await cap('d0b_open');
}
console.log('D0 body:', (s.body || '').slice(0, 400));

console.log('CHANGES:', await clickText('Changes'));
await new Promise(r => setTimeout(r, 5000));
s = await cap('d1_changes');
console.log('D1 body:', (s.body || '').slice(0, 1000));

console.log('TIMELINE:', await clickText('Timeline'));
await new Promise(r => setTimeout(r, 4000));
s = await cap('d2_timeline');
console.log('D2 body:', (s.body || '').slice(0, 900));

console.log('EXPAND thought:', await clickContains('Thought for 8s'));
await new Promise(r => setTimeout(r, 4000));
s = await cap('d3_thought');
console.log('D3 dialogs:', JSON.stringify(s.dialogs).slice(0, 1200));

process.exit(0);
