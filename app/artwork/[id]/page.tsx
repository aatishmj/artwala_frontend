"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"

export default function ArtworkPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [artwork, setArtwork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArtwork() {
      try {
        setLoading(true)
        // Use getArtworks with filter by id since getArtworkById does not exist
        const artworks = await apiClient.getArtworks({ limit: 1, ordering: "-created_at" })
        const foundArtwork = artworks.find(a => a.id.toString() === id)
        if (foundArtwork) {
          setArtwork(foundArtwork)
        } else {
          setError("Artwork not found")
        }
      } catch (err: any) {
        setError(err.message || "Failed to load artwork")
      } finally {
        setLoading(false)
      }
    }
    fetchArtwork()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading artwork...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Artwork not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{artwork.title}</CardTitle>
          <CardDescription>{artwork.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={artwork.image} alt={artwork.title} className="w-full max-h-96 object-contain mb-4" />
          <p>{artwork.description}</p>
          <p className="mt-2 font-semibold">Price: ₹{artwork.price}</p>
          <p className="mt-2">Artist: {artwork.artist?.first_name || artwork.artist?.username}</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Back to Feed
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
