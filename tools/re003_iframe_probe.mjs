import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
fs.mkdirSync(OUT, { recursive: true });
const out = { at: new Date().toISOString() };

const chrome = await Chrome.attach({ port: 9333 });
const targets = await chrome.listTargets();
out.targets = targets.map(t => ({ id: t.targetId || t.id, type: t.type, url: t.url, title: t.title }));

const prev = targets.find(t => (t.targetId || t.id) && /lovableproject\.com|id-preview--/.test(t.url || ''));
if (!prev) { out.error = 'no preview target'; fs.writeFileSync(path.join(OUT, 'iframe-probe.json'), JSON.stringify(out, null, 2)); console.log(JSON.stringify(out, null, 2)); process.exit(0); }

out.previewTarget = { id: prev.targetId || prev.id, url: prev.url, type: prev.type };
const page = await chrome.attachToTarget(prev.targetId || prev.id, { width: 1440, height: 900 });

// full reload with network capture
page.requests.length = 0; page.console.length = 0; page.wsFrames.length = 0;
try { await page.chrome.send('Network.enable', { maxTotalBufferSize: 20_000_000 }, page.sessionId); } catch {}
try { await page.chrome.send('Page.reload', { ignoreCache: false }, page.sessionId); } catch (e) { out.reloadError = String(e && e.message || e); }
await new Promise(r => setTimeout(r, 9000));

const dom = await page.evaluate(`(() => {
  const res = performance.getEntriesByType('resource').map(r => ({ name: r.name, type: r.initiatorType, dur: Math.round(r.duration), transfer: r.transferSize, encoded: r.encodedBodySize }));
  const nav = performance.getEntriesByType('navigation')[0];
  return {
    url: location.href, title: document.title, readyState: document.readyState,
    htmlBytes: document.documentElement.outerHTML.length,
    scripts: [...document.scripts].map(s => ({ src: s.src, type: s.type, inline: !s.src, len: (s.textContent||'').length })),
    styles: [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href),
    inlineStyleCount: document.querySelectorAll('style').length,
    rootHtmlLen: document.querySelector('#root')?.innerHTML.length ?? null,
    bodyText: (document.body?.innerText || '').slice(0, 400),
    flags: {
      vitePreamble: !!window.__vite_plugin_react_preamble_installed__,
      viteClient: !!window.__vite__,
      next: !!window.__NEXT_DATA__,
      reactRoot: !!document.querySelector('#root'),
      serviceWorker: !!navigator.serviceWorker?.controller,
    },
    resources: res.slice(0, 120),
    nav: nav ? { type: nav.type, dcl: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), transfer: nav.transferSize } : null,
  };
})()`);
out.dom = dom;
out.console = page.console.slice(0, 40);
out.ws = page.wsFrames.slice(0, 40);
out.requests = page.requests.map(r => ({ url: r.url, status: r.status, type: r.type, mime: r.mime, bytes: r.size, proto: r.protocol, ip: r.remoteIPAddress })).slice(0, 200);

// iframe attribute forensics on editor page
try {
  const ed = targets.find(t => t.type === 'page' && /lovable\.dev\/projects\//.test(t.url || ''));
  if (ed) {
    const ep = await chrome.attachToTarget(ed.targetId || ed.id, { width: 1440, height: 900 });
    out.editorIframes = await ep.evaluate(`(() => [...document.querySelectorAll('iframe')].map(x => ({
      title: x.title, srcAttr: x.getAttribute('src'), srcdocLen: (x.getAttribute('srcdoc')||'').length,
      sandbox: x.getAttribute('sandbox'), loading: x.getAttribute('loading'),
      referrerpolicy: x.getAttribute('referrerpolicy'),
      visible: x.getBoundingClientRect().width > 10,
      w: Math.round(x.getBoundingClientRect().width), h: Math.round(x.getBoundingClientRect().height),
    })))()`);
    await ep.close();
  }
} catch (e) { out.editorIframesError = String(e && e.message || e); }

try { await page.screenshot(path.join(OUT, 'preview-iframe.png')); } catch (e) { out.shotErr = String(e && e.message || e); }

fs.writeFileSync(path.join(OUT, 'iframe-probe.json'), JSON.stringify(out, null, 2));
await page.close();
chrome.close();
console.log(JSON.stringify({
  previewTarget: out.previewTarget, dom: out.dom && { url: out.dom.url, title: out.dom.title, htmlBytes: out.dom.htmlBytes, scripts: out.dom.scripts, styles: out.dom.styles, flags: out.dom.flags, nav: out.dom.nav, bodyText: out.dom.bodyText, resources: out.dom.resources.length },
  wsCount: out.ws.length, reqCount: out.requests.length, editorIframes: out.editorIframes, console: out.console.slice(0, 8)
}, null, 2).slice(0, 5000));
