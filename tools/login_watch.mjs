// Open a visible Chrome window on the Lovable login page, let the human log in,
// and poll (without touching credential values) until an authenticated app surface appears.
import fs from 'node:fs';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/evidence/raw';
const STATUS = OUT + '/login_status.json';
fs.mkdirSync(OUT, { recursive: true });

const log = [];
function record(evt, data = {}) {
  const row = { t: new Date().toISOString(), evt, ...data };
  log.push(row);
  fs.writeFileSync(STATUS, JSON.stringify({ state: data.state || evt, log }, null, 2));
  console.log(JSON.stringify(row).slice(0, 320));
}

let chrome;
try {
  chrome = await Chrome.attach({ port: 9333 });
  record('attached');
} catch {
  chrome = await Chrome.launch({ port: 9333, profile: 'D:/lovablerea/.cdp-profile', headless: false, extraArgs: ['--window-position=80,40'] });
  record('launched');
}

const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto('https://lovable.dev/login', { settle: 3000 });
record('opened', { state: 'waiting_for_human', url: await page.evaluate('location.href') });

const AUTHED = ['/dashboard', '/projects', '/chats', '/home', '/settings', '/organization'];
let last = '';
for (let i = 0; i < 240; i++) { // up to ~20 min
  await sleep(5000);
  let st;
  try {
    st = await page.evaluate(`(() => ({
      url: location.pathname,
      title: document.title,
      text: (document.body?.innerText || '').slice(0, 200).replace(/\\s+/g, ' '),
      loginButtons: [...document.querySelectorAll('button')].map(b => (b.innerText||'').trim()).filter(t => /continue with|^continue$/i.test(t)).length,
    }))()`);
  } catch (e) { record('eval_fail', { err: String(e).slice(0, 120) }); continue; }
  const key = st.url + '|' + st.loginButtons;
  if (key !== last) { last = key; record('poll', { state: 'waiting_for_human', ...st }); }
  const authed = AUTHED.some((p) => st.url === p || st.url.startsWith(p + '/')) && st.loginButtons === 0;
  if (authed) {
    record('logged_in', { state: 'logged_in', ...st });
    await page.screenshot(OUT + '/after-login.png');
    break;
  }
}
record('watch_end', { state: 'watch_end' });
