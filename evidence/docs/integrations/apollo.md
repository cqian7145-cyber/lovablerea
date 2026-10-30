# Connect your app to Apollo.io
<!-- source: https://docs.lovable.dev/integrations/apollo.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Apollo.io

> Connect your app to Apollo.io to search its B2B database of people and companies, enrich contact and organization data, and manage contacts, accounts, and deals from your Lovable app.

[Apollo.io](https://www.apollo.io/) is a B2B sales intelligence and engagement platform with a database of people and companies. The Apollo.io connector lets your Lovable app search that database, enrich contacts and organizations, and manage contacts, accounts, and deals.

Apollo.io is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Apollo.io, your app can:

* Search Apollo's B2B database for people and companies
* Enrich contacts and organizations with profile and firmographic data
* Create and manage contacts, accounts, and deals
* Build prospecting and outreach workflows on live sales data

It's a good fit for prospecting dashboards, lead-enrichment forms, and internal sales tools built on live Apollo data.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Company research page** | *Use Apollo.io and build a company research page that searches Apollo by company name and shows firmographic details.* | **Turn a company name into a research profile.** The app searches Apollo for matching companies and displays their size, industry, and location. |
| **Lead enrichment form** | *Use Apollo.io and build a form where I enter a company domain and get back enriched firmographic data.* | **Enrich records from a single input.** The app calls Apollo's organization enrichment and fills in company details automatically. |
| **Prospecting list builder** | *Use Apollo.io and build a prospecting tool that searches for people by title and industry and saves them to a list.* | **Find and shortlist prospects from live data.** The app searches Apollo's people database and lets you save matches for outreach. |
| **Contact enrichment on signup** | *Use Apollo.io and enrich each new signup with their company data when they register.* | **Add context to new users automatically.** The app enriches the signup's email or domain with Apollo firmographics and stores the result. |
| **Sales pipeline dashboard** | *Use Apollo.io and build a dashboard that creates and tracks accounts and deals from prospect research.* | **Manage accounts and deals alongside research.** The app creates Apollo contacts, accounts, and deals and shows their status in one view. |
| **ICP account finder** | *Use Apollo.io and build a tool that finds companies matching our ideal customer profile by size, industry, and location.* | **Surface accounts that match your ICP.** The app queries Apollo with firmographic filters and lists companies that fit. |

## How to connect Apollo.io

Who can create Apollo.io connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

You can create multiple Apollo.io connections using different API keys, which is useful for separating environments (for example, development and production) or using different Apollo accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Apollo.io, make sure you have:

* An Apollo.io account
* An Apollo.io API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All search and enrichment requests through this connector consume Apollo credits and count toward your Apollo plan's rate limits. Billing and quota are handled directly by Apollo.io, not Lovable.

### Step 1: Get an Apollo.io API key

An API key lets your Lovable app authenticate with the Apollo.io API. Apollo scopes each key to the endpoints you grant it, so create the key with access to the endpoints your app needs.

To create an Apollo.io API key:

**1. Open your Apollo.io account**

Sign in to [Apollo.io](https://app.apollo.io/).

**2. Open API settings**

Go to [Settings → Integrations → API Keys](https://app.apollo.io/#/settings/integrations/api).

**3. Create a key**

Click **Create new key**, give it a descriptive name, for example `Lovable integration`, grant access to the API endpoints your app needs, then click **Create API key** to finish. Some endpoints, such as people search, require a master API key.

**4. Copy the key**

Copy the key and store it securely. You'll paste it into Lovable in the next step.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly.

See the [Apollo API documentation](https://docs.apollo.io/) for details.

### Step 2: Connect Apollo.io to Lovable

You can create multiple connections using different API keys.

**1. Open Apollo.io in Connectors**

Go to **Connectors** and select **Apollo.io**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Apollo.io Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste your Apollo.io API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable validates the key against Apollo before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Apollo.io (based on configured connection-level access). Your Lovable apps can then search, enrich, and manage Apollo data through Lovable's connector gateway.

## Endpoint access and credits

Apollo scopes API keys per endpoint, so a key can call some endpoints and not others. If a request returns a 403 with `error_code: API_INACCESSIBLE`, the connected key does not have access to that endpoint. Some endpoints, such as people search, require a master API key. Enable the endpoints your app needs (or use a master key) under **Settings → Integrations → API Keys** in Apollo, then update the Lovable connection if you created a new key.

Search and enrichment requests consume Apollo credits and count toward Apollo's per-minute, hourly, and daily rate limits. Cache results and fetch on demand rather than on every page load, so your app stays within Apollo's quota.

Lovable routes your app's server-side Apollo calls through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors); if you edit backend code yourself, call the gateway rather than `https://api.apollo.io` directly.

## Limitations

The Apollo.io connector cannot:

* Refresh or rotate API keys automatically. To rotate, create a new key in Apollo and update the Lovable connection
* Support per-end-user Apollo authentication. Each connection represents a single Apollo account shared across all projects linked to it

If an API key is revoked or deleted in Apollo, reconnect the integration in Lovable with a valid key before API calls can succeed again.

## Manage your Apollo.io connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Apollo.io**, then open the connection.

* **Unlink projects** to remove Apollo.io access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Apollo.io stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to incident.io](https://docs.lovable.dev/integrations/incidentio.md)
- [Connect your app to Gong](https://docs.lovable.dev/integrations/gong.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
