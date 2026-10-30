# Connect to Supabase
<!-- source: https://docs.lovable.dev/integrations/supabase.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to Supabase

> Connect Lovable with Supabase for seamless backend setup, database, auth, storage, real-time, and serverless functions.

The Supabase integration connects a [Supabase](https://supabase.com/) project you own to your Lovable project and uses it as your app's backend. When connected, Lovable builds full-stack features directly from the project chat: it designs your database schema, runs migrations, deploys edge functions, and wires your app's UI to your data, all against your own Supabase project.

> [!NOTE]
>
> **Do I need Supabase?** No. Lovable's [built-in backend](https://docs.lovable.dev/features/cloud) is enabled by default, so most projects never need a separate Supabase account. It utilizes Supabase's open-source foundation, so you get the same database, auth, storage, and edge function capabilities without any setup.
>
> Connect your own Supabase project when you want direct ownership of the backend: your own Supabase account and billing, full access to the Supabase dashboard, or an existing Supabase project you already use.

The Supabase integration is available on all plans.

## Supabase or the built-in backend?

| | Built-in backend | Your own Supabase project |
| - | - | - |
| Setup | Automatic, no extra account | Requires a Supabase account and project |
| Billing | Credits in your Lovable workspace | Your Supabase subscription, billed by Supabase |
| Backend management | The **Database**, **Users**, and **Storage** views inside Lovable | Supabase dashboard |
| Auth settings and social login providers | Configured through Lovable | Configured in the Supabase dashboard |
| Infrastructure (backups, instance size, pausing) | Managed by Lovable | Managed by you in Supabase |
| Best for | Most projects, fastest path to a working backend | Teams who want to own their Supabase account and infrastructure |

Switching between the two is not automatic. Lovable does not move a project from the built-in backend to Supabase in one step, or the other way, so it's worth deciding early which backend you want a project to use. See [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database) for details on exporting from the built-in backend.

## What you can build

With Supabase connected, you can prompt Lovable to build complete backend features:

* **Store and query data**: Lovable designs tables and relationships from a plain-language description and connects your UI to them.
* **Sign users in**: email and password authentication, social logins, and access control backed by Supabase Auth.
* **Upload and serve files**: images, documents, and other media stored in Supabase Storage buckets.
* **Run server-side code**: Supabase Edge Functions for payments, emails, AI features, scheduled tasks, and external API calls.
* **Keep secrets safe**: API keys for services like Stripe or Resend are stored securely in your Supabase project, never in your app's code.
* **Update in real time**: live chat, feeds, and dashboards using Supabase's real-time subscriptions.

For the full picture of everything the Supabase platform offers, see the [Supabase documentation](https://supabase.com/docs).

## Prerequisites

* A Supabase account. [Sign up](https://supabase.com/dashboard/sign-up) or [sign in](https://supabase.com/dashboard/sign-in); the free tier is enough to get started.
* A Supabase project to connect, or a Supabase organization where you can create one.

## Connect Supabase to Lovable

Connecting involves two separate actions, often done by different people:

1. **Link a Supabase organization to your Lovable workspace.** A workspace owner or admin does this once per organization. Linked organizations become available to everyone in the workspace.
2. **Connect a Lovable project to a Supabase project.** Anyone with edit access to the project can do this, using any project from a linked organization.

If you're a workspace owner or admin doing this for the first time, the connect dialog walks you through both actions in one flow.

### Link your Supabase organization (workspace owners and admins)

You can link an organization from any of these places:

* **The Supabase connector page**: open [**Connectors**](https://docs.lovable.dev/integrations/introduction) from the dashboard sidebar, select **Supabase**, and click **Connect Supabase** (or **Manage Connected Organizations** if the workspace already has one).
* **The connect dialog in a project**: in the editor, open **Settings → General → External Supabase**, click **Connect**, and use **Add Organization**.
* **When creating a project**: on the dashboard, click **+** in the prompt box, open **Databases**, and choose **Add Supabase organization**.

Whichever you choose, a Supabase window opens where you sign in and authorize Lovable for the organization you pick. The organization then appears under **Linked Supabase organizations** and is available to every member of the workspace. Members don't need their own Supabase accounts to connect projects from it.

> [!NOTE]
>
> Only workspace owners and admins can add or reconnect organizations. If these options are disabled for you, ask a workspace admin to link the organization first.

### Connect your Lovable project to a Supabase project

When an organization is linked, anyone with edit access to a project can connect it. Start from either place:

* **When creating a new project**: on the dashboard, click **+** in the prompt box, open **Databases**, and pick a Supabase project under the **Supabase** heading (or type "Supabase" in the menu search). The new Lovable project is created with that Supabase project as its backend.
* **In an existing project**: connect from the project's settings in the editor:

**1. Open the connect dialog**

In the editor, open **Settings → General → External Supabase** and click **Connect**. The option appears on projects that don't have a backend yet.

In the **Linked Supabase organizations** dialog, click **Continue**.

**2. Choose a Supabase project**

The **Connect project** step lists the Supabase projects in your linked organizations. Click **Connect** next to the project you want to use.

Don't have a Supabase project yet? Click **Create Project** to open the Supabase dashboard, create one there, and then return to Lovable to connect it.

> [!NOTE]
>
> In this list and in the dashboard's **Databases** picker, a warning icon next to a Supabase project means another Lovable project already uses it. Lovable projects that share one Supabase project overwrite each other's secrets, including `LOVABLE_API_KEY`, so any feature that uses that key stops working. You can still connect if the sharing is intentional. The **Supabase** view of a connected project shows the same warning.

**3. Verify the connection**

After connecting, **More → Supabase** shows your Supabase project's name and status, with quick links to the Supabase dashboard. You can now prompt Lovable to build backend features.

> [!NOTE]
>
> If the connect link shows **Wait for Lovable to finish working**, Lovable is still processing a request in this project. Wait for it to finish, then try again.

### Let Lovable create a Supabase project

Lovable can create the Supabase project for you, in your own Supabase organization. Supabase bills the new project to that organization, not to Lovable. This works when all of these are true:

* The [built-in backend is disabled for your workspace](https://docs.lovable.dev/features/cloud#enabling-the-built-in-backend). When it is available, Lovable enables that instead.
* Your workspace has a [linked Supabase organization](#link-your-supabase-organization-workspace-owners-and-admins).
* Your Lovable project has no backend yet.

Workspace admins and owners can do this. In the project chat, ask Lovable in [Build mode](https://docs.lovable.dev/features/agent-mode.md) to add a backend. Lovable asks you to approve the request before it creates anything.

On the approval card, choose the Supabase organization and the region closest to your users. A project's region cannot be changed after Lovable creates it. When your workspace has a [required default data hosting region](https://docs.lovable.dev/features/cloud#workspace-level-default-data-hosting-region), Lovable uses that region and does not ask.

Click **Create project**. Creating the project can take several minutes. When it succeeds, Lovable connects the new project to your app and continues building.

> [!WARNING]
>
> Lovable never deletes a Supabase project it created, including when the attempt fails partway through. After a failed attempt, open your Supabase organization and either [connect the new project to your app](#connect-your-lovable-project-to-a-supabase-project) or delete it there. Asking Lovable again does not create a second project for that app.

## How Lovable works with your Supabase project

With Supabase connected, Lovable manages your backend from the project chat. You don't need to write SQL or copy code into the Supabase dashboard.

### Database

Supabase provides a hosted PostgreSQL database, so your app keeps the full power and scalability of SQL without you managing servers. Whenever a feature needs to store data, describe it in plain language and Lovable designs the tables, columns, and relationships for you:

```text wrap theme={null}
Add a feedback form where users can leave a message and a 1 to 5 rating, and store the responses in the database.
```

Schema changes run as reviewed migrations: Lovable writes the SQL, shows it to you, and asks for your approval in the project chat before running it. After you approve, Lovable executes the migration on your Supabase project, saves the migration file in your project's code (under `supabase/migrations/`), and regenerates the TypeScript types your app uses. Lovable also asks for your approval before inserting or changing data. Reading data for debugging (for example, checking why a page is empty) does not modify anything.

You can always work with your data directly in the Supabase dashboard as well: the **Table Editor** shows rows in a spreadsheet-like view where you can inspect and edit records, and the **SQL Editor** lets you run your own queries.

**Real-time updates**: Supabase can stream database changes to your app, which enables features like live chat, notifications, or dashboards that update for all users without refreshing. Prompt Lovable to make a feature update in real time and it wires up the subscription:

```text wrap theme={null}
Make the chat update in real time so new messages appear without refreshing.
```

### Authentication

Prompt Lovable to add signup and login flows backed by Supabase Auth:

```text wrap theme={null}
Add email and password login, and require users to be signed in to access the dashboard.
```

Lovable wires the pages to your Supabase project, so users who register through your app appear under **Authentication** in the Supabase dashboard, where you can also add test users manually.

Authentication settings themselves live in your Supabase project, not in Lovable. To offer social logins (such as Google or GitHub), enable the provider in your Supabase dashboard's **Authentication** settings and supply the OAuth credentials the provider requires. Then prompt Lovable to add the matching sign-in button and flow to your app:

```text wrap theme={null}
Add a "Sign in with Google" button to the login page.
```

> [!TIP]
>
> While testing, turn off email confirmation in your Supabase dashboard's **Authentication** settings so test accounts can sign in immediately. Re-enable it before launching to real users.

### Edge functions

Supabase Edge Functions are serverless functions: small pieces of backend code that run on Supabase's infrastructure, without you provisioning or managing a server. They're the right tool whenever your app needs logic that can't or shouldn't run in the user's browser. Typical uses:

* **AI features**: calling a model API to summarize, classify, or chat.
* **Sending emails or notifications**: for example, a welcome email on signup via an email API like Resend.
* **Processing payments**: creating checkout sessions and handling webhooks with Stripe.
* **Scheduled tasks**: recurring jobs like a nightly cleanup or a daily summary.
* **Calling external APIs with secret keys**: anything that uses credentials you can't expose in frontend code.

You don't write these functions yourself. Describe the behavior in the project chat, and Lovable writes the function, deploys it to your Supabase project, and updates your app to call it:

```text wrap theme={null}
When a user submits the contact form, send me an email notification with the message contents using Resend.
```

When a function fails, Lovable reads its logs and surfaces the error in the project chat to help you fix it. You can also monitor your functions yourself in the Supabase dashboard under **Edge Functions**, where each function has its own logs.

### Secrets

Many backend features depend on secret API keys, such as a Stripe secret key for payments or a Resend key for email. When a feature needs one, Lovable detects it and prompts you to enter the value through a secure input. Secrets are stored in your Supabase project, where your edge functions can read them; they never appear in your app's code or repository, and Lovable does not read stored secret values back.

```text wrap theme={null}
Add a checkout button that processes payments with Stripe.
```

For example, when Lovable deploys a payment function, the function reads your Stripe secret key from Supabase's secret store to authenticate with Stripe. You can manage stored secrets in the Supabase dashboard under your project's **Edge Functions** settings.

### Storage

Supabase Storage hosts files (images, videos, PDFs, and other media) alongside your database, organized into buckets with their own access permissions. Ask for a file upload feature and Lovable builds the upload logic and creates the buckets, asking for your approval before creating or changing buckets on your Supabase project:

```text wrap theme={null}
Let users upload a profile picture on the account settings page and show it in the header.
```

Uploaded files are stored in a bucket in your Supabase project, and Lovable handles retrieving the file URLs to display them in your app. You can browse files and manage bucket permissions in the Supabase dashboard under **Storage**. Upload size limits follow your Supabase plan (on Supabase's free tier, individual files are limited to 50 MB); see [Supabase pricing](https://supabase.com/pricing) for current limits.

### Security checks

Lovable runs automated security checks against your database configuration, including Row Level Security (RLS) coverage, and flags issues it finds after schema changes.

> [!WARNING]
>
> **Before going live**, make sure every table has Row Level Security policies that restrict who can read and write each row. Ask Lovable to review your policies (for example, "Make sure users can only see and edit their own data"), and verify them yourself in the Supabase dashboard. Missing RLS policies are the most common way app data gets exposed.

## Managing the connection

The connection has two levels, managed in different places: the **project connection** (which Supabase project a Lovable project uses) and the workspace's **linked organizations** (which Supabase organizations the whole workspace can use).

### Manage the project connection

In the editor, open **More → Supabase** on a connected project. From there you can:

* See the connected project's name and health status.
* Jump to the Supabase dashboard: the project overview, user management, SQL editor, edge functions, and secrets.
* Disconnect the project.

Your backend lives in Supabase, so day-to-day management of data, users, and files happens in the Supabase dashboard.

### Manage linked organizations (workspace owners and admins)

Open [**Connectors**](https://docs.lovable.dev/integrations/introduction) from the dashboard sidebar, select **Supabase**, and use **Manage Connected Organizations** to link additional Supabase organizations or reconnect one whose access has expired. The **Manage organizations** button in a connected project's **Supabase** view opens the same place.

### Disconnect Supabase

**1. Open the Supabase view**

In the editor, open **More → Supabase**. The view shows your connected Supabase project.

**2. Disconnect**

Click **Disconnect**, then confirm in the **Disconnect Supabase** dialog.

Disconnecting stops Lovable from deploying edge functions and reading your database schema, but it does not change your code and does not delete anything in your Supabase project. You can reconnect to the same or a different Supabase project later.

## Limitations

* Each Lovable project connects to one Supabase project at a time.
* There is no automatic migration between the built-in backend and your own Supabase project, in either direction.
* Supabase usage limits (database size, file upload size, bandwidth) follow your Supabase plan. Check [Supabase pricing](https://supabase.com/pricing) for current limits.

### Lovable features that require the built-in backend

Some Lovable features are built for the [built-in backend](https://docs.lovable.dev/features/cloud) and don't apply when you bring your own Supabase project:

* **In-editor backend views**: the Database, Users, Storage, Secrets, Jobs, Usage, and Logs views in the **More** panel. With your own Supabase project, you use the Supabase dashboard instead.
* **Managed infrastructure**: daily backups with restore, pausing, and instance resizing from inside Lovable. You manage backups, compute, and billing in Supabase.
* [**Built-in payments**](https://docs.lovable.dev/features/payments.md) on older React + Vite apps: on these apps, Paddle and Stripe payments through Lovable require the built-in backend for webhooks and subscription data. Newer apps on [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) (created from May 13, 2026, or June 22, 2026 on Enterprise plans) can use built-in payments with your own Supabase project. See the [payments requirements](https://docs.lovable.dev/features/payments.md#requirements).
* [**Custom emails**](https://docs.lovable.dev/features/custom-emails.md): app emails from your own domain work with your own Supabase project. Authentication emails from your own domain need the built-in backend, because Lovable sends them through Lovable Auth.
* **Configuring auth through Lovable**: enabling social login providers and changing auth settings from the project chat, including [managed Google authentication](https://docs.lovable.dev/features/google-auth.md) and [SAML SSO for your app's users](https://docs.lovable.dev/features/saml-sso.md), works on the built-in backend only. On your own Supabase project, configure these in the Supabase dashboard.
* [**Signed-in browser testing**](https://docs.lovable.dev/features/browser-testing.md#test-pages-behind-a-login): Lovable can test your app as a signed-in user on the built-in backend only. With your own Supabase project, it tests pages that don't require signing in.
* [**Sensitive data scanning**](https://docs.lovable.dev/features/sensitive-data-scanning.md): PII detection covers built-in databases and storage.

## Troubleshooting

> **The Supabase view shows 'Supabase connection issue'**
>
> Lovable can't find the connected Supabase project. The linked project may have been deleted in the Supabase dashboard, or your workspace's access to the Supabase organization may have changed.
>
> Click **Disconnect** to clear the broken link, or **Manage organizations** to reconnect the organization and pick a project again.

> **I can't click Connect next to my Supabase project**
>
> Projects that aren't ready in Supabase (for example, paused or still provisioning) can't be connected, and Lovable shows **Check project status in Supabase**. Open the Supabase dashboard, make sure the project is active, then try again.

> **The Add Organization button is disabled**
>
> Linking a Supabase organization requires workspace admin permissions. Ask a workspace owner or admin to link the organization; after that, anyone with edit access to a project can connect it.

> **The connect link is disabled with 'Wait for Lovable to finish working'**
>
> Lovable is still processing a chat request or another operation in this project. Wait for it to finish, then start the connection again.

## FAQ

> **Do I need to connect Supabase to give my app a backend?**
>
> No. The [built-in backend](https://docs.lovable.dev/features/cloud) is the default and covers database, authentication, storage, edge functions, and AI features without a separate account. Connect your own Supabase project only if you want to own and manage the backend yourself.

> **Do I need a separate Supabase account, and who bills me?**
>
> Yes. Supabase is a separate platform with its own account and billing. Lovable credits cover the building work Lovable does; everything your backend consumes (database, storage, bandwidth) is billed by Supabase under your Supabase plan. Both platforms have free tiers, so you can start without paying.

> **Who in my workspace can connect Supabase?**
>
> Workspace owners and admins link Supabase organizations to the workspace. After an organization is linked, anyone with edit access to a project can connect it to a Supabase project from that organization, without needing their own Supabase account. Viewers can't connect projects.

> **Do I still need to paste SQL into the Supabase SQL editor?**
>
> No. This was how the integration used to work, but Lovable now runs database migrations for you. It shows you the change, asks for approval in the project chat, executes the migration on your Supabase project, and keeps migration files and generated types in your project's code.

> **Can I switch a project between the built-in backend and my own Supabase?**
>
> There is no automatic migration in either direction. If you need to move, you'll recreate the schema and move data manually: export your data from the current backend, connect the new one, and ask Lovable to rebuild the schema. For exporting your data, see [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database).

> **Can multiple Lovable projects share one Supabase project?**
>
> Yes. Each Lovable project connects to one Supabase project, and several Lovable projects can connect to the same Supabase project (for example, a customer app and an admin dashboard sharing one database). Lovable warns you when you pick a Supabase project that another Lovable project already uses, and the **Supabase** view of a connected project shows the same warning. Lovable projects that share one Supabase project read and write the same data and overwrite each other's secrets, including `LOVABLE_API_KEY`, so any feature that uses that key stops working. Design your schema and RLS policies with the shared data in mind.

> **Can I connect my app to automation tools like Zapier or Make?**
>
> Yes. Ask Lovable to create an edge function that acts as a custom API endpoint or webhook for the external service; this works the same way on the built-in backend. With your own Supabase project, you additionally get direct access to Supabase's auto-generated REST API and client libraries, so external tools can also read and write your data without going through an endpoint you build.

> **What happens when I disconnect Supabase?**
>
> Lovable stops deploying edge functions and reading your database schema. Your code is not changed, and nothing is deleted from your Supabase project. You can reconnect later.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Built-in backend](https://docs.lovable.dev/features/cloud.md)
- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [Database](https://docs.lovable.dev/features/database.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
