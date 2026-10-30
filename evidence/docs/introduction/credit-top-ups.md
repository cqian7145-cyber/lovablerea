# Credit top-ups
<!-- source: https://docs.lovable.dev/introduction/credit-top-ups.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Credit top-ups

> Buy more Lovable credits on Pro and Business with a one-time top-up, or set up auto top-up to add credits when your balance runs low.

A **credit top-up** adds credits to your workspace balance without changing your subscription. Use a top-up when you run out of credits before your plan credits refill, or when a project needs more than your plan includes for a month. Top-up credits pay for the same usage as your plan credits. See [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md).

Top-ups are available on **Pro and Business plans**. Workspace admins and owners buy them from [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing). Lovable also shows add-credits options when your balance is low, for example above the project chat input or on a paused project's **Database**, **Users**, and **Storage** views.

Each purchase is a one-time payment through Stripe with its own invoice or receipt. Top-up credits are valid for **12 months** from the purchase. Lovable spends the general credits closest to expiry first.

You can add credits in two ways:

* **Auto top-up**: Lovable buys credits for you when your balance reaches or falls below your selected threshold, up to a monthly spend limit you choose.
* **One-time top-up**: you buy a set number of credits when you need them.

Pricing depends on your plan. Top-up credits are purchased outside your subscription, so they have their own price per credit. The price is the same on monthly and annual billing.

| Plan | Top-up price | Price per credit |
| - | - | - |
| Pro | \$15 per 50 credits | \$0.30 per credit |
| Business | \$30 per 50 credits | \$0.60 per credit |

