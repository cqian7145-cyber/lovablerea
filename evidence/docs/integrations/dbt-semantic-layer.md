# Connect your app to the dbt Semantic Layer
<!-- source: https://docs.lovable.dev/integrations/dbt-semantic-layer.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to the dbt Semantic Layer

> Connect your app to the dbt Semantic Layer to query governed metrics defined in dbt, sliced by dimensions and time, without writing warehouse SQL.

The [dbt Semantic Layer](https://www.getdbt.com/product/semantic-layer) is dbt Cloud's API for governed metrics: definitions your data team maintains in dbt with MetricFlow, computed consistently wherever they are queried. The connector lets your Lovable app query those metrics directly instead of writing SQL against your warehouse.

dbt Semantic Layer is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build, and in your published apps.

With the dbt Semantic Layer, your app can:

* Query governed metrics sliced by dimensions and time grains
* Discover the metrics and dimensions defined in your dbt project with metadata queries
* Filter, order, and limit results
* Read the same metric definitions used across your BI stack
* Power dashboards, embedded analytics, and metric explorers

The connector is **read-only**: your app reads metric values, while your data team continues to define and maintain the metrics in dbt.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Company KPI dashboard** | *Use the dbt Semantic Layer and build a KPI dashboard that shows monthly revenue and active customers with filters by region.* | **Turn governed metrics into charts in your app.** The app queries metric values by month and region and renders trends everyone can trust. |
| **Embedded analytics** | *Use the dbt Semantic Layer and build a customer-facing usage page that shows each account's key metrics over time.* | **Show customers metrics from your own data stack.** The app slices metrics by account dimensions and presents them inside your product. |
| **Metric explorer** | *Use the dbt Semantic Layer and build a metric explorer where I pick a metric, slice it by any dimension, and chart the result.* | **Self-serve exploration on top of defined metrics.** The app discovers available metrics and dimensions with metadata queries and lets users combine them. |
| **Natural-language metric questions** | *Use the dbt Semantic Layer and build a chat interface that answers questions like "what was revenue by region last quarter?"* | **Answer questions with governed numbers.** The app maps each question to a metric query, so answers come from your dbt definitions rather than generated SQL. |
| **Board and executive reporting** | *Use the dbt Semantic Layer and build an executive report page with quarterly trends for our core metrics.* | **Recurring reporting from a single source of truth.** The app queries quarterly grains for the metrics leadership follows and lays them out as a report. |
| **Team scorecard** | *Use the dbt Semantic Layer and build a team scorecard that compares this week's metrics against the previous week.* | **Track performance with consistent definitions.** The app queries the same metrics at weekly grains and highlights week-over-week changes. |

## How dbt Semantic Layer connections work

* **Queries**: Your app queries metrics through the GraphQL API at your Semantic Layer's `/api/graphql` endpoint. dbt's MetricFlow generates the warehouse SQL from your metric definitions.
* **Gateway**: Requests are proxied through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which injects your dbt service token. The token is never exposed in app code.
* **Environment**: Every Semantic Layer query includes an `environmentId` argument. Lovable syncs the environment ID from the connection to linked projects so app code can use it.

> [!NOTE]
>
> Semantic Layer queries run through your dbt Cloud account and your data warehouse. Usage counts toward your dbt Cloud plan, and warehouse compute is billed by your warehouse provider, not by Lovable.

## How to connect the dbt Semantic Layer

Who can connect the dbt Semantic Layer depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) for details.

Each connection queries one dbt environment. You can create multiple connections with different environment IDs or service tokens, for example to separate staging and production environments.

### Prerequisites

Before connecting the dbt Semantic Layer, make sure you have:

* A dbt Cloud account on a plan that includes the dbt Semantic Layer (Starter, Enterprise, or Enterprise+)
* The dbt Semantic Layer configured for the environment you want to query, with MetricFlow metrics defined in your dbt project
* Permission to create connections in your Lovable workspace

### Step 1: Get your credentials in dbt Cloud

You need three values from dbt Cloud: the Semantic Layer host, the environment ID, and a service token.

**1. Open the Semantic Layer settings**

Sign in to dbt Cloud, open **Account settings**, select your project, and open its **Semantic Layer** settings.

**2. Copy the Semantic Layer host**

Copy the GraphQL API host shown in the Semantic Layer settings, for example `semantic-layer.cloud.getdbt.com`. Hosts are region-specific, so copy the exact value dbt shows for your account.

**3. Copy the environment ID**

Copy the numeric ID of the environment the Semantic Layer is configured for. This is the environment whose metrics your app queries.

**4. Create a service token**

Go to **Account settings → API tokens → Service tokens** and create a token with the **Semantic Layer Only** and **Metadata Only** permission sets. Copy the token; it starts with `dbtc_`.

> [!WARNING]
>
> Your service token functions like a password. Store it securely and never share it publicly. You'll need it in the next step.

See dbt's documentation for detailed instructions: [Set up the dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/setup-sl).

### Step 2: Connect the dbt Semantic Layer to Lovable

**1. Open dbt Semantic Layer in Connectors**

Go to **Connectors** and select **dbt Semantic Layer**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `dbt Semantic Layer Prod`.
2. **Semantic Layer host**: enter the GraphQL API host from your Semantic Layer settings, for example `semantic-layer.cloud.getdbt.com`. Enter the bare hostname only, without `https://` or a path.
3. **Environment ID**: enter the numeric dbt environment ID from the Semantic Layer settings.
4. **Service token**: paste your dbt service token (it starts with `dbtc_`).

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable validates the credentials against your dbt environment, so the connection fails if the host, environment ID, or service token is wrong.

When connected, anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to the dbt Semantic Layer (based on configured connection-level access). Your Lovable apps can then query the metrics and dimensions defined in your dbt project.

## Limitations

The dbt Semantic Layer connector is **read-only**. It cannot:

* Create or modify dbt models, metrics, or jobs, or trigger dbt runs
* Query data outside the metrics and dimensions defined in your dbt project
* Connect to dbt Core alone (it requires dbt Cloud with the Semantic Layer enabled)
* Query more than one dbt environment per connection (create a separate connection for each environment)
* Support per-end-user dbt authentication (each connection uses a single service token shared by its linked projects)

## Manage your dbt Semantic Layer connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **dbt Semantic Layer**, then open the connection.

* **Unlink projects** to remove dbt Semantic Layer access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use dbt Semantic Layer stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to Cube](https://docs.lovable.dev/integrations/cube.md)
- [Connect your app to Omni](https://docs.lovable.dev/integrations/omni.md)
- [Connect your app to Snowflake](https://docs.lovable.dev/integrations/snowflake.md)
- [Connect your app to GoodData](https://docs.lovable.dev/integrations/gooddata.md)
