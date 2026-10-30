# Connect your app to Telegram
<!-- source: https://docs.lovable.dev/integrations/telegram.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Telegram

> Send and receive Telegram messages in apps you build with Lovable. This is for app integrations, not for chatting with Lovable in Telegram.

[Telegram](https://telegram.org/) is a messaging platform that lets your Lovable app communicate with users through chats, groups, and channels. The Telegram connector lets your app send notifications, respond to user messages, and trigger workflows directly from Telegram conversations through a bot you own.

Telegram is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the chat while you build and in your published apps.

> [!NOTE]
>
> This is an integration for apps you build with Lovable. Your app can send and receive messages through Telegram bots.
>
> Want to chat with Lovable inside Telegram instead? Use [Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md).

With Telegram, your app can:

* Send messages, photos, documents, and other media to users or groups
* Receive and respond to user messages and commands through a webhook
* Create interactive buttons and custom keyboards
* Guide users through workflows such as booking, ordering, or submitting requests
* Deliver alerts, reports, and reminders through chat
* Broadcast updates to Telegram groups or channels

Telegram is a good fit when your app needs to notify users about events, broadcast updates, or let users request information directly through chat.

## Common use cases and example apps

These examples show what you can build with Telegram, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Store with order tracking** | *Use Telegram and build an online store that messages our team when an order is placed and lets customers ask the bot for their delivery status.* | **Manage store activity and customer updates through Telegram.** The app sends order details to a team chat and answers customers who message the bot with an order number. |
| **API monitoring alerts** | *Use Telegram and build a monitoring dashboard that checks our API every minute and sends an alert if the service stops responding.* | **Send alerts through Telegram when problems occur.** The app checks service health on a schedule and posts to a Telegram chat when it detects downtime or errors. |
| **Support inbox** | *Use Telegram and build a support inbox where customers message a bot and the conversation appears in our support dashboard.* | **Provide customer support through Telegram conversations.** The app records each message the bot receives and lets the team respond from the dashboard. |
| **Daily KPI reports** | *Use Telegram and build a KPI dashboard that posts a summary of daily metrics to our team group every morning.* | **Deliver recurring reports through Telegram.** The app aggregates metrics on a schedule and sends a formatted summary to a Telegram group. |
| **Price alerts** | *Use Telegram and build a market tracker that sends a message when a selected price threshold is reached.* | **Send alerts when tracked values change.** The app monitors prices from an API and messages the user when a threshold is crossed. |

## How Telegram connections work

Each Telegram connection uses a **bot token**, which represents a single Telegram bot created through [@BotFather](https://t.me/BotFather).

Within your Lovable workspace:

* Each connection represents one Telegram bot
* You can create multiple connections if you want to use multiple bots
* Multiple projects can use the same connection

Telegram authenticates with the bot token, not OAuth, so you see no authorization window and the token never needs refreshing. Requests go through Lovable's connector gateway, which adds the bot token for you. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

## How to connect Telegram

Who can create Telegram connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Telegram connections using different bots, which is useful for separating environments (for example, development and production) or running several bots.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Telegram, make sure you have:

* A Telegram account
* A Telegram bot and its bot token, created with [@BotFather](https://t.me/BotFather)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Telegram does not charge for the Bot API. Telegram's rate limits and terms still apply, and Telegram enforces them, not Lovable.

### Step 1: Create a Telegram bot and get a bot token

Telegram bots are created and managed through [@BotFather](https://t.me/BotFather), Telegram's official bot management tool.

To create a bot and get its token:

**1. Open BotFather**

Open Telegram and search for **@BotFather**, or open [t.me/BotFather](https://t.me/BotFather).

**2. Create the bot**

Send the command `/newbot` and follow the prompts. Choose a display name for your bot, then a username that ends in `bot` (for example, `myapp_notify_bot`).

**3. Copy the bot token**

BotFather replies with a bot token in the form `123456789:ABCDefghIJKLMnopQRStuvWXYz1234567`. Copy it and store it securely.

> [!WARNING]
>
> Your bot token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Telegram documentation for more: [BotFather](https://core.telegram.org/bots/features#botfather) and the [Telegram Bot API](https://core.telegram.org/bots/api).

### Step 2: Connect Telegram to Lovable

You can create multiple connections using different bot tokens.

**1. Open Telegram in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Telegram**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Telegram Prod`. This name is only used inside Lovable to identify the connection.
2. **Bot token**: paste the bot token you received from @BotFather. The form also shows the BotFather steps from Step 1 as a reminder.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Telegram Bot API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Telegram (based on configured connection-level access). Your Lovable apps can then send and receive Telegram messages through your bot.

## Receiving messages

To receive messages, your app needs a public endpoint that Telegram calls when someone writes to the bot. When you ask Lovable to handle incoming messages, it creates that endpoint in your project and registers it as the bot's webhook through the connector gateway. Users then message the bot as they would any other Telegram bot, and your app replies.

A bot token can have only one webhook at a time. If you use the same bot in two projects, the most recent webhook registration wins.

## Limitations

The Telegram connector cannot:

* Create bots for you. Create them with @BotFather.
* Refresh or rotate bot tokens automatically. To rotate, revoke the token in @BotFather, create a new one, and update the Lovable connection.
* Support per-end-user Telegram login. Each connection represents a single bot shared across all projects linked to it.

## Manage your Telegram connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Telegram**, then open the connection.

* **Unlink projects** to remove Telegram access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Telegram stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
