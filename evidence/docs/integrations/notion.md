# Connect your app to Notion
<!-- source: https://docs.lovable.dev/integrations/notion.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Notion

> Connect your app to Notion, an all-in-one workspace for docs, wikis, and databases, to read and write pages, query databases, and build apps backed by content your team manages in Notion.

[Notion](https://www.notion.so/) is a workspace for docs, wikis, projects, and databases. The Notion app + chat connector lets your Lovable app reach the pages and databases your team has shared with it, so you can build apps that turn Notion content into a customer-facing experience or push structured data back into Notion as your source of truth.

The Notion app + chat connector lets apps you build with Lovable read and write Notion content while people use them.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Notion connection in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable read your own Notion account as context while you build, personal to you |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Notion account and work with their own data (requires a public Notion integration, and each user picks the pages to share) |

With Notion, your app can:

* Read pages, blocks, and rich text from your Notion workspace
* Query Notion databases with filters, sorts, and pagination
* Create new pages and append blocks to existing pages
* Update database rows (for example, status, owner, due date)
* Drive content-managed sites and dashboards where editors work in Notion

Each Notion connection is authorized for a single Notion workspace and only sees the pages and databases that were explicitly shared with the integration during authorization. You can create multiple connections to work across multiple workspaces or to separate environments.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Marketing site backed by Notion | *Use Notion and build a marketing site that pulls landing pages and a blog from a Notion database.* | **Render a marketing site from content managed in Notion.** The app fetches pages by slug, renders the matching components, and lets editors ship updates without touching code. |
| Internal knowledge base or wiki | *Use Notion and build a searchable knowledge base from our company wiki in Notion.* | **Turn a Notion wiki into a fast, searchable site.** The app reads the page tree, builds navigation, and renders rich text and embedded blocks for each article. |
| Customer-facing help center | *Use Notion and build a help center that lists articles by category from a Notion database.* | **Publish help articles from Notion with a clean reading experience.** The app paginates by category, renders rich text, and surfaces metadata managed entirely in Notion. |
| Project tracker dashboard | *Use Notion and build a project tracker that shows tasks from our Notion database, grouped by status, with filters for owner and due date.* | **Bring a Notion database to life as a focused dashboard.** The app queries the database, groups and filters rows in the UI, and lets the team see progress at a glance. |
| Lead capture form into Notion | *Build a lead capture form. When someone submits it, create a new row in our Leads database in Notion.* | **Push form submissions into a Notion database.** The app validates the input and writes a new page in the target database so sales can work the lead from Notion. |
| Editorial content site | *Use Notion and build a blog that lists articles from a Notion database, supports tag filtering, and renders rich text.* | **Build an editorial reading experience driven by Notion pages.** The app paginates posts, filters by tag, and renders rich text and embedded blocks. |
| Status page or changelog | *Use Notion and build a public changelog that pulls release notes from a Notion database.* | **Let the team write release notes in Notion and surface them publicly.** The app reads new entries, renders them in chronological order, and exposes an RSS-style feed. |

## How Notion connections work

Lovable uses one centrally managed Notion app to power all Notion integrations across workspaces. Within your Lovable workspace:

* You can create multiple Notion connections.
* Each connection is a separate OAuth authorization tied to a single Notion workspace.
* Each connection only sees the pages and databases shared with it during authorization. It cannot reach other content in that Notion workspace.
* Multiple projects within a single Lovable workspace can use the same connection.

This makes it easy to separate environments (for example, development and production) or work with multiple Notion workspaces from the same Lovable workspace.

Notion uses Lovable's gateway architecture for secure OAuth handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

## How to connect Notion

Workspace **admins** and **owners** can connect Notion.

### Prerequisites

Before connecting Notion, make sure you have:

* A Notion workspace where you can install integrations (or request admin approval)
* Permission in Notion to share the pages and databases your app needs
* Lovable workspace **admin or owner** role

> [!NOTE]
>
> All API requests made through this connector go to your Notion workspace. Notion API usage counts toward your Notion plan limits and is handled directly by Notion, not Lovable.

### Step 1: Decide what to share with the integration

Notion only exposes content that has been **explicitly shared with the integration**. Before authorizing, decide which pages and databases your app should be able to read or write.

> [!TIP]
>
> Share a single top-level page (or database) and let your app reach everything beneath it via Notion's normal inheritance, rather than sharing many pages individually.

### Step 2: Connect Notion to Lovable

You can create multiple connections to authorize different Notion workspaces or to keep environments separate.

**1. Open Notion in Connectors**

Go to **Connectors** and select **Notion**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

* **Display name**: name the connection, for example `Notion Prod`.
* **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**4. Connect to Notion and authorize**

* Click **Connect** at the bottom of the form. The Notion authorization window opens. Make sure your browser doesn't block pop-ups.
* Sign in to Notion if needed and select the workspace you want to connect.
* On the **Select pages** screen, choose the pages and databases your app should be able to access. You can update this later from inside Notion.
* Review the requested permissions and click **Allow access**. You'll be redirected back to Lovable with a confirmation.

When connected, your Lovable apps can start reading and writing Notion pages and databases.

## Working with shared pages and databases

Notion's permission model is opt-in: an integration can only see what's been explicitly shared with it.

* If your app is missing content it should be able to see, share the page or database with the integration in Notion (**Share** → **Connections** → **Add connections**).
* Sharing a parent page automatically shares its sub-pages with the integration.
* You can revoke access from inside Notion at any time without removing the Lovable connection. The connection stays connected, the integration just sees less content.
* Pages your app creates or updates are attributed to the integration in Notion's page history, not to an individual user.

> [!TIP]
>
> When prompting Lovable, be explicit about which database or page the app should use, for example: *"use the Tasks database to populate the dashboard"*.

## Limitations

The Notion connector cannot:

* Receive incoming Notion webhooks or events (for example, "page updated" notifications)
* Reach pages or databases that haven't been shared with the integration
* Perform Notion workspace administration (member management, permissions, billing)

> [!WARNING]
>
> Multiple connectors that share the same Notion login and Notion workspace also share page permissions, and the most recently configured connector overwrites the permissions for all of them.

If your app needs realtime reactions to changes in Notion, build a polling pattern (for example, query the database on a schedule) instead of relying on push events.

## Manage your Notion connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Notion**, then open the connection.

* **Unlink projects** to remove Notion access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Notion stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
