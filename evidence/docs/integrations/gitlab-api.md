# Connect your app to GitLab API
<!-- source: https://docs.lovable.dev/integrations/gitlab-api.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to GitLab API

> Connect your app to GitLab.com, GitLab Self-Managed, or GitLab Dedicated to work with projects, issues, merge requests, pipelines, and repository files through the GitLab REST API.

[GitLab](https://gitlab.com/) hosts source code, issues, merge requests, and CI/CD pipelines. The GitLab API connector lets your Lovable app call the [GitLab REST API](https://docs.gitlab.com/api/rest/) on GitLab.com, GitLab Self-Managed, or GitLab Dedicated. Use it to build apps that read or update GitLab data, such as issue dashboards, merge request queues, delivery dashboards, and developer workflows.

Choose the connection type based on whose GitLab account your app should use:

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with one shared GitLab connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own GitLab account and work with data they can access |

Both connection types are available on Free, Pro, Business, and Enterprise plans. On Business and Enterprise plans, workspace admins and owners control who can create connections and clients, and the setting starts at **Admins**. In some Enterprise workspaces, both connection types start at **No one**, which disables them until an admin or owner changes it. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

With GitLab API, your app can:

* List projects, branches, commits, and repository files
* Create and update issues and merge requests
* Read pipelines and their status
* Build dashboards and automations on top of GitLab data

> [!NOTE]
>
> This connector gives an app access to the GitLab REST API. It does not export or synchronize your Lovable project's code.
> To two-way sync your Lovable project with a GitLab repository, use [GitLab Git sync](https://docs.lovable.dev/integrations/gitlab.md).

## Common use cases and example apps

Use these examples to decide whether your app needs one shared GitLab connection or per-user access.

| Example app | Description |
| :- | :- |
| Issue triage board | **Prioritize work across projects.** List open issues and group them by label, milestone, assignee, or priority. |
| Merge request review queue | **Keep reviews moving.** Show open merge requests, reviewers, approval status, pipeline results, and age in one place. |
| Delivery dashboard | **Track what is shipping.** Combine pipeline and commit data into one view for your team. |
| Repository browser | **Create a tailored view of source code.** Let users browse projects, branches, commits, and repository files. |
| Feedback intake workflow | **Turn user feedback into issues.** Create a GitLab issue when someone submits feedback or reports a bug in your app. |
| Personal developer hub | **Give each user a personalized workspace.** Use the app user connector so each signed-in user sees the projects, issues, and merge requests available to their own GitLab account. |

For a shared connection, you can start with a prompt like:

```text wrap theme={null}
Use our shared GitLab connection to build an issue triage dashboard for the team's projects. Show open issues by label and assignee, and let users create a new issue.
```

For per-user access, use the [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) and ask Lovable to build the sign-in flow:

```text wrap theme={null}
Let each signed-in user connect their own GitLab account, then show the merge requests waiting for their review.
```

## Prerequisites

Before creating an app + chat connection, make sure you have:

* Access to GitLab.com, GitLab Self-Managed, or GitLab Dedicated
* A GitLab personal, project, or group access token with the scopes and resource access your app needs
* Permission to **create connections** in your Lovable workspace, as described in [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients)
* For a restricted Self-Managed or Dedicated instance, network rules that allow traffic from [Lovable's connector gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting)

> [!NOTE]
>
> Building the integration uses workspace build credits. Requests from a published app run through its built-in backend and contribute to Cloud usage. GitLab controls its own plan requirements, API quotas, rate limits, and billing. Gateway requests also have a [per-project usage limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors).

## How GitLab API connections work

An app + chat connection uses one GitLab access token. Everyone who uses the connection acts with that token's identity, permissions, and resource access. You can create multiple connections with different tokens to separate teams, projects, or environments.

Lovable sends requests through the [connector gateway](https://docs.lovable.dev/integrations/security.md#gateway-connectors). The gateway stores the token securely, adds it to GitLab requests, and keeps it out of your project code and published app.

For GitLab Self-Managed and GitLab Dedicated, the connection also stores your instance URL. Lovable sends API requests to that instance instead of GitLab.com.

## Connect GitLab API with an access token

### Step 1: Create a GitLab access token

The connector accepts three GitLab access token types:

| Token type | Access boundary |
| :- | :- |
| Personal access token | Resources the GitLab user can access |
| Group access token | The selected group and its projects |
| Project access token | One project |

Choose the narrowest token type that covers your app's use case. See the [GitLab token overview](https://docs.gitlab.com/security/tokens/) for the requirements and availability of each token type.

**1. Open the token settings in GitLab**

For a personal access token, sign in to GitLab, select your avatar, and open **Edit profile → Access → Personal access tokens**.

For a group or project access token, open the relevant group or project settings and follow GitLab's access token documentation.

**2. Choose the minimum required scope**

Select `read_api` if your app only reads GitLab data. Select `api` if the app creates or changes projects, issues, merge requests, pipelines, or repository files.

Your token also inherits the permissions and resource access of the user or bot account that owns it. A scope cannot grant access that account does not already have.

**3. Set an expiration date**

Choose an expiration date that follows your organization's security policy. Before the token expires, plan to rotate it and update the Lovable connection.

**4. Generate and copy the token**

Generate the token and copy it when GitLab displays it. GitLab does not show the token again after you leave or refresh the page.

> [!WARNING]
>
> Treat the access token like a password. Store it securely, never put it in a prompt or project code, and paste it only into the GitLab API connection form in Lovable.

For detailed instructions, see [Personal access tokens](https://docs.gitlab.com/user/profile/personal_access_tokens/) and [Access token scopes](https://docs.gitlab.com/security/tokens/access_token_scopes/) in the GitLab documentation.

### Step 2: Connect GitLab API to Lovable

Add and verify the shared connection in Lovable.

**1. Open GitLab API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **GitLab API**.

See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for the other places you can open the catalog.

**2. Add an app + chat connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name** (optional): name the connection, for example `GitLab Production`. Leave it blank and Lovable generates a name.
2. **Access token**: paste the personal, project, or group access token you created.
3. **Instance URL** (optional): leave this empty for GitLab.com. For GitLab Self-Managed or GitLab Dedicated, expand **Advanced settings** and enter the instance's HTTPS root URL, for example `https://gitlab.example.com`. Do not add `/api/v4` or a resource path.

**4. Choose who can use the connection**

Under **Sharing**, the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**.

Everyone with access can [link the connection to projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) and use the GitLab data available to its token. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the access token with the configured GitLab instance before saving the connection.

**6. Link the connection to a project**

In the project's chat, tell Lovable what you want to build with GitLab. Lovable links a connection you can access, then builds the feature.

> [!TIP]
>
> The connection is ready when it appears in **Connectors → GitLab API**. After you link it to a project, it also appears under that project's **App connections**.

## Limitations

The GitLab app + chat connector documented on this page cannot:

* Use GitLab OAuth for separate end-user accounts. For per-user OAuth, use the GitLab [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).
* Replace [GitLab Git sync](https://docs.lovable.dev/integrations/gitlab.md) for exporting or two-way syncing your Lovable project's codebase.
* Access resources outside the token owner's membership, role, token type, or selected scopes.
* Refresh or rotate personal, project, or group access tokens automatically. Update the connection when a token expires, is revoked, or is rotated.
* Reach a Self-Managed or Dedicated instance that blocks Lovable's connector gateway traffic.
* Bypass GitLab or Lovable gateway rate limits.

## Troubleshooting

Use these checks if the connection or a GitLab API request fails.

> **The connection says my access token is invalid**
>
> Confirm that the token is active, has not expired or been revoked, and belongs to the GitLab instance in **Instance URL**. Leave **Instance URL** empty for GitLab.com.

> **A request returns 401 Unauthorized**
>
> The token has usually expired or been revoked. Create or rotate the token in GitLab, then update the connection with the new value.

> **A request returns 429 Too Many Requests**
>
> The GitLab account or instance has reached an API rate limit. Wait for the period in the `Retry-After` response header, reduce polling frequency, and avoid retrying in a fast loop.

> **A project or resource returns 404 even though it exists**
>
> GitLab can return `404` for private resources the token cannot access. Confirm the token owner's membership, role, token type, and scope. When using a project path in an API call, make sure the namespace and project path are URL-encoded exactly once.

> **Lovable cannot reach my GitLab instance**
>
> Confirm that the instance uses HTTPS and is reachable from the public internet or from [Lovable's connector gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting). If the instance stays private behind a VPN or firewall, the connector cannot call it.

## Manage your GitLab API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **GitLab API**, then open the connection.

* **Unlink projects** to remove GitLab API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use GitLab API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Sync your Lovable project with GitLab](https://docs.lovable.dev/integrations/gitlab.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [Connect your app to GitHub API](https://docs.lovable.dev/integrations/github-api.md)
