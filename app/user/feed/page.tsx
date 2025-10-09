"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, Home, Compass, User, ShoppingBag, Palette, Eye, MapPin, Calendar, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { useWishlist } from "@/hooks/useWishlist"

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
  const { wishlist, loading: wishlistLoading, refetch: refetchWishlist, removeFromWishlist } = useWishlist()
  const [wishlistPosts, setWishlistPosts] = useState<Set<number>>(new Set())
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [suggestedArtists, setSuggestedArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [artworksData, recommendationsData] = await Promise.all([
          apiClient.getArtworks(),
          apiClient.getArtistRecommendations()
        ])
        setArtworks(artworksData)
        // Combine trending and new artists into one array
        const recommendations = recommendationsData.data || {}
        const combinedArtists = [
          ...(recommendations.trending_artists || []),
          ...(recommendations.new_artists || [])
        ]
        setSuggestedArtists(combinedArtists)
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const toggleWishlist = async (artworkId: number) => {
    try {
      const newWishlist = new Set(wishlistPosts)
      if (newWishlist.has(artworkId)) {
        await removeFromWishlist(artworkId)
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

  const navigationItems = [
    { href: "/user/feed", icon: Home, label: "Feed", active: true },
    { href: "/user/explore", icon: Compass, label: "Explore", active: false },
    { href: "/user/wishlist", icon: Heart, label: "Wishlist", active: false },
    { href: "/user/orders", icon: ShoppingBag, label: "Orders", active: false },
    { href: "/user/profile", icon: User, label: "Profile", active: false },
  ]

  // Remove static suggestedArtists array to avoid confusion
  // const suggestedArtists: Artist[] = [
  //   {
  //     id: 1,
  //     name: "Priya Sharma",
  //     username: "@priya_art",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     verified: true,
  //     location: "Mumbai",
  //     followers: "2.3K",
  //     artworks: 45
  //   },
  //   {
  //     id: 2,
  //     name: "Arjun Patel",
  //     username: "@arjun_sculpts",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     verified: false,
  //     location: "Delhi",
  //     followers: "1.8K",
  //     artworks: 32
  //   },
  //   {
  //     id: 3,
  //     name: "Maya Singh",
  //     username: "@maya_digital",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     verified: true,
  //     location: "Bangalore",
  //     followers: "3.1K",
  //     artworks: 67
  //   }
  // ]

  // Remove static sampleArtworks array to avoid confusion
  // const sampleArtworks: Artwork[] = [
  //   {
  //     id: 1,
  //     title: "Modern Art Collection",
  //     description: "Contemporary pieces that inspire creativity and innovation in modern art",
  //     image: "/placeholder.svg?height=400&width=400",
  //     price: "15,000",
  //     category: "Painting",
  //     likes: 234,
  //     views: 1200,
  //     artist: {
  //       id: 1,
  //       name: "Sarah Chen",
  //       username: "@sarahchen",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       verified: true,
  //       location: "New York",
  //       followers: "5.2K",
  //       artworks: 89
  //     },
  //     created_at: "2024-01-15",
  //     imageHeightClass: "h-56"
  //   },
  //   {
  //     id: 2,
  //     title: "Nature Designs",
  //     description: "Organic patterns and natural beauty captured in stunning detail",
  //     image: "/placeholder.svg?height=400&width=400",
  //     price: "8,500",
  //     category: "Digital Art",
  //     likes: 156,
  //     views: 890,
  //     artist: {
  //       id: 2,
  //       name: "Emma Wilson",
  //       username: "@emmawilson",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       verified: false,
  //       location: "London",
  //       followers: "3.7K",
  //       artworks: 45
  //     },
  //     created_at: "2024-01-14",
  //     imageHeightClass: "h-48"
  //   }
  // ]

  const displayArtworks = artworks.length > 0 ? artworks : []

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
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">ARTWALA</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search artists, artworks..." 
                  className="pl-10 bg-white dark:bg-slate-700 w-full" 
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    item.active 
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Suggested Artists */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Suggested Artists</h3>
              <div className="space-y-4">
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
              </div>
            </div>

            {/* Mobile Trending Categories */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Trending Categories</h3>
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
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Main Navigation Card */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          item.active 
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm" 
                            : "hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent text-xs"
                        onClick={() => alert(`Follow button clicked for artist ${artist.username}`)}
                      >
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
          
          {/* Artworks Grid - Full width on mobile, 3 columns on desktop */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                      className={`w-full ${artwork.imageHeightClass || 'h-48'} object-cover group-hover:scale-105 transition-transform duration-300`}
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
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{artwork.title}</h3>
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
                          <span className="text-sm font-medium hover:underline line-clamp-1">
                            {`${artwork.artist.first_name || ''} ${artwork.artist.last_name || ''}`.trim() || artwork.artist.name || artwork.artist.username}
                          </span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{artwork.artist.location}</span>
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
                        <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
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
                          <span>View</span>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(artwork.id, artwork.price)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Buy Now</span>
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
