import Image from "next/image"

import { cn } from "@/lib/utils"

type WideImageProps = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  fit?: "auto" | "cover" | "contain"
  aspect?: "auto" | "wide" | "screen" | "square" | "portrait" | "logo"
  tone?: "default" | "feature" | "tall" | "compact" | "full"
}

type MediaAspect = Exclude<NonNullable<WideImageProps["aspect"]>, "auto">

const aspectFrames: Record<MediaAspect, { card: string; frame: string; ratio: string }> = {
  logo: {
    card: "md:col-span-6",
    frame: "md:max-h-[220px]",
    ratio: "5 / 2",
  },
  portrait: {
    card: "md:col-span-8 xl:col-span-7",
    frame: "md:max-h-[680px]",
    ratio: "4 / 5",
  },
  screen: {
    card: "md:col-span-8",
    frame: "md:max-h-[560px]",
    ratio: "4 / 3",
  },
  square: {
    card: "md:col-span-8 xl:col-span-7",
    frame: "md:max-h-[560px]",
    ratio: "1 / 1",
  },
  wide: {
    card: "md:col-span-12",
    frame: "md:max-h-[620px]",
    ratio: "16 / 10",
  },
}

const toneCardClasses: Record<NonNullable<WideImageProps["tone"]>, string> = {
  compact: "md:col-span-6",
  default: "md:col-span-8",
  feature: "md:col-span-12",
  full: "md:col-span-12",
  tall: "md:col-span-6",
}

function getAutoAspect(width?: number, height?: number): MediaAspect {
  if (!width || !height) {
    return "wide"
  }

  const ratio = width / height

  if (ratio > 1.45) {
    return "wide"
  }

  if (ratio < 0.82) {
    return "portrait"
  }

  if (ratio >= 0.92 && ratio <= 1.08) {
    return "square"
  }

  return "screen"
}

export function WideImage({
  src,
  alt,
  caption,
  aspect = "auto",
  fit = "auto",
  tone,
  width = 1600,
  height = 900,
}: WideImageProps) {
  const autoAspect = aspect === "auto"
  const resolvedAspect = autoAspect ? getAutoAspect(width, height) : aspect
  const frame = aspectFrames[resolvedAspect]
  const preserveImage = fit === "contain" || (fit === "auto" && autoAspect)
  const frameStyle = { aspectRatio: frame.ratio }

  return (
    <figure
      className={cn(
        "group/media overflow-hidden border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        tone ? toneCardClasses[tone] : frame.card,
      )}
      data-project-media
    >
      <div className="overflow-hidden border-b border-border bg-muted/35 p-2.5 sm:p-3">
        <div
          className={cn("flex w-full items-center justify-center overflow-hidden rounded-md bg-background", frame.frame)}
          style={frameStyle}
        >
          <Image
            alt={alt}
            className={cn(
              "rounded-md transition-transform duration-300 group-hover/media:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover/media:scale-100",
              preserveImage ? "h-auto max-h-full w-auto max-w-full object-contain p-2" : "h-full w-full object-cover",
            )}
            height={height}
            src={src}
            unoptimized
            width={width}
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="px-4 py-3">
          <p className="border-l border-border pl-3 text-xs/6 text-muted-foreground">{caption}</p>
        </figcaption>
      ) : null}
    </figure>
  )
}
