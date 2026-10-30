# Delete account
<!-- source: https://docs.lovable.dev/introduction/delete-account.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete account

> Permanently delete your Lovable account, with a 30-day grace period to change your mind.

Deleting your Lovable account removes your login, your profile, and any data tied to you as an individual. It's a one-way action, but Lovable gives you a **30-day grace period** during which you can log back in and **cancel the deletion** before it finalizes.

This page covers what gets deleted, how the flow works, and how to undo a scheduled deletion.

> [!NOTE]
>
> Deleting your account is different from leaving a workspace or canceling a subscription.
>
> * **Cancel a paid subscription or move to the Free plan:** go to **Workspace settings → Plans & credit usage**, select **Manage** on your plan card, and choose **Downgrade to free**. See [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription).
> * **Step away from a team:** see [Leave a workspace](https://docs.lovable.dev/features/workspace#leave-a-workspace).

## Before you delete

Account deletion is irreversible after 30 days. If you still want to proceed, keep these things in mind:

* **Workspaces you own.** Give any workspace where you're the only owner a second owner first. Promote a member to owner, from the deletion dialog or by [changing their role](https://docs.lovable.dev/features/people.md#change-a-members-role) in **Workspace settings → People**, or [transfer primary ownership](https://docs.lovable.dev/features/people.md#transfer-primary-ownership) to any Lovable account, which adds that person to the workspace as an owner. If you don't, the workspace and everyone's projects in it will be deleted along with your account.
* **Active subscriptions.** Any active workspace subscriptions tied to workspaces you own are canceled when those workspaces are deleted.
* **Projects you want to keep.** [Move them to another workspace](https://docs.lovable.dev/features/projects/settings.md#move-a-project-to-another-workspace) before deleting, or hand them to someone else: [change the owner of several projects at once](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) from the dashboard, or [transfer project ownership](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership) one project at a time.
* **Username.** Your `@username` becomes available for someone else to claim once the 30-day window expires.

## What gets deleted

When deletion finalizes (after 30 days), Lovable permanently removes:

* Your **active subscriptions**
* Any **workspaces you own**, unless you transferred ownership before deletion
* Your **workspace memberships** and **pending invitations**
* Your **account** and all associated data: profile, username, linked accounts, MFA enrollments, preferences, and skills

## How deletion works

Account deletion uses a **30-day grace period**. When you confirm:

* Your account is **scheduled for deletion** 30 days from the day you confirm.
* You're logged out of all sessions and you cannot keep using Lovable.
* For the next 30 days, your account remains **recoverable**. You can log back in and cancel.
* Active workspace subscriptions continue billing. Cancel any subscriptions you don't want to be charged for.
* **After 30 days**, your account, profile, and any data not transferred to another workspace are **permanently removed**.

> [!NOTE]
>
> As of September 9, 2026, deletion also stops your content from being included in any AI training data assembled after your request takes effect. It does not retract content from training datasets assembled, or models trained, before then. See [Manage training data and privacy](https://docs.lovable.dev/features/business/data-opt-out.md).

## Deletion flow

Open [**Account settings → Account → Danger zone**](https://lovable.dev/settings/account) and click **Delete account**.

The dialog walks you through these steps:

1. **Transfer or delete workspaces.** Lovable lists every workspace where you're the **only owner**. For a workspace that still has other members, select a member and click **Promote to Owner**, or delete the workspace (type its handle or name to confirm). A workspace where you're the only member is deleted with your account, unless you first [transfer primary ownership](https://docs.lovable.dev/features/people.md#transfer-primary-ownership) to another Lovable account.
2. **Email confirmation.** Type your account email to confirm.
3. **Reason.** Pick a reason for leaving (required) and optionally add details. This helps us improve the product.
4. **Confirm deletion**. Click **Delete account** to confirm deletion.

You'll see a **Deletion scheduled** confirmation, then be logged out automatically.

## Cancel deletion within 30 days

To cancel a scheduled deletion before the 30-day window expires:

1. Log back in to [**lovable.dev**](http://lovable.dev) with the same account. Lovable shows you a full-screen **Account scheduled for deletion** page, including your scheduled deletion date.
2. Click **Keep my account** to cancel the deletion. Your account is restored immediately.

A **Deletion canceled** toast message confirms the action. Your login, profile, workspaces, and preferences all return to exactly how they were before you scheduled deletion.

> [!NOTE]
>
> If you log in but aren't ready to decide yet, click **Log out** on the same page. Your account stays scheduled for deletion, and you can come back later within the 30-day window.


## Related topics

- [Delete a workspace](https://docs.lovable.dev/introduction/delete-workspace.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Change or cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md)
