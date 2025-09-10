"use client"

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
import { ShareModal } from "@/components/share-modal"
import { apiClient, tokenManager } from "@/lib/api"
import { useArtworks } from "@/hooks"
import { getImageUrl } from "@/lib/utils"
import { toast } from "sonner"

export default function UserFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const [followedArtists, setFollowedArtists] = useState<Set<number>>(new Set())
  const router = useRouter()
  const { artworks, loading, error } = useArtworks({ limit: 24 })

  const toggleLike = async (artworkId: number) => {
    // Optimistic like; requires auth
    const isAuthed = !!tokenManager.getAccessToken()
    if (!isAuthed) {
      router.push('/auth/login')
      return
    }
    const next = new Set(likedPosts)
    const wasLiked = next.has(artworkId)
    if (wasLiked) {
      // Backend has no unlike endpoint yet; keep UI only
      next.delete(artworkId)
      setLikedPosts(next)
      return
    }
    next.add(artworkId)
    setLikedPosts(next)
    try {
      await apiClient.likeArtwork(artworkId)
    } catch (e: any) {
      // rollback on failure
      const rollback = new Set(likedPosts)
      if (!wasLiked) rollback.delete(artworkId)
      setLikedPosts(rollback)
      toast.error(e?.message || 'Failed to like')
    }
  }

  const toggleWishlist = async (artworkId: number) => {
    const isAuthed = !!tokenManager.getAccessToken()
    if (!isAuthed) {
      router.push('/auth/login')
      return
    }
    try {
      const next = new Set(wishlistPosts)
      if (next.has(artworkId)) {
        await apiClient.removeFromWishlist(artworkId)
        next.delete(artworkId)
        toast.success("Removed from wishlist")
      } else {
        await apiClient.addToWishlist(artworkId)
        next.add(artworkId)
        toast.success("Added to wishlist")
      }
      setWishlistPosts(next)
    } catch (e: any) {
      toast.error(e?.message || "Failed to update wishlist")
    }
  }

  const toggleFollow = async (artistId?: number) => {
    if (!artistId) return
    const isAuthed = !!tokenManager.getAccessToken()
    if (!isAuthed) { router.push('/auth/login'); return }
    const next = new Set(followedArtists)
    const wasFollowing = next.has(artistId)
    if (wasFollowing) {
      // No unfollow endpoint yet; only UI toggle
      next.delete(artistId)
      setFollowedArtists(next)
      return
    }
    next.add(artistId)
    setFollowedArtists(next)
    try {
      await apiClient.followArtist(artistId)
      toast.success('Following artist')
    } catch (e: any) {
      const rollback = new Set(followedArtists)
      if (!wasFollowing) rollback.delete(artistId)
      setFollowedArtists(rollback)
      toast.error(e?.message || 'Failed to follow')
    }
  }

  const handleBuyNow = async (artworkId: number, price: string) => {
    const isAuthed = !!tokenManager.getAccessToken()
    if (!isAuthed) { router.push('/auth/login'); return }
    // Create a backend order then route to payment UI (still simulated)
    try {
      await apiClient.createOrder(artworkId, 1)
      router.push(`/payment?artwork=${artworkId}&price=${price}`)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to start order')
    }
  }

  const handleArtistClick = (artistId?: number) => {
    if (!artistId) return
    router.push(`/artist/${artistId}`)
  }

  // Map API artworks -> UI posts
  const posts = artworks.map((a) => ({
    id: a.id,
    artist: {
      id: typeof a.artist === "number" ? a.artist : a.artist?.id,
      name:
        typeof a.artist === "number"
          ? `Artist ${a.artist}`
          : `${(a as any).artist?.first_name || ""} ${(a as any).artist?.last_name || ""}`.trim() ||
            (typeof a.artist !== "number" ? (a as any).artist?.username : `artist_${a.artist}`),
      username: typeof a.artist === "number" ? `@artist${a.artist}` : `@${(a as any).artist?.username || "artist"}`,
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    image: getImageUrl(a.image),
    title: a.title,
    description: a.description,
    likes: 0,
    comments: 0,
    price: a.price,
    category: "Artwork",
    timeAgo: new Date(a.created_at).toLocaleString(),
  }))

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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
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
            <Card className="sticky top-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/user/feed"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Feed</span>
                  </Link>
                  <Link href="/user/explore" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </Link>
                  <Link href="/user/wishlist" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link href="/user/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </Link>
                  <Link href="/user/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
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
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StoryViewer
                      key={i}
                      stories={[
                        {
                          id: i,
                          artist: { name: `Artist ${i}`, username: `@artist${i}`, avatar: `/placeholder.svg?height=56&width=56` },
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

            {/* Dynamic Posts */}
            {error && <p className="text-sm text-red-600">{String(error)}</p>}
            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-96 bg-slate-200 dark:bg-slate-800 rounded" />
                ))}
              </div>
            )}
            {!loading && posts.length === 0 && (
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center text-sm text-slate-500">No artworks yet. Check back soon.</CardContent>
              </Card>
            )}
            {!loading && posts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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
                          <span className="font-semibold cursor-pointer hover:underline" onClick={() => handleArtistClick(post.artist.id)}>
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
                        variant={post.artist.id && followedArtists.has(post.artist.id) ? "secondary" : "default"}
                        size="sm"
                        onClick={() => toggleFollow(post.artist.id)}
                        className={
                          post.artist.id && !followedArtists.has(post.artist.id)
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : ""
                        }
                      >
                        {post.artist.id && followedArtists.has(post.artist.id) ? "Following" : "Follow"}
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
                      <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400" disabled>
                        <MessageCircle className="w-5 h-5" />
                        <span className="ml-1">{post.comments}</span>
                      </Button>
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
                        <Button variant="outline" size="sm" className="bg-transparent" onClick={() => router.push(`/artwork/${post.id}`)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                          onClick={() => handleBuyNow(post.id, String(post.price))}
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
                        <div className="font-medium text-sm cursor-pointer hover:underline" onClick={() => handleArtistClick(i)}>
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
