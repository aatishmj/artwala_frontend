"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Star, Ruler, Weight, Palette, Shield, Truck, RotateCcw } from "lucide-react"

interface ProductDetailModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: any) => void
  onToggleWishlist: (product: any) => void
  isInWishlist: boolean
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductDetailModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      onAddToCart(product)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-stone-900">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-stone-50">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-stone-500 text-white">{product.badge}</Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={() => onToggleWishlist(product)}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} view ${i}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 5) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-600">({product.reviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-amber-700">
                  ${typeof product.price === "string" ? product.price.replace("$", "") : product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-stone-600">Free shipping on orders over $100</p>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-stone-600" />
                <span className="text-sm text-stone-700">{product.dimensions || '8" × 6" × 4"'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Weight className="w-4 h-4 text-stone-600" />
                <span className="text-sm text-stone-700">{product.weight || "1.2 lbs"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-stone-600" />
                <span className="text-sm text-stone-700">{product.color || "Natural"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-stone-600" />
                <span className="text-sm text-stone-700">{product.material || "Ceramic"}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-900">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="border-stone-200"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{selectedQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="border-stone-200"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - $
                {(typeof product.price === "string" ? Number.parseInt(product.price.replace("$", "")) : product.price) *
                  selectedQuantity}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-stone-300 text-stone-800 hover:bg-stone-50"
                onClick={() => onToggleWishlist(product)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Free Shipping</p>
                <p className="text-xs text-green-700">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Separator className="my-6" />

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Product Description</h3>
            <p className="text-stone-700 leading-relaxed">
              {product.description ||
                `This beautiful ${product.name.toLowerCase()} is handcrafted by our skilled artisans using traditional pottery techniques. Each piece is unique, featuring subtle variations that make it truly one-of-a-kind. The rich glazes and careful attention to detail ensure both beauty and functionality.`}
            </p>
            <p className="text-stone-700 leading-relaxed">
              Perfect for both decorative and functional use, this piece adds warmth and character to any space. The
              earthy tones and organic shapes reflect our commitment to creating pottery that connects you with nature
              and traditional craftsmanship.
            </p>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Dimensions</h4>
                <p className="text-stone-700">{product.dimensions || '8" L × 6" W × 4" H'}</p>
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Weight</h4>
                <p className="text-stone-700">{product.weight || "1.2 lbs"}</p>
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Material</h4>
                <p className="text-stone-700">{product.material || "High-fired ceramic"}</p>
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Finish</h4>
                <p className="text-stone-700">{product.finish || "Glazed"}</p>
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Color</h4>
                <p className="text-stone-700">{product.color || "Natural earth tones"}</p>
              </div>
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Origin</h4>
                <p className="text-stone-700">Handmade in our studio</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="care" className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Care Instructions</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">Hand wash with mild soap and warm water</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">Avoid sudden temperature changes</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">Not recommended for microwave or dishwasher use</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">Dry thoroughly after washing</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">Store in a safe place to prevent chipping</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Shipping Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Free Standard Shipping</p>
                  <p className="text-sm text-green-700">On orders over $100</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-stone-900">Delivery Times</h4>
                <p className="text-stone-700">• Standard Shipping: 3-5 business days</p>
                <p className="text-stone-700">• Express Shipping: 1-2 business days</p>
                <p className="text-stone-700">• International: 7-14 business days</p>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">30-Day Returns</p>
                  <p className="text-sm text-blue-700">Free returns on undamaged items</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
