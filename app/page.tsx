import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Cpu,
  FolderOpen,
  GitBranch,
  GraduationCap,
  MapPin,
  Palette,
  Send,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react"

import {
  GitHubBrandIcon,
  XBrandIcon,
} from "@/components/icons/social-brand-icons"
import { ContentError } from "@/components/system/content-error"
import { ProjectCard } from "@/components/system/project-card"
import { SectionFrame } from "@/components/system/section-frame"
import { SkillsTicker } from "@/components/system/skills-ticker"
import { PortfolioDivider } from "@/components/system/portfolio-divider"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { CONTACT_MAILTO } from "@/lib/contact"
import { getFeaturedProjects } from "@/lib/content/loaders"
import { resolveSiteAsset } from "@/lib/content/site-assets"
import { cn } from "@/lib/utils"

const focusAreas = [
  {
    title: "Product systems",
    description:
      "CS Pet Tech, service workflows, B-end and C-end UI, and business framing.",
    icon: Workflow,
  },
  {
    title: "Robotics",
    description:
      "VEX and FRC competition work, mentoring, mechanical builds, and Sox experiments.",
    icon: Cpu,
  },
  {
    title: "Visual storytelling",
    description:
      "Illustration, CG, animation, logos, and image work that makes ideas tangible.",
    icon: Palette,
  },
]

const profileFacts = [
  {
    label: "Study",
    value: "Mechanical Engineering at CU Boulder",
    icon: GraduationCap,
  },
  {
    label: "Practice",
    value: "Product, robotics, visual systems",
    icon: Sparkles,
  },
]

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/BWJ2310",
    icon: GitHubBrandIcon,
  },
  { label: "X", href: "https://x.com/BWJ2310", icon: XBrandIcon },
  {
    label: "IndieDevs",
    href: "https://www.indiedevs.me/bruzzz",
    icon: CodeXml,
  },
]

const pacmanContributionGraph =
  "https://raw.githubusercontent.com/bwj2310/bwj2310/output/pacman-contribution-graph.svg"
const pacmanContributionGraphDark =
  "https://raw.githubusercontent.com/bwj2310/bwj2310/output/pacman-contribution-graph-dark.svg"
const githubActivityGraph =
  "https://github-readme-activity-graph.vercel.app/graph?username=bwj2310&radius=16&theme=dracula&area=true&order=5&bg_color=00000000&color=888&title_color=888&line=888&point=888&area_color=888&hide_border=true&hide_title=true"

const experience = [
  {
    role: "Product Manager / UI/UX Designer",
    place: "CS Pet Tech",
    detail:
      "Designed workflow, mini-app direction, industrial concepts, and business framing.",
  },
  {
    role: "Investment Researcher",
    place: "Lianjiang Capital",
    detail:
      "Built business context that later shaped the pet-tech product model.",
  },
  {
    role: "Robotics Mentor",
    place: "Shenzhen Foreign Language School",
    detail: "Guided competitive robotics work after VEX and FRC experience.",
  },
]

