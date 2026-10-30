# Connect your app to Discord
<!-- source: https://docs.lovable.dev/integrations/discord.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Discord

> Connect your app to Discord to post channel messages, list the servers a bot is in, and read recent channel history.

[Discord](https://discord.com/) is a messaging platform organized into servers and channels. The Discord connector lets your Lovable app post messages, list the servers a bot has joined, and read recent channel history through a bot you own.

Discord is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the chat while you build and in your published apps.

With Discord, your app can:

* Post a text message to a channel the bot can access
* List the servers the bot has joined
* Read recent messages in a channel
* Receive slash-command interactions on a public URL you register for the bot

The bot only sees servers you invite it to, and it can post in a channel only when that channel allows Send Messages. Discord is a good fit when your app needs to notify a server, show server activity, or answer a slash command.

## Common use cases and example apps

These examples show what you can build with Discord, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Order alerts | *Use Discord and build a store page that posts a message to our orders channel when a customer checks out.* | **Notify a channel when something happens in the app.** The app posts the order summary to a Discord channel the bot can access. |
| Server directory | *Use Discord and build a page that lists the Discord servers this bot is in.* | **Show the servers the bot has joined.** The app lists each server name for people using the app. |
| Announcement board | *Use Discord and build a page that shows the latest messages from our announcements channel.* | **Display recent channel messages in the app.** The app reads recent messages from one channel and shows them on the page. |
| Support handoff | *Use Discord and build a contact form that posts the submission to our support channel.* | **Send form submissions into a Discord channel.** The app posts the form contents as a channel message. |
| Slash-command reply | *Use Discord and build a public endpoint that answers a slash command with a short status message.* | **Answer a slash command from the published app.** The app receives the interaction and replies in Discord. |

## How to connect Discord

Who can create Discord connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Discord connections using different bot tokens, which is useful for separating environments (for example, development and production) or running several bots.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Discord, make sure you have:

* A Discord account
* A Discord application with a bot, and that bot's token
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> The Discord bot HTTP API does not charge for these requests. Discord rate limits still apply, and Discord enforces them, not Lovable.

### Step 1: Create a bot and copy its token

The token is the credential for one Discord bot. You create the application in the [Discord Developer Portal](https://discord.com/developers/applications).

To create a bot and copy its token:

**1. Open the Developer Portal**

Sign in at the [Discord Developer Portal](https://discord.com/developers/applications).

**2. Create an application**

Click **New Application**, name it, and create it.

**3. Copy the bot token**

Open **Bot** and click **Reset Token**. Copy the token and store it securely. The form field in Lovable is labeled **Bot token**, and the hint reads "Bot token from the Discord Developer Portal (Bot page)."

**4. Invite the bot to your server**

Open **OAuth2**, then **URL Generator**. Select the **bot** scope, choose the permissions the bot needs (include **Send Messages** if the app will post), and open the generated link to add the bot to your server.

> [!WARNING]
>
> Your bot token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

To receive slash commands, also copy the application's public key from **General Information**. That key is not the bot token. Register the app's public interactions URL in the Developer Portal. Lovable can set that up in the project after the connection exists.

See Discord documentation for more: [Discord Developer Portal](https://discord.com/developers/applications).

### Step 2: Connect Discord to Lovable

The connection form asks for the bot token from Step 1.

**1. Open Discord in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Discord**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **Bot token**: paste the token from the Developer Portal **Bot** page.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the bot token against the Discord API before saving the connection.

When connected, anyone building in a project can ask Lovable in chat to link their project to Discord (based on configured connection-level access). Your Lovable apps can then post channel messages, list the bot's servers, and read recent channel history.

## Limitations

The Discord connector cannot:

* Create the Discord application or invite the bot for you. Do that in the Developer Portal.
* Sign each person into their own Discord account. Each connection is one bot, shared across the projects linked to it.
* Join voice channels or keep a live gateway connection open. The connector covers HTTP calls: messages, server list, channel history, and slash-command HTTP callbacks.

## Manage your Discord connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Discord**, then open the connection.

* **Unlink projects** to remove Discord access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Discord stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
