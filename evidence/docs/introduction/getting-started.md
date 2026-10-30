# Quick start
<!-- source: https://docs.lovable.dev/introduction/getting-started.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick start

> Build and publish your first Lovable app in about ten minutes, from your first prompt to a live URL you can share.

Build your first app and put it live on the web with about ten minutes of hands-on time. There is nothing to install and nothing to configure. You describe what you want, Lovable builds it, and you publish it to a real URL you can share.

In this guide you build a website for **Little Fern**, an imaginary neighborhood cafe: a homepage with an interactive menu, opening hours, and a location section. It is a stand-in for anything you would rather build, so swap in your own idea at any step, or start from a [Lovable template](https://lovable.dev/templates) if you would rather begin from a working app. When you finish, [How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md) shows you how to take on the full journey.

> [!NOTE]
>
> Building with Lovable uses [build credits](https://docs.lovable.dev/introduction/credits-and-usage.md), and the free plan includes five per day, up to 30 per month. See [subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) for what each plan includes.

**1. Create your account**

[Sign up for free](https://lovable.dev/signup?utm_source=lovable_docs\&utm_medium=content\&utm_content=getting-started) with email, Google, GitHub, or Apple. Your account comes with a personal workspace on the free plan, and Lovable opens the dashboard, ready to build. For single sign-on (SSO) and other sign-up details, see [Create an account](https://docs.lovable.dev/introduction/create-an-account.md).

You can also skip ahead: type your prompt on the homepage first, and Lovable asks you to sign up when you submit, keeping your prompt through sign-up.

**2. Describe your app**

The prompt box ("Ask Lovable to create…") is front and center. With **Build** selected in the mode picker, it is where every project starts. Describe what you want to build in plain language, **in any language**.

Try this prompt, or adapt it to your own idea:

```text wrap theme={null}
Build a website for Little Fern, a neighborhood cafe. Include a warm hero section with a headline and a photo, an interactive menu where visitors filter items by category (coffee, breakfast, lunch, pastries), an opening hours section, and a location section with the address and a short "find us" description. Use realistic sample content throughout. Cozy, welcoming design. Works well on mobile. No login or database yet.
```

The last line of the prompt matters. Keeping your first version free of logins and databases means there is less to go wrong, and you can add both later with a single prompt.

> **Use your own idea instead**
>
> Adapt one of these starters, or write your own prompt from scratch. The steps in this guide stay the same.
>
> ```text wrap theme={null}
> Build an internal tool for tracking my team's equipment: a searchable table of items with name, owner, status, and return date, plus a form to add new items. Use realistic sample data. No login or database yet.
> ```
>
> ```text wrap theme={null}
> Build a dashboard for a subscription business showing monthly revenue, active customers, and churn as charts, with a recent signups table. Use realistic sample data. No login or database yet.
> ```
>
> ```text wrap theme={null}
> Build an online store front for a ceramics studio: a product grid with photos and prices, a product detail page, and an About page. Use realistic sample products. No checkout or database yet.
> ```

> **Start from a Lovable template instead**
>
> If you would rather begin from a working app than a blank prompt, browse [Lovable templates](https://lovable.dev/templates), open one you like, and remix it. Remixing creates your own independent copy that you can edit freely, on any plan. The rest of this guide still applies: you refine the app in chat and publish it the same way. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).

**3. Watch the first version appear**

Lovable creates your project and starts building. The first version takes a few minutes, and you can watch it take shape as Lovable works.

When it is ready, you are in [the editor](https://docs.lovable.dev/features/projects/editor.md), which has two halves: the [**project chat**](https://docs.lovable.dev/features/projects/chat.md) on the left, where you talk to Lovable, and the [**preview**](https://docs.lovable.dev/features/projects/preview.md) on the right, where your app runs live. Click around the preview: try the menu filters, scroll the sections.

Everything you see is a real, working app, and the code behind it is yours. From here on, every change is saved as a [version you can restore](https://docs.lovable.dev/features/projects/history.md), so nothing you do next can break it permanently.

**4. Make a change**

Ask for one change at a time and check the preview after each. For example:

```text wrap theme={null}
Add a "Today's specials" section between the menu and the opening hours, highlighting two menu items with a short description and price.
```

If the app works but does not look or feel like you pictured, say that in plain words too. This is a perfectly good prompt:

```text wrap theme={null}
Make the whole site feel warmer and less corporate.
```

**5. Tweak it by pointing**

For small visual changes, pointing beats describing. Open the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md), select the exact element, and say what should change. To change text, such as a headline or a button label, use **Edit text inline** and type directly on the page. No prompt needed.

**6. Check that it works**

Before publishing, spend a few moments testing your app. A quick check now saves a round of confused messages from the first person you send the link to:

* Click every button and link.
* Try the interactive parts: filter the menu by every category.
* Click the device toggle above the [preview](https://docs.lovable.dev/features/projects/preview.md) to cycle to **Mobile view**. Most people will open your link on their phone.

If something is off, tell Lovable exactly what is wrong and where:

```text wrap theme={null}
In the menu, clicking the pastries filter shows no items. It should show the pastry items.
```

**7. Publish**

Click [**Publish**](https://docs.lovable.dev/features/publish.md) in the top right of the editor. Lovable suggests a `lovable.app` web address, which you can edit before publishing. Click **Publish** again to deploy. After a short deploy, your app is live at your own `lovable.app` URL, free on every plan. Send the link to a friend, or [invite them to the project](https://docs.lovable.dev/features/share-project.md) to build together.

And the single most common surprise for new users: **your live site is a snapshot**. Later changes appear in the preview immediately, but the live site only updates when you click **Publish → Publish changes**.

That is the whole loop: describe, refine, publish. Every app you build in Lovable, however ambitious, is this loop repeated.

## Other ways to start a project

A typed prompt is the most common starting point, but not the only one:

* **Attach a design or screenshot**: Add images to your first prompt, such as a mockup, a sketch, or a screenshot of a site whose layout you like, and Lovable uses them as a visual reference. See [Attach files as context](https://docs.lovable.dev/features/projects/chat.md#attach-files-as-context).
* **Remix a template**: Browse [Lovable templates](https://lovable.dev/templates) and remix one to start from a working app instead of a blank page. You can remix your own projects too. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).
* **Build from a link**: Generate a project from a URL that carries the prompt, useful for sharing predefined prompts. See [Build with URL](https://docs.lovable.dev/integrations/build-with-url.md).
* **Start from a chat**: Talk the idea through in [Chats](https://docs.lovable.dev/features/chats.md) and, when you ask Lovable to build it, approve the **Create a new project?** card. See [Send work to a project](https://docs.lovable.dev/features/chats.md#send-work-to-a-project).

For the full list, see [Ways to create a project](https://docs.lovable.dev/features/projects/overview#ways-to-create-a-project).

> [!TIP]
>
> Lovable also works beyond the browser: build from the [desktop app](https://docs.lovable.dev/integrations/desktop-app.md) or the [mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md), chat with Lovable in [Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md) or [Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md), start projects from [ChatGPT](https://docs.lovable.dev/tips-tricks/chatgpt-app.md), and drive Lovable from your own AI tools with the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md).

## Keep going

> **[How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md)**
>
> Ready for a real product? The full journey: shape an idea, plan, build in loops, add a backend, test, publish, and grow.

> **[Prompting basics](https://docs.lovable.dev/prompting/prompting-one.md)**
>
> Get better results with clearer prompts.

> **[Follow the Academy learning path](https://academy.lovable.app/academy/learning-path)**
>
> Build a second app in a series of short guided lessons.

> **[Add a backend](https://docs.lovable.dev/features/cloud)**
>
> Store data and sign in users.

> **[Launch on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)**
>
> Publish, put your app on your own domain, and help people find it.


## Related topics

- [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)
- [Dashboard overview](https://docs.lovable.dev/introduction/dashboard-overview.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Video tutorials and courses](https://docs.lovable.dev/introduction/video-tutorials.md)
