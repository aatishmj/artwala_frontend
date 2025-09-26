"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Bookmark, Trash2 } from 'lucide-react'
import Link from 'next/link'

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
    <div className="p-4 md:p-6 space-y-6">
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
  )
}
