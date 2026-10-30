# Edge functions
<!-- source: https://docs.lovable.dev/features/edge-functions.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Edge functions

> Run serverless backend code in your app, part of the built-in backend, and monitor invocations, success rates, and logs.

Edge functions run your app's custom backend code: the work that can't happen in the user's browser, such as talking to other services, processing payments, or sending emails. Think of them as small programs that run on Lovable's servers whenever your app needs them. There are no servers for you to set up, and they scale automatically with traffic.

You don't create edge functions by hand. Describe what you need in the project chat, and Lovable writes, deploys, and maintains the function for you. For example:

```text wrap theme={null}
When a payment is marked 'paid' in Stripe, automatically update the related invoice's status to 'Paid'.
```

**Common use cases:**

* AI-powered features, such as AI summaries or AI chatbots, using built-in [Lovable AI](https://docs.lovable.dev/features/ai)
* Sending emails or push notifications
* Payment processing, for example with [Stripe](https://docs.lovable.dev/integrations/stripe.md)
* Heavy computations or external API calls

Edge functions read API keys and credentials from your project's [secrets](https://docs.lovable.dev/features/secrets.md), so sensitive values never appear in code. For recurring work on a schedule, see [Jobs](https://docs.lovable.dev/features/jobs.md).

## Monitor your functions

Go to **More → Database → Manage → Edge functions** to see every function in your project, with its status, invocation count, success rate, and when it was last updated. The time range selector has two modes: **Relative** covers ranges from the last 15 minutes up to the last 5 days, and **Absolute** lets you pick an exact start and end time.

Click a function to see how it performed over time:

* **Succeeded** and **Failed** invocation counts with a chart over the selected range.
* **Copy URL** to copy the function's endpoint.
* **View logs** to open [Logs](https://docs.lovable.dev/features/logs.md) pre-filtered to this function's output.
* **View code** to open the function's source in the code editor.

If a function fails, Lovable surfaces the error so you can ask it to fix the problem in the project chat.

## FAQ

> **How do I create or edit an edge function?**
>
> Ask Lovable in the project chat. There is no create button in the Edge functions view: Lovable writes and deploys functions as part of building the feature you describe. To change one, describe the new behavior, or open its code with **View code**.

> **Do edge functions run while my project is paused?**
>
> No. Edge functions are unavailable while a project is paused, so features that depend on them stop working until you resume the project. See [Pause a database you're not using](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using).

> **Where do I see why a function failed?**
>
> Open the function and click **View logs**, which opens the Logs view filtered to that function. Each failed invocation includes the error output. You can also paste the error into the project chat and ask Lovable to fix it.


## Related topics

- [Connect to Supabase](https://docs.lovable.dev/integrations/supabase.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Logs](https://docs.lovable.dev/features/logs.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Test and verify your app](https://docs.lovable.dev/features/testing.md)
