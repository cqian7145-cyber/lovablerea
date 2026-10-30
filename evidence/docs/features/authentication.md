# Users and authentication
<!-- source: https://docs.lovable.dev/features/authentication.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Users and authentication

> Manage your app's users and configure how they sign in: email, phone, Google, Apple, Microsoft, Lovable, SAML SSO, and OIDC, all part of the built-in backend.

Your app's built-in backend includes authentication. Ask Lovable to add login, and it generates the signup and login pages, wires them to your backend, and protects user data with row level security. Unless you name the sign-in methods you want, Lovable sets up [email and password sign-in](https://docs.lovable.dev/features/email-auth.md), [Google sign-in](https://docs.lovable.dev/features/google-auth.md), and [Sign in with Lovable](https://docs.lovable.dev/features/lovable-auth.md). For example, tell Lovable:

```text wrap theme={null}
Add login to the app. Require login before accessing the dashboard. Also, add a 'Sign in with Google' button so users can log in with their Google accounts.
```

The **Users** view lets you manage the people who sign up and configure how they sign in. To open it, go to **More → Users**.

## Manage users

The Users view shows a **Signups** chart of new users over the last 7, 30, or 90 days, and a searchable list of every user in your app.

To add users yourself, click **Add user**:

* **Send invitation**: enter an email address and Lovable sends the person an invite email to join your app.
* **Create new user**: enter an email address and password to create the account directly. Users created this way are automatically confirmed.

Click a user to open their details, including their user ID, sign-up and last sign-in timestamps, and which login methods they use. The **Raw JSON** tab shows the full user record.

To remove a user, open their details and choose **Delete user**. The user loses access to your app, and the action cannot be undone.

## Authentication settings

Click **Settings** in the **Users** view to configure how users sign in. The **Sign in methods** list shows each available method with an **Enabled** or **Disabled** badge.

You can change these settings directly, or ask Lovable in the project chat. When you enable a sign-in method, Lovable can also update your app's login page, for example by adding the matching sign-in button.

> [!NOTE]
>
> On Business and Enterprise workspaces, admins can block sign-in methods for all projects in the workspace with the [App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods) setting (**Workspace settings → Security → Privacy & security → App login methods**). The policy controls what you can change in your project's auth settings: you cannot enable a method the policy blocks, and a blocked method that was already enabled can still be disabled, but not enabled again. Locked methods show a **Workspace policy** badge.

> [!TIP]
>
> Building an internal tool for your own workspace members? Apps can recognize the logged-in workspace member with no login page at all. See [Reuse Lovable workspace identity](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

Each sign-in method has its own page with full configuration details:

* [Email](https://docs.lovable.dev/features/email-auth.md): the default method, with settings for confirmation, password rules, one-time codes, and sending limits.
* [Phone](https://docs.lovable.dev/features/phone-auth.md): SMS one-time codes through your own SMS provider (Twilio, Twilio Verify, TextLocal, Vonage, or MessageBird).
* [Google](https://docs.lovable.dev/features/google-auth.md): managed by Lovable with no setup, or your own Google Cloud OAuth credentials.
* [Apple](https://docs.lovable.dev/features/apple-auth.md): managed by Lovable, or your own Apple Developer credentials.
* [Microsoft](https://docs.lovable.dev/features/microsoft-auth.md): managed by Lovable with no setup, or your own Azure app registration.
* [Lovable](https://docs.lovable.dev/features/lovable-auth.md): sign-in with a Lovable account, managed by Lovable with no setup.
* [SAML SSO](https://docs.lovable.dev/features/saml-sso.md): sign-in through a SAML 2.0 identity provider such as Okta or Microsoft Entra ID.
* [OIDC](https://docs.lovable.dev/features/oidc-auth.md): sign-in through your own OpenID Connect provider such as Auth0, Okta, Microsoft Entra ID, or Keycloak.

## Sign-up controls

Two settings on the main auth settings form control who can join your app:

* **Disable sign-up**: prevent new users from signing up. Existing users can still sign in, and you can still add users with **Add user**.
* **Enable anonymous users**: let visitors use your app without creating an account. Ask Lovable in the project chat to build flows that use anonymous sessions, such as guest checkouts.

## Site URL and redirect URLs

Under **Advanced** in the auth settings:

* **Site URL**: the default URL users are redirected to after authentication when no redirect URL is specified.
* **Redirect URLs**: up to 50 URLs that auth providers are permitted to redirect to after authentication. Custom schemes (for example, `myapp://callback`) are supported for mobile apps.

For apps on the built-in backend, Lovable keeps both up to date for you. When you publish, Lovable sets the Site URL to your published `lovable.app` address, and when you connect a custom domain, Lovable adds it to the redirect URLs. A Site URL you set yourself stays unchanged. Apps that use your own Supabase project get no automatic updates, so add the addresses in that project's auth settings.

If sign-in works in preview but breaks on your published app or custom domain, these URLs are usually the reason. Ask Lovable in the project chat to update them for your domain. If your app uses Google sign-in with your own Google OAuth credentials, the new domain also needs a redirect URI in Google Cloud Console. See [Managing Google authentication](https://docs.lovable.dev/features/google-auth.md#managing-google-authentication).

## Auth emails

Authentication flows send emails for signup confirmation, password resets, invites, magic links, email changes, and re-authentication. By default they come from a generic sender. To send them from your own domain with custom branding, set up emails under **More → Emails**. See [Custom emails](https://docs.lovable.dev/features/custom-emails.md).

## FAQ

> **Do I need my own Google, Apple, or Microsoft developer account for social sign-in?**
>
> No. Google, Apple, and Microsoft sign-in work in Managed by Lovable mode, where Lovable handles the OAuth configuration and security updates. You only need your own credentials if you want the consent screen to show your own branding and verified domain.

> **Can workspace admins control which sign-in methods projects use?**
>
> Yes. On Business and Enterprise workspaces, admins can block sign-in methods for every project in the workspace with the [App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods) setting (**Workspace settings → Security → Privacy & security → App login methods**). Blocked methods are locked: project owners can turn them off but cannot turn them back on.

> **Are my app's users copied when I remix a project?**
>
> No. Remixing copies the structure of backend data, such as tables and auth configuration, but not the data itself. The remixed project starts with no users.

> **Why does sign-in fail on my published app but work in preview?**
>
> The published URL or custom domain is missing from your project's redirect URLs. For apps on the built-in backend, Lovable adds these addresses automatically when you publish and when you connect a custom domain. If sign-in still fails, or your app uses your own Supabase project, ask Lovable in the project chat to add your domain to the auth redirect URLs, or add it under **More → Users → Settings → Advanced → Redirect URLs**. If your app uses Google sign-in with your own Google OAuth credentials, also add the new domain's redirect URL in Google Cloud Console and select it in Lovable. See [Managing Google authentication](https://docs.lovable.dev/features/google-auth.md#managing-google-authentication).


## Related topics

- [Email authentication for your app](https://docs.lovable.dev/features/email-auth.md)
- [Phone authentication for your app](https://docs.lovable.dev/features/phone-auth.md)
- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
