# App user connectors: let your users connect their own accounts
<!-- source: https://docs.lovable.dev/integrations/app-user-connectors.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# App user connectors: let your users connect their own accounts

> App user connectors let each end user of your published Lovable app connect their own third-party account, so your app acts on their behalf with their own permissions. Authentication is handled securely through Lovable's connector gateway.

**App user connectors** let **each end user of your published app** connect **their own** third-party account. Your app then acts **on their behalf**, with their own permissions and only their data. Authentication runs through Lovable's [connector gateway](https://docs.lovable.dev/integrations/security.md#gateway-connectors), so user tokens are stored securely and never exposed in your project.

Use an app user connector when each signed-in user should see **their** inbox, **their** calendar, or **their** CRM records, not a single shared account.

## Standard connector vs. app user connector

Both are [app connectors](https://docs.lovable.dev/integrations/app-connectors.md) and both route through the gateway. The difference is **whose account** the app uses.

| | **Standard app connector** | **App user connector** |
| :- | :- | :- |
| **Whose account** | One account you connect once | Each end user's own account |
| **Who authorizes** | You (or a workspace admin) | Every user, the first time they use it |
| **Data the app sees** | The single connected account's data, shared by all visitors | Only the signed-in user's data, per their granted scopes |
| **Typical use** | Send from a company inbox, post to one Slack workspace, query one warehouse | "Connect your Gmail", "Connect your Salesforce", per-user dashboards |
| **Credentials** | Stored once, reused for every request | Stored per user, isolated from other users |

> [!NOTE]
>
> **Which one to use.** If every visitor should act as the *same* account (for example, notifications from one company Slack), use a standard connector. If every visitor should act as *themselves* (for example, viewing their own calendar events or their own CRM records), use an **app user connector**.

## How it works

An **app user connector** has two parts: a **client** you configure once, and the **individual sign-ins** your end users complete when they use the app.

### 1. You configure the client once

You set up a client for the connector once for your workspace. Depending on the provider, this means registering an OAuth application with that provider and adding its details to the client. Examples are a Salesforce External Client App, a Databricks OAuth app, or a Snowflake OAuth security integration. This configuration is stored securely and reused for every user who connects. It never contains any individual user's data.

### 2. Each user connects their own account

The first time one of your users needs the integration, your published app sends them through the provider's standard **OAuth consent screen**. The user signs in with their own account and approves the requested permissions (scopes). Lovable exchanges the authorization for tokens and stores them **encrypted in the connector gateway**, linked to that individual user.

### 3. Your app calls the provider through the gateway

When your app makes a request, it goes to the **connector gateway** rather than directly to the provider. The gateway:

* **Finds the connection for the request** and checks that it belongs to this workspace, project, and user.
* **Refreshes expired tokens automatically.** When the provider rejects a request because the access token has expired, the gateway refreshes it with the refresh token and returns the response to your original request. If the refresh token is no longer valid, the gateway answers with a 401 error whose `type` is `credential_refresh_token_expired`, and the code Lovable generates asks the user to reconnect.
* **Injects the credentials** and forwards the request to the provider. The third-party tokens never touch your app code.
* **Stores each user's credentials separately.** How your app picks the right user depends on how users sign in:
  * For apps published to your workspace that use [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md) (Business and Enterprise plans, newer apps), your app exchanges the signed-in member's identity token for a short-lived access token and sends it to the gateway. The gateway verifies the token and finds that member's connection.
  * When your app manages sign-in itself, for example with [built-in authentication](https://docs.lovable.dev/features/authentication), each user's sign-in gives your app an opaque connection key for that user. Your app sends that key together with its `LOVABLE_API_KEY` on every request for the user, including background operations. The gateway uses the pair to find the connection and stores only a hash of the key.

> [!NOTE]
>
> Because tokens live in the gateway and not in your project, they are not visible in project settings, to workspace admins, or to Lovable while it builds your app. See [Integration security](https://docs.lovable.dev/integrations/security.md#credentials) for how credentials are stored, rotated, and deleted.

## Available app user connectors

The following providers are available as **app user connectors**. For Google and Microsoft, each product is its own connector but shares the same sign-in. The **OAuth app setup** column links to each provider's own documentation for creating the OAuth application you configure the client with.

| Provider | App user connectors | OAuth app setup |
| :- | :- | :- |
| **Google** | Gmail, Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides | [Create OAuth credentials](https://developers.google.com/workspace/guides/create-credentials) |
| **Microsoft** | Outlook, OneDrive, SharePoint, Teams, OneNote, Word, Excel, PowerPoint | [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) |
| **GitHub** | GitHub | [Create an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) |
| **GitLab** | GitLab API (GitLab.com, Self-Managed, and Dedicated) | [Configure GitLab as an OAuth 2.0 provider](https://docs.gitlab.com/integration/oauth_provider/). Use a confidential application. Start with `read_user`, add `read_api` for reads, or use `api` for writes. |
| **Slack** | Slack | [Installing with OAuth](https://api.slack.com/authentication/oauth-v2) |
| **Salesforce** | Salesforce | [External Client Apps](https://help.salesforce.com/s/articleView?id=xcloud.external_client_apps.htm) |
| **HubSpot** | HubSpot | [Working with OAuth](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth) |
| **Linear** | Linear | [OAuth 2.0 authentication](https://linear.app/developers/oauth-2-0-authentication) |
| **Notion** | Notion | [Authorization](https://developers.notion.com/docs/authorization) (public integration required) |
| **Databricks** | Databricks | [Authorize user access with OAuth](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-u2m) |
| **Microsoft Fabric** | Microsoft Fabric | [Create a Microsoft Entra app](https://learn.microsoft.com/en-us/fabric/data-engineering/connect-apps-api-graphql#create-a-microsoft-entra-app) (delegated `GraphQLApi.Execute.All` permission required) |
| **Power BI** | Power BI | [Register an app](https://learn.microsoft.com/en-us/power-bi/developer/embedded/register-app) (delegated `Dataset.Read.All` and `Workspace.Read.All` permissions required) |
| **Snowflake** | Snowflake | [OAuth for custom clients](https://docs.snowflake.com/en/user-guide/oauth-custom) |
| **Amazon Redshift** | Amazon Redshift | [Data API with trusted identity propagation](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api-trusted-identity-propagation.html), plus [connector-specific AWS setup](https://docs.lovable.dev/integrations/amazon-redshift.md#per-user-access-with-the-app-user-connector) |
| **Workday** | Workday | [OAuth 2.0 API clients](https://doc.workday.com/admin-guide/en-us/authentication-and-security/authentication/oauth/dan1370797830693.html) (Workday sign-in required) |

> [!TIP]
>
> The list of app user connectors grows over time. Open [**Connectors**](https://lovable.dev/dashboard?connectors) to see what is currently available.

## Set up an app user connector

Setup happens in two steps: configure the client in your workspace, then add the connect experience to your app.

### Register and approve your OAuth app with the provider

Before you can configure the client, you (or your organization's admin) register an **OAuth application** on the provider's side and get it approved for use. **This process differs from provider to provider**, and each has its own requirements. For example, you might create a Salesforce External Client App, a Databricks OAuth app, a Snowflake security integration, a Google OAuth consent screen, or a Microsoft app registration.

Approval can also involve extra steps, such as **admin consent** for a tenant, **app verification** for sensitive scopes, or **installation approval** in a workspace.

Because the exact steps and any review process are owned by the provider, the authoritative instructions are in **that provider's own documentation**. The OAuth app setup links in [Available app user connectors](#available-app-user-connectors) point you to each provider's guide.

> [!NOTE]
>
> When you register the OAuth app, add Lovable's **connector gateway callback URL** to the app's allowed redirect URIs so authorization can complete:
>
> ```text theme={null}
> https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback
> ```
>
> Lovable also shows this value in the connector setup screen so you can copy it directly. If the provider requires verification of `lovable.dev`, see [I can't verify the callback domain](#i-cant-verify-the-callback-domain).

### Configure the client

**1. Open the connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select the provider you want (for example **Salesforce** or **Gmail**).

**2. Add a client**

Add a client and enter the OAuth application details from the provider (for example the client ID and secret, and any account or workspace URL the provider requires).

**3. Choose who can use the client**

Under **Sharing**, a new client is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. The creator can make it private again with **Make private**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for how access affects projects and collaborators.

**4. Link the client**

Link the client to the project that should use it.

Who can configure a client follows the [app connector access rules](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients). On Free and Pro plans, any workspace member with the editor role or higher can. On Business and Enterprise plans, workspace admins and owners choose who can for each connector.

### Let Lovable use your account while building

Builder access lets Lovable use your own provider account while it works on a project. This helps Lovable inspect live schemas, test queries, and validate provider calls before it writes the integration. Builder access is available on all plans.

**1. Ask Lovable to inspect your provider data**

After you link the client to the project, describe what Lovable should inspect or test. For example:

```text wrap theme={null}
Use my Snowflake account to list the available databases before building the data browser.
```

**2. Connect your account**

When the **Allow Lovable to access Snowflake** card appears, select **Connect** and complete the provider's OAuth flow. The connection uses your provider permissions and applies only to this project.

**3. Revoke access when you no longer need it**

Ask Lovable in the project chat to stop using the connection. For example:

```text wrap theme={null}
Stop using my Snowflake account while building this project.
```

Revoking builder access does not unlink the client from the project or disconnect anyone who uses the published app.

Lovable can use builder access for read operations. It asks for approval by default before an operation that can change data in the provider. Approval is decided by the kind of request the provider API uses, so some read-only operations also ask. For example, running a SQL query against a data warehouse such as Snowflake or Databricks prompts for approval even when the query only reads data. Choose **Always allow** on the approval card to let later requests to that connector run in this project without asking.

> [!NOTE]
>
> Builder access is separate from the connections used by your published app. Other project members and app users cannot use your builder connection, and generated app code cannot access it. However, data that Lovable returns can appear in the project's shared chat.

### Offline access

**Offline access** controls whether your app receives a connection key for each user who connects.

* When it is enabled, your app receives an opaque connection key per user and can act for that user later, including when they are not signed in, for example in background operations.
* When it is disabled, no key is issued. Your app can only act while the member is signed in through [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md). Apps published outside the workspace need it enabled.

On Free and Pro plans, offline access is always enabled. On Business and Enterprise plans, it is disabled by default, and you enable it under **Advanced settings** when you set up the client. After the client is linked to a project, you can no longer disable it. To disable it later, unlink the client from all projects first. Enabling it stays possible at any time.

### Add the connect experience to your app

When the client is configured and linked, tell Lovable what you want, and it builds the connect experience in your app. For example:

```text wrap theme={null}
Let my users connect their own Gmail so the dashboard shows their inbox.
```

```text wrap theme={null}
Add a "Connect Salesforce" button so each signed-in user links their own account, then show their own open opportunities and let them log a call.
```

You can start from **Connectors** or from the project chat. Either way, you configure the client in **Connectors** and then ask Lovable to connect it in your app. From there, each of your users connects their own account the first time they use the feature.

> [!NOTE]
>
> App user connectors need to know **who** the current user is, so each sign-in can be tied to that person. Use [built-in authentication](https://docs.lovable.dev/features/authentication) or your own authentication so each visitor is signed in before they connect.
>
> For apps published to your workspace on Business and Enterprise plans, Lovable recognizes the signed-in workspace member through [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md), so you don't need to add your own authentication.

## Managing clients

Two actions remove access:

* **Users can disconnect** their own account when your app offers a disconnect control. Disconnecting revokes the stored tokens for that user, so keep that control in your app.
* **Deleting the client** removes access for every user of that connector in the linked projects.

See [Integration security](https://docs.lovable.dev/integrations/security.md) for credential storage, rotation, outbound IP ranges, and data retention that apply to all gateway connectors.

## Troubleshooting

> **I can't verify the callback domain**
>
> You cannot verify `lovable.dev`, because you do not own it. Registering the **connector gateway callback URL** does not depend on domain verification.
>
> A provider can require domain verification before it verifies your app. Google does this during [brand verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification). Your Google app can stay unverified. People who connect a Google account can see an unverified app screen.
>
> Register the **connector gateway callback URL** from the connector setup screen as the redirect URI. Lovable sends the **connector gateway callback URL** when a user starts sign-in and again when Lovable exchanges the authorization code. The provider rejects any other redirect URI with `redirect_uri_mismatch`.
>
> The callback domain belongs to Lovable. A page on your own domain cannot take its place.

## FAQ

> **What is an app user connector?**
>
> An **app user connector** lets **each end user** of your published app connect **their own** third-party account, so your app acts on their behalf with their own permissions. It differs from a standard app connector, where you connect a single account once and every visitor shares it.

> **Can a user only see their own data?**
>
> Yes, when your app uses that user's connection. The gateway forwards each request with the connected user's own permissions and granted scopes. How your app selects the user's connection depends on the sign-in method, see [How it works](#how-it-works). If you edit the integration code, test with two users to confirm each request uses the correct account.

> **Do I need authentication in my app to use this?**
>
> Usually yes. Each sign-in is tied to a specific user, so your app needs to know who the current user is. Use [built-in authentication](https://docs.lovable.dev/features/authentication) or your own authentication before prompting a user to connect.
>
> The exception is apps published to your workspace on Business and Enterprise plans. Lovable recognizes the signed-in member through [workspace identity reuse](https://docs.lovable.dev/features/lovable-workspace-identity-reuse.md), so no extra authentication is needed.

> **Are the user's tokens ever exposed to me or my app?**
>
> No. Tokens are stored encrypted in the connector gateway and are never visible in your project, to workspace admins, or to Lovable. Your app calls the connector through the gateway, which handles the credentials and refreshes them automatically.


## Related topics

- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to Salesforce](https://docs.lovable.dev/integrations/salesforce.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Linear](https://docs.lovable.dev/integrations/linear.md)
