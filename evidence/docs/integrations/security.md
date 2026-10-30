# Integration security
<!-- source: https://docs.lovable.dev/integrations/security.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Integration security

> How Lovable stores and protects integration credentials, plus the gateway, IP allowlisting, and domain restrictions that secure connector traffic.

This page covers how data flows through Lovable connectors, how Lovable stores and protects integration credentials, and the security controls that apply to connector traffic: the connector gateway, outbound IP allowlisting, and domain restrictions.

## Connector data flow

When your app uses an app + chat connector, Lovable acts as a secure intermediary between your app and the third-party service. For example, when your app displays a SharePoint document, the document is fetched live from Microsoft through the connector gateway and returned to your app.

A connector request follows these steps:

1. Your app requests an item, such as a document, record, or message.
2. The request goes to Lovable's connector gateway.
3. The gateway authenticates with the third-party service using the connection's stored credentials and fetches the item live.
4. The gateway returns the response directly to your app.

This design has two practical consequences:

* **Access mirrors the connected account.** A connector can only see what the account used to create the connection is permitted to see at the third-party service. If that account has read-only access, your app has read-only access.
* **Access ends immediately when you delete a connection.** Its secrets are removed and apps using it stop working. See [Data retention and deletion policy](#data-retention-and-deletion-policy).

This flow applies to gateway-based connectors, which covers most app + chat connectors. See [Gateway connectors](#gateway-connectors) for details on the exceptions.

## Credentials

### Access and permissions

All credentials are stored encrypted. After a credential is saved, no one can read it back directly: not workspace members, not workspace admins, and not Lovable.

Each project receives two keys: `LOVABLE_API_KEY`, which identifies the project and workspace, and the opaque connection key. The connection key stands in for the connection's secrets and lets that project reach the connector gateway. Your app and Lovable use this key to call the connector, while the provider tokens stay in Lovable's secret store.

Some secrets can be visible inside a project and to Lovable. This applies when a secret is marked public (for example, a publishable key meant for the browser) or when the connector does not route through the gateway. Gateway connectors keep all credentials on Lovable's side and do not expose them in the project.

### Data retention and deletion policy

Secrets are deleted from the workspace as soon as the connection is deleted. If an entire workspace is deleted, its secrets are removed after the grace period.

Expired or unused connections are never deleted automatically. Remove a connection yourself when you no longer need it.

### Rotation

If a credential is leaked, you can rotate the `LOVABLE_API_KEY` for each project. After rotation, the previous key may still be valid for up to an hour depending on caching.

## Gateway connectors

Most app + chat connectors route through a **secure gateway** between your Lovable app and the third-party service. This includes [custom connectors your workspace creates](https://docs.lovable.dev/integrations/create-connector.md): their requests go through the same gateway and leave from the same IP ranges as built-in connectors. If you need to confirm whether a specific connector routes through the gateway, contact Lovable support.

The gateway provides the following capabilities:

* **Authentication is handled automatically.** The gateway manages OAuth and refreshes expiring tokens when a request needs them. If access is revoked or a refresh token is no longer valid, reconnect the account.
* **Credentials are not exposed in your project.** Tokens are stored securely in the gateway and are not visible in project settings or accessible to workspace admins. Your app calls the connector, and the gateway handles authentication.
* **Each project has a usage limit.** Gateway connectors allow up to **1,000 requests per minute per connector per project** by default. Some connectors have a lower limit to prevent abuse, stated on the connector's page. Each project has its own limit, so usage in one project does not affect others. Most apps stay well below this threshold. Design with the limit in mind if you build high-volume automations or frequent background operations.
* **Outbound traffic uses a stable IP range.** Requests from gateway-based connectors leave Lovable from a fixed set of IP ranges that you can allowlist. See [IP allowlisting](#ip-allowlisting) for the ranges.

App + chat connectors that do not use the gateway may authenticate differently, such as through a direct API key or credentials managed by Lovable. The capabilities listed above apply only to gateway-based connectors.

## IP allowlisting

Requests from gateway-based connectors to third-party services leave Lovable from a fixed set of IP ranges. Partners and enterprise customers can allowlist these ranges to permit Lovable connector traffic through firewalls or IP-restricted APIs.

* IPv4: `185.41.150.0/25`
* IPv6: `2a07:8241:fca::/48`

> [!NOTE]
>
> These are also the addresses the [Lovable API connector](https://docs.lovable.dev/integrations/lovable-api-connector.md) calls the Lovable API from. To restrict a workspace API key to approved addresses, see [Restrict a key to an IP allowlist](https://docs.lovable.dev/features/api-keys.md#restrict-a-key-to-an-ip-allowlist).

[Custom MCP servers](https://docs.lovable.dev/integrations/custom-mcp.md) do not route through the connector gateway, so by default their traffic does not come from fixed addresses. Enterprise workspaces with the **Lovable static IPs** connection option enabled can route custom MCP traffic through a smaller set of addresses inside the ranges above, so allowlisting the gateway ranges covers that traffic too. See [Lovable static IPs](https://docs.lovable.dev/integrations/custom-mcp.md#lovable-static-ips) for the exact ranges.

## Domain restrictions

Some connectors and third-party services let you restrict a key to a set of domains (sometimes called referrer, origin, or HTTP referrer restrictions). When a key is used in your app's frontend code, such as the Logo.dev or Google Maps Platform browser key, domain restrictions limit where the key works so it can't be reused elsewhere.

For keys or systems that support domain restrictions, add the domains where Lovable serves your app:

* `*.lovable.app/*`
* `*.lovable.dev/*`
* `*.lovableproject.com/*`
* `your production domain`

These cover all Lovable's environments. If your app is served from a [custom domain](https://docs.lovable.dev/features/custom-domain.md), add that domain to the list as well.

## Share how gateway connectors work

Need to explain how Lovable accesses your external data to colleagues, IT, or a security reviewer? Share the one-pager below. It explains the gateway connector data flow in plain language, without requiring the reader to go through these docs.

> **[How Lovable connects to your data](https://how-lovable-connects-to-your-data.lovable.app/)**
>
> A shareable one-pager explaining how Lovable's gateway connectors fetch your data live, what they can access, and how to disconnect.


## Related topics

- [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [App + chat connectors: Add capabilities to your published app and your chat](https://docs.lovable.dev/integrations/app-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
