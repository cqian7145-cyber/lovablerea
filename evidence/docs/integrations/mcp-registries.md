# MCP registries
<!-- source: https://docs.lovable.dev/integrations/mcp-registries.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP registries

> Add an MCP registry to your workspace so members can browse a directory of MCP servers and connect them as chat connectors without pasting URLs.

An MCP registry gives your workspace a browsable directory of MCP servers. A workspace owner or admin adds the registry once, and members then pick servers from it and connect them as [chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) in a couple of clicks, instead of finding and pasting each server's URL by hand.

MCP registries are available on **all plans**. They are useful when your company runs an internal directory of approved MCP servers, or when you want your team to connect tools from a public directory.

## What is an MCP registry?

MCP (Model Context Protocol) is an open standard that lets AI tools like Lovable talk to external services. An MCP registry is a directory server that lists MCP servers, following the MCP community's registry specification. Companies use registries to publish the set of servers their teams should use, and public registries list servers anyone can connect to.

Lovable does not provide a built-in registry or a curated catalog. You bring your own: point Lovable at any registry endpoint you choose, whether that is your company's internal registry or a public one.

## Prerequisites

To use MCP registries, you need:

* **Chat connectors enabled for your workspace.** If a workspace admin has turned off [**Remote MCP connectors**](https://docs.lovable.dev/features/privacy-and-security-settings.md#remote-mcp-connectors) in [Privacy & security](https://lovable.dev/settings/privacy-security), the **MCP registries** section does not appear. See [Chat connector controls](https://docs.lovable.dev/integrations/admin-controls.md#chat-connector-controls) for all related settings.
* **A workspace owner or admin role** to add, edit, or remove registries.
* **An editor role or above** to connect a server from a registry. Any workspace member can browse a registry's servers, but viewers and collaborators can't connect.
* **The registry's URL** and, for authenticated registries, its bearer token.

## Add a registry

To add a registry:

**1. Open the MCP registries section**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and scroll to the bottom of the page. The **MCP registries** section sits below the connector grid. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for every place you can open this view.

The same section also appears in workspace settings, under [**Workspace settings → Customization → Connector settings**](https://lovable.dev/settings/connectors). Selecting **Add registry**, **Edit**, or **Browse** there opens the connectors view to finish the task.

**2. Add the registry**

Select **Add registry**, or **Add custom** in the catalog header followed by **MCP registry**, and fill in the form:

* **Registry URL**: the registry endpoint, for example `https://api.example.com/v0/servers`.
* **Display name**: an optional name for the registry's card.
* **Bearer token**: only needed for registries that require authentication. A bearer token is the only way to authenticate a registry itself. The servers you connect from it support more options, described below.

**3. Connect**

Select **Connect**. Lovable opens the registry's browse page so you can connect servers right away. The registry also appears as a card in the **MCP registries** section, showing its name, URL, and how many servers from it are connected.

Each registry URL can only be added once per workspace.

## Browse and connect servers

When a registry is added, browse its servers from the registry card and connect the ones you need:

**1. Browse the registry**

Lovable opens the browse page right after you add a registry. To come back later, select **Browse + add server** on the registry's card. Search or scroll the list. Each server shows its name and description.

**2. Connect a server**

Select **Connect** next to a server. Lovable opens the [MCP server dialog](https://docs.lovable.dev/integrations/custom-mcp.md) with the server's URL filled in.

**3. Choose authentication**

* **OAuth (default)**: Lovable uses OAuth by default. After you click **Add & authorize**, you're prompted to authorize.
* **Bearer token or API key**: For servers that don't support OAuth, authenticate with a bearer token or API key.
* **No authentication**: Connect without credentials if the server doesn't require authentication.

**4. Add the server**

Click **Add & authorize** (OAuth) or **Add server**. The server now appears in your list of chat connectors and can provide contextual data for builds.

Each server you connect becomes a separate chat connector, marked with a **Registry** badge, and its details page names the registry it came from under **Parent registry**.

Connections are personal, like other chat connectors. Adding a registry shares the directory with your workspace, but each member connects a server with their own account and credentials. See [chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) for how personal connections work.

Some servers in a registry run locally on your computer and require the [Lovable Desktop app](https://docs.lovable.dev/integrations/desktop-app.md). In the browser, these servers show under **Available in the desktop app** with a **Use the desktop app** button. In the desktop app, they show under **Local servers** and can be connected directly. Servers that Lovable can't connect to are hidden behind a **Show unsupported servers** checkbox.

> [!NOTE]
>
> Adding a registry and browsing it is free. Using a connected server's tools in the project chat consumes credits the same way as any other chat connector.

## Edit or remove a registry

To change a registry's URL, display name, or bearer token, select the pencil icon on its card.

To remove a registry, select the trash icon on its card. Removing a registry does not remove the servers members already connected. Those connections keep working as standalone connections, and re-adding the registry links them to it again.

## FAQ

> **Does Lovable provide a default registry?**
>
> No. A new workspace has no registries. A workspace owner or admin adds the registries your team should use.

> **Do my teammates get the servers I connect?**
>
> No. The registry is shared with the workspace, but connections are personal. Each member connects a server with their own account and credentials.

> **What happens to connected servers when a registry is removed?**
>
> They keep working as standalone connections. Removing a registry only removes the directory listing, not the connections made from it.

> **How is this different from adding a custom MCP server?**
>
> Connecting a server from a registry opens the same [MCP server dialog](https://docs.lovable.dev/integrations/custom-mcp.md) you use to add a custom MCP server, with the URL already filled in. The difference is where the server comes from: a registry gives your workspace one shared, admin-managed list of servers to pick from, instead of each member finding and entering server URLs themselves.
>
> One option is missing from the registry path: servers connected from a registry always use a direct connection, and the **Connection** dropdown for [Lovable static IPs](https://docs.lovable.dev/integrations/custom-mcp.md#lovable-static-ips) doesn't appear. To reach a server behind an IP-allowlisting firewall, add it by URL instead.


## Related topics

- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
