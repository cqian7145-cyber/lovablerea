# Connect your app to Wave
<!-- source: https://docs.lovable.dev/integrations/wave.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Wave

> Connect your app to Wave, an accounting and invoicing platform, to build apps that work with customers, products, invoices, estimates, and business accounting data.

[Wave](https://www.waveapps.com/) is an accounting and invoicing platform for small businesses. The Wave connector lets your Lovable app read and manage business, customer, product, invoice, estimate, vendor, account, sales tax, and transaction data in your Wave account through Wave's GraphQL API. It's designed for small-business dashboards, invoice workflows, customer management tools, and finance operations apps tied to a Wave business.

Wave is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Wave, your app can:

* List your businesses and read accounting metadata
* Create and update customers, products, invoices, and estimates
* Query accounts, sales taxes, vendors, and transactions
* Build small-business finance workflows on top of Wave data

Wave is a good fit when you run your books in Wave and want an app that shows or updates that data without opening Wave.

## Common use cases and example apps

These examples show what you can build with Wave, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Small-business finance dashboard** | *Use Wave and build a dashboard that shows my businesses, customers, unpaid invoices, and recent transactions.* | **Track Wave business activity in one place.** The app reads accounting metadata, invoices, customers, and transactions so a business owner can monitor work without opening Wave. |
| **Invoice management app** | *Use Wave and build an app where I can list invoices, filter by customer, and create draft invoices for new work.* | **Manage invoice workflows from a custom interface.** The app works with Wave invoice and customer data and stores internal workflow notes separately in your Lovable app. |
| **Customer account portal** | *Use Wave and build a customer portal that shows invoice history and customer details for each account manager.* | **Give teams a focused view of customer billing data.** The app reads Wave customers and invoices and organizes them around your internal account management workflow. |
| **Product and service catalog** | *Use Wave and build a catalog manager that lists my products and services and lets me update descriptions and prices.* | **Keep Wave products and services easier to review.** The app reads and updates product records so your team can maintain billing items from a tailored interface. |
| **Estimate tracking tool** | *Use Wave and build an estimate tracker that lists estimates, groups them by status, and helps me follow up with customers.* | **Turn Wave estimates into a sales follow-up workflow.** The app reads estimate and customer data and adds reminders, filters, and internal status tracking. |
| **Vendor and expense overview** | *Use Wave and build an app that shows vendors, accounts, and recent transactions for my finance team.* | **Surface Wave accounting data for operations reviews.** The app queries vendors, accounts, and transactions so finance teams can review activity in a purpose-built view. |

## How to connect Wave

Who can create Wave connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Wave connections using different Wave accounts, which is useful for separating environments or client accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Wave, make sure you have:

* A Wave account with access to the business your app needs
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward the limits of your Wave account. Billing and quota are handled directly by Wave, not Lovable.

### Set up your Wave connection

You authorize Lovable with your Wave account. You do not need an API key or a Wave application of your own.

**1. Open Wave in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Wave**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Wave Main Business`). This name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Under **Scopes**, review the permissions the connection requests. **User: read** and **Business: read** are always included, and every other scope is selected by default.

| Scope | Description | Default |
| :- | :- | :- |
| User: read (`user:read`) | Read the authorized Wave user's profile | Required |
| Business: read (`business:read`) | List and read Wave businesses available to the user | Required |
| Accounts: full access (`account:*`) | Read and manage accounting accounts | On |
| Customers: full access (`customer:*`) | Create, read, and update customers | On |
| Estimates: full access (`estimate:*`) | Create, read, update, and send estimates | On |
| Invoices: full access (`invoice:*`) | Create, read, update, and send invoices | On |
| Products: full access (`product:*`) | Create, read, and update products and services | On |
| Sales taxes: full access (`sales_tax:*`) | Create, read, and update sales taxes | On |
| Transactions: full access (`transaction:*`) | Write and manage money transactions | On |
| Vendors: full access (`vendor:*`) | Create, read, and update vendors | On |

Select only the scopes your app needs. For full API documentation, see [Wave's API reference](https://developer.waveapps.com/hc/en-us/articles/360019968212-API-Reference).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Wave and authorize**

Click **Connect** at the bottom of the form. The Wave authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Wave if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Wave (based on configured connection-level access). Your Lovable apps can then work with the Wave resources covered by the selected scopes.

## Limitations

The Wave connector cannot:

* Receive Wave webhooks or event notifications.
* Support per-end-user Wave login. Each connection represents a single Wave account shared across all projects linked to it.

If Wave authorization is revoked from the Wave side, reconnect the connection in Lovable before API calls can succeed again.

## Manage your Wave connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Wave**, then open the connection.

* **Unlink projects** to remove Wave access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Wave stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
