"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  BarChart3,
  ShoppingBag,
  Heart,
  Eye,
  Settings,
  Palette,
  MessageSquare,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ArtistArtworksPage() {
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Sunset Dreams",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹15,000",
      likes: 234,
      views: 1200,
      status: "Published",
      category: "Painting",
      createdDate: "Dec 15, 2024",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹8,500",
      likes: 156,
      views: 890,
      status: "Draft",
      category: "Sculpture",
      createdDate: "Dec 12, 2024",
    },
    {
      id: 3,
      title: "Digital Mandala",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹12,000",
      likes: 89,
      views: 567,
      status: "Published",
      category: "Digital Art",
      createdDate: "Dec 10, 2024",
    },
    {
      id: 4,
      title: "Morning Glory",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹18,000",
      likes: 312,
      views: 1456,
      status: "Published",
      category: "Photography",
      createdDate: "Dec 8, 2024",
    },
  ])

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
              <Badge variant="secondary" className="ml-2">
                Artist
              </Badge>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">Priya Sharma</h3>
                  <p className="text-sm text-muted-foreground">@priya_art</p>
                </div>

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/dashboard">
                      <BarChart3 className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="default" className="w-full justify-start" asChild>
                    <Link href="/artist/artworks">
                      <Palette className="w-4 h-4 mr-3" />
                      My Artworks
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/orders">
                      <ShoppingBag className="w-4 h-4 mr-3" />
                      Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/messages">
                      <MessageSquare className="w-4 h-4 mr-3" />
                      Messages
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/profile">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Artworks</h1>
                <p className="text-muted-foreground">Manage and showcase your creative works</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Upload Artwork
              </Button>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search artworks..." className="pl-10" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artworks */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All ({artworks.length})</TabsTrigger>
                <TabsTrigger value="published">
                  Published ({artworks.filter((a) => a.status === "Published").length})
                </TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({artworks.filter((a) => a.status === "Draft").length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork) => (
                      <Card key={artwork.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="relative">
                          <img
                            src={artwork.image || "/placeholder.svg"}
                            alt={artwork.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant={artwork.status === "Published" ? "default" : "secondary"}>
                              {artwork.status}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 left-2 flex gap-2">
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
                          <p className="text-sm text-muted-foreground mb-2">{artwork.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">{artwork.price}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {artworks.map((artwork) => (
                      <Card key={artwork.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={artwork.image || "/placeholder.svg"}
                              alt={artwork.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg">{artwork.title}</h3>
                                <Badge variant={artwork.status === "Published" ? "default" : "secondary"}>
                                  {artwork.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-2">
                                <span>{artwork.category}</span>
                                <span>Created {artwork.createdDate}</span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {artwork.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {artwork.likes}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-green-600">{artwork.price}</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="published">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks
                    .filter((artwork) => artwork.status === "Published")
                    .map((artwork) => (
                      <Card key={artwork.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="relative">
                          <img
                            src={artwork.image || "/placeholder.svg"}
                            alt={artwork.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute bottom-2 left-2 flex gap-2">
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
                          <p className="text-sm text-muted-foreground mb-2">{artwork.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">{artwork.price}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks
                    .filter((artwork) => artwork.status === "Draft")
                    .map((artwork) => (
                      <Card key={artwork.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="relative">
                          <img
                            src={artwork.image || "/placeholder.svg"}
                            alt={artwork.title}
                            className="w-full h-48 object-cover opacity-75"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">Draft</Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{artwork.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{artwork.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">{artwork.price}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                                Publish
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
