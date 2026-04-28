import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ContentBody } from "@/components/system/content-body"

describe("ContentBody", () => {
  it("lets direct project paragraphs span the full body width", () => {
    const { container } = render(
      <ContentBody bodyWidth="full">
        <p>Full-width project note</p>
      </ContentBody>
    )

    const article = container.querySelector("[data-project-detail-body]")

    expect(article).toHaveClass("[&>p]:max-w-none")
    expect(article).not.toHaveClass("[&>p]:max-w-3xl")
  })
})
