# Connect your app to X (Twitter)
<!-- source: https://docs.lovable.dev/integrations/x.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to X (Twitter)

> Connect your app to X with an app-only Bearer token to look up users, search recent public posts, and build social integrations from your Lovable app.

[X](https://x.com/) is a social platform for public posts and conversations. The X (Twitter) connector lets your Lovable app call the [X API v2](https://docs.x.com/x-api/introduction) using an app-only Bearer token from your X Developer account. It's designed for apps that look up profiles, search recent public posts, or build read-only social dashboards.

X is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With X, your app can:

* Look up users by username or ID
* Search recent public posts
* Read public post metadata by ID
* Build dashboards and integrations on top of X API v2 data

The connector uses an app-only Bearer token, so it supports read-only access to public data. It cannot post, like, follow, or send DMs on behalf of a user account. It's a good fit for profile lookups, keyword monitoring, and public content feeds.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Profile lookup page** | *Use X and build a page that shows profile info for an X username.* | **Display public profile details from X.** The app fetches user metadata by username and renders name, handle, and other public fields. |
| **Keyword monitoring dashboard** | *Use X and build a dashboard that searches recent posts on X for a keyword.* | **Track public conversation around a topic.** The app queries recent post search results and presents them in a filterable feed. |
| **Social proof widget** | *Use X and build a widget that shows recent posts from a list of accounts.* | **Surface curated public posts in your app.** The app looks up posts by ID or username and renders a timeline-style view. |
| **Influencer directory** | *Use X and build a directory where I enter usernames and see follower counts and bios.* | **Aggregate public profile stats for a roster of accounts.** The app batches user lookups and displays bios and metrics in a table. |
| **Event hashtag tracker** | *Use X and build a live feed of posts matching an event hashtag.* | **Monitor public posts for a campaign or event.** The app searches recent posts for a hashtag and refreshes results on a schedule. |
| **Competitive mentions board** | *Use X and build a board that tracks recent posts mentioning our brand name.* | **Watch brand mentions across public posts.** The app runs scheduled searches and highlights new matches for the team. |
| **Research and reporting tool** | *Use X and build an internal tool that exports recent posts about a topic as JSON.* | **Pull public post data for analysis or reporting.** The app searches and fetches post metadata through the gateway for downstream use. |

## How to connect X

Workspace **admins** and **owners** can connect X.

You can create multiple X connections using different Bearer tokens, which is useful for separating environments (for example, development and production) or using tokens from different X apps.

When the connection is created, X becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting X, make sure you have:

* An [X Developer account](https://developer.x.com/)
* An X app with an app-only Bearer token
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector count toward your X API access tier and rate limits. Billing and quota are handled directly by X, not Lovable.

### Step 1: Get an X app-only Bearer token

An app-only Bearer token lets your Lovable app authenticate with the X API v2 for read-only public data. You generate it in the X Developer Portal for a specific app.

To create an X Bearer token:

**1. Open the X Developer Portal**

Sign in to the [X Developer Portal](https://developer.x.com/en/portal/dashboard).

**2. Create or open a project and app**

Create a **Project** and **App** if you do not have one yet, or open the app you want to use.

**3. Open keys and tokens**

In your app settings, go to **Keys and tokens** (or **User authentication settings** → **Keys and tokens**, depending on your portal layout).

**4. Generate the Bearer token**

Under **Authentication Tokens**, find **Bearer Token** and click **Generate** (or **Regenerate**). Copy the token and store it securely.

> [!WARNING]
>
> Your Bearer token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See X documentation for details on access tiers, endpoints, and rate limits: [X API introduction](https://docs.x.com/x-api/introduction).

### Step 2: Connect X to Lovable

You can create multiple connections using different Bearer tokens.

**1. Open X in Connectors**

Go to **Connectors** and select **X (Twitter)**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `X Prod`. This name is only used inside Lovable to identify the connection.
2. **Bearer token**: paste your app-only Bearer token from the X Developer Portal.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the X API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to X (based on configured connection-level access). Your Lovable apps can then look up users and search recent public posts through the connector.

## Limitations

The X connector is read-only with an app-only Bearer token. It cannot:

* Post, reply, like, repost, or follow on behalf of a user
* Send or read direct messages
* Access protected accounts or a user's private timeline
* Support per-end-user X login. Each connection uses a single shared Bearer token across all projects linked to it
* Bypass X API rate limits. Cache results, back off on `429` responses, and avoid tight polling loops

If you revoke or regenerate the Bearer token in the X Developer Portal, update the connection in Lovable with the new token before API calls can succeed again.

## Manage your X (Twitter) connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **X (Twitter)**, then open the connection.

* **Unlink projects** to remove X (Twitter) access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use X (Twitter) stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
