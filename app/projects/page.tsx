import { ContentError } from "@/components/system/content-error"
import { PageHeader } from "@/components/system/page-header"
import { ProjectCard } from "@/components/system/project-card"
import { SectionFrame } from "@/components/system/section-frame"
import { getProjectArchive } from "@/lib/content/loaders"

export const revalidate = 600

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjectArchive>> = []
  let contentError: unknown

  try {
    projects = await getProjectArchive()
  } catch (error) {
    contentError = error
  }

  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Archive"
        title="Projects"
        description="Case studies, experiments, robotics work, and visual projects."
      />
      {contentError ? <ContentError error={contentError} title="Project archive could not load" /> : null}
      {!contentError && projects.length === 0 ? <ContentError title="No projects found" /> : null}
      {!contentError && projects.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              description={project.frontmatter.description}
              href={`/projects/${project.slug}`}
              meta={`${project.frontmatter.year} / ${project.frontmatter.status}`}
              title={project.frontmatter.title}
            />
          ))}
        </div>
      ) : null}
    </SectionFrame>
  )
}
