# Lovable workspace
<!-- source: https://docs.lovable.dev/features/workspace.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable workspace

> Manage your team's projects, members, billing, and settings in one central place.

A **workspace** is the central place where you and your team build apps together in Lovable. Every project lives inside a workspace, and every member collaborating with you accesses projects through a workspace.

Think of it as your team's home base. It holds your projects, your people, your billing, and your settings in one place.

A workspace is also how you buy Lovable for a group of people: one subscription funds a shared pool of credits, and everyone you invite builds from that pool while working on their own projects.

When you sign up for Lovable, your first personal workspace is created automatically on the **free plan**, which includes 5 daily build credits and a [daily chat allowance](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs). From there you can:

* Invite others to join
* Create projects
* Upgrade your plan as your needs grow

You can also create additional workspaces from the **workspace switcher** in the top-left corner of the dashboard.

## Workspace basics

These are the key rules that define how workspaces function in Lovable.

* **Projects belong to a workspace**\
  All projects exist inside a workspace.
* **A workspace is shared by a group of people**\
  Invite as many people as you need into a single workspace to collaborate. Plans are priced by credits, not seats, so adding members doesn't increase your subscription cost. Everyone in the workspace works from the same plan, credits, and settings.
* **One workspace holds many projects**\
  Each member can create and work on as many of their own projects as they want inside the shared workspace. Projects stay separate, but they all live under the same workspace.
* **Pricing plans are workspace-level**\
  Each workspace has its **own plan and billing**, on a single invoice. A paid subscription applies to **one workspace only**. To buy credits for a group of people, upgrade one workspace to a plan with enough credits and invite everyone into it. See [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) for more information.
* **Credits are shared across the workspace**\
  All projects in a workspace draw from the workspace's shared credits. This applies regardless of which member or external collaborator sends messages.
