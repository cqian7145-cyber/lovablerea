// Flow F: reproduce turn-detail via Paused card, then Connectors page, then credit-gate send attempt.
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

const cap = async (name) => {
  const snap = await page.evaluate(`(() => ({
    url: location.href,
    tids: [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))],
    buttons: [...document.querySelectorAll('button,[role="button"],[role="tab"]')].filter(b=>b.getBoundingClientRect().width>0).map(b=>({t:(b.innerText||'').replace(/\\s+/g,' ').trim().slice(0,70), tid:b.dataset.testid||null})),
    dialogs: [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper],[role="tabpanel"]')].filter(d=>d.getBoundingClientRect().width>0).map(d=>({role:d.getAttribute('role'),text:(d.innerText||'').replace(/\\s+/g,' ').slice(0,2000)})),
    body: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,9000)
  }))()`);
  fs.writeFileSync(`${OUT}/f_${name}.json`, JSON.stringify(snap, null, 1));
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 12000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/f_${name}.jpg`, Buffer.from(r.data, 'base64'));
  return snap;
};
const clickExact = (text, sel = 'button,[role="button"],[role="tab"],div[role="button"]') => page.evaluate(`(() => { const els=[...document.querySelectorAll(${JSON.stringify(sel)})]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 13000));

console.log('Paused:', await clickExact('Paused'));
await new Promise(r => setTimeout(r, 6000));
let s = await cap('f1_paused_detail');
console.log('F1 tail:', (s.body || '').slice(-900));
console.log('F1 buttons:', s.buttons.map(b => b.t).filter(Boolean).slice(0, 30).join(' | '));

// expand the first activity (Thought for Ns)
const expand = await page.evaluate(`(() => { const els=[...document.querySelectorAll('button,[role="button"]')]; const el=els.find(e=>/Thought for \\d+s/.test(e.innerText||'')); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
console.log('expand thought:', expand);
await new Promise(r => setTimeout(r, 4000));
s = await cap('f2_thought_expanded');
console.log('F2 dialogs:', JSON.stringify(s.dialogs).slice(0, 900));

// Changes tab
for (const label of ['Changes', 'Timeline']) {
  console.log(label + ':', await clickExact(label));
  await new Promise(r => setTimeout(r, 4000));
  const x = await cap('f3_' + label.toLowerCase());
  console.log('  ' + label + ' tail:', (x.body || '').slice(-500));
}
process.exit(0);
