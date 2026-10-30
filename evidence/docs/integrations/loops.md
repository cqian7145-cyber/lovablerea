# Connect your app to Loops
<!-- source: https://docs.lovable.dev/integrations/loops.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Loops

> Connect your app to Loops, an email platform for contacts and transactional email, to create contacts, send events, and send transactional email from your Lovable app.

[Loops](https://loops.so/) is an email platform for contacts, events, and transactional email. The Loops connector lets your Lovable app create and update contacts, send events, and send transactional email through a shared connection. It's designed for apps that already keep contacts and email automations in Loops.

Loops is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

> [!TIP]
>
> For standard transactional emails (signup confirmations, password resets, receipts, internal notifications), use the built-in [Lovable Emails](https://docs.lovable.dev/features/custom-emails.md). Use the Loops connector when you need Loops contacts, mailing lists, events, or transactional email you already manage in Loops.

With Loops, your app can:

* Create or update a contact by email or user ID
* Find a contact by email or user ID
* Subscribe or unsubscribe a contact on a mailing list
* Send an event that starts a Loops automation
* Send a published transactional email

Loops subscribes a new contact to campaign and workflow email by default. Ask to mark them unsubscribed when a signup should not receive marketing email. Sending a transactional email adds the recipient as a marketing contact only when you ask for that. The event name has to match the automation in Loops exactly. Most text fields on a contact, event, or transactional email accept up to 500 characters.

It's a good fit for waitlists, signup forms, and product notifications that should reach people from your Loops audience.

## Common use cases and example apps

These examples show what you can build with Loops, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Newsletter signup | *Use Loops and build a signup form that adds an email address to our audience and subscribes them after they check a consent box.* | **Collect newsletter subscribers who opted in.** The app updates the contact in Loops and subscribes the address only when the visitor agrees to marketing email. |
| Launch waitlist | *Use Loops and build a waitlist form that saves an email address in Loops and marks them unsubscribed from marketing email.* | **Save interest without sending campaign email.** The app creates or updates the contact and marks them unsubscribed. |
| Signup event | *Use Loops and build a signup flow that sends a signed\_up event to Loops after an account is created.* | **Start a Loops automation from a signup.** The app sends an event whose name matches the automation in Loops. |
| Order receipt | *Use Loops and build a checkout that sends our published order receipt transactional email after a purchase.* | **Send a receipt from a published Loops email.** The app sends the transactional email to the buyer and does not add them to the marketing audience. |
| Contact lookup | *Use Loops and build an internal page that looks up a contact by email and shows their details.* | **Find a contact without leaving the app.** The app reads the matching Loops contact and shows the fields Loops returns. |
| List preferences | *Use Loops and build a page where a reader can subscribe or unsubscribe from our mailing lists.* | **Let people manage list membership.** The app updates the contact's mailing lists in Loops from the choices they save. |

## How to connect Loops

Who can create Loops connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Loops connections using different API keys, which is useful for separating environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Loops, make sure you have:

* A Loops account
* A Loops API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API calls through this connector count toward your Loops team's limit of 10 requests per second. Billing and rate limits are handled directly by Loops, not Lovable.

### Step 1: Get a Loops API key

A Loops API key lets your Lovable app authenticate with the Loops API.

To create a Loops API key:

**1. Open API settings**

Sign in to [Loops](https://app.loops.so/) and open [**Settings → API**](https://app.loops.so/settings?page=api).

**2. Generate a key**

Click **Generate key**. You can give the key a name, for example `Lovable integration`.

**3. Copy the key**

Copy the key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Loops documentation for more: [API introduction](https://loops.so/docs/api-reference/intro).

### Step 2: Connect Loops to Lovable

Paste the API key from Loops into the connection form.

**1. Open Loops in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Loops**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, paste your key into **API key**. The hint under the field reads "Your Loops API key". **Get API key** next to the field opens Loops **Settings → API**.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the API key against the Loops API before saving the connection.

When connected, anyone building in a project can ask Lovable in chat to link their project to Loops (based on configured connection-level access). Your Lovable apps can then create and update contacts, send events, and send published transactional email.

## Limitations

The Loops connector cannot:

* Receive Loops webhooks through the connector. Each Loops account supports one webhook endpoint, which you configure in Loops under **Settings → Webhooks**.
* Support per-end-user Loops login. Each connection represents a single Loops account shared across all projects linked to it.

If a request fails because the API key was revoked in Loops, generate a new key under **Settings → API** and update the Lovable connection.

## Manage your Loops connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Loops**, then open the connection.

* **Unlink projects** to remove Loops access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Loops stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Zendesk](https://docs.lovable.dev/integrations/zendesk.md)
- [Connect your app to X (Twitter)](https://docs.lovable.dev/integrations/x.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to GitLab API](https://docs.lovable.dev/integrations/gitlab-api.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
