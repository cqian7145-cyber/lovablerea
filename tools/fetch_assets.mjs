// Download public JS/CSS/JSON assets through the browser session (bypasses Cloudflare),
// saves them locally and reports sizes. Also probes for public source maps.
import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/evidence/assets';
fs.mkdirSync(OUT, { recursive: true });

const list = process.argv.slice(2);
if (!list.length) { console.error('usage: node fetch_assets.mjs <url...>'); process.exit(1); }

let chrome;
try { chrome = await Chrome.attach({ port: 9333 }); }
catch { chrome = await Chrome.launch({ port: 9333, profile: '.cdp-profile', headless: false }); }

const page = await chrome.newPage({ width: 1280, height: 800 });
await page.goto('https://lovable.dev/', { settle: 2000 });

const results = [];
for (const url of list) {
  const base = url.split('?')[0].split('/').pop();
  try {
    const r = await page.evaluate(`(async () => {
      const res = await fetch(${JSON.stringify(url)}, { credentials: 'include' });
      const text = await res.text();
      return { status: res.status, len: text.length, head: text.slice(0, 300), text };
    })()`);
    fs.writeFileSync(path.join(OUT, base), r.text);
    results.push({ url, status: r.status, bytes: r.len, file: base });
    console.log(`${r.status} ${r.len} ${base}`);
  } catch (e) {
    results.push({ url, error: String(e.message || e) });
    console.log('ERR', base, e.message);
  }
}

// source-map probe
const mapProbe = [];
for (const url of list) {
  const mapUrl = url + '.map';
  try {
    const r = await page.evaluate(`(async () => {
      const res = await fetch(${JSON.stringify(mapUrl)}, { credentials: 'include' });
      const t = await res.text();
      return { status: res.status, len: t.length, head: t.slice(0, 200) };
    })()`);
    mapProbe.push({ mapUrl, ...r });
    if (r.status === 200 && r.len > 1000) {
      const name = mapUrl.split('/').pop();
      await page.evaluate(`(async()=>{const t=await (await fetch(${JSON.stringify(mapUrl)})).text();return t.length})()`);
    }
  } catch (e) { mapProbe.push({ mapUrl, error: String(e.message) }); }
}
fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify({ results, mapProbe }, null, 2));
console.log('MAPS:', mapProbe.map((m) => `${m.status || 'ERR'} ${m.len || 0} ${m.mapUrl.split('/').pop()}`).join('\n      '));
await page.close();
chrome.close();
