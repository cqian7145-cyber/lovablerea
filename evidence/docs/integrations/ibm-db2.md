# Connect your app to IBM Db2
<!-- source: https://docs.lovable.dev/integrations/ibm-db2.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to IBM Db2

> Connect your app to IBM Db2 on Cloud to browse your schemas and tables and run SQL queries from your Lovable app.

[IBM Db2](https://www.ibm.com/products/db2) is IBM's relational database, available in IBM Cloud as a managed service. The IBM Db2 connector lets your Lovable app browse the schemas and tables in a Db2 on Cloud instance and run SQL queries against it.

IBM Db2 is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With IBM Db2, your app can:

* Browse the schemas, tables, and columns the connected database user can see
* Run SQL queries and show the results in your app
* Export larger query results as CSV

Use IBM Db2 when your app needs live data from a Db2 database your team already runs in IBM Cloud.

## Common use cases and example apps

These examples show what you can build with IBM Db2, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Sales dashboard** | *Use IBM Db2 and build a dashboard that shows monthly revenue by region and product line.* | **See your Db2 data as charts and tiles.** The app discovers the right tables and queries them for each view. |
| **Table browser** | *Use IBM Db2 and build an internal app that lists our database tables and previews their contents.* | **Browse the database without writing SQL.** The app lists schemas and tables and previews the one a user picks. |
| **Customer lookup** | *Use IBM Db2 and build a support tool where agents search customers by name or email and see their orders.* | **Put one record in front of the person who needs it.** The app queries the customer and order tables and shows a single profile view. |
| **Inventory monitor** | *Use IBM Db2 and build a page that flags products whose stock fell below their reorder threshold.* | **Catch low stock before it costs a sale.** The app compares stock levels against thresholds and highlights the products that need action. |
| **Report portal** | *Use IBM Db2 and build a portal where managers pick a quarter and see bookings, billings, and backlog.* | **Turn recurring reports into a self-serve page.** The app runs the underlying queries for the quarter the user picks. |
| **Data quality checker** | *Use IBM Db2 and build a page that lists rows with missing or duplicate values in our contacts table.* | **Find bad rows before they spread.** The app runs validation queries and lists the offending rows. |

## How to connect IBM Db2

Who can create IBM Db2 connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple IBM Db2 connections using different instances or database users, which is useful for separating environments or limiting each app to the data its user can see.

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting IBM Db2, make sure you have:

* A Db2 on Cloud instance in your IBM Cloud account
* A database userid and password for that instance (Step 1 shows where to find them)
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

> [!NOTE]
>
> Queries made through this connector run on your Db2 instance and use its compute. Billing is handled directly by IBM Cloud, not Lovable.

### Step 1: Get your Db2 endpoint and credentials

The connector signs in with a database userid and password and needs your instance's REST API endpoint. Queries run with that user's database privileges.

To collect the connection details:

**1. Open your instance in IBM Cloud**

Sign in to [IBM Cloud](https://cloud.ibm.com/), open the **Resource list**, and select your Db2 instance.

**2. Create a database credential**

Open the instance's **Service credentials** tab and click **New credential**. The credential JSON contains a `username` and a `password` for the database. In Step 2, enter the `username` value in the **Userid** field.

**3. Copy the deployment CRN**

The instance panel shows the Cloud Resource Name (CRN), a long identifier starting with `crn:v1:bluemix:`. Copy it. The connection form asks for it.

**4. Note the REST API endpoint**

The endpoint is regional: `https://<region>.db2.saas.ibm.com`, where `<region>` is the region of your instance, for example `us-south`.

> [!WARNING]
>
> A service credential has administrator rights. Apps that use it can change or delete data in your database. For most apps, create a read-only database user in the Db2 console (see IBM's [Managing users](https://cloud.ibm.com/docs/db2-saas?topic=db2-saas-user_mgmt)) and use that user's userid and password.
>
> Keep the password secure. Enter it only in the connection form in Lovable. Do not put it in a prompt, a chat message, or your app's code.

See IBM's documentation for more: [Database details and connection credentials](https://cloud.ibm.com/docs/db2-saas?topic=db2-saas-db_details_cxn_creds).

### Step 2: Connect IBM Db2 to Lovable

Open the connection form and enter the values from Step 1.

**1. Open IBM Db2 in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **IBM Db2**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors).

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, enter:

1. **REST API endpoint**: the https endpoint from Step 1, for example `https://us-south.db2.saas.ibm.com`.
2. **Deployment CRN**: the CRN from Step 1. The form marks this field optional, but Db2 on Cloud needs it.
3. **Userid**: the database userid from Step 1.
4. **Password**: the password issued alongside the userid.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable verifies the credentials against your Db2 instance before saving the connection.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to IBM Db2 (based on configured connection-level access). Your Lovable apps can then browse your schemas and run SQL on your data.

In the project chat, Lovable asks for your approval before it runs each SQL query, including a read-only query. The connector cannot tell a query that reads data from a query that changes data. If you select **Always allow**, Lovable can run all later queries on that connection without asking. This includes queries that change or delete data. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat). A published app does not ask for approval.

If the database password changes, open the connection, enter the new **Password** under **Configure connection**, and click **Update**. Lovable verifies the new password with your Db2 instance before saving it.

## Working with query results

Each query returns up to a row limit that Lovable sets. If a query would return more rows than that limit, the code Lovable writes for your app stops with an error instead of showing incomplete data. When you ask for a page that shows many rows, ask Lovable to paginate or filter rather than load a whole table. For a larger extract, ask Lovable to export the results as CSV. A CSV export can stop at 100,000 rows.

## Limitations

The IBM Db2 connector cannot:

* Connect to a Db2 server you run yourself. The connector uses the IBM Db2 REST API, which serves managed Db2 instances in IBM Cloud.
* Support per-end-user IBM Db2 login. Each connection represents a single database user shared across all projects linked to it.

## Manage your IBM Db2 connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **IBM Db2**, then open the connection.

* **Unlink projects** to remove IBM Db2 access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use IBM Db2 stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Workday](https://docs.lovable.dev/integrations/workday.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
- [Connect your app to Neon](https://docs.lovable.dev/integrations/neon.md)
- [Connect your app to Granola](https://docs.lovable.dev/integrations/granola.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
