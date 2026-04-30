import { describe, expect, it } from "vitest"

import { getProjectSlugs } from "@/lib/content/loaders"

describe("getProjectSlugs", () => {
  it("reads project folders from the canonical in-repo content directory", async () => {
    await expect(getProjectSlugs()).resolves.toEqual(
      expect.arrayContaining(["art", "cs-pet-tech", "robotics", "sox"]),
    )
  })

  it("includes the AirTurn and TradingGoose project folders", async () => {
    await expect(getProjectSlugs()).resolves.toEqual(
      expect.arrayContaining([
        "airturn",
        "tradinggoose-market",
        "tradinggoose-studio",
      ]),
    )
  })
})
