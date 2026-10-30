# Sync your Lovable project with GitHub
<!-- source: https://docs.lovable.dev/integrations/github.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync your Lovable project with GitHub

> Export and two-way sync your Lovable project code with github.com, GitHub Enterprise Cloud, or GitHub Enterprise Server for code backup, collaboration, and deployment.

When you build with Lovable, your project code is stored and managed inside the Lovable platform.

[GitHub](https://github.com/) is a platform for hosting, managing, and collaborating on code, with version control, pull requests and code reviews, and CI/CD through GitHub Actions.

If you want your own copy, plan to collaborate with developers, or move your project elsewhere, you can export and sync your project to GitHub: back up your code, review changes in pull requests, work locally in your IDE, test features on branches, and deploy outside Lovable. On the Enterprise plan, you can also keep a copy of your code within your own infrastructure with GitHub Enterprise.

For the full picture of what Git sync is, how the two-way sync model works across providers, and how to choose between GitHub, GitLab, and Bitbucket, see the [Git sync overview](https://docs.lovable.dev/integrations/git-sync-overview).

> [!NOTE]
>
> This is a Git sync integration for Lovable projects. You can export and two-way sync your Lovable project code with github.com, GitHub Enterprise Cloud, or GitHub Enterprise Server.
> Want your app to call the GitHub REST API to read or update repositories, issues, and pull requests instead? Use the [GitHub API connector](https://docs.lovable.dev/integrations/github-api.md).

> [!NOTE]
>
> You don't need GitHub to use Lovable. Many users build and launch entirely within Lovable. If you only need a copy of your code, you can download your code directly from Lovable: use the **Download codebase** section in **Project settings → Git**, or open the [Code editor](https://docs.lovable.dev/features/code-mode.md) and click **Download codebase** at the bottom of the file tree sidebar (paid plans).

## How GitHub Git sync works

Like all [Git sync](https://docs.lovable.dev/integrations/git-sync-overview), the GitHub integration has two layers:

1. A **workspace connection**
2. A **project repository link**

### Workspace connection

A workspace connection authorizes Lovable to access a GitHub account or organization through the Lovable GitHub app. This grants Lovable permission to create and update repositories in your chosen account or organization.

Every project in the workspace can use the same workspace connection.

A workspace can contain:

* Multiple GitHub connections
* Multiple GitHub accounts and organizations
* Multiple GitHub connection types

This is useful if your team works across personal accounts, client accounts, or multiple organizations.

### Project repository link

A project repository link connects one Lovable project to one GitHub repository.

When connected:

* Changes made in Lovable sync to GitHub
* Changes pushed to the active GitHub branch sync back into Lovable
* Lovable only edits and syncs one branch at a time

### GitHub Git sync connection types

Lovable supports three GitHub connection types:

* **github.com** (available on all plans)\
  The standard hosted GitHub platform used by most teams. Lovable manages the GitHub app installation for you.
* **GitHub Enterprise Cloud - Data residency** (available on the Enterprise plan)\
  GitHub Enterprise Cloud using a `*.ghe.com` hostname so repository data stays in a specific region. Lovable manages the GitHub app installation for you.
* **GitHub Enterprise Server** (available on the Enterprise plan)\
  Self-hosted GitHub running on infrastructure your organization controls. With this setup, you create your own copy of the Lovable GitHub app inside your GitHub organization, so credentials remain under your control.

When you add a new connection, you choose which type to set up. All three types support the same two-way sync, branch operations, and pull request creation between Lovable and your GitHub repository.

### Role-based access for GitHub integration

| Role | Allowed action |
| - | - |
| Workspace owner or admin only | <ul><li>Install the Lovable GitHub app on a new account or organization</li><li>Add a workspace connection</li><li>Update a workspace connection</li><li>Reconnect a workspace connection (re-authorize the GitHub app for the workspace connection)</li><li>Delete a workspace connection</li><li>Enable or disable **Include member email addresses in commits** (Business and Enterprise plans)</li></ul> |
| <ul><li>Workspace owner or admin</li><li>Project owner or admin</li></ul> | <ul><li>Connect a project to a repository</li><li>Disconnect a project from a repository</li><li>Reconnect a project to a repository</li></ul> |
| <ul><li>Workspace editor or higher</li><li>Project editor or higher</li></ul> | <ul><li>View sync status</li><li>Switch branches</li><li>Create branches</li><li>View the connection in Workspace settings → Git → GitHub</li></ul> |

## Create a workspace GitHub connection

**Workspace admins and owners** can create workspace connections from:

* **Workspace settings → Git → GitHub → Add connection**
* [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ GitHub → Add connection** (if a project has not been connected yet).

To use an **existing GitHub installation**, click **Connect** next to the account or organization you want to use. The list shows installations on accounts and organizations you have access to on your GitHub identity.

> [!NOTE]
>
> If someone else installed the Lovable GitHub app on an organization you're not a member of, you won't see that installation. Ask them to add you to the GitHub organization, or to set up the Lovable workspace connection themselves.

To set up a new connection, follow the steps for your connection type:

* github.com
* GitHub Enterprise Cloud (data residency)
* GitHub Enterprise Server

**github.com**

github.com is the standard hosted GitHub service used by most teams. Available on all plans. You need to have a GitHub account. You can create one for free at [github.com](https://github.com/).

**1. Add account**

Click **Add account**.

* On Free, Pro, and Business plans, you'll go straight to the **github.com** installation flow.
* On Enterprise plan, Lovable shows three connection types. Select **github.com.**

**2. Install and authorize the Lovable GitHub app**

A GitHub popup opens.

* Choose the account or organization.
* Choose **All repositories** or **Only select repositories**.
* Click **Install & Authorize**.

Lovable automatically detects the installation and adds it as a reusable workspace connection. You can now link projects to repositories under this account or organization.

**GitHub Enterprise Cloud (data residency)**

Use this option if your organization runs GitHub Enterprise Cloud on a `*.ghe.com` hostname to keep repository data in a specific region. This setup requires a Lovable Enterprise plan.

**1. Add account**

Click **Add account**. On the host selection step that appears, choose **Data residency**.

**2. Allow Lovable's IP ranges (if applicable)**

If your GitHub organization enforces an **IP allow list**, copy the IP ranges shown in the setup wizard and add them under **GitHub organization → Settings → Security → IP allow list**.

**3. Enter your instance hostname**

* **Instance URL**: Enter your data residency hostname, for example `acme.ghe.com`. The hostname must end with `.ghe.com` and must be reachable over HTTPS.
* Click **Connect**.

**4. Install and authorize the Lovable GitHub app**

A popup opens to your data residency instance.

* Choose the account or organization.
* Choose **All repositories** or **Only select repositories**.
* Click **Install & Authorize**.

Lovable automatically detects the installation and adds it as a reusable workspace connection. You can now link projects to repositories under this account or organization.

**GitHub Enterprise Server (self-hosted)**

Use this option if your organization runs GitHub Enterprise Server on its own infrastructure. With this setup, **you create your own copy of the Lovable GitHub app** inside your GitHub organization, so credentials stay under your control.

This setup requires:

* A Lovable Enterprise plan
* Organization admin access on your GitHub Enterprise Server to register and install the GitHub app
* Network access from Lovable's public IP ranges

**1. Add account**

Click **Add account**. On the host selection step that appears, choose **Server**.

**2. Allow Lovable's IP ranges**

Lovable must be able to reach your GitHub Enterprise Server to push code, verify repositories, and receive webhook events.

Add the IP ranges shown in the setup wizard to:

* Your network firewall
* Or your GitHub organization IP allow list under **Settings → Security → IP allow list**

**3. Enter your instance and organization**

* **Instance URL:** Your GitHub Enterprise Server hostname (for example, `github.example.com`). Lovable connects over HTTPS. The hostname cannot be `github.com` or a `*.ghe.com` host.
* **Organization name:** The GitHub organization where the Lovable App should be created. You must be an **admin** of this organization.
* Click **Connect**.

**4. Create the Lovable GitHub app in your organization**

Lovable opens GitHub's “Create a GitHub app” popup pre-filled with the required manifest.

* **Permissions include:**
  * Contents (write)
  * Metadata (read)
  * Pull requests (write)
  * Workflows (write)
  * Administration (write)
* **Event subscriptions** include:
  * push
  * pull\_request
  * repository
  * delete
* **Webhook URL:** Lovable's webhook endpoint, pre-filled.

Confirm to create the app. When the app is created, the popup closes and Lovable shows an **Install app on GitHub** button.

**5. Install the app on your organization**

* Click **Install app on GitHub** to install the app on your organization. A pop-up opens.
* Choose **All repositories** or **Only select repositories**.
* Complete the install.

Lovable validates the installation and adds it as a reusable workspace connection. You can now link projects to repositories under this organization.

> [!NOTE]
>
> The app's private key is transferred securely and stored encrypted on Lovable's side. You do not need to download or manage the key manually.
>
> When you delete a GitHub Enterprise Server connection, Lovable schedules secure destruction of the stored signing key.

## Link a project to a GitHub repository

When there is an active workspace GitHub connection, **workspace or project admins and owners** can connect a Lovable project to a GitHub repository.

* When you connect a project, Lovable creates a new GitHub repository. The repository is **private by default**, so nobody can see your code unless you change its visibility on GitHub.
* Each Lovable project can connect to one repository on one provider. If the project already syncs with GitLab or Bitbucket, the GitHub card does not appear in **Project settings → Git** until you [disconnect the project](https://docs.lovable.dev/integrations/git-sync-overview#disconnecting-and-reconnecting) from that provider.

**1. Open the project's GitHub settings**

You can access project GitHub settings from:

* **Project settings → Git → GitHub**
* The [**Chat actions**](https://docs.lovable.dev/features/projects/chat.md#chat-actions) menu, the **+** button next to the chat input, under **Project → GitHub**

**2. Connect the project**

Existing workspace connections appear under **Accounts.**

Click **Connect** next to the workspace connection where the new repository should be created.

Lovable creates a new GitHub repository and starts two-way sync automatically.

> [!WARNING]
>
> Don't delete your GitHub repository. Deleting it stops the sync. Renaming the repository, your account, or your organization keeps the sync running, and a transfer to another account or organization keeps it running when your Lovable workspace also has a GitHub connection for the new owner. See the [FAQ](#faq) for details.

## Manage a project's repository sync

After connecting a project to a GitHub repository, you see the following in the project's GitHub settings:

* Repository status as **Connected**
* [Sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card showing whether Lovable and GitHub are on the same commit
* Branch picker with active branch name (GitHub branch synced with Lovable)
* Clone URLs (HTTPS, SSH, GitHub CLI)
* Option to **View on GitHub** (available from the dropdown)
* Option to **Disconnect** (available from the dropdown)

Lovable only edits and syncs one branch at a time. By default, this is the repository's default branch (usually `main`). Changes pushed to the currently active branch sync back into Lovable.

If the sync status card says **Lovable and GitHub have diverged**, Lovable and GitHub each have commits that the other does not. Lovable pushes its changes to the `lovable-sync` branch instead of the synced branch, as described under [Troubleshooting](#project-repository-issues), and the next sync from GitHub replaces Lovable's version of the branch with the GitHub version. **Re-check** compares the branches again and doesn't sync anything.

### Switch branches

Use the branch picker in the project's GitHub settings to change which branch Lovable edits and syncs.

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
* GitHub CLI

You can clone the repository locally and continue working in your preferred IDE.

For the branch strategy, environment setup, and the handover between Lovable and your IDE, see [Work locally in your IDE](https://docs.lovable.dev/integrations/git-sync-overview#work-locally-in-your-ide).

### View the repository on GitHub

You can quickly access the synced repository directly in GitHub from **Project settings → Git → GitHub.**

Use **View on GitHub** from the repository connection dropdown. This opens GitHub in a new tab.

### Commit attribution

Commits made by Lovable are authored by the Lovable GitHub app identity:

* `lovable-dev[bot]` for github.com and GitHub Enterprise Cloud
* `<your-app-name>[bot]` for GitHub Enterprise Server

In raw `git log` output the author reads `gpt-engineer-app[bot]`, an earlier name for the same account, which GitHub displays under its current name.

Commits are also co-attributed to the workspace member who triggered them, using the email address on their connected GitHub account, or GitHub's `noreply` format when that address is not available. That line is absent for members who have not connected a GitHub account.

To record who triggered each commit regardless, enable **Include member email addresses in commits** in workspace settings. See [Commit attribution](https://docs.lovable.dev/integrations/git-sync-overview#commit-attribution) (Business and Enterprise plans).

### Disconnect a project from a GitHub repository

When you disconnect a project, Lovable removes the link between the project and its GitHub repository.

When you disconnect:

* **Sync stops.** The two-way connection between Lovable and GitHub ends.
* **Your repository stays on GitHub.** It remains intact with all history and files.
* **Your project and its code stay in Lovable.** Future changes are stored only inside Lovable.

Lovable keeps the workspace connection when you disconnect a project.

There are two ways to disconnect a repository connection.

* Disconnect from the project GitHub settings
* Disconnect from the workspace GitHub settings

**Disconnect from project GitHub settings**

**Workspace or project admins and owners** can disconnect from the project's GitHub settings.

**1. Open GitHub settings**

You can access project GitHub settings from:

* **Project settings → Git → GitHub**
* The [**Chat actions**](https://docs.lovable.dev/features/projects/chat.md#chat-actions) menu, the **+** button next to the chat input, under **Project → GitHub**

**2. Disconnect the project**

In the active repository connection, open the dropdown and select **Disconnect**.

**3. Confirm**

* Type the required info
* Click **Disconnect** to confirm

**Disconnect from workspace GitHub settings**

**Workspace owners and admins** can disconnect from the workspace GitHub settings.

**1. Open GitHub**

Open **Workspace settings → Git → GitHub**.

**2. Open the connection you want to manage**

Select the connection from the list.

**3. Select projects**

Under **Linked projects**, select the projects you want to unlink.

**4. Confirm**

* Click **Unlink N projects** (where `N` is the number of projects you selected)
* Click **Unlink** to confirm

If a project needs GitHub again, you can link it to any available connection. If you reconnect later:

* Lovable creates a new repository with the current version of your project.
* The original repository stays unchanged on GitHub and is no longer linked to Lovable.

## Delete a workspace GitHub Git sync connection

**Workspace admins and owners** can delete GitHub connections.

When you delete a workspace GitHub connection, Lovable:

* Removes the connection for all projects
* Stops syncing for linked projects
* Keeps the repositories on GitHub
* Deletes the stored credentials
* For GitHub Enterprise Server, also schedules destruction of the stored GitHub app signing key

**1. Open GitHub settings**

Go to **Workspace settings → Git → GitHub**.

**2. Open the connection you want to remove**

Select the connection from the list.

**3. Review linked projects**

Review the list of linked projects carefully before deleting the connection to avoid unintentionally removing GitHub sync.

**4. Delete**

Under **Delete this connection**:

* Click **Delete**
* Type the required info
* Click **Delete** to confirm the deletion

## Limitations

The GitHub Git sync integration currently does not support:

* Connecting a project to a repository that already exists. Git sync always creates a new repository. To start a project from code in a repository, download the repository as a ZIP and [import the project](https://docs.lovable.dev/features/projects/import-project.md) instead, then connect Git sync to the new project.
* Reconnecting to the same repository after disconnecting. Lovable creates a new repository on reconnect.
* Installing the Lovable GitHub app multiple times on the same account or organization.

## Troubleshooting

When something goes wrong, Lovable shows a **Reconnect** prompt in the affected project's GitHub settings.

### Workspace connection issues

These problems affect the workspace-level GitHub connection itself, so the fix usually applies to **every project linked to that connection**.

A workspace owner or admin only needs to perform the fix once from any affected project, and the other projects on the same connection resume automatically.

> **The Lovable GitHub App is suspended. Reconnect and unsuspend it to resume syncing.**
>
> The GitHub app installation is currently suspended in your GitHub account or organization.
>
> 1. Open the project's GitHub settings.
> 2. Click **Reconnect**. Lovable opens your GitHub App installation settings in a new tab.
> 3. Unsuspend the Lovable GitHub App in GitHub, then return to Lovable.
>
> When the GitHub app is unsuspended, sync resumes for every project on this connection.

> **The Lovable GitHub App has been uninstalled. Reconnect to reinstall it and restore access.**
>
> Someone uninstalled the Lovable GitHub app from your GitHub account or organization. As a result, Lovable disconnected every project that was using that connection, and the workspace connection was removed.
>
> The original repositories stay on GitHub untouched, but they are no longer linked to Lovable.
>
> To restore syncing:
>
> 1. Open **Workspace settings → Git → GitHub** and click **Add connection**.
> 2. Reinstall the Lovable GitHub App on the same account or organization. This creates a new workspace connection.
> 3. For each project that was previously synced, open the project's GitHub settings and click **Connect** to link it to the new workspace connection. Lovable creates a **new GitHub repository** for the project.
>
> Your original repositories stay on GitHub for reference. If you have history in the old repository that needs to be preserved, copy or merge it into the new one yourself.

> **Lovable no longer has access to this repository. Reconnect and grant access to it.**
>
> The Lovable GitHub app is installed but no longer has access to one or more repositories (for example, an admin changed the installation from **All repositories** to **Only select repositories** and excluded this one).
>
> 1. Open the project's GitHub settings.
> 2. Click **Reconnect**. Lovable opens your GitHub App installation settings in a new tab.
> 3. Under **Repository access**, either select **All repositories** or add the missing repository to **Only select repositories**.
>
> Sync resumes for all affected projects when access is restored.

> **Install the GitHub App for \<owner> to enable gitsync.**
>
> Your project still references a GitHub installation that this workspace no longer has a connection record for. This typically happens after a workspace transfer, or after the previous workspace connection was removed.
>
> 1. Open the project's GitHub settings.
> 2. Click **Reconnect**.
> 3. Reinstall the Lovable GitHub App on the account or organization shown when the GitHub popup opens.
>
> Lovable creates the workspace connection record and re-links the project automatically.

> **Clicking "Add account" or "Connect GitHub" does nothing.**
>
> This affects the **GitHub install and authorize popup** that opens during workspace connection setup.
>
> Your browser probably blocked the GitHub login popup. Allow popups for Lovable and try again.

> **(Enterprise) My GitHub organization uses an IP allow list and the connection fails.**
>
> This applies to data residency and Enterprise Server connections.
>
> Add Lovable's IP ranges (shown in the setup wizard) to **GitHub organization → Settings → Security → IP allow list**.

> **(Enterprise Server) The setup popup can't reach my instance.**
>
> Confirm that your GitHub Enterprise Server is reachable from Lovable's public IP ranges over HTTPS.

### Project repository issues

These problems affect a single project's link to its repository.

Workspace or project admins and owners can resolve them from the **project's GitHub settings**.

> **This repository is no longer accessible. Try reconnecting, or contact support if the issue persists.**
>
> The repository was deleted on GitHub, or transferred to an account or organization this workspace has no connection for.
>
> You can either:
>
> * **Restore the repository on GitHub.** Transfer it back to its original owner, or [restore a deleted repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository). Sync resumes automatically.
> * **Move on with a new repository.** Open the project's GitHub settings, disconnect the project, then connect it again. Lovable creates a new GitHub repository with your current code.

> **My commits and pushes from GitHub aren't showing up in Lovable.**
>
> Lovable only syncs **one branch at a time,** and that is the branch the project is currently set to in its GitHub repository connection settings. By default this is the repository's default branch (usually `main`).
>
> If you pushed commits to a different branch in GitHub, you have two options:
>
> * **Merge your changes into the synced branch**. For example, open a pull request from your feature branch into `main` and merge it. Lovable then picks up those commits.
> * **Switch the synced branch in Lovable**. In your project's GitHub settings, select the branch where your commits live. Lovable starts editing and syncing that branch instead, and your commits will appear.

> **I pushed to the synced branch, but the commits don't appear in Lovable and the sync status says GitHub is ahead.**
>
> Lovable pulls your changes when GitHub notifies it about a push to the synced branch. If that notification never arrives, the commits from that push don't appear in Lovable, and Lovable doesn't pull them later without a new notification. The [sync status](https://docs.lovable.dev/integrations/git-sync-overview#sync-status) card in the project's GitHub settings shows **GitHub is N commits ahead of Lovable** until the next sync.
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
> Lovable then syncs the branch to its current state on GitHub, which includes the earlier commits.
>
> Before you push, confirm the branch and the state of your Lovable edits:
>
> * You're pushing to the repository and branch shown in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) **→ GitHub**. Commits on other branches don't sync.
> * Your latest Lovable edits are already in the repository on GitHub. If the sync status says **Lovable and GitHub have diverged**, the push replaces Lovable's version of the branch with the GitHub version, and the project no longer contains edits made only in Lovable. Lovable saves a backup first, and the project owner can [restore it](https://docs.lovable.dev/integrations/git-sync-overview#restore-lovable-work-after-a-push-replaces-it) from the notice in the editor or in **Project settings → Git**.
>
> If the commits still don't appear after a new push, contact [Lovable Support](https://lovable.dev/support).

> **I see a "lovable-fallback" branch in the branch picker.**
>
> Someone deleted the synced branch on GitHub. Lovable automatically switched the project to a new branch called `lovable-fallback` so that you can continue editing. Your repository is otherwise unchanged.
>
> Pick another branch or recreate the original branch. After you switch away, you can leave or delete `lovable-fallback` in GitHub.

> **Sync stopped working after I added a large file.**
>
> GitHub rejects pushes that contain files larger than **100 MB**. When this happens, your project's GitHub settings show the error "Your project contains files that exceed the maximum file size limit (100 MB)" together with a list of the affected files, after a few failed sync attempts.
>
> To fix it, delete the listed files from your project (or ask Lovable to remove them) and let the sync retry. If the push keeps failing after the files are gone, an oversized file is stuck in the repository's history, and history cleanup requires help from [Lovable Support](https://lovable.dev/support).
>
> Separately, Lovable itself cannot save files larger than **10 MB** into your project. Files you push from your own computer can be larger (up to GitHub's limits) and sync into Lovable, but Lovable cannot edit those files afterwards: any Lovable change that touches a file over 10 MB fails. For large media, ask Lovable to "Migrate large files to CDN assets". See the [chat page FAQ](https://docs.lovable.dev/features/projects/chat.md) for details.

> **My push from Lovable ended up on a "lovable-sync" branch instead of the synced branch.**
>
> GitHub rejected the push to your synced branch, most often because of branch protection rules or because someone pushed a conflicting change that Lovable could not apply your work on top of. To avoid losing your work, Lovable pushed it to a branch named `lovable-sync` instead, and your project's GitHub settings show "Your changes conflict with commits on `<your branch>` and could not be merged automatically. They were pushed to the branch `lovable-sync` instead. Merge that branch into `<your branch>` to apply them."
>
> Open that branch on GitHub, review the changes, and merge them into your protected branch through your usual review process.
>
> When a later push is rejected too, Lovable adds those changes to the same `lovable-sync` branch. If you've added your own commits to `lovable-sync`, Lovable leaves them untouched and pushes to a new branch named `lovable-sync-<timestamp>` instead. Review and merge that branch the same way.

## FAQ

> **Do I need to know GitHub to use Git sync?**
>
> No. Set up Git sync once, and GitHub safely stores your code.
>
> You only need to learn GitHub's features if you want to do more advanced things such as branching, pull requests, or CI/CD.

> **Is the repository Lovable creates public or private?**
>
> Repositories created by Lovable are **private by default**, on every plan. Nobody can see your code on GitHub unless you change the repository's visibility yourself in GitHub's settings.

> **Do I need GitHub just to download my code?**
>
> No. On paid plans you can download your code directly from Lovable: use the **Download codebase** section in **Project settings → Git**, or click **Download codebase** at the bottom of the [Code editor](https://docs.lovable.dev/features/code-mode.md) file tree sidebar.
>
> GitHub is for ongoing two-way sync and collaboration, not just for getting a copy of your code.

> **What's the difference between github.com, GitHub Enterprise Cloud, and GitHub Enterprise Server?**
>
> * **github.com** is the standard hosted GitHub service and is available on all plans.
> * **GitHub Enterprise Cloud (data residency)** uses a `*.ghe.com` hostname so your data stays in a specific region. It uses the Lovable-managed GitHub app. Available on the **Enterprise** plan.
> * **GitHub Enterprise Server** is GitHub running on your own infrastructure. You register your own copy of the Lovable GitHub app inside your organization. Available on the **Enterprise** plan.

> **What permissions does the Lovable GitHub app request?**
>
> The Lovable GitHub app requests:
>
> * **Contents** (write): Read and write code in your repositories.
> * **Metadata** (read): Basic repository information.
> * **Pull requests** (write): Open and update pull requests.
> * **Workflows** (write): Manage GitHub Actions workflow files.
> * **Administration** (write): Create new repositories under your account or organization.
>
> The app subscribes to **push**, **pull\_request**, **repository**, and **delete** events to keep Lovable in sync with GitHub.

> **What happens if I rename, move, or delete my GitHub repository?**
>
> It depends on the change:
>
> * **Rename the repository**: Sync continues. Lovable detects the rename and updates the connection automatically.
> * **Transfer the repository to another account or organization**: Sync continues when your Lovable workspace also has a GitHub connection for the new owner. Lovable moves the project to that connection and updates the repository link. Without such a connection, Lovable disconnects the project. To resume syncing, add a connection for the new owner and connect the project again, which creates a new repository, or transfer the repository back to its original owner.
> * **Delete the repository**: The connection breaks and the project stops syncing. You can [restore the deleted repository on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository) to resume syncing, or disconnect and reconnect the project to create a new repository.

> **What happens if I rename my GitHub username or organization?**
>
> Sync continues. GitHub notifies Lovable of the rename, and Lovable updates the connection to the new name. The connection in **Workspace settings → Git** shows the new name.

> **What happens if I transfer my project to another workspace?**
>
> The GitHub connection breaks during the transfer. Lovable shows a warning before you confirm. After the transfer, your repository stays on GitHub but is no longer linked to Lovable.
>
> To resume syncing, set up a GitHub connection in the destination workspace and reconnect the project. Lovable creates a new repository on reconnect.

> **How can I switch to a different GitHub account or organization?**
>
> You can't change the linked GitHub account on an existing project.
>
> As a workaround:
>
> 1. Disconnect the project from GitHub in the project's GitHub settings.
> 2. Reconnect the project and choose a different installation during setup.
>
> Lovable creates a new repository. The original repository stays on GitHub but is no longer linked to Lovable.

> **Can I use multiple GitHub accounts or organizations?**
>
> Yes. A workspace can have multiple GitHub connections, each pointing to a different personal account or organization, and these can be on github.com, your data residency instance, or your GitHub Enterprise Server. Each Lovable project is then linked to one repository within one of those installations.

> **Can I disconnect from GitHub?**
>
> Yes. Workspace or project admins and owners can [disconnect a project from a GitHub repository](#disconnect-a-project-from-a-github-repository) at any time in the project's GitHub settings.
>
> Your repository stays on GitHub, but syncing stops. If you reconnect later, a new repository is created.

> **Can I import an existing GitHub repo into Lovable?**
>
> Not through Git sync, which always creates a new repository for a project. To start a project from a repository, download the repository as a ZIP (**Code → Download ZIP** on the repository page) and [import it](https://docs.lovable.dev/features/projects/import-project.md) with **Upload code**.
>
> The import copies the code into a new project. Connect Git sync afterwards if you want a repository that stays in sync with the project.

> **Can I edit a non-default branch from inside Lovable?**
>
> Yes. The branch picker in your project's GitHub repository connection lets you [switch to any branch](#switch-branches) in your repository. You can also [create a new branch](#create-a-new-branch) directly from the picker. Lovable forks from the branch you're currently editing, so switch to your intended starting point (usually `main`) first.

> **Are commits made by Lovable attributed to me?**
>
> Commits made by Lovable are authored by the Lovable GitHub app identity:
>
> * `lovable-dev[bot]` for github.com and GitHub Enterprise Cloud
> * `<your-app-name>[bot]` for GitHub Enterprise Server
>
> Commits are also co-attributed to the workspace member who triggered them, using the email address on their connected GitHub account, or GitHub's `noreply` format when that address is not available. That line is absent for members who have not connected a GitHub account. To record who triggered each commit regardless, see [Commit attribution](https://docs.lovable.dev/integrations/git-sync-overview#commit-attribution).

> **My GitHub Enterprise Server is behind a VPN or firewall. Will it work?**
>
> Only if Lovable's public IP ranges can reach your instance. Lovable needs network access to your GitHub Enterprise Server to push code and receive webhook events.

> **Where is my data stored for GitHub Enterprise Cloud (data residency)?**
>
> With data residency, repository data and webhook traffic stay within the GitHub region tied to your `*.ghe.com` hostname. Lovable's backend connects to that hostname from the IP ranges shown in the setup wizard. If your organization enforces an IP allow list on GitHub, add those ranges to the allow list.


## Related topics

- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Connect your app to GitHub API](https://docs.lovable.dev/integrations/github-api.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
- [Sync your Lovable project with GitLab](https://docs.lovable.dev/integrations/gitlab.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
