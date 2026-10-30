# Add Google authentication to your app
<!-- source: https://docs.lovable.dev/features/google-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Google authentication to your app

> Add Google authentication to your app using managed Google OAuth or your own Google Cloud credentials.

> [!NOTE]
>
> This page documents **Google authentication for your app's users**. The managed Google authentication flow and your own credentials setup described here are available only for apps using the [**built-in backend**](https://docs.lovable.dev/features/cloud).

## Overview

Lovable supports **Sign in with Google** using industry-standard OAuth 2.0, allowing users to authenticate with their Google accounts instead of creating a password.

Google authentication in the [built-in backend](https://docs.lovable.dev/features/cloud) can be configured in two ways:

* **Managed by Lovable**: Lovable manages the OAuth client, credentials, redirect handling, and security updates. This is the default and recommended setup.
* **Your own credentials** (sometimes referred to as BYOK): You connect OAuth credentials from your own Google Cloud project and manage credential security and rotation.

Both options provide the same sign-in experience for users.

> [!TIP]
>
> Building an internal tool that only workspace members will use? They are already logged in to Lovable, so you may not need Google sign-in at all. See [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

1. The user clicks **Sign in with Google** in your app
2. Google displays a consent screen
3. The user reviews and approves access
4. Google redirects the user back to your app, signed in

From a technical perspective, OAuth relies on:

* a **Client ID** (identifies the application)
* a **Client secret** (authorizes the application)
* **redirect URLs** (where Google sends users after approval)

Lovable integrates this flow directly into your application and UI.

## Why use Google sign-in

Google sign-in provides a familiar authentication experience and reduces friction during signup and login.

* Faster onboarding without password creation
* Trusted Google consent experience
* Reduced password reset and account recovery overhead
* Pre-verified email addresses provided by Google
* Reliable user identity with profile information

## Common use cases

Google sign-in is commonly used for:

* Consumer applications where social login is expected
* SaaS products targeting professional users
* Internal tools using Google Workspace
* E-commerce accounts and order history
* Communities or products that require verified email addresses

## Google authentication setup options

The built-in backend supports setting up Google authentication in two ways:

* **Managed by Lovable**
* **Your own credentials**

The end-user experience is identical in both cases; the difference is how OAuth credentials are managed.

**Managed by Lovable (default)**

Lovable manages the OAuth client, credentials, redirect handling, and related security updates for this flow. No Google Cloud Console configuration required.

Use this option if you:

* want the simplest setup
* do not want to configure Google Cloud manually
* do not need ownership of OAuth credentials
* do not need custom OAuth scopes beyond the defaults (email and basic profile)

When using **Managed by Lovable**, the Google **consent screen** is shown the first time a user signs in.

The consent screen:

* Shows your application name
* Indicates that the app is requesting access via Google authentication
* Requests access to the user’s email address and basic profile information

Users are asked to approve access once. After approval, they are redirected back to your app and will not see the consent screen again unless permissions change.

**1. Prompt Lovable to add Google authentication**

```text wrap theme={null}
Add Google login to my app so that users can sign in with their Google account
```

Lovable will enable Google authentication automatically in **More → Users → Settings → Google** and:

* configure Google OAuth in the backend
* create or update sign-in UI components
* set up authentication state management
* add sign-out functionality

You can review the changes in the **Details** view.

**2. Test the flow**

After enabling Google sign-in, verify that:

* a **Sign in with Google** button appears
* users are redirected to Google for authentication
* users return to the app in a signed-in state
* the consent screen behaves as expected
* users can sign in and sign out successfully

**Your own credentials**

You create and manage OAuth credentials in your own Google Cloud project and connect them to Lovable. You are responsible for managing credential security and rotation.

Use this option if you:

* require OAuth under your own Google Cloud project
* need full control over consent screen branding
* have security or compliance requirements
* need custom OAuth scopes beyond the defaults

When using **your own credentials**, the Google **consent screen** is fully controlled by your Google Cloud project, including:

* app name and branding
* consent screen configuration
* OAuth scopes

Lovable uses the credentials and settings you provide without modifying the consent screen.

**1. Create OAuth credentials in Google Cloud**

In the [Google Cloud Console](https://console.cloud.google.com), you must:

* select or create a Google Cloud project
* configure an **OAuth consent screen**
* create an **OAuth Client ID** of type **Web application**

See [Google Auth Platform documentation](https://support.google.com/cloud/topic/15540269) for all details.

**2. Configure credentials in Lovable**

* Go to **More → Users → Settings → Google**.
* Enable **Google sign-in** and select **Your own credentials**.
* Enter your **Client ID** and **Client secret**.

**3. Configure redirect URIs in Google Cloud**

When using your own Google OAuth credentials, Lovable may display **multiple possible redirect URIs**, for example:

* your default Lovable domain (`https://myapp.lovable.app`)
* one or more custom domains you’ve added (`https://myapp.com`)

In Google Cloud Console, you must add **every redirect URI you intend to use** as an **Authorized redirect URI** on your OAuth client.

> [!NOTE]
>
> Redirect URIs must match exactly. Scheme, domain, path, and trailing slashes all matter.

**4. Confirm which redirect URIs are authorized in your Google OAuth client**

Lovable needs to know **which redirect URIs are authorized in your Google OAuth client**. After adding them in Google Cloud, return to Lovable and **select the redirect URIs you have whitelisted**.

By selecting redirect URIs in Lovable, you are confirming:

* which domains are authorized in your Google OAuth client
* which domain Lovable is allowed to redirect users back to after sign-in

This ensures Google authentication continues to work correctly across default and custom domains.

**5. Save your Google sign-in settings**

Click **Save** to save and confirm your Google credentials and selected redirect URIs.

**6. Add authentication UI to your app**

Prompt Lovable to add the Google sign-in UI to your app:

```text wrap theme={null}
Add Google sign-in to my app using my own Google OAuth credentials.
```

Lovable will generate the UI using your custom credentials.

**7. Test the flow**

Before deploying to production, verify that:

* a **Sign in with Google** button appears
* redirect URIs are configured correctly
* users return to the app in a signed-in state
* the consent screen behaves as expected
* users can sign in and sign out successfully

## Managing Google authentication

You can switch between **Managed by Lovable** and **Your own credentials** at any time from **More → Users → Settings → Google**.

Switching the Google authentication setup does not affect existing user accounts. Users can continue signing in with the same Google accounts.

If you use your own credentials and connect a [custom domain](https://docs.lovable.dev/features/custom-domain.md) later, Lovable adds a redirect URL for that domain to the list in **More → Users → Settings → Google** but does not select it. Add the new URL as an **Authorized redirect URI** on your OAuth client in Google Cloud Console, then select it in Lovable and click **Save**. Until you do, Google sign-in fails on the new domain with a redirect URI mismatch error. **Managed by Lovable** needs no change when you connect a domain.

> [!NOTE]
>
> Projects that configured their own credentials before the current setup existed may see a third option, **(Legacy) Your own credentials**. It is deprecated: switch to **Your own credentials** for automatic updates and improved branding and security.

## Troubleshooting "Your own credentials" setup

> **Redirect URI mismatch**
>
> * Ensure every redirect URL you selected in Lovable is added to Google Cloud
> * Check for missing or extra trailing slashes
> * Verify the scheme (`https` vs `http`) matches exactly

> **Consent screen issues**
>
> * Ensure the OAuth consent screen is configured correctly in Google Cloud
> * Add your account as a test user if the app is not published
> * Verify required scopes are configured

> **Wrong OAuth client type**
>
> * Use a **Web application** OAuth client
> * Mobile or desktop client types are not compatible with Lovable’s redirect flow

> **Authentication not working**
>
> * Confirm Google sign-in is enabled in **More → Users → Settings → Google**
> * Verify `Client ID` and `Client secret` values (your own credentials setup)
> * Ensure authentication UI is connected to the backend

## FAQ

> **Is the Lovable-managed Google authentication available for all Lovable apps?**
>
> No. **Lovable-managed** Google authentication is available only for apps using the **built-in backend**.

> **Can I use Google authentication without the built-in backend?**
>
> Yes. Google authentication can be added to apps not using the built-in backend, but it requires a manual setup outside of Lovable.
>
> For example, in apps not using the built-in backend, you might:
>
> * integrate Google OAuth directly in your frontend or backend code
> * use Google’s One Tap or standard OAuth sign-in flows
> * use a third-party authentication service such as Supabase Auth
> * manage OAuth credentials, redirect handling, and session logic yourself
>
> This page documents the **built-in backend implementation**, including managed Google authentication and the own-credentials flow specific to it.

> **Should I use the managed by Lovable option or my own credentials?**
>
> Use **Managed by Lovable** unless you specifically need to manage your own Google Cloud OAuth credentials, customize the consent screen branding, or configure custom OAuth scopes.

> **What information does Google share with my app?**
>
> By default, Google provides the user’s **email address** and **basic profile information**. No additional data is shared unless you configure custom OAuth scopes (your own credentials setup only).

> **Do users see the Google consent screen every time they sign in?**
>
> No. Users are shown the consent screen the **first time** they sign in with Google, or if requested permissions change.

> **Can I switch between "managed" and "your own credentials" later?**
>
> Yes. You can switch between **Managed by Lovable** and **Your own credentials** at any time. Existing user accounts are not affected.

> **Why am I seeing a redirect URI mismatch error?**
>
> This usually means the redirect URLs you selected in Lovable do not exactly match the **Authorized redirect URIs** configured in Google Cloud.
>
> * Ensure every redirect URL you selected in Lovable is added to Google Cloud.
> * Check the scheme, domain, path, and trailing slashes.

> **Does Google authentication replace email/password sign-in?**
>
> No. Google authentication is an additional sign-in method. You can offer Google sign-in alongside other authentication methods.

> **Do I need to configure Google Cloud Console when using "Managed by Lovable" setup?**
>
> No. Google Cloud Console configuration is only required when using **your own credentials**.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
