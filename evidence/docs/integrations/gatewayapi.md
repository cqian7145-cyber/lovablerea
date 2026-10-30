# Connect your app to GatewayAPI
<!-- source: https://docs.lovable.dev/integrations/gatewayapi.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to GatewayAPI

> Connect your app to GatewayAPI, an SMS and RCS messaging API, to send mobile messages, track delivery status, and handle inbound replies from your Lovable app.

[GatewayAPI](https://gatewayapi.com/) is an SMS and RCS messaging platform for sending mobile messages through an API. The GatewayAPI connector lets your Lovable app send SMS and RCS messages, batch-send notifications, and connect delivery events back to app workflows.

GatewayAPI is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With GatewayAPI, your app can:

* Send SMS and RCS messages to phone numbers
* Batch-send mobile messages for notifications and campaigns
* Add labels and references so messages can be matched to orders, bookings, or other app records
* Receive delivery status callbacks through a public webhook endpoint you configure in GatewayAPI
* Receive inbound SMS and RCS replies when your GatewayAPI account supports them

GatewayAPI is a good fit for apps that need transactional alerts, operational notifications, customer messaging, or campaign workflows backed by your GatewayAPI account.

## Common use cases and example apps

These examples show what you can build with GatewayAPI, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Appointment reminders** | *Use GatewayAPI and build an appointment reminder app that sends SMS reminders before each booking.* | **Reduce missed appointments with scheduled SMS reminders.** The app stores bookings, sends GatewayAPI messages before each appointment, and records delivery status for each reminder. |
| **Order status notifications** | *Use GatewayAPI and build an order tracking app that texts customers when their order is packed, shipped, and delivered.* | **Keep customers updated from order events.** The app sends SMS or RCS updates when order status changes and uses message references to connect callbacks to the right order. |
| **Incident alerting** | *Use GatewayAPI and build an incident alert tool that texts on-call staff when a critical event is created.* | **Send high-priority alerts outside email and chat.** The app detects critical incidents, sends mobile alerts through GatewayAPI, and stores delivery results for audit trails. |
| **Two-way support inbox** | *Use GatewayAPI and build a support inbox that receives inbound SMS replies from customers.* | **Turn inbound customer replies into support records.** The app exposes a public webhook endpoint, stores each reply, and shows it to the support team. |
| **Campaign sender** | *Use GatewayAPI and build a campaign tool that sends approved SMS updates to a customer list.* | **Send segmented mobile campaigns from app data.** The app batches recipients, sends messages through GatewayAPI, and tracks callback events for each campaign. |
| **Delivery status dashboard** | *Use GatewayAPI and build a dashboard showing sent, delivered, and failed SMS messages from GatewayAPI webhooks.* | **Monitor message delivery inside your app.** The app saves webhook events, groups them by message reference, and shows delivery trends over time. |

## How to connect GatewayAPI

Who can create GatewayAPI connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple GatewayAPI connections using different API tokens, which is useful for separating environments (for example, development and production), targeting different GatewayAPI accounts, or using separate GatewayAPI domains.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting GatewayAPI, make sure you have:

* A GatewayAPI account
* A GatewayAPI API token
* The GatewayAPI domain where your API token is valid, either **Global (gatewayapi.com)** or **EU (gatewayapi.eu)**
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All SMS, RCS, webhook, and API usage through this connector uses your GatewayAPI account. Messaging costs, quotas, and billing are handled directly by GatewayAPI, not Lovable.

### Step 1: Get a GatewayAPI API token

A GatewayAPI API token lets your Lovable app authenticate with the GatewayAPI messaging APIs. You can create separate tokens for different environments or apps.

To create or copy a GatewayAPI API token:

**1. Open your GatewayAPI account**

Sign in to the [GatewayAPI dashboard](https://app.gatewayapi.com/) with the account you want Lovable to use.

**2. Open API token settings**

In GatewayAPI, open the section where API tokens are managed for your account.

**3. Create or copy an API token**

Create a new API token for Lovable or copy an existing token. Use a descriptive name, for example `Lovable integration`, if GatewayAPI asks for one.

**4. Note your API domain**

Note whether the token belongs to the global GatewayAPI domain (`gatewayapi.com`) or the EU domain (`gatewayapi.eu`). You need to select the matching domain in Lovable.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See GatewayAPI documentation for more information: [GatewayAPI authentication](https://gatewayapi.com/docs/authentication/).

### Step 2: Connect GatewayAPI to Lovable

You can create multiple connections using different API tokens.

**1. Open GatewayAPI in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **GatewayAPI**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `GatewayAPI Prod`. This name is only used inside Lovable to identify the connection.
2. **API domain**: select the GatewayAPI domain where your token is valid. The default is **Global (gatewayapi.com)**. Select **EU (gatewayapi.eu)** for tokens issued for the EU domain.
3. **API token**: paste your GatewayAPI API token.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the GatewayAPI account API for the selected domain before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to GatewayAPI (based on configured connection-level access). Your Lovable apps can then send SMS and RCS messages through GatewayAPI.

## Receiving delivery status and inbound replies

GatewayAPI sends delivery status updates and inbound SMS or RCS messages to webhook endpoints that you configure in the GatewayAPI dashboard. These webhook events do not go through the Lovable connector gateway.

When prompting Lovable to build webhook handling, ask it to:

* Create a public endpoint for GatewayAPI webhook events
* Save each event before responding with a 2xx status
* Respond within 5 seconds so GatewayAPI does not treat the event as failed
* Use GatewayAPI message references to match status callbacks to app records
* Accept only events whose reference matches a record your app created

When you register the webhook in GatewayAPI, add an authentication token. GatewayAPI uses it to sign each callback with a JWT in the `X-Gwapi-Signature` header, and your app verifies that token before trusting the event. Callbacks come from changing IP addresses, so the signature and the message reference are your safeguards against forged events. After Lovable creates the webhook endpoint, register it in the GatewayAPI dashboard for the matching domain.

> [!NOTE]
>
> Inbound SMS requires a short code or keyword leased from GatewayAPI and assigned to the webhook in GatewayAPI. Availability and pricing are handled by GatewayAPI.

## Limitations

The GatewayAPI connector cannot:

* Create, update, or delete GatewayAPI webhooks for you. Configure webhooks in the GatewayAPI dashboard.
* Route delivery status or inbound message webhook events through the connector gateway.
* Lease short codes, keywords, or other inbound messaging resources for you.
* Call GatewayAPI's legacy REST API. Only the messaging API host is reachable through the connector gateway.
* Use more than one GatewayAPI domain per connection. A single connection authenticates against either the global domain or the EU domain.
* Support per-end-user GatewayAPI login. Each connection represents one GatewayAPI API token shared across all projects linked to it.

## Manage your GatewayAPI connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **GatewayAPI**, then open the connection.

* **Unlink projects** to remove GatewayAPI access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use GatewayAPI stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Snowflake](https://docs.lovable.dev/integrations/snowflake.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
- [Connect your app to Twitch](https://docs.lovable.dev/integrations/twitch.md)
