# Connect your app to WooCommerce
<!-- source: https://docs.lovable.dev/integrations/woocommerce.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to WooCommerce

> Connect your app to WooCommerce, an ecommerce plugin for WordPress, to read and manage store products, orders, customers, coupons, and reports.

[WooCommerce](https://woocommerce.com/) is an open-source ecommerce plugin for WordPress that lets you run an online store on infrastructure you control. The WooCommerce connector lets your Lovable app read and manage store data through the WooCommerce REST API. It's designed for storefront dashboards, internal operations tools, product management apps, and customer service workflows backed by your WooCommerce store.

WooCommerce is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With WooCommerce, your app can:

* List and manage products, variations, categories, and inventory
* Read and update orders, refunds, coupons, and customer records
* Build dashboards around revenue, fulfillment, products, and customers
* Create internal storefront admin tools powered by WooCommerce REST APIs
* Automate store workflows that use your WooCommerce data

The WooCommerce connector uses a REST API consumer key and secret from your WooCommerce store. It's a good fit when your store runs on WooCommerce and your Lovable app needs secure server-side access to store operations.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Store operations dashboard** | *Use WooCommerce and build a dashboard that shows today's orders, revenue, low-stock products, and fulfillment status.* | **Give operators one place to monitor store health.** The app reads orders, products, and reports so the team can track daily performance and act on issues. |
| **Inventory management app** | *Use WooCommerce and build an inventory app that lists products, filters by stock status, and updates stock quantities.* | **Keep product inventory current from a custom interface.** The app fetches products and variations, highlights low-stock items, and updates inventory through WooCommerce. |
| **Customer service console** | *Use WooCommerce and build a support console where agents can search customers, view orders, and issue refunds.* | **Help support teams answer store questions faster.** The app searches customer and order records, shows purchase history, and uses permitted WooCommerce actions for order support. |
| **Coupon campaign manager** | *Use WooCommerce and build a coupon manager for creating, listing, and tracking discount codes.* | **Manage promotions without opening WordPress admin.** The app reads and updates coupons, shows active campaigns, and helps operators review usage. |
| **Product catalog editor** | *Use WooCommerce and build a product catalog editor for updating product descriptions, prices, categories, and images.* | **Let teams manage catalog details from a tailored workflow.** The app reads products and sends updates through WooCommerce based on the permissions on your API key. |
| **Fulfillment tracker** | *Use WooCommerce and build a fulfillment tracker that groups open orders by status and flags delayed shipments.* | **Turn order data into a fulfillment queue.** The app reads order status, groups work by priority, and gives staff a focused view of orders that need attention. |
| **Sales reporting app** | *Use WooCommerce and build a sales report that compares products, customers, and coupon performance over time.* | **Create store analytics from WooCommerce data.** The app reads reports, orders, and coupons to show trends and exportable summaries. |

## How to connect WooCommerce

Workspace **admins** and **owners** can connect WooCommerce.

You can create multiple WooCommerce connections using different REST API keys, which is useful for separating environments (for example, development and production), connecting multiple stores, or using keys with different permissions.

When the connection is created, WooCommerce becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting WooCommerce, make sure you have:

* A WooCommerce store with HTTPS enabled
* A WordPress admin account that can manage WooCommerce settings
* Non-plain WordPress permalinks enabled for REST API routes
* A WooCommerce REST API consumer key and consumer secret
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector run against your WooCommerce store. Hosting, plugin, and WooCommerce-related costs are handled outside Lovable.

### Step 1: Get a WooCommerce REST API key

A WooCommerce REST API key lets your Lovable app authenticate with your store. The key permissions you choose in WooCommerce control what the connection can do.

To create a WooCommerce REST API key:

**1. Open your WooCommerce settings**

Sign in to your WordPress admin dashboard for the store you want to connect.

**2. Open REST API keys**

Go to **WooCommerce → Settings → Advanced → REST API**.

**3. Add a key**

Click **Add key**. Enter a description, for example `Lovable integration`, and choose the WordPress user the key belongs to.

**4. Choose permissions**

Choose the permissions your app needs:

* **Read**: use this for dashboards, reports, search, and other read-only apps.
* **Read/Write**: use this when your app needs to create or update products, orders, coupons, customers, refunds, or inventory.

**5. Generate and copy the credentials**

Click **Generate API key**, then copy the **Consumer key** and **Consumer secret**. WooCommerce only shows the consumer secret once.

> [!WARNING]
>
> Your consumer key and consumer secret function like a password. Keep them secure and never share them publicly. You'll need them in the next step.

See WooCommerce documentation for detailed instructions: [WooCommerce REST API key setup](https://woocommerce.com/document/woocommerce-rest-api/).

### Step 2: Connect WooCommerce to Lovable

You can create multiple connections using different WooCommerce REST API keys.

**1. Open WooCommerce in Connectors**

Go to **Connectors** and select **WooCommerce**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

* **Display name**: name the connection, for example `WooCommerce Prod`.
* **Store URL**: enter the HTTPS URL of your WooCommerce store, for example `https://store.example.com`.
* **Consumer key**: paste the WooCommerce REST API consumer key. It starts with `ck_`.
* **Consumer secret**: paste the WooCommerce REST API consumer secret. It starts with `cs_`.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to WooCommerce (based on configured connection-level access). Your Lovable apps can then read and manage WooCommerce data based on the REST API key permissions.

## Working with WooCommerce REST API permissions

WooCommerce controls access through the permissions on the REST API key you create. If your app only needs dashboards, reports, product lists, or customer lookup, use a **Read** key. If your app needs to create or update store data, use a **Read/Write** key.

The connector verifies credentials by listing products from your store. If verification fails with a route error, check that WooCommerce REST API routes work on your store and that WordPress permalinks are not set to **Plain**.

## Limitations

The WooCommerce connector cannot:

* Create WooCommerce REST API keys or change their permissions for you. Configure keys in WordPress admin first.
* Bypass the permissions on the connected REST API key.
* Configure WordPress permalinks, hosting, SSL, plugins, or WooCommerce settings.
* Call general WordPress APIs or WooCommerce endpoints outside the connected store's `/wp-json/wc/v3` REST API path.
* Refresh or rotate consumer keys automatically. To rotate credentials, generate a new key in WooCommerce and update the Lovable connection.
* Support per-end-user WooCommerce login. Each connection represents a single WooCommerce store account shared across all projects linked to it.

## Manage your WooCommerce connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **WooCommerce**, then open the connection.

* **Unlink projects** to remove WooCommerce access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use WooCommerce stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to WordPress (self-hosted)](https://docs.lovable.dev/integrations/wordpress.md)
- [Connect your app to Lightspeed](https://docs.lovable.dev/integrations/lightspeed.md)
- [Connect your app to PrestaShop](https://docs.lovable.dev/integrations/prestashop.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
- [Connect your app to Algolia](https://docs.lovable.dev/integrations/algolia.md)
