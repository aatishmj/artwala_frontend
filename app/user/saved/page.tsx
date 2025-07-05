"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Home, Compass, User, ShoppingBag, Palette, Eye, Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "Priya Sharma",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹15,000",
      savedDate: "2 days ago",
      category: "Painting",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      artist: "Arjun Patel",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹8,500",
      savedDate: "5 days ago",
      category: "Sculpture",
    },
    {
      id: 3,
      title: "Digital Mandala",
      artist: "Maya Singh",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹12,000",
      savedDate: "1 week ago",
      category: "Digital Art",
    },
  ])

  const removeSaved = (id: number) => {
    setSavedItems(savedItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search saved artworks..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/user/feed"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Home className="w-5 h-5" />
                    <span>Feed</span>
                  </Link>
                  <Link
                    href="/user/explore"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </Link>
                  <Link
                    href="/user/saved"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span className="font-medium">Saved</span>
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Saved Artworks</h1>
              <p className="text-muted-foreground">Your collection of saved artworks ({savedItems.length} items)</p>
            </div>

            {savedItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No saved artworks yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring and save artworks you love to see them here
                  </p>
                  <Button asChild>
                    <Link href="/user/explore">Explore Artworks</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-black/50 text-white hover:bg-black/70"
                          onClick={() => removeSaved(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {item.artist}</p>
                      <p className="text-xs text-muted-foreground mb-3">Saved {item.savedDate}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600">{item.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
