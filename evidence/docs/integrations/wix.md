# Connect your app to Wix
<!-- source: https://docs.lovable.dev/integrations/wix.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Wix

> Connect your app to Wix, a website and business platform, to read and manage Wix sites, ecommerce, bookings, CRM, and CMS resources.

[Wix](https://www.wix.com/) is a website and business platform for managing sites, stores, bookings, customer data, and content. The Wix connector lets your Lovable app call Wix APIs with your Wix API key and account ID. It's designed for apps that need to work with Wix site and business data from a Lovable project.

Wix is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Wix, your app can:

* List the Wix sites available to the connected account
* Read and manage ecommerce, bookings, CRM, CMS, and business resources through Wix APIs
* Build dashboards and workflows around Wix account or site data

Wix is a good fit when you already manage sites or business operations in Wix and want a Lovable app to use that account data.

## Common use cases and example apps

These examples show what you can build with Wix, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Wix site dashboard** | *Use Wix and build a dashboard that lists all sites in my Wix account and shows key status details.* | **Show Wix account data in one internal view.** The app lists the sites available to the connected account so operators can choose the right site before fetching site-level data. |
| **Ecommerce order operations** | *Use Wix and build an admin page for reviewing recent store orders and customer details.* | **Manage Wix store operations from a Lovable app.** The app calls Wix ecommerce APIs so your team can review order and customer information in a custom workflow. |
| **Booking management panel** | *Use Wix and build a booking operations dashboard for upcoming appointments and customer records.* | **Bring Wix booking data into a workflow app.** The app reads bookings and presents schedule and customer context for your operations team. |
| **CRM customer lookup** | *Use Wix and build a customer lookup tool that searches CRM contacts and displays recent activity.* | **Search Wix CRM data from an internal tool.** The app retrieves contact records and related business data for support, sales, or account management workflows. |
| **CMS content browser** | *Use Wix and build a content browser that lets editors review CMS collections for a selected site.* | **Review Wix CMS data outside the Wix dashboard.** The app uses the selected site to fetch content collections and presents them in a focused editorial view. |
| **Multi-site operations app** | *Use Wix and build an operations tool that starts by asking which Wix site to manage, then shows relevant store and site details.* | **Support accounts with multiple Wix sites.** The app queries the connected account's sites first, then uses the selected site for site-level API calls. |

## How to connect Wix

Who can create Wix connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Wix connections using different API keys and account IDs, which is useful for separating environments (for example, development and production) or managing multiple Wix accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Wix, make sure you have:

* A Wix account
* A Wix API key from the API Keys Manager
* The Wix account ID associated with that API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector use your Wix API key. Wix API usage, quotas, and billing are handled directly by Wix, not Lovable.

### Step 1: Get a Wix API key and account ID

A Wix API key and account ID let your Lovable app authenticate with Wix APIs. Wix scopes each key to the permissions you grant it when you create it.

To get the values you need:

**1. Open your Wix account**

Sign in to [Wix](https://www.wix.com/) with the account you want to connect.

**2. Open the API Keys Manager**

Open the [API Keys Manager](https://manage.wix.com/account/api-keys).

**3. Create or copy an API key**

Create a new API key for Lovable, or copy an existing key you want this connection to use. Give new keys a descriptive name, for example `Lovable integration`, and grant the permissions your app needs.

**4. Copy your account ID**

Copy the account ID shown in the API Keys Manager. You need it when connecting Wix in Lovable.

> [!WARNING]
>
> Your Wix API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Wix documentation for more: [About API keys](https://dev.wix.com/docs/api-reference/articles/authentication/api-keys/about-api-keys).

### Step 2: Connect Wix to Lovable

You can create multiple connections using different API keys and account IDs.

**1. Open Wix in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Wix**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Wix Prod`. This name is only used inside Lovable to identify the connection.
2. **Account ID**: paste the Wix account ID from the API Keys Manager.
3. **API key**: paste your Wix API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Wix API by listing the sites in your account before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Wix (based on configured connection-level access). Your Lovable apps can then read and manage Wix business data through Wix APIs.

## Working with account and site-level APIs

Wix has account-level and site-level API calls. If your app does not know the Wix site ID yet, ask Lovable to list the sites available to the connected account first. Your app can then let someone choose a site before making site-level requests. The connector adds your API key to every call and your account ID to account-level calls. For site-level calls, your app supplies the site ID instead, after someone chooses a site. Your app never handles the Wix API key itself. Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) adds it.

## Limitations

The Wix connector cannot:

* Create or rotate Wix API keys for you. To rotate credentials, create a new key in Wix and update the Lovable connection.
* Choose a Wix site automatically when an account has multiple sites. Your app asks the person using it to select a site.
* Support per-end-user Wix login. Each connection represents one Wix account, API key, and account ID shared across all projects linked to it.

## Manage your Wix connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Wix**, then open the connection.

* **Unlink projects** to remove Wix access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Wix stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
