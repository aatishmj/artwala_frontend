import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get the correct image URL
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/placeholder.svg?height=128&width=128"
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it starts with /media/, prepend the backend URL
  if (imagePath.startsWith('/media/')) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    return `${API_BASE_URL}${imagePath}`
  }
  
  // If it's just a filename, assume it's in the media/profiles/ directory
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  return `${API_BASE_URL}/media/profiles/${imagePath}`
}
