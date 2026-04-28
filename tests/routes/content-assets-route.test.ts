import { describe, expect, it } from "vitest"

import { GET } from "@/app/api/content-assets/[...path]/route"

describe("content asset route", () => {
  it("supports byte ranges for playable media", async () => {
    const response = await GET(
      new Request("http://localhost/api/content-assets/art/cover.svg", {
        headers: {
          range: "bytes=0-9",
        },
      }),
      {
        params: Promise.resolve({ path: ["art", "cover.svg"] }),
      }
    )

    expect(response.status).toBe(206)
    expect(response.headers.get("accept-ranges")).toBe("bytes")
    expect(response.headers.get("content-range")).toMatch(/^bytes 0-9\//)
    expect(await response.text()).toHaveLength(10)
  })
})
