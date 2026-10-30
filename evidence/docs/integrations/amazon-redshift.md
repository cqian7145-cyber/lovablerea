# Connect your app to Amazon Redshift
<!-- source: https://docs.lovable.dev/integrations/amazon-redshift.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Amazon Redshift

> Connect your app to Amazon Redshift, a cloud data warehouse, to run SQL queries and read results from your warehouse in your Lovable app.

[Amazon Redshift](https://aws.amazon.com/redshift/) is a cloud data warehouse. The Amazon Redshift connector lets your Lovable app run SQL statements and read the results through the Redshift Data API, so you can build dashboards, reports, and internal tools on top of your warehouse without managing a database connection. It works with both provisioned clusters and Redshift Serverless workgroups.

| Use | If you want to |
| - | - |
| **App + chat connector** (this page) | Work with a shared Redshift connection in the project chat and in your published apps |
| [App user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) | Let each user of your published app sign in with your identity provider and query Redshift under their own database permissions |

The Redshift app user connector needs AWS-side setup that is specific to this connector. See [Per-user access with the app user connector](#per-user-access-with-the-app-user-connector) below.

With Amazon Redshift, your app can:

* Run SQL queries against your warehouse
* Read query results, schemas, and table metadata

The Redshift Data API is asynchronous: the app submits a statement, polls until it finishes, then fetches the results (simple queries finish in seconds). Lovable generates this flow for you.

## Common use cases and example apps

Use these prompts as starting points and adapt the table and metric names to your own schema.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Analytics dashboard | *Use Amazon Redshift and build a dashboard that shows daily revenue and active users from our warehouse.* | **Turn warehouse tables into live dashboards.** The app runs aggregate queries against Redshift and renders the results as charts. |
| Internal query console | *Use Amazon Redshift and build an internal tool where my team can run SQL and download the results as CSV.* | **Run ad-hoc SQL without handing out warehouse credentials.** The app submits statements, polls until they finish, and offers the rows as a CSV download. |
| Customer usage portal | *Use Amazon Redshift and build a page where each customer sees their monthly usage from our warehouse.* | **Expose per-customer analytics from warehouse tables.** The app filters query results by customer and renders usage summaries. |
| KPI report | *Use Amazon Redshift and build a weekly report that compares this week's signups and orders to last week's.* | **Publish recurring reports from warehouse queries.** The app runs comparison queries on demand and lays the results out as a readable report. |
| Data catalog browser | *Use Amazon Redshift and build a browser that lists our databases, schemas, and tables.* | **Make the warehouse explorable for non-SQL users.** The app lists databases, schemas, and table metadata so anyone can see what data exists. |

## How Amazon Redshift connections work

When you connect Amazon Redshift, Lovable's connector gateway signs every Data API request with your IAM credentials. The credentials stay on the server and never reach your published app.

Within your Lovable workspace:

* You can create multiple Amazon Redshift connections, and multiple projects can use the same connection.
* Each connection is pinned to one AWS region and one set of IAM credentials.
* Each connection records one default target, a Redshift Serverless workgroup or a provisioned cluster, never both. The target reaches your app's server code as environment variables, and the code Lovable generates reads it from there. Serverless connections get **Workgroup** as `REDSHIFT_WORKGROUP` and **Database** as `REDSHIFT_DATABASE`. Provisioned connections get **Cluster identifier** as `REDSHIFT_CLUSTER_IDENTIFIER`, **Database** as `REDSHIFT_DATABASE`, and **Database user** (when set) as `REDSHIFT_DB_USER`. Projects linked before these variables existed receive them when the connection is next edited or re-linked.

The stored target is a default, not an access boundary: every query names its own target, and the gateway signs any Redshift Data API or Serverless API request in the connection's region, so what the connection can do is bounded by its IAM credentials. To keep environments separate (for example, production and staging), create one connection per environment, each with its own IAM user.

Amazon Redshift uses Lovable's gateway architecture for secure credential handling and automatic request signing. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!WARNING]
>
> The connector does not enforce read-only access. Every query, whether `SELECT` or `DROP TABLE`, goes through the same `redshift-data:ExecuteStatement` permission, so IAM cannot separate reads from writes. Database grants are the control that works. See [Restrict a connection to read-only](#restrict-a-connection-to-read-only).

> [!NOTE]
>
> All queries made through this connector run in your AWS account, and AWS bills you directly for Redshift usage, not Lovable.

## How to connect Amazon Redshift

Who can create Amazon Redshift connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Amazon Redshift, make sure you have:

* An AWS account with a Redshift provisioned cluster or serverless workgroup
* An IAM user with the Redshift Data API permissions listed below
* The AWS region your cluster or workgroup runs in
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

### Step 1: Create an IAM user with Redshift Data API access

Create a dedicated IAM user for the connection, with the minimum permissions needed. Access has two required parts, the `redshift-data` operations your app calls and a credential-fetch action that depends on how the connection authenticates to the database, plus an optional statement for discovering Serverless workgroups.

**1. Open the AWS IAM console**

Go to the [AWS IAM console](https://console.aws.amazon.com/iam/) and create a new IAM user for Lovable to use, for example `lovable-redshift`.

**2. Attach a Redshift policy**

Create and attach an inline policy, or managed policy, with the following permissions.

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RedshiftDataApi",
      "Effect": "Allow",
      "Action": [
        "redshift-data:ExecuteStatement",
        "redshift-data:DescribeStatement",
        "redshift-data:GetStatementResult",
        "redshift-data:ListStatements",
        "redshift-data:ListDatabases",
        "redshift-data:ListSchemas",
        "redshift-data:ListTables",
        "redshift-data:DescribeTable"
      ],
      "Resource": "*"
    },
    {
      "Sid": "FetchDbCredentials",
      "Effect": "Allow",
      "Action": [
        "redshift-serverless:GetCredentials",
        "redshift:GetClusterCredentials",
        "redshift:GetClusterCredentialsWithIAM"
      ],
      "Resource": "*"
    },
    {
      "Sid": "DiscoverServerlessWorkgroups",
      "Effect": "Allow",
      "Action": ["redshift-serverless:ListWorkgroups"],
      "Resource": "*"
    }
  ]
}
```

Keep only the credential-fetch action in `FetchDbCredentials` that matches how the connection authenticates. Which one applies depends on the **Deployment type** and **Database user** fields you fill in Step 2, and it also decides which database user your SQL runs as:

| Connection | Credential-fetch action | Statements run as |
| :- | :- | :- |
| Serverless | `redshift-serverless:GetCredentials` | `IAM:<your-iam-user-name>` |
| Provisioned, **Database user** set | `redshift:GetClusterCredentials` | the database user you name |
| Provisioned, **Database user** empty | `redshift:GetClusterCredentialsWithIAM` | `IAM:<your-iam-user-name>` |

Without the matching action, every statement fails with `AccessDeniedException`. Add `redshift-data:BatchExecuteStatement` only if your app runs multi-statement batches. The `DiscoverServerlessWorkgroups` statement lets the app discover your Serverless workgroups. Drop it on provisioned clusters or when your app only queries the workgroup configured on the connection. If your app also calls `RedshiftServerless.GetWorkgroup` or `RedshiftServerless.ListNamespaces`, add those actions to the same statement.

> [!NOTE]
>
> The Data API can also authenticate with an AWS Secrets Manager secret, but only when a query explicitly passes a secret ARN. Lovable-generated code does not do this by default, so you only need `secretsmanager:GetSecretValue` on the secret if you build that yourself. It does not replace the credential-fetch actions above.

This policy controls which Data API operations the connection can call, not the SQL they carry. To gate writes, see [Restrict a connection to read-only](#restrict-a-connection-to-read-only) after you connect.

**3. Generate access keys**

In the IAM user's **Security credentials** tab, create an access key. Save both the **Access key ID** and **Secret access key**, since you'll need them in the next step.

> [!WARNING]
>
> The secret access key is shown only once and functions like a password. Store it securely and never commit it to a repository or share it publicly. If you lose it, create a new access key pair.

For more detail, see [Using the Amazon Redshift Data API](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html) in the AWS documentation.

### Step 2: Connect Amazon Redshift to Lovable

You can create multiple connections using different IAM credentials.

**1. Open Amazon Redshift in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Amazon Redshift**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name** (optional): name the connection, for example `Redshift Prod`. This name is only used inside Lovable to identify the connection. Leave it blank and Lovable generates one.
2. **Deployment type**: choose **Serverless** (default) or **Provisioned cluster**. This decides which of the fields below you fill in, and you can switch it later by editing the connection.
3. **AWS region**: select the region where your cluster or workgroup runs. The default is **US East (N. Virginia, us-east-1)**. IAM credentials are global, but Redshift resources are regional.
4. **Access key ID**: paste the IAM access key ID from the previous step.
5. **Secret access key**: paste the IAM secret access key paired with the access key ID.
6. **Workgroup**, for Serverless only: the Redshift Serverless workgroup your app's queries target, for example `my-workgroup`.
7. **Cluster identifier**, for a provisioned cluster only: the cluster your app's queries target, for example `my-cluster`. Find it in the [Redshift console](https://console.aws.amazon.com/redshiftv2/) or run `aws redshift describe-clusters --region <region>`.
8. **Database**: the database queries run against by default, for example `dev`.
9. **Database user** (optional), for a provisioned cluster only: the database user your app connects as, for example `lovable_readonly`. Use a dedicated read-only user, and create it in Redshift before the connection's first query (see [Restrict a connection to read-only](#restrict-a-connection-to-read-only)). Leave it empty to connect as your IAM identity, which needs `redshift:GetClusterCredentialsWithIAM` instead of `redshift:GetClusterCredentials`.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials by calling `redshift-data:ListStatements` in the configured region. Verification does not touch your cluster or workgroup, so a connection can verify successfully and still fail on its first query:

* Queries fail with `AccessDeniedException`: the IAM policy is missing the credential-fetch action for your auth path (see the table in Step 1).
* Queries fail with a not-found error: the workgroup or cluster name is wrong, or the connection's region does not match where it runs.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Amazon Redshift (based on configured connection-level access). Your Lovable apps can then run SQL queries against your warehouse and use the results.

## Restrict a connection to read-only

IAM controls which Data API operations a connection can call, not the SQL they carry, so database grants are what makes a connection read-only. Do this after you connect: find the database user your statements run as, grant it read-only access, and optionally pin it in IAM.

### Step 1: Find the database user your connection runs as

Grants attach to a database user, which is a different identity from the IAM user you created in [Step 1: Create an IAM user with Redshift Data API access](#step-1-create-an-iam-user-with-redshift-data-api-access). The IAM user signs API requests, while the database user is who your SQL runs as inside Redshift. The database user depends on the selected auth path, see "Statements run as" column of this [table](#connection-types).

* Serverless: derived from the IAM identity you created, for example `IAM:lovable-redshift`. Redshift creates it for you
* Provisioned, **Database user** set: the name you set when creating the connection in Lovable, for example `lovable_readonly`. You create it yourself
* Provisioned, **Database user** empty: derived from the IAM identity you created, for example `IAM:lovable-redshift`. Redshift creates it for you

On the two `IAM:` paths, Redshift maps the database user one-to-one from the IAM identity and creates it the first time the connection runs a statement. Run one query through the connection in a test project before you grant anything, so there is a user to grant to. Clicking **Connect** in Lovable alone when creating the connection does not do this. When connecting, Lovable only calls `ListStatements` and never starts a database session.

On the provisioned path with a **Database user**, nothing is created for you. The Data API fetches credentials with `GetClusterCredentials` and does not auto-create the user, so if the name you entered does not already exist, the credential call succeeds and the statement then fails to log in. Create the user before the connection's first query, as [Step 2](#step-2-grant-read-only-access) shows.

> [!NOTE]
>
> Always double-quote an `IAM:` name in SQL, for example `"IAM:lovable-redshift"`. The colon and the hyphen are not legal in an unquoted identifier, so an unquoted `IAM:lovable-redshift` fails with a syntax error.

### Step 2: Grant read-only access

> [!NOTE]
>
> Run these statements yourself, in query editor v2 in the [Redshift console](https://console.aws.amazon.com/redshiftv2/) or any SQL client, signed in as a superuser such as the `admin` user created with your cluster or workgroup. Once the connection authenticates as the read-only user, it holds none of these permissions and cannot run them for you.
>
> A superuser can run every statement below. `CREATE USER ... PASSWORD DISABLE` requires one, because only a superuser can disable a password. For the rest, the owner of the schema or database also qualifies, except the scoped `GRANT ... FOR TABLES IN SCHEMA`, which needs a superuser or a user holding that permission `WITH GRANT OPTION`.

On the provisioned path with a **Database user**, create the user first. The Data API does not create it for you:

```sql theme={null}
CREATE USER lovable_readonly PASSWORD DISABLE;
```

`PASSWORD DISABLE` creates the user without a password, so it can only sign in with the temporary IAM credentials the Data API uses.

Then grant reads, repeating both statements for each schema your app reads. On the two `IAM:` paths, skip the `CREATE USER` and grant to the derived user instead, for example `"IAM:lovable-redshift"`:

```sql theme={null}
GRANT USAGE ON SCHEMA analytics TO lovable_readonly;
GRANT SELECT FOR TABLES IN SCHEMA analytics TO lovable_readonly;
```

`GRANT SELECT FOR TABLES IN SCHEMA` is a scoped permission: it covers every current and future table in the schema, whoever creates it. Redshift has no database-level `CONNECT` privilege, so there is nothing else to grant.

> [!WARNING]
>
> Redshift gives every user `CREATE` on the `public` schema and `TEMP` on the database by default, so a user with only `SELECT` grants can still create tables. Revoke both defaults. These statements apply to every user on the database, not just this one:
>
> ```sql theme={null}
> REVOKE CREATE ON SCHEMA public FROM PUBLIC;
> REVOKE TEMP ON DATABASE dev FROM PUBLIC;
> ```
>
> Revoking `TEMP` also turns off Redshift Spectrum on this database for every user, because a Spectrum query needs permission to create temporary tables. If anyone queries external tables in `dev`, grant `TEMP` back to the specific users, roles, or groups that need it:
>
> ```sql theme={null}
> GRANT TEMP ON DATABASE dev TO ROLE spectrum_users;
> ```

> [!WARNING]
>
> Every statement in this step affects only the database you run it in. Schemas and their grants live inside one database, `TEMP` is a per-database privilege, and Redshift applies scoped permissions only to "objects for the connected database". A cluster or namespace can hold several databases, and the database user is shared across all of them.
>
> So a read-only recipe run in `dev` does not restrict the connection elsewhere. Because every query names its own database and there is no `CONNECT`-style gate, the same identity can point a statement at another database and land in a `public` schema where `PUBLIC` still holds `CREATE`. Repeat this step in every database the connection can reach, or pin the connection to one database in IAM (see [Step 3](#step-3-pin-the-identity-in-iam)).

### Step 3: Pin the identity in IAM

On the provisioned path with a **Database user**, IAM can force every statement through that user. Replace the `FetchDbCredentials` statement from Step 1 with a scoped one, and leave out `redshift:GetClusterCredentialsWithIAM`:

```json theme={null}
{
  "Sid": "FetchDbCredentials",
  "Effect": "Allow",
  "Action": "redshift:GetClusterCredentials",
  "Resource": [
    "arn:aws:redshift:us-east-1:111122223333:dbuser:my-cluster/lovable_readonly",
    "arn:aws:redshift:us-east-1:111122223333:dbname:my-cluster/*"
  ]
}
```

Both ARNs are required: the Data API always passes the database name, so IAM checks the `dbname` resource on every call. Scope the `dbname` ARN to a single database, for example `dbname:my-cluster/dev`, to also pin which database the connection can fetch credentials for. With this policy, a query that omits the database user, or names a different one, fails with `AccessDeniedException`.

On the two `IAM:` paths you cannot pin the user, because the database identity is the IAM user itself and `GetClusterCredentialsWithIAM` takes no database user. On a provisioned cluster you can still pin the database, since that action supports the same `dbname` resource:

```json theme={null}
{
  "Sid": "FetchDbCredentials",
  "Effect": "Allow",
  "Action": "redshift:GetClusterCredentialsWithIAM",
  "Resource": "arn:aws:redshift:us-east-1:111122223333:dbname:my-cluster/dev"
}
```

Redshift Serverless has no database-level equivalent: `redshift-serverless:GetCredentials` accepts only a workgroup resource. Use a dedicated IAM user per connection, grant it only what it needs, and repeat the grants from Step 2 in every database it can reach.

## Per-user access with the app user connector

The connection described above signs every query with one shared set of IAM credentials. The Amazon Redshift [app user connector](https://docs.lovable.dev/integrations/app-user-connectors.md) works differently: each user of your published app signs in with your organization's identity provider (for example Okta, Entra ID, or Auth0), and their queries run in Redshift as their own identity, `awsidc:<email>`, under the database grants that identity holds. Redshift enforces per-user access, and CloudTrail records who each call ran on behalf of.

Lovable holds no AWS credentials on this path. The user's sign-in token is the only credential, and AWS exchanges it for a short-lived session through [trusted identity propagation](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api-trusted-identity-propagation.html) in IAM Identity Center.

> [!NOTE]
>
> This connector requires IAM Identity Center in your AWS organization. Identity Center is often owned by a central platform team, so plan the setup with your AWS administrator. This is the most involved connector setup in the catalog: expect three roles to be involved, an AWS administrator, a Redshift administrator, and a Lovable workspace admin.

### How per-user access works

1. An app user clicks connect in your published app and signs in at your identity provider.
2. The connector gateway exchanges their sign-in token through IAM Identity Center for a session that carries their identity.
3. Queries are signed with that session, so Redshift sees the user as `awsidc:<email>` and applies that identity's own grants.

### Step 1: Set up AWS (AWS administrator)

Your AWS administrator arranges the following, once per workspace. The [AWS walkthrough](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api-trusted-identity-propagation.html) covers each piece in depth.

**1. Create a trusted token issuer in IAM Identity Center**

In IAM Identity Center, register your identity provider's issuer URL as a trusted token issuer. This is what lets Identity Center accept your provider's sign-in tokens.

**2. Create a customer managed application**

Create a customer managed application in IAM Identity Center, connect it to the trusted token issuer, and enable trusted identity propagation to Amazon Redshift. Note the application ARN, you enter it in Lovable later.

**3. Create an IAM OIDC identity provider**

In IAM, create an OpenID Connect identity provider for your identity provider's issuer URL, with your OAuth app's client ID as the audience.

**4. Create the bootstrap role**

Create an IAM role that app users assume with their identity provider token. Its trust policy federates the OIDC provider:

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/your-idp.example.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": { "StringEquals": { "your-idp.example.com:aud": "<your-oauth-client-id>" } }
    }
  ]
}
```

Its permission policy exchanges the token and assumes the access role:

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sso-oauth:CreateTokenWithIAM",
      "Resource": "<identity-center-application-arn>"
    },
    {
      "Effect": "Allow",
      "Action": ["sts:AssumeRole", "sts:SetContext"],
      "Resource": "arn:aws:iam::111122223333:role/lovable-redshift-access"
    }
  ]
}
```

**5. Create the access role**

Create an IAM role that carries the propagated identity and the Data API permissions. Its trust policy trusts the bootstrap role:

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111122223333:role/lovable-redshift-bootstrap" },
      "Action": ["sts:AssumeRole", "sts:SetContext"]
    }
  ]
}
```

