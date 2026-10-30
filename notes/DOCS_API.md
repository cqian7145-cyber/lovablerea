# DOCS_API — Lovable public API surface & resource model

Scope: every page under `api-reference/` (25 endpoint specs + `introduction.md`, `changelog.md`, `events-and-hooks.md`, 4 event pages, 1 hook page) plus `integrations/lovable-api.md` and `integrations/lovable-mcp-server.md`. Facts are transcribed from those pages; `UNKNOWN` marks documented silence. Every endpoint page embeds a per-operation OpenAPI 3.1 fragment (`info.title: Lovable API`, `info.version: 2026-09-11`), so field names below are the machine contract, not prose.

---

## 1. Auth & base URL

| Item | Value | Source |
| - | - | - |
| Base URL | `https://api.lovable.dev`; all endpoints under `/v1` | `[api-reference/introduction.md]` |
| Spec hosts | `https://api.lovable.dev/v1/openapi.yaml` (per-op view query, e.g. `?view=rest`), `https://api.lovable.dev/v1/openapi.json`, `?view=webhooks` for events | `[api-reference/introduction.md]`, `[api-reference/events/project-created-v1.md]` |
| API title / version | `Lovable API`, `info.version: 2026-09-11`; `Lovable Events & Hooks` version `'1'` for webhooks | `[api-reference/changelog.md]` |
| Error contact | `info.contact: {name: Lovable Support, url: https://lovable.dev/support}` | `[api-reference/projects/get-project.md]` |

### Request headers

| Header | Required | Semantics |
| - | - | - |
| `Lovable-API-Key` | yes | workspace-scoped key, prefix `lov_` |
| `Authorization` | alt | `Bearer <key>` also accepted (OpenAPI `BearerAuth`, `bearerFormat: JWT`, "Lovable session token or OAuth access token") |
| `Lovable-Version` | recommended | stable version as `YYYY-MM-DD`; omitted = oldest supported stable version, currently `2026-09-11`; default advances only when the current default retires |
| `Accept` | no | `application/json` or `*/*`, or omitted; an `Accept` that excludes JSON returns `406` |
| `Content-Type` | no | `application/json` on JSON bodies; GET takes no body |
| `Lovable-Beta` | no | comma-separated beta revision strings layered on the stable version; response echoes `Lovable-Beta`; "There are currently no beta revisions released" |

All rows: `[api-reference/introduction.md]`. OpenAPI `securitySchemes`: `LovableAPIKey` (`type: apiKey`, `in: header`, `name: Lovable-API-Key`) and `BearerAuth` (`type: http`, `scheme: bearer`) `[api-reference/deploy-domains/publish-project.md]`.

### Key creation, plan gates, workspace scoping

* Keys are created at **Workspace settings -> API keys & OAuth -> Workspace access tokens** (`https://lovable.dev/settings/api-keys`); requires a **Business or Enterprise** plan plus an owner or admin role; the account email must be verified. Keys are for server-side use only, never browser code. `[api-reference/introduction.md]`
* A key is bound to **one workspace** and carries the `public:v1` audience, so a resource in another workspace returns `404` — identical to a nonexistent resource (deliberate existence-hiding). `[api-reference/introduction.md]`
* Keys have configurable expiry, credit caps and IP allowlists (details live outside this doc set); the per-key monthly AI credit cap resets at `00:00 UTC` on the 1st. `[api-reference/introduction.md]`
* MCP uses OAuth instead, and "API key authentication is not currently available" there; OAuth clients can be registered by owners/admins on **all** plans, but sensitive project/workspace scopes need Business+. `[integrations/lovable-mcp-server.md]`, `[integrations/lovable-api.md]`

### Scopes

`projects:read`, `projects:write`, `workspaces:read`, `workspaces:write`. Write implies the matching read; project and workspace families do not cross. Each endpoint page states its own requirement as `**Scope:** ...`, e.g. `projects:read` on `GET /v1/projects/{project_id}`. Missing scope -> `403` `insufficient_scope`. `[api-reference/introduction.md]`

### Error format

```json
{"type":"invalid_request","title":"Bad Request","status":400,
 "request_id":"4bf92f3577b34da6a3ce929d0e0e4736",
 "detail":"validation failed",
 "errors":[{"location":"body.members","message":"expected array length >= 1"}],
 "props":null}
```

All six fields always present (`detail`, `errors`, `props` null when N/A); branch on `type` (stable snake_case) never on `title`; `request_id` equals the `X-Request-Id` response header; `errors[].location` is null when unattributable; `props` carries type-specific data such as `migration_url`. `[api-reference/introduction.md]`

| Status | `type` values |
| - | - |
| `200` / `202` / `204` | success, async accepted, no body |
| `400` | `invalid_request`, `unknown_version`, `unknown_beta`, `unsupported_beta_version`, `conflicting_betas` |
| `401` | `unauthorized` |
| `402` | `payment_required` (plan gate, e.g. plan-locked analytics or `has_pii` filter) |
| `403` | `insufficient_scope`, `ip_restricted`, `forbidden`, `unsupported_extension` |
| `404` | `not_found`, plus resource types `project_not_found`, `workspace_not_found`, `member_not_found` |
| `406` | `not_acceptable` |
| `410` | `retired_version`, `retired_beta` (with `props.migration_url`) |
| `429` | `rate_limited` |
| `503` | `no_supported_version` |
| 5xx | server errors; retry with backoff |

