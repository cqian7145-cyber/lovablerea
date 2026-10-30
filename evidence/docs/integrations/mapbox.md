# Connect your app to Mapbox
<!-- source: https://docs.lovable.dev/integrations/mapbox.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Mapbox

> Connect your app to Mapbox, a location platform, to embed interactive maps with Mapbox GL JS, geocode addresses, and calculate routes and directions from your Lovable app.

[Mapbox](https://www.mapbox.com/) is a location platform for interactive maps, geocoding, and routing. The Mapbox connector lets your Lovable app render maps in the browser with Mapbox GL JS and call Mapbox's location APIs through Lovable's connector gateway. It's designed for apps that want Mapbox's map styles and Mapbox GL JS, or that already run their location features on Mapbox.

Mapbox is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Mapbox, your app can:

* Show interactive maps with Mapbox GL JS and custom Mapbox styles
* Turn addresses into coordinates and search for places
* Calculate routes and turn-by-turn directions
* Compute travel-time areas and distance matrices between many points
* Render static map images for previews and thumbnails

Mapbox is a good fit when you ask for Mapbox by name or need something specific to it. For a quick prototype with generic maps, geocoding, or directions, the managed [Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md) connection needs no account or keys. Pick one provider per app: [Google's terms](https://cloud.google.com/maps-platform/terms/maps-service-terms) do not allow showing Google Maps Platform data, such as geocoding, places, or routes, on a non-Google map like a Mapbox map.

## Common use cases and example apps

These examples show what you can build with Mapbox, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Store locator** | *Use Mapbox and build a store locator with clustered pins, address search, and a sidebar that lists the nearest locations.* | **Help visitors find the closest location on a map.** The app geocodes searches, renders pins with Mapbox GL JS, and updates the list as the map moves. |
| **Delivery dispatch board** | *Use Mapbox and build a dispatch board that shows today's stops on a map, calculates route distance between pickup and dropoff, and sorts jobs by arrival time.* | **Plan routes and arrival times for field operations.** The app calls Mapbox routing on the server and draws stops and paths on an interactive map. |
| **Real estate listings** | *Use Mapbox and build a property listing app where people browse homes on a map, filter by neighborhood, and open detail pages from each pin.* | **Browse listings on a map-first experience.** The app centers the map on search results, renders listing pins, and links each pin to a detail page. |
| **Travel itinerary planner** | *Use Mapbox and build a trip planner where people add stops, see them on a map, and view driving distance and time between each leg.* | **Visualize multi-stop trips with distances and times.** The app geocodes stops, draws the route on a Mapbox map, and shows leg-by-leg summaries. |
| **Event venue finder** | *Use Mapbox and build an event finder where people search by city, see venues on a map, and filter by capacity or event type.* | **Discover venues through map search and filters.** The app geocodes venue addresses, renders them as pins, and filters the map and list together. |
| **Delivery zone planner** | *Use Mapbox and build a tool that shows how far a courier can travel from each depot in 15, 30, and 45 minutes.* | **Draw travel-time areas around your locations.** The app requests isochrones from Mapbox on the server and shades the reachable areas on the map. |
| **Static map previews** | *Use Mapbox and build an admin page that shows a thumbnail map image for each saved location.* | **Show map previews without loading a full interactive map.** The app requests static map images from Mapbox on the server and displays them in lists or cards. |

## How to connect Mapbox

Who can create Mapbox connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Mapbox connections using different tokens, which is useful for separating environments (for example, development and production) or using different Mapbox accounts.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Mapbox, make sure you have:

* A Mapbox account
* At least one Mapbox access token: a public token (`pk.`) for maps in the browser, a secret token (`sk.`) for geocoding and routing, or both
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All Mapbox usage through this connector counts toward your Mapbox plan. Billing and quota are handled directly by Mapbox, not Lovable.

### Step 1: Get Mapbox access tokens

Mapbox uses two token types, and they are not interchangeable. A public token (`pk.`) loads maps in the browser. A secret token (`sk.`) is for everything that runs on the server: geocoding, directions, matrices, isochrones, and static map images, all called through Lovable's connector gateway. A map-only app can connect with a public token alone. Any server-side feature needs a secret token on the connection.

To create Mapbox access tokens:

**1. Open your Mapbox account**

Sign in to [Mapbox](https://account.mapbox.com/).

**2. Open access tokens**

Go to [Access tokens](https://account.mapbox.com/access-tokens/).

**3. Get a public token**

Copy your default public token (it starts with `pk.`), or create a new one. Before you publish, restrict it to your app's URLs in the token's settings.

**4. Create a secret token (if you need server-side features)**

Click **Create a token**, give it a descriptive name (for example, `Lovable integration`), choose the scopes your app needs, and copy the token starting with `sk.`. Mapbox shows a secret token only once.

**5. Store the tokens securely**

Copy each token and store it securely. You'll paste them into Lovable in the next step.

> [!WARNING]
>
> Your secret token functions like a password. Keep it secure and never share it publicly. You'll need your tokens in the next step.

See Mapbox documentation for more: [Access tokens](https://docs.mapbox.com/help/glossary/access-token/).

### Step 2: Connect Mapbox to Lovable

You can create multiple connections using different tokens.

**1. Open Mapbox in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Mapbox**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Mapbox Prod`. This name is only used inside Lovable to identify the connection.
2. **Secret token** (optional): paste your `sk.` token if your app needs geocoding, directions, or other server-side Mapbox features.
3. **Public token** (optional): paste your `pk.` token if your app shows Mapbox maps in the browser. The field is marked **Public** because the value appears in your published app.

Both fields are optional, but you need at least one. **Create token** next to each field opens your Mapbox access tokens page.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies each token you provide against the Mapbox API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Mapbox (based on configured connection-level access). Your Lovable apps can then show Mapbox maps with the public token and geocode, route, and search with the secret token.

## Public and secret tokens

The connector uses the two tokens for different jobs:

* The **secret token** is used for server-side Mapbox calls. Lovable routes them through the [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which adds the token for you, so it never appears in your app's code or in the browser. If the connection has no secret token, server-side calls fail with a `secret_token_required` error.
* The **public token** is used by Mapbox GL JS in the browser. Lovable exposes it to your app's frontend as the `VITE_LOVABLE_CONNECTOR_MAPBOX_PUBLIC_TOKEN` environment variable. Restrict it to your app's URLs in your Mapbox account so other sites cannot use it.

If you connect with only a public token, your app can show maps but not geocode or route. Add a secret token to the connection when you need those features.

## Limitations

The Mapbox connector cannot:

* Rotate tokens automatically. To rotate, create new tokens in Mapbox and update the Lovable connection.
* Support per-end-user Mapbox login. Each connection represents a single Mapbox account shared across all projects linked to it.

If a token is revoked or deleted in Mapbox, update the Lovable connection with a valid token before API calls can succeed again.

## Manage your Mapbox connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Mapbox**, then open the connection.

* **Unlink projects** to remove Mapbox access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Mapbox stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
