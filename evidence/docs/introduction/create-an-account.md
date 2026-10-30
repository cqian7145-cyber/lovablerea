# Create an account
<!-- source: https://docs.lovable.dev/introduction/create-an-account.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Create an account

> Create your Lovable account to start building and iterating on full-stack web applications using natural language.

A Lovable account is your personal identity on Lovable. It's how you log in, manage your profile and preferences, and access the workspaces where projects live. You only need one account, no matter how many teams or projects you work on.

Anyone with an email address can [**sign up for free**](https://lovable.dev/signup?utm_source=lovable_docs\&utm_medium=content\&utm_content=create-an-account). The [Terms of Service](https://lovable.dev/terms) require you to be 18 or older, or to have your parent or legal guardian's permission. After sign-up, Lovable automatically creates your first personal workspace on the free plan so you can start building immediately.

## Sign up at lovable.dev

Create an account at [**lovable.dev/signup**](https://lovable.dev/signup?utm_source=lovable_docs\&utm_medium=content\&utm_content=create-an-account) using any of these methods:

* **Email and password**
* **Google**
* **GitHub**
* **Apple**
* **Single sign-on (SSO)**: SAML or OIDC, for organizations on Business and Enterprise plans that have configured SSO with Lovable
  > [!NOTE]
  >
  > If your organization uses SSO, ask your admin which provider to use. You can also link SSO to an existing account later from **Account settings → Account → Login methods**.

After sign-up, Lovable automatically creates your first personal workspace on the **free plan**, which includes 5 daily build credits (up to 30 per month) and a [daily chat allowance](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs), and takes you to the dashboard.

## Log in to an existing account

If you already have a Lovable account, log in at [**lovable.dev/login**](https://lovable.dev/login), or select **Log in** in the top-right of the [lovable.dev](https://lovable.dev) home page. Use the same method you signed up with (email and password, Google, GitHub, Apple, or SSO).

If you're not sure which method you used, enter your email on the login page. Lovable checks your account, marks the login method linked to it as **Recommended**, and takes you straight to it when only one is linked. After logging in, you can review all of your login methods under [Login methods](https://docs.lovable.dev/introduction/lovable-account-settings#login-methods) in your account settings.

If you can't log in, see [Reset your password](#reset-your-password). If Lovable shows a **Login denied due to suspicious activity** message, see [Sign-up or login denied due to suspicious activity](#sign-up-or-login-denied-due-to-suspicious-activity).

## Access your account settings

You can open your account settings at any time:

* Click your avatar at the bottom-left of the dashboard sidebar and select [**Account settings**](https://lovable.dev/settings/account), or
* Press `Cmd+.` (Mac) or `Ctrl+.` (Windows/Linux) from the dashboard, or
* Go directly to [**lovable.dev/settings/account**](https://lovable.dev/settings/account)

On a computer, they open in a dialog on top of the dashboard. See [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings) for the full list of what you can configure (profile, username, preferences, login methods, two-factor authentication, and more). Workspace settings are separate: open the workspace switcher at the top-left of the dashboard and select **Workspace settings**.

## Reset your password

If you signed up with **email and password**, you can reset it from the login page:

1. Go to [**lovable.dev/login**](https://lovable.dev/login).
2. Enter your account email and click **Forgot password?**
3. Open the reset email and follow the link to set a new password. You're logged in automatically once your password is set.

If you signed up with **Google**, **GitHub**, **Apple**, or **SSO**, there is no separate Lovable password. **Forgot password?** does not send a reset email for these accounts and shows a **Password reset unavailable** message instead. Log in with the same provider you used to create your account, and reset that provider's password through the provider (for example, [Google Account recovery](https://accounts.google.com) or [GitHub password reset](https://github.com/password_reset)).

> [!NOTE]
>
> If your only login method was an SSO provider that has since been removed from your workspace, use the recovery flow on the login page to set a password for the first time. See [Recover access after an SSO provider is removed](https://docs.lovable.dev/features/business/sso.md#recover-access-after-an-sso-provider-is-removed).

To check which login methods are linked to your account, go to **Account settings → Account → Login methods**. The **Primary** badge marks the provider linked to your account's primary email address. See [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings#login-methods).

## Sign-up or login denied due to suspicious activity

Lovable runs automated fraud checks when you create an account and when you log in. If Lovable denies the attempt, you see one of these messages:

* **Registration denied due to suspicious activity. Contact support if you believe this is a mistake.** when you sign up.
* **Login denied due to suspicious activity. Contact support if you believe this is a mistake.** when you log in.

Lovable bases the decision on signals about the attempt itself, for example:

* Logging in through a VPN (virtual private network), a proxy, or Tor
* An unusual network or device
* Browser automation
* Repeated failed attempts from the same source

Lovable does not share which signals triggered a denial, and you cannot lift a denial yourself.

**What to do:**

1. Turn off any VPN or proxy and try again from your usual network and browser.
2. Wait a few minutes before trying again. Lovable can extend the denial after repeated attempts.
3. If Lovable still denies the attempt and you believe this is a mistake, email [support@lovable.dev](mailto:support@lovable.dev) from the email address you used, and include the exact message you saw. Use email rather than the [support form](https://lovable.dev/support), because you must log in to use the form.

## Account vs. workspace

A Lovable account is your personal identity on Lovable. It's separate from a workspace.

* Your account is you and holds your login, your profile, your preferences.
* A workspace is where you work, alone or shared with people you invite, and holds your projects, members, billing, and credits.

You log in with one account, and from that account you can belong to one or many workspaces.

See [Workspace](https://docs.lovable.dev/features/workspace) for everything workspace-related.

## What's next

Now that your account is set up:

* **Build and publish your first app** in about ten minutes with the [Quick start](https://docs.lovable.dev/introduction/getting-started.md).
* **Create your first project** from the dashboard. See [Lovable dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md).
* **Invite your team** to your workspace from **Workspace settings → People**. See [People](https://docs.lovable.dev/features/people.md).
* **Personalize your account**: Set your name, avatar, and profile visibility from **Account settings → Account**. See [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings).
* **Secure your account**: Enable two-factor authentication from **Account settings → Security**. See [Two-factor authentication](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md).
* **Upgrade your plan** if you need more daily credits or team features. See [Subscription plans](https://docs.lovable.dev/introduction/subscription-plans.md).


## Related topics

- [Connect your app to Looker](https://docs.lovable.dev/integrations/looker.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md)
- [Account settings](https://docs.lovable.dev/introduction/lovable-account-settings.md)
- [Create and manage API keys](https://docs.lovable.dev/features/api-keys.md)
