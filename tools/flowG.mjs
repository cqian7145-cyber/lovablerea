// Flow G: history list -> click version entry -> turn detail; then connectors; then credit gate send.
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
    dialogs: [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper],[role="tabpanel"]')].filter(d=>d.getBoundingClientRect().width>0).map(d=>({role:d.getAttribute('role'),text:(d.innerText||'').replace(/\\s+/g,' ').slice(0,2500)})),
    body: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,9000)
  }))()`);
  fs.writeFileSync(`${OUT}/g_${name}.json`, JSON.stringify(snap, null, 1));
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 55, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 12000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/g_${name}.jpg`, Buffer.from(r.data, 'base64'));
  return snap;
};

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 13000));

// 1) open history
console.log('history:', await page.evaluate(`(() => { const el=document.querySelector('[data-testid="editor-nav-history-toggle"]'); if(!el) return 'NO'; el.click(); return 'ok'; })()`));
await new Promise(r => setTimeout(r, 5000));
let s = await cap('g1_history_list');
console.log('G1 tail:', (s.body || '').slice(-500));

// 2) click the version entry (contains a date)
console.log('version:', await page.evaluate(`(() => { const els=[...document.querySelectorAll('button,[role="button"],li,div')]; const el=els.find(e=>/Oct 30/.test((e.innerText||'')) && (e.innerText||'').length<120 && (e.innerText||'').length>10); if(!el) return 'NO_ENTRY'; el.click(); return 'ok:' + el.innerText.trim().slice(0,60); })()`));
await new Promise(r => setTimeout(r, 5000));
s = await cap('g2_version_detail');
console.log('G2 tail:', (s.body || '').slice(-800));
console.log('G2 tids:', s.tids.filter(x => /hist|detail|timeline|change|revert|diff/i.test(x)).join(','));

// 3) credit-gated send attempt (small, local only)
const typed = await page.evaluate(`(async () => {
  const ed = document.querySelector('[data-testid="chat-composer-editor"]');
  if (!ed) return 'NO_EDITOR';
  ed.focus();
  document.execCommand('insertText', false, 'Add a small footer that says hello');
  await new Promise(r => setTimeout(r, 600));
  return (ed.innerText || '').slice(0, 80);
})()`);
console.log('TYPED:', typed);
console.log('send:', await page.evaluate(`(() => { const b=document.querySelector('[data-testid="chat-input-send"]'); if(!b) return 'NO_SEND'; b.click(); return 'ok'; })()`));
await new Promise(r => setTimeout(r, 7000));
s = await cap('g3_send_result');
console.log('G3 dialogs:', JSON.stringify((s.dialogs || []).slice(0, 2)).slice(0, 900));
console.log('G3 tail:', (s.body || '').slice(-700));
process.exit(0);
