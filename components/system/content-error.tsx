import { GlassPanel } from "./glass-panel"
import { Badge } from "@/components/ui/badge"
import { TriangleAlert } from "lucide-react"

type ContentErrorProps = {
  title?: string
  error?: unknown
}

export function ContentError({ error, title = "Content unavailable" }: ContentErrorProps) {
  const message = error instanceof Error ? error.message : "Content could not be loaded."

  return (
    <GlassPanel className="mt-8">
      <Badge variant="outline">
        <TriangleAlert className="size-3" aria-hidden="true" />
        Content Error
      </Badge>
      <h2 className="mt-4 font-heading text-2xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm/7 text-muted-foreground">{message}</p>
    </GlassPanel>
  )
}
