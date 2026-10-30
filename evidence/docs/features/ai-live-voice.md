# Build voice assistants your users can talk to
<!-- source: https://docs.lovable.dev/features/ai-live-voice.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Build voice assistants your users can talk to

> Add a two-way spoken conversation to your app: people talk and interrupt, your backend does work during the call, and your app speaks the result back.

Live voice models let the people who use your app talk with it in a two-way spoken conversation. They listen and answer in real time, and let people interrupt. During a call they can have your app's backend do work, such as looking up a record or saving a booking, and then speak the result.

> [!NOTE]
>
> This page is about voice features inside the apps you build. Looking to talk to Lovable by voice while you build? See [voice conversations in Chats](https://docs.lovable.dev/features/chats.md#have-a-live-voice-conversation) and [dictation in the project chat](https://docs.lovable.dev/features/projects/chat.md#the-prompt-box). Those are different features.

Ask Lovable to:

* Build a voice tutor or coach that talks with the learner and adapts to the answers it hears.
* Add a spoken assistant that looks up orders, bookings, or account details while the person is talking.
* Build a hands-free helper that guides someone through a task step by step.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [GPT-Live 1](https://platform.openai.com/docs/models/gpt-live-1) | Real-time voice conversations with interruptions and backend actions. |

Live voice works in apps that use TanStack Start, both in the preview and in your published app. For an older React + Vite app, Lovable offers to [upgrade it to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) first.

Live voice does not need a database or a user login. A call ends automatically after 2 minutes without speech, and after 1 hour at most.


## Related topics

- [Let users listen to your app's content](https://docs.lovable.dev/features/ai-text-to-speech.md)
- [Add transcription and voice input to your app](https://docs.lovable.dev/features/ai-speech-to-text.md)
- [Connect ElevenLabs to enable voice AI in your app](https://docs.lovable.dev/integrations/eleven-labs.md)
- [Chat with Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
