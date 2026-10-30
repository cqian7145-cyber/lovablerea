# Connect your app to Cube
<!-- source: https://docs.lovable.dev/integrations/cube.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Cube

> Connect your app to Cube to build dashboards and reports on the business metrics that your data team already defines.

[Cube](https://cube.dev/) is an analytics platform built on a semantic layer, a shared set of metric definitions that dashboards and reports reuse. The Cube connector lets your Lovable app show these metrics in your own dashboards, reports, and tools. The connector works with Cube Cloud, the hosted service, and with Cube Core, the open-source version of Cube that you host yourself.

Cube is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Cube, your app can:

* List the measures (metrics such as revenue) and the dimensions (groupings such as region or month) in your data model
* Run structured queries: measures by dimension and by time, with filters, sort order, and row limits
* Use Semantic SQL (SQL queries on the data model) when a structured query cannot answer the question
* Limit all queries through a connection to one customer or one role, with rules that your data team sets in Cube

Use Cube when your app needs the metric definitions that your data team already maintains. Cube writes the SQL for your data warehouse from those definitions, so you do not recreate the calculations in your app. The connector is read-only.

## Common use cases and example apps

These examples show what you can build with Cube, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Company metrics dashboard** | *Use Cube and build a dashboard that shows monthly revenue and order count from our orders view, with a filter by status.* | **Show the same numbers as your other reports.** The app queries the measures in your data model by month. Its totals match every other tool that reads from Cube. |
| **Customer usage page** | *Use Cube and build a usage page for our customer Acme that shows their key metrics for the last 12 months.* | **Show a customer their own data.** The app uses a Cube connection that is set up for Acme. If your data model filters by customer, Cube returns only the rows for Acme, and everyone who uses the app sees those rows. |
| **Metric glossary** | *Use Cube and build a page that lists every view, measure, and dimension in our data model with its title and type.* | **Show what your data model contains.** The app reads the data model and groups the measures and dimensions by cube or view. |
| **Metric explorer** | *Use Cube and build an explorer where I select a measure, break it down by a dimension, and show the result as a chart.* | **Let your team explore metrics without help from the data team.** The app reads the available measures and dimensions and makes a query from each selection. |
| **Quarterly board report** | *Use Cube and build a board report page with quarterly trends for revenue, new customers, and churn.* | **Make recurring reports from one source of numbers.** The app queries each measure by quarter and shows the results as a report. |
| **Team scorecard** | *Use Cube and build a team scorecard that compares the measures for this week with the previous week.* | **Compare each week with the same definitions.** The app queries the same measures for two weeks and shows the change. |

## How Cube connections work

Your data team defines each metric in one place, the Cube data model. The data model groups the metrics into cubes, which usually match tables in your database, and views, which combine cubes for apps and reports.

When Lovable writes code for Cube, it reads your data model first by default. It uses the measure and dimension names that it finds there, and it prefers views. Lovable writes most queries as structured queries, which list the measures, dimensions, and filters to use. For questions that a structured query cannot answer, Lovable uses Semantic SQL.

By default, Lovable adds a row limit to each structured query that it writes. If a query sets no row limit, Cube returns a maximum of 10,000 rows. A query can set a row limit of up to 50,000 rows. Your data team can change both numbers in Cube.

Lovable sends requests to Cube through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors). The gateway keeps your credentials and adds a token to each request. Your Cube credentials are not exposed to your published app.

The token is a JSON Web Token (JWT), a short piece of signed text that proves that the request is allowed. By default, Cube accepts the token only if your deployment's API secret, a secret value in its Cube configuration, signed it. The token also carries values that describe the request, for example `"tenant": "acme"` for your customer Acme. Cube calls these values the security context. Rules in your Cube deployment, such as access policies, use the security context to decide which data a query returns.

All queries through a connection use the same security context, in the project chat and in your published app. As a result, everyone who uses your app gets the same access.

> [!WARNING]
>
> Do not rely on the security context if your deployment sets `CUBEJS_DEV_MODE=true`. This setting starts development mode, which is for local testing. In development mode, Cube answers queries even when the token is not valid, and then applies no security context. The test at **Connect** also passes.

In the project chat, Lovable reads your data model and runs structured queries without asking for approval. It also runs Semantic SQL queries that start with `SELECT` or `WITH` without asking. For other requests, Lovable asks for your approval first, even though these requests only read data. An example is a Semantic SQL query with more than one statement. To stop the prompts, open the connection and set **Ask before making changes** to **Always allow** under **Connection settings**. This setting applies only to you and this connection. A published app does not ask for approval. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat).

