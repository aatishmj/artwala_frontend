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
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useArtistRecommendations } from "@/hooks/useArtistRecommendations"
import { useArtworks } from "@/hooks"
import { useCategories } from "@/hooks/useCategories"
import { getImageUrl } from "@/lib/utils"

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { recommendations, loading: recLoading } = useArtistRecommendations()
  const { artworks, loading: artLoading } = useArtworks({ limit: 4 })
  const { categories: dynamicCategories, loading: catLoading } = useCategories()

  const navigationItems = [
    { href: "/user/feed", icon: Home, label: "Feed", active: false },
    { href: "/user/explore", icon: Compass, label: "Explore", active: true },
    { href: "/user/wishlist", icon: Heart, label: "Wishlist", active: false },
    { href: "/user/orders", icon: ShoppingBag, label: "Orders", active: false },
    { href: "/user/profile", icon: User, label: "Profile", active: false },
  ]

  const suggestedArtists = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_art",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      location: "Mumbai",
      followers: "2.3K",
      artworks: 45
    },
    {
      id: 2,
      name: "Arjun Patel",
      username: "@arjun_sculpts",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: false,
      location: "Delhi",
      followers: "1.8K",
      artworks: 32
    },
    {
      id: 3,
      name: "Maya Singh",
      username: "@maya_digital",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      location: "Bangalore",
      followers: "3.1K",
      artworks: 67
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">ARTWALA</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search artists, artworks..." 
                  className="pl-10 bg-white dark:bg-slate-700 w-full" 
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    item.active 
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Suggested Artists */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Suggested Artists</h3>
              <div className="space-y-4">
                {suggestedArtists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={artist.avatar} />
                        <AvatarFallback>{artist.name?.[0] || 'A'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {artist.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{artist.username}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Trending Categories */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Trending Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="bg-slate-100 dark:bg-slate-700 text-xs font-normal"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Main Navigation Card */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          item.active 
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm" 
                            : "hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Suggested Artists */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-4">
                  <h3 className="font-semibold">Suggested Artists</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {suggestedArtists.map((artist) => (
                    <div key={artist.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={artist.avatar} />
                          <AvatarFallback>{artist.name?.[0] || 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {artist.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{artist.username}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Categories */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-4">
                  <h3 className="font-semibold">Trending Categories</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-slate-100 dark:bg-slate-700 text-xs font-normal"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content - Full width on mobile, 3 columns on desktop */}
          <div className="flex-1 space-y-6">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <CardContent className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Discover Amazing Art</h1>
                <p className="text-purple-100 mb-4 text-sm sm:text-base">Explore thousands of artworks from talented artists across India</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                          <h3 className="font-semibold mb-1 line-clamp-1">{artwork.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">by {artwork.artist.first_name} {artwork.artist.last_name}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">₹{artwork.price}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                                <ShoppingBag className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Buy</span>
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