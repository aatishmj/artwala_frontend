const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

// Types
export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  user_type: "user" | "artist"
  phone?: string
  profile_image?: string
  bio?: string
  location?: string
  website?: string
  instagram_handle?: string
  twitter_handle?: string
  artist_since?: string
  social_links?: Record<string, string>
  is_verified: boolean
  date_joined: string
}

export interface AuthResponse {
  user: User
  access: string
  refresh: string
  message: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  user_type: "user" | "artist"
  phone?: string
}

// Token management
export const tokenManager = {
  getAccessToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token")
    }
    return null
  },

  getRefreshToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token")
    }
    return null
  },

  setTokens: (access: string, refresh: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
    }
  },

  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_data")
    }
  },

  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user))
    }
  },

  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data")
      return userData ? JSON.parse(userData) : null
    }
    return null
  },
}

// API client with automatic token refresh
class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const accessToken = tokenManager.getAccessToken()

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      // Handle token refresh for 401 errors
      if (response.status === 401 && accessToken) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          // Retry the original request with new token
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${tokenManager.getAccessToken()}`,
          }
          const retryResponse = await fetch(url, config)
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`)
          }
          return retryResponse.json()
        } else {
          // Refresh failed, redirect to login
          tokenManager.clearTokens()
          window.location.href = "/auth/login"
          throw new Error("Authentication failed")
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = tokenManager.getRefreshToken()
    if (!refreshToken) return false

    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        // Use the new refresh token if provided, otherwise keep the current one
        const newRefreshToken = data.refresh || refreshToken
        tokenManager.setTokens(data.access, newRefreshToken)
        return true
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
    }

    return false
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/register/", {
      method: "POST",
      body: JSON.stringify(data),
    })

    return response
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/login/", {
      method: "POST",
      body: JSON.stringify({
        username: data.email, // Backend expects 'username' field for email/username
        password: data.password,
      }),
    })

    // Store tokens and user data
    tokenManager.setTokens(response.access, response.refresh)
    tokenManager.setUser(response.user)

    return response
  }

  async getProfile(): Promise<User> {
    return this.request<User>("/api/profile/")
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>("/api/profile/", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async logout(): Promise<void> {
    const refreshToken = tokenManager.getRefreshToken()
    if (refreshToken) {
      try {
        await this.request("/api/logout/", {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
        })
      } catch (error) {
        console.error("Logout request failed:", error)
      }
    }
    tokenManager.clearTokens()
  }

  async verifyToken(): Promise<boolean> {
    const accessToken = tokenManager.getAccessToken()
    if (!accessToken) return false

    try {
      await this.request("/api/token/verify/", {
        method: "POST",
        body: JSON.stringify({ token: accessToken }),
      })
      return true
    } catch {
      return false
    }
  }
}

export const apiClient = new ApiClient()
