export function BackgroundField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: [
          "linear-gradient(to bottom, rgba(28, 33, 43, 0.025), transparent 28rem)",
          "linear-gradient(to right, rgba(28, 33, 43, 0.035) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 70.9rem 100%",
        backgroundPosition: "0 0, center 0",
      }}
    />
  )
}
