"use client"

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl uppercase tracking-[-0.04em]">Content unavailable</h1>
      <p className="mt-4 text-[color:var(--muted-foreground)]">
        {error.message || "The requested content could not be loaded."}
      </p>
      <button
        className="mt-6 border border-[color:var(--border)] px-4 py-3 text-[10px] uppercase tracking-[0.24em]"
        onClick={reset}
        type="button"
      >
        Retry
      </button>
    </div>
  )
}
