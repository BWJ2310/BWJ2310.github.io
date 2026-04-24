import { notFound } from "next/navigation"

import { ContentBody } from "@/components/system/content-body"
import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { createContentAssetResolver } from "@/lib/content/assets"
import { getContentConfig } from "@/lib/content/config"
import { getBlogPost, getBlogSlugs } from "@/lib/content/loaders"
import { renderRemoteMdx } from "@/lib/content/mdx"

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 600

export async function generateStaticParams() {
  try {
    const slugs = await getBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  let availableSlugs: string[] = []
  let post: Awaited<ReturnType<typeof getBlogPost>> | undefined
  let content: Awaited<ReturnType<typeof renderRemoteMdx>>["content"] | undefined
  let contentError: unknown

  try {
    availableSlugs = await getBlogSlugs()
  } catch (error) {
    contentError = error
  }

  if (contentError) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Article" title={slug.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Article could not load" />
      </SectionFrame>
    )
  }

  if (!availableSlugs.includes(slug)) {
    notFound()
  }

  try {
    post = await getBlogPost(slug)
    const config = getContentConfig()
    const rendered = await renderRemoteMdx(post.body, {
      resolveAsset: createContentAssetResolver({
        ...config,
        contentDir: post.contentDir,
      }),
    })
    content = rendered.content
  } catch (error) {
    contentError = error
  }

  if (contentError || !post || !content) {
    return (
      <SectionFrame>
        <PageHeader eyebrow="Article" title={slug.replace(/-/g, " ")} />
        <ContentError error={contentError} title="Article could not load" />
      </SectionFrame>
    )
  }

  return (
    <SectionFrame>
      <PageHeader
        cover={post.frontmatter.image}
        description={post.frontmatter.description}
        eyebrow={post.frontmatter.date}
        title={post.frontmatter.title}
      />
      <ContentBody>{content}</ContentBody>
    </SectionFrame>
  )
}
