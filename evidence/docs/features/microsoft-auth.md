# Add Microsoft authentication to your app
<!-- source: https://docs.lovable.dev/features/microsoft-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Microsoft authentication to your app

> Add Microsoft sign-in to your app using managed Microsoft OAuth or your own Azure app registration.

> [!NOTE]
>
> This page documents **Microsoft authentication for your app's users**. It is available only for apps using the [built-in backend](https://docs.lovable.dev/features/cloud). It is not about logging in to Lovable itself with a Microsoft account (see [SAML SSO](https://docs.lovable.dev/features/business/sso.md) for using Microsoft Entra ID as your workspace's identity provider), and not about the [Microsoft 365 connector](https://docs.lovable.dev/integrations/microsoft.md) your app can use for files and email. For an overview of all login methods, see [Users and authentication](https://docs.lovable.dev/features/authentication).

Let users sign in to your app with their Microsoft account, whether that is a personal account or a work or school account managed by their organization. Microsoft sign-in can be configured in two ways:

* **Managed by Lovable**: Lovable manages the OAuth configuration and security updates. This is the default and requires no Azure account.
* **Your own credentials**: you connect an app registration from your own Azure account and manage its credentials yourself.

Both options provide the same sign-in experience for users:

1. The user picks Microsoft sign-in in your app
2. Microsoft asks them to sign in and confirm
3. Microsoft redirects the user back to your app, signed in

## Why use Microsoft sign-in

Microsoft sign-in reduces signup friction, and it fits audiences that already live in Microsoft accounts, especially at work:

* Your users work at organizations that run on Microsoft 365, so they already have a Microsoft account
* Faster onboarding without password creation, and less password reset overhead
* With your own credentials, sign-in can be limited to your organization's own accounts
* It combines with other methods: users pick Microsoft, Google, Apple, or email on the same login page

## Common use cases

Microsoft sign-in is commonly used for:

* B2B tools where customers sign in with their work Microsoft accounts
* Internal tools restricted to your organization's Microsoft Entra directory
* Consumer apps that offer Microsoft alongside [Google](https://docs.lovable.dev/features/google-auth.md) and [Apple](https://docs.lovable.dev/features/apple-auth.md) sign-in

## Microsoft authentication setup options

The end-user experience is identical in both modes; the difference is who manages the OAuth credentials and what you can control.

**Managed by Lovable (default)**

Lovable manages the OAuth configuration and related security updates. No Azure account is required.

Use this option if you:

* want zero setup
* are fine with the Microsoft consent screen showing Lovable's name
* do not need to restrict sign-in to one organization

**1. Prompt Lovable to add Microsoft sign-in**

```text wrap theme={null}
Add a Microsoft sign-in button to my app.
```

Lovable enables the provider in **More → Users → Settings → Microsoft** and adds the sign-in button to your app's login page. You can also enable it manually from the same settings with the **Enable Microsoft sign-in** toggle.

**2. Test the flow**

Verify that:

* a Microsoft sign-in button appears on your login page
* users are redirected to Microsoft to sign in
* users return to the app in a signed-in state
* new users appear in **More → Users**

In Managed by Lovable mode, any Microsoft account can sign in: the tenant cannot be restricted, and the consent screen shows Lovable's name. Switch to your own credentials for either.

**Your own credentials**

You create an app registration in your own Azure account and connect it to Lovable. The consent screen shows your app's name, you can restrict which accounts may sign in, and you are responsible for credential security and rotation.

Use this option if you:

* want the consent screen to show your own app's name
* want to restrict sign-in to work or school accounts, personal accounts, or a single organization
* have security or compliance requirements for owning the credentials

You need an Azure account with permission to create app registrations.

**1. Create an app registration in the Azure Portal**

In the [Azure Portal](https://portal.azure.com), go to **App registrations** and create a registration for your app. When Azure asks for **Supported account types**, choose the audience that matches who should sign in to your app: the tenant setting you pick in Lovable in the next step can only narrow this audience, not widen it, so a single-tenant registration blocks personal accounts no matter what Lovable is set to.

Then create a **client secret** for the registration and copy the secret's **value** right away: Azure shows the value only once, and it is not the same as the secret's ID. Note the registration's **Application (client) ID**, and its **Directory (tenant) ID** if you plan to restrict sign-in to your organization.

**2. Enter your credentials in Lovable**

In **More → Users → Settings → Microsoft**, choose **Your own credentials** and fill in:

* **Client ID (Application ID)**: the Application (client) ID from your app registration.
* **Client secret**: the secret value you copied in the previous step.
* **Tenant ID (Directory ID)**, optional: who can sign in. Leave it empty (the default is `common`) to allow any Microsoft account, enter `organizations` to allow only work or school accounts, enter `consumers` to allow only personal accounts, or enter your Directory (tenant) ID to allow only accounts from your organization.

**3. Add the redirect URLs to your Azure configuration**

Copy each URL from the **Redirect URL(s)** field in Lovable into your app registration in the Azure Portal, under **Authentication → Add a platform → Web**, then confirm in Lovable which ones you added. Microsoft sign-in fails until these match. The list includes Lovable's shared callback, your app's own URL, and any custom domains attached to the project. When you attach a new custom domain later, check the list again and add the new URL in Azure.

**4. Test the flow**

Sign in with a Microsoft account that your tenant setting allows, and confirm the user appears in **More → Users**.

> [!WARNING]
>
> Azure client secrets expire on the date you set when creating them, and Azure shows a secret's value only once. When the secret expires, Microsoft sign-in stops working until you create a new secret in Azure and save its value in the Microsoft auth settings.

## Managing Microsoft authentication

You can switch between **Managed by Lovable** and **Your own credentials** at any time from **More → Users → Settings → Microsoft**. Switching back to Managed by Lovable deletes your stored client ID, secret, tenant, and redirect URL selections, so switching to your own credentials again means entering them fresh. Turning **Enable Microsoft sign-in** off also clears stored credentials.

To remove the sign-in option, ask Lovable in the project chat:

```text wrap theme={null}
Remove the Microsoft sign-in button from my app.
```

Or disable the provider in the auth settings. Users who signed up with Microsoft keep their accounts but need another enabled sign-in method to get back in.

## Troubleshooting

> **Microsoft sign-in stopped working after months of working fine**
>
> If you use your own credentials, your client secret has probably expired. Azure secrets expire on the date set when they were created. Create a new secret in the Azure Portal, copy its value, and save it in the Microsoft auth settings.

> **Users see a redirect error during sign-in**
>
> The redirect URIs in your Azure app registration don't match the redirect URLs Lovable shows. Copy every URL from the **Redirect URL(s)** field into the Azure Portal under **Authentication → Add a platform → Web** exactly, then retry. If sign-in fails only on your published app or custom domain, also check your project's [redirect URLs](https://docs.lovable.dev/features/authentication#site-url-and-redirect-urls).

> **People from outside my organization can't sign in**
>
> That is your tenant setting doing its job. If it shouldn't: in **More → Users → Settings → Microsoft**, clear the **Tenant ID (Directory ID)** field to allow any Microsoft account, or set it to `organizations` to allow work or school accounts from any organization. With your own credentials, also check that your Azure app registration's supported account types allow those accounts.

## FAQ

> **Do I need an Azure account for Microsoft sign-in?**
>
> Only if you use your own credentials. In Managed by Lovable mode, Lovable provides the OAuth configuration and no Azure account is needed.

> **Can I limit Microsoft sign-in to my company's employees?**
>
> Yes, with your own credentials. Enter your directory's ID in the **Tenant ID (Directory ID)** field, and only accounts from that Microsoft Entra directory can sign in. Managed by Lovable mode cannot restrict the tenant.

> **Why does the consent screen say Lovable instead of my app's name?**
>
> The provider is in Managed by Lovable mode, so Microsoft shows the name of the app registration that requests sign-in, which is Lovable's. Switch to **Your own credentials** to show your own app's name.

> **Which Microsoft accounts can sign in?**
>
> By default, any Microsoft account: personal accounts and work or school accounts. With your own credentials you can narrow this to work or school accounts only, personal accounts only, or a single organization.

> **Does Microsoft sign-in replace email and password sign-in?**
>
> No. It is an additional sign-in method, and you can offer it alongside [email](https://docs.lovable.dev/features/email-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), [Apple](https://docs.lovable.dev/features/apple-auth.md), and other methods.

> **Can I switch between managed and my own credentials later?**
>
> Yes, anytime from **More → Users → Settings → Microsoft**. Switching back to Managed by Lovable deletes your stored client ID, secret, tenant, and redirect URL selections, so switching to your own credentials again means entering them fresh. Azure shows a secret's value only once, so you may need to create a new secret then.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
