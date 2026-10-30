# Events & hooks
<!-- source: https://docs.lovable.dev/api-reference/events-and-hooks.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Events & hooks

> Receive signed notifications when things happen in Lovable, or check actions before they proceed.

Events & Hooks connects your Lovable workspace to an HTTPS endpoint you control. **Events** notify your service after something happens. **Hooks** ask your service for a decision before an action continues. Lovable sends both as webhooks, signed HTTPS requests to your endpoint.

## When to use events and hooks

Use events to automate work after a project changes. For example, notify your team when a project is published, or keep an external project inventory up to date. Use hooks when your service needs to allow or deny an action. For example, check a message for sensitive information before Lovable receives it.

| Use case | Contract |
| - | - |
| Add newly created projects to an internal catalog | [Project created](https://docs.lovable.dev/api-reference/events/project-created-v1.md) |
| Announce a published deployment | [Project published](https://docs.lovable.dev/api-reference/events/project-published-v1.md) |
| Update ownership records after a workspace move | [Project transferred](https://docs.lovable.dev/api-reference/events/project-workspace-transferred-v1.md) |
| Remove deleted projects from an external inventory | [Project deleted](https://docs.lovable.dev/api-reference/events/project-deleted-v1.md) |
| Check messages before submission | [Before message submission](https://docs.lovable.dev/api-reference/hooks/message-before-submit-v1.md) |

The reference pages describe requests that **Lovable sends to your endpoint**. Each page includes the payload, delivery headers, and expected response generated from the [OpenAPI specification](https://api.lovable.dev/v1/openapi.json).

## Prerequisites

Workspace admins and owners configure destinations and subscriptions.

* A Business or Enterprise workspace. Your plan is shown in [Workspace settings → Plans & credit usage](https://lovable.dev/settings/billing).
* An HTTPS endpoint for receiving events or hooks. You can build the receiver in a Lovable project or host it on your own infrastructure.
* Secure storage for the destination's signing secret.

## Set up a destination

A destination pairs your HTTPS endpoint with the events or hooks it receives.

> [!WARNING]
>
> Hook requests include the full message text and attachment download links
> that anyone with the link can use for 5 minutes. Only subscribe endpoints you
> trust to hooks. Event payloads contain only IDs and timestamps.

**1. Open Events & Hooks**

Open [Workspace settings → Customization → Events &
Hooks](https://lovable.dev/settings/event-destinations).

**2. Create a destination**

For your first destination, the form is already open. Otherwise, click **Create destination**. Enter a **Destination name** and **HTTPS endpoint**.

To let your endpoint check that requests come from you, enter a **Bearer token (optional)**. Lovable sends it as an `Authorization: Bearer` header on every delivery.

Select the events or hooks your endpoint handles. By default, `project.published.v1` is already selected.

For hooks, choose **If this hook fails**. **Block submission**, the default, blocks the message when your endpoint times out, fails, or returns an invalid response. **Allow submission** lets it through.

With **Block submission**, every message in the workspace is blocked while your endpoint is down. To unblock them, turn the hook off on the destination's page in **Events & Hooks**.

**3. Save the signing secret**

Click **Create destination**. Copy the signing secret into your secret
manager, then select **Finish setup**. The secret is shown only once and
can't be revealed or rotated. If you lose it, delete the destination and
create it again. Keep the secret on the server, outside client code and
logs.

**4. Implement the handler**

Implement an HTTPS `POST` handler at your endpoint. Verify the signature and
timestamp before processing each payload. For events, return a `2xx`
response to acknowledge delivery. For hooks, return HTTP `200` with a JSON
response whose `decision` is `allow` or `deny`. See [Verify and process
requests](#verify-and-process-requests) for verification, response, and
retry requirements.

**5. Test the destination**

Trigger a subscribed event, such as publishing a test project, or submit a
test message for a hook. Open the destination in **Events & Hooks** to
inspect its delivery or invocation history, and confirm that your receiver
verified and processed the request.

## Verify and process requests

Lovable sends signed HTTPS `POST` requests to your configured destination. Ignore unknown JSON properties so your receiver tolerates additive payload changes.

Webhooks leave Lovable through the same [static IP ranges](https://docs.lovable.dev/integrations/security.md#ip-allowlisting) as connector requests. If your destination restricts inbound traffic by IP address, allow these ranges.

### Verify signatures

Lovable signs every delivery with the destination's signing secret, so you don't need a Lovable API key to receive deliveries.

Use a [Standard Webhooks](https://www.standardwebhooks.com/) verification library with the signing secret, the unmodified raw request body, and the `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers. Verify the signature and timestamp freshness before processing the payload. Parsing and reserializing JSON before verification changes the signed bytes.

The official [JavaScript](https://github.com/standard-webhooks/standard-webhooks/tree/main/libraries/javascript) and [Python](https://github.com/standard-webhooks/standard-webhooks/tree/main/libraries/python) libraries check both the signature and timestamp. Install the library for your receiver:

```bash JavaScript theme={null}
npm install standardwebhooks
```

```bash Python theme={null}
pip install standardwebhooks
```

Set `WEBHOOK_SIGNING_SECRET` to the destination's signing secret, including the `whsec_` prefix. These helpers return the parsed payload only after verification succeeds.

```javascript JavaScript theme={null}
import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.WEBHOOK_SIGNING_SECRET);

export async function verifyWebhook(request) {
  const rawBody = await request.text();
  return webhook.verify(rawBody, {
    "webhook-id": request.headers.get("webhook-id") ?? "",
    "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
    "webhook-signature": request.headers.get("webhook-signature") ?? "",
  });
}
```

```python Python theme={null}
import os
from standardwebhooks.webhooks import Webhook

webhook = Webhook(os.environ["WEBHOOK_SIGNING_SECRET"])


def verify_webhook(raw_body: bytes, headers: dict[str, str]):
    return webhook.verify(raw_body, headers)
```

Reject requests that fail verification. See [Standard Webhooks](https://www.standardwebhooks.com/) for verification details.

If the destination has a bearer token, Lovable sends it alongside the signature headers.

### Event delivery and retries

Events are delivered asynchronously and may be retried.

| Behavior | Details |
| - | - |
| Acknowledgment | Any `2xx` response acknowledges delivery. The response body is ignored. |
| Retried failures | Network errors and HTTP `408`, `429`, or `5xx` responses. Lovable does not retry other responses. |
| Retry limit | At most 8 attempts within 24 hours. The first retry waits 15 minutes, and each wait doubles up to 8 hours. |
| Timeout | 5 seconds per attempt. |
| Duplicates and ordering | Deliveries may arrive more than once and out of order. Deduplicate using `webhook-id`, which stays constant across attempts. |

The timestamp and signature are refreshed for each attempt. Process longer tasks after acknowledging receipt.

### Hook responses

Hooks are synchronous, so the message waits for your response.

| Behavior | Details |
| - | - |
| Response | HTTP `200` with `Content-Type: application/json` and a body of at most 64 KiB. Any other response counts as a failure. |
| Decision | Set `decision` to `allow` or `deny`. Lovable shows the optional `reason` (up to 1,024 characters) to the person whose message is blocked, instead of a generic message. |
| Deadline | 5 seconds, shared by all destinations. Hooks are not retried. |
| Several destinations | Any `deny` blocks the message. If several destinations deny it, Lovable shows one of their reasons. |
| Failures | Timeouts, errors, and invalid responses follow the subscription's **If this hook fails** setting. |

The [message hook reference](https://docs.lovable.dev/api-reference/hooks/message-before-submit-v1.md) documents the request and response fields.

## Limitations

Only the events and hooks listed in the reference are supported.

* Hooks only check messages sent in a project's chat. Messages sent through the Lovable API or MCP server, in [Chats](https://docs.lovable.dev/features/chats.md), by voice, when creating or remixing a project, or by editing a queued message are not checked.
* If Lovable can't look up a workspace's hook subscriptions, it blocks the message.
* Hooks don't run while the workspace is below the Business plan, including hooks set to **Block submission**.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Project deleted](https://docs.lovable.dev/api-reference/events/project-deleted-v1.md)
- [Project created](https://docs.lovable.dev/api-reference/events/project-created-v1.md)
- [Project transferred to another workspace](https://docs.lovable.dev/api-reference/events/project-workspace-transferred-v1.md)
- [Project published](https://docs.lovable.dev/api-reference/events/project-published-v1.md)
