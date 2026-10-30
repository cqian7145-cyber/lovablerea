// Step runner: performs a sequence of UI steps in one hydrated page and captures evidence.
// usage: node tools/flow.mjs <flowName>
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';
const flow = process.argv[2] || 'A';

const flows = {
  A: [
    { name: 'a0_base', wait: 14000 },
    { name: 'a1_files', tid: 'view-switcher-files', wait: 7000 },
    { name: 'a2_code', tid: 'view-switcher-codeEditor', wait: 8000 },
    { name: 'a3_preview', tid: 'view-switcher-preview', wait: 5000 },
    { name: 'a4_history', tid: 'editor-nav-history-toggle', wait: 6000 },
    { name: 'a5_esc1', key: 'Escape', wait: 1200 },
    { name: 'a6_pages', tid: 'preview-url-bar-page-trigger', wait: 4000 },
    { name: 'a7_esc2', key: 'Escape', wait: 1200 },
    { name: 'a8_projmenu', tid: 'editor-nav-project-menu', wait: 4000 },
    { name: 'a9_esc3', key: 'Escape', wait: 1200 },
    { name: 'a10_share', text: 'Share', wait: 4000 },
    { name: 'a11_esc4', key: 'Escape', wait: 1200 },
    { name: 'a12_publish', text: 'Publish', wait: 5000 },
    { name: 'a13_esc5', key: 'Escape', wait: 1200 }
  ],
  B: [
    { name: 'b0_base', wait: 12000 },
    { name: 'b1_more', tid: 'view-switcher-more', wait: 6000 },
    { name: 'b2_db', tid: 'services-sidebar-database', wait: 6000 },
    { name: 'b3_security', tid: 'services-sidebar-security', wait: 6000 },
    { name: 'b4_settings', tid: 'services-sidebar-settings', wait: 6000 },
    { name: 'b5_domains', tid: 'services-sidebar-settings-domains', wait: 5000 },
    { name: 'b6_usage', tid: 'services-sidebar-usage', wait: 5000 },
    { name: 'b7_analytics', tid: 'services-sidebar-newAnalytics', wait: 5000 }
  ]
};

const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev/.test(x.url));
if (!t) { console.error('no page'); process.exit(1); }
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });

await page.goto(BASE, { timeout: 60000, settle: 800 }).catch(e => console.log('goto', e.message));

const log = [];
for (const step of flows[flow]) {
  try {
    if (step.tid) {
      const r = await page.evaluate(`(() => { const el=document.querySelector('[data-testid="${step.tid}"]'); if(!el) return 'NOT_FOUND'; el.scrollIntoView({block:'center'}); el.click(); return 'ok'; })()`);
      log.push([step.name, step.tid, r]);
    } else if (step.text) {
      const r = await page.evaluate(`(() => { const els=[...document.querySelectorAll('button,a,[role=tab],[role=menuitem]')]; const el=els.find(e=>(e.innerText||'').trim()===${JSON.stringify(step.text)}); if(!el) return 'NOT_FOUND'; el.click(); return 'ok'; })()`);
      log.push([step.name, 'text:' + step.text, r]);
    } else if (step.key) {
      await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyDown', key: step.key, code: step.key, windowsVirtualKeyCode: 27 }, page.sessionId);
      await page.chrome.send('Input.dispatchKeyEvent', { type: 'keyUp', key: step.key, code: step.key, windowsVirtualKeyCode: 27 }, page.sessionId);
      log.push([step.name, 'key:' + step.key, 'ok']);
    }
  } catch (e) { log.push([step.name, 'ERR', e.message]); }
  await new Promise(r => setTimeout(r, step.wait));
  let snap = { url: '', text: '', dialogs: [], tids: [] };
  try {
    snap = await page.evaluate(`(() => {
      const tids = [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))];
      const dialogs = [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper],[role="listbox"]')].map(d=>((d.innerText||'').replace(/\\s+/g,' ').slice(0,800)));
      const body = (document.body.innerText||'').replace(/\\s+/g,' ');
      return { url: location.href, text: body.slice(0, 6000), dialogs, tids };
    })()`);
  } catch (e) { snap.error = e.message; }
  fs.writeFileSync(`${OUT}/flow_${step.name}.json`, JSON.stringify(snap, null, 1));
  try {
    const r = await page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 55, fromSurface: true }, page.sessionId);
    fs.writeFileSync(`${OUT}/flow_${step.name}.jpg`, Buffer.from(r.data, 'base64'));
  } catch (e) { console.error('shot fail', step.name, e.message); }
  console.log('STEP', step.name, '|', snap.url, '| dialogs:', (snap.dialogs || []).length, '| tids:', (snap.tids || []).length);
  if ((snap.dialogs || []).length) console.log('  DIALOG:', snap.dialogs[0].slice(0, 500));
}
console.log('LOG', JSON.stringify(log));
process.exit(0);
