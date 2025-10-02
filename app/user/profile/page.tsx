"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Eye, Bookmark, Settings, Edit, MapPin, Calendar, LinkIcon, User, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { ProfileCompletionCard } from "@/components/profile-completion-card"
import { useUserProfile, useUserStats, useAuth } from "@/hooks"
import { useWishlist } from "@/hooks/useWishlist"
import { useUserOrders } from "@/hooks/useUserOrders"
import { useFollowing } from "@/hooks/useFollowing"
import { getImageUrl } from "@/lib/utils"
import { UserMenu } from "@/components/user-menu"
import { UserSidebar } from "@/components/side-menu"

export default function UserProfile() {
  const { user } = useAuth()
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useUserProfile()
  const { stats, loading: statsLoading, refetch: refetchStats } = useUserStats()
  const { wishlist, loading: wishlistLoading } = useWishlist()
  const { orders, loading: ordersLoading } = useUserOrders()
  const { following, loading: followingLoading } = useFollowing()

  if (profileLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Failed to load profile</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const userStats = {
    following: stats?.stats.following_count || 0,
    followers: 0,
    likes: stats?.stats.likes_given || 0,
    saved: stats?.stats.saved_artworks || 0,
    orders: stats?.stats.orders_count || 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
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

      {/* Main Body */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
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

                  {stats?.profile_completion !== undefined && stats.profile_completion.percentage < 100 && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Complete your profile
                        </span>
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          {Math.round(stats.profile_completion.percentage)}%
                        </span>
                      </div>
                      <Progress value={stats.profile_completion.percentage} className="h-2" />
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

          {/* Tabs Section */}
          <Tabs defaultValue="following" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved">Saved Artworks</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6 text-center">
                    <p>No saved artworks yet.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="purchases">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6 text-center">
                    <p>No purchases yet.</p>
                  </CardContent>
                </Card>
              </div>
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
                        <Button variant="outline" size="sm" className="w-full">
                          Following
                        </Button>
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
  )
}
