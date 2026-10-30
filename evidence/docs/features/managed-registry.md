# Managed registry
<!-- source: https://docs.lovable.dev/features/managed-registry.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed registry

> Set up a managed npm registry inside your Lovable workspace to publish and install packages without exposing them publicly.

Managed registry provides your workspace with one npm registry, hosted privately inside Lovable. You can publish npm packages directly to it without making them public, and any project in your workspace can install those packages.

Setting up the managed registry is limited to workspace owners and admins. Any editor can view the published packages in the registry.

## Why use a managed registry

Internal teams often maintain private npm packages for shared code like design systems, utility libraries, or proprietary API clients that shouldn't be published publicly. With a managed registry in Lovable, you can:

* Install internal packages in Lovable projects without workarounds.
* Keep proprietary code private and secure.
* Reuse versioned internal libraries consistently across your workspace's projects.

## Common use cases

* **Internal UI component libraries**: install your organization's design system as a private package and use it in Lovable projects.
* **Shared utilities**: use internal validation, formatting, or data-fetching packages across multiple projects.
* **Proprietary integrations**: install internal SDKs or API clients that can't be published publicly.

## Prerequisites

* A **Lovable Enterprise plan**
* **Workspace owner or admin role**

## Set up the managed registry

Setting up the managed registry consists of two parts:

1. **Enable the registry and create a service account key** in Lovable workspace settings.
2. **Configure your code project** by adding the `.npmrc` file, adding the service account key as an `npm-key.json` file, and running authentication against the managed registry using the service account key.

### Part 1: Enable the registry

**1. Open the settings**

Go to [Managed registry](https://lovable.dev/settings/managed-registry) (**Workspace settings → Build & deploy → Managed registry**).

**2. Provision the registry**

Select **Provision registry**. Lovable sets up a managed npm registry for your workspace.

**3. Create a service account key**

When the registry is provisioned, you can create a service account key. Enter a name for the key, and select **Create key**.

> [!WARNING]
>
> Save the service account key file immediately after creating it. You will not be able to retrieve it again.

### Part 2: Configure your code project

**1. Configure the .npmrc file**

In your code project's root directory, add the managed registry details to the `.npmrc` file.

**2. Add the service account key**

Add the service account key you downloaded in Part 1 as an `npm-key.json` file in your project.

**3. Authenticate against the registry**

Run the authentication command using the service account key to authorize your code project to publish to the managed registry.

## View published packages

Once packages are published to your managed registry, you can view them in [Managed registry](https://lovable.dev/settings/managed-registry) (**Workspace settings → Build & deploy → Managed registry**). For each package, you can see the name, the latest published version, and when it was last updated.

## Use a private package

To install a private package in a Lovable project, prompt Lovable with the package name just as you would for any public npm package. For example:

```text wrap theme={null}
Install @my-org/ui-components and use it to replace the current button component.
```

Lovable resolves the package from your configured managed registry automatically.

## FAQ

> **Who can see the registry configuration?**
>
> Only workspace owners and admins can configure the registry and manage its service account keys. Editors can see the published packages but not the settings. A service account key is shown once when you create it and can't be retrieved afterwards, so store it somewhere safe.

> **Do all projects in my workspace have access to the registry?**
>
> Yes. Once configured, the managed registry is available to all projects in the workspace. There is no per-project configuration required.

> **Can I use scoped packages from my managed registry?**
>
> Yes. Scoped packages (for example, `@my-org/package-name`) are supported. Reference the package by its full scoped name when prompting Lovable.

> **What if my packages live in an external registry?**
>
> If your packages are hosted on npmjs, GitHub Packages, GitLab, Artifactory, or another registry you already run, you do not need the managed registry. Add your registry token as a [build secret](https://docs.lovable.dev/features/build-secrets.md) instead, and your projects authenticate against the external registry during installs.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Build secrets](https://docs.lovable.dev/features/build-secrets.md)
- [Using npm packages](https://docs.lovable.dev/tips-tricks/npm-packages.md)
