"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/user-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSidebar } from "@/components/side-menu"
import {
  Search,
  Home,
  Compass,
  User,
  ShoppingBag,
  Palette,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  Menu,
  X,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { apiClient, Order } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getUserOrders()
        setOrders(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load orders')
        toast.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  // Sample data if API fails - aligned with API Order interface
  const sampleOrders: Order[] = [
    {
      id: 1,
      user: 1,
      artwork: 1,
      quantity: 1,
      total_price: "15000",
      status: "delivered",
      created_at: "2024-12-15T00:00:00Z",
      updated_at: "2024-12-15T00:00:00Z"
    },
    {
      id: 2,
      user: 1,
      artwork: 2,
      quantity: 1,
      total_price: "8500",
      status: "shipped",
      created_at: "2024-12-18T00:00:00Z",
      updated_at: "2024-12-18T00:00:00Z"
    },
    {
      id: 3,
      user: 1,
      artwork: 3,
      quantity: 1,
      total_price: "12000",
      status: "processing",
      created_at: "2024-12-20T00:00:00Z",
      updated_at: "2024-12-20T00:00:00Z"
    },
    {
      id: 4,
      user: 1,
      artwork: 4,
      quantity: 2,
      total_price: "22000",
      status: "delivered",
      created_at: "2024-12-10T00:00:00Z",
      updated_at: "2024-12-10T00:00:00Z"
    },
    {
      id: 5,
      user: 1,
      artwork: 5,
      quantity: 1,
      total_price: "9500",
      status: "shipped",
      created_at: "2024-12-22T00:00:00Z",
      updated_at: "2024-12-22T00:00:00Z"
    },
    {
      id: 6,
      user: 1,
      artwork: 6,
      quantity: 1,
      total_price: "18000",
      status: "processing",
      created_at: "2024-12-25T00:00:00Z",
      updated_at: "2024-12-25T00:00:00Z"
    },
    {
      id: 7,
      user: 1,
      artwork: 7,
      quantity: 3,
      total_price: "45000",
      status: "delivered",
      created_at: "2024-12-05T00:00:00Z",
      updated_at: "2024-12-05T00:00:00Z"
    },
  ]

  const displayOrders = orders.length > 0 ? orders : sampleOrders

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "processing":
        return <Package className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                <Input placeholder="Search artists, artworks..." className="pl-10 bg-white dark:bg-slate-700" />
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
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="space-y-2">
              <Link
                href="/user/feed"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Feed</span>
              </Link>
              <Link
                href="/user/explore"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Compass className="w-5 h-5" />
                <span className="font-medium">Explore</span>
              </Link>
              <Link
                href="/user/wishlist"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </Link>
              <Link
                href="/user/orders"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </Link>
              <Link
                href="/user/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <UserSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
              <p className="text-muted-foreground text-sm md:text-base">Track and manage your artwork purchases</p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs md:text-sm">Processing</TabsTrigger>
                <TabsTrigger value="shipped" className="text-xs md:text-sm">Shipped</TabsTrigger>
                <TabsTrigger value="delivered" className="text-xs md:text-sm">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {displayOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img
                          src="/placeholder.svg"
                          alt="Artwork"
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-base md:text-lg truncate">Order #{order.id}</h3>
                              <p className="text-muted-foreground text-sm">Artwork ID: {order.artwork}</p>
                              <p className="text-xs text-muted-foreground">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-left sm:text-right flex-shrink-0">
                              <p className="font-bold text-lg">₹{order.total_price}</p>
                              <Badge className={`${getStatusColor(order.status)} text-xs`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                            {getStatusIcon(order.status)}
                            <span>Quantity: {order.quantity}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <Button variant="outline" size="sm" className="text-xs md:text-sm">
                              <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.push(`/messages/1`)} className="text-xs md:text-sm">
                              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              Contact Artist
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                                Write Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                {displayOrders
                  .filter((order) => order.status === "processing")
                  .map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <img
                            src="/placeholder.svg"
                            alt="Artwork"
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base truncate">Order #{order.id}</h3>
                            <p className="text-muted-foreground text-sm">Artwork ID: {order.artwork}</p>
                            <p className="text-xs text-muted-foreground">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-orange-100 text-orange-700 text-xs">Processing</Badge>
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="font-bold">₹{order.total_price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="shipped" className="space-y-4">
                {displayOrders
                  .filter((order) => order.status === "shipped")
                  .map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <img
                            src="/placeholder.svg"
                            alt="Artwork"
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base truncate">Order #{order.id}</h3>
                            <p className="text-muted-foreground text-sm">Artwork ID: {order.artwork}</p>
                            <p className="text-xs text-muted-foreground">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-700 text-xs">Shipped</Badge>
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="font-bold">₹{order.total_price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4">
                {displayOrders
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <img
                            src="/placeholder.svg"
                            alt="Artwork"
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base truncate">Order #{order.id}</h3>
                            <p className="text-muted-foreground text-sm">Artwork ID: {order.artwork}</p>
                            <p className="text-xs text-muted-foreground">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-700 text-xs">Delivered</Badge>
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="font-bold">₹{order.total_price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
