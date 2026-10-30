# Add transcription and voice input to your app
<!-- source: https://docs.lovable.dev/features/ai-speech-to-text.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add transcription and voice input to your app

> Turn recordings, voice notes, and spoken input into text with speech-to-text models, including the file size each model accepts and how to split long audio.

Speech-to-text models turn spoken audio into text, so people can talk to your app instead of typing and your app can work with what they said.

Upload a voice note, call recording, or meeting audio, and the app transcribes it. Lovable streams the transcript as it is produced. Each model caps the size of one audio file, so ask Lovable to transcribe long recordings in segments.

Ask Lovable to:

* Build a meeting assistant that turns a recording into notes and action items.
* Add voice input or dictation so users can speak instead of type.
* Transcribe and search voice memos.
* Caption or subtitle uploaded audio.
* Let customers explain what they need in a voice note instead of a form.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [GPT Transcribe (default)](https://developers.openai.com/api/docs/models/gpt-transcribe) | Accurate transcription of names and specialist vocabulary. Your app can pass context, expected keywords, and languages as hints. |
| [Gemini 3.5 Transcribe](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-transcribe) | Transcription with automatic language detection across more than 85 languages. Handles filler words and self-corrections. |

GPT Transcribe accepts audio files up to 25 MB. Gemini 3.5 Transcribe accepts audio files up to 14 MB.

For a two-way spoken conversation, such as a voice assistant or a live translator, use a [live voice model](https://docs.lovable.dev/features/ai-live-voice.md) rather than combining text-to-speech with speech-to-text.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Connect ElevenLabs to enable voice AI in your app](https://docs.lovable.dev/integrations/eleven-labs.md)
- [Connect your app to Twilio](https://docs.lovable.dev/integrations/twilio.md)
- [Add chatbots and text generation to your app](https://docs.lovable.dev/features/ai-chat.md)
