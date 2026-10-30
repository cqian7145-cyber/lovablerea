# Fix a slow database and choose the right capacity
<!-- source: https://docs.lovable.dev/features/database-performance.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Fix a slow database and choose the right capacity

> Read the high-load notices Lovable shows, find the slow queries behind them, and decide whether your database needs a larger instance or more storage.

As your app grows, its database can run short of processing power, memory, or disk capacity. Lovable shows you when that happens, helps you find the cause, and lets you add capacity when the cause is the size of your database.

A slow query is often the real problem. A larger instance, the computing capacity your database runs on, costs more credits every hour your app runs. Start with the notice you received, check the health of your database, and fix the queries behind the load before you resize.

## How Lovable warns you about high load

Lovable tells you when your database reached a resource limit in the last 48 hours, so you do not have to watch for it yourself:

* In the project chat and in the **Publish** dialog, a notice tells you that your app is under high load, with a **Resolve** button. The notice in the **Publish** dialog does not block publishing.
* In the **Database** view, a card shows your current instance size and the same notice, with a **Resolve** button.
* The project owner receives an in-app notification that the database reached its limit.

Click **Resolve** to start a request in the project chat. Lovable checks whether the database is still under pressure, finds the likely cause, and suggests query or code changes, so you may not need a larger instance. The request is treated as standard build usage and consumes credits.

