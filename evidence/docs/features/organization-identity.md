# Set up organization identity: domains, SSO, and SCIM
<!-- source: https://docs.lovable.dev/features/organization-identity.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up organization identity: domains, SSO, and SCIM

> Verify domains, connect SSO, and provision members once for every workspace in your organization, and decide which workspaces the organization manages.

The **Identity** page in organization settings is where org admins set up how people in the company log in and which workspace they join. You verify the company's email domains, connect an [SSO](https://docs.lovable.dev/features/business/sso.md) provider, and provision members, that is, add and remove them automatically from your identity provider. You do this once, and every workspace in the [organization](https://docs.lovable.dev/features/organizations) uses the result.

For each workspace you also decide whether the organization manages its identity and security settings.

* **Available on:** Enterprise plans, as part of an organization
* **Access:** Org admins
* **Location:** [Organization settings](https://lovable.dev/organization) (**Organization settings → Access → Identity**)

> [!NOTE]
>
> This page is about identity for a whole organization, where you set up domains, SSO, and SCIM once for several workspaces. Looking for the identity settings of a single workspace? See [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity). The two are different pages.

## Prerequisites

Before you start, make sure:

* You are an org admin, so the **workspace switcher** shows **Organization settings**.
* You can add a record at your company's DNS provider, such as Cloudflare or GoDaddy, to verify a domain. IT usually manages this access.
* You have admin access to your identity provider, such as Okta or Microsoft Entra ID, to connect SSO or [SCIM](https://docs.lovable.dev/features/business/scim.md).

## Verify a domain for the organization

Verify a domain first. SSO and SCIM require the organization to prove that it owns the company's email domains.

**1. Add the domain**

Under **Verified domains**, click **Add domain** and enter the domain. Lovable shows a DNS TXT record to create at your DNS provider.

**2. Create the DNS record**

Create the TXT record at your DNS provider. The record type, how long the record takes to apply, and troubleshooting are the same as for a workspace. Use the value Lovable shows for the organization, which differs from a workspace's value. See [Verify a domain](https://docs.lovable.dev/features/verified-domains.md#verify-a-domain).

**3. Verify the domain**

When the record is in place, verify the domain in Lovable. The domain then covers every workspace in the organization.

Under **Verified domains** you can also enable **Block workspace creation**, then confirm. It stops people on any of the organization's verified domains from creating their own workspaces, and applies to any domain you verify later. A blocked person sees a message that workspace creation is disabled for their email domain. The block also applies to people who signed up before you enabled it, and it does not move or close workspaces that already exist.

To also require SSO for everyone who signs up with an email on the domain, contact [Lovable support](https://lovable.dev/support). See [Restrict a domain to SSO](https://docs.lovable.dev/features/workspace-identity#restrict-a-domain-to-sso-domain-lock).

To require SSO for the members of one workspace instead, enable **Enforce SSO** for that workspace. See [Set identity per workspace](#set-identity-per-workspace).

## Set up SSO for the organization

You need a verified domain before you can add a provider.

**1. Add a provider**

Under **Single sign-on**, add a provider and choose the protocol your identity provider uses, SAML or OIDC. See [Supported SSO protocols](https://docs.lovable.dev/features/business/sso.md#supported-sso-protocols).

**2. Exchange values with your identity provider**

Copy values from Lovable into your identity provider and from your identity provider into Lovable, the same way as for a workspace. Follow the [provider-specific setup guides](https://docs.lovable.dev/features/business/sso.md#provider-specific-setup-guides) and enter the values on the organization's **Identity** page instead.

**3. Check the provider**

The provider appears under **Single sign-on** with the login URL your members use to log in through it.

When a member logs in through the organization's SSO provider, the session covers every Enterprise workspace in the organization where they are a member. In each workspace, the session lasts as long as that workspace's **SSO session duration** allows, and members do not log in again when they switch between those workspaces.

A workspace can keep its own SSO provider and verified domains as well, whether or not it is **Managed by the organization**. Members of that workspace can log in through either provider, and the organization's SSO still adds people to it when **SSO login** is enabled for that workspace. See [Limit who joins a workspace](#limit-who-joins-a-workspace).

To let members use Lovable from Claude through the organization's provider, an org admin enables [enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md) on that provider.

## Enforce SSO for org admins

**Enforce SSO for org admins** requires every org admin to log in through the organization's SSO provider before opening organization settings. An org admin who is logged in another way is asked to log in through SSO when they open them. The setting stays disabled until the organization has an SSO provider and a verified domain.

To require SSO for a workspace's members, enable **Enforce SSO** on that workspace instead. See [Set identity per workspace](#set-identity-per-workspace).

## Route people to workspaces with provisioning groups

A **provisioning group** maps a group in your identity provider to one workspace and a role in it. When someone logs in through SSO or is provisioned through SCIM with that group, Lovable adds them to the workspace with that role. A person in several mapped groups gets the highest of those roles.

For example, people in your IT group join one workspace and people in a product group join another, from the same identity provider.

Provisioning groups work without SCIM, because SSO login alone can place people. Add SCIM when you also want your identity provider to create members before they first log in and to remove people who leave the company. The same provisioning groups then place people for both.

To add a provisioning group, select the workspace's row in the **Workspaces** table on the **Identity** page. Click **Add group** under **Provisioning groups**, enter the group name exactly as your identity provider sends it, and choose the role. Your identity provider must send group names when a member logs in. See [Send group claims from your IdP](https://docs.lovable.dev/features/business/sso.md#send-group-claims-from-your-idp).

Removing a provisioning group stops new members from joining through it. Existing members keep their access.

Provisioning groups are different from workspace [groups](https://docs.lovable.dev/features/groups.md). A provisioning group decides who joins a workspace and with which role. A workspace group grants access to projects and folders inside the workspace.

## Provision members with SCIM

SCIM lets your identity provider create members, assign them to workspaces, and remove them when they leave the company, for every workspace in the organization at once. SCIM in an organization needs a verified domain and at least one workspace on the Enterprise plan.

Under **Provisioning**, click **Enable** next to **SCIM provisioning**, then **Continue** past the introduction.

**1. Map your identity provider's groups to workspaces**

On **Add group provisioning**, add provisioning groups for each workspace: the identity provider groups whose members join it, each with the role they get. Lovable saves each provisioning group immediately, and you can change them later from the workspace's row in the **Workspaces** table. Click **Continue**. See [Route people to workspaces with provisioning groups](#route-people-to-workspaces-with-provisioning-groups).

**2. Set the default workspace and role**

On **Default workspace and role (optional)**, decide what happens to a person whose groups match no provisioning group:

* **Default workspace**: the workspace they join. Without a default workspace, Lovable rejects them, and your identity provider reports the error.
* **Default role**: the workspace role they get there, available after you choose a default workspace.
* **Send welcome email to provisioned users**: whether new members receive an email when they are provisioned.

People whose groups match a provisioning group always follow it. Click **Continue**.

**3. Copy the credentials into your identity provider**

When you continue, Lovable enables SCIM and shows the **Base SCIM URL** and the API key. Copy the key now, because Lovable does not show it again.

Configure the SCIM application in your identity provider as described in [Configure SCIM in your identity provider](https://docs.lovable.dev/features/business/scim.md#step-2-configure-scim-in-your-identity-provider), with the organization's URL and key, then click **Done**.

After setup, under **Provisioning** you can review the **Base SCIM URL**, change **Default workspace**, **Default role**, and **Welcome email**, rotate the API key, and disable SCIM.

Rotating the key shows the new key once, and your identity provider stops provisioning members until you enter the new key there. Disabling SCIM stops automatic provisioning for every workspace in the organization. Provisioning groups stay in place for SSO, and people who already joined keep their access.

Only SCIM removes people automatically. When your identity provider deactivates or deletes someone's account, Lovable removes them from every workspace in the organization.

Taking someone out of a provisioning group does not remove them from a workspace. Lovable gives them the role their remaining groups grant. Someone dropped from the group that granted **Admin** becomes a viewer. In the organization's **Default workspace** they take the **Default role** instead.

SCIM never removes someone who is an owner of a workspace, and never changes an owner's role. Remove an owner from the workspace yourself. See [Remove someone who leaves the company](https://docs.lovable.dev/features/organization-people.md#remove-someone-who-leaves-the-company).

Enabling SCIM also disables **Verified email sign-up** in every workspace of the organization, because the organization now provisions members. You can enable it again for a workspace that is not **Managed by the organization**. See [Set identity per workspace](#set-identity-per-workspace).

## Set identity per workspace

The **Workspaces** table on the **Identity** page lists each workspace in the organization with its identity settings. The **Managed by** column shows whether the organization or the workspace controls them.

Select a workspace's row to set:

* **Managed by the organization**: only org admins change this workspace's identity and security settings. See [Lock a workspace's settings to the organization](#lock-a-workspaces-settings-to-the-organization).
* **Enforce SSO**: members of this workspace must log in through SSO, and email and password login is disabled for them.
* **SSO session duration**: how long an SSO session lasts before members log in again.
* **SSO login**: an SSO provider adds people to this workspace when they first log in, with the **Default role** you choose for it.
* **Verified email sign-up**: people who sign up with an email on a verified domain join this workspace, with the **Default role** you choose for it, viewer or editor. Available when the workspace or the organization has a verified domain and the workspace is on the Business or Enterprise plan.
* **Provisioning groups**: the identity provider groups whose members join this workspace, each with a role. See [Route people to workspaces with provisioning groups](#route-people-to-workspaces-with-provisioning-groups).
* **Mapped-group provisioning**: only people whose SSO login includes one of the workspace's provisioning groups join the workspace. Lovable adds no one else, even people with an email on a verified domain. Enable it when a workspace must stay limited to specific teams.
* **Domain provisioning**: the organization's verified domains that its SSO adds people from. Leave the list empty to allow every verified domain, or list specific domains when only people on those domains should join.

When both **SSO login** and **Verified email sign-up** are disabled for a workspace, the organization's SSO and verified domains add no one to it. Invite members yourself or provision them through SCIM. **SSO login** is a single setting that governs the organization's SSO provider and any provider the workspace configured itself.

## Lock a workspace's settings to the organization

**Managed by the organization** is a setting on each workspace's row in the **Workspaces** table on the **Identity** page. Enable it to lock that workspace's **Identity** and **Privacy & security** tabs to the organization. The workspace's admins and owners then see that the organization manages these settings and cannot change them.

Disable it to let the workspace's admins and owners change the settings again.

The setting covers both tabs together. Either org admins and the workspace's admins and owners can change the identity and security settings, or only org admins can.

Whether or not a workspace is **Managed by the organization**, its members see the organization's workspaces grouped in the workspace switcher and can publish to the organization. See [What changes for members of a workspace](https://docs.lovable.dev/features/organizations#what-changes-for-members-of-a-workspace).

The lock also applies to changes to those settings made through Lovable's API.

## Limit who joins a workspace

Some workspaces belong in the organization, but the organization's SSO must not add people to them, for example a workspace with sensitive apps. You have three options:

* Disable **SSO login** for the workspace, so no SSO provider adds anyone to it, the organization's or the workspace's own. Add members by invitation or SCIM instead. See [Set identity per workspace](#set-identity-per-workspace).
* Limit the verified domains the organization's SSO adds people from, so only people on those domains join, for example one subsidiary's domain. See [Set identity per workspace](#set-identity-per-workspace).
* Enable **Mapped-group provisioning** on the workspace, so only people in its provisioning groups can join through SSO. See [Route people to workspaces with provisioning groups](#route-people-to-workspaces-with-provisioning-groups).

## Troubleshooting

> **Add a verified domain first**
>
> Intended. Until the organization has a verified domain, the SCIM **Enable** button, **Block workspace creation**, and **Enforce SSO for org admins** stay disabled. The **Single sign-on** section also shows that SSO requires a verified domain. Verify a domain under **Verified domains**, then start the setup. See [Verify a domain for the organization](#verify-a-domain-for-the-organization).

> **SCIM requires at least one Enterprise workspace in this organization**
>
> Intended. SCIM in an organization provisions members into workspaces on the Enterprise plan. The message appears when no workspace in the organization is on that plan. Contact your account team.

> **New colleagues log in through SSO but do not join their workspace**
>
> Usually intended. The organization's SSO adds people to a workspace only when **SSO login** is enabled for it. With **Mapped-group provisioning** enabled, one of the person's groups must also match a provisioning group of the workspace. A workspace with **Mapped-group provisioning** enabled and no provisioning groups adds no one.
>
> Select the workspace's row in the **Workspaces** table, enable **SSO login** if it is disabled, and compare the person's groups with the provisioning groups. See [Set identity per workspace](#set-identity-per-workspace).

> **The domain example.com is not verified for your organization**
>
> Intended, with the person's domain in place of `example.com`. A person can log in through the organization's SSO only with an email on one of the organization's verified domains. Verify their email domain under **Verified domains**. See [Verify a domain for the organization](#verify-a-domain-for-the-organization).

> **An identity provider with this configuration already exists**
>
> Intended. The same identity provider configuration cannot be connected to both the organization and one of its workspaces. Keep it on the workspace, or remove it there before you add it to the organization. See [Set up SSO for the organization](#set-up-sso-for-the-organization).

> **A workspace admin cannot change the Identity or Privacy & security settings**
>
> Intended. The workspace is **Managed by the organization**, so only org admins can change those settings, in organization settings. To let the workspace's admins and owners change the settings again, disable **Managed by the organization** for that workspace. See [Lock a workspace's settings to the organization](#lock-a-workspaces-settings-to-the-organization).

## FAQ

> **Can workspaces in one organization use different identity providers?**
>
> Yes. A workspace can keep its own SSO provider when it joins. Its members then log in through that provider or through the organization's. **Managed by the organization** decides who can change the workspace's identity settings, not which provider its members use. See [Set up SSO for the organization](#set-up-sso-for-the-organization).

> **Do a workspace's verified domains move to the organization when it joins?**
>
> Only if your account team moves them when the workspace joins. A workspace keeps its own verified domains otherwise, and a domain can be verified by a workspace and by the organization at the same time. Verify the domain for the organization as well, so the organization's SSO and SCIM cover it. See [Add workspaces to the organization](https://docs.lovable.dev/features/organizations#add-workspaces-to-the-organization).

> **Does enabling Managed by the organization remove members or change roles?**
>
> No. It only changes who can change the workspace's **Identity** and **Privacy & security** settings, from the workspace's admins and owners to the org admins. The workspace keeps its own SSO provider and verified domains, and members, roles, projects, and groups stay as they are.


## Related topics

- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md)
- [Organizations: run several workspaces as one company](https://docs.lovable.dev/features/organizations.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
