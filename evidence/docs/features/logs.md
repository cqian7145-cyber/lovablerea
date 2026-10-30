# Logs
<!-- source: https://docs.lovable.dev/features/logs.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Logs

> Debug errors and track activity in your app with searchable built-in backend logs across functions, database, auth, and storage.

Logs record what happens in your app's backend: requests, function output, database activity, sign-ins, and errors. When something misbehaves, this is where you find out why. You can also paste a log entry into the project chat and ask Lovable to fix the problem.

To open logs, go to **More → Settings → Logs**.

## Log types

Use the log type selector to choose which service's logs to view:

| Log type | What it shows |
| - | - |
| Server logs | Execution logs from your deployed server worker |
| Function edge logs | Edge Function execution logs with request and response data |
| Authentication logs | User authentication events and security logs |
| PostgreSQL logs | Database queries, errors, and performance metrics |
| Realtime logs | WebSocket connections and realtime subscriptions (live updates such as chat messages or notifications) |
| Storage logs | File uploads, downloads, and storage operations |
| Edge logs | HTTP requests and responses from Edge Functions |
| Function logs | Serverless function execution logs and events |

The selector is filtered to your project type: **Server logs** appears only on TanStack Start projects, and the other types appear on projects with the built-in backend, where **Edge logs** is the default view.

## Search and filter

Three controls narrow down what you see:

* **Search events** filters entries by text.
* The **time interval selector** offers relative ranges from the last 15 minutes up to the last 5 days, or an absolute range with exact start and end times.
* A **status filter** narrows results, for example to error responses only.

Logs do not stream live. Click **Refresh** to load new entries, and **Show more** at the bottom to page further back in time.

Above the table, **Download** saves the loaded entries as a JSON file, and **Copy** copies them to your clipboard. Expand an entry to see its full contents and copy it individually.

## FAQ

> **Do logs update in real time?**
>
> No. The view shows a snapshot of the selected time range. Click **Refresh** to see the latest entries.

> **How far back can I see logs?**
>
> The relative ranges go back up to 5 days, and you can pick an absolute start and end time for older windows. For long-term retention, ask Lovable to build logging or analytics into your app itself.

> **What does 'Rate limit reached' mean?**
>
> You've requested logs too frequently in a short period. Wait a moment and refresh again.


## Related topics

- [Audit logs](https://docs.lovable.dev/features/audit-logs.md)
- [Export Lovable logs to Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
- [Export Lovable logs to Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)
- [Export Lovable logs to Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
