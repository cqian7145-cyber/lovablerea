# Generate files and analyze data
<!-- source: https://docs.lovable.dev/features/generate-files.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate files and analyze data

> Analyze data, generate files, and build from the results directly in the project chat.

Ask Lovable to analyze data, create documents, transform files, and generate downloadable outputs directly in the project chat. Lovable writes and runs scripts in an isolated environment, then returns the result as a generated file. Your project's source code is never affected.

> [!NOTE]
>
> To create Markdown, text, CSV, or JSON files without a project, use [Chats](https://docs.lovable.dev/features/chats.md#create-files-in-a-chat).

You can build on top of the result in the same conversation. After Lovable analyzes your data or generates a file, ask it to create app features based on what it found. For example, turn a spreadsheet into a dashboard or a product spec into a working app flow.

> [!NOTE]
>
> On projects that use the built-in backend, Lovable can use your database for these tasks only if the **Read database** and **Change data** permissions are set to **Always allow**. See [Built-in backend](https://docs.lovable.dev/features/cloud) for more information.

## What you can do

Upload a CSV, spreadsheet, or any supported file and ask Lovable to analyze, transform, or combine it with other data sources, such as your database or connected tools.

| Use case | Example prompt |
| :- | :- |
| Data analysis | *Analyze the sales data in my uploaded CSV and tell me the top 5 products by revenue.* |
| PDF report | *Generate a PDF report summarizing this quarter's metrics from my database.* |
| CSV export | *Export all orders from the last 30 days as a CSV file.* |
| Data transformation | *Convert the uploaded JSON file to a formatted Excel spreadsheet.* |
| Chart generation | *Create a bar chart showing monthly signups from my users table.* |
| Slide deck | *Create a presentation summarizing the key findings from this dataset.* |
| Diagram | *Generate an architecture diagram for my app as a Mermaid flowchart.* |
| Image processing | *Resize these product images to 800x600 and convert them to WebP.* |
| Database query | *How many users signed up this week? Break it down by day.* |
| Data import | *Import the uploaded CSV into my products table.* |
| Connected tools | *Read my open Linear issues and generate a status report as a PDF.* |
| Build from a file | *Turn this Excel tracking sheet into a web app with dashboards and user login.* |
| Build from a spec | *Read this PDF product spec, summarize the requirements, and build the first version.* |
| Build from analysis | *Analyze my user drop-off data, then build an improved onboarding flow based on what you find.* |

## Presentations and slide decks

Lovable creates presentations in two ways:

* **As a web app**: Ask for a presentation and Lovable builds the deck as a web app in your project. Slides present fullscreen in the browser, you refine individual slides in the project chat, and you can [publish](https://docs.lovable.dev/features/publish.md) the deck and share its link like any other project.
* **As a downloadable file**: Ask for a PDF or `.pptx` file and Lovable generates it like any other file on this page. Download it from the project chat or the [**Files** tab](#manage-generated-files).

```text wrap theme={null}
Create a 10-slide pitch deck for my meal-planning startup: problem, solution, market, product, business model, traction, team, and the ask.
```

## How it works

Describe what you need in the project chat. You do not need to configure commands, write scripts, or choose tools yourself. Lovable decides when to run code and when to build features based on your request.

Lovable typically follows this flow:

1. It reads the files, data, or context you provide.
2. It writes and runs the scripts needed to complete the task.
3. It checks the result and fixes issues before delivering, for example layout problems in PDFs or missing data in generated files.
4. It returns the result as inline analysis, a generated file, or both.
5. It keeps that context in the same conversation so you can refine the output or build on it.

The more specific you are about structure, formatting, tone, data sources, and the result you want, the better the output will be.

## What Lovable can run

Lovable writes and executes scripts in an isolated Linux environment. If something can run in a Linux shell, Lovable can likely run it.

Common tools are preinstalled, for example:

| Category | Examples |
| :- | :- |
| Languages | Python 3, Node.js, Bun, Deno, Bash |
| Data processing | pandas, NumPy, SciPy, DuckDB |
| Visualization | matplotlib, Pillow |
| Database | psql for database access |
| Utilities | curl, jq, and standard Unix tools |

If a task needs an additional package or command line interface (CLI) tool, Lovable can install it automatically.

## Supported file types

Lovable can read files you upload and generate new files in the following formats:

| Category | Formats |
| :- | :- |
| Documents | PDF, DOCX, PPTX, TXT, Markdown |
| Spreadsheets | CSV, XLSX, XLS |
| Images | PNG, JPEG, WebP, SVG, GIF, AVIF, HEIC |
| Video | MP4 |
| Audio | MP3, M4A |
| Code and data | HTML, JSON, JS, TS, Python |
| Diagrams | Mermaid |
| Archives | ZIP, GZIP, TAR |

Files you upload for analysis can be up to **20 MB** each on the Free plan, **256 MB** each on paid plans, and **1 GB** on Enterprise, with up to 10 files per message.

Generated files are stored in your project's **Files** tab, not in your project's code, so they are not subject to these upload limits or to the [10 MB per-file code limit](https://docs.lovable.dev/features/projects/chat.md).

## Manage generated files

When Lovable creates documents in a project, they appear in its project chat reply as a list with each file's name and a file-type icon. Images and videos appear as a preview grid above the list. A single document with a preview, such as a PDF or a Markdown file, appears as a larger preview card. Select a row or card to open the file in the **Files** tab, where you can search, preview, and download all files in your project.

You can refine generated files through follow-up prompts. When you ask Lovable to revise a file, it saves a new version (for example, `report_v2.pdf`) so you can compare them.

Files are securely stored with the project until you delete them.

New files appear in the **Files** tab as Lovable creates them. In grid view, images display at their real proportions. To find a file:

* Use the search box.
* Filter by type with **All files**, **Images**, **Videos**, and **Docs**. Each option shows how many files match.
* Sort by **Updated**, **Name**, or **Size**. The sort button shows the active field, and selecting that field again reverses the order.
* Switch between **Grid view** and **List view**. In list view, documents show a file-type icon. In grid view, they show a preview.

The list loads more files as you scroll. When you change the search, the type filter, or the sort, the list starts again from the top.

From a file's actions menu, you can:

* **Add to chat**: reference the file in your next request.
* **Add to collections**: add the file to one or more [collections](#collections).
* **Download**: save the file to your device.
* **Copy link**: copy a link to the file.
* **Copy to clipboard**: copy an image so you can paste it elsewhere. Available for images only.
* **Delete**: remove the file from the project. You can also ask Lovable to delete a file. Deleting a file cannot be undone.
* **Select**: start a selection, on a touch device. With a mouse, hover over a file and select its checkbox.

### Preview a file

Select a file to open it. You can read PDFs, documents, spreadsheets, presentations, images, video, and audio without downloading them. The open file has the same actions as its row in the list. Archives and a few other formats have no preview and show a **Download file** button instead.

Markdown files open as formatted text, and you can copy any code block. Images hosted outside your project stay hidden until you select **Show images**. A long Markdown file shows only the beginning, with a note telling you to download it to read the rest.

### Select several files

Hover over a file and select its checkbox to start a selection. On a touch device, press and hold a file, or select **Select** in its actions menu. A bar shows how many files are selected, and its checkbox selects every file shown. From the bar you can **Add to chat**, **Manage collections**, **Download**, or **Delete** the selected files, and **Remove from collection** when you are inside a collection. You need edit access to the project to delete files or change collections. Close the bar to end the selection.

### Edit an image

You can mark a change directly on an image in your project instead of describing its position in words. Open the image in the **Files** tab and select **Edit**. Image editing is available on all plans. You need edit access to the project. The toolbar has four tools:

* **Draw**: brush over an area, describe the change, and select **Send**.
* **Comment**: place numbered pins on the image, write what to change at each pin, and select **Send**.
* **Erase**: brush over what you want removed and select **Erase**. Lovable fills the area to match the surrounding background.
* **Remove background**: select it, and Lovable removes the background from the whole image. You do not need to mark anything.

Lovable sends the request to the project chat, where it appears as a message such as **Edit marked area**. Lovable saves the result as a new file next to the original, with a name that describes the change. The original image stays unchanged. If you opened the image from a collection, Lovable adds the result to that collection. If the **Files** tab is open, Lovable opens the result there when it is ready. Otherwise, select **Open** in the **Edited image ready** notification.

Each edit uses [credits](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs) like any other Build mode message, plus the image generation it needs. **Edit** is not available for GIF and SVG files.

### Upload your own files

You can add your own files to a project alongside the ones Lovable generates, for example a brand guide, a dataset, or images for Lovable to use. Select **New → Upload new files**, or drag files onto the **Files** tab. You need edit access to the project to upload files.

Uploaded files are stored in the project's **Files** tab, not in its code. You can upload individual files only, not folders. Each file can be up to 20 MB on the Free plan, 256 MB on paid plans, and 1 GB on Enterprise, the same limits as for [files you attach in the project chat](https://docs.lovable.dev/features/projects/chat.md#attach-files-as-context).

### Collections

A collection is a named group of files in a project, available on all plans. Use collections to keep related files together, for example the assets for one campaign or the exports for one report. A file you add to a collection stays in the **Files** tab and can belong to several collections at once.

* **Create a collection**: select **New → Create new collection**, or select **Create collection** under **Collections**.
* **Add files to a collection**: open the collection and select **Add files**, or open a file's actions menu and select **Add to collections**.
* **Rename or delete a collection**: use the collection's actions menu. Deleting a collection does not delete its files.
* **Remove a file from a collection**: open the collection, then open the file's actions menu and select **Remove from collection**. The file stays in the **Files** tab.
* **Sort files in a collection**: open the collection and use the sort button to sort by **Updated**, **Name**, or **Size**. Lovable remembers the choice for every collection in this browser.

Each project can have up to 100 collections, and each collection up to 500 files. You need edit access to the project to change collections.

You can also ask Lovable to organize your files into collections. Collections appear in the project chat as cards you can open. Select **Add to chat** on a collection to reference it in your next request.

## Tips for best results

* **Be specific about formatting**\
  *"Create a PDF report with a cover page, section headers, and a summary table"* produces better results than *"Make a report"*.
* **Name your output**\
  If you want a specific filename, ask Lovable to add it, for example *"Save it as `q1-summary.pdf`."*
* **Iterate**\
  If the first result is not perfect, describe what to change. Lovable keeps context from prior outputs.
* **Split large datasets**\
  For very large files, ask Lovable to process a subset first, then scale up.
* **Use connected tools as data sources**\
  Ask Lovable to pull data from tools like Slack, Linear, or Notion, for example *"Summarize the last 50 messages from my Slack feedback channel and generate a report"*.
* **Combine steps**\
  You can ask for analysis and file generation in one prompt, for example *"Analyze this CSV and export the top 10 rows as an Excel file."*


## Related topics

- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md)
- [Connect your app to AWS S3](https://docs.lovable.dev/integrations/aws-s3.md)
- [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md)
