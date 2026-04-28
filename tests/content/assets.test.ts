import { describe, expect, it } from "vitest"

import { resolveContentAsset } from "@/lib/content/assets"

describe("resolveContentAsset", () => {
  it("resolves a relative asset path through the local content asset route", () => {
    expect(
      resolveContentAsset({
        contentDir: "cs-pet-tech",
        assetPath: "./images/01-inside.png",
      }),
    ).toBe("/api/content-assets/cs-pet-tech/images/01-inside.png")
  })

  it("preserves nested and absolute asset paths", () => {
    expect(
      resolveContentAsset({
        contentDir: "cs-pet-tech",
        assetPath: "screens/cover.png",
      }),
    ).toBe("/api/content-assets/cs-pet-tech/screens/cover.png")

    expect(
      resolveContentAsset({
        contentDir: "cs-pet-tech",
        assetPath: "https://example.com/cover.png",
      }),
    ).toBe("https://example.com/cover.png")
  })

  it("rejects asset paths that escape the project directory", () => {
    expect(() =>
      resolveContentAsset({
        contentDir: "cs-pet-tech",
        assetPath: "../robotics/images/robot.jpg",
      }),
    ).toThrow(/unsafe/i)
  })
})
