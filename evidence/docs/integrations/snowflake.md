# Connect your app to Snowflake
<!-- source: https://docs.lovable.dev/integrations/snowflake.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Snowflake

> Connect Snowflake to your Lovable app using Snowflake OAuth. Run SQL, use the SQL REST API, and work with warehouses and data from your Snowflake account through Lovable's connector gateway.

[Snowflake](https://www.snowflake.com/) is a cloud data platform for **analytics**, **data engineering**, and **AI/ML** workloads. The **Snowflake** app + chat connector uses **Snowflake's native OAuth** (custom security integration) so your app can call Snowflake through Lovable's **connector gateway** without embedding long-lived passwords in your project.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Snowflake connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app connect their own Snowflake account and work with their own data |

With Snowflake connected, your app can:

* Run **SQL** and use the **SQL REST API** (for example submitting statements and checking status)
* Work with **warehouses**, **databases**, and **schemas** your role can access
* Query your **semantic views**, the metric definitions your data team maintains in Snowflake, so dashboards report the same numbers as your BI tools
* Build **internal tools**, **dashboards**, and **data workflows** backed by Snowflake

Snowflake fits when your organization already centralizes data in Snowflake and you want Lovable apps to query or orchestrate that data securely.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **SQL explorer** | *Build an internal tool that runs read-only SQL against our `analytics` schema and shows results in a table.* | **Ad-hoc querying** with guardrails you define in app logic. |
| **Metric dashboard** | *Show daily revenue and signups from Snowflake summary tables with date filters.* | **Operational dashboards** fed by modeled tables in Snowflake. |
| **Pipeline status** | *After a user uploads a file, poll Snowflake for load completion and show pass/fail.* | **Orchestration-style UX** on top of warehouse data. |
| **Support lookup** | *Given an account ID, load key fields from our Snowflake `customers` view for the support UI.* | **Enrich product UIs** with trusted warehouse data. |
| **Data validation** | *Run lightweight row counts and null checks on staging tables after our ETL runs.* | **Quality checks** using SQL against Snowflake. |

## How Snowflake connections work

* **OAuth 2.0 (authorization code)**: You register a **custom OAuth integration** in Snowflake and enter the **Account URL**, **Client ID**, **Client Secret**, and **Role** in Lovable. You (or your admin) then complete sign-in with Snowflake to authorize the connection. Lovable stores the OAuth tokens and refreshes them automatically, so credentials never live in your app's code.
* **Role**: The connection runs under a single Snowflake role that you configure. Administrator roles cannot be used; create a dedicated, least-privilege role instead (Step 2 below shows how).
* **Gateway**: API requests are proxied through Lovable's **connector gateway**, which manages tokens. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for limits.

> [!NOTE]
>
> Snowflake **compute and storage** costs are billed by **Snowflake** / your cloud agreement, not by Lovable.

## How to connect Snowflake

Who can create Snowflake connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**. You can create multiple Snowflake connections using different accounts or roles, which is useful for separating development and production data.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

The steps below can create everything from scratch, but you do not have to start from a blank slate: each step opens with the criteria an existing piece must meet, so verify and skip the creation SQL where yours already passes.

### Prerequisites

Before connecting Snowflake, make sure you have:

* A Snowflake account, and a user with the `ACCOUNTADMIN` role (or the global `CREATE INTEGRATION` privilege) to create the OAuth security integration and read its client secret
* Privileges to create a role and grant it access to your data: `USERADMIN` to create the role, and `SECURITYADMIN` to run the grants (its global `MANAGE GRANTS` privilege covers objects it does not own, and the future grants in Step 2 require it)
* A dedicated, non-personal Snowflake user to authorize the connection. Using a dedicated user rather than someone's own account means the connection stays active if the person who set it up leaves the company. This user must hold the dedicated role and must be able to complete a browser sign-in, so keep it at `TYPE = PERSON`. A `TYPE = SERVICE` user cannot authorize the connection: it can sign in with neither a password nor SAML SSO, and Snowflake OAuth only offers the authorization code flow, which needs an interactive login
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

By the end of Step 4 you have the four values the Lovable connection form asks for:

| Field | Where it comes from | Already have it? |
| :- | :- | :- |
| Account URL | Step 1 | It has the form `https://<orgname>-<account_name>.snowflakecomputing.com`, no path |
| Client ID | Step 4 | `DESC SECURITY INTEGRATION <name>` passes the Step 3 criteria |
| Client Secret | Step 4 | `SYSTEM$SHOW_OAUTH_CLIENT_SECRETS` re-reads it any time |
| Role | Step 2 | `SHOW GRANTS TO ROLE <role>` covers warehouse and data; role passes the Step 2 criteria |

### Step 1: Find your account URL

Lovable needs your account URL in the form `https://<orgname>-<account_name>.snowflakecomputing.com`, with no trailing slash or path.

**1. Open the account selector in Snowsight**

Open the account selector in the bottom-left corner of Snowsight and hover over your account.

**2. Copy the account URL**

Click **View account details** and copy the value under **Account/Server URL**.

> [!TIP]
>
> See [Account identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier) in the Snowflake docs for details.

### Step 2: Create a least-privilege role

Snowflake blocks `ACCOUNTADMIN`, `SECURITYADMIN`, `ORGADMIN`, and `GLOBALORGADMIN` from OAuth sessions by default, and Lovable additionally rejects `ACCOUNTADMIN` and `SECURITYADMIN` in the connection form. This is a feature, not a limitation: create a dedicated role that can see only the data your app needs.

> **Reuse an existing role instead?**
>
> Reuse an existing role only if all of these hold:
>
> * It is none of the blocked roles above, not on your integration's `BLOCKED_ROLES_LIST`, and present in its `ALLOWED_ROLES_LIST` if one is set (`DESC SECURITY INTEGRATION`).
> * It is granted to the user who will authorize the connection (`SHOW GRANTS TO USER <user>`).
> * It has `USAGE` on a warehouse plus the data grants your app needs (`SHOW GRANTS TO ROLE <role>`).
>
> A broad existing role (a general analyst role, say) passes these checks but hands the app everything that role can see, so a dedicated role stays the recommendation. If you do reuse one, substitute its name below and skip ahead to the final grant in this step.

Run the blocks below in order. Each one opens with the role Snowflake requires for those statements, because `USE ROLE` stays in effect for the rest of your worksheet session.

**1. Create the role**

```sql theme={null}
USE ROLE USERADMIN;
CREATE ROLE IF NOT EXISTS LOVABLE_ROLE
  COMMENT = 'Least-privilege role for the Lovable connector';
```

**2. Grant the role a warehouse**

Give the role a warehouse to run queries on. In most cases this is one of your existing warehouses. Run this as `SECURITYADMIN`: granting on a warehouse you do not own requires the global `MANAGE GRANTS` privilege, which only `SECURITYADMIN` and `ACCOUNTADMIN` hold.

```sql theme={null}
USE ROLE SECURITYADMIN;
GRANT USAGE ON WAREHOUSE MY_WH TO ROLE LOVABLE_ROLE;
```

> [!TIP]
>
> **Recommended for production apps: a dedicated warehouse instead.** Query volume is driven by your app's end users, so it is unpredictable and outside your control. A dedicated warehouse isolates that load from your other workloads, makes the app's spend its own line item, and can be capped with a [resource monitor](https://docs.snowflake.com/en/user-guide/resource-monitors). Skip this if you granted an existing warehouse above. `SYSADMIN` runs both statements here because it owns the warehouse it just created.
>
> ```sql theme={null}
> USE ROLE SYSADMIN;
> CREATE WAREHOUSE IF NOT EXISTS LOVABLE_WH
>   WAREHOUSE_SIZE = XSMALL
>   AUTO_SUSPEND = 60
>   AUTO_RESUME = TRUE
>   INITIALLY_SUSPENDED = TRUE;
> GRANT USAGE ON WAREHOUSE LOVABLE_WH TO ROLE LOVABLE_ROLE;
> ```

**3. Grant access to your data**

Grant access to exactly the data the app needs. Run the whole block as `SECURITYADMIN`: in a standard schema, the future grants at the end require the global `MANAGE GRANTS` privilege, so owning the database is not enough.

Read-only example:

```sql theme={null}
USE ROLE SECURITYADMIN;
GRANT USAGE ON DATABASE MY_DB TO ROLE LOVABLE_ROLE;
GRANT USAGE ON SCHEMA MY_DB.MY_SCHEMA TO ROLE LOVABLE_ROLE;
GRANT SELECT ON ALL TABLES IN SCHEMA MY_DB.MY_SCHEMA TO ROLE LOVABLE_ROLE;
GRANT SELECT ON ALL VIEWS  IN SCHEMA MY_DB.MY_SCHEMA TO ROLE LOVABLE_ROLE;
-- Cover tables and views created later:
GRANT SELECT ON FUTURE TABLES IN SCHEMA MY_DB.MY_SCHEMA TO ROLE LOVABLE_ROLE;
GRANT SELECT ON FUTURE VIEWS  IN SCHEMA MY_DB.MY_SCHEMA TO ROLE LOVABLE_ROLE;
```

Add `INSERT`, `UPDATE`, or `DELETE` grants only if your app writes data.

**4. Grant the role to the authorizing user**

Grant the role to the user who will click through the OAuth authorization in Step 5. The grant target is the Snowflake username, which is not always the email used to log in; the authorizing person can get theirs by running `SELECT CURRENT_USER();`. An unquoted Snowflake identifier can only contain letters, digits, underscores, and dollar signs, so if the username contains anything else, double-quote it and match the case exactly. An email-style username needs quoting twice over: the `@` is the obvious one, but the `.` forces it too and is easy to miss (`GRANT ROLE LOVABLE_ROLE TO USER "jane.doe@company.com";`).

Switch back to `USERADMIN`, which owns the role it created in the first step and can therefore grant it. If you reused an existing role that `USERADMIN` does not own, run this statement as `SECURITYADMIN` instead:

```sql theme={null}
USE ROLE USERADMIN;
GRANT ROLE LOVABLE_ROLE TO USER MY_AUTHORIZING_USER;
```

### Step 3: Create the OAuth security integration

This is the OAuth client Lovable authenticates against. Creating it requires `ACCOUNTADMIN` or the global `CREATE INTEGRATION` privilege. See [Configure Snowflake OAuth for custom clients](https://docs.snowflake.com/en/user-guide/oauth-custom) in the Snowflake docs. Already have an integration? Jump to the reuse checks below.

> **Already have an OAuth integration?**
>
> Inspect it first:
>
> ```sql theme={null}
> DESC SECURITY INTEGRATION MY_INTEGRATION;
> ```
>
> Reuse it only if it is a custom OAuth integration (`OAUTH_CLIENT = CUSTOM`) with `OAUTH_CLIENT_TYPE = CONFIDENTIAL`, it is enabled, and Lovable's callback is either its `OAUTH_REDIRECT_URI` or one of its [`OAUTH_ALTERNATE_REDIRECT_URIS`](https://docs.snowflake.com/en/sql-reference/sql/alter-security-integration-oauth-snowflake). One hard limit:
>
> * `OAUTH_CLIENT_TYPE` cannot be changed after creation. An existing `PUBLIC` client must be recreated as `CONFIDENTIAL`.
>
> An integration can accept several redirect URIs, so one that already serves another tool (Tableau, a BI client) can technically serve Lovable too once you add Lovable's callback to `OAUTH_ALTERNATE_REDIRECT_URIS`. Create a separate integration per application anyway: it keeps each tool's allowed roles, secret rotation, and revocation independent of the others.
>
> Everything else is fixable in place on an integration dedicated to Lovable:
>
> ```sql theme={null}
> ALTER SECURITY INTEGRATION MY_INTEGRATION SET
>   OAUTH_REDIRECT_URI = 'https://api.lovable.dev/workspaces/connectors/standard/oauth/callback'
>   OAUTH_ISSUE_REFRESH_TOKENS = TRUE
>   OAUTH_REFRESH_TOKEN_VALIDITY = 7776000
>   OAUTH_ENFORCE_PKCE = TRUE
>   ALLOWED_ROLES_LIST = ('LOVABLE_ROLE');
> ```

```sql theme={null}
USE ROLE ACCOUNTADMIN;
CREATE SECURITY INTEGRATION LOVABLE_OAUTH
  TYPE = OAUTH
  ENABLED = TRUE
  OAUTH_CLIENT = CUSTOM
  OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'
  OAUTH_REDIRECT_URI = 'https://api.lovable.dev/workspaces/connectors/standard/oauth/callback'
  OAUTH_ISSUE_REFRESH_TOKENS = TRUE
  OAUTH_REFRESH_TOKEN_VALIDITY = 7776000
  OAUTH_ENFORCE_PKCE = TRUE
  ALLOWED_ROLES_LIST = ('LOVABLE_ROLE')
  COMMENT = 'OAuth client for the Lovable Snowflake connector';
```

Why these values:

* `OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'`: Lovable stores the client secret server-side and can use a confidential client, which is stronger than a public one.
* `OAUTH_REDIRECT_URI`: must exactly match the callback Lovable uses. The Lovable connection form shows this value under **Redirect URI** with a copy button, so you can copy it from there.
* `OAUTH_ISSUE_REFRESH_TOKENS = TRUE` and `OAUTH_REFRESH_TOKEN_VALIDITY = 7776000`: Snowflake access tokens are short-lived, so Lovable refreshes them in the background. Both values are already Snowflake's defaults for a custom client, so these two lines change nothing on a fresh integration; set them explicitly anyway so the connector does not silently inherit a shorter validity from an integration someone edited earlier. 7776000 seconds (90 days) is also the maximum, and you reconnect in Lovable when the refresh token expires, so this keeps reconnects to at most once per quarter.
* `OAUTH_ENFORCE_PKCE = TRUE`: Lovable always sends a PKCE code challenge, so you can enforce it. This protects the flow against authorization code interception.
* `ALLOWED_ROLES_LIST = ('LOVABLE_ROLE')`: every role not listed is implicitly blocked, so this integration can only ever mint sessions for the connector role. Leaked client credentials cannot be parlayed into a broader session, and repointing the Lovable connection at a more privileged role fails at the authorize step until whoever controls the integration updates this list first.

> [!NOTE]
>
> Leave `OAUTH_USE_SECONDARY_ROLES` at its default (`NONE`) so sessions are limited to the single role you configured and cannot pick up extra privileges from the authorizing user's secondary roles.

### Step 4: Retrieve the client ID and secret

Still as `ACCOUNTADMIN`, read the generated credentials:

```sql theme={null}
SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('LOVABLE_OAUTH');
```

The result is a JSON object whose keys are lowercase: `oauth_client_id`, `oauth_client_secret`, and `oauth_client_secret_2`. Copy `oauth_client_id` and `oauth_client_secret` (either secret works; two exist so you can rotate them without downtime). The function can be re-run at any time, so a lost secret never requires recreating the integration.

> [!WARNING]
>
> Treat both values like passwords. Paste them directly into Lovable in the next step rather than storing them in documents or chat.

### Step 5: Connect Snowflake in Lovable

**1. Open Snowflake in Connectors**

Go to **Connectors** and select **Snowflake**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `Snowflake Prod`). This name is only used inside Lovable to identify the connection.

**4. Enter the connection details**

* **Account URL**: the URL from Step 1.
* **Client ID** and **Client Secret**: the values from Step 4.
* **Role**: `LOVABLE_ROLE`. Enter it in uppercase, exactly as it appears in `SHOW ROLES`. The role name is passed to Snowflake case-sensitively as the OAuth scope.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to Snowflake and authorize**

Click **Connect** at the bottom of the form. The Snowflake authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in as the user that holds `LOVABLE_ROLE` (from Step 2), review the requested role, and click **Allow**.

> [!TIP]
>
> Snowflake redirects you back to Lovable with a confirmation, and the connection appears in your list.

> [!NOTE]
>
> That confirmation only means Snowflake issued tokens for the role. Lovable does not run a test query at this point, so a connection whose role has no warehouse or no data grants still reports success. Confirm the connection with a real query as described in the next section.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Snowflake (based on configured connection-level access). Your Lovable apps can then run SQL against your Snowflake data while you build and after you publish.

## Verify and use the connection

The first successful query is what proves the role can actually reach a warehouse and your data, so run one right after you connect. Link the connection to a project and ask Lovable in the project chat to query your data, for example:

```text wrap theme={null}
Use Snowflake and show the ten most recent rows from MY_SCHEMA.MY_TABLE.
```

Confirm the query in Snowsight under **Monitoring → Query History**, filtered by the authorizing user or the warehouse. The same view audits everything your app runs later.

Two things to know when building:

* Queries that need compute must run on a warehouse. Tell Lovable which warehouse to use (the SQL API accepts a `warehouse` parameter per statement), or set a default warehouse on the authorizing user.
* If the query fails, the connection itself is fine and the role is missing a warehouse or a grant. Go back to Step 2 and check `SHOW GRANTS TO ROLE LOVABLE_ROLE;`.

## Semantic views

If your Snowflake account defines semantic views, the governed metric definitions your data team maintains in Snowflake, Lovable prefers them over hand-written SQL when it builds dashboards, KPIs, or analytics on a connected project. Lovable discovers the views with their metrics and dimensions automatically and queries them with Snowflake's `SEMANTIC_VIEW()` syntax, so the numbers in your app match what your BI tools report from the same definitions.

You do not have to mention semantic views in your prompt. Ask for the outcome, and Lovable checks for a matching view first:

```text wrap theme={null}
Build a revenue KPI dashboard from our Snowflake data.
```

When no semantic view covers the request, Lovable falls back to querying your tables directly.

A few things to know:

* The connection's role needs access to the semantic views. Metric queries also need a warehouse the role can use, while discovery commands such as `SHOW SEMANTIC VIEWS` run without one.
* Lovable builds in-app views and dashboards from your semantic views. It does not report metric values as chat answers, so ask for a dashboard rather than asking what last quarter's revenue was.
* Lovable never creates or changes semantic views. Define and maintain them in Snowflake.

## Best practices

* One connection per environment: create separate integrations, roles, and connections for development and production data.
* Keep the role read-only unless the app genuinely writes data, and scope grants to specific schemas rather than whole databases.
* For production apps, use a dedicated warehouse with a resource monitor to cap unexpected spend.
* Authorize with a dedicated user rather than a personal login. If the authorizing user is disabled, the connection stops working until someone reconnects.
* Rotate the client secret periodically using the second secret slot, then update the connection in Lovable.
* Changing the connection's role later? Add the new role to the integration's `ALLOWED_ROLES_LIST` before reconnecting.
* Expect to reconnect when the refresh token expires (at most every 90 days with the settings above).

## Limitations

* **Scopes and roles** are determined by your Snowflake OAuth integration and the **role** you configure; the app cannot exceed those permissions.
* **Per-user Snowflake login** is not provided by this connector. Each connection represents a **shared** authorization for the workspace connection. If you need each end user to sign in with **their own** Snowflake account and query under their own role, use the Snowflake **[app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md)**.
* **Gateway limits** apply as described in [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors).

## Manage your Snowflake connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Snowflake**, then open the connection.

* **Unlink projects** to remove Snowflake access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Snowflake stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.

## Troubleshooting

> **Error during Snowflake authorization**
>
> The signing-in user does not have the role granted, the role is blocked or missing from the integration's `ALLOWED_ROLES_LIST` (check both lists with `DESC SECURITY INTEGRATION`), or the role name case does not match. Re-check Step 2 and re-enter the role in uppercase.
>
> If the connection fails with "role cannot be ACCOUNTADMIN or SECURITYADMIN", enter the dedicated role from Step 2 instead.

> **Redirect URI mismatch**
>
> The **Redirect URI** shown in the Lovable connection form must exactly match the integration's `OAUTH_REDIRECT_URI` or one of its `OAUTH_ALTERNATE_REDIRECT_URIS`. A common cause is reusing an integration created for another tool; create a Lovable-dedicated one instead. Otherwise fix it with `ALTER SECURITY INTEGRATION LOVABLE_OAUTH SET OAUTH_REDIRECT_URI = '...';`.

> **Authorization window never completes**
>
> The authorizing user cannot complete a browser login. A `TYPE = SERVICE` user can sign in with neither a password nor SAML SSO, a key-pair-only user has no interactive credential, and an authentication or MFA policy can block the login. Authorize with a `TYPE = PERSON` user that can complete a browser login.

> **The connection works, but queries fail**
>
> Usually a missing warehouse (pass `warehouse` in the statement or set a user default) or a missing grant on the queried object.

> **Reconnecting every day**
>
> This only happens on an integration where someone lowered `OAUTH_REFRESH_TOKEN_VALIDITY`, because Snowflake defaults it to the 90 day maximum. Check the current value with `DESC SECURITY INTEGRATION LOVABLE_OAUTH;`. If it is at or near the minimum for a custom client (86400, one day), raise it with `ALTER SECURITY INTEGRATION LOVABLE_OAUTH SET OAUTH_REFRESH_TOKEN_VALIDITY = 7776000;` and reconnect once more.

> **The connection stopped working after weeks**
>
> The refresh token expired or the authorizing user was disabled. Reconnect the integration in Lovable.


## Related topics

- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
