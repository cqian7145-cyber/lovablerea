# Add OpenID Connect (OIDC) sign-in to your app
<!-- source: https://docs.lovable.dev/features/oidc-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add OpenID Connect (OIDC) sign-in to your app

> Let your app's users sign in with your own OpenID Connect provider, such as Auth0, Okta, Microsoft Entra ID, or Keycloak, on the built-in backend (Cloud).

> [!NOTE]
>
> This page is about **OIDC sign-in for your app's users**, where you connect your own identity provider under **More → Users → Settings**. Looking for sign-in to Lovable itself for your team? See [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md). Looking for a SAML 2.0 provider? See [SAML SSO](https://docs.lovable.dev/features/saml-sso.md). The three are different features.

With **OIDC sign-in**, people sign in to your app with the OpenID Connect identity provider your organization already runs, such as Auth0, Okta, Microsoft Entra ID, or Keycloak. Your identity provider decides who can sign in, and it keeps its own password, MFA, and device rules. Your app receives the person's email address and profile.

**OIDC sign-in** fits internal tools, apps built for one customer, and B2B products whose users have a work identity. It sits next to the other sign-in methods in your project's authentication settings, on all plans. You enter the client secret in those settings, not in the project chat, and Lovable keeps it masked.

## Prerequisites

Before you start, check that you have:

* A project on the [built-in backend (Cloud)](https://docs.lovable.dev/features/cloud) with authentication enabled, so **More → Users** shows the **Settings** button.
* Edit access to the project.
* Admin access to an OpenID Connect provider, so you can register an application and get its issuer URL, client ID, and client secret.
* On Business and Enterprise workspaces, **SSO** allowed under [App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods). That one setting covers both SAML and OIDC sign-in. When your workspace blocks it, you cannot enable **OIDC sign-in**.

## Set up OIDC sign-in

In these steps you copy values between Lovable and your identity provider.

**1. Enable OIDC in your project**

Open your project, then go to **More → Users → Settings** and select **OIDC**. Enable **OIDC sign-in**. The form shows the **Redirect URI** for your project. Copy it.

**2. Register your app with your identity provider**

In your identity provider, create an OpenID Connect web application and add the redirect URI you copied. Field names vary by provider, for example **Sign-in redirect URIs** in Okta or **Redirect URIs** in Microsoft Entra ID. Note the application's issuer URL, client ID, and client secret.

**3. Enter the provider details in Lovable**

Back in the **OIDC** form, enter:

* **Issuer URL**: the issuer address your provider publishes, for example `https://your-org.okta.com`. It must start with `https://`, and it ends before the `/.well-known/openid-configuration` part.
* **Client ID**: the client ID your provider issued.
* **Client secret**: the client secret your provider issued.

Select **Save**. The **OIDC** row shows **Enabled**, and Lovable starts a build in the project chat that adds the OIDC sign-in button to your app. That build is treated as standard build usage and consumes credits.

**4. Test the sign-in**

Open your app's sign-in page in a private browser window and select the new sign-in button. Your identity provider asks you to sign in, then returns you to the app signed in.

## Manage OIDC sign-in

Open **More → Users → Settings → OIDC** to change the configuration:

* To rotate the client secret, enter the new secret and save. Leave the field blank to keep the stored secret.
* To stop OIDC sign-in, disable **OIDC sign-in** and save. People can no longer sign in with your identity provider until you enable it again, and their accounts stay in your **Users** list. Lovable starts a build that removes the sign-in button from your app.

## Limitations

OIDC sign-in works with any OpenID Connect provider, within these limits:

* **One OIDC provider per project.** You cannot connect a second identity provider to the same project.
* **Fixed scopes.** Scopes are what your app asks the provider to share. Lovable asks for `openid`, `profile`, and `email`, and you cannot change that list.
* **Issuer URL over HTTPS only.** Providers that only serve their configuration over HTTP cannot be connected.
* **Not available on self-hosted backends.** Apps whose backend your organization hosts itself cannot use OIDC sign-in. Saving the form fails with a message that says so.


## Related topics

- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Sign in with Lovable](https://docs.lovable.dev/integrations/sign-in-with-lovable.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Users and authentication](https://docs.lovable.dev/features/authentication.md)