All rows: `[api-reference/introduction.md]`; `project_not_found` `[api-reference/projects/delete-project.md]`; `member_not_found` `[api-reference/members-access/get-workspace-member.md]`.

### Rate limits, pagination, validation

* Sliding-window limits; headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (absolute Unix seconds, not a delay, may be absent); `429` plus `Retry-After` seconds when a safe delay is computable; `X-RateLimit-Remaining` recovers gradually. `[api-reference/introduction.md]`
* Buckets: one bucket per API key; session/OAuth tokens share the user's bucket with dashboard sessions; some endpoints add per-IP, per-workspace or global buckets; headers report the most constrained bucket. **Actual numeric limits: `UNKNOWN`** (not published). Version pinning does not pin rate or concurrency quotas, but payload/page/batch size limits stay versioned. `[api-reference/introduction.md]`
* Pagination: cursor only, `limit` `1..100` default `50`, `cursor` opaque and URL-encoded; envelope `{"data":[...],"pagination":{"has_more":bool,"next_cursor":string|null}}`; no snapshot isolation; empty collection -> `200` with empty `data`; missing parent -> `404`; cursors are pinned to the filter/sort/workspace set they were issued under (mismatch -> `400`). `[api-reference/introduction.md]`, `[api-reference/members-access/list-workspace-members.md]`
* Body validation is strict: unknown body property -> `400`; unknown query param names are ignored but listed in `X-Lovable-Unknown-Query-Params` (max 20 names) with `X-Lovable-Unknown-Query-Params-Omitted` counting the rest. `[api-reference/introduction.md]`
* Method semantics: `GET` safe/idempotent/no body; `POST` synchronous -> `200` (embed URL) or async -> `202` (publish), **not** guaranteed idempotent; `PATCH` partial, only sent fields change, no per-property endpoints; `DELETE` -> `204`. `[api-reference/introduction.md]`

---

## 2. Endpoint table

25 documented operations. `opId` values are the OpenAPI operation IDs.

| # | METHOD | path | `opId` | Purpose | Key params | Response |
| - | - | - | - | - | - | - |
| 1 | `GET` | `/v1/workspaces` | `listWorkspaces` | workspaces visible to the credential, ordered by join date oldest first | `limit`, `cursor` | `WorkspacePage{data[], pagination}` |
| 2 | `GET` | `/v1/workspaces/{workspace_id}` | `getWorkspace` | workspace details: plan, policies, seats, billing period, default member credit limit | path only | `Workspace` |
| 3 | `GET` | `/v1/workspaces/{workspace_id}/members` | `listWorkspaceMembers` | accepted members with roles | `limit`, `cursor`, `query`, `role[]`, `sort_by`, `sort_order`, `scim_managed` | `WorkspaceMemberPage` |
| 4 | `GET` | `/v1/workspaces/{workspace_id}/members/{user_id}` | `getWorkspaceMember` | one active member's profile + join/invite dates | path only (`user_id` UUID) | `WorkspaceMemberDetails` |
| 5 | `GET` | `/v1/workspaces/{workspace_id}/groups` | `listWorkspaceGroups` | groups sorted by name; `id` feeds `audience_targets` | `limit`, `cursor` | `WorkspaceGroupPage` |
| 6 | `GET` | `/v1/projects` | `listProjects` | projects across up to 10 workspaces, sorted `last_edited_at` desc then id asc | `workspace_id[]` (required), `visibility[]`, `is_published`, `publish_audience[]`, `query`, `limit`, `cursor` | `ProjectSummaryPage` |
| 7 | `GET` | `/v1/projects/{project_id}` | `getProject` | full project record | path only | `Project` |
| 8 | `PATCH` | `/v1/projects/{project_id}` | `updateProject` | rename, or change editor `visibility`; description is agent-generated and not writable | body `{name?, visibility?}` | `Project` |
| 9 | `DELETE` | `/v1/projects/{project_id}` | `deleteProject` | delete (trash-restorable where available, else permanent + custom domains disconnected) | path only | `204` |
| 10 | `POST` | `/v1/projects/{project_id}/embed-url` | `createEmbedUrl` | 1-hour iframe preview URL pinned to one HTTPS origin | body `{parent_origin}` (required) | `CreateEmbedURLResponse` |
| 11 | `POST` | `/v1/projects/{project_id}/publish` | `publishProject` | build + deploy; async | body `{audience?, audience_targets[]?, name?}` | `202` `Deployment` + `Location` |
| 12 | `GET` | `/v1/projects/{project_id}/publish/{deployment_id}` | `getDeployment` | poll an async publish | path only | `Deployment` |
| 13 | `PATCH` | `/v1/projects/{project_id}/publish` | `updatePublishSettings` | change published-app access without rebuilding | body `{audience?, audience_targets[]?}` | `PublishSettings` |
| 14 | `DELETE` | `/v1/projects/{project_id}/publish` | `unpublishProject` | take the app offline; retains audience/visibility | path only | `204` (also when already offline) |
| 15 | `GET` | `/v1/projects/{project_id}/collaborators` | `listProjectCollaborators` | explicit per-user grants with `access_level` | `limit`, `cursor` | `ProjectCollaboratorPage` |
| 16 | `GET` | `/v1/projects/{project_id}/analytics` | `getProjectAnalytics` | traffic time series for a published project | `starts_at`, `ends_at` (required), `granularity` (`hourly`\|`daily`) | `ProjectAnalytics{time_series{...}}` |
| 17 | `GET` | `/v1/projects/{project_id}/analytics/breakdowns` | `getProjectAnalyticsBreakdowns` | top pages / sources / devices / countries, 10 each | `starts_at`, `ends_at` | `ProjectAnalyticsBreakdowns` |
| 18 | `GET` | `/v1/projects/{project_id}/analytics/realtime` | `getProjectRealtimeAnalytics` | last 30 min in 1-min buckets + last-5-min visitors | path only | `ProjectRealtimeAnalytics` |
| 19 | `GET` | `/v1/workspaces/{workspace_id}/analytics` | `getWorkspaceAnalytics` | workspace-level traffic incl. deleted projects | `starts_at`, `ends_at`, `granularity` | `WorkspaceAnalytics` |
| 20 | `GET` | `/v1/projects/{project_id}/security-scans` | `listSecurityScans` | scans newest first | `limit`, `cursor` | `SecurityScanPage` |
| 21 | `GET` | `/v1/projects/{project_id}/security-scans/{scan_id}` | `getSecurityScan` | one scan's status/timing/requested checks | path only | `SecurityScan` |
| 22 | `GET` | `/v1/projects/{project_id}/security-scans/{scan_id}/findings` | `listSecurityScanFindings` | findings snapshot for a scan | `limit`, `cursor` | `SecurityFindingPage` |
| 23 | `GET` | `/v1/workspaces/{workspace_id}/security-center/insights` | `getSecurityInsights` | workspace summary + finding types with project counts | `review_priority[]` | `WorkspaceInsights` |
| 24 | `GET` | `/v1/workspaces/{workspace_id}/security-center/insights/projects` | `listSecurityInsightProjects` | per-project security inventory (**Enterprise**) | `limit`, `cursor`, `query`, `sort_by`, `sort_order`, `activity_group[]`, `is_published`, `visibility[]`, `has_pii`, `has_connectors`, `publish_audience[]`, `review_priority[]`, `finding_type_id[]` | `WorkspaceInsightsProjectPage` |
| 25 | `GET` | `/v1/projects/{project_id}/pii-labels` | `listPiiLabels` | personal-data findings (**Enterprise** + personal data detection enabled) | `limit`, `cursor` | `PiiLabelPage` |

