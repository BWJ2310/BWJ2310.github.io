# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vercel-hosted Next.js portfolio app with a custom AURA-inspired shell, remote GitHub-backed MDX content, separate project and blog systems, and seed content migrated from the current Wix portfolio.

**Architecture:** The app repo owns the Next.js App Router shell, `shadcn/ui` scaffold, portfolio system components, route handlers, and remote content pipeline. A separate public GitHub content repo owns `blogs/`, `projects/`, and colocated assets; the app fetches that repo server-side from `main`, validates frontmatter with `zod`, resolves relative asset paths to raw GitHub URLs, and renders approved MDX components through `next-mdx-remote/rsc`.

**Tech Stack:** `bun`, Next.js App Router, React, Tailwind CSS, `shadcn/ui`, `@next/mdx`, `next-mdx-remote/rsc`, `gray-matter`, `zod`, Vitest, React Testing Library, Playwright

---

## File Map

### App Repo

- Create: `.env.example`
- Create: `components.json`
- Create: `package.json`
- Create: `bun.lock`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/projects/page.tsx`
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/projects/[slug]/[page]/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/error.tsx`
- Create: `app/not-found.tsx`
- Create: `app/globals.css`
- Create: `components/system/site-header.tsx`
- Create: `components/system/site-footer.tsx`
- Create: `components/system/background-field.tsx`
- Create: `components/system/section-frame.tsx`
- Create: `components/system/glass-panel.tsx`
- Create: `components/system/page-header.tsx`
- Create: `components/system/project-subnav.tsx`
- Create: `components/system/project-card.tsx`
- Create: `components/system/blog-card.tsx`
- Create: `components/mdx/project-hero.tsx`
- Create: `components/mdx/wide-image.tsx`
- Create: `components/mdx/media-grid.tsx`
- Create: `components/mdx/process-timeline.tsx`
- Create: `components/mdx/result-stats.tsx`
- Create: `components/mdx/pull-quote.tsx`
- Create: `components/mdx/tool-stack.tsx`
- Create: `components/mdx/index.tsx`
- Create: `lib/utils.ts`
- Create: `lib/content/config.ts`
- Create: `lib/content/github.ts`
- Create: `lib/content/schema.ts`
- Create: `lib/content/assets.ts`
- Create: `lib/content/mdx.tsx`
- Create: `lib/content/loaders.ts`
- Create: `lib/content/types.ts`
- Create: `tests/setup.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/content/config.test.ts`
- Create: `tests/content/schema.test.ts`
- Create: `tests/content/assets.test.ts`
- Create: `tests/content/loaders.test.ts`
- Create: `tests/routes/home.test.tsx`
- Create: `tests/routes/project-route.test.tsx`
- Create: `tests/routes/blog-route.test.tsx`
- Create: `tests/e2e/smoke.spec.ts`

### Content Repo

- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\README.md`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\story.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\journal.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\robotics\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\art\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\blogs\introducing-jun\index.mdx`

### Responsibilities

- `app/*`: route composition and page-level rendering
- `components/system/*`: portfolio shell and AURA-aligned building blocks
- `components/mdx/*`: approved MDX storytelling blocks
- `lib/content/*`: remote fetch, parsing, validation, MDX compile, and route loaders
- `tests/content/*`: data contracts and loader behavior
- `tests/routes/*`: route rendering smoke tests
- `tests/e2e/*`: browser-level verification
- content repo files: portable content only, no app logic

### Task 1: Scaffold The App Repo And Testing Harness

**Files:**
- Create: `package.json`
- Create: `bun.lock`
- Create: `components.json`
- Create: `.env.example`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `lib/utils.ts`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `playwright.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Scaffold the official Next.js + shadcn base**

Run:

```bash
bun x shadcn@latest init -t next --yes
```

Expected:

- Next.js app files are created in `C:\Users\jun12\Desktop\Profile\BWJ2310.github.io`
- `components.json` exists
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, and `lib/utils.ts` exist

- [ ] **Step 2: Install content and test dependencies**

Run:

```bash
bun add @next/mdx next-mdx-remote gray-matter zod
bun add -d vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event playwright
```

Expected:

- `package.json` contains runtime and test dependencies
- `bun.lock` is updated

- [ ] **Step 3: Configure scripts and test entrypoints**

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest"
```

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command: "bun run dev",
    port: 3000,
    reuseExistingServer: true,
  },
})
```

- [ ] **Step 4: Verify the scaffold and toolchain**

Run:

```bash
bun run lint
bun run test
```

Expected:

- lint exits `0`
- Vitest exits `0` with no failing tests

- [ ] **Step 5: Commit the scaffold baseline**

Run:

```bash
git add package.json bun.lock components.json app lib vitest.config.ts playwright.config.ts tests
git commit -m "chore: scaffold Next.js portfolio app"
```

### Task 2: Establish The AURA Shell And Homepage Skeleton

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `components/system/site-header.tsx`
- Create: `components/system/site-footer.tsx`
- Create: `components/system/background-field.tsx`
- Create: `components/system/section-frame.tsx`
- Create: `components/system/glass-panel.tsx`
- Create: `tests/routes/home.test.tsx`

- [ ] **Step 1: Write the failing homepage shell test**

Create `tests/routes/home.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import HomePage from "@/app/page"

