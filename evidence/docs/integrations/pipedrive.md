# Connect your app to Pipedrive
<!-- source: https://docs.lovable.dev/integrations/pipedrive.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Pipedrive

> Connect your app to Pipedrive, a sales CRM, to manage deals, contacts, activities, leads, and sales pipeline data from your Lovable app.

[Pipedrive](https://www.pipedrive.com/) is a sales CRM for managing deals, contacts, activities, leads, and pipelines. The Pipedrive connector lets your Lovable app read and manage CRM data through the Pipedrive API. It's designed for sales dashboards, customer portals, workflow automation, and internal tools that need access to Pipedrive records.

Pipedrive is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Pipedrive, your app can:

* Create, update, and list deals across sales pipelines
* Manage people, organizations, leads, and activities
* Read pipeline, stage, field, and user metadata for CRM workflows
* Build dashboards and automations around Pipedrive CRM data
* Register webhooks when your app needs to react to Pipedrive changes

Pipedrive is a good fit when your team manages sales activity in Pipedrive and wants a custom Lovable app for reporting, operations, customer handoffs, or sales workflows.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Sales pipeline dashboard** | *Use Pipedrive and build a dashboard that shows open deals by stage, owner, and expected close date.* | **Track pipeline health from live CRM data.** The app reads deals, stages, and users from Pipedrive so sales managers can review pipeline movement in one place. |
| **Account handoff tracker** | *Use Pipedrive and build a handoff tracker for won deals that shows the customer, deal value, notes, and next activity.* | **Turn closed-won deals into operational handoffs.** The app pulls deal, person, organization, and activity data so customer-facing teams can pick up the right context. |
| **Lead intake queue** | *Use Pipedrive and build a lead intake queue where new leads can be reviewed, assigned, and moved into the right pipeline.* | **Manage lead qualification from a custom interface.** The app lists leads and related contacts from Pipedrive, then updates records when a lead is ready for follow-up. |
| **Activity follow-up assistant** | *Use Pipedrive and build an app that lists overdue sales activities and lets reps mark them complete after follow-up.* | **Keep sales teams focused on overdue work.** The app reads activities by owner and due date, then updates Pipedrive after reps complete calls, emails, or meetings. |
| **Customer lookup portal** | *Use Pipedrive and build an internal portal where support can search people and organizations before responding to customers.* | **Give support teams quick CRM context.** The app searches Pipedrive contacts and organizations so teams can see account details without switching tools. |
| **Deal-change notifications** | *Use Pipedrive and build a notification workflow that alerts the team when a high-value deal changes stage.* | **React to important CRM changes.** The app uses Pipedrive webhooks or polling to detect deal updates and notify the right team members. |

## How to connect Pipedrive

Who can create Pipedrive connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you can choose between:

* **Connect with Pipedrive**: sign in with your Pipedrive account in one click (OAuth)
* **Use your own credentials**: bring your own Pipedrive API token

You can create multiple Pipedrive connections using different accounts or API tokens, which is useful for separating environments (for example, development and production), connecting different Pipedrive accounts, or managing access for different teams.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Pipedrive, make sure you have:

* A Pipedrive account
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Pipedrive plan limits. Billing and quota are handled directly by Pipedrive, not Lovable.

Follow the setup steps below based on how you want to connect Pipedrive.

**Connect with your Pipedrive account**

Choose this option for the fastest setup. You authorize Lovable's Pipedrive app with your Pipedrive account, and no API token is needed. In the connection form, this option is labeled **Connect with Pipedrive**.

**1. Open Pipedrive in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Pipedrive**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Pipedrive Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose Pipedrive authentication**

Under **Authentication**, select **Connect with Pipedrive**. This is the OAuth option.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Pipedrive and authorize**

Click **Connect** at the bottom of the form. The Pipedrive authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Pipedrive if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation. API calls are routed to your company's own Pipedrive domain automatically.

**Use your own credentials**

Bring your own API token if you want to control the exact Pipedrive user the connection acts as, or your Pipedrive setup does not allow installing Marketplace apps.

### Step 1: Get a Pipedrive API token

A Pipedrive API token lets your Lovable app authenticate with the Pipedrive API as the Pipedrive user who owns the token.

To find your Pipedrive API token:

**1. Open your Pipedrive account**

Sign in to [Pipedrive](https://app.pipedrive.com/) with the account you want your Lovable app to use.

**2. Open personal preferences**

Open your profile menu and go to **Personal preferences**.

**3. Open the API tab**

Select the **API** tab. If you do not see an API tab, check that your Pipedrive plan and role allow API access.

**4. Copy the token**

Copy your API token and store it securely.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You need it in the next step.

See Pipedrive documentation for more: [How to find the API token](https://pipedrive.readme.io/docs/how-to-find-the-api-token).

### Step 2: Connect Pipedrive to Lovable

With your API token ready, add the connection in Lovable. You can create multiple connections using different API tokens.

**1. Open Pipedrive in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Pipedrive**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Pipedrive Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Authentication**, select **Use your own credentials**. Then paste your Pipedrive API token in **API token**.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Pipedrive (based on configured connection-level access). Your Lovable apps can then read and manage Pipedrive CRM data.

## Working with Pipedrive data and webhooks

Each connection represents one Pipedrive user, whether it connects with OAuth or an API token, and API calls use that user's Pipedrive permissions.

If your app needs to react to CRM changes, ask Lovable to set up Pipedrive webhooks for the events you care about, such as deal creation, deal stage changes, or lead updates. Pipedrive sends webhook events to a public endpoint in your app. For critical workflows, combine webhooks with periodic API checks because webhook deliveries are not guaranteed by Pipedrive.

When prompting Lovable, be specific about the records and operations your app needs. For example, mention whether the app should work with deals, leads, people, organizations, activities, pipelines, or stages.

## Limitations

The Pipedrive connector cannot:

* Create a Pipedrive account for you
* Manage Pipedrive billing, plans, roles, or API access settings
* Support per-end-user Pipedrive login. Each connection represents a single Pipedrive user account shared across projects linked to it.
* Rotate API tokens automatically. For connections that use your own API token, generate the new token in Pipedrive and update the Lovable connection. OAuth connections refresh their credentials automatically.
* Create a webhook receiver automatically without app code. Ask Lovable to build the public endpoint and register the webhook for the events your app needs.

If Pipedrive authorization is revoked from the Pipedrive side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Pipedrive connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Pipedrive**, then open the connection.

* **Unlink projects** to remove Pipedrive access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Pipedrive stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
