"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, ImageIcon, FileText, Smile, Phone, Video, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { apiClient, tokenManager } from "@/lib/api"
import { User, Message } from "@/lib/api"

export default function ArtistMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [conversations, setConversations] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isMounted) return

    const user = tokenManager.getUser()
    const token = tokenManager.getAccessToken()
    setCurrentUser(user)
    if (!user || !token) {
      window.location.href = "/auth/login"
      return
    }
  }, [isMounted])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!isMounted || !currentUser) return

    const fetchConversations = async () => {
      try {
        setLoading(true)
        const convs = await apiClient.getConversations()
        setConversations(convs)
      } catch (error) {
        console.error("Failed to fetch conversations:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchConversations()
  }, [isMounted, currentUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const msgs = await apiClient.getMessages(selectedChat)
          setMessages(msgs)
        } catch (error) {
          console.error("Failed to fetch messages:", error)
        }
      }
      fetchMessages()
    } else {
      setMessages([])
    }
  }, [selectedChat])

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = async () => {
    if (message.trim() && selectedChat) {
      try {
        const sentMessage = await apiClient.sendMessage(selectedChat, message)
        setMessages(prev => [...prev, sentMessage])
        setMessage("")
      } catch (error) {
        console.error("Failed to send message:", error)
      }
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/artist/dashboard">
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
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedChat === conversation.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.profile_image || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.first_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{conversation.first_name} {conversation.last_name}</h3>
                      <p className="text-sm text-gray-500">@{conversation.username}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.profile_image || "/placeholder.svg"} />
                  <AvatarFallback>{selectedConversation.first_name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.first_name} {selectedConversation.last_name}</h3>
                  <p className="text-sm text-gray-500">@{selectedConversation.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isCurrentUser = msg.sender.id === currentUser?.id
                
                return (
                  <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-xs lg:max-w-md ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar - only show for receiver messages */}
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={msg.sender.profile_image || "/placeholder.svg"} />
                          <AvatarFallback>{msg.sender.first_name?.[0] || 'U'}</AvatarFallback>
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
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                    <Button variant="ghost" size="sm" className="p-1 mr-2">
                      <Smile className="w-5 h-5 text-gray-500" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm"
                    />
                    <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="sm" className="p-1">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1">
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!message.trim()}
                  className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}