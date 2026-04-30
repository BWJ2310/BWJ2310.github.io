import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type SectionFrameProps = PropsWithChildren<{
  className?: string
  id?: string
  paddingClassName?: string
  railClassName?: string
}>

export function SectionFrame({
  children,
  className,
  id,
  railClassName,
}: SectionFrameProps) {
  return (
    <section id={id} className="portfolio-container ">
      <div className={cn("portfolio-rail", railClassName)}>
        <div className={cn("mx-auto max-w-3xl", className)}>
          {children}
        </div>
      </div>
    </section>
  )
}
