"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Edit, MapPin, Calendar, Instagram, Twitter, Globe, Save, Eye, Heart, Palette, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { useUserProfile, useUserStats, useAuth } from "@/hooks"
import { getImageUrl } from "@/lib/utils"

export default function ArtistProfile() {
  const { user } = useAuth()
  const { profile, loading: profileLoading, error: profileError, updateProfile } = useUserProfile()
  const { stats, loading: statsLoading } = useUserStats()

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

  const artistStats = {
    artworks: stats?.stats.artworks_count || 0,
    followers: stats?.stats.followers_count || 0,
    totalLikes: stats?.stats.total_likes_received || 0,
    totalRevenue: stats?.stats.total_revenue || 0,
  }

  const artworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹15,000",
      likes: 234,
      views: 1200,
      status: "Available",
    },
    {
      id: 2,
      title: "Urban Rhythm",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹8,500",
      likes: 156,
      views: 890,
      status: "Sold",
    },
    {
      id: 3,
      title: "Digital Mandala",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹12,000",
      likes: 89,
      views: 567,
      status: "Available",
    },
    {
      id: 4,
      title: "Morning Glory",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹18,000",
      likes: 312,
      views: 1456,
      status: "Available",
    },
    {
      id: 5,
      title: "Abstract Thoughts",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹9,500",
      likes: 198,
      views: 743,
      status: "Available",
    },
    {
      id: 6,
      title: "Nature's Call",
      image: "/placeholder.svg?height=300&width=300",
      price: "₹22,000",
      likes: 445,
      views: 2134,
      status: "Available",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-mint to-pastel-blue dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/artist/dashboard" className="flex items-center gap-2">
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
                Preview Public Profile
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={getImageUrl(profile.profile_image)} />
                  <AvatarFallback className="text-2xl">
                    {profile.first_name?.[0]}{profile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <EditProfileModal>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </EditProfileModal>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profile.full_name || profile.username}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                  </div>
                  {profile.is_verified && (
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-blue-600">Verified Artist</span>
                    </div>
                  )}
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
                    <span>Artist since {profile.artist_since ? new Date(profile.artist_since).getFullYear() : new Date(profile.date_joined).getFullYear()}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 max-w-2xl">
                  {profile.bio || "Contemporary artist specializing in oil paintings and digital art. Inspired by nature, urban landscapes, and human emotions."}
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

                <div className="flex items-center gap-4 mb-4">
                  {profile.instagram_handle && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://instagram.com/${profile.instagram_handle}`} target="_blank">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </Link>
                    </Button>
                  )}
                  {profile.twitter_handle && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://twitter.com/${profile.twitter_handle}`} target="_blank">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Link>
                    </Button>
                  )}
                  {profile.website && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={profile.website} target="_blank">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <Palette className="w-4 h-4" />
                      {artistStats.artworks}
                    </div>
                    <div className="text-sm text-muted-foreground">Artworks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {artistStats.followers}
                    </div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {artistStats.totalLikes}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ₹{artistStats.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                    <div className="text-sm text-muted-foreground">Artworks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="artworks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks">
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
                      <Badge variant={artwork.status === "Available" ? "default" : "secondary"}>{artwork.status}</Badge>
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
                    <h3 className="font-semibold mb-2">{artwork.title}</h3>
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

          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Priya Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="priya_art" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Contemporary artist specializing in oil paintings and digital art. Inspired by nature, urban landscapes, and human emotions. Featured in multiple exhibitions across India."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Mumbai, India" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://priyasharma.art" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" defaultValue="@priya_art_official" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" defaultValue="@priya_artist" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new followers and sales
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Control who can see your profile and artworks</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Payment Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your payment methods and payout preferences
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
