// Ensure a CDP Chrome is up on 9333, launching the real Chrome with our profile if needed.
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9333;
const PROFILE = 'D:/lovablerea/.cdp-profile';
const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function up() {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`, { signal: AbortSignal.timeout(2000) });
    return r.ok;
  } catch { return false; }
}

if (await up()) { console.log('CDP already up'); process.exit(0); }

fs.mkdirSync(PROFILE, { recursive: true });
const child = spawn(EXE, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  '--no-first-run', '--no-default-browser-check',
  '--window-size=1440,900', '--window-position=80,40',
  '--disable-features=Translate,OptimizationHints',
  'about:blank'
], { detached: true, stdio: 'ignore' });
child.unref();
console.log('launched chrome pid', child.pid);

for (let i = 0; i < 40; i++) {
  await new Promise(r => setTimeout(r, 500));
  if (await up()) { console.log('CDP ready'); process.exit(0); }
}
console.error('CDP did not come up'); process.exit(1);
