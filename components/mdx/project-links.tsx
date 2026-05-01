import { ExternalLink } from "lucide-react"

import { GitHubBrandIcon } from "@/components/icons/social-brand-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProjectLink = {
  href: string
  label: string
  type?: "github" | "website"
}

type ProjectLinksProps = {
  items?: ProjectLink[] | string
}

function parseProjectLinks(items: ProjectLinksProps["items"]) {
  if (Array.isArray(items)) {
    return items
  }

  if (typeof items !== "string") {
    return []
  }

  try {
    const parsed = JSON.parse(items) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item): item is ProjectLink =>
        Boolean(item) &&
        typeof item === "object" &&
        "href" in item &&
        "label" in item &&
        typeof item.href === "string" &&
        typeof item.label === "string"
    )
  } catch {
    return []
  }
}

function getProjectLinkIcon(type: ProjectLink["type"]) {
  return type === "github" ? GitHubBrandIcon : ExternalLink
}

export function ProjectLinks({ items }: ProjectLinksProps) {
  const links = parseProjectLinks(items)

  if (!links.length) {
    return null
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2" data-project-links>
      {links.map((link) => {
        const Icon = getProjectLinkIcon(link.type)

        return (
          <a
            key={`${link.href}-${link.label}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "max-w-full"
            )}
            href={link.href}
            rel="noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" className="size-3" />
            <span className="min-w-0 truncate">{link.label}</span>
          </a>
        )
      })}
    </div>
  )
}
