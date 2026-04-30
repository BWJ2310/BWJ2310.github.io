import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

type ToolStackProps = {
  tools?: string[] | string
}

function parseToolStackTools(tools: ToolStackProps["tools"]) {
  if (Array.isArray(tools)) {
    return tools
  }

  if (typeof tools !== "string") {
    return []
  }

  try {
    const parsed = JSON.parse(tools) as unknown
    return Array.isArray(parsed)
      ? parsed.filter((tool) => typeof tool === "string")
      : []
  } catch {
    return []
  }
}

export function ToolStack({ tools }: ToolStackProps) {
  const toolStack = parseToolStackTools(tools)

  return (
    <ul className="flex flex-wrap gap-2">
      {toolStack.map((tool) => (
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
