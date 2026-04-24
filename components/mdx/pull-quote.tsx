type PullQuoteProps = {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-l-4 border-[color:var(--accent)] pl-6 text-2xl leading-tight tracking-[-0.03em]">
      <p>{quote}</p>
      {attribution ? (
        <footer className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  )
}
