# Create a custom connector
<!-- source: https://docs.lovable.dev/integrations/create-connector.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a custom connector

> Build your own connector for any REST API, public or internal, and make it available to your Lovable workspace. Define the endpoint, authentication, and knowledge once, and let everyone in your workspace connect to it like any other app connector.

You can create your own connector for any REST API, whether it's a public third-party API or an internal service, and make it available to your Lovable workspace. You define the connector once (its API endpoint, authentication method, and optional knowledge files), and everyone in your workspace can then connect to it like any other app + chat connector.

Connectors you create are [app + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md): the apps you build use them to call the API, and Lovable can work with them while you build, guided by the knowledge files you add. To only bring context from your tools into your conversations with Lovable, use a [custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md) instead.

## Who can create connectors

Creating connectors requires the workspace **admin** or **owner** role, and is available on all plans. Connectors you create are scoped to a single workspace: they appear in that workspace's connector catalog and are not visible to other workspaces.

After creation, workspace members connect to your connector the same way they connect to any other app + chat connector.

## How to create a connector

You define the entire connector in a single form with three sections, **Details**, **Authentication**, and **Agent knowledge**, opened from **Add custom** in the connector catalog:

**1. Open the create form**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select **Add custom** in the top right of the catalog, and choose **Custom connector** ("Connect an API to your workspace"). This opens the **Create custom connector** form. When you search the catalog, a **Custom** card ("Connect your own API") appears in the results and opens the same form.

**2. Describe your connector**

Under **Details**, fill in the following fields:

* **Display name**: the name users see in the catalog. Use the name of the API the connector reaches (for example, `Acme Projects API`). The connector's internal ID is derived from this name and can't be changed later.
* **Short description**: a one-line summary (for example, `Project management boards`).
* **Description**: a longer explanation of what the connector does.
* **Logo** (optional): select **Upload logo** to add the logo users see in the catalog.
* **Category**: where the connector appears in the catalog (Productivity, Sales, Marketing, E-commerce, Support, Messaging, Development, Payments, or Other).
* **Documentation URL** (optional): a link to the API's documentation.

**3. Choose an authentication method**

