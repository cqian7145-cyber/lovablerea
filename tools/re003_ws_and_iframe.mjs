import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep as delay } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
const PROJECT = '053a133e-76d8-4c7c-b418-2ab5f486a673';
const chrome = await Chrome.attach({ port: 9333 }).catch(() => Chrome.launch({ port: 9333, headless: false }));
const page = await chrome.newPage({ width: 1440, height: 900 });

await page.goto(`https://lovable.dev/projects/${PROJECT}`, { settle: 9000 }).catch(() => {});
await delay(9000);

const res = await page.evaluate(`(() => {
  const f = document.querySelector('iframe[title="Project preview"]');
  let locHref = null, crossOrigin = null, locErr = null;
  try { locHref = f ? f.contentWindow.location.href : null; crossOrigin = false; }
  catch (e) { locErr = String(e && e.message || e); crossOrigin = true; }
  return {
    url: location.href,
    iframe: f ? {
      srcAttr: f.getAttribute('src'), srcProp: f.src, srcdocLen: (f.getAttribute('srcdoc')||'').length,
      sandbox: f.getAttribute('sandbox'), allow: f.getAttribute('allow'),
      referrerPolicy: f.getAttribute('referrerpolicy'), loading: f.getAttribute('loading'),
      rect: (r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(f.getBoundingClientRect()),
      contentWindowHref: locHref, crossOrigin, locErr,
      childUrl: (() => { try { return f.contentWindow.location.href; } catch { return '<cross-origin>'; } })(),
      childTitle: (() => { try { return f.contentDocument.title; } catch { return '<cross-origin>'; } })(),
    } : null,
    iframeCount: document.querySelectorAll('iframe').length,
  };
})()`);

const ws = [];
if (page.wsFrames) {
  const byUrl = new Map();
  for (const f of page.wsFrames) {
    const k = f.url;
    if (!byUrl.has(k)) byUrl.set(k, { url: k, frames: 0, in: 0, out: 0, first: [], ops: {} });
    const b = byUrl.get(k);
    b.frames++; b[f.dir]++;
    b.ops[f.op] = (b.ops[f.op] || 0) + 1;
    if (b.first.length < 4) b.first.push({ dir: f.dir, data: String(f.data).slice(0, 220) });
  }
  ws.push(...[...byUrl.values()]);
}

const evidence = {
  at: new Date().toISOString(),
  editor: res,
  ws: ws,
  perf: page.requests.filter(r => /_serverFn|\/build-runs|\/sandbox|\/drafts/.test(r.url)).slice(0, 20).map(r => ({ url: r.url.replace(/https:\/\/lovable\.dev/, ''), status: r.status, mime: r.mime })),
};
fs.writeFileSync(path.join(OUT, 'editor-ws-and-iframe.json'), JSON.stringify(evidence, null, 2));
console.log(JSON.stringify(evidence, null, 2).slice(0, 6000));
await page.close().catch(() => {});

