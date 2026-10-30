# Sync your Lovable project with Bitbucket
<!-- source: https://docs.lovable.dev/integrations/bitbucket.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync your Lovable project with Bitbucket

> Export and two-way sync your Lovable project code with a Bitbucket Cloud workspace for code backup, collaboration, and deployment.

When you build with Lovable, your project code is stored and managed inside the Lovable platform.

[Bitbucket](https://bitbucket.org/) is Atlassian's platform for storing, managing, and sharing code, with version control, pull requests and code reviews, Bitbucket Pipelines for automated builds and deployments, and Jira integration.

If you want your own copy, plan to collaborate with developers, or move your project elsewhere, you can export and sync your project to Bitbucket Cloud: back up your code, review changes in pull requests, work locally in your IDE, test features on branches, and deploy outside Lovable.

For the full picture of what Git sync is, how the two-way sync model works across providers, and how to choose between GitHub, GitLab, and Bitbucket, see the [Git sync overview](https://docs.lovable.dev/integrations/git-sync-overview).

> [!NOTE]
>
> Lovable syncs with **Bitbucket Cloud** (bitbucket.org). Lovable does not support self-hosted **Bitbucket Data Center** or **Bitbucket Server** instances.

> [!NOTE]
>
> You don't need Bitbucket to use Lovable. Many users build and launch entirely within Lovable. If you only need a copy of your code, you can download your code directly from Lovable: use the **Download codebase** section in **Project settings → Git**, or open the [Code editor](https://docs.lovable.dev/features/code-mode.md) and click **Download codebase** at the bottom of the file tree sidebar (paid plans).

## How Bitbucket Git sync works

Like all [Git sync](https://docs.lovable.dev/integrations/git-sync-overview), the Bitbucket integration has two layers:

1. A **workspace connection**
2. A **project repository link**

### Workspace connection

A workspace connection authorizes Lovable to access one Bitbucket Cloud workspace. You sign in with your Atlassian account and grant Lovable access, then choose the Bitbucket workspace to connect. Lovable registers a webhook on that workspace so that changes on Bitbucket reach your projects. A webhook is a notification Bitbucket sends to Lovable whenever something happens in the workspace, such as a push.

Every project in the Lovable workspace can use the same workspace connection.

A Lovable workspace can contain:

* Multiple Bitbucket connections, one per Bitbucket workspace
* Bitbucket connections alongside GitHub and GitLab connections

Each Bitbucket workspace can be connected once per Lovable workspace.

> [!NOTE]
>
> You need **admin** access to the Bitbucket workspace you connect. Lovable registers a workspace-level webhook during setup, and Bitbucket only allows workspace admins to do that.

### Project repository link

A project repository link connects one Lovable project to one Bitbucket repository.

When connected:

* Changes made in Lovable sync to Bitbucket
* Changes pushed to the active Bitbucket branch sync back into Lovable
* Lovable only edits and syncs one branch at a time

### Role-based access for Bitbucket integration

| Role | Allowed action |
| - | - |
| Workspace owner or admin only | <ul><li>Add a workspace connection</li><li>Reconnect a workspace connection (re-authorize with Atlassian)</li><li>Unlink projects from a workspace connection</li><li>Delete a workspace connection</li><li>Enable or disable **Include member email addresses in commits** (Business and Enterprise plans)</li></ul> |
| <ul><li>Workspace owner or admin</li><li>Project owner or admin</li></ul> | <ul><li>Connect a project to a repository</li><li>Disconnect a project from a repository</li></ul> |
| <ul><li>Workspace editor or higher</li><li>Project editor or higher</li></ul> | <ul><li>View sync status</li><li>Switch branches</li><li>Create branches</li><li>View the connection in Workspace settings → Git → Bitbucket</li></ul> |

## Create a workspace Bitbucket connection

**Workspace admins and owners** can create workspace connections from:

* [**Workspace settings → Git**](https://lovable.dev/settings/git) **→ Bitbucket → Add connection**
* [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ Bitbucket → Add connection** (if a project has not been connected yet)

You need an Atlassian account with admin access to at least one Bitbucket Cloud workspace. You can create a Bitbucket account for free at [bitbucket.org](https://bitbucket.org/).

**1. Add a new connection**

Click **Add connection**. The **Connect Bitbucket** screen opens.

**2. Authorize with Bitbucket**

Click **Authorize with Bitbucket**. A popup opens to Atlassian's sign-in page. Sign in and grant Lovable access.

Atlassian stores the authorization on your Atlassian account, not on the Bitbucket workspace. You can review or revoke it later under **Connected apps** in your Atlassian account settings.

**3. Select a workspace**

Under **Select workspace**, Lovable lists the Bitbucket workspaces available on your account. Click **Connect** next to the workspace you want to use.

If only one workspace is available, Lovable connects it directly and skips this step. Workspaces that are already connected to your Lovable workspace do not appear in the list.

> [!WARNING]
>
> A Bitbucket workspace you created within the last few minutes cannot receive pushes yet, because Bitbucket activates new workspaces with a short delay. If you connect a project right after creating the workspace, Lovable shows how long to wait. Try again after that time.

## Link a project to a Bitbucket repository

With an active workspace Bitbucket connection in place, **workspace or project admins and owners** can connect a Lovable project to a Bitbucket repository.

* When you connect a project, Lovable creates a new Bitbucket repository. The repository is **private**, so nobody can see your code unless you change its access level on Bitbucket.
* The repository is named after your project. If the workspace already has an empty repository with that name, Lovable uses it. If the existing repository has commits, Lovable adds a short suffix to the new repository's name instead.
* Each Lovable project can connect to one repository on one provider. If the project already syncs with GitHub or GitLab, the Bitbucket card does not appear in **Project settings → Git** until you [disconnect the project](https://docs.lovable.dev/integrations/git-sync-overview#disconnecting-and-reconnecting) from that provider.

**1. Open the project's Bitbucket settings**

Open **Project settings → Git → Bitbucket**.

**2. Connect the project**

Under **Connect project**, click **Connect** next to the Bitbucket workspace where the new repository should be created.

Lovable creates a new Bitbucket repository and starts two-way sync automatically.

> [!WARNING]
>
> Don't delete your Bitbucket repository or move it to a Bitbucket workspace that is not connected to your Lovable workspace. Doing so breaks the sync, and Lovable won't be able to update your project. You can rename the repository or the Bitbucket workspace: Lovable tracks both automatically.

## Manage a project's repository sync

After connecting a project to a Bitbucket repository, you see the following in the project's Bitbucket settings:

* Repository status as **Connected**
* [Sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card showing whether Lovable and Bitbucket are on the same commit
* Branch picker with active branch name (Bitbucket branch synced with Lovable)
* Clone URLs (HTTPS, SSH)
* Option to **View on Bitbucket** (available from the dropdown)
* Option to **Disconnect** (available from the dropdown)

Lovable only edits and syncs one branch at a time. By default, this is the `main` branch. Changes pushed to the currently active branch sync back into Lovable.

If the sync status card says **Lovable and Bitbucket have diverged**, Lovable and Bitbucket each have commits that the other does not. Lovable pushes its changes to the `lovable-sync` branch instead of the synced branch, as described under [Troubleshooting](#troubleshooting), and the next sync from Bitbucket replaces Lovable's version of the branch with the Bitbucket version. **Re-check** compares the branches again and doesn't sync anything.

### Switch branches

Use the branch picker in the project's Bitbucket settings to change which branch Lovable edits and syncs.

1. Click the branch picker.
2. Search or select a branch.
3. Click the branch to switch.

Lovable immediately starts editing and syncing the branch you switched to.

You can switch back to the default branch at any time.

### Create a new branch

You can create a branch from the same picker without leaving Lovable.

1. Click the branch picker.
2. Click **Create branch** at the bottom of the list.
3. Enter a branch name. Lovable validates it against empty names, invalid characters, and duplicates.
   > [!NOTE]
   >
   > Branch names must follow Git naming rules (no spaces, .., leading or trailing dots or dashes, and special characters such as \~ ^ : ? \* \[ ] \\).

Lovable creates the new branch from the **currently active branch** as its source (shown as `Source: <active branch>` in the dialog). Lovable automatically switches to the new branch and starts editing and syncing it.

> [!WARNING]
>
> The source is your **currently active branch**, not the repository's default branch. If you want to start a new feature branch from `main`, switch to `main` first, then create the new branch.

> [!NOTE]
>
> You can't switch branches or create new branches while Lovable is editing the project.

### Clone the repository locally

After connecting a project, Lovable provides clone URLs for:

* HTTPS
* SSH

You can clone the repository locally and continue working in your preferred IDE.

For the branch strategy, environment setup, and the handover between Lovable and your IDE, see [Work locally in your IDE](https://docs.lovable.dev/integrations/git-sync-overview#work-locally-in-your-ide).

### Commit attribution

Commits made by Lovable are authored by Lovable's bot identity. In the commit log the author reads `gpt-engineer-app[bot]`, an earlier name for that identity, and Bitbucket does not link it to an account. Lovable pushes the commits through the authorization of the Atlassian account that connected the workspace. That account is not necessarily the member who made the change, and Lovable does not add a `Co-authored-by` line on Bitbucket repositories.

To record who triggered each commit, enable **Include member email addresses in commits** in workspace settings. See [Commit attribution](https://docs.lovable.dev/integrations/git-sync-overview#commit-attribution) (Business and Enterprise plans).

### Disconnect a project from Bitbucket

When you disconnect a project, Lovable removes the link between the project and its Bitbucket repository.

When you disconnect:

* **Sync stops.** The two-way connection between Lovable and Bitbucket ends.
* **Your repository stays on Bitbucket.** It remains intact with all history and files.
* **Your project and its code stay in Lovable.** Future changes are stored only inside Lovable.

Lovable keeps the workspace connection when you disconnect a project.

**Workspace or project admins and owners** can disconnect from the project's Bitbucket settings: in the active repository connection, open the dropdown, select **Disconnect**, type the repository name to confirm, and click **Disconnect**.

If a project needs Bitbucket again, you can link it to any available connection. If you reconnect later:

* Lovable creates a new repository with the current version of your project.
* The original repository stays unchanged on Bitbucket and is no longer linked to Lovable.

## Unlink projects from a workspace Bitbucket connection

**Workspace admins and owners** can remove specific projects from a connection without deleting the connection entirely. The connection remains available for other projects.

**1. Open Bitbucket settings**

Open **Workspace settings → Git → Bitbucket**.

**2. Open the connection**

Open the connection you want to manage.

**3. Select projects**

Under **Linked projects**, check the projects you want to unlink.

**4. Confirm**

* Click **Unlink N projects** (where `N` is the number of projects you selected)
* Click **Unlink** to confirm

When unlinked, those projects no longer sync through this connection.

## Delete a workspace Bitbucket connection

**Workspace admins and owners** can delete Bitbucket connections.

When you delete a workspace Bitbucket connection, Lovable:

* Removes the connection for all projects
* Stops syncing for linked projects
* Removes the Lovable webhook from the Bitbucket workspace
* Keeps the repositories on Bitbucket
* Deletes the stored credentials

> [!WARNING]
>
> You cannot restore a deleted connection. Projects that used it stop syncing until a workspace admin or owner adds a new connection and reconnects each project.

**1. Open Bitbucket settings**

Open **Workspace settings → Git → Bitbucket**.

**2. Open the connection you want to remove**

Select the connection from the list.

**3. Review linked projects**

Review the **Linked projects** section carefully before deleting the connection to avoid unintentionally removing Bitbucket sync.

**4. Delete**

Under **Delete this connection**, click **Delete**, type the connection name to confirm, and click **Delete**.

## Limitations

The Bitbucket Git sync integration currently does not support:

* Bitbucket Data Center or Bitbucket Server. Lovable supports Bitbucket Cloud (bitbucket.org) only.
* Importing existing Bitbucket repositories into Lovable. You can only export from Lovable to Bitbucket.
* Reconnecting to the same repository after disconnecting. Lovable creates a new repository on reconnect.
* Connecting the same Bitbucket workspace more than once.
* Following a repository moved to a Bitbucket workspace that is not connected to your Lovable workspace.

## FAQ

> **Do I need to know Bitbucket to use this feature?**
>
> No. Connect and authorize once, and Bitbucket safely stores your code.
>
> You only need to learn Bitbucket's features if you want to do more advanced things such as branching, pull requests, or Bitbucket Pipelines.

> **Does Lovable support Bitbucket Data Center or Bitbucket Server?**
>
> No. Lovable syncs with Bitbucket Cloud (bitbucket.org) only and does not support self-hosted Bitbucket Data Center or Bitbucket Server instances.

> **Is the repository Lovable creates public or private?**
>
> Repositories created by Lovable are **private**, on every plan. Nobody can see your code on Bitbucket unless you change the repository's access level yourself in Bitbucket.

> **What happens if I rename my Bitbucket repository?**
>
> Sync continues. Lovable identifies your repository and Bitbucket workspace by their internal IDs, not by their names, so it follows repository renames automatically, even when Bitbucket does not deliver the rename notification. The repository link in your project settings updates to the new name.

> **What happens if I rename my Bitbucket workspace?**
>
> Sync continues. Lovable identifies the workspace by its internal ID rather than its name, so changing the workspace ID or name in Bitbucket does not break the connection. The workspace name shown in Lovable updates the next time a workspace owner or admin reconnects the connection.

> **What happens if I move my repository to another Bitbucket workspace?**
>
> If your Lovable workspace also has a connection to the destination Bitbucket workspace, sync follows the repository there.
>
> Otherwise Lovable disconnects the project. To resume syncing:
>
> 1. Add a workspace connection for the destination Bitbucket workspace.
> 2. Open the project's Bitbucket settings and connect the project to that connection.
>
> When you reconnect, Lovable creates a new repository. The moved repository stays on Bitbucket but is no longer linked to Lovable.

> **What happens if I delete my Bitbucket repository?**
>
> The connection breaks and the project stops syncing. Your project and its code stay in Lovable. Disconnect the project and connect it again to create a new repository with your current code.

> **How can I switch to a different Bitbucket workspace or Atlassian account?**
>
> You can't change the linked workspace on an existing project. As a workaround:
>
> 1. Disconnect the project from Bitbucket in the project's Bitbucket settings.
> 2. Add a connection for the other Bitbucket workspace, if your Lovable workspace doesn't have one yet.
> 3. Connect the project to that connection.
>
> Lovable creates a new repository. The original repository stays on Bitbucket but is no longer linked to Lovable.

> **Can I disconnect from Bitbucket?**
>
> Yes. Workspace or project admins and owners can [disconnect a project from Bitbucket](#disconnect-a-project-from-bitbucket) at any time in the project's Bitbucket settings. Your repository stays on Bitbucket, but syncing stops. If you reconnect later, Lovable creates a new repository.

> **Can I import an existing Bitbucket repository into Lovable?**
>
> No. You can only export from Lovable to Bitbucket, not the other way around. When you connect a project, Lovable always creates a new repository.

> **Can I connect multiple Bitbucket workspaces?**
>
> Yes. A Lovable workspace can have a connection to each Bitbucket workspace you have admin access to. Each Bitbucket workspace can be connected once per Lovable workspace. Each Lovable project is then linked to one repository in one of those workspaces.

> **Who is the author of commits Lovable makes on Bitbucket?**
>
> Commits made by Lovable are authored by Lovable's bot identity. In the commit log the author reads `gpt-engineer-app[bot]`, an earlier name for that identity, and Bitbucket does not link it to an account. Lovable makes the pushes through the authorization of the Atlassian account that connected the workspace.

## Troubleshooting

When something goes wrong, Lovable shows a **Connection lost** message with a **Reconnect** button in the affected project's Bitbucket settings.

> **Clicking 'Authorize with Bitbucket' does nothing, or shows a blocked sign-in window message.**
>
> Your browser blocked the Bitbucket sign-in popup. Allow popups for Lovable and try again.

> **The connected git provider session has expired or been revoked. Reconnect to continue syncing.**
>
> Lovable lost access to your Bitbucket workspace, most often because someone removed Lovable under **Connected apps** in their Atlassian account, or because the Atlassian account that connected the workspace lost access to it.
>
> A workspace owner or admin can restore it:
>
> 1. Open the affected project's Bitbucket settings.
> 2. Click **Reconnect**. A popup opens to Atlassian's sign-in page.
> 3. Sign in with an account that has admin access to the same Bitbucket workspace and grant Lovable access.
>
> Sync resumes for every project on this connection. Commits pushed to Bitbucket while access was revoked appear in Lovable after the next push to the synced branch.
>
> A workspace owner or admin can also reconnect from the connection itself: open **Workspace settings → Git → Bitbucket**, select the connection, and click **Reconnect**. Use this path for a connection that has no linked project.

> **The Lovable webhook on this Bitbucket workspace was removed, so changes made in Bitbucket no longer reach this project. Reconnect to restore it.**
>
> A Bitbucket workspace admin deleted the **Lovable GitSync** webhook in the workspace's webhook settings. Edits made in Lovable still reach Bitbucket, but pushes to Bitbucket no longer reach Lovable.
>
> Open the project's Bitbucket settings and click **Reconnect**. Lovable registers the webhook again.

> **New Bitbucket workspaces take a few minutes to activate; retry shortly.**
>
> Bitbucket rejects pushes to a workspace for several minutes after the workspace is created, and Bitbucket shows the same message when a workspace exceeds its user limit or has a billing problem.
>
> If you created the workspace within the last few minutes, wait for the time shown in the message and connect the project again. If the message persists, check the workspace's user limit and billing in Bitbucket.

> **This repository is no longer accessible. Try reconnecting, or disconnect to connect this project to a different repository.**
>
> Someone deleted the repository on Bitbucket, or moved it to a Bitbucket workspace this Lovable workspace has no connection for.
>
> You can either:
>
> * **Restore the repository on Bitbucket.** Move it back to its original workspace. Sync resumes automatically.
> * **Start a new repository.** Open the project's Bitbucket settings, disconnect the project, then connect it again. Lovable creates a new Bitbucket repository with your current code.

> **My commits and pushes from Bitbucket aren't showing up in Lovable.**
>
> Lovable only syncs **one branch at a time**, and that is the branch the project is currently set to in its Bitbucket repository connection settings. By default this is `main`.
>
> If you pushed commits to a different branch in Bitbucket, you have two options:
>
> * **Merge your changes into the synced branch**. For example, open a pull request from your feature branch into `main` and merge it. Lovable then picks up those commits.
> * **Switch the synced branch in Lovable**. In your project's Bitbucket settings, select the branch where your commits live. Lovable starts editing and syncing that branch instead, and your commits will appear.

> **I pushed to the synced branch, but the commits don't appear in Lovable and the sync status says Bitbucket is ahead.**
>
> Lovable pulls your changes when Bitbucket notifies it about a push to the synced branch. If that notification never arrives, the commits from that push don't appear in Lovable, and Lovable doesn't pull them later without a new notification. The [sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card in the project's Bitbucket settings shows **Bitbucket is N commits ahead of Lovable** until the next sync.
>
> If the project shows the message that the Lovable webhook was removed, click **Reconnect** first. Lovable registers the webhook again. Without the webhook, a new push never notifies Lovable.
>
> In every other case **Reconnect** doesn't fix this. It appears only when the connection itself has a problem, and it restores access to the repository without pulling commits. **Re-check** on the sync status card compares the branches again and doesn't sync anything either.
>
> To make Lovable pull the missing commits, push a new commit to the synced branch. Any push works, including an empty commit:
>
> ```bash theme={null}
> git commit --allow-empty -m "Trigger Lovable sync"
> git push
> ```
>
> Lovable then syncs the branch to its current state on Bitbucket, which includes the earlier commits.
>
> Before you push, confirm the branch and the state of your Lovable edits:
>
> * You're pushing to the repository and branch shown in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ Bitbucket**. Commits on other branches don't sync.
> * Your latest Lovable edits are already in the repository on Bitbucket. If the sync status says **Lovable and Bitbucket have diverged**, the push replaces Lovable's version of the branch with the Bitbucket version, and the project no longer contains edits made only in Lovable. Lovable saves a backup first, and the project owner can [restore it](https://docs.lovable.dev/integrations/git-sync-overview#restore-lovable-work-after-a-push-replaces-it) from the notice in the editor or in **Project settings → Git**.
>
> If the commits still don't appear after a new push, contact [Lovable Support](https://lovable.dev/support).

> **I see a "lovable-fallback" branch in the branch picker.**
>
> Someone deleted the synced branch on Bitbucket. Lovable automatically switched the project to a new branch called `lovable-fallback` so that you can continue editing. Your repository is otherwise unchanged.
>
> Pick another branch or recreate the original branch. After you switch away, you can leave or delete `lovable-fallback` in Bitbucket.

> **My push from Lovable ended up on a "lovable-sync" branch instead of the synced branch.**
>
> Bitbucket rejected the push to your synced branch, most often because someone pushed a conflicting change that Lovable could not apply your work on top of. To avoid losing your work, Lovable pushed it to a branch named `lovable-sync` instead, and your project's Bitbucket settings show "Your changes conflict with commits on `<your branch>` and could not be merged automatically. They were pushed to the branch `lovable-sync` instead. Merge that branch into `<your branch>` to apply them."
>
> Open that branch on Bitbucket, review the changes, and merge them into your synced branch through your usual review process.
>
> When a later push is rejected too, Lovable adds those changes to the same `lovable-sync` branch. If you've added your own commits to `lovable-sync`, Lovable leaves them untouched and pushes to a new branch named `lovable-sync-<timestamp>` instead. Review and merge that branch the same way.

> **Lovable can't edit a large file in my project.**
>
> Lovable cannot save files larger than **10 MB** into your project. Files you push from your own computer can be larger (up to Bitbucket's own limits) and sync into Lovable, but any Lovable edit that touches a file over 10 MB fails. For large media, ask Lovable to "Migrate large files to CDN assets". See the [chat page FAQ](https://docs.lovable.dev/features/projects/chat.md) for details.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Sync your Lovable project with GitLab](https://docs.lovable.dev/integrations/gitlab.md)
- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
