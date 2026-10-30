# Connect your app to Oracle Autonomous AI Database
<!-- source: https://docs.lovable.dev/integrations/oracle-autonomous.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Oracle Autonomous AI Database

> Connect your Lovable app to Oracle Autonomous AI Database to run SQL queries, explore schemas, and build dashboards and reports on your Oracle data.

[Oracle Autonomous AI Database](https://www.oracle.com/autonomous-database/) is Oracle's fully automated cloud database service. The Oracle Autonomous AI Database connector lets your Lovable app run SQL queries against it through the [REST-Enabled SQL](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.1/orddg/rest-enabled-sql-service.html) endpoint of Oracle REST Data Services (ORDS). It works across the Autonomous workload types that share one engine and endpoint: AI Lakehouse (formerly Autonomous Data Warehouse), Transaction Processing, JSON Database, and APEX Service. Because Oracle Fusion Data Intelligence stores its warehouse in an Autonomous database, this connector also reaches Fusion enterprise resource planning (ERP) and human capital management (HCM) data: connect as the `OAX_USER` database user Oracle supplies, or as a user granted the same read access ([Oracle guide](https://blogs.oracle.com/analytics/fdi-replicating-access-oaxuser-customschema)).

Oracle Autonomous AI Database is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Oracle Autonomous AI Database connected, your app can:

* Run SQL queries over the ORDS REST-Enabled SQL endpoint
* Explore schema and table metadata through the Oracle data dictionary
* Read Oracle Fusion Data Intelligence data through the `OAX_USER` schema
* Paginate large result sets and bind query parameters safely

## Common use cases and example apps

You can use Oracle Autonomous AI Database to build internal reporting tools such as these.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Warehouse analytics dashboard** | *Use Oracle Autonomous AI Database and build a dashboard that shows revenue by product category with a date filter.* | **Turn warehouse tables into live charts.** The app runs aggregate SQL and renders the results as charts. |
| **Order report** | *Use Oracle Autonomous AI Database and build a report of our latest orders with filters for status and date.* | **Publish recurring reports from Oracle queries.** The app runs filtered queries on demand and lays the rows out as a readable report. |
| **Schema explorer** | *Use Oracle Autonomous AI Database and build a tool that lists our tables and shows column names and types.* | **Browse what's in the database.** The app reads the Oracle data dictionary to describe schemas. |
| **Weekly comparison page** | *Use Oracle Autonomous AI Database and build a weekly summary that compares this week's order and revenue totals with last week's.* | **Track changes over time.** The app runs the same aggregates for two date ranges and shows the difference. |
| **Customer usage portal** | *Use Oracle Autonomous AI Database and build a page where each account sees its own monthly usage from our warehouse.* | **Show your customers their own numbers.** The app filters each query by the signed-in customer's account. Every query runs as the same database user, so your app enforces which rows each customer sees. |
| **Fusion metrics view** | *Use Oracle Autonomous AI Database and build a page showing key HR metrics from our Fusion Data Intelligence warehouse.* | **Surface Fusion ERP and HCM data.** The app queries the `OAX_USER` schema, so the connection's database user is `OAX_USER` or one granted the same read access. |

## How Oracle Autonomous AI Database connections work

Each Oracle Autonomous AI Database connection uses one REST-Enabled SQL URL and one database user.

* **ORDS REST-Enabled SQL**: The connector talks to ORDS, which runs on Autonomous Database and serves SQL over HTTPS. It is on by default, so you do not need a wallet or an Oracle client driver. You provide the ORDS URL of your REST-enabled schema, ending in `/ords/<schema>`.
* **Authentication**: Oracle uses HTTP basic auth. Provide the username and password of the database user you want to connect with. Credentials are stored securely in Lovable's gateway and are not exposed to the browser or your app's frontend code.
* **Gateway**: Queries are proxied through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which injects the host and credentials so your app does not send them.
* **Data access**: What you can read or run depends entirely on the privileges of the database user you connect with.

> [!TIP]
>
> **Use a read-only database user.** Create a dedicated user with `SELECT` access to only the tables and views your app needs, then REST-enable its schema. The user's privileges determine what every app using the connection can do, so scoping it down limits what a query can reach.

In the project chat, Lovable asks for your approval before it runs each SQL query, including a read-only query. The connector cannot tell a query that reads data from a query that changes data. If you select **Always allow**, Lovable can run all later queries on that connection without asking. This includes queries that change or delete data. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval.

## How to connect Oracle Autonomous AI Database

Who can create Oracle Autonomous AI Database connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting in Lovable, make sure you have:

* An Oracle Autonomous AI Database instance reachable over the public internet (not a private-endpoint-only instance). If your instance uses an access control list, add Lovable's [IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting) to it.
* A read-only database user with a REST-enabled schema (see Step 1)
* The ORDS URL of that schema, ending in `/ords/<schema>`
* Permission to create connections in your Lovable workspace

### Step 1: Prepare a read-only Oracle user

Rather than connecting as `ADMIN`, create a dedicated read-only user and REST-enable its schema. In the Oracle Cloud Infrastructure (OCI) console, open **Database actions → SQL** on your instance and run the following as `ADMIN`, adjusting the name, password, and grants for your data:

```sql theme={null}
CREATE USER reporting_ro IDENTIFIED BY "<strong-password>";
GRANT CREATE SESSION TO reporting_ro;

-- Grant SELECT on only the tables and views the app needs, for example:
GRANT SELECT ON sales.orders TO reporting_ro;

-- REST-enable the schema so ORDS serves it at /ords/reporting_ro/
BEGIN
  ORDS_ADMIN.ENABLE_SCHEMA(
    p_enabled             => TRUE,
    p_schema              => 'REPORTING_RO',
    p_url_mapping_type    => 'BASE_PATH',
    p_url_mapping_pattern => 'reporting_ro',
    p_auto_rest_auth      => TRUE
  );
  COMMIT;
END;
/
```

Your REST-Enabled SQL URL is the ORDS public access URL of your instance, followed by the schema alias. For example: `https://<db>.adb.<region>.oraclecloudapps.com/ords/reporting_ro`. To find the ORDS URL, open your instance in the OCI console, select **Tool configuration**, and copy the **Public access URL** for **Web Access (ORDS)**.

If you connect as `OAX_USER` for Fusion Data Intelligence, REST-enable the `OAX_USER` schema with the same `ORDS_ADMIN.ENABLE_SCHEMA` block. Set `p_schema` to `'OAX_USER'` and `p_url_mapping_pattern` to `'oax_user'`, and end your URL in `/ords/oax_user`.

### Step 2: Connect in Lovable

The connection form asks for the URL, username, and password from Step 1.

**1. Open Oracle Autonomous AI Database in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Oracle Autonomous AI Database**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, `Oracle Reporting`).

