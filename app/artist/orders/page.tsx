"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
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

export default function ArtistOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      artwork: "Sunset Dreams",
      artworkImage: "/placeholder.svg?height=80&width=80",
      buyer: {
        name: "Rahul Kumar",
        email: "rahul@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: "₹15,000",
      commission: "₹1,500",
      netAmount: "₹13,500",
      status: "delivered",
      orderDate: "Dec 15, 2024",
      deliveryDate: "Dec 20, 2024",
      shippingAddress: "123 Main St, Mumbai, Maharashtra 400001",
      paymentStatus: "completed",
    },
    {
      id: "ORD-002",
      artwork: "Urban Rhythm",
      artworkImage: "/placeholder.svg?height=80&width=80",
      buyer: {
        name: "Priya Singh",
        email: "priya@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: "₹8,500",
      commission: "₹850",
      netAmount: "₹7,650",
      status: "shipped",
      orderDate: "Dec 18, 2024",
      estimatedDelivery: "Dec 25, 2024",
      shippingAddress: "456 Park Ave, Delhi, Delhi 110001",
      paymentStatus: "completed",
      trackingId: "TRK987654321",
    },
    {
      id: "ORD-003",
      artwork: "Digital Mandala",
      artworkImage: "/placeholder.svg?height=80&width=80",
      buyer: {
        name: "Arjun Patel",
        email: "arjun@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: "₹12,000",
      commission: "₹1,200",
      netAmount: "₹10,800",
      status: "processing",
      orderDate: "Dec 20, 2024",
      estimatedDelivery: "Dec 28, 2024",
      shippingAddress: "789 Garden St, Bangalore, Karnataka 560001",
      paymentStatus: "pending",
    },
    {
      id: "ORD-004",
      artwork: "Morning Glory",
      artworkImage: "/placeholder.svg?height=80&width=80",
      buyer: {
        name: "Maya Sharma",
        email: "maya@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: "₹18,000",
      commission: "₹1,800",
      netAmount: "₹16,200",
      status: "confirmed",
      orderDate: "Dec 22, 2024",
      estimatedDelivery: "Dec 30, 2024",
      shippingAddress: "321 Beach Rd, Chennai, Tamil Nadu 600001",
      paymentStatus: "completed",
    },
  ])

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
    (sum, order) => sum + Number.parseFloat(order.netAmount.replace("₹", "").replace(",", "")),
    0,
  )
  const pendingOrders = orders.filter((order) => order.status === "processing" || order.status === "confirmed").length
  const completedOrders = orders.filter((order) => order.status === "delivered").length

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
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
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
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
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
                          src={order.artworkImage || "/placeholder.svg"}
                          alt={order.artwork}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{order.artwork}</h3>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={order.buyer.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{order.buyer.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{order.buyer.name}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{order.amount}</p>
                              <p className="text-sm text-muted-foreground">Commission: {order.commission}</p>
                              <p className="text-sm font-medium text-green-600">Net: {order.netAmount}</p>
                              <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span>Ordered: {order.orderDate}</span>
                              </div>
                              {order.deliveryDate && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Delivered: {order.deliveryDate}</span>
                                </div>
                              )}
                              {order.estimatedDelivery && !order.deliveryDate && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>Est. delivery: {order.estimatedDelivery}</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <User className="w-4 h-4" />
                                <span>{order.buyer.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                <span>Payment: {order.paymentStatus}</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <p className="text-sm text-muted-foreground mb-3">
                              <strong>Shipping Address:</strong> {order.shippingAddress}
                            </p>
                            <div className="flex items-center gap-3">
                              {order.trackingId && (
                                <Button variant="outline" size="sm">
                                  <Truck className="w-4 h-4 mr-2" />
                                  Track: {order.trackingId}
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message Buyer
                              </Button>
                              {order.status === "confirmed" && (
                                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                                  Mark as Shipped
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
                              src={order.artworkImage || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork}</h3>
                                  <p className="text-sm text-muted-foreground">by {order.buyer.name}</p>
                                  <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.netAmount}</p>
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
                              src={order.artworkImage || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork}</h3>
                                  <p className="text-sm text-muted-foreground">to {order.buyer.name}</p>
                                  <p className="text-sm text-muted-foreground">Tracking: {order.trackingId}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.netAmount}</p>
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
                              src={order.artworkImage || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{order.artwork}</h3>
                                  <p className="text-sm text-muted-foreground">to {order.buyer.name}</p>
                                  <p className="text-sm text-muted-foreground">Delivered on {order.deliveryDate}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.netAmount}</p>
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
