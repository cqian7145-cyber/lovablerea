// Inspect template catalogue pages + generated template apps to understand produced project structure.
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36' };

async function get(u) {
  const r = await fetch(u, { headers: UA, redirect: 'follow' });
  return { status: r.status, url: r.url, headers: Object.fromEntries(r.headers), text: await r.text() };
}

const page = await get('https://lovable.dev/templates/to-do-list-app');
const text = page.text;
console.log('status', page.status, 'len', text.length);
const links = [...new Set([...text.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))];
console.log('LINKS:', links.filter((l) => /lovable\.app|preview|templates|remix/.test(l)).slice(0, 40).join('\n'));
console.log('TITLE:', (text.match(/<title>([^<]*)<\/title>/) || [])[1]);
const plain = text.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('PLAIN:', plain.slice(0, 1200));
