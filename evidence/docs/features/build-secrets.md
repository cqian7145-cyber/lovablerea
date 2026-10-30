# Build secrets
<!-- source: https://docs.lovable.dev/features/build-secrets.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Build secrets

> Store encrypted, workspace-level environment variables that Lovable injects when your projects build, for example npm tokens for installing private packages.

Sometimes a project needs a credential while it builds, before the app ever runs. The most common case is an npm token that lets the project install private packages, which is what [design systems](https://docs.lovable.dev/features/design-systems.md) built on private packages rely on. Build secrets solve this: they are encrypted, workspace-level values that Lovable makes available to your projects as environment variables while they build. You can also use them for other build-time needs, such as tokens that upload source maps during a build.

Build secrets are available on **Enterprise** plans. Workspace owners and admins manage them, and workspace editors can see secret names (read-only) so they can reference the right one. No one can view a secret's value after it is saved.

## Build secrets are not project secrets

Lovable has two kinds of secrets, and they do different jobs:

| | Build secrets (this page) | [Project secrets](https://docs.lovable.dev/features/secrets.md) |
| - | - | - |
| **Scope** | Workspace, shared by all projects | One project |
| **Where to manage** | [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets) | **More → Settings → Secrets** in a project |
| **Available** | While a project builds, for example during `npm install` | To your app's backend at runtime, for example in Edge Functions |
| **Typical values** | npm registry tokens, build-time CI tokens | API keys your app calls at runtime, such as a Stripe key |

If your app needs a key while it runs, use project secrets. If a project needs a credential while it installs packages or builds, use build secrets.

## What you can use build secrets for

Build secrets cover any value a project needs while it installs packages or builds:

* Install private npm packages from npmjs, GitHub Packages, GitLab, Artifactory, or another registry.
* Attach a [design system](https://docs.lovable.dev/features/design-systems.md) that wraps a private npm package.
* Authenticate build-time tooling, such as uploading source maps to an error tracker during a build.
* Provide any other environment variable your projects need at build time, shared once across the whole workspace.

If you want Lovable to host the registry itself instead of authenticating against an external one, see [Managed registry](https://docs.lovable.dev/features/managed-registry.md).

## Add a build secret

Only workspace owners and admins can add, edit, or delete build secrets.

**1. Open Build secrets**

Go to [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets).

**2. Add the secret**

Select **New variable** and enter a name and a value. Use an environment-variable style name such as `NPM_TOKEN`, because your projects reference the secret by this exact name. You cannot rename a secret later, only delete it and add a new one.

**3. Save**

Select **Save changes**. Nothing is stored until you save, and the value is hidden from that point on.

Every project in the workspace receives your build secrets as environment variables while it builds, both when you work on the project and when you publish it. Build secrets are never exposed to your published app at runtime.

## Install private npm packages

To authenticate installs against a private registry, your project needs an `.npmrc` file that references the secret by name. Add the token as a build secret first, then ask Lovable to configure the project:

```text wrap theme={null}
Install our private package @acme/ui-components from GitHub Packages. The auth token is in the PACKAGES_TOKEN build secret.
```

Lovable writes the `.npmrc` for you, referencing the secret with `${PACKAGES_TOKEN}` syntax. For example, for GitHub Packages:

```text theme={null}
@acme:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${PACKAGES_TOKEN}
```

Lovable cannot create or read build secrets for you. Adding the token in [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets) is always a manual step for a workspace admin.

When you create a design system from a private npm package, the design system setup asks for the name of the build secret that holds your registry token, and projects that attach the design system authenticate with it automatically.

## Update or delete a build secret

Existing values are always shown masked. To rotate a secret, enter a new value in its row and select **Save changes**. To delete one, select the trash icon next to it and save.

Deleting is permanent. A secret's value cannot be recovered after deletion (or viewed after saving), and the next build of any project that references the deleted secret fails to authenticate. Update the projects that reference it, or add a replacement secret with the same name, before deleting.

## Limitations

* Build secrets apply to the whole workspace. You cannot scope one to a single project or override it per project.
* Build secrets are available only while a project builds. Your published app cannot read them at runtime, so runtime keys belong in [project secrets](https://docs.lovable.dev/features/secrets.md).
* Lovable cannot add, read, or change build secrets. A workspace owner or admin manages them in workspace settings.

## Troubleshooting

If build secrets are not behaving as expected, these are the most common causes:

> **npm install fails with a 401 or 403 error**
>
> The registry rejected the token. Check that the secret's name in [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets) exactly matches the name referenced in the project's `.npmrc`, that the token has not expired or been revoked at the registry, and that it has permission to read the package. After fixing the token, enter the new value in the secret's row and save.
>
> Lovable removes spaces and line breaks from the start and end of the value when you save it. If the token was saved a while ago and you suspect a stray character from copying, saving the value again stores it clean.

> **You need workspace settings permissions to manage secrets**
>
> Adding, editing, and deleting build secrets requires the workspace owner or admin role. Workspace editors can see secret names but cannot change them. Ask a workspace owner or admin to make the change or to upgrade your role.

> **Build secrets does not appear in workspace settings**
>
> Build secrets are available on Enterprise plans. If your workspace is on an Enterprise plan and the section is still missing, contact support.

## FAQ

Common questions about how build secrets behave:

> **Can I view a build secret's value after saving it?**
>
> No. Values are encrypted and permanently hidden after you save. You can only replace a value with a new one. If you lose a token, generate a new one at the registry or service that issued it.

> **Are build secrets available in my published app?**
>
> No. Build secrets exist only while a project builds. Keys your app needs at runtime, such as API keys used by Edge Functions, belong in the project's own [secrets](https://docs.lovable.dev/features/secrets.md).

> **Can Lovable add a build secret for me?**
>
> No. Lovable can write the files that reference a secret, such as `.npmrc`, but a workspace owner or admin must add the secret itself in [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets).

> **What is the difference between build secrets and the managed registry?**
>
> Build secrets authenticate your projects against registries you already run elsewhere, such as npmjs, GitHub Packages, or Artifactory. [Managed registry](https://docs.lovable.dev/features/managed-registry.md) gives your workspace its own npm registry hosted inside Lovable, with no external registry or token needed.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Secrets](https://docs.lovable.dev/features/secrets.md)
- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
- [Managed registry](https://docs.lovable.dev/features/managed-registry.md)
