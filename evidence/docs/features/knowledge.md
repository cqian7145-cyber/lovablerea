# Instructions
<!-- source: https://docs.lovable.dev/features/knowledge.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Instructions

> Define persistent instructions for Lovable using workspace instructions and project instructions. Set shared coding standards, architecture rules, and project context that Lovable remembers across conversations and projects.

**Instructions** (previously **Knowledge**) let you provide persistent guidance and context to the Lovable agent. Instead of repeating the same explanations in every conversation, you can define them once and Lovable will consider them when generating edits.

Instructions are defined at two levels:

* **Workspace instructions** define shared rules that apply across all projects in a workspace, such as coding standards, preferred libraries, or naming conventions.
* **Project instructions** add context that is specific to a single project, such as the application purpose, database schema, architecture decisions, or domain terminology.

Both are plain text fields that provide persistent instructions to the Lovable agent.

## Skills vs. instructions

Skills and instructions complement each other.

* **Instructions** are always included in context. Use them for rules and conventions that apply to everything Lovable does, such as coding standards, brand guidelines, or your project's domain terminology.
* [Skills](https://docs.lovable.dev/features/skills.md) are loaded on demand. Use them for instructions that only matter for specific kinds of tasks, such as running a release checklist, drafting a customer reply, or producing a particular kind of content.

If an instruction is relevant on every message, put it in workspace instructions. If it is only relevant when a specific topic comes up, make it a skill.

## Workspace instructions

Workspace instructions are a text field that lets you define shared rules once and apply them across all projects in your workspace. Project instructions can then add context that is specific to a particular project.

Use them for **rules and conventions that should be consistent across multiple projects**. By defining these guidelines once, you avoid repeating the same instructions in every project's instructions.

Workspace instructions are especially useful in team environments where multiple people are building projects. Workspace admins can define guardrails such as coding standards, testing requirements, or architectural rules so every project follows the same conventions automatically.

Only **workspace owners and admins** can manage workspace instructions. To manage workspace instructions, go to either:

* **Workspace settings → Instructions**
* **Project settings → Instructions**

Workspace instructions support up to **10,000 characters**.

### What to include

Workspace instructions are best for:

* Coding style conventions
* Naming conventions
* Preferred libraries or frameworks
* Shared architectural patterns
* Testing requirements
* Code quality or linting rules
* Language or formatting preferences
* Brand voice, UI copy, or design guidelines
* Things Lovable should avoid doing

### Example

```text wrap theme={null}
Coding standards
- Always enable TypeScript strict mode.
- Never use `any`. Use `unknown` and narrow the type.
- Prefer named exports. Do not use default exports.
- Prefer `const` over `let`. Never use `var`.

Naming conventions
- Use camelCase for variables and functions.
- Use PascalCase for components and types.
- Use kebab-case for file names.

Styling
- Use Tailwind CSS for styling.
- Do not use inline styles.
- Do not use CSS modules.

Libraries
- Use shadcn/ui components when possible.
- Use React Query for server state.
- Use Zustand for client state.

Architecture
- Route API calls through a service layer.
- Do not call `fetch` directly from React components.

Testing
- Write unit tests for new utility functions and hooks.
- Run existing tests after making changes.
- Verify new functionality in the browser before marking it complete.

Code quality
- Run the linter after significant changes.
- Remove unused imports and dead code.

Localization
- Write code comments and variable names in English.
- Use date format DD/MM/YYYY.
- Use European number formatting (comma as decimal separator).

Brand voice
- Use a friendly, professional tone in all user-facing copy.
- Use sentence case for headings and buttons (for example, "Create new project", not "Create New Project").
- Do not use placeholder text like "Lorem ipsum", always write realistic copy.

General rules
- Do not add `console.log` statements.
- Do not use deprecated React patterns.
- Write code comments in English.
```

### Important notes

* **Changes apply immediately**\
  If you update workspace instructions during an active conversation, Lovable will use the updated instructions on follow-up messages.
* **One set of workspace instructions per workspace**\
  Each workspace has a single set of workspace instructions shared across all projects. You cannot define different workspace-level instructions for subsets of projects inside the same workspace.
* **Workspace instructions in long conversations**\
  Workspace instructions are always included together with project instructions alongside project code and other context sources. However, in very long conversations with a lot of context, instructions may not always be followed consistently.

## Project instructions

Project instructions are a text field that stores persistent instructions and context for a single project. Use it to provide information that applies only to that specific project, such as the application purpose, architecture, or domain terminology.

Anyone with permission to edit the project can update project instructions. To manage project instructions, go to **Project settings → Instructions**.

Project instructions support up to **10,000 characters**.

### What to include

Good project instructions usually include:

* What the application does
* User personas or target audiences
* Database schema or key tables
* Architecture decisions
* Domain terminology
* Project specific constraints
* Design guidelines (colors, typography, or layout)
* Links to important references such as API documentation or internal tools
* Security or compliance requirements

### Example

```text wrap theme={null}
Project overview
This is a B2B SaaS application for restaurant managers to track food inventory across multiple locations.

Users
Primary users are restaurant managers who need quick visibility into stock levels and ingredient usage.
Secondary users are staff responsible for logging inventory changes.

Key database tables
- inventory_items (id, name, category, quantity, unit, location_id)
- locations (id, name, workspace_id)
- transactions (id, item_id, quantity_change, type, created_at)

Design guidelines
- Use Tailwind CSS for styling.
- Follow the existing color palette and spacing scale.
- Use consistent spacing and layout patterns across pages.
- Prefer shadcn/ui components when available.

Architecture rules
- Store monetary values in cents as integers.
- Use optimistic updates for all mutations.
- Place reusable components in /components.

Domain terminology
- "Inventory item" refers to a tracked ingredient or product.
- "Transaction" represents a change in inventory quantity.

External references
- API documentation: https://docs.example.com/api
```

## Best practices

> **Define shared rules at the workspace level**
>
> Use **workspace instructions** to define coding standards, preferred libraries, architectural conventions, and other rules that should apply across multiple projects.
>
> Then use **project instructions** to add context specific to each project, such as the application purpose, database schema, domain terminology, or integrations.
>
> If a project needs different behavior from the workspace defaults, you can define those rules in **project instructions**. When the same instruction appears in both places, Lovable will generally prioritize **project instructions**, since it is more specific to the current project.

> **Be specific**
>
> Clear instructions produce better results.
>
> Good example:
>
> ```text wrap theme={null}
> Always enable TypeScript strict mode. Never use any.
> ```
>
> Less useful example:
>
> ```text wrap theme={null}
> Write clean code.
> ```

> **Write it like onboarding documentation**
>
> Imagine explaining the project to a new developer joining the team. Include the important architectural decisions so Lovable does not attempt to change them.

> **Keep instructions concise**
>
> Short instructions work better than long paragraphs. Prefer bullet lists and direct rules.

> **Review instructions periodically**
>
> If your stack or architecture changes, update your instructions so Lovable does not follow outdated patterns.
>
> You do not need to document everything. Even a few clear rules or a short project description can significantly improve the quality of edits.

## FAQ

> **What is the character limit for instructions?**
>
> Both project instructions and workspace instructions support up to 10,000 characters.

> **Can I have multiple sets of workspace instructions?**
>
> No. Each workspace has one set of workspace instructions shared across all projects.

> **Can I add instruction files in the project's repository?**
>
> Yes. Instruction files such as `AGENTS.md` or `CLAUDE.md` can also provide guidance to the Lovable agent.
>
> For technical users managing instruction files directly in their repositories, root-level `AGENTS.md` files are always read by the Lovable agent regardless of session length.

> **Which context sources does Lovable read?**
>
> When you send a message, Lovable reads your **project instructions**, **workspace instructions**, and **project code** to understand how your project works before generating edits.
>
> It also looks at any integration knowledge from connected services, including the [connector knowledge files](https://docs.lovable.dev/integrations/create-connector.md#writing-connector-knowledge-files) of custom connectors, and instruction files in your project's Git repository such as `AGENTS.md` or `CLAUDE.md`.
>
> Lovable also uses what it remembers about the project and about you. See [Memory](https://docs.lovable.dev/features/memory.md).

> **What happens if project and workspace instructions conflict?**
>
> Project instructions and workspace instructions are included together when Lovable generates responses.
>
> If the instructions conflict, Lovable is encouraged to prioritize the instructions defined in **project instructions**, since they apply specifically to the current project.
>
> To avoid confusion, keep shared rules in workspace instructions and project-specific details in project instructions.

> **What is the difference between a skill and instructions?**
>
> Instructions are always included as background context for Lovable. [Skills](https://docs.lovable.dev/features/skills.md) are loaded on demand when the request matches the skill's description. Use instructions for rules that apply to every message, and skills for instructions that only matter for specific kinds of tasks.


## Related topics

- [Define reusable instructions with skills](https://docs.lovable.dev/features/skills.md)
- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Project settings](https://docs.lovable.dev/features/projects/settings.md)
- [Lovable MCP server](https://docs.lovable.dev/integrations/lovable-mcp-server.md)
- [Edit Google Docs, Sheets, and Slides in Lovable](https://docs.lovable.dev/tips-tricks/google-workspace-editing.md)
