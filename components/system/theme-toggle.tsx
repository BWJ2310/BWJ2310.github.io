"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-sm" }),
        "relative overflow-hidden"
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className={cn(
          "size-3.5 transition-all duration-200",
          isDark
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute size-3.5 transition-all duration-200",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  )
}