## How to connect Cube

Who can create Cube connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Cube connections using different deployments or security contexts, which is useful for separating environments, teams, or customers.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before you connect Cube, make sure that you have:

* A Cube deployment on Cube Cloud or Cube Core, with a data model that has at least one cube or view
* For Cube Core, a public hostname that serves HTTPS with a valid certificate
* If your network limits incoming traffic, a rule that allows the [IP ranges of the Lovable connector gateway](https://docs.lovable.dev/integrations/security.md#ip-allowlisting)
* Your deployment's API secret, or an API token for the deployment
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

Cube Core serves plain HTTP by default. To serve HTTPS, put a reverse proxy in front of Cube Core. A reverse proxy is a web server that receives HTTPS requests and passes them to Cube.

> [!NOTE]
>
> Cube queries run on your Cube deployment and your data warehouse. Cube Cloud usage counts toward your Cube Cloud plan, and your warehouse provider bills for the processing that the queries use. Lovable does not bill these queries. Some Cube Cloud plans limit the number of queries per day. The limit counts the queries from all tools in your Cube Cloud account. If your app loads data often, it can reach this limit, and Cube Cloud then stops the queries. See [Limits and quotas](https://docs.cube.dev/admin/deployment/limits) in the Cube documentation.

### Choose how to connect

You can connect in two ways. They differ in who signs the token with the API secret:

* With the API secret option, you give Lovable your deployment's API secret. Lovable signs a new token every hour, so the connection does not expire. You set the security context in Lovable. Use this option if you can share the API secret with Lovable.
* With the API token option, you paste a token that you already have. Lovable does not get the API secret. The values in the token are the security context. If the token expires, the queries in your app fail until you replace the token. Use this option if you cannot share the API secret.

**API secret**

In the connection form, this option is labeled **Connect with your API secret**.

**Step 1: Get the host and the API secret**

You need two values from your Cube deployment.

**1. Find your deployment host**

In Cube Cloud, open **Settings → API Credentials** for your deployment and select the **REST API** tab. Copy only the hostname from the **Endpoint** URL, without `https://` or the path. For example, `purple-reindeer.gcp-us-central1.cubecloudapp.dev`.

For Cube Core, use the public hostname of your deployment. If the HTTPS port is not 443, add the port. For example, `cube.example.com:8443`.

**2. Copy the API secret**

The API secret is the value of `CUBEJS_API_SECRET` in your deployment's configuration. In Cube Cloud, open **Settings → Environment Variables** for your deployment. Find `CUBEJS_API_SECRET` and click the copy icon next to its value. For Cube Core, copy the value from your deployment's `.env` file or environment.

If your deployment has a list of secrets in `CUBEJS_API_SECRETS`, copy one secret from that list.

> [!WARNING]
>
> Keep the API secret secure and do not share it publicly. A person who has the API secret can make a token with full access to your deployment. Paste the API secret only into the connection form. Do not put it in a prompt, a chat message, or your app's code.

See Cube's documentation for more: [REST (JSON) API](https://docs.cube.dev/reference/core-data-apis/rest-api) and [Security context](https://docs.cube.dev/docs/data-modeling/access-control/context).

**Step 2: Connect Cube to Lovable**

Open the connection form and enter the values from Step 1.

**1. Open Cube in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Cube**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Connect with your API secret**

Under **Configure connection**, select **Connect with your API secret**.

**5. Configure the connection**

Under **Configure connection**, enter:

1. **Deployment host**: the hostname from Step 1.
2. **API secret**: the API secret from Step 1.
3. **Security context** (optional): if your data model filters by customer or role, click **Advanced settings**. Then enter the values as a JSON object, for example `{"tenant": "acme"}`. Otherwise, leave this field empty. Lovable adds these values to each token.

These rules apply to the security context:

* It is a JSON object of 2 KB or less.
* It has a maximum of four levels. The outer object is the first level. Each list or object inside another list or object is one level deeper. For example, `{"tenant": "acme"}` has one level, and `{"user": {"roles": ["admin"]}}` has three levels.
* It does not include the time values `exp`, `iat`, or `nbf`, because Lovable controls when each token is valid.

If your access policies use Cube Cloud groups or user attributes, put these values in a `cubeCloud` object. For example, `{"cubeCloud": {"groups": ["marketing"], "userAttributes": {"country": "United States"}}}`. Cube then applies the policies as it does for a user who signs in to Cube Cloud. See [Using cloud groups and user attributes with Core Data APIs](https://docs.cube.dev/recipes/core-data-api/cloud-groups-and-user-attributes) in the Cube documentation.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Cube with the same security context. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Before Lovable saves the connection, it reads your data model with a signed token. This test shows whether the host and the API secret are correct.

> [!NOTE]
>
> The test does not show whether the security context works. After you link the connection to a project, ask Lovable to run a query. Make sure that the query returns only the rows that you expect.

**API token**

In the connection form, this option is labeled **Connect with an API token**.

**Step 1: Get the host and an API token**

You need two values from your Cube deployment.

**1. Find your deployment host**

In Cube Cloud, open **Settings → API Credentials** for your deployment and select the **REST API** tab. Copy only the hostname from the **Endpoint** URL, without `https://` or the path. For example, `purple-reindeer.gcp-us-central1.cubecloudapp.dev`.

For Cube Core, use the public hostname of your deployment. If the HTTPS port is not 443, add the port. For example, `cube.example.com:8443`.

**2. Get an API token**

Lovable rejects a token that expires in less than 7 days. A token with a later expiry date works only until that date, so use a token that does not expire.

In Cube Cloud, open **Settings → API Credentials** and select the **REST API** tab. The example command shows a token after `Authorization:`. Click the eye icon to show the token, then copy it.

To make your own token, put the security context values in a JWT. Then sign the JWT with your deployment's API secret and the HS256 signing algorithm.

> [!WARNING]
>
> Keep the API token secure and do not share it publicly. The token works like a password. Paste the token only into the connection form. Do not put it in a prompt, a chat message, or your app's code.

See Cube's documentation for more: [REST (JSON) API](https://docs.cube.dev/reference/core-data-apis/rest-api) and [JSON Web Token authentication](https://docs.cube.dev/embedding/authentication/jwt).

**Step 2: Connect Cube to Lovable**

Open the connection form and enter the values from Step 1.

**1. Open Cube in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Cube**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Connect with an API token**

Under **Configure connection**, select **Connect with an API token**.

**5. Configure the connection**

Under **Configure connection**, enter:

1. **Deployment host**: the hostname from Step 1.
2. **API token**: the token from Step 1.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Cube with the same security context. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable reads the expiry date of the token. Then it reads your data model to test the host and the token. If both tests pass, Lovable saves the connection.

> [!NOTE]
>
> The test does not show whether the security context works. After you link the connection to a project, ask Lovable to run a query. Make sure that the query returns only the rows that you expect.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Cube (based on configured connection-level access). Your Lovable apps can then query the measures and dimensions in your Cube data model while you build and after you publish.

To change the security context, the API secret, or the token, open the connection. Enter the new value under **Configure connection** (the security context is under **Advanced settings**), then click **Update**.

Deleting the connection changes nothing in Cube. The API secret stays valid, and so does a token that you pasted. To stop them from working, change the API secret in Cube. If your deployment uses `CUBEJS_API_SECRETS`, remove the old secret from that list.

> [!WARNING]
>
> Changing the API secret stops every token that the old secret signed. Other apps and tools that use those tokens stop working until they get new tokens.

## Limitations

The Cube connector cannot:

* Give each user of your app a separate security context. Each connection represents a single security context shared across all projects linked to it.
* Connect to a deployment that has no public HTTPS hostname, for example a deployment on a private network or at an IP address.
* Sign tokens for a deployment that checks tokens with other keys, for example keys from an identity provider (a separate sign-in service). Use the API token option with a token from that provider instead. Lovable accepts the token only if it expires in 7 days or more.

## Troubleshooting

If Cube does not accept the credentials when you click **Connect**, Lovable shows *Cube did not validate your credentials.* Click **Show error** to see the reason.

> **Cube returns "Invalid token"**
>
> Cube returns this message when it rejects the token, either when you click **Connect** or later while your app runs. The possible causes are:
>
> * The API secret or the token is from a different deployment than the host.
> * The API token expired.
> * Your deployment requires an audience, issuer, or subject value that the token does not have.
>
> **What to do:** Copy the API secret or the token again from the same deployment as the host. If the token expired, replace it. Then click **Connect** again, or **Update** on an existing connection. If your deployment requires an audience, issuer, or subject, add `aud`, `iss`, or `sub` to the security context or to the token.

## Manage your Cube connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Cube**, then open the connection.

* **Unlink projects** to remove Cube access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Cube stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
