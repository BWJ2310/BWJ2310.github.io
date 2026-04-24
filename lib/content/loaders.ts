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
    navTitle?: string
    description?: string
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
    .filter((entry) => entry.path?.startsWith("projects/") && entry.path?.endsWith("/index.mdx"))
    .map((entry) => entry.path!.split("/")[1])
}

export async function getBlogSlugs() {
  const tree = await fetchGitHubTree()

  return tree
    .filter((entry) => entry.path?.startsWith("blogs/") && entry.path?.endsWith("/index.mdx"))
    .map((entry) => entry.path!.split("/")[1])
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

  const childPaths = tree
    .filter(
      (entry) =>
        entry.path?.startsWith(`projects/${slug}/`) &&
        entry.path?.endsWith(".mdx") &&
        !entry.path?.endsWith("/index.mdx"),
    )
    .map((entry) => entry.path!)

  const candidates = await Promise.all(
    childPaths.map(async (path) => {
      const source = await fetchGitHubText(path)
      const { data } = matter(source)
      const fileSlug = path.split("/").pop()!.replace(/\.mdx$/, "")
      const parsed = projectChildSchema.safeParse(data)

      if (!parsed.success) {
        return {
          slug: fileSlug,
          invalid: true as const,
          frontmatter: data as ChildCandidate["frontmatter"],
        }
      }

      return {
        slug: fileSlug,
        invalid: false as const,
        frontmatter: parsed.data,
      }
    }),
  )

  return validateProjectChildren(
    candidates
      .filter((candidate) => !candidate.invalid)
      .map((candidate) => ({
        slug: candidate.slug,
        frontmatter: candidate.frontmatter,
      })),
  )
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
