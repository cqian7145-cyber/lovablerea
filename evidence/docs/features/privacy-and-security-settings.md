# Privacy & security settings
<!-- source: https://docs.lovable.dev/features/privacy-and-security-settings.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Privacy & security settings

> Manage workspace-wide controls for member access, project publishing, external sharing, connected tools, security scans, and data protection.

The **Privacy & security** tab is where **workspace admins and owners** manage workspace-wide controls for access, publishing, sharing, connected tools, security checks, and data protection. Open it from [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**).

Changes on this page save as you make them. Changes with a wide effect, such as enabling automatic deletion of abandoned projects or restricting code downloads, open a confirmation dialog first. The dialog shows what the change does, and the change applies after you confirm.

If your workspace is **Managed by the organization**, the tab shows that the organization manages these settings, and only org admins can change them. See [Lock a workspace's settings to the organization](https://docs.lovable.dev/features/organization-identity.md#lock-a-workspaces-settings-to-the-organization).

Settings are grouped into the same sections shown in the UI.

## Access & membership

Controls how people join the workspace, what access new projects use by default, and whether projects can be moved to another workspace.

### Default project access

**Available on:** All plans; Restricted is available on Business and Enterprise\
**Default:** Workspace

Sets the visibility of every new project at the moment it is created.

> [!NOTE]
>
> Changing the setting does not change the visibility of existing projects.

| Option | Who can see the project |
| :- | :- |
| **Workspace** (default) | All members of this workspace can view, remix, or edit the project based on their role. |
| **Restricted** (Business and Enterprise) | Only the owner and explicitly invited collaborators can access the project. Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them. |

See [Control project access](https://docs.lovable.dev/features/project-visibility.md) for more information.

### Restrict workspace invitations

**Available on:** Enterprise\
**Default:** Disabled

When disabled, editors, admins, and owners can invite viewers and external collaborators by email.

When enabled, only **admins and owners** can invite members by email to this workspace. Editors lose the ability to invite.

> [!NOTE]
>
> This restricts **manual invitations** only. JIT and SCIM provisioning continue to add users based on identity-provider configuration. If your workspace uses [verified-domain JIT](https://docs.lovable.dev/features/workspace-identity#user-provisioning), users with matching email domains will still be automatically provisioned on login.

See [Invite by email](https://docs.lovable.dev/features/people.md#invite-by-email) for more information.

### Require two-factor authentication

**Available on:** Enterprise\
**Default:** Disabled

When enabled, everyone accessing this workspace, including external collaborators, must have [two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md) set up on their Lovable account.

When you enable the toggle, Lovable shows a confirmation dialog explaining what members will experience, and the setting takes effect after you update it.

Members who already have 2FA set up see no change. Lovable redirects anyone without 2FA to a **Set up two-factor authentication** page the next time they use the workspace. There, members either set up a method (an authenticator app, a phone number, or both) and continue where they left off, or log out. Until they enroll, they cannot use the workspace.

Two exemptions apply:

* **Active SSO sessions.** A member who logged in through your workspace SSO provider meets the requirement without setting up 2FA. Lovable does not check whether your identity provider asks for a second factor, so require it in your identity provider. Members who have 2FA on their Lovable account still enter their code after the SSO login.
* **Published websites.** Visitors can still view published projects, including projects published only to the workspace. The exception is [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md): an app doesn't receive a member's identity until that member sets up 2FA.

> [!NOTE]
>
> This setting and [Enforce SSO](https://docs.lovable.dev/features/business/sso.md) are mutually exclusive. When you enable **Enforce SSO**, Lovable automatically disables this setting. You cannot enable this setting while **Enforce SSO** is enabled.

2FA enrollment is account-level, so a member who enrolled for one workspace satisfies the requirement everywhere. Members manage their own methods in **Account settings → Security**. See [Two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md).

### Invite links

**Available on:** Free, Pro, and Business\
**Default:** Enabled

This setting covers both kinds of invite link: the workspace invite links that admins and owners create under **People**, and the project invite links that project editors create from a project's **Share** menu.

When enabled, workspace admins and owners can generate a shareable link that lets anyone use it to join the workspace at a chosen role. Invite links expire 5 days after creation, and only one active link per role can exist at a time. Project editors can create an invite link for their project. Project invite links expire 7 days after creation.

When disabled, no one can create either kind of link. Invite links created earlier stop working, and the **Invite link** control disappears from the **Share** menu. People who already joined through a link keep their access.

See [Invite by link](https://docs.lovable.dev/features/people.md#invite-by-link) and [Share an invite link](https://docs.lovable.dev/features/share-project.md#share-an-invite-link) for more information.

### Workspace discovery

**Available on:** Business and Enterprise\
**Default:** Enabled

When enabled, anyone logging in to Lovable with an email address from your company's [verified domain](https://docs.lovable.dev/features/verified-domains.md) can find this workspace from the **Find your team's workspace** flow and request access. This helps new employees find the workspace without needing a direct invitation.

When disabled, the workspace is invisible to domain-based discovery. Only users with a direct invitation can join.

Public email domains (such as `@gmail.com`) cannot discover workspaces this way regardless of the toggle.

> [!NOTE]
>
> Turning discovery off stops new requests but does not clear any access requests that were already submitted. Review and deny pending requests in **Workspace settings → People**.

See [Workspace access requests](https://docs.lovable.dev/features/people.md#workspace-access-requests) and [Find your team's workspace](https://docs.lovable.dev/features/workspace#find-your-team’s-workspace) for more information.

### Public member profiles

**Available on:** Enterprise\
**Default:** Disabled (member profiles hidden)

Controls whether members' public Lovable profiles at `lovable.dev/@<username>` are visible to people outside the workspace.

When disabled (the default for Enterprise workspaces), a member's profile URL returns a **404 Not Found** to anyone outside the workspace. On public project pages, the member's publisher name, avatar, and profile link are also hidden, and the project shows an anonymous "Lovable user" as the publisher instead.

When enabled, member profiles are publicly visible, just like on other plans.

Hiding only applies to people outside the workspace. Workspace members can still see each other's profiles, and everyone can see their own.

> [!NOTE]
>
> A user has one global Lovable profile. If they belong to any Enterprise workspace that keeps this setting off, their profile stays hidden, even if another workspace allows public profiles. If a workspace leaves the Enterprise plan, its members' profiles are no longer hidden.

When member profiles are hidden, each member's **Profile visibility** setting in **Account settings → Account** is locked and shows "Profile visibility is managed by one of your workspaces." See [Profile settings](https://docs.lovable.dev/introduction/lovable-account-settings#profile).

### Editor project transfers

**Available on:** Enterprise\
**Default:** Disabled

This setting controls whether **workspace editors** can transfer or remix **projects they own** into another workspace. Remixing within the same workspace is not affected by this setting.

Regardless of this setting:

* Workspace owners can always transfer or remix any project in the workspace, including restricted projects.
* Workspace admins can always transfer or remix workspace-visible projects.

When disabled, workspace editors cannot transfer or remix projects they own into another workspace.

When enabled, workspace editors can transfer or remix projects they own into another workspace, including a personal workspace outside your company.

When the **Transfer** or **Remix** option is disabled, hover over it to see why. The tooltip explains what is limiting the action.

> [!NOTE]
>
> For regulated environments, leave this off. When a workspace editor transfers or remixes a project into a personal workspace, the project leaves your company’s governance boundary.

### Require workspace editor role

**Available on:** Enterprise\
**Default:** Disabled

When enabled, only workspace members with the **editor** role or higher can edit projects. Workspace viewers and external collaborators can still view projects but cannot edit them, even if they own a project or were given editor access to it directly, through a folder, or through a workspace group.

They also cannot [request edit access](https://docs.lovable.dev/features/people.md#project-access-requests) to a project they can already view.

When disabled, a viewer who is given editor access to a specific project can edit that project.

> [!NOTE]
>
> Use this to enforce a read-only baseline for viewers and external collaborators across the workspace, regardless of how project access was granted.

### External project collaborators

**Available on:** Business and Enterprise\
**Default:** Allow all

Controls whether people outside your workspace can be added as collaborators on projects in this workspace, and the highest access level they can have. This setting is available whether or not you enforce SSO.

| Option | What it means |
| :- | :- |
| Allow all (default) | External users can be added at any project role, including admin. |
| Allow editors and viewers | External users can be added as project viewers or editors. |
| Allow viewers | External users can be added as read-only project viewers. |
| None allowed | External users cannot be added to projects. If members try to invite someone outside your company to a project, they get an error informing them that this is not allowed. |

When you turn on **Enforce SSO**, Lovable shows a confirmation dialog with a **Remove all external collaborators** checkbox, on by default.

* If you leave it checked, existing external collaborators are removed at the same time SSO is enforced.
* If you uncheck it, existing external collaborators keep their access on every project they were already invited to, capped at **editor** level. The workspace’s **External project collaborators** setting is set to **Allow editors and viewers** as part of this flow.

If you later change **External project collaborators** to **None allowed**, Lovable shows a similar confirmation dialog with a remove option. If you choose not to remove them, existing external collaborators remain in the People list but lose access.

The next time they try to open the workspace or one of their projects, they see an **External collaboration disabled** error. If their email matches one of your verified domains, they’re redirected to log in through SSO instead. A successful SSO login provisions them as a full workspace member through [just-in-time provisioning](https://docs.lovable.dev/features/workspace-identity#user-provisioning), and they’re no longer subject to the external-collaborator restriction.

See [Block or limit external collaborators](https://docs.lovable.dev/features/people.md#block-or-limit-external-collaborators) for the full flow.

## Publishing

Controls what audience published projects use by default, who can be invited from outside the workspace, and whether critical security findings block publishing. Rules that require approval before publishing or block it are [publishing policies](#publishing-policies).

### Default published app access

**Available on:** Business and Enterprise\
**Default:** Anyone

Sets the default audience for a project the first time it is published. Changing this setting does not retroactively change access for already published projects.

| Option | Who can reach the published URL |
| :- | :- |
| **Anyone** (default) | Anyone with the link |
| **Workspace** (Business and Enterprise) | Authenticated workspace members only |

Individual projects can override the workspace default during the publish flow.

See [Publish your project](https://docs.lovable.dev/features/publish.md) for more information.

### External viewer invites

**Available on:** Business and Enterprise\
**Default:** Anyone

Controls who members can invite from outside the workspace to view internally published projects by email, using the **Custom** audience in the publish dialog. See [Invite people outside your workspace](https://docs.lovable.dev/features/publish.md#invite-people-outside-your-workspace).

| Option | Who can be invited |
| :- | :- |
| **Off** | No one. The email invite option disappears from the publish dialog's audience picker. |
| **Specific email domains only** | Addresses on the domains you allow. |
| **Anyone** (default) | Any email address outside the workspace. |

People who were already invited keep their access whichever option you choose.

**Off** and **Specific email domains only** each open a confirmation. Select **Turn off invites** or **Limit invites** to apply the change.

With **Specific email domains only**, a list of allowed domains appears under the setting. Your company's [verified domains](https://docs.lovable.dev/features/verified-domains.md) are always allowed, and you manage those under [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity → Verified domains**). Add any other domain people can be invited from, such as a partner's.

When no domain is allowed, Lovable blocks every external viewer invite. Add a domain to the list, or verify one first.

### Block publishing with critical issues

**Available on:** All plans\
**Default:** Disabled, except on new Enterprise workspaces that Lovable creates, where it starts enabled.

When disabled, projects can be published regardless of critical findings, although the publish dialog still surfaces them as security warnings.

When enabled, a project cannot be published while it has unresolved critical findings. The publish dialog shows **Fix security issues to publish** until you resolve them. Findings you have ignored do not count toward the block, but ignoring a finding does not fix the issue.

The block uses the latest scan results, even when they are outdated, and does not require a fresh Deep scan. Passing it does not prove that your app is secure. Test your app's access rules before publishing.

We recommend enabling this on every workspace. See [Security overview](https://docs.lovable.dev/features/security) for more information.

### App login methods

**Available on:** Business and Enterprise\
**Default:** All methods allowed

Controls which login methods apps built in this workspace may use. Blocked methods are locked for all projects in the workspace, and project owners cannot re-enable them.

Click **Configure** to open the dialog. It lists the [sign-in methods](https://docs.lovable.dev/features/authentication) apps can use:

* [Email](https://docs.lovable.dev/features/email-auth.md)
* [Phone](https://docs.lovable.dev/features/phone-auth.md)
* [Google](https://docs.lovable.dev/features/google-auth.md)
* [Apple](https://docs.lovable.dev/features/apple-auth.md)
* [Microsoft](https://docs.lovable.dev/features/microsoft-auth.md)
* [Lovable](https://docs.lovable.dev/features/lovable-auth.md)
* **SSO**, which covers both [SAML SSO](https://docs.lovable.dev/features/saml-sso.md) and [OIDC sign-in](https://docs.lovable.dev/features/oidc-auth.md)
* [Lovable workspace identity](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)

Use the toggle next to each method to allow or block it. Changes take effect immediately.

Allowing a method does not turn it on. Each project turns on the methods it offers in its own authentication settings.

> [!NOTE]
>
> This only affects login methods for apps built in this workspace. It does not change how workspace members log in to Lovable itself.
>
> **Lovable workspace identity** is different from the other methods: it is not a login button in the app. It lets eligible apps recognize the workspace member who is already logged in to Lovable, without a login page. See [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

## Publishing policies

**Available on:** Enterprise

[Workspace policies](https://docs.lovable.dev/features/workspace-policies.md) block publishing when a policy applies, or require an admin or owner to approve it. Requests appear in the [Action center](https://docs.lovable.dev/features/action-center.md). Each policy has a switch and a **Configure** button. A policy applies immediately to every way an app can be published.

The four policies and what each one checks:

| Policy | What it checks |
| :- | :- |
| **Restrict publishing with unresolved sensitive data findings** | The project has unresolved [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md) findings. Block by default, or require approval. |
| **Restrict publishing by external collaborators** | The person publishing is an external collaborator. Require approval by default, or block. |
| **Restrict publishing externally** | The app is published publicly, including an update to an app that is already public. Require approval by default, or block. |
| **Require approval to publish apps that use connectors** | The project uses connectors of the types you choose. |

Admins and owners publish without a request under the external collaborators and connectors policies. For **Restrict publishing externally**, you choose whether owners and admins or only owners publish without approval, and the row shows the rule in force. The sensitive data policy applies to everyone. See [Workspace policies](https://docs.lovable.dev/features/workspace-policies.md) for how to configure each one, how long an approval lasts, and what disabling a policy does to waiting requests.

## Security checks

Controls automatic security remediation for projects across the workspace.

### Auto-fix security issues

**Available on:** All plans\
**Default:** Selected project (disabled)

Lovable can automatically fix eligible security findings while members build. When auto-fix is enabled, Lovable adds a few of the latest critical database findings and dependency findings from the Quick scan to what it knows about the project when a member sends a build request in the project chat. Lovable then attempts to resolve them as part of the same response. This counts as standard build usage and consumes credits.

Auto-fix is designed for findings that are safe to remediate automatically, such as common row-level security (RLS) misconfigurations, database access patterns, and dependencies with known vulnerabilities. It does not apply fixes for Deep scan findings.

This setting controls the default scope at which auto-fix is applied across the workspace.

| **Option** | **What it means** |
| :- | :- |
| Selected project (default) | Auto-fix is disabled by default. You can enable or disable it for individual projects from **Project settings → Auto-fix security issues**. |
| Externally published projects (Business and Enterprise) | Auto-fix runs automatically only after the project is published externally. After that, it runs each time you send a build request in the project chat. You cannot disable it for externally published projects at the project level. You can still enable it manually for other projects. |
| All published projects | Auto-fix runs automatically only after the project is published, internally or externally. After that, it runs each time you send a build request in the project chat. You cannot disable it for published projects at the project level. You can still enable it manually for unpublished projects. |
| All projects | Auto-fix runs automatically each time you send a build request in the project chat of any project in the workspace, whether or not it has been published. It cannot be disabled at the project level. |

Anyone with project edit access can manage auto-fix for a specific project from **Project settings → Auto-fix security issues**, unless the workspace requires auto-fix for that project.

See [Security overview](https://docs.lovable.dev/features/security) for more information.

## Abandoned projects

**Available on:** Enterprise\
**Default:** Marked abandoned after 60 days; auto-delete off

Automatically identify projects with no recent activity, published and unpublished, and optionally delete them after a grace period. Configure both controls from [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security → Abandoned projects**).

### What counts as activity

A project is marked **abandoned** when it has had no activity for the period set in **Mark as abandoned after**. Activity means any of:

* someone working in the editor (editing or chatting with the AI)
* a visitor using the published app (bots excluded)
* a backend function call

Simply opening or previewing a project is **not** activity, and publishing on its own does not reset the clock. One of the signals above must occur.

### Deleting abandoned projects

When auto-delete is on (**Delete abandoned projects after**), an abandoned project is deleted once the grace period you choose (7, 14, or 30 days) passes. Owners and members with edit access get a warning email and an in-project banner 5 days and 1 day before the deletion date.

Before the deadline you can cancel the deletion at any time by:

* editing the project, or sending it a message, or
* clicking **Keep it** on the in-project banner or in the warning email.

**Keep it** cancels the current deletion only. If the project stays inactive for another abandonment period, Lovable marks it abandoned again.

### Protecting a project from cleanup

Some projects should never count as abandoned, for example a documentation site or a reference app you keep for later. Project editors switch on **Abandonment protection** in **Project settings → General → Lifecycle**, or click **Protect it** on the deletion warning banner. A protected project is never marked abandoned, never gets deletion warnings, and is never deleted for inactivity. Protecting a project that is already marked abandoned also removes the mark and cancels its scheduled deletion.

The protection stays until a project editor switches it off. From the next daily check, the normal inactivity rules apply again.

Workspace admins find protected projects in [Security insights](https://docs.lovable.dev/features/security-insights.md): filter **Abandoned status → Protected**, or show the **Protected since** column, which the CSV export includes as well. Each change is recorded in the [audit log](https://docs.lovable.dev/features/audit-logs.md) as **Project abandonment protection updated**.

> [!NOTE]
>
> Lovable keeps a deleted project for 60 days. During that time you can restore it from [Workspace settings → Workspace → Recently deleted projects](https://lovable.dev/settings/workspace). See [Restore a deleted project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project).

## Sharing

Controls whether members can create public preview links and reuse work across projects in the same workspace.

### Preview link sharing

**Available on:** All plans; disabling is available on Enterprise\
**Default:** Enabled

When enabled, members with project edit access can create view-only preview links that anyone can open without a Lovable account. On all plans, each link can allow or disallow guest comments.

On Free and Pro plans, preview links expire after 7 days. On Business and Enterprise plans, each link can require a password and set an expiration of 24 hours, 7 days, 30 days, or never.

When disabled, members cannot create new preview links. Links created before keep working until they expire or someone deletes them. People with edit access can still open **Share a preview link** in the **Share** menu to delete those links.

> [!NOTE]
>
> Preview links bypass the **Default published app access** setting. Even when published projects are workspace-only, anyone with an active preview link can open the in-progress version without a Lovable account, unless the link requires a password.
>
> A password-protected link can only be opened by people who know the password, but the password does not identify them. To fully block external viewing, disable this setting.

See [Share preview links](https://docs.lovable.dev/features/share-project.md#share-preview-links) for more information.

### Code downloads

**Available on:** Enterprise\
**Default:** Enabled

Controls whether workspace members and collaborators can download project source code from Lovable.

When enabled, members with edit access can [download a project's source code](https://docs.lovable.dev/features/code-mode.md#download-your-project’s-codebase) as a zip file.

When disabled, only workspace admins and owners can download project source code as a zip file. Other members have the download option disabled and see a message that only workspace admins and owners can download the code.

This setting only applies to zip downloads from Lovable. It does not affect access to connected Git repositories, or the ability to view code in the editor.

### Cross-project sharing

**Available on:** All plans\
**Default:** Enabled

When enabled, workspace members can reference and reuse implementations from other projects in the same workspace. Members can reference a project by typing `@` in the project chat or by asking Lovable to use an existing project. All cross-project access is read-only. Referenced projects cannot be modified.

When disabled, cross-project sharing is turned off for all projects in the workspace. Members cannot reference other projects and other projects cannot reference them.

> [!NOTE]
>
> Cross-project sharing can also be controlled at the project level. Project editors and above can disable it for a specific project from **Project settings → Cross-project sharing**. When disabled at the project level, that project cannot reference others and cannot be referenced. If any level blocks access, the reference fails.

See [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md) for more information.

## Lovable MCP server

Control third-party MCP client access to this workspace.

### Third-party MCP clients

**Available on:** Business and Enterprise\
**Default:** Enabled for Business; Disabled for Enterprise

When enabled, external MCP clients such as Claude Desktop and Cursor can connect to this workspace through [mcp.lovable.dev](https://mcp.lovable.dev). This allows developers to build and manage their Lovable projects directly from their preferred tools using the MCP protocol.

On Free and Pro workspaces, this is always enabled and cannot be configured. On Business workspaces, it is enabled by default and can be turned off. On Enterprise workspaces, it is disabled by default and must be explicitly turned on by a workspace admin or owner.

Connection details and client setup steps live in the [MCP server tab](https://docs.lovable.dev/features/workspace-admin-settings.md#mcp-server) (**Workspace settings → Build & deploy → MCP server**), which links back to this setting through its **Manage access** button.

See [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) for more information.

## MCP connectors

Controls whether members can connect external tools and data sources to Lovable through Model Context Protocol (MCP) servers.

### Remote MCP connectors

**Available on:** All plans\
**Default:** Enabled

When enabled, workspace members can connect pre-built and custom MCP servers to their projects. MCP servers let the agent read from external databases, APIs, and other data sources during builds.

When disabled, MCP servers access is turned off across the entire workspace. No new MCP connections can be created.

See [Chat connectors (MCP servers)](https://docs.lovable.dev/integrations/chat-connectors.md) for more information.

### Local desktop MCP servers

**Available on:** All plans\
**Default:** Enabled (disabled on Enterprise workspaces)

> [!NOTE]
>
> This setting has no effect when **Remote MCP connectors** is disabled. Both must be enabled for local desktop MCP servers to work.

When enabled, members using the Lovable desktop app can connect MCP servers running on their own machine to their projects. This lets the agent reach localhost tools and private services that are not exposed to the internet.

When disabled, only remote MCP connectors are allowed. Local desktop connections are blocked.

See [Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md) for more information.

## Data protection

Controls sensitive data detection and storage exposure rules.

### Sensitive data scanning

**Available on:** Enterprise\
**Default:** Disabled

When enabled, Lovable scans workspace content for personally identifiable information (PII). This is the **workspace-level main switch for sensitive data protection features**, including on-demand scans (chat history, built-in databases, and storage), chat send protection for new messages and attached files, and the [Restrict publishing with unresolved sensitive data findings](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-with-unresolved-sensitive-data-findings) policy.

It also adds a **Sensitive data** tab to projects where recorded PII findings can be reviewed.

See [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md) for more information.

### Chat send protection

**Available on:** Enterprise (only visible when **Sensitive data scanning** is enabled)\
**Default:** Log only

Determines what happens when PII is detected in new chat messages or attached files.

On-demand scans of chat history, the built-in database, or storage still work regardless of the chat send protection mode.

| **Mode** | **Behavior** |
| :- | :- |
| **Off** | No scanning. Messages pass through to the agent without inspection or logging. |
| **Log only** (default) | The scan runs. If PII is detected, a finding is recorded and available for review in the project's **Sensitive data** tab, but the message sends without interruption. This is the default when sensitive data scanning is first enabled. |
| **Ask before sending** | The scan runs. If PII is detected, the message is paused and the user chooses whether to edit, send a redacted version, or send the original. Detected PII is logged only if the user sends the original message, otherwise the original message is discarded. Can be overridden on project level by enabling **PII prompt auto-approval** from the **Sensitive data** tab. |
| **Block original** | The scan runs. If PII is detected, the user cannot send the original. They can only edit the message or send a redacted version. The original message is discarded and nothing about the original PII gets logged. |

See [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md) for more information.

### Block public storage buckets

**Available on:** All plans\
**Default:** Enabled

When enabled, workspace members cannot create publicly accessible storage buckets in the built-in storage. All new buckets are forced to private access.

When disabled, members can create public storage buckets.

See [Storage](https://docs.lovable.dev/features/storage.md) for more information on public and private buckets.

### Default data hosting region

**Available on:** Business and Enterprise\
**Default:** Not set

Sets the default data region for every **new** project created in the workspace with the built-in backend. Use it when your company requires the backends to live in a specific geography.

Choose one of the following regions:

| Region | Geography |
| :- | :- |
| **Americas** | North and South America |
| **Europe** | Europe, Middle East, and Africa |
| **Asia Pacific** | Asia Pacific |

Within a region, Lovable automatically distributes new projects across available data centers.

> [!NOTE]
>
> **Country-specific regions** (for example, Germany, Japan, or United States East) can be enabled for Enterprise workspaces on request, subject to available capacity in that region. Contact your Lovable account team to discuss your requirements.

When a default data hosting region is set:

* It applies only to **new** projects created after you update the setting.
* Existing projects keep the region they were created in and are not migrated.
* Workspace members cannot override the default region when creating a new project.

To remove the default region, open the dropdown and select **Not set**. New projects then use the region closest to the member who creates them.

> [!NOTE]
>
> Setting a default data hosting region requires new projects to use a micro database instance or higher, which may use more credits.

See [Choose where your project's data is stored](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored) for more information on how regions work.

This setting covers where project data is stored. For the region where AI model requests are processed, see [EU inference](#eu-inference).

### EU inference

**Available on:** Enterprise\
**Default:** Disabled

When enabled, AI model requests from this workspace run on model endpoints in the European Union. This covers the requests Lovable makes while you build (the project chat, Chats, background tasks, security scans, and image generation) and the requests that the [AI features in your published apps](https://docs.lovable.dev/features/ai) make.

When you enable or disable the setting, Lovable shows a confirmation dialog. The change may take about 20 minutes to apply to new requests. You can change the setting once per hour. Until then, the switch is disabled and shows when you can change it again.

Some features are not available while EU inference is enabled, and some agent tools run outside the EU. See [Limitations](https://docs.lovable.dev/features/eu-inference.md#limitations).

> [!NOTE]
>
> Your workspace uses more credits while EU inference is enabled. The **Credits** panel in [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) shows an **EU inference enabled** badge while the setting is on.

See [EU inference](https://docs.lovable.dev/features/eu-inference.md) for the providers, the regions, and what is not covered.

### Extended-retention models

**Available on:** Enterprise\
**Default:** Disabled

When enabled, Lovable can use models whose provider retains prompts and outputs for at least 30 days before automatic deletion. When disabled, the workspace uses only zero-data-retention models, which excludes some of the most capable models.

The setting applies to every member and project in the workspace, both while Lovable builds your projects and in the [AI features](https://docs.lovable.dev/features/ai) of apps published from the workspace, including content those apps send on behalf of their own users. Retained data is never used for AI model training. Content that the provider's safety systems flag, or that is subject to a legal hold, may be retained for up to 2 years. Lovable's own data handling does not change.

When you enable the setting, a dialog summarizes these terms. Confirm that you have read them and are authorized to enable the setting for the workspace, then select **Enable extended-retention models**. When you disable the setting, Lovable asks you to confirm. Select **Turn off these models**.

Lovable records the change, including who made it and when, in the workspace [audit logs](https://docs.lovable.dev/features/audit-logs.md) as **Extended-retention models setting changed**.

Either change takes effect on your next request. Requests already in progress finish on their current model, and data the provider already retained remains subject to the provider's retention period. If the terms change while the setting is enabled, your workspace keeps running under the terms you accepted. A **Review updated terms** button appears next to the setting, and an admin accepts the new terms the same way.


## Related topics

- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
