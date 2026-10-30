# How to build a real product with Lovable
<!-- source: https://docs.lovable.dev/tips-tricks/from-idea-to-app.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# How to build a real product with Lovable

> Shape the idea, plan, design, build in small loops, add a backend, test, publish, and keep improving your app once people are using it.

> "I have no clue what I'm doing... but I know exactly what I want to build."

If that sounds like you, this is your guide. It takes one idea from a vague notion to a shipped, growing product, and teaches the working habits that make Lovable feel effortless along the way. You do not need to know how to code. If you have not built anything with Lovable yet, do the [Quick start](https://docs.lovable.dev/introduction/getting-started.md) first. It takes ten minutes.

To make things concrete, the examples follow one project: **StudioBook**, a booking app for a small photography studio. Clients pick a session type and a time slot, and the owner sees the schedule. Swap in your own idea, and the process is identical.

The journey runs: shape the idea, plan, set the design direction, build in small loops, add the backend, test, publish, grow, and maintain.

> [!NOTE]
>
> Lovable ships improvements constantly, so a button or label may not match this page exactly. Trust your screen: the product you are using is the source of truth.

## Shape the idea

Start wherever thinking comes easily: a voice note, a walk, a chat with ChatGPT, pen and paper. Before you write your first prompt, spend fifteen minutes answering four questions:

* What is this product?
* Who is it for?
* Why will they use it?
* What is the one key action a user should take?

Then get that thinking into Lovable. A useful trick is to tell a story instead of writing a spec:

```text wrap theme={null}
Anna runs a small photography studio. Clients email her to book sessions, and she loses track of who booked what. Build the one screen that fixes this: a booking page where a client picks a session type (portrait, family, product) and an available time slot, then enters their name and email. Use realistic sample data. No login or database yet. Tone: warm and professional.
```

A story gives Lovable the context a bullet list leaves out: who is using the screen, what they are trying to do, and how it should feel. If your idea already exists as a sketch, a Figma frame, or a site you admire, [attach a screenshot](https://docs.lovable.dev/features/projects/chat.md#attach-files-as-context) to your prompt instead of describing the layout in words. If someone has already built something close to it, [Lovable templates](https://lovable.dev/templates) are ready-made apps you can remix on any plan and then reshape with a story prompt like the one above.

Keep the first version small: one user, one action, one outcome. Anna's clients book a slot. That is the whole v1. Payments, reminders, and a calendar view can all come later, and later is cheaper than a first prompt that asks for everything at once.

> [!TIP]
>
> Not sure what to include? Turn the question around and let Lovable interview you:
>
> ```text wrap theme={null}
> I want to build a booking app for a photography studio. Before you build anything, ask me the five questions you would need answered to build this well. Don't write code yet.
> ```

## Plan before you build

For anything bigger than a tweak, switch the chat to [Plan mode](https://docs.lovable.dev/features/plan-mode.md). Plan mode is project-aware: Lovable inspects your files, database, and logs, asks clarifying questions, and proposes a structured plan you can edit before any code is written. Plan mode is for decision-making, Build mode is for execution, and you can switch at any time. To talk something through before you plan, without writing a plan, use [Chat mode](https://docs.lovable.dev/features/chat-mode.md), or start a [chat](https://docs.lovable.dev/features/chats.md) outside the project.

Use Plan mode to break a big idea into buildable pieces:

```text wrap theme={null}
Here's my app idea: [describe it]. Break it into features I can build and test one at a time, ordered so each step produces something I can click through.
```

Then write your project's brief. [Project instructions](https://docs.lovable.dev/features/knowledge.md) are always part of the context Lovable works with, so it never loses sight of what you are building. Good project instructions read like a one-page brief, not a wiki:

* What the product is and who it is for.
* The main user journeys ("a client books a session in under a minute").
* Key features, and how different roles behave if you have them (owner vs client).
* Design guidance (colors, tone, do's and don'ts).
* Anything Lovable keeps getting wrong.

You can ask Lovable to draft it:

```text wrap theme={null}
Draft project instructions for this project based on what we've built so far.
```

One more decision up front: **build frontend-first**. Start with sample data, get the screens and flows right, and connect the database once the product feels right. Frontend-first iterates faster and keeps early sessions about your product instead of your data model.

## Set the design direction early

Design is a foundation, not a polish layer. If you tell Lovable how the app should feel in your first prompts, every screen it builds inherits that direction. If you leave it for later, you will be fighting a default look across the whole app.

Three habits do most of the work:

* **Describe the feel, not just the layout.** Style words like "calm", "premium", "playful", or "bold" meaningfully change typography, spacing, and color. StudioBook's line is "warm and professional, like a well-lit studio". Reuse it in prompts, or put it in your project instructions.
* **Use real content from day one.** Placeholder text hides design problems and gives Lovable nothing to work with. Write the actual headline, the real session names, plausible prices. Real content reveals immediately whether a layout works.
* **Point at what you mean.** For visual changes, the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) is faster than describing: select the exact element and say what should change, or edit text directly on the page.

When the app works but looks generic, run a polish pass:

```text wrap theme={null}
Take a critical pass across the whole app. Tighten typography and spacing. Improve empty states and loading states. Fix anything that feels generic. Don't add new features. Don't change colors unless something is unreadable.
```

For deeper control over look and feel, see [design guidance](https://docs.lovable.dev/features/design-guidance.md).

## Build in small loops

The single most important habit: **one change per prompt, verify in the preview, then move on**. Small prompts compound. Big prompts collapse into changes you did not ask for and cannot untangle. Prompt by component (a booking form, a schedule card, a confirmation dialog), not by page.

Specific prompts beat vague ones. Compare:

```text wrap theme={null}
Make the booking page better.
```

```text wrap theme={null}
On the booking page, group the time slots by morning and afternoon, disable slots that are already booked, and show a confirmation summary (session type, date, time, price) before the client submits.
```

The second prompt names the location, the exact behavior, and the boundaries. If you catch yourself writing "and" more than twice, split it into separate prompts and verify each one before sending the next. A few more habits that pay off:

* **Set guardrails.** Naming what you don't want is as useful as naming what you do:

  ```text wrap theme={null}
  Redesign the schedule page header. Don't change the navigation or the booking form.
  ```

* **Show, don't tell.** For bugs and layout issues, attach a screenshot of the problem. For long or complicated instructions, [dictate your prompt](https://docs.lovable.dev/features/projects/chat.md#the-prompt-box) with the microphone instead of typing.

* **Name the role.** If your app has different kinds of users, say which one a change applies to, so shared screens don't pick up behavior meant for someone else:

  ```text wrap theme={null}
  As the studio owner, I want to mark a booking as completed from the schedule page. Clients should not see this control.
  ```

* **More prompting technique**: the [prompting playbook](https://docs.lovable.dev/prompting/prompting-one.md) covers this in depth, from layout patterns to design buzzwords.

* **Ready-made prompts**: the [prompt library](https://docs.lovable.dev/prompting/prompting-library.md) has copy-paste prompts for accounts, payments, AI features, and more.

For a whole feature, hand Lovable the same shape every time:

```text wrap theme={null}
Build [feature] in steps, and wait for me to confirm each one: 1) create the page, 2) add the UI with sample data, 3) connect the data, 4) add logic and edge cases.
```

**Version history is what makes bold prompting safe.** Every change is saved automatically to [version history](https://docs.lovable.dev/features/projects/history.md). Bookmark the version after every working feature, so you always have a known-good state to return to. If an experiment goes wrong, restore and try a different angle, or edit a past message and choose **Revert and resend** to take a new direction from that point. One caveat: reverting restores your **code**, not your database data.

If **Try to fix** has not solved an error after a couple of attempts, switch tactics instead of retrying: move to Plan mode and ask Lovable to investigate the root cause first. Lovable reads your app's console logs itself, so a short prompt is usually enough:

```text wrap theme={null}
Investigate why saving a booking fails. Find the root cause before changing any code.
```

When something that used to work breaks, point Lovable at the timeline instead of the symptom:

```text wrap theme={null}
The booking form worked earlier today. Review your recent changes to it, figure out which one broke it, and explain what you find before fixing anything.
```

## Add the backend when data needs to survive

Here is the moment you outgrow the frontend: a client books a session, you refresh the page, and the booking is gone. Sample data lives only in the browser. When information needs to persist, your app needs a database.

Lovable includes a full backend. Enable the [built-in backend](https://docs.lovable.dev/features/cloud) and describe what to store:

```text wrap theme={null}
Store bookings in the database: session type, date, time slot, client name, client email, and status. Wire the booking form to save real bookings and show them on the schedule page. Include sensible empty, loading, and error states.
```

That last line matters: real apps spend a lot of time empty, loading, or failing, and asking up front saves a round of fixes later.

Verify the database the reliable way: open your app in two browser tabs, create a booking in one, and refresh the other. If it appears, you have a real backend.

Then control who sees what. Add [sign-in](https://docs.lovable.dev/features/authentication) so Anna can log in to manage her schedule while clients book without an account. After adding accounts, always test with two different users to confirm one user's private data is invisible to the other. This is also the moment to run your first [security scan](https://docs.lovable.dev/features/security): finding a problem now is far cheaper than at publish time.

The backend can do much more when you need it: [file storage](https://docs.lovable.dev/features/storage.md), [AI features](https://docs.lovable.dev/features/ai), [scheduled jobs](https://docs.lovable.dev/features/jobs.md), [custom emails](https://docs.lovable.dev/features/custom-emails.md) for booking confirmations, and [payments](https://docs.lovable.dev/features/payments.md) for deposits. Add each one the same way you have built everything else, with a prompt, when the product actually needs it.

## Test like a user

Before shipping, walk the app the way a stranger would:

1. **Looks right**: check every page, including empty states (what does the schedule look like with zero bookings?).
2. **Works right**: click every button and submit every form, including with wrong inputs (an invalid email, an empty required field).
3. **Data survives**: refresh after every action that should save something.
4. **Access holds**: sign in as a second user and confirm you cannot see or change the first user's data. If your app has roles, re-test each role after big changes.
5. **Phone-sized**: use the device toggle above the [preview](https://docs.lovable.dev/features/projects/preview.md) to switch to **Mobile view** and repeat the important flows.

You can also hand parts of this checklist to Lovable with [automated testing](https://docs.lovable.dev/features/testing.md). Ask for outcomes, not clicks ("test that the form submits" proves little):

```text wrap theme={null}
Test that submitting the booking form actually saves a booking that appears on the schedule page.
```

## Publish and share

Run a [security scan](https://docs.lovable.dev/features/security) before your first publish, and fix anything it flags as critical. Then click **Publish** in the top right. Your app goes live at your `lovable.app` URL. When you are ready for your own web address, follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md).

Two things to know:

* The live site is a snapshot. To ship later changes, click **Publish**, then **Publish changes**.
* [Sharing and publishing are different](https://docs.lovable.dev/features/share-project.md). A share link shows collaborators your work in progress and expires. Publishing is what puts your app on the web.

Now share it with one real user before you announce it anywhere. Watch Anna's first client book a session: the confusion of one real user is worth ten of your own test runs, and their feedback starts your next build loop.

## Grow your app

Shipping is the midpoint, not the finish line. After launch you stop guessing what people want and start reading what they do.

**Find out how the app is actually used.** [Analytics](https://docs.lovable.dev/features/analytics.md) shows visits, page views, and traffic sources. For the number that actually matters, build it into the app itself. For StudioBook that is completed bookings: traffic without bookings means the page is not convincing, and bookings without repeat clients means the experience after booking is the problem.

```text wrap theme={null}
Add a simple owner dashboard showing bookings this week, bookings last week, and the most requested session type. Read-only, no filters yet.
```

**Get found.** Run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) on the live site. It checks how search engines and AI systems understand your pages, from indexing to metadata and structured data. Ask Lovable in the project chat to adjust your site title, description, and social share image so the link looks right when Anna shares it.

**Close the loop with your users.** The fastest growth lever early on is not a feature, it is a conversation. Add the smallest possible way for people to tell you something is wrong:

```text wrap theme={null}
Add a small "Something wrong?" link in the footer that opens a form with one message field and an optional email field, and store submissions in the database.
```

**Reach people where they are.** A [confirmation email](https://docs.lovable.dev/features/custom-emails.md) is often the single highest-value addition after launch, because it turns a form submission into something the client can find again. A [custom domain](https://docs.lovable.dev/features/custom-domain.md) buys trust: a branded address reads differently than a default URL when Anna sends it to a client.

```text wrap theme={null}
Send a confirmation email when a client books a session, with the date, time, session type, and the studio's address.
```

**Charge for it when it earns it.** Add [payments](https://docs.lovable.dev/features/payments.md) for a deposit at booking once people are already booking, not before. A paywall on an unproven flow just hides whether the flow works.

```text wrap theme={null}
Take a deposit when a client books: set up payments in test mode, charge 20% of the session price at booking, and mark the booking confirmed only after the payment succeeds.
```

**Let what you observe pick what is next.** Every new feature should trace back to something real: a user got stuck, a number stalled, the same request came in twice. Features that trace back to "it seemed cool" are the ones you delete in three months.

## Maintain and evolve

A live app needs a rhythm, not heroics.

**Hear about problems before your users report them.** [Project monitoring](https://docs.lovable.dev/features/project-monitoring.md) checks your app on a schedule, catches errors your visitors hit, and alerts you by email. When it flags something, hand it over whole:

```text wrap theme={null}
Monitoring reports an error when a client submits the booking form without picking a time slot. Investigate the root cause, then fix it.
```

**Ship deliberately.** Keep improving in the preview, test, then **Publish → Publish changes**. Your users only ever see versions you chose to ship, which makes the preview a safe place to be halfway through something.

**Keep a known-good state.** Bookmark the version after every working feature. Months in, that is the difference between "restore to Tuesday" and "I have no idea when this broke."

**Run a periodic pass.** Every few weeks, walk the app as a stranger again, on a phone. Live apps rot in specific ways: empty states you never see because your account has data, flows that got slower as pages grew, copy that no longer matches what the product does. And after any change that touches data or roles, repeat the two-user access check from [testing](#test-like-a-user).

```text wrap theme={null}
Take a critical pass over the app as it stands. Check empty and error states on every page, flag anything where the copy no longer matches the behavior, and list what you find before changing anything.
```

**When a project gets tangled**, [remix it](https://docs.lovable.dev/features/projects/remix.md): you get a clean copy to rebuild with everything you learned, while the original stays intact. The second pass usually takes a fraction of the time.

> [!TIP]
>
> When you are stuck, ask the docs assistant on any page of these docs, or the [Discord community](https://discord.gg/lovable-dev). You are not the first person to hit whatever you hit.

## Keep building

One last habit, from builders who got good fast: build small things often. Every throwaway project teaches you a skill, and the reps compound. You are also your own first user, so build for yourself, test like your users would, and let real feedback pick what you build next.

The loop never changes: describe, refine, publish. Every app you build, however ambitious, is this loop repeated.

## Own your code

Everything Lovable builds is a real application, and the code is yours:

* **[Code view](https://docs.lovable.dev/features/code-mode.md)**: read and edit the code right in the editor whenever you are curious or want precise control.
* **[Git sync](https://docs.lovable.dev/integrations/git-sync-overview)**: connect your project to [GitHub](https://docs.lovable.dev/integrations/github.md) or [GitLab](https://docs.lovable.dev/integrations/gitlab.md) for a synced copy in your own repository. Edit in your favorite IDE or let teammates contribute, and changes flow both ways.
* **Portability**: you can [host your app outside Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership) whenever you choose. Nothing locks you in.

None of this is required to ship. It is there so the product you build is genuinely yours.

## FAQ

> **Do I need to know how to code?**
>
> No. Every step in this guide happens in plain language. The code Lovable writes is real and yours, and you can [look at it](https://docs.lovable.dev/features/code-mode.md) whenever you are curious, but you never have to.

> **Should I describe my whole app in the first prompt?**
>
> No. Describe the one screen or flow that matters most, with sample data and no login. You get a working version in minutes, and everything else is easier to add to something that already works.

> **What if Lovable keeps failing to fix a bug?**
>
> Stop repeating the fix attempt after two or three tries. Switch to Plan mode and ask Lovable to investigate the root cause before changing code. If a session has gone sideways, restore the last good version from history, or remix the project for a clean start.

> **When do I need the built-in backend?**
>
> The moment information has to survive a page refresh or be shared between users: saved bookings, user accounts, uploaded files. Until then, sample data is faster and cheaper to iterate on.

> **What does building cost?**
>
> Building uses [build credits](https://docs.lovable.dev/introduction/credits-and-usage.md) from your workspace, and every plan includes credits. See [subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) for what each plan includes.

> **What does hosting and running my app cost?**
>
> Publishing is free. Once your app is live, hosting it and running its built-in backend and AI features consume [run credits](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs) as the app is used.

> **Can I work on the code outside Lovable?**
>
> Yes. Set up [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) for a repository that stays in sync while you edit in any IDE, or open [code view](https://docs.lovable.dev/features/code-mode.md) inside the editor. You can also [host the app outside Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership) entirely.


## Related topics

- [Quick start](https://docs.lovable.dev/introduction/getting-started.md)
- [Video tutorials and courses](https://docs.lovable.dev/introduction/video-tutorials.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Prompting best practices](https://docs.lovable.dev/prompting/prompting-one.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
