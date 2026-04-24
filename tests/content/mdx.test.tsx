import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderRemoteMdx } from "@/lib/content/mdx"

describe("renderRemoteMdx", () => {
  it("resolves standard markdown image sources through the content asset resolver", async () => {
    const { content } = await renderRemoteMdx("![Preview](./image.png)", {
      resolveAsset: (src) => `https://example.com/${src.replace(/^\.\//, "")}`,
    })

    render(content)

    expect(screen.getByAltText("Preview")).toHaveAttribute("src", "https://example.com/image.png")
  })
})
