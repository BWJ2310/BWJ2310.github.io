type ProjectHeroProps = {
  title: string
  summary: string
}

export function ProjectHero({ title, summary }: ProjectHeroProps) {
  return (
    <div className="border border-[color:var(--border)] bg-[color:var(--card)] p-8 text-[color:var(--card-foreground)]">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">Project</p>
      <h1 className="mt-4 text-4xl leading-none uppercase tracking-[-0.04em]">{title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{summary}</p>
    </div>
  )
}
