# Portfolio Redesign Design

Date: 2026-04-23

## Summary

Redesign the personal portfolio currently hosted at `https://jun1216wei.wixsite.com/website` into a new two-repo system built with Next.js, `shadcn/ui`, and `bun`, deployed on Vercel.

The new site should optimize for two outcomes:

- presenting a polished personal brand and story
- showcasing projects with deeper, more dynamic case-study pages

The design direction should follow [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md) loosely for the overall shell, page structure, and layout language, while allowing richer project and blog rendering inside that shell.

## Approved Decisions

- Use `bun` for package management.
- Bootstrap the app with the official `shadcn/ui` Next.js scaffold.
- Keep the standard `shadcn/ui` project structure so future component adds remain compatible.
- Deploy the portfolio on Vercel, not Wix.
- Use two repos:
  - app repo for the Next.js portfolio
  - content repo for blogs, projects, and colocated assets
- Separate `projects` from `blogs`.
- Use a hybrid MDX authoring model:
  - frontmatter-first for simple pages and blog posts
  - component-first when a project page needs more art direction
- Use explicit frontmatter ordering for project child pages via `order`.
- Let project child pages define their own header/title from frontmatter, with optional `navTitle`.
- Keep error handling simple: fail clearly with explicit error states instead of inventing fallback content.

## Goals

- Establish a stronger personal narrative around a creative engineer with a product mindset.
- Preserve and upgrade content from the current Wix portfolio.
- Give major projects room for multi-page storytelling instead of forcing everything into one article template.
- Keep the system maintainable enough to add future `shadcn/ui` components without destabilizing the app.
- Allow content updates from a separate GitHub repo without redeploying the app codebase.

## Non-Goals

- Recreating Wix structure or styling literally.
- Building a CMS or in-browser content editor.
- Supporting arbitrary page-builder behavior inside MDX.
- Using a docs-first framework such as Nextra or Fumadocs UI as the site foundation.

## Visual Direction

The portfolio shell should derive its visual rules from [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md), but not treat it as a rigid page template.

Required carryovers:

- bounded, grid-led composition
- off-white foundation with charcoal surfaces and cyan accent moments
- zero-radius cards and controls
- glass-like depth treatment with restrained blur and border contrast
- Inter as the main type family
- controlled, interface-led motion rather than decorative animation
- a technical atmospheric background treatment inspired by the canvas/WebGL notes

Allowed evolution:

- homepage structure can be modernized heavily
- project and blog layouts can vary more than the shell
- typography can use controlled modes in scale, density, and case without drifting into arbitrary font changes

Minimum visual acceptance checks:

- primary surfaces and controls use zero-radius corners
- base page background uses the off-white foundation from [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md)
- dark surface panels appear in the hero and major content frames
- accent usage is constrained to the cyan and supporting blue roles from [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md)
- Inter remains the default type family across shell and content
- the main page shell uses a bounded max-width grid rather than full-width generic `shadcn` spacing
- homepage includes the five approved sections in the specified order
- the result must not look like default `shadcn` starter styling with token colors swapped

## Information Architecture

Top-level routes:

- `/`
- `/about`
- `/projects`
- `/projects/[slug]`
- `/projects/[slug]/[page]`
- `/blog`
- `/blog/[slug]`
- `/contact`

Primary navigation should emphasize:

- Home
- Projects
- About
- Blog
- Contact

## Content Migration From Wix

Current Wix content should be remapped into the new structure rather than copied one-to-one.

Expected mapping:

- Wix homepage -> new homepage with sharper narrative framing
- Wix About -> `/about`
- `CS Pet Tech` -> project entry with overview and optional child pages
- `Sox` -> project entry with overview and optional child pages
- `Robotics` -> project entry with archive-style highlights and optional child pages
- `Art` -> project entry with gallery-led presentation and optional child pages

Contact content should become a simple outbound/contact area rather than a fragile custom form.

## Repo Boundary

### App Repo

Owns:

- Next.js App Router application
- `shadcn/ui` scaffold and installed UI primitives
- layout shell
- design tokens and global CSS
- portfolio system components
- MDX component registry
- route logic
- remote content fetching and parsing
- Vercel deployment config

### Content Repo

Owns:

