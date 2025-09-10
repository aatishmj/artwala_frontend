"use client"
import { UserSidebar } from "@/components/side-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, Home, Compass, User, ShoppingBag, Palette } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

export default function UserFeed() {
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const router = useRouter()

  const toggleWishlist = async (artworkId: number) => {
    try {
      const newWishlist = new Set(wishlistPosts)
      if (newWishlist.has(artworkId)) {
        await apiClient.removeFromWishlist(artworkId)
        newWishlist.delete(artworkId)
        toast.success("Removed from wishlist")
      } else {
        await apiClient.addToWishlist(artworkId)
        newWishlist.add(artworkId)
        toast.success("Added to wishlist")
      }
      setWishlistPosts(newWishlist)
    } catch (error) {
      console.error("Failed to update wishlist:", error)
      toast.error("Failed to update wishlist")
    }
  }

  const handleArtistClick = (artistId: number) => {
    router.push(`/artist/${artistId}`)
  }

  const posts = [
    {
      id: 1,
      artist: {
        id: 1,
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Modern Art Collection",
      description: "Contemporary pieces that inspire creativity",
      imageHeightClass: "h-56" // Manual adjustment for varied height
    },
    {
      id: 2,
      artist: {
        id: 2,
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Nature Designs",
      description: "Organic patterns and natural beauty",
      imageHeightClass: "h-48"
    },
    {
      id: 3,
      artist: {
        id: 3,
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Architecture",
      description: "Modern architectural marvels",
      imageHeightClass: "h-64" // Manual adjustment for varied height
    },
     {
      id: 4,
      artist: {
        id: 4,
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Digital Dreams",
      description: "Exploring the future of digital art.",
      imageHeightClass: "h-40" // Manual adjustment for varied height
    },
    {
      id: 5,
      artist: {
        id: 5,
        name: "Rahul Singh",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Abstract Visions",
      description: "Bold colors and striking forms.",
      imageHeightClass: "h-52" // Manual adjustment for varied height
    },
    {
      id: 6,
      artist: {
        id: 6,
        name: "Jessica Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Coastal Serenity",
      description: "Capturing the calm of the ocean.",
      imageHeightClass: "h-48"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur-md">
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
            <div className="sticky top-24 space-y-6">
              {/* Main Navigation Card */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <Link
                      href="/user/feed"
                      className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Feed</span>
                    </Link>
                    <Link
                      href="/user/explore"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Compass className="w-5 h-5" />
                      <span>Explore</span>
                    </Link>
                    <Link
                      href="/user/wishlist"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/user/orders"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Orders</span>
                    </Link>
                    <Link
                      href="/user/profile"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              {/* Suggested Artists */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-3">
                  <h3 className="font-semibold text-sm">Suggested Artists</h3>
                </CardHeader>
                <CardContent className="p-3 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 cursor-pointer" onClick={() => handleArtistClick(i)}>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>A{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className="font-medium text-sm cursor-pointer hover:underline"
                            onClick={() => handleArtistClick(i)}
                          >
                            Artist {i}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">@artist{i}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="xs" className="bg-transparent">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Categories */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-3">
                  <h3 className="font-semibold text-sm">Trending Categories</h3>
                </CardHeader>
                <CardContent className="p-3">
                  {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="mr-1.5 mb-1.5 bg-slate-100 dark:bg-slate-700 text-xs font-normal"
                    >
                      {category}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* MODIFIED: Changed to CSS Columns for Pinterest-like layout */}
          <div className="lg:col-span-3 columns-2 md:columns-2 lg:columns-3 gap-6">
            {/* Posts */}
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col group mb-6 break-inside-avoid-column" /* Added mb-6 and break-inside-avoid-column */
              >
                {/* Image Section */}
                <div className="overflow-hidden">
                  {/* MODIFIED: Used dynamic imageHeightClass */}
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className={`w-full ${post.imageHeightClass} object-cover group-hover:scale-105 transition-transform duration-300`}
                  />
                </div>

                {/* Content Section */}
                <CardContent className="p-4 flex flex-col flex-grow">
                  {/* Title and Description */}
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.description}</p>
                  </div>

                  {/* Artist Info and Wishlist Button */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleArtistClick(post.artist.id)}
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.artist.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hover:underline">{post.artist.name}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleWishlist(post.id)}
                      className={
                        wishlistPosts.has(post.id)
                          ? "text-red-500"
                          : "text-slate-400 hover:text-red-500"
                      }
                    >
                      <Heart className={`w-5 h-5 ${wishlistPosts.has(post.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}