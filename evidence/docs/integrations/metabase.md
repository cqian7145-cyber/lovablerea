# Connect your app to Metabase
<!-- source: https://docs.lovable.dev/integrations/metabase.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Metabase

> Connect your app to Metabase to run your team's saved questions and custom queries and show the results in your Lovable app.

[Metabase](https://www.metabase.com/) is an open-source business intelligence tool for exploring data and sharing questions and dashboards. The Metabase connector lets your Lovable app run saved questions (the queries and charts your team saves in Metabase), browse the databases connected to Metabase, and run custom queries. It works with Metabase Cloud and with self-hosted instances reachable on the public internet.

Metabase is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Metabase, your app can:

* Run saved questions and show their results, so your app stays consistent with the definitions your team maintains in Metabase
* Browse the databases, tables, and fields connected to Metabase
* Run custom SQL queries against a connected database
* Search questions, dashboards, and tables across the instance

Use Metabase when your app needs the questions and data your team already curates in Metabase, instead of connecting to each database separately.

## Common use cases and example apps

These examples show what you can build with Metabase, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Metrics dashboard** | *Use Metabase and build a dashboard that shows our monthly revenue and order volume.* | **Show the numbers your team already trusts.** The app runs the matching saved questions and renders the results as charts and tiles. |
| **Saved question browser** | *Use Metabase and build an internal app that lists our saved questions and lets people run them.* | **Give the whole team self-serve access to curated questions.** The app lists questions from your Metabase and runs the one a user picks. |
| **Sales report portal** | *Use Metabase and build a portal where account managers see revenue by region and product category.* | **Turn a Metabase report into a focused internal tool.** The app queries the underlying data and presents it for one audience. |
| **Data explorer** | *Use Metabase and build an explorer that lists our databases and tables and previews their contents.* | **Browse the data Metabase already catalogs.** The app reads Metabase's database metadata and runs preview queries. |
| **Anomaly monitor** | *Use Metabase and build a page that highlights days where signups dropped more than 20% week over week.* | **Watch a metric without opening Metabase.** The app runs the query when someone opens the page and marks the days with a large drop. |
| **Executive summary** | *Use Metabase and build a one-page summary that pulls five key metrics from our saved questions.* | **Summarize several questions in one view.** The app runs each saved question and lays the results out as a single overview. |

## How to connect Metabase

Who can create Metabase connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Metabase connections using different instances or API keys, which is useful for separating environments or giving different projects different levels of access.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Metabase, make sure you have:

* A Metabase instance on version 50 or later, on Metabase Cloud or self-hosted, reachable over HTTPS on the public internet
* Admin access to that instance, or an admin who can create an API key for you
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Your Metabase plan and the compute your queries use on connected databases are separate from Lovable billing.

### Step 1: Create a Metabase API key

The connector authenticates with a Metabase API key. The key gets the permissions of the group you assign it to and of the **All Users** group.

> [!WARNING]
>
> The connector does not enforce read-only access. If the key's group allows it, a connection can change saved questions and dashboards. If Metabase connects to your database with a user that can write, SQL queries can also write data. Give the key's group only the access your app needs, and connect Metabase to your database with a read-only database user.

To create a Metabase API key:

**1. Open your Metabase admin settings**

Sign in to your Metabase instance as an admin. Click the grid icon in the upper right and select **Admin**. In Metabase versions before 59, click the gear icon and select **Admin settings**.

**2. Create a group with limited access (recommended)**

Under **People → Groups**, click **Add a group**. Name it, for example, `Lovable integration`. Then open **Permissions**. Give the group only the access your app needs:

* **Collections**: **View** for the collections that hold the saved questions your app runs.
* **Data**: **Create queries** set to **Query builder only** for the databases your app queries. Select **Query builder and native** only if your app must run SQL.

Every API key is also in the **All Users** group and gets its access. Check what **All Users** can see before you continue. Do not assign the key to the **Administrators** group. A key in that group has full admin access to your Metabase.

**3. Create the key**

Go to **Settings → Authentication**. Under **API Keys**, click **Manage**, then click **Create API Key**. Enter a **Key name**, for example `Lovable`, select the group you created under **Group**, and click **Create**.

**4. Copy the key**

Copy the key, which starts with `mb_`. Metabase shows it only once.

> [!WARNING]
>
> The API key functions like a password. Store it securely. Paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

See Metabase documentation for more: [API keys](https://www.metabase.com/docs/latest/people-and-groups/api-keys).

### Step 2: Connect Metabase to Lovable

Open the connection form and enter the values from Step 1.

**1. Open Metabase in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Metabase**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **Metabase URL**: the HTTPS URL of your Metabase instance, for example `https://yourcompany.metabaseapp.com`. If your self-hosted instance is served under a path prefix, include it, for example `https://analytics.example.com/metabase`.
2. **API key**: the key from Step 1, starting with `mb_`.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace. Everyone with access queries Metabase with the same API key and its group's permissions.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the API key against your Metabase instance before saving the connection.

A successful connection does not confirm data access. After you link the connection to a project, ask Lovable to run one of your saved questions. If the question returns no data, ask your Metabase admin to check the group's permissions.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Metabase (based on configured connection-level access). Your Lovable apps can then run your saved questions and query your data through Metabase.

In the project chat, Lovable asks for your approval before it runs each saved question or query, including a read-only query. Lovable lists databases and searches Metabase without asking. If you select **Always allow**, Lovable can run all later requests on that connection without asking. This includes requests that change saved questions, dashboards, or data. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval.

If the API key changes, open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Limitations

The Metabase connector cannot:

* Embed Metabase dashboards or charts in your app. The app runs questions and queries and renders the results with its own components.
* Reach instances on a private network. Your Metabase URL must be reachable over HTTPS on the public internet.
* Support per-end-user Metabase login. Each connection represents a single API key shared across all projects linked to it.

## Manage your Metabase connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Metabase**, then open the connection.

* **Unlink projects** to remove Metabase access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Metabase stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
