# Connect your app to Azure Cloud API
<!-- source: https://docs.lovable.dev/integrations/azure.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Azure Cloud API

> Connect your app to Azure Cloud API to inventory and manage Azure resources, inspect role assignments, and build cost and activity dashboards from your Lovable app.

[Microsoft Azure](https://azure.microsoft.com/) is Microsoft's cloud platform. The Azure Cloud API connector lets your Lovable app call [Azure Resource Manager](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview) as a Microsoft Entra service principal, so the app can inventory and manage the resources in your subscriptions, inspect who has access to them, and report on cost and activity. It's designed for internal tools and dashboards that read or administer an Azure subscription you control.

Azure Cloud API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in Chats, in the project chat while you build, and in your published apps.

With Azure Cloud API, your app can:

* List subscriptions, resource groups, and resources, with their types, locations, and tags
* Query Cost Management for spend by service, resource group, or day
* Read Activity Log events to see who changed what in a subscription
* Inspect Azure role assignments
* Create, change, or delete resources when you ask for it, within the roles assigned to the service principal

> [!NOTE]
>
> This is a connector for apps you build with Lovable. It integrates your app with your Azure subscriptions. It does not deploy or host your Lovable app on Azure. To publish a Lovable app, use Lovable's own [publish flow](https://docs.lovable.dev/features/publish.md).

> [!TIP]
>
> To work with your organization's Microsoft Entra directory or Microsoft 365 data, such as users, groups, mailboxes, and SharePoint sites, use [Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md), which connects with the same kind of service principal. For Fabric data, use [Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md), and for Power BI semantic models, use [Power BI](https://docs.lovable.dev/integrations/power-bi.md).

## Common use cases and example apps

These examples show what you can build with Azure Cloud API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Azure cost dashboard | *Use Azure Cloud API and build a dashboard of this month's Azure spend grouped by service, with a daily trend.* | **Keep cloud spend visible to the people who create it.** The app queries Cost Management for the subscription and charts cost by service and by day. |
| Resource inventory | *Use Azure Cloud API and build a resource inventory for a selected subscription, grouped by resource group, with type, location, and tags.* | **Know what is running in your subscription at a glance.** The app lists resources through Azure Resource Manager and groups them by resource group. |
| Access and activity review | *Use Azure Cloud API and build a page that shows the role assignments on our production subscription and the last seven days of Activity Log changes.* | **Audit who can do what, and who did what.** The app reads role assignments and Activity Log events for the subscription and shows them side by side. |
| Tag compliance report | *Use Azure Cloud API and build a report of the resources in our subscription that are missing the owner or cost-center tag.* | **Find resources nobody owns.** The app lists resources through Azure Resource Manager and flags the ones without the required tags. |
| Test environment cleanup | *Use Azure Cloud API and build an internal tool that lists our resource groups tagged as test environments and lets me delete a selected one after confirmation.* | **Retire test environments without opening the portal.** The app lists the matching resource groups and deletes the one you pick only after an in-app confirmation step. |

## How Azure Cloud API connections work

The connector authenticates as a Microsoft Entra **service principal**: an application identity you register in your tenant and give a client secret. Each connection uses the tenant ID, client ID, and client secret of one service principal, and multiple projects in the workspace can share it. Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) exchanges the secret for an access token, refreshes the token in the background, and forwards each request to Azure Resource Manager, so the secret and the token stay on the server and are not exposed to your published app.

The connector does not restrict which operations a connection can perform, and it does not distinguish reads from writes. Azure role-based access control (RBAC), the roles assigned to the service principal at the subscription, resource group, or resource scope, is the only control. Whatever the service principal may do, apps built on the connection can do. Grant the narrowest roles that cover your app, and make them read-only where possible.

