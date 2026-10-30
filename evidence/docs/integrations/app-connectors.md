# App + chat connectors: Add capabilities to your published app and your chat
<!-- source: https://docs.lovable.dev/integrations/app-connectors.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# App + chat connectors: Add capabilities to your published app and your chat

> Connect a tool like Slack, HubSpot, or Google Sheets once and use it everywhere: Lovable works with it while you build, and your published app uses it to send messages, read data, and take actions for your users.

**App + chat connectors** are the easiest way to extend what your Lovable app can do. You connect a tool such as Slack, HubSpot, or Google Sheets once, and that single connection works in three places:

* **In [Chats](https://docs.lovable.dev/features/chats.md).** Lovable uses the connection when you work with your tools outside a project, with the same approval cards as in the project chat.
* **In the project chat, while you build.** Lovable can read from and act on the connected tool as it helps you. For example, it can look at the deal stages in your real HubSpot account while designing a sales dashboard, so the result matches your actual data instead of made-up examples.
* **In your published app, while people use it.** The app you share with others can use the tool on its own. For example, when a visitor submits a form, your app can post a message to your team's Slack, add a row to a Google Sheet, or create a contact in HubSpot.

Browse every available tool in [**Connectors**](https://lovable.dev/dashboard?connectors), which you can also open from several places in the product, listed in [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors). For how app + chat connections compare to the other connection types, see the [connectors overview](https://docs.lovable.dev/integrations/introduction).

If the tool you need is not in the catalog, workspace admins can [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) for any REST API. It joins your workspace's catalog, and connections to it work exactly as described on this page.

## How app + chat connections work

An app + chat connection runs on **one shared account**. You (or a teammate) sign in to the tool or paste an API key once, and every request uses that account, no matter who is building or which visitor is using the published app.

> [!TIP]
>
> If each user of your app should instead sign in with their own account and see only their own data, use an [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).

Connections belong to your **workspace**, not to a single project. You create a connection once and then link it to any project that needs it. Linking is what makes a connection usable in a project, and Lovable writes the integration code for you once it's linked.

Two settings control who can do what:

* **Who can create connections.** On Free and Pro plans, any workspace member with the editor role or higher can create connections. On Business and Enterprise plans, workspace admins and owners choose this per connector: **No one**, **Admins**, or **Editors & admins**. The setting starts at **Admins**. Setting a connector to **No one** means nobody can create new connections, which effectively disables it. In some Enterprise workspaces, app + chat and app user connectors start at **No one**. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) for the full picture.
* **Who can use a connection.** Whoever creates a connection decides who can use it. A connection can stay private, be shared with specific people, or be shared with the whole workspace, and everyone with access can link it to projects and build with it. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for how access affects projects and collaborators.

If you can't create or use a connection you expect to, one of these settings is usually the reason. See [Why can't I create or link a connection?](#why-cant-i-create-or-link-a-connection) in the FAQ for how to check.

## Create a connection

Creating a connection takes a few minutes and only needs to happen once per tool:

**1. Select the connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select the tool you want to connect. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for every place you can open the catalog.

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**. Lovable fills in a name for the connection under **Details**, which you can change. A collapsed section shows a summary of what you chose.

**3. Authenticate**

Depending on the tool, sign in with OAuth or paste credentials such as an API key. When a connector supports more than one authentication method, pick one under **Configure connection**. Some tools also require setup on the provider's side first, such as creating an API key or registering an app in their dashboard. Check the connector's documentation for exact instructions before you start.

Some connectors offer a **Managed by Lovable** option that uses credentials Lovable owns and manages, so you don't need to provide your own. A workspace can have one managed connection per connector. Managed options that sign you in to your own provider account are the exception: each connection is a separate provider account, and a workspace can have several.

Some managed options bill usage through Lovable credits and show a **Uses credits** badge. Before you connect one, the form shows a usage note with links to the connector's pricing and provider rules. Connector usage appears under **Run credits** in **Usage details**. See [Connector costs](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs) and the connector's page for rates.

**4. Choose who can use the connection**

Under **Sharing**, a new connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. Connections that use the **Managed by Lovable** option are shared with the entire workspace by default. Everyone with access can link the connection to projects and build with it. You can change this later from the connection's settings. To stop sharing a connection, click **Make private**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for how access affects projects and collaborators.

**5. Create the connection**

Click **Connect**, which stays visible at the bottom of the form. To start using it, link it to a project by asking Lovable in that project's chat, as described in [Link a connection to a project](#link-a-connection-to-a-project).

## Link a connection to a project

A connection does nothing on its own. Linking it to a project securely shares the credentials with that project, so Lovable and your published app can call the tool.

You link a connection by asking Lovable in the project chat. Describe what you want the app to do, for example:

```text wrap theme={null}
Connect Slack to this project and post a message to #new-signups whenever someone creates an account.
```

Lovable shows a card in the project chat where you pick an existing connection you have access to or create a new one, and then builds the feature. A connection you create from the project chat is private to you unless it uses the **Managed by Lovable** option. You can share it later from the connection's settings.

For connectors to a personal account, such as Gmail, Google Calendar, or Linear, the card first shows only the connections you created. Select **View shared connections** to pick a connection that a teammate created.

Linking follows the connection's access rules. Only people with access to the connection can link it to a project, and a connection can be linked to any number of projects in the workspace. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for the full rules, including how connection access affects project sharing and project owners.

## Approving connector actions in the project chat

The same approval cards appear in [Chats](https://docs.lovable.dev/features/chats.md#use-connected-tools).

When a connection is linked, Lovable can start using it, and you stay in control of what it does. When Lovable wants to use a connection to make a change, such as sending a message or updating a record, it pauses and asks for your approval first. The approval card describes what Lovable wants to do and shows the request details. Read-only requests run without prompts.

You can respond in three ways:

* **Allow once**: approve this single action.
* **Always allow**: let future actions for this connection, including write actions, run without asking first.
* **Skip**: move on without running the action.

The **Always allow** preference applies to you and that specific connection. You can change it later from the connection's settings, under **Agent approval for this connection**, or review every saved approval in one place under [**Account settings → Preferences → Agent permissions**](https://docs.lovable.dev/introduction/lovable-account-settings#agent-permissions).

## Manage a connection

Everything about an existing connection is managed from the connection itself. Open [**Connectors**](https://lovable.dev/dashboard?connectors), select the connector, and open the connection. You can also get there from inside a project. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for every entry point.

From the connection you can see and unlink its linked projects, change who can use it under **Sharing**, adjust your [agent approval preference](#approving-connector-actions-in-the-project-chat), or delete it.

Who can manage a connection follows its access settings. Whoever creates a connection controls who can use it and can adjust that from the connection's settings at any time, as described in [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients). Workspace admins and owners can delete any connection.

When you open a connector in **Connectors**, its connections appear in one **Connections** list. The **Visibility** column shows whether each connection is **Private** or **Shared**. Filter the list with **Created by me**, **Shared with me**, or **All**, and sort it by name, visibility, or number of projects. In **All**, private connections are listed first.

Inside a project, open [**More → Connectors**](https://docs.lovable.dev/features/projects/editor.md#the-more-menu). When a collaborator cannot use a linked connection, Lovable lists them under **Missing access to this connection**. If you manage the connection, click **Grant access** next to their name. For a private connection, Lovable asks you to confirm with **Share connection**. The connection becomes shared, and the collaborator can then use it in other projects too. Lovable asks collaborators who do not manage the connection to contact its owner.

### Unlink projects from a connection

Unlinking removes specific projects from a connection without deleting the connection. The connection stays available for other projects. Workspace members with the editor role or higher can unlink projects.

**1. Open the connection**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select the connector, and open the connection you want to manage.

**2. Select projects**

Under **Linked projects**, check the projects you want to unlink.

**3. Confirm**

Click **Unlink projects** and confirm.

Unlinked projects lose access to the tool through this connection. If a project needs the tool again, link it to any available connection.

### Delete a connection

Deleting a connection removes it from the workspace entirely. Workspace admins and owners can delete any connection. Other members can delete a connection if they created it, or if they have been explicitly granted access to it.

> [!WARNING]
>
> Deleting a connection is permanent and cannot be undone. It removes the credentials from all linked projects, and any apps using the connection stop working until a new connection is added.

**1. Open the connection**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select the connector, and open the connection you want to remove.

**2. Review linked projects**

Check the **Linked projects** section to see which projects currently use the connection.

**3. Delete**

Under **Delete this connection**, click **Delete** and confirm.

## Gateway-based connectors

Most app + chat connectors route through a **secure gateway** between your Lovable app and the third-party service. The gateway handles authentication automatically, keeps credentials out of your project, applies a per-project usage limit, and sends outbound traffic from a stable set of IP ranges. See [Integration security](https://docs.lovable.dev/integrations/security.md#gateway-connectors) for the full details, and [Connector data flow](https://docs.lovable.dev/integrations/security.md#connector-data-flow) for how data moves between your app and the third-party service.

## Managed project secret: `LOVABLE_API_KEY`

App + chat connectors and [Lovable AI](https://docs.lovable.dev/features/ai) rely on a project secret called `LOVABLE_API_KEY` to identify your project to Lovable's services. Lovable creates and manages this secret automatically, so you don't need to do anything with it.

## FAQ

> **Who can see the data an app + chat connection returns?**
>
> Anyone who can use the connection. The connection runs on one shared account, so every linked project works with that account's data, and so does every visitor of a published app that uses it. Whoever creates the connection controls who can use it, as described in [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients). If each user should only see their own data, use an [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) instead.

> **Are my credentials visible in the project code?**
>
> No. For gateway-based connectors, credentials stay in Lovable's connector gateway and do not appear in your project, so they can't leak through your app's code. See [Integration security](https://docs.lovable.dev/integrations/security.md#credentials) for how credentials are stored, rotated, and deleted.

> **Why can't I create or link a connection?**
>
> Check three things, in order:
>
> * **Your role.** Workspace viewers and external project collaborators can't access workspace connectors.
> * **The connector's Who can create connections setting.** On Business and Enterprise plans, the setting starts at **Admins**. An admin or owner may have set it to **No one**, which means nobody can create connections and effectively disables it. Some Enterprise workspaces start at **No one**. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).
> * **Your access to the specific connection.** Only people the connection is shared with can link it to a project. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).
>
> When creation isn't possible, **Connect** is disabled and the connector page states the exact reason.

> **What happens to connections when I remix or share a project?**
>
> Sharing a project changes nothing about its connections: the connection stays owned by the workspace, and access keeps following the connection's access settings. Remixing is different: connections are not carried over, so the remixed project starts with none. After the remix, Lovable suggests reconnecting each one in the new project's chat, and linking an existing workspace connection there takes one click.


## Related topics

- [Discuss your app in Chat mode](https://docs.lovable.dev/features/chat-mode.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
