"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Bookmark, Settings, Edit, MapPin, Calendar, LinkIcon } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function UserProfile() {
  const userStats = {
    following: 234,
    followers: 156,
    likes: 1240,
    saved: 89,
  }

  const savedArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "Priya Sharma",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹15,000",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      artist: "Arjun Patel",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹8,500",
    },
    {
      id: 3,
      title: "Digital Mandala",
      artist: "Maya Singh",
      image: "/placeholder.svg?height=200&width=200",
      price: "₹12,000",
    },
  ]

  const purchaseHistory = [
    {
      id: 1,
      artwork: "Morning Glory",
      artist: "Ravi Kumar",
      amount: "₹18,000",
      date: "Dec 15, 2024",
      status: "Delivered",
    },
    {
      id: 2,
      artwork: "Abstract Thoughts",
      artist: "Neha Gupta",
      amount: "₹9,500",
      date: "Nov 28, 2024",
      status: "Delivered",
    },
    {
      id: 3,
      artwork: "Nature's Call",
      artist: "Amit Singh",
      amount: "₹22,000",
      date: "Nov 10, 2024",
      status: "Delivered",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-rose to-pastel-sage dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/user/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="text-2xl">RK</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold">Rahul Kumar</h1>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, India</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined December 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <span>rahul.portfolio.com</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 max-w-2xl">
                  Art enthusiast and collector passionate about supporting emerging artists. Love contemporary paintings
                  and digital art. Always looking for unique pieces that tell a story.
                </p>

                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="font-bold text-xl">{userStats.following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{userStats.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{userStats.likes}</div>
                    <div className="text-sm text-muted-foreground">Likes Given</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{userStats.saved}</div>
                    <div className="text-sm text-muted-foreground">Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="saved">Saved Artworks</TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArtworks.map((artwork) => (
                <Card key={artwork.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Button variant="secondary" size="sm" className="bg-black/50 text-white hover:bg-black/70">
                        <Bookmark className="w-4 h-4 fill-current" />
                      </Button>
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
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                          Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{purchase.artwork}</h4>
                        <p className="text-sm text-muted-foreground">by {purchase.artist}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{purchase.amount}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                      <AvatarFallback>A{i}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Artist Name {i}</h3>
                    <p className="text-sm text-muted-foreground mb-3">@artist{i}</p>
                    <div className="flex items-center justify-center gap-4 text-sm mb-4">
                      <div className="text-center">
                        <div className="font-medium">234</div>
                        <div className="text-muted-foreground">Artworks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">1.2K</div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Following
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
