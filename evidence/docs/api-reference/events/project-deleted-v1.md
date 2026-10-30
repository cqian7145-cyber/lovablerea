# Project deleted
<!-- source: https://docs.lovable.dev/api-reference/events/project-deleted-v1.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project deleted

> Receive a signed notification at your HTTPS endpoint.

[Set up Events & Hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md).

Sent after deletion succeeds. With restorable deletion, this marks soft deletion; a later hard purge does not emit another event.

See [delivery, retries, and signature verification](https://docs.lovable.dev/api-reference/events-and-hooks.md#verify-and-process-requests).


## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=webhooks webhook project.deleted.v1
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

- [Delete a project](https://docs.lovable.dev/features/projects/delete-project.md)
- [Events & hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md)
- [Remix a project](https://docs.lovable.dev/features/projects/remix.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
