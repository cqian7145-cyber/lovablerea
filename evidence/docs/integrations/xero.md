# Connect your app to Xero
<!-- source: https://docs.lovable.dev/integrations/xero.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Xero

> Connect your app to Xero, a cloud accounting platform, to work with contacts, invoices, bills, payments, bank transactions, and financial reports.

[Xero](https://www.xero.com/) is a cloud accounting platform for managing contacts, invoices, bills, payments, and bookkeeping workflows. The Xero connector lets your Lovable app work with the accounting data in your Xero organization through a Xero app you register. It's designed for finance dashboards, invoicing workflows, and internal operations tools built on Xero data.

Xero is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Xero, your app can:

* Read and manage contacts, including customers and suppliers
* Create, update, and read sales invoices and bills
* Record and read payments and bank transactions
* Read organization settings, currencies, and tax rates
* Read financial reports such as profit and loss, balance sheet, and aged receivables and payables

A connection reaches the Xero organization you choose during authorization, and Lovable looks up its ID for you. It's a good fit for receivables dashboards, billing portals, expense trackers, and reporting apps that need live accounting data.

## Common use cases and example apps

These examples show what you can build with Xero, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Receivables dashboard** | *Use Xero and build a dashboard that shows open invoices, overdue balances, and aged receivables by customer.* | **Track outstanding revenue from Xero in one place.** The app reads invoices, payments, and the aged receivables report, then highlights the customers that need follow-up. |
| **Invoice creation workflow** | *Use Xero and build a form that creates a draft sales invoice in Xero from an approved internal request.* | **Turn internal approvals into Xero invoices.** The app collects request details, looks up the right contact, and creates the invoice in the connected Xero organization. |
| **Supplier bill tracker** | *Use Xero and build a bill tracker that lists upcoming and overdue bills grouped by supplier.* | **Give finance teams a focused view of payables.** The app reads bills and payments from Xero and shows what is due, what is paid, and what is overdue. |
| **Cash flow monitor** | *Use Xero and build an app that shows recent bank transactions and compares money in against money out per month.* | **Watch cash movement without opening Xero.** The app reads bank transactions and payments, then charts inflows and outflows over time. |
| **Financial reporting portal** | *Use Xero and build a portal that shows the latest profit and loss and balance sheet reports to stakeholders.* | **Share key financial reports in a read-only view.** The app fetches the profit and loss and balance sheet reports from Xero and renders them for people who don't have Xero access. |
| **Customer account tool** | *Use Xero and build a tool where staff can search customers and view their contact details and invoice history.* | **Make Xero customer data easy to look up.** The app reads contacts and their invoices from Xero and gives support and sales teams a quick account overview. |

## How to connect Xero

Who can create Xero connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Xero connections using different Xero apps or accounts, which is useful for separating environments or managing multiple businesses.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Xero, make sure you have:

* A Xero account with access to the organization you want to connect
* A Xero app with a client ID and client secret (you create this in Step 1)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector run through your own Xero app and count toward Xero's rate limits. Billing and quota are handled directly by Xero, not Lovable.

### Step 1: Create a Xero app

The connector authenticates through your own Xero app, so you need a client ID and client secret before connecting.

To create a Xero app:

**1. Open the Xero developer portal**

Sign in to [My Apps](https://developer.xero.com/app/manage) with your Xero account.

**2. Create a new app**

Click **New app**, name it (for example, `Lovable integration`), and choose **Web app** as the integration type.

**3. Set the redirect URI**

In the app's OAuth 2.0 configuration, set the redirect URI to exactly:

```text theme={null}
https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
```

The connection form in Lovable shows the same value in a **Redirect URI** card with a copy button. If the redirect URI doesn't match exactly, Xero fails the authorization with an "Invalid redirect\_uri" error.

**4. Enable the scopes your connection needs**

On the app's **Configuration** page, enable every scope you plan to select in Lovable. Xero apps created after March 2026 support only granular scopes, and Xero rejects the entire authorization if Lovable requests a scope that isn't enabled on the app.

**5. Copy the credentials**

On the **Configuration** page, copy the **Client id** (a 32-character code) and generate a **Client secret**. Copy both and store them securely. You'll need them in the next step.

> [!WARNING]
>
> Your client secret functions like a password. Keep it secure and never share it publicly.

See Xero documentation for more: [Xero OAuth 2.0 guide](https://developer.xero.com/documentation/guides/oauth2/overview/).

### Step 2: Connect Xero to Lovable

You can create multiple connections using different Xero apps.

**1. Open Xero in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Xero**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Xero Prod`. This name is only used inside Lovable to identify the connection.
2. **Client ID**: paste the client ID from your Xero app.
3. **Client Secret**: paste the client secret you generated.

**4. Review scopes (optional)**

Under **Scopes**, review the permissions the connection requests. **Refresh access**, **Organisation settings**, **Contacts**, and **Invoices & bills** are always included. Payments, bank transactions, and the profit and loss, balance sheet, and aged reports are selected by default.

| Scope | Description | Default |
| - | - | - |
| Refresh access (`offline_access`) | Keep the Xero connection working without asking you to reconnect | Required |
| Organisation settings (`accounting.settings`) | Read organisation settings, currencies, tracking categories, and tax rates | Required |
| Contacts (`accounting.contacts`) | Read and manage customers and suppliers | Required |
| Invoices & bills (`accounting.invoices`) | Read and manage sales invoices and bills | Required |
| Payments (`accounting.payments`) | Read and manage payments applied to invoices and bills | On |
| Bank transactions (`accounting.banktransactions`) | Read and manage bank transactions | On |
| Manual journals (`accounting.manualjournals`) | Read and manage manual journals | Off |
| Attachments (`accounting.attachments`) | Read and manage attachments on invoices, bills, and other documents | Off |
| Profit and loss report (`accounting.reports.profitandloss.read`) | Read the profit and loss report | On |
| Balance sheet report (`accounting.reports.balancesheet.read`) | Read the balance sheet report | On |
| Aged receivables & payables reports (`accounting.reports.aged.read`) | Read aged receivables and aged payables reports | On |
| Executive summary report (`accounting.reports.executivesummary.read`) | Read the executive summary report | Off |
| Bank summary report (`accounting.reports.banksummary.read`) | Read the bank summary report | Off |
| Trial balance report (`accounting.reports.trialbalance.read`) | Read the trial balance report | Off |
| Budget summary report (`accounting.reports.budgetsummary.read`) | Read the budget summary report | Off |
| Budgets (`accounting.budgets.read`) | Read budgets and budget lines | Off |

> [!WARNING]
>
> Every scope you select here must also be enabled on your Xero app's **Configuration** page. If a selected scope isn't enabled on the app, Xero rejects the authorization with a "Requested wrong apps scopes" error.

For full scope documentation, see [Xero's scope reference](https://developer.xero.com/documentation/guides/oauth2/scopes/).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Xero and authorize**

Click **Connect** at the bottom of the form. The Xero authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Xero if prompted, choose the organization you want to grant access to, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Xero (based on configured connection-level access). Your Lovable apps can then work with Xero contacts, invoices, bills, payments, bank transactions, and financial reports.

## Limitations

The Xero connector cannot:

* Use Xero's umbrella scopes such as `accounting.transactions` or `accounting.reports.read`. Select the granular scopes instead.
* Support per-end-user Xero login. Each connection represents a single Xero account shared across all projects linked to it.

If Xero authorization is revoked from the Xero side, reconnect the connection in Lovable before API calls can succeed again.

## Troubleshooting

If connecting to Xero fails, the sections below cover the most common errors and how to resolve them.

> **Xero shows "Invalid redirect\_uri" during authorization**
>
> The redirect URI on your Xero app doesn't exactly match the one Lovable uses. Open [My Apps](https://developer.xero.com/app/manage), select your app, and set the redirect URI to exactly `https://api.lovable.dev/workspaces/connectors/standard/oauth/callback`, then try connecting again.

> **Xero shows "Requested wrong apps scopes" during authorization**
>
> A scope selected on your Lovable connection isn't enabled on your Xero app. Either enable the missing scope on the app's **Configuration** page in [My Apps](https://developer.xero.com/app/manage), or deselect it under **Scopes** in Lovable, then try connecting again.

## Manage your Xero connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Xero**, then open the connection.

* **Unlink projects** to remove Xero access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Xero stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
