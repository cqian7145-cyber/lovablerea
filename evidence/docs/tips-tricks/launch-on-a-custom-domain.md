# Launch your site on a custom domain
<!-- source: https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Launch your site on a custom domain

> Go from a finished project to a live site on your own domain: publish, buy or connect a domain, wait for it to go live, test it, and help people find it.

Your project is built and you want it live at your own web address. This guide covers the whole journey: publish your project, put it on a custom domain, and help people find it. Each section links to the page that covers its topic in full.

By the end, your app is reachable at `https://yourdomain.com`, its other addresses redirect there, and search engines index it under your domain. The guide follows five steps: publish, choose how to get your domain, wait for the domain to go live, test the site, and help people find it.

Before you start, check that you have:

* A project you are ready to share. Lovable publishes the current version of your project.
* Editor access or higher on the project. By default, editors and above can [publish](https://docs.lovable.dev/features/publish.md#who-can-publish-and-unpublish-projects) and connect domains.
* A paid plan for the custom domain. Publishing itself works on all plans.
* Workspace admin or owner permissions if you want to buy a domain through Lovable or edit its DNS records.

## Publish your project

When you publish, Lovable deploys a snapshot of your project to a live URL. The **Publish** dialog does not use credits and works when your credit balance is zero.

**1. Click Publish**

In your project, click **Publish** in the top-right corner of the editor, next to **Share**. On narrow windows the button collapses to an icon without a label.

**2. Check the website address**

The dialog suggests a website address ending in `lovable.app` under **Website URL**. To change it, click the address or its pencil icon, edit it, and confirm with the check mark.

**3. Review the security scan**

Lovable runs a quick security scan while the dialog is open and shows the result below the address. Fix critical issues before you share the site widely. Workspaces that enable **Block publishing with critical issues** prevent publishing until you resolve them, and in some cases Lovable asks you to confirm with **Address issues** or **Publish anyway**. See [Security](https://docs.lovable.dev/features/security) for what the scan covers.

**4. Click Publish in the dialog**

Lovable shows a progress screen. You can close the dialog and keep working. When the deploy finishes, Lovable confirms **Your website is live** with **Copy link** and **Visit site** buttons. If the dialog shows **Build errors need fixing** instead of a publish button, your latest changes failed to build. Select **Try to fix**, or fix the errors yourself, and publish again.

You can also ask Lovable in the project chat to publish, deploy, or go live. Publishing from the project chat is treated as standard build usage and consumes credits.

Lovable does not publish later changes automatically. To update the live site, open the dialog and click **Publish changes**. A dot on the **Publish** button tells you when you have unpublished changes.

For every dialog option, who can publish, and who can see your site, see [Publish your Lovable project](https://docs.lovable.dev/features/publish.md).

## Choose how to get your domain

Your app is live at `[url-subdomain].lovable.app`, an address formed from your project's [URL subdomain](https://docs.lovable.dev/features/projects/settings.md#details). A custom domain replaces that address with your own.

Two terms appear on every path. **DNS** (Domain Name System) tells browsers where your domain points. The company that manages your domain stores its DNS records, and setting up a domain means adding or changing those records. An **SSL certificate** is what lets your site load over a secure HTTPS connection, shown by the padlock icon in the browser. Lovable creates the certificate for you on every path.

You can take one of three paths:

| Your situation | Path | What it involves |
| :- | :- | :- |
| You don't own a domain yet | **Buy a domain through Lovable** | The fastest path. Lovable registers the domain and sets up its DNS records and SSL certificate, with no settings to change elsewhere. |
| You own a domain and want to keep it with your current provider | **Connect an existing domain** | You add two DNS records at your provider, or let Lovable add them through your provider's login. |
| You own a domain and want Lovable to manage it | **Transfer a domain to Lovable** | A one-time transfer that takes a few days. Lovable then handles registration, renewals, and DNS records. |

You can set up a domain at any time, but the domain only starts serving your site after you publish the project. A verified domain on an unpublished project shows the status **Ready** until you publish.

You manage domains in [**Project → Settings → Domains**](https://docs.lovable.dev/features/projects/settings.md#domains-tab). You can also open it by clicking **Add domain** in the **Publish** dialog, or you can ask Lovable in the project chat to find a domain or to connect one you already own. Lovable shows a confirmation card before it buys or connects a domain.

Choose the tab that matches your situation and follow only that path:

**Buy a domain through Lovable**

Lovable registers and configures the domain for you, so this path has no DNS work and usually finishes within an hour.

**1. Start the purchase**

Go to **Project → Settings → Domains** and click **Buy new domain**.

**2. Choose a domain**

Search for a name or choose one of the suggestions. Prices are in US dollars, per year.

**3. Choose the term and renewal**

On the **Complete your order** page:

* Choose how many years to register the domain. The dropdown shows **1 year term** by default, and most domain extensions (the ending, such as `.com`) allow up to 10 years.
* Check the expected renewal price and date, shown before you pay.
* Keep **Auto-renew** enabled so the domain renews automatically and your site stays online.

**4. Enter your registration details**

1. Click **Registration details**.
2. Fill in the contact information required by [ICANN](https://www.icann.org/), the organization that manages domain registration worldwide.
3. Click **Save**.

**Confirm purchase** stays disabled until these details are complete. You can change them later from **Workspace settings → Workspace domains**.

**5. Complete checkout**

1. Click **Confirm purchase**. Lovable sends you to Stripe.
2. Pay in Stripe. Lovable returns you to the Domains tab, where a dialog shows **Registering domain** and then **Domain registered**.
3. Click **Done**.

Lovable then registers the domain, creates the DNS records, sets up the SSL certificate, and connects both `yourdomain.com` and `www.yourdomain.com` to your project. You do not need to change any settings elsewhere.

**6. Confirm the registrant email**

ICANN requires you to confirm the registrant email address. If that address is already verified on your Lovable account, Lovable confirms it for you and you can skip this step. Otherwise Lovable emails you a verification link. Click it before the deadline in the email. Until you do, the domain shows **Action required**, and if the deadline passes it shows **Suspended** and stops serving your site.

**7. Wait for the status to show Live**

The domain shows **Pending** while Lovable configures it. Setup usually completes within 30 minutes but can take up to a day. After about 30 minutes the domain still shows **Pending**, with the note **Taking longer than usual** and a **Check status** button. Contact [Lovable Support](https://lovable.dev/support) if setup has not completed after a few hours. When the status shows **Live**, continue to [Test your live site](#test-your-live-site).

Domains bought through Lovable belong to your workspace, not to a single project, and Lovable bills them separately from your subscription.

For everything else about domains bought through Lovable, such as buying without a project, changing WHOIS privacy, renewals, or moving the domain to another workspace, see [Buy a domain through Lovable](https://docs.lovable.dev/features/custom-domain.md#buy-a-domain-through-lovable).

**Connect a domain you already own**

This path points your domain at your project while the domain stays registered with your current provider. You need access to your domain's DNS settings at that provider. If you are not sure where that is, see [I don't know where to add the DNS records](#troubleshooting) before you start.

**1. Enter your domain**

1. Go to **Project → Settings → Domains**.
2. Under **Connect existing domain**, click **Connect domain**.
3. Enter your domain or subdomain, for example `yourdomain.com` or `app.yourdomain.com`, and click **Continue**.

**2. Configure the connection**

1. Choose **Root domain** (the bare address, `yourdomain.com`) or **Subdomain** (an address with a prefix, such as `app.yourdomain.com`).
2. For a root domain, keep the **Redirect `www.yourdomain.com` → `yourdomain.com`** option enabled, so visitors who type `www` reach your site too. Lovable connects `www.yourdomain.com` as well and lists it as a separate domain.
3. Click **Connect domain**. If the domain is already connected to another project, Lovable shows what happens to that connection before continuing. See [Can I connect a domain used by another project?](https://docs.lovable.dev/features/custom-domain.md#can-i-connect-a-domain-used-by-another-project).

**3. Open the DNS setup window**

What happens next depends on what you connected:

* **Root domain with the `www` redirect enabled**: Lovable confirms **Domains created** and closes the dialog. Both domains appear in the list with the status **Action required**. Click **Complete setup** next to each one to open its DNS setup window.
* **A single address** (a subdomain, or a root domain with the `www` redirect disabled): the DNS setup window opens immediately.

Keep the setup window open until you have finished its steps. If you close it before choosing a setup method, Lovable removes the domain, and you connect it again to start over. If you close it later, the domain stays listed as **Action required**, and **Complete setup** reopens the window.

**4. Add the DNS records**

The setup window offers two ways to add the records:

* **Automatic setup**: Lovable detects your domain provider and asks you to log in there. Authorize the update, and Lovable adds the records for you.
* **Manual setup**: add the two records below at your DNS provider yourself, in a separate browser tab, then finish the steps in the setup window. The setup window shows the records with copy buttons, and the same **Type**, **Name**, and **Value** table stays under the domain in **Project → Settings → Domains** while the domain is **Verifying**. Add only these two records and leave the rest in place, in particular any `MX` records, which keep email on your domain working. While you are there, remove any existing `A`, `AAAA`, or `CNAME` record for the same name. They point the address at a previous host and send visitors to the wrong place. `AAAA` records in particular point a domain to an IPv6 address, a newer type of internet address, and interfere with setup.

Enter these values for the two records:

| Field | `A` record | `TXT` record |
| :- | :- | :- |
| **Type** | `A` | `TXT` |
| **Name** (some providers call it **Host**) | `@` for a root domain, or the subdomain label, for example `app` | `_lovable` for a root domain, or `_lovable.app` for the subdomain `app` |
| **Value** (or **Answer**, **Data**) | `185.158.133.1`, the numeric address of Lovable's servers | The `lovable_verify=` value shown in the setup window. It is unique to your domain, so copy it rather than typing it. |
| **TTL** | `300` seconds. If your provider does not let you change it, keep its default. Lovable's table does not show this field. | `300` seconds, or the provider's default |

Some providers do not accept `@` as the name. Leave the field blank or enter your full domain instead, for example on Amazon Route 53. If the `A` record value `185.158.133.1` already appears in your DNS settings, that is Lovable, not a previous host.

If you kept the `www` redirect, `www.yourdomain.com` is a separate domain with its own setup window and its own two records: an `A` record named `www` and a `TXT` record named `_lovable.www`, with the `lovable_verify=` value from that domain's setup window. Repeat this step and the next one for it.

**5. Check that the records are live**

Click **Check status** next to the domain. Lovable looks up your records immediately and reports the result in a notification:

* **Domain verified**: the records are correct. The domain moves to **Setting up**, or straight to **Live** if a certificate for that address already exists.
* **DNS records not configured correctly**: Lovable lists what it found instead. Fix the records and check again.
* **Hold on, we just checked this**: wait about five minutes before trying again.

You can also ask Lovable in the project chat about the domain. It reports which records it expects and whether it can see them.

**6. Wait for the status to show Live**

DNS changes take time to reach every network. Many providers apply them within minutes, most changes are live within a few hours, and some take up to 72 hours. The domain status shows the progress:

* **Verifying** while the records take effect.
* **Setting up** while Lovable issues the SSL certificate. Wait for **Live** before you open the site. Until the certificate is ready, the browser shows a security warning instead of your app. If the status changes to **Stalled** or **Failed**, click **Retry**. If setup still fails and your DNS has `CAA` records, see [My domain has CAA records and SSL setup fails](https://docs.lovable.dev/features/custom-domain.md#my-domain-has-caa-records-and-ssl-setup-fails).
* **Live** when your site is served on the domain. Continue to [Test your live site](#test-your-live-site).

If the status changes to **Unable to verify** instead, see [My domain status changed from Verifying to Unable to verify](#troubleshooting). A domain whose records never arrive shows **Removed** after 72 hours, with a **Reconnect** button to start again.

For the exact records, provider-specific name formats, the proxy option for Cloudflare and similar services, and the full status table, see [Connect a domain from another provider](https://docs.lovable.dev/features/custom-domain.md#connect-a-domain-from-another-provider).

**Transfer a domain to Lovable**

A transfer moves a domain you already own from its current registrar into Lovable. After it completes, Lovable manages the domain's registration, renewals, and DNS records, and connecting it to a project needs no manual DNS setup. A transfer usually takes 5 to 7 days.

Before you start, you need:

* A workspace admin or owner role.
* A root domain (for example, `yourdomain.com`, not `app.yourdomain.com`) that was not registered or transferred in the last 60 days. [ICANN](https://www.icann.org/), the organization that manages domain registration worldwide, blocks transfers within 60 days of either event. When the registry publishes those dates, Lovable shows when the domain becomes transferable.
* The domain unlocked at your current registrar, with DNSSEC (a security setting on the domain) disabled. After you disable DNSSEC, wait up to 24 hours before you start the transfer.
* The **authorization code**, also called an EPP code or transfer code, from your current registrar. Lovable cannot check the code up front. A wrong code fails within minutes as **Transfer failed** with a refund and a **Retry** button, or days later as **Action needed**, so copy it carefully.

**1. Start the transfer**

1. Go to [**Workspace settings → Workspace domains**](https://lovable.dev/settings/workspace-domains) and click **Transfer in**.
2. Enter your root domain and click **Check**.

Lovable checks whether the domain can be transferred. If something blocks it, such as a locked domain, the 60-day rule, or a subdomain instead of a root domain, Lovable explains what to fix at your current registrar. Some domain extensions cannot be transferred at all.

**2. Fill in the transfer form**

When the check passes, the rest of the form appears in the same window:

* **Authorization code**: paste the code from your current registrar.
* **Registration details**: fill in the contact information required by ICANN.
* **Keep your DNS records**: Lovable lists the records it found on your domain, all selected. Keep them selected so email and other services on the domain keep working after the transfer. The list may be incomplete, because Lovable can only look up common record names. You add anything missing after the transfer.
* **Auto-renew**: keep it enabled so the domain renews automatically. The row shows the yearly renewal price.

The footer shows the transfer price and the registration it adds, one year for most extensions.

**3. Pay and start the transfer**

1. Click **Continue to checkout**. Lovable sends you to Stripe.
2. Pay in Stripe. Lovable returns you to **Workspace domains** and confirms **Transfer started**.

The domain appears in the list, first as **Setting up transfer** and then as **Transferring**.

**4. Wait for the transfer to complete**

Your current registrar releases the domain within a few days. Your website and email keep working from your current registrar in the meantime. If the status changes to **Action needed**, open the domain to read the reason. To cancel, open the domain from **Workspace domains** and click **Cancel transfer** while the status is **Transferring** or **Action needed**. Lovable refunds the payment if the registry lets it cancel. When the transfer is already with the registry, the cancellation does not take effect and the transfer continues.

When the transfer completes, Lovable points the domain at its own nameservers, recreates the records you kept, and reconnects any project already published on a subdomain of this domain. Two tasks remain:

* Click **Configure** next to the domain and check the **DNS records** section for anything missing.
* Check your email for a verification link. ICANN requires you to confirm the registrant email address, the same as after a purchase.

**5. Connect the domain to your project**

Lovable does not connect a transferred domain to a project on its own. After the transfer completes:

1. Go to **Project → Settings → Domains**.
2. Under **Connect existing domain**, click **Connect domain**.
3. Enter your domain, which now shows a **Your domain** badge, and click **Continue**.
4. On **Configure connection**, choose **Root domain** or **Subdomain** and keep the `www` redirect if you want it.
5. Click **Connect domain**.

Because Lovable manages the domain, it creates the DNS records for you. When the status shows **Live**, continue to [Test your live site](#test-your-live-site).

For transfer statuses, canceling, and troubleshooting, see [Transfer a domain to Lovable](https://docs.lovable.dev/features/transfer-domain.md).

Your project is now reachable at more than one address: the `lovable.app` URL and every domain you connected. The first custom domain you add becomes the **primary domain** automatically, and once it is **Live**, Lovable redirects every other address to it. The exception is a project that already has a primary address, for example a [branded workspace URL](https://docs.lovable.dev/features/branded-workspace-urls.md) or an address under your workspace's [publishing domain](https://docs.lovable.dev/features/publishing-domain.md). To make a different domain primary later, open the three dots menu next to a **Live** domain in **Project → Settings → Domains** and click **Set as primary**. For how redirects work, see [Primary domain](https://docs.lovable.dev/features/custom-domain.md#primary-domain).

## Test your live site

Check the result as a visitor sees it. Open a private browser window, so that cached pages do not affect the result, and check three things:

* **Your domain shows your app.** Open `https://yourdomain.com`. Your published app loads with the padlock icon in the address bar, which means the SSL certificate is active. If the browser shows a connection warning or an error page instead, check that the domain status is **Live** in **Project → Settings → Domains** and that your project is published.
* **Your other addresses redirect.** Open your `lovable.app` address, and `www.yourdomain.com` when it shows **Live** as well. Both redirect to your primary domain.
* **Sign-in and forms work.** If your app has accounts, sign in once on the new domain. If your app saves data, for example through a form, submit one entry and check that it saved. The [Troubleshooting](#troubleshooting) section covers what to do when sign-in fails.

If the domain shows a different website, see [My domain shows my old website instead of my Lovable app](#troubleshooting).

## Help people find your site

Your site is live and tested on your domain. Three follow-ups bring visitors to it, and the first two happen in the same place: the **SEO & AI search** tab.

1. **Run an SEO and AI search review.** SEO (search engine optimization) is what makes your site appear in Google, and AEO (answer engine optimization) is what makes it appear in answers from AI assistants such as ChatGPT. The review checks both, lists what it finds, and offers to fix most of it. Some checks only run against the live site: indexing, Google Search Console setup, and AI-search readiness. Two ways to run it:

   * Open **More → SEO & AI search**. The first review starts when you open the view. If it does not, click **Scan project**. For later reviews, click **Scan again**.
   * Ask Lovable in the project chat to run an SEO review and confirm the **Run SEO review** card.

   Run it again whenever you change the primary domain, so the checks target the right address.
2. **Set up Google Search Console from the review.** Google Search Console is Google's free tool that shows how your site appears in Google Search. Google needs to verify that you own the domain and to receive your sitemap, the list of your pages that Google reads. Among the review's findings, look for **Google Search Console isn't fully set up** and click **Try to fix**. Lovable connects the [Google Search Console connector](https://docs.lovable.dev/integrations/google-search-console.md) if needed, verifies the site, and submits the sitemap from the project chat. Lovable asks you to approve the connection and, when the site needs republishing, the publish. When it is done, the finding reads **Google Search Console is set up**.

   To verify without the connector, add the `TXT` record Google gives you at your DNS provider. For a domain bought through Lovable, add it under [**Workspace settings → Workspace domains**](https://lovable.dev/settings/workspace-domains) **→ Configure → DNS records**.
3. **Check how your pages appear in search results and link previews.** Open the page selector in the address bar above the preview. Each page shows a **Social** and a **Search** preview. To change a title, description, or social sharing image, click **Ask Lovable to edit**. Lovable prepares the request in the project chat for you.

For the full review, findings, and fixes, see [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md).

## FAQ

These entries cover the questions this journey raises. The [custom domain FAQ](https://docs.lovable.dev/features/custom-domain.md#faq) and the [publish FAQ](https://docs.lovable.dev/features/publish.md#faq) answer everything else, from TLS versions to what happens when a domain expires.

> **What does launching on a custom domain cost?**
>
> It depends on the path you take:
>
> * **Publishing** does not use credits, and the live site does not use credits on its own. Apps with a backend or AI features use credits as visitors use them. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).
> * **A custom domain** requires a paid plan.
> * **Connecting a domain you already own** adds nothing to your Lovable bill. You keep paying your current registrar for the domain.
> * **Buying a domain through Lovable** costs the yearly price shown before checkout, in US dollars, and renews at the renewal price shown on the order page. Lovable bills the domain separately from your subscription.
> * **Transferring a domain to Lovable** costs the transfer fee shown after the eligibility check, which includes a year of registration, and then renews yearly.

> **Can I use a subdomain instead of the root domain?**
>
> Yes. Connect `blog.yourdomain.com` or `app.yourdomain.com` instead of the root domain. You add and configure each subdomain individually, and different subdomains of the same domain can serve different projects.

> **What happens to the domain if I downgrade my plan?**
>
> Connected domains keep serving your published app, and you can still disconnect them. Connecting a new domain requires a paid plan. Domains bought through Lovable renew independently of your subscription. See [What happens to my custom domain if I downgrade or cancel my plan?](https://docs.lovable.dev/features/custom-domain.md#what-happens-to-my-custom-domain-if-i-downgrade-or-cancel-my-plan)

## Troubleshooting

These are the problems people encounter most often on this journey. For every other domain status and error, see [Troubleshooting domains from other providers](https://docs.lovable.dev/features/custom-domain.md#troubleshooting-domains-from-other-providers) and the [publish troubleshooting](https://docs.lovable.dev/features/publish.md#troubleshooting) section.

> **My domain shows my old website instead of my Lovable app**
>
> Your DNS provider still has `A`, `AAAA`, or `CNAME` records from your previous host.
>
> **What to do:** Remove the old `A`, `AAAA`, and `CNAME` records for the address you are connecting, so that only Lovable's `A` record (`185.158.133.1`) and the verification `TXT` record remain, then wait for the change to take effect. Leave `MX` and other record types in place, so email and other services on your domain keep working.

> **My domain status changed from Verifying to Unable to verify**
>
> In **Project → Settings → Domains**, a connected domain shows **Verifying** while Lovable waits for your DNS records. If Lovable still cannot find the correct records after about an hour, the status changes to **Unable to verify**. The records are incorrect, or the change has not reached every network yet.
>
> **What to do:** Check both records at your DNS provider, especially the full `TXT` value, then click **Check status**. To see what the internet currently returns for your domain:
>
> 1. Open [dnschecker.org](https://dnschecker.org/).
> 2. Enter `yourdomain.com`, choose the `A` record type, and look for `185.158.133.1`.
> 3. Enter `_lovable.yourdomain.com`, choose `TXT`, and look for your `lovable_verify=` value.
>
> Missing results in the first hour are expected.

> **I don't know where to add the DNS records**
>
> The company that manages your domain stores your DNS records. That is usually the registrar you bought the domain from, unless you moved it to a service such as Cloudflare or a website builder.
>
> **What to do:**
>
> 1. Open [dnschecker.org](https://dnschecker.org/).
> 2. Enter your domain and choose the `NS` record type.
> 3. Note the company named in the results. That is where you add the records.
>
> Automatic setup skips this question, because Lovable detects the provider for you.

> **I see a Cloudflare error 1001 or 1003 on my domain**
>
> Cloudflare (a service that manages DNS for many domains) is passing your visitors through its own servers, which interferes with the connection to Lovable.
>
> **What to do:** Choose one of two options:
>
> * In Cloudflare's DNS settings, set the records for your Lovable domain to **DNS only** (gray cloud) instead of **Proxied** (orange cloud), then wait a few minutes and try again.
> * To keep Cloudflare's proxy in front of your site, disconnect the domain and connect it again with **Advanced → Uses Cloudflare or similar proxy** enabled. Lovable then asks for a single `CNAME` record instead. See [Use a CDN or reverse proxy](https://docs.lovable.dev/features/custom-domain.md#advanced-use-a-cdn-or-reverse-proxy).

> **Sign-in fails on the new domain**
>
> Sign-in works in the preview but fails on the custom domain. The new address is missing from your app's redirect URLs, the list of addresses your app's sign-in is allowed to send people back to. For apps on the built-in backend, Lovable adds custom domains to that list automatically, so this usually means your app uses your own Supabase project or another sign-in provider.
>
> **What to do:** Ask Lovable in the project chat to update the redirect URLs for your domain, and add the new address in your sign-in provider's own settings. See [Site URL and redirect URLs](https://docs.lovable.dev/features/authentication#site-url-and-redirect-urls).
>
> If your app uses Google sign-in with your own Google OAuth credentials, Lovable lists a redirect URL for the new domain in **More → Users → Settings → Google**. Add it as an **Authorized redirect URI** on your OAuth client in Google Cloud Console, then select it in Lovable and save. See [Managing Google authentication](https://docs.lovable.dev/features/google-auth.md#managing-google-authentication).

## Read more

> **[Publish your Lovable project](https://docs.lovable.dev/features/publish.md)**
>
> Every dialog option, who can publish, who can see your site, and how to unpublish.

> **[Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md)**
>
> Every domain option and status, DNS records, nameservers, and workspace domain management.

> **[Transfer a domain to Lovable](https://docs.lovable.dev/features/transfer-domain.md)**
>
> Move a domain you own from another registrar so Lovable manages it end to end.

> **[Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)**
>
> The full review, its findings and fixes, Google Search Console, and keyword research.


## Related topics

- [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md)
- [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