Rows 1-2 and 5-25: `[api-reference/workspaces/list-workspaces.md]`, `[api-reference/workspaces/get-workspace.md]`, `[api-reference/members-access/list-workspace-groups.md]`, `[api-reference/projects/list-projects.md]`, `[api-reference/projects/get-project.md]`, `[api-reference/projects/update-project.md]`, `[api-reference/projects/delete-project.md]`, `[api-reference/projects/create-embed-url.md]`, `[api-reference/deploy-domains/publish-project.md]`, `[api-reference/deploy-domains/get-publish-status.md]`, `[api-reference/deploy-domains/update-publish-settings.md]`, `[api-reference/deploy-domains/unpublish-project.md]`, `[api-reference/members-access/list-project-collaborators.md]`, `[api-reference/analytics/get-project-analytics.md]`, `[api-reference/analytics/get-project-analytics-breakdowns.md]`, `[api-reference/analytics/get-project-realtime-analytics.md]`, `[api-reference/analytics/get-workspace-analytics.md]`, `[api-reference/security-governance/list-security-scans.md]`, `[api-reference/security-governance/get-security-scan.md]`, `[api-reference/security-governance/list-security-scan-findings.md]`, `[api-reference/security-governance/get-workspace-security-insights.md]`, `[api-reference/security-governance/list-workspace-security-project-inventory.md]`, `[api-reference/security-governance/list-personal-data-findings.md]`; rows 3-4: `[api-reference/members-access/list-workspace-members.md]`, `[api-reference/members-access/get-workspace-member.md]`.

### Per-endpoint notes worth keeping

* Every endpoint page header carries `**Plan:** Business or higher` except `listWorkspaceMembers`-adjacent PII/inventory endpoints marked `**Plan:** Enterprise`. `[api-reference/security-governance/list-personal-data-findings.md]`
* `listProjects` requires `workspace_id` (repeatable, max 10, duplicates ignored) and *any* failing workspace rejects the whole request; a workspace-scoped key may only select its own workspace. `[api-reference/projects/list-projects.md]`
* `getProjectAnalytics`/`getWorkspaceAnalytics`: ranges cap at 365 days, or 31 days when `granularity=hourly`; hourly uses the supplied instants inclusively, daily uses complete UTC calendar dates. `[api-reference/analytics/get-project-analytics.md]`
* `publishProject` returns `202` with `status: running` and null `url`/error fields, and the `Location` header points at the status route; `audience` changes apply to the currently published version immediately, before the new deployment finishes. `[api-reference/deploy-domains/publish-project.md]`
* `updatePublishSettings` answers `409` where an enforced workspace publishing policy decides publishes (route cannot make an app public in that case; `POST .../publish` with `audience: public` must be used, which also ships the latest saved version). `[api-reference/deploy-domains/update-publish-settings.md]`
* No documented endpoints for: creating projects, sending agent messages, custom-domain attach/verify, deployment history/rollback, audit logs, or webhook destination management. `UNKNOWN` across the endpoint set.
* `publish_status` is **not** a documented field anywhere in `api-reference/`; published state is expressed as `is_published` + `publish_audience` + `Deployment.status`. `[api-reference/projects/get-project.md]`, `[api-reference/deploy-domains/get-publish-status.md]`

