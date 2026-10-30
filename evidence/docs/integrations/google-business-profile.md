# Connect Google Business Profile to Lovable
<!-- source: https://docs.lovable.dev/integrations/google-business-profile.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect Google Business Profile to Lovable

> Connect Google Business Profile to manage your business locations, opening hours, reviews, posts, and performance directly in Lovable or in your published app.

[Google Business Profile](https://business.google.com/) lets you manage how your business appears on Google Search and Maps. With the Google Business Profile connector, you can ask Lovable to set up, read, and update the profiles you own or manage. You can also build those capabilities into your app.

Google Business Profile is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one connection that can be used by Lovable directly or in your published app.

With Google Business Profile, you can:

* Set up, claim, and verify your Business Profile in chat
* Read your business locations, profile details, and opening hours
* Update business information, regular hours, and special hours
* Read the complete review feed for verified locations and create, update, or delete owner replies
* Publish local posts and manage photos
* Check verification status and request eligible verification methods
* Read profile performance metrics and search keyword impressions
* Link your verified listing to your Google Ads account, so your ads can show your address and become eligible for Google Maps

Use this connector to put your business on Google Search and Maps and keep your listings current. You can also respond to customer feedback and compare performance across the locations you manage. Google Business Profile is one of the [Growth tools](https://docs.lovable.dev/features/growth-tools.md).

> [!NOTE]
>
> This connector accesses profiles the connected Google account owns or manages.
> For public business searches, competitor research, or public ratings and
> review snippets, use [Google Maps](https://docs.lovable.dev/integrations/google-maps.md).

## Common use cases

You can ask Lovable to work with your Business Profile data directly or build an app for recurring workflows. These examples apply to business owners, operations teams, and marketing teams.

| Use case | Description |
| :- | :- |
| Review management | **Respond to customer feedback across your locations.** Read the complete review feed and review each proposed owner reply before sending it. |
| Opening hours updates | **Keep regular and holiday hours current.** Check existing hours, preview proposed changes, and confirm the location and values before applying them. |
| Local content publishing | **Publish updates and photos for your business.** Prepare local posts and choose which managed location to publish them to. |
| Location performance | **Compare how your profiles perform.** Read daily metrics and monthly search keyword impressions for selected locations and date ranges. |
| Location verification | **Check which locations need verification.** Read verification status and, as the owner, request eligible methods and start verification. |

For example, ask Lovable to prepare an opening hours update:

```text wrap theme={null}
Use Google Business Profile and show the current opening hours for my locations. Prepare special hours for December 24, from 9 AM to 1 PM, at my downtown location. Show me the exact location and proposed change before applying it.
```

### Use Google Business Profile in your published app

Use Google Business Profile in your published app to build a dashboard for your team. In it, your team can read reviews, approve replies, and manage opening hours for your business locations. The connector continues to work after you publish, so your team can use these features directly in the app.

The app uses your linked Google account. Visitors do not connect their own Google accounts. You choose which data and actions your app makes available, such as displaying reviews or letting signed-in team members approve replies and update hours.

For example, ask Lovable to build a team dashboard:

```text wrap theme={null}
Use Google Business Profile and build a dashboard for my team to use in the published app. Use my linked Google account to load reviews and opening hours for the verified business locations I manage. Let visitors read reviews, and require team members to sign in before approving replies or updating hours. Show the exact reply or hours change for confirmation before applying it.
```

## Set up or claim your Business Profile from chat

Google lists businesses that meet customers in person, at a storefront or at the customer's location. An online-only business, a virtual office, or a PO box is not eligible. For an ineligible business, Lovable says so and suggests other ways to be found.

Ask Lovable, for example:

```text wrap theme={null}
Put my bakery on Google Maps.
```

Lovable guides you through the details it needs, such as your business name, address or service area, category, opening hours, and website. It checks for an existing listing:

* **A listing you already manage**: Lovable uses that listing instead of creating a new one.
* **An unclaimed listing**: Lovable claims it for you.
* **A listing someone else has claimed**: Lovable gives you Google's link to request access instead of creating a duplicate.
* **No listing**: Lovable prepares a new listing. You approve the details before it sends them to Google.

Verification confirms that you can manage the listing. Google decides when and how your business appears on Search and Maps. Lovable helps you choose from the verification methods Google makes available and starts verification when you ask:

* **Phone call, SMS, or email**: Google sends a code within minutes. Give the code to Lovable, and it completes the verification.
* **Postcard**: Google mails a code, which can take up to 14 days. Give it to Lovable when it arrives.
* **Video verification**: only at [business.google.com](https://business.google.com/).

Google can take up to 5 business days to review a verification. The initial setup does not add photos. After verification, add your logo and photos in your Business Profile on [Google Search or Maps](https://support.google.com/business/answer/6103862).

## Use your Business Profile with Google Ads

Once your listing is verified, Lovable can help you set up local ads that are eligible to show on Google Maps. See [Advertise your app](https://docs.lovable.dev/features/ads.md).

In the guided ads flow, Lovable offers to link one verified business location to your Google Ads account. You approve the link before Lovable makes the change. The link applies to the whole ad account. If the ad account already has linked locations, Lovable keeps them and explains how you can manage them in Google Ads.

Google syncs the location, which can take a few days. Your ads can then become eligible to show your address and appear on Google Maps. Google decides where ads appear, so linking a location does not guarantee Maps placement. You can continue setting up campaigns without adding a new link; any existing location links remain.

## How to connect Google Business Profile

Who can create Google Business Profile connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Google Business Profile connections using different Google accounts, which is useful when you manage profiles for different businesses.

When the connection is created, you can ask Lovable to use it directly. To use it in an app, [link it to the project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) by asking Lovable in chat.

### Prerequisites

Before connecting Google Business Profile, make sure you have:

* A Google account. You do not need a Business Profile yet. Lovable can set one up from chat after you connect.
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Google provides the Business Profile API [at no
> charge](https://developers.google.com/my-business/content/pricing). Requests
> through the connector count toward [Google's API
> quotas](https://developers.google.com/my-business/content/limits). Google
> controls these limits.

### Set up your Google Business Profile connection

You authorize Lovable by signing in with Google. You do not need an API key or your own Google Cloud project for this connection.

**1. Open Google Business Profile in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Google Business Profile**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Review the required permission**

Under **Configure connection → Scopes**, review the permissions Lovable requests. All three are selected by default.

| Scope | Description | Default |
| :- | :- | :- |
| **Manage business profiles, locations, verification, and insights** (`https://www.googleapis.com/auth/business.manage`) | Access and manage the business profiles available to the connected Google account, including reviews, replies, and performance. | Required |
| **Identify the connected Google account** (`openid`) | Tells Lovable which Google account you connected. | Selected |
| **See the connected Google account's email address** (`https://www.googleapis.com/auth/userinfo.email`) | Lovable uses the email address to link your listing to your Google Ads account. | Selected |

The Business Profile permission includes both reading and managing profiles. The connector does not offer a separate read-only scope.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Anyone you share the connection with uses the business profile access of the connected Google account.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Google and authorize**

Click **Connect** at the bottom of the form. The Google authorization window opens, so make sure your browser doesn't block pop-ups. If the window is blocked, Lovable redirects you instead.

Choose the Google account you want to use for your business, review the requested permission, and authorize Lovable. If you already have a Business Profile, use an account that owns or manages it.

Google redirects you back to Lovable with a confirmation.

When connected, ask Lovable to read or manage your business profiles directly, based on your connection-level access. If you want to use the connection in an app, ask Lovable in chat to link it to your project.

### Verify access and make your first request

Ask Lovable to list the accounts and locations available through your connection:

```text wrap theme={null}
Use Google Business Profile and list the business accounts and locations I can access. Show each location's name, address, and current opening hours without changing anything.
```

Check that the expected locations appear. If several locations match your request, specify which one you want before asking Lovable to make a change.

### Review changes and verification requests

Lovable validates proposed profile and opening-hour changes before applying them. Confirm the exact location and proposed values when asked. For review replies, review the final text before sending it.

You can connect before your locations are verified and [verify them from chat](#set-up-or-claim-your-business-profile-from-chat). Google requires a verified location before you can [read its reviews](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list).

Google determines which verification methods a location supports. Lovable starts verification only when you ask, and it cannot bypass the steps Google requires. See [Google's Business Profile API policies](https://developers.google.com/my-business/content/policies).

When building an app, include approval steps for profile changes and replies, and explicit owner actions for verification. Do not schedule or automatically retry verification requests.

## Limitations

The Google Business Profile connector cannot:

* Access complete reviews or private performance data for businesses the connected Google account does not own or manage
* Use the Google Business Profile Notifications API or receive notifications and webhooks. The connector does not support this API or the required Google Cloud Pub/Sub setup.
* Read or post business questions and answers, or use the discontinued Business Calls API
* Support per-end-user Google Business Profile login. Each connection represents one Google account shared across all projects linked to it.

If you revoke Lovable's authorization in Google, reconnect the integration in Lovable before making further requests.

## Manage your Google Business Profile connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google Business Profile**, then open the connection.

* **Unlink projects** to remove Google Business Profile access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google Business Profile stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Growth tools](https://docs.lovable.dev/features/growth-tools.md)
