# Connect your app to Granola
<!-- source: https://docs.lovable.dev/integrations/granola.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Granola

> Connect your app to Granola, an AI meeting notes platform, to bring meeting notes, AI summaries, and transcripts from your Granola workspace into your Lovable apps.

[Granola](https://www.granola.ai/) creates AI-generated meeting notes, summaries, and transcripts. The Granola app + chat connector lets your Lovable app read meeting context from your Granola workspace using a managed workspace-level connection, so the decisions, requirements, and follow-ups from a meeting flow straight into the product you're building.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Granola connection in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable read your own Granola account as context while you build, personal to you |

With Granola, your app can:

* Retrieve AI-generated meeting notes and summaries
* Access full meeting transcripts on demand
* Build workflows around meeting intelligence
* Sync action items and notes into your product

Granola is a good fit when your app needs to work with meeting context, follow-ups, or past decisions captured in Granola.

## Common use cases and example apps

| **Example app** | **Example prompt** | **Description** |
| :- | :- | :- |
| **Customer call to product change** | *Use Granola and build the onboarding flow Lisa described in our call yesterday. Pull the notes from Granola.* | **Turn discovery-call decisions into working code the same day.** The app pulls the relevant Granola note, extracts the requested changes, and applies them to the product. |
| **Sprint planning to prototype** | *Use Granola and create the dashboard layout we agreed on in standup this morning.* | **Build from what was actually agreed in a meeting, not from memory.** The app pulls the standup note from Granola and turns the agreed scope into a first-pass prototype. |
| **Client feedback to build** | *Use Granola and implement the navigation changes from the design crit we just had with the client.* | **Move client feedback from a meeting straight into the build.** The app reads the crit notes, identifies the requested changes, and applies them without a separate spec doc. |
| **Action item tracker** | *Use Granola to pull action items from recent meeting notes and turn them into a task board.* | **Turn meeting follow-ups into trackable work.** The app reads Granola summaries and organizes follow-up items so teams can assign, review, and complete them. |
| **Customer call archive** | *Use Granola and build a customer meeting archive with search by account, date, and topic.* | **Make customer conversations easier to find.** The app pulls transcripts and summaries from Granola so customer-facing teams can review prior calls without searching manually. |
| **Product decision log** | *Use Granola to find product decisions from recent meeting notes and show them in a decision log with links to the source note.* | **Preserve meeting decisions in a structured format.** The app extracts relevant summaries and lets teams browse past decisions with source context. |
| **Weekly meeting digest** | *Use Granola and create a weekly digest that summarizes key topics, decisions, and next steps from recent meetings.* | **Summarize multiple meetings into one review flow.** The app retrieves recent Granola notes and turns them into a concise recurring digest. |
| **CRM note sync** | *Use Granola so that after a customer call, the Granola summary and transcript appear in the account timeline.* | **Keep customer records aligned with meeting context.** The app uses Granola meeting data to enrich CRM-style records with notes, summaries, and next steps. |

## How Granola connections work

Each Granola connection uses one Granola API key. The data available to your app depends on the API key type and the permissions of the Granola account or workspace behind that key.

Granola supports two API key types:

| **API key type** | **Who can create it** | **Granola plan required** | **What it can access** |
| :- | :- | :- | :- |
| Personal API key (Beta) | Any Granola workspace member | Granola Business or Enterprise | Notes you own, notes directly shared with you, and notes in private folders shared with you |
| Enterprise API key | Granola workspace admin | Granola Enterprise | All notes in the Team space |

## How to connect Granola

Workspace **admins** and **owners** can connect Granola.

You can create multiple Granola connections using different API keys. This makes it easy to create separate connections for API keys with different Granola access scopes, for example one connection for personal notes and another for the full Team space.

When the connection is created, Granola can be linked to any project in the workspace. Multiple projects can use the same connection.

### Prerequisites

Before connecting Granola, make sure you have:

* A Granola workspace on a plan that supports the API key type you want to use
* A Granola API key
* Lovable workspace admin or owner role

> [!NOTE]
>
> All API requests made through this connector use your Granola API key. API usage counts toward your Granola plan limits and billing is handled directly by Granola, not Lovable.

### Step 1: Create a Granola API key

A Granola API key lets your Lovable app authenticate with Granola and read your meeting notes, summaries, and transcripts. Granola API keys are created in the Granola desktop app.

To create a Granola API key:

1. Open the **Granola desktop app** and click on your workspace name.
2. Go to **Settings → Connectors → API**.
3. Click **Create new key**.
4. Choose a key type if Granola prompts you.
5. Click **Generate API Key**.
6. Copy the generated key and store it securely.

> [!NOTE]
>
> Your Granola API key functions like a password. Keep it secure, do not share it publicly. You’ll need it in the next step.

See Granola documentation for detailed instructions: [Granola API documentation](https://docs.granola.ai/introduction).

### Step 2: Connect Granola in Lovable

You can create multiple connections using different Granola API keys.

1. Open **Connectors** and select **Granola**.
2. Click **Connect** on the connector page.
3. **Display name**: Name the connection, for example `Granola Team Notes`.
4. **API key**: Enter your **Granola API key** (`grn_xxxxxxxx…`).
5. **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.
6. Click **Connect** at the bottom of the form.

When connected, your Lovable apps can start accessing Granola meeting notes, summaries, and transcripts.

## Available data

Through the Granola connector, your app can access meeting data that the connected API key is allowed to read.

| **Data** | **Description** |
| :- | :- |
| Notes | Meeting notes available to the connected Granola API key |
| AI summaries | Granola-generated summaries for processed meetings |
| Transcripts | Full meeting transcripts when requested |
| Owners | The note owner name and email when provided by Granola |
| Meeting metadata | Fields returned by the Granola API, such as note IDs and titles |

When prompting Lovable, mention what you need. For example, "list my last 10 meetings with their summaries", or "fetch the transcript for the most recent customer call".

## **Limitations**

The Granola connector cannot:

* Create, update, or delete Granola notes (read-only access)
* Return notes that have not finished processing. Granola only returns notes that have a generated AI summary and transcript. Unprocessed notes are excluded from the list.
* Support per-end-user Granola login (each end user connecting their own Granola account)
* Exceed Granola's API rate limits. Granola API rate limits apply to requests made through the connector.
* Lovable gateway limits also apply. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details.

Each connection represents one Granola API key. It can only access the notes allowed by that API key type and the connected Granola account or workspace.

## Manage your Granola connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Granola**, then open the connection.

* **Unlink projects** to remove Granola access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Granola stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
