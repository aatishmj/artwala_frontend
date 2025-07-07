"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Users, Heart, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach via-white to-pastel-lavender dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ARTWALA Foundation
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About ARTWALA Foundation</h1>
            <p className="text-xl text-muted-foreground">
              An artist-led NGO dedicated to empowering creators and connecting communities
            </p>
          </div>

          <div className="space-y-12">
            {/* Mission */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ARTWALA Foundation exists to create a vibrant, inclusive art ecosystem that empowers artists at every
                  stage of their journey. We believe in the transformative power of art to connect communities, inspire
                  change, and celebrate human creativity.
                </p>
              </CardContent>
            </Card>

            {/* What We Do */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">What We Do</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2">Mentorship Programs</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect emerging artists with experienced mentors for guidance and growth
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Palette className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                    <h3 className="font-semibold mb-2">Digital Platform</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide artists with tools to showcase, sell, and promote their work online
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                    <h3 className="font-semibold mb-2">Community Building</h3>
                    <p className="text-sm text-muted-foreground">
                      Foster connections between artists, collectors, and art enthusiasts
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Values */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-500" />
                      Integrity
                    </h3>
                    <p className="text-muted-foreground">
                      We uphold authenticity and transparency in all our interactions and operations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-500" />
                      Devotion
                    </h3>
                    <p className="text-muted-foreground">
                      Deep commitment to supporting artists and nurturing the creative journey.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-pink-500" />
                      Karma
                    </h3>
                    <p className="text-muted-foreground">
                      Creating with purpose and responsibility towards the art community.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-orange-500" />
                      Zeal
                    </h3>
                    <p className="text-muted-foreground">Evangelizing art with passion and energy to inspire others.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions or want to get involved? We'd love to hear from you.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline">hello@artwala.org</Button>
                  <Button variant="outline">media@artwala.org</Button>
                  <Button variant="outline">curator@artwala.org</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
