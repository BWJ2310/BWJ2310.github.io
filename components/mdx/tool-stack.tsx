type ToolStackProps = {
  tools: string[]
}

export function ToolStack({ tools }: ToolStackProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <li key={tool} className="border border-[color:var(--border)] px-3 py-2 text-xs uppercase tracking-[0.2em]">
          {tool}
        </li>
      ))}
    </ul>
  )
}
