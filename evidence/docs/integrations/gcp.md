# Connect your app to Google Cloud API
<!-- source: https://docs.lovable.dev/integrations/gcp.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to Google Cloud API

> Connect your app to Google Cloud API to inventory resources, read monitoring and logging data, inspect IAM, and manage Google Cloud projects from your Lovable app.

[Google Cloud](https://cloud.google.com/) is Google's cloud platform. The Google Cloud API connector lets your Lovable app call any Google Cloud REST API, such as Resource Manager, Cloud Asset Inventory, Cloud Monitoring, Cloud Logging, Compute Engine, and Cloud Run, as a service account in your Google Cloud organization. It's designed for internal tools and dashboards that read or administer Google Cloud projects you control.

Google Cloud API is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in Chats, in the project chat while you build, and in your published apps.

With Google Cloud API, your app can:

* List projects, folders, and organizations, and search the resources in them with Cloud Asset Inventory
* Read Cloud Monitoring metrics and Cloud Logging entries for dashboards and reports
* List Compute Engine instances, Cloud Run services, and Cloud Storage buckets
* Read billing accounts, project billing settings, and service pricing from Cloud Billing
* Inspect the Identity and Access Management (IAM) policy of a project
* Create, change, or delete resources when you ask for it, within the roles granted to the service account

> [!NOTE]
>
> This is a connector for apps you build with Lovable. It integrates your app with your Google Cloud projects. It does not deploy or host your Lovable app on Google Cloud. To publish a Lovable app, use Lovable's own [publish flow](https://docs.lovable.dev/features/publish.md).

> [!TIP]
>
> For SQL analytics on data in BigQuery, including cost and spend analysis from a Cloud Billing export, use the [BigQuery](https://docs.lovable.dev/integrations/bigquery.md) connector, which supports the same Workload Identity Federation setup. Google Cloud API reads billing accounts and pricing, not your spend.

## Common use cases and example apps

These examples show what you can build with Google Cloud API, each with a prompt to start from.

| Example app | Example prompt | Description |
| :- | :- | :- |
| Project inventory | *Use Google Cloud API and build a page that lists all the Google Cloud projects in our organization with their IDs, states, and labels.* | **See every project in one place.** The app lists projects through Resource Manager and renders them as a searchable table. |
| Resource inventory | *Use Google Cloud API and build a resource inventory for a selected project, grouped by service, with location and labels.* | **Know what is running in a project at a glance.** The app searches the project with Cloud Asset Inventory and groups the results by service. |
| Monitoring dashboard | *Use Google Cloud API and build a dashboard that charts CPU utilization for the Compute Engine instances in a selected project over the last 24 hours.* | **Turn Cloud Monitoring metrics into charts your team reviews.** The app reads time series from Cloud Monitoring and plots them per instance. |
| Log viewer | *Use Google Cloud API and build an internal page that shows the latest error-level log entries for a selected project, with a text filter.* | **Read logs without opening the console.** The app lists entries from Cloud Logging with a severity filter and shows them newest first. |
| Cloud Run overview | *Use Google Cloud API and build a page that lists our Cloud Run services in a selected region with their latest revision and URL.* | **Track your services across regions.** The app lists Cloud Run services for the chosen location and shows each one's current revision. |
| Access review | *Use Google Cloud API and build a report of who holds the Owner or Editor role on each of our production projects.* | **Audit broad access before it becomes a problem.** The app reads each project's IAM policy through Resource Manager and flags the principals with broad roles. |

## How Google Cloud API connections work

The connector authenticates with Workload Identity Federation, Google's keyless way to let an outside system act as a service account. You configure Google Cloud to trust identity tokens for a workspace-specific audience, restricted to Lovable's [connector gateway](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) service account, and Lovable impersonates the service account you specify. Each connection uses one workload identity provider and one service account, and multiple projects in the workspace can share it. No service account key is created, and Lovable stores no Google secret: the connection consists of the provider's resource name and the service account's email address.

Lovable's connector gateway exchanges its own identity token for a short-lived access token for the service account through Google's Security Token Service, refreshes it in the background, and forwards each request to the Google Cloud API your app names. The token stays on the server and is not exposed to your published app.

The access token carries the Google Cloud scope, which covers every Google Cloud API. Some Google APIs outside Google Cloud reject that scope and need a scope of their own. The connection's **Additional Google APIs** setting decides which of those the token also carries:

| API | What it reaches |
| :- | :- |
| Android Management (`androidmanagement`) | Android Enterprise devices, policies, and enrollment |
| Google Analytics read-only (`analytics.readonly`) | Google Analytics reports and configuration |
| Google Analytics edit (`analytics.edit`) | Google Analytics account and property configuration |
| Merchant Center (`content`) | Merchant Center products and accounts |

No API is selected when you create a connection, and Google Cloud APIs work without one. Selecting an API widens the token only. The service account still needs access to that product in Google, and a call to an API you have not selected fails with a `403`.

The connector does not restrict which Google Cloud services or operations a connection can reach, and it does not distinguish reads from writes. The IAM roles granted to the service account are the control: whatever the service account may do, apps built on the connection can do. Grant the narrowest roles at the narrowest scope (project, folder, or organization) that covers your app, and make them read-only where possible.

One exception applies. Five Google Cloud services return credentials or secret values, and the connection's **Sensitive services** setting decides whether apps can reach them at all:

| Service | What it returns |
| :- | :- |
| IAM Credentials (`iamcredentials`) | Short-lived access tokens and signatures for service accounts |
| IAM (`iam`) | Service accounts, roles, and downloadable service account keys |
| Secret Manager (`secretmanager`) | Stored secret values |
| Cloud KMS (`cloudkms`) | Decrypted data and signatures made with your keys |
| Parameter Manager (`parametermanager`) | Parameters with Secret Manager values substituted in |

All five are selected when you create a connection. Deselect a service to block it: the gateway then rejects every request to that service, including its regional endpoints, with a `403` whose error type is `sensitive_service_not_enabled`, and Lovable tells you which service to enable instead of retrying. IAM still applies to the services you leave selected, so a selected service grants nothing by itself.

Connecting verifies the federation but not the access. Lovable only confirms that Google exchanges its identity for a token for the service account, so a connection can verify and still receive `403` responses until the roles exist and the APIs are enabled. See [Troubleshooting](#troubleshooting).

When you build with the connection in the project chat, Lovable works this way:

* Lovable builds read-only features by default and adds calls that create, change, or delete resources or IAM bindings only when you ask for them by name.
* Before generating code for a call that changes a project, Lovable states the exact project, resource, and change and asks you to confirm. For deletions, role changes, calls that incur cost, and calls that create or return credentials, Lovable also explains what else the change affects and whether it can be undone, and asks a second time.
* Lovable builds resource creation as a single action that you confirm, rather than a loop, schedule, or per-user trigger.
* Lovable keeps every call server-side and does not place Google access tokens or the connector's credentials in frontend code or chat. Secret values, keys, and tokens a call returns stay on the server too.
* Lovable declines to create a downloadable service account key and recommends Workload Identity Federation instead.
* When Google denies a call, Lovable names the missing role or the API to enable instead of retrying.

These rules cover the code Lovable writes for your app. When Lovable uses the connection directly from the project chat to make a change, it pauses on an approval card first. Your **Agent approval for this connection** setting applies to you and that connection and controls whether Lovable keeps asking. See [Approving connector actions in the project chat](https://docs.lovable.dev/integrations/app-connectors.md#approving-connector-actions-in-the-project-chat).

## How to connect Google Cloud API

Who can create Google Cloud API connections depends on your plan and workspace settings. App + chat connectors are available by default. On Business and Enterprise plans, [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) starts at **Admins**. Some Enterprise workspaces start at **No one**, which disables the connector. An admin or owner changes it in **Connectors → Admin settings → App + chat connectors**.

You can create multiple Google Cloud API connections using different service accounts, which is useful for separating organizations, projects, or environments (for example, development and production).

When the connection is created, you can [link it to the projects](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) where you want to use it. Anyone building in a project can ask Lovable in the project chat to link their project to it.

### Prerequisites

Before connecting Google Cloud API, make sure you have:

* A **Google Cloud project** to hold the workload identity pool and the service account. The service account can then be granted roles on this project, on other projects, or on folders and organizations.
* Your **Lovable workspace ID**, shown under **Configure connection** in the connection form
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))
* These roles on the Google Cloud project. `roles/owner` covers all of them:

  | Role | Needed for |
  | :- | :- |
  | `roles/serviceusage.serviceUsageAdmin` | Enabling the IAM, Security Token Service, IAM Credentials, and Cloud Resource Manager APIs |
  | `roles/iam.workloadIdentityPoolAdmin` | Creating the workload identity pool and OpenID Connect provider |
  | `roles/iam.serviceAccountAdmin` | Creating the service account and granting impersonation on it |
  | `roles/resourcemanager.projectIamAdmin` | Granting roles to the service account on the project |

> [!WARNING]
>
> API actions can create or change cloud resources and incur costs, and you are responsible for all of them. Google bills your Cloud Billing account directly for everything your app uses or creates, not Lovable. Set a [Cloud Billing budget](https://cloud.google.com/billing/docs/how-to/budgets) with an alert before you connect, verify what Lovable builds, and confirm that cleanup and teardown succeed.

### Step 1: Configure Workload Identity Federation in Google Cloud

You need a workload identity pool and an OpenID Connect (OIDC) provider that trusts Google-issued ID tokens sent by Lovable's connector gateway for your workspace, a service account for Lovable to impersonate, and the IAM roles that decide what your app can do.

You can complete this setup by running a setup script directly in Google Cloud Shell Editor, or through manual steps in Google Cloud Console (see [**Manual setup in Google Cloud Console**](#manual-setup-in-google-cloud-console)).

For background on the underlying Google Cloud features, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) and [Best practices for using Workload Identity Federation](https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation).

**1. Open Google Cloud Console and search for Cloud Shell Editor**

In the [Google Cloud Console](https://console.cloud.google.com/), search for **Cloud Shell Editor** and open it.

**2. Authorize Cloud Shell to use your credentials**

When prompted, authorize Cloud Shell to use your Google credentials.

**3. Select the correct project**

Make sure the correct Google Cloud project is selected in the Cloud Shell session.

**4. Create a new file, copy in the script, and set the variables**

Create a new file (for example, `setup.sh`), paste the script below into it, and fill in the values at the top. Your workspace ID is shown under **Configure connection** in the Lovable connection form.

```bash theme={null}
#!/usr/bin/env bash
set -euo pipefail

# ---- FILL THESE IN ----
GCP_PROJECT="YOUR_GCP_PROJECT_ID"
WORKSPACE_ID="YOUR_WORKSPACE_ID"

# Roles granted to the service account on GCP_PROJECT. roles/viewer covers
# read-only inventory, monitoring, and logging. Add service-specific roles
# only for the changes your app makes. Leave the list empty to grant roles
# yourself in the console, for example on a folder or organization.
ROLES=("roles/viewer")

# ---- Defaults ----
POOL_ID="lovable"
PROVIDER_ID="lovable-gateway"
SA_NAME="lovable-gcp"
LOCATION="global"
GATEWAY_SA_EMAIL="connector-gateway@lovable-core-prod.iam.gserviceaccount.com"

# ---- Validate placeholders ----
for VAR in GCP_PROJECT WORKSPACE_ID; do
  if [[ -z "${!VAR}" || "${!VAR}" == YOUR_* ]]; then
    echo "ERROR: set ${VAR} at the top of this script" >&2
    exit 1
  fi
done

# ---- Derived ----
SA_EMAIL="${SA_NAME}@${GCP_PROJECT}.iam.gserviceaccount.com"
SUBJECT_TOKEN_AUDIENCE="https://connector-gateway.lovable.dev/workspaces/${WORKSPACE_ID}"

# Enable APIs first. Cloud Resource Manager is not enabled by default on
# a new project, and the gcloud projects commands below depend on it.
gcloud services enable \
  iam.googleapis.com sts.googleapis.com \
  iamcredentials.googleapis.com cloudresourcemanager.googleapis.com \
  --project="${GCP_PROJECT}"

PROJECT_NUMBER=$(gcloud projects describe "${GCP_PROJECT}" --format="value(projectNumber)")
POOL_RESOURCE="projects/${PROJECT_NUMBER}/locations/${LOCATION}/workloadIdentityPools/${POOL_ID}"

# Create the workload identity pool
if ! gcloud iam workload-identity-pools describe "${POOL_ID}" \
    --location="${LOCATION}" --project="${GCP_PROJECT}" &>/dev/null; then
  gcloud iam workload-identity-pools create "${POOL_ID}" \
    --location="${LOCATION}" \
    --project="${GCP_PROJECT}" \
    --display-name="Lovable WIF Pool"
fi

# Create the OIDC provider, restricted to Lovable's connector gateway.
# An existing provider that already matches is left alone. One with
# different settings is only overwritten after you confirm, because the
# binding below trusts every identity this pool admits.
EXPECTED_CONDITION="assertion.email == '${GATEWAY_SA_EMAIL}'"

if gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
    --location="${LOCATION}" \
    --workload-identity-pool="${POOL_ID}" \
    --project="${GCP_PROJECT}" &>/dev/null; then
  CURRENT_CONDITION=$(gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
    --location="${LOCATION}" \
    --workload-identity-pool="${POOL_ID}" \
    --project="${GCP_PROJECT}" \
    --format="value(attributeCondition)")

  CURRENT_AUDIENCE=$(gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
    --location="${LOCATION}" \
    --workload-identity-pool="${POOL_ID}" \
    --project="${GCP_PROJECT}" \
    --format="value(oidc.allowedAudiences)")

  # The impersonation binding below matches on attribute.email, so the
  # provider has to map it.
  CURRENT_EMAIL_MAPPING=$(gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
    --location="${LOCATION}" \
    --workload-identity-pool="${POOL_ID}" \
    --project="${GCP_PROJECT}" \
    --format="value(attributeMapping['attribute.email'])")

  if [[ "${CURRENT_CONDITION}" == "${EXPECTED_CONDITION}" \
     && "${CURRENT_AUDIENCE}" == "${SUBJECT_TOKEN_AUDIENCE}" \
     && "${CURRENT_EMAIL_MAPPING}" == "assertion.email" ]]; then
    echo "Provider '${PROVIDER_ID}' already matches this workspace."
  else
    echo ""
    echo "Provider '${PROVIDER_ID}' already exists with different settings:"
    echo "  audience       now:  ${CURRENT_AUDIENCE:-(none)}"
    echo "                 new:  ${SUBJECT_TOKEN_AUDIENCE}"
    echo "  condition      now:  ${CURRENT_CONDITION:-(none)}"
    echo "                 new:  ${EXPECTED_CONDITION}"
    echo "  attribute.email now: ${CURRENT_EMAIL_MAPPING:-(unmapped)}"
    echo "                 new:  assertion.email"
    echo ""
    echo "Overwriting replaces these values. Any other audience on this provider is dropped."
    CONFIRM=""
    read -r -p "Overwrite it? (y/N) " CONFIRM < /dev/tty || CONFIRM="n"
    case "${CONFIRM}" in
      [Yy]|[Yy][Ee][Ss]) ;;
      *) echo "Aborted."; exit 1 ;;
    esac

    gcloud iam workload-identity-pools providers update-oidc "${PROVIDER_ID}" \
      --location="${LOCATION}" \
      --workload-identity-pool="${POOL_ID}" \
      --project="${GCP_PROJECT}" \
      --issuer-uri="https://accounts.google.com" \
      --allowed-audiences="${SUBJECT_TOKEN_AUDIENCE}" \
      --attribute-mapping="google.subject=assertion.sub,attribute.email=assertion.email" \
      --attribute-condition="${EXPECTED_CONDITION}"
  fi
else
  gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_ID}" \
    --location="${LOCATION}" \
    --workload-identity-pool="${POOL_ID}" \
    --project="${GCP_PROJECT}" \
    --issuer-uri="https://accounts.google.com" \
    --allowed-audiences="${SUBJECT_TOKEN_AUDIENCE}" \
    --attribute-mapping="google.subject=assertion.sub,attribute.email=assertion.email" \
    --attribute-condition="assertion.email == '${GATEWAY_SA_EMAIL}'"
fi

# Create the service account Lovable impersonates
if ! gcloud iam service-accounts describe "${SA_EMAIL}" \
    --project="${GCP_PROJECT}" &>/dev/null; then
  gcloud iam service-accounts create "${SA_NAME}" \
    --project="${GCP_PROJECT}" \
    --display-name="Lovable Google Cloud API"
fi

# Wait for the service account to become visible to IAM. Reads are
# eventually consistent, so a new service account can take 60s or more
# to appear.
PROPAGATION_TIMEOUT=120
echo "Waiting up to ${PROPAGATION_TIMEOUT}s for service account to propagate..."
PROPAGATION_DEADLINE=$((SECONDS + PROPAGATION_TIMEOUT))
until gcloud iam service-accounts describe "${SA_EMAIL}" \
    --project="${GCP_PROJECT}" &>/dev/null; do
  if (( SECONDS >= PROPAGATION_DEADLINE )); then
    echo "ERROR: ${SA_EMAIL} did not become available after ${PROPAGATION_TIMEOUT}s" >&2
    exit 1
  fi
  sleep 2
done

# ---- Confirm before granting roles ----
if (( ${#ROLES[@]} > 0 )); then
  echo ""
  echo "Service account ${SA_EMAIL} will be granted on project ${GCP_PROJECT}:"
  for ROLE in "${ROLES[@]}"; do
    echo "  ${ROLE}"
  done
  echo ""
  REPLY=""
  read -r -p "Continue? (Y/n) " REPLY < /dev/tty || REPLY="n"
  case "${REPLY}" in
    ""|[Yy]|[Yy][Ee][Ss]) ;;
    *) echo "Aborted."; exit 1 ;;
  esac

  for ROLE in "${ROLES[@]}"; do
    gcloud projects add-iam-policy-binding "${GCP_PROJECT}" \
      --member="serviceAccount:${SA_EMAIL}" \
      --role="${ROLE}" --condition=None --quiet
  done
fi

# Allow the pool to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${GCP_PROJECT}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_RESOURCE}/attribute.email/${GATEWAY_SA_EMAIL}" \
  --condition=None --quiet

AUDIENCE="//iam.googleapis.com/${POOL_RESOURCE}/providers/${PROVIDER_ID}"

echo ""
echo "=== Paste these into the Google Cloud API connector in Lovable ==="
echo ""
echo "  WIF Audience:          ${AUDIENCE}"
echo "  Service Account Email: ${SA_EMAIL}"
echo ""
echo "NOTE: IAM bindings can take up to 5 minutes to propagate."
echo "NOTE: Enable the APIs your app calls under APIs & Services in the console."
```

**5. Open the terminal and run the script**

In the Cloud Shell terminal, run: `bash setup.sh`

The script prints the **WIF audience** and **Service account email** you need in Step 2.

The script grants the roles in `ROLES` on the project you selected, **Viewer** (`roles/viewer`) by default. To grant roles on other projects, on a folder, or on an organization, or to grant **Billing Account Viewer** (`roles/billing.viewer`) on a billing account, use **IAM & Admin → IAM** in the console with that resource selected. Avoid **Owner** and **Editor**, and avoid roles that manage IAM, because a service account that can grant roles can grant itself more access.

Also enable each API your app calls, for example the Cloud Asset, Cloud Monitoring, and Cloud Logging APIs, under **APIs & Services → Enabled APIs & services** in the project that owns the service account. When the app reads or manages another project, Google can also require the API to be enabled there. A request to an API that is not enabled fails with `403` and the reason `SERVICE_DISABLED`, whatever roles the service account has, and the error names the project to fix.

> **Manual setup in Google Cloud Console**
>
> **1. Enable the APIs**
>
> In the [Google Cloud console](https://console.cloud.google.com/), open **APIs & Services → Enabled APIs & services** and enable `iam.googleapis.com`, `sts.googleapis.com`, `iamcredentials.googleapis.com`, and `cloudresourcemanager.googleapis.com`.
>
> **2. Create a workload identity pool**
>
> Open **IAM & Admin → Workload Identity Federation** and create a pool named `lovable` (or use an existing one).
>
> **3. Add an OIDC provider**
>
> Add an **OIDC provider** named `lovable-gateway` to the pool with:
>
> * **Issuer (URL)**: `https://accounts.google.com`
> * **Audience**: select **Allowed audiences** and enter `https://connector-gateway.lovable.dev/workspaces/<WORKSPACE_ID>`, replacing `<WORKSPACE_ID>` with your Lovable workspace ID
> * **Attribute mapping**: map `google.subject` to `assertion.sub`, then add a second mapping from `attribute.email` to `assertion.email`
> * **Attribute conditions**: enter the condition below, which restricts the pool to Lovable's connector gateway
>
> ```text wrap theme={null}
> assertion.email == 'connector-gateway@lovable-core-prod.iam.gserviceaccount.com'
> ```
>
> > [!WARNING]
> >
> > Do not leave **Attribute conditions** empty. It is the setting that limits this provider to Lovable's connector gateway. A provider that trusts `https://accounts.google.com` with no attribute condition accepts identity tokens from any Google account or service account.
>
> **4. Create a service account for Google Cloud access**
>
> Open **IAM & Admin → Service accounts** and create a service account, for example `lovable-gcp`. This is the identity Lovable impersonates.
>
> **5. Grant the service account IAM roles**
>
> Select the project, folder, or organization your app works with, open **IAM & Admin → IAM**, click **Grant access**, enter the service account email as the principal, and choose the least-privileged [predefined role](https://cloud.google.com/iam/docs/understanding-roles) that covers your app: **Browser** (`roles/browser`) to list projects and folders, **Viewer** (`roles/viewer`) for read-only inventory, monitoring, and logging, or a service-specific role only when the app must change resources. For billing reads, grant **Billing Account Viewer** (`roles/billing.viewer`) on the billing account. Avoid **Owner** and **Editor**, and avoid roles that manage IAM.
>
> Then enable each API your app calls under **APIs & Services → Enabled APIs & services**.
>
> **6. Allow the pool to impersonate the service account**
>
> On the service account, grant **Workload Identity User** (`roles/iam.workloadIdentityUser`) to this principal, replacing `PROJECT_NUMBER` with your Google Cloud project number:
>
> ```text wrap theme={null}
> principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/lovable/attribute.email/connector-gateway@lovable-core-prod.iam.gserviceaccount.com
> ```
>
> This grants impersonation only to the identity carrying Lovable's connector gateway email, which is why the provider maps `attribute.email` above. A pool-wide `/*` principal would work too, but it would also cover any other provider you later add to the same pool.
>
> **7. Copy the workload identity provider resource name**
>
> Open the provider and copy its resource name. It looks like `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/lovable/providers/lovable-gateway`. This string is the **WIF audience** value Lovable expects.

### Step 2: Connect Google Cloud API to Lovable

With the federation set up and the roles granted, create the connection in Lovable.

**1. Open Google Cloud API in Connectors**

Open [**Connectors**](https://lovable.dev/dashboard?connectors) and select **Google Cloud API**. For the other places to open the catalog from, see [Where to find connectors](https://docs.lovable.dev/integrations/introduction#where-to-find-connectors). The connector page shows a **Use responsibly** notice about the cost and resource impact of API actions.

**2. Add a connection**

Click **Connect** on the connector page. The form is split into collapsible sections, **Details**, **Configure connection**, and **Sharing**.

**3. Name the connection**

Under **Details**, Lovable fills in a name for the connection, which you can change. The name is only used inside Lovable to identify the connection.

**4. Configure the connection**

Under **Configure connection**, the form shows a Workspace ID copy field with the value Step 1 uses. Below it, enter:

1. **WIF audience**: paste the **Workload Identity Provider** resource name from Google Cloud (the full `//iam.googleapis.com/projects/.../providers/...` string). It contains your project number, not the project ID, and Lovable rejects any other format.
2. **Service account email**: enter the service account to impersonate for Google Cloud access (for example `lovable-gcp@your-project.iam.gserviceaccount.com`).
3. **Sensitive services**: the five credential- and secret-returning services described in [How Google Cloud API connections work](#how-google-cloud-api-connections-work), all selected by default. Deselect any that apps built on this connection must not reach. You can change the selection later.
4. **Additional Google APIs**: the Google APIs outside Google Cloud described in [How Google Cloud API connections work](#how-google-cloud-api-connections-work), none selected by default. Select an API only if your app calls it, and grant the service account access in that product as well. You can change the selection later.

**5. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

Everyone you share the connection with can build features that use the full access of the service account.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**6. Connect**

Click **Connect** at the bottom of the form. Lovable validates the federation setup through the gateway before saving the connection: it asks Google to exchange Lovable's identity for a short-lived token for the service account. The check confirms that the provider trusts Lovable for your workspace and that the service account allows the impersonation, and nothing about roles or enabled APIs. If verification fails, see [Troubleshooting](#troubleshooting).

When connected, anyone building in a project can ask Lovable in the project chat to link their project to Google Cloud API (based on configured connection-level access). Your Lovable apps can then call Google Cloud APIs through the connector gateway, within the roles granted to the service account.

## Limitations

The Google Cloud API connector cannot:

* Restrict a connection to read-only operations or to specific Google Cloud services from inside Lovable, apart from blocking the five credential- and secret-returning services under **Sensitive services**. IAM roles are the only other control over what apps built on a connection can do.
* Authenticate with a service account key file, a user's Google sign-in, or an API key. The connection needs Workload Identity Federation.
* Call Google Workspace APIs such as Gmail, Drive, or Sheets. **Additional Google APIs** does not list them. Use the [Google Workspace](https://docs.lovable.dev/integrations/google-workspace.md) connectors for that data.
* Call your own Cloud Run services, Cloud Functions, or App Engine apps at their own URLs. The connection reaches Google Cloud's `googleapis.com` APIs only, so it can manage a Cloud Run service but not send requests to it.
* Receive events from Google Cloud, such as Pub/Sub push deliveries or Eventarc events. The connection only makes outbound calls.
* Support per-end-user Google login. Each connection represents a single service account shared across all projects linked to it.

If you delete the service account, remove its **Workload Identity User** binding, or delete the pool or provider, requests fail until you restore them. To point the connection at a different provider or service account, open the connection, change the values under **Configure connection**, and click **Update**. Lovable verifies the federation again before saving.

## Troubleshooting

Use these checks when connecting fails or a Google Cloud request returns an unexpected status.

> **Connect failed: Google Cloud API did not validate your credentials**
>
> Lovable asks Google for a token when you click **Connect**. Click **Show error** in the alert. The error text names the step that failed:
>
> * *sts exchange failed*: Google did not accept Lovable's identity at the provider named in **WIF audience**. Check that the audience is the provider's full resource name with your project number, that the provider's **Allowed audiences** contains `https://connector-gateway.lovable.dev/workspaces/<WORKSPACE_ID>` with the workspace ID shown in the form, and that its attribute condition is exactly `assertion.email == 'connector-gateway@lovable-core-prod.iam.gserviceaccount.com'`. A disabled or deleted pool or provider also fails here.
> * *impersonation failed*: Google accepted Lovable's identity but did not issue a token for the service account. Check that **Service account email** is spelled correctly and the account exists, that the service account grants **Workload Identity User** to the principal from Step 1, and that `iamcredentials.googleapis.com` is enabled in the project that owns the service account. IAM changes can take a few minutes to take effect.

> **A request returned 403 after connecting**
>
> Connecting verifies the federation and grants nothing. A `403` has four causes with different fixes:
>
> * The response comes from Lovable with the error type `sensitive_service_not_enabled`: the service is deselected under **Sensitive services** on the connection. Ask a workspace admin or owner to open the connection, select the service under **Configure connection**, and click **Update**. This is a Lovable setting, not a Google denial, so granting roles does not help.
> * Google returns `PERMISSION_DENIED`: no role on the service account allows the operation at that scope. Grant the role in **IAM & Admin → IAM** on the project, folder, or organization. Google evaluates access on every request, so you do not need to reconnect. When this happens in the project chat, Lovable names the missing role.
> * Google returns `SERVICE_DISABLED`: the API is not enabled. Enable it under **APIs & Services** as described in Step 1, then retry.
> * Google returns `ACCESS_TOKEN_SCOPE_INSUFFICIENT`: the API rejects the Google Cloud scope and needs a scope of its own. Ask a workspace admin or owner to open the connection, select the API under **Additional Google APIs**, and click **Update**. Granting IAM roles does not fix this.

> **A request returned 429 Too Many Requests**
>
> The connector gateway applies its [general per-project limit](https://docs.lovable.dev/integrations/security.md#gateway-connectors) and returns `429` with a `Retry-After` header before the request reaches Google. Google Cloud APIs also enforce their own [per-project quotas](https://cloud.google.com/docs/quotas/view-manage) and return `429` with the reason `RESOURCE_EXHAUSTED`.
>
> Ask Lovable to cache reads, poll on demand rather than on a frequent fixed timer, and retry throttled calls with increasing delays.

## Manage your Google Cloud API connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **Google Cloud API**, then open the connection.

* **Unlink projects** to remove Google Cloud API access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use Google Cloud API stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Maps Platform](https://docs.lovable.dev/integrations/google-maps.md)
- [Connect your app to Firebase Cloud Messaging](https://docs.lovable.dev/integrations/firebase-cloud-messaging.md)
- [Connect your app to Azure Cloud API](https://docs.lovable.dev/integrations/azure.md)
- [Connect your app to Cloudflare API](https://docs.lovable.dev/integrations/cloudflare-api.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
