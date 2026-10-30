# Set up SCIM user provisioning
<!-- source: https://docs.lovable.dev/features/business/scim.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up SCIM user provisioning

> Configure SCIM provisioning to automatically create, update, and remove users in Lovable using your identity provider. Manage user access, roles, and lifecycle centrally with Okta, Microsoft Entra ID, and other SCIM 2.0 providers.

**SCIM (System for Cross-domain Identity Management)** lets your identity provider (IdP) create, update, and remove Lovable users automatically. It is available on the **Enterprise plan**.

With SCIM, you can manage workspace access centrally from your IdP. Users are automatically added when assigned, removed when unassigned, and assigned roles based on group membership, keeping your workspace in sync without manual user management.

## Prerequisites

Before setting up SCIM provisioning, you need:

* **IdP admin access** in Okta, Microsoft Entra ID, or any other SCIM 2.0 provider.
* **Workspace owner or admin role** in Lovable.
* **At least one verified domain** for your workspace. SCIM only provisions users whose email domain is verified. See [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md).
* **An active single sign-on (SSO) provider** using OIDC or SAML. See [Set up single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md).
* **IdP groups for each Lovable role.** During setup, you map at least one IdP group to each of the **Admin**, **Editor**, and **Viewer** roles. See [Plan your identity provider groups](#plan-your-identity-provider-groups).

> [!NOTE]
>
> If your workspace belongs to an [organization](https://docs.lovable.dev/features/organizations), an org admin can set up SCIM once for every workspace. See [Provision members with SCIM](https://docs.lovable.dev/features/organization-identity.md#provision-members-with-scim). When the organization has SCIM, no workspace in it can set up its own. If the workspace is **Managed by the organization**, its **Identity** tab shows that the organization manages these settings.

If you don't have SSO yet, you typically create one application in your identity provider that handles both SSO authentication and SCIM provisioning. If you already have SSO, you can create a separate IdP application for SCIM provisioning and keep your existing SSO setup unchanged. Lovable continues to use your current SSO provider for authentication, regardless of which IdP application handles SCIM.

> [!NOTE]
>
> Some identity providers require SCIM provisioning to be configured on a SAML application, even if SSO authentication uses OIDC. In this case, the SAML application with SCIM enabled is used only for provisioning and does not need to be configured as an SSO provider in Lovable.

## How SCIM works in Lovable

This section explains how Lovable processes SCIM events from your identity provider.

### User provisioning

When your IdP creates or assigns a user to the Lovable application:

1. The IdP sends a SCIM request to Lovable.
2. Lovable verifies that the user’s email domain is verified for your workspace.
3. If **Send welcome email to provisioned users** is enabled, the user receives an email invitation to join.
4. The user joins the workspace with the default role when they accept the invitation or log in through your SSO provider. When your IdP pushes their group membership, Lovable updates the role from your group mappings.

### User deprovisioning

When your IdP removes or deactivates a user:

1. The IdP sends a deactivation request to Lovable.
2. Lovable removes the user from your workspace, or deletes their pending invitation if they have not joined yet.
3. The user can no longer access the workspace. Projects they owned go to the member with the highest role (owners first, then admins, then editors). Projects with access set to **Restricted** are not transferred. A workspace owner has to transfer them manually. See [Choose who inherits their projects](https://docs.lovable.dev/features/people.md#choose-who-inherits-their-projects).

> [!NOTE]
>
> SCIM cannot deactivate or delete the workspace owner.

### Group push and role updates

When your IdP pushes groups to Lovable:

1. Pushed groups appear in [**Workspace settings → Access → Groups**](https://lovable.dev/settings/groups) with a **SCIM** badge, and Lovable keeps their membership in sync with your IdP. See [SCIM groups](https://docs.lovable.dev/features/groups.md#scim-groups).
2. Users in a mapped group receive the mapped role. A user in several mapped groups receives the highest-privilege role.
3. Users removed from all mapped groups keep their workspace access and receive the default role. To remove a user from the workspace, unassign them from the Lovable application in your IdP.

> [!WARNING]
>
> A group mapped to **Owner** grants the Owner role to every member of that group. Map a group to **Owner** only if you intend to grant ownership through your IdP. Group push never lowers the workspace owner's role, even when their own groups map to a lower role.

### Supported SCIM operations

Lovable implements the SCIM 2.0 specification and supports the following operations:

| Resource | Supported operations |
| :- | :- |
| Users | Create, read, update, delete, list |
| Groups | Create, read, update, delete, list, member push |

## Plan your identity provider groups

Lovable assigns roles from the IdP groups you map, so decide on your groups before you start the setup wizard. You create and manage the groups in your identity provider. These rules are specific to Lovable:

* **One group per role, at minimum.** The setup wizard requires at least one group mapped to each of **Admin**, **Editor**, and **Viewer**. You can map more groups to the same role later, for example one group per team that all map to **Editor**.
* **Exact names.** Enter each group name exactly as your identity provider sends it, including capitalization and punctuation. Matching is case-sensitive, so `Engineering-Admins` and `engineering-admins` are different groups to Lovable.
* **Highest role wins.** A user in several mapped groups receives the highest-privilege role among them.
* **A default role covers everyone else.** Users whose groups have no mapping receive the default role, which is **Viewer** after setup. You can [change the default role](#change-the-default-role) later.
* **Push the groups you map.** If your identity provider supports group push, push the same groups you map in Lovable so that group membership stays in sync.
* **Owner is a mapping option.** A group mapped to **Owner** grants the Owner role to its members. See [Group push and role updates](#group-push-and-role-updates).

For creating groups, adding members, and pushing or assigning groups to an application, follow your identity provider's documentation:

* Okta: [Manage groups](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-groups-main.htm) and [Manage Group Push](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-group-push-main.htm)
* Microsoft Entra ID: [How to manage groups](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups) and [Manage users and groups assignment to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal)

## Set up SCIM provisioning

Setting up SCIM provisioning requires configuration in both Lovable and your identity provider. You start in Lovable, where a short wizard collects your group mappings and then generates the credentials your identity provider needs. You then complete the setup in your IdP.

### Step 1: Configure SCIM in Lovable

First, enable SCIM provisioning in Lovable and copy the values needed by your identity provider.

**1. Open identity settings and start the setup**

Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click **Enable** in the **SCIM provisioning** row.

The button is disabled until your workspace has an SSO provider, with the hint **Configure an SSO provider before enabling SCIM**.

**2. Configure group mappings and the welcome email**

The wizard opens on **Configure group mappings** with one row each for **Admin**, **Editor**, and **Viewer**.

* **Group name**: Enter the group name exactly as it appears in your identity provider. Matching is case-sensitive.
* **Role**: Choose **Viewer**, **Editor**, **Admin**, or **Owner**.

Click **Add group** to map more groups. Each of **Admin**, **Editor**, and **Viewer** needs at least one group. Lovable locks the last row for those roles, and **Continue** stays disabled until all three have a group name.

Below the table, use the **Send welcome email to provisioned users** toggle to control whether Lovable emails an invitation to each user provisioned through SCIM.

* **Enabled (default):** Each newly provisioned user receives a welcome email with a link to join the workspace.
* **Disabled:** Users are provisioned silently. They can still log in through your configured SSO provider when they're assigned in your IdP.

Click **Continue**. Lovable enables SCIM provisioning and generates your API key.

**3. Copy the Base SCIM URL and API key**

The **Set up SCIM provisioning** screen shows the two values your identity provider needs:

* **Base SCIM URL:** The endpoint your IdP uses to sync users.
* **SCIM API key:** The bearer token that authenticates SCIM requests. Anyone with this key can provision users in your workspace.

> [!WARNING]
>
> **Copy the API key now.** Lovable shows the key masked and lets you copy it only on this screen. If you lose it, rotate the key to generate a new one.

Click **Done** to finish. If you click **Cancel** on this screen and confirm with **Cancel setup**, Lovable disables SCIM and invalidates the new API key. Run the setup again to generate another one.

After setup, the default role for users without a mapped group is **Viewer**. You can change it, add more provisioning groups, or update the welcome email setting at any time. See [Manage SCIM provisioning](#manage-scim-provisioning).

> [!NOTE]
>
> Enabling SCIM disables **Verified email sign-up** in the **User provisioning** section, because SCIM now manages workspace membership from your identity provider. See [Workspace identity settings](https://docs.lovable.dev/features/workspace-identity).

### Step 2: Configure SCIM in your identity provider

Use the values generated in Lovable to configure SCIM provisioning in your identity provider.

| Setting | Value |
| :- | :- |
| Base URL | `https://api.lovable.dev/scim/v2` |
| Authentication | Bearer token |
| API key | \<your API key generated in Lovable> |

Select your identity provider below and follow the instructions to complete SCIM configuration. For more information, refer to your IdP's official documentation.

**Okta**

SCIM provisioning uses the same **Lovable** app you added from the Okta App Catalog for SSO. Complete [Set up single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md) first.

**1. Open the Lovable app's Provisioning tab**

In the **Okta Admin Console**, open the **Lovable** application you created for SSO and go to the **Provisioning** tab.

**2. Configure API integration**

* Click **Configure API Integration**, then check **Enable API integration**.
* Enter the **Base URL** (`https://api.lovable.dev/scim/v2`) and paste your Lovable **SCIM API key** into the **API Token** field.
* Click **Test API Credentials**. You should see "Lovable was verified successfully!"
* Click **Save**.

**3. Enable provisioning actions**

* In the **Provisioning** tab, click **To App** in the left sidebar.
* Click **Edit** and enable:
  * **Create Users**
  * **Update User Attributes**
  * **Deactivate Users**
* Click **Save**.

**4. Assign users and push groups**

* Assign users (or groups) to the Lovable app under **Assignments**.
* Enable group push in Okta and push the same groups you mapped in Lovable, using the same group names.

**Microsoft Entra ID (Azure AD)**

SCIM provisioning in Microsoft Entra ID is supported only through a SAML application. If you use OIDC for SSO, you’ll need to create a separate SAML app in Microsoft Entra ID for SCIM provisioning.

**1. Start provisioning setup in Microsoft Entra ID**

* Go to **Microsoft Entra admin center** **→** **Enterprise applications.**
* Create a new SAML application or select your existing SAML Lovable app.
* Select **Provisioning → New configuration.**

**2. Configure admin credentials**

Under **Admin credentials**, enter the following values:

* Authentication method: Bearer Authentication
* Tenant URL: `https://api.lovable.dev/scim/v2`
* Secret token: `<your Lovable SCIM API key>`

**3. Test the connection**

Click **Test connection** to verify the setup.

**4. Create the configuration**

Click **Create.**

**5. Start provisioning**

In the provisioning configuration **Overview (Preview)** page, click **Start provisioning**.

**Other SCIM 2.0 providers**

If you're using any other identity provider that supports SCIM 2.0, follow these general instructions to configure provisioning.

**1. Enable SCIM provisioning or automatic provisioning in your IdP**

* In your IdP admin console, locate the SCIM or provisioning settings for your Lovable application.
* Enable SCIM provisioning or automatic provisioning.

**2. Configure the SCIM connection**

Configure the SCIM connection with the following values:

* SCIM base URL / Tenant URL: `https://api.lovable.dev/scim/v2`
* Authentication method: `Bearer token (HTTP header)`
* API token / Secret token: `<your Lovable SCIM API key>`
* Unique identifier field: `userName (email address)`

**3. Enable provisioning actions**

Enable the provisioning actions you want to use:

* Create users
* Update user attributes
* Deactivate or delete users
* Push groups (if using group-based role mapping)

**4. Test the connection**

Test the connection using your IdP's built-in test feature.

**5. Save the configuration**

Save the configuration and enable provisioning.

When SCIM provisioning is configured in both Lovable and your identity provider, user provisioning and deprovisioning will begin automatically based on assignments in your IdP.

## Manage SCIM provisioning

After setup, the **SCIM provisioning** row in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) shows the Base SCIM URL and the current default role. Click the row to open the **SCIM provisioning** dialog, which has two tabs:

* **General**: the Base SCIM URL, the API key, the default role, the welcome email setting, the SCIM-managed membership setting, and the **Disable SCIM** button.
* **Activity**: a log of the SCIM requests your identity provider has sent.

Changes on the **General** tab apply when you click **Save changes**.

### Manage provisioning groups

A **provisioning group** assigns a workspace role to every user in a matching IdP group, so you can control permissions centrally. The groups you entered during setup appear in the **Provisioning groups** section of [Identity](https://lovable.dev/settings/identity).

SSO reads the same provisioning groups, so a change here also changes the role people get when they log in through your SSO provider. A provisioning group is not a workspace [group](https://docs.lovable.dev/features/groups.md). A provisioning group sets a member's role in the workspace. A workspace group grants access to projects and folders inside it.

To add a provisioning group:

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and find **Provisioning groups**.
2. Click **Add group**.
3. In **Group name**, enter the group name exactly as it appears in your IdP (for example, `engineering-admins`).
4. Select the **Default role** for members of this group: **Viewer**, **Editor**, or **Admin**. Workspace owners can also select **Owner**.
5. Click **Add**.

To change a provisioning group, click its row, make your changes, and click **Save**. To remove one, click its trash icon and confirm with **Remove**. Each change takes effect when you confirm it, with no separate **Save changes** step.

Removing a provisioning group does not remove anyone from the workspace. On your next group push, Lovable gives its members the role their remaining groups grant, or the default role when none match. Lovable also stops placing new members from that group through SSO login.

Group names must match your identity provider exactly, including capitalization. See [Plan your identity provider groups](#plan-your-identity-provider-groups).

**Example mappings**

| IdP group | Lovable role |
| - | - |
| `lovable-admins` | Admin |
| `engineering` | Editor |
| `contractors` | Viewer |

### Change the default role

The default role applies to provisioned users who are in no mapped group. It is **Viewer** after setup. Changing it affects future provisioning and group syncs, not the roles members already have.

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
2. On the **General** tab, choose **Viewer**, **Editor**, or **Admin** under **Default role for new members**.
3. Click **Save changes**.

### Rotate the API key

Rotate the API key if it may have been exposed or you need a new one:

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
2. On the **General** tab, click **Rotate API key** (the rotate icon) next to **SCIM API key**.
3. Click **Rotate key** to confirm.
4. Copy the new API key from the **New SCIM API key** dialog, then click **Done**.
5. Update your IdP with the new API key.

> [!WARNING]
>
> Rotating the API key immediately invalidates the previous API key. Update your IdP configuration immediately to avoid provisioning interruptions.

### Toggle welcome emails for provisioned users

Control whether Lovable sends a welcome email to each user provisioned through SCIM:

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
2. On the **General** tab, enable or disable **Send welcome email to provisioned users**.
3. Click **Save changes**. The change applies to users provisioned after you save. Existing members are not affected.

> [!NOTE]
>
> Disable this setting if you onboard users through a different channel (for example, an internal announcement) and don't want them to receive a separate Lovable invitation email.

### Lock membership to your identity provider

Enable **SCIM-managed invites and removal** to make your identity provider the only source of workspace membership. While it is enabled, Lovable blocks these actions for everyone in the workspace, including admins and owners:

* Inviting members, including through workspace invite links
* Removing members who have joined
* Project collaborator invitations that would add someone to the workspace
* Approving workspace access requests
* Transferring primary ownership to an account outside the workspace (transfers to existing members still work)

Admins and owners can still revoke pending invitations and change member roles in Lovable. SSO login still adds users your IdP has provisioned.

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
2. On the **General** tab, enable **SCIM-managed invites and removal**.
3. Click **Save changes**.

Disabling SCIM also disables this setting.

### Review SCIM activity

The **Activity** tab of the **SCIM provisioning** dialog lists the requests your identity provider has sent, with the time, action, affected user or group, and whether the request succeeded. Use it to confirm that a sync reached Lovable or to find the request that failed.

* **Last SCIM activity**, next to the **SCIM activity** heading, shows when your IdP last contacted Lovable, or **No requests received yet** if it never has.
* The **Users** and **Groups** cards summarize the requests in the selected period.
* Search by user or group, or filter by action. The actions are **User created**, **User updated**, **User deleted**, **User deactivated**, **User role updated**, **User domain blocked**, **Group created**, **Group updated**, and **Group deleted**.
* Click a row to see the full details of the request. **View all in audit logs** opens the same events in the [audit log](https://docs.lovable.dev/features/audit-logs.md).

You can also filter the [People](https://docs.lovable.dev/features/people.md) tab by **SCIM-managed** or **Not SCIM-managed** to see which members your identity provider controls.

### Disable SCIM provisioning

To stop automatic provisioning:

1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
2. On the **General** tab, click **Disable SCIM**.
3. Click **Disable SCIM** again to confirm.

> [!NOTE]
>
> Disabling SCIM stops automatic provisioning but does not remove existing workspace members. Users previously provisioned via SCIM remain in the workspace until you remove them. Lovable also deletes all SCIM-managed groups in [**Workspace settings → Access → Groups**](https://lovable.dev/settings/groups), along with any project access granted through them.

> [!NOTE]
>
> Deleting your workspace SSO provider also removes SCIM provisioning as part of the same action: the SCIM API key is revoked and SCIM-managed groups are deleted, all in a single audited step. See [Delete an SSO provider](https://docs.lovable.dev/features/business/sso.md#delete-an-sso-provider).

## Troubleshooting

> **Domain "example.com" is not verified for this workspace**
>
> SCIM only provisions users whose email domain is verified for your workspace. Your IdP receives this message with a 403 status, with the user's domain in place of `example.com`, and the request appears as **User domain blocked** on the **Activity** tab. To fix:
>
> 1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**).
> 2. Add and verify the email domain under **Verified domains**.
> 3. Retry provisioning from your IdP.

> **Users are provisioned but can't log in**
>
> Verify that:
>
> * Your SSO provider is correctly configured.
> * Users are assigned to the SSO application in your IdP.
>
> Users provisioned via SCIM must authenticate through SSO.

> **Role mappings are not being applied**
>
> Check that:
>
> * Group names in your mappings match what your IdP sends exactly, including capitalization.
> * Your IdP is configured to push groups to Lovable.
> * The **Activity** tab shows the group sync from your IdP as **Group created** or **Group updated**.

## FAQ

> **Can I use SCIM without SSO?**
>
> No, SCIM requires an active SSO provider. Users provisioned via SCIM authenticate using your configured SSO provider.

> **What happens to existing users when I enable SCIM?**
>
> Existing workspace members are not affected when you enable SCIM. SCIM manages users provisioned through your IdP. Previously invited users continue to exist alongside SCIM-provisioned users.
>
> Enabling SCIM disables **Verified email sign-up**, so new users with a verified-domain email no longer join automatically outside SCIM. See [Workspace identity settings](https://docs.lovable.dev/features/workspace-identity).

> **I lost my API key. What should I do?**
>
> You can copy the API key only on the setup screen where Lovable generates it. If you've lost it:
>
> 1. Go to [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**) and click the **SCIM provisioning** row.
> 2. On the **General** tab, click **Rotate API key** next to **SCIM API key** and confirm with **Rotate key**.
> 3. Copy the new key, then update your IdP with it.

> **Can I provision users without sending them a welcome email?**
>
> Yes. During SCIM setup, disable **Send welcome email to provisioned users**. You can also change this setting at any time from the **General** tab of the **SCIM provisioning** dialog in [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**). When disabled, provisioned users can log in through your configured SSO provider without receiving an invitation email from Lovable.

> **What happens if a user belongs to multiple mapped groups?**
>
> When a user belongs to multiple mapped groups, Lovable assigns the highest-privilege role from those groups.

> **Why does my IdP group not match a role mapping?**
>
> Group name matching is case-sensitive. The name in your mapping must match the group name your identity provider sends exactly, including capitalization and punctuation. Copy the name from your identity provider instead of typing it. Until the names match, users in that group receive the default role.

> **Should I use SCIM or just-in-time (JIT) provisioning?**
>
> SCIM is recommended for managed environments where user lifecycle and access should be controlled centrally from your identity provider.
>
> Just-in-time (JIT) provisioning applies only to users who sign up through SSO. When a user is created via SSO sign-up, the JIT role is applied.
>
> When users are provisioned via SCIM, user creation and role assignment are managed by SCIM, including group-based role mappings, user metadata, or the default SCIM role. In this case, SCIM provisioning and role assignments take precedence over JIT.


## Related topics

- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Groups](https://docs.lovable.dev/features/groups.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
