// Third-pass: SSE consumption, event envelope, tool_call_event, plan/snapshot artifacts.
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/evidence/assets';
const OUT = 'D:/lovable-research/RE-001-AGENT/evidence';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.startsWith('_'));

const KEYS = [
  'tool_call_event', 'plan_file', 'snapshot_item', 'event_type', 'readSSE', 'TextDecoder',
  'getReader', 'eventStream', 'messageId', 'threadId', 'parseSSE', 'data: ',
  'build-runs', '/messages', '/events', 'artifact', 'credits_used', 'creditsUsed',
];

const rows = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const k of KEYS) {
    let idx = -1, n = 0;
    while ((idx = src.indexOf(k, idx + 1)) !== -1 && n < 6) {
      n++;
      const c = src.slice(Math.max(0, idx - 200), Math.min(src.length, idx + 260)).replace(/\s+/g, ' ');
      rows.push({ file: f, key: k, context: c });
    }
  }
}
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-3.json'), JSON.stringify(rows, null, 1));
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-3.txt'), rows.map(r => `[${r.key}] ${r.file}\n  ${r.context}\n`).join('\n'));

for (const k of ['readSSE', 'TextDecoder', 'getReader', 'parseSSE', 'data: ', 'tool_call_event', 'event_type', 'plan_file', 'snapshot_item']) {
  const p = rows.filter(r => r.key === k).slice(0, 3);
  console.log(`\n=== ${k} (${rows.filter(r => r.key === k).length}) ===`);
  for (const r of p) console.log(`  ${r.file}\n  ${r.context.slice(0, 380)}`);
}
