# Connect your app to incident.io
<!-- source: https://docs.lovable.dev/integrations/incidentio.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to incident.io

> Connect your app to incident.io to work with incidents, follow-ups, alerts, on-call schedules, status pages, and catalog data.

[incident.io](https://incident.io/) is an incident management platform for coordinating response, managing on-call schedules, communicating status, and tracking follow-up work. The incident.io connector lets your Lovable app read and manage operational data through the incident.io API.

incident.io is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With incident.io, your app can:

* List incidents and display their status, severity, timeline, and updates
* Create and update incidents when the connected API key has the required permissions
* Track follow-ups and outstanding response work
* Review alerts and on-call schedules
* Display status page information
* Read and manage catalog data for services, teams, and other operational resources

incident.io is a good fit when you want to bring incident response data into an internal tool, customer-facing status experience, or operational dashboard.

## Common use cases and example apps

Use incident.io when your app needs operational data or incident-response actions alongside its existing workflows.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Incident command dashboard** | *Use incident.io and build a dashboard that lists open incidents with severity, status, commander, and the latest update.* | **Give responders a focused view of active incidents.** The app reads current incident data and highlights the details that teams need during response. |
| **Incident intake tool** | *Use incident.io and build an internal form that creates a new incident with a summary and severity.* | **Declare incidents from a workflow tailored to your team.** The app validates the form and creates the incident when the connected key has permission to manage incidents. |
| **Follow-up tracker** | *Use incident.io and build a tracker for open follow-ups grouped by incident, assignee, and due date.* | **Keep post-incident work visible until it is complete.** The app reads follow-ups and organizes them into an actionable operations view. |
| **On-call directory** | *Use incident.io and build an on-call directory that shows the current and upcoming responder for each schedule.* | **Help teams find the right responder quickly.** The app reads on-call schedules and presents current and upcoming coverage. |
| **Status page viewer** | *Use incident.io and build a public status page that shows active incidents and recent updates.* | **Communicate service health in an app you control.** The app reads status page data and renders incident updates for your audience. |
| **Alert review console** | *Use incident.io and build a console that groups recent alerts by source, priority, and related incident.* | **Turn incoming alerts into a reviewable operations queue.** The app reads alert data and helps operators identify patterns and escalation needs. |
| **Service catalog explorer** | *Use incident.io and build a searchable service catalog with owners, teams, and related operational metadata.* | **Make service ownership easier to discover.** The app reads incident.io catalog entries and presents them in a searchable directory. |

## How to connect incident.io

Who can create incident.io connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple incident.io connections using different API keys, which is useful for separating environments, incident.io accounts, or permission sets.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting incident.io, make sure you have:

* An incident.io account with access to create API keys
* An incident.io API key with the permissions your app needs
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API requests through this connector count toward incident.io's API limits and any applicable incident.io plan usage. Billing and quota are handled directly by incident.io, not Lovable.

### Step 1: Get an incident.io API key

An incident.io API key lets your Lovable app authenticate with the incident.io API. You choose what the key can do when you create it, using account-level permissions, team-scoped permissions, or both.

To create an incident.io API key:

**1. Open API key settings**

Sign in to [incident.io API key settings](https://app.incident.io/~/settings/api-keys).

**2. Create an API key**

Create a new key and give it a descriptive name, for example `Lovable production`.

**3. Choose permissions**

Select only the permissions your app needs. Include write permissions only if the app creates or changes incidents, follow-ups, or catalog data.

**4. Copy the API key**

Copy the key when incident.io displays it and store it securely. incident.io only shows the token once.

> [!WARNING]
>
> Your API key functions like a password. Paste it only into the incident.io connection form in Lovable. Do not put it in a prompt, URL, browser code, source file, or chat message.

See incident.io documentation for more: [incident.io API authentication](https://docs.incident.io/api-reference/introduction#authentication).

### Step 2: Connect incident.io to Lovable

Open the connection form and enter the API key you created in incident.io.

**1. Open incident.io in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **incident.io**. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for other ways to open the connector catalog.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `incident.io Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste the incident.io API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key with incident.io before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to incident.io (based on configured connection-level access). Your Lovable apps can then call incident.io through Lovable's server-side connector gateway without exposing the incident.io API key to browser code.

## Limitations

The incident.io connector uses a shared API key and keeps requests behind Lovable's server-side gateway.

* Each connection uses one shared incident.io API key. The connector does not support per-end-user incident.io login.
* The connected key controls what data the app can read and change. Lovable cannot grant permissions that the key does not have.
* Lovable does not rotate incident.io API keys automatically. To rotate a key, create a new key in incident.io and update the Lovable connection.
* Calls must run through Lovable's server-side connector gateway. Do not call `api.incident.io` directly from browser code or expose the API key in generated app code.

## Troubleshooting

Use the incident.io response status to identify credential, permission, and rate-limit problems.

* A `401` response usually means the key is invalid or has been revoked. Create a replacement key in incident.io and update the connection.
* A `403` response means the key does not have permission for that endpoint. Create or update a key with the required incident.io permissions. Retrying the same request does not fix a missing permission.
* incident.io applies rate limits, including a default limit of 1,200 requests per minute per API key and lower limits on some endpoints. Cache repeated reads and honor `429` responses and the `Retry-After` header.

## Manage your incident.io connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **incident.io**, then open the connection.

* **Unlink projects** to remove incident.io access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use incident.io stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Apollo.io](https://docs.lovable.dev/integrations/apollo.md)
- [Connect your app to Gong](https://docs.lovable.dev/integrations/gong.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to GatewayAPI](https://docs.lovable.dev/integrations/gatewayapi.md)
- [Connect your app to Firebase Cloud Messaging](https://docs.lovable.dev/integrations/firebase-cloud-messaging.md)
