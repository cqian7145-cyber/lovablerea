# Connect your app to Zendesk
<!-- source: https://docs.lovable.dev/integrations/zendesk.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Zendesk

> Connect your app to Zendesk, the customer service platform, to list, search, create, and update support tickets, look up customers, and read help center articles from your Lovable app.

[Zendesk](https://www.zendesk.com/) is a customer service platform for support tickets, customer records, and a self-serve help center. The Zendesk connector lets your Lovable app read and manage your Zendesk Support account through the Zendesk API.

Zendesk is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Zendesk, your app can:

* List, search, and read tickets and their comments
* Create tickets from forms and reply to tickets with public comments or internal notes
* Look up users and organizations and create end users
* Read help center categories, sections, and articles
* Follow ticket changes over time with incremental exports
* Receive ticket events through Zendesk webhooks

Zendesk is a good fit when your team runs support in Zendesk and wants a custom Lovable app for reporting, customer-facing intake, or agent tooling that Zendesk's own interface does not offer.

## Common use cases and example apps

These examples show what you can build with Zendesk, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Support inbox** | *Use Zendesk and build a support inbox page that lists open tickets and lets an agent reply.* | **Work tickets from a focused view.** The app lists open tickets, shows each conversation, and posts public replies or internal notes back to Zendesk. |
| **Contact form** | *Use Zendesk and build a contact form on my site that creates a Zendesk ticket on submit.* | **Turn website questions into tickets.** The app creates a ticket with the visitor's details and message and shows the ticket number as confirmation. |
| **Customer status portal** | *Use Zendesk and build a portal where a signed-in customer sees their own open tickets and can add a comment.* | **Give customers their own ticket view.** The app must show each customer only their own tickets, because every request runs as the same Zendesk identity. It finds them by the email the customer signed in with. |
| **Team workload dashboard** | *Use Zendesk and build a dashboard of open tickets by priority, status, and assignee, refreshed every ten minutes.* | **See the queue at a glance.** The app reads tickets and users, groups them, and caches results so the dashboard stays within Zendesk's rate limits. |
| **Help center search** | *Use Zendesk and build a search box that answers common questions from our help center articles.* | **Reuse the help center inside your app.** The app searches help center articles and links to the full article in Zendesk. |
| **Ticket event alerts** | *Use Zendesk and build an endpoint that receives Zendesk webhook events for urgent tickets and posts them to our internal alerts page.* | **React when priority changes.** The app receives webhook deliveries, verifies the signature, and stores the events for your team. |

## How to connect Zendesk

Who can create Zendesk connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you can choose between:

* **Use your own OAuth app**: authorize an OAuth client you create in Zendesk Admin Center. Access is limited to the scopes you approve, and you can revoke it from Zendesk at any time. Use this option for new connections.
* **Use your own credentials**: connect with an existing Zendesk API token and the email of a Zendesk agent. The connection acts as that agent. Zendesk is removing API tokens, so this option is for tokens you already have.

You can create multiple Zendesk connections using different Zendesk accounts, OAuth clients, or API tokens, which is useful for separating environments (for example, a sandbox and your production account) or giving different teams different permissions.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Zendesk, make sure you have:

* A Zendesk Support account, and admin access to its Admin Center for creating OAuth clients
* Your Zendesk subdomain, the first part of your Zendesk address (`mycompany` for `https://mycompany.zendesk.com`). If your Zendesk address uses your own domain, find the subdomain on the Admin Center home page.
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Zendesk plan's rate limits. Billing and quota are handled directly by Zendesk, not Lovable.

Follow the setup steps below based on how you want to connect Zendesk.

**OAuth client**

Use this option for new connections. Zendesk is removing API tokens. In the connection form, this option is labeled **Use your own OAuth app**.

### Step 1: Create a Zendesk OAuth client

The connector authenticates through an OAuth client in your own Zendesk account, so you need its client ID and client secret before connecting.

To create a Zendesk OAuth client:

**1. Open the OAuth clients page**

Sign in to Zendesk as an admin. In Admin Center, open **Apps and integrations → APIs → OAuth clients**.

**2. Add an OAuth client**

Click **Add OAuth client**. Give it a name your team recognizes, for example `Lovable`, and set **Client kind** to **Confidential**.

**3. Set the redirect URL**

In **Redirect URLs**, add exactly:

```text theme={null}
https://api.lovable.dev/workspaces/connectors/standard/oauth/callback
```

The connection form in Lovable shows the same value in a **Redirect URI** card with a copy button. If the redirect URL does not match exactly, Zendesk rejects the authorization.

**4. Choose the scopes the client may request**

Leave **Scopes** empty to allow all scopes. To limit the client, select each scope that you plan to select in Lovable. Lovable selects six scopes by default, including Read everything (`read`). The scope table in Step 2 lists them. Select them here too, unless you plan to clear them in Lovable. A scope you select in Lovable but not here fails the authorization with an `invalid_scope` error.

**5. Save and copy the credentials**

Click **Save**. Copy the **Identifier**, which is the client ID, and the **Secret**. Zendesk shows the full secret only once. Then click **Save** again.

> [!WARNING]
>
> Your client secret functions like a password. Keep it secure and never share it publicly. You need it in the next step.

See Zendesk documentation for more: [Using OAuth authentication with your application](https://support.zendesk.com/hc/en-us/articles/4408845965210-Using-OAuth-authentication-with-your-application).

### Step 2: Connect Zendesk to Lovable

With your client ID and secret ready, add the connection in Lovable.

**1. Open Zendesk in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Zendesk**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Use your own OAuth app**

Under **Configure connection**, select **Use your own OAuth app**.

**5. Configure the connection**

Still under **Configure connection**, enter:

1. **Zendesk subdomain**: the first part of your Zendesk address, for example `mycompany` for `https://mycompany.zendesk.com`. Pasting the full address also works.
2. **Client ID**: the **Identifier** of your OAuth client.
3. **Client secret**: the secret Zendesk showed when you saved the client.

**6. Review scopes (optional)**

Under **Scopes**, review the permissions the connection requests. Ticket read and write, user read, organization read, help center read, and the Read everything scope are selected by default.

| Scope | Description | Default |
| - | - | - |
| Read tickets (`tickets:read`) | Read tickets and their comments | On |
| Write tickets (`tickets:write`) | Create and update tickets, add comments, and change status or assignee | On |
| Read users (`users:read`) | Look up agents and end users, including the connected user | On |
| Write users (`users:write`) | Create and update end users and agents | Off |
| Read organizations (`organizations:read`) | Look up organizations and their memberships | On |
| Write organizations (`organizations:write`) | Create and update organizations | Off |
| Read help center (`hc:read`) | Read help center categories, sections, and articles | On |
| Write help center (`hc:write`) | Create and update help center content | Off |
| Read requests (`requests:read`) | Read tickets as the requesting end user sees them | Off |
| Write requests (`requests:write`) | Create and update requests on behalf of end users | Off |
| Read macros (`macros:read`) | List the macros agents can apply to tickets | Off |
| Read groups (`groups:read`) | List agent groups | Off |
| Upload attachments (`ticket_attachments:write`) | Upload files to attach to ticket comments | Off |
| Read satisfaction ratings (`satisfaction_ratings:read`) | Read customer satisfaction ratings | Off |
| Read side conversations (`side_conversations:read`) | Read side conversations on tickets | Off |
| Write side conversations (`side_conversations:write`) | Start and reply to side conversations | Off |
| Read custom objects (`custom_objects:read`) | Read custom object records | Off |
| Write custom objects (`custom_objects:write`) | Create and update custom object records | Off |
| Read webhooks (`webhooks:read`) | List webhooks and their signing secrets | Off |
| Write webhooks (`webhooks:write`) | Create and update webhooks | Off |
| Read everything (`read`) | Read access to every Zendesk Support and Help Center resource. Search and incremental exports need it. | On |
| Write everything (`write`) | Write access to every Zendesk Support and Help Center resource | Off |

> [!WARNING]
>
> Every scope you select must also be allowed on your Zendesk OAuth client, unless its **Scopes** field is empty. Otherwise Zendesk rejects the authorization with an `invalid_scope` error.

For full scope documentation, see Zendesk's [scope reference](https://developer.zendesk.com/api-reference/ticketing/oauth/grant_type_tokens/#scope).

**7. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**8. Connect to Zendesk and authorize**

Click **Connect** at the bottom of the form. The Zendesk authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Zendesk if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

> [!NOTE]
>
> Lovable does not check the client ID and secret when you click **Connect**. If the client ID or the redirect URL is wrong, Zendesk shows an error in the authorization window. If the secret is wrong, the connection fails after you authorize.

**API token**

> [!WARNING]
>
> Zendesk is removing API tokens. You cannot create a new API token after October 27, 2026. Zendesk deactivates a token that is not used for 30 days. On April 30, 2027, all API tokens stop working. Use an OAuth client for new connections.

Choose this option only for a token you already have. The connection acts as the Zendesk agent whose email you enter, with all of that agent's permissions. Use a dedicated agent with only the access your app needs. In the connection form, this option is labeled **Use your own credentials**.

### Step 1: Find your Zendesk API token

The connection needs an existing API token and the email of the Zendesk agent it should act as.

To find your API token:

**1. Open the API tokens page**

Sign in to Zendesk as an admin. In Admin Center, open **Apps and integrations → APIs → API tokens**. Check that the token you plan to use has the **Active** status.

**2. Find the full token**

Zendesk shows the full token only once, when you create it. Admin Center shows only a shortened version after that. Use the full token you saved when you created it. If you no longer have it, use an OAuth client instead.

> [!WARNING]
>
> Your API token functions like a password and can act as any agent in the account when combined with their email. Keep it secure and never share it publicly. You need it in the next step.

See Zendesk documentation for more: [Managing access to the Zendesk API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API).

### Step 2: Connect Zendesk to Lovable

With your API token ready, add the connection in Lovable.

**1. Open Zendesk in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Zendesk**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Use your own credentials**

Under **Configure connection**, select **Use your own credentials**. This is the API token option.

**5. Configure the connection**

Still under **Configure connection**, enter:

1. **Zendesk subdomain**: the first part of your Zendesk address, for example `mycompany` for `https://mycompany.zendesk.com`. Pasting the full address also works.
2. **Agent email**: the email of the Zendesk agent that the connection acts as. Use a dedicated agent with only the access your app needs.
3. **API token**: the full token you saved when you created it.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token and email against the Zendesk API before saving the connection.

When connected, anyone building in a project can ask Lovable in chat to link their project to Zendesk (based on configured connection-level access). Your Lovable apps can then read and manage tickets, users, organizations, and help center content.

## Working with Zendesk data and webhooks

Each connection represents one Zendesk identity: the user who authorized the OAuth client, limited to the scopes you approved, or the Zendesk agent whose email you entered with an API token. Every request your app makes runs with that identity's permissions, and Zendesk applies its rate limits per account, so ask Lovable to cache results and read on demand rather than polling in a loop.

If your app needs to react to ticket changes, ask Lovable to build a public endpoint that verifies Zendesk's webhook signature and stores each delivery. You then register that endpoint as a webhook in **Admin Center → Apps and integrations → Webhooks → Webhooks** and fire it from a trigger. Lovable tells you which address to register while the app is unpublished and after you publish it.

When prompting Lovable, be specific about the records and operations your app needs. For example, mention whether the app should list tickets, reply to them, create tickets from a form, look up requesters, or search help center articles.

## Limitations

The Zendesk connector cannot:

* Support per-end-user Zendesk login. Each connection represents a single Zendesk account shared across all projects linked to it.
* Change the Zendesk subdomain after you create the connection. On an API token connection, you also cannot change the agent email. To use another subdomain or agent, create a new connection.

If Zendesk authorization is revoked from the Zendesk side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Troubleshooting

**Requests fail with 403.** The connection lacks permission for that endpoint. For an OAuth connection, open the connection and select the missing scope under **Configure connection**. If your Zendesk OAuth client limits its scopes, allow the scope there too. Then click **Reconnect**. For an API token connection, grant that agent the permission in Zendesk. Retrying without a change does not help.

**The connection shows a Token expired badge.** OAuth connections hold a refresh token that Zendesk expires after 90 days without use. Click **Reconnect** on the connection and authorize again.

**Requests on an API token connection fail with 401.** The token is deactivated or deleted in Zendesk. Create a connection with an OAuth client.

**Requests fail with 429.** Your app exceeded Zendesk's per-minute rate limit for your plan, or the per-project usage limit of Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors). Both return a `Retry-After` header with the number of seconds to wait. Ask Lovable to honor that header, cache reads, or fetch less frequently.

## Manage your Zendesk connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Zendesk**, then open the connection.

* **Unlink projects** to remove Zendesk access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Zendesk stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
