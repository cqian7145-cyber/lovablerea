# Project transferred to another workspace
<!-- source: https://docs.lovable.dev/api-reference/events/project-workspace-transferred-v1.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project transferred to another workspace

> Receive a signed notification at your HTTPS endpoint.

[Set up Events & Hooks](https://docs.lovable.dev/api-reference/events-and-hooks.md).

Sent to matching subscriptions in both the source and destination workspaces after a transfer commits. The deliveries share an event ID; workspace\_id identifies the recipient workspace.

See [delivery, retries, and signature verification](https://docs.lovable.dev/api-reference/events-and-hooks.md#verify-and-process-requests).


## OpenAPI

````yaml https://api.lovable.dev/v1/openapi.yaml?view=webhooks webhook project.workspace_transferred.v1
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

- [Share a project with internal or external collaborators](https://docs.lovable.dev/features/share-project.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Cross-project referencing](https://docs.lovable.dev/features/cross-project-referencing.md)
- [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github.md)
- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
