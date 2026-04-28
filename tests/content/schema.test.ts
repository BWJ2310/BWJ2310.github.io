import { describe, expect, it } from "vitest"

import { projectSchema } from "@/lib/content/schema"

describe("content schemas", () => {
  it("accepts a project overview", () => {
    const result = projectSchema.safeParse({
      title: "CS Pet Tech",
      description: "Pet tech case study.",
      status: "Completed",
      year: "2026",
      role: "Designer and engineer",
      team: "Independent",
      tools: ["Next.js", "Figma"],
      cover: "./cover.png",
      featured: true,
    })

    expect(result.success).toBe(true)
  })
})
