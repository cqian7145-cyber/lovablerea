# Workspace policies
<!-- source: https://docs.lovable.dev/features/workspace-policies.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace policies

> Require approval or block publishing in your Enterprise workspace. Set policies for public apps, connectors, external collaborators, and sensitive data findings.

**Workspace policies** control when an app in your workspace can be published. A policy either blocks publishing for the apps it applies to, or requires an admin or owner to approve publishing first. When no policy applies, Lovable publishes the app without a review.

These are the policies you can enable:

* [Restrict publishing with unresolved sensitive data findings](#restrict-publishing-with-unresolved-sensitive-data-findings): block or review publishing while a project has unresolved findings of personal data.
* [Restrict publishing by external collaborators](#restrict-publishing-by-external-collaborators): block or review publishing by people invited from outside your workspace.
* [Restrict publishing externally](#restrict-publishing-externally): block or review publishing that makes an app public.
* [Require approval to publish apps that use connectors](#require-approval-to-publish-apps-that-use-connectors): review apps that connect to other services before they go live.

You cannot write your own conditions, choose different approvers, or send requests to specific people.

**Workspace policies** are available on the Enterprise plan. Admins and owners manage them in the **Publishing policies** section of [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security#publishing-policies).

> [!NOTE]
>
> A policy only adds a restriction. It never lets anyone publish who could not publish before, and it does not change anyone's project or workspace role. The other settings in the **Publishing** section of **Privacy & security**, such as **Block publishing with critical issues**, keep working alongside the policies.

## Enable a policy

Each policy has its own row in **Publishing policies**, with a switch and a **Configure** button.

**1. Open Publishing policies**

Open [Publishing policies](https://lovable.dev/settings/privacy-security#publishing-policies) in **Privacy & security**.

**2. Configure the policy**

Select **Configure** to open the policy's dialog. Enabling the switch on the row opens the same dialog, so nothing is saved until you select **Turn on** there. Most policies have one decision to make, described under each policy below.

**3. Read the summary**

In **Require approval** mode, the summary in the dialog shows what changes for the people who publish. For the connectors and external collaborators policies, the summary also counts how often the policy would have required approval in the last 30 days. The count shows how much review work you are about to create.

**4. Enable the policy**

Select **Turn on**. The row shows the policy as enabled.

The dialog also shows two facts that are the same for every approval policy. Every admin and owner receives each request in Lovable and by email, and any one of them can approve or deny it.

The dialog also shows how long requests stay open, under **Requests expire after**: 30 days for every policy. A request nobody approves or denies in that time counts as denied, and nothing is published.

Policies have no test mode. To try a policy that has both modes, enable it in **Require approval** mode first and watch the requests before you switch it to **Block**.

Lovable records every policy change, every time a policy checks publishing, and every approval or denial in the [audit logs](https://docs.lovable.dev/features/audit-logs.md).

## Restrict publishing with unresolved sensitive data findings

The policy applies when a project has unresolved findings from [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md). **Sensitive data scanning** is Lovable's scan for personally identifiable information (PII), such as names, emails, and identity numbers, in a project's data and chat. A finding is one piece of personal data the scan recorded.

The policy needs the [Sensitive data scanning](https://docs.lovable.dev/features/privacy-and-security-settings.md#sensitive-data-scanning) setting enabled and saved first. Until then you cannot enable the policy.

The policy applies to everyone, including admins and owners.

Choose what happens when someone wants to publish an app with unresolved findings:

* **Block**, the default: Lovable refuses to publish, and the person publishing sees the findings that block it. They can publish after the findings are resolved.
* **Require approval**: publishing waits for an admin or owner. Choose this when an approver should be able to approve an app after checking the findings, for example test data that scanning flagged.

An approval has no time limit. It ends when the number of unresolved sensitive data findings changes or when who can view the app changes.

## Restrict publishing by external collaborators

The policy applies when the person publishing is an external collaborator, a person outside your workspace who was invited to a project, such as a contractor or agency staff member. Admins and owners are exempt.

Choose what happens when an external collaborator wants to publish:

* **Block**: Lovable refuses to publish, and the external collaborator sees that a workspace policy blocks publishing. Choose this when people outside your workspace build apps, and only your members publish them.
* **Require approval**, the default: publishing waits until an admin or owner approves it. Choose this when external collaborators should publish their apps after an admin or owner checks them.

An approval has no time limit. It ends when the person's role in your workspace changes or when who can view the app changes.

If your workspace does not allow external collaborators on projects, the policy never applies. See [External project collaborators](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-project-collaborators).

## Restrict publishing externally

The policy applies when an app is published publicly, meaning anyone with the link can open it. It covers updates to an app that is already public. It does not apply to publishing to your workspace or to selected people.

Choose who publishes public apps without a request, under **Who publishes without approval**: **Owners and admins**, or **Owners only**. Only workspace owners can choose **Owners only**. In **Block** mode the same choice is labeled **Who can publish externally**, and it sets who can publish publicly at all.

Choose what happens when anyone else wants to publish a public app:

* **Block**: no one else publishes publicly. Choose this when the rule has no exceptions, for example while a security review runs.
* **Require approval**, the default: publishing waits until an admin or owner approves it. Choose this when most apps should go public after a check. You get a record of who approved each public app.

Set how long an approval lasts under **Approval lasts**: 14 days by default, from 1 hour to 30 days. During that time the person publishes the public app again without a new request. This is the only policy whose approval expires on its own.

## Require approval to publish apps that use connectors

The policy applies when the project uses one or more [connectors](https://docs.lovable.dev/integrations/app-connectors.md), for example a Snowflake, HubSpot, or Stripe connection. An app with a connector moves data from a system your company controls, so an admin or owner reviews the app before it goes live.

Admins and owners are exempt. The policy has one mode, **Require approval**.

Choose which connectors count under **Connector types**:

* **All connector types**: every connector counts.
* [App + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md): connectors that use one shared workspace account.
* [App user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md): connectors where each app user signs in with their own account.

An approval has no time limit. It ends when the app's connectors change or when who can view the app changes.

## How approvals work

A policy applies to every way an app can be published, including from the project chat. When a policy requires approval for publishing from the project chat, Lovable replies that approvers were notified and that it publishes the app when one of them approves.

Approvers approve or deny requests in the [Action center](https://docs.lovable.dev/features/action-center.md#approve-or-deny-a-publish-request). An admin or owner cannot approve their own request, so another admin or owner approves or denies it. The person who publishes follows the request in the publish dialog, described in [Request approval to publish](https://docs.lovable.dev/features/publish.md#request-approval-to-publish).

An approval covers the app, not a single version. After an admin or owner approves a request, Lovable publishes the app. The requester then publishes later updates of the same app without a new request.

The approval ends when something the policy checks changes. For the **Restrict publishing externally** policy, it also ends when the time set under **Approval lasts** runs out. The requester then requests approval again.

A policy checks publishing only. People keep editing and previewing while a request waits.

More than one policy can apply to the same app. The requester sends one request and the approver sees one item for all of them. Lovable publishes the app when the item is approved.

A waiting request is closed without a decision when something the policy checks changes:

* the project's connectors,
* who can view the app,
* the number of unresolved sensitive data findings,
* the requester's role in the workspace, or
* the project moving to another workspace.

Approvers see a closed request as **Expired · project changed** the next time they open the **Action center**. The requester can request again for the current state of the app.

A publicly published project cannot be moved into a workspace whose **Restrict publishing externally** policy applies to the person moving it. Unpublish the project first, or ask an admin or owner of the destination workspace to move it.

## Change or disable a policy

Each policy row shows how many requests are waiting, for example **3 requests waiting**, with a link to the **Action center**, so you can see what a change affects before you make it.

To disable a policy, open its dialog, disable it there, and confirm.

> [!WARNING]
>
> Three changes cancel every waiting request:
>
> * You switch a policy from **Require approval** to **Block**. From then on, Lovable refuses to publish the apps the policy applies to.
> * You disable a policy. People can publish without review. Disabling **Restrict publishing externally** also lets everyone with publish access publish publicly.
> * You change the connector types of the **Require approval to publish apps that use connectors** policy. The dialog shows no warning for this change.
>
> Lovable does not approve the waiting requests for you.

A change to **Approval lasts** does not cancel waiting requests. The new duration applies to requests opened after you save it.


## Related topics

- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Action center](https://docs.lovable.dev/features/action-center.md)
