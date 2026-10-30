# Connect your app to LinkedIn
<!-- source: https://docs.lovable.dev/integrations/linkedin.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to LinkedIn

> Connect your app to LinkedIn, a professional networking platform, to read member profile data and publish posts from your Lovable app.

[LinkedIn](https://www.linkedin.com/) is a professional networking platform with APIs for reading member profile data and publishing posts. The LinkedIn connector lets your Lovable app read the connected user their basic profile and email, and publish posts to LinkedIn on their behalf. It's designed for apps that need professional identity, content distribution, or LinkedIn-driven workflows.

LinkedIn is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build and in your published apps.

With LinkedIn, your app can:

* Read basic profile details, including name and profile photo
* Read the connected member's primary email address
* Publish posts on behalf of the connected member

The LinkedIn connector connects to a single LinkedIn account per connection via OAuth. It's a good fit for apps that surface profile data in dashboards or CRMs, or automate publishing to a member's LinkedIn feed.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| Auto-publish blog posts to LinkedIn | *Use LinkedIn and build a tool that takes a draft article, formats it as a LinkedIn post, and publishes it to my LinkedIn feed.* | **Cross-post written content from one place to a member's LinkedIn feed.** The app composes a post from an article draft and publishes it on behalf of the connected member. |
| Scheduled post composer | *Use LinkedIn and build a scheduler where I draft posts, pick a publish time, and have them go out to LinkedIn automatically.* | **Plan and queue LinkedIn posts ahead of time.** The app stores drafts with publish times and pushes each post to LinkedIn when its scheduled time arrives. |
| Sales outreach companion | *Use LinkedIn and build an app that signs reps in with LinkedIn, pulls their profile into the CRM, and lets them publish prospecting posts.* | **Tie LinkedIn identity and publishing to a sales workflow.** The app reads the rep's profile into CRM records and publishes posts to their LinkedIn feed when they trigger a campaign. |
| Personal brand dashboard | *Use LinkedIn and build a dashboard where I draft, preview, and publish LinkedIn posts, with a record of everything I've shared.* | **Centralize LinkedIn publishing in a single workspace.** The app provides drafting and preview tools, publishes posts on behalf of the member, and keeps a log of what's been posted. |
| Event registration with LinkedIn login | *Use LinkedIn and build an event registration page where attendees sign in with LinkedIn and confirm their profile details.* | **Reduce signup friction by reading profile data from LinkedIn.** The app authenticates the attendee with LinkedIn, pre-fills name and email, and confirms registration in one step. |

## How to connect LinkedIn

Workspace **admins** and **owners** can connect LinkedIn. You can create multiple LinkedIn connections using different accounts, which is useful for separating environments or managing publishing across multiple members.

When the connection is created, LinkedIn becomes available across all projects in the workspace. Anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to it.

### Prerequisites

Before connecting LinkedIn, make sure you have:

* A LinkedIn account you want to connect
* Lovable workspace **owner** or **admin** role

> [!NOTE]
>
> All API requests made through this connector count against the connected LinkedIn account's API quotas. Quotas and access are managed directly by LinkedIn, not Lovable.

### Set up your LinkedIn connection

**1. Open LinkedIn in Connectors**

Go to **Connectors** and select **LinkedIn**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, name the connection (for example, `LinkedIn Prod`). This name is only used inside Lovable to identify the connection.

**4. Review scopes (optional)**

Expand **Advanced settings** to review the permissions your app will request. Default scopes are pre-selected for common use cases.

| Scope | Description | Default |
| :- | :- | :- |
| OpenID (`openid`) | Authenticate the member identity with LinkedIn. | Required |
| Profile (`profile`) | Read the member's basic profile information. | Required |
| Email (`email`) | Read the member's primary email address. | On |
| Publish posts (`w_member_social`) | Create posts on behalf of the connected member. | On |

For full scope documentation, see [LinkedIn's authorization code flow reference](https://learn.microsoft.com/linkedin/shared/authentication/authorization-code-flow).

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect to LinkedIn and authorize**

Click **Connect** at the bottom of the form. The LinkedIn authorization window opens, so make sure your browser doesn't block pop-ups. If it does, Lovable redirects you instead.

Sign in to LinkedIn if prompted, review the requested permissions, and click **Allow**.

You'll be redirected back to Lovable with a confirmation.

When connected, anyone building in a project can ask Lovable in the project chat to link their project to LinkedIn (based on configured connection-level access). Your Lovable apps can then read profile and email data and publish posts on behalf of the connected member.

## Limitations

The LinkedIn connector cannot:

* Read other LinkedIn members' profiles, connections, or messages
* Read or write comments, likes, or reactions
* Manage company pages, ads, or organization posts
* Receive LinkedIn webhooks or real-time events
* Support per-end-user LinkedIn login. Each connection represents a single LinkedIn account shared across all projects linked to it.

If LinkedIn authorization is revoked from the LinkedIn side, you'll need to reconnect the integration in Lovable before API calls can succeed again.

## Manage your LinkedIn connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **LinkedIn**, then open the connection.

* **Unlink projects** to remove LinkedIn access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use LinkedIn stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Resend](https://docs.lovable.dev/integrations/resend.md)
- [Connect your app to Ashby](https://docs.lovable.dev/integrations/ashby.md)
- [Connect your app to Calendly](https://docs.lovable.dev/integrations/calendly.md)
- [Connect your app to Notion](https://docs.lovable.dev/integrations/notion.md)
- [Connect your app to Slack](https://docs.lovable.dev/integrations/slack.md)
