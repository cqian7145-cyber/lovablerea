# Connect your app to Clay
<!-- source: https://docs.lovable.dev/integrations/clay.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Clay

> Connect your app to Clay, a go-to-market data platform, to search people and companies, run enrichment routines, and query Clay tables from your Lovable app.

[Clay](https://www.clay.com/) is a go-to-market (GTM) data platform for finding, enriching, and acting on people and company data. The Clay connector lets your Lovable app search Clay's database with structured filters, run Clay routines (enrichment functions and workflows) against your records, and query Clay tables. It's designed for sales and marketing apps that need live prospecting and enrichment data.

Clay is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Clay, your app can:

* Search Clay's database of people by title, keywords, and company
* Search companies by domain, industry, and firmographics
* Run enrichment routines against submitted records
* Query Clay tables with structured filters

It's a good fit for prospecting tools, lead enrichment workflows, account research dashboards, and internal GTM apps built on top of your Clay workspace.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Prospect list builder | *Use Clay and build a tool where I can search for founders at fintech companies and save them to a list.* | **Turn Clay people search into a focused prospecting UI.** The app creates a Clay search from your filters, pages through results, and lets you save the people worth pursuing. |
| Account research dashboard | *Use Clay and build a dashboard that shows firmographic details for a list of target companies.* | **Research target accounts without leaving your app.** The app searches Clay for each company by domain and renders industry, size, and revenue data side by side. |
| Lead enrichment form | *Use Clay and build a form where I paste a company domain and get back enriched company data using my Clay routine.* | **Run Clay enrichment on demand from a simple UI.** The app submits the domain to a Clay routine, tracks the run until it completes, and displays the enriched result. |
| Bulk enrichment tracker | *Use Clay and build an app where I upload a CSV of leads, run them through my enrichment routine, and watch progress.* | **Manage large enrichment jobs with a clear lifecycle.** The app submits records to a Clay routine in batches and shows submitted, processing, and done states for each. |
| Market mapping tool | *Use Clay and build an app that maps companies in a segment by industry and revenue band.* | **Explore a market segment with Clay company data.** The app runs company searches with structured filters and visualizes the results by firmographic attributes. |
| Clay table viewer | *Use Clay and build an internal page that shows rows from my Clay table filtered by status.* | **Give your team a tailored window into a Clay table.** The app queries the table with structured filters and renders only the fields the team needs. |

## How to connect Clay

Who can create Clay connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

You can create multiple Clay connections using different API keys, which is useful for separating environments (for example, development and production) or connecting different Clay workspaces.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Clay, make sure you have:

* A Clay account with access to the workspace you want to connect
* A Clay Public API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Searches and routine runs made through this connector consume Clay credits and count toward your Clay plan's rate limits. Billing is handled directly by Clay, not Lovable.

### Step 1: Get a Clay API key

A Clay Public API key lets your Lovable app authenticate with the Clay Public API.

To create a Clay API key:

**1. Open your Clay account**

Sign in to [Clay](https://app.clay.com/) with the account that has access to your workspace.

**2. Open API keys**

Go to **Settings → Account → API keys (beta)**.

**3. Create a key**

Create a new API key and give it a descriptive name, for example `Lovable integration`.

**4. Copy the key**

Copy the key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

> [!NOTE]
>
> The connector requires a **Public API key** created under **API keys (beta)**. Clay's legacy workspace API key will not work.

See Clay's documentation for more: [Clay authentication](https://developers.clay.com/public-api/authentication).

### Step 2: Connect Clay to Lovable

You can create multiple connections using different API keys.

**1. Open Clay in Connectors**

Go to **Connectors** and select **Clay**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Clay Prod`.
2. **API key**: paste your Clay Public API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key with Clay before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Clay (based on configured connection-level access). Your Lovable apps can then start searching people and companies, running routines, and querying tables.

## Working with routines and tables

* **Routines run asynchronously.** Apps submit records to a routine, then poll for results while Clay processes them. Design flows around a submitted, processing, and done lifecycle rather than expecting instant answers. Routine executions consume Clay credits, so surface expected volume before large runs.
* **Tables require a table id.** There is no list-tables endpoint in Clay's Public API. To query a table, provide its id, found in the Clay URL after `/tables/`, in your prompt.
* **Table queries require Clay Enterprise.** Clay makes the tables endpoint available on its Enterprise plans only; people and company search and routines work on other Clay plans.

## Limitations

The Clay connector cannot:

* Query Clay tables unless your Clay workspace is on a Clay Enterprise plan
* Receive Clay webhooks or real-time events
* Bypass Clay rate limits or credit consumption. Searches and routine runs count toward your Clay plan.
* Rotate API keys automatically. To rotate, generate a new key in Clay and update the Lovable connection.
* Support per-end-user Clay login. Each connection represents a single Clay workspace shared across all projects linked to it.

## Manage your Clay connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Clay**, then open the connection.

* **Unlink projects** to remove Clay access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Clay stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