**4. Configure the connection**

Under **Configure connection**, enter:

1. **REST-Enabled SQL URL**: the ORDS URL of your REST-enabled schema, ending in `/ords/<schema>` (for example, `https://abc123.adb.eu-frankfurt-1.oraclecloudapps.com/ords/reporting_ro`). You cannot change this URL after you connect. To use a different URL, create a new connection.
2. **Database username**: the read-only user to authenticate as.
3. **Password**: that user's password.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable checks the URL, username, and password with your database before it saves the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Oracle Autonomous AI Database (based on configured connection-level access). Your Lovable apps can then run SQL queries against your Oracle data and use the results.

## Limitations

Keep these limits in mind when building with Oracle Autonomous AI Database.

* **No per-user data scoping.** Everyone using a connection queries as the same database user. Use a read-only user scoped to the right tables, and restrict who can use the connection.
* **The connector does not enforce read-only access.** Every statement runs with the privileges of the database user, so a query can write if that user can. Database grants are the control that works: connect with a user that has only `CREATE SESSION` and `SELECT` grants.
* **Gateway limits** apply as described in [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors).

## Manage your Oracle Autonomous AI Database connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Oracle Autonomous AI Database**, then open the connection.

* **Unlink projects** to remove Oracle Autonomous AI Database access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Oracle Autonomous AI Database stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Algolia](https://docs.lovable.dev/integrations/algolia.md)
- [Connect your app to Snowflake](https://docs.lovable.dev/integrations/snowflake.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
