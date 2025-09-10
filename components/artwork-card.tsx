"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getImageUrl } from '@/lib/utils'
import type { Artwork } from '@/lib/api'

type Props = {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: Props) {
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {artwork.image && (
          <img
            src={getImageUrl(artwork.image)}
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight line-clamp-2">{artwork.title}</h3>
          <Badge className="shrink-0">New</Badge>
        </div>
        {artwork.price && <p className="text-sm font-medium">₹{artwork.price}</p>}
        <p className="text-xs text-muted-foreground">Added {new Date(artwork.created_at).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}
