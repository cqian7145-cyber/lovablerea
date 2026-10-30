# Manage people across the workspaces in your organization
<!-- source: https://docs.lovable.dev/features/organization-people.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage people across the workspaces in your organization

> See every member, role, and workspace assignment in your organization from one People page, add or remove people across workspaces, and manage org admins.

The **People** page in organization settings shows everyone who belongs to any workspace in your [organization](https://docs.lovable.dev/features/organizations), with their role in each workspace, and the org admins.

Org admins use it to see who has access to what, add people to workspaces, change roles, remove people who leave the company, and decide who else manages the organization.

* **Available on:** Enterprise plans, as part of an organization
* **Access:** Org admins
* **Location:** [Organization settings](https://lovable.dev/organization) (**Organization settings → Access → People**)

> [!NOTE]
>
> This page is about the organization's **People** page, which covers every workspace in the organization. Looking for the **People** tab of a single workspace, where you also set credit limits and approve access requests? See [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md). The two are different pages.

## Find who has access

The page has three tabs:

* **All**: everyone in the organization's workspaces, including external collaborators and people with a pending invitation, and the org admins.
* **Invitations**: only the people with a pending invitation.
* **Collaborators**: people who are [external collaborators](https://docs.lovable.dev/features/people.md#external-collaborators) in at least one workspace, with access to single projects and no workspace seat.

Each row shows:

* The person's name
* Their **Organization role**
* The workspaces they belong to, with their role in each
* The workspaces where they are an admin or owner
* When they joined or were invited

To narrow the list:

* Search by name or email. The search starts after you type 3 characters.
* Filter by one or more workspaces to see only the people in them.
* Click a column header to sort by it.

## Add someone to a workspace

Invite people to a workspace from the organization's **People** page, without opening that workspace.

**1. Open the invitation dialog**

On the **All** or **Invitations** tab, click **Invite members**.

**2. Choose the workspace**

Choose one workspace. You cannot choose a workspace managed by [SCIM](https://docs.lovable.dev/features/business/scim.md), because your identity provider adds people to it.

**3. Enter who to invite and their role**

Enter up to 50 email addresses, including your own. Adding yourself is how you enter a workspace you are not a member of. Choose the role everyone in this batch gets in the workspace.

**4. Send the invitation**

Send the invitations. Lovable adds people who already have a Lovable account to the workspace immediately and emails them about it. The exceptions are people whose account settings require them to accept invitations, and workspaces with no seats left. Everyone else receives an invitation email and appears on the **Invitations** tab until they accept.

## Change what someone can do

Open the actions menu on a person's row and select **Manage roles**. The **Manage access** dialog lists their workspaces with the role in each. From there you can:

* Change their role in a workspace. You cannot change the role of a pending invitation until the person accepts. To give someone a different role sooner, revoke the invitation and invite them again with that role.
* Add them to another workspace with **Add to workspace** and choose the role. The same rules apply as when you invite someone, including who is added immediately. Workspaces managed by SCIM are not listed.
* Remove them from a workspace, or revoke a pending invitation, and confirm. You cannot remove yourself from a workspace here.

The roles are the workspace roles: owner, admin, editor, and viewer. The roles mean the same as on that workspace's [People tab](https://docs.lovable.dev/features/people.md). A workspace keeps at least one owner, so you cannot change the last owner's role.

External collaborators have the collaborator role, which you cannot change here. Manage their access from the projects they collaborate on. See [External collaborators](https://docs.lovable.dev/features/people.md#external-collaborators). In a workspace managed by SCIM, change the person's groups in your identity provider instead.

To change several people's role at once, enable selection mode with the selection button at the end of the search row, select their rows on the **All** tab, and change the role. Lovable applies it in all their workspaces, or only in the filtered workspaces when a filter is active. Selection mode is available on desktop.

## Remove someone who leaves the company

Remove a person from every workspace in the organization at once, instead of workspace by workspace.

**1. Find the person**

Search by name or email. To remove them only from some workspaces, filter by those workspaces first.

**2. Select the rows**

Enable selection mode with the selection button at the end of the search row. Select the rows of the people to remove. Selecting all selects only the people on the current page of the list.

**3. Remove them**

Remove the selected people. On the **All** tab, Lovable removes every membership of theirs in the organization, pending invitations and collaborator access included, or only in the filtered workspaces when a filter is active. On the **Invitations** tab, Lovable revokes only their pending invitations. On the **Collaborators** tab, it removes only their collaborator access.

Removed people's projects stay in their workspaces. Lovable hands them over the same way as when a member leaves, and you cannot choose who receives them here. See [What happens when you leave](https://docs.lovable.dev/features/workspace#what-happens-when-you-leave).

Two cases need another step:

* Lovable skips memberships in a workspace managed by SCIM. Remove the person in your identity provider, and SCIM removes them from the workspace.
* An org admin keeps access to organization settings until you change their **Organization role** to **Member**. See [Make someone an org admin](#make-someone-an-org-admin).

## Make someone an org admin

In the **Organization role** column of a person's row, choose **Admin** to make someone an org admin or **Member** to remove that role. See [Who can manage the organization](https://docs.lovable.dev/features/organizations#who-can-manage-the-organization) for what each role can do.

The organization role is separate from workspace roles. Making someone an org admin does not add them to any workspace, and a workspace owner is not an org admin unless you make them one.

For someone with a pending invitation, set the role after they accept. An organization keeps at least one admin, so you cannot change the last admin's role to **Member**. If the last admin is leaving, make someone else an admin first.


## Related topics

- [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md)
- [Organizations: run several workspaces as one company](https://docs.lovable.dev/features/organizations.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
- [Manage connectors in your workspace](https://docs.lovable.dev/integrations/admin-controls.md)
