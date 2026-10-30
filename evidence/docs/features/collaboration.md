# Collaboration
<!-- source: https://docs.lovable.dev/features/collaboration.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Collaboration

> Invite teammates to projects or workspaces, assign roles and permissions, and see changes in real time as you build together.

Lovable lets you build websites together. Invite your designer, developer, agency, or anyone else. Everyone sees changes as they happen.

There are two ways of collaborating. You can invite collaborators to a specific project or to your entire workspace.

## Collaboration in a specific project

You can invite users to work together on a specific project by pressing **Share** in the project editor. Add their email, and they'll receive an invite to their email. See [Share a project](https://docs.lovable.dev/features/share-project.md) for more information.

> [!NOTE]
>
> Collaborators will use credits from the project owner's workspace.

When several people build in the same project, each of you can work in your own [draft](https://docs.lovable.dev/features/drafts.md): a separate copy of the project with its own project chat and preview. Everyone sees the same list of drafts, and a draft's edits reach the project only when someone accepts it.

### Check your role on a project

To see your role on a project, open the project and click **Share**. The **Share** menu lists the project owner and the people invited to the project, with the current role shown next to each name. If your name is not in the list, your access comes from the project's **Workspace access** setting.

To see your role in a workspace, go to **Workspace settings → People**. Your role appears next to your name in the members list.

### Project permissions

Please note that free plans do not have admin roles. Some of the features presented might be available on specific plans only.

Project roles are managed from the **Share** menu in the editor. See [project roles](https://docs.lovable.dev/features/projects/overview#project-roles) for how they interact with workspace roles.

| | **Viewer** | **Editor** | **Admin** | **Owner** |
| - | - | - | - | - |
| **Project access** | | | | |
| Magic Link | **Yes** | **Yes** | **Yes** | **Yes** |
| Add Viewer | **Yes** | **Yes** | **Yes** | **Yes** |
| Remove Viewer | **Yes** | **Yes** | **Yes** | **Yes** |
| Add Editor | No | **Yes** | **Yes** | **Yes** |
| Remove Editor | No | **Yes** | **Yes** | **Yes** |
| Add Admin | No | No | **Yes** | **Yes** |
| Remove Admin | No | No | **Yes** | **Yes** |
| **Project management** | | | | |
| Remix project | **Yes** | **Yes** | **Yes** | **Yes** |
| Add Custom domain | No | **Yes** | **Yes** | **Yes** |
| Edit project | No | **Yes** | **Yes** | **Yes** |
| Remove Lovable badge | No | **Yes** | **Yes** | **Yes** |
| Change project access | No | **Yes** | **Yes** | **Yes** |
| Manage GitHub | No | **Yes** | **Yes** | **Yes** |
| Publish<sup>\*</sup> | No<sup>\*</sup> | **Yes**<sup>\*</sup> | **Yes**<sup>\*</sup> | **Yes**<sup>\*</sup> |
| Manage project settings | No | **Yes** | **Yes** | **Yes** |
| Disconnect Supabase | No | No | **Yes** | **Yes** |
| Transfer project | No | No | No | **Yes** |
| Delete project | No | No | No | **Yes** |
| Restore deleted project | No | No | No | **Yes** |

<sup>\*</sup>By default, editors and above can publish projects on all plans.

* On all plans, this includes publishing to the web and publishing privately to people you invite. On Business and Enterprise plans, it also includes publishing to the whole workspace.
* On **Enterprise** plans, workspace admins and owners can set [workspace policies](https://docs.lovable.dev/features/workspace-policies.md) that require approval before publishing or block it, for example for public apps or for external collaborators.

> [!NOTE]
>
> If a project uses a connection with restricted access, only people with access to that connection can be viewers or editors in the project. Learn more about [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).

## Collaboration in a workspace

### What is a workspace?

A workspace is your shared space for building and collaborating on projects. You can invite as many teammates as you need into your workspace, and they can see, edit, and publish the workspace's projects (unless a project's access is [restricted](https://docs.lovable.dev/features/project-visibility.md)). Each member can also create and work on as many of their own projects as they want.

> [!WARNING]
>
> For granular permission control and role assignment in your workspace, a paid subscription is needed.

When you subscribe to a plan, it gets tied to your desired workspace, and all projects in the workspace share the workspace's credits, no matter who sends the messages. See [Workspace basics](https://docs.lovable.dev/features/workspace#workspace-basics) for the key rules.

You can customize your workspace in the workspace settings by:

* Renaming it
* Changing the avatar
* Writing a description

See [Lovable workspace](https://docs.lovable.dev/features/workspace) and [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md) for more information.

### How do I add and manage collaborators in a workspace?

You manage and add collaborators from the People tab in the workspace settings. You can access it by going to **Settings** > **People**.

Here you can:

* Add new collaborators by inputting their email. They'll receive an invite to their email that they then can accept.
* Manage existing collaborators by changing their roles or removing them.
* Manage monthly credits usage for each collaborator.

See [People](https://docs.lovable.dev/features/people.md) for more information.

### Workspace permissions

Please note that free plans do not have admin roles.

| | **Viewer** | **Editor** | **Admin** | **Owner** |
| :- | :- | :- | :- | :- |
| **Workspace access** | | | | |
| Add Viewer | **Yes** | **Yes** | **Yes** | **Yes** |
| Remove Viewer | **Yes** | **Yes** | **Yes** | **Yes** |
| Add Editor | No | **Yes** | **Yes** | **Yes** |
| Remove Editor | No | **Yes** | **Yes** | **Yes** |
| Add Admin | No | No | **Yes** | **Yes** |
| Remove Admin | No | No | **Yes** | **Yes** |
| Add Owner | No | No | No | **Yes** |
| Remove Owner | No | No | No | **Yes** |
| **Workspace management** | | | | |
| View members | **Yes** | **Yes** | **Yes** | **Yes** |
| Create new projects in a workspace | No | **Yes** | **Yes** | **Yes** |
| Manage Supabase | No | **Yes** | **Yes** | **Yes** |
| View usage | No | No | **Yes** | **Yes** |
| Manage plans & billing | No | No | **Yes** | **Yes** |
| Manage SSO (Business plan) | No | No | **Yes** | **Yes** |
| Manage Integrations | No | No | **Yes** | **Yes** |


## Related topics

- [Project comments](https://docs.lovable.dev/features/project-comments.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [View and edit your project's code](https://docs.lovable.dev/features/code-mode.md)
- [Sync your Lovable project with Bitbucket](https://docs.lovable.dev/integrations/bitbucket.md)
