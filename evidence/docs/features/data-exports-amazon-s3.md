# Export Lovable logs to Amazon S3
<!-- source: https://docs.lovable.dev/features/data-exports-amazon-s3.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export Lovable logs to Amazon S3

> Set up a scheduled data export from Lovable to an Amazon S3 bucket. Lovable assumes an IAM role through web identity federation and writes gzipped JSON Lines files.

A data export to Amazon S3 writes gzipped JSON Lines files to a bucket in your AWS account. Lovable assumes an IAM role that you create. Lovable stores no AWS keys. It gets short-lived credentials through web identity federation with `accounts.google.com`.

For sources, schedules, and run behavior, see [Data exports](https://docs.lovable.dev/features/data-exports).

## Prerequisites

* An S3 bucket.
* Permission in AWS IAM to create a role and attach a policy to it.
* The workspace admin or owner role in Lovable, on an Enterprise plan.

## Set up the export

Create the export in Lovable and an IAM role in AWS. The setup panel fills in the role policies with your values.

**1. Start a new export**

Go to [Data exports](https://lovable.dev/settings/data-exports), click **New data export**, and choose **Amazon S3** under **Destination**.

**2. Enter the bucket and prefix**

Enter the **Bucket** name, for example `acme-lovable-exports`. Under **Prefix (optional)**, enter a folder for the files, or leave it blank to use `lovable-export/`. The setup panel fills in the policies with these values.

**3. Enter the role ARN**

Choose a name for the IAM role and enter its ARN in **Role ARN**, for example `arn:aws:iam::123456789012:role/LovableExportWriter`. The ARN is `arn:aws:iam::<account ID>:role/<role name>`, so you can enter it before the role exists. The setup panel uses it in the trust policy.

**4. Create the IAM role**

In AWS IAM, create a role with that name for **Web identity** with the identity provider `accounts.google.com`.

**5. Set the trust policy**

Replace the role's trust policy with the **Trust policy JSON** from the setup panel. It lets only Lovable's service account assume the role, and only for this Lovable workspace and this role. If you change **Role ARN** later, update the trust policy again.

**6. Attach the permissions policy**

Attach the **Permissions policy JSON** from the setup panel to the role. It allows `s3:PutObject`, `s3:DeleteObject`, and `s3:AbortMultipartUpload` under your prefix only.

**7. Choose the source and test**

Choose the **Source** and click **Test connection**. Lovable writes and deletes a small test object named `.lovable-export-test` under your prefix. When the test passes, Lovable shows the bucket's region.

**8. Create the export**

Click **Create export**. Lovable runs the same test again when you save.

> [!WARNING]
>
> Use the trust policy exactly as the setup panel shows it. It sets a condition on `accounts.google.com:oaud`, not `accounts.google.com:aud`, because only `oaud` carries the audience that is unique to your Lovable workspace. If you remove that condition, another Lovable workspace that knows your role ARN could assume the role.

Lovable finds the bucket's region automatically, so the role needs no bucket-level permissions.

## Exported files

Each run writes one file per window under your prefix. See [Object storage file layout](https://docs.lovable.dev/features/data-exports#object-storage-file-layout) for the full path. For example:

```text theme={null}
s3://acme-lovable-exports/lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__compliance-audit-log-export/source=audit_logs/run=2026-10-13T10-00-12Z__7c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f/window=2026-10-13T08-55-07Z--2026-10-13T09-55-12Z/part-00000.jsonl.gz
```

You can change the prefix and the role ARN later. Lovable checks access again when you save, so update the permissions policy for a new prefix first. If you clear the prefix, Lovable writes to the bucket root, which the permissions policy no longer covers. You cannot change the bucket. To use another bucket, create a new export.

If the bucket no longer exists, Lovable pauses the export and the run fails. Fix the bucket, then resume the export with the **Schedule** switch.

## Query with Amazon Athena

Point an external table at the `source=` folder of your export. Athena reads every run and window below it. Copy the `workspace=` and `export=` folder names from a real object key.

```sql theme={null}
CREATE EXTERNAL TABLE lovable_audit_logs (
  id string, `timestamp` string, workspace_id string, action string,
  actor_id string, actor_type string, actor_display_name string,
  target_id string, target_type string, target_display_name string,
  status string, error string, status_message string, ip_address string,
  user_agent string, client_platform string, otel_trace_id string,
  otel_span_id string, details string
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES ('ignore.malformed.json' = 'true')
STORED AS TEXTFILE
LOCATION 's3://acme-lovable-exports/lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__compliance-audit-log-export/source=audit_logs/'
```

Tips for queries:

* `timestamp` is text such as `2026-10-13 09:41:07.123456`. Read it with `from_iso8601_timestamp(replace("timestamp", ' ', 'T') || 'Z')`.
* `details` in audit logs is a JSON string. Read a field with `json_extract_scalar(details, '$.name')`.
* Remove duplicates by keeping one row per `id`, for example with `SELECT DISTINCT` or `row_number() OVER (PARTITION BY id)`.

## Troubleshooting

> **Could not assume the role**
>
> The role's trust policy does not let Lovable assume it. Replace the trust policy with the one from the setup panel, without changes. Check that the role trusts the identity provider `accounts.google.com` for web identity.

> **AWS could not validate the identity token**
>
> The role probably trusts a custom OIDC provider for `accounts.google.com` that does not list your workspace's audience. Use the trust policy from the setup panel as is, with the built-in `accounts.google.com` principal. Or add the audience from the setup panel to your custom provider.

> **Bucket not found**
>
> Check the bucket name. The bucket must exist.

> **Could not determine bucket region**
>
> Lovable could not reach the bucket to find its region. Check that the bucket name is correct and that the bucket exists.

> **Write to bucket denied**
>
> The role cannot write under your prefix (`s3:PutObject`). Attach the permissions policy from the setup panel. If you changed the prefix, update the policy to match.

> **Connected, but cleanup is blocked**
>
> Lovable can write but not delete (`s3:DeleteObject`). The test object stays in the bucket, and Lovable cannot clean up after a failed run. Add delete permission under the prefix. You can still save the export.

For run failures, the message under the run tells you what to check, for example the trust policy or write access to the bucket and prefix. See [Troubleshooting](https://docs.lovable.dev/features/data-exports#troubleshooting) for general run issues.


## Related topics

- [Export Lovable logs to Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)
- [Export Lovable logs to Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
- [Export Lovable logs to Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
