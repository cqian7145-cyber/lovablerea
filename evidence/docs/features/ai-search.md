# Help users find relevant content in your app
<!-- source: https://docs.lovable.dev/features/ai-search.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Help users find relevant content in your app

> Add semantic search, retrieval-augmented generation (RAG), and knowledge bases to your app with embedding models, and see which model fits which workload.

Embedding models turn content into a format that can be searched by meaning instead of exact keywords. Use them for semantic search, retrieval-augmented generation (RAG), FAQ bots, document search, and knowledge bases.

Ask Lovable to:

* Build semantic search over uploaded documents.
* Create a FAQ bot that answers from your help content.
* Build a company knowledge base that finds relevant internal docs.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [Gemini Embedding 2 (default)](https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2) | General-purpose semantic search, document retrieval, and recommendations, including multimodal retrieval across text, images, video, and audio. |
| [Gemini Embedding 001](https://ai.google.dev/gemini-api/docs/models/gemini-embedding-001) | Older text-only model. Use it only when your app already stores search data created with it. |
| [text-embedding-3-small](https://developers.openai.com/api/docs/models/text-embedding-3-small) | Cost-sensitive or high-volume text embedding workloads. |
| [text-embedding-3-large](https://developers.openai.com/api/docs/models/text-embedding-3-large) | Higher-quality text retrieval when accuracy matters more than cost. |


## Related topics

- [Let users listen to your app's content](https://docs.lovable.dev/features/ai-text-to-speech.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Connect your app to Fireflies](https://docs.lovable.dev/integrations/fireflies.md)
- [Connect your app to Zendesk](https://docs.lovable.dev/integrations/zendesk.md)
- [Advertise your app](https://docs.lovable.dev/features/ads.md)
