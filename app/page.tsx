"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Users, Heart, Star, ArrowRight, Brush, Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      const redirectPath = user.user_type === "artist" ? "/artist/dashboard" : "/user/feed"
      router.push(redirectPath)
    }
  }, [loading, isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-gray-50 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ARTWALA
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Foundation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/about">About Us</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/community">Community</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/about">About Us</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/community">Community</Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  className="justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 sm:mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs sm:text-sm">
            Of the Artists. By the Artists. For the Artists.
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Empowering Creators,
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Connecting Communities
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            ARTWALA Foundation is an artist-led NGO dedicated to creating a vibrant, inclusive art ecosystem through
            mentorship, digital promotion, and community building.
          </p>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="p-4 sm:p-6 text-center">
                <Brush className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Create</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Mentor and guide artists across all disciplines</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="p-4 sm:p-6 text-center">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-pink-600" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Reach</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Connect artists with connoisseurs and collectors</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="p-4 sm:p-6 text-center">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-orange-600" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Celebrate</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Enhance visual literacy and art appreciation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Join Our Creative Community</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Choose your path and become part of the ARTWALA family</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Artist Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-700">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">I'm an Artist</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Showcase your work, connect with buyers, and grow your artistic career
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Create your personal storefront</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Upload and sell your artwork</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Connect with art enthusiasts</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Join city-based chapters</span>
                </div>
              </div>
              <Link href="/auth/login?type=artist" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base">
                  Join as Artist
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* User Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-pink-200 dark:hover:border-pink-700">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">I'm an Art Lover</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Discover amazing artists, collect unique pieces, and support creativity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Discover talented artists</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Purchase original artwork</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Commission custom pieces</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Support local art communities</span>
                </div>
              </div>
              <Link href="/auth/login?type=user" className="block">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-sm sm:text-base">
                  Explore Art
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-sm sm:text-base">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">I</span>
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Integrity</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Upholding authenticity and transparency</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">D</span>
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Devotion</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Deep commitment to the creative journey</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">K</span>
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Karma</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Creating with purpose and responsibility</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">Z</span>
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Zeal</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Evangelizing art with passion and energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">ARTWALA Foundation</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering creators and connecting communities through art.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </div>
                <div>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </div>
                <div>
                  <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </div>
                <div>
                  <Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">For Artists</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/auth/signup?type=artist" className="text-gray-400 hover:text-white transition-colors">
                    Join as Artist
                  </Link>
                </div>
                <div>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                    Workshops
                  </Link>
                </div>
                <div>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                    Mentorship
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>hello@artwala.org</div>
                <div>media@artwala.org</div>
                <div>curator@artwala.org</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ARTWALA Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
