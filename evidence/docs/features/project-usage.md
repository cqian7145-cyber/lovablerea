# Project usage and costs
<!-- source: https://docs.lovable.dev/features/project-usage.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project usage and costs

> See what drives your project's run credit usage across hosting and the built-in backend (Cloud), and how monthly grants work.

**Run credits** are consumed when Lovable [hosts your app](https://docs.lovable.dev/features/hosting.md) and runs its [built-in backend (Cloud)](https://docs.lovable.dev/features/cloud): database work, AI calls, file storage, network traffic, and backend compute. The **Usage** view shows exactly what a project consumes, so you can see what drives spend before adjusting anything.

To open it, go to **More → Usage**. Access follows your workspace role, not your project role: workspace owners can always open the view, and workspace admins can on paid plans. On workspaces that haven't moved to unified billing yet, the view is visible to everyone who can open the project.

## The Usage view

The Usage view shows what this project costs in credits. Filter it by **All credits**, **Build credits**, or **Run credits**: building the app with Lovable counts as Build, and hosting it and running its backend count as Run. The chart shows credits per day, with a total for the selected time range. It is the same breakdown you get from **Workspace settings → Plans & credit usage → Usage details** by selecting **Run credits**, already filtered to the project. See [Cloud costs](https://docs.lovable.dev/introduction/credits-and-usage.md#cloud-costs) for what drives this usage.

The time range defaults to **Last 30 days**. You can switch to **Last 90 days** or pick a custom range of up to 90 days. Run credit usage may not appear immediately after your app is used.

Next to the total, the view shows how many of those credits your plan's [monthly grants](#monthly-grants) for Cloud, AI, and connector usage covered. Switch the chart to **By coverage** to see that split over time. For details, see [free allowance coverage in Usage details](https://docs.lovable.dev/introduction/credits-and-usage.md#see-how-much-your-free-allowances-covered). Enterprise workspaces do not see this total.

Below the chart, usage is broken down by category, sorted from highest to lowest:

* **Database**: storing and working with your app's data, such as users, orders, and messages. Split into **Database server**, the work of reading and saving that data, and **Database storage**, the amount of data your database stores. Larger [instance sizes](https://docs.lovable.dev/features/database-performance.md#database-size) support more traffic but use more credits.
* **AI**: AI features in your app, such as chat or image generation, broken down by model.
* **Compute**: your app's code running behind the scenes, such as processing payments or sending emails.
* **Network**: data sent or received by your app, such as API responses, downloads, uploads, images, and media.
* **Storage**: uploaded or generated files your app stores, such as images, documents, and videos.
* **Realtime**: live updates sent through your app, such as chat messages, notifications, or collaborative updates.

The number next to each category shows how many credits it used in the selected time range. For example, if **Compute** shows 1.6, then 1.6 credits of your Cloud spend in that period came from compute usage. Use the breakdown to see which resources drive the project's Cloud spend, for example before [resizing your instance](https://docs.lovable.dev/features/database-performance.md#database-size) or [fixing slow queries](https://docs.lovable.dev/features/database-performance.md#find-and-fix-slow-queries).

## Monthly grants

> [!NOTE]
>
> **Temporary offering, subject to change:** Free, Pro, and Business workspaces receive a **20-credit monthly Cloud grant** for hosting and built-in backend usage, and a **4-credit monthly AI grant** for AI gateway usage in deployed apps.
>
> On Free plans, monthly Cloud and AI grants reset on the 1st of each calendar month at **00:00 UTC** and do not roll over. On Pro and Business plans, the monthly Cloud and AI grants refresh with the subscription billing cycle and do not roll over.

For details about Cloud, AI gateway, and connector usage costs, top-ups, auto top-up, alerts, and usage tracking, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

## What drives Cloud usage

A project's usage usually increases when more people visit your app or when it stores more data and files. Larger uploads and downloads, more API responses and media, more background code, and more Realtime messages all add usage too.

| Usage driver | What affects cost |
| :- | :- |
| Database server | The instance size your database runs on, how long it stays active, and how much traffic or querying it handles. See [Upgrade instance](https://docs.lovable.dev/features/database-performance.md#database-size). |
| Database storage | The amount of data your database stores, such as users, orders, messages, and app records |
| Network | Data sent or received by your app, such as API responses, downloads, uploads, images, and media |
| Storage | The amount of uploaded or generated files your app stores, such as images, documents, and videos |
| Compute | Your app's code running behind the scenes, such as processing payments or sending emails |
| Realtime | Live updates sent through your app, such as chat messages, notifications, or collaborative updates |

## What drives AI usage

AI gateway usage is measured when AI features inside your deployed app make model calls. These requests are separate from the Lovable agent that helps you plan, build, and edit your project. Each model call deducts credits based on the model used and the number of tokens processed.

| Usage driver | What affects cost |
| :- | :- |
| Model choice | More capable models usually cost more than smaller or faster models |
| Input tokens | Longer prompts, documents, chat history, or retrieved context increase usage |
| Output tokens | Longer AI responses increase usage |
| Call volume | More users or more frequent AI actions create more model calls |
| Feature type | Chatbots, document question answering, image generation, embeddings, and automations can have different usage patterns |

AI gateway usage rates are based on the underlying provider model costs. See the model tables on [AI features for your app](https://docs.lovable.dev/features/ai).

## Reduce a project's usage

If a project uses more credits than it should, start by asking Lovable in the project chat what drives its usage. Lovable reviews the project's recorded usage and its backend activity, and suggests fixes. See [Ask Lovable what drives your run credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ask-lovable-what-drives-your-run-credit-usage).

Workspace admins and owners also see **Optimize your usage** below the chart in **More → Usage**. The button appears when the project used more than 5 run credits in the last 7 days. Select it to start the same investigation in the project chat.

Then work through these in order of impact:

* **Pause the project's backend** when it isn't actively used, from **More → Database → Manage → Settings**. Lovable also pauses projects automatically after a period of inactivity, so pausing a project yourself mainly helps for projects with scheduled jobs or other background activity. See [Pause a database you're not using](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using).
* **Right-size your instance**. A larger instance uses more credits per hour while your app runs. On paid plans, review and change the instance size from **More → Database → Manage → Settings**. Compare the estimated monthly cost for each size before resizing. See [Estimated monthly cost](https://docs.lovable.dev/features/database-performance.md#estimated-monthly-cost).
* **Fix slow database queries** so your database does less work per request. Ask Lovable in the project chat to find and optimize the slowest queries. See [Find and fix database performance problems](https://docs.lovable.dev/features/database-performance.md#find-and-fix-slow-queries).
* **Remove unused files** from [storage](https://docs.lovable.dev/features/storage.md), since stored files continue to use credits, including while a project is paused.
* **Review [Jobs](https://docs.lovable.dev/features/jobs.md)**: frequent or long-running scheduled jobs add up.
* **Remove database** from projects that don't need a backend at all. This stops all backend usage for the project, but it permanently deletes the project's Cloud data, so export anything you need first. See [Remove a database you no longer need](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need).

> [!NOTE]
>
> Per-member credit limits apply to build credits only. Cloud and AI usage from deployed apps does not count against a member's monthly credit limit. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

If your workspace runs out of credits, your published site stays live. AI features in deployed apps stop working, and apps that rely on the built-in backend (Cloud) can pause until credits are added. See [What happens when you run out of credits](https://docs.lovable.dev/introduction/out-of-credits.md#what-happens-when-you-run-out-of-credits).

## FAQ

> **Are credits deducted for backend and AI gateway usage?**
>
> Yes. Lovable uses one credit balance for building your app, hosting it and running its built-in backend (Cloud), and AI features in deployed apps.
>
> Cloud, AI gateway, and connector usage are shown as **Run credits** in **Workspace settings → Plans & credit usage → Usage details**.
>
> * **Cloud usage** covers the hosting and built-in backend resources used by deployed apps, such as database, network, storage, compute, and realtime usage.
> * **AI gateway usage** covers AI features inside deployed apps, such as model calls made by your app.
> * **Connector usage** covers requests through connectors whose **Managed by Lovable** option bills through Lovable credits. See [Connector costs](https://docs.lovable.dev/introduction/credits-and-usage.md#connector-costs).
>
> For more information, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **Do I have control over my monthly expenses?**
>
> Yes. Lovable gives you several ways to control credit usage and top-up charges.
>
> * **Add credits manually:** On Pro and Business plans, workspace owners and admins can buy one-time top-ups when more credits are needed.
> * **Use auto top-up:** On Pro and Business plans, workspace owners and admins can enable auto top-up so Lovable automatically adds credits when the workspace balance reaches or falls below a threshold you set. You can also set a monthly spend limit to control how many credits auto top-up can add in a calendar month.
>
> To manage credits, top-ups, and auto top-up, go to **Workspace settings → Plans & credit usage**. For more information, see [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

> **What is the cost of Lovable AI gateway?**
>
> AI gateway usage rates are based on the underlying provider model costs. AI gateway usage is charged in credits based on the model used and the number of tokens processed. To estimate relative model costs, refer to the official provider pricing sources linked from the model tables on [AI features for your app](https://docs.lovable.dev/features/ai).

> **How do I know which projects are generating the most usage?**
>
> Go to **Workspace settings → Plans & credit usage → Usage details**.
>
> You can filter by project across **All credits**, **Build credits**, and **Run credits**. Use **Run credits** to review Cloud, AI gateway, and connector usage by project.
>
> Workspace admins and owners can also ask Lovable in [Chats](https://docs.lovable.dev/features/chats.md) which projects use the most run credits. See [Ask Lovable what drives your run credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ask-lovable-what-drives-your-run-credit-usage).
>
> For more information, see [Tracking credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#tracking-credit-usage).


## Related topics

- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Publish your app as an MCP server](https://docs.lovable.dev/features/agent-integrations.md)
- [Security overview](https://docs.lovable.dev/features/security.md)
- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)
- [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md)
