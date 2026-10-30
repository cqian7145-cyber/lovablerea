# Groups
<!-- source: https://docs.lovable.dev/features/groups.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Groups

> Organize workspace members into groups for granular control over project access and published app visibility.

Groups let you organize workspace members into named collections, making it easier to manage access across your workspace. Instead of managing permissions for individual users, you can grant access to an entire group at once.

With groups, you can:

* **Share projects with groups** so that an entire team gets access at once, instead of adding collaborators one by one
* **Share folders with groups** so that all projects inside a personal folder are accessible to an entire team at once
* **Control who can access published apps** by restricting a published website or internal tool to specific groups instead of the entire workspace
* **Sync groups from your identity provider** so that groups created through [SCIM provisioning](https://docs.lovable.dev/features/business/scim.md) appear alongside manually created groups
* **Cap how many build credits each member of a group can use** by setting a group credit limit in [Usage limits & alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md). Each member gets a separate allowance. Group limits count build credits only, not hosting or AI usage in deployed apps. A group limit replaces the default user limit for everyone in the group, and an individual member limit replaces the group limit. See [Which limit applies to a member](https://docs.lovable.dev/features/usage-limits-and-alerts.md#which-limit-applies-to-a-member).

Groups are available on **Business and Enterprise** plans.

> [!NOTE]
>
> This page is about workspace groups, which grant access inside a workspace. Looking for the groups that decide which workspace of an Enterprise [organization](https://docs.lovable.dev/features/organizations) a person joins? See [provisioning groups](https://docs.lovable.dev/features/organization-identity.md#route-people-to-workspaces-with-provisioning-groups). The two are different features.

## Create and manage groups

Workspace admins and owners can create and manage groups from the workspace settings.

### Create a group

1. Go to [**Workspace settings → Groups**](https://lovable.dev/settings/groups)
2. Click **Create group**
3. Enter a group name
4. Search for and add members to the group
5. Click **Create group**

### Manage group members

To add or remove members from an existing group:

1. Go to **Workspace settings → Groups**
2. Click a group to open its detail page
3. To add a member, click **Add member** and search for the person you want to add
4. To remove a member, click the menu on a member row and select **Remove**

On the detail page, you can filter the member list by name or email and by group role.

Each group member has a role within the group: **Admin** or **Member**. Group admins can add and remove members from the group. You can change a member's group role from the member menu.

A workspace member can belong to multiple groups. Changes to group membership take effect immediately.

### Delete a group

1. Go to **Workspace settings → Groups**
2. Click a group to open its detail page
3. Click **Delete group**

Deleting a group removes the group and its associated access. It does not remove members from the workspace.

### Set a default design system for a group

Each group can have its own default [design system](https://docs.lovable.dev/features/design-systems.md). Members of the group get it pre-selected when they create a project, in place of the workspace default, so each team builds on its own components and styles.

1. Go to **Workspace settings → Groups**
2. Click a group to open its detail page
3. Under **Default design system**, choose a design system

Lovable saves the change as soon as you choose. To go back to the workspace default, choose **Workspace default**. Only released design systems appear in the list. If the chosen design system is no longer available, the row shows **Unpublished design system** and members get the workspace default until you choose another one.

A member who belongs to several groups with different defaults gets the workspace default. If all their groups use the same design system, that one applies. Members can change or remove the pre-selected design system in the prompt box before they create the project.

> [!NOTE]
>
> Only workspace admins and owners can set a group's default design system. This also applies to groups synced through [SCIM](https://docs.lovable.dev/features/business/scim.md), whose membership stays managed by your identity provider.

### **Export group membership**

You can download a CSV of group membership. Use this for record-keeping, auditing, or migrating membership data outside Lovable.

1. Go to **Workspace settings → Groups**
2. Click **Export**

The CSV includes one row per group membership, with the following columns:

* Workspace name and ID
* Group name and ID
* User name and ID
* Email
* Date added
* Who added them

## SCIM groups

If your workspace uses [SCIM provisioning](https://docs.lovable.dev/features/business/scim.md), groups pushed from your identity provider automatically appear in **Workspace settings → Groups** alongside manually created groups. SCIM-managed groups are marked with a **SCIM** badge and cannot be edited directly in Lovable. Membership for SCIM groups is managed from your identity provider.

Both types of groups work the same way when granting access.

For details on configuring group push and role mappings, see [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md).

## Share projects with groups

Instead of inviting individual collaborators to a project, you can share it with an entire group. This is useful when onboarding a new team to a project or when multiple people across a department need access.

### Add a group to a project

1. Open the project you want to share
2. Click **Share**
3. Search for a group name
4. Select the group and assign a role
5. Click **Invite**

All members of the group are granted access to the project with the assigned role. Each group member receives a notification, and the project appears in their **Shared with me** section.

### Remove a group from a project

1. Open the project and click **Share**
2. Find the group in the list of collaborators
3. Click the menu on the group row and select **Remove**

Removing a group revokes access for all members of that group, unless they also have individual access to the project.

### How group and individual access interact

* If a member has both individual access and group access to a project, the **higher permission level** applies.
* Removing a group from a project does not affect members who were also added individually.

## Share folders with groups

On Business and Enterprise plans, you can add groups as collaborators on a [personal folder](https://docs.lovable.dev/introduction/project-folders.md#personal-folders). All projects inside the folder become accessible to members of that group with the role you assign. This is useful when a team needs access to a collection of related projects without having to be added to each one individually.

### Add a group to a folder

1. Go to your dashboard and find the folder
2. Open the folder card's **More options** menu and select **Manage access**
3. Search for a group name
4. Select the group and assign a role
5. Click **Invite**

### Remove a group from a folder

1. Open the folder card's **More options** menu and select **Manage access**
2. Find the group in the collaborator list
3. Click the menu on the group row and select **Remove**

Removing a group from a folder revokes access to all projects in the folder for members of that group, unless they have individual access to a specific project.

## Publish to specific groups

On Business and Enterprise plans, you can restrict who can access your published app to specific groups or individual users, rather than making it available to the entire workspace. On Free and Pro plans, you can restrict it to individual people with **Invite only**, but not to groups.

This is useful when you want to:

* Share internal tools with only the teams that need them
* Restrict access to sensitive dashboards, for example financial reports for leadership only
* Control app visibility across different departments

> [!NOTE]
>
> Project collaborators always retain access to the published app, regardless of the website audience.

To publish to specific groups or members:

**1. Open the publish dialog**

Open your project and click **Publish**.

**2. Choose the Custom audience**

Select the visibility row to open **Who can view your site?**, then select **Custom**.

**3. Open the audience picker**

Select **View and edit** on the Custom card.

**4. Add groups or members**

Search for and select the groups or individual members who should have access.

**5. Apply your changes**

Select **Done** to close the picker, then **Publish** (or **Publish changes** on a published project).

Audience edits don't take effect while you edit. When you select **Publish** (or **Publish changes** on a published project), Lovable updates who has access.

For more information on website access control, including inviting people outside your workspace by email, see [Publish your project](https://docs.lovable.dev/features/publish.md#invite-people-outside-your-workspace).

## FAQ

> **Which plans include groups?**
>
> Groups are available on **Business and Enterprise** plans.

> **Is there a limit to how many groups I can create?**
>
> There is no limit to the number of groups you can create in a workspace.

> **Can each group have its own default design system?**
>
> Yes. Workspace admins and owners can set a **Default design system** on a group's detail page in **Workspace settings → Groups**. Members of that group get it pre-selected when they create a project, instead of the workspace default. A member in several groups with different defaults gets the workspace default. See [Set a default design system for a group](#set-a-default-design-system-for-a-group).

> **Can a member belong to multiple groups?**
>
> Yes. A workspace member can be part of multiple groups. When publishing to groups, a member only needs to be in one of the selected groups to have access.

> **What is the difference between SCIM groups and manually created groups?**
>
> SCIM groups are synced from your identity provider and cannot be edited in Lovable. Manually created groups are managed directly in Lovable. Both types appear in **Workspace settings → Groups** and work the same way when granting access. SCIM-managed groups display a **SCIM** badge.

> **What happens when I share a project with a group?**
>
> All members of the group receive access with the role you assign. Each member gets a notification, and the project appears in their **Shared with me** section.

> **What happens if a user has both individual and group access to a project?**
>
> The **higher permission level** applies. For example, if a user has viewer access individually but their group has editor access, they get editor access. Removing the group does not affect their individual access.

> **Are group changes tracked in audit logs?**
>
> Yes. On Enterprise plans, group creation, updates, deletions, and membership changes are recorded in [audit logs](https://docs.lovable.dev/features/audit-logs.md).

> **Can I share a folder with a group?**
>
> Yes. On Business and Enterprise plans, you can add groups as collaborators on [personal folders](https://docs.lovable.dev/introduction/project-folders.md#personal-folders). All projects inside the folder become accessible to members of that group with the role you assign. If you change the folder's visibility to Workspace, the group's access level stops applying to those projects.

> **Can I export group membership?**
>
> Yes. Workspace admins and owners can download a CSV of group membership from **Workspace settings → Groups**. The export includes workspace name and ID, group name and ID, user name and ID, email, date added, and who added them.


## Related topics

- [List workspace groups](https://docs.lovable.dev/api-reference/members-access/list-workspace-groups.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
