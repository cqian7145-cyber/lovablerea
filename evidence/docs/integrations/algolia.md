# Connect your app to Algolia
<!-- source: https://docs.lovable.dev/integrations/algolia.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Algolia

> Connect your app to Algolia, a hosted search and indexing engine, to add full-text search, faceted filtering, and indexing to your Lovable app.

[Algolia](https://www.algolia.com/) is a hosted search and indexing engine. The Algolia connector lets your Lovable app index records and run fast, typo-tolerant search across product catalogs, content libraries, marketplaces, and directories. It's designed for apps where database queries aren't enough and you need faceted filtering and ranking.

Algolia is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Algolia, your app can:

* Index your records in Algolia and reindex them when they change
* Search those records with typo tolerance and relevance ranking
* Filter, sort, and browse results by facets such as category or price
* Search straight from your app's interface with a search-only public key

Algolia is a search engine, not a database: keep your primary data store and reindex when records change. For simple search over a small list, your database or frontend is enough. Algolia is a good fit when you need typo tolerance, faceted filters, or ranking across larger record sets.

## Common use cases and example apps

These examples show what you can build with Algolia, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **E-commerce product search** | *Use Algolia and build a product catalog with instant search and faceted filters for price, category, and availability.* | **Power product discovery with instant search.** The app indexes products and renders a search experience with facets and ranking tuned for relevance. |
| **Documentation site search** | *Use Algolia and add a search bar to my docs site with autocomplete and keyboard shortcuts.* | **Add fast in-page search to a docs site.** The app indexes pages and headings so readers can find content with autocomplete and typo tolerance. |
| **Marketplace listings** | *Use Algolia and build a marketplace where buyers filter listings by location, price, and condition.* | **Run faceted search across marketplace listings.** The app indexes listings and exposes filters and sorting so buyers narrow results quickly. |
| **Blog or editorial search** | *Use Algolia and add search to my blog with tag and author filters.* | **Surface relevant articles through search and filtering.** The app indexes posts and metadata, then renders ranked results filtered by tag, author, or date. |
| **Internal directory** | *Use Algolia and build an employee directory where people search by name, team, or skill.* | **Find people fast across an internal directory.** The app indexes employee records and renders typo-tolerant search with team and skill filters. |
| **Location finder** | *Use Algolia and build a restaurant finder with geo search and cuisine filters.* | **Search nearby places with geo and category filters.** The app uses Algolia's geo search and filters to render a finder UI with map results. |

## How to connect Algolia

Who can create Algolia connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Algolia connections using different application IDs and keys, which is useful for separating environments (for example, development and production), targeting different Algolia applications, or scoping keys to specific indexes.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Algolia, make sure you have:

* An Algolia account and application
* Your Algolia application ID
* A backend API key with the ACLs your app needs for indexing (at least `addObject`, `editSettings`, and `deleteIndex`)
* A public API key restricted to the `search` ACL. The form marks it optional, but any search in your app needs it
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All search and indexing operations made through this connector count toward your Algolia plan limits. Billing and quotas are handled directly by Algolia, not Lovable.

### Step 1: Get your Algolia application ID and API keys

Your Lovable app indexes with an application ID and a backend API key, and searches from the frontend with a public API key.

To get the values from Algolia:

**1. Open your Algolia dashboard**

Sign in to the [Algolia dashboard](https://dashboard.algolia.com/) and select the application you want to connect.

**2. Open API keys**

Go to **Settings → API Keys**. Your application ID is shown at the top of this page.

**3. Create a backend API key**

Click **New API key** and create a key for backend use. Give it a descriptive name, for example `Lovable backend`, and restrict it to the indexes your app uses. Grant only the ACLs the app needs for indexing: at least `addObject`, `editSettings`, and `deleteIndex`, plus `deleteObject` if the app removes single records.

Do not use your Algolia admin API key. A dedicated key with the minimum ACLs can be rotated or revoked without affecting other integrations.

**4. Create a public search API key**

Create a second key with only the `search` ACL, restricted to the indexes the frontend can query. Your app searches Algolia from the browser with this key. The backend key is not used for search.

Lovable checks this key on save and rejects it if it carries any ACL other than `search`. Restrict the key to specific indexes (and, if possible, domains) in Algolia for defense in depth.

> [!WARNING]
>
> Your secret backend API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Algolia documentation for details: [API keys guide](https://www.algolia.com/doc/guides/security/api-keys/).

### Step 2: Connect Algolia to Lovable

You can create multiple connections using different application IDs and keys.

**1. Open Algolia in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Algolia**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Algolia Prod`. This name is only used inside Lovable to identify the connection.
2. **Application ID**: paste your 10-character Algolia application ID. This value is visible in your published app.
3. **Secret API key**: paste your backend API key. It stays on the server and is proxied through the Lovable connector gateway.
4. **Public API key**: paste your `search`-only API key. The form marks the field optional, but without it your app can index records but not search them. This value is visible in your published app.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the keys against the Algolia API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Algolia (based on configured connection-level access). Your Lovable apps can then index records and run search through the connector.

## Public and secret API keys

The connector uses two keys with different roles:

* The **secret backend API key** is used for server-side calls (indexing, settings, and reindexing). It's proxied through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), so the raw key never reaches the published app.
* The **public API key** is what your app searches with. Lovable exposes it to the frontend, which queries Algolia directly, and never routes search through your backend. Lovable accepts only a `search`-only key here and rejects any key with broader permissions.

If you connect without a public key, Lovable can index and manage your data but cannot add search to the app. Add the key to the connection when you need search.

Deleting a project, workspace, or connection does not delete your Algolia indexes. Remove unused indexes in the Algolia dashboard.

## Limitations

The Algolia connector cannot:

* Rotate API keys for you. To rotate, create a new key in Algolia and update the Lovable connection.
* Accept a public API key with any ACL other than `search`. Keys with broader permissions are rejected on save.
* Support per-end-user Algolia login. Each connection represents a single Algolia application shared across all projects linked to it.

## Manage your Algolia connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Algolia**, then open the connection.

* **Unlink projects** to remove Algolia access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Algolia stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
