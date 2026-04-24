import { PageHeader } from "@/components/system/page-header"
import { ProjectCard } from "@/components/system/project-card"
import { SectionFrame } from "@/components/system/section-frame"

const projectArchive = [
  {
    title: "CS Pet Tech",
    slug: "cs-pet-tech",
    description: "A stronger product case study built from the current Wix project content.",
  },
  {
    title: "Sox",
    slug: "sox",
    description: "An evolving journal-style project with deeper process pages.",
  },
  {
    title: "Robotics",
    slug: "robotics",
    description: "A curated archive of robotics work, milestones, and experiments.",
  },
  {
    title: "Art",
    slug: "art",
    description: "Gallery-led visual work kept inside the same portfolio system.",
  },
]

export default function ProjectsPage() {
  return (
    <SectionFrame>
      <PageHeader
        eyebrow="Archive"
        title="Projects"
        description="Case studies, experiments, robotics work, and visual projects."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projectArchive.map((project) => (
          <ProjectCard
            key={project.slug}
            description={project.description}
            href={`/projects/${project.slug}`}
            title={project.title}
          />
        ))}
      </div>
    </SectionFrame>
  )
}
