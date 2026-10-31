// Second-pass scan: agent streaming, activity feed, checkpoints, subagents.
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/evidence/assets';
const OUT = 'D:/lovable-research/RE-001-AGENT/evidence';
fs.mkdirSync(OUT, { recursive: true });

const PATTERNS = [
  ['stream_ep', /["'`][^"'`]{0,60}(stream|events|sse)[^"'`]{0,40}["'`]/gi],
  ['activity', /activity[._-]?(card|feed|item|log|event)[a-z_]*/gi],
  ['tool_call', /\b(tool[._-]?call|tool[._-]?result|tool[._-]?name|function[._-]?call)\b/gi],
  ['thought', /\b(thinking|thought|reasoning|chain_of_thought)\b/gi],
  ['checkpoint', /\b(checkpoint|snapshot|revert[a-z_]*|undo[a-z_]*|rollback[a-z_]*)\b/gi],
  ['credits', /\b(credit[s]?[._-][a-z_]+|usage[._-](event|record|meter)[a-z_]*)\b/gi],
  ['subagent', /\b(subagent[s]?[._-]?[a-z_]*)\b/gi],
  ['build_state', /\b(build[._-](status|state|progress|error)|preparing|waiting_for[a-z_]*)\b/gi],
  ['msg_ep', /["'`]\/workspaces\/\{workspace_id\}\/[a-z0-9_/{}\-.]+["'`]/gi],
  ['proj_ep', /["'`]\/projects\/\{project_id\}\/[a-z0-9_/{}\-.]+["'`]/gi],
  ['agent_word', /\b(agent[._-]?[a-z_]{2,20})\b/gi],
];

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.startsWith('_'));
const rows = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const [kind, re] of PATTERNS) {
    re.lastIndex = 0;
    let m; const seen = new Set();
    while ((m = re.exec(src)) !== null && seen.size < 40) {
      const key = m[0].toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const c = src.slice(Math.max(0, m.index - 90), Math.min(src.length, m.index + m[0].length + 90)).replace(/\s+/g, ' ');
      rows.push({ file: f, kind, match: m[0], context: c });
    }
  }
}

fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-2.json'), JSON.stringify(rows, null, 1));
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings-2.txt'), rows.map(r => `[${r.kind}] ${r.match}\n  ${r.file}\n  ${r.context}\n`).join('\n'));

const pick = (k, n = 10) => rows.filter(r => r.kind === k).slice(0, n);
for (const k of ['stream_ep', 'activity', 'tool_call', 'thought', 'checkpoint', 'subagent', 'build_state', 'msg_ep', 'proj_ep']) {
  const p = pick(k);
  if (!p.length) { console.log(`\n=== ${k}: (none)`); continue; }
  console.log(`\n=== ${k} (${rows.filter(r=>r.kind===k).length}) ===`);
  for (const r of p) console.log(`* ${r.match}\n    ${r.context.slice(0, 260)}`);
}