---

## 3. Resource model

### Identifiers

| Entity | ID field | Shape / example |
| - | - | - |
| Workspace | `id`, `workspace_id` | prefixed ULID: `workspace_01jw3k9m2xq8r5v0c7d4e6f2gh` |
| Project | `id`, `project_id`, `workspace_id` | prefixed ULID: `prj_01jw3k9m2xq8r5v0c7d4e6f2gh` |
| Group | `id` | prefixed ULID: `grp_01jw3k9m2xq8r5v0c7d4e6f2gh` |
| User | `user_id`, `owner_id`, `invited_by_user_id` | bare UUID `404666c6-b533-5d2c-9768-c425bf40559b` (nonzero) |
| Deployment | `deployment_id` / `id` | bare UUID `c3d4e5f6-a7b8-9012-cdef-345678901234` |
| Security scan | `scan_id` / `id` | bare UUID `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| Commit | `latest_commit_sha` | 40-hex git SHA |

Rows: `[api-reference/projects/get-project.md]`, `[api-reference/workspaces/get-workspace.md]`, `[api-reference/members-access/list-workspace-groups.md]`, `[api-reference/deploy-domains/get-publish-status.md]`, `[api-reference/security-governance/get-security-scan.md]`. Mixed ID schemes (prefixed ULID vs bare UUID) are a clear signal of two different ID-minting layers behind one façade. `[api-reference/introduction.md]`

### Entities and relationships

```
Workspace 1--N Project          (Project.workspace_id)
Workspace 1--N WorkspaceMember  (workspace_owner|workspace_admin|workspace_editor|workspace_viewer|external_collaborator)
Workspace 1--N Group            (Group.workspace_id, Group.scim_external_id)
Group     N--N User             (Group.member_count)
Project   N--N User             (collaborators: access_level owner|admin|write|read|none)
Project   1--1 PublishedSite    (is_published, publish_audience, publish_audience_targets[])
Project   1--N Deployment       (async publish jobs, status running|completed|error|unknown)
Project   1--N SecurityScan     (scan.commit_sha pins the scanned revision)
SecurityScan 1--N SecurityFinding
Project   1--N PiiLabel
Project   1--N EdgeFunction     (WorkspaceInsightsEdgeFunction.name)
Project   1--N Connector        (names only, e.g. supabase, stripe)
```

Relationships: `[api-reference/projects/get-project.md]`, `[api-reference/members-access/list-workspace-members.md]`, `[api-reference/members-access/list-project-collaborators.md]`, `[api-reference/members-access/list-workspace-groups.md]`, `[api-reference/security-governance/list-workspace-security-project-inventory.md]`.

### Field inventory (exact names)

| Object | Fields |
| - | - |
| `Project` | `id`, `workspace_id`, `owner_id`, `name`, `description`, `visibility`, `is_published`, `publish_audience`, `publish_audience_targets[]`, `preview_url`, `latest_commit_sha`, `latest_screenshot_url`, `created_at`, `last_edited_at` (all `required`) |
| `ProjectSummary` | same minus `latest_commit_sha`/`preview_url`/`publish_audience_targets` |
| `Workspace` | `id`, `name`, `description`, `image_url`, `plan` (`free\|pro\|business\|enterprise`), `created_at`, `updated_at`, `num_projects`, `num_seats`, `billing_period_starts_at`, `billing_period_ends_at`, `default_monthly_member_credit_limit`, `default_project_visibility`, `publishing_policy` (`org_only\|workspace_only\|disabled`), `enable_pii`, `enforce_sso` |
| `WorkspaceSummary` | `id`, `name`, `description`, `image_url`, `plan`, `num_projects`, `created_at`, `updated_at` |
| `WorkspaceMember` | `user_id` (uuid), `type` (`user`), `role`, `name`, `email`, `joined_at` |
| `WorkspaceMemberDetails` | `user_id`, `workspace_id`, `type`, `role`, `name`, `email` |
| `WorkspaceGroup` | `id`, `workspace_id`, `name`, `description`, `member_count` (int64), `scim_external_id`, `created_at`, `updated_at` |
| `ProjectCollaborator` | `user_id`, `access_level` (`owner\|admin\|write\|read\|none`), `email`, `name`, `is_internal`, `is_workspace_member`, `invited_at`, `invited_by_user_id`, `accepted_at`, `last_accessed_at` |
| `Deployment` | `id`, `status`, `url`, `error_class`, `error_message` |
| `PublishSettings` | `audience` (`public\|workspace\|custom`), `audience_targets[]` of `PublishAudienceGrant{type: group\|user, id}` |
| `SecurityScan` | `id`, `status` (`running\|completed\|failed`), `started_at`, `finished_at`, `commit_sha`, `requested_scanners[]` |
| `SecurityFinding` | `id`, `scanner_name`, `status` (`open\|fixed\|ignored\|suppressed`), `level` (`error\|warn\|info`), `category`, `name`, `description`, `created_at`, `updated_at` |
| `PiiLabel` | `id`, `status` (`open\|ignored\|fixed`), `source` (`chat\|upload\|cloud_storage\|cloud_sql\|connector`), `quote`, `found_at` |
| `WorkspaceInsights` | `summary{total_projects, externally_published, workspace_members, risk}`, `findings[]`, `as_of` |
| `WorkspaceInsightsFinding` | `id`, `title`, `description`, `category` (`security\|data\|exposure\|credentials\|access\|integrations\|runtime`), `review_priority` (`needs_review\|review_recommended\|no_review_needed`), `project_count` |
| `WorkspaceInsightsProject` | `id`, `name`, `description`, `url`, `owner{display_name}`, `visibility`, `is_published`, `publish_audience`, `activity_group` (`last_14_days\|last_60_days\|older`), `edit_count`, `edits_24h`, `edits_7d`, `edits_30d`, `visitors_24h`, `visitors_7d`, `visitors_30d`, `message_count`, `review_priority`, `review_priority_explanation[]`, `connectors[]`, `edge_functions[]{name}`, `last_security_scan_at`, `matched_reason` |
| `WorkspaceInsightsStat` | `value`, `delta_30d`, `delta_window` (currently `"30 days"`) |

Rows: `[api-reference/projects/get-project.md]`, `[api-reference/projects/list-projects.md]`, `[api-reference/workspaces/get-workspace.md]`, `[api-reference/workspaces/list-workspaces.md]`, `[api-reference/members-access/list-workspace-members.md]`, `[api-reference/members-access/get-workspace-member.md]`, `[api-reference/members-access/list-workspace-groups.md]`, `[api-reference/members-access/list-project-collaborators.md]`, `[api-reference/deploy-domains/get-publish-status.md]`, `[api-reference/deploy-domains/update-publish-settings.md]`, `[api-reference/security-governance/get-security-scan.md]`, `[api-reference/security-governance/list-security-scan-findings.md]`, `[api-reference/security-governance/list-personal-data-findings.md]`, `[api-reference/security-governance/get-workspace-security-insights.md]`, `[api-reference/security-governance/list-workspace-security-project-inventory.md]`.

### Access-model notes

* Two independent access axes: **editor** access (`Project.visibility` = `restricted` | `workspace_edit` | `workspace_view`) and **published-app** access (`publish_audience` = `public` | `workspace` | `custom`). `PATCH /v1/projects/{project_id}` never changes the latter. `[api-reference/projects/update-project.md]`, `[api-reference/deploy-domains/update-publish-settings.md]`
* `restricted` = owner + invited collaborators + the workspace owner (Business/Enterprise); `workspace_view` caps workspace-role access at read while explicit project/folder/group grants still permit editing. `[api-reference/projects/get-project.md]`
* Custom audience write path accepts **only** `type: group` targets (`PublishAudienceTarget.type` enum is `[group]`, `maxItems: 100`); the read projection `PublishAudienceGrant.type` is `group|user` and additionally includes users granted via invitations/organization membership ("Users are reported but cannot yet be set through `audience_targets`"). Supplying `audience_targets` **replaces** all group and user grants and drops workspace-wide access; `[]` deletes them; organization access and email invitations from the UI are preserved. `[api-reference/deploy-domains/publish-project.md]`, `[api-reference/deploy-domains/update-publish-settings.md]`
* `external_collaborator` is a workspace-member role for users who only hold project grants; they appear in the workspace member list but are not workspace members. `[api-reference/members-access/list-workspace-members.md]`
* `listProjectCollaborators` deliberately excludes group/folder/workspace-derived access and pending email invitations; `last_accessed_at` comes from preview/project auth-token minting at session granularity. `[api-reference/members-access/list-project-collaborators.md]`

---

## 4. Webhooks / events & hooks

Contract: 4 events (`project.created.v1`, `project.published.v1`, `project.deleted.v1`, `project.workspace_transferred.v1`) and 1 hook (`message.before_submit.v1`). Destinations are configured per workspace at **Workspace settings -> Customization -> Events & Hooks**; a destination = name + HTTPS endpoint + optional bearer token + subscribed events/hooks + failure mode. Business/Enterprise only. `[api-reference/events-and-hooks.md]`

| Contract | Trigger semantics | Payload |
| - | - | - |
| `project.created.v1` | "Sent after project creation succeeds." | `UNKNOWN` |
| `project.published.v1` | "Sent after a completed deployment becomes the project's published deployment." (default-subscribed event) | `UNKNOWN` |
| `project.deleted.v1` | "Sent after deletion succeeds. With restorable deletion, this marks soft deletion; a later hard purge does not emit another event." | `UNKNOWN` |
| `project.workspace.transferred.v1` | "Sent to matching subscriptions in both the source and destination workspaces after a transfer commits. The deliveries share an event ID; `workspace_id` identifies the recipient workspace." | `workspace_id` (per doc prose); rest `UNKNOWN` |
| `message.before.submit.v1` (hook) | "Checks a user message before it is queued or sent to the agent. Includes the sender, message text, and attachments, but not conversation history." | sender/message text/attachments described in prose only; concrete JSON names `UNKNOWN` |

Rows: `[api-reference/events/project-created-v1.md]`, `[api-reference/events/project-published-v1.md]`, `[api-reference/events/project-deleted-v1.md]`, `[api-reference/events/project-workspace-transferred-v1.md]`, `[api-reference/hooks/message-before-submit-v1.md]`.

**Payload field names are genuinely undocumented.** Each event/hook page embeds a `view=webhooks` OpenAPI fragment whose only content is `openapi: 3.1.0`, `info.title: Lovable Events & Hooks`, `info.version: '1'`, `tags: [Events, Hooks]`, and `paths: {}` — no `webhooks:` map and no component schemas. Prose fragments are the only payload evidence: `workspace_id` (transfer), "event ID" shared across the two transfer deliveries, sender/message text/attachments (hook). `[api-reference/events/project-created-v1.md]`, `[api-reference/hooks/message-before-submit-v1.md]`

### Delivery, retries, signatures

| Behavior | Value |
| - | - |
| Transport | signed HTTPS `POST` to the destination endpoint; "webhooks leave Lovable through the same static IP ranges as connector requests" (IP allowlisting applies) |
| Acknowledgment | any `2xx`; response body ignored |
| Retried failures | network errors and `408`, `429`, `5xx` only |
| Retry budget | at most 8 attempts within 24 hours; first retry after 15 minutes, each wait doubles up to 8 hours |
| Timeout | 5 seconds per attempt |
| Duplicates / order | at-least-once and unordered; dedupe on `webhook-id`, which is constant across attempts; signature + timestamp refreshed per attempt |
| Signature headers | `webhook-id`, `webhook-timestamp`, `webhook-signature` — Standard Webhooks scheme; verify against the **raw** body (reserializing JSON breaks the signature) |
| Secret format | destination signing secret with `whsec_` prefix; shown once, cannot be revealed or rotated (delete + recreate to change) |
| Optional auth | destination `Bearer token` sent as `Authorization: Bearer ...` alongside the signature headers |
| No API key needed | "you don't need a Lovable API key to receive deliveries" |

All rows: `[api-reference/events-and-hooks.md]`.

### Hook response contract

| Behavior | Value |
| - | - |
| Response | HTTP `200`, `Content-Type: application/json`, body <= 64 KiB; anything else is a failure |
| Decision | `decision` = `allow` or `deny`; optional `reason` (<= 1,024 chars) shown to the blocked user instead of a generic message |
| Deadline | 5 seconds, **shared across all destinations**; hooks are never retried |
| Multiple destinations | any `deny` blocks the message; one of the deny reasons is surfaced |
| Failure mode | per-subscription **If this hook fails**: `Block submission` (default) or `Allow submission` |
| Scope limits | only project chat messages; not API/MCP, Chats, voice, project creation/remix, or edited queued messages; below Business the hook does not run; if subscriptions cannot be looked up, the message is blocked |
| Data exposure warning | hook requests carry the full message text and attachment links usable by anyone holding them for 5 minutes |

All rows: `[api-reference/events-and-hooks.md]`, `[api-reference/hooks/message-before-submit-v1.md]`.

---

## 5. MCP server

| Item | Value |
| - | - |
| Endpoint | `https://mcp.lovable.dev` |
| Transport | Streamable HTTP — clients configure `"type": "http"` / `--transport http` (no stdio transport documented) |
| Auth | OAuth only ("API key authentication is not currently available"); browser login, per-user token, calls run with the user's own permissions |
| Client registration | clients on `localhost`/`127.0.0.1` register automatically; hosted web callbacks need Lovable approval; custom OAuth clients supported (client ID + secret) |
| Known OAuth client id | `6d465f583e1e4ce5801b1616f735670c` (Cursor `auth.CLIENT_ID`) |
| SSO expiry behavior | `401` with `WWW-Authenticate: Bearer error="invalid_token"`; MCP-compliant clients restart OAuth automatically |
| Plan gate | server available on all plans; Enterprise workspaces must enable **Third-party MCP clients** (Privacy & security) first — enabled by default on Free/Pro/Business |
| Machine-readable tool reference | `https://mcp.lovable.dev/skill.md` (kept in sync with the live server); source at `github.com/lovablelabs/mcp` |
| Credit cost | `create_project` and `send_message` consume standard Lovable credits; other tools are free |

