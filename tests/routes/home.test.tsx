import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import HomePage from "@/app/page"
import { CONTACT_MAILTO } from "@/lib/contact"

describe("HomePage", () => {
  it("renders the approved homepage sections", async () => {
    render(await HomePage())

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /bruzzz builds pet-tech systems, robots, and visual worlds/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /projects with a point of view/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /regular human being trying to make an interesting story out of life/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Skills")).toBeInTheDocument()
    expect(screen.getAllByText("Fusion").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Blender").length).toBeGreaterThan(0)
    expect(screen.getAllByText("SolidWorks").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Next.js").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Tailwind CSS").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Shadcn UI").length).toBeGreaterThan(0)
    expect(screen.getAllByText("PostgreSQL").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Drizzle").length).toBeGreaterThan(0)
    expect(screen.getAllByText("React").length).toBeGreaterThan(0)
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThan(0)
    expect(screen.queryByText("Figma")).not.toBeInTheDocument()
    expect(screen.queryByText("After Effects")).not.toBeInTheDocument()
    expect(screen.queryByText("Photoshop")).not.toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /build the next story/i })
    ).toBeInTheDocument()
  })

  it("places skills and experience before featured work", async () => {
    render(await HomePage())

    const aboutHeading = screen.getByRole("heading", {
      name: /regular human being trying to make an interesting story out of life/i,
    })
    const skillsLabel = screen.getByText("Skills")
    const experienceLabel = screen.getByText("Experience")
    const workHeading = screen.getByRole("heading", {
      name: /projects with a point of view/i,
    })

    expect(
      aboutHeading.compareDocumentPosition(skillsLabel) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
    expect(
      skillsLabel.compareDocumentPosition(workHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
    expect(
      skillsLabel.compareDocumentPosition(experienceLabel) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
    expect(
      experienceLabel.compareDocumentPosition(workHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it("uses a themed about preview rail for light and dark modes", async () => {
    const { container } = render(await HomePage())

    expect(
      container.querySelector("section#about-preview .home-about-rail")
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        "section#about-preview [class*='rgba(245,246,248']"
      )
    ).not.toBeInTheDocument()
  })

  it("uses brand icons for social actions and lucide icons for section labels", async () => {
    const { container } = render(await HomePage())

    expect(
      container.querySelector("[data-brand-icon='github']")
    ).toBeInTheDocument()
    expect(container.querySelector("[data-brand-icon='x']")).toBeInTheDocument()
    expect(container.querySelector(".lucide-code-xml")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "IndieDevs" })).toHaveAttribute(
      "href",
      "https://www.indiedevs.me/bruzzz"
    )
    expect(
      container.querySelectorAll(".portfolio-label svg.lucide").length
    ).toBeGreaterThanOrEqual(5)
    expect(screen.queryByText("GH")).not.toBeInTheDocument()
    expect(screen.queryByText("X")).not.toBeInTheDocument()
  })

  it("uses direct mailto links for contact actions", async () => {
    render(await HomePage())

    expect(
      screen.queryByRole("link", { name: /get in touch/i })
    ).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      CONTACT_MAILTO
    )
  })

  it("renders light and dark Pacman contribution graphs", async () => {
    const { container } = render(await HomePage())

    expect(
      container.querySelector(
        "img[src='https://raw.githubusercontent.com/bwj2310/bwj2310/output/pacman-contribution-graph.svg']"
      )
    ).toHaveClass("dark:hidden")
    expect(
      container.querySelector(
        "img[src='https://raw.githubusercontent.com/bwj2310/bwj2310/output/pacman-contribution-graph-dark.svg']"
      )
    ).toHaveClass("hidden", "dark:block")
  })

  it("uses concrete tool logos in one continuous skills ticker", async () => {
    const { container } = render(await HomePage())

    expect(container.querySelectorAll(".skills-ticker-sequence").length).toBe(2)
    expect(
      container.querySelector(".skills-ticker-group")
    ).not.toBeInTheDocument()
    expect(
      container.querySelector("img[src*='/site-assets/skills/fusion.svg']")
    ).toBeInTheDocument()
    expect(
      container.querySelector("img[src*='/site-assets/skills/solidworks.svg']")
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        ".skill-logo-current[style*='/site-assets/skills/nextjs.svg']"
      )
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        ".skill-logo-current[style*='/site-assets/skills/shadcn-ui.svg']"
      )
    ).toBeInTheDocument()
    expect(
      container.querySelector("img[src*='/site-assets/skills/drizzle.svg']")
    ).toBeInTheDocument()

    const reactLogo = container.querySelector(
      "img.skill-logo[src*='/site-assets/skills/react.svg']"
    )
    expect(reactLogo).toHaveClass("skill-logo")
    expect(reactLogo).toHaveClass("grayscale")
    expect(
      container.querySelectorAll("[data-skill-icon-mode='currentColor']").length
    ).toBeGreaterThanOrEqual(2)
  })
})
