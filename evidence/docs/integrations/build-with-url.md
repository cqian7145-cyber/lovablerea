# Build with URL
<!-- source: https://docs.lovable.dev/integrations/build-with-url.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Build with URL

> Build and share Lovable apps from simple URLs, with reference images and web pages.

**Build with URL** lets you create applications by passing a prompt, and optionally reference images or web pages, through URL parameters. Embed it in a website, an internal tool, or an automation. The link opens Lovable with the prompt prefilled, and the recipient clicks send to start the build.

> [!NOTE]
>
> Build with URL prefills a prompt from a link, with no API key required. To manage existing projects programmatically over REST, use the [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md).

Each link tells Lovable *what* to build and optionally *what to reference*, such as images to work from or a live web page to draw layout and content from. For example:

```text wrap theme={null}
https://lovable.dev/#prompt=Create%20a%20todo%20app
```

This link opens Lovable with the to-do app prompt prefilled and ready to send.

> [!NOTE]
>
> Prompt links never start a build on their own. Older links that include `autosubmit=true` still work, but Lovable ignores the parameter. The prompt and attachments open unsent in the [prompt input](https://docs.lovable.dev/introduction/dashboard-overview.md#the-prompt-input), and the build starts only when the person clicks send.

## Use cases

You can do the following with Build with URL:

* Add a **Build with Lovable** button to your website or product. Anyone who clicks it opens Lovable with your prompt ready to send.
* Recreate or iterate on an existing web page by passing its URL as a reference.
* Share predefined prompts with friends, colleagues, or your audience on social media.
* Suggest a change in an existing project by linking straight into its chat. See [Prefill an existing project's chat](#prefill-an-existing-projects-chat).

You can construct the URL yourself, or use the [Lovable Link Generator](https://lovable.dev/links).

## Build a link

Start from the Lovable homepage URL and add parameters after the `#` symbol, separating them with `&`. The parameters come after `#`, not after `?` as in most URLs:

```text wrap theme={null}
https://lovable.dev/#prompt=YOUR_PROMPT&images=IMAGE_URL&html=PAGE_URL
```

### Parameters

The link accepts three parameters:

| Parameter | Type | Description | Required/Optional |
| - | - | - | - |
| `prompt` | string | The text describing what to build. Maximum 50,000 characters. Replace special characters with their URL codes (for example, `%20` for spaces). | Required |
| `images` | string | A publicly accessible image URL used as a visual reference. Repeat the key to add several (`images=URL1&images=URL2`). JPEG, PNG, and WebP only, and the URL must end in a matching extension such as `.png` or `.jpg`. | Optional |
| `html` | string | A publicly accessible web page URL. Lovable fetches the page and uses it as a reference for layout, content, and styling. Repeat the key to add several. | Optional |

### Reference limits

Lovable applies these limits to `images` and `html` references:

* `images` and `html` share a combined limit of 10 references per link.
* Every URL must be reachable over public `http` or `https`, because Lovable's servers fetch the content. Lovable skips URLs on private networks or `localhost`, and drops URLs that require a login to load.
* Lovable also drops unsupported image formats (such as SVG and GIF), invalid URLs, and references over 20 MB or too slow to fetch. The rest of the link still loads, with the prompt and the remaining references.

## Prefill an existing project's chat

Prompt links create new projects. To suggest a change in an existing project instead, add `prompt` to the project's URL as a normal `?` parameter:

```text wrap theme={null}
https://lovable.dev/projects/YOUR_PROJECT_ID?prompt=Add%20dark%20mode%20support
```

When the editor opens, Lovable writes the text into the [chat input](https://docs.lovable.dev/features/projects/chat.md) and removes the parameter from the URL, so reloading the page or going back does not apply it again. Lovable never sends the prompt automatically. Whoever opens the link reviews the text and clicks send. If the chat input already holds an unsent message, Lovable keeps that message and ignores the link's prompt. After the input is cleared, opening the link again applies it.

Use this for follow-up shortcuts, such as linking a teammate directly to a suggested edit in a shared project.

## Lovable Link Generator

Use the [Lovable Link Generator](https://lovable.dev/links) to create prompt links without encoding URLs yourself. You need to be logged in, because Lovable stores the uploads in your account.

**1. Enter your prompt**

Describe what to build, up to 50,000 characters.

**2. Add reference images**

The generator uploads each image to your Lovable account and references the upload in the link.

**3. Add reference web pages**

Paste each page's URL. The page must be publicly reachable, because Lovable's servers fetch it. Images and web pages share the same limit of 10 references per link.

**4. Copy the link and share it**

Anyone who opens the link sees your prompt and references prefilled and ready to send.

## Build with URL examples

Replace the example values with your own:

**Basic prompt link**

```text wrap theme={null}
https://lovable.dev/#prompt=Create%20a%20todo%20app
```

**Reference image**

```text wrap theme={null}
https://lovable.dev/#prompt=Build%20a%20landing%20page%20with%20this%20logo&images=https://img.com/logo.png
```

**Reference an existing web page**

```text wrap theme={null}
https://lovable.dev/#prompt=Recreate%20this%20page&html=https://example.com/index.html
```

**Web page and image together**

```text wrap theme={null}
https://lovable.dev/#prompt=Rebuild%20this%20page%20with%20our%20logo&html=https://example.com/index.html&images=https://img.com/logo.png
```

**Prefill an existing project's chat**

```text wrap theme={null}
https://lovable.dev/projects/YOUR_PROJECT_ID?prompt=Add%20dark%20mode%20support
```

## Best practices

Follow these practices for reliable prompt links:

* Keep prompts concise and focused on core features.
* For `html`, use a standard web page. Lovable may skip pages it cannot read as HTML.
* Make sure every image and page URL is publicly reachable.
* Use clear, descriptive language for the best results.
* Replace special characters in the prompt and in URLs with their URL codes to avoid parsing issues.

## Opening a link logged in or logged out

What the person opening a prompt link sees depends on whether they are logged in:

* **Logged in**: Lovable opens with the prompt and references prefilled. They review the text and click send to start the build.
* **Logged out, homepage link** (`lovable.dev/#...`): the prompt still prefills immediately. When they click send, Lovable asks them to sign up or log in, then starts the build with the original prompt and references preserved.
* **Logged out, Link Generator link**: they sign up or log in first, and the prompt then appears prefilled and ready to send.

## Limitations

Two limits can make a link fail as a whole:

* Lovable does not shorten a prompt over the 50,000-character limit. It discards the whole link, and the prompt input stays empty.
* Very long URLs can exceed browser length limits. Use the Link Generator for long prompts.

## FAQ

> **Do prompt links still build the app automatically?**
>
> No. Every prompt link, including older links with `autosubmit=true`, opens the prompt and attachments unsent. The build starts when the person clicks send.

> **Which image formats can I reference?**
>
> JPEG, PNG, and WebP, and the image URL must end in a matching file extension. Lovable drops other formats, such as SVG and GIF.

> **Do my image and page URLs need to be public?**
>
> Yes. Lovable's servers fetch them, so URLs on private networks, `localhost` URLs, and URLs that require a login do not load. The Link Generator instead uploads images to your account.

> **How many references can I add to one link?**
>
> Up to 10 in total, combining images and web pages.

> **What happens when a logged-out user clicks a link?**
>
> The prompt still opens prefilled. Homepage links prefill immediately and ask them to sign up or log in when they click send. Link Generator links ask them to log in first and then show the prefilled prompt. Either way, Lovable preserves the prompt and references, and the build starts only when they click send.

> **Can I prefill the chat for an existing project?**
>
> Yes. Open `https://lovable.dev/projects/YOUR_PROJECT_ID?prompt=YOUR_PROMPT`. Lovable writes the text into the project's chat input without sending, and Lovable removes the parameter from the URL after applying it.


## Related topics

- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Quick start](https://docs.lovable.dev/introduction/getting-started.md)
- [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md)
- [Import a website into Lovable from its URL](https://docs.lovable.dev/features/projects/import-website.md)
- [Build a Shopify store with AI](https://docs.lovable.dev/integrations/shopify.md)
