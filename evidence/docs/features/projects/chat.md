# Work with Lovable in the project chat
<!-- source: https://docs.lovable.dev/features/projects/chat.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Work with Lovable in the project chat

> Everything you can do in the project chat panel in the editor. Write or dictate prompts, attach files, send follow-ups to steer Lovable while it works, answer Lovable's questions, undo changes, and fix errors.

The project chat is the panel on the left side of the editor where you work with Lovable on your app. You describe what you want in plain language, Lovable builds it, discusses it, or plans it depending on the mode you choose, and each response shows what changed so you can review it, steer it, or undo it.

Behind every message, Lovable's agent works in a loop: it gathers context from your conversation and project, takes action with tools, and checks the result before moving on. You'll see that loop reflected in everything below, from activity cards to the questions Lovable asks.

> [!TIP]
>
> You can ask Lovable anything, not just build requests. Ask how your app works, what a term means, or anything else on your mind, and Lovable answers in chat.
>
> You can also ask Lovable to run project actions from the project chat, for example **publish my app**, **deploy this project**, **ship it**, or **find me a domain for my bakery**. See [Publish from the project chat](https://docs.lovable.dev/features/publish.md#publish-from-the-project-chat) and [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md).

Every [draft](https://docs.lovable.dev/features/drafts.md) has a chat of its own. While you're in a draft, Lovable applies your requests to that draft instead of to your project, and you can ask it to update or accept the draft from there.

## The prompt box

Type your message into the text field at the bottom of the chat panel, then press **Enter** or click the send button. You don't need any special phrasing. Describe the outcome you want rather than the implementation:

```text wrap theme={null}
Add a sign-up form with email and password fields.
```

See [Prompting best practices](https://docs.lovable.dev/prompting/prompting-one.md) for more guidance, and the [prompt library](https://docs.lovable.dev/prompting/prompting-library.md) for ready-made prompts.

Around the text field you'll find:

* **The microphone**: Dictate your message instead of typing. Click it to start recording, or press **Option+V** (Mac) or **Alt+V** (Windows/Linux). Lovable transcribes while you speak, removing filler words and cleaning up the text as it goes, so your words are ready as soon as you stop. Click the check to put them in the prompt box for you to review and send, or the X to discard the recording.
* **The mode picker**: Switch between [Build, Chat, and Plan mode](#modes). **Option+P** (Mac) or **Alt+P** (Windows/Linux) cycles through the three modes.
* **The  button**: Open the [Chat actions menu](#chat-actions) to attach files, add context such as skills, projects, and connectors, and reach common project tools.

## Modes

The mode picker next to the chat input switches how Lovable responds:

* **Build**: Lovable makes changes directly in your project. This is the default, and the right choice for most requests, from small tweaks to whole features. Cost is usage-based, and many requests cost less than one credit. See [Build mode](https://docs.lovable.dev/features/agent-mode.md).
* **Chat**: Lovable discusses the app you have open without changing its code. Use it to ask how something works, explore an idea, or decide what to change. When a change is needed, Lovable shows a **Start building** card and switches to Build only after you select **Build**. A Chat mode message is priced on the work it needs, typically a fraction of a credit, and your workspace's daily chat allowance covers it first. See [Chat mode](https://docs.lovable.dev/features/chat-mode.md).
* **Plan**: Lovable investigates and plans without touching your code. Use it to think through a bigger feature, debug an issue safely, or compare approaches before building. A Plan mode message costs **one credit, plus the cost of any [subagent](https://docs.lovable.dev/features/subagents.md) research** Lovable runs while planning. See [Plan mode](https://docs.lovable.dev/features/plan-mode.md).

You can switch modes at any time, and the conversation carries across all three.

> [!NOTE]
>
> **Chat** in this picker is [Chat mode](https://docs.lovable.dev/features/chat-mode.md), a mode of the project chat: the conversation stays in this project, and everyone with access to the project can see it. [Chats](https://docs.lovable.dev/features/chats.md) is a different place: private conversations with Lovable outside your projects, started from the dashboard or at lovable.dev/chats. Both are chat usage and draw on the same daily chat allowance.

For a single message, you can also [set a goal](https://docs.lovable.dev/features/goal-runs.md): type `/goal` anywhere in the message, or pick **Goal** from the **Skills** list, and Lovable works on that message until the goal is achieved. A goal can take hours and use a large number of credits, and credit check-ins still apply.

## Chat actions

Click the **** button next to the chat input to open the **Chat actions** menu. Related actions are grouped together. Select a group, such as **Add context**, to see its actions, use the back arrow at the top to return, or type in the search box at the top to find any action by name.

* **Project**:
  * **History**: Open your project's [version history](https://docs.lovable.dev/features/projects/history.md) to browse and restore earlier versions.
  * **Instructions**: Write persistent instructions that Lovable follows in every request, such as your product context or design rules. See [Instructions](https://docs.lovable.dev/features/knowledge.md).
  * **Design system**: Attach a shared design system to this project. Available on paid plans. See [Design systems](https://docs.lovable.dev/features/design-systems.md).
  * **Settings**: Open your project's [**General** settings](https://docs.lovable.dev/features/projects/settings.md#general-tab), where you rename the project and manage publishing options. This is one of several [ways to open project settings](https://docs.lovable.dev/features/projects/settings.md#where-to-find-project-settings).
  * **GitHub**: Connect your project to a GitHub repository with two-way sync, so changes flow in both directions. See [GitHub](https://docs.lovable.dev/integrations/github.md).
  * **GitLab**: Connect your project to a GitLab repository with two-way sync, so changes flow in both directions. See [GitLab](https://docs.lovable.dev/integrations/gitlab.md).
* **Help & support**: On Enterprise plans, you find both items below here. On other plans, **Help center** is directly in the menu.
  * **Help center**: Open [lovable.dev/support](https://lovable.dev/support), with the docs, the docs assistant, the Lovable Academy, and the support form.
  * **Contact support**: On Enterprise plans, open a support request for this project without leaving the editor. Lovable attaches your project, workspace, and account details, and the support team replies by email. See [Contact support from the editor](https://docs.lovable.dev/introduction/support-policy.md#contact-support-from-the-editor).
* **Add context**: Add skills, other projects, connectors, your project's code, designs, and files to your message. Typing `@` in the chat input opens the projects, connectors, code, and designs from this group at your cursor, plus **Your files**, the files Lovable created for you in [Chats](https://docs.lovable.dev/features/chats.md#add-context). Keep typing to filter the list. On desktop, skills, projects, and connectors show their details in a panel next to the list as you move through it.
  * **Skills**: Browse your workspace's [skills](https://docs.lovable.dev/features/skills.md) and the skills built by Lovable, reusable instruction sets, and run one. **Goal** is listed here too, under **Built by Lovable**, and [sets the message as a goal](https://docs.lovable.dev/features/goal-runs.md). Picking a skill types the `/` command for you, and typing `/` in the chat input opens the same list at your cursor.
  * **Projects**: Point Lovable at another project in your workspace. See [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md).
  * **Connectors**: Mention a connector so Lovable pulls content from it. The list covers the connectors available to your workspace, with popular ones first. See [Connectors](https://docs.lovable.dev/integrations/introduction).
  * **Code**: Reference a file from your project's code, so Lovable works on exactly that file. See [Reference code in the project chat](https://docs.lovable.dev/features/code-mode.md#reference-code-in-the-project-chat).
  * **Figma designs**: Pick a design you exported with the Lovable Figma plugin. This item appears only after you have exported at least one design. See [Figma](https://docs.lovable.dev/integrations/figma.md).
  * **Project connectors**: Open [**More → Connectors**](https://docs.lovable.dev/features/projects/editor.md#the-more-menu), which lists the connections your app uses and the MCP servers your project can access. Select any connection to manage it. See [Connectors](https://docs.lovable.dev/integrations/introduction).
  * **Take a screenshot**: Open your browser's screen capture dialog and choose a tab, window, or screen. Lovable attaches the image to your message, so you can show exactly what you mean.
  * **Attach files**: Add files from your computer to your message, the same action as **Attach files** directly in the menu.
* **Attach files**: Add files from your computer to your message. See [Attach files as context](#attach-files-as-context).

## Attach files as context

Attachments show Lovable what you mean. Attach a design mockup to match, a screenshot of a bug to fix, or a document to build from, like a product brief, a spreadsheet of data, or an audio note. Attachments work the same when you [create a project](https://docs.lovable.dev/features/projects/overview#ways-to-create-a-project) from the dashboard: attach files to your very first prompt.

To add files, use **Attach files** in the **Chat actions** menu, drag files into the chat, or paste them. Lovable reads what you attach: images, PDF, Word, Excel, and PowerPoint files, and even audio recordings. Ask questions about an attached document, or tell Lovable to use its content in your app.

Each file can be up to **20 MB** on the Free plan, **256 MB** on paid plans, and **1 GB** on Enterprise. You can attach up to 10 files per message. Images can total up to 15 MB per message, and Lovable compresses large ones automatically. If an upload fails, try again with fewer or smaller files.

Click any attached file to open a preview:

* **Code files** open with syntax highlighting and the language named.
* **Markdown files** open as formatted text with a **Preview** and **Source** switch for the raw file.
* **CSV and TSV files** (comma- or tab-separated values) open as a table with numbered rows and lettered columns. Lovable shows at most 500 rows and 50 columns and adds a note to download the file if it holds more.
* **ZIP files** open as a list of the files inside the archive with their sizes, so you can check the contents before Lovable uses them. Lovable shows the first 100 files and notes how many more the archive holds. It reads only the archive's file list and does not extract anything.
* **PDF files** open inline on desktop in your browser's built-in PDF viewer, so you can read the document without leaving the chat. On a phone or tablet, the preview shows **Open PDF** instead, which opens the file in your browser.

Text-based files over 1 MB can't be previewed, but they still work as context. ZIP and PDF files have no preview size limit.

After attaching an image, click it to open the preview: click the image to zoom in, drag to pan, and use the zoom controls, a pinch, or **Ctrl+scroll** for finer control. To draw on the image, for example to circle the part you want changed, select **Draw**, sketch, and choose **Save**. Lovable receives the annotated image with your message.

The same viewer opens images that appear in the conversation, including images Lovable shows you, like screenshots of your app from its work. There, select **Add to chat** to attach the image you're viewing to your next message, so you can point at it and describe what to change.

To put an image or video into your app itself rather than show it to Lovable, see [Add images and videos to your app](#add-images-and-videos-to-your-app).

### Figma `.fig` files

Drop a `.fig` file into the chat and Lovable parses it in your browser and shows a preview on the attachment. Lovable reads the design data inside the file: variables, colors, typography, and frame structure, plus the preview image saved in the file. It uses these to match your design's style, not to rebuild every screen in the file, so tell Lovable in your prompt what you want built.

Use a `.fig` attachment for a one-shot handoff that works without keeping Figma open. For iterative work against a live Figma file, where you point Lovable at specific frames or components, [connect Figma through the Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md#connect-figma) instead.

To export a `.fig` from Figma, open the file and choose **File → Save local copy**.

## Add images and videos to your app

To place media in the app you're building, use whichever of these fits:

* **Ask Lovable to generate it**: Lovable can generate images, edit existing ones (including making backgrounds transparent), combine several images into one, and even generate short videos. Describe what you want:

  ```text wrap theme={null}
  Generate a hero image of a mountain at sunrise.
  ```

  Lovable picks a quality level for each image. Ask for higher quality when detail or readable text matters, which uses more credits.

  Lovable can also create standalone images that are not part of your app, like a logo or a poster. Ask for one and download it from the chat or the **Files** tab. To mark a change directly on an image stored in your project, [edit it in the **Files** tab](https://docs.lovable.dev/features/generate-files.md#edit-an-image).

  Images and videos Lovable generates use [build credits](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) and appear as **Image generation** and **Video generation** in your usage details.

* **Attach the image in chat**: Upload the image and tell Lovable where it goes:

  ```text wrap theme={null}
  Replace the logo in the navbar with this image.
  ```

* **Point at an existing image**: In the preview, use **Select elements** in the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) to select the image you want to change, attach the replacement or paste its URL, and describe the update.

* **Reference a hosted URL**: If the image already lives somewhere online, paste its URL in chat and tell Lovable where to use it. Be mindful of copyright.

* **Upload to your Git repository**: If your project is connected to [GitHub](https://docs.lovable.dev/integrations/github.md) or [GitLab](https://docs.lovable.dev/integrations/gitlab.md), upload media files to the repository's `public` folder, then reference them by path:

  ```text wrap theme={null}
  Add public/hero-image.jpg to the hero section.
  ```

* **Embed a video**: Link to a hosting service like YouTube and ask Lovable to embed it. For example:

```text wrap theme={null}
Embed this video https://www.youtube.com/watch?v=your-video-id in the hero section.
```

> [!WARNING]
>
> Large files stored in your project make it slower to load and preview. Compress images to the size they're displayed at, and host videos on a service like YouTube instead of uploading the file to your repository.

## While Lovable works

Lovable working on one request doesn't block you. Here is what you can do in the meantime.

### Send follow-ups while Lovable works

> [!NOTE]
>
> Follow-ups are the default for every account and replace the [message queue](#message-queue-deprecated). If your queued messages still show a **Send now** button, your account kept the queue: use the button to send a message into the running task, or disable **Message queue** in [**Account settings → Preferences**](https://docs.lovable.dev/introduction/lovable-account-settings#preferences) to switch to follow-ups.

You don't have to wait for Lovable to finish before sending your next message. In Build, Chat, and Plan mode, Lovable picks up new messages at its next natural stopping point, usually within seconds. If your message changes the direction, Lovable adjusts course. If it adds something, Lovable includes it in the current work. If it asks a question, Lovable answers it in its reply. Lovable keeps everything it has already completed, and follow-ups keep the files, elements, and references you attached to them.

A follow-up steers the work, but it doesn't interrupt Lovable mid-step. If you need Lovable to stop what it is doing immediately, [stop it](#stop-mid-task) first and then send your message: Lovable keeps the work it finished and starts fresh with your new instruction.

Until Lovable picks it up, your message appears grayed out at the bottom of the chat. If Lovable is stopped, or is waiting for you to answer a question, grayed-out messages wait: answer the question or send a new message, and Lovable picks up the waiting messages along with it. If you change your mind about a message Lovable has already picked up, you can still [edit it and try again](#edit-a-message-and-try-again).

Some messages always run as their own request after the current one instead of joining it. Lovable marks these **Runs after the current task**:

* **Try to fix** and the other one-click fixes from the [Security](https://docs.lovable.dev/features/security-view.md) view and the [SEO & AI search review](https://docs.lovable.dev/features/seo-aeo.md#fix-findings) in Analytics
* Inline text edits and comment threads you send to Lovable from the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md)
* Any message you send while a free fix is running

Answers to Lovable's question cards are different: they steer the current run directly.

If you have several changes in mind, send them as one message rather than as many rapid follow-ups. Lovable is more reliable with one list than with a stream of separate messages.

### Message queue (deprecated)

The message queue is deprecated: [follow-ups](#send-follow-ups-while-lovable-works) replace it as the default way of sending messages while Lovable works. The queue is disabled by default, so you send follow-ups. Accounts that used the queue before follow-ups replaced it kept it enabled. You can enable or disable it at any time with **Message queue** in [**Account settings → Preferences**](https://docs.lovable.dev/introduction/lovable-account-settings#preferences).

If you still have the queue, it works as before: messages you send while Lovable works wait in a visible queue above the chat input and run one at a time, in order. You can pause and resume the queue, reorder, edit, copy, or remove queued messages, and repeat a queued message up to 50 times. Queued messages keep the files, elements, and references you attached to them. Each queued message also has a **Send now** button, which sends it into the running task like a follow-up: Lovable picks it up at its next natural stopping point instead of waiting for the queue.

To switch to follow-ups, disable **Message queue**. To go back to the queue, enable it again.

### Follow the work in activity cards

Lovable's work shows up in chat as activity cards that track its individual actions: file edits, commands, web searches, browser tests, and the [subagents](https://docs.lovable.dev/features/subagents.md) it delegates research to. Click a card while Lovable works, or **Details** on a finished change, to open the **Details view**, which opens where the preview usually appears and shows the full timeline of steps and file changes. On bigger Build mode requests, Lovable also shows the tasks it's working through. See [Build mode](https://docs.lovable.dev/features/agent-mode.md#tasks-and-execution-visibility).

### Stop mid-task

If you need to change course, click the **stop button** while Lovable is responding. Lovable keeps the work completed so far, and the message is charged for the work already done. You can then send a new message with better direction.

## Answer Lovable's questions

When Lovable needs more direction, it can pause and show a question card instead of guessing. The card shows up to four questions, each with answer options, and you can pick an option or write your own answer.

You stay in control of how much you answer:

* Move between questions and change earlier answers before submitting.
* Skip the questions with **Skip** (one question) or **Skip all** (several questions). Lovable then continues with reasonable defaults for the work you already asked for. It does not treat the skip as approval for additional work it suggested.
* Draft answers are kept in your browser, so refreshing the page doesn't lose them.

For open-ended visual work, Lovable's questions can cover color, typography, and layout, so you steer the look before it builds. See [Design guidance](https://docs.lovable.dev/features/design-guidance.md#design-questions).

## Act on Lovable's responses

When Lovable finishes a task, its response tells you what changed and what you can do next, and a row of actions lets you react without typing:

* **Undo latest edit** (latest response only): Reverse Lovable's most recent change after you confirm with **Undo**. The undone changes stay in the project chat, so you can reapply them anytime.
* **Revert to this version** (earlier responses): Restore your project to that point after you confirm. Works the same as reverting from [version history](https://docs.lovable.dev/features/projects/history.md).
* **Copy**: Copy the response text, for example to save an explanation Lovable gave you.
* **Helpful** / **Not helpful**: Rate the response to give feedback on the result.

The **More options** menu on a response shows:

* **Copy message link**: Copy a direct link to that message, for example to show a collaborator or the support team the exact step where something happened.
* **Preview**: See your app as it was right after that message, without reverting anything.
* **Worked for** and **Credits used**: How long Lovable worked on the message and what it cost. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

On the activity card of a finished change, the **Bookmark in history** toggle saves that version to your bookmarks so it's easy to find and restore later. See [Version history](https://docs.lovable.dev/features/projects/history.md).

### See time and cost while Lovable works

You don't have to wait for a response to finish to see what it costs. The **More options** menu is also available on the message Lovable is still working on, where the same two rows update as the work progresses:

* **Working for**: How long Lovable has spent on the message. This measures active work, so it stops while the message is paused and waiting on you, for example to approve an action or answer a [credit check-in](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs), and continues when the work resumes.
* **Credits used**: The credits deducted for the message so far. This row appears with the first deduction, so at the start of a message you may see only **Working for**. The value is what Lovable has already charged rather than an estimate, and it reaches the final cost when the message finishes.

When the message finishes, the labels change to **Worked for** and **Credits used**, and both values are final. The labels are the same in Build, Chat, and Plan mode. In Chat mode, **Credits used** reads **Free** when the daily chat allowance covered the message, and after you approve a **Start building** card, the build is priced as Build mode work.

> [!NOTE]
>
> While a message is paused for a [credit check-in](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) or because your workspace ran out of credits, the **More options** menu is hidden. The credit check-in card states what the message has cost so far.

## Edit a message and try again

If an earlier request sent things the wrong way, hover over one of your own past messages and select **Edit message**. Rewrite the message and confirm with **Revert and resend**: your project returns to the state before that message, and Lovable runs the new version instead.

This works on your own text-only messages. Learn more in [Version history](https://docs.lovable.dev/features/projects/history.md).

## Fix errors and get unstuck

When a build error appears while Lovable works, a **Try to fix** button appears on the activity card. Click it and Lovable scans the logs, finds the issue, and attempts a fix. Your account includes 10 free fixes, shared across **Try to fix** and fixes from the [Security](https://docs.lovable.dev/features/security-view.md) view, in all your workspaces and projects. Each free fix becomes available again 24 hours after you use it. After you have used all 10, **Try to fix** still works and is treated as standard build usage and consumes credits.

While the latest build fails, the Publish dialog also blocks publishing and offers the same **Try to fix**. See [The Publish dialog, step by step](https://docs.lovable.dev/features/publish.md#the-publish-dialog-step-by-step).

If the error keeps coming back, or your app runs without errors but doesn't behave as you intended, work through these steps instead of retrying the same prompt:

**1. Ask Lovable to investigate**

Describe what you see and what you expected. Lovable can inspect errors, logs, and console output, and test your app in a browser.

```text wrap theme={null}
The login form does nothing on mobile. Walk me through what's happening.
```

**2. Revert and re-prompt**

Roll back to the version just before the issue appeared using [version history](https://docs.lovable.dev/features/projects/history.md), then try a clearer, more specific prompt.

**3. Plan before rebuilding**

Switch to [Plan mode](https://docs.lovable.dev/features/plan-mode.md) and ask Lovable to outline an approach first. Review the plan, adjust it, then build step by step.

If you're on a paid plan and believe the issue is with Lovable itself, contact [Support](https://lovable.dev/support).

> [!TIP]
>
> With [Project monitoring](https://docs.lovable.dev/features/project-monitoring.md), Lovable can also watch your project on a schedule and post a brief in chat when it detects an issue, with the option to fix or ignore it. Monitoring is disabled by default. Enable it in [**Project settings → General → Project monitoring**](https://docs.lovable.dev/features/projects/settings.md#general-tab). Available on Pro plans and above.

## Suggestions from Lovable

After a response, Lovable may suggest features to build next as clickable chips near the chat input. Click one and it fills the prompt box, so you can adjust the wording before sending, or ignore the chips and write your own. Suggestions are based on your project and what you just built. You can disable them with the **Chat suggestions** toggle in your [account settings](https://docs.lovable.dev/introduction/lovable-account-settings#preferences).

## FAQ

> **Do messages in the project chat cost credits?**
>
> Yes. Build mode messages are priced on the work completed, and Plan mode messages cost one credit plus any subagent research. Chat mode messages are priced on the work they need, typically a fraction of a credit, and your workspace's [daily chat allowance](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs) covers them first. The **More options** menu on a message shows **Credits used**: the credits spent so far while Lovable is working, and the total when the message finishes. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Does Try to fix cost credits?**
>
> The first fixes are free. Your account includes 10 free fixes, shared across **Try to fix** on build errors and fixes from the [Security view](https://docs.lovable.dev/features/security-view.md). The 10 fixes count across all your workspaces and projects, not per project. Each free fix becomes available again 24 hours after you use it. After you have used all 10, further fixes are treated as standard build usage and consume credits. Security scans themselves are always free and do not count toward the 10.

> **Can I send several instructions at once?**
>
> Yes. While Lovable is working, keep typing: Lovable picks up each message at its next natural stopping point and includes it in the work without losing anything it has already done. See [Send follow-ups while Lovable works](#send-follow-ups-while-lovable-works). If you still have the [message queue](#message-queue-deprecated), your messages keep queueing in order instead. **Send now** on a queued message sends it into the running task like a follow-up, and you can disable the queue in [**Account settings → Preferences**](https://docs.lovable.dev/introduction/lovable-account-settings#preferences).

> **Does sending a follow-up cost extra credits?**
>
> No. Credits work the same as if you had sent the message while Lovable was idle. In Build mode you are charged for the work Lovable completes, and a follow-up doesn't add a separate fee.

> **How do I undo what the last message did?**
>
> Click **Undo latest edit** under Lovable's latest response and confirm with **Undo** to reverse its most recent change. To go further back, revert from [version history](https://docs.lovable.dev/features/projects/history.md), or use **Edit message** on your own message and choose **Revert and resend** to rewrite it and try again.

> **How do I attach images and files?**
>
> Use **Attach files** in the **Chat actions** menu, drag files into the chat, or paste them. You can also use **Take a screenshot** under **Add context** to capture your screen. See [Attach files as context](#attach-files-as-context).

> **Can I edit the code directly instead of using chat?**
>
> Yes. Open the **Code** tab in the project toolbar to read and edit your project's code yourself. See [Edit code](https://docs.lovable.dev/features/code-mode.md).

> **How do I publish my project from chat?**
>
> Ask Lovable to **publish**, **deploy**, **ship**, or **go live**, and Lovable publishes your app while respecting your workspace settings. To pick a subdomain, add it to the prompt, for example `Publish to my-todos.lovable.app`. You can also click **Publish** in the top-right corner of the editor to use the Publish dialog. See [Publish your Lovable project](https://docs.lovable.dev/features/publish.md).

> **Can I set up a custom domain from chat?**
>
> Yes. Ask Lovable to find a domain and it searches what's available, or ask it to connect a domain you already own. Lovable always shows a confirmation card before it buys or connects a domain, and buying continues in checkout. The same plan and permission requirements apply as in **Project → Settings → Domains**. You can also ask how a domain's setup is going. Setting a primary domain is done in settings. See [Set up a custom domain](https://docs.lovable.dev/features/custom-domain.md).

> **Why do I see "The following file(s) exceed the 10 MB per-file commit limit"?**
>
> Single files larger than 10 MB cannot be saved into your project's code, usually after adding large images, videos, or other media. Ask Lovable in chat to migrate them, and it moves the files to Lovable's CDN and updates your code to load them from there:
>
> ```text wrap theme={null}
> Migrate large files to CDN assets.
> ```
>
> Files pushed from your own computer through Git sync can be larger, but Lovable cannot change them afterwards.

> **What happens if I close my browser while Lovable is working?**
>
> Lovable keeps working. Your request runs on Lovable's servers, not in your browser, so you can close the tab and come back later to find the finished result in chat. This applies to long tasks too: Lovable works on a single build message for [up to 10 hours](https://docs.lovable.dev/features/agent-mode.md#how-long-lovable-works-on-one-message).

> **What happens if I run out of credits while Lovable is working?**
>
> Lovable pauses the message instead of ending it, and a card appears in chat. Choose **Add credits** to resume where Lovable left off, or **Finish up** to have Lovable finish the work in progress and stop. Paused work waits until you decide. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

> **Can Lovable notify me when it's done?**
>
> Yes. On desktop, Lovable may offer to enable browser notifications so you know when it finishes a task or needs your input. You can dismiss the prompt and keep working without them.


## Related topics

- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Chat with Lovable in Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md)
- [Chat with Lovable in Telegram](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md)
- [Discuss your app in Chat mode](https://docs.lovable.dev/features/chat-mode.md)
- [App + chat connectors: Add capabilities to your published app and your chat](https://docs.lovable.dev/integrations/app-connectors.md)
