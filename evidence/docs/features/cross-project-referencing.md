# Cross-project referencing
<!-- source: https://docs.lovable.dev/features/cross-project-referencing.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Cross-project referencing

> Reuse implementations across projects in your workspace, including code, assets, files, and chat history. Maintain consistency and avoid rebuilding the same features.

Cross-project referencing lets Lovable access and reuse implementations from other projects in your workspace.

When referencing other projects, Lovable can explore file structures, read source code, search for relevant patterns, access related chat history, and reuse or copy assets such as images and fonts. This allows the agent to understand how something was built and recreate or adapt it in your current project.

You can explicitly reference a project using `@` mentions, or simply ask Lovable to use an existing project when relevant. **The referenced projects remain unchanged**.

## How to reference other projects

Type `@` in the project chat and select a project, for example:

```text wrap theme={null}
Use the logo and color palette from @BrandSite.
```

Ask Lovable to use an existing project, for example:

```text wrap theme={null}
Build this using the same authentication setup as our existing main app.
```

Reference multiple projects in the same prompt. For example:

```text wrap theme={null}
Build this onboarding flow using the auth setup from @MainApp
and the form validation pattern from @ContactApp.
```

Cross-project referencing works when prompting Lovable in [Build mode](https://docs.lovable.dev/features/agent-mode.md), [Plan mode](https://docs.lovable.dev/features/plan-mode.md), and [Chat mode](https://docs.lovable.dev/features/chat-mode.md), or when responding in the **questions tool by selecting “Other.”** In Chat mode, Lovable reads the referenced project to answer your question and does not change either project. In [Chats](https://docs.lovable.dev/features/chats.md#add-context), add projects the same way, up to 10 in one message.

You can also add references directly from the prompt box by clicking **+** and selecting **Add context → Projects**. When project names are similar or vague, the project picker helps you choose the right one. For each match it shows the project name, a preview image, the owner, the project's status, and when it was created and last edited. Click the preview image to open that project in a new tab.

> [!NOTE]
>
> Large files or results may be truncated.

## What you can reference

You can reuse:

* Components and layout systems
* Animations and styling systems
* Auth flows and API integrations
* Feature implementations
* Assets such as images and fonts
* Relevant chat history for implementation context

All access is read-only and limited to projects within your workspace.

## Permissions and access

Cross-project referencing is restricted by workspace boundaries and sharing settings.

* Only projects within the same workspace can be referenced. Cross-workspace referencing is not supported.
* Any workspace member, including collaborators, can reference any project they have permission to access.
* Cross-project access is read-only. Referenced projects cannot be modified.

## Disabling cross-project sharing

Cross-project sharing can be disabled at different levels:

* **Workspace level:** \
  Workspace admins and owners can disable cross-project sharing for the entire workspace in\
  **Workspace settings → Privacy & security → Cross-project sharing.**
* **Project level:** \
  Project editors and above can disable cross-project sharing for a specific project in\
  **Project settings → Cross-project sharing.** When disabled at the project level, that project cannot reference other projects, and other projects cannot reference it.

If any of these controls block access, the reference will fail.

## FAQ

> **Can I reference projects from another workspace?**
>
> No. Cross-project referencing only works within the same workspace. Cross-workspace referencing is not supported.

> **Will referencing a project modify it?**
>
> No. All cross-project access is read-only. The referenced project cannot be modified.

> **Can Lovable access the data in a referenced project's backend?**
>
> No. Referencing gives Lovable a read-only copy of the other project's code, files, and assets, described under [What you can reference](#what-you-can-reference). That copy includes the files that define the other project's database structure, but not the records stored in the database. To reuse records, export them from the other project as a CSV and upload the file to this project.

> **Can team members reference my restricted projects?**
>
> Only if you have given them access. A project with **Restricted** visibility can be referenced by its owner and by people who have been given access to it. Other workspace members cannot reference it, even within the same workspace.

> **Why can’t Lovable access another project?**
>
> If Lovable cannot access a project, check the following:
>
> * Verify that cross-project sharing has not been disabled at the workspace or project level.
> * Make sure both projects are in the same workspace. Cross-workspace access is not supported.
> * Verify project access. Projects set to **Restricted** can be referenced only by their owner and by people who have been given access to them.
> * Confirm you have permission to access the project. You can only reference projects you have access to.
>
> If any of these controls block access, the reference will fail.


## Related topics

- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Implement changes in Build mode](https://docs.lovable.dev/features/agent-mode.md)
- [Plan a change in Plan mode](https://docs.lovable.dev/features/plan-mode.md)
- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
