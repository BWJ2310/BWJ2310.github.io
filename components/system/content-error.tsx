import { GlassPanel } from "./glass-panel"

type ContentErrorProps = {
  title?: string
  error?: unknown
}

export function ContentError({ error, title = "Content unavailable" }: ContentErrorProps) {
  const message = error instanceof Error ? error.message : "Remote content could not be loaded."

  return (
    <GlassPanel className="mt-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">Content Error</p>
      <h2 className="mt-4 text-2xl uppercase tracking-[-0.04em]">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{message}</p>
    </GlassPanel>
  )
}
