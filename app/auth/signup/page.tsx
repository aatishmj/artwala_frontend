"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Palette, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { register } = useAuth()

  const typeParam = searchParams.get("type")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "artist">(
    typeParam === "artist" || typeParam === "user" ? typeParam : "user",
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    acceptTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords don't match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.passwordConfirm,
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_type: userType,
        phone: formData.phone || undefined,
      })

      // Redirect based on actual user type from response
      const redirectPath = response.user?.user_type === "artist" ? "/artist/dashboard" : "/user/feed"
      router.push(redirectPath)
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to Home</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join ARTWALA
          </h1>
          <p className="text-muted-foreground mt-2">Create your account and start your art journey</p>
        </div>

        <Tabs value={userType} onValueChange={(value) => setUserType(value as "user" | "artist")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="user">Art Lover</TabsTrigger>
            <TabsTrigger value="artist">Artist</TabsTrigger>
          </TabsList>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                {userType === "user"
                  ? "Join our community of art enthusiasts"
                  : "Start showcasing your artistic talent"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="bg-white/50 dark:bg-gray-700/50"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-white/50 dark:bg-gray-700/50"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    className="bg-white/50 dark:bg-gray-700/50"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/50 dark:bg-gray-700/50"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    className="bg-white/50 dark:bg-gray-700/50"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="bg-white/50 dark:bg-gray-700/50 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="Confirm your password"
                    className="bg-white/50 dark:bg-gray-700/50"
                    value={formData.passwordConfirm}
                    onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-purple-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link href="/auth/login" className="text-purple-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
