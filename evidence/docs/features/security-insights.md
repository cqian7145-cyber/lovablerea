# Security insights
<!-- source: https://docs.lovable.dev/features/security-insights.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Security insights

> Govern your Lovable workspace by identifying projects that need attention, with workspace-wide security, privacy, ownership, usage, and activity signals organized by review priority.

Security insights helps workspace owners and admins govern and prioritize project review across a growing workspace. It combines security findings, ownership, lifecycle, cost, publish status, and activity signals so you can quickly find projects that may need security or ownership attention. On Enterprise plans, it also includes sensitive data findings (PII).

Use it to answer governance questions such as: which projects are published to the internet, which have open security findings, which are abandoned, which have no owners, and which consume the most credits. On Enterprise plans, you can also see which projects contain personal data.

Security insights complements the other [Security center](https://docs.lovable.dev/features/security-center) tabs. **Code analysis**, **Supply chain security**, and **Secrets overview** focus on specific security areas, while Security insights adds portfolio and governance context across every project.

> [!NOTE]
>
> This page is about **Security insights**, the view in the Security center that shows which projects need security or ownership attention. Looking for where you approve publish requests and act on findings? See [Action center](https://docs.lovable.dev/features/action-center.md). Looking for how much your workspace builds and who uses what it builds? See [Insights](https://docs.lovable.dev/features/insights.md). Looking for one app's traffic in detail? See [Project analytics](https://docs.lovable.dev/features/analytics.md). All four are different features.

* **Available on:** Business and Enterprise plans. PII columns, PII filters, and PII scans are Enterprise-only.
* **Access:** Workspace admins and owners
* **Location:** [Security center](https://lovable.dev/settings/security-center) (**Workspace settings → Security → Security center → Security insights**)

Viewing Security insights, exporting data, and running PII or security scans from it do not consume credits.

## What you can do

* See a workspace-wide summary of total projects, externally published projects, and projects with high review priority.
* Search every project by project name, project ID, or owner.
* Filter the project table by review priority, publishing status, finding type, and built-in backend usage, including abandoned projects and projects with no owner. Enterprise workspaces can also filter to projects with open PII findings.
* Sort projects by review priority, activity, credits, scan status, and other table columns.
* Show or hide columns to tailor the table to your workflow.
* Click any project row to review the findings and signals that explain why the project is flagged.
* Click a project name to open the full project details page with description, open findings, project details, connectors, and built-in backend setup.
* Run a fresh security scan on a project. Enterprise workspaces can also run a fresh PII scan.
* Export the table to a CSV file for audits, reporting, or leadership reviews.

## How Security insights works

Security insights combines scan results and workspace signals, then turns them into **review priority** for each project.

### Where findings and signals come from

Security insights brings together scan results and workspace signals to help you prioritize project review across the workspace.

It uses:

* **Security findings** from Lovable’s [Quick scan](https://docs.lovable.dev/features/security#quick-scan), [Deep scan](https://docs.lovable.dev/features/security#deep-scan), and related [Security center](https://docs.lovable.dev/features/security-center) surfaces.
* **Sensitive data findings** (Enterprise only) from [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md), such as unresolved personally identifiable information (PII) in project data.
* **Project and workspace signals** such as publish status, ownership, activity, credits, collaborators, connectors, secrets, and built-in backend usage.

These inputs contribute to each project’s **review priority**, shown as **High**, **Medium**, **Low**, or **Not scanned**. Review priority helps the projects that need the most attention rise to the top.

| Source | What it contributes |
| :- | :- |
| [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md) (Enterprise only) | Finds personally identifiable information (PII) in supported project data, including project chat messages, file uploads, built-in database data, built-in storage, and connectors installed on the project. |
| [Quick scan](https://docs.lovable.dev/features/security#quick-scan) | Runs fast checks of database access rules, dependencies with known vulnerabilities, and MCP server exposure. |
| [Deep scan](https://docs.lovable.dev/features/security#deep-scan) | Reviews application code for access control, endpoint, input handling, secret, payment, sign-in, and data exposure issues, and includes the Quick scan checks. |
| Optional security connectors | Add coverage from connected tools, such as [Wiz](https://docs.lovable.dev/integrations/wiz.md) or [Aikido](https://docs.lovable.dev/integrations/aikido.md), when configured for the workspace. |
| Workspace and project metadata | Adds project state and usage signals, such as publish status, ownership, activity, credits, collaborators, connectors, secrets, and built-in backend configuration. |

Each finding links to the relevant project view for review and action.

### Review priority

Review priority indicates how urgently a project may need attention. It appears as **High**, **Medium**, **Low**, or **Not scanned**.

Security insights assigns review priority based on the active findings and signals on a project. Signals that increase review priority include public exposure, open security findings, unresolved personal data findings, abandoned published projects, and projects with no active owner. Signals such as connectors, secrets, external collaborators, shared access, and edge functions can also contribute because they may require periodic review.

A project with no scan data shows as **Not scanned**.

### Findings and signals

The findings and signals below contribute to review priority. Projects with stronger or overlapping findings and signals are more likely to appear with higher review priority.

| Finding | What it means |
| - | - |
| Public app with security errors | The project is publicly exposed and has critical-level security findings. |
| Public apps with PII and security findings (Enterprise only) | The project is published, contains personal data, and has warning-level or critical-level security findings. |
| Security findings | The project has open security findings. |
| Public apps with PII (Enterprise only) | The project is published and contains personal data. |
| Abandoned published projects | The project is published and has no recent activity. |
| Orphaned projects | The project owner is no longer an active workspace member. To give these projects a new owner, [change the owner of several projects at once](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) from the dashboard, or transfer them one at a time from each [project's settings](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership). |
| Open PII findings (Enterprise only) | The project has unresolved personal data findings. |
| Secrets | The project has secrets configured. Review whether they are still needed and correctly scoped. |
| Connectors | The project has external service connectors attached. Review how the app uses connected data. |
| External collaborators | The project has collaborators outside the workspace. |
| Website has external viewers | The project is internally published and people outside the workspace have been [invited to view it](https://docs.lovable.dev/features/publish.md#invite-people-outside-your-workspace). |
| Shared with collaborators | The project is shared with additional users. |
| Edge functions | The project has deployed edge functions. Run regular scans to keep backend code safe. |

When a more specific finding applies, less specific overlapping findings can be hidden to avoid double-counting. For example, if **Public apps with PII and security findings** applies, Security insights suppresses overlapping PII-only findings for that project.

## Dashboard overview

Security insights is organized from summary to detail: workspace-level metrics, the project table, expanded findings rows, and per-project detail views.

### Summary cards

The summary cards show the overall state of the workspace.

| Card | What it shows |
| - | - |
| Total projects | Total number of projects in the workspace |
| Externally published | Projects published to the public internet |
| High review priority | Projects with signals that need urgent review |

### Project table

Every project in the workspace appears in a searchable, filterable, and sortable table.

By default, each row shows the following columns:

* **Project**
* **Review priority**
* **Publish status**
* **Last edit**

### Columns

Use the column menu to show or hide columns. **Project** and **Review priority** are always visible.

Additional columns include:

* **Project ID** and **Created**
* **Owner**. Hover over the owner's name to see their email address.
* **Last deep scan**
* **Edits last 7 days** and **Visits last 7 days**, each with a tooltip showing when the activity data was last updated
* **Total credits** (all-time credits consumed by the project)
* **Security findings**
* **Total vulnerabilities**
* **PII findings** (Enterprise only)
* **Auth providers**
* **External access**
* **Connectors**, **Lovable Cloud**, and **Edge functions**
* **Secret names**
* **Scheduled deletion**, the date a project is set to be deleted, when one is scheduled
* **Protected since**, the date a project editor protected the project from abandonment cleanup (Enterprise only)

Column preferences are stored in your browser for the current workspace. They do not sync across browsers or devices.

### Search

Use the **Search by name, ID, or owner** field to find projects.

* **Project name or owner**: Enter part of a project name, or the owner's name or email address. Lovable ignores search terms shorter than 3 characters.
* **Project ID**: Paste the complete project ID to show only that project. Lovable accepts the ID in uppercase or lowercase, with or without hyphens. A partial ID does not find the project.

You find a project's ID in the **Project ID** column, under **Details** on the project details page, and in the project URL.

Filters, sorting, and the CSV export apply on top of the search results.

### Filters

The table can be filtered by review priority, publishing status, findings, and whether the project uses the built-in backend.

| Filter | Options |
| - | - |
| Review priority | High, Medium, Low |
| Publishing status | Externally published, Internally published, Not published |
| Findings | Security findings, Project secrets, Connectors, External collaborators, Website has external viewers, Shared with collaborators, Edge functions, Abandoned, No owner. Enterprise workspaces also see **Open PII findings**. |
| Lovable Cloud | Enabled, Not enabled |
| Abandoned status | Marked abandoned, Not marked, Protected |

**Abandoned** means the project has had no activity for the workspace's abandonment period: 60 days by default, or 30 days when **Mark as abandoned after** is set to 30 days in [Privacy & security](https://docs.lovable.dev/features/privacy-and-security-settings.md#abandoned-projects). Activity is defined in [What counts as activity](https://docs.lovable.dev/features/privacy-and-security-settings.md#what-counts-as-activity). **No owner** means the project's owner is no longer an active workspace member, so the project needs a new accountable owner. **Protected** lists projects a project editor excluded from abandonment marking and auto-delete. See [Protecting a project from cleanup](https://docs.lovable.dev/features/privacy-and-security-settings.md#protecting-a-project-from-cleanup).

You can combine filters. For example, selecting **High** review priority and **Externally published** shows only externally published projects with high review priority.

### Sorting

Click a column header to sort by that column.

Sort labels vary by column type:

* Name columns use **A-Z** and **Z-A**.
* Date columns use **Oldest first** and **Newest first**.
* Review priority uses **Highest first**.
* Count columns use **Fewest first** and **Most first**.

### Expanded findings row

Click a project row to expand it and see the findings and signals that explain why the project is flagged. Click **View** on a finding to open the relevant project view for investigation and action.

You can also click **Run deep scan** from the expanded row. Enterprise workspaces can also click **Run PII scan**.

### Project details

Click the project name to open the full project details page.

The project details page gives broader context about the project, including:

* **Project description**, with an **Open project** button that opens the project in the editor.
* **Findings**, including open findings and links to the relevant project view for more detail. Enterprise workspaces also see PII findings.
* **Details**, including published **URL**, **Status**, **Owner**, **Project ID**, **Last deep scan**, **Last edit**, **Edge functions**, **Collaborators**, and **External viewers**. Enterprise workspaces also see **Handles PII**.
* **Connectors** used by the project, such as Slack, Stripe, or Google Calendar, with links to connector settings.
* **Lovable Cloud** details, when the project uses the built-in backend, including **Status**, **Edge functions**, **Auth providers**, **Tables**, **Storage buckets**, and **Last synced**.

You can also click **Run deep scan** from the project details page. Enterprise workspaces can also click **Run PII scan**.

## Export to CSV

Use the export control in the **Security center** header to export the project table to CSV.

You can choose:

| Export option | What it includes |
| - | - |
| Export visible columns | Only the columns currently shown in the table |
| Export all columns | Every available column |

Both options respect the current search query and filters. They export all matching rows, not only the current page.

Exported files use a name like `security_insights_2026-06-23_15-30.csv`.

Exports are capped at 100,000 rows. If the matching results exceed the cap, Lovable shows an **Export truncated** message and the file contains the rows included within the export limit. Narrow your filters to export the remaining projects.

## Important notes

* Security insights reflects the latest workspace data Lovable has processed. Some values can lag behind recent changes.
* Review priority updates asynchronously after scans, connector changes, ownership changes, and other relevant project changes.
* Activity data, such as edits and visits, can lag by up to 24 hours.
* The **Edits last 7 days** and **Visits last 7 days** columns show when the underlying data was last updated.
* Security insights helps identify projects that need attention, but changes still happen in the project itself.


## Related topics

- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Insights](https://docs.lovable.dev/features/insights.md)
- [Get workspace security insights](https://docs.lovable.dev/api-reference/security-governance/get-workspace-security-insights.md)
- [Security overview](https://docs.lovable.dev/features/security.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
