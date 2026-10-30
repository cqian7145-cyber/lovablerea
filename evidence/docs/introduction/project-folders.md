# Organize projects in folders
<!-- source: https://docs.lovable.dev/introduction/project-folders.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Organize projects in folders

> Group related projects into folders to keep your workspace organized.

Folders let you group related projects together for easier navigation. They appear on the **Projects** page and in the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette).

> [!NOTE]
>
> In the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md), **Projects** lists your projects without their folders, and there is no way to open or create a folder. To organize projects in folders, use Lovable in a browser.

Workspace owners, admins, and editors can create, edit, delete, and manage folders. Viewers can only view folders. Collaborators have no access to folders.

## Create a folder

1. On the **Projects** page, select **New folder**.
2. Enter a folder name, up to 50 characters. Names cannot contain `/ \ : * ? " < > |`.
3. Select the folder icon next to the name to choose a color.
4. Set the folder's visibility to **Workspace** or **Personal**. Personal folders are available on Business and Enterprise plans, where **Personal** is the default.
5. Select **Create folder**. For a personal folder, select **Continue** instead, add the people or groups you want to share it with, and then select **Create folder**.

## Create a subfolder

Folders can contain subfolders, up to 3 levels deep. You can create a subfolder inside a folder, or move an existing folder into another one.

To create a subfolder, open the folder, select **More folder options** next to the folder's name, and select **New subfolder**.

> [!NOTE]
>
> **New subfolder** does not appear when the folder is already 3 levels deep, or when someone else shared the folder with you.

## Folder visibility

You set a folder's visibility to **Workspace** or **Personal**. It determines the visibility of the projects inside the folder and of its subfolders.

### Workspace folders

The folder is visible to all workspace members. Owners, admins, and editors can add projects to it.

### Personal folders

Personal folders are available on **Business and Enterprise plans**. The folder is private: it is visible only to you, the people you invite, and the workspace owner, who can also manage and delete it. Workspace admins can't see other members' personal folders. By default, only you and the workspace owner can add projects to the folder, and a personal folder only accepts projects that belong to the person adding them.

