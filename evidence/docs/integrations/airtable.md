# Connect your app to Airtable
<!-- source: https://docs.lovable.dev/integrations/airtable.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Airtable

> Connect your app to Airtable, a spreadsheet-database hybrid, to read and write bases, tables, and records, and turn an Airtable base into a custom app interface.

[Airtable](https://airtable.com/) lets your Lovable app read from and write to bases, tables, and records managed by your team in the Airtable app. It's designed for apps where the source of truth lives in Airtable and you want a custom interface (internal tool, customer-facing portal, or workflow) on top of it.

Airtable is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Airtable, your app can:

* List bases, tables, fields, and views using the Metadata API
* Create, read, update, and delete records in any base
* Filter, sort, and paginate records using Airtable formulas and views
* Build internal tools and customer-facing apps backed by Airtable data
* Keep a single source of truth in Airtable while exposing a tailored UI to users

Each Airtable connection uses a single **Airtable Personal Access Token (PAT)**. The PAT determines which bases and which operations the connection can perform. Lovable inherits whatever scopes you grant the token.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Internal CRM on top of Airtable | *Use Airtable and build a CRM that reads contacts and deals from my Airtable base and lets the team update statuses inline.* | **Turn an Airtable base into a custom CRM.** The app reads contacts and deals, lets users update fields, and writes changes back so Airtable stays the source of truth. |
| Customer-facing portal | *Use Airtable and build a customer portal where each customer sees only their own orders from my Airtable Orders table.* | **Expose a filtered view of an Airtable table to customers.** The app filters records by customer, renders a tailored UI, and hides the rest of the base. |
| Inventory or asset tracker | *Use Airtable and build an inventory app where staff can scan items, view stock, and update quantities in Airtable.* | **Replace manual Airtable editing with a focused operational UI.** The app reads inventory records, supports search and barcode scan, and pushes quantity updates back to the base. |
| Submission form that writes to Airtable | *Use Airtable and build a job application form. When someone submits it, create a new record in my Applications table.* | **Capture user input and create Airtable records.** The app validates submissions, formats the payload, and creates a row in the chosen table. |
| Event RSVP and attendee dashboard | *Use Airtable and build an RSVP page that writes responses to Airtable and shows a live attendee count to admins.* | **Run events end-to-end on Airtable.** The app collects RSVPs, writes them to a table, and renders a dashboard for organizers from the same data. |
| Directory or catalog | *Use Airtable and build a directory where each row in my Airtable base becomes a detail page, with filters by category and tag.* | **Render an Airtable table as a browsable directory.** The app lists items with filters, links to detail pages by record ID or slug, and reads all fields from Airtable. |
| Content calendar or workflow board | *Use Airtable and build a content calendar that reads my Editorial base and lets editors move pieces between status columns.* | **Give a team a focused workflow UI on top of Airtable.** The app reads records grouped by status, supports drag-and-drop, and updates the status field in Airtable. |

## How to connect Airtable

Workspace **admins** and **owners** can connect Airtable.

You can create multiple Airtable connections using different Personal Access Tokens. This is useful for separating environments (for example, development and production), scoping connections to different bases, or limiting which operations a given app can perform.

When the connection is created, Airtable can be linked to any project in the workspace. Multiple projects can use the same connection.

### Prerequisites

Before connecting Airtable, make sure you have:

* An Airtable account with access to the bases you want to connect
* An Airtable Personal Access Token (PAT) with the right scopes and base access
* Lovable workspace owner or admin role

> [!NOTE]
>
> All API requests made through this connector use your Personal Access Token. API usage counts toward your Airtable plan's rate limits and record limits, and billing is handled directly by Airtable, not Lovable.

### Step 1: Create an Airtable Personal Access Token

A **Personal Access Token (PAT)** lets your Lovable app authenticate with the Airtable Web API. PATs are scoped, so you choose which bases the token can access and which operations it can perform.

To create a PAT:

**1. Open the Airtable tokens page**

Sign in to Airtable and go to [airtable.com/create/tokens](https://airtable.com/create/tokens).

**2. Create a new token**

Click **Create new token** and give it a descriptive name, for example `Lovable integration`.

**3. Add scopes**

Add the scopes your app needs. Common scopes:

* `data.records:read`: read records from tables
* `data.records:write`: create, update, and delete records
* `schema.bases:read`: list bases, tables, and fields (Metadata API)
* `schema.bases:write`: create or modify tables and fields

Most Lovable apps only need `data.records:read`, `data.records:write`, and `schema.bases:read`. Grant only the scopes your app actually needs.

**4. Add base access**

Under **Access**, choose which bases this token can use. You can grant access to specific bases or to all bases in a workspace. Limit access to the smallest set of bases your app needs.

**5. Generate and copy the token**

Click **Create token** and copy the value.

> [!NOTE]
>
> Your Personal Access Token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Airtable docs for detailed instructions: [Personal access tokens](https://airtable.com/developers/web/guides/personal-access-tokens).

### Step 2: Connect Airtable to Lovable

You can create multiple connections using different Personal Access Tokens.

To connect Airtable:

**1. Open Airtable in Connectors**

Go to **Connectors** and select **Airtable**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: Name the connection, for example `Airtable Prod`.
2. **Personal access token**: Paste your Airtable PAT.
3. **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**4. Connect**

Click **Connect** at the bottom of the form.

Lovable verifies the token with Airtable. If the token is invalid or has been revoked, the connection will fail and you can paste a new one.

When connected, your Lovable apps can start reading from and writing to your Airtable bases.

## Working with bases, tables, and records

The Airtable Web API exposes two surfaces, and both are available through the connector:

* **Metadata API**: list bases, tables, fields, and views. Useful when you want Lovable to discover the schema of a base without hardcoding IDs.
* **Record API**: create, read, update, and delete records in a specific table.

When prompting Lovable, it helps to mention the **base name** and **table name** you want to use, and which fields to read or write.

## Limitations

The Airtable connector wraps the Airtable Web API.

The Airtable connector cannot:

* Receive Airtable webhooks or change events (apps must poll Airtable for updates)
* Use Airtable Automations or scripting block features from your app
* Support per-end-user authentication
* Exceed Airtable's per-base API rate limits. Heavy traffic should batch requests

If a request fails because the Personal Access Token has been revoked, rotated, or no longer has access to a base, you'll need to create a new token in Airtable and reconnect. There is no automatic refresh for PATs.

## Manage your Airtable connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Airtable**, then open the connection.

* **Unlink projects** to remove Airtable access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Airtable stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
