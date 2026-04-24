import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type GlassPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "border border-[color:var(--border)] bg-[color:rgba(18,18,18,0.92)] p-8 text-[color:var(--card-foreground)] shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  )
}
