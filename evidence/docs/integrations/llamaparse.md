# Connect your app to LlamaParse Platform
<!-- source: https://docs.lovable.dev/integrations/llamaparse.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to LlamaParse Platform

> Connect your app to LlamaParse, LlamaIndex's document parsing and extraction platform, to parse documents, extract structured data, and search your document indexes from your Lovable app. Use Lovable's managed connection for parsing and extraction, or your own LlamaParse API key for the full LlamaParse API.

[LlamaIndex](https://www.llamaindex.ai/) builds LlamaParse (formerly LlamaCloud), a document understanding platform. The LlamaParse Platform connector lets your Lovable app parse documents, extract structured data from files, and run semantic retrieval over LlamaParse indexes. It's designed for apps whose users upload files that the app has to read at runtime.

LlamaParse Platform is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the chat while you build and in your published apps.

With LlamaParse, your app can:

* Parse PDFs, Office files, and other documents into markdown, text, or JSON
* Extract structured fields from documents against a JSON schema, for example the parties and dates in a contract
* Retrieve the most relevant passages from a LlamaParse index to power search and question answering

It's a good fit for document review tools, knowledge base assistants, and apps that automate data entry from files.

> [!TIP]
>
> Lovable parses documents you attach in the chat without a connector. Use the LlamaParse Platform connector when your app itself needs to parse, extract, or retrieve at runtime, for example when your app's users upload files.

## Two ways to connect

When adding a connection, you choose between two options. They differ in what your app can do, where your documents are processed, and who bills the usage.

| Capability | Managed by Lovable | Use your own credentials |
| :- | :- | :- |
| Parse documents | Yes | Yes |
| Extract structured data from documents | Yes | Yes |
| Retrieve from LlamaParse indexes | No | Yes |
| LlamaParse account and API key needed | No | Yes |
| Region | Europe | The region of your LlamaParse account, North America or Europe |
| Usage billed by | Lovable, through workspace credits | LlamaIndex, on your LlamaParse account |

A managed connection runs on credentials that Lovable provides, not on a LlamaParse account of your own, so it has no indexes to retrieve from and accepts parse and extract requests only. To search indexes you have built in LlamaParse, connect with your own credentials.

## Common use cases and example apps

These examples show what you can build with LlamaParse, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Contract review tool** | *Use LlamaParse and build a contract review tool where users upload PDFs and see key terms extracted.* | **Turn uploaded contracts into structured summaries.** The app parses each upload and extracts parties, dates, and obligations into a review dashboard. |
| **Knowledge base assistant** | *Use LlamaParse and build a support assistant that answers questions from our product docs.* | **Answer questions from your own documents.** The app runs semantic retrieval over a LlamaParse index and grounds each answer in the retrieved passages. Needs your own credentials. |
| **Invoice processing app** | *Use LlamaParse and build an invoice inbox that extracts vendor, amount, and due date from uploaded invoices.* | **Automate data entry from documents.** The app sends each invoice to LlamaParse extraction with a schema of the fields and writes the results to a table. |
| **Resume screening tool** | *Use LlamaParse and build a hiring tool that parses uploaded resumes and lists skills and experience.* | **Standardize unstructured applications.** The app parses each resume and extracts the fields recruiters filter on. |
| **Research library** | *Use LlamaParse and build a research library where users upload reports and search across them.* | **Make a document collection searchable.** The app parses uploads for display and retrieves the most relevant passages from a LlamaParse index for each search. Needs your own credentials. |
| **Internal policy Q\&A** | *Use LlamaParse and build an internal portal that answers policy questions from our employee handbook.* | **Give teams self-serve answers from official documents.** The app retrieves the relevant handbook sections from a LlamaParse index and shows them with each answer. Needs your own credentials. |

## How to connect LlamaParse Platform

Who can create LlamaParse Platform connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When adding a connection, you choose between two options:

* **Managed by Lovable**: Lovable provides and manages the credentials for you. Parsing and extraction only. Each job spends workspace credits.
* **Use your own credentials**: connect with your own LlamaParse API key for the full LlamaParse API, including retrieval from your indexes, and manage billing in LlamaParse.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in chat to link their project to it.

Follow the setup steps below for the option you want.

**Managed by Lovable**

Choose this option for the fastest setup. You don't need a LlamaParse account or API key. The managed connection supports document parsing and structured extraction, and it runs in LlamaParse's European region, so your documents are processed in Europe.

> [!NOTE]
>
> You can create one managed LlamaParse Platform connection per workspace. If one exists, the **Managed by Lovable** option is unavailable in the form until you delete it.

### Usage and billing

Lovable charges the LlamaParse credits each job consumes to the workspace that owns the project, at the rate in [Pricing](#pricing) below. LlamaParse reports a job's usage after the job finishes, so the charge appears on the connection's page with a delay. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for how usage-based credits work.

### Set up the managed connection

To create the managed connection:

**1. Open LlamaParse Platform in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **LlamaParse Platform**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Choose Managed by Lovable**

Under **Configure connection**, select **Managed by Lovable**. No credential fields appear for this option.

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Above the button, a usage note explains that connecting lets Lovable send data to LlamaParse and deduct Lovable credits, with links to LlamaParse's pricing and to Lovable's [provider rules](https://lovable.dev/provider-rules). Click **Connect**.

**Use your own credentials**

Choose this option to use the full LlamaParse API, including retrieval from indexes in your LlamaParse account, and to manage billing directly with LlamaIndex. The connection uses the region your LlamaParse account was created in, North America or Europe.

You can create multiple LlamaParse Platform connections using different API keys, which is useful for separating environments (for example, development and production).

### Prerequisites

Before connecting LlamaParse Platform with your own credentials, make sure you have:

* A LlamaParse account
* A LlamaParse API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All requests through this connection consume LlamaParse credits on your LlamaParse account. Billing is handled directly by LlamaIndex, not Lovable.

### Step 1: Get a LlamaParse API key

A LlamaParse API key lets your Lovable app authenticate with the LlamaParse API. Keys only work in the region of the account that created them.

To create a LlamaParse API key:

**1. Open LlamaParse**

Sign in to [LlamaParse](https://cloud.llamaindex.ai/) for a North America account, or to [LlamaParse Europe](https://cloud.eu.llamaindex.ai/) for a European account.

**2. Open API keys**

Click **API Key** in the left sidebar.

**3. Create a key**

Click **Generate New Key**, enter a descriptive name, for example `Lovable integration`, and click **Create new key**.

**4. Copy the key**

Copy the key immediately and store it securely. It starts with `llx-`, and LlamaParse does not show the full key again after you leave the page.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See LlamaParse documentation for more: [API key](https://developers.llamaindex.ai/llamaparse/general/api_key/).

### Step 2: Connect LlamaParse to Lovable

To connect LlamaParse Platform with your key:

**1. Open LlamaParse Platform in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **LlamaParse Platform**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change, for example to `LlamaParse Prod`. The name is only used inside Lovable to identify the connection.

**4. Choose your own credentials**

Under **Configure connection**, select **Use your own credentials**.

**5. Configure the connection**

Under **Configure connection**, enter:

1. **Region**: select **North America** or **Europe**, the region your LlamaParse account was created in. API keys only work in their own region. **North America** is selected by default.
2. **API key**: paste your LlamaParse API key (it starts with `llx-`). **Get value** next to the field opens LlamaParse's API key documentation.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the LlamaParse API before saving the connection. If LlamaParse rejects the key, check that the selected region matches your account and that you copied the key in full, because LlamaParse returns the same "Invalid API Key" error in both cases.

When connected, anyone building in a project can ask Lovable in chat to link their project to LlamaParse (based on configured connection-level access). Your Lovable apps can then parse documents, extract structured data, and, with your own credentials, retrieve from your LlamaParse indexes.

## Pricing

With **Managed by Lovable**, usage costs **5 Lovable credits per 1,000 LlamaParse credits**, or **2.5 Lovable credits on Business plans**.

LlamaParse credits measure what each job consumes. Parsing costs from 1 credit per page in the **Fast** tier to 45 in **Agentic Plus**, and extraction adds 5 to 50 credits per page depending on the tier. See [LlamaParse pricing](https://developers.llamaindex.ai/llamaparse/general/pricing/) for the full table. Lovable charges the workspace that owns the project, whether the job runs in the preview while you build or in your published app, and the usage appears under [Run credits](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs).

With **Use your own credentials**, LlamaIndex bills usage to your LlamaParse account, and Lovable credits do not apply.

## Limitations

The LlamaParse Platform connector cannot:

* Retrieve from LlamaParse indexes on a managed connection. Indexes live in a LlamaParse account, so retrieval needs a connection that uses your own credentials.
* Rotate API keys automatically for connections that use your own credentials. To rotate, create a new key in LlamaParse and update the Lovable connection.
* Support per-end-user LlamaParse login. Each connection represents a single LlamaParse account, or Lovable's managed access, shared across all projects linked to it.

## Manage your LlamaParse Platform connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **LlamaParse Platform**, then open the connection.

* **Unlink projects** to remove LlamaParse Platform access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use LlamaParse Platform stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to beehiiv](https://docs.lovable.dev/integrations/beehiiv.md)