All rows: `[integrations/lovable-mcp-server.md]`.

### Tools (exact names)

| Group | Tools |
| - | - |
| Identity & workspaces | `get_me`, `list_workspaces`, `get_workspace` |
| Projects | `list_projects`, `get_project`, `create_project`, `deploy_project`, `remix_project`, `set_project_visibility`, `set_folder_visibility`, `move_projects_to_folder`, `list_template_projects`, `list_design_systems` |
| Agent interaction | `send_message`, `get_message`, `list_messages` |
| Instructions & skills | `get_workspace_knowledge`, `set_workspace_knowledge`, `get_project_knowledge`, `set_project_knowledge`, `list_workspace_skills`, `get_workspace_skill`, `create_workspace_skill`, `update_workspace_skill`, `delete_workspace_skill` |
| Code inspection | `get_diff`, `list_files`, `read_file`, `list_edits` |
| Project database | `get_database_status`, `enable_database`, `query_database` |
| Connectors | `list_connectors`, `list_connections`, `list_custom_connectors`, `list_available_connectors`, `add_connector`, `remove_connector` |
| Analytics | `get_project_analytics`, `get_project_analytics_trend` |
| File uploads | `get_file_upload_url` |
| Client-specific | `render_project_widget` (MCP Apps clients, e.g. ChatGPT), `import-claude-design-from-url` (Claude only) |

