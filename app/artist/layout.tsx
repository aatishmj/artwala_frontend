"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { usePathname } from "next/navigation"

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Allow public access to artist profile pages (/artist/[id])
  const isPublicProfile = /^\/artist\/\d+$/.test(pathname)

  if (isPublicProfile) {
    return <>{children}</>
  }

  return (
    <ProtectedRoute requiredUserType="artist">
      {children}
    </ProtectedRoute>
  )
}
