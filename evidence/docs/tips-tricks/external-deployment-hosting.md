# Deploying and hosting outside Lovable
<!-- source: https://docs.lovable.dev/tips-tricks/external-deployment-hosting.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploying and hosting outside Lovable

> How to take your code out of Lovable, deploy your app to your own hosting, verify it, migrate the built-in backend to your own Supabase project, and complete a move away from Lovable, with examples for managed platforms and your own infrastructure.

This guide gives practical steps for running a Lovable app outside Lovable's own hosting and built-in backend. It builds on [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md) and [Deployment, hosting, and ownership options with Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership), which explain what you own and what changes when you move. You can adopt any scenario here on its own and in any order.

In this guide, **hosting** refers to where your application runs, while **deployment** refers to how your code is built and delivered to that environment.

## Before you migrate

Lovable runs the whole app for you: hosting with custom domains and HTTPS, deployments and preview environments, the built-in backend with authentication, a database, and file storage, and AI and connector access at runtime. Most teams keep that setup and never need this guide.

Move part of your app outside Lovable when you have a requirement that this setup does not cover: a deployment pipeline of your own, a compliance or data residency rule that specifies where the app must run, or an organizational policy on hosting. Each part you move becomes yours to run, update, and secure. Each section below lists what that includes for its part of the app. Pick the path that matches your situation:

