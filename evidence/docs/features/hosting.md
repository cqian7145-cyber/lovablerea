# How Lovable hosts your app
<!-- source: https://docs.lovable.dev/features/hosting.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# How Lovable hosts your app

> Lovable hosts your published app for you: no servers to set up, HTTPS included, and delivery from locations around the world. Learn how hosting works.

Lovable hosts your app. When you [publish](https://docs.lovable.dev/features/publish.md), your app goes live on its own URL, and Lovable takes care of everything behind it: there are no servers to set up, no hosting provider to choose, and nothing to configure. Hosting is part of Lovable, not a separate product or add-on.

This page explains what that means in practice: what happens when you publish, how your live site is delivered to visitors, and how hosting relates to [your app's built-in backend](https://docs.lovable.dev/features/cloud).

## What happens when you publish

Publishing takes a snapshot of your project and puts it live. You publish with the **Publish** button in the top right of the editor, or by asking Lovable in the project chat. Either way:

* Your app gets a public URL on `lovable.app`, with a web address you can customize (or your [custom domain](https://docs.lovable.dev/features/custom-domain.md), a [branded workspace URL](https://docs.lovable.dev/features/branded-workspace-urls.md), or your workspace's [publishing domain](https://docs.lovable.dev/features/publishing-domain.md)).
* HTTPS is included automatically: visitors always connect securely (the padlock in the browser). Lovable sets up the SSL certificate, the file that makes that secure connection possible, for every published URL, including custom domains.
* The published site is a snapshot. Changes you make after publishing don't affect the live site until you open the Publish dialog again and click **Publish changes**, so you can keep building without breaking what your visitors see.

Publishing to a `lovable.app` URL is free and available on all plans. [Custom domains](https://docs.lovable.dev/features/custom-domain.md) require a paid plan, and [branded workspace URLs](https://docs.lovable.dev/features/branded-workspace-urls.md) are available on Business and Enterprise plans. On the Enterprise plan, a workspace can connect one [publishing domain](https://docs.lovable.dev/features/publishing-domain.md) that every app in it publishes under. For the full path from publishing to a live site on your own domain, follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md).

A live site does not consume credits on its own. Usage-based [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md) cover the work your app does while it runs, such as backend activity and AI features.

## Who can visit your published app

By default, anyone with the link can visit your published app, on every plan. You can instead restrict the published app to invited people. On Business and Enterprise plans, you can also restrict it to workspace members or groups. In both cases, visitors log in to open the site. See [website access control](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app) for the options.

Who can *visit the live site* is separate from who can *open the project in the editor*: publishing never exposes your source code, chat history, or unpublished work.

You can also [take your site down](https://docs.lovable.dev/features/publish.md#how-to-unpublish-your-project) at any time: click **Publish**, open the **⋮** menu in the top-right corner of the dialog, and select **Unpublish**, or go to **Project settings → Unpublish project**. You can publish again later.

## Your site is delivered globally

Published apps are served from locations around the world, close to your visitors, so your site loads fast regardless of where your users are. You do not set any of this up. It is simply how every published app is served.

This is separate from the [region setting](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored), which controls where your app's backend data is stored. Choosing a hosting region for a project affects the built-in backend, such as its database and storage. It does not restrict where your site itself is delivered: the frontend is always served globally.

## How search engines and AI see your site

Crawlers only index what they can read, and many tools struggle with JavaScript-heavy apps. Lovable hosting solves this for you: search engines, social platforms, and AI crawlers all receive readable, fully rendered pages.

* Apps created from May 13, 2026 use server-side rendering: every visitor and crawler receives fully rendered pages.
* Older apps serve rendered pages to verified search engines, social preview bots, and AI crawlers, so your content is indexed and link previews work. You can [upgrade an older project to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) to get server-side rendering for every visitor.

Readable pages are the baseline. How well they rank depends on their content, metadata, and structure. Use the built-in [SEO review](https://docs.lovable.dev/features/seo-aeo.md) to check how your live site looks to search engines and what to improve.

> [!NOTE]
>
> For older apps, rendered pages are served only to verified crawlers. Third-party SEO scanner tools are not verified crawlers, so they may report your pages as empty even though Google, social platforms, and AI search engines see the full content.

## Traffic and scale

Your published app scales with traffic automatically. Your plan does not cap visitors or bandwidth.

The one exception is the Free plan, where newer apps (created from May 13, 2026, which use TanStack Start) have a limit of 1,000 server requests per project per 10 seconds. A server request is a page load or a server-function call. Static files such as images and scripts do not count. Visitors above the limit see an **App temporarily unavailable** page and can try again after a minute.

This limit applies to page traffic. Your app's backend has its own capacity, set by its [database instance size](https://docs.lovable.dev/features/database-performance.md#database-size).

Automated abuse protection runs on every published app. It targets attack patterns, not real audiences, but unusually aggressive traffic from a single source can be challenged or slowed down.

> [!TIP]
>
> Expecting a major traffic spike, such as a product launch or a TV appearance? [Contact support](https://lovable.dev/support) beforehand so your domain is prepared for it.

## Hosting and the built-in backend

Hosting serves your app's pages to visitors. The [built-in backend](https://docs.lovable.dev/features/cloud) is what those pages talk to: the database, authentication, storage, and functions behind your app. They work together, but they are separate:

* Every published app is hosted, whether or not it uses a backend.
* Backend activity, such as database work and AI calls, is what consumes [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md) as your app is used.
* [Pausing the backend](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using) affects your app's data and logic, not the hosting of its pages.

Running out of credits does not remove your published site. Building stops, and apps that rely on the backend or AI features can pause until credits are available again. Your site and its URL remain in place. Building and AI features resume once credits are added. A paused backend may not restart by itself: if it is still paused, open **More → Database** in the project and click **Wake up** on the paused card. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits) for the full breakdown, the alerts you receive along the way, and the options for adding credits.

## Preview vs published

The [preview](https://docs.lovable.dev/features/projects/preview.md) is your live working view inside the editor: it updates as you build, and it can differ from what visitors see on the published site. [Share preview links](https://docs.lovable.dev/features/share-project.md) let you show that work in progress to someone before publishing, but they are view-only and, by default, expire after 7 days. Neither is hosting: only publishing puts your app on a public URL.

## Hosting somewhere else

You own your code and data, and you can host parts or all of your app outside Lovable. See [Deployment, hosting, and ownership options](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership) for the trade-offs and [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md) for the walkthroughs.

## FAQ

> **Do I need my own hosting provider or server?**
>
> No. Publishing your project is all it takes: Lovable builds your app, puts it on a public URL with HTTPS, and serves it to your visitors. You don't need to install, rent, or configure anything.

> **Do I need to keep Lovable open for my site to stay up?**
>
> No. Your published app runs on Lovable's infrastructure, not on your machine. You can close the editor, and your site keeps serving visitors.

> **My published site is down. What should I check?**
>
> Check [status.lovable.dev](https://status.lovable.dev/) first. Lovable posts platform-wide incidents and updates there. If no incident is reported, work through these checks:
>
> * Open the **Publish** dialog and check that your project is still published.
> * If the project is unpublished and your workspace is on the Free plan, Lovable may have unpublished it for inactivity. Check your email for a notice from Lovable. To bring the site back, see [Does my published site expire?](https://docs.lovable.dev/features/publish.md#does-my-published-site-expire).
> * If you use a [custom domain](https://docs.lovable.dev/features/custom-domain.md), go to **Project → Settings → Domains** and check that its status is **Live**. Any other status comes with instructions for fixing it.
> * Ask Lovable in the project chat about your domain. It reports the domain's current state and whether the project is published.
>
> If everything looks right and the site still does not load, [contact support](https://lovable.dev/support) with your project URL and what you see.

> **Where is my app hosted?**
>
> Your site is delivered from locations around the world, close to each visitor. If your project uses the built-in backend, its data lives in the [region](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored) chosen when the backend was enabled.

> **How do I update my live site?**
>
> Publish again. The live site is a snapshot from your last publish, so edits in the editor don't affect it until you republish. See [Publish](https://docs.lovable.dev/features/publish.md).

> **How many visitors can my site handle?**
>
> Your plan does not cap visitors or bandwidth, and published apps scale with traffic automatically. The one exception is the Free plan, where newer apps (created from May 13, 2026) have a limit of 1,000 server requests per project per 10 seconds. See [Traffic and scale](#traffic-and-scale) for what counts toward it. If you're planning something unusually large, [contact support](https://lovable.dev/support) in advance.

> **Can I take my site down?**
>
> Yes. Click **Publish**, open the **⋮** menu in the top-right corner of the dialog, and select **Unpublish**, or go to **Project settings → Unpublish project**. The site stops serving, and you can publish again whenever you're ready.

> **Is HTTPS included?**
>
> Yes. Every published URL is served over HTTPS, and Lovable sets up the SSL certificate automatically, including for custom domains. See [Custom domain](https://docs.lovable.dev/features/custom-domain.md).


## Related topics

- [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md)
- [Deployment, hosting, and ownership options with Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md)
- [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)
