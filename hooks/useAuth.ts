"use client"

import React, { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { apiClient, tokenManager, type User, type LoginData, type RegisterData, type AuthResponse } from "@/lib/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<AuthResponse>
  register: (data: RegisterData) => Promise<AuthResponse>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const storedUser = tokenManager.getUser()
      const accessToken = tokenManager.getAccessToken()

      if (storedUser && accessToken) {
        // Verify token is still valid
        const isValid = await apiClient.verifyToken()
        if (isValid) {
          setUser(storedUser)
        } else {
          // Token invalid, try to get fresh user data
          try {
            const freshUser = await apiClient.getProfile()
            setUser(freshUser)
            tokenManager.setUser(freshUser)
          } catch {
            // Failed to get user, clear tokens
            tokenManager.clearTokens()
          }
        }
      }
    } catch (error) {
      console.error("Auth initialization failed:", error)
      tokenManager.clearTokens()
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: LoginData) => {
    try {
      const response = await apiClient.login(data)
      tokenManager.setTokens(response.access, response.refresh)
      tokenManager.setUser(response.user)
      setUser(response.user)
      return response
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await apiClient.register(data)
      tokenManager.setTokens(response.access, response.refresh)
      tokenManager.setUser(response.user)
      setUser(response.user)
      return response
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setUser(null)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await apiClient.updateProfile(data)
      tokenManager.setUser(updatedUser)
      setUser(updatedUser)
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
