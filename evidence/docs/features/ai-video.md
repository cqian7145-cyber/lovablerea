# Let users generate and edit videos in your app
<!-- source: https://docs.lovable.dev/features/ai-video.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Let users generate and edit videos in your app

> Add video generation to your app: the models and what they differ on, starting from your own images, editing and extending a clip, and what generation costs.

Video models generate short video clips, with or without sound. You describe the scene in a text prompt, or provide an image for the model to bring to life. Use them for product teasers, animated social posts, background loops, and storyboard previews.

Ask Lovable to:

* Generate a video clip from a text description.
* Animate an uploaded image into a short clip.
* Produce a vertical clip for social media.
* Feature a specific product, person, or character in a new scene by supplying reference photos of the subject.
* Turn two images into a clip that starts on one and ends on the other.
* Change what an existing video shows by describing the edit, whether the clip was generated earlier or uploaded by your app's users.
* Extend an existing video to build a longer one.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [Gemini Omni 1.1 Flash (default)](https://ai.google.dev/gemini-api/docs/omni) | The latest generation: fast, low-cost clips from 360p drafts up to 4K, plus editing and extending existing videos, including uploaded footage. |
| [Seedance 2.5](https://developers.cloudflare.com/ai/models/bytedance/seedance-2.5/) | Clips of 4 to 30 seconds at 480p or 720p, with synchronized sound, reference images, video, and audio, plus editing and extending existing clips. Ask for sound explicitly when you want it, and note that it declines reference images of real people. Available after an admin or owner enables **ByteDance** in [Connectors](https://lovable.dev/dashboard?connectors). |
| [Veo 3.1 Lite](https://ai.google.dev/gemini-api/docs/video) | Low-cost clips for drafts, social posts, and high-volume use. Doesn't support 4K. |
| [Veo 3.1 Fast](https://ai.google.dev/gemini-api/docs/video) | Better quality at moderate cost, with 4K support. |
| [Veo 3.1](https://ai.google.dev/gemini-api/docs/video) | The highest quality and by far the most expensive. |

On Enterprise workspaces, Gemini Omni 1.1 Flash is available only after an admin enables [Extended-retention models](https://docs.lovable.dev/features/privacy-and-security-settings.md#extended-retention-models) and accepts the terms shown there. Until then, Veo 3.1 is the default.

## Compare the video models

A clip from Gemini Omni 1.1 Flash or a Veo model arrives as an MP4 file, in landscape (16:9) or portrait (9:16). Gemini Omni 1.1 Flash always generates a soundtrack, and on the Veo models you ask for sound when you want it.

Gemini Omni 1.1 Flash and the Veo models differ in clip length, resolutions, and what they can do with existing footage:

| | Gemini Omni 1.1 Flash | Veo models |
| - | - | - |
| Clip length | 3 to 10 seconds, at any resolution. | 4, 6, or 8 seconds for a new clip. 1080p and 4K clips are always 8 seconds. |
| Resolutions | 360p, 720p, 1080p, and 4K. The 1080p output is upscaled from a lower resolution. | 720p, 1080p, and 4K. 4K needs Veo 3.1 Fast or Veo 3.1. |
| Reference photos | Any clip length, up to 10 images in one request. Can be combined with other inputs. | Needs Veo 3.1 or Veo 3.1 Fast, 1 to 3 photos, and an 8-second clip. Can't be combined with other inputs. |
| Editing | Videos up to 10 seconds long and about 45 MB, generated or uploaded. | Not supported. |
| Extension | Adds 3 to 10 seconds to the end of the clip per extension, up to about 40 seconds in total. Works on generated and uploaded videos up to about 45 MB. | Adds 7 seconds per extension to a clip the model generated. |
| Input billing | Attached images and clips add a small charge, billed as input tokens. | Inputs are not charged. |

On Gemini Omni 1.1 Flash, a 360p clip costs about a third of the same clip at 720p, which makes 360p a low-cost way to draft a clip before regenerating it at full quality.

## Start from your own images

Instead of describing everything in text, you can start from your own images:

* **Animate an uploaded image.** The clip starts from your exact photo and sets it in motion, so the photo's scene and framing stay.
* **Supply two images as the first and last frame.** The model generates the motion between them, which is a simple way to make a transition between two visuals. This works on Gemini Omni 1.1 Flash, Veo 3.1, and Veo 3.1 Fast.
* **Supply reference photos of a subject.** Provide photos of the same product, person, or character, and the model places that subject into a freshly generated scene described by your prompt. Unlike animating a photo, nothing from the photos appears directly in the clip: the photos only fix what the subject looks like, and the scene around it is newly generated. Several angles of the same subject improve fidelity.

## Edit and extend a video

Gemini Omni 1.1 Flash also works with existing footage, whether Lovable generated it earlier or your app's users uploaded it. To edit a video, describe one change, such as swapping the background or replacing an object, and Lovable regenerates the clip with that change applied at the same length.

To build a longer video, ask Lovable to extend a clip: each extension continues the same scene and produces a single merged video, which you can extend again. The Veo models can also extend clips they generated. Either way, only the new seconds are billed.

## Generation time, storage, and cost

Generating a clip usually takes 1 to 3 minutes, so video works differently from chat or images: the clip is generated in the background, and your app checks on it until it is done.

Write the prompt in English. Google recommends it for these models. The Veo models also rewrite the prompt before generating, so the finished clip follows the intent of your prompt rather than its exact wording.

A finished clip stays available to your app for 48 hours. If your app should show a video again later, or keep it permanently, ask Lovable to save it to your app's own storage.

Generating video uses credits. The model, the resolution, and the length decide what a clip costs, and a single clip costs far more than a typical chat response. You are charged when a generation completes, even if your app stops waiting or never shows the clip. Failed generations are not charged.

Each project also generates a limited number of clips at the same time: 1 on Free plans, and up to 10 on paid plans. See [Usage and pricing](https://docs.lovable.dev/features/ai#usage-and-pricing) and [Workspace rate limits](https://docs.lovable.dev/features/ai#workspace-rate-limits).


## Related topics

- [Let users generate and edit images in your app](https://docs.lovable.dev/features/ai-images.md)
- [Let users create music in your app](https://docs.lovable.dev/features/ai-music.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Let users listen to your app's content](https://docs.lovable.dev/features/ai-text-to-speech.md)
- [Growth tools](https://docs.lovable.dev/features/growth-tools.md)
