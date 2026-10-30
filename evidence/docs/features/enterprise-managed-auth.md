# Set up enterprise-managed authentication
<!-- source: https://docs.lovable.dev/features/enterprise-managed-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up enterprise-managed authentication

> Let your team use Lovable from Claude through Okta single sign-on, without a separate Lovable sign-in. Configure access, test it, and disable it.

Your team can use Lovable from Claude without a separate Lovable sign-in. An administrator enables this through your existing Okta single sign-on (SSO) provider. Lovable calls this **enterprise-managed authentication**.

Claude calls the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) on behalf of each member, with their existing Lovable permissions and workspace access controls.

> [!NOTE]
>
> Enterprise-managed authentication is available on Lovable **Business and Enterprise** plans. Claude requires a **Team or Enterprise** plan. "Enterprise-managed" means that your IT administrators manage the connection centrally through SSO, instead of each member connecting on their own. The feature is not limited to the Lovable Enterprise plan.
>
> This setting controls access to Lovable itself. For SSO for the users of an app you build, see [Add SAML single sign-on to your app](https://docs.lovable.dev/features/saml-sso.md).

## Why use enterprise-managed authentication

Use enterprise-managed authentication when your team already uses SSO and you want administrators to control access to Lovable from Claude. Members can work on apps without a separate connector sign-in flow.

To connect your own account, or connect from an app other than Claude, follow the [MCP connection instructions](https://docs.lovable.dev/integrations/lovable-mcp-server.md#how-to-connect).

## Who sets it up

IT and workspace administrators configure access for members who already use Claude through Okta. You can start with a pilot group before expanding access. Members can then use the [Lovable MCP tools](https://docs.lovable.dev/integrations/lovable-mcp-server.md#available-tools) to work on projects they have permission to access.

## Prerequisites

Before you start, make sure you have:

* A Lovable **Business or Enterprise** workspace.
* A workspace **owner or admin** who can manage its SSO provider.
* **Okta** configured as an active OIDC or SAML SSO provider in Lovable. See [Configure Okta as your SSO provider](https://docs.lovable.dev/features/business/sso.md#configure-okta-as-your-sso-provider).
* [Third-party MCP client access](https://docs.lovable.dev/features/privacy-and-security-settings.md#third-party-mcp-clients) enabled for the workspace.
* Admin access to configure Claude's organization connectors and Okta applications.
* A Lovable SSO app in Okta that supports **Cross App Access (XAA)**. XAA lets Claude ask Okta for proof of a member's identity to access Lovable. Your Okta administrator enables it for Claude and Lovable. See [Okta's resource app requirements](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/#supported-resource-apps).

If your SSO provider belongs to an [organization](https://docs.lovable.dev/features/organizations), an org admin enables enterprise-managed authentication from the organization's [Identity page](https://docs.lovable.dev/features/organization-identity.md#set-up-sso-for-the-organization).

Choose a test member who:

* Signs in to Claude through Okta.
* Has a Lovable account linked to this SSO provider.
* Belongs to the workspace being tested.
* Has no existing personal Lovable connector connection in Claude.

> [!NOTE]
>
> Enterprise-managed authentication does not create Lovable accounts, link existing accounts by email, or add workspace members. Members must first sign in to Lovable through SSO or [link SSO to their existing account](https://docs.lovable.dev/features/business/sso.md#faq).

> [!WARNING]
>
> Working SSO does not establish XAA support. If your installed Okta app has no XAA controls, contact Lovable support to confirm an upgrade path. Do not delete or replace a working SSO app to expose these controls. That can disrupt sign-ins and provisioning.

### Supported applications

Claude is the only supported application for enterprise-managed authentication. Claude supports this flow with **Okta only**. See [Configure Claude with Okta](#claude-with-okta).

For a direct Claude Code connection, use the [MCP setup](https://docs.lovable.dev/integrations/lovable-mcp-server.md#how-to-connect).

### Billing and usage

Building through the MCP server uses **Lovable credits**, the same as building in Lovable. See [Does using the MCP server consume credits?](https://docs.lovable.dev/integrations/lovable-mcp-server.md#faq).

Claude and Okta manage their own subscriptions and usage charges separately from your Lovable subscription.

## How authentication works

Enterprise-managed authentication connects three systems:

| System | Responsibility |
| - | - |
| Okta | Authenticates members and checks whether Claude can request access on their behalf. |
| Claude | Requests proof of the member's identity and uses it to connect to Lovable. |
| Lovable | Verifies that proof, identifies the linked Lovable account, and checks permissions when tools access resources. |

After an administrator completes setup:

1. A member signs in to Claude through Okta.
2. Claude requests an **identity assertion** from Okta, subject to Okta's access policies. This signed proof of identity is also called an **ID-JAG**.
3. Lovable checks the identity assertion against the configured SSO provider and the member's linked account. It then issues a short-lived access token.
4. Claude uses that token to call Lovable tools with the member's permissions. The member does not need to approve a separate Lovable connection.

Lovable's access tokens expire within **15 minutes**. Claude requests new tokens automatically while Okta authorizes access. Members do not need a separate Lovable sign-in for each token. See [SSO session duration](#sso-session-duration) for how this differs from a browser sign-in session.

## Set up enterprise-managed authentication

Complete the configuration in all three systems: Lovable, Okta, and Claude. Saving the Lovable settings completes only the Lovable part.

### Enable enterprise-managed authentication in Lovable

Configure access on the SSO provider your members already use to sign in to Lovable.

**1. Open enterprise-managed authentication setup**

Open [Identity](https://lovable.dev/settings/identity) (**Workspace settings → Access → Identity**). In **Enterprise-managed authentication**, click **Set up**.

**2. Choose your identity provider**

On **Choose your identity provider**, select the existing SSO provider your members use for Lovable, then click **Continue**.

If you see **Connect SSO first**, [configure Okta as your SSO provider](https://docs.lovable.dev/features/business/sso.md#configure-okta-as-your-sso-provider) before returning to enable access.

**3. Review the provider and issuer**

On **Configure EMA**, confirm that **Provider** and **Protocol** identify the SSO provider your members use.

**OIDC**

Review the read-only **Assertion issuer** value. Lovable uses the issuer already configured for your OIDC provider. You do not enter a separate value.

**SAML**

Enter the **Assertion issuer** supplied by Okta for identity assertions, for example `https://example.okta.com`.

This URL can differ from the **SAML entity ID**. Use the issuer for the same identity provider and SAML application you configured in Lovable, not the SAML metadata URL or sign-in URL.

Lovable uses the assertion issuer to find Okta's public signing keys and verify identity assertions.

Under **Values for your identity provider**, copy **Audience** and **MCP resource** for the [application and identity provider configuration](#configure-your-application-and-identity-provider).

**4. Check advanced settings if needed**

Leave **Advanced settings → IdP tenant** empty for the Okta setup in this guide.

**5. Review team access**

Click **Review setup**. On **Review team access**, check **Provider**, **Protocol**, **Supported app**, and **Assertion issuer**. Click **Back** if you need to change anything.

**6. Enable team access**

Click **Enable team access**. Lovable checks the issuer and saves the settings. The screen shows **Lovable configuration saved**. Click **Close**.

Setup in Okta and Claude may still be incomplete. Continue with [Configure your application and identity provider](#configure-your-application-and-identity-provider) before testing access.

To update an enabled configuration later, reopen **Enterprise-managed authentication**, click **Manage**, select the provider, and click **Continue**. Edit the settings on **Configure EMA** and click **Save changes**.

You can also use the provider's **Enterprise-managed authentication** tab. When you enable access from that tab, the completion button is **Back to settings**.

### Configure your application and identity provider

The Lovable connection uses these values:

| Where to use it | Value |
| - | - |
| Okta resource app **Issuer URL**, shown as **Audience** in Lovable | `https://lovable.dev/oauth` |
| Okta resource connection **Resource identifier**, shown as **MCP resource** in Lovable | `https://mcp.lovable.dev` |
| Okta resource connection **Claude client ID registered in Lovable** | `https://claude.ai/oauth/mcp-oauth-client-metadata` |
| Okta resource app **Audience/tenant ID** | Leave empty for this setup |
| Permissions needed to list workspaces and projects | `workspaces:read` and `projects:read` |

The **Issuer URL** above identifies Lovable's authorization server. Your **Assertion issuer** in Lovable identifies Okta. Okta's separate **Audience/tenant ID** field is not where you paste Lovable's **Audience** URL.

Follow the Claude and Okta guides below. Okta calls the permissions you grant **Scopes**. Listing workspaces and projects requires the two read permissions above. Building and editing require additional permissions in both Okta and Claude.

#### Claude with Okta

Use the connection values above with the providers' setup guides:

* **In Okta**, enable Cross App Access for the existing Lovable SSO app and connect Claude's agent to it. Follow [Okta's Cross App Access setup guide](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/).
* **In Claude**, open the Lovable connector's **Configuration** tab and set up **Managed authorization**. Choose who gets access, select permissions, and use **Run test** to check the connection. Follow [Claude's organization authorization guide](https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization).

Keep Claude's **Connect** step open while following the identity provider setup guide it provides. Use that guide for agent registration and the connection details exchanged between Claude and Okta.

Lovable accepts Claude's published client identity. You do not create a workspace API key or register a new Lovable OAuth client.

### Verify access as a member

Use a test member without an existing personal Lovable connection in Claude. Confirm that their Claude role receives **Managed authorization**. Sign in to Claude through Okta and ask it to use Lovable:

```text wrap theme={null}
Use Lovable to list the projects in our [workspace name] workspace.
```

Claude should return the expected projects without asking the member to sign in to Lovable. If it asks for individual sign-in, see [Troubleshooting](#troubleshooting) before accepting that prompt.

This prompt checks a real tool call. A successful call through a previously authorized personal connection does not verify managed authentication.

Lovable's completion screen reports **Enabled in Lovable · Access has not been tested** because saving settings does not test access. It does not update automatically after your Claude test.

## Limitations and access controls

Review these access boundaries before enabling managed authentication for your team.

* **Existing permissions apply.** Managed authentication does not grant additional Lovable roles, project access, or workspace membership.
* **Access is not restricted to the provider's workspace.** Claude can act across workspaces the member can access, subject to its granted permissions and each workspace's policies.
* **MCP access is checked per workspace.** [Third-party MCP clients](https://docs.lovable.dev/features/privacy-and-security-settings.md#third-party-mcp-clients) must be enabled in each workspace a member wants to use. Access can work in one workspace and be blocked in another.
* **The Lovable setting applies to the SSO provider.** Enable access on the provider in Lovable. Choose which members can connect and what they can do in Claude and Okta.
* **One active configuration per assertion issuer and IdP tenant.** If another SSO provider already uses that combination, Lovable rejects the new configuration. If several workspaces share it, ask the administrator of the existing configuration to manage the shared provider. See [Resolve an active connection conflict](#this-issuer-and-idp-tenant-already-have-an-active-connection).

### SSO session duration

Lovable checks the sign-in time in the identity assertion when the identity provider supplies it. Okta's identity assertions in this setup do not include that time, so Lovable uses their issue time instead.

> [!WARNING]
>
> With this Okta setup, each new identity assertion starts a new SSO session window. Claude can remain connected beyond the workspace's **Session duration** without the member signing in again. This continues while Okta authorizes access and issues new identity assertions. The setting does not impose a maximum connection duration for this flow.
>
> Control continued access through Okta's authentication and access policies, Claude's managed authorization settings, and Lovable's permissions. Browser SSO session rules remain unchanged.

### Disable enterprise-managed authentication

1. In **Enterprise-managed authentication**, click **Manage**.
2. Select the provider and click **Continue**.
3. On **Configure EMA**, click **Disable**.
4. In **Disable enterprise-managed authentication?**, click **Disable** to confirm.

Your SSO provider stays connected. Lovable retains the settings so you can enable managed authentication again later.

Lovable also disables managed authentication when you delete its SSO provider. For a workspace-owned provider, this also happens when you delete the workspace or change to a plan without SSO. Restoring the workspace or its SSO eligibility does not re-enable managed authentication. An administrator must enable it again.

> [!WARNING]
>
> Disabling managed authentication stops Lovable from issuing new access tokens through that provider. Existing access may continue for up to **15 minutes** while issued access tokens expire. It does not revoke connections that members authorized themselves.

## FAQ

> **Does an XAA-enabled Okta catalog app complete setup for me?**
>
> No. It supplies Lovable's resource configuration and the XAA controls. You still enable XAA, connect Claude's agent to Lovable, configure managed authorization in Claude, and enable access in Lovable.

> **Does enabling this give everyone the administrator's access?**
>
> No. Claude acts as the individual member. That member's Lovable permissions, the permissions granted to Claude, and workspace policies determine what it can do.

> **Do members need to provide a Lovable API key or client secret?**
>
> No. Members do not share API keys or client secrets for this flow. An administrator configures access in Lovable, Claude, and Okta.

## Troubleshooting

> **I cannot find the enterprise-managed authentication settings**
>
> Check that your workspace is on Business or Enterprise and that you have permission to manage the provider.

> **assertion issuer must match the enabled SSO provider**
>
> The OIDC assertion issuer must match the enabled SSO provider. Reload the configuration and confirm the provider is still active. This value is read-only in Lovable's setup.

> **issuer has no usable public signing keys**
>
> Lovable needs to discover the issuer's public signing keys. Ask your Okta administrator to verify that the issuer and its discovery configuration are reachable from the internet. For SAML, use the Okta assertion issuer associated with your SAML app, not the SAML metadata or sign-in URL.

> **The connection is enabled, but a member cannot use Lovable tools**
>
> Check that the member:
>
> * Has a Lovable account linked to this SSO provider.
> * Belongs to the intended workspace.
> * Can use the Lovable connector under Claude's and Okta's access policies.
>
> A matching email address is not enough.
>
> Also check that **Third-party MCP clients** is enabled in the target workspace.

> **Claude still asks members to sign in individually**
>
> Check the member's assigned role and run Claude's connection test. When both **Browser sign-in** and **Managed authorization** are enabled, Claude can fall back to individual sign-in if managed authorization fails. See [Claude's authorization guide](https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization).

> **The identity assertion is invalid or cannot be used**
>
> Check that the Okta connection points to the Lovable SSO app linked to the member's account. Confirm that its resource and client ID match the [Lovable connection values](#configure-your-application-and-identity-provider).
>
> Ask your Okta administrator to review any mismatches using [Okta's connection guide](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/#configure-the-xaa-connection). Also check the member's linked account and **Assertion issuer** in Lovable.

> **The connection test returns invalid\_scope**
>
> Compare the permissions requested by Claude with **Scopes** on the Okta connection. The Lovable app in Okta must support every permission Claude requests. Read-only permissions do not allow building or editing.

> **this issuer and IdP tenant already have an active connection**
>
> Another SSO provider already uses this combination. Manage the existing shared configuration with its administrator instead of creating another. Do not enter a made-up **IdP tenant** to bypass the conflict: it must match the identity assertion.

> **The configuration needs review or an update fails**
>
> If Lovable shows **Access needs your review**, the provider or its administering account changed. Review the settings and enable access again when the issue is resolved.
>
> In the **Could not update enterprise-managed authentication** error message, click **Reload configuration** to check the saved state before retrying. If you have unsaved edits, confirm **Discard and reload** to replace them with the latest saved settings.


## Related topics

- [Manage workspace identity and user provisioning](https://docs.lovable.dev/features/workspace-identity.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
- [Managed registry](https://docs.lovable.dev/features/managed-registry.md)
- [Set up your Microsoft tenant for Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md)
- [Set up organization identity: domains, SSO, and SCIM](https://docs.lovable.dev/features/organization-identity.md)
