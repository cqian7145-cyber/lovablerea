# Connect Firecrawl to scrape web data for your app
<!-- source: https://docs.lovable.dev/integrations/firecrawl.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect Firecrawl to scrape web data for your app

> Connect your app to Firecrawl, a web scraping and crawling platform, to scrape pages, crawl sites, and extract structured data from websites.

[Firecrawl](https://www.firecrawl.dev/) is a web scraping and crawling platform. The Firecrawl connector lets your Lovable app scrape URLs into clean markdown or structured JSON, crawl whole sites, search the web, and map site structure. It's designed for apps that need to fetch, update, and structure information from websites rather than rely on one-time imports or static datasets.

Firecrawl is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Firecrawl, your app can:

* Turn any web page into clean text or structured data, including pages that load their content with JavaScript
* Crawl a whole website, following its pages and sitemap
* Search the web and get the content of the pages it finds
* List every URL on a site before you crawl it
* Re-check pages on a schedule so your data stays current

Firecrawl is a good fit for price monitors, job boards, lead enrichment tools, and content aggregators.

## Common use cases and example apps

These examples show what you can build with Firecrawl, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Competitor tracker** | *Use Firecrawl and build a competitor tracker that scrapes saved URLs on a schedule and shows what changed.* | **Track changes on competitor websites over time.** The app re-scrapes each saved URL, stores snapshots, and highlights changes to pricing pages, product updates, documentation, or announcements. |
| **Jobs aggregator** | *Use Firecrawl and build a jobs aggregator that pulls listings from selected companies' careers pages and highlights new roles.* | **Pull job listings from multiple careers pages into one feed.** The app scrapes each careers page (for example, Greenhouse, Lever, or Workday) into structured listings, keeps the feed updated, and flags roles that appeared since the last run. |
| **Lead enrichment tool** | *Use Firecrawl and build a lead enrichment tool that crawls a company's key pages and extracts public company details into a profile.* | **Enrich company profiles from public website content.** The app crawls the about, team, careers, and contact pages and saves people, location, tech stack, and contact fields for each company. |
| **E-commerce price monitor** | *Use Firecrawl and build a price monitor that checks saved product URLs on a schedule and alerts on changes.* | **Track product availability and pricing across stores.** The app extracts price and availability from each product page, records history, and alerts when prices drop or items come back in stock. |
| **Brand kit extractor** | *Use Firecrawl and build a brand kit extractor that pulls colors, fonts, and logos from a website URL.* | **Generate a lightweight brand kit from any website.** The app scrapes brand-related pages and extracts fonts, colors, logos, and style tokens into a simple kit. |
| **Knowledge extractor** | *Use Firecrawl and build a knowledge extractor that turns a pasted URL into clean markdown and metadata with re-sync.* | **Turn any webpage into clean, reusable content.** The app converts the page into markdown, structured metadata, and tables, ready for search, summarization, or reuse. |

## How to connect Firecrawl

Who can create Firecrawl connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you choose between two options:

* **Managed by Lovable**: Lovable provides and manages the credentials for you. No registration needed. Usage spends workspace credits.
* **Use your own credentials**: connect with your own Firecrawl API key and manage billing in Firecrawl.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

Follow the setup steps below for the option you want.

**Managed by Lovable**

Choose this option for the fastest setup. You don't need a Firecrawl account or API key.

> [!NOTE]
>
> You can create one managed Firecrawl connection per workspace. If one exists, the **Managed by Lovable** option is unavailable in the form until you delete it.

### Usage and billing

Requests through the managed connection use Firecrawl credits. Lovable charges them to the workspace that owns the project at the rate in [Pricing](#pricing) below. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for how usage-based credits work.

If the workspace runs out of credits, requests fail until you top up. The connection's page shows its credit usage, which may not appear immediately.

Lovable does not charge credits for managed connections created before usage billing started for your workspace.

### Set up the managed connection

To create the managed connection:

**1. Open Firecrawl in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Firecrawl**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Managed by Lovable**

Under **Configure connection**, select **Managed by Lovable**. No credential fields appear for this option.

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Above the button, a usage note explains that connecting lets Lovable send data to Firecrawl and deduct Lovable credits, with links to [Pricing](#pricing) on this page and to Lovable's [provider rules for Firecrawl](https://lovable.dev/provider-rules#firecrawl). Click **Connect**.

**Use your own credentials**

Choose this option to use your own Firecrawl account and manage billing directly.

You can create multiple Firecrawl connections using different API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

### Prerequisites

Before connecting Firecrawl with your own credentials, make sure you have:

* A Firecrawl account
* A Firecrawl API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All scraping and crawling through this connection consumes your Firecrawl credits. Billing and quota are handled directly by Firecrawl, not Lovable.

### Step 1: Get a Firecrawl API key

A Firecrawl API key lets your Lovable app authenticate with the Firecrawl API. You can create multiple keys for different environments.

To create a Firecrawl API key:

**1. Open your Firecrawl account**

Sign in to [Firecrawl](https://www.firecrawl.dev/signin?utm_source=lovable\&utm_medium=connector). New accounts start with free credits, enough to test the connection.

**2. Open API keys**

In the Firecrawl dashboard, open the [API Keys page](https://www.firecrawl.dev/app/api-keys).

**3. Create a key**

Click **Create** and give the key a descriptive name, for example `Lovable integration`.

**4. Copy the key**

Copy the generated API key and store it securely. It starts with `fc-`.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Firecrawl documentation for more: [Firecrawl API reference](https://docs.firecrawl.dev/api-reference/v2-introduction).

### Step 2: Connect Firecrawl to Lovable

You can create multiple connections using different API keys.

**1. Open Firecrawl in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Firecrawl**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change, for example to `Firecrawl Prod`. The name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Configure connection**, select **Use your own credentials**.

**5. Enter your API key**

In **API key**, paste your Firecrawl API key (it starts with `fc-`).

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Firecrawl API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Firecrawl (based on configured connection-level access). Your Lovable apps can then scrape, crawl, and keep website data up to date with Firecrawl.

## Pricing

With **Managed by Lovable**, usage costs **4 Lovable credits per 1,000 Firecrawl credits**, or **2 Lovable credits on Business plans**.

Firecrawl credits measure API usage, and the number consumed depends on the feature you use. See [Firecrawl billing documentation](https://docs.firecrawl.dev/billing) for credit usage by feature. Lovable charges the workspace that owns the project, and the usage appears under [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs).

With **Use your own credentials**, Firecrawl bills usage directly to your Firecrawl account, and Lovable credits do not apply.

## Limitations

The Firecrawl connector cannot:

* Use Firecrawl Monitor on a managed connection billed through Lovable credits. To use Monitor, connect with **Use your own credentials** and your own Firecrawl API key.
* Rotate API keys automatically for connections that use your own credentials. To rotate, create a new key in Firecrawl and update the Lovable connection.
* Support per-end-user Firecrawl login. Each connection represents a single Firecrawl account shared across all projects linked to it.

## Troubleshooting

If requests through the connection fail, the sections below cover the most common errors and how to resolve them.

> **Managed connection: requests fail with 402**
>
> The workspace that owns the project has run out of credits. Top up credits for that workspace, and requests resume. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Own credentials: requests fail with 402**
>
> The Firecrawl account that owns the API key has run out of Firecrawl credits. Buy more credits or upgrade the plan in your [Firecrawl account](https://www.firecrawl.dev/), and requests resume.

## Manage your Firecrawl connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Firecrawl**, then open the connection.

* **Unlink projects** to remove Firecrawl access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Firecrawl stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to GoodData](https://docs.lovable.dev/integrations/gooddata.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
- [Connect your app to Wix](https://docs.lovable.dev/integrations/wix.md)
- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
- [Connect your app to Parallel](https://docs.lovable.dev/integrations/parallel.md)
