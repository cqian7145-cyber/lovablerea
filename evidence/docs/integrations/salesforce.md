# Connect your app to Salesforce
<!-- source: https://docs.lovable.dev/integrations/salesforce.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Salesforce

> Connect your app to Salesforce, a CRM platform, to read and manage Accounts, Contacts, Cases, and other records.

[Salesforce](https://www.salesforce.com/) is a CRM platform for managing customer relationships, sales pipelines, and support cases. The Salesforce connector lets your Lovable app query and update CRM records through your own Salesforce org. It's designed for internal tools, customer portals, and support dashboards that need live access to Salesforce data.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Salesforce connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Salesforce account and work with their own data |

With Salesforce, your app can:

* Query Accounts, Contacts, Leads, Cases, and other standard objects using SOQL.
* Display and filter CRM records in dashboards and internal tools.
* Create and update records via the Salesforce REST API.
* Run custom SOQL queries for reporting and data exports.

It's a good fit for sales ops tools, support portals, and any app that surfaces Salesforce data to your team.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Support case dashboard | *Use Salesforce and build a dashboard showing open Cases by priority and status.* | **A live view of your support queue, organized by priority.** The app pulls Cases from Salesforce and groups them so agents can see what needs attention first. |
| Account health tracker | *Use Salesforce and build an internal tool showing Account health scores and recent activity.* | **A per-account summary with activity history and key fields.** The app runs SOQL queries to surface contact counts, open opportunities, and recent case history for each account. |
| Lead pipeline viewer | *Use Salesforce and build a pipeline board showing Leads by stage and owner.* | **A Kanban-style board of your Leads, organized by sales stage.** The app queries Salesforce Leads and renders them by status so reps can track progress across their pipeline. |
| Contact directory | *Use Salesforce and build a searchable directory of Contacts with their account and role.* | **A filterable contact list tied to your Salesforce org.** The app fetches Contact records and lets users search by name, account, or role without leaving the tool. |
| Case detail view | *Use Salesforce and build a support portal where users can look up their Cases by email.* | **A self-service portal for customers to check their open Cases.** The app queries Cases by supplied email and displays status, subject, and latest update for each one. |
| Sales activity report | *Use Salesforce and build a weekly report of closed opportunities by rep.* | **An automated report of won opportunities, grouped by owner.** The app runs a SOQL query against Opportunities and renders a summary table for your weekly sales review. |

## How to connect Salesforce

Workspace **admins** and **owners** can connect Salesforce. You can create multiple Salesforce connections using different orgs or External Client Apps, which is useful for separating production and sandbox environments.

When the connection is created, Salesforce becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting Salesforce, make sure you have:

* A Salesforce org (Developer Edition, production, or sandbox)
* A Salesforce External Client App with OAuth enabled (see Step 1 below)
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector count against your Salesforce org's API limits. Billing and quota are handled directly by Salesforce, not Lovable.

### Step 1: Create a Salesforce External Client App

Salesforce uses External Client Apps to authorize third-party access via OAuth. You need to create one to get a Client ID and Client Secret for Lovable.

> [!NOTE]
>
> Salesforce no longer allows creating new Connected Apps. External Client Apps are their replacement, and the Lovable connector works identically with both. If you already have a connection set up with a Connected App, it keeps working and needs no migration.

**1. Open Setup in Salesforce**

Sign in to your Salesforce org. Click the gear icon in the top-right corner and select **Setup**.

**2. Navigate to App Manager**

In the left sidebar, search for **App Manager** and select it under **Apps**.

**3. Create a new External Client App**

Click **New External Client App** in the top-right corner.

Fill in the required fields:

* **Name**: for example, `Lovable Integration`
* **API Name**: auto-populated from the name
* **Contact Email**: your email address
* **Distribution State**: leave set to **Local**

**4. Enable OAuth settings**

Expand the **Enable OAuth** section and check **Enable OAuth**.

Set the **Callback URL** to:

```text theme={null}
https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
```

Under **Selected OAuth Scopes**, add:

* **Manage user data via APIs (api)**
* **Perform requests at any time (refresh\_token, offline\_access)**

Leave all other settings at their defaults, then click **Create**.

**5. Retrieve your credentials**

Open your new app in **Setup → External Client App Manager**, select the **Settings** tab, and expand **OAuth Settings**.

Click **Consumer Key and Secret** to view your credentials:

* **Consumer Key**: this is your **Client ID**
* **Consumer Secret**: this is your **Client Secret**

Copy both values and store them securely.

> [!WARNING]
>
> Your Client Secret functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See [Salesforce External Client Apps documentation](https://help.salesforce.com/s/articleView?id=xcloud.external_client_apps.htm) for more detail.

### Step 2: Connect Salesforce to Lovable

**1. Open Salesforce in Connectors**

Go to **Connectors** and select **Salesforce**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Enter your credentials**

Fill in the connection fields:

* **Display name**: name the connection, for example `Salesforce Prod`. This name is only used inside Lovable to identify the connection.
* **Environment**: select **Production** for production orgs and Developer Edition. Select **Sandbox** only if your org is a `test.salesforce.com` sandbox.
* **Account URL**: your org's My Domain URL, for example `https://acme.my.salesforce.com`. Find this in **Setup → My Domain**.
* **Client ID**: the Consumer Key from your External Client App.
* **Client Secret**: the Consumer Secret from your External Client App.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Authorize with Salesforce**

Click **Connect** at the bottom of the form. The Salesforce authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Salesforce if prompted, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Salesforce (based on configured connection-level access). Your Lovable apps can then query and update CRM records through your Salesforce org.

## Limitations

The Salesforce connector cannot:

* Access orgs outside the `*.salesforce.com` domain.
* Use Salesforce Bulk API or Streaming API endpoints.

Each connection represents a single Salesforce org shared across all projects linked to it.

If Salesforce authorization is revoked from the Salesforce side (for example, if the External Client App is deleted or the authorized user's permissions change), you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Troubleshooting

> **I get a redirect\_uri\_mismatch error when connecting.**
>
> Your Salesforce External Client App has the wrong callback URL. In your Salesforce app settings, set the callback URL to exactly:
>
> ```text theme={null}
> https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
> ```
>
> Save the change in Salesforce, wait a few minutes for it to take effect, and connect again. Setups created before July 8, 2026 may have copied an incorrect URL from an earlier version of this page.

## Manage your Salesforce connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Salesforce**, then open the connection.

* **Unlink projects** to remove Salesforce access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Salesforce stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
