# Connect your app to Databricks
<!-- source: https://docs.lovable.dev/integrations/databricks.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Databricks

> Connect your app to Databricks to query warehouse data, build live dashboards, and power data-driven tools using your existing tables and views. Connect with a service principal or sign in with your own Databricks account.

[Databricks](https://www.databricks.com/) is a data intelligence platform that lets your Lovable app work with warehouse data, SQL queries, and cluster resources. The Databricks connector lets you build apps and dashboards on top of your existing Databricks data without exporting CSVs or waiting for engineering tickets.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Databricks connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Databricks account and work with their own data |

With Databricks, your app can:

* Run SQL queries against your warehouse data
* List and manage SQL warehouses
* List clusters in your Databricks workspace
* Build live dashboards that query data in real time

Authentication uses either a Databricks service principal or your own Databricks account (**User OAuth**). With either method, credentials and tokens are stored in Lovable's gateway and do not reach the browser or your app's frontend code.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Live KPI dashboard** | *Build a dashboard that queries our Databricks warehouse and shows MRR, DAU, and churn rate. Auto-refresh every 5 minutes.* | **Replace static slides with a live dashboard on your warehouse data.** The app queries Databricks directly and displays key metrics that stay up to date without manual exports. |
| **Revenue pipeline tracker** | *Build a pipeline tracker that pulls revenue and deal data from our Databricks tables and shows a funnel view with filters by region and quarter.* | **Give RevOps a self-serve view of pipeline data that lives in the warehouse.** The app queries Databricks tables where your CRM data lands and presents it in a structured, filterable view. |
| **Team metrics explorer** | *Build a metrics explorer where users pick a team and date range, then see charts for their key metrics pulled from Databricks.* | **Let teams explore their own metrics without filing data requests.** The app runs parameterized SQL queries and renders results as charts, scoped to each team's data. |
| **Data quality monitor** | *Build an internal tool that runs data quality checks against our warehouse tables and flags anomalies.* | **Catch data issues before they reach downstream consumers.** The app runs validation queries on a schedule and surfaces failures in a clean internal view. |
| **Executive summary bot** | *Build a Slack bot that answers natural language data questions by querying our Databricks warehouse.* | **Turn your warehouse into a conversational interface for leadership.** The app translates questions into SQL, queries Databricks, and posts formatted answers to Slack. |

## How Databricks connections work

A Databricks connection authenticates in one of two ways. You pick the method when you create the connection.

| Method | Option in the connection form | Queries run as | Best for |
| - | - | - | - |
| **Service principal** (machine-to-machine OAuth, the default) | **Use your own credentials** | A service principal your Databricks admin creates | Team-shared connections and production apps, where access should not depend on any one person |
| **User OAuth** (user-to-machine OAuth) | **User OAuth** | The Databricks user who signed in to authorize the connection | Individuals and prototypes, and teams that want Unity Catalog to enforce a person's own permissions and Databricks audit logs to show who ran each query |

### What this means for data access

Lovable does not filter results based on the individual Lovable user's Databricks permissions. The identity the connection authenticates as decides what data is available to everyone who uses that connection.

* With a **service principal**, the service principal's Unity Catalog grants apply. If you create a service principal with access to HR tables, everyone with access to that connection in Lovable can query HR data.
* With **User OAuth**, your own Unity Catalog grants apply, and Databricks audit logs attribute every query to you. If you share the connection, everyone you share it with queries as you and sees everything you can see.

**Recommended approach for shared connections: one service principal per access role.** Create separate service principals scoped to different data:

* `databricks-engineering`: full warehouse access, only engineers get this connection in Lovable
* `databricks-sales`: pipeline and revenue tables only, sales team gets this connection
* `databricks-company`: company-wide safe metrics, everyone gets this connection

Lovable controls who can use each connection. Databricks controls what each identity can query. Together, they provide role-based data access without requiring per-user OAuth.

> [!NOTE]
>
> You can create multiple Databricks connections in a workspace, each with a different service principal or user and different access settings.

> [!WARNING]
>
> The connector does not enforce read-only access. It applies no method or path allowlist, so every Databricks REST path and verb is forwarded, and a connection runs whatever SQL its identity, the service principal or the user who authorized it, is allowed to run. Unity Catalog grants are the way to control access. See [Restrict a connection to read-only](#restrict-a-connection-to-read-only).

Databricks uses Lovable's gateway architecture for secure OAuth handling and automatic token refresh. A service principal connection exchanges the client ID and secret for short-lived access tokens. A User OAuth connection requests the `all-apis` and `offline_access` scopes, so the gateway holds a refresh token and renews the one-hour access token in the background without asking you to sign in again. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!NOTE]
>
> Databricks **compute and storage** costs are billed by **Databricks**, not by Lovable.

## How to connect Databricks

Who can create Databricks connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

### Network access

Lovable's gateway needs network access to your Databricks workspace, whichever method you use. If the workspace restricts inbound traffic, resolve this before you start.

> [!WARNING]
>
> Databricks [IP access lists](https://docs.databricks.com/aws/en/security/network/front-end/ip-access-list) apply to the workspace REST API, not just the web UI, so an unlisted source IP is rejected before authentication and the connection never verifies. Add Lovable's gateway egress ranges to an `ALLOW` list, from [IP allowlisting](https://docs.lovable.dev/integrations/security.md#ip-allowlisting). Workspace IP access lists are configured through the Databricks REST API rather than the admin UI, and account-level [context-based ingress controls](https://docs.databricks.com/aws/en/security/network/front-end/context-based-ingress) are enforced alongside them, so a request has to pass both.
>
> If the workspace uses front-end [Private Link](https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect) with public network access disabled, the connector cannot reach it at all, and allowlisting is not a workaround: Databricks does not support IP access lists on a workspace with public access disabled. On AWS, `public_access_enabled` defaults to `False` in a private access settings object, so confirm this before you start.

### Choose how to connect

Both methods create the same kind of connection. The difference is whose identity the connection carries, which decides what data it can reach and who is responsible for keeping it working.

* **Use your own credentials** connects with a service principal, a shared identity your Databricks admin creates. It is selected by default. Everyone who uses the connection queries as the service principal, so the connection keeps working when people leave the team, and you scope data by giving each access role its own service principal. Choose it for shared connections and production apps.
* **User OAuth** signs in with your own Databricks account. Queries run on your behalf, Unity Catalog enforces your permissions, and Databricks audit logs show you rather than a shared service principal. It needs a custom OAuth application in your Databricks account console, and the connection depends on your account staying active (see [Limitations](#limitations)). Choose it when you want to build on your own access without asking an admin for a service principal, or when per-person attribution matters.

Follow the setup steps below for the method you chose.

**Use your own credentials**

Connect with a service principal that your Databricks admin creates. In the connection form, this option is labeled **Use your own credentials** and is selected by default.

**Prerequisites**

Before connecting, make sure you have:

* A Databricks workspace with at least one SQL warehouse
* A service principal configured in Databricks with an OAuth secret (see [Databricks M2M OAuth setup](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m))
* The service principal's client ID and client secret
* Your Databricks workspace URL (for example, `https://dbc-abc123.cloud.databricks.com`)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

**Step 1: Configure a service principal in Databricks**

If you haven't already set up a service principal with an OAuth secret, follow these steps in Databricks. For the full reference, see [Databricks M2M OAuth setup](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m).

> [!NOTE]
>
> You need to be a **Databricks account admin or workspace admin** to create a service principal and generate OAuth secrets. If you don't have this role, ask your Databricks administrator to complete this step.

**1. Create a service principal**

In the Databricks account console, go to **User management** → **Service principals** and create a new service principal. The account console host depends on which cloud hosts your workspace:

* AWS: [accounts.cloud.databricks.com](https://accounts.cloud.databricks.com)
* Azure: [accounts.azuredatabricks.net](https://accounts.azuredatabricks.net)
* GCP: [accounts.gcp.databricks.com](https://accounts.gcp.databricks.com)

> [!NOTE]
>
> Azure works differently. Its account console covers users, groups, and Unity Catalog metastores, but you create workspaces in the Azure portal, and nobody can open the account console until your organization establishes its first account admin. Azure also offers two kinds of service principal, Azure Databricks managed and Microsoft Entra ID managed. Databricks recommends the Azure Databricks managed kind for automations like this connector. Azure Databricks documentation lives on [Microsoft Learn](https://learn.microsoft.com/en-us/azure/databricks/) rather than on `docs.databricks.com`, so translate the links on this page when you are on Azure.

**2. Assign it to your workspace**

Still in the account console, go to **Workspaces**, select your target workspace, open its **Permissions** tab, and click **Add permissions**. Select the service principal and give it the **Workspace access** and **Databricks SQL access** entitlements. You can review and change entitlements later on the service principal's **Configuration** tab.

> [!WARNING]
>
> The service principal's own **Permissions** tab does something different. It assigns the **Service principal: Manager** and **Service principal: User** roles to other people, deciding who may manage the service principal. It grants no data access at all. Data access comes from the next two steps.

**3. Grant it access to a SQL warehouse**

In your Databricks workspace, click **SQL Warehouses** in the sidebar, open the kebab menu on the row for the warehouse your app will query, click **Permissions**, then add the service principal with **Can use**. **Can use** lets it start the warehouse and run queries.

**4. Generate an OAuth secret**

* In your Databricks workspace, select your username in the top-right corner and choose **Settings**.
* Go to **Identity and access**, then find **Service principals** and click **Manage**.
* Select your service principal and open the **Secrets** tab.
* Click **Generate secret**, choose an expiry period (maximum 730 days), and click **Generate**.
* **Copy both the Client ID and Client secret immediately.** The secret is only shown once. It cannot be retrieved after you close this dialog.

> [!WARNING]
>
> Store your client ID and client secret somewhere secure (for example, in a password manager) before continuing. You will need both values in Step 2, and the client secret cannot be retrieved from Databricks again.

**5. Grant it access to your data**

Grant Unity Catalog privileges on the data your app reads. Name the principal with its **Application ID** (the same value as the OAuth client ID from the previous step), in backticks, not its display name:

```sql theme={null}
GRANT USE CATALOG ON CATALOG main TO `<application-id>`;
GRANT USE SCHEMA ON SCHEMA main.analytics TO `<application-id>`;
GRANT SELECT ON TABLE main.analytics.orders TO `<application-id>`;
```

All three grants are required. `SELECT` on a table does nothing without `USE CATALOG` on its catalog and `USE SCHEMA` on its schema. Only a catalog owner, or someone with `MANAGE` on the catalog, can grant `USE CATALOG`, so you may need to ask them. For the full least-privilege setup, see [Restrict a connection to read-only](#restrict-a-connection-to-read-only).

**6. Find your Workspace URL**

Your Workspace URL appears in the browser address bar when you are signed in to Databricks. Databricks calls its host the instance name, and the format depends on your cloud:

* AWS: `https://dbc-a1b2345c-d6e7.cloud.databricks.com`
* Azure: `https://adb-5555555555555555.19.azuredatabricks.net`. You can also select the workspace resource in the Azure portal and read its **URL** field.
* GCP: `https://8757561887652360.0.gcp.databricks.com`

See [Get identifiers for workspace objects](https://docs.databricks.com/aws/en/workspace/workspace-details).

**Step 2: Set up the Databricks connection in Lovable**

Set up the Databricks connection in Lovable.

**1. Navigate to Databricks connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Databricks**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Databricks Engineering` or `Databricks Sales`). Use a name that reflects the access level of the service principal.

**4. Keep Use your own credentials selected**

Under **Configure connection**, leave **Use your own credentials** selected. It is the default.

**5. Enter your credentials**

Use the values from **Step 1: Configure a service principal in Databricks**:

* **Workspace URL**: your Databricks workspace URL (for example, `https://dbc-abc123.cloud.databricks.com`)
* **Client ID**: the service principal's OAuth client ID
* **Client Secret**: the service principal's OAuth client secret

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

This matters more on Databricks than on most connectors, because the service principal's grants decide what data is visible. Anyone you add here can query everything the service principal can reach. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials against your Databricks workspace.

**Connect with your Databricks account**

Sign in with your own Databricks account. Queries run as you, so what the connection can read is exactly what you can read. In the connection form, this option is labeled **User OAuth**.

**Prerequisites**

Before connecting, make sure you have:

* A Databricks workspace with at least one SQL warehouse, and **Can use** on the warehouse your app will query
* Unity Catalog access to the data your app reads, since the connection has the same access as your account
* A **custom OAuth application** registered in your Databricks account console with Lovable's redirect URI, and its client ID and client secret (see [Enable custom OAuth applications](https://docs.databricks.com/aws/en/integrations/enable-disable-oauth)). Step 1 below covers this
* Your Databricks workspace URL (for example, `https://dbc-abc123.cloud.databricks.com`)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

**Step 1: Register a custom OAuth application in Databricks**

Lovable signs you in through an OAuth application that lives in your own Databricks account, so Databricks has to know Lovable's redirect URI before the sign-in can complete. Creating the application requires a **Databricks account admin**, so ask your administrator if you don't have that role. One application can serve every User OAuth connection in your Lovable workspace.

**1. Open App connections in the account console**

Sign in to the Databricks account console as an account admin, click **Settings** in the sidebar, open the **App connections** tab, and click **Add connection**. The account console host depends on which cloud hosts your workspace:

* AWS: [accounts.cloud.databricks.com](https://accounts.cloud.databricks.com)
* Azure: [accounts.azuredatabricks.net](https://accounts.azuredatabricks.net)
* GCP: [accounts.gcp.databricks.com](https://accounts.gcp.databricks.com)

**2. Name the application and add Lovable's redirect URI**

In **Application name**, enter a name that identifies Lovable (for example, `Lovable`). Under **Redirect URLs**, add:

```text theme={null}
https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
```

The Lovable connection form shows the same value under **Redirect URI** with a copy button once you select **User OAuth**, so you can copy it from there. It must match exactly.

**3. Select the All APIs scope**

Under **Access scopes**, select **All APIs**, not **SQL**. Lovable requests the `all-apis` scope when you sign in, because the connector lists warehouses and clusters as well as running SQL. Lovable also requests `offline_access`, which is what lets it refresh your token in the background.

**4. Review the token lifetimes**

**Access token TTL** defaults to 60 minutes and **Refresh token TTL** to 10080 minutes (7 days). Lovable renews the access token automatically for as long as the refresh token is valid. When the refresh token expires, the connection stops working until you reconnect it in Lovable, so raise the refresh token TTL if your security policy allows it and you want fewer reconnects.

**5. Generate a client secret and save the values**

Check **Generate a client secret** and create the connection. Databricks shows the **Client ID** and **Client secret** in a **Connection created** dialog. **Copy both immediately.** The secret is only shown once and cannot be retrieved later.

You can leave the checkbox unchecked to create an application without a secret (Databricks calls this a public client). Then leave **Client Secret** empty in Lovable as well. An application with a secret is the stronger setup, so use one unless you have a reason not to.

**6. Check your own Databricks access**

Make sure your account has **Can use** on the SQL warehouse your app will query (**SQL Warehouses → (your warehouse) → kebab menu → Permissions**) and the Unity Catalog privileges on the data: `USE CATALOG` on the catalog, `USE SCHEMA` on the schema, and `SELECT` on the tables or schema. All three are required, and the connection inherits exactly these grants.

**7. Find your Workspace URL**

Your Workspace URL appears in the browser address bar when you are signed in to Databricks, for example `https://dbc-a1b2345c-d6e7.cloud.databricks.com` on AWS, `https://adb-5555555555555555.19.azuredatabricks.net` on Azure, or `https://8757561887652360.0.gcp.databricks.com` on GCP. See [Get identifiers for workspace objects](https://docs.databricks.com/aws/en/workspace/workspace-details).

**Step 2: Set up the Databricks connection in Lovable**

**1. Navigate to Databricks connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Databricks**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection. Because the connection acts as you, a name that includes your own name (for example, `Databricks (Jane)`) makes it clear to teammates whose access it carries.

**4. Select User OAuth**

Under **Configure connection**, select **User OAuth**. The form shows the **Redirect URI** to add to your Databricks OAuth app. If you skipped that in Step 1, copy it and add it to the app now.

**5. Enter your OAuth app details**

Use the values from **Step 1: Register a custom OAuth application in Databricks**:

* **Workspace URL**: your Databricks workspace URL (for example, `https://dbc-abc123.cloud.databricks.com`)
* **Client ID**: the OAuth client ID of your custom OAuth application
* **Client Secret**: the application's client secret. Leave it empty only if you created a public client without a secret

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

> [!WARNING]
>
> Anyone you share a User OAuth connection with queries Databricks as you, with your Unity Catalog grants, and Databricks audit logs attribute their queries to you. Keep the connection private, or share it only with people who may see everything you can see. For a connection a whole team uses, create a service principal connection instead.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect and sign in**

Click **Connect** at the bottom of the form. A new window opens for the Databricks sign-in. If your browser blocks it, Lovable redirects you instead. Sign in with your Databricks account and approve the requested access.

> [!NOTE]
>
> That approval only means Databricks issued tokens to your OAuth application. Lovable does not test the connection at this point. A connection still reports success when your account lacks **Can use** on the warehouse or the Unity Catalog grants. Confirm the connection with a real query after you [link it to a project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project).

When connected, you can link the connection to the projects where you want to use it, and start building apps that query your Databricks data.

## Restrict a connection to read-only

The connector forwards whatever your app sends. It applies no method or path allowlist, so any Databricks REST path and any HTTP verb reaches your workspace, including a `POST` to `/api/2.0/sql/statements` carrying `DROP TABLE`. Unity Catalog privileges are the control that works: grant the connection's identity `SELECT` and nothing more.

> [!NOTE]
>
> These steps are written for a service principal connection. A User OAuth connection runs with your own grants, so there is nothing separate to lock down: the connection has exactly your grants. If you want an app built on it to stay read-only, either narrow your own grants or, better, give the app a service principal connection with the grants below.

**1. Grant read-only privileges in Unity Catalog**

Run these as a catalog owner, or as someone with `MANAGE` on the catalog. Name the principal with its **Application ID** in backticks, not its display name:

```sql theme={null}
GRANT USE CATALOG ON CATALOG main TO `<application-id>`;
GRANT USE SCHEMA ON SCHEMA main.analytics TO `<application-id>`;
GRANT SELECT ON SCHEMA main.analytics TO `<application-id>`;
```

`GRANT SELECT ON SCHEMA` covers every current and future table and view in the schema. Grant `SELECT ON TABLE main.analytics.orders` instead when you want to name individual tables. Repeat the statements for each schema your app reads.

> [!WARNING]
>
> Never grant `MODIFY`, `CREATE TABLE`, or `ALL PRIVILEGES` to a service principal you want to stay read-only, and check what it already inherits from a group or a parent catalog with ``SHOW GRANTS `<application-id>` ON CATALOG main;``. Privileges granted higher up cascade down, so a `MODIFY` on the catalog defeats a careful set of table grants.

**2. Give it a dedicated warehouse**

Grant **Can use** on one warehouse reserved for this connection rather than your shared analytics warehouse. Query volume comes from your app's end users, so it is unpredictable and outside your control: a dedicated warehouse isolates that load, makes the app's spend its own line item, and lets you size and time-limit it independently. Set a small **Cluster Size** and a short **Auto stop**.

Leave **Can manage** off. **Can use** is enough to start the warehouse and run queries, and it does not allow resizing or deleting it.

**3. Keep one service principal per access role**

Grants attach to the service principal, so a connection can only ever be as narrow as its principal. If one team needs write access, give that team a second service principal and a second Lovable connection instead of widening the read-only one.

## Building a semantic layer

Every Databricks use case benefits from a semantic layer: a shared definition of what your key metrics mean, which tables to use, and what assumptions they carry. What counts as a "daily active user"? How is MRR calculated? Which view should be used for churn, and does it exclude trials?

Without this shared context, each app or dashboard risks computing the same metric differently.

### If you already have a semantic layer

If your Databricks workspace already has a semantic layer (for example, dbt metrics, Unity Catalog tags, or a YAML definitions file), point Lovable to it:

```text wrap theme={null}
Use our semantic layer at catalog.schema.metrics_definitions when computing any KPIs. MRR is defined there as monthly_recurring_revenue.
```

### If you don't have one yet

You can build a semantic layer quickly in Lovable using a dedicated project. Create a new project, connect it to Databricks, and ask the agent to explore your warehouse and draft definitions:

```text wrap theme={null}
Let's build a full semantic layer for our Databricks warehouse. Please start by exploring the tables and forming your own understanding of the data. Create a sample dashboard that showcases your analysis of the key metrics, the tables they use, and the assumptions behind each query. We will walk through them together and correct anything that is wrong. Use these tables as the main starting point: [table names]
```

Drop in any existing context you have (prior dashboards, a data dictionary, a dbt schema file) and Lovable will incorporate it. Ask the agent to save the output as Markdown or YAML files in its project directory:

```text wrap theme={null}
Save the finalized metric definitions as YAML files in this project. Other projects will reference them.
```

Once saved, other Lovable projects in the same Lovable workspace can reference those files to get consistent metric definitions out of the box.

## Limitations

* **No per-user data scoping within a connection.** Everyone who uses a service principal connection sees the same data, the service principal's data, and everyone who builds with a User OAuth connection queries as the person who authorized it. Create separate service principals per access role, or use the Databricks **[app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md)** so each end user of your published app queries under their own Databricks login and permissions.
* **No enforced read-only access.** The connector applies no method or path allowlist, so a connection runs whatever SQL its service principal, or the user who authorized it, is allowed to run. Scope it with Unity Catalog grants. See [Restrict a connection to read-only](#restrict-a-connection-to-read-only).
* **No automatic caching.** Query results are not cached by default. You can ask Lovable to add caching logic to your app at your chosen interval.
* **Connection access is not enforced after publishing.** Connection-level access decides who can build with the connection, [not who can visit the published app](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients). Who can visit is a separate, publish-time control: set the site's visibility to **Invite only** (Free and Pro plans) or to **Workspace** or **Custom** (Business and Enterprise plans) so visitors have to log in. On Business and Enterprise plans, admins can also set a workspace-wide default in **Workspace settings → Privacy & security → Default published app access**. See [website access control](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app).
* **Customer-managed cost controls.** Lovable does not impose query cost caps, and neither do Databricks [budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets): they scope to your account, workspaces, or resource tags, and they only send email alerts, with up to a 24 hour delay. The controls that actually limit a warehouse are [**Auto stop**](https://docs.databricks.com/aws/en/compute/sql-warehouse/create), a small **Cluster Size**, and a [`STATEMENT_TIMEOUT`](https://docs.databricks.com/aws/en/sql/language-manual/parameters/statement_timeout). Set the timeout for the whole workspace in **Settings → Compute → SQL warehouses → SQL Configuration Parameters**, since the system default is 172800 seconds (2 days). Per-warehouse timeouts exist but are in Beta and settable only through the SQL warehouses API.

## Manage your Databricks connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Databricks**, then open the connection.

* **Unlink projects** to remove Databricks access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Databricks stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.

## FAQ

> **Does Lovable enforce my Databricks permissions?**
>
> No. Lovable enforces who on your team can **use** a connection. The connection's identity determines what data is queryable. With a service principal connection, everyone with access to the connection can query whatever the service principal can see. With a User OAuth connection, everyone with access queries as the person who authorized it and sees whatever they can see. Create separate service principals per access role to scope data.

> **What if someone runs an expensive query?**
>
> Lovable does not impose query cost caps, so use Databricks-side controls. Start with a small warehouse and scale up as needed, keep **Auto stop** short (the default is 45 minutes on pro and classic warehouses, 10 minutes on serverless), and set a workspace-level `STATEMENT_TIMEOUT` so a runaway query is halted well before the 172800 second (2 day) system default. Databricks [budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets) help you notice overspend but do not stop it: they send email alerts and cannot cap a SQL warehouse.

> **Is my data cached or stored in Lovable?**
>
> Not by default. Lovable queries Databricks at runtime with no automatic data replication or caching. Caching is opt-in: you can ask Lovable to add caching logic to your app at an interval you choose.

> **What happens when I publish an app that queries Databricks?**
>
> For a service principal connection, the published app queries Databricks as the service principal, so every visitor sees the same data. Connection-level access is [not enforced after publishing](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients): it decides who can build with the connection, not who can visit the app. Control the audience at publish time instead: set the site's visibility to **Invite only** (Free and Pro plans) or to **Workspace** or **Custom** (Business and Enterprise plans) so visitors have to log in. See [website access control](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app). Publishing a project that uses a User OAuth connection works differently and is not covered on this page yet.

> **Can someone leak the Databricks credentials?**
>
> No. The service principal credentials, and the OAuth tokens of a User OAuth connection, are stored server-side in Lovable's gateway and do not reach the browser or your app's frontend code.

## Troubleshooting

> **The connection verifies, but every query fails with HTTP 403**
>
> This is the most common Databricks setup failure. For a service principal connection, Lovable verifies the credentials with a single `GET 2.0/preview/scim/v2/Me` request when you click **Connect**. That call proves the OAuth secret works and nothing more. It succeeds even when the principal holds no warehouse permission and no table grants, so a connection can report success and then return 403 on its first real query. A User OAuth connection is not tested at all at that point.
>
> For a service principal connection, work back through the grants in the service principal steps under [How to connect Databricks](#how-to-connect-databricks):
>
> * The principal has no **Can use** on the warehouse. Grant it under **SQL Warehouses → (your warehouse) → kebab menu → Permissions**.
> * The principal is missing Unity Catalog privileges. It needs `USE CATALOG`, `USE SCHEMA`, and `SELECT`, and all three are required. Check what it already holds with ``SHOW GRANTS `<application-id>` ON CATALOG main;``.
> * The principal was never assigned to the workspace, or lacks the **Databricks SQL access** entitlement.
>
> For a User OAuth connection, the same 403 means your own account lacks **Can use** on the warehouse or the Unity Catalog privileges, because the connection has exactly your grants.

> **The connection fails immediately with an authentication error**
>
> On a service principal connection, either the OAuth secret expired (the maximum lifetime is 730 days) or the **Workspace URL** is wrong. Generate a fresh secret in Databricks and reconnect.
>
> On a User OAuth connection, the refresh token has expired (7 days by default, set by the **Refresh token TTL** on the custom OAuth application), the OAuth application was disabled or deleted, or the person who authorized the connection was removed from the workspace. Reconnect the connection in Lovable and sign in again.
>
> In both cases, make sure the workspace URL is the host you see in the browser when signed in to Databricks, with no trailing path.

> **The connection cannot reach Databricks at all**
>
> Lovable's gateway is blocked at the network layer. See [Network access](#network-access): an IP access list or an account-level ingress policy needs Lovable's egress ranges allowlisted, and a workspace with public network access disabled cannot be reached from Lovable at all.

> **The User OAuth sign-in fails before you reach Databricks or comes back with an error**
>
> Databricks rejects the sign-in when the custom OAuth application and the Lovable form disagree. Check, in order:
>
> * **Redirect URI**: the application's **Redirect URLs** must include `https://api.lovable.dev/workspaces/connectors/standard/oauth/callback` exactly, as shown under **Redirect URI** in the connection form.
> * **Scope**: the application must have the **All APIs** access scope. Lovable requests `all-apis`, and an application limited to the **SQL** scope refuses it.
> * **Client ID and secret**: the **Client ID** must be the one of that application, and **Client Secret** must match how it was created. A confidential application needs its secret entered in Lovable, and a public application needs the field left empty.
> * **Account console**: the application must be enabled in **Settings → App connections**.

> **Queries time out or a warehouse never wakes up**
>
> The connection's identity, the service principal or your own account, needs **Can use** on the warehouse to start it. **Can view** and **Can monitor** are not enough. If long queries are cut off, check the workspace `STATEMENT_TIMEOUT` in **Settings → Compute → SQL warehouses → SQL Configuration Parameters**.


## Related topics

- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
