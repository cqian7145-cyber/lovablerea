# Lovable connectors: Connect tools, services, and APIs
<!-- source: https://docs.lovable.dev/integrations/introduction.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable connectors: Connect tools, services, and APIs

> Connect Lovable to external tools, services, and APIs. Choose between app + chat connectors, chat connectors, and app user connectors, or integrate any API.

**Connectors** link Lovable to the external tools and services you already use, such as Slack, Notion, HubSpot, and Google Workspace. Browse the catalog, connect a tool once, and Lovable handles authentication, credentials, and requests for you.

All connectors live in one catalog. What changes is **how you connect it**. When you open a connector, **Connect** creates the first connection type it supports, in this order: app + chat connector, chat connector, app user connector. **More options** lists the other types the connector supports:

| **Connection type** | **What it does** | **Learn more** |
| :- | :- | :- |
| **App + chat connector** | Adds capabilities and external services that your published app can call, like sending messages or reading data. Runs on one shared account, and Lovable can use it in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md) too. | [App + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md) |
| **Chat connector (MCP server)** | Personal to you. Lovable reads your own tool accounts as context in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). Not part of the published app. | [Chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) |
| **App user connector** | Each end user of your published app connects their own account, and the app acts with their permissions. | [App user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md) |

Not every connector supports every type. Each connector's page in the catalog shows the types it supports, and **More options** lists the types you can add besides the one **Connect** creates.