All rows: `[integrations/lovable-mcp-server.md]`.

### Documented arguments / behaviors

* `create_project`: takes `initial_message` (the build prompt), optional template or design system, and optional `workspace_id`; when `workspace_id` is omitted and several workspaces qualify the tool returns a **`WAITING`** response listing them so the caller can re-call with an explicit id. `[integrations/lovable-mcp-server.md]`
* `send_message`: `plan_mode`, `files` attachments, `wait` (default waits; `wait=false` returns immediately and the caller polls with `get_message`). `[integrations/lovable-mcp-server.md]`
* `set_project_visibility`: `private` (workspace can edit, default), `workspace_view` (Business+), `draft` (Restricted, Business+) — note these values differ from the REST `visibility` enum (`restricted`/`workspace_edit`/`workspace_view`). `[integrations/lovable-mcp-server.md]`
* `move_projects_to_folder`: up to 30 projects per call. `[integrations/lovable-mcp-server.md]`
* `get_project_analytics`: requires `start_date` and `end_date` (RFC 3339). `[integrations/lovable-mcp-server.md]`
* `deploy_project`: refuses to publish while unresolved critical security findings exist, returning `400` with type `security_critical_findings` and a `finding_refs` field naming the blockers. `[integrations/lovable-mcp-server.md]`
* `query_database`: full read/write/schema SQL; `CREATE EXTENSION` outside the supported PostgreSQL extension set is refused; `enable_database` provisioning takes 30-60 seconds. `[integrations/lovable-mcp-server.md]`
* `add_connector` does not add anything programmatically — it returns the dashboard URL (connectors are always added through the UI). `[integrations/lovable-mcp-server.md]`
* Debugging: run `tools/list` to confirm the connection. `[integrations/lovable-mcp-server.md]`

