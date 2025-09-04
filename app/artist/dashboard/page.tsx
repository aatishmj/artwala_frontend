"use client"

import React from "react"
import Link from "next/link"
import { 
  ArrowUpRight, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Eye, 
  Heart, 
  MessageSquare, 
  Palette, 
  Settings, 
  ShoppingBag, 
  TrendingUp, 
  Upload, 
  Users 
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { UploadArtworkModal } from "@/components/upload-artwork-modal"
import { useAuth, useUserProfile, useUserStats, useArtistRecommendations, useArtworks } from "@/hooks"
import { getImageUrl } from "@/lib/utils"

export default function ArtistDashboard() {
  const { user } = useAuth()
  const { profile, loading: profileLoading, error: profileError } = useUserProfile()
  const { stats, loading: statsLoading, error: statsError } = useUserStats()
  const { recommendations, loading: recommendationsLoading } = useArtistRecommendations()
  const { artworks, loading: artworksLoading, prependArtwork } = useArtworks({ limit: 6 })

  if (profileLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (profileError || statsError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Failed to load dashboard</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Add null check for stats
  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
      </div>
    )
  }

  // Mock recent activity data - to be replaced with real API
  const recentSales = [
    { id: 1, artwork: "Sunset Dreams", buyer: "Rahul K.", amount: "₹15,000", date: "2 days ago" },
    { id: 2, artwork: "Urban Rhythm", buyer: "Priya S.", amount: "₹8,500", date: "5 days ago" },
    { id: 3, artwork: "Digital Mandala", buyer: "Arjun P.", amount: "₹12,000", date: "1 week ago" },
  ]

  // Use real artworks (latest) from API
  const recentArtworks = artworks

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
            <Card className="sticky top-6 mb-6">
              <CardContent className="p-4">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src={getImageUrl(profile.profile_image)} />
                    <AvatarFallback>{profile.first_name?.[0]}{profile.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{profile.full_name || profile.username}</h3>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Profile Completion</span>
                                            <span>{stats.profile_completion.percentage || 0}%</span>
                    </div>
                                        <Progress value={stats.profile_completion.percentage || 0} className="h-2" />
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

            {/* Artist Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Artists</CardTitle>
                <CardDescription>Connect with popular artists</CardDescription>
              </CardHeader>
              <CardContent>
                {recommendationsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3 animate-pulse">
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="space-y-1 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recommendations?.trending_artists.slice(0, 4).map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between mb-3 last:mb-0">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={getImageUrl(artist.profile_image)} />
                        <AvatarFallback>{artist.full_name?.[0] || artist.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{artist.full_name || artist.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {artist.stats?.followers_count || 0} followers
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">No recommendations available</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.first_name || profile.username}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your art today.</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <UploadArtworkModal onUploaded={(art) => prependArtwork(art)}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Upload className="w-8 h-8 text-blue-500" />
                    <div className="font-medium">Upload Artwork</div>
                  </CardContent>
                </Card>
              </UploadArtworkModal>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="font-medium">Schedule Post</div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-green-500" />
                  <div className="font-medium">View Messages</div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-white to-pastel-cream dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Artworks</p>
                      <p className="text-2xl font-bold">{(stats.stats?.artworks_count || 0).toLocaleString()}</p>
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
                      <p className="text-2xl font-bold">{(stats.stats?.total_likes_received || 0).toLocaleString()}</p>
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
                      <p className="text-2xl font-bold">{(stats.stats?.followers_count || 0).toLocaleString()}</p>
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
                      <p className="text-2xl font-bold">₹{(stats.stats?.total_revenue || 0).toLocaleString()}</p>
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

            {/* Main Dashboard Content */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="artworks">Artworks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>Your latest artwork sales</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentSales.map((sale) => (
                          <div key={sale.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{sale.artwork}</p>
                              <p className="text-sm text-muted-foreground">Sold to {sale.buyer}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">{sale.amount}</p>
                              <p className="text-xs text-muted-foreground">{sale.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Artworks</CardTitle>
                      <CardDescription>Your best performing pieces</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {artworksLoading ? (
                          <p className="text-sm text-muted-foreground">Loading artworks...</p>
                        ) : recentArtworks.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No artworks yet. Upload your first!</p>
                        ) : recentArtworks.map((artwork: any) => (
                          <div key={artwork.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{artwork.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {/* Placeholder metrics until backend provides */}
                                {new Date(artwork.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge>{'Published'}</Badge>
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
                    <CardTitle>Sales Analytics</CardTitle>
                    <CardDescription>Detailed view of your sales performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            <div>
                              <h4 className="font-medium">{sale.artwork}</h4>
                              <p className="text-sm text-muted-foreground">Buyer: {sale.buyer}</p>
                              <p className="text-xs text-muted-foreground">{sale.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">{sale.amount}</p>
                            <Button variant="outline" size="sm">
                              View Details
                              <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
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
                    <CardTitle>Artwork Management</CardTitle>
                    <CardDescription>Manage your artwork portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {artworksLoading ? (
                        <p className="text-sm text-muted-foreground">Loading artworks...</p>
                      ) : recentArtworks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No artworks yet. Use Upload Artwork to add one.</p>
                      ) : recentArtworks.map((artwork: any) => (
                        <div key={artwork.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              {artwork.image && <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{artwork.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Added {new Date(artwork.created_at).toLocaleDateString()}
                              </p>
                              <Badge className="mt-1">Published</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View<ArrowUpRight className="w-4 h-4 ml-1" /></Button>
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
