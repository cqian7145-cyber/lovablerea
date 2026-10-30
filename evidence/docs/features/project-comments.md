# Project comments
<!-- source: https://docs.lovable.dev/features/project-comments.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project comments

> Leave comments directly on elements in your project.

Project comments let you and your collaborators leave feedback directly on elements in the project preview. Click on any element to start a thread, discuss changes, and optionally send feedback to Lovable.

## Creating a comment

1. Click the **Add a comment** button in the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md), or press `C` to enter comment mode.

> [!NOTE]
>
> When the preview toolbar is hidden, the comments button moves to the project toolbar at the top of the preview.

2. Click on any element in the preview to place a comment pin.
3. Type your comment in the text field that appears.
4. Press **Send** to create the comment thread.

A pin appears on the element, visible to everyone with access to the project. Each pin is anchored to the specific element you clicked on. Comment pins only appear while you are in comment mode.

## Replying to comments

Click on any comment pin to open its thread. Type your reply at the bottom of the thread and press **Send**. All project collaborators can see and reply to any thread.

## Sending feedback to Lovable

There are two ways to send a comment thread to Lovable:

* **Mention Lovable**: Type `@Lovable` in a comment to send the thread as context to Lovable.
* **Send to chat**: Open a thread and press the **Send to chat** button in the thread header.

Both options send the full thread, including the page, the element, and all comments, to the project chat as structured feedback. Lovable can then act on it directly. A system message is added to the thread to confirm it was sent.

## Resolving comments

When feedback has been addressed, you can mark a thread as resolved:

1. Open the comment thread.
2. Click the **Resolve** button in the thread header.

Resolved threads are hidden from the preview by default. You can toggle to show resolved comments from the comments panel. You can unresolve a thread at any time to reopen it.

## Editing and deleting comments

* **Edit**: Click the menu on your own comment and select **Edit**. Update the text and save.
* **Delete**: Click the menu on your own comment and select **Delete**. Deleted comments show as `[Deleted]` in the thread to preserve context.

## Reactions

You can add emoji reactions to any comment. Click the reaction button on a comment and pick an emoji. Reactions are visible to everyone in the thread.

## Comments sidebar

The comments sidebar gives you an overview of all comment threads in the project. It stays hidden when it is not in use. Open it to:

* **Browse** all open and resolved threads in one place.
* **Search** threads by comment text or author.
* **Sort** threads by creation date or read status.
* **Track unread threads**. Any thread with new replies since your last visit is highlighted.

Click any thread in the panel to navigate to its pin in the preview.

## Notifications about comment activity

Comments create notifications in your Lovable inbox:

* Starting a new comment thread notifies the project owner.
* Replying to a thread notifies everyone who has commented in that thread.
* Mentioning someone with `@` notifies them directly.

Only people with access to the project receive notifications. [Guest comments on a shared preview link](#guest-comments-from-preview-links) notify the project owner.

## Anchor behavior

Each comment pin is anchored to the element you clicked on. As long as the element remains in the same position in the page structure, the pin stays attached.

If the layout changes significantly, for example if items are reordered, new elements are added before the commented one, or the element is removed entirely, the pin may lose its reference or attach to the wrong element.

When a pin can no longer find its original element, it will display an indicator so you know the reference was lost. The comment thread itself is always preserved.

## Guest comments from preview links

Comments are not limited to project collaborators. When you create a shared preview link with **Allow comments** enabled, anyone who opens it can leave comments on the preview without project access. If the link requires a password, visitors enter it before they can see the preview or its comments.

**Allow comments** is enabled by default and is set separately for each link. Set it when you create the link. To change it later, select the link in **Share → Share a preview link**. See [Collect feedback with guest comments](https://docs.lovable.dev/features/share-project.md#collect-feedback-with-guest-comments) for details.

## FAQ

> **Who can leave comments on a project?**
>
> Anyone with access to the project can leave comments, regardless of their role. 
>
> People without project access can also comment through a shared preview link when **Allow comments** is enabled for that link. See [Guest comments from preview links](#guest-comments-from-preview-links).
>
> Project comments are available on all plans.

> **Can I send a comment to Lovable?**
>
> Yes. You can either mention `@Lovable` in a comment or press the **Send to chat** button on a comment thread. Both options send the thread as context to Lovable so it can act on the feedback.

> **What happens when the element I commented on is removed?**
>
> The comment pin will remain but display an indicator that the original element could not be found. You can still view and interact with the thread.

> **Do comments use credits?**
>
> Leaving comments does not use credits. However, when you send a comment thread to Lovable via `@Lovable` or **Send to chat**, the resulting response uses credits as with any other project chat message.

> **Can I see comments from other pages in the project?**
>
> Yes. The comments sidebar shows all threads across all pages. Pins are only visible on the page where they were placed and only appear while you are in comment mode.

> **Why can't guests comment on my shared preview?**
>
> Guests can only comment through a shared preview link, not on the published app URL. If a guest opens the link and sees the app without a **Comment** button in the toolbar, **Allow comments** is disabled for that link. Open **Share → Share a preview link**, select the link you shared, and enable **Allow comments**. The change applies to the link you already sent.
>
> If the guest sees **This preview link has expired** instead, create a new link and share it again. On Free and Pro plans, shared preview links expire after 7 days.


## Related topics

- [Find your way around the Lovable editor](https://docs.lovable.dev/features/projects/editor.md)
- [Edit from the preview](https://docs.lovable.dev/features/preview-toolbar.md)
- [Share a project with internal or external collaborators](https://docs.lovable.dev/features/share-project.md)
- [Connect your app to Linear](https://docs.lovable.dev/integrations/linear.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
