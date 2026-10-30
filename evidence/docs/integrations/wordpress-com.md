# Connect your app to WordPress.com
<!-- source: https://docs.lovable.dev/integrations/wordpress-com.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to WordPress.com

> Connect your app to WordPress.com by signing in with your WordPress.com account, to read and manage posts, pages, and media on your WordPress.com sites.

[WordPress.com](https://wordpress.com/) hosts WordPress sites and blogs. The WordPress.com connector lets your Lovable app read and manage posts, pages, and media on the sites your WordPress.com account can access. Editors keep working in WordPress while your app decides how the content looks and behaves. It's designed for headless CMS apps, blogs, marketing pages, and publishing workflows backed by a WordPress.com site.

WordPress.com is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With WordPress.com, your app can:

* List and read posts, pages, and media from your sites
* Create and update posts and drafts
* Read site information
* Manage categories and tags when you add the **Taxonomy** scope
* Build pages and layouts from content that editors publish in WordPress

> [!WARNING]
>
> This connector is for sites hosted on **WordPress.com**. For a WordPress site you host yourself, use the [WordPress (self-hosted)](https://docs.lovable.dev/integrations/wordpress.md) connector instead.

## Common use cases and example apps

These examples show what you can build with WordPress.com, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Marketing and landing pages** | *Use WordPress.com and build a marketing site where the homepage and key sections load titles, body, and images from my WordPress.com site.* | **Ship pages powered by CMS content.** The app fetches posts or pages from WordPress.com and renders them as components so editors can update copy and media without changing app code. |
| **Blog and editorial sites** | *Use WordPress.com and build a blog that lists recent posts and shows each post's content, featured image, and excerpt.* | **Run a blog backed by WordPress.com.** The app loads post lists and detail views from the API and reflects new publishes from the WordPress dashboard. |
| **Resource or help center** | *Use WordPress.com and build a help center where each article is a WordPress page with search and categories.* | **Centralize articles in WordPress.com.** The app queries pages or posts and builds navigation and article views from your CMS structure. |
| **Listing-style content** | *Use WordPress.com and build a catalog-style page that shows items I maintain as posts, with filters by category.* | **Present structured listings from WordPress.com.** The app reads posts and their categories and renders filters and cards based on your content. |
| **Event and announcement pages** | *Use WordPress.com and build a page that loads upcoming events from WordPress.com and sorts them by date.* | **Highlight time-based content.** The app fetches the posts or pages that represent events and orders them by the dates you store in WordPress. |
| **Publish workflow** | *Use WordPress.com and build a form that creates a draft post on my WordPress.com site when someone submits it.* | **Turn submissions into drafts.** The app creates or updates content through the API so editors finish work in WordPress. |

## How to connect WordPress.com

Who can create WordPress.com connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple WordPress.com connections using different WordPress.com accounts or scopes, which is useful for separating environments or giving one project read-only access and another publishing rights.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting WordPress.com, make sure you have:

* A WordPress.com account that can access the site or sites you want to use
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector run against your WordPress.com account. WordPress.com plans, limits, and billing are handled directly by WordPress.com, not Lovable.

### Set up your WordPress.com connection

You authorize Lovable with your WordPress.com account. You do not need an API key or an application of your own.

**1. Open WordPress.com in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **WordPress.com**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `WordPress.com Marketing`). This name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Under **Scopes**, review the permissions the connection requests. **Posts** is always included, and **Media**, **Sites**, and **User** are selected by default.

| Scope | Description | Default |
| - | - | - |
| Posts (`posts`) | View and manage posts | Required |
| Media (`media`) | Manage media library assets | On |
| Sites (`sites`) | View general site information and options | On |
| Comments (`comments`) | View and manage comments | Off |
| Stats (`stats`) | View site statistics | Off |
| Taxonomy (`taxonomy`) | Manage taxonomy terms | Off |
| User (`users`) | View user information | On |
| Batch (`batch`) | Perform batch operations on multiple resources | Off |

Select only the scopes your app needs. To add a scope later, edit the connection, select it under **Scopes**, and reconnect. For full scope documentation, see [WordPress.com OAuth2 scopes](https://developer.wordpress.com/docs/oauth2/#oauth2-scopes-and-permissions).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to WordPress.com and authorize**

Click **Connect** at the bottom of the form. The WordPress.com authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to WordPress.com if prompted, choose the account if asked, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to WordPress.com (based on configured connection-level access). Your Lovable apps can then read and manage content on the sites your WordPress.com account can access. Requests go through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), so the WordPress.com tokens never enter your project.

See WordPress.com documentation for more: [WordPress.com REST API](https://developer.wordpress.com/docs/api/).

## Working with more than one site

A connection is tied to the WordPress.com account you signed in with and reaches every site that account can access. When you prompt Lovable, name the site you want to work with, for example "load the five most recent posts from myblog.wordpress.com". Lovable keeps the chosen site in your app's backend code rather than asking visitors to pick one. If a site is missing, confirm you authorized with the WordPress.com account that owns it and approved the requested permissions.

## Limitations

The WordPress.com connector cannot:

* Perform actions the WordPress.com API does not expose for your site type and permissions. If something works in the WordPress.com dashboard but not in your app, check whether the action is available through the API for your site.
* Receive WordPress.com webhooks or publish events.
* Support per-end-user WordPress.com login. Each connection represents a single WordPress.com account shared across all projects linked to it.

If WordPress.com authorization is revoked from the WordPress.com side, reconnect the connection in Lovable before API calls can succeed again.

## Manage your WordPress.com connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **WordPress.com**, then open the connection.

* **Unlink projects** to remove WordPress.com access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use WordPress.com stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to WordPress (self-hosted)](https://docs.lovable.dev/integrations/wordpress.md)
- [Connect your app to WooCommerce](https://docs.lovable.dev/integrations/woocommerce.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Microsoft 365](https://docs.lovable.dev/integrations/microsoft.md)
- [Connect your app to WhatsApp Business](https://docs.lovable.dev/integrations/whatsapp.md)
