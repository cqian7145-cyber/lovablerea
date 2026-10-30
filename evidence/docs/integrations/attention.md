# Connect your app to Attention
<!-- source: https://docs.lovable.dev/integrations/attention.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Attention

> Connect your app to Attention, a sales conversation intelligence platform, to read meeting transcripts and scorecards, write back snippets and QA results, and ask natural-language questions across your sales conversations.

[Attention](https://www.attention.com/) is a sales conversation intelligence and coaching platform that records, transcribes, and analyzes customer-facing meetings. The Attention connector lets your Lovable app read conversations, transcripts, and scorecards from Attention, and write back snippets, scorecard results, and conversation updates, so you can build dashboards, briefings, coaching tools, and QA workflows on top of your sales motion.

Attention is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Attention, your app can:

* List and retrieve sales conversations and meeting metadata
* Read full meeting transcripts, participants, and timing details
* Surface scorecards, insights, and coaching signals from the Attention API
* Update, archive, or import conversations, and create snippets and scorecard results
* Ask natural-language questions across your conversation history with Attention's semantic AI endpoint
* Pull and manage organization, team, and user data
* Combine conversation data with the rest of your app's content (CRM views, internal tools, AI summaries)

The Attention connector is a good fit when your sales team already runs on Attention and you want to give the rest of the company a tailored window into the conversations happening there.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Deal-room conversation viewer** | *Use Attention and build a deal-room view that lists recent conversations for an account, with transcripts, participants, and durations.* | **Bring meeting context next to the deal.** The app fetches conversations from Attention, filters by account or owner, and renders transcripts and participant lists alongside whatever deal info your team already tracks. |
| **Weekly sales briefing app** | *Use Attention and build a weekly briefing that summarizes last week's customer calls and emails it to the team.* | **Turn raw conversations into a leadership-ready digest.** The app pulls the last seven days of conversations, summarizes themes and risks, and produces a recurring digest the team can scan in minutes. |
| **Coaching and scorecard dashboard** | *Use Attention and build a coaching dashboard that shows scorecard results and trends per rep.* | **Make coaching signals legible across the team.** The app reads scorecards and conversation metadata from Attention and presents trends per rep, so managers can spot what to coach on next. |
| **Ask-your-calls chatbot** | *Use Attention and build a chatbot that answers questions about our sales calls, like "what objections came up about pricing last month?"* | **Query meetings in plain English** The app uses Attention's Ask Attention endpoint to run semantic queries across conversations and returns grounded answers with source calls. |
| **Auto-tagging and QA tool** | *Use Attention and build a tool that submits scorecard results and updates conversations after an external QA review.* | **Push structured QA back into Attention.** The app reads conversations, lets reviewers score them in a custom UI, then writes scorecard results and updates conversation metadata back via the Attention API. |
| **Onboarding library for new reps** | *Use Attention and build an onboarding library of best-of calls grouped by deal stage.* | **Curate calls into a learning experience.** The app pulls selected conversations from Attention and organizes them by stage or topic so new reps can ramp by listening to real customer calls. |
| **Risk and pipeline review app** | *Use Attention and build a pipeline review that flags deals where recent calls mention risk language.* | **Surface risk signals from conversations.** The app combines conversation transcripts and scorecards to highlight deals that need attention before the next forecast call. |
| **Internal "voice of the customer" feed** | *Use Attention and build an internal feed of customer quotes pulled from recent meetings.* | **Distribute the voice of the customer across the company.** The app surfaces highlights from Attention conversations as a feed product, support, and design teams can browse. |

## How to connect Attention

Workspace **admins** and **owners** can connect Attention.

You can create multiple Attention connections using different API keys. This is useful for separating environments (for example, development and production), isolating access for specific apps, or managing usage limits independently.

When the connection is created, Attention can be linked to any project in the workspace. Multiple projects can use the same connection.

### Prerequisites

Before connecting Attention, make sure you have:

* An Attention account with admin role permissions in your organization
* An Attention API key
* Lovable workspace owner or admin role

> [!NOTE]
>
> All API requests made through this connector use your Attention API key. Usage counts toward your Attention plan limits and billing is handled directly by Attention, not Lovable.

### Step 1: Create an Attention API key

An **Attention API key** is an organization-level Bearer token that lets your Lovable app authenticate against Attention's v2 API. You must have **Admin** role permissions in Attention to create and manage organization-level API keys.

To create an Attention API key:

**1. Log in to Attention**

Go to [app.attention.tech](https://app.attention.tech) and sign in with Google, SSO, or your email and password.

**2. Open settings**

Click your profile avatar in the top-left corner and select **Settings** from the dropdown menu.

**3. Navigate to API keys**

In the sidebar, under the **Organization** section, select **API Keys**.

**4. Create a new API key**

Click **+ Create API Key** in the top-right corner and give the key a descriptive name, for example `Lovable integration`.

**5. Copy and store the key**

After creation, an **API Key Created** modal will appear showing your key once. Copy the key and store it securely. Attention will not show it again.

> [!NOTE]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Attention's docs for detailed instructions: [API authentication](https://docs.attention.com/api-authentication).

### Step 2: Connect Attention to Lovable

You can create multiple connections using different API keys.

To connect Attention:

**1. Open Attention in Connectors**

Go to **Connectors** and select **Attention**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: Name the connection, for example `Attention Prod`.
2. **API key**: Paste your Attention API key.
3. **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**4. Connect**

Click **Connect** at the bottom of the form. Lovable validates the key against Attention before saving the connection. If the key is invalid or has been revoked, the connection will fail and you can paste a new one.

When connected, your Lovable apps can start reading from and writing to conversations, transcripts, and related data from Attention.

> [!WARNING]
>
> Attention API keys inherit the permissions of the Admin who creates them, there is no per-key scope picker.
>
> Any Lovable app linked to a connection can read **and write** any data the key has access to in Attention, including updating or archiving conversations, creating or deleting users, and managing teams. Only link the connection to projects that should have that level of access.

## Working with conversation data

The Attention API returns rich conversation objects that include metadata, participants, and full transcripts, and supports updating, archiving, and importing conversations. When prompting Lovable, be specific about what you want.

Conversations include sensitive customer information. Plan how the data is displayed in your app and who can see it before sharing the app broadly inside your company.

## Limitations

The Attention connector cannot:

* Receive Attention webhooks or real-time conversation events (poll the API on a schedule instead)
* Support per-end-user Attention login (each end user connecting their own Attention account). All requests use the workspace API key, so every end user of your Lovable app sees the same Attention data.

Attention enforces rate limits on its API. If you build apps that paginate through many conversations or run frequent background jobs, expect occasional `429 Too Many Requests` responses and add retry-with-backoff in your edge functions.

If a request fails because the API key has been revoked or rotated in Attention, you'll need to generate a new key and reconnect. There is no automatic refresh for API keys.

## Manage your Attention connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Attention**, then open the connection.

* **Unlink projects** to remove Attention access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Attention stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Salesforce](https://docs.lovable.dev/integrations/salesforce.md)
- [Connect your app to Chargebee](https://docs.lovable.dev/integrations/chargebee.md)
- [Connect your app to Twilio](https://docs.lovable.dev/integrations/twilio.md)
- [Connect your app to Lightspeed](https://docs.lovable.dev/integrations/lightspeed.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
