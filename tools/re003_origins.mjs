import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = 'D:/lovable-research/RE-003-LIVE-PREVIEW/evidence';
fs.mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36';
const out = { at: new Date().toISOString(), probes: {} };

async function probe(url, label) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,*/*' }, redirect: 'follow' });
    const buf = Buffer.from(await r.arrayBuffer());
    const headers = {};
    for (const [k, v] of r.headers.entries()) headers[k] = v;
    const sha = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
    out.probes[label] = {
      url, status: r.status, finalUrl: r.url, redirected: r.redirected,
      sha, bytes: buf.length, contentType: r.headers.get('content-type'),
      headers, bodyHead: buf.toString('utf8', 0, 1200),
    };
    return { sha, bytes: buf.length, text: buf.toString('utf8') };
  } catch (e) {
    out.probes[label] = { url, error: String(e && e.message || e) };
    return null;
  }
}

const p = {
  draftRoot: await probe('https://053a133e-76d8-4c7c-b418-2ab5f486a673.lovableproject.com/', 'draft_root'),
  draftVite: await probe('https://053a133e-76d8-4c7c-b418-2ab5f486a673.lovableproject.com/@vite/client', 'draft_vite'),
  draftMissing: await probe('https://053a133e-76d8-4c7c-b418-2ab5f486a673.lovableproject.com/zzz-' + Date.now(), 'draft_missing'),
  idPreview: await probe('https://id-preview--053a133e-76d8-4c7c-b418-2ab5f486a673.lovable.app/', 'id_preview'),
  publishedSlug: await probe('https://pixel-perfect-picture-0038.lovable.app/', 'published_slug'),
  lovableRoot: await probe('https://lovable.dev/', 'lovable_root'),
};

out.comparison = {
  draftRootEqualsVite: p.draftRoot && p.draftVite ? p.draftRoot.sha === p.draftVite.sha : null,
  draftRootEqualsMissing: p.draftRoot && p.draftMissing ? p.draftRoot.sha === p.draftMissing.sha : null,
  draftEqualsIdPreview: p.draftRoot && p.idPreview ? p.draftRoot.sha === p.idPreview.sha : null,
  draftLooksLikeSPA: p.draftRoot ? /<div id="root"|type="module"/.test(p.draftRoot.text) : null,
  idPreviewLooksLikeSPA: p.idPreview ? /<div id="root"/.test(p.idPreview.text) : null,
  draftScriptSrcs: p.draftRoot ? [...p.draftRoot.text.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]).slice(0, 8) : null,
  idPreviewScriptSrcs: p.idPreview ? [...p.idPreview.text.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]).slice(0, 8) : null,
};

// security headers summary
const secKeys = ['content-security-policy', 'x-frame-options', 'strict-transport-security', 'cross-origin-opener-policy',
  'cross-origin-embedder-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'server', 'x-nf-request-id', 'x-deployment-id', 'via', 'cf-ray'];
out.security = {};
for (const [label, v] of Object.entries(out.probes)) {
  out.security[label] = v.headers ? Object.fromEntries(secKeys.filter(k => v.headers[k]).map(k => [k, String(v.headers[k]).slice(0, 400)])) : { error: v.error };
}

fs.writeFileSync(path.join(OUT, 'preview-origins.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify({ comparison: out.comparison, security: out.security }, null, 2).slice(0, 6000));