describe("HomePage", () => {
  it("renders the approved homepage sections in order", () => {
    render(<HomePage />)

    const hero = screen.getByRole("heading", { name: /creative engineer/i })
    const selectedWork = screen.getByRole("heading", { name: /selected work/i })
    const practiceAreas = screen.getByRole("heading", { name: /practice areas/i })
    const aboutPreview = screen.getByRole("heading", { name: /about/i })
    const contact = screen.getByRole("heading", { name: /contact/i })

    expect(hero).toBeInTheDocument()
    expect(selectedWork.compareDocumentPosition(practiceAreas)).toBeTruthy()
    expect(practiceAreas).toBeInTheDocument()
    expect(aboutPreview).toBeInTheDocument()
    expect(contact).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
bun run test tests/routes/home.test.tsx
```

Expected:

- FAIL because the default scaffold page does not render the approved sections

- [ ] **Step 3: Implement the site shell and homepage skeleton**

Create `components/system/section-frame.tsx`:

```tsx
import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

type SectionFrameProps = PropsWithChildren<{
  className?: string
  id?: string
}>

export function SectionFrame({ children, className, id }: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-16", className)}
    >
      {children}
    </section>
  )
}
```

Create `.env.example`:

```env
CONTENT_REPO_OWNER=jun1216wei
CONTENT_REPO_NAME=BWJ2310-portfolio-content
CONTENT_REPO_REF=main
```

Create `components/system/glass-panel.tsx`:

```tsx
import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

type GlassPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "border border-black/15 bg-zinc-950/92 p-8 text-zinc-50 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  )
}
```

Create `components/system/background-field.tsx`:

```tsx
export function BackgroundField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(0,240,255,0.12), transparent 22%), radial-gradient(circle at 80% 30%, rgba(10,69,255,0.08), transparent 18%), linear-gradient(#f5f4f2, #f5f4f2)",
      }}
    />
  )
}
```

Create `components/system/site-header.tsx`:

```tsx
import Link from "next/link"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-8">
      <Link className="text-xs font-semibold uppercase tracking-[0.3em]" href="/">
        Jun Wei
      </Link>
      <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.24em] text-zinc-600">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
```

Create `components/system/site-footer.tsx`:

```tsx
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-6 py-10 text-xs uppercase tracking-[0.24em] text-zinc-500 md:px-8">
      Creative engineer. Product-minded systems, robotics, and visual work.
    </footer>
  )
}
```

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next"
import "./globals.css"
import { BackgroundField } from "@/components/system/background-field"
import { SiteFooter } from "@/components/system/site-footer"
import { SiteHeader } from "@/components/system/site-header"

export const metadata: Metadata = {
  title: "Jun Wei Portfolio",
  description: "Creative engineer with a product mindset.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-stone-100 text-zinc-950 antialiased">
        <BackgroundField />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
```

Replace `app/page.tsx` with:

```tsx
import Link from "next/link"
import { GlassPanel } from "@/components/system/glass-panel"
import { SectionFrame } from "@/components/system/section-frame"

const featuredProjects = ["CS Pet Tech", "Sox", "Robotics", "Art"]
const practiceAreas = ["Product design", "Engineering systems", "Robotics", "Visual art"]

export default function HomePage() {
  return (
    <>
      <SectionFrame className="pt-8">
        <GlassPanel>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-cyan-300">Creative Engineer</p>
          <h1 className="max-w-4xl text-5xl font-medium uppercase tracking-[-0.05em] md:text-7xl">
            Creative engineer with a product-minded approach.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            I build systems, interfaces, and stories across software, robotics, and visual practice.
          </p>
          <div className="mt-8 flex gap-4">
            <Link className="bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-950" href="/projects">
              View Projects
            </Link>
            <Link className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-300" href="/about">
              Read Story
            </Link>
          </div>
        </GlassPanel>
      </SectionFrame>

      <SectionFrame id="selected-work">
        <h2 className="text-2xl uppercase tracking-[-0.04em]">Selected Work</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <GlassPanel key={project}>{project}</GlassPanel>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="practice-areas">
        <h2 className="text-2xl uppercase tracking-[-0.04em]">Practice Areas</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {practiceAreas.map((area) => (
            <div key={area} className="border border-black/15 p-6">
              {area}
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="about-preview">
        <h2 className="text-2xl uppercase tracking-[-0.04em]">About</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">
          Product-minded engineering, systems thinking, and visual storytelling across multidisciplinary work.
        </p>
      </SectionFrame>

      <SectionFrame id="contact">
        <h2 className="text-2xl uppercase tracking-[-0.04em]">Contact</h2>
        <p className="mt-4 text-zinc-700">Reach out for collaboration, product work, or creative commissions.</p>
      </SectionFrame>
    </>
  )
}
```

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 245 244 242;
  --foreground: 18 18 18;
  --card: 18 18 18;
  --card-foreground: 245 244 242;
  --primary: 0 240 255;
  --primary-foreground: 18 18 18;
  --muted: 115 115 115;
  --border: 0 0 0;
  --radius: 0rem;
}

