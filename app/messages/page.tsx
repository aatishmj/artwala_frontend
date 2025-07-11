"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, ImageIcon, FileText, Smile, Phone, Video, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_art",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for your interest in my artwork!",
      timestamp: "2m ago",
      unread: 2,
      online: true,
      userType: "artist",
    },
    {
      id: 2,
      name: "Arjun Patel",
      username: "@arjun_sculpts",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The sculpture is ready for pickup",
      timestamp: "1h ago",
      unread: 0,
      online: false,
      userType: "artist",
    },
    {
      id: 3,
      name: "Maya Singh",
      username: "@maya_digital",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we discuss the commission details?",
      timestamp: "3h ago",
      unread: 1,
      online: true,
      userType: "artist",
    },
  ]

  const messages = [
    {
      id: 1,
      senderId: 1,
      content: "Hi! I'm interested in your latest painting 'Sunset Dreams'",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      senderId: 2,
      content: "Hello! Thank you for your interest. It's one of my favorite pieces.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      senderId: 1,
      content: "Could you tell me more about the inspiration behind it?",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      senderId: 2,
      content: "/placeholder.svg?height=200&width=300",
      timestamp: "10:37 AM",
      type: "image",
    },
    {
      id: 5,
      senderId: 2,
      content: "This was taken during the golden hour at Marina Beach. The colors were absolutely magical!",
      timestamp: "10:38 AM",
      type: "text",
    },
    {
      id: 6,
      senderId: 2,
      content: "Thank you for your interest in my artwork!",
      timestamp: "10:40 AM",
      type: "text",
    },
  ]

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("")
    }
  }

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
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedChat === conversation.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-sm text-gray-500">{selectedConversation.online ? "Online" : "Last seen 2h ago"}</p>
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
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 1 ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {msg.type === "image" ? (
                      <img
                        src={msg.content || "/placeholder.svg"}
                        alt="Shared image"
                        className="rounded-lg max-w-full"
                      />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                    <p className={`text-xs mt-1 ${msg.senderId === 1 ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600">
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
