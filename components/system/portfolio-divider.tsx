import { cn } from "@/lib/utils"

type PortfolioDividerProps = {
  className?: string
}

export function PortfolioDivider({ className }: PortfolioDividerProps) {
  return (
    <div className="portfolio-container" aria-hidden="true">
      <div className={cn("h-4 border border-border bg-background", className)} />
    </div>
  )
}
