import { Children, createElement, isValidElement } from "react"
import type { ImgHTMLAttributes, ReactNode } from "react"

import { MediaGrid } from "./media-grid"
import { ProcessTimeline } from "./process-timeline"
import { ProjectHero } from "./project-hero"
import { ProjectSection, ProjectSectionCopy, ProjectSectionMedia } from "./project-section"
import { PullQuote } from "./pull-quote"
import { ResultStats } from "./result-stats"
import { ToolStack } from "./tool-stack"
import { WideImage } from "./wide-image"
import type { ImageMetadata } from "@/lib/content/image-metadata"

type AssetResolver = (src: string) => string
type ImageMetadataResolver = (src: string) => ImageMetadata | undefined

const identityResolver: AssetResolver = (src) => src
const emptyImageMetadataResolver: ImageMetadataResolver = () => undefined

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

function createMarkdownImage(resolveAsset: AssetResolver, resolveImageMetadata: ImageMetadataResolver) {
  return function MarkdownImage({ alt, height, src, title, width }: ImgHTMLAttributes<HTMLImageElement>) {
    if (typeof src !== "string" || src.length === 0) {
      return null
    }

    const metadata = resolveImageMetadata(src)

    return createElement(WideImage, {
      alt: String(alt ?? ""),
      caption: title,
      height: toImageDimension(height, metadata?.height ?? 900),
      src: resolveAsset(src),
      width: toImageDimension(width, metadata?.width ?? 1600),
    })
  }
}

export function createMdxComponents(
  resolveAsset: AssetResolver = identityResolver,
  resolveImageMetadata: ImageMetadataResolver = emptyImageMetadataResolver,
) {
  const MarkdownImage = createMarkdownImage(resolveAsset, resolveImageMetadata)

  return {
    img: MarkdownImage,
    p: ({ children }: { children: ReactNode }) => {
      const childArray = Children.toArray(children)

      if (childArray.length === 1 && isValidElement(childArray[0]) && childArray[0].type === MarkdownImage) {
        return childArray[0]
      }

      return createElement("p", null, children)
    },
    MediaGrid: (props: Parameters<typeof MediaGrid>[0]) =>
      createElement(MediaGrid, {
        ...props,
        items: props.items?.map((item) => ({
          ...item,
          height: item.height ?? resolveImageMetadata(item.src)?.height,
          src: resolveAsset(item.src),
          width: item.width ?? resolveImageMetadata(item.src)?.width,
        })),
      }),
    ProcessTimeline,
    ProjectHero,
    ProjectSection,
    ProjectSectionCopy,
    ProjectSectionMedia,
    PullQuote,
    ResultStats,
    ToolStack,
    WideImage: (props: Parameters<typeof WideImage>[0]) => {
      const metadata = resolveImageMetadata(props.src)

      return createElement(WideImage, {
        ...props,
        height: props.height ?? metadata?.height,
        src: resolveAsset(props.src),
        width: props.width ?? metadata?.width,
      })
    },
  }
}

export const mdxComponents = {
  MediaGrid,
  ProcessTimeline,
  ProjectHero,
  ProjectSection,
  ProjectSectionCopy,
  ProjectSectionMedia,
  PullQuote,
  ResultStats,
  ToolStack,
  WideImage,
}