---

## 6. Cross-cutting observations

**Async publish pipeline.** `POST /v1/projects/{project_id}/publish` is the only `202` in the API. It returns a `Deployment` with `status: running`, `url: null`, `error_class: null`, `error_message: null`, plus a `Location` header; the client polls `GET /v1/projects/{project_id}/publish/{deployment_id}`, no more than once every 2 seconds. The job state machine is `running` -> `completed` (then `url` is set) | `error` | `unknown`; `unknown` explicitly means "the deployment exists but its workflow state has no recognized public mapping" — i.e. an internal orchestration engine (workflow/temporal-style) leaking through a mapping layer. Unknown or mismatched deployment IDs return `404`. `[api-reference/deploy-domains/publish-project.md]`, `[api-reference/deploy-domains/get-publish-status.md]`

**Failure taxonomy encodes pipeline stages.** `error_class` enum: `transient` (retry with backoff), `code` (fix app code or SQL), `configuration` (fix committed config, "such as an oversized file"), `data` (review migration against production data, needs human approval), `integration` (external credentials/quota/service), `policy` (workspace admin must lift blocking policy or approve), `internal` (contact support), plus `null`. This is a build-and-migrate pipeline: bundling/config validation, SQL migration against prod, third-party integration checks, and org policy evaluation are distinct failure domains. `[api-reference/deploy-domains/get-publish-status.md]`

**Publish is gated from two directions.** (a) Workspace `publishing_policy` (`org_only` | `workspace_only` | `disabled`) — an enforced policy makes `PATCH .../publish` answer `409`, forcing a real publish (which ships the latest saved version) to widen access; (b) security — `deploy_project` refuses with `400` `security_critical_findings` + `finding_refs`, and insights classify "publicly published projects with error-level security findings" as `public_security_exposure`. `[api-reference/deploy-domains/update-publish-settings.md]`, `[integrations/lovable-mcp-server.md]`, `[api-reference/security-governance/get-workspace-security-insights.md]`

**Publish artifact naming.** `PublishProjectRequest.name` is a slug for the managed URL: `acme-landing-page` -> `https://acme-landing-page.lovable.app`; custom domains and workspace branding can change the hostname. Project `preview_url` is a *stable* per-project address (`https://id-preview--<uuid>.lovable.app`) that always serves the latest successful preview build, "not pinned to a commit or draft", carries no auth token, and requires a Lovable login unless the project is publicly remixable. Screenshots are served from `https://screenshot2.lovable.dev/...`. `[api-reference/deploy-domains/publish-project.md]`, `[api-reference/projects/get-project.md]`

**Embedding is a scoped capability token, not a share link.** `POST /v1/projects/{project_id}/embed-url` with `parent_origin` (HTTPS origin, lowercase hostname, no port/path/query/fragment) mints `embed_url` valid for one hour, loadable in an iframe on exactly that origin, no Lovable login, showing the built preview only (never the editor or the published app). `[api-reference/projects/create-embed-url.md]`

**Security scan lifecycle.** Scans are per-commit artifacts (`commit_sha` captured "when the scan started") with `requested_scanners[]`, `status` `running|completed|failed`, `started_at`/`finished_at`. Findings are a *snapshot* that reuses results from earlier scans and includes `fixed`/`ignored` items, ordered by `scanner_name` ascending, produced by named scanners (e.g. `agent_security`), graded `error|warn|info`, and carry `status` `open|fixed|ignored|suppressed` where `suppressed` means "every deep-scan check the finding cites is turned off for the project: hidden, not resolved". `completed` explicitly does not mean clean. This implies a scanning subsystem with individually toggleable deep-scan checks and per-scan result reuse/dedup. `[api-reference/security-governance/list-security-scans.md]`, `[api-reference/security-governance/list-security-scan-findings.md]`, `[api-reference/security-governance/get-security-scan.md]`

