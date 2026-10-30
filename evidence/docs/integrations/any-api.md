# Integrate any API with Lovable
<!-- source: https://docs.lovable.dev/integrations/any-api.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate any API with Lovable

> Connect any external service to your Lovable app, even one without a built-in connector. Create a custom connector so Lovable manages the credentials, or ask Lovable to connect the service directly.

Lovable can connect your app to almost any external service, even one without a built-in connector.

The recommended path is a connector. Use one from the [**Connectors**](https://lovable.dev/dashboard?connectors) catalog, or [create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) when the service is not in it. Connectors route requests through Lovable's [connector gateway](https://docs.lovable.dev/integrations/security.md#gateway-connectors), which:

* Stores the credentials encrypted, outside your app.
* Handles sign-in and token refresh.
* Lets workspace admins and owners control who can use the connection.
* Lets you revoke access in one place.

Lovable can also connect a service directly from your app's code when you ask it to. Your app then owns the credentials and the sign-in code, and the connector controls do not apply. Both paths are available on all plans.

> [!NOTE]
>
> **What is an API?**\
> Lovable connects to a service through its API. API (Application Programming Interface) is a structured way for services or applications to communicate and share data with each other. It defines what you can ask for, what you'll get back, and how to make the request. For example, a weather service's API lets your app ask for the current temperature in a city and get the answer back in a format your app can display.

## Choose how to connect

Compare the three ways to connect a service before you start:

| Use | If you want to |
| :- | :- |
| A **connector from the catalog** | Connect a service Lovable already supports. Lovable manages the credentials, and the connection works in the project chat and in your published app. |
| A **custom connector** | Connect a service that is not in the catalog and needs an API key or OAuth sign-in. You define it once, and everyone in your workspace can use it with the same managed credentials. |
| A **direct integration** | Call a service that needs no credentials, or control every detail of how your app calls a service and manage the key in your project's secrets yourself. |

The service needs to be reachable from the internet. Lovable cannot reach a service that only accepts requests from inside your private network.

## Services without authentication

A service without credentials needs no connector and no setup. Ask Lovable to connect it. For example:

```text wrap theme={null}
Integrate Chuck Norris Jokes: https://api.chucknorris.io/jokes/random
```

Lovable detects that no key is required and adds the feature directly to your app.

## Services that require an API key

### Recommended: create a custom connector

A custom connector adds the service to your workspace's connector catalog, and its requests go through the connector gateway. The API key, client secret, or OAuth credentials are stored encrypted in the gateway and added to requests server-side, so they do not appear in your project's code or chat.

**1. Create the connector**

Open [**Connectors**](https://lovable.dev/dashboard?connectors), select **Add custom**, and choose **Custom connector**. Enter the service's API details and authentication method. See [Create a custom connector](https://docs.lovable.dev/integrations/create-connector.md) for every field. Creating a connector requires the workspace admin or owner role.

**2. Connect and link it**

Connect to the new connector with the service's credentials, then ask Lovable in the project chat to link the connection to your project and build the feature. See [Link a connection to a project](https://docs.lovable.dev/integrations/app-connectors.md#link-a-connection-to-a-project).

### Alternative: connect the service directly

If you would rather not create a connector, Lovable can write the integration into your app. Your app then owns the key and the request code, and the connector gateway is not involved.

Lovable stores the API key, client secret, or access token as a [secret](https://docs.lovable.dev/features/secrets.md) and writes server-side code that reads it, so visitors to your app cannot see it. In newer apps on [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start.md) (created from May 13, 2026, or June 22, 2026 on Enterprise plans), Lovable writes a server function. In older React + Vite apps, it writes an Edge Function in the built-in backend.

Keys that a provider designs for browser use, such as a Google Maps Platform browser key, are the exception. They belong in your app's frontend code, and you restrict them to your domains. See [Domain restrictions](https://docs.lovable.dev/integrations/security.md#domain-restrictions).

**1. Describe the service to Lovable**

Ask Lovable to connect the service and include these details about its API:

* Endpoint URLs and HTTP methods
* Authentication method (API key header, query parameter, Bearer token, or OAuth)
* Required headers (Content-Type, custom headers)
* Request and response format examples (JSON, parameters, bodies)
* OpenAPI specification or documentation link

**2. Enable the built-in backend in older apps**

In an older React + Vite app, enable the [built-in backend](https://docs.lovable.dev/features/cloud). Newer apps need no extra setup.

**3. Enter the API key**

When Lovable asks for the key, enter it in the **Add secret** form rather than typing it in the chat. Lovable saves the value directly to your project's secrets, so it stays out of your chat history. You can also manage secrets under **More → Settings → Secrets**. See [Understanding a secret prompt](https://docs.lovable.dev/features/secrets.md#understanding-a-secret-prompt).

For example:

```text wrap theme={null}
Integrate the OpenWeatherMap API. 
Base URL: https://api.openweathermap.org/data/2.5. 
Auth: API key passed as a query parameter appid. 
I need an endpoint to fetch the current weather: GET /weather?q={city}&units=metric&appid={API_KEY}. 
Docs: https://openweathermap.org/current
```

Lovable generates the server-side integration and a weather widget where users can enter a city and fetch weather data.

## Embed feeds and widgets

Not every external service needs an API call. Many services offer embeddable widgets, for example review walls, maps, and booking calendars. Paste the embed code in the project chat and ask Lovable to place it, and Lovable adds the widget to your app.

Social media feeds need more care, because the platforms limit what an app can read from their APIs, and the rules differ by platform and by whether the accounts are your own. Tell Lovable what you want to show, and Lovable recommends the setup: a curated wall of individual posts you paste in, an aggregator service's embed code, or the platform's official API for your own accounts.

```text wrap theme={null}
Add a section to the homepage that shows the latest posts from our own Instagram and TikTok accounts. Recommend the simplest setup that keeps the feed updated, and tell me which accounts or credentials you need from me.
```

Some social platforms have a built-in connector that reads your own account, for example [TikTok](https://docs.lovable.dev/integrations/tiktok.md) and [X (Twitter)](https://docs.lovable.dev/integrations/x.md).

## API access for the project chat

Connecting a service this way adds functionality to your **app**. If you instead want Lovable to read from a tool as context **while building**, and the tool is not in the connector catalog, connect it as a [custom MCP server](https://docs.lovable.dev/integrations/custom-mcp.md).

## FAQ

> **Can Lovable integrate with any API?**
>
> Almost any. The service must be reachable from the internet, and its API must offer the operation you need. Use a connector from the catalog or create a custom connector, so requests go through the connector gateway and Lovable manages the credentials. Lovable can also connect a service directly from your app's code when you ask it to.

> **Can I show an Instagram or other social media feed in my app?**
>
> Yes. Social platforms limit what an app can read from their APIs, and the rules differ by platform and by whether the accounts are your own. Tell Lovable which platforms and accounts you want to show, and Lovable recommends one of these setups:
>
> * A curated wall of individual posts you paste in
> * An aggregator service's embed code
> * The platform's official API, for your own accounts
>
> Some platforms have a built-in connector, for example [TikTok](https://docs.lovable.dev/integrations/tiktok.md) and [X](https://docs.lovable.dev/integrations/x.md).

> **Where are my API keys stored?**
>
> With a connector, in the connector gateway's encrypted secret storage, outside your app. The gateway adds the credentials to each request server-side, so they do not appear in your project's code or chat.
>
> With a direct integration, in your project's [secrets](https://docs.lovable.dev/features/secrets.md). Server-side code reads them, so private keys are not sent to the browser. Keys that a provider designs for browser use are the exception and are placed in your app's frontend code with [domain restrictions](https://docs.lovable.dev/integrations/security.md#domain-restrictions). To view or update project secrets, see [Manage secrets](https://docs.lovable.dev/features/secrets.md#manage-secrets).

> **Do I need the built-in backend to integrate an API?**
>
> Not with a connector: the connector gateway handles the credentials. With a direct integration, only older React + Vite apps need the built-in backend, and only for services that need credentials. Newer apps store secrets and run server functions without it.


## Related topics

- [Lovable connectors: Connect tools, services, and APIs](https://docs.lovable.dev/integrations/introduction.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect your app to AWS API](https://docs.lovable.dev/integrations/aws.md)
- [Connect your app to the Lovable API](https://docs.lovable.dev/integrations/lovable-api-connector.md)
