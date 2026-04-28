import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FolderKanban } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  href: string
  title: string
  description: string
  meta?: string
  image?: string
  index?: number
}

export function ProjectCard({ description, href, image, index, meta, title }: ProjectCardProps) {
  return (
    <Link className="group block h-full cursor-pointer" href={href}>
      <article className="flex h-full flex-col gap-0 border border-border bg-card transition-all duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {image ? (
          <div className="overflow-hidden border-b border-border bg-muted/35 p-2">
            <Image
              alt=""
              className="aspect-[16/10] w-full rounded-md border border-border object-cover grayscale-[10%] transition duration-300 group-hover:scale-[1.015] group-hover:grayscale-0"
              height={720}
              src={image}
              unoptimized
              width={960}
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <Badge className="w-fit" variant="outline">
              <FolderKanban className="size-3" aria-hidden="true" />
              Project
            </Badge>
            {typeof index === "number" ? (
              <span className="font-heading text-xs text-muted-foreground">{String(index).padStart(2, "0")}</span>
            ) : null}
          </div>
          <h3 className="font-heading text-xl font-normal leading-tight tracking-normal text-primary">{title}</h3>
          <p className="text-sm/7 text-muted-foreground">{description}</p>
          {meta ? <p className="mt-auto border-t border-border pt-3 text-xs text-muted-foreground">{meta}</p> : null}
          <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-1 w-fit")}>
            Open project
            <ArrowRight />
          </span>
        </div>
      </article>
    </Link>
  )
}
