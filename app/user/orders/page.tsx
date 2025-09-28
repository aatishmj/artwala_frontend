"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Order {
  id: number
  artwork: {
    id: number
    title: string
    image: string
    artist: {
      id: number
      username: string
      first_name: string
      last_name: string
    }
  }
  buyer: any
  quantity: number
  status: string
  created_at: string
  transaction?: {
    amount: number
    payment_status: string
    payment_method: string
    timestamp: string
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  // Sample data if API fails
  const sampleOrders: Order[] = [
    {
      id: 1,
      artwork: {
        id: 1,
        title: "Sunset Dreams",
        image: "/placeholder.svg?height=100&width=100",
        artist: {
          id: 1,
          username: "priya_art",
          first_name: "Priya",
          last_name: "Sharma"
        }
      },
      buyer: {},
      quantity: 1,
      status: "delivered",
      created_at: "2024-12-15T00:00:00Z",
      transaction: {
        amount: 15000,
        payment_status: "completed",
        payment_method: "card",
        timestamp: "2024-12-15T00:00:00Z"
      }
    },
    {
      id: 2,
      artwork: {
        id: 2,
        title: "Urban Rhythm",
        image: "/placeholder.svg?height=100&width=100",
        artist: {
          id: 2,
          username: "arjun_sculpts",
          first_name: "Arjun",
          last_name: "Patel"
        }
      },
      buyer: {},
      quantity: 1,
      status: "shipped",
      created_at: "2024-12-18T00:00:00Z",
      transaction: {
        amount: 8500,
        payment_status: "completed",
        payment_method: "card",
        timestamp: "2024-12-18T00:00:00Z"
      }
    },
    {
      id: 3,
      artwork: {
        id: 3,
        title: "Digital Mandala",
        image: "/placeholder.svg?height=100&width=100",
        artist: {
          id: 3,
          username: "maya_digital",
          first_name: "Maya",
          last_name: "Singh"
        }
      },
      buyer: {},
      quantity: 1,
      status: "processing",
      created_at: "2024-12-20T00:00:00Z"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b sticky top-0 z-50 backdrop-blur-md">
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
          <UserSidebar />


          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your artwork purchases</p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {displayOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={order.artwork.image || "/placeholder.svg"}
                          alt={order.artwork.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{order.artwork.title}</h3>
                              <p className="text-muted-foreground">by {order.artwork.artist.first_name} {order.artwork.artist.last_name}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">₹{order.transaction?.amount || 'N/A'}</p>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              <span>Ordered on {new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.push(`/messages/${order.artwork.artist.id}`)}>
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact Artist
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline" size="sm">
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

              <TabsContent value="processing">
                <div className="space-y-4">
                  {displayOrders
                    .filter((order) => order.status === "processing")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.artwork.image || "/placeholder.svg"}
                              alt={order.artwork.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork.title}</h3>
                              <p className="text-muted-foreground">by {order.artwork.artist.first_name} {order.artwork.artist.last_name}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{order.transaction?.amount || 'N/A'}</p>
                              <Badge className="bg-orange-100 text-orange-700">Processing</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="shipped">
                <div className="space-y-4">
                  {displayOrders
                    .filter((order) => order.status === "shipped")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.artwork.image || "/placeholder.svg"}
                              alt={order.artwork.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork.title}</h3>
                              <p className="text-muted-foreground">by {order.artwork.artist.first_name} {order.artwork.artist.last_name}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{order.transaction?.amount || 'N/A'}</p>
                              <Badge className="bg-blue-100 text-blue-700">Shipped</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="delivered">
                <div className="space-y-4">
                  {displayOrders
                    .filter((order) => order.status === "delivered")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.artwork.image || "/placeholder.svg"}
                              alt={order.artwork.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork.title}</h3>
                              <p className="text-muted-foreground">by {order.artwork.artist.first_name} {order.artwork.artist.last_name}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{order.transaction?.amount || 'N/A'}</p>
                              <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                            </div>
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
    </div>
  )
}
