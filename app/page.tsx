import Link from "next/link"

import { GlassPanel } from "@/components/system/glass-panel"
import { SectionFrame } from "@/components/system/section-frame"

const featuredProjects = [
  {
    title: "CS Pet Tech",
    description: "A product-facing case study that turns the current Wix project summary into a stronger narrative.",
  },
  {
    title: "Sox",
    description: "An R&D-driven project framed as an evolving build journal and case study.",
  },
  {
    title: "Robotics",
    description: "A milestone archive of robotics work, experiments, and selected highlights.",
  },
  {
    title: "Art",
    description: "Gallery-led visual work that still sits inside the same portfolio system.",
  },
]

const practiceAreas = ["Product Design", "Engineering Systems", "Robotics", "Visual Art"]

export default function HomePage() {
  return (
    <>
      <SectionFrame className="pt-8">
        <GlassPanel className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--accent)]">
              Creative Engineer
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl leading-none font-medium uppercase tracking-[-0.05em] md:text-7xl">
              Creative engineer with a product-minded approach.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              I build systems, interfaces, and stories across software, robotics, and visual practice with a clean,
              structured visual language.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="border border-transparent bg-[color:var(--secondary)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--surface)] transition-transform hover:-translate-y-0.5"
                href="/projects"
              >
                View Projects
              </Link>
              <Link
                className="border border-[color:rgba(245,244,242,0.22)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/74 transition-colors hover:text-white"
                href="/about"
              >
                Read Story
              </Link>
            </div>
          </div>
          <div className="grid gap-3 self-end">
            {[
              "Product systems with clear structure.",
              "Robotics and experimentation grounded in execution.",
              "Visual work that supports story, not noise.",
            ].map((item) => (
              <div key={item} className="border border-white/12 px-4 py-4 text-sm leading-6 text-white/70">
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>
      </SectionFrame>

      <SectionFrame id="selected-work">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
              Featured
            </p>
            <h2 className="mt-3 text-3xl uppercase tracking-[-0.04em]">Selected Work</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--muted-foreground)]">
            Four entry points anchor the portfolio: a stronger product case study, an evolving build journal, a robotics
            archive, and a gallery-led art section.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <GlassPanel key={project.title} className="min-h-52">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">Project</p>
              <h3 className="mt-4 text-2xl uppercase tracking-[-0.04em]">{project.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">{project.description}</p>
            </GlassPanel>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="practice-areas">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
          Capabilities
        </p>
        <h2 className="mt-3 text-3xl uppercase tracking-[-0.04em]">Practice Areas</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {practiceAreas.map((area) => (
            <div key={area} className="border border-[color:var(--border)] bg-white/55 px-5 py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em]">{area}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="about-preview">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
          Narrative
        </p>
        <h2 className="mt-3 text-3xl uppercase tracking-[-0.04em]">About</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.8fr)]">
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--foreground)]/78">
            The portfolio should read as one coherent story across engineering, product thinking, robotics, and art.
            The goal is not to split those practices apart, but to present them through a cleaner structure and stronger
            project framing.
          </p>
          <div className="border border-[color:var(--border)] bg-white/55 px-6 py-6 text-sm leading-7 text-[color:var(--muted-foreground)]">
            AURA sets the shell: bounded grid, dark glass surfaces, cyan accents, and restrained motion. The content
            system then gives projects more range than a standard blog template.
          </div>
        </div>
      </SectionFrame>

      <SectionFrame id="contact" className="pb-20">
        <GlassPanel className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">Contact</p>
            <h2 className="mt-3 text-3xl uppercase tracking-[-0.04em]">Contact</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
              Open to collaboration, product work, technical storytelling, and selected creative commissions.
            </p>
          </div>
          <Link
            className="border border-[color:rgba(245,244,242,0.22)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 transition-colors hover:text-white"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </Link>
        </GlassPanel>
      </SectionFrame>
    </>
  )
}