body {
  background: rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: Inter, sans-serif;
}
```

- [ ] **Step 4: Run the test and lint again**

Run:

```bash
bun run test tests/routes/home.test.tsx
bun run lint
```

Expected:

- homepage test passes
- lint exits `0`

- [ ] **Step 5: Commit the shell baseline**

Run:

```bash
git add app components/system tests/routes/home.test.tsx
git commit -m "feat: add portfolio shell and homepage skeleton"
```

### Task 3: Build The Remote Content Contract

**Files:**
- Create: `lib/content/types.ts`
- Create: `lib/content/config.ts`
- Create: `lib/content/schema.ts`
- Create: `lib/content/assets.ts`
- Modify: `next.config.ts`
- Create: `tests/content/config.test.ts`
- Create: `tests/content/schema.test.ts`
- Create: `tests/content/assets.test.ts`

- [ ] **Step 1: Write failing tests for config, schema, and asset rules**

Create `tests/content/config.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { getContentConfig } from "@/lib/content/config"

describe("getContentConfig", () => {
  it("builds a public GitHub source config from environment variables", () => {
    const config = getContentConfig({
      CONTENT_REPO_OWNER: "jun1216wei",
      CONTENT_REPO_NAME: "BWJ2310-portfolio-content",
      CONTENT_REPO_REF: "main",
    })

    expect(config.owner).toBe("jun1216wei")
    expect(config.repo).toBe("BWJ2310-portfolio-content")
    expect(config.ref).toBe("main")
  })
})
```

Create `tests/content/schema.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { blogSchema, projectChildSchema, projectSchema } from "@/lib/content/schema"

describe("content schemas", () => {
  it("accepts a project overview", () => {
    const result = projectSchema.safeParse({
      title: "CS Pet Tech",
      description: "Pet tech case study.",
      status: "Completed",
      year: "2026",
      role: "Designer and engineer",
      team: "Independent",
      tools: ["Next.js", "Figma"],
      cover: "./cover.png",
      featured: true,
    })

    expect(result.success).toBe(true)
  })

  it("rejects a child page without an order", () => {
    const result = projectChildSchema.safeParse({
      title: "Story",
    })

    expect(result.success).toBe(false)
  })

  it("accepts a blog post", () => {
    const result = blogSchema.safeParse({
      title: "Introducing Jun",
      description: "A short introduction.",
      date: "2026-04-23",
      tags: ["intro"],
      image: "./cover.png",
    })

    expect(result.success).toBe(true)
  })
})
```

Create `tests/content/assets.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { resolveContentAsset } from "@/lib/content/assets"

describe("resolveContentAsset", () => {
  it("resolves a relative asset path to raw GitHub", () => {
    expect(
      resolveContentAsset({
        owner: "jun1216wei",
        repo: "BWJ2310-portfolio-content",
        ref: "main",
        contentDir: "projects/cs-pet-tech",
        assetPath: "./cover.png",
      }),
    ).toBe(
      "https://raw.githubusercontent.com/jun1216wei/BWJ2310-portfolio-content/main/projects/cs-pet-tech/cover.png",
    )
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
bun run test tests/content/config.test.ts tests/content/schema.test.ts tests/content/assets.test.ts
```

Expected:

- FAIL because the content config and schema modules do not exist yet

- [ ] **Step 3: Implement the content contract modules**

Create `lib/content/types.ts`:

```ts
export type ContentConfig = {
  owner: string
  repo: string
  ref: string
}
```

Create `lib/content/config.ts`:

```ts
import { z } from "zod"
import type { ContentConfig } from "./types"

const envSchema = z.object({
  CONTENT_REPO_OWNER: z.string().min(1),
  CONTENT_REPO_NAME: z.string().min(1),
  CONTENT_REPO_REF: z.string().min(1).default("main"),
})

export function getContentConfig(input: Partial<Record<string, string | undefined>> = process.env): ContentConfig {
  const parsed = envSchema.parse({
    CONTENT_REPO_OWNER: input.CONTENT_REPO_OWNER,
    CONTENT_REPO_NAME: input.CONTENT_REPO_NAME,
    CONTENT_REPO_REF: input.CONTENT_REPO_REF ?? "main",
  })

  return {
    owner: parsed.CONTENT_REPO_OWNER,
    repo: parsed.CONTENT_REPO_NAME,
    ref: parsed.CONTENT_REPO_REF,
  }
}
```

Create `lib/content/schema.ts`:

```ts
import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).default([]),
  image: z.string().min(1),
})

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string().min(1),
  year: z.string().min(1),
  role: z.string().min(1),
  team: z.string().min(1),
  tools: z.array(z.string()).default([]),
  cover: z.string().min(1),
  featured: z.boolean().default(false),
  headerVariant: z.string().optional(),
  bodyWidth: z.string().optional(),
  fontMode: z.string().optional(),
})

export const projectChildSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
  navTitle: z.string().optional(),
  description: z.string().optional(),
  template: z.string().optional(),
  headerVariant: z.string().optional(),
  bodyWidth: z.string().optional(),
  fontMode: z.string().optional(),
})
```

Create `lib/content/assets.ts`:

```ts
type ResolveContentAssetArgs = {
  owner: string
  repo: string
  ref: string
  contentDir: string
  assetPath: string
}

