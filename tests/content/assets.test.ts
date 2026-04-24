import { describe, expect, it } from "vitest"

import { resolveContentAsset } from "@/lib/content/assets"

describe("resolveContentAsset", () => {
  it("resolves a relative asset path to raw GitHub", () => {
    expect(
      resolveContentAsset({
        owner: "jun1216wei",
        repo: "BWJ2310-portfolio-content",
        ref: "main",
        contentDir: "projects/cs-pet-tech",
        assetPath: "./cover.png",
      }),
    ).toBe(
      "https://raw.githubusercontent.com/jun1216wei/BWJ2310-portfolio-content/main/projects/cs-pet-tech/cover.png",
    )
  })
})
