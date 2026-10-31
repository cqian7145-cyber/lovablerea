// Scan downloaded JS bundles for agent-related string literals (read-only, local files).
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/lovable-research/evidence/assets';
const OUT = 'D:/lovable-research/RE-001-AGENT/evidence';
fs.mkdirSync(OUT, { recursive: true });

const PATTERNS = [
  ['sse', /text\/event-stream|Last-Event-ID|x-browser-session-id|EventSource/gi],
  ['ws', /\/app\/ws|new WebSocket\(|wss?:\/\//gi],
  ['tool', /\b(write_file|read_file|edit_file|apply_patch|str_replace|run_command|run_terminal_cmd|list_files|list_dir|search_files|create_file|delete_file|grep_search|execute_sql|browser_[a-z_]+)\b/g],
  ['turn', /["'`](turn[._-][a-z_]+|step[._-][a-z_]+|activity[._-][a-z_]+)["'`]/gi],
  ['state', /["'`](planning|awaiting_approval|verifying|executing|queued|paused|rejected|approved)["'`]/gi],
  ['agentroute', /`?\/[a-z0-9_\-]*\/?(chats?|turns?|messages?|stream|agent|drafts?|artifacts?|checkpoints?)\/[a-z0-9_\-${}./]*`?/gi],
  ['svc', /\b[a-z][a-z0-9_]*\.v\d+\.[A-Z][A-Za-z]*Service\/[A-Za-z]+/g],
  ['diff', /["'`](diff|patch|unified_diff|git_diff|changes)["'`]/gi],
  ['plan', /["'`](plan_mode|build_mode|chat_mode|mode_switch|approve_plan|reject_plan)["'`]/gi],
];

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.startsWith('_'));
const report = [];
const stats = {};

for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const [name, re] of PATTERNS) {
    re.lastIndex = 0;
    let m;
    const seen = new Set();
    while ((m = re.exec(src)) !== null) {
      const start = Math.max(0, m.index - 110);
      const end = Math.min(src.length, m.index + m[0].length + 110);
      const snip = src.slice(start, end).replace(/\s+/g, ' ');
      const key = m[0].toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      stats[name] = (stats[name] || 0) + 1;
      report.push({ file: f, kind: name, match: m[0], context: snip });
      if (seen.size > 60) break;
    }
  }
}

fs.writeFileSync(path.join(OUT, 'bundle-agent-strings.json'), JSON.stringify(report, null, 1));
const summary = Object.entries(stats).map(([k, v]) => `${k}: ${v}`).join('\n');
fs.writeFileSync(path.join(OUT, 'bundle-agent-strings.txt'), summary + '\n\n' + report.map(r => `[${r.kind}] ${r.match}\n  ${r.file}\n  ${r.context}\n`).join('\n'));
console.log(summary);
console.log('total matches:', report.length);
for (const [k] of PATTERNS) {
  const rows = report.filter(r => r.kind === k).slice(0, 14);
  if (!rows.length) continue;
  console.log(`\n=== ${k} ===`);
  for (const r of rows) console.log(`* ${r.match}\n    ${r.context.slice(0, 230)}`);
}
