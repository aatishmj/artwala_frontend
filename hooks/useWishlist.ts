import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import type { WishlistItem } from '@/lib/api';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getWishlist();
      setWishlist(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const removeFromWishlist = async (artworkId: number) => {
    try {
      await apiClient.removeFromWishlist(artworkId);
      setWishlist(prev => prev.filter(item => item.artwork.id !== artworkId));
    } catch (err: any) {
      setError(err.message || 'Failed to remove from wishlist');
      throw err;
    }
  };

  return {
    wishlist,
    loading,
    error,
    refetch: fetchWishlist,
    removeFromWishlist,
  };
};
