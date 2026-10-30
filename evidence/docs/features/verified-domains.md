# Verify a domain for your workspace
<!-- source: https://docs.lovable.dev/features/verified-domains.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify a domain for your workspace

> Prove ownership of your company's email domain with a DNS record to unlock SSO, automatic user provisioning, SCIM, and branded app URLs.

Verified domains let you prove to Lovable that your company owns an email domain, such as `acme.com`. Verification happens once, through a DNS record, and unlocks the identity and provisioning features that depend on knowing which users belong to your company.

When a domain is verified, Lovable can treat anyone logging in with an email on that domain (for example `jane@acme.com`) as a member of your company, and apply your workspace's authentication and provisioning rules to them.

* **Available on:** Business and Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity → Verified domains**)

## Why verify a domain

You need at least one verified domain before you can use most workspace identity features:

* **SSO**: connect a SAML or OIDC identity provider for your workspace. See [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md).
* **Enforce SSO**: require all workspace members to log in through your identity provider.
* **Domain lock**: combine Enforce SSO with the domain-wide Require SSO and **Block workspace creation** settings so everyone on the domain logs in through SSO and works only in your workspaces. Available on the Enterprise plan. See [Restrict a domain to SSO (domain lock)](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock).
* **Verified email sign-up**: automatically add users who sign up with an email on your verified domain to your workspace, with a default role you choose. No SSO needed.
* **SSO login provisioning**: automatically add users to your workspace the first time they log in through your SSO provider.
* **Add existing users**: a one-time action that adds existing Lovable users with verified-domain emails to your workspace.
* **SCIM provisioning**: sync users and groups from your identity provider on the Enterprise plan. See [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md).
* **Branded app URLs**: publish apps under a workspace subdomain derived from your verified domain. See [Publish apps with branded URLs](https://docs.lovable.dev/features/branded-workspace-urls.md).
* **External publish invites**: limit email invites to internally published apps to specific email domains. Your verified domains are always allowed. See [External viewer invites](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-viewer-invites).

The provisioning options above are configured on the same Identity tab. See [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity) for how they work and interact.

## Prerequisites

* A workspace on the Business or Enterprise plan.
* An owner or admin role in the workspace.
* Access to your domain's DNS settings (through your DNS provider, such as Cloudflare, GoDaddy, or AWS Route 53).

## Verify a domain

**1. Add your domain in Lovable**

Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**), and under **Verified domains**, click **Add domain**. Enter your domain, for example `acme.com`. Wildcards are not supported.

**2. Create the DNS TXT record**

Lovable shows a DNS record to create. In your DNS provider, add a record with:

| Setting | Value |
| :- | :- |
| Type | TXT |
| Host/Name | `@` (some providers want this blank, or want the domain name itself) |
| Value | The `lovable_verification=` token shown in the dialog, copied exactly |

**3. Wait for DNS propagation**

DNS changes can take anywhere from a few minutes to 72 hours, though most providers apply them within minutes.

**4. Verify the domain**

Back in Lovable, click **Verify domain**.

> [!TIP]
>
> When the check succeeds, you see a **Domain Verified!** confirmation, and the domain appears in your **Verified domains** list with a **Verified** badge.

> [!NOTE]
>
> If this is the first domain you verify, Lovable automatically turns on **Verified email sign-up** with the default role set to editor, so colleagues who sign up with a company email join your workspace automatically. You can change the default role or turn this off under **User provisioning** on the same page.

## How domain verification works

* **Verification is a one-time check.** Lovable checks the DNS record when you click **Verify domain**. Verified domains do not expire and are not re-checked later.
* **You can verify multiple domains.** Add each domain your company uses, for example `acme.com` and `acme.co.uk`.
* **Verifying a domain does not reserve it.** Another workspace can verify the same domain. If your company runs several workspaces, each one verifies the domain separately. In an [organization](https://docs.lovable.dev/features/organizations), an org admin verifies the domain once for every workspace. See [Verify a domain for the organization](https://docs.lovable.dev/features/organization-identity.md#verify-a-domain-for-the-organization).
* **Changes are audited.** Adding and removing verified domains is recorded in your workspace [audit logs](https://docs.lovable.dev/features/audit-logs.md).

## Remove a verified domain

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**).
2. In the **Verified domains** list, click the trash icon next to the domain.
3. Confirm in the **Delete verified domain** dialog.

> [!WARNING]
>
> Removing a domain disables SSO authentication for that domain. If you remove your **last** verified domain, Lovable also automatically turns off **Enforce SSO** and **Verified email sign-up**, since both depend on having a verified domain. To use the domain again, you must verify it again with a new DNS check.

Removing a domain does not remove existing workspace members or end their sessions. Users who already joined through that domain keep their access.

## Troubleshooting

> **Could not find TXT record for domain**
>
> The DNS record is not visible to Lovable yet. This usually means one of:
>
> * **The record has not propagated.** DNS changes can take up to 72 hours, though minutes is typical. Wait and try again.
> * **The record is on the wrong host.** The TXT record must be on the root of the domain (`@`), not on a subdomain like `www`.
> * **The value does not match.** The value must be the full `lovable_verification=` token exactly as shown, with no extra characters or quotes added by your DNS provider.

> **Could not lookup TXT record for domain**
>
> Lovable could not query DNS for the domain at all. Check that the domain is spelled correctly and is a real, registered domain with active DNS.

> **The domain shows as already verified**
>
> The domain is already in your workspace's verified list. You do not need to do anything.

## FAQ

> **Do I need a verified domain to set up SSO?**
>
> Yes. Verifying a domain is the first step of SSO setup, and the SSO configuration flow walks you through it if you have not done it yet.

> **Does domain verification expire?**
>
> No. Lovable checks the DNS record once, when you click **Verify domain**. A verified domain stays verified until you remove it from your workspace.

> **Can I remove the TXT record after verification?**
>
> Verification is checked once, so removing the record does not un-verify the domain. Keeping the record in place is recommended so you can verify again easily if you ever remove and re-add the domain.

> **Can two workspaces verify the same domain?**
>
> Yes. Verification proves ownership to a workspace and does not claim the domain exclusively. If your company runs several workspaces, each one verifies the domain separately and configures its own identity settings. In an [organization](https://docs.lovable.dev/features/organizations), an org admin verifies the domain once for every workspace. See [Verify a domain for the organization](https://docs.lovable.dev/features/organization-identity.md#verify-a-domain-for-the-organization). Require SSO and **Block workspace creation** are domain-wide, so you enable them once, and they apply to every workspace that has verified the domain.

> **What happens to members if I delete a verified domain?**
>
> Nothing immediately. Existing members keep their access and their sessions stay active. The domain stops working for SSO login, and if it was your last verified domain, **Enforce SSO** and **Verified email sign-up** turn off automatically.

> **Can I restrict sign-ups on my domain to SSO only?**
>
> Yes. Require SSO restricts account creation on a verified domain so new users must sign up through your SSO provider instead of email/password or social login. It applies domain-wide across all of Lovable and requires an SSO provider with **SSO login** provisioning. Contact [Lovable support](https://lovable.dev/support) to enable it for your domain. See [Restrict a domain to SSO (domain lock)](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock) for how it fits with **Enforce SSO** and **Block workspace creation**.


## Related topics

- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md)
- [Publish every app in your workspace under your own domain](https://docs.lovable.dev/features/publishing-domain.md)
- [Send branded emails from your own domain](https://docs.lovable.dev/features/custom-emails.md)