> [!TIP]
>
> If you need more credits every month, a higher plan or credit tier is usually better value than repeated top-ups. See [Upgrade your plan or credit tier](https://docs.lovable.dev/introduction/manage-subscription.md#upgrade-your-plan-or-credit-tier).

## Set up auto top-up

Auto top-up buys credits automatically when your workspace balance reaches or falls below your selected threshold. It helps prevent interruptions to building and deployed apps. It needs a payment method on file. See [Update your payment method](https://docs.lovable.dev/introduction/invoices-and-billing.md#update-your-payment-method).

**1. Open the auto top-up settings**

Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) and select **Add credits**, then **Auto top-up** and **Set up**.

**2. Choose when and how much to top up**

Set the three rules. The dialog shows the cost of each top-up and, when you set a monthly spend limit, the maximum monthly cost.

* **Top-up amount**: the number of credits each top-up adds. It must be larger than the credit threshold.
* **When my balance falls below**: the credit threshold that triggers a top-up. Auto top-up runs when your balance reaches or falls below this number of credits.
* **Monthly spend limit**: the maximum number of credits auto top-up can add in a calendar month. The limit must be at least the top-up amount. You pay only for credits actually added. Leave it at **No limit** to let auto top-up run whenever the threshold is reached.

| Setting | Default | Options |
| :- | :- | :- |
| Top-up amount | 100 credits | 50, 100, 150, 200, 250, 300, 400, 500, 1,000, 2,000, 3,000, 5,000, or 10,000 credits |
| When my balance falls below | 25 credits | 25, 50, or 100 credits |
| Monthly spend limit | 400 credits | 100, 200, 400, 1,000, 2,000, 5,000, 10,000, 25,000, 50,000, or 100,000 credits, or **No limit** |

**3. Enable auto top-up**

Select **Enable auto top-up**. **Plans & credit usage** now shows **Auto top-up enabled** with an **Edit** option next to it.

> [!TIP]
>
> For busier apps, choose a higher threshold, such as 50 or 100 credits, so a top-up runs before your balance gets close to zero.

## How auto top-up works

Lovable charges your default payment method only when a top-up runs. Auto top-up runs only if both conditions are met:

* Your balance reaches or falls below your credit threshold.
* You have no monthly spend limit, or the credits added this month are below your limit.

When a full top-up would exceed the limit, Lovable adds only the credits that still fit under it, and adds nothing more until the limit resets. For example, with a 400-credit limit and 350 credits already added this month, the next top-up adds at most 50 credits.

The monthly spend limit resets on the 1st of each calendar month at 00:00 UTC, not with your billing cycle. The reset time is shown in your time zone.

When the credits added this month reach 80% of your monthly spend limit, Lovable shows a notice on **Plans & credit usage**, unless the limit resets within the next 3 days. From there you can adjust the limit or add credits. When the credits added reach the limit, Lovable also emails workspace admins and owners.

If you need credits before the limit resets, raise the limit or buy a one-time top-up.

If a charge fails, Lovable shows a banner where you can retry or update the payment method, and emails workspace admins and owners unless your bank only asked to try again later. See [My auto top-up failed](#my-auto-top-up-failed-what-should-i-do). For what happens at zero credits, see [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md).

> [!NOTE]
>
> **Auto top-up pauses when you upgrade from Pro to Business**, because the price per credit changes. Other plan changes, such as a new credit tier or annual billing, do not pause it. See [My auto top-up paused after I upgraded to Business](#my-auto-top-up-paused-after-i-upgraded-to-business-what-should-i-do).

## Change or disable auto top-up

Workspace admins and owners can change the auto top-up settings or disable auto top-up at any time.

**1. Open the auto top-up settings**

Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) and select **Edit** next to **Auto top-up enabled**.

**2. Change the settings or disable auto top-up**

In the **Edit auto top-up** dialog, change the top-up amount, the credit threshold, or the monthly spend limit, and select **Save changes**. The dialog shows the new cost per top-up before you save.

To disable auto top-up, select **Turn off auto top-up** instead.

After you disable it, Lovable makes no further automatic purchases. Credits already bought stay in your balance, and earlier purchases are not refunded. You can still add credits with a one-time top-up.

## Buy a one-time top-up

Use a one-time top-up when you need credits now, for example to finish a build before your plan credits refill.

**1. Open the top-up dialog**

Go to [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) and select **Add credits**, then **Buy once**.

**2. Choose an amount**

Choose 50, 100, 150, 200, 250, 300, 400, 500, 1,000, 2,000, 3,000, 5,000, or 10,000 credits. The dialog shows the price before you buy.

**3. Pay**

Select **Buy credits** and confirm the payment. The credits appear in your balance when the payment is confirmed, usually within a minute.

You can buy as many one-time top-ups as you need. Each purchase gets its own invoice or receipt, which you can download from **Invoices & payments**. See [Find or download an invoice](https://docs.lovable.dev/introduction/invoices-and-billing.md#find-or-download-an-invoice).

## FAQ

> **Who can manage billing and top-ups?**
>
> Workspace admins and owners can manage the plan, top-ups, and auto top-up. For what each role can see in Usage details, see [Usage visibility by role](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-visibility-by-role).

> **Can I buy top-ups on the Free plan?**
>
> No. Top-ups are available on Pro and Business plans. On Free, upgrade to a paid plan to get more credits and unlock top-ups. See [Upgrade your plan or credit tier](https://docs.lovable.dev/introduction/manage-subscription.md#upgrade-your-plan-or-credit-tier).

## Troubleshooting

> **My auto top-up failed. What should I do?**
>
> A failed charge is a payment problem, not intended behavior. Lovable shows a banner on the dashboard, in the project editor, and in [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing). What happens next depends on the kind of failure:
>
> * **A problem with the card**, such as a decline, an expired card, a card that is no longer available, insufficient funds, incorrect details, a missing payment method, or a missing billing address. Lovable emails workspace admins and owners and does not run auto top-up again on its own for 7 days. Fix the card, then retry.
> * **A passing error at your bank**, where the bank asked Lovable to try again later. Lovable sends no email and tries again the next time your balance crosses the threshold. You can also select **Retry now** without waiting.
>
> The banner says which case applies and shows the actions that fit:
>
> * **Retry now** runs the auto top-up again with your current default payment method. The banner clears when you select it, and a new banner appears if the retry fails too.
> * **Update payment method** opens the Stripe customer portal, where you add or change the card. The next auto top-up uses the new card. When your bank needs you to confirm the charge, or no payment method is on file, this is the only action the banner shows.
> * **Edit billing information** appears when your billing address is missing. Add it, then retry.
>
> A one-time top-up does not clear the banner, because the failed auto top-up is still the last attempt. Retry it, close the banner, or disable auto top-up.
>
> If your balance reaches zero before the charge succeeds, building stops, AI features in deployed apps stop working, and apps that use the [built-in backend](https://docs.lovable.dev/features/cloud) pause. Your published site stays live. See [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md).

> **My auto top-up paused after I upgraded to Business. What should I do?**
>
> When you upgrade from Pro to Business, Lovable pauses auto top-up because the per-credit top-up price changes. This prevents your next top-up from being charged at the new Business price without confirmation.
>
> Lovable asks you whether to resume auto top-up or keep it disabled, right after checkout and each time you open [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) until you choose.
>
> You can resume auto top-up at the new Business price. Your previous top-up amount, threshold, and monthly spend limit are preserved, so you only need to confirm.
>
> You can also leave auto top-up disabled and use one-time top-ups instead.
>
> Resuming auto top-up, disabling it, or saving new auto top-up settings clears the pause.


## Related topics

- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage.md)
- [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md)
- [Change or cancel your subscription](https://docs.lovable.dev/introduction/manage-subscription.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Invoices, payments, and billing details](https://docs.lovable.dev/introduction/invoices-and-billing.md)
