"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { Heart, ShoppingCart, Star, Filter, Search, Grid, List } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { WishlistSidebar } from "@/components/wishlist-sidebar"
import { ProductDetailModal } from "@/components/product-detail-modal"

export default function CollectionPage() {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ]
      }
    })
    // Remove this line: alert(`${product.name} added to cart!`)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id)
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id)
      if (isInWishlist) {
        return prev.filter((item) => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const removeFromWishlist = (product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id))
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const products = [
    {
      id: 1,
      name: "Landscape Dream Bowls",
      price: 89,
      originalPrice: 120,
      image: "/images/landscape-bowls.jpg",
      rating: 5,
      reviews: 24,
      badge: "Bestseller",
      category: "Bowls",
      size: "Medium",
      color: "Multi",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 2,
      name: "Turtle Garden Planter",
      price: 124,
      image: "/images/turtle-planter.jpg",
      rating: 5,
      reviews: 18,
      badge: "New",
      category: "Planters",
      size: "Large",
      color: "Green",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 3,
      name: "Elephant Heritage Plate",
      price: 156,
      image: "/images/elephant-plate.png",
      rating: 4,
      reviews: 32,
      badge: "Limited",
      category: "Plates",
      size: "Large",
      color: "Yellow",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 4,
      name: "Blue Floral Vase",
      price: 98,
      image: "/images/blue-vase.jpg",
      rating: 5,
      reviews: 41,
      badge: "Popular",
      category: "Vases",
      size: "Small",
      color: "Blue",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 5,
      name: "Character Art Pot",
      price: 142,
      image: "/images/character-pot.jpg",
      rating: 5,
      reviews: 15,
      badge: "Handpicked",
      category: "Pots",
      size: "Medium",
      color: "Blue",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 6,
      name: "Dancing Figures Relief",
      price: 189,
      image: "/images/dancing-figures.jpg",
      rating: 5,
      reviews: 8,
      badge: "Premium",
      category: "Art",
      size: "Large",
      color: "Terracotta",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 7,
      name: "Bunny Character Bowl",
      price: 76,
      originalPrice: 95,
      image: "/images/bunny-bowl.jpg",
      rating: 4,
      reviews: 28,
      badge: "Sale",
      category: "Bowls",
      size: "Medium",
      color: "Yellow",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 8,
      name: "Blueberry Pattern Bowl",
      price: 134,
      image: "/images/blueberry-bowl.jpg",
      rating: 5,
      reviews: 22,
      badge: "Classic",
      category: "Bowls",
      size: "Large",
      color: "Blue",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
    {
      id: 9,
      name: "Cow Heritage Plate",
      price: 165,
      image: "/images/cow-plate.png",
      rating: 5,
      reviews: 12,
      badge: "Traditional",
      category: "Plates",
      size: "Large",
      color: "Green",
      description: "Detailed product description...",
      dimensions: '8" × 6" × 4"',
      weight: "1.2 lbs",
      material: "Glazed ceramic",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-amber-900 bg-clip-text text-transparent">
                  Mud & Art
                </h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/collection" className="text-amber-700 font-semibold">
                Collection
              </Link>
              <Link href="/about" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <WishlistSidebar wishlistItems={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />
              <CartSidebar cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-stone-100 to-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">Our Collection</h1>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Discover our complete range of handcrafted pottery, each piece telling its own unique story
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-600 w-4 h-4" />
                <Input
                  placeholder="Search pottery..."
                  className="pl-10 w-64 border-stone-200 focus:border-stone-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select>
                <SelectTrigger className="w-40 border-stone-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="planters">Planters</SelectItem>
                  <SelectItem value="vases">Vases</SelectItem>
                  <SelectItem value="bowls">Bowls</SelectItem>
                  <SelectItem value="plates">Plates</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32 border-stone-200">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40 border-stone-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="border-stone-200">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-stone-700">Showing {products.length} products</p>
            <Button variant="outline" className="border-stone-200 text-stone-800">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-stone-500 text-white">{product.badge}</Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.some((item) => item.id === product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < product.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-stone-600 ml-1">({product.reviews})</span>
                    </div>

                    <h4 className="font-semibold text-stone-900 mb-1 text-sm">{product.name}</h4>
                    <p className="text-xs text-stone-600 mb-2">
                      {product.category} • {product.size}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-amber-700">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white text-xs px-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-stone-300 text-stone-800 hover:bg-stone-50">
              Load More Products
            </Button>
          </div>
        </div>
      </section>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? wishlist.some((item) => item.id === selectedProduct.id) : false}
      />
    </div>
    </ProtectedRoute>
  )
}
