# Connect your app to Storyblok
<!-- source: https://docs.lovable.dev/integrations/storyblok.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Storyblok

> Connect your app to Storyblok, a headless CMS and visual page builder, to deliver published content or create and publish stories from your Lovable app.

[Storyblok](https://www.storyblok.com/) is a headless CMS that lets your Lovable app fetch published or preview stories, or create, update, and publish stories managed in the Storyblok app. It's designed for apps where editorial workflows, visual page building, and structured content live outside the codebase.

Storyblok is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Storyblok, your app can:

* Fetch published or draft stories from the Content Delivery API
* Create, update, and publish stories through the Management API
* List assets and component schemas in a space
* Render Storyblok rich text and components in your app
* Drive SEO metadata (title, description, and social image) from content fields

A Content Delivery API connection is read-only. A Management API connection can change content in the spaces you approve during sign-in.

## Common use cases and example apps

These examples show what you can build with Storyblok, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Marketing site backed by Storyblok** | *Use Storyblok and build a marketing site that pulls landing pages, blog posts, and navigation from Storyblok.* | **Render a full marketing site from content managed in Storyblok.** The app fetches stories by slug, renders the matching components, and sets SEO metadata so editors can ship pages without code changes. |
| **Blog or editorial site** | *Use Storyblok and build a blog that lists articles, supports tag filtering, and renders rich text from Storyblok.* | **Build an editorial reading experience driven by Storyblok stories.** The app paginates story lists, filters by tag or content type, and renders rich text and embedded components for each post. |
| **Product catalog or directory** | *Use Storyblok and build a product directory where editors manage listings in Storyblok and the app renders detail pages by slug.* | **Turn Storyblok stories into a structured directory.** The app lists items with filters, links to detail pages by slug, and renders fields managed entirely in Storyblok. |
| **Documentation or knowledge base** | *Use Storyblok and build a docs site with sections, a sidebar, and search-friendly pages from Storyblok.* | **Publish documentation from Storyblok with a navigable structure.** The app reads the story tree, builds navigation from folder paths, and renders each page from rich content. |
| **Multi-language content site** | *Use Storyblok and build a localized site that renders content in the visitor's language using Storyblok translations.* | **Deliver localized experiences from a single Storyblok space.** The app fetches the right language version per route and falls back to the default language when a translation is missing. |
| **Preview environment for editors** | *Use Storyblok and build a preview site that shows draft content for editors before publishing.* | **Give editors a way to review unpublished work.** Connected with a preview token, the app requests draft content so editors see in-progress stories before they go live. |
| **Content operations console** | *Use Storyblok and build an internal tool that creates stories and publishes approved pages.* | **Let your team manage Storyblok stories from your own app.** The app uses a Management API connection to create and update stories, then publishes them when an editor approves the change. |

## How to connect Storyblok

Who can create Storyblok connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

Storyblok offers two APIs, and you choose which one to connect when adding a connection:

* **CDN API** (default): read-only access to fetch published or preview content using a Content Delivery API access token
* **Management API**: read and write access to the spaces you approve to create, update, and publish content by signing in with your Storyblok account

You can create multiple Storyblok connections using different accounts or access tokens, which is useful for separating environments (for example, development and production), targeting different spaces or regions, or switching between published and preview content.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Storyblok, make sure you have:

* A Storyblok account and a space
* The region where that space is hosted
* For **CDN API** (most common): a Content Delivery API access token from that space (public or preview)
* For **Management API**: your Storyblok account credentials to sign in and authorize Lovable
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Storyblok plan limits. Billing and quota are handled directly by Storyblok, not Lovable.

Follow the setup steps below based on which API you need.

**CDN API (read-only)**

The CDN API is read-only and lets your app fetch published or preview content. This is the most common choice for apps that display Storyblok content. You connect using a Content Delivery API access token from your Storyblok space.

### Step 1: Get a Storyblok CDN API access token

A Content Delivery API access token lets your Lovable app fetch content from your Storyblok space. You can create separate tokens for published and preview content.

To create a Storyblok access token:

**1. Open your Storyblok space**

Sign in to the [Storyblok app](https://app.storyblok.com/) and open the space you want to connect.

**2. Open access tokens**

Go to **Settings → Access Tokens**.

**3. Generate a new token**

Click **Generate new token**, enter a descriptive name, for example `Lovable integration`, and choose the access level:

* **Public**: returns only published content. Use this for production sites.
* **Preview**: returns published and draft content. Use this for staging or editor preview environments.

Click **Generate** and copy the token.

**4. Note your space region**

Note the region of your space (EU, US, CA, AP, or CN). You can find this in your space settings, and it must match the region you select in Lovable.

> [!WARNING]
>
> Your access token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Storyblok documentation for more: [Content Delivery API v2](https://www.storyblok.com/docs/api/content-delivery/v2).

### Step 2: Connect Storyblok to Lovable

With your access token ready, add the connection in Lovable.

**1. Open Storyblok in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Storyblok**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose CDN API**

Under **Configure connection**, select **CDN API**. This is the access token option.

**5. Configure the connection**

Under **Configure connection**, enter:

1. **Space region**: select the region where your Storyblok space is hosted: **European Union (EU)** (default), **United States (US)**, **Canada (CA)**, **Australia / APAC (AP)**, or **China (CN)**. The region must match the space the token belongs to. A token from a US space does not authenticate against the EU region.
2. **Public or preview access token**: paste your Content Delivery API access token.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Storyblok Content Delivery API for the selected region before saving the connection.

**Management API (read and write)**

The Management API provides read and write access to the spaces you approve to create, update, and publish content. Choose this when your app needs to manage content, not just display it. You connect by signing in with your Storyblok account.

**1. Open Storyblok in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Storyblok**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Management API**

Under **Configure connection**, select **Management API**.

**5. Choose the space region**

Under **Space region**, select the region of the Storyblok spaces this connection will manage: **European Union (EU)** (default), **United States (US)**, **Canada (CA)**, **Australia / APAC (AP)**, or **China (CN)**. The region must match the spaces you approve during sign-in.

**6. Review scopes (optional)**

Under **Scopes**, review the permissions your app requests. **Refresh access**, **Read spaces**, and **Read stories** are always included. All read permissions and most write and publish permissions are selected by default. Write access to spaces, collaborators, releases, webhooks, users, and workflows is off by default.

For full scope documentation, see [Storyblok's scope reference](https://www.storyblok.com/docs/plugins/oauth-scoped-grants#scopes).

**7. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**8. Connect to Storyblok and authorize**

Click **Connect** at the bottom of the form. The Storyblok authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Storyblok if prompted, choose the spaces to grant, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Storyblok (based on configured connection-level access). What your app can do depends on which API you connected: **CDN API** connections are read-only for fetching content, while **Management API** connections can create, update, and publish content.

## Working with published and preview content

The Storyblok Content Delivery API returns different content depending on the token and the request.

* Public tokens return published content only.
* Preview tokens can return published or draft content.

When prompting Lovable, mention which version you want. For example, "show draft content" for an editor preview, or "use published content" for a production site.

## Limitations

The Storyblok connector cannot:

* Receive Storyblok webhooks or publish events. Your app needs its own endpoint if it should react to changes in Storyblok.
* Use more than one region per connection. A single connection uses the region you select.
* Support per-end-user Storyblok login. Each connection represents a single Storyblok account or access token shared across all projects linked to it.

If Storyblok authorization is revoked from the Storyblok side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Storyblok connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Storyblok**, then open the connection.

* **Unlink projects** to remove Storyblok access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Storyblok stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
