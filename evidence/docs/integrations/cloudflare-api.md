# Connect your app to Cloudflare API
<!-- source: https://docs.lovable.dev/integrations/cloudflare-api.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Cloudflare API

> Connect your app to Cloudflare with an API token to inventory zones and DNS records, build traffic and security dashboards, manage DNS, purge cache, and operate Workers, R2, and KV.

[Cloudflare](https://www.cloudflare.com/) provides Domain Name System (DNS) services, a content delivery network (CDN), security, and edge compute for your domains. The Cloudflare API connector lets your Lovable app call the [Cloudflare v4 API](https://developers.cloudflare.com/api/) with an API token from your Cloudflare account, so you can build internal tools and dashboards on top of your own zones, traffic data, and edge resources.

Cloudflare API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Cloudflare API, your app can:

* List zones and read or edit DNS records
* Read traffic and security-event analytics from the GraphQL Analytics API
* Change zone settings and purge cache
* Operate Workers scripts, R2 buckets, and KV namespaces
* Read and edit web application firewall (WAF) custom rules, IP access rules, and bot configuration
* Report on account members, Zero Trust Access apps, and audit logs

> [!NOTE]
>
> This is a connector for apps you build with Lovable. It integrates your app with your Cloudflare
> account. It does not deploy, host, or publish your Lovable app on Cloudflare Pages or Workers. To
> publish a Lovable app, use Lovable's own [publish flow](https://docs.lovable.dev/features/publish.md).

## Common use cases and example apps

These examples show what you can build with Cloudflare API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| DNS management console | *Use Cloudflare and build a page where I can view and edit the DNS records for my domains.* | **Manage DNS without handing out dashboard access.** The app lists zones, shows each record's type, name, and target, and gates edits behind a confirmation step. |
| Traffic analytics dashboard | *Use Cloudflare and build a dashboard showing requests, bandwidth, and cache hit rate per zone over the last 30 days, where my plan supports it.* | **Turn zone analytics into charts your team reviews.** The app queries the GraphQL Analytics API and renders trends within the [historical range available to your plan and dataset](https://developers.cloudflare.com/analytics/graphql-api/limits/#node-limits-and-availability). |
| Security events monitor | *Use Cloudflare and build a view of blocked and challenged requests, grouped by rule and source country.* | **See what your WAF is stopping.** The app reads firewall events and groups them by action, rule, and client so you can spot attack patterns. |
| Cache purge control panel | *Use Cloudflare and build an internal tool where our editors can purge specific URLs after publishing.* | **Let non-engineers clear stale content safely.** The app takes a list of URLs, shows what will be purged, and calls the purge endpoint after confirmation. |
| Access and audit review | *Use Cloudflare and build a report of account members, their roles, Zero Trust Access apps, and recent audit log events.* | **Review who has access to your Cloudflare account.** The app pulls members, Access apps, and audit logs into one page for periodic access reviews. |
| Edge resource inventory | *Use Cloudflare and build an inventory of our Workers scripts, R2 buckets, and KV namespaces with their sizes.* | **Keep track of what is running at the edge.** The app lists edge resources per account so you can find unused buckets and stale scripts. |

What your app can reach depends on the permissions and resource scope of the API token you connect with.

## How to connect Cloudflare API

Who can create Cloudflare API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Cloudflare API connections using different API tokens, which is useful for separating environments or scoping each connection to a different set of zones.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Cloudflare API, make sure you have:

* A Cloudflare account with the zones or resources you want your app to use
* A Cloudflare API token whose permissions match the endpoints your app calls
* **Super Administrator** permission in Cloudflare if you need to [create or update an account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#create-an-account-owned-token)
* Permission to create connections in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API requests made through this connector count toward Cloudflare's rate limits, and any paid
> Cloudflare resources your app uses or creates, such as R2 storage, KV, or Workers usage, are
> billed to your Cloudflare account. Cloudflare handles its own quotas and billing. Gateway requests
> from your app also have a [per-project usage limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors).

### Step 1: Create a Cloudflare API token

An API token authenticates your Lovable app with the Cloudflare v4 API. Cloudflare offers two kinds, and both work with this connector:

* **Account API tokens** are owned by the account rather than a person, so they keep working when someone leaves the team. Cloudflare recommends them for integrations like this one, and they are the better default.
* **User API tokens** are tied to your Cloudflare user. Cloudflare currently lists six products that do not support account-owned tokens and need a user token: Intel Data Platform, Page Rules, Registrar, Super Bot Fight Mode, Turnstile, and Zero Trust Client Platform. Check the [compatibility matrix](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#compatibility-matrix) for the latest list.

To create a Cloudflare API token:

**1. Open the Cloudflare dashboard**

Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/).

**2. Open the token editor**

For an **account token**, open **Manage Account** in the left navigation and select **Account API Tokens**.

For a **user token**, open **My Profile** and select **API Tokens**.

**3. Create the token**

Click **Create Token**. Start from a template that matches what you are building, or choose **Create Custom Token** to pick permissions yourself.

**4. Select permissions**

Add one permission per feature your app needs. For example, a DNS management tool needs **Zone Read** and **DNS Edit**, and a traffic dashboard needs **Analytics Read**. See the [Troubleshooting](#troubleshooting) section for the full mapping.

**5. Set the resource scope**

Under **Zone Resources** and **Account Resources**, limit the token to the specific zones and accounts your app needs. You can also restrict client IP addresses and set an expiration date.

**6. Copy the token**

Click **Continue to summary**, then **Create Token**, and copy the value. Cloudflare shows it only once.

> [!TIP]
>
> **Scope the token to the least it needs.** The token's permissions and resource scope determine
> which Cloudflare resources apps on this connection can access and change. If your app only reads
> data, give the token read permissions and no edit permissions. If it only touches one domain,
> scope it to that zone. A token that can edit DNS or delete resources can break live traffic, and a
> token that can create R2 buckets, KV namespaces, or Workers can add charges to your Cloudflare
> bill.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You'll need
> it in the next step.

> [!NOTE]
>
> Cloudflare's API, permissions, and token compatibility can change, so this guide may become
> outdated. For the most accurate and current Cloudflare requirements, refer to Cloudflare's
> official [account API token
> documentation](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/)
> and [API token creation
> guide](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

### Step 2: Connect Cloudflare API to Lovable

With the token copied, create the connection in Lovable.

**1. Open Cloudflare API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Cloudflare API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Cloudflare Prod`. This name is only used inside Lovable to identify the connection.
2. **API Token**: paste the API token you created in step 1. This connector does not accept a Global API Key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Cloudflare API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Cloudflare API (based on configured connection-level access). Your Lovable apps can then read and change Cloudflare resources through the [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), within the limits of the token's permissions.

## Limitations

The Cloudflare API connector cannot:

* Support per-end-user Cloudflare login. Each connection represents a single API token shared across all projects linked to it.
* Receive Cloudflare webhooks, notifications, or Logpush streams.

If you roll or delete the token in Cloudflare, update the connection with a new token before API calls can succeed again.

## Troubleshooting

Use these checks when a Cloudflare request fails or returns an unexpected status.

> **Cloudflare returned 403 Forbidden**
>
> Check whether the token has the permission for that endpoint and covers the zone or account you requested. Saving a connection verifies the token but does not prove it can access every endpoint your app needs. Retrying will not fix missing permissions.
>
> Open the token in the Cloudflare dashboard and check it against the feature you are building:
>
> | Feature | Endpoints | Token permission |
> | :- | :- | :- |
> | Zone and DNS inventory and edits | `/zones`, `/zones/{zone_id}/dns_records` | Zone Read; DNS Read or Edit |
> | Zone settings | `/zones/{zone_id}/settings` | Zone Settings Read or Edit |
> | Cache purge | `/zones/{zone_id}/purge_cache` | Cache Purge |
> | Traffic and security-event analytics | `/graphql` | Analytics Read |
> | WAF custom rules | `/zones/{zone_id}/rulesets` | Zone WAF Read or Edit |
> | IP access rules | `/zones/{zone_id}/firewall/access_rules/rules` | Firewall Services Read or Edit |
> | Bot configuration (features depend on your Cloudflare plan) | `/zones/{zone_id}/bot_management` | Bot Management Read or Edit |
> | Workers, R2, and KV | `/accounts/{account_id}/workers/...`, `.../r2/buckets`, `.../storage/kv/namespaces` | Workers Scripts, Workers R2 Storage, or Workers KV Storage Read or Edit |
> | Members, Access apps, and audit logs | `/accounts/{account_id}/members`, `.../access/apps`, `.../logs/audit` | Account Settings Read; Access: Apps and Policies Read |
>
> Cloudflare's [bot plans](https://developers.cloudflare.com/bots/) distinguish Bot Fight Mode on Free, Super Bot Fight Mode on Pro, Business, and Enterprise without the Bot Management add-on, and Bot Management for Enterprise with the add-on. Super Bot Fight Mode does not support account API tokens, so adding a Bot Management permission to an account token will not enable access to that product. Use a user API token.
>
> These are dashboard permission labels. API permission names may use **Write** for **Edit**. See Cloudflare's [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/). Add the missing permission, or widen the token's zone or account resources. Tokens can also restrict client IP addresses and expire on a set date, so check those too.
>
> Check the endpoint's authentication requirements and [account-token compatibility](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#compatibility-matrix). If it requires a user token, create one from **My Profile → API Tokens**. Whenever you replace a token, update the connection with the new value.

> **A request returned 429 Too Many Requests**
>
> Cloudflare's [default client API limit](https://developers.cloudflare.com/fundamentals/api/reference/limits/) is 1,200 requests per five minutes per user or account token. For user-based access, the limit is shared across the Cloudflare dashboard, API tokens, and legacy Global API Key requests made outside this connector. The [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/limits/) has its own separate limits. Frequent polling with a user token can exhaust the shared limit and block your dashboard sessions.
>
> Lovable's connector gateway also enforces a separate [per-project usage limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors) on requests from your app and can return a 429 before the request reaches Cloudflare.
>
> Ask Lovable to respect the response's `Retry-After` header, cache zone lists, DNS records, and analytics results, and read on demand rather than on a frequent fixed timer.

> **A WAF rule change removed the other rules**
>
> [Updating a ruleset with `PUT`](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/), whether to a ruleset ID or to a phase entrypoint, replaces the entire rules array. Ask Lovable to read the ruleset first and write back the complete list, or to update a single rule with `PATCH` on `/zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}`.

## Manage your Cloudflare API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Cloudflare API**, then open the connection.

* **Unlink projects** to remove Cloudflare API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Cloudflare API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
- [Connect your app to Chargebee](https://docs.lovable.dev/integrations/chargebee.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