When a larger instance is the right fix, Lovable shows the credit impact and offers the resize for your approval, on Pro plans and higher. See [Ask Lovable to resize your instance](#ask-lovable-to-resize-your-instance).

## Check resource health

To see whether your database is under pressure, go to **More → Database**, select **Manage**, then **Settings**. On all plans, **Database settings** opens with three cards: **CPU**, **Memory**, and **Disk**. Each card shows the last 24 hours as a row of hourly segments.

Lovable highlights a segment when that resource was close to its limit during that hour, which the cards call pressure. Hover over a segment to see the hour it covers and whether Lovable detected pressure. When the current hour is under pressure, the card also shows how much of that resource your database is using.

The cards cover the last 24 hours. The high-load notices cover a longer window, the last 48 hours.

A single hour of pressure can be temporary. Wait and check whether it continues before you resize.

The **Disk** card shows how much data your database reads and writes, not how full your database storage is. For that, read the **Database storage** row in the same settings. See [Database storage](#database-storage).

When any card shows pressure in the last 24 hours, a notice tells you that your database reached a resource threshold. Click **Ask Lovable** in the notice. Lovable then finds what is causing the pressure and suggests query or code changes that reduce the load, so you may not need a larger instance. The request is treated as standard build usage and consumes [credits](https://docs.lovable.dev/introduction/credits-and-usage.md).

## Run a health check

Ask Lovable in the project chat for a snapshot of your database, including its connections, memory, disk usage, and recent restarts. For example:

```text wrap theme={null}
Run a health check on my database.
```

Lovable shows a summary of your database's current status. Use it to spot issues such as high connection counts, low disk space, or memory pressure before they affect your app. The summary also lists any CPU, memory, or disk pressure alerts from the last 48 hours.

## Find and fix slow queries

Lovable can find the slowest queries in your database and fix them, so you solve the real cause before you consider a larger instance. For example, prompt Lovable in the project chat:

```text wrap theme={null}
My app feels slow. Find the slowest database queries and optimize the worst ones.
```

Lovable reads your database's query statistics and ranks the heaviest queries by total execution time, with call counts and timing data for each. Lovable then investigates the heaviest queries and checks how the database runs each one. Where they help, Lovable applies targeted fixes, such as adding an index, which is a lookup structure that speeds up a query.

Query statistics build up as your app handles real traffic, so a new or recently restarted database may have nothing to report yet. Finding slow queries does not change your database. Lovable changes it only when it applies a fix, and it tells you what it changed.

## Decide between a larger instance and more storage

The two capacity settings fix different problems:

* [**Database size**](#database-size) is the instance size, which decides how much traffic and querying your database can handle. Change it when your app is slow under load and Lovable found no slow queries to fix.
* [**Database storage**](#database-storage) is how much data your database can store. Change it when your storage is nearly full, which Lovable reports as low disk space.

You find both rows in **Database settings**: go to **More → Database**, select **Manage**, then **Settings**. Both changes raise what your project costs in credits.

## Database size

The **Database size** row shows your current instance size. Click **Manage**, choose a new size in the **Manage instance** dialog, and confirm the resize.

* **Free plan**: your database runs on **Tiny**. To use a larger instance, upgrade your plan.
* **Paid plans**: choose from **Tiny**, **Mini**, **Small**, **Medium**, **Large**, or **X-Large**. Larger sizes handle more users and traffic, and cost more credits per hour while your app runs.

A resize takes a few minutes, with a brief interruption while the instance restarts. You can't make further changes until the resize finishes. You can choose a smaller size again later.

> [!NOTE]
>
> If **Database settings** shows a notice that the database size names were updated, your instance was renamed, not resized, and its hourly price did not change.
>
> Some projects run on **2X-Large**, the largest size. **2X-Large** appears as your current size if your project uses it, but you can't select it. A project that moves off **2X-Large** can't move back.

### Estimated monthly cost

On all plans, workspace editors, admins, and owners can see an estimated monthly cost under each size in the **Manage instance** dialog. Compare the estimates before you change size.

Lovable uses your app's backend usage over the last 30 days to estimate the cost of each size. For new apps or apps with fewer than 10 days of usage history, Lovable uses a default usage estimate instead.

The estimate includes your database server and other backend usage, such as storage. It excludes building with Lovable and AI usage in your app. Actual costs can change as your app's usage changes.

### Ask Lovable to resize your instance

On Pro plans and higher, you can also ask Lovable in the project chat to resize the instance instead of opening **Database settings** yourself. When you describe database slowness, Lovable can offer a resize approval card that shows the credit impact. The resize applies only after you approve it.

For example:

```text wrap theme={null}
My database feels slow under load. Resize my database instance to a larger size.
```

Lovable checks that the instance size, rather than storage or a slow query, is the cause before it offers the resize. You can also choose a smaller size this way.

## Database storage

The **Database storage** row shows how much of your database storage your project uses. If storage is nearly full, click **Manage** and enter a new size in the **Increase database storage** dialog.

Click **Increase storage size**, then confirm with **Increase storage**. When the new size is at least 1.5 times the current size, you also check a box to acknowledge that the increase raises storage costs.

A few constraints apply:

* The minimum size is 8 GB.
* You can increase storage but not decrease it.
* One change can raise the size to at most 5 times the current size.
* You can change the storage size up to 4 times within 24 hours.
* A resize takes a few minutes. A larger storage size uses more credits.

## Troubleshooting

> **Why isn't my data loading?**
>
> Your data can fail to load for several reasons:
>
> * The instance is too small for the amount of data and traffic it handles.
> * A query has an error.
> * [Row level security policies](https://docs.lovable.dev/features/database-access.md#row-level-security-rls-policies) block the query.
> * The database is [paused](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using), for example after your workspace runs out of credits or reaches a credit limit.
>
> Ask Lovable to inspect the error and [run a health check](#run-a-health-check).
>
> If the health check shows the instance is under pressure, [choose a larger instance size](#database-size). After the resize completes, try the failing action again. If the disk is full instead, [increase database storage](#database-storage).
>
> A larger instance costs more credits per hour while your app runs. To review that usage, go to [Workspace settings → Plans & credit usage → Usage details](https://lovable.dev/settings/billing) and select **Run credits**.

> **I can't change the instance size**
>
> **Manage** is unavailable while your database is busy or when your plan does not include resizing. The reasons, in the order you are most likely to meet them:
>
> * A resize is still running. Wait a few minutes, then try again.
> * Another infrastructure change is in progress, such as a restore or a storage increase.
> * Your plan does not include instance resizing. Free plans run on **Tiny**.
>
> Hover over the disabled button to see which of these applies. Storage has its own limit: you can change the storage size up to 4 times within 24 hours. See [Database size](#database-size) and [Database storage](#database-storage).


## Related topics

- [Database](https://docs.lovable.dev/features/database.md)
- [Project usage and costs](https://docs.lovable.dev/features/project-usage.md)
- [Connect your app to Microsoft Fabric](https://docs.lovable.dev/integrations/microsoft-fabric.md)
- [Debug and improve your app](https://docs.lovable.dev/prompting/prompting-debugging.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
