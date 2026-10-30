# Connect your app to AWS S3
<!-- source: https://docs.lovable.dev/integrations/aws-s3.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to AWS S3

> Connect your app to AWS S3 to read and write CSV, JSON, Parquet, and other data files in S3 buckets from your Lovable apps.

[Amazon S3](https://aws.amazon.com/s3/) is a cloud object storage service. It lets your Lovable app read and write data files such as CSV, JSON, Parquet, and more directly in your S3 buckets, so you can build apps that work with external datasets, batch exports, file uploads, and file-based data sources.

AWS S3 is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With AWS S3, your app can:

* Read CSV, JSON, and other data files from S3 buckets
* Upload files to S3 buckets (when write access is enabled)
* List and browse objects in a bucket with prefix filtering
* Integrate external data sources into your Lovable app
* Access batch data exports from enterprise data pipelines

AWS S3 is a good fit when your app needs to read or write files in S3, such as analytics exports, data pipeline outputs, user uploads, or shared datasets.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Data explorer | *Build a data explorer that lists files in my S3 bucket and lets me preview CSV and JSON files.* | **Browse and preview files stored in S3 without leaving your app.** The app lists objects in the bucket and renders previews of supported file formats inline. |
| Analytics dashboard | *Build a dashboard that reads a daily export CSV from S3 and shows charts for revenue and user signups.* | **Turn S3 data exports into live dashboards.** The app reads the latest export file from your bucket and visualizes key metrics automatically. |
| Report viewer | *Build an internal report viewer that loads JSON reports from S3 and displays them in a searchable table.* | **Give your team a clean interface to browse reports.** The app pulls JSON files from a specific S3 prefix and renders them as filterable, sortable tables. |
| File download portal | *Build a file download portal where users can browse and download files from our shared S3 bucket.* | **Create a simple self-service file access layer on top of S3.** The app lists available files and lets users download them directly, without needing AWS console access. |
| File upload app | *Build an app where users can upload CSV files to our S3 bucket for processing.* | **Accept file uploads directly into S3.** The app uploads files via signed URLs, letting users submit data without needing AWS credentials. |
| Data pipeline monitor | *Build a tool that checks my S3 bucket for new data files and shows when each pipeline last wrote output.* | **Monitor data pipeline health by tracking file freshness.** The app lists objects by prefix and surfaces the last-modified timestamps so you can spot stale or missing exports. |

## How AWS S3 connections work

Each AWS S3 connection is tied to a single S3 bucket. When you connect AWS S3, you provide IAM credentials with access to that bucket. By default, connections are read-only, but you can enable read-write access to allow file uploads.

Within your Lovable workspace:

* You can create multiple AWS S3 connections.
* Each connection targets a specific bucket and AWS region.
* Each connection uses its own IAM credentials.
* Multiple projects within a single workspace can use the same connection.

This makes it easy to connect different buckets (for example, production data and staging data) or separate access by team.

AWS S3 uses Lovable's gateway architecture for secure credential handling and automatic request signing. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for details on authentication and usage limits.

> [!NOTE]
>
> By default, each AWS S3 connection has **read-only** access. To enable file uploads, set the **Access type** to **Read & write** when creating or editing the connection. Even with write access enabled, the connector does not support deleting objects.

## How to connect AWS S3

Workspace **admins** and **owners** can connect AWS S3.

When a connection is created, the S3 bucket becomes available across all projects in the workspace.

### Prerequisites

Before connecting AWS S3, make sure you have:

* An AWS account with access to the S3 bucket you want to connect
* An IAM user with the appropriate S3 permissions (see below)
* The bucket name and AWS region
* Lovable workspace admin or owner role

### Step 1: Create an IAM user with S3 access

Before setting up the connection in Lovable, create an IAM user in AWS with the minimum permissions needed.

**1. Open the AWS IAM console**

Go to the [AWS IAM console](https://console.aws.amazon.com/iam/) and create a new IAM user, or use an existing one, for Lovable to use.

**2. Attach an S3 policy**

Create and attach an inline policy, or managed policy, with the following permissions. Replace `YOUR-BUCKET-NAME` with your actual bucket name.

For **read-only** access:

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    },
    {
      "Sid": "ReadObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

For **read and write** access (includes upload):

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    },
    {
      "Sid": "ReadWriteObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

> [!TIP]
>
> Keep the policy scoped to only the bucket you want to connect. Avoid using wildcard (`*`) resources.

**3. Generate access keys**

In the IAM user's **Security credentials** tab, create an access key. Save both the **Access Key ID** and **Secret Access Key**, since you'll need them in the next step.

> [!WARNING]
>
> The secret access key is shown only once. Store it securely. If you lose it, you'll need to create a new access key pair.

### Step 2: Connect AWS S3 to Lovable

> [!WARNING]
>
> When you connect AWS S3, the bucket's contents will be accessible to all users in your workspace.

**1. Navigate to the AWS S3 connector**

Open **Connectors** and select **AWS S3**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a name for the connection, for example `S3 (Production Data)`.

**4. Configure the connection**

Fill in the required fields:

* **Bucket name**: the name of the S3 bucket (for example, `my-data-bucket`)
* **AWS region**: the region where the bucket is located (for example, `us-east-1`)
* **Access key ID**: the IAM access key ID from the previous step
* **Secret access key**: the IAM secret access key from the previous step

Optionally, expand **Advanced settings** to configure:

* **Access type**: choose **Read only** (default) or **Read & write**. Read & write enables file uploads via signed URLs. Make sure the IAM policy includes `s3:PutObject` if you enable this.

**5. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials by checking access to the bucket. If verification succeeds, the connection is ready to use.

When connected, your Lovable apps can start reading data from the S3 bucket.

## CORS configuration for signed URLs

File downloads and uploads use signed URLs, where the browser accesses S3 directly. For this to work, your S3 bucket must have a CORS (Cross-Origin Resource Sharing) policy that allows requests from your app's origin. Without it, the browser will block the request.

To configure CORS on your bucket:

1. Open the [S3 console](https://console.aws.amazon.com/s3/) and select your bucket.
2. Go to **Permissions → Cross-origin resource sharing (CORS)**.
3. Add a CORS configuration. Replace `https://your-app-id.lovable.app` with your app's actual URL:

```json theme={null}
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedOrigins": ["https://your-app-id.lovable.app"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

> [!TIP]
>
> If you only need downloads, you can restrict `AllowedMethods` to `["GET"]`. Add `"PUT"` only if you have write access enabled. You can find your app's origin URL in the browser address bar when previewing your Lovable app.

> [!WARNING]
>
> Avoid using `"*"` for `AllowedOrigins` in production. Restrict it to your app's specific origin to follow the principle of least privilege.

## Limitations

The AWS S3 connector does not support:

* Deleting objects in the bucket
* Connecting to S3-compatible services other than AWS S3, such as MinIO or DigitalOcean Spaces
* Per-user AWS login where each end user connects their own AWS account
* Real-time event notifications or S3 event triggers

## Manage your AWS S3 connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **AWS S3**, then open the connection.

* **Unlink projects** to remove AWS S3 access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use AWS S3 stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to AWS Athena](https://docs.lovable.dev/integrations/aws-athena.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to Amazon Redshift](https://docs.lovable.dev/integrations/amazon-redshift.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to ClickHouse](https://docs.lovable.dev/integrations/clickhouse.md)
