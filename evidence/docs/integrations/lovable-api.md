# Lovable API
<!-- source: https://docs.lovable.dev/integrations/lovable-api.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable API

> Use the Lovable API to deploy Lovable projects, manage your workspace, query security scans, and embed projects in your product.

The **Lovable API** is a REST API that lets you deploy Lovable projects, manage your workspace, monitor security, and embed projects in your own product from your own scripts, services, and agents.

## Why use the Lovable API?

Use the Lovable API to:

* **Publish and embed programmatically.** Deploy projects and embed them inside your product without touching the Lovable UI.
* **Monitor and govern your workspace.** Query security scans, and read analytics across your workspace.

## What you can do

The API covers these resource areas:

* **Projects**: list, get, update settings, and delete projects.
* **Deployments**: publish or unpublish a project, check deploy status, and update publish settings.
* **Embed**: generate a one-hour URL for embedding a project's built preview on a specified HTTPS origin. This does not embed the editor or the published app, and visitors do not need a Lovable login.
* **Workspace**: list workspaces, read workspace settings, and list members and groups.
* **Analytics**: read project-level and workspace-level analytics.
* **Security**: poll security scans per project, view workspace security insights, and read PII labels.

Two capabilities are available on Enterprise plans only: reading a project's PII labels (which also requires **Sensitive data scanning** to be enabled) and the per-project security inventory under workspace insights. All other endpoints are available on both Business and Enterprise plans, subject to permissions and endpoint prerequisites.

For authentication, base URL, rate limits, pagination, and the complete endpoint reference, see the [API Reference](https://docs.lovable.dev/api-reference/introduction.md).

To create and manage the API keys you need to authenticate requests, see [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md).

## Connect users' accounts with OAuth

Register an [OAuth client](https://docs.lovable.dev/features/oauth-clients.md) to connect your app to Lovable. Each user allows access to their profile, projects, or workspaces. Workspace **owners and admins on all plans** can register and manage OAuth clients. Non-sensitive scopes are available on all plans. Sensitive project and workspace scopes require **Business or Enterprise**.

Open **Workspace settings → API keys & OAuth → OAuth clients** to register a client. Choose its redirect URLs and scopes, then configure your integration with the client ID and secret. Clients with only sign-in and profile scopes do not need verification. Clients with sensitive project or workspace scopes show an unverified app warning until Lovable verifies them.

OAuth access depends on the scopes the user authorizes and their existing project and workspace access. The workspace API keys documented in the [API reference](https://docs.lovable.dev/api-reference/introduction.md) remain restricted to one workspace and require Business or Enterprise.

## Try the API in Postman

If you work in Postman, fork the [Lovable API collection](https://www.postman.com/lovable/lovable-api/collection/q9dumeu/lovable-api) from the Postman API Network into your own workspace. The collection covers every endpoint in the current API version with saved example responses. Each request sends the [API key](https://docs.lovable.dev/features/api-keys.md) you store in a Postman environment.

## Other ways to use Lovable programmatically

The API is one of the ways to use Lovable programmatically, each from a different place:

| Feature | Where it runs | What it does |
| - | - | - |
| **Lovable API** (this page) | Your own scripts and services, with an API key you store and manage | Anything outside Lovable calls the REST API directly |
| [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) | An AI client such as ChatGPT, Claude, or Cursor | External AI tools create, edit, and manage your Lovable projects |
| [Lovable API connector](https://docs.lovable.dev/integrations/lovable-api-connector.md) | An app you build with Lovable, with the API key stored by Lovable | Your app reads and manages a connected Lovable workspace |

You can also [**Build with URL**](https://docs.lovable.dev/integrations/build-with-url.md): share a link with the prompt encoded in the URL. The link opens Lovable with the prompt prefilled, and the recipient clicks send to start the build. No API key needed.

## FAQ

> **Is the Lovable API stable?**
>
> The `/v1` surface is versioned and stable. Lovable commits to a deprecation policy for the API, where deprecated endpoints keep working for a migration period and announce their sunset date.

> **Which plans include API access?**
>
> Creating API keys requires a Business or Enterprise plan, and an owner or admin role in the workspace.

> **Does the API cost extra?**
>
> No. There is no separate API pricing. The public API manages and deploys existing projects, and its current endpoints, including deployment builds, do not consume AI build credits. AI project creation and editing are available through the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md).

> **When should I use the API, and when should I use the MCP server?**
>
> Use the API when workspace admins and owners need to manage the workspace and pull information from it, such as monitor security scans, get project information, or query workspace analytics from your own scripts and services. Use the [MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) when editors want to build out projects through a client such as Claude or Cursor.


## Related topics

- [API basics](https://docs.lovable.dev/api-reference/introduction.md)
- [API changelog](https://docs.lovable.dev/api-reference/changelog.md)
- [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [Integrate any API with Lovable](https://docs.lovable.dev/integrations/any-api.md)
