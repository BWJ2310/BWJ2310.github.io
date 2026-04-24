import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl uppercase tracking-[-0.04em]">Not found</h1>
      <p className="mt-4 text-[color:var(--muted-foreground)]">That page does not exist in this portfolio.</p>
      <Link
        className="mt-6 inline-flex border border-[color:var(--border)] px-4 py-3 text-[10px] uppercase tracking-[0.24em]"
        href="/"
      >
        Return home
      </Link>
    </div>
  )
}
