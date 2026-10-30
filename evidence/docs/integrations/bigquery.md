# Connect your app to BigQuery
<!-- source: https://docs.lovable.dev/integrations/bigquery.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your app to BigQuery

> Connect Google BigQuery to your Lovable app by signing in with Google (OAuth) or using Workload Identity Federation. Run SQL, explore datasets and schemas, and build analytics features without storing long-lived GCP keys in your project.

[Google BigQuery](https://cloud.google.com/bigquery) is a serverless data warehouse for analytics at scale. The **BigQuery** app + chat connector lets your Lovable app call the BigQuery API through Lovable’s secure gateway. You can connect by **signing in with your Google account** or with **Workload Identity Federation (WIF)**, so you never paste long-lived service account keys into Lovable.

BigQuery is available as an [app + chat connector](https://docs.lovable.dev/integrations/app-connectors.md): one shared connection that works in the project chat while you build, and in your published apps.

With BigQuery connected, your app can:

* Query datasets and tables using **standard SQL**
* Explore **schema metadata** (projects, datasets, tables, columns)
* Run **parameterized queries** with cost guardrails in mind
* Read from **views** and **materialized views**

BigQuery fits when your data already lives in GCP, or when you want warehouse-scale analytics, reporting, and dashboards backed by SQL.

## Common use cases and example apps

| Example app | Example prompt | Description |
| :- | :- | :- |
| **Executive metrics dashboard** | *Build a dashboard that shows weekly revenue and signups from your BigQuery `marts` tables, with filters by region.* | **Turn warehouse tables into charts in your app.** The app runs SQL against BigQuery and renders KPIs and trends for stakeholders. |
| **Internal reporting tool** | *Build an internal app where your team can run approved SQL reports against dataset `analytics` and export CSV.* | **Self-serve reporting on curated datasets.** The app submits parameterized queries and returns result sets without giving users direct GCP console access. |
| **Dataset explorer** | *Build a tool that lists datasets and tables I can access and shows column types and row counts.* | **Browse what’s in the warehouse.** The app uses metadata APIs and lightweight queries to describe tables and schemas. |
| **Customer health view** | *Join your CRM export in BigQuery with product usage and show a health score per account.* | **Combine modeled data for operational workflows.** The app queries pre-joined or curated tables your data team maintains in BigQuery. |
| **Scheduled insight page** | *Build a page that shows yesterday’s funnel metrics from BigQuery materialized views.* | **Surface daily or hourly aggregates.** The app reads from views or summary tables that your pipelines refresh on a schedule. |
| **Data validation UI** | *Build a small app that runs row counts and null checks on key columns after your pipeline runs.* | **Lightweight quality checks on top of SQL.** The app runs targeted queries to confirm expectations after loads complete. |

Exact behavior depends on **your datasets**, **IAM permissions** of the connected identity, and **what you ask Lovable to build**.

## How BigQuery connections work

* **Authentication**: Connections authenticate in one of two ways.

  * **Connect with Google** signs in with your Google account (OAuth).
  * **Workload Identity Federation** exchanges identity tokens for short-lived service account credentials through Google’s security token service.

  In both modes, short-lived access tokens are obtained and refreshed through Lovable’s **connector gateway**, and no long-lived JSON keys are stored in your repo.
* **Gateway**: Requests to the BigQuery API are proxied through the gateway. See [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors) for token handling and **per-project request limits**.
* **Scopes**: Connections use the `https://www.googleapis.com/auth/bigquery` scope. What you can read or run still depends on **IAM and dataset permissions** in Google Cloud: your Google account’s permissions for Connect with Google, or the **service account’s** for Workload Identity Federation.
* **Identity**: With **Connect with Google**, the connection acts as the Google account that authorized it and runs queries in the Google Cloud project you configure. With **Workload Identity Federation**, you configure Google Cloud to trust identity tokens for a **workspace-specific audience**, restricted to Lovable’s connector gateway service account, and Lovable impersonates the **service account** you specify.

> [!NOTE]
>
> BigQuery **query and storage costs** are billed by **Google Cloud** to your GCP billing account, based on bytes processed, slots, and related usage. Lovable does not bill you for BigQuery usage.

## How to connect BigQuery

Who can create BigQuery connections depends on your plan and workspace settings. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).

When a connection is created, it can be **linked to projects** like other app + chat connectors so published apps can use it where allowed.

### Choose how to connect

* **Connect with Google** is the fastest way to connect. You sign in with your Google account and pick the Google Cloud project that runs and is billed for your queries. The connection is tied to that Google account, which makes it a good fit for individuals, prototypes, and teams that already work through personal Google accounts. The connection stops working if that account loses access (see [Limitations](#limitations)).
* **Workload Identity Federation** fits production and org-managed data access. The connection is not tied to any individual account: you grant access to a service account through your own Google Cloud IAM, access is auditable, and no long-lived keys are involved. The connection keeps working when people leave the team.

Follow the setup steps below based on how you want to connect BigQuery.

**Connect with Google**

Sign in with your Google account and run queries in a Google Cloud project you choose. No Workload Identity Federation setup is required.

**Prerequisites**

Before connecting BigQuery, make sure you have:

* A **Google account** with access to the BigQuery datasets you want to query
* The **BigQuery Job User** role (`roles/bigquery.jobUser`) on the Google Cloud project that will run your queries
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))

**Connect BigQuery in Lovable**

**1. Open BigQuery in Connectors**

Go to **Connectors** and select **BigQuery**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a clear name (for example `BigQuery Analytics`).

**4. Choose Connect with Google**

Select **Connect with Google**. It is one of two options the form offers, alongside **Use your own credentials**.

**5. Enter the Google Cloud project ID**

In **Google Cloud project ID**, enter the project that runs and is billed for your queries. The connected Google account needs the **BigQuery Job User** role on this project.

The project that runs your queries can be different from the project that stores the data. To read data stored in another project, keep the project that runs your queries in this field and fully qualify table names in your queries, for example `data-project.dataset.table`.

**6. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**7. Connect and authorize**

Click **Connect** at the bottom of the form. The Google sign-in window opens, so make sure your browser doesn’t block pop-ups. Sign in and approve the requested access.

The flow requests the following scope: **View and manage your data in Google BigQuery and see the email address for your Google Account**. The scope is an upper bound, not a grant. What the connection can actually do is decided by the IAM roles of the account you sign in with. Grant roles to match what you’re building:

* **Read-only apps** (dashboards, reporting, data explorers): grant **BigQuery Data Viewer** on your datasets plus **BigQuery Job User** on the project. IAM blocks all writes, so the connection stays read-only even though the scope allows more.
* **Read-write apps** (data entry, writebacks, table management): additionally grant **BigQuery Data Editor** on the datasets your app should change.

Lovable requests this scope instead of Google’s read-only scope (`bigquery.readonly`) because the read-only scope doesn’t support the full BigQuery jobs API.

**Workload Identity Federation**

Grant access to a service account through your own Google Cloud IAM. The connection is not tied to any individual account and uses no long-lived keys. In the connection form, this option is labeled **Use your own credentials**.

**Prerequisites**

Before connecting BigQuery, make sure you have:

* A **Google Cloud project** with the **BigQuery API** enabled and the datasets you want to query
* Your **Lovable workspace ID**, shown in the connection form when you select **Use your own credentials**
* Permission to **create connections** in your Lovable workspace (see [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients))
* These roles on the Google Cloud project. `roles/owner` covers all of them:

  | Role | Needed for |
  | :- | :- |
  | `roles/serviceusage.serviceUsageAdmin` | Enabling the IAM, STS, IAM Credentials, and BigQuery APIs |
  | `roles/iam.workloadIdentityPoolAdmin` | Creating the workload identity pool and OIDC provider |
  | `roles/iam.serviceAccountAdmin` | Creating the service account and granting impersonation on it |
  | `roles/resourcemanager.projectIamAdmin` | Granting BigQuery Job User on the project |
  | `roles/bigquery.dataOwner` | Granting read access on each dataset you expose |

**Step 1: Configure Workload Identity Federation in Google Cloud**

You need a **workload identity pool** and an **OIDC provider** that trusts **Google-issued ID tokens** sent by Lovable’s connector gateway for **your workspace**.

You can complete this setup by running a setup script directly in Google Cloud Shell Editor, or through manual steps in Google Cloud Console (see [**Manual setup in Google Cloud Console**](#manual-setup-in-google-cloud-console)).

For background on the underlying Google Cloud features, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) and [Best practices for using Workload Identity Federation](https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation).

**1. Open Google Cloud Console and search for Cloud Shell Editor**

In the [Google Cloud Console](https://console.cloud.google.com/), search for **Cloud Shell Editor** and open it.

**2. Authorize Cloud Shell to use your credentials**

When prompted, authorize Cloud Shell to use your Google credentials.

**3. Select the correct project**

Make sure the correct Google Cloud project is selected in the Cloud Shell session.

**4. Create a new file, copy in the script, and set the variables**

Create a new file (for example, `setup.sh`), paste the script below into it, and fill in the values at the top.

```bash theme={null}
#!/usr/bin/env bash
set -euo pipefail

# ---- FILL THESE IN ----
GCP_PROJECT="YOUR_GCP_PROJECT_ID"
WORKSPACE_ID="YOUR_WORKSPACE_ID"
ALLOWED_DATASETS=("DATASET_1" "DATASET_2")

# ---- Defaults ----
POOL_ID="lovable"
PROVIDER_ID="lovable-gateway"
SA_NAME="lovable-bigquery"
LOCATION="global"
GATEWAY_SA_EMAIL="connector-gateway@lovable-core-prod.iam.gserviceaccount.com"

# ---- Validate placeholders ----
for VAR in GCP_PROJECT WORKSPACE_ID; do
  if [[ -z "${!VAR}" || "${!VAR}" == YOUR_* ]]; then
    echo "ERROR: set ${VAR} at the top of this script" >&2
    exit 1
  fi
done

if [[ ${#ALLOWED_DATASETS[@]} -eq 0 ]]; then
  echo "ERROR: set ALLOWED_DATASETS at the top of this script" >&2
  exit 1
fi

for DS in "${ALLOWED_DATASETS[@]}"; do
  if [[ -z "${DS}" || "${DS}" == DATASET_* ]]; then
    echo "ERROR: replace the placeholder entries in ALLOWED_DATASETS" >&2
    exit 1
  fi
done

if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 is required to update dataset access" >&2
  exit 1
fi

# ---- Derived ----
SA_EMAIL="${SA_NAME}@${GCP_PROJECT}.iam.gserviceaccount.com"
SUBJECT_TOKEN_AUDIENCE="https://connector-gateway.lovable.dev/workspaces/${WORKSPACE_ID}"

WORK_DIR=$(mktemp -d)
trap 'rm -rf "${WORK_DIR}"' EXIT

# Enable APIs first. Cloud Resource Manager is not enabled by default on
# a new project, and the gcloud projects commands below depend on it.
gcloud services enable \
  iam.googleapis.com sts.googleapis.com \
  iamcredentials.googleapis.com bigquery.googleapis.com \
  cloudresourcemanager.googleapis.com \
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

# Create the OIDC provider, restricted to Lovable’s connector gateway.
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
    echo "Overwriting replaces both values. Any other audience on this provider is dropped."
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
    --display-name="Lovable BigQuery Reader"
fi

# Wait for the service account to become visible to IAM. Reads are
# eventually consistent, so a new service account can take 60s or more
# to appear. Both messages derive from PROPAGATION_TIMEOUT so they
# cannot drift from the time the loop actually spends waiting.
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

# ---- Confirm before granting data access ----
echo ""
echo "Service account ${SA_EMAIL} will be granted:"
echo "  roles/bigquery.jobUser     on project ${GCP_PROJECT}"
echo "  roles/bigquery.dataViewer  on datasets: ${ALLOWED_DATASETS[*]}"
echo ""
REPLY=""
read -r -p "Continue? (Y/n) " REPLY < /dev/tty || REPLY="n"
case "${REPLY}" in
  ""|[Yy]|[Yy][Ee][Ss]) ;;
  *) echo "Aborted."; exit 1 ;;
esac

# Allow the service account to run query jobs
gcloud projects add-iam-policy-binding "${GCP_PROJECT}" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/bigquery.jobUser" --condition=None --quiet

# Grant read access on each dataset. BigQuery has no gcloud command for
# dataset-level IAM, so this updates the dataset access list directly.
for DS in "${ALLOWED_DATASETS[@]}"; do
  echo "Granting read access on ${GCP_PROJECT}:${DS}..."
  DS_JSON="${WORK_DIR}/${DS}.json"

  bq --project_id="${GCP_PROJECT}" show --format=prettyjson \
    "${GCP_PROJECT}:${DS}" > "${DS_JSON}"

  python3 -c '
import json, sys
path, service_account = sys.argv[1], sys.argv[2]
with open(path) as f:
    dataset = json.load(f)
# READER in the access list is the equivalent of roles/bigquery.dataViewer.
access = dataset.setdefault("access", [])
already_granted = any(
    entry.get("userByEmail") == service_account
    and entry.get("role") in ("READER", "roles/bigquery.dataViewer")
    for entry in access
)
if not already_granted:
    access.append({"role": "READER", "userByEmail": service_account})
with open(path, "w") as f:
    json.dump(dataset, f)
' "${DS_JSON}" "${SA_EMAIL}"

  bq --project_id="${GCP_PROJECT}" update --source "${DS_JSON}" "${GCP_PROJECT}:${DS}"
done

# Allow the pool to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${GCP_PROJECT}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_RESOURCE}/attribute.email/${GATEWAY_SA_EMAIL}" \
  --condition=None --quiet

AUDIENCE="//iam.googleapis.com/${POOL_RESOURCE}/providers/${PROVIDER_ID}"

echo ""
echo "=== Paste these into the BigQuery connector in Lovable ==="
echo ""
echo "  WIF Audience:          ${AUDIENCE}"
echo "  Service Account Email: ${SA_EMAIL}"
echo ""
echo "NOTE: IAM bindings can take up to 5 minutes to propagate."
```

> [!WARNING]
>
> `bq update --source` fully replaces the dataset's existing access control list, it does not merge. The script fetches the current ACL first and patches it before applying, so existing entries are preserved. If you run the update manually, make sure all desired entries are present in the JSON file before applying.

**5. Open the terminal and run the script**

In the Cloud Shell terminal, run: `bash setup.sh`

The script prints the **WIF audience** and **Service account email** you need in Step 2.

> **Manual setup in Google Cloud Console**
>
> **1. Create a workload identity pool**
>
> In the [Google Cloud console](https://console.cloud.google.com/), open **IAM & Admin → Workload Identity Federation** and create a pool named `lovable` (or use an existing one).
>
> **2. Add an OIDC provider**
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
> **3. Create a service account for BigQuery access**
>
> Open **IAM & Admin → Service accounts** and create a service account, for example `lovable-bigquery`. This is the identity Lovable impersonates.
>
> **4. Grant the service account access to your data**
>
> Grant **BigQuery Job User** (`roles/bigquery.jobUser`) on the project so the service account can run queries.
>
> Then open each dataset you want to expose in **BigQuery → Sharing → Permissions** and grant **BigQuery Data Viewer** (`roles/bigquery.dataViewer`) to the service account. Grant access only on the datasets your app queries. For apps that write to BigQuery, grant **BigQuery Data Editor** instead on those datasets.
>
> **5. Allow the pool to impersonate the service account**
>
> On the service account, grant **Workload Identity User** (`roles/iam.workloadIdentityUser`) to this principal, replacing `PROJECT_NUMBER` with your Google Cloud project number:
>
> ```text wrap theme={null}
> principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/lovable/attribute.email/connector-gateway@lovable-core-prod.iam.gserviceaccount.com
> ```
>
> This grants impersonation only to the identity carrying Lovable's connector gateway email, which is why the provider maps `attribute.email` above. A pool-wide `/*` principal would work too, but it would also cover any other provider you later add to the same pool.
>
> **6. Copy the workload identity provider resource name**
>
> Open the provider and copy its resource name. It looks like `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/lovable/providers/lovable-gateway`. This string is the **WIF audience** value Lovable expects.

**Step 2: Connect BigQuery in Lovable**

**1. Open BigQuery in Connectors**

Go to **Connectors** and select **BigQuery**.

**2. Add a connection**

Click **Connect** on the connector page.

**3. Name the connection**

In **Display name**, enter a clear name (for example `BigQuery Production` or `Analytics reporting`).

**4. Choose your own credentials**

Select **Use your own credentials**. This is the Workload Identity Federation option, offered alongside **Connect with Google**.

**5. Enter the WIF audience**

In **WIF audience**, paste the **Workload Identity Provider** resource name from Google Cloud (the full `//iam.googleapis.com/projects/.../providers/...` string).

**6. Enter the service account email**

In **Service account email**, enter the service account to impersonate for BigQuery access (for example `bq-reader@your-project.iam.gserviceaccount.com`).

**7. Choose who can use this connection**

Under **Sharing**, the connection is private to you by default and shows a **Private** label. To share it, click **Share with others**. Then add workspace members by email, or click **Invite entire workspace** to make the connection available to everyone in your Lovable workspace.

See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients) for more information.

**8. Create the connection**

Complete the flow to **create** or **verify** the connection. Lovable validates the federation setup through the gateway.

When connected, anyone building in a project can ask Lovable in the project chat to [link their project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project) to BigQuery (based on configured connection-level access). Your Lovable apps can then run SQL queries against your datasets through the connector while you build and after you publish.

## Cost and safety practices

BigQuery charges for **data scanned** by queries (and other usage). When implementing features in the project chat, prefer patterns that:

* Use **`maximumBytesBilled`** (or equivalent) on query jobs so large scans fail **before** running when they would exceed your limit.
* Filter **partitioned** tables on the partition column, avoid `SELECT *` during exploration, and use **`LIMIT`** while iterating.
* Use **INFORMATION\_SCHEMA** and metadata APIs to discover schemas and partitions before heavy scans.

See [BigQuery pricing](https://cloud.google.com/bigquery/pricing) and [best practices for controlling costs](https://cloud.google.com/bigquery/docs/best-practices-costs) in Google’s documentation.

## Limitations

* **One identity per connection**: end users of your app do not sign in with their own Google accounts. A **Connect with Google** connection acts as the single Google account that authorized it, and a **Workload Identity Federation** connection acts as the configured service account.
* **Connect with Google connections depend on that Google account**: if the account loses access to the project, or the authorization is revoked on the Google side (for example, from the account’s third-party access settings), the connection stops working until someone reconnects it in Lovable.
* **Gateway limits** apply as described in [Gateway-based connectors](https://docs.lovable.dev/integrations/app-connectors.md#gateway-based-connectors).
* **IAM and dataset access** are entirely under your control in GCP; Lovable cannot grant access to tables the connected account or service account is not permitted to read.

## Manage your BigQuery connection

Connections are managed from [**Connectors**](https://lovable.dev/dashboard?connectors): select **BigQuery**, then open the connection.

* **Unlink projects** to remove BigQuery access from specific projects while keeping the connection available for others. See [Unlink projects from a connection](https://docs.lovable.dev/integrations/app-connectors.md#unlink-projects-from-a-connection) for the steps.
* **Delete the connection** to remove it from the workspace entirely. Deleting is permanent. It removes the credentials from all linked projects, and app features that use BigQuery stop working until a new connection is added. See [Delete a connection](https://docs.lovable.dev/integrations/app-connectors.md#delete-a-connection) for the steps and who can delete.


## Related topics

- [Connect your app to Google Cloud API](https://docs.lovable.dev/integrations/gcp.md)
- [Connect your app to Firebase Cloud Messaging](https://docs.lovable.dev/integrations/firebase-cloud-messaging.md)
- [Connect your app to Omni](https://docs.lovable.dev/integrations/omni.md)
- [Connect your app to Metabase](https://docs.lovable.dev/integrations/metabase.md)
- [Connect your app to Looker](https://docs.lovable.dev/integrations/looker.md)
