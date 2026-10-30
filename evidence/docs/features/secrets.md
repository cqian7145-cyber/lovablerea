# Secrets
<!-- source: https://docs.lovable.dev/features/secrets.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Secrets

> Store API keys and other sensitive values securely in your app's built-in backend, and understand the difference between secrets and VITE_ environment variables.

Secrets store sensitive values such as API keys, tokens, and credentials without exposing them in code. They are encrypted, injected into your Edge Functions automatically, and never reach the browser. Each secret belongs to one project and is read while your app runs. Workspace-wide values your projects need while they build, such as npm tokens for private packages, are [build secrets](https://docs.lovable.dev/features/build-secrets.md), available on Enterprise plans.

You usually don't add secrets by hand. When a feature needs one, Lovable prompts you to enter it through a secure input in the project chat. For example, a prompt like this leads Lovable to ask for the keys it needs:

```text wrap theme={null}
Connect Stripe so clients can pay invoices online. Ask me for any API keys you need.
```

If you paste an API key into the project chat yourself, and Lovable recognizes which tool it belongs to, it offers to set up a [connector](https://docs.lovable.dev/integrations/introduction) for that tool instead. Select **Connect** and the connection form opens with the key already filled in, or, if your workspace already has a connection for that tool, Lovable offers to use that one for this project. A connection lives in your workspace, so you can reuse it across projects and choose who else can use it.

Lovable saves your key as a project secret when you send the message, whether or not you set up the connection. If you don't have permission to add connectors in your workspace, Lovable asks you to check with a workspace admin instead.

## Understanding a secret prompt

When Lovable asks you for a secret, the chat message explains which secret it needs and why. Before entering a value, check:

* **The secret name.** For example, `STRIPE_SECRET_KEY` or `OPENAI_API_KEY`. The name is usually the exact environment variable your Edge Function will read.
* **The chat message before the prompt.** Lovable explains what the current change needs the secret for, such as calling a specific API, authenticating with a provider, or signing webhooks, and where to get the value.
* **The provider's dashboard.** If you're unsure what the value should be, open the provider's website (Stripe, OpenAI, Resend, and so on) and look for the API key or credential of the same name. The input field shows an example of what a well-formed value looks like, and warns if what you enter doesn't match the expected format. The warning never blocks you, so you can still submit a valid key the format check guessed wrong.

If you don't want to add the secret yet, select **Skip** and ask Lovable to explain what the secret is used for, or to build the rest of the feature without it. Anything that depends on the secret won't work until you add it. When you're ready, ask Lovable in the project chat and it opens the secure form again.

### Secrets you enter in two places

Some secrets are values you choose yourself and enter in two places. Examples are the secret GitHub uses to sign its webhook requests, or a token that two of your apps share. When Lovable asks for one of these, the secret form shows a **Generate** button next to the value field. The text under the field tells you where else to enter the value.

Select **Generate** to fill in a strong random value. Select **Copy** and paste the value in the other place, then select **Submit**. You can also paste a value of your own instead. Lovable shows the value only in the form. After you submit, you cannot view it again, so copy it first. Lovable does not repeat a stored secret value, or anything derived from it such as its first characters or its length, in the project chat, in logs, or in your code.

The **Generate** button does not appear for values that another service issues, such as a Stripe signing secret or an API key. Copy those from the service's dashboard.

To manage secrets yourself, go to **More → Settings → Secrets** in the project toolbar.

## Manage secrets

The Secrets view lists each secret's name and creation date. Values are never shown.

* **Add secret** opens a dialog where you can enter one or more name and value pairs.
* **Delete**, in the secret's **...** menu, removes a secret. This cannot be undone; if a feature still needs the value, your app breaks until you add it again.
* Secrets are **write-only**: after you save a secret, its value can never be viewed again in Lovable, only replaced or deleted. If you lose a key, generate a new one at the service that issued it. If you lose a value you generated in the secret form, ask Lovable in the project chat to update the secret. Generate a new value and enter it again in the other place. Secrets are not copied when a project is remixed.

When you save a value, Lovable removes spaces and line breaks from its start and end, so a stray character picked up while copying does not end up in the stored secret. Line breaks inside the value are kept, so multi-line values such as private keys stay intact. A value that contains nothing but spaces or line breaks is rejected. If a secret you saved earlier stopped working because of a stray character, save its value again to store it clean.

Some secrets carry a badge:

* **Lovable**: managed by Lovable and required for the platform to work. These cannot be deleted.
* **Not in use**: another secret with the same name takes precedence at runtime.

Secrets added by a [connector](https://docs.lovable.dev/integrations/introduction) carry no badge. The connection manages the value, so you remove the connection rather than the secret. Select **Manage connection** in the secret's **...** menu.

The `LOVABLE_API_KEY` secret, used by built-in AI, has a **Rotate** action. If you suspect the key has been exposed, rotate it: Lovable issues a new key and updates your Edge Function environment automatically. Rotating requires editor access or above.

### Workspace build secrets

On Enterprise plans, [build secrets](https://docs.lovable.dev/features/build-secrets.md) set for the whole workspace appear in this list too, sorted alphabetically alongside your project secrets. They sit in a dimmed row with your workspace avatar next to the name.

* Workspace secrets are read-only here. You see the name, never the value. The **Created** column can be blank for older workspace secrets.
* The only action is **View workspace secrets**, which opens [**Workspace settings → Build & deploy → Build secrets**](https://lovable.dev/settings/secrets). Add, change, and delete them there, as a workspace admin or owner.
* Seeing these rows depends on your workspace role, not on your access to this project. You need workspace editor access or above, so [external collaborators](https://docs.lovable.dev/features/privacy-and-security-settings.md#external-project-collaborators) manage the project's own secrets without seeing the workspace ones.
* A project secret can use the same name as a workspace secret. The list then shows only the project row, marked with a warning icon, and your app runs with the project value. While a project builds, the workspace value still applies, because project secrets take no part in builds.

## Secrets vs. `VITE_` environment variables

Lovable's Secrets manager is for **backend** values only: values used by Edge Functions and server-side integrations. Anything prefixed with `VITE_` is a **build-time, browser-exposed** value and must live in your project's `.env` file instead, not in Secrets.

* **Backend secrets (use Secrets):** `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `OPENAI_API_KEY`, third-party service credentials, and anything that must never reach the browser.
* **Frontend variables (use `.env`):** anything prefixed with `VITE_`, such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. These are embedded into the client bundle at build time and are safe to be public. You can find and edit them in the `.env` file in Lovable's code editor or in your synced Git repository.

> [!WARNING]
>
> Do **not** add `.env` to `.gitignore` in a Lovable project. Lovable needs `.env` committed to the repository so build-time `VITE_*` values are available when generating previews and published builds. Gitignoring it will break the preview.

If you try to add a `VITE_`-prefixed name in Secrets, Lovable rejects it with a message like *"`VITE_` prefixed variables are build-time browser values and should be defined in `.env` files, not in secrets."*

## Reserved secret name prefixes

The following name prefixes are managed automatically by the built-in backend and cannot be created or overwritten in the Secrets UI:

* `SUPABASE_`: for example `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`. These are populated by Lovable when the built-in backend, or a connected Supabase project, is enabled.
* `LOVABLE_`: reserved for Lovable-managed values such as the Lovable API key used by built-in AI.

You don't need to add these yourself. They already exist in your Edge Function environment, and your functions can reference them directly (for example, `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")`).

If your project uses an **external** Supabase connection instead of the built-in backend, secrets are managed in Supabase: the backend view shows a **Manage secrets** button that opens your Supabase project's dashboard.

## FAQ

> **Can I view a secret's value after saving it?**
>
> No. Secrets are write-only: you can replace or delete a secret, but never read its value back. If you lose a key, generate a new one at the service that issued it. If you lose a value you generated in the secret form, ask Lovable to update the secret, then enter the new value again in the other place.

> **Are secrets copied when I remix a project?**
>
> Lovable-generated keys are recreated fresh in the remixed project. Manually added secrets are not copied over, so re-enter them in the new project.

> **Where do my secrets get used?**
>
> Secrets are injected into your project's [Edge Functions](https://docs.lovable.dev/features/edge-functions.md) and server-side integrations at runtime. They are never included in your frontend code or exposed to the browser.

> **Should I put my API key in a secret or in .env?**
>
> If the value must stay private (payment keys, AI provider keys, service credentials), use Secrets. If it's a `VITE_`-prefixed build-time value that is safe to be public, it belongs in `.env`.


## Related topics

- [Build secrets](https://docs.lovable.dev/features/build-secrets.md)
- [Connect to Supabase](https://docs.lovable.dev/integrations/supabase.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Connect apps to Lovable with OAuth](https://docs.lovable.dev/features/oauth-clients.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
