"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



import { UserMenu } from "@/components/user-menu"

import { useAuth } from "@/hooks/useAuth"



import { Progress } from "@/components/ui/progress"
import { Eye, Bookmark, Settings, Edit, MapPin, Calendar, LinkIcon, User, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { useUserProfile, useUserStats, useAuth } from "@/hooks"
import { getImageUrl } from "@/lib/utils"

export default function UserProfile() {
  const { user } = useAuth()
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useUserProfile()
  const { stats, loading: statsLoading, refetch: refetchStats } = useUserStats()

  if (profileLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Failed to load profile</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }


  const userStats = {
    following: stats?.stats.following_count || 0,
    followers: 0, // Users don't have followers in our model
    likes: stats?.stats.likes_given || 0,
    saved: stats?.stats.saved_artworks || 0,
    orders: stats?.stats.orders_count || 0,
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
    <div key={`profile-${profile.id}-${profile.profile_image}`} className="min-h-screen bg-gradient-to-br from-pastel-rose to-pastel-sage dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/user/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={getImageUrl(profile.profile_image)} />
                <AvatarFallback className="text-2xl">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold">{profile.full_name || profile.username}</h1>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {profile.user_type === 'artist' ? 'Artist' : 'Art Lover'}
                  </Badge>
                  <EditProfileModal onProfileUpdate={() => {
                    refetchProfile()
                    refetchStats()
                  }}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </EditProfileModal>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.date_joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  {profile.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span>{profile.website}</span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 max-w-2xl">
                  {profile.bio || "Art enthusiast and collector passionate about supporting emerging artists."}
                </p>

                {/* Profile Completion */}
                {stats?.profile_completion !== undefined && stats.profile_completion < 100 && (
                  <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Complete your profile
                      </span>
                      <span className="text-sm text-amber-600 dark:text-amber-400">
                        {Math.round(stats.profile_completion)}%
                      </span>
                    </div>
                    <Progress value={stats.profile_completion} className="h-2" />
                  </div>
                )}

                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="font-bold text-xl">{userStats.following}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {userStats.likes}
                    </div>
                    <div className="text-sm text-muted-foreground">Likes Given</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      {userStats.saved}
                    </div>
                    <div className="text-sm text-muted-foreground">Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      {userStats.orders}
                    </div>
                    <div className="text-sm text-muted-foreground">Orders</div>
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
                <Card
                  key={artwork.id}
                  className="group hover:shadow-lg transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">by {artwork.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600 dark:text-green-400">{artwork.price}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
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
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{purchase.artwork}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">by {purchase.artist}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{purchase.amount}</p>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        >
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
                <Card
                  key={i}
                  className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                      <AvatarFallback>A{i}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Artist Name {i}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">@artist{i}</p>
                    <div className="flex items-center justify-center gap-4 text-sm mb-4">
                      <div className="text-center">
                        <div className="font-medium">234</div>
                        <div className="text-slate-600 dark:text-slate-400">Artworks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">1.2K</div>
                        <div className="text-slate-600 dark:text-slate-400">Followers</div>
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
