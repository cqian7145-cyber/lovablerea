# Audit logs
<!-- source: https://docs.lovable.dev/features/audit-logs.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Audit logs

> Monitor workspace activity with Enterprise audit logs. Filter by action, member, resource, or time range to review events such as membership changes, project actions, authentication events, and workspace settings or configuration changes.

Audit logs provide a searchable audit trail of activity in your workspace. They show who performed an action, when it happened, what changed, and which resource was affected.

Use audit logs to review workspace settings and configuration changes, track access updates, and investigate unexpected behavior. Audit logs can also support security and compliance workflows when needed.

* **Available on:** Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** [Audit logs](https://lovable.dev/settings/audit-logs) (**Workspace settings → Security → Audit logs**)

Enterprise [organizations](https://docs.lovable.dev/features/organizations) have their own **Audit logs** page in organization settings. That page shows organization-level actions and the audit events of every workspace in the organization, and you can filter by workspace. See [Review activity across the organization](https://docs.lovable.dev/features/organizations#review-activity-across-the-organization).

## Audit log events

Workspace audit logs include events across categories such as:

| **Category** | **Example events** |
| :- | :- |
| **Workspace membership** | <ul><li>Member added, removed, or role updated</li></ul> |
| **Workspace management** | <ul><li>Workspace settings updated</li><li>Workspace ownership transferred</li><li>Workspace deleted</li><li>Publishing domain connected or disconnected</li></ul> |
| **Workspace groups** | <ul><li>Group created, updated, or deleted</li><li>Group members added or removed</li></ul> |
| **Identity and access** | <ul><li>Verified domain added or removed</li><li>SSO provider added, updated, or removed</li><li>SCIM provisioning actions</li><li>API key created, updated, or revoked</li><li>Request refused by an API key's [IP allowlist](https://docs.lovable.dev/features/api-keys.md#restrict-a-key-to-an-ip-allowlist)</li></ul> |
| **Secrets and integrations** | <ul><li>GitHub or Slack app installed or removed on workspace</li><li>Custom MCP server created or deleted</li><li>Secrets changed</li></ul> |
| **Projects** | <ul><li>Project created, deleted, restored, published, unpublished, or moved</li><li>Collaborators added, joined, removed, or their role updated</li><li>Custom domains created or deleted</li><li>Supabase project or Shopify store connected or disconnected</li><li>Prompt sent</li><li>Knowledge updated</li><li>Database query executed</li><li>Remix initiated</li></ul> |
| **Lovable Cloud** | <ul><li>Project auth settings updated</li><li>Cloud auth users created, invited, or deleted</li><li>Storage buckets created or deleted</li><li>Cloud storage upload limit updated</li><li>Disk configuration updated</li><li>Database password rotated</li></ul> |
| **Authentication** | <ul><li>SSO workspace access</li><li>SSO identity token issued or refreshed</li><li>User logged out everywhere (all sessions revoked from [account settings](https://docs.lovable.dev/introduction/lovable-account-settings#log-out-everywhere))</li></ul> |

This table shows common examples. The **All actions** filter on the audit logs page lists the full set of event types recorded for your workspace.

## Audit log table

By default, the page shows logs for **All actions**, **All actors**, and the **Last 90 days**. The total number of matching logs appears in the top right of the table.

The table is organized into four columns:

| Column | Description |
| - | - |
| **Timestamp** | When the event occurred, such as `4 minutes ago` or `about 11 hours ago`. Hover to see the exact date and time. |
| **Actor** | The member who performed the action. Clicking the member’s name opens a popover showing their `Email`, `User ID`, the `Client` the event came from, `IP Address`, and `User Agent`. The `Client` line is left out when no client was recorded, and names are only clickable for events performed by a member. From this popover, you can copy these details or filter the table by that user. |
| **Action** | The type of activity, displayed as a label such as `Prompt sent`, `Workspace updated`, `Member added`, or `Project created`. |
| **Resource** | The affected object, such as a project, workspace, or user. Some resources are clickable. For example, clicking a project name opens that project. |

Click any row to expand it and see structured JSON details describing the event. This includes the metadata associated with that action, such as message IDs for prompt activity or specific fields that were updated in a workspace setting.

Events triggered through the Lovable API are also attributed to the access token that made the request. The expanded JSON details include an `api_key_id` field alongside the acting user, so you can trace which token drove a given change.

## Filtering audit logs

You can combine the filters to focus on specific activity:

* **All actions** lets you select one or more action types, such as `Member added`, `Member removed`, `Workspace updated`, `Project created`, or `Prompt sent`. The dropdown is searchable.
* **All actors** lets you select one or more workspace members using the searchable picker.
* **Resources** lets you search for projects and people and show only events that affected them.
* **All clients** lets you select one or more client platforms to show only events performed from those apps: **Web**, **Desktop app**, **iOS app**, **Android app**, or **Unknown**. **Unknown** covers events recorded before Lovable started tracking the client platform on August 24, 2026, and events that did not come from one of these apps, such as automated SCIM provisioning.
* **Time range** includes presets for **Last 7 days**, **Last 30 days**, **Last 90 days**, **This month**, and **Last month**.

Your filter selections are reflected in the page URL, so you can share a filtered view with another admin or reload the page without losing it.

## How to use audit logs

A typical workflow:

1. Set a relevant **time range**.
2. Filter by **actor** to review activity from a specific member.
3. Filter by **action type** to narrow results to a specific kind of change.
4. Expand entries to inspect the full JSON details.
5. Open affected projects or jump to related messages to review context.
6. Use the actor popover to copy details such as email, user ID, IP address, or user agent, or to check which client the event came from.

## Exporting audit logs

Click **Export** in the top right of the page, then click **Start new export**. Lovable generates a JSONL file (one JSON event per line) of the audit logs matching your active action, actor, and time range filters, and packages it for download as `audit_logs.jsonl.zip`. Finished exports stay available for download for 7 days, and each export is itself recorded in the audit log.

Each exported event includes a `client_platform` field identifying the app the event came from, such as `web`, `ios`, `android`, or `desktop-app`. Exports created before client tracking was introduced do not include this field.

> [!NOTE]
>
> Export is not available while a resource or client filter is active. Exports cannot yet filter by these, so the **Export** button is disabled with the reason shown as its hint. Clear the **Resources** or client filter first.

To send audit logs to a SIEM or your own storage on a schedule, set up a [data export](https://docs.lovable.dev/features/data-exports).

## Audit log data retention

Logs are retained for 13 weeks, or approximately 90 days. Events older than that are automatically removed. To keep audit logs longer, export them to your own storage with [data exports](https://docs.lovable.dev/features/data-exports).

> [!NOTE]
>
> Logs before February 26, 2026 may be incomplete.

## FAQ

> **Who can access audit logs?**
>
> Audit logs are available on Enterprise plans and are visible to workspace owners and admins.

> **How long are audit logs retained?**
>
> Audit logs are retained for 13 weeks, or approximately 90 days. Events older than that are automatically removed.

> **Can I export audit logs?**
>
> Yes. Click **Export** in the top right of the audit logs page to download your audit logs as a JSONL file, packaged as `audit_logs.jsonl.zip`. The export matches your active action, actor, and time range filters, and finished exports stay available for download for 7 days. Export is not available while a resource or client filter is active.
>
> To send audit logs to a SIEM or external storage on a schedule, use [data exports](https://docs.lovable.dev/features/data-exports). Data exports deliver to Splunk, Azure Log Analytics, Amazon S3, Google Cloud Storage, and Azure Blob Storage.

> **Why don’t I see audit logs?**
>
> If audit logs are not available or do not appear as expected:
>
> * Confirm your workspace is on an Enterprise plan.
> * Confirm your role includes permission to view audit logs. You must be a workspace admin or owner.
> * Clear filters and try a broader time range.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
- [Export Lovable logs to Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
- [Export Lovable logs to Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)
- [Export Lovable logs to Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md)
