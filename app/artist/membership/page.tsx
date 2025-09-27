"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Palette } from "lucide-react"
import { useMembership } from "@/hooks/useMembership"

export default function ArtistMembershipPayment() {
  const router = useRouter()
  const { loading, error, purchaseMembership } = useMembership()

  // Form fields
  const [phone, setPhone] = useState("")
  const [address_line_1, setAddressLine1] = useState("")
  const [address_line_2, setAddressLine2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null)
  const [panFile, setPanFile] = useState<File | null>(null)
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [branch, setBranch] = useState("")
  const [accountHolder, setAccountHolder] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const membershipPrice = 1000
  const gst = membershipPrice * 0.18
  const totalAmount = membershipPrice + gst

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token')
        setIsAuthenticated(!!token)
      }
      setIsCheckingAuth(false)
    }

    checkAuth()
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push('/login?redirect=/artist/membership')
    }
  }, [isAuthenticated, isCheckingAuth, router])

  const handlePayment = async () => {
    try {
      // Check authentication again before proceeding
      if (!isAuthenticated) {
        alert('Please login to continue')
        router.push('/login?redirect=/artist/membership')
        return
      }

      // Validation for required fields
      if (!phone || !address_line_1 || !city || !state || !pincode || 
          !bankName || !accountNumber || !ifsc || !branch || !accountHolder || 
          !birthDate || !gender) {
        alert("Please fill all required fields.")
        return
      }

      // Validate phone number
      if (phone.length < 10) {
        alert("Please enter a valid phone number")
        return
      }

      // Validate pincode
      if (pincode.length !== 6) {
        alert("Please enter a valid 6-digit pincode")
        return
      }

      // Validate IFSC code
      if (ifsc.length !== 11) {
        alert("Please enter a valid 11-character IFSC code")
        return
      }

      // Validate age (must be at least 18)
      const today = new Date()
      const birthDateObj = new Date(birthDate)
      const age = today.getFullYear() - birthDateObj.getFullYear()
      if (age < 18) {
        alert("You must be at least 18 years old to purchase membership")
        return
      }

      // Validate files
      if (!aadhaarFile) {
        alert("Aadhaar card is required")
        return
      }

      if (!panFile) {
        alert("PAN card is required")
        return
      }

      const formData = new FormData()
      
      // Personal info
      formData.append("phone", phone)
      formData.append("address_line_1", address_line_1)
      formData.append("address_line_2", address_line_2 || "")
      formData.append("city", city)
      formData.append("state", state)
      formData.append("pincode", pincode)
      formData.append("birth_date", birthDate)
      formData.append("gender", gender)
      
      // Bank details
      formData.append("bank_name", bankName)
      formData.append("account_number", accountNumber)
      formData.append("ifsc_code", ifsc)
      formData.append("bank_branch", branch)
      formData.append("account_holder_name", accountHolder)
      
      // Payment info
      formData.append("amount", totalAmount.toString())
      formData.append("payment_method", "upi")
      formData.append("payment_id", `upi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
      
      // Files
      formData.append("aadhaar_card", aadhaarFile)
      formData.append("pan_card", panFile)

      await purchaseMembership(formData)
      
      // Show success message
      alert("🎉 Membership purchased successfully! You now have access to all premium features.")
      router.push("/artist/dashboard")
    } catch (err: any) {
      console.error("Payment error:", err)
      // Handle unauthorized error specifically
      if (err.message.includes('Session expired') || err.message.includes('Unauthorized')) {
        alert('Your session has expired. Please login again.')
        router.push('/login')
      } else {
        alert(err.message || "Payment failed. Please try again.")
      }
    }
  }

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show message if not authenticated (though useEffect should redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:bg-gradient-to-br dark:from-slate-900 dark:to-gray-900 p-4">
      <header className="bg-white/95 dark:bg-slate-800/95 border-b border-purple-200/50 dark:border-slate-700 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">ARTWALA</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 border-2 border-purple-200 dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
            <CardTitle className="text-2xl font-bold text-center text-purple-900 dark:text-white">
              🎨 Artist Membership Registration
            </CardTitle>
            <p className="text-center text-purple-700 dark:text-purple-300">
              Unlock premium features and grow your art business
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white border-b pb-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    Date of Birth *
                  </Label>
                  <Input 
                    id="birthDate"
                    type="date" 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender" className="text-sm font-medium">
                  Gender *
                </Label>
                <select 
                  id="gender"
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 border rounded-md mt-1"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white border-b pb-2">
                Address Information
              </h3>
              
              <div>
                <Label htmlFor="address_line_1" className="text-sm font-medium">
                  Address Line 1 *
                </Label>
                <Input 
                  id="address_line_1"
                  placeholder="Street address, P.O. Box, Company name" 
                  value={address_line_1} 
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address_line_2" className="text-sm font-medium">
                  Address Line 2
                </Label>
                <Input 
                  id="address_line_2"
                  placeholder="Apartment, suite, unit, building, floor, etc." 
                  value={address_line_2} 
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">
                    City *
                  </Label>
                  <Input 
                    id="city"
                    placeholder="City" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state" className="text-sm font-medium">
                    State *
                  </Label>
                  <Input 
                    id="state"
                    placeholder="State" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium">
                    Pincode *
                  </Label>
                  <Input 
                    id="pincode"
                    placeholder="6-digit pincode" 
                    value={pincode} 
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white border-b pb-2">
                Document Verification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aadhaar" className="text-sm font-medium">
                    Aadhaar Card (Image) *
                  </Label>
                  <Input 
                    id="aadhaar"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setAadhaarFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG format</p>
                </div>
                
                <div>
                  <Label htmlFor="pan" className="text-sm font-medium">
                    PAN Card (Image) *
                  </Label>
                  <Input 
                    id="pan"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setPanFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG format</p>
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white border-b pb-2">
                Bank Account Details
              </h3>
              
              <div>
                <Label htmlFor="bankName" className="text-sm font-medium">
                  Bank Name *
                </Label>
                <Input 
                  id="bankName"
                  placeholder="Enter bank name" 
                  value={bankName} 
                  onChange={(e) => setBankName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="accountHolder" className="text-sm font-medium">
                  Account Holder Name *
                </Label>
                <Input 
                  id="accountHolder"
                  placeholder="Name as per bank account" 
                  value={accountHolder} 
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber" className="text-sm font-medium">
                    Account Number *
                  </Label>
                  <Input 
                    id="accountNumber"
                    placeholder="Enter account number" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ifsc" className="text-sm font-medium">
                    IFSC Code *
                  </Label>
                  <Input 
                    id="ifsc"
                    placeholder="11-character IFSC code" 
                    value={ifsc} 
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    maxLength={11}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="branch" className="text-sm font-medium">
                  Bank Branch *
                </Label>
                <Input 
                  id="branch"
                  placeholder="Branch name" 
                  value={branch} 
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-purple-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white mb-3">
                Payment Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Membership Fee:</span>
                  <span>₹{membershipPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-purple-600 dark:text-purple-400">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p>
                By clicking "Purchase Membership", you agree to our Terms of Service and Privacy Policy. 
                Your membership will be valid for 1 year from the date of purchase.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Purchase Membership - ₹${totalAmount.toFixed(2)}`
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Membership Benefits */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-4">
              🎁 Membership Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Premium artist profile badge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Higher visibility in search results</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Advanced analytics dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Exclusive promotional opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Commission-free sales for 1 year</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}