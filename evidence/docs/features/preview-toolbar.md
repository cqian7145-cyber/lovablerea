# Edit from the preview
<!-- source: https://docs.lovable.dev/features/preview-toolbar.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Edit from the preview

> Select, edit, annotate, and comment directly on your app preview.

> [!NOTE]
>
> The preview toolbar replaces the previous **Visual edits** experience. Instead of using a separate editing panel, choose a toolbar mode, point at what you want to change, and describe the update in plain language.

The **preview toolbar** lets you interact with your app while you build. Pick a mode, take an action on the page, and either edit directly, describe a change, draw an annotation, or leave a comment. The toolbar is available on all plans.

Use the toolbar when pointing is faster than describing, when you want to make several small updates in a row, or when a visual annotation explains the change better than text. You can start using the toolbar as soon as your app preview appears, without waiting for a separate editor to open.

## Preview toolbar modes

Each toolbar mode changes how you interact with the preview.

| Use | If you want to |
| - | - |
| Select elements | Point Lovable at one or more elements and request a change in plain language |
| Edit text inline | Fix a typo or change wording directly |
| Draw annotation | Show a layout or spatial change that's hard to describe |
| Add a comment | Leave feedback for yourself or a teammate |

You can switch modes any time. If you have unfinished work in the current mode, such as an unsent drawing or an unsaved text change, the other modes are not available until you send or discard your change.

### Select elements

Use **Select elements** when you want to point Lovable at a specific part of the page and describe what should change.

1. Click the **Select elements** button in the toolbar, or press `S`.
2. Click the element you want to change. You can select multiple elements at once. Hold **Cmd** (Mac) or **Ctrl** (Windows) and click additional elements to add them to your selection. Each selected element attaches to the project chat input as a reference, and your prompt applies to all of them.
3. Type what you want to change in plain language.
4. Send your message.

Example prompt:

```text wrap theme={null}
Make this button the primary brand color and round the corners more.
```

Lovable uses the selected elements as context and applies the change based on your description.

This is treated as standard build usage and **consumes credits**.

### Edit text inline

Use **Edit text inline** to change words on the page without writing a prompt. This is the fastest way to fix a typo, change a headline, or update a label.

1. Click the **Edit text inline** button, or press `T`.
2. Click into any text on the page.
3. Edit the text directly in place.
4. Click **Send** and Lovable applies the change.

Your account includes **100 free inline text edits**, counted across all your workspaces and projects. Each free edit becomes available again 24 hours after you use it. Your workspace also has a shared limit of 2,000 free inline text edits per 24 hours across all its members. After you reach either limit, inline text edits are treated as standard build usage and consume credits.

### Draw annotation

Use **Draw annotation** to sketch on top of your app preview and send the sketch as an image alongside a message. This is useful when words are not precise enough, such as when you want to move a group of cards, remove a section, or show where a new element should go.

1. Click the **Draw annotation** button, or press `D`.
2. Draw on the preview. The sketch is attached as an annotation to the project chat input.
3. Type a message describing what you want Lovable to do.
4. Send your message.

You can sketch freehand, or draw lines, arrows, rectangles, circles, and ovals. Rough shapes are recognized and cleaned up automatically, so a quickly drawn circle becomes a clean one.

Example prompt with a circled section:

```text wrap theme={null}
Remove everything inside this circle and replace it with a single call-to-action button that says "Get started".
```

Lovable receives both your message and the annotated screenshot.

This is treated as standard build usage and **consumes credits**.

### Add a comment

Use **Add a comment** to leave notes pinned to specific parts of your app. Comments help you and your collaborators discuss the project in context, instead of describing locations in a separate channel.

1. Click the **Add a comment** button, or press `C`.
2. Click where you want to leave the comment. A pin appears, and a comment thread opens next to it with an **Add a comment** form.
3. Type your comment and send.

Comments stay attached to the element you pinned them to. Teammates can reply, and you see a red badge on the **Add a comment** button when there are unread replies.

When the preview toolbar is hidden, the comments button moves to the project toolbar at the top of the preview so you can keep seeing threads, replies, and the unread badge.

Adding comments does not use credits. Sending a comment thread to Lovable is treated as standard build usage and consumes credits.

