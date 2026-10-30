# Set up your Microsoft tenant for Copilot Managed Runtime
<!-- source: https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime-tenant-setup.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up your Microsoft tenant for Copilot Managed Runtime

> The one-time setup a Microsoft tenant admin completes so builders can publish Lovable apps into your organization using Copilot Managed Runtime.

> [!NOTE]
>
> The Microsoft Copilot Managed Runtime connector is available on Business and Enterprise plans. It is rolling out gradually, so it may not be available in your workspace yet.

Before anyone in your organization can publish Lovable apps to Microsoft Copilot Managed Runtime, a tenant admin completes a one-time setup: consent to the Lovable application in Microsoft Entra, and allow externally built apps in your environments. The whole setup takes about 20 minutes. A Lovable workspace admin also enables the connector in Lovable, described in [Set up your Lovable workspace](#set-up-your-lovable-workspace).

This page is for IT admins. If you are a builder, see [Build and publish apps to Microsoft Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime.md).

For Microsoft's own admin guidance, see [Microsoft Copilot Managed Runtime overview and key concepts for admins](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/apps/) and [What is Microsoft Copilot Managed Runtime](https://learn.microsoft.com/en-us/microsoft-365/managed-apps/).

## What you are consenting to

Lovable connects to your tenant through a single dedicated Microsoft Entra enterprise application. All of its permissions are user-delegated. Lovable acts only on behalf of the signed-in user, with that user's own rights, to create the app, deploy it, and connect the data sources the user chooses.

* Lovable receives no admin access to your tenant and holds no application-level permissions.
* Lovable can never do more than the signed-in user is already allowed to do under your policies.
* You can revoke consent at any time in Microsoft Entra, which immediately blocks new access.

## Step 1: Add the Lovable application and grant admin consent

Users sign in with their organizational Microsoft Entra identity when they connect Lovable. For this to work, a tenant admin first adds Lovable as an enterprise application and grants admin consent for the whole organization. Both paths below produce the same result: one enterprise application named **Lovable managed apps**, consented for every user in your tenant.

> [!NOTE]
>
> The enterprise application is listed as **Lovable managed apps** in Microsoft Entra and in the Microsoft Entra App Gallery. Inside Lovable, the same connection appears as **Microsoft Copilot Managed Runtime**.

### Option A: Add it from the Microsoft Entra App Gallery

Use this path to find and approve the application from Microsoft's catalog. It signs you in to Lovable along the way and creates a Lovable connection for your own account.

**1. Find the application**

In the [Microsoft Entra admin center](https://entra.microsoft.com), go to **Identity → Applications → Enterprise applications → New application** and search for **Lovable managed apps**. Two Lovable listings exist. Pick **Lovable managed apps**, not **Lovable SSO**, which is sign-in to the Lovable product itself.

**2. Sign up from the tile**

Open the tile and select **Sign up for Lovable managed apps**. The gallery offers no Create button for this application. Adding it happens through the sign-up flow.

**3. Connect in Lovable**

The link opens Lovable's connection setup. Sign in to Lovable if asked, leave **Environment ID** empty unless you decided on a specific environment in [step 3](#step-3-decide-where-apps-are-created), and select **Connect**.

**4. Consent for your organization**

Sign in with your Microsoft work account and review the permissions. Tick **Consent on behalf of your organization**, then select **Accept**. Without the checkbox, consent applies to your account only, and every other builder is asked for admin approval when they connect.

When you reopen the tile afterwards, it reports that **Lovable managed apps has already been added** and the sign-up button is disabled. This is expected. Each tenant holds one instance of the application, and builders connect from inside Lovable from here on.

### Option B: Use the admin consent URL

Use this path if you do not want a Lovable account, if you automate tenant onboarding, or if the gallery is not available to your tenant. It grants consent for your whole organization without opening Lovable.

**1. Get your tenant ID**

Find your Microsoft Entra tenant ID in the [Microsoft Entra admin center](https://entra.microsoft.com).

**2. Open the admin consent URL**

Replace `{tenant-id}` in the following URL with your tenant ID, and open it in a browser:

```text wrap theme={null}
https://login.microsoftonline.com/{tenant-id}/adminconsent?client_id=2679639a-43b1-48b5-add7-85cedd49f1fc
```

**3. Review and accept**

Sign in as a tenant admin and review the consent screen. It lists the permissions Lovable uses to create, deploy, and run apps in Copilot Managed Runtime on a user's behalf. Accept to add **Lovable managed apps** to your tenant.

> [!WARNING]
>
> If you skip this step, builders' Microsoft sign-in fails when they try to connect Lovable.

Most enterprise tenants restrict user consent. Granting admin consent up front prevents every builder from being blocked at sign-in. If consent was granted for a single account by mistake, open the admin consent URL above, or go to **Enterprise applications → Lovable managed apps → Permissions** and select **Grant admin consent**.

## Step 2: Allow external artifact deployment

Lovable compiles apps outside Microsoft's platform, so your environments need one policy change to accept them.

**1. Open environment group rules**

Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com) and go to **Manage → Environment groups → GreenZone → Rules**.

**2. Enable the rule**

Find the **Allow external artifact deployment** rule, enable it, and save.

If your organization uses other environment groups for environments where people build, enable the rule for those groups too.

## Step 3: Decide where apps are created

When a builder publishes for the first time, Microsoft creates an environment under their identity. Each builder gets one environment, it holds all of their projects, and Microsoft reuses it on later publishes. These environments are created without Dataverse.

You have two levers:

* **Let builders use their own environments.** Check that your nominated builders are allowed to create environments under **Settings → Tenant settings → Developer environment assignments** in the Power Platform admin center.
* **Target a specific environment instead.** Create or pick an environment, and give its environment ID to your builders. They paste it into the **Environment ID** field when they set up their Lovable connection, and apps are created there instead.

## Review connector and data policies

Apps in Copilot Managed Runtime reach data through [connectors published by Microsoft](https://learn.microsoft.com/en-us/connectors/connector-reference/connector-reference-microsoft-connectors) in the app's environment, so your existing data policies apply to them at runtime. Review the data policies for the environments your builders will use, and confirm the connectors they plan on (for example SharePoint, Outlook, Excel Online, or Dataverse) are allowed there.

Database connectors such as SQL Server need a connection created upfront, with credentials, at **make.powerapps.com → Connections** in the app's environment.

## Network requirements

Allow these domains through proxies, firewalls, and browser policies for everyone who builds or uses apps in Copilot Managed Runtime:

* `lovable.dev` and subdomains
* `login.microsoftonline.com`
* `*.powerapps.com`
* `*.managedapps.cloud.microsoft`
* `*.lovable.app`
* `*.lovableproject.com`

The in-editor preview runs inside the Copilot Managed Runtime host as an embedded frame. Proxies that inspect TLS traffic or browser policies that strip embedded third-party content break the preview silently. Include a builder on your normal corporate network in your first test.

**Conditional Access.** Your Conditional Access, multi-factor authentication, and identity protection policies apply when a builder signs in and consents. After consent, Lovable refreshes access server-side from its own infrastructure. If you enforce location-based or device-based Conditional Access, test those policies with a real builder sign-in before rolling out.

## Licensing

Builders need permission to create apps in your environments. People who open a published app need the Microsoft license your organization uses for Copilot Managed Runtime. Confirm current requirements with your Microsoft contact, since licensing for Copilot Managed Runtime is set by Microsoft, not Lovable.

## Set up your Lovable workspace

Microsoft tenant setup is one half of the admin work, and a Lovable workspace admin completes the other half. The Microsoft Copilot Managed Runtime connector is available on Business and Enterprise plans, and it is rolling out gradually, so it may not be available in your Lovable workspace yet.

1. Choose who can create Microsoft Copilot Managed Runtime connections. Go to **Connectors → Admin settings → App + chat connectors** and pick **No one**, **Admins**, or **Editors & admins** for the connector. The setting doubles as the availability switch. On Business and Enterprise plans it starts at **Admins**. Some Enterprise workspaces start at **No one**, so the connector stays disabled until you change it. See [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients).
2. Each builder creates their own connection with their own Microsoft sign-in, and controls who can use it. Connection access also gates project sharing: teammates need access to a project's connection to work in that project. See [Who can use connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-use-connections-and-clients).

## Governance and auditing

Published apps in Copilot Managed Runtime behave like any other app in your Microsoft estate:

* They appear in your admin inventory, and you manage their lifecycle there, including sharing and deletion.
* Your data loss prevention and connector policies are enforced at runtime.
* App activity flows into your Microsoft audit logs.
* End users' runtime activity in published apps stays in your Microsoft estate. It does not flow back to Lovable.

Lovable's own record of a project (its source code and chat history) stays in Lovable, governed by your Lovable workspace settings.

## Revoke access

To remove Lovable's access to your tenant:

1. In the Microsoft Entra admin center, go to **Enterprise applications → Lovable managed apps** and delete the application or its permissions. This immediately blocks new access. Access already granted expires within about an hour.
2. Have builders remove their Microsoft connections in Lovable, which deletes the stored grant.
3. Delete or reassign published apps and environments in the Power Platform admin center. Removing apps there is the authoritative teardown. Lovable cannot remove an app from your tenant.

## Troubleshooting

> **The gallery says the application has already been added**
>
> Once the enterprise application exists in your tenant, the tile reports **Lovable managed apps has already been added** and disables sign-up. Nothing is wrong. Builders connect from inside Lovable, and you manage the application under **Enterprise applications**. If builders still see **Needs admin approval**, consent was granted for one account only. Grant it for the organization under **Enterprise applications → Lovable managed apps → Permissions → Grant admin consent**, or use the admin consent URL from [step 1](#step-1-add-the-lovable-application-and-grant-admin-consent).

> **The Lovable application does not appear in the Entra gallery**
>
> The listing is available in the Microsoft commercial cloud. Tenants in national clouds, such as Azure Government or Microsoft Azure operated by 21Vianet, and tenants that restrict gallery browsing do not see it. Use the admin consent URL from [step 1](#step-1-add-the-lovable-application-and-grant-admin-consent) instead, which works regardless of gallery visibility.

> **Builders' sign-in fails when connecting Lovable**
>
> Admin consent has not been granted, or was granted after the builder's first attempt. Complete [step 1](#step-1-add-the-lovable-application-and-grant-admin-consent), then have the builder retry the connection.

> **Builders cannot find the connector in Lovable**
>
> The connector is rolling out gradually on Business and Enterprise plans, so it may not be available in your Lovable workspace yet. If it is available, check the connector's [Who can create connections and clients](https://docs.lovable.dev/integrations/admin-controls.md#who-can-create-connections-and-clients) setting. If it is set to **No one**, members cannot see the connector. A Lovable workspace admin or owner changes it under **Connectors → Admin settings → App + chat connectors**.

> **Publishing fails with an environment error**
>
> Check that the target environment allows external artifact deployment ([step 2](#step-2-allow-external-artifact-deployment)), and that the builder either can create an environment or has a valid environment ID in their connection ([step 3](#step-3-decide-where-apps-are-created)).


## Related topics

- [Build and publish apps to Microsoft Copilot Managed Runtime](https://docs.lovable.dev/integrations/microsoft-copilot-managed-runtime.md)
- [Set up enterprise-managed authentication](https://docs.lovable.dev/features/enterprise-managed-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Set up SCIM user provisioning](https://docs.lovable.dev/features/business/scim.md)
- [Set up workspace single sign-on (SSO)](https://docs.lovable.dev/features/business/sso.md)
