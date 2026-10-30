// DOM-first step runner with best-effort timed screenshots.
// usage: node tools/flow2.mjs <A|B>
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';
const flow = process.argv[2] || 'A';

const flows = {
  A: [
    { name: 'a0_base', wait: 13000 },
    { name: 'a1_files', tid: 'view-switcher-files', wait: 7000 },
    { name: 'a2_code', tid: 'view-switcher-codeEditor', wait: 7000 },
    { name: 'a3_preview', tid: 'view-switcher-preview', wait: 5000 },
    { name: 'a4_history', tid: 'editor-nav-history-toggle', wait: 6000, esc: true },
    { name: 'a6_pages', tid: 'preview-url-bar-page-trigger', wait: 4000, esc: true },
    { name: 'a8_projmenu', tid: 'editor-nav-project-menu', wait: 4000, esc: true },
    { name: 'a10_share', text: 'Share', wait: 4500, esc: true },
    { name: 'a12_publish', text: 'Publish', wait: 5000, esc: true }
  ],
  B: [
    { name: 'b0_base', wait: 12000 },
    { name: 'b1_more', tid: 'view-switcher-more', wait: 5000 },
    { name: 'b2_db', tid: 'services-sidebar-database', wait: 5000 },
    { name: 'b3_security', tid: 'services-sidebar-security', wait: 5000 },
    { name: 'b4_settings', tid: 'services-sidebar-settings', wait: 5000 },
    { name: 'b5_domains', tid: 'services-sidebar-settings-domains', wait: 4500 },
    { name: 'b6_usage', tid: 'services-sidebar-usage', wait: 4500 },
    { name: 'b7_analytics', tid: 'services-sidebar-newAnalytics', wait: 4500 }
  ]
};

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
if (!t) { console.error('no page'); process.exit(1); }
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

const esc = async () => {
  await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, page.sessionId).catch(() => {});
  await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, page.sessionId).catch(() => {});
};

const shot = async (name) => {
  const p = page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
  const r = await Promise.race([p, new Promise(res => setTimeout(() => res(null), 15000))]);
  if (r && r.data) fs.writeFileSync(`${OUT}/flow_${name}.jpg`, Buffer.from(r.data, 'base64'));
  else console.log('  (screenshot skipped)');
};

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));

for (const step of flows[flow]) {
  if (step.esc) await esc();
  try {
    if (step.tid) {
      const r = await page.evaluate(`(() => { const el=document.querySelector('[data-testid="${step.tid}"]'); if(!el) return 'NOT_FOUND'; el.scrollIntoView({block:'center'}); el.click(); return 'ok'; })()`);
      console.log('CLICK', step.name, step.tid, r);
    } else if (step.text) {
      const r = await page.evaluate(`(() => { const els=[...document.querySelectorAll('button,a,[role=tab],[role=menuitem]')]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(step.text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
      console.log('CLICK', step.name, 'text:' + step.text, r);
    }
  } catch (e) { console.log('CLICK_ERR', step.name, e.message); }
  await new Promise(r => setTimeout(r, step.wait));

  let snap = {};
  try {
    snap = await page.evaluate(`(() => {
      const R = (el) => { const b = el.getBoundingClientRect(); return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}; };
      const tids = [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))];
      const dialogs = [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper],[role="listbox"],[role="tooltip"]')]
        .filter(d => d.getBoundingClientRect().width > 0)
        .map(d=>({role:d.getAttribute('role'), tid:d.dataset.testid||null, rect:R(d), text:(d.innerText||'').replace(/\\s+/g,' ').slice(0,1200)}));
      // right panel = biggest element starting right of the 429px chat column
      const cands = [...document.querySelectorAll('div,section,main,article')].filter(e => {
        const b = e.getBoundingClientRect();
        return b.x > 420 && b.width > 600 && b.height > 300 && (e.innerText||'').length > 40;
      });
      cands.sort((a,b) => (a.innerText||'').length - (b.innerText||'').length);
      const panel = cands[0];
      const bodyText = (document.body.innerText||'').replace(/\\s+/g,' ');
      return {
        url: location.href,
        panelText: panel ? panel.innerText.replace(/\\s+/g,' ').slice(0,3000) : null,
        dialogs, tids,
        editorEngine: { monaco: !!window.monaco, cmCount: document.querySelectorAll('.cm-editor').length, xterm: document.querySelectorAll('.xterm').length },
        bodyLen: bodyText.length,
        bodyTail: bodyText.slice(-2500)
      };
    })()`);
  } catch (e) { snap = { error: e.message }; }
  fs.writeFileSync(`${OUT}/dom_${step.name}.json`, JSON.stringify(snap, null, 1));
  console.log('STEP', step.name, '|', snap.url, '| dlg', (snap.dialogs||[]).length, '| tids', (snap.tids||[]).length);
  if ((snap.dialogs || []).length) (snap.dialogs).slice(0,3).forEach(d => console.log('  DLG:', (d.text||'').slice(0,400)));
  if (snap.panelText) console.log('  PANEL:', snap.panelText.slice(0, 700));
  else if (snap.error) console.log('  ERR:', snap.error.slice(0, 200));
  await shot(step.name);
}
process.exit(0);
