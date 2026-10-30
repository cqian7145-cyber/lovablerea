# Build a Shopify store with AI
<!-- source: https://docs.lovable.dev/integrations/shopify.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Shopify store with AI

> Learn how to create a new Shopify store or connect an existing one to Lovable, then build and launch your storefront.

Lovable integrates directly with Shopify so you can **create a new Shopify store or connect an existing one**, then build, customize, and launch a complete e-commerce storefront using natural language. Shopify handles payments, inventory, and logistics when you go live.

## Use cases

With Lovable + Shopify, you can build and launch real online stores for:

* **Physical products**: sell clothes, gadgets, accessories, or home goods
* **Digital products**: offer e-books, courses, music, or software downloads
* **Niche brands**: quickly spin up stores for limited-edition merch, local products, dropshipping or side projects
* **Small businesses**: showcase bakeries, coffee shops, or craft businesses and accept orders online
* **Testing new product ideas**: add a few products and evaluate performance before full-scale production
* **Business expansion**: introduce new collections, seasonal campaigns, or bundles with just a prompt

## Before you begin

Before you start building your e-commerce store, here are a few important things to know:

* **New or existing Shopify stores**\
  Lovable supports both **creating new Shopify stores** and **connecting existing Shopify stores**.
* **Sandbox store - no Shopify cost (new stores only)**\
  When you create a new Shopify store in Lovable, Lovable automatically creates a **sandbox (development) store** so you can build and experiment safely at no Shopify cost. This environment is perfect for setup and testing, but it **won’t process real payments**.
* **Claim within 30 days to keep your new store (new stores only)**\
  Shopify removes development stores that stay unclaimed for **30 days**. To keep your store, **claim it within that 30-day window**. If you skip claiming when Lovable prompts you, you can still claim later from the Shopify menu, as long as you do it within that window.
* **Claiming your store (new stores only)**\
  When you’re ready to launch your newly created store, you’ll need to **claim your store**. This migrates it to your Shopify account, makes the claiming Lovable user the Shopify store owner, and starts a **separate 120-day free trial on a Shopify subscription**. In Shopify, you need to activate payments and complete your store setup to start accepting real payments from your customers.
* **Required Shopify subscription**\
  After the post-claim free trial period, you’ll need a **paid Shopify plan** to continue selling products online. This subscription is managed **directly through Shopify** and is **separate from Lovable pricing**.
* **Two distinct periods**\
  Don't conflate the two windows: the **30-day unclaimed-store window** is about **keeping the store** (Shopify deletes unclaimed development stores after 30 days), while the **120-day post-claim free trial** is about **billing** (you only need a paid Shopify subscription once that trial ends and you're ready to sell).
