# Sync your Lovable project with GitLab
<!-- source: https://docs.lovable.dev/integrations/gitlab.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync your Lovable project with GitLab

> Export and two-way sync your Lovable project code with GitLab.com or a self-managed GitLab instance for code backup, collaboration, and deployment.

When you build with Lovable, your project code is stored and managed inside the Lovable platform.

[GitLab](https://gitlab.com/) is a platform for storing, managing, and sharing code, with version control, merge requests and code reviews, and CI/CD pipelines.

If you want your own copy, plan to collaborate with developers, or move your project elsewhere, you can export and sync your project to GitLab: back up your code, review changes in merge requests, work locally in your IDE, test features on branches, and deploy outside Lovable. With GitLab Self-Managed, you can also keep a copy of your code within your own infrastructure.

> [!NOTE]
>
> This page covers Git sync for your Lovable project's codebase.
> To build an app that reads or updates GitLab projects, issues, merge requests, pipelines, or repository files through the REST API, use [GitLab API](https://docs.lovable.dev/integrations/gitlab-api.md).

For the full picture of what Git sync is, how the two-way sync model works across providers, and how to choose between GitHub, GitLab, and Bitbucket, see the [Git sync overview](https://docs.lovable.dev/integrations/git-sync-overview).

> [!NOTE]
>
> You don't need GitLab to use Lovable. Many users build and launch entirely within Lovable. If you only need a copy of your code, you can download your code directly from Lovable: use the **Download codebase** section in **Project settings → Git**, or open the [Code editor](https://docs.lovable.dev/features/code-mode.md) and click **Download codebase** at the bottom of the file tree sidebar (paid plans).

## How GitLab Git sync works

Like all [Git sync](https://docs.lovable.dev/integrations/git-sync-overview), the GitLab integration has two layers:

1. A **workspace connection**
2. A **project repository link**

### Workspace connection

A workspace connection authorizes Lovable to access a GitLab namespace (your personal account or a group) through OAuth. Lovable requests the `api` scope, which it needs to create projects, configure webhooks, manage branches, and open merge requests.

Every project in the workspace can use the same workspace connection.

A workspace can contain:

* Multiple GitLab connections
* Multiple group namespaces from the same GitLab account or instance
* One personal-account namespace (a workspace can have only one personal GitLab account connection, alongside any number of groups)
* Both GitLab connection types (GitLab.com and Self-Managed)

### Project repository link

A project repository link connects one Lovable project to one GitLab repository.

When connected:

* Changes made in Lovable sync to GitLab
* Changes pushed to the active GitLab branch sync back into Lovable
* Lovable only edits and syncs one branch at a time

### GitLab Git sync connection types

Lovable supports two GitLab connection types:

* **GitLab.com**\
  The hosted service managed by GitLab Inc. You authorize Lovable with your GitLab.com account.
* **GitLab Self-Managed**\
  A GitLab instance that your organization runs on its own servers. You create an OAuth application in your instance, so credentials remain under your control, and allowlist Lovable's IP ranges.

When you add a new connection, you choose which type to set up. Both types support the same two-way sync, branch operations, and merge request creation between Lovable and your GitLab repository.

### Role-based access for GitLab integration

| Role | Allowed action |
| - | - |
| Workspace owner or admin only | <ul><li>Add a workspace connection</li><li>Update a workspace connection</li><li>Reconnect a workspace connection (re-authorize GitLab)</li><li>Delete a workspace connection</li><li>Enable or disable **Include member email addresses in commits** (Business and Enterprise plans)</li></ul> |
| <ul><li>Workspace owner or admin</li><li>Project owner or admin</li></ul> | <ul><li>Connect a project to a repository</li><li>Disconnect a project from a repository</li></ul> |
| <ul><li>Workspace editor or higher</li><li>Project editor or higher</li></ul> | <ul><li>View sync status</li><li>Switch branches</li><li>Create branches</li><li>View the connection in Workspace settings → Git → GitLab</li></ul> |

## Create a workspace GitLab connection

**Workspace admins and owners** can create workspace connections from:

* **Workspace settings → Git → GitLab → Add connection**
* [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ GitLab → Add connection** (if a project has not been connected yet)

To set up a new connection, follow the steps for your connection type:

**GitLab.com (hosted)**

GitLab.com is the hosted service managed by GitLab Inc. You need a GitLab account. You can create one for free at [gitlab.com](https://gitlab.com).

**1. Add a new connection**

Click **Add connection** and select **GitLab.com**.

**2. Authorize your GitLab account**

Click **Authorize with GitLab**. A popup opens to GitLab's authorization page. Sign in and **authorize Lovable** to access your GitLab account.

Lovable requests the `api` scope, which is required to create projects, configure webhooks, manage branches, and open merge requests.

**3. Select a namespace**

Choose where your project repositories should live:

* Select your **personal account** or one of your **GitLab groups**.
* Click **Connect** next to the namespace you want to use.

You can connect multiple group namespaces from the same GitLab account, plus your personal account.

> [!NOTE]
>
> You cannot connect the same personal account or group more than once, and a workspace can have only one personal-account connection.

**GitLab Self-Managed**

GitLab Self-Managed is intended for organizations that run their own GitLab server and need their code to stay within internal infrastructure.

This setup requires:

* Admin access to your GitLab instance to create an OAuth application
* Network access from Lovable's public IP ranges

**1. Add a new connection**

Click **Add connection** and select **GitLab Self-Managed**.

**2. Allow Lovable's IP ranges**

Lovable needs to reach your GitLab instance to sync code and receive webhook events. The setup wizard displays the IP ranges you need to allowlist if your instance is protected by a firewall. Copy each one and add it to your network firewall or GitLab's IP allowlist settings.

**3. Create an OAuth application in your GitLab instance**

In your GitLab instance, go to **Admin Area → Applications** (or **Settings → Applications** for a user-level app) and create a new application:

* **Name:** Lovable (or any descriptive name)
* **Redirect URI:** Use the URI shown in the Lovable setup wizard (for example, `https://lovable.dev/gitlab/callback`)
* **Scopes:** `api`
* **Confidential:** Yes

Save the application and note the **Application ID** and **Secret**.

> [!WARNING]
>
> Keep your Application Secret confidential. It grants access to your GitLab instance on behalf of your users.

**4. Configure the connection in Lovable**

Back in the Lovable setup wizard, fill in:

* **GitLab URL:** Your instance URL (e.g., `https://gitlab.yourcompany.com`)
* **Application ID:** The client ID from the OAuth app you created
* **Application secret:** The client secret from the OAuth app
* **Group path (optional):** If you want to restrict access to a specific group, enter the group path (for example, `my-org/my-team`)

Click **Continue**.

**5. Authorize your GitLab account**

Click **Authorize with GitLab**. A popup opens to your self-managed GitLab instance's authorization page. Sign in and authorize Lovable. Lovable requests the `api` scope.

**6. Select a namespace**

Choose between your **personal account** or one of your **GitLab groups** within the instance, then click **Connect**.

## Link a project to a GitLab repository

When there is an active workspace GitLab connection, **workspace or project admins and owners** can connect a Lovable project to a GitLab repository.

* When you connect a project, Lovable creates a new GitLab repository. The repository is **private by default**, so nobody can see your code unless you change its visibility on GitLab.
* Each Lovable project can connect to one repository on one provider. If the project already syncs with GitHub or Bitbucket, the GitLab card does not appear in **Project settings → Git** until you [disconnect the project](https://docs.lovable.dev/integrations/git-sync-overview#disconnecting-and-reconnecting) from that provider.

**1. Open the project's GitLab settings**

Open **Project settings → Git → GitLab**.

**2. Connect the project**

Under **Connect project**, click **Connect** next to the namespace (personal account or group) where the new repository should be created.

Lovable creates a new GitLab repository and starts two-way sync automatically.

> [!WARNING]
>
> Don't rename, move, or delete your GitLab project after connecting, and don't rename the GitLab username or group it lives under. Doing so will break the sync, and Lovable won't be able to update your project.

## Manage a project's repository sync

After connecting a project to a GitLab repository, you see the following in the project's GitLab settings:

* Repository status as **Connected**
* [Sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card showing whether Lovable and GitLab are on the same commit
* Branch picker with active branch name (GitLab branch synced with Lovable)
* Clone URLs (HTTPS, SSH)
* Option to **View on GitLab** (available from the dropdown)
* Option to **Disconnect** (available from the dropdown)

Lovable only edits and syncs one branch at a time. By default, this is the repository's default branch (usually `main`). Changes pushed to the currently active branch sync back into Lovable.

If the sync status card says **Lovable and GitLab have diverged**, Lovable and GitLab each have commits that the other does not. Lovable pushes its changes to the `lovable-sync` branch instead of the synced branch, as described under [Troubleshooting](#troubleshooting), and the next sync from GitLab replaces Lovable's version of the branch with the GitLab version. **Re-check** compares the branches again and doesn't sync anything.

### Switch branches

Use the branch picker in the project's GitLab settings to change which branch Lovable edits and syncs.

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

Commits made by Lovable are authored by Lovable's bot identity. In the commit log the author reads `gpt-engineer-app[bot]`, an earlier name for that identity, and GitLab does not link it to an account. Lovable pushes the commits through the GitLab account that authorized the workspace connection, so GitLab attributes the pushes to that user. That account is not necessarily the member who made the change, and Lovable does not add a `Co-authored-by` line on GitLab repositories, so nothing in the commit identifies the member.

To record who triggered each commit, enable **Include member email addresses in commits** in workspace settings. See [Commit attribution](https://docs.lovable.dev/integrations/git-sync-overview#commit-attribution) (Business and Enterprise plans).

### Disconnect a project from GitLab

When you disconnect a project, Lovable removes the link between the project and its GitLab repository.

When you disconnect:

* **Sync stops.** The two-way connection between Lovable and GitLab ends.
* **Your repository stays on GitLab.** It remains intact with all history and files.
* **Your project and its code stay in Lovable.** Future changes are stored only inside Lovable.

Lovable keeps the workspace connection when you disconnect a project.

**Workspace or project admins and owners** can disconnect from the project's GitLab settings: in the active repository connection, open the dropdown, select **Disconnect**, and confirm.

If a project needs GitLab again, you can link it to any available connection. If you reconnect later:

* Lovable creates a new repository with the current version of your project.
* The original repository stays unchanged on GitLab and is no longer linked to Lovable.

## Unlink projects from a workspace GitLab connection

**Workspace admins and owners** can remove specific projects from a connection without deleting the connection entirely. The connection remains available for other projects.

**1. Open GitLab settings**

Open **Workspace settings → Git → GitLab**.

**2. Open the connection**

Open the connection you want to manage.

**3. Select projects**

Under **Linked projects**, check the projects you want to unlink.

**4. Confirm**

* Click **Unlink N projects** (where `N` is the number of projects you selected)
* Click **Unlink** to confirm

When unlinked, those projects no longer sync through this connection.

## Delete a workspace GitLab connection

**Workspace admins and owners** can delete GitLab connections.

When you delete a workspace GitLab connection, Lovable:

* Removes the connection for all projects
* Stops syncing for linked projects
* Keeps the repositories on GitLab
* Deletes the stored credentials

> [!WARNING]
>
> You cannot restore a deleted connection. Projects that used it stop syncing until a workspace admin or owner adds a new connection and reconnects each project.

**1. Open GitLab settings**

Open **Workspace settings → Git → GitLab**.

**2. Open the connection you want to remove**

Select the connection from the list.

**3. Review linked projects**

Review the **Linked projects** section carefully before deleting the connection to avoid unintentionally removing GitLab sync.

**4. Delete**

Under **Delete this connection**, click **Delete** and confirm.

## Limitations

The GitLab Git sync integration currently does not support:

* Importing existing GitLab repositories into Lovable. You can only export from Lovable to GitLab.
* Reconnecting to the same repository after disconnecting. Lovable creates a new repository on reconnect.
* Connecting the same personal account or group more than once, or more than one personal GitLab account per workspace.
* Automatically following repository renames or moves. Unlike GitHub, renaming or moving a GitLab project breaks the sync.

## Troubleshooting

> **Your browser blocked the GitLab sign-in window. Allow pop-ups for this site and try again.**
>
> Lovable opens GitLab's sign-in page in a pop-up window when you authorize a new GitLab.com or self-managed connection, and when you reconnect an existing one. If your browser blocks pop-ups for Lovable, the window never opens and Lovable shows this message instead of waiting for authorization.
>
> Allow pop-ups for `lovable.dev` in your browser's site settings, then select **Authorize with GitLab** (or **Reconnect**) again.

> **My commits and pushes from GitLab aren't showing up in Lovable.**
>
> Lovable only syncs **one branch at a time,** and that is the branch the project is currently set to in its GitLab repository connection settings. By default this is the repository's default branch (usually `main`).
>
> If you pushed commits to a different branch in GitLab, you have two options:
>
> * **Merge your changes into the synced branch**. For example, open a merge request from your feature branch into `main` and merge it. Lovable then picks up those commits.
> * **Switch the synced branch in Lovable**. In your project's GitLab settings, select the branch where your commits live. Lovable starts editing and syncing that branch instead, and your commits will appear.

> **I pushed to the synced branch, but the commits don't appear in Lovable and the sync status says GitLab is ahead.**
>
> Lovable pulls your changes when GitLab notifies it about a push to the synced branch. If that notification never arrives, the commits from that push don't appear in Lovable, and Lovable doesn't pull them later without a new notification. The [sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card in the project's GitLab settings shows **GitLab is N commits ahead of Lovable** until the next sync.
>
> **Reconnect** doesn't fix this. It appears only when the connection itself has a problem, and it restores access to the repository without pulling commits. **Re-check** on the sync status card compares the branches again and doesn't sync anything either.
>
> To make Lovable pull the missing commits, push a new commit to the synced branch. Any push works, including an empty commit:
>
> ```bash theme={null}
> git commit --allow-empty -m "Trigger Lovable sync"
> git push
> ```
>
> Lovable then syncs the branch to its current state on GitLab, which includes the earlier commits.
>
> Before you push, confirm the branch and the state of your Lovable edits:
>
> * You're pushing to the repository and branch shown in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ GitLab**. Commits on other branches don't sync.
> * Your latest Lovable edits are already in the repository on GitLab. If the sync status says **Lovable and GitLab have diverged**, the push replaces Lovable's version of the branch with the GitLab version, and the project no longer contains edits made only in Lovable. Lovable saves a backup first, and the project owner can [restore it](https://docs.lovable.dev/integrations/git-sync-overview#restore-lovable-work-after-a-push-replaces-it) from the notice in the editor or in **Project settings → Git**.
>
> If the commits still don't appear after a new push, contact [Lovable Support](https://lovable.dev/support).

> **I see a "lovable-fallback" branch in the branch picker.**
>
> Someone deleted the synced branch on GitLab. Lovable automatically switched the project to a new branch called `lovable-fallback` so that you can continue editing. Your repository is otherwise unchanged.
>
> Pick another branch or recreate the original branch. After you switch away, you can leave or delete `lovable-fallback` in GitLab.

> **My push from Lovable ended up on a "lovable-sync" branch instead of the synced branch.**
>
> GitLab rejected the push to your synced branch, most often because of protected branch rules or because someone pushed a conflicting change that Lovable could not apply your work on top of. To avoid losing your work, Lovable pushed it to a branch named `lovable-sync` instead, and your project's GitLab settings show "Your changes conflict with commits on `<your branch>` and could not be merged automatically. They were pushed to the branch `lovable-sync` instead. Merge that branch into `<your branch>` to apply them."
>
> Open that branch on GitLab, review the changes, and merge them into your protected branch through your usual review process.
>
> When a later push is rejected too, Lovable adds those changes to the same `lovable-sync` branch. If you've added your own commits to `lovable-sync`, Lovable leaves them untouched and pushes to a new branch named `lovable-sync-<timestamp>` instead. Review and merge that branch the same way.

> **GitLab Self-Managed: Auth token is expired, but I am unable to reconnect the GitLab connections.**
>
> 1. In GitLab, go to **Settings → Applications** or **Admin Area → Applications**, find the Lovable application, and revoke its access.
> 2. In Lovable, trigger a sync by making a change in a project linked to your GitLab instance (or wait for the next one). The connection will move into a "needs reconnect" state.
> 3. In Lovable, as a workspace admin, in the GitLab connection, select **Reconnect** and sign into GitLab again.

## FAQ

> **Can I push large files to my GitLab repository?**
>
> Files you push from your own computer sync into Lovable (up to GitLab's own limits), but Lovable itself cannot save files larger than **10 MB** into your project: any Lovable edit that touches a file over 10 MB fails. For large media, ask Lovable to "Migrate large files to CDN assets". See the [chat page FAQ](https://docs.lovable.dev/features/projects/chat.md) for details.

> **Is the GitLab project Lovable creates public or private?**
>
> Projects created by Lovable are **private by default**, on every plan. Nobody can see your code on GitLab unless you change the project's visibility yourself in GitLab's settings.

> **Do I need to know GitLab to use this feature?**
>
> No. Just connect and authorize. GitLab will safely store your code.
>
> You only need to learn GitLab's features if you want to do more advanced things such as branching, merge requests, or CI/CD pipelines.

> **What happens if I rename, move, or delete my GitLab project?**
>
> The connection will break. Your project will stop syncing, and you won't be able to edit it in Lovable.
>
> To fix this, restore the project to its original path and name in GitLab. If the project was deleted, restore it from GitLab's admin panel.

> **What happens if I rename my GitLab username or group?**
>
> The connection will break. Your project will stop syncing, and you won't be able to edit it in Lovable.
>
> To fix this, revert to the original GitLab username or group path.

> **How can I switch to a different GitLab account?**
>
> You can't change the linked GitLab account once connected. As a workaround:
>
> 1. Disconnect the project from the current GitLab connection (there's a disconnect option in the project's GitLab settings)
> 2. Delete the existing connection if you want a different personal account (a workspace allows only one personal GitLab account)
> 3. Create a new connection with the correct GitLab account
> 4. Reconnect the project to the new connection
>
> Lovable creates a new repository. The original repository stays on GitLab but is no longer linked to Lovable.

> **Can I disconnect from GitLab?**
>
> Yes. Workspace or project admins and owners can disconnect a project from GitLab at any time in the project's GitLab settings. Your repository stays on GitLab, but syncing stops. If you reconnect later, Lovable creates a new repository.

> **Can I import an existing GitLab repo into Lovable?**
>
> No. You can only export from Lovable to GitLab, not the other way around.

> **Can I edit a non-default branch from inside Lovable?**
>
> Yes. The branch picker in your project's GitLab repository connection lets you [switch to any branch](#switch-branches) in your repository. You can also [create a new branch](#create-a-new-branch) directly from the picker. Lovable forks from the branch you're currently editing, so switch to your intended starting point (usually `main`) first.

> **Can I connect multiple GitLab groups?**
>
> Yes. You can connect multiple group namespaces from the same GitLab account or self-managed instance, plus one personal account. Each Lovable project is then linked to one repository within one of those namespaces.

> **What's the difference between GitLab.com and GitLab Self-Managed?**
>
> **GitLab.com** is the hosted service managed by GitLab Inc. **GitLab Self-Managed** is a GitLab instance that your organization runs on its own servers. Self-Managed requires you to create an OAuth application in your instance and allowlist Lovable's IP ranges.

> **What OAuth scopes does Lovable request?**
>
> Lovable requests the `api` scope, which is the minimum required to create projects, configure webhooks, manage branches, and open merge requests on your behalf.

> **My self-managed GitLab instance is behind a VPN. Will it work?**
>
> Only if Lovable's public IP ranges can reach your instance. Lovable needs network access to your GitLab server to push code and receive webhook events. If your instance is strictly internal and cannot be reached from Lovable's IPs, reach out to Sales to discuss a potential custom integration.


## Related topics

- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Connect your app to GitLab API](https://docs.lovable.dev/integrations/gitlab-api.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
