import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundField } from "@/components/system/background-field"
import { SiteFooter } from "@/components/system/site-footer"
import { SiteHeader } from "@/components/system/site-header"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const interHeading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bruzzz Portfolio",
  description: "A dreamer building product systems, robotics, and visual work.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        inter.variable,
        interHeading.variable,
        interSans.variable
      )}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-primary-foreground"
            href="#main-content"
          >
            Skip to main content
          </a>
          <BackgroundField />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
