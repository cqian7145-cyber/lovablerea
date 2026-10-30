# Connect your app to WhatsApp Business
<!-- source: https://docs.lovable.dev/integrations/whatsapp.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to WhatsApp Business

> Connect your app to WhatsApp Business to receive customer messages, send replies and notifications, and manage message templates.

[WhatsApp Business](https://business.whatsapp.com/) lets businesses communicate with customers on WhatsApp. The WhatsApp Business connector lets your Lovable app receive customer messages, send replies and notifications from your business phone number, and manage message templates.

WhatsApp Business is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the chat while you build and in your published apps.

With WhatsApp Business, your app can:

* Receive customer messages and reply from a support inbox or automated workflow
* Send order updates and appointment reminders using approved templates
* Track whether messages are sent, delivered, read, or failed
* List, create, and delete message templates

Use it when your business already uses WhatsApp and you want to handle conversations alongside orders, bookings, or support requests in your app.

## Common use cases and example apps

These examples show what you can build with WhatsApp Business, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Customer support inbox | *Use WhatsApp Business and build an inbox where our team can read and reply to customer messages.* | **Handle support in one place.** The app stores incoming messages and lets staff reply from the business number. |
| Appointment reminders | *Use WhatsApp Business and build a booking app that sends appointment reminders using approved templates.* | **Remind customers before appointments.** The app sends reminders and records delivery status. |
| Order tracking assistant | *Use WhatsApp Business and build an assistant that answers customers who ask about their orders.* | **Answer order questions automatically.** The app looks up an order and replies with its status. |
| Lead response dashboard | *Use WhatsApp Business and build a dashboard that turns incoming inquiries into leads.* | **Keep track of new inquiries.** The app records each lead and lets the sales team follow up. |
| Message template manager | *Use WhatsApp Business and build a tool to create templates and track Meta's approval status.* | **Prepare reusable customer messages.** The app lists templates, submits new ones, and shows when they are approved. |

## How to connect WhatsApp Business

Who can create WhatsApp Business connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

Each connection represents one business account and phone number. You can create multiple connections, but each project can use only one WhatsApp Business connection.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting WhatsApp Business, make sure you have:

* A Meta account with permission to authorize the WhatsApp Business account you want to connect
* An existing WhatsApp Business account and business phone number eligible for Meta's setup flow
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Meta bills you directly for WhatsApp Business usage, not through Lovable
> credits. Meta's
> [pricing](https://business.whatsapp.com/products/platform-pricing), messaging
> limits, and [Business Messaging Policy](https://business.whatsapp.com/policy)
> apply, including customer opt-in requirements.

### Set up your WhatsApp Business connection

You authorize the connection through Meta's guided signup. You do not need to create a Meta developer app or copy an API key.

**1. Open WhatsApp Business in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **WhatsApp Business**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details** and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect with Meta**

Click **Connect** at the bottom of the form. A Meta Embedded Signup window opens, so make sure your browser doesn't block pop-ups.

Sign in to Meta if prompted, select your business account and phone number, and review the requested permissions. If Meta offers the option to connect your existing WhatsApp Business app, follow its on-screen instructions.

Complete the signup and wait for Lovable to finish setting up the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to WhatsApp Business (based on configured connection-level access). Your Lovable apps can then send messages from the connected business phone number.

## Receive messages and delivery updates

Lovable automatically selects the first project linked to your connection to receive incoming messages and delivery updates. You do not need to select it manually. Linking another project keeps the existing destination.

The receiving project needs a message receiver, and it must be a newer Lovable app (created from May 13, 2026, which uses TanStack Start). If it is an older React + Vite app, [upgrade it to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) first.

**1. Build and publish the receiver**

In your linked project, ask Lovable to add incoming messages and delivery tracking. For example:

```text wrap theme={null}
Add a WhatsApp Business inbox that stores incoming messages, lets our team reply, and shows delivery status for sent messages.
```

Publish the app after Lovable builds the receiver. Lovable forwards messages and delivery updates from Meta to your published app, so you do not need to set up anything in Meta yourself.

**2. Check the conversation**

Send a WhatsApp message from another phone to your connected business number. If you are unsure which number is connected, ask Lovable to check it. Check that the message appears in your app, then reply from the app and confirm the reply arrives on the phone.

### Receive messages in another project

You can change the destination to another linked project. Only one project receives incoming messages and delivery updates at a time.

**1. Prepare the other project**

Ask Lovable in that project to link the existing WhatsApp Business
connection and build a message receiver. Publish the app when it is ready.

**2. Change the destination**

Open **Connectors → WhatsApp Business**, then open your connection. Under
**Incoming messages**, select the other project. This setting applies to
everyone using the connection.

Select **None** under **Incoming messages** to stop forwarding events to a project. Other linked projects can still send messages through the connection.

## Send replies and template messages

You can send free-form replies during the 24-hour customer-service window after a customer's most recent message. Outside that window, you must use a Meta-approved message template, such as an order update or appointment reminder.

Ask Lovable to list your templates or create one for your app. Meta reviews new templates before you can send them. For example:

```text wrap theme={null}
Create a WhatsApp appointment reminder template with the customer's name, appointment date, and time. Show its approval status before enabling sends.
```

Templates belong to your WhatsApp Business account, so deleting a template affects every app that uses it. The connector cannot edit an existing template. To change one, create a new template.

To check whether a template is ready, ask Lovable for its review status. Lovable reads the status directly from Meta and tells you in chat whether it is approved, pending, or rejected. You do not need to find it in WhatsApp Manager.

## Sync WhatsApp Business app chats and contacts

If you connect an eligible number from the WhatsApp Business app, your Lovable app can receive messages sent from the phone and request past chats and contacts. Publish the receiver before asking Lovable to import them. If you use the connection in several projects, check that **Incoming messages** points to the project receiving the import.

Meta accepts chat and contact sync requests only within 24 hours of connecting the number. Reconnecting in Lovable alone does not restart this window. After it closes, disconnect the number in the WhatsApp Business app under **Settings → Account → Business Platform → Disconnect Account**, then connect it again in Lovable.

## Limitations

The WhatsApp Business connector has these limitations:

* Incoming messages and delivery updates cannot go to multiple projects at once. Only the project selected under **Incoming messages** receives them.
* Older React + Vite projects cannot receive incoming messages through this connector.
* During Meta's display-name review, Meta may limit the connection to a small number of business-initiated test messages per day.
* The connector does not support per-end-user WhatsApp Business login. Each connection represents one business account and phone number shared across the projects linked to it.

Deleting a connection in Lovable does not unregister your phone number or revoke Lovable's authorization at Meta. Manage those separately in Meta.

## Troubleshooting

If setup or messaging fails, check the following:

> **This phone number has two-step verification turned on but is not connected to the WhatsApp Cloud API**
>
> Lovable shows this message during setup for a number that has a two-step
> verification PIN but has never been connected to the WhatsApp Cloud API.
> Numbers already on the Cloud API and eligible WhatsApp Business app numbers
> do not need this step.
>
> **What to do:** Disable two-step verification for the number in
> **WhatsApp Manager**, then connect again.

> **Incoming messages do not appear in the app**
>
> Incoming messages and delivery updates go to one linked project, the one
> selected under **Incoming messages** on the connection. Lovable selects the
> first project you link, but the selection clears when that project is
> unlinked, and a receiver that is not published receives nothing.
>
> **What to do:** Open **Connectors → WhatsApp Business**, select your
> connection, and check **Incoming messages**. Select the intended project if
> needed. Then ask Lovable to check that the message receiver is published and
> running, and to inspect its logs.

> **Delivery updates arrive, but incoming messages never do**
>
> This comes from a setting in your Meta account, not from Lovable. If the
> number shares a phone set with numbers you use through another WhatsApp
> provider, Meta's Conversation Routing can send every incoming message to
> that provider. Messages you send and their delivery updates still reach
> Lovable, because Meta always returns them to the sender.
>
> **What to do:** In **Meta Business Suite**, open **Conversation Routing**
> and check which provider receives this number's incoming messages. If it
> is another provider, choose one of these options:
>
> * Route the phone set to Lovable. Incoming messages arrive right away, but
>   the other provider stops receiving them on every number in the set.
> * Unlink this number into its own phone set under **Settings → Accounts →
>   WhatsApp Accounts → your primary account → Linked WhatsApp accounts →
>   Unlink number**, then connect it again under **Connectors → WhatsApp
>   Business**. The number keeps its display name and quality rating, but
>   you need to recreate its message templates.
>
> To test the change, send a message from a phone that has not messaged the
> number in the last 24 hours. An open conversation stays with its current
> provider until it has been quiet for 24 hours.
>
> Conversation Routing decides which provider receives incoming messages,
> and Lovable cannot see or change it.

> **Meta rejects a new template**
>
> Meta rejects a template when a variable has no sample value, which produces
> `INVALID_FORMAT`, or when the text is too short for its number of variables,
> which produces "Params Words Ratio Exceeds Limit".
>
> **What to do:** Ask Lovable to check the template's status and the error
> returned when it was created, then to create a revised template with a
> sample value for every variable and more descriptive text around them. Wait
> for Meta's approval before sending it.

> **Meta rejects an outgoing message**
>
> Meta accepts free-form messages only within the 24-hour customer-service
> window after the customer's most recent message. Outside that window it
> accepts approved templates only. Meta also rejects recipient numbers that
> are missing the country code or that include the leading `+`.
>
> **What to do:** Check whether the window is open. Outside it, send an
> approved template with the correct language and values. Send recipient
> numbers as digits only, including the country code and without the leading
> `+`.

## Manage your WhatsApp Business connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **WhatsApp Business**, then open the connection.

* **Unlink projects** to remove WhatsApp Business access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use WhatsApp Business stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Twilio](https://docs.lovable.dev/integrations/twilio.md)
- [Connect your app to Brevo](https://docs.lovable.dev/integrations/brevo.md)
- [Connect your app to Wave](https://docs.lovable.dev/integrations/wave.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
