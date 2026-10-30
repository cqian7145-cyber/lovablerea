# API basics
<!-- source: https://docs.lovable.dev/api-reference/introduction.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# API basics

> All the basics to get started with the Lovable API.

## Base URL

The base URL is `https://api.lovable.dev`. Endpoints are versioned under `/v1`.

## Headers

The following table lists all required and optional request headers:

| Header | Required | Description |
| - | - | - |
| `Lovable-API-Key` | Yes | Your workspace-scoped API key. |
| `Lovable-Version` | Recommended | The stable API version to serve, as a `YYYY-MM-DD` date. If you omit it, the API uses the oldest supported stable version. |
| `Accept` | No | Set to `application/json` or `*/*`, or omit the header. An `Accept` header that excludes `application/json` returns a `406` response. |
| `Content-Type` | No | Set to `application/json` on requests with a JSON body. |
| `Lovable-Beta` | No | Comma-separated beta revision strings to enable on top of the stable version. |

### Authentication

Requests authenticate with a workspace-scoped API key, sent in the `Lovable-API-Key` header. Keys start with `lov_`.

You create and manage keys in [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys). Creating keys requires a Business or Enterprise plan, and an owner or admin role in the workspace. See [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md) for details on scopes, expiry, credit limits, and IP allowlists.

Your Lovable account email must be verified before you can call the API.

