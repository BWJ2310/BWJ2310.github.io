import { notFound } from "next/navigation"

import { ContentBody } from "@/components/system/content-body"
import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { ProjectSubnav } from "@/components/system/project-subnav"
import { SectionFrame } from "@/components/system/section-frame"
import { createContentAssetResolver } from "@/lib/content/assets"
import { getContentConfig } from "@/lib/content/config"
import {
  getProjectChildPage,
  getProjectChildren,
  getProjectSlugs,
} from "@/lib/content/loaders"
import { renderRemoteMdx } from "@/lib/content/mdx"

type ProjectChildPageProps = {
  params: Promise<{ slug: string; page: string }>
}

export const revalidate = 600

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs()
    const pageGroups = await Promise.all(
      slugs.map(async (slug) => {
        const children = await getProjectChildren(slug)
        return children.valid.map((child) => ({ slug, page: child.slug }))
      }),
    )

    return pageGroups.flat()
  } catch {
    return []
  }
}

export default async function ProjectChildPage({ params }: ProjectChildPageProps) {
  const { slug, page } = await params

  if (!slug || !page) {
    notFound()
  }

  let availableSlugs: string[] = []
  let availablePages: Awaited<ReturnType<typeof getProjectChildren>> | undefined
  let childPage: Awaited<ReturnType<typeof getProjectChildPage>> | undefined
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
        <PageHeader eyebrow="Project Page" title={page.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project page could not load" />
      </SectionFrame>
    )
  }

  if (!availableSlugs.includes(slug)) {
    notFound()
  }

  try {
    availablePages = await getProjectChildren(slug)
  } catch (error) {
    contentError = error
  }

  if (contentError || !availablePages) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Project Page" title={page.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project page could not load" />
      </SectionFrame>
    )
  }

  if (availablePages.invalid.length > 0) {
    contentError = new Error(
      `Invalid child page frontmatter: ${availablePages.invalid.map((child) => child.slug).join(", ")}`,
    )
  } else if (!availablePages.valid.some((child) => child.slug === page)) {
    notFound()
  }

  if (contentError) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Project Page" title={page.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project page could not load" />
      </SectionFrame>
    )
  }

  try {
    const loadedChildPage = await getProjectChildPage(slug, page)

    const config = getContentConfig()
    const rendered = await renderRemoteMdx(loadedChildPage.body, {
      resolveAsset: createContentAssetResolver({
        ...config,
        contentDir: loadedChildPage.contentDir,
      }),
    })
    childPage = loadedChildPage
    content = rendered.content
    navItems = availablePages.valid.map((child) => ({
      label: child.frontmatter.navTitle ?? child.frontmatter.title ?? child.slug,
      slug: child.slug,
    }))
  } catch (error) {
    contentError = error
  }

  if (contentError || !childPage || !content) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Project Page" title={page.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Project page could not load" />
      </SectionFrame>
    )
  }

  return (
    <SectionFrame>
      <ProjectSubnav activeSlug={page} items={navItems} projectSlug={slug} />
      <div className="mt-6">
        <PageHeader
          description={childPage.frontmatter.description}
          eyebrow="Project Page"
          title={childPage.frontmatter.title}
          variant={childPage.frontmatter.headerVariant}
        />
      </div>
      <ContentBody bodyWidth={childPage.frontmatter.bodyWidth} fontMode={childPage.frontmatter.fontMode}>
        {content}
      </ContentBody>
    </SectionFrame>
  )
}
