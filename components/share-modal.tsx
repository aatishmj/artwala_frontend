"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Check, Send, Facebook, Twitter, Instagram } from "lucide-react"

interface ShareModalProps {
  postUrl: string
  postTitle: string
  children: React.ReactNode
}

export function ShareModal({ postUrl, postTitle, children }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<Set<number>>(new Set())

  const friends = [
    { id: 1, name: "John Doe", username: "@johndoe", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Jane Smith", username: "@janesmith", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Mike Johnson", username: "@mikej", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const toggleFriend = (friendId: number) => {
    const newSelected = new Set(selectedFriends)
    if (newSelected.has(friendId)) {
      newSelected.delete(friendId)
    } else {
      newSelected.add(friendId)
    }
    setSelectedFriends(newSelected)
  }

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(postUrl)
    const encodedTitle = encodeURIComponent(postTitle)

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Send to Friends */}
          <div>
            <h4 className="font-medium mb-3">Send to Friends</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selectedFriends.has(friend.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => toggleFriend(friend.id)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">{friend.username}</p>
                  </div>
                  {selectedFriends.has(friend.id) && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedFriends.size > 0 && (
              <Button className="w-full mt-3" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Send to {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}
              </Button>
            )}
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-medium mb-3">Share to Social Media</h4>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-3 bg-transparent"
                onClick={() => shareToSocial("facebook")}
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-3 bg-transparent"
                onClick={() => shareToSocial("twitter")}
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-3 bg-transparent"
                onClick={() => shareToSocial("instagram")}
              >
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="text-xs">Instagram</span>
              </Button>
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <h4 className="font-medium mb-3">Copy Link</h4>
            <div className="flex gap-2">
              <Input value={postUrl} readOnly className="flex-1" />
              <Button onClick={copyLink} variant="outline" size="sm">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
