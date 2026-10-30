# Account settings
<!-- source: https://docs.lovable.dev/introduction/lovable-account-settings.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Account settings

> Manage your personal identity, profile, preferences, and account security on Lovable from the Account settings dialog.

Account settings are the settings that belong to you rather than to a workspace: your profile, how Lovable works for you, and the security of your login. On a computer, they open in a dialog on top of the dashboard or project you are working in. On a phone or in a narrow browser window, the same sections open as full-width pages under **Settings** instead.

To open them, click your avatar at the bottom-left of the sidebar and select [**Account settings**](https://lovable.dev/settings/account). You can also press `Cmd+.` (Mac) or `Ctrl+.` (Windows/Linux) from the dashboard, or search for a setting in the [command palette](https://docs.lovable.dev/introduction/project-search-and-find.md#command-palette) with `Cmd+K` or `Ctrl+K`. Links to `lovable.dev/settings/account` also open the dialog.

The dialog has five sections:

* [**Account**](#account): who you are on Lovable, for example your profile, username, and login methods. This first row is labeled with your name, or with your email address if you have not set a name.
* [**Preferences**](#preferences): how Lovable works for you, for example your language, chat suggestions, and agent permissions.
* [**Security**](#security): two-factor authentication and logging out of every device at once.
* [**Devices & apps**](#devices-and-apps): the other ways to use Lovable, such as Slack, Telegram, and the desktop and mobile apps.
* [**This device**](#this-device): settings for the computer you are on. Desktop app only.

Workspace settings such as members, billing, and security policies are not in this dialog. Open the workspace switcher at the top-left of the dashboard and select **Workspace settings**, or click the **Workspace settings** button at the bottom of the dialog, which closes the dialog and opens the workspace settings page. See [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md).

## Account

### Showcase skills (Beta)

Lovable identifies **skills** based on how you use the platform across your projects. If you have any skills, they appear at the top of the **Account** section.

#### How to qualify for a skill

Each skill maps to a category of app that you build in Lovable. The categories are listed under [Skills you can unlock](#skills-you-can-unlock). To unlock a skill, you need at least one qualifying project. The project must meet all three of these conditions:

* The project is classified in that skill's category. Lovable classifies a project automatically after you have sent at least 5 messages in it.
* The project's live app has at least 20 visits, with bot traffic excluded. A visit is one person opening your published app, and returning later counts again. Visits add up over time and do not reset.
* The project is in a workspace on a Free or Pro plan. Projects in Business and Enterprise workspaces are not eligible, and that does not change if the workspace later moves to a different plan.

Accounts flagged for fraud or abuse are not eligible either. Each skill is evaluated on its own, so you can unlock several.

#### Skills you can unlock

Lovable offers 12 skills, each tied to a category of app. To unlock a skill, build a project that fits its category and reach 20 visits on its live app.

| Skill | Build this to unlock it |
| - | - |
| Website Development | A business or portfolio website, or a landing page. |
| Business Application Development | An internal business app: a client or employee portal, a project or workflow management tool, a document or compliance tool, a business management system, a field or fleet operations tool, or a design system or UI prototype. |
| Marketplaces & Platforms | A marketplace, a booking platform, or a platform or network that connects groups of users. |
| AI Tools | An AI assistant or chatbot, or an AI image or video generation tool. |
| Data Visualization & Analytics | An analytics dashboard or a management dashboard. |
| Marketing Collateral | A document or content generator, or brand assets and invitations. |
| E-commerce Development | An e-commerce storefront, for example one built with the [Shopify integration](https://docs.lovable.dev/integrations/shopify.md). |
| Productivity Software Development | A personal tracking app, for example to track habits, tasks, or personal goals. |
| EdTech Development | A learning platform, such as a course, lesson, or study tool. |
| Sales Enablement Tools | A sales CRM or lead generation tool, or a presentation deck. |
| Games Development | A browser game. |
| FinTech Development | A financial calculator, or a trading or investing tool. |

#### Add a skill to LinkedIn

You can post one skill at a time to your LinkedIn profile. It appears under **Connected apps**, in the Lovable app's details, as a capability summarized from how you use Lovable.

**1. Open your account**

Open **Account settings**. The skills are at the top of the first section, the one labeled with your name or email address.

**2. Choose the skill**

Find the skill you want to post.

**3. Connect LinkedIn**

Click **Add to LinkedIn** and connect your LinkedIn account. The skill appears publicly on LinkedIn. When your skill status changes, click **Add to LinkedIn** again to update your profile.

You can disconnect at any time to remove the skill from LinkedIn.

> [!NOTE]
>
> **Vibe coding level** is no longer available. LinkedIn no longer displays the older vibe coding status levels, and Showcase skills replace them.

### Profile

Control how you appear on Lovable.

| Setting | Description |
| - | - |
| Profile | Your public profile page, published at `lovable.dev/@<username>`. Click **Open profile** to view and edit it: set your name, bio, location, website, avatar, and banner image. If one of your workspaces hides member profiles, this row shows a note instead of the button. |
| Username | Your public handle and the last part of your profile URL. Click the pencil icon to change it, or **Set username** if you haven't chosen one yet. Usernames are 3 to 20 characters long, use lowercase letters, numbers, and underscores, start with a letter, and must be unique. The dialog suggests available usernames. |
| Email | The email address associated with your account. You cannot change it here. |
| Profile visibility | Control who can see `lovable.dev/@<username>`: <ul><li>**Public** (default): Your profile is visible to everyone.</li><li>**Private**: Your profile page shows only your name and username. Your avatar, details, and projects are hidden from everyone else.</li></ul> Enterprise workspaces hide member profiles by default. If you belong to one, your profile isn't visible outside that workspace, even if your visibility is set to Public, and this setting is locked with the note "Profile visibility is managed by one of your workspaces." Workspace admins can make member profiles public again from [**Workspace settings → Security → Privacy & security → Public member profiles**](https://docs.lovable.dev/features/privacy-and-security-settings.md#public-member-profiles). |

### Login methods

This section lists the login methods linked to your account. Each provider appears with the email address it is linked to. The **Primary** badge marks the one linked to your account's primary email address.

* **Unlink**: Removes a provider. Email and password login cannot be unlinked, and neither can your last remaining login method. Lovable may ask you to log in again first.
* **Link company account**: Link your organization's [SSO](https://docs.lovable.dev/features/business/sso.md) to this account so you can log in with it.

To reset the password for an email and password login, use **Forgot password?** on the [login page](https://lovable.dev/login). For Google, GitHub, Apple, or SSO logins, reset your password with that provider. See [Reset your password](https://docs.lovable.dev/introduction/create-an-account.md#reset-your-password).

> [!WARNING]
>
> Unlinking an SSO provider may remove your access to workspaces tied to that provider.

### Danger zone

**Delete account** permanently deletes your Lovable account.

For 30 days, your account remains recoverable. After 30 days, your account, profile, and any data not transferred to a workspace are permanently removed.

See [Delete account](https://docs.lovable.dev/introduction/delete-account.md) for more information.

## Preferences

Personalize how Lovable works for you.

| Setting | Description |
| - | - |
| Agent permissions | What Lovable may do without asking you first. Click **Manage** to open [Agent permissions](#agent-permissions) inside the dialog. |
| Language | Choose the language Lovable uses for your account. Lovable is currently available in English, French, German, Spanish, Portuguese (Brazil), Italian, Hindi, Indonesian, Japanese, Korean, and Thai. Your choice is saved to your account and applied automatically when you log in on any device. Not every part of Lovable is translated yet. |
| Chat suggestions | Context-aware prompts that appear in the project chat [suggesting what to build next](https://docs.lovable.dev/features/projects/chat.md#suggestions-from-lovable). Enabled by default. |
| Message queue | Makes messages you send while Lovable works wait in a [queue](https://docs.lovable.dev/features/projects/chat.md#message-queue-deprecated), each with a **Send now** button to send it into the running task like a follow-up. Disabled by default, so new messages go [straight into the running task](https://docs.lovable.dev/features/projects/chat.md#send-follow-ups-while-lovable-works). Accounts that used the queue before follow-ups replaced it keep it enabled until they disable it. |
| Long-running credit check-ins | Pauses a Build mode message that crosses your credit check-in level, 20 credits by default, so you can decide whether to continue. When enabled, **Check-in level (credits)** sets the threshold, a whole number between 20 and 100,000 credits, applied to your account in every workspace. In beta. See [Build costs](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs). |
| Generation complete sound | A sound notification when Lovable finishes a generation. <ul><li>**First generation** (default): Plays a sound when the first generation of a new project finishes</li><li>**Always**: Plays a sound on every generation</li><li>**Never**: Never plays a sound</li></ul> |
| Auto-accept invitations | Automatically join workspaces and projects you're invited to by email or invite link, without accepting each invitation manually. Enabled by default. Disable it to review each invitation before accepting. |

### Agent permissions

**Account settings → Preferences → Agent permissions → Manage** opens the **Agent permissions** view inside the dialog. It lists what Lovable may do without asking you first. To return to the other preferences, click **Preferences** at the top of the view. Each connector permission has three options:

* **Always allow**: Lovable performs the action without asking.
* **Ask each time**: Lovable asks for your approval each time.
* **Never allow**: Lovable does not perform the action.

The view covers:

* **New projects from chat**: whether Lovable may create a project when you ask for one in a [chat](https://docs.lovable.dev/features/chats.md#approve-the-handoff). New projects use build credits. Selecting **Always allow** on the **Create a new project?** card saves the same preference here.
* **Project edits from chat**: whether Lovable may change a project you ask about in a chat. **All projects** covers every project you can edit. **Saved projects** lists the projects you approved with **Always allow for this project** on the **Edit \[project name]?** card, and you can set any of them back to **Ask each time**.
* One section per connector available in your current workspace, including each connected [chat connector](https://docs.lovable.dev/integrations/chat-connectors.md), with the same permissions you can set from the connector itself. **Manage all permissions** at the top of a section sets every permission in that section at once. For the built-in backend, see [Backend permissions](https://docs.lovable.dev/features/cloud#backend-permissions).

The two project sections offer **Always allow** and **Ask each time** only.

These preferences are saved to your account and apply in every workspace and project. The view lists the connectors available in the workspace you are in, so the list changes when you switch workspaces. Use the search field to filter the list.

### AI model training

Control how your personal data is used for AI model training.

| Setting | Description |
| - | - |
| Use my Lovable content for model training | Disable this setting to opt your own data out of AI model training. Available on any plan. This covers only your own data and does not change the setting for other members of a workspace you belong to. Your plan and your use of AI features stay the same after you disable it. If every workspace you belong to is on the Business or Enterprise plan, the toggle is disabled and locked, because Lovable doesn't train AI models on Business and Enterprise workspace data by default. See [Training data and privacy](https://docs.lovable.dev/features/business/data-opt-out.md) for details. |

## Security

### Two-factor authentication

**Two-factor authentication** adds a second verification step when you log in:

* **Authenticator app**: Time-based one-time codes from apps such as Google Authenticator, 1Password, or Authy
* **Phone**: Codes sent by SMS to your mobile number. In regions where SMS codes are not available, use an authenticator app.

Click **Enable** and follow the dialog to set it up. After you enable a method, **Add another method** adds a second one, and **Disable** next to a method removes it. Lovable may ask you to log in again before you change these settings.

See [Two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md) for more information.

### Log out everywhere

**Log out everywhere** ends your sessions on all devices and browsers, including the one you're using. Use it if you lose a device or suspect someone else has access to your account.

Click **Log out everywhere** and confirm. Lovable revokes every session issued to your account and returns you to the login page, and you log in again on each device you want to keep using. A device that still shows you as logged in is logged out the next time you use Lovable on it.

### Login alerts

Lovable emails you when your account is logged in from a device that has not been seen on your account before. The email shows the country, the browser and operating system, the time, and the login method that was used.

If the login was you, no action is needed. If you do not recognize it, follow the instructions in the email to reset your password and secure your account. Because these alerts protect your account, your email preferences do not turn them off.

## Devices and apps

Under **Devices & apps** you find the other ways to use Lovable:

* **Messaging in \[workspace name]**: Connect Slack or Telegram to that workspace and chat with Lovable from there. See [Lovable for Slack](https://docs.lovable.dev/integrations/lovable-for-slack.md) and the [Telegram bot](https://docs.lovable.dev/tips-tricks/lovable-telegram-bot.md).
* **On your desktop**: Download the [desktop app](https://docs.lovable.dev/integrations/desktop-app.md).
* **On your phone**: Scan a QR code or use the store buttons to get the [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md) for iOS and Android.

Links to `lovable.dev/settings/apps` open this section directly.

## This device

In the [desktop app](https://docs.lovable.dev/integrations/desktop-app.md), the dialog has one more section, **This device** (**This Mac** on macOS). It shows the device and app version and the **Local MCP servers** available from this machine. This section does not appear in the browser.


## Related topics

- [Create an account](https://docs.lovable.dev/introduction/create-an-account.md)
- [Delete account](https://docs.lovable.dev/introduction/delete-account.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Manage training data and privacy](https://docs.lovable.dev/features/business/data-opt-out.md)
