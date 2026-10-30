# Add Apple authentication to your app
<!-- source: https://docs.lovable.dev/features/apple-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Apple authentication to your app

> Add Sign in with Apple to your app using managed Apple OAuth or your own Apple Developer credentials.

> [!NOTE]
>
> This page documents **Apple authentication for your app's users**. It is available only for apps using the [built-in backend](https://docs.lovable.dev/features/cloud). For an overview of all sign-in methods, see [Users and authentication](https://docs.lovable.dev/features/authentication).

Let users sign in to your app with their Apple account instead of creating a password. Like [Google authentication](https://docs.lovable.dev/features/google-auth.md), **Sign in with Apple** can be configured in two ways:

* **Managed by Lovable**: Lovable manages the OAuth configuration and security updates. This is the default and requires no Apple Developer account.
* **Your own credentials**: you connect credentials from your own Apple Developer account and manage their rotation yourself.

Both options provide the same sign-in experience for users:

1. The user clicks **Sign in with Apple** in your app
2. Apple asks them to confirm with their Apple Account
3. The user chooses whether to share their email address with your app
4. Apple redirects the user back to your app, signed in

## Why use Apple sign-in

Apple sign-in reduces signup friction for users in the Apple ecosystem, and it appeals to privacy-conscious audiences:

* Faster onboarding without password creation
* A trusted, familiar confirmation flow on Apple devices
* Built-in privacy controls, including the option to hide the real email address
* Reduced password reset and account recovery overhead
* Pre-verified identity backed by the user's Apple Account

## Common use cases

Apple sign-in is commonly used for:

* Consumer apps with a large iPhone, iPad, or Mac audience
* Apps that pair a Lovable web app with a mobile experience
* Products for privacy-conscious users who prefer not to share their real email
* Apps that already offer [Google sign-in](https://docs.lovable.dev/features/google-auth.md) and want parity for Apple users

## Apple authentication setup options

The end-user experience is identical in both modes; the difference is who manages the OAuth credentials.

**Managed by Lovable (default)**

Lovable manages the OAuth configuration and related security updates. No Apple Developer account is required.

Use this option if you:

* want zero setup
* do not need the flow tied to your own Apple Developer account
* do not need to control whether users can sign in without sharing an email

**1. Prompt Lovable to add Apple sign-in**

```text wrap theme={null}
Add an Apple sign-in button to my app.
```

Lovable enables the provider in **More → Users → Settings → Apple** and adds the sign-in button to your app's login page. You can also enable it manually from the same settings.

**2. Test the flow**

Verify that:

* a **Sign in with Apple** button appears on your login page
* users are redirected to Apple to confirm
* users return to the app in a signed-in state
* new users appear in **More → Users**

In Managed by Lovable mode, users must share an email address with your app to complete sign-in. Users who pick Apple's **Hide My Email** option still provide one: Apple shares a private relay address with your app instead of the real one.

**Your own credentials**

You create and manage Sign in with Apple credentials in your own Apple Developer account and connect them to Lovable. You are responsible for credential security and rotation.

Use this option if you:

* want the sign-in flow tied to your own Apple Developer account and identifiers
* have security or compliance requirements for owning the credentials
* want to control whether users can sign in without sharing an email

You need a paid Apple Developer Program membership with admin access to the account.

**1. Configure Sign in with Apple in your Apple Developer account**

In the [Apple Developer portal](https://developer.apple.com/account), you need:

* an **App ID** with the **Sign in with Apple** capability enabled
* a **Services ID** to act as the client identifier for the web flow
* a **key** with Sign in with Apple enabled, downloaded as a `.p8` file (note its **Key ID** and your **Team ID**)

See Apple's [Sign in with Apple documentation](https://developer.apple.com/sign-in-with-apple/get-started/) for the portal walkthrough.

**2. Enter your credentials in Lovable**

In **More → Users → Settings → Apple**, choose **Your own credentials** and fill in:

* **Client ID**: your Services ID (or Bundle ID) in reverse domain name notation, for example `com.example.app`.
* **Client secret (JWT)**: a JSON Web Token generated from your `.p8` key. Use the built-in **Generate secret** helper: upload the `.p8` file and enter your Key ID, Services ID, and Team ID, and it builds the JWT for you.

**3. Add the return URLs to your Apple configuration**

Copy the redirect URLs shown in Lovable (the **Redirect URL(s)** field; Apple calls them **Return URLs**) into your Services ID configuration in the Apple Developer portal. Sign-in fails with a redirect error until these match.

**4. Test the flow**

Sign in with an Apple account, including once with **Hide My Email** selected, and confirm the user appears in **More → Users**.

> [!WARNING]
>
> Apple requires you to generate a new client secret every 6 months using your signing key. Generate a new JWT before the current one expires, or users will not be able to sign in.

### Allow users without an email

Apple lets users hide their email address when signing in. With your own credentials, the **Allow users without an email** toggle controls whether such users can sign in to your app. If your app's features depend on reaching users by email, consider leaving it off.

## Managing Apple authentication

You can switch between **Managed by Lovable** and **Your own credentials** at any time from **More → Users → Settings → Apple**. Existing accounts are kept, but Apple identifies users per developer team: users who signed up under the previous mode may not be recognized when they next sign in with Apple, and Hide My Email relay addresses change with the team. Plan the switch before your app has many Apple users.

To remove the sign-in option, ask Lovable in the project chat:

```text wrap theme={null}
Remove the Apple sign-in button from my app.
```

Or disable the provider in the auth settings. Users who signed up with Apple keep their accounts but need another enabled sign-in method to get back in.

## Troubleshooting

> **Apple sign-in stopped working after months of working fine**
>
> Your client secret has probably expired. Apple limits each JWT to 6 months. Generate a new secret from your `.p8` key with **Generate secret** and save it in the Apple auth settings.

> **Users see a redirect or invalid client error**
>
> The return URLs in your Apple Services ID configuration don't match the redirect URLs Lovable shows. Copy every return URL from Lovable into the Apple Developer portal exactly, then retry. If sign-in fails only on your published app or custom domain, also check your project's [redirect URLs](https://docs.lovable.dev/features/authentication#site-url-and-redirect-urls).

> **Support can't reach a user who hid their email**
>
> Apple forwards mail sent to the relay address only while the user keeps forwarding on. Treat the relay address like any other email in your app, and offer an in-app way for users to update their contact details.

## FAQ

> **Do I need an Apple Developer account?**
>
> Only if you use your own credentials. In Managed by Lovable mode, Lovable provides the OAuth configuration and no Apple Developer account is needed.

> **What happens when a user hides their email?**
>
> Apple shares a private relay address with your app instead of the real one, so the user still has an email your app can use. With your own credentials, the **Allow users without an email** toggle additionally controls whether users can sign in without providing any address.

> **Why did Apple sign-in suddenly stop working?**
>
> If you use your own credentials, the most common cause is an expired client secret: Apple limits each JWT to 6 months. Generate a new secret from your `.p8` key and save it in the Apple auth settings.

> **Does Apple sign-in replace email and password sign-in?**
>
> No. It is an additional sign-in method, and you can offer it alongside [email](https://docs.lovable.dev/features/email-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), and other methods.

> **Can I switch between managed and my own credentials later?**
>
> Yes, anytime from **More → Users → Settings → Apple**. Existing accounts are kept, but Apple identifies users per developer team, so users who signed up under the previous mode may not be recognized after the switch. Plan the switch before your app has many Apple users.

> **Do users need an iPhone to use Sign in with Apple?**
>
> No. Sign in with Apple works in any browser. Users sign in with their Apple Account credentials, and users on Apple devices get the smoothest flow.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
