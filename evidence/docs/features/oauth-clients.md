# Connect apps to Lovable with OAuth
<!-- source: https://docs.lovable.dev/features/oauth-clients.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect apps to Lovable with OAuth

> Register OAuth clients to connect your apps to Lovable, choose scopes, request verification for sensitive scopes, and manage client credentials.

Connect your app to Lovable with OAuth. Your app asks each user to allow access to their profile, projects, or workspaces. The user signs in to Lovable and reviews the scopes your app requests.

An **OAuth client** is a registration for your app. It defines the app's name, where Lovable sends users after authorization, and which scopes the app can request. Registering a client gives you a **client ID** and, for a Web server client, a **client secret** to configure your integration.

> [!NOTE]
>
> Available on **all plans**. Only workspace **owners and admins** can register and manage clients. **Sensitive scopes** require **Business or Enterprise**.

## Why use OAuth clients

Use OAuth when your app needs to act on behalf of individual Lovable users. For example, an MCP client without a preconfigured Lovable connection can use a custom OAuth client to connect to the Lovable MCP server on each user's behalf, without asking them to share an API key or password.

You choose the scopes your client can request, and each user authorizes the app. OAuth scopes do not expand the user's existing access to projects or workspaces.

For a script that manages a single workspace without asking each user to connect, see [Workspace API keys](https://docs.lovable.dev/features/api-keys.md), available on Business and Enterprise plans.

## Common use cases and example apps

Choose scopes based on what your app needs to do. These examples show scopes to consider for common integrations.

| Use case | Example app | Scopes to consider |
| - | - | - |
| Identify a Lovable user | A community portal that recognizes a user's Lovable account | `openid`, `profile`, and `email` |
| Connect another MCP client | A third-party or internal AI assistant without a preconfigured Lovable connection | The project and workspace scopes its tools need |
| Manage projects and view workspace details | A dashboard that shows workspace information and lets users update their projects | `openid`, `projects:write`, and `workspaces:read` |

Add `offline` if your app needs refresh tokens to keep the connection working after the initial access token expires.

For an MCP client that supports custom OAuth credentials, register an OAuth client with the callback URL it provides, then configure it with your client ID and secret. It can connect to the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md) at `https://mcp.lovable.dev` on behalf of each user who signs in and authorizes access.

## Prerequisites

Before you register a client, make sure you have:

* A workspace on any plan for non-sensitive scopes. Sensitive scopes require **Business or Enterprise**.
* The **owner or admin** role in that workspace.
* An app or integration that supports the OAuth authorization code flow with **PKCE using S256**. PKCE ties each authorization request to its token exchange.
* A **redirect URI**, also called a callback URL, that your app uses to receive the authorization response.
* For a Web server client, a secure backend or connector configuration that can store the client secret and exchange authorization codes for tokens.

## Register an OAuth client

Register your app in the workspace that will own and manage its client credentials.

**1. Open OAuth client settings**

Select the workspace that will own the client, then go to **Workspace settings → API keys & OAuth → OAuth clients**.

Click **New OAuth client**.

**2. Choose the application type**

Under **Application type**, select **Single-page app** for an app that handles sign-in in the browser, or **Web server** for an app that handles sign-in on a backend server. A Single-page app uses PKCE without a client secret. A Web server app uses a client secret and PKCE. You cannot change the type after registration.

**3. Name your client**

Enter a descriptive **Client name**, such as `Project reporting dashboard`.

**4. Add redirect URIs**

Under **Redirect URIs**, enter the callback URL provided by your app or integration, for example `https://example.com/oauth/callback`. Redirect URIs must use `https`. During development you can also use `http` with `localhost`, `127.0.0.1`, `[::1]`, or a `.localhost` address.

Click **Add redirect URI** if your integration uses additional callback URLs. Each client can have up to 10.

**5. Choose scopes**

Under **Scopes**, select only the scopes your app needs.

