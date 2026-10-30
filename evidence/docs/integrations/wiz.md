# Scan your projects for vulnerabilities with Wiz
<!-- source: https://docs.lovable.dev/integrations/wiz.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Scan your projects for vulnerabilities with Wiz

> Automatically scan your Lovable projects for vulnerabilities and code-security issues using Wiz to catch known CVEs and risky code patterns before you ship.

## What is Wiz security scanning

[Wiz](https://www.wiz.io/) brings automated security scanning to Lovable. When connected, Wiz scans your project for vulnerable dependencies and risky code patterns and surfaces findings directly in your project's [Security view](https://docs.lovable.dev/features/security-view.md).

Wiz scanning combines two analyses:

* **Software composition analysis (SCA)**\
  Examines your project's dependency tree (package lockfiles, installed libraries, and transitive dependencies) to identify packages with known CVEs
* **Static application security testing (SAST)**\
  Analyzes your source code for security issues like unsafe patterns, hardcoded secrets, and risky API usage

For each finding, Wiz reports the severity, the affected location, remediation guidance, and a link to the full details in Wiz.

This is complementary to Lovable's other [built-in security scans](https://docs.lovable.dev/features/security):

* **Quick scan** checks database access rules and dependencies for common issues and known vulnerabilities.
* **Deep scan** reviews your application code for vulnerabilities like exposed secrets, open endpoints, and input validation issues.
* **Wiz scanning** adds enterprise-grade vulnerability and code-security detection backed by Wiz's continuously updated security database.

Wiz scanning runs as part of Lovable's standard security scan suite. When you trigger a security scan, Wiz runs alongside the other scanners automatically.

## When to use Wiz scanning

* **Before launching or deploying**\
  Run a scan to check for vulnerable dependencies and risky code patterns before going live.
* **After adding or updating dependencies**\
  Re-scan after installing new packages or updating existing ones to check for newly introduced vulnerabilities.
* **As an ongoing practice**\
  Wiz scans run automatically as part of the security scan suite, so connected projects are continuously checked as new vulnerabilities are disclosed.
* **For compliance and security posture**\
  Use Wiz scanning alongside other security scanners to maintain a comprehensive view of your project's security status.

## How Wiz scans your project

When a security scan runs, Lovable mounts your project code into a secure sandbox environment and runs the Wiz CLI scanner against it. The scanner examines your project's **software bill of materials (SBOM)** and source files, and checks both dependencies and code against Wiz's security database.

Findings are classified by severity:

| Wiz severity | Security view level |
| :- | :- |
| Critical | Error |
| High | Warning |
| Medium and lower | Info |

Vulnerability and supply-chain findings are aggregated by severity into one consolidated entry per level (for example, *"Critical vulnerabilities in application dependencies"*), listing each affected package and its location. SAST findings are shown individually per file and line.

Each finding includes:

* The affected package or file
* The location (file path, and line numbers for SAST findings)
* A description and remediation guidance from Wiz
* A direct link to the full details in Wiz

Findings appear in the **Security view** alongside results from other scanners, in a section attributed to your Wiz connection. Each Wiz finding is labeled with the Wiz logo so you can identify its source.

## Prerequisites

* A **Wiz account** with permission to add deployments
* **Your Wiz Token URL**: The OAuth authentication endpoint for your tenant (either Cognito or Auth0). If you’re unsure which to use, try Cognito first. Your Wiz administrator can confirm the correct endpoint.
* **Lovable workspace owner or admin role** to connect Wiz

> [!NOTE]
>
> All scans use your Wiz deployment's permissions and quotas. Usage is handled directly by Wiz, not Lovable.

## How to connect Wiz

A workspace admin or owner connects the Lovable workspace to Wiz using a Wiz deployment. Only one Wiz connection can be added per workspace.

### Step 1: Create a Lovable integration deployment in Wiz

A Lovable integration deployment lets Lovable authenticate with Wiz to run scans.

**1. Log in to the Wiz portal**

Go to the [Wiz portal](https://app.wiz.io/).

**2. Create and configure a new Lovable integration deployment**

* Go to [Create a new Lovable integration deployment](https://app.wiz.io/settings/deployments/integrations/new/lovable)
* Give the deployment a descriptive name (for example, `Lovable`) and choose its scope.
* Click **Add integration**.

**3. Copy the credentials**

Copy the **Client ID** and **Client Secret**. Store them somewhere secure. The secret is only shown once.

> [!WARNING]
>
> Your client secret functions like a password. Keep it secure and never share it publicly.

### Step 2: Connect Wiz to Lovable

**1. Navigate to the Wiz connector**

Go to **Connectors** and select **Wiz**.

**2. Add a new connection**

Click **Connect** on the connector page.

**3. Enter connection details**

* **Display name**: Name the connection, for example `Wiz`.
* **Client ID**: From your Lovable integration deployment in Wiz.
* **Client Secret**: From your Lovable integration deployment in Wiz.
* **Advanced settings → Token URL**: Lovable defaults to **Cognito** (`https://auth.app.wiz.io/oauth/token`), which is correct for most tenants. If your Wiz tenant uses **Auth0**, switch the Token URL to `https://auth.wiz.io/oauth/token`. Your Wiz administrator can confirm which to use.
* **Advanced settings → CI/CD scan policies** (optional): enter a comma-separated list of Wiz CI/CD policy names to run during scans, for example `Default vulnerabilities policy, Default IaC policy`. Leave it blank to run your Wiz tenant's default policies. If a policy name cannot be found, the scan shows a **Wiz scan failed** finding in the project's Security view. You can change these policies later by editing the connection.
* **Sharing**: the connection is private to you by default. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace**. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.
  > [!NOTE]
  >
  > To enable security scanning for the entire workspace, make sure to invite the entire workspace.

**4. Create the connection**

Click **Connect** at the bottom of the form. When connected, Wiz scanning is included automatically the next time a security scan runs on any project with access to the connection.

## How to view and fix findings

Wiz findings appear in the **Security view** of each project, alongside findings from other scanners.

**1. Open the Security view**

Open your project and go to the **Security** tab. Wiz findings are listed in their own section. Each Wiz finding shows a **Wiz** badge so you can identify its source.

**2. Review finding details**

Click a finding to expand it and see the full details: affected package or file, location, description, remediation, and a link to the report in Wiz.

**3. Fix the issue**

Update the affected dependency or code to follow the remediation guidance.

**4. Verify the fix**

Run a new scan to verify the issue is resolved. Findings are marked as **(outdated)** when your project has new commits since the last scan.

## Manage the Wiz connection

Workspace admins and owners can manage the Wiz connection from **Connectors → Wiz**.

* **Update credentials**\
  Open the connection to edit the Client ID, Client Secret, or Token URL. Useful when rotating deployment credentials.
* **Delete**\
  This permanently removes the workspace connection and its credentials. This cannot be undone. Wiz scanning will stop across all projects in the workspace, and existing Wiz findings will no longer appear in the Security view.


## Related topics

- [Security overview](https://docs.lovable.dev/features/security.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Glossary](https://docs.lovable.dev/glossary.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
