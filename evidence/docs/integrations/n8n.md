# Connect your app to n8n
<!-- source: https://docs.lovable.dev/integrations/n8n.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to n8n

> Connect your app to n8n, a workflow automation tool, to list workflows, read executions, and trigger webhooks from your Lovable app.

[n8n](https://n8n.io/) is a workflow automation tool. The n8n connector lets your Lovable app list workflows, read executions, trigger webhooks, and publish or unpublish workflows on one n8n Cloud or self-hosted instance. It's designed for apps that start, inspect, or control workflows you already run in n8n.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | List workflows, read executions, trigger webhooks, and publish workflows from one shared n8n instance in the project chat and in your published apps |
| [Chat connector (MCP server)](https://docs.lovable.dev/integrations/chat-connectors.md) | Let Lovable call your n8n workflows as tools while you build, personal to you |

With n8n, your app can:

* List workflows and see which ones are published
* Read recent executions for a workflow
* Start a workflow by calling its production webhook
* Publish or unpublish a workflow

It's a good fit for internal consoles, intake forms, and status pages that reuse an existing workflow instead of rebuilding that workflow in the app.

## Common use cases and example apps

These examples show what you can build with n8n, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Workflow directory** | *Use n8n and build an internal page that lists our workflows and whether each one is published.* | **See every workflow in one place.** The app lists workflows from your n8n instance and shows which ones are published. |
| **Execution log** | *Use n8n and build a page that shows recent runs for a workflow we pick, including status and time.* | **Review what a workflow did without opening n8n.** The app lists executions for the selected workflow and shows status and time. |
| **Intake form** | *Use n8n and build a form that sends each submission to our lead-intake webhook.* | **Start an existing workflow from a form.** The app posts the submission to the production webhook on that workflow. |
| **Publish controls** | *Use n8n and build an admin page where we can publish or unpublish a named workflow.* | **Change whether a workflow is published from the app.** The app publishes or unpublishes the workflow you choose. |
| **Failure inbox** | *Use n8n and build a page that lists failed executions from the last day.* | **Catch failed runs in the app.** The app reads recent executions and shows the ones that failed. |
| **Customer onboarding** | *Use n8n and build a signup page that starts our onboarding workflow after the account is created.* | **Hand a new customer to a workflow you already maintain.** The app calls the onboarding webhook with the new account details. |

## How to connect n8n

Who can create n8n connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple n8n connections using different instances or API keys, which is useful for separating environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting n8n, make sure you have:

* An n8n Cloud workspace on a paid plan, or a self-hosted n8n instance. The n8n API is not available during the n8n Cloud free trial.
* An instance URL that uses HTTPS and is reachable on the public internet. Lovable calls your instance through the [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors). If a firewall allows traffic only from specific addresses, allowlist the [gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting).
* An n8n API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Workflow runs and API calls through this connector use your n8n instance. Billing is handled directly by n8n, not Lovable. On a self-hosted instance, you pay for the host yourself.

### Step 1: Get an n8n API key

An n8n API key lets Lovable list workflows on your instance and confirm the connection.

To create an n8n API key:

**1. Open your n8n instance**

Sign in to your n8n Cloud workspace or your self-hosted instance.

**2. Open n8n API settings**

Go to **Settings → n8n API**.

**3. Create an API key**

Select **Create an API key**. Choose a **Label**, for example `Lovable`, and set an **Expiration time**.

On an Enterprise plan, n8n asks you to choose **Scopes**. Include `workflow:list` so Lovable can verify the key. Also include `workflow:read`, `execution:list`, `execution:read`, and `workflow:activate` when your app lists workflows, reads executions, or publishes workflows. On other plans, the key can access the whole account, and n8n does not ask for scopes.

**4. Copy the key**

Copy **My API key** and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See n8n documentation for more: [Authentication](https://docs.n8n.io/api/authentication/).

### Step 2: Connect n8n to Lovable

Open the connection form and enter the instance URL and API key from Step 1.

**1. Open n8n in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **n8n**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **Instance URL**: the HTTPS URL of your n8n instance. For n8n Cloud, this looks like `https://your-workspace.app.n8n.cloud`. For a self-hosted instance served under a path, include the path, for example `https://ops.example.com/n8n`.
2. **API key**: the key from Step 1.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone you add uses the same n8n instance and the same API key.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the API key against your n8n instance before saving the connection.

If Lovable reports that no n8n API answered at this URL, the instance URL does not point at the n8n instance. Confirm the workspace is past the free trial, and that an Enterprise key includes `workflow:list`.

When connected, anyone building in a project can ask Lovable in chat to link their project to n8n (based on configured connection-level access). Your Lovable apps can then list workflows, read executions, trigger webhooks, and publish or unpublish workflows.

If the API key expires or you delete it in n8n, create a new key under **Settings → n8n API**. Open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Trigger a workflow

Listing workflows, reading executions, and publishing a workflow use the API key on the connection. Starting a workflow does not.

A published workflow exposes a production URL under `/webhook/`. While you test that workflow in the n8n editor, the same Webhook node uses `/webhook-test/`. Copy the path from the Webhook node. Lovable does not send the connection's API key to those URLs. Authentication is whatever you set on the Webhook node.

## Limitations

The n8n app + chat connector documented on this page cannot:

* Reach an instance on a private network or over plain HTTP. The instance URL must use HTTPS and be reachable on the public internet.
* Support per-end-user n8n login. Each connection represents a single n8n API key shared across all projects linked to it.

## Manage your n8n connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **n8n**, then open the connection.

* **Unlink projects** to remove n8n access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use n8n stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
