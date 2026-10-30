import { Chrome } from './cdp.mjs';
const chrome = await Chrome.attach({ port: 9333 });
const ts = await chrome.listTargets();
const t = ts.find(x => x.type === 'page' && /lovable\.dev\/projects/.test(x.url));
const page = await chrome.attachToTarget(t.targetId, { width: 1440, height: 900 });
const views = [['?view=more&more=database','database'],['?view=more&more=users&subview=newAnalytics','users'],['?view=more&more=security&subview=newAnalytics','security'],['?view=more&more=settings&subview=newAnalytics','settings'],['?view=more&more=settings-domains&subview=newAnalytics','domains'],['?view=more&more=usage','usage'],['?view=files','files'],['?view=codeEditor','code']];
for (const [q,label] of views) {
  await page.goto('https://lovable.dev/projects/053a133e-76d8-4c7c-b418-2ab5f486a673'+q, {timeout:45000, settle:500}).catch(e=>console.log('goto',e.message));
  await new Promise(r=>setTimeout(r,3500));
  const r = await page.evaluate(`(() => {
    const el = document.querySelector('[data-testid="more-view"]') || document.querySelector('[data-testid="project-editor"]');
    const main = [...document.querySelectorAll('div')].filter(e=>{const b=e.getBoundingClientRect(); return b.x>420 && b.width>700 && b.height>300}).pop();
    const txt = (el&&el.innerText) || (main&&main.innerText) || '';
    return { url: location.href, len: txt.length, txt: txt.replace(/\\s+/g,' ').slice(0,1400) };
  })()`);
  console.log('=== '+label+' | '+r.url+' | len='+r.len);
  console.log(r.txt.slice(0,1200));
}
process.exit(0);
