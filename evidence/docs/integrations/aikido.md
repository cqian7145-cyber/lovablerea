# Run AI-powered penetration tests with Aikido
<!-- source: https://docs.lovable.dev/integrations/aikido.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Run AI-powered penetration tests with Aikido

> Run AI-powered penetration tests on your Lovable projects with Aikido to identify real exploitable vulnerabilities and generate shareable security reports.

## What is AI pentesting

[Aikido](https://www.aikido.dev/) brings AI-powered penetration testing to Lovable. It lets you test your projects for real, exploitable vulnerabilities at any point in your project lifecycle.

AI pentesting is automated penetration testing performed by AI agents that simulate real attackers. It performs **dynamic analysis** by interacting with your application to identify vulnerabilities that can be exploited. This includes sending real payloads, testing authentication and authorization flows, attempting privilege escalation, and probing APIs for unexpected behavior.

This differs from Lovable's [built-in quick and deep security scans](https://docs.lovable.dev/features/security), which perform **static analysis**. The built-in security scans read your code to flag known patterns such as exposed secrets, missing row-level security, and common misconfigurations.

The two approaches are complementary.

* Static analysis tells you what *could* go wrong based on your code.
* Dynamic analysis tells you what *actually* breaks when someone tries.

The recommended order is to run the quick and deep security scans first, fix those issues, then validate with a pentest.

Because AI pentesting validates issues through real attack scenarios, all findings are confirmed before being reported. This means you only see exploitable vulnerabilities, not theoretical risks.

After a pentest completes, you can sync findings into your project's [Security view](https://docs.lovable.dev/features/security-view.md) in a dedicated section called **Agentic penetration test by Aikido**.

Aikido also generates a report and certificate that you can share with customers, investors, enterprise prospects, and external auditors, structured for SOC 2, ISO 27001, and vendor security questionnaire requirements.

## When to use AI pentesting

* **Before a major release**\
  Run a pentest after feature work is complete to catch vulnerabilities before going live.
* **After significant changes** \
  Re-run after changes to authentication, database schema, or APIs to check for regressions.
* **For compliance or client requirements** \
  Use the generated report to satisfy SOC 2, ISO 27001, or enterprise security questionnaires.
* **As an ongoing practice**\
  Run regular pentests on active projects that handle real user data.

## How Aikido tests your application

Aikido uses two testing approaches:

* **Blackbox testing**\
  Attacks the application with no prior knowledge of the code, scanning to discover features, endpoints, and APIs
* **Whitebox testing**\
  Uses full access to the source code to reason about application logic, roles, and data flows, catching logic flaws and access control issues that surface testing alone would miss

Because Lovable sends your project repository to Aikido when you create a pentest, whitebox testing is always included.

## Prerequisites

* A paid [Aikido](https://www.aikido.dev/) account. Pentests are billed through Aikido.
  > [!NOTE]
  >
  > Until the end of June 2026, each pentest costs 100 Aikido credits.
* Lovable workspace **admin** or **owner** role to connect Aikido.
* Lovable project **editor** or higher to run pentests and sync findings.
* A dedicated test user account in your Lovable project with username and password that Aikido can use to log in and test authenticated flows.

## How to connect Aikido

A workspace admin or owner connects the Lovable workspace to Aikido via OAuth.

Only one Aikido connection can be added per workspace. When a connection is created, it is shared with all workspace members and AI pentesting is available across all projects in the workspace.

**1. Navigate to Aikido connector**

Open **Connectors** and select **Aikido**.

**2. Add and name the connection**

* Click **Connect** on the connector page.
* Enter a name for the connection, for example, `Aikido`.

**3. Connect and authorize**

* Click **Connect** at the bottom of the form. The Aikido authorization window opens - make sure your browser doesn't block pop-ups.
* Select the Aikido workspace you want to connect, review the requested permissions, and click **Authorize**. You'll be redirected back to Lovable with a confirmation.

## How to run pentests and fix findings

**1. Start a pentest**

Each pentest is scoped to a specific project.

* Open your project, then go to **Security view → Agentic penetration test by Aikido.**
* Click **Prepare Aikido pentest** (first time) or **Launch new pentest** (if you've run one before).
* Click **Acknowledge and proceed** to acknowledge the warning about database changes.

Lovable uploads your repository and opens a pre-configured assessment in Aikido for you to review and launch.

**2. Review and complete setup in Aikido**

Most configuration is already pre-filled. In most cases, you only need to:

* **Add test users**\
  Add at least one test user and provide the username and password in the **Authentication instructions** field. Click **Save and Test** to verify credentials. Without credentials, testing is limited to unauthenticated flows.
* **Review the remaining configuration in Aikido** \
  Test scope, allowed domains, code & documentation, safety settings, and pricing are already set. You can adjust them if needed, but no changes are required to proceed.
* **Run the assessment**\
  When preflight completes, click **Run Assessment**. The **Confirm AI Pentest** confirmation dialog appears. Read the checklist, tick the confirmation checkbox, and click **Run Assessment** to launch.

See [official Aikido documentation](https://help.aikido.dev/pentests/aikido-pentest) for more information.

**3. Sync findings to Lovable**

The pentest runs for several hours, and issues appear in Aikido in real time as they are discovered. Findings are not synced automatically.

When the pentest completes:

* Go to the **Security view** in your project.
* Click **Sync findings** to pull results in. Findings appear in the **Agentic penetration test by Aikido** section. Severity maps as follows:
  * Critical and high → Error
  * Medium → Warning
  * Low → Info

Each finding includes technical details, an attack analysis, reproduction steps, and AI-generated remediation guidance.

Each sync reflects the current state of open issues in Aikido. If you close or resolve an issue in Aikido and then sync, it will no longer appear in the Security view.

**4. Fix issues**

* To fix an issue, copy the attack analysis from Aikido and send it in the project chat, or click **Try to fix all** and Lovable will attempt the fix.
* To verify a fix, use the **Retest issue** option in Aikido, then sync again.

**5. Get your pentest report**

When the pentest completes, Aikido automatically generates a report combining an executive overview with actionable findings. The report is structured for SOC 2, ISO 27001, client security questionnaires, and investor due diligence. You can access and download it from Aikido.

In Lovable, you can find past pentests under **Pentest history** in the Security view, with status badges (Draft, Pending, Running, Completed, Cancelled, Failed) and a **View in Aikido** link per assessment.

## **Manage the Aikido connection**

Workspace admins and owners can manage the Aikido connection from **Connectors** → **Aikido**.

* **Reconnect**: re-runs the OAuth flow to get updated credentials. A new window will open - make sure your browser allows pop-ups.
* **Delete**: permanently removes the workspace connection and its credentials. This cannot be undone. Workspace members will no longer be able to run AI pentests with Aikido. Existing synced findings remain visible in each project's Security view.


## Related topics

- [Security overview](https://docs.lovable.dev/features/security.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [EU inference](https://docs.lovable.dev/features/eu-inference.md)
- [AI features for your app](https://docs.lovable.dev/features/ai.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
