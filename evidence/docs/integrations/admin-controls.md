# Manage connectors in your workspace
<!-- source: https://docs.lovable.dev/integrations/admin-controls.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage connectors in your workspace

> Workspace admins control who can create connections and clients for each connector, which is also how connectors are made available or disabled. Learn the defaults per plan and every governance setting.

Workspace admins and owners govern connectors in two places:

* [**Connectors → Admin settings**](https://lovable.dev/dashboard?connectors) controls each connector type: who can create connections and clients for app + chat and app user connectors, and which chat connectors (MCP servers) are enabled. The admin settings area is available on **Business and Enterprise** plans.
* [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**) lists the workspace-wide switches for MCP-based features, such as chat connectors (MCP servers) and local desktop MCP servers.

One thing does not live in **Admin settings**: who can use an individual connection. Whoever creates a connection chooses who can use it, on any plan, as described in [Who can use connections and clients](#who-can-use-connections-and-clients).

## Default connector availability by plan

Each connection type starts with a default availability that depends on your plan. For app + chat, app user, and custom connectors, availability and [Who can create connections and clients](#who-can-create-connections-and-clients) are the same setting.

| Connection type | Free, Pro, and Business | Enterprise |
| :- | :- | :- |
| App + chat and app user connectors | Available by default | Available by default. Some Enterprise workspaces start with them disabled, shown as **No one** under [Who can create connections and clients](#who-can-create-connections-and-clients) |
| [Custom connectors created in your workspace](https://docs.lovable.dev/integrations/create-connector.md) | Available by default | Available by default |
| Chat connectors (MCP servers), including custom MCP servers | Enabled by default | Enabled by default |
| Local desktop MCP servers | Enabled by default. Admins and owners can disable and re-enable them | Disabled by default until an admin enables them |

## App connector controls

Two connection types run through your app, and admins and owners govern them the same way:

* With [app + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md), a workspace member creates a **connection**: they sign in to the tool once (or paste an API key), and every project linked to the connection shares that account.
* With [app user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md), a workspace member creates a **client**: the provider app registration that lets each user of the published app sign in with their own account. The client holds no user data itself; it's what makes the individual sign-ins possible.

Each has its own tab in Admin settings: **Connectors → Admin settings → App + chat connectors** and **Connectors → Admin settings → App user connectors**. The controls below work identically in both tabs.

[Custom connectors your workspace creates](https://docs.lovable.dev/integrations/create-connector.md) appear in a **Custom connectors** section at the bottom of the **App + chat connectors** tab. Alongside the same who-can-create control, admins and owners can edit or delete the connector definition itself, described in [Managing connectors](https://docs.lovable.dev/integrations/create-connector.md#managing-connectors).

### Who can create connections and clients

On **Free and Pro** plans, any workspace member with the editor role or higher can create connections and clients.

On **Business and Enterprise** plans, workspace admins and owners choose one of three options for each connector, and the setting doubles as the availability switch:

* **No one**: nobody in the workspace can create new connections or clients, which effectively disables the connector.
* **Admins**: only workspace admins and owners can create new connections or clients. (Default on Business and Enterprise plans)
* **Editors & admins**: any workspace member with the editor role or higher can create new connections or clients.

In some Enterprise workspaces, app + chat and app user connectors start at **No one** instead of **Admins**. They stay disabled until an admin or owner changes the setting. Open **Connectors → Admin settings** to see which option each connector is on.

> [!NOTE]
>
> Some connectors (Lovable AI, Stripe, Paddle, Shopify, and Supabase) can only be enabled or disabled for the workspace. The **Database, Auth & Storage** row, which covers the **Lovable Database**, **Lovable Auth**, and **Lovable Storage** connectors together, shows whether the built-in backend is available but cannot be changed here. Contact your Lovable account team to change it. Individual projects can pause or remove it from **More → Database → Manage → Settings**, described in [Pause a database you're not using](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using).

### Who can use connections and clients

Whoever creates the connection or client sets who can use it, not necessarily an admin. When creating one, you choose who has access to it under **Sharing**:

* **Private** (default): only the person creating it can use it and its associated data. A **Private** label marks these connections and clients. Connections that use a connector's **Managed by Lovable** option are the exception and are shared with the entire workspace by default.
* **Share with others**: add workspace members by email. Only you and the people you add can use it and its associated data.
* **Invite entire workspace**: everyone in your Lovable workspace can use it. Click **Restrict to specific people** to return to a list of named people.

The creator can make a shared connection or client private again at any time with **Make private** under **Sharing**.

> [!NOTE]
>
> In [Chats](https://docs.lovable.dev/features/chats.md), Lovable applies one extra rule on top of sharing: it does not use another member's connection to a personal account, such as their Gmail, Google Drive, Google Calendar, Outlook, GitHub, or Linear, even when that member shared it. The connection list marks these **Personal connection, restricted in chats**. Shared connections to workspace tools, such as Slack, Notion, HubSpot, or Salesforce, and **Managed by Lovable** connections work in every member's chats. Projects are not affected by this rule.

Access affects projects in the same way for connections and clients:

* **Only people with access** can link the connection or client to a project.
* Projects that use it can **only be shared with workspace members that have access** to it.
  > [!NOTE]
  >
  > You cannot invite people outside your workspace to connections or clients, which means any external collaborators will lose access to the project using them.
* If someone without access tries to open a project that uses the connection or client, they will be blocked from accessing it.
* You cannot link a connection or client to a project if doing so would remove the project owner's access.

One extra note for app user connectors: end users of the published app are not workspace members, and none of these settings apply to them. They connect their own accounts inside the app itself, as described on the [app user connectors page](https://docs.lovable.dev/integrations/app-user-connectors.md).

> [!NOTE]
>
> Access works alongside the [Who can create connections and clients](#who-can-create-connections-and-clients) settings described above. For example, when a connector is set to **Admins**, non-admins can't create new connections or clients, but anyone an admin has explicitly granted access to an existing one keeps that access.

> [!WARNING]
>
> Connection- and client-level access is **not enforced after publishing**. After a project is published, the live app is accessible regardless of these access settings.

## Chat connector controls

[Chat connectors (MCP servers)](https://docs.lovable.dev/integrations/chat-connectors.md) are personal connections, so there is no access list to manage. As with the other types, admins decide which chat connectors are available, in two places. These settings apply in [Chats](https://docs.lovable.dev/features/chats.md) as in projects.

* **Connectors → Admin settings → Chat connectors** enables or disables individual chat connectors for the workspace. The table also includes a **Custom MCP** row ("Allow members to connect their own MCP servers") that governs all [custom MCP servers](https://docs.lovable.dev/integrations/custom-mcp.md) as a group. Individual custom MCP servers that members have connected do not appear in the table.
* [**Remote MCP connectors**](https://docs.lovable.dev/features/privacy-and-security-settings.md#remote-mcp-connectors) in [Privacy & security](https://lovable.dev/settings/privacy-security) enables or disables all chat connectors for the entire workspace. If the Connectors page says chat connectors are disabled for your workspace, this setting is the reason.
* [**Local desktop MCP servers**](https://docs.lovable.dev/features/privacy-and-security-settings.md#local-desktop-mcp-servers) in [Privacy & security](https://lovable.dev/settings/privacy-security) allows members to use MCP servers running on their own machine through [Lovable Desktop](https://docs.lovable.dev/integrations/desktop-app.md). It requires **Remote MCP connectors** to stay enabled, and it is disabled by default on Enterprise workspaces.

Workspace owners and admins can also add [MCP registries](https://docs.lovable.dev/integrations/mcp-registries.md), browsable directories of MCP servers that members connect from without entering URLs. Registries are managed in the **MCP registries** section, which appears both at the bottom of the [**Connectors**](https://lovable.dev/dashboard?connectors) page and in workspace settings under [**Workspace settings → Customization → Connector settings**](https://lovable.dev/settings/connectors). You can add one with **Add registry** in that section, or from **Add custom** in the catalog header followed by **MCP registry**. Registries are only available while **Remote MCP connectors** is enabled.

## FAQ

> **Why can't my team find a connector that should exist?**
>
> Its [Who can create connections and clients](#who-can-create-connections-and-clients) setting is the likely reason. On Business and Enterprise plans the setting starts at **Admins**, and an admin or owner may have set it to **No one**, which disables the connector. Some Enterprise workspaces start at **No one** instead. An admin or owner changes it for each connector the workspace needs in **Connectors → Admin settings → App + chat connectors**. When you cannot create a connection, the disabled **Add connection** button shows the reason.

> **Why do I see that chat connectors are disabled?**
>
> A workspace admin disabled [**Remote MCP connectors**](https://docs.lovable.dev/features/privacy-and-security-settings.md#remote-mcp-connectors) in [Privacy & security](https://lovable.dev/settings/privacy-security). That single setting controls all chat connectors for the workspace, including custom MCP servers, and the Connectors page reports it as chat connectors being disabled. Ask an admin to enable it again if your workspace should be using chat connectors.

> **What plan do I need to manage these settings?**
>
> The **Connectors → Admin settings** area and the **Who can create connections and clients** options are available on Business and Enterprise plans. Choosing who can use a connection you create works on all plans.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
