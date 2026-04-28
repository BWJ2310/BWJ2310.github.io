import type { ReactNode } from "react"

import { WideImage } from "./wide-image"
import { cn } from "@/lib/utils"

export type MediaGridItem = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  fit?: "auto" | "cover" | "contain"
  aspect?: "auto" | "wide" | "screen" | "square" | "portrait" | "logo"
  tone?: "default" | "feature" | "tall" | "compact" | "full"
}

type MediaGridProps = {
  children?: ReactNode
  className?: string
  items?: MediaGridItem[]
  variant?: "default" | "bento"
}

const mediaGridVariants: Record<NonNullable<MediaGridProps["variant"]>, string> = {
  default: "grid items-start gap-5 md:grid-cols-12 md:gap-6",
  bento:
    "grid items-start gap-4 md:grid-cols-12 md:gap-5 [&>[data-project-media]:nth-child(1)]:md:col-span-7 [&>[data-project-media]:nth-child(2)]:md:col-span-5 [&>[data-project-media]:nth-child(3)]:md:col-span-5 [&>[data-project-media]:nth-child(4)]:md:col-span-7 [&>[data-project-media]:nth-child(5)]:md:col-span-6 [&>[data-project-media]:nth-child(6)]:md:col-span-6 [&>[data-project-media]:nth-child(7)]:md:col-span-8 [&>[data-project-media]:nth-child(8)]:md:col-span-4",
}

export function MediaGrid({ children, className, items, variant = "default" }: MediaGridProps) {
  return (
    <div className={cn(mediaGridVariants[variant], className)} data-project-media-grid>
      {items?.length
        ? items.map((item) => <WideImage key={item.src} {...item} />)
        : children}
    </div>
  )
}
