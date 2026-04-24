import Image from "next/image"
import { createElement } from "react"
import type { ImgHTMLAttributes } from "react"

import { MediaGrid } from "./media-grid"
import { ProcessTimeline } from "./process-timeline"
import { ProjectHero } from "./project-hero"
import { PullQuote } from "./pull-quote"
import { ResultStats } from "./result-stats"
import { ToolStack } from "./tool-stack"
import { WideImage } from "./wide-image"

type AssetResolver = (src: string) => string

const identityResolver: AssetResolver = (src) => src

function toImageDimension(value: ImgHTMLAttributes<HTMLImageElement>["width"], fallback: number) {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return fallback
}

function createMarkdownImage(resolveAsset: AssetResolver) {
  return function MarkdownImage({ alt, className, height, src, title, width }: ImgHTMLAttributes<HTMLImageElement>) {
    if (typeof src !== "string" || src.length === 0) {
      return null
    }

    return createElement(Image, {
      alt: String(alt ?? ""),
      className: ["w-full border border-[color:var(--border)] object-cover", className].filter(Boolean).join(" "),
      height: toImageDimension(height, 900),
      src: resolveAsset(src),
      title,
      unoptimized: true,
      width: toImageDimension(width, 1600),
    })
  }
}

export function createMdxComponents(resolveAsset: AssetResolver = identityResolver) {
  return {
    img: createMarkdownImage(resolveAsset),
    MediaGrid: (props: Parameters<typeof MediaGrid>[0]) =>
      createElement(MediaGrid, {
        ...props,
        items: props.items.map((item) => ({
          ...item,
          src: resolveAsset(item.src),
        })),
      }),
    ProcessTimeline,
    ProjectHero,
    PullQuote,
    ResultStats,
    ToolStack,
    WideImage: (props: Parameters<typeof WideImage>[0]) =>
      createElement(WideImage, { ...props, src: resolveAsset(props.src) }),
  }
}

export const mdxComponents = {
  MediaGrid,
  ProcessTimeline,
  ProjectHero,
  PullQuote,
  ResultStats,
  ToolStack,
  WideImage,
}
