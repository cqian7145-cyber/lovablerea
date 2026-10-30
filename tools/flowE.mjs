// Flow E: open the turn-detail surface (activity timeline) and its Changes/Timeline tabs.
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

const cap = async (name) => {
  const snap = await page.evaluate(`(() => {
    const R = (el) => { const b = el.getBoundingClientRect(); return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}; };
    const panels = [...document.querySelectorAll('[role="tabpanel"],[role="dialog"],aside,section')].filter(d=>d.getBoundingClientRect().width>200).map(d=>({role:d.getAttribute('role'),tid:d.dataset.testid||null,text:(d.innerText||'').replace(/\\s+/g,' ').slice(0,3000),rect:R(d)}));
    return { url: location.href, panels,
      tids: [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))],
      buttons: [...document.querySelectorAll('button,[role="button"],[role="tab"]')].filter(b=>b.getBoundingClientRect().width>0).map(b=>({t:(b.innerText||'').trim().slice(0,60), tid:b.dataset.testid||null})),
      body: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,9000) };
  })()`);
  fs.writeFileSync(`${OUT}/e_${name}.json`, JSON.stringify(snap, null, 1));
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 12000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/e_${name}.jpg`, Buffer.from(r.data, 'base64'));
  return snap;
};
const clickJs = (js) => page.evaluate(js);
const clickExact = (text, sel = 'button,[role="button"],[role="tab"]') => page.evaluate(`(() => { const els=[...document.querySelectorAll(${JSON.stringify(sel)})]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
const clickHas = (text, sel = 'button,[role="button"],[role="tab"]') => page.evaluate(`(() => { const els=[...document.querySelectorAll(${JSON.stringify(sel)})]; const el=els.find(e=>(e.innerText||'').includes(${JSON.stringify(text)})); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 13000));

let s = await cap('e0');
console.log('E0 buttons:', s.buttons.map(b => b.t).filter(Boolean).slice(0, 40).join(' | '));

// try clicking the AI message row
console.log('click ai msg:', await clickJs(`(() => { const el=document.querySelector('[data-testid="chat-item-ai_message"]'); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`));
await new Promise(r => setTimeout(r, 5000));
s = await cap('e1');
console.log('E1 body tail:', (s.body || '').slice(-700));

if (!(s.body || '').includes('Timeline')) {
  console.log('click Details:', await clickHas('Details'));
  await new Promise(r => setTimeout(r, 5000));
  s = await cap('e2');
  console.log('E2 body tail:', (s.body || '').slice(-700));
}

for (const [label, name] of [['Changes', 'e3_changes'], ['Timeline', 'e4_timeline'], ['Expand all', 'e5_expand']]) {
  console.log(label + ':', await clickExact(label));
  await new Promise(r => setTimeout(r, 4000));
  const x = await cap(name);
  console.log('  ' + name + ' tail:', (x.body || '').slice(-600));
}
process.exit(0);
