# Connect your own Stripe account
<!-- source: https://docs.lovable.dev/integrations/stripe.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your own Stripe account

> Accept one-time payments and subscriptions with a Stripe account you own. Lovable builds the checkout through chat using your Stripe API key.

[Stripe](https://stripe.com/) is a payment platform for accepting cards and other payment methods online. The Stripe integration connects a Stripe account you own to your Lovable project: you provide an API key from your Stripe dashboard, and Lovable builds checkout flows, subscriptions, and a customer portal for you through chat. Payments go directly to your Stripe account.

> [!NOTE]
>
> **Most projects should use [built-in payments](https://docs.lovable.dev/features/payments.md) instead.** With built-in payments, Lovable creates and manages the payment provider account for you, so you have no API keys to handle, and you get a full payments dashboard with automatic test and live environments.
>
> | Use | If you want to |
> | - | - |
> | [**Built-in payments**](https://docs.lovable.dev/features/payments.md) (recommended) | Accept payments with the least setup. Lovable provisions the Stripe or Paddle account and manages keys, webhooks, and test and live environments for you. Requires a paid plan and, on some apps, a backend. See the [requirements](https://docs.lovable.dev/features/payments.md#requirements). |
> | **Your own Stripe account** (this page) | Use a Stripe account you already have or want to control directly, accept payments on an older React + Vite app that uses [your own Supabase](https://docs.lovable.dev/integrations/supabase.md), or accept payments on the Free plan. |
>
> A project can use one or the other, not both at the same time.

## Before you start

* **A Stripe account**. Create one at [stripe.com](https://stripe.com/) if you don't have one. You manage the account yourself: business verification, payouts, taxes, and disputes all happen in Stripe, at [Stripe's standard rates](https://stripe.com/pricing).
* **A backend**. The integration works with the [built-in backend](https://docs.lovable.dev/features/cloud), which is enabled by default, and with [your own Supabase project](https://docs.lovable.dev/integrations/supabase.md).
* **Login for subscriptions**. One-time payments work without user accounts, but subscriptions require authentication in your app so Lovable can match subscriptions to your users.
* **The Stripe connector enabled for your workspace**. Your workspace has a single **Stripe** connector setting, and it controls both built-in payments and this integration. It is enabled by default. Some Enterprise workspaces start with it disabled. On Business and Enterprise plans, a workspace admin or owner can enable it in **Connectors → [Admin settings](https://docs.lovable.dev/integrations/admin-controls.md) → App + chat connectors**.

The integration does not require a paid Lovable plan, and anyone with edit access to the project can set it up.

## Connect your Stripe account

The whole setup happens in the project chat. Have your Stripe account ready, then follow these steps:

**1. Ask for payments in the project chat**

Describe what you want to sell:

```text wrap theme={null}
Create a one-time checkout for my digital course at $29.
```

```text wrap theme={null}
Set up two subscription tiers: Basic at $9/month and Premium at $19/month.
```

Lovable recommends built-in payments first. Tell Lovable that you want to use your own Stripe account instead.

**2. Submit your Stripe API key**

Lovable shows a **Connect Stripe** form in the project chat. In the [Stripe dashboard](https://dashboard.stripe.com/apikeys), go to **Developers → API keys** and create a **restricted key** with only the permissions you need. Paste it into the **Stripe restricted API key** field and click **Submit**. Lovable validates the key with Stripe before saving it.

The form accepts a restricted key (`rk_...`) or a secret key (`sk_...`), in test or live mode. Start with a test key so you can try everything safely. Publishable keys (`pk_...`) don't work here.

> [!WARNING]
>
> Never paste your Stripe key into the project chat as a message. Only enter it in the **Connect Stripe** form. The key is stored as a backend secret, never in your app's code, and it does not pass through the chat.

**3. Review what Lovable builds**

Lovable writes the backend code, creates any products and prices you asked for in your Stripe account (asking for your approval first), and adds the buttons and pages to your app. Test the flow in the preview.

## How payments work

Lovable builds your payment flow with edge functions: small pieces of backend code that call Stripe using your stored key, so the key is never exposed in your app.

### One-time payments

For a one-time purchase, Lovable creates a checkout function and a buy button. When a buyer clicks the button, Stripe Checkout opens in a new tab. After paying, the buyer returns to a payment success page in your app, or to a cancellation page if they cancel. Buyers don't need an account in your app: if no one is signed in, Stripe collects the buyer's email at checkout.

### Subscriptions

For subscriptions, Lovable builds checkout for your plans and a subscription check that runs when users sign in and use your app. Your app asks Stripe directly whether the user has an active subscription, so paid features unlock and lock automatically.

> [!NOTE]
>
> Subscriptions are matched to users by **email address**. A user's subscription is recognized when the email they sign in with matches the email on their Stripe customer record.

To let subscribers cancel or change their plan themselves, ask Lovable to add a **Manage subscription** button that opens Stripe's hosted customer portal. Before it works, activate the portal once in your Stripe dashboard: see [Stripe's customer portal guide](https://docs.stripe.com/customer-management/activate-no-code-customer-portal). The portal does not work inside the Lovable preview panel, so test it in a standalone browser tab or on your published app.

### Products and prices

Lovable can create products and prices directly in your Stripe account, asking for your approval in the project chat before each one. It can also reuse products and prices that already exist in your account. Everything it creates is visible in your Stripe dashboard, as if you had created it there.

### Webhooks

By default, the integration does not use webhooks: your app checks payment and subscription status directly with Stripe. This keeps the setup simple and is enough for most apps.

Webhooks are messages Stripe sends to your backend as soon as an event occurs, such as a payment succeeding. If you need them (for example, to trigger order fulfillment), ask Lovable to set them up. Lovable writes the webhook function, and you finish the setup in your Stripe dashboard:

**1. Create an event destination**

In the Stripe dashboard, go to **Developers → Webhooks** and create an event destination pointing at the webhook function's URL.

**2. Select events**

Select the events you care about, such as `payment_intent.succeeded` or `customer.subscription.updated`.

**3. Store the signing secret**

Copy the signing secret and add it as a secret when Lovable asks for it.

You manage webhook endpoints and signing secrets yourself in your Stripe dashboard.

## Test and go live

The key you provide determines the mode: a test key (`rk_test_...` or `sk_test_...`) keeps everything in Stripe's test mode, where the card number `4242 4242 4242 4242` with any future expiration date and any 3-digit security code (CVC) completes a payment without charging real money.

You can test the full flow directly in the preview. Checkout opens in a new tab. Unlike built-in payments, the preview has no separate test environment: your project uses one key at a time, so with a live key, payments made from the preview are real.

To go live:

**1. Switch to a live key**

Ask Lovable to update your Stripe key, and submit a live key in the **Update Stripe secret key** form.

**2. Switch to live products and prices**

Confirm that your products and prices exist in live mode in Stripe. Price IDs differ between test and live mode, so ask Lovable to switch your app to the live price IDs.

**3. Verify with a real purchase**

Run a real purchase on your published app.

## Manage the integration

### See your payments

Open **Payments** from the project's **More** menu. This is the same view that built-in payments uses. On a project using your own Stripe account, it shows a **Self-managed Stripe** badge and a read-only view of your payments data, including transactions, refunds, and products. Use the **Open in Stripe** button to manage products, issue refunds, and change settings in your Stripe dashboard.

### Update your Stripe key

Ask Lovable to update your Stripe key at any time, for example after rotating it in Stripe or when switching from test to live. The **Update Stripe secret key** form works the same way as the **Connect Stripe** form. If your stored key stops working (for example, you revoked it in Stripe), Lovable pauses Stripe actions and asks you to submit a new key.

### Where your key is stored

The key is stored as a backend secret named `STRIPE_SECRET_KEY`. Lovable never shows the value again and it never appears in your app's code or repository.

* On a project using the built-in backend, it appears under **More → Settings → Secrets** with a **Lovable** badge. Update it through chat, not from the Secrets view.
* On a project using **your own Supabase**, it is synced to your Supabase project's edge function secrets, which you can see in the Supabase dashboard.

### Disconnect Stripe

Anyone with edit access to the project can disconnect, the same as for connecting. This differs from [built-in payments](https://docs.lovable.dev/features/payments.md#disconnect-payments), where disconnecting is limited to admins, owners, and the person who set payments up.

**1. Open the Payments view**

Open **Payments** from the project's **More** menu.

**2. Disconnect**

Open the three-dot menu in the top-right corner and click **Disconnect Stripe**. Type **DISCONNECT** to confirm.

When you disconnect, Lovable permanently deletes the stored API key from your project. What happens to your app's payment features depends on the backend:

* On a project using the built-in backend, payment features stop working until you reconnect or remove the payment code.
* On a project using **your own Supabase**, Lovable does not remove `STRIPE_SECRET_KEY` from your Supabase project's edge function secrets. The deployed payment functions keep working, and keep charging customers, as long as that secret exists. To stop payments, delete `STRIPE_SECRET_KEY` in the Supabase dashboard or remove the payment code.

Your Stripe account is not affected: products, customers, and payment history stay in Stripe. To reconnect, ask Lovable for Stripe payments again and submit a key.

> [!WARNING]
>
> When you disconnect, Lovable does not cancel your customers' active subscriptions and does not refund payments. Manage those in your Stripe dashboard.

## Limitations

* A project can't use your own Stripe account and built-in payments at the same time. Disconnect one before enabling the other.
* The **Payments** view is read-only for this integration. You create products, issue refunds, and configure webhooks in your Stripe dashboard.

## Troubleshooting

> **Stripe rejected the key**
>
> Stripe refused the key you submitted. Check that you copied a restricted API key with sufficient permissions and try again.

> **Lovable asks me to update my Stripe key**
>
> The stored key is no longer valid, usually because it was revoked or its permissions changed in Stripe. Stripe actions pause until you submit a working key in the **Update Stripe secret key** form.

> **Lovable won't offer to connect my own Stripe account**
>
> The workspace's **Stripe** connector is disabled. While it is disabled, Lovable does not show the **Connect Stripe** form in the project chat. Lovable replies that the connector is disabled for the workspace. On Business and Enterprise plans, a workspace admin or owner can enable it in **Connectors → [Admin settings](https://docs.lovable.dev/integrations/admin-controls.md) → App + chat connectors**. Some Enterprise workspaces start with it disabled. Projects that already have payments set up keep working while the connector is disabled.
>
> If the workspace's **Paddle** connector is also disabled, the **Payments** view shows a "Payments are disabled for this workspace" screen.

> **The customer portal shows an error**
>
> The hosted customer portal must be activated once in your Stripe dashboard before your app can open it. Follow [Stripe's customer portal guide](https://docs.stripe.com/customer-management/activate-no-code-customer-portal), then try again. If the portal is activated but still fails or nothing happens, check where you are testing: the portal does not work inside the Lovable preview panel, and a popup blocker can stop it if your app opens it in a new tab. Open your app in a standalone browser tab or use your published app.

> **Checkout doesn't open**
>
> Checkout usually opens in a new tab, and a popup blocker can stop it. Allow popups for your app's address and try again. If checkout opens but payment fails, check that you are using Stripe's test card while on a test key, and a real card only with a live key.

> **Checkout fails with an error**
>
> The error comes from the checkout function, the backend code Lovable wrote for your app. Read its logs to see what Stripe returned.
>
> * On a project using the built-in backend, open **More → Settings → Logs** and check the [function logs](https://docs.lovable.dev/features/logs.md).
> * On a project using **your own Supabase**, open the Supabase dashboard and check the logs under **Edge Functions**.
>
> Stripe also records every API request it receives. In the Stripe dashboard, go to **Developers → Logs** to see the failed request and Stripe's error message.
>
> Once you know the error, paste it into the project chat and ask Lovable to fix it.

## FAQ

> **Do payments work in the preview?**
>
> Yes. You can run the full checkout flow from the preview, and checkout opens in a new tab. Use a test key while building so you don't charge real cards. The customer portal is the exception: it does not work inside the preview panel, so test it in a standalone browser tab or on your published app.

> **Can Lovable use products and prices that already exist in my Stripe account?**
>
> Yes. Tell Lovable which products or prices to use, or let it look them up in your account. It only creates new ones with your approval.

> **Can anyone see my Stripe key after I submit it?**
>
> No. The key is stored as a backend secret, and Lovable does not read stored secret values back. It never appears in your code, your repository, or the chat.

> **Who bills me for payment processing?**
>
> Stripe does, on your own Stripe account at [Stripe's standard rates](https://stripe.com/pricing). Lovable charges credits for building and changing the integration, like any other edit.

> **Does disconnecting cancel my customers' subscriptions?**
>
> No. When you disconnect, Lovable only removes the API key from your Lovable project. Active subscriptions keep renewing, and nothing in your Stripe account changes. Cancel subscriptions or issue refunds in your Stripe dashboard.

> **Why does the Stripe connector in my workspace settings describe built-in payments?**
>
> The connector list has a single **Stripe** entry, and its description covers built-in payments, where Lovable provisions the Stripe account for you. The same setting also controls this integration. The list has no separate entry for connecting your own Stripe account.

> **Can I switch to built-in payments later?**
>
> Yes, if your project meets the [built-in payments requirements](https://docs.lovable.dev/features/payments.md#requirements). Disconnect Stripe first, then ask Lovable to set up payments. Built-in payments creates a new provider account. Your existing Stripe account and its customers are unaffected, and you continue to manage them in Stripe.


## Related topics

- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [App user connectors: let your users connect their own accounts](https://docs.lovable.dev/integrations/app-user-connectors.md)
- [Connect your app to Databricks](https://docs.lovable.dev/integrations/databricks.md)
- [Connect your app to Pipedrive](https://docs.lovable.dev/integrations/pipedrive.md)
