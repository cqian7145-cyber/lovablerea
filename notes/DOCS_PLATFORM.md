# Lovable platform / runtime / deployment / integration architecture — as publicly documented

Scope: only what the 50 documentation pages listed for this task state. Every claim below is followed by the relative path of the doc page it came from. Where the docs are silent, the entry says `UNKNOWN` instead of guessing. Product names and UI labels are kept exactly as the docs print them.

Mirror: `D:\lovable-research\evidence\docs\` (322 markdown pages; each file's second line carries its `docs.lovable.dev` source URL).

---

## 1. Generated app stack

**Two stacks, no choice offered**

- Lovable builds on exactly two stacks and does not let users pick a framework: **TanStack Start** for apps created from **May 13, 2026** (**June 22, 2026** for new Enterprise workspaces), and **React + Vite** for older apps. [introduction/faq.md]
- "Can I choose a different framework, such as Next.js?" → "No. Every project uses the same stack." Lovable "does not offer a choice of framework or database." [introduction/faq.md]
- Which stack a project uses is visible in `package.json`: a TanStack Start project lists `@tanstack/react-start` under `dependencies`; an older React + Vite project does not. [tips-tricks/external-deployment-hosting.md]
- Older projects can be migrated: `/` → **Migrate to TanStack Start**, `Project settings → General → Project actions → Migrate to TanStack Start`, or a natural-language request. Costs **10–35 credits**, reversible from version history. [features/upgrade-to-tanstack-start.md]
- Rendering difference stated as the reason for the migration: TanStack Start renders on the server (SSR everywhere), while older React + Vite apps render in the browser and Lovable serves pre-rendered copies only to verified search engines, social preview bots and AI crawlers. [features/upgrade-to-tanstack-start.md] [features/hosting.md]

**Build tooling and output (from the migration/deployment guides, which expose the real scaffolding)**

- TanStack Start projects build through `@lovable.dev/vite-tanstack-config` in `package.json`, which prepares server output for the target host via **Nitro** (Nitro platform adapters are called **presets**). [tips-tricks/external-deployment-hosting.md]
- `nitro` must be listed in `package.json`; setting the `nitro` option in `vite.config.ts` without installing the package errors out. [tips-tricks/external-deployment-hosting.md]
- Node-server build: `NITRO_PRESET=node-server npm run build` → standalone `.output` directory → `node .output/server/index.mjs`, listening on port **3000** (`PORT`/`HOST` override it), Node.js **22**. [tips-tricks/external-deployment-hosting.md]
- Inside Lovable the Nitro preset is fixed; outside Lovable the build detects the platform or takes a named preset. Vercel/Netlify/Cloudflare Pages are auto-detected. [tips-tricks/external-deployment-hosting.md]
- Older React + Vite apps build to static files in `dist/` and need `index.html` SPA fallback (client-side routing via React Router `BrowserRouter`); TanStack Start apps must not use that `try_files` fallback because the server handles routing. [tips-tricks/external-deployment-hosting.md]
- Build command is `npm run build` with "Node version: 22 recommended"; `VITE_`-prefixed variables are embedded at **build time**. [tips-tricks/external-deployment-hosting.md]
- Package installation is done with **Bun**: `bun.lock` / `bun.lockb` "belongs to Bun, the tool Lovable uses to install packages"; repos without `package-lock.json` need Bun locally or a generated lockfile for `npm ci` in CI. [tips-tricks/npm-packages.md] [tips-tricks/external-deployment-hosting.md]
- npm packages are installed by asking in chat (no terminal, no manual `package.json` edit); private/internal packages require an Enterprise **managed registry** (`.npmrc` + `npm-key.json`, one private registry per workspace). [tips-tricks/npm-packages.md] [features/managed-registry.md]

**Repository layout the docs reveal**

- `.env` must be committed (it is not a secret store); gitignoring it breaks the preview. [features/secrets.md]
- Browser-side backend variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`; server-side equivalents `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`. [tips-tricks/external-deployment-hosting.md]
- Database migrations live in `drizzle/migrations/` (newer projects) or `supabase/migrations/` (older projects); a Drizzle project follows `drizzle/migrations/meta/_journal.json` for order and its migrations do not run through `supabase db push`. [features/database.md] [tips-tricks/external-deployment-hosting.md]
- Edge Function code lives in `supabase/functions/`. [integrations/git-sync-overview.md] [tips-tricks/external-deployment-hosting.md]
- `supabase/config.toml` holds the backend `project_id`. [tips-tricks/external-deployment-hosting.md]
- Lovable owns Drizzle's `drizzle/schema.ts` and `drizzle.config.ts`. [features/database.md]
- Lovable cannot save files larger than **10 MB** into a project; files pushed from a user's machine up to the provider's limit sync in but cannot be edited afterwards. Workaround the docs name: "Migrate large files to CDN assets". [integrations/github.md]
- Mobile: web apps only, "does not generate React Native projects"; PWA or an external Capacitor wrapper are the documented paths. [introduction/faq.md]

**Not stated in these pages**

- Tailwind CSS and shadcn/ui: no page in this read set names either as part of the generated stack. `UNKNOWN` from this evidence set (the design-system pages are outside scope).
- Exact `package.json` dependency set, React version, bundler version, router version used inside the app template: `UNKNOWN`.
- Whether TanStack Start projects use file-based routes (TanStack Router) or a config-generated route tree: `UNKNOWN`.

---

## 2. Runtime & hosting

**Publish model**

- **Publish** deploys a snapshot of the current project version to a live URL; later edits do not auto-deploy — **Publish changes** is required, and a dot on the **Publish** button marks unpublished changes. [features/hosting.md] [tips-tricks/launch-on-a-custom-domain.md]
- Only the current version is deployed ("Lovable publishes the current version of your project"). [tips-tricks/launch-on-a-custom-domain.md]
- Publishing from the **publish dialog is free** and works at zero credits; publishing **from the project chat** is treated as build usage and consumes credits. [features/publish.md] [tips-tricks/launch-on-a-custom-domain.md]
- Metadata (title, meta description, favicon) is generated per page during the build; the Open Graph image is resolved at serve time as the chosen image or the latest screenshot. [features/publish.md]
- Unpublish: **⋮ → Unpublish** in the publish dialog, or **Project settings → Unpublish project**. [features/hosting.md]
- Automatic unpublish on Free workspaces after **12 months** without visits, owner login, or a custom domain (owners are emailed, backend is paused). [features/hosting.md]
- Publishing runs a security **Quick scan** (~10 s) in the dialog before deploy. [features/publish.md]

