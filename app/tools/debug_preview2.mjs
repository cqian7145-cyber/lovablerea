import { Chrome } from "../../tools/cdp.mjs";

const base = process.argv[2];
const c = await Chrome.attach({ port: 9333 });
const p = await c.newPage({ width: 1200, height: 800 });
await p.goto(base, { settle: 1500 });
await new Promise((r) => setTimeout(r, 3000));

const info = await p.evaluate(`(() => ({
  rootLen: document.getElementById('root')?.innerHTML.length ?? -1,
  scripts: [...document.scripts].map(s => s.src || 'inline'),
  res: performance.getEntriesByType('resource').map(e => [e.name.split('/').pop(), e.responseStatus, Math.round(e.duration)]),
  err: window.__lastError ?? null
}))()`);
console.log(JSON.stringify(info, null, 2));

// Re-run the bundle manually to surface the error message.
const err = await p.evaluate(`(async () => {
  try {
    const s = document.createElement('script');
    s.src = 'assets/app.js?' + Date.now();
    document.body.appendChild(s);
    await new Promise(r => setTimeout(r, 1200));
    return 'rerun-ok root=' + document.getElementById('root').innerHTML.length;
  } catch (e) { return 'ERR ' + e.message; }
})()`);
console.log(err);
await p.close();
await c.close();
