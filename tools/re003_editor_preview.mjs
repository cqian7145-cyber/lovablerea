import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
fs.mkdirSync(OUT, { recursive: true });
const PROJECT = 'https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673';
const out = { at: new Date().toISOString(), project: PROJECT };

const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
page.requests.length = 0; page.console.length = 0; page.wsFrames.length = 0;

await page.goto(PROJECT, { timeout: 60000, settle: 3000 });

// wait for a preview target to appear
let prev = null;
for (let i = 0; i < 30; i++) {
  const ts = await chrome.listTargets();
  prev = ts.find(t => /lovableproject\.com|id-preview--/.test(t.url || ''));
  if (prev) break;
  await new Promise(r => setTimeout(r, 1500));
}
out.editorRequests = page.requests.map(r => ({ url: r.url, status: r.status, type: r.type, mime: r.mime })).slice(0, 120);
out.editorWs = page.wsFrames.slice(0, 20);
out.console = page.console.slice(0, 30);
out.previews = (await chrome.listTargets()).filter(t => /lovableproject|id-preview|lovable\.app/.test(t.url || '')).map(t => ({ id: t.targetId || t.id, type: t.type, url: t.url }));

try {
  out.editorIframes = await page.evaluate(`(() => [...document.querySelectorAll('iframe')].map(x => ({
    title: x.title, srcAttr: x.getAttribute('src'), srcdocLen: (x.getAttribute('srcdoc')||'').length,
    sandbox: x.getAttribute('sandbox'), visible: x.getBoundingClientRect().width > 10,
    w: Math.round(x.getBoundingClientRect().width), h: Math.round(x.getBoundingClientRect().height),
    crossOrigin: (() => { try { return !x.contentDocument; } catch { return true; } })(),
  })))()`);
} catch (e) { out.iframeErr = String(e && e.message || e); }

if (prev) {
  const id = prev.targetId || prev.id;
  out.previewTarget = { id, url: prev.url, type: prev.type };
  const pp = await chrome.attachToTarget(id, { width: 1440, height: 900 });
  pp.requests.length = 0; pp.console.length = 0;
  try { await pp.chrome.send('Network.enable', { maxTotalBufferSize: 20_000_000 }, pp.sessionId); } catch {}
  try {
    await pp.chrome.send('Page.reload', { ignoreCache: false }, pp.sessionId);
  } catch (e) { out.reloadErr = String(e && e.message || e); }
  await new Promise(r => setTimeout(r, 10000));

  try {
    out.dom = await pp.evaluate(`(() => {
      const res = performance.getEntriesByType('resource').map(r => ({ n: r.name.replace(location.origin,''), t: r.initiatorType, ms: Math.round(r.duration), kb: +(r.transferSize/1024).toFixed(1) }));
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        url: location.href, title: document.title, readyState: document.readyState,
        htmlBytes: document.documentElement.outerHTML.length,
        scripts: [...document.scripts].map(s => ({ src: s.src.replace(location.origin,''), type: s.type, inline: !s.src, len: (s.textContent||'').length })),
        styles: [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href.replace(location.origin,'')),
        inlineStyleCount: document.querySelectorAll('style').length,
        rootHtmlLen: document.querySelector('#root')?.innerHTML.length ?? null,
        bodyText: (document.body?.innerText || '').slice(0, 300),
        flags: { vitePreamble: !!window.__vite_plugin_react_preamble_installed__, vite: !!window.__vite__, next: !!window.__NEXT_DATA__, sw: !!navigator.serviceWorker?.controller },
        resources: res.slice(0, 120),
        nav: nav ? { type: nav.type, dcl: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), kb: +(nav.transferSize/1024).toFixed(1) } : null,
      };
    })()`);
  } catch (e) { out.domErr = String(e && e.message || e); }
  out.previewRequests = pp.requests.map(r => ({ url: r.url, status: r.status, type: r.type, mime: r.mime, proto: r.protocol, ip: r.remoteIPAddress })).slice(0, 200);
  out.previewWs = pp.wsFrames.slice(0, 30);
  out.previewConsole = pp.console.slice(0, 30);
  try { await pp.screenshot(path.join(OUT, 'preview-iframe.png')); } catch (e) { out.shotErr = String(e && e.message || e); }
  await pp.close();
}

try { await page.screenshot(path.join(OUT, 'editor-with-preview.png')); } catch (e) { out.editorShotErr = String(e && e.message || e); }
await page.close();
chrome.close();
fs.writeFileSync(path.join(OUT, 'editor-preview-probe.json'), JSON.stringify(out, null, 2));

console.log(JSON.stringify({
  previewTarget: out.previewTarget, previews: out.previews, iframes: out.editorIframes,
  dom: out.dom ? { url: out.dom.url, title: out.dom.title, htmlBytes: out.dom.htmlBytes, flags: out.dom.flags, nav: out.dom.nav, scripts: out.dom.scripts, styles: out.dom.styles, rootLen: out.dom.rootHtmlLen, bodyText: out.dom.bodyText, resourceCount: out.dom.resources?.length } : null,
  resSample: out.dom?.resources?.slice(0, 30), ws: out.previewWs?.length, reqCount: out.previewRequests?.length,
  editorReqHosts: [...new Set((out.editorRequests||[]).map(r => { try { return new URL(r.url).host; } catch { return 'x'; } }))],
}, null, 2).slice(0, 6000));
