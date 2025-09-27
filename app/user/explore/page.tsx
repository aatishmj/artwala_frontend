"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { UserMenu } from "@/components/user-menu"

import {
  Search,
  Home,
  Compass,
  User,
  ShoppingBag,
  Palette,
  Heart,
  Eye,
  MapPin,
  Bookmark,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useArtistRecommendations } from "@/hooks/useArtistRecommendations"
import { useArtworks } from "@/hooks"
import { useCategories } from "@/hooks/useCategories"
import { getImageUrl } from "@/lib/utils"

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { recommendations, loading: recLoading } = useArtistRecommendations()
  const { artworks, loading: artLoading } = useArtworks({ limit: 4 })
  const { categories: dynamicCategories, loading: catLoading } = useCategories()



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
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <Compass className="w-5 h-5" />
                    <span className="font-medium">Explore</span>
                  </Link>
                  <Link
                    href="/user/saved"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span>Saved</span>
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
          <div className="lg:col-span-3 space-y-6">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-2">Discover Amazing Art</h1>
                <p className="text-purple-100 mb-4">Explore thousands of artworks from talented artists across India</p>
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Exploring
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {catLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button
                      key="all"
                      variant={activeCategory === "all" ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setActiveCategory("all")}
                    >
                      <span className="font-medium">All</span>
                    </Button>
                    {dynamicCategories.map((category) => (
                      <Button
                        key={category.toLowerCase()}
                        variant={activeCategory === category.toLowerCase() ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={() => setActiveCategory(category.toLowerCase())}
                      >
                        <span className="font-medium">{category}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trending Artists */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Artists
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recLoading ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full" />
                          <Skeleton className="h-4 w-20 mx-auto mb-1" />
                          <Skeleton className="h-3 w-16 mx-auto mb-2" />
                          <Skeleton className="h-3 w-12 mx-auto mb-3" />
                          <Skeleton className="h-6 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {(recommendations?.trending_artists || []).map((artist) => (
                      <Card key={artist.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Avatar className="w-16 h-16 mx-auto mb-3">
                            <AvatarImage src={getImageUrl(artist.profile_image) || "/placeholder.svg"} />
                            <AvatarFallback>{artist.first_name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <h3 className="font-semibold">{artist.first_name} {artist.last_name}</h3>
                            {artist.is_verified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">@{artist.username}</p>
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                            <MapPin className="w-3 h-3" />
                            <span>{artist.location || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-center gap-4 text-sm mb-3">
                            <div className="text-center">
                              <div className="font-medium">{artist.follower_count || 0}</div>
                              <div className="text-muted-foreground">Followers</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">0</div>
                              <div className="text-muted-foreground">Artworks</div>
                            </div>
                          </div>
                          <Button size="sm" className="w-full">
                            Follow
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Featured Artworks */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Artworks</CardTitle>
              </CardHeader>
              <CardContent>
                {artLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="w-full h-48" />
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-1/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork) => (
                      <Card key={artwork.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="relative">
                          <img
                            src={getImageUrl(artwork.image) || "/placeholder.svg"}
                            alt={artwork.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-black/50 text-white">
                              {artwork.category}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {artwork.view_count || 0}
                            </div>
                            <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {artwork.likes_count || 0}
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{artwork.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {artwork.artist.first_name} {artwork.artist.last_name}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">₹{artwork.price}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                                Buy
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
