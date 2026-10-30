# Let users create music in your app
<!-- source: https://docs.lovable.dev/features/ai-music.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Let users create music in your app

> Add music generation to your app: the two models, how to describe a track in the prompt, how long a finished track stays available, and what a track costs.

Music models generate music from a text prompt, with vocals or as an instrumental. You can also attach an image for inspiration. Use music models for music makers, soundtracks, jingles, and background music in your app.

Ask Lovable to:

* Build a music maker where people describe a track and play the result.
* Add a soundtrack to a story, lesson, or product page.
* Generate an instrumental background track in a style you describe.
* Turn lyrics you provide into a song.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [Lyria 3 Clip Preview](https://ai.google.dev/gemini-api/docs/models/lyria-3-clip-preview) | Clips of about 30 seconds with vocals or instrumentals, for previews, jingles, and short loops. |
| [Lyria 3 Pro Preview](https://ai.google.dev/gemini-api/docs/models/lyria-3-pro-preview) | Full tracks up to 184 seconds with vocals or instrumentals. |

Neither model is a default, so name the one you want when you ask Lovable for music.

Describe the track in the prompt: genre, mood, tempo, instruments, and singing language. One request, including the prompt and any image, must stay under 1 MB. To use your own lyrics, include them in the prompt. For a full track, you can also describe the sections in order, such as an intro, a verse, and a chorus.

On Lyria 3 Pro Preview, you can ask for a length in the prompt to guide the track length.

A finished track arrives as one MP3 file when the whole track is generated, so your app shows a waiting message until then. Lovable does not store generated tracks. To let people play a track again later, ask Lovable to save it to your app's own storage.

Generating music uses credits, charged per track when it completes, even if your app stops waiting for it. Failed generations are not charged. Music models are not available while [EU inference](https://docs.lovable.dev/features/eu-inference.md) is enabled.


## Related topics

- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Let users generate and edit images in your app](https://docs.lovable.dev/features/ai-images.md)
- [Let users listen to your app's content](https://docs.lovable.dev/features/ai-text-to-speech.md)
- [Let users generate and edit videos in your app](https://docs.lovable.dev/features/ai-video.md)
- [Connect your app to Telegram](https://docs.lovable.dev/integrations/telegram.md)
