"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Users, Heart, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                <Button variant="ghost" size="sm" className="sm:hidden">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ARTWALA Foundation
                </span>
              </div>
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              About ARTWALA Foundation
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              An artist-led NGO dedicated to empowering creators and connecting communities
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Mission */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Our Mission</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center sm:text-left">
                  ARTWALA Foundation exists to create a vibrant, inclusive art ecosystem that empowers artists at every
                  stage of their journey. We believe in the transformative power of art to connect communities, inspire
                  change, and celebrate human creativity.
                </p>
              </CardContent>
            </Card>

            {/* What We Do */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2 text-base sm:text-lg">Mentorship Programs</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Connect emerging artists with experienced mentors for guidance and growth
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Palette className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-pink-600" />
                    <h3 className="font-semibold mb-2 text-base sm:text-lg">Digital Platform</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Provide artists with tools to showcase, sell, and promote their work online
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-orange-600" />
                    <h3 className="font-semibold mb-2 text-base sm:text-lg">Community Building</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Foster connections between artists, collectors, and art enthusiasts
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Values */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Our Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      Integrity
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      We uphold authenticity and transparency in all our interactions and operations.
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      Devotion
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Deep commitment to supporting artists and nurturing the creative journey.
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                      Karma
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Creating with purpose and responsibility towards the art community.
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      Zeal
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Evangelizing art with passion and energy to inspire others.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Have questions or want to get involved? We'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    hello@artwala.org
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    media@artwala.org
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    curator@artwala.org
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-md mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ARTWALA Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}