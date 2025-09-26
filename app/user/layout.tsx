"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProtectedRoute } from "@/components/protected-route"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Home, Compass, User, ShoppingBag, Palette, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const navItems = [
  { href: '/user/feed', label: 'Feed', icon: Home },
  { href: '/user/explore', label: 'Explore', icon: Compass },
  { href: '/user/saved', label: 'Saved', icon: Heart }, // unified route naming
  { href: '/user/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/user/profile', label: 'Profile', icon: User },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  // Persist sidebar state for consistency across page navigation
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [sidebarReady, setSidebarReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('artwala:sidebar:open')
      if (stored !== null) {
        setSidebarOpen(stored === '1')
      }
    } catch (e) { /* ignore */ }
    setSidebarReady(true)
  }, [])

  useEffect(() => {
    if (sidebarReady) {
      try { localStorage.setItem('artwala:sidebar:open', sidebarOpen ? '1' : '0') } catch (e) { /* ignore */ }
    }
  }, [sidebarOpen, sidebarReady])
  const pathname = usePathname()

  return (
    <ProtectedRoute requiredUserType="user">
  <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <header className="bg-white/95 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 backdrop-blur-md sticky top-0 z-40">
          <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">ARTWALA</span>
              </Link>
            </div>
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Input placeholder="Search artists, artworks..." className="pl-4 bg-white dark:bg-slate-700" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>

  <div className="flex flex-1 h-[calc(100vh-4rem)] w-full overflow-hidden items-stretch">
          {/* Sidebar */}
            <aside
              className={`relative hidden md:flex flex-col h-full border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-[width] duration-300 ease-in-out ${sidebarOpen ? 'w-60' : 'w-14'} ${!sidebarReady ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-3 space-y-4">
                <nav className="space-y-0.5">
                  {navItems.map(item => {
                    const active = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative ${active ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-200' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                      </Link>
                    )
                  })}
                </nav>
                {sidebarOpen && (
                  <div className="space-y-3 pb-4">
                    <Card className="border-slate-200 dark:border-slate-700 shadow-none">
                      <CardHeader className="py-2 px-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Suggested Artists</h3>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 pt-0 space-y-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback>A{i}</AvatarFallback>
                              </Avatar>
                              <div className="leading-tight">
                                <div className="text-sm font-medium">Artist {i}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">@artist{i}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="h-6 px-2 text-xs leading-none">Follow</Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className="border-slate-200 dark:border-slate-700 shadow-none">
                      <CardHeader className="py-2 px-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Trending</h3>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 pt-0 flex flex-wrap gap-1.5">
                        {['Paintings','Digital','Sculptures','Photo','Crafts'].map(c => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700">{c}</span>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </aside>

          {/* Main content area */}
          <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
