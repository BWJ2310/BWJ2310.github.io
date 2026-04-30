import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ProjectsPage from "@/app/projects/page"
import ProjectPage from "@/app/projects/[slug]/page"
import { SiteHeader } from "@/components/system/site-header"
import { CONTACT_MAILTO } from "@/lib/contact"

describe("ProjectsPage", () => {
  it("renders a projects index heading", async () => {
    const { container } = render(await ProjectsPage())
    expect(
      screen.getByRole("heading", { name: /project index/i })
    ).toBeInTheDocument()
    expect(container.querySelector(".lucide-folder-kanban")).toBeInTheDocument()
    expect(container.querySelector(".lucide-workflow")).toBeInTheDocument()
    expect(container.querySelector(".lucide-circuit-board")).toBeInTheDocument()
    expect(
      container.querySelectorAll("[data-slot='badge'] svg.lucide").length
    ).toBeGreaterThanOrEqual(8)
  })

  it("sorts projects by recent timeline first", async () => {
    render(await ProjectsPage())

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual([
      "TradingGoose-Market",
      "TradingGoose-Studio",
      "AirTurn Product Design",
      "Sox",
      "CS Pet Tech",
      "Robotics",
      "Art",
    ])
  })

  it("renders project details as a single index page without child-page navigation", async () => {
    render(
      await ProjectPage({ params: Promise.resolve({ slug: "cs-pet-tech" }) })
    )

    expect(
      screen.getByRole("heading", { name: /cs pet tech/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/project pages/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /story/i })
    ).not.toBeInTheDocument()
  })

  it("renders the new AirTurn and TradingGoose project pages", async () => {
    const airTurn = render(
      await ProjectPage({
        params: Promise.resolve({ slug: "airturn" }),
      })
    )

    expect(
      screen.getByRole("heading", { name: /airturn product design/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/stage hardware/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /foot pedal product presentation/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /concept design and interface renders/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText("StageStand detached product render")
    ).toBeInTheDocument()
    expect(
      screen.getByText("StageStand hero product render")
    ).toBeInTheDocument()
    expect(screen.getByText("StageStand motion sequence")).toBeInTheDocument()
    expect(screen.getByText("PED500 product detail render")).toBeInTheDocument()
    expect(
      screen.getByText("PED500 full-width product render")
    ).toBeInTheDocument()
    expect(screen.getByText("PED500 product comparison")).toBeInTheDocument()
    expect(screen.getByText("DUO500 interface detail")).toBeInTheDocument()
    airTurn.unmount()

    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "tradinggoose-market" }),
      })
    )

    expect(
      screen.getByRole("heading", { name: /tradinggoose-market/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /market records what exists; clients render provider symbols/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Provider-ready symbols")).toBeInTheDocument()
    expect(
      screen.getByText("Market admin dashboard and database connectivity view.")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Listings table with stock identity, country, quote currency, market, and active state."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Market hours editor for sessions, holidays, and early closes."
      )
    ).toBeInTheDocument()
  })

  it("renders the TradingGoose-Studio video and screenshot section", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "tradinggoose-studio" }),
      })
    )

    expect(
      screen.getByRole("heading", {
        name: /copy an analytical workflow from a url/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/custom indicator settings in the data_chart widget/i)
    ).toBeInTheDocument()
    expect(screen.getByText("Project overview, light mode")).toBeInTheDocument()
    expect(screen.getByText("Multi-layout dashboard")).toBeInTheDocument()
    expect(
      screen.getByLabelText(
        /tradinggoose-studio copilot workflow and custom indicator video demo/i
      )
    ).toBeInTheDocument()
  })

  it("renders the project-only public shell", () => {
    render(<SiteHeader />)

    expect(
      screen.getByRole("link", { name: "Bruzzz's website" })
    ).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    )
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute(
      "href",
      "/projects"
    )
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about"
    )
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      CONTACT_MAILTO
    )
    expect(
      screen.getByRole("button", { name: /toggle color theme/i })
    ).toHaveAttribute("aria-pressed", "false")
  })
})
