# Set a goal for Lovable
<!-- source: https://docs.lovable.dev/features/goal-runs.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a goal for Lovable

> Type /goal in a Build mode message, or pick Goal from the Skills list, to set that message as a goal. Lovable works on it until the goal is achieved, so a large task can be finished completely in a single message.

A goal is a [Build mode](https://docs.lovable.dev/features/agent-mode.md) message that Lovable keeps working on until the goal is achieved. You can set one on any message: the first prompt of a new project or any message in an existing project. Set a goal for a large task that you want finished completely, such as a feature that spans several parts of your app.

A goal can take hours to finish and use a large number of credits, so use it for work where a complete result matters more than speed or cost.

> [!NOTE]
>
> A goal still pauses at your [credit check-in level](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) and asks whether to continue, like any long-running message. With the default level of 20 credits, a large goal pauses several times along the way. Adjust the level in [account settings](https://docs.lovable.dev/introduction/lovable-account-settings#preferences) to check in less often.

## How Lovable works on a goal

A goal changes how Lovable works on the message:

* **Lovable works until the goal is achieved**, for up to [10 hours](https://docs.lovable.dev/features/agent-mode.md#how-long-lovable-works-on-one-message) on the one message, and uses the final half hour to finish what is in progress and summarize what is done.
* **Lovable doesn't pause to ask questions about the work.** It makes routine decisions itself, and stops early only when it needs something that only you can provide, such as access to another service. Because of this, [write the goal so Lovable can finish on its own](#write-a-goal-lovable-can-finish-on-its-own).
* **Lovable still checks in about cost.** Like any long-running message, a goal pauses when it crosses your [credit check-in level](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) and asks whether to continue. Choose **Continue** and Lovable resumes where it left off.
* **Lovable builds the finished version.** It completes what you asked for, rather than delivering a first version for you to review and refine.
* **You can still guide the work.** [Send follow-up messages](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works) to adjust the direction, and they become part of the goal. Follow the progress in the [activity cards](https://docs.lovable.dev/features/projects/chat.md#follow-the-work-in-activity-cards), or click the **stop button** to stop the work.

## Set a goal

You set a goal in the message itself, with the `/goal` command. **Goal** is listed with the [skills built by Lovable](https://docs.lovable.dev/features/skills.md#custom-and-built-in-skills), and you add it the same way you add a skill:

**1. Add the command to your message**

Type `/goal` anywhere in your message, or type `/` and pick **Goal** from the **Skills** list. The same list is in the [**Chat actions** menu](https://docs.lovable.dev/features/projects/chat.md#chat-actions), the **+** button next to the chat input, under **Add context → Skills**. The command appears as a **Goal** tag in your message, and a banner above the chat input confirms the goal: "Lovable will work until your goal is achieved. This might take hours and use a large number of credits." Write the rest of the message as a [description of the goal](#write-a-goal-lovable-can-finish-on-its-own). A message with `/goal` and nothing else doesn't send.

**2. Send the message**

Lovable removes the `/goal` command from the message text, and the sent message is marked **Goal** in the project chat so you can recognize it later.

```text wrap theme={null}
/goal Refactor the checkout flow to support saved payment methods, update the database schema, and add tests for the new endpoints.
```

The name `goal` is reserved for this command, so you cannot create a [skill](https://docs.lovable.dev/features/skills.md) named `goal`.

### Write a goal Lovable can finish on its own

Lovable doesn't pause to ask you questions during a goal, so the message needs to include everything Lovable would otherwise ask about:

* **What a finished result looks like.** Describe the parts you expect, such as the pages, flows, or data involved, and what the finished app should do.
* **The decisions you care about.** Lovable decides anything you leave open, so state how you want the result to look and behave, and the edge cases it must handle.
* **Access to other services.** If the work involves other services, set up the [connectors](https://docs.lovable.dev/integrations/introduction) and [secrets](https://docs.lovable.dev/features/secrets.md) it needs before you send the goal. Lovable stops early if it needs access that only you can grant.

A goal still pauses at your [credit check-in level](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) like any long-running message. If you want fewer pauses on a large goal, adjust the level in [account settings](https://docs.lovable.dev/introduction/lovable-account-settings#preferences) before you start.

## Goals run in Build mode

Goals always run in [Build mode](https://docs.lovable.dev/features/agent-mode.md). If the mode picker is on **Plan** when you send a `/goal` message, Lovable switches the picker to **Build**, and it stays on **Build** until you change it. If the message fails to send, the picker stays on **Plan**.

The goal applies only to the message you send it with: your next message is a regular message, in the mode the picker shows.

## When you can't set a goal

You can't set a goal while Lovable is already working. What happens to a `/goal` message you send during that time depends on what Lovable is working on:

* **While Lovable works on a regular message**, no goal is set. A notice above the chat input warns you first, and the message is sent as a regular message: the `/goal` command has no effect and stays in the message as ordinary text.
* **While Lovable works on a goal**, your message joins that goal as a [follow-up](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works) and becomes part of the work toward the same goal. No notice appears.

## What a goal costs

A goal is billed on the work Lovable does, and it costs noticeably more than a regular Build mode message, for two reasons: the same work uses more credits, and a goal involves more work, because Lovable keeps working until the goal is achieved. You are charged for all of that work, from start to finish.

[Credit check-ins](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) still apply: the work pauses when it crosses your check-in level, and choosing **Finish up** ends the goal early, with Lovable finishing the work in progress and stopping. The **stop button** stops the work at any time, and you are only charged for the work completed up to that point. Check your credit balance before you set a large goal. The [cost controls for Build mode requests](https://docs.lovable.dev/features/agent-mode.md#control-the-cost-of-a-build-mode-request) all apply to goals too.

## FAQ

> **Does setting a goal change my mode?**
>
> Goals always run in [Build mode](https://docs.lovable.dev/features/agent-mode.md), so if the mode picker is on **Plan** when you send a `/goal` message, Lovable switches the picker to **Build**, and it stays on **Build** until you change it. The goal itself applies only to the message you send it with: your next message is a regular message, in the mode the picker shows. The same is true for a project you create from the dashboard with a `/goal` prompt: the goal covers only that first message, and the editor opens in Build mode like any new project.

> **Why did my /goal message send as a normal message?**
>
> Lovable was already working on a regular message when you sent it. You can't set a goal while a message is in progress, and a notice above the chat input warns you before you send. The message is still sent, but `/goal` has no effect and stays in the message as ordinary text. If Lovable is working on a goal instead, your message joins that goal as a follow-up.

> **Do I need to type /goal again when I retry a failed message?**
>
> No. If a message you sent as a goal fails and you retry it from the project chat, the retried message is sent as a goal again.

> **How much does a goal cost?**
>
> A goal is billed on the work Lovable does, and it costs noticeably more than a regular Build mode message, for two reasons: the same work uses more credits, and a goal involves more work, because Lovable keeps working until the goal is achieved. [Credit check-ins](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) still pause the work at your check-in level, and the **stop button** stops it at any time.

> **How do I recognize a goal in the chat history?**
>
> Messages you sent with `/goal` are marked **Goal** in the project chat, so you can tell them apart from your other messages.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Chat with Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Sign in with Lovable](https://docs.lovable.dev/integrations/sign-in-with-lovable.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
