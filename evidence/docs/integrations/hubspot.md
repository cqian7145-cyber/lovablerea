# Connect your app to HubSpot
<!-- source: https://docs.lovable.dev/integrations/hubspot.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to HubSpot

> Connect your app to HubSpot, a CRM platform, to manage contacts, track deals, and automate sales and marketing workflows.

[HubSpot](https://www.hubspot.com/) is a customer relationship management (CRM) platform for managing contacts, companies, deals, and support tickets. When connected, your Lovable apps can read and write CRM data, automate workflows, and build internal tools or dashboards on top of your HubSpot account.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared HubSpot connection in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable read your own HubSpot account as context while you build, personal to you |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own HubSpot account and work with their own data |

With HubSpot, your app can:

* Access and manage CRM contacts, companies, and deals
* Create and track sales pipelines and deal stages
* Automate CRM workflows and sales processes
* Retrieve analytics and reporting data
* Manage tickets and customer service interactions

HubSpot is a good fit when your app depends on CRM data, sales pipelines, or customer records stored in HubSpot.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Lead capture forms | *Build a lead capture form. Use HubSpot to create or update a contact when someone submits their name, email, and company.* | **Capture leads directly into your CRM so new contacts appear immediately in HubSpot.** User submits a form, and the app creates or updates a contact record in HubSpot with the provided details so the sales team can follow up. |
| Sales pipeline dashboards | *Build a sales pipeline dashboard. Use HubSpot to pull open deals, group them by stage, and add filters for owner and close date.* | **Visualize sales pipeline activity using data from HubSpot.** The app retrieves deal records from HubSpot, groups them by pipeline stage, and lets users filter the results to understand pipeline health and progress. |
| CRM management tools | *Build a CRM management tool. Use HubSpot to display contacts and deals and allow editing key fields directly from the app.* | **Manage CRM records through a simplified internal interface.** The app retrieves contacts and deals from HubSpot, displays them in editable tables or forms, and writes updates back to the CRM. |
| Support ticket trackers | *Build a support ticket tracker. Use HubSpot to pull open tickets and allow agents to update status and add notes.* | **Manage customer support tickets through a simplified interface.** The app retrieves ticket records from HubSpot, displays them in a filterable list, and lets agents update ticket properties while syncing changes back to the CRM. |
| Contact enrichment tools | *Build a contact enrichment tool. Use HubSpot to update contacts with additional company information or attributes.* | **Enrich CRM contact records with additional company information.** User selects a contact or enters a company domain, and the app updates the HubSpot contact record with attributes such as company size, industry, or website details. |
| CRM-powered client portals | *Build a client portal. Use HubSpot to retrieve company information, deal status, and ticket history for each logged-in customer.* | **Provide clients with visibility into their projects and support activity.** User logs in to a portal where the app retrieves company, deal, and ticket records from HubSpot and displays them in a secure dashboard. |
| Deal notifications and alerts (HubSpot + Slack) | *Build a deal notification workflow. Use HubSpot to detect when deals move to "Closed Won" and send a message to a Slack channel.* | **Notify the team about important pipeline events automatically.** The app monitors deal stage changes in HubSpot and posts formatted alerts to Slack so the team stays informed about new deals and milestones. |

## How to connect HubSpot

Workspace **admins** and **owners** can connect HubSpot.

You can create multiple HubSpot connections using different service keys. This is useful for separating environments (for example, development and production) or limiting access through scoped permissions.

When the connection is created, HubSpot becomes available across all projects in the workspace.

### Prerequisites

Before connecting HubSpot, make sure you have:

* A HubSpot account with **super admin access** or **developer tools permissions** (required to create service keys)
* A HubSpot service key
* Lovable workspace owner or admin role

> [!NOTE]
>
> All API requests made through this connector count toward your HubSpot API usage limits. Limits depend on your HubSpot subscription and are managed by HubSpot, not Lovable.

### Step 1: Create a HubSpot service key

A **service key** allows Lovable to securely access your HubSpot account through the HubSpot API.

To create a HubSpot service key:

1. Go to [HubSpot](https://www.hubspot.com/) and set up your account.
2. Navigate to **Development → Keys → Service keys**.
3. Click **Create service key**.
4. Enter a descriptive name, for example `Lovable integration`.
5. Click **Add new scope** and select the scopes your app needs. For example:
   * `crm.objects.contacts.read` and `crm.objects.contacts.write`
   * `crm.objects.deals.read` and `crm.objects.deals.write`
6. Click **Update** after selecting scopes and review the selected scopes.
7. Click **Create**, then confirm in the dialog box.
8. Open the service key you created, and click **Show** to reveal the key.
9. Click **Copy** to copy it to your clipboard.

> [!NOTE]
>
> Your service key functions like a password. Keep it secure and never share it publicly. You’ll need it in the next step.

See HubSpot docs for detailed instructions: [Service keys](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys).

### Step 2: Connect HubSpot to Lovable

You can create multiple connections using different service keys.

To connect HubSpot:

1. Go to **Connectors** and select **HubSpot**.
2. Click **Connect** on the connector page.
3. **Display name**: name the connection, for example `HubSpot Prod`.
4. **Service key**: enter your HubSpot service key (`pat-xxxx…`).
5. **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.
6. Click **Connect** at the bottom of the form.

When connected, your Lovable apps can access CRM data and manage contacts, deals, and other HubSpot objects.

## Limitations

The HubSpot connector uses **service keys for authentication**, which support REST API requests only.

Service keys cannot:

* Receive HubSpot webhooks or event subscriptions
* Authenticate calls within HubSpot UI extensions

## Manage your HubSpot connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **HubSpot**, then open the connection.

* **Unlink projects** to remove HubSpot access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use HubSpot stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to GitHub API](https://docs.lovable.dev/integrations/github-api.md)
- [App + chat connectors: Add capabilities to your published app and your chat](https://docs.lovable.dev/integrations/app-connectors.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
