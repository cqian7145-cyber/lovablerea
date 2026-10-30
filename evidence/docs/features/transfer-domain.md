# Transfer a domain to Lovable
<!-- source: https://docs.lovable.dev/features/transfer-domain.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Transfer a domain to Lovable

> Move a domain from another registrar to Lovable, so Lovable becomes your domain registrar.

A domain transfer moves a domain you already own from another registrar into Lovable. After the transfer completes, **Lovable becomes the registrar for that domain**, so its renewals, registration details, DNS records, and connected Lovable projects all live in one place.

The domain name stays the same, your website keeps working, and any email or other services tied to the domain continue to function as long as the underlying DNS records are carried over correctly.

Lovable can automatically carry over common DNS records, keep existing Lovable subdomain connections intact, and handle annual renewal so your domain does not expire unexpectedly.

Transfer a domain when you want an existing domain to live fully in Lovable.

If you only want to point an existing domain to a Lovable project while keeping it with your current registrar, [connect a domain from another provider](https://docs.lovable.dev/features/custom-domain.md#connect-a-domain-from-another-provider) instead. If you want a new domain you do not already own, [buy a domain through Lovable](https://docs.lovable.dev/features/custom-domain.md#buy-a-domain-through-lovable).

## Prerequisites

* You need to be on a **paid plan** to transfer a domain into Lovable.
* You need to be a workspace **owner** or **admin** to transfer a domain into Lovable.
* **You have a copy of your current DNS records.**\
  Lovable tries to detect and carry over the DNS records your domain already uses, but the scan may not catch everything. Before you transfer, note your current records at your registrar so you can confirm they came across, or add anything missing, in **Workspace settings → Workspace domains** after the transfer completes.
* Your domain must meet the following requirements. Lovable checks each one during setup and tells you what to fix if anything is blocking the transfer.
  * **The domain was not registered or transferred in the last 60 days.**\
    [ICANN](https://www.icann.org/) policy prevents transferring a domain that was registered or last transferred less than 60 days ago. Lovable shows the date the domain becomes transferable.
  * **The domain is unlocked.**\
    Disable the transfer lock (sometimes called **domain lock** or **registrar lock**) at your current registrar.
  * **DNSSEC is disabled.**\
    If DNSSEC (Domain Name System Security Extensions, a feature that cryptographically signs your DNS records) is enabled at your current registrar, disable it before transferring and wait up to 24 hours for the change to propagate. Lovable checks DNSSEC when you start the transfer, not when you click **Check**, so a DNSSEC block appears at the last step. DNSSEC still being active is one of the most common causes of transfer failures.
  * **You have the authorization code.**\
    Also called an **EPP code** or **transfer code**, this is a one-time security code your current registrar issues to authorize the transfer. Get it from your current registrar's domain settings or their support.
  * **You're transferring the root domain.**\
    Subdomains cannot be transferred. Enter the root domain (for example, `example.com`, not `blog.example.com`).

## How transfers work

A domain transfer has three phases:

1. **Eligibility check.** Lovable checks whether the domain can be transferred. This includes confirming that the domain extension is supported, checking the domain’s age and lock status, looking for DNSSEC, and making sure another transfer is not already in progress for the same domain.
2. **Submission and waiting.** Lovable submits the transfer using the authorization code you provide. Your current registrar may take several days to release the domain. Lovable keeps checking the transfer status while the release is pending.
3. **Completion.** Once the transfer is approved, Lovable becomes the registrar for the domain. Lovable then updates the nameservers, applies the DNS records you chose to carry over, reconnects any existing Lovable projects already using subdomains of this domain, and saves the registrant contact details you provided.

During the waiting phase, your domain keeps working as it did before. DNS records continue to resolve from your current registrar until the transfer is complete. Lovable only updates the nameservers at the end, once the transfer is finalized.

## Transfer a domain

**1. Open the transfer flow**

Go to **Workspace settings → Workspace domains** and click **Transfer in**.

**2. Enter your root domain**

Enter the root domain you want to transfer (for example, `example.com`) and click **Check**.

Wait while Lovable checks whether the domain can be transferred. If something is blocking the transfer, Lovable tells you what to fix. Make the change at your current registrar, then click **Check** again to retry.

When the check passes, the domain collapses to a single line with an **Edit** button and the rest of the form appears below it. The footer shows the transfer price and the registration it adds, one year for most extensions, as required by ICANN. In one case the footer shows **Free** instead: you bought the domain directly from the same registrar that Lovable uses, so the domain does not need to move between registrars. The yearly renewal price appears in the **Auto-renew** row further down and applies only when the domain renews, not during the transfer.

**3. Fill in the transfer form**

* **Authorization code**: paste the **authorization code** (EPP code) you got from your current registrar. Lovable only checks that you filled in the field. A wrong code fails within minutes as **Transfer failed** with a refund and a **Retry** button, or days later as **Action needed** if the registry accepts the order and then asks for a new code.
* **Registration details**: fill in the registration contact details required for the domain. Some domain extensions require additional fields. [WHOIS privacy protection](https://en.wikipedia.org/wiki/Domain_privacy) is enabled for domain extensions that support it, and the form tells you whether your details stay private or are visible in public lookups.
* **Keep your DNS records**: Lovable shows the existing DNS records it found for your domain, such as A, AAAA, CNAME, MX, TXT, and CAA records. Lovable selects all detected records by default. Deselect any you don't want to carry over. Lovable saves the selected records to this transfer attempt and recreates them in its DNS when the transfer completes. Detection covers common record names only and does not carry over the nameserver delegation, so add anything missing after the transfer.
* **Auto-renew**: Lovable enables this by default. When enabled, your domain renews automatically before it expires at the renewal price shown in this row. This applies after the transfer completes.

**4. Start the transfer**

Click **Continue to checkout** and pay in Stripe. For a free transfer the button reads **Continue**, and there is no checkout.

Lovable confirms **Transfer started**, and the domain appears in your **Workspace domains** list, first as **Setting up transfer**, then briefly as **Submitting transfer**, and then as **Transferring**.

Transfers from another registrar usually take **5 to 7 days**, because of registry and ICANN processing rules. A free transfer, where the domain is already at the registrar Lovable uses, completes in a few seconds. You can follow the progress in your **Workspace domains** list.

## Transfer statuses

While a transfer is in progress, the domain shows one of these statuses in **Workspace domains**.

| Status | Description | User action |
| :- | :- | :- |
| **Submitting transfer** | Lovable is starting the transfer with the registry. This state lasts a few moments. | No action required. |
| **Transferring** | The transfer is in progress with the registry. | No action required. Wait for it to complete. If available, you can cancel from the domain details page. |
| **Action needed** | The transfer is blocked and needs your attention. Lovable shows the specific reason. | See [Troubleshooting](#troubleshooting) for the reason shown and what to do. |
| **Canceling transfer** | You requested to cancel the transfer. | No action required. This may take a few minutes. |
| **Transfer canceled** | The transfer was canceled and your purchase was refunded. | None. You can start a new transfer if you want. |
| **Transfer failed — refunded** | The transfer could not be completed and you've been refunded. | Click **Retry transfer** to try again with a fresh authorization code. |
| **Transfer failed** | The transfer could not be completed and needs support to resolve. | [Contact Lovable support](https://lovable.dev/support). |
| **DNS needs attention** | The domain transferred successfully, but its DNS setup didn't complete. | [Contact Lovable support](https://lovable.dev/support). |

## Cancel a transfer

You can cancel a transfer while it's in progress. Open the domain from your **Workspace domains** list and click **Cancel transfer**.

* If the transfer has not yet completed at the registry, the cancellation goes through and you'll receive a refund.
* If the transfer has already completed at the registry, the domain stays in your account and cannot be refunded.
* Free transfers complete in a single step and cannot be canceled.

## After the transfer completes

When the transfer completes successfully, the domain becomes a registered Lovable domain in your workspace, the same as a [domain bought through Lovable](https://docs.lovable.dev/features/custom-domain.md#manage-workspace-domains-bought-through-lovable). You can manage renewals, edit registration details, and update DNS records from **Workspace settings → Workspace domains**.

At completion, Lovable updates the domain’s nameservers and applies the DNS records you chose to carry over.

> [!NOTE]
>
> Because the setup scan can't catch everything, you should always check your records in **Workspace settings → Workspace domains** after the transfer and add anything that's missing.

If any Lovable projects in your workspace were already published on subdomains of this domain, Lovable automatically reconnects them.

If the domain was not connected to a Lovable project before the transfer, connect it from the project’s domain settings, or by asking Lovable in the project chat, after the transfer completes.

### Connect a transferred domain to a project

A transferred domain is not connected to a project automatically unless it was already connected to a Lovable project before the transfer. To use a newly transferred domain on a project, connect it from the project’s domain settings, from the publish dialog, or by asking Lovable in the project chat. A transferred-in domain is registered with Lovable, so connecting it writes the DNS records for you.

**1. Open the project you want to use with this domain**

* Open **Project settings → Domains**, then click **Connect domain**, or
* Open the publish dialog and select **Add domain**.

**2. Connect an existing domain**

In the **Connect a domain** dialog, enter the domain you want to use, for example, `example.com` or `app.example.com` and click **Continue**.

Lovable detects that the domain belongs to your workspace and shows a **Your domain** badge.

**3. Configure connection**

In **Configure connection**, choose how to connect the domain:

* Select **Root domain** to connect the domain itself, for example, `example.com`. Choose whether to redirect `www.example.com` to `example.com`.
* Select **Subdomain** to connect a subdomain, for example, `app.example.com`.

Review the **Will be connected as** summary.

**4. Connect domain**

Click **Connect domain**.

Because Lovable manages this domain, the DNS records are created for you automatically, so there's no manual DNS setup.

## Limitations

* Domain extension (TLD) availability for transfer varies. For example, `.si` domains cannot be transferred to Lovable. Premium domains are not supported for transfer.
* Up to 25 connected subdomain projects are automatically reconnected after the transfer.

## FAQ

> **How long does a domain transfer take?**
>
> Transfers from another registrar usually take **5 to 7 days**, because of registry and ICANN processing rules. You can follow the progress in your **Workspace domains** list. Some registrars let you approve the transfer on their side, which can speed it up. A domain you bought directly from the registrar Lovable uses transfers for free and completes in a few seconds.

> **Does transferring a domain cost money?**
>
> Usually, yes. After you enter your domain, Lovable shows the transfer price before you pay. The transfer is free when you bought the domain directly from the same registrar that Lovable uses, because the domain does not need to move between registrars.
>
> For most domains, the transfer fee includes one additional year of registration, as required by ICANN. For example, if your domain currently expires on December 1, 2026, transferring it adds a year and the new expiry is December 1, 2027.
>
> The annual renewal price is shown separately and only applies when your domain renews.

> **Where do I get the authorization code for my domain?**
>
> The authorization code (also called an **EPP code** or **transfer code**) is issued by your current registrar. Find it in your current registrar's domain settings, or request it from their support. It's a one-time security code that authorizes the transfer.

> **Will my site and email stay online during and after the transfer?**
>
> **During the transfer**, nothing changes. Your domain keeps resolving through your current provider, so your site and email keep working until the transfer completes.
>
> **After the transfer completes**, Lovable moves your domain onto its own nameservers and recreates the DNS records you kept during setup. If your domain was already connected to a Lovable project, that connection carries over, so your site keeps serving. If it isn't connected to a project yet, [connect it to one](#connect-a-transferred-domain-to-a-project) to serve your site.

> **How does DNS carry-over work?**
>
> When you start a transfer, Lovable checks your current DNS zone for the records most websites and email services rely on, including A, AAAA, CNAME, MX, TXT, CAA, and NS records.
>
> Before checkout, you choose which detected records to carry over. The records you keep are saved to that transfer attempt and applied to your new DNS zone once the transfer completes and Lovable updates the domain’s nameservers.
>
> Until then, your domain continues to use DNS from your current registrar, so your website, email, and other services can keep working during the waiting period.
>
> If any Lovable projects in your workspace are already published on subdomains of the domain being transferred, Lovable automatically adds records to keep them connected after the nameserver update. Up to 25 subdomains can be reconnected this way.
>
> DNS detection is best-effort. If your current DNS zone is slow to respond or your provider rate-limits requests, some records may be missed. After the transfer, check your records in **Workspace settings → Workspace domains** and add anything that's missing.

> **Can I transfer multiple domains at once?**
>
> You start each transfer individually. There is no bulk transfer flow.

> **Can I transfer my domain back out later?**
>
> Yes, once the 60-day post-transfer lock expires. Contact your future registrar to request the transfer. Lovable will issue an authorization code from the domain detail page. See [transfer a domain to another registrar](https://docs.lovable.dev/features/custom-domain.md#how-do-i-transfer-a-domain-bought-through-lovable-to-another-registrar) for more information.

## Troubleshooting

> **Your domain is locked at your current registrar**
>
> Log in to your current registrar, find the domain in its dashboard, and disable the transfer lock (also called domain lock or registrar lock). The setting is sometimes under security or privacy settings. When unlocked, click **Check** again in the transfer flow in Lovable.

> **This domain isn't transferable yet**
>
> The domain was registered or transferred less than 60 days ago. ICANN does not allow transfers during this period. Lovable shows the date when the domain becomes transferable. Wait until that date and try again.

> **DNSSEC is enabled at your current registrar**
>
> Disable DNSSEC at your current registrar. Wait up to 24 hours for the change to propagate, then start the transfer again in Lovable. Lovable checks DNSSEC when you click **Continue to checkout**, not when you click **Check**.

> **The transfer says "Action needed"**
>
> A transfer that needs attention shows one of these reasons:
>
> * **The transfer code was rejected.** Cancel this transfer and start a new one using the correct authorization code from your current registrar.
> * **Your current registrar has the domain locked.** Unlock it there and Lovable keeps retrying automatically.
> * **Your current registrar refused the transfer.** Check with them, or cancel and retry.
> * **The transfer is taking longer than usual.** Lovable keeps checking with the registry. [Contact Lovable support](https://lovable.dev/support) if it persists.

> **A transfer or registration is already in progress for this domain**
>
> Each domain can have only one transfer or registration in progress at a time. Open it from your **Workspace domains** list to see its status. If an attempt may still be in progress, check back in a few minutes. If you believe this is a mistake, [contact Lovable support](https://lovable.dev/support).


## Related topics

- [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
