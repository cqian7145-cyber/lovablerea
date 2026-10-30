# Add payments to your app
<!-- source: https://docs.lovable.dev/features/payments.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Add payments to your app

> Accept subscriptions and one-time payments in any Lovable app using built-in Paddle or Stripe integration.

Lovable's built-in payments let you monetize your app with subscriptions and one-time payments. Lovable handles the infrastructure, including creating accounts, connecting everything, and managing the technical setup, so you can focus on building your product.

Built-in payments are currently powered by two providers: **Paddle** and **Stripe**. When you ask Lovable to add payments, it analyzes your project and either presents both options or recommends a specific provider based on what you are selling.

## Eligibility

Built-in payments support **digital products** and **software**:

* SaaS apps with subscription tiers
* Consumer apps with premium unlocks or one-time purchases
* Memberships and communities with recurring access fees
* Digital downloads such as e-books, templates, courses, or music
* Developer tools with API access or usage-based plans

**Physical products** can use the [Shopify integration](https://docs.lovable.dev/integrations/shopify.md) which provides a full e-commerce suite. Built-in payments powered by Stripe can also be used, but inventory and logistics will need to be managed separately.

> [!WARNING]
>
> **Restricted and forbidden products**
>
> Some product categories are restricted or forbidden by Paddle and Stripe. Restricted products (such as certain financial services or regulated industries) may require additional review and are not guaranteed approval. Forbidden products (such as illegal goods) will be rejected outright.
>
> See [Paddle's acceptable use policy](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle) and [Stripe's restricted businesses list](https://stripe.com/legal/restricted-businesses) for details.

## Before you start

### Requirements

* **Pro plan or higher**: built-in payments require a paid Lovable plan. On the Free plan, you can [connect your own Stripe account](https://docs.lovable.dev/integrations/stripe.md) instead.
* **Backend**: newer apps on [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) (created from May 13, 2026, or June 22, 2026 on Enterprise plans) can take payments without extra setup. They need a database, either the [built-in backend](https://docs.lovable.dev/features/cloud) or [your own Supabase project](https://docs.lovable.dev/integrations/supabase.md), only when the app stores payment data such as subscriptions or orders. Older React + Vite apps always require the built-in backend and aren't compatible with your own Supabase project. If a backend is needed and not enabled yet, Lovable will ask you to activate it during setup.
* **Authentication recommended**: your app should have authentication so purchases can be linked to individual users.
* **Permission to set up payments**: only project admins and owners, and workspace admins and owners, can set up payments. Managing the integration afterward (disconnecting, switching) is restricted to the same roles and the user who set it up.

### How setup works

The setup flow has two parts:

1. **Set up and test**: enable a payment provider, create products and prices, and test everything in the preview using test cards. No real money is charged.
2. **Go live**: complete your provider's verification process, run a readiness check, and publish. After going live, your test environment stays available for safe testing alongside the live environment.

### Test and live environments

Lovable manages two separate payment environments that map to how you already use your project:

**Test mode** applies when you use your project in the preview. Checkout only accepts test card numbers. Real cards will not work and no money is charged. Use this to build your payment flow and verify that everything works before going live.

**Live mode** applies to your published app. Checkout processes real cards and customers are charged real money.

Each environment has its own products, prices, and transaction history. When you publish your project, products and prices sync from test to live automatically (see [Publishing and product sync](#publishing-and-product-sync)).

Payments in the preview work right away after setup. Checkout on your published app will not process real payments until you complete the [go-live steps](#go-live).

The **Payments tab** has a toggle to switch between test and live data. In your app, Lovable adds a **test mode banner** that only appears in the preview and is hidden on your published site.

After going live, both environments stay active. You can continue testing new products and changes in the preview before syncing them to live.

## Set up payments

### Choose your provider

Lovable analyzes your project and either presents both providers or gives a recommendation. If your product is restricted under one provider's policies, Lovable will guide you to the other. Here is how they compare:

| | **Paddle** | **Stripe** |
| - | - | - |
| **Operating model** | Merchant of Record (MoR) | PSP with optional MoR ([Managed Payments](https://docs.stripe.com/payments/managed-payments)) |
| **Who is eligible** | Digital products and software in [supported countries](https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle) | Digital products, services, and physical products in [Stripe-supported countries](https://stripe.com/global) |
| **Benefits** | Dedicated merchant of record model that manages payments, tax, compliance, billing, and support. Routes and optimizes payment performance with simple, predictable per-transaction pricing. | Optional merchant of record on a per-transaction basis. Lower processing cost for domestic sales. Supports services in addition to digital products. |
| **Cost** | 5.0% + 50¢ per transaction, no monthly fee | [Standard Stripe pay-as-you-go rates](https://stripe.com/pricing) |
| **Best for** | SaaS apps and digital products selling to a global audience | Projects selling services, targeting domestic markets, or needing per-transaction control over MOR |

Both Paddle and Stripe offer reduced rates for microtransactions. For Paddle, transactions under \$10 are charged a flat 10% so that payment fees never exceed 10% of the purchase price. See [Paddle's pricing](https://www.paddle.com/pricing) and [Stripe's pricing](https://stripe.com/pricing) for full details. Using Stripe or Paddle through Lovable costs the same as setting up the provider directly.

> [!NOTE]
>
> **What is merchant of record (MOR)?**
>
> A merchant of record is the legal entity responsible for processing payments and handling tax compliance. When a provider acts as MOR, they are legally the seller. They calculate, collect, and remit taxes automatically, and handle invoices and receipts. You receive payouts after fees.
>
> Paddle is a dedicated MOR. All transactions are processed through their merchant of record service. Stripe offers optional MOR ([Managed Payments](https://docs.stripe.com/payments/managed-payments)) that can be enabled on a per-transaction basis for digital products. Managed Payments is available in [fewer countries](https://docs.stripe.com/payments/managed-payments/eligibility) than Stripe's standard payment processing.

### Enable payments

**1. Ask Lovable to add payments**

Tell Lovable you want to accept payments. Examples:

```text wrap theme={null}
Add a pricing page to my app with a $29/month subscription.
```

```text wrap theme={null}
I want to sell my digital course for $197. Set up checkout and make sure I can test it before going live.
```

Lovable will suggest the provider it finds best for your use case and help you enable the integration.

**2. Review the feature overview**

An **Enable payments** dialog appears summarizing the provider's features and pricing. Click **Continue** to proceed.

**3. Fill in the account setup form**

Lovable displays a short form to create your payment provider accounts.

**For Paddle:**

* **Email address**: must not already be registered with Paddle. If it is, use a plus alias like `yourname+lovable@gmail.com`. Emails sent to a plus alias automatically arrive in your main inbox (`yourname@gmail.com`), so you don't need a separate account.
* **First and last name**: your legal name (pre-filled from your Lovable account).
* **Project name**: used as your business name and statement descriptor on bank statements.
* **Acceptable use policy**: you must agree to Paddle's acceptable use policy, terms of use, and privacy policy.

**For Stripe:**

* **Email address**: used to register your Stripe account (cannot be changed after setup).
* **Name**: your business or personal name.
* **Country**: where your business is registered.

**4. Create products and prices**

Tell Lovable what you want to sell:

```text wrap theme={null}
Create three pricing tiers: Starter at $9/month, Pro at $29/month, and Enterprise at $99/month.
```

```text wrap theme={null}
Create a one-time payment of $49 for lifetime access.
```

Lovable creates the products and prices, builds your checkout flow, and adds the UI components to your app. You can also set up discounts and trials:

```text wrap theme={null}
Add a 14-day free trial to the Pro plan.
```

```text wrap theme={null}
Create a 20% discount code LAUNCH valid for the first 3 months.
```

### The payments tab

The **Payments** section is always visible under the [**More** menu](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) in the project toolbar for anyone with edit access to the project, whether or not payments are set up. Once payments are enabled, the tab includes:

* **Environment toggle**: switch between test and live data
* **Revenue analytics**: net revenue, active subscriptions, and charts over 7/30/90-day ranges
* **Transactions**: product, customer, amount, status, and date for each transaction
* **Adjustments**: refunds, credits, and chargebacks. Each entry shows action type, amount, reason, status, and date
* **Go-live checklist**: tracks your progress toward accepting real payments

You can also open your provider's dashboard directly from the Payments tab for settings that Lovable does not manage, such as checkout appearance (fonts, colors, logo) and payment method configuration.

> [!NOTE]
>
> Transaction and subscription statuses (such as active, trialing, canceled, or past\_due) appear in the Payments tab. The available statuses depend on your provider.

### Before payments are set up

Opening the **Payments** tab on a project without payments shows one of three screens, depending on your project role and workspace configuration:

* **Accept payments**: the starting point for setting up payments. It lists your payment options (built-in payments, or the [Shopify connector](https://docs.lovable.dev/integrations/shopify.md) for physical goods), and the **Explore payments** button asks Lovable to help you set up the best option in the project chat.
* **Payments are disabled for this workspace**: built-in payments run through the workspace's Stripe and Paddle [connectors](https://docs.lovable.dev/integrations/introduction), and neither is enabled. On Business and Enterprise plans, a workspace admin or owner can enable one of them in **Connectors → [Admin settings](https://docs.lovable.dev/integrations/admin-controls.md) → App + chat connectors**. Some Enterprise workspaces start with these connectors disabled. The Stripe connector setting also controls [connecting your own Stripe account](https://docs.lovable.dev/integrations/stripe.md).
* **You don't have access to payments**: setting up payments requires payments management access on the project. Ask a [project admin or owner](https://docs.lovable.dev/features/collaboration.md#project-permissions) to set payments up or to give you access.

If the Stripe or Paddle connector is disabled after payments are already set up on a project, the **Payments** tab keeps showing the full dashboard, with a banner explaining that the connector is disabled.

### Customer portal

Both Paddle and Stripe provide a hosted customer portal where end users can cancel subscriptions, update payment methods, and view invoices. To add it:

```text wrap theme={null}
Add a Manage subscription button that opens the customer portal.
```

> [!NOTE]
>
> The customer portal opens in a new browser tab and cannot be embedded in an iframe. It will not function inside the Lovable preview panel. Test it by opening your deployed site in a standalone browser tab.

### Checkout display modes

**Paddle** supports two checkout modes:

* **Overlay** (default): a modal appears on top of the current page.
* **Inline**: checkout is embedded inside the page layout.

Ask Lovable to switch.

```text wrap theme={null}
Show the checkout inline on my pricing page instead of as a modal.
```

**Stripe** uses embedded checkout only. The checkout form is embedded directly on the page. It cannot be customized through Lovable. Styling changes must be configured in the Stripe dashboard.

### Webhook endpoints

Lovable registers two webhook endpoints on your provider account for each environment (test and live). They can look like duplicates in your provider's dashboard, but they serve different purposes:

* **Your app's endpoint** delivers payment events to your app's webhook handler. It keeps subscription data current and unlocks features after purchases. Its URL points at your app's backend and ends in `?env=sandbox` or `?env=live`, for example `https://<ref>.supabase.co/functions/v1/payments-webhook?env=sandbox` or `https://project--<id>-dev.lovable.app/api/public/payments/webhook?env=sandbox` in the test environment. The live endpoint uses `?env=live`, and on `lovable.app` URLs it drops the `-dev` suffix from the host.
* **Lovable's monitoring endpoint** (`https://api.lovable.dev/projects/<project-id>/payments-webhook/<environment>`) sends a copy of payment events to Lovable so it can monitor that payment events are being delivered correctly. It never forwards events to your app, and the analytics in the **Payments tab** do not depend on it.

Webhook URLs name the test environment `sandbox`, so expect `sandbox` rather than `test` in the URLs registered for your test environment. The live endpoints are created when you set up your live environment, so before going live you only see the test endpoints.

> [!WARNING]
>
> Do not delete or disable either Lovable-registered endpoint in your provider's dashboard. Deleting your app's endpoint silently stops payment events from reaching your app: purchases still succeed, but subscriptions never activate and features never unlock. Lovable's monitoring endpoint cannot take over that job.

An endpoint that matches neither URL shape above was not created by Lovable. You can remove endpoints you created yourself. A duplicate that points at the same URL as your app's endpoint delivers events your app cannot verify, so removing it can fix webhook delivery issues.

## Testing

Your test environment is active immediately after setup. Use the preview to test the full payment flow before going live.

### Test cards

| Card number | Result |
| - | - |
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 3220 | Payment with 3D Secure |
| 4000 0000 0000 0002 | Failed payment |

Use any future expiry date, any 3-digit CVV/CVC, and any billing address.

> [!NOTE]
>
> Lovable automatically adds a test mode banner to your app that only appears in the preview.

### What to test

Verify that your business logic works end-to-end:

1. Complete a test purchase and confirm the correct features unlock.
2. Check that entitlements, modals, notifications, and redirects all behave as expected.
3. Review transactions in the Payments tab.

> [!NOTE]
>
> In test mode, you can simulate subscription renewals without waiting for a full billing cycle. Ask Lovable: "How do I test a subscription renewal?"

### Scenarios to consider

* **Upgrades and downgrades**: does switching tiers grant the correct features?
* **Cancellations**: does the user retain access until the end of their billing period?
* **Renewals**: does the subscription renew and continue granting access?
* **Failed payments**: does the app handle `past_due` status gracefully?
* **Trials**: does a trialing user get access, and does billing start correctly after the trial ends?
* **Discount codes**: does the discounted price apply correctly at checkout?

## Go-live

When your app is ready to accept real payments, open the Payments tab and follow the go-live checklist.

> [!WARNING]
>
> Until all go-live steps are completed, live checkout will not work.

### Going live with Paddle

**1. Readiness check**

Click **Run check**. Lovable reviews your live site to confirm:

* Privacy policy exists
* Terms of service exist
* Refund policy exists
* Site content is genuine and complies with Paddle policy

If a check fails, the dashboard explains what to fix. Ask Lovable to resolve the issue and run the check again.

**2. Project setup**

Lovable checks that at least one product with a price exists and your latest changes are published.

**3. Verification (KYC/KYB)**

Click **Complete verification** to open Paddle's seller verification form. The form collects product information, compliance screening questions, and personal or business details.

Business types include Individual (sole trader), Private company, and Public company. Starting as Individual is faster. You can upgrade later through the Paddle dashboard.

Verification processing time depends on your location and product. Most users are approved within a day, but it can take several days. Paddle may contact you by email or through the Paddle dashboard to request additional identity or business documentation.

While waiting, you can:

1. Ask Lovable to hide the checkout button in production until verification completes
2. Wait to publish your project
3. Publish anyway (checkout will not function until approved)

See [Paddle's account verification documentation](https://www.paddle.com/help/start/account-verification) for details.

**4. Domain review**

Paddle reviews your live domain to confirm it represents a legitimate product with real content and legal pages. Make sure your deployed site is complete before submitting.

If Paddle finds an issue with your domain, this step shows **Action required** and Paddle emails you the details. Fix the issue, then select **Resubmit for review** to send the domain back to Paddle for another review. A domain that Paddle fully rejects can only be restored by Paddle support. Only people who manage payments on the project can resubmit.

**5. Approval**

Once all steps pass, your production app can accept real payments. A **Set up payouts** banner will appear prompting you to add bank account details in the Paddle dashboard.

### Going live with Stripe

> [!NOTE]
>
> The Stripe go-live process happens partly in the Stripe dashboard, not in Lovable. You will need to complete steps directly on Stripe's site.

**1. Claim your Stripe account**

Click the link in the Payments tab to claim the Stripe account that Lovable created for you. Stripe refers to this as your "sandbox" account. This opens Stripe's claim page where you take ownership.

If you already have a Stripe account, you can link the sandbox to it during this step. You do not need to create a new account.

**2. Complete go-live steps in Stripe**

Complete the onboarding checklist in the Stripe dashboard:

* Set up your Stripe account
* Verify your email
* Complete account onboarding

Stripe will prompt you to copy products, prices, and the Lovable app from your test account to your live account as part of this process. This also installs the Lovable app on your live account, which connects your live API keys and webhooks.

**3. Readiness check**

Lovable reviews your live site to confirm:

* Privacy policy exists
* Terms of service exist
* Refund policy exists
* Site content is genuine and substantive

Once all steps are completed, your production app can accept real payments. Payout configuration is managed directly in the Stripe dashboard.

### Publishing and product sync

When you publish your project, products and prices created through Lovable sync automatically from your test environment to your live environment. This runs as part of the publish step, so you do not need to copy anything manually. Subsequent publishes re-sync any catalog changes you have made in test, so test stays the source of truth.

> [!WARNING]
>
> Avoid editing products directly in your provider's dashboard. This may cause lost context in Lovable and ID mismatches between test and live environments. Always manage products through Lovable.

> [!NOTE]
>
> Discounts are not included in the publish sync. Lovable only syncs products and prices from test to live so that pricing stays consistent between the two environments. Discount codes are usually short-lived and live-environment-specific, so you create them directly against the live provider. To add a discount in live, ask Lovable from a project that has gone live and be explicit about the environment, for example:
>
> ```text wrap theme={null}
> In live, create a 20% discount code LAUNCH valid for the first 3 months.
> ```
>
> You can also create discounts directly in your provider dashboard.

## Disconnect payments

You can remove payments from a project at any time. Open the **Payments** tab, click the three-dots menu in the top-right, and select **Disconnect payments**. In the confirmation dialog, type `DISCONNECT` (all caps) to confirm.

Only the user who set payments up, workspace owners and admins, or project owners and admins can disconnect. If the option is grayed out, ask someone with the right access to do it.

> [!WARNING]
>
> There is no undo. Lovable deletes your API keys, webhook secrets, environment variables, and integration data from the project, and checkout stops until you set payments up again. Setting up again is a fresh setup. With Stripe, you can connect the same Stripe account when you go live. With Paddle, Lovable creates a new seller account, because the one it created for the project cannot be connected again.

### What disconnecting does

* Removes the API keys, webhook secrets, and payment-related environment variables Lovable provisioned for the project.
* Deletes the webhooks Lovable registered on your Paddle or Stripe account. This is best effort: if the call to the provider fails, the webhook stays on the provider side and Paddle or Stripe auto-disables it after repeated failed deliveries.
* Stops checkout, subscription syncing, and provider webhooks from reaching your app immediately. Live checkout on your published site will not work until you set payments up again.

### What disconnecting does not do

* Does not close or modify your Paddle or Stripe account. Your provider dashboard at [vendors.paddle.com](https://vendors.paddle.com) or [dashboard.stripe.com](https://dashboard.stripe.com) stays fully accessible.
* Does not cancel active subscriptions or issue refunds. Customers continue to be billed by the provider until you cancel their subscriptions in the provider dashboard.
* Does not notify your customers. Plan that communication yourself if checkout is going away.
* Does not affect other Lovable projects connected to the same provider account.

> [!NOTE]
>
> If your goal is to move from one provider to the other, see [Switch payment providers](#switch-payment-providers) below for the full flow.

## Switch payment providers

Only one built-in payment provider can be active per project at a time. If you start with one provider and decide a different one fits better, you can switch.

> [!WARNING]
>
> Switching providers is disruptive. Before you start, understand the trade-offs:
>
> * **Products and prices do not carry over.** You will recreate your catalog in the new provider.
> * **Existing subscriptions do not migrate.** Current subscribers stay on the old provider until they cancel and resubscribe, or you move them manually.
> * **Transaction and analytics history stays with the old provider.** Past payments, payouts, and reporting remain in the previous provider's dashboard and are not transferred to the new one.
> * **Webhooks, customer IDs, and provider-specific code are regenerated** for the new provider.

**1. Disconnect the current provider**

Follow the [Disconnect payments](#disconnect-payments) steps to remove your current provider from the project. Lovable cannot do this for you. Do it from the **Payments** dashboard.

**2. Remove the old provider's code**

Before enabling the new provider, ask Lovable to clean up code tied to the previous provider, including SDK imports, hooks, server functions, webhook routes, and any database tables that only existed for the old provider. Removing this first matters: the agent gets confused when Paddle and Stripe code are mixed in the same project, which can lead to broken edits when wiring up the new provider.

**3. Ask Lovable to enable the new provider**

Once the old provider is disconnected and its code is removed, follow the standard [enable payments](#enable-payments) flow for the new provider. For example:

```text wrap theme={null}
Switch my payments from Paddle to Stripe.
```

Lovable runs the eligibility check, enables the new provider, and helps you recreate products, prices, and checkout.

## Limitations

* **Digital products by default**: for physical products, use the [Shopify integration](https://docs.lovable.dev/integrations/shopify.md) or built-in payments powered by Stripe.
* **One payment provider per project**: you cannot run Paddle and Stripe in the same project. You can [switch between providers](#switch-payment-providers), but products, prices, and subscriptions do not migrate.
* **One subscription per user per environment by default**: each user can have one active subscription. If you need add-ons or multiple subscriptions, ask Lovable to adjust this.
* **Projects with payments cannot be remixed**: once payments are enabled, the project cannot be forked. See [Remix a project](https://docs.lovable.dev/features/projects/remix.md).
* **Checkout styling and payment methods**: these must be configured in your provider's dashboard, not through Lovable.
* **Do not create or delete webhooks manually**: Lovable registers its webhook endpoints automatically, and they must stay in place (see [Webhook endpoints](#webhook-endpoints)). Manually added duplicates can also cause issues.

## Best practices

* **Run the readiness check before submitting verification**: fixing issues early prevents delays.
* **Use a custom domain before going live**: providers review your live domain. A custom domain looks more legitimate than `.lovable.app`.
* **Test the full subscription lifecycle in the preview**: purchase, cancellation, renewal, failed payments, and trials.
* **Choose a clear statement descriptor**: customers should recognize the charge on their bank statement.
* **Do not revoke access immediately when a subscription is canceled**: the user has already paid through the end of their current billing period and should retain access until then.
* **Handle failed renewals gracefully**: prompt the user to update their payment method rather than immediately revoking access.
* **Manage products through Lovable**: manual changes in the provider dashboard can create mismatches between environments.

## FAQ

> **Do I need to sign up for Paddle or Stripe?**
>
> No. Lovable creates and manages your payment provider accounts automatically. For Paddle, you complete their verification form before going live. For Stripe, you claim the account Lovable created and install the Lovable app.

> **I already have a Stripe account. Can I link it?**
>
> Yes. Lovable creates a new empty sandbox environment for you, and when you claim it you can link it to your existing Stripe account. You do not need to create a new account.

> **What is the difference between Paddle and Stripe?**
>
> Paddle is a dedicated merchant of record that handles tax compliance, invoicing, and receipts for all transactions. Stripe offers an optional MOR service that you can enable on a per-transaction basis. See the comparison table above for details on eligibility, cost, and best-fit scenarios.

> **My email is already registered with Paddle. What should I do?**
>
> Use a different email address. A plus alias like `yourname+lovable@gmail.com` is an easy option. Any email sent to a plus alias automatically arrives in your main inbox ([yourname@gmail.com](mailto:yourname@gmail.com)), so you don't need to create a separate account. It's just a way to use a variant of your existing address.

> **My country is not in the dropdown. Why?**
>
> Some countries are excluded because the provider cannot create seller accounts there due to international sanctions or regulatory restrictions. If your country is not listed for one provider, try the other.

> **The readiness check failed. What should I do?**
>
> Fix the issues listed in the dashboard and run the check again. Common failures include missing privacy policy, missing terms of service, missing refund policy, or an unpublished site.

> **The Payments tab says my API key is invalid. What should I do?**
>
> When Lovable can't authenticate with Paddle or Stripe, the Payments tab replaces the dashboard with **The live API key is invalid**, or **The sandbox API key is invalid** when you're on **Test**, and asks you to contact support. Revenue analytics, transactions, adjustments, and products stay hidden while the message is showing.
>
> This means the credentials Lovable holds for your provider stopped working, usually because the key was deleted or rotated in your provider's dashboard, or the connection was removed on the provider's side. Your provider account and the data in it are not affected. Contact [Lovable support](https://lovable.dev/support) to get the connection restored.

> **Can I offer both monthly and yearly billing?**
>
> Yes. Ask Lovable to create multiple prices for the same plan.

> **Can I offer a free trial?**
>
> Yes. Trials appear with `trialing` status and should grant access like active subscriptions.

> **Can I offer discount codes?**
>
> Yes. Lovable can create discount codes through your payment provider.

> **Can I customize checkout appearance or payment methods?**
>
> Yes, but these settings must be configured directly in your provider's dashboard.
>
> For example, enabling additional payment methods such as **SEPA Direct Debit**, **iDEAL**, **Bancontact**, or local wallets (Apple Pay, Google Pay) is not something Lovable manages. You toggle them on in the Stripe or Paddle dashboard, and they then appear at checkout automatically. You can open your provider's dashboard directly from the Payments tab in Lovable.

> **I see two webhook endpoints in my provider dashboard. Are they duplicates?**
>
> No. Lovable intentionally registers two endpoints per environment: one delivers payment events to your app, and one lets Lovable monitor payment event delivery. If you are cleaning up or deduplicating webhooks, leave both in place. See [Webhook endpoints](#webhook-endpoints) for how to recognize them and what breaks if you delete one.

> **Why does my app reject webhooks with 'Invalid webhook signature'?**
>
> Your app verifies each delivery with a signing secret that Lovable manages. First check that the webhook handler still exists in your app and that no duplicate endpoint points at the same URL (see [Webhook endpoints](#webhook-endpoints)). If every delivery in one environment still fails, ask Lovable to rotate the webhook secret for that environment.
>
> Rotation replaces the endpoint with a new one at the same URL with the same events, so publish your app again right after; the preview picks the new secret up on its next build. Events your provider failed to deliver before or during the rotation are not redelivered, so check the provider dashboard for payments made in that window and update those orders in your app.

> **The checkout is not working on my published site. Why?**
>
> If your account has not completed verification, live checkout will not function. Check the go-live checklist in the Payments tab.

> **How long does account verification take?**
>
> Most reviews complete within a day, but it can take several days depending on your location and product. Track progress in the Payments tab.

> **What are adjustments?**
>
> Adjustments are financial corrections applied after a transaction. Examples include refunds, credits, or chargebacks.

> **The customer portal is not working. What is wrong?**
>
> The portal must open in a new browser tab. If you are testing inside the Lovable preview panel, open your deployed site in a standalone tab.

> **My project uses an external Supabase connection. Can I use built-in payments?**
>
> On newer apps on TanStack Start (created from May 13, 2026, or June 22, 2026 on Enterprise plans), yes: built-in payments work alongside your own Supabase connection. On older React + Vite apps, no: built-in payments require the built-in backend there. To accept payments on an older Supabase-connected app, [connect your own Stripe account](https://docs.lovable.dev/integrations/stripe.md) instead, or [upgrade the app to TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md).

> **My project uses Stripe via a Connector. Can I switch to built-in payments?**
>
> Not directly. Lovable does not migrate an existing Stripe connection to built-in payments yet. To switch, you need to first remove the existing Stripe connection, then ask Lovable to add built-in payments. [Connecting your own Stripe account](https://docs.lovable.dev/integrations/stripe.md) (which requires your own `STRIPE_SECRET_KEY`) is a separate integration and is different from the built-in Stripe payments described on this page.

> **Can I switch from one built-in provider to another?**
>
> Yes. Open the **Payments** tab, use the three-dots menu in the top-right to disconnect your current provider, and then ask Lovable to enable the new one. Products, prices, and existing subscriptions do not migrate, so you will recreate your catalog and current subscribers stay on the old provider until they cancel and resubscribe. See [Switch payment providers](#switch-payment-providers) for the full flow.

> **What happens to my customers when I disconnect payments?**
>
> Nothing changes on the provider side. Active subscriptions continue to renew in Paddle or Stripe, and customers keep being billed until you cancel their subscriptions in your provider dashboard. Disconnecting only removes the link between Lovable and your provider, so your app stops receiving payment events. Cancel, refund, or migrate subscriptions directly in [vendors.paddle.com](https://vendors.paddle.com) or [dashboard.stripe.com](https://dashboard.stripe.com).

> **Can I reconnect the same Paddle or Stripe account after disconnecting?**
>
> With Stripe, yes. Disconnecting removes the link between Lovable and Stripe, not your Stripe account. Ask Lovable to enable payments again and sign in to your existing Stripe account when you claim the sandbox during go-live. Products, prices, customers, and subscriptions in your live Stripe account are untouched. Tell Lovable to reuse the same product and price IDs so that publishing updates your existing live products instead of creating new ones.
>
> With Paddle, no. The Paddle seller account Lovable created for the project cannot be connected to it again. Setting payments up again on that project creates a new Paddle account. Other projects can still use the original account without restrictions.

> **I disconnected by accident. Can I undo it?**
>
> There is no undo button, but you can set payments up again. With Stripe, use the same Stripe account: your live products, prices, customers, and subscriptions are still there. With Paddle, setting up again creates a new Paddle account and you recreate your products, prices, and any discounts.

> **The Disconnect option is grayed out. Why?**
>
> You do not have permission to disconnect payments on this project. Only the user who set payments up, a workspace owner or admin, or a project owner or admin can disconnect. Other editors can set payments up on a project that does not have them yet, but they cannot manage an integration someone else set up.

> **I see a 'Failed to disconnect' error. What should I do?**
>
> The integration is still connected and you can try again. If it keeps failing, wait a minute and retry. If the error persists, contact [Lovable support](https://lovable.dev/support).

> **Can I use PayPal, Razorpay, or another payment provider?**
>
> Stripe and Paddle are the only payment providers with built-in support. There is no native support for PayPal, Razorpay, or other providers, including region-specific payment methods that Stripe and Paddle don't offer in your country.
>
> You can ask Lovable to integrate another provider's API through backend edge functions with your own account and API keys, but this is custom code that you configure and maintain yourself, and it is not officially supported.

> **Does Lovable charge extra fees on top of Stripe or Paddle?**
>
> No. The cost of using Stripe or Paddle through Lovable is the same as setting up either provider directly.


## Related topics

- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
