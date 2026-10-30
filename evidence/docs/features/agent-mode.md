# Implement changes in Build mode
<!-- source: https://docs.lovable.dev/features/agent-mode.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Implement changes in Build mode

> Build mode lets Lovable implement and verify changes directly in your project, handling execution end to end with minimal supervision.

> [!TIP]
>
> **Choose a mode**
>
> The project chat has three modes:
>
> * [**Chat mode**](https://docs.lovable.dev/features/chat-mode.md) → discuss your app and possible changes, without a plan or code changes
> * [**Plan mode**](https://docs.lovable.dev/features/plan-mode.md) → investigate and write a plan you edit and approve before building
> * **Build mode** → implement changes and verify the outcome
>
> Chat mode helps you decide what you want. Plan mode defines how to build it. Build mode changes the app. You can switch between them at any time, and the conversation carries across all three.

## Overview

Build mode (previously Agent mode) is Lovable’s autonomous execution mode, designed to implement changes directly in your project.

When you give Lovable a task, it takes ownership of execution end to end. It understands your intent, explores the codebase for context, applies changes across files, and resolves issues that appear during development. While it works, you can see progress through visible tasks and review the results before moving on.

## What Build mode is for

You can use Build mode to:

* Implement features or changes once an approach is decided
* Fix bugs or errors end to end
* Refactor code across multiple files
* Apply coordinated changes across frontend, backend, and configuration
* Debug issues that arise during implementation
* Inspect logs and network activity to identify problems
* Fetch external documentation or assets when needed
* Generate or edit images and videos for use in your project
* Verify results before finishing

All changes are applied directly to your project and surfaced through file diffs and summaries. You can follow along step by step in the **Details view**.

## How to use Build mode

Build mode is active unless you switch to [Chat mode](https://docs.lovable.dev/features/chat-mode.md) or [Plan mode](https://docs.lovable.dev/features/plan-mode.md).

To use it, describe what you want and send your message. Clear requirements and constraints help Lovable produce better results.

**Be specific about what you want**

```text wrap theme={null}
Add a contact form with name, email, and message fields. Validate email format and show error messages inline.
```

**Describe expected behavior**

```text wrap theme={null}
When users click ‘Add to Cart’, show a success message and update the cart count in the header. Store cart items in local storage.
```

**Provide context for complex changes**

```text wrap theme={null}
Update the dashboard to show sales data from the last 30 days. Use the existing Chart component and match the styling used on the analytics page.
```

**Set guardrails for sensitive areas**

```text wrap theme={null}
Add a new feature to @src/pages/dashboard. Do not modify @src/shared/Layout.tsx or the existing authentication logic.
```

## Tasks and execution visibility

While Lovable is working, tasks appear in the project chat showing:

* Current step being executed
* Files being modified
* Tools being used (search, web fetch, image generation)
* Progress through multi-step implementations

For a closer look, click the activity card while Lovable works, or **Details** on a finished change. The **Details view** opens where the preview usually appears. Its **Timeline** tab lists every step Lovable took, including tool calls, and its **Changes** tab shows the resulting file changes. Click **Hide details** to return to the preview.

This visibility helps you:

* Follow progress on complex builds
* Understand the steps being performed
* Stay oriented during complex changes
* Spot issues early if something seems off

## Send follow-ups mid-build

Lovable working on a request doesn't block you. Send a follow-up, a correction, or a new idea at any time to steer the work, and Lovable picks it up at its next natural stopping point without losing completed work. Some messages, like **Try to fix** and inline text edits from the preview toolbar, run as their own request after the current one. See [Send follow-ups while Lovable works](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works) for details.

If you still have the now-deprecated [message queue](https://docs.lovable.dev/features/projects/chat.md#message-queue-deprecated), your messages keep queueing in order instead. **Send now** on a queued message sends it into the running task like a follow-up, and Lovable picks it up at its next natural stopping point. The **Message queue** setting in [**Account settings → Preferences**](https://docs.lovable.dev/introduction/lovable-account-settings#preferences) lets you disable the queue and switch to follow-ups. Enable it from the same place to use the queue instead.

## Debugging and verification

When using Build mode, Lovable does more than ensure code compiles.

As part of investigation and problem solving, the agent can:

* observe build errors and failures from test runs
* inspect console output and network requests when verification tools are used
* reproduce reported issues using browser testing or targeted backend calls
* verify that fixes work as expected by running appropriate checks

Lovable has access to verification tools such as browser testing, frontend tests, and edge function verification to help understand system behavior, validate user workflows, and ensure backend logic works as expected. Most of these tools run only when you ask for them.

For a detailed explanation of testing and verification capabilities, see [Test and verify your app](https://docs.lovable.dev/features/testing.md).

## How long Lovable works on one message

Lovable works on one Build mode message for up to 10 hours, so a large task, like a refactor across multiple files or a long cycle of testing and fixing, is more likely to finish in a single message. This applies automatically, and there is nothing to turn on. Most messages finish well before the limit.

In the final half hour, Lovable wraps up: it finishes what is in progress instead of starting new work, and summarizes what is done and what remains, so you can ask it to continue in a new message.

Because a Build mode message is billed on the work Lovable does, a message that runs for hours costs more credits than a short one. [Credit check-ins](#control-the-cost-of-a-build-mode-request) still apply, so a long message pauses when it crosses your check-in level and asks whether to continue, and the **stop button** stops it at any time. The 10-hour limit applies to Build mode messages only. To have Lovable keep working until a large task is completely finished, [set that message as a goal](https://docs.lovable.dev/features/goal-runs.md). Credit check-ins apply to goals too.

## Pricing

Pricing for Build mode is **usage-based**. Cost depends on factors such as:

* Number of files modified
* Complexity of logic changes
* Amount of codebase exploration required
* Use of tools such as verification, browser checks, web search, or image generation

Many requests cost less than one credit, while more complex tasks may cost more. Lovable does not show an upfront credit estimate before a Build mode request runs, because cost depends on work that is discovered during execution. To follow the cost, open the **More options** menu below Lovable's response: it shows **Credits used** while the request is still running, and the final cost when it finishes. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) and [Time and cost while Lovable works](https://docs.lovable.dev/features/projects/chat.md#see-time-and-cost-while-lovable-works).

If your workspace runs out of credits while Lovable is working on a message, Lovable pauses the message instead of ending it. A card in the project chat lets you add credits and resume where Lovable left off, or have Lovable wrap up what's in progress. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

### Control the cost of a Build mode request

You have several controls to shape the cost of a Build mode request:

* **Scope each prompt narrowly.** Ask for one change at a time and name the specific files or areas to touch, as shown in [How to use Build mode](#how-to-use-build-mode). Broad prompts like "clean up the app" tend to explore more of the codebase and modify more files, which costs more than a scoped prompt like "add email validation to the sign-up form in @src/pages/signup.tsx".
* **Plan first for large or unfamiliar changes.** Switch to [Plan mode](https://docs.lovable.dev/features/plan-mode.md) to review the intended approach, files involved, and steps before any code is changed. A Plan mode message costs **one credit, plus the cost of any subagent research** Lovable runs while planning, so you can check the approach before you spend Build mode credits on implementation.
* **Let credit check-ins catch expensive messages.** When a single message crosses your check-in level, 20 credits by default, Lovable pauses with the cost so far, and you choose whether to continue, adjust the level, or have Lovable wrap up. Manage check-ins in [account settings](https://docs.lovable.dev/introduction/lovable-account-settings#preferences). In beta. See [Build costs](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs).
* **Stop a request in progress.** Click the **stop button** while Lovable is working to halt the current task immediately. Stopped requests are charged only for work completed up to that point, and completed changes are kept. To discard the changes as well, select **Undo latest edit** under the response and confirm.
* **Watch progress in the Details view.** While Lovable works, click the activity card in the project chat to open the Details view, which shows each step, tool, and file change as it runs, so you can stop early if the task is expanding beyond what you intended.
* **Check your balance before starting large tasks.** Open **Workspace settings → Plans & credit usage** to see your remaining credits, or click your workspace name at the top of the editor's sidebar to see the credit bar. See [View your credit balance](https://docs.lovable.dev/introduction/credits-and-usage.md#view-your-credit-balance).
* **Be deliberate with goals.** A message you [set as a goal](https://docs.lovable.dev/features/goal-runs.md) keeps Lovable working until the goal is achieved, which can use a large number of credits. Set a goal only for a large task you want finished completely.

## FAQ

> **Does Lovable modify my project directly when in Build mode?**
>
> Yes. Lovable applies changes directly to your project when using Build mode. All modifications are visible through file diffs and summaries.

> **What happens if errors occur during implementation?**
>
> Lovable can inspect logs, runtime output, and network activity and iterate on fixes until the issue is resolved or clarified. See [Test and verify your app](https://docs.lovable.dev/features/testing.md) for more information.

> **Can I see what Lovable is doing while it works?**
>
> Yes. Visible tasks show each step of execution, including progress and which files are being modified.

> **Can multiple messages be sent while working in Build mode?**
>
> Yes. While Lovable is working, keep typing: Lovable picks up each message at its next natural stopping point and includes it in the work without losing anything it has already done. See [Send follow-ups while Lovable works](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works). If you still have the [message queue](https://docs.lovable.dev/features/projects/chat.md#message-queue-deprecated), your messages keep queueing in order instead. **Send now** on a queued message sends it into the running task like a follow-up, and you can disable the queue in [**Account settings → Preferences**](https://docs.lovable.dev/introduction/lovable-account-settings#preferences).

> **How do I stop a request, and what happens when I do?**
>
> Click the **stop button** while Lovable is responding to immediately halt the current task. This lets you stop a request to provide more context or correct the agent.
>
> Lovable keeps all changes made up to that point, so you won’t lose completed work. Stopped requests are charged based on the work completed so far.
>
> To remove the changes as well, select **Undo latest edit** under the response and confirm. See [how to undo the last message](https://docs.lovable.dev/features/projects/chat.md#how-do-i-undo-what-the-last-message-did).

> **What happens if I run out of credits while Lovable is working?**
>
> Lovable pauses the message instead of ending it, and a card appears in the project chat. Choose **Add credits** to resume where Lovable left off, or **Finish up** to have Lovable finish the work in progress and stop. Paused work waits until you decide. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

> **When should I switch to Plan mode?**
>
> Switch to [Plan mode](https://docs.lovable.dev/features/plan-mode.md) when you want to:
>
> * Think through a complex change before implementation
> * Compare multiple architectural approaches
> * Review or edit a plan before any code is changed
> * Investigate an issue and decide on a solution first

> **Can I reference a specific file in the project chat?**
>
> Yes. You can reference code files from your current project directly in the project chat to make edits and discussion faster and more precise.
>
> Type `@` and select a file, or use the **Reference file in chat** button in the [code editor](https://docs.lovable.dev/features/code-mode.md). For example:
>
> ```text wrap theme={null}
> @src/components/UserProfile.tsx add a loading state here
> ```
>
> This only references files within your current project. To reference another project, see [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md).

> **Can Lovable reuse code or features from another project?**
>
> Yes. Lovable supports [cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md) within the same workspace.
>
> You can use `@` mentions to reference another project directly, or simply ask Lovable to reuse an existing implementation. The agent can access relevant code, files, assets, and project chat history from other projects and adapt them to your current one.
>
> Cross-project access is read-only and respects workspace permissions.


## Related topics

- [Plan a change in Plan mode](https://docs.lovable.dev/features/plan-mode.md)
- [Discuss your app in Chat mode](https://docs.lovable.dev/features/chat-mode.md)
- [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md)
- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)
- [Set a goal for Lovable](https://docs.lovable.dev/features/goal-runs.md)
