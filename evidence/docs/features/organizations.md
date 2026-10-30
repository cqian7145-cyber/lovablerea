# Organizations: run several workspaces as one company
<!-- source: https://docs.lovable.dev/features/organizations.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Organizations: run several workspaces as one company

> Manage several Enterprise workspaces under one organization: shared identity, one view of people and roles, and apps published to everyone in the company.

> [!NOTE]
>
> Lovable sets up organizations on request. Your account team creates your organization and adds your workspaces to it. See [Set up an organization with your account team](#set-up-an-organization-with-your-account-team).

An **organization** groups several Lovable workspaces under one company. The company sets up [SSO](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization) with its identity provider, such as Okta or Microsoft Entra ID, once for all of them. With [SCIM](https://docs.lovable.dev/features/organization-identity.md#provision-members-with-scim), the identity provider also adds and removes members automatically.

Org admins, the people who manage the organization, see every member and role in one place, and teams can publish internal apps to everyone in the company. Each workspace keeps its own projects, members, groups, and billing.

* **Available on:** Enterprise plans
* **Access:** Org admins
* **Location:** [Organization settings](https://lovable.dev/organization) (**workspace switcher → Organization settings**)

> [!NOTE]
>
> This page is about organizations, where you manage several workspaces together. Looking for a way to separate teams inside one workspace? See [Groups](https://docs.lovable.dev/features/groups.md) and [Project folders](https://docs.lovable.dev/introduction/project-folders.md). These are different features.

## When to use an organization

Use an organization when your company already runs more than one workspace, for example one per team, region, or business unit, and each workspace needs the same identity rules.

Without an organization, every workspace verifies its own domains, connects its own SSO provider, and runs its own SCIM connection. A setting changed in one workspace then differs from the others.

An organization also lets a team in one workspace publish an internal app that colleagues in every other workspace can open, without making the app public.

## Set up an organization with your account team

Organizations are set up on request. Ask your account team, the people you work with on your Enterprise contract, to create one for your company.

You cannot create an organization, create a workspace inside it, or add an existing workspace from organization settings. Your account team does all three with you.

Your account team:

* Creates the organization and adds your workspaces to it.
* Decides with you whether each workspace keeps its own verified domains and SSO provider, or whether they move to the organization. See [Add workspaces to the organization](#add-workspaces-to-the-organization).
* Adds a workspace to another organization when you move it out of this one.
* Deletes a workspace on the Enterprise plan when you ask. See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md).

After your organization exists, an org admin manages its workspaces, people, and identity settings without your account team. See [Open organization settings](#open-organization-settings).

## What the organization owns

The organization owns the company-level identity setup that its workspaces share:

* **Verified domains**, so the company proves it owns its email domains once. See [Verify a domain for the organization](https://docs.lovable.dev/features/organization-identity.md#verify-a-domain-for-the-organization).
* **SSO providers**, and the optional **Enforce SSO for org admins** setting, which requires org admins to log in through SSO. See [Set up SSO for the organization](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization).
* **SCIM provisioning** and **provisioning groups**. Provisioning means adding and removing members automatically, and provisioning groups decide which workspace a person joins and with which role. See [Provision members with SCIM](https://docs.lovable.dev/features/organization-identity.md#provision-members-with-scim).
* **Org admins**, the people who manage the organization. See [Who can manage the organization](#who-can-manage-the-organization).
* **Audit logs** for organization-level actions and for the events of every workspace in the organization. See [Review activity across the organization](#review-activity-across-the-organization).

Each workspace keeps:

* **Projects, folders, groups, and connectors**.
* **Members and their workspace roles**. Someone can belong to several workspaces in the organization, with a different role in each.
* **Plan, credits, invoices, and usage limits**. The organization has no shared credit pool.
* **Workspace-level identity and security settings**, such as **Enforce SSO**, who joins the workspace automatically, and everything on its **Privacy & security** tab. Both org admins and the workspace's admins and owners can change these, unless an org admin sets the workspace to **Managed by the organization**. See [Lock a workspace's settings to the organization](https://docs.lovable.dev/features/organization-identity.md#lock-a-workspaces-settings-to-the-organization).

## What changes for members of a workspace

When your workspace belongs to an organization, you notice it in three places:

* The **workspace switcher**, the menu under your workspace name in the top-left corner of the dashboard, groups the workspaces you belong to under the organization's name. The switcher lists workspaces outside the organization under **Other workspaces**. The grouping changes nothing about your access.
* If your workspace is **Managed by the organization**, the **Identity** and **Privacy & security** tabs in workspace settings show that the organization manages these settings. You cannot change them in the workspace. Ask an org admin for changes.
* The publish dialog shows an option named after your organization. With it, members of every workspace in the organization can open an app after logging in, and no one outside the organization can open it through this option. See [Publish to your organization](https://docs.lovable.dev/features/publish.md#publish-to-your-organization).

Your projects, members, groups, plan, credits, and the way you log in do not change when your workspace joins an organization. What can change is who adds members automatically. See [Add workspaces to the organization](#add-workspaces-to-the-organization).

## Add workspaces to the organization

A workspace that joins keeps its projects, members, roles, plan, and credits. Members keep their access and keep logging in the same way.

Decide with your account team whether the workspace keeps its own verified domains and SSO provider, or whether they move to the organization. Either way, the organization's own verified domains and SSO provider cover every workspace in it. See [Set up SSO for the organization](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization).

When a workspace's identity moves, its verified domains, SSO provider, provisioning groups, and SCIM connection move with it. The SCIM connection keeps working, now at the organization level, and the workspace becomes **Managed by the organization**.

A workspace that keeps its own verified domains and SSO provider stays unmanaged. It may also keep its own SCIM connection and **Verified email sign-up**, which adds people with an email on a verified domain without an invitation. Whether it does depends on how your organization was set up, so ask your account team.

**Managed by the organization** is a setting an org admin changes per workspace at any time, whichever way the workspace joined. The setting decides who can change that workspace's identity and security settings. See [Lock a workspace's settings to the organization](https://docs.lovable.dev/features/organization-identity.md#lock-a-workspaces-settings-to-the-organization).

The organization's own setup adds people from then on, through its SSO provider, through SCIM, or through **Verified email sign-up**. A workspace that kept its own SSO provider also adds people through that provider. An org admin enables **Verified email sign-up** for a workspace in organization settings. See [Set identity per workspace](https://docs.lovable.dev/features/organization-identity.md#set-identity-per-workspace).

Publishing to the organization, the [SSO session shared across workspaces](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization), and SCIM apply to the Enterprise workspaces in the organization. A workspace belongs to at most one organization.

## Who can manage the organization

An organization has two roles.

| Role | What they can do |
| :- | :- |
| **Admin** (org admin) | Open **Organization settings**. Manage the workspaces, people, identity settings, and other org admins of the organization. |
| **Member** | Everyone else in the organization's workspaces. They work in the workspaces they belong to and do not see **Organization settings**. |

Being an org admin does not make you a member of the organization's workspaces, so you do not see the projects in them.

## Open organization settings

Org admins open **Organization settings** from the **workspace switcher**. If you are an org admin of several organizations, select one from the list.

The settings sidebar groups the pages:

* **Organization**: the page named after your organization, where you set its name and avatar, and [Workspaces](#manage-the-workspaces-in-your-organization), where you review the organization's workspaces and remove one.
* **Access**: [People](https://docs.lovable.dev/features/organization-people.md), where you see and manage everyone across the workspaces, and [Identity](https://docs.lovable.dev/features/organization-identity.md), where you set up domains, SSO, and SCIM.
* **Security**: [Audit logs](#review-activity-across-the-organization), where you review activity across the organization.

## Manage the workspaces in your organization

The **Workspaces** page lists every workspace in the organization. Search by workspace name to find one. Each row shows:

* Plan
* Members
* Credit usage
* Workspace admins
* Cloud

From a workspace's row you can:

* Select **View workspace settings** to review and change that workspace's privacy and security settings, including its publishing and sharing policies.
* Select **Remove** to take the workspace out of the organization, then confirm.

Removing a workspace does not delete it. Its members keep their workspace roles. The organization's provisioning groups and verified domains stop adding people to the workspace.

If the workspace was the organization's **Default workspace** for SCIM provisioning, Lovable clears the default, so set a new one. You cannot remove the last workspace in an organization.

Deleting a workspace on the Enterprise plan goes through your account team, whether or not the workspace is in an organization. See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md).

## Review activity across the organization

The **Audit logs** page in organization settings shows organization-level actions, such as a workspace added or removed, a verified domain or SSO provider changed, or a person's organization role changed. It also shows the audit events of every workspace in the organization.

Filter by workspace to review one workspace's events. Export the logs the same way as on the workspace [audit logs](https://docs.lovable.dev/features/audit-logs.md) page.

## Limitations

An organization is an administration layer over your workspaces, not a merged workspace. These limits follow from that:

* The organization has no shared credit pool, and billing stays with each workspace.
* The organization has no shared **Privacy & security** settings. Each workspace has its own.
* You cannot create a workspace inside the organization or add an existing workspace from organization settings. Your account team creates and adds workspaces.
* Organizations have one level. An organization cannot belong to another organization.
* An organization lets you publish an app to people in other workspaces. It does not let people in different workspaces edit the same project. To work on a project together, people need access in the workspace that owns it, as members or as [external collaborators](https://docs.lovable.dev/features/people.md#external-collaborators).

## FAQ

> **Can an org admin see the projects in my workspace?**
>
> Only if they are a member of your workspace. The org admin role manages identity, people, and workspaces, and does not include access to the projects inside them. An org admin can add themselves to a workspace from the organization's [People page](https://docs.lovable.dev/features/organization-people.md#add-someone-to-a-workspace). They cannot do this in a workspace managed by SCIM, where your identity provider adds the members.

> **Does joining an organization change my workspace's billing?**
>
> No. Your workspace keeps its plan, credits, invoices, and usage limits. For contract questions, contact your account team. See [What the organization owns](#what-the-organization-owns).

> **Can a workspace belong to two organizations?**
>
> No. A workspace belongs to at most one organization. To move a workspace to another organization, an org admin removes it from the first one, and your account team adds it to the other. See [Add workspaces to the organization](#add-workspaces-to-the-organization).

> **Can an org admin delete a workspace?**
>
> No. Org admins can remove a workspace from the organization, which keeps the workspace and its members. Deleting an Enterprise workspace goes through your account team. See [Manage the workspaces in your organization](#manage-the-workspaces-in-your-organization).

> **What happens to my workspace's SSO when it joins an organization?**
>
> Members keep logging in the same way. Your account team decides with you whether the workspace keeps its own SSO provider and verified domains or moves them to the organization. If they move, its provisioning groups and SCIM connection move with them. See [Add workspaces to the organization](#add-workspaces-to-the-organization).


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
