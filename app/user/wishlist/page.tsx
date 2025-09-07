"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { apiClient, type WishlistItem } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const items = await apiClient.getWishlist()
      setWishlistItems(items)
    } catch (error) {
      console.error("Failed to fetch wishlist:", error)
      toast.error("Failed to load wishlist")
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (artworkId: number) => {
    try {
      await apiClient.removeFromWishlist(artworkId)
      setWishlistItems((items) => items.filter((item) => item.artwork.id !== artworkId))
      toast.success("Removed from wishlist")
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      toast.error("Failed to remove from wishlist")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/user/feed" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Feed</span>
              </Link>
              <Link href="/user/feed" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-lg">ARTWALA</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {wishlistItems.length} {wishlistItems.length === 1 ? "artwork" : "artworks"} saved
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Start exploring and save artworks you love!</p>
            <Link href="/user/explore">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Explore Artworks
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <div className="relative">
                  <img
                    src={item.artwork.image || "/placeholder.svg?height=250&width=300"}
                    alt={item.artwork.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(item.artwork.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-slate-800">
                      {item.artwork.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.artwork.artist.profile_image || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {item.artwork.artist.first_name}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.artwork.artist.first_name} {item.artwork.artist.last_name}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-1 line-clamp-1">{item.artwork.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {item.artwork.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-green-600 dark:text-green-400">₹{item.artwork.price}</span>
                    <span className="text-xs text-slate-500">
                      Added {new Date(item.added_on).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
