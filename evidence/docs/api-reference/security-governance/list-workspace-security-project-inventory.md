# List workspace security project inventory
<!-- source: https://docs.lovable.dev/api-reference/security-governance/list-workspace-security-project-inventory.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# List workspace security project inventory

> **Plan:** `Enterprise`

**Scope:** `workspaces:read`

Returns workspace projects with review priorities, security finding counts, activity counts, and publishing details. Use GET /v1/projects/{project_id}/security-scans/{scan_id}/findings for individual findings. Supports search and filters. By default, projects are ordered by most recently edited, or search relevance when query is set. Project and membership data is eventually consistent and may not immediately reflect recent changes.



## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=rest get /v1/workspaces/{workspace_id}/security-center/insights/projects
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
  /v1/workspaces/{workspace_id}/security-center/insights/projects:
    get:
      tags:
        - security-governance
      summary: List workspace security project inventory
      description: >-
        **Plan:** `Enterprise`


        **Scope:** `workspaces:read`


        Returns workspace projects with review priorities, security finding
        counts, activity counts, and publishing details. Use GET
        /v1/projects/{project_id}/security-scans/{scan_id}/findings for
        individual findings. Supports search and filters. By default, projects
        are ordered by most recently edited, or search relevance when query is
        set. Project and membership data is eventually consistent and may not
        immediately reflect recent changes.
      operationId: listSecurityInsightProjects
      parameters:
        - description: Workspace ID.
          example: workspace_01jw3k9m2xq8r5v0c7d4e6f2gh
          in: path
          name: workspace_id
          required: true
          schema:
            description: Workspace ID.
            examples:
              - workspace_01jw3k9m2xq8r5v0c7d4e6f2gh
            type: string
        - description: Maximum number of items to return per page.
          example: 50
          explode: false
          in: query
          name: limit
          schema:
            default: 50
            description: Maximum number of items to return per page.
            examples:
              - 50
            format: int64
            maximum: 100
            minimum: 1
            type: integer
        - description: >-
            Pass pagination.next_cursor from the previous response to fetch the
            next page. Omit for the first page; keep the same filters and sort
            order across pages.
          explode: false
          in: query
          name: cursor
          schema:
            description: >-
              Pass pagination.next_cursor from the previous response to fetch
              the next page. Omit for the first page; keep the same filters and
              sort order across pages.
            type: string
        - description: >-
            Free-text search across project name and owner. Terms shorter than 3
            characters are ignored. A full project ID matches that project
            exactly.
          example: landing
          explode: false
          in: query
          name: query
          schema:
            description: >-
              Free-text search across project name and owner. Terms shorter than
              3 characters are ignored. A full project ID matches that project
              exactly.
            examples:
              - landing
            maxLength: 1000
            type: string
        - description: >-
            Sort field. Omit for the default order: most recently edited first,
            or best matches first when query is set. Ties break by project id
            unless noted. review_priority: unscored projects last in both
            directions, ties by risk score. name: projects without a name first
            ascending and last descending. publish_audience: ranks not
            published, then workspace, custom, public. last_edited_at: falls
            back to the last update time. risk_factor_count,
            open_pii_finding_count, external_access_rank: missing counts as 0,
            ties by name; external_access_rank ranks external collaborators
            above shared users, publicly published apps, then none;
            open_pii_finding_count returns 402 when personal data detection is
            not available on the workspace plan. edits_* and visitors_*: missing
            counts as 0. last_security_scan_at: never scanned last in both
            directions. relevance: requires query, ties by last update time.
          example: review_priority
          explode: false
          in: query
          name: sort_by
          schema:
            description: >-
              Sort field. Omit for the default order: most recently edited
              first, or best matches first when query is set. Ties break by
              project id unless noted. review_priority: unscored projects last
              in both directions, ties by risk score. name: projects without a
              name first ascending and last descending. publish_audience: ranks
              not published, then workspace, custom, public. last_edited_at:
              falls back to the last update time. risk_factor_count,
              open_pii_finding_count, external_access_rank: missing counts as 0,
              ties by name; external_access_rank ranks external collaborators
              above shared users, publicly published apps, then none;
              open_pii_finding_count returns 402 when personal data detection is
              not available on the workspace plan. edits_* and visitors_*:
              missing counts as 0. last_security_scan_at: never scanned last in
              both directions. relevance: requires query, ties by last update
              time.
            enum:
              - relevance
              - review_priority
              - name
              - publish_audience
              - last_edited_at
              - risk_factor_count
              - open_pii_finding_count
              - external_access_rank
              - edits_24h
              - edits_7d
              - edits_30d
              - visitors_24h
              - visitors_7d
              - visitors_30d
              - last_security_scan_at
            examples:
              - review_priority
            type: string
        - description: Direction for sort_by. Defaults to descending. Requires sort_by.
          example: desc
          explode: false
          in: query
          name: sort_order
          schema:
            description: Direction for sort_by. Defaults to descending. Requires sort_by.
            enum:
              - asc
              - desc
            examples:
              - desc
            type: string
        - description: >-
            Filter by the activity_group field: time since the last edit, or
            last update for projects never edited, using 14-day and 60-day
            boundaries. Repeat to match any value. Omit for no filter.
          example:
            - last_14_days
          explode: true
          in: query
          name: activity_group
          schema:
            description: >-
              Filter by the activity_group field: time since the last edit, or
              last update for projects never edited, using 14-day and 60-day
              boundaries. Repeat to match any value. Omit for no filter.
            examples:
              - - last_14_days
            items:
              enum:
                - last_14_days
                - last_60_days
                - older
              type: string
            type: array
        - description: Filter by whether the project is published. Omit for no filter.
          example: true
          explode: false
          in: query
          name: is_published
          schema:
            description: Filter by whether the project is published. Omit for no filter.
            examples:
              - true
            type: boolean
        - description: >-
            Filter by the visibility field. Repeat to match any of the values.
            Omit for no filter.
          example:
            - workspace_edit
          explode: true
          in: query
          name: visibility
          schema:
            description: >-
              Filter by the visibility field. Repeat to match any of the values.
              Omit for no filter.
            examples:
              - - workspace_edit
            items:
              enum:
                - restricted
                - workspace_edit
                - workspace_view
              type: string
            type: array
        - description: >-
            Filter by the has_pii signal. false selects projects without
            detected personal data. Omit for no filter. Returns 402 when
            personal data detection is not available on the workspace plan.
          explode: false
          in: query
          name: has_pii
          schema:
            description: >-
              Filter by the has_pii signal. false selects projects without
              detected personal data. Omit for no filter. Returns 402 when
              personal data detection is not available on the workspace plan.
            type: boolean
        - description: >-
            Filter by whether the project has a connected service. false selects
            projects without one. Omit for no filter.
          example: true
          explode: false
          in: query
          name: has_connectors
          schema:
            description: >-
              Filter by whether the project has a connected service. false
              selects projects without one. Omit for no filter.
            examples:
              - true
            type: boolean
        - description: >-
            Filter published projects by the publish_audience field. Repeat to
            match any value. Omit for no filter. Requires is_published to be
            true or omitted.
          example:
            - workspace
          explode: true
          in: query
          name: publish_audience
          schema:
            description: >-
              Filter published projects by the publish_audience field. Repeat to
              match any value. Omit for no filter. Requires is_published to be
              true or omitted.
            examples:
              - - workspace
            items:
              enum:
                - public
                - workspace
                - custom
              type: string
            type: array
        - description: >-
            Filter by Security Center review priority. Repeat to match any
            selected priority; unscored matches projects not yet scored. Omit to
            include every project.
          example:
            - needs_review
          explode: true
          in: query
          name: review_priority
          schema:
            description: >-
              Filter by Security Center review priority. Repeat to match any
              selected priority; unscored matches projects not yet scored. Omit
              to include every project.
            examples:
              - - needs_review
            items:
              enum:
                - needs_review
                - review_recommended
                - no_review_needed
                - unscored
              type: string
            type: array
        - description: >-
            Finding type IDs returned by GET
            /v1/workspaces/{workspace_id}/security-center/insights. Finding
            filters use the same category rules as project_count in that
            response. A project matching a more specific related type is
            excluded from the broader type. Repeat to match any selected type.
            Unknown IDs return 400. Types that depend on personal data detection
            return 402 when that feature is not available on the workspace plan.
          example:
            - public_security_exposure
          explode: true
          in: query
          name: finding_type_id
          schema:
            description: >-
              Finding type IDs returned by GET
              /v1/workspaces/{workspace_id}/security-center/insights. Finding
              filters use the same category rules as project_count in that
              response. A project matching a more specific related type is
              excluded from the broader type. Repeat to match any selected type.
              Unknown IDs return 400. Types that depend on personal data
              detection return 402 when that feature is not available on the
              workspace plan.
            examples:
              - - public_security_exposure
            items:
              type: string
            type: array
        - $ref: '#/components/parameters/LovableVersion'
        - $ref: '#/components/parameters/LovableBeta'
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WorkspaceInsightsProjectPage'
                description: >-
                  Projects with security finding counts, review priorities,
                  activity counts, and publishing details.
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
              --url 'https://api.lovable.dev/v1/workspaces/workspace-id/security-center/insights/projects' \
              --header 'Lovable-API-Key: lov_your-api-key' \
              --header 'Lovable-Version: 2026-09-11'
        - label: JavaScript
          lang: javascript
          source: >-
            const response = await
            fetch("https://api.lovable.dev/v1/workspaces/workspace-id/security-center/insights/projects",
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
    WorkspaceInsightsProjectPage:
      properties:
        activity_as_of:
          description: >-
            Data timestamps for the edit and visitor counts on this page; null
            when none are available.
          oneOf:
            - $ref: '#/components/schemas/WorkspaceInsightsActivityFreshness'
            - type: 'null'
        applied_finding:
          description: >-
            Finding type used as a filter when exactly one finding_type_id is
            selected; null otherwise. project_count equals the total matching
            projects after all filters are applied.
          oneOf:
            - $ref: '#/components/schemas/WorkspaceInsightsFinding'
            - type: 'null'
        as_of:
          description: >-
            Timestamp indicating the freshness of workspace review-priority
            data. Individual projects may have newer results. Null when
            unavailable; not a security scan completion time.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
        data:
          description: Items in this page. Empty when there are none.
          items:
            $ref: '#/components/schemas/WorkspaceInsightsProject'
          type: array
        pagination:
          $ref: '#/components/schemas/Pagination'
          description: >-
            Whether more results are available and the cursor to fetch the next
            page.
        total:
          description: Total matching projects across all pages.
          examples:
            - 42
          format: int64
          type: integer
      required:
        - total
        - as_of
        - activity_as_of
        - applied_finding
        - data
        - pagination
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
    WorkspaceInsightsActivityFreshness:
      properties:
        edits_as_of:
          description: >-
            Latest data timestamp used by the stored edit counts on this page;
            null when unavailable.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
        visitors_as_of:
          description: >-
            Latest data timestamp used by stored visitor counts on this page;
            null when counts are retrieved live or no timestamp is available.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
      required:
        - edits_as_of
        - visitors_as_of
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
    WorkspaceInsightsProject:
      properties:
        activity_group:
          description: >-
            Last-edit recency, using 14-day and 60-day boundaries; null when the
            project was never edited. More values may be added; clients must
            tolerate unknown values.
          enum:
            - last_14_days
            - last_60_days
            - older
            - null
          examples:
            - last_14_days
          type:
            - string
            - 'null'
        connectors:
          description: >-
            Names of services connected to the project; empty when there are
            none.
          examples:
            - - supabase
              - stripe
          items:
            type: string
          type: array
        description:
          description: >-
            AI-written summary of what the project does; null until the agent
            has completed a response for the project.
          examples:
            - >-
              A single-page marketing site with a hero, feature grid, and signup
              form.
          type:
            - string
            - 'null'
        edge_functions:
          description: >-
            Backend functions deployed for the project; empty when there are
            none.
          examples:
            - - name: send-welcome-email
          items:
            $ref: '#/components/schemas/WorkspaceInsightsEdgeFunction'
          type: array
        edit_count:
          description: Total edits over the project's lifetime.
          examples:
            - 128
          format: int64
          type: integer
        edits_7d:
          description: Edits in the last 7 days.
          examples:
            - 21
          format: int64
          type: integer
        edits_24h:
          description: Edits in the last 24 hours.
          examples:
            - 4
          format: int64
          type: integer
        edits_30d:
          description: Edits in the last 30 days.
          examples:
            - 67
          format: int64
          type: integer
        id:
          description: Project ID.
          examples:
            - prj_01jw3k9m2xq8r5v0c7d4e6f2gh
          type: string
        is_published:
          description: Whether the project is published.
          examples:
            - true
          type: boolean
        last_edited_at:
          description: When the project was last edited; null when it never was.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
        last_security_scan_at:
          description: >-
            Completion time of the latest completed security scan; null when no
            scan has completed.
          examples:
            - '2026-01-15T09:30:00Z'
          format: date-time
          type:
            - string
            - 'null'
        matched_reason:
          description: >-
            Condition matching the finding_type_id filter when exactly one
            finding type is selected; null otherwise.
          oneOf:
            - $ref: '#/components/schemas/WorkspaceInsightsReason'
            - type: 'null'
        message_count:
          description: >-
            Agent message usage charged to credit funds for this project during
            the current UTC calendar month.
          examples:
            - 56
          format: int64
          type: integer
        name:
          description: Human-readable project name; null when none is set.
          examples:
            - Acme Landing Page
          type:
            - string
            - 'null'
        owner:
          description: Project owner; null when the project has no active owner.
          oneOf:
            - $ref: '#/components/schemas/WorkspaceInsightsOwner'
            - type: 'null'
        publish_audience:
          description: >-
            Who can open the published site: the audience set via POST or PATCH
            /v1/projects/{project_id}/publish; null while the site is not
            published. More values may be added; clients must tolerate unknown
            values.
          enum:
            - public
            - workspace
            - custom
            - null
          examples:
            - public
          type:
            - string
            - 'null'
        review_priority:
          description: >-
            Security Center review priority, or unscored when the project has
            not yet been scored; null when no priority is available. A lower
            priority does not guarantee the absence of security issues. More
            values may be added; clients must tolerate unknown values.
          enum:
            - needs_review
            - review_recommended
            - no_review_needed
            - unscored
            - null
          examples:
            - needs_review
          type:
            - string
            - 'null'
        review_priority_explanation:
          description: >-
            Conditions contributing to the project's review priority. Not every
            scoring input is listed, and related conditions may be combined
            under a more specific explanation.
          examples:
            - - category: data
                detail: A public table exposes personal data to anonymous callers.
                id: public_pii_exposure
                label: Public PII exposure
                review_priority: needs_review
          items:
            $ref: '#/components/schemas/WorkspaceInsightsReason'
          type: array
        url:
          description: >-
            Current published app URL; null when the project is unpublished or
            its URL is unavailable.
          examples:
            - https://acme-landing-page.lovable.app
          type:
            - string
            - 'null'
        visibility:
          description: >-
            Who can open the project in the Lovable editor. restricted: only the
            project owner, invited collaborators, and the workspace owner
            (Business or Enterprise). workspace_edit: every workspace member, at
            the access level their workspace role grants. workspace_view: every
            workspace member, with the access their workspace role grants capped
            at read; explicit project, folder, and group grants still permit
            editing (Business or Enterprise). Published app access is configured
            separately via publish_audience. More values may be added; clients
            must tolerate unknown values.
          enum:
            - restricted
            - workspace_edit
            - workspace_view
            - null
          examples:
            - workspace_edit
          type:
            - string
            - 'null'
        visitors_7d:
          description: Unique visitors in the last 7 days.
          examples:
            - 210
          format: int64
          type: integer
        visitors_24h:
          description: Unique visitors in the last 24 hours.
          examples:
            - 35
          format: int64
          type: integer
        visitors_30d:
          description: Unique visitors in the last 30 days.
          examples:
            - 840
          format: int64
          type: integer
      required:
        - id
        - name
        - description
        - url
        - owner
        - visibility
        - is_published
        - publish_audience
        - last_edited_at
        - activity_group
        - edit_count
        - edits_24h
        - edits_7d
        - edits_30d
        - visitors_24h
        - visitors_7d
        - visitors_30d
        - message_count
        - review_priority
        - review_priority_explanation
        - connectors
        - edge_functions
        - last_security_scan_at
        - matched_reason
      type: object
    Pagination:
      properties:
        has_more:
          description: Whether more results are available beyond this page.
          examples:
            - true
          type: boolean
        next_cursor:
          description: >-
            Pass this value as the cursor query parameter to fetch the next
            page. Treat it as an opaque string; null when there are no more
            results.
          examples:
            - eyJ2IjoxLCJpZCI6InByal8wMWp3M2s5In0
          type:
            - string
            - 'null'
      required:
        - next_cursor
        - has_more
      type: object
    WorkspaceInsightsEdgeFunction:
      properties:
        name:
          description: Name of a backend function deployed for this project.
          examples:
            - send-welcome-email
          type: string
      required:
        - name
      type: object
    WorkspaceInsightsReason:
      properties:
        category:
          description: >-
            Topic of the condition contributing to the review priority. More
            values may be added; clients must tolerate unknown values.
          enum:
            - security
            - data
            - exposure
            - credentials
            - access
            - integrations
            - runtime
          examples:
            - data
          type: string
        detail:
          description: >-
            Explanation of how this condition contributes to the project's
            review priority.
          examples:
            - A public table exposes personal data to anonymous callers.
          type: string
        id:
          description: >-
            Stable identifier for the condition contributing to this project's
            review priority.
          examples:
            - public_pii_exposure
          type: string
        label:
          description: >-
            Short display name for this condition. Use id for programmatic
            matching.
          examples:
            - Public PII exposure
          type: string
        review_priority:
          description: >-
            Review priority assigned to this condition. May differ from the
            project's overall priority. More values may be added; clients must
            tolerate unknown values.
          enum:
            - needs_review
            - review_recommended
            - no_review_needed
          examples:
            - needs_review
          type: string
        values:
          description: >-
            Counts relevant to this condition; counts that do not apply are
            null. Null when the condition carries no counts.
          oneOf:
            - $ref: '#/components/schemas/WorkspaceInsightsReasonValues'
            - type: 'null'
      required:
        - id
        - category
        - review_priority
        - label
        - detail
        - values
      type: object
    WorkspaceInsightsOwner:
      properties:
        display_name:
          description: Project owner's display name; null when unavailable.
          examples:
            - Jane Cooper
          type:
            - string
            - 'null'
      required:
        - display_name
      type: object
    WorkspaceInsightsReasonValues:
      properties:
        connector_count:
          description: Number of configured connectors.
          examples:
            - 2
          format: int64
          type:
            - integer
            - 'null'
        edge_function_count:
          description: Number of deployed edge functions.
          examples:
            - 3
          format: int64
          type:
            - integer
            - 'null'
        error_count:
          description: >-
            Number of error-level security issues; findings grouped into one
            family count once.
          examples:
            - 2
          format: int64
          type:
            - integer
            - 'null'
        info_count:
          description: >-
            Number of info-level security issues; findings grouped into one
            family count once.
          examples:
            - 8
          format: int64
          type:
            - integer
            - 'null'
        open_pii_finding_count:
          description: Number of open PII findings.
          examples:
            - 3
          format: int64
          type:
            - integer
            - 'null'
        secret_count:
          description: Number of stored project secrets.
          examples:
            - 4
          format: int64
          type:
            - integer
            - 'null'
        shared_user_count:
          description: Number of users the project is shared with.
          examples:
            - 6
          format: int64
          type:
            - integer
            - 'null'
        warning_count:
          description: >-
            Number of warning-level security issues; findings grouped into one
            family count once.
          examples:
            - 5
          format: int64
          type:
            - integer
            - 'null'
      required:
        - error_count
        - warning_count
        - info_count
        - open_pii_finding_count
        - secret_count
        - connector_count
        - shared_user_count
        - edge_function_count
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

- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [List projects](https://docs.lovable.dev/api-reference/projects/list-projects.md)
- [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