export function resolveContentAsset({
  owner,
  repo,
  ref,
  contentDir,
  assetPath,
}: ResolveContentAssetArgs) {
  const normalized = assetPath.replace(/^.\//, "")
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${contentDir}/${normalized}`
}
```

Update `next.config.ts`:

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Run the content contract tests**

Run:

```bash
bun run test tests/content/config.test.ts tests/content/schema.test.ts tests/content/assets.test.ts
```

Expected:

- all three test files pass

- [ ] **Step 5: Commit the content contract**

Run:

```bash
git add lib/content tests/content
git commit -m "feat: add remote content schemas and asset resolution"
```

### Task 4: Add Remote GitHub Loaders And MDX Rendering

**Files:**
- Create: `lib/content/github.ts`
- Create: `lib/content/mdx.tsx`
- Create: `lib/content/loaders.ts`
- Create: `components/mdx/index.tsx`
- Create: `components/mdx/project-hero.tsx`
- Create: `components/mdx/wide-image.tsx`
- Create: `components/mdx/media-grid.tsx`
- Create: `components/mdx/process-timeline.tsx`
- Create: `components/mdx/result-stats.tsx`
- Create: `components/mdx/pull-quote.tsx`
- Create: `components/mdx/tool-stack.tsx`
- Create: `tests/content/loaders.test.ts`

- [ ] **Step 1: Write the failing loader tests**

Create `tests/content/loaders.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { validateProjectChildren } from "@/lib/content/loaders"
import { assertAllowedRemoteMdx } from "@/lib/content/mdx"

describe("validateProjectChildren", () => {
  it("sorts valid pages and rejects duplicate order values", () => {
    const result = validateProjectChildren([
      { slug: "story", frontmatter: { title: "Story", order: 2 } },
      { slug: "process", frontmatter: { title: "Process", order: 1 } },
      { slug: "gallery", frontmatter: { title: "Gallery", order: 1 } },
    ])

    expect(result.valid.map((page) => page.slug)).toEqual(["process", "story"])
    expect(result.invalid.map((page) => page.slug)).toEqual(["gallery"])
  })
})

describe("assertAllowedRemoteMdx", () => {
  it("rejects import and export statements", () => {
    expect(() => assertAllowedRemoteMdx('import Demo from "./demo"')).toThrow(/disallowed/i)
    expect(() => assertAllowedRemoteMdx("export const value = 1")).toThrow(/disallowed/i)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
bun run test tests/content/loaders.test.ts
```

Expected:

- FAIL because the loader module does not exist yet

- [ ] **Step 3: Implement GitHub fetch, MDX render, and child-page validation**

Create `components/mdx/index.tsx`:

```tsx
import { ProjectHero } from "./project-hero"
import { WideImage } from "./wide-image"
import { MediaGrid } from "./media-grid"
import { ProcessTimeline } from "./process-timeline"
import { ResultStats } from "./result-stats"
import { PullQuote } from "./pull-quote"
import { ToolStack } from "./tool-stack"

export const mdxComponents = {
  ProjectHero,
  WideImage,
  MediaGrid,
  ProcessTimeline,
  ResultStats,
  PullQuote,
  ToolStack,
}
```

Create `lib/content/github.ts`:

```ts
import { getContentConfig } from "./config"

export async function fetchGitHubText(path: string) {
  const config = getContentConfig()
  const url = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.ref}/${path}`
  const response = await fetch(url, { next: { revalidate: 600 } })

  if (!response.ok) {
    throw new Error(`Failed to fetch remote content: ${path}`)
  }

  return response.text()
}

export async function fetchGitHubTree() {
  const config = getContentConfig()
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/git/trees/${config.ref}?recursive=1`
  const response = await fetch(url, { next: { revalidate: 600 } })

  if (!response.ok) {
    throw new Error("Failed to fetch remote tree")
  }

  const data = await response.json()
  return Array.isArray(data.tree) ? data.tree : []
}
```

Create `lib/content/mdx.tsx`:

```tsx
import { compileMDX } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"

const DISALLOWED_REMOTE_PATTERNS = [/^\s*import\s/m, /^\s*export\s/m]

export function assertAllowedRemoteMdx(source: string) {
  for (const pattern of DISALLOWED_REMOTE_PATTERNS) {
    if (pattern.test(source)) {
      throw new Error("Remote MDX contains disallowed module syntax")
    }
  }
}

export async function renderRemoteMdx<TFrontmatter extends Record<string, unknown>>(source: string) {
  assertAllowedRemoteMdx(source)

  return compileMDX<TFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  })
}
```

Create `lib/content/loaders.ts`:

```ts
import matter from "gray-matter"
import { resolveContentAsset } from "./assets"
import { getContentConfig } from "./config"
import { fetchGitHubText, fetchGitHubTree } from "./github"
import { blogSchema, projectChildSchema, projectSchema } from "./schema"

type ChildCandidate = {
  slug: string
  frontmatter: {
    title?: string
    order?: number
  }
}

export function validateProjectChildren(children: ChildCandidate[]) {
  const seenOrders = new Set<number>()
  const valid: ChildCandidate[] = []
  const invalid: ChildCandidate[] = []

  for (const child of children) {
    if (!child.frontmatter.title || typeof child.frontmatter.order !== "number") {
      invalid.push(child)
      continue
    }

    if (seenOrders.has(child.frontmatter.order)) {
      invalid.push(child)
      continue
    }

    seenOrders.add(child.frontmatter.order)
    valid.push(child)
  }

  valid.sort((a, b) => a.frontmatter.order! - b.frontmatter.order!)

  return { valid, invalid }
}

export async function getProjectSlugs() {
  const tree = await fetchGitHubTree()

  return tree
    .filter((entry: { path?: string }) => entry.path?.startsWith("projects/") && entry.path?.endsWith("/index.mdx"))
    .map((entry: { path: string }) => entry.path.split("/")[1])
}

export async function getBlogSlugs() {
  const tree = await fetchGitHubTree()

  return tree
    .filter((entry: { path?: string }) => entry.path?.startsWith("blogs/") && entry.path?.endsWith("/index.mdx"))
    .map((entry: { path: string }) => entry.path.split("/")[1])
}

export async function getProjectOverview(slug: string) {
  const source = await fetchGitHubText(`projects/${slug}/index.mdx`)
  const { data, content } = matter(source)
  const config = getContentConfig()
  const parsed = projectSchema.parse(data)

  return {
    slug,
    body: content,
    frontmatter: {
      ...parsed,
      cover: resolveContentAsset({
        owner: config.owner,
        repo: config.repo,
        ref: config.ref,
        contentDir: `projects/${slug}`,
        assetPath: parsed.cover,
      }),
    },
  }
}

export async function getProjectChildren(slug: string) {
  const tree = await fetchGitHubTree()
  const config = getContentConfig()

  const childPaths = tree
    .filter(
      (entry: { path?: string }) =>
        entry.path?.startsWith(`projects/${slug}/`) &&
        entry.path?.endsWith(".mdx") &&
        !entry.path?.endsWith("/index.mdx"),
    )
    .map((entry: { path: string }) => entry.path)

  const candidates = await Promise.all(
    childPaths.map(async (path) => {
      const source = await fetchGitHubText(path)
      const { data, content } = matter(source)
      const parsed = projectChildSchema.safeParse(data)
      const fileSlug = path.split("/").pop()!.replace(/\.mdx$/, "")

      if (!parsed.success) {
        return { slug: fileSlug, invalid: true as const, content, frontmatter: data }
      }

      return {
        slug: fileSlug,
        invalid: false as const,
        content,
        frontmatter: parsed.data,
        contentDir: `projects/${slug}`,
        owner: config.owner,
        repo: config.repo,
        ref: config.ref,
      }
    }),
  )

  const { valid, invalid } = validateProjectChildren(
    candidates
      .filter((candidate) => !candidate.invalid)
      .map((candidate) => ({ slug: candidate.slug, frontmatter: candidate.frontmatter })),
  )

  return { valid, invalid }
}

export async function getBlogPost(slug: string) {
  const source = await fetchGitHubText(`blogs/${slug}/index.mdx`)
  const { data, content } = matter(source)
  const config = getContentConfig()
  const parsed = blogSchema.parse(data)

  return {
    slug,
    body: content,
    frontmatter: {
      ...parsed,
      image: resolveContentAsset({
        owner: config.owner,
        repo: config.repo,
        ref: config.ref,
        contentDir: `blogs/${slug}`,
        assetPath: parsed.image,
      }),
    },
  }
}
```

Create minimal MDX blocks, for example `components/mdx/project-hero.tsx`:

```tsx
type ProjectHeroProps = {
  title: string
  summary: string
}

export function ProjectHero({ title, summary }: ProjectHeroProps) {
  return (
    <div className="border border-black/15 bg-zinc-950 p-8 text-zinc-50">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">Project</p>
      <h1 className="mt-4 text-4xl uppercase tracking-[-0.04em]">{title}</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">{summary}</p>
    </div>
  )
}
```

Create `components/mdx/wide-image.tsx`:

```tsx
type WideImageProps = {
  src: string
  alt: string
  caption?: string
}

export function WideImage({ src, alt, caption }: WideImageProps) {
  return (
    <figure className="space-y-3">
      <img alt={alt} className="w-full border border-black/15 object-cover" src={src} />
      {caption ? <figcaption className="text-sm text-zinc-500">{caption}</figcaption> : null}
    </figure>
  )
}
```

Create `components/mdx/media-grid.tsx`:

```tsx
type MediaGridProps = {
  items: Array<{ src: string; alt: string }>
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <img key={item.src} alt={item.alt} className="w-full border border-black/15 object-cover" src={item.src} />
      ))}
    </div>
  )
}
```

Create `components/mdx/process-timeline.tsx`:

```tsx
type ProcessTimelineProps = {
  steps: Array<{ title: string; summary: string }>
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="grid gap-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border border-black/15 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-600">Step {index + 1}</p>
          <h3 className="mt-3 text-xl uppercase tracking-[-0.03em]">{step.title}</h3>
          <p className="mt-3 text-zinc-700">{step.summary}</p>
        </li>
      ))}
    </ol>
  )
}
```

Create `components/mdx/result-stats.tsx`:

```tsx
type ResultStatsProps = {
  items: Array<{ label: string; value: string }>
}

export function ResultStats({ items }: ResultStatsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="border border-black/15 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">{item.label}</p>
          <p className="mt-3 text-3xl uppercase tracking-[-0.03em]">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
```

Create `components/mdx/pull-quote.tsx`:

```tsx
type PullQuoteProps = {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-l-4 border-cyan-400 pl-6 text-2xl tracking-[-0.03em]">
      <p>{quote}</p>
      {attribution ? <footer className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-500">{attribution}</footer> : null}
    </blockquote>
  )
}
```

Create `components/mdx/tool-stack.tsx`:

```tsx
type ToolStackProps = {
  tools: string[]
}

export function ToolStack({ tools }: ToolStackProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <li key={tool} className="border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.2em]">
          {tool}
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 4: Run the loader tests**

Run:

```bash
bun run test tests/content/loaders.test.ts
```

Expected:

- loader tests pass

- [ ] **Step 5: Commit the remote content pipeline core**

Run:

```bash
git add lib/content components/mdx tests/content/loaders.test.ts
git commit -m "feat: add remote MDX rendering pipeline"
```

### Task 5: Build Archive And Detail Routes

**Files:**
- Create: `components/system/page-header.tsx`
- Create: `components/system/project-subnav.tsx`
- Create: `components/system/project-card.tsx`
- Create: `components/system/blog-card.tsx`
- Create: `app/about/page.tsx`
- Create: `app/projects/page.tsx`
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/projects/[slug]/[page]/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/error.tsx`
- Create: `app/not-found.tsx`
- Create: `tests/routes/project-route.test.tsx`
- Create: `tests/routes/blog-route.test.tsx`

- [ ] **Step 1: Write failing route smoke tests**

Create `tests/routes/project-route.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import ProjectsPage from "@/app/projects/page"

describe("ProjectsPage", () => {
  it("renders a projects archive heading", () => {
    render(<ProjectsPage />)
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument()
  })
})
```

Create `tests/routes/blog-route.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import BlogPage from "@/app/blog/page"

describe("BlogPage", () => {
  it("renders a blog archive heading", () => {
    render(<BlogPage />)
    expect(screen.getByRole("heading", { name: /blog/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the smoke tests to verify they fail**

Run:

```bash
bun run test tests/routes/project-route.test.tsx tests/routes/blog-route.test.tsx
```

Expected:

- FAIL because the archive routes do not exist yet

- [ ] **Step 3: Implement the route skeletons and error states**

Create `components/system/page-header.tsx`:

```tsx
type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border border-black/15 bg-zinc-950 p-8 text-zinc-50">
      {eyebrow ? <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p> : null}
      <h1 className="mt-4 text-4xl uppercase tracking-[-0.04em]">{title}</h1>
      {description ? <p className="mt-4 max-w-2xl text-zinc-300">{description}</p> : null}
    </div>
  )
}
```

Create `app/projects/page.tsx`:

```tsx
import { ProjectCard } from "@/components/system/project-card"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { getProjectOverview, getProjectSlugs } from "@/lib/content/loaders"

