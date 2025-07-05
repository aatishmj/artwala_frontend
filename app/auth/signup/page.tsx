"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Palette, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "artist">(
    typeParam === "artist" || typeParam === "user" ? typeParam : "user",
  )

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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="bg-white/50 dark:bg-gray-700/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="bg-white/50 dark:bg-gray-700/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" className="bg-white/50 dark:bg-gray-700/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white/50 dark:bg-gray-700/50"
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

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                asChild
              >
                <Link href={userType === "user" ? "/user/feed" : "/artist/dashboard"}>Create Account</Link>
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/auth/login" className="text-purple-600 hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
