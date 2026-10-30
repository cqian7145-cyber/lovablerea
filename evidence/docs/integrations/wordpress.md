# Connect your app to WordPress (self-hosted)
<!-- source: https://docs.lovable.dev/integrations/wordpress.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to WordPress (self-hosted)

> Connect your app to a self-hosted WordPress site to read and manage posts, pages, media, and users through the WordPress REST API.

[WordPress](https://wordpress.org/) is open-source CMS software you host on your own domain or server. The **WordPress (self-hosted)** connector lets your Lovable app read and manage posts, pages, media, and users on that site through the WordPress REST API. It's designed for headless CMS apps, editorial dashboards, and content workflows backed by a WordPress install you control.

WordPress (self-hosted) is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With WordPress (self-hosted), your app can:

* List and display posts, pages, and custom post types
* Upload and manage media library assets
* Read site settings, categories, tags, and user profiles
* Call REST routes added by plugins installed on your site
* Build headless CMS experiences on self-hosted WordPress

> [!WARNING]
>
> This connector is for **self-hosted WordPress** sites. For **WordPress.com** hosted sites, use the [WordPress.com](https://docs.lovable.dev/integrations/wordpress-com.md) connector instead.

## Common use cases and example apps

These examples show what you can build with WordPress (self-hosted), each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Marketing and landing pages** | *Use WordPress (self-hosted) and build a marketing site where the homepage and key sections load titles, body, and images from my WordPress site.* | **Ship pages powered by CMS content.** The app fetches posts or pages from WordPress and renders them as components so editors can update copy and media without changing app code. |
| **Blog and editorial sites** | *Use WordPress (self-hosted) and build a blog that lists recent posts and shows each post's content, featured image, and excerpt.* | **Run a blog backed by WordPress.** The app loads post lists and detail views from the API and reflects new publishes from the WordPress dashboard. |
| **Resource or help center** | *Use WordPress (self-hosted) and build a help center where each article is a WordPress page with search and categories.* | **Centralize articles in WordPress.** The app queries pages or posts and builds navigation and article views from your CMS structure. |
| **Media library browser** | *Use WordPress (self-hosted) and build an admin page that lists media from my WordPress library with search and upload.* | **Manage media from a custom interface.** The app reads and uploads media through the WordPress REST API based on the connected user's permissions. |
| **Editorial publish workflow** | *Use WordPress (self-hosted) and build a form that creates a draft post on my WordPress site when someone submits it.* | **Turn submissions into drafts.** The app creates or updates content through the API so editors finish work in WordPress. |
| **Content dashboard** | *Use WordPress (self-hosted) and build a dashboard that shows recent posts, categories, and tags from my site.* | **Give operators a focused view of site content.** The app reads posts, categories, and tags and presents them in one place outside the WordPress admin. |

## How to connect WordPress (self-hosted)

Who can create WordPress (self-hosted) connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple WordPress connections using different sites or Application Passwords, which is useful for separating environments (for example, staging and production) or connecting multiple self-hosted sites.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting WordPress (self-hosted), make sure you have:

* A self-hosted WordPress site with HTTPS enabled
* WordPress 5.6 or later (Application Passwords require this version)
* Non-plain WordPress permalinks enabled for REST API routes
* A WordPress user account with the permissions your app needs
* A WordPress Application Password for that user
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector run against your WordPress site. Hosting, plugins, and site-related costs are handled outside Lovable.

### Step 1: Get a WordPress Application Password

A **WordPress Application Password** lets your Lovable app authenticate with the WordPress REST API using HTTP Basic auth. The connected WordPress user's role controls what the connection can read or change.

To create a WordPress Application Password:

**1. Open your WordPress admin dashboard**

Sign in to the WordPress admin for the site you want to connect.

**2. Open the user profile**

Go to **Users → Profile** if you are creating a password for your own account. To create a password for another user, go to **Users → All Users**, open that user, and edit their profile.

**3. Create an Application Password**

Scroll to **Application Passwords**. Enter a name for the application, for example `Lovable integration`, then click **Add New Application Password**.

**4. Copy the password**

Copy the generated password and store it securely. WordPress shows it once. You can paste it with or without spaces.

**5. Note your site URL and username**

Note the HTTPS URL of your WordPress site (for example, `https://blog.example.com`) and the WordPress username for the account you used.

> [!WARNING]
>
> Your Application Password functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See WordPress documentation for more: [Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) and the [WordPress REST API handbook](https://developer.wordpress.org/rest-api/).

### Step 2: Connect WordPress (self-hosted) to Lovable

You can create multiple connections using different sites or Application Passwords.

**1. Open WordPress (self-hosted) in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **WordPress (self-hosted)**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `WordPress Prod`. This name is only used inside Lovable to identify the connection.
2. **Site URL**: enter the HTTPS URL of your WordPress site, for example `https://blog.example.com`. You can enter the site root or a REST discovery URL such as `https://blog.example.com/wp-json`.
3. **Username**: enter the WordPress username for the Application Password.
4. **Application password**: paste the Application Password you generated in WordPress.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials against your site's REST API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to WordPress (self-hosted) (based on configured connection-level access). Your Lovable apps can then read and manage WordPress content based on the connected user's permissions.

## Working with WordPress permalinks and REST API routes

WordPress REST API routes require permalinks that are not set to **Plain**. If verification fails with a route error such as `rest_no_route`, check that pretty permalinks are enabled under **Settings → Permalinks** in WordPress admin.

Lovable accepts your site root URL or a REST discovery URL and connects to your site's REST API. Core content lives under the `wp/v2` namespace, and other namespaces stay reachable through the REST root. Your site must use HTTPS in the **Site URL** field.

Routes outside the core `wp/v2` namespace, such as those added by plugins or a custom plugin on your site, are reachable through the site's REST root. Tell Lovable which plugin API you want to use and it calls the right route for you.

The connector verifies credentials by calling the WordPress `users/me` endpoint. If verification fails, confirm the username and Application Password match, the user still exists, and the password has not been revoked in WordPress.

## Limitations

The WordPress (self-hosted) connector cannot:

* Connect to **WordPress.com** hosted sites. Use the [WordPress.com](https://docs.lovable.dev/integrations/wordpress-com.md) connector for those sites.
* Create Application Passwords or change WordPress user roles for you. Configure these in WordPress admin first.
* Bypass the permissions of the connected WordPress user account.
* Configure WordPress permalinks, hosting, SSL, plugins, or site settings for you.
* Replace the [WooCommerce](https://docs.lovable.dev/integrations/woocommerce.md) connector for store operations. Plugin routes on your site are reachable, but the WooCommerce connector is the recommended path for products, orders, and customers.
* Refresh or rotate Application Passwords automatically. To rotate credentials, create a new Application Password in WordPress and update the Lovable connection.
* Support per-end-user WordPress login. Each connection represents a single WordPress account shared across all projects linked to it.

If an Application Password is revoked in WordPress, update or recreate the connection in Lovable before API calls can succeed again.

## Manage your WordPress (self-hosted) connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **WordPress (self-hosted)**, then open the connection.

* **Unlink projects** to remove WordPress (self-hosted) access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use WordPress (self-hosted) stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to WordPress.com](https://docs.lovable.dev/integrations/wordpress-com.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to n8n](https://docs.lovable.dev/integrations/n8n.md)
- [Connect your app to WooCommerce](https://docs.lovable.dev/integrations/woocommerce.md)
- [Connect your app to Metabase](https://docs.lovable.dev/integrations/metabase.md)
