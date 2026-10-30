# Projects in Lovable
<!-- source: https://docs.lovable.dev/features/projects/overview.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Projects in Lovable

> What a project is in Lovable and how to work with one: create, organize, and publish projects, manage roles and ownership, and safely move or delete them.

A project is one app in Lovable. Every project lives inside a [workspace](https://docs.lovable.dev/features/workspace), has a single project owner, and holds everything that belongs to that app:

* **[Project chat](https://docs.lovable.dev/features/projects/chat.md)**: The conversation where you tell Lovable what to build.
* **[Preview](https://docs.lovable.dev/features/projects/preview.md)**: The live version of your app that updates as you build.
* **[Code](https://docs.lovable.dev/features/code-mode.md)**: Your app's source code, which you can browse, edit, and download.
* **[Version history](https://docs.lovable.dev/features/projects/history.md)**: Every change, saved automatically.
* **[Settings](https://docs.lovable.dev/features/projects/settings.md)**: The project's name, URL, domains, instructions, and more.

Lovable saves its work automatically: every edit it makes becomes a version in your project's version history, so there is nothing for you to save as you build.

Projects are the unit you build, share, and publish. Understanding how they work helps you keep work organized, collaborate with teammates, and know what happens when you move or delete a project.

## Ways to create a project

* **From the dashboard**: Describe what you want to build in the [prompt input](https://docs.lovable.dev/introduction/dashboard-overview.md#the-prompt-input), by typing or dictating with the microphone, and send it. Attach files or drag and drop them for context, and use the **+** menu to start from a [design template](https://docs.lovable.dev/features/business/design-templates.md) on Business and Enterprise plans or apply a [design system](https://docs.lovable.dev/features/design-systems.md). You can also start from a Figma design, a sketch, or a website whose layout you want Lovable to recreate: see the start paths in [Quick start](https://docs.lovable.dev/introduction/getting-started.md).
* **By importing existing work**: Upload a ZIP of an app you built in another tool, or paste the URL of a website you own, and Lovable rebuilds it as a project. See [Import a project from another tool](https://docs.lovable.dev/features/projects/import-project.md) and [Import a website](https://docs.lovable.dev/features/projects/import-website.md).
* **By remixing**: Create your own independent copy of an existing project: one of your own, a project that allows remixing, or a [Lovable template](https://lovable.dev/templates), which you can remix on any plan. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).
* **From a chat**: Describe the app in [Chats](https://docs.lovable.dev/features/chats.md) and, when you ask Lovable to build it, approve the **Create a new project?** card. See [Send work to a project](https://docs.lovable.dev/features/chats.md#send-work-to-a-project).
* **With Build with URL**: Generate a project from a shareable link that contains a prompt, useful for embedding a "Build with Lovable" button or sharing predefined prompts. See [Build with URL](https://docs.lovable.dev/integrations/build-with-url.md).

Lovable also works beyond the browser: create and edit projects from the [desktop app](https://docs.lovable.dev/integrations/desktop-app.md), the [mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md), the [ChatGPT app](https://docs.lovable.dev/tips-tricks/chatgpt-app.md), [Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md), the [Telegram bot](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md), or the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) in your other AI tools.

## Unpublished and published states

A new project is unpublished: only you and the specific people you share it with can see it, through the editor or a [preview link](https://docs.lovable.dev/features/share-project.md#share-preview-links). When you're ready, publishing deploys your app to its live URL. By default anyone with the link can visit it. On every plan, you can restrict website access to invited people. On Business and Enterprise plans, you can also restrict it to your workspace or a custom audience. Changes you make after publishing stay unpublished until you publish again, so visitors never see half-finished work. See [Publish your project](https://docs.lovable.dev/features/publish.md) and [Preview your app](https://docs.lovable.dev/features/projects/preview.md).

To try a change without changing the version everyone else is working on, build it in a [draft](https://docs.lovable.dev/features/drafts.md): a copy of the project with its own project chat and preview. When the change is ready, accept the draft to add it to the project.

### Your project URL

Every project gets a subdomain that forms its `lovable.app` web address after you publish. You can change it in **Project settings → URL subdomain**. Renaming a project changes only its display name, not its URL. On paid plans, you can also connect a [custom domain](https://docs.lovable.dev/features/custom-domain.md) after you publish. [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md) walks through the whole path.

## Project roles

Every project has one **owner**, usually the person who created it. Everyone else works in a project with one of three roles, managed from the **Share** menu in the editor:

| Role | What they can do | Availability |
| - | - | - |
| **Owner** | Everything: edit, publish, manage settings, transfer, or delete the project | Every project has exactly one |
| **Admin** | Full access to the project, including all project settings, integrations, and external connections | Paid plans |
| **Editor** | Build, edit, and manage most project settings | All plans (the default role) |
| **Viewer** | Read-only access to the project | Paid plans |

Invite people from the **Share** menu, by email or with an invite link. You can invite members of your workspace, or external collaborators: people outside your workspace who get access to just this project.

Workspace roles matter too. Workspace owners keep full access to all projects in the workspace regardless of who owns each project, and workspace admins have the same access except for projects with restricted access.

See [Share a project](https://docs.lovable.dev/features/share-project.md) for the full picture, including invite links and external collaborators.

### When ownership changes

* **Transfer ownership**: The owner can hand a project to another workspace member from **Project settings → Transfer ownership**.
* **When an owner leaves**: If a project owner leaves the workspace, their projects are automatically transferred to the member with the highest role (owners first, then admins, then editors). If an admin or owner removes them instead, that person [chooses who inherits the projects](https://docs.lovable.dev/features/people.md#choose-who-inherits-their-projects). Projects with access set to **Restricted**, which only the project owner, invited collaborators, and workspace owners can open, are not transferred. A workspace owner has to transfer them manually from the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) or from [project settings](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership).

## Organize and manage projects

You can manage a project from three places, whichever is closest: the project card's menu on the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#manage-projects-from-the-dashboard), the project's **⋯** menu in the [editor sidebar](https://docs.lovable.dev/features/projects/editor.md#sidebar), and [Project settings](https://docs.lovable.dev/features/projects/settings.md).

* **Rename**: From the project's **⋯** menu in the editor sidebar, the **Cmd+Shift+.** (Mac) or **Ctrl+Shift+.** (Windows/Linux) shortcut in the editor, or **Project settings → Project name**.
* **Pin**: Add the project to your **Pinned** list, from the project card or the project's **⋯** menu in the editor sidebar.
* **Move to folder**: Organize projects into dashboard folders, from the project card or the project's **⋯** menu in the editor sidebar. See [Project folders](https://docs.lovable.dev/introduction/project-folders.md).
* **Move to another workspace**: From the project card menu or **Project settings → Move workspace**. The project keeps its history and settings. People invited directly to the project only move with it if you opt in. See [Move a project to another workspace](https://docs.lovable.dev/features/projects/settings.md#move-a-project-to-another-workspace).
* **Transfer ownership**: From **Project settings → Transfer ownership**.
* **Delete**: From **Project settings → Danger zone → Delete project**, or from the project card's menu on the dashboard. The published app and preview links stop working, and you can restore the project for 60 days. See [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md).

## FAQ

> **How do I create a project?**
>
> On the dashboard, select **Build** in the mode picker, describe what you want to build in the prompt box, and send it. Lovable creates the project and builds a first version. You can attach a design, a sketch, or a document to that first prompt. See [Ways to create a project](#ways-to-create-a-project).

> **Is my work saved automatically?**
>
> Yes. Every change Lovable makes is saved automatically as a version in your project's [version history](https://docs.lovable.dev/features/projects/history.md). There is no save button, and you can revert to any earlier version at any time.

> **How many projects can I have?**
>
> There is no project limit. Every workspace member can create and work on as many projects as they want. Plans are priced by credits, not by projects or seats. See [Lovable workspace](https://docs.lovable.dev/features/workspace).

> **Can a project belong to multiple workspaces?**
>
> No. A project lives in one workspace at a time. You can move it to another workspace from **Project settings → Move workspace**, or remix it into a different workspace to create an independent copy there.

> **Can I recover a deleted project?**
>
> Yes, for 60 days, from [Workspace settings → Workspace → Recently deleted projects](https://lovable.dev/settings/workspace). You can restore projects you own, and workspace owners can restore any deleted project in the workspace. After 60 days, Lovable permanently deletes the project and nobody can restore it. See [Restore a deleted project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project).

> **Why do I see 'Project not found'?**
>
> The project was most likely deleted, or you no longer have access to it. If neither should be true, contact [Support](https://lovable.dev/support).

> **Who can see my project?**
>
> That depends on your project access setting, which you manage from the **Share** button in the editor. See [Project access](https://docs.lovable.dev/features/project-visibility.md) and [Share a project](https://docs.lovable.dev/features/share-project.md).


## Related topics

- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
