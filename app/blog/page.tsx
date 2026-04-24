import { BlogCard } from "@/components/system/blog-card"
import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

const blogArchive = [
  {
    title: "Introducing Jun",
    slug: "introducing-jun",
    description: "A short introduction to the portfolio and the way the work is organized.",
  },
]

export default function BlogPage() {
  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Articles, notes, and project-adjacent writing."
      />
      <div className="mt-8 grid gap-4">
        {blogArchive.map((post) => (
          <BlogCard
            key={post.slug}
            description={post.description}
            href={`/blog/${post.slug}`}
            title={post.title}
          />
        ))}
      </div>
    </SectionFrame>
  )
}