**Governance is a separate scored projection.** Workspace insights expose *finding types* (stable `id` such as `public_security_exposure`, `public_pii_exposure`) with `project_count`, a `review_priority` (`needs_review`/`review_recommended`/`no_review_needed`), and per-project `review_priority_explanation[]` reasons carrying `values` counts. Counts across types overlap and must not be summed; projects can appear under several types; `as_of` timestamps freshness and is explicitly *not* a scan completion time; per-project inventory adds `activity_group` buckets, `edits_24h/7d/30d`, `visitors_24h/7d/30d`, `last_security_scan_at`, `connectors[]`, `edge_functions[]`, and `message_count` defined as "Agent message usage charged to credit funds for this project during the current UTC calendar month" — i.e. a precomputed materialized-risk/activity store, refreshed on its own cadence. `[api-reference/security-governance/get-workspace-security-insights.md]`, `[api-reference/security-governance/list-workspace-security-project-inventory.md]`

**Analytics backing store.** Session/pageview model with derived metrics (`visitors`, `pageviews`, `pageviews_per_visit`, `bounce_rate`, `session_duration`) returned as `TimeSeriesGroup` of `TimeSeriesData{label, total, data[{timestamp, value}]}`; breakdowns are top-10 `{label, visitors}` for `pages`/`sources`/`devices`/`countries` with synthetic `Direct` and `Unknown` labels; realtime is 1-minute buckets over 30 minutes plus `current_visitors` for the last 5 minutes. Constraints reveal the store: 365-day maximum range, 31-day cap at hourly granularity, and "some projects retain analytics for 90 days; older buckets are returned with zero values" (retention is per-project/plan). Workspace analytics "includes historical traffic from projects that have since been deleted" and covers the range without pagination, so aggregates are keyed at workspace level, not just per project. Visitor uniqueness is bucket-scoped ("counted once per time bucket ... a session active in multiple buckets is counted more than once"). `[api-reference/analytics/get-project-analytics.md]`, `[api-reference/analytics/get-project-analytics-breakdowns.md]`, `[api-reference/analytics/get-project-realtime-analytics.md]`, `[api-reference/analytics/get-workspace-analytics.md]`

**Eventual consistency is systemic, not incidental.** Documented as lagging for project lists, member lists, `Workspace.num_projects`, security inventory project/membership data, and member detail reads; the API tells clients to retry with backoff and honor `Retry-After`. Combined with cursor pagination that "does not provide a snapshot", the read path is clearly served from caches/read models asynchronously projected from the writes. `[api-reference/introduction.md]`, `[api-reference/workspaces/get-workspace.md]`, `[api-reference/members-access/get-workspace-member.md]`

**Idempotency is ad hoc, not header-based.** No `Idempotency-Key` header exists anywhere in the docs; `POST` is explicitly "not guaranteed to be idempotent" and retries may repeat the action. Safety is instead pushed onto semantics: `DELETE .../publish` returns `204` whether or not the app was online, and a repeat `DELETE /v1/projects/{id}` returns `404 project_not_found`, which clients are told to treat as success. `[api-reference/introduction.md]`, `[api-reference/deploy-domains/unpublish-project.md]`, `[api-reference/projects/delete-project.md]`

**Deletion is soft-then-purge.** Where trash exists the project is restorable from the editor; otherwise deletion is permanent and "custom domains are disconnected immediately"; the `project.deleted.v1` event marks soft deletion and the later hard purge emits nothing. `[api-reference/projects/delete-project.md]`, `[api-reference/events/project-deleted-v1.md]`

**Credential model is layered.** One REST surface with two auth schemes (workspace API keys bound to one workspace with `public:v1` audience, and OAuth/session bearer tokens whose subject is a user UUID), a legacy workspace-role vocabulary still accepted as aliases (`owner`, `admin`, `editor`, `member`, `viewer`, `collaborator` map onto `workspace_*` values), and SCIM provisioning detectable via `scim_external_id` / `scim_managed`. `[api-reference/introduction.md]`, `[api-reference/members-access/list-workspace-members.md]`, `[api-reference/members-access/list-workspace-groups.md]`

**Spec packaging quirk.** Each endpoint page embeds only that operation plus the schemas it touches, so cross-file `$ref`s (e.g. `Pagination` in `list-security-scan-findings.md`) are dangling inside a single page but resolved in the merged published spec. Treat any single page as a projection, not the full contract. `[api-reference/security-governance/list-security-scan-findings.md]`

---

## Gaps (documented silence)

* Numeric rate limits / quotas: `UNKNOWN` (only header semantics are documented). `[api-reference/introduction.md]`
* Event and hook JSON payload field names: `UNKNOWN` (webhook OpenAPI fragments contain `paths: {}` and no schemas). `[api-reference/events/project-created-v1.md]`
* Custom domain CRUD/verification endpoints: `UNKNOWN` (domains only appear as prose side effects of publish/delete). `[api-reference/projects/delete-project.md]`
* Project creation, agent message send, deployment history/rollback, audit log, webhook-destination management via REST: `UNKNOWN`. `[api-reference/events-and-hooks.md]`
