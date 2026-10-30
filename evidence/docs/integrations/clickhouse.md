# Connect your app to ClickHouse
<!-- source: https://docs.lovable.dev/integrations/clickhouse.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to ClickHouse

> Connect a ClickHouse database to your Lovable app over the HTTP interface. Run SQL queries, explore schemas, and build analytics features against self-hosted or ClickHouse Cloud databases.

The **ClickHouse** app + chat connector lets your Lovable app **run SQL queries** against your [ClickHouse](https://clickhouse.com/) database over the [HTTP interface](https://clickhouse.com/docs/interfaces/http). It works with both **self-hosted ClickHouse** and **ClickHouse Cloud**.

ClickHouse is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With ClickHouse connected, your app can:

* Run **SQL queries** over the ClickHouse HTTP interface
* Explore **schema and table metadata** via system tables
* Paginate large result sets with **`LIMIT`** and **`OFFSET`**
* Enforce **per-query time limits** to keep requests bounded

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Real-time analytics dashboard** | *Build a dashboard that shows event counts and trends from my ClickHouse `events` table, refreshed every minute.* | **Turn high-volume event data into live charts.** The app runs SQL against ClickHouse and renders metrics that stay current. |
| **Log explorer** | *Build a tool to search and filter our application logs stored in ClickHouse by service, level, and time range.* | **Self-serve search over large log tables.** The app submits filtered queries and returns results without console access. |
| **Schema explorer** | *Build a tool that lists databases and tables and shows column types and row counts.* | **Browse what's in the database.** The app reads system tables to describe schemas. |
| **Usage metering view** | *Show per-customer usage aggregated from our ClickHouse `usage` table, with date filters.* | **Surface aggregates from curated tables.** The app queries summary tables your pipelines maintain. |

Exact behavior depends on **your tables**, the **permissions of the ClickHouse user** you connect with, and **what you ask Lovable to build**.

## How ClickHouse connections work

* **HTTP interface**: The connector talks to the [ClickHouse HTTP interface](https://clickhouse.com/docs/interfaces/http) over HTTPS. You provide the full HTTPS URL of the interface, including the port (for example `https://abc123.eu-central-1.aws.clickhouse.cloud:8443`).
* **Authentication**: ClickHouse uses HTTP basic auth. Provide the username and password of the database user you want to connect with. Credentials are stored securely in Lovable's gateway and are never exposed to the browser or your app's frontend code.
* **Gateway**: Queries are proxied through Lovable's **connector gateway**, which injects the host and credentials so your app never sends them. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for token handling and per-project request limits.
* **Data access**: What you can read or run depends entirely on the permissions of the ClickHouse user you connect with.

> [!TIP]
>
> **Use a read-only ClickHouse user.** Create a dedicated user with read-only access to only the databases and tables your app needs. The user's permissions determine what every app using the connection can query, so scoping it down limits what a query can reach.

## How to connect ClickHouse

Who can connect ClickHouse depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) for details.

### Prerequisites

Before connecting in Lovable, make sure you have:

* A **ClickHouse database** (self-hosted or ClickHouse Cloud) with the HTTP interface reachable over HTTPS
* The **HTTPS URL** of your HTTP interface, including the port
* A **ClickHouse user** (a read-only user is recommended) with access to the data your app needs
* Permission to create connections in your Lovable workspace

### Set up your ClickHouse connection

**1. Navigate to ClickHouse connector**

Open **Connectors** and select **ClickHouse**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `ClickHouse Production` or `ClickHouse read-only`).

**4. Enter your connection details**

* **HTTP Interface URL**: the full HTTPS URL of your ClickHouse HTTP interface, including the port (e.g. `https://abc123.eu-central-1.aws.clickhouse.cloud:8443`).
* **Username**: the ClickHouse user for HTTP basic authentication.
* **Password**: that user's password.

To connect **without authentication**, leave both **Username** and **Password** empty. No auth header is sent and ClickHouse uses its `default` user. See the [HTTP interface docs](https://clickhouse.com/docs/interfaces/http) for details.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the connection through the gateway with a `SELECT 1` query.

When connected, you can link the connection to projects and start building apps that query your ClickHouse data.

## Limitations

* **No per-user data scoping.** Everyone using a connection queries with the same ClickHouse user. Use a read-only user scoped to the right databases, and restrict who can use the connection.
* **Queries are synchronous.** There is no polling or server-side cursor. Paginate with SQL `LIMIT` / `OFFSET`, and raise the per-query time limit for long queries.
* **No default database.** Qualify table names with the database (e.g. `mydb.users`).
* **Gateway limits** apply as described in [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors).

## Manage your ClickHouse connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **ClickHouse**, then open the connection.

* **Unlink projects** to remove ClickHouse access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use ClickHouse stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Asana](https://docs.lovable.dev/integrations/asana.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Airtable](https://docs.lovable.dev/integrations/airtable.md)
- [Connect your app to Cube](https://docs.lovable.dev/integrations/cube.md)
