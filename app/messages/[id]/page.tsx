"use client"

import { useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { apiClient, tokenManager } from "@/lib/api"
import { User } from "@/lib/api"

interface Message {
  id: number
  content: string
  sender: User
  recipient: User
  timestamp: string
  is_read: boolean
}

export default function MessageChatPage() {
  const params = useParams()
  const recipientId = parseInt(params.id as string)
  const [recipient, setRecipient] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch current user and messages
  useEffect(() => {
    if (!recipientId) return

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

        // Fetch recipient data
        try {
          const recipientData = await apiClient.getPublicProfile(recipientId)
          setRecipient(recipientData)
        } catch (error) {
          console.error("Failed to fetch recipient:", error)
          // Create a fallback recipient object
          setRecipient({
            id: recipientId,
            first_name: "User",
            last_name: "",
            username: `user_${recipientId}`,
            email: "",
            user_type: "user",
            profile_image: "/placeholder.svg"
          })
        }

        // Fetch messages
        try {
          const msgs = await apiClient.getMessages(recipientId)
          setMessages(msgs)
        } catch (error) {
          console.error("Failed to fetch messages:", error)
          // If API fails, show empty messages
          setMessages([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [recipientId])

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return

    try {
      // Create optimistic message
      const optimisticMessage: Message = {
        id: Date.now(), // Temporary ID
        content: newMessage,
        sender: currentUser,
        recipient: recipient || {
          id: recipientId,
          first_name: "User",
          last_name: "",
          username: `user_${recipientId}`,
          email: "",
          user_type: "user",
          profile_image: "/placeholder.svg"
        },
        timestamp: new Date().toISOString(),
        is_read: false
      }

      // Add optimistic message immediately
      setMessages(prev => [...prev, optimisticMessage])
      setNewMessage("")

      // Send to API
      const sentMessage = await apiClient.sendMessage(recipientId, newMessage)
      
      // Replace optimistic message with real message
      setMessages(prev => prev.map(msg => 
        msg.id === optimisticMessage.id ? sentMessage : msg
      ))
    } catch (error) {
      console.error("Failed to send message:", error)
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id))
    }
  }

  // Format timestamp consistently
  const formatTime = (timestamp: string) => {
    if (!isClient) return ""
    
    try {
      const date = new Date(timestamp)
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    } catch (error) {
      return "Now"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center gap-4">
            <Link href="/messages" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Avatar className="w-10 h-10">
              <AvatarImage src={recipient?.profile_image || "/placeholder.svg"} />
              <AvatarFallback>
                {recipient?.first_name?.[0] || recipient?.username?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">
                {recipient?.first_name} {recipient?.last_name}
              </h1>
              <p className="text-sm text-gray-500">
                {recipient?.user_type === 'artist' ? 'Artist' : 'User'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex h-[calc(100vh-200px)]">
          <div className="w-full">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet. Start a conversation!
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isCurrentUser = msg.sender.id === currentUser?.id

                    return (
                      <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-xs lg:max-w-md ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                          {/* Avatar - only show for receiver messages */}
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={msg.sender.profile_image || "/placeholder.svg"} />
                              <AvatarFallback>
                                {msg.sender.first_name?.[0] || msg.sender.username?.[0] || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div className="flex flex-col gap-1">
                            {/* Message bubble */}
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isCurrentUser
                                  ? "bg-blue-500 text-white rounded-br-none"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>

                            {/* Timestamp */}
                            <p className={`text-xs ${isCurrentUser ? "text-right text-gray-500" : "text-gray-500"}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      className="rounded-full px-4 py-2"
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}