import Image from "next/image"
import { Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  cover?: string
  meta?: Array<{ label: string; value: string }>
  variant?: string
}

export function PageHeader({ cover, description, eyebrow, meta = [], title, variant }: PageHeaderProps) {
  const immersive = variant === "immersive"
  const compact = variant === "compact"

  return (
    <div
      className={cn(
        "text-card-foreground",
        cover && "grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.58fr)] md:items-start",
        immersive && "md:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.86fr)]",
      )}
    >
      <div className="flex min-w-0 flex-col">
        <div className={cn("flex flex-col gap-5", compact && "gap-4")}>
          {eyebrow ? (
            <Badge className="w-fit" variant="outline">
              <Sparkles className="size-3" aria-hidden="true" />
              {eyebrow}
            </Badge>
          ) : null}
          <h1
            className={cn(
              "max-w-4xl font-heading text-4xl font-normal leading-none tracking-normal text-primary md:text-6xl lg:text-7xl",
              compact && "text-3xl md:text-4xl lg:text-5xl",
            )}
          >
            {title}
          </h1>
          {description ? <p className="max-w-2xl text-sm/7 text-muted-foreground md:text-base/8">{description}</p> : null}
        </div>
        {meta.length > 0 ? (
          <div className="pt-6">
            <Separator className="mb-4" />
            <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border text-xs sm:grid-cols-2">
              {meta.map((item) => (
                <div key={item.label} className="bg-card p-3">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
      {cover ? (
        <div className="border border-border bg-muted/25 p-2">
          <Image
            alt=""
            className="h-52 w-full rounded-md border border-border object-cover md:h-full md:max-h-[520px] md:min-h-[360px]"
            height={900}
            priority={immersive}
            src={cover}
            unoptimized
            width={1200}
          />
        </div>
      ) : null}
    </div>
  )
}
