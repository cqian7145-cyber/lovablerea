# Low credit balance and out-of-credits recovery
<!-- source: https://docs.lovable.dev/introduction/out-of-credits.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Low credit balance and out-of-credits recovery

> Understand the low credit balance warnings, prevent running out of credits, and get building and your apps running again when your workspace credits run out.

Your workspace shares one credit balance across every member and project. As it runs low, Lovable warns you so you can add credits in time. Each type of usage stops when the credits available to pay for it run out: building, AI features in your deployed apps, and apps that use the [built-in backend (Cloud)](https://docs.lovable.dev/features/cloud).

Your published pages keep serving, and [Chats](https://docs.lovable.dev/features/chats.md) and [Chat mode](https://docs.lovable.dev/features/chat-mode.md) keep working while the daily chat allowance lasts. If something has already stopped, go to [Recover after running out of credits](#recover-after-running-out-of-credits).

> [!NOTE]
>
> To set a custom low-balance alert or a credit limit for a member, project, or workspace, see [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md).

## Low credit balance warnings

Lovable warns you in the product and by email as your balance falls:

* **Your credits are likely to run out before your monthly credits refill.** Lovable bases the estimate on your workspace's recent **Run credits** usage, so credits you spend building are not part of it. Lovable warns you in two ways, unless auto top-up is enabled and not paused:
  * On Pro and Business plans, workspace admins and owners see a warning on [Workspace settings → Plans & credit usage](https://lovable.dev/settings/billing) and in **Usage details**. It shows the expected run-out date, the refill date, and an option to top up.
  * When the expected run-out date is at least a day before the refill, Lovable sends workspace admins and owners an email with both dates, so they can add credits before the run-out date. Lovable sends one email each time the estimate changes from lasting until the refill to running out before it, regardless of your email preferences.
* **Your credits for Cloud or AI usage are running low.** Lovable counts the monthly grant plus your general credits for each. Workspace admins and owners see a banner on **Plans & credit usage** and on the project's **Database**, **Users**, and **Storage** views, with an option to top up, or to upgrade if you are on the Free plan.
* **Your workspace is running low on credits.** Workspace admins and owners see a message above the project chat input with the remaining credits and an option to add more.
* **Your daily chat allowance is used up.** In a chat, Lovable tells you that further messages may use your credits. Chat usage then draws on your daily build credits, then your general credits. See [Chat costs](https://docs.lovable.dev/introduction/credits-and-usage.md#chat-costs).
* **Your workspace has no credits left for Cloud.** Before projects pause, everyone in the workspace sees a dismissible banner on the dashboard saying that the workspace needs more credits to keep hosted projects active. Admins and owners get an option to top up, or to upgrade if the workspace is on the Free plan. Lovable asks other members to contact a workspace owner.
* **Auto top-up needs attention.** Lovable emails workspace admins and owners when your card declines an auto top-up charge, and when the credits added this month reach your monthly spend limit. See [My auto top-up failed](https://docs.lovable.dev/introduction/credit-top-ups.md#my-auto-top-up-failed-what-should-i-do).

> [!TIP]
>
> To be warned at a balance you choose, set one up in [**Workspace settings → Usage limits & alerts**](https://lovable.dev/settings/alerts-limits). See [Create a low-balance alert](https://docs.lovable.dev/features/usage-limits-and-alerts.md#create-a-low-balance-alert).

## What happens when you run out of credits

Running out of credits affects each part of Lovable differently:

* **Building stops.** When your daily build credits and general credits are gone, sending a new message opens a dialog instead of building. From the dialog, workspace admins and owners can top up on Pro and Business, or upgrade if the workspace is on the Free plan. Other members see **Workspace out of credits** and can select **Send a ping**, which emails the workspace owners.
* **Work in progress pauses.** If Lovable is working on a message when the balance reaches zero, Lovable pauses the message instead of ending it. A card in the project chat shows **Add credits**, to resume where it left off, and **Finish up**, to finish the work in progress without starting anything new. Members who cannot manage billing see **Ask an admin** instead. The paused work waits until you decide.
* **Chats and Chat mode continue while the daily chat allowance lasts.** The allowance does not depend on your credit balance. When the allowance is used up for the day and no daily build credits or general credits are left, Lovable shows [Out of credits to chat](#out-of-credits-to-chat) and pauses chats until you add credits or the allowance resets at 00:00 UTC.
* **AI features in deployed apps stop working.** App features that call [AI](https://docs.lovable.dev/features/ai) at runtime fail with an error when the monthly AI grant and your general credits are both exhausted. Lovable shows no message for the failed calls themselves. The out-of-credits banner on **Plans & credit usage** and on the project's **Database**, **Users**, and **Storage** views tells you that the workspace is out of credits.
* **Built-in backend services pause.** Lovable pauses your app's backend services, such as the database, storage, and authentication, when the monthly Cloud grant and your general credits are both gone. Daily build credits cannot pay for Cloud, so they do not keep the backend running. Lovable keeps the data, but you cannot access or [export](https://docs.lovable.dev/features/database-backups.md#export-your-database) it until the services run again. The project's **Database** view says that the project is paused because the workspace is out of credits. See [Does the backend pause if I still have credits?](#does-the-backend-pause-if-i-still-have-credits)
* **Your published site stays live.** The pages of your published app keep serving. Only the parts that need the backend or AI stop responding.

## Recover after running out of credits

When eligible credits are available again, you can build and chat, and AI features in your apps resume automatically. Paused build work requires you to select **Resume**, and a paused backend requires **Wake up**. Add credits, then check the parts that paused:

1. Add credits. On Free, upgrade to a paid plan. On Pro and Business, buy a one-time top-up or enable auto top-up. See [Credit top-ups](https://docs.lovable.dev/introduction/credit-top-ups.md). If you cannot manage billing, ask a workspace admin or owner. AI features in your app start working again within a few seconds.
2. Resume paused work. In the project chat, the paused message card now shows **Resume**. Select it to continue where Lovable left off.
3. Wake the backend. While your balance is empty, the paused card in **More → Database** shows **Top up**. When credits are in your balance, the same card shows **Wake up**. Select it to restart the backend. If the button is not available yet, wait a few minutes and try again.

You can also wait for the next grant:

* Daily build credits and the daily chat allowance refresh every day at 00:00 UTC.
* Free monthly grants refresh on the 1st of each calendar month at 00:00 UTC.
* Pro and Business monthly grants refresh with the billing cycle.

## Prevent running out of credits

On Pro and Business plans, enable auto top-up so Lovable buys credits when your balance reaches or falls below your selected threshold. See [Set up auto top-up](https://docs.lovable.dev/introduction/credit-top-ups.md#set-up-auto-top-up).

To cap what a member, a project, or the whole workspace can spend, workspace admins and owners create limits in **Usage limits & alerts**. A limit can warn you or block further usage at a threshold you choose. See [Create a usage limit](https://docs.lovable.dev/features/usage-limits-and-alerts.md#create-a-usage-limit).

To see whether your usage is trending up, review **Usage details** over a 90-day range. See [Tracking credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#tracking-credit-usage).

To find out where the credits went, have Lovable investigate your run credit usage in one of two ways:

* **Ask in the chat.** In the project chat or in Chats, ask a question such as *Why is this project using so many credits?* Lovable reads the recorded usage, finds what drives it, and suggests fixes.
* **Select Optimize your usage.** In [**Workspace settings → Usage details**](https://lovable.dev/settings/usage-breakdown), **Optimize your usage** appears below the chart when the workspace used more than 5 run credits in the last 7 days. Select it to start a workspace-wide investigation in Chats.

See [Ask Lovable what drives your run credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ask-lovable-what-drives-your-run-credit-usage) for who can ask and what Lovable checks. For a project that uses more than it should, work through [Reduce a project's usage](https://docs.lovable.dev/features/project-usage.md#reduce-a-project’s-usage).

## FAQ

> **Does the backend pause if I still have credits?**
>
> It depends on which credits. Apps that rely on the built-in backend (Cloud) pause because of insufficient credits when the monthly Cloud grant and your general credits are both gone.
>
> Lovable spends the monthly Cloud grant first, but the grant is not a separate budget for your backend. When the grant runs out, Cloud usage draws from your general credits, including unused monthly plan credits, rollover credits, and top-up credits.
>
> Daily build credits and the daily chat allowance cannot pay for Cloud, so they do not keep the backend running. A backend can also pause when a [usage limit](https://docs.lovable.dev/features/usage-limits-and-alerts.md) you set blocks Cloud usage.

> **Can editors add credits?**
>
> No. Buying a top-up, enabling auto top-up, and changing the plan need the billing permission, which workspace admins and owners have. An editor who runs out of credits can select **Send a ping** in the **Workspace out of credits** dialog, and Lovable emails the workspace owners. See [Who can manage billing and top-ups?](https://docs.lovable.dev/introduction/credit-top-ups.md#who-can-manage-billing-and-top-ups)

> **Does running out of credits affect my subscription?**
>
> No. Your subscription stays active and renews as usual, and your monthly plan credits refill at the start of the next billing period. Running out of credits only pauses the usage that needs them until credits are available again. See [Where credits come from](https://docs.lovable.dev/introduction/credits-and-usage.md#where-credits-come-from).

## Troubleshooting

> **My deployed app stopped working. What should I do?**
>
> Check [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) for your credit balance.
>
> The backend pauses when the monthly Cloud grant and your general credits are gone, and AI features stop when the monthly AI grant and your general credits are gone. Add credits, enable auto top-up, or wait for the next grant refresh. On Free plans, monthly Cloud and AI grants refresh on the 1st of each calendar month at 00:00 UTC. On Pro and Business plans, monthly Cloud and AI grants refresh with the subscription billing cycle.
>
> If the backend stays paused after you add credits, open **More → Database** in the project and select **Wake up** on the paused card.
>
> If credits remain and the paused card says a credit limit is still triggered, a usage limit is blocking the project. Select **Manage limits** on the card in **More → Database**. A workspace admin or owner can raise or remove the limit there, after which the card shows **Wake up** again. See [Manage existing limits](https://docs.lovable.dev/features/usage-limits-and-alerts.md#manage-existing-limits).
>
> To avoid this in the future, see [Prevent running out of credits](#prevent-running-out-of-credits).

> **Out of credits to chat**
>
> Your workspace has used up today's daily chat allowance and has no daily build credits or general credits left, so **Chats** and **Chat mode** are paused. Add credits, ask a workspace admin or owner to add them, or wait for the allowance to reset at 00:00 UTC. Building is paused for the same reason. See [What happens when you run out of credits](#what-happens-when-you-run-out-of-credits).
>
> If chats are paused with **Credit limit reached** while credits remain, a workspace or member credit limit applies. A workspace admin or owner can raise it. See [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md).


## Related topics

- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)
- [Usage limits and alerts](https://docs.lovable.dev/features/usage-limits-and-alerts.md)
- [Credit top-ups](https://docs.lovable.dev/introduction/credit-top-ups.md)
- [Import a website into Lovable from its URL](https://docs.lovable.dev/features/projects/import-website.md)
- [Import a project from Replit, Bolt, v0, or another tool](https://docs.lovable.dev/features/projects/import-project.md)
