# Connect your app to Zoho CRM
<!-- source: https://docs.lovable.dev/integrations/zoho-crm.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Zoho CRM

> Connect your app to Zoho CRM, a sales CRM platform, to read and manage leads, contacts, accounts, deals, and other CRM records.

[Zoho CRM](https://www.zoho.com/crm/) is a customer relationship management platform for managing leads, contacts, accounts, deals, activities, and sales workflows. The Zoho CRM connector lets your Lovable app read, search, create, and update CRM records through your own Zoho CRM account.

Zoho CRM is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Zoho CRM, your app can:

* Query and display Leads, Contacts, Accounts, Deals, Tasks, Cases, Products, Quotes, and Invoices
* Search and filter records for dashboards, portals, and internal tools
* Create and update records across standard and custom CRM modules

It's a good fit for sales dashboards, lead intake tools, customer portals, and operational apps that need live CRM data from Zoho CRM.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Lead intake dashboard | *Use Zoho CRM and build a dashboard that shows new Leads by source, status, and owner.* | **Track new leads from Zoho CRM in one focused view.** The app reads Leads from Zoho CRM, groups them by status, and helps sales teams prioritize follow-up. |
| Deal pipeline board | *Use Zoho CRM and build a pipeline board where I can view Deals by stage and update deal status.* | **Manage deal movement from a custom interface.** The app fetches Deals from Zoho CRM, displays them by stage, and writes updates back to the connected CRM account. |
| Account health portal | *Use Zoho CRM and build an account health portal that shows Accounts, related Contacts, and recent activities.* | **Give teams a clear account summary backed by CRM data.** The app reads Accounts, Contacts, Tasks, and Calls so account managers can review context without opening Zoho CRM. |
| Customer lookup tool | *Use Zoho CRM and build a searchable customer lookup tool for Contacts and Accounts.* | **Create a fast internal search experience for customer records.** The app searches Zoho CRM modules and displays the fields your team needs for support or sales workflows. |
| Quote and invoice tracker | *Use Zoho CRM and build a tracker that lists Quotes and Invoices by customer and status.* | **Surface commercial records from Zoho CRM in a reporting view.** The app reads Quotes and Invoices, filters by account or status, and helps teams follow up on open items. |

## How to connect Zoho CRM

Workspace **admins** and **owners** can connect Zoho CRM. App + chat connectors are enabled by default on Free, Pro, and Business plans. On Enterprise plans, workspace admins and owners can manage app + chat connector availability for the workspace. You can create multiple Zoho CRM connections using different Zoho accounts, regions, or OAuth apps, which is useful for separating production and sandbox environments.

When the connection is created, Zoho CRM becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting Zoho CRM, make sure you have:

* A Zoho CRM account
* Access to the Zoho API Console for your Zoho CRM data center to create a Server-based Application
* The data center where your Zoho account is hosted, such as United States, Europe, India, Australia, Japan, Canada, or China
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector count against your Zoho CRM API limits and your Zoho CRM plan. Billing and quota are handled directly by Zoho CRM, not Lovable.

### Step 1: Create a Zoho API console application

Zoho CRM uses OAuth to authorize third-party access. Create a Server-based Application in the Zoho API Console for the same data center as your Zoho CRM account to get the Client ID and Client Secret for Lovable.

| Zoho CRM data center | API Console URL |
| - | - |
| United States (`crm.zoho.com`) | [api-console.zoho.com](https://api-console.zoho.com/) |
| Europe (`crm.zoho.eu`) | [api-console.zoho.eu](https://api-console.zoho.eu/) |
| India (`crm.zoho.in`) | [api-console.zoho.in](https://api-console.zoho.in/) |
| Australia (`crm.zoho.com.au`) | [api-console.zoho.com.au](https://api-console.zoho.com.au/) |
| Japan (`crm.zoho.jp`) | [api-console.zoho.jp](https://api-console.zoho.jp/) |
| Canada (`crm.zohocloud.ca`) | [api-console.zohocloud.ca](https://api-console.zohocloud.ca/) |
| China (`crm.zoho.com.cn`) | [api-console.zoho.com.cn](https://api-console.zoho.com.cn/) |

**1. Open the Zoho API Console**

Sign in to the Zoho API Console URL that matches your Zoho CRM data center.

**2. Create a Server-based Application**

Click **Add Client** or **Get started**, then choose **Server-based Applications**.

**3. Enter application details**

Fill in the application details:

* **Client Name**: for example, `Lovable Integration`
* **Homepage URL**: your app or company website URL
* **Authorized Redirect URIs**: add `https://api.lovable.dev/workspaces/connectors/standard/oauth/callback`

**4. Copy your credentials**

Save the application, then copy the generated **Client ID** and **Client Secret**. You'll enter both values in Lovable.

> [!WARNING]
>
> Your Client Secret functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See [Zoho's API console documentation](https://www.zoho.com/accounts/protocol/oauth.html) for more detail.

### Step 2: Connect Zoho CRM to Lovable

**1. Open Zoho CRM in Connectors**

Go to **Connectors** and select **Zoho CRM**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Enter your connection details**

Fill in the connection fields:

* **Display name**: name the connection, for example `Zoho CRM Prod`. This name is only used inside Lovable to identify the connection.
* **Data center**: choose the region where your Zoho account is hosted. Check your Zoho CRM URL, for example `crm.zoho.eu` means Europe.
* **Client ID**: the Client ID from your Zoho API console application.
* **Client Secret**: the Client Secret from your Zoho API console application.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect to Zoho CRM and authorize**

Click **Connect** at the bottom of the form. The Zoho CRM authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Zoho CRM if prompted, review the requested permissions, and click **Accept** or **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Zoho CRM (based on configured connection-level access). Your Lovable apps can then read, search, create, and update CRM records through your connected Zoho CRM account.

## Limitations

The Zoho CRM connector cannot:

* Support per-end-user Zoho CRM login. Each connection represents a single Zoho CRM account shared across all projects linked to it.
* Bypass Zoho CRM API limits, rate limits, or plan restrictions.
* Return record lists without explicit fields. Zoho CRM rejects list requests that omit the `fields` parameter.
* Receive Zoho CRM webhooks or real-time record-change events.

If Zoho CRM authorization is revoked from the Zoho side, or if the Zoho API console application is deleted or changed, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Zoho CRM connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Zoho CRM**, then open the connection.

* **Unlink projects** to remove Zoho CRM access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Zoho CRM stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Zoho Books](https://docs.lovable.dev/integrations/zoho-books.md)
- [Connect your app to Pipedrive](https://docs.lovable.dev/integrations/pipedrive.md)
- [Connect your app to Salesforce](https://docs.lovable.dev/integrations/salesforce.md)
- [Connect your app to Wix](https://docs.lovable.dev/integrations/wix.md)
- [Connect your app to Attention](https://docs.lovable.dev/integrations/attention.md)
