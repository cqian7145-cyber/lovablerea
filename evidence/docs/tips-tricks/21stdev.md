# Use 21st.dev components in Lovable
<!-- source: https://docs.lovable.dev/tips-tricks/21stdev.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Use 21st.dev components in Lovable

> Copy pre-built hero sections, navigation bars, testimonials, and other UI components from 21st.dev directly into your projects.

[21st.dev](https://21st.dev/) is a community registry of pre-built React UI components that you can add to your Lovable project with a copy-paste workflow. Use it when you want a polished hero section, navigation bar, or animation without describing every design detail yourself.

> [!NOTE]
>
> 21st.dev is a third-party service with its own free tier and paid membership. The free tier limits how many component prompts you can copy per day. See [21st.dev](https://21st.dev/) for their current terms.

## Step-by-step guide

<video autoPlay loop muted playsInline>
  <source src="https://mintcdn.com/lovable-f9060f1e/-8-xuzzl5-8vrfz4/assets/tips-tricks/videos/21st-dev.mp4?fit=max&auto=format&n=-8-xuzzl5-8vrfz4&q=85&s=32ae04476488d612717354a8a42eb65f" type="video/mp4" />
</video>

**1. Go to 21st.dev**

Navigate to [21st.dev](https://21st.dev/) to browse the component library.

**2. Find a component you like**

Browse through the available components to find one that fits your needs:

* Hero sections
* Navigation menus
* Testimonials
* Calls to action
* Feature sections
* Forms

**3. Copy the prompt for Lovable**

Open your chosen component's detail page and copy its prompt, choosing Lovable as the target tool.

**4. Paste into Lovable**

Open your Lovable project and paste the copied prompt into the project chat.

**5. Say where the component goes**

Add a line to the pasted prompt specifying where the component belongs in your project. For example:

```text wrap theme={null}
Add this as the hero section on the homepage.
```

**6. Let Lovable integrate the component**

Send your message. Lovable adds the component code to your project and places it where you specified.

> [!NOTE]
>
> The component inherits your project's existing styles, and you can customize it further with the [preview toolbar](https://docs.lovable.dev/features/preview-toolbar.md) or a follow-up prompt.


## Related topics

- [Prompt library](https://docs.lovable.dev/prompting/prompting-library.md)
- [Bring Figma designs into Lovable](https://docs.lovable.dev/integrations/figma.md)
- [Glossary](https://docs.lovable.dev/glossary.md)
- [Design systems](https://docs.lovable.dev/features/design-systems.md)
- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome.md)
