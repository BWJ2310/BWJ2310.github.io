type PullQuoteProps = {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-y border-border bg-muted/35 px-0 py-8 text-card-foreground">
      <p className="font-heading text-2xl font-normal leading-tight tracking-normal text-primary">{quote}</p>
      {attribution ? <footer className="mt-4 text-sm text-muted-foreground">{attribution}</footer> : null}
    </blockquote>
  )
}
