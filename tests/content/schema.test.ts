import { describe, expect, it } from "vitest"

import { blogSchema, projectChildSchema, projectSchema } from "@/lib/content/schema"

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

  it("rejects a child page without an order", () => {
    const result = projectChildSchema.safeParse({
      title: "Story",
    })

    expect(result.success).toBe(false)
  })

  it("rejects zero-based child page ordering", () => {
    const result = projectChildSchema.safeParse({
      title: "Story",
      order: 0,
    })

    expect(result.success).toBe(false)
  })

  it("accepts a blog post", () => {
    const result = blogSchema.safeParse({
      title: "Introducing Jun",
      description: "A short introduction.",
      date: "2026-04-23",
      tags: ["intro"],
      image: "./cover.png",
    })

    expect(result.success).toBe(true)
  })
})
