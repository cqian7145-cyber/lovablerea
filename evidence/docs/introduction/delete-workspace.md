# Delete a workspace
<!-- source: https://docs.lovable.dev/introduction/delete-workspace.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete a workspace

> Delete a workspace you no longer need, learn what happens to its projects, members, and billing, and restore it within 60 days if you change your mind.

Workspace owners can delete a workspace they no longer need. Deleting a workspace removes the workspace itself, all projects in it, all member access, and the workspace's billing relationship with Lovable.

When you confirm deletion, members lose access immediately and the workspace is scheduled for permanent deletion. For 60 days, a workspace owner can [restore the workspace](#restore-a-deleted-workspace) from account settings.

You can delete and restore a workspace yourself on Free, Pro, and Business plans. To delete or restore an Enterprise workspace, contact your Lovable account team.

> [!NOTE]
>
> Deleting a workspace is different from:
>
> * **Leaving a workspace.** If you only want to step away from a team, see [Leave a workspace](https://docs.lovable.dev/features/workspace#leave-a-workspace).
> * **Canceling a subscription.** If you want to cancel or downgrade the plan, see [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription).
> * **Deleting your account.** If you want to remove your Lovable account entirely, see [Delete account](https://docs.lovable.dev/introduction/delete-account.md).

## Before you delete

Workspace deletion is irreversible after 60 days. Before you proceed:

* **If the workspace has other owners**, coordinate with them first. Any owner can delete the workspace on their own.
* **Transfer any projects you want to keep** to another workspace. Once deletion finalizes, every project inside the workspace is deleted with it.

## What happens when you delete a workspace

When you confirm deletion:

* Members lose access immediately.
* Projects stop serving traffic on their `*.lovable.app` URLs.
* The workspace disappears from your workspace switcher.
* The workspace's subscription is scheduled to cancel at the end of the current billing period.
* Any eligible open invoices are voided automatically. You will not be billed for the next cycle.

When deletion finalizes after 60 days, Lovable permanently removes:

* The workspace and all of its projects
* All members and pending invitations
* Connected integrations and any keys or tokens stored for them
* Custom domains, branded URLs, and the publishing domain

> [!WARNING]
>
> After the 60 days, nobody can bring the workspace or its projects back, including Lovable support.

## How to delete a workspace

Only workspace owners can delete a workspace.

1. Open **Workspace settings → Workspace**.
2. Scroll to **Delete workspace** and click **Delete workspace**.
3. Review how many members and projects will lose access.
4. Type the workspace name exactly as shown.
5. Click **Delete workspace**.

You are returned to the dashboard. If you belong to other workspaces, Lovable switches you to one of them.

## Restore a deleted workspace

Workspace owners on Free, Pro, and Business plans can restore a deleted workspace at any point in the 60 days. The projects deleted with the workspace come back with it, so you do not restore them one by one. To restore an Enterprise workspace, contact your Lovable account team.

**1. Open Recently deleted workspaces**

Open [Account settings → Account](https://lovable.dev/settings/account) and find **Recently deleted workspaces**. The section appears only while you own a deleted workspace that is still in its 60 days. Each row shows when the workspace was deleted and how many days are left before permanent deletion.

**2. Restore the workspace**

Click **Restore** next to the workspace and confirm. Lovable restores the workspace in the background, and it reappears in your workspace switcher shortly afterwards with its projects and members.

**3. Check the plan**

If the subscription was still active, it continues as before. If it was canceled while the workspace was deleted, for example because the billing period ended during the 60 days, the workspace returns on the Free plan. To get the paid plan back, subscribe again from [Workspace settings → Plans & credit usage](https://lovable.dev/settings/billing). See [Manage your subscription](https://docs.lovable.dev/introduction/manage-subscription.md).

Delete and restore requests on the same workspace count toward one limit of 4 per hour per person. Past it, Lovable refuses the request and tells you how long to wait.

Within the 60 days, [Lovable support](https://lovable.dev/support) can also restore a workspace for you. When you contact support, include the workspace name or ID.


## Related topics

- [Lovable workspace](https://docs.lovable.dev/features/workspace.md)
- [Delete account](https://docs.lovable.dev/introduction/delete-account.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Organizations: run several workspaces as one company](https://docs.lovable.dev/features/organizations.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
