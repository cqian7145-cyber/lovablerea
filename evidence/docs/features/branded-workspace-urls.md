# Publish apps with branded URLs
<!-- source: https://docs.lovable.dev/features/branded-workspace-urls.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish apps with branded URLs

> Create consistent, branded URLs for every app in your workspace.

Branded app URLs let your workspace publish apps under a shared, branded URL pattern instead of the default `your-app.lovable.app`.

To enable this, you configure a single workspace subdomain that is used across all app URLs.

When enabled, your app URLs follow this format: \
`https://{app-name}.{workspace-subdomain}.lovable.app`

For example, if your workspace subdomain is `acme`, a project named `dashboard` is published at `dashboard.acme.lovable.app`. Project names are scoped to your workspace, so they do not conflict with names in other workspaces.

* **Available on:** Business and Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** Workspace settings → Branded app URLs

> [!NOTE]
>
> This page is about branded app URLs, which keep your apps on `lovable.app` under a workspace subdomain. Looking for addresses under a domain you own, such as `dashboard.apps.acme.com`? See [Publishing domain](https://docs.lovable.dev/features/publishing-domain.md), available on the Enterprise plan.

## Why use branded app URLs

Branded app URLs create a consistent and recognizable URL structure across all apps in a workspace. This is especially useful for client-facing or internal enterprise deployments.

Use this feature when you:

* Want a consistent URL identity across all apps in a workspace.
* Need a predictable workspace-level naming pattern for governance and recognition.
* Want to keep project URLs branded even before adding custom domains.

## Prerequisites

You must [verify at least one domain](https://docs.lovable.dev/features/verified-domains.md) in your workspace’s **Identity** settings. Branded app URLs use a workspace subdomain derived from a verified domain.

## Set up branded app URLs

> [!NOTE]
>
> You can only have one branded subdomain per workspace.

**1. Configure your branded workspace subdomain**

Go to **Workspace settings → Branded app URLs**, select a verified domain from the dropdown, and enable the feature. You'll see a preview of what your app URLs will look like.

Lovable automatically derives the workspace subdomain, for example:

* `acme.com` → `acme`
* `acme.ai` → `acme-ai`
* `acme.co.uk` → `acme-co-uk`

**2. Wait for provisioning to complete**

Lovable provisions DNS and SSL for your branded subdomain. When it shows **Active**, you can publish your apps under the branded subdomain.

**3. Publish projects using branded app URLs**

[Publish a project](https://docs.lovable.dev/features/publish.md) as you normally would. The project URL is automatically updated to the branded format.

### Branded subdomain statuses

After enabling, the branded workspace subdomain can move through these states:

| Status | Meaning |
| - | - |
| **Provisioning DNS** | DNS provisioning is in progress |
| **Issuing SSL certificate** | DNS is ready and SSL is being issued |
| **Active** | Branded workspace subdomain is ready |
| **Failed** | Provisioning failed and requires retry |
| **Disabling** | Deprovisioning is in progress |

### Which URL your app uses

When branded app URLs are enabled and a branded workspace subdomain is active:

* Apps published for the first time publish to `app-name.workspace-subdomain.lovable.app`
* Previously published apps remain accessible at their current URL. A branded app URL is assigned when you republish.
* A project can have both a branded URL and a custom domain. If a project has its own custom domain (for example, `app.acme.com`), the custom domain remains the primary URL and takes precedence.
* Preview URLs use `preview--app-name.workspace-subdomain.lovable.app`

## Disable branded app URLs

You must unpublish all apps that are currently using branded URLs before you can disable the feature. The UI will show you how many published apps are affected and block the action until they're unpublished.

To disable branded URLs, go to **Workspace settings → Branded app URLs** and click **Disable.**

## Troubleshooting

> **I cannot enable branded app URLs**
>
> * Confirm that your workspace is on a Business or Enterprise plan
> * Confirm that your workspace has at least one verified domain

> **Setup failed during provisioning**
>
> If status shows **Failed**, disable and re-enable branded app URLs, then wait for provisioning again. If it continues to fail, contact [Lovable Support](https://lovable.dev/support).

> **I cannot disable branded app URLs**
>
> This usually means one or more apps are still published under branded app URLs. Unpublish those apps first, then disable again.


## Related topics

- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
