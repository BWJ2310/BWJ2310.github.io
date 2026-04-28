import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type ContentBodyProps = PropsWithChildren<{
  bodyWidth?: string
  fontMode?: string
  className?: string
}>

const widthClasses: Record<string, string> = {
  narrow: "max-w-3xl",
  default: "max-w-4xl",
  wide: "max-w-5xl",
  full: "max-w-none",
}

const fontClasses: Record<string, string> = {
  editorial: "text-lg leading-8",
  technical: "font-mono text-sm leading-7",
  default: "text-base leading-8",
}

export function ContentBody({
  bodyWidth = "default",
  children,
  className,
  fontMode = "default",
}: ContentBodyProps) {
  return (
    <article
      className={cn(
        "mt-12 space-y-6 text-foreground/80",
        "[&>blockquote]:rounded-lg [&>blockquote]:border [&>blockquote]:border-border [&>blockquote]:bg-muted/50 [&>blockquote]:p-5 [&>blockquote]:text-foreground",
        "[&>h2]:max-w-4xl [&>h2]:pt-6 [&>h2]:font-heading [&>h2]:text-3xl [&>h2]:leading-tight [&>h2]:font-normal [&>h2]:tracking-normal",
        "[&>h3]:max-w-4xl [&>h3]:pt-4 [&>h3]:font-heading [&>h3]:text-xl [&>h3]:font-medium [&>h3]:tracking-normal",
        "[&>ol]:max-w-3xl [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6",
        "[&>p]:max-w-3xl",
        "[&>p>a]:text-foreground [&>p>a]:underline [&>p>a]:decoration-primary",
        "[&>ul]:max-w-3xl [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6",
        widthClasses[bodyWidth] ?? widthClasses.default,
        fontClasses[fontMode] ?? fontClasses.default,
        className,
      )}
      data-project-detail-body
    >
      {children}
    </article>
  )
}
