# Insights
<!-- source: https://docs.lovable.dev/features/insights.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Insights

> See how your workspace adopts Lovable, with visits, active apps, active builders, connections added, top apps ranked by visits, and builders ranked by edits.

Insights shows workspace admins and owners how their workspace adopts Lovable: which apps people build, which apps people use, and who builds them.

Use Insights to understand adoption across your workspace, find the apps that people use most, and see how building activity changes over time. It answers questions such as which apps your teams rely on, how many people build in Lovable each month, and whether that number is growing.

> [!NOTE]
>
> This page is about **Insights**, the adoption dashboard for your workspace. Looking for which projects need security or ownership attention? See [Security insights](https://docs.lovable.dev/features/security-insights.md). Looking for one app's traffic in detail? See [Project analytics](https://docs.lovable.dev/features/analytics.md). All three are different features.

* **Available on:** Business and Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** [**Workspace settings → Workspace → Insights**](https://lovable.dev/settings/workspace-insights)

Insights does not consume credits, whether you view it or export its data.

## What you can do

* See how many visits, active apps, and active builders your workspace had over the last 30 days, and how many connections your teams added to apps through connectors.
* Compare each of those numbers with the 30 days before to see whether adoption grows or slows.
* Chart active apps and visits by day, week, or month.
* Review your top apps by visits, including what each app does, who it is for, and who contributed to it. Open any app's own analytics for more detail.
* Open the full app list to search, filter by category, and sort every app in the workspace by name, category, owner, visits, or edits.
* See every workspace member ranked by edits, with their role, apps owned, visits to their apps, credit use, and a week-by-week view of their building activity.
* For workspaces that get member departments from [SCIM](https://docs.lovable.dev/features/business/scim.md) or from [SSO](https://docs.lovable.dev/features/business/sso.md), see how many members of each department build on Lovable.
* Export the full app list or the full builder list to a CSV file for reporting and leadership reviews.

## How Insights differs from Security insights and Project analytics

Lovable has three features with similar names. They answer different questions.

| Feature | Question it answers | Scope |
| - | - | - |
| **Insights** (this page) | How much does my workspace build, and who uses what it builds? | Every app in the workspace |
| [**Security insights**](https://docs.lovable.dev/features/security-insights.md) | Which projects need security or ownership attention? | Every app in the workspace |
| [**Project analytics**](https://docs.lovable.dev/features/analytics.md) | Where do one app's visitors come from, and what do they do? | A single app |

Insights and [Project analytics](https://docs.lovable.dev/features/analytics.md) count visits from the same source. Insights covers the last 30 days for every app at once. Project analytics covers one app, lets you choose the period, and breaks traffic down by source, page, device, and country.

## Terms used on this page

* An **app** is any project in your workspace, published or not. Every count of apps on this page includes unpublished apps unless it says otherwise.
* A **builder** is any member of the workspace, whatever their role, including external collaborators. The builders list shows every member, whether or not they have edited anything. **Active builders** counts only the members who built something in the last 30 days.
* A **visit** is one person opening a published app. The same person returning later counts as another visit, so visits do not count unique people. Only published apps can have visits.
* A **connection** is one account you have linked to an external service, for example one Stripe account. A **connector** is the type of service, such as Stripe. One connection can be used by several apps. Insights counts [app + chat connections](https://docs.lovable.dev/integrations/app-connectors.md), including connections to [custom connectors](https://docs.lovable.dev/integrations/create-connector.md) your workspace created. It does not count [chat connectors](https://docs.lovable.dev/integrations/custom-mcp.md) (MCP servers) or [app user connections](https://docs.lovable.dev/integrations/app-user-connectors.md).

## Overview

The overview shows four metric cards, two charts, and the date the numbers are current through. Workspaces whose members have a department also see an [**Adoption by department**](#adoption-by-department) card.

### Metrics

The cards are, in order, **App visits**, **Active apps**, **Active builders**, and **Connections added**. Each number covers the last 30 days. Next to it, Lovable shows the percentage change from the 30 days before, so you can see whether the number is rising or falling. Hover over the percentage to see the two numbers it compares, shown as **Previous 30d** and **Current 30d**.

| Metric | What it counts |
| - | - |
| **App visits (30d)** | Visits to published apps in the last 30 days. One person visiting on two days counts as two visits. This is not a count of unique people. |
| **Active apps (30d)** | Apps with any activity in the last 30 days, published or not: a builder edited the app, someone visited its published site, or the app did work behind the scenes, for example through its MCP server. One kind of activity is enough. |
| **Active builders (30d)** | Workspace members who built in this workspace in the last 30 days, by editing an app or prompting Lovable. |
| **Connections added (30d)** | Connections added to apps through Lovable connectors in the last 30 days. One connection used by two apps counts twice. This measures how often your teams connect apps through connectors, not how many connectors or connections you have. |

An unpublished app still counts as an active app when someone edits it, but it shows no visits.

### Charts

Two charts follow the cards: **App visits** and **Active apps**. Each chart has a **Daily**, **Weekly**, and **Monthly** view:

* **Daily** shows one value per day for the last 30 days.
* **Weekly** shows one value per week for the last 12 weeks. Weeks start on Monday.
* **Monthly** shows one value per month for the last 12 months.

The most recent week and month include only the days through the date shown at the top of the page, so they are usually partial.

The weekly and monthly views cover more than 30 days, so they show longer trends than the cards above them.

### How current the data is

Lovable starts aggregating these numbers once a day, around 09:30 UTC, then publishes them to Insights after processing finishes. Each update includes all activity through the previous day, so today's activity appears tomorrow.

The date at the top of the page, shown as **Data through \[date] · updated daily**, is the last day included, not the first. Each chart runs 30 days, 12 weeks, or 12 months back from it.

A workspace with no data yet shows **Workspace insights are still being prepared.** Data typically appears within a day of the workspace's first activity on a Business or Enterprise plan.

## Top apps

**Top apps** ranks your apps by visits over the last 30 days. Each app shows:

* The app name. Select the app to expand its details.
* **What it does**, and **Who it is for** when available. Lovable generates these from the app's build history, or shows the description the builder wrote when it has not generated one yet. Treat them as a summary, not as an authoritative statement of what the app does.
* **Edits**, the app's total edits since January 1, 2025. Unlike the other numbers on the card, this is not limited to the last 30 days.
* **Contributors**, the current workspace members who edited the app, ordered by edit count, with each person's edits shown. Someone who has left the workspace no longer appears here, although their edits stay in the app's total.
* **App visits**, the visits in the last 30 days, with a trend line.
* **Connectors**, the connectors the app uses, if any.

Each app has two actions. **Open app** opens the published site. It is available only after the app is published. **App analytics** opens that app's own [Project analytics](https://docs.lovable.dev/features/analytics.md) in a new tab.

When an app has more contributors or connectors than the card shows, select **+\[n] more** under that list to open the full list.

Select **See all apps** to open the full list.

## All apps

The **All apps** page lists every app in the workspace with these columns:

* **App**: the app name.
* **Category**: the category Lovable assigned to the app.
* **Owner**: the member who owns the app.
* **App visits (30d)**: visits in the last 30 days.
* **Edits**: the app's total edits since January 1, 2025, the same figure as on the Top apps card.

You can:

* Search by app name to filter the list.
* Filter by category, or select **All categories** to clear the filter.
* Sort by name, category, owner, visits, or edits. The list sorts by visits by default.
* Show 25, 50, or 100 rows per page. The page shows 25 rows by default.

Selecting an app opens its details view. It shows the same description, contributors, connectors, and visits trend as the **Top apps** card, plus the **Open app** and **App analytics** actions. Long contributor and connector lists scroll within the details view. When you do not have access to a project, **App analytics** is unavailable for it and shows **You don't have access to this project.**

## Builders

**Top builders** on the overview shows the members with the most edits. **See all builders** opens **All builders**, every member of the workspace ranked by edits, with these columns:

* **Builder**: the member's name.
* **Role**: the member's job function when Lovable knows it, otherwise their Lovable workspace role. The whole table uses the same kind of role, so when it shows job functions, a member without one shows a dash.
* **Edits (30d)**: edits in the last 30 days.
* **Credits (30d)**: credits the member used in the last 30 days. This column appears only when credit data is available for the workspace.
* **Edit activity (12w)**: a week-by-week view of the member's building activity over the last 12 weeks.
* **App visits (30d)**: visits to the apps that member owns, not every app they contributed to. A member who edits an app someone else owns adds to their own **Edits** but not to their **App visits**.
* **Apps owned**: how many apps the member owns, published or not.

You can:

* Search by name to filter the list.
* Filter by role, or select **All roles** to clear the filter.
* Sort by name, role, edits, credits, visits, or apps owned. The list sorts by edits by default.

## Adoption by department

Workspaces where at least one member has a department, from [SCIM](https://docs.lovable.dev/features/business/scim.md) or from the attributes your [SSO](https://docs.lovable.dev/features/business/sso.md) provider sends, also see an **Adoption by department** card. For each department, it shows how many members belong to it and how many of them built on Lovable in the last 30 days, so you can see which parts of your company use Lovable and which do not yet.

A member counts as building when they edited an app in the last 30 days. Lovable lists departments from largest to smallest, and members whose identity provider record has no department appear in an **Unassigned** group at the end. The card shows the three largest departments. When your workspace has more, select **See all \[n] departments** to open the full list, which also says how many members have no department.

Department names and membership come from your identity provider, through SCIM or through the attributes your SSO provider sends when a member signs in. The card shows exactly what your identity provider sends. To correct a department, update it in your identity provider.

Your SSO provider sends these attributes only when an admin maps them in the SAML or OIDC app. See the [IdP configuration reference](https://docs.lovable.dev/features/business/sso.md#idp-configuration-reference) for the attribute names Lovable reads.

Lovable reads the attributes each time a member signs in, so a change in your identity provider appears after that member's next sign-in. For a member that SCIM manages, SCIM sets these fields and Lovable ignores what SSO sends.

## Export to CSV

Both the **All apps** and **All builders** pages export to CSV. The export always covers every app or every member in the workspace. Your search, filters, and sort order do not apply to it: apps are exported ranked by visits and builders ranked by edits.

Lovable names the files `workspace-insights-apps_YYYY-MM-DD_HH-mm.csv` and `workspace-insights-builders_YYYY-MM-DD_HH-mm.csv`, using the date and time of the export, for example `workspace-insights-apps_2026-09-03_07-54.csv`.

Use the CSV export to share Insights data outside Lovable.

## Important notes

* Insights has no destructive actions. Nothing you do on the page deletes an app, changes a member, or spends credits.
* The numbers are updated once a day and include activity through the previous day. See [How current the data is](#how-current-the-data-is) in the overview.
* An app that someone moves to another workspace disappears from this workspace's app and builder lists immediately. The overview cards and charts still include its history until the next daily update.

## Limitations

* Insights breaks adoption down by department only when your identity provider sends one, through SCIM or SSO. It does not break adoption down by team or business unit.
* Insights covers one workspace. When your company has several workspaces, review each one separately.

## FAQ

> **What is the difference between Insights and Security insights?**
>
> Insights answers how much your workspace builds and how much people use what it builds. [Security insights](https://docs.lovable.dev/features/security-insights.md) answers which projects need security or ownership attention. Both cover every app in the workspace, and both are available to workspace admins and owners on Business and Enterprise plans.

> **Why does an app's visit count differ from what I see in Project analytics?**
>
> Project analytics is live. Insights is current through the date shown at the top of its page, so the two can differ for the most recent days. Project analytics also defaults to a shorter period than 30 days. The numbers should closely match when you compare the same 30 days on both, ending on the date Insights shows.

> **Can workspace members see Insights?**
>
> No. Only workspace admins and owners can open Insights. A member who opens the page sees the message **Only owners and admins can view workspace insights**. To give someone access, make them a workspace admin.

> **Does viewing Insights or exporting its data use credits?**
>
> No. Reading Insights and exporting the app or builder list to CSV do not consume credits.


## Related topics

- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [Get workspace security insights](https://docs.lovable.dev/api-reference/security-governance/get-workspace-security-insights.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md)
