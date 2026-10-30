# Connect your app to Slack
<!-- source: https://docs.lovable.dev/integrations/slack.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Slack

> Connect your app to Slack by signing in with your Slack account, to send messages, read channels, automate alerts, and generate digests, or add the app you built to Slack as its own agent.

[Slack](https://slack.com/) is a messaging and collaboration platform that lets your Lovable app work with team communications, channels, and workspace data. The Slack connector lets your app notify teams, summarize conversations, and send structured updates directly to Slack.

> [!NOTE]
>
> This is an integration for apps you build with Lovable. Your app can send and read Slack messages through this connection.
>
> Want to chat with Lovable inside Slack instead? Use [Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md).

Lovable offers three ways to bring Slack into an app you build. Choose the one that matches what you want to build:

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Slack connection in the chat and in your published apps |
| [Your app as a Slack agent](#add-your-app-to-slack-as-an-agent) | Add an app you built to Slack as its own agent, so teammates can mention it or message it directly |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Slack account, or install your bot in their own Slack workspace, and work with their own data. This type uses a Slack app you register yourself |

With Slack, your app can:

* Send messages to channels and direct messages
* Read messages from public and private channels (with the matching scopes)
* List workspace users and channel information
* React to messages with emoji (with the matching scopes)
* Search Slack content (private channels and direct messages need a personal connection)
* Manage channels and invite members (with the matching scopes)
* Run inside Slack as its own agent that replies to mentions and direct messages (see [Add your app to Slack as an agent](#add-your-app-to-slack-as-an-agent))

Each Slack connection is authorized for a single Slack workspace.

## Common use cases and example apps

These examples show what you can build with Slack, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Customer notifications to Slack** | *Use Slack and build a quote request form that saves each submission and posts a summary to #new-deals.* | **Notify your team in Slack when customers take action in your app.** The app captures the submission, formats the key details, and posts them to the channel so someone can respond immediately. |
| **Incident dashboard with Slack escalation** | *Use Slack and build an internal incident dashboard with a Post Alert button that sends a structured alert to #ops-alerts.* | **Consolidate operational data into one internal dashboard.** When something needs attention, the app posts a structured alert to Slack so the right team can respond. |
| **Weekly Slack digest app** | *Use Slack and build a tool that summarizes #product and #support from the past 7 days, lets me review the summary, then posts it to #leadership.* | **Turn busy Slack channels into structured summaries.** The app reads recent messages, extracts key themes, and posts a digest for leadership or cross-functional teams. |
| **Automated KPI reports** | *Use Slack and build a dashboard that generates a KPI summary every Monday at 9am and posts it to #team-updates.* | **Deliver recurring reports directly to Slack channels.** The app compiles selected metrics on a schedule and posts formatted updates to keep the team aligned. |
| **Multi-workspace notifications** | *Use Slack and build a deploy tracker that notifies our internal Slack workspace and our partner's workspace when a deployment finishes.* | **Send notifications across multiple Slack workspaces from a single app.** The app routes messages to different workspaces based on the event or audience. |
| **Slack-powered knowledge search** | *Use Slack and build a search interface for my Slack messages with filters for date and sender.* | **Create a structured search experience for Slack conversations.** The app lets users search messages and filter results to find past discussions and decisions. |
| **Team activity dashboard** | *Use Slack and build a dashboard showing where I've been mentioned and which messages need follow-up.* | **Surface Slack activity in a focused internal view.** The app aggregates mentions and recent activity so you can track conversations and follow up on action items. |
| **Automated onboarding workflows** | *Use Slack and build a project kickoff tool that creates Slack channels, adds team members, and sends a welcome message when a new project starts.* | **Automate Slack setup as part of broader onboarding workflows.** The app provisions channels, assigns members, and posts welcome messages without manual coordination. |

## How Slack connections work

Lovable uses one centrally managed Slack app to power all Slack connections across workspaces, so you never register your own Slack app for this connector. This is a different Slack app from the one behind [Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md), and different again from the Slack app you register yourself for the [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).

Within your Lovable workspace:

* Each connection is a separate Slack authorization.
* Each connection can use different scopes, a different access type (bot or personal), and a different Slack workspace.
* Multiple projects can use the same connection.

Requests go through Lovable's connector gateway, which holds the OAuth token so it never appears in your project. Each connection can make 100 Slack API requests per minute per project through the gateway. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

## How to connect Slack

Who can create Slack connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Slack connections using different Slack workspaces or access types, which is useful for separating environments or messaging several workspaces from one app.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Slack, make sure you have:

* A Slack workspace where you can install apps, or where you can request admin approval to install one
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward Slack's rate limits for your workspace. Slack's terms and quotas are handled by Slack, not Lovable.

### Set up your Slack connection

You authorize Lovable with your Slack account. You do not need an API token or a Slack app of your own.

**1. Open Slack in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Slack**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Slack Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose the access type**

Under **Access Type**, choose how the connection acts in Slack. You cannot change this after the connection is created.

* **Connect as yourself** (default): operations run as you, with your Slack permissions, and can reach your personal data such as direct messages if you grant the scopes. Use this for personal search and digests.
* **Connect as a bot**: operations run as a bot. One bot connection per Slack workspace is enough, and each project can set the bot's display name and icon. Use this for shared notifications and alerts.

**5. Review scopes (optional)**

Under **Scopes**, review the Slack permissions the connection requests. The list changes with the access type. **View basic information about public channels in a workspace** and **View messages and other content in public channels you are in** are always included. Selected by default for both access types: sending messages, reading private channels, direct messages, and group direct messages the connection is in, starting direct and group messages, viewing people, and searching public channels, files, and people. Bot connections also select customizing the bot's name and icon by default. Personal connections also select searching private channels, direct messages, and group direct messages by default.

Select only the scopes your app needs. You can change scopes later by editing the connection and clicking **Reconnect**. For full scope documentation, see the [Slack scope reference](https://api.slack.com/scopes).

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect to Slack and authorize**

Click **Connect** at the bottom of the form. The Slack authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Select the Slack workspace you want to connect, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Slack (based on configured connection-level access). Your Lovable apps can then send messages, read channels, and work with your team's Slack workspace.

## Slack bot behavior and channel access

When you connect Slack as a **bot**, messages are sent from Lovable's centrally managed Slack app, which appears in Slack as **Lovable App** with a heart icon. Each project can define its own bot display name and icon, so different projects can appear as different bots in Slack even though they all send through the same Slack app.

### Bot customization

You can customize how messages from your project appear in Slack by prompting Lovable to set a custom bot name and icon.

For example:

```text wrap theme={null}
Send messages as 'Deploy Bot' with a rocket emoji icon.
```

Using a consistent bot name and icon helps teammates recognize which project is sending messages.

### Public channel access

The bot has access to all public channels in the workspace without an invitation.

### Private channel access

You must invite the bot before it can read or post messages in a private channel. In the channel, use `/invite` and pick **Lovable App**, the connector's bot. It is different from the **Lovable** app you mention to [chat with Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md). If your app cannot post to a private channel, invite the bot first.

## Add your app to Slack as an agent

Lovable can add an app you built to your team's Slack workspace as its own Slack app, so teammates can use it by mentioning it in a channel or sending it a direct message. The app appears in Slack under its own name, not under Lovable's. Lovable creates the Slack app, sets its permissions, and stores the keys the app needs to connect, so you do not need to visit Slack's developer site or copy keys between Slack and Lovable.

An app added to Slack as an agent works differently from a shared Slack connection. A shared connection lets your app call Slack, for example to post a message. An app added to Slack as an agent also receives messages from Slack: when someone mentions the app or writes to it, Slack delivers that message to your published app, and your app answers with the behavior you built.

### Authorize your Slack workspace

A Lovable workspace admin or owner authorizes the Slack workspace once. Every app you add to Slack afterward uses that authorization, so you do not repeat it for each app.

**1. Open the Slack connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select **Slack**, and scroll to the **Your apps in Slack** section.

**2. Connect the workspace**

Click **Connect Slack workspace** and approve the request in Slack. This gives Lovable permission to create and manage apps in that Slack workspace.

The person who connects the workspace needs permission to install apps in the Slack workspace. If your company restricts who can install Slack apps, Slack routes the request to your Slack admins for approval. This approval requirement comes from your company's Slack settings, not from Lovable.

You can authorize more than one Slack workspace. After the first one, the button reads **Connect another workspace**. Each authorized workspace shows who connected it and when.

### Build the app and add it to Slack

You build the app in the project chat like any other Lovable app. Describe what it should do when someone mentions it or messages it:

```text wrap theme={null}
Build an onboarding assistant for new hires. When someone mentions it in a Slack channel or sends it a direct message, it should answer questions about our onboarding checklist and point people to the right documents.
```

Then add it to Slack:

**1. Publish the project**

Your published app receives and answers the Slack messages, so publish before installing. The app can be published to the workspace only. You do not need to publish it publicly.

**2. Ask Lovable to add the app to Slack**

```text wrap theme={null}
Add this app to our Slack workspace as an agent called Onboarding Assistant.
```

Lovable asks you to confirm, then creates the Slack app and installs it. You choose the app's name (up to 35 characters) and can add a short description (up to 140 characters) that appears in Slack. If several Slack workspaces are authorized, tell Lovable which workspace to install the app into. Only workspace admins and owners can add apps to Slack.

**3. Approve the installation if Slack requires it**

If your Slack workspace requires admin approval for new apps, Lovable gives you an approval link, and the app's status shows **Waiting for approval** until a Slack admin approves it.

**4. Publish the project again**

Lovable stores the new Slack app's keys as project secrets, and your live app receives them only on the next publish. Publish once more, and the app is ready to answer messages.

To start using the app, mention it in a channel (if the app is not in the channel, Slack offers to add it) or open a direct message with it.

### What the app can do in Slack

An app added to Slack as an agent can:

* Reply when someone mentions it in a channel it has been added to
* Reply to direct messages
* Post messages and replies under its own name

It cannot read channel history, create slash commands, or respond to interactive buttons or modals. The app can also use a [shared Slack connection](#how-to-connect-slack) when it needs broader Slack access, for example reading channels to build a digest.

### Manage your apps in Slack

The **Your apps in Slack** section on the Slack connector page lists every app added from your Lovable workspace, with a link to the project it came from, when it was created, and its status: **Installing**, **Waiting for approval**, **Ready**, or **Failed**. This section is the only place these apps appear in Lovable: they are not listed in the **Connections** section with your shared Slack connections.

Each project can have one app per Slack workspace. If you ask Lovable to add the same project again, it updates the existing Slack app, including its name, instead of creating a second one. The Slack connection Lovable creates for the app is shared with your entire Lovable workspace.

To remove an app, click **Remove** on its row. Lovable deletes the Slack app, its connection, and the Slack keys it stored as project secrets. This does not change your project's code, and other apps remain installed.

> [!WARNING]
>
> Removal is permanent: adding the app again creates a new Slack app with new keys. Remove an app before deleting its project. After the project is deleted, Lovable can no longer remove the app from Slack.

To disconnect a Slack workspace entirely, click **Revoke** next to the workspace name. This removes Lovable's permission to create and manage apps in that Slack workspace. You must remove the workspace's apps before you can revoke it. You can authorize the same workspace again later.

Slack admins can see the apps in Slack's own app management pages and remove or restrict them there. Routine management, such as renaming or removing an app, happens in Lovable.

## Limitations

The Slack app + chat connector documented on this page cannot:

* Receive incoming Slack events, such as mentions or replies. A shared connection has no webhooks or event subscriptions. To respond to mentions and direct messages, [add your app to Slack as an agent](#add-your-app-to-slack-as-an-agent) instead.
* Create slash commands.
* Respond to interactive buttons or modals in real time.
* Support per-end-user Slack login. Each connection represents a single Slack account or bot shared across all projects linked to it. If you need each user of your app to sign in with their own Slack account, use the Slack [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).

An app added to Slack as an agent receives mentions and direct messages. Like a shared connection, it cannot create slash commands or respond to interactive buttons or modals.

If Slack authorization is revoked from the Slack side, reconnect the connection in Lovable before API calls can succeed again.

## AI disclosure

Lovable is an AI-powered platform. Apps built with Lovable may generate AI-assisted content such as summaries or notifications. AI-generated outputs may occasionally contain inaccuracies and should be reviewed before use.

## Manage your Slack connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Slack**, then open the connection.

* **Unlink projects** to remove Slack access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Slack stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to HubSpot](https://docs.lovable.dev/integrations/hubspot.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
