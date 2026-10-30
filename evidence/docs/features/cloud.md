# Built-in backend
<!-- source: https://docs.lovable.dev/features/cloud.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Built-in backend

> Lovable hosts your app and includes a built-in backend with database, authentication, storage, edge functions, and AI, no infrastructure setup required.

Lovable [hosts your app](https://docs.lovable.dev/features/hosting.md) and includes a built-in backend (Cloud) with a database, storage, authentication, realtime, and functions. Describe what you want directly in Lovable, and Lovable generates both the frontend and backend, ready to run. Lovable manages the hosting and backend infrastructure for you. App hosting scales with traffic automatically, and you adjust your database's [instance size and storage](https://docs.lovable.dev/features/database-performance.md) as your app grows.

The built-in backend utilizes Supabase's open-source foundation, which means you get a production-ready environment from day one, without needing to set up Supabase separately: a database, real-time updates, user authentication, and storage, with none of the manual setup steps. Across the docs, this is called the **built-in backend**, as opposed to an external backend you connect yourself, such as [Supabase](https://docs.lovable.dev/integrations/supabase.md). You also see it called Cloud in parts of the product, such as your Cloud credit usage and the **Enable Cloud** permission.

## What's included

You'll find the backend tools inside any Lovable project by opening the [More menu](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) in the project toolbar. Each area has its own page with full details:

| Area | What you can do |
| - | - |
| [Database](https://docs.lovable.dev/features/database) | View your app's tables and edit records |
| [Users](https://docs.lovable.dev/features/authentication) | Manage the people who sign up and set up sign-in methods |
| [Storage](https://docs.lovable.dev/features/storage.md) | Store and manage the files your app works with |
| [Edge functions](https://docs.lovable.dev/features/edge-functions.md) | Run server-side code, such as webhooks and background work |
| [Jobs](https://docs.lovable.dev/features/jobs.md) | Review scheduled background tasks and their run history |
| [Secrets](https://docs.lovable.dev/features/secrets.md) | Store API keys and other sensitive values securely |
| [Logs](https://docs.lovable.dev/features/logs.md) | Debug errors and track backend activity |
| [Usage](https://docs.lovable.dev/features/project-usage.md) | See what the project costs in credits |

Your app's [AI features](https://docs.lovable.dev/features/ai) have their own **AI** section in the **More** menu.

For copy-paste prompts that add these features to your app, see the [prompt library](https://docs.lovable.dev/prompting/prompting-library.md).

## Enabling the built-in backend

By default, the built-in backend is enabled for your workspace. When a feature you ask for requires backend functionality (for example, authentication or file storage), Lovable enables the backend automatically or asks for your approval in the project chat first, depending on the **Enable Cloud** permission described below.

The database, user accounts, and file storage run together on one backend. Enabling any one of them provisions all three. [Pausing the database](https://docs.lovable.dev/features/database-pause-remove.md) pauses the other two, and removing it deletes their data as well.

Lovable can't enable the backend from inside a [draft](https://docs.lovable.dev/features/drafts.md). Ask in the main version of your project instead, then continue in the draft once the backend is on.

> [!NOTE]
>
> On some Enterprise workspaces, the built-in backend is disabled at the workspace level, and projects show a message that a workspace admin disabled it. This setting is not self-serve, so contact your Lovable account team to change it. In these workspaces, Lovable can [create a Supabase project](https://docs.lovable.dev/integrations/supabase.md#let-lovable-create-a-supabase-project) in your linked organization instead.

## Backend permissions

Each backend permission has three options:

* **Always allow**: Lovable automatically performs the action, without asking for review or approval. This is the default for most backend permissions.
* **Ask each time**: Lovable asks for your approval whenever the action is needed.
* **Never allow**: Lovable does not perform the action and says so in the project chat.

### Tool settings and defaults

| Setting | Description | Default behavior |
| - | - | - |
| Enable Cloud | Create and connect the built-in backend, which adds a database, authentication, and storage. Required before any of the permissions below apply. | Always allow |
| Read database | Allow Lovable to read your database. | Always allow |
| Read analytics | Query logs to investigate issues and behavior. | Always allow |
| Run security checks | Run automated security checks on your database. Not a full audit. | Always allow |
| Modify database | Make schema and policy changes via SQL migrations. Updates generated types. | Always allow |
| Execute backward incompatible database migrations | Allow changes to your database structure that may break your published app, such as dropping or renaming a table or column. With **Ask each time**, Lovable shows you the SQL and asks for your approval before it applies such a change. | Never allow |
| Change data | Add, update, or delete data in your database tables. | Always allow |
| Read project info | Read project configuration and environment details. | Always allow |
| Configure auth | Allow Lovable to configure authentication settings (for example, signup policies). | Always allow |
| Read backend logs | Read logs from backend services. | Always allow |

You can change these permissions anytime from [**Account settings → Preferences → Agent permissions**](https://docs.lovable.dev/introduction/lovable-account-settings#agent-permissions), which lists every connector's permissions in one place.

For how Lovable records changes to your database structure and which changes **Execute backward incompatible database migrations** controls, see [How Lovable changes your database structure](https://docs.lovable.dev/features/database#how-lovable-changes-your-database-structure).

## Choose where your project data is stored

Projects use one of three regions: **Americas**, **Europe**, or **Asia Pacific**. A region closer to your users lowers latency and speeds up your app's database responses.

Lovable picks the region when you enable the backend:

* **A workspace default takes precedence.** On Business and Enterprise workspaces, an admin can set a default data hosting region. When one is set, every new project uses it and members cannot choose a different region.
* **Otherwise, Lovable starts from your own setting.** Lovable uses your **Where project data is stored** setting when you have one, and the region closest to you when you do not.
* **You see the region only when Lovable asks you to approve.** With **Enable Cloud** set to **Ask each time**, Lovable shows the region before it creates the backend, and you can change it there. With **Always allow**, Lovable uses the region above without asking you.

> [!NOTE]
>
> You cannot change a project's region after the backend is enabled, and you cannot move an existing project to another region.

To see which region an existing project runs in, see [Check your database's location](https://docs.lovable.dev/features/database#check-where-your-database-is-hosted).

### Workspace-level default data hosting region

On **Business** and **Enterprise** workspaces, admins set **Default data hosting region** in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security). It applies only to new projects. Existing projects keep the region they were created in. See [Default hosting region](https://docs.lovable.dev/features/privacy-and-security-settings.md#default-data-hosting-region) for the available options and how to clear it.

**Country-specific regions** (for example, Germany, Japan, or United States (East)) can be enabled for Enterprise workspaces on request, subject to available capacity in that region. Contact your Lovable account team to discuss your requirements.

The default data hosting region covers where project data is stored, not where AI model requests are processed. To keep the workspace's AI model requests in the European Union, Enterprise admins enable [EU inference](https://docs.lovable.dev/features/eu-inference.md).

## What the built-in backend costs

Lovable uses one credit balance for building your app, hosting it, running the built-in backend, and the AI features in your published app. Backend and AI usage is measured as part of **Run credits**.

See [Project usage](https://docs.lovable.dev/features/project-usage.md) for this project's usage breakdown and the monthly grants, and [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) for how credits work across your workspace. To find out what drives a project's run credit usage and how to lower it, ask Lovable in the project chat. See [Ask Lovable what drives your run credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ask-lovable-what-drives-your-run-credit-usage).

## FAQ

> **Can I change my mind after adding the backend to my project?**
>
> Yes. If you no longer want a project to use the built-in backend, go to **More → Database**, select **Manage**, then **Settings**, and use [Remove database](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need).
>
> This permanently deletes the database, its backups, your app's user accounts, and the files in storage, and cannot be undone. Export your database and download any storage files you need before continuing.

> **Can I remix projects that use the built-in backend?**
>
> Yes. A project on the built-in backend can only be remixed into another project on the built-in backend. This creates a copy of your project that you can edit separately in your currently selected workspace. The structure of backend-related data, such as tables and edge functions, is copied over without any information. For any automatically generated keys in the original project, Lovable generates fresh keys in the remixed project. Manually added keys are not copied over.
>
> Lovable chooses the [region](#choose-where-your-project-data-is-stored) for the copy's backend: the workspace's default region when one is set, otherwise the region you used last or the one closest to you. The region can't be changed afterward.
>
> Keep in mind that in a remixed project you can't [revert](https://docs.lovable.dev/features/projects/history.md) to versions from before the remix. Versions created after the remix revert normally.

> **Can I migrate my project from Supabase to the built-in backend?**
>
> At the moment, migration from Supabase to the built-in backend is not supported. If your project is already connected to Supabase, we recommend continuing to use it, as we will keep supporting Supabase moving forward.

> **Can I migrate my project to my own Supabase?**
>
> Lovable does not move a project from the built-in backend to your own Supabase project in one step. You export your database and restore it into the Supabase project, then move your storage files and your code, and set up authentication, secrets, and any external services again. Remixing produces another project on the built-in backend, so it does not switch the backend for you. See [Move your backend to another provider](https://docs.lovable.dev/features/database-backups.md#move-your-backend-to-another-provider) for the steps, and [Connect your own Supabase project](https://docs.lovable.dev/integrations/supabase.md) to connect one.

> **Can I set a default region for all new projects?**
>
> Yes, at two levels. Your own **Where project data is stored** setting applies to the projects you create. It offers Closest to me, Americas, Europe, and Asia Pacific, and starts at Closest to me.
>
> On **Business and Enterprise** workspaces, admins can also set **Default data hosting region** in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security). It applies to every new project in the workspace, and members cannot choose a different region when creating a project. See [Default hosting region](https://docs.lovable.dev/features/privacy-and-security-settings.md#default-data-hosting-region) for more information.

> **How is the region selected when I enable the backend?**
>
> If your workspace has a default data hosting region (available on Business and Enterprise), Lovable uses that region automatically, and members cannot choose another.
>
> Otherwise, Lovable uses your **Where project data is stored** setting, or the region closest to you when you have not set one. You see the region and can change it only when **Enable Cloud** is set to **Ask each time**. See [Choose where your project's data is stored](#choose-where-your-project-data-is-stored).

> **Can I change the region after enabling the backend?**
>
> No. After the backend is enabled for a project, the selected region is locked and cannot be changed. Existing projects cannot be moved across regions.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Connect to Supabase](https://docs.lovable.dev/integrations/supabase.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Send branded emails from your own domain](https://docs.lovable.dev/features/custom-emails.md)
- [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)
