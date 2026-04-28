import { notFound } from "next/navigation"

import { ContentBody } from "@/components/system/content-body"
import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { createContentAssetResolver } from "@/lib/content/assets"
import { getMdxImageMetadata } from "@/lib/content/image-metadata"
import { getProjectOverview, getProjectSlugs } from "@/lib/content/loaders"
import { renderMdx } from "@/lib/content/mdx"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

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
  let content: Awaited<ReturnType<typeof renderMdx>>["content"] | undefined
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
    const loadedProject = await getProjectOverview(slug)

    const imageMetadata = await getMdxImageMetadata(loadedProject.body, {
      contentDir: loadedProject.contentDir,
    })
    const rendered = await renderMdx(loadedProject.body, {
      resolveAsset: createContentAssetResolver({
        contentDir: loadedProject.contentDir,
      }),
      resolveImageMetadata: (src) => imageMetadata.get(src),
    })
    project = loadedProject
    content = rendered.content
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
    <SectionFrame className="max-w-6xl">
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
      <ContentBody bodyWidth={project.frontmatter.bodyWidth} fontMode={project.frontmatter.fontMode}>
        {content}
      </ContentBody>
    </SectionFrame>
  )
}
