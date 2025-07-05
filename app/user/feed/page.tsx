"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Filter,
  Home,
  Compass,
  User,
  ShoppingBag,
  Palette,
  MoreHorizontal,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function UserFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [followedArtists, setFollowedArtists] = useState<Set<number>>(new Set())

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const toggleSave = (postId: number) => {
    const newSaved = new Set(savedPosts)
    if (newSaved.has(postId)) {
      newSaved.delete(postId)
    } else {
      newSaved.add(postId)
    }
    setSavedPosts(newSaved)
  }

  const toggleFollow = (artistId: number) => {
    const newFollowed = new Set(followedArtists)
    if (newFollowed.has(artistId)) {
      newFollowed.delete(artistId)
    } else {
      newFollowed.add(artistId)
    }
    setFollowedArtists(newFollowed)
  }

  const posts = [
    {
      id: 1,
      artist: {
        id: 1,
        name: "Priya Sharma",
        username: "@priya_art",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Sunset Dreams",
      description: "Oil on canvas, inspired by the golden hour at Marina Beach",
      likes: 234,
      comments: 18,
      price: "₹15,000",
      category: "Painting",
      timeAgo: "2h",
    },
    {
      id: 2,
      artist: {
        id: 2,
        name: "Arjun Patel",
        username: "@arjun_sculpts",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Urban Rhythm",
      description: "Bronze sculpture capturing the essence of city life",
      likes: 156,
      comments: 12,
      price: "₹45,000",
      category: "Sculpture",
      timeAgo: "4h",
    },
    {
      id: 3,
      artist: {
        id: 3,
        name: "Maya Singh",
        username: "@maya_digital",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      image: "/placeholder.svg?height=400&width=400",
      title: "Digital Mandala",
      description: "Contemporary digital art blending traditional patterns",
      likes: 89,
      comments: 7,
      price: "₹8,500",
      category: "Digital Art",
      timeAgo: "6h",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-cream to-pastel-sage dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search artists, artworks..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
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
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Feed</span>
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

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stories */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg p-0.5">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={`/placeholder.svg?height=56&width=56`} />
                            <AvatarFallback>A{i}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <span className="text-xs text-center">Artist {i}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.artist.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.artist.name}</span>
                          {post.artist.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.artist.username}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={followedArtists.has(post.artist.id) ? "secondary" : "default"}
                        size="sm"
                        onClick={() => toggleFollow(post.artist.id)}
                      >
                        {followedArtists.has(post.artist.id) ? "Following" : "Follow"}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                        className={likedPosts.has(post.id) ? "text-red-500" : ""}
                      >
                        <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        <span className="ml-1">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-5 h-5" />
                        <span className="ml-1">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSave(post.id)}
                      className={savedPosts.has(post.id) ? "text-blue-500" : ""}
                    >
                      <Bookmark className={`w-5 h-5 ${savedPosts.has(post.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-muted-foreground">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">{post.price}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Suggested Artists */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Suggested Artists</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>A{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">Artist {i}</div>
                        <div className="text-xs text-muted-foreground">@artist{i}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Categories */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Trending Categories</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                  <Badge key={category} variant="secondary" className="mr-2 mb-2">
                    {category}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
