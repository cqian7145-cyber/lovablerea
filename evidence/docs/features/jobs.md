# Jobs
<!-- source: https://docs.lovable.dev/features/jobs.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Jobs

> Review the scheduled background jobs in your app's built-in backend, check their run history, and enable or disable them.

Jobs are scheduled background tasks, used when your app needs to perform recurring work such as checking for new information, posting updates, or syncing data. Ask Lovable to set one up. For example:

```text wrap theme={null}
Schedule a daily job at 7 AM that emails me a summary of today's follow-ups.
```

To review your project's jobs, go to **More → Database → Manage → Jobs**.

## Review and control jobs

The Jobs view lists every scheduled job. Click a job to see:

* **Scheduled**: the job's schedule in plain language, for example "Every day at 08:00 AM" or "Every 15 minutes". Times are shown in your timezone, like the run history. A schedule that can't be converted keeps its original time and is marked **(UTC)**.
* **Last run**: when the job last executed.
* A run history table showing each execution's start time, end time, and status (**Succeeded**, **Failed**, or **Running**).

Use **Enable** or **Disable** to control a job. A disabled job does not run again until you enable it.

The view does not update live. Use **Refresh** to reload the job list, or the run history's own **Refresh** to load new executions.

Creating a job, changing its schedule, or deleting one happens by asking Lovable in the project chat or through SQL, not from the Jobs view.

> [!NOTE]
>
> Jobs that run often or take longer to complete can increase credit usage. See [Project usage](https://docs.lovable.dev/features/project-usage.md) to review what your project's jobs consume.

[Project monitoring](https://docs.lovable.dev/features/project-monitoring.md) can alert you when scheduled jobs fail, so you don't have to check the run history manually.

## FAQ

> **How do I create or delete a job?**
>
> Ask Lovable in the project chat, for example "Schedule a job that cleans up expired sessions every night at midnight" or "Delete the daily summary job". The Jobs view is for reviewing, enabling, and disabling jobs, not creating them.

> **Why didn't my project pause automatically?**
>
> Lovable auto-pauses projects on the built-in backend after a period of inactivity, but scheduled jobs and other background activity keep a project active. If a project only exists to run jobs you no longer need, disable the jobs or [pause the database yourself](https://docs.lovable.dev/features/database-pause-remove.md#pause-a-database-youre-not-using).

> **Do jobs use credits?**
>
> Yes. Each run consumes Cloud usage like any other backend work, so frequent or long-running jobs increase the project's run credit usage. Review the impact in [Project usage](https://docs.lovable.dev/features/project-usage.md). You can also ask Lovable in the project chat *How do my scheduled jobs affect my Cloud usage?* See [Ask Lovable what drives your run credit usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ask-lovable-what-drives-your-run-credit-usage).


## Related topics

- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to Fireworks AI](https://docs.lovable.dev/integrations/fireworks.md)
- [Connect your app to Inngest](https://docs.lovable.dev/integrations/inngest.md)
- [Connect your app to LlamaParse Platform](https://docs.lovable.dev/integrations/llamaparse.md)
