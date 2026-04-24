import Link from "next/link"

import { PageHeader } from "@/components/system/page-header"
import { SectionFrame } from "@/components/system/section-frame"

export default function ContactPage() {
  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Contact"
        title="Contact"
        description="Open to collaboration, product work, technical storytelling, and selected creative commissions."
      />
      <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
        <Link href="mailto:hello@example.com">Email</Link>
        <Link href="https://github.com/jun1216wei">GitHub</Link>
      </div>
    </SectionFrame>
  )
}
