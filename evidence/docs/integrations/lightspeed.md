# Connect your app to Lightspeed
<!-- source: https://docs.lovable.dev/integrations/lightspeed.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Lightspeed

> Connect your app to Lightspeed Retail X-Series, a retail POS platform, to work with products, inventory, outlets, customers, and sales data from your Lovable app.

[Lightspeed Retail X-Series](https://www.lightspeedhq.com/pos/retail/) is a retail point-of-sale platform for managing products, inventory, outlets, customers, payments, and sales. The Lightspeed connector lets your Lovable app call the Retail X-Series API through a connected Lightspeed store.

Lightspeed is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Lightspeed, your app can:

* List outlets, registers, payment types, and retail settings
* Read product catalogs, brands, price books, and inventory levels
* Build customer and sales dashboards from Retail X-Series data
* Create workflows around stock, promotions, gift cards, and store credit

By default, Lightspeed connections request read scopes for common retail workflows. You can enable additional advanced scopes when your app needs to create or update resources in Lightspeed.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Retail inventory dashboard** | *Use Lightspeed and build an inventory dashboard that shows stock by outlet, low-stock products, and recent stock changes.* | **Monitor inventory across connected stores.** The app reads product and inventory data from Lightspeed and helps operators spot items that need attention. |
| **Sales performance dashboard** | *Use Lightspeed and build a sales dashboard with daily revenue, payment types, top products, and outlet filters.* | **Track store performance in one view.** The app reads sales, payment, product, and outlet data from Lightspeed so retail teams can review trends without opening the POS. |
| **Customer purchase history portal** | *Use Lightspeed and build a customer lookup tool that shows contact details, customer groups, and recent purchases.* | **Give staff context before customer conversations.** The app combines customer and sales data from Lightspeed in a focused support or store operations screen. |
| **Promotion planning tool** | *Use Lightspeed and build a promotion planner that lists products, brands, prices, and current inventory before a campaign starts.* | **Plan retail campaigns from live catalog data.** The app reads products, price books, promotions, and inventory so merchandisers can choose the right items. |
| **Gift card and store credit tracker** | *Use Lightspeed and build a tracker for gift card balances, store credit transactions, and related customer records.* | **Review customer value balances from Lightspeed.** The app reads gift card and store credit data and links it to customer records for store teams. |
| **Supplier and tax reference browser** | *Use Lightspeed and build an admin page that lists suppliers, tax rates, outlets, and user records for operations teams.* | **Surface Retail X-Series reference data for internal workflows.** The app reads supplier, tax, outlet, and user data so teams can use consistent operational values. |

## How to connect Lightspeed

Who can create Lightspeed connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients). When adding a connection, you can choose between:

