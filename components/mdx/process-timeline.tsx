import { Badge } from "@/components/ui/badge"
import { ListChecks } from "lucide-react"

type ProcessTimelineStep = { title: string; summary: string }

type ProcessTimelineProps = {
  steps?: ProcessTimelineStep[] | string
}

function parseProcessTimelineSteps(steps: ProcessTimelineProps["steps"]) {
  if (Array.isArray(steps)) {
    return steps
  }

  if (typeof steps !== "string") {
    return []
  }

  try {
    const parsed = JSON.parse(steps) as unknown
    return Array.isArray(parsed) ? (parsed as ProcessTimelineStep[]) : []
  } catch {
    return []
  }
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const timelineSteps = parseProcessTimelineSteps(steps)

  return (
    <ol className="grid gap-0 border-y border-border">
      {timelineSteps.map((step, index) => (
        <li key={step.title} className="border-b border-dashed border-border py-6 last:border-b-0">
          <div className="grid gap-3 sm:grid-cols-[5rem_minmax(0,1fr)]">
              <Badge className="w-fit" variant="outline">
                <ListChecks className="size-3" aria-hidden="true" />
                {String(index + 1).padStart(2, "0")}
              </Badge>
            <div>
              <h3 className="font-heading text-lg font-normal leading-tight tracking-normal text-primary">{step.title}</h3>
              <p className="mt-2 text-sm/7 text-muted-foreground">{step.summary}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
