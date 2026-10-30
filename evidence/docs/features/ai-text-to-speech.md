# Let users listen to your app's content
<!-- source: https://docs.lovable.dev/features/ai-text-to-speech.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Let users listen to your app's content

> Add spoken audio to your app with text-to-speech models: read articles aloud, narrate generated text, and describe the tone or pacing you want.

Text-to-speech models turn text into spoken audio, so your app can read content aloud, narrate generated text, or talk back.

Lovable streams the speech as it is generated, so playback can begin before the full clip is ready. You can describe the tone or pacing you want in plain language, for example "speak slowly and warmly".

Ask Lovable to:

* Add a "read aloud" button that speaks an article or summary.
* Narrate AI-generated stories, lessons, or briefings.
* Turn a book or document into an audiobook.
* Speak an assistant's replies aloud.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [Gemini 3.1 Flash TTS Preview (default)](https://ai.google.dev/gemini-api/docs/speech-generation) | Newest Gemini speech model, in preview. |
| [Gemini 2.5 Flash TTS](https://ai.google.dev/gemini-api/docs/speech-generation) | Cost-effective speech for everyday and high-volume voice features. |
| [Gemini 2.5 Pro TTS](https://ai.google.dev/gemini-api/docs/speech-generation) | Higher-fidelity speech when voice quality matters most. |


## Related topics

- [Let users generate and edit images in your app](https://docs.lovable.dev/features/ai-images.md)
- [Let users create music in your app](https://docs.lovable.dev/features/ai-music.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Let users generate and edit videos in your app](https://docs.lovable.dev/features/ai-video.md)
- [Help users find relevant content in your app](https://docs.lovable.dev/features/ai-search.md)
