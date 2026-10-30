# Connect your app to Omni
<!-- source: https://docs.lovable.dev/integrations/omni.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Omni

> Connect your app to Omni, a business intelligence platform, to build dashboards and reports on the metrics your data team defines in Omni.

[Omni](https://omni.co/) is a business intelligence platform built around a semantic layer. Your data team defines models, topics, dimensions, and measures once, and every query runs against those definitions. The Omni connector lets your Lovable app query those metrics, so you can build dashboards and reporting tools on the numbers your team already trusts.

Omni is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Omni, your app can:

* Discover the models and topics your team has defined, and the dimensions and measures inside each topic
* Run queries against a topic by choosing fields, filters, sorts, and a row limit
* Read results as JSON rows, ready for charts and tables
* Wait for slow warehouse queries to finish
* Reuse the query shape of a saved Omni workbook query in your app, if the saved query does not use custom SQL

Use Omni when your app needs the metric definitions your data team already maintains. Omni generates the warehouse SQL from those definitions, so you do not recreate the calculations in your app.

## Common use cases and example apps

You can use Omni to build internal and customer-facing reporting tools such as these.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Revenue dashboard** | *Use Omni and build a dashboard of our monthly revenue by region, using the measures in our Order Items topic.* | **Chart your team's metrics in your app.** The app queries the revenue measure by month and region and charts the results. |
| **Metric explorer** | *Use Omni and build an explorer where I pick a topic, then choose dimensions and measures to query.* | **Let your team browse what the connection can reach.** The app lists the topics and fields Omni exposes and builds pickers from them. |
| **Customer usage page** | *Use Omni and build a customer-facing page that shows each account's usage totals from our Accounts topic.* | **Show customers their own numbers.** The app filters each query by the signed-in customer's account. Every query runs as the same Omni user, so your app, not Omni, must control which rows each customer sees. |
| **Weekly metrics digest** | *Use Omni and build a weekly summary page that compares this week's key measures with the previous week.* | **Track changes over time.** The app runs the same measures for two date ranges and shows the difference. |
| **Regional scorecard** | *Use Omni and build a scorecard that ranks our regions by revenue and highlights the ones below target.* | **Compare regional performance.** The app groups a revenue measure by region and sorts the results. |
| **Metric question app** | *Use Omni and build an app where my team asks questions like "What was revenue in the West region last quarter?" and gets the answer from our Omni topics.* | **Answer metric questions in plain language.** The app maps each question to a query on the right topic, fields, and filters. |

## How Omni connections work

Lovable calls Omni through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which stores your API key securely and adds it to every request. Your app does not need Omni credentials or your Omni host in its code.

Queries run as the Omni user who created the personal token. That user's model access and any row-level restrictions apply to everyone using the connection, including through a published app. The connector does not sign each app user in to Omni separately.

Use a key from a dedicated Omni user with access only to the models your app needs. For example, a sales dashboard should use a user restricted to sales models. Create separate users and connections for teams that need different data.

> [!WARNING]
>
> Lovable accepts a personal token from any Omni user, including an admin. Do not use an admin's token.

The connector gateway forwards only the Omni API calls for discovery and queries. It refuses every other Omni endpoint, so a connection cannot create, change, or delete dashboards, workbooks, models, or users in Omni. It also refuses a query that includes custom SQL or asks Omni to create a workbook for the query.

In the project chat, Lovable makes these calls without asking for approval. It asks first only when a query includes an option that Lovable cannot confirm is read-only. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat).

## How to connect Omni

Who can create Omni connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Omni connections using different API keys, which is useful for separating access levels or Omni instances.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Omni, make sure you have:

* An Omni instance at a `*.omniapp.co` host, or a playground instance at a `*.playground.exploreomni.dev` host. The connector does not accept other hosts
* An Omni user with the **Restricted Querier** role or higher whose model access matches what your app needs, and a personal token for that user (see Step 1)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Your Omni licensing and warehouse compute costs are separate from Lovable billing. Queries that need fresh results run on your warehouse and use its compute, so add filters and row limits to keep costs down. Omni allows 60 API requests per minute per key by default. Every query your app runs counts toward that limit, and one slow query can use up to five requests.

### Step 1: Create an Omni API key

Omni offers two kinds of API key. Use a personal token: it runs queries as the user who created it, so a dedicated, restricted user limits what your app can reach. An organization key has Organization Admin access and can run queries as any Omni user, so Lovable rejects it when you click **Connect**.

**1. Choose the Omni user**

To use a dedicated user, ask an Omni organization admin to create it. Give the user the **Restricted Querier** role or higher, and access to only the models your app needs. Then sign in to Omni as the user whose access your app should have. See Omni's [permissions documentation](https://docs.omni.co/administration/users/permissions).

**2. Create a personal token**

Open your profile menu, select **Manage account**, and click **Generate token**. Copy the token. If the option is missing, an Omni organization admin must first enable **Settings → API access → Personal tokens**.

**3. Find your Omni host**

Your Omni host is the hostname you see in the browser address bar when you are signed in to Omni, without `https://` and without a path. For example, `yourcompany.omniapp.co`.

> [!WARNING]
>
> Your API key functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

See Omni's documentation for more: [API authentication](https://docs.omni.co/api/authentication) and [API base URL](https://docs.omni.co/api/base-url).

### Step 2: Connect Omni to Lovable

Open the connection form and enter the values from Step 1.

**1. Open Omni in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Omni**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, to `Omni Sales`). The name is only used inside Lovable to identify the connection. Use a name that reflects the access level of the Omni user.

**4. Enter your credentials**

Under **Configure connection**:

* **Omni host**: the lowercase hostname from Step 1, for example `yourcompany.omniapp.co`. The form rejects a value that includes `https://`, a path, or uppercase letters
* **API key**: the personal token from Step 1

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Omni as the same Omni user. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against your Omni instance and confirms that it is a personal token before saving the connection.

> [!NOTE]
>
> A successful connection test does not confirm model access. After linking the connection to a project, ask Lovable to list the available models and run a query against one your app needs. If no models appear, ask your Omni admin to check the user's model access.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Omni (based on configured connection-level access). Your Lovable apps can then discover your models and topics and run queries that use your team's metric definitions while you build and after you publish.

If the key changes, open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Limitations

Keep these limits in mind when building with Omni.

* **Supported hosts.** The host must end in `.omniapp.co` or `.playground.exploreomni.dev`. The connector rejects other hosts with the error `Must be a bare lowercase *.omniapp.co or *.playground.exploreomni.dev hostname (no https:// or path)`.
* **Shared identity.** The connector does not support per-user Omni sign-in or automatically restrict data for each app user. Each connection represents a single Omni user shared across all projects linked to it.
* **Dashboard embedding.** This setup returns query results for your app's own charts. It does not embed Omni dashboards or workbooks in your app.
* **Custom SQL and workbooks.** The connector refuses a query that includes custom SQL or asks Omni to create a workbook for the query. Instead of custom SQL, ask Lovable to use the topics, dimensions, and measures your team defines in Omni.

## Manage your Omni connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Omni**, then open the connection.

* **Unlink projects** to remove Omni access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Omni stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
