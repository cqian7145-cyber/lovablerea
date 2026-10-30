# Connect your app to AWS API
<!-- source: https://docs.lovable.dev/integrations/aws.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to AWS API

> Connect your app to AWS API to call any Amazon Web Services API, such as EC2, DynamoDB, Lambda, SQS, and CloudWatch, from your Lovable app.

[Amazon Web Services (AWS)](https://aws.amazon.com/) is a cloud platform with services for compute, storage, databases, messaging, and monitoring. The AWS API connector lets your Lovable app call the API of any AWS service, such as EC2, DynamoDB, Lambda, SQS, and CloudWatch, using an IAM access key from your AWS account. It's designed for internal tools and dashboards that read or manage resources in an AWS account you control.

AWS API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in Chats, in the project chat while you build, and in your published apps.

With AWS API, your app can:

* List and describe resources across your account, such as EC2 instances, DynamoDB tables, and Lambda functions
* Read CloudWatch metrics and logs for dashboards and reports
* Read and write items in DynamoDB tables
* Invoke Lambda functions and send messages to SQS queues
* Create, change, or delete resources when you ask for it, within the IAM policy you attach
* Assume a role in another AWS account for cross-account access

> [!NOTE]
>
> This is a connector for apps you build with Lovable. It integrates your app with your AWS account. It does not deploy or host your Lovable app on AWS. To publish a Lovable app, use Lovable's own [publish flow](https://docs.lovable.dev/features/publish.md).

> [!TIP]
>
> For S3 files, Athena queries, and Redshift data, Lovable has dedicated connectors with guided setup: [AWS S3](https://docs.lovable.dev/integrations/aws-s3.md), [AWS Athena](https://docs.lovable.dev/integrations/aws-athena.md), and [Amazon Redshift](https://docs.lovable.dev/integrations/amazon-redshift.md). Use AWS API for every other service, or when one app needs several AWS services through a single connection.

## Common use cases and example apps

These examples show what you can build with AWS API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Cloud inventory dashboard | *Use AWS API and build a dashboard that lists my EC2 instances with their state, instance type, and launch time.* | **See what is running in your account at a glance.** The app describes your EC2 instances and renders them as a filterable table. |
| Metrics viewer | *Use AWS API and build a page that charts CPU utilization for my production instances over the last 24 hours.* | **Turn CloudWatch metrics into charts your team reviews.** The app reads metric data from CloudWatch and plots it per instance. |
| Form submissions in DynamoDB | *Use AWS API and build a contact form that stores each submission in my DynamoDB table.* | **Store app data in a table you already own.** The app writes each submission to DynamoDB and lists recent entries for review. |
| Lambda runner | *Use AWS API and build an internal tool where my team can run our report-generation Lambda function and see the result.* | **Give your team a button for an existing Lambda function.** The app invokes the function with the parameters the user enters and shows the response. |
| Queue monitor | *Use AWS API and build a page that shows the message counts of our SQS queues and lets me send a test message.* | **Watch queue depth without opening the AWS console.** The app reads queue attributes from SQS and sends a message only when you click send. |
| Cost report | *Use AWS API and build a report of this month's spend by service from Cost Explorer, with the status of our budgets.* | **Keep cloud spend visible to the people who create it.** The app reads cost data from Cost Explorer and budget status from AWS Budgets. |

## How AWS API connections work

Each AWS API connection uses one IAM access key and a default region, and multiple projects in the workspace can share it. Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) signs every request with the key and forwards it to the AWS service your app names, so the key stays on the server and never reaches your published app. Global services such as IAM, Route 53, CloudFront, Organizations, AWS Budgets, and Cost Explorer ignore the region and route to their global endpoints.

The connector does not restrict which services or actions a connection can reach, and it does not distinguish reads from writes. The IAM policy on the access key is the only control: whatever the key may do, apps built on the connection can do. Scope the policy to exactly the services and actions your app needs, and make it read-only where possible.

When you build with the connection in the project chat, Lovable works this way:

* Lovable builds read-only features by default and adds calls that create, change, or delete resources only when you ask for them.
* Before adding a call that changes your account, Lovable states what it creates, modifies, or deletes and what it costs, and asks you to confirm.
* Lovable builds resource creation as a single action that you confirm, rather than a loop, schedule, or per-user trigger.
* When AWS denies a call, Lovable names the IAM action to grant instead of retrying.

## How to connect AWS API

Who can create AWS API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple AWS API connections using different IAM access keys, which is useful for separating AWS accounts or environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting AWS API, make sure you have:

* An AWS account with the resources your app works with
* Permission in that account to create an IAM user, attach a policy, and create an access key
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!WARNING]
>
> API actions can create or change cloud resources and incur costs, and you are responsible for all of them. AWS bills your account directly for everything your app uses or creates, not Lovable. Set an [AWS Budget](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html) with an alert before you connect, verify what Lovable builds, and confirm that cleanup and teardown succeed.

### Step 1: Create an IAM user with a least-privilege policy

The connection authenticates as an IAM user. Create a dedicated user for Lovable, attach the tightest policy that covers your app, and create an access key for it. Lovable refuses account-root credentials, because root keys cannot be permission-scoped and expose your entire AWS account.

To create the IAM user and access key:

**1. Create an IAM user**

