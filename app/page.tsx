"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Leaf, Palette, Award, LogIn, UserPlus } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { WishlistSidebar } from "@/components/wishlist-sidebar"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"
import { UserMenu } from "@/components/user-menu"
import { AuthProvider, useAuth } from "@/components/auth-context"

function HomePageContent() {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const { user } = useAuth()

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name)
      if (existingItem) {
        return prev.map((item) => (item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prev,
          {
            id: Date.now(),
            name: product.name,
            price: Number.parseInt(product.price.replace("$", "")),
            image: product.image,
            quantity: 1,
          },
        ]
      }
    })
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

  const removeFromWishlist = (product) => {
    setWishlist((prev) => prev.filter((item) => item.name !== product.name))
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.name === product.name)
      if (isInWishlist) {
        return prev.filter((item) => item.name !== product.name)
      } else {
        return [...prev, product]
      }
    })
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const featuredProducts = [
    {
      name: "Landscape Dream Bowls",
      price: "$89",
      image: "/images/landscape-bowls.jpg",
      rating: 5,
      badge: "Bestseller",
      reviews: 24,
      dimensions: '6" × 6" × 3"',
      weight: "0.8 lbs",
      color: "Multi-colored",
      material: "Glazed ceramic",
      description:
        "These stunning landscape bowls feature hand-painted scenic designs that bring the beauty of nature to your table. Each bowl showcases rolling hills, serene skies, and delicate details that make every meal a visual feast.",
    },
    {
      name: "Turtle Garden Planter",
      price: "$124",
      image: "/images/turtle-planter.jpg",
      rating: 5,
      badge: "New",
      reviews: 18,
      dimensions: '8" × 6" × 5"',
      weight: "2.1 lbs",
      color: "Green & Brown",
      material: "Terracotta ceramic",
      description:
        "A charming turtle-shaped planter perfect for succulents and small plants. The whimsical design adds personality to any garden or indoor space while providing excellent drainage for healthy plant growth.",
    },
    {
      name: "Elephant Heritage Plate",
      price: "$156",
      image: "/images/elephant-plate.png",
      rating: 4,
      badge: "Limited",
      reviews: 32,
      dimensions: '10" × 10" × 1"',
      weight: "1.5 lbs",
      color: "Golden Yellow",
      material: "Fine bone china",
      description:
        "An exquisite decorative plate featuring traditional elephant motifs in rich golden hues. This piece celebrates cultural heritage while serving as a stunning centerpiece for any collection.",
    },
    {
      name: "Blue Floral Vase",
      price: "$98",
      image: "/images/blue-vase.jpg",
      rating: 5,
      badge: "Popular",
      reviews: 41,
      dimensions: '4" × 4" × 8"',
      weight: "1.3 lbs",
      color: "Cobalt Blue",
      material: "Glazed stoneware",
      description:
        "A graceful vase adorned with delicate blue floral patterns. Perfect for displaying fresh flowers or as a standalone decorative piece that adds elegance to any room.",
    },
    {
      name: "Character Art Pot",
      price: "$142",
      image: "/images/character-pot.jpg",
      rating: 5,
      badge: "Handpicked",
      reviews: 15,
      dimensions: '7" × 7" × 6"',
      weight: "1.8 lbs",
      color: "Blue & White",
      material: "Hand-painted ceramic",
      description:
        "A unique artistic pot featuring whimsical character designs. Each piece tells a story through its intricate hand-painted details, making it a conversation starter in any space.",
    },
    {
      name: "Blueberry Pattern Bowl",
      price: "$189",
      image: "/images/blueberry-bowl.jpg",
      rating: 5,
      badge: "Premium",
      reviews: 28,
      dimensions: '8" × 8" × 4"',
      weight: "1.6 lbs",
      color: "Blue & White",
      material: "Premium porcelain",
      description:
        "An elegant bowl featuring a delicate blueberry pattern in classic blue and white. Perfect for serving or display, this piece combines functionality with timeless beauty.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-amber-800 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-amber-900 bg-clip-text text-transparent">
                  Mud & Art
                </h1>
                <p className="text-xs text-stone-600">Handcrafted Pottery</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/collection" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
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
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoginOpen(true)}
                    className="text-stone-700 hover:text-amber-800"
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </div>
              )}
              <WishlistSidebar wishlistItems={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />
              <CartSidebar cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100/50 to-amber-100/50" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-stone-100 text-stone-800 hover:bg-stone-200">
                  <Leaf className="w-3 h-3 mr-1" />
                  Handcrafted with Love
                </Badge>
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-stone-900 via-amber-800 to-yellow-800 bg-clip-text text-transparent">
                    Artisan
                  </span>
                  <br />
                  <span className="text-stone-900">Pottery</span>
                  <br />
                  <span className="text-amber-800">Collection</span>
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed max-w-md">
                  Discover unique, handcrafted ceramic pots that blend traditional techniques with contemporary design.
                  Each piece tells a story of artistry and passion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/collection">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white px-8"
                  >
                    Browse Collection
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-stone-300 text-stone-800 hover:bg-stone-50">
                    Get in Touch
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-stone-800">500+</div>
                  <div className="text-sm text-stone-600">Pieces Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-stone-800">15+</div>
                  <div className="text-sm text-stone-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-stone-800">98%</div>
                  <div className="text-sm text-stone-600">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200/30 to-amber-300/30 rounded-3xl transform rotate-3" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/pottery-studio.png"
                  alt="Beautiful handcrafted pottery collection at Mud & Art studio"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-stone-500 to-amber-600 text-white p-3 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-4">Featured Collection</Badge>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">Signature Pieces</h3>
            <p className="text-stone-700 max-w-2xl mx-auto">
              Each pot is meticulously crafted using traditional techniques passed down through generations, combined
              with modern artistic vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={index}
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
                        className={`w-4 h-4 ${wishlist.some((item) => item.name === product.name) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-stone-600 ml-2">({product.rating}.0)</span>
                    </div>

                    <h4 className="font-semibold text-stone-900 mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-700">{product.price}</span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-stone-300 text-stone-800 hover:bg-stone-50">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-stone-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-stone-200 text-stone-800">Our Story</Badge>
              <h3 className="text-4xl font-bold text-stone-900">Crafting Beauty from Earth</h3>
              <p className="text-stone-700 leading-relaxed">
                At Mud & Art, we believe that pottery is more than just functional art—it's a connection to our earth
                and heritage. Our artisans combine time-honored techniques with contemporary aesthetics to create pieces
                that are both beautiful and meaningful.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Every pot begins its journey on our potter's wheel, shaped by skilled hands and fired in our kilns with
                care. The result is a collection of unique pieces that bring warmth and character to any space.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-stone-900">Eco-Friendly</div>
                  <div className="text-sm text-stone-600">Natural materials</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-stone-900">Handcrafted</div>
                  <div className="text-sm text-stone-600">Unique designs</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/images/dancing-figures.jpg"
                  alt="Traditional pottery art with dancing figures"
                  width={200}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
                <Image
                  src="/images/cow-plate.png"
                  alt="Hand-painted decorative plate with cow design"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-red-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-stone-400 to-amber-500 rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Mud & Art</h4>
                  <p className="text-xs text-stone-300">Handcrafted Pottery</p>
                </div>
              </div>
              <p className="text-stone-200 text-sm">
                Creating beautiful, functional pottery that brings joy and artistry to everyday life.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Shop</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/collection" className="text-stone-200 hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-stone-200 hover:text-white transition-colors">
                    Planters
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-stone-200 hover:text-white transition-colors">
                    Vases
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-stone-200 hover:text-white transition-colors">
                    Bowls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">About</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-stone-200 hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-stone-200 hover:text-white transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-stone-200 hover:text-white transition-colors">
                    Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-stone-200 hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Connect</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-stone-200 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-stone-200 hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-stone-200 hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-stone-200 hover:text-white transition-colors">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-8 pt-8 text-center">
            <p className="text-stone-300 text-sm">© 2024 Mud & Art. All rights reserved. Crafted with love and clay.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? wishlist.some((item) => item.name === selectedProduct.name) : false}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false)
          setIsSignupOpen(true)
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  )
}