Under **Authentication**, pick how the API expects credentials (see [Authentication methods](#authentication-methods) below). For non-OAuth methods, a live preview, **What requests to this API will look like**, shows the resulting request with your configuration applied.

Credential *values* are never entered in this form. Users provide their own API key or OAuth client credentials when they create a connection.

**4. Set the API base URL and test request**

Also under **Authentication**, set:

* **API base URL**: where requests are sent. Must be an `https://` URL.
* Under **Test request**, a **Method** and **Path**: an endpoint Lovable calls to verify credentials when a user connects (for example, `GET /v1/me`). The path must start with `/`.

**5. Add knowledge (optional)**

Under **Agent knowledge**, fill in the first knowledge file's **Name**, **Description**, and **Content**, and select **Add knowledge file** to add another. Knowledge files teach Lovable how to use the API: key endpoints, request formats, pagination rules, and common pitfalls. Good knowledge files significantly improve how well Lovable uses your connector. See [Writing connector knowledge files](#writing-connector-knowledge-files) for guidance and an example.

**6. Create the connector**

Click **Create**. The connector now appears in your workspace's connector catalog, and in the **Custom connectors** section of the connector admin settings.

## Authentication methods

Pick the method that matches how your API expects credentials:

| Method | How credentials are sent | What you configure |
| :- | :- | :- |
| **Bearer token** | `Authorization: Bearer <token>` header | A **Credential label**: the field name users see when they paste their token. |
| **API key in a custom header** | A header you name (for example, `X-Api-Key`) | A **Credential label**, a **Header name**, and an optional **Value prefix**. |
| **API key in a query parameter** | A query parameter you name (for example, `?key=...`) | A **Credential label** and a **Parameter name**. |
| **Basic auth (username & password)** | `Authorization: Basic ...` header | Nothing extra. Users enter a username and password when connecting. |
| **Advanced** | Multiple credential fields, each sent as a header, query parameter, or basic auth part | One or more fields, each with a **Field key**, **Label**, **Send as** option, and a **Secret** toggle. At least one field must be marked secret. |
| **OAuth 2.0** | Standard OAuth 2.0 authorization code flow | Authorization URL, token URL, scopes, and PKCE. See [Setting up OAuth 2.0](#setting-up-oauth-2-0). |

### Setting up OAuth 2.0

For APIs that use OAuth 2.0, configure:

* **Authorization URL** and **Token URL**: your provider's OAuth endpoints (both must be `https://`).
* **Scopes** (optional): one per line, or separated by spaces or commas.
* **Scope separator** (optional): leave blank for the default (space). Some providers require a comma.
* **Use PKCE**: enable if your provider supports or requires PKCE (Proof Key for Code Exchange), an extension that adds an extra verification step to the authorization flow.

After you enter the API base URL, the form displays a redirect URL under **Add this redirect URL to the service's OAuth app settings**. Copy it and add it to your OAuth app's allowed redirect (callback) URLs. It must match exactly.

## Writing connector knowledge files

Connector knowledge files are how Lovable learns to use your API. Without them, Lovable only knows your base URL and authentication method, so it has to guess endpoint paths, parameter names, and response formats. A good knowledge file removes the need to guess, so treat it as documentation written for Lovable rather than for humans.

They are separate from [workspace and project instructions](https://docs.lovable.dev/features/knowledge.md): connector knowledge is part of the connector definition and only covers how to call its API.

Each knowledge file has three parts:

* **Name**: a short identifier (for example, `Acme Projects API basics`).
* **Description**: a one-line summary of what the file covers, so Lovable picks the right file for the task (for example, `Endpoints and request formats for reading and writing Acme Projects boards and tasks.`).
* **Content**: the actual instructions, in Markdown, including the endpoints, examples, and caveats.

### What to include

Follow the same structure Lovable uses for its built-in connectors:

1. **A one-line summary** of what the API does and what it's for.
2. **Key endpoints**: method, path, and what each does. Use paths relative to your API base URL (for example, `GET /v1/tasks`). Lovable routes requests and attaches credentials automatically, so don't hardcode full URLs or authentication headers.
3. **Request examples** for the most common operations, as code blocks. Show the exact request body, required parameters, and query options.
4. **Response formats**: mention wrappers and field names Lovable should expect (for example, "responses are wrapped in a top-level `data` field").
5. **A notes section** for details that commonly cause integration errors: pagination parameters, rate limits, API versioning in paths, async operations, and date or ID formats.

### What to leave out

Some content does not belong in knowledge files:

* **Credentials or secrets**: never put tokens, keys, or client secrets in knowledge content. Authentication is configured separately and injected automatically.
* **Authentication boilerplate**: Lovable doesn't need instructions for attaching credentials. The connector handles it.
* **Marketing copy**: promotional language does not help Lovable call the API. Keep knowledge files technical and factual.

### Example

A knowledge file for the fictional `Acme Projects API`, a project management API:

````markdown theme={null}
This connector calls the Acme Projects API to manage projects and tasks.

## Key endpoints

- `GET /v1/projects`: list projects
- `GET /v1/projects/{id}/tasks`: list tasks in a project
- `POST /v1/tasks`: create a task
- `PATCH /v1/tasks/{id}`: update a task (status, assignee, due date)

## Creating a task

```json
POST /v1/tasks
{
  "project_id": "proj_123",
  "title": "Draft launch plan",
  "due_on": "2026-08-01",
  "assignee_id": "user_456"
}
```

## Notes

- All responses are wrapped in a top-level `data` field.
- List endpoints are paginated: pass `limit` (max 100) and the `next_cursor`
  value from the previous response.
- Dates use `YYYY-MM-DD` format; timestamps are ISO 8601 in UTC.
- Rate limit is 60 requests per minute; batch operations should back off
  on `429` responses.
````

> [!TIP]
>
> You can split knowledge across multiple files, for example one for core concepts and endpoints, and another for a complex sub-domain such as reporting or webhooks. Each file's **Description** helps Lovable pick the right one for the task. See [Limits](#limits) for the caps on knowledge files.

## Using your connector

After creation, your connector behaves like any other app + chat connector:

1. Users open **Connectors**, find your connector in the catalog, and select **Connect**.
2. They enter the credential values you defined (an API key, username and password, or OAuth Client ID and secret). For OAuth connectors, a popup runs the authorization flow with your provider.
3. Under **Sharing**, they choose who can use it: only themselves, specific people, or the entire workspace. A new connection is private to its creator by default and shows a **Private** label. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).
4. Lovable verifies the credentials by calling the test request you configured.
5. When connected, the connection can be [linked to projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project), and Lovable can build apps that call your API, guided by any knowledge files you added.

## Managing connectors

Workspace admins and owners manage the connectors created in their workspace from **Connectors → Admin settings → App + chat connectors**, under **Custom connectors**. The admin settings area is available on Business and Enterprise plans:

* **Availability**: control who can create connections (**No one**, **Editors & admins**, or **Admins**), the same way as for any other connector. A newly created connector starts at **Admins**. Free and Pro plans have no picker: any workspace member with the editor role or higher can create connections. See [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md) for the defaults on each plan.
* **Edit**: update the connector's details, **API base URL**, **Test request**, knowledge, and authentication configuration. While the connector has any connection in the workspace, the form disables the authentication method and its credential fields and shows why. **API base URL** and **Test request** stay editable. If members still use those connections, create a new connector instead. [Deleting a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) is permanent, and the apps that use it stop working. With no connections, every authentication setting is editable except switching between OAuth 2.0 and the other methods.
* **Delete**: remove the connector definition from the workspace.

> [!WARNING]
>
> Deleting a connector removes its definition from the workspace and **deletes its existing connections**, including their stored credentials. Apps that use those connections stop working. This cannot be undone.

## Security

Custom connectors follow the same security model as built-in connectors, described in [Integration security](https://docs.lovable.dev/integrations/security.md):

* Credential values are entered only when a connection is created, and are stored encrypted by Lovable. They are injected into requests server-side by the connector gateway, and never appear in the project chat or in project code. Members with access to a connection can view its configuration, where secret values appear masked.
* Workspace-shared connections can be used by other members of the workspace, so only share connections whose data you're comfortable making available to your team.

## Limits

Custom connectors have the following caps. Lovable checks them when you create or save a connector:

* A workspace can have up to 200 custom connectors. At the cap, Lovable refuses to create another until you delete one.
* A connector can have up to 50 knowledge files.
* Each knowledge file's content can be up to 50,000 characters.
* The connector definition as a whole, including all knowledge files, can be up to 256 KB.

## FAQ

> **Do workspace members need their own account with the API?**
>
> Not necessarily. One person connects to the connector using credentials from the API provider, such as an API key. They can then share that connection with specific people or with the entire workspace. Everyone with access builds with the shared connection, without needing their own account. A member only needs their own credentials if they create a separate connection of their own.

> **Can I change the authentication method after creating a connector?**
>
> No, not while the connector has any connection in the workspace. The edit form disables the authentication method and its credential fields, because the stored credentials of those connections fit the current structure. When no connections remain, every authentication setting is editable again, apart from switching between OAuth 2.0 and the other methods. Deleting a connection is permanent, so read [Managing connectors](#managing-connectors) before you delete one to unlock editing.

> **What happens when I delete a custom connector?**
>
> Lovable removes the connector definition and deletes its existing connections, including their stored credentials. Apps that use those connections stop working. Deletion cannot be undone.

> **Who can see the credential values users enter?**
>
> Credential values are stored encrypted, and the connector gateway injects them into requests server-side. They never appear in the project chat or in project code. Members the connection is shared with can view its configuration: values marked secret, such as API keys and tokens, appear masked and show only their last few characters, while fields not marked secret, such as a basic auth username, are visible in full.


## Related topics

- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Integrate any API with Lovable](https://docs.lovable.dev/integrations/any-api.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
