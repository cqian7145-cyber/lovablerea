# Lovable MCP server
<!-- source: https://docs.lovable.dev/integrations/lovable-mcp-server.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable MCP server

> Connect AI agents and developer tools to Lovable using the Model Context Protocol. Build, iterate, and deploy apps programmatically.

## What is the Lovable MCP server?

Lovable exposes itself as a [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server at `https://mcp.lovable.dev`. This lets an AI client manage your Lovable projects through natural language.

When connected, your AI agent can create projects, send messages to Lovable, inspect code, deploy apps, and more, all without leaving the client you're already working in. The Lovable MCP server is available on all plans.

> [!NOTE]
>
> This is different from [chat connectors (MCP servers)](https://docs.lovable.dev/integrations/chat-connectors.md), which let the Lovable agent connect to your tools. The Lovable MCP server lets external agents connect to Lovable.

The MCP server is one of the ways to use Lovable programmatically, each from a different place:

| Feature | Where it runs | What it does |
| - | - | - |
| **Lovable MCP server** (this page) | An AI client such as ChatGPT, Claude, or Cursor | External AI tools create, edit, and manage your Lovable projects |
| [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md) | Your own scripts and services, with an API key you store and manage | Anything outside Lovable calls the REST API directly |
| [Lovable API connector](https://docs.lovable.dev/integrations/lovable-api-connector.md) | An app you build with Lovable, with the API key stored by Lovable | Your app reads and manages a connected Lovable workspace |

### What MCP is

MCP (Model Context Protocol) is an open standard that lets AI agents discover and call external tools. When an agent connects to an MCP server, it can see what tools are available and decide when to use them. Lovable's MCP server makes Lovable one of those tools: findable, invokable, and composable.

### Supported AI clients

Lovable provides setup steps for these clients:

* **ChatGPT**
* **Claude** (Claude Desktop on macOS and Windows, and claude.ai)
* **Claude Code**
* **Cursor**
* **VS Code**

Other MCP clients can also connect if they support OAuth, the login method the Lovable MCP server uses. A client that runs on your computer and completes login at a local address (`localhost` or `127.0.0.1`) needs no approval from Lovable. It registers with Lovable automatically when you add `https://mcp.lovable.dev` and log in with your Lovable account.

An MCP client without a preconfigured Lovable connection can use a [custom OAuth client](https://docs.lovable.dev/features/oauth-clients.md) if it supports custom OAuth credentials. Register its callback URL, then configure it with the client ID and secret. Each user signs in to Lovable and authorizes the client to act on their behalf. Workspace **owners and admins on all plans** can register OAuth clients. Adding the sensitive project and workspace scopes used by MCP tools requires **Business or Enterprise**.

Hosted clients that rely on automatic registration still need Lovable to approve their web callback address. If that flow fails, ask the provider to contact [Lovable support](https://lovable.dev/support) to request approval, or contact support yourself.

The rest of this page refers to these apps as "the client" or "your client."

### The flow

1. An agent connects to the Lovable MCP server
2. The agent calls a tool (for example, `create_project`) with a description of what to build
3. Lovable builds the project and returns a preview URL
4. You can open the preview, review what was built, and continue iterating by sending more messages
5. The agent keeps building as you refine, adding features, fixing issues, and changing the design
6. When you're happy with it, publish with `deploy_project`. Or don't, publishing is always optional.

## Who this is for

* **Developers using an AI client or editor such as ChatGPT, Claude Code, Cursor, or VS Code** who want to create and iterate on Lovable projects without leaving it
* **Teams** who want Lovable as a step in a larger agent flow: generate content, scaffold a UI, deploy it, and hand off the URL

## Why use the Lovable MCP server

* **Agent-driven development:** Let your client scaffold and iterate on Lovable projects using natural language.
* **Code inspection:** Read project files, diff changes, and browse edit history programmatically.
* **Cross-tool workflows:** Combine Lovable with other MCP-connected tools in a single agent session.

## Common use cases

| Scenario | Example prompt to your agent | Outcome |
| - | - | - |
| Scaffold a new app | *Create a Lovable project called 'Feedback Hub' with a form for collecting user feedback* | Project created and first build completed |
| Iterate on an existing project | *Add a dark mode toggle to my project \[ID]* | Agent sends message and waits for Lovable to finish |
| Review recent changes | *Show me what changed in the last three edits to my project* | Unified diff of recent commits |
| Deploy an app | *Deploy my project \[ID] and give me the live URL* | Project published; live URL returned |
| Inspect the codebase | *List all files in my project and read the main App.tsx* | File tree and file content returned |
| Compare multiple variants | *Build 3 versions of a landing page for \[product], each with a different layout and visual style. Deploy all three and give me the live URLs.* | Three deployed projects with live URLs to compare |

## Prerequisites

* A Lovable account on any plan.
* Third-party MCP client access enabled for your workspace, which allows external clients to connect to the Lovable MCP server
  * Enabled by default on Free, Pro, and Business workspaces
  * Disabled by default on Enterprise workspaces. On Enterprise, a workspace admin or owner can enable it in **Workspace settings → Security → Privacy & security**, under [**Third-party MCP clients**](https://docs.lovable.dev/features/privacy-and-security-settings.md#third-party-mcp-clients)
* An MCP client installed, such as one of the [supported AI clients](#supported-ai-clients)

## Before you connect

> [!WARNING]
>
> When you connect a client to the Lovable MCP server, it can act on your account within the scopes you authorize. A few things to know before connecting:
>
> * **Access can span projects and workspaces.** The connection is not restricted to one project. Review the requested scopes before authorizing it. Calls remain subject to the OAuth scopes you grant and your existing Lovable access.
> * **Calls run live on your account.** Tool calls use real credits and edit real projects.
> * **`deploy_project` deploys the app and returns a live URL.** On Free and Pro plans, anyone with the link can reach the app unless its website access is set to **Invite only**. On Business and Enterprise plans, website access follows the workspace default. The URL may be restricted to workspace members only if internal publishing is configured.
> * **`query_database` runs SQL with your full database permissions.** Read, write, and schema changes.

## How to connect

> [!NOTE]
>
> On Lovable **Business and Enterprise**, an admin can enable [enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md) so that members use Lovable from Claude through Okta without a separate Lovable sign-in. Claude requires a **Team or Enterprise** plan.

The steps below connect your own Lovable account using OAuth. When you connect for the first time, your client opens a browser window to authenticate with your Lovable account and authorize access.

> [!NOTE]
>
> Workspace admins and owners can also find everything on this page inside Lovable: **Workspace settings → Build & deploy → MCP server** shows the server URL, setup steps for common clients, and a **Manage access** shortcut to the workspace's [**Third-party MCP clients** setting](https://docs.lovable.dev/features/privacy-and-security-settings.md#third-party-mcp-clients).

Pick your client below.

> **ChatGPT**
>
> Add the Lovable MCP server in ChatGPT using this URL:
>
> ```text theme={null}
> https://mcp.lovable.dev
> ```
>
> ChatGPT prompts you to authenticate via OAuth when you connect.

> **Claude**
>
> Add Lovable through Claude's connector settings. Works in Claude Desktop (macOS and Windows) and on [claude.ai](https://claude.ai).
>
> **1. Open the connector picker**
>
> In Claude, click the **+** sign.
>
> **2. Browse connectors**
>
> Click **Connectors** → **Browse Connectors**, then search for **Lovable**.
>
> **3. Connect and authenticate**
>
> Click **Connect**, then log in to Lovable when Claude prompts you.
>
> The Lovable tools appear in the composer's tool menu once authentication is complete.

> **Claude Code**
>
> Run this command in your terminal:
>
> ```bash theme={null}
> claude mcp add --transport http lovable "https://mcp.lovable.dev"
> ```
>
> Alternatively, install the Lovable plugin, which also adds slash commands for common tasks:
>
> ```bash theme={null}
> /plugin install lovable@claude-plugins-official
> ```
>
> The first time a Lovable tool runs, Claude Code opens a browser window to log in to Lovable.
>
> Verify with `/mcp` (look for the `lovable` server) or ask Claude Code to "list my Lovable workspaces."

> **Claude Desktop (config file)**
>
> If you prefer editing the config directly, add the following to your MCP configuration:
>
> * **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
> * **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
>
> ```json theme={null}
> {
>   "mcpServers": {
>     "lovable": {
>       "type": "http",
>       "url": "https://mcp.lovable.dev"
>     }
>   }
> }
> ```
>
> > [!NOTE]
> >
> > If your config file already has an `mcpServers` object with other servers in it, add the `"lovable"` entry **inside** the existing object. Don't paste a second `mcpServers` block, the file won't be valid JSON.
>
> Restart Claude Desktop after saving. The Lovable tools will appear in your agent's tool list.

> **Cursor**
>
> Install the **Lovable** plugin in Cursor for a guided setup that connects the MCP server for you and adds slash commands for common tasks: `/lovable-new`, `/lovable-iterate`, `/lovable-db`, and `/lovable-deploy`. Log in with your Lovable account when prompted on the first tool call.
>
> To connect the server manually instead, add the following to your MCP configuration (`~/.cursor/mcp.json` globally, or `.cursor/mcp.json` in your project root):
>
> ```json theme={null}
> {
>   "mcpServers": {
>     "lovable": {
>       "type": "http",
>       "url": "https://mcp.lovable.dev",
>       "auth": {
>         "CLIENT_ID": "6d465f583e1e4ce5801b1616f735670c"
>       }
>     }
>   }
> }
> ```
>
> > [!NOTE]
> >
> > If your `mcp.json` already has an `mcpServers` object with other servers in it, add the `"lovable"` entry **inside** the existing object. Don't paste a second `mcpServers` block, the file won't be valid JSON.
>
> Reload your Cursor window after saving.

> **VS Code**
>
> Add the Lovable MCP server through VS Code's MCP settings, or add the following to your MCP configuration file:
>
> ```json theme={null}
> {
>   "servers": {
>     "lovable": {
>       "type": "http",
>       "url": "https://mcp.lovable.dev"
>     }
>   }
> }
> ```
>
> VS Code prompts you to authenticate via OAuth in your browser.

## Available tools

The Lovable MCP server exposes the following tools. Tool calls run with your Lovable account's permissions and operate on your real projects.

> [!NOTE]
>
> A machine-readable version of this reference, including tool parameters, lives at [mcp.lovable.dev/skill.md](https://mcp.lovable.dev/skill.md). It is maintained alongside the server, so it always matches the tools the server currently exposes. The skill, the Claude Code plugin, and client setup guides are open source in the [lovablelabs/mcp](https://github.com/lovablelabs/mcp) repository.

### Identity and workspaces

| Tool | Description |
| - | - |
| `get_me` | Get the authenticated user's profile and workspaces |
| `list_workspaces` | List all workspaces you belong to |
| `get_workspace` | Get workspace details, including plan, credit balance, member count, and settings |

### Projects

| Tool | Description |
| - | - |
| `list_projects` | Search and list projects in a workspace, with filtering and full-text search |
| `get_project` | Get project details, including editor URL, preview URL, and a screenshot of the current state |
| `create_project` | Create a new project with an `initial_message` (the build prompt) to the agent. Optionally start from a template or a design system |
| `deploy_project` | Publish a project to production hosting on `lovable.app` and get the live URL |
| `remix_project` | Make a copy of an existing project into a workspace. The source project must be accessible to your workspace (your own workspace projects, templates, or projects with public remixing enabled) |
| `set_project_visibility` | Set who can access the **project in the editor**, matching the share dialog options: `private` (your workspace audience with **Can edit**, default), `workspace_view` (your workspace audience with **Can view**, requires Business or Enterprise), or `draft` (**Restricted**, only people invited to the project, requires Business or Enterprise). Controls editor access only, not who can visit the published app |
| `set_folder_visibility` | Set a folder to personal or workspace visibility. The change applies to all projects in the folder |
| `move_projects_to_folder` | Move up to 30 projects into a workspace folder |
| `list_template_projects` | List available project templates |
| `list_design_systems` | List design systems available in a workspace |

### Agent interaction

| Tool | Description |
| - | - |
| `send_message` | Send a chat message to a project's AI agent and wait for the response. Supports `plan_mode` (discuss before building) and `files` attachments. Pass `wait=false` to return immediately and poll with `get_message` instead |
| `get_message` | Get the status and content of a message, for example after `send_message` with `wait=false` |
| `list_messages` | List recent messages in a project, newest first. Useful for finding message IDs when you only have a project ID |

### Instructions and skills

| Tool | Description |
| - | - |
| `get_workspace_knowledge` | Get the workspace's [instructions](https://docs.lovable.dev/features/knowledge.md), the custom AI instructions that apply to all projects in the workspace |
| `set_workspace_knowledge` | Set the workspace's [instructions](https://docs.lovable.dev/features/knowledge.md). Replaces the existing content entirely |
| `get_project_knowledge` | Get a project's [instructions](https://docs.lovable.dev/features/knowledge.md), the custom AI instructions for that project |
| `set_project_knowledge` | Set a project's [instructions](https://docs.lovable.dev/features/knowledge.md). Replaces the existing content entirely |
| `list_workspace_skills` | List the workspace's [skills](https://docs.lovable.dev/features/skills.md) |
| `get_workspace_skill` | Get a workspace skill, including its full contents |
| `create_workspace_skill` | Create a workspace skill. Workspace admins and owners only |
| `update_workspace_skill` | Update a workspace skill. Workspace admins and owners only |
| `delete_workspace_skill` | Delete a workspace skill. Workspace admins and owners only. This cannot be undone except by recreating the skill |

### Code inspection

| Tool | Description |
| - | - |
| `get_diff` | Get the unified diff from a message or commit SHA |
| `list_files` | List all files in a project at a specific git ref |
| `read_file` | Read the contents of a single file at a specific git ref |
| `list_edits` | List the edit history of a project with pagination |

### The project's database

These tools act on the project's built-in database. A project that uses your own [Supabase](https://docs.lovable.dev/integrations/supabase.md) project is managed in Supabase instead.

| Tool | Description |
| - | - |
| `get_database_status` | Check whether the project's database is enabled |
| `enable_database` | Provision the project's database (takes 30 to 60 seconds) |
| `query_database` | Run an SQL query against the project's database. Supports reads, writes, and schema changes |

### Connectors

| Tool | Description |
| - | - |
| `list_connectors` | List all connector integrations available in a workspace (standard, seamless, and MCP), with their enabled status |
| `list_connections` | List authenticated connector accounts for a workspace |
| `list_custom_connectors` | List MCP connectors added to a workspace, both from the catalog and custom |
| `list_available_connectors` | Browse featured MCP connector templates available to add |
| `add_connector` | Get the Lovable dashboard URL where you can add a connector. Connectors are always added through the Lovable UI, never programmatically |
| `remove_connector` | Remove an MCP connector from a workspace |

### Analytics

| Tool | Description |
| - | - |
| `get_project_analytics` | Get historical analytics for a published project: visits, page views, bounce rate, visit duration, and breakdowns by page, source, device, and country. Requires `start_date` and `end_date` (RFC 3339) |
| `get_project_analytics_trend` | Get the real-time visit count and 5-minute trend for a published project |

### File uploads

| Tool | Description |
| - | - |
| `get_file_upload_url` | Get a presigned URL to upload a file for use as a message attachment |

### Client-specific tools

Two tools only appear in certain clients:

* `render_project_widget` shows a live build-progress widget after `create_project`. It appears in clients that support MCP Apps, such as ChatGPT.
* `import-claude-design-from-url` imports a Claude design into a new Lovable project. It appears in Claude clients only.

## Skills

A skill is a reusable instruction file that tells your AI client how to use the Lovable MCP server effectively: when to trigger it, how to sequence tool calls, and what patterns to follow. Add it to your client once and it will know how to drive Lovable without extra prompting.

Lovable publishes the skill at [mcp.lovable.dev/skill.md](https://mcp.lovable.dev/skill.md). It is maintained alongside the server, so it always matches the tools the server currently exposes. Download the file and add it to your client's skills or instructions directory, for example `.claude/skills/lovable-mcp/SKILL.md` for Claude Code.

## Troubleshooting

> **Tools not showing after connecting**
>
> Run `tools/list` to confirm the connection. If tools don't appear, troubleshoot based on how you connected:
>
> * **Connected through the client's UI (OAuth):** Open your client's connector or MCP settings, remove the Lovable entry, and add it again to re-run the OAuth flow.
> * **Using a config file:** Open the config file and confirm the JSON is valid and the `"lovable"` entry is nested inside the existing `mcpServers` object. Restart the client after saving.

> **Workspace not found**
>
> Call `list_workspaces` to retrieve valid workspace IDs. If you omit `workspace_id` on `create_project`, Lovable picks the workspace automatically when only one is eligible; if multiple workspaces qualify, the tool returns a `WAITING` response listing them so you can re-call with a specific `workspace_id`.

> **Project not found**
>
> The project ID is incorrect or the project was deleted. Call `list_projects` with the workspace ID to find the correct ID.

> **No database found**
>
> The project doesn't have a database provisioned. Call `enable_database` first (takes 30-60 seconds), then retry.

> **Unsupported PostgreSQL extension**
>
> Lovable databases support a fixed set of PostgreSQL extensions. `query_database` refuses a `CREATE EXTENSION` statement for any other extension and returns this error with the list of supported extensions. Remove the statement and build the feature with plain SQL instead. See [Supported PostgreSQL extensions](https://docs.lovable.dev/features/database#supported-postgresql-extensions).

> **SQL query returns no results**
>
> Confirm the table exists by running `SELECT table_name FROM information_schema.tables` through `query_database` first, then query the table you need.

> **Publishing was refused because the latest security scan found unresolved critical security findings**
>
> `deploy_project` refuses to publish while the project has unresolved critical security findings. The response is a `400` with type `security_critical_findings`, and its `finding_refs` field names the findings that blocked it. Not every critical finding in the Security view blocks a publish, so use `finding_refs` to see which ones to act on.
>
> **What to do:** open the project's [**Security** view](https://docs.lovable.dev/features/security-view.md), fix the named findings or intentionally ignore them, then call `deploy_project` again.

> **MCP client prompts you to log in again (SSO workspaces)**
>
> If your workspace has **Enforce SSO** enabled with a session duration (24 hours, 48 hours, or 7 days), the Lovable MCP server requires a fresh SSO login once that window elapses.
>
> When the session expires, the server responds with `401 Unauthorized` and a `WWW-Authenticate: Bearer error="invalid_token"` challenge. MCP clients that follow the MCP specification, such as Claude Desktop, Cursor, and Claude Code, restart the OAuth flow automatically. The client opens a browser window so you can log in to your identity provider again.
>
> To resolve it, complete the login prompt in your browser. Your client picks up the new token automatically and tool calls resume.
>
> See [Set up single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md) for how workspace owners and admins configure session duration.

## FAQ

> **What is the difference between the Lovable MCP server and chat connectors?**
>
> [Chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) let the **Lovable agent** connect to your external tools, such as Notion, Linear, or Miro, while you build. The Lovable MCP server is the reverse. It lets **your external client**, such as ChatGPT, Claude, Claude Code, Cursor, or VS Code, connect to Lovable and manage your projects from there.

> **Which plans can use the Lovable MCP server?**
>
> All plans. On Enterprise workspaces, a workspace admin or owner must first enable [Third-party MCP clients](https://docs.lovable.dev/features/privacy-and-security-settings.md#third-party-mcp-clients) in **Workspace settings → Security → Privacy & security**.

> **Can I connect with an API key?**
>
> API key authentication is not currently available. OAuth is the only supported way to connect to the Lovable MCP server.

> **Does using the MCP server consume my Lovable credits?**
>
> Standard Lovable credits apply to `create_project` and `send_message` calls. Other tools are free.

> **How do scopes limit MCP access?**
>
> Access depends on the OAuth scopes you authorize and your existing Lovable access. The connection can access multiple projects and workspaces, but it cannot expand your access to them.


## Related topics

- [MCP registries](https://docs.lovable.dev/integrations/mcp-registries.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
