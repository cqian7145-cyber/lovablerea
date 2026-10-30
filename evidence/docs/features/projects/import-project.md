# Import a project from Replit, Bolt, v0, or another tool
<!-- source: https://docs.lovable.dev/features/projects/import-project.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Import a project from Replit, Bolt, v0, or another tool

> Bring an app from Replit, Manus, Bolt, Base44, v0, or any ZIP of code into Lovable. Lovable migrates the code and moves your database and users to Lovable's built-in backend.

You can bring an app you built in another tool into Lovable and keep building it here. Export the project from the other tool and upload it. Lovable rebuilds it as a Lovable project and moves the database and the app's users to the [built-in backend](https://docs.lovable.dev/features/cloud). Lovable checks that the app builds and runs before it reports the migration as complete.

Import is available on all plans to anyone who can create projects in the workspace. The first build of your first import is free, as described in [What an import costs](#what-an-import-costs).

> [!NOTE]
>
> This page is about importing an app built outside Lovable, where you upload a ZIP of its code. Looking for a copy of a project from another Lovable account? See [Remix a project](https://docs.lovable.dev/features/projects/remix.md#move-a-project-to-another-account). Looking to rebuild a published website from its URL? See [Import a website](https://docs.lovable.dev/features/projects/import-website.md). The three are different features.

## Before you start

Have these ready before you open the import dialog:

* For **Upload code**, a ZIP of the code, up to 250 MB. Leave out `.env` files, `node_modules`, and build output: Lovable asks for API keys later, and the dependency and build folders only make the file larger. For Replit, Manus, Bolt, Base44, and v0 you export during the import, so you do not need the ZIP beforehand.
* Access to the other tool's database export. The code export does not contain your database records or your app's user accounts. Lovable asks for those after it shows the first preview of the app. You can add them then, or later when you switch over.
* The API keys for services the app uses, such as Stripe, when Lovable asks. Lovable never asks for passwords, API keys, or database passwords in the chat. When the imported app needs a key, Lovable opens its [secret form](https://docs.lovable.dev/features/secrets.md#understanding-a-secret-prompt) and tells you where to find the value.

## Import a project

The import dialog shows guided export steps for Replit, Manus, Bolt, Base44, and v0, and accepts any other code you can put in a ZIP. Start the import from the dashboard:

**1. Open the import dialog**

On the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md), click the **+** button in the prompt input and select **Import project to Lovable**.

**2. Choose where your project lives today**

Under **App builders**, select **Replit**, **Manus**, **Bolt**, **Base44**, or **v0** to see the export steps for that tool. For code from any other tool, select **Upload code** under **Everything else**.

**3. Export the project**

Follow the numbered steps in the dialog. The first step shows a button that opens the tool in a new tab. The steps for each tool are listed in [Export steps for each tool](#export-steps-for-each-tool) below.

When you have the ZIP, click **Upload the ZIP** to go to the upload step.

**4. Upload the ZIP**

Drop the ZIP into the dialog or click **Choose file**. When the file shows **Ready to import**, click **Start import**.

**5. Let Lovable migrate the project**

Lovable creates the project, opens the editor, and starts the migration on its own in the [project chat](https://docs.lovable.dev/features/projects/chat.md). Lovable reports what it found in the export, what it changed, and what it still needs from you. See [What Lovable does during an import](#what-lovable-does-during-an-import).

> [!TIP]
>
> Lovable reports a **Ready** line listing the parts of the app it verified and a **Still needed** line naming anything that waits on you, usually your data export or a service key. The import is complete when Lovable says **migration complete**.

### Export steps for each tool

Each tool exports a ZIP of the code from a different place. The dialog shows the same steps as this table.

| Tool | How to export the code |
| - | - |
| **Replit** | Open the right sidebar in the project, select the **Files** tab, click the three dots, and choose **Download as ZIP**. |
| **Manus** | Open the chat inside the Manus project you want to move, not a new task. Click **Copy prompt** in the Lovable dialog, send the prompt to Manus, and download the ZIP it creates. This can take a few minutes. |
| **Bolt** | Open the project in Bolt, click the project name in the top-left to open the project menu, and choose **Export**, then **Download**. Delete any `.env` file inside the ZIP before you upload it. |
| **Base44** | Open your app in Base44, select the **⋯** menu in the top-right, and choose **Export project as ZIP**. Code export needs Base44's Builder plan or higher. |
| **v0** | Open your project in v0, select the **⋯** menu in the top-right, and choose **Download ZIP**. |
| **Another tool** | Export the code as a ZIP with the tool's own export option, or download a repository as a ZIP, and select **Upload code** in the dialog. Lovable detects which technologies, database, and services the code uses and migrates it the same way. |

The prompt for Manus asks it to package the code, schema, and configuration without credentials or database records:

```text wrap theme={null}
Prepare this project for migration to Lovable.
Create one ZIP file for moving it to Lovable and give me a download link.

Include:
- frontend and backend code
- assets and dependency files
- database schema and migrations
- configuration files
- an .env.example file, or another plain-text environment template, that lists required variable names with blank values

Do not include:
- .env files, secrets, or credentials
- passwords, password hashes, or session tokens
- dependency folders or build output

Do not export database records yet.
Do not change the existing application code or behavior.
```

## What Lovable does during an import

Lovable treats the export as source material, not as a finished Lovable project. It works in this order:

1. **Inspects the code without running it.** Lovable reads the code, schema, and configuration to list what the app does, from its pages and database tables to the external services it calls and the keys they need. Lovable does not run any code from the ZIP during this step. If the ZIP is unsafe or too large to inspect, Lovable asks for a replacement instead of continuing.
2. **Rebuilds the app.** Lovable rebuilds the app the way it builds new Lovable apps, on [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md), with the same pages, routes, and behavior.
3. **Moves the database and users to Lovable.** Lovable recreates the tables in the [built-in backend](https://docs.lovable.dev/features/cloud) and replaces the other tool's sign-in with Lovable's built-in [authentication](https://docs.lovable.dev/features/authentication). Existing users keep their profiles and data when you add the users export, as described in [Add your existing data](#add-your-existing-data). Passwords and sessions do not carry over, so when users next sign in they verify their email and choose a new password.
4. **Keeps the services the app already uses.** Services that work with Lovable, such as Stripe payments, file storage, email, and analytics, stay in place. When Lovable verifies one of them, it opens the secret form for the key it needs. It also tells you where to find the value, for example **Developers → API keys** in the Stripe Dashboard.
5. **Verifies the result.** Lovable builds the project, opens its pages, and tries a representative flow, such as creating and editing a record. For an app with users, it also checks that an imported user can verify their email, set a password, sign in, and see their own records and nobody else's. Lovable removes the test records it created.

Lovable says **migration complete** only when every part of the app is verified, or you have told Lovable in the chat to leave a part out. Until then it says **code migration complete**, and the **Still needed** line names what is missing.

## Add your existing data

After Lovable shows the first preview, it asks for your records with the message **Next: add your existing data**. The preview runs on an empty database until you provide them.

Export each table from the other tool, including the users table with email addresses and the original user IDs, and attach the files in the project chat. To add the data later, for example when you switch over, reply **Skip for now** and attach the files when you are ready.

Lovable reads CSV and JSON files, on their own or inside a ZIP. Each file can be up to 2 MB, and one message can carry up to 10 files and 25 MB in total. A single SQL dump of the whole database is not accepted, so export each table on its own.

| Tool | Where to export the data |
| - | - |
| **Replit** | Open **Database**, select **My Data**, open each table, and click the download icon in the top-right to save it as CSV. Export key-value data from ReplDB as JSON. Files in Object Storage need their own export. |
| **Manus** | Lovable gives you a second prompt to send in the same Manus project chat. Manus exports every table as one ZIP that you attach in the chat. |
| **Bolt** | Export each table from the project's **Data** section. For a connected Supabase database, export each table from its Table Editor as CSV. |
| **Base44** | Open **Dashboard**, select **Data**, and on each table card select **⋯ → Export** to download it as CSV. Export the users separately from **Settings → App Users**. |
| **v0** | Export each table from the project's **Data** section as CSV or JSON. If the tables are not there, export them from the connected database provider. |

When it imports the files, Lovable:

* removes password and token fields it recognizes
* imports the tables in the order their relationships require
* keeps the original IDs so references between records still match
* verifies the row counts

Database rows that point to files uploaded to the other tool's own storage, such as images or documents, do not contain the files themselves. Request a file export from the other tool if the app has to keep them.

## Switch over to the imported app

Lovable works from the ZIP you upload and does not connect to the other tool. Your app there keeps running while you check the imported app in the preview. The imported app is not public until you [publish](https://docs.lovable.dev/features/publish.md) it. When the app works the way you expect, switch over:

1. Export your data from the other tool when your users have stopped using it, and attach the files as described in [Add your existing data](#add-your-existing-data). Records created in the other tool after the export are not in Lovable.
2. Publish the app and [connect your domain](https://docs.lovable.dev/features/custom-domain.md#connect-a-domain-from-another-provider) to the Lovable project. Visitors reach the imported app when the domain points at Lovable.
3. Update the addresses that other services call, for example the webhook address (where Stripe sends payment events) in your Stripe Dashboard. Lovable names the ones it found in its report.
4. Tell your users that the next time they sign in, they verify their email and choose a new password. Lovable does not email them about the change.

## What an import costs

In your first import, the first build is free. The first build is Lovable's reply to the import request, in which Lovable rebuilds and migrates the app. That reply usually ends with the first preview of the imported app.

Every message you send in the project after the import request is treated as standard build usage and consumes credits. That includes the message where you add your data, and your answer when Lovable asks you a question before the first preview.

You get one free import, shared between project imports and [website imports](https://docs.lovable.dev/features/projects/import-website.md). The free import counts against your account and against the workspace, so it is available only when neither has used it. For example, each of these imports consumes credits:

* an import by any member of a workspace where someone already used the free import
* your import in any workspace after you used the free import in another one
* your project import after a free website import

The free import counts as used as soon as Lovable creates the project. It stays used if the import fails, if you stop before the first preview, or if you delete the project. While your free import is available, the import dialog shows a badge next to its title.

To start any import, including the free one, the workspace needs credits available. See [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md).

Every import after the free one is treated as standard build usage and consumes credits. The amount depends on the size of the project and on how much Lovable has to rewrite. See [Build costs](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs).

Running the app's database and users on Lovable counts as Cloud usage. See [Cloud costs](https://docs.lovable.dev/introduction/credits-and-usage.md#cloud-costs).

## Limitations

The import has these limits:

* A ZIP can be at most 250 MB. Remove `node_modules`, build output, and caches from the export. Do not remove parts of the app itself.
* The code export does not include your database records, user accounts, or uploaded files. Each needs its own export, as described in [Add your existing data](#add-your-existing-data).
* Passwords and active sessions do not transfer. Every imported user sets a new password when they next sign in.

## Troubleshooting

These are the points in an import where people most often stop. The first line of each answer says whether the behavior is intended.

> **This ZIP is over 250 MB. Remove dependencies and build output, then try again.**
>
> Intended. The dialog does not accept a ZIP over 250 MB. Delete `node_modules`, `.git`, build output such as `dist` or `.next`, and cache folders from the exported code, zip it again, and upload the smaller file. The import does not need them.

> **Upload failed. Try again.**
>
> Not intended. The upload failed and nothing was imported. Click **Retry** on the file. If it fails again, check that the file has a `.zip` extension and that your connection is stable, then upload it once more.

> **The import didn't start. Please try again.**
>
> Not intended. Lovable could not create the project. Click **Start import** again. If the dialog closes and no project appears on your dashboard, open the dialog, select the same tool, and upload the ZIP again. If Lovable instead tells you that creating projects is restricted in this workspace, ask a workspace admin or owner to import the project.

> **Lovable says code migration complete, but my app has no data**
>
> Intended. The code export never contains your records, so the first version runs on an empty database. Follow the export steps in [Add your existing data](#add-your-existing-data) and attach the files in the project chat. Lovable imports them and reports **migration complete** when the records and users are verified.

> **Lovable asks me for an API key**
>
> Intended. Lovable needs the key to verify a service the app already uses, as described in [What Lovable does during an import](#what-lovable-does-during-an-import). Enter it in the secret form Lovable opens, never in the chat. Until the key is in place, that part of the app stays on the **Still needed** line, and the rest of the app works.

> **My users can't sign in to the imported app with their old password**
>
> Intended. Passwords never leave the other tool. Each user keeps their account and data. When they next sign in, they verify their email address and choose a new password, as described in [What Lovable does during an import](#what-lovable-does-during-an-import). Tell your users to expect this step instead of signing in with their old password.


## Related topics

- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Import a website into Lovable from its URL](https://docs.lovable.dev/features/projects/import-website.md)
- [Dashboard overview](https://docs.lovable.dev/introduction/dashboard-overview.md)
- [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)
