import { describe, expect, it } from "vitest"

import { getContentConfig } from "@/lib/content/config"

describe("getContentConfig", () => {
  it("builds a public GitHub source config from environment variables", () => {
    const config = getContentConfig({
      CONTENT_REPO_OWNER: "jun1216wei",
      CONTENT_REPO_NAME: "BWJ2310-portfolio-content",
      CONTENT_REPO_REF: "main",
    })

    expect(config.owner).toBe("jun1216wei")
    expect(config.repo).toBe("BWJ2310-portfolio-content")
    expect(config.ref).toBe("main")
  })
})
