"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Bookmark, Edit, MapPin, Calendar, LinkIcon, Heart, ShoppingBag } from "lucide-react"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { ProfileCompletionCard } from "@/components/profile-completion-card"
import { useUserProfile, useUserStats } from "@/hooks"
import { getImageUrl } from "@/lib/utils"

export default function UserProfile() {
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useUserProfile()
  const { stats, loading: statsLoading, refetch: refetchStats } = useUserStats()

  if (profileLoading || statsLoading) return <div className="p-4 md:p-6 text-sm">Loading profile...</div>
  if (profileError || !profile) return <div className="p-4 md:p-6 text-sm text-red-600">Failed to load profile</div>

  const userStats = {
    following: stats?.stats.following_count || 0,
    likes: stats?.stats.likes_given || 0,
    saved: stats?.stats.saved_artworks || 0,
    orders: stats?.stats.orders_count || 0,
  }

  // Temporary placeholder data until wired to real endpoints
  const savedArtworks = [
    { id: 1, title: "Morning Glory", artist: "Ravi Kumar", image: "/placeholder.svg?height=200&width=200", price: "₹12,000" },
    { id: 2, title: "Abstract Thoughts", artist: "Neha Gupta", image: "/placeholder.svg?height=200&width=200", price: "₹9,500" },
    { id: 3, title: "Nature's Call", artist: "Amit Singh", image: "/placeholder.svg?height=200&width=200", price: "₹22,000" },
  ]

  const purchaseHistory = [
    { id: 1, artwork: "Morning Glory", artist: "Ravi Kumar", amount: "₹18,000", date: "Dec 15, 2024", status: "Delivered" },
    { id: 2, artwork: "Abstract Thoughts", artist: "Neha Gupta", amount: "₹9,500", date: "Nov 28, 2024", status: "Delivered" },
    { id: 3, artwork: "Nature's Call", artist: "Amit Singh", amount: "₹22,000", date: "Nov 10, 2024", status: "Delivered" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={getImageUrl(profile.profile_image)} />
              <AvatarFallback className="text-2xl">
                {profile.first_name?.[0]}{profile.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h1 className="text-3xl font-bold">{profile.full_name || profile.username}</h1>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {profile.user_type === 'artist' ? 'Artist' : 'Art Lover'}
                </Badge>
                <EditProfileModal onProfileUpdate={() => { refetchProfile(); refetchStats(); }}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </EditProfileModal>
              </div>
              <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground flex-wrap">
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
              <div className="flex gap-6 flex-wrap">
                <div className="text-center">
                  <div className="font-bold text-xl">{userStats.following}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl flex items-center gap-1"><Heart className="w-4 h-4" />{userStats.likes}</div>
                  <div className="text-sm text-muted-foreground">Likes Given</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl flex items-center gap-1"><Bookmark className="w-4 h-4" />{userStats.saved}</div>
                  <div className="text-sm text-muted-foreground">Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl flex items-center gap-1"><ShoppingBag className="w-4 h-4" />{userStats.orders}</div>
                  <div className="text-sm text-muted-foreground">Orders</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs / main content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved">Saved Artworks</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArtworks.map(art => (
                  <Card key={art.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={art.image} alt={art.title} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="absolute top-2 right-2">
                        <Button variant="secondary" size="sm" className="bg-black/50 text-white hover:bg-black/70">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{art.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {art.artist}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600 dark:text-green-400">{art.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Buy</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="purchases">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader><CardTitle>Purchase History</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchaseHistory.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div>
                          <h4 className="font-medium">{p.artwork}</h4>
                          <p className="text-sm text-muted-foreground">by {p.artist}</p>
                          <p className="text-sm text-muted-foreground">{p.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{p.amount}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">{p.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="following">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback>A{i}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold mb-1">Artist Name {i}</h3>
                      <p className="text-sm text-muted-foreground mb-3">@artist{i}</p>
                      <div className="flex items-center justify-center gap-4 text-sm mb-4">
                        <div className="text-center"><div className="font-medium">234</div><div className="text-muted-foreground">Artworks</div></div>
                        <div className="text-center"><div className="font-medium">1.2K</div><div className="text-muted-foreground">Followers</div></div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">Following</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar supplemental card */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileCompletionCard />
        </div>
      </div>
    </div>
  )
}
