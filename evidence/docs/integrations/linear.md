# Connect your app to Linear
<!-- source: https://docs.lovable.dev/integrations/linear.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Linear

> Connect your app to Linear to create and update issues, read project and team data, and build issue tracking workflows in your Lovable apps.

[Linear](https://linear.app/) is a project management tool built for software teams. It lets your Lovable app work with issues, projects, teams, cycles, and comments so you can build internal tools and automations that interact directly with your team's Linear workspace.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Linear connection in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable read your own Linear account as context while you build, personal to you |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Linear account and work with their own data |

With Linear, your app can:

* Create and update issues and comments
* Read team, project, and cycle data
* Build dashboards that surface issue status and progress
* Automate triage, reporting, and planning workflows

Linear is a good fit when your app needs to work with engineering tasks, product planning, or issue tracking directly from your app interface.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Bug reporting form | *Build an internal bug reporter that creates a Linear issue when a user submits a report.* | **Let users file bugs directly into Linear from your app.** The app captures the submission and creates a properly formatted Linear issue in the right team queue, with no manual copy-paste required. |
| Sprint dashboard | *Build a sprint dashboard that shows open issues by team and status, grouped by cycle.* | **Give your team a live view of sprint progress without leaving your app.** The app reads current cycle data from Linear and displays issues by status, assignee, or priority. |
| Feature request intake | *Build a product request intake form. When someone submits a request, create a Linear issue in the triage backlog.* | **Turn form submissions into structured Linear issues automatically.** The app routes incoming requests directly into your Linear backlog so nothing falls through the cracks. |
| Issue triage workspace | *Build an internal triage workspace that shows new Linear issues, lets me filter by team and priority, and update status from one view.* | **Help teams review and manage incoming work more efficiently.** The app reads issues from Linear, organizes them into a focused triage interface, and lets users update priorities or statuses without switching tools. |
| Project health dashboard | *Build a project health dashboard that pulls issue counts, completion rates, and blockers from Linear.* | **Combine Linear data with your app's context in a single internal view.** The app reads project and cycle metrics from Linear and surfaces them alongside other operational data. |

## How Linear connections work

Each Linear connection is authorized for a single Linear workspace. When you connect Linear, you authorize Lovable to access Linear on behalf of the authenticated account.

Within your Lovable workspace:

* You can create multiple Linear connections.
* Each connection is a separate OAuth authorization.
* Each connection can:
  * Use different scopes
  * Connect to a different Linear workspace
* Multiple projects within a single workspace can use the same connection.

This makes it easy to separate environments (for example, development and production) or manage multiple Linear workspaces.

Linear uses Lovable's gateway architecture for secure OAuth handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

## How to connect Linear

Workspace **admins** and **owners** can connect Linear.

When a connection is created, Linear becomes available across all projects in the workspace.

### Prerequisites

Before connecting Linear, make sure you have:

* A Linear account you can authorize via OAuth
* Lovable workspace admin or owner role

### Set up your Linear connection

> [!WARNING]
>
> When you connect Linear, your Linear data will be accessible to all users in your workspace.

**1. Navigate to the Linear connector**

Open **Connectors** and select **Linear**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a name for the connection, for example `Linear (Prod)`.

**4. Configure scopes (optional)**

Expand **Advanced settings** to review or adjust the requested OAuth scopes - the Linear permissions your app needs. **Read** and **Write** are selected by default and cover the most common use cases.

> [!TIP]
>
> Select only the scopes your app needs. You can update scopes later by editing the connection and clicking **Reconnect**. For full scope documentation, see [Linear scope reference](https://linear.app/developers#scopes).

**5. Connect to Linear and authorize the connection**

* Click **Connect** at the bottom of the form. The Linear authorization window opens, so make sure your browser does not block pop-ups.
* Select the workspace you want to connect, review the requested permissions, and click **Allow**. You’ll be redirected back to Lovable with a confirmation.

When connected, your Lovable apps can start using Linear data.

## Limitations

The Linear connector does not support:

* Receiving incoming Linear webhooks or real-time event subscriptions.

## Manage your Linear connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Linear**, then open the connection.

* **Unlink projects** to remove Linear access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Linear stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
