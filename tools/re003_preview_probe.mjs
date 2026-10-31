import fs from 'node:fs';
import path from 'node:path';
import { Chrome } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
fs.mkdirSync(OUT, { recursive: true });

const PREVIEW = 'https://053a133e-76d8-4c7c-b418-2ab5f486a673.lovableproject.com/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36';

const result = { previewUrl: PREVIEW, at: new Date().toISOString(), http: {}, cdp: {} };

// ---------- 1. plain HTTP probes ----------
async function probe(url, label) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' }, redirect: 'follow' });
    const text = await r.text();
    const headers = {};
    for (const [k, v] of r.headers.entries()) headers[k] = v;
    result.http[label] = {
      url, status: r.status, finalUrl: r.url, redirected: r.redirected,
      headers, bodyBytes: text.length, bodyHead: text.slice(0, 4000),
    };
    return text;
  } catch (e) {
    result.http[label] = { url, error: String(e && e.message || e) };
    return '';
  }
}

const html = await probe(PREVIEW, 'root');
await probe(PREVIEW + 'index.html', 'index_html');
await probe(PREVIEW + '@vite/client', 'vite_client');
await probe(PREVIEW + 'src/main.tsx', 'src_main');
await probe(PREVIEW + '@react-refresh', 'react_refresh');
await probe(PREVIEW + '__vite_ping', 'vite_ping');
await probe(PREVIEW + 'nonexistent-' + Date.now(), 'not_found');

// static analysis of served HTML
const signals = {
  hasViteClient: /@vite\/client/.test(html),
  hasReactRefresh: /react-refresh|RefreshRuntime/.test(html),
  hasModuleScript: /<script[^>]+type="module"/i.test(html),
  scriptSrcs: [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)].map(m => m[1]),
  linkHrefs: [...html.matchAll(/<link[^>]+href="([^"]+)"/gi)].map(m => m[1]).slice(0, 20),
  hasImportMetaHot: /import\.meta\.hot/.test(html),
  hasNextData: /__NEXT_DATA__/.test(html),
  hasRootDiv: /<div id="root"/.test(html),
  servedAt: (html.match(/<meta[^>]+name="(?:generator|build)"[^>]*>/i) || [])[0] || null,
};
result.httpSignals = signals;

// ---------- 2. CDP: request/console capture on preview ----------
const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
page.requests.length = 0; page.console.length = 0; page.errors?.splice?.(0);
await page.goto(PREVIEW, { timeout: 45000, settle: 6000 });
await new Promise(r => setTimeout(r, 4000));

const dom = await page.evaluate(`(() => {
  const out = { title: document.title, url: location.href, readyState: document.readyState,
    htmlBytes: document.documentElement.outerHTML.length,
    scripts: [...document.scripts].map(s => ({ src: s.src, type: s.type, inline: !s.src, len: (s.textContent||'').length })),
    links: [...document.querySelectorAll('link[rel]')].map(l => ({ rel: l.rel, href: l.href })),
    root: document.querySelector('#root') ? document.querySelector('#root').innerHTML.length : null,
    nextData: !!window.__NEXT_DATA__,
    vite: typeof window.__vite__ !== 'undefined' || !!window.__vite_plugin_react_preamble_installed__,
    reactRefreshInstalled: !!window.__vite_plugin_react_preamble_installed__,
    perf: performance.getEntriesByType('navigation').map(n => ({ type: n.type, dur: n.duration, domContentLoaded: n.domContentLoadedEventEnd, load: n.loadEventEnd })),
  };
  return out;
})()`);
result.cdp.dom = dom;
result.cdp.console = page.console.slice(0, 60);
result.cdp.requests = page.requests.map(r => ({ url: r.url, method: r.method, status: r.status, type: r.type, mime: r.mime, bytes: r.size })).slice(0, 200);
result.cdp.ws = page.wsFrames.slice(0, 40);

try {
  await page.screenshot(path.join(OUT, 'preview-direct.png'));
} catch (e) { result.cdp.screenshotError = String(e && e.message || e); }

// ---------- 3. editor iframe attributes (read-only attribute inspection) ----------
try {
  const targets = await chrome.listTargets();
  const editor = targets.find(t => t.type === 'page' && /lovable\.dev\/projects\//.test(t.url));
  if (editor) {
    const ep = await chrome.attachToTarget(editor.targetId || editor.id, { width: 1440, height: 900 });
    const ifr = await ep.evaluate(`(() => {
      const f = [...document.querySelectorAll('iframe')].map(x => ({
        title: x.title, src: x.getAttribute('src'), sandbox: x.getAttribute('sandbox'),
        allow: x.getAttribute('allow'), referrerPolicy: x.getAttribute('referrerpolicy'),
        allowFullscreen: x.allowFullscreen, loading: x.getAttribute('loading'),
        w: x.getBoundingClientRect().width, h: x.getBoundingClientRect().height,
        sameOriginAccessible: (() => { try { return !!x.contentDocument; } catch { return false; } })(),
      }));
      return { href: location.href, iframes: f };
    })()`);
    result.cdp.editorIframes = ifr;
    await ep.close();
  } else {
    result.cdp.editorIframes = { note: 'no editor target open' };
  }
} catch (e) {
  result.cdp.editorIframes = { error: String(e && e.message || e) };
}

fs.writeFileSync(path.join(OUT, 'preview-probe.json'), JSON.stringify(result, null, 2));
await page.close();
chrome.close();

console.log(JSON.stringify({
  httpStatus: Object.fromEntries(Object.entries(result.http).map(([k, v]) => [k, v.status ?? v.error])),
  signals, domTitle: dom.title, navType: dom.perf?.[0]?.type,
  requestHosts: [...new Set(result.cdp.requests.map(r => { try { return new URL(r.url).host; } catch { return 'n/a'; } }))],
  consoleCount: result.cdp.console.length, wsCount: result.cdp.ws.length,
  iframes: result.cdp.editorIframes,
}, null, 2));
