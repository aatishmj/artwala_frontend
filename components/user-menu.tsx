"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, Heart, ShoppingBag, LogOut, MessageCircle, Palette } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile_image || "/placeholder.svg?height=32&width=32"} />
            <AvatarFallback>{user.first_name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">
              {user.first_name} {user.last_name}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        {user.user_type === "user" ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/user/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/user/saved">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/user/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/messages">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/artist/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/artist/artworks">
                <Palette className="mr-2 h-4 w-4" />
                <span>My Artworks</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/artist/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/messages">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
