import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import HomePage from "@/app/page"

describe("HomePage", () => {
  it("renders the approved homepage sections", () => {
    render(<HomePage />)

    expect(
      screen.getByRole("heading", {
        name: /creative engineer with a product-minded approach/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /selected work/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /practice areas/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /^about$/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument()
  })
})