You can invite specific workspace members or [groups](https://docs.lovable.dev/features/groups.md) to access the folder. Open the folder, select **More folder options** next to the folder's name, and select **Manage access**. The same option is in the folder card's **More options** menu on the **Projects** page.

You can set an access level for each person or group. Folder access gives the same level of access to the projects inside the folder. If you later [change the folder's visibility to Workspace](#how-folder-visibility-affects-project-access), these access levels stop applying.

* **Owner**: Full ownership control. You cannot give this level to a group or to a workspace viewer.
* **Admin**: Full access to folder and projects
* **Can edit**: Edit projects in this folder
* **Can view**: View projects in this folder

The folder's owners and admins, and the workspace owner, can invite people, change their access levels, or remove them.

To remove your own access to a folder, open **Manage access** (the menu item reads **View access** when you cannot manage the folder's access) and select **Leave folder** on your own row. If you are the folder's only owner, **Leave folder** is disabled, so a folder is never left without an owner.

> [!TIP]
>
> **If someone shares a personal folder with you**
>
> When someone adds you to a personal folder, you get a notification with a link to open it. The folder also appears with your other folders on the **Projects** page. Your access to the projects inside depends on the level of access you were granted.

### How folder visibility affects subfolders

Subfolders inherit their top-level folder's visibility, and you cannot set a different visibility for a subfolder. If you change a top-level folder's visibility, the subfolders you can edit update to match. A subfolder you cannot edit, or one that someone else created when you make the folder personal, moves to the top level and keeps its visibility.

### How folder visibility affects project access

When you add a project to a folder, or change a folder's visibility, Lovable updates the project's [visibility](https://docs.lovable.dev/features/project-visibility.md) to match the folder, as long as you can change that project's visibility:

* **Personal folder**: Projects become **Restricted**, so only the owner and invited collaborators can access them
* **Workspace folder**: Projects become accessible to all workspace members

When a personal folder becomes a workspace folder, the access levels you granted stop applying to the projects inside it. The people and groups you invited keep their workspace role and any access you gave them on a project directly.

Lovable keeps the invitations, so the access levels apply again if you set the folder back to **Personal**.

Before the change is applied, Lovable warns you that the projects will become restricted or visible to all workspace members, and shows how many members gain access. The warning covers the projects' visibility only, not the access levels you granted on the folder.

When you move a single project into a folder, the dialog also lists the people who were given access to that project directly, through **Invite people or groups** in the project's [Share menu](https://docs.lovable.dev/features/share-project.md). Each row shows a **Keeping** or **Removing** badge that you can select to toggle, and when you confirm, anyone marked **Removing** loses that direct access.

* **Workspace folder**: People who already have access through their workspace membership are listed under **Already have workspace access** and marked **Removing**, since they no longer need direct access. People outside the workspace are listed under **External collaborators** and marked **Keeping**.
* **Personal folder**: Everyone with direct access is listed under **Project collaborators** and marked **Keeping**, so they keep access after the project becomes restricted.

## Manage folders

On the **Projects** page, open a folder card's **More options** menu, or right-click the card on desktop. Inside a folder, the same actions are under **More folder options** next to the folder's name, together with **New subfolder**.

* **Add projects**: Add existing projects to the folder. A project can only be in one folder at a time.
* **Manage access**: On personal folders, manage which workspace members or groups can access the folder and the projects inside it. See [Personal folders](#personal-folders) for details.
* **Move**: Move the folder into another folder or to the root level.
* **Edit**: Change the folder name, color, or visibility (Visibility can only be changed on top-level folders. Subfolders always match their parent.).
* **Delete**: Permanently deletes the folder and all of its subfolders. The projects inside are not deleted. They stay in your workspace with no folder and keep the visibility they had in the folder.

## Move projects to folders

You can move projects to folders in several ways.

* **From the project context menu**\
  Open a project card's **⋯** menu, or right-click the card on desktop, and select **Move → To folder**. Choose the target folder from the list, or create a new folder to move the project to.
* **Drag and drop**\
  Drag a project card onto a folder on the **Projects** page. On a tablet, press and hold the card for a moment before you drag it.
* **Bulk move**\
  Drag across the project list with a mouse, or press and hold a project card on a tablet, to select several projects. Use the checkboxes on the cards to adjust the selection. Select **Move to folder** in the action bar at the bottom of the screen and choose the target folder.
* **From the folder context menu**\
  Select **Add projects** on a folder to browse and select projects to add.

If the move would change visibility, a confirmation dialog appears informing you how project access will change and who will gain or lose access.

Without a search or filter, the **Projects** page lists only the projects that are not in a folder, so a project you move appears inside its folder. To find it from the **Projects** page, open the folder, or search or filter the list. See [Project list](https://docs.lovable.dev/introduction/project-search-and-find.md#project-list).

You can also ask Lovable from a project's chat. It can list your folders and move the project for you, including between personal and workspace folders:

```text wrap theme={null}
Move this project to my Marketing folder.
```

## Remove projects from a folder

Removing a project from a folder does not delete the project. The project appears on the **Projects** page again.

You can remove projects from a folder in several ways:

* **From the project context menu**\
  Open a project card's **⋯** menu and select **Move → To folder** to move a project elsewhere.
* **Drag and drop**\
  When you drag a project that is inside a folder, a **Remove from folder** drop zone appears. Drop the project there to remove it from the folder. On a tablet, press and hold the card for a moment before you drag it.
* **Bulk remove**\
  Drag across the project list with a mouse, or press and hold a project card on a tablet, to select several projects. Use the checkboxes on the cards to adjust the selection. Select **Remove from folder** in the action bar at the bottom of the screen. Removed projects stay in your workspace with no folder.

Removing a project from a folder does not change its visibility. When you add a project to a folder, Lovable updates its visibility to match the folder. When you remove it, the project keeps that visibility. To change who can access the project, update its visibility yourself.


## Related topics

- [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [Find and search projects](https://docs.lovable.dev/introduction/project-search-and-find.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
