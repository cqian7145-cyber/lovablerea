// Extract API path literals, external hosts and domain names from downloaded bundles.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'D:/lovable-research/evidence/assets';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
const kw = /(project|chat|file|deploy|publish|github|supabase|workspace|credit|agent|model|message|version|snapshot|preview|sandbox|build|domain|connector|integration|auth|user|team|org|member|invite|usage|billing|secret|env|db|database|migrat|rollback|restore|fork|clone|share|collab)/i;

const paths = new Map();
const hosts = new Map();

for (const f of files) {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of text.matchAll(/["'`](\/[a-zA-Z0-9][a-zA-Z0-9/_{}$.:-]{3,80})["'`]/g)) {
    const p = m[1];
    if (!kw.test(p)) continue;
    if (/\.(js|css|svg|png|woff2?|json)$/.test(p)) continue;
    paths.set(p, (paths.get(p) || 0) + 1);
  }
  for (const m of text.matchAll(/https?:\/\/([a-zA-Z0-9.-]+\.[a-z]{2,})/g)) {
    hosts.set(m[1], (hosts.get(m[1]) || 0) + 1);
  }
  // websocket + tRPC-ish endpoints
  for (const m of text.matchAll(/(wss?:\/\/[^"'`\s]{4,120})/g)) hosts.set('WS:' + m[1].slice(0, 120), 1);
}

console.log('=== PATH LITERALS (' + paths.size + ') ===');
[...paths.entries()].sort((a, b) => b[1] - a[1]).slice(0, 220).forEach(([p, c]) => console.log(String(c).padStart(3), p));
console.log('\n=== HOSTS (' + hosts.size + ') ===');
[...hosts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 90).forEach(([h, c]) => console.log(String(c).padStart(3), h));
