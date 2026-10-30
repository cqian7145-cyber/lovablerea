# Lovable desktop app
<!-- source: https://docs.lovable.dev/integrations/desktop-app.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable desktop app

> Use Lovable as a native desktop application. Connect local tools, switch between your chats and projects, and work faster with keyboard shortcuts.

Lovable is available as a native desktop application for macOS and Windows. You get everything in the web app plus local MCP server support and keyboard shortcuts.

> [!NOTE]
>
> When using Lovable desktop, any processing that occurs locally on your device is your responsibility. Your use of Lovable desktop is subject to our [Lovable desktop terms](https://lovable.dev/desktop-app-terms).

## Requirements

* **macOS 13 or later** (Apple Silicon or Intel) or **Windows 10 or later**
* A Lovable account. The desktop app is available on **all plans, including Free**, at no extra cost.

## Download

> **[Download Lovable for macOS](https://lovable.dev/download)**
>
> Download the latest version of Lovable Desktop for macOS.

> **[Download Lovable for Windows](https://lovable.dev/download)**
>
> Download the latest version of Lovable Desktop for Windows.

## Move around the app

Your chats and projects open in the same window, one at a time. Switch between them from the sidebar. Links to other websites open in your browser, except sign-in and payment pages, which open in the app.

The desktop app has no address bar. To copy a project's link, right-click the project on the dashboard or in the sidebar, then select **Copy**, then **Project link**.

To open a project from a copied link, open the command palette with `Cmd+K` (`Ctrl+K` on Windows) and paste the link. See [Open a project by ID or URL](https://docs.lovable.dev/introduction/project-search-and-find.md#open-a-project-by-id-or-url).

## Keyboard shortcuts

Shortcuts that name a chat act on your conversations in [Chats](https://docs.lovable.dev/features/chats.md), not on the project chat in the editor.

| Action | macOS | Windows |
| - | - | - |
| Open the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) | `Cmd+K` | `Ctrl+K` |
| New chat | `Cmd+N` | `Ctrl+N` |
| Switch chats | `Ctrl+Tab` | `Ctrl+Tab` |
| Next chat | `Cmd+Option+→` | `Ctrl+Page Down` |
| Previous chat | `Cmd+Option+←` | `Ctrl+Page Up` |
| Go to chat 1 through 8 | `Cmd+1` through `Cmd+8` | `Ctrl+1` through `Ctrl+8` |
| Go to your last chat | `Cmd+9` | `Ctrl+9` |
| Back | `Cmd+[` | `Ctrl+[` |
| Forward | `Cmd+]` | `Ctrl+]` |
| Close the window | `Cmd+W` | `Alt+F4` |
| Open current page in browser | `Cmd+Shift+O` | `Ctrl+Shift+O` |
| Find in page | `Cmd+F` | `Ctrl+F` |
| Find next | `Cmd+G` | `Ctrl+G` |
| Find previous | `Cmd+Shift+G` | `Ctrl+Shift+G` |
| Zoom in | `Cmd+=` | `Ctrl+=` |
| Zoom out | `Cmd+-` | `Ctrl+-` |
| Reset zoom | `Cmd+0` | `Ctrl+0` |

To switch chats from the keyboard, hold **Ctrl** and press **Tab**. This shortcut uses **Ctrl** on macOS as well, not **Cmd**. Keep **Ctrl** held while you choose: a list of your recent chats opens, with the chat you are in first.

Press **Tab** again to move down the list, or **Shift+Tab** to move up. Release **Ctrl** to open the highlighted chat, or press **Esc** to cancel. If you tap the shortcut instead of holding it, Lovable switches to the chat you were in before, without showing the list.

The number shortcuts and **Next chat** and **Previous chat** move through your chats only, starting with your pinned chats and then your most recent ones. They skip the projects in your sidebar, so a number does not match a row's position there.

## Preview permissions

When you preview an app, four browser features ask for your permission the first time the app uses them. Each prompt names the feature and the preview's address, and you answer with **Block** or **Allow**.

Select **Remember my choice for this site** to give the same answer from then on, including a block. Without it, the app asks again the next time.

* **Microphone** and **camera**: an app that asks for both shows a prompt for each. If you block one, the app gets neither.
* **Location**: the app asks the first time it requests your location.
* **Clipboard**: an app can copy to your clipboard without asking. It asks the first time it tries to read from your clipboard.

Lovable denies every other browser feature a previewed app asks for, such as notifications or screen sharing, and shows no prompt.

To change an answer you remembered, open the project's preview and select the permissions icon in the bar above the preview. The icon appears only after you remember an answer for that preview.

**Preview permissions** lists each feature you answered, with a switch for each one. **Reset for this preview** clears them all, so the app asks again.

## MCP servers

The desktop app supports both **remote MCP servers** and **local MCP servers**.

**Remote MCP servers** work the same as in the web app. Open **Connectors** and select a chat connector to connect cloud-based tools like Notion, Linear, or Jira. See [Chat connectors](https://docs.lovable.dev/integrations/chat-connectors.md) for the full list and setup instructions.

> [!TIP]
>
> To reach your connectors from anywhere in the app, open the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) and search for connectors.

**Local MCP servers** connect to tools running directly on your machine. The most common examples are **Figma Desktop** and **Paper**, which expose a local MCP server when running on your computer. Connecting them lets the Lovable agent read your design files, inspect components, and use that context while building your app.

### Connect Figma

**1. Enable MCP in Figma Desktop**

Open the Figma desktop app and open any Design file. Switch to **Dev Mode** (`</>` toggle in the bottom toolbar, or press `Shift+D`), then click **Enable desktop MCP server**.

**2. Enable in Lovable**

In the Lovable desktop app, open **Connectors** → **Local MCP servers**. Figma appears in the list. Click **Enable**, then approve when prompted.

### Connect Paper

**1. Open Paper**

Make sure Paper is installed and running on your machine.

**2. Enable in Lovable**

Open **Connectors** → **Local MCP servers**. Paper appears in the list. Click **Enable**, then approve when prompted.

When connected, you can reference your local designs directly in chat. For example:

```text wrap theme={null}
Build the onboarding flow based on the designs in my Figma file, matching the colors, typography, and component layout exactly.
```

### Add a custom local MCP server

You can connect any MCP server running locally on your machine, such as a custom internal tool or a locally hosted service.

**1. Open local MCP settings**

Open **Connectors** → **Local MCP servers** and click **Custom MCP**.

**2. Enter server details**

Give the server a name and enter the connection details: a command and arguments for a local process, or a URL for a local HTTP server.

**3. Add and approve**

Click **Add server**, then approve the connection when prompted.

### Security and approvals

When a local MCP server requests access for the first time, the desktop app prompts you to approve it. You can review and remove connected local servers at any time in **Connectors** → **Local MCP servers**.

## FAQ

> **Is the desktop app free to download?**
>
> Yes. The desktop app is free to download and uses your existing Lovable account and plan. All plans, credits, and workspace settings carry over.

> **Does the desktop app work offline?**
>
> The Lovable agent requires an internet connection to run. If you lose connectivity, the app shows an offline message and resumes normally once your connection is restored.

> **How do updates work?**
>
> Lovable checks for a new version when you open the app. When one is available, you choose **Later** or **Download in background**. After it downloads, restart or let it apply when you next quit. A required update downloads and restarts for you. If you installed from the Microsoft Store, the Store delivers updates instead.

> **What happens when I close the desktop app window?**
>
> On macOS, Lovable keeps running in the menu bar. Select the Lovable icon there, then **New chat** to start a chat or **Open Lovable** to bring the window back. To exit the app, choose **Quit Lovable**. On Windows, closing the window exits the app.

> **What is the difference between local MCP servers and chat connectors?**
>
> Chat connectors (available in both the web app and desktop app) connect to remote cloud services like Notion, Linear, or Jira. Local MCP servers (desktop app only) connect to tools running directly on your machine, such as Figma Desktop or Paper. Local servers are only reachable from your computer, which is why they require the desktop app.

> **Figma or Paper isn't detected automatically. What should I do?**
>
> For **Figma**, make sure you have a Design file open in Dev Mode and that you clicked **Enable desktop MCP server** inside Figma. For **Paper**, make sure the app is running. If the connector still does not appear in Lovable, restart the Lovable desktop app. You can also add the server manually under **Connectors** → **Local MCP servers** → **Custom MCP**.

> **Can I use the same account on desktop and web at the same time?**
>
> Yes. Your Lovable account works across desktop and web simultaneously. Projects, credits, and settings are shared.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Bring Figma designs into Lovable](https://docs.lovable.dev/integrations/figma.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md)
