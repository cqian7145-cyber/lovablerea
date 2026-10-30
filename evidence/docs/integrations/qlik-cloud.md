# Connect your app to Qlik Cloud
<!-- source: https://docs.lovable.dev/integrations/qlik-cloud.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Qlik Cloud

> Connect your app to Qlik Cloud to browse your Qlik Sense apps, export report data, ask Insight Advisor questions, and trigger reloads from your Lovable app.

[Qlik Cloud](https://www.qlik.com/us/products/qlik-cloud-analytics) is Qlik's analytics platform, where Qlik apps hold your data models, sheets, and charts. The Qlik Cloud connector lets your Lovable app read the catalog of Qlik apps and data models in your tenant, export chart and table data through Qlik's Reporting service, ask Insight Advisor questions in plain language, and trigger Qlik app reloads.

Qlik Cloud is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Qlik Cloud, your app can:

* List the Qlik apps and spaces in your tenant, and read each Qlik app's tables and fields
* Export a chart or table as an Excel file, or a whole sheet as a PDF, through Qlik's Reporting service
* Ask Insight Advisor a question about a Qlik app and show the narrative answer and any chart it returns
* Start a reload of a Qlik app and follow its reload history

Use Qlik Cloud when your app needs the Qlik apps and data your analytics team already maintains. Your app cannot query Qlik data live. It gets rows of data as exported Excel files, so the connector suits reporting, export, and catalog tools.

## Common use cases and example apps

You can use Qlik Cloud to build internal reporting and operations tools such as these.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Qlik app catalog explorer** | *Use Qlik Cloud and build a catalog explorer that lists my Qlik apps and shows each app's tables and fields.* | **Give your team one place to see what exists in Qlik.** The app lists the Qlik apps in your tenant and reads each Qlik app's data model. |
| **On-demand report export** | *Use Qlik Cloud and build a page that exports the sales table from my Qlik app to Excel on demand and shows download history.* | **Give your team Excel exports without opening Qlik.** The app submits a report request, waits for Qlik to produce the file, and offers it for download. |
| **Insight Advisor Q\&A page** | *Use Qlik Cloud and build a Q\&A page where I type a question and see the answer from my Qlik app.* | **Answer metric questions in plain language.** The app sends each question to Insight Advisor and shows the narrative and any chart it returns. |
| **Reload status board** | *Use Qlik Cloud and build a reload status page for my Qlik apps with a button to trigger a reload.* | **Track data freshness and refresh on demand.** The app reads each Qlik app's last reload and reload history and starts a new reload when you click the button. |
| **Weekly sheet digest** | *Use Qlik Cloud and build a page that exports our KPI sheet as a PDF every Monday and keeps the last eight copies.* | **Keep a dated archive of a key sheet.** The app exports the sheet as a PDF on a schedule and stores the files. |
| **Space inventory** | *Use Qlik Cloud and build an inventory of our Qlik spaces showing which apps live in each and when they were last reloaded.* | **See how your tenant is organized.** The app groups Qlik apps by space and shows each Qlik app's owner and last reload time. |

## How Qlik Cloud connections work

Lovable calls Qlik Cloud through its [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors), which stores your credentials securely and refreshes access tokens automatically. Your app does not need Qlik credentials in its code.

Every call runs as the machine-to-machine OAuth client you create in your tenant. Qlik runs every machine-to-machine client with the privileges of the Tenant Admin role, so everyone using the connection can read every shared space in your tenant, including through a published app. Space membership does not limit what the connection can read. The connector does not sign each app user in to Qlik separately.

The gateway forwards every read to your tenant. It forwards only three kinds of write: creating a report export, starting a reload, and asking Insight Advisor a question. Any other write, such as changing users, spaces, or OAuth clients, is refused, so tenant administration stays in Qlik.

In the project chat, Lovable asks for your approval before each of these three writes. This includes report exports and Insight Advisor questions, which do not change your Qlik data. Lovable runs other reads without asking. If you select **Always allow**, Lovable also starts reloads on that connection without asking. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval.

> [!WARNING]
>
> A Qlik Cloud connection can read every Qlik app in every shared space of your tenant, plus the tenant's user directory, and you cannot narrow that in Qlik. Share the connection only with people who may see all of that data. Give the client the `user_default` scope only, and avoid the `admin_classic` scope, which also opens Qlik's administration APIs to your app.

## How to connect Qlik Cloud

Who can create Qlik Cloud connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Qlik Cloud connections using different OAuth clients, which is useful for connecting more than one Qlik tenant.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Qlik Cloud, make sure you have:

* A Qlik Cloud tenant at a `*.qlikcloud.com` hostname, for example `yourtenant.us.qlikcloud.com`. The connector does not accept other hosts, such as Qlik Cloud Government tenants or on-premises Qlik Sense
* A Qlik tenant admin to create the OAuth client. Creating OAuth clients requires the Tenant Admin role
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Your Qlik Cloud subscription, capacity, and any Reporting service entitlement are separate from Lovable billing. Qlik limits report generation to about 10 requests per minute and expires generated files after one hour, so store an export if your app needs it later.

### Step 1: Create a machine-to-machine OAuth client in Qlik Cloud

Ask your Qlik tenant admin to complete these steps. The client acts as a service user with Tenant Admin privileges in your tenant, so treat its secret like an admin password.

**1. Open the OAuth clients page**

Sign in to your Qlik Cloud tenant, open the **Administration** activity center, and go to **OAuth** under **Integration**. See Qlik's guide to [creating OAuth clients](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-create-oauth-client.htm).

**2. Create the client**

Click **Create new**. Choose the **Web** client type, enter a name such as `Lovable connector`, select the `user_default` scope, and enable **Allow Machine-to-Machine (M2M)**. Keep **Authentication method** set to **Client secret**, then save.

**3. Copy the client ID and secret**

Qlik shows the client secret only once, when the client is created. Copy the client ID and the client secret.

> [!WARNING]
>
> The client secret functions like a password. Store it securely, and paste it only into the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

**4. Set the consent method to Trusted**

In the OAuth clients list, open the new client's menu, select **Change consent method**, and select **Trusted**. Qlik only offers this change after the client is created.

A client whose consent method is not **Trusted** cannot issue tokens for machine-to-machine access, and **Connect** in Lovable fails with `Qlik Cloud did not validate your credentials.`

**5. Find your tenant hostname**

In Qlik Cloud, click your profile icon and select **About**. Copy the value under **Tenant hostname**, for example `yourtenant.us.qlikcloud.com`. If your tenant also has an alias hostname, use the tenant hostname anyway. Qlik never changes it and asks integrations to use it.

### Step 2: Connect Qlik Cloud to Lovable

Open the connection form and enter the values from Step 1.

**1. Open Qlik Cloud in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Qlik Cloud**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change (for example, to `Qlik Cloud Sales`). The name is only used inside Lovable to identify the connection.

**4. Enter your credentials**

Under **Configure connection**:

* **Tenant hostname**: the bare hostname from Step 1, for example `yourtenant.us.qlikcloud.com`. The form rejects a value that includes `https://` or a path
* **Client ID**: the client ID of the machine-to-machine OAuth client from Step 1
* **Client secret**: the client secret issued alongside the client ID

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone with access reads Qlik as the same service user. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials by requesting a token from your tenant and reading the client's own user record.

> [!NOTE]
>
> After linking the connection to a project, ask Lovable to list the available Qlik apps.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Qlik Cloud (based on configured connection-level access). Your Lovable apps can then list your Qlik apps and data models, export report data, ask Insight Advisor questions, and start reloads while you build and after you publish.

If the client secret changes, open the connection in Lovable and click **Update** under **Configure connection** to replace it.

## Limitations

Keep these limits in mind when building with Qlik Cloud.

* **Supported hosts.** The tenant hostname must end in `.qlikcloud.com`. The connector rejects other hosts, including Qlik Cloud Government and on-premises Qlik Sense, with the error `Must be a bare *.qlikcloud.com hostname (no https:// or path)`.
* **No live queries.** Your app cannot query Qlik data live, for example to filter a table or recalculate a total. To get rows of data, your app exports them as an Excel file. Qlik takes a few seconds to make each file.
* **No list of sheets or charts.** The connector cannot list the sheets and charts in a Qlik app. To export one, give Lovable its ID. Qlik shows the ID in the chart's **Share → Embed** dialog and in the sheet's **Embed sheet** dialog.
* **Three kinds of write only.** Your app can create report exports, start reloads, and ask Insight Advisor questions. It cannot create or change Qlik apps, spaces, users, or other tenant settings through the connection.
* **Shared identity with tenant-wide reach.** Everyone using the connection reads Qlik as the same service user, which sees every shared space in the tenant. The connector does not support per-user Qlik sign-in or restrict data for each app user.
* **No Insight Advisor on Qlik Answers tenants.** Qlik disables Insight Advisor, including in integrations, on tenants that use the Qlik Answers agentic experience. Build a Q\&A page only on a tenant that still uses Insight Advisor. Qlik has no public API for asking Qlik Answers about your Qlik apps, so the connector cannot use Qlik Answers instead.
* **No embedded Qlik sheets.** This setup returns catalog data, exported files, and Insight Advisor answers for your app's own interface. It does not embed Qlik sheets or charts in your app.

## Manage your Qlik Cloud connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Qlik Cloud**, then open the connection.

* **Unlink projects** to remove Qlik Cloud access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Qlik Cloud stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Firebase Cloud Messaging](https://docs.lovable.dev/integrations/firebase-cloud-messaging.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to Cube](https://docs.lovable.dev/integrations/cube.md)
- [Connect your app to Metabase](https://docs.lovable.dev/integrations/metabase.md)