export default async function ProjectsPage() {
  const slugs = await getProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProjectOverview(slug)))

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Archive"
        title="Projects"
        description="Case studies, experiments, robotics work, and visual projects."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            description={project.frontmatter.description}
            href={`/projects/${project.slug}`}
            title={project.frontmatter.title}
          />
        ))}
      </div>
    </SectionFrame>
  )
}
```

Create `app/blog/page.tsx`:

```tsx
import { BlogCard } from "@/components/system/blog-card"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { getBlogPost, getBlogSlugs } from "@/lib/content/loaders"

export default async function BlogPage() {
  const slugs = await getBlogSlugs()
  const posts = await Promise.all(slugs.map((slug) => getBlogPost(slug)))

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Articles, notes, and project-adjacent writing."
      />
      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            description={post.frontmatter.description}
            href={`/blog/${post.slug}`}
            title={post.frontmatter.title}
          />
        ))}
      </div>
    </SectionFrame>
  )
}
```

Create `components/system/project-subnav.tsx`:

```tsx
import Link from "next/link"

type ProjectSubnavProps = {
  projectSlug: string
  items: Array<{ slug: string; label: string }>
}

export function ProjectSubnav({ projectSlug, items }: ProjectSubnavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          className="border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.2em]"
          href={`/projects/${projectSlug}/${item.slug}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

Create `components/system/project-card.tsx`:

```tsx
import Link from "next/link"

type ProjectCardProps = {
  href: string
  title: string
  description: string
}

export function ProjectCard({ href, title, description }: ProjectCardProps) {
  return (
    <Link className="block border border-black/15 bg-zinc-950 p-6 text-zinc-50" href={href}>
      <h2 className="text-2xl uppercase tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-zinc-300">{description}</p>
    </Link>
  )
}
```

Create `components/system/blog-card.tsx`:

```tsx
import Link from "next/link"

type BlogCardProps = {
  href: string
  title: string
  description: string
}

export function BlogCard({ href, title, description }: BlogCardProps) {
  return (
    <Link className="block border border-black/15 p-6" href={href}>
      <h2 className="text-xl uppercase tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-zinc-700">{description}</p>
    </Link>
  )
}
```

Create `app/about/page.tsx`:

```tsx
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

export default function AboutPage() {
  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Profile"
        title="About"
        description="Creative engineering, product thinking, and a multidisciplinary practice."
      />
    </SectionFrame>
  )
}
```

Create `app/contact/page.tsx`:

```tsx
import Link from "next/link"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

export default function ContactPage() {
  return (
    <SectionFrame>
      <PageHeader eyebrow="Contact" title="Contact" description="Open to collaboration and thoughtful work." />
      <div className="mt-6 flex gap-4 text-xs uppercase tracking-[0.2em]">
        <Link href="mailto:hello@example.com">Email</Link>
        <Link href="https://github.com/jun1216wei">GitHub</Link>
      </div>
    </SectionFrame>
  )
}
```

Create `app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { renderRemoteMdx } from "@/lib/content/mdx"
import { getProjectChildren, getProjectOverview } from "@/lib/content/loaders"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  const project = await getProjectOverview(slug)
  const children = await getProjectChildren(slug)
  const { content } = await renderRemoteMdx(project.body)

  return (
    <SectionFrame>
      <PageHeader eyebrow="Project" title={project.frontmatter.title} description={project.frontmatter.description} />
      <div className="mt-6">{content}</div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {children.valid.map((child) => (
          <a
            key={child.slug}
            className="border border-black/15 p-6 text-sm uppercase tracking-[0.2em]"
            href={`/projects/${slug}/${child.slug}`}
          >
            {child.frontmatter.title}
          </a>
        ))}
      </div>
    </SectionFrame>
  )
}
```

Create `app/projects/[slug]/[page]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/system/page-header"
import { ProjectSubnav } from "@/components/system/project-subnav"
import { SectionFrame } from "@/components/system/section-frame"
import { renderRemoteMdx } from "@/lib/content/mdx"
import { fetchGitHubText } from "@/lib/content/github"
import { getProjectChildren } from "@/lib/content/loaders"
import matter from "gray-matter"

