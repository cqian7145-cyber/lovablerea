# Chat with Lovable across your workspace
<!-- source: https://docs.lovable.dev/features/chats.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat with Lovable across your workspace

> Chats is where you work with Lovable outside a project: think through ideas, ask about your apps and workspace, use your connected tools, create files, talk by voice, and send work to a project when you are ready to build.

Chats is where you have personal conversations with Lovable outside your projects. Start a chat without opening a project, then bring in the projects, files, and connected tools you need. Your workspace's daily chat allowance covers these conversations first, so the dashboard's send button reads **Chat for free** while it lasts.

![The dashboard prompt box under the heading Got an idea, with Chat selected in the mode picker and a send button reading Chat for free.](https://mintcdn.com/lovable-f9060f1e/d7nFmH8-W9saY6mz/images/chats-dashboard-prompt-box.png?fit=max\&auto=format\&n=d7nFmH8-W9saY6mz\&q=85\&s=093520b2a0870ac925b90ca2bd694862)

Use a chat, for example, to:

* **Develop an idea** before you decide what to build, or choose between several directions.
* **Understand your workspace**: what each project does, what changed recently, what is worth improving, and where your plan and credits stand.
* **Check how an app is doing**: website traffic by channel, the data in its database, and, if you manage billing, its credit usage.
* **Work across projects**, comparing several apps or coordinating changes across them.
* **Get work done in your connected tools**: summarize your inbox, draft a Notion page, or open a Linear issue.
* **Use an app you built**: once the app is connected as a tool, ask it questions or update its records, such as finding late orders and marking them shipped.
* **Create content**: a brief, an analysis, a table, an image, or a short video.
* **Prepare a report from your data**: attach a spreadsheet or export and get a summary, a table, or a chart.
* **Research current information** on the web, with sources.

When you want something built or changed, Lovable sends your request to a project, where the work happens.

Chats is available in every workspace on all plans. Workspace editors, admins, and owners can start chats.

> [!NOTE]
>
> This is for chatting with Lovable across your workspace. You can think through ideas, work with your connected tools, and send work to any project you can edit from one place, without opening a project first.
>
> Want to discuss the app you are working on without leaving it instead? Use [Chat mode](https://docs.lovable.dev/features/chat-mode.md), the **Chat** option in the project chat's mode picker.

## Chat pricing and daily chat allowance

Chat usage follows its own pricing model, including a per-message price and a daily chat allowance. A chat message is priced on the work Lovable does to answer it, typically a fraction of a credit.

Free, Pro, and Business workspaces include a daily chat allowance that covers chat messages first. The allowance belongs to the workspace, so everyone's chat messages draw on the same daily pool. It resets every day at 00:00 UTC and does not roll over.

When the day's allowance is used up, chat messages keep the same per-message price and draw on your daily build credits, then your general credits.

Enterprise plans do not include a daily chat allowance. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs) for the full rules.

In a chat, the daily chat allowance covers conversation, research, connector queries, and the text files Lovable creates. Work the chat sends to a project, and images and videos Lovable generates in a chat, use build credits instead. See [Send work to a project](#send-work-to-a-project) and [Create files in a chat](#create-files-in-a-chat).

> [!NOTE]
>
> **Temporary offering, subject to change.** The current chat pricing model, including the per-message price and the daily chat allowance, applies through **October 31, 2026**. Pro and Business workspaces receive a larger daily chat allowance than Free workspaces. This pricing applies to messages in Chats and Chat mode, including messages sent through Slack or Telegram and requests made by voice.
>
> Build mode, Plan mode, image and video generation, and Cloud and AI usage follow their standard pricing and are not part of this offer.

## Start a chat

Each of the following starts a personal conversation that appears on the **Chats** page. Only you can open it, even if a teammate has its link.

* **Dashboard**: The dashboard prompt box opens in **Build** the first time, then remembers the mode you last used. Select **Chat** in the mode picker beside it. While your daily chat allowance lasts, the send button reads **Chat for free**.
* **Chats**: Open the **Chats** page at [lovable.dev/chats](https://lovable.dev/chats) or from the [sidebar](https://docs.lovable.dev/introduction/dashboard-overview.md#pinned-projects-and-recent-chats), then select **New chat**.
* **Project card**: Open a project's **⋯** menu on the dashboard, then select **Chat about this project**. The prompt box opens in **Chat** with the project attached and a suggested message that you can edit or send.
* **Mobile app**: Open the **Chats** tab in the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md) and start a new chat.

Lovable names a chat from its first message, typed or spoken. You can rename it at any time.

To explore without starting a build, say "Do not build anything yet." When you are ready, tell Lovable clearly to build or change the app.

## Ways to chat

A chat is one continuous conversation however you use it. Typed messages, dictated messages, and voice transcripts stay together in the same history. During a voice conversation, the call controls take the place of the prompt box, so you cannot type or dictate in that chat until the call ends.

* **Type** a message in the prompt box and send it.
* **Dictate**: Select the microphone button, **Transcribe**, or press **Option+V** on macOS or **Alt+V** on Windows and Linux. Lovable transcribes your speech into the prompt box so you can review and edit before sending.
* **Talk live**: Select the waveform button, **Start voice conversation**. In a chat, it appears in place of the send button while the prompt box is empty. On the dashboard, it appears in place of the dictation button when **Chat** is selected. Lovable listens and answers aloud. See [Have a live voice conversation](#have-a-live-voice-conversation).

### Have a live voice conversation

A voice conversation is a live, two-way call inside a chat. It uses the same context, connected tools, permissions, and project handoffs as typed messages.

> [!NOTE]
>
> This section is about talking to Lovable. Looking to add a spoken conversation to an app you build, so the people who use it can talk to it? See [Live voice models](https://docs.lovable.dev/features/ai-live-voice.md). Those are different features.

Select the waveform button, **Start voice conversation**, in a chat or on the dashboard with **Chat** selected. Your browser asks for microphone access the first time. Lovable answers aloud and saves the conversation as messages alongside your typed ones. To type in the chat again, end the call.

In a browser, you can have one voice conversation at a time. If you open another chat, the call continues in a small voice control, where you can return to it, mute your microphone, or end the call.

When Lovable needs your approval, for example to use a connector or send work to a project, review the card in the chat. Nothing you say out loud approves an action.

To finish, select **End voice conversation** in the chat or in the voice control, or ask Lovable to end the call.

> [!NOTE]
>
> OpenAI processes your voice and does not store the audio. Lovable saves a transcript to the chat. Avoid sharing passwords, secret keys, or other sensitive information.

Voice conversations are priced the same as typed messages and covered first by the daily chat allowance. If your workspace runs out of credits during a call, you can keep talking, and the call controls offer **Get credits**.

Voice conversations are available in Chats. The project chat supports dictation instead. See [Limitations](#limitations) for browser requirements, availability, and usage limits.

## Explore and create in a chat

Write to Lovable in plain language and describe the outcome you want, whether you type, dictate, or talk. Lovable uses your conversation and any projects, files, or tools you add as context, then answers in the chat, creates a file, or proposes [sending work to a project](#send-work-to-a-project). For example, ask which of your projects changed this week, or ask for a summary of a customer's recent emails before you reply.

```text wrap theme={null}
Compare three directions for a booking app for my studio and recommend one. Do not build anything yet.
```

```text wrap theme={null}
Read the spreadsheet I attached and give me a short report on which products had returns above 5%, with a table by month.
```

Lovable works within your permissions. It can list the projects you can see, but it reads a project's code and history, and sends work to it, only when you can edit that project.

### Add context

Select **+** (**Chat actions**) beside the prompt box to attach context to the message you are writing, or type `@` for the same list without **Attach files**:

* **Projects** adds workspace projects, up to 10 in one message.
* **Connectors** adds tools such as Notion, Linear, Slack, Gmail, GitHub, or Granola.
* **Your files** adds a file Lovable created in any of your chats, up to 10 in one message. Files you uploaded are not listed here.
* **Chats** adds another of your chats as context. Lovable can read the messages in that chat and can send it a message. The list shows your most recent chats, except this one.
* **Attach files** uploads files from your device, such as documents, spreadsheets, screenshots, images, presentations, or audio. Uploaded files belong to the message you send them with and do not appear in the **Context** panel.

Projects you add this way also appear in the chat's [Context panel](#manage-context-and-files) under **Projects**, and files from **Your files** appear under **Files**. They stay available to later requests until you remove them. Chats you add appear under **Chats**.

### Work with your other chats

Reference another of your chats to use what you discussed there. Type `@` and select the chat under **Chats**, or paste a link to the chat. Lovable can then read the messages in that chat, for example to pick up a decision you made there or to compare the conclusions of two chats. If you describe a chat instead of referencing it, Lovable finds it by its name.

You can also ask Lovable to send a message to another of your chats, or to start a new chat with a first task. For example, ask one chat to combine the results of two others, or start a separate chat for each app you are comparing.

* When Lovable sends a message, the conversation shows **Sent message to** with the chat's name. In the other chat, the message appears with the name of the chat it came from. The other chat does the work and can reply. The reply appears in your conversation in the same way.
* When Lovable starts a chat, the conversation shows **Started new chat** with its name. The new chat appears in your chat list. It starts with that first task only, without this chat's projects, files, or history.

Lovable can read and message only your own chats. The work each chat does is chat usage, covered first by the daily chat allowance, like any other message. See [Limitations](#limitations) for how many chats Lovable can start in one response and how many messages chats can exchange without a message from you.

### Use connected tools

Lovable reads from your connected tools without asking, and asks for your approval in the chat before it creates, sends, or changes anything through a tool. For tools from an MCP server, Lovable asks before every use unless the server marks the tool as read-only. To skip the approval for every tool from one connection, including tools the server adds later, select **Always allow all tools from this connection** on the approval card.

Connections follow their [sharing settings](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients). A connection you create from a chat with your own account starts as **Private**, which is sufficient for your own chats. A **Managed by Lovable** connection you create from a chat is shared with the workspace.

In a chat, Lovable uses the connections you have access to, with one exception: it does not use another member's connection to a personal account, such as their Gmail or Linear, even when they shared it with you. See [Can I use a connection a teammate shared with me?](#faq)

You can connect the tools your workspace makes available. Workspace admins set which connectors members can connect, and those [admin controls](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) apply in Chats as they do in projects.

Published Lovable apps with an [agent integration](https://docs.lovable.dev/features/agent-integrations.md#use-your-app-in-your-chats) can also become tools. Lovable charges their Cloud, AI, and third-party usage to the workspace that owns the app.

See [Connectors](https://docs.lovable.dev/integrations/introduction) for setup, supported tools, and MCP servers.

### Create files in a chat

Ask for the file you want, in plain language: a brief, an analysis, a table, an image, or a short video. What Lovable does depends on the format:

* **Text-based files**: Lovable creates documents, analyses, and tables in the chat as text-based files such as Markdown, CSV, or JSON. The message that produces them is chat usage, covered first by the daily chat allowance.
* **Images and short videos**: Lovable also creates these in the chat, but each generation uses build credits. Lovable asks for confirmation first, with a **Generate this image?**, **Edit this image?**, or **Generate this video?** card, and you can approve once or save separate permissions for image generation, image editing, and video generation. The charge shows as **Image generation** or **Video generation** in [Usage details](https://docs.lovable.dev/introduction/credits-and-usage.md#reading-the-chart).
* **PDF files, slide decks, spreadsheets with formulas, Word documents, and web pages**: These need a project. The chat cannot produce these formats itself, so Lovable creates or uses a project to generate the file. The project generates it as a build, which uses build credits, even though no app is built. The chat shows a card for the project, and the finished file opens beside the conversation, where you can preview and download it.

## Send work to a project

A chat does not edit project code itself. When you clearly ask Lovable to build or change an app, it sends your request to a project, in your own words. The project does the work, records it in its own history, and reports back to the chat. Lovable does not send work when you only describe an idea or agree with a suggestion.

The conversation is chat usage. After the handoff, the project's work is build usage, priced as [Build mode](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) or [Plan mode](https://docs.lovable.dev/features/plan-mode.md#how-plan-mode-messages-are-priced) work.

### Approve the handoff

You can send work only to projects you can edit. When approval is required, Lovable shows a card that summarizes the work and notes that it uses build credits.

For a new app, the **Create a new project?** card offers:

* **Always allow**: Creates the project and lets Lovable create future projects from any chat without asking again.
* **Allow once**, in the card's menu: Creates only this project.

With either option, the new project receives your request, not your whole conversation.

For an existing app, the **Edit \[project name]?** card offers:

* **Always allow**: Any project you can edit, from any of your chats.
* **Always allow for this project**: This project, from any of your chats.
* **Allow in this chat**: This project, in this chat only.

Select **Skip** on either card to leave the work unsent.

Lovable skips the edit card when a saved approval covers the project, when the project was created in this chat, or when your latest message has exactly one project attached through **Projects** or `@`. A project name typed in plain text does not count as an attachment, so the card still appears.

> [!WARNING]
>
> **Always allow** is a standing permission across your chats, on the web, in Slack, and in Telegram. Handoffs it covers begin without another card, every build still uses build credits, and it never gives Lovable access to a project you cannot edit. You can review or withdraw saved approvals under [**Account settings → Preferences → Agent permissions**](https://docs.lovable.dev/introduction/lovable-account-settings#agent-permissions).

### Follow the build

After the handoff, the chat shows **Sent work to** and the project's name, or a card for the new project. The project's preview opens beside the conversation when it is ready. If another project's preview is already open when you send work to an existing project, that preview stays.

The project builds while you continue chatting, and a follow-up from the chat sends it a new instruction.

Questions, plan approvals, and credit check-ins from the project appear as cards in the chat, and Lovable reports the result when the build finishes. To follow the work in detail, open the project. To stop the build from the chat, open the project's menu in the **Context** panel and select **Stop Lovable**.

In the project chat, Lovable marks the request **Sent from Chats**. You see the name of the chat it came from. Collaborators see only that it came from Chats and cannot open the chat.

### Plan, test, or publish

You can also ask for a project action that is not a direct build:

* Ask Lovable to plan the change in [Plan mode](https://docs.lovable.dev/features/plan-mode.md) when you want to review and approve the approach before implementation.
* Ask it to build in a [draft](https://docs.lovable.dev/features/drafts.md) when you want to test the change separately before accepting it into the project. You can also accept the draft from the chat.
* Ask it to [publish](https://docs.lovable.dev/features/publish.md) a project. Publishing follows the same permissions and workspace policies as publishing from the project itself.

## Manage context and files

Open the **Context** panel from the  button in the upper-right corner of a chat. The **Context** panel groups what this chat can use:

* **Projects** lists the projects you have referenced.
* **Files** lists files Lovable created in this chat and files you added from **Your files**.
* **Chats** lists the chats you have referenced and the chats this chat has messaged or started. Select a chat to open it.

### Projects

The **Projects** list shows the projects you have referenced. Items remain available to later requests until you remove them.

Select **Add context** in the panel to add an existing project, chat, or file from **Your files** without mentioning it in your message. When the panel already lists items, **Add context** is the **+** button at the top.

Open the **⋯** menu beside a project to manage it:

* **Stop Lovable** stops a build the chat started in that project. Shown only while the build is running.
* **Open in new tab** opens the project in the editor.
* **New draft** creates a [draft](https://docs.lovable.dev/features/drafts.md) of the project for work you want to test before accepting it. Available when you can edit the project.
* **Reference in chat** attaches the project to your next request.
* **View drafts** or **Hide drafts** shows or hides the project's drafts in the panel. Shown when the project has drafts.
* **Remove from context** stops Lovable from using the project in later requests without changing the project.

### Files

The **Files** list contains files Lovable created in this chat and files you added from **Your files**. Files generated through a project stay in that project and do not appear here.

Select a file to preview it. Open its menu to:

* **Reference in chat** to use it in your next request.
* **Download** it.
* **Version history** to open an earlier version.
* **Remove from context** to stop Lovable from using it in this chat. Lovable does not delete the file.

To use the file in another chat, select **+** (**Chat actions**) in that chat or type `@`, then select the file under **Your files**. To revise a file, ask Lovable in the chat, and it saves the revision as a new version.

For the formats a project can generate, such as PDF, Word, PowerPoint, and Excel files, and for the project's own **Files** tab, see [Generate files and analyze data](https://docs.lovable.dev/features/generate-files.md).

## Manage your chats

Every chat you start is listed in the sidebar and on the **Chats** page. This section covers how to see what a chat is costing, find and organize your chats, read their status, and use their menus.

### Track your allowance and usage

Lovable shows how much of the daily chat allowance is left in several places:

* The **Chat** option in the mode picker shows a **Free** badge while the workspace has daily chat allowance remaining. The ring in the badge shows how much of today's allowance is left and empties as you chat. Hold the pointer over the badge to read the percentage left and when it resets, for example **95% of free chat left (resets 2:00 AM)**, with the time shown in your local time zone.

  ![The dashboard mode picker open on Chat with a Free badge, and a tooltip reading 95% of free chat left (resets 2:00 AM). The send button reads Chat for free.](https://mintcdn.com/lovable-f9060f1e/d7nFmH8-W9saY6mz/images/chats-mode-picker-free-badge.png?fit=max\&auto=format\&n=d7nFmH8-W9saY6mz\&q=85\&s=96aaf3c0635a974d6329e3b273dea769)
* Inside a chat, select its title at the top. The bottom of the menu shows the allowance state: **Chat for free** before you use any of today's allowance, then the percentage left, for example **97% of free chat left**, and **Using credits to chat** after it runs out. The workspace's remaining credits appear below, for example **5 daily credits left**. If you have permission to view billing, select that line to open the usage breakdown.
* The **More options** menu on a Lovable reply shows **Chat time** and **Chat credits used** for the conversation. **Chat credits used** reads **Free** when the allowance covered the reply. When the reply also sent work to a project, **Build time** and **Build credits used** show the build's cost separately, so you can see what the allowance covered and what used build credits.

  ![The More options menu on a Lovable reply showing Copy message link, Chat time 5s, and Chat credits used with a Free badge.](https://mintcdn.com/lovable-f9060f1e/d7nFmH8-W9saY6mz/images/chats-reply-menu-chat-credits.png?fit=max\&auto=format\&n=d7nFmH8-W9saY6mz\&q=85\&s=c19ab324b685fa232d12ab662a1513db)
* [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) shows the percentage of today's allowance left in the [**Daily chat credits** row](https://docs.lovable.dev/introduction/credits-and-usage.md#view-your-credit-balance).
* [**Workspace settings → Plans & credit usage → Usage details**](https://lovable.dev/settings/usage-breakdown) shows chat usage over time under **Chat**. Chat usage covered by the allowance or your daily build credits does not appear there. See [Reading the chart](https://docs.lovable.dev/introduction/credits-and-usage.md#reading-the-chart).

You can continue chatting after the daily chat allowance runs out. Lovable shows **Chats may now use your credits**, and further chat usage draws on your daily build credits, then your general credits, at the same per-message price.

If the workspace has no credits available, Lovable shows **Chat credits unavailable** and pauses chats until an admin or owner adds credits or the daily chat allowance resets. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs).

### Find and organize chats

Open a conversation from **Recent chats** or **Pinned** in the sidebar. To see all your chats, select **See all chats** when the recent list has more chats than fit, select the **Chats** icon in the collapsed sidebar, or visit [lovable.dev/chats](https://lovable.dev/chats).

Inside a chat in a desktop browser, the sidebar follows your saved open or closed preference. Hover the top-left menu icon to reveal it temporarily, or click the icon to keep it open. With no saved preference, it starts hidden. The desktop app keeps its sidebar docked.

On the **Chats** page, pinned chats appear first. Use **Search chats...** to find a chat by name, and the filter next to it to show **All** or **Unread** chats. Search matches chat names, not message text.

Pin a chat for quick access, rename it, or give it an icon, from either of the [chat menus](#chat-menus). See [Pinned, projects, and recent chats](https://docs.lovable.dev/introduction/dashboard-overview.md#pinned-projects-and-recent-chats) for how the sidebar organizes your chats.

### Chat status

A dot on a chat's row shows the chat's state: at the right edge in the sidebar, and next to the title on the **Chats** page. In the sidebar, hold the pointer over the row to read the label.

| Dot | Label | Meaning |
| :- | :- | :- |
| Gray, pulsing | **Working…** | Lovable, or a project the chat sent work to, is working |
| Orange | **Waiting for approval** | Lovable has paused until you act: it asked you a question, or a project the chat sent work to needs your approval |
| Red | **Failed** | Lovable's work in that chat, or in the project it sent work to, failed. Open the chat to see what happened |
| Blue | **Unread** | A reply you have not opened yet, or a chat you marked as unread |

On the **Chats** page, chats waiting for you are also grouped at the top under **Waiting for you**, and the rest of the list appears under **All chats**. Open a chat to answer or decide. The **Unread** dot clears when you open the chat. The other dots clear on their own as the work continues or finishes.

### Chat menus

Open a chat's **⋯** menu in the sidebar or on the **Chats** page, or select the chat's title inside the chat, to manage it:

* **Pin chat** adds the chat to **Pinned** in the sidebar and keeps it at the top of the **Chats** page. **Unpin chat** removes the pin.
* **Rename** gives the chat a new name. Inside a chat, you can also press **F2**, or **Cmd+Shift+.** on macOS and **Ctrl+Shift+.** on Windows and Linux.
* **Change icon** gives the chat a different icon.
* **Mark as unread** shows the blue unread dot on the chat again. Available in the **⋯** menu only.
* **Copy link** copies the chat's web address so you can open it on another device or save it in your notes. The link opens only for you and does not give a teammate access to the chat. Available in the **⋯** menu only.
* **Go to dashboard** leaves the chat and opens the dashboard. Available in the title menu only.
* **Delete** removes the chat after you confirm in the **Delete chat** dialog.

> [!WARNING]
>
> Deleting a chat is permanent and stops work still running inside that chat. Work already sent to a project remains in the project.

## Limitations

These limits apply whether you type, dictate, or talk.

* A typed message can contain up to 50,000 characters. Any message can reference up to 10 projects and 10 files.
* In very long conversations, Lovable can lose access to the oldest context. Keep important source material in [workspace instructions](https://docs.lovable.dev/features/knowledge.md) or in a file.
* A chat cannot directly edit project files, revert a project, or apply visual edits.
* Lovable can start up to 3 new chats in one response. Two chats can exchange up to 3 messages in a row without a message from you. When you write in either chat, the count starts again.
* Workspace skills and goals (`/goal`) are not available in Chats. Open a project for those workflows.
* Voice conversations need microphone permission, a stable internet connection, and Chrome, Safari, or Edge. They are unreliable in Firefox.
* Each person can use up to 4 hours of voice per day, and the limit resets at 00:00 UTC. In a browser, you can have one voice conversation at a time.
* Voice conversations are available in Chats. The project chat supports dictation instead.
* Voice conversations and dictation are not available in workspaces that require all AI processing to remain in the European Union.

## FAQ

Common questions about working in Chats.

> **What is the difference between Chats and Chat mode?**
>
> Both let you discuss ideas and ask questions at chat pricing, and both draw on the same daily chat allowance. The difference is where the conversation lives and what Lovable starts with.
>
> Chats live outside your projects. You start one from the dashboard with **Chat** selected or at [lovable.dev/chats](https://lovable.dev/chats). Lovable starts with your workspace: the projects, files, and connected tools you can access and add.
>
> Only you can open a chat. When something needs building, Lovable sends the work to a project through a handoff, and the build uses build credits.
>
> [Chat mode](https://docs.lovable.dev/features/chat-mode.md) is the **Chat** option in a [project chat](https://docs.lovable.dev/features/projects/chat.md)'s mode picker. Lovable starts with the project you have open, including its code, preview, and history, and you can [add other projects](https://docs.lovable.dev/features/cross-project-referencing.md) as context.
>
> Everyone with access to the project sees the conversation. When something needs building, Lovable shows a **Start building** card, and selecting **Build** switches to Build mode.
>
> To define a project change before implementation, use [Plan mode](https://docs.lovable.dev/features/plan-mode.md). To make the change, use [Build mode](https://docs.lovable.dev/features/agent-mode.md).

> **How many messages does the daily chat allowance cover?**
>
> The allowance has no fixed message count. Each request uses an amount based on the work required, so a short follow-up generally uses less than a large investigation across several sources.

> **Can my teammates see or open my chats?**
>
> No. Chats are private, including from workspace admins and owners, and you cannot share a chat or make it public. **Copy link** copies a link that works only for you.
>
> Teammates can see work sent to shared projects, but they cannot open the chat that requested it. To collaborate on an outcome, send the work to a shared project, or download and share a file created in the chat.

> **Is what I write in a chat used to train AI models?**
>
> What you write in a chat, and the transcript of a voice conversation, is customer data under Lovable's [training data policy](https://docs.lovable.dev/features/business/data-opt-out.md). Business and Enterprise workspace data is excluded from model training by default. On Free and Pro plans, you can opt out in your account settings.

> **Can I use a connection a teammate shared with me?**
>
> It depends on the connector. In a chat, Lovable uses the connections you have access to, except a connection to a personal account that another member created, such as their Gmail, Google Drive, Google Calendar, Outlook, GitHub, or Linear. Lovable does not use those in your chats even when the member shared them with you.
>
> A teammate's shared connection to a workspace tool, such as Slack, Notion, HubSpot, or Salesforce, works in your chats. So does a **Managed by Lovable** connection set up as shared.
>
> In a project, sharing works as usual for both kinds. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).

> **Can I use Chats on my phone?**
>
> Yes. Use the **Chats** tab in the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md), or open [lovable.dev/chats](https://lovable.dev/chats) in your phone's browser. Voice conversations also work on phones.

> **Why did my build credits decrease while I was chatting?**
>
> The chat sent work to a project, generated or edited an image, generated a video, or continued after the daily chat allowance was used up. Open the response's **More options** menu and [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) to review the charge.

> **Why does Lovable not follow something I said in another chat?**
>
> Lovable can recall preferences you stated in earlier chats, but only for you, and not in every case. To use a specific chat, [reference it](#work-with-your-other-chats) with `@` under **Chats**. Put durable instructions and shared product context in [workspace instructions](https://docs.lovable.dev/features/knowledge.md) so they apply across chats and projects.

> **Can one chat work with another chat?**
>
> Yes. Type `@` and select a chat under **Chats** to reference it, and Lovable can read what you discussed there. You can also ask Lovable to send a message to another of your chats, or to start a new chat with a first task. The other chat does the work and can reply, and the reply appears in your conversation. The work each chat does is chat usage, like any other message. See [Work with your other chats](#work-with-your-other-chats).

## Troubleshooting

If Lovable shows one of these messages in a chat, this is what it means and what to do.

> **Chat credits unavailable**
>
> Your workspace has used up today's daily chat allowance and has no daily build credits or general credits to draw on.
>
> Add credits, ask a workspace admin or owner to add them, or wait for the allowance to reset at 00:00 UTC. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

> **Chat credit limit reached**
>
> Your workspace or your member credit limit has been reached, so chats are paused even if the workspace still has credits.
>
> A workspace admin or owner can raise the limit. If you cannot manage billing, ask one of them to do it. See [Can I limit how many credits members can spend?](https://docs.lovable.dev/introduction/credits-and-usage.md#can-i-limit-how-many-credits-members-can-spend)

> **Couldn't send the work to the project**
>
> Lovable could not send the work to the project. Check that the project still exists and that you can still edit it, then ask again. If the workspace has run out of credits, or a credit limit blocks builds, Lovable keeps the request in the chat and tells you why.

> **This chat has been deleted**
>
> The chat was deleted in another tab or on another device, so you cannot send anything more in it. If you had an unsent draft, select **Copy draft** to use it in a new chat.

> **This chat is in another workspace**
>
> The chat you opened belongs to a different workspace you are a member of. Select **Switch to \[workspace name]** to open it there.

> **Microphone access is needed for voice conversations. Enable it in your device settings.**
>
> Your browser or device blocked the microphone. Allow microphone access for lovable.dev in your browser's site settings, or in your device's privacy settings, then start the voice conversation again.

> **A voice conversation is already running. End it before starting another.**
>
> You have a call open in another chat. Return to that chat, or end the call from the voice control, then start the new conversation.

> **You've reached your voice time limit. It resets at \[time]. You can keep chatting by typing below.**
>
> You have used your 4 hours of voice for today. The message shows when the limit resets. Until then, keep chatting by typing.

> **Voice conversation dropped. Resume it, or continue by typing below.**
>
> The connection to the call was lost, most often after a network change. Select **Resume** to reconnect, or continue by typing. If drops repeat in Firefox, switch to Chrome, Safari, or Edge.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Manage people across the workspaces in your organization](https://docs.lovable.dev/features/organization-people.md)
- [Chat with Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
