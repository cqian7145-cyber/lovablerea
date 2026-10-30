# Connect your app to Klaviyo
<!-- source: https://docs.lovable.dev/integrations/klaviyo.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Klaviyo

> Connect your app to Klaviyo, an email and SMS platform, to sync profiles, lists, and events, and to read campaigns and flows.

[Klaviyo](https://www.klaviyo.com/) is an email and SMS marketing platform for customer profiles, lists, campaigns, and flows. The Klaviyo connector lets your Lovable app read and update a Klaviyo account through a shared connection. It's designed for signup forms, profile lookups, and campaign views on a Klaviyo account you already run.

Klaviyo is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

> [!NOTE]
>
> For standard transactional emails (signup confirmations, password resets, receipts, internal notifications), use the built-in [Lovable Emails](https://docs.lovable.dev/features/custom-emails.md). Use the Klaviyo connector when you need Klaviyo profiles, flows, campaigns, SMS, or an account you already manage in Klaviyo.

With Klaviyo, your app can:

* Look up a profile, and create or update a profile without subscribing them
* Subscribe a profile to a list when they give email or SMS consent
* Track events, such as a signup or a purchase
* Read campaigns and flows from the account
* Accept a webhook from a Klaviyo flow into your app

Klaviyo does not subscribe a person to marketing when your app only creates their profile. A signup that should receive email or SMS records consent on the subscribe call.

## Common use cases and example apps

These examples show what you can build with Klaviyo, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Newsletter signup | *Use Klaviyo and build a signup form that subscribes an email address to our list after the visitor checks a consent box.* | **Collect newsletter subscribers with consent.** The app sends the address to Klaviyo only when the visitor agrees to email marketing. |
| Profile lookup | *Use Klaviyo and build an internal page that looks up a customer by email and shows their profile.* | **Find a customer without leaving the app.** The app reads the matching Klaviyo profile and shows the fields Klaviyo returns. |
| Purchase events | *Use Klaviyo and build a checkout that records a Placed Order event in Klaviyo after a successful purchase.* | **Send order activity into Klaviyo.** The app creates an event on the customer's profile when checkout completes. |
| Campaign report | *Use Klaviyo and build a page that lists our recent email campaigns and their status.* | **See campaign status in the app.** The app reads campaigns from the connected Klaviyo account and lists each one. |
| Flow list | *Use Klaviyo and build an admin page that lists our Klaviyo flows by name and status.* | **Review automations from the app.** The app reads flows from the account and shows the name and status Klaviyo returns. |
| SMS opt-in | *Use Klaviyo and build a form that subscribes a phone number to SMS after the visitor confirms consent.* | **Add SMS subscribers who opted in.** The app records SMS marketing consent and subscribes the profile to the list you choose. |

## How to connect Klaviyo

Who can create Klaviyo connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Klaviyo connections using different private API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Klaviyo, make sure you have:

* A Klaviyo account where you are an Owner or Admin
* A Klaviyo private API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API calls through this connector use your Klaviyo account. Billing and rate limits are handled directly by Klaviyo, not Lovable.

### Step 1: Get a Klaviyo private API key

A Klaviyo private API key lets your Lovable app authenticate with Klaviyo. In Klaviyo, only an Owner or Admin can create one. Private keys start with `pk_`. Do not paste the public API key, which is the short site ID.

To create a Klaviyo private API key:

**1. Open API keys**

Click your organization name in the bottom left, then open **Settings**, then **API keys**. You can also open [API keys](https://www.klaviyo.com/settings/account/api-keys) directly.

**2. Create a private API key**

Click **Create Private API Key**. Name the key, for example `Lovable integration`, and choose a scope: **Full**, **Read-only**, or **Custom**. Then select **Create**.

The key needs `accounts:read` so Lovable can confirm the connection. **Full** and **Read-only** include that scope. A **Custom** key has to include it, or **Connect** fails.

A signup that subscribes someone needs `lists:write`, `profiles:write`, and `subscriptions:write`. A **Read-only** key can list profiles, campaigns, and flows, and it cannot subscribe someone. A key that lists profiles needs `profiles:read`. A key that reads campaigns and flows needs `campaigns:read` and `flows:read`.

**3. Copy the key**

Copy the key and store it securely. Klaviyo shows a private API key only once, and you cannot change its scopes later. To use different scopes, delete the key in Klaviyo, create a new one, and update the Lovable connection.

> [!WARNING]
>
> Your private API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Klaviyo documentation for more: [Create a private API key](https://help.klaviyo.com/hc/en-us/articles/7423954176283).

### Step 2: Connect Klaviyo to Lovable

Paste the private API key from Klaviyo into the connection form.

**1. Open Klaviyo in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Klaviyo**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, paste your key into **Private API key**. The hint under the field reads "Your private API key from Klaviyo". **Get value** next to the field opens Klaviyo's API keys page.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the private API key against the Klaviyo API before saving the connection.

When connected, anyone building in a project can ask Lovable in chat to link their project to Klaviyo (based on configured connection-level access). Your Lovable apps can then sync profiles, subscribe people who consent, track events, and read campaigns and flows.

## Limitations

The Klaviyo connector cannot:

* Support per-end-user Klaviyo login. Each connection represents a single Klaviyo account shared across all projects linked to it.

If a request fails because the private API key was revoked or deleted in Klaviyo, create a new key and update the Lovable connection.

## Manage your Klaviyo connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Klaviyo**, then open the connection.

* **Unlink projects** to remove Klaviyo access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Klaviyo stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
