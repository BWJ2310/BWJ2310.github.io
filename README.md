# BWJ2310 Portfolio

Next.js portfolio shell for a project-first personal site.

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

## GitHub Pages

The app is configured for a static `next build`. The generated site is written
to `docs/` and includes `.nojekyll` so GitHub Pages serves `_next` assets.
`bun run build` refreshes `docs/` from Next's generated `out/` directory.

To use GitHub's built-in Pages publisher without adding a deployment workflow,
set Pages to **Deploy from a branch** and choose `main` / `/docs`. GitHub's
branch publisher deploys files already in the selected source; it does not run
the Next.js build for you.

## Content

The app reads project content directly from this repository.

Expected content structure:

```text
content/
  projects/
    project-name/
      index.mdx
      images/
        image.png
```

Each project detail page is sourced only from `content/projects/<slug>/index.mdx`. Sibling MDX files are ignored by the app and do not generate routes or subnav items.
