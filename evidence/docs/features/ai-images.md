# Let users generate and edit images in your app
<!-- source: https://docs.lovable.dev/features/ai-images.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Let users generate and edit images in your app

> Add image generation and editing to your app: the models available, what each is best for, masks and transparent backgrounds, and the speed and quality levels.

Image models generate and edit images from text prompts, uploaded images, or both. Use them for visual assets, product mockups, marketing imagery, and in-app image editing.

Ask Lovable to:

* Generate images from a text description.
* Edit or restyle an uploaded image.
* Create product mockups or marketing visuals.
* Produce thumbnails or illustrations on demand.
* Turn one product photo into a full set of product images.

Ask for any of these in the project chat, and Lovable writes the feature and the backend call behind it. See [Add an AI feature to your app](https://docs.lovable.dev/features/ai#add-an-ai-feature-to-your-app) for the whole flow, including publishing.

| Model | Best for |
| - | - |
| [GPT Image 2.5 Sunburst (default)](https://platform.openai.com/docs/models/gpt-image-2.5-sunburst) | Highest-quality image generation and editing when output quality or editing precision matters most, such as final assets and detailed visuals. |
| [GPT Image 2](https://platform.openai.com/docs/models/gpt-image-2) | High-quality image generation and editing for product mockups, marketing imagery, and creative content. |
| [GPT Image 2.5 Flare](https://platform.openai.com/docs/models/gpt-image-2.5-flare) | Fast image generation and editing when response time matters most, such as previews and in-app image editors. |
| [Gemini 3.1 Flash Lite Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image) | Faster, lower-cost image generation and editing for high-volume, cost-sensitive workflows. Also known as Nano Banana 2 Lite. |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image) | Detailed visuals, text rendering in images, and multi-image composition. Also known as Nano Banana Pro. |
| [Seedream 5 Pro](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-pro/) | Posters, ads, and designs built from several reference images, with accurate text rendering inside the image. Takes up to 10 reference images in one request and returns one image. Available after an admin or owner enables **ByteDance** in [Connectors](https://lovable.dev/dashboard?connectors). |

All the image models above can edit an uploaded image as well as generate new ones. Describe the change you want.

With the GPT Image models you can also limit the edit to a selected area of the image (a mask). Those models can produce images with a transparent background, as PNG or WebP files.

When you ask Lovable to add image generation to your app, you can ask for a speed or quality level instead of a specific model: fast, standard, or premium.

Lovable picks the model for each level and updates it as better models become available.


## Related topics

- [Let users generate and edit videos in your app](https://docs.lovable.dev/features/ai-video.md)
- [Let users create music in your app](https://docs.lovable.dev/features/ai-music.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Let users listen to your app's content](https://docs.lovable.dev/features/ai-text-to-speech.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
