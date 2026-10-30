# Connect your app to PrestaShop
<!-- source: https://docs.lovable.dev/integrations/prestashop.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to PrestaShop

> Connect your app to PrestaShop, an open-source ecommerce platform, to read and manage store catalog, order, customer, and inventory data.

[PrestaShop](https://www.prestashop.com/) is an open-source ecommerce platform for managing online stores, products, orders, customers, stock, and pricing. The PrestaShop connector lets your Lovable app call PrestaShop Webservice through a workspace-level connection. It's designed for store operations tools, ecommerce dashboards, custom storefronts, and workflows that need access to PrestaShop store data.

PrestaShop is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With PrestaShop, your app can:

* Read products, categories, stock levels, and pricing from your store
* Build dashboards for orders, customers, and catalog operations
* Manage PrestaShop Webservice resources your API key can access
* Keep custom storefronts and internal tools connected to ecommerce data
* Use PrestaShop filters, sorting, and field selection for store views

The PrestaShop connector is a good fit when your team runs a PrestaShop store and wants a custom Lovable app for catalog management, reporting, inventory checks, customer support, or store operations.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Store operations dashboard | *Use PrestaShop and build a dashboard that shows recent orders, revenue, top products, and fulfillment status.* | **Give operators one place to monitor store activity.** The app reads orders, products, and customer data from PrestaShop so teams can review store performance without switching tools. |
| Product catalog manager | *Use PrestaShop and build an internal catalog manager for searching products, editing prices, and reviewing categories.* | **Manage catalog details from a custom interface.** The app lists products and categories from PrestaShop and updates records when the connected Webservice key has write permissions. |
| Inventory monitor | *Use PrestaShop and build an inventory monitor that highlights low-stock products and recently changed stock levels.* | **Track stock issues before they affect orders.** The app reads stock availability and product data from PrestaShop and surfaces items that need attention. |
| Customer service portal | *Use PrestaShop and build a support portal where agents can search customers, view recent orders, and check order details.* | **Give support teams store context while helping customers.** The app searches customers and orders from PrestaShop so agents can answer questions faster. |
| Custom storefront | *Use PrestaShop and build a storefront that displays products, categories, prices, and stock from my existing store.* | **Render a storefront from live PrestaShop catalog data.** The app fetches product and category records from PrestaShop and presents them in a customer-facing shopping experience. |
| Fulfillment workflow tracker | *Use PrestaShop and build a fulfillment tracker that groups new orders by status and shows products that need packing.* | **Turn order data into an operational workflow.** The app reads PrestaShop orders and line items so fulfillment teams can prioritize what to process next. |

## How to connect PrestaShop

Workspace **admins** and **owners** can connect PrestaShop.

You can create multiple PrestaShop connections using different store URLs and Webservice API keys, which is useful for separating environments (for example, staging and production) or connecting multiple stores.

When the connection is created, PrestaShop becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting PrestaShop, make sure you have:

* A PrestaShop store with Webservice enabled
* Your store's public HTTPS URL, including any subdirectory if the store is not hosted at the domain root
* A PrestaShop Webservice API key with permissions for the resources your app needs
* Lovable workspace owner or admin role

> [!NOTE]
>
> All API requests made through this connector use your PrestaShop store and Webservice API key. Store hosting, API access, quotas, and billing are handled by your PrestaShop setup, not Lovable.

### Step 1: Get a PrestaShop Webservice API key

A PrestaShop Webservice API key lets your Lovable app authenticate with PrestaShop Webservice. API calls use the permissions assigned to that key.

To create a PrestaShop Webservice API key:

**1. Open your PrestaShop back office**

Sign in to the PrestaShop back office for the store you want to connect.

**2. Enable Webservice access**

Open the Webservice settings and enable PrestaShop Webservice if it is not already enabled.

Note your public store URL. For example, use `https://shop.example.com` for a store at the domain root or `https://shop.example.com/prestashop` for a store hosted in a subdirectory.

**3. Create a Webservice key**

Add a new Webservice key for Lovable. Use a descriptive name or description, for example `Lovable integration`.

**4. Choose resource permissions**

Grant the resources and methods your app needs. Common resources include products, categories, orders, customers, and stock availability. For write workflows, include the matching create or update permissions in PrestaShop.

**5. Copy the key**

Copy the Webservice API key and store it securely.

> [!WARNING]
>
> Your Webservice API key functions like a password. Keep it secure and never share it publicly. You need it in the next step.

See PrestaShop documentation for more: [PrestaShop Webservice getting started](https://devdocs.prestashop-project.org/9/webservice/getting-started/).

### Step 2: Connect PrestaShop to Lovable

You can create multiple connections using different store URLs and Webservice API keys.

**1. Open PrestaShop in Connectors**

Go to **Connectors** and select **PrestaShop**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

* **Display name**: name the connection, for example `PrestaShop Prod`.
* **Store URL**: enter your PrestaShop store URL. Include any subdirectory before `/api` if your store is not hosted at the domain root. Do not include query parameters.
* **Webservice API key**: paste your PrestaShop Webservice API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to PrestaShop (based on configured connection-level access). Your Lovable apps can then read and manage catalog, order, customer, and inventory data through PrestaShop.

## Working with PrestaShop Webservice data

The connector sends API calls through Lovable's connector gateway. Do not put your Webservice API key in frontend code, URLs, or custom headers.

Common PrestaShop Webservice paths include `/products`, `/categories`, `/orders`, `/customers`, and `/stock_availables`.

For read-heavy pages, ask Lovable to use PrestaShop Webservice query parameters such as `display`, `filter[...]`, `sort`, and `limit` to request only the data your app needs.

For creates and updates, PrestaShop Webservice often expects XML payloads. Ask Lovable to keep these requests server-side and match the payload format required by the specific PrestaShop endpoint.

## Limitations

The PrestaShop connector cannot:

* Create, host, or configure your PrestaShop store
* Enable Webservice access or assign Webservice permissions in PrestaShop for you
* Bypass the permissions assigned to the connected Webservice API key
* Bypass limits, modules, or hosting constraints in your PrestaShop setup
* Rotate Webservice API keys automatically. To rotate a key, create or update the key in PrestaShop and update the Lovable connection
* Support per-end-user PrestaShop login. Each connection represents a single PrestaShop Webservice API key shared across all projects linked to it.
* Guarantee that every create or update endpoint accepts JSON. Some PrestaShop Webservice writes require XML payloads.

## Manage your PrestaShop connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **PrestaShop**, then open the connection.

* **Unlink projects** to remove PrestaShop access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use PrestaShop stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