* **You can cap how many credits each member uses**\
  Workspace owners and admins can set a [default member credit limit](https://docs.lovable.dev/features/usage-limits-and-alerts.md) in workspace settings that applies to every member, plus [per-member overrides](https://docs.lovable.dev/features/people.md#set-a-per-member-credit-limit), so no single person can use up the shared credits.
* **You can belong to multiple workspaces**\
  A single Lovable account can be a member of multiple workspaces. You can switch between them at any time.

## Create a workspace

Any logged-in user can create a workspace.

1. Open the **workspace switcher** (top-left of the dashboard)
2. Click **Create workspace**
3. Enter a name (up to 50 characters)
4. Click **Create** and set up your pricing plan

## Workspace setup

Workspace **owners and admins** can configure settings, billing, and security options for their workspace under **Workspace settings → Workspace**.

See [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md) for more information.

## Invite people to your workspace

Workspace members are the people you collaborate with on projects in a workspace.

The **People** tab is the central place to manage the people in your workspace. Every workspace member appears here, whether they joined by invitation, through SSO, via SCIM, or as an external collaborator on a specific project. Open it from **Workspace settings → People**.

Workspace **owners and admins** can invite members, change roles, remove members, approve workspace and project access requests, and export the workspace member list as CSV. You can also track per-member credit usage and set individual credit limits that override workspace defaults.

See [People](https://docs.lovable.dev/features/people.md) for more information.

## Join a workspace

Once you have a Lovable account, there are several ways to join a workspace.

### Email invitation or invite link

A workspace owner, admin, or editor sends you an invitation by email or sends you an invite link.

If **auto-accept invitations** is enabled in your personal account settings, you are added to the workspace without needing to manually accept the invites.

### Find your team's workspace

If you signed up with a **work email address**, Lovable can show you workspaces that belong to your company, so you can join the correct one without a direct invitation. This is **Workspace discovery**, a **Business and Enterprise** feature.

> [!NOTE]
>
> The feature is available to accounts using **non-public email domains** (such as `@yourcompany.com`). Public domains like `@gmail.com` or `@hotmail.com` are not supported.

**How to find a workspace:**

1. Open the **workspace switcher** (top-left of the dashboard)
2. Click **Find workspaces** at the bottom of the dropdown and Lovable will search for workspaces associated with your email domain
3. Select the workspace you want to join
4. Choose the role you want to request
5. Submit your request

Workspace admins and owners will be notified and can **approve or deny your access**.

> [!TIP]
>
> If you do not belong to any workspace yet, this option also appears in the **No workspace** dialog shown after sign-up.

## Switch workspaces

Open the **workspace switcher** in the top-left corner of the dashboard and click a workspace name to switch to it.

If some of your workspaces belong to an Enterprise [organization](https://docs.lovable.dev/features/organizations), the **workspace switcher** groups them under the organization's name and lists your other workspaces under **Other workspaces**. Admins of the organization also find **Organization settings** in the switcher. See [What changes for members of a workspace](https://docs.lovable.dev/features/organizations#what-changes-for-members-of-a-workspace).

## Leave a workspace

Any workspace member can leave a workspace they no longer want access to. You can leave from either of these locations:

* **Workspace settings → Workspace → Leave workspace**
* **Workspace settings → People**, then click the **three dots menu next to your row** and click **Leave workspace**.
  > [!NOTE]
  >
  > This path is not available to external collaborators as they do not see the People tab. External collaborators can only leave from **Workspace settings → Workspace → Leave workspace.**

### When you can't leave

* **You're the only owner.** Workspaces must always have at least one owner. Promote another member to owner first, then try again. Owners can promote from **Workspace settings → People** by changing another member's role to owner. See [People](https://docs.lovable.dev/features/people.md) for more information.
* **It's your only workspace.** Every Lovable account must belong to at least one workspace. Join or create another workspace before leaving.

### What happens when you leave

* Your workspace membership is removed immediately. You lose access to all projects in the workspace, including projects shared with you directly. Your work is not deleted.
* Projects you owned are auto-transferred to the most senior remaining member of the workspace (owners first, then admins, then editors). Projects with access set to **Restricted** are not transferred automatically. You cannot pick which member inherits your projects. If you want a specific person to take over, hand the projects over before you leave: [change the owner of several projects at once](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) from the dashboard, or transfer them one at a time from each [project's settings](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership).
* Your real-time presence is removed from any projects you had open.
* The leave event is recorded in [Audit logs](https://docs.lovable.dev/features/audit-logs.md) on Enterprise plans.
* Lovable switches you to another workspace you belong to and returns you to the dashboard.

To rejoin, ask a workspace admin or owner to invite you again, or use the **Find workspaces** flow if **Workspace discovery** is enabled and your email matches a [verified domain](https://docs.lovable.dev/features/verified-domains.md).

## Delete a workspace

Workspace **owners** can delete a workspace they no longer need from **Workspace settings → Workspace → Delete workspace**. Members lose access immediately, and the workspace is permanently deleted after 60 days. During that time, a workspace owner on a Free, Pro, or Business plan can [restore it](https://docs.lovable.dev/introduction/delete-workspace.md#restore-a-deleted-workspace) from account settings.

Deleting a workspace is different from [leaving a workspace](#leave-a-workspace) (step away from a team but keep the workspace), canceling a subscription (see [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription)), or [deleting your Lovable account](https://docs.lovable.dev/introduction/delete-account.md).

See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md) for the full flow, including what happens to projects and billing.

## FAQ

> **How many members can one workspace have?**
>
> Free and Pro workspaces hold up to **200 members** with an owner, admin, or editor role. Viewers and external collaborators don't count toward that. Business and Enterprise workspaces have no member limit by default. For Enterprise workspaces, custom member limits can optionally be set.
>
> Free workspaces can send **5** email invitations per day. Pro, Business, and Enterprise workspaces have no daily limit. Joining through an invite link does not count toward the limit. Invites can also be blocked with an "Invite was blocked due to suspicious activity" message by automated fraud checks. If you believe the block is a mistake, contact [Lovable Support](https://lovable.dev/support).

> **How do I buy Lovable credits for a group of people?**
>
> Upgrade a single workspace to a paid plan sized for your group, then invite everyone into that workspace. All members build from the workspace's shared credits, on one subscription and one invoice. Each member can work on as many of their own projects as they want.
>
> To keep any one person from using up the shared credits, set a [default member credit limit](https://docs.lovable.dev/features/usage-limits-and-alerts.md) in workspace settings and [per-member overrides](https://docs.lovable.dev/features/people.md#set-a-per-member-credit-limit) from the People tab.
>
> This works the same for companies, classrooms, and communities. For large organizations, the [Enterprise plan](https://lovable.dev/pricing) offers volume-based credits.

> **Do I pay per member or per seat?**
>
> Neither. Plans are priced by the credits they include, not by seats. Inviting more members doesn't change your subscription cost; what changes is how quickly the group uses the workspace's shared credits.

> **Can I have several workspaces?**
>
> Yes. However, each workspace requires its **own subscription**.

> **Can I switch between workspaces?**
>
> Yes. Go to the main dashboard and click your workspace name in the top-left corner. In the dropdown you will see the other workspaces you have access to. Select one to switch.

> **Can I change the workspace owner?**
>
> Yes. Owners can promote other members to **owner**. A workspace can have **multiple owners**.
>
> One of them is the [primary owner](https://docs.lovable.dev/features/people.md#the-primary-owner), used for billing and domain claims. The primary owner can transfer that role to another member, or to a Lovable account outside the workspace, with [Transfer primary ownership](https://docs.lovable.dev/features/people.md#transfer-primary-ownership) in **Workspace settings → Workspace**.

> **Is it possible to transfer projects between workspaces?**
>
> Yes. You can move a project to another workspace from three places:
>
> * **Project settings → Move workspace**: click **Move**.
> * The project card menu on the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md): select **Move → To workspace**.
> * Select multiple projects on the dashboard and click **Transfer** in the actions bar.
>
> Who can move a project:
>
> * **Workspace owners** can move any project in the workspace. **Workspace admins** can move any project they can access.
> * The **project owner** can move their own project. On Enterprise plans, this requires the [Editor project transfers](https://docs.lovable.dev/features/privacy-and-security-settings.md#editor-project-transfers) setting to be enabled.
>
> To move a project into a workspace, you need to be a member of that workspace with permission to create projects there. Moves can also be blocked with a "This transfer was blocked due to suspicious activity" message by automated fraud checks. If you believe the block is a mistake, contact [Lovable Support](https://lovable.dev/support).
>
> See [Move a project to another workspace](https://docs.lovable.dev/features/projects/settings.md#move-a-project-to-another-workspace) for what changes when you move one.

> **How do I leave a workspace?**
>
> You can leave from either of these locations:
>
> * **Workspace settings → Workspace → Leave workspace**
> * **Workspace settings → People**, then click the **three dots menu next to your row** and click **Leave workspace**.
>   > [!NOTE]
>   >
>   > This path is not available to external collaborators as they do not see the People tab. External collaborators can only leave from **Workspace settings → Workspace → Leave workspace.**
>
> You cannot leave if you are the only owner of the workspace, or if it's your only workspace. See [Leave a workspace](https://docs.lovable.dev/features/workspace#leave-a-workspace) for the full flow, including what happens to projects you owned.

> **Can I delete a workspace?**
>
> Yes. Workspace owners can delete a workspace from **Workspace settings → Workspace → Delete workspace**. Members lose access immediately, and the workspace is permanently deleted after 60 days. During that time, a workspace owner on a Free, Pro, or Business plan can restore it from [Account settings → Account → Recently deleted workspaces](https://lovable.dev/settings/account). Enterprise workspaces are restored by your Lovable account team.
>
> See [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md) for the full flow.


## Related topics

- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Chat with Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md)
- [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)
- [Chat with Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md)
