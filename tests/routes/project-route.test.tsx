import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ProjectsPage from "@/app/projects/page"

describe("ProjectsPage", () => {
  it("renders a projects archive heading", async () => {
    render(await ProjectsPage())
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument()
  })
})
