# Connect your app to AWS Athena
<!-- source: https://docs.lovable.dev/integrations/aws-athena.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to AWS Athena

> Connect your app to AWS Athena, the serverless SQL query service for data in Amazon S3, to run queries and power dashboards from your data lake.

[Amazon Athena](https://aws.amazon.com/athena/) is a serverless query service that runs SQL directly against data stored in Amazon S3. The AWS Athena connector lets your Lovable app submit queries and read the results, so you can build dashboards, reports, and internal tools on top of your data lake without managing database servers.

AWS Athena is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With AWS Athena, your app can:

* Run SQL queries against data stored in S3
* Browse data catalogs, databases, and table schemas
* Fetch query results as paginated rows
* Power dashboards and reports with data lake queries
* Reuse your existing Athena workgroups and result locations

Athena queries are asynchronous: the app starts a query, Athena processes it, and the app fetches the results when the query finishes (typically within a few seconds). Lovable generates this flow for you.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Analytics dashboard | *Use AWS Athena and build a dashboard that shows daily revenue and active users from our events table.* | **Turn data lake tables into live dashboards.** The app runs aggregate queries against your S3 data and renders the results as charts. |
| Log explorer | *Use AWS Athena and build a log search tool that filters our access logs by status code and date range.* | **Search large log archives with SQL.** The app queries partitioned log tables in S3 and shows matching rows in a filterable table. |
| SQL query console | *Use AWS Athena and build an internal tool where my team can run queries and download the results as CSV.* | **Give your team a lightweight query console.** The app submits queries, polls until they finish, and renders the results with CSV export. |
| Data catalog browser | *Use AWS Athena and build a browser that lists our databases, tables, and column schemas.* | **Make your data catalog explorable.** The app lists databases and table metadata so anyone can see what data exists and how it's structured. |
| KPI report | *Use AWS Athena and build a weekly report page that compares this week's signups and orders to last week's.* | **Publish recurring reports from data lake queries.** The app runs comparison queries on demand and presents the results as a readable report. |
| Customer usage portal | *Use AWS Athena and build a page where each customer sees their monthly usage from our billing exports.* | **Expose per-customer analytics from S3 exports.** The app filters query results by customer and renders usage summaries. |

## How AWS Athena connections work

Each AWS Athena connection is tied to a single AWS region, with an optional workgroup and query result location. When you connect AWS Athena, you provide IAM credentials, and Lovable's connector gateway signs every request with them. The credentials stay on the server and never reach your published app.

Within your Lovable workspace:

* You can create multiple AWS Athena connections.
* Each connection targets a specific region, and optionally a workgroup and result location.
* Each connection uses its own IAM credentials.
* Multiple projects within a single workspace can use the same connection.

This makes it easy to separate environments (for example, production and staging workgroups) or scope access per team.

AWS Athena uses Lovable's gateway architecture for secure credential handling and automatic request signing. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

## How to connect AWS Athena

Who can create AWS Athena connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

When the connection is created, AWS Athena becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting AWS Athena, make sure you have:

* An AWS account with data in S3 and tables defined in the Glue Data Catalog
* An IAM user with the Athena, Glue, and S3 permissions listed below
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> All queries made through this connector run in your AWS account. Athena charges based on the amount of data each query scans, and AWS bills you directly, not Lovable.

### Step 1: Create an IAM user with Athena access

Before setting up the connection in Lovable, create an IAM user in AWS with the minimum permissions needed. Athena needs three kinds of access: the Athena API itself, the Glue Data Catalog (where table definitions live), and the S3 buckets holding your data and query results.

**1. Open the AWS IAM console**

Go to the [AWS IAM console](https://console.aws.amazon.com/iam/) and create a new IAM user, or use an existing one, for Lovable to use.

**2. Attach an Athena policy**

Create and attach an inline policy, or managed policy, with the following permissions. Replace `YOUR-REGION`, `YOUR-ACCOUNT-ID`, `YOUR-WORKGROUP`, `YOUR-DATABASE`, `YOUR-DATA-BUCKET`, and `YOUR-RESULTS-BUCKET` with your actual values.

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AthenaQueries",
      "Effect": "Allow",
      "Action": [
        "athena:StartQueryExecution",
        "athena:StopQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults",
        "athena:GetWorkGroup",
        "athena:ListDatabases",
        "athena:ListTableMetadata"
      ],
      "Resource": [
        "arn:aws:athena:YOUR-REGION:YOUR-ACCOUNT-ID:workgroup/YOUR-WORKGROUP",
        "arn:aws:athena:YOUR-REGION:YOUR-ACCOUNT-ID:datacatalog/AwsDataCatalog"
      ]
    },
    {
      "Sid": "GlueCatalog",
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetPartition",
        "glue:GetPartitions"
      ],
      "Resource": [
        "arn:aws:glue:YOUR-REGION:YOUR-ACCOUNT-ID:catalog",
        "arn:aws:glue:YOUR-REGION:YOUR-ACCOUNT-ID:database/YOUR-DATABASE",
        "arn:aws:glue:YOUR-REGION:YOUR-ACCOUNT-ID:table/YOUR-DATABASE/*"
      ]
    },
    {
      "Sid": "ReadData",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::YOUR-DATA-BUCKET",
        "arn:aws:s3:::YOUR-DATA-BUCKET/*"
      ]
    },
    {
      "Sid": "ResultLocation",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-RESULTS-BUCKET",
        "arn:aws:s3:::YOUR-RESULTS-BUCKET/*"
      ]
    }
  ]
}
```

> [!TIP]
>
> Keep the policy scoped to the workgroup, database, and buckets your app actually uses. Avoid wildcard (`*`) resources beyond the table and object paths shown above.

The Glue permissions are required because Athena resolves table definitions through the Glue Data Catalog. A missing Glue permission is the most common cause of failing queries after the connection itself verifies successfully.

This policy scopes Glue access to a single database, which is enough to run queries against it. If your app needs to list every database in the catalog (for example, to browse your data catalog), grant `glue:GetDatabase` and `glue:GetDatabases` on `arn:aws:glue:YOUR-REGION:YOUR-ACCOUNT-ID:database/*` instead.

**3. Generate access keys**

In the IAM user's **Security credentials** tab, create an access key. Save both the **Access key ID** and **Secret access key**, since you'll need them in the next step.

> [!WARNING]
>
> The secret access key is shown only once and functions like a password. Store it securely and never commit it to a repository or share it publicly. If you lose it, create a new access key pair.

For more detail, see [Identity and access management in Athena](https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html) in the AWS documentation.

### Step 2: Connect AWS Athena to Lovable

You can create multiple connections using different IAM credentials.

**1. Open AWS Athena in Connectors**

Go to **Connectors** and select **AWS Athena**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Configure the connection**

1. **Display name**: name the connection, for example `Athena Prod`. This name is only used inside Lovable to identify the connection.
2. **AWS region**: select the region where your Athena workgroup lives. The default is **US East (N. Virginia)**.
3. **Access key ID**: paste the IAM access key ID from the previous step.
4. **Secret access key**: paste the IAM secret access key paired with the access key ID.
5. **Workgroup** (optional): the Athena workgroup queries run in. Defaults to `primary`.
6. **Query result location** (optional): the S3 path where Athena writes query results, for example `s3://my-bucket/athena-results/`. Leave it empty if the workgroup enforces its own result location.

**4. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials by looking up the configured workgroup in your region. If verification fails, check that the keys are correct and that the IAM policy includes `athena:GetWorkGroup` on the workgroup.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to AWS Athena (based on configured connection-level access). Your Lovable apps can then run SQL queries against your data in S3 and use the results.

## Limitations

The AWS Athena connector cannot:

* Call AWS services other than Athena. The gateway only forwards Athena API operations, so your app cannot read S3 objects or manage Glue resources directly through this connection.
* Exceed the permissions of the IAM policy you attach. Queries fail if the credentials lack access to the data, the Glue Data Catalog, or the result location.
* Run queries synchronously. Results are available only after Athena finishes processing the query.
* Refresh or rotate access keys automatically. To rotate, create a new access key in IAM and update the Lovable connection.
* Support per-end-user AWS login. Each connection represents a single set of IAM credentials shared across all projects linked to it.

## Manage your AWS Athena connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **AWS Athena**, then open the connection.

* **Unlink projects** to remove AWS Athena access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use AWS Athena stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to AWS S3](https://docs.lovable.dev/integrations/aws-s3.md)
- [Connect your app to Amazon Redshift](https://docs.lovable.dev/integrations/amazon-redshift.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to ClickHouse](https://docs.lovable.dev/integrations/clickhouse.md)
