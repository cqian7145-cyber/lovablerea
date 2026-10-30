# Connect your app to Asana
<!-- source: https://docs.lovable.dev/integrations/asana.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Asana

> Connect your app to Asana with a personal access token (PAT) to create and update tasks, read project and team data, and automate work tracking workflows in your Lovable apps.

[Asana](https://asana.com/) is a work management platform for tasks, projects, and team planning. It lets your Lovable app work with tasks, projects, teams, sections, and assignees so you can build internal tools and automations that interact directly with your team's Asana workspace.

Asana is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Asana, your app can:

* Create and update tasks
* Read team, project, and section data
* Track assignees, due dates, and task status
* Automate intake, reporting, and planning workflows

Asana is a good fit when your app needs to work with project management, task tracking, or team planning directly from your app interface.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Request intake to Asana | *Build an intake form. When someone submits, create an Asana task in the Operations project and assign it to the on-call manager.* | **Turn form submissions into trackable Asana tasks automatically.** The app captures the submission and creates a properly formatted Asana task in the right project, with no manual copy-paste required. |
| Project status dashboard | *Build a dashboard that reads tasks from our Launch project, groups by section, and highlights overdue items.* | **Give teams a live project view without leaving your app.** The app reads current project data from Asana and displays tasks by section, assignee, or status. |
| Automated task follow-ups | *Every weekday, find incomplete tasks due in 2 days and post a reminder summary in the app.* | **Reduce missed deadlines with automated follow-up logic.** The app reads upcoming due dates from Asana and surfaces reminders directly in your app. |
| Team workload view | *Show open tasks by assignee from Asana and flag teammates with more than 10 active tasks.* | **Surface workload imbalance for planning and staffing decisions.** The app reads task assignments from Asana and organizes them into a focused workload view. |
| Bug-to-task workflow | *When a bug report is submitted, create an Asana task with severity, reporter, and reproduction steps.* | **Standardize triage by routing bug reports into Asana with structure.** The app turns incoming bug reports into properly formatted Asana tasks so nothing falls through the cracks. |

## How Asana connections work

Each Asana connection is authenticated with a personal access token (PAT) issued by an Asana account. When you connect Asana, you authorize Lovable to call Asana on behalf of the account that issued the PAT.

Within your Lovable workspace:

* You can create multiple Asana connections.
* Each connection uses a separate PAT.
* Each connection can:
  * Be tied to a different Asana account
  * Access different Asana workspaces or projects, depending on the PAT's permissions
* Multiple projects within a single workspace can use the same connection.

This makes it easy to separate environments (for example, development and production) or manage multiple Asana accounts.

The connection can only access data that the Asana account behind the PAT can access. If you revoke or rotate the PAT in Asana, the connection stops working until you update the token and reconnect.

## How to connect Asana

Workspace **admins** and **owners** can connect Asana.

### Prerequisites

Before connecting Asana, make sure you have:

* An Asana account
* An Asana personal access token (PAT)
* Lovable workspace admin or owner role

### Set up your Asana connection

**1. Navigate to the Asana connector**

Open **Connectors** and select **Asana**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a name for the connection, for example `Asana (Prod)`.

**4. Add your personal access token**

In **Personal access token**, paste your Asana PAT (for example, `1/xxxxxxxx...`), or click **Get value** to open Asana and generate one.

> [!TIP]
>
> The PAT inherits the permissions of the Asana account that issued it. Make sure that account has access to the workspaces and projects your app needs.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. The connection appears as enabled in **Connectors** → **Asana**.

When connected, your Lovable apps can start using Asana data.

## Limitations

The Asana connector does not support:

* Receiving incoming Asana webhooks or real-time event subscriptions.
* Per-user Asana login where each end user connects their own Asana account.
* Access to Asana data outside the permissions of the account that issued the PAT.

## Manage your Asana connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Asana**, then open the connection.

* **Unlink projects** to remove Asana access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Asana stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
