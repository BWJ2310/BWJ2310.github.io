import Link from "next/link"

type ProjectSubnavProps = {
  projectSlug: string
  items: Array<{ slug: string; label: string }>
}

export function ProjectSubnav({ projectSlug, items }: ProjectSubnavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          className="border border-[color:var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
          href={`/projects/${projectSlug}/${item.slug}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
