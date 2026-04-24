import Link from "next/link"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-8">
      <Link className="text-[10px] font-semibold uppercase tracking-[0.32em]" href="/">
        Jun Wei
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-4 text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
        {navItems.map((item) => (
          <Link key={item.href} className="transition-colors hover:text-[color:var(--foreground)]" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
