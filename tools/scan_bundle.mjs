// Scan downloaded bundles for architecture-relevant strings, printing bounded distinct snippets.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'D:/lovable-research/evidence/assets';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
const patterns = process.argv.slice(2).length ? process.argv.slice(2) : [
  'wss?://[a-zA-Z0-9._-]+',
  'https://[a-zA-Z0-9.-]*lovable[a-zA-Z0-9./_-]*',
  'e2b|daytona|firecracker|microvm|fly\\.io|cloudflare|vercel|netlify|supabase|neon\\.tech|drizzle',
  'EventSource|text/event-stream|websocket',
  '/api/[a-zA-Z0-9/_{}$.-]+',
  'credit[sS]?|token[sS]?\\b',
  'claude|gpt-[0-9a-z-]+|gemini|deepseek|grok|mistral',
  'sourcemap|__REACT_DEVTOOLS|__NEXT_DATA__',
];

for (const f of files) {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  const out = [];
  for (const p of patterns) {
    const re = new RegExp(p, 'gi');
    const hits = new Map();
    let m;
    while ((m = re.exec(text)) && hits.size < 12) {
      const s = Math.max(0, m.index - 45);
      const snippet = text.slice(s, m.index + m[0].length + 45).replace(/\s+/g, ' ');
      hits.set(m[0], snippet);
      if (m[0].length === 0) re.lastIndex++;
    }
    if (hits.size) out.push({ pattern: p, count: hits.size, samples: [...hits.entries()].map(([k, v]) => `${k}  <<  ${v.slice(0, 120)}`) });
  }
  if (out.length) {
    console.log(`\n#### ${f} (${(text.length / 1024).toFixed(0)} KB)`);
    for (const o of out) {
      console.log(`  [${o.pattern}] x${o.count}`);
      for (const s of o.samples.slice(0, 6)) console.log('    ' + s);
    }
  }
}