type ProjectChildPageProps = {
  params: Promise<{ slug: string; page: string }>
}

export default async function ProjectChildPage({ params }: ProjectChildPageProps) {
  const { slug, page } = await params

  if (!slug || !page) {
    notFound()
  }

  const children = await getProjectChildren(slug)
  const active = children.valid.find((child) => child.slug === page)

  if (!active) {
    notFound()
  }

  const source = await fetchGitHubText(`projects/${slug}/${page}.mdx`)
  const { content: body } = matter(source)
  const rendered = await renderRemoteMdx(body)

  return (
    <SectionFrame>
      <ProjectSubnav
        items={children.valid.map((child) => ({
          slug: child.slug,
          label: child.frontmatter.navTitle ?? child.frontmatter.title,
        }))}
        projectSlug={slug}
      />
      <div className="mt-6">
        <PageHeader
          eyebrow="Project Page"
          title={active.frontmatter.title}
          description={active.frontmatter.description}
        />
      </div>
      <div className="mt-6">{rendered.content}</div>
    </SectionFrame>
  )
}
```

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { renderRemoteMdx } from "@/lib/content/mdx"
import { getBlogPost } from "@/lib/content/loaders"

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  const post = await getBlogPost(slug)
  const rendered = await renderRemoteMdx(post.body)

  return (
    <SectionFrame>
      <PageHeader eyebrow="Article" title={post.frontmatter.title} description={post.frontmatter.description} />
      <article className="prose prose-zinc mt-8 max-w-3xl">{rendered.content}</article>
    </SectionFrame>
  )
}
```

