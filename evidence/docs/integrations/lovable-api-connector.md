# Connect your app to the Lovable API
<!-- source: https://docs.lovable.dev/integrations/lovable-api-connector.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to the Lovable API

> Connect your app to the Lovable API to list and manage projects, publish, embed project previews, and read analytics, members, and security insights for a connected Lovable workspace.

The [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md) gives you programmatic access to Lovable workspaces and projects. The Lovable API connector lets the apps you build with Lovable call that API from server code, so your app can manage and report on a connected Lovable account. It's designed for teams that run their work on Lovable and want their own dashboards, admin tools, and automations around it.

Lovable API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

The connector is one of three ways to use Lovable programmatically, each from a different place:

| Feature | Where it runs | What it does |
| - | - | - |
| **Lovable API connector** (this page) | An app you build with Lovable, with the API key stored by Lovable | Your app reads and manages a connected Lovable workspace |
| [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md) | Your own scripts and services, with an API key you store and manage | Anything outside Lovable calls the REST API directly |
| [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) | An AI client such as ChatGPT, Claude, or Cursor | External AI tools create, edit, and manage your Lovable projects |

With the Lovable API, your app can:

* List workspace details and projects, and read project details
* Update project settings and delete projects
* Publish or unpublish projects, track deployment status, and update publish settings
* Embed a project's built preview in your app with short-lived embed URLs
* Read project traffic analytics and workspace-level analytics
* Read code security scans and their findings
* Read management data such as members, groups, and security insights

The connector covers the Lovable API only. It cannot send chat or build messages to the Lovable agent (see [Limitations](#limitations)). It's a good fit for internal dashboards, client portals, and ops tooling built on top of your Lovable workspace.

## Common use cases and example apps

These examples show what you can build with the Lovable API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Workspace project directory | *Use the Lovable API and build a page that lists the projects in our Lovable workspace with their publish status.* | **See every project in one place.** The app reads projects from the connected workspace and shows their status and recent activity. |
| Publish dashboard | *Use the Lovable API and build an admin page where we can publish projects and track deployment status.* | **Run releases from your own tool.** The app triggers publishes and polls deployment status until each one completes. |
| Security posture report | *Use the Lovable API and build a report of security scan results across our projects.* | **Keep an eye on workspace security.** The app lists code security scans and summarizes findings per project. |
| Team roster | *Use the Lovable API and build an onboarding tracker that shows workspace members and their roles.* | **Mirror your Lovable team in your app.** The app reads members and roles from the connected workspace. |
| Traffic overview | *Use the Lovable API and build a page that shows traffic trends for our published projects.* | **Report on app traffic without leaving your app.** The app reads project analytics and renders trend charts. |

## How to connect the Lovable API

> [!NOTE]
>
> The Lovable API connector is only available on **Business** and **Enterprise** plans.

Who can create Lovable API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Lovable API connections using different API keys, which is useful for managing several Lovable workspaces or for separating read-only reporting from full management access.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it.

### Prerequisites

Before connecting the Lovable API, make sure you have:

* A Lovable workspace on a **Business** or **Enterprise** plan that you want your app to manage. It can be the workspace you build in or a different one.
* An **admin** or **owner** role in the workspace you want your app to manage, so you can create the API key during the connector setup. You don't need a key in advance. If you're not an admin or owner, ask one to [create a key](https://docs.lovable.dev/features/api-keys.md) in that workspace's **Workspace settings → API keys & OAuth → Workspace access tokens**, then paste it in during setup. That's also the way to manage a different workspace or to control the key's scopes and expiration. Two reads, a project's PII labels and the per-project security inventory, require an **Enterprise** workspace.
* Permission to **create connections** in the workspace where you build your app (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All requests made through this connector act on the connected workspace and are attributed to the person who created the API key. Requests are limited to what that person can access, with the access granted to the key. Plan-gated endpoints and any credits spent through the key follow the connected workspace's Lovable plan.

### Add the connection in Lovable

Add the connection in the workspace where you build your app. The connection needs a Lovable API key, which is scoped to one workspace: the form can create one for the workspace you build in, or you can paste an existing key for the workspace you want your app to manage.

**1. Open Lovable API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Lovable API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Acme workspace`. This name is only used inside Lovable to identify the connection.
2. **API key**: under **Create API key**, enter a **Key name** (for example `Automation`) and a **Monthly credit cap**, then click **Create key**.

   Lovable creates a workspace API key with **Read & write** access to **Projects** and **Read** access to **Workspace**, capped per calendar month, and fills in the **API key** field. You can raise the cap later in [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys).

To use an existing key instead, for example one created for a different workspace or with its own scopes and expiration, paste it into **API key**. It must start with `lov_`. See [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md) for how to create one. If the key has an [IP allowlist](https://docs.lovable.dev/features/api-keys.md#restrict-a-key-to-an-ip-allowlist), the list must include Lovable's [connector gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting), because the connector's requests reach the Lovable API from the gateway, not from your address.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Lovable API before saving the connection.

> [!WARNING]
>
> Your API key functions like a password for the connected workspace. Keep it secure and never share it publicly.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to the Lovable API (based on configured connection-level access). Your Lovable apps can then read and manage the connected workspace from server code.

## Limitations

The Lovable API connector is management-only. It cannot:

* Send chat or build messages to the Lovable agent, on any connection. To build or edit apps, use the [Lovable editor](https://lovable.dev/) or the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) instead.
* Create or remix projects. Create them in the Lovable editor or through the Lovable MCP server.
* Work with a project's code files, git history, or database, or manage its instructions and skills.
* Report on credit balance or usage. The [Lovable API reference](https://docs.lovable.dev/api-reference/introduction.md) does not include credit endpoints.
* Support per-end-user Lovable login. Each connection represents a single Lovable account shared across all projects linked to it.

If an API key expires or is deleted, create a new key in Lovable and update the connection before API calls can succeed again.

## Manage your Lovable API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Lovable API**, then open the connection.

* **Unlink projects** to remove Lovable API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Lovable API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Cloudflare API](https://docs.lovable.dev/integrations/cloudflare-api.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to Perplexity](https://docs.lovable.dev/integrations/perplexity.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
- [Connect your app to Chargebee](https://docs.lovable.dev/integrations/chargebee.md)
