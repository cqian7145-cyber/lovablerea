# Control project access
<!-- source: https://docs.lovable.dev/features/project-visibility.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Control project access

> Control who can view, remix, or collaborate on your projects. Choose whether projects are accessible to all workspace members, or restricted to invited users only.

Project access (previously project visibility) controls who can view, edit, and remix **your project in the editor**.

This includes access to your source code, project chat history, work in progress, and changes that have not yet been published. Depending on your plan, you can keep a project restricted to invited users only or collaborate privately with your workspace.

> [!NOTE]
>
> **Project access vs published website access (important difference)**
>
> Lovable uses two independent access settings:
>
> * **Project access (editor access)** controls who can view and edit your project in the editor, including your source code, project chat history, work-in-progress, and any changes that have not been published yet.
> * **Website access (published URL access)** controls who can visit the published app at its live URL.
>
> These settings are independent. Publishing does not change who can access your project in the editor, and changing project access does not affect who can visit the published app.

## Workspace visibility by default

As of December 2025, all workspaces have their **default project access** set to **workspace**. This means your projects are private to your workspace and can only be accessed by workspace members by default.

### Restrict project access

On **Business and Enterprise plans**, you can choose to restrict projects to invited users only, both on **workspace level** and **project level**.

* Workspace **admins and owners** can set the **default project access** for all new projects in **Workspace settings → Privacy & security → Default project access**.
* You can override the workspace default for individual projects at any time:
  * From the prompt input box on the dashboard **when creating new projects**
  * From the **Share** button in the top bar of any **existing project**. See [Share a project](https://docs.lovable.dev/features/share-project.md) for more information.

Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.

### Project access options

| Default project access | Project-level access | Description |
| - | - | - |
| **Workspace** (default for all plans) | Workspace can edit | All **workspace members and explicitly invited collaborators can view, remix, or edit the project based on their role.** Ideal for team collaboration while keeping work private and secure. *Note: On project level, you can update the workspace access to **Can view** from the [Share menu](https://docs.lovable.dev/features/share-project.md).* |
| **Restricted** (available for Business and Enterprise) | Workspace owners only | **Only the project owner, explicitly invited collaborators, and workspace owners can view, remix, or edit** the project based on their role. Use this for early exploration, prototyping, or personal experiments. You can give access to the workspace when you’re ready to share and collaborate with your team.  |

## Share a project with internal or external collaborators

In the **Share** menu, you give others access to a project: workspace members, external collaborators, or anyone with a link. To open the menu, click **Share** in the top bar of any project.

See [Share a project](https://docs.lovable.dev/features/share-project.md) for more information.

## Enable public remixing

When public remixing is enabled, anyone with the project link can see a preview of the latest version of the app and [remix](https://docs.lovable.dev/features/projects/remix.md) it to make their own copy. You can disable it at any time.

* Public remixing **does not change project access**. Nobody gains access to your project in the editor, your project chat history, or your files.
* People **don't need a Lovable account to open the link**. Visitors who are not logged in see a preview of the app and a **Remix** button that asks them to log in before they can make a copy.
* People always **copy the latest version** when they remix. They can't edit your project, and the original stays unchanged.
* People can **view your project's source code** in their copy. Make sure it does not include passwords, API keys, or personal data.

See [Remix a project](https://docs.lovable.dev/features/projects/remix.md) for how remixing works and [Who can see and remix your project](https://docs.lovable.dev/features/projects/remix.md#who-can-see-and-remix-your-project) for what each kind of visitor sees.

To let others copy and remix your project, go to **Project settings → Sharing** and enable **Public remixing** (not available on Enterprise plans).

> [!NOTE]
>
> **Important note:**
>
> * **Before November 6, 2025:** Projects were **public by default** for free plans, and only paid workspaces could change visibility.
> * **Starting November 6, 2025:** New projects default to **workspace visibility** for all plans, and all workspaces can update visibility of existing projects.
> * **As of December, 2025:** All workspaces have their **default project visibility** set to **workspace**. **Default project visibility** has been updated to **workspace** for all Lovable workspaces that previously had default project visibility set to public.
> * **Starting April 22, 2026**: You can no longer create public projects. Public project visibility has been completely removed. All public projects have been updated to **workspace** visibility.

## FAQ

> **Does publishing my project give everyone access to my project and code?**
>
> No. Publishing only makes the app available at the published URL. It does not grant anyone access to your project in the editor or your project code, and it does not make your project automatically remixable.
>
> Access to the editor, source code, project chat history, and unpublished changes is always controlled by **project access**.
>
> Access to the published app is controlled separately through website access settings. For more information, see [Publish your app](https://docs.lovable.dev/features/publish.md).

> **Does project access affect who can visit my published app?**
>
> No. Project access controls who can access your project in the editor. Access to the live app at its published URL is managed separately through website access settings. See [Publish your app](https://docs.lovable.dev/features/publish.md) for more information.

> **How do project access and website access work together?**
>
> Project access and website access are **independent settings**. You can combine them in different ways depending on your needs.
>
> * **Project access** controls who can access the **project in the editor**, including source code, project chat history, work in progress, and changes that have not yet been published.
> * **Website access** controls who can visit the **published app** at its live URL.
>
> Below are common configurations:
>
> 1. **Internal team app**
>    * Project access: `Workspace`
>    * Website access: `Workspace`
>
> **Result:** Only workspace members can view and edit the project in the editor and visit the published app.
>
> 2. **Private work-in-progress, public app**
>    * Project access: `Restricted`
>    * Website access: `Public`
>
> **Result:** Only you can view and edit the project in the editor, but anyone with the published URL link can visit the published app.
>
> > [!NOTE]
> >
> > Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.
>
> 3. **Team-built, publicly shared app**
>    * Project access: `Workspace`
>    * Website access: `Public`
>
> **Result:** Only workspace members can view and edit the project in the editor, but anyone with the published URL link can visit the published app.
>
> 5. **Private prototype shared internally**
>    * Project access: `Restricted`
>    * Website access: `Workspace`
>
> **Result:** Only you can view and edit the project in the editor, and only workspace members can visit the published app.
>
> > [!NOTE]
> >
> > Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.
>
> > [!NOTE]
> >
> > **Key reminder:** Publishing does not change who can access your project in the editor, and project access does not affect who can visit the published app.

> **Can I change the project access after creating it?**
>
> Yes, you can change the project access at any time from the **Share** button in the top bar of any project. See [Share a project](https://docs.lovable.dev/features/share-project.md) for more information.

> **Can I restrict access to specific people within the workspace?**
>
> Yes. Create the project with **Restricted** access. The project is visible only to you, the people you invite, and workspace owners.
>
> When you’re ready to share, click **Share** and invite specific people or [groups](https://docs.lovable.dev/features/groups.md), assigning roles as needed.
>
> See [Share a project](https://docs.lovable.dev/features/share-project.md) for more information.
>
> Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.


## Related topics

- [Share a project with internal or external collaborators](https://docs.lovable.dev/features/share-project.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
- [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md)
- [Control who can access your app's data](https://docs.lovable.dev/features/database-access.md)
