# Manage workspace identity and user provisioning
<!-- source: https://docs.lovable.dev/features/workspace-identity.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage workspace identity and user provisioning

> Control how your team authenticates and joins your workspace: verified domains, SSO, enforced login, and automatic user provisioning.

The **Identity** tab in workspace settings is where workspace owners and admins control how people authenticate to Lovable and how they join the workspace. It brings together domain verification, single sign-on (SSO), SSO enforcement, and automatic user provisioning in one place.

* **Available on:** Business and Enterprise plans (SCIM provisioning is Enterprise only)
* **Access:** Workspace admins and owners
* **Location:** [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**)

If your workspace is **Managed by the organization**, the tab shows that the organization manages these settings, and only org admins can change them. See [Lock a workspace's settings to the organization](https://docs.lovable.dev/features/organization-identity.md#lock-a-workspaces-settings-to-the-organization).

> [!NOTE]
>
> This page is about how your team logs in to **Lovable itself**. Apps your team builds can also recognize the logged-in workspace member automatically, so internal tools need no login page of their own. That is a separate feature: see [Reuse Lovable workspace identity in your app](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md).

## What's on the Identity tab

| Section | What it does | Details |
| :- | :- | :- |
| **Verified domains** | Prove ownership of your company's email domains. Required for everything below. | [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md) |
| **SSO providers** | Connect one SAML or OIDC identity provider, such as Okta, Auth0, or Microsoft Entra ID. | [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md) |
| **Enforce SSO** | Require all workspace members to log in through your identity provider, and set the session duration. | [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md) |
| **Enterprise-managed authentication** | Let members use the Lovable MCP server from Claude through your SSO provider, without a separate Lovable sign-in. | [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md) |
| **User provisioning** | Control how users with verified-domain emails join the workspace automatically. | This page, below |
| **SCIM provisioning** | Manage user lifecycle centrally from your identity provider (Enterprise plan). | [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md) |

## User provisioning

The **User provisioning** section controls how users whose email is on one of your verified domains join the workspace without a manual invite. There are three options.

### SSO login

Automatically adds users to your workspace the first time they log in through your SSO provider (also called just-in-time, or JIT, provisioning). Each provisioned user receives the provider's **JIT role**, which you set on the SSO provider. If you haven't set one, provisioned users join as an **editor**.

* On the **Enterprise plan**, use the **SSO Just-in-Time provisioning** toggle to turn this on or off yourself.
* On the **Business plan**, this is enabled automatically when an SSO provider is configured, and the section shows a read-only **Enabled** or **Disabled** status. Contact Lovable support if you need it changed.
* When no SSO provider is configured yet, the row shows an **Add SSO provider** button instead.

### Verified email sign-up

Automatically adds users who sign up to Lovable with an email on one of your verified domains, whether or not they log in through SSO. Set the **Default role** that these users receive when they join.

> [!NOTE]
>
> Verified email sign-up turns on automatically when you verify your first domain, with the default role set to editor. Review the default role after verifying a domain.

Verified email sign-up is unavailable while SCIM provisioning is active, since SCIM manages membership centrally from your identity provider.

### Add existing users

A one-time action that adds people who already have Lovable accounts with verified-domain emails to your workspace. Use this after verifying a domain to bring existing colleagues into the workspace in one step, instead of waiting for them to log in or sign up again.

When eligible people exist, **Add existing users** shows how many Lovable found, for example **12 new users**. Click **Provision** to open a two-step dialog. In **Provision users**, choose the **Domain** and the **Role** to assign, then click **Review users**. Lovable lists every email address it will add, and **Provision 12 users** adds them all with that role. Use **Back** to change the domain or role before you confirm.

**Provision** stays disabled when everyone matching your verified domains already belongs to the workspace.

### How provisioning methods interact

* **SCIM takes precedence.** When SCIM provisioning is enabled, user creation and role assignment are managed from your identity provider, and verified email sign-up is disabled.
* **Project invites respect provisioning.** When you invite someone to a project and their email matches a verified domain with verified email sign-up enabled, they join the workspace as a full member at your default role instead of becoming an external collaborator. When verified email sign-up is disabled, the [External project collaborators](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-project-collaborators) setting decides whether they are added as collaborators or blocked. See [External collaborators](https://docs.lovable.dev/features/people.md#external-collaborators).
* **Provisioned members are managed like any other member.** They appear in the [People tab](https://docs.lovable.dev/features/people.md), where you can change roles, set credit limits, or remove them.

## Enforce SSO and session duration

When you have a verified domain and an SSO provider, you can enable **Enforce SSO** to require all workspace members to log in through your identity provider, and choose how long SSO sessions last (8 hours, 24 hours, 48 hours, or 7 days) before members must re-authenticate.

For setup steps, the external-collaborator removal option, and troubleshooting, see [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md).

Enforce SSO applies only to this workspace. To also control how people on your domain create accounts and workspaces, see [Restrict a domain to SSO (domain lock)](#restrict-a-domain-to-sso-domain-lock).

> [!NOTE]
>
> To require a second factor without enforcing SSO, Enterprise workspaces can instead [require two-factor authentication](https://docs.lovable.dev/features/privacy-and-security-settings.md#require-two-factor-authentication) for everyone accessing the workspace. The two settings are mutually exclusive. When you enable **Enforce SSO**, Lovable automatically disables **Require two-factor authentication**, since your identity provider handles multi-factor authentication for enforced SSO sessions.

## Restrict a domain to SSO (domain lock)

**Domain lock** is the term Lovable support uses for a combination of settings that tie a verified domain to your identity provider, so everyone on the domain logs in through SSO and works only in your workspaces. It is not a single setting. You configure two of the settings per workspace. The other two apply to the whole domain, including any other workspace that has verified it. Lovable support enables the two domain-wide settings for workspaces on the Enterprise plan.

| Setting | Where | Scope | What it does |
| :- | :- | :- | :- |
| Verified domain | **Identity → Verified domains** | Per workspace | Proves your company owns the domain. Required for everything below. |
| **Enforce SSO** | **Identity → Enforce SSO** | Per workspace | Members need an active SSO session to use this workspace. It does not change how people create accounts or stop them from creating other workspaces. See [Enforce SSO](https://docs.lovable.dev/features/business/sso.md#enforce-sso). |
| Require SSO | Lovable support | Domain-wide | People on the domain can only create a Lovable account through SSO. The sign-up form hides password and social login, and anyone who tries another method sees **Sign-in not allowed. This domain requires SSO authentication.** Existing accounts keep working as before. Requires an SSO provider with **SSO login** provisioning. If no such provider remains, Lovable disables this setting. |
| **Block workspace creation** | Lovable support, or an org admin for the domains verified by an [organization](https://docs.lovable.dev/features/organization-identity.md#verify-a-domain-for-the-organization) | Domain-wide | People on the domain cannot create workspaces, including the personal workspace Lovable normally creates at sign-up. They see **Workspace creation is disabled for your email domain. Contact your organization admin.** and can still use workspaces they are invited to or added to. The lock does not require an SSO provider. If you delete this workspace's SSO provider, Lovable disables the lock for this workspace, unless another workspace also locks the domain. |

Require SSO and Enforce SSO are different settings. Enforce SSO is a workspace setting. It decides who can access this workspace, and someone on your domain can still create a Lovable account with a password and use it in other workspaces. Require SSO is a domain setting. It decides how people on the domain create accounts, so a new user on `acme.com` can only create an account through your SSO provider. A locked domain uses both.

Set up the settings in this order.

1. [Verify your domain](https://docs.lovable.dev/features/verified-domains.md#verify-a-domain).
2. Add and test your SSO provider. See [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md).
3. Enable **SSO login** or **Verified email sign-up** under [User provisioning](#user-provisioning). Without provisioning, a new user on a locked domain signs up, sees that they are not a member of any workspace, and cannot create one.
4. Enable [Enforce SSO](https://docs.lovable.dev/features/business/sso.md#enforce-sso). The toggle becomes available six hours after you add the provider.
5. Contact [Lovable support](https://lovable.dev/support) to enable Require SSO and **Block workspace creation** for the domain. In an [organization](https://docs.lovable.dev/features/organizations), an org admin enables **Block workspace creation** from [organization identity](https://docs.lovable.dev/features/organization-identity.md#verify-a-domain-for-the-organization) instead. Lovable support still enables Require SSO.

If another workspace verifies the same domain, the two domain-wide settings already apply to it. You set up verification, the SSO provider, provisioning, and Enforce SSO in each workspace separately.

## Removal and cascade behavior

Identity settings depend on each other, so removing one piece can turn others off:

> [!WARNING]
>
> * Deleting your **last verified domain** automatically disables **Enforce SSO** and **Verified email sign-up**.
> * Deleting your **SSO provider** automatically disables **Enforce SSO**, removes **SCIM provisioning**, and disables Require SSO and **Block workspace creation** for this workspace's verified domains. See [Restrict a domain to SSO (domain lock)](#restrict-a-domain-to-sso-domain-lock).
>
> Lovable shows the effects in the confirmation dialog before you delete. Existing members keep their access in all cases.

## FAQ

> **What's the difference between SSO login and verified email sign-up?**
>
> Both add verified-domain users automatically, but they trigger differently. **SSO login** adds users when they first authenticate through your SSO provider and assigns the provider's JIT role. **Verified email sign-up** adds users when they sign up with a verified-domain email using any login method, no SSO required, and assigns the default role you set. You can use both at once.

> **Why can't I toggle SSO Just-in-Time provisioning?**
>
> The self-serve toggle is available on the Enterprise plan. On the Business plan, SSO login provisioning is enabled automatically when an SSO provider is configured, and the status is shown read-only.

> **Why is verified email sign-up disabled?**
>
> Verified email sign-up is disabled while SCIM provisioning is active, because SCIM manages workspace membership centrally from your identity provider. Disable SCIM if you want to switch to domain-based provisioning.

> **Does turning off a provisioning method remove members?**
>
> No. Turning off SSO login, verified email sign-up, or SCIM only stops new automatic joins. Members who already joined keep their access until you remove them from the People tab.

> **What role do provisioned users get?**
>
> Users added through SSO login get the JIT role set on your SSO provider, or join as an editor if no JIT role is set. Users added through verified email sign-up get the default role set in the User provisioning section. Users provisioned through SCIM get roles from your group mappings, or the SCIM default role. You can change any member's role afterward from the People tab.

> **Does Enforce SSO affect people on my domain who are not in this workspace?**
>
> No. Enforce SSO applies only to the workspace where it is enabled. Someone on your domain can still create a Lovable account with a password and create their own workspace. Require SSO and **Block workspace creation** cover those two cases. Both apply to the whole domain on the Enterprise plan, and Lovable support enables them for you. See [Restrict a domain to SSO (domain lock)](#restrict-a-domain-to-sso-domain-lock).


## Related topics

- [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
- [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md)
