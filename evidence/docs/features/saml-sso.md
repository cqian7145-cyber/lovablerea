# Add SAML single sign-on to your app
<!-- source: https://docs.lovable.dev/features/saml-sso.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add SAML single sign-on to your app

> Let end users of your app sign in with their company identity provider, such as Okta, Microsoft Entra ID, Google Workspace, or any SAML 2.0 IdP.

> [!NOTE]
>
> This page documents **SAML SSO for your app's end users**. It is configured **per project** under **More → Users → Settings**.
>
> Looking for SSO for your **team's access to Lovable itself**? See [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md). Building an **internal tool for workspace members**? They may not need SAML at all: see [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

## Overview

The built-in backend supports **SAML 2.0 single sign-on (SSO)** for your app's end users. When enabled, users whose email domain matches your configuration are redirected to your identity provider (IdP), authenticate there, and return to your app already signed in.

It appears alongside your other sign-in methods under **More → Users → Settings**.

Setting up SAML is a **two-way exchange** between Lovable and your identity provider:

* **Lovable → IdP:** Copy two service-provider values (ACS URL and Audience URI) from Lovable into your IdP's SAML application.
* **IdP → Lovable:** Copy your IdP's metadata URL back into Lovable, along with the email domains that should use this IdP.

> [!NOTE]
>
> **Service provider (SP)-initiated sign-in only.** Users must start sign-in from your app. IdP-initiated SSO (starting from a tile in the IdP's dashboard) is not supported for your app's end users. It is available for [workspace SSO](https://docs.lovable.dev/features/business/sso.md#set-up-idp-initiated-login-saml).

## Why use SAML SSO

SAML SSO hands sign-in control to your customer's IT team:

* Centralized access management: Provision and de-provision in your identity provider, your app inherits those decisions
* Inherit your organization's MFA, conditional access, and device policies
* Frequently required by enterprise customers during security and compliance reviews
* Simpler sign-in for employees using their existing work accounts

If you only need consumer logins (email, Google, Apple, Microsoft), you do not need SAML SSO.

## Common use cases

SAML SSO fits apps whose users already have a work identity:

* B2B SaaS products selling to enterprise customers
* Internal tools where employees should sign in with their corporate identity
* Apps shipped to a single customer who requires their identity provider for access

## Prerequisites

You need the following before starting:

* A project on the [built-in backend](https://docs.lovable.dev/features/cloud) (auth must be Lovable-managed)
* SSO must be allowed by your workspace's [App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods) policy. The policy exists on Business and Enterprise workspaces; on other plans, all methods are allowed.
* **Admin access to a SAML 2.0 identity provider** (Okta, Microsoft Entra ID, Google Workspace, OneLogin, JumpCloud) that publishes a public metadata URL
* The list of **email domains** to route to that identity provider, for example `acme.com, acme.co.uk`

## Set up SAML SSO

Complete the following steps in order.

**1. In Lovable: Open the setup form and copy the SP values**

You can do this in the project chat or under **More → Users**.

\*\*Ask Lovable in the project chat \*\*

In your project chat, ask:

```text wrap theme={null}
Enable SAML SSO for this app
```

Lovable opens an interactive **Configure SAML SSO** form. The top of the form shows your project's **ACS URL** and **Audience URI (SP Entity ID)**. Leave the form open, you will fill in the metadata URL and domains in Step 3.

**Use the Users view**

* Open your project, then go to **More → Users → Settings → SAML SSO**.
* Toggle **Enable SAML 2.0 single sign-on** on.
* Expand **Advanced** to see the **Single sign-on URL (ACS URL)** and **Audience URI (SP Entity ID)**.

Copy both URLs. They look like:

* **ACS URL:** `https://<project-ref>.supabase.co/auth/v1/sso/saml/acs`
* **Audience URI:** `https://<project-ref>.supabase.co/auth/v1/sso/saml/metadata`

> [!TIP]
>
> If you already have your IdP's metadata URL when you start, include it in your prompt and Lovable will pre-fill the form so you only have to confirm:
>
> ```text wrap theme={null}
> Set up SAML SSO using https://acme.okta.com/app/xyz/sso/saml/metadata for the domain acme.com
> ```

**2. In your IdP: Create the SAML app and copy the metadata URL**

In your identity provider, create a new **SAML 2.0** application. Exact steps and field names vary by provider, use this mapping:

| Lovable value | Common IdP field names | What to enter |
| :- | :- | :- |
| ACS URL (from Step 1) | `Single Sign-On URL`, `SSO URL`, `Reply URL`, `Assertion Consumer Service URL` | Paste the ACS URL |
| Audience URI (from Step 1) | `SP Entity ID`, `Audience URI`, `Identifier` | Paste the Audience URI |
| Name ID format | `Name ID format`, `Name identifier format` | `EmailAddress` |
| Email attribute | `Attribute Statements`, `Claims`, `User Attributes` | Map the user's primary email to an `email` attribute |

Then:

* Assign the users or groups who should be able to sign in.
* Copy your IdP's **metadata URL**, you will need it in Step 3.

For provider-specific instructions, refer to your identity provider's official documentation.

**3. Back in Lovable: Paste the metadata URL and email domains**

Return to the form you opened in Step 1.

* **SAML metadata URL:** Paste the metadata URL you copied from your identity provider.
* **Domains**: comma-separated list of email domains to route to this identity provider, for example `acme.com, acme.co.uk`.

Click **Submit** (chat) or **Save** (UI). Users at those domains can now sign in through your SAML provider.

**4. Add a sign-in entry point in your app**

Enabling SAML configures authentication, but it does not automatically update your app's UI. Your sign-in screen still needs an entry point that starts the SSO flow.

Ask Lovable to add it:

```text wrap theme={null}
Add a "Sign in with SSO" option to my sign-in page that prompts for an email and routes users to their SAML provider
```

Lovable will update the relevant components in your app. When that is done, you are ready to [test the flow](#test-the-sign-in-flow).

## Test the sign-in flow

1. Open your published app in an **incognito** window.
2. Go to the sign-in page.
3. Enter an email address at one of your configured domains (for example, `you@acme.com`).
4. You should be redirected to your identity provider, authenticate there, and return to your app signed in.

If a user enters an email at a domain that is not in your SAML configuration, they will be offered the other sign-in methods you have enabled (for example, email, Google).

## Manage your SAML configuration

After setup, these are the operations you may need:

* **Disable SSO.** Toggle **Enable SAML 2.0 single sign-on** off. Existing users keep their accounts but can no longer sign in via SAML. They will need another enabled method.
* **Certificate rotation.** If your identity provider rotates its signing certificate, the metadata URL usually stays the same and Lovable re-fetches it. If the URL itself changes, update it here.
* **Edit the configuration.** Re-run the project chat flow or change the fields under **More → Users → Settings → SAML SSO**. Updates replace the existing connection.

## Limitations

Keep these constraints in mind:

* **One SAML provider per project.** You cannot connect two identity providers to the same project.
* **SP-initiated only.** No IdP-initiated tile launches.
* **Metadata URL only.** No XML upload or manual SP configuration.
* **No attribute-mapping UI.** The user's email comes from the SAML assertion as-is. Make sure your identity provider sends a stable email value.
* **No SCIM provisioning.** Users are created on first successful sign-in (just-in-time). Removing a user in your identity provider prevents future sign-ins, but stale rows may remain in your project's user table.
* **Domains route, they do not enforce.** Configuring `acme.com` does not disable email or Google sign-in for `acme.com` users, it only routes them to your identity provider when they sign in using SSO. To enforce SSO-only, disable the other sign-in methods.

## Troubleshooting

> **'Invalid metadata' when saving**
>
> The metadata URL must return SAML metadata XML and be reachable from the public internet.

> **User is not redirected to the IdP**
>
> The user's email domain is not in your **Domains** list, or they used a method (Google or email) that bypasses domain routing.

> **Sign-in succeeds at the IdP but the user lands back on the sign-in page**
>
> Almost always one of two things:
>
> * Your app isn't reading the session after the redirect. Make sure you have an `onAuthStateChange` listener and that the SSO callback route is handled.
> * Your app's URL isn't in the redirect allow-list. If unsure, ask Lovable to:
>   ```text wrap theme={null}
>   Wire up the SSO redirect handling on my sign-in page
>   ```

> **Sign-in fails after IdP login**
>
> The SAML assertion is missing an email, or the **ACS URL** / **Audience URI** in your IdP does not exactly match the values shown in Lovable's **Advanced** section. Re-check both.

> **Invalid SAML response**
>
> Clock skew between your IdP and Lovable, or signing certificate mismatch. Re-fetch the metadata URL or update your IdP's clock.

> **Email claim missing (Microsoft Entra ID)**
>
> Map `email` to `user.mail`. If `user.mail` is empty, use `user.userprincipalname`.

## FAQ

> **How is app SAML SSO different from the workspace-level SSO?**
>
> Workspace-level SSO controls how **your team logs in to Lovable** (the product). The SAML SSO described on this page controls how **end users log in to your app**. See [Set up single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md) for the workspace-level feature.

> **Which SSO providers does app SAML SSO support?**
>
> Any SAML 2.0-compliant IdP that publishes a metadata URL: Okta, Microsoft Entra ID, Google Workspace, OneLogin, JumpCloud, Auth0 (SAML mode), and others.

> **Does Lovable also support OIDC for apps?**
>
> Yes. Connect an OpenID Connect provider under **More → Users → Settings → OIDC**. See [Add OpenID Connect (OIDC) sign-in to your app](https://docs.lovable.dev/features/oidc-auth.md).

> **Can I have multiple SAML providers for the same project?**
>
> No. One SAML provider per project.

> **Does app SAML SSO support IdP-initiated sign-in?**
>
> No. App end-user SSO is SP-initiated only: users must start sign-in from your app.
>
> IdP-initiated SAML is available for workspace SSO (your team's login to Lovable). See [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md#set-up-idp-initiated-login-saml).

> **Does Lovable support JIT user provisioning?**
>
> Yes. Users are created the first time they successfully sign in via SAML.

> **Does Lovable support SCIM for app SAML SSO?**
>
> No. There is no SCIM provisioning surface for app SAML. Manage user lifecycle in your IdP. When you remove a user there, future sign-ins are blocked.

> **Can I edit the SAML configuration after saving?**
>
> Yes. Re-run the chat flow or change the fields in the UI. Updates replace the existing connection.

> **Does enabling SAML disable other sign-in methods?**
>
> No. Other methods stay enabled unless you turn them off explicitly. To enforce SSO-only sign-in, disable email, Google, and any other methods you do not want.


## Related topics

- [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md)
- [Add OpenID Connect (OIDC) sign-in to your app](https://docs.lovable.dev/features/oidc-auth.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
