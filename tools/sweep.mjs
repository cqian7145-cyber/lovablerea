// Sweep a list of URLs: screenshot, save HTML, extract structural summary + network hosts.
import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/evidence/raw';
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { name: 'home-app', url: 'https://lovable.dev/home' },
  { name: 'login', url: 'https://lovable.dev/login' },
  { name: 'pricing', url: 'https://lovable.dev/pricing' },
  { name: 'templates', url: 'https://lovable.dev/templates' },
  { name: 'connect', url: 'https://lovable.dev/connect' },
  { name: 'mcp', url: 'https://lovable.dev/mcp' },
  { name: 'build-app-builder', url: 'https://lovable.dev/build/app-builder' },
  { name: 'security', url: 'https://lovable.dev/security' },
  { name: 'docs-welcome', url: 'https://docs.lovable.dev/introduction/welcome' },
  { name: 'docs-changelog', url: 'https://docs.lovable.dev/changelog' },
  { name: 'community', url: 'https://lovable.dev/community' },
  { name: 'blog', url: 'https://lovable.dev/blog' },
];

let chrome;
try {
  chrome = await Chrome.attach({ port: 9333 });
  console.log('attached to running chrome');
} catch {
  chrome = await Chrome.launch({ port: 9333, profile: path.resolve('.cdp-profile'), headless: false });
  console.log('launched chrome');
}
const index = [];

for (const t of targets) {
  const page = await chrome.newPage({ width: 1440, height: 900 });
  const rec = { name: t.name, url: t.url, startedAt: new Date().toISOString() };
  try {
    await page.goto(t.url, { settle: 2500 });
    for (let i = 0; i < 10; i++) {
      const ch = await page.evaluate(`/just a moment|请稍候|verify you are human/i.test(document.title)`);
      if (!ch) break;
      await sleep(3000);
    }
    rec.finalUrl = await page.evaluate('location.href');
    rec.title = await page.evaluate('document.title');
    rec.text = await page.evaluate('document.body ? document.body.innerText.slice(0, 6000) : ""');
    rec.headings = await page.evaluate(`[...document.querySelectorAll('h1,h2,h3')].slice(0,40).map(h=>h.tagName+': '+h.innerText.trim().replace(/\\s+/g,' ').slice(0,140))`);
    rec.buttons = await page.evaluate(`[...document.querySelectorAll('button,a[role=button]')].map(b=>(b.innerText||b.getAttribute('aria-label')||'').trim()).filter(Boolean).slice(0,60)`);
    rec.hosts = [...new Set(page.requests.map((r) => { try { return new URL(r.url).host; } catch { return ''; } }))].filter(Boolean);
    rec.apiCalls = page.requests
      .filter((r) => /\/(api|rest|graphql|functions|auth|trpc|rpc)\b/i.test(r.url) || r.type === 'XHR' || r.type === 'Fetch' || r.type === 'WebSocket')
      .map((r) => ({ m: r.method, u: r.url.slice(0, 300), s: r.status, t: r.type }))
      .slice(0, 80);
    rec.counts = { requests: page.requests.length };
    await page.screenshot(path.join(OUT, `page-${t.name}.png`), { fullPage: true });
    fs.writeFileSync(path.join(OUT, `page-${t.name}.html`), await page.html());
  } catch (e) {
    rec.error = String((e && e.message) || e);
  }
  await page.close();
  index.push(rec);
  console.log(`[${t.name}] ${rec.finalUrl || ''} | ${rec.title || rec.error || ''} | hosts=${(rec.hosts || []).length}`);
}

fs.writeFileSync(path.join(OUT, 'sweep.json'), JSON.stringify(index, null, 2));
console.log('wrote sweep.json with', index.length);
chrome.close();
