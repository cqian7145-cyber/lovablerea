# Phone authentication for your app
<!-- source: https://docs.lovable.dev/features/phone-auth.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Phone authentication for your app

> Let users sign in to your app with their phone number and an SMS one-time code, using your own SMS provider.

> [!NOTE]
>
> This page documents phone authentication settings for apps using the [built-in backend](https://docs.lovable.dev/features/cloud). Projects connected to your own Supabase project manage authentication in Supabase instead. For an overview of all sign-in methods and user management, see [Users and authentication](https://docs.lovable.dev/features/authentication).

Let users sign in to your app with their phone number: they enter it, receive a one-time code by SMS, and type the code to sign in. There are no passwords to remember and no email inbox involved.

Unlike [Google](https://docs.lovable.dev/features/google-auth.md) and [Apple](https://docs.lovable.dev/features/apple-auth.md) sign-in, phone authentication has no managed mode: SMS delivery always runs through your own account with an SMS provider, and the provider bills you directly for messages.

## Why use phone sign-in

* Works for audiences where email is uncommon or rarely checked
* Suits mobile-first products where typing a phone number is natural
* No passwords to create, forget, or reset
* The phone number doubles as a verified contact channel for your app

## Common use cases

Phone sign-in is commonly used for:

* Marketplace and delivery apps where sellers and couriers coordinate by phone
* Local-services and booking apps with walk-in customers
* Apps for regions where phone numbers are the primary online identity
* Internal field tools for staff without company email addresses

## Set up phone sign-in

**1. Create an account with an SMS provider**

Phone sign-in requires an account with one of the supported providers. Create one and collect its credentials from the provider's console:

| Provider | Credentials you enter |
| - | - |
| Twilio | Account SID, Auth token, Content SID, Message service SID |
| Twilio Verify | Account SID, Auth token, Verify service SID |
| TextLocal | API key, Sender (6 characters max) |
| Vonage | API key, API secret, From (sender number) |
| MessageBird | Access key, Originator (11 characters max) |

Pick a provider based on pricing and delivery coverage in the countries where your users are.

**2. Enable and configure phone sign-in in Lovable**

Go to **More → Users → Settings → Phone**, turn on **Enable phone sign-in**, select your **Active SMS provider**, and enter its credentials.

**3. Add the sign-in flow to your app**

Ask Lovable to build the phone sign-in UI:

```text wrap theme={null}
Let users sign in with their phone number using an SMS code.
```

**4. Test the flow**

Sign in with a real phone number and verify that the code arrives, the code screen accepts it, and the new user appears in **More → Users**.

## Configuration

These settings control the sign-in flow:

* **SMS template**: the message text sent to users. Use `{{ .Code }}` where the one-time code should appear.
* **SMS OTP expiration (seconds)**: how long a code stays valid, from 60 to 600 seconds.
* **SMS OTP length**: 4 to 8 digits.
* **Auto-confirm SMS**: sign users in without OTP verification. Useful while testing, but leave it off in production, since it removes the proof that the user owns the phone number.

## Costs

Lovable does not charge for SMS delivery. Your SMS provider bills your account directly for every message sent, at the provider's own rates. High signup volume means high SMS volume, so keep an eye on your provider's usage dashboard as your app grows.

## Troubleshooting

> **Sign-in codes are not arriving**
>
> Check your SMS provider's dashboard first: failed deliveries, an exhausted balance, or sender restrictions in the recipient's country (rules about which names or numbers are allowed to appear as the SMS sender) show up there. Also confirm the provider credentials in your auth settings are current.

> **Codes arrive but are rejected**
>
> The code may be expiring before users can type it. Raise **SMS OTP expiration (seconds)** in the phone settings, and confirm users are entering the most recent code, since re-requesting a code invalidates earlier ones.

> **Delivery works in one country but not another**
>
> Countries have different rules about which names or numbers may appear as the SMS sender, and some require senders to be registered in advance. Check your provider's coverage and compliance documentation for the affected country.

## FAQ

> **Is there a managed option like Google sign-in has?**
>
> No. Phone sign-in always uses your own SMS provider credentials. If you don't want to set up an SMS provider, consider [email](https://docs.lovable.dev/features/email-auth.md) or [Google](https://docs.lovable.dev/features/google-auth.md) sign-in instead.

> **Who pays for the SMS messages?**
>
> Your SMS provider bills you directly for every message sent, under your own Twilio, Vonage, MessageBird, or TextLocal account. Lovable does not charge for SMS delivery.

> **Which SMS provider should I choose?**
>
> Any supported provider works. Pick based on pricing and delivery coverage in the countries where your users are. **Twilio Verify** manages the verification message for you, while the other providers send the SMS template you define.

> **Can users sign in with both email and phone?**
>
> Yes. Sign-in methods are independent: you can enable phone alongside [email](https://docs.lovable.dev/features/email-auth.md), [Google](https://docs.lovable.dev/features/google-auth.md), [Apple](https://docs.lovable.dev/features/apple-auth.md), and others, and users choose how to sign in.

> **Does phone sign-in work internationally?**
>
> Delivery depends on your SMS provider's coverage and each country's rules about who may appear as the SMS sender. Check your provider's coverage documentation for the regions where your users are.


## Related topics

- [Add Apple authentication to your app](https://docs.lovable.dev/features/apple-auth.md)
- [Email authentication for your app](https://docs.lovable.dev/features/email-auth.md)
- [Add Microsoft authentication to your app](https://docs.lovable.dev/features/microsoft-auth.md)
- [Add Google authentication to your app](https://docs.lovable.dev/features/google-auth.md)
- [Two-factor authentication (2FA)](https://docs.lovable.dev/introduction/two-factor-authentication-2-fa.md)
