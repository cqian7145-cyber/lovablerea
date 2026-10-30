# Connect your app to Looker
<!-- source: https://docs.lovable.dev/integrations/looker.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Looker

> Connect your app to Looker to build dashboards and reporting tools using the metric definitions your analytics team maintains in LookML.

[Looker](https://cloud.google.com/looker) is Google Cloud's business intelligence platform. The Looker connector lets your Lovable app query metrics defined in LookML, the modeling language your analytics team uses to describe data and calculations. You can build dashboards and reporting tools using those existing definitions.

Looker is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Looker, your app can:

* Discover models and Explores, the starting points for queries in Looker
* Choose dimensions, such as region or month, and measures, such as revenue or order count
* Filter, sort, and limit query results to show in your app
* Inspect the SQL Looker generates to help debug a query

Use Looker when your app needs the metric definitions your analytics team already maintains. Looker generates the database queries from those definitions, so you do not need to recreate the calculations in your app.

## Common use cases and example apps

You can use Looker to build internal reporting tools such as these.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Executive dashboard** | *Use Looker and build an internal dashboard that shows monthly revenue and orders with a region filter, using our existing measure definitions.* | **Review revenue and orders in one place.** The app queries your LookML measures by month and filters them by region. |
| **Metric explorer** | *Use Looker and build an explorer where I pick a model and an Explore, then choose dimensions and measures to query.* | **Let your team browse the data the connection can reach.** The app lists the models and Explores and builds field pickers from them. |
| **Regional scorecard** | *Use Looker and build a scorecard that ranks our regions by revenue and highlights the ones below target.* | **Compare regional performance.** The app groups a revenue measure by region and sorts the results. |
| **Weekly metrics digest** | *Use Looker and build a weekly summary page that compares this week's key measures with the previous week.* | **Track changes over time.** The app runs the same measures for two date ranges and shows the difference. |
| **Customer metrics page** | *Use Looker and build a customer-facing page that shows each account's usage and order totals from our Customers Explore.* | **Show your customers their own numbers.** The app filters each Looker query by the signed-in customer's account. Every query runs as the same Looker account, so your app enforces which rows each customer sees. |
| **Metric question app** | *Use Looker and build an app where my team asks questions like "What was revenue in the West region last quarter?" and gets the answer from our Looker measures.* | **Answer metric questions in plain language.** The app maps each question to a Looker query on the right Explore, dimensions, and filters. |

## How Looker connections work

Lovable calls Looker through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which stores your credentials securely and refreshes access tokens automatically. Your app does not need Looker credentials in its code.

Queries run as the Looker account that owns the API key. Its model permissions and any row-level or field-level restrictions apply to everyone using the connection, including through a published app. The connector does not sign each app user in to Looker separately.

Use a dedicated Looker service account, a Looker account made for API access that no person signs in with. Give it access only to the data your app needs. For example, a sales dashboard should use an account restricted to sales models. Create separate accounts and connections for teams that need different data.

> [!WARNING]
>
> The connector does not enforce read-only access. A connection can modify or delete Looker content if its account has those permissions. Use a restricted role as described in Step 1, and avoid an admin account.

## How to connect Looker

Who can create Looker connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Looker connections using different API keys, which is useful for separating access levels or instances.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Looker, make sure you have:

* A Looker instance hosted by Google, either Looker (Google Cloud core) at a `*.looker.app` host or Looker (original) at a `*.cloud.looker.com` host. The connector does not accept other hosts, such as `yourcompany.looker.com` or a customer-owned domain
* A Looker admin to create a service account, its role, and its API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Your Looker licensing and warehouse compute costs are separate from Lovable billing. Looker service accounts consume licenses according to their assigned roles. Ask your Looker admin to confirm the licensing requirements for your app.
>
> Queries can return Looker's [cached results](https://cloud.google.com/looker/docs/caching-and-datagroups). Queries that need fresh results run on your warehouse and use its compute, so add filters and row limits to keep costs down.

### Step 1: Create a Looker service account and API key

Ask your Looker admin to complete these steps. The account's role controls what your app can access.

**1. Create a role scoped to your app's models**

In Looker, open **Admin → Roles**. Create a model set containing only the models your app needs and a permission set for querying them. For Explore access, include `explore` and its required permissions, `see_looks` and `access_data`. Create a role combining these sets. See Looker's [role and permission reference](https://cloud.google.com/looker/docs/admin-panel-users-roles).

To restrict the account to reading data, leave out permissions for saving content, development, and administration. Check all assigned roles, including roles inherited from groups, because additional roles can grant broader access.

**2. Create a service account**

Open **Admin → Users**. In Looker (Google Cloud core), click **Add Service Accounts**. In Looker (original), click **Add → Service Account**. Enter a **Service Account Name**, leave **Create default set of API credentials** turned on, assign the restricted role, and click **Save**. See Looker's [service account setup](https://cloud.google.com/looker/docs/admin-panel-users-users#service-account).

If your models use [access filters](https://cloud.google.com/looker/docs/reference/param-field-access-filter), set the service account's user attributes to restrict the rows it can query.

**3. Get the API key**

Under **Admin → Users → Service Accounts**, open the account. In **API Keys**, click **Manage**. Use the credentials created with the account, or click **Create New API Key**. Copy the client ID and client secret. See Looker's [API key management](https://cloud.google.com/looker/docs/admin-panel-users-users#api-only_service_accounts) and [API authentication guide](https://cloud.google.com/looker/docs/api-auth).

> [!WARNING]
>
> The client secret functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

**4. Find your Looker host**

Your Looker host is the hostname you see in the browser address bar when you are signed in to Looker, without `https://` and without a path. For example, `yourcompany.cloud.looker.com` or `41c03249-8fba-4acd-ae98-05a449d1bab3.looker.app`.

### Step 2: Connect Looker to Lovable

Open the connection form and enter the values from Step 1.

**1. Open Looker in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Looker**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, to `Looker Sales`). The name is only used inside Lovable to identify the connection. Use a name that reflects the access level of the Looker user.

**4. Enter your credentials**

Under **Configure connection**:

* **Looker host**: the bare hostname from Step 1, for example `yourcompany.cloud.looker.com`. The form rejects a value that includes `https://` or a path
* **Client ID**: the client ID of the API key from Step 1
* **Client secret**: the client secret issued alongside the client ID

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Looker as the same Looker user. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials by authenticating with Looker and reading the connected account's details.

> [!NOTE]
>
> A successful connection test does not confirm model access. After linking the connection to a project, ask Lovable to list the available models and run a query against one your app needs. If no models appear, ask your Looker admin to check the account's role and model set.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Looker (based on configured connection-level access). Your Lovable apps can then discover your models and Explores and run queries that use your team's metric definitions while you build and after you publish.

If the client secret changes, open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Limitations

Keep these limits in mind when building with Looker.

* **Supported hosts.** The host must end in `.looker.app` or `.cloud.looker.com`. The connector rejects other hosts, including `yourcompany.looker.com` and customer-owned domains, with the error "Must be a bare Looker hostname".
* **Shared identity.** The connector does not support per-user Looker sign-in or automatically restrict data for each app user.
* **Dashboard embedding.** This setup returns query results for your app's own charts. It does not set up embedded Looker dashboards or Looks, Looker's saved reports.

## Manage your Looker connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Looker**, then open the connection.

* **Unlink projects** to remove Looker access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Looker stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