> [!NOTE]
>
> To connect your own app to Lovable, see [OAuth clients](https://docs.lovable.dev/features/oauth-clients.md). Workspace owners and admins on all plans can register OAuth clients. Sensitive OAuth scopes and workspace API keys require Business or Enterprise.

```bash theme={null}
curl https://api.lovable.dev/v1/workspaces \
  -H "Lovable-API-Key: lov_YOUR_KEY"
```

### Versions

Pin your requests to an API version by sending the `Lovable-Version` header with a version date in the `YYYY-MM-DD` format:

```bash theme={null}
curl https://api.lovable.dev/v1/workspaces \
  -H "Lovable-API-Key: lov_YOUR_KEY" \
  -H "Lovable-Version: 2026-09-11"
```

If you omit the header, the request uses the oldest supported stable API version, which is currently `2026-09-11`. This default is API-wide, skips retired versions, and advances only when the current default retires, so pin the version explicitly to control upgrades.

To try beta functionality before it lands in a stable version, send the optional `Lovable-Beta` header with comma-separated beta revision strings. Beta revisions are enabled on top of the stable version you request. When a request selects beta revisions, the response includes a `Lovable-Beta` header listing the revisions that were applied. There are currently no beta revisions released.

### Media types

Requests with JSON bodies use `Content-Type: application/json`. GET requests take no body and need no `Content-Type` header. Responses with bodies use `application/json`, and no XML or other representations are supported. A `204` response has no body, so do not parse it as JSON. Sending an `Accept` header that excludes `application/json` returns a `406` response. You can also send `*/*` or omit the header.

```bash theme={null}
curl https://api.lovable.dev/v1/workspaces \
  -H "Lovable-API-Key: lov_YOUR_KEY" \
  -H "Lovable-Version: 2026-09-11" \
  -H "Accept: application/json"
```

## HTTP methods

HTTP methods indicate the general operation. Each endpoint documents its own response status and body:

* **GET**: reads a resource without changing it. GET requests are safe, idempotent, and take no request body.
* **POST**: creates a resource in a collection or invokes a documented action. A synchronous action returns `200`, such as creating an embed URL, and an asynchronous action returns `202`, such as publishing a project. POST requests are not guaranteed to be idempotent. Retrying may repeat the action, even if the previous request timed out or returned a server error.
* **PATCH**: partially updates an existing resource. Send only the fields you want to change. This is the default method for changing existing resources, and there are no per-property endpoints. For example, to change a project's visibility, send `PATCH /v1/projects/{project_id}` with `{"visibility": "workspace_view"}` instead of calling a dedicated visibility route. Omitting a field leaves it unchanged: `{"name": "New"}` renames the project and changes nothing else.
* **DELETE**: removes a resource. A successful delete returns `204`. Deleting a resource that no longer exists can return `404`.

The API validates request bodies strictly. An unknown property in the request body is rejected with a `400` response. Unknown query parameter names are ignored.

## Response codes

The Lovable API uses standard HTTP codes to indicate the success or failure of your requests.

| Code | Error type | Description |
| - | - | - |
| `200` | | Request succeeded. |
| `202` | | Request accepted. Processing continues asynchronously. |
| `204` | | Request succeeded with no response body. |
| `400` | `invalid_request` | The request body, parameters, or headers are malformed or fail validation. Each failing field is listed in the response with its location, such as `header.Lovable-Version`. |
| `400` | `unknown_version` | The date is not a released stable version. |
| `400` | `unknown_beta` | A beta string is not released. |
| `400` | `unsupported_beta_version` | A beta revision does not support the selected stable version. |
| `400` | `conflicting_betas` | Two revisions of one beta feature, or incompatible beta strings, were selected together. |
| `401` | `unauthorized` | Missing or invalid API key. |
| `402` | `payment_required` | Your workspace plan does not include this feature. |
| `403` | `insufficient_scope` | The API key lacks the scope this endpoint requires. |
| `403` | `ip_restricted` | The API key has an [IP allowlist](https://docs.lovable.dev/features/api-keys.md#restrict-a-key-to-an-ip-allowlist) that does not include the request's address. |
| `403` | `forbidden` | The caller lacks the required permission. |
| `403` | `unsupported_extension` | The SQL installs a PostgreSQL extension that the project's database does not support. See [Supported PostgreSQL extensions](https://docs.lovable.dev/features/database#supported-postgresql-extensions). |
| `404` | `not_found` | The resource does not exist, is inaccessible to this key, or is unavailable under the endpoint's documented prerequisites. |
| `406` | `not_acceptable` | The `Accept` header is incompatible with the endpoint's media type. |
| `410` | `retired_version` | The selected stable version has retired. When provided, `props.migration_url` links to migration guidance. |
| `410` | `retired_beta` | A beta revision has retired. When provided, `props.migration_url` links to migration guidance. |
| `429` | `rate_limited` | Rate limit exceeded. Retry after the interval in the `Retry-After` header when present. |
| `503` | `no_supported_version` | No stable version is currently supported. |
| `5xx` | | Server error. Usually transient, so retry reads with backoff. A POST may have already taken effect, so retry it with care. |

The error types are examples, not an exhaustive list. Some endpoints return resource-specific types instead, such as `project_not_found` or `workspace_not_found`.

## Error handling

Every error response uses the same envelope. All fields are always present, and `detail`, `errors`, and `props` are `null` when they do not apply:

```json theme={null}
{
  "type": "invalid_request",
  "title": "Bad Request",
  "status": 400,
  "request_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "detail": "validation failed",
  "errors": [
    {
      "location": "body.members",
      "message": "expected array length >= 1"
    }
  ],
  "props": null
}
```

* `type`: a stable snake\_case token, such as `insufficient_scope` or `rate_limited`. Branch your error handling on this field, not on `title`, whose wording can change. New types are additive, so tolerate types you do not recognize.
* `title`: a human-readable summary.
* `status`: echoes the HTTP status code.
* `request_id`: matches the `X-Request-Id` response header. Include it when contacting support.
* `detail`: explains this specific occurrence.
* `errors`: field-level validation failures. Each entry contains a `message` and a `location`, and `location` is `null` when the failure cannot be attributed to a field.
* `props`: data specific to the error type, such as `migration_url` on retired versions.

The same HTTP status does not imply the same diagnostics. A validation failure returns `400` with `type: invalid_request`, `detail: "validation failed"`, and actionable messages in `errors`. A well-formed but unreleased version date also returns `400`, but with `type: unknown_version` and `detail` and `errors` set to `null`.

## Rate limits

The API uses sliding-window rate limits. When a limit could be evaluated, responses include headers that tell you where you stand:

* `X-RateLimit-Limit`: the maximum number of requests allowed in the current window.
* `X-RateLimit-Remaining`: how many requests you have left in the current window.
* `X-RateLimit-Reset`: when capacity next becomes available, as an absolute Unix timestamp in seconds, not a delay. The header can be absent when the reset time is unknown.

If you exceed your limit, the API returns `429 Too Many Requests`. When the API can calculate a safe retry delay, the response also includes a `Retry-After` header with the number of seconds to wait before retrying.

Each API key has its own rate limit. Requests authenticated with a session or OAuth token share the user's limit with dashboard sessions instead. Some endpoints add per-IP, per-workspace, or global buckets on top. The headers always reflect the most constrained bucket that applies to your request.

Pinning an API version does not pin operational rate or concurrency quotas. Limits on a valid request, such as payload size, page size, and batch size, remain part of the versioned contract.

Because the window is sliding, `X-RateLimit-Remaining` recovers gradually as older requests age out rather than all at once at a fixed reset time.

## Pagination

List endpoints use cursor-based pagination. Pass these query parameters to control the results:

* `limit`: the maximum number of items to return per page, from `1` to `100`. Defaults to `50`. A page can contain fewer items than the limit.
* `cursor`: the cursor for the next page, taken from `pagination.next_cursor` in the previous response. Omit this on the first request.

Cursors are opaque strings. URL-encode them with your HTTP client's query parameter support, and keep the same filters, sorting, and workspace selection when following pages. Pagination does not provide a snapshot, so concurrent writes can change what later pages contain.

Every list response includes a `data` array and a `pagination` object:

```json theme={null}
{
  "data": [
    { "id": "..." }
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "..."
  }
}
```

* `has_more`: `true` when there are more results beyond the current page.
* `next_cursor`: the cursor to pass in your next request. `null` when there are no more results.

To fetch all results, keep requesting the next page until `has_more` is `false`. A collection that exists but has no matching items returns `200` with an empty `data` array. A missing parent resource can return `404`.

## Read consistency

Some reads are eventually consistent and can lag recent writes, for example project and member lists, workspace project counts, and project and membership data in security insights. A successful write does not guarantee that these reads immediately reflect the change. If an expected recent change is missing, retry the read with backoff and honor `Retry-After` on `429` responses. The endpoint descriptions in the reference state which reads this applies to.

## Credits and limits

The public API manages and deploys existing projects. Its current endpoints, including deployment builds, do not consume AI build credits. AI project creation and editing are available through the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md). You can cap how many AI build credits each API key can spend per calendar month when you create the key. The cap resets at 00:00 UTC on the first day of each month.

## FAQ

> **Where do I get a Lovable API key?**
>
> Create one from [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys). You need a Business or Enterprise workspace and an owner or admin role.

> **Which headers should I use?**
>
> Only `Lovable-API-Key`, with the API key you copied from Lovable, is required. Pinning `Lovable-Version` to an API version date is recommended to control upgrades. Set `Content-Type: application/json` on requests with a JSON body. See [Headers](#headers) for details and examples.

> **Is there a Postman collection for the Lovable API?**
>
> Yes. Fork the [Lovable API collection](https://www.postman.com/lovable/lovable-api/collection/q9dumeu/lovable-api) from the Postman API Network to get every endpoint, with saved example responses, in your own Postman workspace. See [Try the API in Postman](https://docs.lovable.dev/integrations/lovable-api.md#try-the-api-in-postman).

> **Can I use the key in browser code?**
>
> No. Use Lovable API keys only from trusted server-side code, scripts, or automation tools.

> **Why can't I create or build projects with the Lovable API?**
>
> The public API manages and deploys existing projects, including deployment builds through the publish endpoint. It does not expose AI project creation or editing. Use the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) to build out projects with AI from a client such as Claude or Cursor.


## Related topics

- [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md)
- [Security overview](https://docs.lovable.dev/features/security.md)
- [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md)
- [API changelog](https://docs.lovable.dev/api-reference/changelog.md)
- [Connect your app to TikTok](https://docs.lovable.dev/integrations/tiktok.md)
