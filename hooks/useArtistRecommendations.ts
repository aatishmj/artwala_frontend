import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface Artist {
  id: number;
  username: string;
  full_name: string;
  user_type: string;
  bio: string;
  location: string;
  profile_image: string;
  is_verified: boolean;
  stats: {
    artworks_count?: number;
    followers_count?: number;
    total_likes_received?: number;
  };
}

export interface ArtistRecommendations {
  trending_artists: Artist[];
  new_artists: Artist[];
  recommended_count: number;
}

export const useArtistRecommendations = () => {
  const [recommendations, setRecommendations] = useState<ArtistRecommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getArtistRecommendations();
      setRecommendations(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch artist recommendations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
};
