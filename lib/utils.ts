import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get the correct image URL
export function getImageUrl(imagePath: string | null | undefined): string {
  // Unified placeholder fallback
  if (!imagePath || typeof imagePath !== 'string' || !imagePath.trim()) {
    return "/placeholder.svg?height=128&width=128"
  }
<<<<<<< HEAD

  const cleaned = imagePath.trim()

  // Already absolute URL
  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned
  }

  // Base (may be empty if we rely on same-origin reverse proxy)
  const RAW_BASE = process.env.NEXT_PUBLIC_API_URL
  const BASE = RAW_BASE ? RAW_BASE.replace(/\/+$/,'') : ''

  // If path already starts with /media/ just prepend base
  if (cleaned.startsWith('/media/')) {
    return `${BASE}${cleaned}`
  }

  // If it begins with a slash but not /media/, assume already rooted asset (e.g. /profiles/foo.jpg)
  if (cleaned.startsWith('/')) {
    return `${BASE}${cleaned}`
  }

  // If it contains a directory (profiles/... or artworks/images/...), treat it as relative to media root
  if (cleaned.includes('/')) {
    return `${BASE}/media/${cleaned}`
  }

  // Bare filename (likely profile image stored as just name) -> profiles folder
  return `${BASE}/media/profiles/${cleaned}`
=======
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('https://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it starts with /media/, prepend the backend URL
  if (imagePath.startsWith('/media/')) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || " https://72.60.200.27:8000"
    return `${API_BASE_URL}${imagePath}`
  }
  
  // If it's just a filename, assume it's in the media/profiles/ directory
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://72.60.200.27:8000"
  return `${API_BASE_URL}/media/profiles/${imagePath}`
>>>>>>> origin/aatish
}

// utils.ts

export const validateArtistDetails = ({
  address,
  aadhaarFile,
  panFile,
  bankName,
  accountNumber,
  ifsc,
  branch,
  accountHolder,
  age,
  birthDate,
  gender,
  phone,
}: {
  address: string
  aadhaarFile: File | null
  panFile: File | null
  bankName: string
  accountNumber: string
  ifsc: string
  branch: string
  accountHolder: string
  age: string
  birthDate: string
  gender: string
  phone: string
}) => {
  if (!address || !aadhaarFile || !panFile || !bankName || !accountNumber || !ifsc || !branch || !accountHolder || !age || !birthDate || !gender || !phone) {
    return "All fields are required"
  }
  if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
    return "Phone number must be 10 digits"
  }
  return null
}
