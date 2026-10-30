# Connect your app to Mailgun
<!-- source: https://docs.lovable.dev/integrations/mailgun.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Mailgun

> Connect your app to Mailgun to send transactional email, manage sending domains, and track delivery events from your Lovable app.

[Mailgun](https://www.mailgun.com/) is a transactional email service that lets your Lovable app send email programmatically over the Mailgun API. It's designed for apps that need reliable delivery for receipts, notifications, password resets, alerts, and reports, with detailed tracking for bounces, complaints, and unsubscribes.

Mailgun is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Mailgun, your app can:

* Send transactional email through the Mailgun API
* Send from a verified sending domain you manage in Mailgun
* Track delivery events such as bounces, complaints, and unsubscribes
* Read message and event metadata for auditing or in-app status
* Read domain and route information from your Mailgun account

Mailgun is a good fit when you want to send from your own domain, keep control of your sender reputation, or already manage your sending in Mailgun.

> [!TIP]
>
> For standard transactional emails (signup confirmations, password resets, receipts, internal notifications), use the built-in [Lovable Emails](https://docs.lovable.dev/features/custom-emails.md).
>
> Lovable Emails can also send from your own domain. Use the Mailgun connector when you need more volume than Lovable Emails offers, Mailgun's delivery tooling, or already manage your sending in Mailgun.

## Common use cases and example apps

These examples show what you can build with Mailgun, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Order confirmations and receipts** | *Use Mailgun and build a store that sends order confirmation and receipt emails after checkout.* | **Send transactional notifications from app events.** The app triggers Mailgun email sends whenever a user completes a purchase or status changes. |
| **Account lifecycle email** | *Use Mailgun and build a signup flow that sends password reset and email-verification messages from `noreply@mydomain.com`.* | **Power account-lifecycle email from your own domain.** The app generates secure links and sends them through Mailgun using your verified sending domain. |
| **Form-to-email apps** | *Use Mailgun and build a contact form that emails submissions to our support inbox.* | **Turn form submissions into routed emails.** The app validates the submission, formats the content, and sends it to the right recipient through Mailgun. |
| **Scheduled reports and digests** | *Use Mailgun and build a dashboard that emails a weekly KPI digest every Monday at 9am.* | **Deliver recurring reports by email.** The app compiles the data, renders an email, and sends it on a schedule. |
| **Alerts and monitoring** | *Use Mailgun and build an order monitor that emails me whenever an order over \$1,000 is placed.* | **Surface high-signal events through email alerts.** The app watches for matching events and emails the right people so they can act quickly. |
| **Bounce and deliverability dashboard** | *Use Mailgun and build a dashboard showing bounces, complaints, and unsubscribes from the last 30 days.* | **Use Mailgun event data to monitor deliverability.** The app reads Mailgun events and presents them in-app so you can clean lists and protect sender reputation. |
| **Domain status admin page** | *Use Mailgun and build an admin page that lists our sending domains and their verification status.* | **Surface Mailgun account state inside your app.** The app reads domain information from Mailgun so operators can manage sending without leaving the product. |

## How to connect Mailgun

Who can create Mailgun connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Mailgun connections using different API keys, which is useful for separating environments (for example, development and production), targeting different Mailgun accounts, or using keys with different rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Mailgun, make sure you have:

* A Mailgun account
* A verified sending domain in that Mailgun account
* A Mailgun Private API key
* The region where your Mailgun account is hosted (EU or US)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All email sent through this connector counts toward your Mailgun plan and is billed by Mailgun, not Lovable.

### Step 1: Get a Mailgun Private API key

A Private API key lets your Lovable app authenticate with the Mailgun API. You can create separate keys for different environments or apps.

To create a Mailgun Private API key:

**1. Open your Mailgun account**

Sign in to the [Mailgun app](https://app.mailgun.com/) with the account that owns your sending domain.

**2. Open API keys**

Go to [**Account → Security → API keys**](https://app.mailgun.com/app/account/security/api_keys).

**3. Create or copy a Private API key**

Create a new Private API key (give it a descriptive name, for example `Lovable integration`) or copy an existing one.

**4. Note your account region**

Note whether your Mailgun account is hosted in the **EU** or **US** region. You'll need to select the matching region in Lovable.

> [!WARNING]
>
> Your Private API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Mailgun documentation for detailed instructions: [Mailgun API reference](https://documentation.mailgun.com/docs/mailgun/api-reference/intro/).

### Step 2: Connect Mailgun to Lovable

You can create multiple connections using different API keys.

**1. Open Mailgun in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Mailgun**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Mailgun Prod`. This name is only used inside Lovable to identify the connection.
2. **API region**: select the region your Mailgun account is hosted in, **European Union (api.eu.mailgun.net)** or **United States (api.mailgun.net)**. The default is **European Union**. The region must match the account the API key belongs to. A US key does not authenticate against the EU API.
3. **Private API key**: paste your Mailgun Private API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Mailgun API for the selected region before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Mailgun (based on configured connection-level access). Your Lovable apps can then send email and read account data through Mailgun.

## Sending from your domain

Mailgun sends email from domains you've verified in your Mailgun account. The connector does not configure DNS or verify domains for you.

Before sending, make sure your sending domain is set up in the Mailgun app and shows as verified, with the required DKIM and SPF records added at your DNS provider.

When prompting Lovable, mention the address you want to send from (for example, `noreply@mydomain.com`) so your app uses it consistently.

## Limitations

The Mailgun connector cannot:

* Verify or register sending domains for you. Configure these in the Mailgun app first.
* Receive Mailgun event webhooks through the connector. Poll Mailgun's events API instead, or configure webhooks in Mailgun to an endpoint outside Lovable.
* Refresh or rotate API keys automatically. To rotate, generate a new key in Mailgun and update the Lovable connection.
* Use more than one region per connection. A single connection authenticates against either the EU or US Mailgun API.
* Support per-end-user Mailgun login. Each connection represents a single Mailgun account shared across all projects linked to it.

## Manage your Mailgun connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Mailgun**, then open the connection.

* **Unlink projects** to remove Mailgun access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Mailgun stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
