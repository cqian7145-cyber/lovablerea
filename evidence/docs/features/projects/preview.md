# Preview and test your app in Lovable
<!-- source: https://docs.lovable.dev/features/projects/preview.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Preview and test your app in Lovable

> See your app running live while you build. Test phone, tablet, and desktop sizes, try complete flows before you publish, and share progress with a preview link.

The **preview** is the live, interactive version of your app that runs on the right side of the editor. It updates as Lovable builds, so you can watch changes appear, click through your app, and test it exactly as your users would.

Think of the preview as your app's staging environment: a private testing space that always runs your latest work. Your visitors see the published version instead, a snapshot that only changes when you [publish](https://docs.lovable.dev/features/publish.md). That separation gives you room to iterate before visitors see the result. Keep in mind that the preview and your published app share the same backend and data, so changes to your database affect both.

Each [draft](https://docs.lovable.dev/features/drafts.md) has a preview of its own, at its own web address, so you can compare an idea against the main version of your project before you accept it.

## Why the preview matters

The preview is where you check Lovable's work. Instead of guessing whether a change landed correctly, you click around your app, try the flow you asked for, and give feedback right away. Testing in the preview before you publish keeps unfinished work off your live site.

## Common ways to use the preview

* **Check each change as it lands**: After you send a request, watch the preview update and confirm the result matches what you asked for.
* **Test a flow end to end**: Sign up, fill in a form, or complete a checkout in the preview before your users do.
* **Review on different screen sizes**: Use the device toggle above the preview to make sure your app works on a phone, not just on your laptop.
* **Collect feedback**: Share a view-only preview link from the **Share** menu so a friend, client, or teammate can see your progress. See [Share a preview](#share-a-preview).

## Preview controls

The bar above the preview holds the controls for moving around your app:

* **Device toggle**: Switches the preview between **Desktop view**, **Tablet view**, and **Mobile view** so you can check your app at phone and tablet sizes before you share it.
* **Page selector**: Shows the page you're viewing. Click it to see all of your app's pages, find one by typing in the **Find page or enter path** field, or enter a path directly to jump there. Hover over the preview icon on a page to see two cards: **Social** shows the preview that appears when someone shares a link to the page, with its image, title, and description, and **Search** shows how the page looks in search results, including its favicon. Both cards show your latest changes, even before you publish. To change what's on them, click **Ask Lovable to edit**: Lovable drafts a chat message for you, so you only describe what you want changed and send it. On mobile, open **Social & search** from the preview actions menu to see the cards for the page you're viewing.
* **Refresh**: Reloads the preview.
* **Open in new tab**: Opens your development preview in its own browser tab, so you can test it full screen or keep it visible while you chat. This URL requires logging in to Lovable with access to your project. To show your app to someone without access, use a [preview link](#share-a-preview) instead.

> [!TIP]
>
> If the preview looks wrong or won't load, click **Refresh** first. Hold **Shift** while clicking **Refresh** to also restart the preview environment, which resolves most loading issues. A hard browser refresh (**Cmd+Shift+R** on Mac, **Ctrl+Shift+R** on Windows/Linux) can help too.

A few more controls sit in the top right corner, above the preview:

* **Preview toolbar toggle**: Bring back the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) if you've hidden it, so you can select elements, edit text, and draw on the preview.
* **Comments**: Open your project's [comments](https://docs.lovable.dev/features/project-comments.md) to catch up on feedback pinned to the preview.
* **Collaborator avatars**: See who else is in the project right now.
* **Share** and **Publish**: Invite people or create preview links, and put your app live. See [Share your project](https://docs.lovable.dev/features/share-project.md) and [Publish your project](https://docs.lovable.dev/features/publish.md).

The [editor map](https://docs.lovable.dev/features/projects/editor.md#top-right-controls) describes the full top bar.

## Preview pause

Your preview runs in a temporary cloud environment that Lovable starts for your project while you work. When you're away from the project for a while, that environment pauses to save resources, and the preview shows a **Still building?** message noting that Lovable paused it.

Click **Keep building** to resume. The environment starts again and the preview picks up exactly where you left off. Pausing is normal and changes nothing about your project. Your published site is never affected, and visitors can still access your live app while the preview is paused.

If you'd rather not run a live preview at all, you can [turn it off entirely](#turn-off-the-live-preview).

## Turn off the live preview

By default, the preview runs your app live so you can watch changes appear as Lovable works. If you'd rather have a steadier preview, open [**Project settings → General → Preview**](https://docs.lovable.dev/features/projects/settings.md#preview) and turn **Live preview** off.

With **Live preview** off:

* The preview shows the most recent completed version of your app, and updates when Lovable finishes a change rather than while it works.
* Switching between versions in [version history](https://docs.lovable.dev/features/projects/history.md) shows each version without restarting the live environment.
* The preview doesn't pause when you're away, because nothing is running live.

This only changes what you see in the preview. It doesn't affect your published app, and Lovable still builds and tests your changes behind the scenes in its own environment. Turn **Live preview** back on in the same setting to return to the live view.

## Edit directly from the preview

The [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md), the floating toolbar inside the preview, turns the preview into an editing surface. Its four modes each change what clicking does:

* **Select elements**: Point Lovable at a specific element and describe the change in plain language.
* **Edit text inline**: Fix typos and copy directly on the page, without a prompt.
* **Draw annotation**: Sketch on top of your app to show a layout change that's hard to describe.
* **Add a comment**: Pin feedback to a specific element for you or your collaborators.

When you know exactly which part of the page you want to change, pointing at it is usually faster and more precise than describing it in the project chat. See [Edit from the preview](https://docs.lovable.dev/features/preview-toolbar.md) for the full guide.

## Test your app

Test the important flows yourself in the preview: click every button, submit your forms, and try the paths your users will take.

You can also ask Lovable to test for you. Lovable can open your app in a real browser, navigate pages, click buttons, fill forms, and report what it finds, and it can run automated tests for your app's logic. Ask in the project chat:

```text wrap theme={null}
Test the sign-up flow and fix anything that's broken.
```

See [Test and verify your app](https://docs.lovable.dev/features/testing.md) and [Browser testing](https://docs.lovable.dev/features/browser-testing.md).

## Share a preview

To let someone see your working version without giving them access to the project, click **Share** in the top right of the editor and select **Share a preview link**. Anyone with the link can open it while it's active, with no Lovable account needed.

Guests can't edit anything. You can create multiple named links and decide whether each link allows guest comments. On Free and Pro plans, links expire after 7 days. On Business and Enterprise plans, you can require a password and choose an expiration of 24 hours, 7 days, 30 days, or never. Enterprise workspaces can disable shared preview links entirely.

Learn more in [Share your project](https://docs.lovable.dev/features/share-project.md).

## FAQ

> **Why is my preview blank or not loading?**
>
> Click **Refresh** above the preview first. If that doesn't help, hold **Shift** and click **Refresh** to restart the preview environment, or do a hard browser refresh (**Cmd+Shift+R** on Mac, **Ctrl+Shift+R** on Windows/Linux).
>
> A blank preview usually comes from an error in the app itself. Ask Lovable about it in the project chat:
>
> ```text wrap theme={null}
> The preview is white, investigate and fix it.
> ```
>
> If the preview shows **Starting live preview…** for several minutes, Lovable is still starting it. Lovable retries a failed start automatically. When your device goes offline, Lovable waits and resumes the start when your connection returns. You don't need to refresh or restart the preview. If the message remains, check your internet connection. If the start fails, the preview shows one of the error messages in [Troubleshooting](#troubleshooting).

> **Is the preview the same as my published site?**
>
> No. The preview always shows your latest working version. Your published site is a snapshot that only changes when you publish. If you make changes in the editor, visitors won't see them until you publish an update. See [Publish your project](https://docs.lovable.dev/features/publish.md).

> **Can other people see my preview?**
>
> Only people you let in.
>
> Collaborators open the preview in the editor. Viewers see just the preview, while editors and admins see the full editor, including chat.
>
> To show your work to someone outside the project, send them a shared preview link. Anyone with the link can view your working version in their browser, with no Lovable account needed, until the link expires or is deleted. If the link has password protection, they also need the password.
>
> A shared preview link always shows your latest in-progress version, even when it never expires. Publish the app when you need a production URL. See [Share your project](https://docs.lovable.dev/features/share-project.md).

> **Why did my preview pause?**
>
> The preview pauses after you've been away for a while to save resources. Click **Keep building** to resume. This is normal and has no effect on your published site.

> **How do I test my app on a phone-sized screen?**
>
> Use the device toggle above the preview to switch between **Desktop view**, **Tablet view**, and **Mobile view**. You can also click **Open in new tab** and resize your browser window, or open a preview link on your phone.

## Troubleshooting

These entries cover the error messages the preview shows when it cannot run your app. Each message includes a **Try again** button, which restarts the live preview.

> **Live preview couldn't start**
>
> Lovable could not start the preview environment for your app, even after its automatic retries.
>
> **What to do:** Check your internet connection, then click **Try again**. If the message returns, hold **Shift** and click **Refresh** above the preview to restart the preview environment. When an earlier version of your app is available, you can also click **Dismiss** to show that version instead of the live preview.

> **Live preview lost connection**
>
> Lovable lost the connection to the preview environment that was running your app, for example when your device went offline. Lovable tries to recover the preview first and shows this message only when the recovery fails.
>
> **What to do:** Check your internet connection, then click **Try again**. If the message returns, hold **Shift** and click **Refresh** above the preview to restart the preview environment.

> **Live preview stopped responding**
>
> The preview environment running your app stopped answering, or your app crashed again after Lovable restarted the preview automatically.
>
> **What to do:** Click **Try again**. If the message returns, ask Lovable to find the cause in your app:
>
> ```text wrap theme={null}
> The preview shows "Live preview stopped responding", investigate and fix it.
> ```


## Related topics

- [Test your app in a browser](https://docs.lovable.dev/features/browser-testing.md)
- [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md)
- [Test and verify your app](https://docs.lovable.dev/features/testing.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
