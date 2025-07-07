"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      artwork: "Sunset Dreams",
      artist: "Priya Sharma",
      image: "/placeholder.svg?height=100&width=100",
      amount: "₹15,000",
      status: "delivered",
      orderDate: "Dec 15, 2024",
      deliveryDate: "Dec 20, 2024",
      trackingId: "TRK123456789",
    },
    {
      id: "ORD-002",
      artwork: "Urban Rhythm",
      artist: "Arjun Patel",
      image: "/placeholder.svg?height=100&width=100",
      amount: "₹8,500",
      status: "shipped",
      orderDate: "Dec 18, 2024",
      estimatedDelivery: "Dec 25, 2024",
      trackingId: "TRK987654321",
    },
    {
      id: "ORD-003",
      artwork: "Digital Mandala",
      artist: "Maya Singh",
      image: "/placeholder.svg?height=100&width=100",
      amount: "₹12,000",
      status: "processing",
      orderDate: "Dec 20, 2024",
      estimatedDelivery: "Dec 28, 2024",
    },
  ]

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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ARTWALA</span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
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
            <Card className="sticky top-24">
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
                    href="/user/saved"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Saved</span>
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">Orders</span>
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
          </div>

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
                {orders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.artwork}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{order.artwork}</h3>
                              <p className="text-muted-foreground">by {order.artist}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{order.amount}</p>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              <span>Ordered on {order.orderDate}</span>
                            </div>
                            {order.deliveryDate && <span>Delivered on {order.deliveryDate}</span>}
                            {order.estimatedDelivery && !order.deliveryDate && (
                              <span>Est. delivery: {order.estimatedDelivery}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            {order.trackingId && (
                              <Button variant="outline" size="sm">
                                <Truck className="w-4 h-4 mr-2" />
                                Track Order
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
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
                  {orders
                    .filter((order) => order.status === "processing")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.image || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork}</h3>
                              <p className="text-muted-foreground">by {order.artist}</p>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{order.amount}</p>
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
                  {orders
                    .filter((order) => order.status === "shipped")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.image || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork}</h3>
                              <p className="text-muted-foreground">by {order.artist}</p>
                              <p className="text-sm text-muted-foreground">Tracking: {order.trackingId}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{order.amount}</p>
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
                  {orders
                    .filter((order) => order.status === "delivered")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.image || "/placeholder.svg"}
                              alt={order.artwork}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{order.artwork}</h3>
                              <p className="text-muted-foreground">by {order.artist}</p>
                              <p className="text-sm text-muted-foreground">Delivered on {order.deliveryDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{order.amount}</p>
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
