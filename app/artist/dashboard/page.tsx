"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  Heart,
  Eye,
  Settings,
  Palette,
  Upload,
  MessageSquare,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalViews: 12543,
    totalLikes: 2341,
    totalFollowers: 856,
    totalSales: 23,
    monthlyRevenue: 45600,
    profileCompletion: 85,
  }

  const recentSales = [
    { id: 1, artwork: "Sunset Dreams", buyer: "Rahul K.", amount: "₹15,000", date: "2 days ago" },
    { id: 2, artwork: "Urban Rhythm", buyer: "Priya S.", amount: "₹8,500", date: "5 days ago" },
    { id: 3, artwork: "Digital Mandala", buyer: "Arjun P.", amount: "₹12,000", date: "1 week ago" },
  ]

  const recentArtworks = [
    { id: 1, title: "Morning Glory", views: 234, likes: 45, status: "Published" },
    { id: 2, title: "Abstract Thoughts", views: 156, likes: 32, status: "Draft" },
    { id: 3, title: "Nature's Call", views: 89, likes: 18, status: "Published" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach to-pastel-mint dark:bg-gray-900">
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
              <UserMenu />
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
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Profile Completion</span>
                      <span>{stats.profileCompletion}%</span>
                    </div>
                    <Progress value={stats.profileCompletion} className="h-2" />
                  </div>
                </div>

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/dashboard">
                      <BarChart3 className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Priya!</h1>
              <p className="text-muted-foreground">Here's what's happening with your art today.</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Button className="h-auto p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transform hover:scale-105 transition-all">
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Upload Artwork</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 bg-transparent">
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Schedule Post</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 bg-transparent">
                <div className="text-center">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">View Messages</div>
                </div>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Likes</p>
                      <p className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+15%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+23%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Recent Sales</TabsTrigger>
                <TabsTrigger value="artworks">My Artworks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Profile Views</span>
                          <span className="font-medium">2,341</span>
                        </div>
                        <Progress value={75} />

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Artwork Likes</span>
                          <span className="font-medium">1,856</span>
                        </div>
                        <Progress value={60} />

                        <div className="flex justify-between items-center">
                          <span className="text-sm">New Followers</span>
                          <span className="font-medium">124</span>
                        </div>
                        <Progress value={45} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Artworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <img
                              src={`/placeholder.svg?height=50&width=50`}
                              alt={`Artwork ${i}`}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">Artwork Title {i}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {234 * i}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {45 * i}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sales">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>Your latest artwork sales and commissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{sale.artwork}</p>
                            <p className="text-sm text-muted-foreground">Sold to {sale.buyer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{sale.amount}</p>
                            <p className="text-sm text-muted-foreground">{sale.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="artworks">
                <Card>
                  <CardHeader>
                    <CardTitle>My Artworks</CardTitle>
                    <CardDescription>Manage your uploaded artworks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentArtworks.map((artwork) => (
                        <div key={artwork.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                              src={`/placeholder.svg?height=60&width=60`}
                              alt={artwork.title}
                              className="w-15 h-15 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{artwork.title}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {artwork.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {artwork.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={artwork.status === "Published" ? "default" : "secondary"}>
                              {artwork.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
