"use client"

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { apiClient, tokenManager } from '@/lib/api'
import { useArtworks } from '@/hooks'
import { getImageUrl } from '@/lib/utils'
import { toast } from 'sonner'

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
    <div className="p-4 md:p-6 space-y-6">
      {error && <p className="text-sm text-red-600">{String(error)}</p>}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      )}
      {!loading && posts.length === 0 && (
        <div className="text-center text-sm text-slate-500">No artworks yet. Check back soon.</div>
      )}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map(p => (
            <div key={p.id} className="group relative border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 overflow-hidden">
              <div className="aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <img src={p.image || '/placeholder.svg'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 shadow ${wishlistPosts.has(p.id) ? 'text-red-500' : ''}`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlistPosts.has(p.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium line-clamp-2 min-h-[2.3rem]" title={p.title}>{p.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">₹{p.price}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => router.push(`/artwork/${p.id}`)}
                      className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                    >View</button>
                    <button
                      onClick={() => handleBuyNow(p.id, String(p.price))}
                      className="text-[11px] px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    >Buy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
