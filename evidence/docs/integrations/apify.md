# Connect your app to Apify
<!-- source: https://docs.lovable.dev/integrations/apify.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Apify

> Connect your app to Apify, a web scraping and automation platform, to run Actors and read datasets from your Lovable app.

[Apify](https://apify.com/) is a web scraping and automation platform for running Actors, managing Actor runs, and reading structured results from datasets and storage. The Apify connector lets your Lovable app call the Apify API through a shared connection, so you can scrape sites, automate browser workflows, and show crawl results in your product. It's designed for apps that need scrapers, scheduled crawls, or dataset-backed views built on Actors you already run on Apify.

Apify is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Apify, your app can:

* Run Actors to scrape websites and automate browser workflows
* Track an Actor run until it finishes
* Read the scraped results from Apify datasets and key-value stores
* List your recent Actor runs and their datasets

## Common use cases and example apps

These examples show what you can build with Apify, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Competitor price tracker** | *Use Apify and build a dashboard that runs a price-scrape Actor and shows the latest results.* | **Keep competitor prices visible in one place.** The app starts an Actor run, waits for completion, and displays dataset items in a table. |
| **Lead list builder** | *Use Apify and build a tool that scrapes company directory pages and saves contacts to a list.* | **Turn public directory pages into structured leads.** The app runs an Actor with the target URLs and stores the returned dataset rows for follow-up. |
| **Content monitoring feed** | *Use Apify and build a feed that re-runs a news scrape Actor on a schedule and shows new articles.* | **Surface fresh scraped content without manual runs.** The app triggers Actor runs on a schedule, reads the dataset, and highlights new items. |
| **E-commerce product catalog sync** | *Use Apify and build an admin page that lists products from our Apify dataset after a catalog scrape.* | **Browse scraped catalog data inside your app.** The app reads dataset items with pagination and shows product fields operators can review. |
| **Actor run status console** | *Use Apify and build a console that lists recent Actor runs with status, duration, and dataset links.* | **Monitor scrape jobs without leaving Lovable.** The app lists runs from your Apify account and links each successful run to its dataset. |
| **Research assistant** | *Use Apify and build a research page that runs a website crawl Actor and summarizes the scraped pages.* | **Combine crawl output with in-app analysis.** The app runs an Actor, reads the dataset, and presents a summarized view of the scraped content. |

## How to connect Apify

Who can create Apify connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Apify connections using different API tokens, which is useful for separating environments (for example, development and production) or managing usage limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Apify, make sure you have:

* An Apify account
* An Apify API token
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All Actor runs and API usage through this connector count toward your Apify plan. Billing and quota are handled directly by Apify, not Lovable.

### Step 1: Get an Apify API token

An Apify API token lets your Lovable app authenticate with the Apify API.

To create an Apify API token:

**1. Open your Apify account**

Sign in to the [Apify Console](https://console.apify.com/).

**2. Open Integrations**

Go to **Settings → API & Integrations**, or open the [Integrations page](https://console.apify.com/account/integrations) directly. Your API tokens are listed there.

**3. Create a token**

Create a new API token and give it a descriptive name, for example `Lovable integration`.

**4. Copy the token**

Copy the token and store it securely. Newer tokens start with `apify_api_`. Older tokens may look different.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Apify documentation for more: [Getting started with the Apify API](https://docs.apify.com/api/v2/getting-started).

### Step 2: Connect Apify to Lovable

You can create multiple connections using different API tokens.

**1. Open Apify in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Apify**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Apify Prod`. This name is only used inside Lovable to identify the connection.
2. **API token**: paste your Apify API token. **Get value** next to the field opens the Apify Integrations page.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Apify API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Apify (based on configured connection-level access). Your Lovable apps can then run Actors and read datasets through Apify.

## Working with long-running Actors

Actor runs can take minutes to finish, and Apify rate-limits both runs and dataset reads. When you ask Lovable to build a feature around them, ask it to start the run, poll the run status at a slow interval until it finishes, and then read the dataset. For short jobs, Apify can run an Actor and return its dataset items in one call.

If a run or dataset request returns `429`, Apify is rate-limiting your account. Ask Lovable to back off and retry rather than re-sending at a fixed interval.

## Limitations

The Apify connector cannot:

* Rotate API tokens automatically. To rotate, create a new token in Apify and update the Lovable connection.
* Support per-end-user Apify login. Each connection represents a single Apify account shared across all projects linked to it.

If a request fails because the API token was revoked or rotated in Apify, generate a new token and update the Lovable connection.

## Manage your Apify connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Apify**, then open the connection.

* **Unlink projects** to remove Apify access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Apify stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
