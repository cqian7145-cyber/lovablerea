# Prompt library
<!-- source: https://docs.lovable.dev/prompting/prompting-library.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Prompt library

> Copy-paste prompts for the features people build most: authentication, dashboards, file uploads, payments, notifications, and AI, all built on the built-in backend.

Ready-to-use prompts for the features people build most often. Every prompt works as a single Build mode message in the project chat and uses the [built-in backend](https://docs.lovable.dev/features/cloud) where a feature needs one, so there are no API keys or external services to set up unless a prompt says otherwise.

How to use this library:

* Replace names, numbers, and examples with your own. The specifics (prices, file limits, column names) are placeholders, not requirements.
* Run one prompt at a time. Review the result, then move to the next feature, as described in [prompting best practices](https://docs.lovable.dev/prompting/prompting-one.md).
* For larger prompts, end with "Ask me any questions you need before building" or use [plan mode](https://docs.lovable.dev/features/plan-mode.md) to align on the approach first.
* Save decisions that should persist, such as your design direction and product context, to your project [instructions](https://docs.lovable.dev/features/knowledge.md), so every later prompt builds on them automatically.

The prompts work on all plans, with two exceptions called out below: built-in payments require a Pro plan or higher, and app emails require a paid plan.

## Design and style

Naming a style direction is the fastest way to escape the default-UI look, and it works in any prompt: while building a new feature, or as a standalone restyle. Pick a direction from the reference, use its keywords, and stay consistent across sections. The technique behind these prompts, including how to mix styles across a page, is covered in [prompting best practices](https://docs.lovable.dev/prompting/prompting-one.md#use-buzzwords-to-dial-in-aesthetic). To bring in a specific typeface, see [custom fonts](https://docs.lovable.dev/tips-tricks/custom-fonts.md), and to build on your company's own component library, see [design systems](https://docs.lovable.dev/features/design-systems.md).

> **Design style reference**
>
> | Style | Keywords to use | Works well for |
> | - | - | - |
> | Minimal and focused | Whitespace-driven, frictionless, neutral tones, invisible UI, quiet motion | Productivity apps, note-taking tools, distraction-free interfaces |
> | Scandinavian and minimal | Muted Nordic palette, light wood textures, natural materials, soft neutrals, restrained elegance | Lifestyle brands, furniture stores, minimalist products |
> | Calm and elegant | Soft gradients, muted palette, generous spacing, gentle transitions, airy layout | Wellness apps, mindfulness platforms, serene user experiences |
> | Premium and sleek | Refined, translucent surfaces, layered depth, soft blur, elevated accents | Luxury brands, high-end products, professional services |
> | Glassmorphic and layered | Frosted glass, backdrop blur, layered transparency, floating elements, translucent navigation | Modern web apps, portfolios, premium tools |
> | Luxurious and sophisticated | Gold accents, marble textures, serif typography, dramatic shadows, premium spacing | High-end retail, premium service offerings |
> | Bold and disruptive | Grid-heavy, brutalist, raw typography, high contrast, oversized CTAs | Startups, agencies, brands making a statement |
> | Expressive and fun | Lively, oversized elements, cheerful curves, saturated tones, energetic layout | Consumer apps and dashboards that need energy and personality |
> | Playful and gamified | Achievement badges, progress rings, streak counters, reward animations, celebration moments | Education apps, fitness platforms, habit trackers |
> | Futuristic and cinematic | Dark mode, cosmic gradient, glowing edges, motion blur, clean grid | Tech companies, gaming, sci-fi themed projects |
> | Neon and cyberpunk | Neon glow, dark futuristic, electric colors, holographic touches, intense saturation | Gaming sites, nightlife apps, entertainment platforms |
> | Warm and inviting | Soft shadows, rounded corners, warm oranges, cozy spacing, friendly interactions | Community platforms, social apps, friendly service interfaces |
> | Organic and natural | Earth tones, flowing shapes, hand-drawn elements, warm textures, botanical inspired | Wellness brands, eco-friendly products, health-focused apps |
> | Corporate and professional | Clean lines, structured layout, muted blues, conservative spacing, traditional hierarchy | Business applications, financial services, enterprise software |
> | Editorial and content-rich | Magazine-style grid, typographic hierarchy, pull quotes, drop caps, featured imagery | Blogs, news sites, publishing platforms |
> | Technical and developer-focused | Monospace fonts, dark theme, terminal-style UI, minimal chrome, keyboard-friendly navigation | Documentation, developer tools, technical platforms |
> | Data-driven and analytical | Sharp angles, chart-inspired, cool grays, precise alignment, dashboard aesthetics | Analytics dashboards, business intelligence, data visualization |
> | Creative and unconventional | Asymmetrical layout, overlapping layers, motion-driven, expressive typography, layered composition | Creative agencies, portfolios, artistic showcases |
> | Experimental and artistic | Broken grid, color clashing, experimental fonts, chaotic composition, avant-garde elements | Art galleries, avant-garde projects |
> | Retro and nostalgic | Vintage gradients, pixelated elements, neon highlights, retro typography, 80s aesthetic | Gaming, entertainment, nostalgic brands |

Ready-made prompts for the most common directions. Swap in your own page or feature.

### Set a minimal look

```text wrap theme={null}
Design the note-taking app with radical minimalism: a pure white background, a single centered column, neutral tones, no visual clutter, and soft, quiet transitions. Remove every element that is not essential.
```

### Set a premium, glassmorphic look

```text wrap theme={null}
Restyle the dashboard with a premium, glassmorphic look: frosted, translucent cards over a soft gradient background, layered depth with gentle shadows, a translucent navigation bar, and hover states that subtly brighten each card. Simplify the glass effects on mobile.
```

### Set a bold look

```text wrap theme={null}
Design the portfolio site bold and brutalist: massive headlines, a stark black-and-white palette, a strict column grid, raw typography, and oversized calls to action.
```

### Set a playful, gamified look

```text wrap theme={null}
Restyle the habit tracker with playful gamification: colorful achievement badges, animated progress rings, a streak counter, celebration moments when a goal is hit, and encouraging copy on progress bars.
```

### Set a calm look

```text wrap theme={null}
Design the meditation app calm and elegant: soft gradients, a muted palette, generous spacing, smooth fade-ins, and clean, centered layouts.
```

### Set an editorial look

```text wrap theme={null}
Design the blog with editorial polish: a magazine-style grid, a large featured image on each article, distinctively styled pull quotes, a serif font for body text with a sans-serif for headlines, generous line spacing, and reading time estimates. On mobile, use a single column with a comfortable reading width.
```

### Explore design options

Not sure which direction to take? Ask Lovable to describe a few directions before it builds, or answer its [design questions](https://docs.lovable.dev/features/design-guidance.md#design-questions) about typography, color, and layout.

```text wrap theme={null}
Describe three directions for the hero section before you build anything.
```

### Generate image assets

Lovable generates images for your app on request, and you can attach your own in the project chat. See [adding images and videos](https://docs.lovable.dev/features/projects/chat.md#add-images-and-videos-to-your-app).

```text wrap theme={null}
Generate a hero image of a mountain at sunrise and use it as the hero background.
```

### Reuse another project's brand

Reference your other Lovable projects by name with @, as described in [cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md).

```text wrap theme={null}
Use the logo and color palette from @BrandSite.
```

## Accounts and access

### Add user accounts

Lovable enables the built-in backend automatically and generates the pages, the wiring, and the data protection. More sign-in methods (phone, Apple, Microsoft, Lovable, and SAML SSO) are covered in [users and authentication](https://docs.lovable.dev/features/authentication).

```text wrap theme={null}
Add user accounts to my app. Include signup, login, and forgot password pages that match the app's existing style. Require login before accessing the dashboard. Add a "Sign in with Google" button alongside email and password. Show clear error and success states on every form.
```

### Add passwordless sign-in

Magic links and one-time codes are part of [email sign-in](https://docs.lovable.dev/features/email-auth.md).

```text wrap theme={null}
Let users sign in with a magic link sent to their email instead of a password. Show a "Check your inbox" screen after they enter their address, and let them request a new link if it expires.
```

### Add roles and permissions

```text wrap theme={null}
Add role-based access control. Every user has a role: admin, editor, or viewer. Admins can manage users and see an admin area, editors can create and edit content, and viewers have read-only access. Hide navigation items the current role cannot use, and protect the data so a viewer cannot modify records even through direct requests.
```

### Add a user settings page

```text wrap theme={null}
Create a settings page for logged-in users. Let them update their display name, upload a profile photo, and change their password. Show a confirmation message after each successful change and validation errors inline. Add a "Delete account" option with a confirmation dialog that explains the action is permanent.
```

### Build an internal tool without a login page

Apps for your own team can recognize the logged-in workspace member, so nobody creates a separate account. See [reuse Lovable workspace identity](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

```text wrap theme={null}
Use Lovable workspace identity for this internal app instead of a separate login flow. Build a task tracker where each logged-in workspace member only sees tasks assigned to them.
```

## Core app features

### Store your app's data

Describe the information your app keeps, and Lovable creates the tables for you in your project's [database](https://docs.lovable.dev/features/database).

```text wrap theme={null}
Store the app's data in the database instead of sample data. Events have a title, description, date, location, and capacity. Registrations link a person to an event and record their name, email, and status. Wire the existing forms and lists to real data, and include loading, empty, and error states.
```

### Build a task board

```text wrap theme={null}
Build a task management app with a kanban board. Use columns for Backlog, In Progress, and Done. Tasks have a title, description, priority, and due date. Support drag and drop between columns, and store tasks per user so everyone sees only their own board. Keep the design minimal and focused, with quiet motion.
```

### Build a dashboard

```text wrap theme={null}
Create a finance dashboard with a premium and sleek design. Show a balance summary card, a line chart of the last 30 days, a table of recent transactions with search and filters, and quick action buttons. Use realistic sample data until real data is connected, and include loading and empty states.
```

### Add file uploads

Files live in your project's [storage](https://docs.lovable.dev/features/storage.md).

```text wrap theme={null}
Add file uploads. Users can upload PDF and image files up to 10 MB, see a list of their uploaded files with name, size, and date, preview images inline, and delete files they own. Keep files private so users only ever see their own uploads.
```

### Add CSV import and export

```text wrap theme={null}
Add CSV import and export to the contacts table. For import, users upload a CSV, map its columns to the contact fields, preview the first rows, and confirm. Show a summary of how many rows imported and which failed, and why. For export, add a button that downloads the current filtered view as a CSV file.
```

### Add a dark mode toggle

```text wrap theme={null}
Add a dark mode toggle to the header. Respect the user's system preference by default, remember their manual choice, and make sure every page, chart, and form looks right in both themes.
```

### Make it update live

The built-in backend includes realtime, so shared views can stay in sync without refreshing.

```text wrap theme={null}
Make the task board update live. When one user moves or edits a task, everyone else viewing the board sees the change immediately without refreshing. Show a subtle indicator of who else is currently viewing the board.
```

### Create a reusable component set

```text wrap theme={null}
Create a reusable component set with a premium, glassmorphism look: translucent surfaces, soft blur, and layered depth. Include a navigation bar, a feature card, a toggle switch, and a tab menu, with gentle hover and click interactions. Support light and dark mode. Use these components consistently across the app.
```

## Collaboration

### Add team workspaces

```text wrap theme={null}
Add team workspaces. A user can create a workspace, invite others by email with an invite link, and switch between workspaces. Workspace members see shared data, and each member has a role of owner, admin, or member with matching permissions. Show pending invitations and let owners revoke them.
```

### Add notifications

```text wrap theme={null}
Add a notification system. Show a bell icon in the header with an unread count. Notify users in the app when someone comments on their post or mentions them. Include a notifications page with read and unread states and a "Mark all as read" action.
```

### Email users when something happens

> [!NOTE]
>
> App emails require a paid plan and a verified [email domain](https://docs.lovable.dev/features/custom-emails.md). Alternatively, connect [Resend](https://docs.lovable.dev/integrations/resend.md) to send through your own Resend account.

```text wrap theme={null}
Email users when they are mentioned or when a task is assigned to them. Match the email design to the app's branding, include a link straight to the relevant item, and let users turn each email type on or off in their settings.
```

### Add an activity feed

```text wrap theme={null}
Add an activity feed to the workspace. Log key events (item created, updated, completed, member joined) with who did it and when. Show the feed newest first with relative timestamps, group repeated events, and let users filter by member or event type.
```

## Payments

> [!NOTE]
>
> Built-in payments require a Pro plan or higher, and only project or workspace admins and owners can complete the provider setup Lovable starts. See [add payments to your app](https://docs.lovable.dev/features/payments.md) for eligibility and setup details.

### Add subscription tiers

```text wrap theme={null}
Add payments with two subscription tiers. Free includes up to 3 projects. Pro at $12 per month includes unlimited projects and priority support. Add a pricing page comparing the tiers, show free users an upgrade prompt when they hit the limit, and add a "Manage subscription" button that opens the customer portal so subscribers can update payment details or cancel.
```

### Sell a one-time purchase

```text wrap theme={null}
Add a one-time purchase that unlocks the premium template pack for $29. Show a locked state with a preview and an "Unlock" button, take the user through checkout, and unlock the content immediately after a successful payment. Show purchase history on the account page.
```

## Connect other services

For third-party services, name the service in your prompt and Lovable walks you through connecting it. Each connector's page covers setup and permissions, and the full list lives in the [connector catalog](https://docs.lovable.dev/integrations/app-connectors.md).

| Service | Try prompting | Details |
| - | - | - |
| Resend | "Send a welcome email through Resend when a user signs up." | [Resend](https://docs.lovable.dev/integrations/resend.md) |
| Twilio | "Text users an SMS confirmation when their booking is confirmed, using Twilio." | [Twilio](https://docs.lovable.dev/integrations/twilio.md) |
| Slack | "Post a message to our Slack channel when a new order comes in." | [Slack](https://docs.lovable.dev/integrations/slack.md) |
| Google Maps | "Show our store locations on an interactive Google Map with info popups." | [Google Maps](https://docs.lovable.dev/integrations/google-maps.md) |
| Calendly | "Let visitors book a call from the contact page using my Calendly." | [Calendly](https://docs.lovable.dev/integrations/calendly.md) |
| Notion | "Sync published posts to my Notion database." | [Notion](https://docs.lovable.dev/integrations/notion.md) |
| Shopify | "Build an e-commerce store with Shopify for selling handmade candles." | [Shopify](https://docs.lovable.dev/integrations/shopify.md) |

If a service has no connector, Lovable can still integrate any REST API. Give it the base URL, the authentication method, and the endpoints you need, as described in [connect any API](https://docs.lovable.dev/integrations/any-api.md).

### Let AI assistants use your app

Connections also work in the other direction: your app can expose its own tools so AI assistants such as ChatGPT and Claude can use it. See [agent integrations](https://docs.lovable.dev/features/agent-integrations.md).

```text wrap theme={null}
Add Agent integrations to this app so users can connect it to AI assistants like ChatGPT and Claude.
```

## Automation and admin

### Add an admin analytics area

This prompt reports on your app's own data. For visitor traffic, Lovable has built-in [analytics](https://docs.lovable.dev/features/analytics.md) with no prompting needed.

```text wrap theme={null}
Create an admin-only analytics area. Show total users, signups per week as a chart, most active users, and content created over time. Only admins can open it. Add date range filters and CSV export of the underlying numbers.
```

### Schedule a recurring job

Jobs run in your backend on a schedule (see [scheduled jobs](https://docs.lovable.dev/features/jobs.md)). This example sends email, which needs [app email sending](https://docs.lovable.dev/features/custom-emails.md) set up.

```text wrap theme={null}
Add a scheduled job that runs every morning at 8:00, finds tasks due within the next 24 hours, and emails each task's owner a reminder listing their due tasks. Log each run so I can see when it ran and how many reminders it sent.
```

### Export to PDF

```text wrap theme={null}
Add a "Download PDF" button to the invoice view that generates a PDF matching the on-screen invoice: logo, line items, totals, and payment details. Name the file with the invoice number, and make sure long item lists paginate cleanly.
```

### Add an audit log

```text wrap theme={null}
Add an audit log for admins. Record every sensitive action (login, role change, record deletion, settings change) with who did it, when, and from where. Make the log searchable and filterable by user, action type, and date range, and make entries read-only so they cannot be edited or deleted from the app.
```

### Add feature flags

```text wrap theme={null}
Add a simple feature flag system. Admins can turn features on or off from a settings panel without a new deploy, target a flag to all users or only admins, and see which flags are active. Gate the new reporting section behind a flag as the first example.
```

### Add rate limiting

```text wrap theme={null}
Protect the contact form and the AI endpoints from abuse. Limit each user to 10 requests per minute, show a clear "Slow down" message when the limit is hit, and log rate limit events so I can review them.
```

### Offer an API with keys

Your app can serve its own API through [edge functions](https://docs.lovable.dev/features/edge-functions.md).

```text wrap theme={null}
Add an API for my app's data. Authenticated users can generate and revoke personal API keys from their settings page, and use a key to read their own items over a documented endpoint. Show each key only once at creation, store it securely, and log the last time each key was used.
```

### Run an A/B test

```text wrap theme={null}
Add a simple A/B test to the landing page. Show half of the visitors headline A and half headline B, keep each visitor's variant stable across visits, and record how many from each variant click the signup button. Add an admin view comparing the results.
```

### React to events

Backend logic runs in [edge functions](https://docs.lovable.dev/features/edge-functions.md), so your app can respond to events such as webhooks and data changes.

```text wrap theme={null}
When a payment is marked 'paid' in Stripe, automatically update the related invoice's status to 'Paid'.
```

### Tune the database

Lovable can inspect and optimize its own backend. See the [database](https://docs.lovable.dev/features/database) docs for policies, backups, and SQL access.

```text wrap theme={null}
Run a health check on my database.
```

```text wrap theme={null}
My app feels slow. Find the slowest database queries and optimize the worst ones.
```

## AI features

These prompts use the [built-in AI connector](https://docs.lovable.dev/features/ai). You do not need an API key or a provider account.

### Add an AI assistant

```text wrap theme={null}
Add an AI assistant to the app. Users open a chat panel and ask questions about their own data in the app, and the assistant answers conversationally. Stream the responses, keep each user's conversation history, and show a friendly empty state suggesting three example questions.
```

### Add AI writing help

```text wrap theme={null}
Add an AI writing helper to the notes editor. An "Improve" menu offers four actions: summarize, fix grammar, change tone to professional or friendly, and translate to Spanish. Show the result next to the original text with "Replace" and "Copy" actions.
```

### Add semantic search

```text wrap theme={null}
Add semantic search to the knowledge base. Users type a question and get the most relevant articles by meaning rather than keyword match, with a short AI-generated answer on top that cites the matched articles. Fall back to regular search when there is no good match.
```

### Generate images

```text wrap theme={null}
Let users generate images in the app. They describe the image they want, pick a style from a few presets, and get a result they can regenerate, download, or attach to their post. Show a loading state while the image is being created.
```

### Add voice features

```text wrap theme={null}
Add voice to the notes app. Users can dictate a note by speaking, and the app transcribes it into text they can edit. Add a "Listen" button that reads any note aloud. Show a clear recording indicator while the microphone is active.
```

```text wrap theme={null}
Add a voice assistant to the booking app. People press a button to start talking, the assistant answers aloud and can be interrupted, and it checks availability and books a slot while they talk. Show when the assistant is listening and when it is speaking, and add an End call button.
```

### Score and categorize records

```text wrap theme={null}
Analyze each new piece of customer feedback with AI as it arrives. Save a sentiment score and a category (bug, feature request, or praise) on the record, show both in the feedback table, and let me filter by them. Run the analysis once over the entries that are already there.
```

### Recommend content

```text wrap theme={null}
Add a "Recommended for you" section to the home page. Suggest items based on what the user has viewed and saved, refresh the suggestions daily, and show new users popular items with a note explaining why they are seeing them.
```

### Autofill forms with AI

```text wrap theme={null}
Make the listing form smarter. When a user writes a title, suggest a description, category, and tags they can accept or edit. Mark suggested values clearly until confirmed so users always know what they typed and what was suggested.
```

## Test, debug, and secure

Lovable can operate a real browser to verify your app's flows, and review your code for security problems. Full details live in [testing](https://docs.lovable.dev/features/testing.md), [browser testing](https://docs.lovable.dev/features/browser-testing.md), and [security](https://docs.lovable.dev/features/security). For a structured approach to fixing bugs, see the [debugging guide](https://docs.lovable.dev/prompting/prompting-debugging.md).

### Verify a flow in the browser

```text wrap theme={null}
Use browser testing to verify the checkout flow.
```

### Reproduce and fix a bug

```text wrap theme={null}
The page crashes when I click my profile. Reproduce it in the browser, fix it, and then verify that your fix worked.
```

### Run a security review

```text wrap theme={null}
Review my app's security. Check the authentication flow and whether my API routes are secure.
```

## Publish and grow

[Publishing](https://docs.lovable.dev/features/publish.md), [custom domains](https://docs.lovable.dev/features/custom-domain.md), [SEO](https://docs.lovable.dev/features/seo-aeo.md), and [visitor analytics](https://docs.lovable.dev/features/analytics.md) each have their own docs pages. From chat, Lovable can deploy your app, set up a custom domain, and polish how it appears in search results and link previews. After publishing, run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) to check indexing, metadata, and performance on the live site.

### Publish from the project chat

Lovable asks for approval before deploying, unless you have set the publish tool to auto-approve, and you can request a specific subdomain.

```text wrap theme={null}
Publish my app to my-cafe.lovable.app.
```

### Get a domain from the project chat

Describe the kind of name you want and Lovable searches what's available, with the price for each. If you already own the domain, ask it to connect that instead. Lovable always shows a confirmation card before it buys or connects a domain, and buying continues in checkout.

```text wrap theme={null}
Find me a short domain for my coffee shop in Lisbon.
```

### Polish your site metadata

```text wrap theme={null}
Change my site title, write a new meta description, and generate a new social sharing image.
```

## Write your own prompt

When no ready-made prompt fits, fill in this template. The more sections you complete, the closer the first result lands to what you had in mind. Skip any part that does not apply.

```text wrap theme={null}
Design a [page or feature] with a [style] look.

Visual style:
- [Color palette]
- [Typography]
- [Spacing and layout]

Interactions:
- [Hover and click behavior]
- [Transitions and animations]
- [Loading, error, and empty states]

Structure:
- [Sections in order]
- [Navigation]

Responsive behavior:
- Desktop: [layout]
- Mobile: [what changes]
```

A few phrases improve almost any prompt:

| To improve | Add phrases like |
| - | - |
| Spacing | "Generous padding and breathing room", "extra whitespace between sections", "comfortable touch targets on mobile" |
| Typography | "Clear typographic hierarchy", "use the Inter font", "optimized for reading with proper line height" |
| Interactivity | "Smooth micro-interactions", "subtle transitions on all interactive elements", "hover states that feel responsive" |
| Depth | "Layered shadows for depth", "subtle gradients for visual interest" |
| Responsiveness | "Three columns on desktop, one on mobile", "collapsible navigation on mobile" |
| Polish | "Include loading, error, and empty states", "helpful microcopy and labels", "accessible contrast" |

For style vocabulary (minimal, premium, playful, and more), use the style reference in the [design and style](#design-and-style) section above. To build with ready-made components from a community library instead of describing every element, see [use 21st.dev components in Lovable](https://docs.lovable.dev/tips-tricks/21stdev.md).

## FAQ

> **Do I need API keys for these prompts?**
>
> No. Accounts, storage, payments, scheduled jobs, and AI features run on Lovable's built-in backend and AI connector. Only third-party connectors (such as Resend or Twilio) ask you to connect an account during setup.

> **Can I run several prompts at once?**
>
> Run them one at a time. Each prompt builds on the app's current state, and reviewing between steps keeps problems easy to trace and fix.

> **What if the result is not what I wanted?**
>
> Restore a previous version from [version history](https://docs.lovable.dev/features/projects/history.md) and re-prompt with more detail, or follow the [debugging guide](https://docs.lovable.dev/prompting/prompting-debugging.md).


## Related topics

- [Prompting best practices](https://docs.lovable.dev/prompting/prompting-one.md)
- [Dashboard overview](https://docs.lovable.dev/introduction/dashboard-overview.md)
- [Design guidance](https://docs.lovable.dev/features/design-guidance.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md)
