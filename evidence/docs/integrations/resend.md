# Connect your app to Resend
<!-- source: https://docs.lovable.dev/integrations/resend.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Resend

> Connect your app to Resend, an email API for developers, to send transactional and marketing emails from your own verified domain.

[Resend](https://resend.com/) is an email API for developers. The Resend connector lets your Lovable app send transactional and marketing emails through your own Resend account, from a domain you have verified in Resend. It's designed for apps that send email as part of a product workflow, such as confirmations, notifications, digests, and campaigns.

Resend is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Resend, your app can:

* Send transactional emails with HTML or plain-text bodies
* Send to multiple recipients, with `cc`, `bcc`, and `reply-to` addresses
* Attach files and tag emails for tracking in Resend
* Read the sending domains and email status in your Resend account

> [!TIP]
>
> For standard transactional emails (signup confirmations, password resets, receipts, internal notifications), use the built-in [Lovable Emails](https://docs.lovable.dev/features/custom-emails.md).
>
> Lovable Emails can also send from your own domain. Use the Resend connector when you need marketing email, Resend's delivery tooling, or already manage your sending in Resend.

## Common use cases and example apps

These examples show what you can build with Resend, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Order confirmations** | *Use Resend and send an order confirmation email after checkout.* | **Send transactional email from app events.** The app sends a confirmation through Resend whenever a customer completes a purchase. |
| **Booking notifications** | *Use Resend and email the customer and our operations team when a booking is created.* | **Notify several recipients from one workflow.** The app sends one email to the customer and a copy to an internal address through Resend. |
| **Onboarding sequence** | *Use Resend and send a welcome email when a new account is created, then a tips email three days later.* | **Automate onboarding touchpoints.** The app schedules and sends onboarding emails through Resend based on signup dates. |
| **Newsletter signup** | *Use Resend and build a newsletter signup form that stores subscribers and sends a campaign to them.* | **Collect subscribers and send campaigns.** The app stores signups in your database and sends each campaign through Resend from your domain. |
| **Alert emails** | *Use Resend and email me whenever an order over \$1,000 is placed.* | **Surface important events by email.** The app watches for matching events and sends an alert through Resend to the right people. |
| **Delivery status page** | *Use Resend and build an admin page that shows the status of the emails we sent this week.* | **Show sending activity inside your app.** The app reads email status from Resend so operators can spot failed sends without leaving the product. |

## How to connect Resend

Who can create Resend connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Resend connections using different API keys, which is useful for separating environments (for example, development and production) or sending from different Resend accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Resend, make sure you have:

* A Resend account
* A verified sending domain in that Resend account, if you want to email people other than yourself
* A Resend API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All email sent through this connector counts toward your Resend plan and is billed by Resend, not Lovable.

### Step 1: Get a Resend API key

An API key lets your Lovable app authenticate with the Resend API. Resend keys have one of two permission levels: **Full access** keys can manage every resource in your account, and **Sending access** keys can only send emails, optionally from a single domain.

To create a Resend API key:

**1. Open your Resend account**

Sign in to [Resend](https://resend.com/) and open [API Keys](https://resend.com/api-keys).

**2. Create a key**

Click **Create API Key**. Give it a descriptive name, for example `Lovable integration`, and choose the permission level. **Sending access** is enough for an app that only sends email. Choose **Full access** if your app also needs to read domains or email status.

**3. Copy the key**

Copy the key and store it securely. Resend shows it only once. Keys start with `re_`.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Resend documentation for more: [API keys](https://resend.com/docs/dashboard/api-keys/introduction) and the [Resend API reference](https://resend.com/docs/api-reference/introduction).

### Step 2: Connect Resend to Lovable

You can create multiple connections using different API keys.

**1. Open Resend in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Resend**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Resend Prod`. This name is only used inside Lovable to identify the connection.
2. **API Key**: paste your Resend API key. Lovable accepts keys that start with `re_`.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Resend API before saving the connection. Both **Full access** and **Sending access** keys pass this check.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Resend (based on configured connection-level access). Your Lovable apps can then send email through your Resend account.

## Sending from your domain

Resend delivers email to your app's users only from a domain you have verified in Resend. Resend's shared test address, `onboarding@resend.dev`, delivers only to the email address of the Resend account owner, so it works for your own tests but not for real recipients.

Before sending to users, add your domain in Resend and confirm it shows as verified, with the DNS records Resend asks for added at your DNS provider. The connector does not configure DNS or verify domains for you.

When prompting Lovable, mention the address you want to send from (for example, `hello@mydomain.com`) so your app uses it consistently.

After Lovable adds an email flow, test it with recipient addresses you control. If sends fail or are rejected, check the API key on the connection, confirm the sender address and its domain show as verified in Resend, and review the send in Resend's activity log. If a linked project stops sending after you change the connection, open the connection and confirm the project is still linked.

## Limitations

The Resend connector cannot:

* Verify or register sending domains for you. Configure these in Resend first.
* Receive Resend event webhooks through the connector. Point Resend webhooks at your app's own backend endpoint, or read email status from the Resend API instead.
* Support per-end-user Resend login. Each connection represents a single Resend account shared across all projects linked to it.

## Manage your Resend connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Resend**, then open the connection.

* **Unlink projects** to remove Resend access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Resend stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
