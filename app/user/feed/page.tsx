"use client"
import { UserSidebar } from "@/components/side-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, Search, Home, Compass, User, ShoppingBag, Palette, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { StoryViewer } from "@/components/story-viewer"
import { CommentSection } from "@/components/comment-section"
import { ShareModal } from "@/components/share-modal"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

export default function UserFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const [followedArtists, setFollowedArtists] = useState<Set<number>>(new Set())
  const router = useRouter()

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

  const toggleFollow = (artistId: number) => {
    const newFollowed = new Set(followedArtists)
    if (newFollowed.has(artistId)) {
      newFollowed.delete(artistId)
    } else {
      newFollowed.add(artistId)
    }
    setFollowedArtists(newFollowed)
  }

  const handleBuyNow = (artworkId: number, price: string) => {
    router.push(`/payment?artwork=${artworkId}&price=${price}`)
  }

  const handleArtistClick = (artistId: number) => {
    router.push(`/artist/${artistId}`)
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
      price: "15000",
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
      price: "45000",
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
      price: "8500",
      category: "Digital Art",
      timeAgo: "6h",
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
          <UserSidebar />



          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stories */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StoryViewer
                      key={i}
                      stories={[
                        {
                          id: i,
                          artist: {
                            name: `Artist ${i}`,
                            username: `@artist${i}`,
                            avatar: `/placeholder.svg?height=56&width=56`,
                          },
                          image: `/placeholder.svg?height=400&width=300`,
                          timestamp: "2h ago",
                        },
                      ]}
                      initialStoryIndex={0}
                    >
                      <div className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                            <Avatar className="w-14 h-14">
                              <AvatarImage src={`/placeholder.svg?height=56&width=56`} />
                              <AvatarFallback>A{i}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <span className="text-xs text-center">Artist {i}</span>
                      </div>
                    </StoryViewer>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="cursor-pointer" onClick={() => handleArtistClick(post.artist.id)}>
                        <Avatar>
                          <AvatarImage src={post.artist.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.artist.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-semibold cursor-pointer hover:underline"
                            onClick={() => handleArtistClick(post.artist.id)}
                          >
                            {post.artist.name}
                          </span>
                          {post.artist.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
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
                        className={
                          !followedArtists.has(post.artist.id)
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : ""
                        }
                      >
                        {followedArtists.has(post.artist.id) ? "Following" : "Follow"}
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
                        className={likedPosts.has(post.id) ? "text-red-500" : "text-slate-600 dark:text-slate-400"}
                      >
                        <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        <span className="ml-1">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </Button>
                      <CommentSection
                        postId={post.id}
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
                          {
                            id: 2,
                            user: {
                              name: "Jane Smith",
                              username: "@janesmith",
                              avatar: "/placeholder.svg?height=32&width=32",
                            },
                            content: "This is amazing! How long did it take to create?",
                            likes: 3,
                            timestamp: "1h ago",
                          },
                        ]}
                      >
                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                          <MessageCircle className="w-5 h-5" />
                          <span className="ml-1">{post.comments}</span>
                        </Button>
                      </CommentSection>
                      <ShareModal postUrl={`https://artwala.com/post/${post.id}`} postTitle={post.title}>
                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </ShareModal>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWishlist(post.id)}
                      className={wishlistPosts.has(post.id) ? "text-red-500" : "text-slate-600 dark:text-slate-400"}
                    >
                      <Heart className={`w-5 h-5 ${wishlistPosts.has(post.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{post.price}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                          onClick={() => handleBuyNow(post.id, post.price)}
                        >
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
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <h3 className="font-semibold">Suggested Artists</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 cursor-pointer" onClick={() => handleArtistClick(i)}>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>A{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className="font-medium text-sm cursor-pointer hover:underline"
                          onClick={() => handleArtistClick(i)}
                        >
                          Artist {i}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">@artist{i}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Categories */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <h3 className="font-semibold">Trending Categories</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                  <Badge key={category} variant="secondary" className="mr-2 mb-2 bg-slate-100 dark:bg-slate-700">
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
