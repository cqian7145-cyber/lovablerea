# Connect your app to Azure Graph & Entra API
<!-- source: https://docs.lovable.dev/integrations/azure-graph.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Azure Graph & Entra API

> Connect your app to Azure Graph & Entra API to read and administer your organization's Microsoft Entra directory and Microsoft 365 data through Microsoft Graph, without a signed-in user.

[Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview) is the API for Microsoft 365 and [Microsoft Entra](https://learn.microsoft.com/en-us/entra/fundamentals/whatis), the identity service behind Microsoft 365 and Azure. The Azure Graph & Entra API connector lets your Lovable app call Microsoft Graph as a Microsoft Entra service principal with application permissions, so the app works with your whole organization's directory and Microsoft 365 data without a signed-in user. It's designed for internal tools and dashboards that read or administer a Microsoft tenant you control.

Azure Graph & Entra API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in Chats, in the project chat while you build, and in your published apps.

With Azure Graph & Entra API, your app can:

* List the users and groups in your Microsoft Entra directory, including account status and group membership
* Search SharePoint sites and browse a site's document libraries
* Read organization mailboxes and calendars
* Manage app registrations and their credentials
* Automate other Microsoft 365 and Microsoft Entra administration, such as Teams, Intune devices, and reports, through any Microsoft Graph endpoint that accepts application permissions

> [!NOTE]
>
> This is a connector for apps you build with Lovable. It integrates your app with your Microsoft tenant. It does not deploy or host your Lovable app on Azure. To publish a Lovable app, use Lovable's own [publish flow](https://docs.lovable.dev/features/publish.md).

> [!TIP]
>
> To work with one signed-in user's mailbox, files, or Teams rather than your whole organization, use the [Microsoft 365 connectors](https://docs.lovable.dev/integrations/microsoft.md), which connect with a Microsoft account. To inventory and manage Azure subscriptions, resources, and costs, use [Azure Cloud API](https://docs.lovable.dev/integrations/azure.md).

## Common use cases and example apps

These examples show what you can build with Azure Graph & Entra API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Entra user directory | *Use Azure Graph & Entra API and build an admin panel that lists the users in our Microsoft Entra directory with their account status.* | **Review your directory without opening the Entra admin center.** The app reads users from Microsoft Graph and shows which accounts are enabled or disabled in a filterable table. |
| Group membership explorer | *Use Azure Graph & Entra API and build a page that lists our Entra groups and shows a group's members when I select it.* | **See who belongs to which group.** The app lists groups and loads the members of the selected group on demand. |
| SharePoint library browser | *Use Azure Graph & Entra API and build an internal tool that searches our SharePoint sites and lets me browse a selected site's document libraries.* | **Find documents across SharePoint from one place.** The app searches sites through Microsoft Graph and lists the libraries of the site you pick. |
| Shared mailbox triage board | *Use Azure Graph & Entra API and build a board that shows the unread messages in our support mailbox grouped by sender domain.* | **Watch a shared mailbox without giving everyone Outlook access.** The app reads the mailbox through Microsoft Graph and groups messages by sender for triage. |
| App credential expiry report | *Use Azure Graph & Entra API and build a report of our app registrations whose client secrets or certificates expire in the next 30 days.* | **Catch expiring credentials before they break an integration.** The app reads app registrations with their credential expiry dates and highlights the ones due for rotation. |
| Managed device inventory | *Use Azure Graph & Entra API and build a dashboard of our Intune managed devices with operating system, compliance state, and last check-in.* | **Know which devices are compliant at a glance.** The app reads managed devices from Microsoft Graph and flags the ones out of compliance. |

## How Azure Graph & Entra API connections work

The connector authenticates as a Microsoft Entra **service principal**: an application identity you register in your tenant and give a client secret. Each connection uses the tenant ID, client ID, and client secret of one service principal, and multiple projects in the workspace can share it. Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) exchanges the secret for a Microsoft Graph access token, refreshes the token in the background, and forwards each request to Microsoft Graph, so the secret and the token stay on the server and are not exposed to your published app.

