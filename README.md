# BWJ2310 Portfolio

Next.js + shadcn portfolio shell for a project-first personal site.

## Runtime

- Node `24.14.0` or newer
- Bun `1.3.13` or newer

## Commands

```bash
bun install
bun run dev
bun run test
bun run lint
bun run build
```

## Content

The app reads portfolio content from a separate public GitHub repository.

Required Vercel environment variables:

```bash
CONTENT_REPO_OWNER=BWJ2310
CONTENT_REPO_NAME=BWJ2310-portfolio-content
CONTENT_REPO_REF=main
```

Expected content structure:

```text
blogs/
  blog-name/
    index.mdx
    image.png
projects/
  project-name/
    index.mdx
    story.mdx
    process.mdx
```

Project child pages must include explicit `order` frontmatter. The project subnav is generated from those child pages.
