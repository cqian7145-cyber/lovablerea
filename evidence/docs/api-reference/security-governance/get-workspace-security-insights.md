# Get workspace security insights
<!-- source: https://docs.lovable.dev/api-reference/security-governance/get-workspace-security-insights.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Get workspace security insights

> **Plan:** `Business or higher`

**Scope:** `workspaces:read`

Prioritize security reviews across your workspace. Findings include public apps with security errors, unresolved personal data detections, projects shared with external collaborators, and projects whose owner is no longer an active workspace member.

Returns workspace project and membership counts, project review priorities, and finding types with matching project counts. Requires Security Center access. The review_priority filter applies only to findings; summary counts remain workspace-wide. Finding types requiring personal data detection access are omitted when that feature is unavailable. Project and membership data is eventually consistent and may not immediately reflect recent changes.



## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=rest get /v1/workspaces/{workspace_id}/security-center/insights
openapi: 3.1.0
info:
  contact:
    name: Lovable Support
    url: https://lovable.dev/support
  description: >-
    **Media types:** the `public:v1` endpoints in this reference return
    `application/json` when the response has a body. Send `Accept:
    application/json`, send `Accept: */*`, or omit the header. An `Accept`
    header that excludes JSON returns HTTP `406` with `type: not_acceptable`.


    ## Authentication


    Send your API key in the `Lovable-API-Key` header, or as `Authorization:
    Bearer <key>`. Keys are created at `lovable.dev/settings/api-keys`; see
    https://docs.lovable.dev/integrations/api-ref-intro for plans and setup. A
    key is bound to one workspace and carries the `public:v1` audience, so a
    resource in another workspace returns `404`, the same as a resource that
    does not exist.


    ## Scopes


    A key is granted one or more scopes when it is created: `projects:read`,
    `projects:write`, `workspaces:read`, `workspaces:write`. A write scope
    includes the matching read scope (`projects:write` covers `projects:read`,
    `workspaces:write` covers `workspaces:read`); nothing carries across the
    project and workspace families. The scope follows the resource an operation
    acts on, not its section in this reference: listing the projects of a
    workspace is a workspace read.


    Every operation states the scope it requires in its **Scope** line; `none`
    means any valid key. A key without that scope receives `403` with `type:
    insufficient_scope`.


    ## Pagination


    List operations take `limit` and `cursor` and return `data` plus
    `pagination.next_cursor` and `pagination.has_more`; pass `next_cursor` as
    `cursor` to fetch the next page. Cursors are opaque, and a cursor the
    operation cannot decode returns `400`. An existing collection with no
    matching results returns `200` with an empty `data` array. A missing parent
    resource returns `404`, not an empty collection.


    ## Read consistency


    Some reads are eventually consistent: project, member, and invitation lists,
    workspace project counts, and project and membership data in security
    insights may not immediately reflect recent changes. A successful write does
    not guarantee that these reads will immediately show the change. If a recent
    change is missing, retry the read with backoff and honor `Retry-After` on
    `429` responses.


    ## Errors


    Every error response includes `type`, `title`, `status`, `request_id`,
    `detail`, `errors`, and `props`. The diagnostic fields `detail`, `errors`,
    and `props` are `null` when inapplicable; they are never omitted.


    Validation failures return `400 invalid_request`, `detail: "validation
    failed"`, and an `errors` array with the actionable messages. Each field
    error includes `message` and `location`; `location` is `null` when the
    failure cannot be attributed to a field. Other errors preserve their own
    types. For example, a malformed `Lovable-Version` is `invalid_request`,
    while a well-formed but unreleased date is `unknown_version` with `detail:
    null` and `errors: null`. The same HTTP status does not imply the same error
    type or diagnostics.


    `detail` may also provide human-readable guidance, such as re-authentication
    instructions for an SSO error. `props` is an error-specific metadata object.
    Its keys depend on `type`; clients should ignore unrecognized keys. Examples
    of populated metadata:


    | `type` | `props` shape and meaning |

    | --- | --- |

    | `payment_required` | Plan gates include `required_plan`, the minimum tier
    (`pro`, `business`, or `enterprise`). Feature gates instead include
    `required_features`, an array of feature permission identifiers, all
    required. For example, `{"required_plan":"business"}`. Other payment
    failures may have neither. |

    | `forbidden` | Permission gates include `required_permissions`, an array of
    alternative permission sets. All permissions in any one set satisfy that
    gate. For example, `[["project:edit"]]` requires that permission;
    `[["a","b"],["c"]]` requires both a and b, or c. Other denials may have no
    requirement metadata. |

    | `insufficient_scope` | `required_scopes`: an array of acceptable
    credential scopes; any one satisfies the failed scope check. A write scope
    also covers the corresponding read scope. For example,
    `{"required_scopes":["projects:write"]}`. |

    | `security_critical_findings` | `finding_refs`: an array of strings
    identifying security findings that block publishing, for example
    `{"finding_refs":["supabase/finding-1"]}`. |

    | `retired_version`, `retired_beta` | `migration_url`: a string URL linking
    the migration guide, when one is available. |


    Requirement metadata describes the failed check, not every condition for an
    operation. Other checks may still reject the request. Permission and feature
    identifiers describe effective access, not a required workspace role;
    contact a workspace administrator to obtain access. Identifiers may be added
    over time. Internal-only requirements and concealed-resource responses do
    not disclose access requirements.


    `type` is a stable snake_case token such as `insufficient_scope` or
    `rate_limited`, never a URI. Branch on it, not on `title`, whose wording may
    change; new types are additive. `status` echoes the HTTP status code.
    `request_id` matches the `X-Request-Id` response header; include it when
    reporting a problem.


    Each documented operation has an operational processing deadline (60 seconds
    by default), including authentication and storage access. This operational
    limit may change. If the response is not ready by then, the API returns `503
    request_timeout`. This means the response wait expired, not that a mutation
    was rolled back: it may still complete. Check resource state before retrying
    mutations. Already accepted asynchronous operations continue independently
    of this deadline.


    ## Long-running operations


    Publishing returns before the deployment finishes: `POST
    /v1/projects/{project_id}/publish` returns `202` with the deployment `id`;
    poll `GET /v1/projects/{project_id}/publish/{deployment_id}` until `status`
    is `completed` (with `url`) or `error` (with `error_message`). Terminal
    values differ per resource and new values may be added, so treat the
    `status` enum on each response schema as the source of truth. Poll no more
    than once every 2 seconds, back off toward 10 seconds while the job is not
    terminal, and always honor `Retry-After` on `429`.


    ## Rate limits


    Published rate quotas are standard defaults, not guaranteed throughput.
    Account overrides and additional abuse or service-protection limits may
    apply. Request rate and concurrency quotas can change independently of API
    versions; pinning `Lovable-Version` does not pin quotas. Planned reductions
    receive advance notice and honor existing customer commitments. Urgent
    protection measures can take effect immediately. Limits on a valid request,
    such as payload size, page size, and batch size, remain part of the
    versioned contract.


    Responses include `X-RateLimit-Limit` (the request limit) and
    `X-RateLimit-Remaining` (requests still available) when a rate limit could
    be evaluated. When known, `X-RateLimit-Reset` is a Unix timestamp in seconds
    indicating when capacity next becomes available. It is an absolute time, not
    a delay. On a `429` response, `Retry-After` is the number of seconds to wait
    before retrying, when that delay can be computed.


    Requests authenticated with an API key draw from a general limit **per
    key**. Session and OAuth requests share the user's general limit with that
    user's Lovable sessions. Additional limits may apply to an operation, API
    key, IP address, workspace, or all callers. A workspace's plan can affect
    the limits for its users. When several limits apply, all three
    `X-RateLimit-*` headers describe the same limit: the one closest to
    exhaustion.


    Limits use a sliding window. Remaining capacity reflects all requests
    counted during that window and recovers as older requests leave it. It can
    drop by more than one between calls when other traffic shares the same
    limit.


    ## Security findings pagination


    GET /v1/projects/{project_id}/security-scans/{scan_id} returns scan
    metadata. Integrations that read its findings array must switch to GET
    /v1/projects/{project_id}/security-scans/{scan_id}/findings. Each page
    contains data and pagination. The default limit is 50 findings, with a
    maximum of 100. Pass pagination.next_cursor as cursor until
    pagination.has_more is false to retrieve the complete snapshot, including
    fixed and ignored findings.


    ## API versions


    Stable versions are dated YYYY-MM-DD. Send `Lovable-Version: 2026-09-11` to
    pin a request to a stable version. Omit the header to get the oldest
    supported stable version, currently `2026-09-11`. That default advances only
    when the version retires, so pin the version explicitly to control upgrades.
    Every response produced after version selection echoes the version in the
    `Lovable-Version` response header.


    Supported stable versions: `2026-09-11`.


    `Lovable-Beta` opts a request into comma-separated beta revisions on top of
    the stable version. Selected revisions are echoed in the `Lovable-Beta`
    response header. No beta revisions are currently released.


    A request whose headers cannot be resolved fails with the error envelope and
    one of these types:


    | HTTP | `type` | Cause |

    | --- | --- | --- |

    | 400 | `invalid_request` | `Lovable-Version` is not exactly one YYYY-MM-DD
    value; `errors[].location` is `header.Lovable-Version`. |

    | 400 | `unknown_version` | The date is not a released stable version. |

    | 410 | `retired_version` | The stable version has retired; `migration_url`
    links the migration guide. |

    | 400 | `invalid_request` | `Lovable-Beta` is empty, too long, or not
    comma-separated strings; `errors[].location` is `header.Lovable-Beta`. |

    | 400 | `unknown_beta` | A beta string is not released. |

    | 410 | `retired_beta` | A beta revision has retired; `migration_url` links
    the migration guide. |

    | 400 | `unsupported_beta_version` | A beta revision does not support the
    selected stable version. |

    | 400 | `conflicting_betas` | Two revisions of one beta feature, or
    incompatible beta strings, were selected together. |

    | 503 | `no_supported_version` | No stable version is currently supported. |
  termsOfService: https://lovable.dev/terms
  title: Lovable API
  version: '2026-09-11'
