type ResultStatsProps = {
  items: Array<{ label: string; value: string }>
}

export function ResultStats({ items }: ResultStatsProps) {
  return (
    <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.label} className="bg-card p-4">
          <span className="font-heading text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="mt-2 font-heading text-2xl font-normal leading-tight text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
