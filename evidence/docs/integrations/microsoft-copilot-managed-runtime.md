# Build and publish apps to Microsoft Copilot Managed Runtime
<!-- source: https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Build and publish apps to Microsoft Copilot Managed Runtime

> Build an app in Lovable and publish it to Microsoft Copilot Managed Runtime, where it runs inside your company's Microsoft Entra tenant under your organization's sign-in and IT policies.

> [!NOTE]
>
> The Microsoft Copilot Managed Runtime connector is available on Business and Enterprise plans. It is rolling out gradually, so it may not be available in your workspace yet.

Microsoft Copilot Managed Runtime lets you build an app in Lovable and publish it directly into your company's Microsoft Entra tenant. The published app runs inside Microsoft, your colleagues open it with their Microsoft work sign-in, and your company's IT policies apply to it automatically. Your app and its data stay inside your organization's Microsoft tenant.

Use Copilot Managed Runtime when your company works in Microsoft 365 and your app needs to reach data that lives there, such as SharePoint lists, Outlook, Excel files, or Dynamics 365 records.

## What is Copilot Managed Runtime?

Copilot Managed Runtime is a host for apps that runs inside your organization's Microsoft Entra tenant (your company's own space in Microsoft's cloud) under Microsoft's governance, which your IT team configures in the Power Platform admin center. Every app that runs in Copilot Managed Runtime requires a Microsoft work sign-in, respects the data policies your IT team has set, and appears in your IT team's app inventory alongside everything else the company runs. You build the app in Lovable, Lovable packages it with the Copilot Managed Runtime SDK, and Microsoft hosts and runs it.

For more on the platform itself, see Microsoft's documentation:

