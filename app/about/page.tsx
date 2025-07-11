"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Leaf, Award, Users } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { WishlistSidebar } from "@/components/wishlist-sidebar"
import { useState } from "react"

export default function AboutPage() {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (product) => {
    // Cart functionality
  }

  const updateQuantity = (id, quantity) => {
    // Update quantity functionality
  }

  const removeFromCart = (id) => {
    // Remove from cart functionality
  }

  const removeFromWishlist = (product) => {
    // Remove from wishlist functionality
  }

  const team = [
    {
      name: "Sarah Chen",
      role: "Master Potter & Founder",
      image: "/images/landscape-bowls.jpg",
      bio: "With over 15 years of experience, Sarah combines traditional techniques with modern aesthetics.",
    },
    {
      name: "Marcus Rivera",
      role: "Ceramic Artist",
      image: "/images/character-pot.jpg",
      bio: "Marcus specializes in glazing techniques and brings vibrant colors to our pottery collection.",
    },
    {
      name: "Elena Kowalski",
      role: "Design Director",
      image: "/images/elephant-plate.png",
      bio: "Elena ensures each piece meets our high standards of beauty and functionality.",
    },
  ]

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We use eco-friendly materials and sustainable practices in all our creations.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Supporting local artisans and building connections through our craft.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Every piece is meticulously crafted to meet the highest standards of excellence.",
    },
    {
      icon: Palette,
      title: "Artistry",
      description: "Blending traditional techniques with contemporary design for unique pieces.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200">
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
              <Link href="/collection" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                Collection
              </Link>
              <Link href="/about" className="text-amber-700 font-semibold">
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
      <section className="py-20 bg-gradient-to-r from-stone-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-stone-200 text-stone-800">Our Story</Badge>
              <h1 className="text-5xl font-bold text-stone-900">Crafting Beauty from Earth</h1>
              <p className="text-xl text-stone-700 leading-relaxed">
                Founded in 2009, Mud & Art began as a small studio with a big dream: to create pottery that brings joy
                and artistry to everyday life.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/pottery-studio.png"
                alt="Our pottery studio showcasing handcrafted pieces"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Our Mission</h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto">
              To preserve the ancient art of pottery while creating contemporary pieces that enhance modern living
              spaces. We believe that handcrafted pottery connects us to our heritage and brings warmth to our homes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 bg-white/80 border-0 shadow-lg">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-stone-500 to-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900">{value.title}</h3>
                  <p className="text-stone-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Our Process</h2>
            <p className="text-xl text-stone-700 max-w-2xl mx-auto">
              Every piece goes through a meticulous process that combines traditional techniques with modern innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-amber-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Shaping</h3>
              <p className="text-stone-700">
                Each piece begins on our potter's wheel, where skilled hands shape the clay into beautiful forms.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-amber-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Glazing</h3>
              <p className="text-stone-700">
                Our artisans apply carefully selected glazes that enhance both beauty and durability.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-amber-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Firing</h3>
              <p className="text-stone-700">
                The final firing in our kilns transforms clay into durable, beautiful pottery ready for your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Meet Our Artisans</h2>
            <p className="text-xl text-stone-700 max-w-2xl mx-auto">
              Our talented team of artisans brings decades of combined experience and passion to every piece.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/80 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-stone-900">{member.name}</h3>
                    <p className="text-amber-700 font-medium">{member.role}</p>
                    <p className="text-stone-700 text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-stone-600 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-stone-100">Years of Excellence</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-stone-100">Pieces Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">200+</div>
              <div className="text-stone-100">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-stone-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-stone-100 to-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Ready to Explore Our Collection?</h2>
          <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto">
            Discover the perfect piece for your home from our carefully curated collection of handcrafted pottery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white px-8"
            >
              <Link href="/collection">Browse Collection</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-stone-300 text-stone-800 hover:bg-stone-50">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
