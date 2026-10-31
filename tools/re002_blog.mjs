import fs from 'node:fs';
import path from 'node:path';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
fs.mkdirSync(OUT, { recursive: true });

const urls = [
  'https://lovable.dev/blog/visual-edits',
  'https://lovable.dev/blog/introducing-visual-edit',
  'https://lovable.dev/blog/visual-edit',
];
const res = [];
for (const u of urls) {
  try {
    const r = await fetch(u, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36' } });
    const t = await r.text();
    const name = u.split('/').pop();
    fs.writeFileSync(path.join(OUT, `blog-${name}.html`), t);
    res.push({ url: u, status: r.status, finalUrl: r.url, bytes: t.length });
  } catch (e) { res.push({ url: u, error: String(e && e.message || e) }); }
}
fs.writeFileSync(path.join(OUT, 'blog-fetch.json'), JSON.stringify({ at: new Date().toISOString(), res }, null, 2));
console.log(JSON.stringify(res, null, 2));
