# Chat with Lovable in Telegram
<!-- source: https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat with Lovable in Telegram

> Chat with the Lovable bot in Telegram to build and manage your projects. Not for integrating Telegram messaging into your apps.

Lovable in Telegram lets you message Lovable directly from Telegram. It is the same Lovable you use on [lovable.dev](https://lovable.dev), now accessible from your messaging app. Conversations with Lovable in Telegram stay in Telegram. They are priced like messages in [Chats](https://docs.lovable.dev/features/chats.md), and they do not appear in Chats on the web.

> [!NOTE]
>
> This is for chatting with Lovable inside Telegram. You can build and manage your projects by messaging the Lovable bot.
>
> Want your Lovable app to send Telegram messages instead? Use the [Telegram connector](https://docs.lovable.dev/integrations/telegram.md).

## What you can do

When connected, you can message the Lovable bot to work on your projects from anywhere.

### On your projects

* Build new apps or modify existing ones
* Fix bugs, add features, and make UI changes
* Publish projects live
* Check edit history and review what changed
* Query your project database with read-only queries
* View analytics for published projects, including visits, page views, traffic sources, and real-time stats

### Across projects

* Read and search code in any workspace project
* Copy assets between projects
* Compare patterns or components across codebases

### Beyond code

* Search the web for documentation, examples, or current information
* Remember preferences across conversations, such as expertise level or UI preferences
* Use your connected tools and approve actions from the chat. See [Use your connected tools](#use-your-connected-tools).

## Prerequisites

* A Lovable account with access to at least one **Free** or **Pro** workspace
  > [!NOTE]
  >
  > Lovable in Telegram is not available on Business and Enterprise workspaces.
* A Telegram account

## Connect Telegram

**1. Open Telegram settings**

In Lovable, find Telegram in [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**).

**2. Connect Telegram**

Click **Connect to Telegram**. Lovable shows a **Connect Telegram** page with options to continue in Telegram. The exact options depend on the device you're using.

* On desktop, scan the QR code with your phone, or click **Open in Telegram** to launch it on your current device.
* On phone, tap **Open in Telegram**. If you don't have Telegram installed, click **Download Telegram** first.

**3. Start the bot**

In Telegram, click **Start bot** to finish linking your accounts.

You are now connected. The **Telegram** settings in Lovable show your connection status, the workspace it is connected to, and when you connected.

## How to use it

Send a direct message to the Lovable bot in Telegram. Messages to Lovable in Telegram are chat messages, priced like messages in [Chats](https://docs.lovable.dev/features/chats.md).

Chat usage follows its own pricing model, including a per-message price and a daily chat allowance. A chat message is priced on the work Lovable does to answer it, typically a fraction of a credit.

Free, Pro, and Business workspaces include a daily chat allowance that covers chat messages first. The allowance belongs to the workspace, so everyone's chat messages draw on the same daily pool. It resets every day at 00:00 UTC and does not roll over.

When the day's allowance is used up, chat messages keep the same per-message price and draw on your daily build credits, then your general credits.

Enterprise plans do not include a daily chat allowance. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs) for the full rules.

Work Lovable sends to a project from Telegram is a build and uses build credits.

Talk to it naturally, without special syntax or commands. For example:

```text wrap theme={null}
Add a login page to my app
```

```text wrap theme={null}
What does my users table look like?
```

```text wrap theme={null}
Publish my project
```

The bot shows a typing indicator while processing, then replies in the chat. When it builds or edits a project, it includes a link back to Lovable so you can review the changes.

If the project is unclear, the bot asks for clarification. Otherwise, it uses context to determine your intent.

## Use your connected tools

Lovable in Telegram can work in your connected tools, such as Slack, Notion, or HubSpot, under the same rules as [Chats](https://docs.lovable.dev/features/chats.md#use-connected-tools). It uses your own connections and the ones your workspace shares, including [chat connectors (MCP servers)](https://docs.lovable.dev/integrations/chat-connectors.md). It does not use another member's connection to a personal account, such as their Gmail or Linear, even when they shared it with you. When you ask for a tool that is not connected yet, Lovable sends you a link to [**Connectors**](https://docs.lovable.dev/integrations/introduction), where you connect it.

Lovable reads from a connected tool without asking, and asks for your approval in the chat before it creates, sends, or changes anything through a tool. For tools from an MCP server, Lovable asks before every use unless the server marks the tool as read-only. The approval is a **Permission needed** card with buttons:

* **Allow**: approves this action.
* **Skip**: continues without the action.
* **Allow for this request**, **Allow in this chat**, and **Always allow**: offered for some tools, so you are not asked again within that scope.
* **Open in Lovable**: replaces the buttons when Lovable needs details that only a form in Lovable can take. You answer on the web.

**Always allow** is a personal preference that applies everywhere you use Lovable, on the web, in Slack, and in Telegram. You can review or withdraw it under [**Account settings → Preferences → Agent permissions**](https://docs.lovable.dev/introduction/lovable-account-settings#agent-permissions), or in the connection's settings. For app connectors, the setting is **Agent approval for this connection**.

When Lovable sends work to a project, it asks for your approval with the same cards as Chats, **Project edit needs your approval** and **New project needs your approval**. See [Approve the handoff](https://docs.lovable.dev/features/chats.md#approve-the-handoff).

## Manage your connection

You can view, disconnect, or move your Telegram connection at any time from [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**).

### Check status and credit usage

Go to the **Telegram** section to see:

* Whether you are connected
* Which workspace you are connected to
* When the connection was created
* The credits used through this connection

### Move to another workspace

Each Telegram account is linked to a single Lovable workspace at a time. If you belong to multiple workspaces, you can move the link without disconnecting and reconnecting.

**1. Switch workspace**

In Lovable, switch to the workspace you want the bot to use.

**2. Open Telegram settings**

Find Telegram in [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**).

**3. Move the connection**

If your Telegram account is linked to a different workspace you're a member of, you'll see a **Connected elsewhere** badge, with information on which workspace it is connected to, and a **Move to \<workspace name>** option. Click it to reassign the link to the current workspace.

The Telegram settings show the new workspace. The bot immediately works in that workspace, with its projects, credits, and permissions. You do not need to link Telegram again.

### Disconnect

Find Telegram in [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**) and click **Disconnect**. The bot stops responding to messages. You can reconnect at any time.

## Limitations

* **Only Free and Pro workspaces.** Lovable in Telegram is not available on Business or Enterprise plans. If your workspace is on one of these plans, the Telegram option does not appear in your settings.
* **No plan mode.** A dedicated [plan mode](https://docs.lovable.dev/features/plan-mode.md) is only available in Lovable on the web. In Telegram, you can still plan your project conversationally. Describe what you want, and Lovable helps you think it through before building.
* **Direct messages only.** The bot does not respond in group chats, supergroups, or channels.
* **Text, images, voice messages, and text-based files only.** You can send text messages, images, voice messages, and text-based attachments (such as `.txt`, `.csv`, or `.json`). Lovable transcribes voice messages into your request. Videos, PDFs, and stickers are not supported.
* **One account per connection.** Each Telegram account links to one Lovable user, and each Lovable user links to one Telegram account.
* **Earlier messages are not guaranteed.** Lovable does not always remember earlier conversations, so repeat important context in new messages.
* **Database queries are read-only.** The bot cannot create, update, or delete records.

## Privacy and security

Lovable processes messages sent to the bot with your Lovable permissions, so it can only access projects and data you already have access to.

When you disconnect Telegram, Lovable loses access immediately and ignores any messages sent after that.

## Troubleshooting

> **The bot says my account is not linked**
>
> Find Telegram in [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**) and check if you are connected. Click **Connect to Telegram** if not connected already.

> **The link expired before setup**
>
> Connection links expire after 10 minutes. Click **Connect to Telegram** again to generate a new link.

> **The bot is not responding in a group chat**
>
> This is expected. The bot only responds to direct messages.

> **The bot is not responding to direct messages**
>
> Find Telegram in [Devices and apps](https://lovable.dev/settings/apps) (**Account settings → Devices & apps**) and confirm your connection. If you are connected and still do not receive responses, disconnect and reconnect, then try again.

> **The bot can't see some of my projects**
>
> The bot only sees projects in the workspace your Telegram account is linked to, and within that workspace, it only sees projects you personally have access to. If a project is missing, check these possible reasons in order:
>
> 1. **The project is set to restricted visibility.** Projects with [restricted project access](https://docs.lovable.dev/features/project-visibility.md) are only visible to their owner, so the bot cannot see projects owned by other workspace members that are set to restricted.
> 2. **Cross-project sharing is disabled.** If [cross-project sharing](https://docs.lovable.dev/features/cross-project-referencing.md#disabling-cross-project-sharing) is disabled at the workspace or project level, the bot cannot access those projects across the workspace.
> 3. **The project lives in a different workspace.** Each Telegram account links to one Lovable workspace at a time. If your projects are in another workspace you belong to, [move the connection](#move-to-another-workspace) to that workspace from **Account settings → Devices & apps**. Disconnect and reconnect only as a last resort.


## Related topics

- [Connect your app to Telegram](https://docs.lovable.dev/integrations/telegram.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Chat with Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md)
- [Lovable ChatGPT app](https://docs.lovable.dev/tips-tricks/chatgpt-app.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
