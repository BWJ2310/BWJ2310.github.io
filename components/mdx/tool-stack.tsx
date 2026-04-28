import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

type ToolStackProps = {
  tools: string[]
}

export function ToolStack({ tools }: ToolStackProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <li key={tool}>
          <Badge variant="outline">
            <Wrench className="size-3" aria-hidden="true" />
            {tool}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