Create `app/error.tsx`:

```tsx
"use client"

export default function GlobalError() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl uppercase tracking-[-0.04em]">Content unavailable</h1>
      <p className="mt-4 text-zinc-700">The requested content could not be loaded. Check the remote content source and try again.</p>
    </div>
  )
}
```

Create `app/not-found.tsx`:

```tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl uppercase tracking-[-0.04em]">Not found</h1>
      <p className="mt-4 text-zinc-700">That page does not exist in this portfolio.</p>
      <Link className="mt-6 inline-block border border-black/15 px-4 py-3 text-xs uppercase tracking-[0.2em]" href="/">
        Return home
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Run route tests and a production build**

Run:

```bash
bun run test tests/routes/home.test.tsx tests/routes/project-route.test.tsx tests/routes/blog-route.test.tsx
bun run build
```

Expected:

- route tests pass
- Next.js build succeeds

- [ ] **Step 5: Commit the route system**

Run:

```bash
git add app components/system tests/routes
git commit -m "feat: add archive and detail route shells"
```

### Task 6: Create The Separate Content Repo And Seed Migrated Content

**Files:**
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\README.md`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\story.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\journal.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\robotics\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\art\index.mdx`
- Create: `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\blogs\introducing-jun\index.mdx`

- [ ] **Step 1: Create the content repo directory and README**

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\README.md`:

