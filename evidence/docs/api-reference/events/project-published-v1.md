# Project published
<!-- source: https://docs.lovable.dev/api-reference/events/project-published-v1.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project published

> Receive a signed notification at your HTTPS endpoint.

[Set up Events & Hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md).

Sent after a completed deployment becomes the project's published deployment.

See [delivery, retries, and signature verification](https://docs.lovable.dev/api-reference/events-and-hooks.md#verify-and-process-requests).


## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=webhooks webhook project.published.v1
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
- [Control project access](https://docs.lovable.dev/features/project-visibility.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
