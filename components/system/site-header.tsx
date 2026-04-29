import Link from "next/link"
import { FolderOpen, Home, Send, UserRound } from "lucide-react"

import { ThemeToggle } from "@/components/system/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { CONTACT_MAILTO } from "@/lib/contact"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/about", label: "About", icon: UserRound },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <div className="portfolio-container">
        <div className="flex flex-col gap-3 border-x border-b border-border bg-background px-4 py-3 sm:px-7 md:flex-row md:items-center md:justify-between">
          <Link
            className="font-heading text-sm font-bold tracking-normal text-primary"
            href="/"
          >
            Bruzzz's website
          </Link>
          <nav
            className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted hover:text-foreground"
                  href={item.href}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
            <ThemeToggle />
            <Link
              className={cn(buttonVariants({ size: "sm" }), "ml-1")}
              href={CONTACT_MAILTO}
            >
              <Send />
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
