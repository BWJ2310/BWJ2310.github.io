import Link from "next/link"

type BlogCardProps = {
  href: string
  title: string
  description: string
  meta?: string
}

export function BlogCard({ description, href, meta, title }: BlogCardProps) {
  return (
    <Link className="block border border-[color:var(--border)] bg-white/55 p-6 transition-transform hover:-translate-y-0.5" href={href}>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">Article</p>
      <h2 className="mt-4 text-2xl uppercase tracking-[-0.04em]">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]/72">{description}</p>
      {meta ? <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">{meta}</p> : null}
    </Link>
  )
}
