# Connect your app to Zoho Books
<!-- source: https://docs.lovable.dev/integrations/zoho-books.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Zoho Books

> Connect your app to Zoho Books, an accounting platform, to read and manage customers, invoices, estimates, bills, expenses, and projects.

[Zoho Books](https://www.zoho.com/books/) is accounting software for managing customers, invoices, estimates, expenses, bills, projects, and bookkeeping workflows. The Zoho Books connector lets your Lovable app read and manage accounting records in your Zoho Books organization through a Zoho client application you register. It's designed for finance dashboards, customer billing portals, expense workflows, and internal accounting tools that need live Zoho Books data.

Zoho Books is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Zoho Books, your app can:

* List your organizations and read settings such as taxes, currencies, and items
* Create and manage customers, vendors, invoices, estimates, and sales orders
* Record customer payments and credit notes
* Read and manage bills, expenses, purchase orders, and projects

Zoho Books is a good fit when your books live in Zoho and you want an app that shows or updates those records without opening Zoho Books.

## Common use cases and example apps

These examples show what you can build with Zoho Books, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Invoice operations dashboard** | *Use Zoho Books and build a dashboard that shows invoices by customer, due date, and payment status.* | **Track invoice status from Zoho Books in one focused view.** The app reads invoices from the connected organization, groups them by status, and helps finance teams follow up on overdue payments. |
| **Customer billing portal** | *Use Zoho Books and build a customer portal where customers can view their invoices, estimates, and payment history.* | **Give customers a self-service view of billing records.** The app fetches customer, invoice, and estimate data from Zoho Books and displays the records tied to each account. |
| **Expense approval tool** | *Use Zoho Books and build an expense approval app where managers can review expenses by project and vendor.* | **Review Zoho Books expenses in a structured approval flow.** The app reads expense records, lets managers filter by project or vendor, and records approval decisions in your app. |
| **Accounts payable tracker** | *Use Zoho Books and build a tracker for bills and purchase orders that flags upcoming due dates.* | **Help operations teams stay ahead of vendor payments.** The app reads bills and purchase orders from Zoho Books and highlights records that need review or payment. |
| **Project finance dashboard** | *Use Zoho Books and build a project dashboard that shows expenses, invoices, and profitability by project.* | **Connect project work to financial outcomes.** The app reads project, expense, and invoice data so teams can monitor budgets and margins without exporting spreadsheets. |

## How to connect Zoho Books

Who can create Zoho Books connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Zoho Books connections using different Zoho accounts, data centers, client applications, or organizations, which is useful for separating production and sandbox environments or managing multiple legal entities.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Zoho Books, make sure you have:

* A Zoho Books account
* Access to the Zoho API Console for your data center, to create a Server-based Application
* The data center where your Zoho Books account is hosted (check your Zoho Books URL, for example `books.zoho.eu` is Europe)
* The Zoho Books organization ID, if you want to pin the connection to one organization
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Zoho Books API limits and plan. Billing and quota are handled directly by Zoho, not Lovable.

### Step 1: Create a Zoho API Console application

Zoho Books authorizes access through a client application you register in the Zoho API Console for the same data center as your Zoho Books account. The connection form in Lovable shows these steps in a **Zoho client app setup** card. The card has a copy button for the redirect URL and links to the API Console for the **Data center** you select in the form. If you open the form first, select the data center before you follow its links.

| Zoho Books data center | API Console URL |
| - | - |
| United States (`books.zoho.com`) | [api-console.zoho.com](https://api-console.zoho.com/) |
| Europe (`books.zoho.eu`) | [api-console.zoho.eu](https://api-console.zoho.eu/) |
| India (`books.zoho.in`) | [api-console.zoho.in](https://api-console.zoho.in/) |
| Australia (`books.zoho.com.au`) | [api-console.zoho.com.au](https://api-console.zoho.com.au/) |
| Japan (`books.zoho.jp`) | [api-console.zoho.jp](https://api-console.zoho.jp/) |
| Canada (`books.zohocloud.ca`) | [api-console.zohocloud.ca](https://api-console.zohocloud.ca/) |
| China (`books.zoho.com.cn`) | [api-console.zoho.com.cn](https://api-console.zoho.com.cn/) |
| Saudi Arabia (`books.zoho.sa`) | [api-console.zoho.sa](https://api-console.zoho.sa/) |

To create the application:

**1. Open the Zoho API Console**

Sign in to the Zoho API Console for your data center, using the table above.

**2. Create a Server-based Application**

Click **Add Client** or **Get started**, then choose **Server-based Applications**.

**3. Enter application details**

Fill in the application details:

* **Client Name**: for example, `Lovable integration`
* **Homepage URL**: your app or company website URL
* **Authorized Redirect URIs**: add `https://api.lovable.dev/workspaces/connectors/standard/oauth/callback`

**4. Copy your credentials**

Save the application, then copy the generated **Client ID** and **Client Secret**. You'll need both in the next step.

> [!WARNING]
>
> Your Client Secret functions like a password. Keep it secure and never share it publicly.

See Zoho documentation for more: [Zoho OAuth overview](https://www.zoho.com/accounts/protocol/oauth.html).

### Step 2: Connect Zoho Books to Lovable

You can create multiple connections using different client applications or Zoho accounts.

**1. Open Zoho Books in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Zoho Books**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Zoho Books Prod`. This name is only used inside Lovable to identify the connection.
2. **Data center**: select where your Zoho Books account is hosted: **United States (.com)**, **Europe (.eu)** (default), **India (.in)**, **Australia (.com.au)**, **Japan (.jp)**, **Canada (.ca)**, **China (.com.cn)**, or **Saudi Arabia (.sa)**.
3. **Client ID**: paste the Client ID from your Zoho API Console application.
4. **Client secret**: paste the Client Secret from your Zoho API Console application.
5. **Organization ID** (optional): enter the numeric ID of the Zoho Books organization the connection should use. Leave it empty if you want your app to pick the organization after connecting.

**4. Review scopes (optional)**

Under **Scopes**, review the Zoho Books permissions the connection requests. **Settings: read** is always included, and Lovable uses it to list your organizations. Every other scope is selected by default.

| Scope | Description | Default |
| - | - | - |
| Settings: read (`ZohoBooks.settings.READ`) | List organizations and read settings data such as users, taxes, currencies, and items | Required |
| Contacts: full access (`ZohoBooks.contacts.ALL`) | Create, read, update, and delete customers and vendors | On |
| Invoices: full access (`ZohoBooks.invoices.ALL`) | Create, read, update, and delete invoices | On |
| Customer payments: full access (`ZohoBooks.customerpayments.ALL`) | Create, read, update, and delete payments received from customers | On |
| Credit notes: full access (`ZohoBooks.creditnotes.ALL`) | Create, read, update, and delete credit notes | On |
| Estimates: full access (`ZohoBooks.estimates.ALL`) | Create, read, update, and delete estimates and quotes | On |
| Sales orders: full access (`ZohoBooks.salesorders.ALL`) | Create, read, update, and delete sales orders | On |
| Purchase orders: full access (`ZohoBooks.purchaseorders.ALL`) | Create, read, update, and delete purchase orders | On |
| Bills: full access (`ZohoBooks.bills.ALL`) | Create, read, update, and delete bills | On |
| Expenses: full access (`ZohoBooks.expenses.ALL`) | Create, read, update, and delete expenses | On |
| Projects: full access (`ZohoBooks.projects.ALL`) | Create, read, update, and delete projects and project tasks | On |

Select only the scopes your app needs. For full scope documentation, see [Zoho Books OAuth scopes](https://www.zoho.com/books/api/v3/oauth/#scopes).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Zoho Books and authorize**

Click **Connect** at the bottom of the form. The Zoho authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Zoho if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Zoho Books (based on configured connection-level access). Your Lovable apps can then read and manage Zoho Books records in your organization.

## Working with organizations

Most Zoho Books records belong to one organization, and Zoho requires the organization ID on calls that read or change them. If you enter **Organization ID** when creating the connection, Lovable reads it from the connection when it writes your app's Zoho Books requests. If you leave it empty, ask Lovable to list your organizations first and use the one you want.

## Limitations

The Zoho Books connector cannot:

* Receive Zoho Books webhook events through the connector.
* Support per-end-user Zoho Books login. Each connection represents a single Zoho account shared across all projects linked to it.

If Zoho authorization is revoked from the Zoho side, or if the Zoho API Console application is deleted or changed, reconnect the connection in Lovable before API calls can succeed again.

## Manage your Zoho Books connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Zoho Books**, then open the connection.

* **Unlink projects** to remove Zoho Books access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Zoho Books stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Zoho CRM](https://docs.lovable.dev/integrations/zoho-crm.md)
- [Connect your app to Sevdesk](https://docs.lovable.dev/integrations/sevdesk.md)
- [Connect your app to Lexware](https://docs.lovable.dev/integrations/lexware.md)
- [Connect your app to Xero](https://docs.lovable.dev/integrations/xero.md)
- [Connect your app to Wix](https://docs.lovable.dev/integrations/wix.md)
