# Database
<!-- source: https://docs.lovable.dev/features/database.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Database

> View and edit your app's data in the Database view: browse tables, edit records, run SQL, change your data structure, and open the tools around your database.

The **Database** view shows your app's data and lets you edit it directly, without writing code. A database is where your app keeps the information it needs to remember, such as users, orders, or messages, in tables. Each row is one record and each column is one detail about it, similar to a structured spreadsheet.

To open the view, go to **More → Database**. You need edit access to the project to open the view and change records.

When your database runs low on resources, the view shows a notice that your app is under high load. See [Fix a slow database and choose the right capacity](https://docs.lovable.dev/features/database-performance.md).

## Add a database to your project

Every project can use the [built-in backend](https://docs.lovable.dev/features/cloud) (Cloud), which includes a managed PostgreSQL database. Describe the data your app needs in the project chat, and Lovable creates the tables and their structure for you. For example, tell Lovable:

```text wrap theme={null}
I want a place to keep track of my clients with their name, email, phone number, and notes. I also need a way to track deals, including which client it's for, the value, the stage it's in, and when I expect it to close.
```

Until the project has a database, the **Database** view shows a card describing what a database stores, with an **Enable** button. Enabling the database also adds user accounts and file storage to the project, because the three services run together.

Lovable creates the database in a region that cannot be changed afterwards. See [Choose where your project's data is stored](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored) for how that region is decided.

> [!NOTE]
>
> Every [draft](https://docs.lovable.dev/features/drafts.md) uses the same database as your project. Lovable adds the tables and columns you ask for in a draft when you accept the draft. Accepting a draft never removes or renames a table or column. See [Add database tables and columns from a draft](https://docs.lovable.dev/features/drafts.md#add-database-tables-and-columns-from-a-draft).

## View tables and data

The **Database** view lists your project's tables with an approximate row count for each. Click a table to browse and edit its records. Tables populate as soon as your app saves information.

The list also includes any database views your app uses. A database view shows data drawn from one or more tables, and you can read it but not edit it.

## Edit records

Open a table to view and edit its records. Double-click a value to edit it in place. You can also:

* **Filter**: add one or more column filters. Available operators depend on the column type, for example equals or contains for text, greater than or less than for numbers, and before or after for dates.
* **Add row**: opens a form based on the table's structure. The database fills in some columns itself, such as IDs and timestamps, so the form leaves those out.
* **Edit row**: opens the full row for editing. Editing a row works only in tables with a single primary key, the column that identifies each row.
* **Delete**: select rows and delete them. The button names how many rows you selected, and Lovable asks you to confirm. Deleting rows cannot be undone.
* **Export CSV**: download the table's records as a CSV file. The file contains every row that matches your current filters, not only the page you see. For a copy of the whole database, see [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database).
* **Refresh**: reload the table after your app writes new data. The view does not update live.

You can show 10, 25, 50, or 100 rows per page.

The **Database** view has no import option. To load data from a file, such as a CSV export from another tool, attach the file in the project chat and ask Lovable to add the rows to a table.

> [!WARNING]
>
> Edits apply directly to your project's database, the same database your published app uses.

## Find the tools around your database

In the **Database** view, select **Manage** to open the tools around your database:

* **Jobs**: scheduled background tasks in your app. See [Jobs](https://docs.lovable.dev/features/jobs.md).
* **SQL editor**: run your own queries against the database. See [Run SQL queries](#run-sql-queries).
* **Edge functions**: the server-side code your app runs. See [Edge functions](https://docs.lovable.dev/features/edge-functions.md).
* **Backups**: the daily backups you can restore. See [Back up, restore, and export your app's database](https://docs.lovable.dev/features/database-backups.md).
* **Policies**: the rules that decide which rows each user can see or change. See [Row level security (RLS) policies](https://docs.lovable.dev/features/database-access.md#row-level-security-rls-policies).
* **Settings**: the database itself, rather than the data in it.

From **Settings** you can [resize the instance or add storage](https://docs.lovable.dev/features/database-performance.md), [check its location](#check-where-your-database-is-hosted), [export the database](https://docs.lovable.dev/features/database-backups.md#export-your-database), or [pause and remove it](https://docs.lovable.dev/features/database-pause-remove.md).

## Check where your database is hosted

To see the region your database runs in, go to **More → Database**, select **Manage**, then **Settings**. The **Database location** row shows that region and the PostgreSQL version your database runs. The row names the region the way the hosting provider does, for example **Europe (Frankfurt)** for a database in Europe.

The region is set when the database is created and cannot be changed afterwards. Existing projects cannot be moved between regions. To choose the region for a project before you create its database, see [Choose where your project's data is stored](https://docs.lovable.dev/features/cloud#choose-where-your-project-data-is-stored).

## Run SQL queries

For direct database access, open the **SQL editor**: in the **Database** view, select **Manage**, then **SQL editor**. Write your query, then click **Run** or press **⌘/Ctrl + Enter**.

The editor autocompletes table and column names from your database. Results appear in a table below the query. If a query fails, the error message appears in its place. Click **Clear** to empty the editor.

If a query contains a destructive statement such as `DELETE`, `DROP`, `TRUNCATE`, `ALTER`, or `UPDATE`, Lovable asks you to confirm before running it.

> [!TIP]
>
> You rarely need SQL. For most changes, describing what you want in the project chat is safer. See [How Lovable changes your database structure](#how-lovable-changes-your-database-structure).

## How Lovable changes your database structure

When you ask for a new table, column, or access rule in the project chat, Lovable makes the change. Lovable also updates the type definitions in your app's code, so the code matches the database.

Lovable records each change as a migration file in your project's code, under `drizzle/migrations/`. A migration file is a SQL file that describes one change to the database structure. Your code therefore carries the full history of how your database was built.

Lovable uses Drizzle, an open-source tool for database migrations, to create and apply these files. Projects with earlier migration files keep them under `supabase/migrations/`.

Lovable refuses changes that could break your published app:

* Dropping or renaming a table or column
* Changing a column's type
* Adding a required column without a default value

Instead, Lovable reaches the same result by adding to your database, for example by adding a new column and copying the data over. The old column stays in place.

To let Lovable make such a change directly, set **Execute backward incompatible database migrations** to **Ask each time** or **Always allow** in your [agent permissions](https://docs.lovable.dev/features/cloud#tool-settings-and-defaults). With **Ask each time**, Lovable shows you the SQL and asks for your approval before it applies the change.

Lovable maintains the `drizzle` folder, including `drizzle/schema.ts`, and the `drizzle.config.ts` file in your project's code, so leave them as they are.

## Supported PostgreSQL extensions

A PostgreSQL extension adds a capability to your database, such as scheduled jobs or vector search. Your project's database supports a fixed set of extensions:

| Extension | Use it for |
| - | - |
| `pg_cron` | Scheduled jobs |
| `pg_net` | HTTP requests from the database, for example to call an edge function |
| `supabase_vault` | Encrypted secrets stored in the database |
| `pg_trgm` | Fuzzy text search and similarity matching |
| `vector` | Embeddings and vector similarity search |
| `btree_gist`, `btree_gin` | Extra index types, such as exclusion constraints |
| `unaccent` | Accent-insensitive search |
| `fuzzystrmatch` | Phonetic and edit-distance string matching |
| `postgis` | Geographic and spatial data |
| `pgmq` | Message queues |

Every database also comes with `plpgsql`, `pg_graphql`, `pg_stat_statements`, `pgcrypto`, `uuid-ossp`, and `pgsodium` preinstalled.

To enable a supported extension, ask Lovable in the project chat or run the statement in the [SQL editor](#run-sql-queries):

```sql theme={null}
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

Lovable refuses a `CREATE EXTENSION` statement for any other extension before it runs. The refusal applies when you ask in the project chat, run SQL in the **SQL editor**, or send SQL through the [Lovable API](https://docs.lovable.dev/integrations/lovable-api.md) or the [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md).

The **SQL editor** shows an error that lists the supported extensions. The API returns a `403` response with the error type `unsupported_extension` and a message that lists the supported extensions.

When you ask for a feature that would need an unsupported extension, Lovable builds it with plain SQL instead. For example:

* Instead of `citext`, Lovable uses a `text` column with a unique index on `lower(column)`.
* Instead of `hstore`, Lovable uses a `jsonb` column.
* Instead of `http`, Lovable makes the request with `pg_net`.

Extensions already installed in your database keep working. Projects that use your own [Supabase](https://docs.lovable.dev/integrations/supabase.md) project instead of the built-in backend are not affected.

## FAQ

> **Can two projects share one database?**
>
> No. Every project on the built-in backend gets its own isolated database, and one project cannot read another project's database. If several apps need to share one database, connect them to the same external [Supabase](https://docs.lovable.dev/integrations/supabase.md#can-multiple-lovable-projects-share-one-supabase-project) project instead.
>
> Lovable warns you when you pick a Supabase project that another Lovable project already uses, because projects that share one Supabase project overwrite each other's secrets. See [Can multiple Lovable projects share one Supabase project?](https://docs.lovable.dev/integrations/supabase.md#can-multiple-lovable-projects-share-one-supabase-project).

> **Can I install a PostgreSQL extension that isn't on the supported list?**
>
> No. Your project's database supports a fixed set of PostgreSQL extensions. Lovable refuses `CREATE EXTENSION` for any other extension in the project chat, the **SQL editor**, and the API. When a feature would need an unsupported extension, Lovable builds it with plain SQL instead, and extensions already installed keep working. See [Supported PostgreSQL extensions](#supported-postgresql-extensions).

> **What are the drizzle files in my project's code?**
>
> Lovable uses them to record and apply changes to your database structure. The `drizzle/migrations/` folder contains one SQL file per change, and `drizzle.config.ts` and `drizzle/schema.ts` are configuration files Drizzle needs. Leave them as they are. See [How Lovable changes your database structure](#how-lovable-changes-your-database-structure).


## Related topics

- [Pause, resume, or remove your project's database](https://docs.lovable.dev/features/database-pause-remove.md)
- [Fix a slow database and choose the right capacity](https://docs.lovable.dev/features/database-performance.md)
- [Back up, restore, and export your project's database](https://docs.lovable.dev/features/database-backups.md)
- [Connect your app to Oracle Autonomous AI Database](https://docs.lovable.dev/integrations/oracle-autonomous.md)
- [Connect to Supabase](https://docs.lovable.dev/integrations/supabase.md)
