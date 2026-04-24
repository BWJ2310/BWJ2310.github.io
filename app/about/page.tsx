import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

export default function AboutPage() {
  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Profile"
        title="About"
        description="Product-minded engineering, robotics experimentation, and visual storytelling gathered into one portfolio."
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--foreground)]/78">
          The goal of this portfolio is to present multidisciplinary work as one coherent practice rather than separate
          isolated categories. Product thinking, systems work, robotics, and art all feed the same way of building.
        </p>
        <div className="border border-[color:var(--border)] bg-white/55 p-6 text-sm leading-7 text-[color:var(--muted-foreground)]">
          A fuller personal story and specific milestones will be migrated from the current Wix portfolio into this page.
        </div>
      </div>
    </SectionFrame>
  )
}
