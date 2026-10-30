# Connect your app to Calendly
<!-- source: https://docs.lovable.dev/integrations/calendly.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Calendly

> Connect your app to Calendly, a scheduling automation platform, to build booking flows, event dashboards, and meeting workflows.

[Calendly](https://calendly.com/) is a scheduling automation platform for booking meetings and managing appointment workflows. The Calendly connector lets your Lovable app read scheduled events, list event types, fetch invitee details, create single-use scheduling links, and cancel scheduled events from a connected Calendly account.

Calendly is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Calendly, your app can:

* Read the connected user and organization profile
* List event types and scheduled events with filters and pagination
* Fetch invitee details for scheduled events
* Create single-use scheduling links for embedded booking flows
* Cancel scheduled events on behalf of the connected user

The Calendly connector is a good fit for booking portals, sales handoff tools, customer success dashboards, recruiting workflows, and internal scheduling apps that need to use Calendly account data inside a custom product.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Booking portal | *Use Calendly and build a booking portal that creates a single-use scheduling link when a visitor chooses an event type.* | **Create a custom booking entry point backed by Calendly.** The app lists available event types, creates a single-use scheduling link, and sends the visitor into the right Calendly booking flow. |
| Meeting dashboard | *Use Calendly and build a dashboard that shows upcoming scheduled events for our team.* | **Track scheduled meetings from a connected Calendly account.** The app reads the connected user, lists scheduled events, and displays upcoming meetings with invitee details. |
| Sales handoff tracker | *Use Calendly and build a sales handoff tool that shows booked demos and lets our team mark follow-up status.* | **Turn Calendly demos into a structured sales workflow.** The app pulls scheduled events and invitees, links them to internal follow-up records, and helps the team track next steps. |
| Recruiting scheduler | *Use Calendly and build a recruiting dashboard that lists candidate interviews by event type and date.* | **Organize candidate interviews from Calendly.** The app filters scheduled events by event type, shows interview details, and gives recruiters a focused view of upcoming conversations. |
| Customer success planner | *Use Calendly and build a customer success planner that shows renewal calls, kickoff meetings, and invitee contact details.* | **Give account teams one place to review customer meetings.** The app fetches scheduled events and invitees, groups meetings by account, and keeps customer touchpoints visible. |
| Cancellation workflow | *Use Calendly and build an admin tool that lets our operations team cancel selected scheduled events with a reason.* | **Manage selected Calendly events from an internal tool.** The app lists scheduled events, lets approved teammates choose an event, and sends a cancellation request through Calendly. |

## How to connect Calendly

Workspace **admins** and **owners** can connect Calendly. You can create multiple Calendly connections using different accounts, which is useful for separating environments or managing different teams.

When the connection is created, Calendly becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting Calendly, make sure you have:

* A Calendly account
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector count against Calendly API limits according to your Calendly plan. Billing and quota are handled directly by Calendly, not Lovable.

### Set up your Calendly connection

**1. Open Calendly in Connectors**

Go to **Connectors** and select **Calendly**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Calendly Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose scopes**

Expand **Advanced settings** to choose the permissions your app requests. Lovable pre-selects default scopes that cover common scheduling, booking, and event management use cases. You can enable additional scopes for more advanced workflows or turn off defaults you don't need.

The `users:read` scope is required and cannot be disabled. Only the scopes you select are sent to Calendly during authorization, and Lovable exposes the approved scopes to the agent so it knows which Calendly capabilities your app can use.

**Default scopes (pre-selected):**

| Scope | Description |
| :- | :- |
| Users: read (`users:read`) | Read the connected Calendly user profile. *(Required)* |
| Organizations: read (`organizations:read`) | Read organization details, memberships, and invitations. |
| Event types: read (`event_types:read`) | Read event type details and available times. |
| Scheduled events: read (`scheduled_events:read`) | Read scheduled events, invitees, and no-show data. |
| Availability: read (`availability:read`) | Read user and event-type availability. |
| Scheduling links: write (`scheduling_links:write`) | Create single-use scheduling links from event types. |
| Shares: write (`shares:write`) | Create and customize single-use scheduling links. |
| Scheduled events: write (`scheduled_events:write`) | Create invitees, cancel events, and manage invitee no-shows. |

**Additional scopes (off by default):**

| Scope | Description |
| :- | :- |
| Event types: write (`event_types:write`) | Create or update event types. |
| Availability: write (`availability:write`) | Update event type availability. |
| Locations: read (`locations:read`) | Read configured meeting locations. |
| Routing forms: read (`routing_forms:read`) | Read routing forms and submissions. |
| Groups: read (`groups:read`) | Read group details and relationships. |
| Organizations: write (`organizations:write`) | Invite or remove organization users. |
| Webhooks: read (`webhooks:read`) | Read webhook subscriptions and sample payloads. |
| Webhooks: write (`webhooks:write`) | Create or delete webhook subscriptions. |
| Activity log: read (`activity_log:read`) | Read organization activity logs. |
| Data compliance: write (`data_compliance:write`) | Delete invitee or event data for compliance workflows. |
| Outgoing communications: read (`outgoing_communications:read`) | Read outgoing SMS and email communications. |
| Contacts: read (`contacts:read`) | Read Calendly contacts. |
| Contacts: write (`contacts:write`) | Create, update, and delete Calendly contacts. |

**Pick scopes for common use cases:**

* **Booking portals and meeting dashboards**: the defaults are enough. They cover reading event types, scheduled events, and invitees, and creating single-use scheduling links.
* **Managing event types or availability from your app**: add `event_types:write` and `availability:write`.
* **Routing form integrations**: add `routing_forms:read` to read form submissions and route invitees.
* **Webhook automation**: add `webhooks:read` and `webhooks:write` to manage Calendly webhook subscriptions from your app.
* **CRM-style contact sync**: add `contacts:read` and `contacts:write` to read or update Calendly contacts.
* **Admin and compliance tooling**: add `organizations:write`, `activity_log:read`, and `data_compliance:write` for user management, audit views, or GDPR-style data deletion flows.

For full scope documentation, see [Calendly's scope reference](https://developer.calendly.com/scopes).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Calendly and authorize**

Click **Connect** at the bottom of the form. The Calendly authorization window opens, so make sure your browser does not block pop-ups. If it does, Lovable redirects you instead.

Sign in to Calendly if prompted, review the requested permissions, and click **Allow**.

Lovable redirects you back with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Calendly (based on configured connection-level access). Your Lovable apps can then read Calendly data and perform Calendly actions allowed by the scopes you approved.

## Limitations

The Calendly connector cannot:

* Access Calendly resources that are outside the scopes approved for the connection.
* Use a Calendly endpoint that is unavailable on the connected Calendly plan.
* Call Calendly directly from browser code. Apps should use server-side requests through the Lovable connector gateway.
* Support per-end-user Calendly login. Each connection represents a single Calendly account shared across all projects linked to it.

If Calendly authorization is revoked from the Calendly side, you need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Calendly connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Calendly**, then open the connection.

* **Unlink projects** to remove Calendly access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Calendly stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
