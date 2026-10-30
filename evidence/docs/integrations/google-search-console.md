# Connect your app to Google Search Console (GSC)
<!-- source: https://docs.lovable.dev/integrations/google-search-console.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Google Search Console (GSC)

> Connect your app to Google Search Console (GSC), Google's free service for monitoring search performance, to verify domains, submit sitemaps, read search analytics, and answer SEO questions directly in the project chat, or to build SEO features into your Lovable app.

[Google Search Console](https://search.google.com/search-console) (GSC) is Google's free service for monitoring how a site performs in Google Search. With the GSC connector, you can have Lovable set up Search Console for your Lovable app (verifying the domain, submitting a sitemap), answer SEO questions in the project chat by reading live data, and optionally build SEO dashboards or tools into your app.

Google Search Console is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Google Search Console, Lovable can:

* Verify your site's domain in Search Console: generate the meta-tag token, embed it in your app's HTML, and complete verification end-to-end
* Submit and manage sitemaps for verified sites
* Answer SEO questions in the project chat using live data: top queries, top pages, clicks, impressions, CTR, average position, indexing status
* Inspect individual URLs: check index status, last crawl, mobile usability, and rich results
* List verified sites in the connected Search Console account
* Read sitemap status including warnings, errors, and indexed counts

If you want a long-lived SEO surface inside your app, you can build it on top of the same connector.

> [!NOTE]
>
> Search Console data is typically delayed by a couple of days. Today's clicks and impressions won't appear in search analytics until Google finishes processing them. Build dashboards and reports around the most recent fully-populated day rather than "today."

## Ways to use the Google Search Console connector

There are two ways to get value out of the Google Search Console connector.

### Ask Lovable to do SEO work for you

The highest-value use of the connector is letting Lovable do SEO work on your Lovable app while you're building, without you having to write any code. When the connector is linked, you can just chat with Lovable about SEO topics.

| Example prompt | What Lovable does |
| - | - |
| *Verify my Lovable app's domain in Google Search Console.* | Generates a meta-tag verification token, embeds it in your app's HTML `<head>`, deploys it, calls Google's verify endpoint, and adds the site as a verified property in Search Console. |
| *Submit my sitemap to Google.* | Generates or locates `sitemap.xml` in your app and submits it to Search Console for the verified property. |
| *Why isn't my homepage showing up in Google?* | Runs URL Inspection on the homepage and explains the index status, last crawl, and any indexing issues in plain language. |
| *What are my top 10 search queries this week?* | Queries Search Analytics, ranks queries by clicks or impressions, and answers in the project chat. |
| *Did any of my pages drop in rankings last week?* | Pulls Search Analytics for two periods, compares, and highlights the biggest movers. |
| *Are there any errors in my submitted sitemaps?* | Lists submitted sitemaps for the property and surfaces any warnings, errors, or low indexed counts. |

See [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md) for more information.

### Build SEO features into your app

You can also expose Search Console data inside your live Lovable app:

| Example app | Example prompt | Description |
| - | - | - |
| SEO performance dashboard | *Use Google Search Console and build a dashboard that shows clicks, impressions, CTR, and average position for my verified site over the last 28 days.* | **Visualize organic search performance in one place.** Trend charts plus drill-downs into top queries and top pages. |
| Top queries and pages report | *Use Google Search Console and build a weekly report that lists my top 50 search queries and the pages they drive traffic to.* | **Turn raw GSC data into a readable weekly report.** The app aggregates queries and pages, ranks them by clicks or impressions, and renders an exportable summary. |
| Keyword tracking with alerts | *Use Google Search Console and build a keyword tracker that records average position for my target queries each day and flags ranking drops.* | **Watch a list of important queries over time.** The app records search analytics snapshots on a schedule you set up, compares them across days, and highlights queries that lost ground. |
| URL inspection tool | *Use Google Search Console and build a tool where I paste a URL and see its index status, last crawl date, and any indexing issues.* | **Diagnose individual pages without opening Search Console.** The app calls URL Inspection for the given URL and renders a readable summary of how Google sees it. |
| Sitemap manager | *Use Google Search Console and build a tool that lists my submitted sitemaps and lets me submit new ones or delete old ones.* | **Manage sitemaps for a verified site without leaving your app.** The app lists submitted sitemaps with their status, warnings, and indexed counts, and lets you submit or delete sitemap URLs. |
| Period-over-period comparison | *Use Google Search Console and build a report that compares last week to the week before, with movers by query and by page.* | **Quantify growth or regressions over time.** The app runs two search analytics queries, joins the results, and ranks the biggest movers. |
| Multi-site SEO overview | *Use Google Search Console and build an overview that shows traffic for every site I have verified in Search Console.* | **Compare performance across all your verified sites.** The app fetches each verified property and renders a single dashboard so you can spot which sites are growing or declining. |
| Content opportunity finder | *Use Google Search Console and build an app that finds queries where my pages rank between positions 5 and 20, pages I could improve.* | **Surface easy SEO wins.** The app filters search analytics for queries in striking distance of page one and groups them by landing page so editors know what to update. |
| Indexing health monitor | *Use Google Search Console and build a monitor that flags sitemaps with errors or sites that have dropped in impressions week over week.* | **Catch indexing and visibility problems early.** The app reads sitemap status and search analytics on demand (or on a schedule you set up), compares periods, and highlights regressions in a focused view. |

## How Google Search Console connections work

The Google Search Console connector uses OAuth2 against a Google account and runs through Lovable's gateway architecture for secure token storage and automatic refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication.

Within your Lovable workspace:

* You can create multiple Google Search Console connections.
* Each connection is a separate OAuth authorization against a Google account, with its own selected scopes.
* Each connection has connection-level access control: by default only the person who created it can use it, but the connection can be opened up to specific workspace members or to the entire workspace.
* Multiple projects can use the same connection.

This makes it easy to separate environments (for example, a Google account that owns a staging property versus a production property), to connect multiple Google accounts that own different sites, or to keep an account's access scoped to a single person.

## How to connect Google Search Console

Workspace **admins** and **owners** can connect Google Search Console.

When a connection is created, Google Search Console becomes available across all projects in the workspace, subject to the connection's access settings.

### Prerequisites

Before connecting Google Search Console, make sure you have:

* A Google account
* Lovable workspace admin or owner role

You don't need to verify your site in Search Console first. Once connected, you can ask the agent to verify your Lovable app's domain for you. If you already have verified sites in your account, the agent will pick those up automatically.

> [!NOTE]
>
> All requests made through this connector use the connected Google account and count toward Google Search Console's standard API quotas. Quota and any associated billing are handled directly by Google, not Lovable.

### Set up your Google Search Console connection

**1. Open Google Search Console in Connectors**

Go to **Connectors** and select **Google Search Console**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a name to identify this connection in Lovable (for example, `GSC Prod`). This name is only used inside Lovable.

**4. Configure scopes (optional)**

Expand **Advanced settings** to view the Google permissions Lovable will request. Default scopes are pre-selected so the connection can read analytics, manage sitemaps, and verify new sites.

Remove any scope you don't need by clicking the **×** next to it. Read-only analytics requires only the **View Search Console data for verified sites** scope, which is marked **Required**. See [Scopes and permissions](#scopes-and-permissions) for the full list.

You can update scopes later by editing the connection and reconnecting.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Google and authorize**

Click **Connect** at the bottom of the form. A Google authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable will redirect you instead.

Choose the Google account you want to use, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, you can immediately ask Lovable to verify your app's domain, submit a sitemap, or answer SEO questions about any of the Google account's verified sites.

## Scopes and permissions

Google Search Console connections request scopes against two Google APIs: the Search Console API and the Site Verification API. **View Search Console data for verified sites** is required; the others are optional and can be removed before connecting.

| Scope | What it lets the agent do | Required |
| - | - | - |
| **View Search Console data for verified sites** `webmasters.readonly` | Read-only access to search analytics, verified sites, URL inspection, and sitemap listings. | Yes |
| **View and manage Search Console data and sitemaps for verified sites** `webmasters` | Submit and delete sitemaps, and add new verified sites to Search Console. | No |
| **Verify ownership of new sites via the Site Verification API** `siteverification.verify_only` | Request verification tokens so the agent can prove ownership of a domain. | No |
| **Manage the list of sites and domains you control** `siteverification` | Complete verification, list verified sites, and remove verifications. | No |

If you want the agent to verify domains for you, keep the verification scopes selected. If you only want read-only SEO data, you can deselect everything except the required scope.

For full details, see Google's references for the [Search Console API](https://developers.google.com/webmaster-tools/v1/api_reference_index) and the [Site Verification API](https://developers.google.com/site-verification/v1/getting_started).

## Verifying a new domain from the project chat

If you grant the verification scopes, Lovable can verify your app's domain end-to-end and add it to Search Console. Just ask it to. The flow has four steps and is built around Google's meta-tag verification method:

1. **Request a verification token.** The agent asks Google for a token for your site.
2. **Embed the meta tag.** The agent adds `<meta name="google-site-verification" content="<TOKEN>" />` to the `<head>` of your site's root URL. The tag must be server-rendered, not injected client-side, and the change must be deployed before continuing.
3. **Verify ownership.** The agent calls Google's verify endpoint using the same site identifier (including trailing slash) that was used to request the token. A `failedToFindMetaTag` error usually means the deploy isn't live yet, the tag is being injected on the client, the site is behind authentication, or the identifier doesn't match exactly.
4. **Add the site to Search Console.** Once verified, the agent registers the site as a property so it appears in your Search Console account.

For example, prompt Lovable:

```text wrap theme={null}
Use Google Search Console and verify ownership of https://example.com, then add it to Search Console.
```

> [!WARNING]
>
> When verifying through the connector, only the **meta-tag (`META`) method** is supported. DNS records, HTML file upload, and Google Analytics verification do not work, because the verification token must be server-rendered into the HTML `<head>` of your site's root URL. The site also needs to be publicly reachable by Google's crawler at the time you call the verify endpoint.

> [!NOTE]
>
> Use the exact same site identifier in every step, including the trailing slash (for example, `https://example.com/`, not `https://example.com`). A mismatch between the URL you used to request the token and the URL you pass to the verify endpoint is the most common cause of a `failedToFindMetaTag` error after the deploy is live.

## Quotas and limits

All requests made through the connector count toward Google Search Console's standard API quotas, which are set by Google and shared with anything else using the same Google account:

* **URL Inspection** has a strict per-property daily quota (around 2,000 queries per property per day at the time of writing). Apps or chats that inspect many URLs in bulk will hit this limit quickly.
* **Search Analytics** queries are subject to Google's per-minute and per-day quotas. Large date ranges with multiple dimensions return paginated results and may need several requests.
* Quotas reset on Google's schedule, not Lovable's. If you hit a `429` or quota error, neither you nor the agent can lift it. Wait for the quota window to reset or reduce request volume.

For the current numbers, see Google's [Search Console API usage limits](https://developers.google.com/webmaster-tools/limits).

## Limitations

The Google Search Console connector cannot:

* Use DNS, HTML file upload, or Google Analytics for site verification. Only the **meta-tag** method is supported through the connector.
* Request indexing for a URL (`urlNotifications:publish`). The connector targets Search Console and Site Verification only.
* Modify search rankings or request reconsideration on a manual action.
* Receive Google Search Console alerts as webhooks or push events.
* Support per-end-user Google login (each connection uses a single connected Google account).

For workflows the connector doesn't support, you can continue to use the [Google Search Console](https://search.google.com/search-console) web app directly.

## Manage your Google Search Console connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google Search Console**, then open the connection.

* **Unlink projects** to remove Google Search Console access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google Search Console stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
- [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)
