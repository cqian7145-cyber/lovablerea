# Trust center
<!-- source: https://docs.lovable.dev/features/trust-center.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Trust center

> Share security checks verified by Lovable for your published app, with a page at /.well-known/trust.html and machine-readable results at /.well-known/trust.json.

Your app's **Trust center** is a security page with checks verified by Lovable for your externally published app. It combines live checks with Lovable's platform records to show confirmed security properties of your current deployment. Share it with customers, reviewers, and investors as evidence for security reviews, without writing or maintaining the results yourself.

When the Trust center is enabled for a project, its published app gets two addresses on its own domain:

* **A page for people** at `/.well-known/trust.html`. This is what you share with customers, reviewers, and investors.
* **A file for software** at `/.well-known/trust.json`. Automated tools and AI agents read this to check your app without a human involved. You never need to open it yourself.

> [!NOTE]
>
> The Trust center is informational, not a certification. It shows security facts that Lovable observed about your app. It is not an audit, and it doesn't declare your app "certified secure." Formal certifications such as SOC 2 or ISO 27001 are separate things that the Trust center doesn't replace.

> [!TIP]
>
> The Trust center is your app's outward-facing security page. For related but different surfaces:
>
> * To review and fix security findings in a project, open the [Project security view](https://docs.lovable.dev/features/security-view.md).
> * For a workspace-wide view across projects, see the [Security center](https://docs.lovable.dev/features/security-center).
> * For Lovable's own platform and company security posture, see [trust.lovable.dev](https://trust.lovable.dev).

## Why use the Trust center

Instead of maintaining screenshots or writing security claims yourself, share a page that Lovable updates as your app changes:

* Answer questions about your app's security with checks verified by Lovable using live evidence and platform records.
* Support vendor reviews with a link to current security evidence, alongside any questionnaires or certifications a customer requires.
* Give investors and due-diligence reviewers evidence-backed security information that Lovable generates and maintains.
* Show that the security facts come from the platform your app runs on, not from your own marketing copy.
* Share results of software inventory and known-vulnerability checks for the dependencies Lovable identified in the current deployment.
* Let procurement tools and AI agents assess your app automatically through `trust.json`.

Lovable generates, validates, and serves these results, and ties them to the exact version and domain of your app that's live. Your app's code cannot write, edit, or restyle the platform-served results.

## Where to find it

The Trust center lives on your published app's own domain, including custom domains:

| Surface | URL | Audience |
| - | - | - |
| Trust page | `https://<your-app-domain>/.well-known/trust.html` | People: customers, reviewers, investors |
| Trust claims | `https://<your-app-domain>/.well-known/trust.json` | Machines: procurement tools, agents |

The trust page is as public as your published app. Apps published only to workspace members don't have a Trust center.

The page is excluded from search engines. It's meant to be shared by link, not discovered by search.

## Enable or disable the Trust center

The Trust center is disabled by default. To publish the trust page for your app, enable **Trust center** in **Project settings → Publishing**. Project admins and owners can change the setting.

* **Enabling it** applies to your app's current published version: Lovable evaluates the live deployment and publishes the trust page within a few minutes, no republish needed. If the project isn't published yet, the page appears after your first external publish. For apps last published before the Trust center existed, the trust page shows **Republish required** until you publish once more.
* **Disabling it** takes both `/.well-known/trust.html` and `/.well-known/trust.json` offline within about a minute. You can enable it again at any time, and Lovable re-evaluates your current published version.

## What the Trust center shows

### Security checks

The trust page groups checks into sections, written in plain language so anyone can read them. Your app's page shows the checks Lovable can currently confirm, so different apps show different sets: an app that uses the built-in backend also shows database checks, and an app with security tooling turned on shows that too. If a check is omitted, Lovable makes no claim about its state. A section appears only when at least one of its checks is confirmed, so your page can have fewer sections than listed here.

This is the full set of checks Lovable can show today.

**Connection and browser security** covers how your app establishes secure connections and instructs browsers to handle its content:

* **Insecure links are redirected to HTTPS.** If someone opens the app using an insecure HTTP link, they are automatically sent to the encrypted HTTPS version.
* **Browsers stay on HTTPS after a secure visit.** After someone visits securely, their browser is told to keep using HTTPS when they come back.
* **The app's HTTPS certificate is valid.** The app's web address has a valid certificate, so browsers can connect over HTTPS without a certificate warning.
* **Browsers are told not to guess file types.** The app tells browsers not to guess a resource's file type from its contents.
* **Other sites are restricted from embedding this app.** Other websites are restricted from displaying this app inside their own pages, which helps reduce misleading overlays and clicks.
* **The browser gets rules for what this page may load.** The app provides browser rules for where scripts and other content may load from.
* **The browser gets rules for sensitive features.** The app tells browsers which features, such as the camera, microphone, or location, may be used.
* **Outgoing links share limited page information.** When someone follows a link away from the app, less information about the page they came from is shared.
* **Secure cookie settings were observed.** Cookies Lovable checked use secure connections and limit cross-site use. Session cookies also block access from page scripts.
* **The first page checked avoided insecure resource links.** On the first page Lovable checked, scripts, styles, frames, and other active resources were not loaded over insecure HTTP.

**Deployment and runtime security** covers the published version of your app and the components it's built from:

* **Dependencies were checked for known vulnerabilities.** Lovable checked the software packages identified in this deployment against OSV, a public database of known vulnerabilities.
* **The latest dependency check found no known vulnerabilities.** In the latest complete check, Lovable did not find a known vulnerability in the software packages included in this deployment.
* **A software inventory was created for this version.** Lovable created an SBOM, which is an inventory of the software packages included in this published version.
* **The software inventory matches the version that is published.** The software inventory was created for the version of the app that is currently published.
* **These facts are tied to the version that is published.** These observations are tied to the exact version of the app that is currently published.
* **Health checks are turned on.** Lovable regularly checks whether the published app is responding.

**Access control and authorization** covers database protections, for apps that use the built-in backend:

* **A database access review completed for this version.** A supported review of the app's database access rules completed for this published version.
* **Record-level database protections are turned on.** Every database table Lovable checked has row-level security turned on. This enables access rules for individual records.

**Security scanning and remediation** covers security tooling that is active for the project:

* **Automatic security fixes are turned on.** The project has turned on Lovable's automated security-fix feature.
* **Aikido assessment results were synced.** Lovable received results from a connected Aikido security assessment for this published version.

To see which checks your app shows, open your own trust page and compare it against this list.

### Software bill of materials

Modern apps, including Lovable apps, are assembled from ready-made open source components called dependencies. A software bill of materials (SBOM) is an inventory of identified software components, in a standard format (CycloneDX) that security tools can read. Lovable creates an SBOM when you publish, as long as it can identify your app's dependencies. It uses the SBOM for the software inventory and dependency checks above. If your trust page doesn't show those checks, republish your app to generate a fresh inventory. `trust.json` discloses that an SBOM exists for the current deployment. The list itself is not publicly downloadable.

## How it works

Once you enable the Trust center, it follows your app's publishing lifecycle:

**1. You enable the Trust center and publish your app**

Enable **Trust center** in **Project settings → Publishing**. Publishing externally makes your app eligible.

**2. Lovable evaluates the deployment**

Lovable visits your live app over the network to run the connection and browser checks, and reads its own platform records, such as the software inventory, for the deployment checks.

**3. Lovable publishes the results**

The results become claims tied to your project and the exact content of that deployment.

**4. Results stay current**

Lovable re-evaluates after every publish, and on a regular refresh schedule in between.

**5. Lovable validates before serving**

Before serving the trust page or `trust.json`, Lovable checks the claims document and refuses to serve it if it is malformed, stale, or belongs to a different deployment or app domain.

A few properties of this design are worth knowing:

* **Lovable verifies and serves the results.** Lovable evaluates live checks and platform records before publishing results. Your app's code can't edit the platform-served results or restyle the page, and your app's CSS doesn't apply to it. The page renders in Lovable's neutral design.
* **Claims are bound to a deployment.** The results are tied to the exact app version and domain that Lovable evaluated. When you publish a new version, Lovable evaluates the new deployment fresh. Results from an old deployment are never quietly relabeled as current.
* **Evaluation never affects your app.** Trust center checks run after publishing, on their own. They never block or fail a deployment, and they don't create findings in the [Security center](https://docs.lovable.dev/features/security-center).

## Reading the results

The trust page shows current positive facts: checks that passed and records Lovable holds. Each fact carries a badge that says where it comes from:

* **Checked** means Lovable ran that check against your live app or its deployment and it passed.
* **Recorded by Lovable** means the fact comes from Lovable's own platform records, such as which version of your app is live.
* **Enabled** means a security capability is turned on for your project, such as health checks or automatic security fixes. These mirror Lovable features you manage yourself, in the same project or workspace settings where you normally turn them on or off.

The page shows an **Evidence evaluated** timestamp for when Lovable last evaluated the evidence. If a check is omitted from the page, Lovable makes no claim about its state. An omitted check is not an alert that something is wrong.

If a check you expected is missing, review your app in the project [Security view](https://docs.lovable.dev/features/security-view.md), ask Lovable in the project chat to help address what's missing, and republish. The Trust center re-evaluates the new deployment automatically.

When you talk about your Trust center with customers, describe it as specific security checks verified by Lovable for the current deployment. It is not a certification, an audit, or a guarantee that the app is secure.

## Using the machine-readable claims

You never need to open `/.well-known/trust.json` yourself. It exists so that software can check your app the same way people read the trust page.

For the technical readers and tools that do consume it: the file returns the same results as the trust page in a structured JSON document. Only checks that currently pass are included. Each entry has a stable identifier, whether the fact was probed on the live app or recorded from Lovable's platform records, and evaluation and expiry timestamps. The document also identifies the results as platform-generated.

Typical consumers:

* A procurement or vendor-management tool that checks suppliers' security posture automatically.
* An AI agent doing an automated vendor review before connecting to your app.
* Your own monitoring, if you want to alert when a control changes.

Treat the expiry timestamps as authoritative: an expired document means the claims are stale, not that the app regressed.

## Limitations

* **Informational, not certification.** The Trust center is not SOC 2, ISO 27001, a penetration test report, or a compliance attestation, and it doesn't substitute for any of them.
* **Coverage is focused.** The checks cover how your app is served (encryption and browser protections), the components it's built from, and where the deployment came from. The Trust center is not a full security assessment of your app's own code and logic.
* **Only current positive facts appear.** The page and `trust.json` show the checks that pass right now. A reviewer can't tell from the Trust center alone whether an omitted check failed or was never evaluated.

## FAQ

> **Is this a compliance certification like SOC 2 or ISO 27001?**
>
> No. The Trust center reports facts Lovable observed about your app. It is not an audit and does not certify compliance. It can make a vendor review faster, but a customer who requires a formal certification such as SOC 2 still requires it.

> **My trust page says Republish required. What does that mean?**
>
> Your app was last published before the Trust center existed, so there is no evidence for it yet. Republish the app and Lovable evaluates the new deployment and generates the page. This works for older React + Vite projects too, without upgrading your app's stack.

> **Can I edit the trust page or add my own claims?**
>
> No. Lovable verifies the evidence and generates the results for your current deployment. Your app's code cannot edit the results served by the platform.

> **Why is a check missing from my app's trust page?**
>
> The page shows only what Lovable can currently confirm. An omitted check means Lovable makes no claim about it. It is not an alert, and it doesn't mean your app has been breached or your data exposed. To improve what the page shows, review your app in the project [Security view](https://docs.lovable.dev/features/security-view.md), ask Lovable in the project chat to help, and republish. The Trust center re-checks the new deployment automatically.

> **Does every published app get a Trust center?**
>
> No, it's disabled by default. Enable **Trust center** in **Project settings → Publishing** for apps published externally with Lovable hosting, regardless of plan. Both newer apps built on TanStack Start and older React + Vite apps can have one, and you don't need to know which one your app is on. It describes the published deployment, so unpublished projects, preview environments, and apps published only to workspace members don't have one.

> **What happens when I republish my app?**
>
> A new deployment is evaluated fresh. Lovable re-checks the controls for the new deployment and publishes new claims. Old results are never carried over silently. Expect a short delay after publishing before the Trust center reflects the new deployment. Between publishes, Lovable also refreshes results on a regular schedule.

> **How is this different from trust.lovable.dev?**
>
> [trust.lovable.dev](https://trust.lovable.dev) covers Lovable as a company: the platform your app runs on. Your app's Trust center covers your specific app. The trust page links to Lovable's platform trust information for the hosting layer.

> **How is this different from the Security center?**
>
> The [Security center](https://docs.lovable.dev/features/security-center) is for you: it surfaces issues in your projects so you can fix them, and it's visible only inside Lovable. The Trust center is for your customers: it publishes security checks verified by Lovable for your live app on your app's own domain. The two are independent, and Trust center checks never create Security center findings.

> **I asked Lovable to build a trust or security page in my app. Is that the same thing?**
>
> No. A page Lovable builds inside your app is part of your app's own code: you own it, you can edit it, and so can anyone who can edit your project. The Trust center is generated and served by the platform and can't be edited from your app. Both can coexist. Use the Trust center when the fact that you can't edit it is the value.

> **Does the Trust center slow down or risk breaking my deployments?**
>
> No. Evaluation runs separately from publishing, never blocks a deployment, and never fails one.


## Related topics

- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
- [Security overview](https://docs.lovable.dev/features/security.md)
- [Connect your app to Amazon Redshift](https://docs.lovable.dev/integrations/amazon-redshift.md)
