"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Home, Compass, User, ShoppingBag, Palette, Eye, Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"

import { ThemeToggle } from "@/components/theme-toggle"
import { useWishlist } from "@/hooks/useWishlist"
import { getImageUrl } from "@/lib/utils"

export default function SavedPage() {
  const { wishlist, loading, error, removeFromWishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search artists, artworks..." className="pl-10 bg-white dark:bg-slate-700" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/user/feed"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Home className="w-5 h-5" />
                    <span>Feed</span>
                  </Link>
                  <Link
                    href="/user/explore"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </Link>
                  <Link
                    href="/user/saved"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span className="font-medium">Saved</span>
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Saved Artworks</h1>
              <p className="text-muted-foreground">Your collection of saved artworks ({wishlist.length} items)</p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">Failed to load saved artworks</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : wishlist.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No saved artworks yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring and save artworks you love to see them here
                  </p>
                  <Button asChild>
                    <Link href="/user/explore">Explore Artworks</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={getImageUrl(item.artwork.image) || "/placeholder.svg"}
                        alt={item.artwork.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {item.artwork.category}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-black/50 text-white hover:bg-black/70"
                          onClick={() => removeFromWishlist(item.artwork.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{item.artwork.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {item.artwork.artist.first_name} {item.artwork.artist.last_name}</p>
                      <p className="text-xs text-muted-foreground mb-3">Saved {new Date(item.added_on).toLocaleDateString()}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600">₹{item.artwork.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
