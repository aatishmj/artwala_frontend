const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

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
  membership_statuse?:boolean
  instagram_handle?: string
  twitter_handle?: string
  artist_since?: string
  social_links?: Record<string, string>
  is_verified: boolean
  date_joined: string
  followers?: number
  following?: number
  artworks?: number
  joinedDate?: string
}

export interface AuthResponse {
  user: User
  access: string
  refresh: string
  message: string
}
export interface Artwork {
  id: number
  title: string
  description: string
  price: string
  image: string
  artist: {
    id: number
    username: string
    first_name: string
    last_name: string
    profile_image?: string
  }
  category: string
  medium: string
  dimensions: string
  created_at: string
  is_available: boolean
  stock: number
  likes_count?: number
  view_count?: number
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

export interface Order {
  id: number
  user: number
  artwork: number
  quantity: number
  total_price: string
  status: string
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  artwork_id: number
  quantity: number
}

export interface Message {
  id: number
  sender: number
  recipient: number
  content: string
  timestamp: string
  is_read: boolean
}


export interface WishlistItem {
  id: number
  added_on: string
  artwork: {
    id: number
    title: string
    description: string
    price: number
    category: string
    image: string
    artist: {
      first_name: string
      last_name: string
      profile_image?: string
    }
  }
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
  private async request<T>(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const accessToken = tokenManager.getAccessToken()
    const isFormData = options.body instanceof FormData
    const maxRetries = 10

    const config: RequestInit = {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options.headers,
      },
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

      // Handle rate limiting (429) with Retry-After header support and exponential backoff
      if (response.status === 429 && retryCount < maxRetries) {
        let delay = Math.pow(2, retryCount) * 1000 // Default exponential backoff: 1s, 2s, 4s, 8s, 16s
        const retryAfter = response.headers.get('Retry-After')
        if (retryAfter) {
          const retrySeconds = parseInt(retryAfter, 10)
          if (!isNaN(retrySeconds)) {
            delay = retrySeconds * 1000
          }
        }
        delay = Math.min(delay, 30000) // Cap at 30 seconds
        console.warn(`Rate limited (429). Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries}) ${retryAfter ? `(Retry-After: ${retryAfter}s)` : ''}`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.request<T>(endpoint, options, retryCount + 1)
      }

      console.log("Response status:", response.status, "for endpoint:", endpoint)
      if (!response.ok) {
        // Try to parse error body if present
        let errorData: any = {}
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
            // Only attempt to parse if content length isn't zero
            if (response.status !== 204) {
              errorData = await response.json()
              console.log("Error response data:", errorData)
              // Handle common DRF error formats
              if (errorData.detail) {
                errorMessage = errorData.detail
              } else if (errorData.non_field_errors && errorData.non_field_errors.length > 0) {
                errorMessage = errorData.non_field_errors[0]
              } else if (errorData.message) {
                errorMessage = errorData.message
              } else if (typeof errorData === 'string') {
                errorMessage = errorData
              }
            }
        } catch (e) {
          console.log("Failed to parse error response as JSON, trying text:", e)
          try {
            const text = await response.text()
            console.log("Error response text:", text)
            if (text.includes("You cannot follow yourself")) {
              errorMessage = "You cannot follow yourself."
            } else if (text.includes("Invalid")) {
              errorMessage = "Invalid request."
            } else {
              errorMessage = "Server error."
            }
          } catch (_) { /* ignore */ }
        }

        // Specific handling for rate limiting
        if (response.status === 429) {
          errorMessage = "Too many requests. Please wait a moment and try again."
        }

        console.log("Throwing error:", errorMessage)
        throw new Error(errorMessage)
      }
      // DELETE / 204 No Content or empty body handling
      if (response.status === 204) {
        return {} as T
      }
      const contentType = response.headers.get('Content-Type') || ''
      if (!contentType.includes('application/json')) {
        // If no JSON, return empty object
        return {} as T
      }
      // Safely parse JSON; if empty return {} so callers don't fail
      try {
        return await response.json()
      } catch {
        return {} as T
      }
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

  async getPublicProfile(userId: number): Promise<User> {
    return this.request<User>(`/api/profile/${userId}/`)
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



  async getWishlist(): Promise<WishlistItem[]> {
    return this.request<WishlistItem[]>("/api/wishlist/")
  }

  async addToWishlist(artworkId: number): Promise<WishlistItem> {
    return this.request<WishlistItem>("/api/wishlist/", {
      method: "POST",
      body: JSON.stringify({ artwork_id: artworkId }),
    })
  }

  async removeFromWishlist(artworkId: number): Promise<void> {
    return this.request<void>(`/api/wishlist/${artworkId}/`, {
      method: "DELETE",
    })
  }

  async createArtwork(form: FormData): Promise<Artwork> {
    // Ensure required fields exist client-side
    if (!form.get('title')) throw new Error('Title is required')
    if (!form.get('image')) throw new Error('Primary image is required')
    const { data } = await this.post<Artwork>("/api/artworks/", form)
    return data
  }

  async getArtworks(params?: { limit?: number; offset?: number; ordering?: string; artist?: number }): Promise<Artwork[]> {
    // Basic list fetch; backend currently returns all artworks ordered by -created_at
    const query: string[] = []
    if (params?.limit) query.push(`limit=${params.limit}`)
    if (params?.offset) query.push(`offset=${params.offset}`)
    if (params?.ordering) query.push(`ordering=${encodeURIComponent(params.ordering)}`)
    if (params?.artist) query.push(`artist=${params.artist}`)
    const qp = query.length ? `?${query.join('&')}` : ''
    return this.request<Artwork[]>(`/api/artworks/${qp}`)
  }

  async updateArtwork(id: number, body: Partial<Pick<Artwork,'title'|'description'|'price'>>): Promise<Artwork> {
    const { data } = await this.patch<Artwork>(`/api/artworks/${id}/`, body)
    return data
  }

  async deleteArtwork(id: number): Promise<void> {
    await this.delete(`/api/artworks/${id}/`)
  }







  // Generic HTTP methods for hooks
  async get<T>(endpoint: string): Promise<{ data: T }> {
    const data = await this.request<T>(endpoint)
    return { data }
  }

  async post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<{ data: T }> {
    const config: RequestInit = {
      method: "POST",
      ...(body && { body: body instanceof FormData ? body : JSON.stringify(body) }),
      ...options,
    }
    const data = await this.request<T>(endpoint, config)
    return { data }
  }

  async patch<T>(endpoint: string, body: any): Promise<{ data: T }> {
    const data = await this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
    return { data }
  }

  async put<T>(endpoint: string, body: any): Promise<{ data: T }> {
    const data = await this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
    return { data }
  }

  async delete<T>(endpoint: string): Promise<{ data: T }> {
    const data = await this.request<T>(endpoint, {
      method: "DELETE",
    })
    return { data }
  }



  // Profile completion details
  async getProfileCompletion(): Promise<any> {
    return this.request("/api/profile/completion/")
  }

  // Artist recommendations
  async getArtistRecommendations(): Promise<{ data: any }> {
    return this.get("/api/artists/recommendations/")
  }

  // Categories
  async getCategories(): Promise<{ data: string[] }> {
    return this.get("/api/categories/")
  }

  // Orders
  async createOrder(data: CreateOrderData): Promise<Order> {
    return this.request<Order>("/api/orders/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getUserOrders(): Promise<Order[]> {
    return this.request<Order[]>("/api/user/orders/")
  }

  async getArtistOrders(): Promise<Order[]> {
    return this.request<Order[]>("/api/artist/orders/")
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    return this.request<Order>(`/api/orders/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  // Messages
  async getMessages(recipientId: number): Promise<Message[]> {
    return this.request<Message[]>(`/api/messages/${recipientId}/`)
  }

  async sendMessage(recipientId: number, content: string): Promise<Message> {
    return this.request<Message>(`/api/messages/${recipientId}/`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  async getConversations(): Promise<User[]> {
    return this.request<User[]>("/api/messages/")
  }

  // Follow/Unfollow
  async followArtist(artistId: number): Promise<void> {
    console.log("followArtist called with artistId:", artistId)
    console.log("Request body:", JSON.stringify({ following: artistId }))
    return this.request<void>("/api/follow/", {
      method: "POST",
      body: JSON.stringify({ following: artistId }),
    })
  }

  async unfollowArtist(artistId: number): Promise<void> {
    return this.request<void>(`/api/unfollow/${artistId}/`, {
      method: "DELETE",
    })
  }

}

export const apiClient = new ApiClient()

// utils/api.ts
export async function fetchWishlist() {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

  if (!token) throw new Error("No access token found")

  const res = await fetch(`${API_BASE_URL}/api/wishlist/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // optional: include cookies if needed
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to fetch wishlist: ${res.status} - ${errorText}`)
  }

  return res.json()
}
