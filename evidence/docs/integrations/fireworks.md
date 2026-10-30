# Connect your app to Fireworks AI
<!-- source: https://docs.lovable.dev/integrations/fireworks.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Fireworks AI

> Connect your app to Fireworks AI, an inference platform for open models, to run text generation, image generation, embeddings, and fine-tuning from your Lovable app.

[Fireworks AI](https://fireworks.ai/) is an inference platform that serves open models through a fast, OpenAI-compatible API. The Fireworks AI connector lets your Lovable app run text generation, image generation, and embeddings on models hosted by Fireworks, and fine-tune open models on your own data. It's designed for apps that need a specific open model, a custom endpoint, or a fine-tuned model beyond Lovable's built-in AI.

Fireworks AI is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Fireworks AI, your app can:

* Generate text and chat replies with open models such as Llama, streamed as they are written
* Generate images with models such as FLUX
* Create embeddings so your app can search by meaning
* See which models your Fireworks account can use
* Fine-tune an open model on your own data and use the result in your app

Fireworks AI is a good fit when your app needs a specific open model, a custom endpoint you host on Fireworks, or a model fine-tuned on your data. For generic AI features with no provider preference, Lovable's built-in AI is the simpler default.

## Common use cases and example apps

These examples show what you can build with Fireworks AI, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **AI chat assistant** | *Use Fireworks AI and build a support chat that answers questions with Llama.* | **Answer questions with an open chat model.** The app sends the conversation to a Fireworks chat model and streams the reply back. |
| **Text-to-image generator** | *Use Fireworks AI and build an app that turns prompts into images with FLUX.* | **Generate images from text prompts on demand.** The app sends prompts to a Fireworks image model and displays the generated image. |
| **Semantic search** | *Use Fireworks AI and build a knowledge base with semantic search over our help articles.* | **Find content by meaning instead of keywords.** The app embeds articles and queries with a Fireworks embedding model and ranks results by similarity. |
| **Summarization tool** | *Use Fireworks AI and build a tool that summarizes long reports into key points.* | **Condense long documents into skimmable summaries.** The app sends document text to a Fireworks model and returns a structured summary. |
| **Content pipeline** | *Use Fireworks AI and build an app that drafts product descriptions from a spec sheet.* | **Generate structured content at scale.** The app feeds source data to a Fireworks model and produces drafts for review. |
| **Fine-tuning workbench** | *Use Fireworks AI and build a tool that uploads our support transcripts, fine-tunes a Llama model on them, and lets us chat with the result.* | **Train a model on your own data and serve it from the same app.** The app uploads a dataset, starts a fine-tuning job, polls until it finishes, and deploys the tuned model for inference. |
| **Custom endpoint app** | *Use Fireworks AI and build an app that runs our fine-tuned model on customer inputs.* | **Serve your own models hosted on Fireworks.** The app calls the custom endpoint you deployed on Fireworks and shows the output. |

## How to connect Fireworks AI

Who can create Fireworks AI connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Fireworks AI connections using different API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Fireworks AI, make sure you have:

* A Fireworks AI account
* A Fireworks AI API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All inference requests, fine-tuning jobs, and deployments made through this connector count toward your Fireworks AI usage. Billing and quota are handled directly by Fireworks AI, not Lovable.

### Step 1: Get a Fireworks AI API key

A Fireworks AI API key lets your Lovable app authenticate with the Fireworks AI API.

To create a Fireworks AI API key:

**1. Open your Fireworks AI account**

Sign in to [Fireworks AI](https://app.fireworks.ai/).

**2. Open API keys**

Go to **Settings → Users → [API keys](https://app.fireworks.ai/settings/users/api-keys)**.

**3. Create a key**

Click **Create API key** and give it a descriptive name, for example `Lovable integration`.

**4. Copy the key**

Copy the key (it starts with `fw_`) and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Fireworks AI documentation for more: [Fireworks AI API reference](https://docs.fireworks.ai/api-reference/introduction).

### Step 2: Connect Fireworks AI to Lovable

You can create multiple connections using different API keys.

**1. Open Fireworks AI in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Fireworks AI**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Fireworks AI Prod`. This name is only used inside Lovable to identify the connection.
2. **API key**: paste your Fireworks AI API key (it starts with `fw_`). **Get value** next to the field opens the Fireworks AI API keys page.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the Fireworks AI API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Fireworks AI (based on configured connection-level access). Your Lovable apps can then run text generation, image generation, embeddings, and fine-tuning through Fireworks AI.

## Working with fine-tuning

Fine-tuning jobs run on Fireworks and take minutes to hours. When you ask Lovable to build a fine-tuning flow, the app uploads a dataset, starts the job, and polls until it completes. It then deploys the tuned model so the rest of the app can call it. Fine-tuning jobs and dedicated deployments bill your Fireworks account directly, so ask Lovable to show the cost implications in the app before a job starts.

## Limitations

The Fireworks AI connector cannot:

* Rotate API keys automatically. To rotate, create a new key in Fireworks and update the Lovable connection.
* Support per-end-user Fireworks AI login. Each connection represents a single Fireworks account shared across all projects linked to it.

## Manage your Fireworks AI connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Fireworks AI**, then open the connection.

* **Unlink projects** to remove Fireworks AI access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Fireworks AI stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Oracle Autonomous AI Database](https://docs.lovable.dev/integrations/oracle-autonomous.md)
- [Connect ElevenLabs to enable voice AI in your app](https://docs.lovable.dev/integrations/eleven-labs.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
