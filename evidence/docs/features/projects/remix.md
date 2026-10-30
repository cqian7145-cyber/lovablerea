# Remix a project
<!-- source: https://docs.lovable.dev/features/projects/remix.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Remix a project

> Remix a Lovable project to create your own independent copy. Learn what carries over to the copy, who can remix your project, and how to move projects between accounts.

Remixing creates your own independent copy of a project. The copy is a new project that you own, and changes you make to it never affect the original.

## Why remix a project

* **Duplicate your own work**: Keep a safe copy before a big change, or spin off a variation of an app you already built.
* **Start from a public project**: Use someone else's remixable project, or a [Lovable template](https://lovable.dev/templates), as a starting point instead of building from scratch.
* **Move work between workspaces or accounts**: Remix a project into a different workspace, or use remixing to [move projects to another account](#move-a-project-to-another-account).

## Control who can remix your project

The **Public remixing** setting in [**Project settings → Sharing**](https://docs.lovable.dev/features/projects/settings.md#sharing) controls whether people outside your project can make their own copy of it from its link. It is disabled by default, and it is not available in Enterprise workspaces.

* **Disabled**: Only people with [access to your project](https://docs.lovable.dev/features/project-visibility.md) can remix it. Anyone else who opens the link sees a message that the project is private.
* **Enabled**: Anyone with the project link can see a preview of the **latest version** of your app and make their own copy of it. Nobody gains access to your project itself.

You can disable public remixing again at any time. Copies that people already made stay theirs.

### Who can see and remix your project

Public remixing does not add people as collaborators and does not give them access to the Lovable editor, your project chat history, your code, or your files. It gives everyone with the project link a preview of the app and the option to make their own copy. What a visitor sees depends on whether they are logged in to Lovable.

| Who opens the link | What they see | What they can do |
| - | - | - |
| Someone who is not logged in to Lovable | A preview of the **latest version** of your app and a **Remix** button. The page shows no project name, code, project chat history, or files. | Clicking **Remix** opens the **Log in to remix** dialog. After they log in or create an account, Lovable brings them back to the same page, where they click **Remix** again to make their copy. |
| Someone logged in to Lovable who does not have access to your project | The same preview, your project's name, the name of the person who created it, and a **Remix** button. No code, project chat history, or files. | Clicking **Remix** opens the [Remix dialog](#the-remix-dialog), where they create their copy. |
| Your collaborators and workspace members | Your project in the editor, as their [project access](https://docs.lovable.dev/features/project-visibility.md) allows. | Remix from the editor as usual. See [How to remix](#how-to-remix). |

Both the preview and every copy are the **latest version** of your project, including changes you have not published. Your project does not need to be published for people to open the link.

A copy contains your code, so anyone who remixes your project can read its source code in their copy. Your project chat history and the files in the [**Files** tab](https://docs.lovable.dev/features/generate-files.md#manage-generated-files) are never copied through the link. Only people with edit access to your project can choose to include them, with the **Include project history** and **Copy project files to new project** switches in the [Remix dialog](#the-remix-dialog). Nobody can edit your project through the link, and the original stays unchanged.

To let people view your app without letting them copy it, share a [preview link](https://docs.lovable.dev/features/share-project.md#share-preview-links) instead.

> [!NOTE]
>
> Projects connected to an external [Supabase](https://docs.lovable.dev/integrations/supabase.md) project can only be remixed by people with edit access to the source project.

## How to remix

You can start a remix from four places:

* In the editor, open the sidebar, hover the project, and select **Remix** from its **⋯** menu.
* In **Project settings → Project actions**, click **Remix**.
* On the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md), open a project card's menu and select **Remix**.
* On [lovable.dev/templates](https://lovable.dev/templates) or the dashboard's **Lovable templates** tab, open a template card's **⋯** menu and select **Remix**. **Preview** in the same menu opens the template app in a preview window with a **Use template** button, which starts the same remix.

You can browse the templates gallery without logging in. If you select **Remix** or **Use template** while logged out, Lovable asks you to log in or create an account, then creates the copy and opens your dashboard.

### The Remix dialog

The dialog shows these fields:

* **Project name**: The name of the copy, pre-filled as "Remix of" followed by the original name.
* **Target workspace**: Which workspace the copy is created in. This field only appears when you have more than one workspace. In Enterprise workspaces, remixing into a different workspace requires transfer permission: workspace admins and owners always have it, and editors have it when the workspace's [**Editor project transfers**](https://docs.lovable.dev/features/privacy-and-security-settings.md#editor-project-transfers) setting is enabled.
* **Target folder**: Optionally place the copy in a [folder](https://docs.lovable.dev/introduction/project-folders.md). Appears when the target workspace has folders.
* **Include project history**: Copies the project chat history, including files attached to chat messages, so the conversation context is preserved. The switch is disabled by default and appears only when you have edit access to the original project.
* **Copy project files to new project**: Copies the files in the original project's **Files** tab, including their [collections](https://docs.lovable.dev/features/generate-files.md#collections). The switch is disabled by default and appears only when you have edit access to the original project.
* **Include custom knowledge**: Copies the project's [instructions](https://docs.lovable.dev/features/knowledge.md). This option only appears when the project has project instructions.
  You can enable either switch, both, or neither. The dialog shows neither switch when you remix a [Lovable template](https://lovable.dev/templates).

Lovable templates ask you to confirm a security acknowledgment before remixing. In that case, the button reads **Acknowledge and remix** instead of **Remix**.

For projects on the built-in backend, Lovable chooses the [region](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored) for the copy's backend: the workspace's default region when one is set, otherwise the region you used last or the one closest to you. The region can't be changed afterward.

## What carries over

A remix copies what you need to keep building and leaves behind everything tied to the original's identity, like its live URL, its collaborators, its secrets, and its [app users](https://docs.lovable.dev/features/authentication).

**Carries over to the copy:**

* Your project's code
* Database structure (tables and schema, not the records in them)
* Chat history, including files attached to chat messages, if **Include project history** is enabled
* The files in the project's **Files** tab, if **Copy project files to new project** is enabled
* Project instructions, if **Include custom knowledge** is enabled

**Does not carry over:**

* Database data
* Version history, unless **Include project history** is enabled
* Secrets
* Custom domains
* Publish state: the copy starts unpublished
* Collaborators
* Service connections (Git sync and connectors)

In practice this means the copy is your app's code with a clean slate around it: it gets its own new API keys, and it isn't connected to the original's secrets, domains, Git repository, or other services. If your app relies on external services, reconnect them and add their credentials again in the copy before it can use them.

> [!NOTE]
>
> Remixed projects don't carry over subscription-level features unless the target workspace's plan also includes them.

## Move a project to another account

Remixing is also the way to move a project between two Lovable accounts, for example when you want your projects under a new email address:

1. If the project is connected to an external [Supabase](https://docs.lovable.dev/integrations/supabase.md) project, disconnect it first. The destination account has no edit access to the source project, so a connected project can't be remixed from there. You can reconnect Supabase after the move.
2. In the source account, enable **Public remixing** in **Project settings → Sharing** and copy the project's link.
3. Log in to the destination account and open the link. The project opens as a preview with a **Remix** button.
4. Click **Remix** and choose the destination workspace. The copy does not include project chat history or files from the **Files** tab because the destination account has no edit access to the original project.
5. Disable **Public remixing** again in the source account if you want the original private.

The copy in the new account follows the normal remix rules: [what carries over](#what-carries-over) is the same, and subscription-level features apply only if the new workspace's plan includes them.

## FAQ

> **How do I duplicate a project?**
>
> To copy a project, you **remix** it: use **Remix project** in **Project settings → Project actions**, or select **Remix** from the project's menu on the dashboard. Lovable creates an independent copy in the workspace you choose.
>
> The copy includes the code and the database structure. Enable **Include project history** to also copy the project chat history, including the version history that goes with it. Database records, secrets, custom domains, and collaborators are never copied.

> **What is the difference between remixing and transferring a project?**
>
> Remixing creates a second, independent copy and leaves the original untouched. Transferring moves the one existing project to a new owner (**Project settings → Transfer ownership**) or to another workspace (**Project settings → Move workspace**), so there is still only one project. Remix when you want a copy. Transfer when you want to hand over or relocate the original.

> **Does the copy stay in sync with the original?**
>
> No. A remix is a snapshot of the project at the moment you remix it. Changes to the original never flow into the copy, and changes to the copy never affect the original.

> **Can I remix a deleted project?**
>
> No. Restore the project first, then remix it. You can restore a deleted project for 60 days from [Workspace settings → Workspace → Recently deleted projects](https://lovable.dev/settings/workspace). See [Restore a deleted project](https://docs.lovable.dev/features/projects/delete-project.md#restore-a-deleted-project).

> **Do people need a Lovable account to open my remixable project link?**
>
> No. Anyone with the link can open it and see a preview of the latest version of your app. Making a copy requires a Lovable account. When someone who is not logged in clicks **Remix**, Lovable asks them to log in or create an account and then brings them back to the same page, where they click **Remix** again.

> **Can people with the link see my code or project chat history?**
>
> Not in your project. The link shows a preview of the app only. Anyone who makes a copy receives your code in that copy and can read it there. Your project chat history and files are never copied through the link. Only people with edit access to your project can choose to include them in their copy. See [Who can see and remix your project](#who-can-see-and-remix-your-project).

> **Why can't I remix a project?**
>
> The most common reasons are:
>
> * The project is connected to an external Supabase project, and you don't have edit access to the source project.
> * The owner disabled **Public remixing** in **Project settings → Sharing**, so it can't be remixed from its link.
> * The project is in an Enterprise workspace and you don't have permission to remix it into another workspace.
> * The project has [payments](https://docs.lovable.dev/features/payments.md) enabled.
> * The project has a connected [Shopify](https://docs.lovable.dev/integrations/shopify.md) store. Disconnect the store to remix the project.
> * The project sends [emails](https://docs.lovable.dev/features/custom-emails.md) from its own domain.


## Related topics

- [Build a Shopify store with AI](https://docs.lovable.dev/integrations/shopify.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Control project access](https://docs.lovable.dev/features/project-visibility.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
