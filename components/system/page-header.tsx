type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border border-[color:var(--border)] bg-[color:var(--card)] p-8 text-[color:var(--card-foreground)]">
      {eyebrow ? <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">{eyebrow}</p> : null}
      <h1 className="mt-4 text-4xl leading-none uppercase tracking-[-0.04em]">{title}</h1>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{description}</p> : null}
    </div>
  )
}
