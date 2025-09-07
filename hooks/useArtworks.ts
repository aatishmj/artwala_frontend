import { useState, useEffect, useCallback } from 'react';
import { apiClient, Artwork } from '@/lib/api';

export interface UseArtworksOptions {
  limit?: number;
  artistId?: number; // filter on backend
  requireArtist?: boolean; // if true, skip initial fetch until artistId defined
}

export const useArtworks = (options: UseArtworksOptions = {}) => {
  const { limit = 6, artistId, requireArtist } = options;
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (requireArtist && (artistId === undefined || artistId === null)) {
        setLoading(false);
        return;
      }
      const data = await apiClient.getArtworks(artistId ? { artist: artistId } : {});
      // Backend returns all artworks already ordered newest first; apply limit client side
      setArtworks(data.slice(0, limit));
    } catch (e: any) {
      setError(e.message || 'Failed to load artworks');
    } finally {
      setLoading(false);
    }
  }, [limit, artistId, requireArtist]);

  useEffect(() => { fetchArtworks(); }, [fetchArtworks]);

  const prependArtwork = (art: Artwork) => {
    setArtworks(prev => [art, ...prev].slice(0, limit));
  };

  const updateLocal = (updated: Artwork) => {
    setArtworks(prev => prev.map(a => a.id === updated.id ? updated : a));
  };
  const removeLocal = (id: number) => {
    setArtworks(prev => prev.filter(a => a.id !== id));
  };
  return { artworks, loading, error, refetch: fetchArtworks, prependArtwork, updateLocal, removeLocal };
};
