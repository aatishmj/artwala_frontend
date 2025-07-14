"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, X } from "lucide-react"
import { fetchWishlist } from "@/lib/api"

interface WishlistItem {
  id?: number
  name: string
  price: string | number
  image: string
  rating?: number
  badge?: string
}

interface WishlistSidebarProps {
  removeFromWishlist: (item: WishlistItem) => void
  addToCart: (item: WishlistItem) => void
}

export function WishlistSidebar({ removeFromWishlist, addToCart }: WishlistSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    async function loadWishlist() {
      try {
        const data = await fetchWishlist()
        const mapped = data.map((item: any) => ({
          id: item.artwork.id,
          name: item.artwork.title,
          price: item.artwork.price,
          image: item.artwork.image,
        }))
        setWishlistItems(mapped)
      } catch (err) {
        console.error("Error loading wishlist:", err)
      }
    }

    if (isOpen) {
      loadWishlist()
    }
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-stone-700 hover:text-amber-800 relative">
          <Heart className="w-5 h-5" />
          {wishlistItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center text-stone-900">
            <Heart className="w-5 h-5 mr-2 fill-red-500 text-red-500" />
            Wishlist ({wishlistItems.length} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                <h3 className="text-lg font-semibold text-stone-900 mb-2">Your wishlist is empty</h3>
                <p className="text-stone-600 mb-4">Save your favorite pottery pieces here!</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                >
                  Browse Collection
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {wishlistItems.map((item, index) => (
                  <div key={item.id || index} className="flex items-center space-x-4 p-4 bg-stone-50 rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900">{item.name}</h4>
                      <p className="text-sm text-amber-700 font-semibold">
                        {typeof item.price === "string" ? item.price : `$${item.price}`}
                      </p>
                      {item.badge && <Badge className="mt-1 bg-stone-500 text-white text-xs">{item.badge}</Badge>}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromWishlist(item)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