The connection has no signed-in user. Microsoft Graph authorizes it through **application permissions**, which apply to your whole organization and take effect only after an administrator consents. Endpoints that only work for a signed-in user, such as `/me`, are unavailable, so your app addresses tenant resources explicitly, for example a user or a site by its ID.

The connector does not restrict which Microsoft Graph endpoints a connection can call, and it does not distinguish reads from writes. The application permissions an administrator has consented to, together with any directory roles assigned to the service principal, are the only control. Whatever the service principal may do, apps built on the connection can do. Grant the narrowest permissions that cover your app, and prefer read permissions over their `ReadWrite` counterparts.

Connecting verifies the credentials but not the access. Lovable only confirms that Microsoft Entra issues a Microsoft Graph access token for the service principal, so a connection can verify and still receive `403` responses until the application permissions exist and an administrator has consented. See [Troubleshooting](#troubleshooting).

Azure Graph & Entra API reaches Microsoft Graph only. To call Azure Resource Manager for subscriptions, resources, and costs, create a separate [Azure Cloud API](https://docs.lovable.dev/integrations/azure.md) connection. The same app registration can back both connections, but a rotated secret must then be updated in both. Prefer a dedicated service principal per connector when the permissions or environments differ.

When you build with the connection in the project chat, Lovable works this way:

* Lovable builds read-only features by default and adds calls that create, change, or delete directory objects, Microsoft 365 data, or app credentials only when you ask for them by name.
* Before generating code for a call that changes your tenant, Lovable states the exact target and the change and asks you to confirm. For destructive, privilege-changing, or credential-related operations, Lovable also explains what else the change affects and whether it can be undone, and asks a second time.
* Lovable builds directory changes such as user creation as a single, bounded action that you confirm, rather than a loop, schedule, or per-signup trigger.
* Lovable keeps every call server-side and does not place the tenant ID, client ID, client secret, or access token in frontend code or chat. Credentials a call returns, such as a new client secret, stay on the server too.
* When Microsoft Graph denies a call, Lovable tells you which application permission or consent to grant instead of retrying.

These rules cover the code Lovable writes for your app. When Lovable uses the connection directly from the project chat to make a change, it pauses on an approval card first. Your **Agent approval for this connection** setting applies to you and that connection and controls whether Lovable keeps asking. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat).

## How to connect Azure Graph & Entra API

Who can create Azure Graph & Entra API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Azure Graph & Entra API connections using different service principals, which is useful for separating tenants or environments (for example, development and production), or for giving each app its own set of permissions.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Azure Graph & Entra API, make sure you have:

* A Microsoft Entra tenant in which you or an administrator can register an application and create a client secret
* An administrator with the **Privileged Role Administrator** or **Global Administrator** role, who can [grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent) for Microsoft Graph application permissions
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!WARNING]
>
> API actions can create, change, or delete users, groups, mailboxes, files, and app credentials across your whole organization, and you are responsible for all of them. Most Microsoft Graph calls are covered by your Microsoft 365 and Microsoft Entra licenses, and Microsoft bills its [metered Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/metered-api-overview) to your Azure subscription directly, not Lovable. Verify what Lovable builds before you share it with your organization.

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

### Step 2: Grant Microsoft Graph application permissions

Registering an application grants it nothing. Add the Microsoft Graph application permissions your app needs, then have an administrator consent to them for your tenant.

**1. Add application permissions**

In the application's registration, go to **API permissions**, select **Add a permission → Microsoft Graph → Application permissions**, and select only the permissions your app needs. For example, `User.Read.All` lists users, `Group.Read.All` covers groups and their members, `Sites.Read.All` searches SharePoint, `Mail.Read` reads organization mailboxes, and `Application.Read.All` reads app registrations. Click **Add permissions**. Each endpoint in the [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference) documents the permissions it accepts.

> [!TIP]
>
> Prefer read permissions over their `ReadWrite` counterparts unless the app changes data, and avoid permissions that manage directory roles or other applications' credentials unless the app is a tenant administration tool you control. A service principal that can assign roles can grant itself more access.

