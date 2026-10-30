# Connect your app to Ramp
<!-- source: https://docs.lovable.dev/integrations/ramp.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Ramp

> Connect your app to Ramp, a corporate card and spend management platform, to build apps that read transactions, cards, funds, users, and business data.

[Ramp](https://ramp.com/) is a corporate card and spend management platform for tracking company transactions, cards, spending limits, and users. The Ramp connector lets your Lovable app read data from your Ramp business. You sign in with your Ramp account, and no Ramp developer app or API key is needed.

Ramp is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Ramp, your app can:

* Read business information about your Ramp account
* List physical and virtual cards, with card numbers masked
* Read funds and their spending limits and balances
* Read transactions and filter them by date, user, card, or merchant
* List users in your Ramp business and their roles

The Ramp connector is read-only, and each connection reads from one Ramp business. It's a good fit for internal spend dashboards, transaction reporting, card and limit inventories, and finance operations tools that combine Ramp data with other systems.

## Common use cases and example apps

These examples show what you can build with Ramp, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Spend dashboard | *Use Ramp and build a dashboard that shows total spend by month, top merchants, and largest transactions.* | **Track company spending in one place.** The app reads transactions and business data from Ramp, then charts spend trends for finance and leadership. |
| Transaction explorer | *Use Ramp and build a transaction explorer that lets staff filter transactions by user, card, date range, and merchant.* | **Give teams a searchable view of Ramp transactions.** The app reads transactions from Ramp, applies filters, and shows details grouped by user or card. |
| Card and limit inventory | *Use Ramp and build a report that lists every card, the user it belongs to, and its current spending limit and balance.* | **See card assignments and spending limits at a glance.** The app reads cards, matches each card to its backing fund, and shows the limit and remaining balance for that fund. |
| Team spend report | *Use Ramp and build a monthly team spend report grouped by user and merchant category.* | **Break down spend by team member.** The app reads users and transactions from Ramp and summarizes spend per person over a chosen period. |
| Budget tracker | *Use Ramp and build a budget tracker that compares fund balances against spending limits and highlights funds that are close to their limit.* | **Watch fund usage before a fund reaches its limit.** The app reads funds and their spending limits, then flags the ones approaching their configured amount. |

## How to connect Ramp

Who can create Ramp connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Ramp connections using different Ramp businesses, which is useful if your organization operates more than one.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Ramp, make sure you have:

* A Ramp business you want to connect
* A Ramp user who can authorize third-party applications for that business, typically a Ramp Admin or Business Owner
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector read from your connected Ramp business and count toward Ramp's API rate limits. Rate limits and quota are handled directly by Ramp, not Lovable.

### Set up your Ramp connection

You create the connection in Lovable and finish by authorizing it in Ramp.

**1. Open Ramp in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Ramp**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Under **Scopes**, review the permissions your app requests. All five read scopes are selected by default, and **Business: read** is required.

| Scope | Description | Default |
| :- | :- | :- |
| Business: read (`business:read`) | Read company information. Required to verify the connection. | Required |
| Transactions: read (`transactions:read`) | Read card transactions. | On |
| Users: read (`users:read`) | Read users and their roles. | On |
| Cards: read (`cards:read`) | Read physical and virtual cards (masked numbers). | On |
| Funds: read (`funds:read`) | Read funds and spend limits. | On |

Lovable also requests `offline_access`, which keeps the connection working without asking you to sign in to Ramp again. To use a different set of scopes, delete the connection and add a new one.

For full scope documentation, see [Ramp's authorization guide](https://docs.ramp.com/developer-api/v1/authorization).

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Ramp and authorize**

Click **Connect** at the bottom of the form. The Ramp authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Ramp if prompted, review the requested permissions, and authorize the app for your business.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in chat to link their project to Ramp (based on configured connection-level access). Your Lovable apps can then read business, card, fund, transaction, and user data from the connected Ramp business.

## Limitations

The Ramp connector is read-only and cannot:

* Create or change anything in Ramp, including cards, funds, spending limits, transactions, bills, reimbursements, or vendors
* Read full card numbers and security codes, receipts, bills, reimbursements, or vendors. These need scopes the connection cannot request
* Receive Ramp webhooks or real-time event notifications
* Support per-end-user Ramp login. Each connection represents a single Ramp business shared across all projects linked to it

If your app requests data outside the selected scopes, Ramp returns a permission error. Ask Lovable to build the view from the supported data instead.

If Ramp authorization is revoked from the Ramp side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Ramp connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Ramp**, then open the connection.

* **Unlink projects** to remove Ramp access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Ramp stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Attention](https://docs.lovable.dev/integrations/attention.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
