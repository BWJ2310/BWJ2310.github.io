import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { assertAllowedMdx, renderMdx } from "@/lib/content/mdx"

describe("assertAllowedMdx", () => {
  it("rejects import and export statements", () => {
    expect(() => assertAllowedMdx('import Demo from "./demo"')).toThrow(/disallowed/i)
    expect(() => assertAllowedMdx("export const value = 1")).toThrow(/disallowed/i)
  })
})

describe("renderMdx", () => {
  it("resolves standard markdown image sources through the content asset resolver", async () => {
    const { content } = await renderMdx("![Preview](./image.png)", {
      resolveAsset: (src) => `https://example.com/${src.replace(/^\.\//, "")}`,
    })

    render(content)

    expect(screen.getByAltText("Preview")).toHaveAttribute("src", "https://example.com/image.png")
  })
})
