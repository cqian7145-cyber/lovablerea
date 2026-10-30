# Export Lovable logs to Splunk
<!-- source: https://docs.lovable.dev/features/data-exports-splunk.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export Lovable logs to Splunk

> Set up a scheduled data export from Lovable to Splunk Cloud or Splunk Enterprise through the HTTP Event Collector (HEC). Lovable sends one JSON event per row with fields to search and remove duplicates.

A data export to Splunk sends one event per row to your Splunk HTTP Event Collector (HEC). Each event carries the row as JSON, plus fields that identify the export, the run, and the row. Data exports work with Splunk Cloud and Splunk Enterprise.

For sources, schedules, and run behavior, see [Data exports](https://docs.lovable.dev/features/data-exports).

## Prerequisites

* Splunk Cloud or Splunk Enterprise with the HTTP Event Collector enabled.
* An HEC token that can write to the index you want to use.
* An HTTPS HEC endpoint that Lovable can reach over the public internet.
* The workspace admin or owner role in Lovable, on an Enterprise plan.

## Set up the export

Create the export in Lovable with your HTTP Event Collector endpoint and token.

**1. Start a new export**

Go to [Data exports](https://lovable.dev/settings/data-exports), click **New data export**, and choose **Splunk HEC** under **Destination**.

**2. Enter the endpoint and token**

Fill in the form:

* **Endpoint URL**: your HTTPS HEC endpoint, for example `https://prd-p-example.splunkcloud.com:8088/services/collector/event`. You can also enter the URL without a path, or with `/services/collector`. Lovable always sends to `/services/collector/event`.
* **Token**: your HEC token.
* **Index (optional)**, **Source (optional)**, and **Sourcetype (optional)**: values Lovable sets on every event. Leave them blank to use the defaults of your token.

**3. Choose TLS verification**

Under **TLS verification**, choose how Lovable checks your endpoint's certificate:

| Option | Use it for |
| :- | :- |
| **Verify (default)** | Splunk Cloud, and any certificate from a public certificate authority. |
| **Skip TLS verification** | A self-signed certificate, for example on a Splunk trial. |
| **Custom CA certificate** | A certificate from a private certificate authority. Paste the PEM certificate of the authority that signed your Splunk server certificate into **CA certificate (PEM)**. The certificate must still match the endpoint host name. |

**4. Choose the source and test**

Choose the **Source** and click **Test connection**. Lovable sends one test event to your HEC endpoint. See [Test events](#test-events).

**5. Create the export**

Click **Create export**.

To rotate the token, edit the export and enter the new token in **Token**. Leave the field blank to keep the current token. Lovable stores your token encrypted.

**Test connection** stays disabled until **Token** is filled in, also when you edit a saved export. To test a saved export again, enter the token again.

You can change the token, index, source, sourcetype, and TLS settings later. You cannot change the endpoint URL. To use another endpoint, create a new export.

## Exported events

Each row becomes one HEC event. The event time is the row's `timestamp`. The event body is the row, with the fields described in [Sources](https://docs.lovable.dev/features/data-exports#sources). Lovable adds these fields to every event:

| Field | Description |
| :- | :- |
| `lovable_event_id` | The row's `id`. Use it to remove duplicates. |
| `lovable_workspace_id` | ID of your Lovable workspace. |
| `lovable_export_id` | ID of the export. |
| `lovable_run_id` | ID of the run that delivered the event. |
| `lovable_source_type` | The source: `audit_logs`. |
| `lovable_window_start` | Start of the time window the run covered. |
| `lovable_window_end` | End of the time window the run covered. |

Here is an audit log event as Lovable sends it, formatted for readability:

```json theme={null}
{
  "time": 1791884467.123456,
  "index": "lovable",
  "event": {
    "id": "5f0c2b7e-8d4a-4c1e-9b3f-2a6d7e8c9f01",
    "timestamp": "2026-10-13 09:41:07.123456",
    "workspace_id": "workspace_01k7c3m2x8f9qv0b6t4n5r2hzd",
    "action": "project.created",
    "actor_display_name": "Dana Kim",
    "target_display_name": "Customer portal",
    "status": "success"
  },
  "fields": {
    "lovable_event_id": "5f0c2b7e-8d4a-4c1e-9b3f-2a6d7e8c9f01",
    "lovable_workspace_id": "workspace_01k7c3m2x8f9qv0b6t4n5r2hzd",
    "lovable_export_id": "0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90",
    "lovable_run_id": "7c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f",
    "lovable_source_type": "audit_logs",
    "lovable_window_start": "2026-10-13T08:55:07Z",
    "lovable_window_end": "2026-10-13T09:55:12Z"
  }
}
```

The `event` object holds every field of the source. This example shows only some of them.

## Search and remove duplicates

Search by `lovable_export_id`, `lovable_run_id`, or `lovable_workspace_id`. Delivery is at least once, so a retried run can send an event again. Remove duplicates with `dedup` in searches and dashboards:

```text theme={null}
index=lovable lovable_source_type=audit_logs
| dedup lovable_event_id
```

### Test events

**Test connection** sends one event with the message `lovable customer data export connection test` and the field `lovable_probe=true`. To leave test events out of a search, add `NOT lovable_probe=true`.

## Troubleshooting

> **TLS certificate verification failed**
>
> Lovable could not verify your endpoint's certificate. Check that the endpoint host matches the certificate. For a private certificate authority, choose **Custom CA certificate** and paste the signing certificate. For a self-signed certificate, choose **Skip TLS verification**.

> **Authentication denied**
>
> Splunk rejected the token. Check the token, and that it can write to the index you set.

> **Splunk rejected the request**
>
> Check the **Index** and **Sourcetype**, and that the token can write to that index.

> **Destination configuration is invalid**
>
> Lovable could not use your endpoint settings. This covers a wrong **Endpoint URL**, an endpoint that Lovable cannot reach over the public internet, and an invalid CA certificate. Check the **Endpoint URL**, your network settings, and the **CA certificate (PEM)** if you use one.

> **A run fails because an event is too large**
>
> Splunk rejects events larger than the HEC `max_content_length` setting. Raise `max_content_length` on your Splunk deployment, then let the next run retry. Until the limit is raised, the export does not advance past that data. If you cannot change the limit, contact Lovable support.

See [Troubleshooting](https://docs.lovable.dev/features/data-exports#troubleshooting) for general run issues.


## Related topics

- [Export Lovable logs to Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
- [Export Lovable logs to Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md)
- [Export Lovable logs to Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
