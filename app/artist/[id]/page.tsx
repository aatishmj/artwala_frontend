"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Globe,
  Instagram,
  Twitter,
  Eye,
  ArrowLeft,
  UserPlus,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { CommentSection } from "@/components/comment-section"
import { ShareModal } from "@/components/share-modal"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

export default function ArtistProfilePage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const [isFollowing, setIsFollowing] = useState(false)
  const router = useRouter()
  const params = useParams()
  const artistId = params.id as string

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

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

  const handleBuyNow = (artworkId: number, price: string) => {
    router.push(`/payment?artwork=${artworkId}&price=${price}`)
  }

  const handleMessageArtist = () => {
    router.push(`/messages?artist=${artistId}`)
  }

  const handleHireArtist = () => {
    router.push(`/hire?artist=${artistId}`)
  }

  // Mock artist data
  const artist = {
    id: Number.parseInt(artistId),
    name: "Priya Sharma",
    username: "@priya_art",
    avatar: "/placeholder.svg?height=128&width=128",
    verified: true,
    bio: "Contemporary artist specializing in oil paintings and digital art. Inspired by nature, urban landscapes, and human emotions. Featured in multiple exhibitions across India.",
    location: "Mumbai, India",
    website: "https://priyasharma.art",
    instagram: "@priya_art_official",
    twitter: "@priya_artist",
    followers: 2341,
    following: 156,
    artworks: 45,
    joinedDate: "January 2020",
  }

  const artworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      image: "/placeholder.svg?height=300&width=300",
      price: "15000",
      likes: 234,
      comments: 18,
      views: 1200,
      category: "Painting",
      timeAgo: "2h",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      image: "/placeholder.svg?height=300&width=300",
      price: "45000",
      likes: 156,
      comments: 12,
      views: 890,
      category: "Sculpture",
      timeAgo: "4h",
    },
    {
      id: 3,
      title: "Digital Mandala",
      image: "/placeholder.svg?height=300&width=300",
      price: "8500",
      likes: 89,
      comments: 7,
      views: 567,
      category: "Digital Art",
      timeAgo: "6h",
    },
    {
      id: 4,
      title: "Morning Glory",
      image: "/placeholder.svg?height=300&width=300",
      price: "18000",
      likes: 312,
      comments: 24,
      views: 1456,
      category: "Painting",
      timeAgo: "1d",
    },
    {
      id: 5,
      title: "Abstract Thoughts",
      image: "/placeholder.svg?height=300&width=300",
      price: "9500",
      likes: 198,
      comments: 15,
      views: 743,
      category: "Digital Art",
      timeAgo: "2d",
    },
    {
      id: 6,
      title: "Nature's Call",
      image: "/placeholder.svg?height=300&width=300",
      price: "22000",
      likes: 445,
      comments: 31,
      views: 2134,
      category: "Painting",
      timeAgo: "3d",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
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

      <div className="container mx-auto px-4 py-6">
        {/* Artist Profile Header */}
        <Card className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={artist.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{artist.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{artist.name}</h1>
                  {artist.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-3">{artist.username}</p>

                <div className="flex items-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.artworks}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Artworks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.followers.toLocaleString()}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.following}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                    className={
                      !isFollowing
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : ""
                    }
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" onClick={handleMessageArtist}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" onClick={handleHireArtist}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Hire Artist
                  </Button>
                </div>

                {artist.bio && <p className="text-sm mb-4">{artist.bio}</p>}

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {artist.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {artist.joinedDate}</span>
                  </div>
                  {artist.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={artist.website} className="text-blue-500 hover:underline">
                        {artist.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {artist.instagram && (
                      <a
                        href={`https://instagram.com/${artist.instagram}`}
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                    {artist.twitter && (
                      <a
                        href={`https://twitter.com/${artist.twitter}`}
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artist Artworks */}
        <Tabs defaultValue="artworks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="artworks">Artworks ({artist.artworks})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <div className="relative">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {artwork.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {artwork.views}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{artwork.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-green-600 dark:text-green-400">₹{artwork.price}</span>
                      <span className="text-xs text-slate-500">{artwork.timeAgo}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(artwork.id)}
                          className={likedPosts.has(artwork.id) ? "text-red-500" : "text-slate-600 dark:text-slate-400"}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(artwork.id) ? "fill-current" : ""}`} />
                          <span className="ml-1">{artwork.likes + (likedPosts.has(artwork.id) ? 1 : 0)}</span>
                        </Button>
                        <CommentSection
                          postId={artwork.id}
                          comments={[
                            {
                              id: 1,
                              user: {
                                name: "John Doe",
                                username: "@johndoe",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              content: "Beautiful artwork! Love the colors.",
                              likes: 5,
                              timestamp: "2h ago",
                            },
                          ]}
                        >
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                            <MessageCircle className="w-4 h-4" />
                            <span className="ml-1">{artwork.comments}</span>
                          </Button>
                        </CommentSection>
                        <ShareModal postUrl={`https://artwala.com/artwork/${artwork.id}`} postTitle={artwork.title}>
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </ShareModal>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWishlist(artwork.id)}
                        className={
                          wishlistPosts.has(artwork.id) ? "text-red-500" : "text-slate-600 dark:text-slate-400"
                        }
                      >
                        <Heart className={`w-4 h-4 ${wishlistPosts.has(artwork.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handleBuyNow(artwork.id, artwork.price)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <h3 className="text-lg font-semibold">About {artist.name}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{artist.bio}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">{artist.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Member Since</h4>
                    <p className="text-slate-600 dark:text-slate-400">{artist.joinedDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Website</h4>
                    <a href={artist.website} className="text-blue-500 hover:underline">
                      {artist.website}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Social Media</h4>
                    <div className="flex gap-2">
                      <a href={`https://instagram.com/${artist.instagram}`} className="text-blue-500 hover:underline">
                        Instagram
                      </a>
                      <a href={`https://twitter.com/${artist.twitter}`} className="text-blue-500 hover:underline">
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
