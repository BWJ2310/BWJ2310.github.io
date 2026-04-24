type ProcessTimelineProps = {
  steps: Array<{ title: string; summary: string }>
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="grid gap-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border border-[color:var(--border)] bg-white/55 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">Step {index + 1}</p>
          <h3 className="mt-3 text-xl uppercase tracking-[-0.03em]">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/72">{step.summary}</p>
        </li>
      ))}
    </ol>
  )
}
