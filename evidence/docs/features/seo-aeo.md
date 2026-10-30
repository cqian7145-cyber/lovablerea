# Optimize your app for SEO and AI search
<!-- source: https://docs.lovable.dev/features/seo-aeo.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize your app for SEO and AI search

> Run an SEO and AI search review from the Analytics view, connect Google Search Console, and research keywords and content with Lovable to help your app rank on Google, Bing, and AI search engines.

**Search Engine Optimization (SEO)** helps people find your app through search engines such as Google or Bing. **Answer Engine Optimization (AEO)** helps people find your app through AI assistants such as ChatGPT, Perplexity, Claude, or Gemini.

SEO and AEO depend on the same foundations. Your pages must be readable by crawlers, with good metadata, a clear content structure, and fast loading. Your site also needs links from other sites.

Lovable takes care of the technical foundations. Strong SEO and AEO still need review and regular work. The SEO tools are on the **SEO & AI** tab of [Analytics](https://docs.lovable.dev/features/analytics.md), next to the visits that search engines and AI assistants send you. Open **More → Analytics** in the [project toolbar](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) at the top of the editor and select **SEO & AI**.

On the **SEO & AI** tab you find:

* **Search and AI traffic**. How many visits come from search engines and AI assistants, and from which ones.
* **Google searches**. What people typed into Google before they clicked your site. Connect [Google Search Console](https://docs.lovable.dev/integrations/google-search-console.md) from the card to see it.
* **SEO and AI search review**. A scan you run when you want. It checks your sitemap, `robots.txt`, metadata, structured data, page structure, alt text, canonical tags, indexing, and AI readiness. Lovable explains each finding and can fix most of them in one click.
* **Get more search traffic**. Lovable reviews your site, suggests the next steps that help people find it, and works with you in chat. Keyword research and new content are part of it.

## Before you begin

* A review covers one project at a time.
* Running the review is included on all plans.
* **Try to fix** asks Lovable to apply the changes. Normal [Lovable usage costs](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs) apply.
* Keyword and competitor research uses Semrush data, and you do not need a Semrush account. See [Keyword research and content](#keyword-research-and-content) for the included data access.
* You can run a review on an unpublished project after your first edit. A published site gets more checks: live indexing, AI markdown rendering, and Google Search Console setup.
* Only **publicly published** apps can appear in search results. Unpublished projects, projects with restricted website access, and [branded workspace URLs](https://docs.lovable.dev/features/branded-workspace-urls.md) (`https://{app-name}.{workspace-subdomain}.lovable.app`) never appear in search. [Connect a custom domain](https://docs.lovable.dev/features/custom-domain.md) to build search presence. On unpublished projects and branded workspace URLs, the review still checks `robots.txt` and the sitemap at low priority. Those checks let you prepare before launch. While [website access](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app) is restricted to workspace members or specific people, Analytics hides the **SEO & AI** tab and the review.
* Lovable creates a `robots.txt` with every new project, but not always a sitemap, and the starting metadata is generic. The review reports what is missing or out of date, and Lovable can create or repair most of it in one click.
* Published Lovable apps return readable HTML to search engines and AI crawlers. Apps created from May 13, 2026 (June 22, 2026 on Enterprise plans) use TanStack Start with server-side rendering. Older React + Vite apps are pre-rendered for verified crawlers when they request a page. [How does Lovable handle crawlability?](#how-does-lovable-handle-crawlability) explains the difference.

> [!NOTE]
>
> This page covers organic search: earning visibility in Google's results and in
> AI answers. Lovable can also help you create and manage paid ads on Google,
> YouTube, Facebook, and Instagram. See [Advertise your app](https://docs.lovable.dev/features/ads.md).

## Quick start

The steps below start from Analytics. Two other places start a review. The Publish dialog offers **Run your first SEO review** for a public site. You can ask Lovable to review your SEO. Lovable then shows the findings on a card, and approving the card asks Lovable to fix the failing ones.

1. Open **More → Analytics** from the project toolbar and select the **SEO & AI** tab.
2. On a published project, click **Run SEO scan**. It starts a scan and jumps to **Your SEO & AI search review** at the bottom of the tab. While a scan is already running or Lovable is applying a fix, the button only jumps to the review. The first scan also starts on its own after your first edit, and **Scan again** reruns it after you make changes or apply fixes.
3. Read the failing findings at the top of the review.
4. Click **Try to fix** on a finding. To fix every failing finding in one message, click **Try to fix all**.
5. Publish your project to get the published-site checks: indexing, AI readiness, and Google Search Console setup.
6. After publishing, click **Scan again** to run those checks and confirm the fixes.
7. Connect Google Search Console from the **Google searches** card, or ask Lovable in chat. The review then shows a Google Search Console finding. Click **Try to fix** on it, and Lovable verifies your site and submits your sitemap in chat. Publish your latest changes first. Google reads the sitemap from your live site, so pages that exist only in unpublished code are not included.
8. [Connect a custom domain](https://docs.lovable.dev/features/custom-domain.md) to build search presence on your own domain. After you connect one, run the review again so Lovable can verify the new domain in Google Search Console.
9. Ask Lovable in chat for keyword and competitor research, or click **Get more search traffic** for suggested next steps. For example:

   ```text wrap theme={null}
   Which keywords should I target next?
   ```

## SEO and AI search review

You run the review when you want. It checks your code, your preview, and, after you publish publicly, your live site. Lovable does not run the review again on its own when you publish.

The review is at the bottom of the **SEO & AI** tab, under **Your SEO & AI search review**. The first scan starts on its own when the project has at least one edit. If it does not start, click **Scan project**. **Scan again** becomes available after you make changes or apply fixes.

When no scan is running, a badge at the top of the review tells you whether the results match your latest code:

* **Up to date**: the results match the current state of your project.
* **Out of date**: you made changes after the last scan, or part of the last scan did not finish. Scan again before you rely on the results.
* **Ready to rescan**: Lovable applied fixes for every failing finding. Scan again to verify the fixes.

While a scan runs, the header shows **Scanning your project…**

### Understand findings

Each finding has an icon. The icon shows the state of the finding and, for a failing finding, how much it affects your visibility in search:

* **Green check**: passing. A fix that Lovable applied also shows a green check, with a **Fix applied** badge, until the next scan verifies it.
* **Blue lightbulb**: low impact. Worth fixing, but not urgent.
* **Amber warning triangle**: medium impact.
* **Red X**: high impact. These problems can hide your site from search engines, for example:
  * A `noindex` tag on every page.
  * A home page that does not load.
  * A `robots.txt` file that blocks crawlers on a live site.
  * A `noindex` response header on a server-rendered site.

The review sorts findings into groups:

* **Failing** findings at the top.
* **Awaiting verification**: findings Lovable has fixed, with a **Fix applied** badge. The next scan confirms the fix, or moves the finding back to failing if the problem is still there.
* **Passing** findings below them, with a green check.
* **Ignored** findings in a collapsible section at the bottom. Its title shows how many checks you ignored. Click **Restore** to move a finding back to the active list.

### What SEO & AI search review checks

The review combines code analysis, preview checks, and checks on your published site.

* **Code checks** run on every project, published or not. They cover page basics, metadata, Open Graph tags, structured data, and the content structure of your public pages.
* **Preview checks** need a working preview. They cover whether the home page loads, `robots.txt`, and `sitemap.xml`.
* **Published checks** run only on your live public site. They cover indexing, such as a `noindex` tag on every page, and whether AI crawlers get a Markdown version of your site.
* **Google Search Console checks** appear only for live public sites with a [Google Search Console](https://docs.lovable.dev/integrations/google-search-console.md) connection linked to the project.

Which checks run depends on your project. Code checks always run. Preview checks run when the preview responds. Published and Google Search Console checks run when they apply. If the home page is blocked from search engines, the review reports that and skips the `robots.txt` and sitemap checks for that scan. Lovable can fix most findings when you click **Try to fix**. Lovable writes the Metadata, Open Graph, Structured data, Content structure, and Opportunity findings for your specific site, so their titles vary. The titles below are typical examples.

| Category | Passing finding | Common issues |
| :- | :- | :- |
| Page basics | Page basics are set | No viewport setting, or no `lang` attribute on `<html>`. Appears as "Some basic page setup is missing" |
| Indexing | Home page is reachable | The home page returns an error, a `noindex` meta tag is on every page, or (on server-rendered apps) a `noindex` response header blocks search engines. May appear as: <ul><li>"Home page isn’t loading"</li><li>"Home page is blocked from search engines"</li></ul> |
| Indexing | Search engines see your fully-rendered pages | A positive-only check that reports how your published site is rendered for search engines: server-side rendering, or pre-rendering for verified crawlers. |
| Indexing | Google Search Console is set up | Your site is not verified, or no sitemap is submitted. Appears only for publicly published sites with a Google Search Console connection. Appears as "Google Search Console isn’t fully set up" |
| robots.txt | Crawler rules look good | `robots.txt` is missing, blocks crawlers, or has a missing or wrong `Sitemap:` line. May appear as: <ul><li>"Crawler rules are missing"</li><li>"Crawler rules need attention"</li></ul> |
| Sitemap | Sitemap looks good | The sitemap is missing, is not valid XML, lists placeholder routes or relative URLs, or points to another host. May appear as: <ul><li>"Add a sitemap"</li><li>"Sitemap needs attention"</li></ul> |
| Metadata | Page metadata describes the site clearly | Duplicate titles, placeholder text, weak descriptions, or wrong canonical URLs. May appear as: <ul><li>"Page title and description are too generic"</li><li>"Search engines see placeholder text"</li><li>"Duplicate titles across routes"</li><li>"Canonical URLs point to the homepage"</li></ul> |
| Open Graph | Social link previews look good | Missing or generic Open Graph tags, so shared links show a generic preview. May appear as: <ul><li>"Shared links still show Lovable's branding"</li><li>"Social previews aren't customized for this site"</li><li>"Open Graph tags are missing on most pages"</li></ul> |
| Structured data | Structured data is set up for rich search results or Structured data is optional here (for example, on utility apps and dashboards) | Structured data that cannot be read, does not match the visible page, or is incomplete for the Google Search feature it targets. The review also flags a page that qualifies for a rich result and shows the facts it needs, but has no markup for it. Missing `WebSite`, `Organization`, or `FAQPage` markup is not an issue by itself. May appear as: <ul><li>"Search results won't show rich previews"</li><li>"Pages are missing schema for rich search results"</li><li>"JSON-LD type doesn't match the page"</li></ul> |
| Content structure | Homepage content and structure are well-optimized | No H1, weak headings, missing alt text, unclear link text, or missing accessibility labels. May appear as: <ul><li>"H1 is missing or too generic"</li><li>"Some images lack alt text"</li><li>"Link text doesn't describe its destination"</li><li>"Heading levels skip from H1 to H3"</li></ul> |
| AI readiness | AI assistants can see your site as markdown | A positive-only check that confirms AI crawlers get a clean Markdown version of your published site. |
| Opportunity | No growth actions recommended | One recommended action to get more search traffic, written for your site. On an unpublished project, the finding passes and says that search traffic does not apply yet. |

### Fix findings

Failing findings are at the top of the review. Expand a finding to read the details and choose an action:

* **Try to fix**: sends the finding to Lovable. Lovable applies the changes to your project files.
* **Ignore**: keeps the finding out of the active list until you restore it, even after you scan again.

The review header has two more buttons:

* **Try to fix all**: asks Lovable in one message to list and fix every failing finding.
* **Scan again**: runs the review again.

When Lovable has finished, publish your project if needed, then scan again to confirm the fixes.

### Google Search Console

Google Search Console is Google's free tool that shows how your site appears in Google results. Connect it from the **Google searches** card on the **SEO & AI** tab, or ask Lovable in chat. After you connect, the card shows clicks, impressions, and the searches that brought people to your site. Lovable can verify your site and submit your sitemap for you in chat.

For publicly published projects with a connection, the review includes a Google Search Console check. Until you connect, the review shows no Google Search Console finding. The check verifies two things:

* Your site is verified.
* A sitemap is submitted.

If one is missing, click **Try to fix**, and Lovable completes it in chat. The **Google searches** card shows **Finish setup** for the same steps. **Finish setup** asks Lovable to complete the setup.

Lovable verifies your site with Google's verification tag, a line it adds to your app's HTML. You do not upload a file or change DNS records. Google needs to see the tag on your live site. If your site needs a new publish first, Lovable asks you in chat to approve one. After you approve, Lovable waits for the published site to update, verifies the site, and submits the sitemap in the same conversation. If you decline, or publishing is not available, Lovable stops and tells you how to continue.

When both steps pass, the finding changes to “Google Search Console is set up.”

Verification and the sitemap depend on your published site:

* Verification can take a few minutes after you publish.
* If you change your [custom domain](https://docs.lovable.dev/features/custom-domain.md), verify the new domain in Google Search Console again.
* Publish your latest changes before you click **Try to fix** on the sitemap step. Google reads the sitemap from your live site. Pages that exist only in unpublished code are not included.

> [!NOTE]
>
> If your workspace does not allow Google Search Console connections, this check
> does not appear. See [App connector
> controls](https://docs.lovable.dev/integrations/admin-controls.md#app-connector-controls).

## Keyword research and content

Ask Lovable in chat what to write about and who you compete with. Lovable answers with Semrush data and names Semrush as the source. You can research keywords, competitors, backlinks, and rankings without a Semrush account.

> [!NOTE]
>
> Semrush data for keyword and competitor research has no additional fees
> through **November 30, 2026**. You do not need a Semrush account. Normal
> [Lovable usage costs](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs) apply when
> working with Lovable.

Ask, for example:

```text wrap theme={null}
What keywords should a site like mine target?
```

```text wrap theme={null}
Which competitors rank for similar products?
```

```text wrap theme={null}
Which keywords does a competitor rank for that I do not?
```

```text wrap theme={null}
What pages drive the most traffic for sites like this?
```

```text wrap theme={null}
What backlinks should I try to get?
```

```text wrap theme={null}
Audit /pricing for SEO issues.
```

```text wrap theme={null}
Suggest SEO improvements for my landing page copy.
```

Lovable helps you choose what to work on and can create or improve pages based on the research. Review the changes in the preview, then publish them when you are ready.

Research about your own site, such as rankings, top pages, or backlinks, needs a published project or a connected custom domain. Semrush reads Google's index, so an unpublished site has no data in Semrush. For your own site's current visibility, Lovable prefers your Google Search Console data over Semrush estimates.

The review covers technical and indexing issues. Keyword research covers strategy, topics, and competition.

## Get more search traffic

On a published project, click **Get more search traffic** on the **SEO & AI** tab. Lovable reviews your site and asks about your goal when it needs more context. It recommends a next step suited to your site, such as a keyword to write for or a page to improve. You can continue with the suggestion or discuss another approach in chat. For growth beyond search, click **Get more visitors** on the **All** tab. See [Analytics](https://docs.lovable.dev/features/analytics.md#overall-traffic-and-your-growth-plan) for more about your growth plan.

Build your search presence on a domain you own. After you connect a custom domain, verify it in Google Search Console and submit your sitemap again, so Google indexes the right address. See [Custom domains](https://docs.lovable.dev/features/custom-domain.md). For the full path from publishing to a live, indexed site on your domain, follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md).

## FAQ

> **Can my Lovable app rank well in search?**
>
> Yes. Lovable apps can rank like other modern web apps, because published Lovable apps return readable HTML to search engines and AI crawlers. Ranking still depends on factors outside Lovable's control, including content quality, search intent, backlinks, competition, performance, and search ranking algorithms.

> **How does Lovable handle crawlability?**
>
> Most Lovable apps run on one of two stacks, both of which return crawlable HTML to search engines and AI crawlers.
>
> * **New apps** created from May 13, 2026 (June 22, 2026 on Enterprise plans) use **TanStack Start** with server-side rendering (SSR). Every request returns fully rendered HTML, for humans and crawlers.
> * **Older React + Vite apps** use **on-request pre-rendering** on deployed public URLs. Human visitors get the single-page app experience. When a verified crawler arrives, Lovable renders the page on the fly and returns the resulting HTML. Content that loads with the page is usually included. Content that loads late may be missing. Pre-rendering is only served to **verified crawlers**. These include search engines such as Google and Bing, AI search crawlers such as those of ChatGPT, Perplexity, Claude, and Gemini, social-preview bots, and verified SEO tools. Unverified bots and link checkers see the regular single-page app, unless they request the page as Markdown. Any client that asks for Markdown gets a Markdown version of the page, on both stacks. That is how AI assistants read your site. To check the pre-rendered output yourself, use Google's URL Inspection tool or a social platform's link debugger.
>
> Both stacks support SEO and AI search visibility without an external pre-rendering service. What still matters is the quality of each page: metadata, content structure, semantic HTML, alt text, structured data, internal links, performance, and backlinks. For how hosting serves your pages, see [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md#how-search-engines-and-ai-see-your-site).

> **Do I need an external pre-rendering service?**
>
> No. Lovable-hosted projects do not need an external pre-rendering service for search engines or AI crawlers.
>
> If your project is on React + Vite, Lovable handles pre-rendering for deployed public URLs. Lovable serves pre-rendered pages only to **verified crawlers**:
>
> * Search engines such as Google and Bing.
> * AI search crawlers such as those of ChatGPT, Perplexity, Claude, and Gemini.
> * Social-preview bots.
> * Verified SEO tools.
>
> Unverified automated agents see the regular single-page app, unless they request the page as Markdown.
>
> If your project is on TanStack Start, server-side rendering returns crawlable HTML to every request. People, crawlers, and scanners all get the same rendered HTML. Only clients that request Markdown get the Markdown version instead.

> **Can existing React + Vite apps migrate to TanStack Start?**
>
> Yes. You can [upgrade an existing project to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md), which gives it full server-side rendering. Normal [Lovable usage costs](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs) apply. The upgrade runs in your existing project and leaves your published site unchanged until you publish again.
>
> If you stay on React + Vite, your project continues to get pre-rendering automatically, which makes your content accessible to crawlers.

> **Can AI search engines read Lovable apps?**
>
> Yes. Lovable serves crawlable content to AI search engines such as ChatGPT, Perplexity, Claude, and Gemini.
>
> New TanStack Start apps return fully rendered HTML to AI crawlers. Older React + Vite apps use pre-rendering on deployed public URLs so verified AI search crawlers can access rendered content. Other automated agents get the single-page app, unless they request the page as Markdown.
>
> For best results, make your content easy to understand and cite:
>
> * Use clear headings and semantic HTML.
> * Add structured data where it fits the page.
> * Keep important facts visible on the page.
> * Write concise, factual answers to common questions.

> **Do I need an llms.txt file for AI search visibility?**
>
> No. Lovable does not require `llms.txt`, and the SEO & AI search review does not treat a missing file as a problem.
>
> Focus on crawlable HTML, semantic structure, descriptive metadata, structured data, useful content, and links. If your project already has an `llms.txt` file, Lovable continues to serve it.

> **Why do social previews show the wrong title or image?**
>
> Social platforms such as LinkedIn, Slack, Facebook, X, and WhatsApp read the Open Graph tags in your page's HTML. Most of them do not run JavaScript.
>
> Lovable apps serve those tags to social-preview bots, but each page still needs its own Open Graph tags.
>
> To check a page before you publish, open the [page selector](https://docs.lovable.dev/features/projects/preview.md#preview-controls) above the preview and hover over the preview icon on the page. The **Social** card shows the exact title, description, and image that social platforms read. The **Search** card shows how the page appears in search results. You can also open the cards [while publishing](https://docs.lovable.dev/features/publish.md#site-metadata-is-generated-for-you). Select **Social & search appearance** in the Publish dialog's **⋮** menu, click the favicon next to the website URL, or click **Edit** on the **Your website is live** screen.
>
> For best results:
>
> * Use unique `og:title`, `og:description`, and `og:image` values per route.
> * Avoid generic fallback images across your site.
> * Keep share images at 1200×630 and a few hundred KB. WhatsApp shows no preview for larger files.
> * Publish changes before testing previews.
> * Use the platform preview/debugging tools to refresh cached previews.

> **How long does it take Google to index my site?**
>
> Indexing time depends on Google's crawl schedule and your site's authority. New pages can take days, and sometimes longer.
>
> To help Google discover updates faster:
>
> * Submit your sitemap in Google Search Console.
> * Use **URL Inspection** for important pages.
> * **Request indexing** for new or updated priority pages.
> * Make sure important pages are linked from your site.

> **What should I do if my page is not ranking?**
>
> Start by confirming that the page can be discovered and indexed:
>
> * Run an SEO & AI search review.
> * Check indexing in Google Search Console through Coverage or URL Inspection.
> * Ensure your sitemap is submitted and confirm the page is in your sitemap.
> * Make sure it has a unique title and meta description.
> * Review headings, internal links, content quality, and search intent.
> * Check performance and mobile usability with [Google PageSpeed Insights](https://pagespeed.web.dev/), and make sure no JavaScript or CSS is blocked.
> * Build relevant backlinks over time.
>
> Ranking also depends on competition and content quality, so passing technical checks does not guarantee high rankings.

> **Will a custom domain help my SEO?**
>
> Yes. A custom domain helps you build search presence on a domain you control. It also lets you consolidate branding, backlinks, and canonical URLs under one primary domain.
>
> Lovable supports custom domains and subdomains. You can choose one primary domain, and other connected domains redirect to it.
>
> See [Custom domains](https://docs.lovable.dev/features/custom-domain.md) for more information.
>
> After connecting a custom domain, use the [Google Search Console connector](https://docs.lovable.dev/integrations/google-search-console.md) to verify your domain and submit your sitemap.
>
> A `lovable.app` subdomain works well for:
>
> * MVPs and demos
> * Temporary or experimental landing pages
> * Internal tools
> * Projects driven primarily by social or paid traffic

> **What does the SEO & AI search review not check?**
>
> The review focuses on technical SEO, crawlability, metadata, indexing, structured data, content structure, and related issues that Lovable can detect automatically.
>
> It does not guarantee rankings. It does not fully evaluate:
>
> * Page speed. Use a tool such as [Google PageSpeed Insights](https://pagespeed.web.dev/) on your published URL.
> * Accessibility and mobile usability. The review flags a missing mobile viewport tag, a missing `<html lang>` attribute, missing alt text, and controls with no accessible name. It is not a full accessibility audit.
> * Content quality and originality
> * Search intent alignment
> * Competitor strength
> * Backlink quality and authority
> * Brand reputation and trust
> * Conversion quality or engagement
> * Whether a topic is worth targeting
>
> Use the SEO & AI search review to keep your technical foundations healthy. After that, use keyword research in chat and your own product knowledge to improve content strategy and authority over time.

> **What happened to the Speed and Lighthouse checks?**
>
> The SEO & AI search review no longer runs Lighthouse audits, so it no longer reports page speed scores. The review covers the checks in [What SEO & AI search review checks](#what-seo-%26-ai-search-review-checks). The **Content structure** check still flags missing alt text, weak link text, skipped heading levels, and controls with no accessible name. The review also still flags a missing mobile viewport tag and a missing `<html lang>` attribute.
>
> For page speed and accessibility audits, run [Google PageSpeed Insights](https://pagespeed.web.dev/) on your published URL. After the audit, ask Lovable in chat to fix what it reports.

> **How can I get the best SEO and AEO results with Lovable?**
>
> Strong SEO and AEO results come from combining good technical foundations, high-quality content, and ongoing iteration.
>
> Start with the SEO & AI search review to catch issues with metadata, indexing, structured data, content structure, and crawlability. After that, use keyword research in chat to identify keywords, competitors, backlink opportunities, and content gaps over time.
>
> Focus on these fundamentals:
>
> **Content and structure**
>
> * Write unique, high-quality content.
> * Match real search intent and answer specific questions clearly.
> * Use descriptive headings and semantic HTML.
> * Add structured data where it fits the page.
> * Keep important facts visible in the page HTML.
>
> **Metadata and discoverability**
>
> * Use unique titles and descriptions for important pages.
> * Maintain accurate sitemaps and `robots.txt`.
> * Configure Open Graph metadata for social previews.
> * Use a custom domain, set it as the primary domain, and verify it in Google Search Console.
>
> **Performance and usability**
>
> * Optimize Core Web Vitals and PageSpeed performance.
> * Ensure strong mobile usability and accessibility.
> * Compress images and use efficient formats like WebP or SVG.
>
> **Authority and backlinks**
>
> * Create useful, link-worthy content.
> * Build relevant backlinks over time.
> * Partner with complementary businesses and communities.
> * Share updates, launches, tools, and research publicly.
>
> Rankings and AI visibility usually improve gradually, as your site gains authority, backlinks, and useful content.

> **How often should I maintain SEO and AEO?**
>
> Review SEO and AEO whenever you publish major changes, add or remove pages, change domains, or update routing.
>
> Use SEO & AI search review and Google Search Console regularly to monitor crawlability, indexing, metadata, and search visibility over time.
>
> As a baseline:
>
> * Weekly: check Google Search Console for indexing, coverage, and search performance issues.
> * Monthly: run an SEO & AI search review and check sitemap freshness, titles, and descriptions. Check Core Web Vitals and page speed separately with [Google PageSpeed Insights](https://pagespeed.web.dev/).
> * Quarterly: run an SEO & AI search review covering canonicals, `robots.txt`, structured data, and indexing. Review internal links, refresh declining content, and improve important landing pages as needed.
> * As needed: ask Lovable in chat for keyword research, competitor analysis, backlink opportunities, and new content opportunities.


## Related topics

- [Analytics](https://docs.lovable.dev/features/analytics.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Connect your app to Google Search Console (GSC)](https://docs.lovable.dev/integrations/google-search-console.md)
- [Connect your app to Semrush](https://docs.lovable.dev/integrations/semrush.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