Connecting verifies the credentials but not the access. Lovable only confirms that Microsoft Entra issues an access token for Azure Resource Manager, so a connection can verify and still receive `403` responses until the role assignments exist. See [Troubleshooting](#troubleshooting).

Azure Cloud API reaches Azure Resource Manager only. To work with your Microsoft Entra directory or Microsoft 365 data through Microsoft Graph, create a separate [Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md) connection. The same app registration can back both connections, but a rotated secret must then be updated in both. Prefer a dedicated service principal per connector when the permissions or environments differ.

When you build with the connection in the project chat, Lovable works this way:

* Lovable builds read-only features by default and adds calls that create, change, or delete resources or role assignments only when you ask for them by name.
* Before generating code for a call that changes your subscription, Lovable states the exact target and the change and asks you to confirm. For destructive, privilege-changing, cost-incurring, or credential-related operations, Lovable also explains what else the change affects and whether it can be undone, and asks a second time.
* Lovable builds resource creation as a single action that you confirm, rather than a loop, schedule, or per-user trigger.
* Lovable keeps every call server-side and does not place the tenant ID, client ID, client secret, or access token in frontend code or chat. Secrets a call returns, such as storage account keys, stay on the server too.
* When Azure denies a call, Lovable tells you which role to grant instead of retrying.

These rules cover the code Lovable writes for your app. When Lovable uses the connection directly from the project chat to make a change, it pauses on an approval card first. Your **Agent approval for this connection** setting applies to you and that connection and controls whether Lovable keeps asking. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat).

## How to connect Azure Cloud API

Who can create Azure Cloud API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Azure Cloud API connections using different service principals, which is useful for separating tenants, subscriptions, or environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Azure Cloud API, make sure you have:

* A Microsoft Entra tenant in which you or an administrator can register an application and create a client secret
* An Azure subscription in which you or an administrator can assign roles
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!WARNING]
>
> API actions can create or change cloud resources and incur costs, and you are responsible for all of them. Microsoft bills your Azure subscription directly for everything your app uses or creates, not Lovable. Set an [Azure budget](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets) with an alert before you connect, verify what Lovable builds, and confirm that cleanup and teardown succeed.

### Step 1: Create a service principal in Microsoft Entra

The connection authenticates as an application you register in your tenant. Register a dedicated application for Lovable, or reuse one you already have, and create a client secret for it. Registering an application also creates its service principal in your tenant.

**1. Register an application**

Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/), go to **Entra ID → App registrations**, and select **New registration**. Give the application a name such as `lovable-app`, keep the default supported account type (**Single tenant only**, followed by your tenant name), leave the redirect URI empty, and click **Register**. See Microsoft's guide: [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

**2. Note the tenant and client IDs**

On the application's **Overview** page, copy the **Directory (tenant) ID** and the **Application (client) ID**. You enter both in Lovable in Step 3.

**3. Create a client secret**

Go to **Certificates & secrets → Client secrets → New client secret**, add a description, choose an expiry, and click **Add**. Copy the secret's **Value** immediately and store it securely, because Microsoft does not display it again after you leave the page. Do not copy the **Secret ID**, which is not the secret. See Microsoft's guide: [Add credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials).

> [!WARNING]
>
> The client secret functions like a password. Store it securely and never commit it to a repository or share it publicly. Note the expiry you chose: when the secret expires, the connection stops working until you create a new secret and update the connection in Lovable.

### Step 2: Assign Azure roles to the service principal

Registering an application grants it nothing. Azure Cloud API is authorized by Azure RBAC, so assign the service principal a role at the narrowest scope that covers your app.

**1. Open the scope**

In the [Azure portal](https://portal.azure.com/), open the subscription, resource group, or resource your app works with, and select **Access control (IAM)**.

**2. Choose a role**

Select **Add → Add role assignment**. On the **Role** tab, pick the least-privileged [built-in role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles) that covers your app: **Reader** for inventory and Activity Log reads, **Cost Management Reader** for cost dashboards, or a resource-specific contributor role only when the app must change resources. Avoid **Owner** and **User Access Administrator**, because a service principal that can assign roles can grant itself more access.

**3. Assign it to the service principal**

On the **Members** tab, select **User, group, or service principal**, click **Select members**, search for the application by the name you registered, and select it. Click **Review + assign** to finish. See Microsoft's guide: [Assign Azure roles using the Azure portal](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal).

### Step 3: Connect Azure Cloud API to Lovable

With the role assigned, create the connection in Lovable.

**1. Open Azure Cloud API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Azure Cloud API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors). The connector page shows a **Use responsibly** notice about the cost and resource impact of API actions.

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **Microsoft Entra Tenant ID**: the **Directory (tenant) ID** from Step 1.
2. **Service Principal Client ID**: the **Application (client) ID** from Step 1, not the object ID.
3. **Client Secret**: the secret **Value** from Step 1.

