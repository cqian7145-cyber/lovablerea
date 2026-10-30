# Connect your app to KLIPY
<!-- source: https://docs.lovable.dev/integrations/klipy.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to KLIPY

> Connect your app to KLIPY to search and embed GIFs, stickers, and clips, and generate AI emojis.

[KLIPY](https://klipy.com/) is a media API that lets your Lovable app search and embed GIFs, stickers, and short clips, and generate AI emojis on demand. It's a drop-in media layer for chat, social, and commenting features.

KLIPY is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With KLIPY, your app can:

* Search and embed GIFs, stickers, and short clips
* Generate AI emojis on demand
* Add a trending media picker to chat and social features

> [!TIP]
>
> Reach for the KLIPY connector when your app needs a media picker, reaction stickers, or generated emojis. For a handful of static images you ship yourself, keep them in your app's assets instead.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Chat with GIF picker** | *Use KLIPY and add a GIF picker to my chat app so users can search and send GIFs inline.* | **Let users react and reply with GIFs.** The app adds a searchable GIF picker to the message composer and embeds the selected GIF in the conversation. |
| **Sticker reactions** | *Use KLIPY and let users react to posts with stickers from a searchable picker.* | **Add expressive sticker reactions.** The app surfaces a sticker search and attaches the chosen sticker as a reaction. |
| **Meme / clip feed** | *Use KLIPY and build a trending feed of GIFs and clips users can browse and share.* | **Surface trending media in a feed.** The app pulls trending GIFs and clips and renders a browsable, shareable feed. |
| **Custom emojis tool** | *Use KLIPY and build a tool that generates custom AI emojis from a text prompt.* | **Generate custom emojis on demand.** The app sends a prompt to KLIPY and renders the generated AI emojis for the user to download or send. |
| **Social composer** | *Use KLIPY and add GIFs, stickers, and emojis to my social post composer.* | **Enrich a post composer with media.** The app lets users search GIFs, stickers, and emojis so they can drop media into posts. |

## How to connect KLIPY

Who can create KLIPY connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients). When adding a connection, you can choose between:

* **Managed by Lovable** (no KLIPY account or API key required)
* **Use your own credentials** (connect with your own KLIPY API key)

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

Follow the setup steps below based on how you want to connect KLIPY.

**Managed by Lovable**

Choose this option if you want the fastest setup. You don't need to create a KLIPY account or API key. Lovable provides and manages the credentials for you.

> [!NOTE]
>
> You can create only one managed KLIPY connection per workspace.

**1. Open KLIPY in Connectors**

Go to **Connectors** and select **KLIPY**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `KLIPY Prod`).

**4. Choose Managed by Lovable**

Under **Authentication**, select **Managed by Lovable**.

**5. Choose who can use this connection**

Managed connections are shared with the entire workspace by default. To limit who can use the connection, click **Restrict to specific people** under **Sharing**.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form.

**Use your own credentials**

Use your own credentials if you want to manage your KLIPY account, content, usage limits, and account settings directly in the KLIPY partner dashboard.

> [!NOTE]
>
> All media requests made through this connector count toward your KLIPY account's limits. Billing and quotas are handled directly by KLIPY, not Lovable.

You can create multiple KLIPY connections using different API keys, which is useful for separating environments (for example, development and production) or managing rate limits.

### Prerequisites

Before connecting KLIPY, make sure you have:

* A KLIPY account and API key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Step 1: Get your KLIPY API key

**1. Open the KLIPY partner dashboard**

Sign in to the [KLIPY partner dashboard](https://partner.klipy.com).

**2. Create or copy your API key**

Generate an API key for your app, or copy an existing one. With your own key you manage your KLIPY account, content, and usage limits directly.

> [!NOTE]
>
> Your KLIPY API key functions like a password. Keep it secure and never share it publicly. You'll need it in the next step.

### Step 2: Connect KLIPY to Lovable

**1. Open KLIPY in Connectors**

Go to **Connectors** and select **KLIPY**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `KLIPY Prod`).

**4. Choose your own credentials**

Under **Authentication**, select **Use your own credentials**.

**5. Enter your API key**

In **API key**, paste your KLIPY API key. Use **Open KLIPY** below the field to jump to the partner dashboard if you need to generate one.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the key against KLIPY before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to KLIPY (based on configured connection-level access). Your Lovable apps can then search and embed media and generate AI emojis through the connector.

## Limitations

The KLIPY connector cannot:

* Refresh or rotate API keys automatically. For connections that use your own credentials, generate a new key in the KLIPY partner dashboard and update the Lovable connection to rotate
* Support per-end-user KLIPY login. Each connection represents a single KLIPY key shared across all projects linked to it
* Manage your KLIPY account, content settings, or usage limits for connections that use your own credentials. Configure those in the KLIPY partner dashboard

## Manage your KLIPY connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **KLIPY**, then open the connection.

* **Unlink projects** to remove KLIPY access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use KLIPY stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
