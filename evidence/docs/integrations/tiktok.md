# Connect your app to TikTok
<!-- source: https://docs.lovable.dev/integrations/tiktok.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to TikTok

> Connect your app to TikTok to read creator profiles, fetch published videos, and build social integrations from your Lovable app. 

[TikTok](https://www.tiktok.com/) is a short-form video platform with APIs for accessing creator profiles and content. The TikTok connector lets your Lovable app read account profile data, access video metadata, and build creator workflows that rely on TikTok account information.

TikTok is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With TikTok, your app can:

* Read basic profile data including display name and account ID
* Access follower counts, like counts, and video statistics
* Read extended profile details such as bio and avatar
* Fetch a list of published videos and their metadata

The TikTok connector is read-only and connects to a single TikTok account via OAuth. It's a good fit for creator tools, social dashboards, content portfolios, and analytics apps built around a specific TikTok account.

## Common use cases and example apps

| **Example app** | **Example prompt** | **Description** |
| :- | :- | :- |
| Creator analytics dashboard | *Use TikTok and build a dashboard that shows my follower count, total likes, and video performance over time.* | **Surface TikTok account metrics in a focused dashboard.** The app reads profile stats and video data, displays trends over time, and gives a creator a single place to track growth. |
| Video portfolio site | *Use TikTok and build a portfolio page that displays my published TikTok videos with titles and view counts.* | **Showcase a creator's TikTok content on a custom website.** The app fetches the list of published videos and renders them alongside metadata such as titles, thumbnails, and engagement counts. |
| Campaign tracker | *Use TikTok and build a campaign tracker that stores TikTok video metadata for sponsored posts and links them to campaign records.* | **Track campaign content tied to a connected TikTok account.** The app reads published video metadata, matches videos to campaigns, and keeps reporting data organized in one place. |
| Content management tool | *Use TikTok and build a tool that lets me review my published TikTok videos, add internal notes, and tag them by campaign.* | **Build a lightweight content management layer on top of published TikTok videos.** The app lists videos fetched from TikTok and lets you add custom fields, tags, or notes stored separately. |
| Profile sync utility | *Use TikTok and build a utility that syncs my TikTok display name and account identifiers into my CRM records.* | **Keep internal systems aligned with TikTok account details.** The app reads profile data from the connected TikTok account and writes it to the appropriate CRM fields to reduce manual updates. |

## How to connect TikTok

Workspace admins and owners can connect TikTok. You can create multiple TikTok connections using different accounts, which is useful for separating environments or managing multiple creators.

When the connection is created, TikTok becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting TikTok, make sure you have:

* A TikTok account you want to connect (you can also create one during the OAuth flow)
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector consume TikTok API units according to your TikTok plan. Billing and quota are handled directly by TikTok, not Lovable.

### Set up your TikTok connection

**1. Open TikTok in Connectors**

Go to **Connectors** and select **TikTok**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `My TikTok`). This name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Expand **Advanced settings** to review the permissions your app will request. Default scopes are pre-selected for common use cases. Scopes control what data the connection can access. All four scopes are selected by default.

You can remove any optional scope, except **Read basic profile information**, which is required and cannot be removed.

| **Scope** | **Description** |
| :- | :- |
| Read basic profile information (`user.info.basic`) | Display name and account ID |
| Read user stats (`user.info.stats`) | Follower count, like count, and video count |
| Read extended profile information (`user.info.profile`) | Bio, avatar, and profile details |
| Read published video metadata (`video.list`) | List of published videos and their metadata |

For full scope documentation, see [TikTok's API scopes reference](https://developers.tiktok.com/doc/tiktok-api-scopes/).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to TikTok and authorize**

Click **Connect** at the bottom of the form. The TikTok authorization window opens, so make sure your browser doesn’t block pop-ups. If it does, Lovable redirects you instead.

Sign in to TikTok if prompted, review the requested permissions, and click **Allow**.

You’ll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to TikTok (based on configured connection-level access). Your Lovable apps can then start reading TikTok profile data and video content.

## Limitations

The TikTok connector is read-only. It cannot:

* Upload or publish videos to TikTok
* Access private videos or draft content
* Read comments, DMs, or notifications
* Manage followers or interact with other accounts
* Receive TikTok webhooks or real-time events
* Support per-end-user TikTok login. Each connection represents a single TikTok account shared across all projects linked to it.

If TikTok authorization is revoked from the TikTok side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your TikTok connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **TikTok**, then open the connection.

* **Unlink projects** to remove TikTok access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use TikTok stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Integrate any API with Lovable](https://docs.lovable.dev/integrations/any-api.md)
- [Connect your app to KLIPY](https://docs.lovable.dev/integrations/klipy.md)
- [Connect your app to Klaviyo](https://docs.lovable.dev/integrations/klaviyo.md)
- [Connect your app to X (Twitter)](https://docs.lovable.dev/integrations/x.md)
- [Connect your app to Sevdesk](https://docs.lovable.dev/integrations/sevdesk.md)
