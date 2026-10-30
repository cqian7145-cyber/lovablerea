# Connect your app to Replicate
<!-- source: https://docs.lovable.dev/integrations/replicate.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Replicate

> Connect your app to Replicate, a platform for running open-source AI models, to generate images, video, audio, and text from your Lovable app.

[Replicate](https://replicate.com/) is a platform for running open-source AI models through a single API. The Replicate connector lets your Lovable app run thousands of models for image, video, audio, and text generation. It's designed for apps that need a specific open-source model beyond Lovable's built-in AI, such as a particular FLUX fine-tune, a community video model, or a specific Whisper variant.

Replicate is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Replicate, your app can:

* Generate images, video, and audio with open-source models such as FLUX and Stable Diffusion
* Transcribe speech with models such as Whisper
* Generate text with open language models
* Start from an uploaded image, for example to animate a product photo into a video

Replicate is a good fit when your app needs a specific model that isn't available through Lovable's built-in AI.

## Common use cases and example apps

These examples show what you can build with Replicate, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Text-to-image generator** | *Use Replicate and build an app that turns text prompts into images with FLUX.* | **Generate images from text prompts on demand.** The app sends prompts to a Replicate image model and shows the results. |
| **Image-to-video tool** | *Use Replicate and build a tool that animates a product photo into a short video clip.* | **Turn still images into short video clips.** The app uploads a source image, runs an image-to-video model, and plays back the generated clip. |
| **Audio transcription app** | *Use Replicate and build an app that transcribes uploaded audio with Whisper.* | **Transcribe spoken audio into text.** The app sends recordings to a transcription model and returns the transcript in the app. |
| **Image editing tool** | *Use Replicate and build a tool that removes backgrounds from uploaded product photos.* | **Edit and enhance images automatically.** The app runs an image-processing model and returns the edited file. |
| **Avatar and sticker generator** | *Use Replicate and build an app that creates custom avatar stickers from a selfie.* | **Create personalized image content from uploads.** The app feeds a photo to a generation model and produces styled results. |
| **Custom model app** | *Use Replicate and build an app that runs our fine-tuned model on customer inputs.* | **Serve your own fine-tuned models inside your app.** The app calls a model you've trained on Replicate and shows the output. |

## How to connect Replicate

Who can create Replicate connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Replicate connections using different API tokens, which is useful for separating environments (for example, development and production) or managing rate limits.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Replicate, make sure you have:

* A Replicate account
* A Replicate API token
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All predictions run through this connector are billed by Replicate based on the model and how long each run takes. Billing and quota are handled directly by Replicate, not Lovable.

### Step 1: Get a Replicate API token

A Replicate API token lets your Lovable app authenticate with the Replicate API.

To create a Replicate API token:

**1. Open your Replicate account**

Sign in to [Replicate](https://replicate.com/).

**2. Open API tokens**

Go to **Account settings → [API tokens](https://replicate.com/account/api-tokens)**.

**3. Create a token**

Click **Create token** and give it a descriptive name, for example `Lovable integration`.

**4. Copy the token**

Copy the token (it starts with `r8_`) and store it securely.

> [!WARNING]
>
> Your API token functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See Replicate documentation for more: [API tokens and security](https://replicate.com/docs/topics/security/api-tokens).

### Step 2: Connect Replicate to Lovable

You can create multiple connections using different API tokens.

**1. Open Replicate in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Replicate**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Replicate Prod`. This name is only used inside Lovable to identify the connection.
2. **API token**: paste your Replicate API token (it starts with `r8_`). **Get value** next to the field opens the Replicate API tokens page.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the token against the Replicate API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Replicate (based on configured connection-level access). Your Lovable apps can then generate images, video, audio, and text with Replicate models.

## Limitations

The Replicate connector cannot:

* Keep generated files at the Replicate URL. Output URLs expire after about an hour, so the app must save generated images, video, and audio to its own storage. Ask Lovable to store outputs when you build the feature.
* Rotate API tokens automatically. To rotate, create a new token in Replicate and update the Lovable connection.
* Support per-end-user Replicate login. Each connection represents a single Replicate account shared across all projects linked to it.

## Troubleshooting

If predictions fail, the section below covers the most common error and how to resolve it.

> **Predictions fail with 402 "Insufficient credit"**
>
> The Replicate account behind the connection has no credit. Add billing or credit at [replicate.com/account/billing](https://replicate.com/account/billing), then run the prediction again. The API token itself is still valid.

## Manage your Replicate connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Replicate**, then open the connection.

* **Unlink projects** to remove Replicate access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Replicate stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
