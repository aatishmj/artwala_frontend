"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, Package, Heart, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "./auth-context"

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 hover:bg-stone-100">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200">
            {user.avatar ? (
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-500 to-amber-600">
                <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <span className="hidden md:block text-stone-800 font-medium">{user.name}</span>
          <ChevronDown className="w-4 h-4 text-stone-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-stone-900">{user.name}</p>
            <p className="text-xs text-stone-600">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Package className="w-4 h-4 mr-2" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Heart className="w-4 h-4 mr-2" />
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
