import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PortfolioDivider } from "@/components/system/portfolio-divider"
import { SectionFrame } from "@/components/system/section-frame"
import { resolveSiteAsset } from "@/lib/content/site-assets"

type ExperienceEntry = {
  company: string
  dates: string
  location?: string
  role: string
  bullets: string[]
}

const experience: ExperienceEntry[] = [
  {
    company: "TradingGoose",
    dates: "November 2025 - present",
    location: "Localhost",
    role: "Developer",
    bullets: [
      "Full-stack developer for TradingGoose-Studio and TradingGoose-Market.",
      "Designed and developed open-source agentic workflows for technical-analysis trading.",
      "Built a cross-platform financial asset identity normalization system designed to work across platforms.",
    ],
  },
  {
    company: "AirTurn",
    dates: "July 2023 - present",
    location: "Boulder, CO, US",
    role: "Product Designer",
    bullets: [
      "Designed musician control devices and tripod stand products.",
      "Used Blender to render product concepts.",
      "Used Fusion 360 to produce manufacturing-ready 3D file packages and engineering drawings.",
    ],
  },
  {
    company: "CS Pet Tech",
    dates: "January 2021 - August 2021",
    location: "Shenzhen, CN",
    role: "System and UI/UX design, Product Manager",
    bullets: [
      "Built a scheduling workflow that lets pet groomers choose working spaces and times while customers book appointments without time or space conflicts.",
      "Designed UI/UX for the customer-side and business-side software applications.",
      "Designed a machine with fully functional pet-grooming tools for special locations, including hospitals and theaters.",
      "The final product met all design objectives and was built within a $12,000 budget for business customers.",
    ],
  },
  {
    company: "Lianjiang Capital",
    dates: "August 2020 - January 2021",
    location: "Shenzhen, CN",
    role: "Investment Researcher",
    bullets: [
      "Researched business models, compared Chinese and U.S. market peers, and used financial reports and technology feasibility to estimate market prices.",
    ],
  },
  {
    company: "Shenzhen Foreign Language School",
    dates: "January 2018 - March 2020",
    location: "Shenzhen, CN",
    role: "Robotic Team Mentor",
    bullets: [
      "Mentored high school students in the FIRST Robotics Competition, including support with CAD, team organization, and leadership.",
      "The team advanced to the World Championship in March 2019.",
    ],
  },
]

const accomplishmentSections = [
  {
    href: "/projects/cs-pet-tech",
    items: [
      "Outstanding Project Award from Tsinghua University's entrepreneurship competition",
      "Business Development and Product Manager at CS Pet Tech",
      "...",
    ],
    title: "Entrepreneurship",
  },
  {
    href: "/projects/robotics",
    items: [
      "Bronze Award from the VEX Asia Robotics Competition in Macau",
      "Championship at the VEX Robotics World Championship in Los Angeles",
      "...",
    ],
    title: "Competitions",
  },
]

export default function AboutPage() {
  const aboutAsset = (assetPath: string) => resolveSiteAsset("about", assetPath)

  return (
    <>
      <SectionFrame className="py-10 md:py-16 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="flex min-w-0 flex-col justify-center gap-5 lg:py-8">
            <Badge className="w-fit" variant="outline">
              <BookOpen className="size-3" aria-hidden="true" />
              About Me
            </Badge>
            <h1 className="about-hero-heading max-w-2xl font-heading font-normal tracking-normal text-primary">
              Breath in ...
              <br />
              Breath out ...
              <br />
              One enjoying the moment
            </h1>
            <div className="max-w-xl space-y-4 text-base/8 text-muted-foreground">
              <p>
                The world is full of adventures, and I can&apos;t wait to
                explore. I have been building my life story with the resources
                and skills I have, and I&apos;m confident about what I can
                accomplish next.
              </p>
              <p>
                Looking forward to experiencing all the excitement with you
                someday.
              </p>
            </div>
          </div>

          <div className="about-hero-media relative overflow-hidden bg-background">
            <Image
              alt="Jun giving a speech"
              className="object-contain object-center"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              src={aboutAsset("./images/01-speech.jpg")}
              unoptimized
            />
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame className="py-10 md:py-16 max-w-none p-0">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-7 md:py-12">
          <p className="portfolio-label inline-flex items-center gap-2">
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
            Experience
          </p>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl divide-y divide-dashed divide-border px-4 sm:px-7">
            {experience.map((entry) => (
              <article
                key={`${entry.role}-${entry.company}`}
                className="grid gap-5 py-9 md:grid-cols-[0.78fr_1fr]"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-heading text-2xl leading-tight font-normal tracking-normal text-primary">
                    {entry.role}
                  </h2>
                  <p className="text-sm/7 text-primary">
                    - {entry.company}
                    {entry.location ? `, ${entry.location}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.dates}</p>
                </div>
                <ul className="space-y-3 text-sm/7 text-foreground/80">
                  {entry.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-3 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame className="py-10 md:py-16 max-w-none p-0">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-7 md:py-12">
          <p className="portfolio-label inline-flex items-center gap-2">
            <Award className="size-3.5" aria-hidden="true" />
            Accomplishment
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
            Accomplishment
          </h2>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto grid max-w-3xl gap-px bg-border px-4 py-px sm:px-7 md:grid-cols-2">
            {accomplishmentSections.map((section) => (
              <article
                key={section.title}
                className="flex min-h-72 flex-col bg-background p-5"
              >
                <h3 className="font-heading text-xl leading-tight font-normal tracking-normal text-primary">
                  {section.title}
                </h3>
                <ul className="mt-5 flex flex-1 flex-col gap-3 text-sm/7 text-foreground/80">
                  {section.items.map((item) => (
                    <li key={item}>{item === "..." ? item : `- ${item}`}</li>
                  ))}
                </ul>
                {section.href ? (
                  <Link
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
                    href={section.href}
                  >
                    Learn more
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </SectionFrame>

      <PortfolioDivider />

      <SectionFrame className="py-10 md:py-16 pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="flex flex-col gap-4">
            <p className="portfolio-label inline-flex items-center gap-2">
              <GraduationCap className="size-3.5" aria-hidden="true" />
              Education
            </p>
            <h2 className="font-heading text-3xl leading-tight font-normal tracking-normal text-primary md:text-[32px]">
              Mechanical Engineering
            </h2>
            <div className="space-y-4 text-sm/7 text-foreground/80 md:text-base/8">
              <p>
                Undergraduate student at the University of Colorado, Boulder.
              </p>
              <p>Trying my best to balance school, work, and life.</p>
            </div>
          </div>
          <Image
            alt="Education image"
            className="aspect-[4/3] w-full border border-border object-cover"
            height={900}
            src={aboutAsset("./images/04-education.jpg")}
            unoptimized
            width={1200}
          />
        </div>
      </SectionFrame>
    </>
  )
}
