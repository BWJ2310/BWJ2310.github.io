import { describe, expect, it } from "vitest"

import { resolveContentAsset } from "@/lib/content/assets"

describe("resolveContentAsset", () => {
  it("resolves a relative asset path to raw GitHub", () => {
    expect(
      resolveContentAsset({
        owner: "BWJ2310",
        repo: "BWJ2310-portfolio-content",
        ref: "main",
        contentDir: "projects/cs-pet-tech",
        assetPath: "./cover.png",
      }),
    ).toBe(
      "https://raw.githubusercontent.com/BWJ2310/BWJ2310-portfolio-content/main/projects/cs-pet-tech/cover.png",
    )
  })

  it("preserves nested and absolute asset paths", () => {
    expect(
      resolveContentAsset({
        owner: "BWJ2310",
        repo: "BWJ2310-portfolio-content",
        ref: "main",
        contentDir: "projects/cs-pet-tech",
        assetPath: "screens/cover.png",
      }),
    ).toBe(
      "https://raw.githubusercontent.com/BWJ2310/BWJ2310-portfolio-content/main/projects/cs-pet-tech/screens/cover.png",
    )

    expect(
      resolveContentAsset({
        owner: "BWJ2310",
        repo: "BWJ2310-portfolio-content",
        ref: "main",
        contentDir: "projects/cs-pet-tech",
        assetPath: "https://example.com/cover.png",
      }),
    ).toBe("https://example.com/cover.png")
  })
})
