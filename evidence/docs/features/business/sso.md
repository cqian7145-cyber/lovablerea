# Set up workspace single sign-on (SSO)
<!-- source: https://docs.lovable.dev/features/business/sso.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up workspace single sign-on (SSO)

> Connect Okta, Auth0, Microsoft Entra ID, or any OIDC/SAML 2.0 provider to enable secure, centralized authentication for your workspace.

> [!NOTE]
>
> This page documents **workspace-level SSO for your team's access to Lovable itself**. It is configured at the workspace level under [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**).
>
> Looking for SAML SSO for the **end users of your app**? See [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md). Want apps you build to **recognize logged-in workspace members without a login page**? See [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md). Both are different features.

Single sign-on (SSO) is available on **Business** and **Enterprise** plans and enables secure, centralized authentication across your company. With SSO, users can access Lovable with one set of credentials, simplifying access management and improving security.

> [!NOTE]
>
> **Service provider (SP)-initiated login** is supported for all providers: users start login from Lovable.
>
> **Identity provider (IdP)-initiated SSO** (starting from an IdP dashboard tile) can optionally be enabled for **SAML** providers. See [Set up IdP-initiated login (SAML)](#set-up-idp-initiated-login-saml). OIDC providers support SP-initiated login only.

To let members use Lovable from Claude through this SSO provider, see [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md). Claude supports this flow with **Okta only**.

> [!NOTE]
>
> If your workspace belongs to an [organization](https://docs.lovable.dev/features/organizations), an org admin can set up SSO once for every workspace. See [Set up SSO for the organization](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization). If the workspace is **Managed by the organization**, its **Identity** tab shows that the organization manages these settings.

## Supported SSO protocols

Lovable supports both **OIDC** and **SAML 2.0** protocols, enabling integration with all major **identity providers (IdP)** including Okta, Auth0, Microsoft Entra ID (Azure AD), and more.

* **OpenID Connect (OIDC)**: recommended. A modern identity layer built on OAuth 2.0 that verifies who is logging in.
* **SAML (Security Assertion Markup Language) 2.0**: XML-based protocol for exchanging authentication and authorization data, widely used in enterprise environments.

## Prerequisites

To connect your identity provider to Lovable using OIDC or SAML, you need:

* **Admin access to your identity provider**
* **Workspace owner or admin role** in Lovable
* A **verified domain** in Lovable, to prove domain ownership
  > [!NOTE]
  >
  > To verify your domain, add the `TXT` record displayed in the UI to your DNS provider. See [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md) for the full walkthrough, including record details and troubleshooting.

## Start SSO setup in Lovable

SSO configuration is a **two-way setup** between Lovable and your identity provider:

* **Lovable → IdP:** copy Lovable URLs and settings into your IdP app.
* **IdP → Lovable:** copy your IdP’s issuer, metadata, and certificates back into Lovable.

The workspace **owner** or **admin** can set up SSO. To start, go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click **Add provider** in the **SSO providers** section. On the **Choose SSO Protocol** screen, click **Configure OIDC** or **Configure SAML**.

> [!NOTE]
>
> **Add provider** stays disabled until your workspace has a verified domain and shows **Add a verified domain first**. Add one in the **Verified domains** section, then start SSO setup.

The setup then runs in three stages:

1. **Preparation.** Lovable shows what to configure in your IdP, such as the app type, scopes, and attribute mappings, and the Lovable URLs to copy into your IdP. The values are listed in the reference below.
2. **Configuration.** You enter your IdP's issuer and client credentials or certificates, a display name, and the verified domain your login URL is based on. The provider guides below list the exact fields.
3. **Test and confirm.** For OIDC, **Test configuration** checks your values before you continue. Both protocols end on a confirmation page where you click **Confirm & enable SSO**.

### IdP configuration reference

Use these values while configuring OIDC or SAML in your IdP. Lovable shows the same values on the preparation screens, with copy buttons on the URLs.

**OIDC**

* Application type: `Web Application` or `Server-side Application`
* Grant type: `Authorization Code`
* Token method: `POST` (if configurable)
* Redirect URI to copy and add to your IdP: `https://auth.lovable.dev/__/auth/handler`
* OAuth scopes:
  * Required: `openid`, `email`
  * Recommended: `profile`
* Optional claims: `department`, `title`, `division`, `manager`, for the member's department, job title, division, and manager's display name. Lovable also accepts `departmentName`, `jobTitle`, `managerDisplayName`, and `managerName`. Claim names are case-sensitive. Lovable shows the department in [Insights](https://docs.lovable.dev/features/insights.md#adoption-by-department).

**SAML**

* ACS URL (Assertion Consumer Service): `https://auth.lovable.dev/__/auth/handler`
* SP Entity ID / Audience URI: `https://auth.lovable.dev/__/auth/handler`
* IdP-initiated ACS URL (optional, see [Set up IdP-initiated login (SAML)](#set-up-idp-initiated-login-saml)): `https://api.lovable.dev/sso/saml/idp-consume`
* Attribute mappings:
  * `displayName` (recommended): map to user's full name
  * `photoURL` (recommended): map to user's profile picture URL
  * `department`, `title`, `division`, `manager` (optional): map to the member's department, job title, division, and manager's display name. Lovable also accepts `departmentName`, `jobTitle`, `managerDisplayName`, and `managerName`. Attribute names are case-sensitive. Lovable shows the department in [Insights](https://docs.lovable.dev/features/insights.md#adoption-by-department).
  * Email is not a separate attribute. Lovable reads it from the Name ID, so the Name ID source must be the user's email address, not a login identifier.
* Protocol settings:
  * Name ID format: `EmailAddress`
  * Signature algorithm: `RSA-SHA256`
  * SAML binding: `HTTP-POST`
  * Response signed: yes

### Your SSO login URL

Each provider gets a login URL that members can use to log in with SSO directly: `https://lovable.dev/sso-login/{tenantId}`. The `{tenantId}` part is your verified domain with dots replaced by hyphens, for example `acme-com` for `acme.com`. If you enter a **Login URL suffix** during setup, Lovable appends it, for example `acme-com-engineering`. Login identifiers are unique across Lovable, so a second workspace on the same domain needs a suffix. After setup, the URL appears in the **SSO providers** row and in the provider's **Login URL** field, each with a copy button.

### Enforce SSO

**Enforce SSO** requires an active SSO session to use the workspace. Members who log in another way are asked to log in through your provider before they can access it. The toggle in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) becomes available when your workspace has a verified domain and an SSO provider. Test an SSO login before you enable it: for six hours after you add a provider, the toggle stays disabled and shows **Wait 6 hours and test SSO login before enforcing SSO**.

When you enable the toggle, Lovable opens the **Enable enforce SSO** dialog:

* Keep **Remove all external collaborators** selected and click **Enable and remove** to remove external collaborators from every project in the workspace.
* Clear it and click **Enable** to keep them. Lovable then sets the external collaborator level to allow all collaborators. You can change it later in [**Workspace settings → Security → Privacy & security**](https://lovable.dev/settings/privacy-security). See [Privacy and security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md).

While SSO is enforced, invite links only work for people whose email is on one of your verified domains. Use **Session duration** to choose how long members stay logged in before Lovable requires a new SSO login: **8 hours**, **24 hours**, **48 hours**, or **7 days**.

> [!NOTE]
>
> **Enforce SSO** and [Require two-factor authentication](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication) are mutually exclusive. When you enable **Enforce SSO**, Lovable automatically disables **Require two-factor authentication**. Under enforced SSO, your identity provider is responsible for multi-factor authentication.

## Provider-specific setup guides

If you use Okta, Auth0, or Microsoft Entra, you can find provider-specific documentation for setting up SSO. If you use another provider, see [Configure other providers](#configure-other-providers).

Before you begin, complete [Start SSO setup in Lovable](#start-sso-setup-in-lovable) to get the settings and values you need to use in your IdP.

For more information, refer to your IdP's official documentation.

### Configure Okta as your SSO provider

**OIDC**

**1. Add the Lovable app in Okta**

* In the **Okta Admin Console**, go to **Applications → Browse App Catalog**.
* Search for **Lovable**, then click **Add Integration**.
* On the **General Settings** screen, set the **Application label** (for example, `Lovable OIDC`), then click **Next**.
* On the **Sign-On Options** screen, select **OpenID Connect**.
* Set **Application username format** to **Email**.
* Click **Done**.

**2. Provide Lovable with your IdP information**

In Okta, copy the following values from the **Sign On** tab and enter them in Lovable.

* Okta `Issuer URL` → Lovable `OIDC Issuer URL / Discovery Endpoint`
  > [!NOTE]
  >
  > To find your issuer, click the **OpenID Provider Metadata** link on the **Sign On** tab. The issuer is your Okta domain, for example `https://your-org.okta.com`.
* Okta `Client ID` → Lovable `OAuth Client ID / Application ID`
* Okta `Client Secret` → Lovable `OAuth Client Secret`
* Optionally, the date the client secret expires → Lovable `Client secret expiration (optional)`

**3. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**4. Test the configuration in Lovable**

In Lovable, click **Test configuration**. Lovable checks the issuer, client ID, and client secret and shows the outcome on the **Test results** screen. Fix anything it reports, then click **Configure provider**.

**5. Finish OIDC provider configuration in Lovable**

In Lovable, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Okta as your OIDC SSO provider.

**SAML**

**1. Add the Lovable app in Okta**

* In the **Okta Admin Console**, go to **Applications → Browse App Catalog**.
* Search for **Lovable**, then click **Add Integration**.
* On the **General Settings** screen, set the **Application label** (for example, `Lovable SAML`), then click **Next**.
* On the **Sign-On Options** screen, select **SAML 2.0**.
* Set **Application username format** to **Email**.
* Click **Done**.

> [!NOTE]
>
> The SAML settings (ACS URL and Audience URI) are pre-configured by the Lovable integration. You do not need to enter any SAML values manually in Okta.
>
> Because these settings cannot be changed, the catalog app does not support [IdP-initiated login](#set-up-idp-initiated-login-saml) yet. For now, users logging in through Okta must start login from Lovable.

**2. Provide Lovable with your IdP information**

In Lovable, choose between quick SAML provider setup or manual configuration:

**Option 1: Quick setup - import from metadata URL**

* In Okta, open the **Sign On** tab of the Lovable application, scroll to **Metadata details**, and copy the **Metadata URL**.
* In Lovable, paste the metadata URL in **Quick setup: import from metadata URL** field.
* Click **Test & import** to automatically populate the required fields below.

**Option 2: Manual configuration**

Open the metadata URL in a new tab. Copy the following values and enter them in Lovable.

* Okta `SingleSignOnService Location` → Lovable `SAML SSO Sign-on URL (from your IdP)`
* Okta `EntityID` → Lovable `Identity Provider Entity ID / Issuer`
* Okta `X509Certificate` → Lovable `X.509 signing certificates`
  > [!NOTE]
  >
  > Paste the certificate value between the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

**3. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**4. Finish SAML provider configuration in Lovable**

In Lovable, click **Configure SAML provider**, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Okta as your SAML SSO provider.

### Configure Auth0 as your SSO provider

**OIDC**

**1. Create an application in Auth0**

* Go to **Auth0 Admin Dashboard → Applications**.
* Click **Create application**. Select the **Regular Web Applications** application type.
* Give the app a name, for example `Lovable OIDC SSO`.
* Click **Create**.

**2. Configure Allowed Callback URLs**

* In Auth0, go to your application settings.
* Add the **Allowed Callback URLs**: `https://auth.lovable.dev/__/auth/handler`
* Click **Save**.

**3. Provide Lovable with your IdP information**

In Auth0, copy the following values from the **Settings** tab and enter them in Lovable.

* Auth0 `Domain` → Lovable `OIDC Issuer URL / Discovery Endpoint` (include `https://`)
* Auth0 `Client ID` → Lovable `OAuth Client ID / Application ID`
* Auth0 `Client Secret` → Lovable `OAuth Client Secret`
* Optionally, the date the client secret expires → Lovable `Client secret expiration (optional)`

**4. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**5. Test the configuration in Lovable**

In Lovable, click **Test configuration**. Lovable checks the issuer, client ID, and client secret and shows the outcome on the **Test results** screen. Fix anything it reports, then click **Configure provider**.

**6. Finish OIDC provider configuration in Lovable**

In Lovable, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Auth0 as your OIDC SSO provider.

**SAML**

**1. Create an application in Auth0**

* Go to **Auth0 Admin Dashboard → Applications.**
* Click **Create application**. Select the **Regular Web Applications** application type.
* Give the app a name, for example `Lovable SAML SSO`.
* Click **Create**.

**2. Configure Allowed Callback URLs**

* In Auth0, go to your application settings.
* Add the **Allowed Callback URLs**: `https://auth.lovable.dev/__/auth/handler`
* Click **Save**.

**3. Configure SAML2 Web App Add-on**

* In Auth0, navigate to **Addons**, and enable **SAML2 Web app**.
* In **Addon: SAML2 Web app → Settings**, set:
  * Application Callback URL: `https://auth.lovable.dev/__/auth/handler`
  * Settings: paste the following `mappings` JSON

```json theme={null}
    {
      "mappings": {
        "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      },
      "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
    }
```

* Click **Enable.**

**4. Provide Lovable with your IdP information**

In Lovable, choose between quick SAML provider setup or manual configuration:

**Option 1: Quick setup - import from metadata URL**

* In **Auth0 → Addon: SAML2 Web app → Usage**, locate the **Identity Provider Metadata**, and click the arrow icon to get the URL.
* In Lovable, paste the metadata URL in **Quick setup: import from metadata URL** field.
* Click **Test & import** to automatically populate the required fields below.

**Option 2: Manual configuration**

In **Auth0 → Addon: SAML2 Web app → Usage**, copy the following **SAML Protocol Configuration Parameter** values and enter them in Lovable.

* Auth0 `Identity Provider Login URL` → Lovable `SAML SSO Sign-on URL (from your IdP)`
* Auth0 `Issuer` → Lovable `Identity Provider Entity ID / Issuer`
* Auth0 `Identity Provider Certificate` (`X509Certificate`) → Lovable `X.509 signing certificates`
  > [!NOTE]
  >
  > Download Auth0 certificate and copy the `X509Certificate` value. Paste the certificate value between the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

**5. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**6. Finish SAML provider configuration in Lovable**

In Lovable, click **Configure SAML provider**, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Auth0 as your SAML SSO provider.

### Configure Microsoft Entra ID as your SSO provider

**OIDC**

> [!NOTE]
>
> Microsoft publishes its own walkthrough of this integration, [Configure Lovable (OIDC) for Single sign-on with Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/saas-apps/lovable-oidc-tutorial), which covers the same setup as the steps below.

**1. Add the Lovable app in Microsoft Entra ID**

* In the [Microsoft Entra admin center](https://entra.microsoft.com), go to **Entra ID → Enterprise apps → New application**.
* In the **Add from the gallery** section, search for **Lovable**, select it in the results, and add it to your tenant.
* Open the app, go to **Single sign-on**, and select **Go to application** to open the app's registration.

> [!NOTE]
>
> Adding Lovable from the gallery replaces creating your own app registration. You still add the redirect URI, grant the permissions, and create a client secret in the steps below.

**2. Add the Lovable redirect URI**

* In the app's registration, go to **Authentication**.
* In **Redirect URIs**, add `https://auth.lovable.dev/__/auth/handler`.
* Click **Configure**.

> [!NOTE]
>
> The URL must match exactly, including the `https://` protocol.

**3. Configure the optional claims**

* In Microsoft Entra, go to **Token configuration → Add optional claim**.
* Select **ID token** and add the `email` claim.
* Click **Add**.

> [!NOTE]
>
> Lovable requires an email address in the ID token and has no fallback to the user principal name (UPN), so login fails for users whose token carries no `email` claim.

**4. Configure the API permissions**

* In Microsoft Entra, go to **API permissions**, and check that the **Microsoft Graph** delegated permissions Lovable needs are listed:
  * `email`
  * `openid`
  * `profile`
* To add any that are missing, click **Add a permission → Microsoft Graph → Delegated permissions**, select them, then click **Add permissions**.
* Click **Grant admin consent**.

**5. Create a client secret**

* In Microsoft Entra, go to **Certificates & secrets → Client secrets → New client secret**.
* Enter a description, choose an expiry, and click **Add**. Note the expiration date so you can record it in Lovable.
* Copy the secret **Value** immediately. It isn't shown again after you leave the page.

**6. Provide Lovable with your IdP information**

In Lovable, enter the following:

* `OIDC Issuer URL / Discovery Endpoint`: format the URL as `https://login.microsoftonline.com/{TENANT_ID}/v2.0`
  > [!NOTE]
  >
  > Replace the `{TENANT_ID}` with the **Directory (tenant) ID** from the **Overview** page in Microsoft Entra.
* Microsoft Entra `Application (Client) ID`, from the **Overview** page → Lovable `OAuth Client ID / Application ID`
* The Microsoft Entra `Client secret` value you copied → Lovable `OAuth Client Secret`
* Optionally, the date the client secret expires → Lovable `Client secret expiration (optional)`

**7. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**8. Test the configuration in Lovable**

In Lovable, click **Test configuration**. Lovable checks the issuer, client ID, and client secret and shows the outcome on the **Test results** screen. Fix anything it reports, then click **Configure provider**.

**9. Finish OIDC provider configuration in Lovable**

In Lovable, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Microsoft Entra ID as your OIDC SSO provider.

**SAML**

**1. Create an enterprise app in Microsoft Entra ID**

* Go to **Microsoft Entra ID admin center → Enterprise applications**, and select **New application**.
* Select **Create your own application** and choose **Integrate any other application you don’t find in the gallery (Non-gallery)**.
* Give the app a name, for example `Lovable SAML SSO`.
* Click **Create**. Your application is now created.

**2. Configure SAML SSO**

In Microsoft Entra, navigate to the **Single sign-on** setup page and select **SAML**. Under **Basic SAML Configuration**, enter the following:

* Identifier (Entity ID): `https://auth.lovable.dev/__/auth/handler`
* Reply URL (Assertion Consumer Service URL): `https://auth.lovable.dev/__/auth/handler`

Leave the other values blank and select **Save**.

> [!NOTE]
>
> To let users log in to Lovable from the Microsoft **My Apps** portal, add a second **Reply URL (Assertion Consumer Service URL)**: `https://api.lovable.dev/sso/saml/idp-consume`, and select it as the **Default** reply URL. See [Set up IdP-initiated login (SAML)](#set-up-idp-initiated-login-saml) for requirements.

**3. Provide Lovable with your IdP information**

When the application is set up in Microsoft Entra, you can choose between quick SAML provider setup or manual configuration in Lovable.

**Option 1: Quick setup - import from metadata URL**

* In Microsoft Entra, go to **SAML Certificates** and copy the **App Federation Metadata URL**.
* In Lovable, paste the **App Federation Metadata URL** in **Quick setup: import from metadata URL** field.
* Click **Test & import** to automatically populate the required fields below.

**Option 2: Manual configuration**

Copy the following values in Microsoft Entra and enter them in Lovable.

* Microsoft Entra `Login URL` → Lovable `SAML SSO Sign-on URL (from your IdP)`
* Microsoft Entra `Microsoft Entra Identifier` → Lovable `Identity Provider Entity ID / Issuer`
* Microsoft Entra `X509Certificate` → Lovable `X.509 signing certificates`
  > [!NOTE]
  >
  > You can download the certificate (Base 64) or open the `App Federation Metadata URL` in a new tab and copy the `X509Certificate` value. Paste the certificate value between the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

**4. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**5. Finish SAML provider configuration in Lovable**

In Lovable, click **Configure SAML provider**, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of Microsoft Entra ID as your SAML SSO provider.

## Configure other providers

You can configure any OIDC or SAML-compliant provider with Lovable SSO.

Before you begin, complete [Start SSO setup in Lovable](#start-sso-setup-in-lovable) to get the settings and values you need to use in your IdP.

**OIDC**

**Provider mapping**

Common field names across providers:

* Redirect URI: `Callback URL`, `Sign-in redirect URI`
* Issuer/Domain: `Issuer URL`, `Authority`, `Okta domain`, `Auth0 domain`, `Tenant domain`
* Client credentials: `Client ID` and `Client Secret`

**Steps**

**1. Create an OIDC confidential app**

Create a new OIDC Web application in your identity provider.

**2. Configure redirect URI**

In Redirect/Callback URLs, add `https://auth.lovable.dev/__/auth/handler`

**3. Enable required scopes**

Ensure `openid` and `email` scopes are enabled and consented if needed.

**4. Provide Lovable with your IdP information**

In your IdP, locate the corresponding values and enter them in Lovable:

* `Domain` or `Issuer URL` → Lovable `OIDC Issuer URL / Discovery Endpoint`
* `Client ID` → Lovable `OAuth Client ID / Application ID`
* `Client Secret` → Lovable `OAuth Client Secret`
* Optionally, the date the client secret expires → Lovable `Client secret expiration (optional)`

**5. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**6. Test the configuration in Lovable**

In Lovable, click **Test configuration**. Lovable checks the issuer, client ID, and client secret and shows the outcome on the **Test results** screen. Fix anything it reports, then click **Configure provider**.

**7. Finish OIDC provider configuration in Lovable**

In Lovable, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of your OIDC SSO provider.

**SAML**

**Provider mapping**

Common field names across providers:

* ACS URL: `Single Sign-On URL`, `SSO URL`, `Reply URL`, `Assertion Consumer Service URL`
* Audience: `SP Entity ID`, `Audience URI`, `Identifier`
* Attribute mapping: `Attribute Statements`, `User Attributes & Claims`

**Steps**

**1. Create a SAML 2.0 application**

Create a new SAML 2.0 application in your provider.

**2. Configure endpoints**

* ACS URL: `https://auth.lovable.dev/__/auth/handler`
* Audience / Entity ID: `https://auth.lovable.dev/__/auth/handler`

**3. Map attributes**

Ensure `email` is included in the SAML assertion. `displayName` is optional.

**4. Assign users**

Assign the application to users/groups who should access Lovable.

**5. Provide Lovable with your IdP information**

In Lovable, choose between quick SAML provider setup or manual configuration:

**Option 1: Quick setup - import from metadata URL**

* In your IdP, locate your SAML metadata URL (typically found in the SAML application settings or metadata details)
* In Lovable, paste the metadata URL in **Quick setup: import from metadata URL** field.
* Click **Test & import** to automatically populate the required fields below.

**Option 2: Manual configuration**

In your IdP, locate the corresponding values and enter them in Lovable:

* `Login URL` → Lovable `SAML SSO Sign-on URL (from your IdP)`
* `Identifier/Issuer/Entity ID` → Lovable `Identity Provider Entity ID / Issuer`
* `X509Certificate` → Lovable `X.509 signing certificates`

**6. Configure the display name and login URL**

In Lovable, fill in the remaining fields:

* **Display Name**: The name shown to users during authentication.
* **Verified domain**: The verified domain your login URL is based on. Lovable preselects it when you have only one.
* **Login URL suffix (optional)**: An addition to the login URL, for example `engineering`. Lovable shows the resulting URL below the field. See [Your SSO login URL](#your-sso-login-url).

**7. Finish SAML provider configuration in Lovable**

In Lovable, click **Configure SAML provider**, review the confirmation page, then click **Confirm & enable SSO** to finish the configuration of your SAML SSO provider.

## Set up IdP-initiated login (SAML)

With **IdP-initiated SSO**, users start login from your identity provider's app portal (for example, an Okta dashboard tile or the Microsoft **My Apps** portal) instead of from Lovable. IdP-initiated login is **optional** and available for **SAML** providers on **Business** and **Enterprise** plans. It requires no additional configuration in Lovable. SP-initiated login from Lovable keeps working as long as your IdP app still accepts the standard ACS URL (`https://auth.lovable.dev/__/auth/handler`). If your provider has only one ACS URL field, use a dedicated app for IdP-initiated login so both flows keep working.

### Requirements

* A configured **SAML** SSO provider. OIDC providers support SP-initiated login only.
* Your workspace is the **only** workspace that has verified your email domain. IdP-initiated login is disabled automatically while another workspace has the same domain verified.
* Your IdP **signs** the SAML response (or the assertion within it) and scopes it to the Lovable SP Entity ID (`https://auth.lovable.dev/__/auth/handler`) through an Audience Restriction.

> [!NOTE]
>
> When a requirement is not met (for example, a second workspace verifies the same email domain), IdP-initiated login stops working and users see an error page such as `Forbidden` or `Unauthorized`. Login from Lovable is not affected, and you can switch back to SP-initiated login only at any time. See [Troubleshooting](#troubleshooting).

### Enable IdP-initiated login

Configure your SAML app (or a dedicated IdP-initiated app) to post the SAML response to the IdP-initiated ACS URL: `https://api.lovable.dev/sso/saml/idp-consume`

Keep the SP Entity ID / Audience URI unchanged: `https://auth.lovable.dev/__/auth/handler`.

**Okta**

> [!NOTE]
>
> The Lovable app in the Okta App Catalog does not support IdP-initiated login yet. Its SAML settings are pre-configured and cannot be changed. For now, users logging in through Okta must start login from Lovable.

**Microsoft Entra ID**

* In your Lovable SAML enterprise application, go to **Single sign-on → Basic SAML Configuration**.
* Add `https://api.lovable.dev/sso/saml/idp-consume` as an additional **Reply URL (Assertion Consumer Service URL)** and select it as the **Default** reply URL. Microsoft Entra sends IdP-initiated responses to the default reply URL.
* Keep the **Identifier (Entity ID)** as `https://auth.lovable.dev/__/auth/handler`, and select **Save**.
* Users can now log in to Lovable from the **My Apps** portal.

**Auth0 and other providers**

* In your SAML application, set the ACS URL used for IdP-initiated login to `https://api.lovable.dev/sso/saml/idp-consume`. Providers also call this field **Single sign-on URL**, **Reply URL**, or **Assertion Consumer Service URL**. In Auth0, it is the **Application Callback URL** in the **SAML2 Web App** addon. The addon has a single callback URL, so create a dedicated Auth0 application for IdP-initiated login.
* Keep the Audience / Entity ID as `https://auth.lovable.dev/__/auth/handler`.
* Make sure your provider signs SAML responses or assertions.

> [!NOTE]
>
> IdP-initiated login is optional. If it does not work for your setup, point your SAML app back to `https://auth.lovable.dev/__/auth/handler`. This disables IdP-initiated login, and users log in from Lovable as usual. See [Troubleshooting](#troubleshooting).

## Map IdP groups to workspace roles

You can map the groups your identity provider sends in its login claims to Lovable workspace roles, so people receive the right role automatically, and optionally restrict SSO login to mapped groups only. Mappings can also add members to your workspace [groups](https://docs.lovable.dev/features/groups.md). See [Add members to workspace groups automatically](#add-members-to-workspace-groups-automatically). Group mappings work with both OIDC and SAML providers on **Business** and **Enterprise** plans.

To manage group mappings, go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and find **Provisioning groups**. If you have multiple SSO providers, use the section for the provider you want to configure. There you can:

* **Map an IdP group to a workspace role.** Click **Add group**. In **Add provisioning group**, enter the **Group name** exactly as your IdP sends it, then choose a **Default role**: **Viewer**, **Editor**, or **Admin**. Workspace owners can also select **Owner**. Click **Add**. Users whose login includes a matching group claim get that role when they join. Claims must match mappings exactly, including capitalization. If several mapped groups match, the highest-privilege role wins.
* **Enable Group restriction.** While it is disabled, matched users get their group's role and everyone else logs in with the provider's **Default role for new members** (**Editor** if you haven't changed it). While it is enabled, only users whose IdP group matches one of your mappings can log in through the provider. Everyone else is denied.

> [!NOTE]
>
> Your IdP must include group information in its login claims for mappings to match. See [Send group claims from your IdP](#send-group-claims-from-your-idp).
>
> Role mapping and group membership sync also require [SSO login (JIT) provisioning](https://docs.lovable.dev/features/workspace-identity#sso-login) to be enabled. With JIT disabled, matched users log in without receiving a mapped role or group membership. **Group restriction** applies either way.

### Add members to workspace groups automatically

Group mappings also provision group membership. When a user logs in through SSO with a group claim that matches a mapping, Lovable adds the user to the workspace [group](https://docs.lovable.dev/features/groups.md) with the same name as that mapping.

* **Groups are matched by name.** To add members to an existing Lovable group, enter its exact name in **Group name**, including capitalization.
* **Lovable creates the group if it does not exist.** The first matching login creates a workspace group named after the mapping and adds the user to it. Groups control access to projects, folders, and published apps, so review what a new group can access in [Groups](https://lovable.dev/settings/groups) (**Workspace settings → Access → Groups**). Unmapped group claims never create groups.
* **SCIM-managed groups are the exception.** If your workspace groups come from [SCIM provisioning](https://docs.lovable.dev/features/business/scim.md), Lovable does not create groups from login claims.
* **Membership is only added, never removed.** Lovable does not remove anyone from a group based on login claims. Remove members from groups yourself if needed. To manage the full group lifecycle from your IdP, including removals, use [SCIM provisioning](https://docs.lovable.dev/features/business/scim.md) on the **Enterprise** plan.

### Send group claims from your IdP

Lovable reads groups from a claim named `groups` in the login response, for both OIDC and SAML providers. The default SAML group claim names used by Microsoft Entra ID (`http://schemas.microsoft.com/ws/2008/06/identity/claims/groups`) and AD FS (`http://schemas.xmlsoap.org/claims/Group`) are also recognized, so you can keep those defaults.

The claim must contain group **names**, not group IDs. Send names as multiple attribute values, or as a single value separated by commas or semicolons.

**Okta**

Configure the group claim on your Lovable app in the **Okta Admin Console**.

**SAML**

Where the group attribute is configured depends on how you added the Lovable app:

* **App Catalog app**: the app's SAML settings are pre-configured and cannot be edited. Open the app's **Sign On** tab and look for a **Group Attribute Statements** section there. If the app doesn't offer one, it cannot send group claims: use the Lovable OIDC app instead, or create a custom SAML app following [Configure other providers](#configure-other-providers).
* **Custom SAML app**: open the app's **General** tab and click **Edit** under **SAML Settings**.

Add a group attribute statement with:

* Name: `groups`
* Name format: `Unspecified`
* Filter: a filter matching the groups to send, for example **Matches regex** `.*` to send all of the user's groups.

Save your changes.

**OIDC**

* Open your Lovable OIDC app and go to the **Sign On** tab.
* Under **OpenID Connect ID Token**, click **Edit** and set **Groups claim type** to **Filter**.
* Set the groups claim name to `groups` with a filter matching the groups to send, for example **Matches regex** `.*`.
* Save your changes.

Okta sends group names in the claim, so values match your mappings as long as the names line up.

**Microsoft Entra ID**

* In your Lovable enterprise application, go to **Single sign-on → Attributes & Claims → Edit**.
* Click **Add a group claim**.
* Choose which groups to include. **Groups assigned to the application** is recommended: it sends only the groups assigned to the Lovable app and avoids token size limits.
* Set **Source attribute** to an option that emits group **names**, such as **Cloud-only group display names**, or `sAMAccountName` for groups synced from on-premises Active Directory.
* Save the claim. You can keep the default claim name: Lovable recognizes Microsoft Entra's default group claim.

> [!WARNING]
>
> By default, Microsoft Entra ID sends group **object IDs** (GUIDs) instead of names. Object IDs never match name-based mappings, so make sure the claim's source attribute emits group names.

**Other providers**

* In your SAML or OIDC application, include a group attribute or claim named `groups` in the login response.
* Make sure the values are group **names** (not IDs) and cover the groups you mapped in Lovable.

## Manage an existing SSO provider

Workspace owners and admins can change a provider's settings without deleting it. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the provider in the **SSO providers** section. The provider dialog includes these tabs:

* **General**: the **Display name**, the **Login URL** suffix, and the **Default role for new members**.
* **Connection**: the settings Lovable uses to verify sign-ins from your identity provider. For SAML, the **Identity provider entity ID**, the **Sign-on URL**, and the **Signing certificates**. For OIDC, the **Client ID**, the **Issuer**, and a new **Client secret** with its expiration date. A new entity ID, client ID, or issuer moves the provider to a different identity provider. See [Move to a new identity provider](#move-to-a-new-identity-provider).
* **Enterprise-managed authentication**: enable, update, or disable access to Lovable from Claude through this provider. See [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md).

Manage group mappings and **Group restriction** under **Provisioning groups** on the **Identity** page. See [Map IdP groups to workspace roles](#map-idp-groups-to-workspace-roles).

Your changes take effect when you click **Save changes**. Before Lovable saves a change on the **Connection** tab, it checks the values. For SAML, Lovable validates the sign-on URL and reads every certificate. For OIDC, Lovable contacts your provider to check the new client secret. If a check fails, Lovable shows the error and keeps the current configuration. If Lovable cannot reach your provider, or your provider does not support checking a secret in advance, Lovable saves the new secret and shows a warning that it could not check the secret. Your provider then checks the secret at the next login. Each saved connection change appears in the [audit log](https://docs.lovable.dev/features/audit-logs.md) as `SSO connection updated`.

### Move to a new identity provider

When your workspace moves to a different identity provider, edit the existing SSO provider instead of deleting it. Editing keeps the settings that deleting disables, such as **Enforce SSO**, [SCIM provisioning](https://docs.lovable.dev/features/business/scim.md), and the [domain lock](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock).

Members keep their accounts, but each account stays linked to the old identity provider. A member cannot log in through the new provider until that link is removed.

Members with another login method can unlink the old provider in [Account settings → Account → Login methods](https://lovable.dev/settings/account#linked-accounts). For members who log in only with SSO, contact Lovable support to remove the link.

Before you move the provider, delete its [IdP group role mappings](#map-idp-groups-to-workspace-roles) and disable [enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md) for it. Both were set up for the old identity provider, so Lovable shows an error and does not save the move while either is still in place.

To move the provider, click it in the **SSO providers** section of [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**). On the **Connection** tab, enter the new provider's details:

* **SAML**: the new **Identity provider entity ID**, and the new provider's signing certificate under **Add a certificate**. When you save, Lovable removes the current certificates and no longer accepts sign-ins signed by the old provider.
* **OIDC**: the new **Client ID**, the new **Issuer**, or both, and the new provider's **Client secret**.

When you save, Lovable asks you to confirm the change.

You cannot change a provider between SAML and OIDC. A workspace has one SSO provider, so to change the protocol, delete the provider and set up a new one. See [Delete an SSO provider](#delete-an-sso-provider).

### Rotate a SAML signing certificate

You can add up to 10 signing certificates to a SAML provider, and Lovable accepts sign-ins signed with any of them. When your identity provider issues a new signing certificate, paste it under **Add a certificate** on the **Connection** tab before your provider starts using it, so login continues without interruption. Remove the old certificate with its delete icon after the switch. Each certificate shows its subject, fingerprint, and expiration date. Lovable warns when a certificate expires within 30 days and does not save a change that leaves only expired certificates.

During setup, **Test & import** from your metadata URL adds the signing certificates listed in your metadata.

### Track the OIDC client secret expiration

Your identity provider does not share the expiration date of an OIDC client secret with Lovable, so you record it yourself. During setup, choose **3 months**, **6 months**, **12 months**, **Custom**, or **No expiration** under **Client secret expiration (optional)**. When you enter a new client secret on the **Connection** tab, choose from the same options under **New secret expiration (optional)**.

A badge next to the client secret on the **Connection** tab shows its status:

* **Valid until** and the date, while more than 30 days remain.
* **Expires in** and the number of days, during the last 30 days.
* **Expires today**, on the expiration date.
* **Expired** and the date, after the expiration date has passed.

Lovable does not send a notification before a secret expires. Check the badge when you plan to create a new secret. When you enter a new secret without a date, Lovable clears the stored expiration date.

## Delete an SSO provider

To change a provider's sign-on URL, certificates, client secret, or identity provider, edit it instead of deleting it. See [Manage an existing SSO provider](#manage-an-existing-sso-provider).

To remove your workspace SSO provider, go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**), find the provider in the **SSO providers** section, and click its delete icon.

Because a workspace can have only one SSO provider, deleting it turns off SSO for the workspace. Lovable shows a **Delete SSO provider** confirmation dialog that lists what else it disables, based on your workspace's current configuration:

* **Turn off Enforce SSO**: members can use the workspace again without an SSO session.
* **Remove SCIM provisioning**: the SCIM API key is revoked and SCIM-managed groups are deleted. Existing workspace members are not removed. See [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md).
* **Disable this workspace's domain lock**: people with emails on your [verified domains](https://docs.lovable.dev/features/verified-domains.md) can create their own workspaces again, unless another workspace still locks the domain.
* **Delete *n* IdP group role mappings**, where *n* is your number of mappings: IdP groups no longer grant workspace roles on login.

The dialog lists each of these only when it applies to your workspace. Click **Delete provider** to confirm.

> [!WARNING]
>
> Deleting a provider cannot be undone. To use SSO again, you need to configure the provider again from the beginning. Lovable does not keep the previous configuration.

Members keep their workspace access after the provider is deleted. Members whose **only** login method was that provider can recover their account themselves at the next login. See [Recover access after an SSO provider is removed](#recover-access-after-an-sso-provider-is-removed).

Each side effect is recorded in the [audit log](https://docs.lovable.dev/features/audit-logs.md): both the `SSO provider removed` entry (with the exact settings that were turned off) and, when SCIM was configured, a separate `SCIM disabled` entry.

## Troubleshooting

**OIDC**

> **Invalid or mismatched Redirect URI**
>
> Ensure the redirect/callback URL exactly matches `https://auth.lovable.dev/__/auth/handler` in your IdP.

> **Issuer URL / discovery fails**
>
> Use the provider's OIDC Issuer URL, not only the domain.
>
> * For Okta, copy from the **Sign-on** tab
> * For Auth0, use your tenant domain.

> **Email not returned**
>
> Grant the `email` scope and ensure the user account has a primary email.

> **Authorization flow issues**
>
> Use `Authorization Code` with a confidential client and client secret. Avoid implicit or PKCE-only app types.

> **Login stops working after the client secret expires**
>
> Create a new client secret in your identity provider, then enter it on the provider's **Connection** tab in Lovable and record its expiration date. See [Track the OIDC client secret expiration](#track-the-oidc-client-secret-expiration).

**SAML**

> **Invalid ACS or Audience**
>
> Ensure both ACS and Audience/Entity ID exactly match `https://auth.lovable.dev/__/auth/handler` in your IdP.

> **Email claim missing**
>
> Make sure to map an email claim.
>
> For Microsoft Entra ID, map `email` to `user.mail`. If `user.mail` is empty, use `user.userprincipalname`.

> **Provider credentials invalid**
>
> Paste the correct `X.509` certificate. If your identity provider rotates its certificate, add the new one on the provider's **Connection** tab. See [Rotate a SAML signing certificate](#rotate-a-saml-signing-certificate).

> **Group mappings don't match**
>
> If users get the default role instead of their mapped role, or **Group restriction** denies people it shouldn't:
>
> * Make sure the assertion includes a group attribute named `groups` (Microsoft Entra ID's and AD FS's default group claim names also work). See [Send group claims from your IdP](#send-group-claims-from-your-idp).
> * Make sure the claim contains group **names**, not IDs. Microsoft Entra ID sends object IDs unless the group claim's source attribute is set to emit names.
> * Claim matching is **case-sensitive**, so the value your IdP sends must match your mapping exactly, including capitalization.
> * Make sure [SSO login (JIT) provisioning](https://docs.lovable.dev/features/workspace-identity#sso-login) is enabled. With it disabled, users log in without receiving mapped roles or group memberships.

> **IdP-initiated login fails or shows an error page**
>
> If starting login from your IdP's app portal shows an error page (for example, `Forbidden` or `Unauthorized`):
>
> * Make sure your email domain is verified in **only one** Lovable workspace. IdP-initiated login is disabled automatically while more than one workspace has verified the same domain.
> * Make sure your IdP signs the SAML response (or the assertion within it) and the Audience Restriction matches `https://auth.lovable.dev/__/auth/handler`.
> * If your provider restricts access by group, make sure the user's SAML assertion includes a matching group claim. This also applies when logging in from Lovable.
> * If login still fails, change the ACS URL in your IdP app back to `https://auth.lovable.dev/__/auth/handler`. This disables IdP-initiated login and restores SP-initiated login from Lovable. IdP-initiated login is optional, so you can stay on SP-initiated login only and try again when the requirements are met.

> **Recover access after an SSO provider is removed**
>
> Workspace members who only ever logged in through the deleted SSO provider can recover access themselves from the standard Lovable login page, with no admin action or support request required. When they enter their email on the login page, Lovable detects that their only login method was the removed provider and shows a recovery panel:
>
> * **If the workspace has a replacement SSO provider on the same verified domain,** the panel shows **Reconnect your account** with a login button for the new provider. Clicking it logs the user in with that provider and links the new identity to their existing account, so their projects, roles, and history are preserved. If linking cannot happen automatically (for example, the new provider does not verify the same email), the panel falls back to the password path below.
> * **If there is no replacement SSO provider,** the panel shows **Set a password for your account** and offers to email a link. The user opens the link, sets a password, and logs in with email and password from then on.
>
> Users with any other working login method (password, Google, GitHub, Apple, or another still-valid SSO provider) are not affected and continue to log in normally.

## FAQ

> **I already have an account, but I'm joining a business workspace that uses SSO. How do I log in?**
>
> If you created your account using another login method (such as email and password, Google, or GitHub), you need to log in that way **first**. When you're logged in, go to [**Account settings → Account → Login methods**](https://lovable.dev/settings/account#linked-accounts) and click **Link account** under **Link company account**, then log in with your company SSO. This links your existing account to your company SSO.
>
> > [!NOTE]
> >
> > **Important:** If you attempt to log in with SSO before linking your existing account, you'll see an error. This is a security measure to prevent unauthorized access. Log in using your original method first to complete the linking process.

> **Can members who log in with SSO use 'Forgot password?' on the login page?**
>
> No. **Forgot password?** only works for accounts that have an email and password login method.
>
> If your account logs in through **Google**, **GitHub**, **Apple**, or a **SAML/OIDC SSO** provider, Lovable does not send a password reset email and shows a **Password reset unavailable** message, because completing a reset would add a password to an account that is meant to log in through your provider. Reset your credentials with your identity provider instead (for example, [Google Account recovery](https://accounts.google.com) or your company IdP).
>
> > [!NOTE]
> >
> > **Exception for deleted SSO providers:** if your only login method was an SSO provider that has since been removed from your workspace, you can set a password for the first time through the recovery flow on the login page. See [Recover access after an SSO provider is removed](#recover-access-after-an-sso-provider-is-removed).

> **Which SSO providers does Lovable support?**
>
> Lovable supports the industry-standard OIDC and SAML protocols, so you can integrate with any SSO provider that supports them.

> **Does Lovable support multiple SSO providers per workspace?**
>
> No. A workspace can have **one active SSO provider** configured at a time.

> **Can I enforce SSO for my workspace?**
>
> Yes. The workspace **owner** or **admin** can enable **Enforce SSO** in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and choose the **Session duration** that sets how long users stay logged in before Lovable requires a new SSO login (8 hours, 24 hours, 48 hours, or 7 days).
>
> All workspace members must then log in through SSO. When you enable it, Lovable asks whether to remove external collaborators from your projects. Invite links keep working only for people whose email is on one of your verified domains. See [Enforce SSO](#enforce-sso).
>
> Test an SSO login first. For six hours after you add a provider, the **Enforce SSO** toggle stays disabled and shows **Wait 6 hours and test SSO login before enforcing SSO**.

> **Does Lovable support IdP-initiated SSO?**
>
> Yes. **SAML** providers can optionally enable IdP-initiated login: users start login from your IdP's app portal once your SAML app posts the SAML response to `https://api.lovable.dev/sso/saml/idp-consume`. It only works while your workspace is the only workspace that has verified your email domain, and SP-initiated login from Lovable keeps working either way. See [Set up IdP-initiated login (SAML)](#set-up-idp-initiated-login-saml).
>
> OIDC providers support **SP-initiated login only**: users must start login from Lovable.

> **What should I do if IdP-initiated login shows an error?**
>
> An error page such as `Forbidden` or `Unauthorized` means the [requirements](#set-up-idp-initiated-login-saml) are not met. First, make sure your email domain is verified in **only one** Lovable workspace. IdP-initiated login is disabled automatically while more than one workspace has verified the same domain.
>
> If login still fails, change the ACS URL in your IdP app back to `https://auth.lovable.dev/__/auth/handler`. IdP-initiated login is optional: users log in from Lovable as usual, and you can try again when the requirements are met.

> **Does Lovable support just-in-time (JIT) provisioning with SSO?**
>
> Yes, Lovable supports **JIT (just-in-time) provisioning** through SSO. User accounts are created automatically the first time someone logs in via SSO, and they’re added to your company workspace.
>
> You can also set the provider's **Default role for new members** (**Viewer**, **Editor**, or **Admin**), which applies when users join via SSO for the first time. If you don't change it, JIT-created users join as an **Editor**.
>
> On **Enterprise** plans, workspace owners and admins can enable or disable SSO JIT from the **SSO login** row in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity → User provisioning**). The toggle appears once an SSO provider is configured.
>
> On **Business** plans, SSO JIT is automatically enabled when an SSO provider is configured, and the row shows a read-only **Enabled** or **Disabled** status. Contact Lovable support if you need it changed. See [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity) for how the provisioning options work together.

> **What happens to existing members when I set up group mappings?**
>
> Existing members keep their current role. Lovable applies group-to-role mappings when someone joins the workspace through SSO. If several mapped groups match, the highest-privilege role wins.
>
> On each SSO login, members are also added to any [workspace groups](https://docs.lovable.dev/features/groups.md) whose names match their IdP group claims. Lovable never removes anyone from a group automatically. Remove members from groups yourself if needed.
>
> Enabling **Group restriction** affects existing members: anyone logging in through the provider without a matching group claim is denied, so make sure your mappings cover everyone who should keep access. See [Map IdP groups to workspace roles](#map-idp-groups-to-workspace-roles).

> **Does Lovable create workspace groups from IdP group claims?**
>
> Yes, for mapped groups. When a login matches a mapping and your workspace has no [group](https://docs.lovable.dev/features/groups.md) with that name, Lovable creates the group and adds the user to it. Unmapped group claims never create groups, and Lovable does not create groups from login claims when your workspace groups come from SCIM provisioning. See [Add members to workspace groups automatically](#add-members-to-workspace-groups-automatically).

> **Does Lovable support SCIM or automatic user provisioning?**
>
> Yes. Lovable supports **SCIM provisioning** for automated user provisioning and deprovisioning on the **Enterprise plan**.
>
> With SCIM, user creation, removal, and role assignment are managed centrally from your identity provider based on assignments and group membership.
>
> See [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md) for more information.

> **How can I find my tenant ID (SSO login identifier)?**
>
> Your tenant ID is the `{tenantId}` value in your **SSO login URL**, `https://lovable.dev/sso-login/{tenantId}`. It is your verified domain with dots replaced by hyphens, plus the optional **Login URL suffix** you entered during setup.
>
> After setup, the full URL appears in the **SSO providers** row in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and in the provider's **Login URL** field. See [Your SSO login URL](#your-sso-login-url).

> **How can I edit my SSO provider configuration?**
>
> Click the provider in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) to open its settings. On the **General** tab you can change the **Display name**, the **Login URL** suffix, and the **Default role for new members**, then click **Save changes**. The **Connection** tab lets you change the SAML sign-on URL and signing certificates, or enter a new OIDC client secret and its expiration date. Manage group mappings and **Group restriction** under **Provisioning groups** on the **Identity** page.
>
> Use the **Enterprise-managed authentication** tab to [manage access from Claude](https://docs.lovable.dev/features/enterprise-managed-auth.md).
>
> To move to a new identity provider, change the entity ID, issuer, or client ID on the **Connection** tab. See [Move to a new identity provider](#move-to-a-new-identity-provider).
>
> > [!WARNING]
> >
> > Deleting the provider also turns off Enforce SSO, removes SCIM provisioning (revoking the SCIM API key and deleting SCIM-managed groups), disables the verified-domain lock, and deletes any IdP group role mappings. The delete dialog lists exactly which of these apply before you confirm. See [Delete an SSO provider](#delete-an-sso-provider).

> **What happens to users who only logged in via SSO if we delete the provider?**
>
> They keep their workspace access and can recover their account themselves from the login page: either by logging in through a replacement SSO provider (Lovable links the new identity to their existing account) or by setting a password through an emailed link. See [Recover access after an SSO provider is removed](#recover-access-after-an-sso-provider-is-removed).


## Related topics

- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Add OpenID Connect (OIDC) sign-in to your app](https://docs.lovable.dev/features/oidc-auth.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
