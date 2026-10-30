# Connect your app to PostHog
<!-- source: https://docs.lovable.dev/integrations/posthog.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to PostHog

> Connect your app to PostHog to capture product analytics events, evaluate feature flags, and send server-side events from your Lovable app.

[PostHog](https://posthog.com/) is a product analytics platform for event capture, feature flags, and experiments. The PostHog app + chat connector lets your Lovable app send events and evaluate flags with a PostHog project token, in the browser and from backend code.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared PostHog project token in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable query your PostHog analytics, flags, and experiments as context while you build (personal to you) |

With PostHog, your app can:

* Capture product analytics events with `posthog-js` using a project token
* Evaluate feature flags for users in the browser or from backend code
* Send events from server routes to the PostHog capture API
* Build product experiences on top of analytics and feature flags

This connector syncs a **project token** (`phc_`) for PostHog's public capture and flags endpoints. Your app calls PostHog ingest hosts directly. It does not use Lovable's connector gateway, and it does not accept personal API keys (`phx_`).

## Common use cases and example apps

Use PostHog when your Lovable app needs product analytics, feature flags, or server-side event capture tied to a PostHog project.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Product analytics dashboard** | *Use PostHog and build a SaaS app that tracks signups, feature usage, and retention events.* | **Instrument the core product funnel with PostHog events.** The app initializes `posthog-js`, captures key actions, and sends them to your PostHog project. |
| **Feature-flagged rollout** | *Use PostHog and gate the new onboarding flow behind a feature flag so only flagged users see it.* | **Ship features gradually with PostHog flags.** The app evaluates a flag for each user and renders the new or old experience based on the result. |
| **Waitlist with conversion tracking** | *Use PostHog and build a waitlist landing page that tracks page views, form starts, and successful signups.* | **Measure landing-page conversion in PostHog.** The app captures funnel events so you can see where visitors drop off. |
| **In-app experiment** | *Use PostHog and A/B test two pricing page layouts, then track which variant converts more often.* | **Run a simple experiment with PostHog.** The app assigns a layout from a flag and captures conversion events for each variant. |
| **Backend event capture** | *Use PostHog and send a server-side signup\_completed event when a user finishes account creation on the backend.* | **Record reliable server-side events in PostHog.** The app posts capture events from a backend route using the synced project token. |
| **Internal admin analytics** | *Use PostHog and add event tracking to our internal admin tools so we can see which workflows get used.* | **Understand internal tool usage.** The app tracks admin actions and surfaces usage patterns in PostHog. |

## How to connect PostHog

Who can create PostHog connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple PostHog connections using different projects or regions, which is useful for separating environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting PostHog, make sure you have:

* A PostHog Cloud account and project
* The project's numeric **Project ID**
* A **project token** that starts with `phc_`
* The cloud **region** where the project is hosted (`eu` or `us`)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Event capture, feature flags, and other PostHog usage count toward your PostHog plan. Billing and quota are handled directly by PostHog, not Lovable.

### Step 1: Get your PostHog project details

You need three values from PostHog: region, project ID, and project token.

To find them:

**1. Open your PostHog project**

Sign in to [PostHog](https://app.posthog.com/) (or your EU host if your project is on EU Cloud).

**2. Open project settings**

Go to **[Project settings](https://app.posthog.com/settings/project)**.

**3. Copy the project ID and project token**

Copy the numeric **Project ID** and a **Project API key** / project token that starts with `phc_`.

**4. Confirm your region**

Note whether the project is on **Europe** (`eu.i.posthog.com`) or the **United States** (`us.i.posthog.com`). See [PostHog API base URL](https://posthog.com/docs/api#base-url).

> [!WARNING]
>
> The project token is a public write key for capture and flags. After you link a connection to a project, Lovable exposes it to browser code as a `VITE_` env var. Do not paste a personal API key (`phx_`) into this connector.

See PostHog documentation for more: [Project API keys](https://posthog.com/docs/api#project-api-keys).

### Step 2: Connect PostHog to Lovable

You can create multiple connections using different PostHog projects or tokens.

**1. Open PostHog in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **PostHog**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `PostHog Prod`. This name is only used inside Lovable to identify the connection.
2. **Region**: select **Europe (eu.i.posthog.com)** or **United States (us.i.posthog.com)** to match where your PostHog project is hosted.
3. **Project ID**: paste the numeric PostHog project ID from **Project settings**.
4. **Project token**: paste the project token that starts with `phc_`.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable validates the project token against PostHog before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to PostHog (based on configured connection-level access). Your Lovable apps can then capture events and evaluate feature flags with the synced project token and region.

## Limitations

The PostHog connector cannot:

* Accept personal API keys (`phx_`). Use a project token (`phc_`) only.
* Proxy PostHog requests through Lovable's connector gateway. Your app calls PostHog ingest hosts directly (`eu.i.posthog.com` or `us.i.posthog.com`).
* Cover PostHog private admin REST APIs that require a personal API key.
* Support per-end-user PostHog login. Each connection represents a single PostHog project shared across all projects linked to it.

## Manage your PostHog connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **PostHog**, then open the connection.

* **Unlink projects** to remove PostHog access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use PostHog stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to X (Twitter)](https://docs.lovable.dev/integrations/x.md)
- [Connect your app to beehiiv](https://docs.lovable.dev/integrations/beehiiv.md)
