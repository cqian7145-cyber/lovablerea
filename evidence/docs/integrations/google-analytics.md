# Connect your app to Google Analytics
<!-- source: https://docs.lovable.dev/integrations/google-analytics.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Google Analytics

> Connect your app to Google Analytics 4 to track page views, custom events, and conversions from your Lovable app using gtag.js.

[Google Analytics](https://marketingplatform.google.com/about/analytics/) is Google's web analytics service. The Google Analytics connector lets your Lovable app send page views, custom events, and conversions to a Google Analytics 4 property using gtag.js. It's designed for apps whose traffic and behavior reporting should live alongside the rest of your Google Analytics data.

Google Analytics is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

> [!NOTE]
>
> Google Analytics reports on your app's traffic. To run and measure paid Google campaigns, see [Advertise your app](https://docs.lovable.dev/features/ads.md).

With Google Analytics, your app can:

* Track page views across the app, including client-side route changes
* Send custom events for clicks, sign-ups, and conversions
* Measure traffic sources, sessions, and user engagement
* Feed the reports and dashboards in your Google Analytics property

This connector syncs your GA4 **measurement ID** to your app's browser code, which loads gtag.js from Google. It is send-only: your reports stay in Google Analytics, and Lovable does not read your analytics data back into the app.

## Common use cases and example apps

Use Google Analytics when you want your Lovable app's traffic and conversion data in a GA4 property alongside your other sites.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Marketing site with traffic reporting** | *Use Google Analytics and build a marketing site that reports page views for every landing page.* | **See which pages bring traffic.** The app loads gtag.js once at startup and sends a page view for each route so sessions and sources show up in your GA4 reports. |
| **Waitlist landing page** | *Use Google Analytics and build a waitlist page that tracks form starts and completed signups as events.* | **Measure landing-page conversion.** The app sends a custom event when a visitor starts the form and another when the signup succeeds, so you can see where people drop off. |
| **SaaS onboarding funnel** | *Use Google Analytics and track each onboarding step so we can see where new users stall.* | **Instrument a multi-step funnel.** The app sends one named event per step, letting you compare completion rates between steps in GA4. |
| **Store with purchase tracking** | *Use Google Analytics and send a purchase event with order value whenever a checkout completes.* | **Attribute revenue to traffic sources.** The app sends a purchase event with the order value after checkout so GA4 can tie revenue back to campaigns. |
| **Content or blog site** | *Use Google Analytics and track article views and scroll depth on our blog.* | **Understand which content holds attention.** The app reports a view for each article route and sends engagement events as readers move down the page. |
| **Campaign landing pages** | *Use Google Analytics and build campaign landing pages that keep UTM parameters so I can compare ad channels.* | **Compare paid channels in GA4.** The app preserves campaign parameters on entry and reports conversions against them in your acquisition reports. |

## How to connect Google Analytics

Who can create Google Analytics connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Google Analytics connections using different measurement IDs, which is useful for separating environments (for example, development and production) or reporting into more than one GA4 property.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Google Analytics, make sure you have:

* A Google Analytics account with a Google Analytics 4 property
* A web data stream in that property
* The stream's **measurement ID**, which starts with `G-`
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Event collection, data retention, quotas, and any Google Analytics 360 billing are handled directly by Google, not Lovable.

### Step 1: Get your Google Analytics measurement ID

A measurement ID identifies the web data stream that receives your app's events. It starts with `G-`, followed by uppercase letters and numbers.

To find your measurement ID:

**1. Open Google Analytics**

Sign in to [Google Analytics](https://analytics.google.com/) with an account that has access to the property you want to use.

**2. Open your data streams**

Go to **Admin → Data collection and modification → Data streams**.

**3. Select or create a web stream**

Select the web data stream for your app. If the property has none, click **Add stream → Web**, enter your app's URL and a stream name, then click **Create stream**.

**4. Copy the measurement ID**

Copy the **Measurement ID** from the stream details, for example `G-XXXXXXXXXX`.

> [!NOTE]
>
> A measurement ID is not a secret. Google Analytics expects it to be visible in your site's browser code, and Lovable exposes it to your app's frontend as an environment variable. Choosing who can use the connection controls who can build with it in Lovable, not who can read the ID in a published app.

See Google's documentation for more: [Find your Google Analytics measurement ID](https://support.google.com/analytics/answer/12270356).

### Step 2: Connect Google Analytics to Lovable

You can create multiple connections using different measurement IDs.

**1. Open Google Analytics in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Google Analytics**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Google Analytics Prod`. This name is only used inside Lovable to identify the connection.
2. **Measurement ID**: paste the measurement ID from your web data stream. It must start with `G-` followed by at least four uppercase letters or numbers.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable does not call Google Analytics to check the measurement ID, so compare it against your data stream before you save.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Google Analytics (based on configured connection-level access). Your Lovable apps can then load gtag.js and send page views and events to your GA4 property.

## Check that events are arriving

Lovable does not verify the measurement ID when you save the connection, so confirm collection from the Google Analytics side once your app is running:

**1. Use your app**

Open your app in a browser and move between a few pages.

**2. Open the realtime report**

In Google Analytics, go to **Reports → Realtime** and check that active users and `page_view` events appear.

**3. Recheck the ID if nothing arrives**

If no data shows up after a few minutes, confirm that the measurement ID in Lovable matches the data stream, and that no ad or tracking blocker is active in your browser.

## Limitations

The Google Analytics connector is send-only and cannot:

* Read your Google Analytics reporting data. It does not give your app access to the Google Analytics Data API, so you cannot build in-app dashboards or charts from your GA4 reports.
* Send events from backend code. The measurement ID reaches your app's browser code only, and server-side collection through the Measurement Protocol needs a separate `api_secret` that this connector does not hold.
* Manage your Google Analytics configuration. Create and edit properties, data streams, conversions, and audiences in Google Analytics.
* Check the measurement ID when you save the connection. A correctly formatted but wrong ID saves without an error and events go nowhere.
* Revoke a measurement ID. Deleting the connection removes it from Lovable, but the ID stays valid. To stop collection, disable or delete the data stream in Google Analytics.
* Support per-end-user Google Analytics login. Each connection represents a single measurement ID shared across all projects linked to it.

## Manage your Google Analytics connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google Analytics**, then open the connection.

* **Unlink projects** to remove Google Analytics access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google Analytics stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Search Console (GSC)](https://docs.lovable.dev/integrations/google-search-console.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to BigQuery](https://docs.lovable.dev/integrations/bigquery.md)
- [Connect your app to Looker](https://docs.lovable.dev/integrations/looker.md)
- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
