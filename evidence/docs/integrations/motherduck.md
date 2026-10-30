# Connect your app to MotherDuck
<!-- source: https://docs.lovable.dev/integrations/motherduck.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to MotherDuck

> Connect your app to MotherDuck, the cloud service for DuckDB, to query your data with SQL and build dashboards and reports in your Lovable app.

[MotherDuck](https://motherduck.com/) is the cloud service for DuckDB, an analytical SQL database. It hosts your DuckDB databases and shares, and runs DuckDB SQL over them. A share is a read-only database that another MotherDuck user shares with you. You can load data into MotherDuck from files such as Parquet, CSV, and JSON. The MotherDuck connector lets your Lovable app run SQL against those databases, browse their tables and columns, and turn the results into dashboards, reports, and data tools. It's designed for apps that sit on top of data you already keep in MotherDuck.

MotherDuck is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With MotherDuck, your app can:

* Run DuckDB SQL queries against your MotherDuck databases and attached shares
* List databases, tables, views, and columns so Lovable builds against real schema names
* Search your catalog for tables and columns by keyword
* Build dashboards and reports that aggregate data in SQL
* Insert or update rows when you explicitly ask for it and your token allows writes

Unless you ask Lovable to change data, it tells MotherDuck to run each query as read-only. MotherDuck then rejects a query that would change your data.

In the project chat, Lovable asks for your approval before it runs a SQL query, including a read-only query. It does not ask before it lists databases, tables, or columns. Your **Agent approval for this connection** setting applies to you and that connection and controls whether Lovable keeps asking. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval, so Lovable puts features that change data behind your app's sign-in.

## Common use cases and example apps

These examples show what you can build with MotherDuck, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Revenue dashboard** | *Use MotherDuck and build a dashboard of monthly revenue and order counts from our orders table.* | **See revenue trends without exporting a CSV.** The app aggregates the orders table in SQL and renders the monthly series as charts. |
| **Table browser** | *Use MotherDuck and build a page that lists the tables in my database and previews the first rows of each.* | **Explore a database without opening a SQL client.** The app lists databases, tables, and columns, then runs a bounded preview query for the table you pick. |
| **Customer 360 view** | *Use MotherDuck and build a customer lookup that shows a customer's orders, spend, and last activity.* | **Bring one customer's history into a single screen.** The app runs a filtered query per customer and shows the results in cards and a table. |
| **Parquet lake explorer** | *Use MotherDuck and build an explorer over the Parquet files we load into MotherDuck, with filters by date and region.* | **Query lake files like tables.** The app runs DuckDB SQL over the loaded data and applies the filters as query predicates. |
| **Data quality monitor** | *Use MotherDuck and build an internal tool that runs our null-rate and duplicate checks nightly and flags failures.* | **Catch bad data before your team does.** The app runs validation queries on a schedule, stores the results, and highlights checks that fail. |
| **Shared dataset viewer** | *Use MotherDuck and build a read-only viewer over the sample\_data share with a search box.* | **Publish a slice of a shared database.** The app queries an attached share and returns matching rows for the search term. |

## How to connect MotherDuck

Who can create MotherDuck connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple MotherDuck connections using different access tokens, which is useful for separating environments (for example, a Read Scaling token for a published dashboard and a Read/Write token for an admin tool).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting MotherDuck, make sure you have:

* A MotherDuck account with at least one database or attached share
* A MotherDuck access token
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All queries through this connector run on your MotherDuck account and count toward your MotherDuck plan and compute usage. Billing is handled directly by MotherDuck, not Lovable.

### Step 1: Get a MotherDuck access token

A MotherDuck access token lets your Lovable app authenticate with MotherDuck. MotherDuck offers two token types, and the type decides what the connection can do:

* A **Read/Write** token can read and, when you explicitly ask for it, change data and schema.
* A **Read Scaling** token connects to read replicas that reject every write. Choose it for dashboards and other read-only apps. Data from a Read Scaling token can be a few minutes behind the latest changes. The token can query only the databases and shares that you attached with a Read/Write token first.

To create a MotherDuck access token:

**1. Open your MotherDuck account**

Sign in to [MotherDuck](https://app.motherduck.com/).

**2. Open Access Tokens**

Click your organization name, then **Settings**, and open **Access Tokens**.

**3. Create a token**

Click **Create token**. Give it a descriptive name, for example `Lovable integration`, choose **Read/Write** or **Read Scaling**, and decide whether the token expires.

**4. Copy the token**

Copy the token and store it securely. MotherDuck shows it only once.

> [!WARNING]
>
> Your access token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See MotherDuck documentation for more: [Authenticating to MotherDuck](https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/authenticating-to-motherduck/) and [Read scaling](https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/read-scaling/).

### Step 2: Connect MotherDuck to Lovable

Open the connection form and enter the token from Step 1.

**1. Open MotherDuck in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **MotherDuck**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **MotherDuck access token**: paste the token you copied. **Get value** next to the field opens MotherDuck's token documentation.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone you add can query all the databases and shares that the token's MotherDuck user can read.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against MotherDuck by listing your databases before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to MotherDuck (based on configured connection-level access). Your Lovable apps can then query your MotherDuck databases and shares through the connection.

## Working with query results

MotherDuck returns at most 2,000 rows or 50 KB of output per query and stops a query after 55 seconds. If a query would return more than 2,000 rows or 50 KB, the code Lovable writes for your app stops with an error instead of showing incomplete data. Lovable adds a row limit to the queries it writes and aggregates in SQL where it can. When you ask for a page that shows many rows, ask Lovable to paginate or filter rather than load a whole table.

Each query uses MotherDuck compute. If your app reads the same data on a schedule or on every page view, tell Lovable how fresh the data must be. Lovable can then cache the results for that time.

## Limitations

The MotherDuck connector cannot:

* Query a DuckDB database file on your computer or your own server. Only databases and shares hosted in MotherDuck are reachable. Load the file into MotherDuck first.
* Write to a share attached from another account. Shares are read-only.
* Support per-end-user MotherDuck login. Each connection represents a single MotherDuck account shared across all projects linked to it.

To replace the token, for example after it expires or after you revoke it in MotherDuck, create a new token, open the connection in Lovable, and click **Update** under **Configure connection**.

## Manage your MotherDuck connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **MotherDuck**, then open the connection.

* **Unlink projects** to remove MotherDuck access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use MotherDuck stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