**Domains and URLs**

- Default address: `[url-subdomain].lovable.app`, formed from the project's URL subdomain; the subdomain is editable in the publish dialog. The `xxx.lovable.app` URL "cannot be removed". [features/hosting.md] [features/custom-domain.md] [tips-tricks/launch-on-a-custom-domain.md]
- Other Lovable-served hostnames listed for key domain restrictions: `*.lovable.app/*`, `*.lovable.dev/*`, `*.lovableproject.com/*`. [integrations/security.md]
- Custom domain on paid plans; branded workspace URL on Business/Enterprise; publishing domain (all apps under one customer domain) on Enterprise. [features/hosting.md]
- HTTPS/SSL is automatic for every URL including custom domains; TLS **1.2+** enforced, TLS 1.0/1.1 rejected, not user-configurable. [features/hosting.md] [features/custom-domain.md]
- Delivery claim: published apps are "delivered from locations around the world". CDN vendor, PoP count, origin region: `UNKNOWN`. [features/hosting.md]
- Free-plan + TanStack Start apps (created from May 13, 2026) are limited to **1,000 server requests per project per 10 seconds**; over the limit visitors see **App temporarily unavailable**. No plan otherwise caps visitors or bandwidth. [features/hosting.md]
- Automated abuse protection runs on every published app; details of the mechanism are not documented. [features/hosting.md]
- Sites created from May 13, 2026 are server-rendered; older apps get pre-rendered pages only for verified crawlers — third-party SEO scanners are not verified crawlers. [features/hosting.md]

**Custom-domain DNS (concrete values)**

- External domain connection: `A` record → **185.158.133.1**; verification `TXT` at `_lovable` (root) or `_lovable.<subdomain>` with value `lovable_verify=…`; TTL 300. [features/custom-domain.md] [tips-tricks/launch-on-a-custom-domain.md]
- `AAAA` records must not exist; existing `A`/`AAAA`/`CNAME` for the same name must be removed; `MX` records must stay. [features/custom-domain.md] [tips-tricks/launch-on-a-custom-domain.md]
- CAA records must allow at least one of **Google Trust Services** (`pki.goog`), **Let's Encrypt** (`letsencrypt.org`), **SSL.com** — this is the documented CA set. [features/custom-domain.md]
- Automatic DNS setup detects the provider and applies records via **Entri**. [features/custom-domain.md]
- Proxy/CDN mode (**Uses Cloudflare or similar proxy**) replaces the `A` record with a `CNAME` to the project's `lovable.app` URL and needs no `TXT`; Lovable "does not configure, validate, or monitor" that CDN. [features/custom-domain.md]
- One **primary domain** per project, must be **Live**; all other addresses return **302 temporary** redirects (no 301 support). First custom domain becomes primary automatically (after Oct 29, 2025). [features/custom-domain.md]
- Documented domain statuses include: Pending, Action required, Suspended, Live, Ready, Checking, Connection issue, Check failed, Removed, Unpublished, Verifying, Unable to verify, Setting up, Stalled, Failed, Offline. DNS propagation "up to 72 hours"; a domain whose records never arrive is **Removed** after 72 h. [features/custom-domain.md] [tips-tricks/launch-on-a-custom-domain.md]
- Domain purchase runs through Lovable + **Stripe**, is workspace-owned (not project-owned), requires ICANN registrant email verification, WHOIS privacy on by default, auto-renew on by default, and is billed separately from the subscription. [features/custom-domain.md] [tips-tricks/launch-on-a-custom-domain.md]
- Transfer-in takes 5–7 days, requires an unlocked domain, DNSSEC disabled, and a 60-day-since-registration wait; Lovable then points the domain at its own nameservers and recreates kept records. [tips-tricks/launch-on-a-custom-domain.md]
- **Publishing domain** (Enterprise): one domain or subdomain per workspace, apps served at exactly one label beneath it (`dashboard.apps.acme.com`), label ≤63 chars, lowercase letters/digits/hyphens; requires DNSSEC disabled; Lovable either hosts only that subdomain or takes over all DNS via `NS` + `TXT`. [features/publishing-domain.md]

**Preview vs hosting**

- Preview is the live in-editor view, not the published site. [features/hosting.md]- **Shared preview links** are view-only URLs of the latest in-progress version, work without an account, support **Allow comments**, optional password (Business/Enterprise, ≥8 chars, 24 h unlock), and expiration 24 h / 7 days / 30 days / Never (default **7 days**, immutable after creation); deletion takes up to a minute; they never grant editor access. [features/share-project.md]

**Embedding**

- The Lovable API **Embed** capability "generate[s] a one-hour URL for embedding a project's built preview on a specified HTTPS origin. This does not embed the editor or the published app, and visitors do not need a Lovable login." [integrations/lovable-api.md]
- Other embed-style surfaces documented in this set: `<iframe>`-free "Build with URL" prompt links (no API key), and the project-level **Edit with Lovable** badge (hideable on paid plans). [integrations/lovable-api.md] [introduction/faq.md]

**First-party telemetry and SEO surfaces on the hosted app**

- **Project analytics** (`More → Analytics`, all plans) ships a script and an endpoint on the app's **own domain**; it sets **no cookies**, uses a random per-visit ID discarded at the end of the visit, and can be switched off at `Project settings → General → Publishing → Visitor analytics`. [features/analytics.md]
- Analytics metrics: visits, page views, views per visit, visit duration, bounce rate; channels **All**, **SEO & AI**, **Social**, **Referral**, **Direct**, **Ads** (paid tags such as `utm_medium=cpc` or `gclid`); default window last 7 days, custom range ≤90 days, **Current visits** = last 5 min. [features/analytics.md]
- Workspace **Insights** (Business/Enterprise) aggregates app visits, active apps, active builders and connections added, computed once a day around **09:30 UTC** for the previous day, with CSV export. [features/insights.md]
- SEO/AEO surface: **More → SEO & AI search** runs a review of metadata, indexing, structured data, Open Graph, sitemap and `robots.txt` (free on all plans), and integrates Google Search Console. [introduction/faq.md] [tips-tricks/launch-on-a-custom-domain.md]

