"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Users, Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CommunityPage() {
  const cityChapters = [
    { name: "Mumbai", members: 1234, events: 12, active: true },
    { name: "Delhi", members: 987, events: 8, active: true },
    { name: "Bangalore", members: 756, events: 15, active: true },
    { name: "Pune", members: 543, events: 6, active: true },
    { name: "Chennai", members: 432, events: 9, active: true },
    { name: "Hyderabad", members: 321, events: 4, active: false },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Art Workshop",
      date: "Dec 28, 2024",
      time: "2:00 PM",
      location: "Mumbai Art Center",
      city: "Mumbai",
      attendees: 45,
    },
    {
      id: 2,
      title: "Artist Networking Meetup",
      date: "Dec 30, 2024",
      time: "6:00 PM",
      location: "Delhi Art Gallery",
      city: "Delhi",
      attendees: 32,
    },
    {
      id: 3,
      title: "Contemporary Art Exhibition",
      date: "Jan 5, 2025",
      time: "4:00 PM",
      location: "Bangalore Museum",
      city: "Bangalore",
      attendees: 78,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ARTWALA Community
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Creative Community</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with artists, attend events, and be part of a vibrant creative ecosystem across India
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500" asChild>
                <Link href="/auth/signup">
                  Join Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* City Chapters */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">City Chapters</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityChapters.map((city) => (
                <Card key={city.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        {city.name}
                      </h3>
                      <Badge variant={city.active ? "default" : "secondary"}>
                        {city.active ? "Active" : "Coming Soon"}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{city.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{city.events} events this month</span>
                      </div>
                    </div>
                    {city.active && (
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Join {city.name} Chapter
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {event.location}, {event.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </div>
                      <Button>Join Event</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Why Join Our Community?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Network</h3>
                  <p className="text-sm text-muted-foreground">Connect with fellow artists and art enthusiasts</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Events</h3>
                  <p className="text-sm text-muted-foreground">Attend workshops, exhibitions, and meetups</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Learn</h3>
                  <p className="text-sm text-muted-foreground">Access resources and mentorship opportunities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Grow</h3>
                  <p className="text-sm text-muted-foreground">Expand your reach and grow your artistic career</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
