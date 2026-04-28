import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { WideImage } from "@/components/mdx/wide-image"

describe("WideImage", () => {
  it("renders video files with playable controls", () => {
    render(<WideImage alt="Animated study" src="/media/animated-study.mp4" />)

    const video = screen.getByLabelText("Animated study")

    expect(video.tagName).toBe("VIDEO")
    expect(video).toHaveAttribute("controls")
    expect(video).toHaveAttribute("playsinline")
    expect(video.querySelector("source")).toHaveAttribute(
      "src",
      "/media/animated-study.mp4"
    )
    expect(video.querySelector("source")).toHaveAttribute("type", "video/mp4")
  })

  it("keeps GIF files in the image rendering path", () => {
    render(
      <WideImage alt="Animated GIF study" src="/media/animated-study.gif" />
    )

    expect(screen.getByAltText("Animated GIF study")).toHaveAttribute(
      "src",
      "/media/animated-study.gif"
    )
  })
})
