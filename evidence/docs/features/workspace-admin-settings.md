# Workspace admin settings
<!-- source: https://docs.lovable.dev/features/workspace-admin-settings.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace admin settings

> Overview of settings available to workspace owners and admins, including workspace details, access and organization, templates, billing and usage, workspace domains, security and compliance, and development settings.

Workspace admin settings are the central place where **workspace owners and admins** manage the workspace and keep it organized, secure, and aligned with how your team works in Lovable.

Workspace settings define shared configuration and defaults for members unless overridden at the project or member level. Some changes, such as updates to verified OAuth clients, may require review before taking effect.

To open them, click the workspace switcher at the top-left of the dashboard and select **Workspace settings**, or go to [lovable.dev/settings](https://lovable.dev/settings). Use the sidebar to move between sections. Your personal settings, such as your profile, login methods, and two-factor authentication, are in the separate [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings) dialog, opened from your avatar at the bottom-left of the sidebar.

> [!TIP]
>
> To find a setting quickly, start typing in the search box at the top of the settings sidebar. Results list the matching settings grouped by settings page, with the matching words highlighted. Select a result to open that setting. Lovable also matches common synonyms, so `env` finds **Build secrets** and `sso` finds **Identity**. You can also press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) and go to a settings section.

The available options depend on your pricing plan. Features that are plan-specific are noted in each section below.

## General workspace settings

Manage the core identity of your workspace and workspace-level publishing options.

