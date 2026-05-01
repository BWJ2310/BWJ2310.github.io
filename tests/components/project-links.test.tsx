import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProjectLinks } from "@/components/mdx/project-links"

describe("ProjectLinks", () => {
  it("renders external project links from MDX-friendly JSON", () => {
    render(
      <ProjectLinks items='[{"label":"GitHub repo","href":"https://github.com/TradingGoose/TradingGoose-Studio","type":"github"},{"label":"Website","href":"https://www.tradinggoose.ai","type":"website"}]' />
    )

    expect(screen.getByRole("link", { name: /GitHub repo/i })).toHaveAttribute(
      "href",
      "https://github.com/TradingGoose/TradingGoose-Studio"
    )
    expect(screen.getByRole("link", { name: /Website/i })).toHaveAttribute(
      "target",
      "_blank"
    )
  })
})
