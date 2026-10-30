# Connect your app to Microsoft Fabric
<!-- source: https://docs.lovable.dev/integrations/microsoft-fabric.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Microsoft Fabric

> Connect your app to Microsoft Fabric to query Lakehouses, Warehouses, SQL databases, and mirrored databases through Fabric's API for GraphQL.

[Microsoft Fabric](https://www.microsoft.com/microsoft-fabric) is Microsoft's unified data platform for Lakehouses, Warehouses, and SQL databases. The Microsoft Fabric connector puts one GraphQL endpoint in front of everything you have wired into a Fabric **API for GraphQL** item, whether the data lives in a Lakehouse, a Warehouse, a SQL database, or a mirror of Snowflake. To query the Power BI semantic models in a Fabric workspace with DAX, use the [Power BI connector](https://docs.lovable.dev/integrations/power-bi.md) instead.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Microsoft Fabric connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Microsoft account and work with the Fabric data that account can reach |

With Microsoft Fabric, your app can:

* Query data across Fabric Lakehouses, Warehouses, and SQL databases through a single GraphQL endpoint
* Query mirrored databases (Azure SQL, Cosmos DB, Snowflake, Databricks) without managing per-source drivers
* Create, update, and delete rows in SQL database tables, and invoke stored procedures, via GraphQL mutations
* Fetch related data in one request through configured one-to-one, one-to-many, and many-to-many relationships

Authentication uses a Microsoft Entra service principal. Your credentials are stored securely in Lovable's gateway and are never exposed to the browser or your app's frontend code.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Warehouse ops dashboard** | *Use Microsoft Fabric and build an operations dashboard that queries our Warehouse for daily orders, fulfillment status, and inventory levels.* | **Put a live view on top of your Warehouse data.** The app queries the Warehouse through GraphQL and keeps metrics current without manual exports. |
| **Internal CRUD tool** | *Use Microsoft Fabric and build an internal tool where the support team can look up, create, and update customer records in our Fabric SQL database.* | **Manage operational records without handing out database access.** The app reads and writes rows in the Fabric SQL database through GraphQL queries and mutations. |
| **Cross-source account view** | *Use Microsoft Fabric and build an app that joins mirrored Snowflake revenue data with product tables from our Lakehouse.* | **Combine mirrored and native Fabric data in one app.** The app fetches both sources through the same GraphQL endpoint, with no per-source drivers or extra connections. |
| **Stored-procedure order entry** | *Use Microsoft Fabric and build an order entry form that submits each order through our RegisterOrder stored procedure in the Warehouse.* | **Route writes through server-side logic.** The app calls the stored procedure as a GraphQL mutation, so validation and generated IDs stay in the database. |

## How Microsoft Fabric connections work

The connector talks to a single [API for GraphQL](https://learn.microsoft.com/en-us/fabric/data-engineering/api-graphql-overview) item in your Fabric workspace. The tables, views, and relationships you add to that item become GraphQL types your app can query, so creating the item and adding your data to it is a prerequisite.

Authentication uses **OAuth2 client credentials** with a Microsoft Entra service principal. Lovable exchanges the service principal's credentials for a Fabric token with the scope `https://api.fabric.microsoft.com/.default`, so the connection can do exactly what the service principal has been granted in Fabric, nothing more.

### What this means for data access

The service principal's permissions determine what data is available to everyone who uses the connection. This connector has no per-user Microsoft login: every app and builder on the connection queries Fabric as the same principal. To segment access, create separate service principals or separate API for GraphQL items, each with its own Lovable connection. If you need each end user to sign in with their own Microsoft account instead, use the Microsoft Fabric [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md).

Microsoft Fabric uses Lovable's gateway architecture for secure credential handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!NOTE]
>
> All queries made through this connector run against your own Microsoft Fabric environment using your service principal. Fabric usage, quotas, and billing are handled directly by **Microsoft**, not by Lovable.

## How to connect Microsoft Fabric

Who can create Microsoft Fabric connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

### Prerequisites

Before connecting, make sure you have:

* A Microsoft Fabric workspace backed by a [**Fabric capacity**](https://learn.microsoft.com/en-us/fabric/enterprise/licenses): an F SKU, a Fabric trial capacity, or a Power BI Premium P SKU with Fabric enabled. Power BI Pro and Premium Per User (PPU) workspaces cannot host an **API for GraphQL** item, because neither provisions a Fabric capacity.
* An **API for GraphQL** item in that workspace, with the Lakehouse, Warehouse, Fabric SQL database, mirrored database, or Azure SQL database data you want to use added to it
* The [**Users can create Fabric items**](https://learn.microsoft.com/en-us/fabric/admin/fabric-switch) tenant setting enabled, if you still need to create the API for GraphQL item. A Fabric admin or capacity admin turns it on under **Admin portal → Tenant settings → Microsoft Fabric**.
* A Microsoft Entra service principal and a client secret for it
* A Fabric tenant admin who can enable **Service principals can call Fabric public APIs**, if it is not already enabled
* **Introspection enabled** on the API for GraphQL item (a Fabric workspace admin can enable it)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Step 1: Set up Microsoft Entra and Fabric

Step 1 has two parts: create a service principal in Microsoft Entra, then prepare the API for GraphQL item in Fabric. Your app cannot connect until both are complete.

#### Create a service principal in Microsoft Entra

**1. Register an application**

Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) and register a new application, or reuse one you already have. See Microsoft's guide: [Create a Microsoft Entra application and service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal).

**2. Note the tenant and client IDs**

On the app's **Overview** page, copy the **Directory (tenant) ID** and the **Application (client) ID**. You enter both in Lovable in Step 2.

**3. Create a client secret**

Go to **Certificates & secrets → New client secret** and copy the secret **value** right away; Microsoft shows it only once. The value functions like a password, so store it securely. Note the expiry date you choose: when the secret expires, the connection stops working until you create a new secret and update the connection in Lovable.

#### Prepare the API for GraphQL item in Fabric

**1. Allow service principals to call Fabric public APIs**

Ask a Fabric tenant admin to open **Admin portal → Tenant settings → Developer settings** and enable [**Service principals can call Fabric public APIs**](https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis) for your app or for a security group that contains it. Without this setting, Fabric rejects every request from the service principal.

Microsoft enables this setting by default for new tenants, so it may already be on. Do not confuse it with the similarly named **Service principals can create workspaces, connections, and deployment pipelines** setting, which covers different APIs and which this connector does not need.

**2. Create or open the API for GraphQL item**

In your Fabric workspace, create an **API for GraphQL** item, or open an existing one, and add the Lakehouse, Warehouse, Fabric SQL database, mirrored database, or Azure SQL database data your app needs. Only data added to this item is queryable through the connector, and Fabric's [API for GraphQL](https://learn.microsoft.com/en-us/fabric/data-engineering/api-graphql-overview#supported-data-sources) supports only those data sources.

If your app writes to a Fabric Warehouse, define a primary key on each table you add first. Fabric [generates mutations for Warehouse tables only when a primary key exists](https://learn.microsoft.com/en-us/fabric/data-engineering/graphql-faq#what-graphql-operations-are-supported-in-fabric-api-for-graphql), so a table without one is queryable but not writable.

**3. Grant the service principal access**

In your Fabric workspace, select the ellipsis (**...**) next to the API for GraphQL item and choose **Manage permissions → Add user**. Search for the service principal by its app registration name, select **Run Queries and Mutations**, then select **Grant**. See Microsoft's guide: [Use service principals with Fabric API for GraphQL](https://learn.microsoft.com/en-us/fabric/data-engineering/api-graphql-service-principal#step-3-grant-permissions-in-fabric).

If the API connects to its data source with single sign-on (SSO) connectivity, also grant the principal read access on the underlying data source, or write access if your app will run mutations.

**4. Enable introspection**

In the API for GraphQL item, go to **API settings → Introspection** (the gear icon in the item's top menu), enable it, and confirm. Only a Fabric workspace admin can change this setting.

> [!WARNING]
>
> Fabric ships with introspection turned off, and this connector does not work without it. Lovable verifies every new connection by running a GraphQL introspection query, and the Lovable agent relies on introspection to discover your schema while it builds. If introspection stays off, the connection fails the moment you click **Connect**.

**5. Copy the endpoint URL**

In the API for GraphQL item, copy the public GraphQL endpoint URL. It looks like `https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/graphqlapis/<api-id>/graphql` and always ends in `/graphql`.

### Step 2: Connect Microsoft Fabric to Lovable

**1. Open Microsoft Fabric in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Microsoft Fabric**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a name that identifies this connection in Lovable (for example, `Fabric Analytics`).

**4. Enter your credentials**

* **Microsoft Entra Tenant ID**: the Directory (tenant) ID from your Microsoft Entra tenant
* **Service Principal Client ID**: the Application (client) ID of the service principal
* **Client Secret**: the client secret value you generated for the service principal
* **Fabric GraphQL Endpoint**: the full URL you copied from the API for GraphQL item, for example `https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/graphqlapis/<api-id>/graphql`. The URL must end in `/graphql`.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable tests the connection immediately by running a GraphQL introspection query against your endpoint. If the test fails, the cause is almost always a skipped item in Step 1; see [Troubleshooting](#troubleshooting).

When connected, you can [link the connection to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it, and start building apps that query your Fabric data.

## Limitations

* **GraphQL API only.** The connector calls your API for GraphQL item and nothing else: no Fabric REST API, no direct SQL endpoints, no OneLake file access. A table your app needs must be added to the API item first.
* **Only Fabric's supported data sources.** Fabric's [API for GraphQL](https://learn.microsoft.com/en-us/fabric/data-engineering/api-graphql-overview#supported-data-sources) exposes Fabric Warehouses, Fabric SQL databases, Fabric Lakehouses, Fabric mirrored databases, and Azure SQL databases. Real-Time Intelligence stores such as Eventhouses and KQL databases are not supported, so you cannot query them through this connector.
* **Writes work on SQL stores only.** Create, update, delete, and stored procedure calls work against Fabric Warehouses, Fabric SQL databases, and Azure SQL databases. Lakehouses and all mirrored sources are exposed through SQL analytics endpoints and are read-only. Fabric generates mutations per writable table, so a view stays read-only even when it lives in a SQL store.
* **Warehouse tables need a primary key to accept writes.** In a Fabric Warehouse, Fabric generates create, update, and delete fields only for tables that have a defined primary key. A Warehouse table without one appears in the schema with read fields only, so define the primary key in the Warehouse and refresh the API item's schema before your app tries to write to it.
* **The schema is what the API item owner exposed.** Your app sees the tables, views, and relationships added to the API for GraphQL item, with the permissions granted to the service principal, and nothing more.
* **Platform ceilings.** Fabric returns 100 items per request by default, returns at most 100,000 rows per query across all pages, caps responses at 64 MB, and times out requests after 100 seconds. It also limits each query to 10 levels of nesting, which is the ceiling on how far your app can traverse relationships in a single request, and allows at most 1000 attached objects per API for GraphQL item. See Fabric's [API for GraphQL limitations](https://learn.microsoft.com/en-us/fabric/data-engineering/api-graphql-limits) for the full list.
* **This connector has no per-end-user Microsoft login.** Everything built on a connection queries Fabric through the same shared service principal. Create separate connections with separate service principals to segment access, or use the Microsoft Fabric **[app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md)** so each end user signs in with their own Microsoft account and queries under their own Fabric permissions.

## Manage your Microsoft Fabric connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Microsoft Fabric**, then open the connection.

* **Unlink projects** to remove Microsoft Fabric access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Microsoft Fabric stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.

## Troubleshooting

Lovable verifies every Microsoft Fabric connection the moment you click **Connect**, so failures surface immediately and trace back to configuration in Fabric or Microsoft Entra. These are the most common:

> **The connection fails immediately after clicking Connect**
>
> The most common cause is introspection. Lovable verifies each new connection with a GraphQL introspection query, and Fabric ships with introspection disabled, so an untouched API for GraphQL item fails this test every time. The error message mentions that introspection is disabled.
>
> A Fabric workspace admin must open the API for GraphQL item, go to **API settings → Introspection**, enable it, and confirm. Then save the connection again in Lovable.

> **Microsoft Fabric rejected the service principal (HTTP 401 or 403)**
>
> Fabric is refusing requests from the service principal. Ask a Fabric tenant admin to enable **Service principals can call Fabric public APIs** under **Admin portal → Tenant settings → Developer settings** for the app or a security group that contains it, and make sure the principal has been granted **Run Queries and Mutations** on the API for GraphQL item.

> **The connection test returns an empty response**
>
> The service principal reaches the API but gets no data back. Grant it **Run Queries and Mutations** on the API for GraphQL item, and if the API connects to its data source with single sign-on (SSO) connectivity, also grant the principal read or write access on the underlying data source.

> **Microsoft Fabric could not find the GraphQL endpoint (HTTP 404)**
>
> The endpoint URL was not copied correctly. Copy it again from the API for GraphQL item in Fabric and make sure it ends with `/graphql`.


## Related topics

- [Connect your app to Power BI](https://docs.lovable.dev/integrations/power-bi.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to Microsoft 365](https://docs.lovable.dev/integrations/microsoft.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md)
