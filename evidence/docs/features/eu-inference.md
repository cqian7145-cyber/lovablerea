# EU inference
<!-- source: https://docs.lovable.dev/features/eu-inference.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# EU inference

> Keep an Enterprise workspace's AI model requests on model endpoints in the European Union, while you build and for the AI features in your published apps.

**EU inference** is a workspace setting for Enterprise plans. When enabled, Lovable sends the workspace's AI model requests to model endpoints in the European Union. This covers the requests Lovable makes while you build (the project chat, Chats, background tasks, security scans, and image generation) and the requests that the [AI features in your published apps](https://docs.lovable.dev/features/ai) make. A request that no EU endpoint can serve fails with an error. Lovable does not send it to another region. Before you enable the setting, Lovable lists the apps that use models that are not available with EU inference and can update them for you.

EU inference covers where AI model requests are processed, not where your published apps store data. For storage, see [Default data hosting region](https://docs.lovable.dev/features/privacy-and-security-settings.md#default-data-hosting-region).

## When to use EU inference

Enable EU inference when a [Data Processing Agreement](https://lovable.dev/data-processing-agreement) (DPA), an internal policy, or a customer contract requires that prompts, project context, and model outputs are processed inside the European Union. Typical cases:

* A bank or insurer in the EU whose prompts and outputs must not leave the EU.
* A public sector agency whose procurement requires named EU processing locations for AI vendors.
* A software company whose published apps use AI features through the built-in AI connector, and whose own customers require EU processing.

Leave it disabled when your organization has no such requirement: fewer models are available in the EU, and some features are not available. See [Limitations](#limitations).

## Prerequisites

Check these requirements before you enable EU inference:

* The workspace is on the Enterprise plan.
* You are a workspace admin or owner.

## Enable EU inference

Follow these steps to enable EU inference for a workspace:

**1. Open the setting**

Open [Privacy & security](https://lovable.dev/settings/privacy-security) (**Workspace settings → Security → Privacy & security**). In **Data protection**, find **EU inference** and enable the switch. Lovable opens the **Enable EU inference?** dialog and checks the AI requests your apps made in the last 30 days.

**2. Review the app check**

The dialog shows one of these results:

* No affected apps: no app in the workspace used a model that is missing in the EU in the last 30 days. Select **Enable EU inference**.
* Affected apps: the dialog shows how many apps used models that are not available with EU inference, the first 5 of those apps with the models each one used, and a separate line for requests made with a workspace API key. With more than 5 apps, the summary also counts the published apps and the apps that use a model with no EU option. Select **Review and update apps** to let Lovable update them, or **Enable EU inference without updating apps**. See [How to update your apps for EU inference](#how-to-update-your-apps-for-eu-inference).
* Workspace API key requests only: the dialog lists the models those requests used on the **Workspace API keys** line and shows no app update. Change the model in that code, then select **Enable EU inference**, or those requests fail. See [Requests made with a workspace API key](#requests-made-with-a-workspace-api-key).
* Check unavailable: Lovable could not read the usage of your apps. You can still enable EU inference, but AI requests from an app that uses a model that is not available with EU inference fail until the app switches model. Select **Try the check again**.

While an earlier app update is still running, the dialog shows how many of its apps have finished, with **View progress** in place of **Review and update apps**.

**3. Wait for the change to apply**

The change applies to new requests and may take about 20 minutes. A request that is already running when you enable EU inference finishes where it started, which can be outside the EU.

You can change the setting once per hour. Until then, the switch is disabled and shows when you can change it again.

To disable EU inference, disable the switch and select **Disable EU inference**. After about 20 minutes, new AI model requests run on Lovable's standard model endpoints, which can be outside the EU. A request that is already running when you disable EU inference finishes on its EU endpoint. Apps that Lovable updated for EU inference keep the models they switched to. Those models also run while EU inference is disabled, so the apps keep working.

## How to update your apps for EU inference

Lovable can switch the AI models in your apps to models that are available with EU inference, several apps at a time, without you opening each app. Start from one of two places:

* **Review and update apps** in the **Enable EU inference?** dialog, before you enable the setting.
* **Check apps** on the **Apps and EU inference** row under the switch, after you enable the setting and while no update runs.

Both open **Update apps for EU inference**, a dialog with three steps. Lovable updates each selected app with one chat message that switches its AI models to the closest EU match. Published apps are published again to the same audience only when you enable the publish switch in the first step. Each app update consumes credits, see [What EU inference costs](#what-eu-inference-costs). You can review every change in the app's project chat and revert it from the history.

**1. Review the changes**

The first step shows what the update changes. Lovable makes no change until you start the update.

* **Model changes** lists each model with the EU models Lovable can choose from and the number of apps that use it. Lovable picks the closest match from that list when it updates the app. A change marked **No EU model of this type** means that no EU model offers that feature yet. Lovable still picks the closest model from the EU list and adapts the app, so review that change in the project chat. Embeddings need a new index after a model change, and Lovable does not change them for you.
* **Apps** lists each affected app with its publish state (**Published to everyone**, **Published to workspace**, or **Not published**), its last use, and its request count. Published apps that still need a model change are selected. An app that Lovable already updated is listed with its update state and is not selected, so a second update does not send it the same change unless you include it. Apps that are not published had only preview traffic in the last 30 days and are not selected, so include them only if you still work on them.
* **Publish each updated app again to the same audience** is disabled by default. Only apps that are already published are published again. Until an app is published again, its live version keeps the old model. Backend functions update immediately.
* **Ask app owners to approve the apps I cannot edit** is disabled by default. When enabled, an app you cannot edit waits for its owner instead of being skipped. The owner receives a notification that asks them to approve the update, and approves it from the app with **Approve the update**.
* **When to enable EU inference** shows only when you start from the enable dialog. Each option has a consequence:
  * **Update the apps first, then enable EU inference for me.** is the default. No AI request fails while the apps update, and Lovable enables EU inference when every app is updated. With the publish switch disabled, Lovable enables EU inference only when every updated app that is published runs the new model live. Enable **Publish each updated app again to the same audience** when you want Lovable to enable EU inference for you.
  * **Update the apps first. I will enable EU inference afterwards.** leaves EU inference disabled until you enable it.
  * **Enable EU inference now and update the apps in the background.** makes AI requests from the listed apps fail until each app is updated and published.

To start, select the update button, which reads, for example, **Update 3 apps**.

**2. Watch the updates**

The second step, **Updating apps**, shows how many apps have finished, roughly how long is left, and at least the credits used so far. Each app has a row with its status, the reason when it needs you, and the credits its update used. An update usually takes a few minutes per app. You can close the dialog and come back. While EU inference is still disabled, enable the switch again: the **Enable EU inference?** dialog shows how many apps have finished, and **View progress** reopens the update. After EU inference is enabled, the **Apps and EU inference** row under the switch shows the progress.

Use the status to decide whether an app needs you:

| Status | What it means |
| :- | :- |
| **Queued** | The app waits for its turn. |
| **Waiting for the app** | Lovable is busy in this app right now. The update starts when the current work finishes. |
| **Updating** | Lovable is editing the app. |
| **Updated** | The code uses the new model. Until the app is published again, its live version keeps the old model. |
| **Updated and published** | The code uses the new model, and the app is published again. |
| **Confirmed by traffic** | Requests from the app after the update used models that are available with EU inference. |
| **Needs attention** | Lovable could not finish the update. The row says why, for example the model name is stored in data or settings rather than in code, or Lovable needs a decision in the project chat. |
| **Skipped** | You skipped the app, or Lovable could not update it, for example because you cannot edit it or the workspace ran out of credits. |
| **Stopped** | You stopped the updates before this app was changed. |

From each row you can select **Try again**, **Skip**, **Include again**, **Open app**, **Publish**, or **Details**, depending on the status. **Details** shows the changed files, the model changes, and what needs a decision. **Download report** saves the status of every app as a CSV file.

**3. Enable EU inference**

The third step shows whether the updates finished, and how many apps were updated, need attention, were skipped, or were stopped before their update.

* If you chose to update the apps first and have Lovable enable EU inference for you, the step says whether EU inference is now enabled. EU inference stays disabled when an app was not updated, or when an updated app that is published does not run the new model live yet. Review or publish those apps, then select **Enable EU inference**.
* If you chose to enable EU inference yourself, select **Enable EU inference**.

You can also download the report from this step. With more than 5 apps, **View apps** opens the panel described in the next section.

### Update more than 5 apps

**View apps** in the dialog (with more than 5 apps) or on the **Apps and EU inference** row opens **App updates for EU inference**, a panel in **Privacy & security**. The panel shows four counts (**Updated**, **In progress**, **Needs attention**, and **Skipped**), a status filter, a search box, and a table of apps with the same actions as the rows in the dialog. From the panel you can also select **Retry all that need attention**, **Stop updates**, and **Download report**.

When you select **Stop updates**, Lovable asks you to confirm. Apps that are updating right now finish their current change, and apps still in the queue are not changed. Counts can change for a day while Lovable confirms each update with traffic. For a large list, the panel loads the first apps only, so download the report for the full list.

### Requests made with a workspace API key

Requests made with a [workspace API key](https://docs.lovable.dev/features/api-keys.md) come from code outside your Lovable projects, so Lovable cannot update that code. The enable dialog lists the models those requests used on a separate **Workspace API keys** line, and the panel lists them with their last use and request count. Change the model in the code that uses the key. After you enable EU inference, those requests fail until you do.

### After you enable EU inference

After you enable EU inference, the **Apps and EU inference** row under the switch in [Privacy & security](https://lovable.dev/settings/privacy-security#eu-inference-apps) shows the state of your apps. The row shows one line, the first of these that applies:

* How many apps of a running update have finished, for example "App updates in progress. 2 of 5 finished."
* How many apps had AI requests refused in the last 24 hours.
* How many apps still need a model change.
* How many apps are updated but not published yet, so their live versions still use the old model.
* That all apps use models that are available with EU inference.
* That no AI request from an app was refused in the last 24 hours.
* That you should check which apps still use models that are not available with EU inference, when no check ran after you enabled the setting and Lovable could not read the refusals.

While an update runs, or when apps still need attention after an update, the row shows **View apps**, which opens the panel for the latest update. Otherwise the row shows **Check apps**, which runs the check again and opens the update dialog. The row also reminds you that apps keep the models they switched to if you disable EU inference later. See [Enable EU inference](#enable-eu-inference).

### Update an app yourself

You can also update an app without the dialog, for example an app that needs attention:

**1. Open the app**

Open the project with **Open app** from the dialog or the panel, or from your workspace.

**2. Ask Lovable to switch the model**

Send a prompt such as the one below. You can also name the model you want. The model families that run in the EU are listed in [Providers and regions](#providers-and-regions).

```text wrap theme={null}
Switch the AI model requests in this app to a model that is available with EU inference. Keep everything else as it is and tell me which files you changed.
```

**3. Publish the update**

Publish the app again so that the published version uses the new model.

## Providers and regions

Each AI model request runs on one of these providers:

| Model family | Provider and region |
| :- | :- |
| Claude models | Google Cloud Vertex AI (EU), Amazon Web Services Bedrock (EU) |
| GPT and OpenAI embedding models | Microsoft Azure AI Foundry (EU Data Zone) |
| Gemini models (image generation and embeddings only) | Google Cloud Vertex AI (EU) |

Lovable may change which model serves a task. Provider and region changes follow the sub-processor change notice in your DPA.

Each provider defines its own EU boundary:

* Google Cloud Vertex AI (EU) covers EU member states.
* Amazon Web Services Bedrock (EU) covers six EU regions.
* Microsoft Azure EU Data Zone follows the Microsoft EU Data Boundary, which covers the EU and can include EFTA countries such as Norway and Switzerland.

The [sub-processor list](https://trust.lovable.dev/subprocessors) names each provider and region.

### AI features in published apps

Apps that use the built-in AI connector see only the models that run in the EU in their model list. A request for any other model is refused with an error that names the region restriction (HTTP 403, `provider_not_available_in_region`).

## Limitations

Some features are not available while EU inference is enabled, and some agent tools run outside the EU:

* **While you build:** video generation, dictation in the project chat, voice conversations in Chats, voice mode in the editor, image edits with a mask, image background removal, and AI penetration tests with Aikido are not available. Lovable does not offer these tools while EU inference is enabled.
* **In published apps:** the built-in AI connector does not offer video generation, music generation, speech to text, text to speech, or live voice conversations. Requests for them are refused before any data leaves Lovable.
* **Agent tools that run outside the EU:** web search (Exa), web fetch (Firecrawl), and browser automation (Browserbase) process the data they receive in the United States.

## When no EU endpoint is available

If no EU endpoint can serve a request, Lovable shows this message in the chat:

> EU AI capacity is temporarily unavailable. Your workspace keeps all AI processing in the EU, so this request was not sent elsewhere. Please try again in a few minutes.

Wait a few minutes and send the request again. Lovable does not send the request to another region.

## What EU inference costs

Your workspace uses more credits while EU inference is enabled, for building and for the AI features in your published apps. The **Credits** panel in [**Workspace settings → Plans & credit usage**](https://lovable.dev/settings/billing) shows an **EU inference enabled** badge while the setting is on.

Updating apps for EU inference also consumes credits. Each app update is treated as standard build usage and consumes credits from the workspace, as described in [Build costs](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs). The update step shows the cost per app as each update finishes and at least the credits used so far. The total can rise after the updates finish. Lovable shows no total before the updates run.

## FAQ

> **Does EU inference change where my app data is stored?**
>
> No. EU inference covers the processing of AI model requests. For storage, see [Default data hosting region](https://docs.lovable.dev/features/privacy-and-security-settings.md#default-data-hosting-region).

> **Does EU inference cover the United Kingdom or Switzerland?**
>
> Each provider defines its own boundary. See [Providers and regions](#providers-and-regions). The United Kingdom is not part of any of these boundaries. Switzerland can be included only through the Microsoft EU Data Zone.

> **Which features stop working when I enable EU inference?**
>
> Some features while you build and some AI features in published apps are not available. See [Limitations](#limitations) for both lists.

> **Why can I not change the setting again immediately?**
>
> Lovable allows one change per hour so that requests do not alternate between regions. The switch shows when you can change it again. See [Enable EU inference](#enable-eu-inference).

> **Does EU inference cost more?**
>
> Yes. Your workspace uses more credits while EU inference is enabled. See [What EU inference costs](#what-eu-inference-costs).

> **Do I have to update my apps before I enable EU inference?**
>
> No. Select **Enable EU inference without updating apps** in the enable dialog. AI requests from the listed apps then fail until each app uses a model that is available with EU inference. See [How to update your apps for EU inference](#how-to-update-your-apps-for-eu-inference).


## Related topics

- [Privacy & security settings](https://docs.lovable.dev/features/privacy-and-security-settings.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
- [Built-in backend](https://docs.lovable.dev/features/cloud.md)