Both IDs are 36-character identifiers with hyphens, and Lovable rejects any other format.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone you share the connection with can build features that use the full access of the service principal.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials before saving the connection by requesting an access token from Microsoft Entra for Azure Resource Manager. The check confirms the tenant ID, client ID, and client secret, and nothing about roles. If verification fails, see [Troubleshooting](#troubleshooting).

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Azure Cloud API (based on configured connection-level access). Your Lovable apps can then call Azure Resource Manager through the connector gateway, within the roles assigned to the service principal.

## Limitations

The Azure Cloud API connector cannot:

* Restrict a connection to read-only operations or to specific Azure services from inside Lovable. Azure RBAC is the only control over what apps built on a connection can do.
* Authenticate with a certificate, a managed identity, or a federated credential. The connection needs a client secret.
* Reach national clouds such as Azure Government or Azure operated by 21Vianet. The connection uses the global Azure Resource Manager endpoint.
* Call Microsoft Graph. Use a separate [Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md) connection for your Microsoft Entra directory and Microsoft 365 data.
* Receive events from Azure, such as Azure Event Grid events or Activity Log alerts. The connection only makes outbound calls.
* Support per-end-user Azure login. Each connection represents a single service principal shared across all projects linked to it.

If the client secret expires or you delete it in Microsoft Entra, open the connection, enter the new **Client Secret** under **Configure connection**, and click **Update**. Lovable verifies the new secret with Microsoft Entra before saving it. The tenant ID and client ID stay the same.

## Troubleshooting

Use these checks when connecting fails or an Azure request returns an unexpected status.

> **Connect failed: Microsoft Entra could not issue an Azure Resource Manager access token**
>
> Lovable requests a token from Microsoft Entra when you click **Connect**, and the error ends with Microsoft's own error code. The common causes:
>
> * **Tenant not found** (`AADSTS90002`): the **Microsoft Entra Tenant ID** is wrong. Copy the **Directory (tenant) ID** from the application's **Overview** page, not a domain name or another tenant's ID.
> * **Application not found in the directory** (`AADSTS700016`): the **Service Principal Client ID** is wrong, or the application is registered in a different tenant than the one you entered. Use the **Application (client) ID**, not the **Object ID**.
> * **Invalid client secret** (`AADSTS7000215`): the **Client Secret** does not match the application. The usual cause is pasting the **Secret ID** instead of the secret **Value**. Create a new secret and paste its value.
> * **Client secret expired** (`AADSTS7000222`): the secret's expiry has passed. Create a new secret under **Certificates & secrets** and update the connection.
> * **Application disabled** (`AADSTS7000112`): the application or its service principal is disabled in your tenant. Re-enable it in Microsoft Entra, or register a new application.
>
> Microsoft documents every code in its [authentication error codes reference](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes).

> **A request returned 403 AuthorizationFailed after connecting**
>
> Connecting verifies the credentials and grants nothing. A `403` with `AuthorizationFailed` means no role assignment at the requested scope allows the operation. Add a role assignment under **Access control (IAM)** on the subscription, resource group, or resource. Role assignment changes can take up to 10 minutes to take effect.
>
> Azure evaluates access on every request, so you do not need to reconnect. When this happens in the project chat, Lovable names the missing role.

> **A request returned 429 Too Many Requests**
>
> The connector gateway applies its [general per-project limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors) and returns `429` with a `Retry-After` header before the request reaches Azure. Azure Resource Manager also throttles independently and returns its own `Retry-After` header. See [Azure Resource Manager request limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
>
> Ask Lovable to cache reads, poll on demand rather than on a frequent fixed timer, and retry throttled calls with increasing delays.

## Manage your Azure Cloud API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Azure Cloud API**, then open the connection.

* **Unlink projects** to remove Azure Cloud API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Azure Cloud API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Azure Graph & Entra API](https://docs.lovable.dev/integrations/azure-graph.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Cloudflare API](https://docs.lovable.dev/integrations/cloudflare-api.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to Firebase Cloud Messaging](https://docs.lovable.dev/integrations/firebase-cloud-messaging.md)