- `blogs/`
- `projects/`
- project/blog MDX files
- project/blog colocated media assets

The content repo should not contain application logic.

### Source of Truth Contract

Default assumptions for the first implementation:

- the content repo is a public GitHub repository
- the authoritative branch is `main`
- the app reads from that branch only
- Vercel fetches the content repo without authentication for the public-repo case

Configuration should still be centralized through environment variables so the source can be changed later without refactoring the fetch layer.

Required environment inputs:

- `CONTENT_REPO_OWNER`
- `CONTENT_REPO_NAME`
- `CONTENT_REPO_REF` with default `main`

If the repo later becomes private, the fetch layer can be extended to use a read-only GitHub token, but private-repo support is not required for the first implementation.

## Content Repository Shape

```txt
blogs/
  [slug]/
    index.mdx
    image.png
    image2.jpg

projects/
  [slug]/
    index.mdx
    feature.mdx
    process.mdx
    story.mdx
    cover.png
```

Rules:

- each folder name becomes the public slug
- `index.mdx` is the canonical overview page for blogs and projects
- sibling `.mdx` files inside a project folder become project child pages
- child page order is defined explicitly through frontmatter `order`
- child page header comes from `title`
- subnav label can use `navTitle`; otherwise fallback to `title`, then humanized filename

Child-page validity rules:

- only `.mdx` siblings of `index.mdx` are routable child pages
- every routable child page must define `title` and integer `order`
- `order` values must be unique within a project
- pages with missing or duplicate `order` are invalid
- invalid child pages are excluded from generated routes and project subnav
- non-routable helper `.mdx` conventions are not supported in the first implementation

## Content Types

### Blog Post

Purpose:

- article-style writing
- simpler layout
- mostly frontmatter-first authoring

Expected frontmatter fields:

- `title`
- `description`
- `date`
- `tags`
- `image`
- optional author metadata if needed

### Project Overview

Purpose:

- canonical landing page for a project
- hero, summary, role, timeline, tools, outcomes, and links into deeper pages

Expected frontmatter fields:

- `title`
- `description`
- `status`
- `year`
- `role`
- `team`
- `tools`
- `cover`
- `featured`
- optional layout metadata such as `headerVariant`, `bodyWidth`, `fontMode`

### Project Child Page

Purpose:

- deeper story slices such as `feature`, `process`, `story`, `gallery`, `results`, `journal`

Expected frontmatter fields:

- `title`
- `order`
- optional `navTitle`
- optional `description`
- optional `template`
- optional `headerVariant`
- optional `bodyWidth`
- optional `fontMode`

## Authoring Model

The system should support two authoring styles within the same MDX pipeline.

### Frontmatter-First

Use for:

- blogs
- straightforward project overview pages
- pages where layout is mostly standard

Behavior:

- frontmatter selects template and variants
- MDX body stays mostly prose, media, and lightweight blocks

### Component-First

Use for:

- case-study pages that need stronger storytelling or visual pacing
- project sections with richer layout composition

Behavior:

- MDX can compose approved custom components
- content authors can create richer narrative pages without escaping the system

MDX should not be treated as an unrestricted HTML page builder. It can render custom React components, but content should only use approved primitives and storytelling blocks from the app.

### Remote MDX Execution Boundary

Remote MDX is treated as trusted content input, not arbitrary application code.

Allowed:

- markdown
- JSX tags that map to app-registered components
- serializable component props
- fenced code blocks

Disallowed:

- `import` or `export` statements in remote content
- arbitrary JavaScript functions or module logic
- unknown component names that are not registered by the app

Disallowed constructs should fail that page clearly rather than being partially executed or silently ignored.

## Page System

### Home

Structure:

- Hero
- Selected Work
- Practice Areas
- About Preview
- Contact CTA

Intent:

- lead with identity and story
- surface featured work quickly
- show breadth without fragmenting the site

### About

Structure:

- short personal narrative
- experience and accomplishments
- education or background
- optional principles or interests section

### Projects Index

Structure:

- project archive grid/list
- featured projects emphasized first
- filters only if the content volume justifies them later

### Project Overview

Structure:

- project hero
- summary facts
- overview narrative
- visual index of child pages

### Project Child Page

Structure:

