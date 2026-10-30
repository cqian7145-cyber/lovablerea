# Email authentication for your app
<!-- source: https://docs.lovable.dev/features/email-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Email authentication for your app

> Configure email sign-in for your app's built-in backend: confirmation, password rules, one-time codes, and sending limits.

> [!NOTE]
>
> This page documents email authentication settings for apps using the [built-in backend](https://docs.lovable.dev/features/cloud). Projects connected to your own Supabase project manage authentication in Supabase instead. For an overview of all sign-in methods and user management, see [Users and authentication](https://docs.lovable.dev/features/authentication).

Let users sign up for your app with an email address and password. Email is the default sign-in method, and Lovable generates the signup, login, and password reset flows for you. For example, tell Lovable:

```text wrap theme={null}
Add login to the app with email and password. Require login before accessing the dashboard.
```

To configure it, go to **More → Users → Settings → Email**.

## How email sign-in works for users

* **Signing up**: the user enters an email address and password. Unless auto-confirm is on, they receive a confirmation email and verify the address before they can sign in.
* **Signing in**: email and password, or a passwordless flow if you build one (see below).
* **Resetting a password**: the user requests a reset, receives a password reset email, and picks a new password.
* **Changing an email address**: with secure email change on, both the old and new address must confirm the change.

Every email in these flows can be sent from your own domain with your own branding. See [Custom emails](https://docs.lovable.dev/features/custom-emails.md).

## Passwordless sign-in

Email sign-in doesn't have to mean passwords. Ask Lovable to build a magic link or one-time code flow instead:

```text wrap theme={null}
Let users sign in with a magic link sent to their email instead of a password.
```

The **One-time codes** settings below control how long emailed codes and magic links stay valid, and how many digits codes have.

## Email confirmation

Two settings control how addresses are verified:

* **Auto-confirm email**: sign users in immediately without requiring them to confirm their email address. With auto-confirm off, users receive a confirmation email and must verify the address before signing in.
* **Secure email change**: require confirmation on both the old and new address when a user changes their email.

> [!TIP]
>
> Auto-confirm makes testing easier, but confirmed emails are worth keeping for real apps: without confirmation, anyone can sign up with an address they don't own.

## Password rules

Four settings set the bar for passwords:

* **Minimum password length**: minimum 6 characters; 8 or more is recommended.
* **Required password characters**: which character types every password must include. The default, **No required characters**, adds no requirement beyond the minimum length. The stricter options are **Letters and numbers**, **Lowercase, uppercase, and numbers**, and **Lowercase, uppercase, numbers, and special characters**.
* **Password HIBP check**: reject known or easy-to-guess passwords using the Have I Been Pwned database of leaked passwords.
* **Require re-authentication for password changes**: require a recent login before a password can be changed.

Stricter rules protect accounts but add signup friction. The HIBP check is the highest-value setting here: it blocks the passwords attackers try first, without making rules harder for everyone else.

## One-time codes

For login flows that email a one-time code instead of using a password:

* **Email OTP expiration (seconds)**: how long a code or magic link stays valid, from 60 seconds to 24 hours.
* **Email OTP length**: 6 to 8 digits.

## Sending limits

**Rate limit for sending emails**, found under **Advanced** in the email settings, caps how many authentication emails your project sends per hour. If your app signs up many users at once and confirmations stop arriving, this limit is the first thing to check. To raise it, first set up email sending for the project, either managed email or a verified custom domain. See [Custom emails](https://docs.lovable.dev/features/custom-emails.md).

## Troubleshooting

> **Users are not receiving confirmation emails**
>
> Ask users to check their spam folder first, since emails from new domains often land there. If many signups happen at once, your project may have hit its hourly email rate limit. For better deliverability and branded senders, set up [custom emails](https://docs.lovable.dev/features/custom-emails.md).

> **Sign-in works in preview but fails on the published app**
>
> The published URL or custom domain is probably missing from your project's redirect URLs. See [Site URL and redirect URLs](https://docs.lovable.dev/features/authentication#site-url-and-redirect-urls).

> **A user is stuck unconfirmed**
>
> Their confirmation email may have expired or landed in spam. Signing in again does not resend it; the user can trigger a new confirmation email by signing up again with the same email address. You can also create the account for them: users added with **Add user → Create new user** in **More → Users** are confirmed automatically.

## FAQ

> **Why are users not receiving confirmation emails?**
>
> Ask users to check their spam folder first, since emails from new domains often land there. If many signups happen at once, your project may have hit its hourly email rate limit. For better deliverability and branded senders, set up [custom emails](https://docs.lovable.dev/features/custom-emails.md).

> **Should I turn on auto-confirm email?**
>
> Auto-confirm is convenient while building and testing, because you can create accounts without checking an inbox. For a live app, leaving confirmation on ensures every account belongs to a real, verified address.

> **Can users sign in without a password?**
>
> Yes. Ask Lovable to build a magic link or one-time code flow: users receive an email and sign in without typing a password. The **One-time codes** settings control how long codes stay valid and how many digits they have.

> **Can I turn off email sign-in entirely?**
>
> Yes. Disable it under **More → Users → Settings → Email**, for example if your app should only offer [Google](https://docs.lovable.dev/features/google-auth.md) or [SAML SSO](https://docs.lovable.dev/features/saml-sso.md) sign-in. Make sure at least one sign-in method stays enabled.

> **How do password resets work?**
>
> Lovable generates the reset flow when it builds email sign-in: users request a reset, receive a password reset email, and choose a new password. You can customize the reset email under **More → Emails**.

> **Where do I customize the emails users receive?**
>
> Signup confirmations, password resets, invites, and magic links are sent using your project's email templates. Set up sending from your own domain and preview each template under **More → Emails**. See [Custom emails](https://docs.lovable.dev/features/custom-emails.md).


## Related topics

- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Phone authentication for your app](https://docs.lovable.dev/features/phone-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Send branded emails from your own domain](https://docs.lovable.dev/features/custom-emails.md)