* **Shopify review policy compliance**\
  Before publishing your store, make sure all reviews are **authentic, unbiased, and compliant with** [**Shopify’s Review Policy**](https://help.shopify.com/en/partners/help-support/faq/reviews).

## Enable the Shopify integration

By default, the Shopify integration is enabled for your workspace. You can manage the Shopify integration behavior and related Shopify settings for your projects in **Connectors** → **Shopify** → **Manage my agent's permissions**

### Permission preferences

The default permission setting is **Ask each time**, meaning you decide whether to enable or disable the Shopify integration for each project. You can change your preference anytime from **Connectors** → **Shopify** → **Manage my agent's permissions**

Lovable prompts you when a Shopify integration is needed. You have three options:

* **Allow**: enable the integration for the current project.
* **Decline**: decline the integration for this request (you may be asked again later).
* **Adjust preferences**: change the default behavior for future projects (does not affect the current project).

## Shopify integration flow

Follow the steps below to build an e-commerce store with Shopify.

### Step 1: Start a project

You can start by:

* Creating a new project from scratch
* Remixing an existing project

**Create a new project**

Tell Lovable what type of store you want to create and specify Shopify.

For example:

```text wrap theme={null}
Build an e-commerce store with Shopify for selling handmade scented candles.
```

**Remix a project**

You can remix:

* **Shopify template projects**, see [Lovable + Shopify templates](https://lovable.dev/shopify)\
  When remixing, prompt Lovable to integrate Shopify and remove mock data. It is important to use a good, comprehensive prompt.
  ```text wrap theme={null}
  I would like to replace the products in this store with my own products and create my Shopify store. Please proceed to:
      
      1. Connect to Shopify.
      2. Remove all mock product data from the store and create X new products with product images.
      3. Update the product cards and product details page to use the new product information.
      4. Update the product details page URL to match the new product.
      5. Update the add to wishlist component and logic to match this change.
      6. Update my cart, buy now CTA, and any related checkout actions on any page to reflect Shopify store integration.
  ```
* **Projects that were previously connected to a Shopify store**\
  To remix a project with a connected Shopify store, you first have to [disconnect the Shopify store](#disconnect-a-shopify-store). Projects with an active Shopify connection can’t be remixed until the store is disconnected.

### Step 2: Create a new Shopify store or connect an existing one

In both of the above scenarios, the Agent prompts you to **enable the Shopify connection**. Click **Allow** and choose the Shopify setup.

![Shopify store setup dialog showing options to create a new store or connect an existing Shopify store](https://mintcdn.com/lovable-f9060f1e/FvOFoXE-4spn1NKn/images/shopify-choose-store-setup.png?fit=max\&auto=format\&n=FvOFoXE-4spn1NKn\&q=85\&s=5df8b9b9830f8c5390b5c48dd68b70c5)

You can continue by creating a new Shopify store or by connecting an existing Shopify store you already own.

**Create a new store**

To create a new store, follow the steps below:

**1. Create store**

Click **Create store**. Lovable detects your country automatically and uses it to set the currency of your Shopify store. Your sandbox store is now ready for setup. You can continue building your store as explained in the next steps.

> [!NOTE]
>
> * Before the store is claimed, all collaborators in the project can use the Shopify integration with full read/write access.
> * The development store is free to build on. To keep it, claim it within **30 days** of creation. Shopify removes development stores that stay unclaimed for 30 days.

**Connect an existing store**

> [!NOTE]
>
> You authenticate directly with Shopify. To connect an existing store, sign in with a Shopify account that has access to that store.

To connect an existing Shopify store, follow the steps below:

**1. Choose store**

Click **Choose store**. This takes you to Shopify.

**2. Pick your store in Shopify**

Sign in to Shopify if prompted, then select the store you want to connect. Shopify lists the stores your account has access to.

**3. Install the Lovable app in Shopify**

Click **Install** to install the Lovable app to your Shopify store.

When the app is authorized, your Shopify store is connected and you are redirected back to Lovable. You can continue building your store as explained in the next steps.

* You can create, update, and delete products directly from the project chat.
* You can prompt the Agent to fetch and display products from your existing store.

> [!NOTE]
>
> * Each collaborator connects their own Shopify account. Lovable prompts them to sign in the first time they perform a Shopify action. What each person can change (create, update, delete products, variants, and discount codes) matches their role and permissions in Shopify. Changes are reflected immediately in your Shopify store.
> * Shopify sessions last up to 24 hours. When your session expires, Lovable prompts you to reconnect the next time you perform a Shopify action.
> * Collaborators who haven't connected a Shopify account can still fully build the storefront.

### Step 3: Add products and product images

Start by adding products with a **name, description, and price**. For example:

```text wrap theme={null}
Add a product named Lavender Breeze Candle, description: ‘A calming handmade soy candle infused with lavender essential oils,’ price: $25.
```

You can edit details later. If your product doesn’t appear, prompt:

```text wrap theme={null}
Display the products on the website.
```

Then, enhance your listings with visuals using any of the below options. Always use representative images.

**Generate AI images**

```text wrap theme={null}
Add an AI-generated image to the product Lavender Breeze Candle.
```

**Upload or attach your own image**

```text wrap theme={null}
Add the attached image to the product Lavender Breeze Candle.
```

**Add image from URL**

```text wrap theme={null}
Add image from URL to the product Lavender Breeze Candle.
```

### Step 4: Manage your store

Manage your products and refine your store without leaving Lovable. For example, you can tell Lovable to:

* Update product names, descriptions, or prices
* Remove products
* Display all products
* Add product filtering functionality and create collections based on different categories
* Add product review functionality and only allow reviews on verified purchases
* Add percentage-based or fixed amount-based (USD) discount codes and include the validity period
* Add wishlist functionality and ability to share the wishlist

```text wrap theme={null}
Update the price of Lavender Breeze Candle to $28.
Change the description of Vanilla Bean Candle to highlight the wooden wick. 
Remove the product Cinnamon Spice Candle.
Display all products.
Create a product review system and only allow reviews on verified purchases.
Create a 15% discount code for the product Lavender Breeze Candle. The code should be LAVENDER15 and valid until the end of November 2025. 
Allow me to add products to the wishlist and share it.
```

### Batch product and variant mutations

When you ask the Agent to create, update, or delete more than one product or variant in a single turn, it uses **batch tools** so one approval covers the whole batch instead of one approval per item. The approval card shows an item-count chip (for example, `3 products`) so you can see the batch size before allowing it.

**Per-batch limits**

* **Create** and **update** (products and variants): up to **20 items** per batch
* **Delete** (products and variants): up to **50 items** per batch

If you ask for more than these limits in a single turn, the Agent splits the work across multiple batches.

**How partial failures are handled**

Items are processed sequentially in the order you specified. A failure on one item does not stop the rest of the batch.

* If every item succeeds, the batch returns success.
* If any item fails, the batch returns a numbered per-item report (`products[1] FAILED - ...`) so the Agent can retry only the failed items instead of redoing successful ones. Duplicate IDs in an update or delete batch are rejected upfront during validation.
* If your Shopify session expires mid-batch, the batch stops and Lovable prompts you to reconnect. The progress report tells the Agent which items already completed, so it does not repeat successful mutations after you reauthenticate.

**Example**

```text wrap theme={null}
Add these five candles to my Shopify store: Lavender Breeze, Vanilla Bean, Cinnamon Spice, Sea Salt, and Amber Woods. Each is $25.
```

The Agent creates all five products in a single batch that you approve once.

### Step 5: Claim your Shopify store (new stores only)

> [!NOTE]
>
> * When the store is claimed, the Lovable user who claimed it becomes the Shopify store owner.
> * After claiming, Lovable prompts you to sign in to Shopify. This quick sign-in keeps Shopify tools working with your own Shopify account.
> * Other collaborators can connect their own Shopify accounts. What each person can change matches their role and permissions in Shopify.
> * Collaborators who haven't connected a Shopify account can still fully build the storefront.

When you are ready to claim and launch your new store, be prepared to unlock your store, and set up and activate payments by completing the **KYC (Know Your Customer)** process. This may take some time.

**1. Claim the store**

Type `Claim the store`. Lovable prompts you to claim the store. Click **Claim**.

This opens Shopify in a new tab where you can log in and then complete the claim process. You may also get an email invitation to claim your store.

**2. Accept the claim store link**

Accept the **Claim store** link from Shopify. This takes you back to your Lovable project.

> [!TIP]
>
> If Lovable can't confirm the claim right away, it offers **Check again** while Shopify is still processing, or **Try again** after a verification error. Both re-check the claim status, and retrying usually resolves it.

> [!WARNING]
>
> If Lovable tells you the store can no longer be claimed, the 30-day window has passed and Shopify has already removed the development store. Claiming that store is no longer possible. [Disconnect the store](#disconnect-a-shopify-store), then ask Lovable to create a new one.

**3. Complete store setup in Shopify Admin**

Your Shopify store is ready. Go to [Shopify Admin](https://admin.shopify.com/) to complete your store setup and activate payments so you can begin selling. See [Shopify payments](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding) for more information.

When you claim your store, Shopify assigns a permanent domain for your shop, which is used just for your backend. When you publish your project, your **real store URL** will be your `lovable.app` or your [custom domain](https://docs.lovable.dev/features/custom-domain.md).

> [!WARNING]
>
> Claim your store within **30 days** of creating it. Shopify removes development stores that stay unclaimed for 30 days. Claiming starts a **separate 120-day free trial** on a Shopify subscription, and after that trial ends you need a paid Shopify subscription to continue selling.

### Step 6: Launch your store

When your store setup is complete, [publish your Lovable project](https://docs.lovable.dev/features/publish.md) and share your store with the world.

At any time, directly from Lovable, you can:

* Create, update, and delete products
* Manage prices and descriptions
* Launch new collections, promotions, or bundles

## Disconnect a Shopify store

You can disconnect a Shopify store from a project at any time. This is useful when you want to:

* Remix the project (projects with a connected Shopify store cannot be remixed)
* Connect a different Shopify store
* Create a new Shopify store without starting a new project

Disconnecting removes the connection between your Lovable project and Shopify store. Your Shopify store and its data remain intact in Shopify, but your Lovable project is no longer tied to that store and can be reused freely.

There are three ways to disconnect:

* **Ask the agent**: Type a prompt like `Disconnect my Shopify store`
* **Shopify menu**: Click the Shopify icon in the navbar and select **Disconnect store** from the three dots menu
* **Project settings**: Go to **Project settings → Shopify** and click **Disconnect**

## FAQ

> **Can I connect an existing Shopify store to Lovable?**
>
> Yes. Lovable supports both **creating new Shopify stores** and **connecting existing Shopify stores**.
>
> To connect an existing store, you **sign in directly with Shopify** using a Shopify account that has access to that store. When connected, you can manage products and build your storefront directly from Lovable.

> **Why can’t I create or update products even though Shopify is connected?**
>
> This is usually a permissions or session issue:
>
> * **Connected an existing store or claimed store:** each collaborator connects their own Shopify account, and what they can change (create/update/delete products, variants, and discount codes) matches their role and permissions in Shopify. If your Shopify role lacks the required permissions, ask the store owner for access.
> * **Created a new store (not claimed yet):** all collaborators can make changes.
> * **Expired session:** Shopify sessions last up to 24 hours. Lovable prompts you to reconnect the next time you perform a Shopify action.
>
> Collaborators who haven't connected a Shopify account can still fully build the storefront in Lovable.

> **I claimed my store, but the verification failed. What should I do?**
>
> Sometimes Shopify takes a moment to finalize the claim. Lovable shows **Taking longer than expected** with a **Check again** button while Shopify is still processing, and **Verification failed** with a **Try again** button if the check itself errored. Both re-check the claim status, and retrying typically resolves the issue.

> **Lovable says my store can no longer be claimed. What happened?**
>
> Shopify removes development stores that stay unclaimed for 30 days. Once that happens, the store is gone from Shopify and claiming it is no longer possible, so Lovable offers only **Close** on that dialog rather than a retry.
>
> To keep building, [disconnect the store](#disconnect-a-shopify-store) from the **Shopify** menu or the **Connectors** dialog, then ask Lovable to create a new Shopify store. Disconnecting removes the connection from Lovable and doesn't delete anything in Shopify. Your project code stays as it is, so you may need to update anything that referenced the old store.

> **Can I remix Shopify projects?**
>
> You cannot remix projects where the Shopify connection has been enabled. To remix a project with a connected Shopify store, first [disconnect the Shopify store](#disconnect-a-shopify-store).
>
> You can also remix an existing Shopify template project to get started, see [Lovable + Shopify templates](https://lovable.dev/shopify).

> **I added my products to a remixed template project, but the link to the product page is broken. How do I fix that?**
>
> Prompt the Agent to do the following:
>
> ```text wrap theme={null}
> Please update the product URL logic to ensure that all new and future products in the store correctly display their respective product detail pages.
> ```
>
> This should ensure that you won’t have any issues in the future. For all other issues, click **Try to Fix**, and the Agent will address and resolve the issue.

> **I am still seeing some mock products in my remixed template project, how can I remove them?**
>
> Prompt the Agent to update the pages where you’ve seen these products, for example:
>
> ```text wrap theme={null}
> Clear the store from any existing products across all pages except for those that I added to my Shopify store.
> ```


## Related topics

- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Connect your app to Gemini Enterprise](https://docs.lovable.dev/integrations/gemini-enterprise.md)
