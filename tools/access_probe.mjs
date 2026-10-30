// Probe access conditions for authenticated app routes without credentials (status + redirect only).
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36' };
const routes = [
  '/dashboard', '/projects', '/projects/new', '/projects/empty', '/projects/import', '/chats', '/chats/new',
  '/settings', '/settings/authorized-apps', '/settings/recently-deleted-projects', '/organization', '/tokens',
  '/workspaces/new', '/invite/abc', '/share-preview/00000000-0000-0000-0000-000000000000',
  '/preview/00000000-0000-0000-0000-000000000000', '/projects/00000000-0000-0000-0000-000000000000',
  '/dashboard/projects', '/build', '/agent-browser/login', '/cofounder', '/chats/cofounder',
];
for (const r of routes) {
  try {
    const res = await fetch('https://lovable.dev' + r, { headers: UA, redirect: 'manual' });
    const loc = res.headers.get('location') || '';
    const ct = res.headers.get('content-type') || '';
    let note = '';
    if (ct.includes('text/html') && res.status === 200) {
      const t = await res.text();
      note = (t.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
      note += ' | cf-challenge=' + /Just a moment|请稍候/.test(t);
    }
    console.log(`${String(res.status).padEnd(3)} ${r.padEnd(58)} -> ${loc}  ${note}`);
  } catch (e) { console.log('ERR', r, e.message); }
}
