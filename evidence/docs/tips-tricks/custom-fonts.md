# Use custom fonts
<!-- source: https://docs.lovable.dev/tips-tricks/custom-fonts.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Use custom fonts

> Apply web-safe fonts like Arial or Courier New, or use any Google Font by name or link to customize your project's typography.

You can set your project's typography with a prompt. Name a web-safe font or any [Google Font](https://fonts.google.com), and Lovable applies it and handles the loading for you. There is no dedicated upload feature for font files, but if you have your own font, you can add its files to your repository through [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) and ask Lovable to use them.

Fonts shape your app's whole personality, so pick them early and record the choice in your [project instructions](https://docs.lovable.dev/features/knowledge.md) as part of your design direction. That way every new page Lovable builds uses the right typography from the start.

## Use a web-safe font

Web-safe fonts are installed on most operating systems, so text renders consistently on every device without loading any external resources. Common web-safe fonts include Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana, Tahoma, and Trebuchet MS.

To use one, name it in your prompt:

```text wrap theme={null}
Use Courier New as the heading font in the hero section for the main title.
```

## Use a Google Font

For more distinctive typography, Lovable works well with [Google Fonts](https://fonts.google.com), a free library of over a thousand fonts. Reference a font by name and Lovable loads it and applies it:

```text wrap theme={null}
Use Playfair Display for all headings and keep Inter for body text.
```

If you are unsure of the exact name, browse [Google Fonts](https://fonts.google.com), pick a font, and paste its page link into your prompt:

```text wrap theme={null}
Use this font for the subtitles: https://fonts.google.com/specimen/Dancing+Script
```

You do not need to explain how to load or import the font. Lovable takes care of the implementation.


## Related topics

- [Send branded emails from your own domain](https://docs.lovable.dev/features/custom-emails.md)
- [Connect a custom MCP server as a chat connector](https://docs.lovable.dev/integrations/custom-mcp.md)
- [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md)
- [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md)
- [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)
