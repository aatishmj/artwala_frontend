"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { WishlistSidebar } from "@/components/wishlist-sidebar"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
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
              <Link href="/collection" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                Collection
              </Link>
              <Link href="/about" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-amber-700 font-semibold">
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
          <h1 className="text-5xl font-bold text-stone-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-stone-900 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-amber-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-stone-800">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        className="border-stone-200 focus:border-stone-400"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-stone-800">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        className="border-stone-200 focus:border-stone-400"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-800">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-stone-800">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-stone-800">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-stone-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-stone-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Visit Our Studio</h3>
                      <p className="text-stone-700">
                        123 Artisan Lane
                        <br />
                        Pottery District
                        <br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-stone-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Call Us</h3>
                      <p className="text-stone-700">
                        +1 (555) 123-4567
                        <br />
                        Mon-Fri: 9AM-6PM PST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-stone-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Email Us</h3>
                      <p className="text-stone-700">
                        hello@mudandart.com
                        <br />
                        orders@mudandart.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-stone-900 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-amber-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-800 font-medium">Monday - Friday</span>
                      <span className="text-stone-700">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-800 font-medium">Saturday</span>
                      <span className="text-stone-700">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-800 font-medium">Sunday</span>
                      <span className="text-stone-700">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-stone-900">Quick Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Do you offer custom pottery?</h4>
                    <p className="text-stone-700 text-sm">
                      Yes! We love creating custom pieces. Contact us to discuss your vision.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">What's your return policy?</h4>
                    <p className="text-stone-700 text-sm">
                      We offer 30-day returns for undamaged items in original packaging.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Do you ship internationally?</h4>
                    <p className="text-stone-700 text-sm">
                      Currently we ship within the US and Canada. International shipping coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-r from-stone-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Find Our Studio</h2>
            <p className="text-stone-700">
              Visit us in person to see our pottery process and browse our full collection.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="bg-gradient-to-br from-stone-200 to-amber-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center text-stone-800">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm">123 Artisan Lane, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
