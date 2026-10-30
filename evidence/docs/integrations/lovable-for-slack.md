# Chat with Lovable in Slack
<!-- source: https://docs.lovable.dev/integrations/lovable-for-slack.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat with Lovable in Slack

> Chat with Lovable directly in Slack. Mention @Lovable in a channel or send it a DM to create projects, update your apps, and get answers about them.

Lovable in Slack brings Lovable into the place your team already works. Mention `@Lovable` in a channel or send it a direct message to create new projects, make changes to existing ones, and ask questions about the apps in your workspace, without leaving Slack.

> [!NOTE]
>
> This is for chatting with Lovable inside Slack. You can build and manage your Lovable projects by talking to Lovable in channels and direct messages.
>
> Want your Lovable app to send Slack messages instead? Use the [Slack connector](https://docs.lovable.dev/integrations/slack.md). To let teammates mention or message an app you built, [add your app to Slack as an agent](https://docs.lovable.dev/integrations/slack.md#add-your-app-to-slack-as-an-agent).

It works with the same Lovable workspace you use on the web: the projects, permissions, and credits are shared, so a project you start in Slack you can continue at [lovable.dev](https://lovable.dev) and vice versa. The conversation itself stays in Slack. It is priced like messages in [Chats](https://docs.lovable.dev/features/chats.md), and it does not appear in [Chats](https://docs.lovable.dev/features/chats.md) on the web.

Lovable in Slack is available on all plans.

## What you can do

* Create a new project from a conversation: `@Lovable build us a tool to track team standup notes`
* Update an existing app, and publish the changes if you have permission to publish that project: `@Lovable add CSV export to the expenses dashboard`
* Ask questions about your workspace's projects: what changed recently, what a project does, what's in it
* Ask about the data inside your apps: with an expense tracker built on Lovable, `@Lovable what did we spend on travel this month?` posts the answer into the thread
* Get answers from your workspace's [connected tools](https://docs.lovable.dev/integrations/introduction): with connectors like Linear or Notion set up, Lovable can pull in context from them when it answers
* Share files and images with your request: attach a screenshot or a photo of a whiteboard sketch and ask Lovable to build from it
* Get generated files back in the thread: images, videos, and documents Lovable produces arrive as native Slack uploads, not links
* Collaborate in a channel, where several people iterate on a shared app together in one thread
* Use DMs for personal work, like planning and brainstorming an idea before you build it
* Get answers where your team already talks, instead of switching tools and pasting links

## How it works

Lovable replies in a thread on the message that mentioned it, shows its progress while it works, and keeps the conversation going there. You need to mention `@Lovable` on each new request in a channel. In a DM you can write to it directly.

When you start a conversation, Lovable reads recent messages in the channel or thread for context, so you don't have to re-explain what your team was discussing.

### Looking up information in your Slack workspace

When it helps with your request, Lovable can also look up information in your Slack workspace. This works for every workspace with the Slack app installed, and no extra setup is needed. Lovable can:

* Search messages across your workspace's public channels
* List public channels and read a channel's topic, purpose, and member list
* Read a channel's pinned messages, bookmarks, and canvas
* Look up teammates by name or email to attribute messages correctly
* Follow a Slack message link you share and read the message it points to

Outside the conversation it's replying in, Lovable can only read public channels. It never reads private channels, direct messages, or group messages it isn't part of. The one exception is content you share yourself: when you forward a message to Lovable, it reads the forwarded content, wherever the message came from. Slack Connect channels aren't supported. Reading a public channel's message history still requires Lovable to be invited to that channel.

### Reacting and attaching files

Lovable can also act in the conversation as part of a reply:

* **React with an emoji.** Ask Lovable to add an emoji reaction to a message, including your workspace's custom emoji. By default it reacts to the message that started the thread.
* **Read reactions on a message.** Lovable can look up who reacted to a message and with which emoji, so you can ask questions like "who hasn't reacted with a checkmark yet?"
* **Attach generated files.** When Lovable produces an image, video, or document as part of a request, it attaches the file to its reply as a native Slack upload with Slack's own previews and playback, instead of a link that expires. For visual changes, it can also attach a screenshot or recording of what it built without being asked. Supported documents are PDFs, CSVs, Markdown, plain text, JSON, and Office files (`.xlsx`, `.docx`, `.pptx`). HTML and SVG files aren't attached.

Attachments only go to the conversation Lovable is replying in, and every attachment is checked against the requester's project permissions before it's uploaded. Reactions follow the same rules as reading: the current conversation, plus public channels.

> [!NOTE]
>
> If you connected Slack on or after August 24, 2026, it already has every permission these features need. If your workspace was connected before that date, on requests that need the newer permissions (reactions, message search, pins, bookmarks, and custom emoji) Lovable replies that a Slack workspace admin needs to re-authorize the app, and generated files arrive as links instead of native uploads. To fix this, disconnect and reconnect Slack from [**Workspace settings → Slack**](https://lovable.dev/settings/slack).

Everything Lovable does in Slack runs through your Lovable workspace. It can only see and change projects that the person talking to it has access to, and actions like publishing follow the same permissions and workspace policies as on the web. Messages to Lovable in Slack are chat messages, priced like messages in [Chats](https://docs.lovable.dev/features/chats.md).

Chat usage follows its own pricing model, including a per-message price and a daily chat allowance. A chat message is priced on the work Lovable does to answer it, typically a fraction of a credit.

Free, Pro, and Business workspaces include a daily chat allowance that covers chat messages first. The allowance belongs to the workspace, so everyone's chat messages draw on the same daily pool. It resets every day at 00:00 UTC and does not roll over.

When the day's allowance is used up, chat messages keep the same per-message price and draw on your daily build credits, then your general credits.

Enterprise plans do not include a daily chat allowance. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs) for the full rules.

Usage is counted against the person who sent the message. Work Lovable sends to a project from Slack is a build and uses build credits.

A message that only thanks Lovable is the exception: Lovable answers with a thumbs-up (👍) reaction instead of a reply, and the message doesn't use credits. A message that thanks Lovable and also asks for something uses credits as usual.

When a request uses a connected tool to change something, like creating a calendar event, Lovable first posts an approval prompt in the thread. You can select **Allow once** or **Skip**. Depending on the tool, the prompt can also offer **Allow for this task**, **Allow in this thread**, and **Always allow for me**, which applies to that specific tool. For a tool from a [chat connector](https://docs.lovable.dev/integrations/chat-connectors.md#how-chat-connections-work), the prompt can also offer **Always allow this connection**, which skips the approval for every tool from that connection, including tools the server adds later. Some approvals need more detail than buttons can carry, and those show a **Review in Lovable** button instead.

### Personal and workspace scope

Where you talk to Lovable determines what it works with:

| | Direct messages | Public and private channels |
| - | - | - |
| Scope | Personal | Workspace |
| Projects and connectors | Yours, plus what the workspace shares | Workspace-shared only |
| Typical use | Your own projects, ideas, and questions | Collaborating on shared apps |

Private channels are treated the same as public channels: people can be added to them later and see the history, so Lovable treats anything in a channel as workspace-level, not personal.

## Set up Lovable in Slack

A workspace admin connects the Slack workspace once. Teammates don't need to do anything after that: Lovable recognizes them automatically the first time they talk to it.

You can connect from Lovable's settings or install from the Slack Marketplace. Both create the same connection between your Slack workspace and your Lovable workspace.

### Connect from Lovable

A Lovable workspace owner or admin (anyone who can manage integrations) connects Slack:

**1. Open the Slack settings**

In Lovable, go to [**Workspace settings → Slack**](https://lovable.dev/settings/slack). You can also reach it from the **Slack** card in **Account settings → Devices & apps** by selecting **Set up**.

**2. Review what Lovable can access**

The page shows what Lovable can do in Slack and who sees what in channels versus DMs. Check **I understand what Lovable can access in Slack and where its replies appear** to continue.

**3. Connect**

Select **Connect Slack**. A Slack authorization window opens.

**4. Approve the permissions**

Review the requested permissions and approve them. You may need a Slack admin's approval, depending on how your Slack workspace manages app installs.

**5. Verify the connection**

When the connection completes, the Slack workspace appears under **Connected Slack workspaces**.

### Install from the Slack Marketplace

You can also start from Slack:

**1. Add Lovable to Slack**

On the Lovable listing in the Slack Marketplace, select **Add to Slack** and authorize it for your Slack workspace.

**2. Open the link Lovable sends you**

Lovable sends you a direct message in Slack with a link to finish connecting. The link stays valid for 7 days, and reinstalling the app from the listing sends a new one.

**3. Pick the Lovable workspace**

The link takes you to Lovable, where you log in (or create an account) and select the Lovable workspace to connect. You need to be an owner or admin of that Lovable workspace.

Lovable doesn't respond in Slack until you finish connecting.

A Lovable workspace connects to exactly one Slack workspace, and a Slack workspace connects to exactly one Lovable workspace. If the Slack workspace is already connected to a different Lovable workspace, the connection is refused. To connect a different Slack workspace, disconnect the current one first.

### How teammates are recognized

Most teammates don't need to do anything: Lovable recognizes them automatically by their verified Slack email the first time they talk to it, as long as that email matches their Lovable account in the connected workspace. Anyone Lovable can't match this way (a different email, or a Slack guest) gets a prompt, visible only to them, to link their Lovable account once. Either way, projects and credits stay with the right person, and Lovable acts with that person's permissions.

Teammates who aren't members of the Lovable workspace can't use Lovable in that Slack workspace. Ask a workspace admin to invite them to the Lovable workspace first.

## Using Lovable in Slack

You can talk to Lovable in three places: channels, direct messages, and the Slack AI assistant view. Each suits a different kind of work.

Lovable's App Home tab in Slack shows a short guide with example prompts and a **Message Lovable** button that opens a direct message with it.

### In channels

Mention `@Lovable` with your request. Lovable answers in a thread, and you continue the conversation there.

```text wrap theme={null}
@Lovable add Irish VAT support to our expenses app, and show the VAT amount as a separate line on each receipt
```

You can invite Lovable to a channel like any other Slack app. If you mention it in a channel it hasn't joined yet, invite it right away and it responds to your request.

### In direct messages

DM Lovable directly, no mention needed. DMs are the best place for personal work and questions:

```text wrap theme={null}
I'm thinking about a simple tool for tracking freelance invoices. What would you suggest as a first version?
```

You can also forward a Slack message to Lovable in a DM, and it reads the forwarded message as part of your request.

### In the Slack AI assistant view

On paid Slack plans, Lovable also appears in the Slack AI assistant view, so you can keep a side conversation open while you work. Mentions and DMs work on all Slack plans, including the free plan.

## Permissions and data access

Lovable requests these Slack permissions:

| Permission | Why Lovable needs it |
| - | - |
| Read messages and mentions (`app_mentions:read`, `channels:history`, `groups:history`, `im:history`, `mpim:history`) | Know when you're talking to it and read the conversation it's replying in |
| See channels and people (`channels:read`, `groups:read`, `im:read`, `mpim:read`, `users:read`, `users:read.email`) | List channels, show names correctly, and recognize teammates by their verified email |
| Send messages (`chat:write`, `chat:write.public`, `im:write`, `assistant:write`) | Reply to you in threads, DMs, and the assistant view |
| Work with files (`files:read`, `files:write`) | Read files you attach to requests, and upload files it generates |
| View and add emoji reactions (`reactions:read`, `reactions:write`, `emoji:read`) | See who reacted to a message, and react when you ask it to, including with custom emoji |
| Read pins and bookmarks (`pins:read`, `bookmarks:read`) | Look up a channel's pinned messages and bookmarks when a request needs them |
| Search public messages (`search:read.public`) | Search messages in public channels when a request needs it |
| Show link previews (`links:read`, `links:write`) | Preview `lovable.app` links your team shares in Slack |

Lovable takes part only in conversations you bring it into: channels it has been invited to, threads where it's mentioned, and its own DMs. When a request needs it, Lovable can also search and read your workspace's public channels, as described in [Looking up information in your Slack workspace](#looking-up-information-in-your-slack-workspace). It never reads private channels, group messages, or DMs it isn't part of, apart from messages you forward to it yourself.

Conversations Lovable takes part in are stored by Lovable to provide the service and for support and debugging. They're never used to train AI models. To request deletion, contact [privacy@lovable.dev](mailto:privacy@lovable.dev).

## Managing the connection

Workspace owners and admins manage connected Slack workspaces from the same settings page used for setup.

### Disconnect a Slack workspace

A workspace owner or admin can disconnect at any time:

**1. Open the Slack settings**

In Lovable, go to [**Workspace settings → Slack**](https://lovable.dev/settings/slack).

**2. Disconnect**

Under **Connected Slack workspaces**, select **Disconnect** next to the Slack workspace.

**3. Confirm**

Confirm in the **Disconnect Slack workspace** dialog.

After disconnecting, your team can no longer talk to Lovable from that Slack workspace, and Lovable deletes the installation data. Your Lovable projects are unaffected. Reconnecting requires going through the authorization flow again.

Removing the Lovable app from the Slack side (in the Slack app-management settings) has the same effect.

## Limitations

* In channels, every request needs an `@Lovable` mention. Lovable doesn't respond to messages that don't mention it.
* There are no slash commands. You talk to Lovable in plain messages.
* Lovable doesn't work in Slack Connect channels (channels shared with external organizations).
* The Slack AI assistant view requires a paid Slack plan.

## FAQ

> **Which Slack plans work with Lovable?**
>
> Mentions and direct messages work on all Slack plans, including the free plan. The Slack AI assistant view requires a paid Slack plan.

> **Who can install Lovable in Slack?**
>
> On the Lovable side, workspace owners and admins (anyone who can manage integrations). On the Slack side, a Slack admin or anyone allowed to install apps in your Slack workspace.

> **What can Lovable read in Slack?**
>
> It reads the conversations it's part of: channels it has been invited to, threads where it's mentioned, and direct messages with it. When a request needs it, it can also search and read public channels in your workspace. It never reads private channels, group messages, or DMs it isn't part of, apart from messages you forward to it yourself.

> **Do messages in Slack use credits?**
>
> Yes, with one exception. Messages to Lovable in Slack are chat messages, priced on the work Lovable does to answer them and covered first by your workspace's [daily chat allowance](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs), then by your credits, counted against the teammate who sent them. Work Lovable sends to a project uses build credits. When a message only thanks it, Lovable answers with a thumbs-up (👍) reaction instead of a reply, and the message doesn't use credits. A message that thanks Lovable and also asks for something uses credits as usual.

> **How do teammates connect their accounts?**
>
> Most don't have to do anything. Lovable recognizes teammates automatically by their verified Slack email the first time they talk to it. Anyone it can't match gets a one-time prompt to link their Lovable account. Projects and credits stay theirs.

> **Can I connect more than one Slack workspace?**
>
> No. Each Lovable workspace connects to one Slack workspace, and each Slack workspace connects to one Lovable workspace. To switch to a different Slack workspace, disconnect the current one first.

> **Does Lovable work in private channels?**
>
> Yes, once it's invited. Note that Lovable treats private channels like public ones: anything it works with there is workspace-level, because channel members can change over time.

> **Does Lovable work in Slack Connect channels?**
>
> No. Channels shared with external organizations aren't supported.

> **Is my Slack data used to train AI models?**
>
> No. Conversations Lovable takes part in are stored to provide the service and for support and debugging, and are never used for model training. Contact [privacy@lovable.dev](mailto:privacy@lovable.dev) for deletion requests.

> **What's the difference between this and the Slack connector?**
>
> Lovable in Slack is Lovable itself in your Slack workspace: you talk to it and it builds for you. The [Slack connector](https://docs.lovable.dev/integrations/slack.md) is for apps you build with Lovable that need to read or post to Slack themselves, and it also covers [adding an app you built to Slack as its own agent](https://docs.lovable.dev/integrations/slack.md#add-your-app-to-slack-as-an-agent).

> **How do I uninstall?**
>
> Disconnect from [**Workspace settings → Slack**](https://lovable.dev/settings/slack) in Lovable, or remove the Lovable app from your Slack workspace. Either way, Lovable deletes the installation data, and your projects in Lovable are unaffected.

## Troubleshooting

> **Lovable doesn't respond in a channel**
>
> Check that Lovable has been invited to the channel and that your message mentions `@Lovable`. If Lovable still doesn't respond, confirm that your Slack workspace is connected under [**Workspace settings → Slack**](https://lovable.dev/settings/slack) in Lovable, and that you're a member of the connected Lovable workspace.

> **Lovable says I need to link my account**
>
> Follow the link Lovable sends you to connect your Lovable account. If you don't have one, or you're not a member of the Lovable workspace connected to this Slack workspace, ask a workspace admin to invite you first. If every teammate is asked to link their account, including people whose emails match, your Slack workspace was connected before Lovable could recognize teammates by email. An admin can fix this by disconnecting and reconnecting Slack.

> **Lovable says a Slack workspace admin must re-authorize the app**
>
> Your Slack workspace was connected before August 24, 2026, so it's missing permissions that newer features need, such as reactions, message search, and native file uploads. A workspace owner or admin can fix it by disconnecting and reconnecting Slack from [**Workspace settings → Slack**](https://lovable.dev/settings/slack), then approving the updated permissions in Slack.

> **"Failed to connect Slack. Please try again."**
>
> The authorization didn't complete. Try connecting again from [**Workspace settings → Slack**](https://lovable.dev/settings/slack). If your Slack workspace requires admin approval for new apps, ask a Slack admin to approve Lovable, then retry.

> **The Connect Slack option is unavailable**
>
> Only members who can manage integrations (workspace owners and admins) can connect Slack, and the button stays disabled until you check the acknowledgment above it. If you're not an admin, ask a workspace admin to connect it.

If none of these solve it, email [support@lovable.dev](mailto:support@lovable.dev).


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Chat with Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
