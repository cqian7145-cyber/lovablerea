# Export audit logs to your SIEM or cloud storage
<!-- source: https://docs.lovable.dev/features/data-exports.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export audit logs to your SIEM or cloud storage

> Schedule exports of workspace audit logs to Amazon S3, Google Cloud Storage, Azure Blob Storage, Splunk, or Azure Log Analytics. Lovable delivers new data every hour or every 3 hours.

Data exports send your workspace's logs to a destination you own, on a schedule. Each export copies one source to one destination, such as an S3 bucket or a Splunk index. After the first run, each run sends only the data that arrived since the previous run.

* **Available on:** Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** [Data exports](https://lovable.dev/settings/data-exports) (**Workspace settings → Security → Data exports**)

## Why use data exports

Lovable keeps [audit logs](https://docs.lovable.dev/features/audit-logs.md) for 13 weeks. Data exports put a copy of that data in your own systems, where you control retention, access, and analysis.

Use data exports when you want to:

* Keep audit logs longer than 13 weeks, for example a multi-year audit trail in a bucket with your own lifecycle rules.
* Search Lovable activity next to your other security events in a SIEM (security information and event management system), for example to alert when someone changes SSO settings or adds a workspace admin.

Use the **Export** button on the audit logs page instead when you need a one-time download. See [Exporting audit logs](https://docs.lovable.dev/features/audit-logs.md#exporting-audit-logs).

## Sources

Each export copies exactly one source. To export several sources, create one export per source.

| Source | Label in Lovable | What it contains |
| :- | :- | :- |
| `audit_logs` | **Audit logs** | The workspace activity shown on the [audit logs](https://docs.lovable.dev/features/audit-logs.md) page: membership, project, and security events. |

Every row has an `id` field. The `id` stays the same if Lovable delivers the row again, so you can use it to remove duplicates. See [Delivery and duplicates](#delivery-and-duplicates).

### Audit log fields

Each audit log row has these fields:

| Field | Description |
| :- | :- |
| `id` | Unique ID of the event. |
| `timestamp` | When the event happened, in UTC, for example `2026-10-13 09:41:07.123456`. |
| `workspace_id` | ID of your Lovable workspace. |
| `action` | The event type, for example `project.created` or `workspace.member.added`. |
| `actor_id` | ID of the member or system that performed the action. |
| `actor_type` | The kind of actor, for example `user`, `scim`, or `system`. |
| `actor_display_name` | Display name of the actor. |
| `target_id` | ID of the affected resource. |
| `target_type` | The kind of resource, for example `project` or `workspace`. |
| `target_display_name` | Display name of the affected resource. |
| `status` | Result of the action, for example `success` or `failure`. |
| `error` | Error text when the action failed. |
| `status_message` | Extra status text, when present. |
| `ip_address` | IP address the action came from. |
| `user_agent` | User agent of the client. |
| `client_platform` | The app the event came from, for example `web`, `ios`, `android`, or `desktop-app`. |
| `otel_trace_id` | Trace ID that Lovable support can use to investigate the event. |
| `otel_span_id` | Span ID that Lovable support can use to investigate the event. |
| `details` | Event metadata as a JSON-encoded string, for example `{"name":"Customer portal"}`. |

Here is one audit log row, formatted for readability:

```json theme={null}
{
  "id": "5f0c2b7e-8d4a-4c1e-9b3f-2a6d7e8c9f01",
  "timestamp": "2026-10-13 09:41:07.123456",
  "workspace_id": "workspace_01k7c3m2x8f9qv0b6t4n5r2hzd",
  "action": "project.created",
  "actor_id": "u9XkP2mQ7rTnB4vL1cYs8dWe3fGh",
  "actor_type": "user",
  "target_id": "c7a1e2b3-5d4f-4e6a-9b8c-0d1e2f3a4b5c",
  "target_type": "project",
  "target_display_name": "Customer portal",
  "actor_display_name": "Dana Kim",
  "status": "success",
  "error": "",
  "status_message": "",
  "ip_address": "203.0.113.24",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  "client_platform": "web",
  "otel_trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "otel_span_id": "00f067aa0ba902b7",
  "details": "{\"name\":\"Customer portal\"}"
}
```

## Destinations

Lovable supports five destinations. Object storage destinations receive files. Event destinations receive one event per row.

| Destination | Type | What Lovable sends | Remove duplicates with |
| :- | :- | :- | :- |
| [Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md) | Object storage | Gzipped JSON Lines files | `id` |
| [Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md) | Object storage | Gzipped JSON Lines files | `id` |
| [Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md) | Events | One table row per row, in a table for each source | `EventId` |
| [Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md) | Object storage | Gzipped JSON Lines files | `id` |
| [Splunk](https://docs.lovable.dev/features/data-exports-splunk.md) | Events | One HTTP Event Collector event per row | `lovable_event_id` |

None of the destinations need a long-lived password or access key, except Splunk. Lovable signs in to AWS, Google Cloud, and Azure with short-lived credentials that your cloud account trusts. For Splunk, you give Lovable an HTTP Event Collector token.

### Object storage file layout

Amazon S3, Google Cloud Storage, and Azure Blob Storage receive gzipped [JSON Lines](https://jsonlines.org/) files, one row per line. Lovable writes them under this path:

```text theme={null}
<prefix>/workspace=<workspace ID>__<workspace name>/export=<export ID>__<export name>/source=<source>/run=<run start>__<run ID>/window=<window start>--<window end>/part-00000.jsonl.gz
```

For example:

```text theme={null}
lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__siem-audit-logs/source=audit_logs/run=2026-10-13T10-00-12Z__7c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f/window=2026-10-13T08-55-07Z--2026-10-13T09-55-12Z/part-00000.jsonl.gz
```

* `<prefix>` is the prefix you set on the export. The default is `lovable-export/`.
* Lovable shortens the workspace and export names in the path to lowercase letters and digits, with `-` between words, up to 48 characters.
* Times in `run=` and `window=` are in UTC.
* A window with no new data creates no file.

The files have the content type `application/gzip`. Any tool that reads gzipped JSON Lines can read them, such as Amazon Athena or BigQuery.

## Prerequisites

* An account with the destination provider, and permission to grant access there. Each destination page lists what you need.

## Create a data export

These steps apply to every destination. Each destination page covers its own access setup.

**1. Open Data exports**

Go to [Data exports](https://lovable.dev/settings/data-exports) (**Workspace settings → Security → Data exports**) and click **New data export**.

**2. Name the export and choose a schedule**

Enter a **Name**, for example `Compliance audit log export`. Keep the export **Enabled**. Under **Schedule**, choose **Every 1 hour** or **Every 3 hours**.

**3. Choose the destination and the source**

Under **Destination**, choose where to send the data and fill in its fields. Under **Source**, choose **Audit logs**.

The setup panel next to the form shows the steps for your destination. It fills in the policies and commands with your values as you type. Follow the guide for your destination:

* [Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md)
* [Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
* [Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
* [Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
* [Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)

**4. Test the connection**

Click **Test connection**. Fix any error the test shows before you continue. See the troubleshooting section of your destination's page.

**5. Create the export**

Click **Create export**. For Amazon S3, Google Cloud Storage, and Azure Blob Storage, Lovable checks access again when you save. A failed check blocks the save.

> [!TIP]
>
> The first run starts within a few minutes. Click the export in the list to watch it in **Recent history**.

## How runs work

### Schedule and timing

Each export runs on its schedule, every hour or every 3 hours. Each run exports the data that arrived since the previous run, up to about 5 minutes before the run started. An export runs one run at a time. If a run is still going when the next one is due, Lovable skips the scheduled run.

### First run and history

The first run exports all the history that Lovable still holds for the source, then later runs continue with new data:

* **Audit logs:** up to 13 weeks of history. See [Audit log data retention](https://docs.lovable.dev/features/audit-logs.md#audit-log-data-retention).

The first run splits history into windows: up to 30 days each for audit logs. For object storage, each window becomes its own `window=` folder. If the first run fails partway, the next run starts the full history again from the same point and writes every window again under its own `run=` folder. Lovable removes the files the failed run wrote when it can.

### Failed runs

When a run fails, Lovable does not move the export forward. The next run tries the same data again, so a failure does not leave a gap. The run shows a message that explains what to fix. See [Troubleshooting](#troubleshooting).

### Delivery and duplicates

Delivery is at least once. Lovable can deliver a row more than once, for example when it retries after a network error. Remove duplicates when you query the data:

| Destination | Remove duplicates with |
| :- | :- |
| Amazon S3, Google Cloud Storage, Azure Blob Storage | Keep one row per `id`. |
| Splunk | `\| dedup lovable_event_id` |
| Azure Log Analytics | `<table> \| summarize arg_max(TimeGenerated, *) by EventId` |

For object storage, a retry within a run overwrites the same file. A later run that delivers the same window again writes it under its own `run=` folder.

## Monitor runs

The **Data exports** page lists your exports with their **Last run**, **Activity**, **Next run**, and **Schedule**. Click an export to open its details:

* **Destination**: the destination address. Click to copy it.
* **Success**, **Rows**, and **Runs**: totals for the period in the label, the last 7 days or the last runs loaded.
* **Run now**: starts a run immediately.
* **Recent history**: one row per run with its start time, duration, row count, and status. Runs you started with **Run now** show a **Manual** badge.

Click a run to expand it. You see the run ID, the rows, bytes, and files it wrote, and the time window it covered. For object storage, you also see each file with its size. Click the copy button to copy a file's address.

| Status | Meaning |
| :- | :- |
| **Running** | The run has started and has not finished. |
| **OK** | The run delivered all new data. A run with 0 rows is also OK. It means no new data arrived. |
| **Failed** | The run did not deliver. The message under the run says why. |

## Manage an export

Open the actions menu on an export row, or click the export to open its details.

### Edit an export

Choose **Edit export** or **Edit configuration**. You can change the name, the schedule, and some destination settings, such as the prefix or a Splunk token.

You cannot change the source or the destination itself, such as the bucket, the Splunk endpoint, or the Azure workspace. To change them, create a new export.

### Pause and resume

Use the **Schedule** switch to pause or resume an export. A paused export does not run on its schedule, and **Run now** does not work until you resume it. When you resume, the next run starts within a few minutes and catches up on everything since the last successful run.

### Run now

Choose **Run now** to start a run immediately. It exports the same new data that the next scheduled run would. You cannot start a run while another run of the same export is in progress.

### Reset the watermark

The watermark marks how far an export has delivered. Choose **Reset watermark** to clear it. The next run exports the full history again, then continues with new data.

> [!WARNING]
>
> Resetting does not remove data you already received. Your destination will hold duplicate rows for the history that the next run sends again. Remove duplicates as described in [Delivery and duplicates](#delivery-and-duplicates).

You cannot reset while a run is in progress.

### Delete an export

Choose **Delete export**. Lovable stops the schedule and removes the run history for the export. Data that Lovable already delivered to your destination stays there. For Azure Log Analytics, the table and its data collection rule also stay.

### Activity in your audit logs

Lovable records data export activity in your workspace [audit logs](https://docs.lovable.dev/features/audit-logs.md): creating, editing, and deleting exports, manual runs, watermark resets, and connection tests.

## Limitations

* Each export has one source and one destination. Neither can change after you create the export.
* The schedule is every hour or every 3 hours.
* Data arrives at the destination at least 5 minutes after it happened, plus the time until the next run.
* You cannot filter which events an export sends, for example by action or actor. Each export sends every audit log event in the workspace.

## FAQ

> **Which plans include data exports?**
>
> Data exports are available on Enterprise plans. Workspace admins and owners can create and manage exports.

> **Who pays for storage and ingestion at the destination?**
>
> You do. The destination is in your own cloud or Splunk account, so your provider bills that account for storage, ingestion, and queries.

> **Does Lovable store a password or access key for my destination?**
>
> Only for Splunk, where Lovable stores your HTTP Event Collector token. For Amazon S3, Google Cloud Storage, Azure Blob Storage, and Azure Log Analytics, Lovable uses short-lived credentials that your cloud account trusts. You have no key to rotate.

> **Can I send audit logs to more than one destination?**
>
> Yes. Create one export per destination.

> **Why do I see the same row twice?**
>
> Delivery is at least once, so a retry can send a row again. A watermark reset also sends history again. Remove duplicates with `id` for object storage, `lovable_event_id` for Splunk, or `EventId` for Azure Log Analytics.

> **What happens to my data if I delete an export?**
>
> Lovable stops the schedule and removes the export's run history. Everything already delivered stays in your destination. For Azure Log Analytics, the table, its rule, and its data stay in Azure.

## Troubleshooting

> **Test connection fails**
>
> The message names the problem, for example **Could not assume the role** or **Authentication denied**. Each destination page explains its messages and how to fix them:
>
> * [Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md#troubleshooting)
> * [Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md#troubleshooting)
> * [Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md#troubleshooting)
> * [Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md#troubleshooting)
> * [Splunk](https://docs.lovable.dev/features/data-exports-splunk.md#troubleshooting)
>
> **Destination configuration is invalid** and **Connection test failed** mean a value in the form is wrong or the destination could not be reached. Check every field against the setup panel and test again.
>
> New permissions in AWS, Google Cloud, and Azure can take several minutes to apply. Wait, then test again.

> **A run failed**
>
> Expand the run in **Recent history** to read its message. Fix the cause in your destination. The next scheduled run retries the same data, or you can click **Run now**.
>
> If the message says **The export failed due to an internal error. Lovable has been notified.**, the problem is on the Lovable side. The next run retries automatically.

> **The export paused itself**
>
> Lovable pauses an Amazon S3 export when its bucket no longer exists, and a Google Cloud Storage export when its bucket no longer exists or now belongs to another project. It pauses an Azure Blob Storage export when its container no longer exists. This stops Lovable from writing to storage that someone else may now own. Fix the bucket or container, then resume the export with the **Schedule** switch.

> **A run shows 0 rows**
>
> No new data arrived for the source since the previous run. This is normal for a quiet workspace.

> **Run now is not available or shows an error**
>
> **Run now** needs the export to be enabled. Resume it with the **Schedule** switch first. If a run is already in progress, wait for it to finish.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Audit logs](https://docs.lovable.dev/features/audit-logs.md)
- [Export Lovable logs to Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