export default async function HomePage() {
  let featuredProjects: Awaited<ReturnType<typeof getFeaturedProjects>> = []
  let contentError: unknown

  try {
    featuredProjects = await getFeaturedProjects()
  } catch (error) {
    contentError = error
  }

  const homeAsset = (assetPath: string) => resolveSiteAsset("home", assetPath)

  return (
    <>
      <SectionFrame
        className="max-w-none p-0"
        paddingClassName="px-4 py-10 sm:px-7 md:pb-16"
      >
        <div className="flex h-36 items-center overflow-x-auto border-b border-border bg-white p-3 [scrollbar-width:none] md:h-52 md:overflow-x-visible md:p-7 lg:h-64 dark:bg-[#0d1117] [&::-webkit-scrollbar]:hidden">
          <Image
            alt="Pacman contribution graph for Bruzzz's GitHub activity"
            className="h-full w-auto max-w-none object-contain md:h-auto md:w-full dark:hidden"
            height={184}
            priority
            src={pacmanContributionGraph}
            unoptimized
            width={1166}
          />
          <Image
            alt="Pacman contribution graph for Bruzzz's GitHub activity"
            className="hidden h-full w-auto max-w-none object-contain md:h-auto md:w-full dark:block"
            height={184}
            priority
            src={pacmanContributionGraphDark}
            unoptimized
            width={1166}
          />
        </div>
        <div className="relative mx-auto grid max-w-3xl gap-8 px-4 pt-20 pb-7 sm:px-7 sm:pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-7 sm:translate-x-0">
            <div className="relative">
              <Image
                alt="Bruzzz GitHub profile picture"
                className="size-36 rounded-full border-4 border-white object-cover"
                height={288}
                priority
                src="https://github.com/BWJ2310.png"
                unoptimized
                width={288}
              />
              <span className="absolute right-3 bottom-3 size-4 rounded-full border-2 border-white bg-green-500" />
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <h1 className="max-w-xl font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
              Bruzzz builds pet-tech systems, robots, and visual worlds.
            </h1>
            <p className="text-violet-700">
              Creative engineer / product systems / robotics
            </p>
            <div className="flex items-center justify-center gap-2 text-primary sm:justify-start">
              <MapPin className="size-4" />
              <span className="text-sm">Boulder, Colorado</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 sm:items-start lg:items-end">
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon

                return (
                  <Link
                    key={link.href}
                    aria-label={link.label}
                    className="flex size-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-2">
            <p className="portfolio-label inline-flex items-center gap-2">
              <GitBranch className="size-3.5" aria-hidden="true" />
              GitHub Activity
            </p>
            <Image
              alt="GitHub activity graph for Bruzzz"
              className="h-auto w-full rounded-md border border-border bg-transparent object-contain"
              height={300}
              priority
              src={githubActivityGraph}
              unoptimized
              width={1200}
            />
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame id="about-preview" railClassName="home-about-rail">
        <div className="flex flex-col gap-11 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="portfolio-label inline-flex items-center gap-2">
              <UserRound className="size-3.5" aria-hidden="true" />
              About Me
            </p>
            <h2 className="font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
              A regular human being trying to make an interesting story out of
              life.
            </h2>
            <p className="text-base/8 text-muted-foreground">
              Product thinking, business, robotics, and art are not separate
              lanes here. They are one habit: making an idea visible, useful,
              and easier to test.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="portfolio-label inline-flex items-center gap-2">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Practice
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {focusAreas.map((area) => {
                const Icon = area.icon

                return (
                  <Badge
                    key={area.title}
                    className="h-full px-3 py-1.5"
                    variant="outline"
                  >
                    <Icon className="size-3" aria-hidden="true" />
                    {area.title}
                  </Badge>
                )
              })}
              {profileFacts.map((fact) => {
                const Icon = fact.icon

                return (
                  <Badge
                    key={fact.label}
                    className="h-full px-3 py-1.5"
                    variant="outline"
                  >
                    <Icon className="size-3" aria-hidden="true" />
                    {fact.label}: {fact.value}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </SectionFrame>

      <SkillsTicker />

      <PortfolioDivider />

      <SectionFrame id="experience">
        <div className="flex flex-col gap-0">
          <p className="portfolio-label inline-flex items-center gap-2">
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
            Experience
          </p>
          <div className="mt-8 border-y border-border">
            {experience.map((item, index) => (
              <div
                key={item.role}
                className="flex flex-col gap-4 border-b border-dashed border-border py-8 last:border-b-0 sm:py-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-heading text-xl leading-tight font-normal tracking-normal text-primary">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
                    <span
                      className={cn(
                        "h-2 w-4 rounded-sm",
                        index === 0 ? "bg-primary" : "bg-primary/10"
                      )}
                    />
                    <span className="text-sm text-primary">{item.place}</span>
                  </div>
                </div>
                <p className="text-sm/7 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame id="work" className="max-w-none p-0">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10 sm:px-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="portfolio-label inline-flex items-center gap-2">
              <FolderOpen className="size-3.5" aria-hidden="true" />
              Featured Work
            </p>
            <h2 className="mt-3 font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
              Projects with a point of view.
            </h2>
          </div>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/projects"
          >
            View all projects
            <ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
          {contentError ? (
            <div className="p-4 md:col-span-2">
              <ContentError
                error={contentError}
                title="Featured projects could not load"
              />
            </div>
          ) : null}
          {!contentError && featuredProjects.length === 0 ? (
            <div className="p-4 md:col-span-2">
              <ContentError title="No featured projects found" />
            </div>
          ) : null}
          {!contentError
            ? featuredProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className={cn(
                    "p-3.5 sm:p-6",
                    index % 2 === 1 && "md:border-l md:border-border"
                  )}
                >
                  <ProjectCard
                    description={project.frontmatter.description}
                    href={`/projects/${project.slug}`}
                    image={project.frontmatter.cover}
                    index={index + 1}
                    meta={`${project.frontmatter.year} / ${project.frontmatter.role}`}
                    title={project.frontmatter.title}
                  />
                </div>
              ))
            : null}
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame id="contact" className="pb-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div className="flex flex-col gap-4">
            <p className="portfolio-label inline-flex items-center gap-2">
              <Send className="size-3.5" aria-hidden="true" />
              Contact
            </p>
            <h2 className="font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
              Build the next story.
            </h2>
            <p className="text-base/8 text-muted-foreground">
              Open to collaboration across product work, robotics, technical
              storytelling, and selected creative projects.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                className={buttonVariants({ size: "lg" })}
                href={CONTACT_MAILTO}
              >
                <Send />
                Contact
                <ArrowRight />
              </Link>
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/projects"
              >
                <FolderOpen />
                View Projects
              </Link>
            </div>
          </div>
          <Image
            alt="Portfolio contact image"
            className="aspect-square w-full rounded-full border border-border object-cover"
            height={440}
            src={homeAsset("./images/12-contact.jpg")}
            unoptimized
            width={440}
          />
        </div>
      </SectionFrame>
    </>
  )
}
