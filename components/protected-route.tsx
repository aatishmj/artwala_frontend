"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: "user" | "artist"
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      if (requiredUserType && user?.user_type !== requiredUserType) {
        // Show an alert message for wrong user type access
        const currentUserType = user?.user_type === "artist" ? "Artist" : "User"
        const requiredType = requiredUserType === "artist" ? "Artist" : "User"
        console.warn(`Access denied: This page is for ${requiredType}s only. You are logged in as a ${currentUserType}.`)
        
        // Redirect to appropriate dashboard based on user type
        const redirectPath = user?.user_type === "artist" ? "/artist/dashboard" : "/user/feed"
        router.push(redirectPath)
        return
      }
    }
  }, [user, loading, isAuthenticated, requiredUserType, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  if (requiredUserType && user?.user_type !== requiredUserType) {
    return null // Will redirect to appropriate dashboard
  }

  return <>{children}</>
}
