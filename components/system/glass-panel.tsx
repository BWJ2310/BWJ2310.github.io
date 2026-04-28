import type { PropsWithChildren } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type GlassPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <Card
      className={cn(
        "border border-border bg-card p-6 text-card-foreground shadow-none md:p-8",
        className,
      )}
    >
      {children}
    </Card>
  )
}
