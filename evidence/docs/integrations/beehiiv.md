# Connect your app to beehiiv
<!-- source: https://docs.lovable.dev/integrations/beehiiv.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to beehiiv

> Connect your app to beehiiv, a newsletter platform, to add subscribers and show posts from your Lovable app.

[beehiiv](https://www.beehiiv.com/) is a newsletter platform for publications, posts, and subscribers. The beehiiv connector lets your Lovable app add subscribers and show posts through a shared connection. It's designed for signup forms, post listings, and other features that use a beehiiv publication you already run.

beehiiv is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

> [!NOTE]
>
> For sending email from your app, use Lovable Emails. Use beehiiv when you want newsletter subscribers, posts, or publication data.

With beehiiv, your app can:

* List the publications your API key can access
* Show recent posts from a publication
* Add an email address as a subscriber
* Reactivate an existing subscriber when you ask for that
* Save a draft post

Adding a subscriber does not send a welcome email unless you ask for one. A new post stays a draft unless you ask to publish or schedule it.

## Common use cases and example apps

These examples show what you can build with beehiiv, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Newsletter signup | *Use beehiiv and build a signup form that adds an email address to our newsletter.* | **Collect subscribers from your site.** The app adds the address to your beehiiv publication and does not send a welcome email unless you ask for one. |
| Latest posts | *Use beehiiv and build a page that lists the latest posts from our publication.* | **Show recent newsletter issues on your site.** The app lists posts from the publication and links each one to its title. |
| Launch waitlist | *Use beehiiv and build a waitlist page that adds signups to our beehiiv publication.* | **Send launch interest into your newsletter.** The app saves each signup as a subscriber on the publication you choose. |
| Multi-publication picker | *Use beehiiv and build a page that lists our publications and lets a visitor subscribe to the one they pick.* | **Let people choose which newsletter to join.** The app lists the publications the API key can access and adds the address to the selected one. |
| Post archive | *Use beehiiv and build an archive that shows past posts from our publication, with a title and status for each.* | **Browse published and draft posts in the app.** The app lists posts and shows the title and status beehiiv returns. |
| Subscriber desk | *Use beehiiv and build an internal form our team uses to add a reader to the newsletter.* | **Add subscribers without leaving the app.** The app sends the email address to beehiiv and confirms when the subscription is saved. |

## How to connect beehiiv

Who can create beehiiv connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple beehiiv connections using different API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting beehiiv, make sure you have:

* A beehiiv workspace where you are an Owner or Admin
* A beehiiv API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API calls through this connector count toward your beehiiv plan. Billing and quota are handled directly by beehiiv, not Lovable.

### Step 1: Get a beehiiv API key

A beehiiv API key lets your Lovable app authenticate with beehiiv. In beehiiv, only a workspace Owner or Admin can create one.

To create a beehiiv API key:

**1. Open API settings**

Sign in to [beehiiv](https://app.beehiiv.com/settings/workspace/api). You can also open **Settings**, then **API** under **Workspace Settings**.

**2. Create a key**

Click **Create New API Key**. Name the key, for example `Lovable integration`, then click **Create New Key**. beehiiv may ask you to verify your identity before it creates the key.

By default the key can access every publication in the workspace. You can restrict it to specific publications. A restricted key only lists those publications, and requests for any other publication fail.

**3. Copy the key**

Copy the key and store it securely. beehiiv shows the key only once. After you save it, click **I've saved the key**.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See beehiiv documentation for more: [Create an API key](https://developers.beehiiv.com/welcome/create-an-api-key).

### Step 2: Connect beehiiv to Lovable

Paste the API key from beehiiv into the connection form.

**1. Open beehiiv in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **beehiiv**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, paste your key into **API key**. The hint under the field reads "Your beehiiv API key". **Get API key** next to the field opens beehiiv's API settings.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the API key against the beehiiv API before saving the connection.

When connected, anyone building in a project can ask Lovable in chat to link their project to beehiiv (based on configured connection-level access). Your Lovable apps can then add subscribers and show posts from the publications that key can access.

## Limitations

The beehiiv connector cannot:

* Publish or schedule a post unless beehiiv has enabled Send API for the workspace. beehiiv documents Send API as an Enterprise feature. The connector can still save a draft.
* Set a subscriber custom field that does not already exist on the publication.
* Exceed beehiiv's organization limit of 180 requests per minute.
* Receive subscription or post events through a managed webhook. If you ask Lovable to accept those events, the app must verify [beehiiv's webhook signature](https://developers.beehiiv.com/webhooks) before it changes anything.
* Support per-end-user beehiiv login. Each connection represents a single beehiiv account shared across all projects linked to it.

If a request fails because the API key was revoked or rotated in beehiiv, create a new key and update the Lovable connection.

## Manage your beehiiv connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **beehiiv**, then open the connection.

* **Unlink projects** to remove beehiiv access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use beehiiv stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
