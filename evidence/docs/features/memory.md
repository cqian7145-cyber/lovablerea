# Memory: what Lovable remembers as you build
<!-- source: https://docs.lovable.dev/features/memory.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Memory: what Lovable remembers as you build

> Lovable saves the preferences, decisions, and facts you state while you build, and applies them in later conversations without you repeating them.

Lovable remembers what you tell it, so a preference you state once keeps applying. Set a price format, rule out an approach, or correct the tone of your copy, and Lovable saves it. Lovable applies it in later conversations without being reminded.

Memory is what Lovable saves as you work. It is the counterpart to [Instructions](https://docs.lovable.dev/features/knowledge.md), which you write yourself. Memory is enabled by default on all plans, and you can change or disable what Lovable remembers at any time.

## What Lovable remembers about your project

Project memory belongs to one project, and Lovable adds to it as you chat. Everyone who can edit the project uses the same memory, so a teammate's correction changes what Lovable does for you too.

Lovable saves:

* Preferences for how things should be done, and the corrections you make
* Approaches you have ruled out, so Lovable does not propose them again
* Design decisions, such as colors, typography, and tone of voice
* Business facts, such as prices, rates, opening hours, delivery areas, formulas, and words to avoid
* Links to references Lovable should use

For example, after a few conversations about a café app, Lovable applies facts such as these:

```text wrap theme={null}
Prices are shown in kronor, formatted as "39 kr".
The tone across the app is warm and short.
Never use the word "cheap" in customer-facing copy.
The brand colors are forest green (#1E4D3A) and coral (#E8735A).
Do not add a newsletter signup. It was rejected.
```

Technical and architecture decisions, such as which service handles payments or how your app's pages are organized, are saved in your project files instead. See [Rules in your project files](#rules-in-your-project-files).

## What Lovable remembers about you

Personal memory is about you rather than any one project. Lovable saves how you want it to work with you: how long replies should be, how technical they can get, and whether it asks before making a small change.

Lovable keeps one personal memory for you and applies it in every project you build. Each workspace has its own switch for personal memory, in your [Memory settings](#see-and-change-what-lovable-remembers). Disable it in a workspace where you want Lovable to work from the project alone.

Personal memory is yours. Other people on a project cannot read it, and it is never saved into a project's memory.

When personal memory and project memory disagree about a project decision, project memory wins, because it is specific to what you are building.

## What Lovable leaves out

Memory is for what still applies after the current task. Lovable leaves out anything it can read in your code, such as file paths and how a feature is built. It also leaves out the details of one build request and the summaries it writes of what it built.

If a memory would contain an API key, a token, or a password, Lovable removes the value before saving the rest of the memory.

Lovable recognizes only values in a known secret format, such as a provider's API key, so it can miss other confidential text. Everyone who can edit the project can read what it remembers about that project. Keep personal data and other confidential information out of your messages.

## Rules in your project files

Technical and architecture decisions do not go to memory. Lovable writes each one as a short rule, with a one-line reason, in a file named `AGENTS.md` at the top level of your project. Lovable reads that file when it works on your app.

When the main file gets long, Lovable moves those that cover one part of the app into a second `AGENTS.md` beside that part. The main file stays short.

These files belong to your project. Open one in the [code editor](https://docs.lovable.dev/features/code-mode.md) and edit it as you would any other file. It is included when Lovable syncs your project to GitHub. What Lovable remembers is stored separately, so memory never appears among your project files.

## Tell Lovable what to remember or forget

You do not have to wait for Lovable to save something on its own. Say it in the project chat, and Lovable updates its memory while it handles that message:

```text wrap theme={null}
Remember that all prices are shown in kronor, formatted as "39 kr". Forget the dollar formatting rule.
```

The same works for a preference about you, such as asking for shorter replies from now on. You can say it in the project chat or in [Chats](https://docs.lovable.dev/features/chats.md).

## See and change what Lovable remembers

> [!NOTE]
>
> Lovable is rolling out the **Memory** settings page gradually. If **Memory** is not in your workspace settings, your account does not have it yet. Lovable still remembers as you build, and you can change what it remembers in the project chat.

[Workspace settings → Memory](https://lovable.dev/settings/memory) shows what Lovable remembers about you. Every member of the workspace can open it, and each person sees only their own memory.

In a project, **More → Settings → Memory** shows what Lovable remembers about that project. Anyone who can edit the project can open that page. When the project is set to **You and this project**, the page also shows what Lovable remembers about you.

Both pages show a summary that Lovable writes, grouped under a few headings. To change part of it, select the passage and click **Change in chat**. Lovable opens the project chat with the passage attached to an unsent message, and you say what to change. In your workspace settings, Lovable first asks which project's chat to use.

### Choose what memory Lovable uses

**Use memory**, in [Workspace settings → Memory](https://lovable.dev/settings/memory), controls whether Lovable uses what it remembers about you in that workspace's projects. Disable it, and Lovable stops using and saving your personal memory in those projects. Your other workspaces are not affected.

**Memory for this project**, in the project's **Memory** settings, has three options:

* **You and this project**: Lovable uses what it remembers about the project, and what it remembers about you when **Use memory** is enabled for the workspace. This is the default.
* **Just this project**: Lovable uses what it remembers about the project, and nothing about you.
* **Nothing**: Lovable uses no memory in this project and stops saving new memory about it. It also stops adding rules to the project's `AGENTS.md` files on its own. If you ask Lovable to remember something, it tells you that memory is off for this project.

In a project set to **Just this project** or **Nothing**, Lovable neither uses nor adds to your personal memory.

Neither setting deletes what Lovable has already saved. Neither one changes the rules in your project's `AGENTS.md` files. To remove one thing, ask Lovable in the chat to forget it.

## Memory or Instructions

Memory and [Instructions](https://docs.lovable.dev/features/knowledge.md) both give Lovable lasting context, from two different places.

Write an instruction when you know the rule up front and want it followed as written: coding standards, brand guidelines, or how your database is organized. Rely on memory for what comes up as you build, and correct it in the chat when Lovable gets it wrong.

## FAQ

> **Who else sees what Lovable remembers about my project?**
>
> Everyone who can edit the project. Project memory belongs to the project, so a teammate's correction changes what Lovable does for you too. What Lovable remembers about you is separate and is not shared with them. See [What Lovable remembers about your project](#what-lovable-remembers-about-your-project).

> **Why does my project have an AGENTS.md file I did not write?**
>
> Lovable wrote it. As you settle technical and architecture decisions, Lovable records them there as short rules, so it keeps applying them. The file is yours to edit. See [Rules in your project files](#rules-in-your-project-files).

> **Can I stop Lovable from remembering?**
>
> Yes, from the **Memory** settings page, which Lovable is rolling out gradually. For what Lovable remembers about you, disable **Use memory** in [Workspace settings → Memory](https://lovable.dev/settings/memory), which covers the projects in that workspace. For one project, set **Memory for this project** to **Nothing** in that project's **Memory** settings. Without that page, you can ask Lovable in the chat to forget one thing at a time, which does not stop it saving new memory. See [Choose what memory Lovable uses](#choose-what-memory-lovable-uses).

> **Does memory carry over when I remix a project?**
>
> A [remix](https://docs.lovable.dev/features/projects/remix.md) inside the same workspace starts with the original project's memory. A remix into another workspace starts with none, so the original project's memory is not copied to people outside your workspace. What Lovable remembers about you is never copied.

> **Does memory work in Chats?**
>
> In [Chats](https://docs.lovable.dev/features/chats.md), Lovable uses what it remembers about you, not the memory of any project. Project memory applies in the project chat and when Lovable builds.


## Related topics

- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Instructions](https://docs.lovable.dev/features/knowledge.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md)
