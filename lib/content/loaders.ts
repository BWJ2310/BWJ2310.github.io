import matter from "gray-matter"

import { resolveContentAsset } from "./assets"
import { getContentConfig } from "./config"
import { readContentText, readContentTree } from "./filesystem"
import { projectSchema } from "./schema"

const rootProjectIndexPattern = /^[^/]+\/index\.mdx$/
const currentTimelinePattern = /\b(ongoing|present|current|now)\b/i
const yearPattern = /\b(19|20)\d{2}\b/g

function getTimelineSortKey(year: string) {
  const years = year.match(yearPattern)?.map(Number) ?? []
  const rank =
    years.length > 0 ? Math.max(...years) : Number.NEGATIVE_INFINITY

  return {
    current: currentTimelinePattern.test(year),
    rank,
  }
}

export async function getProjectSlugs() {
  const config = getContentConfig()
  const tree = await readContentTree(config.root)

  return tree
    .filter((entry) => entry.path && rootProjectIndexPattern.test(entry.path))
    .map((entry) => entry.path!.split("/")[0])
}

export async function getProjectArchive() {
  const slugs = await getProjectSlugs()
  const projects = await Promise.all(
    slugs.map((slug) => getProjectOverview(slug))
  )

  return projects.sort((a, b) => {
    const aKey = getTimelineSortKey(a.frontmatter.year)
    const bKey = getTimelineSortKey(b.frontmatter.year)

    if (aKey.current !== bKey.current) {
      return aKey.current ? -1 : 1
    }

    if (aKey.rank !== bKey.rank) {
      return aKey.rank > bKey.rank ? -1 : 1
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })
}

export async function getFeaturedProjects() {
  const projects = await getProjectArchive()
  return projects.filter((project) => project.frontmatter.featured)
}

export async function getProjectOverview(slug: string) {
  const config = getContentConfig()
  const source = await readContentText(config.root, `${slug}/index.mdx`)
  const { data, content } = matter(source)
  const contentDir = slug
  const parsed = projectSchema.parse(data)

  return {
    slug,
    body: content,
    contentDir,
    frontmatter: {
      ...parsed,
      cover: resolveContentAsset({
        contentDir,
        assetPath: parsed.cover,
      }),
    },
  }
}
