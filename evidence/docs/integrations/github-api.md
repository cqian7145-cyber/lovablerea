# Connect your app to GitHub API
<!-- source: https://docs.lovable.dev/integrations/github-api.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to GitHub API

> Connect your app to GitHub by signing in with your GitHub account or with a personal access token, to read repositories, manage issues and pull requests, and build automations with the GitHub REST API.

[GitHub](https://github.com/) hosts repositories, issues, pull requests, and CI workflows for engineering teams. The GitHub API connector lets your Lovable app call the [GitHub REST API](https://docs.github.com/en/rest) from server code. It's designed for apps that read or update GitHub data, such as issue dashboards, PR trackers, and automation workflows.

GitHub is available as two connection types in Lovable:

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared GitHub connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own GitHub account and work with their own repositories, issues, and pull requests |

With GitHub, your app can:

* List and read repositories, branches, and file contents
* Create and update issues and pull requests
* Read commits, releases, and workflow runs
* Build internal tools and automations on top of GitHub data

It's a good fit for internal engineering tools, team dashboards, and apps that automate work around your repositories.

> [!NOTE]
>
> This connector calls the GitHub REST API from apps you build with Lovable. Want to export or two-way sync your Lovable project's code to a GitHub repository instead? Use [GitHub Git sync](https://docs.lovable.dev/integrations/github.md).

## Common use cases and example apps

These examples show what you can build with GitHub, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Issue triage board | *Use GitHub and build a dashboard that lists open issues across my repositories, grouped by label.* | **Surface open work without leaving your app.** The app reads issues from GitHub and presents them in a filterable board. |
| PR status hub | *Use GitHub and build a page that shows open pull requests with review status and age.* | **Give reviewers a live view of in-flight code review.** The app fetches pull requests and highlights stale or blocked reviews. |
| Release tracker | *Use GitHub and build a tool that lists recent releases and workflow results for our main repos.* | **Track shipping activity from GitHub data.** The app combines release and Actions metadata in one view. |
| Repo health dashboard | *Use GitHub and build an admin page that shows repository stats and open issue counts.* | **Monitor repository health at a glance.** The app aggregates GitHub API responses into summary cards. |
| Feedback-to-issue form | *Use GitHub and build a feedback form that creates a GitHub issue when someone submits it.* | **Turn app events into GitHub issues automatically.** The app validates the input and creates the issue through the GitHub REST API. |
| Contributor activity feed | *Use GitHub and build a page that shows recent commits and pull requests across our team repositories.* | **Give stakeholders a single view of recent engineering activity.** The app fetches commits and pull requests and groups them by repository or author. |

## How to connect GitHub API

Who can create GitHub API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you can choose between:

* **GitHub**: sign in with your GitHub account in one click (OAuth)
* **Use your own credentials**: connect with a personal access token you create in GitHub

You can create multiple GitHub API connections using different GitHub accounts or tokens, which is useful for separating environments (for example, development and production) or using different permission scopes.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting GitHub API, make sure you have:

* A GitHub account
* A [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), only if you connect with your own credentials instead of signing in with GitHub
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your GitHub account [rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api). Billing and quota are handled directly by GitHub, not Lovable.

Follow the setup steps below based on how you want to connect GitHub.

**Connect with your GitHub account**

Choose this option for the fastest setup. You authorize Lovable with your GitHub account, and no personal access token is needed. In the connection form, this option is labeled **GitHub**.

**1. Open GitHub API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **GitHub API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

The first time you open GitHub API, Lovable asks what you want to do. Choose **Use the connector**. The other option, **Sync my code**, sets up [GitHub Git sync](https://docs.lovable.dev/integrations/github.md) instead.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `GitHub Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose GitHub authentication**

Under **Authentication**, select **GitHub**. This is the OAuth option.

**5. Review scopes (optional)**

Under **Scopes**, review the permissions your app requests. **Read user profile** is always included, and **Repositories** is selected by default.

| Scope | Description | Default |
| - | - | - |
| Read user profile (`read:user`) | Read the authenticated user's profile data | Required |
| Repositories (`repo`) | Full access to public and private repositories, including code, issues, and pull requests | On |
| Public repositories (`public_repo`) | Access limited to public repositories | Off |
| Workflows (`workflow`) | Update GitHub Actions workflow files | Off |
| Gists (`gist`) | Create and manage gists | Off |
| Notifications (`notifications`) | Access notification marks and threads | Off |
| Email (`user:email`) | Read the authenticated user's email addresses | Off |
| Read organizations (`read:org`) | Read organization and team membership | Off |
| Projects (`project`) | Full control of projects | Off |

For full scope documentation, see [Scopes for OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps).

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect to GitHub and authorize**

Click **Connect** at the bottom of the form. The GitHub authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to GitHub if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

**Use your own credentials**

Use a personal access token if you want to control the exact token, limit it to specific repositories with a fine-grained token, or manage rotation yourself.

### Step 1: Create a GitHub personal access token

A personal access token lets your Lovable app authenticate with the GitHub REST API as the GitHub account that owns the token.

To create a GitHub personal access token:

**1. Open GitHub token settings**

Sign in to [GitHub](https://github.com/) and open [Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens).

**2. Generate a token**

Create a **fine-grained** or **classic** token. Give it a descriptive name, for example `Lovable integration`. Fine-grained tokens can be limited to specific repositories. Classic tokens use scope lists such as `repo` or `public_repo`.

**3. Select permissions**

Grant only the permissions your app needs. For private repositories, include repository read or write access. For public data only, `public_repo` can be enough on classic tokens.

**4. Copy the token**

Copy the token when GitHub shows it and store it securely. GitHub does not show it again.

> [!WARNING]
>
> Your personal access token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See GitHub documentation for more: [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### Step 2: Connect GitHub API to Lovable

With your token ready, add the connection in Lovable. You can create multiple connections using different personal access tokens.

**1. Open GitHub API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **GitHub API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

The first time you open GitHub API, Lovable asks what you want to do. Choose **Use the connector**. The other option, **Sync my code**, sets up [GitHub Git sync](https://docs.lovable.dev/integrations/github.md) instead.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `GitHub Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Authentication**, select **Use your own credentials**. Then paste the token you created in step 1 in **Personal access token**.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the GitHub API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to GitHub API (based on configured connection-level access). Your Lovable apps can then read and update repositories, issues, pull requests, and other GitHub resources.

## Limitations

The GitHub API app + chat connector documented on this page cannot:

* Replace [GitHub Git sync](https://docs.lovable.dev/integrations/github.md) for exporting or syncing your Lovable project's codebase
* Use GitHub App installation tokens. Connections authenticate as a GitHub account, with an OAuth sign-in or a personal access token.
* Call endpoints your granted scopes or token permissions do not cover. If a call returns `403`, review the OAuth scopes on the connection or the permissions on your personal access token.
* Support per-end-user GitHub login. Each connection represents a single GitHub account shared across all projects linked to it. If you need each user of your app to sign in with their own GitHub account, use the GitHub [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).

If GitHub authorization is revoked from the GitHub side, you'll need to reconnect the integration in Lovable before API calls can succeed again. If a personal access token expires or is revoked, update the token on the connection in Lovable.

## Manage your GitHub API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **GitHub API**, then open the connection.

* **Unlink projects** to remove GitHub API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use GitHub API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Connect your app to GitLab API](https://docs.lovable.dev/integrations/gitlab-api.md)
- [Connect your app to HubSpot](https://docs.lovable.dev/integrations/hubspot.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
