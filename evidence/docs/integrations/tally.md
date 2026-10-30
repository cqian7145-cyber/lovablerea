# Connect your app to Tally
<!-- source: https://docs.lovable.dev/integrations/tally.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Tally

> Connect your app to Tally, the free-form builder, to create forms, fetch submissions, and manage form workflows from your Lovable app.

[Tally](https://tally.so/) is a form builder that lets you create forms and surveys without code. The Tally connector lets your Lovable app create forms, list the forms in your Tally workspace, and fetch their submissions through the Tally API. It's designed for apps that collect responses in Tally and work with them somewhere else, like dashboards, admin panels, and follow-up workflows.

Tally is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Tally, your app can:

* List the forms in your Tally workspace
* Fetch submissions and question metadata for a form
* Create forms and manage form workflows
* Verify the connected account

> [!TIP]
>
> For real-time workflows, prefer [Tally webhooks](https://tally.so/help/webhooks) pointed at an endpoint in your app instead of polling for new submissions.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Feedback dashboard** | *Use Tally and build a dashboard that shows the latest submissions from my feedback form.* | **Turn form responses into a live dashboard.** The app fetches submissions from Tally and renders them as browsable, filterable feedback. |
| **Lead follow-up tool** | *Use Tally and build an app that lists new leads from my contact form and lets me mark them as contacted.* | **Manage form leads inside your app.** The app pulls contact-form submissions and tracks follow-up status for each lead. |
| **Survey results explorer** | *Use Tally and build a results explorer that charts the answers from my customer survey.* | **Visualize survey answers.** The app reads submissions and question metadata and turns them into charts and summaries. |
| **Event registration manager** | *Use Tally and build an admin page that lists registrations from my event signup form.* | **Track event signups in one place.** The app lists registrations with their answers so organizers can check people in. |
| **Forms overview** | *Use Tally and build an overview page that lists all my Tally forms with submission counts.* | **Surface your Tally workspace in-app.** The app lists your forms so you can jump to the right one quickly. |
| **Instant submission alerts** | *Use Tally webhooks to show new submissions in my app the moment they arrive.* | **React to new submissions in real time.** The app exposes an endpoint that receives Tally webhooks and updates the UI instantly. |

## How to connect Tally

Who can create Tally connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

You can create multiple Tally connections using different API keys, which is useful for separating environments (for example, development and production) or connecting multiple Tally workspaces.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Tally, make sure you have:

* A Tally account
* A Tally API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Tally account's rate limits. Billing and quota are handled directly by Tally, not Lovable.

### Step 1: Get a Tally API key

An API key lets your Lovable app authenticate with the Tally API.

To create a Tally API key:

**1. Open your Tally settings**

Sign in to Tally and go to [**Settings → API keys**](https://tally.so/dashboard/settings/developers).

**2. Create a key**

Create a new API key and give it a descriptive name, for example `Lovable integration`.

**3. Copy the key**

Copy the key and store it securely. Tally API keys start with `tly-`.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Tally documentation for more: [Tally API reference](https://developers.tally.so/api-reference/introduction).

### Step 2: Connect Tally to Lovable

**1. Open Tally in Connectors**

Go to **Connectors** and select **Tally**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Tally Prod`.
2. **API key**: paste your Tally API key (it starts with `tly-`). Use **Open Tally** below the field to jump to the API keys settings if you need to generate one.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against Tally before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Tally (based on configured connection-level access). Your Lovable apps can then create forms, list forms, and fetch submissions through the connector.

## Limitations

The Tally connector cannot:

* Receive Tally webhooks through the connector. Configure Tally webhooks to call an endpoint in your app instead
* Refresh or rotate API keys automatically. To rotate, generate a new key in your Tally API keys settings and update the Lovable connection
* Support per-end-user Tally login. Each connection represents a single Tally account shared across all projects linked to it

## Manage your Tally connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Tally**, then open the connection.

* **Unlink projects** to remove Tally access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Tally stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
