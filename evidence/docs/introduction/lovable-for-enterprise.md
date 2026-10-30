# Lovable for Enterprise
<!-- source: https://docs.lovable.dev/introduction/lovable-for-enterprise.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable for Enterprise

> Build and ship AI-generated apps at organizational scale with the security, governance, identity, and compliance controls your security team expects.

Lovable Enterprise plan gives organizations a governed environment to build AI-generated applications at scale, with centralized identity, granular access controls, workspace-wide security oversight, scheduled Deep scans, audit logs, regional code hosting, EU inference for AI model requests, and a dedicated commercial relationship.

Features marked **Business and Enterprise** are also available on the self-serve Business plan. Features marked **Enterprise only** require a contract.

> **[Talk to our sales team](https://lovable.dev/enterprise)**
>
> Tell us about your team's identity provider, compliance requirements, and use case. We'll set up an Enterprise workspace and walk through migration from your existing plan if needed.

## At a glance

| Area | Covered by |
| :- | :- |
| **Identity** | SSO (OIDC and SAML 2.0), SCIM, 2FA, workspace groups, verified-domain provisioning, organizations that share identity across several workspaces |
| **Governance** | Roles, restricted projects, invitation controls, project transfer controls, publishing controls, app login methods, training-data exclusion by default |
| **Security** | Quick scan, Deep scan, scheduled Deep scans, Security center, sensitive data scanning, chat send protection, Aikido, Wiz |
| **Auditability** | Audit logs retained for 13 weeks (approximately 90 days), JSONL exports, and scheduled data exports of audit logs to your SIEM or cloud storage |
| **Adoption** | Insights: visits, active apps, active builders, and connections added across the workspace, with top apps, top builders, adoption by department when your identity provider sends one, and CSV export |
| **Data and code control** | GitHub Enterprise Cloud (data residency), GitHub Enterprise Server, GitLab, Bitbucket, external hosting, build secrets, EU inference |
| **Compliance** | SOC 2 Type II, ISO 27001:2022, AIUC-1, GDPR, DPA, sub-processors |

## Who Enterprise is for

Enterprise workspaces are designed for organizations that need to:

* Centralize how the whole team logs in and gets provisioned
* Restrict who can build, publish, and share apps externally
* Detect and block sensitive data in project chat messages before it leaves the workspace
* Schedule recurring security scans across every project automatically
* Keep an auditable record of every change across every project
* Keep code data inside a specific GitHub region or on self-hosted infrastructure
* Keep AI model requests on model endpoints in the European Union
* Standardize design, components, and engineering knowledge across every project
* Set spend, security, and data-handling policies once and apply them everywhere
* Connect AI-built apps directly to existing data warehouses and enterprise systems

## What Enterprise adds beyond Business

Business already includes workspace SSO, groups, the Security center, Insights, App login methods, design templates, branded app URLs, restricted projects, training-data exclusion by default, and workspace-level connector controls. Enterprise adds:

* **Identity and provisioning**, SCIM provisioning, SCIM-managed member filtering, SCIM precedence over just-in-time (JIT) provisioning, group-to-role mappings, a self-serve SSO just-in-time (JIT) provisioning toggle, and [organizations](https://docs.lovable.dev/features/organizations) that share identity across several workspaces.
* **Governance**, restrict workspace invitations, project transfer controls, require workspace editor role for editing, custom workspace member caps, and workspace deletion through your account team.
* **Security and data protection**, PII findings in Security insights, scheduled Deep security scans, sensitive data scanning, chat send protection, the opt-in to extended-retention models, and EU inference.
* **Publishing controls**, workspace policies that block publishing or require approval first, disable public preview links, and publish every app under a publishing domain you own.
* **Code and infrastructure**, GitHub Enterprise Cloud with data residency, GitHub Enterprise Server, and build secrets.
* **Team enablement and support**, design systems from an existing npm package, audit logs, data exports to your SIEM or cloud storage, dedicated account team, priority support, and custom onboarding.

## Identity and access

Centralize how your team authenticates and gets access to Lovable.

> **[Workspace SSO](https://docs.lovable.dev/features/business/sso.md)**
>
> **Business and Enterprise.** Okta, Auth0, Microsoft Entra ID, or any OIDC or SAML 2.0 provider. Enforce SSO with 8h, 24h, 48h, or 7d session duration. JIT-provision users at a default role.

> **[SCIM provisioning](https://docs.lovable.dev/features/business/scim.md)**
>
> **Enterprise only.** Automated user and group lifecycle from your identity provider. Group-to-role mappings, API-key rotation, SCIM precedence over JIT. SCIM-managed filter on the People tab.

> **[Two-factor authentication](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md)**
>
> **All plans.** Authenticator-app or SMS 2FA on top of any login method, including SSO. Configured per account. Enterprise workspaces can [require 2FA](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication) for all members.

> **[Workspace groups](https://docs.lovable.dev/features/groups.md)**
>
> **Business and Enterprise.** Share projects, folders, and published-app access by group. SCIM groups sync from your identity provider.

> **[Verified-domain provisioning](https://docs.lovable.dev/features/workspace-identity#user-provisioning)**
>
> **Business and Enterprise.** Auto-add anyone signing up with a verified company email, or bulk-provision every existing user on a domain in one action.

> **[Reuse Lovable workspace identity in apps](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)**
>
> **Business and Enterprise.** Internal tools recognize the logged-in workspace member automatically, with no second login system. Works with any Lovable login method, and pairs with row-level security in the built-in backend for per-user data.

> **[Organizations](https://docs.lovable.dev/features/organizations)**
>
> **Enterprise only.** Run several workspaces as one company: verified domains, SSO, and SCIM set up once for every workspace, one **People** page across workspaces, and apps published to everyone in the organization. Billing stays with each workspace.

> **[Roles and permissions](https://docs.lovable.dev/features/collaboration.md)**
>
> **All paid plans.** Owner, admin, editor, viewer, and external-collaborator.

> **[Restrict workspace invitations](https://docs.lovable.dev/features/privacy-and-security-settings.md#restrict-workspace-invitations)**
>
> **Enterprise only.** Limit email invitations to admins and owners.

> **[Workspace discovery](https://docs.lovable.dev/features/privacy-and-security-settings.md#workspace-discovery)**
>
> **Business and Enterprise.** Let employees with a verified company email find and request to join your workspace. Owners and admins can turn this off in Privacy & security.

## Workspace governance and data protection

Set workspace-level policies once and apply them to every project. Most controls live in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**).

> **[Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)**
>
> Reference for workspace privacy and security settings, including default project and website access, invitation controls, external collaborator modes, publishing gates, app login methods, auto-fix scope, preview-link control, MCP access, sensitive-data scanning, chat send protection, and extended-retention models.

> **[App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods)**
>
> **Business and Enterprise.** Workspace-wide lock-down of app sign-in methods (Email, Phone, Google, Apple, Microsoft, Lovable, SAML SSO, which also covers OIDC sign-in, and Lovable workspace identity) across every project. Blocked methods can't be re-enabled per project.

> **[Training data protection](https://docs.lovable.dev/features/business/data-opt-out.md)**
>
> **Business and Enterprise.** Workspace data is excluded from AI model training by default and governed by your organization's Data Processing Agreement. No opt-out is needed.

> **[Sensitive data scanning and chat send protection](https://docs.lovable.dev/features/privacy-and-security-settings.md#sensitive-data-scanning)**
>
> **Enterprise only.** Master switch for PII detection in project chat history, built-in databases, and storage. Chat send protection modes: **Log only** (default), **Ask before sending**, or **Block original** (original message discarded, not logged).

> **[Extended-retention models](https://docs.lovable.dev/features/privacy-and-security-settings.md#extended-retention-models)**
>
> **Enterprise only.** Enterprise workspaces use only zero-data-retention models by default. Admins can opt in to models whose provider retains prompts and outputs for 30 days, for building and for the AI features of published apps, after confirming the terms in a consent dialog.

> **[EU inference](https://docs.lovable.dev/features/eu-inference.md)**
>
> **Enterprise only.** Admins can keep the workspace's AI model requests on model endpoints in the European Union, for building and for the AI features in published apps. A request that no EU endpoint can serve fails instead of running in another region. Some features are not available while it is enabled.

> **[Block public storage buckets](https://docs.lovable.dev/features/privacy-and-security-settings.md#block-public-storage-buckets)**
>
> **All plans.** Workspace-wide safeguard that forces every new built-in storage bucket to private and prevents members from creating publicly accessible buckets.

## Publishing and sharing controls

Govern how projects are shared inside the workspace and how published apps reach the outside world. Publishing settings are managed in the [Privacy & security panel](https://docs.lovable.dev/features/privacy-and-security-settings.md); project visibility and folder sharing are managed on each project or folder.

App login methods apply to every app in the workspace, see the [Workspace governance](#workspace-governance-and-data-protection) section above.

> **[Default published app access](https://docs.lovable.dev/features/privacy-and-security-settings.md#default-published-app-access)**
>
> **Business and Enterprise.** Set the workspace default to **Workspace** so new publishes are only reachable by logged-in workspace members. Individual projects can still use the **Custom** audience to grant access to specific members, [groups](https://docs.lovable.dev/features/groups.md), or [people outside the workspace invited by email](https://docs.lovable.dev/features/publish.md#invite-people-outside-your-workspace).

> **[Workspace policies](https://docs.lovable.dev/features/workspace-policies.md)**
>
> **Enterprise only.** Block publishing or require an admin or owner's approval: public apps, apps that use connectors, external collaborators publishing, and apps with unresolved sensitive data findings. Lovable publishes approved apps automatically.

> **[External invite controls](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-viewer-invites)**
>
> **Business and Enterprise.** Disable email invites for people outside the workspace, or limit them to specific email domains with [External viewer invites](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-viewer-invites). Your [verified domains](https://docs.lovable.dev/features/verified-domains.md) are always allowed.

> **[Disable public preview links](https://docs.lovable.dev/features/privacy-and-security-settings.md#preview-link-sharing)**
>
> **Enterprise only.** Stop members from creating new preview links across the workspace.

> **[Block publishing with critical issues](https://docs.lovable.dev/features/privacy-and-security-settings.md#block-publishing-with-critical-issues)**
>
> **All plans.** Stop publishing while the project has unresolved critical security findings.

> **[Restricted projects](https://docs.lovable.dev/features/project-visibility.md)**
>
> **Business and Enterprise.** Default new projects to **Restricted** so only the owner and invited collaborators can access them, at workspace and project level.

> **[Personal folders and group folder sharing](https://docs.lovable.dev/introduction/project-folders.md)**
>
> **Business and Enterprise.** Organize projects into private personal folders, and share them with workspace members or [groups](https://docs.lovable.dev/features/groups.md) so every project inside inherits the access.

> **[Editor project transfers](https://docs.lovable.dev/features/privacy-and-security-settings.md#editor-project-transfers)**
>
> **Enterprise only.** Control whether editors who own a project can transfer it to another workspace, including a personal workspace outside your organization. Disabled by default.

> **[Require workspace editor role](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-workspace-editor-role)**
>
> **Enterprise only.** Enforce a read-only baseline for viewers and external collaborators. When enabled, only members with the editor role or higher can edit projects, regardless of how project access was granted (direct, folder, or group). Disabled by default.

## Domains and branding

Publish every app under a consistent address pattern, on `lovable.app` or on a domain you own, and connect custom domains in-app.

> **[Branded app URLs](https://docs.lovable.dev/features/branded-workspace-urls.md)**
>
> **Business and Enterprise.** Publish every app under a consistent `{app}.{workspace}.lovable.app` pattern derived from your [verified domain](https://docs.lovable.dev/features/verified-domains.md).

> **[Publishing domain](https://docs.lovable.dev/features/publishing-domain.md)**
>
> **Enterprise.** Connect one domain or subdomain you own, such as `apps.acme.com`, and every app in the workspace publishes at an address under it, such as `dashboard.apps.acme.com`.

> **[Custom domains](https://docs.lovable.dev/features/custom-domain.md)**
>
> **All paid plans.** Buy and connect domains in-app with Lovable handling DNS, SSL, and CDN front-ends.

## Audit and monitoring

Keep an auditable record of activity across the workspace, and a single place to track security posture and adoption across every project.

> **[Audit logs](https://docs.lovable.dev/features/audit-logs.md)**
>
> **Enterprise only.** Searchable workspace activity logs for membership, roles, groups, SCIM, SSO, integrations, project lifecycle events, secrets, and prompts. Entries include actor, IP address, user agent, and structured JSON. Retained for 13 weeks (approximately 90 days). Use data exports for longer retention and SIEM forwarding.

> **[Data exports](https://docs.lovable.dev/features/data-exports)**
>
> **Enterprise only.** Scheduled exports of audit logs to Splunk, Azure Log Analytics, Amazon S3, Google Cloud Storage, or Azure Blob Storage. Runs every hour or every 3 hours, with a run history for each export.

> **[Workspace security center](https://docs.lovable.dev/features/security-center)**
>
> **Business and Enterprise.** Workspace-wide dashboard for code analysis, dependency vulnerabilities, secrets, and scan coverage across every project. CSV export. Trigger scans without opening individual projects.

> **[Action center](https://docs.lovable.dev/features/action-center.md)**
>
> **Business and Enterprise.** One page for everything that needs a decision from an admin or owner: publish requests and inactive public apps (Enterprise), projects without an owner, unusual credit usage, and apps with critical security findings, with the actions to resolve each.

> **[Security insights](https://docs.lovable.dev/features/security-insights.md)**
>
> **Business and Enterprise.** Portfolio-level view of every project, combining security findings, ownership, lifecycle, publish status, and activity into a single review priority. Quick filters for abandoned projects, security findings, and projects with no owner. CSV export. PII findings and PII quick filters are Enterprise-only.

> **[Insights](https://docs.lovable.dev/features/insights.md)**
>
> **Business and Enterprise.** Workspace adoption dashboard: visits, active apps, active builders, and connections added over the last 30 days, top apps ranked by visits, and builders ranked by edits. Adoption by department when your identity provider sends one, through SCIM or SSO. CSV export of the app and builder lists. Reports adoption, not security.

## Application security

Every publish runs a security scan automatically. Two built-in scans, **Quick scan** and **Deep scan**, plus optional connectors provide defense in depth from configuration to code review.

> **[Security overview](https://docs.lovable.dev/features/security)**
>
> Quick scan runs on every publish and checks database access rules, dependencies, and MCP server exposure.

> **[Deep scan](https://docs.lovable.dev/features/security#deep-scan)**
>
> Optional review of your application code for access control, endpoint, input handling, secret, payment, sign-in, and data exposure issues.

> **[Project security view](https://docs.lovable.dev/features/security-view.md)**
>
> Per-project home for findings from every scanner, including Aikido and Wiz. Inline chat to fix any finding.

> **[Schedule Deep security scans](https://docs.lovable.dev/features/security-center#schedule-security-scans-enterprise-only)**
>
> **Enterprise only.** Weekly or monthly Deep scans across published projects or all projects. 1 credit per project per run.

> **[Auto-fix security issues](https://docs.lovable.dev/features/privacy-and-security-settings.md#auto-fix-security-issues)**
>
> Workspace default for auto-remediating eligible Quick-scan findings. Scopes: Selected project, Externally published, All published, or All projects.

> **[Aikido AI pentest](https://docs.lovable.dev/integrations/aikido.md)**
>
> Agentic dynamic penetration testing with real attack payloads. Generates SOC 2 and ISO 27001-ready reports.

> **[Wiz security scanning](https://docs.lovable.dev/integrations/wiz.md)**
>
> Software composition analysis (SCA) and static application security testing (SAST) across every project. Connect your Wiz deployment with one OAuth flow.

> **[Security best practices](https://docs.lovable.dev/tips-tricks/security-best-practices.md)**
>
> Practical guidance for writing secure code in Lovable apps.

Leaked-password protection using Have I Been Pwned (HIBP) for end-user email sign-in and conversational security review in chat are both available alongside the scanners, see [Security overview](https://docs.lovable.dev/features/security).

## Code hosting, residency, and deployment control

Keep code data inside a specific GitHub region, on your own self-hosted infrastructure, or on hosting you operate yourself.

> **[GitHub Enterprise Cloud (data residency)](https://docs.lovable.dev/integrations/github.md)**
>
> **Enterprise only.** Connect Lovable to GitHub Enterprise Cloud on a `*.ghe.com` hostname so repository data and webhook traffic stay in your assigned region.

> **[GitHub Enterprise Server (self-hosted)](https://docs.lovable.dev/integrations/github.md)**
>
> **Enterprise only.** Connect Lovable to your self-hosted GitHub Enterprise Server. You create the GitHub app inside your own organization; signing keys remain under your control.

> **[GitLab (cloud and self-managed)](https://docs.lovable.dev/integrations/gitlab.md)**
>
> Sync projects to GitLab.com or your self-managed GitLab instance.

> **[Bitbucket Cloud](https://docs.lovable.dev/integrations/bitbucket.md)**
>
> Sync projects to a Bitbucket Cloud workspace on your Atlassian account.

> **[Hosting and ownership decisions](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership)**
>
> The recommended path for managing where code and data live. Start on Lovable, sync your code with Git, move components out only when you hit a real constraint.

> **[Host outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md)**
>
> Move backend and database to infrastructure you operate (including self-hosted Supabase) when compliance, residency, or organizational policy requires it.

## Enterprise integrations and developer controls

Connect Lovable to the tools your team already uses, plug into existing data warehouses, and drive Lovable programmatically from your own systems.

> **[Connector catalog](https://docs.lovable.dev/integrations/introduction)**
>
> 50+ connectors (Linear, Slack, Twilio, Notion, Atlassian, HubSpot, Microsoft, Google Workspace, AWS S3, Stripe, Supabase, and more). **Business and Enterprise** workspaces control who can create connections and clients per connector, which is also how connectors are made available or disabled.

> **[Data and analytics](https://docs.lovable.dev/integrations/introduction)**
>
> First-class connectors for [Databricks](https://docs.lovable.dev/integrations/databricks.md) (service-principal OAuth), [Snowflake](https://docs.lovable.dev/integrations/snowflake.md) (custom OAuth integration), [BigQuery](https://docs.lovable.dev/integrations/bigquery.md) (Workload Identity Federation, no stored keys), and [Gemini Enterprise](https://docs.lovable.dev/integrations/gemini-enterprise.md) for search and grounded answers across connected data sources.

> **[Chat connectors (MCP)](https://docs.lovable.dev/integrations/chat-connectors.md)**
>
> Featured plus custom MCP servers. Enterprise workspaces can route custom MCP traffic through [Lovable static IPs](https://docs.lovable.dev/integrations/custom-mcp.md#lovable-static-ips) to reach servers behind IP-allowlisting firewalls. Workspace admins control **Remote MCP connectors**, **Local desktop MCP servers**, and **Third-party MCP clients** (disabled by default on Enterprise) under Privacy & security.

> **[Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)**
>
> Drive Lovable from external MCP clients, such as Claude Desktop, Cursor, and Claude Code. Enterprise workspaces must explicitly enable third-party MCP client access.

> **[Build with URL](https://docs.lovable.dev/integrations/build-with-url.md)**
>
> Create prompt links from internal portals or workflow tooling. They open in Lovable ready to send.

> **Desktop and mobile**
>
> [Desktop app for macOS and Windows](https://docs.lovable.dev/integrations/desktop-app.md), plus [iOS and Android apps](https://docs.lovable.dev/integrations/lovable-mobile-app.md). Available on all plans.

## Developer standards and reuse

Define design, components, engineering conventions, and project organization once so every new project starts from an approved baseline.

> **[Workspace instructions](https://docs.lovable.dev/features/knowledge.md)**
>
> Coding standards, architecture rules, and preferred libraries that stay consistent across every project. Project-level overrides supported.

> **[Design templates](https://docs.lovable.dev/features/business/design-templates.md)**
>
> **Business and Enterprise.** Mark any project as a reusable template. Set a workspace default template.

> **[Design systems](https://docs.lovable.dev/features/design-systems.md)**
>
> **All paid plans.** Define your React component library, styling rules, and setup once. Connected projects pick up updates on every new generation. Wrapping an existing npm package as a design system is **Enterprise only**.

> **[Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md)**
>
> `@`-mention other projects in the workspace and reuse implementations, files, and chat context.

> **[Build secrets](https://docs.lovable.dev/features/build-secrets.md)**
>
> **Enterprise only.** Encrypted workspace-level environment variables for builds. Configured in [Build secrets](https://lovable.dev/settings/secrets) (**Workspace settings → Build & deploy → Build secrets**).

## Cost and spend controls

Set credit limits and alerts, track workspace usage, and customize commitments through your Enterprise contract.

> **[Usage limits & alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md)**
>
> **All paid plans.** Set credit limits for the workspace, projects, members, groups, and access tokens, plus low-balance alerts on the workspace balance. Each limit can notify you, block usage at its threshold, or both, and members can request limit increases for you to approve.

> **[Per-member credit limits](https://docs.lovable.dev/features/people.md#set-a-per-member-credit-limit)**
>
> **All paid plans.** Workspace default plus per-member overrides. Resets the 1st of every month at 00:00 UTC. Enterprise workspaces can also [import limits for many members at once from a CSV](https://docs.lovable.dev/features/people.md#import-credit-limits-from-a-csv).

> **[Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)**
>
> Track Build usage, Cloud usage, AI gateway usage, and connector usage from **Workspace settings → Plans & credit usage**. View credit balances, usage details, and credit history in one place.

> **[Custom commitments](https://lovable.dev/enterprise)**
>
> Enterprise contracts can include custom credit commitments, custom seat caps, and annual billing terms.

> **[Workspace member CSV export](https://docs.lovable.dev/features/people.md#export-the-member-list)**
>
> Export the full member list with usage, credit limits, and the effective limit that applies to each member for finance and provisioning audits.

## Compliance

Lovable's compliance program is published at the [Trust portal](https://trust.lovable.dev) and on the [Security page](https://lovable.dev/security).

* **SOC 2 Type II**
* **ISO 27001:2022**
* **AIUC-1**
* **GDPR**, with a [Data Processing Agreement](https://lovable.dev/data-processing-agreement) included on Business and Enterprise. Enterprise customers can request a custom DPA from their Lovable account team.
* [Privacy Policy](https://lovable.dev/privacy)
* Current sub-processor list at [trust.lovable.dev/subprocessors](https://trust.lovable.dev/subprocessors)

## Support

Enterprise workspaces include a commercial relationship beyond the product itself:

* **Dedicated account team**, single point of contact for onboarding, growth, and escalations
* **Priority support** with response SLAs
* **Custom onboarding** tailored to your team's roles and workflows
* **Custom member caps** to match procurement or licensing requirements
* **Workspace deletion**, Enterprise workspaces are retired through your account team. See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md).

## Get started

> **[Talk to our sales team](https://lovable.dev/enterprise)**
>
> Tell us about your team's identity provider, compliance requirements, and use case. We'll set up an Enterprise workspace and walk through migration from your existing plan if needed.

## FAQ

> **What's the difference between Business and Enterprise?**
>
> Business is the self-serve top tier with workspace SSO, groups, Security center, Insights, App login methods, design templates, branded app URLs, restricted projects, training-data exclusion by default, and workspace-level connector controls.
>
> Enterprise is a contract plan that adds SCIM provisioning, organizations across several workspaces, audit logs, scheduled Deep security scans, sensitive data scanning and chat send protection, workspace policies for publishing, design systems based on an existing npm package, build secrets, EU inference, GitHub Enterprise Cloud (data residency) and Server connections, Lovable static IPs for custom MCP servers, restrict-invitations, project transfer controls, disable-public-preview-link control, third-party MCP client gating, a workspace publishing domain, bulk domain provisioning, custom commitment credits, custom member caps, and a dedicated account team.

> **How do we move from Business to Enterprise?**
>
> Contact our sales team. We'll set up the Enterprise workspace, migrate your members and projects, and configure SCIM, audit logs, and any Enterprise-only controls you need.

> **Does Lovable support our identity provider?**
>
> Lovable supports any **OIDC** or **SAML 2.0**-compliant identity provider. Step-by-step guides are published for **Okta**, **Auth0**, and **Microsoft Entra ID**, plus generic instructions for other providers. SCIM is supported for Okta, Microsoft Entra ID (via SAML app), and any SCIM 2.0-compliant identity provider.

> **How often do security scans run?**
>
> **Quick scans** run automatically when the publish dialog opens. The dependency audit also runs whenever your project's dependencies change.
>
> **Deep scans** run when you start them from the Security view or Security center, on the schedule below, or when you publish an app whose MCP integration allows access without sign-in.
>
> On Enterprise, admins can additionally **schedule Deep scans** weekly (Monday 08:00 workspace timezone) or monthly (1st 08:00) across published projects or all projects.
>
> Scheduled scans are billed at **1 credit per project per run**; on-demand scans are free.

> **Can our security team detect or block sensitive data in chats?**
>
> Yes, on Enterprise. Enable **Sensitive data scanning** in Privacy & security to turn on the workspace-wide master switch, then choose a **Chat send protection** mode:
>
> * **Log only** (default): scans run and findings are recorded in the project's Sensitive data tab; messages send without interruption.
> * **Ask before sending**: detected PII pauses the message, the user edits, sends a redacted version, or sends the original.
> * **Block original**: the original cannot be sent. The user must edit or redact. The original message is discarded and **not logged**.
>
> Sensitive data scanning also unlocks on-demand scans of project chat history, built-in databases, and storage, plus the [Restrict publishing with unresolved sensitive data findings](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-with-unresolved-sensitive-data-findings) policy.

> **Can workspace admins control which login methods apps accept?**
>
> Yes. **App login methods** in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security → App login methods**) lets Business and Enterprise admins block [Email](https://docs.lovable.dev/features/email-auth.md), [Phone](https://docs.lovable.dev/features/phone-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), [Apple](https://docs.lovable.dev/features/apple-auth.md), [SAML SSO](https://docs.lovable.dev/features/saml-sso.md), or [Lovable workspace identity](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md) across every app in the workspace. The **SAML SSO** toggle also covers [OIDC sign-in](https://docs.lovable.dev/features/oidc-auth.md). Blocked methods can't be re-enabled per project. This only affects login methods for apps your workspace builds, not how workspace members log in to Lovable.

> **Can editors move projects outside our organization?**
>
> Not by default on Enterprise. **Project transfer controls** let admins decide whether editors who own a project can transfer it to another workspace, including a personal workspace outside your organization. For regulated environments, leave this disabled so only admins and owners can initiate project transfers and projects stay inside your governance boundary.

> **How long are audit logs retained?**
>
> Audit logs are retained for **13 weeks, approximately 90 days** in-product. For longer retention or SIEM forwarding, set up [data exports](https://docs.lovable.dev/features/data-exports) to your own storage or SIEM.

> **Where is our code stored?**
>
> By default, project code lives in Lovable's managed infrastructure. On Enterprise you can keep code in **GitHub Enterprise Cloud with data residency** (so repository data and webhook traffic stay in a specific region) or in **GitHub Enterprise Server** running on your own infrastructure with credentials and signing keys under your control.

> **Can AI processing stay in the European Union?**
>
> Yes, on Enterprise. When an admin enables [EU inference](https://docs.lovable.dev/features/eu-inference.md) in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**), Lovable sends the workspace's AI model requests to model endpoints in the European Union, for building and for the AI features in published apps. A request that no EU endpoint can serve fails instead of running in another region. Fewer models are available while it is enabled, some features are not available, and the workspace uses more credits.

> **Is Lovable HIPAA-compliant?**
>
> No. Lovable does not currently sign Business Associate Agreements and is not HIPAA-compliant. Do not upload protected health information or other restricted categories of data.

> **How does billing work for Enterprise?**
>
> Enterprise plans use custom contractual pricing with annual commitments and optional custom credit commitments. Talk to sales for a quote.


## Related topics

- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md)
- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
