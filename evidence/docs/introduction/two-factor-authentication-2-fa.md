# Two-factor authentication (2FA)
<!-- source: https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Two-factor authentication (2FA)

> Learn how to set up and manage two-factor authentication (2FA) on your Lovable account, and give your account an extra layer of security.

**Two-factor authentication (2FA)** adds an extra layer of security to your Lovable account by requiring a one-time code when you log in, in addition to your usual login method.

Even if someone learns your password, or compromises your Google, GitHub, Apple, or SSO login, they still can't get into your account without the code from your second factor.

We **strongly recommend** turning on 2FA for every Lovable account, especially if you belong to a workspace with shared projects or billing.

## Before you start

* 2FA is configured per **account**, not per workspace. When enabled, it applies every time you log in to Lovable.
* If your last login was more than 5 minutes ago, Lovable asks you to log in again before you change 2FA settings.
* 2FA is **independent of** your login method. You can use 2FA whether you log in with email/password, Google, GitHub, Apple, or SSO.
* Enterprise workspaces can **require** 2FA. See [When a workspace requires 2FA](#when-a-workspace-requires-2fa).

## Set up 2FA

If you log in with email and password and have no 2FA method, Lovable recommends 2FA in a banner on the dashboard. You can start the setup from the banner, which opens the same dialog as the steps below, or dismiss the banner.

If you start 2FA setup in the [Lovable desktop app](https://docs.lovable.dev/integrations/desktop-app.md), Lovable opens Account settings in your browser. Finish the setup there, then return to the desktop app.

To enable 2FA:

1. Open [Account settings → Security](https://lovable.dev/settings/account#2fa) and click **Enable** next to **Two-factor authentication**.
2. In the **Add two-factor method** dialog, choose a method:
   * **Authenticator app** (recommended): scan the QR code with an app such as Google Authenticator, Microsoft Authenticator, Authy, or 1Password, then enter the 6-digit code the app shows.
   * **Phone**: enter your phone number, click **Send code**, and enter the 6-digit code from the text message. If Lovable tells you that text-message codes are not available in your country, set up an authenticator app instead.
3. Click **Verify & Enable**.

The method now appears in your **Two-factor authentication** list and is required at every future login.

If Lovable asks you to log in again during setup, start the setup again from Account settings, which Lovable opens after you log in.

## Logging in with 2FA

When you log in with 2FA enabled:

1. Complete your usual login method (email/password, Google, GitHub, Apple, or SSO).
2. If you have more than one 2FA method, choose which one to use.
3. Enter the 6-digit code from your authenticator app or text message.

If you wait too long on the code screen, Lovable tells you that your sign-in session expired. Close the window and log in again.

If you log in through your workspace's SSO provider and have 2FA enabled on your account, Lovable asks for your code after the SSO login. Your identity provider's own verification does not replace it.

You'll be prompted for 2FA on every new login. Existing sessions on devices where you've already logged in stay valid until they expire, you log out, or you use [**Log out everywhere**](https://docs.lovable.dev/introduction/lovable-account-settings#log-out-everywhere) to end them all at once.

## When a workspace requires 2FA

Enterprise workspaces can enable [Require two-factor authentication](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication) for everyone accessing the workspace, including external collaborators.

If a workspace you belong to requires 2FA and you haven't set it up yet, Lovable redirects you to a **Set up two-factor authentication** page the next time you use that workspace. Set up an authenticator app or a phone number (or both) to continue where you left off, or log out. Until you enroll, you cannot use that workspace.

If you log in through the workspace's SSO provider, that login meets the requirement and Lovable does not ask you to set up 2FA. If you have 2FA enabled on your account as well, Lovable still asks for your code after the SSO login. See [Logging in with 2FA](#logging-in-with-2fa).

You can still open projects the workspace has published, even before you enroll. The exception is apps that use [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md): they don't recognize you until you set up 2FA.

You enroll once for your whole account: after you set up 2FA, you meet the requirement in every workspace you belong to.

## Managing 2FA

You can change your 2FA setup at any time from **Account settings → Security → Two-factor authentication**:

* To add a method, click **Add another method**. To remove one, click **Disable** next to it.
* A removed method stops protecting your login in every workspace, because 2FA belongs to your account.
* We recommend keeping **at least two methods** configured to avoid getting locked out. If you lose access to one, for example because your phone was replaced, app uninstalled, or SIM swapped, the other lets you log in and recover.

## Lost access to your 2FA method

Lovable does not provide backup or recovery codes. Your enrolled methods (authenticator app and phone) are the only ways to complete 2FA.

If you can't access your authenticator app or phone:

* **Try your other enrolled method first.** This is why we recommend keeping at least two methods.
* **Still locked out?** Contact [Lovable Support](https://lovable.dev/support) with proof of account ownership (the email on the account, recent project IDs, billing details) and we'll help you regain access.


## Related topics

- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
