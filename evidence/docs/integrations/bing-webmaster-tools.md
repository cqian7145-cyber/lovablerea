# Connect your app to Bing Webmaster Tools
<!-- source: https://docs.lovable.dev/integrations/bing-webmaster-tools.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Bing Webmaster Tools

> Connect your app to Bing Webmaster Tools, Microsoft's service for Bing search performance, to read clicks, queries, and crawl stats and to submit URLs and sitemaps.

[Bing Webmaster Tools](https://www.bing.com/webmasters/) (formerly Bing Search Console) is Microsoft's free service for monitoring how a site performs in Bing search. The Bing Webmaster Tools connector lets your Lovable app read clicks, impressions, top queries, and crawl stats for verified sites, and submit URLs and sitemaps. It's designed for SEO reports and marketing tools that need Bing search data next to the rest of a product.

Bing Webmaster Tools is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Bing Webmaster Tools, your app can:

* List the sites verified on the connected account
* Read query stats for a verified site, including clicks, impressions, and average position (query stats update weekly)
* Read daily clicks and impressions for a verified site
* Read daily crawl stats, including pages crawled, pages in the index, inbound links, and counts of successful and failed crawls
* Submit a URL, or a sitemap, RSS, Atom, or text feed, for a verified site

The connector reaches only sites already verified in the connected Bing Webmaster Tools account. It's a good fit for search dashboards, crawl monitors, and tools that send new pages or feeds to Bing.

## Common use cases and example apps

These examples show what you can build with Bing Webmaster Tools, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Search performance dashboard | *Use Bing Webmaster Tools and build a dashboard that shows clicks, impressions, and average position for our verified site.* | **Show Bing search performance in one place.** The app reads daily clicks and impressions, lists top queries, and charts the trend for the verified site. |
| Top queries report | *Use Bing Webmaster Tools and build a report of the queries that drive the most clicks to our site.* | **Rank the queries behind Bing traffic.** The app reads query stats, sorts them by clicks, and lists each query with impressions and average position. |
| Crawl health monitor | *Use Bing Webmaster Tools and build a monitor that charts crawled pages, pages in the index, and failed crawls.* | **Watch how Bing crawls the site.** The app reads daily crawl stats and highlights days with more failed crawls. |
| Daily traffic report | *Use Bing Webmaster Tools and build a daily report of Bing clicks and impressions for the last 28 days.* | **Summarize recent Bing traffic by day.** The app reads daily clicks and impressions and renders a table the team can review. |
| URL submission form | *Use Bing Webmaster Tools and build a form that submits a page URL to Bing for our verified site.* | **Send a new or updated URL to Bing.** The app submits the URL for the verified site. Each submission counts against the site's URL submission quota. |
| Feed submission tool | *Use Bing Webmaster Tools and build a tool that submits a sitemap URL for our verified site.* | **Tell Bing about a sitemap, RSS, Atom, or text feed.** The app submits the feed URL for the verified site so Bing can discover the pages it lists. |
| Multi-site overview | *Use Bing Webmaster Tools and build an overview of clicks and impressions for every site verified on our account.* | **Compare Bing traffic across verified sites.** The app lists the account's verified sites and shows recent clicks and impressions for each one. |

## How to connect Bing Webmaster Tools

Who can create Bing Webmaster Tools connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Bing Webmaster Tools connections using different accounts, which is useful when different Microsoft accounts own different sites.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Bing Webmaster Tools, make sure you have:

* A Microsoft account that can sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
* At least one site verified in that Bing Webmaster Tools account
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Requests through this connector use the connected Bing Webmaster Tools account. Quota, including the site's URL submission quota, is handled directly by Microsoft, not Lovable.

### Set up your Bing Webmaster Tools connection

You authorize Lovable with your Bing Webmaster Tools account, and no API key is needed.

**1. Open Bing Webmaster Tools in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Bing Webmaster Tools**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Under **Scopes**, review the permissions your app requests. **View Bing Webmaster Tools data for verified sites** is required. **View and manage Bing Webmaster Tools data, URLs, and sitemaps** is selected by default. Remove it if the app only needs to read data.

| Scope | Description | Default |
| :- | :- | :- |
| View Bing Webmaster Tools data for verified sites (`webmaster.read`) | Read clicks, impressions, queries, and crawl stats for verified sites. | Required |
| View and manage Bing Webmaster Tools data, URLs, and sitemaps (`webmaster.manage`) | Submit URLs and sitemaps, RSS, Atom, or text feeds for verified sites. | On |

For full scope documentation, see [Bing Webmaster Tools OAuth](https://learn.microsoft.com/en-us/bingwebmaster/oauth2).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Bing Webmaster Tools and authorize**

Click **Connect** at the bottom of the form. The Bing Webmaster Tools authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Bing Webmaster Tools if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in chat to link their project to Bing Webmaster Tools (based on configured connection-level access). Your Lovable apps can then read search and crawl stats for verified sites and submit URLs or feeds.

## Limitations

The Bing Webmaster Tools connector cannot:

* Verify a new site. Verify the site in Bing Webmaster Tools before the app reads it or submits to it.
* Read clicks, queries, or crawl stats for a site that is not verified on the connected account.
* Provide up-to-the-minute query stats. Query stats update weekly. Daily clicks, impressions, and crawl stats update by day.
* Support per-end-user Bing login. Each connection represents a single Bing Webmaster Tools account shared across all projects linked to it.

If Bing Webmaster Tools authorization is revoked from the Bing Webmaster Tools side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Bing Webmaster Tools connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Bing Webmaster Tools**, then open the connection.

* **Unlink projects** to remove Bing Webmaster Tools access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Bing Webmaster Tools stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to n8n](https://docs.lovable.dev/integrations/n8n.md)
- [Connect your app to Linear](https://docs.lovable.dev/integrations/linear.md)
- [Connect your app to Salesforce](https://docs.lovable.dev/integrations/salesforce.md)
- [Connect your app to Replicate](https://docs.lovable.dev/integrations/replicate.md)
