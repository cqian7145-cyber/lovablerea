import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DIR = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';

// ---------- 1. sanitize JWTs / receipts in captured evidence ----------
const JWT = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;
const RECEIPT = /__lovable_receipt=[A-Za-z0-9_-]+/g;
const report = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.json')) continue;
  const p = path.join(DIR, f);
  const before = fs.readFileSync(p, 'utf8');
  let after = before.replace(JWT, '<REDACTED_JWT>').replace(RECEIPT, '__lovable_receipt=<REDACTED>');
  if (after !== before) {
    fs.writeFileSync(p, after);
    report.push({ file: f, jwtReplaced: (before.match(JWT) || []).length, receiptReplaced: (before.match(RECEIPT) || []).length });
  }
}
fs.writeFileSync(path.join(DIR, 'sanitization-report.json'), JSON.stringify({ at: new Date().toISOString(), report }, null, 2));

// ---------- 2. runtime scripts served into the preview ----------
const out = { at: new Date().toISOString(), fetched: {} };
const targets = [
  ['cdn_lovable', 'https://cdn.gpteng.co/lovable.js'],
  ['events_js', 'https://id-preview--053a133e-76d8-4c7c-b418-2ab5f486a673.lovable.app/__l5e/events.270c78a44fc53e7b.js'],
  ['preview_root_no_receipt', 'https://id-preview--053a133e-76d8-4c7c-b418-2ab5f486a673.lovable.app/'],
];
for (const [label, url] of targets) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/156.0.0.0' } });
    const t = await r.text();
    fs.writeFileSync(path.join(DIR, label + '.txt'), t);
    out.fetched[label] = { status: r.status, bytes: t.length, sha: crypto.createHash('sha256').update(t).digest('hex').slice(0, 12), head: t.slice(0, 600) };
  } catch (e) { out.fetched[label] = { error: String(e && e.message || e) }; }
}

// ---------- 3. string scan of the injected bridge ----------
const js = out.fetched.cdn_lovable?.status === 200 ? fs.readFileSync(path.join(DIR, 'cdn_lovable.txt'), 'utf8') : '';
const pick = (re) => [...new Set((js.match(re) || []))].slice(0, 25);
out.bridge = {
  bytes: js.length,
  postMessage: pick(/postMessage/g),
  origins: pick(/https?:\/\/[a-z0-9.-]+\.(?:dev|co|app|com|net)[^\s"'`)]{0,60}/gi),
  lovableKeys: pick(/(?:_lovable|__lovable|lovable)[A-Za-z_]{0,40}/g),
  selectors: pick(/(?:data-lovable|lovable-id|data-testid)[A-Za-z_-]{0,30}/g),
  hasReactRefresh: /react-refresh|RefreshRuntime/.test(js),
  hasViteClient: /@vite\/client|\/@vite/.test(js),
  hasErrorOverlay: /error-overlay|vite-error-overlay|overlay/i.test(js),
  hasEditorBridge: /parent|window\.parent/.test(js),
};
const ev = out.fetched.events_js?.status === 200 ? fs.readFileSync(path.join(DIR, 'events_js.txt'), 'utf8') : '';
out.events = {
  bytes: ev.length,
  endpointPaths: [...new Set((ev.match(/["'`]\/__l5e\/[^"'`]+/g) || []))].slice(0, 20),
  eventNames: [...new Set((ev.match(/"(?:error|unhandledrejection|console|click|navigation|vitest|build)[a-z_]*"/gi) || []))].slice(0, 20),
  hasBeacon: /sendBeacon/.test(ev), hasFetch: /fetch\(/.test(ev),
  stack: /stack|filename|lineno|colno|message/i.test(ev),
};

fs.writeFileSync(path.join(DIR, 'runtime-scripts.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify({ sanitization: report, fetched: out.fetched, bridge: out.bridge, events: out.events }, null, 2).slice(0, 5000));
