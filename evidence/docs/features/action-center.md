# Action center
<!-- source: https://docs.lovable.dev/features/action-center.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Action center

> Approve or deny publish requests and review findings across your workspace in the Lovable Action center: assign owners, unpublish inactive apps, check spend and security.

The **Action center** gathers everything in your workspace that needs a decision from an admin or owner:

* publish requests waiting for approval,
* projects whose owner left the workspace,
* projects whose credit usage rose sharply,
* public apps with critical security findings, and
* public apps nobody has edited for months.

Lovable ranks the items by priority, so you work through them in one place instead of across settings pages. Publish requests come from [workspace policies](https://docs.lovable.dev/features/workspace-policies.md), and approving one publishes the app.

Findings are the problems Lovable flags on projects in its daily check of the workspace. The actions on them transfer ownership, unpublish apps, or ignore security findings.

> [!NOTE]
>
> This page is about the **Action center**, where you approve or deny requests and act on findings. Looking for every project and its risk? See [Security insights](https://docs.lovable.dev/features/security-insights.md). Looking for how much your workspace builds and who uses it? See [Insights](https://docs.lovable.dev/features/insights.md). The three are different features.

* **Available on:** Business and Enterprise plans. **Approval requests** appear on Enterprise, where [workspace policies](https://docs.lovable.dev/features/workspace-policies.md) are available, and so do **Inactive projects** findings.
* **Access:** Workspace admins and owners
* **Location:** [Action center](https://lovable.dev/dashboard/action-center) in the dashboard sidebar, under **Connectors**, and from notification links. The mobile app has no entry.

## What the Action center shows

The **Action center** entry in the sidebar shows a badge, so you can see a waiting request from any dashboard page. A number means that many approval requests wait for a decision. An amber dot means at least one finding of **Medium** or **High** priority is open.

The page has two sections, each with the number of open items:

* [Approval requests](#approve-or-deny-a-publish-request), where you approve or deny publishing. From there you can also open [Publishing policies](https://lovable.dev/settings/privacy-security#publishing-policies) to manage the policies.
* [Needs attention](#review-findings-that-need-attention), where you act on findings.

To work through a section's items in one dialog, one after another, select **Review all**.

## Approve or deny a publish request

Lovable creates a request when a workspace policy requires approval before someone can publish. Every admin and owner receives a notification in Lovable and by email.

The table has four columns:

* **Request**: who asked and for what, for example "Alex Chen wants to publish Sales dashboard", with the requester's note.
* **Blocking policy**: the policy that requires approval for the request, shown as **Connectors**, **External collaborator**, **PII** (personally identifiable information), or **External publishing**.
* **Expires in**: how long until the request expires. Pending requests are sorted by expiry, soonest first, and a count shows how many expire today. For requests that were approved or denied, this column is **Decided** and shows the status and when it was approved or denied.
* **Actions**: **Approve** and **Deny**. **Approve** approves the request from the row, without opening it. **Deny** opens the dialog where you give a reason.

Select a row to see the request before you approve or deny it. The dialog shows a screenshot of the app, the project's description, its last edit, and its publish state. For the connectors policy, the dialog also lists the connectors the app uses.

**Open project** opens it in a new tab. The dialog also shows how publishing changes who can see the app, for example from your workspace to the public.

Approve or deny the request:

* **Approve and publish**: Lovable publishes the app. The approval then covers the requester's later updates to the app until something the policy checks changes, or for the time set on the **Restrict publishing externally** policy. See [How approvals work](https://docs.lovable.dev/features/workspace-policies.md#how-approvals-work).
* **Deny**: choose a suggested reason, such as "Not ready to go public" or "Connectors need extra review", or write your own, then select **Deny request**. The requester sees the reason, so write one they can act on.

You cannot approve or deny a request you made. Another admin or owner does.

Lovable notifies the requester of your decision. The requester follows the request in the project's publish dialog, described in [Request approval to publish](https://docs.lovable.dev/features/publish.md#request-approval-to-publish).

Filter the table by requester, by policy, and by status:

* **Pending**: waiting for a decision.
* **Approved** and **Denied**: an admin or owner approved or denied the request.
* **Expired**: nobody approved or denied the request in 30 days. A request that closed because the project changed while it waited shows here as **Expired · project changed**.
* **Cancelled**: the requester withdrew the request, or sent a new request after updating the app.

## Review findings that need attention

**Needs attention** lists findings from the workspace's projects that need a decision. Each row shows a **Review priority** of **High** or **Medium** and an **Identified** date. Lovable groups findings of the same kind and priority into one row, for example "4 projects used 620 credits in the last 7 days".

Filter by **Missing owners**, **Security findings**, **Credit usage**, or **Inactive projects**, or search by project or owner.

Reviewing a finding marks it as reviewed. It changes the project only when you choose an action that does so, such as transferring ownership, unpublishing, or ignoring security findings. For inactive projects, marking the finding as reviewed also clears the abandoned label.

For a project that is not shared with you, the finding shows that you have no access to it. You can mark the finding as reviewed, but you cannot unpublish or change the app. Ask the owner to share it.

### Missing owners

Lovable flags every project whose owner is no longer an active member of the workspace. The row reads, for example, "3 apps lost their owner", at **Medium** priority. Approval requests for these projects wait until the project has a new owner.

Select **Assign owners**. For each project, choose a new owner under **New owner**. You can choose any active admin, owner, or editor. A project that only its owner could open can be transferred only to an admin or owner.

**Assign owner** transfers the project and marks the finding as reviewed. The button is available only for projects you have permission to transfer. **Mark all as reviewed** clears the row without transferring anything, and the projects stay without an owner.

### Security findings

Lovable flags externally published (public) apps that [Security insights](https://docs.lovable.dev/features/security-insights.md) marks as critical. They appear here with **High** review priority. Apps below critical stay in **Security insights** and do not appear here.

A row for a single app reads, for example, "Sales dashboard has open security findings", with the number of critical findings and warnings. A row for several apps reads, for example, "4 projects have open security findings". Supply chain findings, about packages with known security problems, are not counted here.

Select **Review** on the row. From there you can open the project's [Security view](https://docs.lovable.dev/features/security-view.md) to fix the findings, or ignore every open finding in the project at once, with a reason you choose.

The row clears when the app is no longer critical, usually after you fix or ignore the findings. A later scan that finds critical issues flags the app again.

> [!WARNING]
>
> **Ignore findings** is the same action as ignoring a finding in the project's **Security view**, applied to every open finding at once. The findings move to **Ignored findings** at the bottom of the project's **Security view**, stop counting toward its review priority, and critical findings stop blocking publishing.
>
> An ignored finding is not fixed. Anyone with access to the project can restore the findings with **Unignore finding** in the **Security view**.

### Credit usage

Lovable flags a project whose run credits rose sharply. Run credits are the [Cloud, AI gateway, and connector usage](https://docs.lovable.dev/introduction/credits-and-usage.md) an app consumes while it runs, not the build credits you spend in the editor.

Lovable flags a project when its daily usage over the last 7 days is at least 3 times its daily usage over the 28 days before. The 7 days must also add up to at least 50 credits.

A project with no run usage in those 28 days is not flagged, however large the increase. Usage your plan's included credits cover is counted too, so the number can be higher than the one in the project's [usage details](https://docs.lovable.dev/features/project-usage.md).

A 7-day total of 300 credits or more is **High** priority. Anything less is **Medium**.

Select **Review** on the row to see each flagged project with the credits it used against its usual amount. Select a project to see the last 7 days, the usual amount for 7 days, where the credits went, a chart of the last 28 days, and details about the project.

Mark the finding as reviewed when the usage is expected, for example after a launch. The finding stays reviewed while the usage stays high, as described in [How findings refresh](#how-findings-refresh).

### Inactive projects

On Enterprise workspaces, Lovable flags externally published (public) apps that Lovable marked [abandoned](https://docs.lovable.dev/features/privacy-and-security-settings.md#abandoned-projects): nobody edited them for longer than the workspace's abandonment period, 60 days by default. Anyone on the internet can open these apps, so Lovable asks you to decide whether they should stay live.

The row reads, for example, "5 externally published projects are abandoned (no edits in over 60 days)", at **Medium** priority. Select **Review** on the row to open a list of the apps. Each one shows its visits in the last 30 days and its last edit, so you can tell an app people still use from one nobody opens.

Select the projects, then choose either:

* **Keep published**: Lovable clears the abandoned label and stops flagging the apps. Lovable flags them again only after the abandonment period passes again with no activity.
* **Unpublish**: Lovable unpublishes the selected apps. An app that is not shared with you can only be marked as reviewed.

Each button shows the number of projects you selected. With nothing selected, you can mark all of them as reviewed instead.

> [!WARNING]
>
> **Unpublish** takes the published sites offline and their addresses stop working. Visitors with the old link cannot open the app until someone republishes it.

## How findings refresh

Lovable checks every Business and Enterprise workspace once a day, at 10:00 UTC. A new finding appears within a day of the problem starting. Inactive apps take up to 2 days, because Lovable applies the abandoned label after the daily check.

A finding leaves the list as soon as you review it, and closes on its own when the problem ends. A fix you make closes the finding on the next daily check.

A reviewed finding does not return while the same problem continues. When the problem ends and later starts again, Lovable opens a new finding that needs a new review.

If some findings fail to load, the page says so. The findings that loaded are correct. Refresh the page to load the rest.

On Enterprise workspaces, Lovable records reviews, ownership transfers, and unpublished apps in the [audit logs](https://docs.lovable.dev/features/audit-logs.md).


## Related topics

- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [Workspace policies](https://docs.lovable.dev/features/workspace-policies.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
