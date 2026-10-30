# Replace deprecated AI models in your app
<!-- source: https://docs.lovable.dev/features/ai-deprecated-models.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Replace deprecated AI models in your app

> Check which AI models are being retired, what happens to your app's requests after the retirement date, and how to move your app to a current model.

A deprecated model still works in the apps that use it. The label means the model is on its way out: Lovable stops serving it on its retirement date, so a deprecation is a deadline to plan around, not an outage.

This page lists every deprecated model with its retirement date and what happens to your app's requests after that date. For the models you can build on today, see [AI features for your app](https://docs.lovable.dev/features/ai).

## Why a model is deprecated

Model providers retire their models over time. Lovable can also deprecate or retire a model on its own, even when its provider still offers it. That happens when an agreement with a provider ends, or when Lovable stops supporting an older generation.

When a provider or Lovable plans to stop serving a model, the model gets a **Deprecated** badge in the **Available models** list in [Connectors](https://lovable.dev/dashboard?connectors) → **AI**. Lovable lists it on this page instead of with the current models for its job.

A deprecated model keeps working in the apps that already use it until its retirement date. Lovable does not choose a deprecated model for a new AI feature, unless no current model covers that job. A deprecated model without a retirement date keeps working until Lovable or the provider sets one.

## How Lovable informs you of a deprecation

Lovable warns you in two places:

* **In the project chat.** If you ask for a deprecated model without saying you know it is deprecated, Lovable tells you, names the retirement date when one is set, and offers a current model for the same job. If you ask again after that, Lovable uses the model you asked for.
* **By email.** Lovable emails the owner of every project whose app calls the model, as soon as that model has a retirement date. The provider usually sets the date, so the warning can be short.

Lovable does not change the model in your app's code on its own, and it keeps your app's current models when you ask for unrelated changes. Your app calls the deprecated model until you ask Lovable to switch it.

## What happens on the retirement date

On the retirement date, at 00:00 UTC, Lovable stops sending requests to the model. What happens to your app's requests depends on the model:

* **Replaced**: Lovable sends requests for the retired model to its replacement model. Your app keeps working without a code change. The replacement can cost a different amount per request and can respond differently, so switch your app to a current model before the date.
* **Rejected**: Requests for the retired model fail with an error that names the model and its retirement date. Switch your app to a current model before the date to keep the feature working.

> [!TIP]
>
> A replacement keeps your app running, but it is not a model you chose. Lovable routes retired requests to the nearest current model, which is not always the newest one for the job. Pick the model yourself from [Choosing a model](https://docs.lovable.dev/features/ai#choosing-a-model), and prefer a newer generation over an older one.

## Models and retirement dates

Each model below is deprecated. A date in the past means the model is already retired, and the last column describes what your app's requests get today.

Go by the dates below rather than the provider's own schedule. Lovable can retire a model before its provider does, so the provider's date can be later.

### Deprecated OpenAI models

| Model | Type | Retirement date | After the retirement date |
| - | - | - | - |
| [GPT Image 1 Mini](https://platform.openai.com/docs/models/gpt-image-1-mini) | Image | December 1, 2026 | Requests go to GPT Image 2.5 Flare |
| [GPT-5](https://openai.com/index/introducing-gpt-5/) | Chat | December 11, 2026 | Requests go to GPT-5.6 Sol |
| [GPT-5 mini](https://platform.openai.com/docs/models/gpt-5-mini) | Chat | December 11, 2026 | Requests go to GPT-5.6 Terra |
| [GPT-5 nano](https://platform.openai.com/docs/models/gpt-5-nano) | Chat | December 11, 2026 | Requests go to GPT-5.6 Luna |
| [GPT-4o mini TTS](https://platform.openai.com/docs/models/gpt-4o-mini-tts) | Text to speech | January 6, 2027 | Requests fail |
| [GPT-4o mini Transcribe](https://platform.openai.com/docs/models/gpt-4o-mini-transcribe) | Speech to text | February 26, 2027 | Requests fail |
| [GPT-4o Transcribe](https://platform.openai.com/docs/models/gpt-4o-transcribe) | Speech to text | February 26, 2027 | Requests fail |
| [GPT-5.4 Nano](https://platform.openai.com/docs/models/gpt-5.4-nano) | Chat | April 1, 2027 | Requests go to GPT-6 Luna |
| [GPT-5.4 Pro](https://platform.openai.com/docs/models/gpt-5.4-pro) | Chat | Not announced | Requests go to GPT-5.5 Pro |
| [GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) | Chat | Not announced | Requests go to GPT-5.6 Sol |

### Deprecated Google models

| Model | Type | Retirement date | After the retirement date |
| - | - | - | - |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro) | Chat | October 20, 2026 | Requests go to Gemini 3.8 Flash |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash) | Chat | October 20, 2026 | Requests go to Gemini 3.8 Flash |
| [Gemini 2.5 Flash Lite](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-lite) | Chat | October 20, 2026 | Requests go to Gemini 3.1 Flash Lite |
| [Gemini 3.6 Flash](https://deepmind.google/models/model-cards/gemini-3-6-flash/) | Chat | November 19, 2026 | Requests go to Gemini 3.8 Flash |
| [Gemini 3.7 Flash](https://deepmind.google/models/model-cards/gemini-3-7-flash/) | Chat | January 28, 2027 | Requests go to Gemini 3.8 Flash |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image) | Image | March 15, 2027 | Requests go to Gemini 3 Pro Image |
| [Gemini 3.5 Flash](https://deepmind.google/models/model-cards/gemini-3-5-flash/) | Chat | Not announced | Requests go to Gemini 3.8 Flash |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) | Image | Not announced | Requests fail |
| [Gemini 2.5 Flash Lite Preview TTS](https://ai.google.dev/gemini-api/docs/speech-generation) | Text to speech | Not announced | Requests go to Gemini 2.5 Flash TTS |

## Switch to a current model

To switch a deprecated model:

**1. Check which models your app uses**

Open **More → AI** in the project. The [AI activity](https://docs.lovable.dev/features/ai#ai-activity) list shows the model each AI request used. After a retirement date, this list shows the replacement model for requests that Lovable redirected, so check it before that date. You can also ask Lovable in the project chat which models the app's AI features use.

**2. Ask Lovable to switch**

Let Lovable pick a current model for the same job, or name the model yourself.

```text wrap theme={null}
Replace any deprecated AI models in this app with current ones.
```

Lovable updates the backend code that calls the model. A different model can change what your AI features cost per request.

**3. Publish the change**

[Publish your changes](https://docs.lovable.dev/features/publish.md) so your published app uses the new model. Until you publish, only the preview uses it.


## Related topics

- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Connect your app to Replicate](https://docs.lovable.dev/integrations/replicate.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Add chatbots and text generation to your app](https://docs.lovable.dev/features/ai-chat.md)
