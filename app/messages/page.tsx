"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { apiClient, tokenManager } from "@/lib/api"
import { User } from "@/lib/api"

export default function MessagesPage() {
  const [conversations, setConversations] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get current user
        const user = tokenManager.getUser()
        const token = tokenManager.getAccessToken()
        
        if (!user || !token) {
          window.location.href = "/auth/login"
          return
        }
        
        setCurrentUser(user)

        // Fetch conversations
        try {
          const convs = await apiClient.getConversations()
          setConversations(convs)
        } catch (error) {
          console.error("Failed to fetch conversations:", error)
          setConversations([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/user/feed">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading conversations...</div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No conversations yet</div>
            ) : (
              conversations.map((conversation) => (
                <Link 
                  key={conversation.id} 
                  href={`/messages/${conversation.id}`}
                  className="block p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.profile_image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.first_name?.[0] || conversation.username?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {conversation.first_name} {conversation.last_name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        @{conversation.username}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Empty Chat Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Select a conversation</h3>
            <p className="text-gray-500">Choose a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  )
}