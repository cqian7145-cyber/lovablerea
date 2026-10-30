# Connect your app to Scrive for e-signatures and eID
<!-- source: https://docs.lovable.dev/integrations/scrive.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Scrive for e-signatures and eID

> Connect your app to Scrive to send documents for e-signature with Scrive eSign, or verify user identities with BankID, MitID, and other eIDs through eID Hub.

[Scrive](https://www.scrive.com/) is a European provider of electronic signatures and electronic identification (eID). The Scrive connector lets your Lovable app work with two Scrive products:

* **Scrive eSign**: create documents, send them for signature, and track their signing status, including multi-party Flow signing workflows.
* **Scrive eID Hub**: verify who your app's users are, or have them sign, with national eIDs such as Swedish BankID, Danish MitID, Norwegian BankID, Freja, Smart-ID, and itsme.

Each connection uses one of the two products. To use both, create one connection for each.

Scrive is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

## Common use cases and example apps

These examples show what you can build with Scrive, each with a prompt to start from.

| Example app | Scrive product | Example prompt |
| :- | :- | :- |
| **Contract sending portal** | eSign | *Use Scrive and build a page where our sales team uploads a contract PDF, adds the customer as a signatory, and sends it for signature. Show each contract's signing status in a table.* |
| **Onboarding with signed agreements** | eSign | *Use Scrive and add a step to our customer onboarding where the new customer signs our terms of service before their account is activated.* |
| **Identity-verified sign-up** | eID Hub | *Use Scrive eID Hub and add Swedish BankID verification to our sign-up flow, so we store the user's verified name and personal number.* |
| **Strong authentication for sensitive actions** | eID Hub | *Use Scrive eID Hub and require users to verify with MitID before they can change their payout bank account.* |

## How to connect Scrive

Who can create Scrive connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

### Prerequisites

Before connecting Scrive, make sure you have:

* For **Scrive eSign**: a Scrive account with access to eSign.
* For **Scrive eID Hub**: an eID Hub API token issued by Scrive for your company. Scrive sets up eID Hub accounts and issues tokens, so [contact Scrive](https://www.scrive.com/contact-sales) if you don't have one. Tokens are issued per environment: testbed first, then production after Scrive has validated your integration.
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients)).

> [!NOTE]
>
> Signatures and eID transactions your app makes through this connector are billed by Scrive under your Scrive agreement, not by Lovable. See [Scrive's pricing page](https://www.scrive.com/pricing).

### Set up your Scrive connection

The setup depends on which Scrive product the connection uses. Scrive eSign connects with your Scrive account, and Scrive eID Hub connects with your company's API token.

**Scrive eSign**

**1. Open Scrive in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Scrive**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Select Scrive eSign and choose scopes**

Under **Configure connection**, select **Scrive eSign**. The **Scopes** list shows the permissions Lovable requests from your Scrive account:

* **Read documents** (`doc:check`): list documents and read signing status. Required.
* **Keep connected** (`offline_access`): refresh access when the access token expires. Required.
* **Create documents** (`doc:create`): upload PDFs and update documents and signatories.
* **Send documents** (`doc:send`): start signing processes.
* **Full account access** (`full`): required for Scrive Flow, the multi-document signing workflows. Clear it if your app only works with single eSign documents.

All scopes are selected by default. Clear the ones your app does not need. For example, an app that only shows signing status needs the two required scopes.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Scrive and authorize**

Click **Connect**. The Scrive authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to Scrive if prompted, review the requested permissions, and authorize the app.

You'll be redirected back to Lovable with a confirmation.

> [!WARNING]
>
> Documents your app sends through this connector are real signing requests from your Scrive account, and signatories receive them. Only link the connection to projects that should be able to send documents, and test with your own email address first.

**Scrive eID Hub**

**1. Open Scrive in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Scrive**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Select Scrive eID Hub and enter your token**

Under **Configure connection**, select **Scrive eID Hub**, then:

1. **Environment**: choose the environment your token belongs to. The default is **Production**. Scrive issues each eID Hub token for one environment, so a testbed token does not work with **Production**, and the other way around.
2. **eID Hub API token**: paste the company API token Scrive issued for eID Hub.

Treat the token like a password. Anyone with it can create eID transactions for your company.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect**. Lovable verifies the token against Scrive eID Hub before saving the connection. If the token or the **Environment** is wrong, Lovable shows an error and does not save the connection.

> [!TIP]
>
> Build and test against the testbed environment with a testbed token, then create a separate connection with your production token when Scrive has approved your integration.

When connected, anyone building in a project can ask Lovable in chat to link their project to Scrive (based on configured connection-level access). Your Lovable apps can then send documents for signature or verify users with eIDs, depending on the product the connection uses.

## How eID verification works

Scrive eID Hub verifies a user in a transaction. Your app creates the transaction with the eID provider and whether the user should authenticate or sign, sends the user to Scrive's hosted eID page, and reads the verified result (such as the user's name and personal number) when the user comes back. A transaction ends as either complete or failed.

Not every eID supports both authentication and signing. For example, MitID, iDIN, and OneID support authentication only. For the full list of eIDs and what each supports, see [Scrive's eID provider guide](https://identity-docs.scrive.com/guides/providers/).

## Limitations

The Scrive connector cannot:

* Connect a Scrive eSign testbed account. Scrive eSign connections use Scrive's production service, so test documents are real signing requests.
* Support per-end-user Scrive login. Each Scrive eSign connection represents a single Scrive account shared across all projects linked to it.

## Manage your Scrive connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Scrive**, then open the connection.

* **Unlink projects** to remove Scrive access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Scrive stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Lexware](https://docs.lovable.dev/integrations/lexware.md)
- [Connect your app to Zendesk](https://docs.lovable.dev/integrations/zendesk.md)
- [Connect your app to GatewayAPI](https://docs.lovable.dev/integrations/gatewayapi.md)
