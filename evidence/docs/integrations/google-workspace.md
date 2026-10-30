# Connect your app to Google Workspace
<!-- source: https://docs.lovable.dev/integrations/google-workspace.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Google Workspace

> Connect your app to Google Workspace to read and send email, manage calendars, store and create files, and use Google tools like Sheets, Docs, and Slides as part of your app's workflows.

[Google Workspace](https://workspace.google.com/) includes services like Gmail, Google Sheets, Google Calendar, Google Drive, Google Docs, and Google Slides. The Google Workspace connectors enable your Lovable app to securely access and manage data from these services using your Google account.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Google Workspace connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Google Workspace account and work with their own data |

Already know what you want to build? Jump straight to [How to connect a Google Workspace service](#how-to-connect-a-google-workspace-service) to set up your first connection.

With Google Workspace, your app can:

* Send and read emails with **Gmail**
* Read and update spreadsheet data in **Google Sheets**
* Create and manage **Google Calendar** events
* Upload, organize, and retrieve files from **Google Drive**
* Generate and edit documents in **Google Docs**
* Create and update presentations in **Google Slides**

Each connection is authorized for a single Google account. You can create multiple connections to work with multiple accounts or environments.

> [!TIP]
>
> Building an app that embeds an editable Google Doc, Sheet, or Slides deck? See [Edit Google Docs, Sheets, and Slides in Lovable](https://docs.lovable.dev/tips-tricks/google-workspace-editing.md) for the recommended iframe URLs and copyable instructions.

## Common use cases and example apps

These examples show both single-service apps and multi-service workflows. You can combine Google connectors within the same project to build more advanced automation and internal tools.

| Example app | Example prompt | Description |
| - | - | - |
| Sheets-powered CRM | *Build a simple CRM that reads contacts from this Google Sheet and lets me add and edit rows.* | **Manage structured customer data using Google Sheets as a backend.** The app reads contact records from a spreadsheet, displays them in a clean interface, and writes updates back automatically. |
| Team booking page | *Build a booking page that checks our Google Calendar availability and creates events when someone books.* | **Let users schedule time based on real calendar availability.** The app checks free/busy data, shows open time slots, and creates calendar events when a booking is confirmed. |
| Transactional email sender | *When a user submits this form, send them a confirmation email through Gmail.* | **Send automated emails directly from your app.** The app formats submission details and sends confirmation or notification emails through the connected Gmail account. |
| Drive-based file hub | *Build an internal tool that lists our Drive folders and lets me upload and organize files.* | **Create a structured file management experience on top of Google Drive.** The app lists folders and files, supports uploads, and keeps documents organized without leaving the interface. |
| Proposal generator | *Generate a Google Doc proposal from this form and save it to a specific Drive folder.* | **Automate document creation from structured input.** The app generates a formatted Google Doc using form data and saves it to the appropriate Drive folder for sharing or review. |
| Slide deck builder | *Turn this project brief into a Google Slides presentation with a title slide and bullet points.* | **Turn structured content into a starter slide deck.** The app generates a basic Google Slides deck from your content as a starting point for further editing and styling. |
| Expense tracker with receipts | *Build an expense tracker where receipts are uploaded to Drive and logged in a Google Sheet.* | **Combine file storage and structured tracking in one workflow.** The app uploads receipt files to Drive and logs expense details in Sheets, linking each file to its corresponding record. |
| CRM with email history | *Show contacts from my Google Sheet and display the latest emails exchanged with them from Gmail.* | **Enrich contact records with real communication history.** The app pulls related Gmail conversations and displays them alongside structured CRM data. |
| Weekly report automation | *Every Monday, read last week's metrics from Google Sheets and email a summary via Gmail.* | **Deliver recurring reports automatically.** The app reads data from Sheets, generates a summary, and emails it to stakeholders on a schedule. |
| Meeting notes automation | *After a Google Calendar event ends, generate meeting notes and save them as a Google Doc in Drive.* | **Turn meetings into structured documentation.** The app reads calendar event details, generates organized notes, and saves them as a Google Doc in Drive. |
| Client onboarding workflow | *When a new client is added to my Google Sheet, generate a proposal Doc and kickoff Slides deck and save both to Drive.* | **Automate multi-step onboarding workflows.** The app uses structured client data to generate documents and presentations, storing them in Drive for immediate use. |

## How Google Workspace connections work

Google Workspace connections are workspace-level integrations managed by workspace admins or owners. Admins and owners control which services the workspace connects and which permissions (scopes) each connection uses. This connector uses a single shared Google account for everyone who uses the app. If you need each end user to sign in with **their own** Google account and act on their own data, use an **[app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md)** instead.

All Google Workspace connectors use OAuth 2.0 to securely connect to your Google account. When you create a connection, you sign in with Google and authorize Lovable to access specific services on your behalf.

Within your Lovable workspace:

* You can create multiple connections per Google service.
* Each connection is a separate OAuth authorization tied to a Google account.
* Each connection can use different scopes (permissions), so you can control exactly what the connection can access.
* Multiple projects within a single workspace can use the same connection.

This makes it easy to separate environments (for example, development and production) or connect different Google accounts for different purposes.

Google Workspace connectors use Lovable's gateway architecture for secure OAuth handling and automatic token refresh. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!WARNING]
>
> **Connections are tied to a specific Google account**
>
> Each Google Workspace connection is authorized using the Google account that signs in during setup.
>
> For example:
>
> * If you connect Gmail using `employee@company.com`, emails sent through that connection will be sent from `employee@company.com`.
> * If you connect Google Calendar with your account, events will be created on your calendar.
> * Files created in Drive, Docs, or Slides will be owned by the connected account.
>
> Although the connection is available across the workspace, it always operates on the data of the Google account that authorized it.
>
> If your team needs to use a shared mailbox, shared calendar, or dedicated service account, make sure you authenticate using the appropriate Google account when creating the connection.

### Working with shared drives

Google Drive stores files in two locations: **My Drive** (files owned by an individual account) and **shared drives** (files owned by the organization). The Google Drive connector can work with both, subject to the connected account's access.

To use a shared drive with the Google Drive, Docs, Sheets, or Slides connector:

* **Connect with an account that is a member of the shared drive.** The connection can only access shared drives the authorized Google account has been added to. To work with a different shared drive later, add the same Google account as a member of that shared drive too.
* **Give that account the role it needs.** Reading files requires at least **Viewer**. Uploading, editing, or creating files requires **Contributor** or higher. Moving or deleting files requires **Content manager** or **Manager**. Members with the **Manager** role assign these roles in the shared drive's **Manage members** dialog.
* **Point Lovable at the shared drive in your prompts.** Paste the shared drive folder or file URL (or its ID) and mention that it lives in a shared drive, so Lovable builds the feature with shared-drive-aware requests. Files your app creates in a shared drive are owned by the shared drive, not by the connected account, so they stay accessible if that account later leaves the shared drive.

If a request against a shared drive fails with a permission error, confirm the connected Google account is still a member of that shared drive with the required role. Membership and role changes take effect on the next request. If it still fails, open the connection and click **Reconnect** to refresh its access.

## How to connect a Google Workspace service

Workspace **admins** and **owners** can connect Google Workspace services.

When a connection is created, it becomes available across all projects in the workspace.

### Prerequisites

* A Google account with access to the service you want to connect
* Lovable workspace admin or owner role

### Set up your Google connection

**1. Navigate to the desired Google connector**

Go to **Connectors** and select the Google service you want to connect (for example, **Google Sheets**).

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Google Sheets - Production`).

**4. Configure scopes (optional)**

Expand **Advanced settings** to view and configure scopes, the Google API permissions your app needs. Default scopes are pre-selected for common use cases.

> [!TIP]
>
> Select only the scopes your app needs. You can update scopes later by editing the connection and clicking **Reconnect**. For full scope documentation, see the [scope reference for each Google service](https://developers.google.com/workspace/products).

**5. Connect to Google and authorize the connection**

* Click **Connect** at the bottom of the form. The Google sign-in window opens, so make sure your browser doesn't block pop-ups.
* Sign in with the Google account you want to use, review the requested permissions, and click **Allow**. You'll be redirected back to Lovable with a confirmation.

When connected, your Lovable apps can start using the selected Google service.

## Connecting multiple Google services

If your app needs to use several Google services (for example, reading data from Sheets and sending results via Gmail), you can create a separate connection for each service.

Each connector has its own OAuth flow and scopes, so they are configured independently.

You can:

* Connect multiple services to the same Google account
* Use different Google accounts for different services
* Create separate connections for development and production

## Manage your Google service connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google service**, then open the connection.

* **Unlink projects** to remove Google service access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google service stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Connect your app to Google Search Console (GSC)](https://docs.lovable.dev/integrations/google-search-console.md)
- [Connect your app to Gemini Enterprise](https://docs.lovable.dev/integrations/gemini-enterprise.md)
