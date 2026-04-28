import { Badge } from "@/components/ui/badge"
import { FolderKanban } from "lucide-react"

type ProjectHeroProps = {
  title: string
  summary: string
}

export function ProjectHero({ title, summary }: ProjectHeroProps) {
  return (
    <section className="border-y border-border py-8">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit" variant="outline">
          <FolderKanban className="size-3" aria-hidden="true" />
          Project file
        </Badge>
        <h2 className="font-heading text-3xl font-normal leading-tight tracking-normal text-primary">{title}</h2>
        <p className="max-w-2xl text-sm/7 text-muted-foreground">{summary}</p>
      </div>
    </section>
  )
}
