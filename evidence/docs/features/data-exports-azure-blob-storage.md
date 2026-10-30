# Export Lovable logs to Azure Blob Storage
<!-- source: https://docs.lovable.dev/features/data-exports-azure-blob-storage.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Export Lovable logs to Azure Blob Storage

> Set up a scheduled data export from Lovable to an Azure Blob Storage container. Lovable signs in with a Microsoft Entra federated credential and writes gzipped JSON Lines files.

A data export to Azure Blob Storage writes gzipped JSON Lines files to a container in your storage account. Lovable signs in as an app registration in your Microsoft Entra tenant through a federated credential. You do not share an account key or a client secret.

For sources, schedules, and run behavior, see [Data exports](https://docs.lovable.dev/features/data-exports).

## Prerequisites

* An Azure storage account, and a container dedicated to Lovable exports.
* Permission to register an app and add a federated credential in Microsoft Entra ID.
* Permission to assign roles on the container, and the Azure CLI signed in to the subscription.
* A storage account in the Azure public cloud. Azure Government, Azure China, and private endpoints are not supported.
* The storage account's public Blob endpoint must accept connections from the internet. IP allowlists are not supported.
* The workspace admin or owner role in Lovable, on an Enterprise plan.

## Set up the export

Create the export in Lovable and an app registration in Microsoft Entra ID. The setup panel fills in the commands with your values.

**1. Start a new export**

Go to [Data exports](https://lovable.dev/settings/data-exports), click **New data export**, and choose **Azure Blob Storage** under **Destination**.

**2. Choose your storage**

Enter the **Storage account** name, for example `acmeexports`, and the **Container**, for example `audit-logs`. Under **Prefix (optional)**, enter a folder for the files, or leave it blank to use `lovable-export/`.

The role assignment in a later step covers the whole container. Use a container that only holds Lovable exports.

**3. Register an app**

Register one app in Microsoft Entra ID for this Lovable workspace, or run the **Create an app** commands shown in the setup panel. Enter the app's Directory (tenant) ID in **Tenant ID** and its Application (client) ID in **Client ID**.

If this Lovable workspace already exports to [Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md), you can reuse that app and its federated credential.

**4. Trust Lovable**

Add the federated credential from the setup panel to the app, unless it already exists. You can enter the **Credential values** in the Azure portal, or run the **Create the federated credential** commands. Each Lovable workspace needs its own app.

**5. Grant container access**

Copy the **Azure CLI script** from the setup panel, fill in the resource group, and run it. It grants the app **Storage Blob Data Contributor** on the container you chose. The prefix controls where in the container Lovable writes.

**6. Choose the source and test**

Choose the **Source** and click **Test connection**. Lovable writes and deletes a small test blob named `.lovable-export-test` under your prefix. Role assignments can take several minutes to apply. If the test fails right after you run the script, wait and test again.

**7. Create the export**

Click **Create export**. Lovable runs the same test again when you save.

## Exported blobs

Each run writes one blob per window under your prefix. See [Object storage file layout](https://docs.lovable.dev/features/data-exports#object-storage-file-layout) for the full path. For example:

```text theme={null}
https://acmeexports.blob.core.windows.net/lovable-exports/lovable-export/workspace=workspace_01k7c3m2x8f9qv0b6t4n5r2hzd__acme-corp/export=0f8e4c2a-6b1d-4f3e-9a7c-2d5b8e1f4a90__compliance-audit-log-export/source=audit_logs/run=2026-10-13T10-00-12Z__7c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f/window=2026-10-13T08-55-07Z--2026-10-13T09-55-12Z/part-00000.jsonl.gz
```

A retry overwrites the same blob. Remove duplicates across runs by keeping one row per `id`.

You can change the prefix later. Lovable runs the test again when you save. If you clear the prefix, Lovable writes to the container root. You cannot change the tenant ID, the client ID, the storage account, or the container. To change them, create a new export.

If the container no longer exists, Lovable pauses the export and the run fails. Create the container again with its role assignment, then resume the export with the **Schedule** switch.

## Troubleshooting

> **Authentication denied**
>
> Check the **Tenant ID** and **Client ID**. Check that the app's federated credential uses the issuer, subject, and audience from the setup panel.

> **Container not found**
>
> Check the storage account and container names. The container must exist.

> **Write to container denied**
>
> Check that the app has **Storage Blob Data Contributor** on the container, and that the storage account's networking settings allow connections from Lovable. Role assignments can take several minutes to apply.

> **Connected, but cleanup is blocked**
>
> The write succeeded, but Lovable could not delete the test blob. Check the container role assignment, immutability policies, and blob leases. The test blob stays in the container. You can still save the export.

> **Azure Blob Storage rejected the request**
>
> Check the container settings, including immutability policies and blob leases.

> **Destination unavailable**
>
> Lovable could not reach the storage account. Check the networking settings and test again.

For run failures, the message under the run tells you what to check, for example the federated credential, the container role assignment, or the storage networking settings. See [Troubleshooting](https://docs.lovable.dev/features/data-exports#troubleshooting) for general run issues.


## Related topics

- [Export Lovable logs to Azure Log Analytics](https://docs.lovable.dev/features/data-exports-azure-log-analytics.md)
- [Export Lovable logs to Google Cloud Storage](https://docs.lovable.dev/features/data-exports-google-cloud-storage.md)
- [Export audit logs to your SIEM or cloud storage](https://docs.lovable.dev/features/data-exports.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Audit logs](https://docs.lovable.dev/features/audit-logs.md)
