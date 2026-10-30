# Connect your app to Perplexity
<!-- source: https://docs.lovable.dev/integrations/perplexity.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Perplexity

> Connect your app to Perplexity, an AI search and answer engine, to return cited answers from live web, academic, and financial sources. Use Lovable's managed connection for web search, or your own API key for the full Perplexity API.

[Perplexity](https://www.perplexity.ai/) is an AI search and answer engine that returns concise answers grounded in live web data and backed by sources. The Perplexity connector lets your Lovable app call the Perplexity API with a shared connection. It's designed for apps that need fresh, source-backed information rather than static or training-only knowledge.

Perplexity is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Perplexity, your app can:

* Search the live web and get ranked results with titles, links, snippets, and dates
* Answer questions with current information from the web and cite the sources
* Search only academic papers or only SEC filings when a question calls for it
* Turn a single question into a long-form research report
* Pick a faster or a more thorough model for each request

Perplexity is a good fit for news trackers, research assistants, market intelligence dashboards, and fact-checking apps.

## Two ways to connect

When adding a connection, you choose between two options. They differ in what your app can do and who bills the usage.

| Capability | Managed by Lovable | Use your own credentials |
| :- | :- | :- |
| Web search results with sources (Search API) | Yes | Yes |
| Cited answers and grounded chat (Sonar models) | No | Yes |
| Academic and SEC filings search modes | No | Yes |
| Deep research reports | No | Yes |
| Perplexity account and API key needed | No | Yes |
| Usage billed by | Lovable, through workspace credits | Perplexity, on your Perplexity account |

On a managed connection, Lovable builds search features only. When you ask for summaries or chat-style answers, Lovable combines Perplexity search results with [Lovable AI](https://docs.lovable.dev/features/ai), which bills its own AI usage. If you ask for grounded chat, deep research, or academic or SEC search, Lovable tells you in chat that those need your own Perplexity API key and does not build them on the managed connection.

## Common use cases and example apps

These examples show what you can build with Perplexity, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Sales prep assistant** | *Use Perplexity and build a sales prep assistant that gathers company context before each call.* | **Pull company overviews, recent news, and leadership changes with live search.** The app runs Perplexity searches before a meeting and presents a concise, cited briefing for sales reps. |
| **Competitor research tool** | *Use Perplexity and build a competitor research tool that summarizes funding, launches, and positioning changes.* | **Summarize market activity across many sources at once.** The app runs several Perplexity searches in parallel and aggregates the cited results into a research dashboard. |
| **Regulatory tracker** | *Use Perplexity and build an app that tracks regulatory updates and policy changes for our industry.* | **Monitor new rulings and compliance updates from recent sources.** The app queries Perplexity on a schedule and surfaces newly published or updated information with citations. |
| **Fact-checking app** | *Use Perplexity and build a fact-checking app that verifies a statement against supporting and contradicting sources.* | **Check claims against live sources.** The app accepts a statement as input and returns a synthesized verdict with cited references. |
| **Academic research assistant** | *Use Perplexity and build a research assistant that answers questions from peer-reviewed papers only.* | **Answer open-ended questions from scholarly sources.** The app uses Perplexity's academic search mode to generate structured, cited responses. Needs your own credentials. |
| **Deep research report generator** | *Use Perplexity and build a tool that produces a long-form research report on a topic with sources.* | **Turn one question into a full report.** The app calls Perplexity's deep research model, which runs many queries and synthesizes a report in a single request. Needs your own credentials. |

## How to connect Perplexity

Who can create Perplexity connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you choose between two options:

* **Managed by Lovable**: Lovable provides and manages the credentials for you. Web search only. Each search spends workspace credits.
* **Use your own credentials**: connect with your own Perplexity API key for the full Perplexity API, and manage billing in Perplexity.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

Follow the setup steps below for the option you want.

**Managed by Lovable**

Choose this option for the fastest setup. You don't need a Perplexity account or API key. The managed connection supports the Perplexity Search API only: web search results with sources, filtered by domain or recency.

> [!NOTE]
>
> You can create one managed Perplexity connection per workspace. If one exists, the **Managed by Lovable** option is unavailable in the form until you delete it.

### Usage and billing

Lovable charges each successful search request to the workspace that owns the project at the rate in [Pricing](#pricing) below. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for how usage-based credits work.

A workspace can make up to 1,000 managed search requests per 24 hours across all of its projects. Requests beyond that limit fail until the window passes. If the workspace runs out of credits, search requests fail until you top up. The connection's page shows its credit usage, which may not appear immediately.

### Set up the managed connection

To create the managed connection:

**1. Open Perplexity in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Perplexity**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

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

Above the button, a usage note explains that connecting lets Lovable send data to Perplexity and deduct Lovable credits, with links to Perplexity's pricing and to Lovable's [provider rules for Perplexity](https://lovable.dev/provider-rules#perplexity). Click **Connect**.

**Use your own credentials**

Choose this option to use the full Perplexity API, including cited answers, grounded chat, academic and SEC search modes, and deep research, and to manage billing directly with Perplexity.

You can create multiple Perplexity connections using different API keys, which is useful for separating environments (for example, development and production) or managing spend per environment.

### Prerequisites

Before connecting Perplexity with your own credentials, make sure you have:

* A Perplexity account with permission to manage billing and API keys, and a payment method or API credits set up
* A Perplexity API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All search and answer requests through this connection consume Perplexity API credits. API credits are managed separately from a Perplexity Pro subscription. Billing is handled directly by Perplexity, not Lovable.

### Step 1: Get a Perplexity API key

A Perplexity API key lets your Lovable app authenticate with the Perplexity API. You can create multiple keys in Perplexity.

To create a Perplexity API key:

**1. Open the Perplexity API console**

Sign in to the [Perplexity API console](https://console.perplexity.ai/) with your Perplexity account.

**2. Set up your API group and billing**

If this is your first key, open **Settings** and enter your organization details (name, address, and tax details). Then open **Billing** and click **Add payment method**, or add API credits. Keys without credits return quota errors.

**3. Create a key**

Open **API keys** and click **Generate API Key**. Give the key a descriptive name, for example `Lovable integration`.

**4. Copy the key**

Copy the generated API key and store it securely. It starts with `pplx-`.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Perplexity documentation for more: [API groups and billing](https://docs.perplexity.ai/getting-started/api-groups).

### Step 2: Connect Perplexity to Lovable

You can create multiple connections using different API keys. To connect Perplexity with your key:

**1. Open Perplexity in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Perplexity**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change, for example to `Perplexity Prod`. The name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Configure connection**, select **Use your own credentials**.

**5. Enter your API key**

In **API key**, paste your Perplexity API key (it starts with `pplx-`). **Get value** next to the field opens the Perplexity API console.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Perplexity API before saving the connection.

> [!NOTE]
>
> Unlike most app + chat connectors, a connection with your own credentials does not route through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors). Lovable stores the API key as a secret in each linked project, and your app calls Perplexity from its server, not from the browser. Managed connections do route through the connector gateway.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Perplexity (based on configured connection-level access). Your Lovable apps can then retrieve up-to-date, source-backed results from Perplexity.

## Pricing

With **Managed by Lovable**, search costs **20 Lovable credits per 1,000 searches**, or **10 Lovable credits on Business plans**. That matches Perplexity's [Search API list price](https://docs.perplexity.ai/getting-started/pricing) of \$5 per 1,000 requests.

Lovable meters each successful search request, so cost follows how many searches your app runs, not how many results each one returns. Lovable charges the workspace that owns the project, whether the search runs in the preview while you build or in your published app, and the usage appears under [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs).

With **Use your own credentials**, Perplexity bills usage directly to your Perplexity account, and Lovable credits do not apply.

## Limitations

The Perplexity connector cannot:

* Call anything beyond the Search API on a managed connection. Grounded chat, Sonar models, deep research, and the academic and SEC search modes need a connection that uses your own credentials. Lovable does not build those features on a managed connection.
* Rotate API keys automatically for connections that use your own credentials. To rotate, create a new key in Perplexity and update the Lovable connection.
* Support per-end-user Perplexity login. Each connection represents a single Perplexity account, or Lovable's managed access, shared across all projects linked to it.

## Troubleshooting

If requests through the connection fail, the sections below cover the most common errors and how to resolve them.

> **Managed connection: requests fail with 403 and "endpoint\_not\_allowed"**
>
> The app calls a Perplexity endpoint other than search, which the managed connection does not allow. Ask Lovable to rebuild the feature on Perplexity search results, or add a connection with **Use your own credentials** and link the project to it.

> **Managed connection: requests fail with 402**
>
> The workspace that owns the project has run out of credits. Top up credits for that workspace, and requests resume. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Own credentials: requests fail with 401 and "insufficient\_quota"**
>
> The API key is valid, but the Perplexity account it belongs to has run out of API credits. Buy or top up API credits in the [Perplexity API console](https://console.perplexity.ai/) for that account. A Pro subscription's credits are managed separately.

## Manage your Perplexity connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Perplexity**, then open the connection.

* **Unlink projects** to remove Perplexity access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Perplexity stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
