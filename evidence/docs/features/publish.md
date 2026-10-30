# Publish your Lovable project
<!-- source: https://docs.lovable.dev/features/publish.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish your Lovable project

> Deploy your project to a live URL, control who can access the published app, configure site metadata, and update or unpublish at any time.

Publishing turns your Lovable project into a live web app by deploying a snapshot to a URL you can share. Lovable [hosts the published app](https://docs.lovable.dev/features/hosting.md) for you: no servers to set up, and HTTPS included. Only the current version is deployed. You can control who can access the published app, and the options depend on your plan.

## Quick start: publish your first project

Publishing takes two clicks, and the defaults work for most projects:

**1. Click Publish**

In your project, click the **Publish** button in the top-right corner of the editor, next to **Share**. On narrow windows it collapses to an icon without a label.

**2. Click Publish again**

The dialog suggests a website address ending in `lovable.app` and runs a quick security scan. Keep the defaults and click **Publish**, or adjust the address and [audience](#who-can-see-your-published-app) first. When the deploy finishes, Lovable shows your live link.

Lovable generates your site title, description, and icon while it builds your app. To change them, ask Lovable in the project chat. To check how each page appears in link previews and search results, see [Site metadata is generated for you](#site-metadata-is-generated-for-you).

To push later changes, open the same dialog and click **Publish changes**. The rest of this page covers publishing from the project chat, every dialog option, site metadata, republishing and unpublishing, and who can publish, unpublish, and view your app.

To continue from publishing to a live site on your own domain, follow the guide [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md).

## Publish from the project chat

You can also ask Lovable to publish a project you can edit from [Chats](https://docs.lovable.dev/features/chats.md#plan-test-or-publish).

You can also ask Lovable in the project chat to publish for you instead of opening the Publish dialog. Try prompts like:

```text wrap theme={null}
Publish my app
```

```text wrap theme={null}
Deploy this project
```

```text wrap theme={null}
Ship it
```

```text wrap theme={null}
Go live
```

To request a specific Lovable subdomain:

```text wrap theme={null}
Publish to my-todos.lovable.app
```

Lovable respects all publish-related workspace settings and permissions. It checks your publish settings, runs the [Quick scan](https://docs.lovable.dev/features/security#quick-scan) checks on the version it publishes, and schedules the deploy.

Lovable asks for approval before publishing unless you have set the publish tool to auto-approve. You can also ask Lovable in the project chat to change who can see your site or connect a [custom domain](https://docs.lovable.dev/features/custom-domain.md). It applies visibility changes before publishing and asks you to confirm before connecting a domain. To unpublish, use one of the [options in the UI](#how-to-unpublish-your-project).

Publishing from the project chat is treated as standard build usage and consumes credits.

## The Publish dialog, step by step

The [quick start](#quick-start-publish-your-first-project) covers the defaults. This section walks through every option in the dialog, which shows everything on one page: your website URL, who can see the website, and a security check.

**1. Open the Publish dialog**

In your project, click the **Publish** button in the top-right corner. By default, editors and above can [publish projects](#who-can-publish-and-unpublish-projects).

When the publish dialog opens, Lovable automatically runs a [Quick scan](https://docs.lovable.dev/features/security#quick-scan) in the background. The scan takes about 10 seconds and checks your database access rules, including row-level security (RLS) policy mistakes, your dependencies, and MCP server exposure.

**2. Set your website address**

* On a first publish, edit the suggested URL directly in the **Website URL** field, or keep it as is. By default, your app is published to `[url-subdomain].lovable.app`, using your project's [URL subdomain](https://docs.lovable.dev/features/projects/settings.md#details).
  > [!NOTE]
  >
  > On Business and Enterprise plans, you can publish apps under a workspace-branded URL pattern, such as `app-name.workspace-subdomain.lovable.app`. Branded app URLs create a consistent workspace-level URL structure across all published apps and are configured in [**Workspace settings → Workspace → Branded app URLs**](https://lovable.dev/settings/workspace). See [Publish apps with branded URLs](https://docs.lovable.dev/features/branded-workspace-urls.md) to set this up.
* When published, you can add a [custom domain](https://docs.lovable.dev/features/custom-domain.md) (available on paid plans), or change the subdomain later in [**Project settings → URL subdomain**](https://docs.lovable.dev/features/projects/settings.md#details).
* On the Enterprise plan, if your workspace has a [publishing domain](https://docs.lovable.dev/features/publishing-domain.md), projects without a custom domain get a suggested address under it.
* While Lovable is still setting up a custom domain you bought, or the first custom domain you connected for the project, the dialog shows that domain under the **Website URL** field with a note that it is still being set up. Lovable publishes your app to the `lovable.app` address until the domain is **Live**. The note disappears if the setup has not progressed for 72 hours.

**3. Choose who can see the website**

Select the visibility row below the URL (for example, **Visible to anyone with the link**) to open the audience picker. Depending on your plan, you can control who can see the website:

* **Public**: anyone with the URL can visit the published app (public website access)
* **Workspace** (Business and Enterprise plans): only logged-in workspace members can visit the published app (private website access)
* **Invite only** (Free and Pro plans): grant access to workspace members by name, or to people outside your workspace invited by email. See [Invite people outside your workspace](#invite-people-outside-your-workspace).
* **Custom** (Business and Enterprise plans): grant access to the whole workspace, specific people, [groups](https://docs.lovable.dev/features/groups.md), or people outside your workspace invited by email. See [Invite people outside your workspace](#invite-people-outside-your-workspace).
* Your organization (Enterprise workspaces in an [organization](https://docs.lovable.dev/features/organizations), shown with the organization's name): members of every workspace in the organization can visit the published app after logging in. See [Publish to your organization](#publish-to-your-organization).

Audience edits take effect when you select **Publish** (or **Publish changes** on a published project). See [Who can see your published app](#who-can-see-your-published-app) for how website access works on each plan.

**4. Check the security scan result**

The dialog shows the outcome of the **Quick scan** on a single line: **Running quick security scan** while it runs, **No security issues found** when it passes, or the number of findings to review. Critical findings show as, for example, **2 critical security issues found**, and lower-severity findings as **3 security findings**. The count includes findings from your latest Deep scan as well. If there is no scan result to show yet, the line reads **Run security scan**.

* If the scan finds issues, click the line to open the Security view, where you can review and fix them. Findings do not block publishing by default, but you should resolve critical issues before making your app available.
* The dialog does not run the **Deep scan**. Run it from the Security view when you want deeper coverage before publishing.

The Deep scan is an optional in-depth review of your application code that usually takes 3 to 13 minutes, and at most 15. It looks for vulnerabilities such as exposed secrets, unsafe input handling, and authorization gaps.

See [Security overview](https://docs.lovable.dev/features/security) and [Project security view](https://docs.lovable.dev/features/security-view.md) for scanner details.

> [!TIP]
>
> **Publishing controls**
>
> Workspace admins and owners can enforce stricter publishing rules in [**Workspace settings → Security → Privacy & security**](https://lovable.dev/settings/privacy-security) to help ensure insecure applications are never deployed. **Block publishing with critical issues** prevents publishing while critical findings are unresolved. When it is enabled and the scan finds critical issues, the dialog shows **Fix security issues to publish** until you resolve them. New Enterprise workspaces that Lovable creates start with it enabled. See [Block publishing with critical issues](https://docs.lovable.dev/features/privacy-and-security-settings.md#block-publishing-with-critical-issues).

**5. Publish your project**

When ready, click **Publish**. When the deployment is complete, Lovable confirms **Your website is live** with buttons to copy the link and visit the site, and a preview of how your site appears in search results. Click **Edit** next to your site's title to check or change any page's [social and search appearance](#site-metadata-is-generated-for-you).

The dialog can also show notices before you publish, for example:

* **Build errors need fixing**: your latest changes failed to build, so the dialog shows **Try to fix** instead of the publish button. Fix the build errors, then publish.
* **Your app is under high load**: your built-in database is running low on resources. The notice appears below the security scan line and does not block publishing. Click it to open **Review project setup**, then click **Resolve** to have Lovable find the likely cause and suggest query or code changes. See [Check your database's resource health](https://docs.lovable.dev/features/database-performance.md#check-resource-health).

After publishing your project, you can continue to iterate on it. To push updates later, open the dialog again and click **Publish changes**.

> [!TIP]
>
> After publishing publicly, rerun your [SEO review](https://docs.lovable.dev/features/seo-aeo.md) to unlock live checks for indexing, AI-search readiness, and Google Search Console setup.
>
> If you connect a custom domain, rerun the review so Lovable can help verify your domain in Google Search Console and submit your sitemap.

## Site metadata is generated for you

Lovable generates your site's metadata while it builds your app: the site title, **meta description**, and site icon (**favicon**) shown in browser tabs and search results. The social sharing image (**OG image**) shown in link previews is chosen when your site is served: Lovable uses an image you've asked it to set, or the latest screenshot of your app. Sites that aren't publicly visible don't get an automatic social sharing image. To change any of it, ask Lovable in the project chat:

```text wrap theme={null}
Change my site title to "Acme Task Tracker", write a meta description about team to-do lists, and generate a new social sharing image.
```

> [!NOTE]
>
> Metadata is set per page, not once for the whole site. Lovable generates a unique title and description for every page of your app based on its content, and a page can have its own social sharing image too. That is why viewing and changing metadata goes through chat, where you can also target a specific page, for example: "Update the meta description of the pricing page."

Metadata edits are treated as standard build usage and consume credits, like any other build request. Like any other edit, a metadata change reaches your live site on the next publish. When the project is already published, Lovable ends its reply with a **Publish to update the live site** button so you can publish from the project chat.

To check the result, open the [page selector](https://docs.lovable.dev/features/projects/preview.md#preview-controls) above the preview: each page has a **Social** card showing how the page looks when shared and a **Search** card showing how the page appears in search results.

You can also reach the **Social** and **Search** cards while publishing:

* In the Publish dialog, open the **⋮** menu in the top-right corner and select **Social & search appearance**, or click the favicon next to the website URL. Both options work whether or not your site is published yet.
* Right after you publish, the **Your website is live** screen previews how your site appears in search results. Click **Edit** next to your site's title to open the **Social** and **Search** cards in the page selector.

See [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md) for more information on optimizing your Lovable apps for search engines, social media previews, and AI systems.

## Republish to make new changes live

Each time you publish, Lovable deploys a snapshot of your project to a live URL. Only the current version is deployed, and later changes are not automatically pushed live: when you keep working on a published project, republish to update your live app. To deploy new changes, click **Publish**, then **Publish changes**.

Accepting a [draft](https://docs.lovable.dev/features/drafts.md) is not publishing. When you accept a draft, its edits join your project's unpublished changes, and visitors see them only after you publish the project.

When your published project has changes that are newer than the live version, a small dot appears on the **Publish** button. It tells you at a glance that you have updates to deploy, without opening the dialog. The dot clears once you publish. It stays hidden when there is nothing new to publish, and when you do not have permission to publish.

## How to unpublish your project

You can unpublish and remove your live app in three ways:

* Go to [**Project settings → Publishing → Unpublish project → Unpublish**](https://docs.lovable.dev/features/projects/settings.md#publishing)
* Click **Publish**, open the **⋮** menu in the top-right corner of the dialog, and select **Unpublish**
* Unpublish several projects at once from the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#select-several-projects-at-once): select the projects, open the **⋯** menu in the toolbar, select **Unpublish**, review the projects Lovable includes, and confirm

After you unpublish:

* The live URL becomes inaccessible
* Your project remains in the editor

Lovable can also unpublish a project in a Free workspace after 12 months without visits or workspace-owner logins. See [Does my published site expire?](#does-my-published-site-expire)

> [!NOTE]
>
> This section is about unpublishing, which takes the live app offline while the project stays in your workspace. Looking for a way to remove the project itself? See [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md). The two are different actions.

## Who can publish and unpublish projects?

By default, **editors and above** can publish projects on all plans. Unpublishing takes the same permission, so anyone who can publish a project can also take it offline. You do not have to be the person who published it.

Workspace admins and owners can publish and unpublish a project they were never invited to:

* **Owners**: every project in the workspace, including [Restricted](https://docs.lovable.dev/features/project-visibility.md#project-access-options) ones.
* **Admins**: every project except a Restricted one they were not invited to.

On Enterprise plans, admins and owners can set [workspace policies](https://docs.lovable.dev/features/workspace-policies.md) that require approval before publishing or block it. See [Request approval to publish](#request-approval-to-publish) for what you see when a policy applies. A policy never stops you from taking a live app offline: approvals and blocks apply to publishing only.

## Request approval to publish

On Enterprise workspaces, a [workspace policy](https://docs.lovable.dev/features/workspace-policies.md) can require an admin or owner to approve before you publish, for example when the app uses a connector or when the app is public. The publish dialog shows **Publish requires approval** and the policy's name.

**1. Request approval**

Select **Request approval** and write a short note for the approvers: what the app is for and why it should go live now. Approvers see the note and a screenshot of the app, so a specific note speeds up the answer. The dialog shows how many admins and owners receive the request.

**2. Send the request**

Select **Send request**. The dialog shows **Publish request pending**. Every admin and owner of the workspace receives a notification in Lovable and by email.

**3. Wait for the decision**

You get a notification in Lovable when an approver approves or denies the request. After a denial you also get an email with the reason. After an approval you get an email when the app is live.

While the request waits, you can keep editing and previewing the app. To add changes to the request, open it with **View** and select **Update request**. To withdraw it, select **Cancel request**.

After an approval, Lovable publishes the app, and the dialog shows **Request approved**. The dialog also shows **Publish** (or **Publish changes** on an app that is already published). Select it to publish now instead of waiting for Lovable.

The approval covers this app the next times you publish, until something the policy checks changes, such as a new connector or a change in who can view the app. For public apps, it lasts for the time your workspace set. See [How approvals work](https://docs.lovable.dev/features/workspace-policies.md#how-approvals-work).

After a denial, the dialog shows **Publish request denied** with the approver's reason. Make the changes they asked for and select **Request again**. A request that no admin or owner approves or denies within 30 days expires, and the dialog shows **Publish request expired**. Nothing is published, and you can request again.

If the dialog shows **Publishing is blocked by workspace policy** instead, your workspace does not allow publishing this way. See [Publishing is blocked by workspace policy](#publishing-is-blocked-by-workspace-policy) in Troubleshooting.

## Who can see your published app

Website access control depends on your plan. You choose who can access your published app from the visibility row in the publish dialog, which opens the **Who can view your site?** picker. Audience edits don't take effect while you edit. When you select **Publish** (or **Publish changes** on a published project), Lovable updates who has access and sends any invite emails.

### Free and Pro plans

The picker has two options:

* **Public**: Anyone with the URL can visit your published app. This is the default.
* **Invite only**: Only people you add can visit the published app, after logging in. Add workspace members by name, or invite people outside your workspace by email. You can invite up to 10 people per project. See [Invite people outside your workspace](#invite-people-outside-your-workspace).

The project owner, workspace owners, and people the project is shared with directly can always open an invite-only site. Publishing to your whole workspace or to [groups](https://docs.lovable.dev/features/groups.md) requires a Business or Enterprise plan.

### Business and Enterprise plans

The picker has three options, and Enterprise workspaces in an organization have a fourth:

* **Public**: Anyone with the URL can visit your published app. This is external publishing.
* **Workspace** (shown with your workspace name): Only workspace members can visit the published app after logging in. This is internal publishing.
* **Custom**: You compose the exact audience: the whole workspace, [groups](https://docs.lovable.dev/features/groups.md), individual members, people in your [organization](https://docs.lovable.dev/features/organizations), and people outside your workspace invited by email. See [Invite people outside your workspace](#invite-people-outside-your-workspace).
* Your organization (Enterprise workspaces in an [organization](https://docs.lovable.dev/features/organizations), shown with the organization's name): Members of every workspace in the organization can visit the published app after logging in. See [Publish to your organization](#publish-to-your-organization).

This allows you to:

* Build and share internal apps that stay private to your workspace
* Show a private app to a client or contractor without adding them to your workspace
* Share an app with colleagues in other workspaces of your organization
* Prevent accidental external publishing
* Support governance and compliance for sensitive data

Workspace admins and owners can also set the default audience for all published projects with **Default published app access** in [**Workspace settings → Security → Privacy & security**](https://lovable.dev/settings/privacy-security).

You can override the workspace default for individual projects in the publish dialog by choosing who can see the website. If unchanged, the project inherits the workspace default.

### Publish to your organization

When your Enterprise workspace belongs to an [organization](https://docs.lovable.dev/features/organizations), you can publish an app to everyone in the organization. Colleagues in other workspaces of your company can then open it, and the app stays private.

To publish to the organization:

1. In your project, click **Publish**.
2. Select the visibility row to open **Who can view your site?**.
3. Choose the option named after your organization.
4. Select **Publish** (or **Publish changes** on a published project). When the dialog confirms **Your website is live**, members of every workspace in the organization can open the app after logging in to Lovable.

External collaborators, people with a pending invitation, and people outside the organization cannot open the app through this option. A colleague who has never joined a workspace in the organization must join one first, for example by invitation or through the organization's [SSO](https://docs.lovable.dev/features/business/sso.md). Viewing the app does not give anyone access to the project itself.

Visitors log in to Lovable to open the app. A visitor who is logged in but has no access sees a message telling them to ask the publisher for access. They cannot request access from that page.

Colleagues in other workspaces of your organization are not people outside your workspace, so you do not invite them by email. To give one colleague from another workspace access without publishing to the whole organization, choose **Custom** and search for them by name or email. The picker offers only people who already belong to a workspace in the organization.

To give access to the organization and to specific people, for example a client outside the company, choose **Custom** and add both. The **Custom** card then includes the organization in its summary of who has access.

### Invite people outside your workspace

You can give people outside your workspace viewer access to an internally published app, for example a client or a contractor, without adding them to your workspace and without making the site public. Project editors and above can manage the website audience.

**1. Open the audience picker**

In the publish dialog, select the visibility row to open **Who can view your site?**, select **Invite only** (Free and Pro plans) or **Custom** (Business and Enterprise plans), then select **View and edit** on that card.

**2. Invite by email**

Type the person's email address in the search field. For an address outside your workspace, an **Invite** option appears. Select it to add the person. They appear under **Added**, and the card shows who has access.

If the workspace has set [External viewer invites](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-viewer-invites) to **Off**, the email option doesn't appear. If the workspace limits invites to specific email domains, addresses on other domains can't be added, and the picker says which domains are allowed.

**3. Publish your changes**

Select **Done** to close the picker, then **Publish** (or **Publish changes** on a published project). Lovable then sends each invited person an email and updates who has access. Until you select that button, invites are not applied and no emails are sent.

The invite email contains a link to your site. If the invited person already uses Lovable, they also get an in-app notification. To open the site, they log in with the invited email address. If they don't have a Lovable account yet, they can create one with that address. Their access is tied to their account after that and is marked with an **EXT** label in the audience list.

Keep in mind:

* Invites don't expire. Removing someone from the audience revokes their access when you apply the change, and re-inviting an address sends a fresh email.
* Workspace members can't be invited as external viewers. Add them by name instead. On Business and Enterprise plans, you can also add the whole workspace or a group.
* On Free and Pro plans, you can invite up to 10 people per project.
* Each address can receive at most 10 invite emails per day.
* On Business and Enterprise plans, workspace admins and owners control external viewer invites for the whole workspace from [**Workspace settings → Security → Privacy & security**](https://lovable.dev/settings/privacy-security). They can set [External viewer invites](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-viewer-invites) to **Off**, or limit invites to specific email domains. Your company's [verified domains](https://docs.lovable.dev/features/verified-domains.md) are always allowed.
* People who were already invited keep their access when an admin or owner changes that setting.
* On Business and Enterprise plans, [Security insights](https://docs.lovable.dev/features/security-insights.md) flags internally published projects that have external viewers, so admins can review who has access.

## Trust center

Externally published apps can also have a [Trust center](https://docs.lovable.dev/features/trust-center.md): a security page Lovable generates on your app's own domain, with verifiable facts about how the app is served and built. Enable **Trust center** in **Project settings → Publishing**. Each publish is evaluated fresh, so the Trust center always describes the deployment that's live.

## FAQ

> **Can I publish by asking Lovable in the project chat?**
>
> Yes. Ask Lovable to publish, deploy, ship, or go live, and it handles the deploy for you while respecting all publish-related workspace settings and permissions. It checks your publish settings, runs the [Quick scan](https://docs.lovable.dev/features/security#quick-scan) checks on the version it publishes, and schedules the deploy. You can also request a specific Lovable subdomain, such as `my-todos.lovable.app`.
>
> Lovable asks for approval before publishing unless you have set the publish tool to auto-approve. You can also ask Lovable in the project chat to change who can see your site or connect a [custom domain](https://docs.lovable.dev/features/custom-domain.md). It applies visibility changes before publishing and asks you to confirm before connecting a domain. To unpublish, use one of the [options in the UI](#how-to-unpublish-your-project).
>
> Publishing from the project chat is treated as standard build usage and consumes credits.

> **Does my published site expire?**
>
> Published sites have no fixed expiry date. Only [share preview links](https://docs.lovable.dev/features/share-project.md) expire, after 7 days by default. Apps that use the built-in backend or AI features do need available credits to serve requests.
>
> Lovable may unpublish a project in a Free workspace when all of the following are true:
>
> * The app has had no visits for 12 months or more.
> * The workspace owner has not logged in for 12 months or more.
> * The project has no connected custom domain.
>
> When Lovable unpublishes a project for inactivity, it emails the workspace owners and admins. Lovable also pauses the project's built-in backend. The built-in backend is the database, login, and file storage Lovable runs for your app. Lovable does not delete your project, code, or data. The project keeps its `lovable.app` address.
>
> To bring the app back online:
>
> * Log in and open the project.
> * Click **Wake up** on the paused project card in **More → Database**. See [Resume a paused project](https://docs.lovable.dev/features/database-pause-remove.md#resume-a-paused-project).
> * Publish the project again.

> **Where is the Publish button?**
>
> The **Publish** button sits in the top right of the editor. On narrow windows it collapses to an icon without a label, so look for it next to **Share**. You can also ask Lovable in the project chat to publish your app.

> **Does publishing cost credits?**
>
> No. Publishing from the **Publish** dialog is free and works even when your credit balance is zero. Hosting the published app and running its built-in backend consumes Run credits as your app is used, and asking Lovable to publish in the project chat is treated as standard build usage and consumes credits.

> **What happens to my published app if I downgrade or cancel my plan?**
>
> Your published app stays live. Downgrading or canceling does not unpublish your project.
>
> * **Your published app stays restricted.** If you restricted access to workspace members or selected people on a Business plan, the published app keeps requiring login after a downgrade. An app published to your whole workspace stays open to workspace members until you next publish changes from the publish dialog. After the downgrade, workspace and group entries in a custom audience no longer grant access. Invited people, the project owner, workspace owners, and people the project is shared with directly keep their access. You can change website access to **Public** or **Invite only** on any plan.
> * **Publishing changes switches the app to Invite only.** Publishing to your workspace or to groups requires a Business or Enterprise plan. If you published an app that way before the downgrade, the next publish from the publish dialog switches it to **Invite only**. The dialog warns you first. Workspace members lose access to the website but keep their access to the project. Other ways of publishing, such as the project chat, do not work until you change the audience in the dialog. To keep the workspace audience, upgrade again before you publish changes. You can unpublish the app on any plan.
> * **Connected custom domains keep serving your app.** Connecting a new custom domain requires a paid plan, but domains that are already connected continue to work, and you can still disconnect them. Domains bought through Lovable are billed separately from your subscription, so their registration and renewal are not affected by a plan change. See [What happens to my custom domain if I downgrade or cancel my plan?](https://docs.lovable.dev/features/custom-domain.md#what-happens-to-my-custom-domain-if-i-downgrade-or-cancel-my-plan)
> * **Apps that use the built-in backend or AI features still need available credits** to serve requests. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Does publishing expose my project and code?**
>
> No. Publishing only makes the app available at the published URL. It does not grant anyone access to your project in the editor or your project code, and it does not make your project automatically remixable.
>
> Access to the editor, source code, project chat history, and unpublished changes is always controlled by [project access](https://docs.lovable.dev/features/project-visibility.md).

> **How do project access and website access work together?**
>
> Project access and website access are **independent settings**. You can combine them in different ways depending on your needs.
>
> * **Project access** controls who can access the **project in the editor**, including source code, project chat history, work in progress, and changes that have not yet been published.
> * **Website access** controls who can visit the **published app** at its live URL.
>
> Below are common configurations:
>
> 1. **Internal team app**
>    * Project access: `Workspace`
>    * Website access: `Workspace` **Result:** Only workspace members can view and edit the project in the editor and visit the published app.
>
> 2. **Private work-in-progress, public app**
>    * Project access: `Restricted`
>    * Website access: `Public` **Result:** Only you can view and edit the project in the editor, but anyone with the published URL link can visit the published app.
>    > [!NOTE]
>    >
>    > Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.
>
> 3. **Team-built, publicly shared app**
>    * Project access: `Workspace`
>    * Website access: `Public` **Result:** Only workspace members can view and edit the project in the editor, but anyone with the published URL link can visit the published app.
>
> 4. **Private prototype shared internally**
>    * Project access: `Restricted`
>    * Website access: `Workspace` **Result:** Only you can view and edit the project in the editor, and only workspace members can visit the published app.
>    > [!NOTE]
>    >
>    > Keep in mind that workspace owners have full access to **all** projects in the workspace and can view and edit them.
>
> > [!NOTE]
> >
> > **Key reminder:** Publishing does not change who can access your project in the editor, and project access does not affect who can visit the published app.

> **Can I restrict who can access my published app?**
>
> Yes. On every plan you can restrict your published app to invited people. On Business and Enterprise plans you can also publish it to your whole workspace or to groups. Enterprise workspaces in an organization can also publish it to everyone in the organization. See [Publish to your organization](#publish-to-your-organization).
>
> In the publish dialog, select the visibility row to open **Who can view your site?**. On Free and Pro plans, choose **Invite only** and add people by name or email, up to 10 people per project. On Business and Enterprise plans, choose your workspace to publish internally, or choose **Custom** to compose the audience: the whole workspace, specific people, [groups](https://docs.lovable.dev/features/groups.md), people in your organization, and people outside your workspace invited by email. See [Invite people outside your workspace](#invite-people-outside-your-workspace).

> **How do people outside my workspace get access to my internally published app?**
>
> Invite them by email from the **Invite only** audience (Free and Pro plans) or the **Custom** audience (Business and Enterprise plans) in the publish dialog. When you select **Publish** (or **Publish changes** on a published project), they receive an email with a link to your site, and people who already use Lovable also get an in-app notification.
>
> To open the site, they log in with the invited email address, or create a Lovable account with that address if they don't have one. Their access doesn't expire, and it is marked with an **EXT** label in the audience list. Re-inviting the same address doesn't send duplicate emails, and workspace members can't be invited as external viewers.

> **Why don't I see my latest changes on the live site?**
>
> Publishing deploys a snapshot. Changes aren't automatically pushed to your live app.
>
> To publish updates, click **Publish** and then **Publish changes**.

> **How do I change my site metadata such as favicon, site title, meta description, or OG image?**
>
> You can customize how your site appears in browser tabs, search results, and link previews.
>
> Lovable generates your site metadata while it builds your app: the site title, meta description, and site icon (favicon). The social sharing Open Graph (OG) image is chosen when your site is served: Lovable uses an image you've asked it to set, or the latest screenshot of your app, and sites that aren't publicly visible don't get an automatic one. Metadata is set per page: Lovable generates unique values for each page of your app based on its content. To see how any page looks when shared and in search results, check its **Social** and **Search** cards in the [page selector](https://docs.lovable.dev/features/projects/preview.md#preview-controls) above the preview. To open the cards from the Publish dialog, select **Social & search appearance** in the **⋮** menu, or click the favicon next to the website URL. Right after you publish, you can also click **Edit** next to your site's title on the **Your website is live** screen.
>
> To change any of it, ask Lovable in the project chat, for example:
>
> ```text wrap theme={null}
> Change my site title to "Acme Task Tracker", write a meta description about team to-do lists, and generate a new social sharing image.
> ```
>
> Metadata edits are treated as standard build usage and consume credits, like any other build request. Like any other edit, a metadata change reaches your live site on the next publish. When the project is already published, Lovable ends its reply with a **Publish to update the live site** button so you can publish from the project chat.
>
> See [Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md) for more information on optimizing your Lovable apps for search engines, social media previews, and AI systems.

> **How do I change my published URL (website address)?**
>
> You can change your project **URL subdomain**, which forms your `lovable.app` website address, in [**Project settings → URL subdomain**](https://docs.lovable.dev/features/projects/settings.md#details): change the subdomain and click **Update URL subdomain**.
>
> On a first publish, you can also edit the URL directly in the **Website URL** field of the publish dialog before you publish.
>
> Note that renaming the project does not change the project URL, it only changes the project display name.
>
> On paid plans, you can also add a [custom domain](https://docs.lovable.dev/features/custom-domain.md).

> **Why can't I publish my Lovable project?**
>
> When a publish fails, Lovable shows a **Publishing failed** message explaining what went wrong, along with the action to take: **Try again** for temporary issues, or **Try to fix** to have Lovable investigate an error in your app. See [Troubleshooting](#troubleshooting) for each failure type and how to resolve it.
>
> If the dialog blocks publishing instead, check these common causes:
>
> * The dialog shows **Build errors need fixing** and replaces the publish button with **Try to fix**. Your latest changes failed to build, so publishing them would fail the same way. Select **Try to fix** to have Lovable fix the build errors in the project chat, or fix them yourself, and publish again when the preview builds.
> * The button shows **You don't have permission to publish this project** when you hover it: publishing needs editor access or above. See [Who can publish and unpublish projects?](#who-can-publish-and-unpublish-projects)
> * The dialog shows **Publish requires approval** or **Publishing is blocked by workspace policy**. A [workspace policy](https://docs.lovable.dev/features/workspace-policies.md) on your Enterprise workspace requires approval before you publish or blocks it. See [Request approval to publish](#request-approval-to-publish).
> * Your workspace admin or owner enabled **Block publishing with critical issues** in [**Workspace settings → Security → Privacy & security**](https://lovable.dev/settings/privacy-security). It prevents publishing while critical findings are unresolved, and the dialog shows **Fix security issues to publish**. Open the Security view, fix them, and try again.

> **Why isn't my published app live at my URL?**
>
> First check that the publish finished: the dialog confirms **Your website is live** when the deploy completes, and shows a **Publishing failed** message when it didn't. See [Troubleshooting](#troubleshooting) for the failure types.
>
> Then check that you're opening the exact published URL. The `lovable.app` address uses your project's [URL subdomain](https://docs.lovable.dev/features/projects/settings.md#details), which can differ from the project's display name, and changing the subdomain moves your site to the new address. If you use a [custom domain](https://docs.lovable.dev/features/custom-domain.md), DNS changes can take time to take effect.

> **Should I run an SEO review after publishing?**
>
> Yes, especially if your site is public. Some SEO checks only run against the live published site, including indexing, AI-search readiness, and Google Search Console setup.
>
> After publishing, run an [SEO review](https://docs.lovable.dev/features/seo-aeo.md) to check your live site. If you connect a custom domain later, run the review again so Lovable can re-check the new host, verify Google Search Console, and submit your sitemap.

> **Can I publish my project as a native iOS or Android app to the App Store or Play Store?**
>
> Lovable builds **web apps** and publishing always deploys to a web URL (for example, `yourproject.lovable.app` or your [custom domain](https://docs.lovable.dev/features/custom-domain.md)). Lovable has no built-in flow that packages and submits your project to the App Store or Google Play, but you have two options if you want an installable, store-ready experience:
>
> * **Progressive Web App (PWA)**: make your published app installable so users can "Add to Home Screen" and launch it like a native app, with offline support and a full-screen shell. This is the fastest path and works from any modern mobile browser.
> * **Capacitor wrapper**: wrap your published URL in a native shell with [Capacitor](https://capacitorjs.com/) outside of Lovable, then submit that shell to the App Store or Play Store. This is the right path when you need access to native device APIs (camera, push notifications, biometrics, etc.) or when a store requires a "real" native binary.
>
> Lovable does not generate projects in [React Native](https://reactnative.dev/), a developer framework for building native mobile apps. If you need a React Native app, use Lovable to prototype your app's screens and flows in the browser, then rebuild them with React Native outside of Lovable.
>
> The separate [Lovable mobile app](https://docs.lovable.dev/integrations/lovable-mobile-app.md) is for **building** projects from your phone. It does not turn your project into a native app for end users.

> **Can I add my app to Slack as a bot?**
>
> Yes. Lovable can add an app you built to your team's Slack workspace as its own Slack app, so teammates can mention it in a channel or send it a direct message. A workspace admin or owner authorizes your Slack workspace once from the Slack connector page, and after publishing you ask Lovable to add the app to Slack. See [Add your app to Slack as an agent](https://docs.lovable.dev/integrations/slack.md#add-your-app-to-slack-as-an-agent).

## Troubleshooting

When a publish fails, a **Publishing failed** banner appears in the Publish dialog with a message explaining what went wrong and how to resolve it. When the failure is something Lovable can help with, it already knows the details, so you can ask for help in the project chat.

> **I don't see the option to publish to my organization**
>
> This is intended when your workspace is not on the Enterprise plan or does not belong to an [organization](https://docs.lovable.dev/features/organizations). If your workspace is on the Enterprise plan and belongs to an organization and the option is still missing, Lovable has set a publishing policy for your workspace that does not allow publishing to the organization. Contact your account team. The option appears only in Enterprise workspaces that belong to an organization and whose publishing policy allows it. See [Publish to your organization](#publish-to-your-organization).

> **Publishing failed due to a temporary issue**
>
> The publish failed because of a short-lived problem, such as a timeout or a rate limit on a connected service.
>
> **What to do:** Click **Try again** in the banner. Retries usually succeed.

> **Publishing failed because of an error in your app**
>
> The publish failed because of something in your app's code, such as a build error or an edge function that couldn't be deployed. When the cause is a build error, the banner shows a short summary of the build error instead of this message.
>
> **What to do:** Click **Try to fix** in the banner. Lovable investigates and applies a fix, and you can publish again when it's done. You can also describe the issue in the project chat. If the fix request can't be sent immediately, for example because you reached a rate limit, the banner stays visible so you can try again.

> **Publishing failed because of a configuration issue in your project**
>
> A configuration problem inside your project blocked the publish, for example a file that is too large to include.
>
> **What to do:** Click **Try to fix** in the banner. Lovable resolves the configuration problem, and you can publish again when it's done.

> **Publishing failed because of an external connection or secret that needs your attention**
>
> The publish failed because of a connection or setting outside your project that Lovable can't change for you, such as an expired [Supabase](https://docs.lovable.dev/integrations/supabase.md) connection or a connected service that reached its plan limits.
>
> **What to do:** Fix the underlying setting, for example reconnect the integration or update its plan or quota, then click **Try again**.

> **Publishing failed because a database change conflicts with existing data**
>
> A database change in this publish conflicts with data that already exists in your live app's database.
>
> **What to do:** Click **Ask the assistant to help** in the banner. Because the fix affects real data, Lovable confirms with you before changing anything.

> **Publishing failed due to an internal error**
>
> The failure happened on Lovable's side and is not something you can resolve by changing your app or its configuration.
>
> **What to do:** Try publishing again after a few minutes. If the failure persists, [contact support](https://lovable.dev/support) and include your project link.

> **Request closed · project changed**
>
> This is intended. Something the policy checks changed after you asked, so the request closed without a decision. Publish again to send a new request for the app as it is now. See [How approvals work](https://docs.lovable.dev/features/workspace-policies.md#how-approvals-work).

> **Publishing is blocked by workspace policy**
>
> This is intended. A [workspace policy](https://docs.lovable.dev/features/workspace-policies.md) does not allow this kind of publishing. These policies can block publishing:
>
> * [publishing publicly](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-externally),
> * [publishing with unresolved sensitive data findings](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-with-unresolved-sensitive-data-findings), or
> * [publishing as an external collaborator](https://docs.lovable.dev/features/workspace-policies.md#restrict-publishing-by-external-collaborators).
>
> Ask a workspace admin or owner if you think the policy should not apply to your app.

> [!NOTE]
>
> Publish failure messages never include raw logs or output from connected services, so secrets and connection details stay out of the UI. Build errors and conflicting database changes are the exceptions: the banner shows a summary of the build failure or the database's own error message so you can act on it.


## Related topics

- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Publish project](https://docs.lovable.dev/api-reference/deploy-domains/publish-project.md)
- [Update publish settings](https://docs.lovable.dev/api-reference/deploy-domains/update-publish-settings.md)
