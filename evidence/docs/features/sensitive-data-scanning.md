# Sensitive data scanning
<!-- source: https://docs.lovable.dev/features/sensitive-data-scanning.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sensitive data scanning

> Detect and manage personally identifiable information across chat messages, file uploads, project chat history, and the app's built-in database and storage.

Sensitive data scanning helps teams find and manage personally identifiable information (PII) in Lovable projects.

It covers both:

* **New chat activity**, through **Chat send protection** for messages and attached files.
* **Existing project data**, through **on-demand scans** of project chat history, the built-in database, and storage.

Use sensitive data scanning to identify personal or regulated data that flows through a Lovable workspace, so teams can review, redact, or remove it before it is used in generated apps or left behind in project data.

## Why use sensitive data scanning

Teams that work with regulated, confidential, or customer data need visibility and control over where personal data appears. Sensitive data scanning helps you:

* Meet internal compliance and data loss prevention (DLP) requirements.
* Give users a chance to review and redact PII before sending chat messages.
* Prevent detected PII from being sent in the project chat when stricter workspace controls are needed.
* Audit stored project data before release, handoff, or review.
* Keep an audit-ready record of detected PII and the actions taken on it.

## Prerequisites

To use sensitive data scanning, you need:

* An **Enterprise** plan
* **Sensitive data scanning** enabled for your workspace in [Workspace settings → Privacy & security](https://docs.lovable.dev/features/privacy-and-security-settings.md#sensitive-data-scanning)
* A **workspace owner** or **admin** role to enable sensitive data scanning and configure workspace-level settings
* **Project edit access** to run on-demand scans, review findings, and act on findings in **More → Security → Sensitive data**

## How sensitive data detection works

Every sensitive data scan in Lovable runs through the same detection engine, **Google Cloud DLP**, which recognizes well-known formats of personal information such as email addresses, credit card numbers, government IDs, and phone numbers from a range of countries.

The engine returns potential matches, and Lovable records qualifying matches as findings in the project’s **Sensitive data** tab.

For new chat messages, Lovable may also run an additional LLM-based review pass that checks the Google Cloud DLP results, filters likely false positives, and can catch sensitive content the pattern-based scan missed. This applies only to message text, not file attachments. If the review is unavailable, Lovable uses the original DLP results unchanged.

Scans are read-only. They do not change, move, redact, or delete data by themselves. To remove or redact PII, take action on individual findings or ask Lovable in the project chat to fix the data.

There are no additional charges to your workspace based on the volume of messages scanned or findings recorded.

### **What the engine looks for**

Lovable scans for a fixed list of information types, grouped into these categories:

| Category | Types |
| :- | :- |
| Identity | Person name, email address, phone number, street address, date of birth, age, gender |
| Financial | Credit card data, financial account ID, US bank routing number, SWIFT code |
| Government | Government-issued ID, passport |
| Medical | Medical data, medical record ID |
| Security | Passwords, API keys, and other authentication secrets |

The list is international by design and covers patterns common in the EU, UK, India, Canada, and the US.

### How detection confidence works

For every potential match, the detection engine returns a likelihood score. Likelihood reflects how confident the engine is that the value really is the type of PII it identified. It does not describe how serious the data is.

Lovable records findings only at the **Likely** or **Very likely** level. Lower-confidence matches are filtered out before they reach the findings table, so the list stays focused on real issues.

| Likelihood | Meaning |
| :- | :- |
| Very likely | Strong evidence. The match has structural confirmation, such as a credit card number that passes the Luhn checksum or a well-formed email address. |
| Likely | Solid evidence. The match fits the expected shape and surrounding context. |

### How findings are prioritized

Each information type is mapped to a sensitivity tier that reflects how serious the match would be if real.

| Sensitivity | Examples |
| :- | :- |
| Low | Age, gender |
| Mid | Email address, phone number, person name, street address |
| High | Credit card data, government-issued ID, passport, medical record ID, authentication secrets |

Likelihood and sensitivity are independent. A finding can be high-confidence and low-impact, or lower-confidence and high-impact.

When you triage findings, address **High** sensitivity findings first.

### What gets scanned

Sensitive data scanning covers different sources depending on whether the scan runs live through Chat send protection or on demand from the project's Sensitive data tab.

| **Source** | **What is scanned** | **When it runs** |
| :- | :- | :- |
| Live chat message | The text in your message box | Every time a user sends a message (when **Chat send protection** is on) |
| Live file upload | Files attached to a chat message, in supported formats. Files the scan can read: <ul><li>Text files such as `.txt`, `.csv`, `.json`, `.xml`, `.yaml`, `.md`, `.html`, and log files</li><li>Spreadsheets and documents such as Excel, Word, PowerPoint, and PDF</li><li>Images such as JPG, PNG, BMP, and SVG, when text is visible in the image</li></ul> | Every time a user sends a message with attachments (when **Chat send protection** is on) |
| Chat history | Every message saved in the conversation, including user messages and Lovable replies | On demand, from More → Security → Sensitive data |
| Cloud database | Sampled rows from built-in database tables, where PII is most likely to appear, for example columns that hold text, identifiers, numbers, and dates | On demand, from More → Security → Sensitive data |
| Cloud storage | Files in supported formats from the most recently used buckets and the most recently changed files in each. Files the scan can read: <ul><li>Text files such as `.txt`, `.csv`, `.json`, `.xml`, `.yaml`, `.md`, `.html`, and log files</li><li>Spreadsheets and documents such as Excel, Word, PowerPoint, and PDF</li><li>Images such as JPG, PNG, BMP, and SVG, when text is visible in the image</li></ul> | On demand, from More → Security → Sensitive data |

## Configure sensitive data detection

Workspace admins and owners configure sensitive data scanning at Workspace settings → Privacy & security.

Sensitive data scanning has three related workspace settings:

| Setting | What it controls |
| :- | :- |
| [Sensitive data scanning](https://docs.lovable.dev/features/privacy-and-security-settings.md#sensitive-data-scanning) | The main switch for PII detection. When enabled, Lovable can scan workspace content for PII and record findings. |
| [Chat send protection](https://docs.lovable.dev/features/privacy-and-security-settings.md#chat-send-protection) | What happens when PII is detected in new chat messages or attached files. |
| [Restrict publishing with unresolved sensitive data findings](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-with-unresolved-sensitive-data-findings) | A workspace policy that blocks publishing with unresolved sensitive data findings, or requires approval first. It applies to everyone, including admins and owners. |

**Sensitive data scanning** must be enabled before the other controls are available. When enabled, it:

* Makes **Chat send protection** available.
* Makes the **Restrict publishing with unresolved sensitive data findings** policy available.
* Adds the **Sensitive data** tab to projects.
* Allows on-demand scans of existing project data.
* Lets anyone with project edit access review and act on recorded findings.

When disabled, no sensitive data scans run, no PII findings are recorded, related controls are hidden or inactive, and the Sensitive data tab is hidden on projects.

### Chat send protection

**Chat send protection** becomes available only when **Sensitive data scanning** is on. It controls what happens when PII is detected in new chat messages or attached files.

On-demand scans of project chat history, the built-in database, or storage still work regardless of the chat send protection mode.

It has four modes:

| **Mode** | **Behavior** |
| :- | :- |
| Off | No scanning. New chat messages and attached files send without inspection or logging. |
| Log only | The scan runs. If PII is detected, a finding is recorded and available for review in the project's **Sensitive data** tab, but the message sends without interruption. This is the default mode when **Sensitive data scanning** is first enabled. |
| Ask before sending | The scan runs. If PII is detected, the message is paused. For message text, the user can edit, send a redacted version, or send the original. For attached files with PII, the user can cancel or send the original. Detected PII is logged only if the user sends the original content. Otherwise, the original content is discarded. You can bypass this on project level by disabling **PII detection warning** from the **Sensitive data** tab. |
| Block original | The scan runs. If PII is detected, the user cannot send the original. For message text, they can edit the message or send a redacted version when available. For attached files with PII, they must cancel and replace the file. The original content is discarded and not logged. |

## PII detection warning

When **Chat send protection** is set to **Ask before sending** or **Block original**, Lovable scans new chat messages and attached files before they are sent.

If no PII is detected at the **Likely** threshold or above, the message sends.

If PII is detected, the user sees a warning with:

* The detected information types
* A redacted preview of the message, when specific message text can be redacted. Detected segments are replaced by `[REDACTED:TYPE]` badges. Hovering over a badge reveals the original snippet that triggered the finding.
* Matched snippets from attached files
* The actions available for the current **Chat send protection** mode and content type

The user chooses one of the available actions, depending on whether the finding is in message text or an attached file:

| Action | Description |
| - | - |
| Send original | Sends the message or attached file as written and records the detected PII as a finding. This option is available in **Ask before sending** mode only, and not available in **Block original** mode. |
| Edit | Returns the user to the message so they can rewrite it. The edited message is scanned again when sent. |
| Send redacted | Replaces detected segments with `[REDACTED:TYPE]` placeholders before sending. Only the redacted text is saved to project chat history. The original content is discarded and is not retained. Send redacted is unavailable when an attached file contains PII, or when the whole message is flagged as sensitive and there is no specific text segment to replace. If the button is disabled, hover it to see why, then edit the message to remove the sensitive content before sending. |
| Cancel | Only for file uploads. Cancels the send so the user can replace the attachment. |

If the user edits, cancels, or sends a redacted message, the original PII is discarded and not recorded as a finding.

PII detection warning can be disabled for a project when **Chat send protection** is set to **Ask before sending.**

### Disable PII detection warning for a project

When **Chat send protection** is set to **Ask before sending**, project members with edit access can disable **PII detection warning** from the project’s **Sensitive data** tab.

Use this for projects where the warning adds unnecessary friction, such as internal tools where the team has already accepted the data flow.

When **PII detection warning** is disabled:

* Detected PII in new chat messages and attached files sends without showing the warning.
* Findings are still recorded for audit and review in the project’s Sensitive data tab.

Disabling **PII detection warning** is not available in **Off**, **Log only**, or **Block original** mode.

## Run an on-demand scan

An on-demand scan inspects content as it currently exists:

* Chat history as saved
* Current rows in built-in database tables
* Current objects in built-in storage

Anyone with project edit access can run an on-demand scan across stored project data. To run an on-demand scan:

1. Open **More → Security → Sensitive data**.
2. Click **Run scan**.
3. Wait for the scan to finish.

On-demand scans record every piece of PII found in the stored content they inspect, with no user choice involved.

Because on-demand scans read stored content, PII that was already redacted or deleted is no longer present and is not recorded again. This makes it safe to re-run scans without losing review history.

## Review findings

Detected sensitive data findings are recorded in each project's **Sensitive data** tab. The **Sensitive data** tab appears under **More → Security** whenever **Sensitive data scanning** is enabled for the workspace. If **Sensitive data scanning** is off, the tab is hidden and no findings are recorded.

Above the findings table, you can see when the project was last scanned, for example *"Last scanned 8 hours ago"*, or *"This project has not been scanned yet"* for projects that have never been scanned.

Use this view to review where PII was found, when it was recorded, and what action was taken.

### PII findings table

Findings are **grouped by source**. Every finding tied to the same source appears together as one expandable row. The rows underneath represent a single finding within it. When you expand a group row, each nested row shows details for one finding.

The PII findings table includes the following columns:

| Column | Description |
| :- | :- |
| Source | Where the finding came from: <ul><li>**Chat**: A user message in the project's chat</li><li>**Upload**: A file attached to a chat message</li><li>**Cloud storage**: An object in the project's built-in storage buckets</li><li>**Cloud database**: A row in a table in the project's built-in database</li></ul> |
| Types | One or more [detected information types](#what-the-engine-looks-for), such as `PERSON_NAME` or `EMAIL_ADDRESS`. |
| Sensitivity | The potential impact tier of the information type, assuming the match is real. The group row displays the highest sensitivity tier across the findings in the group. <ul><li>**Low**: Age, gender</li><li>**Mid**: Email address, phone number, person name, street address</li><li>**High**: Credit card data, government-issued ID, passport, medical record ID, authentication secrets</li></ul> Use this to prioritize which findings to address first. |
| Found | When the finding was recorded. The group row displays the timestamp for the most recent finding in the group. |
| Status | The status of the finding: <ul><li>**Open:** Finding still requires review.</li><li>**Fixed:** The underlying content has been redacted, deleted, or otherwise resolved.</li><li>**False positive**: A user has marked the finding as **Not PII**. The underlying content is unchanged and the finding can be reopened.</li><li>**Mixed**: A group row badge that appears when the individual findings in that group have more than one status.</li></ul> |
| Reference | A link or location identifying the source. <ul><li>Chat and upload findings show **View in chat**.</li><li>Cloud storage findings show the **object path**.</li><li>Cloud database findings show `schema.table`.</li></ul> |

## Take action on findings

The available action depends on the source of the finding. A single chat message, upload, or storage object can produce multiple findings.

Actions either change review state or change the underlying content:

* **Not PII** and **Reopen** change the review state of an individual finding.
* **Redact** and **Delete** change the underlying content and resolve every finding on the referenced item together, so they always live on the group row.

| Action | Applies to | What it does |
| :- | :- | :- |
| **Not PII** | Any finding | Marks the finding as a false positive. The underlying content is not changed, and the finding can be reopened later. |
| **Reopen** | Any finding marked **Not PII** | Reopen a finding that was previously marked **Not PII** (false positive). |
| **Redact** | Chat messages | Permanently replaces the detected segments in the original chat message with `[REDACTED:TYPE]` placeholders. The whole message is rewritten in the conversation history, and every finding on that message is resolved together. The status moves to **Fixed**. Refresh the page to see changes. *Note: To dismiss an individual finding without changing the message, mark it as **Not PII** on the corresponding nested row instead.* |
| **Delete** | File uploads (in the project chat and Cloud storage) | Permanently removes the underlying file. The finding moves to **Fixed**. |

> [!NOTE]
>
> For Cloud database findings, you can mark a finding as **Not PII** to dismiss it, but the row must be removed from the database directly. Ask Lovable to fix it in the project chat, then re-run the scan. Re-running the scan after removing the row updates the finding's status.

Findings remain in the PII findings log after they are **Fixed** or marked as **Not PII**. The audit trail is preserved even when the underlying content is removed.

When the [Restrict publishing with unresolved sensitive data findings](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-with-unresolved-sensitive-data-findings) policy is enabled, a project with unresolved findings is not published or updated. The project can be published after the findings are fixed or marked as **Not PII**. In **Require approval** mode, an admin or owner can approve the project instead.

## Best practices

* **Start in Log only mode.** Use **Log only** to understand what surfaces in your workspace before moving to **Ask before sending** or **Block original**.
* **Prioritize High sensitivity findings.** Address **High sensitivity** findings first, especially when they are **Likely** or **Very likely**.
* **Treat Not PII as a real signal.** Mark a finding as **Not PII** only when the match is genuinely incorrect.
* **Disable PII detection warning sparingly.** Disable it only for projects where the team has explicitly accepted the data flow.
* **Re-scan after major data changes.** After importing data, restoring a backup, or making large schema changes, run an on-demand scan to catch anything new.
* **Use the Restrict publishing with unresolved sensitive data findings policy for release control.** Enable it when projects should not be published or updated until unresolved sensitive data findings have been reviewed.

## **Limitations**

Before relying on sensitive data scanning as the only line of defense, review the following limits.

* **On-demand scans cover the built-in database and storage.** External or self-hosted resources are not scanned.
* **No direct fix for Cloud database findings.** Cloud database findings can be marked as Not PII from the project’s Sensitive data tab, but the underlying row must be removed from the database directly. To remove the underlying PII, ask Lovable to fix the data in the project chat, then re-run the scan.
* **Only recognized file types are scanned.** Storage and upload scans read supported text files, spreadsheets, documents, PDFs, and images. Files in unsupported formats, or files uploaded without a recognizable content type, are skipped.
* **Storage scans are sampled, not exhaustive.** Each storage scan checks the 10 most recently used buckets in the project, the 20 most recently changed files in each bucket, and roughly the first 450 KB of each text file or document, or 3.9 MB of each image. Older files, files beyond those counts, and content past the size limit are not inspected.
* **Database scans are sampled, not exhaustive.** Each database scan reads roughly the first 200 rows from relevant tables and only the beginning of very large text values. A clean scan means no PII was found in the sampled data, not that the full database is guaranteed to be PII-free.
* **File upload findings are capped.** For file uploads, Lovable records up to **10 findings per file**. If a file has more findings, redact or delete the file rather than addressing findings one at a time.
* **Files with detected PII cannot be partially redacted.** When an attached file contains PII, the user must redact the file manually before sending, remove the attachment, or, in Ask before sending mode, send the original if your workspace policy allows it.
* **In-chat form answers are not scanned.** Answers typed into in-chat forms are not scanned directly. If Lovable repeats the value back into the project chat, an on-demand project chat history scan can still pick it up.
* **Findings log cannot be exported.** Findings are viewable in the project’s Sensitive data tab, but there is no export option at the moment.

## FAQ

> **Is there any cost related to Sensitive data scanning?**
>
> No. There are no additional charges to your workspace based on the volume of messages scanned or findings recorded when using **Sensitive data scanning**.

> **What is the default chat send protection mode when I enable Sensitive data scanning?**
>
> The default is **Log only**. Findings are recorded in the **Sensitive data** tab without interrupting users until you change the mode.

> **Can a project bypass PII detection warning?**
>
> Yes, but only when the workspace is in **Ask before sending** mode. From **More → Security → Sensitive data**, disable **PII detection warnings** for that project. Detected PII is then allowed in the project chat for that project, while findings are still recorded.
>
> In **Block original** mode, sending messages with detected PII is always blocked and cannot be bypassed at the project level.

> **Where do I see detected PII?**
>
> Findings appear in each project's **Sensitive data** tab. Go to **More → Security → Sensitive data**.

> **What is the difference between Ask before sending and Block original?**
>
> In **Ask before sending** mode, the user can send the original content. For message text, they can also edit or send a redacted version. For attached files with PII, they can cancel or send the original.
>
> In **Block original** mode, the original content cannot be sent. For message text, the user can edit or send a redacted version when available. For attached files with PII, they must cancel and replace the file.

> **If a user redacts or edits a message, is the original PII still logged?**
>
> No. Choosing **Send redacted** or editing the message discards the original PII, and nothing is written to the findings log.

> **Can a finding be deleted from the PII findings log?**
>
> No. Findings remain in the PII findings log to preserve the history of detected PII and the actions taken. When the underlying content is redacted or deleted, the status of the finding moves to **Fixed**.

> **Why was a value I expected to be detected not flagged?**
>
> Findings are surfaced at the Likely confidence level or above. Possible, Unlikely, and Very unlikely matches are filtered out. Custom or proprietary identifiers that do not match a supported information type are also not detected.


## Related topics

- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Workspace policies](https://docs.lovable.dev/features/workspace-policies.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Security insights](https://docs.lovable.dev/features/security-insights.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
