# Export Lovable logs to Azure Log Analytics
<!-- source: https://docs.lovable.dev/features/data-exports-azure-log-analytics.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export Lovable logs to Azure Log Analytics

> Set up a scheduled data export from Lovable to an Azure Log Analytics workspace. A setup script creates a table and data collection rule for each source.

A data export to Azure Log Analytics sends rows to a table in your Log Analytics workspace. Each source gets its own table, which a setup script creates together with a data collection rule. Lovable signs in as an app registration in your Microsoft Entra tenant through a federated credential, so no secret is stored on either side.

For sources, schedules, and run behavior, see [Data exports](https://docs.lovable.dev/features/data-exports).

## Prerequisites

* A Log Analytics workspace in the Azure public cloud. Azure Government, Azure China, and private endpoints are not supported.
* Permission to register an app and add a federated credential in Microsoft Entra ID.
* An Azure account that can create tables, data collection rules, custom roles, and role assignments in the workspace's resource group.
* The Azure CLI, signed in to the workspace's subscription, in a bash or zsh shell.
* The workspace admin or owner role in Lovable, on an Enterprise plan.

## Set up the export

Set up one export per source. Run the setup script shown in each export's setup panel, because each source has its own table and rule.

**1. Start a new export**

Go to [Data exports](https://lovable.dev/settings/data-exports), click **New data export**, and choose **Azure Log Analytics** under **Destination**. Choose the **Source** now. The setup script depends on it.

**2. Register an app**

Register one app for this Lovable workspace. In the Azure portal, open **Microsoft Entra ID → App registrations → New registration**. On the app's **Overview** page, copy the **Directory (tenant) ID** into **Tenant ID** and the **Application (client) ID** into **Client ID**. You can also run the CLI commands shown in the setup panel.

If this Lovable workspace already exports to [Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md), you can reuse that app and its federated credential.

Entra allows one federated credential per issuer and subject on an app. A second Lovable workspace needs a second app.

**3. Trust Lovable**

On the app, open **Certificates & secrets → Federated credentials → Add credential**. Choose the scenario **Other issuer** and fill in the **Credential values** from the setup panel. You can also run the CLI commands shown in the setup panel.

**4. Enter the workspace resource ID**

In Azure, open the Log Analytics workspace's **Properties** page and copy its **Resource ID**. Paste it into **Log Analytics workspace resource ID**. It looks like `/subscriptions/<subscription ID>/resourceGroups/<resource group>/providers/Microsoft.OperationalInsights/workspaces/<workspace name>`.

**5. Create the table and grant access**

Copy the **Azure CLI script** from the setup panel and run it. The script is ready to paste and already holds your values. It creates or updates the table for your source and its data collection rule, then lets the app read the workspace, that table, and that rule, and send data through the rule.

You can run the script again at any time. Role assignments can take several minutes to apply.

**6. Test the connection**

Click **Test connection**. **Access check succeeded** means that Azure authentication, the table and rule, and the permissions on them passed. The test sends no events. The first run confirms that ingestion works.

**7. Create the export**

Click **Create export**.

> [!NOTE]
>
> The setup panel is the source of truth for the federated credential and the permissions. Run the script shown in the setup panel rather than creating the roles yourself.

### What Lovable can access

The app that Lovable signs in as can read the Log Analytics workspace and the tables and data collection rules that the setup script created for it, check its own permissions on them, and send data through those rules. Lovable cannot change any table or rule. It has no write, delete, role assignment, workspace key, or log query access.

## Tables and columns

Each source has its own table:

| Source | Table |
| :- | :- |
| Audit logs | `LovableAuditLogsV2_CL` |

Lovable sends each source row in the dynamic `Payload` column, using the field names and JSON types listed in [Sources](https://docs.lovable.dev/features/data-exports#sources). Each table has these columns:

| Column | Contents |
| :- | :- |
| `TimeGenerated` | When the event happened, in UTC (the source's `timestamp`). |
| `EventTime` | When the event happened, in UTC (the source's `timestamp`). |
| `EventId` | The row's `id`. Use it to remove duplicates. |
| `WorkspaceId` | ID of the Lovable workspace. |
| `ProjectId` | Empty for audit logs. |
| `LovableExportId` | ID of the export. |
| `LovableRunId` | ID of the run that delivered the row. |
| `Payload` | The source row as a JSON object, including nested values. For the fields, see [Sources](https://docs.lovable.dev/features/data-exports#sources). Azure size limits apply. |

Rows appear in the table after Azure processes them. The first delivery after setup can take several minutes.

The tables use the Analytics plan and the retention of your workspace. New source fields appear inside `Payload` without a table or data collection rule update.

## Query and remove duplicates

Delivery is at least once, so a retried run can send a row again. Remove duplicates in queries with `EventId`:

```kusto theme={null}
LovableAuditLogsV2_CL
| summarize arg_max(TimeGenerated, *) by EventId
```

Audit log `Payload.details` contains JSON text. Parse it to query its properties:

```kusto theme={null}
LovableAuditLogsV2_CL
| extend Details = parse_json(tostring(Payload.details))
| project TimeGenerated, Action = tostring(Payload.action), Details
```

## Change or remove the export

You cannot change the tenant ID, the client ID, or the workspace resource ID of an export. To change them, create a new export.

Deleting an export keeps its table, its data collection rule, and its data in Azure. To remove them, disable or delete the export first, then delete them in Azure. Lovable cannot recreate a table or rule that you delete. Runs fail until you run the setup script again.

## Azure size limits

Azure limits each Logs Ingestion API request to **1 MB**, including event payloads and the metadata columns Lovable adds to each row (`EventId`, `WorkspaceId`, `LovableExportId`, `LovableRunId`, and the time columns). This request limit does not guarantee that individual fields are retained in full. See [Azure Monitor service limits](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api).

> [!WARNING]
>
> Azure can accept a request and still shorten field values longer than 64 KB. A run that Azure accepted counts as delivered, even if Azure shortened some values. Lovable sends every value in full and does not read it back.

## Troubleshooting

> **Authentication denied**
>
> Check the federated credential's issuer, subject, and audience against the setup panel. Then run the setup script again so the role assignments exist. Role assignments can take several minutes to apply.

> **Azure resource conflict**
>
> A table or rule with Lovable's name exists, but the setup script did not create it, or it sends data to another workspace. Check the workspace resource ID. Or remove the old table or rule and run the setup script again.

> **Azure schema does not match**
>
> The table or rule does not match the export's schema, for example after a column type or rule transformation was changed in Azure. Run the source's setup script again. If a column has a different type than Lovable expects, restore that type first. Your existing data is not deleted.

> **Destination configuration is invalid**
>
> Check the tenant ID and the destination settings against the setup panel. If the source's table or rule is missing, run the source's setup script again. New permissions and resources can take several minutes to become available.

> **Azure Monitor rejected the request**
>
> Check the workspace resource ID, and that the table and rule match the setup panel.

> **A run fails because the data is too large**
>
> Azure Monitor rejects requests larger than its 1 MB limit, including Lovable metadata. If a single row cannot fit, the run fails. Contact Lovable support. Requests within this limit can still have oversized fields truncated, as described in [Azure size limits](#azure-size-limits).

See [Troubleshooting](https://docs.lovable.dev/features/data-exports#troubleshooting) for general run issues.


## Related topics

- [Export Lovable logs to Azure Blob Storage](https://docs.lovable.dev/features/data-exports-azure-blob-storage.md)
- [Export Lovable logs to Splunk](https://docs.lovable.dev/features/data-exports-splunk.md)
- [Export Lovable logs to Amazon S3](https://docs.lovable.dev/features/data-exports-amazon-s3.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
