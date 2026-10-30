# Sync your Lovable project code with GitHub, GitLab, or Bitbucket
<!-- source: https://docs.lovable.dev/integrations/git-sync-overview.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync your Lovable project code with GitHub, GitLab, or Bitbucket

> Git sync keeps your Lovable project code in your own GitHub, GitLab, or Bitbucket repository with automatic two-way sync, so you can back up code, collaborate with developers, work in your IDE, and deploy anywhere.

When you build with Lovable, your project code is stored and managed inside the Lovable platform. Git sync connects a Lovable project to a repository you own on GitHub, GitLab, or Bitbucket, and keeps the two in sync automatically: changes you make in Lovable are committed to your repository, and commits pushed to the synced branch appear back in your Lovable project.

> [!NOTE]
>
> You don't need Git to use Lovable. Many users build and launch entirely within Lovable. If you only need a copy of your code, use the **Download codebase** section in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab), or open the [Code editor](https://docs.lovable.dev/features/code-mode.md) and click **Download codebase** at the bottom of the file tree sidebar (paid plans).

This page explains how Git sync works across providers. In a project, you manage the connection in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab). For setup steps, see the provider pages:

* [GitHub](https://docs.lovable.dev/integrations/github.md) (github.com, GitHub Enterprise Cloud with data residency, or GitHub Enterprise Server)
* [GitLab](https://docs.lovable.dev/integrations/gitlab.md) (GitLab.com or a self-managed GitLab instance)
* [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md) (Bitbucket Cloud)

> [!NOTE]
>
> Want your app to call the GitHub REST API to read repositories, issues, and pull requests instead? Use the [GitHub API connector](https://docs.lovable.dev/integrations/github-api.md).

## Why sync your project to a Git repository

* **Back up your code.** Store your project safely outside Lovable, in an account you control.
* **Collaborate with developers.** Use branches, pull or merge requests, and code reviews alongside building in Lovable.
* **Work locally in your IDE.** Clone the repository, edit and commit locally, and push. Your changes sync back into Lovable. See [Work locally in your IDE](#work-locally-in-your-ide).
* **Deploy outside Lovable.** Self-host or deploy to other platforms. See [Deployment, hosting, and ownership options](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership).
* **Keep a copy of your code within your own infrastructure.** Sync to GitHub Enterprise Cloud with data residency, GitHub Enterprise Server (both Enterprise plan), or a self-managed GitLab instance.

## How Git sync works

Git sync has two layers, on every provider:

1. **A workspace connection** authorizes Lovable to access a Git account, organization, group, workspace, or instance. Connections belong to the workspace, and any project in the workspace can use them. A workspace can have multiple connections, including connections to GitHub, GitLab, and Bitbucket at the same time.
2. **A project repository link** connects one Lovable project to one repository under one of those connections. When you link a project, Lovable creates a new repository and starts two-way sync automatically.

After you link a project:

* Lovable commits the edits you make in Lovable and pushes them to your repository.
* Commits you push to the synced branch appear in your Lovable project.
* Synced commits go through the same checks as edits made in Lovable. If they change your dependencies, Lovable runs the [dependency audit](https://docs.lovable.dev/features/security#identifying-vulnerabilities-in-dependencies) and updates the project's [Security view](https://docs.lovable.dev/features/security-view.md).
* Lovable edits and syncs **one branch at a time**. Commits on other branches don't appear in Lovable until you merge them into the synced branch or switch the synced branch. You can switch branches and create new branches from Lovable on every provider.

### Sync status

The sync status card in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) compares the synced branch in Lovable with the same branch on your provider. Each label names your provider. On a GitHub project, the card shows one of the following states:

* **In sync with GitHub**: Lovable and GitHub are on the same commit.
* **Lovable is N commits ahead of GitHub**: Lovable pushes these changes to GitHub on the next sync.
* **GitHub is N commits ahead of Lovable**: Lovable hasn't pulled these commits yet. If this state persists after you push, follow the troubleshooting entry for [GitHub](https://docs.lovable.dev/integrations/github.md#project-repository-issues), [GitLab](https://docs.lovable.dev/integrations/gitlab.md#troubleshooting), or [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md#troubleshooting).
* **Lovable and GitHub have diverged**: Lovable and GitHub each have commits that the other does not. Lovable pushes its changes to a separate `lovable-sync` branch instead of the synced branch, and the next sync from GitHub replaces Lovable's version of the branch with the GitHub version.
* **Couldn't check GitHub right now** or **Sync state couldn't be determined**: the comparison failed, or the two histories don't meet within the commits Lovable compares. Click **Re-check** to compare again.

Lovable compares the 50 most recent commits on each side, so a count can read **50+**. The card also shows when Lovable last synced the branch and when it last checked the status. Click **Re-check** to compare the branches again. **Re-check** doesn't sync anything.

### Roles and permissions

* **Workspace owners and admins** add, update, and delete workspace connections, and enable or disable [commit attribution](#commit-attribution).
* **Workspace or project owners and admins** connect and disconnect projects.
* **Editors and above** view sync status and work with the synced repository.
* **Project owners** restore Lovable work after a repository push replaces it.

The provider pages list the exact role requirements for each action.

## Choose a provider

Each project links to one repository on one provider. All providers support the same core two-way sync.

| | GitHub | GitLab | Bitbucket |
| - | - | - | - |
| Hosted service | github.com (all plans) | GitLab.com (all plans) | Bitbucket Cloud (all plans) |
| Your own infrastructure | GitHub Enterprise Cloud with data residency, or GitHub Enterprise Server (both Enterprise plan) | Self-managed GitLab instance (all plans) | Not available (Bitbucket Data Center is not supported) |
| Connection method | Lovable GitHub App (or your own copy of it on Enterprise Server) | OAuth with your GitLab account | OAuth with your Atlassian account |
| Synced branch | Active branch: switch and create branches from Lovable | Active branch: switch and create branches from Lovable | Active branch: switch and create branches from Lovable |
| Repository renames | Followed automatically | Break the sync | Followed automatically |

If your team already uses one of these platforms, use that one.

## Work locally in your IDE

When a project syncs with a repository, you can clone that repository, edit the code with your own IDE or coding assistant, and push the result back. Commits on the synced branch appear in your Lovable project, and you continue building on them in Lovable. Repository access and project access are separate. To push, you need write access to the repository on your Git provider. To keep building in Lovable, you need an editor role on the project.

Check the README and `package.json` in the repository for what you need installed and for the commands that install dependencies and start the app.

### Keep Lovable and your work on separate branches

Lovable edits and syncs one branch at a time. The branch picker in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab) shows which one. Keep Lovable on that branch, usually `main`, and make your local changes on a feature branch. The feature branch stays out of your Lovable project until you merge it into the synced branch, so unreviewed work does not reach the project. When you merge, Lovable pulls the result.

Do not force-push, rebase, or squash commits that are already on the synced branch. Lovable keeps its own copy of that branch. When you rewrite its history, the next sync saves a backup of Lovable's copy and then replaces it with yours. The project owner can [restore the backup](#restore-lovable-work-after-a-push-replaces-it). To undo a change, add a commit that reverts it.

If your team requires a pull or merge request for every change to `main`, switch Lovable to a feature branch of its own and merge its work through the same review process. Your Git provider rejects Lovable's pushes to a protected branch, and Lovable then pushes to the `lovable-sync` branch instead. See the troubleshooting entry for [GitHub](https://docs.lovable.dev/integrations/github.md#project-repository-issues), [GitLab](https://docs.lovable.dev/integrations/gitlab.md#troubleshooting), or [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md#troubleshooting).

### Restore Lovable work after a push replaces it

When a push to the synced branch replaces commits that Lovable made, Lovable saves a backup of its copy of the branch first. A notice appears in the editor and in [**Project settings → Git**](https://docs.lovable.dev/features/projects/settings.md#git-tab): **A repository push replaced your Lovable work**. Click **Review restore** to see what was saved and choose what to keep.

* **Restore Lovable work** brings the saved commits back to the project. Lovable then syncs them to your repository. When the repository has no newer commits, the work goes to the synced branch. Otherwise it goes to a `lovable-sync` branch, and Lovable shows a **Merge on GitHub**, **Merge on GitLab**, or **Merge on Bitbucket** link to open a pull or merge request for it. Merge that branch with a merge commit, not a squash or rebase.
* **Keep repository version** closes the notice and leaves the project as the push left it. Lovable does not offer this restore again.

Only the project owner can restore. Other members see the notice but must ask the project owner to restore. Lovable shows the notice for 24 hours after the push. After that, the project owner opens **Project settings → Git** and clicks **Check for saved Lovable work**.

### Hand over work between Lovable and your IDE

Before you clone or merge, let any Lovable edit in progress finish and check the [sync status](#sync-status) card. When the card reports that Lovable and your provider are in sync, your local copy starts from the latest Lovable changes. After you merge, the card shows the in-sync state again when Lovable has pulled your commits.

### Check the environment before you run the app

A clone gives you the code, not the services the app calls. In a project that uses [built-in backend](https://docs.lovable.dev/features/cloud), the repository's `.env` file carries the URL and publishable key of your backend, for example as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. A local app that keeps that configuration reads and writes the same backend as your published app, so records you create or delete locally change real data. Use test accounts and records while you test writes. A Git branch does not give you a separate database.

> [!WARNING]
>
> Variables prefixed with `VITE_` are included in the code your app sends to the browser. Do not add a service role key or any other secret to them.

The repository does not carry everything sign-in and server-side calls need. An authentication provider redirects only to URLs it knows, so add your local URL where your provider configures redirect URLs. Secrets you store in Lovable stay out of the repository, so server-side code that reads them needs those values wherever it runs. The credentials behind [app + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md) and [Lovable AI](https://docs.lovable.dev/features/ai) are managed by Lovable and cannot be copied out. In an older React + Vite app, those calls run in Edge Functions on your backend, so a local app that uses that backend can still make them. In a newer app (created from May 13, 2026, which uses [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md)), the server code runs on your machine, so connector and AI calls fail locally. Test them in the Lovable preview or in your published app. When the app works in Lovable but a request fails locally, check the service that request reaches.

### Backend files in your commits

In a project that uses the built-in backend, the repository also contains your backend code: Edge Functions under `supabase/functions/` and the migration files that record your database structure, under `drizzle/migrations/` and `supabase/migrations/`. Lovable does not deploy a changed Edge Function or run a new migration file when your commits sync.

* **Edge Functions**: after the commit syncs, ask Lovable in the project chat to deploy the function, then check it under [**More → Database → Manage → Edge functions**](https://docs.lovable.dev/features/edge-functions.md).
* **Migrations**: to change the database structure, ask Lovable in the project chat, or run the SQL yourself in the [SQL editor](https://docs.lovable.dev/features/database#run-sql-queries). When you ask in the chat, Lovable records the change as a new migration file in the repository. See [How Lovable changes your database structure](https://docs.lovable.dev/features/database#how-lovable-changes-your-database-structure).

### Continue building in Lovable

After your merge reaches the synced branch and the sync status card shows both sides in sync, open the changed files in the [code editor](https://docs.lovable.dev/features/code-mode.md) and test the behavior in the preview. Then tell Lovable what changed, so its next edit builds on your work:

```text wrap theme={null}
I changed [files] outside Lovable to [describe the change]. Keep [behavior or constraint] when making further edits. Now [describe the next change you want].
```

A merge does not change your published app. When the change is ready for your users, [publish](https://docs.lovable.dev/features/publish.md) again.

Lovable treats code you wrote the same as code it generated, and it can change either in a later request. Put constraints that should hold across requests in [project instructions](https://docs.lovable.dev/features/knowledge.md), and keep tests for behavior you depend on. See [Test and verify your app](https://docs.lovable.dev/features/testing.md) for the testing tools in Lovable.

## Commit attribution

Commits that Lovable pushes are not authored by the workspace member who triggered them. On GitHub they come from the Lovable GitHub app. On GitLab and Bitbucket, Lovable pushes them through the account that authorized the workspace connection. For how each platform still credits the member behind a change, see commit attribution for [GitHub](https://docs.lovable.dev/integrations/github.md#commit-attribution), [GitLab](https://docs.lovable.dev/integrations/gitlab.md#commit-attribution), and [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md#commit-attribution).

To record who triggered each change, a workspace owner or admin can enable **Include member email addresses in commits** in [**Workspace settings → Git → Commit attribution**](https://lovable.dev/settings/git). The setting is available on the Business and Enterprise plans and is disabled by default. On other plans the section does not appear.

While it is enabled, commits Lovable makes on a member's behalf carry that member's email address on its own line in the commit message body:

```text wrap theme={null}
Add a contact form

X-Lovable-Author-Email: member@example.com
```

Not every commit carries an address. Commits Lovable makes on its own, such as when you publish a project, carry none, and neither do commits from someone who was invited to a single project rather than to the workspace.

The setting matters most for members whose changes are not already attributed. On a GitHub repository, Lovable co-attributes each commit to the GitHub account of the member who triggered it. If that member has connected a GitHub account, GitHub already links most of their commits to their profile. The setting adds a record in two cases:

* **Members with no connected GitHub account.** Lovable cannot co-attribute their commits at all, so without this setting nothing in the repository records who triggered the change.
* **GitLab and Bitbucket repositories.** Lovable does not add the co-author line on these providers, so without this setting nothing in the repository records who triggered the change.

Enable it when you need to trace a change back to a person, for example for code review, audits, or internal reporting. Leave it disabled for public repositories.

When you disable it, Lovable stops adding addresses to new commits. A change already in progress finishes with the setting it started with.

> [!WARNING]
>
> **Not recommended for public repositories.** Email addresses in commit messages are visible to everyone who can read the repository's history, including people outside your workspace, and a public repository makes them readable by anyone on the internet. Lovable cannot rewrite Git history, so addresses in commits you already pushed stay in your repository after you disable the setting.

## Disconnecting and reconnecting

When you disconnect a project, Lovable stops the sync and changes nothing else:

* Your repository stays on GitHub, GitLab, or Bitbucket, intact with all history and files.
* Your project and its code stay in Lovable. Changes you make afterwards stay in Lovable only.

If you reconnect a project later, Lovable creates a **new repository** with the current version of your project. The original repository stays in your account but is no longer linked.

To move a project to a different provider, disconnect it first. While a project is linked, **Project settings → Git** shows only the connected provider's card, with a notice under it, for example "This project syncs with GitHub. A project can use one Git provider at a time — disconnect it to switch." After you disconnect the project, the GitHub, GitLab, and Bitbucket cards all appear again, and you can connect the project to any of them.

## Limitations

These apply to every provider:

* **Export only.** You can't import an existing repository into Lovable. When you connect a project, Lovable always creates a new repository.
* **One repository per project.** Each Lovable project links to exactly one repository on one provider. To switch providers, [disconnect the project](#disconnecting-and-reconnecting) first.
* **One branch at a time.** Only commits on the synced branch appear in Lovable.
* **Keep the repository where it is.** Deleting a connected repository stops the sync. On GitHub and Bitbucket, the sync follows a renamed repository, a renamed account, organization, or workspace, and a repository moved to another account, organization, or workspace that your Lovable workspace also has a connection to. A move to a destination without a connection disconnects the project. On GitLab, a rename or move of the project or its group breaks the sync.
* **Reconnecting creates a new repository.** You can't re-link a previously disconnected repository.
* **No sync for drafts.** A [draft](https://docs.lovable.dev/features/drafts.md) doesn't appear as a branch in your repository. Its code reaches the repository after you accept the draft, like any other project change.

## FAQ

> **Do I need to know Git to use this?**
>
> No. Set up the connection once and your code is safely stored in your repository. You only need Git knowledge for advanced workflows such as branching, pull or merge requests, or CI/CD.

> **Do I need Git sync just to get a copy of my code?**
>
> No. On paid plans you can download your code directly: use the **Download codebase** section in **Project settings → Git**, or click **Download codebase** in the [Code editor](https://docs.lovable.dev/features/code-mode.md). Git sync is for ongoing two-way sync and collaboration.

> **Can I use more than one Git provider?**
>
> A workspace can have connections to GitHub, GitLab, and Bitbucket at the same time, and different projects can sync to different providers. A single project links to one repository on one provider. To switch a project to a different provider, [disconnect it](#disconnecting-and-reconnecting) first.

> **Does pushing to my repository update my live site?**
>
> No. When you push commits, Lovable syncs your code and updates the preview in the editor, but it never publishes. Your live site only changes when you publish from Lovable. See [Publish your project](https://docs.lovable.dev/features/publish.md).

> **Is my database included in the repository?**
>
> No. The repository contains your project's code, including the database migration files that define its structure, but never the data inside your database. Lovable does not run migration files that you add through Git. See [Backend files in your commits](#backend-files-in-your-commits). To export data, see [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database).

> **Can I import an existing repository into Lovable?**
>
> No. Git sync only exports from Lovable. When you connect a project, Lovable creates a new repository.

> **Can I use any IDE or coding assistant when I work locally?**
>
> Yes. Lovable receives the commits you push to the synced branch regardless of which tool made them, so any IDE or coding assistant that works with Git is supported. See [Work locally in your IDE](#work-locally-in-your-ide).

> **Does working locally use credits?**
>
> You use no Lovable credits when you edit and commit code on your computer. A change you ask Lovable to make in the project chat consumes credits as usual. Calls your local app makes to your Cloud backend or through the AI Gateway count as Cloud and AI usage, the same as calls from your published app. External services bill you directly for the calls your app makes to them. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Will Lovable keep the code I wrote outside Lovable?**
>
> Your changes become part of the project's code when they sync, and Lovable builds on them. Lovable can also edit that code in a later request, the same as code it generated. To protect behavior you depend on, describe the constraint in [project instructions](https://docs.lovable.dev/features/knowledge.md) and cover it with tests.

> **Do I need commit attribution if my team already connected their GitHub accounts?**
>
> Usually not. On a GitHub repository, Lovable already co-attributes each commit to the GitHub account of the member who triggered it, so their changes are linked to their GitHub profile. On a Business or Enterprise plan, enable **Include member email addresses in commits** when some members have no connected GitHub account, or when you sync to GitLab or Bitbucket, where Lovable does not add the co-author line.

> **Can I remove member email addresses from commits I already pushed?**
>
> Not from Lovable. When you disable **Include member email addresses in commits**, Lovable stops adding the address to new commits, but it cannot change commits that are already in your repository. To remove them, you must rewrite the repository's Git history yourself, which changes every affected commit.

> **Is my code still in Lovable after I connect?**
>
> Yes. Your project remains fully editable in Lovable. The repository is a synced copy that you own. When you disconnect, Lovable deletes no code on either side.


## Related topics

- [Sync your Lovable project with GitLab](https://docs.lovable.dev/integrations/gitlab.md)
- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
