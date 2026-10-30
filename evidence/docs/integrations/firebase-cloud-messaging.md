# Connect your app to Firebase Cloud Messaging
<!-- source: https://docs.lovable.dev/integrations/firebase-cloud-messaging.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Firebase Cloud Messaging

> Connect your app to Firebase Cloud Messaging to send push notifications to devices and topics from your Lovable app.

[Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) (FCM) is Google's service for sending push notifications to Android, iOS, and web clients. The Firebase Cloud Messaging connector lets your Lovable app send those notifications through your own Firebase project. It is designed for apps that need to reach people outside the browser tab: order updates, announcements, and reminders.

Firebase Cloud Messaging is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With Firebase Cloud Messaging, your app can:

* Send a notification to one device using a registration token
* Broadcast to a topic that devices have already subscribed to
* Include a small data payload with each message (string values only)
* Optionally configure browser push so people using your web app can opt in and receive notifications

It is a good fit for order tracking, ops alerts, and any workflow where the app already stores device tokens or uses FCM topics. The connector sends messages. It does not register devices or report whether a notification was opened.

## Common use cases and example apps

These examples show what you can build with Firebase Cloud Messaging, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Order shipped alerts | *Use Firebase Cloud Messaging and build an order tracker that sends a push when an order ships.* | **Notify a customer on their phone or browser as soon as an order leaves the warehouse.** The app stores each user's device token, then sends a targeted message when shipping status changes. |
| Topic announcements | *Use Firebase Cloud Messaging and build an admin page that broadcasts an announcement to the news topic.* | **Reach every subscribed device with one send.** The app posts to an FCM topic so you do not have to look up individual tokens for a broadcast. |
| Browser order opt-in | *Use Firebase Cloud Messaging and build a signed-in flow where shoppers opt in to browser push for order updates.* | **Let people on the web turn on notifications from a button, then send updates from the server.** The app registers the browser, stores the token, and sends later order events through the connector. |
| Appointment reminders | *Use Firebase Cloud Messaging and build a booking app that pushes a reminder the day before an appointment.* | **Reduce no-shows with a timed notification.** The app looks up the stored token for that booking and sends a reminder at the scheduled time. |
| Incident paging | *Use Firebase Cloud Messaging and build an internal tool that pushes a critical alert to on-call staff.* | **Reach operators even when they are not looking at the dashboard.** The app sends a high-priority notification to the on-call device tokens when an incident is created. |
| Silent data sync | *Use Firebase Cloud Messaging and build an app that sends a data-only message so the client can refresh an order screen.* | **Wake the client without a visible banner.** The app sends a data payload the client handles in the background, then refreshes local state. |

## How to connect Firebase Cloud Messaging

Who can create Firebase Cloud Messaging connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Firebase Cloud Messaging connections using different Firebase projects, which is useful for separating development and production.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Firebase Cloud Messaging, make sure you have:

* A [Firebase](https://console.firebase.google.com/) project
* A Google Cloud service account in that project with the **Firebase Cloud Messaging API Admin** role
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))
* If you want browser push: a Firebase **web** app in the same project, plus a Web Push certificate (VAPID key)

> [!NOTE]
>
> Sends through this connector use your Firebase and Google Cloud project. Quotas and any Google Cloud billing are handled by Google, not Lovable.

### Step 1: Get a Firebase service account key

Your Lovable app never sees this JSON. Lovable stores it on the connection and exchanges it for a short-lived Google token when sending.

To generate a service account key:

**1. Open your Firebase project**

