# Add chatbots and text generation to your app
<!-- source: https://docs.lovable.dev/features/ai-chat.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add chatbots and text generation to your app

> Pick a chat model for chatbots, summaries, and document questions in your app, show the model's thinking as it answers, and ask for priority processing.

Chat models power conversational and text features: chatbots, assistants, summaries, document Q\&A, translation, classification, and extraction. They range from fast, low-cost models for simple tasks to high-reasoning models for complex work.

Ask Lovable to:

* Build a chatbot or in-app assistant.
* Summarize long text, documents, or transcripts.
* Answer questions from your own content.
* Classify, extract, or translate text. For routing and scoring at scale, use a [typed decision model](https://docs.lovable.dev/features/ai-decisions.md).
* Detect the sentiment of reviews or feedback.
* Brainstorm ideas and draft copy.
* Analyze uploaded images and documents.
* Automate repetitive or multi-step tasks inside your app.
* Triage an inbox: flag what is urgent and draft replies.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

The chat models are grouped by provider.

## OpenAI chat models

Start with GPT-6 Astra, the default, or GPT-6 Luna when cost matters more than depth.

| Model | Best for | [Priority processing](#faster-responses-with-priority-processing) |
| - | - | - |
| [GPT-6 Astra (default)](https://platform.openai.com/docs/models/gpt-6-astra) | OpenAI's most capable model for complex reasoning, coding, research, and document creation. Premium-priced. | Yes |
| [GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) | Complex coding and professional work. Accepts text and image input. | Yes |
| [GPT-6 Sol](https://platform.openai.com/docs/models/gpt-6-sol) | Mid-tier GPT-6 model for complex coding and agentic workflows at lower cost than GPT-6 Astra. | Yes |
| [GPT-6 Luna](https://platform.openai.com/docs/models/gpt-6-luna) | Low-cost GPT-6 model for simple or high-volume tasks. | Yes |
| [GPT-5.6 Sol](https://platform.openai.com/docs/models/gpt-5.6-sol) | Flagship GPT-5.6 model. Strongest for the hardest reasoning, coding, and agentic tasks. | Yes |
| [GPT-5.6 Terra](https://platform.openai.com/docs/models/gpt-5.6-terra) | Balanced GPT-5.6 model for everyday work at lower cost. | Yes |
| [GPT-5.6 Luna](https://platform.openai.com/docs/models/gpt-5.6-luna) | Fast, low-cost GPT-5.6 model for simple or high-volume tasks. | Yes |
| [GPT-5.5 Pro](https://platform.openai.com/docs/models/gpt-5.5-pro) | Frontier reasoning, in-depth research, and complex engineering. The most expensive chat model. [Always reasons before answering](#show-the-models-thinking). | No |
| [GPT-5.5](https://platform.openai.com/docs/models/gpt-5.5) | Complex reasoning, advanced coding, and long-context knowledge work. | Yes |
| [GPT-5.4](https://platform.openai.com/docs/models/gpt-5.4) | Complex reasoning, coding, and long-context knowledge tasks. | Yes |
| [GPT-5.4 Mini](https://platform.openai.com/docs/models/gpt-5.4-mini) | Assistants and mid-complexity reasoning at lower cost. | Yes |
| [ChatGPT Latest](https://developers.openai.com/api/docs/models/chat-latest) | The latest Instant model ChatGPT uses, tuned for conversational chat. Accepts text and image input. It doesn't reason before answering, so it can't show its thinking. OpenAI regularly changes the model behind this name, and what it costs can change with it, so pick a numbered GPT model when you need responses and cost to stay predictable. | No |

## Google chat models

Start with Gemini 3.8 Flash for everyday chat, or Gemini 4 Argon for the hardest reasoning.

| Model | Best for | [Priority processing](#faster-responses-with-priority-processing) |
| - | - | - |
| [Gemini 3.8 Flash](https://deepmind.google/models/model-cards/gemini-3-8-flash/) | Latest Flash generation for fast coding, reasoning, and agentic workflows. Accepts text, image, audio, and video input. | Yes |
| [Gemini 4 Argon](https://deepmind.google/models/model-cards/gemini-4-argon/) | Frontier model for long-horizon coding, deep reasoning, and knowledge work. Accepts text, image, audio, and video input. Premium-priced. | No |
| [Gemini 3.1 Pro Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview) | Advanced coding, long-context understanding, and complex multi-step reasoning. Slower and premium-priced. | Yes |
| [Gemini 3.1 Flash Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite) | High-volume, lightweight tasks such as classification, summarization, and translation. | Yes |
| [Gemini 3 Flash Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview) | Fast, general-purpose chat and iterative builds where responsiveness matters. | Yes |

## Anthropic chat models

The Claude models accept text, image, and PDF input. Lovable adds them to newer apps (created from May 13, 2026, which use [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md)). Older React + Vite apps use the other chat models. If you are not sure which stack your project uses, [ask Lovable](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md#before-you-begin).

| Model | Best for | [Priority processing](#faster-responses-with-priority-processing) |
| - | - | - |
| [Claude Fable 5.1](https://platform.claude.com/docs/en/models/fable-5-1/overview) | Anthropic's most capable model for demanding reasoning and long-running, multi-step tasks. Premium-priced. | No |
| [Claude Opus 5.5](https://platform.claude.com/docs/en/models/opus-5-5/overview) | Long-running, multi-step coding and knowledge work. | No |
| [Claude Opus 5](https://platform.claude.com/docs/en/models/opus-5/overview) | Complex coding and multi-step tasks. | No |
| [Claude Sonnet 5](https://platform.claude.com/docs/en/models/sonnet-5/overview) | Balanced speed and intelligence for everyday chat and text work. | No |
| [Claude Haiku 4.5](https://platform.claude.com/docs/en/models/haiku-4-5/overview) | Anthropic's fastest model for straightforward, high-volume tasks. | No |

## Show the model's thinking

Many models work through a problem before they answer. Your app can show that thinking above the answer as it streams in, so people see progress during a long answer instead of waiting at a blank screen.

The summary says how the model worked through the problem. Your app shows nothing unless you ask Lovable to add it.

Ask Lovable to:

* Show the model's thinking while it answers.
* Stream the thinking into a chat interface above the reply.

This works on the model your app already uses, so you don't need to switch models to get it. Most chat models in the tables above can do it.

Thinking counts toward the answer's output, so an answer that shows its thinking costs more than the same answer without it. Answers also take longer, sometimes minutes for the most capable models. See [Usage and pricing](https://docs.lovable.dev/features/ai#usage-and-pricing).

> [!NOTE]
>
> **GPT-5.5 Pro** works differently from the other chat models: it can't be used for plain chat replies. It is the most expensive chat model available, so use it only when a task needs that depth.

## Faster responses with priority processing

When speed matters, you can ask Lovable to use **priority processing** for a chat feature. Priority processing sends the request to the model provider's faster serving tier, so responses can come back sooner during busy periods.

Ask Lovable to:

* Make an AI feature respond faster.
* Use priority processing for a chat feature.

Priority processing is available for supported chat models only. The **Priority processing** column in the tables above shows which models support it, and asking for it on any other model has no effect.

Priority processing comes at a premium price, and you pay it only when the provider serves the request at the priority tier. See [Usage and pricing](https://docs.lovable.dev/features/ai#usage-and-pricing) for how AI usage is billed.

Priority processing is not available in workspaces that have [EU inference](https://docs.lovable.dev/features/eu-inference.md) enabled.

Image, video, embedding, voice, and typed-decision models do not support priority processing.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Connect your app to Replicate](https://docs.lovable.dev/integrations/replicate.md)
- [Help users find relevant content in your app](https://docs.lovable.dev/features/ai-search.md)
