import { notFound } from "next/navigation"

import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Project"
        title={slug.replace(/-/g, " ")}
        description="Project overview shell pending live remote content wiring."
      />
    </SectionFrame>
  )
}
