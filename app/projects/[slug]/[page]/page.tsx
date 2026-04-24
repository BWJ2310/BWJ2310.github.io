import { notFound } from "next/navigation"

import { PageHeader } from "@/components/system/page-header"
import { ProjectSubnav } from "@/components/system/project-subnav"
import { SectionFrame } from "@/components/system/section-frame"

type ProjectChildPageProps = {
  params: Promise<{ slug: string; page: string }>
}

export default async function ProjectChildPage({ params }: ProjectChildPageProps) {
  const { slug, page } = await params

  if (!slug || !page) {
    notFound()
  }

  return (
    <SectionFrame>
      <ProjectSubnav
        items={[
          { slug: "story", label: "Story" },
          { slug: "process", label: "Process" },
        ]}
        projectSlug={slug}
      />
      <div className="mt-6">
        <PageHeader
          eyebrow="Project Page"
          title={page.replace(/-/g, " ")}
          description="Child page shell pending live remote content wiring."
        />
      </div>
    </SectionFrame>
  )
}
