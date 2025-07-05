import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ARTWALA Foundation - Empowering Creators, Connecting Communities",
  description:
    "An artist-led NGO dedicated to empowering creators, promoting visual literacy, and connecting the art community through mentorship, events, and digital promotion.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="artwala-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
