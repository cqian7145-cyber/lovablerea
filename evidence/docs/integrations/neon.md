# Connect your app to Neon
<!-- source: https://docs.lovable.dev/integrations/neon.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Neon

> Connect your app to Neon, a serverless Postgres platform, to read and write your own Neon database from your Lovable app.

[Neon](https://neon.com/) is a serverless Postgres platform with database branching and compute that scales with your traffic. The Neon connector lets your Lovable app run SQL against your own Neon database through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), so you can build admin pages, dashboards, and forms on the data you already keep in Neon. Use it when your data is already in Neon, or when you want Neon features such as branching. Lovable suggests [built-in backend](https://docs.lovable.dev/features/cloud) only when you have no existing database and do not ask for Neon.

Neon is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Neon, your app can:

* Read rows from your tables with parameterized SQL queries
* Insert, update, and delete rows from server-side code
* Run several statements as one transaction in a single request

The connector reaches only the database named in the connection string. Lovable can also read your table and column names in the project chat before it builds a feature.

## Common use cases and example apps

These examples show what you can build with Neon, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Orders admin page** | *Use Neon and build an admin page that lists the newest orders from my `orders` table with search and pagination.* | **Browse production orders without opening a SQL client.** The app runs a paginated query against your Neon database and renders the rows in a table. |
| **Feedback form** | *Use Neon and build a feedback form that saves name, email, and message into my `feedback` table.* | **Collect submissions straight into your own Postgres table.** The app inserts each submission from server-side code with the form values passed as parameters. |
| **Customer portal** | *Use Neon and build a portal where signed-in customers see their invoices from my `invoices` table.* | **Show each customer their own records.** The app must limit each customer to their own invoices, because every query runs as the same Neon role. |
| **Reporting dashboard** | *Use Neon and build a dashboard with monthly revenue and signups aggregated from my Neon database.* | **Turn tables into charts.** The app runs aggregate queries and renders the totals as charts that refresh on demand. |
| **Inventory manager** | *Use Neon and build an inventory tool where staff adjust stock levels in my `products` table.* | **Update rows from a form and keep an audit trail.** The app writes the stock change and the audit row in one transaction. |
| **Data explorer** | *Use Neon and build a read-only explorer that lists my tables and previews the first rows of each.* | **See what is in the database.** The app reads the table list from the database and previews each table with a row limit. |

## How Neon connections work

A Neon connection is one connection string, and everything Lovable builds on it runs as the role in that string.

* **Connection string**: The string names one branch compute, one database, and one role. Lovable stores it in the connection and sends it to Neon with every query. It does not reach the browser or your app's code.
* **Gateway**: Your app sends SQL to Lovable's connector gateway, which forwards it to Neon with the connection string attached. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for token handling and per-project request limits.
* **Data access**: The connection can do everything that its role can do. The default role that Neon creates with your project is a member of `neon_superuser`, a Neon role with broad administrator rights. Roles that you create in the Neon Console are also members. A connection that uses one of these roles can read and change every table in the database.

> [!TIP]
>
> **Use a dedicated role.** Roles created with SQL start with basic privileges only, so for a read-only app create one and grant it only what the app needs. Run this SQL in the Neon SQL Editor or another Postgres client, not in the project chat. If you run it in the project chat, your password shows in the chat history. Then copy that role's connection string in Step 1 below. If the dialog shows a placeholder instead of the password, type the password you chose into the string. Neon requires a strong password.
>
> ```sql theme={null}
> create role app_reader with login password '<strong password>';
> grant usage on schema public to app_reader;
> grant select on all tables in schema public to app_reader;
> alter default privileges in schema public grant select on tables to app_reader;
> ```

In the project chat, Lovable asks for your approval before it runs each SQL query, including a read-only query. The connector cannot tell a query that reads data from a query that changes data. If you select **Always allow**, Lovable can run all later queries on that connection without asking. This includes queries that change or delete data. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval.

## How to connect Neon

Who can create Neon connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Neon connections using different connection strings, which is useful for separating branches (for example, a production branch and a preview branch) or roles with different permissions. Link production projects only to the connection for your production branch.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Neon, make sure you have:

* A Neon account and a project with at least one database
* The connection string for the branch, database, and role your app should use
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All queries through this connector run on your Neon compute and count toward your Neon plan. Billing and quota are handled directly by Neon, not Lovable.

### Step 1: Get a Neon connection string

The connection string tells Lovable which branch compute, database, and role your app uses, and it contains the role's password.

To copy a connection string:

**1. Open your Neon project**

Sign in to the [Neon Console](https://console.neon.tech/) and open the project you want to connect.

**2. Open the Connect dialog**

Click **Connect**. The **Connect to your branch** dialog opens.

**3. Choose the branch, database, and role**

Select the branch, compute, database, and role your app should use. Leave **Connection pooling** enabled unless you need a direct connection. Both forms work with Lovable.

**4. Copy the connection string**

Copy the plain connection string, which starts with `postgresql://`. Do not copy a framework snippet, a `psql` command, or a `.env` line.

> [!WARNING]
>
> Your connection string contains the role's password, so it functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

See Neon documentation for more: [Connect from any application](https://neon.com/docs/connect/connect-from-any-app).

### Step 2: Connect Neon to Lovable

Lovable stores the connection string in the connection and verifies it before saving.

**1. Open Neon in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Neon**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, paste the connection string you copied from Neon into **Connection string** as a single `postgresql://` URL, without quotes or a prefix. Passwords that Neon generates need no changes. If your password or database name contains characters such as `@`, `#`, `/`, or `?`, percent-encode each one. For example, `@` becomes `%40`. **Get value** next to the field opens Neon's connection guide.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the connection string by running a `select 1` query against your Neon database before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Neon (based on configured connection-level access). Your Lovable apps can then read and write your Neon database through the connector gateway.

## Limitations

The Neon connector cannot:

* Manage your Neon account. The connector runs SQL against the connected database. It does not create or list projects, branches, or computes. Use the Neon Console for that.
* Restrict what a query can do beyond the connected role's own permissions. Everyone who uses the connection queries as that role.
* Support per-end-user Neon login. Each connection represents a single Neon database and role shared across all projects linked to it.
* Send or receive more than 64 MB in one request. Neon sets this limit for each request and each response.

## Troubleshooting

Use these checks when connecting fails or a query returns an unexpected error.

> **Neon returns "password authentication failed"**
>
> Neon returns this message, or *Control plane request failed: endpoint cannot be found*, when the connection string does not match a role and compute in your Neon project. The password is wrong or was reset, the role was dropped, or the branch or compute in the string was deleted. When **Connect** fails, Lovable shows *Neon did not validate your credentials.* Click **Show error** to see Neon's message.
>
> Retrying does not help. Check in the Neon Console that the branch and compute still exist, then copy a fresh connection string. If you set your own password, check its special characters as Step 2 describes. For a new connection, click **Connect** again.
>
> Only the person who created the connection can update it. Open **Connectors**, select **Neon**, open the connection, and under **Configure connection** paste the new connection string and click **Update**. Other workspace members create a connection of their own instead.

> **Neon returns "The endpoint has been disabled"**
>
> The connection string still works, so replacing it does not help. Neon does not serve a disabled compute, and you cannot enable it from the Neon Console. Enable it with the [Neon API](https://api-docs.neon.tech/reference/updateprojectendpoint), as the message says, then retry.

> **A request returned 429 Too Many Requests**
>
> Lovable's connector gateway enforces a [per-project usage limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors) on requests from your app and returns `429` with a `Retry-After` header before the query reaches Neon. Ask Lovable to cache results, combine related statements into one transaction, and read on demand rather than on a frequent fixed timer.

## Manage your Neon connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Neon**, then open the connection.

* **Unlink projects** to remove Neon access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Neon stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