| Situation | Go to |
| - | - |
| You deploy the frontend through your own pipeline or host, and the app keeps using the built-in backend | [Get your source code](#get-your-source-code), then [Deploy a TanStack Start app](#deploy-a-tanstack-start-app) or [Deploy an older React + Vite app](#deploy-an-older-react-vite-app), depending on your stack |
| You need the database and backend services under your own account or on your own infrastructure | [Host backend and data on a managed provider](#host-backend-and-data-on-a-managed-provider-supabase-example) or [on your own infrastructure](#host-backend-and-data-on-your-own-infrastructure-supabase-example) |
| You are leaving Lovable entirely | The sections above in order, then [Complete a move away from Lovable](#complete-a-move-away-from-lovable) |

Whichever path you take, [verify the deployment before switching traffic](#verify-before-switching-traffic).

## Check how your project is built

Lovable builds apps on one of two stacks, and each needs different hosting:

| Project type | What you deploy | What the host needs |
| - | - | - |
| **TanStack Start apps** (created from May 13, 2026) | The server output and static assets for the deployment target you build for | A host that runs the server part: server-side rendering, server functions, and API routes. A host that receives only the static files does not run those features |
| **Older React + Vite apps** | The static build output in `dist/` | A static file host, a content delivery network (CDN), or a web server such as Nginx, with a fallback to `index.html` for client-side routes |

To tell which stack your project uses, open `package.json` in the **Code** tab. A TanStack Start project lists `@tanstack/react-start` under its dependencies. An older React + Vite project does not. You can also ask Lovable in the project chat:

```text wrap theme={null}
Which stack does this project use, older React + Vite or TanStack Start?
```

The frontend sections below are split by stack: [Deploy a TanStack Start app](#deploy-a-tanstack-start-app) and [Deploy an older React + Vite app](#deploy-an-older-react-vite-app). Read the one for your project and skip the other.

The backend migration sections apply to projects that use the built-in backend or a connected Supabase project.

Before you deploy anywhere, run the app on your own computer from a clone of the repository. A working local run confirms what the app needs installed, its dependencies, and the environment variables it reads, before a host adds its own settings. See [Work locally in your IDE](https://docs.lovable.dev/integrations/git-sync-overview#work-locally-in-your-ide).

## Get your source code

Every scenario in this guide starts from a copy of your project's code outside Lovable. You have two ways to get one:

* **[Git sync](https://docs.lovable.dev/integrations/git-sync-overview)**, available on all plans. Connect the project to a repository on GitHub, GitLab, or Bitbucket, and Lovable keeps the two in sync both ways. Use this for any ongoing deployment: hosting platforms deploy from the repository, and Lovable continues to manage development and previews. The examples on this page use GitHub. The same steps apply to a GitLab or Bitbucket repository on platforms that deploy from those providers.
* **Download codebase**, available on paid plans, for a one-time snapshot as a `.zip` file. Open the code editor and click **Download codebase** at the bottom of the file panel, or use the **Download codebase** section in **Project settings → Git**. On Enterprise workspaces, admins can [limit downloads](https://docs.lovable.dev/features/privacy-and-security-settings.md#code-downloads) to workspace admins and owners. See [Download your project's codebase](https://docs.lovable.dev/features/code-mode.md#download-your-project’s-codebase).

Both paths give you the application source, including the configuration files and the database migration files stored in the project. Neither includes the records in your database or the files in storage. Those move separately, as described under [What migrates and how](#what-migrates-and-how).

> [!NOTE]
>
> The npm examples assume your repository includes `package-lock.json`. If it only has `bun.lock`, use Bun for installation or run `npm install` locally and commit the generated `package-lock.json` before using `npm ci` in CI or Docker. Keep the install command and lockfile consistent on your host.

The Docker and virtual machine examples on this page work from an extracted download as well as from a clone. Platforms that build from a repository need the code in a repository you control, which Git sync gives you. From here on, this guide assumes your project is connected to a repository.

## Deploy a TanStack Start app

TanStack Start apps run server code, so the host has to run a server, not only serve files. For an older React + Vite app, see [Deploy an older React + Vite app](#deploy-an-older-react-vite-app). Your project's build configuration, the `@lovable.dev/vite-tanstack-config` package in `package.json`, prepares the server output for the host through **Nitro**, a build tool that adapts a server app to the platform it runs on.

Nitro calls each platform a **preset** and has presets for most cloud platforms and server runtimes, which is what makes a TanStack Start app portable: you can deploy the same code to any of them. Inside Lovable the preset is fixed. Outside Lovable, the build picks the preset for the platform it detects, or the one you name. [Nitro's deployment guide](https://nitro.build/deploy) lists every supported platform.

When the frontend runs outside Lovable, you take on its deployment pipeline, environment variables, availability, logs, and preview environments, and Lovable cannot monitor or debug infrastructure it does not control.

Check that `package.json` lists `nitro`. Without it, the build does not package the app for a hosting platform. Setting the `nitro` option in `vite.config.ts` without installing the package produces an error asking you to add it.

> [!NOTE]
>
> Older build configurations can skip Nitro outside Lovable or write a different output directory, even when Nitro is installed. Update an older project's build configuration before following these examples, and verify both the Lovable preview and the generated server entry point.

### Deploy from your repository to a platform Nitro detects

On the platforms Nitro detects automatically, including Vercel, Netlify, and Cloudflare Pages, a build from your repository picks the matching preset with no configuration. [Nitro's deployment guide](https://nitro.build/deploy) lists all of them.

**1. Connect your repository**

Connect the repository to the platform and select the branch you deploy production from. That can be the branch Lovable syncs, or a release branch you merge into after review.

**2. Configure the build**

Set the build command to `npm run build` and use Node.js 22. On Netlify and Cloudflare Pages, set the publish or build output directory to `dist`. Vercel needs no output directory setting.

**3. Configure environment variables**

Set the variables your app reads. A project that uses the built-in backend needs both sets of values from the repository's `.env` file: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the browser, and `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` for the server. Add the secrets your server functions read as well. Those are not in the repository.

**4. Update sign-in redirect URLs**

Add the new URL to your authentication provider's allowed redirect URLs.

**5. Deploy**

Each push to that branch triggers a new deployment. Run the checks under [Verify before switching traffic](#verify-before-switching-traffic), including a server-rendered page and a server function.

### Object storage and CDN hosting

A TanStack Start app does not run from object storage or a CDN alone, because those serve files and do not run the server part. Use a platform Nitro detects, a container, or your own server instead.

### Deploy to a container or your own server

For a host the build does not detect, build with Nitro's Node.js server preset and run the result with Node.js.

**1. Build with the Node.js server preset**

Name the preset when you build, either as an environment variable or by adding the `nitro` option to the `defineConfig` call your project already has in `vite.config.ts`. Keep any other options that call already passes:

```bash theme={null}
NITRO_PRESET=node-server npm run build
```

```ts theme={null}
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({ nitro: { preset: "node-server" } });
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` before the build, since browser values are embedded at build time.

**2. Run the server**

The build writes a standalone `.output` directory. Start it with Node.js 22:

```bash theme={null}
node .output/server/index.mjs
```

The server listens on port `3000`. Set `PORT` and `HOST` to change that. Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and the secrets your server functions read as environment variables where the server runs.

**3. Put it behind your web server**

Configure your reverse proxy or load balancer to forward requests to the server's port, `3000` unless you changed it, and handle HTTPS there. The [VM example](#vm-or-static-server-deployment) further down this page shows a certificate setup with Certbot. Do not use the Nginx `try_files` fallback from the older React + Vite examples: the server handles routing.

For a container, follow the same two steps in a Dockerfile: a build stage that runs `npm ci` and the build with the preset, and a Node.js 22 stage that copies `.output` and runs `node .output/server/index.mjs` on port `3000`. For other runtimes and platforms, such as Deno or Bun, pick the matching preset from [Nitro's deployment guide](https://nitro.build/deploy), and see TanStack Start's [hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for the framework side.

## Deploy an older React + Vite app

This section is for older React + Vite apps. They build to static files, so any static host can serve them. For a TanStack Start app, see [Deploy a TanStack Start app](#deploy-a-tanstack-start-app).

### Host on a managed platform

The frontend is usually the first part to move outside Lovable.

You deploy the production frontend to a managed hosting platform while continuing to use Lovable for development and previews. Your backend and data can remain on the built-in backend or run elsewhere.

#### What you’re responsible for

When the production frontend runs outside Lovable, you are responsible for:

* Frontend deployment pipelines and rollbacks
* Production environment variables
* CDN behavior and caching
* Frontend availability and uptime
* Production logs and deployment history
* Preview environments for production branches or releases

Lovable cannot monitor or debug production infrastructure it does not control.

#### Common approaches

* **Git-based hosting platforms**\
  These platforms connect directly to your GitHub repository and automatically build and deploy on each push:
  * Netlify
  * Cloudflare Pages
  * Vercel
  * AWS Amplify Hosting
  * Azure Static Web Apps
  * Google Firebase Hosting
* **Object storage + CDN hosting**\
  These platforms host static files behind a CDN but require a build pipeline to generate and upload the `dist/` output.
  * **AWS:** S3 + CloudFront
  * **Google Cloud:** Cloud Storage + Cloud CDN
  * **Azure:** Azure Storage (Static Website) + Azure CDN or Front Door

#### **Deploying to a Git-based hosting platform**

This approach applies to platforms that automatically build and deploy from your GitHub repository.

> **Example: Deploying to a Git-based hosting platform**
>
> **1. Connect your repository**
>
> Connect your GitHub repository to the hosting platform.
>
> **2. Configure build settings**
>
> Most platforms auto-detect these:
>
> * **Build command**: `npm run build`
> * **Output directory**: `dist`
> * **Node version**: 22
>
> **3. Configure environment variables**
>
> Set the variables your app reads.
>
> Projects using the built-in backend need the values from your project's `.env` file:
>
> ```
> VITE_SUPABASE_URL
> VITE_SUPABASE_PUBLISHABLE_KEY
> VITE_SUPABASE_PROJECT_ID
> ```
>
> You can find these in the `.env` file in Lovable's [code editor](https://docs.lovable.dev/features/code-mode.md) or in your synced GitHub repository.
>
> **4. Configure SPA routing**
>
> If direct URL navigation returns a `404`, configure a fallback rewrite so all routes serve `/index.html`. The method varies by platform (for example, `_redirects` file on Netlify/Cloudflare, `staticwebapp.config.json` on Azure, rewrite rules on Amplify, `vercel.json` on Vercel, `firebase.json` on Firebase).
>
> **5. Update OAuth redirect URLs**
>
> If your app uses Google sign-in or other OAuth providers, add your new production domain to your authentication provider's allowed redirect URLs.
>
> **6. Deploy**
>
> Each push to the branch the platform deploys from triggers a new production deployment, following the rules you configured there.
>
> **Result:** A publicly accessible production frontend served over HTTPS, connected to your built-in backend.

#### **Deploying to object storage + CDN with CI/CD**

CDN-backed hosting requires a CI/CD pipeline to build your app and upload the `dist/` output. Build steps are identical across providers. Deployment is provider-specific, see links to official documentation for each platform.

> **Example: Deploying to object storage + CDN with CI/CD**
>
> For authentication, all major cloud providers support **OpenID Connect (OIDC)** with GitHub Actions, which eliminates the need to store long-lived credentials as secrets. This is the recommended approach.
>
> * [AWS: Use IAM roles with OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
> * [Google Cloud: Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines)
> * [Azure: Federated identity credentials](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation)
>
> **1. Add GitHub secrets**
>
> Add the required secrets in your GitHub repository settings (**Settings → Secrets and variables → Actions**).
>
> | Secret | Value |
> | - | - |
> | `VITE_SUPABASE_URL` | Your Supabase project URL (from your project's `.env` file) |
> | `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key (from your project's `.env` file) |
>
> **2. Create the workflow file**
>
> For example, create `.github/workflows/deploy.yml` in your repository:
>
> ```yaml theme={null}
> name: Build and Deploy
>
> on:
>   push:
>     branches: [main]
>
> jobs:
>   build-and-deploy:
>     runs-on: ubuntu-latest
>
>     steps:
>       - name: Checkout repository
>         uses: actions/checkout@v4
>
>       - name: Set up Node.js
>         uses: actions/setup-node@v4
>         with:
>           node-version: '22'
>           cache: 'npm'
>
>       - name: Install dependencies
>         run: npm ci
>
>       - name: Build application
>         run: npm run build
>         env:
>           VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
>           VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
>
>       # Deploy step is provider-specific. See documentation links below.
>       # The build output is in the dist/ directory.
> ```
>
> **3. Add provider-specific deployment steps**
>
> After the build step, add deployment steps for your platform. Refer to official documentation for current best practices:
>
> | Platform | Documentation |
> | - | - |
> | AWS S3 + CloudFront | [Deploying to Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html), [GitHub Actions for AWS](https://github.com/aws-actions) |
> | Google Cloud Storage | [Hosting a static website](https://cloud.google.com/storage/docs/hosting-static-website), [GitHub Actions for Google Cloud](https://github.com/google-github-actions) |
> | Azure Blob Storage | [Static website hosting in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website), [GitHub Actions for Azure](https://github.com/Azure/actions) |
>
> **4. Configure SPA routing**
>
> All CDN-backed hosting requires configuration to return `index.html` with a **200** status code for routes that don't match a file. This is typically configured as:
>
> * A **custom error response returning 200** (CloudFront)
>
> * A **URL rewrite rule on a load balancer** (Cloud CDN)
>
> * A **URL rewrite rule** (Front Door)
>
> > [!WARNING]
> >
> > Do not rely on storage-level error page settings, as they return 404 status codes.

### Host on your own infrastructure

Use this approach when you need full control over frontend hosting, networking, or runtime environment. This is sometimes referred to as **self-hosting**.

The frontend is built from your GitHub repository and deployed to infrastructure you manage. The backend and data can remain on the built-in backend or run elsewhere.

#### What you're responsible for

When the production frontend runs on infrastructure you manage, you are responsible for:

* Build and deployment automation
* SSL/TLS configuration
* CDN and reverse proxy configuration
* Monitoring, logging, and uptime
* Infrastructure updates and security
* Preview environments for branches or releases

Lovable cannot monitor or debug production infrastructure it does not control.

#### Common approaches

* **Container-based deployments**\
  For example: Docker deployed via Kubernetes (EKS, GKE, AKS), ECS, Nomad, or internal container platforms
* **Virtual machines behind a web server**\
  For example: Linux VMs running Nginx or Apache, managed through configuration management or internal tooling
* **Internal PaaS platforms**\
  For example: company-internal deployment platforms or private cloud PaaS solutions

#### Build requirements

* **Build command:** `npm run build`
* **Output directory:** `dist/`
* **Node version:** 22 recommended

Environment variables prefixed with `VITE_` are embedded at **build time**, not runtime.

If using the built-in backend, you must set these before running `npm run build`:

* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_PUBLISHABLE_KEY`

You can find these values in your project's `.env` file.

#### Container-based deployment (Docker)

> [!NOTE]
>
> You can ask Lovable to generate these Docker configurations. See [Using Lovable to generate Docker deployments](#using-lovable-to-generate-docker-deployments) below.

> **Example: Manual Docker deployment**
>
> This is the most common approach for deploying to Kubernetes, ECS, Cloud Run, or any container orchestration platform. It also works for running the frontend as a standalone container on a single VM.
>
> **1. Clone your GitHub repository**
>
> ```bash theme={null}
> git clone <your-github-repo-url>
> cd <project-name>
> ```
>
> **2. Create a Dockerfile**
>
> Older React + Vite apps can be containerized using a standard multi-stage Docker build: the first stage installs dependencies and runs `npm run build`, and the second stage serves the static output with nginx.
>
> Here's an example Dockerfile you can adapt:
>
> ```dockerfile theme={null}
> # Build stage
> FROM node:22-alpine AS builder
>
> WORKDIR /app
>
> # Copy package files and install dependencies
> COPY package*.json ./
> RUN npm ci
>
> # Copy source code
> COPY . .
>
> # Environment variables are embedded at build time
> ARG VITE_SUPABASE_URL
> ARG VITE_SUPABASE_PUBLISHABLE_KEY
> ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
> ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
>
> # Build the application
> RUN npm run build
>
> # Production stage
> FROM nginx:alpine
>
> # Copy built assets to nginx
> COPY --from=builder /app/dist /usr/share/nginx/html
>
> # Copy nginx configuration for SPA routing
> COPY nginx.conf /etc/nginx/conf.d/default.conf
>
> EXPOSE 80
>
> CMD ["nginx", "-g", "daemon off;"]
> ```
>
> **3. Create an nginx configuration file**
>
> Older React + Vite apps use client-side routing (React Router with BrowserRouter), so your web server must return `index.html` for all routes. Create an `nginx.conf` file:
>
> ```nginx theme={null}
> server {
>     listen 80;
>     root /usr/share/nginx/html;
>     index index.html;
>
>     # Cache static assets
>     location /assets/ {
>     	expires 1y;
>     	add_header Cache-Control "public, immutable";
> 	}
>
>     # Handle client-side routing - required for older React + Vite apps
>     location / {
>         try_files $uri $uri/ /index.html;
>     }
> }
> ```
>
> **4. Build the container image**
>
> Set your environment variables as build arguments:
>
> ```bash theme={null}
> docker build \
>   --build-arg VITE_SUPABASE_URL=<your-url> \
>   --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=<your-key> \
>   -t my-lovable-app .
> ```
>
> **5. Push to your container registry**
>
> For example:
>
> ```bash theme={null}
> docker tag my-lovable-app your-registry/my-lovable-app:latest
> docker push your-registry/my-lovable-app:latest
> ```
>
> **6. Deploy using your orchestration platform**
>
> Deploy the container using Kubernetes, ECS, Cloud Run, Nomad, or your internal platform. No runtime environment variables are needed, they are already embedded in the build.
>
> **Result:** A running container serving your frontend over HTTP on port 80.
>
> > [!WARNING]
> >
> > Environment variables are embedded at build time. To change them, you must rebuild the container image.

> **Example: Automated Docker deployment (CI/CD)**
>
> This workflow builds a Docker image and pushes it to a container registry for deployment to Kubernetes, ECS, or other orchestration platforms. This automates the manual container-based deployment steps described above.
>
> > [!NOTE]
> >
> > You will likely need to adapt it for your security requirements, existing pipelines, and organizational policies.
>
> For authentication, major container registries support **OpenID Connect (OIDC)** with GitHub Actions, which eliminates the need to store long-lived credentials as secrets. This is the recommended approach.
>
> * [AWS ECR: Use IAM roles with OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
> * [Google Artifact Registry: Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines)
> * [Azure Container Registry: Federated identity credentials](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation)
> * [GitHub Container Registry: Use GITHUB\_TOKEN](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) (no secrets needed)
>
> **Prerequisites:**
>
> * A container registry (for example, GitHub Container Registry, AWS ECR, Google Artifact Registry, Azure Container Registry, Docker Hub)
> * The `Dockerfile` and `nginx.conf` files from the manual container-based deployment section above
> * An orchestration platform to deploy the container (for example, Kubernetes, ECS)
>
> **1. Add GitHub secrets**
>
> Add the required secrets in your GitHub repository settings (**Settings → Secrets and variables → Actions**).
>
> | Secret | Value |
> | - | - |
> | `VITE_SUPABASE_URL` | Your Supabase project URL (from your project's `.env` file) |
> | `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key (from your project's `.env` file) |
>
> **2. Create the workflow file**
>
> For example, create `.github/workflows/deploy-container.yml` in your repository:
>
> ```yaml theme={null}
> name: Build and Push Container
>
> on:
>   push:
>     branches: [main]
>
> env:
>   IMAGE_NAME: my-lovable-app
>   REGISTRY: ghcr.io/your-org  # Replace with your registry URL
>
> jobs:
>   build-and-push:
>     runs-on: ubuntu-latest
>
>     steps:
>       - name: Checkout repository
>         uses: actions/checkout@v4
>
>       - name: Set up Docker Buildx
>         uses: docker/setup-buildx-action@v3
>
>       # TODO: Add registry authentication step here.
>       # This workflow will not run until you configure authentication.
>       # See "Registry-specific authentication" table below.
>
>       - name: Build and push Docker image
>         uses: docker/build-push-action@v6
>         with:
>           context: .
>           push: true
>           tags: |
>             ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
>             ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
>           build-args: |
>             VITE_SUPABASE_URL=${{ secrets.VITE_SUPABASE_URL }}
>             VITE_SUPABASE_PUBLISHABLE_KEY=${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
>           cache-from: type=gha
>           cache-to: type=gha,mode=max
> ```
>
> **3. Configure registry authentication**
>
> Add the appropriate authentication step before **Build and push Docker image** in the workflow. Refer to official documentation for current best practices:
>
> | Registry | Documentation |
> | - | - |
> | GitHub Container Registry | [Authenticating with GITHUB\_TOKEN](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token#using-the-github_token-in-a-workflow) |
> | AWS ECR | [Amazon ECR Login Action](https://github.com/aws-actions/amazon-ecr-login) |
> | Google Artifact Registry | [Google Auth Action](https://github.com/google-github-actions/auth) |
> | Azure Container Registry | [Azure Login Action](https://github.com/Azure/login) |
> | Docker Hub | [Docker Login Action](https://github.com/docker/login-action) |

#### VM or static server deployment

> **Example: Manual VM or static server deployment**
>
> This approach is for deploying to Linux VMs, bare-metal servers, or any machine running a web server like Nginx or Apache.
>
> **1. Clone your GitHub repository**
>
> ```bash theme={null}
> git clone <your-github-repo-url>
> cd <project-name>
> ```
>
> **2. Install dependencies**
>
> ```bash theme={null}
> npm ci
> ```
>
> **3. Build the application with environment variables**
>
> Set environment variables before running the build:
>
> ```bash theme={null}
> VITE_SUPABASE_URL=<your-url> \
> VITE_SUPABASE_PUBLISHABLE_KEY=<your-key> \
> npm run build
> ```
>
> Build output is in the `dist/` directory.
>
> **4. Upload the build output to your server**
>
> For example, using `scp`:
>
> ```bash theme={null}
> scp -r dist/* user@your-server:/var/www/html/
> ```
>
> Or using `rsync`:
>
> ```bash theme={null}
> rsync -avz dist/ user@your-server:/var/www/html/
> ```
>
> **5. Configure your web server**
>
> Older React + Vite apps use client-side routing (React Router with BrowserRouter), so your web server must return `index.html` for all routes.
>
> **Example nginx configuration:**
>
> ```nginx theme={null}
> server {
>     listen 80;
>     server_name your-domain.com;
>     root /var/www/html;
>     index index.html;
>
>     # Cache static assets
>     location /assets/ {
>         expires 1y;
>         add_header Cache-Control "public, immutable";
>     }
>
>     # Handle client-side routing - required for older React + Vite apps
>     location / {
>         try_files $uri $uri/ /index.html;
>     }
> }
> ```
>
> **Example Apache configuration (.htaccess):**
>
> ```apache theme={null}
> RewriteEngine On
> RewriteBase /
> RewriteRule ^index\.html$ - [L]
> RewriteCond %{REQUEST_FILENAME} !-f
> RewriteCond %{REQUEST_FILENAME} !-d
> RewriteRule . /index.html [L]
> ```
>
> **6. Configure TLS (recommended)**
>
> Use [Certbot](https://certbot.eff.org/) to add a free Let's Encrypt certificate, or configure your existing SSL certificates.
>
> **Result:** Your app is served over HTTP(S) from your server.
>
> > [!WARNING]
> >
> > Environment variables are baked into the build output. No runtime configuration is needed on the server. To change environment variables, rebuild the application and re-upload the `dist/` output.

## Verify before switching traffic

Deploy to a temporary URL on the new host first, and check it against the app running on Lovable:

* Open a nested route directly and refresh the page. A `404` usually means the host is missing the `index.html` fallback (older React + Vite apps) or is not running the server part (TanStack Start apps).
* Sign in and sign out. A redirect error usually means the new URL is missing from your authentication provider's allowed redirect URLs.
* Run the reads, writes, and uploads your app depends on.
* For TanStack Start apps, open a server-rendered page and trigger a server function, not only the browser interface.

When the deployment works, point your custom domain at the new host by following that provider's instructions for domains and certificates. Your `lovable.app` address stays with Lovable and keeps serving the version you last published there. Lovable's **Publish** button continues to publish to Lovable hosting only. If you keep Git sync connected, each change Lovable pushes to the repository can trigger a deployment on the new host, following the branch and review rules you configured there.

## Host backend and data on a managed provider (Supabase example)

This option is typically chosen when you need direct database access, advanced database features, or clearer separation of infrastructure ownership, without taking on full operational responsibility.

You move your backend services and database to a managed backend provider. The most direct migration path is to **managed Supabase**, which closely matches the built-in backend's architecture. The production frontend can run on Lovable or elsewhere.

After migration:

* The production frontend needs to point to the new backend
* You can continue using the Lovable editor and preview environments during development

This guide uses **Supabase** as the reference migration path because Lovable applications rely on Supabase-compatible services (authentication, storage, realtime, edge functions, and row-level security).

Migration to other backend platforms is possible, but may require implementing equivalent authentication, storage, and backend services depending on your provider.

The detailed steps below describe how to migrate a project from the built-in backend to a managed Supabase instance.

### Migration sequence at a glance

Keep the app running on the built-in backend while you prepare the new backend, and point the app at it only when the destination is complete:

1. **Create the destination.** A new Supabase project. Note its URL, project ID, and publishable key.
2. **Move the structure.** Locate your project's migration files in `supabase/migrations/` or `drizzle/migrations/`, and apply them in their recorded order. Use the Supabase CLI only for the Supabase migration layout.
3. **Move the data.** Restore the database export, which includes user accounts.
4. **Configure sign-in.** Enable each provider and update the redirect URLs.
5. **Copy storage files** into the matching buckets.
6. **Set secrets and deploy server code.** Function secrets, Edge Functions, and scheduled jobs. Replace the app connector and AI calls listed in the table below.
7. **Point a test deployment at the new backend** through its environment variables, and leave the Lovable project unchanged.
8. **Verify** on that deployment.
9. **Switch.** Restore the final export, update `.env` and `supabase/config.toml` in the Lovable project, and move traffic, as described under [Complete a move away from Lovable](#complete-a-move-away-from-lovable).

The dashboard walkthrough below follows this order. The table shows what moves on its own and what needs work.

### What you’re responsible for

When your backend runs outside Lovable, you are responsible for the backend capabilities Lovable previously managed, including:

* Database availability, scaling, and backups
* Backend monitoring and incident response
* Row-level security configuration and maintenance
* Authentication provider configuration
* OAuth credentials, redirect URLs, and secret rotation
* Backend environment variables and configuration
* Security scanning for misconfigurations and exposed secrets
* Compliance posture of your backend infrastructure

Lovable cannot monitor or debug backend infrastructure it does not control. Managed OAuth configuration and automatic token refresh are only available when the backend runs on the built-in backend.

### What migrates and how

| **App components** | **Migration method** | **Notes** |
| :- | :- | :- |
| Database schema | Automatic via SQL migrations | Includes tables, columns, indexes, RLS policies, functions, triggers |
| Storage buckets | Automatic via SQL migrations | Includes access policies |
| Authentication providers | Manual | Reconfigure auth (for example, Google OAuth, GitHub) in your new hosting environment |
| Environment variables and secrets | Manual | Reconfigure any API keys, tokens, or credentials for external services (for example, Stripe) in your new hosting environment |
| Data (table contents) | Manual | Export individual tables as CSV (open the table in **More → Database** and click **Export CSV**), or request a full database export from **More → Database → Manage → Settings**, then import into your destination provider |
| Storage files | Manual | Download/upload manually |
| User accounts | Manual, partial | Included in the database export together with their password hashes, so users keep their passwords when you restore into a Supabase project. Configure sign-in providers again at the destination. Users who are signed in need to sign in again. See [Supabase's guide to migrating users between projects](https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects). |
| Server functions and scheduled jobs | Manual | Edge Function code is in `supabase/functions/`. Deploy it with the Supabase CLI. TanStack Start server functions run with the app on its new host. Set secrets separately. Inventory [scheduled jobs](https://docs.lovable.dev/features/jobs.md), check what exists at the destination after restoring, and recreate missing schedules. |
| App connectors | Manual | [App + chat connectors](https://docs.lovable.dev/integrations/app-connectors.md) and [app user connectors](https://docs.lovable.dev/integrations/app-user-connectors.md) run through Lovable and keep working while the project uses the built-in backend. Connections are not exported. When the backend moves, replace those calls with your own integration for each provider. [Chat connectors (MCP servers)](https://docs.lovable.dev/integrations/chat-connectors.md) work only in the project chat, so nothing moves. |
| AI features | Manual | Model calls run through Lovable as [AI gateway usage](https://docs.lovable.dev/introduction/credits-and-usage.md#ai-gateway-costs) while the project uses the built-in backend. When the backend moves, replace those calls with your own provider account. See [AI features for your app](https://docs.lovable.dev/features/ai). |

> **Manual migration using the Supabase dashboard**
>
> **1. Create a new Supabase project**
>
> Follow the steps below to create a new Supabase project.
>
> 1. Go to [supabase.com](https://supabase.com) → **New project**
> 2. Choose your organization and fill in:
>    * **Project name**: any name
>    * **Database password**: strong password
>    * **Region**: closest to your users
> 3. Click **Create new project** and wait around 2 minutes for the project to initialize.
> 4. From your new Supabase project settings, save these values:
>    * **Project ID**
>    * **Public API Key** (anon key)
>    * **Project URL**: `https://[your-project-id].supabase.co`
>
> **2. Run database migrations**
>
> Check your repository for its SQL migration files:
>
> * **Supabase migrations:** `supabase/migrations/`. Run them in chronological order based on the timestamp in the filename, from earliest to latest. For example:
>
>   ```text theme={null}
>   20251008155159_[hash].sql   # first - earliest
>   20251008155215_[hash].sql   # second
>   ```
>
> * **Drizzle migrations:** `drizzle/migrations/`. Follow the migration order recorded in `drizzle/migrations/meta/_journal.json`. These files do not run through `supabase db push`.
>
> For each migration file in your project, follow the steps below:
>
> 1. Copy the entire SQL content from each migration file.
>
> 2. Paste it into the **SQL editor** in your new Supabase project.
>
> 3. Run and wait for success message.
>
> > [!NOTE]
> >
> > If a migration fails, check the migration order, table dependencies, and SQL syntax errors.
>
> **3. Export and import your database data**
>
> Request a database export from your project and then import it to your new Supabase project.
>
> **Request a database export from Lovable** (see [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database)):
>
> 1. Go to **More → Database → Manage → Settings**.
> 2. In **Export project data**, click **Export data**.
> 3. In the **Database** card, click **Export**, then click **Start export** to confirm.
> 4. Lovable emails you when the export is ready. The export is saved to your project's storage, so download it from **More → Storage**.
>
> **Import your database export into Supabase:**
>
> The export is a PostgreSQL custom-format `.backup` archive with zstd compression. If the storage download wraps it in a `.zip` file, extract that first. The archive contains schema and data, including managed schemas such as `auth`. It is not a SQL file you can paste into the SQL editor.
>
> 1. Install PostgreSQL client tools with zstd support. A `pg_restore` build without that support can list the archive but cannot restore its data.
>
> 2. Inspect the archive with `pg_restore --list your-export.backup`. Use [PostgreSQL's selective restore options](https://www.postgresql.org/docs/current/app-pgrestore.html) to choose the objects and data to restore.
>
> 3. Plan the restore for your initialized destination using [Supabase's backup and restore guidance](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore). Its plain SQL examples are not commands for this custom-format archive. Account for existing managed schemas, roles, extensions, and the application schema you already created. If migrations inserted seed records, reconcile them before importing those same records from the export.
>
> 4. Restore the selected data with `pg_restore`, including the sequence values needed for new records. Verify tables, records, relationships, and record creation before switching your app to the new backend.
>
> > [!WARNING]
> >
> > Test the restore on the new project first. Restoring the entire archive over an initialized Supabase database can conflict with existing objects. Do not add `--clean` to resolve those conflicts without reviewing its effects: it drops the objects being restored.
>
> > [!NOTE]
> >
> > Export size limits and cadence are on [Export your database](https://docs.lovable.dev/features/database-backups.md#export-your-database). Download your export and your storage files before removing Cloud from the project. Exports saved to Cloud storage are no longer accessible afterwards.
>
> **4. Reconfigure authentication**
>
> If your project requires authentication, you need to manually reconfigure auth providers in your new Supabase project.
>
> Your users' accounts and password hashes (the stored form of their passwords) are in the database export, so after the restore they sign in with the same password. Sessions do not carry over, because the new project signs them with its own keys, so anyone signed in signs in again. If your destination cannot restore the exported accounts, give users a password reset flow instead.
>
> 1. In your new Supabase project, go to **Authentication → Sign In / Providers**.
> 2. Enable and configure each provider.
> 3. In your OAuth app settings (for example, Google Console, GitHub), update redirect URLs to use your new Supabase project URL.
>
> **5. Migrate storage files**
>
> Download any files from storage buckets in your project and upload them to your new Supabase project.
>
> 1. In your Lovable project, go to **More → Storage**.
> 2. Download files from your storage buckets.
> 3. In Supabase, go to **Storage** and upload files to corresponding buckets.
>
> **6. Set function secrets**
>
> If your Edge Functions use external services (for example, Stripe), set their API keys and tokens in the new project. Secrets stored in Lovable are not part of the export.
>
> 1. In your new Supabase project, open the **Edge Function Secrets** page in the dashboard.
> 2. Add each secret your functions read.
>
> With the Supabase CLI, `supabase secrets set NAME=value` sets one secret, and `supabase secrets set --env-file <file>` sets several from a file.
>
> **7. Deploy Edge Functions and recreate scheduled jobs**
>
> If your project has Edge Functions, their code is in `supabase/functions/`. After you link the new project with the Supabase CLI (see the CLI accordion below), deploy every Edge Function:
>
> ```bash theme={null}
> npx supabase functions deploy
> ```
>
> TanStack Start server functions run with the app on its new host and do not deploy through this command.
>
> Compare your scheduled jobs with the schedules present at the destination after restoring. Recreate missing database schedules with `cron.schedule` SQL, and schedules that call your app with a scheduler of your own. Verify their destination URLs and credentials, and check that they ran after their first scheduled time. Coordinate enabling them with the old backend so both copies do not run the same job.
>
> App connector and AI feature calls keep running through Lovable until you replace them. See [What migrates and how](#what-migrates-and-how).
>
> **8. Point a test deployment at the new backend**
>
> Leave the Lovable project and its repository unchanged for now. On a separate deployment of the app, the one you set up under the frontend sections above, set the new project's values as environment variables:
>
> * `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_SUPABASE_PROJECT_ID` for the browser. Both React + Vite and TanStack Start apps embed browser values at build time, so rebuild after setting them.
> * `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_PROJECT_ID` as well, for a TanStack Start app's server code.
>
> This deployment now talks to the new backend while your users still use the old one.
>
> **9. Verify everything works**
>
> On the test deployment, the app now runs on your Supabase backend, apart from any app connector or AI feature calls you have not replaced yet. Check:
>
> * The app loads without errors
> * You can create and read database records
> * Sign-in works with a migrated account
> * Storage uploads and downloads succeed
> * Edge Functions respond, and scheduled jobs ran
>
> Fix anything that fails here before the next step.
>
> **10. Switch the Lovable project to the new backend**
>
> Do this as part of the final switch, after the final data export is restored (see [Complete a move away from Lovable](#complete-a-move-away-from-lovable)). Two files in the project point at the backend:
>
> 1. In your Lovable project, go to **Code** and open `.env`. Replace the old values with the new project's values:
>
>    ```
>    VITE_SUPABASE_PROJECT_ID="your-new-project-id"
>    VITE_SUPABASE_PUBLISHABLE_KEY="your-new-anon-key"
>    VITE_SUPABASE_URL="https://your-new-project-id.supabase.co"
>    ```
>
>    A TanStack Start project also has `SUPABASE_PROJECT_ID`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_URL` in the same file for its server code. Update those to the same new values.
> 2. Open `supabase/config.toml` and replace the old project ID:
>
>    ```
>    project_id = "your-new-project-id"
>    ```
> 3. Save both files.
>
> From this save, the Lovable preview and the next publish use the new backend. Lovable also pushes the change to your connected repository, and any deployment automation you configured on that repository runs with the new values.

> **Push the schema and deploy functions with the Supabase CLI**
>
> For developers comfortable with the command line. Install the CLI as a project dev dependency, or with Homebrew on macOS:
>
> ```bash theme={null}
> npm install supabase --save-dev
> # or
> brew install supabase/tap/supabase
> ```
>
> The schema commands below apply to projects with `supabase/migrations/`. For a project with `drizzle/migrations/`, apply its migrations as described in the dashboard walkthrough instead. Function deployment is separate and applies when the project has `supabase/functions/`.
>
> Link the new project and push the Supabase migrations. Drop `npx` if you installed with Homebrew:
>
> ```bash theme={null}
> npx supabase login
> npx supabase link --project-ref your-new-project-id
> npx supabase db push
> ```
>
> To compare your migration files with the linked project's schema, install and start Docker, then run:
>
> ```bash theme={null}
> npx supabase db diff --linked
> ```
>
> The [schema diff command](https://supabase.com/docs/reference/cli/supabase-db-diff) needs a local shadow database in Docker. Without `--linked`, it compares against the local database instead of the new hosted project.
>
> After setting the function secrets from the walkthrough, deploy the Edge Functions:
>
> ```bash theme={null}
> npx supabase functions deploy
> ```
>
> These commands move the structure and the server code. Data, storage files, sign-in providers, and secrets follow the steps above.

For provider-specific details, see [**Supabase documentation**](https://supabase.com/docs).

## Host backend and data on your own infrastructure (Supabase example)

This option is intended for strict compliance, data residency, or infrastructure control requirements.

You run the backend and database on infrastructure you operate. The most direct self-hosted path is **self-hosted Supabase**, which provides the authentication, storage, realtime, and edge function services that Lovable applications depend on.

The production frontend can remain on Lovable or elsewhere. Lovable can still be used for development, or development can fully transition to other tools.

Running only a standalone PostgreSQL database is not sufficient unless you implement equivalent authentication, storage, realtime, and edge services.

### What you’re responsible for

When the backend runs on infrastructure you operate, you are responsible for the backend capabilities Lovable previously managed, including:

* PostgreSQL operations, backups, and disaster recovery
* Authentication, storage, and realtime service availability and reliability
* Row-level security design and enforcement
* Applying security patches and managing version upgrades
* Edge function deployment and execution
* Performance tuning and scaling
* Monitoring, alerting, and incident response
* Compliance certification of your infrastructure

Lovable does not monitor, operate, or debug any part of self-hosted infrastructure, and production previews are not generated for self-hosted production environments.

**When self-hosting Supabase, you typically:**

* Deploy Supabase in your own infrastructure using [Supabase's official self-hosting with Docker guide](https://supabase.com/docs/guides/self-hosting/docker).

  > [!NOTE]
  >
  > You can ask Lovable to generate these Docker configurations. See [Using Lovable to generate Docker deployments](#using-lovable-to-generate-docker-deployments) below.
* Configure PostgreSQL, authentication, storage, and required services.
* Apply the migration files from your Lovable project (`supabase/migrations/` or `drizzle/migrations/`, depending on the project) in their recorded order to your self-hosted instance.
* Update your application environment variables to point at your self-hosted Supabase:

  ```
  VITE_SUPABASE_URL=https://your-self-hosted-domain.com
  VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
  ```

  A TanStack Start project also reads `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` for its server code. Set those to the same values.

For detailed infrastructure setup and operational guidance, follow [Supabase’s official self-hosting documentation](https://supabase.com/docs/guides/self-hosting).

## Complete a move away from Lovable

When the app, its data, and its services all move, keep the existing app available while you prepare the replacement, and switch in this order:

1. **Restore the data and test against it.** Restore the database export and the storage files into the destination, point a test deployment at it, and run the checks under [Verify before switching traffic](#verify-before-switching-traffic) with migrated accounts.
2. **Check for remaining calls to Lovable.** Search the code for [app connectors](https://docs.lovable.dev/integrations/app-connectors.md), [AI features](https://docs.lovable.dev/features/ai), and your built-in backend URL. Each of those still runs through Lovable until you replace it. Cloud usage, AI features, and connectors on the **Managed by Lovable** option keep using your workspace credits.
3. **Plan the final data changes.** Records written after your export are not in it. For the final copy, pause writes from users, scheduled jobs, webhooks, and other integrations, request the final export when the [export cadence](https://docs.lovable.dev/features/database-backups.md#export-your-database) allows it (one export every 24 hours), copy any storage files changed since your last copy, restore, and then switch. Measure the export and restore times on your test run first, because they set the length of the pause. An app that cannot pause needs an incremental copy with a database tool of your own.
4. **Switch traffic.** Move your custom domain to the new host, then [unpublish](https://docs.lovable.dev/features/publish.md) the app on Lovable when you no longer want the `lovable.app` address to serve it.
5. **Retire the old services.** Download and verify your database export and storage files first. [Removing the database](https://docs.lovable.dev/features/database-pause-remove.md#remove-a-database-you-no-longer-need) deletes the backend permanently, including exports saved to its storage. Then disconnect Git sync or delete the project when you no longer need it in Lovable.

A code export or a domain change does not cancel anything. Your hosting and service providers bill you under their own plans, and your Lovable [subscription](https://docs.lovable.dev/introduction/subscription-plans.md) and any Cloud usage continue until you change them.

## Ask Lovable to prepare the deployment

Use this prompt as a starting point to ask Lovable to inspect the project and prepare the configuration for a host of your choice. Lovable cannot run or test the result outside its own preview. Check the suggested runtime version and server entry path against your actual build output, then verify the app on the new host before using the generated instructions for production.

```text wrap theme={null}
Prepare this app for deployment outside Lovable. Inspect the framework, build configuration, server functions, and runtime dependencies. Keep the current backend. Explain the compatible hosting options and the environment variables and authentication URLs I need to configure. Preserve the existing Lovable preview workflow.
```

## Using Lovable to generate Docker deployments

If you prefer a containerized deployment, you can prompt Lovable to generate Docker and Docker Compose configurations for your project. Lovable provides the generated file details, service ports, and run commands in the project chat. Below are the three supported patterns.

### Frontend only

Package only the React app as a static site served by Nginx. Use this when you only want to move your frontend. This pattern is for older React + Vite apps. A TanStack Start app needs a Node.js stage instead, as described under [Deploy to a container or your own server](#deploy-to-a-container-or-your-own-server).

For example:

```text wrap theme={null}
Dockerize this project for frontend-only deployment with Nginx
```

### Backend only (self-hosted Supabase)

Run the full Supabase stack locally without bundling the frontend. Use this when you want to develop the frontend separately or serve it from another host.

For example:

```text wrap theme={null}
Create a Docker Compose setup for a self-hosted Supabase backend only (no frontend container)
```

### Full stack (frontend + self-hosted Supabase)

Bundle the frontend and a self-hosted Supabase stack in a single Docker Compose setup. Use this for fully self-contained deployments.

For example:

```text wrap theme={null}
Dockerize this project with a self-hosted Supabase backend bundled in Docker Compose
```

### Manual configuration required for self-hosted Supabase

Lovable generates placeholder secrets that you must replace before use:

1. Generate a JWT secret: `openssl rand -base64 32`
2. Generate API keys using your JWT secret. Follow the [Supabase self-hosting documentation for generating API keys](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys).
3. Replace the following values in `docker-compose.yml`:
   * `JWT_SECRET`
   * `POSTGRES_PASSWORD`
   * `ANON_KEY`
   * `SERVICE_ROLE_KEY`

### Limitations

* Lovable cannot run or test Docker builds. Verify them yourself.
* Lovable cannot generate real secrets. Replace the placeholders yourself.


## Related topics

- [Deployment, hosting, and ownership options with Lovable](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md)
- [How Lovable hosts your app](https://docs.lovable.dev/features/hosting.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Support policy](https://docs.lovable.dev/introduction/support-policy.md)
- [Glossary](https://docs.lovable.dev/glossary.md)