Its permission policy needs the same `redshift-data` operations as the shared connection above plus `redshift-serverless:GetCredentials` (or `redshift:GetClusterCredentialsWithIAM` on a provisioned cluster). Do not grant `redshift:GetClusterCredentials`: the propagated identity is what makes queries run as each user, and per-user enforcement is stronger when the role cannot fetch credentials for arbitrary database users.

**6. Enable the Identity Center integration on Redshift**

Connect your cluster or workgroup to IAM Identity Center. For Redshift Serverless this can only be chosen when the namespace is created, so an existing namespace must be recreated or restored from a snapshot.

**7. Assign every app user to both applications**

Each app user must be assigned in IAM Identity Center to the customer managed application and to the Redshift application the integration created. Assignment to one alone is not enough, and the Data API rejects unassigned users with `Invalid end user credentials`.

### Step 2: Grant database access (Redshift administrator)

Each app user appears in the database as `awsidc:<email>`. Grant that identity the access it should have, and quote the name, since the colon is not legal in an unquoted identifier:

```sql theme={null}
GRANT USAGE ON SCHEMA analytics TO "awsidc:jane@example.com";
GRANT SELECT FOR TABLES IN SCHEMA analytics TO "awsidc:jane@example.com";
```

These grants are the per-user access control. A user without a grant on a table gets `permission denied` for it, whatever the rest of the setup allows.