For anything the catalog does not cover, you have three options: workspace admins can [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) that adds any REST API to the catalog for the whole workspace, you can [integrate any API](https://docs.lovable.dev/integrations/any-api.md) directly into your app, or you can connect your own [custom MCP server](https://docs.lovable.dev/integrations/custom-mcp.md) for chat context.

> [!NOTE]
>
> **What is an API?**\
> API (Application Programming Interface) is a structured way for services or applications to communicate and share data with each other. It defines what you can ask for, what you’ll get back, and how to make the request.

## Where to find connectors

All connectors live in one catalog, at [lovable.dev/dashboard?connectors](https://lovable.dev/dashboard?connectors). You can open it from:

* The Lovable dashboard sidebar navigation, under **Connectors**
* The **+** menu next to the prompt input on the dashboard when starting a new project
* The sidebar inside a project, under **Connectors**
* The **+** (**Chat actions**) menu in a [chat](https://docs.lovable.dev/features/chats.md), under **Add context → Connectors**

The top right of the catalog has two controls. A sort menu orders the connectors by **Popular**, **A to Z**, or **Z to A**. The **Add custom** button adds something the catalog does not already list: choose **Custom connector** to [create a connector for an API](https://docs.lovable.dev/integrations/create-connector.md), **MCP server** to [connect your own MCP server](https://docs.lovable.dev/integrations/custom-mcp.md), or **MCP registry** to [add a directory of MCP servers](https://docs.lovable.dev/integrations/mcp-registries.md). The **Custom connector** and **MCP registry** options are for workspace admins and owners. Both controls appear on the catalog home, not while you are searching or viewing a single connector.

The search field at the top of the catalog matches connector and model names as you type. If you misspell a name, the catalog shows results for the closest match, with **Showing results for** and the corrected name above them.

> [!TIP]
>
> For quick access from anywhere, use the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) (Cmd+K on Mac, Ctrl+K on Windows/Linux) and search for connectors.

Inside a project, [**More → Connectors**](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) gives you one place to see everything connected to that project. It shows the connections your app uses under **Project connections**, and the MCP servers your project can access under **MCP connectors**. To browse the full catalog from there, select **All connectors**. You can reach **More → Connectors** from:

* The **+** menu next to the prompt input in the project chat, under **Add context → Project connectors**
* The project toolbar, under [**More**](https://docs.lovable.dev/features/projects/editor.md#the-more-menu)

## Which connection type do I need?

Use this table to pick the right connection type for what you're building:

| Use | If you want to |
| - | - |
| [App + chat connector](https://docs.lovable.dev/integrations/app-connectors.md) | Give your published app a capability every visitor shares, like posting to your team's Slack or reading a Google Sheet. Lovable can use the connection in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md) too. |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable read your own Notion docs, Linear tickets, or Miro boards in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md), without sharing your account with anyone or your app. |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app sign in with their own account, like Gmail or Salesforce, and see only their own data. |
| [Custom connector](https://docs.lovable.dev/integrations/create-connector.md) | Turn a REST API the catalog doesn't cover, like an internal service, into an app + chat connector. An admin defines it once, and the whole workspace can connect to it. |
| [Custom MCP server](https://docs.lovable.dev/integrations/custom-mcp.md) | Bring a tool the catalog doesn't cover into the project chat and [Chats](https://docs.lovable.dev/features/chats.md), like an internal CRM or a private API with an MCP server. |
| [Any API](https://docs.lovable.dev/integrations/any-api.md) | Add functionality to your published app from any external service, even one with no connector at all. Lovable writes the integration code for you. |

An app + chat connection already works in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md), so you don't need a separate chat connection for a tool your app is connected to. Choose a chat connection when the tool only offers one, or when you want Lovable to read your own account without sharing a credential with your workspace or your app.

You can also combine types. For example, connect Notion as a chat connector to build from your own specs, and as an app + chat connector so the finished app reads and writes your team's Notion pages while people use it.

## Hosting, backend, and AI

Hosting, a backend, and AI are built into Lovable, so there is no external account to connect. Lovable [hosts your app](https://docs.lovable.dev/features/hosting.md) and includes a [built-in backend](https://docs.lovable.dev/features/cloud) with database, authentication, storage, and edge functions. For AI features, [Lovable AI](https://docs.lovable.dev/features/ai) gives your app AI capabilities without API keys or external accounts. You manage both from the same Connectors catalog as everything else.

If you prefer to run your backend on [Supabase](https://docs.lovable.dev/integrations/supabase.md), connect your own Supabase project instead.

## Managing connectors in your workspace

Workspace admins and owners control who can create connections for each connector, which is also how connectors are made available or disabled, and the defaults differ by plan. Who can use an individual connection is chosen by whoever creates it. See [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md) for the full picture, and [Integration security](https://docs.lovable.dev/integrations/security.md) for how credentials are stored and how the connector gateway works.

Once a connector is available, any builder with permission can [create a connection and link it to a project](https://docs.lovable.dev/integrations/app-connectors.md#create-a-connection).

## FAQ

> **What integrations does Lovable support?**
>
> Lovable has a built-in catalog of connectors covering payments, messaging, data, productivity, CRM, and more. Beyond the catalog, nothing is off limits:
>
> * [Custom connectors](https://docs.lovable.dev/integrations/create-connector.md) turn any REST API into an app + chat connector for your workspace.
> * [Custom MCP servers](https://docs.lovable.dev/integrations/custom-mcp.md) bring any MCP-compatible tool into the project chat and [Chats](https://docs.lovable.dev/features/chats.md) as context.
> * [Any API](https://docs.lovable.dev/integrations/any-api.md) can be integrated into your published app. Describe the API in a prompt and Lovable writes the integration.
> * The [built-in backend](https://docs.lovable.dev/features/cloud) and [Lovable AI](https://docs.lovable.dev/features/ai) cover backend and AI needs without any external service.

> **What is the difference between the connection types?**
>
> The difference is whose account is used and where the connection works:
>
> * An **app + chat connection** runs on one shared account. It works in the project chat, in [Chats](https://docs.lovable.dev/features/chats.md), and in your published app, and everyone using the app shares it.
> * A **chat connection (MCP server)** uses your own account and is personal to you. Lovable reads it as context while building, and it is not part of the published app.
> * An **app user connection** belongs to each user of your published app. Every user signs in with their own account, and the app acts with their permissions.
>
> The [decision table](#which-connection-type-do-i-need) above shows when to pick each one.

> **Can Lovable integrate with any API?**
>
> Almost any. The service must be reachable from the internet, and its API must offer the operation you need. The recommended path is a connector: use one from the catalog or [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md), so requests go through the connector gateway and Lovable manages the credentials. Lovable can also connect a service directly from your app's code when you ask it to. See [Integrate any API](https://docs.lovable.dev/integrations/any-api.md).


## Related topics

- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
