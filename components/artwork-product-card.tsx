"use client"

import { Artwork, apiClient, tokenManager } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { getImageUrl } from '@/lib/utils'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface Props {
  artwork: Artwork
  onWishlistToggle?: (id: number, wished: boolean) => void
  onBuy?: (id: number, price: string) => void
}

export function ArtworkProductCard({ artwork, onWishlistToggle, onBuy }: Props) {
  const [wished, setWished] = useState(false)
  const [buying, setBuying] = useState(false)
  const router = useRouter()

  const handleWishlist = async () => {
    const authed = !!tokenManager.getAccessToken()
    if (!authed) { router.push('/auth/login'); return }
    try {
      if (wished) {
        await apiClient.removeFromWishlist(artwork.id)
        setWished(false)
        toast.success('Removed')
        onWishlistToggle?.(artwork.id, false)
      } else {
        await apiClient.addToWishlist(artwork.id)
        setWished(true)
        toast.success('Saved')
        onWishlistToggle?.(artwork.id, true)
      }
    } catch (e: any) {
      toast.error(e?.message || 'Wishlist failed')
    }
  }

  const handleView = () => {
    router.push(`/artwork/${artwork.id}`)
  }

  const handleBuy = async () => {
    const authed = !!tokenManager.getAccessToken()
    if (!authed) { router.push('/auth/login'); return }
    try {
      setBuying(true)
      await apiClient.createOrder(artwork.id, 1)
      onBuy?.(artwork.id, String(artwork.price))
      router.push(`/payment?artwork=${artwork.id}&price=${artwork.price}`)
    } catch (e: any) {
      toast.error(e?.message || 'Order failed')
    } finally {
      setBuying(false)
    }
  }

  return (
    <Card className="group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden">
        {artwork.image && (
          <img
            src={getImageUrl(artwork.image)}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <button
          aria-label="Wishlist"
          onClick={handleWishlist}
          className={cn('absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 shadow hover:scale-105 transition', wished && 'text-red-500')}
        >
          <Heart className={cn('w-4 h-4', wished && 'fill-current')} />
        </button>
      </div>
      <div className="p-3 space-y-2">
        <h3 title={artwork.title} className="text-sm font-medium line-clamp-2 leading-snug min-h-[2.5rem]">
          {artwork.title}
        </h3>
        {artwork.price && <div className="text-base font-semibold text-green-600 dark:text-green-400">₹{artwork.price}</div>}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleView}
            aria-label="View"
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            <Eye className="w-3 h-3" /> View
          </button>
          <button
            disabled={buying}
            onClick={handleBuy}
            aria-label="Buy"
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
          >
            <ShoppingCart className="w-3 h-3" /> {buying ? '...' : 'Buy'}
          </button>
        </div>
      </div>
    </Card>
  )
}
