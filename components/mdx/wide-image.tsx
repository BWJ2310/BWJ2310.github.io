import Image from "next/image"

type WideImageProps = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export function WideImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: WideImageProps) {
  return (
    <figure className="space-y-3">
      <Image alt={alt} className="w-full border border-[color:var(--border)] object-cover" height={height} src={src} unoptimized width={width} />
      {caption ? <figcaption className="text-sm text-[color:var(--muted-foreground)]">{caption}</figcaption> : null}
    </figure>
  )
}
