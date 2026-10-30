# Connect your app to Workday
<!-- source: https://docs.lovable.dev/integrations/workday.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Workday

> Connect your app to Workday, the HR and workforce platform, to let each app user read worker, organization, and time off data with their own Workday permissions.

[Workday](https://www.workday.com/) is an enterprise platform for HR, finance, and workforce management. The Workday connector lets your Lovable app read Workday HCM data such as workers, organizations, and time off through an API client registered in your own Workday tenant.

Workday is available as an [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md): each end user of your published app connects their own Workday account, and every request runs with that user's own Workday permissions. There is no shared, workspace-wide Workday connection.

With Workday, your app can:

* Read worker profiles, job, and organization data
* Query time off balances and requests
* Call any Workday REST API allowed by your API client's functional areas and the connected user's permissions

It's a good fit for employee self-service tools, HR dashboards, directories, and org charts where each person sees exactly what they can see in Workday.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Employee self-service portal | *Use Workday and build a portal where each signed-in employee sees their own profile, job details, and time off balance.* | **Give every employee a personal HR view.** The app reads the connected user's own worker record and time off data from Workday. |
| Team directory | *Use Workday and build a searchable directory of the people and teams I can see in Workday.* | **Browse people and org data without opening Workday.** The app lists the workers and organizations the connected user is allowed to see, with search and filters. |
| Org chart explorer | *Use Workday and build an org chart that shows reporting lines for my organization.* | **Visualize reporting structure from live Workday data.** The app reads organization and worker data and renders an interactive chart scoped to the user's access. |
| Time off dashboard | *Use Workday and build a dashboard where I can review my time off balances and requests.* | **Track time off in one place.** The app queries the connected user's time off balances and requests and presents them in a single view. |
| Manager team view | *Use Workday and build a view where managers see their direct reports and upcoming time off.* | **Support managers with their own team data.** The app reads the reporting relationships and time off data the signed-in manager can access in Workday. |
| Custom report viewer | *Use Workday and build a viewer for our Workday custom report so the team can filter and sort results.* | **Bring a Workday custom report into an app interface.** The app calls the report under the connected user's permissions and adds filtering and sorting on top. |

## How the Workday connector works

An app user connector has two parts: a client you configure once for your workspace, and the individual sign-ins your users complete inside your published app.

* **The client** holds the details of an API client registered in your Workday tenant: three endpoint URLs, a client ID, and a client secret. It never contains any individual user's data.
* **Each user connects their own account.** The first time a user needs Workday data, your app sends them through Workday's sign-in and consent flow. Lovable stores their tokens encrypted in the connector gateway, never exposed to your app code or to you as the builder.
* **Requests go through the connector gateway**, which injects the right user's credentials, refreshes expiring tokens automatically, and inserts your tenant into REST paths so app code never needs to know it.

Access is the intersection of two things: the functional areas selected on the API client in Workday, and the connected user's own Workday security. Neither the app nor Lovable can widen either one.

## How to connect Workday

Who can create Workday clients depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients). You can create multiple Workday clients using different API clients, which is useful for separating environments (for example, a sandbox and a production Workday tenant).

When the client is created, anyone building in a project can ask Lovable in the project chat to connect it to their project.

### Prerequisites

Before connecting Workday, make sure you have:

* A Workday account and permission to register an API client in your Workday tenant, or a Workday administrator who can do it for you
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))
* Authentication in your app ([built-in authentication](https://docs.lovable.dev/features/authentication) or your own), so each visitor is signed in before they connect their Workday account

> [!NOTE]
>
> All API requests made through this connector run against your Workday tenant and are governed by your Workday agreement. Billing and quota are handled directly by Workday, not Lovable.

### Step 1: Register an API client in Workday

The connector authenticates through an API client you register in your own Workday tenant. Work with your Workday administrator if you don't have access to these tasks.

**1. Run the Register API Client task**

In Workday, search for and run the **Register API Client** task.

**2. Configure the grant**

Set **Client Grant Type** to **Authorization Code Grant** and **Access Token Type** to **Bearer**.

**3. Leave PKCE disabled**

Keep **Support Proof Key for Code Exchange (PKCE)** disabled. Workday issues no client secret for PKCE clients, and the connector authenticates with the client secret.

**4. Set the redirection URI**

Paste this exact value as the **Redirection URI**:

```text theme={null}
https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback
```

This value applies to the app user connector. If your workspace offers Workday as an **App + chat connector** (a shared workspace connection), its redirection URI is different. Always copy the exact value shown in the Lovable setup form for the connection type you're creating.

**5. Enable non-expiring refresh tokens (recommended)**

Check **Non-Expiring Refresh Tokens** so user connections survive idle periods. With Workday's default 30-day timeout, users must reconnect after a month of inactivity.

**6. Select functional areas**

Under **Scope (Functional Areas)**, select only the areas your app needs (for example, **Staffing** for worker data). Leave everything else at its default, and do not enable Implicit, JWT, or SAML grants.

**7. Copy the client ID and client secret**

After clicking **OK**, copy the **Client ID** and **Client Secret**. The secret is shown only once.

**8. Copy the endpoints**

Run the **View API Clients** task and copy the **Workday REST API Endpoint**, **Token Endpoint**, and **Authorization Endpoint** for your new API client. You paste each one as is into Lovable in the next step.

> [!WARNING]
>
> The client secret functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

### Step 2: Create the Workday client in Lovable

**1. Open Workday in Connectors**

Go to **Connectors** and select **Workday**.

**2. Add the client**

Click **App user connector**.

**3. Name the client**

In **Display name**, name the client (for example, `Workday production`). This name is only used inside Lovable to identify the client.

**4. Paste the API client details**

Fill in the fields with the values from Workday:

1. **Workday REST API Endpoint**, **Token Endpoint**, and **Authorization Endpoint**: paste each URL exactly as shown under **View API Clients**.
2. **Client ID** and **Client Secret**: paste the values you copied when registering the API client.

**5. Choose who can use this client**

Under **Sharing**, the client is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the client available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Create the client**

Click **Create client**.

### Step 3: Add the connect experience to your app

Once the client exists, tell Lovable in the project chat what you want, and it connects the client to your project and builds the in-app connect flow. For example:

```text wrap theme={null}
Let each signed-in user connect their own Workday account and show their time off balance on the dashboard.
```

The first time a user taps **Connect**, your app sends them to Workday to sign in and approve access. After that, the app reads Workday data as that user.

When the client is created, anyone building in a project can ask Lovable in the project chat to connect it to their project (based on configured client-level access). Your published apps can then let each user connect their own Workday account and read their HCM data.

## Limitations

The Workday connector cannot:

* Provide a shared, workspace-wide Workday connection. Every request runs as an individual app user who has connected their own Workday account.
* Exceed the functional areas configured on the API client or the connected user's own Workday permissions. A 403 response means the API client lacks that functional area or the user lacks access in Workday.
* Keep users connected past your tenant's refresh token timeout unless the API client uses non-expiring refresh tokens. With the default 30-day timeout, users must reconnect after a month of inactivity.

If a user revokes authorization on the Workday side, they need to reconnect in your app before API calls can succeed again.

## Manage the Workday client

* **Users can disconnect** their own Workday account at any time, which revokes their stored tokens.
* **Edit the client** from **Connectors** → **Workday** to update credentials or change who can use it.
* **Deleting the client** removes Workday access for every user in the linked projects.

See [Integration security](https://docs.lovable.dev/integrations/security.md) for how credentials are stored, rotated, and deleted.


## Related topics

- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
