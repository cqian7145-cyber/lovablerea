# Connect your app to Google Maps Platform
<!-- source: https://docs.lovable.dev/integrations/google-maps.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Google Maps Platform

> Connect Google Maps Platform to your Lovable app to geocode addresses, calculate routes, search places, embed interactive maps, and pull location data like weather and air quality, using a managed connection or your own API keys.

[Google Maps Platform](https://mapsplatform.google.com/) is Google's suite of location APIs and SDKs for geocoding, routing, places, and interactive maps. The Google Maps Platform connector lets your Lovable app call Google's location APIs through Lovable's connector gateway and render interactive maps in the browser. It's designed for apps that need location, mapping, navigation, or place data, whether behind the scenes or on screen.

Google Maps Platform is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Google Maps Platform, your app can:

* Turn addresses into coordinates and coordinates into addresses
* Calculate routes, travel times, and distance matrices
* Search for places and businesses and show their details, hours, and ratings
* Show interactive or embedded maps with markers and address autocomplete, or static map images
* Validate addresses and snap GPS traces to roads
* Look up weather, air quality, pollen, and solar data for a location
* Use Aerial View, Geolocation, Elevation, Time Zone, Route Optimization, and Area Insights

Google Maps Platform is a good fit when your app needs Google's map and place data, or when you want a working map in minutes with the managed connection.

## Common use cases and example apps

These examples show what you can build with Google Maps Platform, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Property listings** | *Use Google Maps Platform and build a property listing app where people browse homes on a map, filter by neighborhood, and see commute times to a chosen address.* | **Map-driven discovery with travel times.** The app shows listings on an interactive map, geocodes each address to place a pin, and calculates commutes with the Routes API. |
| **Local business directory** | *Use Google Maps Platform and build a directory where people search nearby restaurants and see details, opening hours, and ratings on a map.* | **Place search and discovery.** The app uses address autocomplete in the search bar and the Places API to fetch details, ratings, and hours. |
| **Delivery dispatch tool** | *Use Google Maps Platform and build an internal tool that plans delivery routes for drivers, optimizes stop order, and shows estimated arrival times.* | **Routing and arrival times for operations.** The app computes optimized routes with the Routes API and draws them on an embedded map. |
| **Field service scheduling** | *Use Google Maps Platform and build a scheduling app where dispatchers assign jobs to technicians by location and see travel times between appointments.* | **Location-aware scheduling.** The app geocodes job addresses and uses the Routes API to compute travel times between back-to-back appointments. |
| **Store locator** | *Use Google Maps Platform and build a store locator that shows my retail locations on a map, with an address search and filters for services offered.* | **Public-facing map with search.** The app captures the visitor's address with autocomplete, centers the map on it, and shows the nearest stores. |
| **Travel itinerary planner** | *Use Google Maps Platform and build a trip planner where people add stops, see them on a map, and view driving distance and time between each leg.* | **Multi-stop itineraries.** The app adds stops with autocomplete, calculates each leg with the Routes API, and draws the trip on an embedded map. |

## How Google Maps Platform connections work

Google Maps Platform uses two API keys because some of its APIs run on the server and others in the browser:

* The **server key** is private. Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) uses it to call server-side APIs such as Geocoding, Routes, Places, Weather, and Air Quality. It never reaches the browser.
* The **browser key** is public. Your app's frontend uses it to load maps: the Maps JavaScript API for interactive maps, plus map embeds and static map images. The connection form marks it **Public**, and Lovable exposes it to your app's frontend as the `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` environment variable, so it appears in your published app's code.

Everything except loading maps goes through the gateway with the server key, including address autocomplete and place details. The managed browser key is authorized only for the Maps JavaScript, Maps Embed, Maps Static, and Map Tiles APIs, and Step 3 restricts your own browser key the same way. Places, Geocoding, Routes, and other server-side APIs fail with `REQUEST_DENIED` if called from the browser.

Server-side requests through the gateway are limited to **6,000 requests per 24 hours per workspace** for each connection type. A managed connection and a connection with your own credentials each get their own 6,000. Requests the browser makes to Google with the browser key do not count.

## How to connect Google Maps Platform

Who can create Google Maps Platform connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you choose between two options:

* **Managed by Lovable**: Lovable provides and manages the credentials for you. No registration needed, not for production. Maps do not load on custom domains.
* **Use your own credentials**: connect your own server and browser API keys. Required for custom domains and for production apps.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

Follow the setup steps below for the option you want.

**Managed by Lovable**

Choose this option for the fastest setup while you prototype. You don't need a Google Cloud account or API keys.

