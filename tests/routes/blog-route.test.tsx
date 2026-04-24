import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import BlogPage from "@/app/blog/page"

describe("BlogPage", () => {
  it("renders a blog archive heading", async () => {
    render(await BlogPage())
    expect(screen.getByRole("heading", { name: /blog/i })).toBeInTheDocument()
  })
})
