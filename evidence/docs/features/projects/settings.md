# Project settings
<!-- source: https://docs.lovable.dev/features/projects/settings.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project settings

> Every Lovable project setting in one reference: rename a project, change its URL, control publishing and sharing, connect Git, manage domains, or delete a project.

**Project settings** is where you manage a single project: its name and URL, project type, monitoring, publishing options, sharing toggles, Git connection, domains, instructions, and skills. This page walks through the settings tab by tab so you know exactly where each option lives.

## Where to find project settings

You can open a project's settings from several places. You need edit access to the project for all of them.

In the editor:

* **Chat actions menu**: Click the **+** button next to the chat input and choose **Project → Settings**. See [Chat actions](https://docs.lovable.dev/features/projects/chat.md#chat-actions).
* **More menu**: Select **More** in the project toolbar, then **Settings**. **General** opens inside the editor. The same group also lists **Instructions**, **Domains**, and **Git**. See [The More menu](https://docs.lovable.dev/features/projects/editor.md#the-more-menu).
* **Draft switcher**: Click your project's name at the top of the editor, then the **Project settings** button on the top row of the switcher. See [Project name and drafts](https://docs.lovable.dev/features/projects/editor.md#project-name-and-drafts).
* **Keyboard**: Press **Cmd+.** (Mac) or **Ctrl+.** (Windows/Linux).

Outside the editor:

* **Dashboard**: Open a project card's three-dot menu and select **Settings**. See [Manage projects from the dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#manage-projects-from-the-dashboard).
* **Sidebar project list**: On the dashboard or in the editor, hover a project in the sidebar, click its **⋯** button, and select **Settings**.
* **Lovable mobile app**: Tap the project's name in the editor and choose **Settings**. See [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md#editor-and-project-menu).

From anywhere in Lovable, press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) to open the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) and type the name of the setting you're looking for.

