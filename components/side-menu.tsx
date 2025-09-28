"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Compass, Heart, ShoppingBag, User } from "lucide-react"

export function UserSidebar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/user/feed", label: "Feed", icon: <Home className="w-5 h-5" /> },
    { href: "/user/explore", label: "Explore", icon: <Compass className="w-5 h-5" /> },
    { href: "/user/wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
    { href: "/user/orders", label: "Orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/user/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ]

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {link.icon}
                  <span className={isActive ? "font-medium" : ""}>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