**Hosting portability**

- The app's three parts — code, frontend, backend/data — can move independently; the platform itself (editor + agent) "is a managed service and cannot be self-hosted or deployed inside a customer VPC." [tips-tricks/deployment-hosting-ownership.md]
- TanStack Start apps require a host that runs server code (containers, VMs, Nitro presets); they cannot run from object storage or a CDN alone. Old Vite apps run on any static host. [tips-tricks/external-deployment-hosting.md]
- Documented target platforms include Vercel, Netlify, Cloudflare Pages, AWS (S3+CloudFront, ECS, EKS, Amplify), GCP (Cloud Storage+CDN, Cloud Run, GKE), Azure (Static Web Apps, Container Apps, AKS), Docker/Kubernetes/VMs with Nginx. [tips-tricks/deployment-hosting-ownership.md] [tips-tricks/external-deployment-hosting.md]
- Lovable's **Publish** button keeps publishing to Lovable hosting only, even when another host serves the domain. [tips-tricks/external-deployment-hosting.md]

---

## 3. Backend services (Lovable Cloud)

**What "Cloud" is**

- The built-in backend "utilizes **Supabase**'s open-source foundation" and bundles database, authentication, storage, realtime, edge functions, plus **Jobs**, **Logs**, **Usage** and **AI** surfaces. [features/cloud.md]
- Database, user accounts and file storage share **one** backend per project: enabling any one provisions all three; pausing the database pauses all three; removing the database deletes all three. [features/cloud.md]
- Enabled per workspace by default; provisioned automatically when a feature needs a backend, or by agent approval via the **Enable Cloud** permission. Enterprise workspaces can disable it at workspace level (not self-serve), in which case Lovable can create a Supabase project in a linked org instead. [features/cloud.md]
- Backend cannot be enabled from inside a **draft**; drafts share the parent project's database, and accepting a draft only adds tables/columns (never removes or renames). [features/cloud.md]
- Isolation claim: "every project gets its own isolated database"; one project cannot read another's; two projects cannot share one built-in database (the docs point to external Supabase for sharing). [features/cloud.md] [features/database.md]

**Agent permissions over the backend** (Account settings → Preferences → Agent permissions)

- Separate toggles, each **Always allow** / **Ask each time** / **Never allow**: Enable Cloud, Read database, Read analytics, Run security checks, Modify database, Execute backward incompatible database migrations, Change data, Read project info, Configure auth, Read backend logs. [features/cloud.md]
- Defaults stated: **Enable Cloud** = Always allow; **Execute backward incompatible database migrations** = Never allow. Schema/policy changes are applied as SQL migrations and regenerate TypeScript types. [features/cloud.md]

**Data residency**

- Regions: **Americas**, **Europe**, **Asia Pacific**; workspace-wide default on Business/Enterprise via `Workspace settings → Security → Privacy & security → Default data hosting region`; country-specific options (Germany, Japan, United States (East)) on Enterprise request. [features/cloud.md]
- Region is fixed at backend creation and cannot be changed or migrated; the database panel shows the region as the hosting provider names it (e.g. **Europe (Frankfurt)**) plus the PostgreSQL version. [features/cloud.md]
- Enterprise **EU inference** routes model traffic to EU endpoints: Claude → **Google Cloud Vertex AI (EU)** and **AWS Bedrock (EU)**; GPT/OpenAI embeddings → **Microsoft Azure AI Foundry (EU Data Zone)**; Gemini → Vertex AI (EU). [features/eu-inference.md]

**Database**

- Managed PostgreSQL, browsable at **More → Database**: table list with approximate row counts (includes read-only views), filter, add/edit/delete rows (row edit requires a single primary key), `Export CSV`, manual `Refresh` (not live), pages of 10/25/50/100 rows, no import (attach a file in chat instead). Edits apply to the live published database. [features/database.md]
- Schema changes are recorded as migration files and applied as SQL migrations; supported extensions are a fixed allowlist (`pg_cron`, `pg_net`, `supabase_vault`, `pg_trgm`, `vector`, `btree_gist`, `btree_gin`, `unaccent`, `fuzzystrmatch`, `postgis`, `pgmq`; preinstalled `plpgsql`, `pg_graphql`, `pg_stat_statements`, `pgcrypto`, `uuid-ossp`, `pgsodium`). An unsupported `CREATE EXTENSION` is refused in chat, SQL editor, API and MCP server; the API returns `403` with error type `unsupported_extension`. [features/database.md]
- Migration refusals: dropping/renaming a table or column, changing a column type, adding a required column without a default; Lovable works around these by adding columns and copying data. [features/database.md]
- **RLS** is the access-control mechanism across database, storage and realtime. The read-only Policies view lists **Policy name**, **Command** (SELECT/INSERT/UPDATE/DELETE), **Applies to** (`authenticated`/`anon`) and **Rule expression**, filterable by All policies / Tables / Storage / Realtime. Changes are made through chat. [features/database-access.md]
- The database password is Lovable-managed, never displayed, rotatable via chat; the app keeps working, direct client connections break; rotations are audit-logged on Enterprise. [features/database-access.md]
- Instance size is user-selectable on paid plans (`More → Database → Manage → Settings`), with an estimated monthly cost per size; database size/instance size feeds **Cloud usage**. [introduction/credits-and-usage.md]
- Scheduled jobs: `pg_cron` is supported, the **Jobs** surface exists in the **More** panel, and migrations outside Lovable recreate schedules with `cron.schedule`. [features/cloud.md] [features/database.md] [tips-tricks/external-deployment-hosting.md]

**Authentication**

