// Probe editor sub-views by URL param, capturing right-panel content + screenshots.
// usage: node tools/views_probe.mjs
import { Chrome } from './cdp.mjs';
import fs from 'node:fs';

const OUT = 'D:/lovable-research/evidence/raw';
const BASE = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';

const specs = [
  { name: 'view_files', q: '?view=files', wait: 4000 },
  { name: 'view_code', q: '?view=codeEditor', wait: 5000 },
  { name: 'view_more_db', q: '?view=more&more=database', wait: 4000 },
  { name: 'view_more_users', q: '?view=more&more=users', wait: 3500 },
  { name: 'view_more_security', q: '?view=more&more=security', wait: 4000 },
  { name: 'view_more_settings', q: '?view=more&more=settings', wait: 4000 },
  { name: 'view_more_domains', q: '?view=more&more=domains', wait: 3500 },
  { name: 'view_more_usage', q: '?view=more&more=usage', wait: 3500 }
];

const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
const target = targets.find(t => t.type === 'page' && /lovable\.dev/.test(t.url));
if (!target) { console.error('no page'); process.exit(1); }
const page = await chrome.attachToTarget(target.targetId, { width: 1440, height: 900 });

const results = [];
for (const s of specs) {
  const url = BASE + s.q;
  try { await page.goto(url, { timeout: 45000, settle: 600 }); } catch (e) { console.error('goto fail', s.name, e.message); }
  await new Promise(r => setTimeout(r, s.wait));
  let info;
  try {
    info = await page.evaluate(`(() => {
      const rect = (el) => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}; };
      const big = [...document.querySelectorAll('div,section,main')].filter(e => { const r = e.getBoundingClientRect(); return r.x > 300 && r.width > 700 && r.height > 400; });
      const panel = big.sort((a,b)=> (a.innerText||'').length - (b.innerText||'').length)[0];
      const testids = [...new Set([...document.querySelectorAll('[data-testid]')].map(e=>e.dataset.testid))];
      return {
        url: location.href, title: document.title,
        panelText: panel ? (panel.innerText||'').replace(/\\s+/g,' ').slice(0, 2000) : null,
        testids,
        dialogs: [...document.querySelectorAll('[role="dialog"],[role="menu"],[data-radix-popper-content-wrapper]')].map(d=>((d.innerText||'').replace(/\\s+/g,' ').slice(0,700)))
      };
    })()`);
  } catch (e) { info = { error: e.message }; }
  results.push({ spec: s, info });
  try {
    const r = await page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 50, fromSurface: true }, page.sessionId);
    fs.writeFileSync(`${OUT}/${s.name}.jpg`, Buffer.from(r.data, 'base64'));
  } catch (e) { console.error('shot fail', s.name, e.message); }
  console.log('===', s.name, '|', info.url || info.error);
  if (info.panelText) console.log('PANEL:', info.panelText.slice(0, 600));
  if (info.testids) console.log('NEW_TIDS:', info.testids.filter(t => /more|analytics|database|security|domain|usage|settings|file|code/i.test(t)).join(','));
}
fs.writeFileSync(`${OUT}/views_probe.json`, JSON.stringify(results, null, 1));
process.exit(0);
