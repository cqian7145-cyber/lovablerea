# Connect your app to Gong
<!-- source: https://docs.lovable.dev/integrations/gong.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Gong

> Connect your app to Gong to work with sales call metadata, transcripts, conversation topics, interaction stats, and user data from your Gong account.

[Gong](https://www.gong.io/) is a revenue intelligence platform that records, transcribes, and analyzes customer conversations so sales teams can review calls, coach reps, and track deals. The Gong connector lets your Lovable app read that conversation data through the Gong API.

Gong is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Gong, your app can:

* List calls in a date range and display their metadata
* Retrieve call transcripts
* Read rich call details, including participants, topics, and tracker matches
* Read interaction and activity stats for calls and reps
* Look up Gong users and workspaces

Gong is a good fit when you want customer conversation data in a sales dashboard, coaching tool, or internal revenue reporting app.

## Common use cases and example apps

Use Gong when your app needs the content or the outcomes of customer calls alongside its existing workflows.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Call review dashboard** | *Use Gong and build a dashboard that lists last week's calls with their date, duration, participants, and topics.* | **Give the team one place to review recent customer conversations.** The app reads call data for a date range and surfaces the details reviewers look for first. |
| **Transcript search** | *Use Gong and build a search page that finds calls where a keyword appears in the transcript.* | **Make past conversations searchable.** The app retrieves transcripts and matches them against the search term so teams can find the moment a topic came up. |
| **Competitor mention tracker** | *Use Gong and build a tracker that shows which competitors came up in calls this quarter and how often.* | **Turn scattered call mentions into a trend you can read.** The app reads tracker and topic data across calls and aggregates mentions over time. |
| **Rep coaching scorecard** | *Use Gong and build a scorecard that shows talk ratio and interaction stats for each rep over the last 30 days.* | **Base coaching conversations on measured behavior.** The app reads activity and interaction stats per user and presents them as a comparable scorecard. |
| **Deal conversation timeline** | *Use Gong and build a timeline for a single account that shows every call, its participants, and its key topics in order.* | **See the whole history of an account in one view.** The app filters calls by account and arranges them chronologically with their conversation details. |
| **Customer voice digest** | *Use Gong and build a weekly digest of the themes and objections that came up most in customer calls.* | **Get recurring customer feedback in front of the team.** The app reads topics and transcripts across recent calls and summarizes them into a recurring digest. |
| **Onboarding call library** | *Use Gong and build a searchable library of example calls grouped by topic for new reps.* | **Help new reps learn from real conversations.** The app organizes calls and their transcripts into a browsable library by theme. |

## How to connect Gong

Who can create Gong connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Gong connections using different access keys, which is useful for separating Gong accounts or permission sets.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Gong, make sure you have:

* A Gong account with permission to create API keys
* A Gong access key and access key secret with the permissions your app needs
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> API requests through this connector count toward Gong's API limits and any applicable Gong plan usage. Billing and quota are handled directly by Gong, not Lovable.

### Step 1: Create a Gong access key

A Gong access key lets your Lovable app authenticate with the Gong API. Gong issues it as a pair: an access key and an access key secret. You need both.

To create a Gong access key:

**1. Open the Gong API page**

Sign in to Gong and go to [API authentication](https://app.gong.io/company/api-authentication), under **Company Settings → Ecosystem → API**.

**2. Create an access key**

Create a new access key and select only the permissions your app needs.

**3. Copy both values**

Copy the **access key** and the **access key secret**, and store them securely. Gong only shows the secret once.

**4. Note your API base URL**

Check the API base URL shown on the same page. If it is not `https://api.gong.io`, your account is on a regional Gong cell and you need this value in the next step.

> [!WARNING]
>
> Your access key secret functions like a password. Paste it only into the Gong connection form in Lovable. Do not put it in a prompt, URL, browser code, source file, or chat message.

See Gong documentation for more: [Gong API documentation](https://gong.app.gong.io/settings/api/documentation).

### Step 2: Connect Gong to Lovable

Open the connection form and enter the credentials you created in Gong.

**1. Open Gong in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Gong**. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for other ways to open the connector catalog.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Gong Sales`. This name is only used inside Lovable to identify the connection.
2. **Access key**: paste the Gong access key.
3. **Access key secret**: paste the secret Gong showed when you created the key.
4. **API base URL** (optional): expand **Advanced settings** to see this field. Leave it empty to use `https://api.gong.io`, and fill it in only if Gong showed a regional base URL, for example `https://us-11211.api.gong.io`. The field accepts only `*.api.gong.io` addresses over HTTPS.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials with Gong before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Gong (based on configured connection-level access). Your Lovable apps can then call Gong through Lovable's server-side connector gateway without exposing the access key secret to browser code.

## Available data

Through the Gong connector, your app can access the conversation data that the connected access key is allowed to read.

| **Data** | **Description** |
| :- | :- |
| Calls | Calls in a date range, with metadata such as title, time, and duration |
| Call details | Richer per-call data, including participants, topics, and tracker matches |
| Transcripts | Transcripts for the calls you request |
| Interaction stats | Activity and interaction statistics for calls and reps |
| Users | Gong users, individually or as a list |
| Workspaces | The Gong workspaces available to the connected account |

When prompting Lovable, mention what you need and over what period. For example:

```text wrap theme={null}
Use Gong to list all calls from last month with their participants and topics, then show them in a table I can filter by rep.
```

## Limitations

The Gong connector uses one shared credential pair and keeps requests behind Lovable's server-side gateway.

* Each connection uses one Gong access key, which authenticates as a single Gong company. The connector does not support per-end-user Gong login.
* The connected access key controls what data the app can read. Lovable cannot grant permissions that the key does not have.
* Lovable does not rotate Gong access keys automatically. To rotate a key, create a new key in Gong and update the Lovable connection.
* Calls must run through Lovable's server-side connector gateway. Do not call `api.gong.io` directly from browser code or expose the access key secret in generated app code.
* Gong returns results in pages of up to 100 records, so reads over long date ranges take several requests.
* Call media links that Gong returns expire, so your app should fetch them when needed instead of storing them.

## Troubleshooting

Use the Gong response status to identify credential, permission, and rate-limit problems.

* A `401` response usually means the access key or secret is wrong or has been revoked. Check that both values come from the same key pair, then create a replacement key in Gong and update the connection.
* A `403` response means the key does not have permission for that endpoint. Create or update a key with the required Gong permissions. Retrying the same request does not fix a missing permission.
* A `404` response on every request usually means the wrong API base URL. If your Gong account is on a regional cell, set **API base URL** on the connection to the value Gong shows on its API page.
* Gong applies rate limits, by default 3 calls per second and 10,000 calls per day. Cache repeated reads and honor `429` responses and the `Retry-After` header.
* Gong rejects bare dates. Send datetimes in ISO 8601 format with a timezone, for example `2026-01-01T00:00:00Z`.

## Manage your Gong connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Gong**, then open the connection.

* **Unlink projects** to remove Gong access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Gong stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
