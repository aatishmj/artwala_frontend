"use client"

import { ProtectedRoute } from "@/components/protected-route"

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredUserType="artist">
      {children}
    </ProtectedRoute>
  )
}
