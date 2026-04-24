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

export async function getProjectArchive() {
  const slugs = await getProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProjectOverview(slug)))

  return projects.sort((a, b) => {
    if (a.frontmatter.featured !== b.frontmatter.featured) {
      return a.frontmatter.featured ? -1 : 1
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })
}

export async function getFeaturedProjects() {
  const projects = await getProjectArchive()
  return projects.filter((project) => project.frontmatter.featured)
}

export async function getBlogSlugs() {
  const tree = await fetchGitHubTree()

  return tree
    .filter((entry) => entry.path?.startsWith("blogs/") && entry.path?.endsWith("/index.mdx"))
    .map((entry) => entry.path!.split("/")[1])
}

export async function getBlogArchive() {
  const slugs = await getBlogSlugs()
  const posts = await Promise.all(slugs.map((slug) => getBlogPost(slug)))

  return posts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
}

export async function getProjectOverview(slug: string) {
  const source = await fetchGitHubText(`projects/${slug}/index.mdx`)
  const { data, content } = matter(source)
  const config = getContentConfig()
  const contentDir = `projects/${slug}`
  const parsed = projectSchema.parse(data)

  return {
    slug,
    body: content,
    contentDir,
    frontmatter: {
      ...parsed,
      cover: resolveContentAsset({
        owner: config.owner,
        repo: config.repo,
        ref: config.ref,
        contentDir,
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

  const parsedInvalid = candidates
    .filter((candidate) => candidate.invalid)
    .map((candidate) => ({
      slug: candidate.slug,
      frontmatter: candidate.frontmatter,
    }))

  const validated = validateProjectChildren(
    candidates
      .filter((candidate) => !candidate.invalid)
      .map((candidate) => ({
        slug: candidate.slug,
        frontmatter: candidate.frontmatter,
      })),
  )

  return {
    valid: validated.valid,
    invalid: [...parsedInvalid, ...validated.invalid],
  }
}

export async function getProjectChildPage(slug: string, page: string) {
  const source = await fetchGitHubText(`projects/${slug}/${page}.mdx`)
  const { data, content } = matter(source)
  const parsed = projectChildSchema.parse(data)

  return {
    slug: page,
    body: content,
    contentDir: `projects/${slug}`,
    frontmatter: parsed,
  }
}

export async function getBlogPost(slug: string) {
  const source = await fetchGitHubText(`blogs/${slug}/index.mdx`)
  const { data, content } = matter(source)
  const config = getContentConfig()
  const contentDir = `blogs/${slug}`
  const parsed = blogSchema.parse(data)

  return {
    slug,
    body: content,
    contentDir,
    frontmatter: {
      ...parsed,
      image: resolveContentAsset({
        owner: config.owner,
        repo: config.repo,
        ref: config.ref,
        contentDir,
        assetPath: parsed.image,
      }),
    },
  }
}