servers:
  - description: Production
    url: https://api.lovable.dev
security:
  - LovableAPIKey: []
  - BearerAuth: []
tags:
  - description: Workspaces the caller belongs to, and their settings.
    name: workspaces
    x-group: Workspaces
  - description: Workspace members, groups, and project collaborators.
    name: members-access
    x-group: Members & access
  - description: Create, read, update, and delete projects.
    name: projects
    x-group: Projects
  - description: Publish and deploy projects.
    name: deploy-domains
    x-group: Deploy & domains
  - description: >-
      Security scans, findings about personally identifiable information (PII),
      and workspace security insights.
    name: security-governance
    x-group: Security & governance
  - description: Published-project and workspace analytics.
    name: analytics
    x-group: Analytics
paths:
  /v1/workspaces/{workspace_id}/security-center/insights:
    get:
      tags:
        - security-governance
      summary: Get workspace security insights
      description: >-
        **Plan:** `Business or higher`


        **Scope:** `workspaces:read`


        Prioritize security reviews across your workspace. Findings include
        public apps with security errors, unresolved personal data detections,
        projects shared with external collaborators, and projects whose owner is
        no longer an active workspace member.


        Returns workspace project and membership counts, project review
        priorities, and finding types with matching project counts. Requires
        Security Center access. The review_priority filter applies only to
        findings; summary counts remain workspace-wide. Finding types requiring
        personal data detection access are omitted when that feature is
        unavailable. Project and membership data is eventually consistent and
        may not immediately reflect recent changes.
      operationId: getSecurityInsights
      parameters:
        - description: ID of the workspace to retrieve security insights for.
          example: workspace_01jw3k9m2xq8r5v0c7d4e6f2gh
          in: path
          name: workspace_id
          required: true
          schema:
            description: ID of the workspace to retrieve security insights for.
            examples:
              - workspace_01jw3k9m2xq8r5v0c7d4e6f2gh
            type: string
        - description: >-
            Filter finding types by review priority. Repeat to include any of
            the specified priorities; omit to include all. Only findings are
            filtered; summary counts remain workspace-wide.
          example:
            - needs_review
          explode: true
          in: query
          name: review_priority
          schema:
            description: >-
              Filter finding types by review priority. Repeat to include any of
              the specified priorities; omit to include all. Only findings are
              filtered; summary counts remain workspace-wide.
            examples:
              - - needs_review
            items:
              enum:
                - needs_review
                - review_recommended
                - no_review_needed
              type: string
            type: array
        - $ref: '#/components/parameters/LovableVersion'
        - $ref: '#/components/parameters/LovableBeta'
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WorkspaceInsights'
                description: >-
                  Workspace security insights with project and membership
                  counts, review priorities, and finding types.
          description: OK
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '400':
          content:
            application/json:
              example:
                detail: validation failed
                errors:
                  - location: body.members
                    message: expected array length >= 1
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 400
                title: Bad Request
                type: invalid_request
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            The request body or parameters are malformed or fail validation.
            Each failing field is listed in errors.
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '401':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 401
                title: Authorization header required
                type: unauthorized
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: Missing or invalid API key, session token, or OAuth access token.
          headers:
            WWW-Authenticate:
              description: >-
                Authentication challenge identifying the supported
                authentication scheme.
              example: Bearer
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '402':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 402
                title: You need to upgrade your plan to access this feature
                type: payment_required
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            Public API access requires Business or higher. Some operations or
            configurations require an additional feature entitlement.
          headers:
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '403':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 403
                title: You don't have the permissions to perform this action
                type: forbidden
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            The key or caller lacks the required scope or permission. For
            email_not_verified, verify the account email before retrying.
          headers:
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '404':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 404
                title: Not Found
                type: workspace_not_found
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            The workspace does not exist, has been deleted, or is outside the
            credential's workspace scope.
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '406':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 406
                title: >-
                  This endpoint produces application/json. Send a matching
                  Accept header, */*, or omit the header.
                type: not_acceptable
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: The Accept header excludes every media type this endpoint produces.
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '429':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 429
                title: Too Many Requests
                type: rate_limited
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            Too many requests. Retry after the interval in Retry-After when
            present.
          headers:
            Retry-After:
              description: >-
                Seconds to wait before retrying. Present when the limiter can
                compute a retry delay.
              schema:
                minimum: 1
                type: integer
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        '503':
          content:
            application/json:
              example:
                detail: null
                errors: null
                props: null
                request_id: 4bf92f3577b34da6a3ce929d0e0e4736
                status: 503
                title: Request timed out
                type: request_timeout
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            The service is temporarily unavailable, or the processing deadline
            expired (request_timeout). A mutation may still complete; check
            resource state before retrying.
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
        default:
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
          description: >-
            Error. The response body uses the standard error envelope; status
            matches the HTTP status code and type is a machine-readable error
            code.
          headers:
            Lovable-Beta:
              description: >-
                Beta revisions applied to the request, comma-separated. Present
                only when the request selected beta revisions.
              schema:
                type: string
            Lovable-Version:
              description: >-
                Stable API version that served the request. Absent when the
                request was rejected before version selection or when selection
                itself failed.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params:
              description: >-
                Present only when the request carried query parameters this
                operation does not declare. Comma-separated, URL-escaped names
                of the ignored parameters, at most 20.
              schema:
                type: string
            X-Lovable-Unknown-Query-Params-Omitted:
              description: >-
                Present with X-Lovable-Unknown-Query-Params when more than 20
                unknown parameters were ignored. Number of names left out of
                that header.
              schema:
                minimum: 1
                type: integer
            X-RateLimit-Limit:
              description: >-
                Maximum requests per time window for the rate limit closest to
                exhaustion. All three X-RateLimit headers describe that same
                limit.
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: >-
                Requests still available under the limit described by
                X-RateLimit-Limit.
              schema:
                type: integer
            X-RateLimit-Reset:
              description: >-
                Unix timestamp in seconds when the limit described by
                X-RateLimit-Limit next regains capacity. Omitted when unknown.
              schema:
                type: integer
            X-Request-Id:
              description: >-
                Identifier of this request. Matches request_id in the error
                envelope; quote it when reporting a failure.
              schema:
                type: string
      security:
        - LovableAPIKey:
            - workspaces:read
        - BearerAuth:
            - workspaces:read
      x-codeSamples:
        - label: cURL
          lang: bash
          source: |-
            curl --request GET \
              --url 'https://api.lovable.dev/v1/workspaces/workspace-id/security-center/insights' \
              --header 'Lovable-API-Key: lov_your-api-key' \
              --header 'Lovable-Version: 2026-09-11'
        - label: JavaScript
          lang: javascript
          source: >-
            const response = await
            fetch("https://api.lovable.dev/v1/workspaces/workspace-id/security-center/insights",
            {
              method: "GET",
              headers: {
                "Lovable-API-Key": process.env.LOVABLE_API_KEY ?? "lov_your-api-key",
                "Lovable-Version": "2026-09-11",
              },
            });

            if (!response.ok) {
              throw new Error(`Lovable API ${response.status}: ${await response.text()}`);
            }

            console.log(await response.json());
components:
  parameters:
    LovableVersion:
      description: >-
        Stable API version to serve, as a YYYY-MM-DD date. Omit for the oldest
        supported stable version, currently 2026-09-11.
      example: '2026-09-11'
      in: header
      name: Lovable-Version
      schema:
        type: string
    LovableBeta:
      description: >-
        Comma-separated beta revision strings to enable on top of the stable
        version.
      in: header
      name: Lovable-Beta
      schema:
        type: string
  schemas:
    WorkspaceInsights:
      properties:
        as_of:
          description: >-
            Timestamp indicating the freshness of workspace review-priority
            data. Individual projects may have newer results. Null when
            unavailable. This is not a security scan completion time.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
        findings:
          description: >-
            Finding types and their matching project counts, including types
            with zero matches, ordered by higher review priority first. Related
            conditions may be combined under a more specific finding. A project
            can appear under multiple finding types. Types requiring personal
            data detection access are left out when that feature is unavailable.
            Empty when no types are included.
          examples:
            - - category: exposure
                description: >-
                  Publicly published projects with error-level security
                  findings.
                id: public_security_exposure
                project_count: 12
                review_priority: needs_review
                title: Public app with security errors
          items:
            $ref: '#/components/schemas/WorkspaceInsightsFinding'
          type: array
        summary:
          $ref: '#/components/schemas/WorkspaceInsightsSummary'
          description: >-
            Workspace project counts, membership counts, and project review
            priorities.
      required:
        - summary
        - findings
        - as_of
      type: object
    ErrorResponse:
      description: >-
        Common error response. An operation may document a different response
        body for a specific status code, such as per-member results for a bulk
        credit-limit update.
      properties:
        detail:
          description: >-
            Human-readable guidance for this occurrence, or null when
            inapplicable. For invalid_request this is validation failed; the
            actionable field messages are in errors. Other error types may
            provide guidance such as re-authentication instructions.
          example: validation failed
          type:
            - string
            - 'null'
        errors:
          description: >-
            Field-level error details on validation failures; null when no
            field-level details apply.
          example:
            - location: body.workspace_id
              message: expected string
          items:
            properties:
              location:
                description: >-
                  Request field that failed validation, such as
                  body.workspace_id or query.limit; null when the failure has no
                  field location.
                example: body.workspace_id
                type:
                  - string
                  - 'null'
              message:
                description: Explanation of the validation failure for this field.
                example: expected string
                type: string
            required:
              - location
              - message
            type: object
          type:
            - array
            - 'null'
        props:
          description: >-
            Error-specific metadata, or null when inapplicable. Keys depend on
            type: security_critical_findings includes finding_refs (an array of
            strings); retired_version and retired_beta may include migration_url
            (a string URL). Ignore unrecognized keys.
          example:
            finding_refs:
              - supabase/finding-1
          type:
            - object
            - 'null'
        request_id:
          description: >-
            Identifier of this request, echoed from the X-Request-Id response
            header. Quote it when reporting a failure.
          example: 4bf92f3577b34da6a3ce929d0e0e4736
          type: string
        status:
          description: HTTP status code, echoed in the body.
          example: 429
          type: integer
        title:
          description: >-
            Human-readable error summary. The wording may change; use type to
            decide how your application handles the error.
          example: Too Many Requests
          type: string
        type:
          description: >-
            Stable machine-readable error type: a snake_case token such as
            rate_limited, not a URI. Clients may switch on it; new types are
            additive.
          example: rate_limited
          type: string
      required:
        - type
        - title
        - status
        - request_id
        - detail
        - props
        - errors
      type: object
    WorkspaceInsightsFinding:
      properties:
        category:
          description: >-
            Finding category. More values may be added; clients must tolerate
            unknown values.
          enum:
            - security
            - data
            - exposure
            - credentials
            - access
            - integrations
            - runtime
          examples:
            - exposure
          type: string
        description:
          description: Explanation of the condition represented by this finding type.
          examples:
            - Publicly published projects with error-level security findings.
          type: string
        id:
          description: >-
            Stable identifier for the finding type. Use as finding_type_id on
            GET /v1/workspaces/{workspace_id}/security-center/insights/projects
            to list matching projects; that endpoint requires Enterprise.
          examples:
            - public_security_exposure
          type: string
        project_count:
          description: >-
            Number of distinct projects represented by this finding type. Counts
            across finding types can overlap and must not be summed to obtain a
            unique project total.
          examples:
            - 12
          format: int64
          type: integer
        review_priority:
          description: >-
            Review priority assigned to this finding type. May differ from an
            individual scan finding's severity, its UI badge, or a project's
            overall review priority. More values may be added; clients must
            tolerate unknown values.
          enum:
            - needs_review
            - review_recommended
            - no_review_needed
          examples:
            - needs_review
          type: string
        title:
          description: >-
            Short display name for the finding type. Use id for programmatic
            matching.
          examples:
            - Public app with security errors
          type: string
      required:
        - id
        - review_priority
        - category
        - title
        - description
        - project_count
      type: object
    WorkspaceInsightsSummary:
      properties:
        externally_published:
          $ref: '#/components/schemas/WorkspaceInsightsStat'
          description: >-
            Projects currently published for public access. Excludes privately
            published projects shared with selected external viewers. delta_30d
            counts currently public projects created within the last 30 days,
            not publication events.
        risk:
          $ref: '#/components/schemas/WorkspaceInsightsReviewPriority'
          description: >-
            Project counts grouped by review priority. Projects without a
            calculated priority are excluded, so these counts may total less
            than total_projects.value.
        total_projects:
          $ref: '#/components/schemas/WorkspaceInsightsStat'
          description: >-
            Projects currently in the workspace, excluding deleted projects.
            delta_30d counts those created within the last 30 days.
        workspace_members:
          $ref: '#/components/schemas/WorkspaceInsightsStat'
          description: >-
            Current active workspace members, excluding pending invitations.
            delta_30d counts current members who joined within the last 30 days;
            members who subsequently left are excluded.
      required:
        - total_projects
        - externally_published
        - risk
        - workspace_members
      type: object
    WorkspaceInsightsStat:
      properties:
        delta_30d:
          description: >-
            Number of items in the current count that were created or joined
            within the last 30 days, as defined by the metric. This is not a net
            change from the count 30 days ago.
          examples:
            - 3
          format: int64
          type: integer
        delta_window:
          description: >-
            Display label for the reporting period used by delta_30d. Currently
            "30 days".
          examples:
            - 30 days
          type: string
        value:
          description: Current count for this metric.
          examples:
            - 42
          format: int64
          type: integer
      required:
        - value
        - delta_30d
        - delta_window
      type: object
    WorkspaceInsightsReviewPriority:
      properties:
        needs_review:
          description: >-
            Projects assigned high review priority, shown as "High" in Security
            Center.
          examples:
            - 3
          format: int64
          type: integer
        no_review_needed:
          description: >-
            Projects assigned low review priority, shown as "Low" in Security
            Center. This classification does not guarantee that a project has no
            security issues.
          examples:
            - 12
          format: int64
          type: integer
        review_recommended:
          description: >-
            Projects assigned medium review priority, shown as "Medium" in
            Security Center.
          examples:
            - 5
          format: int64
          type: integer
      required:
        - needs_review
        - review_recommended
        - no_review_needed
      type: object
  securitySchemes:
    LovableAPIKey:
      description: Lovable API key. Send its value in the Lovable-API-Key header.
      in: header
      name: Lovable-API-Key
      type: apiKey
    BearerAuth:
      bearerFormat: JWT
      description: >-
        Lovable session token or OAuth access token. Send it in the
        Authorization header as Bearer <token>.
      scheme: bearer
      type: http

````

## Related topics

- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [Insights](https://docs.lovable.dev/features/insights.md)
- [Get workspace](https://docs.lovable.dev/api-reference/workspaces/get-workspace.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
