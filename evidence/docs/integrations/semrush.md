# Connect your app to Semrush
<!-- source: https://docs.lovable.dev/integrations/semrush.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Semrush

> Connect your app to Semrush, an SEO and competitive analysis platform, to power apps with keyword research, domain analytics, backlink data, and project management.

> [!NOTE]
>
> The Semrush connector is for embedding Semrush data **inside your deployed Lovable app**.
>
> If you just want [Semrush-powered keyword research](https://docs.lovable.dev/features/seo-aeo.md#keyword-research-and-content) while you build (keyword ideas, domain analysis, and competitor insights), you don't need this connector. See [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md).

Semrush is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one connection that Lovable can use in chat and in your published apps.

[Semrush](https://www.semrush.com/) is an SEO, keyword research, and competitive analysis platform that lets your Lovable app work with search data, domain analytics, and marketing insights managed in your Semrush account. It's designed for apps that surface SEO data, track keyword positions, or build dashboards on top of Semrush projects.

With Semrush, your app can:

* Access SEO data including keywords, backlinks, and domain analytics
* Manage Semrush projects and position tracking campaigns
* Retrieve organic and paid search insights

The Semrush connector targets Semrush's OAuth-protected APIs, including the Projects API, URL, domain, backlinks, and subfolder reports, and position tracking. It's a good fit when your app needs to read SEO data from your Semrush account or extend Semrush workflows with custom interfaces.

See Semrush's developer documentation for API availability and limits: [Semrush API docs](https://developer.semrush.com/api/).

## Common use cases and example apps

| Example app | Example prompt | Description |
| - | - | - |
| SEO performance dashboard | *Use Semrush and build a dashboard that shows my domain's organic traffic, keyword rankings, and backlink growth over time.* | **Surface Semrush SEO metrics in a focused internal view.** The app pulls domain analytics and keyword data from Semrush projects and renders charts so marketing teams can monitor performance without opening Semrush. |
| Keyword research workspace | *Use Semrush and build a keyword research tool where I can search keywords, see volume and difficulty, and save lists.* | **Create a structured workflow on top of Semrush keyword data.** The app queries Semrush for keyword metrics, lets users organize results into lists, and saves selections for later review. |
| Competitor tracking app | *Use Semrush and build an app that tracks competitor domains and shows their top keywords, traffic estimates, and backlinks.* | **Turn Semrush competitive data into a monitoring tool.** The app fetches data for a configured set of competitor domains and highlights changes in rankings, traffic, and backlink profiles over time. |
| Position tracking reports | *Use Semrush and build a weekly report that summarizes keyword position changes across my Semrush projects.* | **Deliver recurring SEO updates from Semrush project data.** The app reads position tracking campaigns, compares week-over-week movement, and produces a digest stakeholders can review at a glance. |
| Backlink monitoring | *Use Semrush and build an app that lists new and lost backlinks for my domain and flags high-authority links.* | **Monitor link profile changes from Semrush.** The app fetches backlink data, surfaces gains and losses, and highlights links worth investigating based on domain authority. |
| Client-facing SEO reports | *Use Semrush and build a client portal that shows each client their keyword rankings, traffic trends, and project status.* | **Share Semrush insights with clients in a branded interface.** The app maps Semrush projects to clients, renders the relevant metrics, and gives clients a read-only view of their SEO performance. |
| Content opportunity finder | *Use Semrush and build a tool that surfaces keyword opportunities based on search volume, difficulty, and current rankings.* | **Help content teams prioritize what to write next.** The app combines Semrush keyword and ranking data to identify gaps and recommend topics with the best potential return. |

## How to connect Semrush

Who can create Semrush connections depends on your workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients). You can create multiple connections by authorizing different Semrush accounts.

You choose who can use the connection through its sharing settings. Members with access can ask Lovable to [link it to a project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project).

### Prerequisites

Before connecting Semrush, make sure you have:

* A Semrush account
* Permission to create connections in your Lovable workspace

> [!TIP]
>
> When you connect Semrush through Lovable, you can either use an existing Semrush account or create a new one during the connection flow.
>
> * If you create a **new Semrush account through Lovable**, you'll get **free Semrush credits** on Semrush's free plan, subject to free plan limits and daily usage caps.
> * If you connect an **existing Semrush account** instead, your **current Semrush subscription limits** apply.
>
> Learn more at [semrush.com](https://www.semrush.com/).

> [!NOTE]
>
> All API requests made through this connector consume Semrush API units
> according to your Semrush plan. Billing and quota are handled directly by
> Semrush, not Lovable.

### Set up your Semrush connection

**1. Open Semrush in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Semrush**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Semrush Prod`). This name is only used inside Lovable to identify the connection.

**4. View scopes (optional)**

Expand **Advanced settings** to view the Semrush API scopes Lovable will request. All scopes are required for the gateway to reach every supported endpoint and cannot be deselected:

| Scope | Semrush permission | What Lovable reads |
| - | - | - |
| User identity | `user.id` | The connected Semrush user's identity |
| User limits | `user.limits` | The connected user's Semrush API quota |
| URL reports | `url.info` | URL-level organic and paid search data |
| Domain reports | `domains.info` | Domain-level rankings, traffic, and competitive data |
| Backlinks | `backlinks.info` | Backlink profiles, anchors, and referring domains |
| Subfolder reports | `subfolders.info` | Organic data for subfolders of a domain |
| Projects | `projects.info` | The connected user's Semrush projects |
| Position tracking | `positiontracking.info` | Position tracking campaigns and reports |

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Semrush and authorize**

Click **Connect** at the bottom of the form. The Semrush authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Semrush if prompted, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, ask Lovable to link the connection to your project. Your app can then use Semrush to read SEO data, manage projects, and build dashboards using the connected Semrush account.

## Limitations

The Semrush connector cannot:

* Call legacy Semrush endpoints that require API-key (`?key=…`) query-string authentication
* Receive Semrush webhooks or event notifications
* Support per-end-user authentication (each connection uses a single shared Semrush authorization)
* Bypass Semrush API quotas or rate limits. Usage counts against your Semrush plan.

## Manage your Semrush connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Semrush**, then open the connection.

* **Unlink projects** to remove Semrush access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Semrush stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
