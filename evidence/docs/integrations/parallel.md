# Connect your app to Parallel
<!-- source: https://docs.lovable.dev/integrations/parallel.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Parallel

> Connect your app to Parallel, a web search and research API, to search the web, read pages, and run deep research with cited sources.

[Parallel](https://parallel.ai/) is a web intelligence platform built for AI applications. The Parallel connector lets your Lovable app search the live web, read any public page or PDF as clean text, get cited answers to research questions, and run deep research tasks that fill structured data with sources and confidence scores. It's designed for apps that need current information from the internet rather than a static dataset.

Parallel is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Parallel, your app can:

* Search the web and get results optimized for AI, from sub-second lookups to multi-hop research
* Read a known URL or PDF as clean markdown, including JavaScript-rendered pages
* Ask research questions and get synchronous, cited answers the user can keep talking to
* Run asynchronous research tasks that fill a schema for one or many entities, with citations and a confidence score on every field

Parallel is a good fit for apps that enrich, monitor, or reason over live web data: lead enrichment, company research, due diligence, market analysis, and chatbots grounded in current sources.

## Common use cases and example apps

These examples show what you can build with Parallel, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Lead enrichment tool | *Use Parallel and build a lead enrichment tool. Users upload a list of company domains, and the app fills in funding, headcount, industry, and key contacts for each one.* | **Enrich a CRM or prospect list with researched company data.** The app runs a Parallel research task per company and fills a structured profile with cited fields the user can verify. |
| Due diligence assistant | *Use Parallel and build a due diligence assistant. Users enter a company name, and the app compiles a research report covering funding, leadership, news, and competitors.* | **Compile a sourced research report on any company.** The app runs deep research tasks and presents each finding with its sources and a confidence score. |
| Market research dashboard | *Use Parallel and build a market research dashboard. Users define a market segment, and the app researches players, pricing, and recent developments.* | **Track a market segment with researched, up-to-date data.** The app refreshes its research on demand and shows what changed since the last run. |
| Research chatbot | *Use Parallel and build a research chatbot that answers questions with citations from the live web.* | **Answer user questions with cited, current sources.** The app sends each question to Parallel and renders the answer with links to the pages it came from, keeping the conversation going with follow-ups. |
| Content summarizer | *Use Parallel and build a content summarizer. Users paste an article or PDF URL, and the app extracts the content and produces a structured summary.* | **Turn any public page or PDF into clean, structured content.** The app extracts the page as markdown and summarizes it, handling JavaScript-heavy pages and documents. |
| Competitor tracker | *Use Parallel and build a competitor tracker. Users add competitor names, and the app researches product changes, pricing, and announcements on a schedule.* | **Keep a researched profile of each competitor current.** The app re-runs research tasks on a schedule and highlights new findings with their sources. |

## How to connect Parallel

Who can create Parallel connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you can choose between:

* **Managed by Lovable**: no Parallel account or API key required. Usage spends workspace credits.
* **Use your own credentials**: connect with your own Parallel API key and manage billing in Parallel.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

Follow the setup steps below for the option you want.

**Managed by Lovable**

Choose this option for the fastest setup. You don't need a Parallel account or API key. Lovable provides and manages the credentials for you.

> [!NOTE]
>
> You can create one managed Parallel connection per workspace. If one exists, the **Managed by Lovable** option is unavailable in the form until you delete it.

### Usage and billing

Lovable charges each request through the managed connection to the workspace that owns the project, based on the cost Parallel reports for it, at the rate in [Pricing](#pricing) below. Lovable charges a research task when your app creates it, and reading its result is free. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for how usage-based credits work.

If the workspace runs out of credits, requests fail until you top up. The connection's page shows its credit usage, which may not appear immediately.

### Set up the managed connection

To create the managed connection:

**1. Open Parallel in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Parallel**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Managed by Lovable**

Under **Configure connection**, select **Managed by Lovable**.

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Above the button, a usage note explains that connecting lets Lovable send data to Parallel and deduct Lovable credits, with links to Parallel's pricing and to Lovable's [provider rules](https://lovable.dev/provider-rules). Click **Connect**.

**Use your own credentials**

Choose this option to use your own Parallel account and manage billing directly with Parallel. It also unlocks Parallel's Monitor API, so your app can watch the web for changes and react through webhooks (see [Web monitoring with your own key](#web-monitoring-with-your-own-key)).

You can create multiple Parallel connections using different API keys, which is useful for separating environments or teams.

> [!NOTE]
>
> All requests through this connection are billed to your Parallel account. Billing and quota are handled directly by Parallel, not Lovable.

### Prerequisites

Before connecting Parallel, make sure you have:

* A Parallel account
* A Parallel API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Step 1: Get a Parallel API key

Your API key authenticates your app's requests against your own Parallel account.

**1. Open your Parallel account**

Sign in to the [Parallel platform](https://platform.parallel.ai/).

**2. Create a key**

Open the API keys page and create a key. Give it a descriptive name, for example `Lovable integration`.

**3. Copy the key**

Copy the key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Parallel's documentation for more: [Parallel docs](https://docs.parallel.ai/).

### Step 2: Connect Parallel to Lovable

You can create multiple connections using different API keys.

**1. Open Parallel in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Parallel**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change, for example to `Parallel Prod`.

**4. Choose your own credentials**

Under **Configure connection**, select **Use your own credentials**.

**5. Enter your API key**

In **API key**, paste your Parallel API key.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Parallel (based on configured connection-level access). Your Lovable apps can then search the web, extract pages, and run research tasks with live, cited data.

## Pricing

With **Managed by Lovable**, usage costs **4 Lovable credits per US dollar of Parallel usage**, or **2 Lovable credits on Business plans**. Parallel prices each request or task separately, so see [Parallel's pricing](https://docs.parallel.ai/getting-started/pricing) for the underlying rates. Lovable charges the workspace that owns the project, and the usage appears under [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs).

With **Use your own credentials**, Parallel bills usage directly to your Parallel account, and Lovable credits do not apply.

## Web monitoring with your own key

On connections that use your own Parallel API key, your app can also use [Parallel's Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart): it watches the web for new information on a schedule and notifies your app through a webhook, so the app can react to competitor moves, price changes, or news without anyone opening it. Ask Lovable in the project chat to build the monitoring feature, and it creates the monitors and the webhook endpoint for you. Two things to know:

* Monitors run and bill on your Parallel account until cancelled. Deleting the Lovable connection does not cancel them; cancel monitors in your app or on the [Parallel platform](https://platform.parallel.ai/) when you no longer need them.
* Webhook deliveries are verified with your Parallel account's webhook secret, which your app needs as a backend secret. Lovable asks for it while building the feature.

Monitoring is not available on **Managed by Lovable** connections.

## Limitations

The Parallel connector cannot:

* Monitor the web on a **Managed by Lovable** connection (Parallel's Monitor API is available only with your own API key; see [Web monitoring with your own key](#web-monitoring-with-your-own-key))
* Discover entities matching a description, such as "find all companies that do X" (Parallel's FindAll API is not available through the connector)
* Support per-end-user Parallel login. Each connection represents a single Parallel account shared across all projects linked to it.

## Manage your Parallel connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Parallel**, then open the connection.

* **Unlink projects** to remove Parallel access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Parallel stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Lexware](https://docs.lovable.dev/integrations/lexware.md)
- [Connect your app to Perplexity](https://docs.lovable.dev/integrations/perplexity.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
