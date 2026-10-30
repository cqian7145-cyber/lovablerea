# Connect ElevenLabs to enable voice AI in your app
<!-- source: https://docs.lovable.dev/integrations/eleven-labs.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect ElevenLabs to enable voice AI in your app

> Connect your app to ElevenLabs, an AI audio platform, to generate speech, transcribe audio, create music and sound effects, and build voice agents.

[ElevenLabs](https://elevenlabs.io/) is an AI audio platform for speech, transcription, music, and conversational voice agents. The ElevenLabs connector lets your Lovable app call the ElevenLabs API with a shared API key. It's designed for apps where spoken audio or voice interaction is a core part of the product, such as narrated content, dictation, and talking assistants.

ElevenLabs is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With ElevenLabs, your app can:

* Turn text into natural-sounding speech in a voice you choose
* Transcribe recordings, or transcribe speech live for dictation and captions
* Generate sound effects and music from a text description
* Add a voice agent that people can talk to in real time

ElevenLabs is a good fit when your app depends on spoken output or audio-first interaction rather than text-only interfaces.

## Common use cases and example apps

These examples show what you can build with ElevenLabs, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Voice-enabled assistant** | *Use ElevenLabs and build a voice assistant that answers questions aloud with a selected voice.* | **Deliver spoken responses instead of text-only replies.** The app accepts a question, generates a response, converts it to speech with the chosen voice, and plays the audio back. |
| **Daily briefing app** | *Use ElevenLabs and build a daily briefing app that reads out metrics or summaries every morning.* | **Turn daily summaries into audio people can listen to while multitasking.** The app compiles a briefing from selected sources, generates a spoken version, and offers playback in the app. |
| **Narrated content generator** | *Use ElevenLabs and build an app that turns articles or story prompts into narrated audio episodes.* | **Turn written content into narrated episodes for on-demand listening.** The app transforms articles or prompts into scripts, generates narration with one or more voices, and outputs complete audio episodes. |
| **Children's storytelling app** | *Use ElevenLabs and build a story app that generates narrated stories with character voices.* | **Generate narrated stories with expressive character voices.** The app creates stories from the reader's inputs, assigns a voice to each character, and produces fully narrated audio. |
| **Meeting transcription tool** | *Use ElevenLabs and build a tool that transcribes uploaded recordings with speaker labels.* | **Turn recordings into searchable, speaker-labeled transcripts.** The app uploads audio to ElevenLabs for batch transcription and shows the transcript with speaker diarization. |
| **Learning app** | *Use ElevenLabs and build a learning app that reads lessons and exercises aloud.* | **Support learning with spoken instruction.** The app converts lessons, exercises, and explanations into speech and plays them as part of the learning flow. |
| **Guided wellness app** | *Use ElevenLabs and build a fitness or wellness app that delivers spoken guidance during sessions.* | **Provide guided sessions through audio-first instructions.** The app generates spoken guidance for routines and exercises and plays it continuously through the session. |
| **Accessibility reader** | *Use ElevenLabs and build an app that reads page content aloud for people who prefer audio.* | **Make app content usable without looking at the screen.** The app generates spoken audio for the relevant content and offers it as the primary way to consume information. |

## How to connect ElevenLabs

Who can create ElevenLabs connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple ElevenLabs connections using different API keys, which is useful for separating environments (for example, development and production) or giving each environment its own credit limit.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting ElevenLabs, make sure you have:

* An ElevenLabs account
* An ElevenLabs API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All audio generation and processing through this connector consumes ElevenLabs credits, based on the model and input length. Billing is handled directly by ElevenLabs, not Lovable.

### Step 1: Get an ElevenLabs API key

An ElevenLabs API key lets your Lovable app authenticate with the ElevenLabs API. You can create multiple keys with different permissions and credit limits.

To create an ElevenLabs API key:

**1. Open your ElevenLabs account**

Sign in to [ElevenLabs](https://elevenlabs.io/app/developers/api-keys?source=lovable). The link opens the API keys page.

**2. Create a key**

In **Developers → API keys**, click **Create Key** and give the key a descriptive name, for example `Lovable integration`.

**3. Restrict the key**

Turn on **Restrict Key**.

**4. Set a credit limit**

Set a monthly **Credit Limit** for the key.

**5. Choose the endpoints the key can use**

Keep the endpoints your app needs, such as text to speech or speech to text. Also keep read access to usage and user information. Lovable reads the key's usage statistics to verify it when you connect, and rejects a key without that access.

**6. Copy the key**

Copy the generated API key and store it securely.

> [!WARNING]
>
> Your API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

See ElevenLabs documentation for more: [ElevenLabs API reference](https://elevenlabs.io/docs/api-reference/introduction).

### Step 2: Connect ElevenLabs to Lovable

You can create multiple connections using different API keys.

**1. Open ElevenLabs in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **ElevenLabs**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `ElevenLabs Prod`. This name is only used inside Lovable to identify the connection.
2. **API Key**: paste your ElevenLabs API key (it starts with `sk_`). **Get value** next to the field opens the ElevenLabs API keys page.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against the ElevenLabs API before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to ElevenLabs (based on configured connection-level access). Your Lovable apps can then generate speech, music, and sound effects, transcribe audio, and run voice agents with ElevenLabs.

> [!NOTE]
>
> Unlike most app + chat connectors, ElevenLabs does not route through Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors). Lovable stores the API key as a secret in each linked project, and the key never leaves your app's server. Real-time features such as voice agents connect the browser to ElevenLabs with a short-lived token that your server requests with the key.

## Limitations

The ElevenLabs connector cannot:

* Rotate API keys automatically. To rotate, create a new key in ElevenLabs and update the Lovable connection.
* Support per-end-user ElevenLabs login. Each connection represents a single ElevenLabs account shared across all projects linked to it.

## Manage your ElevenLabs connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **ElevenLabs**, then open the connection.

* **Unlink projects** to remove ElevenLabs access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use ElevenLabs stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Oracle Autonomous AI Database](https://docs.lovable.dev/integrations/oracle-autonomous.md)
- [Connect your app to Fireflies](https://docs.lovable.dev/integrations/fireflies.md)
- [Connect your app to Twilio](https://docs.lovable.dev/integrations/twilio.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
