# Connect your app to Sevdesk
<!-- source: https://docs.lovable.dev/integrations/sevdesk.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Sevdesk

> Connect your app to Sevdesk, an accounting and invoicing platform, to manage contacts, invoices, orders, vouchers, and bookkeeping workflows from your Lovable app.

[Sevdesk](https://www.sevdesk.de/) is an accounting and invoicing platform for managing business contacts, invoices, orders, vouchers, payments, and bookkeeping workflows. The Sevdesk connector lets your Lovable app call the Sevdesk API through a connected Sevdesk account. It's designed for apps that need operational accounting data, finance workflows, or back-office tools connected to Sevdesk.

Sevdesk is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Sevdesk, your app can:

* List and manage customers, suppliers, and contact addresses
* Create and retrieve invoices, orders, vouchers, and credit notes
* Build bookkeeping workflows around payments and account data
* Query accounting resources such as countries, tax rules, and categories

Sevdesk is a good fit when your team already keeps its books in Sevdesk and wants a Lovable app to read or update those records.

## Common use cases and example apps

These examples show what you can build with Sevdesk, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Invoice dashboard** | *Use Sevdesk and build an invoice dashboard that lists open invoices, due dates, customers, and payment status.* | **Track invoice work from one internal view.** The app fetches invoice and contact data from Sevdesk so finance teams can review outstanding work. |
| **Customer accounting portal** | *Use Sevdesk and build a customer portal that shows invoices, orders, and credit notes for each customer.* | **Give customers access to accounting documents.** The app retrieves the right records from Sevdesk and presents them in a branded portal. |
| **Contact management tool** | *Use Sevdesk and build an internal tool for searching customers, suppliers, and contact addresses.* | **Keep accounting contacts accessible.** The app reads Sevdesk contacts, including person contacts, and gives teams a focused interface for customer and supplier data. |
| **Voucher review workflow** | *Use Sevdesk and build a voucher review workflow for incoming expenses and receipts.* | **Move expense review into a guided app.** The app creates or retrieves voucher records in Sevdesk and helps operators review missing details. |
| **Order tracking app** | *Use Sevdesk and build an order tracking app that shows active orders and related customer records.* | **Monitor orders before they become invoices.** The app retrieves orders and related contacts from Sevdesk for sales and finance follow-up. |
| **Bookkeeping resource browser** | *Use Sevdesk and build an admin page that lists tax rules, countries, categories, and check accounts.* | **Surface reference data for finance workflows.** The app reads Sevdesk accounting resources so operators can use consistent values in internal workflows. |

## How to connect Sevdesk

Who can create Sevdesk connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Sevdesk connections using different API tokens, which is useful for connecting different Sevdesk accounts or users.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Sevdesk, make sure you have:

* A Sevdesk account with API access
* A Sevdesk API token
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector use your Sevdesk API token. API usage, plan limits, and billing are handled directly by Sevdesk, not Lovable.

### Step 1: Get a Sevdesk API token

A Sevdesk API token lets your Lovable app authenticate with the Sevdesk API as one Sevdesk user. The connection can do what that user can do in Sevdesk.

To find your Sevdesk API token:

**1. Open your Sevdesk account**

Sign in to [Sevdesk](https://my.sevdesk.de/) with the account you want to connect.

**2. Open your user settings**

Go to **Settings → Users**, then open the user whose API access you want to use.

**3. Copy the API token**

Find the **API token** field and copy the token. It is 32 characters long and contains only digits and the letters a to f.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Sevdesk documentation for more: [Sevdesk API documentation](https://api.sevdesk.de/).

### Step 2: Connect Sevdesk to Lovable

You can create multiple connections using different API tokens.

**1. Open Sevdesk in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Sevdesk**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Sevdesk Prod`. This name is only used inside Lovable to identify the connection.
2. **API token**: paste your 32-character Sevdesk API token.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Sevdesk API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Sevdesk (based on configured connection-level access). Your Lovable apps can then work with Sevdesk accounting, contact, invoice, order, voucher, and payment data.

## Working with contacts

Sevdesk's contact API separates organizations from person contacts, and a plain contact list returns organizations only. When you ask Lovable to list contacts, say that person contacts should be included. Otherwise individual customers and suppliers do not appear.

For example, ask Lovable:

```text wrap theme={null}
Use Sevdesk and build a contacts page that lists organizations and person contacts from Sevdesk.
```

## Limitations

The Sevdesk connector cannot:

* Create a Sevdesk account or API token for you.
* Rotate API tokens automatically. To rotate a token, generate a new one in Sevdesk and update the Lovable connection.
* Bypass the permissions of the Sevdesk user the token belongs to.
* Support per-end-user Sevdesk login. Each connection represents a single Sevdesk user shared across all projects linked to it.

## Manage your Sevdesk connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Sevdesk**, then open the connection.

* **Unlink projects** to remove Sevdesk access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Sevdesk stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
