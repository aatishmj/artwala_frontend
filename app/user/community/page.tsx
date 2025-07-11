"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Home,
  Compass,
  User,
  ShoppingBag,
  Palette,
  MapPin,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Calendar,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CommunityPage() {
  const [activeCity, setActiveCity] = useState("mumbai")

  const cities = [
    { id: "mumbai", name: "Mumbai", members: 1234, events: 12 },
    { id: "delhi", name: "Delhi", members: 987, events: 8 },
    { id: "bangalore", name: "Bangalore", members: 756, events: 15 },
    { id: "pune", name: "Pune", members: 543, events: 6 },
    { id: "chennai", name: "Chennai", members: 432, events: 9 },
  ]

  const communityPosts = [
    {
      id: 1,
      author: "Priya Sharma",
      username: "@priya_art",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Just finished my latest painting! The sunset colors were absolutely magical today. Can't wait to share the final piece with everyone. 🎨✨",
      image: "/placeholder.svg?height=300&width=400",
      likes: 45,
      comments: 12,
      timeAgo: "2h",
      city: "Mumbai",
    },
    {
      id: 2,
      author: "Arjun Patel",
      username: "@arjun_sculpts",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Working on a new bronze sculpture inspired by urban architecture. The process is challenging but so rewarding!",
      likes: 32,
      comments: 8,
      timeAgo: "4h",
      city: "Mumbai",
    },
    {
      id: 3,
      author: "Maya Singh",
      username: "@maya_digital",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Digital art workshop this weekend at the community center! Who's joining? We'll be exploring new techniques in digital painting.",
      likes: 28,
      comments: 15,
      timeAgo: "6h",
      city: "Mumbai",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Art Exhibition - Contemporary Voices",
      date: "Dec 28, 2024",
      time: "6:00 PM",
      location: "Mumbai Art Gallery",
      attendees: 45,
    },
    {
      id: 2,
      title: "Digital Art Workshop",
      date: "Dec 30, 2024",
      time: "2:00 PM",
      location: "Community Center",
      attendees: 23,
    },
    {
      id: 3,
      title: "Artist Meetup & Coffee",
      date: "Jan 2, 2025",
      time: "4:00 PM",
      location: "Cafe Artisan",
      attendees: 18,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search community..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 mb-6">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/user/feed"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Home className="w-5 h-5" />
                    <span>Feed</span>
                  </Link>
                  <Link
                    href="/user/explore"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </Link>
                  <Link
                    href="/user/community"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Community</span>
                  </Link>
                  <Link
                    href="/user/saved"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Saved</span>
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            {/* City Chapters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  City Chapters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {cities.map((city) => (
                  <Button
                    key={city.id}
                    variant={activeCity === city.id ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setActiveCity(city.id)}
                  >
                    <span>{city.name}</span>
                    <Badge variant="secondary">{city.members}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share something with the community..."
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Camera className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <Plus className="w-4 h-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-sm text-muted-foreground">{post.username}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{post.city}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mb-3">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-64 object-cover rounded-lg mb-3"
                      />
                    )}

                    <div className="flex items-center gap-4 pt-2 border-t">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                      Join Event
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Members */}
            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>M{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Member {i}</div>
                      <div className="text-xs text-muted-foreground">Active now</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
