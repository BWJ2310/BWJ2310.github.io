import { Children, isValidElement } from "react"
import type { ReactNode } from "react"
import { Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { MediaGrid } from "./media-grid"
import type { MediaGridItem } from "./media-grid"

type ProjectSectionSlot = "copy" | "media"

type ProjectSectionSlotProps = {
  children: ReactNode
}

type ProjectSectionSlotComponent = ((props: ProjectSectionSlotProps) => ReactNode) & {
  projectSectionSlot: ProjectSectionSlot
}

type ProjectSectionProps = {
  eyebrow?: string
  title: string
  summary?: string
  points?: string[]
  media?: MediaGridItem[]
  reverse?: boolean
  children?: ReactNode
}

function getSlot(children: ReactNode, slot: ProjectSectionSlot) {
  return Children.toArray(children).find(
    (child) =>
      isValidElement<ProjectSectionSlotProps>(child) &&
      (child.type as Partial<ProjectSectionSlotComponent>).projectSectionSlot === slot,
  )
}

export const ProjectSectionCopy: ProjectSectionSlotComponent = ({ children }) => children
ProjectSectionCopy.projectSectionSlot = "copy"

export const ProjectSectionMedia: ProjectSectionSlotComponent = ({ children }) => children
ProjectSectionMedia.projectSectionSlot = "media"

export function ProjectSection({
  children,
  eyebrow,
  media = [],
  points = [],
  reverse,
  summary,
  title,
}: ProjectSectionProps) {
  const copySlot = getSlot(children, "copy")
  const mediaSlot = getSlot(children, "media")
  const copyChildren = isValidElement<ProjectSectionSlotProps>(copySlot) ? copySlot.props.children : null
  const mediaChildren = isValidElement<ProjectSectionSlotProps>(mediaSlot) ? mediaSlot.props.children : null

  return (
    <section
      className="my-14 grid gap-7 border-t border-border pt-10 first:mt-0 first:border-t-0 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,1fr)] lg:gap-10 lg:pt-14"
      data-project-section
    >
      <aside
        className={cn(
          "border-l border-border pl-5 lg:sticky lg:top-28 lg:self-start",
          reverse && "lg:border-l-primary",
        )}
      >
        <div className="flex flex-col gap-4">
          {eyebrow ? (
            <Badge className="w-fit" variant="outline">
              <Sparkles className="size-3" aria-hidden="true" />
              {eyebrow}
            </Badge>
          ) : null}
          <h2 className="font-heading text-xl font-normal leading-tight tracking-normal text-primary md:text-2xl">
            {title}
          </h2>
          {summary ? <p className="text-sm/7 text-muted-foreground md:text-[0.9375rem]/7">{summary}</p> : null}
        </div>
        {copyChildren || points.length ? (
          <div className="mt-5 border-t border-border pt-4 text-sm/7 text-muted-foreground [&_li]:pl-1 [&_li+li]:mt-3 [&_ul]:list-none [&_ul]:pl-0 [&_ul>li]:grid [&_ul>li]:grid-cols-[1rem_minmax(0,1fr)] [&_ul>li]:gap-2 [&_ul>li]:before:mt-2 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-primary/45 [&_ul>li]:before:content-['']">
            {copyChildren ?? (
              <ul>
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </aside>
      {mediaChildren || media.length ? (
        <div className="min-w-0" data-project-section-media>
          {mediaChildren ?? <MediaGrid items={media} />}
        </div>
      ) : null}
    </section>
  )
}