> [!WARNING]
>
> The managed connection works on `*.lovable.app` domains and does not load maps on a custom domain. Lovable shows a **Custom domains** note on the connection and warns in the Publish dialog when a project with a custom domain uses a managed connection. To use Google Maps Platform on a custom domain, add a connection with **Use your own credentials** and put the custom domain in your browser key's website restrictions.

> [!WARNING]
>
> The managed connection is for prototyping and preview, not production. Server-side requests through Lovable's connector gateway are limited to **6,000 per 24 hours per workspace**. When you go live, add a connection with **Use your own credentials** so usage runs on your Google Cloud project and billing account. Your own credentials get their own separate 6,000 requests through the gateway, so switching changes who bills you rather than lifting the gateway limit.

> [!NOTE]
>
> You can create one managed Google Maps Platform connection per workspace. If one exists, the **Managed by Lovable** option is unavailable in the form until you delete it.

**1. Open Google Maps Platform in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Google Maps Platform**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Google Maps Platform`). This name is only used inside Lovable to identify the connection.

**4. Choose Managed by Lovable**

Under **Authentication**, select **Managed by Lovable**. No credential fields appear for this option, and the form shows the **Custom domains** note.

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form.

**Use your own credentials**

Choose this option when your app uses a custom domain, when you go to production, or when you want to control which APIs are enabled and how each key is restricted.

You can create multiple Google Maps Platform connections using different keys, which is useful for separating environments or attaching different Google Cloud billing accounts.

### Prerequisites

Before connecting Google Maps Platform with your own credentials, make sure you have:

* A Google Cloud project with billing enabled
* Permission to enable APIs and create API keys in that project
* Your app's domains: its `*.lovable.app` URL and any custom domains
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All Google Maps Platform usage through this connection is billed by Google Cloud to your billing account, based on API calls and map loads. Google Maps Platform includes a recurring monthly free tier. See [Google Maps Platform pricing](https://mapsplatform.google.com/pricing/). Billing and quota are handled directly by Google, not Lovable, so set budget alerts and quota caps in the Google Cloud console.

### Step 1: Enable the APIs you need

Google Maps Platform bills per API, so enable only the ones your app uses. In the [Google Cloud console](https://console.cloud.google.com/), open **APIs & Services** for your project.

For the browser key, enable the APIs your app loads in the browser:

* Maps JavaScript API
* Maps Embed API, if your app embeds maps
* Maps Static API, if your app shows static map images

For the server key, enable the APIs your app calls through Lovable's gateway. The connector routes all of these:

* Geocoding API
* Routes API
* Places API (New)
* Address Validation API
* Aerial View API
* Air Quality API
* Geolocation API
* Maps Elevation API
* Maps Platform Datasets API
* Places Aggregate API (Area Insights)
* Pollen API
* Roads API
* Route Optimization API
* Solar API
* Street View Static API
* Time Zone API
* Weather API

> [!NOTE]
>
> Google has deprecated the legacy Directions API, Distance Matrix API, and the original Places API, and the connector rejects calls to them. Lovable uses the Routes API and Places API (New) instead.

### Step 2: Create the server API key

The server key is used by Lovable's connector gateway, so restrict it by API. Allowing only the APIs your app calls limits the impact if the key is ever leaked. Do not add a website restriction: gateway requests carry no referrer, so a referrer-restricted key rejects every server call.

**1. Open credentials**

Open the [Credentials page](https://console.cloud.google.com/apis/credentials) in the Google Cloud console and select your project.

**2. Create the key**

Click **Create credentials → API key**.

**3. Name the key**

Give it a descriptive name, for example `Lovable Google Maps Platform server key`.

**4. Edit the key**

Click **Edit API key**.

**5. Restrict by API**

Under **API restrictions**, select **Restrict key** and choose only the server-side APIs from Step 1 that your app uses.

**6. Set the application restriction**

Under **Application restrictions**, leave **None** selected, or select **IP addresses** and add Lovable's gateway ranges from [IP allowlisting](https://docs.lovable.dev/integrations/security.md#ip-allowlisting). Never select **Websites** for this key.

**7. Save and copy**

Save and copy the key. It starts with `AIza` and is 39 characters long.

### Step 3: Create the browser API key

The browser key is public by design and appears in your app's frontend code. Its website restriction is what prevents other sites from reusing it.

**1. Create the key**

On the same Credentials page, click **Create credentials → API key**.

**2. Name the key**

Give it a descriptive name, for example `Lovable Google Maps Platform browser key`.

**3. Edit the key**

Click **Edit API key**.

**4. Restrict by website**

Under **Application restrictions**, select **Websites** and add every domain your app is served on, for example `https://your-project.lovable.app/*`, plus `https://yourdomain.com/*` and `https://www.yourdomain.com/*` for a custom domain.

