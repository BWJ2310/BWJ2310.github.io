import Image from "next/image"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  cover?: string
  meta?: Array<{ label: string; value: string }>
  variant?: string
}

export function PageHeader({ cover, description, eyebrow, meta = [], title, variant }: PageHeaderProps) {
  const immersive = variant === "immersive"

  return (
    <div
      className={cn(
        "border border-[color:var(--border)] bg-[color:var(--card)] p-8 text-[color:var(--card-foreground)]",
        immersive && "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:items-end",
      )}
    >
      <div>
        {eyebrow ? <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">{eyebrow}</p> : null}
        <h1 className="mt-4 text-4xl leading-none uppercase tracking-[-0.04em] md:text-6xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{description}</p> : null}
        {meta.length > 0 ? (
          <dl className="mt-6 grid gap-3 text-xs md:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label} className="border border-white/12 p-3">
                <dt className="text-[9px] uppercase tracking-[0.24em] text-white/42">{item.label}</dt>
                <dd className="mt-2 text-white/78">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      {cover ? (
        <Image
          alt=""
          className="h-64 w-full border border-white/12 object-cover"
          height={720}
          priority={immersive}
          src={cover}
          unoptimized
          width={960}
        />
      ) : null}
    </div>
  )
}