### Step 3: Configure the client in Lovable (workspace admin)

Register an OAuth application with your identity provider for app users to sign in with, and add Lovable's connector gateway callback URL to its allowed redirect URIs:

```text theme={null}
https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback
```

Then open [**Connectors**](https://lovable.dev/dashboard?connectors), select **Amazon Redshift**, and add an app user client. The form collects seven values, most of which come from your AWS administrator:

| Field | Where it comes from |
| :- | :- |
| Identity provider issuer URL | Your identity provider (the same issuer registered as the trusted token issuer) |
| Client ID | The OAuth app you registered with your identity provider |
| Client secret | The OAuth app you registered with your identity provider |
| AWS region | Where your cluster or workgroup runs |
| Identity Center application ARN | The customer managed application from Step 1 |
| Bootstrap role ARN | The bootstrap role from Step 1 |
| Access role ARN | The access role from Step 1 |

Link the client to the project that should use it, and Lovable wires the per-user connect flow into your app.

### Rules specific to per-user access

* Queries never send `DbUser` or `SecretArn`. The signed-in user's identity travels with the credentials, and the gateway rejects requests containing either field.
* Statements belong to the user who submitted them. Another user cannot read their status or results.
* The app names its query target (workgroup or cluster, plus database) in each request. App user mode gets none of the `REDSHIFT_*` environment variables that an app + chat connection syncs.
* The first query against an idle Serverless workgroup can fail while the workgroup resumes. Retry after a minute or two.

## Limitations

The Amazon Redshift connector cannot:

* Call AWS services other than the Redshift Data API and Redshift Serverless API. The gateway only forwards `RedshiftData.*` and `RedshiftServerless.*` operations, so your app cannot read S3 objects or manage other AWS resources through this connection.
* Use the Redshift management API, such as `DescribeClusters`, which speaks a request protocol the gateway does not sign.
* Enforce read-only access. A connection runs whatever SQL its database identity is allowed to run, so scope it with database grants. See [Restrict a connection to read-only](#restrict-a-connection-to-read-only).
* Return query rows in a single call. Statements always run asynchronously, and results are available only after Redshift finishes processing (the Data API's `WaitTimeSeconds` parameter can hold a response for up to 30 seconds for short statements).
* Refresh or rotate access keys automatically. To rotate, create a new access key in IAM and update the Lovable connection.
* Support per-end-user login on a shared connection. Each connection represents a single set of IAM credentials shared across all projects linked to it. If you need each user of your app to query under their own permissions, use [per-user access with the app user connector](#per-user-access-with-the-app-user-connector).

## Manage your Amazon Redshift connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Amazon Redshift**, then open the connection.

* **Unlink projects** to remove Amazon Redshift access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Amazon Redshift stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to AWS Athena](https://docs.lovable.dev/integrations/aws-athena.md)
- [Connect your app to AWS S3](https://docs.lovable.dev/integrations/aws-s3.md)
- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