* **Managed by Lovable** (no Lightspeed OAuth application required, you only need your store's domain prefix)
* **Lightspeed** (register your own OAuth application with a client ID and client secret)

You can create multiple Lightspeed connections using different Lightspeed stores or OAuth apps, which is useful for separating environments or managing multiple retail accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

> [!NOTE]
>
> All API requests made through this connector count against your Lightspeed Retail X-Series API limits and the permissions on the connected account. Billing and quota are handled directly by Lightspeed, not Lovable.

Follow the setup steps below based on how you want to connect Lightspeed.

**Managed by Lovable**

Choose this option for the fastest setup. You don't need to register an OAuth application in the Lightspeed developer dashboard. Lovable provides and manages the OAuth application, and you authorize it against your own store.

### Prerequisites

Before connecting Lightspeed, make sure you have:

* A Lightspeed Retail X-Series account and store
* Your store domain prefix, from `https://{domain_prefix}.retail.lightspeed.app`
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Set up your Lightspeed connection

**1. Open Lightspeed in Connectors**

Go to **Connectors** and select **Lightspeed**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Lightspeed Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose Managed by Lovable**

Under **Authentication**, select **Managed by Lovable**.

**5. Enter your domain prefix**

In **Domain Prefix**, enter the store prefix from `https://{domain_prefix}.retail.lightspeed.app`, for example `my-store`.

**6. Review scopes (optional)**

Expand **Advanced settings** to review the permissions your app requests. Default scopes are pre-selected for common read-only retail workflows. See [Scopes](#scopes) for the full list.

**7. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**8. Connect to Lightspeed and authorize**

Click **Connect** at the bottom of the form. The Lightspeed authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Lightspeed if prompted, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Lightspeed (based on configured connection-level access). Your Lovable apps can then work with Lightspeed Retail X-Series products, inventory, outlets, customers, sales, and related retail data.

**Your own OAuth app**

Use your own OAuth application if you want to control the application registration, its branding, and its scope set yourself. In the connection form, this option is labeled **Lightspeed**.

### Prerequisites

Before connecting Lightspeed, make sure you have:

* A Lightspeed Retail X-Series account and store
* Access to the [Lightspeed developer dashboard](https://developers.retail.lightspeed.app/applications)
* A Lightspeed OAuth application with a client ID and client secret
* Your store domain prefix, from `https://{domain_prefix}.retail.lightspeed.app`
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Set up your Lightspeed connection

**1. Create or open your Lightspeed OAuth application**

Sign in to the [Lightspeed developer dashboard](https://developers.retail.lightspeed.app/applications). Create an OAuth application for Lovable, or open an existing one you want to use.

**2. Configure the redirect URI**

In your Lightspeed OAuth application, add the redirect URI that Lovable shows during the connect flow. Save the application, then copy the **Client ID** and **Client Secret**.

**3. Open Lightspeed in Connectors**

Go to **Connectors** and select **Lightspeed**.

**4. Add a connection**

Click **Connect** on the connector page.

**5. Name the connection**

In **Display name**, name the connection (for example, `Lightspeed Prod`). This name is only used inside Lovable to identify the connection.

**6. Choose Lightspeed**

Under **Authentication**, select **Lightspeed**. This is the option where you register your own OAuth app.

**7. Configure the connection**

Enter the connection details:

* **Client ID**: paste the client ID from your Lightspeed OAuth application.
* **Client Secret**: paste the client secret from your Lightspeed OAuth application.
* **Domain Prefix**: enter the store prefix from `https://{domain_prefix}.retail.lightspeed.app`, for example `my-store`.

**8. Review scopes (optional)**

Expand **Advanced settings** to review the permissions your app requests. Default scopes are pre-selected for common read-only retail workflows. See [Scopes](#scopes) for the full list.

**9. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**10. Connect to Lightspeed and authorize**

Click **Connect** at the bottom of the form. The Lightspeed authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Lightspeed if prompted, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Lightspeed (based on configured connection-level access). Your Lovable apps can then work with Lightspeed Retail X-Series products, inventory, outlets, customers, sales, and related retail data.

## Scopes

Default scopes are pre-selected for common read-only retail workflows.

| Scope | Description | Default |
| :- | :- | :- |
| Retailer configuration (`retailer:read`) | Read account configuration such as loyalty, timezone, country, and currency. | On |
| Outlets (`outlets:read`) | Read outlets. | On |
| Registers (`registers:read`) | Read registers. | On |
| Payment types (`payment_types:read`) | Read payment types excluding internal payment types. | On |
| Products (`products:read`) | Read products, product types, product images, brands, and tags excluding costs. | On |
| Price books (`products:read:price_books`) | Read product price books. | On |
| Inventory (`inventory:read`) | Read current and historical product inventory levels. | On |
| Customers (`customers:read`) | Read customers and customer groups. | On |
| Sales (`sales:read`) | Read sales and payments. | On |
| Fulfillments (`fulfillments:read`) | Read sale order fulfillments. | On |
| Promotions (`promotions:read`) | Read promotions and promotion product eligibility. | On |
| Gift cards (`gift_cards:read`) | Read gift cards and gift card transactions. | On |
| Store credits (`store_credits:read`) | Read store credit transactions. | On |
| Suppliers (`suppliers:read`) | Read suppliers. | On |
| Taxes (`taxes:read`) | Read tax rates, tax rules, and tax groups where applicable. | On |
| Users (`users:read`) | Read user information except passwords. | On |

Additional write, audit, channel, consignment, payment, serial number, service, and webhook scopes are available but off by default. Only select scopes your app needs.

For full scope documentation, see [Lightspeed's OAuth scope reference](https://x-series-api.lightspeedhq.com/docs/scopes).

## Limitations

The Lightspeed connector cannot:

* Create a Lightspeed account for you
* Bypass Lightspeed API limits, plan limits, connected-user permissions, or selected OAuth scopes
* Provide per-end-user Lightspeed login. Each connection represents a single Lightspeed store authorization shared across projects linked to it
* Deliver Lightspeed webhook events through a Lovable-managed webhook subscription

If Lightspeed authorization is revoked from the Lightspeed side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Lightspeed connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Lightspeed**, then open the connection.

* **Unlink projects** to remove Lightspeed access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Lightspeed stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
