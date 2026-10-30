# Bring Figma designs into Lovable
<!-- source: https://docs.lovable.dev/integrations/figma.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Bring Figma designs into Lovable

> Three ways to import Figma designs, tokens, and components into Lovable: use the Figma plugin, connect via Figma MCP, or upload a .fig file.

Bringing your Figma work into Lovable means Lovable builds from your actual designs rather than guessing at layout, color, and component structure. Use it when you have existing designs you want to turn into a working app, when you need to match a design system precisely, or when a designer and developer are working in parallel and need to stay in sync.

The right method depends on what you need to transfer and what tools you have available. The plugin and .fig upload both work from the Lovable web app. The Figma MCP requires the Lovable desktop app but gives Lovable continuous, live access to your design files.

| Method | What you get | Best for |
| - | - | - |
| [Figma plugin](#figma-plugin) | Full designs exported directly from Figma | Designers who want to export straight from Figma without switching apps |
| [Figma MCP](#figma-mcp) | Real-time design context from Figma Desktop | Developers who want Lovable to read live design files |
| [Upload a .fig file](#upload-a-fig-file) | Variable collections, colors, typography, and frame structure | Quick handoff of styles and structure, no installs |

## Figma plugin

The Lovable Figma plugin lets you export designs directly from Figma into your Lovable workspace. Once installed, you select frames or components in Figma and send them to Lovable without leaving your design tool.

**Pros**

* Export individual frames, components, or whole files from Figma, ready for use directly in Lovable
* Available in all Figma plans
* Does not require the Lovable desktop app
* Does not require the Figma desktop app

### How to install and use the Figma plugin

Follow these steps to connect the plugin and export your first design.

> [!NOTE]
>
> You need at least a **Dev seat** in your Figma organization to use the plugin.

**1. Open the plugin in Figma**

In Figma, open any file. In the right panel, select **Plugins** and search for **Lovable**. Select **Run** on the **Lovable: Import from Figma** plugin.

> [!NOTE]
>
> If you only have a **Dev seat**, you must open the Figma file in Dev mode before you can see the plugin panel.

**2. Log in to Lovable**

In the plugin panel, select **Sign in with Lovable**, and then **Continue with Lovable** on the page that opens. A browser window opens.

If you are not logged in yet, go through your login flow. If you are logged in already, then go to the next step.

**3. Enter the pairing code**

Lovable asks for a pairing code. Open Figma again, copy the pairing code shown in the **Lovable: Import from Figma** plugin and enter it in Lovable to verify the connection.

**4. Grant permissions**

Review and grant the permissions requested by the Lovable Figma plugin.

**5. Export your design**

In your Figma design file, select the frame or component you want to export and follow the prompts in the plugin to export it.

You can change the name before exporting to make it easier to distinguish between exported components in Lovable. The design is sent to Lovable.

**6. Use the design in Lovable**

In Lovable, open the **+** menu and choose the design you exported from **Figma designs**. In the project chat of an existing project, the item is under **Add context → Figma designs**. In the prompt box on the dashboard, when you create a new project, **Figma designs** is directly in the menu.

The designs you export belong to your own Lovable account, so this list only shows yours. Other members of your workspace do not see them.

> [!NOTE]
>
> The **Figma designs** option is only visible after you have exported at least one design. If you do not see it yet, complete the export step first.

### Plugin limits

When you export, the plugin turns your selection into code, image, and font files. One export can carry up to 100 of those files, and each file can be up to 20 MB. If a frame is too large to export, simplify it or split it into smaller frames.

## Figma MCP

The Figma MCP connects the Lovable agent to your Figma Desktop app via a local MCP server. When connected, Lovable can read your open design files in real time, inspect component properties, and use that context while building, without you having to export or attach anything manually.

**Pros**

* Real-time access to your Figma design files
* No manual export needed
* Full design context: components, properties, layouts, and styles

**Cons**

* Requires the **Lovable desktop app** (the Figma MCP server is a local server, only reachable from your machine)
* Requires the **Figma desktop app** with Dev Mode enabled
* Requires a **Dev or Full seat** in Figma (not available on Figma's free Starter plan)
* On **Enterprise Lovable workspaces**, local MCP servers are disabled by default and must be enabled by an admin under [**Privacy & security → Local desktop MCP servers**](https://docs.lovable.dev/features/privacy-and-security-settings.md#local-desktop-mcp-servers)

### Setup

See [Connect Figma via the Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md#connect-figma) for the full setup instructions.

Once connected, you can reference your Figma designs directly in the project chat:

```text wrap theme={null}
Build the onboarding flow based on the designs in my Figma file, matching the colors, typography, and component layout exactly.
```

## Upload a .fig file

Upload a Figma file to give Lovable your design system values plus a high-level summary of the file: frame names, text, and a preview image. It does not recreate your designs or components.

**Pros**

* Fast and requires no additional installs
* Works well for passing design system tokens into a project
* Available on all Figma plans

**Cons**

* Does not import interactive designs or components

### How to upload a .fig file

Follow these steps to save and upload your Figma file.

**1. Save the file from Figma**

In the Figma desktop or web app, open your design file. Go to **File → Save local copy**. The file saves to your computer.

**2. Drag and drop into Lovable**

In Lovable, drag the `.fig` file into the prompt input or attach it using the attachment icon. Lovable extracts your variable collections, colors, typography, and frame structure, and generates a layout thumbnail for reference.

> [!TIP]
>
> .fig file uploads work best when your Figma file uses **local variables** (defined under **Local variables** in the Variables panel). Color styles, text styles, and frame structure are included as well.

## FAQ

> **What is the difference between the Figma plugin and uploading a .fig file?**
>
> The plugin transfers visual designs and components from Figma into Lovable. A .fig file upload transfers variable collections, colors, typography, and frame structure, along with a rendered thumbnail for layout reference. Use the plugin when you want Lovable to build from your actual screen designs. Use the .fig upload when you want to give Lovable your styles and structure without exporting individual designs.

> **Can I use the Figma MCP from the Lovable web app?**
>
> No. The Figma MCP runs as a local server on your machine and is only reachable from the Lovable desktop app. If you are using the web app, use the Figma plugin or upload a .fig file instead.

> **Does uploading a .fig file import my visual designs?**
>
> No. The .fig upload reads variable collections, colors, typography, and frame structure, and generates a rendered thumbnail for layout reference. It does not import interactive designs or components. Use the Figma plugin or Figma MCP if you need Lovable to work from your actual screen designs.

> **Does exporting a design from Figma use credits?**
>
> No. Exporting from the plugin is free, and so is uploading a `.fig` file. Sending a prompt that includes the design is treated as standard build usage and consumes credits.

> **Can I use more than one Figma method at the same time?**
>
> Yes. For example, you can connect Figma MCP for live design inspection while also uploading a .fig file to give Lovable your token values. Each method provides different context, and they can complement each other.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