Go to the [AWS IAM console](https://console.aws.amazon.com/iam/), open **Users**, and click **Create user**. Give it a name such as `lovable-app` and leave console access disabled. Lovable only needs programmatic access.

**2. Attach a least-privilege policy**

On the user's **Permissions** tab, choose **Add permissions → Create inline policy**, switch to the **JSON** editor, and paste a policy. Start from the read-only example below and replace `YOUR-REGION` with the region you select in Lovable. Then add the write actions your app needs, limited to the specific resources it manages.

```json theme={null}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOnlyStarter",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "cloudwatch:GetMetricData",
        "cloudwatch:ListMetrics"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": { "aws:RequestedRegion": "YOUR-REGION" }
      }
    },
    {
      "Sid": "DenyAccountAdministration",
      "Effect": "Deny",
      "Action": ["iam:*", "organizations:*", "account:*"],
      "Resource": "*"
    }
  ]
}
```

Global services such as IAM, Route 53, CloudFront, Cost Explorer, and AWS Budgets always report `us-east-1` as their requested region, so grant them in a separate statement without the region condition.

> [!TIP]
>
> Keep the `Deny` on `iam:*`, `organizations:*`, and `account:*` unless the app is an AWS administration tool you control. A key that can change IAM can grant itself more access. To limit where the key can be used from, add an `aws:SourceIp` condition with the [gateway IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting).

**3. Create an access key**

On the user's **Security credentials** tab, click **Create access key**. On **Access key best practices & alternatives**, choose **Third-party service** as the use case and click **Next**. Optionally add a description tag, then click **Create access key**. On **Retrieve access keys**, click **Show** to reveal the secret access key, or **Download .csv file** to save both values. Copy the **Access key ID** and the **Secret access key** for the next step, then click **Done**.

> [!WARNING]
>
> The secret access key is shown only once and functions like a password. Store it securely and never commit it to a repository or share it publicly. If you lose it, create a new access key pair.

For more detail, see [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) in the AWS documentation.

### Step 2: Connect AWS API to Lovable

With the access key created, create the connection in Lovable.

**1. Open AWS API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **AWS API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors). The connector page shows a **Use responsibly** notice about the cost and resource impact of API actions.

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **AWS region**: select the default region for requests. The default is **US East (N. Virginia, us-east-1)**. Global services such as IAM, Route 53, and CloudFront ignore it.
2. **Access key ID**: paste the access key ID from step 1. **Get value** next to the field opens the AWS IAM console.
3. **Secret access key**: paste the secret access key paired with that access key ID.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone you share the connection with can build features that use the full IAM policy of the access key.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials against AWS before saving the connection by asking AWS which identity the key belongs to, a check that needs no IAM permissions. If verification fails, see [Troubleshooting](#troubleshooting).

When connected, anyone building in a project can ask Lovable in the project chat to link their project to AWS API (based on configured connection-level access). Your Lovable apps can then call AWS service APIs through the connector gateway, within the limits of the IAM policy.

## Limitations

The AWS API connector cannot:

* Restrict a connection to read-only operations or to specific AWS services from inside Lovable. The IAM policy on the access key is the only control over what apps built on the connection can do.
* Connect with temporary credentials (a session token) or with an IAM role directly. The connection needs a long-lived access key for an IAM user. Your app can still call `AssumeRole` through the connection for cross-account access.
* Reach the AWS China or AWS GovCloud (US) partitions. Only commercial regions are available.
* Send a request body larger than 6 MiB. For larger Lambda deployment packages or CloudFormation templates, upload the artifact to S3 first and reference it from the request.
* Receive events from AWS, such as SNS notifications or EventBridge events. The connection only makes outbound calls.
* Support per-end-user AWS login. Each connection represents a single IAM user shared across all projects linked to it.

If you deactivate or delete the access key in IAM, update the connection with a new key before API calls can succeed again.

## Troubleshooting

Use these checks when connecting fails or an AWS request returns an unexpected status.

> **Connect failed with a credential error**
>
> Lovable checks the key against AWS when you click **Connect**, and the error message starts with the cause:
>
> * *the AWS access key ID was not recognized*: check the access key ID for typos, and confirm the key is **Active** on the IAM user's **Security credentials** tab.
> * *the request signature was rejected*: the secret access key does not match the access key ID. Paste it again, or create a new access key pair.
> * *the AWS credentials have expired*: long-lived IAM access keys do not expire. Re-check the values, and use an access key created for an IAM user.
> * *AWS denied the identity check*: confirm the credentials are active, and ask your AWS administrator whether a service control policy blocks the key.
> * *these are root account credentials*: Lovable does not connect with root keys. Create a dedicated IAM user as described in step 1.

> **A request returned 403 AccessDenied after connecting**
>
> Connecting verifies the key but grants no permissions. An `AccessDenied` or `AccessDeniedException` error means the IAM policy on the access key lacks the action, or a service control policy or permission boundary denies it. Add the action to the policy in IAM. AWS evaluates permissions on every request, so you do not need to reconnect. When this happens in the project chat, Lovable names the missing action.
>
> If the call targets a global service or a region other than the connection's default, check any `aws:RequestedRegion` condition in the policy.

> **A request returned 429 Too Many Requests**
>
> The connector gateway allows 300 requests per minute per AWS API connection per project, a stricter limit than the [general gateway limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors), and returns `429` with a `Retry-After` header before the request reaches AWS. AWS services also apply their own limits and return throttling errors such as `ThrottlingException`.
>
> Ask Lovable to cache reads, poll on demand rather than on a frequent fixed timer, and retry throttled calls with increasing delays.

## Manage your AWS API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **AWS API**, then open the connection.

* **Unlink projects** to remove AWS API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use AWS API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Amazon Redshift](https://docs.lovable.dev/integrations/amazon-redshift.md)
- [Connect your app to AWS Athena](https://docs.lovable.dev/integrations/aws-athena.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to AWS S3](https://docs.lovable.dev/integrations/aws-s3.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
