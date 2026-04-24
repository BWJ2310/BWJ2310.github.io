import { describe, expect, it } from "vitest"

import { assertAllowedRemoteMdx } from "@/lib/content/mdx"
import { validateProjectChildren } from "@/lib/content/loaders"

describe("validateProjectChildren", () => {
  it("sorts valid pages and rejects duplicate order values", () => {
    const result = validateProjectChildren([
      { slug: "story", frontmatter: { title: "Story", order: 2 } },
      { slug: "process", frontmatter: { title: "Process", order: 1 } },
      { slug: "gallery", frontmatter: { title: "Gallery", order: 1 } },
    ])

    expect(result.valid.map((page) => page.slug)).toEqual(["process", "story"])
    expect(result.invalid.map((page) => page.slug)).toEqual(["gallery"])
  })
})

describe("assertAllowedRemoteMdx", () => {
  it("rejects import and export statements", () => {
    expect(() => assertAllowedRemoteMdx('import Demo from "./demo"')).toThrow(/disallowed/i)
    expect(() => assertAllowedRemoteMdx("export const value = 1")).toThrow(/disallowed/i)
  })
})
