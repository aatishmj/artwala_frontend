"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Wallet,
  Building2,
  Shield,
  CheckCircle,
  Palette,
  Users,
  Star,
  Trophy,
  Briefcase,
  Globe,
  Link,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ArtistMembershipPayment() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)

  const membershipPrice = 1000
  const gst = membershipPrice * 0.18
  const totalAmount = membershipPrice + gst

  const handlePayment = async () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const benefits = [
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Portfolio Showcase",
      description: "Create and display your professional portfolio to attract clients",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Commission Opportunities",
      description: "Access exclusive commission projects and freelance opportunities",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Artist Networking",
      description: "Connect with fellow artists and build meaningful professional relationships",
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Exclusive Resources",
      description: "Access premium tutorials, templates, and industry insights",
    },
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      title: "Contest Participation",
      description: "Participate in exclusive art contests with cash prizes",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Global Exposure",
      description: "Get featured on our platform and reach international audiences",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:bg-gradient-to-br dark:from-slate-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-purple-200/50 dark:border-slate-700 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">ARTWALA</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-balance text-foreground">Join the Artist Community</h1>
            <p className="text-xl text-muted-foreground mb-6 text-pretty">
              Unlock your artistic potential with premium membership benefits
            </p>
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 dark:border-purple-700 shadow-lg">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{membershipPrice}
              </span>
              <span className="text-muted-foreground">/year</span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700 hover:shadow-lg transition-all hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Choose Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border border-purple-200 dark:border-slate-600 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1 text-foreground">
                        <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Credit/Debit Card
                        <span className="text-xs text-muted-foreground ml-auto">Visa, Mastercard, RuPay</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-purple-200 dark:border-slate-600 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-colors">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1 text-foreground">
                        <Wallet className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        UPI Payment
                        <span className="text-xs text-muted-foreground ml-auto">PhonePe, GPay, Paytm</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-purple-200 dark:border-slate-600 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-colors">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label
                        htmlFor="netbanking"
                        className="flex items-center gap-2 cursor-pointer flex-1 text-foreground"
                      >
                        <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Net Banking
                        <span className="text-xs text-muted-foreground ml-auto">All major banks</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details */}
              {paymentMethod === "card" && (
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-foreground">Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-foreground">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-foreground">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-foreground">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-foreground">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "upi" && (
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-foreground">UPI Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="upiId" className="text-foreground">
                        UPI ID
                      </Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                      />
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                      <p className="text-sm text-muted-foreground">
                        You'll be redirected to your UPI app to complete the payment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "netbanking" && (
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-foreground">Select Your Bank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select className="w-full p-3 border border-purple-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-foreground focus:border-purple-500 dark:focus:border-purple-400">
                      <option>Select Bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Bank of Baroda</option>
                      <option>Canara Bank</option>
                    </select>
                  </CardContent>
                </Card>
              )}

              {/* Billing Information */}
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-foreground">Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-foreground">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="border-purple-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-slate-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-foreground">Membership Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Premium Membership</h4>
                      <p className="text-sm text-muted-foreground">Annual subscription</p>
                      <p className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{membershipPrice}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground">Membership Fee</span>
                      <span className="text-foreground">₹{membershipPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="text-muted-foreground">₹{gst.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-foreground">Total Amount</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Your payment is protected by 256-bit SSL encryption</p>
                  </div>
                  <Link href="dashboard">
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg font-medium"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-white font-medium">Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span className="text-white font-medium">Pay ₹{totalAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </Button>
                  </Link>

                  <div className="text-xs text-muted-foreground text-center">
                    By completing your purchase, you agree to our{" "}
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      Privacy Policy
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
