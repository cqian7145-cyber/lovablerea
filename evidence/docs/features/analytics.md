# Analytics
<!-- source: https://docs.lovable.dev/features/analytics.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics

> Understand your app's traffic, search visibility, and ad campaign performance, and ask Lovable what to improve next.

**Analytics** shows how many visits your published app gets and where they come from. With linked advertising accounts, it also shows campaign performance. Use it to understand your traffic and marketing results, and ask Lovable what to improve next.

Analytics is included on all plans. It starts counting when you [publish your project](https://docs.lovable.dev/features/publish.md), with nothing to set up. Open [**More → Analytics**](https://docs.lovable.dev/features/projects/editor.md#the-more-menu) in the project toolbar.

> [!NOTE]
>
> Analytics covers one app. For workspace-wide building and app usage, see
> [Insights](https://docs.lovable.dev/features/insights.md). For security and ownership issues, see
> [Security insights](https://docs.lovable.dev/features/security-insights.md).

## Traffic channels

Select a channel to see how people found your app:

* **All**: every visit to your published app.
* **SEO & AI**: visits from search engines, such as Google and Bing, and AI assistants, such as ChatGPT and Perplexity.
* **Social**: visits from social networks, such as Facebook, Instagram, LinkedIn, and X. Links you tagged as social count as **Social** too.
* **Referral**: visits from links on other websites.
* **Direct**: visits with no known source, for example someone who typed your address or opened a bookmark.
* **Ads**: visits from paid campaigns. Lovable recognizes them by a paid tracking tag, such as `utm_medium=cpc`, or by an ad click ID in the link, such as Google's `gclid`.

Lovable uses the referring site and tracking tags to classify visits. Recognized social or paid tags take priority over the referring site, even when the browser reports no source. Without paid tracking tags, Facebook and Instagram ad visits may appear under **Social** or **Direct**.

Apps with [restricted website access](https://docs.lovable.dev/features/publish.md#who-can-see-your-published-app) show only **All**, without channel tabs, growth recommendations, Google searches, or the SEO review. Campaign results from a linked advertising account still show.

## Understand your traffic

Charts and breakdowns show data for your selected period and channel.

### Time period

Analytics shows the **last 7 days** by default. Choose another preset or a custom range within the last 90 days. Custom ranges use UTC dates. **Current visits** counts visits active in the last 5 minutes.

### Chart and metrics

Select a metric to see how it changed over time:

* **Visits**: how many visits your app received. A visit is one browsing session, not one person.
* **Page views**: how many pages were viewed across all visits. Moving between pages inside your app counts as a page view, even when the browser does not reload.
* **Views per visit**: how many pages the average visit included.
* **Visit duration**: how long the average visit lasted.
* **Bounce rate**: the percentage of visits with little or no engagement.

> [!NOTE]
>
> Visits are not unique people. One person can generate multiple visits, and
> your own visits count too. Signing in to your app does not link visits to one
> account.

A percentage shows the change from the previous period when both periods have at least 30 visits.

With few visits, some channel trends are hidden because there is not enough data. Select **Show anyway** to view them.

Hover over the chart to see values for a specific time. On desktop, drag across the chart to select a narrower date range. Choose a period from the dropdown to return to a wider range.

### Breakdown cards

Breakdowns help you understand:

* **Sources**: which search engines, social networks, or websites sent visitors. Not shown for **Direct** or **Ads**.
* **Pages**: which pages received the most views.
* **Visitor profile**: countries and device types, available on **All**.

Use **Ask Lovable about this** to add a breakdown to chat, or ask about your traffic directly:

```text wrap theme={null}
How many visits did my app get this week, and where did they come from?
```

To track steps such as sign-up and purchase, connect a dedicated analytics tool such as [PostHog](https://docs.lovable.dev/integrations/posthog.md).

## Overall traffic and your growth plan

Select **Get more visitors** on **All** to ask Lovable for marketing advice based on your app and current traffic.

Lovable can help you:

* Set up a [custom domain](https://docs.lovable.dev/features/custom-domain.md) and check whether visitors can buy, sign up, or get in touch.
* Improve SEO and AI search visibility, and research competitors and places to reach your audience.
* Choose marketing actions, such as community posts, direct outreach, a Google Business Profile, or paid ads.

Lovable may ask questions to refine its advice. You can review saved research in your project's **Files** view. When a recommendation includes a button, click it to ask Lovable to carry out that action, or suggest a different direction in chat.

[Growth tools](https://docs.lovable.dev/features/growth-tools.md) explains the available marketing capabilities.

Lovable adds no extra fees for its growth tools. The normal costs of chatting with Lovable apply when you ask for advice or changes. See [Usage costs](https://docs.lovable.dev/introduction/credits-and-usage.md#usage-costs).

## SEO & AI traffic

The **SEO & AI** tab shows traffic from search engines and AI assistants and helps you improve how they find your app.

For **Visits** and **Page views**, separate chart lines show search-engine and AI-assistant traffic.

* Connect [Google Search Console](https://docs.lovable.dev/integrations/google-search-console.md) to see search terms, clicks, and impressions (how often your site appeared in Google's results). Your project must be published publicly, and you need permission to edit it. Google reports data with a delay, so a new connection may show no data at first.
* **Run SEO scan** checks whether search engines and AI assistants can find, read, and index your app. Use **Try to fix** to ask Lovable to address a finding.
* **Get more search traffic** asks Lovable for ways to attract visitors from search engines and AI assistants.

[Optimize your app for SEO and AI search](https://docs.lovable.dev/features/seo-aeo.md) covers the scan checks, Google Search Console setup, keyword research, and content.

## Social, referral, and direct traffic

Use the growth button on **Social** or **Referral** to ask for ways to reach people through that channel. On **Direct**, **Ask Lovable** helps you track where visitors come from and find new ways to reach them.

## Ads traffic and campaign results

The **Ads** tab shows visits from paid campaigns and the pages those visitors viewed. With a linked Google Ads or Meta ads account, you can also see campaign status, budget, spend, impressions, clicks, and conversions.

You can select a campaign to review its results and see how performance changes over time.

Campaign results come from your ad account, not website analytics, and the provider may revise them later. Billing and campaign status stay with Google or Meta.

Website traffic covers all paid visits to your app. Selecting a campaign does not filter that traffic to visits from the selected campaign.

The Ads tab offers buttons to help you complete setup, review performance, or improve your ads, depending on your campaign's current state. Select one to ask Lovable for help with that campaign. See [Advertise your app](https://docs.lovable.dev/features/ads.md) for setup and campaign management.

## Enable or disable visitor analytics

Analytics counts visits while your app is published. To stop collecting visit data, disable **Visitor analytics** in [**Project settings → General → Publishing**](https://docs.lovable.dev/features/projects/settings.md#publishing). To resume, select **Enable analytics** in Analytics.

## Privacy

Analytics measures overall traffic, not individual people. Lovable does not build profiles of your visitors or follow them across separate visits.

Analytics sets no cookies and stores nothing in your visitors' browsers. Each visit gets a random identifier that Lovable discards when the visit ends, so a return later counts as a new visit.

Lovable collects this data itself. Both the script and the address it reports to are on your app's own domain, so no outside analytics service receives your visitors' data.

## FAQ

> **What happened to the SEO & AI search view?**
>
> The SEO review is now in **More → Analytics → SEO & AI**. The **More → SEO & AI search** entry opens a card that takes you there.

> **Does Analytics read UTM parameters?**
>
> Yes. Lovable uses tags such as `utm_source` and `utm_medium` to classify
> traffic. It does not group visits by UTM campaign name. For campaign results
> from a linked ad account, see [Ads traffic and campaign
> results](#ads-traffic-and-campaign-results).

> **Why are the channel tabs missing?**
>
> Apps restricted to workspace members or specific people show only **All**.
> Public growth features are hidden.

> **Who can see Analytics?**
>
> Everyone with permission to edit the project, and workspace admins and owners.


## Related topics

- [Get project analytics](https://docs.lovable.dev/api-reference/analytics/get-project-analytics.md)
- [Get workspace analytics](https://docs.lovable.dev/api-reference/analytics/get-workspace-analytics.md)
- [Get project analytics breakdowns](https://docs.lovable.dev/api-reference/analytics/get-project-analytics-breakdowns.md)
- [Get project realtime analytics](https://docs.lovable.dev/api-reference/analytics/get-project-realtime-analytics.md)
- [Connect your app to Google Analytics](https://docs.lovable.dev/integrations/google-analytics.md)
