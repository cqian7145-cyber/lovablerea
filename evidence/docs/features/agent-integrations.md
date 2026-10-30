# Publish your app as an MCP server
<!-- source: https://docs.lovable.dev/features/agent-integrations.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish your app as an MCP server

> Turn a published Lovable app into an MCP server for ChatGPT, Claude, and other AI assistants. Configure tools, sign-in, permissions, and access.

Agent integrations make a published Lovable app available to AI assistants. Users connect your app in ChatGPT, Claude, or another compatible assistant, then ask the assistant to read information, run workflows, create or update records, or apply your app's logic.

People use your app by clicking buttons, filling out forms, and moving through screens. An AI assistant cannot click: it needs a list of actions it can call instead. That list is what an MCP server provides.

[Model Context Protocol](https://modelcontextprotocol.io/), or MCP, is an open standard that lets AI assistants discover and call an app's actions, called tools. When a user asks their assistant for something your app handles, the assistant picks the matching tool, and your app does the work.

Lovable creates and hosts the MCP server for you, with proposed tools based on your app's functionality, such as looking up an order, generating a quote, or pulling information from a knowledge base. For your users, connecting your app works like adding a plugin. The assistant gets access only to the tools you publish, not to your Lovable project.

> [!NOTE]
>
> Agent integrations are available on all plans for publicly published apps. On Business and Enterprise workspaces, apps published to the workspace can also have agent integrations, and their tools always require sign-in. A publicly published app is reachable on the web, but that does not make its tools available without sign-in. Tool access is configured separately, and sign-in is the default.

## How it works

Start setup by asking Lovable in chat to add agent integrations or by selecting **Enable agent integrations** under **More → AI → Agent integrations**. You can set up the integration before publishing the app.

Lovable then:

1. Generates an MCP server for the app.
2. Proposes a set of tools based on what the app does.
3. Asks who should be able to call the tools: signed-in users or anyone.
4. Sets up authentication to match your answer.
5. Adds browser tools, so that an AI agent built into the browser can use your app's pages. See [Let browser agents use your app](#let-browser-agents-use-your-app).

The proposed tools are a starting point: you can ask Lovable to add, remove, rename, or change them at any time.

Before anything goes live, you review the tools and access setup, then publish your app. Lovable gives you an MCP link to share with your users. They add the link to their AI assistant as a custom connector, sign in if your app requires it, and start asking the assistant to use your app.

Your integration runs on your live published app, not a copy. Enabling it adds tool code and connection endpoints to your project, and nothing changes for the people using your app. Lovable hosts the MCP server and keeps it compatible as the standard evolves. You control which actions are exposed, who can call them, and when changes are published.

When you change the app or its tools, publish again. Users need to refresh their connector when you add, remove, or rename tools. Step-by-step instructions are in [Set up your agent integration](#set-up-your-agent-integration).

## How this differs from Lovable's other MCP features

Lovable uses MCP and WebMCP in four different ways, each connecting a different system for a different purpose. Agent integrations let AI assistants use the published app you built. They do not let an assistant edit the Lovable project itself. That is the Lovable MCP server, a separate feature.

| Feature | Direction | What it does |
| - | - | - |
| **Agent integrations** (this page) | AI assistants use your app | Your users' assistants call the actions you expose in your published app |
| [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) | AI tools build in Lovable | External AI tools create, edit, and manage your Lovable projects |
| [Chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) | Lovable uses external tools | The Lovable agent pulls context from services such as Notion or Linear while you build |
| [Browser tools (WebMCP)](#let-browser-agents-use-your-app) | Browser agents use your app's pages | An AI agent built into the browser calls actions on the page a person has open, in that person's own tab |

These uses also combine: a published app with an agent integration becomes available as a chat connector inside its own workspace, so you and your teammates can use the app when you chat with Lovable. See [Use your app in your chats](#use-your-app-in-your-chats).

## Should you add an agent integration?

### Why use it

* **Reach users where they already work.** Your users can work with your app from inside their AI assistant, without opening the app itself.
* **Give your app a new experience without rebuilding it.** The integration is generated from your existing published app, so assistants become another way to use the same features.
* **Control access and monetization.** You review every proposed tool before publishing and decide whether the integration requires sign-in or is available without sign-in. Your app keeps enforcing roles, plans, and its other access rules, so you can make assistant access a benefit of your paid plan.
* **Lovable hosts and maintains the server.** Lovable runs the MCP server and keeps it compatible as the standard evolves. The tools, access rules, and app behavior you publish stay yours to manage.

### Use cases and examples

Agent integrations work best when your app contains data, workflows, knowledge, or repeatable expertise.

Each tool is one action from your app. Take a client portal: Lovable might propose a read-only `list_open_requests` tool, a `create_request` tool, and a `get_request_status` tool.

When a client asks their assistant "do I have any requests waiting on me?", the assistant recognizes that `list_open_requests` matches the question, calls it, and answers with live data from your app.

| App type | Example tools | What a user might ask |
| - | - | - |
| Customer relationship management, or CRM, apps | `find_customer`, `update_deal_stage`, `draft_follow_up` | "Cross-check my stalled deals against last week's notes and draft the follow-ups." |
| Quoting and estimation tools | `generate_quote`, `compare_options` | "Generate a quote for this job from the specs." |
| Client portals | `create_request`, `get_request_status`, `submit_document` | "Submit this document and check what is still waiting on me." |
| Operational consoles with sign-in | `list_pending_approvals`, `approve_item` | "Show submissions that need review and approve the ones that meet the bar." |
| Dashboards | `query_metrics`, `summarize_trends` | "Summarize this week's signups and flag anything unusual." |
| Knowledge bases | `search_articles`, `get_policy` | "What is our refund policy? Pull the exact wording." |

An app can span several of these. It only needs one clear, useful task that works well through an assistant.

### When it may not be a good fit

Not every app that can have an agent integration needs one. Lovable proposes tools, but it does not decide whether an integration is valuable or appropriate for your app, so consider that yourself first. An agent integration may provide limited value when:

* Your app's value is mainly visual or interactive, such as a game or a portfolio site. A game can still have useful tools, such as retrieving statistics or managing a tournament, but turn-by-turn gameplay is usually better suited to the app's own interface.
* The app is a static site with no meaningful action or information for an assistant to use.
* The only possible tools would be slow, expensive, destructive, difficult to reverse, or unsafe to run twice.
* The tools would expose more data or capability than the use case requires.

> [!WARNING]
>
> Once connected, users can call your exposed tools repeatedly from their assistant. Agent integrations do not include a built-in rate limit or spending cap, so expose actions that consume paid resources or change data only when your app already enforces usage, plan, and permission limits for them.

## Prerequisites

Before you add an agent integration, make sure your app meets these requirements.

* **A published app.** Your integration serves the published version of your app, and the MCP link becomes available only after the app is published.

  On Free and Pro workspaces, the app must be published publicly. On Business and Enterprise workspaces, you can also publish the app to your workspace: the app and its tools then stay private to people with access to the app, and sign-in is always required. See [Workspace-published apps](#workspace-published-apps).

* **A supported stack.** Newer apps, which use [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md), host the integration in the app itself. On these apps, tools that are open to anyone and only return information built into the app do not need the built-in backend, a connected Supabase project, a database, or user accounts. Older React + Vite apps need the built-in backend. Lovable cannot add an agent integration to an older app that uses your own Supabase project.

* **Authentication for sign-in.** An integration that requires sign-in needs app authentication through the built-in backend or, on newer apps, a connected Supabase project. Public access always requires your explicit choice, and workspace-published apps always require sign-in. See [Access, sign-in, and permissions](#access-sign-in-and-permissions).

* **OAuth 2.1 for connected Supabase projects.** If your newer app uses your own Supabase project and the integration requires sign-in, Lovable enables the OAuth 2.1 authorization server when you publish the app with a working Supabase connection. If OAuth is still disabled after publishing, reconnect the Supabase project in Lovable and publish again. Lovable also handles OAuth setup for apps on the built-in backend.

## Costs, credits, and usage limits

A tool call costs what the action behind it costs. Each call runs your app's normal backend logic, so database operations, built-in backend usage, AI features, and third-party services count toward usage or incur charges the same way as direct app usage.

Lovable does not charge a separate fee for hosting the integration, publishing it, or tool calls.

There is no built-in rate limit or spending cap, so expose paid or resource-intensive actions only when your app already limits them. See [Can I rate limit an agent integration?](https://docs.lovable.dev/features/agent-integrations.md#can-i-rate-limit-an-agent-integration) for details.

Enabling or changing an agent integration uses build credits. When you select **Enable agent integrations**, Lovable generates or updates the MCP server and its tools. The number of credits depends on the app and the work required.

## Set up your agent integration

Start with a small number of focused tools. Prefer read-only tools before exposing actions that modify data, trigger paid services, or consume significant resources.

Before you publish, check what each tool can do, what inputs it accepts, what data it returns, whether the action enforces your app's permission and plan checks, and whether it is safe if an assistant retries the call.

### Add the integration

**1. Open Agent integrations**

Open your app in Lovable and go to **More → AI → Agent integrations**.

**2. Enable the integration**

Select **Enable agent integrations**. Lovable adds an MCP server to your app and proposes a set of tools based on what your app does.

Selecting **Enable agent integrations** starts a build, which uses credits like any other build work in Lovable.

**3. Choose who can connect**

During the build, Lovable asks **Who should be able to call this MCP server?** Choose one of the following:

* **Protected with OAuth (recommended)**: users sign in to your app before their assistant can call the tools. This is the default. If you skip the question, Lovable uses protected access.
* **Public — no login**: anyone can call the tools without signing in. You must choose this option explicitly. At the end of the build, Lovable summarizes which actions can be called and what data they can return without sign-in.

For apps published to your workspace, sign-in is the only option: a workspace app with an unauthenticated integration cannot be published.

See [Access, sign-in, and permissions](#access-sign-in-and-permissions) for details.

**4. Review and adjust the tools**

Review the generated tools in the **MCP tools** section. Ask Lovable to add, remove, rename, or adjust tools if needed.

```text wrap theme={null}
Add a read-only tool that looks up an order by ID and returns its current status and items.
```

**5. Publish your app**

Publish your app, publicly or, on Business and Enterprise workspaces, to your workspace. Once it is live, the MCP link becomes available. Lovable runs [automated security checks](#automated-security-checks) at publish. If the integration allows access without sign-in, Lovable warns you when you publish publicly, and blocks the publish when you publish to your workspace. See [Workspace-published apps](#workspace-published-apps).

**6. Copy the MCP link**

In **More → AI → Agent integrations**, copy the link from the **Your MCP link** card at the top of the panel, then share it with your users.

You can also start the setup from the project chat.

```text wrap theme={null}
Add Agent integrations to this app so users can connect it to AI assistants like ChatGPT and Claude.
```

### Review the tools

The **MCP tools** section shows the tools available through your integration and what each one can do.

Each tool shows a status:

* **Active**: the tool is live in your published integration, and assistants can call it.
* **Not published**: you added or changed the tool after your last publish, so assistants do not see the updates yet. Publish your app to make them live. Tools from your last publish keep working in the meantime.
* **Inactive**: the integration is not currently available, for example because the app is no longer published publicly. Assistants cannot call its tools.

Each tool also has a capability label:

* **Read-only**: the tool only reads information.
* **May modify data**: the tool can create, change, or delete data. Review these most carefully.

Tools go live when you publish your app. There is no separate tool-approval step, so review every active tool before sharing the MCP link.

For each tool, check:

* **The action it performs.** Confirm the tool does only what its name and description say.
* **The inputs it accepts.** Prefer narrow inputs that match the task, such as a specific record identifier, rather than broad queries or arbitrary field values.
* **The data it returns.** Return only the fields the task needs. A read-only tool can still expose sensitive or unnecessary information.
* **Its access checks.** Confirm the action enforces the ownership, role, permission, and paid-plan requirements your app expects.
* **Its retry behavior.** For tools that change data, confirm that repeating the call does not create duplicate or unintended changes.

Tool names and descriptions matter, because the assistant chooses which tool to call based on what the user asks and how the tool is described. Compare:

* Vague: `get_data`, described as "Gets data."
* Clear: `list_open_orders`, described as "Returns the signed-in customer's open orders with order number, status, and total."

You can ask Lovable to adjust tools in plain language.

```text wrap theme={null}
Remove any tool that can delete records.
```

```text wrap theme={null}
Rename the customer lookup tool so it is clear that it searches by email address.
```

### Access, sign-in, and permissions

Agent integrations require sign-in by default. When Lovable generates your MCP server, it proposes an authenticated setup, and making tools public always requires your explicit choice.

Sign-in, permissions, and tool exposure are three different layers, and it helps to keep them apart:

* **Sign-in identifies the caller.** People connecting through an AI assistant authenticate through your app: they see your app's sign-in screen, then a consent screen that asks them to approve the assistant's access. Both are expected parts of connecting.
* **Your app's rules decide what the caller can do.** A tool acts as the signed-in user. Rules your app enforces in its backend, such as each customer only seeing their own records, apply to tool calls too, and generated tools are not allowed to work around them. Extra requirements, such as owning the record, having a role, or being on a paid plan, apply only when the action itself checks them.
* **The tool definition decides what is exposed.** Review each tool's inputs, the action it performs, and the data it returns.

A tool call does not go through your app's screens. Buttons you hid, pages you removed from menus, and other interface-level controls do not protect a backend action on their own.

#### Choose an access configuration

You choose between two access configurations:

* **Sign-in required, which is the default.** Every tool requires the user to authenticate. Individual actions can then enforce role, ownership, or paid-plan requirements in your app's backend, so an app that limits a feature to paying users keeps that limit for assistant calls. Lovable activates the OAuth capability on your app's backend when you publish, without changing how your users sign in to the app itself.
* **No sign-in.** Every tool can be called without authenticating a user. This is a deliberate choice: Lovable asks you to confirm it, and it summarizes what the tools expose without sign-in.

> [!WARNING]
>
> Publishing tools without sign-in makes every active tool callable without authenticating a user. Treat those tools as publicly accessible, and assume the MCP link can be copied or shared. Lovable warns you when you publish publicly. Apps published to a workspace cannot allow access without sign-in at all, and publishing one is blocked until the integration requires sign-in. Only allow this when every active tool is safe for anyone to use.

> [!NOTE]
>
> Access is configured for the whole integration. You cannot make some tools public and others protected within one integration. Inside a protected integration, individual actions can still apply different role, ownership, and plan checks.

#### Workspace-published apps

On Business and Enterprise workspaces, an app published to the workspace can have an agent integration too. The app stays private to your workspace, and its tools always require sign-in: publishing a workspace app with an unauthenticated integration is blocked with a message asking you to enable OAuth on the MCP server first.

When the integration still allows access without sign-in, the publish dialog shows **MCP authentication is required** rather than letting you continue, with an **Ask Lovable** button that asks the agent to add sign-in for you. The same block appears in **More → AI → Agent integrations** as **Publishing is blocked**, with an **Add sign-in** button.

This also covers apps that are already published to your workspace. They keep serving and their integration keeps working, but you can't publish any change to the app until the integration requires sign-in. You have three ways to resolve it:

* Add sign-in to the integration, which is what **Ask Lovable** and **Add sign-in** do for you.
* Publish the app publicly instead. A public app can have an integration that allows access without sign-in, and you get a security finding rather than a block.
* Turn the integration off, then publish.

Connecting to a workspace app's integration involves two sign-ins. When someone adds the MCP link to their assistant, they first log in with their Lovable account to pass the workspace access check, then sign in to the app itself, like they would in the browser.

The MCP connection endpoint is reachable by AI clients outside your workspace, because assistants need to reach it to start the sign-in flow. Sign-in protects the tools: without passing both sign-ins, no tools can be called.

> [!WARNING]
>
> The app's sign-in is separate from Lovable workspace membership. Someone who connected the integration keeps their app session until it expires or is revoked, so when a person leaves your team, remove or deactivate their account in the app as part of offboarding, not just their Lovable workspace access.

#### Check the current access setting

The **Agent integrations** panel shows your current setup as a status card:

* **Access is protected**, with a **Sign-in enabled** badge, when tools require sign-in.
* **Anyone can connect to your app**, with a **Public access** badge, when tools do not require sign-in. This card includes an **Add sign-in** button. Selecting it starts a build that adds authentication to the integration.

If you set up your integration a while ago, open the panel and confirm the status card shows the access you expect. Switching between public and protected later is a build, not a settings toggle: select **Add sign-in** on the public card as the shortcut, or ask Lovable in the project chat, and it updates your app's authentication setup.

For example, you can ask Lovable:

```text wrap theme={null}
Require users to sign in before they can use this agent integration, and make sure the export report action checks whether the user is on a paid plan.
```

### Automated security checks

Lovable runs two automated security checks on your integration:

* **A basic check, at every publish.** It checks whether your integration allows access without sign-in and warns you in the publish flow. When the app is published to your workspace rather than publicly, publishing is blocked instead of warned. This applies to every workspace and is a publishing requirement, separate from the findings below.
* **A deep scan, when you publish a public integration.** If your tools do not require sign-in, publishing a new or changed integration also starts a deeper scan of the tools themselves. It checks what each tool actually exposes and flags common risk patterns: private-data exposure, unintended record changes, bulk data access, and paywall bypass.

Findings from both checks appear in your project's [Security view](https://docs.lovable.dev/features/security-view.md) under **More → Security**, grouped by security area, usually under **Unauthenticated & abusable endpoints**.

Serious deep-scan findings are marked critical. If your workspace blocks publishing on critical security findings, you cannot publish again until they are resolved. Open a finding to review the issue, then ask Lovable to fix it, or mark it as ignored if it does not apply.

Automated checks do not replace your own review, and they may not detect risks that depend on your app's custom business logic. Before sharing the integration, work through the checks in [Review the tools](#review-the-tools) and [Test before you share](#test-before-you-share).

For how Lovable's security scanning works more broadly, see the [Security overview](https://docs.lovable.dev/features/security) and [Project security view](https://docs.lovable.dev/features/security-view.md).

### Test before you share

Connect your own app in an assistant your users are likely to use, such as ChatGPT or Claude, and test the main workflows before sharing the MCP link.

If the integration requires sign-in, test the full connection flow, including your app's sign-in and consent screens. Connection and authentication issues often appear there first.

Test at least the following:

* Run each tool as an ordinary signed-in user.
* Try protected tools as a user without the required role, ownership, or paid plan, and confirm access is denied.
* Request a record that does not exist or belongs to another user.
* Confirm that each tool returns only the fields needed for its task.
* Run a write action twice and confirm it does not create duplicate or unintended changes.
* Test any paid or resource-intensive action against your app's usage or plan limits.
* For an integration without sign-in, connect from a session where you are not signed in to the app and verify exactly which actions and data are available.

## Connect your users

Once the integration is live, users connect your app to their AI assistant with the MCP link.

### Supported assistants

Your app works with any AI assistant or agent that can connect to a remote MCP server and complete its sign-in flow. Lovable provides in-product connection steps for:

* ChatGPT
* Claude

Other MCP clients, such as Claude Code, Cursor, and VS Code, connect with the same MCP link through their own custom-connector setup.

Setup flows differ by assistant and can change over time. Open **More → AI → Agent integrations**, then expand **How to connect** for the current ChatGPT and Claude steps. For other assistants, refer users to the assistant's official documentation.

### Share the MCP link

After you publish, Lovable shows your app's MCP link in the **Your MCP link** card under **More → AI → Agent integrations**. Users add this link as a custom connector in their assistant.

You can share the link directly, or create a connection page inside your app that explains what the integration does, includes the MCP link, and helps users connect it in the assistant they use.

To create a connection page, expand **How to connect** and select **Ask Lovable to build**.

Because assistant setup flows can change, avoid copying detailed connection steps into a page that will not be maintained. Link to each assistant's official documentation, or review the page whenever a setup flow changes.

## Use your app in your chats

A published app with an agent integration also becomes available inside Lovable, as a connector in its own workspace. Once you connect it, Lovable can call the app's tools from a [chat](https://docs.lovable.dev/features/chats.md) or the project chat: pull live data from the app while you build, run one of its workflows, or use it as context for another project.

Connections are personal. Each workspace member who wants to use the app in their chats connects it once, for themselves.

### Connect the app

There are two ways to connect:

* **From the app itself.** Open **More → AI → Agent integrations** and select **Add to Lovable** on the **Use this app in Lovable chats** card. The button becomes available once the app is published.
* **From the connectors catalog.** Open your workspace's **Connectors** page and find the app under the **Lovable apps** section, which lists MCP connectors published from Lovable apps in your workspace. Select the app and connect, signing in to the app if it requires it.

Workspace members see an app in the **Lovable apps** section when they can access the published app. An app published publicly or to the whole workspace is visible to everyone in the workspace. An app published to a custom audience is visible only to that audience.

### Use the app from chat

After connecting, mention the app in a [chat](https://docs.lovable.dev/features/chats.md) or in the project chat like other connectors.

```text wrap theme={null}
Use the Inventory Tracker connector to list items below their reorder threshold, and build a reorder summary page from the results.
```

Tools the app marks as read-only run without asking. Any other tool asks for your approval each time it runs. In the connector's settings, you can change this per tool: always allow, ask each time, or never allow. To let every tool from the app run without asking, including tools you add to the app later, select **Always allow all tools from this connection** on the approval card or in the connector's settings.

### Manage app connectors

* **Disconnect.** Remove the connection from your workspace's **Connectors** page. This only affects your own connection.
* **Unpublish or delete the app.** The app disappears from the **Lovable apps** section, and its tools stop working in chats.
* **Workspace-wide control.** Workspace admins can turn off **Remote MCP connectors** in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security → MCP connectors**), which disables app connectors along with other MCP connectors and removes existing MCP connections. On Enterprise workspaces, this setting can be managed by the organization.

## Let browser agents use your app

Lovable can add WebMCP tools to your app. WebMCP is a proposed web standard that lets an AI agent built into the browser use the page a person has open, for example to mark a task as done or filter a list.

Browser tools are separate from the MCP server described on this page. The MCP server is for assistants such as ChatGPT or Claude, which connect through the MCP link. Browser tools work only in the person's own browser tab, with their signed-in session, while the app is open there.

When you enable agent integrations, Lovable adds browser tools alongside the MCP server and describes them in its chat reply. Browser tools do not appear in the **MCP tools** section, which shows only the MCP server's tools. If you want the MCP server only, say so in your request.

To get browser tools without an MCP server, ask Lovable in the project chat. Browser tools on their own also work on older React + Vite apps that use your own Supabase project, which cannot have an MCP server.

```text wrap theme={null}
Add WebMCP tools to the tasks page so a browser agent can list tasks and mark them as done.
```

Lovable starts with tools that read information or perform actions that are easy to undo. Lovable adds tools that delete, pay, send, publish, or share only when you ask for them. New pages and features also get browser tools only when you ask, so include them in your request.

A browser tool reads what the page shows or does what one of its buttons does, with the same confirmations and permission checks. Your app's own access rules, such as each customer seeing only their own records, apply to tool calls as they do to clicks.

Few browsers and AI agents support WebMCP yet, and your app works unchanged in browsers that do not. Adding or changing browser tools uses credits like other build work.

## Maintain the integration

After launch, revisit the integration whenever you change tools, access logic, backend behavior, or your app's domain. Changes reach users through publishing, and you stay responsible for what the integration exposes.

### Keep it up to date

Your integration serves the published version of your app. After you change your app, tools, access logic, or domain:

**1. Publish the app again**

Publishing updates the live MCP server with your latest tools and settings.

**2. Redeploy backend changes for older apps**

For older React + Vite apps, ask Lovable to redeploy the app's backend function after your changes so the live integration picks them up.

**3. Ask users to refresh after tool changes**

Users need to refresh the connector in their assistant when you add, remove, or rename tools. Changes to existing app behavior take effect after publishing and normally do not require a connector refresh.

**4. Share the new link if it changed**

If the MCP link changed, ask users to reconnect with the new link.

Open **More → AI → Agent integrations**, then expand **Refresh after app changes** to see the refresh steps for ChatGPT and Claude. For other assistants, refer users to the assistant's official documentation.

Lovable maintains the hosted MCP setup as the standard evolves, and protocol changes ship as versioned updates. When an update needs a change in your app, Lovable provides an upgrade path.

### When your MCP link changes

The MCP link cannot be changed on demand.

* For TanStack Start apps, the link is based on your app's web address, so it changes when you change the app's primary custom domain, and users then need to paste the new link into their assistant.
* For older React + Vite apps, the link points to the app's backend function, so it does not change with your domain.

### Monitor, disable, and remove

Tool errors surface in your app's logs like other backend errors. If you need tool calls tied to identities, keep sign-in on, so every call comes from a signed-in user of your app.

To stop or restrict the integration:

* **Remove a tool.** Ask Lovable to remove it, then publish. The tool disappears from the integration.
* **Remove the whole integration.** Ask Lovable to remove agent integrations from the app, then publish. Lovable removes the generated code and takes the MCP server offline. Your app keeps working as before.
* **Unpublish the app.** This takes the MCP server offline immediately along with the app itself. Existing assistant connections cannot call it while the app is unpublished.
* **Delete the project.** This takes the app and its MCP server offline. You can [restore the project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project) for 60 days. After that, Lovable permanently removes both.

> [!WARNING]
>
> Unpublishing an app removes its live MCP server, and connected users lose access. If you publish the app again later, Lovable recreates the server, but the link may change.

## Best practices

* **Start with the main user jobs.** Create tools for the actions users already come to your app to complete. New app features do not become tools automatically, so ask Lovable to expose each action you want assistants to use.
* **Write clear tool names and descriptions.** Explain what the tool does, what inputs it needs, and what result it returns. Clear names and descriptions help the assistant choose the right tool.
* **Return only the data the task requires.** A tool exposes its returned data as well as its action. Ask Lovable to limit results to the fields the tool's purpose requires.
* **Separate read and write actions.** Make it clear which tools only retrieve information and which tools can create, update, or delete data.
* **Make write actions safe to retry.** An assistant may retry a call after a timeout or connection error, and a tool that creates or changes something could then do it twice, such as creating the same order two times. Ask Lovable to design write tools so a repeated call does not duplicate the change, for example by checking whether the change was already applied or by using a request identifier.
* **Keep sign-in on by default.** Allow access without sign-in only when every exposed action and returned field is safe for anonymous use.
* **Enforce restricted access in your app.** If a tool returns private information, changes records, or runs a paid feature, verify the user's permissions, ownership, role, and plan before completing the action.
* **Publish after changing tools.** New, removed, or updated tools do not reach users until you publish the app.
* **Add a connection page.** Give users the MCP link, explain what the integration can do, and point them to current setup instructions. See [Share the MCP link](#share-the-mcp-link).

## Limitations

* **Long-running tools can time out.** Tools run one action at a time, and the assistant waits for the result with a time limit. Work that takes more than tens of seconds, such as processing a large file or generating media, can show as stuck or interrupted in the assistant. Keep tools fast, and run heavier work inside the app.
* **Integrations cannot send alerts on their own.** Your app cannot notify an assistant. Assistants only act when a user asks, so "watch this and alert me" workflows do not work.
* **Users must refresh after tool changes.** Assistants keep a copy of your tool list. After you add, remove, or rename tools and publish, users see the previous list until they refresh the connector, which slows down iteration on a live integration.
* **There is no public discovery directory.** People outside your workspace cannot browse a directory of agent integrations, so you share the MCP link with your users yourself. Inside your own workspace, published apps appear under **Lovable apps** on the **Connectors** page.

## FAQ

> **What is an MCP server?**
>
> An MCP server exposes your app's actions as tools that an AI assistant can call. MCP stands for Model Context Protocol, an open standard for connecting assistants to external tools.

> **Is this a new product or a copy of my app?**
>
> Neither. The agent integration is a new way into the same app. Your app does not move into the assistant. The assistant gets a way to call your live app, your app does the work, and the integration follows the published version whenever you update it. Your visible pages and normal user flow stay the same. Lovable adds the tool code and connection endpoints the integration needs.

> **What happens if my app already has a custom MCP server?**
>
> Lovable does not detect a hand-built MCP server in advance. If your existing server uses the same routes, the build fails rather than overwriting your code. Ask Lovable to rebuild your existing server as an agent integration, or to set the integration up on a different path.

> **Will this expose my paid or private content?**
>
> Not when the integration and its tool actions are configured correctly. Agent integrations require sign-in by default. Backend rules that use the signed-in user's identity apply to tool calls, while each protected action must still enforce any additional ownership, role, permission, and paid-plan requirements. Review both what each tool can access and what it returns before publishing.

> **Can I make only some tools public?**
>
> No. Sign-in applies to the whole integration: all tools require sign-in, or none do. Inside a protected integration, individual tools can apply their own checks in your app's logic, such as requiring a specific role or plan.

> **Can I rate limit an agent integration?**
>
> Not today. There is no built-in rate-limit control or tool-call quota. Requiring sign-in prevents anonymous calls and ties every call to a user, but it does not limit how often a signed-in user can call a tool. Avoid exposing expensive actions unless your app already enforces a usage or plan limit for them.

> **Can I see who is using the integration?**
>
> Lovable does not show tool-call activity, but tool errors appear in your app's logs like other backend errors. If your integration requires sign-in, every call runs as a signed-in user of your app, so any changes it makes show up in your app's data like normal user activity.

> **How do I disable the integration?**
>
> Ask Lovable to remove a tool or the whole integration, then publish. Unpublishing the app also takes the MCP server offline immediately. See [Monitor, disable, and remove](#monitor-disable-and-remove).

> **Do tool calls cost me anything?**
>
> There is no separate Lovable charge for tool calls. A tool call runs in your app's backend like normal app usage, so if a tool uses the built-in backend or AI features, that usage counts against your app's balance the same way it does when someone uses your app directly. Require sign-in to prevent anonymous calls, and make sure your app enforces a plan or usage limit for expensive actions.

> **Which assistants can connect to my app?**
>
> Any AI assistant or agent that can connect to a remote MCP server and complete its sign-in flow. Lovable provides in-product connection steps for ChatGPT and Claude, and other MCP clients, such as Claude Code, Cursor, and VS Code, connect with the same MCP link.

> **Can I use this with a workspace or internal app?**
>
> Yes, on Business and Enterprise workspaces. Publish the app to your workspace, and its agent integration stays private along with the app: tools always require sign-in, and users pass the Lovable workspace access check before signing in to the app. See [Workspace-published apps](#workspace-published-apps). On Free and Pro workspaces, agent integrations require a publicly published app.

> **Can my teammates use my app from Chats or the project chat?**
>
> Yes. Workspace members who can access the published app find it under **Lovable apps** on the workspace's **Connectors** page and connect it for themselves. See [Use your app in Lovable chats](#use-your-app-in-your-chats).

> **Can my app use another app's integration at runtime?**
>
> No. Connections work when you chat with Lovable, in a chat or in the project chat. They are not part of a published app, so your app cannot call another app's tools while people use it.

## Troubleshooting

> **The Enable agent integrations option is not available**
>
> You can enable the integration before publishing, but the integration only becomes available to users after the app is published: publicly on Free and Pro workspaces, publicly or to your workspace on Business and Enterprise workspaces. If the option stays disabled, publish your app first, then try again.

> **My app is published to the workspace, but AI clients cannot reach its MCP**
>
> A workspace-published app can serve its MCP from a link that AI assistants outside the workspace cannot reach. The **Agent integrations** panel shows an **AI assistants can't reach your MCP yet** card when this happens: select **Fix MCP link**, and Lovable moves the MCP server to a public link while the app itself stays published to your workspace. Sign-in still protects the tools.

> **The Add to Lovable button is grayed out**
>
> The hint under the button says why. Publish the app if it is not published yet, or republish it if the hint asks for a republish. If the connector is still being prepared, it becomes available shortly after publishing. An app published to a custom audience can only be added by that audience, and only members of the app's workspace can add it. You also need to be a workspace editor to connect MCP servers. If the connector failed to be created, select **Fix connector** to have Lovable investigate, or republish the app.

> **Users cannot see my latest tools**
>
> Publish your app after your changes, then have users refresh the connector in their assistant (such as ChatGPT or Claude). For older React + Vite apps, ask Lovable to redeploy the app's backend function after your changes.

> **Connecting fails or returns an error**
>
> * Confirm your app is published and that you pasted the current MCP link.
> * If your app requires sign-in, make sure users complete the sign-in step when the assistant prompts them.
> * If your tools do not require sign-in, check the connector's authentication setting: ChatGPT defaults new connectors to OAuth, so select the no-authentication option when adding a server that does not require sign-in.

> **Connecting fails at the sign-in step with an error about ID tokens, JWT signing, or HS256**
>
> Older projects may use a token-signing setup that some assistants do not accept. Ask Lovable to migrate your project's signing keys. It asks for confirmation, runs the migration, and connecting works afterward.

> **The sign-in page shows a 404 during connect**
>
> The sign-in screen is part of your app, so it only exists once the app is published. Publish your app, then have the user connect again.

> **Lovable says it cannot secure the MCP server**
>
> On newer apps using your own Supabase project, Lovable activates OAuth when you publish. If OAuth is still disabled afterward, reconnect the Supabase project in Lovable and publish again.
>
> Older React + Vite apps require the built-in backend. Lovable cannot add an agent integration to an older app that uses your own Supabase project. See [Prerequisites](#prerequisites).

> **The assistant is not calling my app**
>
> In most assistants, including ChatGPT and Claude, the connector has to be enabled from the chat composer for that conversation. Ask users to enable it, then make the request explicit, for example "Use \[app name] to check my open requests."

> **A tool call shows as stuck or interrupted**
>
> The tool is probably doing work that takes longer than the assistant's timeout, such as processing a large file or generating media. Assistants can also retry timed-out calls, which can create duplicate records. Ask Lovable to make the tool respond immediately and add a separate tool to check the result, or move the heavy work into the app itself.

> **The build fails after I added the integration to an app with an existing MCP server**
>
> Lovable refuses to overwrite MCP code you wrote by hand. Ask Lovable to move your existing server to a different path, or to rebuild it as the agent integration.

> **The MCP link stopped working**
>
> For TanStack Start apps, changing the app's primary custom domain changes the MCP link too. Copy the new link from the **Your MCP link** card in **More → AI → Agent integrations** and share it with your users.
>
> Older React + Vite app links point to the app's backend function and do not change with your domain.


## Related topics

- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)
- [Connect your app to n8n](https://docs.lovable.dev/integrations/n8n.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
