export function SiteFooter() {
  return (
    <footer className="portfolio-container -translate-y-px">
      <div className="border-x border-t border-border bg-background">
        <div className="mx-auto grid max-w-3xl gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-7 md:grid-cols-[1fr_auto] md:py-8">
          <div className="space-y-2">
            <span className="font-heading text-sm text-primary">Bruzzz</span>
            <p className="max-w-xl">
              Mechanical engineering, product systems, robotics, and visual experiments, shaped into one portfolio.
            </p>
          </div>
          <div className="grid gap-1 md:text-right">
            <span>Focused case studies, project records, and visual experiments</span>
            <span>Personal portfolio by Bruzzz</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
