// Fourth pass: message send path, tool ids, agent instructions, plan/todo artifacts.
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/evidence/assets';
const OUT = 'D:/lovable-research/RE-001-AGENT/evidence';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js'));

const KEYS = [
  'text/event-stream', '/messages', '/chats/', 'sendMessage', 'tool_id', 'tool_use_id',
  'project_edit', 'AGENTS.md', 'plan.md', 'instructions', 'systemPrompt', 'todo',
  'subagent--', 'database--', 'spawn_builder', 'allowed_tools', 'max_turns',
];

const rows = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const k of KEYS) {
    let idx = -1, n = 0;
    while ((idx = src.indexOf(k, idx + 1)) !== -1 && n < 8) {
      n++;
      const c = src.slice(Math.max(0, idx - 230), Math.min(src.length, idx + 300)).replace(/\s+/g, ' ');
      rows.push({ file: f, key: k, context: c });
    }
  }
}
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-4.json'), JSON.stringify(rows, null, 1));
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-4.txt'), rows.map(r => `[${r.key}] ${r.file}\n  ${r.context}\n`).join('\n'));
console.log('rows', rows.length);
for (const k of KEYS) console.log(k, rows.filter(r => r.key === k).length);
