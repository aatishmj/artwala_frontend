"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BarChart3,
  ShoppingBag,
  Settings,
  Palette,
  MessageSquare,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ArtistOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getArtistOrders()
        setOrders(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await apiClient.updateOrderStatus(orderId, status)
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      ))
      toast.success(`Order status updated to ${status}`)
    } catch (err: any) {
      console.error("Failed to update status:", err)
      toast.error(err.message || "Failed to update status")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "processing":
        return <Package className="w-5 h-5 text-orange-500" />
      case "confirmed":
        return <Clock className="w-5 h-5 text-purple-500" />
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
      case "confirmed":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.net_amount),
    0,
  )
  const pendingOrders = orders.filter((order) => order.status === "processing" || order.status === "confirmed").length
  const completedOrders = orders.filter((order) => order.status === "delivered").length

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
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
                View Profile
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">Priya Sharma</h3>
                  <p className="text-sm text-muted-foreground">@priya_art</p>
                </div>

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/dashboard">
                      <BarChart3 className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/artworks">
                      <Palette className="w-4 h-4 mr-3" />
                      My Artworks
                    </Link>
                  </Button>
                  <Button variant="default" className="w-full justify-start" asChild>
                    <Link href="/artist/orders">
                      <ShoppingBag className="w-4 h-4 mr-3" />
                      Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/messages">
                      <MessageSquare className="w-4 h-4 mr-3" />
                      Messages
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/artist/profile">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
              <p className="text-muted-foreground">Track and manage your artwork sales</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{pendingOrders}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{completedOrders}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search orders..." className="pl-10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingOrders})</TabsTrigger>
                <TabsTrigger value="shipped">
                  Shipped ({orders.filter((o) => o.status === "shipped").length})
                </TabsTrigger>
                <TabsTrigger value="delivered">Delivered ({completedOrders})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={order.artwork.image || "/placeholder.svg"}
                          alt={order.artwork.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{order.artwork.title}</h3>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={order.buyer.profile_image || "/placeholder.svg"} />
                                  <AvatarFallback>{order.buyer.first_name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{order.buyer.first_name} {order.buyer.last_name}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">₹{order.artwork.price}</p>
                              <p className="text-sm text-muted-foreground">Commission: {order.commission}</p>
                              <p className="text-sm font-medium text-green-600">Net: {order.net_amount}</p>
                              <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span>Ordered: {new Date(order.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <User className="w-4 h-4" />
                                <span>{order.buyer.username}</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => router.push(`/messages/${order.buyer.id}`)}>
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message Buyer
                              </Button>
                              {order.status === "confirmed" && (
                                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500" onClick={() => updateOrderStatus(order.id, "shipped")}>
                                  Mark as Shipped
                                </Button>
                              )}
                              {order.status === "shipped" && (
                                <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500" onClick={() => updateOrderStatus(order.id, "delivered")}>
                                  Mark as Delivered
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pending">
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "processing" || order.status === "confirmed")
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
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork.title}</h3>
                                  <p className="text-sm text-muted-foreground">by {order.buyer.first_name} {order.buyer.last_name}</p>
                                  <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.net_amount}</p>
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="shipped">
                <div className="space-y-4">
                  {orders
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
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork.title}</h3>
                                  <p className="text-sm text-muted-foreground">to {order.buyer.first_name} {order.buyer.last_name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.net_amount}</p>
                                  <Badge className="bg-blue-100 text-blue-700">Shipped</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="delivered">
                <div className="space-y-4">
                  {orders
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
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork.title}</h3>
                                  <p className="text-sm text-muted-foreground">to {order.buyer.first_name} {order.buyer.last_name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.net_amount}</p>
                                  <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                                </div>
                              </div>
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
