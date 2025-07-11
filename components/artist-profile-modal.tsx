"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Calendar, Globe, Instagram, Twitter, MessageCircle, Heart, Eye } from "lucide-react"

interface ArtistProfileModalProps {
  artist: {
    id: number
    name: string
    username: string
    avatar: string
    verified: boolean
    bio?: string
    location?: string
    website?: string
    instagram?: string
    twitter?: string
    followers: number
    following: number
    artworks: number
    joinedDate: string
  }
  children: React.ReactNode
}

export function ArtistProfileModal({ artist, children }: ArtistProfileModalProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const artworks = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=200",
      title: "Sunset Dreams",
      likes: 234,
      views: 1200,
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=200",
      title: "Urban Rhythm",
      likes: 156,
      views: 890,
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=200",
      title: "Digital Mandala",
      likes: 89,
      views: 567,
    },
    {
      id: 4,
      image: "/placeholder.svg?height=200&width=200",
      title: "Morning Glory",
      likes: 312,
      views: 1456,
    },
    {
      id: 5,
      image: "/placeholder.svg?height=200&width=200",
      title: "Abstract Thoughts",
      likes: 198,
      views: 743,
    },
    {
      id: 6,
      image: "/placeholder.svg?height=200&width=200",
      title: "Nature's Call",
      likes: 445,
      views: 2134,
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={artist.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{artist.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{artist.name}</h2>
                  {artist.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{artist.username}</p>

                <div className="flex items-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.artworks}</div>
                    <div className="text-sm text-muted-foreground">Artworks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{artist.following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                    className={isFollowing ? "" : "bg-gradient-to-r from-purple-500 to-pink-500"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>

                {artist.bio && <p className="text-sm mb-4">{artist.bio}</p>}

                <div className="space-y-2 text-sm text-muted-foreground">
                  {artist.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {artist.joinedDate}</span>
                  </div>
                  {artist.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={artist.website} className="text-blue-500 hover:underline">
                        {artist.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {artist.instagram && (
                      <a href={artist.instagram} className="flex items-center gap-1 text-blue-500 hover:underline">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                    {artist.twitter && (
                      <a href={artist.twitter} className="flex items-center gap-1 text-blue-500 hover:underline">
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Artworks</h3>
            <div className="grid grid-cols-3 gap-2">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="relative group cursor-pointer">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {artwork.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {artwork.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
