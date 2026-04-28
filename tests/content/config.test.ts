import { describe, expect, it } from "vitest"

import { getContentConfig } from "@/lib/content/config"

describe("getContentConfig", () => {
  it("uses the canonical in-repo projects directory", () => {
    const config = getContentConfig()

    expect(config.source).toBe("filesystem")
    expect(config.root).toMatch(/content[\\/]projects$/)
  })
})
