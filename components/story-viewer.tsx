"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Heart, Send } from "lucide-react"

interface Story {
  id: number
  artist: {
    name: string
    username: string
    avatar: string
  }
  image: string
  timestamp: string
}

interface StoryViewerProps {
  stories: Story[]
  initialStoryIndex: number
  children: React.ReactNode
}

export function StoryViewer({ stories, initialStoryIndex, children }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [isOpen, setIsOpen] = useState(false)

  const currentStory = stories[currentStoryIndex]

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else {
      setIsOpen(false)
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md h-[90vh] p-0 bg-black border-0">
        <div className="relative h-full flex flex-col">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${index <= currentStoryIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src={currentStory.artist.avatar || "/placeholder.svg"} />
                <AvatarFallback>{currentStory.artist.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">{currentStory.artist.name}</p>
                <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Story content */}
          <div className="flex-1 relative">
            <img src={currentStory.image || "/placeholder.svg"} alt="Story" className="w-full h-full object-cover" />

            {/* Navigation areas */}
            <button className="absolute left-0 top-0 w-1/3 h-full z-10" onClick={prevStory} />
            <button className="absolute right-0 top-0 w-1/3 h-full z-10" onClick={nextStory} />
          </div>

          {/* Bottom actions */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Send message"
                className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