**5. Restrict by API**

Under **API restrictions**, select **Restrict key** and choose **Maps JavaScript API**, plus **Maps Embed API** and **Maps Static API** if you enabled them in Step 1. Leave Places, Geocoding, Routes, and other server-side APIs off this key. Lovable calls them through the gateway with the server key.

**6. Save and copy**

Save and copy the key. It starts with `AIza` and is 39 characters long.

> [!WARNING]
>
> Your server key functions like a password. Keep it secure and never share it publicly. Set the browser key's website restriction before you publish. You'll need both keys in the next step.

See Google's documentation for more: [API security best practices](https://developers.google.com/maps/api-security-best-practices).

### Step 4: Connect Google Maps Platform to Lovable

You can create multiple connections using different keys.

**1. Open Google Maps Platform in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Google Maps Platform**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Google Maps Platform Prod`). This name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Authentication**, select **Use your own credentials**. The form shows a short reminder to use two keys.

**5. Add the server key**

Paste the key from Step 2 into **Server API Key**. **Create key** next to the field opens the Google Cloud Credentials page.

**6. Add the browser key**

Paste the key from Step 3 into **Browser API Key**. The field is marked **Public** because the value appears in your published app.

**7. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**8. Connect**

Click **Connect** at the bottom of the form. Lovable checks that each key has the right format but does not call Google to test it, because key restrictions would make the test fail. After connecting, ask Lovable for one map and one address lookup to confirm both keys work.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Google Maps Platform (based on configured connection-level access). Your Lovable apps can then geocode, route, search places, and show maps with Google Maps Platform.

## Limitations

The Google Maps Platform connector cannot:

* Load maps on a custom domain with the managed connection. The managed browser key is restricted to Lovable's domains.
* Exceed 6,000 server-side gateway requests per 24 hours per workspace for each connection type.
* Call the legacy Directions, Distance Matrix, or original Places APIs. Google has deprecated them, and the gateway rejects those paths.
* Support per-end-user Google login. Each connection represents a single set of keys shared across all projects linked to it.
* Work from territories where Google prohibits Maps Platform: China, Cuba, Iran, North Korea, Syria, Vietnam, and Crimea and the other occupied regions of Ukraine. Lovable blocks connecting and gateway requests from those locations and points to [Google's list](https://cloud.google.com/maps-platform/terms/maps-prohibited-territories).

## Troubleshooting

If maps or location requests fail, the sections below cover the most common errors and how to resolve them.

> **Maps do not load and the browser console shows "RefererNotAllowedMapError"**
>
> The browser key's website restrictions do not include the domain the app is served on. Add the exact origin, including protocol and subdomain, on the Google Cloud Credentials page. With a managed connection on a custom domain, this is expected: switch to your own credentials.

> **Server-side requests fail with 403 "API\_KEY\_HTTP\_REFERRER\_BLOCKED"**
>
> The server key has a website restriction. Gateway requests carry no referrer, so every call is blocked. Edit the key in Google Cloud and set **Application restrictions** to **None** or **IP addresses** with Lovable's gateway ranges.

> **Server-side requests fail with "REQUEST\_DENIED" or 403 "API\_KEY\_SERVICE\_BLOCKED"**
>
> Either the API is not enabled in your Google Cloud project, or the server key's API restrictions do not include it. Check both in the Google Cloud console.

> **Geocoding or routing fails when called from the browser**
>
> The browser key is authorized only for loading maps. Ask Lovable to move geocoding, routing, and other server-side calls to the backend so they go through the gateway with the server key.

> **Autocomplete, place details, or map pin clicks stop working while the map still loads**
>
> The app calls the Places API from the browser with the managed browser key. Since September 10, 2026, that key no longer authorizes Places API calls, so apps built earlier that used browser autocomplete or place details fail on those features without any change to the app. Reconnecting the connection or changing referrer settings does not restore access. Ask Lovable to move autocomplete, place search, and place details to the backend so they go through the gateway with the server key.

> **Server-side requests fail with 429 "Too Many Requests"**
>
> The workspace has used its 6,000 gateway requests for the day on that connection type. The response includes a `Retry-After` header. Ask Lovable to cache repeated lookups, debounce autocomplete, reduce call volume, and keep map loads on the browser key, which does not count toward the limit. A connection of the other type has its own separate 6,000.

## Manage your Google Maps Platform connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google Maps Platform**, then open the connection.

* **Unlink projects** to remove Google Maps Platform access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google Maps Platform stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
- [Connect your app to Google Search Console (GSC)](https://docs.lovable.dev/integrations/google-search-console.md)
- [Connect your app to LlamaParse Platform](https://docs.lovable.dev/integrations/llamaparse.md)