- App sign-in options generated on request: email + password, phone number through the customer's own SMS provider, Google, Apple, Microsoft, "their Lovable account" (**Lovable Auth**), and SAML SSO. [introduction/faq.md]
- Auth settings, social providers, Site URL and redirect URLs are configured through Lovable on the built-in backend; with a customer Supabase project they live in the Supabase dashboard. [features/cloud.md] [integrations/supabase.md]
- Custom domains are added to redirect URLs automatically for built-in-backend apps. [tips-tricks/launch-on-a-custom-domain.md]
- Authentication emails default to "a generic Lovable sender"; paid plans can add their own email domain; custom authentication email domains require the built-in backend because they go through Lovable Auth. [introduction/faq.md] [integrations/supabase.md]
- **Password HIBP check** (leaked-password protection) is a setting at `More → Users → Settings → Email`. [features/security.md]
- **Sign in with Lovable** (for the app's end users) is available only on the built-in backend and on all plans: Lovable registers an OAuth client named after the project, stores its credentials for the project, and keeps the client's redirect addresses in step with the `lovable.app` address and every connected custom domain (updated seconds after a domain goes live, and renamed when the project is renamed). The client belongs to the project and does **not** appear under `Workspace settings → API keys & OAuth`. Sign-ins cost no credits; customers cannot attach their own OAuth client. [features/lovable-auth.md]
- Lovable returns only name, email + verified flag, profile picture and a stable Lovable user ID to the app. Enabling it from the settings toggle sends the equivalent prompt to chat, which is billed as build usage. Configured in `More → Users → Settings → Lovable`; Business/Enterprise admins can block it workspace-wide via the **App login methods** policy (blocked methods show a **Workspace policy** badge). [features/lovable-auth.md]
- Related built-in identity mode named in the same page: **workspace identity reuse**, which recognizes an already-signed-in workspace member with no login page; and a separate "Sign in with Lovable for sites you did not build with Lovable", which uses a self-registered OAuth client. [features/lovable-auth.md]

**Access control on the project vs the site**

- Project access (who can open the editor) and website access (who can open the published URL) are independent settings; the default project visibility is **workspace**, with **Restricted** available on Business/Enterprise, and public projects were removed entirely on April 22, 2026. [features/project-visibility.md]
- The MCP `set_project_visibility` tool exposes the same three editor-audience values (`private`, `workspace_view`, `draft`) and explicitly "controls editor access only, not who can visit the published app". [integrations/lovable-mcp-server.md]

**Storage**

- Buckets are **private** (default, RLS-controlled) or **public** (anyone with the URL); public buckets are **blocked by default on all plans** by the workspace setting **Block public storage buckets**. [features/storage.md]
- Bucket names: lowercase letters/numbers/hyphens, 3–63 chars, immutable. [features/storage.md]
- Upload limit default **2 GB**, configurable up to **5 GB**; private downloads use temporary signed links (**Copy URL** expires after 1 hour); multi-select downloads as a zip. [features/storage.md]
- Storage files are not included in database exports. [features/database-backups.md]

**Edge Functions**

- "Run on Lovable's servers", scale automatically, no server setup; there is no create button — they are created from project chat. [features/edge-functions.md]
- Runtime is evidenced as **Deno**: the docs' example reads `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")`. [features/secrets.md]
- Monitoring at `More → Database → Manage → Edge functions`: status, invocation count, success rate, last updated; relative range 15 min–5 days or absolute; **Copy URL**, **View logs**, **View code**. Unavailable while the project is paused. [features/edge-functions.md]
- Edge Functions read secrets as environment variables; secrets are never injected into the browser. [features/secrets.md]

**Secrets and build secrets**

- Secrets (`More → Settings → Secrets`) are encrypted, write-only (a value is never shown again), trimmed of leading/trailing whitespace, and scoped to one project. [features/secrets.md]
- Reserved prefixes cannot be created or overwritten: `SUPABASE_` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`) and `LOVABLE_`. [features/secrets.md]
- `VITE_`-prefixed names are rejected in Secrets: "`VITE_` prefixed variables are build-time browser values and should be defined in `.env` files, not in secrets." [features/secrets.md]
- Badges: **Lovable** (platform-managed, undeletable), **Not in use** (a same-name secret shadows it); `LOVABLE_API_KEY` can be **Rotate**d. Secrets are not copied on remix (generated keys are recreated, manual ones are not). [features/secrets.md]
- **Build secrets** are workspace-level, encrypted, injected as env vars **only while building** (`npm install`, source-map upload), never at runtime; Enterprise only; referenced as `${NPM_TOKEN}` in `.npmrc`; no per-project override; not renameable. [features/build-secrets.md]

**Backups, export, and portability**

- Automated backups: one per day, retained about **14 days**, timestamps in UTC; **Restore to this backup** reverts structure and data, makes the database unavailable for a few minutes, is irreversible and cannot target an arbitrary point in time; storage is untouched. Anyone with edit access can restore. [features/database-backups.md]
- Export produces a compressed PostgreSQL archive restored with `pg_restore` (custom format, zstd): schema + data **including user accounts with password hashes** and managed schemas such as `auth`; it excludes storage files, Edge Function code, secrets, sign-in provider settings and project API keys. Limits: database up to **15 GB**, export file ≤ **5 GB**, one export per **24 h**; delivered by email and saved to project storage; requires the database to be running. [features/database-backups.md] [tips-tricks/external-deployment-hosting.md]
- There is **no automatic migration** between the built-in backend and a customer Supabase project in either direction; the documented path is export → restore → move storage files → re-setup auth/secrets → re-point `.env` and `supabase/config.toml`. [features/cloud.md] [integrations/supabase.md] [tips-tricks/external-deployment-hosting.md]
- "What migrates and how": schema and storage buckets via SQL migrations; auth providers, env vars/secrets, table data, storage files, user sessions, server functions/schedules, app connectors and AI calls are all manual. [tips-tricks/external-deployment-hosting.md]
- Lovable projects that share one external Supabase project overwrite each other's secrets "including `LOVABLE_API_KEY`". [integrations/supabase.md]

**Compute/usage metering (what the runtime actually bills)**

- **Cloud usage** is metered on database server (instance size + activity), database storage, network, storage, compute, and realtime; reported under **Run credits** together with AI gateway and connector usage. [introduction/credits-and-usage.md]
- AI features inside a shipped app run through Lovable's **AI gateway** ("built-in AI connector", no provider account or API keys) and bill as AI gateway usage. [introduction/credits-and-usage.md] [introduction/faq.md]

---

## 4. Git & source-of-truth

**Model**

- Git sync has two layers on every provider: a **workspace connection** (authorizes Lovable to a Git account/org/group/instance; reusable by every project in the workspace; a workspace can hold GitHub + GitLab + Bitbucket connections simultaneously) and a **project repository link** (one project ↔ one repository). [integrations/git-sync-overview.md]
- Sync is two-way: Lovable commits its edits and pushes them; commits pushed to the **synced branch** come back into Lovable. [integrations/git-sync-overview.md]
- Export only: "You can't import an existing repository into Lovable. When you connect a project, Lovable always creates a new repository." Importing instead goes through **Upload code** with a ZIP. [integrations/git-sync-overview.md] [integrations/github.md]
- Repositories created by Lovable are **private by default** on every plan. [integrations/github.md] [integrations/gitlab.md] [integrations/bitbucket.md]
- One repository per project, one branch at a time; default synced branch is the repository default branch (usually `main`); branches can be switched and created from Lovable's branch picker, and a new branch forks from the **currently active** branch. Branch operations are blocked while Lovable is editing. [integrations/git-sync-overview.md] [integrations/github.md]
- Sync status card states: **In sync with …**, **Lovable is N commits ahead**, **… is N commits ahead of Lovable**, **Lovable and … have diverged**, **Couldn't check … right now** / **Sync state couldn't be determined**. Comparison covers the **50 most recent commits** per side (counts can read `50+`); **Re-check** re-compares only, never syncs. [integrations/git-sync-overview.md]
- Divergence or a rejected push (protected branch, conflict) sends Lovable's work to a **`lovable-sync`** branch instead; further rejections reuse it, and if the user has commits there Lovable pushes `lovable-sync-<timestamp>`. [integrations/github.md]
- If the synced branch is deleted on the provider, Lovable switches the project to a **`lovable-fallback`** branch. [integrations/github.md]
- A provider push that replaces Lovable commits first triggers a backup of Lovable's branch copy plus the in-editor notice **A repository push replaced your Lovable work**; only the project owner can **Restore Lovable work** or **Keep repository version**, the notice lasts **24 h**, afterwards `Project settings → Git → Check for saved Lovable work`. Force-push/rebase/squash of the synced branch is discouraged; the docs say to revert with a new commit instead. [integrations/git-sync-overview.md]
- Push size limit **100 MB** per file (GitHub rejects larger); Lovable's own edit limit is **10 MB**. [integrations/github.md]
- Sync does not publish: "it never publishes. Your live site only changes when you publish from Lovable." [integrations/git-sync-overview.md]
- Backend artifacts in the repo: Edge Functions under `supabase/functions/`, migrations under `drizzle/migrations/` and `supabase/migrations/` — but "Lovable does not deploy a changed Edge Function or run a new migration file when your commits sync." [integrations/git-sync-overview.md]
- A clone gives code, not services: `.env` points at the real backend, so local writes hit production data; a branch does not give a separate database. [integrations/git-sync-overview.md]
- Working locally uses no credits for edits/commits, but app calls to Cloud/AI gateway bill as Cloud and AI usage. [integrations/git-sync-overview.md]
- Drafts never appear as branches; their code reaches the repo only when the draft is accepted. [integrations/git-sync-overview.md]

**Providers**

| Aspect | GitHub | GitLab | Bitbucket |
| :- | :- | :- | :- |
| Hosts | github.com (all plans), GitHub Enterprise Cloud with data residency (`*.ghe.com`), GitHub Enterprise Server (both Enterprise) [integrations/github.md] | GitLab.com, self-managed GitLab (all plans) [integrations/gitlab.md] | Bitbucket Cloud only; Data Center/Server unsupported [integrations/bitbucket.md] |
| Auth | Lovable GitHub App (own copy of the app on GHES) [integrations/github.md] | OAuth, scope `api`; redirect e.g. `https://lovable.dev/gitlab/callback`, confidential app [integrations/gitlab.md] | Atlassian OAuth, workspace-level webhook `Lovable GitSync`, requires workspace admin [integrations/bitbucket.md] |
| Renames | Repository/account renames followed automatically [integrations/github.md] | Rename or move breaks sync [integrations/gitlab.md] | Repository and workspace renames followed via internal IDs [integrations/bitbucket.md] |

- Lovable GitHub App permissions: Contents (write), Metadata (read), Pull requests (write), Workflows (write), Administration (write); subscribed events: `push`, `pull_request`, `repository`, `delete`. [integrations/github.md]
- GHES installs require the customer to create their own copy of the Lovable GitHub app; the private key is transferred and stored encrypted by Lovable, and deleting the connection schedules destruction of the signing key. [integrations/github.md]
- Enterprise/data-residency and self-managed connections require allowlisting Lovable's published IP ranges at the Git host. [integrations/github.md] [integrations/gitlab.md]
- Commit attribution: Lovable commits are authored by `lovable-dev[bot]` (github.com, GHEC) or `<your-app-name>[bot]` (GHES); raw `git log` shows the earlier identity `gpt-engineer-app[bot]`. Commits are co-attributed to the triggering member on GitHub only; GitLab/Bitbucket get no `Co-authored-by`. Optional workspace setting **Include member email addresses in commits** (Business/Enterprise, off by default) adds a body line `X-Lovable-Author-Email: member@example.com`. [integrations/github.md] [integrations/gitlab.md] [integrations/bitbucket.md] [integrations/git-sync-overview.md]

**Disconnect / reconnect semantics**

- Disconnecting stops sync and nothing else: the provider repository stays intact with full history, the project and code stay in Lovable, and later changes stay in Lovable only. [integrations/git-sync-overview.md]
- Reconnecting creates a **new repository** with the current project; the original is left unlinked. Re-link to the same repository is not supported on any provider. [integrations/git-sync-overview.md] [integrations/gitlab.md]
- Deleting a workspace connection removes it for all projects, stops sync, deletes stored credentials (and for GHES schedules signing-key destruction) but keeps the repositories; it cannot be restored. [integrations/github.md] [integrations/gitlab.md] [integrations/bitbucket.md]
- Transferring a project to another workspace breaks its Git connection; the repository stays but is unlinked. [integrations/github.md]
- Project access and repository access are separate: pushing needs write access at the provider, building in Lovable needs an editor role. [integrations/git-sync-overview.md]

**ZIP export**

- **Download codebase** produces a `.zip` snapshot; paid plans only; entry points are the bottom of the code editor's file tree and `Project settings → Git`. Enterprise admins can restrict downloads to admins/owners. [tips-tricks/deployment-hosting-ownership.md] [tips-tricks/external-deployment-hosting.md]
- Neither Git sync nor the ZIP includes database records or stored files; migrations are included. [tips-tricks/deployment-hosting-ownership.md]

---

## 5. Security model

**Documented structural separation**

- "**Frontend** runs in the user's browser… **Backend code** runs server-side… **Database** uses PostgreSQL with row-level security (RLS)". Frontend code must never make security decisions; RLS applies to user-scoped requests, while server-side code using the service role **bypasses RLS** and must check permissions itself. [tips-tricks/security-best-practices.md]
- Lovable sets up basic RLS policies automatically and the docs tell users to review them before real data exists. [tips-tricks/security-best-practices.md]
- The trust page is served at `/.well-known/trust.html` on the app's own domain. [features/security.md]

**Secret handling**

- Secrets are encrypted at rest, value-write-only, injected only into Edge Functions at runtime, never into the browser. [features/secrets.md]
- Connector credentials live in Lovable's secret store, outside the project: "After a credential is saved, no one can read it back directly: not workspace members, not workspace admins, and not Lovable." [integrations/security.md]
- Each project gets `LOVABLE_API_KEY` (identifies project + workspace) and an opaque **connection key** that stands in for the connection's secrets; provider tokens never enter the project. [integrations/security.md]
- `LOVABLE_API_KEY` rotation is available per project; a rotated key may stay valid up to **one hour** due to caching. Deleting a connection deletes its secrets immediately; unused/expired connections are never auto-deleted. [integrations/security.md]
- Git sync never carries secrets; server-side code that reads them needs the values re-supplied at the destination. [integrations/git-sync-overview.md]

**Connector gateway (the outbound integration path)**

- Requests flow: app → **Lovable's connector gateway** → third-party service with stored credentials → response returned to the app; access mirrors the connected account's own permissions. [integrations/security.md]
- Gateway capabilities: automatic OAuth + token refresh, credentials invisible to the project, and a per-project usage limit of **1,000 requests per minute per connector per project** by default (some connectors lower). [integrations/security.md]
- Stable egress to allowlist: IPv4 `185.41.150.0/25`, IPv6 `2a07:8241:fca::/48` — the same addresses the Lovable API connector calls the API from. [integrations/security.md]
- Custom MCP servers do **not** use the gateway by default; the Enterprise per-connection option **Lovable static IPs** routes them through `185.41.150.0/28`, `185.41.150.16/28`, `2a07:8241:fca:1000::/56`, which the docs explicitly label shared egress, not authentication. [integrations/custom-mcp.md]
- Gateway rate limiting surfaces as `429` with `Retry-After`. [integrations/neon.md]
- Domain restrictions (referrer allowlists) for browser-embedded provider keys must include `*.lovable.app/*`, `*.lovable.dev/*`, `*.lovableproject.com/*` and the production domain. [integrations/security.md]

**Automated scanning**

- **Quick scan**: fixed checks, seconds, runs automatically on every publish — **Database review** (tables without RLS, access rules letting everyone through, leaked-password protection off), **Dependency audit** (known npm vulnerabilities), **MCP server check** (app exposes an MCP server without auth). [features/security.md]
- **Deep scan**: reviews all application code, includes the quick checks, and reports across seven areas: access control & authorization, unauthenticated & abusable endpoints, unsafe input & injection, leaked secrets & credentials, payments & billing, authentication & account security, exposed personal & sensitive data. Findings are **Critical** / **Warning** / **Info**. [features/security.md]
- Deep scan does not run automatically, except that publishing starts a background deep scan when the app's MCP integration allows access without sign-in. [features/security.md]
- Only **critical** dependency findings become findings; suppression applies when Lovable confirmed no impact or EPSS is low; the supply-chain view shows the fixed version. [features/security.md]
- Third-party scanners can be connected: **Wiz** (SCA + SAST, no Lovable credits) and **Aikido** (agentic/dynamic pentest, SOC 2 / ISO 27001 report, billed by Aikido); recommended order is scanners → fix → pentest. [features/security.md]
- **Block publishing with critical issues** exists in `Workspace settings → Security → Privacy & security` and is on by default for new Enterprise workspaces; the MCP `deploy_project` enforces it with HTTP `400` type `security_critical_findings` plus `finding_refs`. [features/security.md] [integrations/lovable-mcp-server.md]
- **Auto-fix security issues** can feed a few latest critical quick-scan findings into the build context; 10 free fixes per 24 h shared with build-error **Try to fix**. [features/security.md]
- **Sensitive data scanning** (Enterprise) runs on **Google Cloud DLP** for every scan, with an optional LLM pass over message text only to cut false positives; scans are read-only. Covers chat messages, file uploads (text/office/PDF/images), chat history, Cloud database rows and Cloud storage objects, with sampling limits (10 buckets, 20 files per bucket, ~450 KB text / 3.9 MB image, ~200 DB rows, ≤10 findings per file). **Chat send protection** modes: Off, **Log only**, **Ask before sending**, **Block original**; redaction placeholder `[REDACTED:TYPE]`. [features/sensitive-data-scanning.md]
- Security center (Business/Enterprise) aggregates: security insights, code analysis, supply-chain, secrets overview (names only, never values), and Enterprise **Security automation** (one schedule per workspace, weekly/monthly, **1 credit per project per run**). [features/security-center.md]

**Enterprise controls**

- **Workspace policies** can block or require approval for publishing: unresolved sensitive-data findings, external collaborators, public publishing, and apps using connectors. Approvals expire after 30 days (14 days default and 1 h–30 days configurable for the external-publishing policy), cannot be self-approved, and any admin/owner can decide. [features/workspace-policies.md]
- **Action center** (Business/Enterprise) queues approval requests plus findings for missing owners, critical security findings on public apps, run-credit spikes (≥3× the prior 28-day daily rate and ≥50 credits in 7 days), and abandoned public apps (60-day default abandonment period). Workspace-wide check runs once a day at **10:00 UTC**. [features/action-center.md]
- **Audit logs** (Enterprise, admins/owners): default view All actions / All actors / **Last 90 days**, retained **13 weeks (~90 days)**, exportable as `audit_logs.jsonl.zip` (exports kept 7 days, themselves audited); API-driven events carry an `api_key_id`; SIEM delivery via data exports to Splunk, Azure Log Analytics, S3, GCS, Azure Blob. [features/audit-logs.md]
- **Project monitoring** (beta; Pro/Business/Enterprise) reviews app code plus recent visitor errors (sign-in errors, failing payments, lost inputs, broken UI, failing cron jobs, broken integrations), defaults to daily 06:00 local, findings emailed to the project owner and shown above the chat. [features/project-monitoring.md]
- Compliance posture stated: **SOC 2 Type II**, **ISO 27001:2022**, **AIUC-1**; explicitly **not** HIPAA-compliant and no BAAs; ToS disallow PHI, card data, financial account numbers, government identifiers, biometric data. [introduction/faq.md] [tips-tricks/deployment-hosting-ownership.md]
- Model training: from **Sept 9, 2026**, Free/Pro workspace content may be used for training unless opted out (`Account settings → Preferences → AI model training`); Business/Enterprise excluded by default; end-user app data never used. [introduction/faq.md]

**Sandboxing / isolation — what is and is not stated**

- Documented isolation claims are limited to: a per-project isolated database, the preview living in the editor, published apps hosted on Lovable's servers, and "built-in authentication and data isolation". [features/cloud.md] [tips-tricks/deployment-hosting-ownership.md]
- No page in this read set describes the execution sandbox that runs generated code, its kernel/container boundary, network egress rules for preview builds, or whether preview and production share an origin cluster: `UNKNOWN`.

---

## 6. Programmatic surface

**Lovable API (REST)**

- "The **Lovable API** is a REST API that lets you deploy Lovable projects, manage your workspace, monitor security, and embed projects." [integrations/lovable-api.md]
- `/v1` is described as "versioned and stable" with a deprecation policy that keeps deprecated endpoints alive for a migration period and announces a sunset date. [integrations/lovable-api.md]
- Resource areas: **Projects** (list/get/update settings/delete), **Deployments** (publish, unpublish, deploy status, publish settings), **Embed** (one-hour embed URL for a built preview on a specified HTTPS origin), **Workspace** (list workspaces, read settings, list members and groups), **Analytics** (project- and workspace-level), **Security** (poll scans per project, workspace security insights, PII labels). [integrations/lovable-api.md]
- Plan gating: everything on Business and Enterprise; **PII labels** (also requires Sensitive data scanning) and the per-project security inventory are Enterprise-only. [integrations/lovable-api.md]
- Auth is by workspace API key, created by an owner or admin: `Workspace settings → API keys & OAuth → Workspace access tokens`. Keys are restricted to one workspace and require Business or Enterprise. [integrations/lovable-api.md] [introduction/faq.md]
- Pricing: "There is no separate API pricing"; current endpoints, including deployment builds, do not consume AI build credits. [integrations/lovable-api.md]
- OAuth clients (`Workspace settings → API keys & OAuth → OAuth clients`): owners/admins on **all** plans register non-sensitive scopes; sensitive project/workspace scopes need Business/Enterprise; sensitive-scope clients show an unverified-app warning until Lovable verifies them. [integrations/lovable-api.md]
- Base URL, rate limits, pagination and the endpoint reference are deliberately delegated to a separate page (`/api-reference/introduction`) — not stated here: `UNKNOWN`. A first-party Postman collection exists. [integrations/lovable-api.md]
- Other programmatic entries: **Lovable API connector** (an app built in Lovable calls the API with a Lovable-stored key) and **Build with URL** (prompt encoded in a link, no key). [integrations/lovable-api.md]

**Lovable MCP server**

- Endpoint: `https://mcp.lovable.dev`, an **MCP** server that lets an external AI client drive Lovable; available on **all plans**. [integrations/lovable-mcp-server.md]
- Auth: **OAuth only** — "API key authentication is not currently available." Local clients (`localhost`/`127.0.0.1`) self-register without approval; hosted clients need Lovable to approve their callback; custom OAuth clients can be registered with ID + secret; sensitive MCP scopes need Business/Enterprise. [integrations/lovable-mcp-server.md]
- Enterprise gate: **Third-party MCP clients** is enabled by default on Free/Pro/Business but **disabled by default on Enterprise** (`Workspace settings → Security → Privacy & security`). [integrations/lovable-mcp-server.md]
- Tools documented (grouped): identity/workspaces `get_me`, `list_workspaces`, `get_workspace`; projects `list_projects`, `get_project`, `create_project`, `deploy_project`, `remix_project`, `set_project_visibility`, `set_folder_visibility`, `move_projects_to_folder` (≤30 projects), `list_template_projects`, `list_design_systems`; agent `send_message` (supports `plan_mode`, `files`, `wait=false`), `get_message`, `list_messages`; knowledge/skills get/set workspace and project knowledge, list/get/create/update/delete workspace skills; code inspection `get_diff`, `list_files`, `read_file`, `list_edits`; database `get_database_status`, `enable_database` (30–60 s), `query_database`; connectors `list_connectors`, `list_connections`, `list_custom_connectors`, `list_available_connectors`, `add_connector` (returns a dashboard URL — connectors are never added programmatically), `remove_connector`; analytics `get_project_analytics` (RFC 3339 `start_date`/`end_date`), `get_project_analytics_trend`; uploads `get_file_upload_url` (presigned). [integrations/lovable-mcp-server.md]
- Client-specific tools: `render_project_widget` (MCP Apps clients such as ChatGPT) and `import-claude-design-from-url` (Claude clients). [integrations/lovable-mcp-server.md]
- Safety-relevant behaviour: calls run live with the user's permissions and real credits; `query_database` "runs SQL with your full database permissions. Read, write, and schema changes"; `deploy_project` returns a live URL whose audience follows plan/workspace defaults. [integrations/lovable-mcp-server.md]
- Credits: standard credits apply to `create_project` and `send_message`; other tools are free. [integrations/lovable-mcp-server.md]
- Error contracts: `400` `security_critical_findings` with `finding_refs` on blocked deploys; `401` `WWW-Authenticate: Bearer error="invalid_token"` when an SSO session expires (24 h / 48 h / 7 days); `WAITING` response listing candidate workspaces when `workspace_id` is omitted and ambiguous. [integrations/lovable-mcp-server.md]
- Machine-readable tool reference shipped at `mcp.lovable.dev/skill.md`; the skill, Claude Code plugin and client guides are open source at `lovablelabs/mcp`. [integrations/lovable-mcp-server.md]

**Identifiers**

- `workspace_id` and `project_id` are the addressing primitives; `list_workspaces` / `list_projects` are the documented discovery calls. [integrations/lovable-mcp-server.md]
- Audit log actor popovers expose `Email`, `User ID`, `Client`, `IP Address`, `User Agent`; API-initiated events add `api_key_id`. [features/audit-logs.md]

---

## 7. Explicit unknowns (documented silence)

These are deliberately marked as not documented in this page set; a later report must not present them as findings.

- **Sandbox/runtime technology** for generated code execution (containers, gVisor, Firecracker, microVMs, per-build isolation, egress policy): `UNKNOWN`.
- **Build pipeline internals**: how a build is triggered, cached, queued, concurrency limits, build image contents beyond "Node 22" and Bun lockfiles: `UNKNOWN`.
- **Preview environment hosting**: whether previews run on the same cluster/CDN as published apps, preview URL hostnames, preview lifetimes: `UNKNOWN` (only that shared preview links expire in 7 days by default).
- **CDN / edge vendor and PoP topology**: docs say only "delivered from locations around the world"; the only vendor named in the hosting path is **Entri** for automated DNS. `UNKNOWN`.
- **Origin cloud provider** for hosting, storage and databases: only the anycast-ish address `185.158.133.1` and region labels such as **Europe (Frankfurt)** are published. `UNKNOWN`.
- **PostgreSQL version**: surfaced in the UI ("Database location" row) but never stated in docs. `UNKNOWN`.
- **Object-storage backend technology** (S3-compatible or otherwise) and its consistency/versioning semantics: `UNKNOWN`.
- **Model vendors and model identities** for the build agent: docs say only "current leading AI models" and that users cannot choose. Vendor hints appear solely through the EU-inference page (Vertex AI, AWS Bedrock, Azure AI Foundry) and the agent tool vendors (Exa for web search, Firecrawl for fetch, Browserbase for browser automation). `UNKNOWN` for the rest.
- **Agent architecture**: planning/subagent decomposition, context assembly, retrieval over the repo, tool set of the builder: `UNKNOWN` (only that a "subagent" research cost exists in Plan mode pricing).
- **REST API rate limits, quotas and base URL**: deferred to `/api-reference/introduction`; not covered here. `UNKNOWN`.
- **Database migration execution internals** (who runs migrations, transactionality, rollback on failure): only that Lovable records changes as migration files and refuses destructive DDL. `UNKNOWN`.
- **Edge Function runtime version and limits** (Deno version, memory, timeout, cold-start behaviour, max bundle size): only "run on Lovable's servers" and auto-scaling. `UNKNOWN`.
- **Auth email/SMS delivery vendors**: "a generic Lovable sender"; SMS goes "through your own SMS provider". `UNKNOWN`.
- **Encryption specifics** (KMS, key custody, at-rest algorithms, field-level encryption): docs say only "encrypted". `UNKNOWN`.
- **SLA, uptime targets, multi-region failover, RPO/RTO**: `UNKNOWN`.
- **Lovable's own hosting region / data location** for workspace metadata, chat history and builds — distinct from the Cloud database region and EU inference: `UNKNOWN`.
- **Node/Bun version pinning** inside Lovable's build (22 is the recommended external version) and whether the internal builder matches: `UNKNOWN`.
- **Tailwind / shadcn / component library** as part of the generated template: not asserted anywhere in this read set. `UNKNOWN`.
- **Bitbucket Data Center / Server support**: explicitly *not* supported (documented negative, not an unknown). [integrations/bitbucket.md]

---

## Appendix — quick reference of literal values found in the docs

| Value | Meaning | Source |
| :- | :- | :- |
| `185.158.133.1` | `A` record target for custom domains | [features/custom-domain.md] |
| `lovable_verify=…` at `_lovable` / `_lovable.<sub>` | domain ownership `TXT` | [features/custom-domain.md] |
| `185.41.150.0/25`, `2a07:8241:fca::/48` | connector-gateway egress | [integrations/security.md] |
| `185.41.150.0/28`, `185.41.150.16/28`, `2a07:8241:fca:1000::/56` | **Lovable static IPs** for custom MCP | [integrations/custom-mcp.md] |
| `1,000` req/min/connector/project | gateway limit | [integrations/security.md] |
| `1,000` server req / 10 s / project | Free + TanStack Start hosting limit | [features/hosting.md] |
| `2 GB` (max `5 GB`) | storage upload limit | [features/storage.md] |
| `15 GB` DB / `5 GB` export / 24 h cadence | export limits | [features/database-backups.md] |
| `14 days` | backup retention | [features/database-backups.md] |
| `90 days` (13 weeks) | audit log retention | [features/audit-logs.md] |
| `100 MB` push / `10 MB` Lovable edit | file size ceilings | [integrations/github.md] |
| `3000` + `.output/server/index.mjs` | TanStack Start node-server output | [tips-tricks/external-deployment-hosting.md] |
| `lovable-sync`, `lovable-fallback` | conflict / deleted-branch branches | [integrations/github.md] |
| `lovable-dev[bot]`, `gpt-engineer-app[bot]` | commit identities | [integrations/github.md] |
| `X-Lovable-Author-Email` | commit trailer (opt-in) | [integrations/git-sync-overview.md] |
| `[REDACTED:TYPE]` | PII redaction placeholder | [features/sensitive-data-scanning.md] |
| `unsupported_extension`, `security_critical_findings`, `provider_not_available_in_region` | documented error types | [features/database.md] [integrations/lovable-mcp-server.md] [features/eu-inference.md] |
