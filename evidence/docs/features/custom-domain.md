# Set up a custom domain
<!-- source: https://docs.lovable.dev/features/custom-domain.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up a custom domain

> Learn how to buy, connect, verify, troubleshoot, and manage custom domains in Lovable.

A **custom domain** lets you use your own domain or subdomain for your Lovable project instead of the default `xxx.lovable.app` URL.

Connecting a custom domain improves your site's:

* **Brand identity**: look more trustworthy and professional
* **Search engine visibility**: better SEO and discoverability
* **Memorability**: easier for users to share and remember

Custom domains are available on **paid plans**.

This page is the reference for every domain option and status. For the end-to-end path from publishing to a live site on your own domain, follow the guide [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md).

## Choose how to set up your domain

You can set up a domain at any time, but you need to **publish your project** before your domain can start serving your site.

On the Enterprise plan, a workspace can also connect one [publishing domain](https://docs.lovable.dev/features/publishing-domain.md), so that every project it publishes gets an address under that domain without a per-project setup.

You can access the domain setup from:

* **Project → Settings → Domains**
* **Publish dialog → Add domain**
* **Workspace settings → Workspace domains**
* [**The project chat**](https://docs.lovable.dev/features/projects/chat.md), by asking Lovable

You'll see two options on the **Domains** page:

* **Buy a new domain** \
  Register and set up a domain in Lovable. All domains bought through Lovable belong to your **workspace**, not a single project.
* **Connect existing domain**\
  Connect an existing domain from your workspace or a domain from another provider.

From the project chat, you can ask Lovable to find a new domain, connect a domain you already own, or check how a domain's setup is going. Lovable always shows a confirmation card before it buys or connects a domain, and buying continues in checkout. The same plan and permission requirements apply as in **Project → Settings → Domains**. You can't set a primary domain from the project chat.

## Buy a domain through Lovable

Buy and manage domains directly in Lovable without manually configuring domain records. Domains bought through Lovable belong to your workspace, not to a single project.

You need to be a workspace **admin** or **owner** to buy and connect a domain through Lovable.

You can buy a domain in two ways:

### Buy and connect to a project

Use this option when you want the domain to serve a specific project immediately.

You can start from:

* Project → Settings → Domains
* Publish dialog → Add domain
* Workspace settings → Workspace domains

When you buy from a project, Lovable connects the domain to that project automatically. When you buy from Workspace settings, you choose the project during checkout.

### Buy without connecting to a project

Use this option when you want to buy a domain for your workspace and connect it to a project later.

This is only available from **Workspace settings → Workspace domains**. During checkout, leave the **Connect to project** step empty.

You can connect the domain later from **Workspace settings → Workspace domains**, or from **Project → Settings → Domains → Connect existing domain**.

Follow the steps below:

**1. Buy a domain**

You can access the domain setup from:

* **Project → Settings → Domains**
* **Publish dialog → Add domain**
* **Workspace settings → Workspace domains**

Click **Buy new domain.**

**2. Search or select a suggested domain**

Search for a domain name or choose one of the suggested options.

* Prices are shown in USD.
* Premium domains cost more than standard domains.
* We support most major generic top-level domains and a limited set of country code top-level domains.

**3. Review your order**

Review and adjust the details of your purchase before checkout.

You can edit:

* **Term length**\
  Choose how many years to register the domain. The dropdown shows **1 year term** by default, and most domain extensions allow up to 10 years. Multi-year registration may offer cost savings.
* **Auto-renew**\
  Enabled by default and recommended. When enabled, your domain renews automatically before it expires using your saved payment method. You'll be charged the renewal price shown at the time of purchase (subject to change based on registrar pricing).
* **Registration details**\
  Required contact information for domain registration, see next step.
* **Connect to project** (optional)\
  This option is only available when buying from **Workspace settings → Workspace domains**.\
  Choose a project to connect the domain to after registration completes, or leave it empty to buy the domain as a standalone workspace domain and connect it later.

> [!NOTE]
>
> When buying from Project → Settings → Domains, the Publish dialog → Add domain, or the project chat, Lovable connects the domain to the current project automatically.

**4. Enter your registration details**

* Enter your registration details required by [ICANN](https://www.icann.org/) (the organization that manages domain registration worldwide). You can update them later under **Workspace settings → Workspace domains → Configure → Contact information**.
* Click **Save**.

> [!NOTE]
>
> ICANN requires you to verify your registrant email address.
>
> * If the email you provided matches your verified Lovable account email, verification is handled automatically.
> * Otherwise, you receive a verification email and must click the link before the deadline to confirm ownership and avoid suspension. Until you do, the domain shows **Action required** in **Project → Settings → Domains**, and **Suspended** if the deadline passes.

[WHOIS privacy protection](https://en.wikipedia.org/wiki/Domain_privacy) is enabled automatically for domain extensions that support it. You can disable or re-enable WHOIS privacy after purchase from **Workspace settings → Workspace domains → Configure → ··· → WHOIS privacy**.

**5. Complete your order**

Click **Confirm purchase** and complete the Stripe checkout flow.

* The purchase price and renewal price may differ.
* The renewal price is shown during checkout and in your domain settings.

When your payment is confirmed, you're redirected back to Lovable and a progress dialog tracks the registration.

Lovable automatically:

* **Registers the domain on your behalf**\
  While registration runs, the domain shows **Registering domain** in **Workspace settings → Workspace domains** and **Pending** in **Project → Settings → Domains**.
* **Configures DNS records** \
  `A` records and verification `TXT` records are created automatically.
* **Sets up SSL/HTTPS** \
  Your domain gets a free SSL certificate, so your site is served securely.
* **Connects the domain to a project** (if you selected one) \
  Both `yourdomain.com` and `www.yourdomain.com` are set up automatically and listed separately. If you bought the domain without connecting it to a project, the progress dialog shows a **Manage domain** button when registration completes. Click it to go to the domain's detail page in your workspace and connect it to a project from there.

To use a subdomain instead of the root domain (for example, `blog.yourdomain.com` or `app.yourdomain.com`), click **Connect domain** under **Connect existing domain**, enter or select your domain, then choose **Subdomain** on the **Configure connection** step and enter the prefix.

Domain setup typically completes within a few minutes, but can take up to several hours. You can follow the progress in **Project → Settings → Domains**, where you see the domain's current status. The Publish dialog also shows the domain under the website URL with a note that it is still being set up. When the domain becomes **Live**, the dialog shows it as the website URL instead of the `lovable.app` address. You can also ask Lovable in the project chat for the current status.

> [!TIP]
>
> After your domain becomes **Live**, run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) and verify the domain in Google Search Console.
>
> This helps Lovable check indexing, canonical URLs, sitemap status, metadata, and other live-site SEO signals for the correct host.

### Domain statuses

Your domain bought through Lovable may show one of these statuses:

| **Status** | **Description** | User action |
| :- | :- | :- |
| **Pending** | Your domain is being registered and configured. DNS records and SSL are being set up. If the setup takes longer than expected, you see a warning. | No action required. Wait for setup to complete. If you see the warning, click **Check status** to refresh. Contact support if it doesn't complete within a few hours. |
| **Action required** | ICANN requires you to verify the registrant email address you entered at purchase, and the verification is still pending. The domain keeps serving your project in the meantime. | Open the verification email and click the link. |
| **Suspended** | The registrar suspended the domain, most often because you did not verify the registrant email before the deadline. The domain stops serving your project. | Verify the registrant email and click the verification link. If you already verified, release can take up to 15 minutes. If the domain stays suspended, contact [Lovable Support](https://lovable.dev/support). |
| **Live** | Domain is fully configured and serving your project. SSL is active. | No action required. |
| **Ready** | Domain is correctly configured, but your project isn't published yet. Domain will start serving automatically when you publish. | Publish the project. |
| **Checking** | Lovable is checking that it can still serve your project on this domain. This status shows briefly when you open the Domains settings. | No action required. |
| **Connection issue** | The domain is still connected in Lovable, but Lovable may no longer be able to serve your project on it. A warning below the domain explains what Lovable found, when it last checked, and what to do next. | Follow the instructions in the warning. If you moved the domain to another service intentionally, disconnect it from the project. Otherwise, contact [Lovable Support](https://lovable.dev/support) to reconnect it. |
| **Check failed** | Lovable could not complete the check for this domain. This status alone does not mean the domain has stopped working. | Click **Check status** to try again. If it still fails, contact [Lovable Support](https://lovable.dev/support). Do not change your DNS records based on this status alone. |
| **Removed** | The domain is no longer connected to this project, for example because registration expired. | Reconnect it from your workspace domains if needed. |

Lovable checks each **Live** domain when you open **Project → Settings → Domains**, and again periodically while the page stays open. A confirmed **Connection issue** stays visible until a later check succeeds, even if a check in between fails.

You can disconnect a domain at any point regardless of its status.

### Manage workspace domains bought through Lovable

All domains bought through Lovable belong to your **workspace**, not a single project. This means you can view them in one place and connect them to any project in the workspace.

To buy, view, and manage all domains that belong to your workspace, go to **Workspace settings → Workspace domains**.

You can:

* **View all domains**\
  See all domains in your workspace, including their name and expiry.
* **Search and filter**\
  Find domains by name.
* **Buy a domain**\
  Buy a new domain for your workspace. You can connect it to a project during checkout, or leave it unconnected and connect it to a project later.
* **Configure specific domains**\
  Click Configure on a domain to view and manage:
  * Registration details and alerts
  * Expiration and renewal details and alerts
  * Auto-renew settings
  * Manual renewal for another year
  * Transfer out to another registrar (turn off the transfer lock and reveal the EPP authorization code)
  * WHOIS privacy (toggle on or off, for TLDs that support it)
  * Connected projects, including a link to each project
  * [DNS records](#add-or-edit-dns-records-for-a-domain-bought-through-lovable)
* **Disconnect a domain from a project**\
  Project editors and above can disconnect a domain from a project. This does not cancel your registration. The domain remains in your workspace and can be reconnected.
* **Move a domain to another workspace**\
  Click on the three dots menu in the upper right corner and choose **Move domain** to transfer a domain to a different workspace. The destination workspace must be on a Pro plan or above, and you must be an admin or owner of that workspace. When the move completes, the domain leaves the source workspace and becomes available in the destination workspace, where you can connect it to any project there. Existing project connections in the source workspace are disconnected as part of the move.
* **Set a publishing domain** (Enterprise)\
  In the **Publishing domain** section, connect one domain or subdomain you own, such as `apps.acme.com`, so that every project in the workspace publishes at an address under it. See [Publishing domain](https://docs.lovable.dev/features/publishing-domain.md).

### Manage project domains bought through Lovable

To manage a **specific project domain** bought through Lovable, go to **Project → Settings → Domains** and click the three dots menu next to the domain.

You can:

* **Configure domain details**\
  Opens the **Configure** page, where you can view registration, renewal, and connection details.
* **Set or unset as primary**\
  Choose which domain should be the main domain for your project.
* **Disconnect the domain from a project**\
  Project editors and above can disconnect a domain from a project. This does not cancel your registration. The domain remains in your workspace and can be reconnected.

### Add or edit DNS records for a domain bought through Lovable

When a domain uses Lovable's nameservers, you can add your own DNS records alongside the ones Lovable creates automatically. Use this to add a `TXT` record for third-party domain verification (for example, Google Search Console or Google Workspace), an `MX` record for email, or any other records your setup requires.

You need to be a workspace **admin** or **owner** to change DNS records.

Go to [Workspace domains](https://lovable.dev/settings/workspace-domains) (**Workspace settings → Workspace domains**), click **Configure** next to the domain, and find the **DNS records** section.

To add a record, fill in the **Add DNS record** form:

* **Type**: select the record type. You can add `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, and `NS` records.
* **Host**: the subdomain the record applies to. Use `@` for the root domain (for example, `yourdomain.com`), or a subdomain label like `www` or `mail`.
* **Answer**: the record value provided by the service you're setting up (for example, the `google-site-verification` value from Google Search Console).
* **TTL**: the record's time to live in seconds. The minimum is `300`.
* **Priority**: shown only for record types that require it (`MX` and `SRV`).

Click the **+** button to add the record. To edit or delete a record you added, click the three dots menu next to it in the records table. Records that Lovable creates automatically show a lock icon instead and can't be edited or deleted. Lovable removes them when you disconnect the domain from the project it's connected to.

> [!NOTE]
>
> If you've switched the domain to custom nameservers, Lovable no longer manages its DNS. Add these records at your DNS provider instead.

### Change nameservers for a domain bought through Lovable

By default, Lovable manages the DNS for domains bought through Lovable using **Lovable's nameservers**. If you'd rather manage DNS elsewhere, you can point a domain to your own **custom nameservers** (for example, Cloudflare).

You need to be a workspace **admin** or **owner** to change nameservers.

Go to **Workspace settings → Workspace domains**, click **Configure** next to the domain, and find the **Nameservers** section.

* **Edit**\
  Enter your custom nameservers (at least two) and save.
* **Reset to Lovable**\
  Switch back to Lovable's nameservers so Lovable manages the domain's DNS again.

When you switch to custom nameservers, Lovable stops managing the domain's DNS. You become responsible for every DNS record at your provider, and any connected project and its email stay offline until you recreate those records there.

> [!WARNING]
>
> Custom nameservers stop Lovable from managing DNS. Connected sites and email break until you recreate the records.

## Connect a domain from another provider

You can connect a domain you already own using **automatic** setup (powered by Entri) or **manual** DNS configuration. Both methods require verifying ownership of your domain.

> [!TIP]
>
> Connecting points your domain at your project while it stays registered with your current provider. If you'd rather have Lovable manage the domain's registration, renewals, and DNS in one place, [transfer the domain to Lovable](https://docs.lovable.dev/features/transfer-domain.md) instead.

### Prerequisites

* You have project editor permissions or higher to connect and disconnect domains.
* You have access to the DNS settings for the domain or subdomain you want to connect. **Ownership verification** requires adding DNS `A` and `TXT` records provided by Lovable during setup.
* There are no `AAAA` records set for the domain you are connecting. Having an `AAAA` record can interfere with domain setup and cause traffic to be routed incorrectly.
* Your Certificate Authority Authorization (`CAA`) records, if you have any, allow Lovable to issue SSL certificates for the domain. See [My domain has CAA records and SSL setup fails](#my-domain-has-caa-records-and-ssl-setup-fails).

### Connect your domain

Follow the steps below to connect the domain:

**1. Connect domain**

Under **Connect existing domain**, click **Connect domain**.

**2. Enter your domain**

* Enter your domain or subdomain (for example, `yourdomain.com` or `blog.yourdomain.com`).
* Click **Continue**.

**3. Choose root domain or subdomain**

On the **Configure connection** step, choose how the domain connects to your project:

* **Root domain** connects `yourdomain.com`. The **Redirect `www.yourdomain.com` → `yourdomain.com`** option is enabled by default, so Lovable also connects `www.yourdomain.com` and lists it as a separate domain. Lovable redirects `www` visitors to your [primary domain](#primary-domain). When the root domain is the first domain you connect to the project, it becomes the primary domain automatically. Disable the option to connect only the root domain.
* **Subdomain** connects a subdomain such as `blog.yourdomain.com`. Enter the subdomain prefix (for example, `blog`). If you entered a full subdomain in the previous step, Lovable fills in the prefix.

The dialog shows the exact hostname under **Will be connected as**.

Click **Connect domain**.

**4. Configure DNS records**

If you connected a single hostname (a subdomain, or the root domain with the `www` redirect disabled), the DNS setup window opens immediately. If you connected the root domain with the `www` redirect enabled, both `yourdomain.com` and `www.yourdomain.com` appear in your domains list with the status **Action required**. Click **Complete setup** next to each one to open its DNS setup window.

Connect your domain in one of two ways:

* **Automatic setup with Entri**\
  Your domain provider is detected automatically. Log in and authorize Entri to update your DNS records.
* **Manual setup**\
  Select your domain provider from the list. If your provider is not listed, scroll to the bottom of the **Select your domain provider** modal and choose **Go to our manual setup**. Copy the `A` record and `TXT` record and input them directly into your domain registrar or DNS provider.

The records Lovable asks you to add look like this:

* The `A` record points your domain to Lovable's edge IP address `185.158.133.1`.
* The verification `TXT` record uses the host `_lovable` for a root domain or `_lovable.<prefix>` for a subdomain (for example, `_lovable.blog`), and a value starting with `lovable_verify=`.

If you see the IP `185.158.133.1` in your DNS settings, that is Lovable's server, not a previous host.

> [!NOTE]
>
> When connecting a domain, we suggest a default host name for the `A` record. Depending on your provider, the host name may need to be:
>
> * `@` for a root domain
> * left blank
> * set to your domain name (for example, `example.com`)
> * or the subdomain label (for example, `blog`) when connecting a subdomain
>
> For example, Amazon Route 53 requires the host name to be left blank or set to the domain name.

**5. Verify and go live**

Click **Done**. Wait for verification and SSL certificate to be issued.

When complete, the domain will become **Live** and your Lovable app will be live at your custom domain.

> [!NOTE]
>
> DNS changes may take up to 72 hours to propagate, though most updates are live within a few hours.

> [!TIP]
>
> After your domain becomes **Live**, run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) and verify the domain in Google Search Console.
>
> This helps Lovable check indexing, canonical URLs, sitemap status, metadata, and other live-site SEO signals for the correct host.

### Advanced: use a CDN or reverse proxy

Lovable can be used behind your own CDN or reverse proxy (A CDN (Content Delivery Network) or reverse proxy sits between your users and Lovable. It receives requests for your domain and forwards them to your app. It can be used for caching, security, or custom routing.), such as Cloudflare, CloudFront, or Fastly.

To do this, enable the advanced **Uses Cloudflare or similar proxy** option when connecting a domain from another provider.

When this option is enabled:

* You are responsible for configuring and maintaining your CDN or proxy
* Lovable does not configure, validate, or monitor your CDN or proxy setup

Follow these steps:

**1. Click Connect domain under Connect existing domain**

**2. Enter your domain or subdomain, then click Continue**

**3. Choose Root domain or Subdomain**

**4. Expand Advanced**

**5. Enable Uses Cloudflare or similar proxy**

**6. Click Connect domain**

Lovable provides a `CNAME` record pointing to your project's `lovable.app` URL. You can view it in **Project → Settings → Domains** after you publish the project. In proxy mode, the `CNAME` record replaces the `A` record, and Lovable does not require a verification `TXT` record. If you connected the root domain with the `www` redirect enabled, Lovable provides a `CNAME` record for each of the two domains.

**7. Add the CNAME record**

Add the `CNAME` record to your domain’s DNS settings at your DNS provider.

Wait for the domain status to become **Live**. When the `CNAME` record is pointed correctly, Lovable issues the SSL certificates.

Traffic will then flow through your CDN or proxy before reaching Lovable.

### Domain statuses

When you connect domains purchased outside Lovable, you see clear statuses that reflect verification progress, DNS propagation, SSL certificate readiness, and required user action.

| Status | Description | User action |
| :- | :- | :- |
| **Unpublished** | Shown only for your `xxx.lovable.app` project URL when the project is not yet published. | Publish the project. |
| **Ready** | The domain is ready but the project was unpublished. When published again, the status automatically becomes **Live**. | Publish the project. |
| **Action required** | The custom domain setup was not completed. | Click **Complete setup** to finish connecting. |
| **Verifying** | Waiting for DNS records to propagate. | Click **Check status** to check the latest status and verify the DNS records. Check that your `A` and `TXT` records are added correctly **at your DNS provider**, especially the full TXT value. |
| **Unable to verify** | DNS verification did not complete within one hour. This usually means your DNS records are incorrect or still propagating.  **Note**: *DNS propagation can take up to 72 hours, although most updates are applied within a few hours.* | Click **Check status** to refresh the status and re-verify your DNS records. Check that your `A` and `TXT` records are added correctly **at your DNS provider**, especially the full TXT value. |
| **Setting up** | Verification is complete. SSL certificates are being issued. Until the certificate is ready, the browser shows a security warning instead of your site. | No action required. Wait for **Live** before you open the site. The domain automatically moves to **Live** or **Failed**. |
| **Stalled** | SSL certificate provisioning is taking longer than expected. | Click **Retry** to attempt setup again. You do not need to remove and re-add the domain. |
| **Failed** | Ownership verified, but SSL certificate could not be provisioned. | Click **Retry** to attempt again. |
| **Live** | Domain is live and serving your project. | No action required. |
| **Checking** | Lovable is checking that it can still serve your project on this domain. This status shows briefly when you open the Domains settings. | No action required. |
| **Connection issue** | The domain is still connected in Lovable, but Lovable may no longer be able to serve your project on it. A warning below the domain explains what Lovable found, when it last checked, and what to do next. | Follow the instructions in the warning. If you moved the domain to another service intentionally, disconnect it from the project. Otherwise, contact [Lovable Support](https://lovable.dev/support) to reconnect it. |
| **Check failed** | Lovable could not complete the check for this domain. This status alone does not mean the domain has stopped working. | Click **Check status** to try again. If it still fails, contact [Lovable Support](https://lovable.dev/support). Do not change your DNS records based on this status alone. |
| **Offline** | Domain was **Live** but DNS records are no longer valid. Your domain is no longer pointing to your project. | Click **Recover**. Review displayed DNS records and update them **at your DNS provider** to reconnect your domain. |
| **Removed** | This domain was removed because it was added to another project or DNS verification never completed (DNS records weren't added correctly or didn't finish propagating). | Click **Reconnect** to connect the domain again. |

Lovable checks each **Live** domain when you open **Project → Settings → Domains**, and again periodically while the page stays open. A confirmed **Connection issue** stays visible until a later check succeeds, even if a check in between fails.

### Manage project domains from other providers

To manage a **specific project domain** bought from another provider, go to **Project → Settings → Domains** and click the three dots menu next to the domain.

You can:

* **Set or unset as primary**\
  Choose which domain should be the main domain for your project.
* **Disconnect from project**\
  Remove the domain from your project. This does not cancel your registration with your domain provider. Make sure to clear DNS settings in your domain provider to completely clear the connection.

## Primary domain

Lovable allows you to set **one domain as the primary domain**.

* The domain status must be **Live** in order to mark it as primary. Click the three dots menu next to your domain and click **Set as primary**.
* The first custom domain you add to a project automatically becomes the primary domain (for domains added after October 29, 2025), unless the project already has a primary address, such as an address under your workspace's [publishing domain](https://docs.lovable.dev/features/publishing-domain.md).
* If a domain is primary, all other connected domains redirect to it using a **302 temporary redirect**.
* Lovable hosting does not support **301 permanent redirects** between connected project domains. Primary domains can be changed, so Lovable uses temporary redirects to keep domain changes reversible.
* Only one domain can be primary at a time.
* You can unset the primary domain. All connected domains then serve the project equally. Click the three dots menu next to your primary domain and click **Unset as primary**.

## FAQ

> **What do DNS, A records, TXT records, AAAA records, and SSL mean?**
>
> These terms come up when connecting a custom domain from another provider:
>
> * **DNS** determines where your domain points on the internet.
> * A **DNS provider** is the service where you manage DNS records for your domain, such as `A`, `TXT`, or `AAAA` records.
> * An **A record** points a domain or subdomain to an IP address.
> * A **TXT record** is used to verify domain ownership.
> * An **AAAA record** points a domain to an IPv6 address and can interfere with domain setup if present.
> * A **CAA (Certificate Authority Authorization) record** lists which certificate authorities may issue SSL certificates for your domain. If your domain uses `CAA` records, they must allow at least one of the certificate authorities Lovable uses.
> * An **SSL certificate** enables HTTPS and allows browsers to securely connect to your site.

> **My domain shows my old website instead of my Lovable app.**
>
> Your DNS provider probably still has `A`, `AAAA`, or `CNAME` records left over from your previous website or hosting provider. Remove the old records for the host you are connecting so that only Lovable's `A` record (`185.158.133.1`) and verification `TXT` record remain, then wait for DNS propagation.

> **I see a Cloudflare error 1001 or 1003 on my domain.**
>
> These errors come from Cloudflare's proxy, not from Lovable. If your DNS is managed by Cloudflare, open the DNS settings and set the records for your Lovable domain to **DNS only** (gray cloud) instead of **Proxied** (orange cloud), then wait a few minutes and try again.

> **Does Lovable provide an SSL certificate for my custom domain?**
>
> Yes. When you connect a custom domain to your Lovable app, Lovable automatically generates and installs an SSL certificate for it. This ensures your site is served over HTTPS, keeping your visitors' data secure and improving your site's SEO ranking. If it hasn't been issued after 72 hours, please reach out to [Lovable Support](https://lovable.dev/support).
>
> You do not need to install, upload, or reissue an SSL certificate from your domain registrar (for example, Namecheap or GoDaddy). Lovable issues and serves its own certificate for the connected domain, and any SSL certificate at your external registrar is not used by Lovable's hosting.
>
> If your domain uses `CAA` records, they must allow Lovable to issue the certificate. See [My domain has CAA records and SSL setup fails](#my-domain-has-caa-records-and-ssl-setup-fails).

> **What TLS versions does Lovable support?**
>
> TLS (Transport Layer Security) is the technology that encrypts the connection between your visitors' browsers and your site. TLS is what puts the padlock icon next to your URL. Older versions of TLS (1.0 and 1.1) have known security weaknesses, so modern browsers and security standards no longer consider them safe.
>
> All custom domains and `lovable.app` URLs use TLS 1.2 or newer, and Lovable rejects connections over TLS 1.0 and 1.1. Lovable enforces this automatically, with no setup needed, and the TLS 1.2 minimum satisfies common compliance requirements such as PCI DSS (Payment Card Industry Data Security Standard), the security standard for sites that handle card payments.
>
> You can't change this setting yourself. If your compliance program requires a stricter minimum TLS version for your domain, contact [Lovable Support](https://lovable.dev/support).

> **Can I buy or connect a domain without publishing my project first?**
>
> Yes, you can buy and set up a domain at any time. However, your custom domain won't serve any content until you publish your project.

> **Can I buy a domain without connecting it to a project?**
>
> Yes. You can buy a domain as a standalone workspace domain from **Workspace settings → Workspace domains**.
>
> During checkout, leave the **Connect to project** step empty. The domain will belong to your workspace, and you can connect it to a project later from **Workspace settings → Workspace domains**, or from **Project → Settings → Domains → Connect existing domain**.
>
> This option is only available when buying from **Workspace settings → Workspace domains**. When you buy from a project's Domains settings, the Publish dialog, or the project chat, Lovable connects the domain to the current project automatically.

> **Will connecting a custom domain affect my SEO?**
>
> Yes. A custom domain helps consolidate your brand, backlinks, canonical URLs, and search visibility under a domain you control.
>
> After your domain becomes **Live**:
>
> * Run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) to check indexing, metadata, canonical URLs, sitemap status, performance, and other live-site SEO signals.
> * Verify the domain in Google Search Console.
> * Submit your sitemap through the [Google Search Console connector](https://docs.lovable.dev/integrations/google-search-console.md) or directly in Google Search Console.
> * If you changed your primary domain, rerun the SEO review so Lovable can re-check the new host.
>
> Lovable supports both custom domains and subdomains, and lets you choose one primary domain so all other connected domains redirect to it automatically.

> **Can I use a 301 redirect for my primary domain?**
>
> Lovable hosting does not support **301 permanent redirects** between connected project domains.
>
> A primary domain is a reversible project setting. You can choose a different primary domain later, or unset the primary domain entirely. Because of this, Lovable uses temporary redirects instead of permanent redirects.

> **Do I need to connect a www subdomain separately?**
>
> * For domains purchased through Lovable, both the root domain and `www` subdomain (`yourdomain.com` and `www.yourdomain.com`) are set up automatically and listed separately.
> * For domains purchased outside Lovable, connect the root domain and keep the **Redirect `www.yourdomain.com` → `yourdomain.com`** option enabled (the default). Lovable connects `www.yourdomain.com` alongside the root domain and lists it separately. If you disabled the option, the domains list shows `www.yourdomain.com` as **Not connected** after the root domain becomes **Live**. Click **Connect** next to it to add it.

> **Can I connect a subdomain instead of a full domain?**
>
> Yes. You can connect a subdomain (for example, `blog.yourdomain.com` or `app.yourdomain.com`) instead of the root domain. Enter the full subdomain when connecting your domain, or choose **Subdomain** on the **Configure connection** step and enter the prefix.

> **Can I connect multiple subdomains?**
>
> Yes. You can connect multiple subdomains, but each one must be added and configured individually, from **Project → Settings → Domains** or by asking Lovable in the project chat. For example, you can connect `blog.yourdomain.com`, `shop.yourdomain.com`, and `app.yourdomain.com`.

> **Can I connect the same domain to multiple projects?**
>
> Not the same exact domain, but you can connect different subdomains of the same domain to different projects (for example, `yourdomain.com` to project A, `blog.yourdomain.com` to project B).

> **Can I connect a domain used by another project?**
>
> Yes, as long as you can verify ownership. This also works when the other project has been deleted. What happens next depends on where the other project lives.
>
> * **Same workspace.** The connect dialog shows a **Move domain?** step that names the project the domain is connected to. Click **Move and connect**. Lovable disconnects the domain from that project and connects it to the current one, and the domain goes live here when you finish the DNS setup. The connect card in the project chat offers the same **Move and connect** action. Moving also requires permission to manage domains on the other project. Without it, Lovable connects the domain here without disconnecting it there, and the domain shows **Connection issue** until it is disconnected from the other project.
> * **Different workspace.** Lovable does not take the domain over. The dialog shows **Domain already in use**, and after you click **Connect anyway**, the other project keeps serving the domain until it is disconnected there. After Lovable verifies your DNS records, the domain shows **Connection issue** instead of **Live**, with a warning that another project is still serving it. Disconnect the domain from the other project to make it live here. If you can't access that workspace, contact [Lovable Support](https://lovable.dev/support). If you connect the domain with the proxy option, Lovable blocks the connect while the domain is live on the other project.

> **Where can I see my connected domains?**
>
> You can see your connected domains in the following locations:
>
> * **Project → Settings → Domains**: all domains connected to a project
> * **Publish dialog**: your primary domain when it is **Live**, shown as the website URL. While Lovable is still setting up a domain you bought, or the first domain you connected for a project, the dialog shows that domain under the website URL with a note that it is still being set up. The note disappears if the setup has not progressed for 72 hours. The dialog doesn't show domains marked **Action required** until you complete their setup. Click **Manage domains** to see all of them in **Project → Settings → Domains**. The button label includes the number of addresses the project has, for example **Manage 2 domains**.
> * **Workspace settings → Workspace domains**: all domains bought through Lovable, and on the Enterprise plan the workspace's [publishing domain](https://docs.lovable.dev/features/publishing-domain.md)
> * **The project chat**: ask Lovable which domains are connected, what state each one is in, and which one is primary

> **How do I set a primary domain?**
>
> The domain status must be **Live** in order to set it as primary.
>
> Go to **Project → Settings → Domains**, click the three dots menu next to a **Live** domain, and click **Set as primary**.

> **How do I unset a primary domain?**
>
> Go to **Project → Settings → Domains**, click the three dots menu next to your primary domain, and click **Unset as primary**.

> **How do I disconnect a custom domain?**
>
> You can disconnect a domain at any time regardless of its status.
>
> 1. Go to **Project → Settings → Domains.**
> 2. Click the three dots menu next to your domain, click **Disconnect**, then click **Disconnect** again to confirm.
>
> This will disconnect the domain from the project.
>
> * For **domains bought through Lovable**, this only disconnects the domain from the project. It does not cancel your registration. The domain remains in your workspace and can be reconnected.
> * For **domains purchased outside Lovable**, this only disconnects the domain from the project. It does not cancel your registration with the external provider. The domain is removed from Lovable. Make sure to clear DNS settings in your domain provider to completely clear the connection.

> **What happens to my custom domain if I downgrade or cancel my plan?**
>
> Connected domains keep serving your published app. Downgrading or canceling does not disconnect your domains or unpublish your project.
>
> * **Already-connected domains keep working**, and you can still [disconnect them](#how-do-i-disconnect-a-custom-domain) on any plan.
> * **Connecting a new domain requires a paid plan.** After a downgrade to Free, you can't buy domains or connect domains to projects, including domains already in your workspace, until you upgrade again.
> * **Domains bought through Lovable are billed separately** from your subscription, so a plan change does not affect their registration or renewal. Auto-renew keeps renewing and charging as usual, and the workspace owner can still manage the domain from **Workspace settings → Workspace domains**, including turning off auto-renew or transferring the domain out.
>
> For the rest of your published app, see [What happens to my published app if I downgrade or cancel my plan?](https://docs.lovable.dev/features/publish.md#what-happens-to-my-published-app-if-i-downgrade-or-cancel-my-plan)

> **Can I remove the xxx.lovable.app project URL?**
>
> Currently, there is no way to remove the `xxx.lovable.app` project URL from your project. However, you can add a custom domain and set it as your primary domain. This allows visitors to access your app from a branded URL instead of the default `xxx.lovable.app` project URL.

> **What TLDs (domain extensions) are available when buying a domain through Lovable?**
>
> We support most major generic top-level domains (gTLDs) and a limited set of country code top-level domains (ccTLDs).
>
> Supported ccTLDs:
>
> ```text wrap theme={null}
> "ag", "ai", "am", "bz", "cc", "ch", "cl", "cm", "co", "cz", "ec", "fm", "gg", "gy", "hn", "im", "io", "je", "la", "li", "me", "mn", "mx", "my", "pl", "pw", "sc", "si", "so", "tl", "to", "tv", "tw", "uk", "vc", "ws"
> ```
>
> Most ccTLDs only appear when you include the extension in your search, for example, `brand.uk`.
>
> Availability and pricing vary by extension.

> **What is different about buying a .si domain through Lovable?**
>
> `.si` (Slovenia) domains differ from most other extensions in three ways:
>
> * You can register a `.si` domain for up to 5 years.
> * A new `.si` domain can take up to 2 hours to become **Live** after you buy it.
> * You cannot [transfer a `.si` domain to Lovable](https://docs.lovable.dev/features/transfer-domain) from another registrar.

> **What happens if the registration fails after buying a domain through Lovable?**
>
> If registration fails after payment, the system automatically retries three times. If it still can't be completed, your payment will be refunded automatically.

> **What happens if I don't renew a domain bought through Lovable?**
>
> Your domain stops serving traffic, but it is in the registrar's redemption grace period (around 30 days), where it can still be recovered with support help. After that, it's released and may become available to anyone.

> **Can I edit the registration details for a domain bought through Lovable?**
>
> Yes.
>
> 1. Go to **Workspace settings → Workspace domains**.
> 2. Click **Configure** next to the domain.
> 3. Open the **Contact information** section.
> 4. Edit the registrant name, address, or email, and click **Save**.
>
> Lovable sends the update to the registrar.

> **How do I add a TXT record (for example, for Google Search Console) to a domain bought through Lovable?**
>
> Add it as a DNS record in Lovable. Go to **Workspace settings → Workspace domains**, click **Configure** next to the domain, and add the record in the **DNS records** section. See [Add or edit DNS records for a domain bought through Lovable](#add-or-edit-dns-records-for-a-domain-bought-through-lovable).
>
> If you've switched the domain to custom nameservers, add the record at your DNS provider instead.

> **Can I disable or re-enable WHOIS privacy after buying a domain?**
>
> Yes, for TLDs that support it. WHOIS privacy is enabled by default at registration. To change it, go to **Workspace settings → Workspace domains**, click **Configure** next to the domain, open the three dots menu in the upper right corner, and toggle **WHOIS privacy**. The change takes effect at the registrar shortly after.

> **How do I transfer a domain bought through Lovable to another registrar?**
>
> Go to **Workspace settings → Workspace domains**, click **Configure** next to the domain, open the three dots menu in the upper right corner, and select **Transfer out**.
>
> In the **Transfer out** dialog:
>
> 1. Turn off the **Transfer lock** switch. The lock is on by default and marks your domain as protected.
> 2. Click **Reveal authorization code** to get the EPP code, then provide it to your new registrar. The button stays disabled until the transfer lock is off. Generating a new code invalidates any previous one, so only the most recently generated code will work.
>
> Lovable tracks the transfer status and automatically disconnects the domain from any connected projects when the transfer completes.
>
> **60-day lock on new domains:** if the domain is within 60 days of registration, the transfer lock switch is disabled. ICANN requires this lock on new domains and Lovable cannot override it. The dialog shows the exact date the domain becomes eligible for transfer.
>
> See the next FAQ for what happens once the transfer finishes.

> **What happens if I transfer a domain bought through Lovable to another registrar?**
>
> When the transfer out completes at the registrar, Lovable automatically disconnects the domain from any project it was connected to. The domain remains visible in **Workspace settings → Workspace domains** but is marked as transferred out and can no longer serve traffic from Lovable.
>
> After the transfer:
>
> * Update DNS records at your new registrar to point your domain where you want it to resolve.
>
> * If you want to keep using the domain with a Lovable project, reconnect it as a [domain from another provider](#connect-a-domain-from-another-provider).
>
> > [!WARNING]
> >
> > Transferring a domain out is irreversible from Lovable's side. Connected projects stop serving traffic on that domain as soon as the transfer out completes.

> **Can I move a domain to a different workspace?**
>
> Yes. Domains bought through Lovable can be moved between workspaces. Go to **Workspace settings → Workspace domains**, click **Configure** next to the domain you want to move, and select **Move domain** from the three dots menu in the upper right corner. The destination workspace must be on a Pro plan or above, and you must be an admin or owner of that workspace. Domains connected from external providers cannot be moved.

> **Why does sign-in fail on my custom domain?**
>
> Your app's auth redirect URLs don't include the new domain yet. For apps on the built-in backend, Lovable adds a custom domain to the redirect URLs automatically when the domain becomes **Live**. If sign-in still fails, ask Lovable in the project chat to add your domain to the auth redirect URLs, or add it under **More → Users → Settings → Advanced**. Apps that use your own Supabase project need the domain added in that project's auth settings. See [Site URL and redirect URLs](https://docs.lovable.dev/features/authentication#site-url-and-redirect-urls). If your app uses Google sign-in with your own Google OAuth credentials, also add the new domain's redirect URL in Google Cloud Console and select it in Lovable. See [Managing Google authentication](https://docs.lovable.dev/features/google-auth.md#managing-google-authentication).

## Troubleshooting domains from other providers

> **My custom domain is connected, but it never becomes live**
>
> This usually means Lovable is still waiting for the correct DNS configuration or for changes to fully propagate.
>
> Try the following:
>
> * Ask Lovable in the project chat about the domain. It reports what state the domain is in, how long it has been there, which DNS records it expects and whether it can see them, and whether the project is published.
> * Use a DNS lookup tool like [dnschecker.org](https://dnschecker.org/all-dns-records-of-domain.php) to confirm that your domain resolves to the expected records. DNS changes can take up to **72 hours** to propagate.
> * Go to **Project → Settings → Domains** and confirm the DNS records Lovable expects.
> * Clear your browser cache or test the site in an incognito window.
> * Try removing and re-adding the domain in **Project → Settings → Domains**.

> **My domain has CAA records and SSL setup fails**
>
> If your domain stays in **Setting up**, **Stalled**, or **Failed** and your DNS has `CAA` records, those records may be blocking your SSL certificate. `CAA` records restrict which certificate authorities can issue certificates for your domain.
>
> At your DNS provider, add `CAA` records that allow at least one of the certificate authorities Lovable uses. We recommend allowing all three so Lovable can use any of them:
>
> * **Google Trust Services**: `0 issue "pki.goog"`
> * **Let's Encrypt**: `0 issue "letsencrypt.org"`
> * **SSL.com**: `0 issue "ssl.com"`
>
> If your DNS provider asks for separate fields, use flag `0`, tag `issue`, and the issuer domain as the value, for example `ssl.com` without quotation marks.
>
> Check the parent domain too. For example, `app.example.com` inherits `CAA` records from `example.com` if it has no `CAA` records of its own. If you cannot change the parent domain's records, add the `CAA` records at the subdomain you are connecting instead. `CAA` records at `app.example.com` take precedence over the ones at `example.com`.
>
> Alternatively, remove the `CAA` records if your organization no longer needs to restrict which authorities can issue certificates.
>
> After the DNS changes take effect, if the status is **Stalled** or **Failed**, click **Retry** next to the domain in **Project → Settings → Domains** and wait for **Live**.

> **My domain shows the wrong site or an outdated version**
>
> This often happens when traffic is being routed incorrectly due to an IPv6 (`AAAA`) record.
>
> Check whether your domain has any `AAAA` records configured. An `AAAA` record can interfere with domain routing and cause traffic to bypass the expected destination.
>
> To resolve this:
>
> * Review your DNS settings at your DNS provider.
> * Remove any `AAAA` records for the domain.
> * Retry connecting the domain after the change has propagated.

> **My domain stays in the "Verifying" state during manual setup**
>
> When connecting a custom domain in Lovable using manual setup, Lovable provides the exact DNS records required for verification. These records must remain unchanged until verification is complete.
>
> If the provided `A` record is modified before verification finishes, Lovable cannot verify the domain or issue SSL certificates.
>
> **While verification is in progress:**
>
> * Do not enable proxying on the `A` record.
> * Do not point the `A` record to a CDN or reverse proxy.
>
> If either of these happens, the domain remains in the **Verifying** state.
>
> **To fix this:**
>
> 1. Disable proxying (DNS-only) on the provided `A` record.
> 2. Ensure the `A` record points directly to **Lovable's IP address.**
> 3. Wait for the domain status to change to **Live.**

> **My domain shows "Connection issue" after it was Live**
>
> The domain is still connected to your project in Lovable, but its hosting connection is no longer active. The hosting connection is what lets Lovable serve your project on the domain. It stops working when the domain has been moved to another hosting service, when its hosting record has been removed or blocked, or when its SSL certificate has been deleted. It also shows when the domain is still connected to another project, which keeps serving it until it is disconnected there. Until the connection is restored, visitors may not reach your project on this domain.
>
> A warning titled **Hosting connection problem** appears below the domain. It explains what Lovable found and when the issue was last confirmed. Lovable does not clear a confirmed issue when a later check fails, so the warning stays until a check succeeds.
>
> **What to do:**
>
> * If you moved the domain to another service intentionally, disconnect it from the project. Click the three dots menu next to the domain, then click **Disconnect**.
> * If the domain is your primary domain, you can click **Unset as primary** in the three dots menu so your other domains stop redirecting to it.
> * If the warning says another project is still serving the domain, disconnect it from that project. If it's in a workspace you can't access, contact [Lovable Support](https://lovable.dev/support). See [Can I connect a domain used by another project?](#can-i-connect-a-domain-used-by-another-project).
> * Otherwise, click **Check status** to run the check again, then contact [Lovable Support](https://lovable.dev/support) if the issue remains.
>
> If the badge shows **Check failed** instead, Lovable could not complete the check, and the domain may still be working. Click **Check status** to try again, and do not change your DNS records based on that status alone.


## Related topics

- [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
