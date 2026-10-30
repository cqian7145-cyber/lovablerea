# Connect your app to Power BI
<!-- source: https://docs.lovable.dev/integrations/power-bi.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Power BI

> Connect your app to Power BI to query the semantic models behind your reports, or rebuild an existing report in your Lovable app with the same numbers.

[Power BI](https://www.microsoft.com/en-us/power-platform/products/power-bi) is Microsoft's business intelligence service for reports and dashboards. The Power BI connector lets your Lovable app query the semantic models (datasets) behind those reports with DAX (Data Analysis Expressions) and show the results in your app. The connector reuses the measures and dimensions your BI team already maintains, on the models your connection can reach.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Power BI connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app sign in with their own Microsoft work account and query the semantic models they have [Build permission](https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions) on, the Power BI permission that lets an account query a model's data directly, with their own row-level security applied |

With Power BI, your app can:

* Query semantic models with DAX and show the results as tables, charts, and key performance indicators (KPIs)
* Reuse the measures, dimensions, and relationships your BI team maintains, so the app's numbers match your reports
* List the workspaces and semantic models the connection can reach and switch between them at runtime
* Read a model's tables, columns, measures, and relationships before writing a query

Lovable can also read an existing report's pages and visuals and [rebuild them in your app](#rebuild-an-existing-power-bi-report).

The connector reads from Power BI only. It does not change, export, or embed reports or dashboards, push data into Power BI, or refresh semantic models.

The connector also queries semantic models that live in a Microsoft Fabric workspace. For lakehouse, warehouse, and SQL database data in Fabric, use the [Microsoft Fabric connector](https://docs.lovable.dev/integrations/microsoft-fabric.md).

## Common use cases and example apps

Use Power BI when your app needs the numbers your reports already show, from the same measures your BI team maintains.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Executive KPI dashboard** | *Use Power BI and build a KPI dashboard that shows this quarter's revenue, margin, and pipeline from our Sales semantic model, with filters by region and month.* | **Show the same numbers your Power BI reports show.** The app queries the model's governed measures with DAX, so its totals match the report. |
| **Semantic model explorer** | *Use Power BI and build an explorer where I pick a workspace and a semantic model, then browse its tables, measures, and relationships.* | **Let people see what a model contains without opening Power BI Desktop.** The app lists the workspaces and semantic models the connection can reach and reads each model's structure. |
| **Store revenue report copy** | *Use Power BI and build a copy of our Store Revenue report in this app, with the same pages, charts, slicers, and filters.* | **Bring a report your team already uses into your app.** The app shows the report's pages and visuals, with numbers from the report's own semantic model. |
| **Regional scorecard** | *Use Power BI and build a scorecard that ranks our regions by the Net Revenue measure and highlights the ones below target.* | **Turn one measure into a ranked view.** The app runs a DAX query that groups the measure by region and sorts the result. |
| **Customer account page** | *Use Power BI and build a customer page that shows an account's orders, open invoices, and lifetime value from our Finance semantic model.* | **Put governed finance numbers next to your own app data.** The app filters the model by customer and shows the measures your finance team already maintains. |
| **Weekly metrics digest** | *Use Power BI and build a weekly summary page that compares this week's key measures with the previous week.* | **Track week-over-week change with consistent definitions.** The app queries the same measures for two date ranges and shows the difference. |
| **Per-user sales view** | *Use Power BI and build a page where each signed-in sales rep sees only their own territory's sales from our Sales semantic model.* | **Give each user only the rows Power BI lets them see.** The app uses the Power BI [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md), so each rep signs in with their own Microsoft work account and row-level security applies to that person. |

## How Power BI connections work

The connector calls the Power BI REST API through Lovable's gateway. The gateway passes these requests and rejects everything else:

* Listing workspaces, semantic models, and reports
* Reading a report's layout
* Running a DAX query against one model with Power BI's [Execute Queries API](https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/execute-queries), which Lovable also uses to read a model's structure

Before Lovable writes DAX, it reads the model's tables, columns, measures, and relationships. It queries your governed measures rather than recreating them, so a revenue figure in your app is the same measure your report uses.

Both ways of connecting use your own Microsoft Entra app registration. With a **service principal**, Lovable requests a Power BI token with the client credentials you enter, and every query runs as that principal. With a **signed-in user**, Lovable sends one person to Microsoft to sign in through your app registration and requests the user-delegated permissions `Dataset.Read.All` and `Workspace.Read.All`. Every query then runs as that person.

If you set a **Default semantic model ID** in the connection form, Lovable makes it available to linked projects as the default model. It is a default, not a limit: the app can list and switch models at runtime.

### What this means for data access

The identity that connects decides what everyone on the connection sees. A service principal is one identity for every app user. It cannot query models with row-level security (RLS) roles or models that use single sign-on to their data source, which is the Direct Lake default. A signed-in user queries with that person's Build permission. Workspace **Admin**, **Member**, and **Contributor** accounts see every row, and row-level security applies to other accounts, such as a **Viewer** with Build permission. If each user of your app should see only their own rows, use the Power BI [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md), where each user signs in with their own Microsoft work account.

Power BI uses Lovable's gateway architecture for secure credential handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!NOTE]
>
> All queries made through this connector run against your own Power BI tenant as the identity you connect with. Power BI capacity, licenses, and billing are handled directly by **Microsoft**, not by Lovable.

## How to connect Power BI

Who can create Power BI connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Power BI connections using different service principals, app registrations, or signing-in accounts, which is useful for separating environments or access levels.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Power BI, make sure you have:

* A Power BI workspace that holds the semantic models you want to query, and someone who can manage access to it
* A Microsoft Entra app registration with a client secret. Both ways of connecting need one. Step 1 in each tab shows how to configure it
* The **Semantic Model Execute Queries REST API** tenant setting enabled by a Fabric admin. It can be limited to security groups, so make sure it covers the identity that connects. Step 1 in each tab shows where the setting lives
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Choose how to connect

You can connect in two ways. The choice decides which identity runs every query, and whether Lovable can read a report's layout.

* **Service principal** fits shared dashboards and internal tools where everyone should see the same numbers. The connection is not tied to a person, so it keeps working when people leave. Use it with models that have no row-level security roles and no single sign-on to their data source. Import mode models usually qualify. Power BI blocks service principals on both, and Direct Lake models use single sign-on by default. Only a service principal can [rebuild an existing report](#rebuild-an-existing-power-bi-report).
* **Signed-in user** fits models a service principal cannot query, including models with row-level security roles and Direct Lake models. One person signs in through your own app registration, and every query runs with that person's Build permission. Row-level security filters that person's results only if the account is not a workspace **Admin**, **Member**, or **Contributor**. The connection depends on that account and its license.

> [!TIP]
>
> Not sure whether a model has row-level security roles or uses Direct Lake? Ask the model owner before you choose.

Each tab has two parts. Step 1 happens on the Microsoft side, in Microsoft Entra, the Fabric admin portal, and your Power BI workspace, and some items need an admin. Step 2 happens in Lovable. Follow the tab that matches how you want to connect.

**Service principal**

Connect with a Microsoft Entra service principal so every query runs as one identity that is not tied to a person. In the connection form, this option is labeled **Use your own credentials**.

**Prerequisites**

In addition to the prerequisites above, make sure you have:

* The **Service principals can call Fabric public APIs** tenant setting enabled, with the service principal in an allowed security group if the setting is limited to specific groups. Step 1 shows where the setting lives
* A semantic model without row-level security roles and without single sign-on to its data source. Import mode models usually qualify. Direct Lake models use single sign-on by default and usually fail for a service principal
* A workspace other than My workspace, because service principals cannot use My workspace

**Step 1: Set up Microsoft Entra and Power BI**

Step 1 creates the service principal and gives it access to your workspace. Your app cannot query a model until the required steps are done.

**1. Register an application**

If you already have an app registration, reuse it. Otherwise, sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations**, and select **New registration**. Enter a **Name**, keep **Supported account type** at **Accounts in this organizational directory only**, and select **Register**.

Do not add API permissions. Power BI ignores them for a service principal, and Microsoft recommends leaving them out. See Microsoft's guide: [Create a Microsoft Entra application and service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal).

**2. Note the tenant and client IDs**

On the app's **Overview** page, copy the **Directory (tenant) ID** and the **Application (client) ID**. You enter both in Lovable in Step 2.

**3. Create a client secret**

Go to **Certificates & secrets → New client secret**, enter a description and an expiry, and select **Add**. Copy the secret **value** immediately. Microsoft shows it only once.

> [!WARNING]
>
> The client secret functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

Note the expiry you chose. When the secret expires, the connection stops working until you create a new secret and update the connection in Lovable.

**4. Allow service principals to call Fabric public APIs**

Ask a Fabric admin to open **Admin portal → Tenant settings → Developer settings** and enable [**Service principals can call Fabric public APIs**](https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis) (older name: **Allow service principals to use Power BI APIs**) for a security group that contains the service principal, or for the whole organization. Microsoft enables this setting by default for new customers, so it may already be enabled.

Do not confuse it with **Service principals can create workspaces, connections, and deployment pipelines**, which this connector does not need.

**5. Enable the Execute Queries API**

Ask a Fabric admin to open **Admin portal → Tenant settings → Integration settings** and confirm that [**Semantic Model Execute Queries REST API**](https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal-integration) (older name: **Dataset Execute Queries REST API**) is enabled and covers the service principal. Without it, Power BI rejects every query.

**6. Add the service principal to the workspace**

In the Power BI service, open the workspace and select **More** (**...**) → **Workspace access**. Under **Add admins, members, or contributors**, search for the app registration's display name, select **Member**, and select **Add**. The **Member** role includes the Build permission that queries need, and the **Admin** role also includes it. Both roles also let Lovable read report layouts, which it needs to [rebuild an existing report](#rebuild-an-existing-power-bi-report).

**7. Copy the semantic model ID (optional)**

Open the model in the Power BI service and copy the ID that follows `/datasets/` in the browser address bar. You can enter it in Lovable as the default model.

**Step 2: Connect Power BI to Lovable**

Open the connection form and enter the values from Step 1.

**1. Open Power BI in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Power BI**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, to `Power BI Sales`). The name is only used inside Lovable to identify the connection.

**4. Choose Use your own credentials**

Under **Configure connection**, select **Use your own credentials**. It is one of two options the form offers, alongside **Use your own OAuth app**.

**5. Enter your credentials**

* **Microsoft Entra Tenant ID**: the Directory (tenant) ID from Step 1
* **Service Principal Client ID**: the Application (client) ID of the app registration
* **Client Secret**: the secret value you copied in Step 1
* **Default semantic model ID** (optional): the model ID from Step 1. Leave it empty to let the app pick a model at runtime

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Power BI as the same service principal. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the connection immediately by requesting a token from Microsoft Entra and listing the workspaces the service principal can see. If the test fails, the cause is usually a skipped item in Step 1. See [Troubleshooting](#troubleshooting).

> [!NOTE]
>
> A passing test means Microsoft Entra issued a token and Power BI accepted it. It does not prove a given semantic model can be queried. The test passes even when the service principal is not yet a member of any workspace, and it does not check a model's row-level security or single sign-on settings. Confirm the connection with a real query after you link it to a project.

**Signed-in user**

Sign in with a Microsoft work account through your own Microsoft Entra app registration. Queries run as that person, with that account's Build permission and any row-level security that applies to it, including on models a service principal cannot query. In the connection form, this option is labeled **Use your own OAuth app**.

**Prerequisites**

In addition to the prerequisites above, make sure you have:

* A Microsoft work account in the Microsoft Entra tenant that owns the app registration. The account needs Build permission on the semantic models the app queries: the workspace **Viewer** role plus Build, or the **Contributor**, **Member**, or **Admin** role
* A Power BI license for that account that lets it use those models. Most tenants need Power BI Pro or Premium Per User (PPU) for the signing-in user. Your Fabric admin can confirm whether the workspace's capacity changes that
* A Microsoft Entra admin who can grant the delegated permissions on the app registration, if your tenant does not let users consent to apps themselves

**Step 1: Set up Microsoft Entra and Power BI**

Step 1 registers the app that handles the Microsoft sign-in and gives the signing-in account access to your models.

**1. Register an application**

If you already have an app registration, reuse it. Otherwise, sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations**, and select **New registration**. Enter a **Name**, keep **Supported account type** at **Accounts in this organizational directory only**, and select **Register**. See Microsoft's guide: [Register an app](https://learn.microsoft.com/en-us/power-bi/developer/embedded/register-app).

**2. Note the tenant and client IDs**

On the app's **Overview** page, copy the **Directory (tenant) ID** and the **Application (client) ID**. You enter both in Lovable in Step 2. The tenant ID also decides who can sign in: only accounts in this tenant and its guests.

**3. Add the redirect URI**

Under **Manage**, select **Authentication**. Under **Platform configurations**, select **Add a platform**, select **Web**, and under **Redirect URIs** add:

```text theme={null}
https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
```

Register it under the **Web** platform, not **Single-page application**. Lovable shows the same value, with a copy button, under **Redirect URI** in the connection form after you select **Use your own OAuth app**.

**4. Create a client secret**

Go to **Certificates & secrets → New client secret**, enter a description and an expiry, and select **Add**. Copy the secret **value** immediately. Microsoft shows it only once.

> [!WARNING]
>
> The client secret functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

Note the expiry you chose. When the secret expires, Lovable can no longer refresh the user's tokens, and the connection stops working until you create a new secret and reconnect.

**5. Add the delegated permissions**

Under **Manage**, select **API permissions → Add a permission**, select **Power BI Service**, select **Delegated permissions**, and add `Dataset.Read.All` and `Workspace.Read.All`. Select **Add permissions**.

If your tenant does not let users consent to apps themselves, have a Microsoft Entra admin grant consent for the organization on the same page. Otherwise, the person who connects consents at sign-in.

**6. Enable the Execute Queries API**

Ask a Fabric admin to open **Admin portal → Tenant settings → Integration settings** and confirm that [**Semantic Model Execute Queries REST API**](https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal-integration) (older name: **Dataset Execute Queries REST API**) is enabled and covers the signing-in account. Without it, Power BI rejects every query.

**7. Give the signing-in account access to the models**

In the Power BI service, open the workspace and select **More** (**...**) → **Workspace access**. Under **Add admins, members, or contributors**, add the account with the **Contributor**, **Member**, or **Admin** role, or with the **Viewer** role plus [Build permission](https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions) on each model. Workspace **Admin**, **Member**, and **Contributor** accounts see every row, and row-level security applies to other accounts.

**8. Copy the semantic model ID (optional)**

Open the model in the Power BI service and copy the ID that follows `/datasets/` in the browser address bar. You can enter it in Lovable as the default model.

**Step 2: Connect Power BI to Lovable**

Open the connection form, enter the app registration's values, and sign in.

**1. Open Power BI in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Power BI**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, to `Power BI Finance`). The name is only used inside Lovable to identify the connection.

**4. Choose Use your own OAuth app**

Under **Configure connection**, select **Use your own OAuth app**. It is one of two options the form offers, alongside **Use your own credentials**. The **Redirect URI** card appears under the two options, above the credential fields. If you have not added its value to the app registration yet, do that now (Step 1, **Add the redirect URI**).

**5. Enter the app registration details**

* **Microsoft Entra Tenant ID**: the Directory (tenant) ID of the tenant that owns the app registration
* **Client ID**: the Application (client) ID of the app registration
* **Client Secret**: the secret value you copied in Step 1
* **Default semantic model ID** (optional): the model ID from Step 1. Leave it empty to let the app pick a model at runtime

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access queries Power BI as the account that signs in at the next step, with that account's permissions. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect and sign in**

Click **Connect** at the bottom of the form. The Microsoft sign-in window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in with the Microsoft work account you gave access in Step 1, review the requested permissions, and accept.

Microsoft redirects you back to Lovable, and the connection appears in your list.

> [!NOTE]
>
> That confirmation only means Microsoft issued tokens to your app registration. Lovable does not test the connection at this point. A connection still reports success when the account lacks Build permission on a model or the tenant has the Execute Queries setting disabled. Confirm the connection with a real query after you link it to a project.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Power BI (based on configured connection-level access). Your Lovable apps can then query your semantic models with DAX while you build and after you publish.

## Rebuild an existing Power BI report

Lovable can read an existing Power BI report and rebuild it in your app, so you do not have to describe each page and chart. To read a report's layout, Lovable needs:

* A [service principal connection](#choose-how-to-connect), the **Use your own credentials** option in the connection form. Signed-in user connections and the [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) cannot read report layouts, because Lovable's Microsoft sign-in requests permission to read only workspaces and semantic models.
* The **Contributor**, **Member**, or **Admin** role for the service principal on the report's workspace. [Microsoft returns a report's layout](https://learn.microsoft.com/en-us/rest/api/fabric/report/items/get-report-definition) only to identities that can edit the report, so a **Viewer** cannot read it. The **Member** role the setup step adds already covers this.
* Usage rights for the service principal to remove the label, if the report has an [encrypted sensitivity label](https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-change-enforcement).

Without a service principal connection, Lovable offers to add one, or to rebuild the report from your description of each page.

Some semantic models have row-level security roles, or use single sign-on to their data source, which is the Direct Lake default. Power BI refuses service principal queries on those models. For a report on one of them, link two connections to the project: the service principal reads the report's layout, and a signed-in user connection or the app user connector runs the queries. See [Choose how to connect](#choose-how-to-connect).

To start, ask Lovable in the project chat to rebuild the report. Paste the report's address from your browser's address bar, or give the workspace and report names.

### What carries over from the report

Lovable reads each page of the report and each visual's type, fields, filters, and sort order. Lovable then rebuilds the report's visuals with queries on the report's own semantic model, so the numbers in your app match the report. Lovable rebuilds the standard Power BI visual types, and these parts of a report also carry over:

* Slicers, which filter the other visuals on their page
* Top N filters, which keep the same rows Power BI shows, ties included
* Matrices and tables, which keep the same rows and columns
* Report, page, and visual filters, which apply to every visual they cover
* Hidden pages, which stay out of the app's navigation
* Drill-through pages (pages that show detail for one value you select in a visual), which open as detail views in your app

Lovable reads the layout once, while it builds your app's pages. Your app never reads it, so later changes to the report's layout do not change your app. The numbers stay current, because the app queries the semantic model live. To bring a changed layout into your app, ask Lovable to read the report again.

## Limitations

The Power BI app + chat connector documented on this page has these limits.

* **Read-only.** The connector reads from Power BI only. It does not change, export, or embed reports or dashboards, push data into Power BI, or refresh semantic models. To show a report in your app, ask Lovable to [rebuild it](#rebuild-an-existing-power-bi-report).
* **Only a service principal connection can read report layouts.** [Rebuild an existing Power BI report](#rebuild-an-existing-power-bi-report) covers what to do without one.
* **One DAX query and one result table per request.** Power BI's [Execute Queries API](https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/execute-queries) runs one query per call and returns one table per query. Results are capped at 100,000 rows or 1,000,000 values, whichever comes first, and at 15 MB. When a query hits a cap, Power BI still reports success and returns the rows that fit, with the error inside the response. A truncated result can look complete, so your app must check for that error.
* **Rate limits.** Lovable's gateway allows 100 requests per minute per connection, and Power BI allows 120 query requests per minute per user. An app + chat connection counts as one user, so every user of your app shares that budget.
* **Service principals cannot query every model.** Power BI refuses service principal queries on models with row-level security roles and on models that use single sign-on to their data source, which is the Direct Lake default. Use an Import mode model without RLS roles, or add a signed-in user connection for those models.
* **Row-level security follows the connected identity, not your app's users.** Everything built on a connection queries Power BI as the one identity that connected. For a signed-in user, workspace **Admin**, **Member**, and **Contributor** accounts see every row, and row-level security applies to other accounts, such as a **Viewer**. To give each end user their own rows, use the Power BI **[app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md)** so each user signs in with their own Microsoft work account.
* **Sign-in is limited to the tenant that owns the app registration.** Both the signed-in user option and the app user connector send people to that Microsoft Entra tenant's sign-in, so only accounts in that tenant, and its guests, can sign in.

## Troubleshooting

Lovable verifies a service principal connection the moment you click **Connect**, and saves a signed-in user connection as soon as Microsoft issues tokens. Most problems trace back to a step in Microsoft Entra or the Fabric admin portal. These are the most common:

> **Microsoft Entra could not issue a Power BI access token**
>
> Lovable could not get a token for the service principal because the tenant ID, client ID, or client secret is wrong, or the secret has expired.
>
> **What to do:** Compare the values with the app's **Overview** page in the Microsoft Entra admin center, and check the expiry under **Certificates & secrets**. If the secret has expired, create a new one, then open the connection in Lovable and click **Update** to enter it.

> **Power BI rejected the identity (HTTP 401)**
>
> For a service principal, the **Service principals can call Fabric public APIs** tenant setting is disabled or does not include the principal. For a signed-in user, the token is missing the `Workspace.Read.All` permission.
>
> **What to do:** For a service principal, ask a Fabric admin to enable the setting under **Admin portal → Tenant settings → Developer settings** for the principal, or for a security group that contains it. Then click **Connect** again, or **Update** on an existing connection. For a signed-in user, click **Reconnect** and accept the consent prompt. If the tenant blocks user consent, have a Microsoft Entra admin grant the delegated `Dataset.Read.All` and `Workspace.Read.All` permissions on the app registration first.

> **The connection shows Expired, or Power BI rejects the access token (HTTP 403)**
>
> This is a token problem, not a permission problem. The access token has expired, usually because the client secret expired and Lovable could not refresh the token, or the token was issued for another audience.
>
> **What to do:** For a signed-in user, click **Reconnect** to sign in again. If reconnecting fails, the Microsoft Entra error names the cause. For a service principal, test the connection again. When the client secret has expired, create a new one under **Certificates & secrets → New client secret**. Then open a service principal connection and click **Update** to enter it, or open a signed-in user connection, enter it, and click **Reconnect** to sign in again. If a service principal connection keeps failing with a valid secret, contact Lovable support and include the request ID if the error message shows one.

> **The connection saved, but Lovable finds no workspaces or semantic models**
>
> The connected identity has no access to any workspace yet. For a service principal, the connection test only checks that it can list workspaces, and an empty list passes.
>
> **What to do:** Add the service principal to the workspace under **Workspace access** with the **Member** role, and use a workspace other than My workspace, which service principals cannot use. For a signed-in user, give the account access to the workspace.

## Manage your Power BI connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Power BI**, then open the connection.

* **Unlink projects** to remove Power BI access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Power BI stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to the dbt Semantic Layer](https://docs.lovable.dev/integrations/dbt-semantic-layer.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
