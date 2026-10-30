# Publish every app in your workspace under your own domain
<!-- source: https://docs.lovable.dev/features/publishing-domain.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish every app in your workspace under your own domain

> Publish your Enterprise workspace's apps under one domain or subdomain with a one-time setup.

A publishing domain gives your workspace's apps addresses under a domain you own. Set up `apps.acme.com` once, then publish apps at addresses such as `dashboard.apps.acme.com` and `portal.apps.acme.com`.

* **Available on:** Enterprise plans
* **Access:** Workspace admins and owners connect a publishing domain. Workspace owners disconnect it. Project editors and above choose each app's address under it.
* **Location:** [Workspace domains](https://lovable.dev/settings/workspace-domains) (**Workspace settings → Workspace domains → Publishing domain**)

## When to use a publishing domain

A publishing domain fits workspaces that publish many apps under one address pattern:

* **Internal tools under your company domain:** a team publishes dashboards and admin tools that employees reach at `tool-name.apps.acme.com` instead of a `lovable.app` address.
* **Client or partner portals on your brand:** an agency or vendor publishes one app per client, and every app carries the agency's domain.

Use a [custom domain](https://docs.lovable.dev/features/custom-domain.md) instead when one app needs a domain of its own, such as `www.acme.com`. A project can have both. See [Choose the address of each app](#choose-the-address-of-each-app).

## How a publishing domain works

DNS is the set of records that tells the internet where your domain's website and email live. Connecting a domain affects its DNS differently depending on who manages that DNS today:

* **DNS already managed by Lovable:** a domain you bought through Lovable, a subdomain of it, or a domain whose nameservers already point to Lovable. Nothing moves, and existing records stay in place.
* **A subdomain at another provider:** when you connect `apps.acme.com`, Lovable hosts DNS only for that subdomain. Email and websites on the rest of `acme.com` keep working as they are.
* **A full domain at another provider:** when you connect `acme.com` itself, Lovable takes over DNS for the entire domain, including the records your website and email use.

> [!WARNING]
>
> Moving a full domain's DNS to Lovable can interrupt its existing website, email, and other services. Use a dedicated subdomain if you want to keep the rest of your domain's DNS at its current provider.

## Prerequisites

Check these requirements before you connect a domain:

* The workspace is on the Enterprise plan, and you are a workspace admin or owner.
* You own the domain or subdomain. If Lovable does not already manage its DNS, you need access to its DNS provider or registrar.
* If you are moving DNS to Lovable, [disable DNSSEC (Domain Name System Security Extensions)](#this-domain-has-dnssec-enabled-at-your-registrar) for the domain or subdomain you connect.

## Connect a publishing domain

You set up a publishing domain once per workspace.

**1. Enter the domain**

Open [Workspace domains](https://lovable.dev/settings/workspace-domains) (**Workspace settings → Workspace domains**) and find **Publishing domain**.

Under **Use your own domain**, enter a domain or subdomain you own, such as `acme.com` or `apps.acme.com`, or choose a domain from the suggestions. The suggestions include domains bought through Lovable and domains whose nameservers already point to Lovable. Click **Continue**.

**2. Review what the connection changes**

If Lovable already manages the domain's DNS, the dialog confirms that no DNS setup is needed. If you entered a full purchased domain, you can choose **Use a subdomain instead** and enter a subdomain such as `apps.acme.com`. Click **Use domain**.

If DNS needs to move to Lovable, review the warnings and any existing records the dialog lists. For a full domain from another provider, the dialog shows **Existing services will stop working**. Choose **Connect a subdomain instead** to leave the rest of your domain's DNS at its current provider. Click **Connect subdomain** or **Connect domain** to continue.

If the domain is already connected to a project as a custom domain, Lovable blocks the setup. Choose another domain, or disconnect the domain from that project first.

**3. Complete setup**

If you clicked **Use domain**, no further DNS setup is needed. Otherwise, follow the steps for your domain.

**Subdomain you own elsewhere**

As soon as you confirm, Lovable opens the guided setup (powered by Entri). Log in to your DNS provider and authorize Entri to add the records. To add them yourself instead, close the guided setup and copy the `NS` and `TXT` records that Lovable shows into your DNS provider's settings. To open the guided setup again later, click **Connect automatically**.

Lovable checks for the records automatically. Click **Check again** to check now. DNS changes usually show up within an hour.

**Full domain you own elsewhere**

1. **Verify you own the domain**: add the `TXT` record that Lovable shows at your DNS provider. This record is only proof of ownership. Nothing on your domain changes yet.
2. **Point your domain to Lovable**: after Lovable verifies the record, it shows the nameservers to use. In your registrar's settings, replace the domain's nameservers with those.

> **I bought my domain through Lovable but changed its nameservers**
>
> If the full domain uses another provider's nameservers, connecting it moves its DNS to Lovable. Lovable changes the nameservers for you. Review the DNS warnings before you confirm the connection.

When the status reads **Active**, the section shows the address pattern for your projects. From then on, every project you publish gets an address under the domain.

## Choose the address of each app

You can choose the first part of each app's address, such as `dashboard` in `dashboard.apps.acme.com`. Lovable uses the project's name by default.

The first part can use lowercase letters, numbers, and hyphens, up to 63 characters. It must start with a letter or number and cannot end with a hyphen. Renaming a project does not change its existing address.

You can check the address in **Project → Settings → Domains**. Its card shows **Verifying** while Lovable sets it up, then **Live** when visitors can open it. When the address is **Live**, you can open the card's menu and choose **Set as primary** to make it the project's main address.

If a project already has a primary [custom domain](https://docs.lovable.dev/features/custom-domain.md) of its own, that domain stays primary. The project still gets an address under the publishing domain.

### Choose an address before publishing

Open the Publish dialog. For a project without a custom domain, the suggested address ends with your publishing domain. Edit the first part of the address, then publish the project.

### Add an address to an already published app

Publish the project again to give it an address under the publishing domain.

If the project has no custom domain, you can also set up the address without publishing again. Open the Publish dialog and click the pencil icon (**Edit subdomain**) next to the suggested address. Confirm or change the first part of the address, then save.

### Change an existing address

Open **Project → Settings → Domains**. Find the card for the address under your publishing domain, open its menu, and choose **Edit hostname**.

> [!WARNING]
>
> If you change a published app's address, its previous address under the publishing domain stops working. Update any links and bookmarks to use the new address.

## Disconnect a publishing domain

Workspace owners can disconnect the publishing domain from the **Publishing domain** section with **Disconnect**.

> [!WARNING]
>
> When you disconnect, apps go offline at their addresses under the publishing domain, and existing links to them stop working.

* If you used a purchased domain without moving its DNS, Lovable removes only the app addresses. Existing custom domain connections, email, and DNS records for other services stay in place.
* If connecting a purchased domain moved its DNS to Lovable, Lovable restores the domain's original nameservers when you disconnect. For a domain registered elsewhere, remove the `NS` and `TXT` records you added for Lovable, or point the domain's nameservers back to your provider. Then restore the DNS records your other services need.

If you disconnect while Lovable is still waiting for DNS, the setup stops and you can connect the domain again later. During the two-step setup of a full domain, the button reads **Cancel setup**.

Lovable records connections and disconnections in [Audit logs](https://docs.lovable.dev/features/audit-logs.md).

## Limitations

A publishing domain has two limits that a per-project custom domain does not:

* A workspace can have one publishing domain.
* An app's address is always one name directly under the domain, such as `dashboard.apps.acme.com`. You cannot publish an app at the domain itself or at a deeper name.

## FAQ

> **Can I keep using my domain's website and email after I connect it as a publishing domain?**
>
> In most cases, yes. A domain bought through Lovable keeps its existing records. An external subdomain such as `apps.acme.com` leaves websites and email on the rest of `acme.com` unchanged. Moving a full domain's DNS to Lovable can interrupt its existing websites and email. See [How a publishing domain works](#how-a-publishing-domain-works).

> **What happens to apps I published before I connected the publishing domain?**
>
> Connecting the publishing domain does not change existing app addresses. Publish an app again to give it an address under the domain. If it has no custom domain, you can also set up the address from the Publish dialog without publishing again. The new address is ready when its status is **Live**. See [Choose the address of each app](#choose-the-address-of-each-app).

> **What happens to the publishing domain if my workspace leaves the Enterprise plan?**
>
> Existing app addresses keep working, including when you publish updates. Apps without an address under the publishing domain cannot get one until you upgrade to Enterprise again. See [Features that stop working when you downgrade](https://docs.lovable.dev/introduction/manage-subscription.md#features-that-stop-working-when-you-downgrade).

## Troubleshooting

If setup does not complete, check these common causes.

> **The status stays on Waiting for DNS**
>
> Lovable has not found the records at your DNS provider. If the records are still missing after an hour, the section shows **DNS changes usually show up within an hour. Double-check the records above at your DNS provider.**
>
> **What to do:** compare the `NS` and `TXT` records at your provider with the ones Lovable shows. Enter the host the way your provider expects it, usually only the part before your domain, such as `apps` for `apps.acme.com`. After you fix the records, click **Check again**. If you canceled the setup, start again from [Connect a publishing domain](#connect-a-publishing-domain).

> **This domain has DNSSEC enabled at your registrar**
>
> DNSSEC is enabled at your registrar for the domain or subdomain you entered, and Lovable cannot connect a domain while it is enabled.
>
> **What to do:** disable DNSSEC at your registrar. Wait for the change to take effect, typically up to 24 hours, then connect the domain again.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
- [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)