> [!NOTE]
>
> Access control does not live here. Who can access the project, collaborators, invite links, and share preview links all live in the **Share** menu in the top right of the editor. See [Share your project](https://docs.lovable.dev/features/share-project.md).

> [!NOTE]
>
> To view or edit the source code Lovable generates for your app, open the **Code** tab in the [project toolbar](https://docs.lovable.dev/features/projects/editor.md#project-toolbar), not Project settings. See [Code editor](https://docs.lovable.dev/features/code-mode.md).

## General tab

The **General** tab opens by default and contains most settings, grouped into sections.

### Details

* **Project name**: Rename your project. Lovable names new projects automatically, and the name is visible only inside your workspace, never to visitors of your published app. Renaming only changes the display name, not your project's URL.
* **URL subdomain**: Change the subdomain of your published `lovable.app` address, which is where visitors find your app once you [publish](https://docs.lovable.dev/features/publish.md).
* **Owner**: Shows who owns the project, with a link to their profile. See [project roles](https://docs.lovable.dev/features/projects/overview#project-roles).
* **Messages count** and **AI edits count**: Read-only counters showing how much you've built in this project.
* **Use as a template**: Turn your project into a template that others in your workspace can start from. Available on Business and Enterprise plans. See [Design templates](https://docs.lovable.dev/features/business/design-templates.md). On workspaces that use [design systems](https://docs.lovable.dev/features/design-systems.md), this appears as a **Project type** selection instead, with **Design system** as a third option.
* **Design system** (paid plans): The design system Lovable builds this project with, so new UI matches your organization's components and styles. Click **Attach design system** to pick one, or **Manage design system** once attached. See [Design systems](https://docs.lovable.dev/features/design-systems.md).

### Project monitoring

* **Project monitoring**: Have Lovable review your project's code and recent visitor errors on a daily or weekly schedule, and alert you to important issues in the editor and by email. Disabled by default, available on Pro plans and above. See [Project monitoring](https://docs.lovable.dev/features/project-monitoring.md).

### Lifecycle

* **Abandonment protection**: Keep this project out of your workspace's [abandoned projects](https://docs.lovable.dev/features/privacy-and-security-settings.md#abandoned-projects) cleanup. A protected project is never marked abandoned and never deleted for inactivity. Disabled by default, Enterprise only, and changing it requires edit access to the project. See [Protecting a project from cleanup](https://docs.lovable.dev/features/privacy-and-security-settings.md#protecting-a-project-from-cleanup).

### Preview

* **Live preview**: Run your app live in the editor preview so changes appear as Lovable works. Enabled by default. When you disable it, the preview shows the most recent completed version of your app instead, and switching between versions in [version history](https://docs.lovable.dev/features/projects/history.md) doesn't restart the live environment. You can re-enable it at any time. See [Turn off the live preview](https://docs.lovable.dev/features/projects/preview.md#turn-off-the-live-preview).

### Publishing

* **Project category**: Categorize what kind of app this is, which helps Lovable and directories present it correctly.
* **Hide Lovable badge**: Removes the "Edit with Lovable" badge from your published app. Available on Pro plans and above. Enabling or disabling it applies to your live site immediately, with no republish needed. If your workspace later moves to a plan that doesn't include this, the badge comes back the next time you publish the project.
* **Visitor analytics**: Collect visitor data for your published app, which powers the [Analytics](https://docs.lovable.dev/features/analytics.md) view in the editor. Enabled by default. When you disable it, Lovable stops collecting and the Analytics view shows no new data.
* **AI app context**: Let Lovable use context from your app's AI calls to debug and improve its AI features. Secrets are removed from the logs automatically, and logs are kept for 90 days. See [AI features](https://docs.lovable.dev/features/ai#ai-app-context).
* **Auto-fix security issues**: Let Lovable automatically fix low-risk issues found by [security scans](https://docs.lovable.dev/features/security), so simple findings don't wait on you. Workspace owners and admins can set a workspace-wide default in **Workspace settings → Privacy & security**, and when they lock it there, the project setting can't be changed here.
* **Unpublish project**: Takes your published app offline. The button is available while the project is published and you have permission to unpublish it. See [Who can publish and unpublish projects?](https://docs.lovable.dev/features/publish.md#who-can-publish-and-unpublish-projects).

### Sharing

* **Project access**: A shortcut only: the **Open share menu** button takes you to the **Share** menu, where you control who can view and edit the project. See [Share your project](https://docs.lovable.dev/features/share-project.md).
* **Public remixing**: Control whether anyone with your project's link can see a preview of your app and create their own copy of it. Disabled by default, and not available in Enterprise workspaces. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).
* **Cross-project sharing**: Controls whether your other projects can reference this one as context. Workspace admins can disable this workspace-wide. See [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md).

### Project actions

* **Remix project**: Duplicate this app in a new project with the **Remix** button. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).
* **Migrate to TanStack Start**: Upgrade an older React + Vite project to TanStack Start, Lovable's latest template, with the **Migrate** button, so your pages render on the server. The row appears only on projects that can upgrade. See [Upgrade a project to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md).
* **Move workspace**: Move this project to a different [workspace](https://docs.lovable.dev/features/workspace) you belong to with the **Move** button. See [Move a project to another workspace](#move-a-project-to-another-workspace) below.
* **Transfer ownership**: Make another member of your workspace the project owner. See [Transfer project ownership](#transfer-project-ownership) below, or [Change the owner of several projects](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) to hand over a batch at once.

#### Transfer project ownership

Click **Transfer ownership** and pick the new owner. The new owner must be an active member of the workspace with an owner, admin, or editor role: viewers, external collaborators, and people with pending invites aren't eligible. On Business and Enterprise plans, you can also enter the email address of a Lovable account outside your workspace, and Lovable sends that person a transfer request to accept. After the transfer, the new owner has full control of the project, and what you can still do depends on your [workspace role](https://docs.lovable.dev/features/people.md). If the project's access is set to **Restricted**, only the owner, invited collaborators, and workspace owners can open it, so after the transfer you lose access to it entirely unless you're a workspace owner. See [Project access](https://docs.lovable.dev/features/project-visibility.md). If an owner leaves the workspace, their projects transfer automatically to the member with the highest role, and if an admin or owner removes them, that person [chooses who inherits them](https://docs.lovable.dev/features/people.md#choose-who-inherits-their-projects). See [project roles](https://docs.lovable.dev/features/projects/overview#project-roles).

You can also hand over several projects at once from the dashboard, which is quicker when someone is leaving or you're consolidating projects. See [Change the owner of several projects](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects).

#### Move a project to another workspace

Click **Move** on the **Move workspace** row and pick the destination workspace. You can also start a move from the dashboard: open a project card's menu and select **Move → To workspace**, or select several projects to move them together. You can move projects you own. Workspace owners can move any project in the workspace, and workspace admins can move any project they can access. On Enterprise workspaces, project owners additionally need the [**Editor project transfers**](https://docs.lovable.dev/features/privacy-and-security-settings.md#editor-project-transfers) setting turned on.

The move dialog includes a **Transfer project collaborators** checkbox:

* **Off (default)**: people invited directly to the project, and any pending project invites, are removed when the project moves. Access through workspace membership is not affected.
* **On**: Lovable keeps direct collaborators and pending invites when the destination workspace allows their role and you have permission to grant it there. Some collaborators may still be removed, for example when the destination workspace's [**External project collaborators**](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-project-collaborators) policy doesn't allow their role.

Two more things change during a move: the project leaves its dashboard [folder](https://docs.lovable.dev/introduction/project-folders.md), and its access setting resets to the destination workspace's default, so check **Project access** after the move if the project should stay restricted.

After the move, the destination workspace pays for the project's usage. [Cloud and AI gateway usage](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs) draws from the destination workspace's credits from the move onward. Usage already charged to the original workspace before the move stays there.

### Danger zone

* **Delete project**: Removes the project from the workspace after you type its name to confirm. The published app and preview links stop working, and you can restore the project for 60 days. See [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md).

## Git tab

The **Git** tab is where you connect your project to a [GitHub](https://docs.lovable.dev/integrations/github.md), [GitLab](https://docs.lovable.dev/integrations/gitlab.md), or [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md) repository and manage the connection. The sync is two-way: Lovable pushes every change it makes to the repository, and commits you push to the synced branch flow back into Lovable. That gives you a full copy of your code outside Lovable and lets developers on your team work with their own tools. See [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) for how the sync works.

## Domains tab

The **Domains** tab is where you manage the web addresses of your published app. You can connect a domain you already own, buy a new domain directly through Lovable, and choose a primary domain that all your project's other addresses redirect to. You can also buy and connect a domain by asking Lovable in the project chat. You can set a primary domain only in this tab. Custom domains are available on paid plans. On the Enterprise plan, if your workspace has a [publishing domain](https://docs.lovable.dev/features/publishing-domain.md), the tab also shows the app's address under that domain. See [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md), or follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md) for the full path from publishing to a live site on your domain.

## Instructions tab

The Instructions tab is where you write your project's instructions and guidelines. Lovable follows them in every request, so use this tab to describe your product, audience, and preferences once instead of repeating them in the project chat. Anyone with edit access can update the project instructions, and the same tab shows your workspace instructions. The **Instructions** section under **More** shows this project's instructions only. See [Instructions](https://docs.lovable.dev/features/knowledge.md).

Open the Instructions tab from any of these places:

* **Workspace settings → Instructions**, under **Customization** in the workspace settings sidebar
* **Project → Instructions** in the **Chat actions** menu in the editor
* **More → Workspace settings → Instructions** in the project toolbar

## Skills tab

Open **Workspace settings → Skills**, also under **Customization** in the workspace settings sidebar, to manage the reusable instruction sets available in this project, such as a launch checklist or a release notes format. Workspace owners and admins manage which skills exist. See [Skills](https://docs.lovable.dev/features/skills.md).

## FAQ

> **Where do I change who can see my project?**
>
> In the **Share** menu in the top right of the editor. That's where you manage project access, collaborators, invite links, and share preview links. The **Project access** row in settings is a shortcut that opens the same menu. See [Share your project](https://docs.lovable.dev/features/share-project.md).

> **How do I rename my project?**
>
> Open **Project settings → General** and edit **Project name**. In the editor, you can also press **Cmd+Shift+.** (Mac) or **Ctrl+Shift+.** (Windows/Linux). Another route is the sidebar: hover the project and choose **Rename** from its **⋯** menu. Renaming changes the display name only. To change your published address, edit **URL subdomain** instead.

> **What's the difference between Move, Transfer ownership, and Remix?**
>
> * **Move workspace** sends the project to another workspace you belong to.
> * **Transfer ownership** keeps the project in the same workspace but makes another workspace member the owner.
> * **Remix project** creates a separate copy of the project to build on, in this workspace or another one. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).

> **How do I delete a project?**
>
> In **Project settings → Danger zone**, select **Delete project** and type the project's name to confirm. The published app and preview links stop working, and you can restore the project for 60 days. See [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md).

> **Is deleting a project reversible?**
>
> For 60 days, yes. Restore it from [Workspace settings → Workspace → Recently deleted projects](https://lovable.dev/settings/workspace). After 60 days, Lovable permanently deletes the project and nobody can restore it. See [Restore a deleted project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project).

> **Does changing the URL subdomain break my old link?**
>
> Your published app moves to the new `lovable.app` address, so anyone using the old link needs the new one. If you want a stable address you control, connect a custom domain from the **Domains** tab. See [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md).


## Related topics

- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
- [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Project monitoring](https://docs.lovable.dev/features/project-monitoring.md)