**2. Grant admin consent**

Still under **API permissions**, click **Grant admin consent for** your tenant and confirm. The **Status** column confirms the grant for each permission. Consenting to Microsoft Graph application permissions requires the **Privileged Role Administrator** or **Global Administrator** role. Cloud Application Administrator and Application Administrator accounts can consent to other permissions but not to these, so ask an administrator with one of the two roles if the button is unavailable to you. See Microsoft's guide: [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent).

### Step 3: Connect Azure Graph & Entra API to Lovable

With the permissions granted, create the connection in Lovable.

**1. Open Azure Graph & Entra API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Azure Graph & Entra API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors). The connector page shows a **Use responsibly** notice about the impact of API actions.

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

Click **Connect** at the bottom of the form. Lovable verifies the credentials before saving the connection by requesting a Microsoft Graph access token from Microsoft Entra. The check confirms the tenant ID, client ID, and client secret, and nothing about application permissions or consent. If verification fails, see [Troubleshooting](#troubleshooting).

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Azure Graph & Entra API (based on configured connection-level access). Your Lovable apps can then call Microsoft Graph through the connector gateway, within the application permissions of the service principal.

## Limitations

The Azure Graph & Entra API connector cannot:

* Restrict a connection to read-only operations or to specific Microsoft Graph endpoints from inside Lovable. Microsoft Graph application permissions and directory roles are the only control over what apps built on a connection can do.
* Authenticate with a certificate, a managed identity, or a federated credential. The connection needs a client secret.
* Reach national clouds such as Microsoft 365 GCC High, Azure Government, or Azure operated by 21Vianet. The connection uses the global Microsoft Graph endpoint.
* Call Azure Resource Manager. Use a separate [Azure Cloud API](https://docs.lovable.dev/integrations/azure.md) connection for subscriptions, resources, and costs.
* Receive events from Microsoft, such as Microsoft Graph change notifications. The connection only makes outbound calls.
* Act as a signed-in user or support per-end-user Microsoft login. Each connection represents a single service principal shared across all projects linked to it, so Microsoft Graph endpoints that only support delegated permissions, such as `/me`, are unavailable. If you need each user of your app to sign in with their own Microsoft account, use the Microsoft [app user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md) for Microsoft 365 data.

If the client secret expires or you delete it in Microsoft Entra, open the connection, enter the new **Client Secret** under **Configure connection**, and click **Update**. Lovable verifies the new secret with Microsoft Entra before saving it. The tenant ID and client ID stay the same.

## Troubleshooting

Use these checks when connecting fails or a Microsoft Graph request returns an unexpected status.

> **Connect failed: Microsoft Entra could not issue a Microsoft Graph access token**
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

> **A request returned 403 after connecting**
>
> Connecting verifies the credentials and grants nothing. A `403` with `Authorization_RequestDenied` or an insufficient-privileges message means the application permission for that call is missing or an administrator has not consented to it. Add the permission under **API permissions** and grant admin consent. Some Microsoft 365 workloads add their own access policies on top of Microsoft Graph permissions, such as Exchange Online application access policies that limit which mailboxes an application can reach, and return the same `403`.
>
> Microsoft evaluates permissions on every request, so you do not need to reconnect. When this happens in the project chat, Lovable names the missing permission.

> **A request returned 429 Too Many Requests**
>
> The connector gateway applies its [general per-project limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors) and returns `429` with a `Retry-After` header before the request reaches Microsoft. Microsoft Graph also throttles independently per workload and returns its own `Retry-After` header. See [Microsoft Graph throttling](https://learn.microsoft.com/en-us/graph/throttling).
>
> Ask Lovable to cache reads, poll on demand rather than on a frequent fixed timer, and retry throttled calls with increasing delays.

## Manage your Azure Graph & Entra API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Azure Graph & Entra API**, then open the connection.

* **Unlink projects** to remove Azure Graph & Entra API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Azure Graph & Entra API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to Cloudflare API](https://docs.lovable.dev/integrations/cloudflare-api.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
