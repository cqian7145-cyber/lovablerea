# Connect your app to GoodData
<!-- source: https://docs.lovable.dev/integrations/gooddata.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to GoodData

> Connect your app to GoodData Cloud to browse your workspaces, metrics, and visualizations and run analytics queries from your Lovable app.

[GoodData](https://www.gooddata.com/) is a business intelligence and analytics platform. It is built around a semantic layer, a shared set of metric definitions that dashboards and reports reuse. The GoodData connector lets your Lovable app browse the workspaces, metrics, attributes, and saved visualizations in your GoodData Cloud organization and compute report data from them. It works with GoodData Cloud, GoodData's managed analytics product.

GoodData is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With GoodData, your app can:

* List the workspaces in your GoodData Cloud organization
* Browse each workspace's metrics, attributes, and facts, the building blocks of its semantic model
* Discover saved visualizations and analytical dashboards
* Compute report data with the metrics and groupings your team already defined

Use GoodData when your app needs the metrics your team already maintains in GoodData's semantic layer, instead of recreating the calculations in your app.

## Common use cases and example apps

These examples show what you can build with GoodData, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Executive dashboard** | *Use GoodData and build a dashboard that shows monthly revenue and active accounts from our metrics.* | **Show the numbers your team already trusts.** The app computes the matching metrics by month and renders them as charts and tiles. |
| **Metric explorer** | *Use GoodData and build an explorer where I pick a workspace, then choose metrics and attributes to group by.* | **Let your team browse the data the connection can reach.** The app lists workspaces and their metrics and builds field pickers from them. |
| **Regional scorecard** | *Use GoodData and build a scorecard that ranks our regions by revenue and flags the ones below target.* | **Compare performance across a segment.** The app groups a revenue metric by region and sorts the results. |
| **Weekly metrics digest** | *Use GoodData and build a weekly summary page that compares this week's key metrics with last week.* | **Track changes over time.** The app computes the same metrics for two date ranges and shows the difference. |
| **Customer metrics page** | *Use GoodData and build a customer-facing page that shows each account its own usage numbers from our workspace.* | **Show your customers their own data.** The app filters each computation by the signed-in account. Every request runs as the same GoodData user, so your app, not GoodData, must limit each customer to their own rows. |
| **Metric question app** | *Use GoodData and build an app where my team asks questions like "What was revenue in the West region last quarter?" and gets the answer from our metrics.* | **Answer metric questions in plain language.** The app maps each question to a computation on the right metrics, attributes, and filters. |

## How to connect GoodData

Who can create GoodData connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple GoodData connections using different organizations or API tokens, which is useful for separating environments or giving different projects different levels of access.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting GoodData, make sure you have:

* A GoodData Cloud organization, reachable at your GoodData Cloud URL, for example `https://<org>.cloud.gooddata.com`
* A GoodData API token (Step 1 shows where to create it). By default, only GoodData admins can create API tokens. To let another user create one, a GoodData admin must give that user the `SELF_CREATE_TOKEN` organization permission
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Report computations made through this connector run on your GoodData Cloud organization and use its resources. Billing and quota are handled directly by GoodData, not Lovable.

### Step 1: Create a GoodData API token

The connector authenticates with a GoodData API token. The token acts as the GoodData user it belongs to and sees whatever that user can see, so give that user only `VIEW` permission on the workspaces your app reads. `VIEW` is enough to browse the semantic model and compute reports through the API.

To create a GoodData API token:

**1. Sign in to GoodData Cloud**

Sign in to your GoodData Cloud organization at your GoodData Cloud URL, for example `https://<org>.cloud.gooddata.com`.

**2. Open personal access tokens**

On the GoodData Cloud homepage, go to **Settings**. In the **Developer** section, next to **Personal access tokens**, click **Manage**.

**3. Create the token**

Click **+ Create**, type a descriptive name for the token, for example `Lovable`, and click **Create**.

**4. Copy the token**

Copy the token.

> [!WARNING]
>
> Your API token functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code. A token that belongs to a GoodData admin lets your apps read data from every GoodData workspace that admin can see.

See GoodData documentation for more: [Create an API access token](https://www.gooddata.ai/docs/cloud/manage-organization/user-token/).

### Step 2: Connect GoodData to Lovable

Open the connection form and enter the values from Step 1.

**1. Open GoodData in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **GoodData**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **GoodData Cloud URL**: the https URL of your GoodData Cloud organization, for example `https://yourorg.cloud.gooddata.com`. You can paste the full address from your browser. Lovable keeps only the organization URL.
2. **API token**: the token from Step 1.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries GoodData as the token's user. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the API token against your GoodData Cloud organization before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to GoodData (based on configured connection-level access). Your Lovable apps can then browse your workspaces and compute reports from your metrics.

In the project chat, Lovable reads your workspaces, metrics, and visualizations and computes reports without asking for approval. Lovable calls GoodData through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which forwards only these read requests and report computations. A connection cannot create, change, or delete GoodData objects, even when the token's user has that permission in GoodData.

If the API token changes, open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Limitations

The GoodData connector cannot:

* Connect to GoodData Platform, GoodData's older product. The connector works with GoodData Cloud organizations.
* Embed GoodData dashboards or visualizations in your app. The app computes report data and renders it with its own components. To embed a GoodData dashboard where each viewer signs in, use GoodData's own embedding with your organization's URL.
* Support per-end-user GoodData login. Each connection represents a single API token shared across all projects linked to it.

## Manage your GoodData connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **GoodData**, then open the connection.

* **Unlink projects** to remove GoodData access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use GoodData stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect Firecrawl to scrape web data for your app](https://docs.lovable.dev/integrations/firecrawl.md)
- [Connect your app to Clay](https://docs.lovable.dev/integrations/clay.md)
- [Connect your app to Wix](https://docs.lovable.dev/integrations/wix.md)
- [Connect your app to Salesforce](https://docs.lovable.dev/integrations/salesforce.md)
- [Connect your app to AWS S3](https://docs.lovable.dev/integrations/aws-s3.md)
