# AI features for your app
<!-- source: https://docs.lovable.dev/features/ai.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# AI features for your app

> Add AI features such as chatbots, summaries, and image generation to your Lovable app with the built-in AI connector. No API keys or provider setup required.

The built-in AI connector adds AI features to your app without a provider account, API keys, billing setup, or model code of your own. Describe the feature you want, and Lovable sets it up.

These AI features run inside your app. They are separate from the Lovable agent that helps you build and edit your project.

Features you can add, each with its own page:

> **[Chat, summarize, and answer questions](https://docs.lovable.dev/features/ai-chat.md)**
>
> Assistants, summaries, Q\&A, translation, and analysis.

> **[Generate and edit images](https://docs.lovable.dev/features/ai-images.md)**
>
> Mockups, marketing visuals, and image editing.

> **[Generate video clips](https://docs.lovable.dev/features/ai-video.md)**
>
> Short clips from a prompt or a photo.

> **[Generate music](https://docs.lovable.dev/features/ai-music.md)**
>
> Clips or full tracks, with vocals or instrumental.

> **[Search by meaning](https://docs.lovable.dev/features/ai-search.md)**
>
> Semantic search, RAG, and knowledge bases.

> **[Classify, route, and score](https://docs.lovable.dev/features/ai-decisions.md)**
>
> Route tickets, flag issues, rank, and score.

> **[Read content aloud](https://docs.lovable.dev/features/ai-text-to-speech.md)**
>
> Narration, read-aloud buttons, and audiobooks.

> **[Transcribe speech](https://docs.lovable.dev/features/ai-speech-to-text.md)**
>
> Voice notes, meetings, captions, and dictation.

> **[Talk with your app](https://docs.lovable.dev/features/ai-live-voice.md)**
>
> Live two-way voice conversations.

> [!NOTE]
>
> This page is about the built-in AI connector, where your app calls AI models through Lovable without a provider account.
>
> Looking for other AI services in your app, such as cited answers from the live web with [Perplexity](https://docs.lovable.dev/integrations/perplexity.md), website scraping with [Firecrawl](https://docs.lovable.dev/integrations/firecrawl.md), deep research with [Parallel](https://docs.lovable.dev/integrations/parallel.md), or custom voices with [ElevenLabs](https://docs.lovable.dev/integrations/eleven-labs.md)? Connect them as [app connectors](https://docs.lovable.dev/integrations/app-connectors.md) from the [connector catalog](https://lovable.dev/dashboard?connectors). Those connections are different from the built-in AI connector.

For copy-paste prompts covering several of these features, see the [AI section of the prompt library](https://docs.lovable.dev/prompting/prompting-library.md#ai-features).

## Add an AI feature to your app

Describe the feature in the project chat, the same way you ask for any other change. This works in a new project and in an app you have already built.

Name a model if you have one in mind, or describe the result you want and Lovable picks a supported model for the job. See [Choosing a model](#choosing-a-model).

> [!NOTE]
>
> For the best experience, use the built-in AI connector together with the [built-in backend](https://docs.lovable.dev/features/cloud), so your app can make secure model calls.

Lovable creates the backend function that calls the model and manages the project's API key, so your app never exposes credentials. See [How it works](#how-it-works).

[Publish your changes](https://docs.lovable.dev/features/publish.md) so your published app gets the feature. AI features in your deployed app use credits, and the **More → AI** dashboard shows what each request cost. See [Usage and pricing](#usage-and-pricing) and [Monitor AI usage and activity](#monitor-ai-usage-and-activity).

## Control when Lovable uses the built-in AI connector

The built-in AI connector is enabled for your workspace by default, with the preference **Always allow**, so Lovable can add AI features to your app when you ask. To change the preference for your projects, open [Connectors](https://lovable.dev/dashboard?connectors), select **AI**, and change the setting under **Adding AI capabilities to your projects**. Choose between:

* **Always allow**: Lovable automatically performs the action without asking for review or approval.
* **Ask each time**: Lovable asks for your approval whenever the action is needed. Select **Allow** to use the built-in AI connector for that request, or **Skip** to decline it. You can also change the preference from the same prompt, which applies to later requests.
* **Never allow**: Lovable does not use the built-in AI connector, and suggests building the feature with a provider you connect yourself.

Workspace admins and owners on **Business and Enterprise** plans can turn the built-in AI connector on or off for the whole workspace. Set the **AI** row to **Enabled** or **Disabled** in [Connectors → Admin settings](https://lovable.dev/dashboard?connectors).

Turning it off stops AI calls from every app in the workspace, including apps you have already published, until an admin or owner turns it back on.

## How it works

Lovable sets up the AI infrastructure for you:

* **API key**: Lovable automatically generates and manages a `LOVABLE_API_KEY` for each project. You never need to create or provide it yourself. When a project is remixed, a fresh key is generated for the new project automatically.
* **Backend calls**: AI calls run through a secure backend function that Lovable creates for you, which keeps your credentials and prompts server-side. The exception is live voice: the browser streams audio directly to the voice model, while your app's server still starts the call and keeps the API key.
* **Streaming**: the built-in AI connector supports streaming responses with server-sent events (SSE). Lovable sets up streaming for chatbot and assistant features, so responses appear piece by piece as they are generated rather than all at once.

> [!NOTE]
>
> The automatically generated project `LOVABLE_API_KEY` is separate from [workspace API keys](https://docs.lovable.dev/features/api-keys.md), which authenticate requests to the Lovable API. You do not need to create a workspace API key to use built-in AI features.

## Choosing a model

When you ask Lovable to add or update an AI feature, you can name a supported model or describe what you want and let Lovable pick the right one. Every model links to its provider's own documentation for the technical details.

To browse the models available to your workspace in the product, open [Connectors](https://lovable.dev/dashboard?connectors), select **AI**, and search the **Available models** list by model name, provider, or capability.

> [!NOTE]
>
> Enterprise workspaces use only zero-data-retention models, which the provider does not store, unless a workspace admin enables [Extended-retention models](https://docs.lovable.dev/features/privacy-and-security-settings.md#extended-retention-models). The Claude models, Gemini Omni 1.1 Flash, and the ByteDance models are not zero-data-retention models, so on Enterprise plans your app can use them only after an admin enables that setting and accepts its current terms.
>
> When an admin enables [EU inference](https://docs.lovable.dev/features/eu-inference.md), your app can use only the models that run in the European Union. A request for any other model fails with an error.

This table shows where to start for each use case and when you might switch. Each use case links to the page for its models.

| Use case | Start with | Switch when |
| - | - | - |
| [Chat and assistant features](https://docs.lovable.dev/features/ai-chat.md) | GPT-6 Astra | You want faster, lower-cost answers for everyday chat (Gemini 3.8 Flash), or the hardest reasoning and long-horizon work (Gemini 4 Argon). |
| [High-volume, simple text tasks](https://docs.lovable.dev/features/ai-chat.md) | Gemini 3.1 Flash Lite or GPT-6 Luna | You need better answers than the lightweight models give (Gemini 3.8 Flash). |
| [Image generation and editing](https://docs.lovable.dev/features/ai-images.md) | GPT Image 2.5 Sunburst | You want faster results (GPT Image 2.5 Flare) or lower-cost drafts (Gemini 3.1 Flash Lite Image). |
| [Video generation](https://docs.lovable.dev/features/ai-video.md) | Gemini Omni 1.1 Flash. On Enterprise workspaces without [Extended-retention models](https://docs.lovable.dev/features/privacy-and-security-settings.md#extended-retention-models), Veo 3.1. | You want the highest visual quality (Veo 3.1), or you need the same prompt to produce a near-identical clip each time (any Veo model). |
| [Music generation](https://docs.lovable.dev/features/ai-music.md) | Lyria 3 Clip Preview | You want a full track longer than 30 seconds (Lyria 3 Pro Preview). |
| [Semantic search and retrieval-augmented generation (RAG)](https://docs.lovable.dev/features/ai-search.md) | Gemini Embedding 2 | You want lower cost on high-volume text workloads (text-embedding-3-small). |
| [Classification, routing, and scoring](https://docs.lovable.dev/features/ai-decisions.md) | Jev 1.13 | You need generated prose, explanations, or extraction of new text (a chat model, such as Gemini 3.8 Flash). |
| [Text-to-speech](https://docs.lovable.dev/features/ai-text-to-speech.md) | Gemini 3.1 Flash TTS Preview | You need higher-fidelity voices (Gemini 2.5 Pro TTS). |
| [Speech-to-text](https://docs.lovable.dev/features/ai-speech-to-text.md) | GPT Transcribe | You want automatic language detection across more than 85 languages (Gemini 3.5 Transcribe). |
| [Live voice conversations](https://docs.lovable.dev/features/ai-live-voice.md) | GPT-Live 1 | You only need to read text aloud or transcribe audio (a text-to-speech or speech-to-text model, at lower cost). |

Each of these jobs has its own page: the models available for it, what each model is good for, and the limits that matter. In every table the default model, where there is one, comes first.

> [!TIP]
>
> The **Start with** column names a current model for each job. When you name a model yourself, prefer a newer generation over an older one: older generations are the first to reach a retirement date.

A model that is being retired is listed on [Deprecated models](https://docs.lovable.dev/features/ai-deprecated-models.md), with its retirement date and what happens to your app's requests after it.

## Monitor AI usage and activity

A project with a backend has an AI activity dashboard under **More → AI** that shows what your app's AI features cost and how they are performing. You need permission to view the project's AI logs to open it.

Use the dashboard to track spend, spot failed requests, and inspect individual AI calls. Lovable reads this activity too, so it can help you debug failures and improve your app's AI features.

> [!NOTE]
>
> The **More → AI** dashboard is a per-project view for monitoring and debugging AI features. It shows individual requests with their status, model, and cost, and, when request content is available, the redacted request and response.
>
> To review AI spend across your workspace, see [Usage and pricing](#usage-and-pricing).

Choose a time range to summarize recent AI activity. Four cards show:

* **Credits used**: the credits your app's AI requests used in the selected range.
* **AI requests**: how many requests your app made.
* **Success rate**: the percentage of requests that completed successfully.
* **Avg. time**: the average time a request took.

Your plan decides how far back you can view activity: Free workspaces can view the last 24 hours, and paid plans can view the last 90 days.

### AI activity

The **AI activity** list shows recent AI requests, newest first. When an AI action takes several steps, they appear together as a single run, so you can see the cost of each step.

Each entry shows its status, a run name taken from the request, the model used, the credits it cost, when it ran, and how many requests the run covers.

Lovable always records this summary for every AI request, even when the request content is not available.

### AI app context

The **AI app context** setting lets Lovable debug and improve your app's AI features. When it is on, Lovable keeps the full request and response for each AI call, so you and Lovable can open a request to see exactly what was sent and returned.

Lovable uses this to debug failures, refine your prompts and knowledge, and make your AI features cheaper and faster.

Secrets are removed automatically, and details are kept for 90 days. While [EU inference](https://docs.lovable.dev/features/eu-inference.md) is enabled, Lovable captures nothing, even when this setting is on, because captured content has no storage inside the region.

The setting is on by default on Free and Pro plans. On Business and Enterprise plans it is off by default. Enable it from the prompt on **More → AI**, or from [project settings](https://docs.lovable.dev/features/projects/settings.md). Changing it requires permission to edit the project.

When it is off, the dashboard and Lovable still see the summary of each request but cannot open its full content.

## Usage and pricing

> [!NOTE]
>
> **Temporary offering, subject to change:** Free, Pro, and Business workspaces receive a **4-credit monthly AI grant** for AI gateway usage in deployed apps. On Free plans, the grant resets on the 1st of each calendar month at **00:00 UTC**. On Pro and Business plans, it refreshes with the subscription billing cycle. The grant does not roll over.

Your app's AI requests count as **AI gateway usage**, one of the usage types on [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md). AI gateway usage is measured when AI features inside your deployed app make model calls. These requests are separate from the Lovable agent that helps you plan, build, and edit your project.

AI gateway usage uses credits. Credit usage depends on the model used and the amount of work performed, such as text tokens, generated images, seconds of generated video, finished music tracks, audio processing, connected voice time, or other provider-reported usage.

Live voice conversations use credits for the connected time of each call, including silence and the time the model waits for your backend, with a 15-second minimum charged when the call connects. The AI activity dashboard shows this as billable voice time for each call.

AI gateway usage rates are based on the underlying provider model costs. To estimate relative model costs, refer to the official provider pricing sources linked from the model tables on each capability page. Chat requests that use [priority processing](https://docs.lovable.dev/features/ai-chat.md#faster-responses-with-priority-processing) cost more than the same request served at the standard tier.

On Free, Pro, and Business plans, AI gateway usage draws from the monthly AI grant first. After that, it draws from general credits where available.

To review AI gateway usage, go to [Workspace settings → Plans & credit usage → Usage details](https://lovable.dev/settings/usage-breakdown) and select **Run credits**. For more information about AI gateway costs, monthly AI grants, top-ups, auto top-up, alerts, and usage tracking, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

### Canceled requests

If your app cancels an AI request that is still running, some usage may still be billed. The built-in AI connector waits briefly for the provider to finish and report final usage before closing the connection, and provider behavior on canceled requests varies.

## Workspace rate limits

The built-in AI connector applies rate limits per workspace. Rate limits are measured in **requests (model calls) per minute**, not tokens per minute. Two features add their own limits:

* **Video generation**: how many clips one project can generate at the same time, 1 on Free plans and 10 on paid plans.
* **Live voice**: how many voice calls can run at the same time in a workspace, 5 on Free plans and 20 on paid plans.

If your app's requests exceed the allowed rate, the server returns a `429 Too Many Requests` status code and the request is not processed.

If your workspace runs out of credits, the server returns a `402 Payment Required` status code. You can restore access by adding credits or enabling auto top-up in [Workspace settings → Plans & credit usage](https://lovable.dev/settings/billing).

For more information, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

On Free plans, upgrade to raise these limits. On paid plans, contact [Lovable Support](https://lovable.dev/support) if you need more capacity.

## FAQ

> **Is the built-in AI connector the same thing as the Lovable agent?**
>
> No. The built-in AI connector adds AI features to the apps you build with Lovable. The Lovable agent is what helps you build and edit your project.
>
> The models documented here are available for AI features inside your app. They are not the models Lovable uses to write, edit, or reason about your code.

> **Do I need my own OpenAI, Google, or other provider API key?**
>
> No. Lovable automatically generates and manages the API key for each project. You do not need to create a provider account, configure billing with a model provider, or paste API keys into your app.

> **Where do AI calls run?**
>
> AI calls run through a secure backend function that Lovable creates for you, which keeps credentials and prompts server-side. The exception is [live voice](https://docs.lovable.dev/features/ai-live-voice.md): the browser streams audio directly to the voice model, while your app's server starts the call and keeps the API key.

> **Can I choose which model my app uses?**
>
> Yes. Each model type has its own default, and you can ask Lovable to use a different supported model or combination of models for a specific AI feature. See [Choosing a model](#choosing-a-model).

> **Can my app work with voice and audio?**
>
> Yes. The built-in AI connector includes text-to-speech (so your app can read content aloud or respond with voice), speech-to-text (so your app can transcribe voice notes, recordings, and meetings, or take voice input), and live voice models (so people can talk with your app in a spoken conversation).
>
> Ask Lovable to add a feature such as a "read aloud" button, a voice assistant, or a meeting transcriber, and it sets up the backend for you.
>
> See [Text-to-speech](https://docs.lovable.dev/features/ai-text-to-speech.md), [Speech-to-text](https://docs.lovable.dev/features/ai-speech-to-text.md), and [Live voice](https://docs.lovable.dev/features/ai-live-voice.md).
>
> For higher-fidelity or character voices as a core part of your product, you can also connect [ElevenLabs](https://docs.lovable.dev/integrations/eleven-labs.md).

> **Can my app use Anthropic (Claude) models?**
>
> Yes. The built-in AI connector offers Claude Fable 5.1, Opus 5.5, Opus 5, Sonnet 5, and Haiku 4.5, listed under [Chat models](https://docs.lovable.dev/features/ai-chat.md), in newer apps (created from May 13, 2026, which use TanStack Start). On Enterprise plans, a workspace admin first enables [Extended-retention models](https://docs.lovable.dev/features/privacy-and-security-settings.md#extended-retention-models) and accepts its current terms.
>
> If your app needs a provider that isn't offered, call that provider directly from a backend edge function using your own API key stored as a [secret](https://docs.lovable.dev/features/secrets.md).

> **What is Jev, and when should I use it instead of a chat model?**
>
> [Jev 1.13](https://docs.lovable.dev/features/ai-decisions.md) is a typed-decision model from TypeSafe. It returns a category, score, or yes/no probability instead of generated text. Use it to classify tickets, route requests, rank candidates, or verify a claim against text you already have. Use a chat model when the feature needs to write a reply, summarize, or extract new wording.

> **Can I use my own API key so AI usage doesn't consume my credits?**
>
> Not with the built-in AI connector, which always runs through Lovable and bills your workspace credits. If you want usage billed to your own provider account instead, ask Lovable to call the provider's API directly from a backend edge function, with your key stored as a [secret](https://docs.lovable.dev/features/secrets.md).
>
> That usage is billed by the provider, and your app only consumes Cloud usage for running the function.

> **What happens if my workspace runs out of credits?**
>
> If your workspace runs out of credits, AI requests return a `402 Payment Required` status code. You can restore access by adding credits or enabling auto top-up in [Workspace settings → Plans & credit usage](https://lovable.dev/settings/billing).
>
> For more information, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).


## Related topics

- [Replace deprecated AI models in your app](https://docs.lovable.dev/features/ai-deprecated-models.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Connect your app to Oracle Autonomous AI Database](https://docs.lovable.dev/integrations/oracle-autonomous.md)
