// Mirror the public Lovable documentation (llms.txt index -> per-page markdown) into a local corpus.
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'D:/lovable-research/evidence/docs';
const UA = { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36' } };

async function get(url, asJson = false) {
  const r = await fetch(url, UA);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return asJson ? r.json() : r.text();
}

fs.mkdirSync(OUT, { recursive: true });
const idx = await get('https://docs.lovable.dev/llms.txt');
fs.writeFileSync(path.join(OUT, '_llms.txt'), idx);
const pages = [...idx.matchAll(/^- \[([^\]]+)\]\((https:\/\/docs\.lovable\.dev\/[^)]+\.md)\)(?::\s*(.*))?$/gm)]
  .map((m) => ({ title: m[1], url: m[2], desc: m[3] || '' }));
console.log('pages in index:', pages.length);

let ok = 0, fail = 0;
const queue = [...pages];
async function worker() {
  while (queue.length) {
    const p = queue.shift();
    const rel = p.url.replace('https://docs.lovable.dev/', '').replace(/\.md$/, '.md');
    const file = path.join(OUT, rel);
    if (fs.existsSync(file)) { ok++; continue; }
    try {
      const md = await get(p.url);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, `# ${p.title}\n<!-- source: ${p.url} -->\n\n` + md);
      ok++;
    } catch (e) { fail++; console.log('FAIL', p.url, e.message); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log('saved', ok, 'failed', fail);

// extra machine-readable artifacts
for (const extra of ['llms-full.txt', 'openapi.json', 'api-reference/openapi.json', 'openapi.yaml']) {
  try {
    const t = await get(`https://docs.lovable.dev/${extra}`);
    fs.writeFileSync(path.join(OUT, '_' + extra.replace(/\//g, '_')), t);
    console.log('extra ok', extra, t.length);
  } catch (e) { console.log('extra missing', extra, e.message); }
}
fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify(pages, null, 2));
