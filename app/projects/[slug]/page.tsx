import { notFound } from "next/navigation"

import { ContentBody } from "@/components/system/content-body"
import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { ProjectSubnav } from "@/components/system/project-subnav"
import { SectionFrame } from "@/components/system/section-frame"
import { createContentAssetResolver } from "@/lib/content/assets"
import { getContentConfig } from "@/lib/content/config"
import { getProjectChildren, getProjectOverview, getProjectSlugs } from "@/lib/content/loaders"
import { renderRemoteMdx } from "@/lib/content/mdx"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 600

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  let availableSlugs: string[] = []
  let project: Awaited<ReturnType<typeof getProjectOverview>> | undefined
  let navItems: Array<{ label: string; slug: string }> = []
  let content: Awaited<ReturnType<typeof renderRemoteMdx>>["content"] | undefined
  let contentError: unknown

  try {
    availableSlugs = await getProjectSlugs()
  } catch (error) {
    contentError = error
  }

  if (contentError) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Project" title={slug.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project could not load" />
      </SectionFrame>
    )
  }

  if (!availableSlugs.includes(slug)) {
    notFound()
  }

  try {
    const [loadedProject, children] = await Promise.all([getProjectOverview(slug), getProjectChildren(slug)])

    if (children.invalid.length > 0) {
      throw new Error(`Invalid child page frontmatter: ${children.invalid.map((child) => child.slug).join(", ")}`)
    }

    const config = getContentConfig()
    const rendered = await renderRemoteMdx(loadedProject.body, {
      resolveAsset: createContentAssetResolver({
        ...config,
        contentDir: loadedProject.contentDir,
      }),
    })
    project = loadedProject
    content = rendered.content
    navItems = children.valid.map((child) => ({
      label: child.frontmatter.navTitle ?? child.frontmatter.title ?? child.slug,
      slug: child.slug,
    }))
  } catch (error) {
    contentError = error
  }

  if (contentError || !project || !content) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Project" title={slug.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project could not load" />
      </SectionFrame>
    )
  }

  return (
    <SectionFrame>
      <PageHeader
        cover={project.frontmatter.cover}
        description={project.frontmatter.description}
        eyebrow="Project"
        meta={[
          { label: "Year", value: project.frontmatter.year },
          { label: "Role", value: project.frontmatter.role },
          { label: "Team", value: project.frontmatter.team },
          { label: "Status", value: project.frontmatter.status },
        ]}
        title={project.frontmatter.title}
        variant={project.frontmatter.headerVariant}
      />
      <div className="mt-6">
        <ProjectSubnav items={navItems} projectSlug={slug} />
      </div>
      <ContentBody bodyWidth={project.frontmatter.bodyWidth} fontMode={project.frontmatter.fontMode}>
        {content}
      </ContentBody>
    </SectionFrame>
  )
}
