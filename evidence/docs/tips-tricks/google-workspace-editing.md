# Edit Google Docs, Sheets, and Slides in Lovable
<!-- source: https://docs.lovable.dev/tips-tricks/google-workspace-editing.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Edit Google Docs, Sheets, and Slides in Lovable

> Add lightweight project instructions for embedding editable Google Docs, Sheets, and Slides files in Lovable previews, with connector setup guidance and iframe URL patterns.

You can use Lovable to build an app around an editable Google Doc, Sheet, or Slides deck. A common pattern is to show the Google editor in an iframe while the surrounding Lovable app adds navigation, buttons, summaries, automations, or custom workflows.

Use this when you want collaborators to keep editing the original Google file directly, instead of copying its content into a separate editor.

## Why use this workflow

Embedding the Google editor keeps the source of truth in Google Workspace. Users can keep using familiar Docs, Sheets, and Slides editing tools while your Lovable app adds the product experience around the file.

This works well for lightweight internal tools, review flows, spreadsheet-powered dashboards, document copilots, and slide deck helpers.

## Common use cases and example apps

| Use case | What the Lovable app adds | Google file to embed |
| - | - | - |
| Document review workspace | Comments, AI summaries, checklists, or handoff buttons around a Doc | Google Docs |
| Sheet-powered operations tool | Custom filters, side panels, or actions beside the live Sheet | Google Sheets |
| Pitch deck assistant | Prompt controls, notes, or asset generation beside a deck | Google Slides |
| Internal planning hub | A file selector with the selected Google editor on the page | Docs, Sheets, or Slides |

## Prerequisites

* A Google account with access to the file
* A Lovable project where you want to embed the file
* Google Workspace connectors if the app needs to read, write, create, or list Google files through APIs
* Sharing settings that allow the people using the app to view or edit the Google file

App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

> [!NOTE]
>
> The iframe uses the viewer's browser session with Google. The Google Workspace connector is separate and is only needed when your app code needs to call Google APIs, such as reading Sheet rows, creating a Doc, or updating Slides.

## Set up Google Workspace connectors

If your app only embeds a known Google file, you may not need a connector. If your app reads, writes, creates, lists, or updates Google files, connect the relevant Google Workspace service first.

**1. Open connectors**

In Lovable, go to **Connectors**.

**2. Connect the Google services you need**

Add the relevant Google Workspace connections, such as **Google Docs**, **Google Sheets**, **Google Slides**, and **Google Drive**.

Use **Google Drive** when the app needs to list files, choose files, create files in folders, or manage file metadata.

**3. Authorize the right Google account**

Sign in with the Google account that should own or access the files. Each connection is tied to the account that authorizes it.

**4. Ask Lovable to use the connection**

In your project chat, describe which connection to use and what the app should do with it.

```text wrap theme={null}
Use my Google Sheets connection to read and update rows in this spreadsheet. Also show the spreadsheet itself in an editable iframe on the right side of the page.
```

For the full connector setup flow, see [Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md).

## Use the right iframe URL

For direct editing, ask Lovable to use the Google editor URL with `/edit`. Avoid `/preview`, `/view`, `/pub`, and published-to-web URLs when the goal is editing in place.

| File type | Editable iframe URL pattern |
| - | - |
| Google Docs | `https://docs.google.com/document/d/FILE_ID/edit?usp=sharing` |
| Google Sheets | `https://docs.google.com/spreadsheets/d/FILE_ID/edit?usp=sharing` |
| Google Slides | `https://docs.google.com/presentation/d/FILE_ID/edit?usp=sharing` |

Keep useful file-specific parameters when the user provides them:

* Docs: keep `tab=...` if the link includes a tab parameter.
* Sheets: keep `gid=...` or `range=...` when you want to open a specific sheet or range.
* Slides: keep `slide=...` if you want to open a specific slide.

> [!TIP]
>
> Add an **Open in Google** link next to the iframe. It gives users a reliable fallback if Google asks them to sign in, blocks iframe loading, or the embedded editor feels cramped.

## Copyable instructions

Paste this into your project instructions, workspace instructions, or a focused skill when your team frequently builds Google Workspace editing apps.

```text wrap theme={null}
Google Workspace editing guidance

When I ask to embed or edit a Google Doc, Sheet, or Slides deck directly in Lovable:
- Use an iframe that points to the Google editor URL with /edit, not /preview, /view, /pub, or a published-to-web URL.
- Use these URL patterns:
  - Docs: https://docs.google.com/document/d/FILE_ID/edit?usp=sharing
  - Sheets: https://docs.google.com/spreadsheets/d/FILE_ID/edit?usp=sharing
  - Slides: https://docs.google.com/presentation/d/FILE_ID/edit?usp=sharing
- Preserve useful URL parameters from the pasted link, such as Docs tab, Sheets gid/range, and Slides slide anchors.
- Add an "Open in Google" link near the iframe as a fallback.
- Make the iframe large enough to edit comfortably, usually full height in a split-pane layout.
- Store Google file IDs separately from display names when building file pickers or saved workspaces.
- If the app needs to read, write, create, or list files through APIs, use the matching Google Workspace connector. The iframe itself uses the viewer's Google browser session.
- Do not make a private Google file public unless I explicitly ask for that. Tell me when sharing settings or account access may block editing.
- For Sheets, use the connector for structured row reads and writes, and use the iframe for manual spreadsheet editing.
- If Google shows a sign-in screen or blocks the iframe, keep the Open in Google fallback and explain that Google controls iframe and sign-in behavior.
```

## Best practices

* **Start from the pasted Google URL.** Parse the file ID and preserve useful parameters instead of asking the user to find the ID manually.
* **Prefer split panes.** Put the Google editor on one side and the Lovable-built controls on the other.
* **Use connectors for data operations.** For example, read Sheet rows through the Google Sheets connector, then show the Sheet iframe for manual review.
* **Respect sharing settings.** Ask before changing file visibility, and avoid making private files public unless the user explicitly requests it.
* **Keep the fallback visible.** An external link avoids dead ends when Google requires sign-in or blocks iframe behavior.

## Limitations

* Google controls whether its editor loads inside an iframe. Users may need to sign in, accept cookies, or open the file in a new tab.
* The iframe does not give your app direct access to document contents. Use the Google Workspace connectors when your app needs structured access.
* The connected Google account owns or accesses files created through the connector. Make sure you authorize the account you want to use.
* Published apps can expose embedded links to anyone who can access the app. Keep Google sharing permissions aligned with the app audience.

## FAQ

> **Do I need a Google Workspace connector just to show an editable iframe?**
>
> No. The iframe loads through the user's browser and Google session. Use a connector when your app needs to call Google APIs, such as reading Sheet rows, creating Docs, or updating Slides.

> **Which Google URL should I use for editing?**
>
> Use the normal Google editor URL with `/edit`, such as `https://docs.google.com/document/d/FILE_ID/edit?usp=sharing`. Avoid preview, view-only, and published URLs when you want users to edit directly.

> **Why does the iframe show a sign-in screen or fail to load?**
>
> Google controls sign-in and iframe behavior. The viewer may need to sign in with an account that has access to the file, allow cookies, or open the file in a new tab.


## Related topics

- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Chat connectors: Connect your tools to Lovable using MCP servers](https://docs.lovable.dev/integrations/chat-connectors.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Generate files and analyze data](https://docs.lovable.dev/features/generate-files.md)
