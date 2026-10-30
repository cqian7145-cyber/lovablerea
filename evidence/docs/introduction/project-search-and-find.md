# Find and search projects
<!-- source: https://docs.lovable.dev/introduction/project-search-and-find.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Find and search projects

> Use the command palette, filters, and sorting to quickly find any project in your workspace.

Lovable gives you several ways to find projects: the command palette for quick search, and filtering and sorting options on project list pages.

## Command palette

Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette, or click **Search** in the sidebar. The command palette is the fastest way to find and open projects or [folders](https://docs.lovable.dev/introduction/project-folders.md). It also works inside the [project editor](https://docs.lovable.dev/features/projects/editor.md#command-palette).

### Searching

Before you type anything, the command palette shows:

* **Recent projects**: Projects you've recently opened
* **Recent folders**: Folders you've recently accessed

Start typing to search across all your projects and folders. Results are grouped into **Projects** and **Folders** sections as you type.

When you hover over a project or folder in the search results, a preview panel appears showing project details and folder contents.

Click any item to open it immediately.

### Open a project by ID or URL

You can also paste a project reference into the command palette to open that project:

* The project's editor URL, like `https://lovable.dev/projects/<project-id>`. Links to a specific page inside the editor, such as the project's settings, work too.
* The project ID on its own.

If you have access to the project, it appears at the top of the **Projects** group with its name. Pasting doesn't open the project by itself. Press `Enter` or click the result to open it, like any other row.

Published app URLs (for example `yourapp.lovable.app`) are not project links and don't return a result. A pasted ID for a deleted project or a project you can't access returns nothing either. A pasted editor URL that Lovable can't match to one of your projects shows an **Open project page** row under a **Link** heading instead: selecting it takes you to the link's page in Lovable, where you see an error if the project doesn't exist or you don't have access.

### Quick navigation

The command palette also lets you navigate to:

* Dashboard page
* Workspace and project settings: search by name to go to a section, such as `billing`, `people`, or `identity`
* Connectors and integrations
* Theme switching (Light / Dark / System)
* Switch between workspaces

> [!NOTE]
>
> The command palette is not available on mobile. Use the sidebar and navigation menus instead.

## Search from the dashboard project tabs

The dashboard's project tabs bar has a **Search** entry. Select it and the tabs turn into a search box that filters across all your project lists at once. You do not have to switch tabs to find a project.

Type to filter by a project's name or its owner, and select `X` or press `Escape` to close the search box.

## Project list

Without a search or filter, the **Projects** page shows your folders and the projects that are not in a folder. Open a folder to see the projects inside it. A search or any filter includes the projects in every folder. Sorting does not change which projects appear.

More projects load automatically as you scroll down.

On the **Projects** page you can:

* **Search**: Type in the search field to filter projects by name. Results update as you type.
* **Filter**: Select **Filter** to narrow the list by owner, folder, visibility, publish status, and more. See [Filtering projects](#filtering-projects).
* **View**: Select **View** to choose between grid and list, and to set how projects are sorted. See [Sorting and display](#sorting-and-display).

The **New project** button takes you to the [dashboard's prompt input](https://docs.lovable.dev/introduction/dashboard-overview.md#starting-a-new-project-or-chat) to start a project, and **New folder** opens the dialog to [create a folder](https://docs.lovable.dev/introduction/project-folders.md#create-a-folder).

A folder's page has the same search field and **View** menu, and it filters by owner, visibility, and publish status.

### Filtering projects

Select **Filter** to open the **Filter projects** menu. The menu has its own search box, so you can type a filter's name instead of looking through the list.

Every filter you apply appears as a chip next to the controls, showing the filter's name and what you set it to. Select a chip's remove icon to drop that filter, the **+** button to add another, or **Clear filters** to remove all of them at once.

You can filter by:

* **Owner**: Select one or more workspace members to see only their projects, or keep **All owners** (default). Search the owner list to find a member in a large workspace. **Shared with me** shows the projects other people shared with you, and replaces any members you had selected.
* **Folder**: Show only the projects in one [folder](https://docs.lovable.dev/introduction/project-folders.md), or keep **All folders** (default). Select **No folder** to see the projects that are not in any folder.
* **Visibility**: Filter projects based on [project access and visibility](https://docs.lovable.dev/features/project-visibility.md):
  * **Any visibility** (default): All projects regardless of visibility
  * **Workspace**: Projects accessible to workspace members
  * **Restricted**: Projects accessible only to the owner and invited collaborators. This option appears when your workspace can create restricted projects.
* **Publish status**: Filter projects based on publish status:
  * **Any status** (default): All projects regardless of publish status
  * **All published**: All published projects (internal and external)
  * **Internally published**: Projects published to workspace only
  * **Externally published**: Projects published publicly to the web
  * **Not published**: Draft projects that haven't been published
* **Pinned**: Show only the projects you have pinned.
* **Recent projects**: Show only the projects you opened recently.

The **Folder**, **Pinned**, and **Recent projects** filters appear only on the **Projects** page.

### Sorting and display

Select **View** to set how the project list looks and in what order it appears. **Grid** and **List** appear at the top of the menu, followed by **Sort by** and **Order**.

* **Grid** and **List**: Grid is the default and shows project cards with thumbnails. List shows a compact list, and on the **Projects** page it includes a **Folder** column. Your choice is saved in your browser and persists across sessions. This choice is not available on mobile.
* **Sort by**: Sort the project list based on different criteria:
  * **Last edited**: Sort by last edited date, newest first or oldest first
  * **Last viewed**: Sort by last viewed date, newest first or oldest first
  * **Created**: Sort by created date, newest first or oldest first
  * **Name**: Sort alphabetically by project name, **A–Z** or **Z–A**
  * **Relevance**: Sort by most relevant or least relevant search results, available only while a search is active
  * **Visits**: Under **Popularity**, sort by visits in the last 24 hours, 7 days, or 30 days, most popular or least popular
* **Order**: Set the direction of the sort. The choices follow the criterion you sorted on, and choosing a new criterion resets the order to that criterion's default.

Lovable keeps your filter, sort, and search choices in the page URL. You can navigate into a project and back, refresh the page, or share focused dashboard views with teammates without losing your place.


## Related topics

- [Find your way around the Lovable editor](https://docs.lovable.dev/features/projects/editor.md)
- [Dashboard overview](https://docs.lovable.dev/introduction/dashboard-overview.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [View and edit your project's code](https://docs.lovable.dev/features/code-mode.md)
