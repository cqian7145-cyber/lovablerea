# Send branded emails from your own domain
<!-- source: https://docs.lovable.dev/features/custom-emails.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Send branded emails from your own domain

> Send branded emails, including authentication emails and custom app emails, from your own email domain with automatic DNS, SPF, DKIM, and DMARC setup to improve deliverability, protect your domain reputation, and strengthen brand trust.

## Overview

Emails allow your app to send **authentication emails** and custom **app emails** from your own email domain.

For example: `noreply@notify.yourdomain.com` or `noreply@yourdomain.com`

Using a dedicated sending subdomain helps protect your root domain's reputation while keeping your branding consistent.

You can customize:

* Which email domain your project uses
* The sender subdomain configuration
* Email branding and visual style
* Email templates and subject lines

Lovable handles domain verification, DNS configuration, email authentication (SPF (Authorizes which servers can send email for your domain), DKIM (Cryptographically signs emails to prevent tampering), and DMARC (Defines how providers handle failed authentication and protects against spoofing)), and delivery infrastructure. No external email provider accounts or API keys are required.

> [!TIP]
>
> Ready to set up emails? Check the [Prerequisites](#prerequisites), then jump to [Add an email domain](#add-an-email-domain) for the step-by-step setup and [Generate and customize email templates](#generate-and-customize-email-templates) to draft your auth and app emails.

## Supported email types

You can send authentication emails and custom app emails.

### Authentication emails

Authentication emails are a type of transactional email related to account access and identity verification. They are automatically triggered by Lovable Auth, the [built-in backend's](https://docs.lovable.dev/features/cloud) authentication, when users perform specific security-related actions.

Lovable provides six built-in templates you can use:

* **Confirm signup**\
  Sent when a user creates an account and email confirmation is enabled. Verifies that the user owns the email address before activating the account.
* **Password reset**\
  Sent when a user requests to reset their password. Allows secure password recovery.
* **Invite**\
  Sent when you invite a user to join your project (from **More → Users**). Grants account access through a secure invitation link.
* **Magic link**\
  Sent when passwordless login is enabled and a user requests a login link. Authenticates the user without requiring a password. You can ask Lovable to enable magic link authentication if it is not already configured.
* **Email change**\
  Sent when a user updates their email address. Confirms ownership of the new address before applying the change.
* **Reauthentication**\
  Sent when a user must verify their identity before performing a sensitive action, such as changing a password. Typically includes a short-lived verification code. You can ask Lovable to enable reauthentication if it is not already configured.

See [Generate and customize email templates](#generate-and-customize-email-templates) for more information.

### App emails

App emails are a type of transactional email sent in response to user activity or events in your app. They are triggered by your application logic when something happens, like a purchase or update. There are no built-in templates, you decide when to send them and what they contain.

Ask Lovable to add the required functionality, such as shipping notifications, order confirmations, purchase receipts, and other updates, and it will generate the templates for you. Lovable also handles unsubscribe automatically by adding an unsubscribe link to the email footer.

See [Generate and customize email templates](#generate-and-customize-email-templates) for more information.

## Availability and usage

* Emails are available on **paid plans**.
* Each paid workspace includes **50,000 transactional emails per month** at no additional cost. Usage is calculated across the entire workspace. Additional emails are billed 4 credits per 1000 emails.
* Lovable limits how many emails a workspace sends per hour, with separate limits for app emails and authentication emails:

  | Plan | App emails per hour | Authentication emails per hour |
  | :- | :- | :- |
  | Pro | 100 | 500 |
  | Business | 300 | 3,000 |
  | Enterprise | 1,000 | 10,000 |

  When a workspace reaches a limit, Lovable rejects new emails until the hour resets. **More → Emails** shows a warning once the workspace has used 80% of a limit. If you need a higher limit, contact [Lovable Support](https://lovable.dev/support). Authentication emails also have a per-project limit, **Rate limit for sending emails**, that you can adjust yourself. See [Sending limits](https://docs.lovable.dev/features/email-auth.md#sending-limits).

## Why use emails

* **Better deliverability:** Emails sent from your own domain are more likely to reach the inbox instead of spam.
* **More trust:** Users see your domain in the `From` address, reinforcing credibility.
* **Consistent branding:** Emails match your product identity.
* **Managed setup:** Lovable verifies your domain and configures the required DNS records.
* **Authenticated sending:** Lovable automatically sets up [SPF, DKIM, and DMARC](#what-are-spf-dkim-and-dmarc-and-do-i-need-to-configure-them) to authenticate your emails and improve inbox placement.
* **Continuous monitoring:** Lovable keeps checking your DNS records after verification and marks the domain **Offline** if they change.

## Prerequisites

To use emails:

* Lovable sends app emails from your app's server code. [TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start) projects include their own server, so they don't need the [built-in backend](https://docs.lovable.dev/features/cloud). React + Vite projects need the built-in backend enabled, because their server code runs there. If your project is on React + Vite, you can [upgrade it to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md).
* Authentication emails need the built-in backend, because Lovable sends them through Lovable Auth.
* Lovable may still send through the built-in backend for projects that first set up emails before August 14, 2026. Keep it enabled on those projects.
* Your workspace must be on a paid plan.
* You must own a domain and have access to manage its DNS settings.
* You must be a workspace admin or owner to add, delete, or verify domains.

## How emails work

When you configure an email domain, Lovable:

* Creates a transactional sender subdomain under your root domain, such as `notify.yourdomain.com`
* Guides you through DNS configuration using an automated setup flow
* Verifies your domain by checking required DNS records
* Provides six built-in branded authentication email templates that you can generate and customize
* Generates custom app email templates based on the functionality you request, such as confirmations, notifications, and updates
* Activates email delivery once DNS verification completes

After domain verification, emails are sent from your domain.

### Email domain scope and usage

Email domains are provisioned at the workspace level.

* A workspace can have multiple email domains
* A verified domain can be used across multiple projects
* Each project selects which verified domain it uses
* Only one email domain can be active per project at a time
* Only domains with status **Verified** can send emails
* Emails can be enabled or disabled per project

## Add an email domain

Select the domain you want to use for sending emails. This will be the domain your users see in their inbox.

There are two ways to start:

* **From the project chat**: Ask Lovable to set up emails and it will present a setup button. For example:
  ```text wrap theme={null}
  I want to send password reset emails from my domain.
  ```
* **From the Emails view**: Go to **More → Emails** and click **Get started**. This takes you to the email setup flow.

**1. Set an email domain**

* Choose an existing workspace domain from the dropdown, or select **Add a new email domain**, then enter your root domain or subdomain, for example `yourdomain.com`.
  > [!NOTE]
  >
  > Domains can have up to 5 levels, for example `a.b.c.example.com`.
* Click **Continue**.

**2. Configure the sender subdomain**

Configure the subdomain prefix that will be used for sending emails. The right-side preview shows a simulated inbox with example emails from your configured domain.

* By default, Lovable creates a `notify` subdomain for delivery, for example `noreply@notify.yourdomain.com`, but you can change the subdomain.
* Optionally, enable **Show as sent from @yourdomain.com** so recipients see emails from `@yourdomain.com` in their inbox, while your transactional sender subdomain handles delivery behind the scenes.
* Click **Set up domain**.

> [!NOTE]
>
> The subdomain prefix must:
>
> * Use only lowercase letters, numbers, and hyphens
> * Not start or end with a hyphen
> * Be between 1 and 63 characters
> * Differ from the first part of your domain. For example, on `mail.yourdomain.com` you cannot use the `mail` prefix.

**3. Complete DNS configuration**

After clicking **Set up domain**, Lovable launches an **automated DNS configuration flow** (powered by Entri) that guides you through setting up the required `NS` zone delegation for your domain.

If your DNS provider is not listed or you prefer manual control, you can configure DNS records yourself. Scroll to the bottom of the **Select your domain provider** Entri modal and choose **Go to our manual setup**.

Both the automated and manual methods require verifying ownership of your domain. Lovable will provision your domain and generate the required DNS records.

> [!WARNING]
>
> If you close the Entri window before finishing, Lovable removes the domain setup you just started and you have to begin again. To add the records yourself, choose **Go to our manual setup** instead of closing the window.

For DNS providers that can't hold `NS` records on subdomains, such as Hostinger and Wix, Lovable skips the Entri flow and shows **Your DNS provider can't hold these records**. See [My DNS provider doesn't support NS records for subdomains](#my-dns-provider-doesnt-support-ns-records-for-subdomains).

**Automatic setup**

Follow the on-screen prompts to log in to your DNS provider and authorize Entri to update your DNS records.

**Manual setup**

1. Copy the displayed DNS records.
   * `TXT` record for domain verification
   * `NS` records pointing to Lovable's nameservers
   * `_dmarc` `TXT` record, if you enabled **Show as sent from @yourdomain.com**
2. Track your progress with the **I have copied X/Y records** counter.
3. Add the copied DNS records directly into your domain registrar or DNS provider.

> [!WARNING]
>
> Add the `NS` records as **records inside your DNS zone** for the subdomain host shown (for example `notify`). Do not replace your domain's nameservers at your registrar. Replacing the registrar-level nameservers takes your entire website and email offline.

You can also forward these instructions to a colleague if someone else manages your DNS.

**4. Wait for verification**

After DNS is configured, you're taken back to the **Emails** page in your project.

A progress panel shows the current state of your domain setup and an estimated wait while DNS verification completes. See [Email domain statuses](#email-domain-statuses) to learn what each status means.

> [!NOTE]
>
> DNS changes typically propagate within a few hours, but may take up to 72 hours.

While DNS verification is in progress, you can start setting up your authentication and app email templates. See [Generate and customize email templates](#generate-and-customize-email-templates) for more information.

Lovable automatically detects when DNS verification completes and activates your domain.

Once the domain status changes to **Verified**, emails begin sending from your domain.

> [!NOTE]
>
> Newly provisioned domains start with a neutral reputation. Initial deliverability may fluctuate while your domain builds trust with inbox providers through consistent, legitimate sending. See [Email deliverability best practices](#email-deliverability-best-practices) for more information.

## Email domain statuses

Email domains can move through the following statuses:

| Status | Meaning |
| :- | :- |
| **Pending** | Setup has started and DNS configuration is in progress |
| **Verifying** | DNS records have been detected and verification is in progress |
| **Setting up** | Domain provisioning in progress |
| **Verified** | Domain is ready and can be used to send emails |
| **Offline** | Required DNS records were changed or removed after verification |
| **Failed** | Verification or setup failed, or did not complete within one to two weeks. See [Domain verification is stuck or shows "Failed"](#domain-verification-is-stuck-or-shows-failed) |
| **Removed** | The domain was deleted from the workspace |

> [!WARNING]
>
> Domains are continuously monitored. If required DNS records drift, are removed, or expire, the domain may move to an inactive state until re-verified.

## Generate and customize email templates

The **Emails** page includes two tabs, **Auth emails** and **App emails**, where you can preview the generated templates for your app. The **Auth emails** tab appears only when your project has a backend, either the built-in backend or your own Supabase project. Email templates are not generated automatically.

To generate email templates:

* **Auth email templates**\
  Go to the **Auth emails** tab and click **Customize auth emails**. Lovable generates six built-in branded templates.
* **App email templates**\
  Ask Lovable to add the required functionality, such as notifications, confirmations, or receipts. It will generate the corresponding email templates for you. For example:
  ```text wrap theme={null}
  Add order confirmation emails to my app. When an order is placed, send a confirmation email to the customer.
  ```

Each template shows:

* **From** address
* **Subject** line
* **Live preview** of the email template rendered in an iframe
* **Send test** options, including sending a test email to your account or to a custom address.
  > [!NOTE]
  >
  > Emails sent from newly configured domains may initially land in spam while reputation builds.

### Automatic branding

When generating the email templates, Lovable applies your app's branding automatically by:

* Extracting your app's CSS variables (primary colors, fonts, border radius)
* Detecting logo files in your app's public and asset folders
* Uploading a detected logo to a dedicated email assets storage bucket
* Adapting email copy to match your app's tone and language

The outer email body background is always `#ffffff` to ensure consistent rendering across email clients. Inner components can use your brand colors.

### What you can customize

You can ask Lovable to update:

* Copy and tone
* Brand colors
* Layout and structure
* Images and logo placement
* Subject lines

> [!WARNING]
>
> The outer email body background must remain white (`#ffffff`) to ensure consistent rendering across email clients. Inner components can use your brand colors.

For example:

```text wrap theme={null}
Match the emails to my brand by using #2563eb for buttons and headings, add my logo at the top, remove emojis, make the tone professional but friendly, move the button higher in the layout, add a footer with support@myapp.com, and update subject lines to start with my app name.
```

Lovable updates templates while preserving required information, such as authentication variables, secure callback links, and the unsubscribe footer.

### Edit templates manually

You can also edit the template files directly. Where they live depends on how your project was built, so ask Lovable to point you at them:

```text wrap theme={null}
Show me my email template files
```

Whichever way you edit them:

* Required authentication variables and callback links must remain intact, or authentication flows will break.
* Lovable appends the unsubscribe footer to app emails. For projects created on or after July 9, 2026, Lovable also hosts the unsubscribe page. Older projects include the unsubscribe page in the app itself. Don't add your own unsubscribe links or opt-out text to the templates.
* Templates use React Email components with inline styles, because email clients do not support external CSS.

On some projects, edits to template files or subject lines only take effect after a redeploy. If your changes aren't showing up, ask Lovable to redeploy:

```text wrap theme={null}
Redeploy my email templates
```

## Managing email domains

In **More → Emails**, use the domain dropdown to access:

* **Analytics and logs**: View delivery metrics for the email domain and email activity for the current project using that domain.
* **Manage domains**: View all workspace email domains and their status badges, inspect and copy DNS records, switch which domain the current project uses (**Use for this project**), verify a domain (**Verify domain**), add a domain, or delete a domain (**Delete domain**).
  > [!WARNING]
  >
  > Deleting a domain removes it for the whole workspace. Lovable refuses to delete a domain that other projects still use, so switch those projects to another domain first. The project you delete it from falls back to the default Lovable auth sender, and its app emails stop sending.
* **Add domain:** Add a new workspace email domain.
* **Disable emails** (or **Enable emails** when emails are disabled): Enable or disable emails for the current project. When disabled, authentication emails continue sending using the default Lovable auth sender instead of your custom email domain and templates, and other app emails stop sending.

### Analytics and logs

The analytics and logs view shows delivery metrics for the connected domain over 7, 30, or 90 days, and a log of recent emails sent for the current project.

* **Metrics cards**:
  * **Sent**: Emails accepted and queued for delivery
  * **Delivered**: Emails successfully delivered to recipient inboxes
  * **Bounced**: Emails rejected by the recipient mail server
* **Delivery chart**: Delivered and failed emails for the email domain, per hour for the 7-day range and per day for longer ranges. Hover over any point to see the exact counts.
* **Email activity log**: An expandable list of recent emails sent for the current project, showing recipient, status, type, and time, with execution traces and error messages for failures.

## Email deliverability best practices

When sending emails from a new domain, inbox placement may take time to stabilize. Inbox providers evaluate sender reputation over time based on engagement, authentication, and sending patterns.

Follow these practices to improve deliverability and build a strong sender reputation.

> **Warm up new domains gradually**
>
> New email domains have no sending history. Inbox providers treat them cautiously because spammers often use fresh domains and abandon them quickly.
>
> Initial deliverability may fluctuate during the first few days or weeks. This is normal.
>
> Your domain's reputation builds gradually as real users engage with emails. This includes:
>
> * Authentication emails: Signups, password resets, email verifications
> * App emails: Order confirmations, shipping notifications, account updates
>
> Both email types contribute to your overall domain reputation.
>
> Using a dedicated transactional subdomain helps isolate authentication traffic and protect your primary domain reputation.
>
> **Typical timeline**
>
> * First few days: Test emails may land in spam
> * First few weeks: Deliverability improves as legitimate traffic builds reputation
> * First few months: Reputation stabilizes with consistent, engaged sending
>
> **What helps:**
>
> * Start sending with normal authentication traffic (user signups, password resets)
> * Let volume grow naturally as your user base expands
> * Add app emails gradually as transaction volume grows
> * Maintain consistent sending patterns over weeks and months
> * Ensure emails are expected and triggered by real user actions
> * Mark legitimate emails as “Not spam” in your inbox
>
> **What hurts:**
>
> * Sudden large spikes in email volume from a brand-new domain
> * Sending bulk test emails immediately after setup
> * Inconsistent sending (long gaps followed by sudden bursts)
> * Panic-driven changes to domains or sender identity
>
> Reputation builds automatically with consistent, legitimate sending behavior over time.

> **Ensure domain authentication is valid**
>
> Authentication must pass for emails to reach the inbox. Lovable automatically configures `SPF`, `DKIM`, and `DMARC` when you set up your email domain.
>
> If DNS records are modified or misconfigured, authentication can fail and emails may land in spam.
>
> Always confirm the domain status is **Verified** in **More → Emails**.

> **Send only legitimate, user-triggered emails**
>
> Authentication emails should only be triggered by real user actions, such as signing up or resetting a password.
>
> App emails should only be sent when directly related to user activity, for example:
>
> * Order confirmations: Only to the customer who placed the order
> * Shipping notifications: Only to customers with active shipments
> * Account updates: Only to users who made changes or need to be notified
>
> Avoid generating artificial traffic for testing or automation purposes. Unnatural traffic patterns can negatively affect domain reputation.
>
> Don't send to:
>
> * Email addresses that previously bounced
> * Users who unsubscribed from non-essential notifications
> * Inactive or closed accounts

> **Keep authentication and app emails strictly transactional**
>
> Authentication emails should clearly match the user's recent action and explain why the email was sent.
>
> App emails should focus on information relevant to the specific transaction or event.
>
> **Good practices**:
>
> * Use straightforward subject lines ("Reset your password", "Verify your email")
> * Include all necessary details (order numbers, tracking links, amounts, dates)
> * Clearly explain what the user needs to do
> * Match the email to the action the user took
>
> **Avoid**:
>
> * Adding marketing content or upsells to auth emails
> * Misleading or clickbait subject lines
> * Promotional language in authentication emails
>
> Mixing promotional content into transactional emails can trigger spam filters and reduce trust.

> **Maintain consistent sender identity**
>
> Use a consistent:
>
> * From address
> * Sender name
> * Domain
>
> Frequent changes to sender identity reduce trust signals with inbox providers.

> **Include unsubscribe options in app emails**
>
> Authentication emails (password resets, email verification, magic links) don't require unsubscribe links as they're necessary for service functionality.
>
> Lovable automatically adds unsubscribe functionality to all app email templates. When a user unsubscribes, their email is added to a suppression list and future app emails to that address are blocked automatically before sending. Don't remove the unsubscribe footer as this violates email sending requirements and will affect deliverability.

> **Avoid spam-trigger formatting**
>
> When customizing email templates:
>
> **Do**:
>
> * Use clear, descriptive subject lines ("Your order has shipped", "Reset your password")
> * Keep formatting simple and clean
> * Use a balanced text-to-image ratio
> * Include your brand name and a recognizable sender address
> * Ensure links in the email match your sending domain whenever possible
>
> **Don't**:
>
> * Use ALL CAPS in subject lines
> * Add excessive punctuation (!!!)
> * Create misleading subject lines
> * Use image-heavy layouts
> * Link to unrelated or mismatched domains
>
> Inbox providers look for consistency between the sender domain and the domains used in links. If your email is sent from `yourdomain.com`, links inside the email should ideally point to `yourdomain.com` or its subdomains. Mismatched domains are commonly used in phishing attacks and may trigger spam filtering.
>
> Clear, predictable formatting and domain alignment improve trust and engagement.

> **Monitor bounce rates and complaints**
>
> High bounce rates damage sender reputation.
>
> Use **Analytics and logs** to monitor:
>
> * Sent
> * Delivered
> * Bounced
>
> Hard bounces caused by invalid or mistyped addresses are especially harmful. Repeatedly sending to invalid addresses can reduce inbox placement.
>
> If bounce rates increase:
>
> * Review how email addresses are collected
> * Validate inputs at signup
> * Avoid retrying failed deliveries repeatedly
>
> Spam complaints also negatively affect reputation. Both authentication and app emails should always be expected and clearly explained.

> **Limit internal testing**
>
> The **Send test** option in **More → Emails** is useful for validation, but limit your testing.
>
> **Why this matters**:
>
> * Inbox providers evaluate engagement signals from all emails you send
> * Repeated test emails to the same address create artificial traffic patterns
> * Bouncing test emails to fake addresses damages your reputation
>
> **Better approach**:
>
> * Send a few test emails to yourself or your team
> * Use real email addresses you control
> * Avoid sending large batches of test emails

> **If emails land in spam**
>
> If authentication emails are marked as spam:
>
> 1. Confirm the domain status is **Verified**
> 2. Ensure DNS records are correctly configured
> 3. Review subject lines and content
> 4. Check bounce rates in **Analytics and logs**
> 5. Reduce sudden spikes in sending volume
> 6. Be patient. New domains need time to build trust with inbox providers
>
> Deliverability improves with consistent, legitimate sending behavior over time.

> **Encourage positive engagement signals**
>
> Inbox providers consider engagement when evaluating sender reputation.
>
> Authentication emails naturally generate positive signals when users:
>
> * Open the email
> * Click the verification or reset link
> * Complete the intended action
>
> App emails generate positive signals when users:
>
> * Open order confirmations to check details
> * Click tracking links in shipping notifications
> * Interact with account update information
>
> Clear messaging and expected flows increase engagement and improve long-term inbox placement.

> **Keep emails small and accessible**
>
> Gmail clips emails larger than 102 KB. Keep your total email size under 100 KB to ensure your content displays fully.
>
> **Best practices:**
>
> * Optimize images before embedding them in app emails
> * Avoid large embedded images in receipts or order confirmations
> * Keep order details and transaction information concise
> * Consider linking to images hosted on your domain instead of embedding large files
>
> Lovable includes plain text versions of emails automatically for accessibility and as a fallback for email clients that don't support HTML.

> **Avoid aggressive tracking for transactional emails**
>
> While link tracking and open tracking can be useful for measuring engagement with marketing emails, they can hurt deliverability for transactional emails.
>
> Why this matters: When a shipping notification or order confirmation link doesn't lead directly to your domain, it can make the email look suspicious to inbox providers.
>
> Recommendation: For app emails like order confirmations and shipping notifications, use direct links to your domain rather than tracking redirects whenever possible.

> **Understanding inbox provider algorithms**
>
> Inbox providers don't share their spam filtering criteria publicly (to prevent spammers from gaming the system). However, they generally evaluate:
>
> * **Sender authentication**: Are `SPF`, `DKIM`, and `DMARC` configured correctly? (Lovable handles this automatically)
> * **Sender reputation**: What's your history of bounces, complaints, and engagement?
> * **Content quality**: Are subject lines clear? Is formatting clean? Do links match your domain?
> * **Engagement signals**: Do users open emails? Click links? Reply? Or mark them as spam
> * **Sending patterns**: Are you sending consistently? Or in sudden bursts?
>
> Think: "What would a phisher do?" Then do the opposite. Inbox providers want to protect their users, so demonstrate at every step that you're a legitimate sender with no malicious intent.

## Troubleshooting

> **Email domain is stuck in "Pending" or "Verifying"**
>
> Possible causes:
>
> * DNS records not fully propagated
> * `NS` delegation incorrect
> * `TXT` verification record missing
> * DNS configured on wrong domain level
> * `NS` records for a parent domain, for example `hello.yourdomain.com`, already point to Lovable nameservers, so the sender subdomain's records are never found
>
> **What to do:**
>
> * Recheck the exact DNS records shown in **More → Emails**
> * Confirm records were added to the correct root domain
> * Wait up to 72 hours for propagation
> * Select **Verify domain** for the domain in **Manage domains** to start a new check instead of waiting for the next scheduled one
>
> If the domain stays in **Pending** or **Verifying** after the DNS records are correct and 72 hours have passed, see [Domain verification is stuck or shows "Failed"](#domain-verification-is-stuck-or-shows-failed).

> **Domain verification is stuck or shows "Failed"**
>
> Verification can stall, leaving the domain in **Pending**, **Verifying**, or **Setting up** even when your DNS records are correct and have propagated. A domain that stays unverified for one to two weeks moves to **Failed**.
>
> **What to do:**
>
> 1. Go to **More → Emails → Manage domains** and select **Verify domain** for the domain. For a domain in **Failed**, this restarts the domain setup. Allow up to 72 hours for verification to complete.
>
> 2. If the domain is still stuck, reset the setup. Select **Delete domain**, wait a few minutes, then add the same domain again with the same sender subdomain. If Lovable shows **This domain is still being removed**, wait a few more minutes and try again. In the **Select your domain provider** Entri modal, scroll to the bottom and choose **Go to our manual setup**.
>
> 3. Compare the `NS` and `TXT` records shown in the manual setup with the records at your DNS provider. Lovable generates the same records when you re-add a domain in the same workspace, so if they match, you don't need to change anything. If the nameservers differ from the ones you saw before, you entered a different domain or sender subdomain.
>
> 4. If the domain is still stuck after you re-add it, contact [Lovable Support](https://lovable.dev/support).
>
> > [!WARNING]
> >
> > Lovable refuses to delete a domain that other projects still use, so switch those projects to another domain first. While the domain is deleted, the project falls back to the default Lovable auth sender and its app emails stop sending.

> **Setup shows "Send path not ready" or "Timed out waiting for email delivery path verification"**
>
> After your domain is verified, Lovable sends a test message through the email delivery provider to confirm that the sender is accepted. If the provider doesn't accept it in time, the setup progress panel in **More → Emails** shows **Send path not ready** or **Timed out waiting for email delivery path verification**. The cause is usually on Lovable's side, not in your DNS records.
>
> **What to do:**
>
> * Select **Retry setup** in the progress panel.
> * If **Retry setup** fails again, contact [Lovable Support](https://lovable.dev/support) and include the domain name. Don't delete the domain or change your DNS records in the meantime.

> **Domain is already managed by another account or workspace**
>
> Setup fails with a message that the domain is already managed by, or owned by, another account or workspace. Lovable shows this when the domain was set up for email in another workspace, for example the workspace a project was remixed or moved from.
>
> The problem is ownership, not your DNS records. Keep your existing DNS records in place.
>
> **What to do:**
>
> * If you have access to the other workspace, delete the domain there. Lovable refuses to delete a domain that projects still use, so switch those projects to another domain first. See [What happens if I delete an email domain?](#what-happens-if-i-delete-an-email-domain).
> * Otherwise, contact [Lovable Support](https://lovable.dev/support) and ask them to release the domain.
> * After the domain is released, select **Verify domain** for the domain in **Manage domains**, or add the domain again through the manual setup flow. If the records shown match your existing DNS records, you don't need to change them.

> **My DNS provider doesn't support NS records for subdomains**
>
> Lovable requires `NS` records for the sender subdomain, for example `notify`, at your DNS provider. These records delegate the subdomain to Lovable, which lets Lovable create and maintain the `SPF`, `DKIM`, and `DMARC` records for it. Lovable has no alternative verification method:
>
> * `TXT`, `CNAME`, or `MX` records on the root domain cannot replace the `NS` records.
> * The manual setup flow replaces only the automated Entri flow. It requires the same `NS` and `TXT` records.
> * Use exactly the nameservers shown in Lovable. Verification fails with any other nameservers.
> * Choosing a different sender subdomain or enabling **Show as sent from @yourdomain.com** doesn't remove the requirement.
>
> For some providers, such as Hostinger and Wix, Lovable shows **Your DNS provider can't hold these records** during setup.
>
> **What to do:**
>
> * Move the domain's DNS to a provider that supports subdomain `NS` records, such as Cloudflare. Your domain can stay registered with your current registrar. Recreate your existing DNS records at the new provider before switching to its nameservers, then run the email setup again.
> * Alternatively, [transfer the domain to Lovable](https://docs.lovable.dev/features/transfer-domain.md) and Lovable manages its DNS for you.

> **Domain status shows Offline**
>
> This means required DNS records were changed, removed, or expired after verification.
>
> **What to do:**
>
> * Review DNS records in **More → Emails**
> * Restore missing `NS` or `TXT` records
> * Select **Verify domain** for the domain in **Manage domains**

> **Domain status shows "Removed"**
>
> The domain was deleted while this project was still using it. Go to **More → Emails → Manage domains**, connect a different verified domain to this project, or add and verify a new one.

> **Emails are not sending**
>
> Check:
>
> * Email domain is linked to your project
> * Domain status is **Verified**
> * Emails are enabled for the project
> * For authentication emails: Lovable Auth is enabled, and you are triggering a supported auth event type
> * The correct edge function is deployed
> * Your workspace has not reached its hourly sending limit. See [Availability and usage](#availability-and-usage).
>
> Use **Send test** on a template tab and check **Analytics and logs** for delivery failures or bounces.

> **High bounce rates in analytics**
>
> Common causes:
>
> * Invalid email addresses
> * Typos during signup
> * Repeated retries to invalid addresses
>
> Validate email input at signup and avoid retrying hard bounces.

> **Test emails are landing in spam**
>
> This is common for newly provisioned domains.
>
> Avoid sending large volumes of internal test emails. Allow organic user-triggered emails to build reputation over time.

> **My email template changes are not showing**
>
> If you edited template files but users are still receiving old versions:
>
> * On older React + Vite apps, ask Lovable to redeploy your email templates.
> * On newer apps built with TanStack Start, publish your app to apply the change.

> **Use external tools to investigate deliverability issues**
>
> If emails are consistently landing in spam or being rejected, you can use the following tools for deeper diagnostics.
>
> These tools are optional and most useful for higher-volume senders.
>
> * [Google Postmaster Tools](https://postmaster.google.com/)\
>   View sender reputation, spam rates, and authentication alignment for Gmail recipients.
> * [Yahoo Sender Hub](https://senders.yahooinc.com/)\
>   Monitor complaint rates and sender reputation for Yahoo inboxes.
> * [Spamhaus blocklist lookup](https://check.spamhaus.org/)\
>   Check whether your domain, IP address, or email URLs appear on major blocklists.
> * [Google Safe Browsing](https://transparencyreport.google.com/safe-browsing/search)\
>   Test links used in your emails to ensure they are not flagged as unsafe.
>
> These tools help diagnose reputation or blocklist issues that may impact inbox placement.

## FAQ

> **What is the difference between authentication emails and app emails?**
>
> **Authentication emails** are a type of transactional email related to account access and identity verification. They are automatically triggered by Lovable Auth when users perform specific security-related actions, such as sign up, reset a password, or accept an invite. Lovable provides six built-in templates that you can generate when needed.
>
> **App emails** are a type of transactional email sent in response to user activity or events in your app. They are triggered by your application logic when something happens, like a purchase or update. There are no built-in templates, you decide when to send them and what they contain. Ask Lovable to add the functionality, such as notifications, confirmations, receipts, and other updates, and it will generate the templates for you.

> **Do I need to set up different domains for authentication and app emails?**
>
> No. Both email types use the same custom domain and the same setup process.

> **Can I send marketing emails?**
>
> No. Only transactional emails are supported, such as signup confirmations, password resets, order confirmations, and shipping notifications.
>
> Marketing emails, such as newsletters, promotional emails, product announcements, and similar messages are not supported.

> **Do emails require the built-in backend?**
>
> Not always. [TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start) projects include their own server, so Lovable sends their app emails without the built-in backend. React + Vite projects need the built-in backend, and so do authentication emails on any project, because Lovable sends them through Lovable Auth. Lovable may still send app emails through the built-in backend for projects that first set up emails before August 14, 2026, so keep it enabled on those.

> **Do I need a custom web domain to use an email domain?**
>
> No. Your web custom domain controls where your app is hosted. A custom email domain controls which domain your emails are sent from.
>
> These are separate configurations because web hosting and email delivery use different DNS records and infrastructure.
>
> You can use a completely different root domain for email sending as long as you control its DNS. However, using a domain that aligns with your product brand is recommended for user trust and deliverability.
>
> Hosting your app on a custom domain does not automatically configure email sending.

> **Can I use a subdomain for email sending?**
>
> Yes. Lovable automatically creates a transactional subdomain such as `notify.yourdomain.com` for delivery.
>
> You can optionally display emails as coming from your root domain while delivery happens through the subdomain behind the scenes.
>
> Using a dedicated email subdomain is recommended because it helps protect your root domain's reputation.

> **Do I need an external email provider like SendGrid or Resend?**
>
> No. Lovable manages domain verification, DNS configuration, authentication records such as `SPF`, `DKIM`, and `DMARC`, and delivery infrastructure. You do not need to manage API keys or third-party email provider accounts.

> **What are SPF, DKIM, and DMARC, and do I need to configure them?**
>
> `SPF`, `DKIM`, and `DMARC` are email authentication standards that help inbox providers verify that your emails are legitimate and not spoofed.
>
> When you send an email, providers such as Gmail or Outlook check that:
>
> * The email is authorized to be sent from your domain
> * The message has not been altered in transit
> * The domain owner has defined a policy for handling suspicious emails
>
> If authentication fails, emails may be marked as spam, rejected, or damage your domain reputation.
>
> Lovable automatically configures and maintains:
>
> * **SPF (Sender Policy Framework):** Authorizes which servers can send email for your domain
> * **DKIM (DomainKeys Identified Mail):** Cryptographically signs emails to prevent tampering
> * **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** Defines how providers handle failed authentication and protects against spoofing
>
> You do not need to manually configure these records. Lovable sets them up during domain verification and continuously monitors them. If authentication records are modified, removed, or expire, the domain status changes to **Offline** until you restore them.

> **How many emails are included per month?**
>
> Each paid workspace includes **50,000 transactional emails per month** at no additional cost. Usage is calculated across the entire workspace. Additional emails are billed 4 credits per 1000 emails.

> **Can I use emails on the free plan?**
>
> No. Emails are available on **paid plans only**. Free plans use the default Lovable auth sender.

> **How long does DNS verification take?**
>
> DNS changes typically propagate within a few hours, but can take up to 72 hours.
>
> You can check the domain status in **More → Emails**. The status updates automatically once verification completes.

> **Why are my emails going to spam?**
>
> New email domains start with no sending reputation.
>
> If emails land in spam:
>
> • Confirm the domain status is **Verified**\
> • Ensure DNS records have not changed\
> • Avoid sudden spikes in sending volume\
> • Avoid spam-trigger formatting\
> • Check bounce rates in **Analytics and logs**
>
> Deliverability improves over time with consistent, legitimate user activity.

> **Can I customize the email templates?**
>
> Yes. You can customize:
>
> * Copy and tone
> * Brand colors
> * Layout and structure
> * Logos and images
> * Subject lines
>
> You can ask Lovable to update the templates or edit the template files directly. Where the files live depends on how your project was built, so ask Lovable to show you where they are.
>
> Required authentication variables and callback links must remain intact in auth emails. Lovable adds the unsubscribe footer to app emails itself, so don't add your own unsubscribe links or opt-out text.
>
> The outer email body background must remain white (`#ffffff`) to ensure consistent rendering across email clients. Inner components can use your brand colors.

> **What happens if I disable emails?**
>
> If emails are disabled for a project, authentication emails continue sending using the default Lovable auth sender instead of your branded templates. App emails stop sending.

> **What happens if I delete an email domain?**
>
> Deleting an email domain removes it for the whole workspace. Lovable refuses to delete a domain that other projects still use, so switch those projects to another domain first.
>
> The project you delete it from falls back to the default Lovable auth sender, and its app emails stop sending.


## Related topics

- [Explore changes with drafts](https://docs.lovable.dev/features/drafts.md)
- [Publish apps with branded URLs](https://docs.lovable.dev/features/branded-workspace-urls.md)
- [Verify a domain for your workspace](https://docs.lovable.dev/features/verified-domains.md)
- [Connect your app to Resend](https://docs.lovable.dev/integrations/resend.md)
- [Connect your app to Mailgun](https://docs.lovable.dev/integrations/mailgun.md)
