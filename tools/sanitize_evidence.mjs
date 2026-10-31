import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
const JWT = /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g;
const TOKENQ = /([?&](?:token|access_token|__lovable_receipt)=)[^&"'\\\s]+/g;
const RECEIPT = /__lovable_receipt=[A-Za-z0-9_-]+/g;

const rep = [];
for (const f of fs.readdirSync(DIR)) {
  if (!/\.(json|txt|md|log)$/i.test(f)) continue;
  const p = path.join(DIR, f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(JWT, '<REDACTED_JWT>').replace(TOKENQ, '$1<REDACTED>').replace(RECEIPT, '__lovable_receipt=<REDACTED>');
  if (after !== before) {
    fs.writeFileSync(p, after);
    rep.push({ file: f, jwt: (before.match(JWT) || []).length, tokenQuery: (before.match(TOKENQ) || []).length, receipt: (before.match(RECEIPT) || []).length });
  }
}
// also scan sibling report dir root for md files
const ROOT = 'D:/lovable-research/RE-003-LIVE-PREVIEW';
for (const f of fs.readdirSync(ROOT)) {
  if (!f.endsWith('.md')) continue;
  const p = path.join(ROOT, f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(JWT, '<REDACTED_JWT>').replace(TOKENQ, '$1<REDACTED>');
  if (after !== before) { fs.writeFileSync(p, after); rep.push({ file: f, jwt: (before.match(JWT) || []).length }); }
}
const log = { at: new Date().toISOString(), rounds: 'second-pass', rep };
fs.writeFileSync(path.join(DIR, 'sanitization-report-2.json'), JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));

// verify no JWTs remain anywhere under the research dir
const walk = (d, acc = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!/cdp-profile|rea-main|\.git/.test(p)) walk(p, acc); } else if (/\.(json|txt|md|log|html)$/i.test(e.name)) acc.push(p); } return acc; };
const hits = [];
for (const p of walk('D:/lovable-research')) {
  try { const t = fs.readFileSync(p, 'utf8'); if (/eyJ[A-Za-z0-9_-]{8,}\./.test(t)) hits.push(p); } catch {}
}
console.log('REMAINING_JWT_FILES=' + hits.length);
for (const h of hits) console.log(h);