* [What is Microsoft Copilot Managed Runtime](https://learn.microsoft.com/en-us/microsoft-365/managed-apps/)
* [Microsoft Copilot Managed Runtime overview and key concepts for admins](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/apps/)
* [Build apps with the Microsoft Copilot Managed Runtime SDK](https://learn.microsoft.com/en-us/microsoft-365/managed-apps/developer/)

## When to use Copilot Managed Runtime

| If you're building | Choose |
| - | - |
| An internal tool for colleagues, built on your company's Microsoft data, governed by IT | Microsoft Copilot Managed Runtime |
| A public website, an app for people outside your organization, or an app using built-in backend features such as databases and secrets | Regular Lovable publishing |

Apps in Copilot Managed Runtime are internal by design. Only people in your organization can open them, after signing in with their Microsoft work account.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Request tracker on SharePoint** | *Build an internal tool that shows the tasks from our "Facilities requests" SharePoint list, with filters by status and assignee and a form to submit a new request.* | **Turn a SharePoint list into a real app.** The app reads and writes the list your team already uses, with a clearer interface than the list view. |
| **Sales pipeline board** | *Pull this quarter's opportunities from Dynamics 365 Sales and show them as a pipeline board grouped by stage.* | **Give the team a live view of CRM data.** The app reads Dynamics 365 records and presents them the way your team wants to work. |
| **Reporting tool on Excel** | *Build a dashboard from the "Monthly numbers" workbook on our team's OneDrive, with a chart per region.* | **Replace a shared spreadsheet with a dashboard.** The app reads the workbook and stays current as the numbers change. |

## Prerequisites

* A Microsoft work account. Personal Microsoft accounts do not work with Copilot Managed Runtime.
* A one-time setup by your IT team. If your Microsoft sign-in fails when you try to connect, this setup is usually the missing piece. Send your IT team to [Set up your Microsoft tenant for Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md).
* A workspace on the Business or Enterprise plan. The connector is not available on Free and Pro plans.
* Permission to create connections in your workspace. On Business and Enterprise plans, the connector's [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) setting starts at **Admins**. An admin or owner may need to change it before you can connect.

## Create a project for Copilot Managed Runtime

Start a new project and describe what you want to build, naming Copilot Managed Runtime as the place where the app runs.

```text wrap theme={null}
Create an app for Microsoft Copilot Managed Runtime that approves purchase orders.
```

On a new project in a workspace where the connector is enabled, Lovable asks one question before it creates any files: whether you want a website hosted by Lovable, which anyone can open from a link, or an app in Microsoft Copilot Managed Runtime, which runs inside your company's Microsoft tenant and is only for people in your company. Lovable recommends the website unless your app has to live inside Microsoft 365, then builds what you pick. Lovable asks this question even when you name Copilot Managed Runtime explicitly, and also when you use older phrasing such as "managed app" or "Power App".

If your request only names Microsoft data or services, such as Outlook, SharePoint, Teams, Excel, OneDrive, or Dynamics, Lovable builds a regular Lovable app with the matching Microsoft connector and does not ask. Requests with no Microsoft wording create a regular Lovable app.

## Connect to Microsoft Entra

Your project needs a Microsoft Copilot Managed Runtime connection before Lovable can set anything up in your Microsoft Entra tenant. The connection uses your Microsoft sign-in, and everything Lovable does in your tenant through it happens under your identity.

The connector uses Lovable's gateway architecture for secure sign-in handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details. Your Microsoft credentials are never exposed to your app's code.

There are two ways to connect. Most people connect from the project chat.

### Connect from the project chat

When your project needs a Microsoft connection, Lovable asks and shows a connect dialog in the project chat. You can also start it yourself at any time:

```text wrap theme={null}
Connect my Microsoft Copilot Managed Runtime account and link it to this project so I can publish the app.
```

Sign in with your Microsoft work account and accept the consent prompt. Lovable links the connection to your project and prepares an app in your Microsoft Entra tenant. If you already connected your Microsoft work account earlier, Lovable links the existing connection instead of asking you to sign in again.

### Connect from the Connectors page

**1. Open the connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Microsoft Copilot Managed Runtime**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection. The name is only used in Lovable to identify this connection.

**4. Optionally set an environment**

Fill in **Environment ID** if your IT team gave you one, or leave it empty to have an environment provisioned automatically. See [Choose a Microsoft environment](#choose-a-microsoft-environment).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

If you remove someone from this list later, they also lose access to linked projects. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. A new window opens for the Microsoft sign-in. Sign in with your Microsoft work account and accept the consent prompt.

After connecting, [link the connection to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it.

### Choose a Microsoft environment

By default, Microsoft creates an environment for you and reuses it afterward. Each builder gets one environment, and it holds all of their apps. If your IT team wants apps in a specific environment instead, they give you an environment ID.

* Enter it in the **Environment ID** field when you create the connection. The field expects an ID like `00000000-0000-0000-0000-000000000000`.
* To look yours up, use the **Find your environment ID** link on the field, which opens the environments list in the [Power Platform admin center](https://admin.powerplatform.microsoft.com/environments).

The publish dialog shows which environment your project deploys to, next to your connection.

### Manage the connection

* **Sharing** controls which workspace members can link the connection to projects and work in projects that use it. A project using your connection can only be shared with workspace members who have access to the connection, so if teammates will collaborate on your project, share the connection with them. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).
* Sharing access does not change whose Microsoft identity is used. Everything Lovable does in your Microsoft Entra tenant through this connection, including publishing, happens under the account that signed in during setup.
* A project links exactly one Microsoft connection. If several connections are available, Lovable asks which one to use, and it never links someone else's connection without your confirmation.
* Connection settings (renaming, changing access, unlinking projects, deleting) work the same as for other connectors. See [App connectors](https://docs.lovable.dev/integrations/app-connectors.md).

## Build your app

Build an app for Copilot Managed Runtime the same way you build any Lovable app: describe what you want in the project chat. When your app needs Microsoft data, name the source and Lovable connects it for you.

```text wrap theme={null}
Add a page that lists open invoices from our Dynamics 365 Business Central and lets me mark them as reviewed.
```

Microsoft data sources that work with your standard Microsoft sign-in include SharePoint, Outlook, OneDrive, Excel Online, and Teams. Dataverse, Dynamics 365, and Business Central also work. Database sources such as SQL Server require a connection that an admin creates upfront on the Microsoft side. Which sources you can actually use is controlled by your IT team's policies.

## Preview your app

The live preview in the editor runs inside the Copilot Managed Runtime host. The first time it loads, Microsoft asks you to sign in. This is expected: apps in Copilot Managed Runtime always verify who is looking at them, even in preview.

If the preview stays blank on your corporate network, your company's network security may be blocking embedded Microsoft content. Ask your IT team to check the [network requirements](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md#network-requirements).

## Publish your app

**1. Open the publish dialog**

Under **Publish to**, the **Microsoft Copilot Managed Runtime** row shows your connection state. When everything is ready, it shows **Connection** followed by the ID of the Microsoft environment your app deploys to.

**2. Publish**

Select **Publish**. The dialog shows **Publishing to Copilot Managed Runtime…** while Microsoft deploys your app.

**3. Open or share the URL**

When publishing finishes, the **App URL** card shows your app's link. Select **View app** to open it, or **Copy URL** to share it with colleagues.

After you make changes, the dialog offers **Publish changes** to deploy the new version, and shows **Up to date** when the published app matches your latest work.

The **Only permitted users can view** note in the dialog is a property of Copilot Managed Runtime: everyone who opens the app signs in with their Microsoft work account, and only people the app is shared with can use it.

Publishing always runs under the Microsoft identity of the account that created the project's connection.

## Share your app with colleagues

Colleagues open your app at its URL and sign in with their Microsoft work account. Published apps also appear in Microsoft's Copilot Managed Runtime app portal, where people in your organization can find, open, and share them.

Sharing controls for the published app live on the Microsoft side, not in Lovable. You manage who can open your app from the Copilot Managed Runtime app portal, the same way you would for any other app in your organization.

## Limitations

* Apps in Copilot Managed Runtime are for people inside your organization. There is no public or anonymous access.
* Publishing is tied to the Microsoft work account that created the project's connection. Colleagues who want to publish their own projects connect their own Microsoft work accounts.
* Apps in Copilot Managed Runtime do not use Lovable's built-in backend. Databases, secrets, and backend functions are not part of an app in Copilot Managed Runtime. Your app works with data through Microsoft connectors instead.
* Removing a published app happens in Microsoft's admin tools, not in Lovable. Ask your IT team to remove an app you no longer want available.

## FAQ

> **Where does my app's data live?**
>
> In your organization's Microsoft Entra tenant. Your app reaches data through Microsoft connectors under each user's own sign-in. Data handled by your published app does not flow through Lovable.

> **Is this an app user connector?**
>
> No. People using your published app sign in through Microsoft, not through Lovable. The Microsoft Copilot Managed Runtime connection is only used while building and publishing. For connectors where each app user signs in with their own account through Lovable, see [App user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md).

> **Can people outside my organization use my app?**
>
> No. Apps in Copilot Managed Runtime require a Microsoft work sign-in from your organization's tenant. For a public app or website, use regular Lovable publishing instead.

> **Can my teammates work on the project with me?**
>
> Yes. Share the connection with them under **Sharing**, then share the project with them. Publishing always runs under the Microsoft identity of the account that created the connection.

> **Which plans include Microsoft Copilot Managed Runtime?**
>
> Business and Enterprise. The connector is rolling out gradually on these plans, so it may not be available in your workspace yet. On both plans, workspace admins and owners can create connections by default. Some Enterprise workspaces start with the connector disabled until a workspace admin or owner enables it under [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

> **What does my app cost to run?**
>
> Your Lovable plan covers building the app. Running the published app uses your organization's Microsoft licensing. Check with your IT team about which Microsoft licenses your app's users need.

## Troubleshooting

> **Couldn't connect to Microsoft**
>
> Your Microsoft sign-in or the connection to your environment failed. Check that you signed in with your work account, not a personal one, and select **Try again**. If it keeps failing, your IT team may not have completed the [tenant setup](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md).

> **Setup failed**
>
> Lovable could not prepare an app in your Microsoft Entra tenant. Check that your Microsoft work account is allowed to create an environment, then select **Try again** in the publish dialog. If your organization restricts environment creation, ask your IT team for an environment ID and add it to your connection.

> **My sign-in fails when I try to connect**
>
> Your IT team most likely has not added Lovable to your Microsoft tenant yet. This is a one-time setup step an admin must complete. Point them to [Set up your Microsoft tenant for Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md).

> **Lovable found more than one Microsoft connection**
>
> A project needs exactly one linked Microsoft connection. Ask Lovable in the project chat to list the project's Microsoft connections and disconnect the extras.

> **I can't find the Microsoft Copilot Managed Runtime connector**
>
> The connector is available on Business and Enterprise plans only. It is rolling out gradually, so it may not be available in your workspace yet. If your workspace has it, the connector's [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) setting is the next thing to check. Some Enterprise workspaces start with the connector disabled. Ask an admin or owner to check the setting.

> **The preview does not load**
>
> The preview runs inside the Copilot Managed Runtime host and needs to reach Microsoft domains. Corporate proxies that inspect traffic or browser policies that block embedded content can stop it silently. Ask your IT team to verify the [network requirements](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md#network-requirements).


## Related topics

- [Set up your Microsoft tenant for Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
- [Build secrets](https://docs.lovable.dev/features/build-secrets.md)
- [Connect your app to Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md)
