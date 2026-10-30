# Lovable mobile app
<!-- source: https://docs.lovable.dev/integrations/lovable-mobile-app.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable mobile app

> Use the Lovable app for iOS and Android to build projects, chat with Lovable, and review your work from your phone or tablet.

Lovable is available as a native app on iOS and Android, so you can keep building when you're away from your computer.

> [!NOTE]
>
> This page is about the Lovable app you use to build projects from your phone or tablet. If you want to turn a project you built into an app that people install on their phones, see [Can I publish my project as a native iOS or Android app to the App Store or Play Store?](https://docs.lovable.dev/features/publish.md#can-i-publish-my-project-as-a-native-ios-or-android-app-to-the-app-store-or-play-store) in the publishing FAQ.

> [!TIP]
>
> Lovable on mobile shares the same account, projects, and credits as the web app. Log in once and pick up where you left off on any device.

## Overview

The mobile app gives you access to your Lovable projects from your phone or tablet. You can start something new, continue an existing project in its [project chat](https://docs.lovable.dev/features/projects/chat.md), [chat with Lovable](https://docs.lovable.dev/features/chats.md) outside a project, prompt with voice or images, and get notified when a build is ready to review.

It's designed to complement the desktop experience, not replace it. Most of what you do on the web is available on mobile, with a few exceptions listed below. Heavy editing, complex integrations, and detailed reviews are still better on a larger screen.

## Download

> **[App Store](https://apps.apple.com/us/app/lovable-build-apps-with-ai/id6757471107)**
>
> iPhone and iPad. iOS 15 or later

> **[Google Play](https://play.google.com/store/apps/details?id=dev.lovable.build)**
>
> Phones and tablets. Android 9 or later

You can also find both apps in [**Account settings → Devices & apps**](https://lovable.dev/settings/apps), next to the desktop app downloads. The **On your phone** section shows a QR code for each app: scan it with your phone to open the app's store listing, or use the store buttons. On a narrow browser window, only the store buttons show.

## What's different on mobile

The mobile app uses a layout designed for one-handed use on smaller screens:

* **Swipe between the project chat and the preview.** Inside a project, swipe left or right to switch between the project chat and the live preview. On desktop they sit side by side. See [the editor layout](https://docs.lovable.dev/features/projects/editor.md#the-two-main-areas).
* **Navigation gestures.** Swipe from the edge of the screen to go back. On Android, the hardware back button works too.
* **Voice and photo input.** Tap the mic to dictate prompts (with a live waveform while you speak), or use the camera to attach a photo directly to a message. You'll be asked for permission the first time.
* **Native login.** Google and Apple login use the system dialogs rather than redirecting through a browser.
* **Push notifications.** Opt in from your device settings to be notified when a build is ready or needs your input. Tapping a notification opens the relevant screen.
* **Drafts on your phone.** Tap your project's name and select **Drafts**, or tap the button above the project chat's input, to open the drafts list. You can switch between drafts, create one, and rename, update, accept, or delete a draft. See [Explore changes with drafts](https://docs.lovable.dev/features/drafts.md#work-with-drafts-on-your-phone).
* **AI terms (iOS).** The first time you open the iOS app, you'll be asked to accept the AI terms and conditions. This is required by the App Store.
* **Auto-updates.** The app prompts you when a new version is available. Some updates are required to keep things working.

> [!NOTE]
>
> Detailed code review, the preview toolbar, and inline comments on the preview need a wider screen and are still best on desktop.

## Buying credits and upgrading plans on mobile

> [!NOTE]
>
> **Billing works differently on iOS and Android**
>
> On **iOS**, purchases made inside the app go through the App Store using Apple's in-app purchases: workspaces on the Free plan can buy a plan, and workspaces on Pro and Business plans can buy credit top-ups, even when the plan itself was bought on the web. Web payment surfaces (upgrade buttons, pricing pages, billing settings) are replaced by the native flow, and Apple handles receipts and refunds for App Store purchases. Plans purchased in the iOS app cover one month at a time and do not renew automatically. You can always buy credits or manage your plan on **lovable.dev** in your browser instead.
>
> On **Android**, in-app purchases aren't available yet. To top up credits or change your plan from an Android device, open **lovable.dev** in your mobile browser and check out with Stripe as you would on desktop. Your plan and credits sync back to the app automatically.

Billing follows the purchase, not the device: anything bought inside the iOS app is billed by Apple, and anything bought on **lovable.dev** (including a subscription you already had before installing the app) is billed by Stripe and managed on the web.

| | Bought in the iOS app (App Store) | Bought on the web (Stripe) |
| - | - | - |
| Buy credits | In the app, on Pro and Business plans | On lovable.dev in your browser |
| Buy a plan | In the app (Free workspaces only) | On lovable.dev in your browser |
| Upgrade or change a plan | Not available in the app, use the browser instead | On lovable.dev in your browser |
| Cancel a plan | Nothing to cancel (plans cover one month and don't renew) | In your browser at lovable.dev |
| Receipts and refunds | Handled by Apple | In your account settings on the web |

Purchases sync back to the app automatically, regardless of which path you used. For step-by-step cancellation instructions, see [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription).

## What's not available on mobile

Most of Lovable works the same on mobile as on desktop. The following flows aren't supported in the app yet. Open **lovable.dev** in your browser to use them.

### Account and login

* **Creating a new account.** The mobile app's login screen only supports logging in. Sign up at **lovable.dev** first, then log in to the app.
* **Apple Sign-In on Android.** Available on iOS and the web only. On Android, use Google, GitHub, email, or SSO.
* **Returning to the app after password reset.** The reset email opens in your browser. After resetting, come back to the app and log in manually.

### Integrations

* **Connecting OAuth integrations.** Connectors that use OAuth (including Slack, GitHub, Google Drive, Airtable, and similar services) can't be connected from the mobile app. Set them up on **lovable.dev**; they'll work in the app once connected.

### Editor and project menu

* **Project menu.** Tapping the project name in the editor opens the **Project menu**, the one place for project navigation on a phone: your credits, **Share** and **Publish** tiles, **Drafts**, **Files**, the same sections as the desktop [More menu](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) with **Settings** last, then **GitHub**, **Code**, **History**, **Copy project link**, **Add to home screen**, and **Get free credits**. On a design system project the tile reads **Release**. To rename a project on a phone, open **Settings**. On desktop, the project name opens the [draft switcher](https://docs.lovable.dev/features/projects/editor.md#project-name-and-drafts) instead.
* **Preview toolbar.** The [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) used for selecting elements, leaving comments on the preview, drawing annotations, and editing text directly in the preview isn't shown on small screens. This is a screen-size limitation rather than a platform one, so the same toolbar is hidden on a narrow desktop browser window.
* **Mention and file picker.** When you type `@` in the project chat, the picker shows fewer items and no descriptions to fit the screen. To browse the full list, use the web app.
* **Inline PDF previews.** When you open a PDF attachment in the project chat on a phone or tablet, Lovable shows **Open PDF** instead of the inline preview. Select it to read the file in your browser. This is a device limitation rather than an app one, so **lovable.dev** in a phone or tablet browser shows the same button.

### Plans and billing

* **In-app purchases on Android.** See the section above.
* **Canceling your plan.** The app has no cancel option. If you subscribed on the web, cancel from **lovable.dev** in your browser. See [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription) for the steps. Plans purchased in the iOS app cover one month and don't renew automatically, so there is nothing to cancel.
* **Pricing page on iOS.** Browsing pricing in-app on iOS isn't supported. The page redirects you to the App Store flow.
* **Upgrade prompts.** Inline "Upgrade" buttons that open checkout on the web (for example, from templates or design systems) instead route you through the App Store on iOS or to **lovable.dev** on Android.
* **Billing and domain alerts.** Some warning banners (past-due payments, auto-renewal reminders, domain registrar verification) aren't shown in the mobile app. Watch for these by email or by checking your account on the web.
* **Referral program.** The [Share Lovable](https://docs.lovable.dev/introduction/dashboard-overview.md#share-lovable) invite link and its **Get free credits** entry aren't shown in the app. To share your invite link from your phone, open **lovable.dev** in your browser and select **Get free credits** from the user menu on the dashboard or the project menu in the editor.

### Workspace management

* **Exporting workspace members.** The **Export** button in workspace **People** settings is web-only. See [Export the member list](https://docs.lovable.dev/features/people.md#export-the-member-list).
* **Announcement banner.** The [announcement banner](https://docs.lovable.dev/features/workspace-announcements.md) that workspace admins post appears on the dashboard and in the editor on the web, not in the app.

### Project workflows

* **Folders.** The **Projects** tab lists your projects without their [folders](https://docs.lovable.dev/introduction/project-folders.md), and you cannot open or create a folder on a phone. Organize projects in folders from a desktop browser.
* **Offline use.** Lovable needs an active connection. There's no offline editing or draft mode.

### Operating system requirements

* iOS 14 and earlier, and Android 8 and earlier, are not supported.

If you run into something else that feels missing or broken on mobile, let us know. Tap your avatar in the app to open the user menu and use **Send feedback**. The app is updated frequently.

## FAQ

> **Is the mobile app free?**
>
> Yes. The app is free to download on iOS and Android. Your plan and credits are shared with your Lovable account, regardless of how you log in.

> **Does the mobile app have all the same features as the web app?**
>
> Most of the product works the same way. A few flows (OAuth integrations, account creation, preview toolbar interactions and comments on the preview, some billing actions) still need to be done on **lovable.dev**. See "What's not available on mobile" above.

> **Can I use Lovable offline?**
>
> No. Lovable requires an active internet connection. If you go offline mid-session, you'll see an offline indicator until you reconnect.

> **Which devices and OS versions are supported?**
>
> iOS 15 or later on iPhone and iPad. Android 9 or later on phones and supported tablets.

> **How do I buy credits or upgrade on Android?**
>
> Open **lovable.dev** in your mobile browser and check out with Stripe as you would on desktop. Your plan and credits sync back to the app automatically.

> **How do I cancel my subscription from my phone?**
>
> It depends on where you subscribed:
>
> * **Subscribed on the web (or from an Android device)**: open **lovable.dev** in your phone's browser and cancel from [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing). The mobile app itself has no cancel option. See [Cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md#cancel-your-subscription) for the steps.
> * **Subscribed in the iOS app**: there is nothing to cancel. Plans purchased through the App Store cover one month and do not renew automatically. Your workspace moves to the Free plan when the month ends, and you are not charged again unless you make a new purchase. Because these plans do not renew, Lovable does not appear under **Settings → \[Your name] → Subscriptions** on your device.

> **Why don't I see Upgrade buttons in the iOS app?**
>
> On iOS, in-app payments go through the App Store. Tap your project name to find the **Credits** section, which links into the native purchase flow.


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
