# Before message submission
<!-- source: https://docs.lovable.dev/api-reference/hooks/message-before-submit-v1.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Before message submission

> Return a decision from your HTTPS endpoint before this action continues.

[Set up Events & Hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md).

Checks a user message before it is queued or sent to the agent. Includes the sender, message text, and attachments, but not conversation history.

Destinations share a five-second deadline and are not retried. Any `deny` blocks submission. Errors and invalid responses follow the subscription's configured failure behavior. Subscription discovery failures block submission.

Return HTTP `200` with `application/json` and an `allow` or `deny` decision (maximum 64 KiB). See [signature verification](https://docs.lovable.dev/api-reference/events-and-hooks.md#verify-signatures).


## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=webhooks webhook message.before_submit.v1
openapi: 3.1.0
info:
  title: Lovable Events & Hooks
  version: '1'
servers: []
security: []
tags:
  - name: Events
    x-group: Events
  - name: Hooks
    x-group: Hooks
paths: {}

````

## Related topics

- [Events & hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md)
- [Sensitive data scanning](https://docs.lovable.dev/features/sensitive-data-scanning.md)
- [Plan a change in Plan mode](https://docs.lovable.dev/features/plan-mode.md)
- [Work with Lovable in the project chat](https://docs.lovable.dev/features/projects/chat.md)
- [Set a goal for Lovable](https://docs.lovable.dev/features/goal-runs.md)