| **Setting** | **Description** |
| :- | :- |
| **Avatar** | A workspace icon shown next to the workspace name across the app, including the workspace switcher. |
| **Name** | Your workspace display name (maximum 50 characters) shown throughout the interface. Useful for distinguishing teams or business units. |
| **Workspace handle** | A unique public identifier used in workspace-related URLs, such as profile pages and shared projects. *Note: Changing the handle may break existing links.* |
| **Enable branded app URLs** (Business and Enterprise) | Publish apps under a workspace-branded subdomain derived from your verified domain. See [**Publish apps with branded URLs**](https://docs.lovable.dev/features/branded-workspace-urls.md) for more information. |
| **Transfer primary ownership** | Transfers the primary owner role, used for billing and domain claims, to another workspace member or to another Lovable account by email. Only the current primary owner sees this setting. See [Transfer primary ownership](https://docs.lovable.dev/features/people.md#transfer-primary-ownership) for more information. |
| **Leave workspace** | Removes your own access to the workspace. You cannot leave if you are the only owner or if this is your only workspace. See [Leave a workspace](https://docs.lovable.dev/features/workspace#leave-a-workspace) for more information. |
| **Recently deleted projects** | Lists the deleted projects you can restore. Shown only while you have a deleted project you can restore. You can restore projects you own, and workspace owners can restore any deleted project in the workspace. See [Restore a deleted project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project) for more information. |
| **Delete workspace** | Deletes the workspace, all its projects, and all member access, and cancels the workspace subscription. Only workspace owners can delete a workspace. On Free, Pro, and Business plans, owners can restore it within 60 days from [Account settings → Account → Recently deleted workspaces](https://lovable.dev/settings/account). See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md) for more information. |

## Billing and usage

Manage your subscription, credits, billing settings, and workspace usage from **Workspace settings → Plans & credit usage**.

Lovable uses credits to measure and pay for credit-based usage across your workspace, including building your app, hosting and running it on Lovable, and powering AI features in deployed apps.

Workspace owners and admins can upgrade or downgrade plans, switch billing cycles, change credit tiers, add credits with one-time top-ups, enable auto top-up, buy gift cards, and manage billing history and payment settings.

All other roles can open **Plans & credit usage** to see the current plan, credit balance, and usage, but billing controls are disabled for them. They cannot initiate or approve charges against the workspace.

For more information, see [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) and [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

### Usage limits & alerts

Control credit spend with usage limits and low-balance alerts from [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits), available on all paid plans. Workspace owners and admins can set credit thresholds for the workspace, projects, members, groups, and access tokens, and choose whether reaching a threshold sends a notification, blocks further usage, or both. This includes the default member credit limit and per-member overrides.

See [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md).

## Insights

Use **Workspace settings → Workspace → Insights** to see how your workspace adopts Lovable: how many apps and builders are active, how many visits your published apps receive, which apps rank highest by visits, and which members contribute the most edits. You can export the full app list and the full builder list to CSV.

Insights is available on Business and Enterprise plans to workspace admins and owners. It reports adoption rather than security, and it complements the [Security center](#security-center), which reports which projects need attention.

See [Insights](https://docs.lovable.dev/features/insights.md).

## Access

Manage who has access to your workspace and how members are structured for collaboration.

### People

The main place to manage workspace members. Workspace owners and admins can invite members, change roles, remove members, approve workspace and project access requests, and export the workspace member list as CSV. You can also track per-member credit usage and set individual credit limits that override workspace defaults.

See [People](https://docs.lovable.dev/features/people.md).

### Groups

Organize members into groups to simplify sharing and access control. Groups can be granted access to projects, folders, and published apps as a unit, reducing the need to manage permissions individually.

Groups can also be synced from your identity provider using [SCIM](https://docs.lovable.dev/features/business/scim.md), so externally managed groups appear alongside manually created ones. Group-level roles control who can manage the group itself. Each group can also have a [default design system](https://docs.lovable.dev/features/groups.md#set-a-default-design-system-for-a-group) that its members get pre-selected when they create a project. Available on **Business and Enterprise** plans.

See [Groups](https://docs.lovable.dev/features/groups.md).

### Identity

Manage workspace identity and single sign-on (SSO). Configure SAML or OIDC providers, enforce SSO, set session duration, and control how users authenticate. You can also verify your organization’s email domains which are used for SSO and user provisioning.

Users can join your workspace automatically in three ways, controlled from the **User provisioning** section: through their first **SSO login**, by signing up with an email on one of your verified domains (**Verified email sign-up**), or through **Add existing users**, which brings existing Lovable accounts on your verified domains into the workspace in one step. SCIM-based sync from your identity provider is configured separately. Provisioned users appear in the People tab, where you manage their roles and access.

SCIM provisioning is available on **Enterprise** plans. All other features are available on **Business and Enterprise** plans.

See [Workspace identity](https://docs.lovable.dev/features/workspace-identity), [Verified domains](https://docs.lovable.dev/features/verified-domains.md), [SSO](https://docs.lovable.dev/features/business/sso.md), and [SCIM](https://docs.lovable.dev/features/business/scim.md).

### API keys & OAuth

Open **Workspace settings → API keys & OAuth** to manage credentials for external integrations. Both sections require the workspace **owner or admin** role.

| Section | Purpose | Plans |
| - | - | - |
| **Workspace access tokens** | Create API keys for management operations in this workspace. Choose scopes, expiration, credit limits, and IP restrictions, or revoke a key. | **Business and Enterprise** |
| **OAuth clients** | Register OAuth clients to connect your apps to Lovable. Manage scopes, client secrets, and verification for sensitive scopes. | **All plans**. Sensitive scopes require **Business or Enterprise**. |

See [Manage workspace API keys](https://docs.lovable.dev/features/api-keys.md) and [Connect apps to Lovable with OAuth](https://docs.lovable.dev/features/oauth-clients.md).

## Customization

Standardize how projects are created and ensure consistency across teams.

### Instructions

Define workspace-level instructions and context that Lovable uses across all projects. This is useful for coding standards, architecture rules, preferred libraries, and other conventions that should stay consistent.

Only workspace owners and admins can manage workspace instructions. Project instructions can add project-specific context and override workspace-level guidance when needed.

See [Workspace and project instructions](https://docs.lovable.dev/features/knowledge.md).

### Skills

Define reusable, on-demand instructions that Lovable can apply across projects in your workspace. Skills help teams standardize repeatable workflows, such as launch checks, support replies, release notes, and review processes, without adding those instructions to every message.

Use skills for task-specific guidance that should load only when relevant. Use workspace instructions for rules and context that should apply broadly across all projects.

See [Define reusable instructions with skills](https://docs.lovable.dev/features/skills.md).

### Templates

Create reusable design templates from existing projects. Templates copy the full project codebase, including structure, components, styles, and configuration, so new projects start from a consistent foundation.

You can set a default template for the workspace so all new projects begin with a predefined setup, while still allowing customization. Available on **Business and Enterprise** plans.

See [Design templates](https://docs.lovable.dev/features/business/design-templates.md).

### Design systems

Define reusable component libraries, styling guidelines, and setup instructions that apply across projects. Unlike templates, design systems provide ongoing guidance during project generation rather than copying files at the start.

Design systems are managed as projects and can be connected to one or more projects in the workspace. Updates to a design system are applied to connected projects on future generations. You can set one design system as the [workspace default](https://docs.lovable.dev/features/design-systems.md#set-a-default-design-system), so Lovable pre-selects it when members create a project. Available on **all paid plans**. Wrapping an existing npm package as a design system is available on **Enterprise** plans only.

See [Design systems](https://docs.lovable.dev/features/design-systems.md).

### Announcements

Post one announcement banner that every workspace member sees at the top of the dashboard and in the project editor. Format the text, add links and a countdown timer, choose a background color, and decide whether members can dismiss it. Available on **Business and Enterprise** plans.

See [Show an announcement banner to your workspace](https://docs.lovable.dev/features/workspace-announcements.md).

### Events & hooks

Extend your workspace with your own services or Lovable projects. **Events** notify your HTTPS endpoint after something happens, such as a project being published. **Hooks** let your endpoint allow or block an action first, such as checking a message sent in a project's chat for sensitive data before Lovable processes it. Available on **Business and Enterprise** plans.

See [Events & hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md).

### Connector settings

Govern the connectors your workspace uses. Workspace owners and admins control who can create connections and clients for [app + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md) and [app user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md), and which [chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) (MCP servers) members can enable. These are the same controls as **Connectors → Admin settings**, available on **Business and Enterprise** plans.

Under **App + chat connectors**, a **Custom connectors** section lists the [custom connectors](https://docs.lovable.dev/integrations/create-connector.md) your workspace has created for its own APIs. Owners and admins choose who can use each one, edit it, or delete it. The section appears when your workspace has at least one custom connector.

The tab also includes the **MCP registries** section, where owners and admins add browsable directories of MCP servers so members can connect servers without pasting URLs. MCP registries are available on **all plans**.

See [Admin controls](https://docs.lovable.dev/integrations/admin-controls.md) and [MCP registries](https://docs.lovable.dev/integrations/mcp-registries.md).

## Build & deploy

Manage shared configuration used during development and integrations with built-in or external services.

### Git

Manage workspace-level Git connections for GitHub, GitLab, and Bitbucket. Git connections let projects sync their code to an external repository for backup, developer collaboration, local editing, and deployment outside Lovable.

Workspace owners and admins can manage Git providers and connections at the workspace level. Projects can then be linked to repositories for two-way sync. GitLab also supports GitLab.com and self-managed GitLab instances. Bitbucket connections use Bitbucket Cloud workspaces.

Workspace owners and admins can also enable **Include member email addresses in commits**, which records which member triggered each change in the commit message. Available on **Business** and **Enterprise** plans. See [Commit attribution](https://docs.lovable.dev/integrations/git-sync-overview#commit-attribution).

See [GitHub](https://docs.lovable.dev/integrations/github.md), [GitLab](https://docs.lovable.dev/integrations/gitlab.md), and [Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md).

### Build secrets

Store and manage environment variables used during project builds. Secrets are encrypted and available in sandbox environments, but their values are not displayed after being set. Workspace editors can see secret names (read-only) so they can reference the right secret, while adding, editing, and deleting secrets is limited to workspace admins and owners.

Use build secrets for tasks like installing private npm packages, accessing external APIs, or configuring build-time dependencies. Secrets are managed at the workspace level and can be used across projects. Available on **Enterprise** plans.

See [Build secrets](https://docs.lovable.dev/features/build-secrets.md).

### Managed registry

Provide your workspace with its own npm registry, hosted privately inside Lovable. You can publish npm packages directly to it without making them public, and any project in your workspace can install those packages. Available on **Enterprise** plans only.

See [Managed registry](https://docs.lovable.dev/features/managed-registry.md).

### MCP server

Connect AI clients and developer tools, such as ChatGPT, Claude, and Cursor, to Lovable through the Lovable MCP server. The tab shows the server URL, setup steps for common clients, and a **Manage access** shortcut to the workspace's **Third-party MCP clients** setting in **Workspace settings → Security → Privacy & security**.

Available on all plans.

See [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md).

### Workspace domains

View and manage domains purchased through Lovable for your workspace. See all domains in one place, including their status, renewal details, and connected projects.

Domains are managed at the workspace level and can be connected to projects or subdomains, reused across the workspace, and configured with built-in DNS records and registration details. Available on all **paid plans**.

See [Custom domain](https://docs.lovable.dev/features/custom-domain.md).

On the Enterprise plan, the same tab also shows a **Publishing domain** section, where admins and owners connect one domain that every project in the workspace publishes under. See [Publishing domain](https://docs.lovable.dev/features/publishing-domain.md).

## Security

Configure workspace-wide security policies, authentication, and visibility, and monitor overall security posture.

### Privacy and security

The main control panel for workspace-wide security and access settings. Configure default project and website access, publishing permissions, preview links, and sharing rules across the workspace.

You can also control workspace invites, workspace discovery, and external collaborator access, as well as MCP (model context protocol) server access, data collection (including opt-out), auto-fix defaults for eligible security findings, and security scanning policies that gate when projects can be published.

See [Privacy and security](https://docs.lovable.dev/features/privacy-and-security-settings.md).

### Security center

A workspace-wide security dashboard for monitoring risks across all projects. View security scan results, dependency vulnerabilities, secrets usage, authentication policies, and project-level risk signals in one place.

Use the Security center to identify and prioritize issues, track scan coverage, compare security status across projects, filter and export data, and trigger security scans without opening individual projects.

Security center includes:

* **Code analysis**, **Supply chain security**, and **Secrets overview** for reviewing security findings, dependency vulnerabilities, and secrets across the workspace.
* [Security insights](https://docs.lovable.dev/features/security-insights.md) for a portfolio-level view of project risk, including review priority, publish status, ownership, activity, sensitive data findings, security findings, and credit usage. Available on Business and Enterprise plans.
* **Schedule security scans** for automatically running recurring Deep scans across workspace projects. Available on Enterprise plans.

Security center is available on Business and Enterprise plans. Some features, including Schedule security scans and sensitive data (PII) findings, are available only on Enterprise plans.

See [Security center](https://docs.lovable.dev/features/security-center).

### Audit logs

View a searchable record of activity across your workspace, including who performed an action, when it occurred, what changed, and which resource was affected.

Use audit logs to review membership and access changes, project activity, authentication events, and workspace configuration updates. You can filter logs by member, action, resource, and time range, and expand entries to inspect detailed event data. Available on **Enterprise** plans.

See [Audit logs](https://docs.lovable.dev/features/audit-logs.md).

### Data exports

Send audit logs on a schedule to Splunk, Azure Log Analytics, Amazon S3, Google Cloud Storage, or Azure Blob Storage. Each export runs every hour or every 3 hours and shows a history of its runs. Available on **Enterprise** plans.

See [Data exports](https://docs.lovable.dev/features/data-exports).

## Connectors

Manage how your workspace connects to external tools, services, and APIs. Admins and owners control who can create connections and clients for each connector from **Connectors → Admin settings**, which is also how connectors are made available or disabled. Who can use an individual connection is chosen by whoever creates it.

App + chat connectors are available by default. On Business and Enterprise plans, **Who can create connections and clients** starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector until an admin or owner changes it. Connection access is enforced while building and collaborating in Lovable, but not after publishing.

See [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md) for all connector governance settings.


## Related topics

- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
- [Glossary](https://docs.lovable.dev/glossary.md)
- [Organizations: run several workspaces as one company](https://docs.lovable.dev/features/organizations.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
