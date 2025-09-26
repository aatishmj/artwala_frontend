"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Truck, CheckCircle, Package, Clock, Eye, MessageCircle } from 'lucide-react'

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
    <div className="p-4 md:p-6 space-y-6">
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
  )
}
