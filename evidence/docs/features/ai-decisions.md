# Automate classification, routing, and scoring in your app
<!-- source: https://docs.lovable.dev/features/ai-decisions.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Automate classification, routing, and scoring in your app

> Use typed decision models to turn text your app already has into a category, a score, or a yes/no probability it can act on in code, instead of generated prose.

Typed decision models judge text and answer with something your app can act on: a category, a score, or a probability between 0 and 1. They do not write sentences, so keep replies, summaries, and free-form extraction on a [chat model](https://docs.lovable.dev/features/ai-chat.md).

The typed decision model is Jev 1.13, from TypeSafe. You give the app some text, such as a ticket, a comment, or a list of candidates, and the questions you want answered.

Ask Lovable to:

* Route support tickets to a team or queue, with a catch-all when nothing fits.
* Flag comments against several independent policy rules.
* Rank search results, products, or candidates by relevance.
* Score quality on separate dimensions, then combine the scores in your app.
* Check a proposed answer against source text you already retrieved.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [Jev 1.13](https://docs.typesafe.ai/concepts/system-one) | Structured decisions from text: classification, routing, scoring, and yes/no probabilities. |

Jev evaluates text only. For images, audio, or video, transcribe or describe the content first. You can also use a chat or embedding model that accepts that media. Jev is trained primarily on English, so test other languages before you rely on them.

Jev 1.13 is not available in workspaces that have [EU inference](https://docs.lovable.dev/features/eu-inference.md) enabled.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Add chatbots and text generation to your app](https://docs.lovable.dev/features/ai-chat.md)
- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect your app to Mapbox](https://docs.lovable.dev/integrations/mapbox.md)
- [Connect your app to Apify](https://docs.lovable.dev/integrations/apify.md)
