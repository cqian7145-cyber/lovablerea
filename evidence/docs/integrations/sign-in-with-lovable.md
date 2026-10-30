# Sign in with Lovable
<!-- source: https://docs.lovable.dev/integrations/sign-in-with-lovable.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Sign in with Lovable

> Let people sign in to your site with their Lovable account, with a drop-in button or the standard OpenID Connect flow. Available on all plans.

Put a **Sign in with Lovable** button on your site, and people can sign in with the Lovable account they already have.

When someone signs in, your site gets their name, email address, and picture, depending on which of those you ask for.

> [!NOTE]
>
> This page is about a website or app you did not build with Lovable. For an app built with Lovable, enable **Sign in with Lovable** under **More → Users → Settings** instead. Lovable registers the OAuth client for you.

There are two ways to add it. The **SDK** is one script tag that draws the button and handles the sign-in for you, which is the fastest path for a site without a server. **OpenID Connect** is the standard sign-in protocol behind that button, and you can drive it from your own server or any OpenID Connect library when you want full control.

Sign in with Lovable works on all plans and costs nothing to use.

## Before you start

Both paths start from an **OAuth client**, which is how Lovable knows the sign-in request came from your site. A workspace owner or admin registers one under **Workspace settings → API keys & OAuth → OAuth clients**, following [Register an OAuth client](https://docs.lovable.dev/features/oauth-clients.md#register-an-oauth-client). Registering gives you a **client ID**, and for a Web server client a **client secret**.

Three choices during registration decide how the rest of this page applies to you:

* **Application type**. Choose **Single-page app** when the sign-in finishes in the browser, which is the case for the SDK on a site without a server. Choose **Web server** when your own server exchanges the sign-in code, which is the case for the OpenID Connect flow below. A Web server client gets a client secret that stays on your server. You cannot change the type after registration.
* **Redirect URIs**. For the SDK, list your site's address up to the domain (and port, if any), with nothing after it and no slash at the end, for example `https://example.com`. The page the button is on does not matter. For the OpenID Connect flow, list the full address of the page people come back to, for example `https://example.com/callback`. Lovable only sends people back to addresses you listed.
* **Scopes**. Select `openid`, and add `profile` for the name and picture, `email` for the email address, and `offline` to keep people signed in past the first hour. The [scope reference](https://docs.lovable.dev/features/oauth-clients.md#available-scopes) describes each one.

> [!NOTE]
>
> Your site needs to use `https`. The exception is a local address while you build on your own computer, such as `http://localhost:5173`, where the port number has to match exactly.

## Choose how to sign people in

Pick the path that matches your site. Both end with the same result: you know who signed in.

| Use | If |
| - | - |
| [The SDK](#add-the-button-with-the-sdk) | Your site has no server of its own, or you want a working button in a few minutes. |
| [OpenID Connect directly](#sign-in-with-openid-connect-directly) | Your site has a server, your framework already has an OpenID Connect library, or you want to control every step. |

## Add the button with the SDK

The SDK is one file served from Lovable. It draws the button, opens the Lovable sign-in window, and hands your page the signed-in person's details.

### Add the script

Paste this into your page:

```html theme={null}
<script type="text/javascript" src="https://sdks.lovable.dev/sign-in-with-lovable/index.js"></script>
```

The button's look and the Lovable logo come with it, so there is no stylesheet or image to add.

### Add your client ID and the button

Put your client ID in the page's `<head>`, and an empty `<div>` wherever you want the button. The script finds both and draws the button for you:

```html theme={null}
<html>
  <head>
    <meta name="lovable-signin-client-id" content="YOUR_CLIENT_ID" />
    <meta name="lovable-signin-scope" content="openid profile email offline" />
  </head>
  <body>
    <div id="lovable-signin" data-color="dark" data-type="continue"></div>
    <script type="text/javascript" src="https://sdks.lovable.dev/sign-in-with-lovable/index.js"></script>
  </body>
</html>
```

The `scope` line lists what you are asking the person to share. They see the list and agree to it before anything is shared. Separate each one with a space, ask only for what you use, and always include `openid`. Every scope you ask for has to be registered on the client.

### Set it in JavaScript instead

If you would rather not use the `<head>`, set it in code. Drawing the button is then up to you:

```html theme={null}
<body>
  <script type="text/javascript" src="https://sdks.lovable.dev/sign-in-with-lovable/index.js"></script>
  <div id="lovable-signin" data-color="dark" data-type="continue"></div>
  <script type="text/javascript">
    LovableID.auth.init({
      clientId: "YOUR_CLIENT_ID",
      scope: "openid profile email offline",
    });

    LovableID.auth.renderButton();
  </script>
</body>
```

You can mix the two. Anything you set in code wins, and anything you leave out falls back to the `<head>` tags, so setting only the scope in code keeps the client ID from the `<head>`.

### Change how the button looks

Add attributes to the `<div>` to change the button. The wording and the logo stay Lovable's, so people recognize it immediately. The examples on this page use **Continue with Lovable**, which fits both new and returning people, since anyone without an account creates one during the sign-in. Use `signin` or `signup` when your page is only ever one of those. The buttons below are drawn by the SDK itself, so they always show the current look. Clicking them does nothing on this page.

`data-type="continue" data-color="dark"`

`data-type="signin" data-color="dark"`

`data-type="signup"`

`data-full-width="true"`

`data-label="Join with Lovable" data-color="dark"`

| Attribute | Changes | Values |
| - | - | - |
| `data-type` | The wording | `continue`, `signin` (default), `signup` |
| `data-color` | The color | `light` (default), `dark` |
| `data-full-width` | Whether it stretches to fill the space around it | `true` |
| `data-label` | The wording, to anything you want | Any text |

If none of these match your site, use your own button. Call `LovableID.auth.signIn()` from its click handler to start the sign-in.

### Get the signed-in user's details

Clicking the button opens a Lovable sign-in window. The person signs in there, the window closes, and the SDK fires an event on your page with their details:

```js theme={null}
document.addEventListener("LovableSignInOnSuccess", (event) => {
  console.log(event.detail.user);
});

document.addEventListener("LovableSignInOnFailure", (event) => {
  console.log(event.detail.code);
});
```

`event.detail.user` holds what you asked for:

```json theme={null}
{
  "sub": "string",
  "email": "string",
  "emailVerified": true,
  "name": "string",
  "picture": "string"
}
```

`sub` never changes for that person, so it is the one to save if you keep your own records. Their name or email can change, so do not rely on those to tell people apart.

`event.detail.code` tells you why a sign-in did not finish. Usually it is something ordinary: the person closed the window, decided not to continue, or their browser blocked the window. Any other code means Lovable could not complete the sign-in safely, and nobody is signed in either way.

The sign-in is remembered in their browser, so refreshing the page keeps them signed in. To check at any point:

```js theme={null}
const user = LovableID.auth.getInstance().getUser();
```

If your site has a server, you can still use the SDK for the button alone. Point it at a page on your server and let the server run the [OpenID Connect flow](#sign-in-with-openid-connect-directly). Nothing about the sign-in is then kept in the browser:

```js theme={null}
LovableID.auth.renderButton({ onClick: () => (window.location.href = "/login") });
```

## Sign in with OpenID Connect directly

Sign in with Lovable is a standard OpenID Connect provider, so any OpenID Connect library works with it: configure the library with the discovery document at `https://lovable.dev/oauth/.well-known/openid-configuration`, your client ID, your redirect URI, and the scopes. The steps below are what the library, or your own code, does. They use the **authorization code** flow with **PKCE**, which Lovable requires for every client, including Web server clients with a secret.

The endpoints these steps call are listed under [OAuth endpoints](https://docs.lovable.dev/features/oauth-clients.md#oauth-endpoints).

**1. Prepare the request**

Before each sign-in, generate three random values and keep them on your side until the person comes back:

* `state`, which ties the response to this sign-in attempt so another site cannot inject a code into your callback.
* `nonce`, which Lovable copies into the ID token so you can tell it was issued for this attempt.
* A PKCE `code_verifier`, 43 to 128 characters, and its `code_challenge`, the Base64URL-encoded SHA-256 hash of the verifier.

A server keeps them in the person's session. A browser app keeps them in session storage.

**2. Send the person to Lovable**

Redirect the browser to the authorization endpoint with your client ID and the values you prepared:

```text theme={null}
https://lovable.dev/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://example.com/callback
  &response_type=code
  &scope=openid%20profile%20email
  &state=STATE
  &nonce=NONCE
  &code_challenge=CODE_CHALLENGE
  &code_challenge_method=S256
```

The redirect URI has to match one registered on the client exactly, and every scope has to be registered too. Add `offline` to the scope to receive a refresh token. The person signs in to Lovable and sees the list of what you are asking for.

**3. Receive the code**

Lovable sends the person back to your redirect URI with a one-time code:

```text theme={null}
https://example.com/callback?code=CODE&state=STATE
```

Check that `state` is the one you generated for this attempt and use it only once. If the person declined, the response carries `error=access_denied` and an `error_description` instead of a code, and nobody is signed in.

**4. Exchange the code for tokens**

From your server, or from the browser for a Single-page app client, post the code to the token endpoint within 10 minutes of receiving it:

```bash theme={null}
curl -X POST https://lovable.dev/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d grant_type=authorization_code \
  -d code=CODE \
  -d redirect_uri=https://example.com/callback \
  -d code_verifier=CODE_VERIFIER
```

A Web server client authenticates with its secret, either as HTTP Basic credentials as shown or as a `client_secret` form field. A Single-page app client has no secret and sends `client_id` as a form field instead. The `redirect_uri` has to be the one from the authorization request.

The response is JSON:

```json theme={null}
{
  "access_token": "string",
  "token_type": "bearer",
  "expires_in": 3600,
  "id_token": "string",
  "refresh_token": "string",
  "scope": "openid profile email offline"
}
```

`refresh_token` is present only when you asked for `offline`.

**5. Read who signed in**

The `id_token` is a signed JWT that identifies the person. Verify it before trusting it: the signature against the keys at `https://lovable.dev/oauth/keys`, `iss` equal to `https://lovable.dev/oauth`, `aud` containing your client ID, `exp` in the future, and `nonce` equal to the one you generated. An OpenID Connect library does this for you.

Its claims are the same details the SDK hands your page: `sub`, `email`, `email_verified`, `name`, and `picture`, each present when you asked for the matching scope. Save `sub` as the person's identifier, because it never changes for them.

You can also send the access token as a bearer token to `https://lovable.dev/oauth/userinfo` to get the same claims as JSON.

> [!TIP]
>
> Sign the person in to your site the way you normally would, for example by setting your own session cookie. The sign-in with Lovable is complete.

### Keep people signed in

An access token lasts 1 hour. With `offline` in the scope you also get a refresh token, which you exchange for a new access token without sending the person back to Lovable:

```bash theme={null}
curl -X POST https://lovable.dev/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d grant_type=refresh_token \
  -d refresh_token=REFRESH_TOKEN
```

The response has the same shape as the first token response. It may or may not include a new `refresh_token`; when it does, store it and use it from then on. When a refresh fails because the refresh token has expired, the person signs in again. A Single-page app client sends `client_id` as a form field instead of the Basic credentials.

When someone signs out, post the refresh token to `https://lovable.dev/oauth/revoke` with the same client credentials so it stops working on Lovable's side too.

> [!WARNING]
>
> A client secret is a credential for your site. Keep it on your server. Anything in your page's HTML or JavaScript can be read by everyone who visits, which is why a browser-only site registers a Single-page app client and relies on PKCE instead.

## FAQ

> **Do I need the SDK?**
>
> No. The SDK is a convenience for sites without a server. Any OpenID Connect library, or your own code following [Sign in with OpenID Connect directly](#sign-in-with-openid-connect-directly), signs people in the same way and gets the same details.

> **Do people need a Lovable account already?**
>
> Yes, though anyone without one can create a Lovable account while signing in. The button signs people in with a Lovable account rather than creating an account on your site.

> **Do people stay signed in?**
>
> With the SDK, yes. The sign-in is remembered in their browser and survives a refresh, and with `offline` in the scope it renews itself. With your own server, you decide, using the refresh token described in [Keep people signed in](#keep-people-signed-in).


## Related topics

- [Add Sign in with Lovable to your app](https://docs.lovable.dev/features/lovable-auth.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Connect apps to Lovable with OAuth](https://docs.lovable.dev/features/oauth-clients.md)
- [Users and authentication](https://docs.lovable.dev/features/authentication.md)
- [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise.md)
