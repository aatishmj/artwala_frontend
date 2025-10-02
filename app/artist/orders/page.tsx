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
  Menu,
  X,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 flex justify-center items-center">
      <div className="text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 border-b backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base sm:text-lg">ARTWALA</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 hidden xs:inline-flex text-xs">
                  Artist
                </Badge>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="hidden sm:flex h-9">
                <Eye className="w-4 h-4 mr-1" />
                <span className="text-sm">Profile</span>
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden h-9 w-9 p-0">
                <Eye className="w-4 h-4" />
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <div 
                className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Sidebar Content */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <Avatar className="w-16 h-16 mx-auto mb-2">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-sm">Priya Sharma</h3>
                      <p className="text-xs text-muted-foreground">@priya_art</p>
                    </div>

                    <nav className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/artist/dashboard">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/artist/artworks">
                          <Palette className="w-4 h-4 mr-2" />
                          My Artworks
                        </Link>
                      </Button>
                      <Button variant="default" className="w-full justify-start h-9 text-sm" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/artist/orders">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Orders
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/artist/messages">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Messages
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/artist/profile">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm">Priya Sharma</h3>
                  <p className="text-xs text-muted-foreground">@priya_art</p>
                </div>

                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                    <Link href="/artist/dashboard">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                    <Link href="/artist/artworks">
                      <Palette className="w-4 h-4 mr-2" />
                      My Artworks
                    </Link>
                  </Button>
                  <Button variant="default" className="w-full justify-start h-9 text-sm" asChild>
                    <Link href="/artist/orders">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                    <Link href="/artist/messages">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                    <Link href="/artist/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Orders Management</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Track and manage your artwork sales</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <Card className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-lg sm:text-xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                      <p className="text-lg sm:text-xl font-bold">{orders.length}</p>
                    </div>
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-lg sm:text-xl font-bold">{pendingOrders}</p>
                    </div>
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-lg sm:text-xl font-bold">{completedOrders}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card className="mb-4">
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex-nowrap h-9">
                <TabsTrigger value="all" className="flex-shrink-0 text-xs px-3">All ({orders.length})</TabsTrigger>
                <TabsTrigger value="pending" className="flex-shrink-0 text-xs px-3">Pending ({pendingOrders})</TabsTrigger>
                <TabsTrigger value="shipped" className="flex-shrink-0 text-xs px-3">
                  Shipped ({orders.filter((o) => o.status === "shipped").length})
                </TabsTrigger>
                <TabsTrigger value="delivered" className="flex-shrink-0 text-xs px-3">Delivered ({completedOrders})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <ShoppingBag className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-base font-semibold mb-1">No orders yet</h3>
                      <p className="text-sm text-muted-foreground">Your orders will appear here once customers start purchasing your artwork.</p>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow border">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* Order Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={order.artwork?.image || "/placeholder.svg"}
                              alt={order.artwork?.title}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
                            />
                          </div>
                          
                          {/* Order Details */}
                          <div className="flex-1 min-w-0">
                            {/* Header Row */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sm sm:text-base truncate">
                                  {order.artwork?.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Avatar className="w-4 h-4 sm:w-5 sm:h-5">
                                    <AvatarImage src={order.buyer?.profile_image || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {order.buyer?.first_name?.[0] || 'U'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs truncate">
                                    {order.buyer?.first_name} {order.buyer?.last_name}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right flex-shrink-0">
                                <p className="font-bold text-sm sm:text-base">₹{order.artwork?.price}</p>
                                <p className="text-xs text-muted-foreground">Commission: {order.commission}</p>
                                <p className="text-xs font-medium text-green-600">Net: ₹{order.net_amount}</p>
                                <Badge className={`mt-1 text-xs ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>

                            {/* Order Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 flex-shrink-0" />
                                <span>Ordered: {new Date(order.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">@{order.buyer?.username}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="border-t pt-2">
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs flex-1 sm:flex-none">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Details
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-7 text-xs flex-1 sm:flex-none"
                                  onClick={() => router.push(`/messages/${order.buyer?.id}`)}
                                >
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  Message
                                </Button>
                                {order.status === "confirmed" && (
                                  <Button 
                                    size="sm" 
                                    className="h-7 text-xs flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-pink-500"
                                    onClick={() => updateOrderStatus(order.id, "shipped")}
                                  >
                                    Mark Shipped
                                  </Button>
                                )}
                                {order.status === "shipped" && (
                                  <Button 
                                    size="sm" 
                                    className="h-7 text-xs flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-blue-500"
                                    onClick={() => updateOrderStatus(order.id, "delivered")}
                                  >
                                    Mark Delivered
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="pending">
                <div className="space-y-3">
                  {orders
                    .filter((order) => order.status === "processing" || order.status === "confirmed")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.artwork?.image || "/placeholder.svg"}
                              alt={order.artwork?.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm truncate">{order.artwork?.title}</h3>
                                  <p className="text-xs text-muted-foreground truncate">
                                    by {order.buyer?.first_name} {order.buyer?.last_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-bold text-sm">₹{order.net_amount}</p>
                                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
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
                <div className="space-y-3">
                  {orders
                    .filter((order) => order.status === "shipped")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.artwork?.image || "/placeholder.svg"}
                              alt={order.artwork?.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm truncate">{order.artwork?.title}</h3>
                                  <p className="text-xs text-muted-foreground truncate">
                                    to {order.buyer?.first_name} {order.buyer?.last_name}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-bold text-sm">₹{order.net_amount}</p>
                                  <Badge className="text-xs bg-blue-100 text-blue-700">Shipped</Badge>
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
                <div className="space-y-3">
                  {orders
                    .filter((order) => order.status === "delivered")
                    .map((order) => (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.artwork?.image || "/placeholder.svg"}
                              alt={order.artwork?.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm truncate">{order.artwork?.title}</h3>
                                  <p className="text-xs text-muted-foreground truncate">
                                    to {order.buyer?.first_name} {order.buyer?.last_name}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-bold text-sm">₹{order.net_amount}</p>
                                  <Badge className="text-xs bg-green-100 text-green-700">Delivered</Badge>
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