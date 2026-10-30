# Connect your app to Chargebee
<!-- source: https://docs.lovable.dev/integrations/chargebee.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Chargebee

> Connect your app to Chargebee, a subscription billing and revenue management platform, to manage customers, subscriptions, invoices, checkout, and billing workflows.

[Chargebee](https://www.chargebee.com/) is a subscription billing and revenue management platform for managing customers, subscriptions, invoices, payments, product catalog data, hosted checkout, and billing portal flows. The Chargebee connector lets your Lovable app call the Chargebee API through a workspace-level connection.

Chargebee is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Chargebee, your app can:

* List and manage customers and subscriptions
* Read invoices, credit notes, payments, and orders
* Build billing workflows around products and item prices
* Create hosted checkout pages and billing portal flows

The Chargebee connector is a good fit when your app needs subscription billing data, customer billing workflows, or internal tools backed by your Chargebee account.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Customer billing portal | *Use Chargebee and build a customer billing portal where customers can view their subscription, invoices, and payment status.* | **Give customers access to billing information from Chargebee.** The app reads customer, subscription, invoice, and payment data from Chargebee and presents it in a self-service portal. |
| Subscription admin dashboard | *Use Chargebee and build an admin dashboard for searching customers, viewing subscriptions, and checking invoice status.* | **Help operators manage subscription accounts in one place.** The app lists Chargebee customers and subscriptions so support or finance teams can investigate account status. |
| Checkout flow | *Use Chargebee and build a checkout flow that creates hosted checkout pages for subscription plans.* | **Start subscription checkout from your app.** The app creates Chargebee hosted checkout pages and redirects customers to complete subscription signup. |
| Revenue reporting app | *Use Chargebee and build a revenue dashboard showing recent invoices, payments, credit notes, and orders.* | **Turn billing activity into operational reporting.** The app reads Chargebee billing records and summarizes recent revenue activity for your team. |
| Plan management tool | *Use Chargebee and build an internal tool for reviewing products, item prices, and subscription plan details.* | **Surface product catalog data from Chargebee.** The app reads Chargebee product and price data so teams can inspect plans without leaving the app. |
| Renewal workflow tracker | *Use Chargebee and build a workflow tracker for upcoming subscription renewals and failed payments.* | **Track billing events that need follow-up.** The app uses Chargebee subscription and payment data to highlight accounts that need attention. |

## How to connect Chargebee

Workspace **admins** and **owners** can connect Chargebee.

You can create multiple Chargebee connections using different API keys, which is useful for separating environments (for example, test and production) or connecting different Chargebee sites.

When the connection is created, Chargebee becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting Chargebee, make sure you have:

* A Chargebee account
* Your Chargebee site name, for example `acme-test` from `https://acme-test.chargebee.com`
* A Chargebee API key
* Lovable workspace owner or admin role

> [!NOTE]
>
> All API requests made through this connector use your Chargebee account. API usage, limits, and billing are handled directly by Chargebee, not Lovable.

### Step 1: Get your Chargebee site name and API key

A Chargebee API key lets your Lovable app authenticate with the Chargebee API for your connected site. You can create separate keys for different environments or apps.

To find your site name and create a Chargebee API key:

**1. Open your Chargebee site**

Sign in to [Chargebee](https://app.chargebee.com/login) with the account for the site you want to connect.

**2. Note your site name**

Copy the site name from your Chargebee URL. For example, if your Chargebee URL is `https://acme-test.chargebee.com`, enter `acme-test` in Lovable.

**3. Open API keys**

Follow Chargebee's API key instructions to open the API keys area for your site.

**4. Create or copy an API key**

Create a key for Lovable or copy an existing key with permissions for the Chargebee API actions your app needs. Use a descriptive name, for example `Lovable integration`.

**5. Copy the key**

Copy the API key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You need it in the next step.

See Chargebee documentation for more: [Chargebee API getting started](https://apidocs.chargebee.com/docs/api/getting-started#get-your-api-key).

### Step 2: Connect Chargebee to Lovable

You can create multiple connections using different API keys.

**1. Open Chargebee in Connectors**

Go to **Connectors** and select **Chargebee**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

* **Display name**: name the connection, for example `Chargebee Prod` or `Chargebee Test`.
* **Site name**: enter your Chargebee site name without `.chargebee.com`, for example `acme-test`.
* **API key**: paste your Chargebee API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Chargebee (based on configured connection-level access). Your Lovable apps can then manage customers, subscriptions, invoices, checkout, and billing workflows through Chargebee.

## Limitations

The Chargebee connector cannot:

* Create or manage your Chargebee account or site configuration
* Receive Chargebee webhooks directly through the connector
* Rotate API keys automatically. To rotate a key, create a new key in Chargebee and update the Lovable connection
* Support per-end-user Chargebee login. Each connection represents a single Chargebee account shared across all projects linked to it
* Bypass Chargebee API permissions, limits, or billing rules for your account

## Manage your Chargebee connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Chargebee**, then open the connection.

* **Unlink projects** to remove Chargebee access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Chargebee stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
