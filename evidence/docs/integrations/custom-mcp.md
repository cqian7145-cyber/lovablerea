# Connect a custom MCP server as a chat connector
<!-- source: https://docs.lovable.dev/integrations/custom-mcp.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect a custom MCP server as a chat connector

> Connect any remote MCP server to Lovable as a chat connector. Bring internal tools, private APIs, and custom data sources into the project chat and Chats as live context.

A **custom MCP server** is any remote server that supports the [Model Context Protocol](https://modelcontextprotocol.io) and is not already a prebuilt connector in the Lovable catalog. Connect one as a [chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md), and Lovable can read from it as live context in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md): internal CRMs, private APIs, company knowledge bases, or niche third-party tools.

Custom MCP servers are available on **all plans**. Like all chat connections, they are personal to you, and they are never part of your published app. If your published app needs to call a service while people use it, use an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md), [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) for its API, or [integrate the API directly](https://docs.lovable.dev/integrations/any-api.md).

> [!TIP]
>
> Explore [remote MCP servers](https://mcpservers.org/remote-mcp-servers), a curated list of high-quality remote MCP servers compatible with Lovable.

## How to connect a custom MCP server

To connect a custom MCP server, you need the server's URL and, depending on the server, its credentials:

> [!NOTE]
>
> If your workspace has an [MCP registry](https://docs.lovable.dev/integrations/mcp-registries.md), you can browse it and select **Connect** next to a server instead. This opens the same form with the server's URL already filled in, so you can skip straight to authentication. Servers connected from a registry always use a direct connection. To use [Lovable static IPs](#lovable-static-ips), add the server by URL as described below.

**1. Open the custom MCP form**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select **Add custom** in the top right of the catalog, and choose **MCP server**. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for every place you can open the catalog.

If **MCP server** is greyed out, a workspace admin has disabled custom MCP servers for your workspace.

**2. Name the server**

Enter a clear **Server name** (for example, *Internal CRM* or *Analytics API*).

**3. Choose how Lovable reaches the server**

A **Connection** dropdown appears when your workspace has more than one route available. Keep **Direct connection** unless your server is behind a firewall that only accepts traffic from allowlisted IPs. In that case, select **Lovable static IPs** so requests reach your server from Lovable's published IP ranges. See [Lovable static IPs](#lovable-static-ips) for details and the ranges to allowlist.

**4. Enter the server URL**

Enter the **Server URL** where Lovable can reach your MCP server, for example `https://mcp.example.com`.

**5. Choose authentication**

* **OAuth (default)**: Lovable uses OAuth by default. After you click **Add & authorize**, you're prompted to authorize.
* **Bearer token or API key**: For servers that don't support OAuth, authenticate with a bearer token or API key.
* **No authentication**: Connect without credentials if the server doesn't require authentication.

**6. Add the server**

Click **Add & authorize** (OAuth) or **Add server**. The custom MCP server now appears in your list of chat connectors and can provide contextual data for builds.

To confirm the connection works, ask Lovable something the server can answer, for example:

```text wrap theme={null}
Using the Internal CRM connector, list my five most recent customer accounts.
```

## Lovable static IPs

By default, Lovable reaches a custom MCP server over a **Direct connection**, and requests do not come from a fixed set of IP addresses. That works for servers on the public internet, but not for servers behind a firewall that only accepts traffic from allowlisted IPs, such as on-premises deployments.

**Lovable static IPs** is a per-connection option for custom MCP servers that routes all Lovable traffic to the server through Lovable's published static egress IP ranges. Allowlist these ranges in your firewall, and Lovable can reach the server:

* IPv4: `185.41.150.0/28` and `185.41.150.16/28`
* IPv6: `2a07:8241:fca:1000::/56`

> [!WARNING]
>
> These ranges are shared Lovable infrastructure egress, not addresses reserved for your workspace. Allowlisting them admits Lovable-originated traffic in general, so treat the allowlist as a network control, not as authentication. Keep your server's own bearer token or OAuth in place, and don't treat a matching source IP as proof of identity.

To use it, select **Lovable static IPs** in the **Connection** dropdown when you [add the server](#how-to-connect-a-custom-mcp-server).

* **It works with every authentication type.** OAuth, bearer token, and no authentication all work with Lovable static IPs.
* **You can only choose it for custom MCP servers.** Featured connectors from the catalog don't offer the option.
* **Enterprise only, enabled per workspace.** Lovable static IPs requires an **Enterprise** plan, and Lovable must also enable the option for your workspace. If you don't see **Lovable static IPs** in the **Connection** dropdown, contact your Lovable account team.
* **Add the server by URL, not from a registry.** Servers connected from an [MCP registry](https://docs.lovable.dev/integrations/mcp-registries.md) always use a direct connection, and the **Connection** dropdown doesn't appear for them.
* **The choice is fixed when you add the server.** Lovable checks the option when you create the connection, and the connection keeps its setting from then on. If the option is later disabled for your workspace, existing static-IP connections keep working, but you can't create new ones. To switch an existing connection between **Direct connection** and **Lovable static IPs**, remove the server and add it again.

> [!NOTE]
>
> App + chat connectors route through the connector gateway, whose ranges on [IP allowlisting](https://docs.lovable.dev/integrations/security.md#ip-allowlisting) are broader and already contain the ranges above. Allowlisting the narrower set is enough for a custom MCP server. If you have already allowlisted the gateway ranges, custom MCP traffic using **Lovable static IPs** is covered too.

## Manage custom MCP servers

Custom MCP servers follow the same workspace controls as other chat connectors, through two settings:

* The **Custom MCP** row ("Allow members to connect their own MCP servers") in **Connectors → Admin settings → Chat connectors** turns custom MCP servers on or off for everyone. It governs them as a group, so individual custom MCP servers that members have connected do not appear in the admin table.
* [**Remote MCP connectors**](https://docs.lovable.dev/features/privacy-and-security-settings.md#remote-mcp-connectors) in [Privacy & security](https://lovable.dev/settings/privacy-security) turns all chat connectors on or off for the workspace, custom MCP servers included.

See [Chat connector controls](https://docs.lovable.dev/integrations/admin-controls.md#chat-connector-controls) for all chat connector governance settings.

## FAQ

> **Which plans support custom MCP servers?**
>
> All plans. Custom MCP servers are chat connectors, which are enabled by default everywhere, including on Enterprise workspaces. A workspace admin can turn them off with the **Custom MCP** setting described in [Manage custom MCP servers](#manage-custom-mcp-servers). The [**Lovable static IPs**](#lovable-static-ips) connection option is the exception: it is Enterprise only.

> **Can my published app use a custom MCP server?**
>
> No. Chat connections, including custom MCP servers, only give Lovable context in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). For functionality in your published app, use an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md) or ask Lovable to [integrate the API directly](https://docs.lovable.dev/integrations/any-api.md).

> **Why doesn't my custom MCP server show up in Admin settings?**
>
> By design. The Admin settings table lists catalog connectors only. Custom MCP servers are controlled as a group through the **Custom MCP** row in **Connectors → Admin settings → Chat connectors**.

> **Which IP addresses does Lovable connect to my MCP server from?**
>
> With a **Direct connection** (the default), requests do not come from a fixed set of IPs. With the [**Lovable static IPs**](#lovable-static-ips) connection option, all traffic to the server comes from `185.41.150.0/28`, `185.41.150.16/28`, and `2a07:8241:fca:1000::/56`, which you can allowlist in your firewall.

> **Why don't I see the Lovable static IPs option?**
>
> The option requires an **Enterprise** plan, and Lovable must also enable it for your workspace. It only appears for custom MCP servers that you add by URL, not for featured connectors or for servers connected from an MCP registry. See [Lovable static IPs](#lovable-static-ips) for how to request it.

> **Can other people in my workspace use my custom MCP connection?**
>
> No. Chat connections are per-user. Others in your workspace connect the same server themselves by entering its name and URL with their own credentials. If your workspace uses an [MCP registry](https://docs.lovable.dev/integrations/mcp-registries.md) that lists the server, they can connect it from there with the URL already filled in.


## Related topics

- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)
- [Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md)
- [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
