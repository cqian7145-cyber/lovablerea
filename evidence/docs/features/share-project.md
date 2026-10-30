# Share a project with internal or external collaborators
<!-- source: https://docs.lovable.dev/features/share-project.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Share a project with internal or external collaborators

> Manage project access, invite collaborators, and create protected preview links for external reviews.

In the **Share** menu, you give others access to a project: workspace members, external collaborators, or anyone with a link. To open the menu, click **Share** in the top bar of any project.

## Add project collaborators

Use the invite field at the top of the **Share** menu to invite one or more workspace members, [workspace groups](https://docs.lovable.dev/features/groups.md) (only on Business and Enterprise plans), or external collaborators to the project directly.

Each person or group you add is granted access to the project based on the assigned role.

1. Open the project and click **Share**.
2. Enter one or more email addresses or workspace groups in the invite field. The field reads **Invite people or groups** on Business and Enterprise plans and **Invite by email** on other plans.
3. Choose the access level. The default is **Can edit**, except on Enterprise plans, where it is **Can view**.
   * **Admin** (paid plans): Full access to the project, including all project settings, integrations, and external connections.
   * **Can edit**: Build, edit, and manage most project settings. Some advanced settings, such as integrations and external connections, are reserved for admins.
   * **Can view** (paid plans): Read-only access to the project editor.
4. Click **Invite**.

Each person receives an email with a link to join the project. If they already have a Lovable account, the project also appears in their **Shared with me** section. If they don't, they can create an account and join through the invitation.

> [!NOTE]
>
> On **Business** and **Enterprise** plans:
>
> * Lovable warns you before inviting someone who isn't a member of your workspace.
> * Workspace admins and owners can control whether external collaborators are allowed and the highest project role they can have with the **External project collaborators** setting in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security). When **SSO enforcement** is on, external collaborators are blocked by default until an admin or owner explicitly allows them.

## Control project access across your workspace

The **Workspace access** row controls whether members of your workspace have access to the project by default. It sets the project's visibility across the whole workspace. To share the project with your workspace, select your workspace's name in the row and choose **Can edit** or **Can view**. To limit the project to the people you invite, choose **Restricted**.

| **Access level** | **Who can access the project** | Project visibility |
| :- | :- | :- |
| **Can edit** | **All workspace members and explicitly invited collaborators** can view, remix, or edit the project, based on their role. On Free and Pro plans, projects are always visible to the workspace. You can only adjust the access level of individual collaborators. | **Workspace** |
| **Can view** | **All workspace members** can view and remix the project. Workspace admins and owners, and explicitly invited collaborators with edit rights, can still edit it. Available on Business and Enterprise plans. | **Workspace** |
| **Restricted** | **Only the project owner and explicitly invited collaborators** can view, remix, or edit the project based on their role. The project becomes personal (restricted). Available on Business and Enterprise plans. Only the project owner can restrict a project. *Note: Keep in mind that workspace owners have full access to all projects in the workspace and can view and edit them.* | **Restricted** |

