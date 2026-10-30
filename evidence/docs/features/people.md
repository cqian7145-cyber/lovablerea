# Manage workspace members from the People tab
<!-- source: https://docs.lovable.dev/features/people.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage workspace members from the People tab

> Manage workspace members, invitations, roles, access requests, and per-member credit limits.

The **People** tab is the central place to manage everyone in your workspace. Every member appears here, whether they joined by invitation, through SSO, via SCIM, or as an external collaborator on a project.

**Workspace owners and admins** can invite members, change roles, remove members, approve workspace and project access requests, and export the workspace member list as CSV. You can also track per-member credit usage and set individual credit limits that override a member's group limit and the workspace default.

Open it from **Workspace settings → People**.

> [!NOTE]
>
> This page is about the **People** tab of one workspace. Looking for everyone across the workspaces of an Enterprise [organization](https://docs.lovable.dev/features/organizations)? See [Manage people across the workspaces in your organization](https://docs.lovable.dev/features/organization-people.md). The two are different pages.

## People tab access and permissions

The tab is visible to every workspace role except external collaborators. What each role can do inside it varies.

* **External collaborators** do not see the People tab.
* **Viewers** can browse the member list, search, filter, sort, and view any active member's profile (if public). They cannot take any management action, but they can [request a higher role](#request-a-higher-workspace-role).
* **Editors** can do and see everything viewers can, plus:
  * Invite and remove viewers and external collaborators
    > [!NOTE]
    >
    > On **Enterprise plans**, you can choose to only allow **admins and owners** to invite people by email. Go to **Workspace settings → Privacy & security → Restrict workspace invitations.**
  * Approve project-level access requests.
* **Admins** can do and see everything except adding, removing, or promoting owners.
* **Owners** can do and see everything.
  > [!NOTE]
  >
  > Only owners can invite and remove owners, and promote existing members to owner.

## The member list

The list shows all current members, including external collaborators, along with any pending invitations. Members who have been removed or who have left the workspace are not retained on this list.

Available information:

* **Name and email**
* **Role**: Owner, admin, editor, viewer, or collaborator. When a workspace has more than one owner, the [primary owner](#the-primary-owner) is marked **Owner\***.
* **Joined date**: When the member accepted an invitation or was provisioned
* **Current month usage**: Build credits used this calendar month
* **Total usage**: Lifetime build-credit consumption on this workspace
* **Credit limit**: Monthly build-credit limit that applies to the member. This is their individual limit when one is set, otherwise their highest monthly group limit, otherwise the workspace default. Empty if none is set. The workspace default is the default user limit set in [Usage limits & alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md).
  > [!NOTE]
  >
  > When a member reaches their limit, they cannot use more build credits until the 1st of the next month UTC.

Available actions:

* **Search** by name or email
* **Filter** by role, or by SCIM-managed status for Enterprise workspaces with [SCIM](https://docs.lovable.dev/features/business/scim.md) configured. This lets you show SCIM-provisioned seats or non-SCIM seats. The selection is reflected in the URL, for example `?scim=managed` or `?scim=unmanaged`, so deep links and browser navigation work.
* **Sort** by name, role, joined date, current month usage, total usage, or credit limit
* **Open a member's row menu** to:
  * View their profile in a new tab
  * [Set an individual credit limit](#set-a-per-member-credit-limit)
  * [Remove the member](#remove-a-member) or revoke their pending invitation. On your own row, the remove option becomes [Leave workspace](https://docs.lovable.dev/features/workspace#leave-a-workspace).
* [Change a member's role](#change-a-member’s-role) by clicking the role dropdown next to their name in the role column
* **Select multiple members** for bulk actions (change role, set credit limit, remove members)
* **Import limits** on Enterprise plans: [set per-member credit limits in bulk from a CSV](#import-credit-limits-from-a-csv)
* [**Export**](#export-the-member-list) the full workspace member list as a CSV

### Export the member list

Workspace owners and admins can download the full member list as a CSV file. Select **Export** in the toolbar of the **People** tab. The export always covers every member and pending invitation in the workspace, regardless of the search or filters you have applied. The file is named `workspace_members_YYYY-MM-DD_HH-MM.csv`, for example `workspace_members_2026-09-24_15-30.csv`.

Each row is one member or pending invitation, with these columns:

* **Email** and **Display Name**
* **Role**
* **Credit Limit**: the member's personal monthly credit limit, or `Not set`. A [personal limit](#set-a-per-member-credit-limit) overrides the workspace default for that member.
* **Status** and **Joined At**: `Active` and the date the member joined, or `Pending` for an invitation that has not been accepted
* **Monthly Usage** and **Lifetime Usage**: the same figures as the member list's current month usage and total usage
* **Effective Credit Limit**: the limit that applies to the member. This is their personal limit when one is set, otherwise the workspace default, or `Not set` when neither is set.
* **Credit Limit Source**: `Personal`, `Workspace default`, or `Not set`, showing where the effective limit comes from.

## User insights

Click any member row to open a **User insights** profile. Workspace owners and admins can use it to review what a member does in the workspace without leaving the People tab, for example to audit seat usage, set sensible credit limits, or review project access before offboarding.

The profile shows:

* **Identity**: the member's name, email, workspace role, and a SCIM badge if the seat is provisioned through your identity provider
* **Credit usage**: credits used in the last 7 days and the last 30 days
* **Created**: projects the member created in the workspace, with visibility and per-project credit usage over the last 30 days
* **Collaborated on**: projects the member has direct access to, with their access level, per-project credit usage, and a **Pending** badge for project invitations they have not yet accepted

Project lists are sorted by latest edit by default, and you can switch to sorting by highest usage. Clicking a project opens it in a new tab.

On Enterprise workspaces with [audit logs](https://docs.lovable.dev/features/audit-logs.md), the profile also includes an **Activity** tab showing the member's recent workspace actions.

The profile is read-only. To change a role, set a credit limit, or remove the member, use the member list actions described above.

## Invite members

You can invite members in two ways: by email or with an invite link (not available on Enterprise plans).

> [!NOTE]
>
> Free workspaces can send **5** email invitations per day. Pro, Business, and Enterprise workspaces have no daily limit. Joining through an invite link does not count toward the limit.

Invites can also be blocked with an "Invite was blocked due to suspicious activity" message by automated fraud checks. There is no self-serve way to lift this block. If you believe it is a mistake, contact [Lovable Support](https://lovable.dev/support).

### Invite by email

1. Go to **Workspace settings → People**
2. Click **Invite members**
3. Enter one or more email addresses
4. Select a role:
   * **Owner** (only available to existing owners on Business and Enterprise plans)
   * **Admin** (available on paid plans)
   * **Editor**
   * **Viewer** (available on paid plans)
5. Click **Invite**

Pending invitations appear in the list with status **Invited** and can be revoked from the row menu.

Email invites are valid for **30 days**, and the invitation email states the expiry date. After 30 days, the invite disappears from the People list, the link in the invitation email stops working, and the invitation no longer grants access through any other path, such as domain auto-join or SSO login. This also applies to invitations that were already pending when the 30-day limit was introduced.

To bring someone in after their invite expires, invite them again. A new invitation starts a fresh 30-day window.

> [!NOTE]
>
> On **Enterprise plans**, you can choose to only allow **admins and owners** to invite people by email. Go to **Workspace settings → Privacy & security → Restrict workspace invitations.**

### Invite by link

1. Go to **Workspace settings → People**
2. Click **Invite link**
3. Select the role:
   * Editor
   * Viewer (available on paid plans)
4. Click **Create invite link**
5. Copy and share the link

> [!NOTE]
>
> Enterprise workspaces do not support invite links. On all other plans, admins and owners can disable invite links entirely from **Workspace settings → Privacy & security → Invite links.**

Invite links expire after **5 days** and can be regenerated or deleted at any time.

* Only **one active link per role** can exist at a time.
* Creating a new link replaces the previous one.

> [!NOTE]
>
> On Business and Enterprise workspaces with **SSO enforcement** on, workspace invite links only work for users whose email is on a verified workspace domain and the link’s access level is within the workspace’s just-in-time provisioning role.

## Automatic user provisioning

Beyond manual invites available in the People tab, Lovable can automatically add members. The provisioning options are configured in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**); see [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity) for the full setup. Provisioned members appear in the People tab, where roles and access can be managed.

* **SSO login** (just-in-time, or JIT, provisioning): When a user logs in to Lovable through your configured SSO provider for the first time, they’re automatically added to your company workspace at the JIT default role you set (admin, editor, or viewer). On **Enterprise** plans, owners and admins can toggle this from the **SSO login** row once an SSO provider is configured; on **Business** plans, it's enabled automatically with a configured SSO provider and shown as a read-only status. See [SSO](https://docs.lovable.dev/features/business/sso.md) for more information.
* **Verified email sign-up** (domain-based provisioning): When a user signs up to Lovable with an email matching one of your [verified domains](https://docs.lovable.dev/features/verified-domains.md), Lovable adds them at the configured default role (editor or viewer). This works for any sign-up on a verified domain, with or without SSO.
* **Add existing users**: A one-time action in the Identity tab that adds people who already have Lovable accounts with verified-domain emails to your workspace, so you don't have to wait for them to log in or sign up again.
* **SCIM provisioning (Enterprise)**: User and group lifecycle is managed centrally from your identity provider. When you assign a user to Lovable in the IdP, the user is created in the workspace at the configured role. Unassigning the user removes their membership, and changes to group membership or role mappings in the IdP are synced automatically. SCIM is configured separately from the User provisioning section. See [SCIM](https://docs.lovable.dev/features/business/scim.md) for more information.

## External collaborators

The **collaborator role** is for people outside your core team, such as freelancers, clients, contractors, or partners, who need access to specific projects but shouldn't have broad workspace access.

Collaborators can only:

* See basic workspace information
* See and access projects that have been shared with them (via the **Shared with me** tab on the Lovable dashboard), according to the assigned project access level
* Open the **Plans & credit usage** tab to see the current plan, credit balance, and usage, but every **billing control is disabled** for them. They cannot initiate or approve any charge against the workspace
* Leave the workspace

### How collaborators are added

The **collaborator role** is assigned when you **invite a non-member to a project** from that project's [Share menu](https://docs.lovable.dev/features/share-project.md). After that, they appear in the People list as members of your workspace with the **collaborator** role. This lets you track their activity, set a per-member credit limit, and remove their access when needed. Collaborators cannot be invited from the People tab.

On **Business** and **Enterprise** plans, Lovable warns you before inviting someone who isn’t a member of your workspace.

> [!NOTE]
>
> Project invitees whose email matches one of your [verified domains](https://docs.lovable.dev/features/verified-domains.md) do not become collaborators when **Verified email sign-up** is enabled in Identity settings. They join the workspace as full members at your configured default role instead, and the invite is not subject to the **External project collaborators** setting. Existing verified-domain collaborators are upgraded to the default role the next time they're invited to a project. When **Verified email sign-up** is disabled, Lovable treats verified-domain invitees like any other external invitee, and the **External project collaborators** setting decides whether they are added as collaborators or blocked. If the invite is blocked, the inviter sees **This person's email domain is verified for this workspace, but JIT provisioning is turned off.** See [Restrict a domain to SSO (domain lock)](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock).

> [!TIP]
>
> On Enterprise plans, you can track workspace membership events in [Audit logs](https://docs.lovable.dev/features/audit-logs.md).

### Project access levels for collaborators

When you share a project with someone, the [Share menu](https://docs.lovable.dev/features/share-project.md) lists these project-level access options. The default is **Can edit**, except on Enterprise plans, where it is **Can view**.

* **Admin** (paid plans): Full access to the project, including all project settings, integrations, and external connections.
* **Can edit**: Build, edit, and manage most project settings. Some advanced settings, such as integrations and external connections, are reserved for admins.
* **Can view** (paid plans): Read-only access to the project editor.

External collaborators receive the access level you select in the **Share** menu, up to the highest role your workspace allows for them. See [Block or limit external collaborators](#block-or-limit-external-collaborators).

### How collaborators use workspace credits

In Lovable, credits belong to the workspace that owns the project. Every prompt draws from that workspace's credit pool, regardless of who is prompting. External collaborators always consume **your workspace's** credits, not their own.

### Block or limit external collaborators

On **Business and Enterprise** workspaces, owners and admins can control whether people outside the workspace can be added as project collaborators, and the highest project role they can have. This setting is available whether or not you enforce SSO. When **Enforce SSO** is on, external collaborators are blocked by default until an owner or admin explicitly allows them.

On Enterprise workspaces, the [Restrict publishing by external collaborators](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-by-external-collaborators) policy either blocks external collaborators from publishing or requires an admin or owner to approve their apps first.

To block or limit external collaborator access:

1. Open **Workspace settings → Privacy & security** and find the **External project collaborators** control.
2. Choose the highest project role someone outside the workspace can have:
   * **None allowed**: block external collaborators entirely. If a member tries to invite someone outside your company to a project, Lovable blocks the invitation and shows an error.
   * **Allow viewers**: external collaborators are capped at read-only access on every project they're invited to.
   * **Allow editors and viewers**: external collaborators can have at most editor access.
   * **Allow all**: external collaborators can be given any project role, including admin.

### How access setting changes affect existing collaborators

When you turn on **Enforce SSO**, Lovable shows a confirmation dialog with a **Remove all external collaborators** checkbox, on by default.

* If you leave it checked, existing external collaborators are removed at the same time SSO is enforced.
* If you uncheck it, existing external collaborators keep their access on every project they were already invited to, capped at **editor** level. The workspace's **External project collaborators** setting is set to **Allow editors and viewers** as part of this flow.

If you later change **External project collaborators** to **None allowed**, Lovable shows a similar confirmation dialog with a remove option. If you choose not to remove them, existing external collaborators remain in the People list but lose access. The next time they try to open the workspace or one of their projects, they see an **External collaboration disabled** error.

If their email matches one of your verified domains, they're redirected to log in through SSO instead. A successful SSO login provisions them as a full workspace member through just-in-time provisioning, and they're no longer subject to the external-collaborator restriction.

## Manage existing members

You can demote or promote existing members, remove members, or set individual credit limits from the People tab. This includes external collaborators as well.

### Change a member's role

To change a member's role, click the role dropdown next to the member's row, then choose a new role. Changes take effect immediately. When you make someone an admin or owner, Lovable shows what the role includes and asks you to confirm first, and the workspace's admins and owners receive an email about the change.

* Only owners can promote existing members to owner.
* The [primary owner](#the-primary-owner) cannot be demoted. To change who the primary owner is, [transfer primary ownership](#transfer-primary-ownership) first.
* Existing members cannot be downgraded to collaborator. See [External collaborators](#external-collaborators) above.
* Existing collaborators can be promoted to a regular workspace role (viewer, editor, admin, or owner). After promotion, they become full workspace members with corresponding access. They're no longer limited to specific projects.

### The primary owner

A workspace can have several owners, but one of them is the **primary owner**. Lovable uses the primary owner for billing and for domain claims. When a workspace has more than one owner, the primary owner is marked **Owner\*** in the member list, and the marker's tooltip reads "This is the primary owner, used for billing and domain claims." A workspace with a single owner shows no marker.

You cannot demote the primary owner, on their own or in a bulk role change. You can still demote other owners. To change who the primary owner is, transfer primary ownership.

### Transfer primary ownership

Only the current primary owner can transfer primary ownership. Every plan includes this option.

1. Go to **Workspace settings → Workspace**.
2. Under **Workspace access**, find **Transfer primary ownership** and click **Transfer**.
3. Under **New primary owner**, select an active workspace member, or enter the email address of another Lovable account. The address must be a verified email on exactly one Lovable account.
4. If the person is not in the workspace, or is a viewer or an external collaborator, Lovable warns that the transfer gives them full owner access. Lovable shows no such warning for owners, admins, or editors.
5. Click **Transfer**.

After the transfer:

* The person becomes the primary owner. If they were not already an owner, Lovable promotes them to **owner**. Someone outside the workspace joins it as an owner immediately, with no invitation to accept. On Free and Pro plans, a person who was not already an owner, admin, or editor counts toward the 200-member limit, so the transfer fails when the workspace has reached that limit.
* You remain an owner of the workspace. Only the new primary owner can transfer primary ownership again.
* The workspace's owners and admins, including you and the new primary owner, receive an email about the change. On Enterprise plans, the transfer is recorded in the [audit logs](https://docs.lovable.dev/features/audit-logs.md).

> [!NOTE]
>
> When [SCIM](https://docs.lovable.dev/features/business/scim.md) manages your workspace members, you can only transfer primary ownership to an existing member, not to an account outside the workspace.

### Remove a member

To remove a member, click the three dots menu from that member's row, then click **Remove member**. You cannot remove the workspace's only owner.

When you remove someone:

* Their workspace-level access is revoked immediately
* All of their project access within the workspace is revoked immediately
* They receive an email letting them know they were removed from the workspace
* For regular members (owner, admin, editor), the projects and folders they owned are transferred to another member. You choose the recipient or keep the default. See [Choose who inherits their projects](#choose-who-inherits-their-projects). External collaborators never own projects, so no transfer is needed.
* This cannot be undone. To restore access, invite them again.

#### Choose who inherits their projects

When you remove an active member who owns projects, the **Remove workspace member?** dialog asks who should receive them before Lovable completes the removal.

* **Transfer their projects to** (the label shows how many projects will transfer): select any active owner, admin, or editor in the workspace, including yourself. The default, **Member with the highest role (automatic)**, gives the projects to the remaining member with the highest role (owners first, then admins, then editors). If two members share the highest role, the one who joined earliest receives them. Below the list, Lovable notes that their workspace folders move with the projects.
* If any of their projects are published to the web, Lovable warns you. To take the transferred projects offline as part of the removal, select **Unpublish the transferred projects**. Projects published to your workspace only remain online.

Click **Transfer and remove** to confirm. If the member owns only Restricted projects, Lovable shows no recipient list, and the button reads **Remove member**.

Four exceptions apply:

* Projects whose access is set to **Restricted** are not transferred and keep the removed member as their owner. The dialog says how many are left out and does not count them in the transfer. A workspace owner has to transfer them manually from the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) or from [project settings](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership), because workspace owners can open every project, including Restricted ones. A published Restricted project stays online.
* Their [personal folders](https://docs.lovable.dev/introduction/project-folders.md#personal-folders) never go to the recipient you selected. They always go to a workspace owner. When the workspace has several owners, the one who joined earliest receives them.
* [Connections](https://docs.lovable.dev/integrations/app-connectors.md) the member created remain in the workspace with their existing access settings. Workspace admins and owners can [delete them](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection).
* Lovable transfers projects automatically, with no choice of recipient, when you remove several members at once, when a member leaves the workspace, and when [SCIM deprovisions a member](https://docs.lovable.dev/features/business/scim.md#user-deprovisioning).

### Set a per-member credit limit

The workspace default applies to members with no individual limit and no group limit. It is set as a default user limit in [Usage limits & alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md), which also explains [which limit applies to a member](https://docs.lovable.dev/features/usage-limits-and-alerts.md#which-limit-applies-to-a-member). Individual credit limits apply only to members where an explicit credit limit has been set.

To override the workspace default monthly credit limit for a member, click on the three dots menu from that member's row, then click **Set credit limit.** To set limits for many members at once on Enterprise plans, [import them from a CSV](#import-credit-limits-from-a-csv) instead.

Member credit limits count build credits only. Run credits (consumed when Lovable [hosts your app](https://docs.lovable.dev/features/hosting.md) and runs its [built-in backend](https://docs.lovable.dev/features/cloud), including AI features in deployed apps) belong to the project, not to the member who built it, so they never count toward a member's limit. To cap run usage, or to set limits on projects, groups, or the whole workspace, use [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md).

When a member reaches their limit, they cannot use more build credits until the 1st of the next month UTC.

### Bulk actions

Select multiple members using the row checkboxes, then use the bulk actions menu to:

* Change roles
* Set credit limits
* Remove members

### Import credit limits from a CSV

On Enterprise workspaces, workspace owners and admins can set a different credit limit for each member in one upload instead of editing members one at a time. On the **All** tab, select **Import limits**, then upload a CSV with an `email` and a `monthly_credit_limit` column, or start from the downloadable template.

Each limit is the member's final monthly cap, not an amount added to their current limit. Decimals and `0` are valid, and a limit of `0` blocks new credit usage for that member. A file can hold up to 1,000 rows and must match active workspace members by email. Rows for pending invitees are rejected.

Lovable validates the file and shows a preview with a per-row status before anything is applied. Every row must be valid before you can select **Apply limits**. Fix or remove the rows marked **Error** and upload the file again.

The import overwrites each listed member's current limit with the value in their row. To take a member off their individual limit so that their group limit or the workspace default applies again, enter `default` in the limit column instead of a number. An empty limit cell is a validation error, not a cleared limit, so a blank cell can't remove someone's limit by accident. To change or clear one member's limit without a file, use **Set credit limit** from their row menu.

When someone asks to join the workspace, asks for a higher role, or asks for access to a specific project, the request appears on the People tab.

### Workspace access requests

People who discover the workspace through the [Find workspaces](https://docs.lovable.dev/features/workspace#find-your-team’s-workspace) flow can request to join it. The flow is driven by **Workspace discovery**, which is a **Business and Enterprise** feature.

**Business and Enterprise** workspaces are discoverable by default. Owners and admins can turn this off in **Privacy & security → Workspace discovery**.

The [Find workspaces](https://docs.lovable.dev/features/workspace#find-your-team’s-workspace) flow is available to accounts using **non-public email domains** (such as `@yourcompany.com`). Public domains like `@gmail.com` or `@hotmail.com` cannot discover or request access to workspaces this way.

Each incoming request includes the role the requester is asking for (viewer, editor, or admin). Owners and admins can approve the request (granting the requested role, or a different role if you adjust it) or deny it.

### Request a higher workspace role

Viewers can ask for editor or admin access, and editors can ask for admin access. At the top of the **People** tab, select **Request Editor access** or **Request Admin access**. Add an optional reason, then select **Send request**. Admin access requires a paid workspace plan.

You can have one pending role request at a time. Select **Withdraw request** to cancel the request you sent. To ask for a different role, cancel the pending request first, then send a new one. If your request is denied, you can send it again with **Request again**.

Lovable notifies the workspace's admins and owners, who review the request on the **Requests** tab in **People**. The request shows your current role, the role you asked for, and your reason. Admins and owners can approve or deny it. Lovable notifies you of the result.

When [SCIM](https://docs.lovable.dev/features/business/scim.md) manages your workspace's roles, you cannot request a different role in Lovable. Ask your identity provider's administrator to change your group membership instead.

### Project access requests

A workspace member or external user who opens a project they cannot access can request access at the role they need.

If you can already view a project but not edit it, select **Request to edit** at the top of the project. Add an optional message, then send the request. You cannot withdraw a request after you send it. If your request is denied, you can send a new one.

> [!NOTE]
>
> **What happens after you request access?** Lovable emails the project's owner, or the workspace's admins and owners. If your request is approved, you'll receive an email with a link to the project. If it's denied, no notification is sent.

On Enterprise workspaces, [Require workspace editor role](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-workspace-editor-role) prevents workspace viewers and external collaborators from getting edit access. You can still send the request. Lovable refuses it and tells you to contact a workspace admin.

Requests appear on the **People** tab for workspace admins, owners, and editors. Workspace admins and owners can approve requests for any project in the workspace. Editors see only requests for projects where they have admin or owner access.

Approving a request grants the user the access level they requested on the specific project. Denying rejects the request without granting access.

Approving a project access request does not change the user's workspace-level role, only their access to that one project.

> [!NOTE]
>
> * Granting admin or viewer access additionally requires a paid plan.
> * Approving a request from someone outside your workspace is subject to the **External project collaborators** setting on Business and Enterprise workspaces.

## Related settings

| Where | What it controls |
| - | - |
| [Workspace settings → Usage limits & alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md) | Default member credit limit for members with no individual or group limit, plus limits on projects, groups, and the workspace |
| Workspace settings → Privacy & security | <ul><li>Restrict workspace invitations (Enterprise)</li><li>Disable invite links (Free, Pro, and Business)</li><li>Workspace discovery (Business and Enterprise)</li><li>External project collaborators (Business and Enterprise)</li></ul> |
| [Workspace settings → Access → Identity](https://docs.lovable.dev/features/workspace-identity) | <ul><li>Verified domains</li><li>SSO providers</li><li>Enforce SSO</li><li>SSO login (JIT provisioning)</li><li>Verified email sign-up</li><li>Add existing users</li><li>SCIM provisioning</li></ul> |
| Workspace settings → Plans & credit usage | Plan tier that determines which roles exist |
| Workspace settings → Audit logs (Enterprise) | Record of invites, role changes, removals, and access-request decisions |

## FAQ

> **How many members can one workspace have?**
>
> Free and Pro workspaces hold up to **200 members** with an owner, admin, or editor role. Viewers and external collaborators don't count toward that. Business and Enterprise workspaces have no member limit by default. For Enterprise workspaces, custom member limits can optionally be set.
>
> For how many people you can invite per day, see [Invite members](#invite-members).

> **Can I change the workspace owner?**
>
> Yes. Owners can promote other members to owner. A workspace can have **multiple owners**.
>
> One of them is the [primary owner](#the-primary-owner), used for billing and domain claims. The primary owner can transfer that role to another member, or to a Lovable account outside the workspace, with [Transfer primary ownership](#transfer-primary-ownership) in **Workspace settings → Workspace**.

> **Can workspace admins promote another member to workspace owner?**
>
> No. Only existing owners can promote another member to owner. Admins can manage every other role (admin, editor, viewer, collaborator).

> **Can workspace editors invite anyone to the workspace?**
>
> Editors can only invite viewers and external collaborators (the collaborator role is used when inviting non-members to a project).
>
> On Enterprise plans, owners and admins can remove this capability by turning on **Restrict workspace invitations** in Privacy & security. After that, only workspace owners and admins can invite.

> **Why are external collaborators on my member list?**
>
> External collaborators have a workspace membership record so Lovable can track their access, bill credits to your workspace, and let you manage or remove them. They only have access to the specific projects you invite them to, never the full workspace.

> **What happens if a pending invitation expires?**
>
> Email invitations expire after 30 days. When an invite expires, the link stops working, and the person will need a new invite to join.
>
> To send a new invite, go to **Workspace settings → People** and invite them again. This resets the 30-day window.

> **What happens if I remove a member?**
>
> Removed members lose workspace and project access immediately. Any work they created stays in the workspace, they just can't open or edit it.
>
> If they own projects, Lovable asks who should receive them as part of the removal. Keep the default and they go to the member with the highest role (owners first, then admins, then editors), or select a specific owner, admin, or editor. Projects with access set to **Restricted** are not transferred. A workspace owner has to transfer them manually. See [Choose who inherits their projects](#choose-who-inherits-their-projects).

> **How do I hand over someone's projects before removing them?**
>
> You have two ways to do it. To hand over several projects at once, go to the dashboard, [select the projects](https://docs.lovable.dev/introduction/dashboard-overview.md#select-several-projects-at-once) you want to reassign, choose **Change owner** in the toolbar at the bottom, and pick the person taking over. The new owner has to be an active member of the same workspace, and every project in a selection has to be in that one workspace. See [Change the owner of several projects](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects).
>
> For one or two projects, open each one and use [Transfer ownership](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership) in project settings instead.
>
> You can also [choose who inherits their projects](#choose-who-inherits-their-projects) during the removal itself. Transfer them in advance when different projects should go to different people, or when you remove several members at once, because bulk removal transfers projects automatically.


## Related topics

- [Manage people across the workspaces in your organization](https://docs.lovable.dev/features/organization-people.md)
- [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md)
- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md)
