import Link from "next/link"

type ProjectSubnavProps = {
  projectSlug: string
  items: Array<{ slug: string; label: string }>
  activeSlug?: string
}

export function ProjectSubnav({ activeSlug, items, projectSlug }: ProjectSubnavProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          aria-current={activeSlug === item.slug ? "page" : undefined}
          className="border border-[color:var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)] aria-[current=page]:border-[color:var(--foreground)] aria-[current=page]:text-[color:var(--foreground)]"
          href={`/projects/${projectSlug}/${item.slug}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