Scopes are grouped into **Non-sensitive scopes** for sign-in and profile access, and **Sensitive scopes** for project and workspace access. Use the [scope reference](#available-scopes) below to choose scopes. Your app's authorization request must stay within the scopes registered for the client.

**6. Register and save your credentials**

Click **Register client**. Lovable opens the client's details and shows its **Client ID** and, for a Web server client, its **Client secret**.

Copy the values into your integration's secure configuration before leaving the page.

> [!WARNING]
>
> The client secret is shown only once. Store it securely. Do not put it in browser code, a public repository, or a prompt. If you lose it, [generate a new secret](#generate-a-new-client-secret) and update your integration.

### Available scopes

Scopes define which data your app can read and which actions it can take on a user's behalf. Registering a scope allows your app to request it. The app must also include it in the authorization request.

**Non-sensitive scopes** are available on all plans. **Sensitive scopes** require a Business or Enterprise workspace.

| Scope | Category | Purpose |
| - | - | - |
| `openid` | Non-sensitive | Identify the signed-in user with OpenID Connect. |
| `profile` | Non-sensitive | Read the user's profile information. |
| `email` | Non-sensitive | Read the user's email address. |
| `offline` | Non-sensitive | Receive refresh tokens when requested during authorization. |
| `projects:read` | Sensitive | Read the user's accessible projects. |
| `projects:write` | Sensitive | Read, create, and modify projects. |
| `workspaces:read` | Sensitive | Read the user's accessible workspaces. |
| `workspaces:write` | Sensitive | Read and modify existing workspaces, subject to the user's existing access. |

## Connect your app

Give your integration the client ID, the client secret for a Web server client, the registered callback URL, and the required scopes. Configure it to use the **authorization code** flow with **PKCE using S256**.

Users sign in to Lovable and authorize the requested scopes. Lovable returns an authorization code to your callback URL, and your app exchanges it for tokens using the PKCE verifier and, for a Web server client, the client secret. Your app uses the access token to act on the user's behalf, for example as a bearer token for the [Lovable API](https://docs.lovable.dev/api-reference/introduction.md).

Use an OAuth or OpenID Connect library to handle PKCE, validate the authorization response and any ID token used for sign-in, and store tokens securely. For refresh tokens, include `offline` in both the client's registered scopes and the authorization request.

### OAuth endpoints

Use these production endpoints for a custom integration:

| Setting | URL |
| - | - |
| Issuer | `https://lovable.dev/oauth` |
| OpenID Connect discovery | `https://lovable.dev/oauth/.well-known/openid-configuration` |
| Authorization endpoint | `https://lovable.dev/oauth/authorize` |
| Token endpoint | `https://lovable.dev/oauth/token` |
| UserInfo endpoint | `https://lovable.dev/oauth/userinfo` |
| Public signing keys | `https://lovable.dev/oauth/keys` |

Use the [OpenID Connect discovery document](https://lovable.dev/oauth/.well-known/openid-configuration) to configure your library. It includes capabilities for other client types, so use the scopes and authorization flows described on this page.

## Manage OAuth clients

After registration, open a client's details to request verification, update its settings, replace its secret, or delete the client.

### Request verification from Lovable

To protect users, OAuth clients registered with **sensitive scopes** need verification from Lovable. Until a client is verified, users see a warning when authorizing it.

To request verification, open your client from **Workspace settings → API keys & OAuth → OAuth clients**, then click **Request approval** next to **Verification**. When Lovable verifies your client, the badge shows **Verified by Lovable** and the warning no longer appears. If Lovable has not decided within five days, the request expires and you can request approval again. If Lovable denies the request, the badge shows **Approval denied**. You can change the client and request approval again.

### Edit a client

Open the client, click **Edit client**, update its name, redirect URIs, or scopes, and click **Save changes**. The client ID and secret stay the same.

> [!WARNING]
>
> Changes can affect sign-in for existing integrations. Check your app's callback URLs and requested scopes before saving.

Edits to a verified client that include sensitive scopes create a review request. The current configuration and verified status remain active while Lovable reviews the proposal. Review the proposed settings under **Pending changes** on the client's details page.

You can edit a pending verification request or change request. **Edit client** opens the proposed settings, and saving replaces the pending review with a new request. The current settings stay active until approval, even if the revised proposal removes all sensitive scopes. Use **Withdraw request** if you want to cancel the request. Editing and withdrawal are unavailable once Lovable starts applying an approval.

When no review is pending, edits to unverified clients or changes that leave only non-sensitive scopes apply immediately and reset verification. Clients with only non-sensitive scopes do not need to request verification again.

If you add a scope and your app starts requesting it, users who already connected are asked to authorize it the next time they sign in.

### Generate a new client secret

A Web server client has one active secret. Use this if you lose it or need to replace it.

1. Open the client and click **Generate new secret** under **Client secret**.
2. Confirm **Generate new secret**.
3. Copy the new secret and update every app or connector configuration that uses this client.
4. Test sign-in and token refresh with the updated configuration.

> [!WARNING]
>
> The old secret stops working within a few seconds. Sign-in and token refresh fail for integrations that still use it. The new secret is shown only once, so copy it before leaving the page.

### Delete a client

Open the client's menu in the list, or the client's details, and click **Delete client**, then confirm. Apps that use the client can no longer sign users in with Lovable, and existing connections stop working. Deleting a client cannot be undone.

## Limitations

Keep these registration limits and supported authorization flows in mind when planning your integration.

* You can register up to **20 OAuth clients per workspace**. Delete an unused client before registering another when you reach this limit.
* Clients support the authorization code flow with PKCE and optional refresh tokens. The client credentials grant for unattended access without a user is not supported.
* Only the eight scopes listed on this page are available.

## FAQ

> **Which plans and roles can manage OAuth clients?**
>
> Workspace **owners and admins on all plans** can manage clients. Free and Pro support non-sensitive scopes. Sensitive scopes and workspace API keys require **Business or Enterprise**.

> **Is this the same as adding Google sign-in to my app?**
>
> No. OAuth clients let a website or tool you did not build with Lovable request access to a user's **Lovable account**. To let users sign in to an app you built with Lovable using Google, see [Add Google authentication](https://docs.lovable.dev/features/google-auth.md). To let them sign in to that app with their Lovable account, enable [Sign in with Lovable](https://docs.lovable.dev/features/lovable-auth.md) in the app's auth settings, and Lovable registers the client for you.

> **Can users connect before Lovable verifies my client?**
>
> Yes. Clients with only non-sensitive scopes do not need verification. Clients registered with sensitive scopes show an unverified app warning until Lovable verifies them. Requesting approval alone does not remove the warning.

> **Can I view my client secret again?**
>
> No. Lovable shows the secret only when you register the client or generate a new secret. If you did not save it, generate a replacement and update your integration. The old secret stops working within a few seconds.

> **Does selecting a scope automatically give my app access?**
>
> No. Your app must request that scope during authorization, and the user must authorize the app. Requests also remain subject to the user's existing access to the relevant projects and workspaces.

## Troubleshooting

> **I cannot see OAuth clients in settings**
>
> Only workspace **owners and admins** see the **OAuth clients** section under **Workspace settings → API keys & OAuth**. Ask an owner or admin to register the client, or to change your role.

> **Sign-in works, but my app does not receive a refresh token**
>
> Select `offline` in the client's scopes and include it in your app's authorization request. Users who already connected must authorize the updated request the next time they sign in.

> **Verification is pending or the status is unavailable**
>
> **Approval requested** means Lovable is still reviewing the client. If more than five days have passed, the request has expired and you can request approval again. **Verification pending** means Lovable approved the client and is still applying the change. **Status unavailable** means Lovable could not load the verification status. Try loading the client again. If either of the last two states persists, [contact Lovable support](https://docs.lovable.dev/introduction/support-policy.md). None of these states means the client is verified.


## Related topics

- [Connect your app to Lightspeed](https://docs.lovable.dev/integrations/lightspeed.md)
- [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
