# Reuse Lovable workspace identity in your app
<!-- source: https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Reuse Lovable workspace identity in your app

> Let apps you build for your team recognize the logged-in Lovable user automatically, without a separate login flow.

When you build an internal tool in Lovable, the people who use it are usually your own teammates, and they already log in to Lovable every day. Workspace identity reuse lets your app treat that existing login as its login: the app knows who is visiting (their name, email, and Lovable user ID) without showing a login page or asking anyone to create another account.

It works no matter how someone logs in to Lovable: workspace SSO, Google, or email. The feature is available on **Business** and **Enterprise** plans.

## Which identity feature do you need?

Lovable has four features that sound alike but do different jobs. If you are not sure this page is the right one, start here:

| Feature | What it controls | Who it affects |
| - | - | - |
| **Lovable workspace identity reuse** (this page) | Whether apps you build can recognize the workspace member who is already logged in to Lovable | Your workspace members using apps your team builds |
| [Workspace SSO](https://docs.lovable.dev/features/business/sso.md) | How your team logs in to Lovable itself, through your identity provider | Workspace members logging in to Lovable |
| [SAML SSO for apps](https://docs.lovable.dev/features/saml-sso.md) | How external end users of a published app on the built-in backend log in with their own company credentials | Your app's outside users |
| [Sign in with Lovable](https://docs.lovable.dev/features/lovable-auth.md) | Whether your app's users can sign in with a Lovable account, through a login page | Anyone with a Lovable account using your app |

A simple way to keep them apart: the [Identity settings](https://docs.lovable.dev/features/workspace-identity) decide how people get into Lovable. Workspace identity reuse decides what your apps can know about people who are already in. Neither requires the other: identity reuse works even if your team logs in to Lovable with Google or email, and you do not need workspace SSO configured.

## Why use workspace identity reuse

Identity reuse fits when everyone who uses your app is already in your Lovable workspace. Without it, you would need to build and maintain a second login system, and your teammates would log in twice: once to Lovable, and once to your app. With it, the app already knows the current user.

| Use case | Example | Why identity reuse fits |
| - | - | - |
| Internal admin tool | A billing review dashboard for your operations team | Team members already log in to Lovable, so the app can identify them without another login page |
| Employee portal | A workspace-only PTO request app | The app can show each user their own requests and route approvals by Lovable identity |
| Workspace reporting | A dashboard that filters activity by the logged-in team member | The app can personalize views based on the current Lovable user |
| Per-user data apps | A notes or tasks app where each member sees only their own rows | Your app can use the Lovable identity to personalize data access |

For customer-facing apps, public signup flows, or apps where users do not have Lovable accounts, use [traditional app authentication instead](#when-to-use-traditional-app-authentication-instead).

## How workspace identity reuse works

When a logged-in user opens the preview or the published app, Lovable creates a short-lived identity token for that project and user, and passes it along with the app request. Helper code that Lovable generates in your app verifies the token and exposes the current user to the rest of your app code.

Lovable strips any identity information that visitors send themselves before attaching its own signed token, so a visitor cannot impersonate someone else by faking an identity.

### Who gets recognized

The app recognizes people who are logged in to Lovable **and** have access to the project. Everyone else, including anonymous visitors and people who can only view the published app, gets no identity: the helper returns no user, and your app decides what they see, such as a guest view or an access-denied message.

If the workspace [requires two-factor authentication](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication), members who haven't set up 2FA also get no identity until they enroll. They can still open the app, but the app does not know who they are.

### What your app can read

* The logged-in user's Lovable user ID.
* The user's display name, when available.
* The user's email address, when available.

### Do you need the built-in backend?

No. Workspace identity reuse works in any eligible project, with or without the built-in backend. Reading the current user's name or email needs no backend at all.

You need the backend when the app should store **per-user data**: for example, a task tracker where each member sees only their own tasks. Lovable passes the logged-in identity to your backend so the database can enforce per-user access.

> [!WARNING]
>
> Do not mix workspace identity reuse with a traditional app sign-in flow unless you intentionally design a hybrid app. For most apps, choose one auth model: Lovable identity for workspace-member apps, or traditional app authentication for public and customer-facing apps.

## Prerequisites

* A **Business** or **Enterprise** workspace.
* A newer Lovable project that uses [TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start). Older React + Vite projects are not eligible, but you can [upgrade an older project to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) to make it eligible.
* **Lovable workspace identity** allowed in your workspace's [App login methods](https://lovable.dev/settings/privacy-security) policy. It is allowed by default.

If you are not sure which stack your project uses, ask Lovable:

```text wrap theme={null}
What stack is this project on?
```

## Set up workspace identity reuse

Setup happens at two levels, usually by two different people:

* **Workspace level**: a workspace admin or owner decides whether apps in the workspace may use workspace identity at all. This is a one-time policy decision, and it is allowed by default.
* **App level**: the project editor asks Lovable to use the logged-in user in a specific app. Nothing uses the identity until you ask for it. There is no per-project setting to turn on or off.

### Workspace setup (admins and owners)

Workspace identity is allowed by default, so in most workspaces there is nothing to do here. To confirm or change the policy:

**1. Open App login methods**

Open [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**), then select **Configure** under **App login methods**.

**2. Check Lovable workspace identity**

The **Lovable workspace identity** entry should show **Allowed**.

Blocking a method locks it for every project in the workspace. The change takes effect immediately. This policy only affects apps your team builds. It does not change how workspace members log in to Lovable.

### App setup (project editors)

**1. Ask Lovable to use the logged-in user**

In your project, describe the identity behavior you want. Lovable makes the app changes needed to use the logged-in identity. For example:

```text wrap theme={null}
Use Lovable workspace identity to show the logged-in user's name and email in the header. If no user is available, show a logged-out state.
```

```text wrap theme={null}
Build an internal task tracker where each logged-in workspace member only sees tasks assigned to them.
```

> [!TIP]
>
> Be explicit about which login model you want. If you only say "add login", Lovable may build a traditional sign-up flow with email, Google, and Sign in with Lovable instead. Say that you want to use the logged-in Lovable user, like the prompts above do.

**2. Test it in preview**

Open the preview while logged in to Lovable. Wherever your app displays the current user, you should see your own details. With the header prompt above, the header greets you with your own name and email instead of showing a login button.

To test what other people see, ask a teammate with access to the project to open the app. They see their own name, not yours. To test the logged-out experience, open the published app in a private browser window. Without a Lovable session, the app shows the guest or logged-out state you asked for.

> [!TIP]
>
> Identity works in preview. You do not need to publish the app to test it.

## Turning workspace identity reuse off

* **For the whole workspace**: a workspace admin or owner blocks **Lovable workspace identity** in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security → App login methods**). This applies to every project immediately and cannot be changed from a project.
* **For a single app**: ask Lovable to remove it, for example: `Stop using workspace identity in this app and show a public landing page instead.`

## When to use traditional app authentication instead

Use traditional app authentication when:

* Your app is customer-facing or public.
* Users should create accounts inside the app.
* Users may not have Lovable accounts.
* You need app-specific login methods such as email/password, magic links, [Google sign-in](https://docs.lovable.dev/features/google-auth.md), or [SAML SSO for your app's users](https://docs.lovable.dev/features/saml-sso.md).
* You need app-owned user accounts, signup flows, or user management that is separate from Lovable workspace membership.

In those cases, ask Lovable to add the sign-in method you need, such as [Google authentication](https://docs.lovable.dev/features/google-auth.md), [email sign-in](https://docs.lovable.dev/features/email-auth.md), or [SAML SSO for your app's users](https://docs.lovable.dev/features/saml-sso.md).

## FAQ

> **Is workspace identity reuse the same as workspace SSO?**
>
> No. Workspace SSO controls how your team logs in to Lovable. Workspace identity reuse lets an app you build read the Lovable user who is already logged in. See [Which identity feature do you need?](#which-identity-feature-do-you-need)

> **Do I need workspace SSO configured to use this?**
>
> No. The identity is the logged-in Lovable account, regardless of whether the user logged in with workspace SSO, Google, email, or another supported method.

> **Do I need the built-in backend?**
>
> No. Reading the current user works in any eligible project. You only need the built-in backend when the app stores per-user data.

> **Can people without access to my project use this identity?**
>
> No. Only logged-in Lovable users with access to the project get an identity. Everyone else is treated as anonymous, including public visitors and workspace members without access to the project. Use traditional app authentication if public or customer users need accounts.

> **Does this consume extra credits?**
>
> No, workspace identity reuse has no separate cost. Any built-in database, storage, hosting, or AI usage in the app follows normal [credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md) rules.

## Troubleshooting

> **I do not see Lovable workspace identity in App login methods**
>
> The **App login methods** dialog shows the entry when the feature is available for your workspace. Confirm your workspace is on a Business or Enterprise plan.

> **My project cannot use workspace identity**
>
> Workspace identity reuse needs all three of the following. Check each one:
>
> * Your project runs on [TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start). Some older projects use an earlier stack and are not eligible. If you are not sure, ask Lovable: `What stack is this project on?` If your project is on the older stack, [upgrade it to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md).
> * **Lovable workspace identity** is allowed in [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security → App login methods**).
> * Your workspace is on a Business or Enterprise plan.

> **The app shows no logged-in user**
>
> Open the preview while logged in to Lovable, and make sure your account has access to the project itself, not only to the published app. If your workspace [requires two-factor authentication](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication), set up 2FA on your account: members without it get no identity. If your app supports anonymous visits, make sure it handles the no-user state clearly.

> **Lovable added a login page instead of using my identity**
>
> Ask Lovable to use the logged-in Lovable user as the app identity. For example:
>
> ```text wrap theme={null}
> Use Lovable workspace identity for this internal app. Do not add a separate email or Google login flow.
> ```

> **My data does not recognize the user**
>
> Ask Lovable to connect the signed-in identity to your data access. Avoid mixing this setup with a separate app sign-in flow unless you are intentionally building a hybrid auth model.


## Related topics

- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
