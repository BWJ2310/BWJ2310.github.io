type ResultStatsProps = {
  items: Array<{ label: string; value: string }>
}

export function ResultStats({ items }: ResultStatsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="border border-[color:var(--border)] bg-white/60 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">{item.label}</p>
          <p className="mt-3 text-3xl uppercase tracking-[-0.03em]">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