Sign in to the [Firebase console](https://console.firebase.google.com/) and open the project you want Lovable to send from.

**2. Open service accounts**

Go to **Project settings → Service accounts**. You can also open [Generate service account key](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) and pick the project when Firebase asks.

**3. Generate a private key**

Click **Generate new private key** and confirm. Firebase downloads a JSON file. Use a key from a service account that has the **Firebase Cloud Messaging API Admin** role.

**4. Store the file securely**

Keep the JSON file private. You upload it in the next step. Do not paste it into the project chat, commit it to git, or put it in frontend code.

> [!WARNING]
>
> The service account JSON functions like a password. Anyone with the file can send as your Firebase project. Rotate it in Google Cloud and update the Lovable connection if it leaks.

See Google's documentation for more: [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) and [service accounts](https://firebase.google.com/docs/admin/setup#initialize-sdk).

### Step 2: Connect Firebase Cloud Messaging to Lovable

You can create multiple connections using different Firebase projects.

**1. Open Firebase Cloud Messaging in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Firebase Cloud Messaging**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

Fill in the connection form:

1. **Display name**: name the connection, for example `FCM Prod`.
2. **Service Account JSON**: upload the JSON key you downloaded from Firebase.
3. **Client setup**: choose **Server or native only** (default) if you only send to tokens you already have, including Android and iOS. Choose **Include web push** if the app also registers browsers for notifications.

**4. Add web push fields if you selected Include web push**

These fields appear only when **Client setup** is **Include web push**. All three are required in that mode. Lovable derives the Firebase project ID from the service account, so you do not enter it.

1. **Firebase API key**: the `apiKey` value from your Firebase web app config (starts with `AIza`). In Firebase, open **Project settings → General → Your apps**, select the web app, and copy it from the SDK snippet.
2. **Firebase App ID**: the `appId` value from the same snippet (format `1:<numbers>:web:<hex>`).
3. **Web Push VAPID key**: the public Web Push certificate. In Firebase, open **Project settings → Cloud Messaging → Web Push certificates**, or use [View Web Push certificates](https://console.firebase.google.com/project/_/settings/cloudmessaging). Copy the key pair's public key.

Skip this step if you chose **Server or native only**.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the service account against Firebase Cloud Messaging before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Firebase Cloud Messaging (based on configured connection-level access). Your Lovable apps can then send notifications through your Firebase project.

## Sending notifications from your app

Server code sends through Lovable's connector gateway, not `fcm.googleapis.com` directly. Ask Lovable in the project chat to wire sends after the connection is linked to the project.

Each message targets exactly one of:

* A **device token** collected by the Firebase client SDK in your app and stored by you
* A **topic** name that devices already subscribed to
* An FCM **condition** expression

A token that returns `UNREGISTERED` (or some `INVALID_ARGUMENT` errors) is stale. Delete it from your database instead of retrying it.

The connector does not collect tokens. Android, iOS, and web clients obtain them with the Firebase SDK, then your app stores them for later sends.

## Browser push

Select **Include web push** when you want people who are signed in to opt in from the browser. Lovable syncs the public web values onto the linked project so generated client code can initialize Firebase Messaging. You still need a click (for example a button) before the browser shows a permission prompt.

The Lovable preview runs your app in an iframe. Browsers block the notification permission prompt there. Open the preview in its own tab, or test on the published app.

If you connected with **Server or native only** and later need browser registration, update the connection and switch **Client setup** to **Include web push**, then fill in the web fields.

## Limitations

The Firebase Cloud Messaging connector cannot:

* Register devices or obtain FCM tokens. Your app's Firebase client SDK does that, and your backend stores the tokens.
* Read delivery analytics, open rates, or per-user reach. Those live in the Firebase console (and its BigQuery export, if you enable it).
* Connect Firebase Authentication, Realtime Database, Cloud Storage, or Analytics. This connector is for Cloud Messaging only.
* Receive FCM webhooks or inbound events.
* Support per-end-user Firebase login. Each connection represents a single Firebase project shared across all projects linked to it.

If the service account is disabled or the key is revoked in Google Cloud, update the Lovable connection with a new key before sends can succeed again.

## Troubleshooting

Use these checks when connect fails or browser push never prompts.

> **Connect fails when I upload the JSON key**
>
> Confirm the file is a **service account** key (`"type": "service_account"`), not an OAuth client file, and that it includes `project_id`. The account needs the **Firebase Cloud Messaging API Admin** role on the Firebase project. Generate a new key from **Project settings → Service accounts** if you are unsure.

> **The browser never shows a notification permission prompt**
>
> Test in a top-level tab, not the in-editor preview iframe. Ask Lovable to detect that iframe case and show copy that tells the user to open the app in a new tab.

> **Browser registration says the connection is not configured for web push**
>
> Edit the connection, set **Client setup** to **Include web push**, and fill in **Firebase API key**, **Firebase App ID**, and **Web Push VAPID key**. Then link the connection to the project again if needed.

## Manage your Firebase Cloud Messaging connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Firebase Cloud Messaging**, then open the connection.

* **Unlink projects** to remove Firebase Cloud Messaging access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Firebase Cloud Messaging stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Qlik Cloud](https://docs.lovable.dev/integrations/qlik-cloud.md)
- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to Twilio](https://docs.lovable.dev/integrations/twilio.md)
