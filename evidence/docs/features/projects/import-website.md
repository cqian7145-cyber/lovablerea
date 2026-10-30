# Import a website into Lovable from its URL
<!-- source: https://docs.lovable.dev/features/projects/import-website.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Import a website into Lovable from its URL

> Rebuild a website you own from its URL as a Lovable project you can edit in chat. Learn what Lovable reads from the page and how to add more pages.

You can start a project from a website you already have. Paste its URL, and Lovable rebuilds that page as a project you can edit. Lovable then offers the other pages it links to, and you can keep adding pages of the same site. A blog or store is a harder fit, because its posts and products come in as fixed pages rather than records you can manage.

The text, images, fonts, colors, and layout that visitors see become parts of the project you can change in the [project chat](https://docs.lovable.dev/features/projects/chat.md) and [publish](https://docs.lovable.dev/features/publish.md) on Lovable. Use the import to move a site you own off a website builder, or to redesign an existing site without starting from a blank prompt.

Website import is available on all plans to anyone who can create projects in the workspace. Your first import is free until Lovable has imported the first page, as described in [What an import costs](#what-an-import-costs).

> [!NOTE]
>
> This page is about rebuilding a published website from its URL, where you paste the site's address. Looking to bring an app's code into Lovable? See [Import a project from another tool](https://docs.lovable.dev/features/projects/import-project.md). The two are different features.

## What Lovable reads from a website

Lovable opens the page the way a visitor would, without signing in, and reads what is on screen. Nothing on your site changes. Lovable reads:

* the text
* the images and fonts the page loads
* the colors and spacing, read with the page in light mode
* the layout at desktop width, and how the page's styles change at phone width
* the page title that shows in the browser tab

Lovable rebuilds the page in a new project with its fonts, images, colors, and spacing, and saves a screenshot of the original to compare against.

Lovable reads only what visitors can see. Lovable does not import logins, databases, or anything else that ran on the original site's server. A page behind a login is imported as what a visitor who is not signed in sees, usually the login page itself.

A form keeps its look, but not what the original site did with the submissions, such as emailing them to you. After the page is in your project, ask Lovable to rebuild that part and add anything else you need, for example a contact form that stores submissions in the [built-in backend](https://docs.lovable.dev/features/cloud):

```text wrap theme={null}
Make the contact form work: store each submission in the database and show me the submissions on a page only I can open.
```

## Import a website

> [!NOTE]
>
> Import only a website you own or have the owner's permission to copy. The import reproduces the page's text, images, and design, and you are responsible for having the right to use them. Importing a client's site you are rebuilding for them is the intended use.

Start the import from the dashboard:

**1. Open the import dialog**

On the [dashboard](https://docs.lovable.dev/introduction/dashboard-overview.md), click the **+** button in the prompt input and select **Import project to Lovable**.

**2. Select Website**

Under **Everything else**, select **Website**. For a site built with Wix, Squarespace, Webflow, or Framer, you can select **Other platforms** instead. Both open the same import.

**3. Paste the URL**

Enter the full address of the page in **Website URL**, including `https://`, for example `https://www.yourdomain.com`. The page must be public: an address on your own computer or network cannot be imported.

**4. Start the import**

Click **Import website**. Lovable creates the project and opens the editor.

**5. Confirm that you can copy the website**

In the project chat, Lovable asks you to confirm that you own the website or have the owner's permission to copy it. After you confirm, Lovable reads the page, builds the project, and compares the result with the original. Lovable asks once per website.

> [!TIP]
>
> The import is complete when the preview shows your page. When parts of the page still do not match after Lovable's repairs, Lovable reports a partial import and names those parts. Compare the page with the original, ask Lovable to fix any differences you see, then keep building.

## Add more pages

Each project imports pages from one site. Import the home page first, because the first page you import becomes the project's home page. Every page you add after that keeps the path it has on the original site, for example `/about`.

One request adds up to 10 pages, and you can keep adding more in later requests. Add them in the chat the import started in, because that is where Lovable can import.

When the first page links to other pages of the site, Lovable lists them and asks whether you want them. Name the pages you want, or give Lovable their URLs. One request can add several pages:

```text wrap theme={null}
Add https://www.yourdomain.com/about and https://www.yourdomain.com/services as new pages in this project.
```

Each page is added with its own copy of the header, footer, and navigation. Your edits to the pages you already imported stay as they are.

Links to other pages of the site open pages in your project. A link to a page you have not imported leads nowhere until you import it.

If you ask Lovable to import a page again, Lovable replaces it. Lovable refuses when the page no longer matches what it imported, for example after you edited it, and changes nothing. Ask for changes in the chat instead.

Pages from a different website cannot be added to the same project, and a subdomain such as `blog.yourdomain.com` counts as a different website. Start a new import for a second site.

## Check the result against the original

During an import you start from the dialog, Lovable opens the original and the rebuilt page side by side, at desktop and phone size, and scrolls through both. Lovable also tries the menus, tabs, expandable sections, image sliders, and videos. Lovable repairs the interactive parts it can and tells you which ones it cannot.

In that same chat, you can ask Lovable to compare the page with the original at any time, for example after a round of edits.

```text wrap theme={null}
Compare the imported homepage with the original site and fix the differences you find.
```

Small differences are expected. Lovable rebuilds the page from what it read and does not run the original site's code. Spacing, animations, and content that loads as you scroll can differ from the original.

A page built around animations or moving parts is the hardest to rebuild. Describe how that part should look and behave, and Lovable builds it again:

```text wrap theme={null}
On the home page, the testimonials should move sideways one at a time, and each card should fade in as it arrives.
```

## Publish the site on your domain

When the site is the way you want it, publish it and [connect your domain](https://docs.lovable.dev/features/custom-domain.md#connect-a-domain-from-another-provider) to the project. Visitors reach the Lovable version when the domain points at Lovable. Until then, visitors see your original site.

## What an import costs

Your first import is free until Lovable has imported the first page. Until then, messages in the project chat do not consume credits. That includes your answer when Lovable asks whether you own the website, and import attempts that fail.

The free period covers at most your first 5 messages in the project chat, including the import request that the dialog sends for you. After the free period ends, every message in the project is treated as standard build usage and consumes credits.

You get one free import, shared between website imports and [project imports](https://docs.lovable.dev/features/projects/import-project.md). The free import counts against your account and against the workspace, so it is available only when neither has used it. For example, each of these imports consumes credits:

* an import by any member of a workspace where someone already used the free import
* your import in any workspace after you used the free import in another one
* your website import after a free project import

The free import counts as used as soon as Lovable creates the project. It stays used if the import fails, if you stop before Lovable imports a page, or if you delete the project. While your free import is available, the import dialog shows a badge next to its title.

To start any import, including the free one, the workspace needs credits available. See [Low credit balance and out-of-credits recovery](https://docs.lovable.dev/introduction/out-of-credits.md).

Every import after the free one is treated as standard build usage and consumes credits. Reading the page is a small part of the work: most of the cost is Lovable building and checking the project. See [Build costs](https://docs.lovable.dev/introduction/credits-and-usage.md#build-costs).

## Limitations

Website import has these limits:

* Addresses on a private network or your own computer cannot be imported. A page behind a login is imported as the page a signed-out visitor sees.
* Lovable reads the page at desktop and phone width, so it can look different at other widths, such as on a tablet, and in dark mode. Check the preview on a phone and in dark mode, and ask Lovable to fix what differs.
* One request adds at most 10 pages. You can keep adding pages of the same site in later requests.
* A page built around animations, moving parts, or anything that reacts as you use it is the hardest to rebuild. Describe how the part should look and behave, and ask Lovable to build it again.
* A page keeps its path only when the path has plain lowercase letters, digits, hyphens, and underscores. A path with capital letters, accented letters, or a dot, such as `/About.html`, gets a different address in the project, so update links that use the original one.
* Lovable copies the page title, but not the description that search engines show under it.
* Very large pages cannot be imported. A single stylesheet (a file that defines the page's look) over 2 MB is not imported in full. The import stops when the page's HTML (its content and structure) is over 5 MB, or when the remaining stylesheets together are over 5 MB.
* Images, fonts, and videos over 10 MB are left out. Lovable imports at most 300 of them and at most 30 MB in total. Logos and icons the page loads as separate SVG files are converted to images at the size they appear, so they can look less sharp when you scale them up.
* Your account can start at most 10 website imports per hour.
* Your account can read at most 100 pages per hour. Each page Lovable reads counts, including a page you import again and a read that fails.
* Downloadable documents on the page, such as PDFs, are not copied into the project. Upload them again in the project if you need them.

## Troubleshooting

These are the points where people most often stop. The first line of each answer says whether the behavior is intended.

> **Please enter a valid URL (e.g., [https://example.com](https://example.com))**
>
> Intended. The address has to start with `https://` or `http://`. Add it in front of the domain and try again.

> **Couldn't start the import. Check the URL and try again.**
>
> Not intended. The address could not be used, or the import could not start. Check that the address is public: open it in a private browser window and confirm the page loads. If the page loads, check that you can create projects in the workspace and that the workspace has credits available. Your account can also start at most 10 website imports per hour. After that, wait before you try again.

> **Lovable says the project already contains an import of a different site**
>
> Intended. Each project imports pages from one site, so Lovable refuses a page from another domain and changes nothing in the project. Start a new import from the dashboard for the second site. Pages of the same site are added as described in [Add more pages](#add-more-pages).

> **Lovable says the request went over the page limit**
>
> Intended. One request adds at most 10 pages, so Lovable starts nothing and changes nothing in the project. Ask for up to 10 pages, then ask for the rest in the next request.

> **The import stopped and Lovable says nothing was changed**
>
> Not intended. Lovable could not read the page, and nothing was added to the project. The cause can be temporary. Ask Lovable to import the page again in a few minutes, as described in [Add more pages](#add-more-pages).
>
> The page can also be over the sizes in [Limitations](#limitations), and reading stops after 2 minutes on a page that never finishes loading. When Lovable says your account reached its website-import limit, you have used the hour's 100 reads.

> **The imported page looks different from the original**
>
> Intended, within limits. Lovable rebuilds the page from what it read at desktop and phone width, so content that appears on scroll, an animation, or how the page looks at another screen width can differ. Animations and moving parts are the hardest to rebuild, so describe how the part should look and behave and ask Lovable to build it again. You can also ask Lovable to compare the page with the original and fix what it finds. See [Check the result against the original](#check-the-result-against-the-original).

## FAQ

> **Can I import a Wix, Squarespace, WordPress, or Webflow site?**
>
> Yes, as long as the page is public. Lovable reads the published page, not the website builder behind it, so the result is the page as visitors see it. The builder's editing tools, plugins, store, and member areas are not copied.
>
> A blog is a harder fit. Lovable imports the pages you ask for as they look today, so posts arrive as fixed pages rather than a blog you can keep writing in. Import the pages you want to keep, then ask Lovable to rebuild the features you need, such as a blog for the posts you write next. See [Add more pages](#add-more-pages).

> **Does the import include my blog posts or products?**
>
> Only what is on the imported page. The articles or products listed on the page are copied as text and images on that page, not as records you can manage. To keep publishing new posts or products, ask Lovable to build a [database](https://docs.lovable.dev/features/cloud) for them after the import.

> **Does the imported site stay in sync with the original?**
>
> No. The import is a copy of the page at the moment Lovable read it. Later changes on the original site do not reach your project, and changes you make in Lovable do not affect the original.


## Related topics

- [Projects in Lovable](https://docs.lovable.dev/features/projects/overview.md)
- [Import a project from Replit, Bolt, v0, or another tool](https://docs.lovable.dev/features/projects/import-project.md)
- [FAQ](https://docs.lovable.dev/introduction/faq.md)
- [Build with URL](https://docs.lovable.dev/integrations/build-with-url.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
