"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Building2, Shield, Truck, ArrowLeft, Lock, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [upiId, setUpiId] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    bank: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions to proceed.")
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      alert(`Order placed successfully! Total: $${total}${paymentMethod === "cod" ? " + ₹20" : ""}`)
      setIsProcessing(false)
      // In a real app, you would redirect to order confirmation page
    }, 2000)
  }

  const cartItems = [
    {
      id: 1,
      name: "Terracotta Elegance",
      price: 89,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Glazed Garden Pot",
      price: 124,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-amber-900 bg-clip-text text-transparent">
                  Mud & Art
                </h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/collection" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                Collection
              </Link>
              <Link href="/about" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-stone-300 text-stone-800">
                <Lock className="w-3 h-3 mr-1" />
                Secure Checkout
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-stone-700">
          <Link href="/collection" className="hover:text-amber-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <Card className="bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-stone-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-amber-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-stone-800">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-stone-800">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="border-stone-200 focus:border-stone-400"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-stone-800">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="border-stone-200 focus:border-stone-400"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-stone-800">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    className="border-stone-200 focus:border-stone-400"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-stone-800">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-stone-800">
                      State
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleInputChange({ target: { id: "state", value } })}
                    >
                      <SelectTrigger className="border-stone-200">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-stone-800">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="400001"
                      className="border-stone-200 focus:border-stone-400"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-stone-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-2 p-4 border border-stone-200 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 mr-2 text-stone-600" />
                      <span className="text-stone-900">Credit/Debit Card</span>
                    </Label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="ml-6 space-y-4 p-4 bg-stone-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-stone-800">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="border-stone-200 focus:border-stone-400"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="text-stone-800">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="border-stone-200 focus:border-stone-400"
                            value={formData.expiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-stone-800">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="border-stone-200 focus:border-stone-400"
                            value={formData.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName" className="text-stone-800">
                          Name on Card
                        </Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          className="border-stone-200 focus:border-stone-400"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI Payment */}
                  <div className="flex items-center space-x-2 p-4 border border-stone-200 rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5 mr-2 text-amber-600" />
                      <span className="text-stone-900">UPI Payment</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">Popular</Badge>
                    </Label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="ml-6 space-y-4 p-4 bg-stone-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="upiId" className="text-stone-800">
                          UPI ID
                        </Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@paytm / yourname@gpay"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="border-stone-200 focus:border-stone-400"
                        />
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-stone-700">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                          Google Pay
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                          PhonePe
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                          Paytm
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  <div className="flex items-center space-x-2 p-4 border border-stone-200 rounded-lg">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center cursor-pointer flex-1">
                      <Building2 className="w-5 h-5 mr-2 text-amber-600" />
                      <span className="text-stone-900">Net Banking</span>
                    </Label>
                  </div>

                  {paymentMethod === "netbanking" && (
                    <div className="ml-6 space-y-4 p-4 bg-stone-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="bank" className="text-stone-800">
                          Select Bank
                        </Label>
                        <Select
                          value={formData.bank}
                          onValueChange={(value) => handleInputChange({ target: { id: "bank", value } })}
                        >
                          <SelectTrigger className="border-stone-200">
                            <SelectValue placeholder="Choose your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sbi">State Bank of India</SelectItem>
                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                            <SelectItem value="icici">ICICI Bank</SelectItem>
                            <SelectItem value="axis">Axis Bank</SelectItem>
                            <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <div className="flex items-center space-x-2 p-4 border border-stone-200 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                      <Truck className="w-5 h-5 mr-2 text-amber-600" />
                      <span className="text-stone-900">Cash on Delivery</span>
                      <Badge className="ml-2 bg-blue-100 text-blue-800">₹20 extra</Badge>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                  <Label htmlFor="terms" className="text-sm text-stone-700">
                    I agree to the{" "}
                    <Link href="#" className="text-amber-700 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-amber-700 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white/80 border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-stone-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-900">{item.name}</h4>
                        <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-stone-900">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-stone-200" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-stone-700">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between text-stone-700">
                      <span>COD Charges</span>
                      <span>₹20</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-stone-200" />

                <div className="flex justify-between text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>
                    ${total}
                    {paymentMethod === "cod" && " + ₹20"}
                  </span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Secure 256-bit SSL encryption</span>
                </div>

                {/* Place Order Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-stone-600 to-amber-700 hover:from-stone-700 hover:to-amber-800 text-white"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : `Place Order - $${total}${paymentMethod === "cod" ? " + ₹20" : ""}`}
                </Button>

                <p className="text-xs text-center text-stone-600">Your payment information is secure and encrypted</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
