# Find your way around the Lovable editor
<!-- source: https://docs.lovable.dev/features/projects/editor.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Find your way around the Lovable editor

> A guided map of the Lovable editor: where every tool lives, from the chat panel and live preview to the project toolbar, More menu, and keyboard shortcuts.

Opening a project takes you to the **editor**. This is where you build: you describe what you want in the chat panel on the left, and you watch your app take shape in the preview on the right. Everything else, from version history to publishing, is one or two clicks away in the top bar.

This page is a map of the editor, so you always know where to find things.

> [!NOTE]
>
> The layout described here is the desktop browser experience. On smaller windows some controls collapse into overflow menus, and the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md) arranges the same areas as swipeable views instead of a top bar.

## The two main areas

* **Chat panel** (left): Where you tell Lovable what to build and follow its progress. Learn more in [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md).
* **Preview** (right): A live, interactive version of your app that updates as Lovable works. Learn more in [Preview your app](https://docs.lovable.dev/features/projects/preview.md).

The rest of the editor's controls sit in the top bar.

## Sidebar

The menu icon in the top-left corner opens the [dashboard sidebar](https://docs.lovable.dev/introduction/dashboard-overview.md) along the left edge of the editor, so you can switch workspaces, open another project or folder, search, and reach **Connectors** without leaving the editor. Hover the icon to reveal the sidebar temporarily, or click it to keep the sidebar open. To close it, click the **Close sidebar** icon at the top of the sidebar, or press **\[**, which opens and closes it.

Inside a project, the sidebar gives you:

* **Workspace switcher**: Click your workspace name to switch workspaces. On Free, Pro, and Business plans, the menu also shows a credit bar with the workspace's remaining credits and your own **Personal usage** for the month (or **Personal credits**, when a member credit limit applies to you). On Business plans, editors find their personal usage in **Workspace settings → Plans & credit usage** instead. See [View your credit balance](https://docs.lovable.dev/introduction/credits-and-usage.md#view-your-credit-balance).
* **New**: Go to the dashboard to start a new project or chat.
* **Search**: Open the [command palette](#command-palette).
* **Projects**: Open the **Projects** page, which shows your folders and the projects that are not in a folder. See [Find and search projects](https://docs.lovable.dev/introduction/project-search-and-find.md#project-list).
* **Connectors**: Open your workspace's connector catalog. See [Connectors](https://docs.lovable.dev/integrations/introduction).
* **Pinned**, **Projects**, and **Recent chats**: Open pinned items, filter your projects, or return to a recent conversation. See [Pinned, projects, and recent chats](https://docs.lovable.dev/introduction/dashboard-overview.md#pinned-projects-and-recent-chats).
* **Project actions**: Hover a project and click its **⋯** button to open the **Project actions** menu, where you can pin the project, move it to a folder, rename it, remix it, or open its settings.
* **User menu**: Click your avatar at the bottom to open your [account settings](https://docs.lovable.dev/introduction/lovable-account-settings), change the theme under **Appearance**, reach support and the community, or log out. See [User menu](https://docs.lovable.dev/introduction/dashboard-overview.md#user-menu) for everything in it.

The sidebar also shows the referral card, where you earn credits by sharing Lovable. Not available on Enterprise plans. See [Share Lovable](https://docs.lovable.dev/introduction/dashboard-overview.md#share-lovable).

## Project name and drafts

Your project's name sits in the top bar next to the menu icon, and it tells you which version of the project you're looking at: the name on its own for the main version, or the name with a draft's name beside it while you're in that draft. Click it to open the draft switcher, where you can create a [draft](https://docs.lovable.dev/features/drafts.md), switch between the main version of your project and your drafts, and accept a draft into your project. The top row of the switcher is the main version of your project, and it has a **Project settings** button when you can edit the project.

To rename the project, edit **Project name** in [project settings](https://docs.lovable.dev/features/projects/settings.md#details). In the editor you can also press **Cmd+Shift+.** (Mac) or **Ctrl+Shift+.** (Windows/Linux).

## History

The **History** toggle next to the project name opens your project's version history, where you can browse past versions, restore an earlier one, and manage bookmarks. Learn more in [Version history](https://docs.lovable.dev/features/projects/history.md).

## Hide chat panel

The **Hide chat panel** toggle collapses the chat panel to give the preview the full window, and **Show chat panel** brings it back. You can also press **Cmd+B** (Mac) or **Ctrl+B** (Windows/Linux).

## Project toolbar

The tabs in the project toolbar switch what the main area shows:

* **Preview**: The home tab. Shows your app running live, so you can click through it exactly as your users would. See [Preview your app](https://docs.lovable.dev/features/projects/preview.md).
* **Files**: The files that live alongside your app: documents Lovable [generates for you](https://docs.lovable.dev/features/generate-files.md) and [files you upload](https://docs.lovable.dev/features/generate-files.md#upload-your-own-files), like reports, exports, and other deliverables. Group them into [collections](https://docs.lovable.dev/features/generate-files.md#collections), and see new files appear as Lovable creates them.
* **Code**: A full code editor where you can read your project's code, edit it directly on paid plans, and download it. See [the code editor](https://docs.lovable.dev/features/code-mode.md).
* **More**: Opens a panel with the rest of your project's tools, listed below.

### The More menu

**More** is the last tab in the project toolbar, after **Preview**, **Files**, and **Code**. Click it to open a panel with tools for growing and running your app:

| Section | What it's for |
| - | - |
| **Analytics** | Visits to your published app and which channels bring them, with no tracking code to add. Also shows Google Search Console data, the SEO review, and next steps to get more visitors. Learn more in [Analytics](https://docs.lovable.dev/features/analytics.md). |
| **Database** | Your app's data, in tables you can browse and edit. Under **Manage** you also find the SQL editor, scheduled jobs, edge functions, backups, access policies, and database settings. Learn more in [Database](https://docs.lovable.dev/features/database). |
| **Users** | The people with accounts in your app, and the ways they can sign in. Learn more in [Users and authentication](https://docs.lovable.dev/features/authentication). |
| **Storage** | The files your app stores, organized in buckets. Learn more in [Storage](https://docs.lovable.dev/features/storage.md). |
| **AI** | Monitor and manage the AI features inside your app, such as model usage and spend. Learn more in [AI](https://docs.lovable.dev/features/ai). |
| **AI → Agent integrations** | Publish your app as an MCP server, so AI assistants such as ChatGPT and Claude can use it. Learn more in [Agent integrations](https://docs.lovable.dev/features/agent-integrations.md). |
| **Payments** | Accept payments in your app through the built-in **Paddle** and **Stripe** integrations, with Lovable wiring up the checkout. Learn more in [Payments](https://docs.lovable.dev/features/payments.md). |
| **Emails** | Send transactional email, such as sign-up confirmations and receipts, from your app's own address. Requires a paid plan. Older React + Vite apps also need the built-in backend, because they have no server of their own. Learn more in [Send emails](https://docs.lovable.dev/features/custom-emails.md). |
| **Connectors** | See the services your project is connected to, with links to manage each connection. Learn more in [Connectors](https://docs.lovable.dev/integrations/app-connectors.md). |
| **Security** | Review security findings for your project and fix them with Lovable's help. Learn more in [Security](https://docs.lovable.dev/features/security). |
| **Security → Sensitive data** | Appears when sensitive data scanning is enabled for your workspace, and shows what personal data your app handles. Learn more in [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md). |
| **SEO & AI search** | The SEO review now lives on the **SEO & AI** tab in Analytics. This entry shows a notice with an **Open Analytics** button. Learn more in [SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md). |
| **Usage** | What this project costs, credit by credit, with **Build** and **Run** filters. Learn more in [Project usage](https://docs.lovable.dev/features/project-usage.md). |
| **Settings** | The project's own settings: **General**, **Instructions**, **Domains**, and **Git**. Projects that use the built-in backend also show **Secrets** and **Logs**. You need edit access to the project for most of them. Learn more in [Project settings](https://docs.lovable.dev/features/projects/settings.md). |

**Supabase** appears instead of the backend sections when your project uses your own Supabase project. Learn more in [Supabase](https://docs.lovable.dev/integrations/supabase.md).

> [!NOTE]
>
> What you see in the More menu depends on your project and plan: sections tied to a feature appear once you use it.

## Top right controls

These controls sit above the preview and are available while the **Preview** tab is active. From left to right:

* **Preview toolbar button**: Brings back the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) when it's hidden, so you can select elements, edit text inline, and draw on the preview.
* **Comments**: Open your project's comments to catch up on feedback from collaborators. This button shows when the preview toolbar is hidden. When the toolbar is visible, comments live in the toolbar itself. See [Project comments](https://docs.lovable.dev/features/project-comments.md).
* **Collaborator avatars**: See who else is in the project right now, and invite others.
* **Share**: Invite collaborators, control who can access the project, and create preview links. See [Share your project](https://docs.lovable.dev/features/share-project.md).
* **Publish**: Deploy your app to its live URL, or push an update to the published version. On all plans you can restrict the published app to people you invite. On Business and Enterprise plans you can also publish it to your whole workspace. You can also ask Lovable to publish in the project chat. See [Publish your project](https://docs.lovable.dev/features/publish.md).

## Command palette

Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) anywhere in the editor to open the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) and search for projects, folders, and settings from the keyboard. The **Drafts** group lists **Main preview** and every draft in the project.

## FAQ

> **Where do I find my database and the rest of the backend?**
>
> Open the **More** tab in the project toolbar and select **Database**. Your user accounts and files are next to it, under **Users** and **Storage**, and the backend tools open from **Manage** in the **Database** view. See [Database](https://docs.lovable.dev/features/database).

> **Where are my app's analytics?**
>
> Open the **More** tab in the project toolbar and select **Analytics**. See [Analytics](https://docs.lovable.dev/features/analytics.md).

> **How do I open the code editor?**
>
> Click the **Code** tab in the project toolbar. See [the code editor](https://docs.lovable.dev/features/code-mode.md).

> **Where are project settings?**
>
> In the editor, you can open them from:
>
> * The **Chat actions** menu next to the chat input, under **Project → Settings**
> * The **More** tab in the project toolbar, under **Settings**
> * The **Project settings** button on the top row of the draft switcher
> * The **Cmd+.** (Mac) or **Ctrl+.** (Windows/Linux) shortcut
>
> Outside the editor, you can open them from:
>
> * A project card's three-dot menu on the dashboard, under **Settings**
> * A project's **⋯** menu in the sidebar, under **Settings**
> * The project's name in the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md#editor-and-project-menu), under **Settings**
>
> From anywhere in Lovable, the [command palette](#command-palette) finds any setting by name. See [Where to find project settings](https://docs.lovable.dev/features/projects/settings.md#where-to-find-project-settings) for details.

> **Where are Help center and Contact support?**
>
> Both are in the **Chat actions** menu next to the chat input. **Help center** opens [lovable.dev/support](https://lovable.dev/support). On Enterprise plans, you find it together with **Contact support** under **Help & support**, and **Contact support** opens a support request for this project. See [Chat actions](https://docs.lovable.dev/features/projects/chat.md#chat-actions).

> **Where are Pin and Move to folder in the editor?**
>
> Open the sidebar, hover the project, and click its **⋯** button to open the **Project actions** menu. From the same menu you can also rename, remix, or delete the project. All of these actions are also on the project card on the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#manage-projects-from-the-dashboard).

> **Where do I manage who can access my project?**
>
> In the **Share** menu in the top right, not in project settings. Share is where you invite collaborators, set roles, and control the project's visibility. See [Share your project](https://docs.lovable.dev/features/share-project.md).

> **How do I switch to another project?**
>
> Click the menu icon in the top-left corner to open the sidebar and pick any project or folder without leaving the editor.

> **I don't see a tab described here. Where did it go?**
>
> On smaller windows, some tabs collapse into an overflow menu at the end of the project toolbar, so try widening your browser window. Some tools also appear only when they're relevant to your project or included in your plan.


## Related topics

- [Database](https://docs.lovable.dev/features/database.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Sync your Lovable project with GitLab](https://docs.lovable.dev/integrations/gitlab.md)
