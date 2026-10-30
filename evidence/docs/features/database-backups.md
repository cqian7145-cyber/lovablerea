# Back up, restore, and export your project's database
<!-- source: https://docs.lovable.dev/features/database-backups.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Back up, restore, and export your project's database

> Restore your app's database from a daily backup, export a full copy of it, and learn what backups and exports include before you move your backend elsewhere.

Lovable backs up your project's database every day. You restore from a backup when data was deleted or a change broke your app. You export when you need a copy of the whole database. This page covers both, and what each one includes.

> [!NOTE]
>
> Backups and exports cover the database only, both structure and data. Files in [storage](https://docs.lovable.dev/features/storage.md) are separate. Download them from **More → Storage** when you need a complete copy of your app's data.

## Restore a daily backup

To see your backups, go to **More → Database**, select **Manage**, then **Backups**. Each row shows when the backup was taken, in UTC.

Lovable takes one backup per day and keeps up to roughly 14 days of them. A backup covers the database only, so a restore does not change the files in storage. The closest restore point is the most recent backup taken before the problem.

> [!WARNING]
>
> Restoring cannot be undone. Any data created or changed after the chosen backup is lost. Because the structure, or schema, is reverted too, your app's code may not match the restored database if the schema changed after the backup. To keep the current state, [export your database](#export-your-database) first.

Click **Restore to this backup** on a row and confirm. Lovable rolls the project's database back to that point, structure and data. The database is unavailable for a few minutes while the restore runs.

When the restore finishes, ask Lovable in the project chat to test your app and fix any mismatch between the code and the restored database.

Anyone with edit access to the project can restore a backup. On Enterprise plans, every restore is recorded in your workspace [audit log](https://docs.lovable.dev/features/audit-logs.md).

A restore always replaces the same project's database.

## Export your database

Use the export when you need a copy of the whole database, for example to keep your own backup or before you [move your backend to another provider](#move-your-backend-to-another-provider). Anyone who can manage the project's settings can export.

The export contains your full database, both structure and data. It also includes your users' accounts and their password hashes, the scrambled form in which passwords are stored. It does not include files in storage, [edge function](https://docs.lovable.dev/features/edge-functions.md) code, [secrets](https://docs.lovable.dev/features/secrets.md), sign-in provider settings, or your project's API keys, so plan to move those separately.

The export is a compressed PostgreSQL archive that a developer or your new provider's import tool loads into a new database with `pg_restore`. For a copy you can open yourself, download a single table as CSV from the **Database** view instead. See [Edit records](https://docs.lovable.dev/features/database#edit-records).

**1. Open Database settings**

In your project, go to **More → Database**, select **Manage**, then **Settings**.

**2. Open the export dialog**

In **Export project data**, click **Export data**.

**3. Start the export**

In the **Database** card, click **Export**, then click **Start export**.

**4. Download the export**

Lovable emails you when the export is ready and saves it to your project's storage. Download it from **More → Storage** and keep it somewhere else, because [removing the database](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need) deletes the export along with the rest of your storage.

> [!NOTE]
>
> Lovable exports databases that use up to 15 GB of storage, and the export file itself can be at most 5 GB. You can request one export every 24 hours. For a larger database, [contact support](https://docs.lovable.dev/introduction/support-policy.md#contact-support).

You can export only while your database is running. If the project is [paused](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using), including when it pauses because your workspace ran out of credits or reached a credit limit, resume it first. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

## Move your backend to another provider

Lovable does not transfer a project to another backend in one step. To move, export your database, download your storage files from **More → Storage**, and move your code with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview). You set up authentication, secrets, environment variables, and any external services again at the destination.

Moving a backend is developer work. If you don't write code yourself, ask Lovable in the project chat to walk you through the steps, or plan for a developer to help.

If you restore the export into a Supabase project, your users keep their passwords. Users who are signed in when you switch need to sign in again, so test that sign-in works after restoring. See [Supabase's guide to migrating users between projects](https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects).

For a step-by-step walkthrough, see [Host backend and data on a managed provider](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#host-backend-and-data-on-a-managed-provider-supabase-example). To connect your own Supabase project to a Lovable project instead, see [Supabase](https://docs.lovable.dev/integrations/supabase.md).

Removing the database deletes your export and your files, so download and verify them first. When the move is done, you can [remove the database](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need) so the project stops using credits for it.

## FAQ

> **Do backups include storage files?**
>
> No. Backups and exports cover the database only, both structure and data. Files in [storage](https://docs.lovable.dev/features/storage.md) are separate, so download them from **More → Storage** when you need a complete copy of your app's data.

> **Can I restore my database to any point in time?**
>
> No. Lovable takes one backup per day and keeps up to roughly 14 days of backups. You can restore to any of those daily backups, not to a moment between them. See [Restore a daily backup](#restore-a-daily-backup).

> **Can I export my project to Supabase?**
>
> Yes, in steps rather than in one transfer. [Export your database](#export-your-database), download your storage files from **More → Storage**, and move your code with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview). You set up authentication, secrets, environment variables, and any external services again at the destination. See [Move your backend to another provider](#move-your-backend-to-another-provider).


## Related topics

- [Database](https://docs.lovable.dev/features/database.md)
- [Built-in backend](https://docs.lovable.dev/features/cloud.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
- [Revert and restore your project with version history](https://docs.lovable.dev/features/projects/history.md)
- [Pause, resume, or remove your project's database](https://docs.lovable.dev/features/database-pause-remove.md)
