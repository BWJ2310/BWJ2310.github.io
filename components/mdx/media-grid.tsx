import Image from "next/image"

type MediaGridProps = {
  items: Array<{ src: string; alt: string; width?: number; height?: number }>
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Image
          key={item.src}
          alt={item.alt}
          className="w-full border border-[color:var(--border)] object-cover"
          height={item.height ?? 900}
          src={item.src}
          unoptimized
          width={item.width ?? 1200}
        />
      ))}
    </div>
  )
}
