# Create and manage API keys
<!-- source: https://docs.lovable.dev/features/api-keys.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Create and manage API keys

> Create, scope, and revoke workspace API keys (access tokens) for the Lovable API, set per-key credit limits, and restrict keys to approved IP addresses.

Workspace API keys authenticate requests to the [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md). Manage them under **Workspace access tokens** on the **API keys & OAuth** settings page. You also use one to set up the [Lovable API connector](https://docs.lovable.dev/integrations/lovable-api-connector.md), which lets an app you build with Lovable call the API. Each key belongs to one workspace and can only access that workspace's projects and data. The public API manages and deploys existing projects, and its current endpoints, including deployment builds, do not consume AI build credits.

Creating and managing keys requires a Business or Enterprise plan, and an owner or admin role in the workspace.

> [!NOTE]
>
> Free and Pro workspaces show an upgrade prompt for workspace API keys. [OAuth clients](https://docs.lovable.dev/features/oauth-clients.md) are available to workspace owners and admins on all plans, but sensitive scopes require **Business or Enterprise**.

## Why use workspace API keys

Use a key for a script or service that manages your team's workspace. Give each integration its own key so you can limit its access and revoke it independently. Actions using a key are attributed to the person who created it.

To connect your own app to Lovable, register an [OAuth client](https://docs.lovable.dev/features/oauth-clients.md). Each user then reviews and authorizes the requested scopes.

## Common use cases

Use workspace API keys for management tasks such as these:

| Use case | Example |
| - | - |
| Report on projects | An internal dashboard that lists existing projects and reads analytics |
| Automate publishing | A workflow that publishes an existing project |
| Monitor workspace security | A reporting tool that reads security scans and workspace insights |

## Prerequisites

Before you create a key, make sure you have:

* A **Business or Enterprise** workspace and the **owner or admin** role.
* An integration that can send HTTPS requests and store credentials securely.
* If you restrict IP addresses, your integration's public outbound IP addresses or ranges.

## Create an API key

Each key gets its own name, scopes, expiry, optional spending cap, and optional IP allowlist, so give each integration its own key.

**1. Open workspace access tokens**

Select the workspace your integration will manage. Go to [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys) and click **New API key**.

**2. Name the key**

Enter a **Key name** that helps you recognize the key later, for example `CI/CD pipeline` or `Zapier`. The name is visible to workspace admins and owners.

**3. Set a credit limit (optional)**

Set a **Credit limit** to cap how many AI build credits requests using this key can spend each calendar month. The cap resets at 00:00 UTC on the first day of each month. Leave it blank for no limit.

**4. Choose an expiration**

Choose an **Expiration**: 7, 30, 60, 90, or 180 days, 1 year, or **Never**. "Never" works for long-lived service integrations, but rotating keys regularly is safer.

**5. Grant access**

Under **Access**, choose **None**, **Read**, or **Read & write** for each resource. You must grant at least one:

* **Projects**: read and modify projects settings, delete projects, publish projects, and read project security scans in this workspace.
* **Workspace**: list projects, and read workspace details, members, groups, security insights, and analytics.

Use **Apply preset → Read only** or **Apply preset → Full access** to fill in both resources at once. **Full access** grants both sets of management scopes.

**6. Restrict the key to approved IP addresses (optional)**

Under **IP allowlist**, click **Upload CSV** and choose a file with one IP address or address range per row to allow requests only from those addresses. Leave it empty to allow requests from any address. See [Restrict a key to an IP allowlist](#restrict-a-key-to-an-ip-allowlist) for the details.

**7. Create and copy the key**

Click **Create API key**, then copy the key value.

> [!WARNING]
>
> The secret value is shown only once, right after the key is created. Copy it and store it somewhere safe before leaving the page. If you lose it, you need to create a new key.

## Use the key

Send the key in the `Lovable-API-Key` header on every request. This read-only example requires **Workspace: Read** or **Read & write**:

```bash theme={null}
curl https://api.lovable.dev/v1/workspaces \
  -H "Lovable-API-Key: lov_YOUR_KEY" \
  -H "Lovable-Version: 2026-09-11" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

Confirm that the request succeeds and returns the key's workspace. If you configured an IP allowlist, test from an allowed outbound IP address.

## Manage existing keys

The **Workspace access tokens** section lists every key in the workspace with who created it, when it was created and last used, and its credit usage. Open a key's **View details** action to see its scopes, expiry, credit limit, and IP allowlist.

* **Change the credit limit**: open the key's menu and click **Edit credit limit**. You can raise, lower, or remove the cap at any time.
* **Change the IP allowlist**: open the key's menu and click **Edit IP allowlist**. The existing entries appear as one source named **Current allowlist**. Upload a CSV to add entries. To replace the list, remove **Current allowlist** and upload a new CSV. Remove every source to allow any address again.
* **Revoke a key**: open the key's menu and click **Revoke key**, then confirm. Revocation is permanent and normally takes effect immediately, but allow a brief propagation delay. It does not cancel work already accepted. Anything still using the key loses access.

The name, scopes, and expiry are fixed when the key is created. To change them, create a replacement key, update your integration, verify that it works, and revoke the old one.

## Restrict a key to an IP allowlist

An IP allowlist limits a key to requests from approved IP addresses and address ranges, so a key only works from the servers you expect, for example a CI runner or your own backend. Set it when you create the key, or from an existing key's menu with **Edit IP allowlist**.

Upload a CSV file with one entry per row, up to 3,000 entries and 1 MB. An entry is an IPv4 or IPv6 address, or an address range in CIDR notation, such as `203.0.113.0/24` or `2001:db8::/48`. Lovable rejects ranges wider than /8 for IPv4 or /32 for IPv6. Every list must include at least one IPv4 entry, because the Lovable API currently answers over IPv4 only. Lovable skips rows that are not valid entries and rows that repeat one, and shows how many it skipped. A key with no allowlist accepts requests from any address.

A request from an address that is not on the list fails with `403 ip_restricted`. On Enterprise plans, each refused request is recorded in your workspace [audit log](https://docs.lovable.dev/features/audit-logs.md) as **User API key IP rejected**, and allowlist changes appear as **User API key updated**.

> [!NOTE]
>
> The [Lovable API connector](https://docs.lovable.dev/integrations/lovable-api-connector.md) calls the API from Lovable's connector gateway, not from your address. To use a restricted key with the connector, include the [connector gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting) in the allowlist.

## Keep keys safe

Keep the following in mind:

* Store keys in a secret manager or environment variable, never in code or version control.
* Grant only the scopes each key needs, and prefer an expiry date over "Never."
* Give each integration its own key, so you can revoke one without breaking the others.
* Lovable partners with GitHub secret scanning: when GitHub secret scanning detects and reports an exposed supported Lovable API key (keys start with `lov_`), Lovable revokes it automatically and sends an email notification. Treat a key exposed anywhere else as compromised and revoke it yourself.

> [!NOTE]
>
> When storing a key as a [project secret](https://docs.lovable.dev/features/secrets.md), do not name it `LOVABLE_API_KEY`. Lovable creates and manages a secret with that exact name in each project, and names starting with `LOVABLE_` are reserved. Pick a different name, such as `LOV_PUBLIC_API_KEY`.

## FAQ

> **Who can create and see API keys?**
>
> Workspace owners and admins on Business and Enterprise plans. They see every key in the workspace, including keys created by others, but not a key's secret value.

> **Can I see the secret value of a key again?**
>
> No. The secret is shown once, when the key is created. If you lose it, create a new key and revoke the old one.

> **What happens when a key expires?**
>
> Requests using the key start failing. Expiry does not delete the key from the list, so you can see what expired, but you need to create a new key to restore access.

> **What does the credit limit do?**
>
> It caps how many AI build credits requests authenticated with that key can spend each calendar month. The cap resets at 00:00 UTC on the first day of each month, independently of your subscription renewal date. The API currently manages and deploys existing projects and does not expose AI project creation or editing, so no current endpoint spends AI build credits. Deployment builds through the publish endpoint do not spend them either. When the cap is reached, requests that would spend credits fail until the next month starts or until you raise the limit. Requests that do not spend credits are not affected by the cap.

> **Can I restrict a key to specific IP addresses?**
>
> Yes. Upload a CSV of IP addresses or CIDR ranges, IPv4 or IPv6, when you create the key, or later with **Edit IP allowlist**. The list must include at least one IPv4 entry. Requests from other addresses fail with `403 ip_restricted`. To use a restricted key with the Lovable API connector, include Lovable's connector gateway IP ranges in the list. See [Restrict a key to an IP allowlist](#restrict-a-key-to-an-ip-allowlist).

> **Is revoking a key reversible?**
>
> No. Revoking is permanent and normally takes effect immediately, though a brief propagation delay is possible. Create a new key if you need access again.


## Related topics

- [API basics](https://docs.lovable.dev/api-reference/introduction.md)
- [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Connect your app to Attention](https://docs.lovable.dev/integrations/attention.md)
