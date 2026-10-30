# Upgrade a project to TanStack Start
<!-- source: https://docs.lovable.dev/features/upgrade-to-tanstack-start.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Upgrade a project to TanStack Start

> Upgrade an older React + Vite project to TanStack Start, Lovable's latest template, so your pages render on the server, improving search visibility and social link previews.

If your project was built on Lovable's older React + Vite stack, you can upgrade it in place to [TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start), Lovable's latest template, which renders your pages on the server. After the upgrade, your app gets:

* Readable pages on every request, for every visitor and every tool, not just verified crawlers
* Reliable social link previews, with your title, description, and image
* A faster first page load, because the browser receives finished content
* Compatibility with newer Lovable features that need TanStack Start, such as [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md) and [live voice conversations in your app](https://docs.lovable.dev/features/ai-live-voice.md)

The upgrade happens inside your existing project: Lovable rewrites the project's page structure and carries your design, content, and backend across. Your published site keeps serving the old version until you publish again, and you can revert the whole upgrade from your project's version history.

## What server-side rendering means

An older React + Vite app sends the browser a mostly empty page, and the visitor's browser then builds the content with JavaScript. Visitors see the finished app, and Lovable serves pre-rendered copies of your published pages to verified search engines and social preview bots so they can read your content too, as described in [SEO and AEO](https://docs.lovable.dev/features/seo-aeo.md). Tools outside that verified list see very little.

TanStack Start goes further: it renders each page into finished HTML on the server before sending it. Everyone receives the same complete page, every time: visitors, search engines, AI crawlers, link preview bots, and any other tool. This is called server-side rendering (SSR).

## Before you begin

Check eligibility, permissions, and cost before you start:

* The upgrade is for older Lovable projects built on React + Vite, the stack Lovable used before TanStack Start. Newer projects already use TanStack Start: it became the default for new projects on May 13, 2026, and for new Enterprise projects on June 22, 2026.
* Anyone with permission to edit the project can start an upgrade, on all plans.
* The upgrade is treated as standard build usage and consumes credits. Most upgrades cost 10 to 35 credits, depending on how large your project is. If your workspace balance is low when you start, Lovable warns you that the upgrade may need a top-up partway through.
* If your project is not eligible, the upgrade option does not appear in project settings or the chat menu, and Lovable explains why if you ask it to upgrade anyway.

If you are not sure which stack your project uses, ask Lovable:

```text wrap theme={null}
What stack is this project on?
```

## Start the upgrade

You can start the upgrade in three ways, and each asks you to confirm before anything changes:

* **From the project chat**: type `/`, choose **Migrate to TanStack Start**, and confirm in the dialog.
* **From [project settings](https://docs.lovable.dev/features/projects/settings.md)**: under **General → Project actions**, find **Migrate to TanStack Start** and select **Migrate**. After you confirm, you land in the editor and the upgrade starts on its own.
* **By asking Lovable** in your own words:

```text wrap theme={null}
Upgrade my app to TanStack Start so my pages render on the server and my link previews work.
```

When you ask in the project chat, Lovable replies with a confirmation card titled **Migrate to TanStack Start** that explains what the upgrade does and what it costs. Select **Start migration** to begin, or **Cancel** to leave the project as it is.

Lovable may also suggest the upgrade when you ask about something that needs server-side rendering, such as blank link previews or a page that does not show up in search results. Lovable never starts an upgrade without your confirmation.

## What happens during the upgrade

Lovable works through your project in a single run:

1. Takes an inventory of your pages, including any you protect behind a sign-in or an admin check, so the same protection carries over
2. Converts your app's page structure to TanStack Start
3. Moves your page titles, descriptions, social preview tags, and analytics scripts into the new template, so your search and analytics setup keeps working
4. Carries over your theme and styling customizations
5. Moves backend code that only your own app uses into the new template
6. Builds the project, checks it for errors, and loads every page to confirm it works

Backend code that outside services call directly, such as a payment provider that notifies your app when a payment succeeds, a scheduled job that runs on a timer, or an AI assistant connected to your app, keeps its web address: Lovable leaves it where it runs today, and your integrations keep working without any reconfiguration.

You can follow along in the project chat. A large project may not finish in one go: the upgrade pauses, tells you what is done and what is left, and continues when you ask. When the upgrade finishes, review your app in the preview.

## Review, publish, or revert

The upgrade changes your project, not your live site. Visitors keep seeing the version you published last until you publish again, so take as long as you need to review the upgraded app first.

If the upgraded app is not what you wanted, revert it from your project's [version history](https://docs.lovable.dev/features/projects/history.md) the same way you undo any other change: open the history, find the version before the upgrade started, and restore it. Your project returns to the older stack, and your published site is unaffected, because the upgrade never changed it.

## Limitations

Keep these in mind before you start:

* One upgrade runs per project at a time. If an upgrade appears stuck, you can revert and start it again.
* If visitors installed your app on their device as a Progressive Web App (PWA), their devices keep a saved copy of the old version. Lovable removes that old copy automatically for returning visitors in most cases, and tells you during the upgrade if yours needs a manual follow-up.
* Some code libraries only work in the browser and can break server rendering in ways the upgrade's checks do not catch. Test your pages after upgrading, and tell Lovable about any page that fails to load.

## FAQ

> **Do I have to upgrade?**
>
> No. Older React + Vite projects keep working, and search engines can still read them through pre-rendering, as described in [SEO and AEO](https://docs.lovable.dev/features/seo-aeo.md). Upgrade when you want full server-side rendering, reliable link previews, and faster first loads.

> **Does the upgrade change how my app looks?**
>
> No. Lovable carries your design, theme, and content across. Review the preview before publishing to confirm everything looks right.

> **Will my sign-in and protected pages still work?**
>
> Yes. Lovable takes an inventory of the pages you protect before it starts, and applies the same protection to the matching pages afterward.

> **What happens to my database and backend?**
>
> Your database is untouched. Backend code that only your own app uses moves into the new template, and code that outside services call at a fixed web address stays where it runs today.

> **Is the upgrade reversible?**
>
> Yes. Revert it from your project's version history, as described in [Review, publish, or revert](#review-publish-or-revert). Your published site changes only when you publish the upgraded version.

> **How long does the upgrade take?**
>
> Usually several minutes, longer than a typical request, because Lovable rewrites your page structure and checks every page. A large project may pause partway with a note about what is done and what is left. Ask Lovable to continue, and the upgrade resumes from where it stopped.

## Troubleshooting

> **The Migrate to TanStack Start option is missing**
>
> Your project is probably already on TanStack Start, or Lovable cannot determine its stack.
>
> **What to do:** Ask Lovable `What stack is this project on?` to check eligibility.

> **The upgrade stopped partway through**
>
> On large projects a pause is normal: the upgrade reports what is done and what is left, and it continues when you ask.
>
> **What to do:** Ask Lovable to continue, and the upgrade resumes from where it stopped. If Lovable says your workspace is low on credits, add credits first. If you would rather not continue, revert from version history instead.

> **A page is blank or shows an error after upgrading**
>
> The usual cause is a code library that only works in the browser.
>
> **What to do:** Tell Lovable which page fails and what you see. Lovable can change how the library loads so it runs only in the browser.

> **Link previews still look wrong after upgrading**
>
> The upgrade does not change your live site on its own, and platforms like Slack and LinkedIn cache link previews for a while.
>
> **What to do:** Publish your project first. Then re-check the link with the preview debugger for the platform you are testing. You can also ask Lovable to review your pages and improve their titles, descriptions, and preview images after the upgrade.


## Related topics

- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md)
- [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
