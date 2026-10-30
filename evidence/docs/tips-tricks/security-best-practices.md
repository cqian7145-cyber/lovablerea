# Security best practices for Lovable apps
<!-- source: https://docs.lovable.dev/tips-tricks/security-best-practices.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Security best practices for Lovable apps

> Secure coding best practices for Lovable apps, including frontend security, Edge Functions, row-level security (RLS), authentication, and workspace protection.

This page focuses on **how to write secure code for Lovable apps** and avoid common security mistakes during development.

For details on Lovable’s security model, security scans, and findings, see [Security overview](https://docs.lovable.dev/features/security), [Project security view](https://docs.lovable.dev/features/security-view.md), and the [Workspace security center](https://docs.lovable.dev/features/security-center).

## How Lovable apps are structured

Lovable apps are built with a clear separation of responsibilities:

* **Frontend** runs in the user’s browser, where users can inspect or change it
* **Backend code** runs server-side and handles validation, authentication, and business logic, as Edge Functions, TanStack Start server functions, or API routes depending on your project
* **Database** uses PostgreSQL with row-level security (RLS) to enforce data access

This separation is the foundation of Lovable’s security model. The sections below follow this structure and highlight common security mistakes at each layer and how to avoid them.

## Frontend security basics

All frontend code runs in the user’s browser and can be inspected, modified, or bypassed. Frontend code should never make security decisions.

### Do not store secrets in frontend code

Store sensitive values in [Secrets](https://docs.lovable.dev/features/secrets.md) instead, which also explains what belongs in `.env` versus a secret.

Secrets stored in frontend code are visible to users and should be considered compromised.

```typescript theme={null}
// ❌ Wrong: secrets exposed to anyone
const API_KEY = "sk-1234567890abcdef";
const STRIPE_SECRET = "sk_live_...";
```

**Instead**: Ask Lovable to add secrets securely. Read secrets only in server-side code, and keep their values out of responses and logs.

**Example prompts**

```text wrap theme={null}
Add an API key for Stripe payments securely without exposing it in the frontend code
```

```text wrap theme={null}
Review frontend code for exposed secrets, API keys, or sensitive information
```

### Do not rely on frontend validation for security

Frontend validation improves user experience but provides no security guarantees.

```typescript theme={null}
// ❌ Wrong: client-side validation can be bypassed
const validateUser = (userData) => userData.email.includes("@");
```

**Instead**: Validate incoming data in server-side code before using it.

**Always treat client input as untrusted.** Validate formats, enforce business rules, and handle inputs safely on the server before processing or storing data.

**Example prompts**

```text wrap theme={null}
Move validation logic from React components to server-side code for better security
```

```text wrap theme={null}
Identify client-side validation that should be moved to the backend
```

## Backend security with server-side code

Edge Functions run on the server, so you can use them for sensitive logic and credentials. TanStack Start projects can also use server functions and API routes. Every server function or API route must check who is calling and whether they may perform the action.

Put authorization, input validation, and calls that require private credentials in server-side code. A function running on the server is still callable by a client, so server-side execution alone does not make the operation private.

Use server-side code to handle:

* **Authentication and authorization**\
  Verify who is making a request and whether they are allowed to perform the action.
* **Data validation and sanitization**\
  Treat all input as untrusted and enforce business rules consistently.
* **Business logic and workflows**\
  Handle multi-step processes like registrations, payments, approvals, and state transitions.
* **Integration with external services**\
  Call third-party APIs securely and keep credentials out of the browser.
* **Sensitive data processing**\
  Process personal or financial data safely, avoid exposing it unintentionally, and log important security events.

Apply these checks to every relevant endpoint, including functions called directly without going through your app’s UI.

**Example prompts**

```text wrap theme={null}
Create a server-side function for user registration with proper validation and security checks
```

```text wrap theme={null}
Move payment processing logic from the frontend to a secure server-side function
```

```text wrap theme={null}
Build a server-side file upload handler with type and size validation
```

## Database security with RLS

You can inspect every policy in your project under **More → Database → Manage → Policies** ([details](https://docs.lovable.dev/features/database-access.md#row-level-security-rls-policies)).

Row-level security (RLS) controls who can read or modify individual rows in your database. It applies to requests your app makes on behalf of a signed-in or anonymous user. Server-side code that uses the service role, the privileged database access your backend has, bypasses RLS, so that code must check permissions itself.

Lovable sets up basic RLS policies automatically, but you should review and adjust them early in development. RLS is much easier to change before real data exists, and policies are most effective when they stay focused on access control rather than complex business logic.

### Common RLS patterns

Most Lovable apps fit into a small set of access patterns:

* **Personal data**: users can access only their own data
* **Team-based access**: team members share access to team data
* **Public content with ownership**: anyone can read, only owners can modify
* **Organization-based access**: users access data within their organization

Design your tables and policies around these patterns whenever possible.

### RLS checks before publishing

Before going live, verify:

* RLS is enabled on all sensitive tables
* Users cannot access other users’ private data
* Shared and public data behaves as intended
* New tables are not missing policies

Review RLS-related findings in [Project security view](https://docs.lovable.dev/features/security-view.md).

**Example prompts**

```text wrap theme={null}
Review RLS policies to ensure users can only access their own data and shared data is properly protected
```

```text wrap theme={null}
Add RLS policies to the settings table so users can only access their own settings
```

```text wrap theme={null}
Set up RLS for teams and projects so team members only see projects from their team
```

## Authentication security basics

All authentication decisions must happen server-side, not in the browser. Client-side authentication checks can be inspected, modified, or bypassed by users and should never be relied on for access control.

Enforce authentication in server-side code, where sessions and tokens can be verified securely and consistently.

```typescript theme={null}
// ❌ Wrong: client-side authentication checks
const isAuthenticated = localStorage.getItem("authToken") !== null;
if (isAuthenticated) showAdminPanel();
```

```typescript theme={null}
// ✅ Correct: server-side validation
const { user } = await supabase.auth.getUser();
if (!user) {
  return new Response("Unauthorized", { status: 401 });
}
```

**Authentication best practices**

* Validate authentication and session tokens in server-side code
* Check roles and permissions server-side
* Use built-in session management for secure token handling
* Redirect users to login when sessions expire, but always validate on the server first
* Use frontend auth state only to control UI, never to enforce access

## Workspace security

For applications that should not be publicly accessible:

* Set [project access](https://docs.lovable.dev/features/project-visibility.md) to **workspace**
* Verify the app is not [published](https://docs.lovable.dev/features/publish.md) publicly
* Require authentication even for internal tools
* Regularly audit who has access

For workspace-wide monitoring, use the [Security center](https://docs.lovable.dev/features/security-center).

## Security checklist before publishing

Before publishing your app, confirm:

* No secrets exist in frontend code
* All validation and critical logic runs in server-side code
* Row-level security (RLS) policies are configured and tested
* Authentication is enforced server-side
* Internal apps have workspace visibility
* All critical findings in the [Security view](https://docs.lovable.dev/features/security-view.md) are addressed
* External API calls happen server-side

> [!TIP]
>
> **Security is an ongoing process**.
>
> Review these practices whenever you add features, change authentication, modify data access, or introduce new external integrations.
>
> Regularly reviewing server-side code, row-level security policies, and authentication flows helps prevent regressions over time.


## Related topics

- [Security overview](https://docs.lovable.dev/features/security.md)
- [Project security view](https://docs.lovable.dev/features/security-view.md)
- [Workspace security center](https://docs.lovable.dev/features/security-center.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
