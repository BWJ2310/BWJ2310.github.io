import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { BackgroundField } from "@/components/system/background-field"
import { SiteFooter } from "@/components/system/site-footer"
import { SiteHeader } from "@/components/system/site-header"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Jun Wei Portfolio",
  description: "Creative engineer with a product-minded approach.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <BackgroundField />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
