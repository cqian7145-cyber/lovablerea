# Deployment, hosting, and ownership options with Lovable
<!-- source: https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Deployment, hosting, and ownership options with Lovable

> What you own when you build with Lovable, which parts of an app can move to your own hosting or infrastructure, and which setup fits your requirements. For deployment and migration steps, see Deploying and hosting outside Lovable.

Lovable is designed to be the **easiest, fastest, and most enjoyable** way to build production-ready applications.

It provides a high-quality AI agent, a visual editor, preview environments, and fully managed infrastructure so you can focus on building, not operating systems. For what that hosting means in practice, see [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md).

Lovable is intentionally built so that **you are never locked in**. You can export your code, migrate your data, self-host parts or all of your stack, or move to another provider at any time. We want you to stay with Lovable by choice, never by necessity.

You can check that for yourself before you commit to a production setup: sync a project to a repository, run it on your own computer, and deploy a copy to a host you already use. Pick the path that matches what you want to do:

| Situation | Go to |
| - | - |
| You want to use your own IDE or coding tools | [Work locally in your IDE](https://docs.lovable.dev/integrations/git-sync-overview#work-locally-in-your-ide). Keep Git sync connected to continue building in Lovable. |
| You want to host the frontend elsewhere and keep the built-in backend | The frontend sections of [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md). You can keep building in Lovable, and AI features and app connectors keep working. |
| You want the database and backend services under your own account or infrastructure | The backend sections of [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#host-backend-and-data-on-a-managed-provider-supabase-example). The frontend can stay on Lovable or move too. |
| You want the app to run without any Lovable service | [Complete a move away from Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#complete-a-move-away-from-lovable): deploy the code, migrate the data and services, and replace the calls that run through Lovable. |

## Key principles

* **You own what you create**.\
  Your apps, code, and content you create with Lovable are yours, subject to third-party rights such as open-source licenses. You can modify them, use them commercially, and host them wherever you choose. See the [Terms of Service](https://lovable.dev/terms). Use [Git sync](https://docs.lovable.dev/integrations/git-sync-overview) to keep your code in your own repository.
* **You own your data**.\
  Your database, storage, and configuration are portable. You can export schemas and data, migrate to another provider, or run everything on infrastructure you control. Lovable does not rely on proprietary data stores.
* **Lovable is built on open source technologies**.\
  Lovable apps are built on open-source frameworks. New apps created from May 13, 2026 use TanStack Start, which runs server code. Older apps use React + Vite and build to static files. You can deploy either to managed hosting or infrastructure you control. Your backend, AI, and connectors are separate services that you keep, reconfigure, or replace when you move.
* **We earn your trust through quality, not control**.\
  Lovable hosting is optimized for speed, simplicity, and reliability. If your requirements change, you can move your code and migrate the services your app uses. That freedom is intentional.

## What you get with Lovable hosting

While Lovable is designed to work with many hosting and infrastructure setups, Lovable's own hosting and built-in backend are where the platform delivers the most value, especially during active development and iteration.

When you host on Lovable, development, previews, and production operate together in one integrated environment.

You focus on building. We handle the platform.

**Running your app on Lovable provides:**

* AI-assisted development tightly integrated with your application
* Visual editing and real-time preview environments
* Production hosting with custom domains, automatic SSL, and global delivery
* Automatic deployments and environment management
* Fully managed backend, databases, and infrastructure
* Built-in authentication and data isolation
* Integrated integrations and secrets management
* Managed AI provider access for runtime features
* Automated security scanning and compliance-ready infrastructure (SOC 2 Type 2 and ISO 27001 certified)
* Minimal operational overhead

## What changes if you stop using Lovable

If you stop using Lovable entirely (editor, agent, previews, and hosting), Lovable no longer manages your development and deployment workflow.

**You will be responsible for:**

* Configuring and maintaining development environments and debugging workflows
* Building and managing CI/CD pipelines and release processes
* Operating production infrastructure, SSL certificates, CDN configuration, and scaling
* Running databases, storage systems, backups, and access controls
* Implementing authentication and enforcing data isolation policies
* Managing OAuth flows, secrets, and external API integrations
* Managing AI provider accounts, credentials, billing, and rate limits
* Maintaining security audits, monitoring, and compliance posture

That is the operational boundary of a move off a fully managed platform.

## How Lovable fits into your stack

Applications built with Lovable consist of three independent parts:

| Part | Default | Can also run on |
| :- | - | :- |
| **Code** | Managed in Lovable, synced via Git sync | Any Git-based workflow |
| **Frontend** | Lovable hosting with custom domain support | Static hosting for older Vite apps. Server hosting for TanStack Start apps, on managed platforms, containers, or virtual machines |
| **Backend and data** | Built-in backend | Managed Supabase, self-hosted Supabase, or other PostgreSQL-based backends with equivalent auth, storage, and edge services |

Lovable can host both the frontend and backend, but you can move either part independently to managed platforms or your own infrastructure.

## Lovable platform compatibility

**Older React + Vite apps** build to static files that any static host can serve. **TanStack Start apps** run server code, such as server-side rendering, server functions, and API routes, so they need a host that runs the server part as well as serving the static files. Follow TanStack Start's [hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for the supported providers.

For older Vite apps, hosting options include:

* **Amazon Web Services (AWS):**\
  Static hosting + CDN (S3 + CloudFront), container services (ECS), managed Kubernetes (EKS), application hosting (Amplify)
* **Google Cloud Platform (GCP):**\
  Static hosting + CDN (Cloud Storage + Cloud CDN), container services (Cloud Run), managed Kubernetes (GKE)
* **Microsoft Azure:**\
  Static site hosting (Static Web Apps), container services (Azure Container Apps), managed Kubernetes (AKS)
* **Self-hosted infrastructure:**\
  Containers (Docker), Kubernetes clusters, virtual machines running Nginx or Apache
* **Managed frontend hosting platforms:**\
  Netlify, Cloudflare Pages, Vercel

Your built-in backend can stay in place while you move the frontend to another provider. Configure the new host's environment variables, server secrets, and sign-in redirect URLs for the services your app continues to use.

If you move the built-in backend, the supported destinations are **managed Supabase** and **self-hosted Supabase**. Other backends need changes to your app's integration code, and some built-in backend features need replacements. Moving the PostgreSQL database alone does not move authentication, storage, realtime, or Edge Functions. Migrating to plain PostgreSQL or another database provider means implementing equivalents yourself, and Lovable does not support it.

## Common deployment and hosting setups

Most people end up in one of these configurations:

### Everything on Lovable (recommended)

* Preview and production hosted on Lovable
* Backend and frontend fully managed by Lovable
* Custom domains fully supported
* No infrastructure setup or maintenance required

Best for most applications.

### Lovable + managed platforms (hybrid)

* Lovable used for development, previews, and tooling
* One or more production components deployed to managed services:
  * Managed backend (for example, managed Supabase, or cloud-managed PostgreSQL combined with your own authentication, storage, and backend services)
  * Managed frontend hosting platforms (for example, Cloudflare Pages, Netlify, or cloud-provider static hosting)
* Your Git provider used as the bridge between Lovable and production

Best for those with specific backend or compliance requirements.

### Fully self-managed infrastructure (advanced)

* Code synced via [Git sync](https://docs.lovable.dev/integrations/git-sync-overview)
* Backend services and database run on infrastructure you operate (for example, self-hosted Supabase, or managed PostgreSQL combined with your own authentication, storage, and edge services)
* Frontend deployed via containers, VMs, or internal platforms
* Lovable may still be used for development, or development can fully move to other tools

> [!NOTE]
>
> The Lovable platform itself (the editor and AI agent) is a managed service and cannot be self-hosted or deployed inside a customer VPC.\
> \
> The applications you build with Lovable can be hosted anywhere.

### Setup comparison

| **Setup** | **Code** | **Frontend** | **Data** | **Backend** |
| :- | :- | :- | :- | :- |
| **Everything on Lovable (recommended)** | Managed in Lovable ([Git sync](https://docs.lovable.dev/integrations/git-sync-overview) optional) | Fully managed by Lovable with custom domain support | Fully managed by Lovable | Fully managed by Lovable |
| **Lovable + managed platforms (hybrid)** | Two-way sync between Lovable and your Git repository | Hosted by your chosen platform (for example, Netlify, Cloudflare Pages, S3 + CDN) | Built-in backend, or your chosen provider (typically managed Supabase) | Built-in backend, or your chosen provider (managed Supabase or equivalent backend services) |
| **Fully self-managed infrastructure (advanced)** | Your Git repository (Lovable optional during development) | Hosted on your infrastructure (containers, virtual machines, or Kubernetes) | Hosted on your infrastructure (typically self-hosted Supabase or PostgreSQL-based database with equivalent services) | Hosted on your infrastructure (self-hosted Supabase or equivalent auth, storage, realtime, and edge services you operate) |

## Recommended adoption path

You do not need to decide everything upfront. Lovable lets you start simple and move incrementally as requirements change.

The recommended path:

1. **Start on Lovable**. This is the fastest path to production with minimal operational overhead.
2. **Sync your code** with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview). This gives you a copy in a repository you control and enables external collaboration.
3. **Move components only when you hit a real constraint**, not a hypothetical one.

For most applications, hosting on Lovable is the most efficient and reliable option.

Consider moving parts of your stack only if you have specific requirements that Lovable cannot meet:

* **Compliance or data residency** mandates tied to specific infrastructure providers
* **Networking configurations** not supported by Lovable (for example, VPC peering, private endpoints)
* **Organizational policies** requiring self-managed or audited hosting environments

These are exceptions, not the default path. If you're unsure, start with Lovable. Your code stays yours, so you can move later and adapt the deployment and the services your app uses.

For practical examples and deployment instructions, see [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md).

## FAQ

> **Can I export my app on the Free plan?**
>
> Yes, with [Git sync](https://docs.lovable.dev/integrations/git-sync-overview), which is available on all plans. The codebase download as a `.zip` file requires a paid plan. See [Get your source code](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#get-your-source-code).

> **Can I keep using Lovable while hosting somewhere else?**
>
> Yes. Keep the repository connected through Git sync and let the other host deploy from it. Lovable continues to edit and preview the app while that host serves the live app. See the hybrid setup under [Common deployment and hosting setups](#common-deployment-and-hosting-setups).

> **Do I have to rewrite the app to leave Lovable?**
>
> No. The application source is yours and runs on any compatible host, so moving the app is a deployment change rather than a rewrite. The work is in the parts that run through Lovable: a backend move includes a data migration, and app connectors and AI features need a replacement at the destination. See [How Lovable fits into your stack](#how-lovable-fits-into-your-stack).

> **Can the exported app run without a Lovable subscription?**
>
> Yes, when it runs on your own hosting and no longer calls Lovable services. Your hosting and service providers bill you under their own plans. While the app still uses the built-in backend, AI features, or app connectors, those keep running through Lovable. Cloud usage, AI features, and connectors on the **Managed by Lovable** option keep using your workspace credits. See [Complete a move away from Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#complete-a-move-away-from-lovable).

> **Does the export include my database and uploaded files?**
>
> No. Git sync and the codebase download contain the source files, including the database migration files that define its structure. Export the database and download storage files separately, and verify them at the destination before you retire the original. See [What migrates and how](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md#what-migrates-and-how).


## Related topics

- [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
- [Sync your Lovable project code with GitHub, GitLab, or Bitbucket](https://docs.lovable.dev/integrations/git-sync-overview.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
