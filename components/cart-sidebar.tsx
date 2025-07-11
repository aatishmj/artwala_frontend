"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartSidebarProps {
  cartItems: CartItem[]
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
}

export function CartSidebar({ cartItems, updateQuantity, removeFromCart }: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-stone-700 hover:text-amber-800 relative">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-amber-600 text-white text-xs">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center text-stone-900">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shopping Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                <h3 className="text-lg font-semibold text-stone-900 mb-2">Your cart is empty</h3>
                <p className="text-stone-600 mb-4">Add some beautiful pottery to get started!</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-stone-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-900">{item.name}</h4>
                        <p className="text-sm text-stone-600">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 border-stone-200"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 border-stone-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-stone-900">Subtotal:</span>
                  <span className="text-lg font-bold text-amber-700">${subtotal.toFixed(2)}</span>
                </div>
                <Separator className="bg-stone-200" />
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                    onClick={() => {
                      setIsOpen(false)
                      window.location.href = "/checkout"
                    }}
                  >
                    Checkout - ${subtotal.toFixed(2)}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-stone-300 text-stone-800 hover:bg-stone-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