For more information, see [Project comments](https://docs.lovable.dev/features/project-comments.md).

## Working with the toolbar

The preview toolbar stays available while you work, but you can move it, change its appearance, or hide it when you want more space in the preview.

### Position, minimize, and hide

The toolbar options menu includes **Dock**, **Minimize**, and **Hide**.

The toolbar starts docked at the bottom center of the preview. You can:

* Drag it anywhere in the preview. It snaps to the corners and to the bottom-center default position to make placement easier, but you can drop it wherever you want.
* Minimize it to a small tab on the edge of the preview. Hover or tap the tab to expand it again.
* Hide it when you want a clean preview. You can bring it back by clicking the **Show preview toolbar icon** in the [top right controls](https://docs.lovable.dev/features/projects/editor.md#top-right-controls) above the preview (next to **Share** and **Publish**).

The toolbar remembers its state and position. The next time you open the project, it appears where you left it.

### Theme

From the options menu, you can pin the toolbar to **Auto**, **Light**, or **Dark**. In **Auto** mode, the toolbar adapts to what's behind it as you scroll, so it stays readable against any background. **Light** and **Dark** keep a fixed appearance.

### Send changes while Lovable works

You do not have to wait for one change to finish before starting the next. Requests you describe in the project chat with **Select elements** or **Draw annotation** work like any other message: Lovable picks them up at its next natural stopping point and includes them in the current work. Inline text edits and comment threads you send to Lovable run as their own request after the current task, and Lovable marks them **Runs after the current task**. See [Send follow-ups while Lovable works](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works).

## Tips for best results

* **Point first, then describe.** If you can click the thing you want to change, use **Select elements** so Lovable has the page context.
* **Use Draw annotation for spatial changes.** Moving things around, grouping content, deleting regions, or sketching new layouts is often faster as a drawing than as a written description.
* **Keep prompts short when you've selected an element.** Lovable already knows what you picked. "Make this the primary color" is enough.
* **Combine drawing with words for ambiguous changes.** A sketch shows the where, and your description explains the what.
* **Fix small text changes directly.** For typos, labels, and short copy changes, use **Edit text inline**.
* **Use chat for image changes.** To replace an image, select it, attach a new image, or add an image URL, then describe the update. To edit an existing image, select it, or draw on it, then tell Lovable what to change.
* **Send several edits in a row.** You can keep working while Lovable processes earlier requests.

## FAQ

> **What happened to Visual edits?**
>
> The preview toolbar replaces the previous Visual edits experience. Instead of using a separate editing panel, choose a toolbar mode, point at what you want to change, and describe the update in plain language.

> **Which toolbar actions use credits?**
>
> Select elements and Draw annotation are treated as standard build usage and consume credits.
>
> Your account includes 100 free inline text edits, counted across all your workspaces and projects. Each free edit becomes available again 24 hours after you use it. Your workspace also has a shared limit of 2,000 free inline text edits per 24 hours across all its members. After you reach either limit, inline text edits are treated as standard build usage and consume credits.
>
> Adding comments does not use credits. Sending a comment thread to Lovable is treated as standard build usage and consumes credits.

> **Can I select multiple elements at once?**
>
> Yes. Hold **Cmd** (Mac) or **Ctrl** (Windows) and click additional elements to add them to your selection. Each selected element attaches to the project chat input as a reference, and your prompt applies to all of them.

> **How do I replace or edit an image?**
>
> To replace an image, use **Select elements** to select the image in the preview, then attach a new image or add an image URL in the chat input. Describe what you want Lovable to do, then send your message.
>
> To edit an existing image, select the image or use **Draw annotation** to mark the area you want to change, then describe the edit in the project chat.

> **Why did my sketch get redrawn?**
>
> Draw annotation mode recognizes simple shapes, including lines, arrows, rectangles, circles, and ovals, and cleans them up so Lovable sees a clear annotation. If you draw something the recognizer does not match, it stays as freehand.

> **How do I bring back a hidden toolbar?**
>
> You can bring it back by clicking the **Show preview toolbar icon** in the [top right controls](https://docs.lovable.dev/features/projects/editor.md#top-right-controls) above the preview (next to **Share** and **Publish**).
>
> Those controls sit in the row above the preview, separate from the preview toolbar inside the preview itself.


## Related topics

- [Preview and test your app in Lovable](https://docs.lovable.dev/features/projects/preview.md)
- [View and edit your project's code](https://docs.lovable.dev/features/code-mode.md)
- [Find your way around the Lovable editor](https://docs.lovable.dev/features/projects/editor.md)
- [Edit Google Docs, Sheets, and Slides in Lovable](https://docs.lovable.dev/tips-tricks/google-workspace-editing.md)
- [Share a project with internal or external collaborators](https://docs.lovable.dev/features/share-project.md)
