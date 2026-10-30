# Glossary
<!-- source: https://docs.lovable.dev/glossary.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Glossary

> Definitions of Lovable-specific terms, features, and the general web development concepts you'll encounter in the documentation.

This glossary is split into two parts:

* **Lovable terminology** covers terms specific to the Lovable platform, its features, and how it works.
* **General development concepts** covers web, design, and backend terms that aren't Lovable-specific but show up often in the docs.

## Lovable terminology

### Modes and how Lovable works

* [**Chats**](https://docs.lovable.dev/features/chats.md): Conversations with Lovable that live outside your projects, at lovable.dev/chats or from the dashboard with **Chat** selected. Use a chat to think through ideas, ask about the apps you have built, use connected tools, create files, or talk by voice. A chat sends work to a project when something needs to be built. Each chat belongs to the person who started it.
* [**Chat mode**](https://docs.lovable.dev/features/chat-mode.md): The **Chat** option in the project chat's mode picker, next to Build and Plan. Lovable discusses the app you have open without changing its code. Priced as chat messages, covered first by the daily chat allowance.
* [**Chat usage**](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs): Messages in Chats, Chat mode, and Lovable in Slack and Telegram, including requests made by voice. Chat usage follows its own pricing model, including a per-message price and a daily chat allowance, and appears under **Build credits** in Usage details.
* [**Project chat**](https://docs.lovable.dev/features/projects/chat.md): The panel on the left side of the editor where you work with Lovable on one app, in Chat, Plan, or Build mode.
* [**Daily chat allowance**](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs): A usage-specific grant included with Free, Pro, and Business plans that covers chat usage before any other credits, as part of the chat pricing model. It belongs to the workspace, resets every day at 00:00 UTC, and does not roll over.
* **Voice conversation in Chats**: A two-way spoken conversation with Lovable inside a chat. You start it with **Start voice conversation**, Lovable answers aloud and saves the transcript to the chat. See [Have a live voice conversation](https://docs.lovable.dev/features/chats.md#have-a-live-voice-conversation). For spoken conversations inside the apps you build, see [Live voice models](https://docs.lovable.dev/features/ai-live-voice.md).
* **Dictation**: Speaking a prompt instead of typing it. Lovable turns your speech into text in the prompt box, and you review and send it yourself. Available in the project chat, in Chats, on the dashboard, and in the mobile app. See [The prompt box](https://docs.lovable.dev/features/projects/chat.md#the-prompt-box).
* [**Build mode**](https://docs.lovable.dev/features/agent-mode.md): Lovable's execution mode for implementing changes directly in your project. The agent writes code, runs tools, applies changes across files, and verifies the result. Use Build mode when you're ready to ship a change. (Previously called *Agent mode*.)
* [**Plan mode**](https://docs.lovable.dev/features/plan-mode.md): Lovable's planning mode. Use it to investigate your project in depth, compare approaches, and review or edit a plan before any code changes. Plan mode never modifies your project. A Plan mode message costs one credit plus any subagent research.
* [**Subagents**](https://docs.lovable.dev/features/subagents.md): Temporary, read-only agents that Lovable spins up to research, inspect, or review focused parts of a task in parallel. Subagents report findings back to the main agent but cannot change your project.
* **Prompt**: A natural-language instruction you send to Lovable to create, modify, debug, or explain something in your app.
* **Follow-up**: A message you send to steer Lovable while it is already working. Lovable picks it up at its next natural stopping point and includes it in the work in progress. Replaces the message queue. See [Send follow-ups while Lovable works](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works).
* **Message queue** (deprecated): A queue of messages that wait and run one at a time while Lovable is working. It is disabled by default. Accounts that used it before follow-ups replaced it kept it enabled, and anyone can enable or disable it with **Message queue** in **Account settings → Preferences**. See [Message queue (deprecated)](https://docs.lovable.dev/features/projects/chat.md#message-queue-deprecated).
* **Diff**: A side-by-side comparison of file changes Lovable made in a turn.
* **[History](https://docs.lovable.dev/features/projects/history.md)**: The chronological log of changes to your project. Lets you revert to a previous version or bookmark important checkpoints.
* **Visible tasks**: The step-by-step progress view that shows what Lovable is doing during a Build mode run, including which files it's touching.

### Workspace, projects, and people

* [**Workspace**](https://docs.lovable.dev/features/workspace): The shared space where a group of people builds together. It holds your projects, members, billing, and settings, and everyone you invite builds from the workspace's shared plan and credits, each on as many of their own projects as they want. Every project lives inside a workspace.
* [**Organization**](https://docs.lovable.dev/features/organizations): Several Lovable workspaces grouped under one company. The company verifies domains, sets up SSO and SCIM, and sees every member and role in one place. Teams can publish apps to everyone in the organization. Projects, members, groups, and billing stay with each workspace. Available on Enterprise plans.
* [**Org admin**](https://docs.lovable.dev/features/organizations#who-can-manage-the-organization): A person who manages an organization: its workspaces, people, identity settings, and other org admins. An org admin is not a member of the organization's workspaces unless added to them.
* [**Managed by the organization**](https://docs.lovable.dev/features/organization-identity.md#lock-a-workspaces-settings-to-the-organization): A per-workspace setting that locks the workspace's **Identity** and **Privacy & security** settings so that only org admins can change them.
* [**Provisioning group**](https://docs.lovable.dev/features/organization-identity.md#route-people-to-workspaces-with-provisioning-groups): A mapping from a group in your identity provider to a role in a workspace, used by SSO and SCIM to decide who joins and with which role. An organization maps its groups to a workspace and a role in it, and a workspace with its own SSO provider maps its groups to a role in that workspace. Different from workspace [groups](https://docs.lovable.dev/features/groups.md).
* [**Workspace admin settings**](https://docs.lovable.dev/features/workspace-admin-settings.md): The central place where workspace owners and admins configure identity, access, templates, billing, domains, security, and developer settings for the workspace.
* **[Project](https://docs.lovable.dev/features/projects/overview)**: A single Lovable app, with its own code, chat history, integrations, and settings. Projects always belong to a workspace.
* **External collaborator**: Someone outside your workspace who has been granted access to a specific project. External collaborators don't have a seat in the workspace itself.
* [**Project access**](https://docs.lovable.dev/features/project-visibility.md) (project visibility): The setting that controls who can open and edit a project in the Lovable editor: **Workspace** or **Restricted** (Business and Enterprise).
* **Restricted project**: A project visible only to people explicitly added to it, even within the workspace. Available on Business and Enterprise plans.
* [**Share menu**](https://docs.lovable.dev/features/share-project.md): The menu that opens from **Share** in a project, where you invite people or groups, manage roles, copy invite links, and create shared preview links.
* [**Groups**](https://docs.lovable.dev/features/groups.md): Named collections of workspace members used to grant access to projects, folders, and published apps in bulk. Groups can also sync from your identity provider via SCIM. Available on Business and Enterprise plans.
* [**SSO (Single sign-on)**](https://docs.lovable.dev/features/business/sso.md): Workspace-level authentication through your identity provider (Okta, Microsoft Entra ID, Auth0, Google Workspace) using OIDC or SAML.
* [**Domain lock**](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock): The combination of a verified domain, Enforce SSO, and the domain-wide Require SSO and Block workspace creation settings, so everyone on a company email domain logs in through SSO and works only in the company's workspaces. It is not a single setting in the product. The term comes from Lovable support. Different from the registrar domain lock that blocks a domain transfer. Enterprise plans.
* [**SCIM provisioning**](https://docs.lovable.dev/features/business/scim.md): A connection that automatically creates, updates, and removes workspace users, and syncs groups, from your identity provider.
* [**Audit logs**](https://docs.lovable.dev/features/audit-logs.md): A searchable trail of workspace activity showing who did what, when, and to which resource. Enterprise plans.
* [**Data exports**](https://docs.lovable.dev/features/data-exports): Scheduled delivery of workspace audit logs to a destination you own, such as an Amazon S3 bucket or Splunk. Enterprise plans.
* [**EU inference**](https://docs.lovable.dev/features/eu-inference.md): A workspace setting that keeps the workspace's AI model requests on model endpoints in the European Union, for building and for the AI features in published apps. A request that no EU endpoint can serve fails instead of running in another region. Enterprise plans.
* [**Insights**](https://docs.lovable.dev/features/insights.md): Workspace dashboard for admins and owners that shows adoption: visits, active apps, active builders, connections added, top apps by visits, and builders by edits. Different from Security insights. Business and Enterprise plans.

### Building and editing

* **[Preview](https://docs.lovable.dev/features/projects/preview.md)**: The live, interactive view of your app inside Lovable. The preview updates as Lovable builds, and you can interact with it the same way an end user would.
* [**Preview toolbar**](https://docs.lovable.dev/features/preview-toolbar.md): The toolbar on top of the preview that lets you select elements, edit text inline, draw annotations, and leave comments without leaving the preview. Replaces the older Visual edits panel.
* [**Code editor**](https://docs.lovable.dev/features/code-mode.md): The in-Lovable view for browsing and manually editing your project's source code. Editing is available on paid plans. See [the code editor](https://docs.lovable.dev/features/code-mode.md). (Sometimes called *Code mode*.)
* [**Instructions**](https://docs.lovable.dev/features/knowledge.md): Persistent guidance and context you write for Lovable, applied in every conversation. Split into **workspace instructions** (rules and standards that apply to every project in the workspace) and **project instructions** (project-specific context, personas, conventions, and design notes).
* [**Memory**](https://docs.lovable.dev/features/memory.md): What Lovable saves as you build and applies in later conversations, without you writing it down. Project memory belongs to one project and is shared by everyone who can edit it. Personal memory covers how you want Lovable to work with you. Different from Instructions, which you write yourself.
* [**Skills**](https://docs.lovable.dev/features/skills.md): Reusable, named playbooks defined at the workspace level. Each skill packages markdown instructions that Lovable applies whenever a matching task comes up, either invoked with a `/` command or triggered automatically.
* [**Cross-project referencing**](https://docs.lovable.dev/features/cross-project-referencing.md): A way to pull code, assets, files, or chat history from another project in your workspace using `@` mentions, so you can reuse implementations without rebuilding them.
* [**File generation**](https://docs.lovable.dev/features/generate-files.md): Lovable's ability to analyze data and produce downloadable files (CSV, PDF, Excel, Word, PowerPoint, charts) directly in the chat, without modifying your project's source code.
* [**Browser testing**](https://docs.lovable.dev/features/browser-testing.md): A testing tool where Lovable drives your app in a real browser, clicking, filling forms, and capturing screenshots, to verify user flows end to end.
* [**Testing tools**](https://docs.lovable.dev/features/testing.md): The umbrella feature covering browser testing, **frontend tests** (Vitest + React Testing Library), and **edge tests** (Deno test runner for edge functions).
* [**Drafts**](https://docs.lovable.dev/features/drafts.md): Copies of a project you can build in separately, each with its own chat, preview, and edits. Accepting a draft adds its edits to the project, and deleting it discards them. Every draft uses the project's database, so data a draft adds or changes is added or changed for the project too. Available on all plans.
* [**Remix**](https://docs.lovable.dev/features/projects/remix.md): A copy of a project's current state used as the starting point for a new one, edited independently while the original is preserved. You can remix one of your own projects, any project you have access to, or another user's project that has **public remixing** enabled.

### Design

* [**Design guidance**](https://docs.lovable.dev/features/design-guidance.md): The pre-build step where Lovable either asks **design questions** about typography, color, and layout, or builds directly when the visual intent is already clear.
* [**Design systems**](https://docs.lovable.dev/features/design-systems.md): A feature for defining a reusable React component library, styling guidelines, and setup instructions in a dedicated Lovable project. Other projects in the workspace can connect to that design system and receive updates. Available on all paid plans. Wrapping an existing npm package as a design system is available on Enterprise plans only.
* [**Design templates**](https://docs.lovable.dev/features/business/design-templates.md): Approved Lovable projects marked as reusable. Starting a new project from a template copies the full codebase, including structure, components, configuration, and styling. Available on Business and Enterprise plans.

### Publishing, hosting, and domains

* [**Hosting**](https://docs.lovable.dev/features/hosting.md): Lovable serving your published app for you: a public URL, automatic HTTPS, and delivery from locations around the world, with no servers to set up.
* [**Publish**](https://docs.lovable.dev/features/publish.md): The action that puts your project on a public URL. Publishing creates a snapshot; later edits require republishing to go live.
* **Website access**: The setting that controls who can visit your published app. On every plan, the options are public and invite only. With invite only, only workspace members you add by name and people outside the workspace you invite by email can visit. On Business and Enterprise plans, you can also choose workspace only or a custom audience of groups, members, and people outside the workspace invited by email.
* [**Custom domain**](https://docs.lovable.dev/features/custom-domain.md): A domain you own (e.g. `yoursite.com`) connected to a published Lovable project. You can connect a domain from another registrar or buy one through Lovable.
* [**Transfer a domain**](https://docs.lovable.dev/features/transfer-domain.md): The process of moving a domain you already own from another registrar into Lovable, so Lovable becomes the registrar.
* [**Branded app URLs**](https://docs.lovable.dev/features/branded-workspace-urls.md): A workspace-level subdomain that replaces the default `your-app.lovable.app` with `{app-name}.{workspace-subdomain}.lovable.app` for every app in the workspace. Available on Business and Enterprise plans.
* [**Publishing domain**](https://docs.lovable.dev/features/publishing-domain.md): A domain or subdomain you own, such as `apps.acme.com`, connected to a workspace so that every app it publishes gets an address under it, such as `dashboard.apps.acme.com`. Enterprise plans.
* [**Analytics**](https://docs.lovable.dev/features/analytics.md): Built-in traffic metrics for published projects, split by channel (search and AI, social, referral, direct, ads), with Google Search Console data, the SEO review, and next steps to get more visitors.
* [**SEO and AI search (AEO)**](https://docs.lovable.dev/features/seo-aeo.md): Search Engine Optimization and Answer Engine Optimization together, on the **SEO & AI** tab in Analytics. Includes on-demand SEO reviews, sitemap and `robots.txt` checks, keyword research in the project chat, and Google Search Console setup.

### Hosting and built-in backend

* [**Built-in backend**](https://docs.lovable.dev/features/cloud) (Cloud): Lovable [hosts your app](https://docs.lovable.dev/features/hosting.md) and runs its database, storage, authentication, realtime, and functions, all with no external setup. Parts of the product call it Cloud, such as Cloud credit usage.
* [**Database**](https://docs.lovable.dev/features/database): Your app's organized data store, where records such as users, orders, and messages live in tables. The Database view lets you browse those tables, edit records, run SQL, and review the rules that protect each row.
* [**Storage**](https://docs.lovable.dev/features/storage.md): Buckets holding your app's uploaded files, such as photos and documents. Private by default, with signed URLs for sharing.
* [**Jobs**](https://docs.lovable.dev/features/jobs.md): Scheduled background tasks in your app's backend, such as a daily summary email, with a run history. Created by prompting Lovable.
* [**Logs**](https://docs.lovable.dev/features/logs.md): A searchable record of everything your app's backend does, across functions, database, auth, and storage. Where debugging starts.
* [**Project usage**](https://docs.lovable.dev/features/project-usage.md): The view showing what a project's hosting and backend usage costs, credit by credit, broken down by category.
* [**Database access and security**](https://docs.lovable.dev/features/database-access.md): The row level security policies that decide which rows each user can see or change, and the password Lovable rotates for a project's database.
* [**Database backups**](https://docs.lovable.dev/features/database-backups.md): Daily backups of a project's database that you can restore in place, and the export that gives you a full copy of the database to keep or move elsewhere.
* [**Database performance and capacity**](https://docs.lovable.dev/features/database-performance.md): The resource health cards, high-load notices, and slow-query fixes for a project's database, and the instance size and storage you can change for it.
* [**Pausing and removing a database**](https://docs.lovable.dev/features/database-pause-remove.md): Pausing stops a project's database, user accounts, and file storage until you wake them up. Removing deletes them and their data.
* [**Edge functions**](https://docs.lovable.dev/features/edge-functions.md): Small programs that run your app's behind-the-scenes logic on Lovable's servers, such as processing payments, calling other services, or handling webhooks.
* [**Secrets**](https://docs.lovable.dev/features/secrets.md): Securely stored API keys, tokens, and credentials for one project, made available to your backend code so they never appear in the browser.
* [**Build secrets**](https://docs.lovable.dev/features/build-secrets.md): Workspace-level environment variables that Lovable injects while your projects build, such as npm tokens for installing private packages. Enterprise plans.
* [**Email auth**](https://docs.lovable.dev/features/email-auth.md): Sign-in with an email address and password or one-time codes, with configurable confirmation and password rules. The default sign-in method for apps on the built-in backend.
* [**Phone auth**](https://docs.lovable.dev/features/phone-auth.md): Sign-in with a phone number and an SMS one-time code, using your own SMS provider.
* [**Google auth**](https://docs.lovable.dev/features/google-auth.md): Sign in with Google for your app's users, using Lovable-managed OAuth or your own Google Cloud credentials.
* [**Apple auth**](https://docs.lovable.dev/features/apple-auth.md): Sign in with Apple for your app's users, using Lovable-managed OAuth or your own Apple Developer credentials.
* [**Lovable auth**](https://docs.lovable.dev/features/lovable-auth.md): Sign in with Lovable for your app's users, with the OAuth client registered and maintained by Lovable. Different from OAuth clients, which are for apps and tools not built with Lovable.
* [**SAML SSO (apps)**](https://docs.lovable.dev/features/saml-sso.md): App-level single sign-on that lets your app's end users sign in with their company identity provider (Okta, Entra ID, Google Workspace, OneLogin, JumpCloud, or any SAML 2.0 IdP). Configured per project. Different from workspace SSO.
* [**OIDC sign-in (apps)**](https://docs.lovable.dev/features/oidc-auth.md): App-level sign-in that lets your app's end users sign in with your own OpenID Connect provider (Auth0, Okta, Entra ID, Keycloak, or any OIDC provider). Configured per project. Different from workspace SSO.
* [**Lovable workspace identity reuse (apps)**](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md): A feature that lets apps built in the workspace recognize the logged-in workspace member automatically, with no separate login flow. Business and Enterprise plans. Different from workspace SSO and from SAML SSO for Cloud apps.
* [**Custom emails**](https://docs.lovable.dev/features/custom-emails.md): Authentication and app emails sent from your own domain, with automatic SPF, DKIM, and DMARC setup to improve deliverability.
* [**Payments**](https://docs.lovable.dev/features/payments.md): Built-in subscriptions and one-time payments powered by Paddle or Stripe.

### Security

* [**Security overview**](https://docs.lovable.dev/features/security): The umbrella for Lovable's built-in security: Quick and Deep scans, API key protection, RLS checks, dependency audits, and optional security connectors.
* **Quick scan**: A fixed set of database, dependency, and MCP server checks that runs in seconds and on every publish. Free, doesn't consume credits. Also triggers scans through configured security connectors, such as Wiz.
* **Deep scan**: A review of your application code for harder-to-detect vulnerabilities. Includes the Quick scan checks. Free when you run it yourself. Scheduled Deep scans cost 1 credit per project per run.
* [**Security view**](https://docs.lovable.dev/features/security-view.md): Per-project tab showing scan results, dependency findings, and security recommendations.
* [**Security center**](https://docs.lovable.dev/features/security-center): Workspace-level dashboard that aggregates security findings, scan coverage, scheduled scans, secrets, and dependency risks across every project. Business and Enterprise plans.
* [**Security insights**](https://docs.lovable.dev/features/security-insights.md): Portfolio view in the Security center that combines security findings, PII, ownership, lifecycle, publish status, and activity into a single review priority per project. Business and Enterprise plans.
* [**Privacy & security settings**](https://docs.lovable.dev/features/privacy-and-security-settings.md): Workspace-wide controls for default project access, publishing permissions, MCP access, sensitive data scanning, and data protection.

### Integrations

* [**App + chat connectors**](https://docs.lovable.dev/integrations/app-connectors.md): A connection type that runs on one shared account and works in two places: Lovable uses it in the chat while you build, and your published app uses it while people use the app. Created once per workspace and linked to the projects that need it.
* [**App user connectors**](https://docs.lovable.dev/integrations/app-user-connectors.md): A connection type where each end user of your published app connects their own account (for example their own Gmail or Salesforce), so the app acts with that user's permissions and sees only their data.
* [**Chat connectors (MCP servers)**](https://docs.lovable.dev/integrations/chat-connectors.md): A personal connection to one of your own tool accounts, such as Notion, Linear, Jira, Confluence, or Miro, built on the Model Context Protocol. Gives Lovable real context from that tool in the chat while you build, and is never part of the published app.
* [**Custom connector**](https://docs.lovable.dev/integrations/create-connector.md): An app + chat connector a workspace admin creates for any REST API, such as an internal service. It appears in that workspace's connector catalog, and members connect to it like any other connector. Its connector knowledge files, which teach Lovable how to call the API, are separate from [workspace and project instructions](https://docs.lovable.dev/features/knowledge.md).
* [**Lovable MCP server**](https://docs.lovable.dev/integrations/lovable-mcp-server.md): An MCP server that lets external AI agents and developer tools build, iterate on, and deploy Lovable apps programmatically, for example from ChatGPT, Claude Desktop, or Cursor.
* [**Lovable API**](https://docs.lovable.dev/integrations/lovable-api.md): A REST API for accessing and managing your Lovable entities, such as projects, workspace settings, security scans, and so on, programmatically from your own scripts and services. Authenticated with workspace API keys. Business and Enterprise plans.
* [**Lovable API connector**](https://docs.lovable.dev/integrations/lovable-api-connector.md): An app + chat connector that lets an app you build with Lovable call the Lovable API for a connected workspace, with the API key stored by Lovable instead of in your app.
* [**API keys (access tokens)**](https://docs.lovable.dev/features/api-keys.md): Workspace-scoped keys that authenticate requests to the Lovable API, with scopes, expiry dates, optional per-key credit limits, and optional IP allowlists. Managed in [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys) by workspace owners and admins.
* [**Lovable AI**](https://docs.lovable.dev/features/ai): Built-in AI models you can use inside the apps you publish, for chatbots, summaries, sentiment detection, image generation, semantic search, and more. No API keys required.
* [**Live voice models**](https://docs.lovable.dev/features/ai-live-voice.md): Lovable AI models that let the people who use your app talk with it in a two-way spoken conversation, interrupt it, and have it act on what they say during the call.
* [**Build with URL**](https://docs.lovable.dev/integrations/build-with-url.md): A way to create Lovable apps from a URL by passing prompts and images as parameters. Links open with the prompt prefilled and ready to send, useful for embedding "Build with Lovable" buttons or sharing predefined prompts.
* [**Lovable desktop app**](https://docs.lovable.dev/integrations/desktop-app.md): A native app for macOS and Windows with sidebar navigation between your chats and projects, local MCP support (Figma, Paper), and keyboard shortcuts.
* [**Lovable mobile app**](https://docs.lovable.dev/integrations/lovable-mobile-app.md): The mobile companion app for building and reviewing Lovable projects on the go.
* [**Supabase**](https://docs.lovable.dev/integrations/supabase.md): Open-source backend-as-a-service. Can be connected to Lovable projects as an alternative to the built-in backend.
* [**Git sync**](https://docs.lovable.dev/integrations/git-sync-overview): Two-way sync between a Lovable project and a Git repository, for version control, code review, and developer collaboration. Works with GitHub, GitLab, and Bitbucket.
* [**GitHub integration**](https://docs.lovable.dev/integrations/github.md): Git sync with a GitHub repository.
* [**GitLab integration**](https://docs.lovable.dev/integrations/gitlab.md): Git sync with a GitLab project.
* [**Bitbucket integration**](https://docs.lovable.dev/integrations/bitbucket.md): Git sync with a repository in a Bitbucket Cloud workspace.

### Plans, credits, and billing

* **Credits:** Units Lovable uses to measure and pay for credit-based usage across your workspace. Credits can be used for building your app, hosting it and running its built-in backend, and powering AI features in deployed apps.
* **Credit top-up:** An optional purchase of additional credits available on Pro and Business plans, separate from your monthly subscription. Top-ups can be purchased manually as a one-time top-up or automatically with auto top-up.
* **Daily build credits:** Credits granted every day on Free, Pro, and Business plans for build usage, and for chat usage after the daily chat allowance is used up. Free, Pro, and Business plans include 5 daily build credits that reset every day at 00:00 UTC and do not roll over. Free daily build credits are capped at 30 per calendar month. Pro and Business daily build credits do not have a monthly cap.
* **Usage-specific grants:** Included credits that apply only to one type of usage, such as the daily chat allowance, daily build credits, the monthly Cloud grant, or the monthly AI grant. Usage-specific grants belong to the workspace, are used before general credits, and do not roll over. The daily chat allowance and daily build credits reset every day at 00:00 UTC. On Free plans, monthly Cloud and AI grants reset on the 1st of each calendar month at 00:00 UTC. On Pro and Business plans, monthly Cloud and AI grants refresh with the subscription billing cycle.
* **General credits:** Credits that can be used after usage-specific grants run out to build your app, host your app and run its built-in backend, and power AI features in deployed apps. General credits include monthly plan credits, top-up credits, and bonus credits.
* **Rollover credits:** Unused monthly plan credits carried forward from a previous billing period, shown as their own credit type in the Credit balance breakdown. Rollover credits keep their original expiry date: 2 months after issue on monthly plans, and 1 month after the annual billing period ends on annual plans.
* [**Usage limit**](https://docs.lovable.dev/features/usage-limits-and-alerts.md): A credit threshold that workspace owners and admins set for the workspace, a project, a member, a group, or an access token. Reaching it sends a notification, blocks further usage, or both.
* [**Balance alert**](https://docs.lovable.dev/features/usage-limits-and-alerts.md): A notification that warns workspace owners and admins when the workspace credit balance drops below an amount or percentage they choose.

See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for more information.

## General development concepts

These terms are not Lovable-specific. They come up across web, design, and backend development and are included here as a reference when you see them in the docs.

### Frontend and UI

* **Frontend**: The part of an app users see and interact with in the browser.
* **React**: The JavaScript library Lovable uses to build user interfaces.
* **Tailwind CSS**: The utility-first CSS framework used to style Lovable projects.
* **Component**: A reusable piece of UI (button, card, form, navbar) that combines to build pages.
* **Responsive design**: Layouts that adapt to different screen sizes such as mobile, tablet, and desktop.
* **Hero section**: The prominent area at the top of a landing page, typically containing a headline, subheading, and call to action.
* **CTA (Call to action)**: A button or link prompting users to take an action, such as "Sign up", "Get started", or "Buy now".
* **Modal / Dialog**: An overlay window that interrupts the main flow to capture attention or input.
* **Toast**: A brief, non-intrusive notification that appears temporarily.
* **Tooltip**: A small popup that appears on hover or focus to provide extra information.
* **Skeleton loader**: A placeholder UI that mimics the final layout while real content is loading.
* **Above the fold**: The portion of a page visible without scrolling.
* **Breadcrumb**: A navigational element showing a user's location within the site hierarchy.
* **Favicon**: The small icon shown in browser tabs and bookmarks.

### Design language and styles

Use these terms in prompts to steer Lovable toward a specific aesthetic.

* **Glassmorphism**: Translucent, frosted glass elements with blur and subtle borders.
* **Neobrutalism**: Bold, raw, high-contrast design with unpolished edges and chunky typography.
* **Minimal**: Clean layouts, lots of whitespace, restrained color and type.
* **Premium**: Refined, sophisticated, attention-to-detail aesthetic.
* **Retro**: Visual styles borrowed from past decades, such as neon, pixel, or vintage.

### Backend, databases, and APIs

* **Backend**: The behind-the-scenes part of an app, where data is stored, rules are enforced, and users are signed in. The frontend is what users see; the backend is what makes it work.
* **Database**: Organized storage for an app's data, holding records such as users, products, or messages in a structured way the app can read and update. Lovable apps use a relational (table-based) database.
* **API (Application Programming Interface)**: A way for two software systems to talk to each other. An API defines what one system can ask another for, and what answers to expect.
* **REST API**: The most common API style. It uses standard web requests (GET to read, POST to create, PUT to update, DELETE to remove) at predictable URLs.
* **Endpoint**: A specific URL on an API where your app sends or receives one kind of data, such as `/customers` for customer records.
* **Webhook**: A notification an external service sends to your app when something happens there, such as Stripe telling your app that a payment succeeded.
* **CRUD (Create, Read, Update, Delete)**: The four basic things an app does with data. A contact manager is CRUD at work: add a contact, view it, edit it, remove it.
* **SQL (Structured Query Language)**: The language used to work with relational databases. Lovable writes SQL for you, and you can run your own queries in the [SQL editor](https://docs.lovable.dev/features/database#run-sql-queries).
* **PostgreSQL**: The open-source database that powers the built-in backend and Supabase, and where your app's data lives.
* **RLS (Row-level security)**: Rules that decide which rows of data each user can see or change, for example "users can only read their own orders". Essential for multi-user apps. Review yours in the [RLS policies view](https://docs.lovable.dev/features/database-access.md#row-level-security-rls-policies).
* **Bucket**: A folder-like container for files (images, videos, documents) in [storage](https://docs.lovable.dev/features/storage.md).

### Authentication and security

* **OAuth**: A protocol that lets users log in to your app using a third-party account (Google, GitHub, etc.) without sharing their password.
* **SAML 2.0**: An XML-based standard for enterprise single sign-on between an identity provider and a service provider.
* **OIDC (OpenID Connect)**: A modern authentication layer on top of OAuth 2.0, commonly used for SSO.
* **IdP (Identity provider)**: A service that authenticates users, such as Okta, Microsoft Entra ID, Google Workspace, Auth0, JumpCloud, or OneLogin.
* **2FA (Two-factor authentication)**: A second verification step in addition to a password.
* **CORS (Cross-Origin Resource Sharing)**: A browser security policy that controls which origins can call your API.

### SEO and discoverability

* **SEO (Search Engine Optimization)**: Optimizing a site to rank in traditional search engines like Google or Bing.
* **AEO (Answer Engine Optimization)**: Optimizing a site so AI search engines like ChatGPT, Perplexity, Claude, or Gemini surface it as an answer.
* **Meta title / Meta description**: The page title and short summary shown in search results.
* **Canonical URL**: The preferred URL for a page, used to avoid duplicate-content issues.
* **Sitemap**: An XML file listing a site's pages to help search engines crawl them.
* **robots.txt**: A file telling crawlers which paths they can or can't access.
* **llms.txt**: An optional, experimental convention for summarizing a site's content for AI systems. Lovable does not require it or include it in SEO & AI search review findings.
* **Open Graph**: Meta tags that control how a page is previewed when shared on social platforms.

### Design and asset resources

External tools and libraries commonly used with Lovable.

* [**21st.dev**](https://21st.dev/): Open-source React UI components powered by Tailwind CSS and Radix UI.
* [**Google Fonts**](https://fonts.google.com/): Free, web-optimized font library.
* [**SVG Repo**](https://www.svgrepo.com/): Open-licensed SVG icons and graphics.
* [**Dribbble**](https://dribbble.com/): Designer community for visual inspiration.
* [**Noun Project**](https://thenounproject.com/): Library of free icons and stock imagery.
* [**Typewolf**](https://www.typewolf.com/): Curated font pairings and typography inspiration.


## Related topics

- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Connect your app to Cube](https://docs.lovable.dev/integrations/cube.md)
