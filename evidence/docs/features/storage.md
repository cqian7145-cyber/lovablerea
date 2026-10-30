# Storage
<!-- source: https://docs.lovable.dev/features/storage.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Storage

> Store and manage your app's files in the built-in backend: create buckets, upload and organize files, and control public access.

Your app's built-in storage holds the files it works with: profile photos, documents, videos, and other uploads. Describe what files should go where, and Lovable creates the buckets, wires up the upload flows, and controls access. For example, tell Lovable:

```text wrap theme={null}
Let users upload a profile photo and show it on their account page. Let them attach PDF documents to each support request and show a download link next to it. Keep uploads private, so each person only sees their own files.
```

The **Storage** view lets you browse and manage those files directly. To open it, go to **More → Storage**.

## Buckets

Files are organized into buckets. Each bucket card shows its name, when it was last updated, and whether it is **Private** or **Public**:

* **Private** (the default): files are only accessible by users with the correct permissions, controlled by [row level security policies](https://docs.lovable.dev/features/database-access.md#row-level-security-rls-policies).
* **Public**: files are accessible by anyone with the URL.

> [!NOTE]
>
> **Public storage buckets are blocked by default on all plans.**
>
> This prevents users from creating publicly accessible storage buckets. Workspace owners and admins on all plans can disable this in [Privacy & security](https://lovable.dev/settings/privacy-security). See [Block public storage buckets](https://docs.lovable.dev/features/privacy-and-security-settings.md#block-public-storage-buckets) for details.

To create a bucket yourself, click **New bucket**. Bucket names use lowercase letters, numbers, and hyphens only, must be 3 to 63 characters, and cannot be changed after creation.

To delete a bucket, use the delete icon on its card. A bucket must be empty before it can be deleted, and deleting cannot be undone.

## Browse and manage files

Open a bucket to browse its contents as folders and files, with each item's size, type, and last-modified date.

* **Upload**: add one or more files, or drag and drop them into the bucket.
* **Create folder**: folder names allow letters, numbers, dots, hyphens, and underscores.
* **Rename** or **Delete** a file or folder from its row menu. Folders can only be deleted when they are empty, and deleting cannot be undone.
* **Download**: select one or more items and download them. Multiple files download as a zip archive. Files in private buckets are downloaded through temporary signed links.

Click a file to open its details, with a preview for images, video, and audio, its size and timestamps, and a **Copy URL** button. For public buckets this copies a permanent public URL. For private buckets it copies a temporary signed URL that expires after one hour.

## Limits

Your app's storage accepts files up to **2 GB** by default. You can raise or lower this limit, up to **5 GB**, from **More → Storage**. At the top of the view, enter a new value under **Upload size limit**, choose **MB** or **GB**, and select **Save**. The new limit applies immediately. You can also ask Lovable in the project chat to change it, and Lovable asks for your approval before making the change. Anyone with edit access to the project can change the limit. Project viewers do not see the setting.

## Storage settings

In **Storage settings** you change the upload size limit and pause or remove storage for the project. To open it, go to **More → Storage**, then select **Settings**. You need permission to manage the project's settings to pause or remove storage.

> [!WARNING]
>
> Storage runs on the same backend as your database and user accounts. **Remove storage** permanently deletes the database, your app's user accounts, and the files in storage, and **Pause storage** pauses all three. See [Pause, resume, or remove your project's database](https://docs.lovable.dev/features/database-pause-remove.md).

## FAQ

> **Why can't I make a bucket public?**
>
> Public buckets are blocked by default on all plans by the workspace setting **Block public storage buckets**. A workspace owner or admin can turn the block off in [Privacy & security](https://lovable.dev/settings/privacy-security). For most apps, keeping buckets private and letting your app serve files through signed URLs is the safer choice.

> **How do I share a file from a private bucket?**
>
> Use **Copy URL** in the file's details to get a temporary signed URL, which expires after one hour. For permanent sharing, ask Lovable to build the sharing flow into your app, or store the file in a public bucket.

> **Does storage stop billing when my project is paused?**
>
> No. Storage usage continues while a project is paused because your files stay in place. To stop storage usage entirely, download your files and [remove the database](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need) from the project.

> **Are storage files included in database exports?**
>
> No. Database exports cover schema and table data only. Download storage files separately from the Storage view before migrating or removing the built-in backend.


## Related topics

- [Export Lovable logs to Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
- [Connect to Supabase](https://docs.lovable.dev/integrations/supabase.md)
- [Fix a slow database and choose the right capacity](https://docs.lovable.dev/features/database-performance.md)