See [Project access](https://docs.lovable.dev/features/project-visibility.md) for more information.

## Share an invite link

An invite link is a shareable URL. Anyone who opens it is automatically added to the project as a collaborator with the role you set.

Invite links are useful for:

* Onboarding a new teammate without looking up their email
* Sharing a project in a chat channel or doc
* Giving a contractor time-limited edit access

> [!NOTE]
>
> On Business and Enterprise workspaces with **SSO enforcement** on, project invite links only work for users whose email is on a [verified workspace domain](https://docs.lovable.dev/features/verified-domains.md) and the link's access level is within the workspace's just-in-time provisioning role.

### Create an invite link

1. In the **Share** menu, set the **Invite link** access level:
   * **Anyone with the link can edit**: People who open the link join as editors. Available on all plans.
   * **Anyone with the link can view**: People who open the link join as viewers. Available on paid plans.
2. Click **Copy** next to the invite link and send the link.

Invite links expire automatically **7 days** after they are created. If a link stops working, create a new one.

Workspace admins and owners can disable invite links for the whole workspace with the [Invite links setting](https://docs.lovable.dev/features/privacy-and-security-settings.md#invite-links) in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security). When the setting is disabled, the **Invite link** control disappears from the **Share** menu and any invite link created earlier stops working.

Only one active invite link can exist at a time. Changing the access level generates a new link and invalidates the previous one.

### Change or disable an invite link

Open the **Share** menu and use the access-level dropdown next to **Invite link**:

* **Anyone with the link can edit** or **Anyone with the link can view**: changes the link's access level. This generates a new link and the previous URL stops working. You need to share the link again.
* **Invite link disabled**: disables the link. The URL stops working immediately.

## Manage who has access

The **Share** menu lists the project owner and the people and groups invited to the project, with the role next to each name. Access for the rest of the workspace appears in the **Workspace access** row.

From this list you can:

* **Change someone's role**: click the access-level dropdown next to their name
* **Remove individuals or groups**: click **Remove** in the access-level dropdown on their row
* **Remove workspace access** (Business and Enterprise plans, project owner only): choose **Restricted** in the **Workspace access** row
* **Update workspace access**: choose **Can edit**, or **Can view** on Business and Enterprise plans, from the access-level dropdown in the **Workspace access** row
* **Manage the invite link:** change the link's access level or disable the link entirely

Available actions depend on your role. Editors can invite, change, and remove editors and viewers. Admins and owners can also manage admins. No one can remove the project owner.

## Share preview links

A shared preview link is a **view-only URL** for the latest in-progress version of your app. Anyone with the link can open it without a Lovable account. If the link requires a password, viewers also need the password.

Shared preview links do not add people as collaborators or grant access to the Lovable editor, chat, or source code. You can create separate links for different reviews, give each link a name, choose whether guests can comment, and delete a link when you no longer want it to work.

### Why and when to use shared preview links

Use shared preview links when someone needs to review your work without joining the project. For example, you can:

* Send a client a password-protected link for a design review.
* Create a comment-enabled link for usability feedback.
* Create a comment-free link for a demo or bug report.
* Give different groups separate links that you can delete independently.

For ongoing production access, [publish the project](https://docs.lovable.dev/features/publish.md) instead. For access to the editor, invite the person as a [project collaborator](#add-project-collaborators).

### Availability and permissions

People with edit access to a project can create, copy, and delete its shared preview links.

| Plan | Shared preview link features |
| :- | :- |
| **Free** and **Pro** | Create multiple named links and allow or disallow guest comments per link. Links expire after 7 days. |
| **Business** and **Enterprise** | Everything on Free and Pro, plus the option to require a password and choose an expiration of 24 hours, 7 days, 30 days, or never. |

On **Enterprise** plans, workspace admins and owners can disable shared preview links across the workspace with the **Preview link sharing** setting in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security). When disabled, members cannot create new preview links. Links created before the setting was disabled keep working until they expire or someone deletes them. People with edit access can still open **Share a preview link** to delete those links.

### Create a shared preview link

Configure a separate link for each audience before you share it.

**1. Open preview links**

Open the project, click **Share**, and select **Share a preview link**.

**2. Start a new link**

Lovable opens the new link form when the project has no preview links yet. When the project already has links, Lovable shows them instead. In that case, click **Create new link**.

**3. Configure the link**

Enter an optional **Link name** to identify the audience or purpose, such as `Client review`. Each active link in the project needs a different name, so if the name is already in use, change it or delete the other link first. A deleted or expired link frees its name for reuse.

Choose whether to enable **Allow comments**.

On **Business** and **Enterprise** plans, you can also:

* Enable **Require a password** and enter a password with at least 8 characters.
* Set **Link expiration** to **24 hours**, **7 days**, **30 days**, or **Never**. The default is **7 days**, and the expiration can't be changed after the link is created.

**4. Create and share the link**

Click **Create preview link**. Lovable copies the URL to your clipboard and adds the link to the list. You can copy or share it again from that list at any time.

> [!NOTE]
>
> Lovable cannot show a link's password again after you leave or reload the editor. The key icon on the link's row reveals it only in the session where you set it, so save it in a password manager and send it to reviewers separately from the link. If you lose the password, create a replacement link and delete the old one.

### How password-protected preview links work

When a reviewer opens a protected link, Lovable asks for the password before showing the preview. After the reviewer enters it, the preview stays unlocked in that browser for 24 hours, and then Lovable asks for the password again. Each password applies only to the link it was created for, and you can't change it after the link is created.

The password page also shows **Workspace member? Sign in to Lovable**. People who already have access to the project can select it and open the preview by logging in instead of entering the password.

Opening a password-protected link is not a login. Lovable does not identify who opened the link, and anyone who has both the URL and the password can open the preview while the link remains active. To give access to specific known people, use project collaboration or [published app access controls](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app).

### Collect feedback with guest comments

When **Allow comments** is enabled for a link, anyone who opens it can leave comments directly on the preview without project access or a Lovable account. For a comment-free preview, disable the setting when you create the link, or select the link later and disable it.

To leave a comment, a guest opens the preview link and:

1. Clicks **Comment** in the preview toolbar.
2. Clicks anywhere on the preview to pin a comment to that spot.
3. Guests logged in to Lovable comment under their Lovable account. Guests who aren't logged in are asked to enter a name the first time they comment. No account or email is required, and signing up is optional.
4. The guest can then start comment threads, reply to existing ones, and edit or delete their own comments.

Comments appear in a panel alongside the preview. The project owner receives an inbox notification in Lovable when a guest comments on the preview. Anyone with access to the project can reply to guest comment threads.

Guest comments stop when their link expires or is deleted. To enable or disable comments for an existing link, open **Share a preview link**, select the link, and update **Allow comments**.

### Manage active preview links

Open **Share → Share a preview link** to see every active link in the project. Each row shows the link name, its remaining lifetime, whether it has a password, and whether guest comments are enabled.

From the list, you can:

* Copy the URL.
* Select a link to enable or disable **Allow comments**.
* Reveal the password with the key icon, available only in the session where you set it.
* Delete a link.

Expired links stop working and disappear from the list automatically. A link with **Never** selected remains active until you delete it.

> [!WARNING]
>
> Deleting a shared preview link is irreversible. The URL stops working for everyone who has it, but the change can take up to one minute to apply everywhere.

## Publish project

Deploy the project to a permanent public URL on `lovable.app` or your custom domain. See [Publish your project](https://docs.lovable.dev/features/publish.md) and [Custom domains](https://docs.lovable.dev/features/custom-domain.md) for more information, or follow [Launch your site on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain.md) for the full path.

> [!NOTE]
>
> Inviting someone here makes them a project collaborator with access to the editor. If someone outside your workspace should only view an internally published app, not edit the project, [invite them by email from the publish dialog](https://docs.lovable.dev/features/publish.md#invite-people-outside-your-workspace) instead.

## FAQ

> **What's the difference between an invite link and a shared preview link?**
>
> An invite link turns the person who opens it into a project collaborator (editor or viewer) inside the Lovable editor. They must have a Lovable account.
>
> A shared preview link gives anonymous, view-only access to the preview of your in-progress app. It does not create a collaborator, require an account, or grant any edit rights. Viewers do not see the Lovable editor, chat, or source code.
>
> On Business and Enterprise plans, you can require a password. The password limits access to people who know the password, but it does not identify them.

> **Can people comment on a shared preview?**
>
> Yes, if **Allow comments** is enabled for that link. The setting is enabled by default. Anyone who opens the link can leave comments without a Lovable account, and the project owner is notified in their Lovable inbox.
>
> For a comment-free preview, disable the setting when you create the link, or select the link later and disable it.

> **How is a shared preview link different from publishing?**
>
> A shared preview link gives anonymous, view-only access to the latest in-progress version of your app, even before you publish. On Free and Pro plans, links expire after 7 days. On Business and Enterprise plans, you can choose 24 hours, 7 days, 30 days, or no automatic expiration.
>
> Publishing deploys the app to a public URL on `lovable.app` or your custom domain, with its own access controls.

> **Can I share a project outside my workspace?**
>
> Yes. Invite people by email, share an invite link, or create a shared preview link.
>
> On Business and Enterprise plans, the **External project collaborators** setting in [Workspace settings → Security → Privacy & security](https://lovable.dev/settings/privacy-security) controls invited external collaborators. On Enterprise plans, admins and owners can separately disable shared preview links across the workspace.

> **Why does my invite link stop working?**
>
> The invite link can stop working for several reasons:
>
> * Invite links expire after 7 days. Create a new link and share it again.
> * Changing the link's access level generates a new link and the previous URL stops working. You need to share the link again.
> * Someone set the link's access level to **Invite link disabled** in the **Share** menu.
> * A workspace admin or owner disabled invite links for the workspace. Every invite link stops working, and the **Invite link** control disappears from the **Share** menu.

> **Can I change the project owner?**
>
> Yes. The project owner can hand the project to another workspace member from **Project settings → Transfer ownership**. See [Where to find project settings](https://docs.lovable.dev/features/projects/settings.md#where-to-find-project-settings) for how to open it. Your access after the transfer depends on your workspace role. See [Project access](https://docs.lovable.dev/features/project-visibility.md) for how workspace roles map to project access. To hand over several projects in one step, [change the owner of several projects at once](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) from the dashboard.
>
> When a project owner leaves the workspace, ownership of their projects is auto-transferred to the member with the highest role (owners first, then admins, then editors). When an admin or owner removes them, that person [chooses who inherits the projects](https://docs.lovable.dev/features/people.md#choose-who-inherits-their-projects). Projects with access set to **Restricted** are not transferred. A workspace owner has to transfer them manually from the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md#change-the-owner-of-several-projects) or from [project settings](https://docs.lovable.dev/features/projects/settings.md#transfer-project-ownership).
>
> > [!TIP]
> >
> > If you're not the project owner and want a personal copy of a project, remix it into your own account. You'll be the owner of the new copy.

> **Do collaborators move with a project to another workspace?**
>
> Only if you opt in. The move dialog has a **Transfer project collaborators** checkbox, off by default. When it's off, people invited directly to the project and any pending invites are removed during the move. When it's on, Lovable keeps them when the destination workspace allows their role and you have permission to grant it there. See [Move a project to another workspace](https://docs.lovable.dev/features/projects/settings.md#move-a-project-to-another-workspace).


## Related topics

- [Control project access](https://docs.lovable.dev/features/project-visibility.md)
- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Manage workspace members from the People tab](https://docs.lovable.dev/features/people.md)
