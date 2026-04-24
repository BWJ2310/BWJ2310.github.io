export function BackgroundField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-90"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: [
          "radial-gradient(circle at 20% 18%, rgba(0, 240, 255, 0.16), transparent 18%)",
          "radial-gradient(circle at 82% 22%, rgba(10, 69, 255, 0.09), transparent 20%)",
          "radial-gradient(circle at 50% 70%, rgba(0, 0, 0, 0.045) 1px, transparent 1px)",
        ].join(", "),
        backgroundPosition: "0 0, 0 0, 0 0",
        backgroundSize: "100% 100%, 100% 100%, 22px 22px",
      }}
    />
  )
}
