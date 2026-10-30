# Chat connectors: Connect your tools to Lovable using MCP servers
<!-- source: https://docs.lovable.dev/integrations/chat-connectors.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat connectors: Connect your tools to Lovable using MCP servers

> Connect your own tool accounts to Lovable as chat connectors (MCP servers). Lovable reads real context from tools like Notion, Linear, Jira, or Miro while you build, so results match your actual work.

A **chat connector (MCP server)** connects one of your own tool accounts to Lovable, in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). Once connected, Lovable can look things up in that tool while it works for you: your Notion docs, your Linear tickets, your Miro boards. You describe what you want, and Lovable grounds the result in your real content instead of guessing.

Chat connections are **personal**. You sign in with your own account, only you can use the connection, and it does not become part of the app you publish. Chat connectors are built on **MCP (Model Context Protocol)**, an open standard that connects AI systems like Lovable to external tools. You don't need to know anything about MCP to use them.

Lovable includes prebuilt chat connectors for popular tools and supports [custom MCP servers](https://docs.lovable.dev/integrations/custom-mcp.md) on all plans. The [**Lovable static IPs**](https://docs.lovable.dev/integrations/custom-mcp.md#lovable-static-ips) connection option for custom MCP servers is the one Enterprise-only exception. Workspaces can also add [MCP registries](https://docs.lovable.dev/integrations/mcp-registries.md), browsable directories of MCP servers that members connect as chat connectors without entering URLs.

## Why use chat connectors

Chat connectors unlock two key capabilities:

* **Bring your existing context into Lovable.**\
  Lovable can read your team’s documentation, tickets, and design files to build prototypes and flows aligned with your standards.
* **Connect your work in Lovable back to your workflows.**\
  Lovable can take follow-up actions in your connected tools, such as updating ticket statuses, adding prototype links as comments, or creating new items when supported.

Lovable becomes more powerful when it understands your team’s world, eliminating guesswork and speeding up iteration.

Here is what that looks like in practice:

| **Scenario** | **Example prompt** | **Example outcome** |
| :- | :- | :- |
| A **product manager** connects **Linear** or **Jira** | *Generate a prototype based on tickets in the current sprint.* | Lovable reads issue descriptions and acceptance criteria to build aligned, testable UI. |
| A **marketer** connects **Notion** or **Confluence** | *Turn our Q4 campaign brief into a landing page.* | Lovable uses the document as context to generate an on-brand, editable page. |
| A **designer** connects **Miro** | *Prototype the signup flow from our whiteboard.* | Lovable reads flow diagrams to scaffold UI navigation and turns them into an interactive prototype your team can test. |
| An **engineer** connects **n8n** or an internal MCP server | *Build a workflow UI that lists users and allows deleting them.* | Lovable builds an app that uses live data and workflows. |

## How chat connectors relate to Lovable's other MCP features

Lovable uses MCP in three different ways, each connecting a different system for a different purpose. Chat connectors bring **external tools into Lovable** as context while you build.

| Feature | Direction | What it does |
| - | - | - |
| **Chat connectors** (this page) | Lovable uses external tools | Lovable pulls context from services such as Notion or Linear while you build |
| [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) | AI tools build in Lovable | External AI tools create, edit, and manage your Lovable projects |
| [Agent integrations](https://docs.lovable.dev/features/agent-integrations.md) | AI assistants use your app | Your users' assistants call the actions you expose in your published app |

These uses also combine: a published Lovable app with an agent integration becomes a chat connector in its own workspace, listed under **Lovable apps** on the **Connectors** page. See [Use your app in your chats](https://docs.lovable.dev/features/agent-integrations.md#use-your-app-in-your-chats).

## How chat connections work

Chat connections behave differently from the other connection types in a few important ways:

* **Personal to you.** You connect with your own account, and only you can use or manage the connection. Teammates who want the same tool connect their own accounts.
* **Chat only.** Lovable uses the connection in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). It is not included in your published app, and your app's visitors cannot reach the connected tool through it. If your published app itself needs the tool, use an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md).
* **Read first, act when supported.** Lovable can read structured content such as docs, issues, and diagrams. Where the tool supports it, Lovable can also take limited actions, such as creating or updating items.
* **Approvals.** Tools the server marks as read-only run without asking. Before any other tool runs, Lovable shows an approval card. Select **Always allow** to skip the approval for that tool from then on, or **Always allow all tools from this connection** to skip it for every tool from the connection, including tools the server adds later. Both choices apply to your own approvals only. You can change them in the connection's settings in [**Connectors**](https://lovable.dev/dashboard?connectors).
* **Available on all plans, everywhere you work with Lovable.** Once connected, the tool is available as context across your projects and in [Chats](https://docs.lovable.dev/features/chats.md). Workspace admins can manage which chat connectors are available, described under [Managing chat connectors](#managing-chat-connectors-in-your-workspace).

## Prebuilt chat connectors

Lovable includes prebuilt chat connectors for these tools. Expand one to see what connecting it unlocks:

> **Amplitude: product analytics and feedback**
>
> **Turn user behavior into better product decisions.**
>
> Bring product insights, user funnels, and feedback into Lovable so you can iterate on flows, optimize layouts, and run experiments with a simple prompt. See the [Amplitude MCP docs](https://amplitude.com/docs/amplitude-ai/amplitude-mcp).

> **Atlassian: Jira issues and Confluence pages**
>
> **Turn product documentation into working prototypes.**
>
> Lovable can read product documentation and linked Jira epics (PRDs, specs, architecture docs) to generate prototypes that match your team’s standards. Embed generated prototypes back into Confluence for feedback. See the [Atlassian MCP docs](https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/).

> **Canva: designs, brand assets, and templates**
>
> **Create and export visuals without leaving the chat.**
>
> Lovable can create and edit Canva designs, search your brand assets and templates, and export finished designs as PDF, PNG, or other formats. Some features, such as brand kits, need a Canva plan that includes them. See the [Canva MCP docs](https://www.canva.dev/docs/mcp/).

> **Confidence: feature flags and experiment data**
>
> **Build and iterate with real experimentation context.**
>
> Lovable can evaluate feature flags, read experiment results, and incorporate rollout logic into your apps, helping you ship features that are informed by real user experiments. See the [Confidence MCP docs](https://confidence.spotify.com/docs/sdks/mcp-servers).

> **Excalidraw+: scenes and diagrams**
>
> **Turn whiteboards into working prototypes.**
>
> Lovable can list, search, and edit scenes in your Excalidraw+ workspace, including diagrams, wireframes, and presentations. Connect it with an API key from your Excalidraw+ settings. See the [Excalidraw+ MCP docs](https://plus.excalidraw.com/docs/mcp).

> **Granola: meeting notes, decisions, and action items**
>
> **Turn meeting context into specs and tickets.**
>
> Lovable can search across past meetings, pull out decisions and action items, and use what was agreed to generate PRDs, user stories, or follow-up tasks, without digging through notes. See the [Granola MCP docs](https://docs.granola.ai/help-center/sharing/integrations/mcp).

> **Hex: notebooks and workspace data**
>
> **Build apps powered by real analysis and data workflows.**
>
> Lovable can query Hex notebooks, explore datasets, and use results as context to generate data-driven apps, dashboards, and workflows aligned with your existing analyses. See the [Hex MCP docs](https://learn.hex.tech/docs/administration/mcp-server).

> **HeyGen: AI avatars, voices, and video generation**
>
> **Generate AI avatars and videos directly from your Lovable apps.**
>
> Lovable can use HeyGen to create AI-generated avatar videos, voiceovers, and personalized video content as part of your apps and workflows. See the [HeyGen MCP docs](https://developers.heygen.com/mcp/overview).

> **Linear: issues and project data**
>
> **Prototype from real issues and tickets.**
>
> Lovable can read Linear issues, including descriptions and acceptance criteria, to generate functional prototypes. Attach resulting apps back to Linear for review. See the [Linear MCP docs](https://linear.app/docs/mcp).

> **Loom: video transcripts, summaries, and comments**
>
> **Show Lovable a bug or an idea instead of describing it.**
>
> Lovable can read a Loom video's transcript, AI summary, and comments. Paste a Loom link in the project chat, and Lovable builds or fixes what the video shows. You sign in with your Atlassian account to connect it.

> **Miro: boards and diagrams**
>
> **Bring your boards to life.**
>
> Lovable can convert user flows, wireframes, or information architecture from your boards into interactive prototypes you can test and export back for feedback. See the [Miro MCP docs](https://miro.com/ai/mcp/).

> **Notion: pages and databases**
>
> **Build directly from your team’s Notion workspace.**
>
> Lovable can read PRDs, design specs, or marketing briefs and turn them into working apps, landing pages, or prototypes. Embed generated Lovable apps back into Notion for seamless collaboration. Need your published app to read or write Notion while people use it? Use the [Notion app + chat connector](https://docs.lovable.dev/integrations/notion.md) instead. See the [Notion MCP docs](https://developers.notion.com/docs/mcp).

> **n8n: automation workflows**
>
> **Build workflow-rich apps with live data.**
>
> Connect your n8n automations to Lovable to pull data from tools like HubSpot, Google Sheets, or Slack, and build user-facing apps powered by existing automations. See the [n8n MCP docs](https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/).

> **Polar: billing, products, customers, and subscriptions**
>
> **Build subscription-enabled apps with real billing context.**
>
> Lovable can use your Polar setup as context when scaffolding SaaS apps, checkout flows, pricing pages, subscription management, and customer billing experiences. See the [Polar MCP docs](https://polar.sh/docs/integrate/mcp).

> **PostHog: product analytics data**
>
> **Turn product analytics into better features.**
>
> Lovable can query user behavior, analyze funnels and events, and use real usage insights to generate flows, features, and improvements grounded in how users actually interact with your product. See the [PostHog MCP docs](https://posthog.com/docs/model-context-protocol).

> **Sanity: CMS content and schemas**
>
> **Build content-driven apps with your CMS data.**
>
> Lovable can read your Sanity documents, schemas, and structured content to generate apps, landing pages, and content management interfaces aligned with your content model. See the [Sanity MCP docs](https://www.sanity.io/docs/ai/mcp-server).

> **Sentry: issues, errors, and project insights**
>
> **Debug and monitor your apps with real error data.**
>
> Lovable can read Sentry issues, exceptions, and performance data to help you identify and fix problems faster. See the [Sentry MCP docs](https://docs.sentry.io/product/sentry-mcp/).

> **Wispr Flow: meeting notes, summaries, and transcripts**
>
> **Build from the decisions your team makes in meetings.**
>
> Wispr Flow Notetaker records your meetings and creates notes, summaries, and transcripts from them. Lovable can read that content and use it as context while you build. You need Notetaker and Cloud Sync enabled in your Wispr Flow account. See the [Wispr Flow MCP docs](https://docs.wisprflow.ai/articles/9551372685-connect-an-mcp-client-to-wispr-flow-remote-mcp-server).

## How to add a prebuilt chat connector

To connect a prebuilt chat connector:

**1. Select the connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select a chat connector, for example Notion or Linear. See [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors) for every place you can open the catalog.

**2. Add a connection**

If the connector only offers a chat connector, click **Connect**. Otherwise, open **More options** and select **Chat connector**.

**3. Authorize**

Sign in and grant Lovable access to your account, or paste an API key when the connector asks for one, as Excalidraw+ does.

### Additional setup for specific chat connectors

**[n8n](https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/)**

In addition to these steps, you need to do the following in n8n:

* Go to **Settings → MCP access** and toggle **Enable MCP access** (requires instance owner or admin permissions)
* For each workflow you want to expose, go to **Settings** in the workflow editor and toggle **Available in MCP.**

**[Amplitude](https://amplitude.com/)**

If you plan to analyze your Lovable-built app, make sure it is already sending data to Amplitude before using the connector. See the [Amplitude Quickstart guide](https://amplitude.com/docs/get-started/amplitude-quickstart) for setup instructions.

**[Hex](https://learn.hex.tech/docs/administration/mcp-server)**

Hex requires you to provide a custom server URL when connecting. For most users, the default URL is `https://app.hex.tech/mcp`. If you are on a single-tenant, EU multi-tenant, or HIPAA multi-tenant instance, replace `app.hex.tech` with your custom Hex domain (for example, `https://your-company.hex.tech/mcp` or `https://eu.hex.tech/mcp`).

## Custom MCP servers

If a tool isn't in the catalog but offers an MCP server, you can still connect it. Custom MCP servers bring internal or third-party systems into Lovable as chat connectors, which is perfect for private APIs, internal CRMs, or custom data sources. See [Connect a custom MCP server](https://docs.lovable.dev/integrations/custom-mcp.md) for setup steps, authentication options, and admin controls.

## Managing chat connectors in your workspace

Chat connections are personal, so you review or revoke your own connections anytime in [**Connectors**](https://lovable.dev/dashboard?connectors), which you can also reach from inside a project, as described in [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

Chat connectors, including custom MCP servers, are enabled by default on all plans, including Enterprise. The [**Lovable static IPs**](https://docs.lovable.dev/integrations/custom-mcp.md#lovable-static-ips) connection option for custom MCP servers is the exception: it requires an Enterprise plan.

On Business and Enterprise plans, workspace admins and owners can turn chat connectors off for the whole workspace or disable individual ones. See [Chat connector controls](https://docs.lovable.dev/integrations/admin-controls.md#chat-connector-controls) for the settings and where to find them.

## FAQ

> **Can my teammates use my chat connection?**
>
> No. Chat connections are personal, so only you can use and manage yours. Teammates who want the same tool connect it themselves with their own accounts.

> **Is a chat connection part of my published app?**
>
> No. Chat connections only give Lovable context in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). Your published app and its visitors cannot reach the connected tool through them. If your app itself needs the tool, use an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md).

> **What's the difference between a chat connector and an app + chat connector?**
>
> A chat connector (MCP server) uses your own account, is personal to you, and works only in the project chat and in [Chats](https://docs.lovable.dev/features/chats.md). An app + chat connector runs on one shared account and also works in your published app. The [decision table](https://docs.lovable.dev/integrations/introduction#which-connection-type-do-i-need) on the overview shows when to pick each one.

> **Why can't I connect a chat connector?**
>
> A workspace admin may have disabled the connector, custom MCP servers, or all chat connectors for the workspace. See [Chat connector controls](https://docs.lovable.dev/integrations/admin-controls.md#chat-connector-controls) for the settings and ask an admin to check them.


## Related topics

- [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)
- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
- [MCP registries](https://docs.lovable.dev/integrations/mcp-registries.md)
