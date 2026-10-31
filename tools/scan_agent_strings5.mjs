// Fifth pass: chat item payload discriminated union + stream event types.
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/evidence/assets';
const OUT = 'D:/lovable-research/RE-001-AGENT/evidence';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js'));

const KEYS = [
  'payload.type===', 'payload.type:', '"user_message"', '"assistant_message"',
  '"tool_call"', '"tool_output"', 'assistant_partial', 'chat_items', '/items',
  'event_type:', '"message_delta"', '"thinking"', 'reasoning', 'stop_reason',
];

const rows = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const k of KEYS) {
    let idx = -1, n = 0;
    while ((idx = src.indexOf(k, idx + 1)) !== -1 && n < 10) {
      n++;
      const c = src.slice(Math.max(0, idx - 250), Math.min(src.length, idx + 320)).replace(/\s+/g, ' ');
      rows.push({ file: f, key: k, context: c });
    }
  }
}
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-5.json'), JSON.stringify(rows, null, 1));
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-5.txt'), rows.map(r => `[${r.key}] ${r.file}\n  ${r.context}\n`).join('\n'));
console.log('rows', rows.length);
for (const k of KEYS) console.log(k, rows.filter(r => r.key === k).length);
