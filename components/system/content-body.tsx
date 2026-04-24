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
        "mt-8 space-y-6 text-[color:var(--foreground)]/78",
        "[&>blockquote]:border-l-2 [&>blockquote]:border-[color:var(--accent)] [&>blockquote]:pl-5 [&>blockquote]:text-[color:var(--foreground)]",
        "[&>h2]:pt-6 [&>h2]:text-3xl [&>h2]:leading-none [&>h2]:font-medium [&>h2]:tracking-[-0.04em] [&>h2]:uppercase",
        "[&>h3]:pt-4 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:tracking-[-0.03em]",
        "[&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6",
        "[&>p>a]:text-[color:var(--foreground)] [&>p>a]:underline [&>p>a]:decoration-[color:var(--accent)]",
        "[&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6",
        widthClasses[bodyWidth] ?? widthClasses.default,
        fontClasses[fontMode] ?? fontClasses.default,
        className,
      )}
    >
      {children}
    </article>
  )
}
