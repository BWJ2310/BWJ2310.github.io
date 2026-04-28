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
  paddingClassName = "px-4 py-10 sm:px-7 md:py-16",
  railClassName,
}: SectionFrameProps) {
  return (
    <section id={id} className="portfolio-container">
      <div className={cn("portfolio-rail", railClassName)}>
        <div className={cn("mx-auto max-w-3xl", paddingClassName, className)}>
          {children}
        </div>
      </div>
    </section>
  )
}
