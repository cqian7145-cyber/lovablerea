# Delete a project
<!-- source: https://docs.lovable.dev/features/projects/delete-project.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete a project

> Delete a project you no longer need, learn what happens to its app and data, and restore it within 60 days if you change your mind.

When you delete a project, Lovable removes it from your workspace and takes its published app offline. Lovable keeps the project for 60 days, so you can restore it from workspace settings if you deleted it by mistake or need it again. After 60 days, Lovable deletes the project permanently. You can delete and restore projects on all plans.

> [!NOTE]
>
> This page is about deleting a project, which removes the whole project from your workspace. Looking for a way to take the app offline while you keep building? See [Unpublish your project](https://docs.lovable.dev/features/publish.md#how-to-unpublish-your-project). The two are different actions.

## Before you delete

Deletion is reversible for 60 days and permanent after that, so check whether one of these fits better:

* **To take the app offline for a while**, [unpublish it](https://docs.lovable.dev/features/publish.md#how-to-unpublish-your-project) instead of deleting the project.
* **To hand the project to someone else**, [transfer ownership](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership) to a workspace member or [move the project to another workspace](https://docs.lovable.dev/features/projects/settings.md#move-a-project-to-another-workspace).
* **To keep a copy beyond 60 days**, [remix the project](https://docs.lovable.dev/features/projects/remix.md) or [download the code](https://docs.lovable.dev/features/code-mode.md) before you delete it. A connected [GitHub repository](https://docs.lovable.dev/integrations/github.md) stays in your GitHub account and is never deleted with the project.

## How to delete a project

You can delete the projects you own. Workspace owners can delete any project in the workspace. Delete a project from any of these places:

* **Project settings → Danger zone → Delete project**, in the editor. See [Project settings](https://docs.lovable.dev/features/projects/settings.md#danger-zone).
* **Delete** in the project card's **⋯** menu on the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#manage-projects-from-the-dashboard).
* **Delete** in the toolbar that appears after you [select several projects](https://docs.lovable.dev/introduction/dashboard-overview.md#select-several-projects-at-once) on the dashboard.

When you delete one project, type its name as shown to confirm and click **Delete project**. When you delete several projects at once, type the confirmation text the dialog shows and click **Delete**. If Lovable is still working on a request or a revert in the project, wait for it to finish and delete the project afterwards.

After you delete one project, Lovable confirms the deletion. Click **Undo** or **Restore project**, whichever Lovable shows, to put the project back immediately. To restore a project later, or after you delete several projects at once, follow [Restore a deleted project](#restore-a-deleted-project).

## What happens when you delete a project

When you confirm the deletion:

* Lovable removes the project from your dashboard, its folder, and search results.
* The published app and preview links stop working within about a minute.
* If the project uses the [built-in backend](https://docs.lovable.dev/features/cloud), Lovable pauses it. The data in it stays.

For 60 days, Lovable keeps the code, version history, project chat, settings, and instructions. During that time the project is listed under **Recently deleted projects** in workspace settings. The 60 days count from the first deletion. If you restore the project and delete it again, the deadline does not change.

> [!WARNING]
>
> After 60 days, Lovable permanently deletes the project, its version history, and its project chat. Nobody can bring it back after that, including Lovable support.

## Restore a deleted project

You can restore the projects you own. Workspace owners can restore any deleted project in the workspace, so ask one of them to restore a project that someone else owns.

**1. Open Recently deleted projects**

Open [Workspace settings → Workspace](https://lovable.dev/settings/workspace) and find **Recently deleted projects**. The section appears only while you have a deleted project you can restore. Each row shows when the project was deleted and how many days are left before permanent deletion.

**2. Find the project**

Find the project in the list. The section lists up to 5 projects. When you can restore more than 5, the section shows the total and a **View all** link to the full list, where you can search by name and sort the table.

**3. Restore the project**

Click **Restore** next to the project and confirm. The project is back on your dashboard, and the published app and preview links work again within about a minute. If Lovable paused the Cloud backend when you deleted the project, the backend resumes. A backend that you paused yourself, or that is paused because the workspace ran out of credits, stays paused.

Two cases need an extra step:

* **Another project now uses the URL subdomain.** Lovable cannot restore the project until the address is free. See [This project's name was taken while it was deleted](#this-projects-name-was-taken-while-it-was-deleted).
* **The project was deleted together with its workspace.** Lovable does not list it under **Recently deleted projects**, and you cannot restore it on its own. [Restore the workspace](https://docs.lovable.dev/introduction/delete-workspace.md#restore-a-deleted-workspace), and its projects come back with it.

Projects that Lovable deleted automatically as [abandoned](https://docs.lovable.dev/features/privacy-and-security-settings.md#abandoned-projects) appear in the same list, and you restore them the same way.

## Limitations

Two limits apply to deleting and restoring a project:

* Delete and restore requests on the same project count toward one limit of 10 per hour per person. Past it, Lovable refuses the request and tells you how long to wait. See [Too many deletes and restores](#too-many-deletes-and-restores).
* A project that Lovable has placed under review cannot be deleted or restored. See [This project is under review and can't be deleted or restored right now](#this-project-is-under-review-and-cant-be-deleted-or-restored-right-now).

## Troubleshooting

These are the cases that surprise people most often, so you can tell intended behavior from a real problem.

> **This project's name was taken while it was deleted**
>
> Intended behavior. A `lovable.app` address belongs to one project at a time. When you deleted the project, its URL subdomain became available, and another project has since chosen it. A deleted project has no settings you can open, so the restore cannot give it a new address. Free the address first: change the **URL subdomain** of the project that uses it now, in that project's [settings](https://docs.lovable.dev/features/projects/settings.md#details), then click **Restore** again. After the restore, you can give either project any free subdomain. If the project that uses the address is not one you can edit, contact [Lovable support](https://lovable.dev/support). The message refers to the URL subdomain, not the project's display name.

> **This project can no longer be restored**
>
> Intended behavior. The 60 days have ended, or permanent deletion has already started. Nobody can bring the project back, including Lovable support. **Recently deleted projects** shows how many days are left for each project.

> **I deleted a project, but it is not under Recently deleted projects**
>
> Intended behavior, in most cases. You see only the deleted projects you own, so ask a workspace owner, who sees every deleted project in the workspace. The project is also missing when more than 60 days have passed, or when it was deleted together with its workspace. If the workspace was deleted, [restore the workspace](https://docs.lovable.dev/introduction/delete-workspace.md#restore-a-deleted-workspace) instead.

> **Too many deletes and restores**
>
> Intended behavior. Delete and restore requests on the same project count toward one limit of 10 per hour per person. Lovable tells you how many minutes to wait. Wait that long, then try again.

> **This project is under review and can't be deleted or restored right now**
>
> Intended behavior. Lovable has placed the project under review, and deleting and restoring stay closed until the review ends. If you need the project deleted or restored before then, contact [Lovable support](https://lovable.dev/support).


## Related topics

- [Delete project](https://docs.lovable.dev/api-reference/projects/delete-project.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Delete account](https://docs.lovable.dev/introduction/delete-account.md)
