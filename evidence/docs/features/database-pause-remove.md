# Pause, resume, or remove your project's database
<!-- source: https://docs.lovable.dev/features/database-pause-remove.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Pause, resume, or remove your project's database

> Pause a project's database to save credits, wake it up again from the paused card, and learn what removing the database deletes before you do it.

Pausing stops your project's backend until you wake it up, and your data stays in place. Removing deletes the database and everything in it. Both actions are in **Database settings**: go to **More → Database**, select **Manage**, then **Settings**.

> [!NOTE]
>
> Your project's database, user accounts, and file storage run together. Pausing or removing the database also pauses or removes sign-in, file storage, and edge functions for the project.

## Pause a database you're not using

To save credits on a project you're not actively using, pause its database. Your data is not deleted, and you can resume the project at any time.

Lovable automatically pauses the backend of a project after about 7 days without activity, so you usually don't need to pause an idle project yourself. Pause the database yourself when your project has scheduled jobs or other background activity that keeps it active, because automatic pausing does not apply to those projects.

You need permission to manage the project's settings. To pause your project's database, go to **More → Database**, select **Manage**, then **Settings**. In **Pause database**, click **Pause**, then confirm in the dialog.

While paused, your published app can't read or write data, sign users in, or serve files from storage until you resume it. In the editor, the **Database**, **Users**, and **Storage** views show a paused card in place of your data, and so does Database settings. Wake the project up before you export data or change its settings.

> [!NOTE]
>
> Storage usage continues while a project is paused because your data stays in place. To stop storage usage entirely, [remove the database](#remove-a-database-you-no-longer-need) from the project instead.

> [!WARNING]
>
> If your app uses edge functions for AI features, payments, or sending emails, those features stop working while the database is paused. Older React + Vite apps are the most affected, because new Lovable apps created from May 13, 2026, which use TanStack Start, don't depend on edge functions.

## Resume a paused project

When a project is paused for inactivity, opening it in the editor wakes it up. In every other case, open the project and use the paused card. The card appears in the **Database**, **Users**, and **Storage** views, says why the project is paused, and shows the action that clears the cause. The project chat also shows a notice about the pause.

* **You paused the project yourself.** Click **Wake up**.
* **Your workspace is out of credits.** Click **Top up** and add credits. A top-up does not wake the backend by itself, so open the project again and click **Wake up**. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).
* **A credit limit was reached.** While the limit is still triggered, the card shows **Manage limits** instead. Raise or remove the limit in [Workspace settings → Usage limits & alerts](https://lovable.dev/settings/alerts-limits), then open the project again and click **Wake up**.
* **Lovable unpublished the project for inactivity.** Click **Wake up**, then publish the project again. In a Free workspace, Lovable may unpublish a published app that has had no visits and no workspace-owner login for 12 months or more. Lovable pauses the backend at the same time. See [Does my published site expire?](https://docs.lovable.dev/features/publish.md#does-my-published-site-expire).
* **Lovable paused the project for excessive usage.** This happens when a project's backend usage reaches an extreme level, far beyond what its plan covers. The card has no action, and adding credits does not resume the project. [Contact support](https://docs.lovable.dev/introduction/support-policy.md#contact-support) with the project URL to have the project reviewed.

Waking up takes a few minutes. Traffic to your published app does not resume a paused project.

## Remove a database you no longer need

Use **Remove database** when a project does not need the built-in database, user accounts, file storage, or edge functions anymore. You need permission to manage the project's settings.

> [!WARNING]
>
> Removing the database deletes the database, its backups, your app's user accounts, and the files in storage, and cannot be undone. [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database) and download any files you need before continuing, because exports saved in storage are deleted too.

You can enable the database, user accounts, and file storage again later from the **Database**, **Users**, or **Storage** view.

**1. Open Database settings**

In your project, go to **More → Database**, select **Manage**, then **Settings**.

**2. Open the removal flow**

In **Remove database**, click **Remove**.

**3. Confirm the warnings**

Check both boxes to confirm that the database, users, and storage will stop working, including sign-in and emails, and that their data will be lost. The second box becomes available only after you check the first.

**4. Type the project name**

Enter the project's exact display name to confirm.

**5. Remove the database**

Click **Remove**. The **Database**, **Users**, and **Storage** views offer to enable the services again.

## FAQ

> **Does pausing my project stop all billing?**
>
> No. While a project is paused, its backend stops running, so it stops using credits for everything except storage. Storage usage continues because your data stays in place. To stop storage usage too, [remove the database](#remove-a-database-you-no-longer-need) instead. See [Pause a database you're not using](#pause-a-database-youre-not-using).

> **Why didn't my paused project wake up on its own?**
>
> Only a project paused for inactivity wakes up when you open it in the editor. A project you paused yourself, or one paused because of credits, resumes only when you clear the cause and click **Wake up** on the paused card. Traffic to your published app does not resume a paused project, and neither does waiting.
>
> Clear the cause, such as adding credits, before you click **Wake up**. See [Resume a paused project](#resume-a-paused-project).


## Related topics

- [Storage](https://docs.lovable.dev/features/storage.md)
- [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
- [Edge functions](https://docs.lovable.dev/features/edge-functions.md)
- [Database](https://docs.lovable.dev/features/database.md)
