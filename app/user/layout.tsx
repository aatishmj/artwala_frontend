"use client"

import { ProtectedRoute } from "@/components/protected-route"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredUserType="user">
      {children}
    </ProtectedRoute>
  )
}