```md
# BWJ2310 Portfolio Content

This repository stores remote content for the Next.js portfolio app.

Rules:

- `blogs/<slug>/index.mdx` defines a blog post
- `projects/<slug>/index.mdx` defines a project overview
- sibling project `.mdx` files define child pages
- image paths should stay relative, such as `./cover.png`
- remote content must not use `import` or `export`
```

- [ ] **Step 2: Seed the CS Pet Tech and Sox project content**

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\index.mdx`:

```mdx
---
title: "CS Pet Tech"
description: "A pet-tech case study focused on product thinking and execution."
status: "Completed"
year: "2026"
role: "Product-minded creative engineer"
team: "Independent"
tools: ["Figma", "Next.js", "Research"]
cover: "./cover.png"
featured: true
headerVariant: "immersive"
bodyWidth: "narrow"
fontMode: "editorial"
---

This project overview migrates the current Wix summary into a stronger case-study entry point.
```

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\cs-pet-tech\story.mdx`:

```mdx
---
title: "Story"
order: 1
navTitle: "Story"
template: "story"
headerVariant: "immersive"
---

<ProjectHero title="CS Pet Tech" summary="From problem framing through product story." />
```

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\index.mdx`:

```mdx
---
title: "Sox"
description: "An evolving project that reads as an R&D journal and product case study."
status: "In Progress"
year: "2026"
role: "Builder"
team: "Independent"
tools: ["Research", "Prototype", "Iteration"]
cover: "./cover.png"
featured: true
---

Sox is framed as an evolving body of work rather than a static launch artifact.
```

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\sox\journal.mdx`:

```mdx
---
title: "Journal"
order: 1
navTitle: "Journal"
template: "story"
---

This page captures iteration notes and project evolution.
```

- [ ] **Step 3: Seed Robotics, Art, and the first blog entry**

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\robotics\index.mdx`:

```mdx
---
title: "Robotics"
description: "A milestone-driven archive of robotics work and selected highlights."
status: "Ongoing"
year: "2026"
role: "Creative engineer"
team: "Independent and collaborative work"
tools: ["Hardware", "Control systems", "Prototyping"]
cover: "./cover.png"
featured: true
---

Robotics is presented as a curated archive rather than a single linear case study.
```

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\projects\art\index.mdx`:

```mdx
---
title: "Art"
description: "Gallery-led visual work with a lighter textual frame."
status: "Ongoing"
year: "2026"
role: "Artist and engineer"
team: "Independent"
tools: ["Drawing", "Digital media", "Visual direction"]
cover: "./cover.png"
featured: true
---

Art should read as a visual portfolio within the broader site system.
```

Create `C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content\blogs\introducing-jun\index.mdx`:

```mdx
---
title: "Introducing Jun"
description: "A short introduction to the portfolio and the way the work is organized."
date: "2026-04-23"
tags: ["intro", "portfolio"]
image: "./cover.png"
---

This article anchors the blog collection with a concise personal introduction.
```

- [ ] **Step 4: Initialize the sibling repo and connect the app env**

Run:

```bash
cd C:\Users\jun12\Desktop\Profile\BWJ2310-portfolio-content
git init
git checkout -b main
git add .
git commit -m "feat: seed portfolio content repo"
```

Then set app env values in the app repo:

```env
CONTENT_REPO_OWNER=jun1216wei
CONTENT_REPO_NAME=BWJ2310-portfolio-content
CONTENT_REPO_REF=main
```

Ensure `.env.example` in the app repo contains the same keys:

```env
CONTENT_REPO_OWNER=jun1216wei
CONTENT_REPO_NAME=BWJ2310-portfolio-content
CONTENT_REPO_REF=main
```

Expected:

- the content repo exists with the agreed structure
- the app repo can target it through env values

- [ ] **Step 5: Commit the app-side env wiring and repo documentation**

Run:

```bash
git add .env.example
git commit -m "docs: document remote content repository configuration"
```

### Task 7: Final Verification And Visual Review

**Files:**
- Test: `tests/content/*.test.ts`
- Test: `tests/routes/*.test.tsx`
- Test: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add end-to-end smoke coverage**

Create `tests/e2e/smoke.spec.ts`:

```ts
import { expect, test } from "@playwright/test"

test("homepage renders the five approved sections", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /selected work/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: /practice areas/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: /about/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible()
})
```

- [ ] **Step 2: Run the full automated suite**

Run:

```bash
bun run test
bun run build
bun run test:e2e
```

Expected:

- unit tests pass
- production build succeeds
- end-to-end smoke test passes

- [ ] **Step 3: Run manual visual checks against the spec**

Verify manually in the browser:

- homepage uses off-white field, dark framed hero, cyan accent moments, and zero-radius controls
- the shell does not resemble the default `shadcn` starter
- navigation order is `Home`, `Projects`, `About`, `Blog`, `Contact`
- project and blog routes show explicit error or not-found states when content is unavailable
- layout remains stable on desktop and mobile widths

- [ ] **Step 4: Capture final cleanup fixes**

Run:

```bash
git status --short
```

Expected:

- only intentional implementation changes remain

- [ ] **Step 5: Commit the verified portfolio foundation**

Run:

```bash
git add .
git commit -m "feat: ship initial remote-content portfolio foundation"
```
