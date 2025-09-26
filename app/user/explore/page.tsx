"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Eye, MapPin, TrendingUp, Heart } from 'lucide-react'

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All", count: 1234 },
    { id: "paintings", name: "Paintings", count: 456 },
    { id: "digital", name: "Digital Art", count: 234 },
    { id: "sculptures", name: "Sculptures", count: 123 },
    { id: "photography", name: "Photography", count: 345 },
    { id: "crafts", name: "Crafts", count: 76 },
  ]

  const trendingArtists = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_art",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "2.3K",
      artworks: 45,
      verified: true,
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Arjun Patel",
      username: "@arjun_sculpts",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "1.8K",
      artworks: 32,
      verified: false,
      location: "Delhi",
    },
    {
      id: 3,
      name: "Maya Singh",
      username: "@maya_digital",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "3.1K",
      artworks: 67,
      verified: true,
      location: "Bangalore",
    },
  ]

  const featuredArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "Priya Sharma",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹15,000",
      likes: 234,
      views: 1200,
      category: "Painting",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      artist: "Arjun Patel",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹8,500",
      likes: 156,
      views: 890,
      category: "Sculpture",
    },
    {
      id: 3,
      title: "Digital Mandala",
      artist: "Maya Singh",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹12,000",
      likes: 89,
      views: 567,
      category: "Digital Art",
    },
    {
      id: 4,
      title: "Morning Glory",
      artist: "Ravi Kumar",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹18,000",
      likes: 312,
      views: 1456,
      category: "Photography",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-2">Discover Amazing Art</h1>
                <p className="text-purple-100 mb-4">Explore thousands of artworks from talented artists across India</p>
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Exploring
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.count} artworks</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Artists */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Artists
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {trendingArtists.map((artist) => (
                    <Card key={artist.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-3">
                          <AvatarImage src={artist.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{artist.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className="font-semibold">{artist.name}</h3>
                          {artist.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{artist.username}</p>
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                          <MapPin className="w-3 h-3" />
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex justify-center gap-4 text-sm mb-3">
                          <div className="text-center">
                            <div className="font-medium">{artist.followers}</div>
                            <div className="text-muted-foreground">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{artist.artworks}</div>
                            <div className="text-muted-foreground">Artworks</div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Follow
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Artworks */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Artworks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArtworks.map((artwork) => (
                    <Card key={artwork.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            {artwork.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {artwork.views}
                          </div>
                          <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {artwork.likes}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{artwork.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {artwork.artist}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-600">{artwork.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                              Buy
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
    </div>
  )
}
