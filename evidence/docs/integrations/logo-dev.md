# Connect your app to Logo.dev
<!-- source: https://docs.lovable.dev/integrations/logo-dev.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Logo.dev

> Connect your app to Logo.dev to display company logos by domain, stock ticker, or crypto symbol directly in the browser from your Lovable app.

[Logo.dev](https://www.logo.dev/) is a logo and brand image API that lets your Lovable app display company logos by domain, stock ticker, or crypto symbol. It's designed for apps that show company branding, such as directories, dashboards, CRMs, and portfolio trackers.

Logo.dev is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Logo.dev, your app can:

* Display company logos by domain in the browser
* Render logos for stock tickers, ISINs, and crypto symbols
* Add brand logos to dashboards, directories, and profile cards
* Use `img.logo.dev` URLs with size, format, and theme options

The Logo.dev connector is frontend-only. It uses a publishable key with the `img.logo.dev` image CDN, so logos load directly in the browser. It's a good fit when your app needs to show company branding without managing image assets yourself.

> [!NOTE]
>
> This connector provides a publishable key for the `img.logo.dev` image CDN only. Logo.dev's server-side REST and Search APIs need a separate secret key that this connector does not provide.

## Common use cases and example apps

| Example app | Example prompt | Description |
| - | - | - |
| **Company directory** | *Use Logo.dev and build a company directory with a logo next to each company name.* | **Show recognizable branding in a list of companies.** The app renders each company's logo from its domain through `img.logo.dev`. |
| **CRM or customer dashboard** | *Use Logo.dev and add company logos to our customer list, keyed by their website domain.* | **Make customer records easier to scan with logos.** The app looks up each customer's domain and displays the matching brand logo. |
| **Stock or portfolio tracker** | *Use Logo.dev and build a watchlist that shows a logo next to each stock ticker.* | **Add company branding to financial data.** The app renders ticker logos through `img.logo.dev/ticker/<symbol>` alongside prices and stats. |
| **Crypto tracker** | *Use Logo.dev and build a crypto dashboard with a logo for each coin.* | **Pair market data with recognizable coin logos.** The app renders crypto logos through `img.logo.dev/crypto/<symbol>` next to each asset. |
| **Investor or startup database** | *Use Logo.dev and build a startup database where each company card shows its logo.* | **Turn a list of domains into branded company cards.** The app fetches logos by domain and displays them on profile and detail cards. |
| **Vendor or integrations page** | *Use Logo.dev and build a partners page that shows each vendor's logo in a grid.* | **Render a clean logo wall from a list of domains.** The app loads each vendor's logo from `img.logo.dev` with consistent sizing. |

## How to connect Logo.dev

Workspace **admins** and **owners** can connect Logo.dev.

You can create multiple Logo.dev connections using different publishable keys, which is useful for separating environments (for example, development and production) or using keys with different domain restrictions.

When the connection is created, Logo.dev becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting Logo.dev, make sure you have:

* A Logo.dev account
* A Logo.dev publishable key (starts with `pk_`)
* Lovable workspace owner or admin role

> [!NOTE]
>
> Logo requests through this connector count toward your Logo.dev plan. Billing and quota are handled directly by Logo.dev, not Lovable.

### Step 1: Get a Logo.dev publishable key

A publishable key lets your Lovable app load logos from the `img.logo.dev` image CDN in the browser. Because it's used in frontend code, you secure it with domain restrictions rather than keeping it secret.

To create a Logo.dev publishable key:

**1. Open your Logo.dev account**

Sign in to [Logo.dev](https://www.logo.dev/dashboard/api-keys).

**2. Open API keys**

Go to the **API keys** page in your dashboard.

**3. Copy a publishable key**

Copy a publishable key (it starts with `pk_`). Create one if you don't have it yet.

**4. Set domain restrictions**

Restrict the key to the domains where your app runs. This limits where the key can be used once it's in your frontend code.

> [!WARNING]
>
> The publishable key is exposed in your app's frontend code, so set domain restrictions in Logo.dev to control where it can be used. Use a publishable key (`pk_`), not a secret key. You'll need it in the next step.

See Logo.dev documentation for more: [Logo.dev API keys](https://www.logo.dev/docs/platform/api-keys).

### Step 2: Connect Logo.dev to Lovable

You can create multiple connections using different publishable keys.

**1. Open Logo.dev in Connectors**

Go to **Connectors** and select **Logo.dev**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Logo.dev Prod`. This name is only used inside Lovable to identify the connection.
2. **Publishable key**: paste your Logo.dev publishable key (it starts with `pk_`).

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Logo.dev (based on configured connection-level access). Your Lovable apps can then load company logos directly in the browser through `img.logo.dev`.

## Limitations

The Logo.dev connector is frontend-only and cannot:

* Call Logo.dev's server-side REST API or Search API (those need a separate secret key this connector does not provide)
* Proxy logo requests through a Lovable gateway (logos load directly in the browser from `img.logo.dev`)
* Refresh or rotate keys automatically. To rotate, create a new publishable key in Logo.dev and update the Lovable connection
* Support per-end-user Logo.dev login. Each connection represents a single Logo.dev account shared across all projects linked to it.

## Manage your Logo.dev connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Logo.dev**, then open the connection.

* **Unlink projects** to remove Logo.dev access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Logo.dev stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
- [Connect your app to Linear](https://docs.lovable.dev/integrations/linear.md)
- [Connect your app to n8n](https://docs.lovable.dev/integrations/n8n.md)
- [Connect your app to Omni](https://docs.lovable.dev/integrations/omni.md)
- [Connect your app to Xero](https://docs.lovable.dev/integrations/xero.md)
