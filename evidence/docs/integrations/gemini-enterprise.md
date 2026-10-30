# Connect your app to Gemini Enterprise
<!-- source: https://docs.lovable.dev/integrations/gemini-enterprise.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Gemini Enterprise

> Connect your app to Gemini Enterprise, Google Cloud's enterprise search platform, to search connected data stores and show grounded answers with citations.

[Gemini Enterprise](https://cloud.google.com/enterprise-search) is Google Cloud's search and grounded-answer platform for enterprise data. The Gemini Enterprise connector lets your Lovable app use a Gemini Enterprise engine you already configured in Google Cloud. You can build search pages, Q\&A assistants, and internal tools on top of connected company data. It's designed for organizations that already use Gemini Enterprise or Vertex AI Search as the layer that unifies their internal sources.

Gemini Enterprise is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Gemini Enterprise, your app can:

* Search your organization's connected data sources in plain language
* Get answers grounded in that content, with citations
* Ask follow-up questions in the same conversation
* Show ranked results with filters and facets
* See which data sources are connected to your engine

Gemini Enterprise is a good fit for internal knowledge search, support assistants, and research tools built on an existing search layer. It is not the right choice when you need to write to the source systems themselves, such as sending email or creating Jira issues.

## Common use cases and example apps

These examples show what you can build with Gemini Enterprise, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Internal knowledge assistant** | *Use Gemini Enterprise and build a chat interface that answers employee questions and always shows citations.* | **Create a grounded Q\&A experience on top of your indexed company content.** The app asks Gemini Enterprise for grounded answers and displays source-backed responses with follow-up questions. |
| **Enterprise search portal** | *Use Gemini Enterprise and build a search page with filters, result cards, and a document preview panel.* | **Turn Gemini Enterprise into a structured search UI.** The app returns ranked results from connected data stores and lets people browse sources directly. |
| **Support knowledge tool** | *Use Gemini Enterprise and build a support workspace where agents search help content and get a cited answer before replying.* | **Help support teams find trusted answers faster.** The app combines search and grounded answer generation so agents can check what the source documents say. |
| **Cross-source research assistant** | *Use Gemini Enterprise and build a research assistant that searches across our connected data stores and summarizes the findings with citations.* | **Search across blended enterprise sources from one interface.** The app retrieves and summarizes results across the data stores connected to your engine. |
| **Source explorer** | *Use Gemini Enterprise and build an admin page that lists our connected data stores and lets people search within a selected source.* | **Make the search configuration visible inside your app.** The app lists connected data stores, shows their types, and targets search to selected sources. |

## How to connect Gemini Enterprise

Who can create Gemini Enterprise connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Gemini Enterprise connections using different engines, environments, or Google accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Gemini Enterprise, make sure you have:

* A Google Cloud project with a Gemini Enterprise or Vertex AI Search engine, with data stores already connected to it
* A Google account that can access the engine and the connected content you want the app to use
* The engine's **GCP project ID**, **Location** (`global`, `us`, or `eu`), and **Engine ID**
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All requests made through this connector count toward your Google Cloud project's Gemini Enterprise usage and quotas. Billing is handled directly by Google Cloud, not Lovable.

### Set up your Gemini Enterprise connection

You authorize Lovable with your Google account and do not need an API key. Data sources are configured in your Gemini Enterprise instance by your Google Cloud admin, not in Lovable.

**1. Open Gemini Enterprise in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Gemini Enterprise**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Gemini Enterprise Prod`. This name is only used inside Lovable to identify the connection.
2. **GCP project ID**: the Google Cloud project where your Gemini Enterprise engine lives.
3. **Location**: select where the engine was created: **Global (default)**, **United States (us)**, or **European Union (eu)**. Most engines use global. The us and eu locations are for data residency.
4. **Engine ID**: the ID of your Gemini Enterprise app, shown in the **ID** column of the Apps page in Google Cloud. This is not the app name.

**4. Review scopes (optional)**

Under **Scopes**, review the permission the connection requests. **Cloud Platform (full access)** (`https://www.googleapis.com/auth/cloud-platform`) is the only scope and is selected by default. Leave it selected, because Gemini Enterprise requests need it.

For full scope documentation, see [Google's OAuth scopes reference](https://developers.google.com/identity/protocols/oauth2/scopes).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Google and authorize**

Click **Connect** at the bottom of the form. The Google authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in with the Google account that can access the engine, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation. Lovable refreshes the Google access automatically, so you reconnect only if authorization is revoked.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Gemini Enterprise (based on configured connection-level access). Your Lovable apps can then search and get grounded answers from the connected engine.

## What your app can search

Each connection is tied to one engine and to the Google account that authorized it. What your app can retrieve depends on both. Your Google Cloud admin decides which data stores are connected to the engine, and the Google account decides what is visible in Google Workspace and supported third-party sources. Gemini Enterprise applies the account's access on every request, so results can differ between two connections that point at the same engine.

For the sources Gemini Enterprise can index, see Google's list of [supported data sources and connectors](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores).

## Limitations

The Gemini Enterprise connector cannot:

* Expose the raw APIs of systems behind Gemini Enterprise, such as Jira REST or Microsoft Graph. It reaches them only through search and grounded answers.
* Run Gemini Enterprise actions, such as sending an email or creating an issue. Actions are available only in the Google Cloud console, not through the API.
* Search website data stores. Gemini Enterprise search and assistant apps do not support them.
* Support per-end-user Google login. Each connection represents a single Google account shared across all projects linked to it.

If Google authorization is revoked from the Google side, reconnect the connection in Lovable before API calls can succeed again.

## Troubleshooting

If requests through the connection fail, the sections below cover the most common errors and how to resolve them.

> **Requests fail with a 403 error**
>
> The Google account that authorized the connection cannot access the engine or the data sources behind it. Confirm the account's access in Google Cloud, or reconnect with an account that has it.

> **Requests fail with a 404 error**
>
> The **GCP project ID**, **Location**, or **Engine ID** on the connection does not match the engine in Google Cloud. Open the connection in Lovable, correct the values, and click **Reconnect** to authorize again. Reconnect is what saves the change.

> **Requests fail with a 429 error**
>
> Your Google Cloud project is hitting Gemini Enterprise quotas or rate limits. Review quotas in the Google Cloud console and ask Lovable to add retries with backoff.

## Manage your Gemini Enterprise connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Gemini Enterprise**, then open the connection.

* **Unlink projects** to remove Gemini Enterprise access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Gemini Enterprise stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Ashby](https://docs.lovable.dev/integrations/ashby.md)
- [Connect your app to Pledge](https://docs.lovable.dev/integrations/pledge.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
