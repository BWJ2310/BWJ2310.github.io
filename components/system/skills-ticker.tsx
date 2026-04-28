import type { CSSProperties } from "react"
import Image from "next/image"

import { SectionFrame } from "@/components/system/section-frame"
import { cn } from "@/lib/utils"

type SkillTickerItem = {
  label: string
  icon: string
  treatment?: "brand" | "currentColor"
}

export const skillTickerItems: SkillTickerItem[] = [
  { label: "Fusion", icon: "/site-assets/skills/fusion.svg" },
  { label: "Blender", icon: "/site-assets/skills/blender.svg" },
  { label: "SolidWorks", icon: "/site-assets/skills/solidworks.svg" },
  {
    label: "Next.js",
    icon: "/site-assets/skills/nextjs.svg",
    treatment: "currentColor",
  },
  { label: "Tailwind CSS", icon: "/site-assets/skills/tailwindcss.svg" },
  {
    label: "Shadcn UI",
    icon: "/site-assets/skills/shadcn-ui.svg",
    treatment: "currentColor",
  },
  { label: "PostgreSQL", icon: "/site-assets/skills/postgresql.svg" },
  { label: "Drizzle", icon: "/site-assets/skills/drizzle.svg" },
  { label: "React", icon: "/site-assets/skills/react.svg" },
  { label: "JavaScript", icon: "/site-assets/skills/javascript.svg" },
  { label: "TypeScript", icon: "/site-assets/skills/typescript.svg" },
  { label: "HTML5", icon: "/site-assets/skills/html5.svg" },
  { label: "CSS3", icon: "/site-assets/skills/css3.svg" },
]

type SkillIconStyle = CSSProperties & {
  "--skill-icon": string
}

function SkillIcon({
  icon,
  treatment = "brand",
}: Pick<SkillTickerItem, "icon" | "treatment">) {
  if (treatment === "currentColor") {
    return (
      <span
        aria-hidden="true"
        className="skill-logo skill-logo-current size-10 sm:size-12"
        data-skill-icon-mode="currentColor"
        style={{ "--skill-icon": `url("${icon}")` } as SkillIconStyle}
      />
    )
  }

  return (
    <Image
      alt=""
      aria-hidden="true"
      className="skill-logo size-10 object-contain grayscale transition duration-200 sm:size-12"
      height={48}
      src={icon}
      unoptimized
      width={48}
    />
  )
}

function SkillTile({
  icon,
  index,
  label,
  treatment,
}: SkillTickerItem & { index: number }) {
  return (
    <div className="group relative flex size-36 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-200 hover:border-primary sm:size-44 md:size-48">
      <span className="absolute top-4 left-4 font-heading text-sm text-primary/45 transition-colors duration-200 group-hover:text-primary">
        ({String(index + 1).padStart(2, "0")})
      </span>
      <span className="absolute right-4 bottom-4 max-w-28 text-right text-[12px] font-medium tracking-normal text-muted-foreground uppercase transition-colors duration-200 group-hover:text-primary">
        {label}
      </span>
      <div className="rounded-full border border-border bg-muted p-4 text-primary transition-colors duration-200 group-hover:bg-background">
        <SkillIcon icon={icon} treatment={treatment} />
      </div>
    </div>
  )
}

function SkillTickerSequence({ copy = false }: { copy?: boolean }) {
  return (
    <div
      aria-hidden={copy}
      className={cn(
        "skills-ticker-sequence flex shrink-0 items-center gap-2 pr-2",
        copy && "skills-ticker-copy"
      )}
    >
      {skillTickerItems.map((skill, index) => (
        <SkillTile key={`${skill.label}-${index}`} {...skill} index={index} />
      ))}
    </div>
  )
}

export function SkillsTicker() {
  return (
    <SectionFrame
      id="skills"
      className="max-w-none p-0"
      railClassName="bg-muted/35"
    >
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-7 md:pt-12">
        <p className="portfolio-label inline-flex items-center gap-2">Skills</p>
      </div>
      <div
        className="skills-ticker relative overflow-hidden py-7 sm:py-9"
        style={{ "--skills-ticker-duration": "52s" } as CSSProperties}
      >
        <div className="skills-ticker-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="skills-ticker-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div className="skills-ticker-track flex w-max items-center">
          <SkillTickerSequence />
          <SkillTickerSequence copy />
        </div>
      </div>
    </SectionFrame>
  )
}
