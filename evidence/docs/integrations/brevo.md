# Connect your app to Brevo
<!-- source: https://docs.lovable.dev/integrations/brevo.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Brevo

> Connect your app to Brevo to send transactional and marketing emails, manage contacts and lists, and trigger communication workflows from your Lovable app.

[Brevo](https://www.brevo.com/) is a customer communication platform for email, SMS, contacts, and marketing automation. The Brevo connector lets your Lovable app send email and SMS, manage contacts and lists, and trigger automation workflows through your own Brevo account. It's designed for apps that need transactional or marketing messaging, contact management, and multi-channel outreach as part of the product experience.

Brevo is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Brevo, your app can:

* Send transactional and marketing email
* Manage contacts, lists, and segmentation
* Trigger SMS and WhatsApp campaigns when your Brevo account has those channels enabled
* Track delivery and campaign performance events in Brevo

Brevo is a good fit when your app needs branded, high-volume, or multi-channel messaging beyond what Lovable's built-in email provides, or when you already manage contacts and campaigns in Brevo.

> [!TIP]
>
> For standard transactional emails (signup confirmations, password resets, receipts, internal notifications), use the built-in [Lovable Emails](https://docs.lovable.dev/features/custom-emails.md).
>
> Use the Brevo connector when you need marketing campaigns, contact lists, SMS or WhatsApp, or lifecycle automation, or when you already manage your messaging in Brevo.

## Common use cases and example apps

These examples show what you can build with Brevo, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Order confirmations and updates** | *Use Brevo and build a store that sends order confirmation emails and shipping updates after checkout.* | **Send transactional notifications from app events.** The app triggers Brevo email sends whenever order status changes. |
| **CRM-driven outreach app** | *Use Brevo and build a dashboard that syncs leads into Brevo lists and sends targeted campaigns.* | **Keep contacts and campaigns connected to product actions.** The app updates contact attributes and list membership before launching campaigns. |
| **Onboarding lifecycle app** | *Use Brevo and build a signup flow that sends a welcome sequence over email and SMS.* | **Automate onboarding communication across channels.** The app enrolls users in Brevo workflows based on signup and activation milestones. |
| **SMS reminders and alerts** | *Use Brevo and build a booking app that sends SMS reminders 24 hours before each booking and one-time codes on login.* | **Deliver time-sensitive messages over SMS.** The app sends scheduled or event-driven SMS through Brevo on accounts with SMS enabled. |
| **Internal alerts app** | *Use Brevo and build an admin tool that emails the team about failed payments or account risk events.* | **Deliver operational alerts quickly to internal teams.** The app formats event data and sends notifications through Brevo. |
| **Newsletter and announcements** | *Use Brevo and build a signup page that collects subscribers and sends weekly product updates.* | **Run recurring communication from one workflow.** The app captures opt-ins, stores segmentation fields, and triggers campaign sends. |

## How to connect Brevo

Who can create Brevo connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Brevo connections using different API keys, which is useful for separating environments (for example, development and production), giving each key different permissions, or managing rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Brevo, make sure you have:

* A Brevo account
* A Brevo REST API key that starts with `xkeysib-`
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Requests made through this connector are billed by Brevo based on your Brevo plan and usage. Billing is handled by Brevo, not Lovable.

### Step 1: Create a Brevo API key

A Brevo REST API key lets your Lovable app authenticate with the Brevo API. You can create separate keys for different environments or apps.

To create an API key in Brevo:

**1. Open Brevo API key settings**

Sign in to [Brevo](https://app.brevo.com/) and open [**SMTP & API → API keys**](https://app.brevo.com/settings/keys/api).

**2. Generate a new API key**

Click **Generate a new API key** and give it a descriptive name, for example `Lovable integration`. Choose the permissions the key needs based on what your app does, for example transactional email, contacts, or SMS, then click **Generate**.

**3. Copy and store the key**

Copy the key and store it securely. Brevo API keys start with `xkeysib-`.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Brevo documentation for more: [Brevo API reference](https://developers.brevo.com/reference).

### Step 2: Connect Brevo to Lovable

You can create multiple connections using different API keys.

**1. Open Brevo in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Brevo**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Brevo Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste your Brevo API key. Lovable accepts keys that start with `xkeysib-`.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Brevo API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Brevo (based on configured connection-level access). Your Lovable apps can then send email and SMS, manage contacts, and use Brevo's other API features.

## Limitations

The Brevo connector cannot:

* Receive incoming Brevo webhooks or delivery events through the connector. Poll Brevo's events APIs instead, or configure webhooks in Brevo to an endpoint outside Lovable.
* Refresh or revoke credentials automatically. To rotate, generate a new API key in Brevo and update the Lovable connection.
* Send SMS or WhatsApp messages on accounts where those channels are not enabled or have no available credits. Feature availability depends on your Brevo account, plan, and enabled channels.
* Support per-end-user Brevo login. Each connection represents a single Brevo account shared across all projects linked to it.

## Manage your Brevo connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Brevo**, then open the connection.

* **Unlink projects** to remove Brevo access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Brevo stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
