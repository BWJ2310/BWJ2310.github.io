import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CircuitBoard,
  ClipboardList,
  FolderKanban,
  Hammer,
  Layers3,
  ListChecks,
  Palette,
  UsersRound,
  Workflow,
} from "lucide-react"

import { ContentError } from "@/components/system/content-error"
import { SectionFrame } from "@/components/system/section-frame"
import { PortfolioDivider } from "@/components/system/portfolio-divider"
import { Badge } from "@/components/ui/badge"
import { getProjectArchive } from "@/lib/content/loaders"

const projectContext: Record<
  string,
  {
    track: string
    icon: LucideIcon
  }
> = {
  art: {
    track: "Personal hobby",
    icon: Palette,
  },
  "cs-pet-tech": {
    track: "Product system",
    icon: Workflow,
  },
  robotics: {
    track: "Robotics timeline",
    icon: CircuitBoard,
  },
  sox: {
    track: "Personal machine",
    icon: Bot,
  },
}

const summaryStats = [
  {
    label: "Focus",
    value: "Product systems, robotics, visual work",
    icon: Layers3,
  },
  {
    label: "Records",
    value: "Case studies and project signals",
    icon: ClipboardList,
  },
  { label: "Timeline", value: "2013-present", icon: CalendarDays },
]

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjectArchive>> = []
  let contentError: unknown

  try {
    projects = await getProjectArchive()
  } catch (error) {
    contentError = error
  }

  return (
    <>
      <SectionFrame>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="w-fit" variant="outline">
              <FolderKanban className="size-3" aria-hidden="true" />
              Projects
            </Badge>
            <Badge className="w-fit" variant="default">
              <ListChecks className="size-3" aria-hidden="true" />
              {projects.length || 0} entries
            </Badge>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.42fr)] lg:items-end">
            <div>
              <h1 className="font-heading text-4xl leading-tight font-normal tracking-normal text-primary md:text-5xl">
                Project Index
              </h1>
              <p className="mt-3 max-w-3xl text-sm/7 text-muted-foreground md:text-base/8">
                A compact index for CS Pet Tech, Robotics, Sox, and Art, grouped
                by project signal and readable case-study context.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border text-xs">
              {summaryStats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.label}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 bg-card p-3"
                  >
                    <Icon
                      className="mt-0.5 size-3.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-muted-foreground">{stat.label}</div>
                      <div className="mt-1 text-foreground">{stat.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame className="max-w-none p-0">
        {contentError ? (
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-7">
            <ContentError
              error={contentError}
              title="Project index could not load"
            />
          </div>
        ) : null}
        {!contentError && projects.length === 0 ? (
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-7">
            <ContentError title="No projects found" />
          </div>
        ) : null}
        {!contentError && projects.length > 0 ? (
          <div className="divide-y divide-border">
            {projects.map((project, index) => {
              const context = projectContext[project.slug]
              const TrackIcon = context?.icon ?? FolderKanban

              return (
                <Link
                  key={project.slug}
                  className="group block cursor-pointer"
                  href={`/projects/${project.slug}`}
                >
                  <article className="grid gap-0 transition-colors duration-200 group-hover:bg-muted/35 sm:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)_15rem]">
                    <div className="border-b border-border bg-muted/30 p-3 sm:border-r sm:border-b-0">
                      {project.frontmatter.cover ? (
                        <div className="relative aspect-square w-full overflow-hidden rounded-md border border-border bg-background">
                          <Image
                            alt={`${project.frontmatter.title} project cover`}
                            className="object-cover transition duration-300 group-hover:scale-[1.015]"
                            fill
                            sizes="(min-width: 1024px) 240px, (min-width: 640px) 192px, 100vw"
                            src={project.frontmatter.cover}
                            unoptimized
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5 lg:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="w-fit" variant="outline">
                          <TrackIcon className="size-3" aria-hidden="true" />
                          {context?.track ?? "Project"}
                        </Badge>
                        <span className="font-heading text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="size-3" aria-hidden="true" />
                          {project.frontmatter.year}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl leading-tight font-normal tracking-normal text-primary">
                          {project.frontmatter.title}
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm/7 text-muted-foreground">
                          {project.frontmatter.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.frontmatter.tools.slice(0, 4).map((tool) => (
                          <Badge key={tool} className="w-fit" variant="outline">
                            <Hammer className="size-3" aria-hidden="true" />
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border-t border-border p-4 sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:col-span-1 lg:flex lg:border-t-0 lg:border-l lg:p-5">
                      <div className="grid gap-3 text-xs">
                        {[
                          {
                            label: "Role",
                            value: project.frontmatter.role,
                            icon: BriefcaseBusiness,
                          },
                          {
                            label: "Team",
                            value: project.frontmatter.team,
                            icon: UsersRound,
                          },
                          {
                            label: "Status",
                            value: project.frontmatter.status,
                            icon: BadgeCheck,
                          },
                        ].map((item) => {
                          const Icon = item.icon

                          return (
                            <div
                              key={item.label}
                              className="grid grid-cols-[1rem_52px_minmax(0,1fr)] gap-3"
                            >
                              <Icon
                                className="mt-0.5 size-3.5 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <span className="text-muted-foreground">
                                {item.label}
                              </span>
                              <span className="text-foreground">
                                {item.value}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                      <div>
                        <span className="inline-flex h-6 w-full shrink-0 items-center justify-between gap-1 rounded-full border border-border bg-background px-2 text-xs/relaxed font-medium text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground sm:w-40 lg:w-full dark:bg-input/30 dark:group-hover:bg-primary dark:group-focus-visible:bg-primary dark:hover:bg-primary">
                          Open Project
                          <ArrowRight />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        ) : null}
      </SectionFrame>
    </>
  )
}
