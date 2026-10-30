# Connect your app to Inngest
<!-- source: https://docs.lovable.dev/integrations/inngest.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Inngest

> Connect your app to Inngest to add background jobs, scheduled tasks, and durable workflows to your Lovable apps using your own Inngest account.

[Inngest](https://www.inngest.com/) is a workflow and background job platform that lets you run durable functions, scheduled tasks, and event-driven workflows. The Inngest app + chat connector lets your Lovable apps call Inngest from your workspace using a managed workspace-level connection.

Inngest is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

Each Inngest connection uses your own Inngest credentials. After it is connected, projects in your workspace can use the connection to trigger and manage background workflows through your Inngest account.

Use the Inngest connector when your app needs to run work outside of a user request, such as sending delayed notifications, processing data on a schedule, or orchestrating multi-step workflows with automatic retries.

Use another path when:

* You only need simple, one-off API calls that complete within a single request. In that case, a direct Supabase Edge Function may be sufficient.
* You need each end user to connect their own Inngest account separately. App + chat connectors are workspace-level, not per-end-user connections.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Scheduled report generator | *Run a function every Monday at 9am that generates a weekly summary and emails it to the team.* | Automate recurring tasks on a schedule without managing infrastructure. |
| Post-signup onboarding flow | *When a user signs up, send a welcome email immediately, then a follow-up email 3 days later.* | Orchestrate multi-step delayed workflows triggered by app events. |
| Data sync pipeline | *Every hour, pull new records from an external API and upsert them into the database.* | Run periodic background syncs that retry automatically on failure. |
| Processing pipeline | *When a user submits a description, create a base image, fan out to create multiple sizes, save them and email when done.* | Fan out heavy/slow/unreliable processing to improve speed and reliability. |

## How Inngest connections work

Each Inngest connection uses one Inngest Event Key and one Signing Key.

Within your Lovable workspace:

* You can create multiple Inngest connections.
* Each connection is a separate credential setup.
* Multiple projects can use the same connection.

This helps you separate environments, such as staging and production.

## How to connect Inngest

Workspace **admins** and **owners** can connect Inngest.

When a connection is created, Inngest becomes available across all projects in the workspace.

### Prerequisites

* **Connector roles:** workspace admins and owners can create and manage Inngest connections
* **Additional admin controls:** on Business and Enterprise plans, workspace admins and owners choose who can create connections per connector, as described in [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients)
* **Prerequisites:** an Inngest account with an Event Key and Signing Key
* **Recommended for production:** use separate Inngest environments for staging and production

> [!NOTE]
>
> Inngest usage and pricing are owned by your Inngest account. Charges for
> function runs are billed by Inngest, not by Lovable.

> [!WARNING]
>
> App + chat connector connections are workspace-level. Anyone in the workspace who
> can use connected projects can use the Inngest connection in those projects.

### Set up your Inngest connection

**1. Open the connector**

Open **Connectors** and select **Inngest**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a clear name, for example `Inngest Prod` or `Inngest Staging`.

**4. Enter credentials**

Paste your Inngest Event Key and Signing Key in the authentication fields. You can find these in the Inngest dashboard under **Settings -> Keys**.

**5. Create the connection**

Click **Create**.

**6. Use it in your app**

Prompt Lovable to add background jobs or scheduled workflows that use Inngest, then test by triggering an event and checking the Inngest dashboard for function runs.

## FAQ

> **Do I need an Inngest account to use this connector?**
>
> Yes. You need your own Inngest account and API keys to create an Inngest
> connection in Lovable.

> **Who pays for function runs with this connector?**
>
> Function runs through this connector are billed by Inngest, based on your
> Inngest plan and usage.

> **Can I create multiple Inngest connections?**
>
> Yes. You can create multiple connections, for example to separate staging
> and production environments.

> **Can end users connect their own Inngest accounts inside my app?**
>
> Not through this app + chat connector flow. App + chat connectors are configured at
> workspace level.

> **What should I check first if functions are not running?**
>
> Verify your Event Key and Signing Key, confirm the function is registered in
> the Inngest dashboard, and check the Inngest function logs for errors or
> failed runs.

> **Can I use Inngest for cron-style scheduled tasks?**
>
> Yes. Inngest supports cron expressions for scheduling functions on recurring
> intervals, such as every hour or every weekday at a specific time.

## Limitations

* An Inngest app + chat connector is a workspace-level credential, not a per-user connection flow.
* Functions are managed and monitored through the Inngest dashboard, not within Lovable.
* If a connected project stops triggering events after connector changes, open the connection and confirm it is still linked to the project.

## Manage your Inngest connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Inngest**, then open the connection.

* **Unlink projects** to remove Inngest access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Inngest stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
