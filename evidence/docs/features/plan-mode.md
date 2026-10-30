# Plan a change in Plan mode
<!-- source: https://docs.lovable.dev/features/plan-mode.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Plan a change in Plan mode

> Plan mode investigates your project and writes a structured plan you can review, edit, and approve before any code is written. Use it for larger or riskier changes where you want to see and shape the approach first.

> [!TIP]
>
> **Choose a mode**
>
> The project chat has three modes:
>
> * [**Chat mode**](https://docs.lovable.dev/features/chat-mode.md) → discuss your app and possible changes, without a plan or code changes
> * **Plan mode** → investigate and write a plan you edit and approve before building
> * [**Build mode**](https://docs.lovable.dev/features/agent-mode.md) → implement changes and verify the outcome
>
> Chat mode helps you decide what you want. Plan mode defines how to build it. Build mode changes the app. You can switch between them at any time, and the conversation carries across all three.

## Overview

Plan mode is Lovable's planning mode, designed to turn a change you have in mind into a structured plan you review and approve before any code is written. It is the **Plan** option in the [project chat](https://docs.lovable.dev/features/projects/chat.md), described in the mode picker as **Detailed spec for complex builds**. Lovable investigates your project across multiple steps, inspecting files, logs, and other relevant context, then writes the plan. You inspect, edit, and refine it, and Lovable builds only what you approve.

Lovable often asks clarifying questions to understand your goals and constraints before it proposes a plan. When there is a clear implementation to propose, the plan opens in the **Plan view**.

Plan mode never modifies your code. To ask a question, explore an idea, or discuss a change without a plan, use [Chat mode](https://docs.lovable.dev/features/chat-mode.md) instead. A Plan mode message costs **one credit, plus the cost of any [subagent](https://docs.lovable.dev/features/subagents.md) research** Lovable runs while planning. See [How Plan mode messages are priced](#how-plan-mode-messages-are-priced).

## What Plan mode is for

Use Plan mode when you know roughly what you want and want to see how Lovable would build it before it does:

* Scope a larger feature and see the steps, components, and data it needs
* Investigate a bug or an error and approve the fix before any code changes
* Compare multiple approaches, understand the tradeoffs, and choose one
* Design architecture or database schemas before implementation
* Understand which parts of the app a change touches before making it
* Give collaborators a written plan to review before the build starts

A Plan mode conversation can still end without a plan, for example when Lovable's clarifying questions show that the change is not worth making. When it does lead to a concrete change, you review and refine the proposed approach before anything is implemented.

For open questions and early ideas, where you do not want a plan yet, [Chat mode](https://docs.lovable.dev/features/chat-mode.md) answers in the conversation at chat pricing.

## How to use Plan mode

You can use Plan mode in two ways:

* **Start in Plan mode** when beginning a new project or a larger feature
* **Switch to Plan mode** at any point during development, including from a [Chat mode](https://docs.lovable.dev/features/chat-mode.md) conversation once you have decided what to build

Plan mode is intentionally interactive. Lovable may ask clarifying questions to understand requirements, constraints, or tradeoffs before proposing a plan.

### Activate Plan mode

Open the mode picker next to the chat input, which shows the current mode, and select **Plan**. Then describe the change you want planned.

**Be specific about what you want**

```text wrap theme={null}
Add email/password authentication with password reset. 
Users should stay logged in for 30 days.
```

**Compare approaches before you commit**

```text wrap theme={null}
What's the best way to implement real-time notifications in this project? 
Walk me through the options and their tradeoffs, then plan the one you recommend.
```

**Use it for debugging**

```text wrap theme={null}
Users report the login form doesn't work on mobile. 
Help me figure out why.
```

**Request detailed breakdowns**

```text wrap theme={null}
Break down the implementation of a shopping cart feature. 
What components, database tables, and API endpoints will I need?
```

**Ask for a review with a plan of improvements**

```text wrap theme={null}
Review my current authentication setup and plan the security improvements I should make, in priority order.
```

## When Plan mode creates a plan

Plan mode does not always produce a structured implementation plan. A plan is created only when there is a clear implementation to propose.

If a plan is generated, it appears in a dedicated **Plan view** as a readable, structured document. You can open it in full screen to review the entire approach before anything is implemented.

A plan typically includes:

* A high-level overview of the approach
* Key decisions, assumptions, and constraints
* Components, data models, and APIs
* Step-by-step implementation sequencing
* Optional diagrams such as schemas, flows, or architecture

From the Plan view, you can:

* **Edit** the plan directly in the view to add constraints, remove steps, or rewrite sections
* **Highlight** any part of the plan and describe what should change about that section
* **Approve** the plan when you are satisfied with the approach

The plan card in the project chat also offers **Approve** and **Skip**. Select **Skip** to move on without approving the plan.

You can ask follow-up questions or request changes directly in the project chat, and Lovable will update the plan accordingly.

When you approve a plan:

* Lovable switches to **Build mode**
* Implementation begins immediately from the approved plan and continues until the plan is complete

You can return to Plan mode at any time to generate a new plan based on the current state of your codebase.

### Revise a specific part of the plan

Instead of describing a change in the project chat, you can point at it. Select any part of the plan and a **Comment** button appears next to your selection. Select it, type what should change in the box that opens (**Describe the change...**), and press **Enter**. Lovable edits just that section rather than rewriting the whole plan. Press **Escape** to dismiss the box without sending.

Each revision is a Plan mode message, so it costs **one credit, plus the cost of any [subagent research](#how-plan-mode-messages-are-priced)** Lovable runs for it.

When Lovable revises a plan, the new version opens in the Plan view ready to edit, and Lovable keeps the earlier version in the plan's version history.

### Browse plan versions

Lovable keeps every revision in the current round of planning as a version. Use the undo and redo arrows above the plan to step through the versions and compare them. While you view an earlier version, a banner such as **Viewing version 2 of 3** appears. You can read that version, but you cannot edit it or select part of it to request changes. Select **Back to latest** to return to the latest version.

**Save** appears in two situations. While you view an earlier version, select **Save** to restore it as the new latest version. After you edit the latest version yourself, select **Save** to keep your edits as the plan to approve. While you have unsaved edits, the arrows are unavailable until you select **Save** or **Cancel**.

You cannot approve a plan while you view an earlier version. Save it first or return to the latest version. When you approve a saved version, Lovable builds from it. If you approve while you still have unsaved edits, the **Approve** button reads **Save & approve** and saves them first.

If you send a chat message while a plan with saved changes is waiting for your approval, Lovable includes your saved plan with the message, so the next revision starts from your saved version. These messages show an **Updated plan** label in the project chat, and you cannot edit them afterward.

> [!NOTE]
>
> The arrows appear after Lovable has revised a plan at least once. Version history covers the current round of planning. When you approve or skip a plan, Lovable starts a fresh history for the next plan. The same undo, redo, and save controls are available in the Plan view on mobile.

## Plans and persistence

While you are working on a plan, it lives in `.lovable/plan.md`. When you approve it, Lovable moves that file into the `.lovable/plan/` folder as a dated file named after the plan, and `.lovable/plan.md` starts fresh for your next plan.

You can inspect both the current plan and the archived ones like any other project file.

**Previous plans are not lost**. Approved plans stay in the `.lovable/plan/` folder, and every plan remains available in your **project chat history**, where it can be reopened in the Plan view for reference or comparison.

This allows you to:

* Iterate on ideas over time
* Compare different approaches
* Re-plan safely as requirements evolve
* Help new collaborators understand the reasoning behind implementations

## How Plan mode messages are priced

A Plan mode message costs **one credit, plus the cost of any subagent research** Lovable runs while planning. The one credit covers the planning work itself, so it is the same whether the message ends in a plan, a clarifying question, or an answer. Skipping a plan does not add a charge. Sending feedback on the plan is a new Plan mode message, priced the same way.

> [!TIP]
>
> **Chat mode is the cheaper way to ask.** A Plan mode message costs one credit before any research. A [Chat mode](https://docs.lovable.dev/features/chat-mode.md) message is priced on the work it needs, typically a fraction of a credit, and your workspace's daily chat allowance covers it first. Ask your questions, compare options, and settle what you want in Chat mode, then switch to Plan mode when you want the plan.

For larger or open-ended requests, Lovable can start [subagents](https://docs.lovable.dev/features/subagents.md) to research your project before it writes the plan. Subagent research is usage-based, so a Plan mode message that needs deep research costs more than one credit.

When you approve a plan, Lovable switches to [Build mode](https://docs.lovable.dev/features/agent-mode.md) and implements it. Lovable bills that implementation as Build mode work, separately from the Plan mode message.

To keep planning costs predictable:

* Keep planning requests specific and point them at particular files, features, or areas. Broad requests are more likely to need subagent research.
* Check the cost of any message under **Credits used** in the **More options** menu below Lovable's response. See [Time and cost while Lovable works](https://docs.lovable.dev/features/projects/chat.md#see-time-and-cost-while-lovable-works).

## FAQ

> **Does Plan mode ever change my code?**
>
> No. Code changes only happen after you approve a plan and Lovable switches to Build mode.

> **Does Plan mode cost credits?**
>
> Yes. A Plan mode message costs **one credit, plus the cost of any [subagent](https://docs.lovable.dev/features/subagents.md) research** Lovable runs while planning, so a message that needs deep research costs more than one credit. See [How Plan mode messages are priced](#how-plan-mode-messages-are-priced).

> **Where are plans stored?**
>
> The plan you are working on is saved to `.lovable/plan.md`. When you approve it, Lovable moves it to a dated file in the `.lovable/plan/` folder. Earlier plans also remain accessible from the project chat history.

> **Can I access old plans?**
>
> Yes. Earlier plans remain accessible from the project chat history.

> **Can I edit plans after they’re created?**
>
> Yes. Plans are fully editable before approval.

> **Can I use Plan mode for debugging?**
>
> Yes. Plan mode is well suited for investigating issues and deciding on fixes before implementation.

> **When should I use Chat mode instead of Plan mode?**
>
> Use [Chat mode](https://docs.lovable.dev/features/chat-mode.md) when you want an answer in the conversation and no plan yet: how a part of the app works, whether an idea is worth building, or what caused an error. Chat mode messages are priced as chat messages and covered first by your workspace's daily chat allowance.
>
> Use Plan mode when you have decided what to change and want a structured plan you can edit and approve before Lovable builds it.

> **What happens if I type /goal in Plan mode?**
>
> The message is sent as a [goal](https://docs.lovable.dev/features/goal-runs.md), which always runs in Build mode. Lovable switches the mode picker to **Build**, works on that message until the goal is achieved, and the picker stays on **Build** until you change it.

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

- [Implement changes in Build mode](https://docs.lovable.dev/features/agent-mode.md)
- [Discuss your app in Chat mode](https://docs.lovable.dev/features/chat-mode.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Dashboard overview](https://docs.lovable.dev/introduction/dashboard-overview.md)
- [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md)
