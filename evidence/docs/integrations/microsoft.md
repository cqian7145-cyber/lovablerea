# Connect your app to Microsoft 365
<!-- source: https://docs.lovable.dev/integrations/microsoft.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Microsoft 365

> Connect Microsoft Outlook, Teams, OneDrive, SharePoint, Word, Excel, PowerPoint, and OneNote to your Lovable app. All use the same Microsoft sign-in and Microsoft Graph pattern, so one guide covers every Microsoft connector.

[Microsoft 365](https://www.microsoft.com/microsoft-365) includes services like Outlook, Teams, OneDrive, SharePoint, Word, Excel, PowerPoint, and OneNote. Lovable offers a separate connector for each of these products, and they all work the same way: you sign in with your Microsoft account, Lovable stores the tokens securely, and your app calls [Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview) through Lovable's connector gateway with automatic token refresh.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Microsoft connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Microsoft account and work with their own data |

## Included Microsoft connectors

Each Microsoft product has its own connector in the catalog:

| Connector in Lovable | What it's for |
| :- | :- |
| **Microsoft Outlook** | Email and calendar: read, send, and manage mail, and read and manage calendar events in the signed-in account. |
| **Microsoft Teams** | Teams and channels: send messages, list teams and channels, and work with conversations. |
| **Microsoft OneDrive** | Files: upload, download, and work with files in the connected account's OneDrive. |
| **Microsoft SharePoint** | Sites, lists, and document libraries: browse sites, read and write list items, and work with files stored in SharePoint. |
| **Microsoft Word** | Documents: read and write Word files stored in OneDrive or SharePoint. |
| **Microsoft Excel** | Spreadsheets: read and write Excel workbooks. |
| **Microsoft PowerPoint** | Presentations: read and write PowerPoint files. |
| **Microsoft OneNote** | Notes: notebooks, sections, and pages in OneNote. |

Pick the connector that matches what you are building. You can create multiple connections per product if you need different Microsoft accounts or environments.

To work with your whole organization's directory or Microsoft 365 data without a signed-in user, use [Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md) instead. It connects with a Microsoft Entra service principal rather than a Microsoft account.

## Common use cases and example apps

These examples show what you can build with a single Microsoft product. You can also combine several Microsoft connectors in the same project for multi-product workflows.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Inbox triage dashboard | *Use Microsoft Outlook and build a dashboard that shows my unread email by sender and lets me send replies.* | **Manage email from a focused interface.** The app reads mail from the connected mailbox, groups it for review, and sends replies through the same account. |
| Team booking page | *Use Microsoft Outlook and build a booking page that checks my calendar availability and creates events when someone books.* | **Let people schedule time based on real calendar availability.** The app reads free and busy times, shows open slots, and creates calendar events when a booking is confirmed. |
| Teams notifier | *Use Microsoft Teams and build a form that posts a summary message to our project channel on every submission.* | **Send automated updates to a Teams channel.** The app formats submission details and posts them as channel messages so the team sees new activity without leaving Teams. |
| Drive-based file hub | *Use Microsoft OneDrive and build an internal tool that lists my folders and lets me upload and organize files.* | **Create a structured file management experience on top of OneDrive.** The app lists folders and files, supports uploads, and keeps documents organized in one interface. |
| SharePoint list manager | *Use Microsoft SharePoint and build an app that reads and updates items in our project tracker list.* | **Work with SharePoint lists from a custom interface.** The app reads list items, displays them in a tailored view, and writes updates back to the SharePoint site. |
| Expense tracker | *Use Microsoft Excel and build an expense tracker that logs each entry as a row in my workbook.* | **Use an Excel workbook as a lightweight backend.** The app appends structured rows to a workbook and reads them back for reporting. |
| Proposal generator | *Use Microsoft Word and build a form that generates a proposal document and saves it to OneDrive.* | **Automate document creation from structured input.** The app generates a formatted Word document from form data and saves it for sharing or review. |

## How Microsoft connections work

All eight connectors follow the same pattern:

* **OAuth 2.0**: You authorize a Microsoft account (work, school, or personal) for the product you are connecting. Permissions depend on the scopes requested for that connector, and every Microsoft connector lets you review them under **Advanced settings**. Grant only what your app needs.
* **Microsoft Graph**: Requests go to `https://graph.microsoft.com/v1.0/` through Lovable's connector gateway. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for secure token handling and the per-project usage limit.
* **Same flow everywhere**: Add a connection, sign in with Microsoft, approve the requested permissions, and link the connection to projects. Only the product and its API surface change between Outlook, Teams, OneDrive, and the rest.

> [!NOTE]
>
> Microsoft 365 licensing, tenant policies, and Graph throttling are controlled by Microsoft and your organization, not Lovable.

## How to connect a Microsoft product

Who can create Microsoft connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple connections per product using different Microsoft accounts, which is useful for separating environments or working with several mailboxes, drives, or teams.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting a Microsoft product, make sure you have:

* A Microsoft account with access to the product you want to connect
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Set up your Microsoft connection

The steps are the same for every Microsoft product:

**1. Open the Microsoft product in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select the Microsoft product you want to connect, for example **Microsoft Outlook** or **Microsoft Teams**. Each product has its own tile. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Outlook Prod`). This name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Expand **Advanced settings** to review the Microsoft Graph permissions your app will request. Each product requests its own set of scopes, and defaults are pre-selected for common use cases.

For full scope documentation, see the [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Microsoft and authorize**

Click **Connect** at the bottom of the form. The Microsoft sign-in window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in with the Microsoft account you want to use, review the requested permissions, and click **Accept**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to the connection (based on configured connection-level access). Your Lovable apps can then start working with that Microsoft product.

If your organization uses conditional access or requires admin consent, sign-in can fail until a Microsoft 365 administrator approves Lovable for the tenant.

For API details for a specific product, see the [Microsoft Graph REST API reference](https://learn.microsoft.com/en-us/graph/api/overview).

## Limitations

The Microsoft connectors cannot:

* Act on behalf of each visitor to your app. Each connection is tied to one authorized Microsoft account, and everything the connection does uses that account's mail, files, and teams. If you need each user of your app to sign in with their own Microsoft account, use the Microsoft [app user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md).
* Bypass tenant and admin policies. Conditional access, MFA requirements, and blocked apps can prevent sign-in or limit what the connection can do. Resolve those in Microsoft 365 or Microsoft Entra ID.
* Exceed the per-project usage limit that applies to [gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors).

If Microsoft authorization is revoked from the Microsoft side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your Microsoft product connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Microsoft product**, then open the connection.

* **Unlink projects** to remove Microsoft product access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Microsoft product stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [Connect your app to Power BI](https://docs.lovable.dev/integrations/power-bi.md)
