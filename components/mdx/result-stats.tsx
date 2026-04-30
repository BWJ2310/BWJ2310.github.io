type ResultStatsProps = {
  items?: Array<{ label: string; value: string }> | string
}

function parseResultStatsItems(items: ResultStatsProps["items"]) {
  if (Array.isArray(items)) {
    return items
  }

  if (typeof items !== "string") {
    return []
  }

  try {
    const parsed = JSON.parse(items) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item): item is { label: string; value: string } =>
        Boolean(item) &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item &&
        typeof item.label === "string" &&
        typeof item.value === "string"
    )
  } catch {
    return []
  }
}

export function ResultStats({ items }: ResultStatsProps) {
  const statItems = parseResultStatsItems(items)

  return (
    <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
      {statItems.map((item, index) => (
        <div key={item.label} className="bg-card p-4">
          <span className="font-heading text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="mt-2 font-heading text-2xl font-normal leading-tight text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
