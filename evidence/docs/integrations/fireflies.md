# Connect your app to Fireflies
<!-- source: https://docs.lovable.dev/integrations/fireflies.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Fireflies

> Connect your app to Fireflies to access meeting transcripts, summaries, and conversation insights.

[Fireflies.ai](https://fireflies.ai/) records, transcribes, and summarizes meetings across Zoom, Google Meet, Microsoft Teams, and other platforms. The Fireflies connector enables meeting data integration for your app, allowing you to surface transcripts, search conversations, and display action items directly in your app.

Fireflies is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Fireflies, your app can:

* Retrieve meeting transcripts, AI summaries, and speaker-attributed content
* Search and analyze conversations across your organization
* Build workflows on top of meeting intelligence
* Sync notes and action items into your product

Fireflies is a good fit when your app needs access to meeting content, conversation history, or spoken interaction data rather than manually entered notes.

## Common use cases and example apps

| **Example app** | **Example prompt** | **Description** |
| :- | :- | :- |
| Meeting dashboard | *Build a dashboard that shows my recent meetings from Fireflies with titles, dates, participants, and durations.* | **Display meeting activity in a central view.** The app pulls recent transcripts, shows key metadata, and lets users browse meeting history without leaving the app. |
| Sales call intelligence | *Build a sales call review tool. Show a list of recent calls with AI summaries, key topics, and action items from Fireflies.* | **Surface conversation insights from sales calls.** The app retrieves transcripts and summaries, highlights keywords and action items, and helps sales teams review calls efficiently. |
| CRM enrichment | *After a call, pull the Fireflies summary and next steps into our CRM notes.* | **Turn conversations into structured follow-ups.** The app retrieves AI summaries and action items from recent calls and writes them into a CRM-style view. |
| Action item tracker | *Build a task board that pulls action items from Fireflies meeting summaries and lets users mark them as done.* | **Turn meeting outcomes into trackable tasks.** The app extracts action items from AI summaries and displays them in a structured format so teams can follow up. |
| Team meeting digest | *Build a weekly digest that summarizes all team meetings from Fireflies and displays them in a feed.* | **Compile meeting summaries into a recurring digest.** The app aggregates recent transcripts, extracts highlights and decisions, and presents them in a scannable format. |
| Searchable transcript archive | *Build a search interface where users can search across all Fireflies transcripts by keyword, date, or participant.* | **Create a structured search experience for meeting transcripts.** The app lets users find past discussions, filter by speaker or date, and jump to relevant sections. |
| Support handoff | *Given a ticket, find related meeting context from Fireflies.* | **Speed up resolution when calls explain the issue.** The app matches tickets to relevant transcripts so support agents can see what was discussed. |

## How to connect Fireflies

Workspace **admins** and **owners** can connect Fireflies.

You can create multiple Fireflies connections using different API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

When the connection is created, Fireflies can be linked to any project in the workspace.

### Prerequisites

* A [Fireflies.ai](http://Fireflies.ai) account and API key
  > [!NOTE]
  >
  > All API usage consumes Fireflies API quota based on your Fireflies plan, and billing is handled directly by Fireflies, not Lovable.
* Lovable workspace admin or owner role

### Step 1: Create a Fireflies API key

An API key lets you connect to the Fireflies API and access your organization's meeting data.

1. Sign in to [Fireflies](https://app.fireflies.ai/).
2. Open [Developer settings (Fireflies API)](https://app.fireflies.ai/settings/developer-settings).
3. Copy the generated API key and store it securely.
   > [!NOTE]
   >
   > Your API key functions like a password. Keep it secure and never share it publicly. You’ll need it in the next step.

### Step 2: Connect Fireflies in Lovable

You can create multiple connections using different API keys.

1. Open **Connectors** and select **Fireflies**.
2. Click **Connect** on the connector page.
3. Enter a **Display name** (for example `Fireflies Production`).
4. Paste the **API key**.
5. Click **Connect** at the bottom of the form.

Lovable will verify your API key by making a test request to the Fireflies API. If the key is valid, the connection is saved.

When connected, your Lovable apps can start accessing meeting transcripts and conversation data from Fireflies.

## Available data

Through the Fireflies connector, your app can access the following meeting data:

| **Data** | **Description** |
| :- | :- |
| Transcripts | Full meeting transcripts with sentence-level detail |
| AI summaries | Keywords, action items, outlines, and overviews generated by Fireflies |
| Participants | List of meeting participant emails |
| Speakers | Speaker identification and attribution within transcripts |
| Meeting metadata | Title, duration, date, calendar type, and conferencing link |
| Transcript URL | Direct link to view the meeting in the Fireflies dashboard |

For the full list of available queries and fields, see the [Fireflies GraphQL API documentation](https://docs.fireflies.ai/graphql-api) and the [API quickstart](https://docs.fireflies.ai/getting-started/quickstart).

> [!TIP]
>
> Fireflies returns transcripts and summaries in markdown format. Use a React markdown rendering library (such as `react-markdown`) for proper display instead of rendering raw markdown strings.

## Limitations

The Fireflies connector cannot:

* Create, modify, or delete meetings or transcripts (read-only access)
* Receive incoming events or webhooks from Fireflies
* Access data beyond your Fireflies organization's scope
* Support per-user Fireflies login (each end user connecting their own Fireflies account)

Each connection represents one Fireflies API key. The API returns data that your Fireflies workspace and key are allowed to access. Keep this in mind when building user-facing features.

Fireflies enforces API rate limits that vary by plan. Free and pro plans allow approximately 50 requests per day. If your app makes frequent calls, consider caching responses to stay within these limits.

Lovable gateway limits also apply. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details.

## Manage your Fireflies connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Fireflies**, then open the connection.

* **Unlink projects** to remove Fireflies access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Fireflies stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
