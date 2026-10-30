# Connect your app to Contentful
<!-- source: https://docs.lovable.dev/integrations/contentful.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Contentful

> Connect your app to Contentful to fetch and display published content from your headless CMS, including entries, assets, and rich text.

[Contentful](https://www.contentful.com/) is a headless CMS that separates content management from how content is presented. The Contentful connector lets your Lovable app fetch published content from your Contentful space through the Content Delivery API. It's designed for content-driven pages, product catalogs, blogs, and documentation where editors work in Contentful and your app renders the result.

Contentful is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Contentful, your app can:

* Fetch published entries, assets, and content types from your space
* Filter and paginate entries by content type, locale, or field values
* Resolve linked entries and assets so pages render complete content
* Render rich text fields in your app

The Contentful connector is **read-only** and targets the Content Delivery API. It's a good fit when your content is authored in Contentful and your Lovable app is the front end that renders it.

## Common use cases and example apps

These examples show what you can build with Contentful, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Marketing and landing pages** | *Use Contentful and build a marketing site where the homepage and feature pages load from Contentful.* | **Build marketing pages powered by CMS content.** The app fetches page entries from Contentful and renders them as components so editors can update text and images without changing code. |
| **Product catalog** | *Use Contentful and build a product catalog that shows products stored in my Contentful space with category filters.* | **Display product listings managed in Contentful.** The app fetches product entries, renders product cards, and filters and paginates on fields stored in the CMS. |
| **Blog and editorial site** | *Use Contentful and build a blog that loads articles from Contentful and renders rich text and images.* | **Create a blog backed by Contentful content.** The app fetches article entries, resolves linked assets, and renders rich text fields as formatted content. |
| **Documentation site** | *Use Contentful and build a documentation site where each page is an entry in Contentful.* | **Build documentation driven by CMS content.** The app fetches documentation entries and generates navigation and pages from the content structure in Contentful. |
| **Multilingual content app** | *Use Contentful and build an app that loads content in the visitor's language using Contentful locales.* | **Serve localized content from Contentful.** The app fetches entries in the requested locale and renders translated content based on the visitor's language. |
| **Event and announcement pages** | *Use Contentful and build an event listing page that loads upcoming events from Contentful and sorts them by date.* | **Display event listings managed in Contentful.** The app fetches event entries, sorts them by date fields, and renders the upcoming events editors maintain in the CMS. |

## How to connect Contentful

Who can create Contentful connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Contentful connections using different spaces or access tokens, which is useful for separating environments (for example, development and production) or connecting several Contentful spaces.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Contentful, make sure you have:

* A Contentful account with a space that contains published content
* The **Space ID** of that space
* A **Content Delivery API access token** for that space
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector use your Content Delivery API access token. API usage counts toward your Contentful plan limits, and billing is handled directly by Contentful, not Lovable.

### Step 1: Find your Space ID and create an access token

A Content Delivery API access token lets your Lovable app read published content from one Contentful space. Both values you need are in the Contentful web app.

To find your Space ID and create a token:

**1. Open your Contentful space**

Sign in to [Contentful](https://app.contentful.com/) and open the space you want to connect.

**2. Copy the Space ID**

Go to **Settings → General settings** and copy the **Space ID**.

**3. Create an API key**

Go to **Settings → API keys** and click **Add API key**, or open an existing key you want to reuse. Give a new key a descriptive name, for example `Lovable integration`.

**4. Copy the access token**

Copy the **Content Delivery API - access token**. Do not copy the Content Preview API token. The connector reads published content only.

> [!WARNING]
>
> Your access token functions like a password. Keep it secure and never share it publicly. You'll need both the Space ID and the access token in the next step.

See Contentful documentation for more: [Find your space ID](https://www.contentful.com/help/spaces/find-space-id) and [Authentication](https://www.contentful.com/developers/docs/references/authentication/).

### Step 2: Connect Contentful to Lovable

You can create multiple connections using different spaces or access tokens.

**1. Open Contentful in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Contentful**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Contentful Prod`. This name is only used inside Lovable to identify the connection.
2. **Space ID**: paste the Space ID you copied from Contentful.
3. **Content Delivery API access token**: paste the access token.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against your space through the Content Delivery API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Contentful (based on configured connection-level access). Your Lovable apps can then fetch content from your Contentful space.

## Working with environments

Each connection reads from one space, and Lovable makes the Space ID available to linked projects so you do not repeat it in prompts. Requests use your space's `master` environment unless you ask for another one. To read from a different Contentful environment, name it when prompting Lovable, for example "load the homepage from the `staging` environment".

## Limitations

The Contentful connector is **read-only** and targets the Content Delivery API.

The Contentful connector cannot:

* Create, update, or delete content. Editors continue to manage content in the Contentful web app.
* Fetch draft or unpublished content. The connector reaches the Content Delivery API only, not the Content Preview API.
* Call the Content Management API for content authoring, space configuration, or asset uploads.
* Receive Contentful webhooks or publish events.
* Support per-end-user Contentful login. Each connection represents a single space and access token shared across all projects linked to it.

## Manage your Contentful connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Contentful**, then open the connection.

* **Unlink projects** to remove Contentful access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Contentful stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
