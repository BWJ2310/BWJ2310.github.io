import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type SectionFrameProps = PropsWithChildren<{
  className?: string
  id?: string
}>

export function SectionFrame({ children, className, id }: SectionFrameProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-16", className)}>
      {children}
    </section>
  )
}
