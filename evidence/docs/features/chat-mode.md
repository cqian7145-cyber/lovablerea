# Discuss your app in Chat mode
<!-- source: https://docs.lovable.dev/features/chat-mode.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Discuss your app in Chat mode

> Chat mode is the Chat option in the project chat. Discuss the app you have open and decide what to change without changing any code. Each message is priced as a chat message, covered first by the daily chat allowance.

> [!TIP]
>
> **Choose a mode**
>
> The project chat has three modes:
>
> * **Chat mode** → discuss your app and possible changes, without a plan or code changes
> * [**Plan mode**](https://docs.lovable.dev/features/plan-mode.md) → investigate and write a plan you edit and approve before building
> * [**Build mode**](https://docs.lovable.dev/features/agent-mode.md) → implement changes and verify the outcome
>
> Chat mode helps you decide what you want. Plan mode defines how to build it. Build mode changes the app. You can switch between them at any time, and the conversation carries across all three.

> [!NOTE]
>
> This page is about Chat mode, the **Chat** option in the project chat. To chat with Lovable outside a project, use [Chats](https://docs.lovable.dev/features/chats.md).

## Overview

Chat mode is Lovable's conversation mode, designed for discussing your project without changing its code. It is the **Chat** option in the [project chat](https://docs.lovable.dev/features/projects/chat.md), described in the mode picker as **Ask anything, explore ideas**. Lovable starts with the project you have open and reads its code, files, and data to answer. You can ask how the app works, talk through a change, compare options, or ask Lovable to outline an approach in prose. Nothing you discuss changes your code.

Each Chat mode message is priced as a chat message, on the work Lovable does to answer it, typically a fraction of a credit. Your workspace's daily chat allowance covers it first. See [How Chat mode messages are priced](#how-chat-mode-messages-are-priced).

## What Chat mode is for

Use Chat mode to talk through your project before you decide what to build:

* Ask how a part of your app works before you change it
* Talk through a feature idea and decide whether it is worth building
* Investigate an error or unexpected behavior and find the cause
* Compare two approaches and understand what each one involves
* Get a second opinion on a design, a flow, or a piece of copy
* Ask a general question about building with Lovable while you work
* Check a fact in your app's data, such as whether an order was recorded

Many Chat mode conversations end with an answer or a decision. When you decide on a change, [switch to Plan or Build](#switch-to-plan-or-build).

## How to use Chat mode

### Activate Chat mode

Open the mode picker next to the chat input, which shows the current mode, and select **Chat**. You can also cycle through Build, Chat, and Plan with **Option+P** (Mac) or **Alt+P** (Windows/Linux). Then write what you want to discuss. Lovable may ask a clarifying question when your message could mean several things.

**Ask about your app**

```text wrap theme={null}
How does the checkout flow work today? Walk me through what happens from the moment someone taps "Buy" to the order appearing in the admin view.
```

**Explore an idea**

```text wrap theme={null}
I'm thinking of adding a loyalty program: one stamp per purchase, a free coffee at ten. What would that take in this app, and is there a simpler version worth trying first?
```

**Investigate a problem**

```text wrap theme={null}
Customers with three or more items say the total comes out lower than the prices add up to. What's going on?
```

**Get a second opinion**

```text wrap theme={null}
The onboarding has four screens before someone sees the app. Is that too many? Which ones could merge, and what would we lose?
```

### Work with project context

Lovable answers from your project, so you do not need to describe your app before you ask about it. In Chat mode, Lovable can read:

* Your project's code and files
* Your app's data, when [built-in backend](https://docs.lovable.dev/features/cloud) is connected
* The conversation so far, including changes made in Build mode
* Other projects in your workspace that you reference
* Your connected tools, such as Slack, Notion, or Linear

To reference a specific file, type `@` and select it, or use **Reference file in chat** in the [code editor](https://docs.lovable.dev/features/code-mode.md). To add another project as context, type `@` and select it, or ask for it by name. [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md) is read-only and follows your workspace permissions.

[Connectors](https://docs.lovable.dev/integrations/introduction) work in Chat mode as they do in Build mode. Lovable reads from a connected tool without asking, and asks for your approval before it creates, sends, or changes anything through the tool, unless you saved an **Always allow** answer for that tool.

### What Chat mode does not do

Chat mode never changes your project's code or data. While Chat mode is active, Lovable does not:

* Create or edit project files
* Change data in your app's database or run database migrations
* Generate or edit images and videos
* Enable the built-in backend, user authentication, or email sending for your project
* Publish your app
* Create a plan in the Plan view

Chat mode can outline an approach in the conversation, with the steps in build order, the parts of the app involved, and the trade-offs, but it does not create an editable plan in the Plan view. Switch to [Plan mode](https://docs.lovable.dev/features/plan-mode.md) when you want a structured plan to review and approve. For the other actions, Lovable proposes switching to Build mode. See [Switch to Plan or Build](#switch-to-plan-or-build).

> [!NOTE]
>
> **Read-only for your project, not for connected tools.** Chat mode does not change your project's code, files, or database. Actions through a connected tool, such as posting a message to Slack or creating a Linear issue, do run in Chat mode. Lovable asks for your approval before it creates, sends, or changes anything through a tool, unless you saved an **Always allow** answer for that tool.

## Switch to Plan or Build

When you ask Lovable to build, fix, or change something, to generate an image or a video, or to publish, it shows a **Start building** card marked **(Uses credits)**:

* Select **Build** and Lovable switches to Build mode and makes the change. The card then reads **Switched to Build mode**. Your workspace needs available build credits for this step. The daily chat allowance does not cover the build.
* Select **Skip** to stay in Chat mode. The card reads **Kept Chat mode**, and nothing changes in your project. Lovable describes the change instead.

Lovable shows the card only when you ask for the change. When you describe a problem, share an idea, or ask whether something is possible, the conversation stays in Chat mode.

Other buttons that start a build, such as the action buttons under Lovable's reply or **Enable Cloud**, ask **Switch to Build mode?** while you are in Chat mode. Select **Continue** to switch to Build mode and send the message, or **Cancel** to stay in Chat mode and send nothing.

You can also switch modes yourself in the picker at any time:

* Select **Build** when you know what you want built.
* Select **Plan** when you want a structured plan to review, edit, and approve before anything is built. See [Plan mode](https://docs.lovable.dev/features/plan-mode.md).

Everything you discussed in Chat mode stays in the conversation, so Lovable starts the plan or the build with that context. For how pricing changes after you switch, see [How Chat mode messages are priced](#how-chat-mode-messages-are-priced).

## How Chat mode messages are priced

Chat usage follows its own pricing model, including a per-message price and a daily chat allowance. A chat message is priced on the work Lovable does to answer it, typically a fraction of a credit.

Free, Pro, and Business workspaces include a daily chat allowance that covers chat messages first. The allowance belongs to the workspace, so everyone's chat messages draw on the same daily pool. It resets every day at 00:00 UTC and does not roll over.

When the day's allowance is used up, chat messages keep the same per-message price and draw on your daily build credits, then your general credits.

Enterprise plans do not include a daily chat allowance. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs) for the full rules.

> [!NOTE]
>
> **Temporary offering, subject to change.** The current chat pricing model, including the per-message price and the daily chat allowance, applies through **October 31, 2026**. Pro and Business workspaces receive a larger daily chat allowance than Free workspaces. This pricing applies to messages in Chats and Chat mode, including messages sent through Slack or Telegram and requests made by voice.
>
> Build mode, Plan mode, image and video generation, and Cloud and AI usage follow their standard pricing and are not part of this offer.

The **Chat** option in the mode picker shows a **Free** badge while today's allowance lasts. The **More options** menu on Lovable's response shows **Credits used**, which reads **Free** when the allowance covered the message.

Messages you send in Chat mode are priced as chat messages. After you select **Build**, on the **Start building** card or in the picker, Lovable's work is priced as usage-based [Build mode work](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs). This includes the change Lovable makes right after you approve the card. After you switch to **Plan**, the messages that follow are priced as [Plan mode messages](https://docs.lovable.dev/features/plan-mode.md#how-plan-mode-messages-are-priced).

## FAQ

> **Does Chat mode ever change my code?**
>
> No. Chat mode reads your project and discusses it. Changes begin only after the conversation moves to Build mode, either because you select **Build** on the **Start building** card or because you select **Build** in the mode picker yourself.

> **What does a Chat mode message cost?**
>
> A Chat mode message is priced on the work Lovable does to answer it, typically a fraction of a credit. Your workspace's daily chat allowance covers it first. When the allowance is used up for the day, the message draws on your daily build credits, then your general credits, at the same per-message price. Messages you send after switching to Plan or Build use that mode's pricing. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs).

> **What is the difference between Chat mode and Plan mode?**
>
> Use Chat mode for the conversation and Plan mode for the plan.
>
> In Chat mode, Lovable answers in the chat: how something works, whether an idea is worth building, or what caused an error. It can outline steps in prose, but it does not create a plan you can approve. Each message is a chat message, typically a fraction of a credit, and your workspace's daily chat allowance covers it first.
>
> In [Plan mode](https://docs.lovable.dev/features/plan-mode.md), Lovable investigates your project and writes a structured plan in the Plan view. You edit and approve it, and Lovable builds from it. Each message costs one credit, plus any [subagent](https://docs.lovable.dev/features/subagents.md) research.
>
> Start in Chat mode. Switch to Plan mode when you have decided what to change and want a plan to approve.

> **What is the difference between Chat mode and Chats?**
>
> Chat mode is inside a [project chat](https://docs.lovable.dev/features/projects/chat.md). Lovable starts with that project, everyone with access to the project sees the conversation, and a change starts through the **Start building** card.
>
> [Chats](https://docs.lovable.dev/features/chats.md) lives outside your projects at [lovable.dev/chats](https://lovable.dev/chats). Lovable starts with your workspace and connected tools, each chat is private to you, and a change is sent to a project as a build instruction.
>
> They share the same per-message pricing and the same daily chat allowance.


## Related topics

- [Replace deprecated AI models in your app](https://docs.lovable.dev/features/ai-deprecated-models.md)
- [App + chat connectors: Add capabilities to your published app and your chat](https://docs.lovable.dev/integrations/app-connectors.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Plan a change in Plan mode](https://docs.lovable.dev/features/plan-mode.md)
