// Flow C: chat item anatomy, paused-card details, history panel, connectors, credit-gate attempt.
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

const capture = async (name, extra = '') => {
  const snap = await page.evaluate(`(() => {
    const R = (el) => { const b = el.getBoundingClientRect(); return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}; };
    const txt = (el) => (el.innerText||'').replace(/\\s+/g,' ').trim();
    const chatItems = [...document.querySelectorAll('[data-testid^="chat-item"]')].map(e=>({tid:e.dataset.testid, rect:R(e), text:txt(e).slice(0,600)}));
    const buttons = [...document.querySelectorAll('button,[role="button"]')].filter(b=>b.getBoundingClientRect().width>0).map(b=>({t:txt(b).slice(0,80), aria:b.getAttribute('aria-label'), tid:b.dataset.testid||null}));
    const dialogs = [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper]')].filter(d=>d.getBoundingClientRect().width>0).map(d=>({role:d.getAttribute('role'),tid:d.dataset.testid||null,text:txt(d).slice(0,1500),rect:R(d)}));
    const panels = [...document.querySelectorAll('div,aside,section')].filter(e=>{const b=e.getBoundingClientRect();return b.width>250&&b.height>250&&txt(e).length>20;}).map(e=>({rect:R(e),len:txt(e).length,tids:[...new Set([...e.querySelectorAll('[data-testid]')].map(x=>x.dataset.testid))].slice(0,12)}));
    return { url: location.href, chatItems, buttons, dialogs, panels,
      tids: [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))],
      body: (document.body.innerText||'').replace(/\\s+/g,' ').slice(0,8000) ${extra} };
  })()`);
  fs.writeFileSync(`${OUT}/c_${name}.json`, JSON.stringify(snap, null, 1));
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 12000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/c_${name}.jpg`, Buffer.from(r.data, 'base64'));
  return snap;
};

const clickTid = (tid) => page.evaluate(`(() => { const el=document.querySelector('[data-testid="${tid}"]'); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
const clickText = (text, sel = 'button,[role="button"],a,[role="tab"]') => page.evaluate(`(() => { const els=[...document.querySelectorAll(${JSON.stringify(sel)})]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
const esc = async () => {
  await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, page.sessionId).catch(() => {});
  await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, page.sessionId).catch(() => {});
};

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 13000));

// c0: chat anatomy
let s = await capture('c0_chat');
console.log('CHAT ITEMS:', JSON.stringify(s.chatItems).slice(0, 1200));
console.log('BUTTONS:', JSON.stringify(s.buttons.map(b => b.t || b.aria || b.tid)).slice(0, 900));

// c1: paused card
console.log('CLICK paused:', await clickText('Paused'));
await new Promise(r => setTimeout(r, 4000));
s = await capture('c1_paused');
console.log('DLG:', JSON.stringify(s.dialogs).slice(0, 1200));

// c2: history
await esc(); await new Promise(r => setTimeout(r, 1200));
console.log('CLICK history:', await clickTid('editor-nav-history-toggle'));
await new Promise(r => setTimeout(r, 6000));
s = await capture('c2_history');
console.log('TIDS:', s.tids.filter(x => /history|version|revert|draft/i.test(x)).join(','));
console.log('PANELS:', JSON.stringify(s.panels.filter(p => p.rect.x > 400).slice(0, 6)));

// c3: connectors
await esc(); await new Promise(r => setTimeout(r, 1000));
console.log('CLICK connectors:', await clickTid('sidebar-nav-connectors'));
await new Promise(r => setTimeout(r, 6000));
s = await capture('c3_connectors');
console.log('CONN URL:', s.url);
console.log('CONN BODY:', (s.body || '').slice(0, 1200));

process.exit(0);
