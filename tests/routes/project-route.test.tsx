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
    ).toEqual(["Sox", "CS Pet Tech", "Robotics", "Art"])
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

  it("renders the project-only public shell", () => {
    render(<SiteHeader />)

    expect(screen.getByRole("link", { name: "Bruzzz" })).toHaveAttribute(
      "href",
      "/"
    )
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
