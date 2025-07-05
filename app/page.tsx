"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Users, Heart, Star, ArrowRight, Brush, Sparkles } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [selectedLogin, setSelectedLogin] = useState<"user" | "artist" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach via-white to-pastel-lavender dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ARTWALA
              </h1>
              <p className="text-xs text-muted-foreground">Foundation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              About Us
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            >
              Join Community
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            Of the Artists. By the Artists. For the Artists.
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Empowering Creators,
            <br />
            Connecting Communities
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ARTWALA Foundation is an artist-led NGO dedicated to creating a vibrant, inclusive art ecosystem through
            mentorship, digital promotion, and community building.
          </p>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pastel-peach to-pastel-coral dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6 text-center">
                <Brush className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Create</h3>
                <p className="text-sm text-muted-foreground">Mentor and guide artists across all disciplines</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pastel-mint to-pastel-pink dark:from-pink-900/20 dark:to-orange-900/20">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h3 className="font-semibold mb-2">Reach</h3>
                <p className="text-sm text-muted-foreground">Connect artists with connoisseurs and collectors</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pastel-sky to-pastel-blue dark:from-orange-900/20 dark:to-yellow-900/20">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-semibold mb-2">Celebrate</h3>
                <p className="text-sm text-muted-foreground">Enhance visual literacy and art appreciation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
          <p className="text-muted-foreground">Choose your path and become part of the ARTWALA family</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Artist Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-700">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">I'm an Artist</CardTitle>
              <CardDescription className="text-base">
                Showcase your work, connect with buyers, and grow your artistic career
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Create your personal storefront</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Upload and sell your artwork</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Connect with art enthusiasts</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Join city-based chapters</span>
                </div>
              </div>
              <Link href="/auth/signup?type=artist" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Join as Artist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* User Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-pink-200 dark:hover:border-pink-700">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">I'm an Art Lover</CardTitle>
              <CardDescription className="text-base">
                Discover amazing artists, collect unique pieces, and support creativity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Discover talented artists</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Purchase original artwork</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Commission custom pieces</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Support local art communities</span>
                </div>
              </div>
              <Link href="/auth/signup?type=user" className="block">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700">
                  Explore Art
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-pastel-sage/30 to-pastel-cream/30 dark:bg-gray-800/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <h3 className="font-semibold mb-2">Integrity</h3>
              <p className="text-sm text-muted-foreground">Upholding authenticity and transparency</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <h3 className="font-semibold mb-2">Devotion</h3>
              <p className="text-sm text-muted-foreground">Deep commitment to the creative journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <h3 className="font-semibold mb-2">Karma</h3>
              <p className="text-sm text-muted-foreground">Creating with purpose and responsibility</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <h3 className="font-semibold mb-2">Zeal</h3>
              <p className="text-sm text-muted-foreground">Evangelizing art with passion and energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">ARTWALA Foundation</span>
              </div>
              <p className="text-sm text-gray-400">Empowering creators and connecting communities through art.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Our Mission
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    City Chapters
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Artists</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Join as Artist
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Artist Resources
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Workshops
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Mentorship
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>hello@artwala.org</div>
                <div>media@artwala.org</div>
                <div>curator@artwala.org</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ARTWALA Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
