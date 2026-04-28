"use client"

import { Button } from "@/components/ui/button"

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-heading text-4xl">Content unavailable</h1>
      <p className="mt-4 text-muted-foreground">{error.message || "The requested content could not be loaded."}</p>
      <Button className="mt-6" onClick={reset} type="button">
        Retry
      </Button>
    </div>
  )
}
