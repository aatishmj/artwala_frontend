"use client"
import { UserSidebar } from "@/components/side-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, Home, Compass, User, ShoppingBag, Palette, Eye, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

interface Artist {
  id: number
  name?: string
  username: string
  avatar?: string
  verified?: boolean
  location?: string
  followers?: string
  artworks?: number
  first_name?: string
  last_name?: string
  profile_image?: string
  is_verified?: boolean
}

interface Artwork {
  id: number
  title: string
  description: string
  image: string
  price: string
  category: string
  likes?: number
  views?: number
  artist: Artist
  created_at: string
  imageHeightClass?: string
}

export default function UserFeed() {
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        const data = await apiClient.getArtworks()
        setArtworks(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load artworks')
        toast.error("Failed to load artworks")
      } finally {
        setLoading(false)
      }
    }
    fetchArtworks()
  }, [])

  const toggleWishlist = async (artworkId: number) => {
    try {
      const newWishlist = new Set(wishlistPosts)
      if (newWishlist.has(artworkId)) {
        await apiClient.removeFromWishlist(artworkId)
        newWishlist.delete(artworkId)
        toast.success("Removed from wishlist")
      } else {
        await apiClient.addToWishlist(artworkId)
        newWishlist.add(artworkId)
        toast.success("Added to wishlist")
      }
      setWishlistPosts(newWishlist)
    } catch (error) {
      console.error("Failed to update wishlist:", error)
      toast.error("Failed to update wishlist")
    }
  }

  const handleBuyNow = (artworkId: number, price: string) => {
    router.push(`/payment?artwork=${artworkId}&price=${price}`)
  }

  const handleViewDetails = (artworkId: number) => {
    router.push(`/artwork/${artworkId}`)
  }

  const handleArtistClick = (artistId: number) => {
    router.push(`/artist/${artistId}`)
  }

  const suggestedArtists: Artist[] = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_art",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      location: "Mumbai",
      followers: "2.3K",
      artworks: 45
    },
    {
      id: 2,
      name: "Arjun Patel",
      username: "@arjun_sculpts",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: false,
      location: "Delhi",
      followers: "1.8K",
      artworks: 32
    },
    {
      id: 3,
      name: "Maya Singh",
      username: "@maya_digital",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      location: "Bangalore",
      followers: "3.1K",
      artworks: 67
    }
  ]

  // Sample data if API fails
  const sampleArtworks: Artwork[] = [
    {
      id: 1,
      title: "Modern Art Collection",
      description: "Contemporary pieces that inspire creativity and innovation in modern art",
      image: "/placeholder.svg?height=400&width=400",
      price: "15,000",
      category: "Painting",
      likes: 234,
      views: 1200,
      artist: {
        id: 1,
        name: "Sarah Chen",
        username: "@sarahchen",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        location: "New York",
        followers: "5.2K",
        artworks: 89
      },
      created_at: "2024-01-15",
      imageHeightClass: "h-56"
    },
    {
      id: 2,
      title: "Nature Designs",
      description: "Organic patterns and natural beauty captured in stunning detail",
      image: "/placeholder.svg?height=400&width=400",
      price: "8,500",
      category: "Digital Art",
      likes: 156,
      views: 890,
      artist: {
        id: 2,
        name: "Emma Wilson",
        username: "@emmawilson",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        location: "London",
        followers: "3.7K",
        artworks: 45
      },
      created_at: "2024-01-14",
      imageHeightClass: "h-48"
    },
    {
      id: 3,
      title: "Architecture Series",
      description: "Modern architectural marvels and urban landscapes",
      image: "/placeholder.svg?height=400&width=400",
      price: "12,000",
      category: "Photography",
      likes: 89,
      views: 567,
      artist: {
        id: 3,
        name: "David Kim",
        username: "@davidkim",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        location: "Seoul",
        followers: "8.9K",
        artworks: 123
      },
      created_at: "2024-01-13",
      imageHeightClass: "h-64"
    },
    {
      id: 4,
      title: "Digital Dreams",
      description: "Exploring the future of digital art and virtual creativity",
      image: "/placeholder.svg?height=400&width=400",
      price: "9,500",
      category: "Digital Art",
      likes: 312,
      views: 1456,
      artist: {
        id: 4,
        name: "Priya Sharma",
        username: "@priya_art",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        location: "Mumbai",
        followers: "2.3K",
        artworks: 45
      },
      created_at: "2024-01-12",
      imageHeightClass: "h-40"
    },
    {
      id: 5,
      title: "Abstract Visions",
      description: "Bold colors and striking forms in abstract expressionism",
      image: "/placeholder.svg?height=400&width=400",
      price: "18,000",
      category: "Painting",
      likes: 178,
      views: 923,
      artist: {
        id: 5,
        name: "Rahul Singh",
        username: "@rahulsingh",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        location: "Delhi",
        followers: "1.4K",
        artworks: 23
      },
      created_at: "2024-01-11",
      imageHeightClass: "h-52"
    },
    {
      id: 6,
      title: "Coastal Serenity",
      description: "Capturing the calm and beauty of ocean landscapes",
      image: "/placeholder.svg?height=400&width=400",
      price: "7,200",
      category: "Painting",
      likes: 245,
      views: 1345,
      artist: {
        id: 6,
        name: "Jessica Lee",
        username: "@jessicalee",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        location: "Sydney",
        followers: "6.8K",
        artworks: 67
      },
      created_at: "2024-01-10",
      imageHeightClass: "h-48"
    }
  ]

  const displayArtworks = artworks.length > 0 ? artworks : sampleArtworks

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading artworks...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search artists, artworks..." className="pl-10 bg-white dark:bg-slate-700" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Main Navigation Card */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <Link
                      href="/user/feed"
                      className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Feed</span>
                    </Link>
                    <Link
                      href="/user/explore"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Compass className="w-5 h-5" />
                      <span>Explore</span>
                    </Link>
                    <Link
                      href="/user/wishlist"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/user/orders"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Orders</span>
                    </Link>
                    <Link
                      href="/user/profile"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              {/* Suggested Artists */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-4">
                  <h3 className="font-semibold">Suggested Artists</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {suggestedArtists.map((artist) => (
                    <div key={artist.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => handleArtistClick(artist.id)}
                        >
                          <AvatarImage src={artist.profile_image || artist.avatar} />
                          <AvatarFallback>{artist.name?.[0] || 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                           <div
                             className="font-medium text-sm cursor-pointer hover:underline"
                             onClick={() => handleArtistClick(artist.id)}
                           >
                             {`${artist.first_name || ''} ${artist.last_name || ''}`.trim() || artist.name || artist.username}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{artist.username}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Categories */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="p-4">
                  <h3 className="font-semibold">Trending Categories</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {["Paintings", "Digital Art", "Sculptures", "Photography", "Crafts"].map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-slate-100 dark:bg-slate-700 text-xs font-normal"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Artworks Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArtworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col group hover:shadow-lg transition-shadow"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      className={`w-full ${artwork.imageHeightClass} object-cover group-hover:scale-105 transition-transform duration-300`}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/50 text-white text-xs">
                        {artwork.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
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

                  {/* Content Section */}
                  <CardContent className="p-4 flex flex-col flex-grow">
                    {/* Title and Description */}
                    <div className="flex-grow mb-4">
                      <h3 className="font-bold text-lg mb-2">{artwork.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                        {artwork.description}
                      </p>
                      
                      {/* Artist Info */}
                      <div
                        className="flex items-center gap-2 cursor-pointer mb-3"
                        onClick={() => handleArtistClick(artwork.artist.id)}
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={artwork.artist.profile_image || artwork.artist.avatar} />
                          <AvatarFallback>{(artwork.artist.first_name || artwork.artist.name || artwork.artist.username || '')[0] || 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                           <span className="text-sm font-medium hover:underline">{`${artwork.artist.first_name || ''} ${artwork.artist.last_name || ''}`.trim() || artwork.artist.name || artwork.artist.username}</span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{artwork.artist.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(artwork.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ₹{artwork.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(artwork.id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(artwork.id, artwork.price)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Buy Now
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleWishlist(artwork.id)}
                          className={
                            wishlistPosts.has(artwork.id)
                              ? "text-red-500"
                              : "text-slate-400 hover:text-red-500"
                          }
                        >
                          <Heart className={`w-5 h-5 ${wishlistPosts.has(artwork.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}