- page-local header driven by child page metadata
- project subnav generated from valid sibling pages
- richer narrative blocks depending on template

### Blog Index and Blog Detail

Structure:

- simple article archive
- clean reading layout
- lighter visual treatment than projects

## Component Architecture

The UI should be organized into three layers.

### 1. `shadcn` Base

Location:

- `components/ui/*`

Responsibilities:

- standard primitives
- generated and maintained close to upstream expectations
- safe target for future `shadcn` component additions

### 2. Portfolio System

Location:

- `components/system/*`

Responsibilities:

- translate [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md) into reusable app-level building blocks
- own spacing, frames, surfaces, motion, and responsive rules

Representative components:

- section frame
- glass panel
- page header
- metric strip
- media frame
- project subnav
- background field

### 3. MDX Storytelling Blocks

Location:

- `components/mdx/*`

Responsibilities:

- approved content blocks exposed to MDX
- enable dynamic project/blog rendering without turning content into app code

Representative components:

- project hero
- wide image
- media grid
- process timeline
- result stats
- pull quote
- tool stack

## Data Flow

1. The Vercel-hosted app fetches content from the GitHub content repo on the server.
2. The app discovers blog and project files from the remote repo tree.
3. Frontmatter is parsed and validated with `zod` schemas specific to each content type.
4. Valid MDX content is compiled with the app-owned component map.
5. Routes render the compiled content inside the portfolio shell.
6. Remote content should use cached server fetching with `revalidate: 600`.

## Remote Asset Contract

Colocated content assets should be referenced relatively from MDX or frontmatter, for example:

- `./cover.png`
- `./image-2.jpg`

The app should resolve those relative paths against the owning content folder and transform them into raw GitHub asset URLs for the configured repo/ref.

First implementation rules:

- remote images are served from `raw.githubusercontent.com`
- the app configures `next/image` remote patterns for that host
- frontmatter image fields such as `image` and `cover` should use relative paths, not hardcoded CDN URLs
- if a referenced asset does not exist, render a simple unavailable-media frame instead of inventing substitute content

## Rendering Rules

- The shell follows [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md) loosely and consistently.
- Blogs stay visually simpler and more frontmatter-driven.
- Projects can use more dynamic layouts, media scale changes, and richer section pacing.
- Font variation should come from controlled modes, not arbitrary per-page font-family changes.
- Media scale should come from approved variants such as inline, wide, full-bleed, gallery, or portrait.
- Project pages can choose templates such as story, process, gallery, or results through metadata or component usage.

## Scaffold and Tooling

Baseline scaffold command:

```bash
bun x shadcn@latest init -t next
```

Technical choices:

- Next.js App Router
- `shadcn/ui`
- `bun`
- `@next/mdx` for app-local MDX support where needed
- `next-mdx-remote/rsc` for remote MDX rendering from the content repo
- `gray-matter` for frontmatter parsing
- `zod` for schema validation
- custom app-owned MDX component registry

Avoid:

- full docs-first site frameworks as the app base
- custom divergence from `shadcn` project structure that would make future component adds brittle

## Error Handling

Principle:

- fail clearly, not cleverly

Behavior:

- if remote content cannot be fetched, show an explicit error state for the affected page or index
- if content parsing fails, treat the entry as unavailable rather than synthesizing fallback content
- unknown slugs should use proper `not-found` handling
- missing images may use a simple framed unavailable-media placeholder to preserve layout; this is the only allowed visual fallback because it does not invent content
- do not attempt to normalize or invent content from incomplete remote sources

## Verification

Before implementation is considered complete, verify:

- schema validation for blog, project overview, and project child-page frontmatter
- slug discovery and project child-page ordering
- remote asset path resolution
- rendering smoke tests for homepage, blog detail, project overview, and project child page
- route handling for not-found and error states
- responsive layout checks for desktop and mobile
- visual alignment with [DESIGN.md](C:\Users\jun12\Desktop\Profile\BWJ2310.github.io\DESIGN.md) rather than generic `shadcn` defaults

## Out of Scope for This Phase

- implementation plan details
- exact component file list beyond the architectural layers above
- automated Wix scraping or migration tooling
- visual CMS/editor workflows
- advanced filtering or search unless content scale later demands it
