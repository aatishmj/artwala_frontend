"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiClient, Artwork } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getImageUrl } from '@/lib/utils'

export default function ArtworkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const idParam = params?.id
    if (!idParam) return
    const id = Number(idParam)
    if (Number.isNaN(id)) { setError('Invalid artwork id'); setLoading(false); return }
    ;(async () => {
      try {
        setLoading(true)
        const data = await apiClient.getArtwork(id)
        setArtwork(data)
      } catch (e: any) {
        setError(e?.message || 'Failed to load artwork')
      } finally {
        setLoading(false)
      }
    })()
  }, [params])

  if (loading) {
    return <div className="p-6">Loading…</div>
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>
  }
  if (!artwork) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">Back</Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{artwork.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg">
              {artwork.image && <img src={getImageUrl(artwork.image)} alt={artwork.title} className="w-full h-full object-cover" />}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>Artwork</Badge>
                <span className="text-sm text-muted-foreground">Added {new Date(artwork.created_at).toLocaleString()}</span>
              </div>
              {artwork.price && <div className="text-3xl font-bold text-green-600 dark:text-green-400">₹{artwork.price}</div>}
              {artwork.description && <p className="text-sm leading-relaxed whitespace-pre-wrap">{artwork.description}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
