# Export Lovable logs to Google Cloud Storage
<!-- source: https://docs.lovable.dev/features/data-exports-google-cloud-storage.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export Lovable logs to Google Cloud Storage

> Set up a scheduled data export from Lovable to a Google Cloud Storage bucket. Lovable writes gzipped JSON Lines files with short-lived tokens limited to your bucket and workspace path.

A data export to Google Cloud Storage writes gzipped JSON Lines files to a bucket in your Google Cloud project. You grant Lovable's export service account access to your bucket. Lovable uses short-lived tokens that work only for your bucket and your Lovable workspace's path in it. Lovable stores no keys.

For sources, schedules, and run behavior, see [Data exports](https://docs.lovable.dev/features/data-exports).

## Prerequisites

* A Cloud Storage bucket with uniform bucket-level access enabled. New buckets have it enabled by default.
* Permission to change the bucket's IAM policy, and the `gcloud` CLI.
* The project number of the project that owns the bucket.
* The workspace admin or owner role in Lovable, on an Enterprise plan.

## Set up the export

Create the export in Lovable, then run the two grant commands from the setup panel.

**1. Start a new export**

Go to [Data exports](https://lovable.dev/settings/data-exports), click **New data export**, and choose **Google Cloud Storage** under **Destination**.

**2. Enter the bucket details**

Fill in the form:

* **Bucket**: the bucket name, for example `acme-lovable-exports`.
* **Project number**: the number of the project that owns the bucket, for example `123456789012`. Find it with `gcloud projects describe PROJECT_ID --format='value(projectNumber)'` or on the project dashboard in the console. Enter the number, not the project ID.
* **Prefix (optional)**: a folder for the files. Leave it blank to use `lovable-export/`.

The setup panel fills in the grant commands with these values.

**3. Run both grant commands**

Copy the **Grant commands** from the setup panel and run them:

* The first command grants `roles/storage.objectUser`, which lets Lovable create and delete export files. Its condition blocks writes anywhere outside your Lovable workspace's path in the bucket.
* The second command lets Lovable read the bucket's metadata. Lovable uses it to check that the bucket still belongs to your project before every export.

**4. Choose the source and test**

Choose the **Source** and click **Test connection**. Lovable checks that the bucket belongs to your project, writes and deletes a small test object under your workspace's path in the bucket, and checks that the grant is limited to your workspace's path.

**5. Create the export**

Click **Create export**. Lovable runs the project and grant checks again when you save.

> [!WARNING]
>
> Keep the condition on the first command. If you remove or widen it, saving fails, because the bucket must reject Lovable writes outside your workspace's path. If several Lovable workspaces export to the same bucket, add one conditioned grant per workspace. Do not add a condition to the second command. A condition there breaks the project check.

## Exported files

Each run writes one file per window under your prefix. See [Object storage file layout](https://docs.lovable.dev/features/data-exports#object-storage-file-layout) for the full path. For example:

```text theme={null}
gs://acme-lovable-exports/lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__siem-audit-logs/source=audit_logs/run=2026-10-13T10-00-12Z__7c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f/window=2026-10-13T08-55-07Z--2026-10-13T09-55-12Z/part-00000.jsonl.gz
```

You can change the prefix later. Lovable runs the project and grant checks again when you save, so run the updated grant command first. If you clear the prefix, Lovable writes to the bucket root. You cannot change the bucket or the project number. To use another bucket, create a new export.

### Bucket ownership check

Before every export, Lovable checks that the bucket still belongs to the project number on the export. Bucket names can be reused after a bucket is deleted, so this check stops Lovable from writing to a bucket that someone else now owns. If the bucket no longer exists or belongs to another project, Lovable pauses the export and the run fails. Fix the bucket, then resume the export with the **Schedule** switch.

## Query with BigQuery

You can read the files with a BigQuery external table. Point it at the `source=` folder of your export:

```sql theme={null}
CREATE EXTERNAL TABLE `acme-analytics.lovable.audit_logs`
OPTIONS (
  format = 'NEWLINE_DELIMITED_JSON',
  compression = 'GZIP',
  uris = ['gs://acme-lovable-exports/lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__siem-audit-logs/source=audit_logs/*']
);
```

BigQuery detects the columns from the files. `timestamp` arrives as text such as `2026-10-13 09:41:07.123456` in UTC. Remove duplicates by keeping one row per `id`.

## Troubleshooting

> **Bucket grant is too broad**
>
> The bucket accepts Lovable writes outside your workspace's path. Run the first grant command again with its `--condition` intact. IAM conditions need uniform bucket-level access on the bucket. If several workspaces export to this bucket, add one conditioned grant per workspace. If you just tightened the grant, wait a minute and test again.

> **Bucket is not in the configured project**
>
> The bucket belongs to a different project than the project number on the export. Check the project number with `gcloud projects describe PROJECT_ID --format='value(projectNumber)'`. Check that nobody deleted the bucket and created it again in another project.

> **Cannot verify the bucket's project**
>
> Lovable cannot read the bucket's metadata. Run the second grant command from the setup panel (`roles/storage.bucketViewer` on the bucket), then test again.

> **Bucket not found**
>
> Check the bucket name. The bucket must exist.

> **Write to bucket denied**
>
> The grant does not allow writes under your prefix (`storage.objects.create`). Run the first grant command from the setup panel. If you changed the prefix, run the updated command.

> **Connected, but cleanup is blocked**
>
> Lovable can write but not delete (`storage.objects.delete`). The test object stays in the bucket, and Lovable cannot clean up after a failed run. Add delete permission under the prefix.

For run failures, the message under the run tells you what to check, for example the service account grant and its condition. See [Troubleshooting](https://docs.lovable.dev/features/data-exports#troubleshooting) for general run issues.


## Related topics

- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
- [Export Lovable logs to Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Audit logs](https://docs.lovable.dev/features/audit-logs.md)
