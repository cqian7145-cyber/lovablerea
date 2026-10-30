# Connect your app to Ashby
<!-- source: https://docs.lovable.dev/integrations/ashby.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Ashby

> Connect your app to Ashby, a recruiting and applicant tracking system, to work with jobs, candidates, applications, and hiring workflows.

[Ashby](https://www.ashbyhq.com/) is a recruiting and applicant tracking system (ATS). The Ashby connector lets your Lovable app read jobs and interview data and manage candidates and applications through the Ashby API. It's designed for careers pages, internal recruiting tools, and hiring dashboards that need to stay in sync with the data your team already keeps in Ashby.

Ashby is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Ashby, your app can:

* List job postings and openings
* Search and view candidates and applications
* Create and update candidates and applications
* Read interview and pipeline data

What the connection can read or change depends on the permissions you grant the API key in Ashby.

## Common use cases and example apps

These examples show what you can build with Ashby, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Careers page** | *Use Ashby and build a careers page that lists our open jobs with title, location, and an apply link.* | **Publish open roles straight from your ATS.** The app reads job postings from Ashby so the page updates as soon as recruiters publish or close a role. |
| **Referral form** | *Use Ashby and build a referral form that creates a candidate in Ashby with the referrer's note.* | **Turn employee referrals into candidates.** The app creates the candidate in Ashby so recruiters see referrals in their normal pipeline. |
| **Recruiter lookup** | *Use Ashby and build a tool that searches candidates by email and shows their current stage.* | **Find a candidate's status in seconds.** The app searches Ashby by email and displays the matching applications and stages. |
| **Interview prep** | *Use Ashby and build a page that shows the upcoming interviews for a given application.* | **Give interviewers context in one place.** The app reads interview data from Ashby and lists who is interviewing whom and when. |
| **Pipeline dashboard** | *Use Ashby and build a dashboard that shows application counts by stage for each open role.* | **Track hiring progress at a glance.** The app reads applications from Ashby and groups them by stage and job. |

## How to connect Ashby

Who can create Ashby connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Ashby connections using different API keys, which is useful for separating environments (for example, development and production) or keys with different permissions.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Ashby, make sure you have:

* An Ashby account with permission to create API keys
* An Ashby API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All API requests made through this connector count toward your Ashby plan's API limits. Billing, quota, and feature availability are handled directly by Ashby, not Lovable.

### Step 1: Get an Ashby API key

An API key lets your Lovable app authenticate with the Ashby API. Ashby scopes each key with read and write permissions per module, so create the key with access to the data your app needs.

To create an Ashby API key:

**1. Open API keys in Ashby**

Sign in to Ashby and open the [API keys](https://app.ashbyhq.com/admin/api-keys) page in the admin area.

**2. Create a key**

Create a new key with a descriptive name, for example `Lovable integration`, and grant it read or write access only to the modules your app uses (for example, jobs, candidates, and applications).

**3. Copy the key**

Copy the key and store it securely. You'll paste it into Lovable in the next step.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly.

See the [Ashby API reference](https://developers.ashbyhq.com/reference) for details.

### Step 2: Connect Ashby to Lovable

You can create multiple connections using different API keys.

**1. Open Ashby in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Ashby**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Ashby Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste your Ashby API key.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Ashby API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Ashby (based on configured connection-level access). Your Lovable apps can then read and manage Ashby data through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which applies per-project request limits.

## Limitations

The Ashby connector cannot:

* Bypass the permissions of the API key. If Ashby returns a permission error, grant the missing module permission to the key in Ashby.
* Support per-end-user Ashby login. Each connection represents a single Ashby API key shared across all projects linked to it.

## Manage your Ashby connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Ashby**, then open the connection.

* **Unlink projects** to remove Ashby access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Ashby stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
