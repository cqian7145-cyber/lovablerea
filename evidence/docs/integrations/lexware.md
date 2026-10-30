# Connect your app to Lexware
<!-- source: https://docs.lovable.dev/integrations/lexware.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Lexware

> Connect your app to Lexware, an accounting and invoicing platform, to work with contacts, invoices, vouchers, articles, and accounting events from your Lovable app.

[Lexware](https://www.lexware.de/) is an accounting and invoicing platform for managing business contacts, documents, vouchers, payments, and bookkeeping workflows. The Lexware connector lets your Lovable app call the Lexware API through a connected Lexware account. It's designed for apps that need to read or manage operational accounting data from Lexware.

Lexware is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Lexware, your app can:

* Read company profile and accounting settings
* Create and retrieve contacts, articles, invoices, quotations, and vouchers
* Download generated accounting documents, such as invoice PDFs
* React to invoice, payment, and contact changes with Lexware event subscriptions
* Build bookkeeping, sales, and finance workflows around Lexware business data

Lexware is a good fit when your app needs accounting data, document workflows, or back-office automation connected to a Lexware account.

## Common use cases and example apps

These examples show what you can build with Lexware, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Invoice operations dashboard** | *Use Lexware and build a dashboard that lists open invoices, payment status, and customer details.* | **Track invoice work from one internal view.** The app fetches invoice and contact data from Lexware so finance teams can review outstanding work. |
| **Customer accounting portal** | *Use Lexware and build a customer portal that shows invoices, quotations, and downloadable PDFs.* | **Give customers access to accounting documents.** The app retrieves the right documents from Lexware and presents them in a branded portal. |
| **Voucher intake workflow** | *Use Lexware and build a voucher upload and review workflow for incoming expenses.* | **Move expense intake into a guided app.** The app creates or retrieves voucher records in Lexware and helps operators review missing details. |
| **Contact management tool** | *Use Lexware and build an internal tool for searching and updating business contacts.* | **Keep customer and supplier records accessible.** The app reads contact records from Lexware and gives teams a focused interface for finance-related customer data. |
| **Sales quote tracker** | *Use Lexware and build a quotation tracker that shows quote status and related contacts.* | **Monitor quotes before they become invoices.** The app retrieves quotations and related contact data from Lexware for sales and finance follow-up. |
| **Accounting event monitor** | *Use Lexware and build an event monitor for invoice, payment, and contact changes.* | **React to Lexware changes in app workflows.** The app uses event subscriptions to receive change notifications and then fetches updated resources from Lexware. |

## How to connect Lexware

Who can create Lexware connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Lexware connections using different API keys, which is useful for separating environments (for example, development and production) or connecting different Lexware accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Lexware, make sure you have:

* A Lexware account with access to the public API
* A Lexware public API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector use your Lexware API key. API usage, plan limits, and billing are handled directly by Lexware, not Lovable.

### Step 1: Get a Lexware API key

A Lexware public API key lets your Lovable app authenticate with the Lexware API. You can create separate keys for different environments or apps.

To create a Lexware API key:

**1. Open the Lexware public API page**

Sign in to Lexware and open the [Public API page](https://app.lexware.de/addons/public-api). If Lexware asks you to sign in first, complete the sign-in and open the link again.

**2. Create an API key**

Generate a public API key. If Lexware asks for a name, use a descriptive one, for example `Lovable integration`.

**3. Copy the key**

Copy the API key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Lexware documentation for more: [Lexware API documentation](https://developers.lexware.io/docs/).

### Step 2: Connect Lexware to Lovable

You can create multiple connections using different API keys.

**1. Open Lexware in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Lexware**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Lexware Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste your Lexware public API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Lexware API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Lexware (based on configured connection-level access). Your Lovable apps can then work with Lexware accounting, contact, invoice, quotation, voucher, and article data.

## Working with Lexware event subscriptions

Lexware supports event subscriptions for change notifications, including invoice, payment, contact, article, voucher, quotation, and related document events.

When you ask Lovable to build webhook-based Lexware workflows, your app needs a public HTTPS callback endpoint. Lexware sends event notifications to that endpoint and signs each one. The app verifies the signature and then fetches the changed resource from Lexware.

> [!NOTE]
>
> Lexware allows up to 2 requests per second per client across all endpoints. Ask Lovable to use pagination where available, avoid parallel requests, and retry rate-limit responses with backoff.

## Limitations

The Lexware connector cannot:

* Create a Lexware account or API key for you.
* Rotate API keys automatically. To rotate a key, generate a new key in Lexware and update the Lovable connection.
* Keep event subscriptions working after the Lexware API key changes. Lexware removes the subscriptions created with a key when that key is invalidated, so re-create them after updating the connection with a new key.
* Support per-end-user Lexware login. Each connection represents a single Lexware account shared across all projects linked to it.

## Manage your Lexware connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Lexware**, then open the connection.

* **Unlink projects** to remove Lexware access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Lexware stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
