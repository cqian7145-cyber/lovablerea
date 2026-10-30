# Connect your app to Pledge
<!-- source: https://docs.lovable.dev/integrations/pledge.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Pledge

> Connect your app to Pledge, a charitable giving platform, to search verified nonprofits worldwide, create donations, and manage fundraisers from your Lovable app.

[Pledge](https://www.pledge.to/) is a charitable giving platform that lets businesses add donations and fundraising to their products. The Pledge connector lets your Lovable app search a global database of verified nonprofits, create and track donations, and create and update fundraisers, so you can build giving programs, donation flows, and fundraising tools directly into your product.

Pledge is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Pledge, your app can:

* Search nonprofits worldwide by name, location, or cause
* Retrieve nonprofit details to present in your own UI
* Create donations and track their status
* Create and update fundraisers
* Embed Pledge's donation forms and nonprofit search widgets
* Combine giving data with the rest of your app's content (user accounts, dashboards, loyalty programs)

Pledge is a good fit when you want to add charitable giving to a product, for example donation checkouts, round-up giving, loyalty point redemption, cause marketing campaigns, or employee giving programs, without handling nonprofit vetting and disbursement yourself.

## Common use cases and example apps

These examples show what you can build with Pledge, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Donation checkout add-on** | *Use Pledge and add an optional donation step to my checkout where customers pick a nonprofit and give $1, $5, or \$10.* | **Let customers give at the moment of purchase.** The app searches nonprofits through Pledge, lets the customer pick one, and creates the donation via the Pledge API. |
| **Points-to-charity redemption** | *Use Pledge and build a rewards page where users redeem loyalty points as donations to a nonprofit of their choice.* | **Turn loyalty points into impact.** The app converts points to a dollar amount, lets users search nonprofits, and creates the donation through Pledge. |
| **Employee giving portal** | *Use Pledge and build an internal portal where employees browse causes and donate, with a company-wide impact dashboard.* | **Run workplace giving without a separate vendor.** The app lets employees search and donate through Pledge and aggregates donations into a shared impact view. |
| **Cause campaign pages** | *Use Pledge and build a campaign page for our disaster relief drive with a fundraiser and a live progress bar.* | **Launch fundraising campaigns quickly.** The app creates a fundraiser through Pledge and displays donations and progress on a branded page. |
| **Memorial and tribute giving** | *Use Pledge and build a tribute page where visitors donate to a chosen nonprofit in someone's memory.* | **Collect donations in honor of a person or event.** The app pairs a tribute page with nonprofit search and donation creation through Pledge. |
| **Giving analytics dashboard** | *Use Pledge and build a dashboard that shows our donation volume by cause and month.* | **See your giving program at a glance.** The app reads donation data from Pledge and charts volume, causes, and trends for your team. |

## How to connect Pledge

Who can create Pledge connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Pledge connections using different Pledge accounts, which is useful if your organization has more than one.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Pledge, make sure you have:

* A Pledge account
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Donations your app creates through this connector are real donations. Pledge charges the payment method on file in your Pledge account for them in batches and deducts its platform and payment processing fees. Billing is handled directly by Pledge, not Lovable. See [How are donations through the API paid for?](https://help.pledgeling.org/support/solutions/articles/36000233791-how-are-donations-through-the-api-paid-for-) in Pledge's help center.

### Set up your Pledge connection

You authorize Lovable with your Pledge account, and no API key is needed.

**1. Open Pledge in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Pledge**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details** and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect to Pledge and authorize**

Click **Connect** at the bottom of the form. The Pledge authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Pledge if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in chat to link their project to Pledge (based on configured connection-level access). Your Lovable apps can then search nonprofits, create donations, and manage fundraisers through Pledge.

> [!WARNING]
>
> Any project linked to this connection can create donations that Pledge charges to your organization. Only link the connection to projects that should be able to create donations.

## Limitations

The Pledge connector cannot:

* Receive Pledge webhooks, such as donation completed events. Poll the API for donation status instead.
* Support per-end-user Pledge login. All requests use the Pledge account that authorized the connection, so donations created by your app's end users run through your organization's Pledge account.
* Connect to Pledge's sandbox environment. Every connection uses your production Pledge account.

For Pledge's fees and billing, see [Pledge's pricing page](https://www.pledge.to/pricing) and [How are donations through the API paid for?](https://help.pledgeling.org/support/solutions/articles/36000233791-how-are-donations-through-the-api-paid-for-).

## Manage your Pledge connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Pledge**, then open the connection.

* **Unlink projects** to remove Pledge access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Pledge stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
