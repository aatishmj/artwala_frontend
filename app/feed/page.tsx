"use client"

import React from 'react'
import { useArtworks } from '@/hooks'
import { ArtworkCard } from '@/components/artwork-card'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function FeedPage() {
  // Fetch latest artworks from all artists (no artist filter)
  const { artworks, loading, error, refetch } = useArtworks({ limit: 24 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach to-pastel-mint dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Discover Art</h1>
          <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Latest Artworks</CardTitle>
            <CardDescription>
              {loading ? 'Loading...' : `${artworks.length} item${artworks.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
            {!loading && artworks.length === 0 && (
              <p className="text-sm text-muted-foreground">No artworks yet. Check back soon.</p>
            )}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-64 bg-gray-200 dark:bg-gray-800 rounded" />
                  ))
                : artworks.map((a) => <ArtworkCard key={a.id} artwork={a} />)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
