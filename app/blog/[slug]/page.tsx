import { notFound } from "next/navigation"

import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Article"
        title={slug.replace(/-/g, " ")}
        description="Blog article shell pending live remote content wiring."
      />
    </SectionFrame>
  )
}
