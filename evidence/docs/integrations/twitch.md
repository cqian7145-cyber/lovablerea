# Connect your app to Twitch
<!-- source: https://docs.lovable.dev/integrations/twitch.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Twitch

> Connect your app to Twitch to build custom stream overlays, display live stream data, track channel activity, and create tools for creators and communities directly from your Lovable app.

[Twitch](https://www.twitch.tv/) is a live streaming platform focused on gaming, creative content, and real-time community interaction. The Twitch connector lets your Lovable app access Twitch API so you can power stream overlays, dashboards, and community tools that react to what is happening on a channel.

Twitch is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the chat while you build and in your published apps.

With Twitch, your app can:

* Display live chat from a Twitch channel
* Show follower and subscriber counts
* Track custom goals such as follower or subscription milestones
* Look up stream status, viewer counts, and channel metadata
* Retrieve clips, schedules, and channel information
* Send chat messages to a Twitch channel
* Search channels, games, and categories

Twitch is a good fit when your app lives alongside a stream. Examples include overlays, moderation tools, event dashboards, and creator analytics apps.

## Common use cases and example apps

| Example app | Example prompt | Description |
| - | - | - |
| **Custom stream overlay** | *Build a stream overlay that shows my live chat, latest follower, and current sub goal in my brand colors.* | **Replace generic overlay tools with a fully custom overlay.** The app displays chat using Twitch's IRC connection and fetches follower and subscription data through the Twitch API to render a branded overlay for the stream that can be added as a browser source in streaming software like OBS Studio (Open Broadcaster Software. |
| **Subscriber or follower goal tracker** | *Build an overlay widget that shows a progress bar toward my 1000 follower goal.* | **Display milestone progress live on stream.** The app fetches follower or subscriber counts from Twitch and renders a progress bar that updates as the numbers change. |
| **Live chat overlay** | *Build a live chat overlay that shows recent messages from my Twitch channel.* | **Display chat messages directly in a stream overlay.** The app connects to Twitch chat using the IRC WebSocket endpoint and renders incoming messages in real time. |
| **Event broadcast overlay** | *Build a tournament overlay where moderators can update scores and match info during the broadcast.* | **Power overlays for live events or tournaments.** Moderators update match information through a control panel and the overlay reflects the updates instantly for viewers. |
| **Multi-channel stream tracker** | *Build a dashboard that shows which channels from my list are currently live.* | **Monitor a list of streamers and see who is live right now.** The app checks stream status across multiple channels and displays viewer counts and stream titles. |
| **Clip discovery browser** | *Build an app where I can search for a Twitch channel and browse their top clips.* | **Explore highlights from Twitch channels.** The app retrieves clips from the Twitch API and presents them in a searchable interface. |
| **Moderator dashboard** | *Build a moderation panel that lists followers and lets moderators send chat announcements.* | **Give moderators a structured interface for managing community activity.** The app retrieves follower data and lets moderators post messages to chat directly from the dashboard. |

## How Twitch connections work

Twitch uses OAuth 2.0 for authentication. When you connect Twitch, you authorize Lovable to access Twitch on behalf of the authenticated account.

Twitch uses Lovable's gateway architecture for secure OAuth handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

Each Twitch connection is tied to one Twitch account. You can create multiple connections if needed. For example, you might connect separate accounts for development, production, or different creators.

## How to connect Twitch

Workspace **admins** and **owners** can connect Twitch.

When the connection is created, Twitch becomes available across all projects in the workspace.

### Prerequisites

Before connecting Twitch, make sure you have:

* A Twitch account
* A Lovable workspace admin or owner role

### Step 1: Choose the account to connect

Your connection uses a Twitch account directly. No developer application or API key is required.

Make sure the connected account has the permissions required for your use case.

For example:

* To read follower data, the account must have moderator access for the channel.
* To send chat messages, the account must have permission to post in the channel.
* To access subscription data, the connected account must be the channel owner.

For most overlay setups, connecting the streamer's own account provides the broadest access.

### Step 2: Connect Twitch to Lovable

1. Open **Connectors** and select **Twitch**.
2. Click **Connect** on the connector page.
3. In **Display name**, enter a name for the connection. For example `Twitch Production`.
4. **Configure scopes (optional)**

   Expand **Advanced settings** to configure the Twitch API permissions your app needs.

   Default scopes include:

   * `user:read:email` — View the account's email
   * `channel:read:subscriptions` — View channel subscription data
   * `moderator:read:followers` — View follower data for moderated channels
   * `user:write:chat` — Send messages to Twitch chat

   Additional scopes are available for features such as clips management, predictions, polls, analytics, and channel points.

   Only enable the scopes your app needs. You can update scopes later by editing the connection and selecting **Reconnect**.

   For the full list of scopes, see the [Twitch OAuth scope reference](https://dev.twitch.tv/docs/authentication/scopes/).
5. Click **Connect** at the bottom of the form. A Twitch authorization window will open. Make sure pop-ups are allowed.
6. Log in to Twitch, review the requested permissions, and click **Authorize**.

Once authorization is complete, the connection will appear in Lovable and your apps can begin using Twitch data.

## Limitations

The Twitch connector currently cannot:

* **Read Twitch chat in real time through the gateway**\
  Twitch chat uses IRC over WebSocket, which cannot be proxied through the Lovable gateway.

  To read chat messages, your app must connect directly to Twitch's chat endpoint: `wss://irc-ws.chat.twitch.tv`

  Reading public chat does not require authentication. Sending chat messages through the Twitch API does require authentication.
* **Receive EventSub webhooks**\
  Incoming Twitch events such as stream start notifications or follow events are not currently supported.
* **Support per-user Twitch login**\
  Each connection authenticates a single Twitch account. End users of your app cannot connect their own Twitch accounts through this connector.

## Manage your Twitch connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Twitch**, then open the connection.

* **Unlink projects** to remove Twitch access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Twitch stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
