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

GitHub Pages is published by the workflow in `.github/workflows/pages.yml`.
The workflow builds the static Next.js export into `out/` and deploys that
artifact with GitHub's official Pages actions. Set Pages to **GitHub Actions**
as the publishing source.

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
