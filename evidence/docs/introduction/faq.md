# FAQ
<!-- source: https://docs.lovable.dev/introduction/faq.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQ

> Common questions about Lovable: what it builds, what each feature does, what it costs, how your account works, and how Lovable handles security and your data.

Quick answers to common questions about Lovable, each with a link to the full documentation. If something is not working, see the [Support policy](https://docs.lovable.dev/introduction/support-policy.md).

## What Lovable is and what it builds

> **What is Lovable?**
>
> Lovable is an AI development platform that builds full-stack web applications from a description in plain language. You describe what you want, and Lovable writes the code for the interface, the backend, the database, login, and integrations, then hosts the finished app for you. The code is yours, and anyone on your team can build with you from a shared workspace. See [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md).

> **Who founded Lovable?**
>
> Anton Osika and Fabian Hedin founded Lovable in 2023 in Stockholm, Sweden, where the company is still headquartered. It was first known as GPT Engineer. Lovable's investors are listed in its funding announcements, most recently the [Series C announcement](https://lovable.dev/blog/series-c).

> **What can I build with Lovable?**
>
> Lovable is used mainly for full-stack web applications: SaaS products, internal tools, dashboards, CRMs and client portals, booking and marketplace apps, company websites and landing pages, portfolios, and AI-powered apps such as chatbots.
>
> Lovable also creates things that are not apps: presentations and pitch decks, generated and edited images, short videos, and downloadable files such as PDF reports, spreadsheets, and Word documents. See [What you can build with Lovable](https://docs.lovable.dev/introduction/welcome.md#what-you-can-build-with-lovable) and [Generate files](https://docs.lovable.dev/features/generate-files.md).

> **Do I need coding experience to build with Lovable?**
>
> No. Lovable is designed for every level of experience. Whether you are a developer or have never written code, you build by describing what you want in the project chat. Anyone with edit access to a project can read every line of the generated code in the [code editor](https://docs.lovable.dev/features/code-mode.md), edit it there on paid plans, or keep it in a Git repository with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview). See [Quick start](https://docs.lovable.dev/introduction/getting-started.md).

> **Does Lovable support mobile app development?**
>
> Not as native apps. Lovable builds web applications, which you can design to be fully mobile friendly, and it does not generate React Native projects.
>
> If you want an installable app on phones, you have two common paths: make your published app a Progressive Web App (PWA) that people add to their home screen, or wrap your published URL with a tool such as Capacitor outside Lovable and submit that to the App Store or Play Store. See [Can I publish my project as a native iOS or Android app to the App Store or Play Store?](https://docs.lovable.dev/features/publish.md#can-i-publish-my-project-as-a-native-ios-or-android-app-to-the-app-store-or-play-store) for both paths.

> **Is there a Lovable app for my phone?**
>
> Yes. Lovable is available as an app for iOS and Android, with the same account, projects, and credits as the web app, so you can keep building from your phone. This is different from turning a project you built into a mobile app. See [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md) and [Can I publish my project as a native iOS or Android app to the App Store or Play Store?](https://docs.lovable.dev/features/publish.md#can-i-publish-my-project-as-a-native-ios-or-android-app-to-the-app-store-or-play-store).

> **Can I start a project from code that already exists, such as a GitHub repository?**
>
> Yes. [Import the project](https://docs.lovable.dev/features/projects/import-project.md). Upload a ZIP of the code from Replit, Manus, Bolt, Base44, v0, or any other tool, including a repository you downloaded as a ZIP. Lovable rebuilds the app and moves the database and users to Lovable's built-in backend.
>
> To start from a website you own, [import it from its URL](https://docs.lovable.dev/features/projects/import-website.md).
>
> Git sync does not import a repository. When you connect a project to GitHub, GitLab, or Bitbucket, Lovable creates a new repository from the project, and you cannot connect an existing one. See [Git sync](https://docs.lovable.dev/integrations/git-sync-overview).

> **What tech stacks does Lovable use?**
>
> New Lovable apps created from May 13, 2026 (June 22, 2026 for Enterprise workspaces) use TanStack Start, which renders pages on the server. Older apps use React + Vite and render in the browser, and Lovable serves pre-rendered copies of their published pages to verified search engines, social preview bots, and AI crawlers so they can read the content. You can [upgrade an eligible older project to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md).
>
> Backend functionality comes from the [built-in backend](https://docs.lovable.dev/features/cloud), [Supabase](https://docs.lovable.dev/integrations/supabase.md), or [third-party APIs](https://docs.lovable.dev/integrations/introduction).

> **Can I choose a different framework, such as Next.js?**
>
> No. Every project uses the same stack: TanStack Start for apps created from May 13, 2026 (June 22, 2026 for Enterprise workspaces), React + Vite for older apps, and a PostgreSQL database through the [built-in backend](https://docs.lovable.dev/features/cloud) or [Supabase](https://docs.lovable.dev/integrations/supabase.md). Lovable does not offer a choice of framework or database. If you need a different stack, keep a repository in sync with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) and continue the work outside Lovable. See [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md).

> **Which AI model does Lovable use?**
>
> Lovable uses current leading AI models and updates them for everyone automatically. Lovable chooses the model behind [Build mode](https://docs.lovable.dev/features/agent-mode.md), [Plan mode](https://docs.lovable.dev/features/plan-mode.md), and [Chat mode](https://docs.lovable.dev/features/chat-mode.md) in the project chat, and behind [Chats](https://docs.lovable.dev/features/chats.md), so you cannot pick a specific model for building.
>
> For AI features inside your own app, you can choose from the supported models listed on [AI features for your app](https://docs.lovable.dev/features/ai).

> **Who owns the projects and the code that Lovable creates?**
>
> You do. Your apps, code, and the content you create with Lovable are yours, subject to third-party rights such as open-source licenses. You can modify them, use them commercially, and host them wherever you choose. To take them with you, see [Download your project's codebase](https://docs.lovable.dev/features/code-mode.md#download-your-project’s-codebase), [Git sync](https://docs.lovable.dev/integrations/git-sync-overview), and [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md). For the full picture, see [Deployment, hosting, and ownership options with Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership) and the [Terms of Service](https://lovable.dev/terms).

> **Can I export all of my project's code?**
>
> Yes, in two ways:
>
> * On paid plans, everyone with edit access can download the whole project as a `.zip` file with **Download codebase**, at the bottom of the code editor's file panel or in **Project settings → Git**. On Enterprise plans, admins can limit downloads to workspace admins and owners. See [Download your project's codebase](https://docs.lovable.dev/features/code-mode.md#download-your-project’s-codebase).
> * On any plan, you can keep a repository in sync with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) and work on the code in any tool. To run the exported app on your own hosting, or to move away from Lovable, see [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md).
>
> Your app's database is separate from the code. Export it from **More → Database → Manage → Settings**, under **Export project data**. The export does not include stored files, Edge Function code, or secrets. See [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database).

> **Does Lovable host my published app?**
>
> Yes. When you select **Publish**, Lovable deploys a snapshot of your project to its own URL with HTTPS included and delivers it from locations around the world. Lovable runs the servers for you, and publishing to a `lovable.app` URL is free on all plans. On paid plans, you can connect your own domain. You can also run the app on hosting you choose. See [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md), [Publish](https://docs.lovable.dev/features/publish.md), and [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md).

## Plans, credits, and billing

> **What plans does Lovable offer?**
>
> Lovable has a Free plan and three paid plans:
>
> * **Free**: for trying Lovable and building smaller projects.
> * **Pro**: for fast-moving teams building together in real time.
> * **Business**: for growing departments that need advanced controls and governance.
> * **Enterprise**: for large organizations that need flexibility, scale, and governance. You arrange an Enterprise plan with the sales team.
>
> Paid plans are priced by the credits you get each month, not by the number of people in your workspace. Pro and Business come in several credit tiers. See [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) and [lovable.dev/pricing](https://lovable.dev/pricing).

> **Is Lovable free?**
>
> Yes. On the Free plan you can build and publish without paying. It includes 5 daily build credits (up to 30 per month), a daily chat allowance, and monthly grants for running your app's built-in backend and its AI features. Pro starts at 100 subscription credits per month and adds features such as custom domains, code editing, and email support. See [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md) and [lovable.dev/pricing](https://lovable.dev/pricing).

> **How do credits work?**
>
> A credit is the unit Lovable uses to measure usage across your workspace. One balance pays for building your app, chatting with Lovable, hosting your app and running its built-in backend, the AI features your deployed app uses, and connector usage. Build mode is priced on the complexity of the request and the work completed, so small, focused edits usually cost less than larger changes. A Plan mode message costs 1 credit plus any research Lovable runs while planning.
>
> Paid plans include a set number of subscription credits each month, issued when your billing cycle renews, and Pro and Business workspaces can buy more as top-ups. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for prices, included credits, and what happens when your balance reaches zero.

> **How do I get more credits?**
>
> Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing). From there you can upgrade your plan or, on Pro and Business plans, buy credit top-ups without changing your subscription. The low-credits alert in the project chat opens the same options. Workspace admins and owners can top up in one of two ways:
>
> * **One-time top-up**: select **Add credits**, then **Buy once**, and choose an amount. The credits are added to your workspace when the payment is confirmed, usually within a minute.
> * **Auto top-up**: Lovable buys credits automatically when your balance reaches or falls below a threshold you set, up to an optional monthly limit.
>
> Top-up credits are billed separately from your subscription and are valid for 12 months. You can also earn bonus credits by inviting people to Lovable. See [Credit top-ups](https://docs.lovable.dev/introduction/credit-top-ups.md), [Share Lovable](https://docs.lovable.dev/introduction/dashboard-overview.md#share-lovable), and [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md).

> **Is there a student discount?**
>
> Yes. Students and teachers get 50% off the Pro plan with 100 credits per month for up to 12 months, billed monthly. Lovable verifies your status at [lovable.dev/students](https://lovable.dev/students) by checking your account's email domain against a list of academic institutions, so log in with your academic email. You can verify only while your workspace uses the Free plan, and each person can use the discount once. See [Student and teacher discount](https://docs.lovable.dev/introduction/subscription-plans.md#student-and-teacher-discount).

> **How do I get free credits by referring someone?**
>
> Select the referral card at the bottom of the dashboard sidebar to copy your workspace's invite link. The person you invite receives 10 bonus credits when they sign up through your link, and you receive 100 bonus credits when they pay for their first Pro or Business subscription. A sign-up alone does not earn you credits.
>
> Referrals are available on Free, Pro, and Business plans in the web app, and referral credits expire 12 months after Lovable grants them. See [Share Lovable](https://docs.lovable.dev/introduction/dashboard-overview.md#share-lovable).

> **How do I cancel my subscription?**
>
> Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing), select **Manage** on your plan card, then **Downgrade to free**. Your plan stays active until the end of the current billing period. After that, your workspace moves to the Free plan.
>
> On a phone, cancel from **lovable.dev** in your browser. The mobile app has no cancel option.
>
> Plans bought inside the iOS app work differently. Each purchase covers one month and does not renew, so you have nothing to cancel, and your plan card shows **Managed by App Store** instead of **Manage**.
>
> See [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription).

> **Can I get a refund?**
>
> Subscription fees and credits are non-refundable, except where the law requires a refund. See the **No Refunds** section of the [Terms of Service](https://lovable.dev/terms).
>
> If you believe you were charged in error, for example a subscription that renewed after you canceled, contact support with your workspace name and the charge in question. The support team reviews billing errors. See [Contact support](https://docs.lovable.dev/introduction/support-policy.md#contact-support).
>
> When you cancel, Lovable stops future charges but does not refund the current billing period. Your plan runs until the period ends. Unused monthly plan and rollover credits are frozen rather than refunded, while top-up and bonus credits stay usable until they expire. See [What happens when you change or cancel](https://docs.lovable.dev/introduction/manage-subscription.md#what-happens-when-you-change-or-cancel)

> **Where do I find my invoices and receipts?**
>
> Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing), select **Manage** on your plan card, then **Invoices & payments**. Lovable opens the Stripe billing portal, which lists your invoices, receipts, payment methods, and billing details.
>
> Upcoming invoices and your payment history also appear in **Plans & credit usage**. Payment methods and billing details are stored by Stripe, so the portal is the only place to change them.
>
> Enterprise workspaces billed under a contract do not use the billing portal. Ask your account team for invoices.
>
> See [Invoices and billing](https://docs.lovable.dev/introduction/invoices-and-billing.md).

> **What stops working when I downgrade?**
>
> Features that are not included in your new plan stop working. Lovable keeps most settings, so those features resume if you upgrade again. Plan-dependent workspace defaults, such as the default project visibility, reset to the new plan's defaults instead. Two examples:
>
> * A hidden **Edit with Lovable** badge returns on your next publish, and Lovable warns you first.
> * An app published to your whole workspace stays live. The next time you publish changes from the publish dialog, the app switches to **Invite only**, and the dialog warns you first. See [What happens to my published app if I downgrade or cancel my plan?](https://docs.lovable.dev/features/publish.md#what-happens-to-my-published-app-if-i-downgrade-or-cancel-my-plan)
>
> If you downgrade to the Free plan, the unexpired credits from your paid subscription are frozen and return if you upgrade again before they expire. Top-up and bonus credits stay usable. See [Features that stop working when you downgrade](https://docs.lovable.dev/introduction/manage-subscription.md#features-that-stop-working-when-you-downgrade).

> **Can I hide the Lovable badge (watermark)?**
>
> Yes, on paid plans. **Hide Lovable badge** is a per-project setting in **Project settings → Publishing**. Enable it, and the **Edit with Lovable** badge disappears from your live site immediately, with no republish needed. See [Publishing](https://docs.lovable.dev/features/projects/settings.md#publishing) in Project settings.

## Your account and workspace

> **What is a workspace?**
>
> A **workspace** is the shared space where you and the people you invite build together. Every project lives in a workspace.
>
> * Your plan and credits belong to the workspace, not to individual members, so everyone in it builds from the same balance.
> * Plans are priced by credits, not seats, so adding members does not change your subscription cost.
> * Workspace admins and owners can set a default member credit limit for build credits and per-member overrides so no single person uses up the shared credits. See [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md) and [Set a per-member credit limit](https://docs.lovable.dev/features/people.md#set-a-per-member-credit-limit).
> * You can belong to several workspaces and switch between them at any time.
>
> See [Workspace](https://docs.lovable.dev/features/workspace).

> **Can I change the email I log in with?**
>
> Not directly. Create a new account with the email you want, then copy your projects into it by remixing them. A remix brings the code and the database structure, but not database records, custom domains, or the publish state.
>
> See [Move a project to another account](https://docs.lovable.dev/features/projects/remix.md#move-a-project-to-another-account).

> **How do I change or reset my password?**
>
> If you log in with email and password, go to [lovable.dev/login](https://lovable.dev/login), enter your email, and select **Forgot password?**. Lovable emails you a link to set a new password and logs you in when it is set.
>
> If you log in with Google, GitHub, Apple, or SSO, you have no Lovable password, and **Forgot password?** shows **Password reset unavailable**. Log in with that provider and change your password there. To check which methods are linked to your account, open [**Account settings → Account → Login methods**](https://lovable.dev/settings/account). See [Reset your password](https://docs.lovable.dev/introduction/create-an-account.md#reset-your-password).

> **How do I enable two-factor authentication (2FA)?**
>
> **Two-factor authentication (2FA)** protects your account by asking for a one-time code when you log in, in addition to your usual login method. Enable it in [**Account settings → Security**](https://lovable.dev/settings/account#2fa) and choose an authenticator app or text messages (SMS) as your second factor. Lovable recommends setting up both methods so you are not locked out if you lose one. 2FA applies to your account on every workspace. See [Two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md).

> **Can I use Lovable in my own language?**
>
> Yes. Choose the language Lovable's interface uses in **Account settings → Preferences → Language**. Lovable is available in English, French, German, Spanish, Portuguese (Brazil), Italian, Hindi, Indonesian, Japanese, Korean, and Thai, and your choice applies on every device you log in from. Not every part of Lovable is translated yet. See [Preferences](https://docs.lovable.dev/introduction/lovable-account-settings#preferences).

> **How do I delete my account?**
>
> Go to [**Account settings → Account → Danger zone**](https://lovable.dev/settings/account) and select **Delete account**.
>
> Lovable first asks you to hand over or delete any workspace where you are the only owner. Deletion then finalizes after a 30-day grace period. During those 30 days, you can log back in and cancel it. After that, your account and its data are permanently removed, and you cannot reactivate the account. See [Delete account](https://docs.lovable.dev/introduction/delete-account.md).

> **How can I transfer project ownership to someone else?**
>
> Go to **Project settings → Project actions**, select **Transfer ownership**, and choose a workspace member. The new owner must be a workspace owner, admin, or editor. Viewers, external collaborators, and pending invitees are not eligible: change a viewer's role or invite the person as a member in **Workspace settings → People** first.
>
> On Business and Enterprise plans, you can also enter the email address of a Lovable account outside your workspace, and that person receives a transfer request to accept. The new owner gets full control of the project, and your own access afterwards depends on your workspace role. See [Transfer project ownership](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership).

> **How do I add a Lovable skill to my LinkedIn profile?**
>
> Lovable identifies **Showcase skills** from how you build across your projects, for example **Website Development** or **AI Tools**. You earn skills in Free and Pro workspaces, and if you have earned one, it appears at the top of the **Account** section in [**Account settings**](https://lovable.dev/settings/account).
>
> Select **Add to LinkedIn** to post one skill to your profile, where it appears under **Connected apps**. You can post one skill at a time and disconnect it whenever you want. The feature is in beta. See [Showcase skills](https://docs.lovable.dev/introduction/lovable-account-settings#showcase-skills-beta) for the qualifying criteria.

## Privacy, security, and legal

> **Does Lovable use my data to train AI models?**
>
> As of September 9, 2026, Lovable may use customer data from Free and Pro plans (prompts including images and files you attach, code, project files, generated outputs, and usage data) to train, develop, and improve its AI models, as described in Section 5 of the updated [Privacy Policy](https://lovable.dev/privacy), unless you opt out. Your apps' end-user data and your account and billing details are not used for training, and Business and Enterprise workspace data is excluded from training by default.
>
> * **Free and Pro:** exclude your own data by disabling **Use my Lovable content for model training** in **Account settings → Preferences → AI model training**.
> * **Business and Enterprise:** workspace data is excluded by default.
>
> See [Manage training data and privacy](https://docs.lovable.dev/features/business/data-opt-out.md).

> **Is Lovable compliant with security standards?**
>
> Yes. Lovable holds SOC 2 Type II, ISO 27001:2022, and AIUC-1 certifications. Lovable is not HIPAA-compliant and does not sign Business Associate Agreements, the contracts HIPAA requires. The current certifications, policies, and sub-processor list are at [trust.lovable.dev](https://trust.lovable.dev/). See [Compliance](https://docs.lovable.dev/introduction/lovable-for-enterprise.md#compliance) on the Lovable for Enterprise page.

> **Is Lovable GDPR compliant?**
>
> Lovable is committed to meeting the requirements of the data protection laws that apply to its services, including the EU and UK GDPR (General Data Protection Regulation), and offers a [Data Processing Agreement](https://lovable.dev/data-processing-agreement). Lovable's practices are described in the [Privacy Policy](https://lovable.dev/privacy), and current certification and audit information is at [trust.lovable.dev](https://trust.lovable.dev/).
>
> The Data Processing Agreement is included on Business and Enterprise plans. See [Which plans include a Data Processing Agreement?](#which-plans-include-a-data-processing-agreement)

> **Which plans include a Data Processing Agreement?**
>
> The Data Processing Agreement (DPA) is included on Business and Enterprise plans. Free and Pro plans don't include it. To get the DPA, upgrade the workspace to Business. Enterprise customers can request a custom DPA from their Lovable account team.
>
> The DPA sets out how Lovable processes personal data on your behalf, including data about the people who use your published apps. It is part of the Terms of Service, so you don't need to sign it. You can download a copy signed by Lovable from the [Data Processing Agreement](https://lovable.dev/data-processing-agreement) page.
>
> If you downgrade from Business, the DPA stops applying. From then on, the [Privacy Policy](https://lovable.dev/privacy) covers how Lovable processes your data.

> **Can I store health, payment card, or government ID data in my app?**
>
> Not under the standard terms. Lovable's [Terms of Service](https://lovable.dev/terms) do not allow protected health information, payment card data, financial account numbers, government identifiers, or biometric data through Lovable, including in the apps you build. To take payments, use Lovable's [built-in payments](https://docs.lovable.dev/features/payments.md) or [your own Stripe account](https://docs.lovable.dev/integrations/stripe.md) instead of storing card details in your app. For regulated data, [contact sales](https://lovable.dev/enterprise) before you build.

> **Where can I find Lovable's legal documents?**
>
> The [Terms of Service](https://lovable.dev/terms), the [Privacy Policy](https://lovable.dev/privacy), the [Data Processing Agreement](https://lovable.dev/data-processing-agreement), and the [Platform Rules](https://lovable.dev/platform-rules) are published on lovable.dev. The refund policy is the **No Refunds** section of the Terms of Service.

## Getting help

> **How can I get support?**
>
> Everyone can use the docs, the docs assistant, the [status page](https://status.lovable.dev/), and the community on [Discord](https://discord.gg/lovable-dev).
>
> On paid plans, go to [lovable.dev/support](https://lovable.dev/support) and select **Contact us**. Lovable's support AI replies within minutes. If its answer does not help, ask for a human, and a member of the support team replies by email within 24 hours, mainly on weekdays. If the form is unavailable or you cannot log in, email [support@lovable.dev](mailto:support@lovable.dev) from your account's email address. See the [Support policy](https://docs.lovable.dev/introduction/support-policy.md).

> **What should I do when my app shows an error?**
>
> Work through these steps in order:
>
> 1. When a build error appears, select **Try to fix**. Lovable finds the issue and attempts a fix. Use it once or twice, then investigate. Your account includes 10 free fixes, shared across **Try to fix** and fixes from the Security view, in all your workspaces and projects. Each free fix becomes available again 24 hours after you use it. After you have used all 10, **Try to fix** is treated as standard build usage and consumes credits. See [Fix errors and get unstuck](https://docs.lovable.dev/features/projects/chat.md#fix-errors-and-get-unstuck).
> 2. If the error keeps coming back, switch to [Chat mode](https://docs.lovable.dev/features/chat-mode.md) or [Plan mode](https://docs.lovable.dev/features/plan-mode.md), describe what you see and what you expected, and ask Lovable to investigate before it changes any code.
> 3. If a recent change broke something, [revert to an earlier version](https://docs.lovable.dev/features/projects/history.md#revert-to-an-earlier-version).
>
> See [Debug and improve your app](https://docs.lovable.dev/prompting/prompting-debugging.md).

> **Where can I learn Lovable?**
>
> Start with the [Quick start](https://docs.lovable.dev/introduction/getting-started.md) and the guide [How to build a real product with Lovable](https://docs.lovable.dev/tips-tricks/from-idea-to-app.md) in these docs. For courses, go to the [Lovable Academy](https://academy.lovable.app/academy), a free learning site from the Lovable team. In its guided learning path, you build and publish a complete app lesson by lesson, and its video catalog offers short feature walkthroughs and longer deep dives. See [Videos and courses](https://docs.lovable.dev/introduction/video-tutorials.md).

> **Is there a Lovable community?**
>
> Yes. The community on [Discord](https://discord.gg/lovable-dev) is open to everyone, and Lovable team members and community champions take part. Community answers are not official support. Lovable also runs events and community programs, listed at [lovable.dev/community](https://lovable.dev/community), and the [Community Code of Conduct](https://lovable.dev/community-code-of-conduct) applies.

> **Can I hire someone to build my app?**
>
> Yes. [Lovable experts](https://lovable.dev/experts) are verified developers and agencies who build with Lovable. Browse the directory and contact an expert directly.

> **Does Lovable have a partner or affiliate program?**
>
> Yes. The [Lovable Partner Program](https://lovable.dev/partners) has two tracks, experts and solution partners, plus programs for affiliates, content creators, and community events. Partners in the two tracks get certified, are listed in the partner directory, and earn on the business they bring. Apply on the partner page, and Lovable recommends the track that fits.

## Common questions by feature

### Build your app

> **Can I start from a template?**
>
> Yes. [Lovable templates](https://lovable.dev/templates) are ready-made apps you can remix on any plan. Browse them in the templates gallery, which does not require you to log in, or in the **Lovable templates** tab on the dashboard. You need a Lovable account to remix, and the remix is your own independent copy. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).

> **What is the difference between Build mode, Plan mode, Chat mode, and Chats?**
>
> The project chat has three modes:
>
> * **Build** changes your project directly.
> * **Plan** investigates and writes a plan that you approve before Lovable builds.
> * **Chat** answers questions about your project, explains how something works, or investigates a problem without changing code.
>
> [Chats](https://docs.lovable.dev/features/chats.md) are conversations with Lovable outside any project. You start them from the dashboard, think through ideas there, and send work to a project when something needs building.
>
> Build and Plan messages are build usage. Chat mode and Chats are chat usage, which your workspace's daily chat allowance covers first on Free, Pro, and Business plans. See [Build mode](https://docs.lovable.dev/features/agent-mode.md), [Plan mode](https://docs.lovable.dev/features/plan-mode.md), [Chat mode](https://docs.lovable.dev/features/chat-mode.md), and [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs).

> **How do I control the design of my app?**
>
> On your first message, Lovable may ask a few design questions before it builds, unless your prompt already makes the look clear. To change something you can see, use the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) to select the element and describe the change.
>
> You can also start from a [Figma design](https://docs.lovable.dev/integrations/figma.md). On paid plans, connect a [design system](https://docs.lovable.dev/features/design-systems.md) so the projects you connect to it share the same components and styles. See [Design guidance](https://docs.lovable.dev/features/design-guidance.md).

> **Can my app have a database?**
>
> Yes. Every project can use the [built-in backend](https://docs.lovable.dev/features/cloud), which includes a managed PostgreSQL database, login, and file storage, or connect to your own [Supabase](https://docs.lovable.dev/integrations/supabase.md) project. Describe the data your app needs in the project chat, and Lovable creates the tables for you. See [Database](https://docs.lovable.dev/features/database).

> **Can I add a login page and user accounts to my app?**
>
> Yes. Ask Lovable to add sign-in, and it generates the sign-up and sign-in pages, connects them to your app's backend, and protects each user's data. Your app can let people sign in with email and password, a phone number through your own SMS provider, Google, Apple, Microsoft, their Lovable account, or SAML SSO. See [Authentication](https://docs.lovable.dev/features/authentication).

> **Can my app send emails?**
>
> Yes. If your app has sign-in on the built-in backend, it sends authentication emails, such as sign-up confirmations and password resets, and by default they come from a generic Lovable sender. On paid plans, you can add your own email domain so these emails come from an address such as `noreply@yourdomain.com`, with your own branding and templates. You can also ask Lovable to add app emails, such as order confirmations or notifications. See [Custom emails](https://docs.lovable.dev/features/custom-emails.md).

> **Can Lovable add payments to my app?**
>
> Yes. Lovable's built-in payments let your app sell digital products and software as subscriptions or one-time purchases, with Lovable handling the account setup and a payment provider processing the payments. Built-in payments require a paid Lovable plan. On the Free plan, you can connect [your own Stripe account](https://docs.lovable.dev/integrations/stripe.md) instead. See [Add payments to your app](https://docs.lovable.dev/features/payments.md).

> **Can Lovable add AI features to my app?**
>
> Yes. Describe the feature you want, such as a chatbot, a summary of long text, document questions and answers, translation, or image analysis, and Lovable adds it through its built-in AI connector. You do not set up a provider account or API keys. These features run inside your app and are separate from Lovable building your project. Their usage is billed in credits from your workspace balance. See [AI features for your app](https://docs.lovable.dev/features/ai).

> **Can Lovable generate or edit images?**
>
> Yes. Lovable generates images from a description and edits existing images, for example combining several images into one or making a background transparent. Use the results directly in your app, or ask for a standalone image, such as a logo or a poster, and download it from the project chat or the **Files** tab. To mark a change directly on an image stored in your project, open it in the **Files** tab and select **Edit**. Generated and edited images use build credits and appear as **Image generation** in your usage details. See [Add images and videos to your app](https://docs.lovable.dev/features/projects/chat.md#add-images-and-videos-to-your-app) and [Edit an image](https://docs.lovable.dev/features/generate-files.md#edit-an-image).

> **Can Lovable generate videos?**
>
> Yes. Ask Lovable for a short video, and it generates one you can use in your app. Generated videos use build credits and appear as **Video generation** in your usage details. See [Add images and videos to your app](https://docs.lovable.dev/features/projects/chat.md#add-images-and-videos-to-your-app).

> **Can Lovable create presentations or slide decks?**
>
> Yes. Ask Lovable for a presentation, pitch deck, or slideshow, and Lovable builds the deck as a web app. Slides present fullscreen in the browser, and you can publish the deck and share its link like any other project. If you need a file instead, ask for a PDF or a `.pptx` file and Lovable generates one you can download. See [Presentations and slide decks](https://docs.lovable.dev/features/generate-files.md#presentations-and-slide-decks).

> **How do I test my app?**
>
> Use the [preview](https://docs.lovable.dev/features/projects/preview.md) in the editor to try your app as you build. When you want Lovable to verify something, ask it: Lovable can test your app in a browser, write and run frontend tests, and check backend logic. Most of these tools run only when you ask for them. See [Test and verify your app](https://docs.lovable.dev/features/testing.md).

> **How does Lovable keep my app secure?**
>
> Lovable avoids common security mistakes while it builds. It also provides two security scans: the **Quick scan**, which runs automatically on every publish, and the **Deep scan**, which you run from the Security view. The Deep scan reviews all your application code for issues specific to your app's logic, permissions, and data. The scans support secure development but do not guarantee it, so consider a professional security review for apps that handle sensitive data or critical functionality. See [Security](https://docs.lovable.dev/features/security).

### Connect your app to other services

> **Can my app connect to third-party APIs and services?**
>
> Yes, in two ways:
>
> * Use a connector from the [**Connectors**](https://lovable.dev/dashboard?connectors) catalog when one exists. Lovable stores the credentials securely and handles the connection's sign-in and token refresh for you.
> * For a service that is not in the catalog, a workspace admin or owner can [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) for its API, or you describe the API in the project chat and Lovable integrates it directly. See [Integrate any API](https://docs.lovable.dev/integrations/any-api.md).
>
> [Custom MCP servers](https://docs.lovable.dev/integrations/custom-mcp.md) are different: they give Lovable live context from your internal tools while you build, and they are never part of your published app.

> **What can I do with the Lovable API?**
>
> The **Lovable API** is a REST API that lets you deploy Lovable projects, manage your workspace, monitor security, and embed projects in your own product from your own scripts and services. Workspace admins and owners on Business and Enterprise plans create API keys in [**Workspace settings → API keys & OAuth → Workspace access tokens**](https://lovable.dev/settings/api-keys).
>
> To connect your own app to Lovable, register an [OAuth client](https://docs.lovable.dev/features/oauth-clients.md). Workspace owners and admins on **all plans** can register OAuth clients. Sensitive OAuth scopes and workspace API keys require **Business or Enterprise**.
>
> See the [Lovable API overview](https://docs.lovable.dev/integrations/lovable-api.md), [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md), and the [API reference](https://docs.lovable.dev/api-reference/introduction.md).

### Collaborate

> **Can I work on a project with other people?**
>
> Yes, in two ways:
>
> * Invite people to your [workspace](https://docs.lovable.dev/features/workspace). Members with the editor role or above build their own projects from the shared plan and credits.
> * Share one project from its **Share** button, with workspace members or with **external collaborators**: people outside your workspace who get access to that project only, with the project role you give them, within the limits your workspace admins allow.
>
> Collaborators use credits from the project owner's workspace, and several people can build in the same project in their own [drafts](https://docs.lovable.dev/features/drafts.md). See [Collaboration](https://docs.lovable.dev/features/collaboration.md) and [Share a project](https://docs.lovable.dev/features/share-project.md).

### Publish and grow your app

> **How do I add a custom domain to my project?**
>
> Go to **Project → Settings → Domains** to connect a domain you already own. Workspace admins and owners can also buy a domain there through Lovable. Custom domains are available on paid plans. For the step-by-step path from publishing to a live site on your domain, follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md). For every option and status, see [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md).

> **How can I improve SEO and AI search visibility for my project?**
>
> Run the review in your project's **SEO & AI search** tab, under **More** in the project toolbar. It checks metadata, indexing, structured data, Open Graph previews, your sitemap, and `robots.txt`, and running it is free on all plans. Lovable can also research keywords and competitors with Semrush data, connect [Google Search Console](https://docs.lovable.dev/integrations/google-search-console.md), and optimize your pages for AI search engines. See [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md).
