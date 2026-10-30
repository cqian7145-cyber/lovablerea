# Connect your app to Twilio
<!-- source: https://docs.lovable.dev/integrations/twilio.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Twilio

> Connect your app to Twilio to send SMS and MMS messages, make voice calls, and add phone-based communication flows directly to your Lovable app.

[Twilio](https://www.twilio.com/) is a cloud communications platform that lets your app reach users by phone. The Twilio connector lets your Lovable app send SMS and MMS, place voice calls, verify phone numbers, and message over WhatsApp through your own Twilio account. It works well for apps that need real-time text updates, phone verification, or messaging-based workflows.

Twilio is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Twilio, your app can:

* Send and receive SMS and MMS messages
* Make and manage voice calls
* Support WhatsApp messaging flows
* Validate and look up phone numbers

Twilio is a good fit when your app needs to communicate with users by phone or text, rather than only through in-app notifications or email.

## Common use cases and example apps

These examples show what you can build with Twilio, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **SMS notifications and alerts** | *Use Twilio and build an order tracking app that texts customers when their order ships, with a tracking link.* | **Send real-time SMS updates triggered by events in your app.** The app detects a status change, generates the message, and sends it to the customer automatically. |
| **Phone verification flows** | *Use Twilio and build a signup flow that sends users a one-time code by SMS to verify their phone number before creating an account.* | **Add phone-based verification to onboarding or login flows.** The app sends a one-time code, checks the user's input, and confirms the number before continuing. |
| **Appointment reminders** | *Use Twilio and build a booking app that texts customers 24 hours before their appointment and again if the time changes.* | **Send automated reminder messages based on scheduled events in your app.** The app uses booking data to trigger texts at the right time without manual follow-up. |
| **Voice call updates** | *Use Twilio and build a service app that calls customers with a recorded message when their technician is on the way.* | **Trigger outbound voice calls from your app when an update needs immediate attention.** The app places the call and delivers a spoken message to the user. |
| **WhatsApp support inbox** | *Use Twilio and build a customer support app where customers can message the business on WhatsApp and agents can reply from the app.* | **Add WhatsApp as a communication channel in your product.** The app sends and receives messages through Twilio so conversations can be handled inside your workflow. |
| **Phone number validation** | *Use Twilio and build a lead capture form that checks whether a phone number is valid before saving it to the database.* | **Validate and format phone numbers before storing or using them.** The app checks the number through Twilio so your workflows start with cleaner contact data. |

## How to connect Twilio

Who can create Twilio connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Twilio connections using different API keys, which is useful for separating environments (for example, development and production) or managing different Twilio accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Twilio, make sure you have:

* A Twilio account and its **Account SID**
* A Twilio phone number if your app sends SMS or MMS or makes calls
* A Twilio API key with its SID and Secret. A **Standard** key covers sending. To read incoming WhatsApp or MMS media, use a **Main** key or a restricted key with media permissions
* The Twilio **Region** where your account is hosted
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All SMS, MMS, voice, WhatsApp, and other Twilio usage through this connector is billed directly by Twilio based on your Twilio account and plan. Billing is handled by Twilio, not Lovable.

### Step 1: Create a Twilio API key

Twilio authenticates with an **API Key SID** and **Secret** instead of a single token. An API key is safer than your main Auth Token because you can revoke it independently.

To create a Twilio Standard API key:

**1. Open the Twilio Console**

Sign in to the [Twilio Console](https://console.twilio.com/) and go to **Account → API keys & tokens**.

**2. Create the key**

Click **Create API key**. Enter a **Friendly name**, for example `Lovable integration`. Choose the **Region** your account is hosted in: **United States (US1)** for most accounts, **Ireland (IE1)**, or **Australia (AU1)**. Leave **Key type** set to **Standard** and click **Create API key**.

**3. Copy the SID and Secret**

Copy both the **SID** (starts with `SK`) and the **Secret**. Twilio shows the Secret only once, so store it securely before leaving the page.

**4. Note your Account SID**

Copy your **Account SID** (starts with `AC`) from the Twilio Console home page. Twilio API keys are region-specific, so the region you pick here must match the region you select in Lovable.

> [!WARNING]
>
> Your API Key Secret functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

> [!WARNING]
>
> Before sending production SMS traffic, enable **SMS Pumping Protection** and review **SMS Geo Permissions** in the Twilio Console so only the destination countries you need are enabled. SMS pumping is fraud in which attackers trigger large volumes of SMS to numbers they control, at your expense.

See Twilio documentation for more: [Create API keys in the Twilio Console](https://www.twilio.com/docs/iam/api-keys/keys-in-console).

### Step 2: Connect Twilio to Lovable

You can create multiple connections using different API keys.

**1. Open Twilio in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Twilio**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Twilio Prod`. This name is only used inside Lovable to identify the connection.
2. **Region**: select the region you used for the API key, **United States (US1)** (default), **Ireland (IE1)**, or **Australia (AU1)**.
3. **Account SID**: paste your Twilio Account SID (starts with `AC`).
4. **Standard API Key SID**: paste the API key SID you created (starts with `SK`).
5. **API Key Secret**: paste the Secret Twilio showed when you created the key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials against the Twilio API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Twilio (based on configured connection-level access). Your Lovable apps can then send messages, place calls, and look up numbers through Twilio.

## Receiving messages and calls

Twilio delivers incoming messages, delivery status updates, and call events to a webhook URL you configure on your Twilio phone number or messaging service. These webhooks do not go through the Lovable connector gateway. When you ask Lovable to handle incoming messages, it creates a public endpoint in your project. Register that endpoint as the webhook in the Twilio Console.

## Limitations

The Twilio connector cannot:

* Receive Twilio webhooks through the connector gateway. Twilio calls a public endpoint in your app directly.
* Call Twilio APIs other than your account's resources on the core REST API (`/2010-04-01/Accounts/{AccountSid}/...`) and the Messaging, Verify, Lookups, Conversations, and Content APIs.
* Read message media with a key that lacks media permissions. If WhatsApp or MMS photo handling fails with a Twilio permission error (code `70051`), update the connection with a **Main** API key or a restricted key that can read message media.
* Refresh or rotate API keys automatically. To rotate, create a new key in the Twilio Console and update the Lovable connection.
* Support per-end-user Twilio login. Each connection represents a single Twilio account shared across all projects linked to it.

## Manage your Twilio connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Twilio**, then open the connection.

* **Unlink projects** to remove Twilio access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Twilio stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
