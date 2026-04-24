import { BlogCard } from "@/components/system/blog-card"
import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"
import { getBlogArchive } from "@/lib/content/loaders"

export const revalidate = 600

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogArchive>> = []
  let contentError: unknown

  try {
    posts = await getBlogArchive()
  } catch (error) {
    contentError = error
  }

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Articles, notes, and project-adjacent writing."
      />
      {contentError ? <ContentError error={contentError} title="Blog archive could not load" /> : null}
      {!contentError && posts.length === 0 ? <ContentError title="No posts found" /> : null}
      {!contentError && posts.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              description={post.frontmatter.description}
              href={`/blog/${post.slug}`}
              meta={post.frontmatter.date}
              title={post.frontmatter.title}
            />
          ))}
        </div>
      ) : null}
    </SectionFrame>
  )
}
