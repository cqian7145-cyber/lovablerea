# Usage limits and alerts
<!-- source: https://docs.lovable.dev/features/usage-limits-and-alerts.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Usage limits and alerts

> Set credit usage limits and low-balance alerts for your workspace, projects, members, groups, and access tokens. Get notified or block usage when a threshold is reached.

Credits in a workspace are shared across every member and project, so a single project or member can use more than you planned. **Usage limits & alerts** gives workspace owners and admins control over that spend: set a credit threshold, choose what it applies to, and decide whether reaching it sends an alert, blocks further usage, or both.

Open it from [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits). It is available on all paid plans.

> [!NOTE]
>
> For the warnings Lovable sends on its own and what happens when your workspace runs out of credits, see [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md).

## Why use usage limits and alerts

Limits and alerts are guardrails for shared credits, so you do not have to watch the balance yourself. Use them to:

* Cap how many credits a member, project, or the whole workspace can use per day or per month
* Get an email or in-app notification when usage reaches a threshold, without blocking anyone
* Block building when a limit is reached, or pause the built-in backend, AI features, and metered connector requests in deployed apps
* Set a default limit for all projects or all members, with specific overrides where needed
* Limit usage for everyone in a [group](https://docs.lovable.dev/features/groups.md), such as a department or a project team
* Get warned when your workspace credit balance drops below an amount you choose, so you can top up before apps pause
* Cap the credits that requests authenticated with an [access token](https://docs.lovable.dev/features/api-keys.md) can spend
* Let members who reach a limit request an increase that you approve or deny

## Prerequisites

Before you set up limits, check that your workspace and role qualify:

* Creating limits and alerts needs a paid plan.
* Only workspace owners and admins can create, edit, or delete limits and alerts.
* Editors can open the page and see workspace limits, defaults, and the limits that apply to them and to their projects, but cannot change anything.

## How limits and alerts work

Every rule you create combines four choices: a threshold (the credit amount), a scope (what it watches), a credit type (which kind of usage counts), and an action (notify, block, or both).

### Two kinds of rules

Usage limits watch what you spend, and low-balance alerts watch what you have left:

| Rule | Triggers when | Available actions |
| - | - | - |
| Usage limit | Credits **spent** within the period reach the threshold | Email notification, in-app notification, block usage |
| Low-balance alert | Your workspace credit **balance drops below** the threshold | Email notification, in-app notification |

Usage limit thresholds are always credit amounts. Low-balance alert thresholds can be a credit amount or a percentage of the credits granted to your workspace. Low-balance alerts never block usage.

### Scopes

Each limit applies to one scope:

| Scope | What it covers | Credit types you can limit |
| - | - | - |
| **Workspace** | All credit usage in the workspace | All |
| **Projects** | All projects, or one specific project | All |
| **Users** | All members, or one specific member | Build only |
| **Groups** | Each member of a selected group, with a separate allowance per member (Business and Enterprise) | Build only |
| **Access tokens** | Requests authenticated with one specific [access token](https://docs.lovable.dev/features/api-keys.md) (Business and Enterprise) | All except Connectors |

For projects and users, you can create a **default** limit that applies to all of them, plus specific limits for individual projects or members. A default gives each project or member its own allowance rather than a shared pool: with a 100-credit project default, every project can spend up to 100 credits of its own. An enabled specific limit overrides only a matching default. The credit type and period must match, so a daily Build limit does not replace a monthly Build default. Defaults for other credit types or periods continue to apply.

Group limits give each current member a separate allowance rather than a shared group budget.

### Which limit applies to a member

A member can be covered by an individual limit, a group limit, and the default user limit at the same time. For each period, only one of the three applies to them, in this order:

1. **An individual member limit** replaces both the group limit and the default user limit for that member. Set one when a single person needs a different allowance from the rest of the workspace.
2. **A group limit** replaces the default user limit for every member of that group, whether the group limit is higher or lower than the default. A member of several groups gets the highest group limit that matches.
3. **The default user limit** applies to members with no individual limit and no group limit.

An individual limit replaces the others even when it only notifies. If you disable blocking on a member's individual limit, no group limit or default user limit for the same period blocks that member.

A group limit replaces the default user limit only when all of these are true:

* The group limit is enabled and blocks usage. A group limit that only notifies does not replace the default.
* The person is a member of the group.
* The period matches. A daily group limit does not replace a monthly default.

When you disable the group limit, delete the group, or remove the member from it, that member returns to the default user limit.

Limits on the **Workspace**, **Projects**, and **Access tokens** scopes apply in addition to the member's limit. The member is blocked by whichever limit they exceed first.

### Credit types

Limits can watch all credit usage or a specific kind of usage:

| Credit type | What it tracks |
| - | - |
| **General** | All credit usage for the selected scope |
|   **Build** | Build usage, as shown under **Build credits** in Usage details: building and editing your app, [chat](https://docs.lovable.dev/features/chats.md) usage, and image and video generation |
|   **Run** | Everything your deployed app uses: Cloud, AI, and connector usage together |
|     **Cloud** | Cloud usage: hosting your app and running its [built-in backend (Cloud)](https://docs.lovable.dev/features/cloud), including database, storage, edge functions, and realtime usage in deployed apps |
|     **AI** | AI gateway usage: [AI features](https://docs.lovable.dev/features/ai) your deployed app uses, such as calls your app makes to AI models |
|     **Connectors** | Connector usage: requests your deployed app makes through [metered connectors](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs) |

The indentation shows how the types nest, here and in the dialog: **Build** and **Run** are parts of **General**, and **Cloud**, **AI**, and **Connectors** are parts of **Run**. A limit on a broader type covers everything under it, so a **General** limit counts all usage and a **Run** limit counts Cloud, AI, and connector usage.

> [!NOTE]
>
> Limits scoped to users or groups use the **Build** credit type only. Run usage (hosting, the built-in backend, AI features, and connector requests in deployed apps) belongs to the project, not to the member who built it, so it can never count toward a user or group limit. To cap run usage, scope the limit to a project or the workspace.

### Periods

Each usage limit counts usage over one of two periods:

| Period | Behavior |
| - | - |
| **Monthly** | Counts usage per calendar month. Resets on the 1st of each month at 00:00 UTC, independent of your billing cycle. |
| **Daily** | Counts usage per day. Resets at 00:00 UTC. |

Low-balance alerts have no period: they always compare your current balance against the threshold.

## Create a usage limit

You create every usage limit from the same dialog:

**1. Open Usage limits & alerts**

Go to [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits).

**2. Start a new limit**

Pick the button that matches what you want to cap:

* **Create limit** in the **Workspace** section covers the whole workspace.
* **Create limit** on a tab in the **Usage limits by scope** section covers one project, member, group, or access token.
* **Create project default** on the **Projects** tab, or **Create user default** on the **Users** tab, covers every project or every member at once.

**3. Choose the scope**

If you started from the **Workspace** section or a specific tab, the scope is already selected. If the dialog shows a **Scope** selector, choose **Projects**, **Users**, **Groups**, or **Access tokens**, then pick the specific project, member, group, or token next to it. To cap the whole workspace, use **Create limit** in the **Workspace** section instead.

**4. Enter the limit amount**

Type the credit amount in the **Limit** field.

**5. Pick the credit type and period**

Choose the **Credit type** (**General**, **Build**, **Run**, **Cloud**, **AI**, or **Connectors**) and set the **Period** to **Monthly** or **Daily**. For user and group limits, the dialog offers no credit type choice: they always limit Build usage. For access-token limits, it offers every type except **Connectors**.

**6. Choose what happens at the threshold**

The **Behavior** section controls what reaching the limit does. New limits start with blocking and email alerts enabled:

* Keep blocking enabled to stop further usage at the threshold, or disable it for a limit that only notifies. The toggle is named for what it blocks, such as **Block building** for a Build limit or **Pause Cloud** for a Cloud limit.
* Adjust the **Alerts** channels (**Email** and **In-app**) to choose how you are notified.
* With blocking and alerts both enabled, Lovable alerts you when the limit takes effect.

**7. Save the limit**

If the limit pauses Cloud, AI features, or connector requests, Lovable asks you to confirm before saving. The confirmation explains what pauses, and where, when the limit is reached.

You can set several limits on the same scope as long as they watch different credit types or periods, for example a monthly Build limit and a daily Cloud limit on the same project. Creating a limit that matches an existing one's scope, credit type, and period does not add a second one: an **Overwrite existing limit** confirmation shows the current limit's amount and behavior, and confirming replaces the existing limit with your new settings. If the limit you overwrite blocks usage and your new one does not, blocking carries over. To stop a limit from blocking, edit it instead.

An enabled blocking limit starts blocking as soon as you save it if usage in the current period has already reached the amount you entered. Lovable warns you first, explains what is blocked or paused, and asks you to type **BLOCK** to confirm.

## Create a low-balance alert

Low-balance alerts warn you before credits run out. They are especially useful when auto top-up is disabled and your deployed apps would pause without credits.

**1. Open the Balance alerts tab**

Go to [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits). In the **Workspace** section, switch from **Usage limits** to **Balance alerts**. The tab shows your current workspace balance.

**2. Create the alert**

Select **Create alert**.

**3. Set the threshold**

Under **Alert when balance drops below**, pick the threshold type with the selector inside the amount field: **Credits** for a fixed amount, or **Percentage** for a share of the credits granted to your workspace. Then enter the amount. Percentages can be between 0.01 and 99.99.

**4. Choose notification channels**

Under **Notifications**, enable **Email**, **In-app**, or both, then save. Both channels notify workspace owners and admins.

When your balance falls below the threshold, Lovable notifies you so you can [add credits](https://docs.lovable.dev/introduction/credit-top-ups.md#buy-a-one-time-top-up) in time.

Each alert appears in the list with its threshold, its notification channels and recipients, an enable switch, and a menu for editing or deleting it. Use the switch to disable an alert without deleting it.

You can set several balance alerts at different thresholds, for example an early warning at 50% and an urgent one at 25 credits. Creating an alert at a threshold that already has one overwrites it: Lovable asks you to confirm, then replaces the existing notification settings with your new ones.

Enterprise workspaces start with two email balance alerts, at 25% and 10% of granted credits. You can edit, disable, or delete them like alerts you create yourself.

## What happens when a limit triggers

### Notifications

Notifications go out on the channels you selected for the limit. Both channels notify workspace owners and admins, and the person closest to the limit is also notified: the affected member for user and group limits, the project creator for project limits, and the token owner for access-token limits. In-app notifications appear in the notifications panel with a link back to **Usage limits & alerts**.

Blocking limits enter an **Approaching** state at 80% of the threshold. The **Requires attention** card at the top of the page lists them under **Approaching limits**, and usage is not blocked yet. If the limit also notifies, Lovable sends an early warning on the selected channels.

Lovable sends each notification once: the warning when a blocking limit reaches **Approaching**, and the main notification when a limit triggers. Lovable does not notify you again while the limit stays in the same state.

### Blocking

When a blocking limit is reached, the affected usage stops. For workspace and project limits, the blocking switch in the dialog is labeled for the credit type you picked:

* A **Build** limit (**Block building**) stops the people it covers from asking Lovable to build or edit apps.
* A **Cloud** limit (**Pause Cloud**) pauses the built-in backend, such as database, storage, and backend services, in the projects the limit covers.
* An **AI** limit (**Pause AI**) pauses AI features inside the apps of the projects the limit covers.
* A **Connectors** limit (**Pause connectors**) pauses metered connector requests from the apps of the projects the limit covers.
* A **Run** limit (**Pause Cloud and AI features and connector requests**) pauses Cloud and AI features and metered connector requests in the projects the limit covers.
* A **General** limit (**Block all usage**) blocks all credit usage for the scope, including building and running apps.

For access-token limits, the switch reads **Block Cloud usage**, **Block AI usage**, or **Block Run usage** instead. It blocks requests made with that token without pausing any project.

Only **Block building** and **Block all usage** stop people from building in Lovable. The other blocking limits pause features in deployed apps or block a token's requests, and everyone can keep building.

Default limits are enforced per project and per member. When one project reaches a project default, only that project is blocked or paused, and the other projects the same default covers keep working. Workspace limits are the broadest: reaching one affects every project in the workspace.

People who reach a limit see a message that names the limit and explains what is blocked. Workspace owners and admins see an option to manage the limit, and Lovable asks everyone else to contact an owner or admin.

The block stays in place until the period resets, the limit is raised, blocking is disabled, or the limit is deleted. Adding credits or upgrading your plan does not lift a usage block: the limit counts credits already spent in the period, and that number does not change when you add credits.

> [!WARNING]
>
> Workspace and project limits that block Cloud usage (**Pause Cloud**, **Pause Cloud and AI features and connector requests**, or **Block all usage**) pause the built-in backend of every project the limit covers, including published apps. The app's page still loads, but its database, login, storage, and backend features stop working for the app's users, and the project cannot be woken up while the limit is triggered. To restore it, raise the limit, disable its blocking behavior, delete it, or wait for the period to reset, then wake the project up.

> [!WARNING]
>
> Pausing the built-in backend (Cloud) does not delete anything. Stored files stay in place and continue to use credits while the project is paused. To stop storage usage entirely, [remove the built-in backend (Cloud)](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need) from the project. **Remove database** and **Remove storage** both remove the built-in backend (Cloud): they permanently delete the database, your app's user accounts, and the files in storage, and cannot be undone. Export your database and download any storage files you need before continuing.

## Request a limit increase

Members who reach a blocking limit can ask for a higher limit without leaving their work. When the limit supports requests, the limit-reached message includes **Request an increase**: the member enters the **New limit (credits)** and an optional reason, then selects **Send request**. The message confirms with **Request sent**. If they try again while the request awaits review, it shows **Request already pending**.

Workspace owners and admins receive a **Limit increase requested** notification. They review requests on the **Requests** tab in **Usage limits & alerts**, which shows the number of pending requests. Each request lists the requester's name and email address, the current and requested amounts, when it was sent, and the reason. Select **Deny** to reject a request, or **Approve** to raise the limit. Approving opens the **Approve usage limit increase** dialog, which asks **How long should the new limit apply?**:

* **Indefinitely** keeps the new amount until an admin changes or removes it.
* **Until end of usage period** raises the limit temporarily. It applies through the date shown (UTC), then returns to the configured limit. The dialog preselects this option, and the approve button shows the exact date.

A limit with a temporary increase shows a **Temporary until** badge on its row. The badge shows the date the limit returns to its configured value, and hovering over it shows the raised amount. Use the filters on the tab to review past requests by scope and status (**Pending**, **Approved**, **Denied**, or **Cancelled**).

Approving a request against a default limit does not raise the default for everyone: it creates an override for the requesting member or project only. Group and access-token limits do not support increase requests.

## Manage existing limits

The page has two sections. In **Workspace**, at the top, you find the **Usage limits**, **Balance alerts**, and **Requests** tabs. In **Usage limits by scope**, below it, you find tabs for **All**, **Projects**, **Users**, **Groups**, and **Access tokens**. The **Requests** and **Access tokens** tabs appear only to owners and admins, and the **Groups** and **Access tokens** tabs need a Business or Enterprise plan.

When a limit is triggered or approaching, a **Requires attention** card at the top of the page lists what needs review: **Usage limits** with a **Usage blocked** or **Threshold reached** badge, **Balance alerts** with a **Threshold reached** badge, and **Approaching limits**. Select a row's **Review** action to open the matching tab with its status filter applied.

Open the menu at the end of a limit's row to:

* **Edit** the limit. You can change the amount in the **Limit** field and the **Behavior** settings. The scope, credit type, and period are fixed after creation, so the dialog shows them locked. To change those, create a new limit.
* **View usage details** on limits for a specific project or member with usage in the current period. It opens [Usage details](https://docs.lovable.dev/introduction/credits-and-usage.md#tracking-credit-usage) filtered to that project or member, so you can see the usage behind the limit.
* Use the **Enabled** switch to disable the limit without deleting it. Its status shows as **Disabled**.
* **Delete** it.

A specific project or member that is covered by a default limit shows that limit as an inherited row. Editing an inherited row does not change the default: saving your changes creates an override for that project or member. To disable or delete an inherited limit, manage the default itself.

To find a specific limit, use the search box on the **Usage limits by scope** tabs. Search matches who or what a limit applies to: a member's name or email, a project's name, a group's name or one of its members, or an access token's name.

To narrow the list by a limit's own settings instead, open the **Filters** menu. For usage limits, it offers:

* **Status**: **Approaching** (usage reached the warning level), **Triggered** (usage reached the threshold), or **Disabled**. The tabs in the **Usage limits by scope** section also offer **Active** (enabled, with usage still below the warning level).
* **Period**: **Monthly** or **Daily**
* **Credit type**: **General**, **Build**, **Run**, **Cloud**, **AI**, or **Connectors**

The **Balance alerts** tab filters by status only, and its triggered status is called **Threshold reached**.

Specific limits show their current usage against the threshold, and default rows show the threshold only. A triggered limit that blocks usage shows a **Blocking** badge in place of **Triggered**.

> [!WARNING]
>
> Deleting a limit is permanent and cannot be undone. Any block it enforced is lifted.

## Limitations

Keep these constraints in mind when planning your limits:

* A workspace can have up to 500 limits.
* Limits apply within one workspace. To control spend across several workspaces, create limits in each one.
* Usage is recorded before limits are evaluated, so usage can slightly exceed a hard limit before the block takes effect.
* Access-token limits apply per token. The dialog offers no default that covers all access tokens at once.

## FAQ

> **How is this different from per-member credit limits in the People tab?**
>
> The [People tab](https://docs.lovable.dev/features/people.md#set-a-per-member-credit-limit) offers a quick way to set a monthly credit limit on a specific member. **Usage limits & alerts** covers much more: projects, groups, and the whole workspace, plus daily periods, specific credit types, and the choice between alerting and blocking. A per-member limit is the same limit in both places: setting it in the People tab creates or updates the member's monthly Build limit here, and changes here show in the People tab as long as the limit blocks usage. An alert-only member limit appears only in Usage limits & alerts.

> **Can I limit how much Cloud or AI usage a member generates?**
>
> No. Run usage (hosting, the built-in backend, AI features, and connector requests in deployed apps) belongs to the project, not to individual members, so user and group limits only ever count build credits. To control run spend, create a **Run**, **Cloud**, **AI**, or **Connectors** limit scoped to a project or to the whole workspace.

> **Does a limit stop usage exactly at the threshold?**
>
> Almost. Lovable records usage first and then evaluates limits, so usage can slightly exceed the threshold before the block takes effect. Treat limits as a strong guardrail rather than an exact cutoff.

> **How do I unblock someone who reached a limit?**
>
> Open [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits), find the triggered limit, and either raise its threshold, disable its blocking behavior, or delete it. If the person [requested an increase](#request-a-limit-increase), you can approve it from the **Requests** tab instead, temporarily or indefinitely. Blocks also lift automatically when the daily or monthly period resets. Adding credits or upgrading your plan does not unblock a usage limit, because the limit counts credits already spent in the period.

> **Who receives limit notifications?**
>
> Notifications go to workspace owners and admins on the channels enabled for the limit. The affected member (for user and group limits), project creator (for project limits), or token owner (for access-token limits) is notified as well. In-app notifications appear in the notifications panel.

> **How is this different from the credit limit on the Access tokens page?**
>
> It is the same limit. The **Credit limit** you set when you create or edit a key on the [Access tokens page](https://docs.lovable.dev/features/api-keys.md) is a monthly Build limit that blocks usage, and it appears on the **Access tokens** tab in Usage limits & alerts. Limits you create here can also watch other credit types or a daily period, and notify you without blocking.

> **Do limits affect my credit balance or billing?**
>
> No. Limits only control when usage is allowed and when you are notified. They do not change your plan, your credit grants, or what usage costs.


## Related topics

- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md)
- [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
