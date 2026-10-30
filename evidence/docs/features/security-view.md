# Project security view
<!-- source: https://docs.lovable.dev/features/security-view.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project security view

> Review scan results, fix vulnerabilities, and manage dependency risks for a single project before and after publishing.

## What is the Security view?

The Security view shows security findings for a single project. It brings together results from Lovable's built-in security scanners and findings from optional security connectors, such as Wiz and Aikido, so that you can understand risks, take action, and verify that your project is ready to publish.

For details on how each scan works and when scans run, see [Security overview](https://docs.lovable.dev/features/security).

You’ll find the **Security tab** inside any Lovable project by going to **More → Security** in the project toolbar.

> [!TIP]
>
> The Security view focuses on a single project.
>
> * To monitor security findings and dependency risks across multiple projects, use the [Security center](https://docs.lovable.dev/features/security-center).
> * For a portfolio-level view that combines security findings, PII, ownership, lifecycle, and activity into a single review priority per project, see [Security insights](https://docs.lovable.dev/features/security-insights.md).
> * To show customers and security reviewers verifiable facts about your externally published app, see the [Trust center](https://docs.lovable.dev/features/trust-center.md). The Security view is where you find and fix issues. The Trust center is the outward-facing page Lovable generates from what it observes.
> * For practical guidance on writing secure code and avoiding common security mistakes, see [Security best practices for Lovable apps](https://docs.lovable.dev/tips-tricks/security-best-practices.md).

## Why use the Security view?

* **Review all project security sources in one place**\
  Built-in scan results and optional connector findings appear together, so you do not need to check separate tools to understand a project’s security status.
* **Catch issues early**\
  Security issues are easier to fix during development than after deployment. The Security view helps identify common problems such as misconfigured database access, insecure code patterns, or vulnerable dependencies before your app goes live.
* **Focus on what matters**\
  Not all security findings carry the same risk. Lovable groups findings by security area and labels them by severity, so you can start with critical issues and review lower-risk recommendations later.
* **Save time with guided fixes**\
  Many findings include automated remediation options or clear guidance. You can ask Lovable to fix specific issues directly and review the resulting changes.
* **Track security as your project evolves**\
  As your project changes, previous scan results may become outdated. The Security view clearly shows when scans need to be refreshed so you always know your project’s current security state.

## Run scans

Two cards at the top of the Security view show the state of each built-in scan and let you run it:

* **Deep security scan** (marked **Recommended**): Reviews all your code for issues specific to your app's logic, permissions, and data, and includes everything in the Quick scan. This is the [Deep scan](https://docs.lovable.dev/features/security#deep-scan).
* **Quick security scan** (marked **Automatic**): Checks your code and your live database configuration for common security issues and known misconfigurations, and runs automatically on every publish. This is the [Quick scan](https://docs.lovable.dev/features/security#quick-scan).

Both scans are free and do not consume credits. The footer of each card tells you the state of that scan:

* **Not scanned yet**: The scan has never run for this project.
* **Last scan** followed by how long ago it ran, with an **Up to date** label: The results reflect the current version of your project.
* **Last scan** with a **Run deep scan** or **Run quick scan** button: Your project has changed since the scan last ran. Click the button to scan the current version.

Both buttons are unavailable while a scan is running. The Deep scan also refreshes any out-of-date quick checks, so you do not need to run both.

Before you start a Deep scan, the card estimates how long it will take, based on how long your last scan took or on the size of your app. Deep scans usually take 3 to 13 minutes and at most 15. While a Deep scan runs, the card shows the current phase (**Getting to know your app**, **Reading through your code**, **Double-checking what we found**, and **Wrapping up**) and the estimated time remaining. If the scan runs past its estimate, the footer reads **Taking longer than usual** with a timer. You can leave the Security tab while a scan runs. The card shows the running scan when you come back.

Scan results are tied to a specific version of your code. When your project changes, findings from the earlier version stay visible and carry a clock icon. Hover over the icon to see which scan the finding comes from, and run that scan again to check the current version.

> [!NOTE]
>
> The **Deep scan** does not run automatically as you work. You can run it from the Security view or the [workspace Security center](https://docs.lovable.dev/features/security-center). The [publish dialog](https://docs.lovable.dev/features/publish.md) runs the Quick scan automatically and links to the Security view, where you can run a Deep scan before you publish.

You should run scans:

* Before publishing
* After significant code or database changes
* When adding or updating dependencies
* Periodically for production applications

## Included security findings

The Security view brings together security findings for one project. Depending on your project setup and workspace integrations, it can include:

* **Quick scan findings**: Database access rules, dependencies with known vulnerabilities, and MCP server exposure. Wiz results also appear here when your workspace has connected Wiz. See [Quick scan](https://docs.lovable.dev/features/security#quick-scan).
* **Deep scan findings**: Issues in your application code, such as data that the wrong people can read, endpoints that anyone can trigger, unsafe input handling, leaked secrets, and payment or sign-in flaws. See [Deep scan](https://docs.lovable.dev/features/security#deep-scan).
* **Wiz findings**: Static analysis and software composition analysis results from a connected [Wiz integration](https://docs.lovable.dev/integrations/wiz.md), including vulnerable dependencies and risky code patterns.
* **Aikido findings**: Confirmed exploitable issues from AI penetration tests run through the [Aikido connector](https://docs.lovable.dev/integrations/aikido.md).
* **Project dependencies**: A list of project `npm` dependencies with known issue counts by severity, a bulk fix action, and JSON export.

Lovable groups its built-in findings by security area, and Wiz findings under the Wiz connector, so you can see where each issue comes from, prioritize what matters, and decide whether to fix, ignore, or investigate further.

## Review and fix security findings

The findings panel lists every open finding for the project, with a count in its header, for example **12 security findings**. Ignored findings are not counted.

Before the first scan, the panel reads **Scan results will appear here**. If the latest scan does not find anything, Lovable shows **No issues found**. This means the last scan did not surface any issues, but the scanner cannot catch every possible risk.

### How findings are grouped

Lovable groups its built-in findings into security areas. Each area is a collapsible group with a one-line description of what it protects and count badges by severity, such as **2 Critical** or **1 Warning**.

| Security area | What it protects |
| :- | :- |
| **Access control & authorization** | Stop users from viewing or changing data that isn't theirs. |
| **Exposed personal & sensitive data** | Limit personal details like emails, phone numbers, and profiles to only the people who should see them. |
| **Leaked secrets & credentials** | Protect your API keys and credentials from exposure. |
| **Authentication & account security** | Make sure accounts can only ever be accessed by their rightful owner. |
| **Unsafe input & injection** | Guard against unexpected or malicious input triggering actions you didn't intend. |
| **Unauthenticated & abusable endpoints** | Block unauthorized users from triggering your app's functions without permission or limits. |
| **Payments & billing** | Safeguard your payment flows. |
| **Infrastructure & configuration** | Keep your app's dependencies and settings up to date. |

Only areas with findings appear. Groups are ordered by their most severe finding, then by how many findings they contain, so the group that needs attention first is at the top.

Findings that come from the same check appear as a single row within an area, for example the same issue on several endpoints or in several places in one file. Each affected endpoint, code path, policy, table, or function remains a separate finding. Click the row to open the group, then fix or ignore the findings together or select only the ones you want to address.

### Severity labels

Each finding carries one of three labels:

* **Critical**: Problems that need your attention immediately.
* **Warning**: Issues you should review and fix if necessary.
* **Info**: Suggestions to consider implementing.

When your app's website access is set to your workspace only, the Deep scan takes that audience into account. A finding that would be **Critical** on a public app is shown as a **Warning** when the code it cites can only be reached after signing in. Findings about secrets in your code or repository and findings that another website could exploit keep their level. If you change who can see your app and run the Deep scan again, the levels of affected findings update.

### Open a finding

Click a finding to review its details:

* **What could happen**: A plain-language explanation of the risk.
* **Technical details**: The evidence and the source location. Click the location to open that line in the code editor.
* **Ignore details**: For ignored findings, who ignored the finding, when, and why.
* A link to background reading, such as **Learn more about application code security**.

### Fix findings

You can ask Lovable to fix findings in several ways:

* **Fix one finding**\
  Click **Try to fix** on the finding. On a group row, **Try to fix** covers every finding in the group.
* **Fix everything**\
  Click **Try to fix all** in the header to send every open finding in one request. Ignored findings are left out.
* **Fix a selection**\
  Select findings, groups, or whole security areas with the checkboxes, then click **Try to fix selected**.
* **Discuss a finding in the project chat**\
  Open the **…** menu on a finding and choose **Reference in chat**. Lovable adds the finding to the project chat input, so you can ask a question about it or describe the fix you want. This is treated as standard build usage and consumes credits.

Each fix action sends one request in the project chat. Always review the changes Lovable makes and test them thoroughly. Fix buttons are unavailable while Lovable is still working on an earlier request or while a scan is running.

Running scans in the Security view is free and does not count toward any limit. Fix actions draw from your account's [10 free fixes](https://docs.lovable.dev/features/projects/chat.md#fix-errors-and-get-unstuck), shared with **Try to fix** on build errors in all your workspaces and projects. Each free fix becomes available again 24 hours after you use it, and further fixes are treated as standard build usage and consume credits. Your workspace needs at least one credit to start a fix. Conversational security reviews in the project chat, and referencing a finding in the project chat, consume credits. See [Security overview](https://docs.lovable.dev/features/security) for details.

> [!TIP]
>
> **Let Lovable automatically fix eligible findings**
>
> Depending on your workspace and project settings, Lovable can automatically fix eligible **Quick scan** findings, such as common database access issues and dependencies with known vulnerabilities, while you build. See [Let Lovable automatically fix eligible findings](https://docs.lovable.dev/features/security#let-lovable-automatically-fix-eligible-findings) for how workspace and project settings interact, and which findings are eligible.

### Ignore findings

If a finding does not apply to your use case, open its **…** menu and choose **Ignore finding**, then give a reason: **This is intended**, **I accept this risk**, **This is wrong**, or **Custom**. On a group row, the menu ignores every finding in the group, and **Ignore selected** in the header ignores everything you have selected with the checkboxes.

Ignored findings move to **Ignored findings** at the bottom of the list, where you can review the reason and restore them with **Unignore finding** at any time. They do not count toward the header total and are left out of **Try to fix all**.

Ignoring findings should be a deliberate decision. If you are unsure whether a finding applies, ask Lovable for clarification before ignoring it.

## Review project dependencies

The Security view shows a **Project dependencies** card with a count of project `npm` packages and known issues.

Click **Review** to open the dependency list. The list covers production dependencies (the packages your app uses when it runs) and leaves out development-only packages. Each row shows:

* Package name and version
* **Known issues** counts by severity, shown as badges such as **2 Critical** or **1 High**

Dependencies with known issues appear first, ordered by severity, followed by the remaining packages in alphabetical order. Only vulnerabilities rated critical become security findings in the findings panel, always as a **Warning**. High and medium vulnerabilities appear in this list only.

If the list contains known issues, a **Try to fix all** button appears. Click it to send every dependency with known issues through a single fix request. Like other automated fix actions, it draws from your account's [10 free fixes](https://docs.lovable.dev/features/projects/chat.md#fix-errors-and-get-unstuck).

You can also:

* Click **Scan dependencies** to refresh the dependency audit
* Click **Download list** to download a JSON report of all listed dependencies and their vulnerabilities for audits or compliance reviews

If the dependency list fails to load, the card shows an error state with a **Retry** button.

> [!NOTE]
>
> Some vulnerabilities rated critical upstream are not treated as findings, either because they cannot affect Lovable apps (such as a build-time dependency that never runs in your deployed app) or because they are very unlikely to be exploited in practice. For the second case, Lovable uses the [EPSS](https://www.first.org/epss/) score, an industry estimate of how likely a vulnerability is to be exploited, and does not raise a finding when that likelihood is low.
>
> Either way, the package stays in the dependency list with an info marker instead of a severity badge, and hovering the marker explains which reason applies. These packages don't count toward the Known issues total and are not included in **Try to fix all** requests, but their vulnerabilities still appear in the **Download list** export. The results refresh the next time a dependency scan runs, so click **Scan dependencies** to update an existing project, or wait for the next Quick scan.

Keeping dependencies up to date is one of the most effective ways to reduce security risk over time, especially as new vulnerabilities are disclosed.

## Best practices for using the Security view

The Security view is designed for ongoing use throughout development, not just a final check before publishing. The following best practices reflect how builders commonly use it.

* **Keep security findings current**\
  Review findings regularly and refresh scans when results become outdated, especially after adding features, changing database access, or updating dependencies.
* **Prioritize critical issues**\
  Address **Critical** findings before warnings or informational items. Critical findings often represent exploitable vulnerabilities.
* **Use both scanning approaches**\
  Use the built-in Quick and Deep scans in the Security view for structured checks and targeted fixes. Complement them by periodically asking Lovable to “review my app’s security” in the project chat for a narrative analysis that may catch issues the automated scans miss. If your workspace uses Wiz or Aikido, review those connector findings alongside Lovable’s built-in scan results.
* **Manage dependency risk proactively**\
  Regularly review the dependency section and address high-severity vulnerabilities promptly.
* **Review and verify fixes**\
  Automated fixes can save time, but always review the changes and test your app before continuing development.
* **Be deliberate when ignoring findings**\
  Ignore findings only when they clearly do not apply. Revisit ignored findings as your project evolves.
* **Continue monitoring after publishing**\
  Publishing is not the end of security work. Monitor new findings as your app changes over time.

> [!WARNING]
>
> Automated scans help catch common issues, but they cannot guarantee complete security. For apps handling sensitive data or critical functionality, consider an additional professional security review.

## FAQ

> **How do I access the Security view?**
>
> You’ll find the **Security tab** inside any Lovable project by going to **More → Security** in the project toolbar.

> **What does it mean when a scan is not up to date?**
>
> Your project has changed since the scan last ran. The scan card at the top of the Security view then shows a **Run quick scan** or **Run deep scan** button instead of **Up to date**, and findings from the earlier version carry a clock icon. Run the scan again to check the current version.

> **What is the difference between Quick scan, Deep scan, and asking Lovable to review security?**
>
> **Quick scan** runs a fixed set of checks in seconds. It looks for common database access issues, dependencies with known vulnerabilities, and an unprotected MCP server. **Deep scan** reviews your application code and takes longer, usually 3 to 13 minutes and at most 15. It includes everything in the Quick scan. Both are free and do not consume credits.
>
> **Asking Lovable to review your app's security** in the project chat triggers a separate AI-driven review that provides a narrative report and recommendations. It does not update scan results or scan status. Conversational security reviews in the project chat consume credits.
>
> These approaches are complementary.

> **Can I use the Security view for published projects?**
>
> Yes. Continue monitoring security after publishing, especially when adding features or updating dependencies.

> **What happens if I publish with critical findings?**
>
> Lovable warns you before publishing if critical issues exist. You can choose to publish anyway, but this is strongly discouraged since critical findings typically represent exploitable vulnerabilities.
>
> > [!NOTE]
> >
> > If your workspace has **Block publishing with critical issues** enabled, the publish dialog shows **Fix security issues to publish**, and you need to resolve the critical issues before you can publish.


## Related topics

- [Security overview](https://docs.lovable.dev/features/security.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Security best practices for Lovable apps](https://docs.lovable.dev/tips-tricks/security-best-practices.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
