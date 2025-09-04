"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, RefreshCcw, Pencil, Trash2 } from 'lucide-react'
import { useArtworks, useUserProfile } from '@/hooks'
import { UploadArtworkModal } from '@/components/upload-artwork-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getImageUrl } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export default function MyArtworksPage() {
  const { profile } = useUserProfile()
  const { artworks, loading, error, refetch, prependArtwork, updateLocal, removeLocal } = useArtworks({ limit: 100, artistId: profile?.id, requireArtist: true })
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [editing, setEditing] = useState<any | null>(null)
  const [editForm, setEditForm] = useState({ title: '', price: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { toast } = useToast()

  const startEdit = (a: any) => {
    setEditing(a)
    setEditForm({ title: a.title || '', price: a.price || '', description: a.description || '' })
  }

  const submitEdit = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const updated = await (await import('@/lib/api')).apiClient.updateArtwork(editing.id, {
        title: editForm.title,
        price: editForm.price,
        description: editForm.description,
      })
      updateLocal(updated)
      setEditing(null)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const deleteArtwork = async (id: number) => {
    if (!confirm('Delete this artwork?')) return
    // Optimistic removal
    const toRestore = artworks.find(a => a.id === id)
    removeLocal(id)
    setDeletingId(id)
    try {
      await (await import('@/lib/api')).apiClient.deleteArtwork(id)
      toast({ title: 'Artwork deleted' })
    } catch (e) {
      console.error(e)
      // Revert on failure
      if (toRestore) prependArtwork(toRestore as any)
      toast({ title: 'Delete failed', variant: 'destructive' })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach to-pastel-mint dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link href="/artist/dashboard" className="text-sm text-muted-foreground hover:underline flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Link>
            <h1 className="text-3xl font-bold">My Artworks</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
              <RefreshCcw className="w-4 h-4 mr-1" /> {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <UploadArtworkModal onUploaded={(a) => prependArtwork(a)}>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Plus className="w-4 h-4 mr-1" /> Upload Artwork
              </Button>
            </UploadArtworkModal>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Your Portfolio</CardTitle>
            <CardDescription>
              {loading ? 'Loading...' : `${artworks.length} artwork${artworks.length !== 1 ? 's' : ''} uploaded`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
            {!loading && artworks.length === 0 && <p className="text-sm text-muted-foreground">You haven't uploaded any artworks yet.</p>}
            <div className="flex justify-end mb-4 gap-2">
              <Button variant={view === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setView('grid')}>Grid</Button>
              <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setView('list')}>List</Button>
            </div>
            {view === 'grid' ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {artworks.map(a => (
                  <Card key={a.id} className="overflow-hidden group">
                    <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {a.image && <img src={getImageUrl(a.image)} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-tight line-clamp-2">{a.title}</h3>
                        <div className="flex gap-2 items-center">
                          <Badge className="shrink-0">Published</Badge>
                          <button onClick={() => startEdit(a)} className="text-xs text-blue-600 hover:underline">Edit</button>
                          <button disabled={deletingId===a.id} onClick={() => deleteArtwork(a.id)} className="text-xs text-red-600 hover:underline">
                            {deletingId===a.id? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      {a.price && <p className="text-sm font-medium">₹{a.price}</p>}
                      <p className="text-xs text-muted-foreground">Added {new Date(a.created_at).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {artworks.map(a => (
                  <Card key={a.id} className="overflow-hidden">
                    <CardContent className="p-4 flex gap-4">
                      <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden shrink-0">
                        {a.image && <img src={getImageUrl(a.image)} alt={a.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold">{a.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">Added {new Date(a.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          {a.price && <span className="text-sm font-medium">₹{a.price}</span>}
                          <div className="flex gap-3 items-center">
                            <Badge>Published</Badge>
                            <button onClick={() => startEdit(a)} className="text-xs text-blue-600 hover:underline">Edit</button>
                            <button disabled={deletingId===a.id} onClick={() => deleteArtwork(a.id)} className="text-xs text-red-600 hover:underline">
                              {deletingId===a.id? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Dialog open={!!editing} onOpenChange={(o)=> !o && setEditing(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Artwork</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} />
              </div>
              <div>
                <label className="text-sm font-medium">Price (₹)</label>
                <Input type="number" value={editForm.price} onChange={e=>setEditForm(f=>({...f,price:e.target.value}))} />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full border rounded p-2 text-sm" rows={4} value={editForm.description} onChange={e=>setEditForm(f=>({...f,description:e.target.value}))} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={()=>setEditing(null)}>Cancel</Button>
                <Button size="sm" disabled={saving} onClick={submitEdit}>{saving? 'Saving...' : 'Save'}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
