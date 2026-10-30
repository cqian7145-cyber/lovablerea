# Add Sign in with Lovable to your app
<!-- source: https://docs.lovable.dev/features/lovable-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Sign in with Lovable to your app

> Let your app's users sign in with their Lovable account. Lovable registers and maintains the OAuth credentials for your project, so there is nothing to configure.

> [!NOTE]
>
> This page documents **Sign in with Lovable for your app's users**. It is available only for apps using the [built-in backend](https://docs.lovable.dev/features/cloud). It is not about [Sign in with Lovable for sites you did not build with Lovable](https://docs.lovable.dev/integrations/sign-in-with-lovable.md), which uses an [OAuth client](https://docs.lovable.dev/features/oauth-clients.md) you register yourself, and not about [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md), which recognizes your own workspace members without a login page. For an overview of all sign-in methods, see [Users and authentication](https://docs.lovable.dev/features/authentication).

Let users sign in to your app with the Lovable account they already have. Lovable registers the OAuth client for your project, keeps its redirect addresses current when your app's address or domains change, and shows your project's name on the consent screen. You enable one setting, and Lovable adds the button to your login page.

Sign in with Lovable is available on all plans, and sign-ins do not consume credits. It is an additional sign-in method, so you can offer it alongside [email](https://docs.lovable.dev/features/email-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), [Apple](https://docs.lovable.dev/features/apple-auth.md), [Microsoft](https://docs.lovable.dev/features/microsoft-auth.md), and the other methods.

## Why use Sign in with Lovable

Sign in with Lovable fits apps whose users already have a Lovable account:

* A directory, marketplace, or community tool for people who build with Lovable, where members sign up without creating another password
* An app that needs to know which Lovable account a person uses, for example to connect their activity in your app to their Lovable profile
* A companion app for your Lovable projects, where the same account works everywhere

For an internal tool used only by your own workspace members, [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md) recognizes the logged-in member with no login page at all.

## What your users see

Sign-in takes three steps, and Lovable runs all of them:

1. The user selects **Continue with Lovable** in your app. On a screen that only signs people in, the button says **Sign in with Lovable**.
2. Lovable asks them to log in to their Lovable account if they are not logged in already. On their first sign-in to your app, Lovable also asks them to allow your app to see their name and email address, on a consent screen that shows your project's name.
3. Lovable sends the user back to your app, signed in.

Your app receives the user's name, email address and whether it is verified, profile picture, and a Lovable user ID that does not change for that person. Lovable shares nothing else from their account.

## Add Sign in with Lovable

You can add Sign in with Lovable from the project chat or from the auth settings. Either way, the provider and the button both need to be in place. When you ask Lovable to add login without naming sign-in methods, it sets up Sign in with Lovable together with email and password sign-in and Google sign-in.

**1. Prompt Lovable to add the button**

```text wrap theme={null}
Add a sign in with Lovable button to my app.
```

Lovable enables the provider in **More → Users → Settings → Lovable** and adds the button to your app's login page. You can also enable it yourself from the same settings with the **Enable sign in with Lovable** toggle. After you save, Lovable sends the prompt above to the project chat on your behalf and adds the button. That message is treated as standard build usage and consumes credits, like any other edit.

**2. Test the flow**

Verify that:

* a **Continue with Lovable** or **Sign in with Lovable** button appears on your login page
* the Lovable consent screen shows your project's name
* the user returns to the app in a signed-in state
* the new user appears in **More → Users** with Lovable as a login method

Sign in with Lovable works in the preview and in your published app, whatever its website access.

On Business and Enterprise workspaces, a workspace admin can block Sign in with Lovable for every project with the [App login methods](https://docs.lovable.dev/features/privacy-and-security-settings.md#app-login-methods) policy. A blocked method shows a **Workspace policy** badge in the auth settings and cannot be enabled from the project.

## What Lovable manages for you

Sign in with Lovable is fully managed. When you enable it, Lovable registers an OAuth client named after your project and stores its credentials for the project.

Lovable also keeps the client's redirect addresses in step with your app. Your `lovable.app` address and every custom domain connected to the project are added, and Lovable updates them when your app's address changes or when you connect or remove a domain. When you rename the project, Lovable renames the client to match.

The client belongs to the project and does not appear under **Workspace settings → API keys & OAuth**. That section lists the [OAuth clients](https://docs.lovable.dev/features/oauth-clients.md) you register yourself for apps and tools that are not built with Lovable.

## Remove Sign in with Lovable

To remove the sign-in option, ask Lovable in the project chat:

```text wrap theme={null}
Remove the sign in with Lovable button from my app.
```

Or disable **Enable sign in with Lovable** in **More → Users → Settings → Lovable**. Lovable keeps the project's registration, so enabling it again later needs no new setup. Users who signed up with their Lovable account keep their accounts in your app. Keep another sign-in method enabled so they can get back in.

## Limitations

Two restrictions apply.

* The Lovable sign-in method is managed by Lovable only. You cannot attach your own OAuth client to it, and the consent screen always shows Lovable branding with your project's name.
* Any Lovable account can sign in. To limit an app to your own workspace members, use [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md) instead.

## Troubleshooting

> **Sign-in with Lovable fails on my custom domain**
>
> Lovable adds every connected custom domain to the client's redirect addresses a few seconds after the domain becomes active, so a failure usually means you tried before that update finished. Try again. If it still fails, ask Lovable in the project chat to check the sign-in configuration for your domain.

## FAQ

> **Do my users need a Lovable account?**
>
> Yes. Sign in with Lovable signs people in with a Lovable account rather than creating one in your app. Anyone without an account can create one on the Lovable login page during sign-in.

> **Can I use my own OAuth client for Sign in with Lovable?**
>
> Not with this sign-in method, which Lovable always manages. If you need your own client, for example to choose its name or redirect addresses, register one under [OAuth clients](https://docs.lovable.dev/features/oauth-clients.md) and add the sign-in to your app yourself with the SDK or the OpenID Connect flow described in [Sign in with Lovable](https://docs.lovable.dev/integrations/sign-in-with-lovable.md). Your app then runs that sign-in outside the built-in authentication, and the people who sign in that way are not part of its **Users** list.

> **Can I limit Sign in with Lovable to my workspace members?**
>
> No. Any Lovable account can sign in to your app. For an internal tool, use [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md), which recognizes the logged-in workspace member and requires no login page.

> **Does Sign in with Lovable replace email and password sign-in?**
>
> No. It is an additional sign-in method, and you can offer it alongside [email](https://docs.lovable.dev/features/email-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), [Apple](https://docs.lovable.dev/features/apple-auth.md), [Microsoft](https://docs.lovable.dev/features/microsoft-auth.md), and [SAML SSO](https://docs.lovable.dev/features/saml-sso.md).


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
