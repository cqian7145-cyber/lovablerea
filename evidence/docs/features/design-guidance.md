# Design guidance
<!-- source: https://docs.lovable.dev/features/design-guidance.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Design guidance

> Answer Lovable's design questions about color, typography, and layout before it builds, so the first version matches the look you want.

**Design guidance** helps you shape the look of your project before Lovable starts building. Depending on your prompt, Lovable either:

* asks a short set of **design questions** about color, typography, and layout, or
* **builds directly** when the visual direction is already clear.

Design questions help you steer the look when you have preferences but have not spelled them out, so the first build is closer to what you intended and needs fewer revisions. Design guidance is available on all plans.

## Key benefits

* **Steer the visual identity.** Choose the color palette, typography, and layout before Lovable writes any code.
* **Decide visually.** Options appear as color swatches, font samples, and layout wireframes, so you compare looks instead of describing them.
* **Fewer revisions.** Lovable applies your choices from the first build, so you spend less time correcting the look afterwards.
* **Stay in control.** Pick an option, write your own preference, or skip the questions. Lovable builds either way.

## Design questions

When your prompt leaves the look open, Lovable shows a question card in chat before it builds (in [Plan mode](https://docs.lovable.dev/features/plan-mode.md), before it writes the plan). The card has up to four questions. Three of them are design questions, each with up to four options that Lovable picks to fit your project:

* **Color palette**\
  Palettes shown as color swatches, from dark and moody to light and clean, warm and earthy, bold and vibrant, soft pastel, nature-inspired, and professional.
* **Typography**\
  Heading and body font pairs, each shown in its own fonts, such as a geometric pair for a tech product or an editorial serif pair for a magazine.
* **Layout**\
  Page structures shown as wireframes: hero grid, single column, split screen, sidebar, masonry, bento grid, magazine, dashboard, full-width sections, zigzag, card grid, asymmetric, broken grid, feed, or gallery.

Lovable can add one more question when the project needs it, for example what content the site will have.

Lovable preselects the first option in each question. Change any pick, or write your own preference in the text field under each design question. To answer none of them, select **Skip all**. Lovable then chooses reasonable defaults for the work you asked for. For how question cards work, see [Answer Lovable's questions](https://docs.lovable.dev/features/projects/chat.md#answer-lovable’s-questions).

After you submit, Lovable applies your choices directly. It uses the fonts you picked, the exact palette colors, and the layout structure, and it derives details such as spacing, corner radius, and animation intensity from them.

### When design questions appear

Lovable asks design questions when your request involves visual design but leaves the direction open. This is common for landing pages, portfolios, blogs, marketing sites, and other visually expressive apps. Prompts like these lead to design questions:

```text wrap theme={null}
Build me a portfolio site
Create a landing page for my startup
Make a travel blog
Build me a beautiful app for tracking habits
```

## When Lovable builds directly

Lovable skips design questions and builds directly when:

* your prompt gives a specific design direction, such as named fonts, colors, a brand, or a style like "minimal black and white with Swiss typography",
* the request is purely functional, such as a to-do app, a calculator, or adding authentication,
* the app type has standard defaults, such as dashboards, admin panels, and apps that mainly manage records,
* the project was created from a template, including [design templates](https://docs.lovable.dev/features/business/design-templates.md), or is connected to a [design system](https://docs.lovable.dev/features/design-systems.md), because the design is already set.

To build without design questions, describe the look in your prompt. The style vocabulary and ready-made design prompts in the [prompt library](https://docs.lovable.dev/prompting/prompting-library.md#design-and-style) help you write a brief that Lovable builds from directly.

## FAQ

> **Can I bring my own typeface or palette?**
>
> Yes. Write the font or colors in the text field under the question instead of picking an option, or name them in your prompt. To share fonts, colors, and components across projects, connect a [design system](https://docs.lovable.dev/features/design-systems.md).

> **What happens if I skip the design questions?**
>
> Lovable continues with reasonable defaults for the work you asked for. It does not start additional work because you skipped. You can change the look at any time by describing the change in chat.

> **Can I change the design after the build?**
>
> Yes. Describe the change in chat, or use the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) to select an element and describe what to change. To keep the design consistent in later prompts, save your fonts, colors, and style keywords to your project [instructions](https://docs.lovable.dev/features/knowledge.md).

> **Does this work for dashboards or internal tools?**
>
> Lovable asks design questions where the look matters most, such as landing pages, marketing sites, blogs, and portfolios. Dashboards, admin panels, and apps that mainly manage records use Lovable's standard build flow. You can still request a specific look for them in your prompt.

> **What happens if I'm using a design system or template?**
>
> Lovable skips design questions and builds with the existing tokens, components, and visual rules from the template or design system.

> **Does this cost extra credits?**
>
> No. Design questions are part of the message you send and do not add credit costs beyond that message.


## Related topics

- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Glossary](https://docs.lovable.dev/glossary.md)
- [How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
